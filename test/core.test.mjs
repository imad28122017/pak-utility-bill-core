import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parsePKRMinor, formatPKRMinor, validISODate, normalizeDate, normalizePeriod, daysBetween,
  parseBillText, verifyImport, mergeVerifiedBill, billStatus
} from '../src/index.mjs';

const fakeText = `IESCO Electricity Bill\nBilling Month: October 2026\nReference No: 99998888777766\nAmount Due: PKR 1,234.50\nDue Date: 05 Nov 2026`;
const existing = Object.freeze({provider:'iesco',reference:'99998888777766',billingPeriod:'2026-09',dueDate:'2026-10-05',amountMinor:100000,paid:true,history:[]});

// Money always uses integers in minor units.
test('valid money and formatting', () => {
  assert.equal(parsePKRMinor('Rs. 1,234.50'), 123450);
  assert.equal(parsePKRMinor('PKR 0.01'), 1);
  assert.equal(parsePKRMinor('0001'), 100);
  assert.equal(formatPKRMinor(123450), 'PKR 1,234.50');
});
test('reject negative amounts, too much precision and unsafe numbers', () => {
  for (const s of ['-15', '12.345', '12,34', '1e5', 'Infinity', '']) assert.equal(parsePKRMinor(s), null);
  assert.equal(parsePKRMinor('99999999999999999'), null);
});
test('dates reject impossible days, handle leap year and day-first text', () => {
  assert.equal(validISODate('2026-02-29'), false);
  assert.equal(validISODate('2028-02-29'), true);
  assert.equal(normalizeDate('31/10/2026'), '2026-10-31');
  assert.equal(normalizeDate('29 Feb 2028'), '2028-02-29');
  assert.equal(normalizeDate('31 Apr 2026'), null);
  assert.equal(normalizePeriod('Oct 2026'), '2026-10');
  assert.equal(normalizePeriod('2026-13'), null);
});
test('calendar-day differences do not drift at month boundaries', () => {
  assert.equal(daysBetween('2026-10-31','2026-11-01'),1);
  assert.equal(daysBetween('2026-11-02','2026-11-01'),-1);
  assert.equal(daysBetween('2026-02-30','2026-03-01'),null);
});
test('parses only explicitly labelled fields and a documented provider marker', () => {
  const p = parseBillText(fakeText);
  assert.deepEqual(p, {provider:'iesco',reference:'99998888777766',amountMinor:123450,dueDate:'2026-11-05',billingPeriod:'2026-10',issues:[]});
});
test('missing reference cannot silently become an automatic import', () => {
  const p = parseBillText(fakeText.replace('Reference No: 99998888777766',''));
  assert.equal(p.reference,null);
  assert.equal(verifyImport(existing,p).ok,false);
});
test('mismatched account reference or provider fails verification', () => {
  assert.equal(verifyImport(existing,parseBillText(fakeText.replace('99998888777766','12345678901234'))).ok,false);
  assert.equal(verifyImport(existing,parseBillText(fakeText.replace('IESCO','SNGPL'))).ok,false);
});
test('multiple conflicting amounts are flagged instead of guessing', () => {
  const p=parseBillText(fakeText+'\nAmount Due: PKR 9,999');
  assert.equal(p.amountMinor,null);
  assert.ok(p.issues.some(x=>x.includes('Conflicting')));
});
test('no provider or multiple providers cannot pass strict verification', () => {
  assert.equal(parseBillText(fakeText.replace('IESCO','')).provider,null);
  assert.equal(parseBillText(fakeText+'\nSNGPL').provider,null);
});
test('older billing periods are rejected', () => {
  const p=parseBillText(fakeText.replace('October 2026','August 2026'));
  assert.equal(verifyImport(existing,p).ok,false);
});
test('invalid import preserves prior object exactly', () => {
  const parsed=parseBillText(fakeText.replace('99998888777766','12345678901234'));
  const merged=mergeVerifiedBill(existing,parsed,'2026-11-01');
  assert.equal(merged.status,'needs_review');
  assert.equal(merged.bill,existing);
  assert.deepEqual(existing.history,[]);
});
test('verified new cycle stores history and resets recorded paid state',()=>{
  const parsed=parseBillText(fakeText);
  const result=mergeVerifiedBill(existing,parsed,'2026-11-01');
  assert.equal(result.status,'updated');
  assert.equal(result.bill.amountMinor,123450);
  assert.equal(result.bill.paid,false);
  assert.equal(result.bill.history.length,1);
  assert.equal(existing.paid,true);
});
test('verified same cycle preserves recorded paid state and avoids duplicate history',()=>{
  const parsed=parseBillText(fakeText);
  const same={...existing,billingPeriod:'2026-10',dueDate:'2026-11-05',amountMinor:123450};
  const result=mergeVerifiedBill(same,parsed,'2026-11-01');
  assert.equal(result.status,'updated');
  assert.equal(result.bill.paid,true);
  assert.equal(result.bill.history.length,0);
});
test('date required from caller avoids implicit current-time assumptions',()=>{
  const result=mergeVerifiedBill(existing,parseBillText(fakeText),'invalid');
  assert.equal(result.status,'needs_review');
});
test('statuses are deterministic and never imply confirmed payment',()=>{
  assert.equal(billStatus({paid:true,dueDate:'2026-11-02'},'2026-11-01'),'marked_paid');
  assert.equal(billStatus({dueDate:'2026-10-30'},'2026-11-01'),'overdue');
  assert.equal(billStatus({dueDate:'2026-11-03'},'2026-11-01'),'due_soon');
  assert.equal(billStatus({dueDate:'2026-12-01'},'2026-11-01'),'upcoming');
  assert.equal(billStatus({},'2026-11-01'),'unknown');
});
test('reject oversized input',()=>assert.throws(()=>parseBillText('x'.repeat(200001)),/below 200 KB/));
