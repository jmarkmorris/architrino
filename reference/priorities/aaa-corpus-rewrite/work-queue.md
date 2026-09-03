# Corpus Explanation Rewrite Work Queue

This is the canonical execution ledger for bringing `content/markdown/aaa` into line with edition 1.0 of the [academic style guide](../../../content/markdown/aaa/archie/academic-style-guide.md). Per-file conversion records live in [conversion-ledger.md](conversion-ledger.md).

## Done Criteria

Every conversion in this lane, in any phase, satisfies all of the following. An agent self-checks these; the operator spot-checks.

**Content preserved exactly.**

1. No claim added, removed, weakened, or strengthened.
2. Every claim grade and falsifier preserved verbatim in substance.
3. Every equation preserved character for character.
4. Every `View →` link preserved with its original anchor, still the sole content of the paragraph immediately following its equation block, or the equation viewer will stop decorating it.
5. Every internal link preserved and still resolving.

**Style rules applied.**

6. Every $\mathbb{A}\mathbb{A}\mathbb{A}$ concept the document uses is defined or clued where first used.
7. Every appeal to established physics is explained rather than named.
8. Every concept imported from another document carries a brief clue plus a link at first use.
9. Load-bearing terms are restated where the argument turns on them, not on a counter.
10. No dense passage followed by a plainer restatement; technical prose reads plainly on its own.
11. Every symbol is named in words; every equation is followed by prose saying what it is and why it holds.
12. The retired inline plain-language tag does not appear.

**Verification.**

13. `node scripts/validate-equation-mapping-links.mjs` passes.
14. Generated artifacts that consume the file are regenerated or their drift is reported.
15. A ledger row is added recording file, edition, before and after word counts, growth percentage, and date.

Claim grade for a completed conversion: `measured` for the preservation checks, which are mechanically verifiable, and `inferred` for the style checks, which are a judgment against the guide. Falsifier for any conversion: a claim, grade, falsifier, equation, or link that differs from the pre-conversion document.

## Ranked Next Objects

1. `foundations_phase_one` — [CRW-001](#crw-001--phase-1-foundations). Status: `In progress`.
2. `orientation_pass` — [CRW-002](#crw-002--orientation-pass). Status: `Queued`.
3. `remaining_chapters` — [CRW-003](#crw-003--phase-2-remaining-chapters). Status: `Queued`.

## In progress

### CRW-001 — Phase 1: Foundations

- **Status:** In progress, 4 of 9 complete
- **Priority object:** `foundations_phase_one`
- **Request / acceptance:** Convert all nine documents in `content/markdown/aaa/foundations/` to edition 1.0, satisfying the done criteria above. Accepted when all nine carry ledger rows and the operator has reviewed at least two.

Foundations comes first because everything else links into it. The 70 under-linked documents identified in [priorities.md](priorities.md) will all point here, so converting a later chapter before its foundations are ready would send readers to prose about to change underneath them.

| File | Words | Status |
| --- | ---: | --- |
| `architrino.md` | 4,090 → 6,297 | **Converted**, pilot, accepted 2026-09-03 |
| `absolute-time.md` | 4,265 | Queued |
| `absolute-time-defense.md` | 4,830 | Queued |
| `absolute-timespace.md` | 5,369 | Queued |
| `constructing-the-absolute-frame.md` | 2,318 → 2,604 | **Converted** 2026-09-03 |
| `detecting-the-absolute-frame.md` | 4,023 | Queued |
| `emergence-of-structure.md` | 5,078 | Queued |
| `euclidean-void.md` | 3,401 → 4,657 | **Converted** 2026-09-03 |
| `ontology.md` | 3,936 → 4,418 | **Converted** 2026-09-03 |

Suggested order after the pilot: `euclidean-void.md` and `absolute-timespace.md` next, because `architrino.md` already links to both and a reader following that link should not land on unconverted prose. Then `ontology.md`, then `absolute-time.md` and its defense, then the frame documents, then `emergence-of-structure.md`.

- **Evidence / blocker:** Nothing blocks. Edition 1.0 is settled, the pilot is accepted, and the done criteria are written.
- **Completion:** All nine files converted, ledgered, and at least two operator-reviewed.

## Queued

### CRW-002 — Orientation pass

- **Status:** Queued
- **Priority object:** `orientation_pass`
- **Request / acceptance:** For each document that uses foundational vocabulary without linking to `foundations/`, add a brief clue plus a link at the first use of each such term. Accepted when no corpus document uses a foundational term before glossing and linking it once.

This is deliberately **not** a rewrite, and keeping the two apart is the point. A rewrite reworks a whole document against every rule at roughly 54% growth. This pass touches only first occurrences, adds a clause and a link, and should grow a document by one to three percent. It buys most of the accessibility for a small fraction of the work, and it can run while the rewrite is still working through earlier phases.

Measured scope, 2026-09-03: **70 files, 428,706 words.** Worst cases by usage count are `3d-braid-assemblies.md` at 79 uses across 16,721 words, `braid-analysis-methodology.md` at 72 uses, and `2d-braid-assemblies.md` at 42 uses across 14,153 words. A reader landing on any of those from a search result currently has no route to what a wake is.

The shape of an edit is one clause and one link, not a paragraph. Written as it appears in the corpus file, with the link target relative to that file rather than to this queue:

```markdown
the substrate has absolute time, a Euclidean void, and a finite speed at which
a [wake](../foundations/architrino.md) — the expanding disturbance an architrino
leaves behind it — travels outward
```

- **Blocked by:** Nothing hard, but it should follow Phase 1, because the links it adds point into `foundations/` and those documents should read well before traffic is directed at them.
- **Evidence / blocker:** The scan is complete and reproducible. Not yet decided: whether every foundational term gets a clue, or only the four or five that carry the most weight. Deciding that is the first action of this item.
- **Completion:** No corpus document uses a foundational term before glossing and linking it once, verified by a repeat of the original scan.

### CRW-003 — Phase 2: Remaining chapters

- **Status:** Queued
- **Priority object:** `remaining_chapters`
- **Request / acceptance:** Convert the remaining chapters to edition 1.0 in reader order, so each conversion can rely on vocabulary already introduced upstream.

Scope after Phase 1: 190 files, roughly 798,500 words. At the pilot's 54% that is a large multi-month campaign, and it should be run in batches with the ledger showing progress rather than as one push.

Ordering is by reader path rather than alphabetically, so early conversions compound: a converted chapter can rely on its upstream chapters already introducing their terms properly, which is exactly what the cumulative-within-document and clue-plus-link rules assume.

- **Blocked by:** [CRW-001](#crw-001--phase-1-foundations). Foundations must be complete first.
- **Evidence / blocker:** Chapter order is not yet fixed. Establishing it is the first action of this item, and it should be a reader's route through the theory rather than the directory listing.
- **Completion:** Every document under `content/markdown/aaa` carries a ledger row at the then-current edition.

## Awaiting verification

No rows.

## Verified

No rows.
