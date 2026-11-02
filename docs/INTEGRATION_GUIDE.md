# Integration guide: host app responsibilities

This library is intentionally **not** a bill-fetching service. A host app can use it from a mobile app, web app, worker or Node backend without submitting bill text to a third party.

## Safe import sequence

1. Obtain a document from a source the user trusts, with explicit user permission.
2. Extract text entirely in the host app (PDF/OCR processing is NOT included in this package).
3. Call `parseBillText` with the extracted text. Avoid logging raw text or identifiers.
4. Retrieve the saved account record privately from the app and call `verifyImport(existing, parsed)`.
5. If verification fails, show a review interface; **do not update** the saved record.
6. If verification succeeds, confirm the document's origin (the parsing result alone cannot authenticate it), review amount and due date, then call `mergeVerifiedBill(existing, parsed, todayISO)`.
7. Persist only the returned `result.bill` after user confirmation. Reject older billing periods, wrong account references, ambiguous labels and invalid amounts.
8. Treat `marked_paid` as a local app state, never provider-confirmed payment.

## Example — no network calls

```js
import { parseBillText, verifyImport, mergeVerifiedBill } from './src/index.mjs';

function planImport(existing, text, todayISO) {
  const parsed = parseBillText(text);
  const review = verifyImport(existing, parsed);
  if (!review.ok) return { action: 'review', issues: review.issues };
  return { action: 'confirm_source_and_import',
    preview: { amountMinor: parsed.amountMinor, dueDate: parsed.dueDate,
      billingPeriod: parsed.billingPeriod },
    apply: () => mergeVerifiedBill(existing, parsed, todayISO) };
}
```

The example must not be used to bypass the host app's authentication, security, data protection or source authenticity controls.

## Why avoid provider network adapters in this package?

Providers may require region-specific access, official credentials, login controls, rate limiting or anti-automation checks. This package deliberately does not fetch websites or simulate payments, and it must not be presented as an officially supported API.
