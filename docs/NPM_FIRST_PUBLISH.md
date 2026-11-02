# npm publication record and future trusted-publishing setup — 0.2.2-beta.0

**Verified 2026-11-02:** the owner successfully published `pak-utility-bill-core@0.2.2-beta.0` to the public npm registry via the authenticated CLI. Git source commit: `1c65b6e0a78186a8f74959cc2a9cf21ad9490d20`. Registry tarball SHA-1: `b3bcc77a1f7c49a4633f9138b378afb7201460ec`; expected 11 files. This document retains first-release bootstrap steps for future reference, but do not repeat them on the existing version. **npm package versions are immutable.**

**Owner approved npm early-access publication on 2026-11-02.** The package is not published merely because the repository is public. The original v0.2.1 GitHub source pre-release remains unchanged.

## Name and safeguards
- Name requested: `pak-utility-bill-core` (unscoped public npm package).
- Package name is now registered and owned by the publishing npm account; the version `0.2.2-beta.0` is publicly available.
- The initial release was published using `--tag next`. The registry nevertheless currently has **both `next` and `latest` set to `0.2.2-beta.0`**. Consequently, an unqualified install gets the beta. Decide explicitly how to handle `latest` as the project matures; avoid advertising beta as production-ready.
- MIT. Zero runtime dependencies. Public repository matches `package.json`.
- `npm run release:check` and `npm pack --dry-run --json` must pass on the exact release commit.
- **Never paste passwords, recovery codes, 2FA codes, or npm tokens into GitHub issues, Actions secrets, or ChatGPT.**

## Critical first-publication limitation

With a new npm package name, the initial authorized publisher must first establish ownership. This package was bootstrapped by its owner using a direct publish. **Correction (2026-11-02):** npm's current official staged-publishing documentation allows staging a new package, which creates an initial public `0.0.0-stage` placeholder until a maintainer approves the staged version with 2FA. This project's first version was already published directly via authenticated `npm publish --tag next --access public`; this historical record must not be mistaken for a rule that all initial packages require direct publishing. npm trusted publishing still requires a package-specific trust configuration and an appropriate OIDC workflow.

Source: https://docs.npmjs.com/cli/v11/commands/npm-trust/ and https://docs.npmjs.com/staged-publishing/

## Initial bootstrap (historical steps — completed 2026-11-02)

Prerequisites: npmjs.com account; account 2FA enabled; Node.js >=22.14; npm >=11.15; git installed. The authenticated npm username is independent of the GitHub username.

1. Open Terminal. Run `node --version` and `npm --version`.
2. If needed update npm CLI for Node 22+: `npm install -g npm@^11`; check `npm --version` again.
3. Sign in locally using `npm login --registry=https://registry.npmjs.org`, completing the browser and 2FA prompts. No authentication details should be sent to ChatGPT.
4. Clone this repository with `git clone https://github.com/imad28122017/pak-utility-bill-core.git`, then `cd pak-utility-bill-core`.
5. Ensure `git branch --show-current` is `main` and `git status --short` is empty. Run `git pull --ff-only`.
6. Verify `npm pkg get name version publishConfig private` reports `pak-utility-bill-core`, `0.2.2-beta.0`, `next`, and no `private: true`.
7. Run `npm run release:check`, then `npm pack --dry-run --json` and review the allowed packaged file paths; do not proceed if any unexpected document, key, account reference or artwork is present.
8. Check `npm view pak-utility-bill-core name version --json`. A 404 error is expected for an unclaimed name; if any existing third-party package is found, **stop** and choose a new name.
9. **This is the live publication action:** after all checks and manual review, run `npm publish --tag next --access public` from the repository root and complete any prompted browser/2FA authorization. This makes the initial version publicly installable; it is **not** a staging operation. Do not run this until you personally intend the package to go live.
10. Verify after publication: `npm view pak-utility-bill-core@next version` returns `0.2.2-beta.0`, and check the package page on npmjs.com. If the registry rejects the name, stop rather than using a different name without inspecting it.

The package is considered distributed only after the registry confirms the version is live.

## Future release automation (configure after first npm publish)

Now that the initial package is live on npmjs.com and owned by the publisher:

1. Open **Packages → pak-utility-bill-core → Settings → Trusted publishing**.
2. Select **GitHub Actions**; set:
   - GitHub username/organization: `imad28122017`
   - Repository: `pak-utility-bill-core`
   - Workflow filename: `npm-stage.yml`
   - Environment: leave blank unless you configure a matching GitHub Environment.
   - Allow stage publish. Prefer **stage only**, without direct publish.
3. **Completed November 2, 2026:** npm trusted publisher was saved and GitHub Actions staged `0.2.2-beta.1` using OIDC and signed provenance. Owner must confirm the Settings UI now says **Validated**. Do not rerun the stage job at the same immutable/staged version.
4. After trusted publishing works, consider **Require 2FA and disallow tokens** in npm package settings.
5. Future runs: GitHub Actions → **Stage npm prerelease (trusted publisher)** → **Run workflow** → type `STAGE`. This stage still requires manual npmjs.com approval with 2FA.

References: https://docs.npmjs.com/trusted-publishers/ and https://docs.npmjs.com/staged-publishing/

## After successful distribution

- **Completed:** verified actual npm page, version, tarball and `next` tag. The first manual publication does not establish GitHub OIDC provenance; future trusted publishes may provide it.
- Create an aligned **v0.2.2-beta.0 GitHub source pre-release tag** for the exact published source commit, if not yet tagged.
- Update README, release plan and eligibility ledger to reflect **verified** distribution; never invent download, dependents or contributor counts.
- Public launch is not equivalent to Claude for OSS eligibility; seek independent adoption and credible outside contributions.
