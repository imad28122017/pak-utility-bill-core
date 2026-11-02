import { validISODate, normalizePeriod } from './dates.mjs';

/** References are treated as opaque identifiers: punctuation normalization only. */
export const normalizeReference = value => String(value ?? '').replace(/[\s-]+/g, '').toUpperCase();

const KNOWN_PROVIDERS = new Set(['iesco', 'sngpl', 'nayatel', 'cda']);
/** Only formats supported by the reference parser. No claim of provider endorsement. */
function validProviderReference(provider, ref) {
  switch (provider) {
    case 'iesco': return /^\d{14}$/.test(ref);
    case 'sngpl': return /^\d{11}$/.test(ref);
    case 'cda': return /^\d{3,16}$/.test(ref);
    case 'nayatel': return /^[A-Z0-9]{3,24}$/.test(ref);
    default: return false;
  }
}

/**
 * Reject unverified, conflicting, stale or malformed imported bills.
 * Provider identity is a consistency check, not evidence of authenticity.
 * A trusted source and user consent are the responsibilities of the host app.
 */
export function verifyImport(existing, parsed) {
  if (!existing || typeof existing !== 'object' || !parsed || typeof parsed !== 'object') {
    return { ok: false, issues: ['Existing account and parsed document are required'] };
  }
  // Parsed diagnostics are untrusted: never echo caller-supplied text (which may contain PII).
  const issues = Array.isArray(parsed.issues) && parsed.issues.length > 0
    ? ['Parsed document has missing, conflicting or unverified fields'] : [];
  const expectedProvider = String(existing.provider ?? '').toLowerCase();
  const actualProvider = String(parsed.provider ?? '').toLowerCase();
  if (!KNOWN_PROVIDERS.has(expectedProvider) || expectedProvider !== actualProvider)
    issues.push('Provider identity is missing, unsupported or does not match');

  const accountRef = normalizeReference(existing.reference);
  const importedRef = normalizeReference(parsed.reference);
  if (!accountRef || !importedRef || accountRef !== importedRef)
    issues.push('Account reference is missing or does not match');
  if (KNOWN_PROVIDERS.has(expectedProvider) && importedRef && !validProviderReference(expectedProvider, importedRef))
    issues.push('Account reference format is invalid for the provider');

  if (!Number.isSafeInteger(parsed.amountMinor) || parsed.amountMinor < 0)
    issues.push('Verified amount is missing or invalid');
  if (!validISODate(parsed.dueDate))
    issues.push('Verified due date is missing or invalid');

  const period = normalizePeriod(parsed.billingPeriod);
  if (!period) issues.push('Billing period must be verified');
  // Canonical YYYY-MM is mandatory; accept text like 'November 2026' only during extraction.
  if (period && parsed.billingPeriod !== period)
    issues.push('Parsed billing period must be canonical YYYY-MM');
  if (existing.billingPeriod) {
    const previousPeriod = normalizePeriod(existing.billingPeriod);
    if (!previousPeriod || existing.billingPeriod !== previousPeriod) issues.push('Saved billing period is invalid or non-canonical; manual review is required');
    else if (period && period < previousPeriod)
      issues.push('Document billing period is older than the saved record');
    else if (period === previousPeriod && Number.isSafeInteger(existing.amountMinor) && parsed.amountMinor !== existing.amountMinor)
      issues.push('Amount changed within the same billing period; manual review is required');
  }
  if (existing.dueDate) {
    if (!validISODate(existing.dueDate))
      issues.push('Saved due date is invalid; manual review is required');
    else if (validISODate(parsed.dueDate) && parsed.dueDate < existing.dueDate)
      issues.push('Document due date is older than the saved record');
  }
  return { ok: issues.length === 0, issues: [...new Set(issues)] };
}

/** A rejected document returns the original object by identity, without mutation. */
export function mergeVerifiedBill(existing, parsed, updatedAt) {
  const verification = verifyImport(existing, parsed);
  if (!verification.ok) return { status: 'needs_review', bill: existing, issues: verification.issues };
  if (!validISODate(updatedAt))
    return { status: 'needs_review', bill: existing, issues: ['A valid update date is required'] };
  const cycleChanged = existing.billingPeriod !== parsed.billingPeriod;
  const prior = Array.isArray(existing.history) ? existing.history : [];
  const history = cycleChanged && existing.billingPeriod ? [...prior, {
    billingPeriod: existing.billingPeriod, amountMinor: existing.amountMinor,
    dueDate: existing.dueDate, paid: Boolean(existing.paid)
  }].slice(-24) : prior.slice(-24);
  const bill = {
    ...existing,
    provider: parsed.provider,
    amountMinor: parsed.amountMinor,
    dueDate: parsed.dueDate,
    billingPeriod: parsed.billingPeriod,
    paid: cycleChanged ? false : Boolean(existing.paid),
    history,
    updatedAt,
    source: 'verified_document'
  };
  return { status: 'updated', bill, issues: [] };
}
