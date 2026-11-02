# Pre-publication security and licensing checklist

**Current state:** release candidate prepared for its independent **private** GitHub repository; not yet publicly distributed, not published to npm.

- [ ] Confirm exclusive ownership or publication permission for each source component and for any work created with employers, clients or AI-assisted tools. This new package should remain independent of both private app source trees.
- [x] Repository owner approved MIT for the independent core library on 2026-11-02.
- [ ] Confirm no employer, client, collaborator, or third-party rights require additional approval.
- [ ] Review files and public examples for real names, email addresses, bank/wallet details, payment or billing identifiers, customer/provider invoices, copyrighted logos and proprietary documentation.
- [x] Targeted heuristic checks of the 31 tracked files and four main-branch commit diffs found no matching credential patterns (2026-11-02); synthetic bill references were identified in tests.
- [ ] Run a specialist secret scanner and independent human review of **all tracked files AND history** in the new repo before public release. Don't initialize the new public repo from a clone/fork of the old private repos.
- [ ] Put `node_modules`, `.env*`, output artifacts, and local test documents in `.gitignore`; allowlist only `/server/.env.example` if intentionally needed (not in this package).
- [x] Owner enabled dependency graph, automatic dependency submission, Dependabot alerts, malware alerts and Dependabot security updates (2026-11-02).
- [ ] Configure available code/secret scanning and confirm private vulnerability reporting once repository is deliberately made public.
- [x] GitHub Actions test/example/pack CI passed on Node 20 and 22 for v0.2.1 initial staging (2026-11-02); verify again for any updated commit.
- [ ] Verify fresh offline npm package-consumer import in Node 20/22 CI and recheck the final release artifact before publishing.
- [ ] Verify the package name is available before npm publication and explicitly review the npm tarball with `npm pack --dry-run`.
- [ ] Manually approve the final `git diff --cached`, branch, repository visibility and npm publish command.
- [ ] If any genuine credentials were **ever** committed, revoke/rotate them first; do not rely on deleting or rewriting history to make credentials safe.
- [ ] Avoid claims of affiliations or endorsements from utility providers; no automatic provider lookups are included.
- [ ] Add maintainers' public contact details, support policy, CI tests, code of conduct and an actual issue/PR contribution process before public promotion.
- [ ] Cite ecosystem impact only after genuinely demonstrable community reliance. No fixed waiting period guarantees acceptance. Never invent downloads, dependents, stars, forks, contributors or adoption metrics.

For safe Git operations follow https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository
