# Pre-publication security and licensing checklist

**Current state:** release candidate prepared for its independent **private** GitHub repository; not yet publicly distributed, not published to npm.

- [ ] Confirm exclusive ownership or publication permission for each source component and for any work created with employers, clients or AI-assisted tools. This new package should remain independent of both private app source trees.
- [ ] Confirm MIT license and attribution with all relevant copyright owners.
- [ ] Review files and public examples for real names, email addresses, bank/wallet details, payment or billing identifiers, customer/provider invoices, copyrighted logos and proprietary documentation.
- [ ] Review **all tracked files AND history** in the *new* repo using Gitleaks or comparable scanning. Don't initialize the new public repo from a clone/fork of the old private repos.
- [ ] Put `node_modules`, `.env*`, output artifacts, and local test documents in `.gitignore`; allowlist only `/server/.env.example` if intentionally needed (not in this package).
- [ ] Set up CodeQL/dependency/security scanning, GitHub secret push protection and private vulnerability reporting.
- [ ] Confirm all tests pass on Node 20+ and package consumer imports work on supported engines.
- [ ] Verify the package name is available before npm publication and explicitly review the npm tarball with `npm pack --dry-run`.
- [ ] Manually approve the final `git diff --cached`, branch, repository visibility and npm publish command.
- [ ] If any genuine credentials were **ever** committed, revoke/rotate them first; do not rely on deleting or rewriting history to make credentials safe.
- [ ] Avoid claims of affiliations or endorsements from utility providers; no automatic provider lookups are included.
- [ ] Add maintainers' public contact details, support policy, CI tests, code of conduct and an actual issue/PR contribution process before public promotion.
- [ ] Cite ecosystem impact only after genuinely demonstrable community reliance. No fixed waiting period guarantees acceptance. Never invent downloads, dependents, stars, forks, contributors or adoption metrics.

For safe Git operations follow https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository
