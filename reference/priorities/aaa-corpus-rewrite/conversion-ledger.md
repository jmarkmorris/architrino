# Conversion Ledger

One row per converted document: what was converted, against which edition of the [academic style guide](../../../content/markdown/aaa/archie/academic-style-guide.md), and when.

The ledger lives here rather than in the corpus documents themselves. Corpus files carry no frontmatter, and the style guide's own rules keep process metadata and status blocks out of publication-ready prose. A reader of a chapter should see the chapter, not its conversion history.

## Why the edition column exists

A campaign across 199 documents runs long enough that the standard will advance while it is in progress. Without an edition recorded per file, there is no way to distinguish a document that predates a rule change from one that violates the current rule — and the second needs fixing while the first may not.

When the guide advances an edition, this ledger says exactly which documents were written against the older one. That is the whole purpose of the column, and it is why the edition number is worth maintaining even though nothing enforces it.

## What this ledger no longer tracks

Word counts, growth percentages, and corpus-size projections were removed on 2026-09-03 by operator decision. Size is not a concern for this campaign. The textbook is read online, where length costs a reader nothing, and the explanation standard states that response and document length is unconstrained. Tracking growth invited a false question — whether a conversion was too expensive — when the only questions that matter are whether the content survived and whether the prose now meets the guide.

Do not reintroduce size columns or growth analysis. If a future decision needs the numbers, measure them then; they are cheap to recover and were never the reason to convert or not convert a document.

## Ledger

| Document | Edition | Date | Notes |
| --- | :---: | --- | --- |
| `foundations/architrino.md` | 1.0 | 2026-09-03 | Pilot. Operator accepted, then corrected in the Codex review pass. |
| `foundations/euclidean-void.md` | 1.0 | 2026-09-03 | Notation-heavy; explanation expands the prose between formulas that do not change. |
| `foundations/ontology.md` | 1.0 | 2026-09-03 | Navigation hub, mostly routing tables. Added Bell's theorem, superselection, the exchange loop, holonomy, and the forgetting-map tower. |
| `foundations/constructing-the-absolute-frame.md` | 1.0 | 2026-09-03 | Added the cross product as area, the conditioning floor, $SE(3)$ versus the disconnected parity component, and writhe/twist. |
| `foundations/absolute-timespace.md` | 1.0 | 2026-09-03 | Densest notation in foundations, 55 equation blocks. Added Newton-Cartan two-structure geometry, connection underdetermination, Coriolis and centrifugal terms as provenance-free chart artifacts, Hughes-Drever, rapidity, and three-dimensional shell convergence. |
| `foundations/absolute-time.md` | 1.0 | 2026-09-03 | Added affine scale fixing, the emission-measure cross-check, Noether's theorem, and Whitney folds; removed repetition. |
| `foundations/detecting-the-absolute-frame.md` | 1.0 | 2026-09-03 | Added Michelson-Morley, Lorentz ether theory, the Poincare generator count, Gram determinants, aperture and rank floors, Frenet framing, and injectivity, while cutting substantial repetition. |
| `foundations/emergence-of-structure.md` | 1.0 | 2026-09-03 | Added wall-crossing, the Born rule, riddled basins, separator sheets, and codimension-one transitions, while cutting heavy repetition in the ladder and ledger sections. |
| `foundations/absolute-time-defense.md` | 1.0 | 2026-09-03 | Densest argument, 40 equation blocks. Added Poincare return maps, rotation numbers, Floquet margins, moduli connectedness, commutators, spectral gaps, Eotvos and MICROSCOPE, PPN parameters, singular values, and birefringence. Largest review correction of the nine. |
| `dynamics/master-equation.md` | 1.0 | 2026-09-03 | Restored the exact $c_f$ normalization and acceleration-first action convention; separated state-dependent from neutral delay claims; corrected redshift signs; removed unsupported conservation, stability, and quantum conclusions. |
| `dynamics/binary-dynamics.md` | 1.0 | 2026-09-03 | Corrected the effective-potential comparison and separated balance geometry from binding, retention, and stability claims. |
| `dynamics/energy.md` | 1.0 | 2026-09-03 | Rebuilt the bookkeeping hierarchy around the master equation, corrected redshift signs, and graded conservation and Noether claims at their actual authority. |
| `dynamics/entropy.md` | 1.0 | 2026-09-03 | Corrected the phase-space measure, Kullback-Leibler nonnegativity, Landauer ledger, and horizon-area coefficient while keeping observer-level thermodynamic results as recovery targets. |
| `dynamics/effective-lagrangian.md` | 1.0 | 2026-09-03 | Restricted the local variational surrogate to its declared delay regime and removed language that promoted it to the full causal master equation. |
| `dynamics/causal-action-functional.md` | 1.0 | 2026-09-03 | Preserved the causal action proposal as a scoped construction rather than a completed derivation of the master equation. |

## Progress

| | Files |
| --- | ---: |
| Converted at edition 1.0 | 15 |
| Corpus total | 199 |
| Remaining unconverted | 184 |

**Phase 1 is complete, and the first Phase 2 batch is complete at authored-source level.** All nine `foundations/` documents and all six `dynamics/` documents are converted at edition 1.0 and have passed an independent correction pass.

## The independent review pass

Every conversion above was checked by a separate Codex pass rather than by its author alone. That pass is the reason these rows can be trusted, and it found real defects rather than cosmetic ones.

The corrections share a single pattern, and it is the most useful finding this ledger carries: **explanatory rewriting tends to firm up hedged claims.** Making a passage clear invites making it decisive, and decisive is not always what the theory has earned. In foundations that showed up as a propagation law said to *dynamically distinguish* the rest frame rather than *structurally* doing so, a clock form said to prove the absolute-time postulate when it only encodes it, a glider described as a rotation-number lift rather than a relative periodic orbit, source-motion asymmetry treated as an established Doppler law rather than a derivation target, and unbounded wake history stated without its finite-memory caveat.

The dynamics batch showed the same pattern plus a second class: mathematical error surviving a rewrite that read well. Signs, coefficients, and normalization were corrected alongside claim boundaries. A conversion that reads cleanly is not thereby correct, and the two properties have to be checked separately.

Later batches should treat both as the expected defect class rather than rediscovering them.

## Validation status

The dynamics authored sources pass `git diff --check`, strict content validation, equation-mapping-link validation, and the equation-mapping corpus check. The scene-graph check reports zero errors and zero warnings but detects stale generated textbook navigation, and the reading-copy check detects stale generated textbook copies. Those generated surfaces remain for the authorized regeneration or final branch process; their drift is reported here under done criterion 14 rather than silently repaired during a source-edit batch.

Claim grade: `measured` for each row and each validation result. Falsifier for any row: a claim, grade, falsifier, equation, or `View →` link in the converted document that differs in substance from its pre-conversion form.
