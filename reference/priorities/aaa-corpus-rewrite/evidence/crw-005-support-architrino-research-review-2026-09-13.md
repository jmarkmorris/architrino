# CRW-005 — Support Architrino Research review

## Disposition

Full review of [Support Architrino Research](../../../../content/markdown/aaa/archie/support-architrino-research.md). No supported source repair is warranted. The page requests voluntary support without promising scientific results, tax treatment or guaranteed returns.

Unchanged source SHA-256: `137f374b7c8202104835ae90a9be0fabfc0f43a4d9ea787d4bf7acf875964c30`.

## Read-only evidence

On 2026-09-13, `curl -L -I --max-time 20` returned HTTP 200 and HTML content types for both the exact Liberapay and Stripe targets. A subsequent public-body GET of [Liberapay](https://liberapay.com/Architrino/donate) identified “Donate to Architrino” and recurrent support. The [Stripe target](https://buy.stripe.com/5kQ4gr1VL66r9Uj1Mo9EI00) returned its application HTML; its merchant and payment-mode configuration were not independently established from that static response. HTTP availability is not transaction success, account ownership verification, or confirmation of every checkout option. No account was accessed, form submitted, payment initiated, or message sent.

The support Markdown contains an ordinary Liberapay link. A case-insensitive `rg` search under `src`, `index.html`, `vendor`, `content/scenes`, and `scripts` found no Liberapay code reference. This supports the statement about no automatic Liberapay code loading within the inspected local implementation; it is not a deployed browser network trace or proof about uninspected hosting layers.

The referenced brand image exists. Its image-manifest record attributes it to the project and the [QR generator](../../../../scripts/qr-codes/build-architrino-qr-assets.py) declares the canonical payload `https://www.architrino.com`, matching the page. No fresh barcode decode, image regeneration or assertion of current generated-image parity was made.

## Checks and limits

The Markdown checker passed known cases before target use and found seven link occurrences: three HTTPS targets, three existing local related-page targets, and one mailto contact. The mailto URI was excluded from filesystem-path checking; no email deliverability claim was made. The generic check's four non-HTTPS count includes that mailto URI, not four local files. There are zero math spans, displays or equation-viewer links. Headings and bytes are unchanged by baseline/final SHA-256 comparison. Scoped source and receipt whitespace checks pass.

Only this receipt is a durable worker edit. No source, account, runtime, generated asset, or Git state was changed. An unavailable donation target, contradictory merchant configuration, or actual automatic Liberapay loading would reopen the relevant finding. No high- or medium-severity defect was established. Coordinator adjudication and shared integration remain separate.
