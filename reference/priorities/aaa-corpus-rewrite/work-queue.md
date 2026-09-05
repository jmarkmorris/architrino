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

## Deferred / discussion-scoped

### CRW-006 — Offline context-aware glossary-link classifier

- **Status:** Discussion-scoped; not accepted for implementation
- **Opened:** 2026-09-04
- **Priority object:** `offline_context_aware_glossary_link_classifier`
- **Request / acceptance:** If automated term-link assistance is reconsidered, consider only an offline context-aware classifier that reads the surrounding sentence or paragraph and proposes one of three human-reviewable actions: no glossary link, a link to a specific glossary meaning, or a terminology correction such as replacing an effective or imported use of `field` with `causal wake` when the passage intends the substrate concept. The classifier must never run as an autonomous render-time feature and must never write accepted links without human approval.
- **Scope:** Running the assistant over a document may produce proposals, but it changes no reader-facing page by itself. A term such as `wake` appears as a link only in occurrences a human reviewer accepts and writes into the Markdown source. The eventual scan domain, candidate-term families, benchmark, error threshold, and maximum review batch all require separate approval; this row authorizes neither an all-document run nor a corpus-wide link insertion.
- **Evidence / blocker:** The persistent Glossary control already supplies universal lookup. The rejected literal decorator produced 10 false positives in 30 ambiguity-stratified contexts because exact spelling did not establish intended meaning. A context-aware classifier could separate uses such as `field of mathematics`, `effective electromagnetic field`, and an architrino's causal wake, but that possibility is unmeasured. It would require a human-reviewed benchmark for each ambiguous term family and a proposal-only review workflow. The operator has not decided that the possible reader benefit warrants that development and review cost.
- **Completion:** Either the operator accepts a bounded classifier prototype with a declared benchmark and human-acceptance workflow, or declines the idea and this row moves to `Withdrawn`.

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
3. **Term decorator — declined.** The tested literal render-time decorator failed its semantic-disambiguation burden. Any later automation proposal is separated into [CRW-006](#crw-006--offline-context-aware-glossary-link-classifier) and limited to an offline context-aware classifier that proposes links or terminology corrections for human acceptance; autonomous runtime decoration remains excluded.
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

## Foundations substantive review — 2026-09-05

### Authority and coverage

The operator requested a fresh complete review of every Markdown file under `content/markdown/aaa/foundations/`, in textbook order, with discussion after each small batch. This review assesses mathematics, conceptual coherence, evidence, exposition, and useful deductions under the current academic style guide, edition 1.1. It is separate from the historical edition-1.0 conversion and from CRW-005's 190-document assurance denominator. Historical conversion rows and acceptance records above remain unchanged. The live corpus-reviewer procedure governs this work, with the operator's batch instruction replacing its one-document default.

The initial request authorized review records and discussion capture only. The operator subsequently accepted all batch-1 recommendations and directed their implementation before batch 2; the dated integration record below owns that acceptance and verification. Batch-2 findings remain discussion-only. Controlled canon, application changes, generated artifacts, and reactivation of deferred theory work remain outside this task. A later instruction to continue means the next review batch unless implementation is also requested.

Baseline Git HEAD: `d1eab6a51f20a2490031d77fd60f4563192a8f04`. Initial `git diff --check` passed. Foundations and this lane were clean at baseline and immediately before the first batch reading. Unrelated concurrent changes were present and were left untouched. Hashes below identify the actual source bytes; HEAD alone would not identify an independently modified working file.

The recursive inventory was sorted by repository-relative path, independently of reading order:

```text
content/markdown/aaa/foundations/absolute-time-defense.md
content/markdown/aaa/foundations/absolute-time.md
content/markdown/aaa/foundations/absolute-timespace.md
content/markdown/aaa/foundations/architrino.md
content/markdown/aaa/foundations/constructing-the-absolute-frame.md
content/markdown/aaa/foundations/detecting-the-absolute-frame.md
content/markdown/aaa/foundations/emergence-of-structure.md
content/markdown/aaa/foundations/euclidean-void.md
content/markdown/aaa/foundations/ontology.md
```

All nine files occur in `content/graph/textbook_toc.json` and as Markdown nodes in `content/graph/scene_graph.json`. The authored Foundations scene's child and object order agrees with the textbook traversal: Ontology, Architrino, Absolute Time, Euclidean Void, Absolute Timespace, Absolute Time Defense, Detecting the Absolute Frame, Constructing the Absolute Frame, Emergence of Structure. The scene uses object order clockwise, with no center node. The human-readable generated TOC supplies the same chapter route. At baseline, Ontology line 40 recommended a different prose route; finding F1-7 records that conflict, now corrected in the accepted batch-1 integration. No file is omitted and no lexical fallback is required.

| Batch | Documents in reading order | Current disposition |
| --- | --- | --- |
| 1 | [Ontology](../../../content/markdown/aaa/foundations/ontology.md), [Architrino](../../../content/markdown/aaa/foundations/architrino.md) | Accepted corrections verified after full-document self-review |
| 2 | [Absolute Time](../../../content/markdown/aaa/foundations/absolute-time.md), [Euclidean Void](../../../content/markdown/aaa/foundations/euclidean-void.md) | Both read completely; Absolute Time corrections verified; Euclidean Void partially integrated; F2-1 through F2-5 accepted corrections verified; F2-6 and F2-7 awaiting decision |
| 3 | [Absolute Timespace](../../../content/markdown/aaa/foundations/absolute-timespace.md) | Not yet reviewed as a campaign target; single batch for mathematical density |
| 4 | [Absolute Time Defense](../../../content/markdown/aaa/foundations/absolute-time-defense.md) | Not yet reviewed; single batch for evidence and proof burden |
| 5 | [Detecting the Absolute Frame](../../../content/markdown/aaa/foundations/detecting-the-absolute-frame.md), [Constructing the Absolute Frame](../../../content/markdown/aaa/foundations/constructing-the-absolute-frame.md) | Not yet reviewed as campaign targets |
| 6 | [Emergence of Structure](../../../content/markdown/aaa/foundations/emergence-of-structure.md) | Not yet reviewed; separate synthesis and branch-selection burden |

Reading a later chapter as a required foundation anchor does not count as its completed review. Coverage is 4 of 9 complete readings: 3 chapters with all recommended corrections accepted and verified, 1 partially integrated chapter awaiting further decisions, 0 reviewed with no recommended change, 0 files explicitly deferred or blocked, and 5 not yet reviewed. F2-1 through F2-5 have verified corrections; the physical response identifications discussed in F2-2 remain open recovery obligations. Scientific closure is not implied by any coverage status.

| Path within Foundations | Baseline SHA-256 |
| --- | --- |
| `absolute-time-defense.md` | `ecc01d492409e390ac8c31669754c17b91dcb6e41e6fe9c1ebdf9fe37c641a6b` |
| `absolute-time.md` | `5de8b7c9d4fb4e9f4333b625232a6b3623a77bc7e9dc4496b1aa7ee5c27b93c3` |
| `absolute-timespace.md` | `f0fce6751a516b7d1c117f82b7b0af18e810052830036c331bc861d33ea8437c` |
| `architrino.md` | `ac544151f6abbe03b4462b0a13b050863c1a3528096ccc813e2008e87e2cd6c3` |
| `constructing-the-absolute-frame.md` | `338bade09771545d55eaa58ef7bae25727ddd224160424088160cc4bb8d103cc` |
| `detecting-the-absolute-frame.md` | `8a62ef2951e06ed1aa6586f2e2ca010f63368bc2cbdc6f256cd82d335d451d9b` |
| `emergence-of-structure.md` | `d9594a7f8c6cf8222065675ee9fb452c7996184ea2d54b2309fe9d2823a44e24` |
| `euclidean-void.md` | `8271a58af882afa153a92d29789be3fa36f787f161c7da5f7e398d2a240a3acb` |
| `ontology.md` | `67bf62b188c6292e64e0ad525307fdc7680f55a9db77a5892fa706e0e761e859` |

### Batch 1 findings

Findings refer to the hashes above and source line numbers at review time. They are ordered by theoretical consequence rather than by the size of the proposed edit. A demonstrated implication failure does not show that every proposed physical realization fails. The distinction is explicit below.

#### F1-1 — Bell degradation does not by itself discharge the finite-speed obstruction

**Location:** `ontology.md:267`, with the route and assumptions at lines 237–265. **Classification:** high-consequence unsupported sufficiency claim and open proof obligation. **Recommendation:** retain the proposed degradation prediction, but make multipartite consistency an additional requirement for either route.

The paragraph offers two forms of closure: degrading toward a Bell-local bound when a finite-speed channel cannot connect the wings, or proving that the cited finite-speed obstruction does not apply. These are not sufficient alternatives as written. Bancal and collaborators already allow disconnected wings to lose their quantum correlations. Their four-party argument tests whether that local fallback can coexist with the required connected marginals and no-signalling. Merely adding a two-party degradation prediction therefore leaves the obstruction intact. This is a source-scope finding from the authors' [paper](https://arxiv.org/pdf/1110.3795), pp. 2–4, especially Figure 2, Lemma 1, and the comparison of measurement orders on p. 4.

The smallest repair is to say that degradation is a candidate observable consequence, while the same proposed response must separately pass the finite-speed premise audit and yield a consistent multipartite probability law. The alternative is to identify a changed premise and its observable consequences. No replacement Bell mechanism is established here. The existing [EPRB-003](../dormant-deferred/epr-bell/work-queue.md#eprb-003--audit-the-finite-speed-route-against-bancal) already owns this audit, and [EPRB-007](../dormant-deferred/epr-bell/work-queue.md#eprb-007--specify-finite-c_f-reach-fallback-and-identification) makes reach/degradation work depend on it. Both remain deferred; this review does not reactivate them.

Claim grade: `inferred` for the insufficiency of the chapter's proposed alternative, based on inspected primary-source premises and the live queue dependency. Falsifier: a specified degradation law with a derived multipartite distribution that both preserves the declared no-signalling constraints and identifies precisely which theorem premise is absent. A fitted two-wing curve alone would not overturn this finding. Consequence for later reviews: no clock, photon-speed, or causal-reach conclusion may treat this proposed Bell route as closed.

#### F1-2 — The observer projection is asserted to factor through an insufficiently specified coarse state

**Location:** `ontology.md:79–101`, particularly line 95. **Classification:** consequential unsupported universal factorization; missing assumption. **Recommendation:** retain the diagram as a scoped candidate hierarchy and state the sufficiency condition for the selected observer records.

The diagram discards detailed assembly information and retains the smooth tuple of effective quantities before producing a detector record. It then identifies the full observer projection with this composition. A sequence of coarsenings exists only when later outputs are determined by what earlier maps retained. This is precisely the fiber condition the chapter correctly explains at line 99, but does not apply to its own diagram.

Write $C=\Pi_{\mathrm{eff}}\circ\Pi_{\mathrm{assembly}}$ for the proposed coarse description and $R=\Pi_{\mathrm{obs}}$ for a selected observer record. A map $f$ satisfying $R=f\circ C$ exists on the image of $C$ if and only if

$$
C(S_1)=C(S_2)\quad\Longrightarrow\quad R(S_1)=R(S_2)
$$

Necessity follows by applying $f$ to equal coarse states. For sufficiency, define $f(C(S))=R(S)$; the implication makes the definition independent of the representative $S$. A coarse description that retains an apparatus's type and smooth medium response but discards which stable outcome it recorded fails this test. Abstractly, two states $(b,z)$ with the same retained variable $z$ and different recorded bit $b\in\{0,1\}$ are a counterexample to deriving factorization merely from the existence of levels. This is a logical countermodel, not an exhibited EOM trajectory.

The [Observer Framework](../../../content/markdown/aaa/spacetime/observer-framework.md) retains apparatus records, settings, calibration, windows, and boundary histories; it does not establish that the displayed smooth tuple determines every record. The smallest sufficient repair is to qualify the hierarchy by the observable family and retained apparatus/history data, or label its complete factorization as a target. It is unnecessary to abandon the useful level diagram.

Claim grade: `derived` for the factorization criterion and logical countermodel; `inferred` for insufficiency of the chapter's current map declaration. Falsifier: an explicit definition of the intermediate state that retains every variable needed for the claimed observer record, together with a proof of the implication above. Later effective-clock and metric reviews must keep their maps conditional until the relevant sufficiency is established.

#### F1-3 — Dividing the root gap by speed does not make it dimensionless

**Location:** `architrino.md:88–90`. **Classification:** demonstrated dimensional error in prose; the adjacent identities are correct. **Recommendation:** replace “dimensionless version” with “time-valued version,” preserving $\tilde F_{ij}=F_{ij}/c_f$ and its derivative identity.

The chapter explicitly defines $F_{ij}=r_{ij}-c_f(T_r-T_t)$ in length units. Thus $[F_{ij}]=\mathrm L$ and $[c_f]=\mathrm L\,\mathrm T^{-1}$, giving $[F_{ij}/c_f]=\mathrm T$. Its derivative $J^t_{ij}=\partial_{T_t}(F_{ij}/c_f)$ is dimensionless, and the stated $c_fJ^t_{ij}=D_{t,ij}$ is dimensionally and algebraically correct. Confusing the function with its derivative obscures the units of a root tolerance and its transversality floor.

If a dimensionless root function is actually needed, a declared duration scale $T_0>0$ gives $F_{ij}/(c_fT_0)$. That would be a different normalization and would require consistent derivative variables. It is unnecessary for the current explanation. Setting $c_f=1$ chooses units; it does not remove the distinction between length, duration, and a dimensionless derivative in the preceding dimensional argument.

Claim grade: `derived` by dimensional algebra from the chapter's definitions. Falsifier: a prior local nondimensionalization of all coordinates and times that makes the quoted claim true; the present paragraph instead explicitly starts in length units.

#### F1-4 — The entire singular root set is not the Whitney-fold stratum

**Location:** `architrino.md:94–102`, also the fold-only wording at line 346. **Classification:** demonstrated overgeneralization of a singularity classification. **Recommendation:** call $\Sigma_{ij}$ the singular causal-root set and restrict the fold account to its nondegenerate fold stratum.

The equations $F=0$ and $\partial_{T_t}F=0$ identify a singular root. An ordinary fold additionally requires a nonzero second emission-time derivative and a transverse unfolding by the chosen control. The [Master Equation](../../../content/markdown/aaa/dynamics/master-equation.md#caustic-transit-and-finite-impulse), lines 397–413, already distinguishes the fold stratum from cusps and higher degeneracies.

A short geometric counterexample lies within the chapter's smooth prescribed-history class. Work in normalized wake-speed units, $c_f=1$. Near emission time $s=0$, take a transmitter at $\mathbf X_j(s)=(s-s^3,0,0)$ and a stationary receiver at $\mathbf X_i(T_r)=(1,0,0)$, with $T_r=1+v$ near 1. Separation stays positive. The local root gap is

$$
F(1+v,s)=|1-s+s^3|-(1+v-s)=s^3-v
$$

At $(v,s)=(0,0)$, $F=F_s=F_{ss}=0$ and $F_{sss}=6$. This is a triple root rather than a double-root fold. For each small real $v$, the equation has one real root $s=\sqrt[3]{v}$; it does not create a pair of roots when $v$ changes sign. This example is a local prescribed geometry, not a claimed solution of the EOM or an accepted physical caustic transition. It nevertheless disproves the unconditional classification from the two displayed equations alone.

Claim grade: `derived` by direct substitution and differentiation. Falsifier: a missing hypothesis that rules out this higher degeneracy in the stated history domain. Retain the chapter's warning about a vanishing denominator; replace only the universal fold name and routing implication. Do not infer a finite-event continuation from this counterexample.

#### F1-5 — A neutral braid is described as the charged particle itself

**Location:** `architrino.md:172`. **Classification:** demonstrated conflict with the current braid definition. **Recommendation:** replace the parenthetical with “the candidate neutral scaffold used in charged-particle assemblies.”

The parenthetical calls the Noether braid the candidate structure for a stable charged particle. The [Noether Braid](../../../content/markdown/aaa/noether-braid/noether-braid.md), lines 3–5, defines the braid as neutral, with three positive and three negative constituents in the base case. The [quantum-number mapping](../../../content/markdown/aaa/assemblies/fermions/quantum-number-mapping.md), lines 13–18, separates the neutral scaffold from the proposed six-unit carrier. The current sentence compresses scaffold and charged assembly into one object at the point where their distinction is needed.

The broader six-unit carrier alternatives are explicitly present in the live mapping owner. This review does not reject internal, external, or non-axial carrier proposals merely because the axial model is the current concrete realization. Nor does it recommend deriving the factor of six from the integer arithmetic: the chapter correctly calls six an input. Claim grade: `derived` for the mismatch with the declared neutral inventory. Falsifier: an accepted owner definition identifying the bare Noether braid as the charged whole rather than its neutral scaffold.

#### F1-6 — Point support does not prove dynamically admissible coincidence

**Location:** `architrino.md:411`, read with lines 344–348. **Classification:** unsupported implication, partly limited by the paragraph's final sentence. **Recommendation:** state absence of primitive excluded volume as an ontological commitment and leave coincidence admissibility explicitly conditional.

A point has no geometric radius. That fact alone does not determine whether a model removes the coincidence diagonal from configuration space or whether its acceleration law permits a trajectory to reach and continue through that diagonal. As a purely mathematical countermodel, two point coordinates can be constrained to $\{(\mathbf X_1,\mathbf X_2):\mathbf X_1\ne\mathbf X_2\}$ without giving either point a radius. No standard-physics interaction law is being imported by that example.

The current paragraph says that coincident occupancy follows because the objects are points and that nothing forbids it. Its last sentence correctly routes the dynamics elsewhere, so this is not an assertion that the chapter has solved continuation. The [Master Equation](../../../content/markdown/aaa/dynamics/master-equation.md#auxiliary-dual-mollified-regulator-for-proof-and-computation), lines 724 and 797–803, is stricter: coordinate coincidence is a boundary, regularized, or quarantined condition; the auxiliary kernel's value there does not supply a physical continuation.

The smallest repair preserves the intended ontology: there is no postulated hard core or primitive excluded volume, so equal coordinates are not excluded by size alone; whether a lawful history reaches or continues through coincidence is a separate open dynamics question. Claim grade: `derived` for the logical distinction; `inferred` for the recommended clarification. Falsifier: a current coincidence theorem establishing the stronger dynamical claim on the full stated domain.

#### F1-7 — The hub recommends a reading route different from the textbook

**Location:** `ontology.md:40`. **Classification:** measured navigation contradiction; low theoretical severity. **Recommendation:** use the current textbook sequence as the default and label a dependency-oriented alternative explicitly if it remains useful.

The prose sends readers through the substrate owners before Architrino, then Emergence, then Detecting, Constructing, and Absolute Time Defense. The live TOC and authored scene instead put Architrino second, Defense before Detecting, and Emergence last. Neither route silently replaces the other in this campaign. The smallest repair is one paragraph identifying the default route and distinguishing any optional conceptual route. Claim grade: `measured` by comparing the complete filesystem inventory, TOC traversal, and scene child/object order. Falsifier: a changed live TOC or a local statement that explicitly identifies the prose route as optional.

#### F1-8 — The ontology symbol map needs names for its load-bearing quantities

**Location:** `ontology.md:70–101`. **Classification:** missing explanation under the chapter audience rule. **Recommendation:** add concise names in the existing table and the paragraph following the diagram, without adding a separate glossary or repeating downstream derivations.

The table lists $\Lambda_{\mathrm{cm}}$, $\rho_{\mathrm{NS}}$, $\Sigma_{\mathrm{sea}}$, $\mathbf u_{\mathrm{sea}}$, $A$, $B_{ij}$, and $\Theta_A^{(O,W)}$ with owner links but without local names sufficient to read the diagram. A reader arriving here first cannot tell which quantity is a density, stress, flow, clock response, ruler response, or observer record. The later residual list similarly names technical residual families without specifying the maps and compared quantities. The fiber explanation is valuable; one small worked pair of fine states and their retained coarse value would make its purpose concrete.

Claim grade: `inferred` editorial assessment against edition 1.1, not a mathematical error. Falsifier: a first-time reader can identify what each load-bearing symbol denotes and evaluate the stated projection criterion using the local explanation alone. The repair should clarify F1-2's domain before expanding the table, so better exposition does not lend unsupported authority to the factorization.

### A defensible deduction for discussion: exact polarity-odd external response

**Trigger:** `architrino.md:186–240` correctly defines the even/odd decomposition but leaves vanishing of the shared term conditional on an unspecified regime. **Candidate claim:** on the present canonical law, a fixed external transmitter record produces exactly polarity-odd direct acceleration on matched hypothetical receivers. This is stronger than a merely possible regime, but substantially narrower than an electromagnetic recovery theorem.

Fix the reception event, the external transmitter histories, the complete admitted simple-root sets, and polarity magnitudes $|q_r|=\epsilon$. Let $\mathcal J$ contain only transmitters distinct from the receiver. Because the root condition and $W^{\mathrm{acc}}$ do not depend on receiver polarity, define

$$
\mathbf B_{\mathcal J}
=\kappa\sum_{j\in\mathcal J}q_j
\sum_{T_t\in\mathcal C_{r\leftarrow j}(T_r)}
\frac{c_f}{|D_{t,j}|r_j^2}\hat{\mathbf r}_j
$$

This is a vector coefficient of the prescribed external history, not a primitive magnetic field. The sign factor satisfies $\operatorname{sign}(q_rq_j)|q_rq_j|=q_rq_j$, so

$$
\mathbf A_+^{\mathcal J}=\epsilon\mathbf B_{\mathcal J},\qquad
\mathbf A_-^{\mathcal J}=-\epsilon\mathbf B_{\mathcal J},\qquad
\mathbf A_{\mathrm{even}}^{\mathcal J}=\mathbf0
$$

For an elementary check in units $c_f=1$, take a stationary external transmitter at the origin, receiver at $(2,0,0)$, reception time 3, $q_j=1$, $\epsilon=1$, and $\kappa=1$. The unique emission root is 1; $r=2$, $D_t=1$, and $W^{\mathrm{acc}}=1$. The matched accelerations are $(1/4,0,0)$ and $(-1/4,0,0)$. Changing only receiver velocity changes $D_r/D_t$ but leaves those instantaneous accelerations unchanged.

A physical receiver polarity reversal also reverses its own transmitter polarity, so a self-hit carries $q_r^2$ and is even under that reversal at a fixed prescribed history. The hypothetical fixed-external-source result must therefore not be extended to total self-plus-partner response, a recomputed coupled solution, or a dressed assembly without repeating the comparison under those changed assumptions. This distinction explains why the scope of “source” matters.

Claim grade: `derived` from the unchanged canonical per-hit law for a finite complete root set, or a convergent sum under a fixed summation prescription. Falsifier: a nonzero even direct external contribution for the same reception event, fixed source histories, equal receiver polarity magnitudes, and unchanged canonical kernel. A numerical residual could instead expose omitted roots, mismatched histories, or an implementation defect; it would require diagnosis. Promotion into the chapter remains a proposal. No Maxwell equation, magnetic mechanism, mass map, or observer electric-field normalization follows from this identity.

### Complete-reading assessment and retained strengths

Ontology was read in full, lines 1–324. Its postulate ownership and abridgment boundary, separation of container from medium, complete-state versus geometric-slice distinction, and warning that shared provenance cannot by itself violate Bell factorization are sound at their stated scope. The two-identical-center topology can be reconstructed directly: separate the center of the pair, positive separation magnitude, and an unoriented direction. This gives $\mathbb R^3\times(0,\infty)\times\mathbb{RP}^2$, whose loop classes are those of $\mathbb{RP}^2$, namely $\mathbb Z_2$. This conditional configuration-space result does not derive a fermionic sign, exclude coincidence dynamically, or supply a retained assembly. The chapter correctly keeps those obligations separate. Its matter-entry criterion is explicitly a program criterion; no extra particle ontology is inferred from it.

Architrino was read in full, lines 1–493. The opening supplies a useful picture before symbols and limits the pond analogy. The no-mass/acceleration distinction, sign bookkeeping, fixed inventory as a postulate, conditional well-posedness, uniform emission measure as an input, and source-history dependence of the wake are coherent. The even/odd identities are algebraically correct. The dimensional coupling is correct: multiplying $\mathrm L^3\mathrm T^{-2}\mathrm Q^{-2}$ by $\mathrm Q^2/r^2$ gives acceleration. Differentiating the unchanged root gap gives $\partial_{T_t}F=D_t$ and $\partial_{T_r}F=-D_r$, hence $dT_t/dT_r=D_r/D_t$ on a simple branch. Neither receiver playback nor polarity sign belongs inside the unsigned transmitter weight. These checks identify no sign or coefficient correction to the displayed acceleration law.

The wake-history integral is explicitly schematic, so its missing kernel formula is not a defect at this level. The text's absolute-continuity hypothesis supports an almost-everywhere velocity; piecewise continuity remains an additional regular-regime condition. The rest diagnostic is correct with tagged complete history: zero center-set diameter means a constant position on the diagnostic interval. It does not prove observer access. Fixed identities yield a conserved signed count for a finite closed inventory; infinite populations and local subsystems require convergence or boundary accounting already routed to the relevant owners.

The current discussion identifies no justification for blanket equation rewriting, invented criticisms, a new solver test campaign, or wholesale style conversion. Optional removal of conversational phrases would be a lower-priority editorial choice; it is not one of the technical findings above.

### Source and verification limits

External source checking was limited to claims actually used by the first batch. Hensen and collaborators' [author abstract](https://arxiv.org/abs/1508.05949) supports the stated locality/detection-loophole result; the raw experiment was not reanalyzed. Laidlaw and DeWitt's [publisher abstract](https://journals.aps.org/prd/abstract/10.1103/PhysRevD.3.1375), *Feynman Functional Integrals for Systems of Indistinguishable Particles* (1971), supports the stated connection between multiply connected configurations and scalar-representation propagators; it is not a derivation of assembly exchange statistics. The configuration-space reduction above is the separate mathematical argument checked here.

The relevant Bancal source passages were inspected for F1-1. That is a premise/scope check, not an independent reproduction of the paper's numerical quantum witness. Dirac's 1938 bibliographic identity was located, but the linked publisher content and attempted primary-paper mirror were unavailable to this browsing instrument. The comparison warning in `architrino.md:340` is therefore not marked source-verified in this pass. Source unavailability is not evidence that the statement is false; no replacement citation is requested merely because access failed.

The author of this review reconstructed the short algebraic and geometric arguments above. Their explicit equations and counterexamples are the references for those local conclusions; another model's agreement and prior editorial review were not used as mathematical validation. No EOM evolution, retained-branch certificate, global regularity theorem, physical coincidence continuation, or Bell recovery was produced.

Final scoped checks on 2026-09-05 matched all nine inventory SHA-256 values to the recorded baseline. The vendored KaTeX parser accepted all 100 dollar-delimited mathematical expressions in Ontology (2 display expressions) and all 117 in Architrino (17 display expressions), with `throwOnError: true`. This checks syntax, not visual layout or mathematical truth; no rendered-page visual inspection is claimed. All 16 relative file-link occurrences in this new review section point to existing files. `node scripts/validate-equation-mapping-links.mjs` passed for its 23 registered equation links; that instrument does not certify every unregistered viewer anchor. `git diff --check` passed.

`node scripts/validate-content.mjs --check --strict` returned 0 errors and 1 warning, with a failing strict exit status because `content/scenes/scenes_index.json` has generated index drift. The established regeneration command is `node scripts/validate-content.mjs --write`; it was not run. This drift remains with the regeneration/PR owner and does not establish a source defect in either reviewed chapter. Only this review record and its `priorities.md` index were edited by this task.

### Initial batch 1 discussion state — superseded by acceptance below

F1-1 through F1-8 and the proposed polarity deduction await operator discussion. No correction is accepted or applied. Discuss the Bell sufficiency issue and observer-factorization scope first because they govern later conclusions. The units, singular-set naming, neutral-scaffold wording, and navigation correction can be accepted separately. If an upstream issue is deferred, record its affected downstream claims here before reviewing those conclusions. Batch 2 can still examine the substrate time and space commitments while keeping the disputed observer maps and Bell route conditional.

### Batch 1 integration — accepted and verified 2026-09-05

The operator instructed: “implement all of your recommendations. then proceed to batch 2”. This accepts F1-1 through F1-8 and incorporation of the exact fixed-external-history polarity result. The live integrator-reviewer procedure was read and applied. The original findings above remain attributable to their original hashes; their previously pending state is superseded by this dated acceptance and integration record. No optional wholesale tone conversion was recommended or performed.

| Recommendation | Disposition and implemented correction |
| --- | --- |
| F1-1 | Accepted. Ontology treats degradation as a candidate prediction and requires a consistent multipartite probability law and premise audit; it no longer offers degradation as sufficient closure. |
| F1-2 | Accepted. The displayed hierarchy is conditional on the selected record family and retained data; the exact factorization criterion, its proof, and an apparatus-bit counterexample are explained. |
| F1-3 | Accepted. The root gap divided by speed is time-valued; its emission-time derivative is dimensionless. Equations are unchanged. |
| F1-4 | Accepted. Architrino distinguishes singular roots from nondegenerate folds in both affected passages and routes higher degeneracies separately. |
| F1-5 | Accepted. The Noether braid is the neutral scaffold used in charged assemblies. Carrier alternatives and the unresolved factor of six are preserved. |
| F1-6 | Accepted. No primitive excluded volume is distinguished from lawful coincidence reachability and continuation. |
| F1-7 | Accepted. Ontology's default prose route now matches the textbook and authored scene order. |
| F1-8 | Accepted. The existing symbol table and residual paragraph name the quantities needed locally; no new glossary was created. |
| Polarity deduction | Accepted. The canonical sign-factor proof, normalized static-source example, complete-root/convergence assumptions, and self-hit/coupled-evolution limitations are incorporated. |

Both complete resulting chapters were reread after integration: Ontology, 326 source lines, and Architrino, 497 source lines. This was author self-review. No independent reviewer or new EOM computation is claimed. The unchanged master-equation kernel provides the mathematical premise of the polarity calculation; the algebra and elementary prescribed-history case check the stated consequence, not the physical completeness of that kernel. The Bell and observer-map wording now identifies their remaining scientific obligations rather than declaring them solved. Deferred Bell work remains deferred.

Post-integration SHA-256 values are `098179476ca3d8497fc55aea07477e7abb5c13d19546c42aca2c6e2e15ddd4ad` for Ontology and `f91c2123169e3f1efd46a905769838f90a4da67cd268dc64d972a000d40f322d` for Architrino. Compared with the baseline, all 19 display-equation blocks are byte-identical and every prior Markdown link target is retained. The added mathematics is inline; existing equation-viewer links and their placement are unchanged. KaTeX accepted 111 expressions in Ontology and 130 in Architrino. All 145 local file-link occurrences across those two files point to existing files. These counts concern syntax and target existence, not rendered-page layout or completeness of mathematical validation.

`node scripts/validate-equation-mapping-links.mjs` passed its 23 registered-link checks. `git diff --check` passed. Strict content validation again returned zero errors and one generated-index drift warning for `content/scenes/scenes_index.json`, with a nonzero strict exit. The regeneration command remains `node scripts/validate-content.mjs --write`, owned by the established regeneration/PR process and not run here. No generated artifact, application source, controlled style guide, or historical conversion row was edited.

### Batch 2 review — Absolute Time and Euclidean Void

The live corpus-reviewer procedure resumes for this batch, with the operator's small-batch instruction. Both target files were checked against their baseline hashes immediately before reading and again after the full review. Absolute Time was read completely, lines 1–418, at SHA-256 `5de8b7c9d4fb4e9f4333b625232a6b3623a77bc7e9dc4496b1aa7ee5c27b93c3`; Euclidean Void was read completely, lines 1–590, at SHA-256 `8271a58af882afa153a92d29789be3fa36f787f161c7da5f7e398d2a240a3acb`. Neither target was edited. The accepted batch-1 corrections were the upstream reading context. All batch-2 findings and deductions below await discussion and implementation authority.

#### F2-1 — A root-derivative floor does not certify the complete root count

**Current disposition:** accepted, corrected, and verified on 2026-09-05. The original review and discussion retain their historical scope; the integration receipt below supersedes their pending-acceptance statements.

**Location:** `absolute-time.md:343–355`; the declared scope is at lines 339–341. **Classification:** demonstrated overstatement of a local regularity condition; bounded explanatory correction. Downstream consequences would arise if a calculation used the overstatement as its complete certificate, but no such implementation failure has been demonstrated. **Smallest repair:** distinguish crossing a chosen positive floor from reaching a zero derivative, and require endpoint control and a complete retained root domain before claiming count stability.

The derivative floor gives a quantitative implicit-function condition at admitted roots. It does not exclude roots crossing the endpoints of a history window. The unchanged [Master Equation](../../../content/markdown/aaa/dynamics/master-equation.md#delay-map-theorem-pack-formalized), lines 989–999, explicitly requires both boundary regularity (R1) and simple roots (R2). The time chapter's statement that the floor certifies root number drops the former requirement.

An exact counterexample uses normalized wake-speed units, $c_f=1$. Take a stationary transmitter at the origin and a stationary receiver at $(2,0,0)$. On the retained emission interval $s\in[0,1]$, at reception time $T$ near 3, the root gap is $F(T,s)=2-T+s$. The unique unconstrained root is $s=T-2$, with $F_s=1$ throughout. At $T=5/2$ the retained root is $s=1/2$; at $T=7/2$ it is outside the interval. The retained count changes from one to zero through $s=1$, without a vanishing derivative or a fold. This is a prescribed-history root example, not an EOM trajectory or a claim of physical loss of the older wake. The discarded root is exactly why a memory-window statement needs boundary accounting.

There is a second distinction: failing a declared floor $|F_s|\ge\kappa_{\mathrm{hit}}>0$ need not mean $F_s=0$. A branch can cross a conservative certification threshold while its root remains simple. Thus a failed certificate is not itself proof of a bifurcation. At an actual singular root, the generic-fold discussion is appropriate only with its stated nondegeneracy and unfolding conditions. Higher degeneracies remain separate.

A sufficient finite-window count argument is short. On a compact retained interval, assume continuous variation of a sufficiently smooth root function, no boundary zeros, and nonzero emission-time derivative at every zero throughout the connected parameter range. Each root continues locally by the implicit-function theorem. Compactness and boundary regularity prevent loss through an untracked boundary or escape to infinity; an accumulation of roots would violate simplicity. The resulting finite count is locally constant and therefore constant on that connected range. This is a local mathematical reference for the proposed repair, not a replacement global continuation theorem.

Claim grade: `derived` for the counterexample and finite-window argument; `inferred` for the chapter repair. Falsifier: a local hypothesis already guaranteeing root completeness and boundary separation in every use of the quoted count claim. Merely naming an endpoint convention is not such a bound. Later root, frame, and retained-branch reviews must keep these obligations separate. Ontology's compact floor table also warrants checking when propagating an accepted clarification; its row should not turn loss of a numerical certificate into an automatic physical fold verdict.

##### Significance assessment — bounded correction, not a new dynamics obstruction

The operator asked whether this finding reveals a problem and why it matters. It reveals an overstatement in the explanatory chapter, not a failure of delayed causality, a demonstrated EOM solver defect, or a newly discovered physical singularity. In the stationary counterexample, the full-history root remains unique and simple; only its membership in an imposed window changes. The unchanged master-equation owner already supplies the missing boundary condition. The original classification as having high downstream consequence was too strong without a demonstrated consumer relying on the overstatement; the current classification above corrects that assessment.

The practical value of the repair is to prevent three different outcomes from receiving one diagnosis: a root crosses the selected history-window boundary; a root remains simple but falls below a chosen positive numerical margin; or the derivative actually vanishes at a singular root. A computation that confuses them could omit a needed history contribution or misreport a numerical stopping condition as a physical event. Those are conditional risks, not observed failures in this review. The smallest sufficient response is to make Absolute Time agree with the existing master-equation assumptions. No new theory program, solver test campaign, or independent scientific blocker is created by F2-1. Later review can use the stronger live owner while the explanatory correction awaits acceptance. F2-2's separate constitutive-map obligation is unaffected.

##### Discussion clarification — emission-time crossing does not use future support

The operator asked whether the crossing argument extends an isochron beyond reception time. It does not. For each candidate emission $s<T$, the root function evaluates the sphere's radius at the fixed reception time $T$, using only its age $T-s$. The derivative $\partial_sF$ compares different past emissions at that same reception event; it does not advance one emitted sphere beyond reception. The earlier explanation did not separate this comparison from changing the reception event clearly enough.

For the same stationary geometry in units $c_f=1$, fix $T=3$ and receiver distance 2. The signed gap is $F(3,s)=2-(3-s)=s-1$:

| Past emission $s$ | Sphere radius at reception time 3 | Signed gap | Direct contribution at this reception? |
| --- | --- | --- | --- |
| $1/2$ | $5/2$ | $-1/2$ | No; the receiver is inside this sphere. |
| $1$ | $2$ | $0$ | Yes; the receiver lies on this sphere. |
| $3/2$ | $3/2$ | $1/2$ | No; the receiver is outside this sphere. |

All three emission times precede reception. The gap crosses zero as the emission label varies; only the middle sphere contributes directly at this event. No future reception of the smaller sphere is needed for that calculation. Separately, the interval $[0,1]$ in the count counterexample is an imposed retained-emission window, not the physical causal domain $s<T$ and not the interval from a selected emission to reception. Following $s(T)=T-2$ across that window's endpoint compares different reception events; at every one, the selected emission remains two time units in the past. The example shows a change in a restricted count, not disappearance of the full-history root or future-supported interaction. This clarification changes no finding disposition and authorizes no chapter edit.

##### Accepted F2-1 integration — 2026-09-05

The operator instructed “do 1” after the recommendation to apply the bounded wording correction, then requested any remaining F2-1 explanation or otherwise F2-2. The live integrator-reviewer procedure was read before editing. The pre-edit bytes were checked and retained locally: Absolute Time remained at its original batch-2 hash above; Ontology was at the accepted batch-1 hash `098179476ca3d8497fc55aea07477e7abb5c13d19546c42aca2c6e2e15ddd4ad`. Concurrent work was preserved.

Absolute Time now explains that the derivative compares past emission candidates at fixed reception, distinguishes a failed positive margin from a vanishing derivative, requires complete retained-root and endpoint accounting for count stability, and states the additional conditions for ordinary folds and cusps. Ontology's causal-root floor row now uses the same margin-versus-singularity distinction. The master equation, all other batch-2 findings, and Euclidean Void remain unchanged. No further F2-1 research obligation remains; later reviews inherit the master equation's existing boundary and simplicity conditions.

Both resulting documents were reread completely and compared with their immediate pre-edit baselines. The 23 display blocks are byte-identical, all previous links are retained, the 133 local file-link occurrences have existing targets, and the added master-equation section link was checked against its heading. Vendored KaTeX accepted all 245 mathematical expressions (111 in Ontology and 134 in Absolute Time). These are author self-review and structural checks. The mathematical reference is the unchanged master-equation R1/R2 conditions together with the explicit finite-window argument and closed-form counterexample above; no independent solver or second mathematical reviewer is claimed.

The strict content check reported zero errors and one existing generated-index drift warning at `content/scenes/scenes_index.json`, so the strict check is not clean. Regeneration remains with its established owner; the corresponding command is `node scripts/validate-content.mjs --write`, which was not run. Final source hashes: Absolute Time `e3d60d84d56dd68aa933d3b1256fa66769e766c3243dfa006a12fecb16a5237b`; Ontology `48bf11bec4defceb1a317443928e43ecebfae28340aef02ac2f8c0754e47c43d`. Historical batch-1 and initial batch-2 receipts remain attributable to their original versions.

#### F2-2 — The trace response is not yet an identified cosmological scale or laboratory residual

**Current disposition:** the bounded explanatory correction was accepted, implemented, and verified on 2026-09-05. Its integration receipt below supersedes the earlier pending-acceptance statements. Deriving the physical response and its cosmological and apparatus identifications remains an open obligation in the existing theory owners.

**Location:** `euclidean-void.md:509–521`, especially lines 511 and 521. **Classification:** unsupported identification across effective descriptions and measurement channels; missing constitutive definition. **Smallest repair:** define the tensor's operational meaning and reference chart, keep its trace as a declared scalar summary, and make any cosmological or laboratory identification conditional on a derived response map.

For a covariant tensor $a_{\mathrm{eff},ij}$ and a reference Euclidean metric on the same space, the displayed trace decomposition is algebraically correct: $a_0=\tfrac13h^{ij}a_{\mathrm{eff},ij}$ and $a_{\langle ij\rangle}=a_{\mathrm{eff},ij}-a_0h_{ij}$ give $h^{ij}a_{\langle ij\rangle}=0$. Averaging $a_{\mathrm{eff},ij}n^in^j$ over unit directions gives $a_0$, since the directional average of $n^in^j$ is $h^{ij}/3$. This does not decide whether the tensor describes linear ruler stretch, squared length, spatial compliance, or another response.

That distinction changes the purported scale. In the isotropic case, a stretch tensor $a_{\mathrm{eff},ij}=a h_{ij}$ has trace mean $a$, while a spatial metric $a_{\mathrm{eff},ij}=a^2h_{ij}$ has trace mean $a^2$. Both are reasonable response encodings; the chapter has not selected one. The live [Cosmology Ontology](../../../content/markdown/aaa/cosmology/cosmology-ontology.md#effective-frw-variable-ledger) places $a_{\mathrm{eff}}^2$ in the effective metric, and does not define this response tensor or identify its trace with that scale. If effective coordinates are used, the reference metric must be carried into the same chart before contraction. This is a domain requirement, not a request to replace the fixed substrate metric.

The assertion that the same quantity appears in Hughes–Drever residuals is stronger still. Clock-comparison experiments constrain apparatus frequency or energy differences with orientation; a tensor controlling some cosmological or ruler response reaches those records only through a constitutive and apparatus map. Schematically, at linear order a dimensionless measured response could be $\delta\nu/\nu=C^{ij}a_{\langle ij\rangle}+\cdots$, with response coefficients $C^{ij}$ carrying the required normalization and channel dependence. That illustrative formula is not an adopted substrate or experimental law. It shows why even a small measured signal need not bound every component of the underlying tensor when the map has a null space. The [Lorentz Kinematics](../../../content/markdown/aaa/spacetime/lorentz-kinematics.md) owner already separates matter-clock isotropy from optical, boost, and propagation channels.

Homogeneity and isotropy are correctly named earlier in the paragraph as necessary conditions for a global scalar description. This finding does not reject that qualification or the exact trace identity. It rejects assigning physical meaning and experimental sensitivity without the intermediate definitions.

Claim grade: `derived` for the trace identity and normalization examples; `inferred` for the missing response identification. Falsifier: an explicit current owner defining this tensor, its chart and units, its scale normalization, and the apparatus map that makes the claimed residual identification valid. Until then, later effective-response conclusions must not use the trace as a measured expansion factor or apply a clock bound directly to it.

##### Discussion explanation — define what the response measures

F2-2 concerns a missing physical identification, rather than an incorrect trace calculation. The proposed direction-dependent response is useful, but averaging its entries cannot determine their physical meaning. In normalized units with $c_f=1$, suppose effective lengths double in all three directions relative to a fixed reference. A linear stretch records diagonal entries $(2,2,2)$ and has mean 2; a squared-length metric records $(4,4,4)$ and has mean 4. Both encode the same stipulated effective length change. The unchanged void need not expand in either description. The chapter must specify which response it means before naming its trace a cosmological scale factor. This is an algebraic illustration, not a dynamical cosmology.

There is a second missing step when the chapter identifies the directional remainder with clock-comparison residuals. A medium property reaches a measured clock frequency through the assembly and apparatus response. That relation determines which components and magnitudes an instrument can constrain; sharing an underlying sea does not make ruler response and clock readout identical quantities. The bounded repair is to define the retained response and its reference, retain the valid trace decomposition, and state cosmological and laboratory identifications as recovery obligations until their maps are derived. The finding does not establish that the proposed recovery is impossible. F2-2 remains awaiting operator decision; this discussion does not authorize its implementation.

##### Accepted F2-2 integration — 2026-09-05

The operator instructed “implement f2-2 and explain F2-3.” The live integrator-reviewer procedure and relevant metric, cosmology, and Lorentz-response passages were checked. Euclidean Void was still at the original batch-2 SHA-256 `8271a58af882afa153a92d29789be3fa36f787f161c7da5f7e398d2a240a3acb` immediately before editing, with no concurrent target changes. A local byte baseline was retained before the targeted correction.

The corrected passage defines the tensor conditionally as the symmetric coefficients of a specified dimensionless directional response, expressed with its Euclidean reference metric in the same chart. It preserves the exact trace decomposition and explains the uniform directional average, the tolerance for the discarded quadratic dependence, and the need to account for directional structure outside that representation. The isotropic stretch-versus-squared-length example explains the normalization ambiguity. Cosmological scale and laboratory residuals now require their own derived response and apparatus maps. No particular sea constitutive law, physical ruler model, or clock sensitivity was invented. The bounded prose correction is complete; this does not close the existing physical recovery program.

The entire resulting chapter, lines 1–596, was reread and its edit compared with the pre-edit baseline. All 37 display equations are byte-identical, all prior links are retained, all 53 local file-link occurrences have existing targets, and the new cosmology section anchor resolves to its live heading. Vendored KaTeX accepted all 130 mathematical expressions. `git diff --check` passed. The strict content check returned zero errors and one pre-existing warning for `content/scenes/scenes_index.json`, so it remains non-clean; regeneration belongs to its existing owner via `node scripts/validate-content.mjs --write`, which was not run. The post-edit SHA-256 is `57aa722490223d3bb823556080766d69dfe6b8dfa453764991521598ab2e81e5`.

The mathematical check is author derivation: reflection symmetry makes the off-diagonal directional averages vanish in an orthonormal frame; rotational symmetry makes the three diagonal averages equal; their sum is the unit-vector squared norm, 1. Each is therefore one third, yielding the displayed contraction in any common chart. The unchanged Cosmology Ontology and Emergent Metric passages independently establish the current ownership and open status of physical recovery, not the correctness of a newly derived constitutive law. No second mathematical reviewer, empirical reanalysis, or independent computational validation is claimed. Other batch-2 recommendations remain unimplemented. In Euclidean Void, F2-7's original line 543 is now line 549; its source content is unchanged.

#### F2-3 — Direct wake reception is narrower than causal influence through a chain

**Current disposition:** accepted, implemented, and verified on 2026-09-05. The integration receipt below supersedes the historical pending-acceptance statements in the original discussion.

**Location:** `absolute-time.md:179`, with the direct root definition at lines 283–293. **Classification:** conceptual overstatement of the direct-hit criterion. **Smallest repair:** insert “directly through that emitted wake” in the support criterion and distinguish later influence through altered receiver histories and subsequent emissions.

Membership in the sphere emitted at A is required for a direct contribution from that emission. The full delayed law also permits a reception to alter a worldline whose later emissions affect another receiver. The geometric relation “lies on this emitted sphere” is not transitive and therefore cannot alone define that complete causal dependence.

For a geometric illustration in units $c_f=1$, let A be $(T,\mathbf X)=(0,\mathbf0)$, let a relay receive at $(1,(1,0,0))$, and let a later relay emission occur at $(2,(1,0,0))$, reaching B at $(3,\mathbf0)$. Both wake legs have distance and duration 1. B is not on A's original radius-3 sphere. A physical dependence between the relay's reception and later emission requires an actual response of its intervening history; this point is not supplied by the illustration, and no stationary relay trajectory is claimed to solve the perturbed EOM. The construction demonstrates the geometric failure of transitivity, while the law's history dependence supplies the reason chains must be considered.

A theorem about signal reach must account for those intermediate histories. It is not obtained by replacing the equality with an inequality without further assumptions: primitive worldlines are not universally postulated to obey a sub-$c_f$ speed limit. No faster-than-$c_f$ signalling capability or operational relay is established here. Claim grade: `derived` for the support geometry; `inferred` for the causal-language repair. Falsifier: an explicitly direct-only meaning of “influence” in the quoted paragraph, or a dynamical theorem eliminating all indirect dependence in its stated domain.

##### Discussion explanation — direct contribution and inherited influence

The sentence at Absolute Time line 179 requires B to lie on the wake emitted at A for A to influence B at all. That requirement correctly selects one direct contribution from A's emission. It omits a different mechanism already available in the history-dependent law: a reception changes an intermediate architrino's acceleration, its subsequent trajectory changes, and later wakes from that altered trajectory contribute at B. The intermediate architrino emits continuously; it does not have to wait for reception to switch emission on, and the original wake is not redirected. What changes is the source history of later emissions.

The conditional chain is therefore: emission event A; reception by an intermediate architrino C; an altered later source history of C; reception event B of a later C emission. At B, the directly contributing wake is C's later wake. A's original emitted sphere need not pass through B at that time. The unchanged master-equation acceleration sum at lines 445–455 and its history-dependent root and transmitter weight supply the mechanism's dependencies. A particular nonzero transmitted effect still requires an actual solution or response calculation; geometric reach alone does not prove that a selected relay preserves a measurable perturbation. The numerical geometry above illustrates that distinction without claiming a solved relay trajectory.

This is a bounded explanatory correction. The causal-root equality remains the direct-hit rule. The proposed repair is to qualify the sentence with “directly through that emitted wake” and then explain that indirect influence can pass through changed histories and later wake receptions. It prevents a reader from treating the absence of an original-source root at B as proof of no earlier causal dependence. It establishes neither an EOM solver defect nor a signalling-speed theorem. F2-3 remains awaiting operator decision; the request to explain it authorizes this discussion capture but not its corpus implementation.

##### Accepted F2-3 integration — 2026-09-05

The operator selected action 1: apply the bounded F2-3 clarification and then discuss F2-4. Under the live integrator-reviewer procedure, Absolute Time was checked at SHA-256 `e3d60d84d56dd68aa933d3b1256fa66769e766c3243dfa006a12fecb16a5237b`, matching the verified F2-1 result, and a local pre-edit byte baseline was retained. Only the direct-versus-indirect causal explanation was changed. The direct-hit condition now names its particular emission, and an added paragraph explains acceleration, changed intermediate trajectories, continuous later emissions, and the need for an actual dynamical response along a proposed chain. No wake equation, signalling-speed theorem, or other batch finding was changed.

The complete resulting chapter, lines 1–420, was reread and compared with that immediate baseline. All 21 display blocks and all prior links are preserved; all 33 local file-link occurrences have existing targets; vendored KaTeX accepted all 134 mathematical expressions; `git diff --check` passed. The strict content check again returned zero errors and one existing generated-index warning at `content/scenes/scenes_index.json`. Its regeneration remains with the established owner via `node scripts/validate-content.mjs --write`; no regeneration was performed. Final SHA-256: `889069eebd665bb2ad1013180d9529dad84cfce15039872d58ca7f3b8e803a0c`.

This is author self-review against the unchanged master-equation history dependence and the explicitly limited geometry already recorded above. It is not an independently validated dynamical relay or a solver result. The bounded F2-3 correction is complete. F2-4's original line 399 is now line 401, with its wording unchanged; all earlier findings retain their original reviewed hashes and line references.

#### F2-4 — The time chapter denies structure it has already supplied

**Current disposition:** accepted, implemented, and verified on 2026-09-05. The integration receipt below supersedes historical pending-acceptance statements. All three Absolute Time findings in batch 2 now have verified corrections.

**Location:** `absolute-time.md:399`, compared with lines 33, 79–87, and 147–163. **Classification:** internal mathematical/explanatory inconsistency; bounded repair. **Smallest repair:** say there is no independent dynamical temporal metric or connection and no temporal acceleration law to solve.

The chapter fixes an affine duration scale and the exact nonvanishing form $dT$, and uses the distance $|T_2-T_1|$. On the one-dimensional time factor these data define the positive quadratic form $dT\otimes dT$ and the flat affine connection with $\nabla_{\partial_T}\partial_T=0$. Its affinely parametrized geodesics satisfy $d^2T/ds^2=0$, a kinematic identity rather than a new law for physical clocks. Consequently, “no metric or connection is declared on the bare line” does not describe the structured time factor used by the rest of the chapter. It would describe a bare manifold before the duration structure was chosen.

This observation adds no relativistic substrate metric and no dynamical time field. It also does not determine the full four-dimensional product connection: [Absolute Timespace](../../../content/markdown/aaa/foundations/absolute-timespace.md#the-connection-is-additional-substrate-data) correctly supplies that as additional data. The proposed repair preserves the claim that time does not dynamically respond to matter while making its mathematical reason accurate.

Claim grade: `derived` from the specified affine line and clock form. Falsifier: the passage explicitly confines itself to the unstructured manifold and then restores the declared duration structure before describing the actual model. The current paragraph moves directly from the bare-line claim to the physical substrate.

##### Discussion explanation — fixed structure does not require dynamics

The time chapter supplies more than an ordering of instants: it fixes durations by $|T_2-T_1|$. That is already a mathematical distance rule, or metric, on the time line. A uniformly marked ruler provides an analogy for the distinction: the spacing of its marks is structure even when that spacing never changes. The analogy concerns a fixed interval scale, not a physical clock reading absolute time.

The later paragraph at current line 401 explains the absence of temporal dynamics by saying no metric or connection is declared. Its intended physical conclusion is sound within the postulate: time has no independent field that responds to contents. The stated mathematical reason omits the fixed duration structure already in use. On the one-dimensional time factor, the exact clock form supplies the squared-duration form and a compatible flat affine connection. Requiring that connection to preserve $dT$ sets its sole coefficient in the $T$ coordinate to zero; this simply encodes the chosen uniform parameter. It is not an additional evolution equation or a clock-dilation mechanism. The separate full product connection in Absolute Timespace remains additional substrate data, as its live section explicitly states.

The recommended correction is to describe a fixed temporal duration structure with no independent dynamical temporal metric or connection, preserving the distinction between a mathematical comparison rule and a responding physical field. This resolves an internal explanatory mismatch without changing the postulate or recovering any new observer effect. F2-4 remains awaiting operator discussion and acceptance; it was not implemented with F2-3.

##### Accepted F2-4 integration — 2026-09-05

The operator selected action 1: apply the bounded F2-4 correction and then discuss F2-5. The live integrator-reviewer procedure was followed. Absolute Time was checked against the verified F2-3 SHA-256 `889069eebd665bb2ad1013180d9529dad84cfce15039872d58ca7f3b8e803a0c` and backed up immediately before editing. The section now acknowledges the fixed duration rule, its squared-duration form, and the compatible flat connection on the time factor. Its geodesic equation is explained as a constant-rate parametrization, not an independent evolution law for time. A link preserves the separate ownership of the additional full product connection. The acceleration account and Postulate 1 are unchanged. Euclidean Void remains at its verified F2-2 hash; F2-5 was not implemented.

The entire resulting Absolute Time chapter, lines 1–422, was reread and compared with its immediate pre-edit baseline. All 21 existing display equations and all prior links are preserved. Vendored KaTeX accepted all 140 mathematical expressions, and all 34 local file-link occurrences have existing targets; the new Absolute Timespace anchor was checked against its live heading. `git diff --check` passed. The strict content check reported zero errors and the same existing warning at `content/scenes/scenes_index.json`; it remains non-clean. Regeneration belongs to its established owner via `node scripts/validate-content.mjs --write`, which was not run. Final SHA-256: `fa03318d71b159e57c8bb2857540e8f49458859ced96da1d8b50b43d26a7ba42`.

The mathematical check is the author derivation recorded above: on the one-dimensional time factor, preserving the clock form forces the sole connection coefficient to vanish in its affine coordinate. The unchanged Absolute Timespace section keeps the full product connection as additional data. These checks establish the bounded explanatory consistency of the edit; no independent mathematical reviewer, empirical result, or new physical clock derivation is claimed. F2-1, F2-3, and F2-4 now complete the recommended Absolute Time corrections from this batch, while existing scientific recovery obligations remain at their prior grade.

#### F2-5 — The displayed frame bundle is the oriented one

**Current disposition:** accepted, implemented, and verified on 2026-09-05. The integration receipt below supersedes the historical pending-acceptance statements.

**Location:** `euclidean-void.md:137–145`. **Classification:** demonstrated naming/domain mismatch; small technical correction. **Smallest repair:** call the displayed object the oriented orthonormal frame bundle.

At a point, all ordered orthonormal frames form $O(3)$, which includes both handedness choices. After a spatial orientation has been chosen, the orientation-compatible frames form $SO(3)$. Thus $\mathbb R^3\times SO(3)$ is the oriented orthonormal frame bundle, while the full orthonormal bundle is $\mathbb R^3\times O(3)$. The existing next sentence already mentions an unoriented version, so one adjective makes the intended distinction explicit. Both bundles are trivial here. The Euclidean Levi-Civita connection still has trivial holonomy; the correction changes no claim about flatness or assembly topology.

Claim grade: `derived` by identifying an orthonormal frame with its orthogonal change-of-basis matrix. Falsifier: a previously declared orientation-restricted definition of $F$ at this point in the chapter. No new physical handedness is proposed.

##### Discussion explanation — whether mirror-reversed axes are included

A frame here is an ordered set of three perpendicular unit arrows attached to a point. All such frames have two possible handedness classes. Rotating the entire set preserves its handedness; reversing one arrow while retaining the other two switches it. Thus the collection of all orthonormal frames includes both classes, while the oriented orthonormal frames retain the class compatible with a chosen reference orientation.

The matrix statement makes the distinction exact. A matrix whose columns are an orthonormal frame satisfies $Q^{\mathsf T}Q=I$, so $(\det Q)^2=1$. Both determinant signs belong to $O(3)$. The subgroup $SO(3)$ consists of determinant-positive matrices and describes frames of the selected orientation. The displayed $\mathbb R^3\times SO(3)$ therefore pairs each point with frames of one handedness. Calling it the collection of all orthonormal frames silently omits the other class. This derivation uses Euclidean geometry and introduces no substrate magnetic law or physical handedness preference.

The sufficient repair is to name the displayed object the oriented orthonormal frame bundle and make its explanatory phrase orientation-compatible. The existing equation can remain unchanged. The choice of reference orientation is conventional, both relevant bundles are trivial over the Euclidean void, and the flatness and holonomy conclusions are unaffected. This is a small definition correction whose significance is preventing confusion between rotations and transformations that reverse orientation. F2-5 remains awaiting operator decision; no corpus change is authorized by its explanation alone.

##### Accepted F2-5 integration — 2026-09-05

The operator selected action 1: apply the naming clarification and then discuss F2-6. Under the live integrator-reviewer procedure, Euclidean Void was checked at its verified F2-2 SHA-256 `57aa722490223d3bb823556080766d69dfe6b8dfa453764991521598ab2e81e5` and a local pre-edit baseline was retained. The displayed bundle is now named the oriented orthonormal frame bundle, with ordered unit axes matching a chosen reference orientation. The companion explanation distinguishes the full bundle with both handedness classes and states that the choice introduces no physical handedness preference. No equation, flatness conclusion, holonomy claim, or other finding was changed.

The complete resulting chapter, lines 1–596, was reread and compared with its immediate baseline. All 37 display equations and all prior links are preserved. Vendored KaTeX accepted all 132 mathematical expressions, all 53 local file-link occurrences have existing targets, and `git diff --check` passed. The strict content check returned zero errors and the existing warning at `content/scenes/scenes_index.json`; it remains non-clean. Regeneration stays with its established owner via `node scripts/validate-content.mjs --write`, which was not run. Final SHA-256: `272aa8e7c1782209ff38d72ecb832d261cb51196bb20127b01754c5f45d994a3`.

The mathematical reference is the explicit orthogonal-matrix determinant argument in the preceding discussion. The full-document reread is author self-review; syntax and link checks are structural instruments, not independent mathematical validation. F2-5 is complete as a bounded definition correction. F2-6 and F2-7 remain unimplemented, and their current source line references are unchanged by this edit.

#### F2-6 — The curvilinear formulas need regular chart domains

**Location:** `euclidean-void.md:235–279`. **Classification:** missing domain conditions, with otherwise correct formulas. **Smallest repair:** distinguish spherical coordinate parameter ranges from a regular chart, state the excluded axes/origin and angular seam, and refer to Cartesian or overlapping charts there.

The spherical matrix has determinant $r^4\sin^2\theta$, so it is singular at $r=0$ and at $\theta=0,\pi$. Those values are included in the listed ranges. At a pole, changing $\phi$ names the same point, so the coordinate map is not one-to-one and its differential is not invertible. Cylindrical coordinates similarly have determinant $\rho^2$ and fail on the axis. A periodic angular range also requires a seam or multiple charts. These failures are coordinate degeneracies, not degeneracies of the Euclidean metric.

The statements $R^i{}_{jkl}=0$ and coordinate invariance remain correct on valid chart overlaps. One cannot use the displayed inverse metric or Christoffel formula at a point where that purported chart has lost rank. This matters for readers implementing a root or derivative calculation in spherical variables. Claim grade: `derived` from the determinants and coordinate maps. Falsifier: explicit chart-domain restrictions already attached to the displayed formulas. No curvature correction is recommended.

##### Discussion explanation — the labels fail at the pole, not the space

Spherical coordinates identify a point by its distance from the origin, polar angle, and azimuth around the axis. A regular coordinate chart must let nearby points be labeled uniquely and smoothly in both directions. At the north pole of a sphere, every azimuth labels the same point. In the Cartesian map $X=r\sin\theta\cos\phi$, $Y=r\sin\theta\sin\phi$, $Z=r\cos\theta$, setting $\theta=0$ gives $(X,Y,Z)=(0,0,r)$ independently of $\phi$. The angular direction has therefore stopped identifying a distinct spatial displacement. At $r=0$, both angles lose that role. Cylindrical coordinates have the corresponding azimuthal failure on their axis.

The zero factors in the displayed matrices describe that loss of coordinate rank. They do not make Euclidean distance degenerate: Cartesian coordinates remain regular there. Trying to invert the spherical matrix at a pole encounters division by $r^2\sin^2\theta$, so derivative formulas needing the inverse cannot be evaluated there as ordinary chart formulas. The separate angular seam is a continuity issue: a full-turn azimuth convention jumps at its chosen cut and needs an overlapping chart for a smooth neighborhood across that cut.

The chapter currently supplies broad parameter ranges that cover these exceptional points without distinguishing them from the regular chart domain. The sufficient repair is to retain the metric formulas, state the regular spherical domain away from the origin, polar axis, and chosen angular seam, state the analogous cylindrical exclusions, and use Cartesian or overlapping regular charts at excluded locations. The flatness claim remains exact on valid charts. This is a domain and explanation correction; no physical singularity, curvature, or EOM solver defect is established. F2-6 awaits operator decision and was not implemented with F2-5.

#### F2-7 — The CMB source has the wrong title and needs its method scope stated

**Location:** `euclidean-void.md:543`, supporting the benchmark at line 537. **Classification:** verified bibliographic error and evidence-scope clarification. **Smallest repair:** identify de Martino and collaborators by the published title, retain the correct DOI, and describe this source as a method and sensitivity study for the temperature-redshift benchmark.

DOI `10.1088/0004-637X/757/2/144` identifies de Martino and collaborators, *Measuring the Redshift Dependence of the Cosmic Microwave Background Monopole Temperature with Planck Data* (2012), not the title currently shown. The publisher-deposited Crossref metadata and the authors' [arXiv record](https://arxiv.org/abs/1203.1825) agree on the DOI; the published title is also visible in the [NASA-hosted paper record](https://ntrs.nasa.gov/citations/20140010547).

The inspected author abstract and paper introduce a deviation parameter for the standard temperature-redshift relation and study estimators and simulated-cluster systematics. They forecast sensitivity rather than report a new direct temperature-evolution measurement from released Planck maps. The current source note already limits its immediate claim to stating the benchmark and parameterization, which is supported. Keep that qualification and make the study type explicit; do not relabel the forecast as a measurement. If the generic preceding claim about existing nonzero-redshift measurements is expanded into a quantitative result, its actual measurement source must be identified separately.

Claim grade: `measured` for the source identity and study scope, using primary author material and publisher-deposited metadata. Falsifier: publisher metadata establishing the displayed title as an alternate title of this same work, or a source passage showing the purported new measurement. Access failures at the publisher and NASA PDF endpoints were worked around using the author-hosted arXiv paper; no source claim relies on an AI summary.

### Batch 2 deduction for discussion: scalar scale depends on the retained response

**Trigger:** F2-2's ambiguity between linear stretch, squared length, and a direction average. **Candidate insight:** a derived ruler map can supply an invariant volume-equivalent scale, while its trace supplies a different directional summary. Their difference is controlled by anisotropy; the choice cannot be made by notation alone.

Assume a positive-definite symmetric linear stretch map $S$ on a common Euclidean reference tangent space. Its positive eigenvalues $s_1,s_2,s_3$ are the length multipliers in three principal directions. Its directional mean is $\tfrac13\operatorname{tr}S$, whereas a unit volume changes by $\det S$. The corresponding volume-equivalent length factor is $a_V=(\det S)^{1/3}$. If the measured object is instead the squared-length metric $\gamma=S^{\mathsf T}hS$, then the same factor is $a_V=(\det\gamma/\det h)^{1/6}$. These are geometric identities conditional on that response definition, not a derived cosmology.

The elementary check uses normalized units $c_f=1$ and $S=\operatorname{diag}(2,1,1)$. The trace mean is $4/3$, while the volume-equivalent length factor is $\sqrt[3]{2}$. They agree in the isotropic case $S=aI$. More generally, the arithmetic-geometric mean inequality gives $(\det S)^{1/3}\le\operatorname{tr}S/3$, with equality precisely at isotropy.

The first physical proof step would be to derive a common retained ruler map, identify whether its observable is a stretch or metric, and determine which scalar enters the jointly recovered distance, redshift, intensity, and clock relations. Homogeneity, transport, and observer calibration remain additional requirements. Neither scalar is automatically the observed cosmological scale factor. Claim grade: `derived` for the determinant and trace identities; `inferred` for their usefulness as a route to fixing the ambiguity. Falsifier of the proposed application: the actual response is not a positive linear stretch on a common reference space, or the recovered observational map selects a different scalar. No new response law or experimental claim is promoted.

### Batch 2 complete-reading assessment, source checks, and limits

Absolute Time clearly separates the background parameter, direct wake timing, and assembly phase-count readout. The hatted/unhatted dimensionalization is correct, including $L_0/T_0=\hat c_f$ for normalized wake speed. Time translation preserves durations and root equations; a nonlinear reclocking changes the constant-speed coordinate expression and emission density. In particular, for $u=\phi(T)$, $dT=du/\phi'(T)$ and the coordinate wake speed is $c_f/\phi'(T)$, so constant speed in fixed spatial units selects an affine class. This statement concerns the canonical form and its symmetries; a passive coordinate rewrite with all transformed factors retained would not create different physical events. The fixed-line completeness statement, origin convention, history dependence, exclusion of simultaneous self-support, and clock-universality qualification are coherent at their stated scope.

The root derivative and its sign follow by differentiating the delayed norm. Sub-$c_f$ history segments cannot generate nontrivial self-hits wholly within that interval, by integrating the speed bound; the chapter correctly treats a faster segment as a possible-root warning rather than a sufficient self-hit theorem. The delayed-only support rule is a law-level time asymmetry. Entropy increase and conserved energy remain conditional on a specified coarse map or action and boundary account. Neither is smuggled into the primitive parameter as a theorem.

The provenance discussion was checked for a possible confusion between connected components and exchange loops. An instantaneous configuration space and a space of entire framed histories are different objects: path components of an endpoint-constrained history space can encode loop homotopy classes of the configuration space. The text explicitly refers to joint framed strands and retained history, so this review does not classify its component language as a demonstrated exchange-topology error. Any later use still needs the branch's endpoint and deformation conventions. No additional edit is recommended on this basis alone.

Euclidean Void correctly distinguishes the fixed container from medium content and observer geometry. The Cartesian distance, metric inverse, curvature, connection, geodesic, volume element, divergence, gradient, and Laplacian formulas are correct on their declared regular domains. The general-coordinate divergence and Laplacian correctly include the volume factor. A direct check with $f=X^2+Y^2+Z^2=r^2$ gives Laplacian 6 in both Cartesian and regular spherical coordinates. The frame triviality and holonomy argument uses both the globally Euclidean geometry and its flat connection; bundle triviality alone would not force an arbitrary connection to be flat.

The Euclidean group action preserves delayed distances and hence root conditions. Under an orthogonal transformation, transmitter velocity and delayed direction transform together, leaving their dot product and the transmitter weight unchanged; the acceleration vector transforms with the same orthogonal matrix. This checks the stated parity equivariance against the canonical kernel without importing a primitive magnetic law. Background symmetry is correctly separated from a full action-based conservation theorem. Galilean chart changes are likewise distinguished from invariance of the preferred-rest-frame wake expression.

The relational wake-set definition carries provenance without postulating an independent material field. Its convergence paragraph correctly notes that inverse-square decay and a root floor do not ensure convergence over an unlimited source population. For example, a homogeneous three-dimensional shell contributes a radial absolute-magnitude estimate proportional to $r^2dr/r^2=dr$ before any cancellation. This is a geometric warning about absolute summability, not a calculated sea response or a cost estimate. No sea constitutive law, global expansion mechanism, or cosmological solution is established by the chapter.

The external comparisons were checked only to their claimed scope. The [Lubin–Sandage author abstract](https://arxiv.org/abs/astro-ph/0106566) supports consistency of the Tolman test with expansion after evolution modeling; it does not support an exact raw fourth-power fit. The [Goldhaber author abstract](https://arxiv.org/abs/astro-ph/9602124) supports the supernova broadening claim with its width-brightness qualification. The [Fermi author abstract](https://arxiv.org/abs/0908.1832), linked to the chapter's DOI, supports a limit on linear energy-dependent propagation from GRB 090510; no raw arrival-time data were reanalyzed. The de Martino source limitation is in F2-7. Wheeler and Feynman's [1945 paper](https://fisherp.scripts.mit.edu/wordpress/wp-content/uploads/2017/10/Interaction-with-the-Absorber-as-the-Mechanism-of-Radiation.pdf), especially the symmetric source/absorber discussion and statistical-arrow discussion, supports the stated contrast between past/future-supported interaction and a selected radiative arrow. That comparison supplies no substrate premise here.

No empirical reanalysis, independent solver comparison, global root-completeness proof, retained assembly certificate, or clock/metric recovery was performed. The mathematical checks above are explicit local derivations by this reviewer. The syntax instrument accepted 133 expressions in Absolute Time and 114 in Euclidean Void; their 21 and 37 display blocks remain unchanged, respectively. All 83 local file-link occurrences in these two files have existing targets. A syntax or link check is not mathematical validation, and no rendered-page visual audit is claimed for this review-only batch.

### Current discussion boundary after batch 2

Coverage is 4 of 9 complete reviews: 3 chapters with all recommended corrections accepted and verified (Ontology, Architrino, Absolute Time), 1 partially integrated chapter awaiting further decisions (Euclidean Void), 0 reviewed unchanged with no recommended correction, 0 explicitly deferred or blocked files, and 5 not yet reviewed. F2-1 through F2-5 have accepted, implemented, and verified corrections. F2-6, F2-7, and the response-scalar deduction await discussion. The current discussion is F2-6; no next batch is authorized by this correction request. The next planned target is Absolute Timespace alone. Its later review must preserve the now-explicit F2-2 boundary: neither a cosmological scale nor a clock-comparison residual follows from a generic tensor trace without the physical response map. The existing response-recovery obligations remain open. Completed reading coverage and corrected exposition do not close those scientific obligations.
