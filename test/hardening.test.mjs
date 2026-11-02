import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parseBillText, verifyImport, mergeVerifiedBill, normalizeReference,
  parsePKRMinor, formatPKRMinor, normalizeDate, normalizePeriod, billStatus
} from '../src/index.mjs';

const samples = {
  iesco: { provider:'iesco', reference:'99998888777766',
    text:'IESCO Electricity Bill\nBilling Month: November 2026\nReference Number: 99998888777766\nAmount Payable: Rs. 2,650.00\nLast Date for Payment: 15 Dec 2026' },
  sngpl: { provider:'sngpl', reference:'99999999999',
    text:'SNGPL Consumer Statement\nBill Period: October 2026\nAccount Number: 99999999999\nNet Payable: 1234.45\nDue Date: 2026-11-20' },
  nayatel: { provider:'nayatel', reference:'NTL-999999',
    text:'Nayatel Monthly Invoice\nBilling Month: November 2026\nNTL No: NTL-999999\nGrand Total: PKR 2,499\nDue Date: 15/11/2026' },
  cda: { provider:'cda', reference:'9999999',
    text:'CDA Water & Allied Charges\nBilling Period: October 2026\nConsumer Number: 9999999\nWithin Due Date: PKR 399.00\nDue Date: 30 Nov 2026' }
};

for (const [name, fixture] of Object.entries(samples)) {
  test(`parse+verify independent invented ${name} statement`, () => {
    const parsed = parseBillText(fixture.text);
    assert.equal(parsed.provider, fixture.provider);
    assert.equal(parsed.reference, fixture.reference);
    assert.equal(parsed.issues.length, 0);
    const existing = { provider:name, reference:fixture.reference, billingPeriod:'2026-09', dueDate:'2026-10-01', paid:true };
    const decision = mergeVerifiedBill(existing, parsed, '2026-11-02');
    assert.equal(decision.status, 'updated');
    assert.equal(decision.bill.paid, false);
    assert.equal(existing.paid, true);
  });
}

test('reject valid-looking but wrong-length IESCO and SNGPL account references', () => {
  const parsed = parseBillText(samples.iesco.text.replaceAll('99998888777766','12345'));
  const verdict = verifyImport({provider:'iesco',reference:'12345'}, parsed);
  assert.equal(verdict.ok, false);
  assert.ok(verdict.issues.some(s=>s.includes('format')));
  const gas = parseBillText(samples.sngpl.text.replaceAll('99999999999','00000'));
  assert.equal(verifyImport({provider:'sngpl',reference:'00000'}, gas).ok, false);
});

test('reject unknown provider in stored account even if parsed statement has matching marker', () => {
  assert.equal(verifyImport({provider:'unknown',reference:'99999999999'}, parseBillText(samples.sngpl.text)).ok,false);
});

test('reference punctuation normalization is consistent but not a substring match', () => {
  assert.equal(normalizeReference(' ntl-999 999 '),'NTL999999');
  const parsed = parseBillText(samples.nayatel.text);
  assert.equal(verifyImport({provider:'nayatel',reference:'NTL 999999'},parsed).ok,true);
  assert.equal(verifyImport({provider:'nayatel',reference:'999999'},parsed).ok,false);
});

test('no silent acceptance when a repeated labelled amount is malformed', () => {
  const parsed = parseBillText(samples.iesco.text+'\nAmount Payable: something else');
  assert.equal(parsed.amountMinor,null);
  assert.equal(verifyImport({provider:'iesco',reference:samples.iesco.reference}, parsed).ok, false);
});

test('identical repeated labelled amount may be used', () => {
  const parsed = parseBillText(samples.iesco.text+'\nAmount Payable: Rs. 2,650.00');
  assert.equal(parsed.amountMinor,265000);
  assert.deepEqual(parsed.issues,[]);
});

test('multiple valid but different due dates are ambiguous', () => {
  const parsed = parseBillText(samples.iesco.text+'\nDue Date: 16 Dec 2026');
  assert.equal(parsed.dueDate,null);
  assert.ok(parsed.issues.some(s=>s.includes('dueDate')));
});

test('invalid dates, missing billing period, and contradictory labels require review', () => {
  const invalid = parseBillText(samples.cda.text.replace('30 Nov 2026','31 Nov 2026'));
  assert.equal(invalid.dueDate,null);
  const missing = parseBillText(samples.cda.text.replace(/Billing Period:.*\n/,' '));
  assert.equal(missing.billingPeriod,null);
  const multi = parseBillText(samples.cda.text+'\nIESCO');
  assert.equal(multi.provider,null);
});

test('stale due date is rejected even if a later billing period is present',()=> {
  const parsed = parseBillText(samples.iesco.text);
  const existing = {provider:'iesco',reference:samples.iesco.reference,billingPeriod:'2026-10',dueDate:'2026-12-20'};
  const result = mergeVerifiedBill(existing,parsed,'2026-11-02');
  assert.equal(result.status,'needs_review');
  assert.strictEqual(result.bill, existing);
});

test('stored billing period and due date must be structurally sound',()=> {
  const parsed = parseBillText(samples.sngpl.text);
  assert.equal(verifyImport({provider:'sngpl',reference:samples.sngpl.reference,billingPeriod:'October twenty',dueDate:'2026-11-01'},parsed).ok,false);
  assert.equal(verifyImport({provider:'sngpl',reference:samples.sngpl.reference,billingPeriod:'2026-09',dueDate:'2026-02-30'},parsed).ok,false);
});

test('non-canonical parsed billing period triggers verification failure',()=> {
  const parsed = {...parseBillText(samples.sngpl.text),billingPeriod:'October 2026'};
  assert.equal(verifyImport({provider:'sngpl',reference:samples.sngpl.reference},parsed).ok,false);
});

test('invalid incoming record is never mutated and no customer values are echoed in issues',()=> {
  const before = Object.freeze({provider:'sngpl',reference:'99999999999',billingPeriod:'2026-09'});
  const parsed = parseBillText(samples.sngpl.text.replace('99999999999','99999999998'));
  const result = mergeVerifiedBill(before,parsed,'2026-11-02');
  assert.strictEqual(result.bill,before);
  assert.ok(result.issues.every(x => !x.includes('99999999999') && !x.includes('99999999998')));
});

test('too-long non-ASCII text is bounded by bytes, not only JS string length',()=> {
  assert.throws(()=>parseBillText('😀'.repeat(50100)),/200 KB/);
});

test('unexpected and hostile inputs never trigger auto-merge',()=> {
  const record={provider:'iesco',reference:samples.iesco.reference};
  const inputs=['', 'IESCO', 'IESCO\nAmount Due: 1', 'IESCO\nDue Date: 2026-01-01', 'SNGPL\nReference No: 99998888777766'];
  for(const input of inputs) assert.equal(verifyImport(record,parseBillText(input)).ok,false);
});

test('amount parser treats unknown as unknown rather than zero and checks safe range',()=> {
  for(const s of ['','PKR -1','PKR 1.234','Rs. NaN','12,345,67','1e9']) assert.equal(parsePKRMinor(s),null);
  assert.equal(parsePKRMinor('PKR 0'),0);
  assert.equal(formatPKRMinor(-1),null);
});

test('status never asserts provider-confirmed payment',()=> {
  assert.equal(billStatus({paid:true,dueDate:'2026-11-03'},'2026-11-02'),'marked_paid');
  assert.equal(billStatus({paid:false,dueDate:'2026-11-02'},'2026-11-02'),'due_soon');
});

test('strict calendar parser rejects US-style ambiguous values and malformed periods',()=> {
  assert.equal(normalizeDate('11/30/2026'),null);
  assert.equal(normalizeDate('29 Feb 2026'),null);
  assert.equal(normalizePeriod('Dec 2026'),'2026-12');
  assert.equal(normalizePeriod('2026-00'),null);
});

test('null input never auto-verifies',()=> {
  assert.equal(verifyImport(null,parseBillText(samples.iesco.text)).ok,false);
  assert.equal(verifyImport({provider:'iesco',reference:samples.iesco.reference},null).ok,false);
});

test('amount payable within due date is recognized, not confused with a late penalty',()=> {
  const text=samples.iesco.text.replace('Amount Payable: Rs. 2,650.00','Amount Payable Within Due Date: Rs. 2,650.00');
  assert.equal(parseBillText(text).amountMinor,265000);
});

test('saved non-canonical billing period requires review',()=> {
  const parsed=parseBillText(samples.sngpl.text);
  assert.equal(verifyImport({provider:'sngpl',reference:samples.sngpl.reference,billingPeriod:'Oct 2026'},parsed).ok,false);
});


test('same-cycle amount corrections require manual review rather than replacing a paid record',()=> {
  const parsed=parseBillText(samples.iesco.text);
  const existing={provider:'iesco', reference:samples.iesco.reference, billingPeriod:'2026-11', dueDate:'2026-12-15',amountMinor:12300,paid:true};
  const result=mergeVerifiedBill(existing,parsed,'2026-11-02');
  assert.equal(result.status,'needs_review');
  assert.strictEqual(result.bill,existing);
  assert.ok(result.issues.some(s=>s.includes('Amount changed')));
});


test('untrusted parser diagnostics never echo account details or secret strings', () => {
  const raw = parseBillText(samples.iesco.text);
  const injected = {...raw, issues: [
    'Unrecognized account 99998888777766',
    'Sensitive diagnostic: api-key-EXAMPLE-PRIVATE',
  ]};
  const existing = {provider: 'iesco', reference: samples.iesco.reference, billingPeriod:'2026-09'};
  const verified = verifyImport(existing, injected);
  assert.equal(verified.ok, false);
  assert.deepEqual(verified.issues, ['Parsed document has missing, conflicting or unverified fields']);
  const merged = mergeVerifiedBill(existing, injected, '2026-11-02');
  assert.equal(merged.status,'needs_review');
  assert.strictEqual(merged.bill, existing);
  assert.ok(!JSON.stringify(merged.issues).includes('99998888777766'));
  assert.ok(!JSON.stringify(merged.issues).includes('api-key-EXAMPLE-PRIVATE'));
});

test('diagnostics that are not a string array still cannot provide free-form messages', () => {
  const parsed = {...parseBillText(samples.iesco.text),issues:['client name: Test Customer', {}, 9]};
  const existing = {provider:'iesco',reference:samples.iesco.reference};
  const result=verifyImport(existing,parsed);
  assert.equal(result.ok,false);
  assert.ok(result.issues.every(s=>!s.includes('Test Customer')));
});
