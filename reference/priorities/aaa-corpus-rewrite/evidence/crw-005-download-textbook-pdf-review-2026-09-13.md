# CRW-005 — Download Textbook PDF review

## Scope and disposition

Full review of [Download Textbook PDF](../../../../content/markdown/aaa/archie/download-textbook-pdf.md), all 73 lines, against its authored scene routes and the actual Markdown/PDF/reader exporters. No source edit is warranted. This is guide consistency review, not PDF rendering, export, package admission, or freshness certification.

Unchanged chapter SHA-256: `1055885362a82c99c9d386b65c77c1f0dea0b69765f6a2d21fea81eb9f0b60e3`.

Scoped `git --no-optional-locks status` showed no chapter edits. Only this receipt is a durable worker edit; shared integration belongs to the coordinator.

## Source-flow verification

Direct implementation reads support the stated flow:

- [Reading-copy generator](../../../../scripts/build-textbook-md-pdf.mjs) reads `content/graph/textbook_toc.json`, resolves source Markdown, renders each entry, and recursively traverses children in their declared order. Around lines 324–355 it builds both the complete textbook and section reading copies in `content/generated/markdown/textbook/reading-copies`.
- [Review-PDF generator](../../../../scripts/build-textbook-review-pdfs.mjs) names that same reading-copy directory at line 12. Its `buildRecords` around lines 274–304 derives section records from TOC root children and adds the full textbook. Its input-validation and render path consume those Markdown records. Its manifest stores source hashes, distinguishing exported snapshots from later source edits.
- [iOS package exporter](../../../../scripts/export-ios-textbook-package.mjs), `addChapterRecord` around lines 266–286, reads the same generated reading-copy Markdown for packaged chapters. This supports the guide's shared-input statement; it does not prove that an existing package was exported at the same time as a given PDF.
- [Website navigation service](../../../../src/services/TextbookTocNavigationService.js) and [numbering service](../../../../src/services/TextbookTocNumberingService.js) use the same textbook TOC path. Thus the declared export order follows the website textbook ordering input, not an independently invented PDF order.

The phrase “released webapp” is understood as the reader-facing content of record. It does not claim that deployed bytes always equal the current editable checkout. The guide explicitly calls a PDF an export-time snapshot and distinguishes it from hand-authored canon. Those statements are coherent with the inspected implementation.

## Scene and availability check

The authored [PDF scene](../../../../content/scenes/archie/textbook_pdf_snapshots.json) references this guide and supplies 13 PDF objects: full textbook; Foundations; Dynamics; Noether Sea and Effective Spacetime; Noether Braid; Standard Model Assemblies; Atomic and Nuclear Assemblies; Reactions; Quantum; Cosmology; Validation; Philosophy-History; Comparative Glossary. These match the guide's shelf headings.

A PDF-object selector passed a known synthetic PDF/non-PDF scene case before target use. All 13 selected PDF paths exist locally by `fs.existsSync`; this is path availability, not body integrity or visual validation.

The shelf and current TOC are not identical inventories. Direct inspection finds Noether Braid before Noether Sea in the current TOC, while the shelf lists Sea before Braid; the current TOC also includes About Architrino where the shelf offers a Comparative Glossary snapshot. This observation does not show that any PDF misordered its source at export time. The guide does not claim that shelf order, current TOC, and every retained snapshot are simultaneously fresh. No scene or generated artifact is changed, and no freshness conclusion is drawn from mere existence.

No new HTTP request is needed to establish this local source-flow consistency. The earlier About Architrino review measured a public Foundations PDF response, but that isolated availability result is not broadened here to all public PDFs.

## Findings and limits

No chapter-specific high- or medium-severity defect was established. The shelf wording, snapshot distinction, export flow, and declared order are supported within their stated scope. There is no mathematics requiring a calculation or KaTeX check in this guide; the flow diagram is fenced text and the sole Markdown link is the public website.

This pass did not render or parse PDF bodies, compare exported pages with current chapters, run exporter `--check`, verify the full manifest, inspect the reader UI, certify deployed routes for every title, or establish current publication freshness. The pre-existing shelf/TOC inventory difference remains a bounded observation for an explicitly authorized export/navigation task, not a new guide repair or permission to regenerate.

No PDF or iOS package was regenerated. No source, scene, runtime artifact, generated file, neighboring chapter, shared record, or Git state was edited. A future change to exporter inputs, an incorrect guide-to-scene title mapping, or a demonstrably false export-order claim would overturn the corresponding unchanged disposition. Coordinator adjudication and shared integration remain separate.
