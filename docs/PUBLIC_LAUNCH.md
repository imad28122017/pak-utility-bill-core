# Public GitHub launch and verification (November 2, 2026)

**Verified:** `imad28122017/pak-utility-bill-core` is public as of 2026-11-02. Main commit `6a87112` passed Tests and package audit (Node 20 and 22) and full-history Gitleaks scan. **Both GitHub source and npm beta package are public as of 2026-11-02.**

## Scope and consent

The repository owner explicitly approved making **only** `imad28122017/pak-utility-bill-core` public under MIT, and affirmed no employer/client ownership restrictions. This approval does **not** cover Pocki or Duewise. The owner separately approved and completed the first npm beta release on 2026-11-02.

## Completed technical evidence

- GitHub CI passed on Node.js 20 and 22: tests, coverage, example, offline packed-package consumer check and targeted credential scanner.
- Full Git history and working tree passed Gitleaks on commit `991060a` (November 2, 2026). Scanner results do not replace a final human inspection.
- Synthetic sample data is used; no provider access, credentials, PDFs or financial records are included.

## Final pre-switch checklist

- [ ] Maintainer reviews current README, tracked files, history, workflows and GitHub Actions logs for material that will become public.
- [ ] Maintainer confirms the latest GitHub Actions full-history scan and tests on the exact release commit both pass.
- [ ] Maintainer reviews any external trademarks, licenses and documentation; the owner has attested there are no employer/client restrictions.
- [ ] Confirm this is `imad28122017/pak-utility-bill-core`, **not** the private app repositories.

## GitHub visibility steps (completed by owner 2026-11-02)

1. Visit https://github.com/imad28122017/pak-utility-bill-core
2. Choose **Settings** → **General**, then scroll to **Danger Zone**.
3. Under **Change repository visibility**, click **Change visibility**, select **Public**, and confirm GitHub's warnings.
4. Verify the repository shows **Public**, ideally in a signed-out browser.
5. **Completed 2026-11-02:** The owner enabled **Private vulnerability reporting** and confirmed the **Disable** control on GitHub's Settings → Security and quality → Advanced Security screen, indicating the feature is enabled.
6. Confirm GitHub Actions history and source are appropriate for public viewing. Do not include real customer data in issue reports or fixtures.

Note: GitHub may make all prior workflow history/logs visible after the visibility change. Visibility can only be changed by a GitHub user or an authorized browser session with repository administration access.

## After the public launch

- Prepare a **GitHub-only source pre-release**, tag `v0.2.1`, using [proposed release notes](GITHUB_RELEASE_NOTES_v0.2.1.md). Select the tested `main` commit when publishing. Tagging a source release does **not** publish to npm.
- **Completed:** npm `0.2.2-beta.0` was published with owner authentication and 2FA. Future releases must use a new version; prefer trusted publishing and a staged approval workflow.
- Update the eligibility evidence ledger with **verified** public metrics; do not claim Claude for OSS qualification simply from going public.
- Seek genuine adopter feedback, independent integrations, responsible security reports and contributions.

GitHub documentation:
- https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility
- https://docs.github.com/en/code-security/how-tos/report-and-fix-vulnerabilities/configure-vulnerability-reporting/configure-for-a-repository
