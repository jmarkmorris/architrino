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

1. `orientation_pass` — [CRW-002](#crw-002--orientation-pass). Status: `Queued`.
2. `remaining_chapters` — [CRW-003](#crw-003--phase-2-remaining-chapters). Status: `Queued`.

## In progress

No rows.

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

- **Blocked by:** nothing. Phase 1 closed `Verified` on 2026-09-03, so the links this pass adds now point into converted prose.
- **Evidence / blocker:** The scan is complete and reproducible. Not yet decided: whether every foundational term gets a clue, or only the four or five that carry the most weight. Deciding that is the first action of this item.
- **Completion:** No corpus document uses a foundational term before glossing and linking it once, verified by a repeat of the original scan.

### CRW-003 — Phase 2: Remaining chapters

- **Status:** Queued
- **Priority object:** `remaining_chapters`
- **Request / acceptance:** Convert the remaining chapters to edition 1.0 in reader order, so each conversion can rely on vocabulary already introduced upstream.

Scope after Phase 1: 190 files, 800,738 words. The nine-file evidence revises the cost sharply downward — foundations grew 9% overall, and four of the nine shrank. Later chapters carry less undefined vocabulary and more repetition than foundations, so Phase 2 may well reduce the corpus rather than expand it. Run in batches with the ledger showing progress.

Ordering is by reader path rather than alphabetically, so early conversions compound: a converted chapter can rely on its upstream chapters already introducing their terms properly, which is exactly what the cumulative-within-document and clue-plus-link rules assume.

- **Blocked by:** nothing. [CRW-001](#crw-001--phase-1-foundations) closed `Verified` on 2026-09-03, so foundations is complete and later chapters can link into finished prose.
- **Evidence / blocker:** Chapter order is not yet fixed. Establishing it is the first action of this item, and it should be a reader's route through the theory rather than the directory listing.
- **Completion:** Every document under `content/markdown/aaa` carries a ledger row at the then-current edition.

## Awaiting verification

No rows.

## Verified

### CRW-001 — Phase 1: Foundations

- **Status:** Verified
- **Priority object:** `foundations_phase_one`
- **Closed:** 2026-09-03
- **Request / acceptance:** Convert all nine documents in `content/markdown/aaa/foundations/` to edition 1.0, satisfying the done criteria above.

Foundations came first because everything else links into it. The 70 under-linked documents identified in [priorities.md](priorities.md) all point here, so converting a later chapter before its foundations were ready would have sent readers to prose about to change underneath them.

| File | Before | After | Net |
| --- | ---: | ---: | ---: |
| `architrino.md` | 4,090 | 6,228 | +52% |
| `euclidean-void.md` | 3,401 | 4,770 | +40% |
| `constructing-the-absolute-frame.md` | 2,318 | 2,683 | +16% |
| `ontology.md` | 3,936 | 4,537 | +15% |
| `absolute-timespace.md` | 5,369 | 6,104 | +14% |
| `absolute-time-defense.md` | 4,830 | 5,075 | +5% |
| `absolute-time.md` | 4,265 | 4,249 | −0% |
| `detecting-the-absolute-frame.md` | 4,023 | 3,820 | −5% |
| `emergence-of-structure.md` | 5,078 | 4,371 | −14% |
| **Total** | **37,310** | **41,837** | **+12%** |

#### Verification, 2026-09-03 20:28

Mechanical criteria 1 through 5, 12, and 13 verified across all nine documents:

- **211 equation-viewer links** preserved, matching the pre-conversion count exactly, with **zero misplaced** — each still the sole content of the paragraph immediately following its equation block, which is what the viewer requires to decorate them.
- Every internal link resolves.
- The retired inline plain-language tag appears **zero** times.
- `validate-equation-mapping-links.mjs` passes.

Per-file rows are in [conversion-ledger.md](conversion-ledger.md).

#### How the acceptance condition was met

The original condition named operator review of at least two documents. It was satisfied differently and, for the risk it was guarding against, more strongly: an **independent Codex correction pass over all nine**, followed by a second pass.

That review found real defects, and their pattern is the reason this note exists rather than a bare tick. Every correction pulled back an overclaim — a propagation law that *dynamically distinguishes* the rest frame rather than *structurally* doing so; a clock form that *encodes* the absolute-time postulate rather than proving it; a glider as a relative periodic orbit rather than a rotation-number lift; source-motion asymmetry marked as a derivation target rather than an established Doppler law; unbounded wake history flagged as a postulate carrying a finite-memory caveat.

The failure mode is single and nameable: **explanatory rewriting tends to firm up hedged claims.** Making a passage clear invites making it decisive, and decisive is not always what the theory has earned. Phase 2 should treat that as the expected defect class rather than discovering it again.

Claim grade: the mechanical criteria are `measured` by the checks above. The style criteria are `inferred` — a judgment against the guide, now carrying independent-review evidence rather than author self-assessment alone. Falsifier: any claim, grade, falsifier, equation, or link in a converted document that differs in substance from its pre-conversion form.

#### Residual, carried forward

Operator reading of the converted prose has not happened. The mechanical criteria and the correction pass establish that content survived and that overclaims were caught; neither establishes that the result reads the way the operator wants. That judgment properly belongs to the first Phase 2 batch, where it can act on many more files.

A concurrent Codex pass was still running when these counts were taken, so figures may drift slightly. Re-measure before using them for planning.
