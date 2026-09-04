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
15. A ledger row is added recording file, edition, date, and a note on what the conversion changed. Do not record word counts or growth percentages; size was removed from this campaign's concerns by operator decision on 2026-09-03, and [conversion-ledger.md](conversion-ledger.md) says why.

Claim grade for a completed conversion: `measured` for the preservation checks, which are mechanically verifiable, and `inferred` for the style checks, which are a judgment against the guide. Falsifier for any conversion: a claim, grade, falsifier, equation, or link that differs from the pre-conversion document.

## Ranked Next Objects

### CRW-005 — Independent post-conversion assurance review

- **Status:** In progress
- **Opened:** 2026-09-04
- **Priority object:** `independent_assurance_review`
- **Request / acceptance:** Independently compare every converted corpus document with its pre-campaign source and edition 1.0, prioritizing exact mathematics, claim authority, falsifiers, source support, link integrity, and teaching structure. Findings are consult-only until Codex adjudicates and applies accepted corrections.
- **Scope:** 190 documents outside the already independently reviewed `foundations/` batch. The six `dynamics/` documents are included for a fresh Claude review at the operator's request despite their earlier Codex baseline review. Packet 1 covered all 14 `noether-braid/` documents; 176 documents remain. Packet 2 is `dynamics/`.
- **Packet 1 disposition:** Accepted the envelope-volume normalization, tangent-space claim correction, sharp-kernel restoration, topology-label restoration, conditional speed-budget grading, source support, broken anchors, merged headings, and bounded notation/grammar repairs. Rejected blanket renaming based only on a shared base glyph and rejected the claimed honeycomb scope error because the text already restricts the proof to intact regular face-to-face cells. Deferred the cross-corpus $c_1$ notation migration pending an exact use map and replacement proposal.
- **Blocked by:** nothing.
- **Completion:** Every one of the 190 paths has one recorded independent disposition and every accepted defect has been corrected and validated.

## In progress

CRW-005 is the active row.

## Awaiting verification

No rows.

## Verified

### CRW-003 — Phase 2: Remaining chapters

- **Status:** Verified
- **Closed:** 2026-09-04
- **Priority object:** `remaining_chapters`
- **Request / acceptance:** Convert the remaining chapters to edition 1.0 in reader order, so each conversion can rely on vocabulary already introduced upstream.

Scope after Phase 1 was 190 files. All Phase 2 reader-order batches are complete at authored-source level: all six `dynamics/` documents were rewritten and independently reviewed against the 2026-09-01 baseline, and the `noether-braid/`, `spacetime/`, `assemblies/`, `nuclear-atomic/`, `reactions/`, `quantum/`, `cosmology/`, `validation/`, `philosophy-history/`, and `archie/` batches were converted against their immediate pre-conversion sources. Frozen-source audits preserved the equations, viewer-link anchors, prior link targets, claim grades, and falsifiers. The final corpus scan finds 199 Markdown files, 4,657 equation-viewer links, no non-standalone viewer paragraph, and no retired plain-language tag. Generated equation-mapping data, scene graph, textbook navigation, and reading copies remain stale and are reported rather than regenerated during the ordinary source-edit batch.

Ordering is by reader path rather than alphabetically, so early conversions compound: a converted chapter can rely on its upstream chapters already introducing their terms properly, which is exactly what the cumulative-within-document and clue-plus-link rules assume.

#### Carried scope: the retired tag

This item absorbs the corpus half of [CRW-004](#crw-004--retired-plain-language-tag-retirement). **At the 2026-09-03 measurement, twenty-eight occurrences of the retired `Plainly:` tag remained across nine files, all outside the converted foundations, dynamics, and Noether-braid batches.** Criterion 12 removes them as part of each conversion rather than in a separate pass. No agent should run a standalone tag sweep over the corpus; it would touch those files twice and the rewrite would overwrite the sweep's edits.

Criterion 12 as amended is the whole instruction, and its second sentence is the part that matters: fold the plain-language sentence up into the paragraph above it. Do not delete it.

The former concentration in `noether-braid/2d-braid-assemblies.md` and `noether-braid/3d-braid-assemblies.md` is now discharged. Those two chapters accounted for 122 tags, and the complete Noether-braid batch removed 143 `Plainly:` tags plus three equivalent `Plain language:` labels while preserving every explanatory sentence in substance.

CRW-004 fails if this item completes with the corpus count above zero, so the count belongs in each batch's ledger note.

- **Blocked by:** nothing.
- **Evidence:** The 2026-09-04 ledger audit finds 199 live corpus paths and exactly 199 unique edition-1.0 rows, with no missing, extra, or duplicate path. Strict content validation and equation-mapping-link validation pass. Generated consumers remain stale and are named in the conversion ledger rather than regenerated without authorization.
- **Completion:** Met 2026-09-04. Every document under `content/markdown/aaa` carries one ledger row at edition 1.0.

### CRW-004 — Retired plain-language tag retirement

- **Status:** Verified
- **Closed:** 2026-09-04
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
| `content/markdown/aaa` | 9 | 28 | Absorbed into CRW-003; tracked here |
| `reference/op` | 4 | 9 | Convert — startup path |
| `reference/research-office/cto/prompts` | 2 | 7 | Convert — startup path |
| `.agents/skills` | 1 | 2 | Convert — startup path |
| `reference/priorities` | 352 | 4,198 | Leave — operator decision, 2026-09-03 |
| `reference/architectural-decisions` | 2 | 4 | Leave — operator decision, 2026-09-03 |

Earlier scans of the same day recorded 223 and then 225 corpus occurrences across 23 and 25 files. The count fell first to 172 across 16 after the foundations conversion, then to 28 across nine after the dynamics and Noether-braid batches, to 22 across eight after the spacetime and assemblies batches, and now to 20 across six after the reactions batch. Criterion 12 removed the tags as part of each document's rewrite rather than as a separate pass. That remains the mechanism for the rest of the corpus.

Claim grade: `measured` by filesystem scan on 2026-09-03. Falsifier: a repeat scan returning a count that has risen rather than fallen, which would mean the tag is still being authored into new documents and the standard is not being followed.

#### Corpus residual — absorbed, not scheduled

At the final 2026-09-04 recheck, the corpus occurrence count is zero. The explanatory substance formerly carried by each label was integrated during its document's conversion rather than removed by a separate tag sweep.

Before the final conversion, the residual had been concentrated in `philosophy-history/one-nature-many-theories.md`, which held ten occurrences; the other seven files held four or fewer each. Those historical measurements explain the earlier sequence above but do not describe the current corpus state.

Accordingly, this verified item schedules no corpus work. It retains the historical measurements and would have failed if Phase 2 had completed with the count above zero.

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

#### Working record — unconverted for now, by operator decision 2026-09-03

`reference/priorities` (4,198 occurrences across 352 files), `reference/architectural-decisions` (4), `reference/research-office/research-history`, and the fixtures under `src` and `tests` keep the tag.

**This is a decision, not a backlog item.** An agent finding the tag in these files should leave it there and should not open a sweep. The [operator explanation standard](../../op/operator-explanation-standard.md) already rules that a document written under a retired convention keeps its form and is converted only opportunistically, when it is under substantial revision for some other reason; that rule governs here and needs no separate item to enforce it.

The reasoning, so a later reader can judge whether it still holds. These files have no public reader and are not on the startup path, so neither of the two arguments that justified the other surfaces applies. They are dated records of what was thought at the time, and the tag is part of how that thinking was written down. Converting them would be a mechanical diff across 352 files that changes no conclusion, costs real review attention, and runs into the defect class the Codex pass identified — explanatory rewriting tends to firm up hedged claims. That risk is worth carrying for the textbook, where a reader is on the other end. It is not worth carrying for a review packet whose value is precisely that it records an earlier state of belief.

The decision was given as **unconverted for now**, so it is revisitable rather than permanent. Two things would properly reopen it: evidence that the tag is being newly authored into working-record documents despite the startup path being clean, which would mean the record is still teaching the convention to somebody; or a decision to publish or otherwise expose any part of `reference/priorities` to a reader outside the project, which would move those files into the reader-facing argument. Absent either, leave them.

Claim grade: `measured` for the counts. The judgment that these files carry no reinstatement risk is `inferred`, and shares its falsifier with the startup-path finding above.

#### Discharged blocker: search-index dependency, checked 2026-09-03

`apps/ios/ArchitrinoReader/GeneratedTextbookPackage/textbook_bundle_search_index.json` contains the literal string `Plainly:`, which raised the question of whether the search machinery keys on it — if it did, removing the tag from the corpus would break search rather than just clean prose. It does not. The file is `{schema_version, total_entries, entries}`, and a full walk of the parsed structure found the string **62 times, every occurrence inside `entries[N].text`, and zero occurrences as a key**. It is indexed prose, not structure.

The index and the whole iOS package are generated from the corpus and are an on-demand development snapshot rather than a routine output, so they carry whatever the corpus says at the next authorized export. No separate conversion work is owed for them.

Claim grade: `measured` by a recursive walk of the parsed JSON distinguishing key positions from string values. Falsifier: any consumer that reads the literal `Plainly:` as a delimiter, section marker, or lookup key rather than as displayed text.

#### Sweep instrument

The [corpus dragnet](../aaa-corpus-dragnet/priorities.md) owns the correlation actions that inventory occurrences and their contexts, and is read-only outside its own lane by charter. It supplies the counts above; it does not perform the conversions.

- **Blocked by:** nothing. Both original gates — operator readiness and the Tier 1 canon decision — are discharged above.
- **Evidence:** Nothing is owed by the operator. The census is reproducible, both style authorities have been checked, the search-index dependency is discharged, the startup-path pass remains clean, the working-record decision is recorded, and the final corpus scan returns zero occurrences.
- **Completion:** The startup-path scan returns zero across the seven files — **met 2026-09-03**; the working record is recorded as unconverted by decision, with its reopening conditions named — **met 2026-09-03**; the corpus scan returns zero — **met 2026-09-04**; and the repeat scan shows no occurrences in documents authored after edition 1.0 was adopted — **met 2026-09-04**.


### CRW-002 — Term lookup and orientation

- **Status:** Verified
- **Priority object:** `orientation_pass`
- **Closed:** 2026-09-04
- **Reformulated:** 2026-09-03, by operator decision, from a 70-file inline-linking pass to an affordance and glossary fix. The reformulation is recorded below because the original framing rested on a reader model that turned out to be wrong in one direction and right in another, and a later reader should be able to check the correction rather than inherit it.
- **Request / acceptance:** Give a reader who lands on an arbitrary corpus document a working route from a term to its definition, by making the glossary reachable and complete rather than by editing 70 documents. Accepted when the glossary is reachable from a document view without prior knowledge that it exists, covers the load-bearing foundational vocabulary, and the corpus-side work is confined to terms that carry an argument.

#### What was measured, 2026-09-03

The scan that opened this item stands: **70 documents use foundational vocabulary and link to `foundations/` zero times.** Worst cases by usage count are `3d-braid-assemblies.md` at 79 unglossed uses, `braid-analysis-methodology.md` at 72, and `2d-braid-assemblies.md` at 42.

What did not stand is the conclusion drawn from it. The item previously asserted that a reader landing on one of those documents has no route to what a wake is. **That is false, and the correction matters for what the work should be.** Every document view keeps a persistent toolbar — TOC, Back, Forward, Home, Search — plus textbook page arrows, so the reader is one click from the full table of contents and `foundations/` is in it. The reader is not stranded.

The real gap is narrower and was verified in code on 2026-09-03:

| Affordance | State | Evidence |
| --- | --- | --- |
| Scene search | Metadata only — `name`, `id`, `path`, `nodeType` across 586 entries; no body text | `src/runtime/SceneSearchRuntime.js`, `content/graph/scene_graph.json` |
| Glossary reachability | Not in the toolbar, not in the textbook TOC, not on the page arrows; reachable only via the Archie scene path or by searching the literal word "glossary" | `index.html`, `content/generated/markdown/textbook/toc.md`, `content/graph/textbook_toc.json` |
| Term decoration | None. Markdown decoration is limited to images, local asset links, `View →` equation rows, and the TOC page | `src/runtime/MarkdownRuntime.js` |
| Glossary coverage | 145 entries. `architrino`, `absolute time`, `path history`, `assembly` present. **`wake` present only as `Causal Wake` and `Wake Equation`; `causal root` has no entry** | `content/markdown/aaa/archie/comparative-glossary.md` |

So the reader can navigate but cannot look a word up. Search will not find a term, the glossary is hidden behind knowledge of its own name, nothing decorates terms in the prose, and the two terms most likely to be looked up are the two the glossary handles worst.

Claim grade: `measured`, by reading the named source files. Falsifier: any affordance in the shipped app that resolves a term to a definition from a document view and was missed by this audit.

#### Why the work moved off the documents

Editing 70 documents fixes a lookup problem one occurrence at a time, and only where an author remembered. The two routes below fix it for all 199 documents at once, leave corpus prose untouched, and stay correct as the corpus changes.

**Make the glossary reachable and complete.** One navigation change plus a handful of glossary rows. This is the whole of the accessibility gain for a small fraction of the cost, and it needs no corpus edit at all.

**Decorate terms at render time.** `src/runtime/MarkdownEquationMapRuntime.js` already proves the pattern: it finds rendered `View →` links and decorates the equation block above them. The same hook point in `MarkdownRuntime.js` could decorate glossary terms on first occurrence per document, driven by the glossary table itself.

What survives on the corpus side is small and pedagogical rather than mechanical: an inline clue is better than a lookup **where the term carries the argument**, because it explains the word in the context the reader met it without navigating away. That is a case-by-case judgment on a handful of passages, not a pass over 70 files, and CRW-003's criterion 8 already covers it for every document the rewrite reaches.

Claim grade: `inferred` for the judgment that a decorator beats 70 document edits. It rests on the equation-map precedent working for a different matching problem and has not been prototyped. Falsifier: a decorator that cannot disambiguate terms well enough to avoid mislinking — for example linking `assembly` in its ordinary English sense — which would push the work back into the documents.

#### Deliverables

1. **Glossary gap fill.** Add a `Wake` entry as a first-class term, add `Causal Root`, and audit the remaining foundational vocabulary against the first column rather than against the definitions. Corpus content, so it is subject to the academic style guide and to canon review.
2. **Glossary reachability.** Make the glossary reachable from a document view without prior knowledge of it. The toolbar and the textbook TOC are both candidates and the choice is a UI decision, not a foregone one; the [UI guidelines](../../../content/markdown/aaa/archie/ui-guidelines.md) govern.
3. **Term decorator, scoped and prototyped before committed.** A render-time decorator on the `MarkdownRuntime.js` hook, driven by the glossary table. Prototype the matching before building the feature; the disambiguation question decides whether this is worth doing at all.
4. **Selective inline clues.** Only where a term carries the argument of the passage. Not a sweep.

Deliverables 1 and 2 are independent of 3 and 4 and should not wait on them.

#### Closure evidence, 2026-09-04

All four deliverables are closed. The comparative glossary gained first-class `Wake`, `Causal Root`, `Complete State / Universe State`, `Polarity`, `Physical Observer`, and `Worldline` entries. The persistent document controls expose an accessible Glossary route in the UI-guideline slot after Search. The render-time decorator was declined after a 30-context ambiguity sample produced 10 false positives. The current-state corpus scan and manual audit identified two already-converted opening passages where the term carried the argument; both now contain a brief clue and an owning foundation link.

The integrated evidence, scan specification, false-positive table, deferred existing-row audit, browser QA, validation receipts, and generated-drift boundary are recorded in [crw-002-term-lookup-result.md](crw-002-term-lookup-result.md).

The implementation prompt is [crw-002-dispatch.md](crw-002-dispatch.md). It carries the verified affordance findings, the ordering, the disambiguation traps for deliverable 3, and the report contract; dispatch an agent with that document rather than with this section.

- **Blocked by:** nothing.
- **Evidence / blocker:** The accepted UI path, glossary coverage, declined decorator, and selective clue edits are implemented and validated. The historical 70-document measurement could not be repeated exactly because its term list, parser, command, and file list were not retained; the result record replaces it with an explicit current 149-document scan and does not claim a before-and-after delta.
- **Completion:** **Met 2026-09-04.** The glossary covers the audited load-bearing foundation vocabulary as first-class terms; a reader on an arbitrary scene or document can reach it without knowing it exists; the decorator is declined with its prototype result recorded; and the replacement current-state scan identifies the selective inline-clue scope.

### CRW-001 — Phase 1: Foundations

- **Status:** Verified
- **Priority object:** `foundations_phase_one`
- **Closed:** 2026-09-03
- **Request / acceptance:** Convert all nine documents in `content/markdown/aaa/foundations/` to edition 1.0, satisfying the done criteria above.

Foundations came first because everything else links into it. The 70 under-linked documents identified in [priorities.md](priorities.md) all point here, so converting a later chapter before its foundations were ready would have sent readers to prose about to change underneath them.

All nine converted at edition 1.0 on 2026-09-03: `architrino.md`, `euclidean-void.md`, `constructing-the-absolute-frame.md`, `ontology.md`, `absolute-timespace.md`, `absolute-time-defense.md`, `absolute-time.md`, `detecting-the-absolute-frame.md`, and `emergence-of-structure.md`. Per-file rows are in [conversion-ledger.md](conversion-ledger.md).

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
