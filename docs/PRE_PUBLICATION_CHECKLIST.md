# Pre-publication security and licensing checklist

**Release authorization:** Owner approved public visibility for this standalone GitHub repository and the MIT license on 2026-11-02; actual visibility still needs confirmation. npm publication is NOT approved and remains blocked.

- [x] Owner affirmed exclusive rights/no employer-client publication restriction for the independently written standalone package on 2026-11-02. Additional third-party rights must still be respected.
- [x] Repository owner approved MIT for the independent core library on 2026-11-02.
- [x] Owner affirmed no employer/client ownership restrictions on 2026-11-02. This is an owner attestation, not independent legal verification.
- [ ] Complete final human inspection for potential third-party text, code, trademark and assets.
- [ ] Review files and public examples for real names, email addresses, bank/wallet details, payment or billing identifiers, customer/provider invoices, copyrighted logos and proprietary documentation.
- [x] Targeted heuristic checks of the 31 tracked files and four main-branch commit diffs found no matching credential patterns (2026-11-02); synthetic bill references were identified in tests.
- [x] Full-history and working-tree Gitleaks workflow passed on 2026-11-02 at commit `991060a` (see GitHub Actions); automated scans have limitations.
- [ ] Independent human review of tracked content and all reachable Git history before public release. Don't initialize the new public repo from a clone/fork of the old private repos.
- [ ] Put `node_modules`, `.env*`, output artifacts, and local test documents in `.gitignore`; allowlist only `/server/.env.example` if intentionally needed (not in this package).
- [x] Owner enabled dependency graph, automatic dependency submission, Dependabot alerts, malware alerts and Dependabot security updates (2026-11-02).
- [x] The owner confirmed **Private vulnerability reporting enabled** in GitHub's Advanced Security settings on 2026-11-02; `SECURITY.md` now identifies the confidential reporting channel.
- [ ] Independently review whether additional GitHub code/secret-scanning protections are available, and configure those appropriate for this public repository.
- [x] GitHub Actions test/example/pack CI passed on Node 20 and 22 for v0.2.1 initial staging (2026-11-02); verify again for any updated commit.
- [x] Fresh offline npm package-consumer import passed on Node 20 and Node 22 in GitHub Actions at commit `991060a`.
- [ ] Recheck final release artifact before any future npm publication (not authorized).
- [ ] Verify the package name is available before npm publication and explicitly review the npm tarball with `npm pack --dry-run`.
- [x] Owner explicitly authorized public visibility for **this repository only** on 2026-11-02.
- [x] Verified GitHub repository visibility as **public** and both CI/security workflows passing at `c771f3a` on 2026-11-02.
- [ ] Human owner reviews the publicly visible README, Actions logs and history; automated scans alone are not an independent legal/privacy certification.
- [ ] Obtain separate owner authorization before changing package `private: true` or running `npm publish`.
- [ ] If any genuine credentials were **ever** committed, revoke/rotate them first; do not rely on deleting or rewriting history to make credentials safe.
- [ ] Avoid claims of affiliations or endorsements from utility providers; no automatic provider lookups are included.
- [ ] Add maintainers' public contact details, support policy, CI tests, code of conduct and an actual issue/PR contribution process before public promotion.
- [ ] Cite ecosystem impact only after genuinely demonstrable community reliance. No fixed waiting period guarantees acceptance. Never invent downloads, dependents, stars, forks, contributors or adoption metrics.

For safe Git operations follow https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository
