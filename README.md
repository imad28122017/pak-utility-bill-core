# Pakistan Utility Bill Core (npm prerelease 0.2.2-beta.0)

**Zero-dependency offline JavaScript/TypeScript library** for text-based Pakistani utility-bill parsing, identity verification, and safe billing-cycle updates.

> **Public GitHub source; npm release pending.** Owner authorized an npm early-access release on 2026-11-02. This branch prepares **0.2.2-beta.0**, intended for the npm **`next`** dist-tag via an owner-authenticated staged first publication. It is **not available on npm until the owner approves the staged package with 2FA**. Pocki and Duewise remain private; no provider affiliation or endorsement is implied. No Claude for OSS eligibility is established.

## Motivation

This project grew out of a simple personal experience: missing a utility-bill due date. Its longer-term goal is to make recurring bill tracking less error-prone through one-time setup, accurate monthly updates, and timely reminders. Those automatic retrieval and reminder features belong to host applications; **this core library currently only parses and validates supplied bill text and performs conservative billing-cycle updates**. It does not contact providers or schedule notifications.

Utility bill collectors often import copied bill text, scanned-document text, or invoices received by email. Without validation, an unrelated account, stale month or conflicting amount can silently overwrite a previously valid record. This package checks **consistency** of provider label, account reference, bill period, amount and due date, then preserves the existing record when a check fails. It never authenticates an invoice's origin.

## Features

- Fully offline, ESM-only, no runtime dependencies or network calls
- Conservative text parsing and missing/conflicting field detection
- ISO local-calendar dates, PKR integer minor units (paisa), known-provider labels
- Exact reference/provider checks, stale billing-period and due-date rejection
- Immutable merge with previous history preserved, including recorded payment status
- TypeScript declarations, synthetic fixtures, Node 20+/22 CI, package-consumer example

## Run locally

```bash
npm test
npm run test:coverage
npm run example
npm run pack:check
```

## Install from npm after staged release approval

Once the owner approves a staged npm publication, developers can install the early-access package with `npm install pak-utility-bill-core@next`. Until then, clone the public GitHub repository to test from source. See [npm first-publication instructions](docs/NPM_FIRST_PUBLISH.md).

## Use after installing a published package

```js
import { parseBillText, mergeVerifiedBill } from 'pak-utility-bill-core';

const text = `IESCO Electricity Bill
Billing Month: October 2026
Reference No: 99998888777766
Amount Due: PKR 1,234.50
Due Date: 05 Nov 2026`;
const previous = { provider: 'iesco', reference: '99998888777766',
  billingPeriod: '2026-09', dueDate: '2026-10-05', amountMinor: 45000, paid: false };
const result = mergeVerifiedBill(previous, parseBillText(text), '2026-11-01');
if (result.status === 'needs_review') {
  // Show review UI. The result.bill is precisely the original 'previous' object.
} else {
  // The host must ALSO confirm the source of the document is trusted.
}
```

For local development use `./src/index.mjs` instead of the package specifier. Test examples use **invented** reference numbers, not real accounts.

## Supported input (text only)

| Field | Example labels | Rules |
| --- | --- | --- |
| Provider label | IESCO, SNGPL, Nayatel, CDA Water | A matching text label is **not** proof of identity |
| Reference | Reference No, Account Number, NTL No, Consumer Number | Required for auto-update; exact normalized match |
| Amount | Amount Due, Total Payable, Within Due Date | Only unambiguous PKR numeric values; paisa integers |
| Due date | Due Date, Last Date for Payment | Only valid dates; numeric input uses day-first convention |
| Period | Billing Month, Bill Period | Must resolve to canonical YYYY-MM |

Other formats require adapters and testing. Unknown or conflicting values are rejected. Error messages from caller-supplied parsed objects are never echoed verbatim; they may contain sensitive data. No live PITC/SNGPL/Nayatel/CDA endpoint is used. OCR, PDF extraction and trusted-origin validation are explicitly outside the library.

## Maintainer and contribution documentation

- [Security & reporting](SECURITY.md), [threat model](docs/THREAT_MODEL.md)
- [Contributing](CONTRIBUTING.md), [community conduct](CODE_OF_CONDUCT.md)
- [Public launch steps](docs/PUBLIC_LAUNCH.md), [release checklist](docs/PRE_PUBLICATION_CHECKLIST.md), [maintainer sign-off](docs/MAINTAINER_SIGNOFF.md), [launch plan](docs/RELEASE_PLAN.md)
- [Adoption plan](docs/ADOPTION_PLAN.md), [Anthropic program evidence ledger](docs/ELIGIBILITY_EVIDENCE.md)
- [App integration guide](docs/INTEGRATION_GUIDE.md), [synthetic compatibility matrix](docs/COMPATIBILITY.md), [application template](docs/CLAUDE_APPLICATION_TEMPLATE.md)

**Scope:** This package cannot verify whether a bill has actually been paid, cannot determine the official issuer of a PDF, must never bypass authentication/CAPTCHA, and never stores financial or billing data. All customer identifiers and invoices should remain inside the host app's private storage.

**License:** MIT, approved for public GitHub and early-access npm publication by the owner. npm staging and 2FA approval are still required; npm is not yet live.
