# Corpus Explanation Rewrite Work Queue

This is the canonical execution ledger for bringing `content/markdown/aaa` into line with edition 1.0 of the [academic style guide](../../../content/markdown/aaa/archie/academic-style-guide.md). Per-file conversion records live in [conversion-ledger.md](evidence/conversion-ledger.md).

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
15. A ledger row is added recording file, edition, date, and a note on what the conversion changed. Do not record word counts or growth percentages; size was removed from this campaign's concerns by operator decision on 2026-09-03, and [conversion-ledger.md](evidence/conversion-ledger.md) says why.

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

The integrated evidence, scan specification, false-positive table, deferred existing-row audit, browser QA, validation receipts, and generated-drift boundary are recorded in [crw-002-term-lookup-result.md](evidence/crw-002-term-lookup-result.md).

The implementation prompt is [crw-002-dispatch.md](campaigns/crw-002-dispatch.md). It carries the verified affordance findings, the ordering, the disambiguation traps for deliverable 3, and the report contract; dispatch an agent with that document rather than with this section.

- **Blocked by:** nothing.
- **Evidence / blocker:** The accepted UI path, glossary coverage, declined decorator, and selective clue edits are implemented and validated. The historical 70-document measurement could not be repeated exactly because its term list, parser, command, and file list were not retained; the result record replaces it with an explicit current 149-document scan and does not claim a before-and-after delta.
- **Completion:** **Met 2026-09-04.** The glossary covers the audited load-bearing foundation vocabulary as first-class terms; a reader on an arbitrary scene or document can reach it without knowing it exists; the decorator is declined with its prototype result recorded; and the replacement current-state scan identifies the selective inline-clue scope.

### CRW-001 — Phase 1: Foundations

- **Status:** Verified
- **Priority object:** `foundations_phase_one`
- **Closed:** 2026-09-03
- **Request / acceptance:** Convert all nine documents in `content/markdown/aaa/foundations/` to edition 1.0, satisfying the done criteria above.

Foundations came first because everything else links into it. The 70 under-linked documents identified in [priorities.md](priorities.md) all point here, so converting a later chapter before its foundations were ready would have sent readers to prose about to change underneath them.

All nine converted at edition 1.0 on 2026-09-03: `architrino.md`, `euclidean-void.md`, `constructing-the-absolute-frame.md`, `ontology.md`, `absolute-timespace.md`, `absolute-time-defense.md`, `absolute-time.md`, `detecting-the-absolute-frame.md`, and `emergence-of-structure.md`. Per-file rows are in [conversion-ledger.md](evidence/conversion-ledger.md).

#### Verification, 2026-09-03 20:28

Mechanical criteria 1 through 5, 12, and 13 verified across all nine documents:

- **211 equation-viewer links** preserved, matching the pre-conversion count exactly, with **zero misplaced** — each still the sole content of the paragraph immediately following its equation block, which is what the viewer requires to decorate them.
- Every internal link resolves.
- The retired inline plain-language tag appears **zero** times.
- `validate-equation-mapping-links.mjs` passes.

Per-file rows are in [conversion-ledger.md](evidence/conversion-ledger.md).

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

The initial request authorized review records and discussion capture only. The operator subsequently accepted all batch-1 recommendations and directed their implementation before batch 2; the dated integration record below owns that acceptance and verification. Later dated receipts below record acceptance and verification through batch 3, including the supplemental quadrupole clarification. The current batch-4 findings remain discussion-only. Controlled canon, application changes, generated artifacts, and reactivation of deferred theory work remain outside this task. A later instruction to continue means the next review batch unless implementation is also requested.

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
| 2 | [Absolute Time](../../../content/markdown/aaa/foundations/absolute-time.md), [Euclidean Void](../../../content/markdown/aaa/foundations/euclidean-void.md) | Both read completely; all F2-1 through F2-7 accepted corrections verified; response-scalar insight under discussion |
| 3 | [Absolute Timespace](../../../content/markdown/aaa/foundations/absolute-timespace.md) | F3-1 through F3-7 and supplemental quadrupole clarification accepted and verified |
| 4 | [Absolute Time Defense](../../../content/markdown/aaa/foundations/absolute-time-defense.md) | Completely reviewed; all F4-1 through F4-4 accepted corrections verified |
| 5 | [Detecting the Absolute Frame](../../../content/markdown/aaa/foundations/detecting-the-absolute-frame.md), [Constructing the Absolute Frame](../../../content/markdown/aaa/foundations/constructing-the-absolute-frame.md) | Not yet reviewed as campaign targets |
| 6 | [Emergence of Structure](../../../content/markdown/aaa/foundations/emergence-of-structure.md) | Not yet reviewed; separate synthesis and branch-selection burden |

Reading a later chapter as a required foundation anchor does not count as its completed review. Coverage is 6 of 9 complete readings: 6 chapters with all recommended corrections accepted and verified, 0 wholly unimplemented chapters with findings awaiting decision, 0 partially integrated chapters awaiting correction decisions, 0 reviewed with no recommended change, 0 files explicitly deferred or blocked, and 3 not yet reviewed. F2-1 through F2-7 have verified corrections; the physical response identifications discussed in F2-2 and the supplemental batch-3 quadrupole assessment remain open recovery obligations. Scientific closure is not implied by any coverage status.

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

**Current disposition:** accepted, implemented, and verified on 2026-09-05. The original finding and pre-acceptance discussion below are preserved; the integration receipt supersedes their pending status.

**Location:** `euclidean-void.md:235–279`. **Classification:** missing domain conditions, with otherwise correct formulas. **Smallest repair:** distinguish spherical coordinate parameter ranges from a regular chart, state the excluded axes/origin and angular seam, and refer to Cartesian or overlapping charts there.

The spherical matrix has determinant $r^4\sin^2\theta$, so it is singular at $r=0$ and at $\theta=0,\pi$. Those values are included in the listed ranges. At a pole, changing $\phi$ names the same point, so the coordinate map is not one-to-one and its differential is not invertible. Cylindrical coordinates similarly have determinant $\rho^2$ and fail on the axis. A periodic angular range also requires a seam or multiple charts. These failures are coordinate degeneracies, not degeneracies of the Euclidean metric.

The statements $R^i{}_{jkl}=0$ and coordinate invariance remain correct on valid chart overlaps. One cannot use the displayed inverse metric or Christoffel formula at a point where that purported chart has lost rank. This matters for readers implementing a root or derivative calculation in spherical variables. Claim grade: `derived` from the determinants and coordinate maps. Falsifier: explicit chart-domain restrictions already attached to the displayed formulas. No curvature correction is recommended.

##### Discussion explanation — the labels fail at the pole, not the space

Spherical coordinates identify a point by its distance from the origin, polar angle, and azimuth around the axis. A regular coordinate chart must let nearby points be labeled uniquely and smoothly in both directions. At the north pole of a sphere, every azimuth labels the same point. In the Cartesian map $X=r\sin\theta\cos\phi$, $Y=r\sin\theta\sin\phi$, $Z=r\cos\theta$, setting $\theta=0$ gives $(X,Y,Z)=(0,0,r)$ independently of $\phi$. The angular direction has therefore stopped identifying a distinct spatial displacement. At $r=0$, both angles lose that role. Cylindrical coordinates have the corresponding azimuthal failure on their axis.

The zero factors in the displayed matrices describe that loss of coordinate rank. They do not make Euclidean distance degenerate: Cartesian coordinates remain regular there. Trying to invert the spherical matrix at a pole encounters division by $r^2\sin^2\theta$, so derivative formulas needing the inverse cannot be evaluated there as ordinary chart formulas. The separate angular seam is a continuity issue: a full-turn azimuth convention jumps at its chosen cut and needs an overlapping chart for a smooth neighborhood across that cut.

The chapter currently supplies broad parameter ranges that cover these exceptional points without distinguishing them from the regular chart domain. The sufficient repair is to retain the metric formulas, state the regular spherical domain away from the origin, polar axis, and chosen angular seam, state the analogous cylindrical exclusions, and use Cartesian or overlapping regular charts at excluded locations. The flatness claim remains exact on valid charts. This is a domain and explanation correction; no physical singularity, curvature, or EOM solver defect is established. F2-6 awaits operator decision and was not implemented with F2-5.

##### Accepted F2-6 integration — 2026-09-05

The operator's “do 1” accepted the preceding recommendation to apply F2-6 and then explain F2-7. The live chapter matched the F2-5 result before editing: SHA-256 `272aa8e7c1782209ff38d72ecb832d261cb51196bb20127b01754c5f45d994a3`. The integration used the live integrator-reviewer procedure. The edit states regular spherical and cylindrical chart domains, explains the coordinate determinants and angular seam, and directs readers to Cartesian or overlapping regular charts at excluded locations. The metric formulas and the flat Euclidean geometry retain their meaning.

The complete resulting 598-line chapter was reread and compared with the immediate baseline. SHA-256 after integration is `2fc39b063eb969a4aeb7253eb367e89a9e185955dda9c9f2ac4ba5c7b93736f9`. The vendored KaTeX parser accepted all 140 mathematical expressions; all 37 display blocks are byte-identical to baseline, all prior links are retained, and all 53 local file-link occurrences resolve to existing files. The existing coordinate-map and determinant derivations supply the local mathematical reasoning. This is author self-review with syntax and structural instruments, not independent mathematical validation or a rendered-page visual audit.

Scoped whitespace validation passed. The strict content check reported 0 errors and 1 warning: existing generated drift at `content/scenes/scenes_index.json`. Regeneration remains with the established regeneration or PR owner; the reported command is `node scripts/validate-content.mjs --write`, which was not run. F2-7 and the response-scalar deduction remain unaccepted. No generated artifact, controlled canon, application code, or additional corpus chapter was changed.

#### F2-7 — The CMB source has the wrong title and needs its method scope stated

**Current disposition:** accepted, implemented, and verified on 2026-09-05. The original finding and discussion below retain their pre-acceptance scope; the integration receipt supersedes their pending status.

**Location:** `euclidean-void.md:543`, supporting the benchmark at line 537. **Classification:** verified bibliographic error and evidence-scope clarification. **Smallest repair:** identify de Martino and collaborators by the published title, retain the correct DOI, and describe this source as a method and sensitivity study for the temperature-redshift benchmark.

DOI `10.1088/0004-637X/757/2/144` identifies de Martino and collaborators, *Measuring the Redshift Dependence of the Cosmic Microwave Background Monopole Temperature with Planck Data* (2012), not the title currently shown. The publisher-deposited Crossref metadata and the authors' [arXiv record](https://arxiv.org/abs/1203.1825) agree on the DOI; the published title is also visible in the [NASA-hosted paper record](https://ntrs.nasa.gov/citations/20140010547).

The inspected author abstract and paper introduce a deviation parameter for the standard temperature-redshift relation and study estimators and simulated-cluster systematics. They forecast sensitivity rather than report a new direct temperature-evolution measurement from released Planck maps. The current source note already limits its immediate claim to stating the benchmark and parameterization, which is supported. Keep that qualification and make the study type explicit; do not relabel the forecast as a measurement. If the generic preceding claim about existing nonzero-redshift measurements is expanded into a quantitative result, its actual measurement source must be identified separately.

Claim grade: `measured` for the source identity and study scope, using primary author material and publisher-deposited metadata. Falsifier: publisher metadata establishing the displayed title as an alternate title of this same work, or a source passage showing the purported new measurement. Access failures at the publisher and NASA PDF endpoints were worked around using the author-hosted arXiv paper; no source claim relies on an AI summary.

##### Discussion explanation — source identity and what was tested

The current passage is [Euclidean Void, source note](../../../content/markdown/aaa/foundations/euclidean-void.md), line 551 in the F2-6 result. Its immediate assertion—that this paper states the temperature-redshift benchmark and deviation parameterization—is supported. The demonstrated defect is the displayed title. The additional recommendation is to identify the study type so a reader can distinguish a sensitivity forecast from a reported measurement of temperature evolution.

The authors' [paper introduction](https://arxiv.org/pdf/1203.1825), page 2, explicitly describes testing a pipeline on simulated clusters and using measured X-ray cluster properties to predict the accuracy of future Planck measurements. The calculation therefore combines observational inputs with a forecast; it does not itself report the new direct Planck temperature-evolution measurement that a reader might infer from an imprecise citation description. The author record and PDF were checked again during this discussion; the NASA record endpoint returned an access error on this recheck. The earlier publisher-metadata identity check remains recorded at its original scope.

The smallest repair is to correct the title, identify de Martino and collaborators, retain the DOI, and say that this method and sensitivity study presents the benchmark and deviation parameterization. No change to the substrate ontology, benchmark equation, or cosmological recovery requirement follows. A forecast mislabeled as an observation would overstate empirical support, but the present chapter does not explicitly make that stronger claim. F2-7 remains awaiting acceptance.

##### Accepted F2-7 integration — 2026-09-05

The operator's “do 1” accepted the recommendation to apply F2-7 and then explain the remaining batch-2 insight. The live chapter matched the F2-6 result before editing: SHA-256 `2fc39b063eb969a4aeb7253eb367e89a9e185955dda9c9f2ac4ba5c7b93736f9`. Under the live integrator-reviewer procedure, the source note now identifies de Martino and collaborators, uses the published title, retains the DOI, and describes the method and sensitivity study's simulated clusters and measured X-ray cluster inputs. The publisher-deposited Crossref record was retrieved directly and confirmed the full title and DOI; the author paper's page-2 introduction confirmed its forecasting scope. These are independent primary sources for bibliographic identity and study purpose, not independent mathematical validation of the paper's results.

The complete resulting 598-line chapter was reread, with a final reread of the corrected sentence after a possessive-grammar adjustment. The immediate-baseline comparison confines F2-7 to the source note. Final SHA-256 is `1b561ec1b1ad6ebbe40533b262c3c584abc5ac1813cb874dbcfa94d035022a02`. KaTeX accepts 140 mathematical expressions, all 37 display blocks remain byte-identical, all previous link targets are retained, and 53 local file-link occurrences resolve. Author self-review found no further required corpus correction in this pass. Scoped whitespace validation passed. The strict content check reported 0 errors and 1 warning (exit status 1): existing `content/scenes/scenes_index.json` drift. The small possessive adjustment changes no structural input to that check. Regeneration remains with its established regeneration or PR owner; `node scripts/validate-content.mjs --write` was not run.

All seven numbered batch-2 findings now have accepted corrections verified at their recorded scope. The response-scalar insight is retained for discussion below; it has not been promoted to the corpus or accepted as a physical identification. No application code, controlled canon, generated artifact, or other corpus chapter was changed by this integration.

### Batch 2 deduction for discussion: scalar scale depends on the retained response

**Trigger:** F2-2's ambiguity between linear stretch, squared length, and a direction average. **Candidate insight:** a derived ruler map can supply an invariant volume-equivalent scale, while its trace supplies a different directional summary. Their difference is controlled by anisotropy; the choice cannot be made by notation alone.

Assume a positive-definite symmetric linear stretch map $S$ on a common Euclidean reference tangent space. Its positive eigenvalues $s_1,s_2,s_3$ are the length multipliers in three principal directions. The mean of those three principal stretches is $\tfrac13\operatorname{tr}S$, whereas a unit volume changes by $\det S$. The corresponding volume-equivalent length factor is $a_V=(\det S)^{1/3}$. If the measured object is instead the squared-length metric $\gamma=S^{\mathsf T}hS$, then the same factor is $a_V=(\det\gamma/\det h)^{1/6}$. These are geometric identities conditional on that response definition, not a derived cosmology.

The elementary check uses normalized units $c_f=1$ and $S=\operatorname{diag}(2,1,1)$. The trace mean is $4/3$, while the volume-equivalent length factor is $\sqrt[3]{2}$. They agree in the isotropic case $S=aI$. More generally, the arithmetic-geometric mean inequality gives $(\det S)^{1/3}\le\operatorname{tr}S/3$, with equality precisely at isotropy.

The first physical proof step would be to derive a common retained ruler map, identify whether its observable is a stretch or metric, and determine which scalar enters the jointly recovered distance, redshift, intensity, and clock relations. Homogeneity, transport, and observer calibration remain additional requirements. Neither scalar is automatically the observed cosmological scale factor. Claim grade: `derived` for the determinant and trace identities; `inferred` for their usefulness as a route to fixing the ambiguity. Falsifier of the proposed application: the actual response is not a positive linear stretch on a common reference space, or the recovered observational map selects a different scalar. No new response law or experimental claim is promoted.

##### Discussion explanation — the quantity being preserved selects the average

Imagine a reference unit cube under a hypothetical effective ruler map that doubles one principal length and leaves the other two unchanged. With $c_f=1$, its principal stretch factors are $(2,1,1)$. The arithmetic mean of those factors is $(2+1+1)/3=4/3$. Its reconstructed volume is twice the reference volume. An isotropic cube with that same volume must have side factor $a_V$ satisfying $a_V^3=2$, hence $a_V=sqrt[3]{2}$. Isotropically applying $4/3$ would instead give volume factor $64/27$, which is not 2. Both averages are mathematically valid; they preserve different features of the response. This example concerns a hypothetical effective map within a fixed void, not a deformation of the substrate.

The general formulas follow by diagonalizing the positive, self-adjoint map $S$ in an $h$-orthonormal basis. The trace sums its three principal stretches, and the determinant multiplies them. A volume element therefore changes by $det S$, while an isotropic length factor changes volume by its cube. If the response is expressed as $gamma=S^{mathsf T}hS$, taking determinants gives $detgamma=(det S)^2det h$, which supplies the sixth-root expression above. The determinant ratio is independent of a common coordinate relabeling because numerator and denominator acquire the same squared Jacobian factor. The arithmetic-geometric mean inequality gives the ordering, with equality exactly when all three positive stretches agree. These deductions are author-derived local geometry; no simulation or new constitutive law is involved.

A clarification to the original discussion's phrase “directional mean” is necessary. The trace mean equals the uniform spherical average of the longitudinal projection $h(mathbf n,Smathbf n)$ for $h(mathbf n,mathbf n)=1$, since the sphere average of $n^in^j$ is $h^{ij}/3$. It is generally different from the mean actual length multiplier $|Smathbf n|_h$. For the same example and $mathbf n=(1,1,0)/sqrt2$ in Cartesian coordinates, the projection is $3/2$ and the length multiplier is $sqrt{5/2}$. Cauchy–Schwarz gives the projection no larger than that length; anisotropy makes the inequality strict on a set of directions of positive area. The working discussion now calls the trace quantity the mean principal stretch, preserving the determinant comparison while removing that ambiguity. This clarification changes no accepted F2-2 formula, which already defines its averaged response explicitly as a quadratic form.

The useful theoretical route is conditional: derive a physical ruler or metric response first, then determine whether the consumer needs a mean directional projection, a length average, a volume-equivalent scale, or another observable. A determinant-based scale is a natural candidate when the required summary preserves local reconstructed volume. Cosmological distance, redshift, intensity, and clock comparisons need their own jointly consistent derivation before that candidate can be identified with a cosmological scale factor. A response that is nonlocal, history-dependent without a sufficient local state, or not representable by the assumed positive linear map defeats this proposed application even though the geometric identities remain true.

Recommendation for this discussion: retain the result here as a provisional proof route and proceed to the next review batch after operator discussion. The repaired chapter already explains why the response definition matters; no further Foundations correction is required merely to add this optional example. The physical response-recovery obligations remain open, and this turn does not authorize batch 3.

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

Coverage is 4 of 9 complete reviews: 4 chapters with all recommended corrections accepted and verified (Ontology, Architrino, Absolute Time, Euclidean Void), 0 partially integrated chapters awaiting correction decisions, 0 reviewed unchanged with no recommended correction, 0 explicitly deferred or blocked files, and 5 not yet reviewed. All F2-1 through F2-7 corrections are accepted, implemented, and verified. The current discussion is the response-scalar insight; its physical application remains provisional, and no next batch is authorized by this correction request. The next planned target is Absolute Timespace alone. Its later review must preserve the F2-2 boundary: neither a cosmological scale nor a clock-comparison residual follows from a generic tensor trace without the physical response map. The existing response-recovery obligations remain open. Completed reading coverage and corrected exposition do not close those scientific obligations.

## Foundations batch 3 — Absolute Timespace review, 2026-09-05

### Scope, authority, and reviewed version

The operator's “do 1” accepted the recommendation to proceed to batch 3 while retaining the batch-2 response-scalar insight as a provisional proof route. This authorizes review and discussion capture, not corpus implementation. The live corpus-reviewer procedure was used with the operator's small-batch override. Absolute Timespace is the sole target because of its mathematical density. The preceding batch-2 discussion boundary is a historical snapshot; this section owns the current boundary.

The deterministic recursive inventory still contains the same nine Markdown paths, and the live textbook traversal still places Absolute Timespace fifth, with no missing path. All 922 lines of [Absolute Timespace](../../../content/markdown/aaa/foundations/absolute-timespace.md) were read. The reviewed SHA-256 is `f0fce6751a516b7d1c117f82b7b0af18e810052830036c331bc861d33ea8437c`, matching the campaign baseline and unchanged at the end of review. Git HEAD at startup was `6597f62a05e4d91a0c1719e32a4b50e917ef408f`. The working set already contained the preceding Euclidean Void integration and the two campaign owners; that work was preserved. All locations below refer to this reviewed target hash.

The earlier Foundations conversion entry, its verification and correction history, and the current batch-1 and batch-2 decisions were consulted. The historical conversion's 55 equation blocks remain present, but historical correction and conversion receipts are not evidence that the present prose is correct. Dependencies included the corrected Absolute Time and Euclidean Void, the Master Equation's delay-map theorem pack, Lorentz Kinematics' Theorem G, the Noether Sea convergence discussion, and current mathematical and terminology authorities. These dependency reads do not extend completed campaign coverage beyond Foundations.

### Findings for discussion

#### F3-1 — The root-floor explanation repeats the corrected singularity and root-count overstatement

**Location:** `absolute-timespace.md:559–600`, especially line 585; the related cycle diagnostic is at lines 616–634. **Classification:** demonstrated overstatement and contradiction with the accepted F2-1 correction; consequential for interpreting root diagnostics. **Disposition:** accepted by the operator; correction implemented and verified in the integration receipt below.

The derivative formula is correct. A positive declared floor bounds local conditioning; violating that chosen floor does not establish a zero derivative, and a floor alone does not prevent roots leaving the retained history interval. At normalized wake speed $c_f=1$, take a transmitter $X_j(s)=s/2$ and a receiver event $(T_r,X_i)=(2,3/2)$, restricted to a neighborhood of $s=1$. Then $F(2,s)=(s-1)/2$. Its root has derivative $1/2$ and is perfectly simple, even if the calculation declares a floor $3/4$. There is no fold at this event. This is a prescribed-history local counterexample to the prose implication, not an evolved assembly example.

For a separate endpoint check, a stationary transmitter at the origin and receiver at distance 1 have root $s=T_r-1$ and derivative 1. On a fixed retained interval $[0,2]$, that root leaves through the upper endpoint as $T_r$ increases through 3, with no derivative degeneration. The Master Equation explicitly separates boundary regularity R1 from simple-root regularity R2. The same target chapter correctly mentions boundary and memory-window exits at line 634, so line 585 also conflicts with its own later explanation.

The smallest repair is to carry F2-1's accepted distinction into this chapter: nonzero derivative permits local continuation; the chosen margin supplies quantitative conditioning; actual derivative zero requires singular analysis; constant inventory additionally requires controlled boundaries, pair set, and history domain. Preserve the derivative and playback equations. Also make the cycle diagnostic explicitly a reception-time-indexed inventory followed through one declared cycle. The displayed sum is a root count at a receiver time, not a finite count of all continuously received rows over a cycle; counting sampled rows would depend on sampling density.

Claim grade: `derived` from the two elementary root examples and the live theorem conditions. Falsifier: a declared domain restriction or additional hypothesis that excludes both examples from the sentence's intended scope. Until corrected, do not use this paragraph to classify a numerical margin failure as a physical caustic or an assembly failure. No change to the Master Equation is recommended.

#### F3-2 — A common Lorentz action does not require the observed deformation factors themselves to form an exponential group

**Location:** `absolute-timespace.md:681–691`. **Classification:** undefined mathematical object and overstated necessity in a recovery target. **Disposition:** accepted by the operator; correction implemented and verified in the integration receipt below.

The passage introduces $\mathcal D=\exp(\varphi_{\mathrm{eff}}K)$ as a moving branch's deformation family, but gives neither the space on which $K$ acts nor the maps extracting length and clock observables. An exponential with one fixed linear generator obeys a composition law. The Lorentz contraction observable does not obey that law under ordinary multiplication. Writing its target value as $f(\varphi)=\operatorname{sech}\varphi$, choose $\cosh\varphi=2$. Then $f(\varphi)=1/2$, while $f(2\varphi)=1/7$ and $f(\varphi)^2=1/4$. Thus even the intended Lorentz factor is a counterexample if the displayed exponential is meant to act directly on these scalar deformation factors. This is algebra in an explicitly labeled observer-level comparison, not an imported substrate law; numerical checking used $c_f=1$.

A full boost action can be represented by an exponential, with length and clock readings obtained by different projections and simultaneity selections. Different observable spaces can also carry different representations of the same abstract generator. Distinct matrices or response functions therefore do not, by themselves, establish failure of Lorentz recovery. The live Theorem G requires a common retained causal record and consistent dressing; it does not impose the undefined stronger matrix-identification test made here.

The smallest repair is to preserve the common-record requirement and treat the exponential as an optional representation on a declared full state or event-record space, accompanied by the observable maps. If that representation is not supplied here, replace the exponential assertion with the precise common-record recovery condition and leave constructing an equivariant representation as a proof route. Do not declare physical recovery failed merely because the reduced clock and length maps have different generators or nonlinear forms.

Claim grade: `derived` for the composition counterexample; `open` for construction of a shared representation and observation maps. Falsifier: a declared state space, group action, and projection maps that make the exponential well-defined and establish the claimed necessity. The concern does not reject Lorentz recovery or common microscopic provenance.

#### F3-3 — The shape test needs a rest-shape normalization

**Location:** `absolute-timespace.md:661–679`. **Classification:** missing definition and normalization; false as a universal raw aspect-ratio requirement. **Disposition:** accepted by the operator; correction implemented and verified in the integration receipt below.

The equation uses $R_\parallel/R_\perp$ without defining these quantities as normalized deformation factors or restricting the reference branch to a spherical envelope. At zero observer speed its right-hand side is 1, so a raw-radius interpretation requires every tested branch to have equal longitudinal and transverse radii at rest. Relativistic contraction does not impose that rest shape. A reference body with radii 2 and 1 has ratio 2 at rest and ratio $2/\gamma_0$ after ideal longitudinal contraction; it fails the displayed test despite exactly following the stated comparison law. The example fixes $c_f=1$ and concerns observer geometry only.

The live Theorem G uses deformation factors $a_\parallel/a_\perp$, which can refer to changes relative to a reference branch. The sufficient repair is to define positive reference radii and use $[R_\parallel(v)/R_\parallel(0)]/[R_\perp(v)/R_\perp(0)]$, or use explicitly defined deformation factors. Alternatively, restrict the equation to the intended isotropic reference-envelope class. Hold internal excitation, medium state, and the branch comparison convention fixed. Define the velocity domain $|v_{\mathrm{eff}}|<c_0$ and clarify how the displayed residual budget is controlled near its endpoint. The clock ratio likewise presumes a calibrated rest clock in the declared weak homogeneous observer chart.

Claim grade: `derived` from the zero-speed limit and an arbitrary rest aspect ratio. Falsifier: an explicit earlier definition making these particular $R$ symbols normalized factors or restricting the tested class to equal rest radii. No such definition occurs in the target. This is an important limit on a recovery test, not a predicted failure of real assemblies.

#### F3-4 — The filled cone is a passage-by-time construction, not an established domain for every causal influence

**Location:** `absolute-timespace.md:489–533`, especially lines 523–533. **Classification:** ambiguous reachability claim that becomes false under a general causal-domain interpretation. **Disposition:** accepted by the operator; correction implemented and verified in the integration receipt below.

For one emission, the equality gives actual direct support. The inequality says a fixed spatial location is reached no later than the listed time; interior spacetime events are not later direct hits of that same emission. With $c_f=1$, an emission at $(0,0)$ reaches location $X=1$ at $T=1$. The interior event $(2,1)$ does not receive that same wake again. The inequality therefore describes locations already passed by a given time, not additional direct support.

Nor has the text established that this cone bounds all indirect influence. The chapter permits super-$c_f$ constituents. A kinematically allowed recipient meeting that emission at $(1,1)$ and then moving at speed 2 reaches $(2,3)$ outside the original cone, while its later history can still depend on the received interaction. This demonstrates the missing hypothesis in a geometry-only inference; it does not certify an EOM solution, a realizable signaling channel, or an observer-level faster-than-light experiment. Wake-only chains with every segment limited by $c_f$ do satisfy the cone bound by the triangle inequality, but that premise cannot silently exclude transport along constituent histories.

The smallest repair is to define the filled set as a passage-by-time or geometric envelope construction, retain equality as direct wake support, and keep general history-mediated influence separate. If a genuine operational reachability set is wanted, specify admissible relays, transport, and persistence and derive it from them. This continues F2-3's accepted separation of direct contributions from indirect dependence. Claim grade: `derived` for the support distinction and kinematic counterexample; general physical signaling remains `open`. Falsifier: a proved bound on every admitted influence-carrying channel that supplies the missing premise.

#### F3-5 — The causal arrow comes from admissibility and support rules, not the product manifold alone

**Location:** `absolute-timespace.md:50`, `78–80`, and `602–608`. **Classification:** incorrect explanatory inference and a smaller ordering-terminology error. **Disposition:** accepted by the operator; correction implemented and verified in the integration receipt below.

A graph over $T$ assigns one position to each time; it does not itself select the direction in which a history is physically admitted. The product manifold contains curves traversed toward decreasing $T$, and the same manifold supports a hypothetical future-supported interaction law. Those possibilities are excluded here by the stated future-directed evolution rule and the actual $T_t<T_r$ support rule. Absolute Time explicitly assigns the causal orientation to the law's support convention. Line 80's claim that no separate rule is needed contradicts its own preceding admissibility sentence.

The intended exclusion of causal loops is sound once these rules are imposed: every link of an admissible finite causal chain strictly increases $T$, so the chain cannot return to its starting event. The repair is to explain that proof and credit its premises. It does not add a new arrow postulate; it identifies the rule already present.

Line 50 also calls the ordering a total order of events. Distinct simultaneous events have the same time, so the relation $A\preceq B$ defined by $T_A\le T_B$ is a total preorder on events, not an antisymmetric total order. The simplest reader-facing repair is “a total ordering of instants or simultaneity slices.” Claim grade: `derived` from the definitions. Falsifier: a definition of an event ordering that distinguishes simultaneous events, or an independent geometric restriction supplying the arrow without the already stated admissibility rule. Such a distinction is not part of this ontology.

#### F3-6 — The statistical convergence route needs a covariance bound that includes the full received-cell weight

**Location:** `absolute-timespace.md:810–846`, with the exhaustion prescription at lines 789–804. **Classification:** missing definition and proof hypothesis; the final martingale implication is correct conditionally. **Disposition:** accepted by the operator; correction implemented and verified in the integration receipt below.

The prose uses inverse-square decay to obtain shell variance $O(n^{-2})$, but the displayed bound on $\delta\mathbf a_{\mathrm{cell}}$ includes only separation decay. It does not identify whether that variable is an undiluted cell source or the complete acceleration received from all its admitted roots. Uniform moments of already received contributions do not supply their radial decay: independent unit-variance cell contributions satisfy the displayed exponential separation bound, yet summing $O(n^2)$ of them gives variance $O(n^2)$. This counterexample addresses the displayed hypothesis alone; it does not refute the stronger inverse-square weighted hypothesis the surrounding prose appears to intend.

For the actual wake sum, per-hit inverse-square dilution also does not automatically bound a whole cell if admitted root multiplicity or transmitter-side weights grow without control. State the moment or covariance hypothesis for the complete weighted, centered contribution, with the root ledger included. One sufficient formulation for cells $k,l$ outside a local ball is

$$
\left|\mathbb E[\delta\mathbf a_k\cdot\delta\mathbf a_l]\right|
\le C r_k^{-2}r_l^{-2}e^{-d_{kl}/\ell}.
$$

Here $r_k$ is receiver-to-cell distance, $d_{kl}$ is cell separation, and a bounded cell-packing density is also assumed. For a shell $I_n$ at radius comparable to $n\ell$, that density makes $\sup_k\sum_l e^{-d_{kl}/\ell}$ finite. Consequently

$$
\mathbb E\left\|\sum_{k\in I_n}\delta\mathbf a_k\right\|^2
\le C' n^{-4}\sum_{k\in I_n}\sum_{l\in I_n}e^{-d_{kl}/\ell}
\le C''n^{-4}|I_n|
=O(n^{-2}).
$$

This is the missing local derivation. It can instead be obtained from normalized undiluted cell variables and explicitly bounded weights, provided the same full-root obligation is retained. The displayed repair is sufficient, not claimed necessary, and is not claimed to follow already from neutral Noether sea dynamics.

The chapter correctly adds a martingale-difference hypothesis for the centered shell increments. Given it and summable variances, orthogonality of increments bounds the second moment of the partial sums, and the $L^2$ martingale convergence theorem gives both mean-square and almost-sure convergence. This theorem was checked against [Scott Sheffield's probability lectures, slides 21–24](https://math.mit.edu/~sheffield/2016175/Lecture19.pdf). Mixing alone does not prove that conditional-mean hypothesis; the chapter already says so. The result is for the declared receiver-centered exhaustion and does not establish arbitrary rearrangement independence. Specify what an allowed refinement preserves, or restrict the statement to completed shell sums.

The smallest repair is to define the weighted cell variable, state a sufficient weighted covariance and packing hypothesis, include the variance estimate, and keep the existing martingale and physical-recovery limits. Claim grade: `derived` for the conditional estimate and counterexample to the weaker displayed bound; the physical statistical hypotheses remain `open`. Falsifier: an existing precise definition that already supplies the missing radial and complete-root moment bounds. This finding does not establish divergence of the actual sea, and the weaker mean-square covariance route in Noether Sea is not promoted to an almost-sure theorem.

#### F3-7 — The ten-generator group is Poincare, not Lorentz

**Location:** `absolute-timespace.md:657`. **Classification:** demonstrated terminology error with an otherwise correct count. **Disposition:** accepted by the operator; correction implemented and verified in the integration receipt below.

The seven connected substrate generators are three spatial translations, three rotations, and one time translation. Adding three boosts gives the ten generators of the Poincare group. The Lorentz group itself has six: three rotations and three boosts. Reflections add disconnected transformations, not continuous generators. The same count is already used correctly in the local coordinate-framework owners and is confirmed in [Silvia Nagy's group-theory discussion, sections 2.3–2.4](https://www.maths.dur.ac.uk/users/silvia.nagy/QFT.html).

Replace “ten-generator Lorentz structure” with “ten-generator Poincare structure,” while preserving the distinction between symmetry recovery, algebra closure, and conserved charges. Claim grade: `derived` by counting the stated transformations; the external notes independently confirm the established group names. Falsifier: an explicit definition using “Lorentz structure” for the affine extension, which would still be needlessly inconsistent with the local canonical term. No new symmetry has been proved by counting generators.

### Additional theoretical insight — common provenance and sufficient response variables

**Trigger:** the one-generator necessity in F3-2, the framing-quadrupole target at lines 368–376, and the batch-2 distinction between different summaries of one physical response. **Candidate insight:** a single microscopic record can support several different observable maps without requiring one scalar statistic or one identical matrix representation to contain them all. The valuable common-record condition is consistency of those maps with the same underlying dynamics.

The proposed $Q_A$ economy is a useful conditional route rather than an established universal sufficiency result. A framing distribution equally supported on the six signed Cartesian axes has $\langle n_i n_j\rangle=\delta_{ij}/3$ and hence $Q_A=0$, just as a uniform sphere does. But the first distribution has $\langle n_x^4\rangle=1/3$, whereas the uniform sphere gives $\tfrac12\int_{-1}^{1}u^4du=1/5$. Thus the same quadrupole can coexist with different higher directional information. This is a moment calculation at $c_f=1$, not an assertion that either distribution is a retained physical assembly. The target itself already acknowledges higher multipoles at line 366, so this is not a newly demonstrated contradiction in that definition.

A concrete first proof step is to derive the response of each channel to variations of the shared record, identify which part is controlled by $Q_A$, and bound everything discarded. For channel $k$, an estimate of the form $\|\mathcal R_k^{\mathrm{aniso}}\|\le C_k\|Q_A\|+\eta_k$ would make a common quadrupole certificate useful only after the gain $C_k$ and omitted-response bound $\eta_k$ are derived at the tested scale. The gains need not be equal for matter, clocks, and rulers. The candidate fails as a sufficient description if two admissible records with the same $Q_A$ give observably different residuals beyond the declared $\eta_k$ bounds. Its physical application is `inferred` and remains provisional; the moment identities are `derived`. No additional required closure target or corpus edit is authorized by retaining this discussion.

### Explanation — one history, different measurements

A complete physical record is like a movie containing the assembly's constituent positions through absolute time, its admitted causal-root contributions and their weights, its internal cycles, and the relevant medium history. A measurement asks a specified question of that record. A clock procedure identifies successive repetitions of an internal cycle. A ruler procedure compares spatial extents under a declared simultaneity and calibration convention. A signal procedure compares emission and reception events. These procedures use common underlying history while selecting different information from it.

Let $H$ denote the complete relevant history, and fix each measurement protocol, reference branch, and calibration. An observable map is the rule that extracts the reported quantity. Denote these rules by

$$
O_{\mathrm{clock}}[H],\qquad O_{\mathrm{ruler}}[H],\qquad O_{\mathrm{signal}}[H].
$$

The common-history requirement says that these outputs must follow from mutually consistent applications of the same dynamics and medium state. It does not say that a cycle duration, a spatial length, and an arrival-time comparison are equal quantities, or even that they have the same units. Independently adjusting a separate response parameter for each measurement can reproduce agreement without deriving that common origin. Deriving the separate maps from one history is a stronger and physically meaningful requirement.

#### When a tensor is a sufficient summary

A reduced tensor $Q[H]$ retains selected information about the full history. To say that this one tensor is sufficient for a set of observables requires more than saying that it was computed from their common source. For exact sufficiency there must be maps $f_k$ such that

$$
O_k[H]=f_k(Q[H])
$$

for every admitted history in the declared regime, with all other allowed conditioning variables fixed or explicitly included. Thus two admitted histories with the same $Q$ must produce the same observable. Conversely, if an observable is constant over every set of histories sharing $Q$, its value defines a map on the realized values of $Q$. This elementary factorization criterion identifies the actual proof burden. The different $f_k$ need not be identical.

For approximate sufficiency, specify the norm and channel-specific error $\eta_k$ in $\|O_k[H]-f_k(Q[H])\|\le\eta_k$. Two histories with the same $Q$ must then have outputs separated by no more than $2\eta_k$, by the triangle inequality. A larger separation falsifies that error claim. Bounds may depend on a declared scale, branch class, or medium regime; those dependencies cannot be hidden in a supposedly universal tensor.

The preceding quadrupole example illustrates information loss. The six signed Cartesian directions and the uniform sphere have identical second moments and vanishing quadrupole, but different fourth moments. That is a derived mathematical counterexample to universal sufficiency for all directional statistics. It is not a counterexample involving two demonstrated physical assemblies. To establish that $Q_A$ controls particular physical anisotropy channels, derive those channels and bound their dependence on the information omitted from $Q_A$. Different channel gains and remainder bounds are compatible with a shared physical origin.

#### Why the matrices can differ too

An abstract symmetry transformation and its matrix on a chosen kind of data are different objects. Consider only a passive relabeling of Euclidean spatial axes by an orthogonal matrix $R$. A direction vector transforms as $\mathbf n'=R\mathbf n$. A second-moment tensor $Q=\langle\mathbf n\mathbf n^{\mathsf T}\rangle$ transforms as

$$
Q'=\langle(R\mathbf n)(R\mathbf n)^{\mathsf T}\rangle=RQR^{\mathsf T}.
$$

Both formulas describe the same coordinate relabeling. Their operations differ because a vector and a second-moment tensor retain different kinds of information. This identity follows by substitution and linearity of averaging. It assumes no physical rotation of the assembly relative to its medium and imports no substrate dynamical law.

F3-2 applies the same distinction to an explicitly observer-level recovery target. A full collinear Lorentz boost has an exponential representation on event coordinates. A clock reading or simultaneous length comparison is obtained by a further observation procedure. Its scalar factor need not inherit the matrix multiplication law: the previously derived example gives $\operatorname{sech}(2\varphi)=1/7$ when $\operatorname{sech}\varphi=1/2$, whereas multiplying the two scalar factors gives $1/4$. This does not break Lorentz composition. It shows why that scalar factor is not the full boost transformation.

#### Significance and remaining physical question

The general distinction between a record, a summary, a symmetry action, and an observable map is mathematical. The provisional physical insight is that the matter, clock, ruler, and signal channels may admit a useful common reduced description without sharing one identical response matrix. The first proof step is to derive their separate maps from the same admitted histories and identify the retained variables and controlled remainders. The sufficiency claim fails if two admitted histories agree on those retained variables but differ in a measured channel beyond its declared error. A failure of the common dynamical account occurs if the derived maps cannot jointly reproduce the required observations within their stated regime.

This protects the strong idea of physical unity while placing the proof obligation on the actual measurement relations. It also prevents an unjustified scalar or tensor compression from concealing a missing response channel. No universal sufficiency theorem for $Q_A$, physical Lorentz recovery, or new assembly result is established by this explanation.

### Operator correction — lossy compression does not establish physical sufficiency

The operator challenged the suggestion that a tensor remains correct when its construction discards information. The objection is accepted at the level of physical sufficiency: no argument in this review establishes that the framing quadrupole is sufficient for the matter, clock, and ruler responses. Calling it a compression supplies no justification. The earlier explanation moved too quickly from the mathematical possibility of several observation maps to the possible usefulness of a reduced tensor. These are separate claims, and the first gives no evidence for the second. Batch 4 remains paused for this discussion.

A tensor can be correctly defined as a particular statistic while being inadequate for a proposed physical use. In the live chapter, $Q_A^{ij}=\langle\hat n^i\hat n^j-h^{ij}/3\rangle_A^{\mathrm{frame}}$ records a trace-free second directional moment under the declared average. Once the distribution and averaging rule are specified, this definition determines that statistic. It does not establish that the statistic contains all information relevant to an assembly response. The chapter explicitly distinguishes vanishing quadrupole from absence of every anisotropy, then introduces the stronger three-channel control statement as a theorem target. The latter remains unproved in this review.

The loss is concrete: the signed-axis distribution and the uniform sphere both give $Q_A=0$, although their fourth directional moments differ, as derived above. Thus $Q_A$ cannot reconstruct the full framing distribution. This demonstrates information loss at the distribution level. It neither demonstrates that those two distributions are physically admitted assembly histories nor decides whether a specific physical response depends on the lost information. Those are additional dynamical questions.

A lossy summary can still be exact for a restricted question. For example, an arithmetic mean discards the individual entries but determines their total when their count is supplied. It does not determine their variance. Likewise, a reduced tensor is justified for a specified observable only after deriving that observable's dependence on the retained information and proving that changes in the discarded information cannot change the result, or can change it only within a declared error bound. If the tensor is intended to evolve autonomously, one must additionally establish that histories sharing its present value have the same reduced evolution under the admitted conditions. A correct instantaneous statistic alone does not close that evolution.

The exact sufficiency falsifier is a pair of admitted histories with identical retained variables and different target observables. For an approximate factorization with uniform error $\eta_k$ per history, a difference greater than $2\eta_k$ refutes that bound. A claim only to bound a residual, rather than determine it, instead fails when the residual exceeds its proposed bound; unequal residuals alone need not refute an upper bound. The chapter's leading-order quadrupole target therefore needs a specified expansion or regime and control of omitted terms, not a demand that the quadrupole reconstruct every detail of the history.

The tensor transformation rule is a further independent issue. Being a tensor does not itself imply compression: an invertible coordinate transformation loses no information, and a tensor field may encode far more data than a single averaged tensor. The loss in this example arises from retaining only the averaged second moment. The vector-versus-tensor rotation example explains different representations of one coordinate change; it cannot validate discarding physical information.

Current conclusion: $Q_A$ is a defined quadrupole statistic, not a verified sufficient physical description of the three response channels. The general observation-map distinction is derived mathematics. Physical adequacy of the proposed reduction remains unestablished. If derivation shows dependence on omitted variables, the appropriate repair is to retain those variables or narrow the approximation and its domain. No tensor reduction is endorsed by this discussion, and no additional corpus edit is made.

### Supplemental quadrupole assessment — definition, geometry, and physical response

The operator's “do 1” requests examination of the actual framing-quadrupole claim. This is a focused theorem-target review within batch 3, using the corpus-review-workflow skill's live core-geometry-theorem-reviewer procedure. The campaign's explicit authorization of review records and discussion capture permits this account in the existing owners; no reviewed corpus or dependency is edited. Batch 4 remains paused. The complete Absolute Timespace reread from the accepted integration remains attributable to its unchanged SHA-256 `51c8388d72a767588b03e2fd983afde15f8c000818c0b919c3cd09b08291a1ea`.

#### What the live documents assert

[Absolute Timespace](../../../content/markdown/aaa/foundations/absolute-timespace.md), lines 332–350, first makes the assembly response depend on internal history, shielding, medium state, and orientation. Lines 353–366 then introduce $Q_A$ as a symmetric trace-free framing average and explicitly acknowledge that higher anisotropy can survive $Q_A=0$. Lines 368–377 propose a stronger result: a bound on this one tensor should control the matter-sector orientation residual, clock-orientation residual, and trace-free ruler response. The section is a theorem target, not an established theorem. The phrase “The carrier is” at line 353 and the demand that all three effects “descend from the same framing tensor” at line 377 nevertheless need the missing response derivation; they are not consequences of the definition.

[Noether Braid Configuration Space](../../../content/markdown/aaa/noether-braid/noether-braid-configuration-space.md#frame-orthogonality-and-framing-anisotropy), lines 637–696, supplies a finite three-frame representative and separates nonorthogonality from unequal weights. Its last paragraph repeats the proposed physical suppression and explicitly says no measured family comparison bears on these targets. The [Master Equation](../../../content/markdown/aaa/dynamics/master-equation.md), line 1352, calls $Q_A$ a schematic quadrupole leakage of the moving internal delay record. A quadrupole of a delay record is not automatically the same quantity as an average of framing normals: relating their measures and weights is itself part of the missing derivation.

The [Lorentz residual handoff](../master-equation-closure/analysis/lorentz-test-residual-handoff.md), lines 5–11 and 47–65, is schema-complete but population-blocked. It requires histories, root data, clock and ruler records, and medium-response inputs in addition to framing quadrupoles. It supplies no populated three-channel sufficiency certificate. [Lorentz Kinematics](../../../content/markdown/aaa/spacetime/lorentz-kinematics.md), lines 2048–2092, also labels the nearby hierarchy/averaging route a conditional lemma target whose averaging computation is open. Neither a repeated target nor a schema field is independent evidence that the reduction works.

#### Definition: what can already be proved

Work in an orthonormal Cartesian spatial chart, so $h^{ij}=\delta^{ij}$. Once a normalized framing average is declared, define $S=\langle\hat{\mathbf n}\hat{\mathbf n}^{\mathsf T}\rangle$ and $Q_A=S-I/3$, with unit framing directions. Then $Q_A$ is symmetric, and

$$
\operatorname{tr}Q_A=\langle\|\hat{\mathbf n}\|^2\rangle-1=0.
$$

For any unit probe direction $\mathbf e$,

$$
\left\langle(\mathbf e\cdot\hat{\mathbf n})^2\right\rangle
=\frac13+\mathbf e^{\mathsf T}Q_A\mathbf e.
$$

Thus $Q_A=0$ is exactly isotropy of this second directional moment. It establishes neither full distributional isotropy nor isotropy of a physical response. These statements are derived directly from the definition, assuming a normalized average with directions and averaging protocol fixed.

For a physical assembly, that protocol needs more specification. The finite-frame owner writes $Q_A=\sum_a w_a(\hat{\mathbf n}_a\hat{\mathbf n}_a^{\mathsf T}-I/3)$ with $\sum_a w_a=1$, and permits weights supplied by retained action, energy, or angular-momentum tensor data. The cited sections do not select which extraction and normalization supplies the single tensor needed by the three-channel claim. Such prescriptions need not agree. If a probability-average interpretation is used, nonnegative weights must also be established. The algebraic trace identity needs normalization; a physical interpretation and a repeatable computed value need the actual extraction rule. This is a missing definition for the proposed physical theorem, not a demonstrated contradiction in the formal tensor formula.

#### Geometry: the available result stops at the tensor

Let $N$ have the three unit framing normals as columns, and let $\lambda_a=w_a-1/3$. The configuration-space decomposition is the exact identity

$$
Q_A=\frac13(NN^{\mathsf T}-I)
+\sum_{a=1}^{3}\lambda_a
\left(\hat{\mathbf n}_a\hat{\mathbf n}_a^{\mathsf T}-\frac13I\right).
$$

In particular, an orthonormal frame gives $Q_A=N\operatorname{diag}(w_1-1/3,w_2-1/3,w_3-1/3)N^{\mathsf T}$. Equal weights therefore give zero exactly; orthogonality alone does not. For a quantitative bound, use the Frobenius norm, the square root of the sum of squared matrix entries. A unit-direction projector minus $I/3$ has squared Frobenius norm $2/3$, giving

$$
\|Q_A\|_F\le\frac13\|NN^{\mathsf T}-I\|_F
+\sqrt{\frac23}\sum_a|w_a-1/3|.
$$

This follows from the triangle inequality. The determinant limit in the owner is also geometrically sound: unit-column matrices lie in a compact set, and equality in the unit-volume determinant bound requires mutually orthogonal columns. Consequently $|\det N|\to1$ forces $NN^{\mathsf T}\to I$; combining that with $w_a\to1/3$ gives $Q_A\to0$. No delayed-dynamics premise or assembly-stability result enters these algebraic implications. Establishing that retained physical branches approach those limits remains a separate task.

#### A stronger illustration of the information loss

The loss already occurs within the three-frame representation. Take equal weights and the Cartesian triad, then rotate all three normals through $\pi/4$ about the third axis, keeping an external probe direction $\mathbf e=(1,0,0)$ fixed. Both frames are orthonormal, both have determinant 1, and both have $Q_A=0$. The second directional average is $1/3$ in each case. However, the fourth directional average is

$$
\frac13\sum_a(\mathbf e\cdot\hat{\mathbf n}_a)^4
=\frac13\quad\text{for the Cartesian triad},
\qquad
=\frac16\quad\text{for the rotated triad}.
$$

In the rotated triad, the first two projections have magnitude $1/\sqrt2$ and the third is zero, giving $(1/4+1/4)/3=1/6$. Hence even exact frame orthogonality and equal weights do not establish isotropy of every directional statistic. The probe kernel $(\mathbf e\cdot\hat{\mathbf n})^4$ respects a simultaneous rotation of probe and frame, so rotational covariance alone does not exclude it. This is a mathematical diagnostic, not a claimed physical clock or ruler law and not a pair of certified EOM histories. No physical failure follows until a response derived from the master equation actually couples to such discarded information. Numerical arithmetic was checked with $c_f=1$; the example itself is dimensionless geometry.

#### The physical link still required for each channel

| Channel | What the current owner defines | What a quadrupole-control theorem still needs |
| --- | --- | --- |
| Matter orientation | Absolute Timespace lines 332–350 and 381–395: a history-, shielding-, and medium-dependent response matrix and its normalized directional deviation from scalar response | A derivation linking that deviation to the specified framing average, with fixed branch/medium conditions, normalization, and a bound on every remaining anisotropic contribution |
| Clock orientation | [Proper Time and Time Dilation](../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md), lines 13–36: a counted phase rate depending on relative medium velocity, geometry, medium state, and history | A specified clock branch and orientation comparison; a derived effect of the framing tensor on cycle frequency; control of delay, phase, and medium information that the tensor omits |
| Ruler orientation | Absolute Timespace lines 370–375: the trace-free part of the effective spatial response $B_{ij}$ | A ruler extraction and calibration from the same retained histories, with a derived response to framing and a bound on other medium, shape, and strain contributions |

“Leading” needs a named asymptotic parameter and regime. Small $Q_A$ alone is not that parameter: higher moments can remain nonzero while $Q_A$ vanishes. A small input moment also needs a bounded response gain before it yields a small output residual. The physical target is therefore not theorem-ready until these definitions and estimates are supplied. Its coherence is conditional; the inspected records do not establish its truth or its falsity for actual branches.

#### A narrow sufficient lemma and the first dynamical test

A simple derived lemma shows exactly what would justify discarding higher directional moments for a particular question. Suppose a dimensionless channel response, after fixing its other inputs and deriving its reduction from the full history, has the form

$$
O_k(\mathbf e)=a_k+b_k
\left\langle(\mathbf e\cdot\hat{\mathbf n})^2\right\rangle
+\rho_k(\mathbf e),
\qquad
\sup_{\|\mathbf e\|=1}|\rho_k(\mathbf e)|\le\eta_k.
$$

Here the averaging measure is the declared framing measure, $a_k,b_k$ are direction-independent coefficients, and the remainder bound is uniform in probe direction on the declared branch regime. Substitution gives

$$
\sup_{\|\mathbf e\|=1}
\left|O_k(\mathbf e)-\left(a_k+\frac{b_k}{3}\right)\right|
\le |b_k|\,\|Q_A\|_{\mathrm{op}}+\eta_k,
$$

where the operator norm is the largest absolute eigenvalue of this symmetric tensor. This is a proved conditional averaging identity, not a newly derived physical response law. It answers one narrow question: a quadratic directional response is controlled by the second moment, provided the remainder is independently bounded. The fourth-moment example demonstrates why the quadratic-response premise cannot be inferred from orthogonality or rotational covariance.

The strongest next physical foothold is to derive one channel's response on an already admitted branch before claiming all three. A clock channel is a concrete first candidate because its observable is the counted phase rate. Hold branch identity, medium conditions, comparison protocol, and retained-history conventions fixed. Derive its orientation sensitivity from the full delayed return problem, without replacing the input by $Q_A$ in advance. Then determine whether changes of admissible history that leave the chosen framing moment unchanged alter that frequency. For a differentiable exact reduction, a necessary local condition is that every allowed variation $\delta H$ satisfying $DQ_A[\delta H]=0$ also satisfies $DO_{\mathrm{clock}}[\delta H]=0$. Finding a violating variation refutes first-order sufficiency at that branch. Passing this test is necessary only; global control and higher-order errors still require proof. Use a valid recurrent branch and its actual variational problem, never a stability analysis around an unoccupied equilibrium.

The reduced description fails as an exact predictor if equal retained variables yield different target responses. A proposed upper-bound certificate instead fails when a response exceeds its stated gain-plus-remainder bound. If lost information matters, retain it or restrict the claim's regime. Neither outcome requires abandoning the common microscopic dynamics.

#### Disposition and smallest sufficient repair

The geometric identities above are derived. The actual three-channel reduction and a unique physical weighting prescription remain unestablished in the inspected owners. The newly identified actionable clarification is supplemental to the completed F3-1 through F3-7 corrections: describe $Q_A$ as a candidate quadrupole diagnostic, make the averaging prescription a declared branch input, and state that its control of the three responses requires derived channel maps and uniform remainder estimates. Do not make this particular tensor economy a necessary condition of physical recovery unless that necessity is separately established. At assessment time this recommendation awaited operator discussion and authorization, and the corpus was unchanged. The subsequent accepted integration below supersedes that pending disposition. It does not authorize choosing convenient weights, changing the master equation, or opening a new theory campaign.

The proof search used exact-symbol and framing/quadrupole searches across the live corpus and priority Markdown, followed by reads of the relevant owner passages. It is evidence about those identified owners, not a claim to have excluded every unpublished derivation or alternate notation. The existing three-frame geometry, the master equation's schematic delay quadrupole, the open averaging route, and the blocked handoff do not complete the missing physical implication. The two-triad arithmetic was checked directly and with Node; this is author self-check against the displayed exact identities, not independent physical validation.

Reviewed dependency SHA-256 values: configuration-space `9a51cc3a0e2bd5652d0c869a651dc6622f5fbf2303382fc62b3252d7d4b36ccb`; Master Equation `dbb88e073d51b5980e0520c0720439e803eeab35b350c49b3dd67adc3f036a3d`; Proper Time and Time Dilation `1c9e2edf73ff74dfa6a66492e1b4b03e17d892796e2502811e531f7f7c74a51b`; Lorentz Kinematics `42400ee4ee2bdebe5575a24ae46d74607eee5b96f1053c60fac18de778c8ef53`; residual handoff `71160e2385464b406e74e4b37f4910045841cfe5923a84680d1f037e1a550a61`. No generated artifact, code, or controlled canon was edited. Dependency reads do not count as new Foundations campaign coverage.

The new assessment was reread; its 44 mathematical expressions parsed with the vendored KaTeX instrument, its local file targets resolved, and `git diff --check` passed. The reviewed Foundations source hash remained unchanged. These checks validate document syntax and preservation, not the proposed physical reduction.

### Complete-reading assessment and verification limits

The chapter substantially succeeds at separating fixed geometry, complete-history state, physical medium content, and observer reconstruction. The product manifold and slice definitions, fixed distance and duration formulas, and Cartesian derivative operators are correct. Spatial arclength assumes the forward interval $T_1\le T_2$ and an integrable speed; the regularity section supplies the intended future-directed setting. The low-speed momentum and energy formulas are explicitly at assembly/observer level and are not imported as architrino mass. No mass derivation is claimed by their appearance. The response and experimental projections remain open.

The Newton-Cartan discussion is defensible as written: $h$ is explicitly a metric on $\ker dT$, not a nondegenerate spacetime metric. Compatibility means preservation of that spatial subbundle metric. It does not fix all mixed connection components, so the additional flat torsion-free connection remains needed. This interpretation agrees with the intrinsic formulation in [Bekaert and Morand](https://arxiv.org/abs/1412.8212). A criticism based on silently extending $h$ to a different full covariant four-tensor would target an object the chapter did not declare. No canon change or import of Newtonian gravity is recommended.

The rotating-frame formula follows by differentiating $\mathbf X=R\mathbf X'$ twice and defining $R^{\mathsf T}\dot R\,\mathbf y=\boldsymbol\Omega\times\mathbf y$ in the rotating axes. This produces the displayed Coriolis, centripetal, and Euler signs. Explaining that convention for $\boldsymbol\Omega$ would be helpful but is a small exposition preference rather than a demonstrated sign error. The passive boost substitution gives exactly the displayed $+\mathbf U(T_r-T_t)$ root term; it preserves the spherical radius while shifting the center by $-\mathbf U(T_r-T_t)$ from the emission coordinate. No curvature or primitive magnetic interaction follows from those coordinate effects.

The signed playback derivative is also correct: implicit differentiation gives $-F_{T_r}/F_{T_t}=(c_f-\hat{\mathbf r}\cdot\mathbf V_i)/(c_f-\hat{\mathbf r}\cdot\mathbf V_j)$. The target's $F$ is $c_f$ times the Master Equation's delay-map function, so its signed roots agree for $c_f>0$. Generic folds preserve the local signed degree and change the unsigned count by two; boundary events are a separate mechanism. F3-1 must be resolved before stronger root-diagnostic interpretations are used, and none is accepted here. Assembly survival, common limiting speeds, and photon or gravitational-wave recovery remain theorem targets, not results of this review.

The effective metric components follow exactly by expanding the displayed shifted spatial square after setting $x^0_{\mathrm{eff}}=c_0t_{\mathrm{eff}}$. The cross term has the stated negative sign and factor $1/c_0$. Positive $A$ and positive-definite $B$ yield Lorentzian signature; along a physical clock trajectory, the right-hand side of the proper-time equation must be positive. The metric ansatz still requires a derived clock/ruler/signal response and supplies no cosmological scale identification on its own, consistent with F2-2.

The sole external numerical benchmark was checked in the January 2026 [Data Tables for Lorentz and CPT Violation](https://arxiv.org/pdf/0801.0287): Table D10, PDF page 38, includes proton-sector H-maser bounds at $2\times10^{-27}$ GeV and an Hg/Cs comparison at $10^{-27}$ GeV. This supports the chapter's qualified order-of-magnitude statement, not a universal dimensionless bound on its response tensor. The table mixes coefficient combinations and model-dependent interpretations; no primary experimental records were reanalyzed, and the chapter correctly requires a channel-specific projection. No extra reference is recommended merely for citation count.

The vendored KaTeX instrument parsed all 204 mathematical expressions. All 55 display blocks and all target bytes are unchanged; all 67 local file-link occurrences resolve to existing targets. These are syntax, preservation, and file-target checks, not a rendered-page visual audit or comprehensive fragment validation. The local root, boost-composition, and rest-shape examples were checked directly and with elementary Node arithmetic; the arithmetic is author self-check, not an independent mathematical oracle. The cited mathematical sources are independent references only for their identified background statements. No EOM simulation, independent assembly validation, global history well-posedness proof, experimental reanalysis, or scientific closure is claimed.

### F3-1 through F3-7 accepted integration — 2026-09-05

The operator explicitly requested application of all seven findings and an explanation of the common-record insight. The live integrator-reviewer procedure governed this integration. Immediately before editing, the target matched the reviewed SHA-256 `f0fce6751a516b7d1c117f82b7b0af18e810052830036c331bc861d33ea8437c`; a baseline copy was retained for comparison. All seven findings were accepted and implemented. No finding was rejected or deferred. No correction outside those findings was added. The original review, examples, source checks, and baseline locations above remain the historical basis of the decisions.

| Finding | Implemented correction | Resulting source location |
| --- | --- | --- |
| F3-1 | Separate a conditioning margin from a singular root; control retained boundaries and pair set; define the signed inventory at each reception time | [Root conditioning](../../../content/markdown/aaa/foundations/absolute-timespace.md#causal-wake-geometry), lines 561–643 |
| F3-2 | Declare the boost action on recovered event coordinates and distinguish it from clock, ruler, and signal extraction maps | [Theorem target](../../../content/markdown/aaa/foundations/absolute-timespace.md), lines 684–698 |
| F3-3 | Normalize positive radii to rest values, fix comparison conditions and clock calibration, and state the velocity and residual domains | [Rest-branch comparison](../../../content/markdown/aaa/foundations/absolute-timespace.md), lines 661–682 |
| F3-4 | Define the filled set as passage by time; distinguish direct support from history-mediated influence | [Causal wake geometry](../../../content/markdown/aaa/foundations/absolute-timespace.md#causal-wake-geometry), lines 489–538 |
| F3-5 | Order instants and slices; derive exclusion of backward causal loops from admissibility and wake support | [Absolute Timespace](../../../content/markdown/aaa/foundations/absolute-timespace.md), lines 50, 80, and 606 |
| F3-6 | Define complete weighted cell fluctuations, state covariance and packing bounds, derive the shell estimate, and delimit martingale convergence and exhaustion | [Conditional convergence](../../../content/markdown/aaa/foundations/absolute-timespace.md#when-the-lemma-becomes-a-theorem), lines 811–852 |
| F3-7 | Name the ten-generator Poincare group and distinguish its six-generator Lorentz subgroup | [Symmetry recovery](../../../content/markdown/aaa/foundations/absolute-timespace.md), line 659 |

All 928 resulting lines were reread, and the complete diff was compared with the preserved baseline. The resulting SHA-256 is `51c8388d72a767588b03e2fd983afde15f8c000818c0b919c3cd09b08291a1ea`. The 55 display blocks remain in their original order; exactly four changed, at one-based display indices 40, 42, 51, and 52, implementing the reception-time inventory, normalized shape ratio, weighted covariance, and expanded shell-variance derivation. The other 51 display blocks are byte-identical. All link targets and labels were preserved. All 240 mathematical expressions parse with the vendored KaTeX instrument, and all 67 local file-link occurrences resolve. These are syntax and target-existence checks, not a rendered-page visual audit or comprehensive fragment validation. The equation-mapping link validator passed for its 23 registered links; that registry check does not claim exhaustive validation of all 55 chapter viewer anchors.

The root and support counterexamples, normalized zero-speed limit, boost-composition distinction, covariance expansion, and conditional martingale argument were rechecked as author self-review. The independently authored probability lectures and group-theory notes cited in the original review support only the respective mathematical background statements. No EOM simulation, independent physical validation, recovery theorem, or proof that the actual Noether sea satisfies the statistical hypotheses was produced. The target's remaining common-response, conservation, experimental-projection, and physical statistical obligations retain their original open status.

The strict content check returned 0 errors and 1 warning, exiting 1 because `content/scenes/scenes_index.json` lacks the existing `content/scenes/archie/feedback.json` entry. Its regeneration command is `node scripts/validate-content.mjs --write`, reserved for the established regeneration or PR owner. The equation-registry freshness check also exited 1 and reported `content/generated/equation-mapping/corpus-equations.json` stale; its regeneration command is `node scripts/build-equation-mapping-corpus.mjs --write`, likewise reserved for the established regeneration or PR owner. Existing equation-registry drift predates this integration, and the four accepted display changes now also require the normal generated refresh. No generated artifact was written. `git diff --check` passed after the source and record edits.

### Supplemental quadrupole clarification accepted and verified — 2026-09-05

The operator's “1” accepts the immediately preceding recommendation to clarify the Foundations passage. The live integrator-reviewer procedure governed the edit. Absolute Timespace matched the assessment hash `51c8388d72a767588b03e2fd983afde15f8c000818c0b919c3cd09b08291a1ea` immediately before editing, and a baseline copy was retained for comparison. Four targeted passage replacements at resulting lines 353–381 identify $Q_A$ as a candidate diagnostic, declare unit framing directions and normalized averaging with a fixed extraction/interval/weight prescription, preserve the distinction between zero quadrupole and physical isotropy, and make the three-channel theorem conditional on derived responses and controlled omitted terms. The text no longer makes sufficiency of this particular tensor necessary for the underlying physical account. It selects no physical weights and claims no new physical reduction.

All 932 resulting lines were reread. The complete incremental diff is confined to those passages. All 55 display equations, all link labels and targets, and all source text outside the four replaced passages are preserved relative to this immediate baseline. All 245 mathematical expressions parsed with the vendored KaTeX instrument; all 67 local file-link occurrences resolve. The registered equation-link checker passed for its 23 entries. These checks establish syntax and file-target validity, not comprehensive fragment or rendered-page visual validation. The clarification was checked against the direct geometric identities and explicit counterexamples in the preceding assessment as author self-review. No independent physical validation, branch evolution, or clock/ruler response derivation is claimed.

The resulting SHA-256 is `6dfc68496c19792463d3093f1f160ebd519496e4149190bcded0c971c3d7c603`. The strict content check again reported 0 errors and 1 warning, exiting 1 for the existing `content/scenes/scenes_index.json` drift. Its repair command remains `node scripts/validate-content.mjs --write` under the regeneration or PR owner. The previously recorded equation-registry drift remains with that owner; its freshness check was not repeated for this passage-only clarification. No generated artifact was written. `git diff --check` passed after the source and record edits.

The supplemental correction is complete. The mathematical question of which physical weights and response maps are justified remains open, and downstream reviews must inherit that limit. No canon, dependency chapter, application code, or generated artifact was edited. The campaign remains at five reviewed Foundations files; Absolute Time Defense has not been started.

### Current discussion boundary after batch 3

Coverage is 5 of 9 complete target readings: 5 chapters with their accepted corrections verified, including the supplemental quadrupole clarification; 0 chapters have findings awaiting implementation decisions, 0 reviewed unchanged with no recommended correction, 0 explicitly deferred or blocked files, and 4 not yet reviewed. F3-1 through F3-7 are integrated. The explanation of the common-record insight is recorded above; its physical sufficiency and response-map questions remain provisional and open, separate from coverage and correction completion.

This integration edits only Absolute Timespace and the two existing campaign records. Prior Euclidean Void work is preserved. The next planned review is Absolute Time Defense alone. This turn stops for discussion; it does not start batch 4. A subsequent “next” or “continue” authorizes that review, not unaccepted corpus implementation. No controlled canon, application code, or generated artifact was changed.

## Foundations batch 4 — Absolute Time Defense review, 2026-09-05

The operator's “do 1” accepts the preceding recommendation to resume batch 4. The live corpus-reviewer procedure governs this complete single-document review; the campaign authorizes findings and discussion capture in these existing working documents. It does not authorize implementation of this batch's findings. All 785 lines of [Absolute Time Defense](../../../content/markdown/aaa/foundations/absolute-time-defense.md) were read. Baseline and end-of-review SHA-256 are `ecc01d492409e390ac8c31669754c17b91dcb6e41e6fe9c1ebdf9fe37c641a6b`; the chapter remained byte-identical to the retained review snapshot. Git HEAD was `6597f62a05e4d91a0c1719e32a4b50e917ef408f`. Existing Absolute Timespace and Euclidean Void edits were preserved.

The recursive inventory still contains the same nine documents. Textbook traversal, the human-readable TOC, and scene order continue to put this chapter sixth, after Absolute Timespace. The historical Foundations conversion and review records were consulted at their recorded scope. Their previous equation-preservation and review receipts do not settle the present arguments. Dependencies included the corrected Foundations chapters, the Master Equation, Proper Time and Time Dilation, Lorentz Kinematics, Emergent Metric, the framing discussion in Noether Braid Configuration Space, and the effective-Hamiltonian memory discussion. These are dependency reads, not additional completed campaign targets.

### Findings awaiting discussion

| Finding | Classification and importance | Reviewed source location | Smallest sufficient repair |
| --- | --- | --- | --- |
| F4-1 | Demonstrated algebraic inconsistency; high | `absolute-time-defense.md:325–354`, compared with `555–564`, `582`, and `738–740` | Make the clock target agree with its declared metric by including the clock factor squared in the velocity denominator; state the timelike domain. |
| F4-2 | Unsupported response identification and conflict with the accepted compression boundary; high | `absolute-time-defense.md:356–390` | Treat the framing quadrupole as a specified candidate statistic and its scalar-gain response formula as conditional; require the channel derivation and control of omitted information. |
| F4-3 | An open Hamiltonian condition is promoted to a universal clock condition; high | `absolute-time-defense.md:165–176` | Keep phase repeatability as the clock requirement, label the memory-flux construction as an open condition for a proposed Hamiltonian description, and remove the unproved implication to secular frequency drift. |
| F4-4 | Missing explanation connecting recurrence to elapsed-time frequency; medium | `absolute-time-defense.md:127–143` | Supply the physical phase lift and return-time data needed to turn rotation per return into a clock rate. |

#### F4-1 — The clock and metric predict different rates

A clock equation and a metric claimed to describe that clock must assign the same elapsed time to the same path. The chapter uses the same clock function $A$, ruler tensor $B_{ij}$, effective time, and relative velocity in both places. At zero declared residuals, its clock target is

$$
r_{\mathrm{clock}}=A\sqrt{1-q},
\qquad
q=\frac{B_{ij}w^iw^j}{c_0^2}.
$$

Here $r=d\tau/dt_{\mathrm{eff}}$, and $q$ is dimensionless. Dividing the metric at lines 555–564 by $dt_{\mathrm{eff}}^2$ instead gives

$$
r_{\mathrm{metric}}^2=A^2-q,
\qquad
r_{\mathrm{metric}}=A\sqrt{1-\frac{q}{A^2}}
$$

on the positive-rate branch with $A>0$ and $q<A^2$. Squaring the first formula gives $A^2-A^2q$, so the squared rates differ by $(1-A^2)q$. They agree at rest or at $A=1$, but not for general moving clocks in a dressed medium. There is no stated redefinition of $B_{ij}$ between these formulas. The metric also agrees with the declared form in [Emergent Metric](../../../content/markdown/aaa/spacetime/emergent-metric.md), lines 135–171.

A numerical comparison uses normalized wake-speed units $c_f=1$ and, solely for this effective comparison chart, chooses $c_0=1$, $A=1/2$, $B_{ij}=\delta_{ij}$, and $\mathbf w=(1/4,0,0)$. This choice of $c_0$ is not a physical identification of dressed and primitive speeds. Both square roots are real, but the chapter's clock gives $\sqrt{15}/8\approx0.484123$, while its metric gives $\sqrt{3}/4\approx0.433013$. These are direct evaluations of two declared targets, not simulated assembly clocks.

The discrepancy cannot generally be hidden in the fourth-order velocity remainder. For fixed positive $A$ and small $q$, the two expansions are $A-Aq/2+O(q^2)$ and $A-q/(2A)+O(q^2)$: the difference already occurs at second order in velocity. In a joint weak-field expansion where $A-1$ is also small, the discrepancy is a mixed higher-order term. Consequently the chapter's correctly signed first-order weak-field benchmark at lines 444–476 does not need to be rejected along with the general formula.

The same defect reaches signal comparison. The original clock square root vanishes at $q=1$, whereas the metric null condition is $q=A^2$. The photon speed at lines 738–740 follows the latter. A common clock/ruler/signal account cannot retain both thresholds under the present shared definitions.

The smallest repair is to put $A^2(\mathcal N_{\mathrm{sea}})c_0^2$ in the denominator inside the clock square root, preserve its residual bracket and recovery-target status, and explain the domain $B_{ij}w^iw^j<A^2c_0^2$. The positivity explanation at line 582 also needs this qualification: positive $A$ gives the rest-clock lapse, while positive elapsed proper time along a moving clock additionally requires a timelike path and a valid advancing phase. This corrects internal algebra; it does not derive the metric from the Master Equation.

Claim grade: derived contradiction between the displayed formulas. A falsifier would be an explicit, consistently applied distinction between the two ruler tensors or velocity normalizations that makes the expressions identical; the reviewed definitions supply none. Resolve this finding before interpreting later preferred-frame measurements through this clock target.

#### F4-2 — A framing moment is not yet the clock response

The chapter correctly notes that a vanishing quadrupole does not exclude higher directional moments, correctly separates harmonic degree from a small-angle power, and explicitly states the reciprocity assumption needed to omit odd harmonics. Those qualifications should be preserved. The stronger opening assertion at line 356 nevertheless identifies orientation leakage with the framing quadrupole, and the formula at lines 373–384 assigns its entire retained quadrupolar clock response to one scalar multiple of that statistic.

A quadrupole describes a selected second directional moment. A clock response describes what the clock's dynamics does when its environment or orientation changes. Their equality requires a response derivation. Being symmetric trace-free tensors does not make two tensors proportional. For example, in one Euclidean orthonormal frame, the statistic $Q=\operatorname{diag}(1/6,-1/6,0)$ is realized by axis weights $(1/2,1/6,1/3)$. The possible mathematical response coefficient $C=\operatorname{diag}(0,1,-1)$ is also symmetric and trace-free, but no scalar $\lambda$ satisfies $C=\lambda Q$. This is a counterexample to the tensor-type inference, not evidence that an actual clock has coefficient $C$.

The accepted batch-3 example supplies the complementary information-loss check. Equal weights on an orthonormal triad give $Q=0$. Rotating two axes through 45 degrees leaves $Q=0$, but changes the fourth directional moment along a fixed first-axis probe from $1/3$ to $1/6$. Small or zero $Q$ therefore does not bound all information that an as-yet-underived clock response may use. Nor does small $Q$ alone bound a response with an uncontrolled gain $\lambda_{\mathcal A}$.

The framing average must specify unit directions, normalized weights with $\langle1\rangle=1$, and the physical sampling window. Those choices are especially material when different branches or probes are compared. A geometric weighting, an action weighting, and a causal-hit weighting cannot be interchanged merely because each produces a second-rank tensor. The corrected Absolute Timespace discussion at lines 353–381 already states this boundary and leaves physical weighting and response sufficiency open.

The smallest repair is an explanatory clarification: identify $Q$ as a candidate diagnostic under a declared averaging prescription, label the scalar-gain equation as a conditional leading-response ansatz, and require the dynamics to derive its gain and the influence of omitted moments or other history variables. Preserve the common-record proposal at its defensible level. The last sentence at line 390 also needs the response-map and remainder-control conditions before small framing anisotropy can constrain the four named measurement channels. Geometric near-orthogonality and nearly equal weights alone do not establish that inference.

Claim grade: the second-moment identities and non-proportional-tensor counterexample are derived; physical sufficiency is an open obligation. The insufficiency concern for a selected channel would be discharged by an actual branch-response derivation proving dependence through this statistic to a declared error, with a bounded gain and omitted terms. A pair of admissible histories with equal declared $Q$ but clock responses differing above that error would falsify the proposed reduction. The earlier common-record insight remains held at the operator's requested boundary; this review does not revive it as evidence for compression.

#### F4-3 — Memory bookkeeping does not by itself determine clock drift

A repeatable clock phase and a conserved symplectic structure answer different questions. The first concerns the rate of a recurring observable. The second concerns the geometric structure used to represent a system by Hamiltonian mechanics. At lines 165–176 the chapter calls the memory-flux condition another form of the clock certificate, requires it of every valid clock, and infers secular rate drift from uncompensated leakage. Neither equivalence nor the frequency implication has been derived there.

The live [Effective Lagrangian](../../../content/markdown/aaa/dynamics/effective-lagrangian.md) owner is more limited. Lines 903–933 introduce a candidate memory-corrected symplectic two-form and explicitly leave construction of its kernel and the boundary-flux identity open. Lines 935–946 discuss validity of a Hamiltonian description and failure to conserve the corrected symplectic form or apparent energy ledger when relevant memory is omitted. That is not a theorem that every persistent phase needs such a description, or that any defect in it must cause the phase frequency to drift. The present finding concerns the promotion in Foundations; it does not edit or certify the upstream construction.

A simple mathematical comparison separates the two properties. On a cylinder with angular coordinate $\theta\in\mathbb R/(2\pi\mathbb Z)$ and transverse coordinate $r$, consider

$$
\frac{d\theta}{dt_{\mathrm{eff}}}=\Omega,
\qquad
\frac{dr}{dt_{\mathrm{eff}}}=-\kappa(r-r_0),
\qquad
\Omega>0,\quad\kappa>0.
$$

The closed orbit $r=r_0$ has constant phase rate $\Omega$ and period $2\pi/\Omega$. A transverse displacement decreases as $\exp(-\kappa t_{\mathrm{eff}})$, and the two-dimensional area form $dr\wedge d\theta$ is multiplied by the same factor under the flow. Thus constant clock phase is mathematically compatible with a contracting reduced chart. In normalized wake-speed units $c_f=1$, choosing $\Omega=1$, $\kappa=1$, and $r_0=1$ gives period $2\pi$ and area multiplier $e^{-2\pi}\approx0.00186744$ per period, with no frequency drift. This is an illustrative dynamical system, not an architrino solution, a derived dissipative mechanism, or a realization of the proposed memory-flux object. It refutes the general inference from failure of symplectic preservation to frequency drift; any special implication for the delayed dynamics still needs proof.

The notation for the memory-boundary expression also needs an operational definition before its size can be checked: identify the transported quantity, its evaluation or contraction over a return, the retained window and boundary convention, and the norm and scale behind $\epsilon_\omega$. Because the boundary object itself has not been defined, this review does not assert that the displayed integral has a demonstrated differential-form type error. It identifies a missing construction rather than guessing its intended type.

The smallest repair is to preserve repeatability of the relevant phase and history as the clock criterion; describe memory-corrected symplectic replay as an additional, currently open condition for the proposed Hamiltonian representation; and replace the categorical frequency-drift statement with the need to compute the influence of omitted or exchanged history on the phase. The existing warning to include external driving and exported fluxes remains useful.

Claim grade: unsupported promotion, with a derived mathematical separation of the two properties. A falsifier of the concern would be a theorem from the declared delayed dynamics connecting the defined boundary residual to loss of phase repeatability or a quantified secular clock-rate change. No such theorem was found in the cited owner. Until it exists, failure of this proposed Hamiltonian chart cannot by itself be used to reject an otherwise demonstrated recurring clock branch.

#### F4-4 — Rotation per return needs a physical time scale

A rotation number says how much a phase advances when the section is crossed again. A frequency says how much phase advances per unit time. The formula at lines 127–133 supplies the former modulo one, but the adjoining clock explanation does not supply the physical turn count and return durations needed for the latter. The orientation-preserving circle-homeomorphism case is a valid sufficient setting for the stated rotation-number limit; the proposed repair does not discard that result or conflate it with a periodic-orbit clock.

Let $\theta\in\mathbb R/\mathbb Z$ measure phase in cycles. A lift $\tilde P:\mathbb R\to\mathbb R$ satisfies $\tilde P(x+1)=\tilde P(x)+1$ and retains unwrapped phase. Lifts differing by an integer give the same circle map. For example, $\tilde P_1(x)=x+1/4$ and $\tilde P_2(x)=x+5/4$ both give rotation number $1/4$ modulo one while recording different complete turn counts. The continuous physical phase between returns must select the lift; a convention that discards turns cannot recover them later.

The elapsed effective time between returns must also be retained. Write $r(\theta)>0$ for this duration, and $\theta_k=P^k(\theta)$. If the unwrapped phase advance per return has a limit and the mean return duration has a finite positive limit, then the mean angular frequency is

$$
\overline\Omega
=
2\pi\lim_{n\to\infty}
\frac{\tilde P^{\,n}(\theta)-\theta}
{\sum_{k=0}^{n-1}r(\theta_k)}.
$$

The numerator counts cycles; the denominator measures elapsed effective time. In units with $c_f=1$, the same unwrapped advance of $1/4$ cycle per return with return durations one and two gives $1/4$ and $1/8$ cycle per unit time. No change in the circle map is needed. This direct rescaling demonstrates why its rotation number alone is insufficient.

The smallest repair is a short explanation of the physical lift and return-time function, with the frequency relation and its existence conditions. The full retained trajectory can contain both; the issue is their absence from the stated reduction, not evidence that such data do not exist. Mean frequency also does not by itself prove bounded timing jitter or a continuously advancing instantaneous phase; those remain part of the phase-coherence certificate.

Claim grade: derived information requirement and missing explanation. A falsifier of the insufficiency claim would be a rule recovering a unique unwrapped phase rate from the same modulo-one return map without any physical turn-count or elapsed-time information; the explicit examples exclude that possibility in the stated mathematical class. For a particular assembly, supplying those data and checking phase coherence would discharge the explanatory gap without proving universality across clock species.

### Complete-reading assessment and source support

The opening ontology and state discussion, lines 1–118, separates the substrate projection $T$, a state indexed on its slice, and an assembly readout. The product-space projection makes $dT$ nonvanishing; an arbitrary global scalar function would not suffice, so that earlier product-coordinate premise is material. The state explicitly retains history, and determinism is restricted to well-posed charts. No standard-physics equation is needed as a substrate premise for these statements. The local phase-rate formula explicitly uses effective time for both rates. When relating it to a source using phase per absolute time, the ordinary chain rule supplies the conversion; the explicit convention is not an algebraic contradiction.

Lines 119–213 distinguish periodic and invariant-circle clocks and keep transverse persistence separate from contraction of the complete history flow. Those distinctions are valuable; F4-3 and F4-4 address the remaining overstatement and explanation gap. The medium tuple contains an ellipsis and explicitly denies that one delay scalar supplies the state. It should continue to be understood as a record whose relevant contents need specification, rather than as proof that the displayed finite descriptors are sufficient.

Lines 215–323 describe universality as an open target. The connected-moduli route correctly needs reference agreement, controlled transport, and holonomy control, not just a vanishing local commutator. The spectral route explicitly assumes a controlled low-frequency reduction and leaves its contamination estimate conditional. Disconnected branches defeat one proof route without logically forcing different effective coefficients. No new finding is needed to weaken these already qualified claims. None supplies a computed medium gap, a constitutive map, or a universality theorem.

Lines 325–547 distinguish clock composition from differential free fall, retain the negative Newtonian potential convention, and treat Lorentz and gravitational formulas as observer-level targets. The first-order weak-field square-root expansion has the stated signs. The round-trip speed has the right distance-over-time units under its declared path convention. Reciprocal path reversal removes odd directional harmonics, but does not by itself bound the retained even harmonics. F4-1 and F4-2 identify the substantive remaining defects in this portion.

The numerical source checks are independent checks of attribution, not independent experimental reanalysis or validation of the proposed theory. The [MICROSCOPE publication](https://journals.aps.org/prl/abstract/10.1103/PhysRevLett.129.121102) supports the quoted platinum/titanium differential-acceleration result and its statistical/systematic uncertainties. The instrument was the satellite's differential electrostatic accelerometry; it did not measure the clock-composition residual. The [Nagel author abstract](https://arxiv.org/abs/1412.6954) supports the quoted resonator frequency result and 95% confidence interval. It supplies an orientation-sensitive oscillator benchmark, not a universal bound on every clock or material response.

The five historical PPN values match Table 4, printed page 46, in the [published 2014 Will review](https://s3.cern.ch/inspire-prod-files-0/0c108cd9f65d955d209cb441fc3da582). The initially retrieved March 2014 arXiv draft has a different $\alpha_1$ entry; the published version linked by the chapter confirms its $4\times10^{-5}$ value. This version difference is not a chapter error. The review compiles different instruments and includes strong-field pulsar interpretations, as the chapter states; it is not an original five-parameter experiment or a current-limit claim. The [Data Tables author record](https://arxiv.org/abs/0801.0287) confirms a coefficient-specific catalogue across matter, photon, neutrino, and gravity sectors, with a 2026 edition available. No particular modern coefficient was selected or imported as a substrate premise, and no new claim about the tightest current bound is made.

Lines 549–785 export the effective metric, state its conditional affine-equivalence lemma, separate forward reduction from recovery of discarded microscopic information, and limit the final falsification claim to the proposed recovery branch. Direct substitution verifies the constant-coefficient transformation: $dt'_{\mathrm{eff}}=A\,dt_{\mathrm{eff}}$ and $dy^a_{\mathrm{eff}}=L^a{}_i(dx^i_{\mathrm{eff}}-u^i_{\mathrm{sea,eff}}dt_{\mathrm{eff}})/c_0$ reproduce the stated metric when $B=L^TL$. Expanding it verifies the signs and factors of $g_{00}$, $g_{0i}$, and $g_{ij}$, and its null condition gives the displayed directional photon speed. These checks establish algebra conditional on the assumed universal metric; they do not derive that metric, eliminate the substrate frame, or establish global preferred-frame hiding.

The singular-value floor is meaningful for conditioning on the declared reduced complement: it limits amplification when reconstructing those retained directions. It does not bound the largest forward derivative or recover omitted history. The prose's general word “sensitivity” could be made more explicit as an optional editorial clarification, but no separate finding is needed to replace its already qualified reduced-chart scope. The final experimental ceiling must continue to be read with the chapter's declared species, channel, and coefficient map; there is no license to apply one resonator number to arbitrary clock observables. Any later application must make that mapping explicit.

### Validation, dependencies, and current discussion boundary

The unchanged chapter contains 40 display blocks and 117 mathematical expressions accepted by the vendored KaTeX parser. Its 51 local file-link occurrences resolve to existing targets. These are syntax and file-target checks, not a visual rendering audit, comprehensive fragment validation, or physical verification. The clock comparison, directional-moment example, phase-flow example, and return-time example were checked directly and evaluated with elementary Node arithmetic. That arithmetic is author self-check of the displayed derivations, not a separately authored mathematical oracle. No EOM simulation, clock-response computation, raw experimental reanalysis, or independent physical validation was performed.

Dependency hashes at review completion: Absolute Timespace `6dfc68496c19792463d3093f1f160ebd519496e4149190bcded0c971c3d7c603`; Effective Lagrangian `9d974db22027ba28beeadcaca9ed1d01b9a00b345434f33a0da690bf33336aed`; Emergent Metric `0f970b44565e9dfcfd2407e4344341d4f44ad0c0d582290ed38f93ea8d504f72`. The first retains the accepted lossy-compression boundary; the second leaves its memory construction open; the third supports the metric convention used in F4-1. These dependencies do not authorize edits outside Foundations or close their theory obligations.

Coverage is 6 of 9 complete target readings: 5 chapters with accepted corrections verified, 1 chapter with findings awaiting decision, 0 reviewed unchanged with no recommended correction, 0 explicitly deferred or blocked files, and 3 not yet reviewed. F4-1 through F4-4 remain unaccepted and unimplemented. Batch 5 contains Detecting the Absolute Frame and Constructing the Absolute Frame, followed by Emergence of Structure in batch 6. Resolve F4-1 before reviewing any inference that depends on the conflicting clock/metric convention; if the operator defers it, carry both formulas and the resulting interpretation limit explicitly. The physical response-map and memory-construction obligations remain open independently of review coverage.

The complete new assessment was reread. Its 85 mathematical expressions parsed with the vendored KaTeX instrument, its three local file-link occurrences resolved, and `git diff --check` passed. The final inventory reconciliation found no omitted TOC or scene-graph path. These record checks do not add scientific evidence to the findings.

This turn changes only the two existing campaign records. It stops for operator discussion. Previously reported generated scene-index and equation-registry drift remains with its established regeneration or PR owner; no generated freshness check or regeneration was needed for this unchanged corpus target. No corpus source, controlled canon, application code, or generated artifact was edited.

### F4-1 discussion — One clock, two elapsed-time predictions

The operator selected the explanation of F4-1. This instruction authorizes discussion capture, not the proposed corpus correction. The chapter was rechecked against its reviewed hash `ecc01d492409e390ac8c31669754c17b91dcb6e41e6fe9c1ebdf9fe37c641a6b` and remains unchanged. The finding concerns consistency between two declared effective descriptions. It does not establish the physical validity or sufficiency of either description.

Imagine one clock carried along one specified path through a locally uniform medium. The chapter gives two ways to calculate how much that clock advances: a clock-rate formula and an effective metric. A metric here is a quadratic rule combining elapsed effective time and spatial displacement to assign elapsed clock time along the path. If the two descriptions are to represent the same clock under the same conditions, their answers must agree.

To expose the discrepancy without tensor notation, specialize to a medium-rest effective chart, motion along one spatial axis, and $B_{ij}=\delta_{ij}$. Write $w=dx_{\mathrm{eff}}/dt_{\mathrm{eff}}$ for velocity along that axis. This is a permitted special case of the displayed general formulas, not a claim that every medium is isotropic. Set the declared correction bracket to one to compare the leading targets. The symbols have distinct roles: $\tau$ is elapsed clock time; $t_{\mathrm{eff}}$ is the effective coordinate time used for comparison; $A>0$ is the clock-rate factor at rest in this chart; and $c_0$ is the effective speed calibration. The absolute substrate time $T$ and primitive wake speed $c_f$ are not being replaced by these effective quantities.

The chapter's direct clock formula becomes

$$
\frac{d\tau}{dt_{\mathrm{eff}}}
=A\sqrt{1-\frac{w^2}{c_0^2}}.
$$

At rest, it gives $d\tau/dt_{\mathrm{eff}}=A$. In motion, it multiplies that rest rate by a square-root factor comparing velocity to $c_0$.

The chapter's metric becomes

$$
d\tau^2=A^2dt_{\mathrm{eff}}^2-\frac{dx_{\mathrm{eff}}^2}{c_0^2}.
$$

Divide by $dt_{\mathrm{eff}}^2$, substitute the definition of $w$, and take the positive square root:

$$
\left(\frac{d\tau}{dt_{\mathrm{eff}}}\right)^2
=A^2-\frac{w^2}{c_0^2},
\qquad
\frac{d\tau}{dt_{\mathrm{eff}}}
=\sqrt{A^2-\frac{w^2}{c_0^2}}
=A\sqrt{1-\frac{w^2}{A^2c_0^2}}.
$$

Factoring $A^2$ out of a square root requires dividing every remaining term inside by $A^2$. The current clock formula omits that divisor on the velocity term. The metric alone therefore fixes the proposed correction without an additional physical law or empirical fit.

The earlier numerical example makes the two answers visible. In normalized wake-speed units $c_f=1$, choose the illustrative effective calibration $c_0=1$, rest-clock factor $A=1/2$, and velocity $w=1/4$. Both formulas give a rate of $1/2$ at rest. For the moving clock, the current direct formula gives about $0.484123$ clock-time units per effective-time unit, while the metric gives about $0.433013$. The values of $A$ and $w$ are comparison inputs; no assembly calculation has produced this example. Choosing $c_0=1$ here does not establish a general equality of effective and primitive speeds.

The effect is not confined to a numerical discrepancy in clock rates. In this isotropic example the metric's null condition gives a local signal speed $Ac_0$ relative to the medium. The compatible clock factor is consequently $A\sqrt{1-w^2/(Ac_0)^2}$. The existing direct formula instead uses $c_0$ as that scale regardless of $A$. In the general directional case, the metric gives the scale $c_0A/\sqrt{B_{ij}\hat k^i\hat k^j}$, exactly as the chapter's photon expression states. This interpretation is conditional on clocks and signals sharing the declared quadratic form. The formal zero of a clock expression is a comparison of target equations, not evidence that a physical clock branch persists all the way to that speed.

Both leading formulas are identical when $A=1$, and agree at $w=0$ for any positive $A$. Checks restricted to either case therefore miss the defect. Their positive-rate domain also matters: under the metric, a moving clock must satisfy $B_{ij}w^iw^j<A^2c_0^2$, in addition to retaining a valid advancing phase. Positivity of $A$ by itself is insufficient for an arbitrary path.

There are algebraically possible alternative conventions. Keeping the old direct clock formula would require a spatial coefficient $A^2B_{ij}$ in its associated metric, or a clearly distinguished velocity-response tensor. That would change the declared meaning of $B_{ij}$ and require corresponding changes to the metric components, photon formula, and downstream uses. The present chapter and Emergent Metric consistently use $B_{ij}$ itself as the spatial coefficient. Correcting the clock denominator is therefore the smallest repair consistent with the live shared convention; it is not an argument that the metric must be physically correct because it appears elsewhere.

The derivation establishes a narrow result: the two current leading targets cannot both describe the same clock with the same stated variables. Physical derivation of $A$, $B_{ij}$, and their adequacy for clock and signal responses remains open. A consistent explicit redefinition that removes the mismatch would overturn the convention-based finding; none is present in the reviewed source. This correction would leave the absolute-time ontology and the separate lossy-compression question untouched. F4-1 remains awaiting acceptance, and F4-2 through F4-4 remain awaiting discussion.

### F4-1 accepted integration — 2026-09-05

The operator selected “Apply F4-1, then explain F4-2.” F4-1 is accepted and implemented through the live integrator-reviewer procedure. Immediately before editing, Absolute Time Defense matched the reviewed SHA-256 `ecc01d492409e390ac8c31669754c17b91dcb6e41e6fe9c1ebdf9fe37c641a6b`; its immediate baseline was retained. The correction changes the velocity denominator inside the clock square root to $A^2(\mathcal N_{\mathrm{sea}})c_0^2$, adds the short derivation and timelike domain at line 356, and clarifies at line 584 that a positive rest-clock factor alone does not certify every moving path. The existing metric, photon formula, residual bracket, and recovery-target claim grade are preserved. F4-2 through F4-4 are not implemented by this acceptance.

The complete resulting 787-line chapter was reread, and its complete diff was compared with the immediate baseline. All 40 display equations remain in their original order; only display 15 changes, by the accepted denominator correction. The other 39 displays and every link label and target remain byte-identical. All 123 mathematical expressions parse with the vendored KaTeX instrument, and all 51 local file-link occurrences resolve. The registered equation-link checker passed for its 23 entries. These are syntax, preservation, and file-target checks, not a visual rendering audit or exhaustive viewer-fragment validation.

The revised algebra was checked against direct division of the unchanged metric and the closed-form identity established in the preceding F4-1 explanation. In the previously declared example with $c_f=1$, $c_0=1$, $A=1/2$, and $w=1/4$, both revised clock and metric give $\sqrt3/4\approx0.433013$. Elementary Node evaluation confirms that arithmetic as author self-check; it is not an independent physical validation. The comparison metric was not changed with the clock target. No derivation of the effective constitutive functions, EOM simulation, or physical clock measurement is claimed. Full-document self-review found no further correction needed within the accepted F4-1 scope; F4-2 through F4-4 retain their recorded unresolved status.

The strict content check reported 0 errors and 1 warning, exiting 1 for `content/scenes/scenes_index.json`, which lacks the existing `content/scenes/archie/feedback.json` entry. The repair command is `node scripts/validate-content.mjs --write`. The equation-registry check also exited 1 for stale `content/generated/equation-mapping/corpus-equations.json`; its repair command is `node scripts/build-equation-mapping-corpus.mjs --write`. Both outputs were already stale, and the accepted clock-equation change now also belongs in the next normal registry refresh. Regeneration remains with its established regeneration or PR owner; neither command was run in write mode. Whitespace validation passed.

Resulting Absolute Time Defense SHA-256: `aaf23089c52edf5c07483c8336057362c4a3d984f7a52b5ae8723fd72df30036`. This turn edits that chapter and the two existing campaign records. Existing Absolute Timespace and Euclidean Void work is preserved. No controlled canon, application code, generated artifact, or dependency was edited. Coverage remains 6 of 9 complete readings: 5 chapters fully corrected at the accepted scope, 1 partially integrated chapter awaiting decisions on F4-2 through F4-4, and 3 unread campaign targets. F4-1 no longer blocks the clock/metric convention; its physical recovery remains open. Batch 5 has not started.

### F4-2 discussion — What must connect framing to clock rate

F4-2 concerns the physical response identification still present in Absolute Time Defense, now at lines 358–392. It is the same lossy-compression concern the operator raised in the batch-3 discussion. The corrected Absolute Timespace already separates the geometric statistic from the claim that it adequately describes a measured response. This chapter needs the same distinction.

A framing quadrupole summarizes the weighted directional distribution of an assembly's retained frames. To make its meaning explicit, let $\hat{\mathbf m}_a$ be unit framing directions, with nonnegative weights $p_a$ summing to one in a declared averaging window. In Euclidean orthonormal coordinates the corresponding statistic is

$$
Q^{ij}=\sum_a p_a m_a^i m_a^j-\frac13\delta^{ij},
\qquad
\sum_a p_a=1.
$$

The indices label spatial components, and $\delta^{ij}$ is the identity tensor. The trace is zero because each direction has unit length. The expression retains second directional moments and discards information about the distribution beyond those moments. Specifying and computing this statistic does not establish that the selected directions, weights, or window are the ones controlling the clock's dynamics.

A clock-orientation response is a different quantity: the fractional change in the clock rate associated with a declared change in orientation under fixed comparison conditions. The chapter connects the two through a scalar gain $\lambda_{\mathcal A}$ and a probe direction $\hat{\mathbf n}$. Since $Q$ is trace-free, its retained quadrupolar expression can be written

$$
\Delta_{\mathcal A}^{\mathrm{ori}}(\hat{\mathbf n})
=\lambda_{\mathcal A}Q_{\mathcal A}^{ij}n_i n_j
+R_{\mathcal A}(\hat{\mathbf n}).
$$

This is the existing expression with the trace contraction simplified and the omitted contribution named $R_{\mathcal A}$ for discussion. The scalar gain sets the strength of the proposed clock response. The chapter labels its remainder by higher even spherical-harmonic degrees under reciprocity; that label does not give a numerical bound, establish a small expansion parameter, or prove that the clock's quadrupolar response is proportional to this framing statistic. The use of distinct symbols for framing and probe directions here only clarifies their roles; it proposes no canon change.

The missing step is a calculation of the clock's cycle or phase rate from the assembly's delayed dynamics and medium coupling that yields this dependence. It must explain why the framing quadrupole controls the retained response, derive or bound its gain, and control every omitted contribution over the stated regime. Two tensors can both describe directional anisotropy and still have different principal directions or component ratios. The explicit non-proportional-tensor example in the original F4-2 assessment shows why matching their mathematical type does not derive the scalar-gain relation.

The loss of higher moments is a separate obstruction to sufficiency. In the accepted equal-weight triad example, two arrangements both have $Q=0$, yet their fourth directional moments differ. A clock response that depends on that omitted moment would distinguish them even though this quadrupole cannot. That geometric example does not show that actual architrino clocks have such a dependence. It shows that the proposed statistic cannot exclude it. The physical test is to derive the response and determine whether the omitted information matters, rather than assume it does not.

The phrase at line 358 identifying the orientation response with the quadrupole is therefore too strong. The final sentence at line 392 also makes small framing anisotropy carry four different physical responses before those connections have been established. Without the missing derivations, neither small $Q$ nor geometric near-orthogonality establishes small clock, matter, mass, or period anisotropy. The experimental ceiling is on a specified observable; it cannot be transferred to the framing statistic without the response map.

The recommended repair preserves the statistic and the proposed formula as a conditional response model. It specifies the averaging prescription, replaces the categorical identification with its actual unproved status, and states that the response calculation must determine the gain and bound omitted information before the model supports an observable limit. This is not acceptance of the compression as physically adequate. Its adequacy remains an open question; if it fails, the response description must retain the missing information or restrict its regime with a justified error bound.

Claim grade: the moment calculation and the logical distinction are derived; the claimed clock response remains unestablished. A concrete falsifier of the reduction is a pair of admissible histories with the same declared quadrupole and retained response parameters but clock-orientation responses differing beyond the proposed error bound. A derivation that rules out such differences within a stated regime would supply the needed justification. F4-2 awaits acceptance of this explanatory repair; F4-3 and F4-4 remain pending. The broader common-record insight is not being promoted or reopened as a proof of sufficiency.

### F4-2 accepted integration — 2026-09-05

The operator selected “Apply F4-2's clarification, then explain F4-3.” The live integrator-reviewer procedure governed this accepted explanatory correction. Immediately before editing, Absolute Time Defense matched the prior verified SHA-256 `aaf23089c52edf5c07483c8336057362c4a3d984f7a52b5ae8723fd72df30036`; the immediate baseline was retained. The revised passage at lines 358–394 defines the normalized framing average, treats the clock-response expression as a conditional ansatz, explains the scalar gain and proportionality assumption, and requires a physical response derivation with control of omitted information. It removes the inference that small framing quadrupole alone constrains the four named physical responses. Acceptance of this repair does not establish that the lossy statistic is physically adequate.

The complete resulting 789-line chapter was reread, and the complete incremental diff was checked against the immediate baseline. All 40 display equations, every link label and target, and the earlier F4-1 correction remain byte-identical to that baseline. The new prose is confined to the quadrupole passage. All 129 mathematical expressions parsed with the vendored KaTeX instrument; all 51 local file-link occurrences resolve. The registered equation-link checker passed for its 23 entries. These checks establish syntax, preservation, and file-target validity, not a visual rendering audit or exhaustive viewer-fragment validation. The interpretation was checked against the accepted Absolute Timespace treatment and the explicit moment and tensor counterexamples in the existing review as author self-review. No independent physical validation or clock-response derivation is claimed.

The strict content check reported 0 errors and 1 warning, exiting 1 for the existing `content/scenes/scenes_index.json` drift, which lacks `content/scenes/archie/feedback.json`. Its repair command remains `node scripts/validate-content.mjs --write` under the established regeneration or PR owner. The previously recorded `content/generated/equation-mapping/corpus-equations.json` drift remains with that owner; its command is `node scripts/build-equation-mapping-corpus.mjs --write`. The registry freshness check was not repeated for this prose-only clarification. No generated file was written. Whitespace validation passed.

Resulting SHA-256: `352b11d5cbf233f82795fb1060da392cc06358b45379e6e4d6e47cd4a4a5e33a`. F4-1 and F4-2 now have accepted corrections verified. F4-3 and F4-4 remain pending, so Absolute Time Defense remains partially integrated. Coverage is still 6 of 9 complete readings: 5 fully corrected chapters at their accepted scope, 1 partially integrated chapter, and 3 unread campaign targets. This turn edits only Absolute Time Defense and the two existing campaign records; previous Absolute Timespace and Euclidean Void work is preserved. No dependency, controlled canon, application code, or generated artifact was edited. Batch 5 has not started.

### F4-3 discussion — A memory-description failure is not yet a clock-rate failure

The operator requested an explanation of F4-3 after the F4-2 integration. The unresolved passage remains at Absolute Time Defense lines 165–176. It identifies negligible memory-boundary flux with the clock certificate and asserts that uncompensated leakage leaves secular rate drift. The concern is the missing implication from this proposed condition on a reduced description to the behavior of the physical clock.

A clock supplies a phase: a coordinate indicating how far it has progressed through a repeatable cycle. Its instantaneous phase rate is $\Omega=d\varphi/dt_{\mathrm{eff}}$, measured against the chapter's declared effective time. Under fixed comparison conditions, a stable timing reference needs a repeatable phase evolution and controlled departures from that rate. A systematic change in this rate over successive cycles would be rate drift. Merely observing that some other state variable or some property of a reduced mathematical description changes does not establish such drift.

The history condition concerns another object. Delayed dynamics depends on earlier states, and a finite description may retain only a window of duration $h$, represented in history-age coordinates by $[-h,0]$. The zero endpoint is the current state and the other endpoint is the oldest retained age. As the system evolves, the retained window moves. Crossing this representation boundary is not, by itself, destruction of physical history or a demonstrated loss of physical energy. Actual exchange of wake effects with a surrounding medium is another physical question. The mathematical identity connecting such exchange, history truncation, and any observer-level balance must be established rather than inferred from the word “leakage.”

The live Effective Lagrangian discussion at lines 903–946 proposes a memory-corrected symplectic structure. A symplectic two-form measures oriented area on pairs of infinitesimal state variations; in a Hamiltonian description, evolution preserves the relevant two-form. Its memory correction is intended to include the delayed degrees of freedom that an instantaneous description omits. The owner explicitly leaves construction of the kernel and its boundary-flux identity open. Its stated consequence concerns the validity of the proposed Hamiltonian representation and its conservation account, not an already proved change in clock frequency. The word “flux” here must not be silently read as an independently derived physical energy flux.

The chapter makes two extra steps: it treats that open Hamiltonian condition as necessary for every clock, and then treats failure of the condition as sufficient evidence of secular clock-rate drift. Neither step follows from the owner. The stronger implication may hold in a particular derived branch regime, but it would need a theorem connecting the defined boundary term to the clock's phase evolution.

The elementary comparison in the original F4-3 assessment isolates why this distinction matters. Let $\theta$ be an angular phase modulo $2\pi$, let $r$ be a transverse state coordinate, and let $\Omega$ and $\kappa$ be positive constants. Consider

$$
\frac{d\theta}{dt_{\mathrm{eff}}}=\Omega,
\qquad
\frac{dr}{dt_{\mathrm{eff}}}=-\kappa(r-r_0).
$$

Its exact solution is

$$
\theta(t_{\mathrm{eff}})=\theta(0)+\Omega t_{\mathrm{eff}}\pmod{2\pi},
\qquad
r(t_{\mathrm{eff}})=r_0+[r(0)-r_0]e^{-\kappa t_{\mathrm{eff}}}.
$$

The phase completes a cycle in $2\pi/\Omega$ every time. Meanwhile neighboring values of $r$ move closer together, and a patch measured by $dr\wedge d\theta$ shrinks by $e^{-\kappa t_{\mathrm{eff}}}$. Thus the displayed area form is not preserved while the phase rate stays constant. The equations have no explicit time dependence; the example needs no explicitly prescribed external driving term. It is an abstract mathematical system, however, not evidence for a physically closed dissipative architrino assembly. No physical source of contraction, memory flux, or energy balance is inferred from it.

This comparison refutes a general implication from failure of the displayed symplectic preservation to clock-rate drift. It does not evaluate the chapter's still-unconstructed memory-boundary term or prove that memory effects leave real clocks unchanged. In a real branch calculation, omitted history may change the rate, shift its calibration, produce transient timing errors, destroy the phase, or have no material effect on the selected observable. Those outcomes require the phase response to be computed. The original normalized numerical example remains an illustration in units $c_f=1$, not a solver result.

The smallest repair preserves two useful requirements separately. The clock certificate requires repeatable phase evolution with the relevant history and exchanges accounted for. A proposed Hamiltonian reduction additionally requires its memory-corrected symplectic construction and boundary balance to be established. The memory condition should be presented at that open, conditional scope. The categorical statement that leakage necessarily causes secular rate drift should be replaced by a requirement to determine its effect on the clock phase. The existing requirement to account for actual external driving and exported fluxes remains appropriate.

This matters because an inadequate reduced description must not be used, without the missing argument, to declare that a physical assembly cannot serve as a clock or that its proper time is undefined. Equally, a stable phase alone does not certify a Hamiltonian description or universal agreement with other clocks. The revision would separate these obligations without resolving either by assertion.

Claim grade: the separation of phase rate and area preservation is derived in the explicit comparison; the special connection between the proposed memory residual and physical clock failure is unestablished. A theorem from the delayed dynamics defining that residual and proving a quantitative clock-phase consequence would discharge the concern. The Effective Lagrangian dependency was reread unchanged at SHA-256 `9d974db22027ba28beeadcaca9ed1d01b9a00b345434f33a0da690bf33336aed`. This discussion does not amend or validate its candidate construction. F4-3 awaits acceptance of the scoped clarification; F4-4 remains pending.

### F4-3 accepted integration — 2026-09-05

The operator selected “Apply F4-3's clarification, then explain F4-4.” The live integrator-reviewer procedure governed the correction. The immediate baseline matched SHA-256 `352b11d5cbf233f82795fb1060da392cc06358b45379e6e4d6e47cd4a4a5e33a` and was retained before editing. The revised passage at lines 165–178 separates repeatable phase evolution from the additional requirements of a proposed Hamiltonian representation, defines the intended history-age interval and candidate boundary contribution, and states that its construction and quantitative evaluation remain open. It removes the inference from a symplectic-balance defect alone to clock-rate drift while preserving the need to account for relevant history, actual driving, and exchanges. A direct relative link to Effective Lagrangian supplies the dependency whose open scope controls this claim.

The complete resulting 791-line chapter was reread, and the full incremental diff was compared with the retained baseline. All 40 display equations are byte-identical to that baseline. All prior link labels and targets are preserved, and exactly one new link, to Effective Lagrangian, was added. All 133 mathematical expressions parsed with the vendored KaTeX instrument; all 52 local file-link occurrences resolve. The registered equation-link checker passed for its 23 entries. These are syntax, preservation, and target-existence checks, not a visual rendering audit or comprehensive fragment validation. Author self-review checked the distinction against the unchanged dependency and the explicit phase-flow counterexample already recorded; it does not constitute independent physical validation or construction of the proposed memory term. F4-4 remains the only unimplemented finding in this batch.

The strict content check returned 0 errors and 1 warning, exiting 1 for the existing `content/scenes/scenes_index.json` drift, which lacks `content/scenes/archie/feedback.json`. Its repair command is `node scripts/validate-content.mjs --write`. Previously recorded `content/generated/equation-mapping/corpus-equations.json` drift remains with the same established regeneration or PR owner; its command is `node scripts/build-equation-mapping-corpus.mjs --write`. The registry freshness check was not repeated for this prose-only correction. No generated artifact was written. Whitespace validation passed.

Resulting target SHA-256: `1f13b32d109164ef58a5d3bdab1d07ed09766fd36e7742d2cf32fdeb46627810`. F4-1 through F4-3 are accepted and verified at their correction scope. The physical clock/ruler response maps and memory construction remain open. Coverage is 6 of 9 complete readings: 5 fully corrected chapters at their accepted scope, 1 partially integrated chapter awaiting F4-4, and 3 unread campaign targets. This turn edits only Absolute Time Defense and the two existing campaign records, preserves the previous Absolute Timespace and Euclidean Void work, and does not start batch 5. No dependency, controlled canon, application code, or generated artifact was edited.

### F4-4 discussion — Counting returns does not measure their duration

The remaining finding concerns the invariant-circle clock explanation at Absolute Time Defense lines 127–143. Its rotation number describes mean phase advance per return, reduced modulo one. A clock frequency instead requires phase advance per unit elapsed time. This is a missing connection in the exposition, not a contradiction in the rotation-number theorem or proof that a proposed assembly cannot be a clock.

A return map records the state each time a trajectory crosses a chosen section again. For a motion with more than one phase, one can picture observing a rotating pointer whenever another recurring feature reaches a reference position. The resulting sequence tells us where the pointer appears on each observation. Unless the record includes timing and continuous phase information, it does not tell us how long the pointer took to get there or how many complete turns it made between observations.

There are two independent losses. First, phase on a circle records position modulo one full turn. Advancing one quarter of a turn and advancing one and one quarter turns give the same final pointer position. Repeating the same increment therefore gives the same sequence of circle positions despite different total rotation. A physical phase lift preserves the running count of full turns; it must be selected from the continuous trajectory rather than reconstructed from the circle positions alone.

Second, a map that advances a quarter turn at each return is unchanged if every return takes twice as long. Its frequency is halved. In normalized wake-speed units $c_f=1$, the following are abstract timing examples in a declared effective time unit, not measured assembly results:

| Actual phase advance per return | Effective time per return | Frequency in cycles per effective-time unit |
| --- | --- | --- |
| $1/4$ cycle | $1$ | $1/4$ |
| $1/4$ cycle | $2$ | $1/8$ |
| $5/4$ cycles | $1$ | $5/4$ |

All three produce the same quarter-turn circle map when only the phase at returns is retained. The first two isolate missing duration; the first and third isolate missing whole turns. The same argument applies to an irrational advance $\alpha$ and $\alpha+1$, and to rescaling return times for quasiperiodic motion. The simple rational values above are chosen only to make the information loss visible.

To recover frequency, let $\theta\in\mathbb R/\mathbb Z$ be phase measured in cycles, and let $\tilde P$ be a lift of the return map satisfying $\tilde P(x+1)=\tilde P(x)+1$. The physical lift retains full turn counts. Let $\delta t(\theta)>0$ be the elapsed effective time until the next return, and write $\theta_k=P^k(\theta)$. After $n$ returns, the counted phase advance is $\tilde P^{\,n}(\theta)-\theta$, while the elapsed effective time is the sum of the return durations. Their ratio supplies the mean frequency, when the limit exists:

$$
\overline\nu
=\lim_{n\to\infty}
\frac{\tilde P^{\,n}(\theta)-\theta}
{\sum_{k=0}^{n-1}\delta t(\theta_k)},
\qquad
\overline\Omega=2\pi\overline\nu.
$$

Here $\overline\nu$ is cycles per effective-time unit and $\overline\Omega$ is angular phase per effective-time unit. If the real phase advance per return converges and the mean return duration has a finite, positive limit, the ratio is their quotient. A zero, divergent, or nonconvergent mean duration does not provide the stated finite frequency by this argument. If one frequency is claimed across the branch, dependence on initial phase and the relevant uniformity must also be controlled. A unique mean frequency alone does not certify small timing jitter or continuous positive instantaneous phase rate; those remain phase-coherence requirements.

The full delayed trajectory may already contain the needed lift and return times. The finding does not assert that the underlying dynamics has lost them. It says that the reduced quantity displayed in this section is insufficient by itself, and the reader needs the explicit connection back to the time-bearing trajectory before it can support the clock-rate definition. The periodic-orbit case remains distinct: its repeat period directly gives a frequency once the physical cycle and the time convention are fixed.

The smallest repair is to retain the existing rotation-number formula and its sufficient circle-homeomorphism assumptions, explain the physical lift and positive return durations, and give the frequency ratio with its existence conditions. This supplies the missing explanation without a new law or a claim that universality has been derived. It also keeps the distinction between substrate time $T$ and the chapter's effective time explicit: rates must use a declared parameter, with the corresponding conversion supplied when comparing them.

Claim grade: derived information requirement and explanatory omission. The equal-map examples show directly why modulo-one rotation per return cannot uniquely determine a phase rate. Supplying the physical turn-count and return-time extraction for the selected assembly, together with the needed limits and phase control, would discharge the gap. No EOM simulation or physical frequency measurement was performed. F4-4 awaits acceptance of this explanatory repair; F4-1 through F4-3 remain implemented and verified.

### F4-4 accepted integration and batch-4 closeout — 2026-09-05

The operator selected “Apply F4-4’s explanatory correction.” The live integrator-reviewer procedure governed the scoped edit. The immediate baseline matched SHA-256 `1f13b32d109164ef58a5d3bdab1d07ed09766fd36e7742d2cf32fdeb46627810` and was retained before editing. The revised [clock explanation](../../../content/markdown/aaa/foundations/absolute-time-defense.md#when-is-something-actually-a-clock) defines circle phase in cycles, its physical lift and full turn count, positive elapsed effective return times, and the mean-frequency ratio. It states sufficient limit conditions, the additional requirement for independence from initial phase when claiming one frequency across the branch, and the distinction between mean frequency and coherent advancing instantaneous phase. The periodic-orbit case remains separate. The original rotation-number equation and its sufficient circle-homeomorphism assumptions are preserved. No new physical postulate or measured clock result is introduced.

The mathematical check is author self-review: dividing total turn count and total elapsed time by the number of returns gives the quotient of the two limiting means when the denominator limit is finite and positive. Adding a whole turn preserves the circle map but changes the counted frequency; multiplying every return duration by a positive constant preserves the map but inversely rescales the frequency. These direct checks support the information requirement and the ratio under its stated assumptions. They are not independent physical validation, a construction of an assembly phase, or proof of clock universality. No EOM simulation was performed.

The complete resulting 808-line chapter was reread, and the full incremental diff was compared with the retained baseline. All 40 previous display equations are byte-identical and occur in their original order; one mean-frequency display was added, for 41 total. All prior link labels and targets are unchanged. All 147 mathematical expressions parsed with the vendored KaTeX instrument, and all 52 local file-link occurrences resolve. The registered equation-link checker passed for its 23 entries; its coverage does not include every chapter equation. These checks establish syntax, preservation, and file-target existence, not a visual rendering audit or comprehensive fragment validation.

The strict content check returned 0 errors and 1 warning, exiting 1 for the existing `content/scenes/scenes_index.json` drift, which lacks `content/scenes/archie/feedback.json`. Its repair command is `node scripts/validate-content.mjs --write`. The equation-corpus freshness check exited 1 for stale `content/generated/equation-mapping/corpus-equations.json` and the new equation `corpus-equation-bec62a39745a7416` missing its canonical source viewer link. The established regeneration command is `node scripts/build-equation-mapping-corpus.mjs --write`. These remain with the established regeneration or PR owner; no generated artifact or viewer link was manually written. Whitespace validation passed.

Resulting target SHA-256: `7f1416cb91707f0619634ab6f8034504d41c242946f4ed3a69271b3782dd72f5`. F4-1 through F4-4 are accepted, implemented, and verified at their correction scope. The physical clock/ruler response maps, memory construction, phase extraction, and universality proof remain open. Coverage is 6 of 9 complete readings, with all accepted corrections verified in those 6 chapters and 3 unread campaign targets. No finding is explicitly deferred. This turn edits only Absolute Time Defense and the two existing campaign records, preserves the earlier Absolute Timespace and Euclidean Void work, and does not start batch 5. The next review batch is Detecting the Absolute Frame and Constructing the Absolute Frame, following textbook order. No dependency, controlled canon, application code, or generated artifact was edited.

### Impact assessment after six reviewed chapters — 2026-09-05

The operator asked whether the accepted review changes materially alter the theory or affect the EOM solver and the remaining corpus. The supported conclusion has two parts: no accepted finding changes the primitive substrate law, but several corrections materially change effective formulas, proposed success criteria, or what the existing arguments establish. Calling all of the work editorial would understate those consequences. Calling it a replacement of the substrate theory would overstate them.

The primitive commitments remain absolute time, the fixed Euclidean void, point architrinos with polarity and no primitive mass, continuous wake emission, and causal-delay acceleration from retained histories. The causal-root equation, polarity product, inverse-square dependence, unsigned transmitter-side acceleration weight, and distinction between that weight and signed receiver playback were not changed by this campaign. The new fixed-external-history polarity result is an algebraic consequence of the existing kernel, with self-history and coupled-response limits explicitly retained. It introduces no extra acceleration term.

The current EOM evolution contract already requires complete retained-root inventories, boundary clearances, separate handling of caustics and higher degeneracies, and preservation of earlier self-roots. Its simple-root law uses the transmitter factor for acceleration strength and the receiver/transmitter quotient for playback. The inspected sharp accumulation path in `src/eom/src/CertifiedAcceleration.cpp`, lines 268–323, makes the same distinction: it checks nonzero separation and a certified transmitter factor, computes playback separately, and multiplies the acceleration weight by the charge product and inverse-square direction. This supports the narrow conclusion that the accepted Foundations corrections require no identified change to that acceleration formula. It is not a full audit of production conformance, every numerical route, or downstream observable extraction. The contract itself records production conformance as open.

| Accepted change | Material consequence for later work | EOM implication established here |
| --- | --- | --- |
| F1-3/F1-4/F1-6, F2-1, F3-1: units, singularity classification, coincidence, and complete root counts | A time-valued root residual is distinct from a dimensionless derivative; a failed positive margin is not necessarily a singularity; a singularity is not necessarily a fold; point support does not prove physical coincidence continuation; root counts need endpoint and inventory control. | Aligns explanatory chapters with existing dynamics and contract requirements. No new kernel or demonstrated implementation defect. A consumer using the discarded shortcuts would need correction. |
| F2-3/F3-4/F3-5: direct wake support and causal chains | An emitted sphere gives direct support; the filled set means passage by a stated time; broader influence requires changes propagated through actual intermediate histories. The time orientation and support rule, rather than product topology alone, exclude backward causal influence. | No change to the direct-hit root equation or a new relay mechanism. No signalling-speed theorem is established. |
| F4-1: corrected clock factor | The clock target now agrees with the existing metric: the velocity term inside the square root is divided by the square of the rest-clock factor as well as the calibrated speed squared. Moving clocks in a dressed medium generally receive a different predicted effective rate from the erroneous formula. | A clock postprocessor using the old expression must change. No substrate acceleration correction follows. No such code consumer was identified or exhaustively searched in this assessment. |
| F3-2/F3-3: Lorentz action and shape comparison | The Lorentz group action belongs on recovered event coordinates. Reduced length and clock ratios need not themselves obey its group composition law. Shape comparisons use deformation relative to each rest radius, avoiding an unjustified spherical-rest assumption. | Changes how a trajectory would be judged against a recovery target, not the trajectory equation. An analysis using the old unnormalized aspect ratio or multiplying contraction factors could reject valid candidates. |
| F1-2/F2-2 and supplemental quadrupole/F4-2 | A reduced state or tensor is adequate only if it preserves the information required by the selected observable, exactly or within a proved error bound. Zero quadrupole does not establish full physical isotropy. Clock, ruler, mass, cosmological scale, and laboratory residuals require their own response derivations. | Full history evolution need not change. Any proposed compression or inference relying on these sufficiency claims needs its own justification. This assessment does not establish that the EOM solver makes such a reduction. |
| F3-6: far-population convergence | The conditional argument now controls complete weighted received-cell contributions, including root multiplicities and transmitter factors, with packing, covariance, conditional-mean, and exhaustion assumptions. Neutrality alone does not prove convergence of the physical sea. | Limits claims about infinite-population limits, far-history omission, or aggregation. It does not invalidate a correctly scoped finite retained-history calculation or supply a new cutoff rule. |
| F4-3/F4-4: physical clock versus reduced representation | Failure of an unproved Hamiltonian memory balance does not by itself prove clock drift. Frequency extraction needs full physical turn counts and elapsed return times; a mean frequency alone is not a phase-coherence certificate. | Changes diagnostics and admissibility arguments if they used the rejected implications. It supplies no new dynamical law and identifies no tested solver defect. |
| F1-1: finite-speed Bell route | Two-party degradation alone is insufficient for the proposed recovery; multipartite consistency and the source-premise audit remain necessary. This narrows what the chapter claims to have achieved without proving every candidate route impossible. | No acceleration change. The existing deferred Bell owners retain the physical obligation and are not reactivated. |
| F1-5/F1-7/F1-8/F2-4/F2-5/F2-6/F2-7/F3-7 | Neutral-scaffold naming, reading order, definitions, fixed temporal structure, orientation and chart domains, bibliographic scope, and the Poincare group name are corrected. These improve agreement with existing owners without adding a physical postulate. | No demonstrated solver change; chart-domain restrictions matter to any future calculation using those coordinates. |

Two corrections are particularly concrete. F4-1 changes the effective rate away from unit rest-clock factor; the recorded example changes approximately 0.484123 to 0.433013 under its stated effective chart and normalized wake-speed units. F3-3 changes the shape target for nonspherical rest assemblies: the moving aspect ratio inherits its rest aspect ratio rather than being forced to equal the Lorentz contraction factor itself. Neither calculation changes the primitive law. Both matter when extracting or judging physical predictions from a trajectory.

The most consequential conceptual correction is the information-loss issue raised by the operator. The physical history can remain the common source of several measurements while a particular tensor fails to retain enough of it. The repair leaves open which reduction is adequate; it does not establish that every tensor reduction is wrong or that one proposed quadrupole is physically sufficient. Later spacetime, matter, cosmology, and measurement arguments must inherit that boundary. Likewise, the corrected far-population proof and Bell discussion expose limitations on existing arguments rather than establish new physical impossibility results.

Evidence and scope: the accepted batch receipts and the relevant live passages were inspected. All six live chapter hashes match their latest integration receipts: Ontology `48bf11bec4defceb1a317443928e43ecebfae28340aef02ac2f8c0754e47c43d`; Architrino `f91c2123169e3f1efd46a905769838f90a4da67cd268dc64d972a000d40f322d`; Absolute Time `fa03318d71b159e57c8bb2857540e8f49458859ced96da1d8b50b43d26a7ba42`; Euclidean Void `1b561ec1b1ad6ebbe40533b262c3c584abc5ac1813cb874dbcfa94d035022a02`; Absolute Timespace `6dfc68496c19792463d3093f1f160ebd519496e4149190bcded0c971c3d7c603`; Absolute Time Defense `7f1416cb91707f0619634ab6f8034504d41c242946f4ed3a69271b3782dd72f5`. The sampled current Master Equation hash is `dbb88e073d51b5980e0520c0720439e803eeab35b350c49b3dd67adc3f036a3d`; EOM evolution contract `e9813089f6223ed21952911071d3dbbcc6458ec172443437cf38260f2ab85170`; CertifiedAcceleration source `58f425847442aa8772a1d3a63bb09bbae8d0883c56fd60a3d300273dc5e68878`. This is an impact assessment using review provenance and bounded source inspection, not an exhaustive downstream dependency audit, independent mathematical validation, or a new solver run. The no-identified-kernel-change conclusion would need revision if an accepted correction changed a primitive kernel factor, or an actual consumer used one of the superseded effective formulas or sufficiency claims. No such kernel change is present in the accepted record. The next Foundations batch should use these corrected premises; broader propagation remains outside the present review coverage.
