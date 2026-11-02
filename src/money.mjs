// Amounts are integer minor units (paisa). No floating-point money arithmetic.
export function parsePKRMinor(input) {
  if (typeof input !== 'string' && typeof input !== 'number') return null;
  const str = String(input).trim();
  const m = str.match(/^(?:(?:PKR|Rs\.?)\s*)?([0-9]{1,3}(?:,[0-9]{3})+|[0-9]+)(?:\.(\d{1,2}))?$/i);
  if (!m) return null;
  const whole = Number(m[1].replaceAll(',', ''));
  const fraction = Number((m[2] || '').padEnd(2, '0'));
  const amount = whole * 100 + fraction;
  return Number.isSafeInteger(amount) && amount <= 100_000_000_000 ? amount : null;
}

export function formatPKRMinor(amount) {
  if (!Number.isSafeInteger(amount) || amount < 0) return null;
  return `PKR ${Math.floor(amount / 100).toLocaleString('en-PK')}.${String(amount % 100).padStart(2,'0')}`;
}
