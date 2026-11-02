# GitHub Actions → npm trusted publisher validation

**Prepared November 2, 2026.** Owner showed npm package Settings confirmation: trusted publisher added for GitHub Actions `imad28122017/pak-utility-bill-core`, workflow filename `npm-stage.yml`, permission **npm stage publish only**. Status is **Pending validation**, and npm requires an initial publishing action **before November 4, 2026, 11:14 AM UTC** (from the owner's screenshot).

## Scope

- Already published and unchanged: `pak-utility-bill-core@0.2.2-beta.0`, gitHead `1c65b6e`.
- New metadata-only validation candidate: `pak-utility-bill-core@0.2.2-beta.1` with no API, dependency, or implementation changes.
- Workflows run from `main` only, manual dispatch with exact confirmation `STAGE`; GitHub OIDC permission `id-token: write`.
- GitHub workflow path: `.github/workflows/npm-stage.yml`; npm Trusted Publisher config has **only** `npm stage publish` permission. No traditional npm token is needed.
- Staging is **not** a live release. The npm package maintainer must separately inspect and approve it with 2FA; do not approve until the staged tarball has been reviewed.

## To validate (maintainer action)

1. Confirm the PR preparing `0.2.2-beta.1` merged to `main` and GitHub Actions **Tests and package audit** and **Full-history secret scan** are green for the merge commit.
2. Visit https://github.com/imad28122017/pak-utility-bill-core/actions/workflows/npm-stage.yml
3. Select **Run workflow** → branch **main**, input **STAGE**, and run it. **Do this before npm's pending-validation deadline.**
4. Inspect the job results. If successful, verify the npm package's trusted publisher is **Validated**; if the job fails, read logs and diagnose without adding npm tokens.
5. On npmjs.com **Staged Packages**, inspect `0.2.2-beta.1` including package metadata and contents. Approve **only** after conscious review and personal 2FA authorization. You may leave it staged for now while validating OIDC; staged packages must be managed by their expiry rules.

## After validation

- Consider switching package Publishing access to **Require two-factor authentication and disallow tokens** (npm OIDC trusted publisher stays functional).
- Verify provenance when an OIDC-published release reaches the registry; do not assume provenance exists on the previous manually published beta.
- Check npm `latest` vs `next` dist-tags: both initially pointed to `0.2.2-beta.0`. Staging and approval with `next` do not automatically create a stable release.
- Update the eligibility ledger with only verified npm/GitHub data; community adoption is not established.

References:
- https://docs.npmjs.com/trusted-publishers/
- https://docs.npmjs.com/staged-publishing/
