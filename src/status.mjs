import { daysBetween } from './dates.mjs';

// This tracks recorded payment state, not whether a provider has confirmed payment.
export function billStatus(record, todayISO) {
  if (record?.paid === true) return 'marked_paid';
  const days = daysBetween(todayISO, record?.dueDate);
  if (days === null) return 'unknown';
  if (days < 0) return 'overdue';
  if (days <= 3) return 'due_soon';
  return 'upcoming';
}
