# Private-to-public launch plan

1. Owner approved MIT and public GitHub visibility for this standalone library on 2026-11-02, affirming no employer/client ownership restriction. This does not transfer third-party rights and does not authorize npm publication.
2. Validate repository's **new** Git history (do not fork the private parent projects), scan every tracked file for private references and secrets; inspect the diffs manually.
3. Confirm parser behavior on synthetic samples only; run `npm test`, `npm run test:coverage`, `npm run example`, `npm run pack:check`, check Node 20 and Node 22.
4. Create a separate **private** GitHub repository, e.g. `imad28122017/pak-utility-bill-core`, using a fresh first commit. Do not clone/fork Pocki or Duewise.
5. Configure GitHub secret push protection, Dependabot, branch protection, CI, security policy, issue templates; replace placeholder disclosure instructions with a maintainer contact.
6. Owner authorized public visibility on 2026-11-02. Complete manual review, then change **only this repository** to public in GitHub Settings → General → Danger Zone → Change repository visibility; immediately configure private vulnerability reporting. Verify externally. Do not expose Pocki or Duewise.
7. **Completed 2026-11-02:** the owner approved the first npm early-access release, reviewed the 11-file tarball and published `pak-utility-bill-core@0.2.2-beta.0` with 2FA. A future version should be published through trusted publishing with provenance where feasible.
8. Announce the project factually to relevant JS, fintech and civic-tech developers, invite *genuine* adopter feedback, gather permission-based usage evidence.
9. Update `docs/ELIGIBILITY_EVIDENCE.md` regularly; apply on discretionary impact track only when independent real-world adoption is demonstrated, or when another exact track is met.

Never use real utility documents or tokens as test fixtures. Ignore genuine customer invoices; when discussing defects, require synthetic minimal reproductions.
