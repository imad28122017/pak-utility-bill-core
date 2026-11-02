// Pure Gregorian calendar helpers; no local-time/UTC timestamp conversions.
const MONTHS = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
const pad = n => String(n).padStart(2, '0');

export function validISODate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [y,m,d] = value.split('-').map(Number);
  if (y < 2000 || y > 2100 || m < 1 || m > 12 || d < 1 || d > 31) return false;
  const n = new Date(Date.UTC(y, m - 1, d));
  return n.getUTCFullYear() === y && n.getUTCMonth() === m - 1 && n.getUTCDate() === d;
}

export function normalizeDate(input) {
  if (typeof input !== 'string') return null;
  const s = input.trim();
  let y, m, d, match;
  if ((match = s.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/))) {
    [,y,m,d] = match.map(Number);
  } else if ((match = s.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/))) {
    d = +match[1]; m = +match[2]; y = +match[3]; // Explicit day-first convention.
  } else if ((match = s.match(/^(\d{1,2})\s+([A-Za-z]+)\s*,?\s*(\d{4})$/))) {
    d = +match[1]; m = MONTHS.indexOf(match[2].slice(0,3).toLowerCase()) + 1; y = +match[3];
  } else return null;
  const iso = `${y}-${pad(m)}-${pad(d)}`;
  return validISODate(iso) ? iso : null;
}

export function normalizePeriod(input) {
  if (typeof input !== 'string') return null;
  const s = input.trim();
  let match, y, m;
  if ((match = s.match(/^(\d{4})[-/](\d{1,2})$/))) {
    y = +match[1]; m = +match[2];
  } else if ((match = s.match(/^([A-Za-z]+)\s+(\d{4})$/))) {
    y = +match[2]; m = MONTHS.indexOf(match[1].slice(0,3).toLowerCase()) + 1;
  } else return null;
  return y >= 2000 && y <= 2100 && m >= 1 && m <= 12 ? `${y}-${pad(m)}` : null;
}

export function daysBetween(todayISO, dueISO) {
  if (!validISODate(todayISO) || !validISODate(dueISO)) return null;
  const millis = s => { const [y,m,d] = s.split('-').map(Number); return Date.UTC(y,m-1,d); };
  return Math.round((millis(dueISO) - millis(todayISO)) / 86400000);
}
