# GitHub Actions → npm trusted publisher validation

**Stage operation verified November 2, 2026.** Owner added the GitHub Actions trusted publisher for `imad28122017/pak-utility-bill-core` with workflow `npm-stage.yml`, permission **npm stage publish only**. The initial npm settings screenshot displayed a deadline of November 4, 2026, 11:14 AM UTC to validate the connection. A subsequent GitHub Actions run successfully staged beta.1 with GitHub OIDC and signed provenance. **The npm settings UI validation status must still be rechecked by the owner.**

## Scope

- Already published and unchanged: `pak-utility-bill-core@0.2.2-beta.0`, gitHead `1c65b6e`.
- New metadata-only validation candidate: `pak-utility-bill-core@0.2.2-beta.1` with no API, dependency, or implementation changes.
- Workflows run from `main` only, manual dispatch with exact confirmation `STAGE`; GitHub OIDC permission `id-token: write`.
- GitHub workflow path: `.github/workflows/npm-stage.yml`; npm Trusted Publisher config has **only** `npm stage publish` permission. No traditional npm token is needed.
- Staging is **not** a live release. The npm package maintainer must separately inspect and approve it with 2FA; do not approve until the staged tarball has been reviewed.

## Verified stage event (completed)

- GitHub Actions [run #41435888784](https://github.com/imad28122017/pak-utility-bill-core/actions/runs/41435888784) succeeded on commit `b5c2e4c` at 2026-11-02 11:19 UTC.
- The `npm stage publish --tag next --access public` step succeeded, stage ID `70939a00-461c-46c4-a924-a58f7eecdd17`.
- Logs show `pak-utility-bill-core@0.2.2-beta.1`, 11 files, tarball SHA-1 `ebe64013f6834178df7f77ae413be4ba1a8e5de1`.
- GitHub Actions signed provenance was submitted to [Sigstore transparency log index 3638509104](https://search.sigstore.dev/?logIndex=3638509104).
- npm public registry queried immediately afterward still had `next` and `latest` both pointing to `0.2.2-beta.0`; prerelease beta.1 returned 404 publicly, consistent with staging but not approval.
- GitHub job had non-fatal warnings about Node.js 20-based actions and unsupported `package-manager-cache` in setup-node@v4. Changed stage workflow to verified upstream `actions/checkout@v7` and `actions/setup-node@v7` for **future runs only**; do **not** rerun the existing staged version.

## Initial validation checklist (completed unless noted)

1. **Completed:** PR #10 merged to `main`, and **Tests and package audit** and **Full-history secret scan** passed on commit `b5c2e4c`.
2. Visit https://github.com/imad28122017/pak-utility-bill-core/actions/workflows/npm-stage.yml
3. **Completed:** owner manually dispatched the workflow with `STAGE` on `main` before the deadline. Do not rerun the workflow while `0.2.2-beta.1` is already staged.
4. **GitHub job successful.** On npm package Settings → Trusted Publisher, owner should now check whether status reads **Validated**. GitHub cannot independently read this npm account-specific status.
5. On npmjs.com **Staged Packages**, inspect `0.2.2-beta.1` including package metadata and contents. Approve **only** after conscious review and personal 2FA authorization. You may leave it staged for now while validating OIDC; staged packages must be managed by their expiry rules.

## After validation

- Consider switching package Publishing access to **Require two-factor authentication and disallow tokens** (npm OIDC trusted publisher stays functional).
- Verify provenance when an OIDC-published release reaches the registry; do not assume provenance exists on the previous manually published beta.
- Check npm `latest` vs `next` dist-tags: both initially pointed to `0.2.2-beta.0`. Staging and approval with `next` do not automatically create a stable release.
- Update the eligibility ledger with only verified npm/GitHub data; community adoption is not established.

References:
- https://docs.npmjs.com/trusted-publishers/
- https://docs.npmjs.com/staged-publishing/
