import { normalizeDate, normalizePeriod } from './dates.mjs';
import { parsePKRMinor } from './money.mjs';

// Provider names indicate document content only, never verified authenticity or affiliation.
export const PROVIDER_MARKERS = Object.freeze({
  iesco: /\bIESCO\b/i,
  sngpl: /\bSNGPL\b/i,
  nayatel: /\bNAYATEL\b/i,
  cda: /\bCDA\s+(?:WATER|WATER\s*&\s*ALLIED\s+CHARGES)\b/i
});

const LABELS = Object.freeze({
  amountMinor: /^(?:amount\s+(?:due|payable(?:\s+(?:within|before)\s+due\s+date)?)|net\s+payable|total\s+payable|payable\s+(?:within|before)\s+due\s+date|(?:amount\s+)?within\s+due\s+date|grand\s+total)\b\s*[:–-]?\s*(.*)$/i,
  dueDate: /^(?:due\s+date|last\s+date\s+for\s+payment)\b\s*[:–-]?\s*(.*)$/i,
  billingPeriod: /^(?:billing\s+month|billing\s+period|bill\s+period)\b\s*[:–-]?\s*(.*)$/i,
  reference: /^(?:reference(?:\s+(?:no\.?|number))?|consumer\s+(?:no\.?|number)|account\s+(?:no\.?|number)|NTL\s+(?:no\.?|number))\b\s*[:#–-]?\s*(.*)$/i
});
const reference = s => {
  const value = String(s ?? '').trim().replace(/\s+/g, '').toUpperCase();
  return /^(?:NTL-)?[A-Z0-9-]{3,24}$/.test(value) ? value : null;
};
const parsers = { amountMinor: parsePKRMinor, dueDate: normalizeDate,
  billingPeriod: normalizePeriod, reference };

function extract(lines, key) {
  const found = [];
  let invalidCount = 0;
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(LABELS[key]);
    if (!match) continue;
    const candidates = [match[1], ...(match[1].trim() ? [] : [lines[i + 1] ?? ''])];
    const value = candidates.map(s => parsers[key](s)).find(x => x !== null && x !== undefined);
    if (value === undefined) invalidCount++;
    else found.push(value);
  }
  const conflict = found.length > 1 && !found.every(x => x === found[0]);
  // If one labelled value is invalid, don't silently choose another labelled value.
  const ambiguous = conflict || (found.length > 0 && invalidCount > 0);
  return { value: found.length && !ambiguous ? found[0] : null, ambiguous };
}

/**
 * Parse local text that the host has extracted from a document.
 * This does not authenticate document origin and never contacts a provider.
 */
export function parseBillText(rawText) {
  if (typeof rawText !== 'string' || rawText.length > 200_000 || utf8ByteLength(rawText) > 200_000)
    throw new TypeError('Bill text must be a string below 200 KB');
  const lines = rawText.replace(/\u00a0/g, ' ').split(/\r?\n/).map(s => s.trim()).filter(Boolean);
  const providers = Object.entries(PROVIDER_MARKERS).filter(([,rx]) => rx.test(rawText)).map(([id]) => id);
  const fields = Object.fromEntries(Object.keys(LABELS).map(key => [key, extract(lines, key)]));
  const issues = [];
  if (providers.length !== 1) issues.push('Provider identity missing or ambiguous');
  for (const [key, field] of Object.entries(fields)) {
    if (field.ambiguous) issues.push(`Conflicting or malformed ${key} fields`);
    else if (field.value === null) issues.push(`Missing or unparseable ${key}`);
  }
  return { provider: providers.length === 1 ? providers[0] : null,
    reference: fields.reference.value, amountMinor: fields.amountMinor.value,
    dueDate: fields.dueDate.value, billingPeriod: fields.billingPeriod.value, issues };
}

// Avoid allocating a Blob or depending on Node Buffer in browser consumers.
function utf8ByteLength(s) {
  return new TextEncoder().encode(s).length;
}
