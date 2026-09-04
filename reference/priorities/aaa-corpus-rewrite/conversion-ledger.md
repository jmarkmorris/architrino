# Conversion Ledger

One row per converted document. This is the record of what was converted, against which edition of the [academic style guide](../../../content/markdown/aaa/archie/academic-style-guide.md), and at what cost in words.

The ledger lives here rather than in the corpus documents themselves. Corpus files carry no frontmatter, and the style guide's own rules keep process metadata and status blocks out of publication-ready prose. A reader of a chapter should see the chapter, not its conversion history.

## Why the edition column exists

A campaign across 199 documents runs long enough that the standard will advance while it is in progress. Without an edition recorded per file, there is no way to distinguish a document that predates a rule change from one that violates the current rule — and the second needs fixing while the first may not.

When the guide advances an edition, this ledger says exactly which documents were written against the older one. That is the whole purpose of the column, and it is why the edition number is worth maintaining even though nothing enforces it.

## Ledger

Foundation word counts were measured 2026-09-03 at 20:18 local. Dynamics word counts were measured 2026-09-03 at 21:55 local, using the 2026-09-01 baseline, the committed rewrite snapshot, and the current worktree after the Codex correction pass and raw-anchor cleanup. Re-measure before relying on these figures for planning because the shared worktree remains active.

| Document | Edition | Before | After rewrite | After review | Net | Date | Notes |
| --- | :---: | ---: | ---: | ---: | ---: | --- | --- |
| `foundations/architrino.md` | 1.0 | 4,090 | 6,297 | 6,228 | +52% | 2026-09-03 | Pilot. Operator accepted, then corrected in the Codex review pass. |
| `foundations/euclidean-void.md` | 1.0 | 3,401 | 4,657 | 4,770 | +40% | 2026-09-03 | Notation-heavy; explanation expands the prose between formulas that do not change. |
| `foundations/ontology.md` | 1.0 | 3,936 | 4,418 | 4,537 | +15% | 2026-09-03 | Navigation hub, mostly routing tables. Added Bell's theorem, superselection, the exchange loop, holonomy, and the forgetting-map tower. |
| `foundations/constructing-the-absolute-frame.md` | 1.0 | 2,318 | 2,604 | 2,683 | +16% | 2026-09-03 | Added the cross product as area, the conditioning floor, $SE(3)$ versus the disconnected parity component, and writhe/twist. |
| `foundations/absolute-timespace.md` | 1.0 | 5,369 | 5,931 | 6,104 | +14% | 2026-09-03 | Densest notation in foundations, 55 equation blocks. Added Newton-Cartan two-structure geometry, connection underdetermination, Coriolis and centrifugal terms as provenance-free chart artifacts, Hughes-Drever, rapidity, and three-dimensional shell convergence. |
| `foundations/absolute-time.md` | 1.0 | 4,265 | 4,196 | 4,249 | **-0%** | 2026-09-03 | Net flat. Added affine scale fixing, the emission-measure cross-check, Noether's theorem, and Whitney folds, offset by removed repetition. |
| `foundations/detecting-the-absolute-frame.md` | 1.0 | 4,023 | 3,754 | 3,820 | **-5%** | 2026-09-03 | Net reduction. Added Michelson-Morley, Lorentz ether theory, the Poincare generator count, Gram determinants, aperture and rank floors, Frenet framing, and injectivity, while cutting substantial repetition. |
| `foundations/emergence-of-structure.md` | 1.0 | 5,078 | 4,257 | 4,371 | **-14%** | 2026-09-03 | Largest reduction. Added wall-crossing, the Born rule, riddled basins, separator sheets, and codimension-one transitions, while cutting heavy repetition in the ladder and ledger sections. |
| `foundations/absolute-time-defense.md` | 1.0 | 4,830 | 4,720 | 5,075 | +5% | 2026-09-03 | Densest argument, 40 equation blocks. Added Poincare return maps, rotation numbers, Floquet margins, moduli connectedness, commutators, spectral gaps, Eotvos and MICROSCOPE, PPN parameters, singular values, and birefringence. Largest review correction of the nine. |
| `dynamics/master-equation.md` | 1.0 | 33,640 | 34,118 | 34,175 | +2% | 2026-09-03 | Restored the exact $c_f$ normalization and acceleration-first action convention; separated state-dependent from neutral delay claims; corrected redshift signs; removed unsupported conservation, stability, and quantum conclusions. |
| `dynamics/binary-dynamics.md` | 1.0 | 15,411 | 15,595 | 15,632 | +1% | 2026-09-03 | Corrected the effective-potential comparison and separated balance geometry from binding, retention, and stability claims. |
| `dynamics/energy.md` | 1.0 | 11,907 | 12,275 | 12,353 | +4% | 2026-09-03 | Rebuilt the bookkeeping hierarchy around the master equation, corrected redshift signs, and graded conservation and Noether claims at their actual authority. |
| `dynamics/entropy.md` | 1.0 | 8,589 | 9,101 | 9,160 | +7% | 2026-09-03 | Corrected the phase-space measure, Kullback-Leibler nonnegativity, Landauer ledger, and horizon-area coefficient while keeping observer-level thermodynamic results as recovery targets. |
| `dynamics/effective-lagrangian.md` | 1.0 | 7,331 | 7,862 | 7,862 | +7% | 2026-09-03 | Restricted the local variational surrogate to its declared delay regime and removed language that promoted it to the full causal master equation. |
| `dynamics/causal-action-functional.md` | 1.0 | 1,547 | 1,697 | 1,697 | +10% | 2026-09-03 | Preserved the causal action proposal as a scoped construction rather than a completed derivation of the master equation. |

## Running totals

| | Files | Words | Note |
| --- | ---: | ---: | --- |
| Converted, before | 15 | 115,735 | |
| After rewrite | 15 | 121,482 | +5% |
| After Codex review | 15 | 122,716 | **+6% net**; review added 1,234 words, +1% |
| Corpus at campaign start | 199 | 835,848 | measured immediately before the pilot |
| Remaining unconverted | 184 | 720,113 | |

**Phase 1 is complete, and the first Phase 2 batch is complete at authored-source level.** All nine `foundations/` documents and all six `dynamics/` documents are converted at edition 1.0 and have passed an independent correction pass.

The `After review` column records the state after a separate Codex pass corrected errors in the rewrites. That pass is the reason the column exists: a rewrite is not final until something other than its author has checked it, and the corrections were substantive rather than cosmetic. They tightened overclaims — a propagation law that *dynamically distinguishes* the rest frame rather than *structurally* doing so, a clock form that *encodes* the absolute-time postulate rather than proving it, a glider as a relative periodic orbit rather than a rotation-number lift, source-motion asymmetry as a derivation target rather than an established Doppler law, and unbounded wake history flagged as a postulate with a finite-memory caveat.

Net effect across both batches: the review added 1,234 words, or 1%. The dynamics review added 231 of those words. The word count understates its substantive effect because several corrections replaced a wrong sign, coefficient, normalization, or claim boundary without increasing length.

The dynamics authored sources pass `git diff --check`, strict content validation, equation-mapping-link validation, and the equation-mapping corpus check. The scene-graph check reports zero errors and zero warnings but detects stale generated textbook navigation, and the reading-copy check detects stale generated textbook copies. Those generated surfaces remain for the authorized regeneration or final branch process; their drift is reported here under done criterion 14 rather than silently repaired during the source edit batch.

## What the growth figure is and is not

Fifteen conversions, spanning **+52% to −14%** after review, combine to **+6%**. Applying that measured rate to the unconverted remainder projects a finished corpus of roughly **886,000 words**.

That is a different conclusion from the one the pilot supported, and the reversal is the most useful thing in this ledger.

| Document | Character | Net growth |
| --- | --- | ---: |
| `architrino.md` | Conceptual prose, vocabulary from nothing | **+52%** |
| `euclidean-void.md` | Half notation and operator definitions | +40% |
| `constructing-the-absolute-frame.md` | Short, formula-dense | +16% |
| `ontology.md` | Mostly routing tables | +15% |
| `absolute-timespace.md` | Very dense, 55 equation blocks | +14% |
| `absolute-time-defense.md` | Densest argument, 40 equation blocks | +5% |
| `absolute-time.md` | Dense, some redundancy | −0% |
| `detecting-the-absolute-frame.md` | Repetitive exposition | −5% |
| `emergence-of-structure.md` | Heavy repetition in ladder and ledger | **−14%** |

Two effects run in opposite directions, and their balance decides everything.

**Explanation adds words.** Defining an imported concept, saying why a result is true, and naming every symbol all cost prose. This dominates where a document builds concepts from nothing.

**Discipline removes them.** Plain-by-default writing, no dense-then-gloss repair, and cutting restatement all save prose. This dominates where a document repeats itself — and much of the corpus does.

So growth is not a rate. It is the difference between how much a document must explain and how much it currently repeats. A formula stays one formula however well introduced; a routing table stays a routing table; and a paragraph that says the same thing three times becomes one.

The estimate fell at every foundation step: 54% after one file, 46% after two, 31% after four, 25% after five, and **12% after nine including review.** The six dynamics documents then brought the combined rate to **6%**. The pilot was the outlier, not the pattern — it is the one document that introduces the theory's entire vocabulary from a standing start.

There is a third effect, visible only because the review pass is measured separately. **Correction often adds words, but not in proportion to its importance.** Foundations needed 1,003 added words, mostly for caveats. Dynamics needed 238, even though its review corrected signs, coefficients, normalization, mathematical scope, and source support as well as overclaims. Precision is not free, but word growth is only a weak proxy for review cost.

The foundation documents carry more undefined vocabulary than a typical later chapter. The dynamics result supports the prediction that later chapters should explain less and repeat more: the six-file batch grew only 3% after review. Review overhead still applies, and its work should be estimated from mathematical density and claim risk rather than word count alone.

Claim grade: `measured` for each row and validation result; `inferred` for the projection, which rests on fifteen samples with an identified mechanism for the spread. The original projection falsifier has not yet matured: six of the specified ten further conversions are complete, and their mean net growth is 3%, inside the declared −15% to +30% interval. Falsifier: the next four conversions taking the ten-file post-foundation mean outside that interval, or a re-measurement that materially changes the current totals.
