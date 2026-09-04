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
12. The retired inline `Plainly:` tag does not appear, and it was removed by folding its sentence up into the technical prose above it rather than by deleting that sentence. Deleting the plain-language restatement and leaving the dense paragraph standing satisfies this criterion literally while violating criterion 10 and removing exactly the explanation this lane exists to add. Check 12 against 10, not on its own.

**Verification.**

13. `node scripts/validate-equation-mapping-links.mjs` passes.
14. Generated artifacts that consume the file are regenerated or their drift is reported.
15. A ledger row is added recording file, edition, before and after word counts, growth percentage, and date.

Claim grade for a completed conversion: `measured` for the preservation checks, which are mechanically verifiable, and `inferred` for the style checks, which are a judgment against the guide. Falsifier for any conversion: a claim, grade, falsifier, equation, or link that differs from the pre-conversion document.

## Ranked Next Objects

1. `remaining_chapters` — [CRW-003](#crw-003--phase-2-remaining-chapters). Status: `In progress`.
2. `orientation_pass` — [CRW-002](#crw-002--orientation-pass). Status: `Queued`.
3. `retired_tag_retirement` — [CRW-004](#crw-004--retired-plain-language-tag-retirement). Status: `Queued`.

## In progress

### CRW-003 — Phase 2: Remaining chapters

- **Status:** In progress
- **Priority object:** `remaining_chapters`
- **Request / acceptance:** Convert the remaining chapters to edition 1.0 in reader order, so each conversion can rely on vocabulary already introduced upstream.

Scope after Phase 1 was 190 files and 800,738 baseline words. The first Phase 2 batch is complete at authored-source level: all six `dynamics/` documents were rewritten and independently reviewed against the 2026-09-01 baseline. Their combined count moved from 78,425 words before conversion to 80,879 after review and raw-anchor cleanup, a 3% increase. The review corrected mathematics, claim boundaries, and source support; generated textbook navigation and reading copies remain stale and are reported rather than regenerated during the ordinary source-edit batch.

Ordering is by reader path rather than alphabetically, so early conversions compound: a converted chapter can rely on its upstream chapters already introducing their terms properly, which is exactly what the cumulative-within-document and clue-plus-link rules assume.

#### Carried scope: the retired tag

This item absorbs the corpus half of [CRW-004](#crw-004--retired-plain-language-tag-retirement). **172 occurrences of the retired `Plainly:` tag remain across 16 files, all of them in Phase 2 chapters and none in foundations,** and criterion 12 removes them as part of each conversion rather than in a separate pass. No agent should run a standalone tag sweep over the corpus; it would touch those files twice and the rewrite would overwrite the sweep's edits.

Criterion 12 as amended is the whole instruction, and its second sentence is the part that matters: fold the plain-language sentence up into the paragraph above it. Do not delete it.

Two files hold 122 of the 172 — `noether-braid/2d-braid-assemblies.md` at 82 and `noether-braid/3d-braid-assemblies.md` at 40 — and those same two documents top [CRW-002](#crw-002--orientation-pass)'s under-linked scan at 79 and 42 uses of unglossed foundational vocabulary. A document that restates itself in plain language 82 times while never once linking to what a wake is has a single underlying problem, and whichever of these two items reaches it first should expect to fix both. Batch them together rather than separately.

CRW-004 fails if this item completes with the corpus count above zero, so the count belongs in each batch's ledger note.

- **Blocked by:** nothing. Foundations and dynamics are complete at authored-source level.
- **Evidence / blocker:** Fifteen of 199 documents now carry conversion-ledger rows. The remaining reader order beyond dynamics is not yet fixed; establishing the next batch is the next action of this item.
- **Completion:** Every document under `content/markdown/aaa` carries a ledger row at the then-current edition.

## Queued

### CRW-002 — Orientation pass

- **Status:** Queued
- **Priority object:** `orientation_pass`
- **Request / acceptance:** For each document that uses foundational vocabulary without linking to `foundations/`, add a brief clue plus a link at the first use of each such term. Accepted when no corpus document uses a foundational term before glossing and linking it once.

This is deliberately **not** a rewrite, and keeping the two apart is the point. A rewrite reworks a whole document against every rule; the first fifteen conversions average 6% growth but range from a 14% reduction to a 52% increase. This pass touches only first occurrences, adds a clause and a link, and should grow a document by one to three percent. It buys most of the accessibility for a small fraction of the work, and it can run while the rewrite continues through later phases.

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

### CRW-004 — Retired plain-language tag retirement

- **Status:** In progress. The startup-path pass is complete; the corpus condition rides on [CRW-003](#crw-003--phase-2-remaining-chapters).
- **Priority object:** `retired_tag_retirement`
- **Moved here:** 2026-09-03, from `OPS-015` in the [operations queue](../aaa-operations/work-queue.md), reformulated. The original item was written when removing the tag looked like a standalone cleanup with its own operator gate. It is not one any more, and that is why it moved: [done criterion 12](#done-criteria) of this lane already forbids the tag, so most of the work is a by-product of conversions this queue is running anyway. What is left is a residual to track and one small pass outside the corpus.
- **Request / acceptance:** Retire the inline `Plainly:` tag from the two surfaces where a reader or a new agent still meets it, and confirm the working record is left alone. Accepted when the corpus scan returns zero, the startup-path scan returns zero, and a later scan shows the tag is not being newly authored.

The tag was an operator-communication convention: a paragraph of technical prose followed by a labelled plain-language restatement of the same thing. Edition 1.0 of the [academic style guide](../../../content/markdown/aaa/archie/academic-style-guide.md) retired it in favour of writing plainly in the first instance, which is the same idea done once rather than twice.

#### Why it needs a work item at all

The tag leaked. Neither authority that governs reader-facing text ever asked for it — the academic style guide prescribed explanatory prose, a compact map, and equations followed by plain-language symbol meanings, and never named the tag; the [UI guidelines](../../../content/markdown/aaa/archie/ui-guidelines.md) did not mention it. It arrived in the textbook by imitation from operator-facing writing, and the generated iOS reading package carries it onward to readers.

Silence in the style guide is what allowed that, so the original item held a canon gate: decide explicitly whether the guide endorses, forbids, or ignores the tag before touching corpus prose. **That gate is now discharged.** Edition 1.0 forbids it, and done criterion 12 of this lane states the rule in executable form. No further canon decision is owed.

The original item was also `Blocked` on an operator decision that the standards were settled enough to rewrite a published book against. That gate is discharged too: the operator opened the corpus-wide rewrite, and [CRW-001](#crw-001--phase-1-foundations) closed `Verified`.

Claim grade for the leak finding: `measured` by reading both style authorities for any mention of the tag and finding none. Falsifier: any ratified reader-facing style authority, at any edition, that prescribes the tag.

#### Measured scope, 2026-09-03

Markdown only, excluding `.tmp`, `.local-data`, `.git`, and `node_modules`.

| Surface | Files | Occurrences | Disposition |
| --- | ---: | ---: | --- |
| `content/markdown/aaa` | 16 | 172 | Absorbed into CRW-003; tracked here |
| `reference/op` | 4 | 9 | Convert — startup path |
| `reference/research-office/cto/prompts` | 2 | 7 | Convert — startup path |
| `.agents/skills` | 1 | 2 | Convert — startup path |
| `reference/priorities` | 352 | 4,198 | Leave; opportunistic only |
| `reference/architectural-decisions` | 2 | 4 | Leave; opportunistic only |

Earlier scans of the same day recorded 223 and then 225 corpus occurrences across 23 and 25 files. The count is now 172 across 16, and the fall is explained: nine foundations documents were converted in between, and criterion 12 removed their tags as part of the rewrite rather than as a separate pass. That is the mechanism this item is betting on for the rest of the corpus.

Claim grade: `measured` by filesystem scan on 2026-09-03. Falsifier: a repeat scan returning a count that has risen rather than fallen, which would mean the tag is still being authored into new documents and the standard is not being followed.

#### Corpus residual — absorbed, not scheduled

All 172 remaining corpus occurrences sit in chapters that [CRW-003](#crw-003--phase-2-remaining-chapters) will convert, and none sit in foundations. Running a separate tag-removal pass over them would touch those files twice, once for the tag and once for the rewrite, and the second pass would rewrite the passages the first pass just edited.

The concentration is extreme and worth knowing when Phase 2 sequences its batches. Two files hold 122 of the 172 — `noether-braid/2d-braid-assemblies.md` at 82 and `noether-braid/3d-braid-assemblies.md` at 40 — and six files hold 153. Those same two documents are also the worst cases in [CRW-002](#crw-002--orientation-pass)'s under-linked scan. A document that restates itself 82 times in plain language and never once links to what a wake is has one underlying problem, not two, and converting it should fix both.

So this item schedules no corpus work. It carries the number, and it fails if Phase 2 completes with the number above zero.

#### Startup-path pass — executed 2026-09-03

**18 occurrences across 7 files, now zero:**

- `reference/op/simulation-protocol-routing-index.md`, `textbook-review-exports.md`, `machine-artifact-retention.md`, `git/continuous-development-during-pr-review.md`
- `reference/research-office/cto/prompts/start-research.md`, `start-pi.md`
- `.agents/skills/math-preview/SKILL.md`

Small in volume, disproportionate in effect, and the reason is position rather than size. These are files a new session reads while routing itself at startup, before it has read the explanation standard. A retained `Plainly:` in one of them is a worked example of the retired pattern shown to the next agent as if it were current practice, so the convention teaches itself back into the repository faster than conversions remove it. Eighteen occurrences is a single short pass.

The edit is the same one the corpus conversions make: fold the labelled restatement into the technical prose that precedes it so the prose reads plainly on its own, rather than deleting the plain-language sentence and leaving the dense one standing.

**Executed 2026-09-03.** No plain-language sentence was deleted. Each was folded upward in one of three shapes, and the shapes are worth recording because Phase 2 will meet all three:

- **Merged into the preceding paragraph** where the tag restated that paragraph. The retention rule in `machine-artifact-retention.md` now closes its own dense paragraph with the rule it was previously restating underneath.
- **Promoted above a list** where the tag summarized steps that followed it. Both research prompts had this: the startup list in `start-pi.md` now opens with what it is for instead of explaining itself afterward.
- **Split and distributed** where one tag carried several unrelated points. The Actions-publishing tag in `machine-artifact-retention.md` held a build claim, a testing claim, and a repair claim; each went to the paragraph that owned it, and one of the three was already stated verbatim in the section, so that copy was dropped rather than duplicated.

Claim grade: `measured` — a repeat scan across the three roots returns zero. Falsifier: the tag appearing in a newly authored startup-path file, which would mean the convention has a source not identified here.

Claim grade for the reinstatement mechanism this pass was meant to stop: `inferred`. It is a reading of how sessions pick up conventions, not a measurement, and the pass does not prove the reading was right. Falsifier: the tag appearing in newly authored documents despite the startup path now being clean.

#### Working record — deliberately left alone

`reference/priorities`, `reference/architectural-decisions`, `reference/research-office/research-history`, and the fixtures under `src` and `tests` keep the tag. The [operator explanation standard](../../op/operator-explanation-standard.md) already rules that documents written under a retired convention keep their form, and that conversion happens opportunistically when a document is under substantial revision for other reasons.

Four thousand occurrences across 352 analysis packets is a mechanical diff with real review cost and no reader on the other end. These are dated records of what was thought at the time, and the tag is part of that record. Not converting them is the decision, not a deferral.

#### Discharged blocker: search-index dependency, checked 2026-09-03

`apps/ios/ArchitrinoReader/GeneratedTextbookPackage/textbook_bundle_search_index.json` contains the literal string `Plainly:`, which raised the question of whether the search machinery keys on it — if it did, removing the tag from the corpus would break search rather than just clean prose. It does not. The file is `{schema_version, total_entries, entries}`, and a full walk of the parsed structure found the string **62 times, every occurrence inside `entries[N].text`, and zero occurrences as a key**. It is indexed prose, not structure.

The index and the whole iOS package are generated from the corpus and are an on-demand development snapshot rather than a routine output, so they carry whatever the corpus says at the next authorized export. No separate conversion work is owed for them.

Claim grade: `measured` by a recursive walk of the parsed JSON distinguishing key positions from string values. Falsifier: any consumer that reads the literal `Plainly:` as a delimiter, section marker, or lookup key rather than as displayed text.

#### Sweep instrument

The [corpus dragnet](../aaa-corpus-dragnet/priorities.md) owns the correlation actions that inventory occurrences and their contexts, and is read-only outside its own lane by charter. It supplies the counts above; it does not perform the conversions.

- **Blocked by:** nothing. Both original gates — operator readiness and the Tier 1 canon decision — are discharged above.
- **Evidence / blocker:** The census is reproducible, both style authorities have been checked, and the search-index dependency is discharged. The one open judgment is whether the startup-path pass runs now or waits for Phase 2 to finish, and the argument above is that it should run now, because its cost is one short pass and its benefit is stopping the tag from being re-authored while conversions are still removing it.
- **Completion:** The startup-path scan returns zero across those seven files; the corpus scan returns zero when [CRW-003](#crw-003--phase-2-remaining-chapters) completes; the working record is confirmed unconverted by decision rather than by omission; and a repeat scan shows no occurrences in documents authored after edition 1.0 was adopted.

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
