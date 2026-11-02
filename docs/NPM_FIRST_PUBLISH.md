# npm first-publication plan — 0.2.2-beta.0

**Owner approved npm early-access publication on 2026-11-02.** The package is not published merely because the repository is public. The original v0.2.1 GitHub source pre-release remains unchanged.

## Name and safeguards
- Name requested: `pak-utility-bill-core` (unscoped public npm package).
- Exact npm registry and package page returned 404 on 2026-11-02. This suggests the name was unclaimed at that instant, but does not reserve it or guarantee it remains available.
- Release version `0.2.2-beta.0`, published only with dist-tag `next` so `npm install pak-utility-bill-core` without a tag does not point at a prerelease.
- MIT. Zero runtime dependencies. Public repository matches `package.json`.
- `npm run release:check` and `npm pack --dry-run --json` must pass on the exact release commit.
- **Never paste passwords, recovery codes, 2FA codes, or npm tokens into GitHub issues, Actions secrets, or ChatGPT.**

## Critical first-publication limitation

npm trusted publishing cannot be configured for a package that does not yet exist in the registry. First bootstrap the unclaimed package with your own authenticated npm account. **First publication cannot use `npm stage publish`.** npm's official staged-publishing requirements explicitly state the package must already exist. Bootstrap the first package with an ordinary authenticated `npm publish --tag next --access public`, which will publish the version immediately after authentication and 2FA. Review and approve the exact tarball *before* invoking this command. Use staged publishing only for subsequent versions.

Source: https://docs.npmjs.com/cli/v11/commands/npm-trust/ and https://docs.npmjs.com/staged-publishing/

## Initial bootstrap (owner's Mac)

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

Once the initial package is live on npmjs.com and you own it:

1. Open **Packages → pak-utility-bill-core → Settings → Trusted publishing**.
2. Select **GitHub Actions**; set:
   - GitHub username/organization: `imad28122017`
   - Repository: `pak-utility-bill-core`
   - Workflow filename: `npm-stage.yml`
   - Environment: leave blank unless you configure a matching GitHub Environment.
   - Allow stage publish. Prefer **stage only**, without direct publish.
3. Save; initiate a test staged publication of a **new version within 2 days**, or the unvalidated trust configuration may expire.
4. After trusted publishing works, consider **Require 2FA and disallow tokens** in npm package settings.
5. Future runs: GitHub Actions → **Stage npm prerelease (trusted publisher)** → **Run workflow** → type `STAGE`. This stage still requires manual npmjs.com approval with 2FA.

References: https://docs.npmjs.com/trusted-publishers/ and https://docs.npmjs.com/staged-publishing/

## After successful distribution

- Verify the actual npm page, version, tarball, and `next` tag. Note a first-time manual publish **does not establish GitHub OIDC provenance** by itself; future trusted publishes can provide it.
- Create an aligned **v0.2.2-beta.0 GitHub source pre-release tag** for the exact published source commit, if not yet tagged.
- Update README, release plan and eligibility ledger to reflect **verified** distribution; never invent download, dependents or contributor counts.
- Public launch is not equivalent to Claude for OSS eligibility; seek independent adoption and credible outside contributions.
