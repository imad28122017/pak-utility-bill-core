# Security Policy

Never include actual utility bills, personal names, billing identifiers, account references, passwords, OTPs, cookies, email content, payment details, or API credentials in public issues, PRs, tests or logs. Use fictional examples.

The library makes no network requests and does not verify whether a document came from a utility provider. Applications MUST obtain user consent before importing data or sending it elsewhere. Display parsed fields for review and use verified sources where available; never bypass CAPTCHA, authentication, rate limits or provider restrictions.

Security reports: **maintainer must configure a private disclosure channel before publication**. Do not post sensitive exploit reports as public GitHub issues. Consider enabling GitHub private vulnerability reporting.

Before each release, scan the exact release directory and new Git history for secrets and identify copyright/license obligations. Do not fork or mirror the original private app repos to release this package.
