# Security boundaries and threat model

## Trust boundaries

The host application is responsible for file permissions, parsing PDF-to-text, provenance, authentication of source, storage security and end-user confirmation. This library receives an **untrusted string**, parses conservatively and validates it against a trusted *host-supplied account record*. No provider website/API is queried.

## Data-handling model

- No networking, persistence, telemetry, logging or credentials in the package.
- Public APIs return values in memory. Host apps must avoid logging raw documents and restrict exposure of account references.
- Synthetic examples only; no real customer identities, bank statements or billing references.
- 200 KB text-size limit; arbitrary documents may still be malicious and must not be treated as official solely due to provider text.

## Failure modes to watch

- **Spoofing:** a document can say `IESCO` and use a matching reference yet be fraudulent. The host must independently establish its origin.
- **Tampering:** malformed or conflicting fields trigger `needs_review` and preserve the old object.
- **Staleness:** older billing periods and earlier due dates are rejected.
- **Ambiguous labels:** duplicate amounts/dates and invalid repeated labels are rejected instead of guessed.
- **Personal data leakage:** error messages should not echo references, raw text or personal data. Real invoices must never be used as public fixtures.
- **Calendar rules:** all dates are Gregorian `YYYY-MM-DD`, **not** timestamps; date parsing assumes day-first numeric input.

This software does not verify payment completion, identify an authoritative utility statement or replace appropriate financial controls.
