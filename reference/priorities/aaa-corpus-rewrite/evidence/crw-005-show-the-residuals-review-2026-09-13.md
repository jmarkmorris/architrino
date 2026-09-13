# CRW-005 Show The Residuals review — 2026-09-13

## Scope and disposition

Read the complete five-line [Show The Residuals leaf](../../../../content/markdown/aaa/archie/comics/show-the-residuals.md) and visually inspected its original [artwork](../../../../content/assets/images/comics/show-the-residuals.png) with `view_image`. One medium caption finding repaired. Only the caption and this receipt were written; approved artwork, image links, shared records, runtime, generators and Git/index state were not changed.

Baseline source SHA-256: `1cdd39f8bc627e38aabdc3b8fd56dc85a56ab49782dc8758004b4aab7bb534bf`.

Final source SHA-256: `548f043a3ed823d1d8c691eb8de25f2d3eb4c4fc2682e42ac22319f1a19dbe0e`.

Original/final artwork SHA-256: `c2122ddd3491eb4a06886dd40c5dcad7bad7f121f94ae1966bd71b322eceb8e1`.

Scoped initial `git --no-optional-locks status --short` returned no chapter change.

## SR-C01 — Medium: residual interpretation requires uncertainty

The caption said residuals show where an explanation still owes detail. A nonzero residual can instead be an expected realization of measurement noise under a correct model; it does not identify a missing mechanism by itself. The second sentence now reads: “Read against the uncertainty model, residuals can expose discrepancies worth investigating.” The first sentence and the diagnostic joke are preserved.

Independent counterexample: a correct model predicts a zero signal, while an instrument adds a symmetric error taking values plus or minus one with equal probability. Every residual is nonzero even though the complete declared signal-plus-noise model is correct. Conversely, interpolation can force sampled residuals to zero without establishing an underlying mechanism or predictive performance. These are direct analytical examples, not simulated physical evidence.

The artwork shows a prominent fitted curve and a small residual inset asking not to be relegated to supplementary material. Its message is to inspect diagnostics before celebrating agreement. The scatter and axes are illustrative artwork, not a retained dataset or independent validation result. No image-level edit or literal interpretation of the humor is warranted.

## Verification and limits

A marked-based nested image/link extractor first passed a known linked-image control, producing one link plus one image route in order. It then verified that both target routes are unchanged from HEAD and resolve to the original image. The title is unchanged. There are no TeX spans or standalone displays in the Markdown; no mathematical expression was altered.

Node crypto and `shasum -a 256` verify source/artwork hashes. Direct source/receipt whitespace and local-path checks and scoped `git diff --check HEAD` pass. The direct check includes this new receipt, omitted by ordinary Git diff.

This review does not analyze a real residual dataset, set a statistical threshold, prove a theory or reopen approved artwork. No chapter-local blocker remains; coordinator integration is separate.
