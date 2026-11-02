# Security Policy

Never include actual utility bills, personal names, billing identifiers, account references, passwords, OTPs, cookies, email content, payment details, or API credentials in public issues, PRs, tests or logs. Use fictional examples.

The library makes no network requests and does not verify whether a document came from a utility provider. Applications MUST obtain user consent before importing data or sending it elsewhere. Display parsed fields for review and use verified sources where available; never bypass CAPTCHA, authentication, rate limits or provider restrictions.

**Private security reports:** Never post sensitive vulnerability details in public GitHub issues. Once this repository becomes public, the maintainer must enable GitHub **Private vulnerability reporting** under Settings → Security and quality → Advanced Security. Reporters can then use the confidential **Report a vulnerability** workflow from the repository's Security and quality page. Until that feature is enabled, no private reporting channel is configured; do not submit sensitive details publicly. If it remains unavailable, the maintainer must establish an approved confidential contact method and update this policy.

Before each release, scan the exact release directory and new Git history for secrets and identify copyright/license obligations. Do not fork or mirror the original private app repos to release this package.
