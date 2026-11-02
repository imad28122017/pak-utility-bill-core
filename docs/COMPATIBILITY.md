# Format compatibility and evidence

This release candidate supports **synthetic** input formats only; live provider compatibility is not certified. Tests must never contain private bills or real account identifiers.

| Provider text marker | Synthetic fixture test | Format assumptions | Official endorsement? |
| --- | --- | --- | --- |
| IESCO | Pass | 14-digit reference; English labels; PKR | No |
| SNGPL | Pass | 11-digit reference; English labels; PKR | No |
| Nayatel | Pass | Alphanumeric NTL reference; English labels | No |
| CDA Water | Pass | 3–16 digit consumer reference; English labels | No |

All fixtures use invented data and test parsing **text**, not the official PDF format or current official live inquiry portals. Provider-issued document formats can change without notice. Missing or conflicting data intentionally requires manual review.

Supported formats can be extended after documenting legally reusable sample field structures without publishing real customer invoices. Contributors should add synthesized examples and negative tests.
