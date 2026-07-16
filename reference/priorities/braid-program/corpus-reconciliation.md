# Braid Chapter Corpus Reconciliation Plan

Status: **EXECUTED 2026-07-15** (operator approved all five steps same day; this document is now the record of what was done and the residual obligations). Origin: the operator-requested review of all 11 `content/markdown/aaa/noether-braid/` files (5,202 lines; three parallel full-read reviewers plus direct verification of the headline items).

## Execution record (2026-07-15)

All five steps landed: (1) surgical excisions across six files including the hub reframe; (2) spindle-braid.md rewritten 307→~110 lines from the durable core (definition, exact kinematics, harmonic-matching as hypothesis, discrete-symmetry structure; pin/escapement/isotropy/confinement sections excised — corpus-week-audit H1 resolved by excision); (3) explored-braid-geometries.md split: doubling-frequency lock → new corpus chapter `doubling-frequency-lock.md` (scene registered, ID lock updated), dynamics machinery → `reference/priorities/proof-programs/nested-shell-braid-dynamics.md` with a stub section preserving the corpus anchor, remainder rebuilt with demotion framing removed; (4) `noether-braid-proof-map.md` deleted from corpus (scene + ID lock updated; burden-order method restated fresh in `braid-program/method.md`; all inbound links re-pointed); (5) downstream sweep: particle-masses (anchor constants excised, action-ladder demoted to hypothesis, ε-row emergence direction fixed), angular-momentum-and-spin (spin-scaffold region rewritten; all pencil numbers, torque closures, pin, escapement, drift-law numbers excised), structure-formation, CMB, dark-matter, proper-time, mode-taxonomy, terminology-usage glosses fixed. Residue greps confirm zero corpus occurrences of: field-speed pin, speed attractor, rail residence, confirmed natively, the retired anchor constants, "unified closure metric," and family-ranking glosses ("wake escapement" in dynamics chapters and "leading candidates" in the string/LQG comparison are unrelated concepts, deliberately untouched).

**Residual obligations:** generated artifacts carry expected drift — at the branch/PR stage Codex must run `node scripts/validate-content.mjs --write`, `node scripts/build-scene-graph.mjs --write --strict`, `node scripts/build-textbook-md-pdf.mjs --write`, then the `--check` mirrors (30 generated-file link errors and 2 index-drift warnings clear on regeneration; canonical sources validate clean). The relocated `nested-shell-braid-dynamics.md` requirements document awaits a proof-programs lane review. Taxonomy retains the Proof ID grammar as classification language; whether the fresh program adopts or supersedes it is a braid-program decision.

## Verdict summary

The chapter is not uniformly contaminated — the residue is concentrated, and most of the scene is durable theory:

| File | Durable | Failed-campaign residue | Disposition |
| --- | --- | --- | --- |
| braid-recovery-requirements.md | 100% | none found | KEEP unchanged — the model chapter; obligations only |
| noether-braid-topological-charge.md | 100% | none found | KEEP unchanged — analytic; consumes theorem packs, not solver output |
| noether-braid-configuration-space.md | ~98% | 2 sentences | Surgical: excise L335 (ranking "on the unified prescribed-worldline closure metric" — names the voided instrument class as a live ranking; worst single sentence in the scene) and L464 ("measured" spindle split); add one line distinguishing hinge-as-coordinate from the retired pin |
| braid-envelope-geometry.md | ~98% | 3 phrases | Surgical: L664 ("leading candidate"), L849 ("measured moving states"), L668 (un-derived settling claim). Note: "corridor" in this file means reaction corridor — do NOT excise |
| noether-braid-taxonomy.md | ~97% | 1 section + 1 line | Surgical: rewrite L84–88 ("Leading Candidate" — ranking + measured deficit are campaign output) to "a named candidate family"; fix L218 re-import |
| neutral-braid.md | ~90% | 1 phrase + 1 block | Surgical: L20 ranking; L127–137 "certified" 11-digit residual interval is legacy-evaluator certification — excise the certificate language and interval, keep the overread-warning discipline as prose |
| braid-mathematics.md | ~90% | 4 spots | Surgical: L145 (delete the sentence realizing the speed budget "as ω^pin" — the exact quadrature lemma stands alone); L270 (the "certified tangential residual" bottoms out in the legacy stack; note kSize=0.638 exists NOWHERE in the corpus and the interval neutral-braid actually records is 0.198…, so audit item H2 resolves as excise-not-restore); L272/L307 (legacy sampled screens → soften to conjecture); L309–329 keep the fold/action-click quantization as labeled hypothesis but decouple L327 from retired pump bookings |
| noether-braid.md (hub) | ~70% | framing + 2 spots | Reframe: L9 sells the scene as a lab notebook ("live frontier… scoped negative results… expect it to change") — replace with definition + family ladder + the retained-branch question as the open obligation; excise L23 ranking; fix L46 role-table row that canonizes "the field-speed pin and escapement" |
| explored-braid-geometries.md | ~90% by volume | ~3–10% by volume, but the FRAME is campaign-derived | Split (below). Twelve reliance points including L3 (chapter's whole demotion premise cites "unified prescribed-worldline closure comparisons"), L86 ("certified" sea negatives), L295–297 (escapement clicks), L344 (pinned speed), legacy effort labels (SH-0, NSH-421, …) |
| spindle-braid.md | ~25% | **~75%** | REWRITE from the durable core (~80–100 lines). Excise wholesale: "How the Family Was Found" (L44–82, the search ladder), "The Field-Speed Pin and the Escapement" (L84–135 — contains the pin retirement at L115 AND ten continued uses incl. the pin-derived clock dilation at L135 and the "durable positives" listing at L299; audit item H1 resolves as excise-the-section, not reconcile), "Motion, Inertia, Isotropy" measurement tables (L137–179), "The Confinement Problem" arc (L223–299, incl. R_M^eq/κ_eq at L283 and the flutter indications). Keep: definition/geometry/boundary members, exact tilt-decoupling kinematics, screw-rigidity, harmonic matching restated as analytic hypothesis, the full discrete-symmetry section (C/P evenness, χ, o_PA/c_pol) minus its measured clauses, retention-contract close |
| noether-braid-proof-map.md | 0% theory | ~25–30% direct residue; 100% program management | REMOVE from corpus. A status map keyed to voided runs was a category error in a textbook. Salvage into braid-program tracking: the three-label reading discipline (L11–19), the proof-burden ladder (L27–32), and the Proof ID decoder grammar (statuses stripped; taxonomy keeps the grammar reference) |

Cross-cutting: the "leading candidate" ranking appears in six files and is the most pervasive residue — the ranking derives entirely from the voided closure comparisons and no family ordering survives the fresh start. Downstream check needed: whether `particle-masses.md` consumes the R_M^eq/κ_eq "mass-map anchor" spindle-braid L283 offers it (the audit's corpus-week H1/H2 companions).

## Reorganization target

Current disease: four document classes fused (definitions, mathematics, search narrative, program management) — the same failure mode as the archived priority lanes. Target: one class per file.

1. **Hub** `noether-braid.md` — class definition, family ladder, open obligation, pointers. No status, no rankings.
2. **Definitions:** taxonomy, configuration-space, topological-charge, neutral-braid, envelope-geometry (surgical edits only).
3. **Mathematics:** braid-mathematics (edited); NEW standalone chapter for the doubling-frequency lock analysis (currently L1290–1901 of explored-braid-geometries — fully analytic, rename without the NSH-421 label).
4. **Families:** spindle-braid rewritten to its durable core; explored-braid-geometries rebuilt as "Shell and Nested Shell Braid Families" — definitions and labeled hypotheses only, demotion framing removed, status header stating no family comparison from the failed campaign is relied on.
5. **Requirements:** braid-recovery-requirements unchanged — the template the others are rewritten toward.
6. **Out of the corpus:** proof-map (superseded by braid-program tracking); the Nested Shell Braid Dynamics certificate machinery (explored L549–1288 — certificate targets, Floquet/grazing diagnostics, roadmaps) relocates to braid-program/campaigns or proof-programs as requirements documents.

Net: 11 files → 10 reader-facing (one removed, one added by split), each one document class, with the search diary gone and roughly 1,200–1,500 lines of campaign residue excised or relocated.

## Execution order (each step operator-gated, Codex-executed, validator-clean)

1. Cheap surgical pass: the ~15 line-level excisions across configuration-space, envelope-geometry, taxonomy, neutral-braid, braid-mathematics, hub. Low risk, kills the ranking and the worst reliance sentences scene-wide.
2. spindle-braid rewrite from the durable core (resolves corpus-week-audit H1 by excision; largest single de-contamination).
3. explored-braid-geometries split (definitions chapter + doubling-frequency chapter + relocations).
4. proof-map removal with salvage into braid-program.
5. Downstream reconciliation sweep: particle-masses.md and any other chapter consuming the excised anchors/rankings (angular-momentum-and-spin.md flagged by the corpus-week audit).

Claim level: reviewer classifications are graded likely; the headline items (pin section lines, kSize orphan, L335 ranking sentence, hub framing) were verified by direct read. Line numbers are as of 2026-07-15 working tree and must be re-verified at edit time.
