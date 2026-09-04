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
| `noether-braid/noether-braid.md` | 1.0 | 2026-09-03 | Clarified the neutral many-body scaffold while keeping retained-branch status as the central open obligation. |
| `noether-braid/braid-taxonomy.md` | 1.0 | 2026-09-03 | Integrated eight labelled restatements into the classification rules without promoting any catalog or coordinate fact into a dynamics claim. |
| `noether-braid/2d-braid-assemblies.md` | 1.0 | 2026-09-03 | Integrated eighty-two labelled explanations across the circular and planar charts while preserving every bounded-search, exact-balance, and no-retention boundary. |
| `noether-braid/3d-braid-assemblies.md` | 1.0 | 2026-09-03 | Integrated forty labelled explanations across the spatial charts and corrected local grammar without changing taxonomy, lattice, balance, or retention claims. |
| `noether-braid/braid-mathematics.md` | 1.0 | 2026-09-03 | Integrated the finite-history classification explanation while preserving the distinction between exact machinery, scoped negatives, hypotheses, and theorem targets. |
| `noether-braid/braid-recovery-requirements.md` | 1.0 | 2026-09-03 | Audited against edition 1.0; its retention and observer-level recovery contract was already conformant, so no prose change was required. |
| `noether-braid/braid-analysis-methodology.md` | 1.0 | 2026-09-03 | Integrated six labelled explanations, repaired taxonomy-table grammar, and retained the prescribed-record, same-protocol, and no-stability limits. |
| `noether-braid/braid-envelope-geometry.md` | 1.0 | 2026-09-03 | Integrated four labelled explanations and made the exclusion-envelope definition direct without turning an export geometry into a retained branch. |
| `noether-braid/noether-braid-configuration-space.md` | 1.0 | 2026-09-03 | Integrated two labelled explanations and stated the search-space interpretation directly while preserving candidate-versus-certified status. |
| `noether-braid/noether-braid-topological-charge.md` | 1.0 | 2026-09-03 | Made the proposed invariant-label explanation direct while preserving the root-count, signed-degree, and retained-branch proof boundaries. |
| `noether-braid/coincident-axis-three-binary-symmetry.md` | 1.0 | 2026-09-03 | Corrected the opening classification sentence; the harmonic-matching mechanism remains a hypothesis and the covariance results retain their declared scope. |
| `noether-braid/coordinate-axis-six-point-symmetry-and-return-response.md` | 1.0 | 2026-09-03 | Reduced repeated configuration naming while preserving the exact fixture-specific symmetry results and the open retention burden. |
| `noether-braid/three-binary-4-2-1-frequency-lock.md` | 1.0 | 2026-09-03 | Clarified the specialized chart and integrated three plain-language labels without turning the kinematic identity or integer closure assumptions into dynamical selection. |
| `noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md` | 1.0 | 2026-09-03 | Reduced repeated full-name phrasing in the ownership boundary and claim table while retaining every conditional, unsupported, and observer-level classification. |

## Progress

| | Files |
| --- | ---: |
| Converted at edition 1.0 | 29 |
| Corpus total | 199 |
| Remaining unconverted | 170 |

**Phase 1 is complete, and the first two Phase 2 batches are complete at authored-source level.** All nine `foundations/` documents, all six `dynamics/` documents, and all fourteen `noether-braid/` documents are converted at edition 1.0.

## The independent review pass

The foundations and dynamics conversions were checked by a separate Codex pass rather than by their author alone. The Noether-braid batch was checked in the conversion pass against the immediate pre-conversion source with frozen equation, viewer-link, internal-link, claim-grade, and falsifier boundaries; it has not yet received a second-agent review.

The corrections share a single pattern, and it is the most useful finding this ledger carries: **explanatory rewriting tends to firm up hedged claims.** Making a passage clear invites making it decisive, and decisive is not always what the theory has earned. In foundations that showed up as a propagation law said to *dynamically distinguish* the rest frame rather than *structurally* doing so, a clock form said to prove the absolute-time postulate when it only encodes it, a glider described as a rotation-number lift rather than a relative periodic orbit, source-motion asymmetry treated as an established Doppler law rather than a derivation target, and unbounded wake history stated without its finite-memory caveat.

The dynamics batch showed the same pattern plus a second class: mathematical error surviving a rewrite that read well. Signs, coefficients, and normalization were corrected alongside claim boundaries. A conversion that reads cleanly is not thereby correct, and the two properties have to be checked separately.

Later batches should treat both as the expected defect class rather than rediscovering them. The Noether-braid pass therefore changed no equation and treated prescribed geometry, exact symmetry, source-normal balance, bounded search, branch retention, and stability as separate authorities.

## Validation status

The converted authored sources pass `git diff --check`, strict content validation, and equation-mapping-link validation. In the Noether-braid batch, every display equation and all 417 `View →` links match their immediate pre-conversion forms exactly, every earlier internal-link target remains, and all 146 labelled explanatory restatements remain in substance. The equation-mapping corpus check detects a stale generated registry. The scene-graph check reports zero errors and zero warnings while detecting stale generated textbook navigation, and the reading-copy check detects stale generated textbook copies. Those generated surfaces remain for the authorized regeneration or final branch process; their drift is reported here under done criterion 14 rather than silently repaired during a source-edit batch.

Claim grade: `measured` for each row and each validation result. Falsifier for any row: a claim, grade, falsifier, equation, or `View →` link in the converted document that differs in substance from its pre-conversion form.
