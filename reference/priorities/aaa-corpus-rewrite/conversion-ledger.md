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

## Running totals

| | Files | Words | Note |
| --- | ---: | ---: | --- |
| Converted | 2 | 7,491 → 10,954 | +46% combined |
| Corpus at campaign start | 199 | 835,848 | measured immediately before the pilot |
| Corpus today | 199 | 841,511 | conversions plus concurrent style-guide expansion |
| Remaining unconverted | 197 | 830,557 | |

The corpus figures differ by more than the two conversions account for because the academic style guide is itself a corpus document and grew during the same session. That growth is not a conversion and carries no ledger row.

## What the growth figure is and is not

Two conversions, growing 54% and 37%, for a combined 46%. Applying 46% to the unconverted remainder projects a finished corpus of roughly **1.22 million words**, and that is the current planning basis.

The spread between the two is already informative and is the reason a single number was never going to be enough. `architrino.md` is almost entirely conceptual prose introducing vocabulary from nothing, and it grew most. `euclidean-void.md` is roughly half notation tables, operator definitions, and coordinate expressions, which need a sentence of explanation each but do not expand — a formula stays one formula however well it is introduced.

So the expected growth of any given chapter tracks its ratio of prose to notation. Conceptual chapters should run near 54%, notation-heavy ones nearer 37%, and chapters that already define their own terms lower still. That is a better predictor than a single corpus-wide rate, and it should be tested rather than assumed.

Both files are also foundational, which means both carried more undefined vocabulary than a typical later chapter. The projection therefore still has an upward bias, now of a smaller and better-understood size.

Claim grade: `measured` for each row; `inferred` for the corpus projection, upgraded from `guessed` now that two samples bracket a range and their difference has an identified cause. Falsifier: five further conversions whose mean growth falls outside 30% to 60%.
