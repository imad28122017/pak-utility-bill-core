# How to build actual impact (not engagement inflation)

## Audience / value

Potential users: maintainers of budget apps, offline invoice managers, Pakistani civic-tech apps, document-validation tools and educational projects. The main benefit is a **small offline verified-import primitive** separate from scraping and payment gateways.

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
