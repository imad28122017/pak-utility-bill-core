# How to build actual impact (not engagement inflation)

## Audience / value

Potential users: maintainers of budget apps, offline invoice managers, Pakistani civic-tech apps, document-validation tools and educational projects. The main benefit is a **small offline verified-import primitive** separate from scraping and payment gateways.

## Public beta and first-user evaluation (November 2026)

**Current registry:** `npm install pak-utility-bill-core@next` installs the publicly released beta.1. The tag `latest` still points to beta.0. The package has signed npm provenance, 42 tests, and no runtime dependencies, but **real-world adoption and provider-specific compatibility are not yet established**.

Invite a small number of genuinely independent developers maintaining Pakistan-oriented budgeting, civic-tech or document-processing applications to try one **fictional** test case each. Ask them whether the parsing/validation API is useful, which labels/inputs fail, and what integration friction exists. Be explicit that this is **text parsing, not provider retrieval or document authenticity verification**. Never ask for customer bills or actual account details.

Provide a concise public reproduction issue with synthetic example input, expected output, actual output, Node version and package version. Log independently verified consumers and public integration URLs in the evidence ledger only with permission. Do not artificially generate installs, stars, forks, downloads, contributors or dependents.

## Responsible outreach

- Publish clear technical documentation and a tiny browser/Node example; don't announce production-readiness prematurely.
- Search for developers working on bill/invoice ingestion and ask whether this solves a real problem; avoid mass unsolicited requests.
- Invite independent contributors to report limitations using synthetic examples.
- Work with users to create additional providers/label formats only when permitted public documents or invented fixtures support them.
- Publish honest semver releases, changelogs, test evidence, limitations and issue resolutions.

## Roadmap

- v0.2: stable core, TypeScript declarations, strict identity validation, CI, synthetic fixtures.
- v0.3: additional tested label families, documented adapter architecture, browser demo without file uploads.
- v0.4: privacy-respecting PDF text extraction adapter (optional separate package, with audited dependency).
- v1.0: independently validated compatibility matrix and versioned package with community feedback.

## Application readiness

Track actual public dependency counts, registry download data and real outside contributor/consumer evidence. New code on your account alone is not an Anthropic qualification route. The discretionary impact track requires meaningful ecosystem reliance.
