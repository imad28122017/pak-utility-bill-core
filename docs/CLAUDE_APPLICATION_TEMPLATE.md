# Claude for Open Source — factual application draft (2026-11-02)

**Status: application can be submitted, but no qualifying impact threshold has been verified. Do not imply acceptance or state that new releases alone meet the eligibility rules.**

Official terms: https://www.anthropic.com/claude-for-oss-terms
Application: https://claude.com/contact-sales/claude-for-oss

## Verified profile and public work

- GitHub: https://github.com/imad28122017 (account created 2017-12-28; age requirement met)
- Primary repository: https://github.com/imad28122017/pak-utility-bill-core
- npm: https://www.npmjs.com/package/pak-utility-bill-core
- License: MIT; publicly available zero-runtime-dependency Node/TypeScript-compatible utility-bill text parsing and validation library
- Releases: GitHub v0.2.1 source pre-release; npm 0.2.2-beta.0 and 0.2.2-beta.1. The latter was staged with a validated GitHub OIDC trusted publisher and approved by the maintainer. Signed provenance available through npm.
- Tests: 42 automated tests, GitHub CI and full-history secret scan.
- Scope: text parsing and conservative billing-cycle updates with **synthetic fixture formats**; *not* live provider retrieval, payment verification, PDF processing, or provider-issued document authenticity verification.
- Independent adoption: no documented dependent projects, external contributors or qualified ecosystem impact. npm downloads have not been reliably measured.

## Suggested application — 'What do you maintain?'

I maintain Pakistan Utility Bill Core, a public MIT-licensed JavaScript/TypeScript library for offline parsing and conservative validation of Pakistani utility-bill text. The goal is to help app developers detect ambiguous amounts, mismatched account references, stale bill periods and invalid dates before imported data replaces a previously verified bill. The library has no runtime dependencies, uses fictional test fixtures and is distributed through npm. It includes 42 automated tests, CI, secret scanning and signed release provenance for its latest beta. I have begun inviting outside developers to evaluate its integration experience and edge cases. It is recently launched and **does not yet have verified independent adoption**.

## Suggested application — 'How do you contribute to open source?'

I publish and maintain a standalone utility library under MIT, including its API, tests, security disclosures, TypeScript declarations, npm releases and contribution documentation. I prioritize privacy, cautious bill-import validation, and examples that never expose real customer bills. At present my verified open-source contribution is maintaining this project; I cannot claim major-package downstream reliance, 100 merged PRs into others' repositories, or 20 external merged contributors.

## Suggested application — 'What would you use Claude for?'

I would use Claude to review and improve open-source parsing and validation APIs, develop deterministic tests for synthetic provider-formats and ambiguous billing cases, strengthen TypeScript and consumer integration documentation, assess contributor PRs, and maintain a secure release workflow. All generated code would be reviewed and tested. Private customer documents or credentials would not be provided.

## Helpful links to include

- https://github.com/imad28122017/pak-utility-bill-core/issues/13 — npm-installed getting-started issue
- https://github.com/imad28122017/pak-utility-bill-core/issues/14 — synthetic edge-case coverage
- https://github.com/imad28122017/pak-utility-bill-core/actions
- https://www.npmjs.com/package/pak-utility-bill-core

## Before actually applying

1. Confirm the application form's precise required fields and answer only with verified facts; do not insert imaginary dependents/downloads.
2. If applying through the discretionary ecosystem impact route, describe the currently early stage truthfully. The chance of approval with no third-party impact evidence is low.
3. Prefer waiting for verifiable public contributions, genuine independent adopters and useful compatibility improvements. There is no guaranteed waiting period or qualifying number of small milestones for discretionary acceptance.
4. Do not publish or share the account's npm tokens, credentials or private project data.
