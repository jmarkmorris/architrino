# Braid Taxonomy Work Log

This file is the chronological work log for the `braid-taxonomy` priority area. Use it for dated agent status, validation narratives, handoffs, failed paths, and operator/developer communication that must remain discoverable but should not crowd the live priority tracker.

Use [brainstorming.md](brainstorming.md) for provisional ideas and draft corpus-promotable language. Use [priorities.md](priorities.md) for the compact current queue, blockers, promotion routing, and next action. Keep focused migration plans and decision records in their own sibling files.

## Log Entries

### 2026-07-04 Proof ID Crosswalk

Created [proof-id-crosswalk.md](proof-id-crosswalk.md) as the priority-only routing ledger for assigning existing Noether braid proof work to taxonomy Proof IDs before braid-document cleanup. The ledger keeps Proof IDs scoped to branch-configuration targets and explicitly separates branch targets, row evidence, diagnostics/rejections, fixtures, charts, downstream consumers, app/runtime support, and uninspected proof corpora. It maps the current high-confidence lanes for `NB-0`, `SH-0`, `NSH-0`, `NSH-L`, `NSH-ISO`, `NSH-421`, `NSH-HINGE`, `NSH-TERM`, and `PL-*` while leaving large shell-braid and proof-program corpora inspect-before-relabeling.

### 2026-07-04 Crosswalk-Gated Braid Markdown Cleanup

Used [proof-id-crosswalk.md](proof-id-crosswalk.md) as the gate for a scoped authored-corpus cleanup pass. The pass promoted only reader-facing proof discipline: Proof IDs name branch-configuration efforts; diagnostics remain scoped; planar reduced charts remain chart labels unless the local work tests `PL-*` or `NSH-TERM`; ideal braid remains a fixture overlay; downstream Lorentz, mass, photon, topology, GR, measurement, and app/runtime rows consume retained branch records rather than creating base Proof IDs. It also replaced redundant `three-binary` prose in already-established Noether braid contexts and renamed the nested-shell shared certificate handles from `\mathcal{C}_{\mathrm{tri}}` / `\mathcal{U}_{\mathrm{tri}}` to `\mathcal{C}_{\mathrm{NSH}}` / `\mathcal{U}_{\mathrm{NSH}}` in inspected causal-closure priority prose. Large shell-braid proof packets and proof-program corpora remain inspect-before-relabeling.

Validation: `git diff --check`, targeted trailing-whitespace scan, and `node scripts/validate-content.mjs --check --strict` passed. `node scripts/build-scene-graph.mjs --check --strict` and `node scripts/build-textbook-md-pdf.mjs --check` reported generated drift in graph/TOC and textbook reading-copy outputs; no generator `--write` was run in this cleanup pass.

### 2026-07-04 Taxonomy Proof-Map Review

Reviewed [Noether Braid Taxonomy](../../../content/markdown/aaa/noether-braid/noether-braid-taxonomy.md) against [proof-id-crosswalk.md](proof-id-crosswalk.md). The proof map is structurally sound, but the reader-facing chapter needed one additional decoder rule: a proof packet must keep Proof ID, proof-stack role, and current disposition separate. Added that distinction to the taxonomy chapter without changing any proof status. Selected `braid_document_role_alignment` as the next organization pass: align authored Noether braid chapters by role before deeper proof-work relabeling.

Validation: `git diff --check`, targeted trailing-whitespace scan, and `node scripts/validate-content.mjs --check --strict` passed. `node scripts/build-scene-graph.mjs --check --strict` and `node scripts/build-textbook-md-pdf.mjs --check` reported generated drift in graph/TOC and textbook reading-copy outputs; no generator `--write` was run in this review pass.
