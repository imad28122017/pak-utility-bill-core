# Private-to-public launch plan

1. Obtain code-publication/IP approval; verify no employer/client ownership restriction. MIT is proposed, not permission to release third-party IP.
2. Validate repository's **new** Git history (do not fork the private parent projects), scan every tracked file for private references and secrets; inspect the diffs manually.
3. Confirm parser behavior on synthetic samples only; run `npm test`, `npm run test:coverage`, `npm run example`, `npm run pack:check`, check Node 20 and Node 22.
4. Create a separate **private** GitHub repository, e.g. `imad28122017/pak-utility-bill-core`, using a fresh first commit. Do not clone/fork Pocki or Duewise.
5. Configure GitHub secret push protection, Dependabot, branch protection, CI, security policy, issue templates; replace placeholder disclosure instructions with a maintainer contact.
6. Approve repo contents, ownership/license statements, and public visibility change deliberately. No automatic publication.
7. Confirm npm package name availability through npm (search results are not sufficient). Check `npm pack --dry-run`; publish only on owner's explicit consent, with npm account 2FA and provenance where feasible.
8. Announce the project factually to relevant JS, fintech and civic-tech developers, invite *genuine* adopter feedback, gather permission-based usage evidence.
9. Update `docs/ELIGIBILITY_EVIDENCE.md` regularly; apply on discretionary impact track only when independent real-world adoption is demonstrated, or when another exact track is met.

Never use real utility documents or tokens as test fixtures. Ignore genuine customer invoices; when discussing defects, require synthetic minimal reproductions.
