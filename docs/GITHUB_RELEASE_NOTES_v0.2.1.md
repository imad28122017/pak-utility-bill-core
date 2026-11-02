# v0.2.1 — Initial GitHub source pre-release

**Release type:** Public source pre-release. **Not published on npm.**

Pakistan Utility Bill Core is a zero-runtime-dependency, offline ESM JavaScript/TypeScript library providing safe primitives for parsing Pakistani utility-bill text and deciding whether a billing update needs human review.

## Included
- Text parsing for synthetic examples covering IESCO, SNGPL, Nayatel, and CDA Water.
- Validation of account/reference identity, billing period, amount and due date.
- Conservative rejection of missing, conflicting, mismatched or older billing records.
- Immutable updates that preserve previous data when verification fails.
- Local-calendar date utilities and integer PKR minor-unit money helpers.
- TypeScript declarations, documentation, synthetic tests, and a local consumer example.
- Automated Node.js 20/22 tests, package-consumer verification, and full-history Gitleaks scan.

## Important limitations
- No live provider inquiries, scheduled bill retrieval, reminder notifications, PDF extraction, payment functionality or provider authentication.
- A matching provider label or reference does **not** authenticate a bill's origin.
- Parsing of real-world document layouts is not independently validated at scale. Applications must obtain consent, show fields for confirmation and verify trusted sources.
- The package is marked `"private": true`; this GitHub source release is **not** an npm registry release.
- No government, utility or provider endorsement is claimed.

## Getting started
```bash
git clone https://github.com/imad28122017/pak-utility-bill-core.git
cd pak-utility-bill-core
npm test
npm run example
npm run verify:package
npm run audit:secrets
```

The versioned public source can also be inspected via the GitHub tag once this pre-release is published.

## Contributors
Bug reports, original synthetic fixtures and reproducible compatibility improvements are welcome. **Never upload real invoices, account references, payment credentials or private documents.** Please read `CONTRIBUTING.md` and `SECURITY.md` first.

## Verification
The public `main` branch was confirmed to pass both CI and full-history security checks on November 2, 2026. Before creating the release, confirm the same checks pass for the exact target commit.

**License:** MIT.
