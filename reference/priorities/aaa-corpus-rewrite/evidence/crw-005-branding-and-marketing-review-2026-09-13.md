# CRW-005 Branding and Marketing review — 2026-09-13

## Scope and disposition

Read [Branding and Marketing](../../../../content/markdown/aaa/archie/branding-and-marketing.md) in full (171 lines), inspected the linked visual reference and its named asset paths, checked the palette interpolation independently, and compared the relevant UI ownership statement. This is a bounded guide review, not a monthly public-presence audit or a request to create an automation.

The controlled brand choices, palette, typography, logos and approved visuals remain unchanged. No chapter-local defect requires a proposed factual, arithmetic or link repair. No policy change was made. Only this receipt was written; neighboring policy, assets, runtime, generated files, shared records and Git/index state were not edited.

Baseline and final chapter SHA-256: `dcc396584423e6645009cbf3e829a20bc7c94c364c1f933b9d2a675b2fc3dbb6`.

Scoped initial `git --no-optional-locks status --short` returned no chapter changes. Final byte comparison against `git show HEAD` verifies unchanged disposition.

## Independent arithmetic and asset verification

The channel interpolation was independently implemented as the integer-weight expression ((d-n) center + n endpoint)/d, followed by nearest-integer rounding, rather than copying the runtime's center-plus-difference implementation. Before using it on the palette, the instrument returned the known black/white midpoint `#808080` and the unchanged center at zero blend weight.

The resulting three red/blue pairs were exactly:

| Weight | Red side | Blue side |
| --- | --- | --- |
| 1/3 | `#901580` | `#532AC2` |
| 2/3 | `#B61E53` | `#3C46D6` |
| 1 | `#DC2626` | `#2563EB` |

These independently computed values match every displayed pair and the existing `buildSymmetricBlendSet()` result in [BrandVisualIdentityRuntime.js](../../../../src/documentation/brand-visual-identity/BrandVisualIdentityRuntime.js). This verifies encoded-sRGB channel interpolation and rounding. It does not claim perceptually uniform distances, physical polarity content or accessibility of every possible color pairing; the chapter makes none of those claims.

A fenced-code-aware Markdown link extractor first passed a known genuine-link/fenced-fake-link control. It then found 12 links in the guide, including 10 local paths, all existing. The polarity target heading exists in [Architrino](../../../../content/markdown/aaa/foundations/architrino.md#polarity-and-electric-bookkeeping), line 135.

An HTML source-attribute extractor first passed a known image/script pair. It then found 11 `src` occurrences, representing 8 unique existing files, in [Brand Visual Identity Reference](../../../../brand-visual-identity.html). These include the Noether Braid source mark, app icon, avatar/crop examples, logo/QR lockup, Crossing Wake Sheets preview, QR and runtime. Direct SVG source inspection confirms that its description names the three-ellipse and red/blue grammar. This is source/reference existence evidence, not new visual approval, QR decoding, browser screenshot verification or platform-crop validation.

The public website URL returned an Architrino app page through the web tool, whose response was labeled crawled two months ago. This is limited destination/index evidence, not a current uptime or interactive functionality test. The email address is an authorized published contact string in the guide; no message was sent and deliverability was not tested.

## Report-only adjacent policy finding

**BM-01 — Medium, deferred dependent-owner propagation outside this chapter.** Branding's Palette Discipline forbids cyan as an ordinary interface state, while [UI Guidelines](../../../../content/markdown/aaa/archie/ui-guidelines.md), line 135, says blue/cyan may serve assigned accent or signal roles. UI Guidelines line 15 correctly routes favored palette ownership to Branding. The discrepancy is reproducible by reading those two passages; it is not an arithmetic defect in the brand palette.

Recommended resolution is to align the dependent UI prose with its explicitly delegated Branding owner when UI Guidelines is reviewed. This requires no new palette choice or operator approval. Do not change the brand choice, recolor existing approved visuals or perform global synchronization. This review leaves both policies untouched and routes the deferred propagation to the coordinator.

## Validation and limits

The chapter contains no TeX spans or standalone displays. Its full byte identity to HEAD preserves all headings, numerical values, links and approved policy text. Direct whitespace and receipt-local-path checks and scoped `git diff --check HEAD` complete the two-file review; the direct check includes this new receipt, which ordinary Git diff does not cover.

No public-profile ownership census, contrast certification, analytics review, monthly automation, account change or communication was performed. The guide itself correctly separates public asset existence from active-account ownership, and presentation quality from measured marketing effectiveness. There is no chapter-local blocker; BM-01 is a report-only neighboring policy reconciliation.
