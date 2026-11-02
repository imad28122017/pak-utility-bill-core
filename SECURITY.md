# Security Policy

Never include actual utility bills, personal names, billing identifiers, account references, passwords, OTPs, cookies, email content, payment details, or API credentials in public issues, PRs, tests or logs. Use fictional examples.

The library makes no network requests and does not verify whether a document came from a utility provider. Applications MUST obtain user consent before importing data or sending it elsewhere. Display parsed fields for review and use verified sources where available; never bypass CAPTCHA, authentication, rate limits or provider restrictions.

Security reports: this repository is currently **private**, and no public disclosure channel is configured yet. Never post sensitive details in public issues. Before public launch, enable GitHub **Private vulnerability reporting** under Settings → Security and quality → Advanced Security, and update this policy to point reporters to the **Report a vulnerability** control. GitHub makes this feature available for public repositories; it will not appear while this repository remains private. If the feature is unavailable when public, configure an alternative confidential owner-approved reporting address before promotion.

Before each release, scan the exact release directory and new Git history for secrets and identify copyright/license obligations. Do not fork or mirror the original private app repos to release this package.
