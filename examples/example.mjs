import { parseBillText, mergeVerifiedBill, billStatus } from '../src/index.mjs';

// Every value below is completely fictional and is not a real account.
const text = `IESCO Electricity Bill
Billing Month: October 2026
Reference No: 99998888777766
Amount Due: PKR 1,234.50
Due Date: 05 Nov 2026`;
const account = { provider:'iesco', reference:'99998888777766', billingPeriod:'2026-09', dueDate:'2026-10-05', amountMinor:99900, paid:false };
const parsed = parseBillText(text);
const result = mergeVerifiedBill(account,parsed,'2026-11-01');
// Do not print account numbers or raw invoice text to application logs in production.
console.log({ result:result.status, issues:result.issues, amountMinor:result.bill.amountMinor,
  status: billStatus(result.bill,'2026-11-01') });
