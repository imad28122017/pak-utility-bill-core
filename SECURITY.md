# Security Policy

Never include actual utility bills, personal names, billing identifiers, account references, passwords, OTPs, cookies, email content, payment details, or API credentials in public issues, PRs, tests or logs. Use fictional examples.

The library makes no network requests and does not verify whether a document came from a utility provider. Applications MUST obtain user consent before importing data or sending it elsewhere. Display parsed fields for review and use verified sources where available; never bypass CAPTCHA, authentication, rate limits or provider restrictions.

**Private security reports:** This repository is public. **Never post sensitive vulnerability details in a public GitHub issue.** The maintainer should enable GitHub **Private vulnerability reporting** under Settings → Security and quality → Advanced Security. Once enabled, reporters can choose **Report a vulnerability** on the repository's Security and quality page. Until a confidential channel has been confirmed, please do not disclose sensitive details publicly; the maintainer must configure and verify a reporting path before promoting this project broadly. This policy will be updated when that channel is confirmed.

Before each release, scan the exact release directory and new Git history for secrets and identify copyright/license obligations. Do not fork or mirror the original private app repos to release this package.
