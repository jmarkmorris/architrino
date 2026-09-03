# Conversion Ledger

One row per converted document. This is the record of what was converted, against which edition of the [academic style guide](../../../content/markdown/aaa/archie/academic-style-guide.md), and at what cost in words.

The ledger lives here rather than in the corpus documents themselves. Corpus files carry no frontmatter, and the style guide's own rules keep process metadata and status blocks out of publication-ready prose. A reader of a chapter should see the chapter, not its conversion history.

## Why the edition column exists

A campaign across 199 documents runs long enough that the standard will advance while it is in progress. Without an edition recorded per file, there is no way to distinguish a document that predates a rule change from one that violates the current rule — and the second needs fixing while the first may not.

When the guide advances an edition, this ledger says exactly which documents were written against the older one. That is the whole purpose of the column, and it is why the edition number is worth maintaining even though nothing enforces it.

## Ledger

| Document | Edition | Words before | Words after | Growth | Date | Notes |
| --- | :---: | ---: | ---: | ---: | --- | --- |
| `foundations/architrino.md` | 1.0 | 4,090 | 6,297 | +54% | 2026-09-03 | Pilot. Operator accepted. All 17 equation-viewer links, all equations, all 16 internal links, and every claim preserved. |
| `foundations/euclidean-void.md` | 1.0 | 3,401 | 4,657 | +37% | 2026-09-03 | All 37 equation-viewer links preserved and still correctly placed after their math blocks; all internal links resolve; retired plain-language blockquote removed. Growth is lower than the pilot because much of the file is notation tables and operator definitions, which need explanation but not expansion. |
| `foundations/ontology.md` | 1.0 | 3,936 | 4,418 | +12% | 2026-09-03 | Navigation hub. Growth is low because most of the file is routing tables that need no expansion; the added prose explains Bell's theorem, superselection, the exchange loop, holonomy, and the forgetting-map tower. |
| `foundations/constructing-the-absolute-frame.md` | 1.0 | 2,318 | 2,604 | +12% | 2026-09-03 | All 12 equation-viewer links preserved. Added explanations of the cross product as area, the conditioning floor, $SE(3)$ versus the disconnected parity component, and writhe/twist. |

## Running totals

| | Files | Words | Note |
| --- | ---: | ---: | --- |
| Converted | 4 | 13,745 → 17,976 | +31% combined |
| Corpus at campaign start | 199 | 835,848 | measured immediately before the pilot |
| Corpus today | 199 | 842,279 | conversions plus concurrent style-guide expansion |
| Remaining unconverted | 195 | 824,303 | |

The corpus figures differ by more than the two conversions account for because the academic style guide is itself a corpus document and grew during the same session. That growth is not a conversion and carries no ledger row.

## What the growth figure is and is not

Four conversions, growing 54%, 37%, 12%, and 12%, for a combined **31%**. Applying 31% to the unconverted remainder projects a finished corpus of roughly **1.10 million words**, and that is the current planning basis.

The spread is large and it is not noise. Growth tracks one thing: **how much of a document is prose that must introduce vocabulary, versus material that needs a sentence of explanation but does not expand.**

| Document character | Example | Growth |
| --- | --- | ---: |
| Conceptual prose introducing vocabulary from nothing | `architrino.md` | +54% |
| Half notation, operator definitions, coordinate expressions | `euclidean-void.md` | +37% |
| Mostly routing tables and cross-references | `ontology.md` | +12% |
| Short, formula-dense, single-topic | `constructing-the-absolute-frame.md` | +12% |

A formula stays one formula however well it is introduced, and a routing table stays a routing table. Only prose that must build a concept from nothing grows substantially.

That makes document character a far better predictor than a corpus-wide rate, and it revises the estimate downward twice over. The first two conversions suggested 46%; four suggest 31%. All four are also foundational, carrying more undefined vocabulary than a typical later chapter, so the projection still has an upward bias.

Claim grade: `measured` for each row; `inferred` for the projection. Falsifier: five further conversions whose mean growth falls outside 15% to 50%.
