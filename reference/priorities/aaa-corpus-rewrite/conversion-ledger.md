# Conversion Ledger

One row per converted document. This is the record of what was converted, against which edition of the [academic style guide](../../../content/markdown/aaa/archie/academic-style-guide.md), and at what cost in words.

The ledger lives here rather than in the corpus documents themselves. Corpus files carry no frontmatter, and the style guide's own rules keep process metadata and status blocks out of publication-ready prose. A reader of a chapter should see the chapter, not its conversion history.

## Why the edition column exists

A campaign across 199 documents runs long enough that the standard will advance while it is in progress. Without an edition recorded per file, there is no way to distinguish a document that predates a rule change from one that violates the current rule — and the second needs fixing while the first may not.

When the guide advances an edition, this ledger says exactly which documents were written against the older one. That is the whole purpose of the column, and it is why the edition number is worth maintaining even though nothing enforces it.

## Ledger

Word counts measured 2026-09-03 at 20:18 local, after the Codex correction pass. The review ran concurrently with this update, so a later measurement may differ slightly; re-measure before relying on these figures for planning.

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

## Running totals

| | Files | Words | Note |
| --- | ---: | ---: | --- |
| Converted, before | 9 | 37,310 | |
| After rewrite | 9 | 40,834 | +9% |
| After Codex review | 9 | 41,837 | **+12% net**; review added 1,003 words, +2% |
| Corpus at campaign start | 199 | 835,848 | measured immediately before the pilot |
| Remaining unconverted | 190 | 800,738 | |

**Phase 1 complete.** All nine `foundations/` documents are converted at edition 1.0 and have passed an independent correction pass.

The `After review` column records the state after a separate Codex pass corrected errors in the rewrites. That pass is the reason the column exists: a rewrite is not final until something other than its author has checked it, and the corrections were substantive rather than cosmetic. They tightened overclaims — a propagation law that *dynamically distinguishes* the rest frame rather than *structurally* doing so, a clock form that *encodes* the absolute-time postulate rather than proving it, a glider as a relative periodic orbit rather than a rotation-number lift, source-motion asymmetry as a derivation target rather than an established Doppler law, and unbounded wake history flagged as a postulate with a finite-memory caveat.

Net effect: the review added 1,003 words, or 2%. Corrections that add caveats cost words, and eight of the nine grew slightly under review; `architrino.md` alone shrank.

## What the growth figure is and is not

Nine conversions, spanning **+52% to −14%** after review, combining to **+12%**. Applying 12% to the unconverted remainder projects a finished corpus of roughly **897,000 words**.

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

The estimate has fallen at every step: 54% after one file, 46% after two, 31% after four, 25% after five, and **12% after nine including review.** The pilot was the outlier, not the pattern — it is the one document that introduces the theory's entire vocabulary from a standing start.

There is a third effect, visible only because the review pass is measured separately. **Correction adds words too.** Eight of the nine grew under review and only the pilot shrank, because the corrections were mostly caveats: naming a postulate as a postulate, marking a derivation target as a target, and replacing an overclaim with a bounded statement. Precision is not free, and a rewrite estimate that ignores the review pass will run about 2% low.

All nine are foundational and carry more undefined vocabulary than a typical later chapter. Later chapters should explain less and repeat more, which still points toward modest growth or net reduction in Phase 2 — but the review overhead applies there too.

Claim grade: `measured` for each row; `inferred` for the projection, which rests on nine samples spanning both signs with an identified mechanism for the spread. Falsifier: ten further conversions whose mean net growth falls outside −15% to +30%.
