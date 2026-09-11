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
- **Scope:** 190 documents outside the already independently reviewed `foundations/` batch. The six `dynamics/` documents remain included at the operator's request. Packet 1 covered 14 `noether-braid/` documents; Packet 2 now covers Master Equation, Energy, Entropy, Binary Dynamics, [Causal Action Functional](#crw-005-packet-2-document-5--causal-action-functional-assurance-review-2026-09-10), and Effective Lagrangian. Coverage is 21 of 190 reviewed, with 169 remaining. Master Equation's 16, Energy's 15, and [Entropy's 14 corrections](#crw-005-entropy-ent-1-through-ent-14--accepted-integration-2026-09-10) are accepted and implemented. [Binary Dynamics' 18 corrections](#crw-005-binary-dynamics-bd-1-through-bd-18--accepted-integration-2026-09-10) are accepted and implemented. All 12 Causal Action Functional findings are now [accepted and corrected](#crw-005-causal-action-functional-caf-1-through-caf-12--accepted-integration-2026-09-10). The [Effective Lagrangian review](#crw-005-packet-2-document-6--effective-lagrangian-assurance-review-2026-09-10) completes Packet 2 with 16 proposed findings awaiting adjudication. The [Noether Sea review](#crw-005-packet-3-document-1--noether-sea-assurance-review-2026-09-10) opens Packet 3 with 13 proposed findings (six high, seven medium). Effective Lagrangian corrections remain pending. The next unread document is `content/markdown/aaa/spacetime/noether-sea-pro-anti-coupling.md`.
- **Packet 2 review:** All six Dynamics chapters have recorded reviews under the current Codex assignment. Master Equation, Energy, Entropy, Binary Dynamics, and Causal Action Functional corrections are accepted and implemented; the [Effective Lagrangian findings](#crw-005-packet-2-document-6--effective-lagrangian-assurance-review-2026-09-10) remain proposed. The manuscript remains outside the edit scope.
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
| `reference/office-of-research/cto/prompts` | 2 | 7 | Convert — startup path |
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

- `reference/op/simulation-protocol-routing-index.md`, `textbook-review-exports.md`, `machine-artifact-retention.md`; the former review-time development experiment was removed by operator direction
- `reference/office-of-research/cto/prompts/start-research.md`, `start-pi.md`
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

`reference/priorities` (4,198 occurrences across 352 files), `reference/architectural-decisions` (4), `reference/office-of-research/research-history`, and the fixtures under `src` and `tests` keep the tag.

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

The operator requested a fresh complete review of every Markdown file under `content/markdown/aaa/foundations/`, in textbook order. The 2026-09-09 coordination assignment specifies one complete document at a time, with discussion before accepted edits, followed by Dynamics in live textbook order. This supersedes the earlier small-batch cadence for future reviews. This review assesses mathematics, conceptual coherence, evidence, exposition, and useful deductions under the current academic style guide, edition 1.1. It is separate from the historical edition-1.0 conversion and from CRW-005's 190-document assurance denominator. Historical conversion rows and acceptance records above remain unchanged. The live corpus-reviewer procedure governs substantive review.

The initial request authorized review records and discussion capture only. The operator subsequently accepted the corrections through batch 4, including the supplemental quadrupole clarification; the dated integration receipts below own that acceptance and verification. F4-1 through F4-4 are accepted and verified at their correction scope. Controlled canon, application changes, generated artifacts, and reactivation of deferred theory work remain outside this task. A later instruction to continue means the next complete document review unless implementation is also requested.

### Coordination handoff — 2026-09-09

Assigned scientific review lead and lead brainstormer: **Sabrina - scientific review lead**, task `01a0841b-f878-7672-8a7e-809c00f4939f`. Continuity source: **astra high foundations review**, task `01a0712a-dde8-7f00-90c9-a533c64c8d7b`. The lead exercises substantive judgment across mathematics, geometry, dynamics, foundations, computational evidence, and scientific exposition using the live repository review lenses: challenge assumptions, investigate derivations and counterexamples, identify promising connections, and guide discussion while separating established results from provisional ideas. The requested doctoral-level breadth is a standard of rigor, not a claim of human credentials. The lead also maintains sequence, coverage, findings, operator decisions, and handoffs in this existing record, with the current synthesis in [priorities.md](priorities.md). This turn remains bounded to the handoff: substantive review is awaiting the operator, and the role clarification does not launch reviewers, change models, or authorize corpus edits. The recommended model allocation supplied with the assignment is Astra High for substantive review, Medium for ordinary discussion, and Extra High for specific difficult mathematical questions; it remains a recommendation.

Select document-relevant perspectives from the live [specialist selection index](../../office-of-research/cto/prompts/start-research.md#discover-specialist-lenses), applying the [Specialist charter](../../office-of-research/specialists/specialist.md) and [Geometry and Dynamics role packet](../../office-of-research/specialists/roles-geometry-dynamics/system-prompt.md#role-lenses). The index identifies the geometry/dynamics and historical entourage directories; use their existing individual descriptions as analytical lenses, reading only those relevant to the current document. Synthesize their questions, mathematical checks, and evidence standards without creating duplicate personas or treating agreement among perspectives as independent validation. Role labels supply neither human credentials nor theory authority. The historical entourage system prompt remains excluded. No role agent is launched by this selection policy.

Claim grade: measured for recorded continuity, by `read_thread` on the source task's latest two completed turns and direct inspection of this coverage table and the F4-4 closeout. They agree on six completed Foundations reviews with accepted corrections integrated, ending at Absolute Time Defense; three campaign targets remain unread. The earlier authority paragraph's discussion-only batch-4 status was stale and is reconciled above against the dated receipt. This establishes continuity of the recorded review, not a new scientific validation.

Current-byte verification used `shasum -a 256 content/markdown/aaa/foundations/*.md`: five accepted chapter hashes match the six-chapter impact-assessment receipts, and all three unread chapter hashes match the initial inventory. Absolute Time Defense now hashes to `35742a23faf464df67f3d7cfcc9c2f11f4fa6481aa92ed2070ef8aa382b0d2d3`. Removing only the viewer link for `corpus-equation-bec62a39745a7416` and its following blank line in memory reproduces the accepted receipt hash `7f1416cb91707f0619634ab6f8034504d41c242946f4ed3a69271b3782dd72f5`; no file was changed for this check. The exact-link removal instrument passed a known string case before the chapter check. Thus the byte difference is confined to that navigation link, preserving the accepted prose and mathematics. Falsifier: a later source change or a comparison that no longer reproduces the receipt hash requires a fresh preservation assessment.

The next target is [Detecting the Absolute Frame](../../../content/markdown/aaa/foundations/detecting-the-absolute-frame.md), alone; its current SHA-256 is `8a62ef2951e06ed1aa6586f2e2ca010f63368bc2cbdc6f256cd82d335d451d9b`. Constructing the Absolute Frame follows, then Emergence of Structure. A Node depth-first traversal of `content/graph/textbook_toc.json`, checked first against a known ordered fixture with duplicate and out-of-directory paths, confirms this sequence. The same traversal gives the six `dynamics/` Markdown targets in order: Master Equation, Energy, Entropy, Binary Dynamics, Causal Action Functional, Effective Lagrangian; `rg --files` under the two corpus directories agrees with the target inventories. The intervening Action-Energy scene branch is outside the `dynamics/` Markdown directory and is not silently added to the corpus review scope. Recheck the live TOC and target bytes before each authorized review and before the Dynamics transition.

Carry forward the [six-chapter impact assessment](#impact-assessment-after-six-reviewed-chapters--2026-09-05) and the existing finding receipts. Physical response maps and sufficient statistics, Hamiltonian memory construction, phase extraction and clock universality, far-population convergence hypotheses, and the deferred Bell obligations retain their recorded open boundaries. The bounded earlier EOM assessment is historical evidence, not a fresh solver audit. After the remaining Foundations documents and their decisions, prepare the cross-document synthesis before beginning Dynamics. Each review reads the complete target, records its hash and exact finding locations, and stops for discussion; accepted implementation uses the live integrator procedure and full-document verification. Dependency reading does not count as completed target coverage. Keep context bounded to the current target, applicable canon, and relevant existing findings.

### Campaign baseline and coverage

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
| 5 | [Detecting the Absolute Frame](../../../content/markdown/aaa/foundations/detecting-the-absolute-frame.md) | ✓ Done — complete chapter review; F5-1 through F5-3 accepted, integrated, and verified |
| 6 | [Constructing the Absolute Frame](../../../content/markdown/aaa/foundations/constructing-the-absolute-frame.md) | ○ Not done — follows Detecting the Absolute Frame |
| 7 | [Emergence of Structure](../../../content/markdown/aaa/foundations/emergence-of-structure.md) | ○ Not done — separate synthesis and branch-selection burden |

Reading a later chapter as a required foundation anchor does not count as its completed review. Coverage is 7 of 9 complete readings: 7 chapters with all recommended corrections accepted and verified, 0 wholly unimplemented chapters with findings awaiting decision, 0 partially integrated chapters awaiting correction decisions, 0 reviewed with no recommended change, 0 files explicitly deferred or blocked, and 2 not yet reviewed. The [Detecting the Absolute Frame review](#foundations-document-7--detecting-the-absolute-frame-review-2026-09-09) records F5-1 through F5-3 and their completed integrations. F2-1 through F2-7 have verified corrections; the physical response identifications discussed in F2-2 and the supplemental batch-3 quadrupole assessment remain open recovery obligations. Scientific closure is not implied by any coverage status.

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

### Foundations document 7 — Detecting the Absolute Frame review, 2026-09-09

#### Scope, authority, and result

Mark authorized the complete review of [Detecting the Absolute Frame](../../../content/markdown/aaa/foundations/detecting-the-absolute-frame.md) alone, with findings returned for discussion before corpus edits. The previous publication pause is superseded for this review; no publication or following-chapter review is authorized. The full 337-line target was read using `nl -ba`/`sed`. Its SHA-256 from `shasum -a 256` is `8a62ef2951e06ed1aa6586f2e2ca010f63368bc2cbdc6f256cd82d335d451d9b`, unchanged from the campaign inventory; review-start HEAD from `git rev-parse HEAD` is `5819c2731c960256b9805b3b90051091cfe8e69e`. Scoped `git --no-optional-locks status --short` showed no pending changes in Foundations or this review lane before capture. These are measured source-state facts, not scientific validation.

The exact tagged-sphere argument is sound under the stated Euclidean geometry, absolute-time, emission-tag, and propagation assumptions. At the initial review, three findings required discussion: finite reconstruction conflates distinct inverse problems; spatial shape is confused with time-parameterized motion in one sentence and in a linked dependency; and the observer-hiding target needs an explicit comparison protocol and metric. None establishes that absolute rest is undefined or that operational Lorentz recovery is impossible. No corpus correction had been applied at that review stage. All three findings were subsequently accepted and integrated in the receipts below; the current chapter assignment is complete.

The existing Lorentz, Cartan, and Moore role descriptions supplied bounded questions about observer maps, spatial identification, and inverse conditioning. Their perspectives were synthesized by this reviewer; no additional agent was launched and no persona agreement is counted as independent evidence. Mathematical support below is direct Euclidean algebra, explicit prescribed-path counterexamples, and elementary bounds. The numerical checks are supplementary floating-point evaluations of those derivations, not EOM solutions or interval certificates.

Dependency inspection covered the current ontology's map-factorization and inverse-floor discussion; architrino provenance, propagation, and rest definitions; absolute-time symmetry and root-margin scope; Euclidean-void isometries; Absolute Timespace's additional connection data and boosted wake law; Constructing the Absolute Frame's ordered-tuple and cross-slice transport argument; the Master Equation's self-hit and symmetry sections; the Observer Framework's retained apparatus record; and Lorentz Kinematics' Theorem G. Constructing the Absolute Frame was read as a dependency, not reviewed as the next campaign target. The earlier accepted corrections and their open scientific obligations remain intact.

| Finding | Classification and significance | Decision state |
| --- | --- | --- |
| F5-1 | High: the finite reconstruction acceptance statement is not a valid universal certificate as written | ✓ Done — accepted, integrated, and verified; [receipt](#f5-1-accepted-integration--2026-09-09) |
| F5-2 | Moderate: straight accelerated motion is omitted, and the linked self-hit requirement conflicts with the root geometry | ✓ Done — accepted, integrated in both documents, and verified; [receipt](#f5-2-accepted-integration--2026-09-09) |
| F5-3 | Moderate: the observer diameter is a schematic target until its protocol, output type, metric, and calibration are fixed | ✓ Done — accepted, integrated, and verified; [receipt](#f5-3-accepted-integration-and-chapter-closeout--2026-09-09) |

#### F5-1 — Separate exact center recovery from finite inverse conditioning

**Location:** target lines 98–153, especially 113, 131–153. The four-point Gram determinant correctly detects affine independence. The later text makes a positive solid-angle floor and the direction matrix $G_a$ into theorem-level acceptance conditions for any finite reconstruction without stating whether the radius is known, how discrete samples represent a patch, or whether local conditioning or global uniqueness is certified. Those distinctions change the mathematics.

**A positive solid angle is not necessary for exact finite recovery.** Consider four unit-sphere vertices with coordinates $(1,1,1)/\sqrt3$, $(1,-1,-1)/\sqrt3$, $(-1,1,-1)/\sqrt3$, and $(-1,-1,1)/\sqrt3$. Their displacement Gram determinant is $256/27>0$, so their unique circumsphere is recoverable. Their finite direction set has spherical area zero. Interpreting $U_a$ as those observed points would therefore reject an exact, well-conditioned reconstruction under the stated positive-area rule. If $U_a$ instead denotes an instrument's continuous footprint, that footprint and its relation to the weighted samples must be declared. It is not the same object as a finite point set. This example does not refute a deliberately conservative instrument policy; it refutes presenting that policy as a mathematical necessity for every finite reconstruction.

The exact center equations are obtained by subtracting squared-distance constraints. For $\mathbf d_\alpha=\mathbf Y_\alpha-\mathbf Y_0$ and unknown center $\mathbf z$,

$$
2\mathbf d_\alpha\cdot\mathbf z
=\|\mathbf Y_\alpha\|^2-\|\mathbf Y_0\|^2,
\qquad \alpha=1,2,3.
$$

The radius cancels. If the three displacement vectors span space, the linear system has exactly one center; the radius is then its distance to any sample. This supplies the independent algebraic reason for the four-point certificate. Positive determinant alone establishes exact rank, not a numerical error bound: a quantitative singular-value bound, coordinate scale, and measurement-error model are needed for a noisy fit.

**The stated $G_a$ is a local known-radius matrix.** For radial residuals $r_k(\mathbf z,R)=\|\mathbf Y_k-\mathbf z\|-R$, let $\hat{\mathbf n}_k=(\mathbf Y_k-\mathbf z)/R$ at an exact fit, and choose positive weights normalized by $\sum_k w_k=1$. The differential is

$$
\delta r_k=-\hat{\mathbf n}_k\cdot\delta\mathbf z-\delta R.
$$

If $R=c_f(T-T_t)$ is fixed by exact tagged times, $\delta R=0$ and the center normal matrix is indeed $G=\sum_k w_k\hat{\mathbf n}_k\hat{\mathbf n}_k^T$. It controls local sensitivity near a selected solution. If radius is also fitted, eliminating its perturbation gives the center matrix

$$
C=G-\bar{\mathbf n}\bar{\mathbf n}^{T},
\qquad
\bar{\mathbf n}=\sum_k w_k\hat{\mathbf n}_k.
$$

To see why, minimizing $\sum_k w_k(\hat{\mathbf n}_k\cdot\delta\mathbf z+\delta R)^2$ over $\delta R$ sets $\delta R=-\bar{\mathbf n}\cdot\delta\mathbf z$. Substitution leaves $\delta\mathbf z^T C\delta\mathbf z$. The centered matrix, not $G$ alone, detects a tradeoff between center displacement and radius. Uncertain tagged times likewise require radius uncertainty to be propagated; treating the radius as exact is an additional measurement assumption.

**An explicit ambiguity passes the $G$ test.** Set $c_f=1$, radius $R=1$, $a=\sqrt{2/3}$, and $b=1/\sqrt3$. Observe the four points $(a,0,0)$, $(0,a,0)$, $(-a,0,0)$, and $(0,-a,0)$. Both centers $(0,0,b)$ and $(0,0,-b)$ are distance one from every point. At either fit, equal weights give

$$
G=\frac13 I_3,
\qquad
C=\operatorname{diag}(1/3,1/3,0).
$$

The stated direction-rank test therefore passes both centers at any floor no greater than $1/3$. With fixed radius, it certifies local rank but does not choose between the two solutions. With free radius, centers can slide along the axis while radius changes, and the zero eigenvalue of $C$ detects that ambiguity. The four-point displacement determinant correctly rejects this coplanar example; it must not be replaced by $G$ as though the two certificates were equivalent. A small noncoplanar perturbation restores exact uniqueness while leaving the joint fit arbitrarily ill-conditioned as the perturbation tends to zero. This is why the text must retain the separate roles of exact uniqueness, local rank, and bounded uncertainty.

**Smallest repair:** retain the exact full-sphere and four-point proofs; distinguish continuous footprint from discrete samples; specify positive normalized weights or a fixed weighting convention; explicitly make $G$ a local known-radius certificate; retain an independent global uniqueness or side-selection condition; and use the augmented Jacobian or $C$ when radius is uncertain. Present aperture thresholds as declared sufficient instrument criteria with their error model, not universal theorem-level necessities. This sharpens the current inverse argument without introducing a new physical postulate or a new gate.

Claim grade: derived for the rank calculations and counterexamples. The numerical spot check is measured by `.tmp/sabrina-detecting-review/check-counterexamples.cjs`, which first passed known Gram/determinant and six-axis moment cases, then reproduced the two unit-radius centers, $G=I_3/3$, $C_{33}=0$, and the tetrahedral determinant within $10^{-12}$. The exact algebra above is the durable support; the script is disposable. Falsifier: an explicit local assumption that already fixes a unique center and supplies the correct radius/error treatment would narrow the repair; it would not turn a finite direction set into positive spherical area.

#### F5-2 — Preserve the time parameter when classifying motion

**Location:** target lines 55–64 and 185–201; linked dependency [Master Equation, Self-Hit Condition](../../../content/markdown/aaa/dynamics/master-equation.md#self-hit-condition), lines 2684–2687 at inspection. The sentence at line 57 says accelerated motion means a curved center history. Acceleration can instead change speed along a straight spatial line. The later paragraph at line 185 correctly says “accelerated or curved,” so the early summary is inconsistent with the more careful treatment.

For a smooth prescribed path in normalized units, choose

$$
\mathbf X(T)=\left(\frac{T+T^2}{2},0,0\right),
\qquad
\mathbf V(T)=\left(\frac12+T,0,0\right),
\qquad
\mathbf A(T)=(1,0,0).
$$

On an interval containing $[0,1]$ and lying above $T=-1/2$, the path is regular and straight, with nonzero acceleration and zero spatial curvature. Its tagged centers lie on a line but are not traversed at constant rate. Thus a line of centers is insufficient for uniform motion; the absolute emission-time labels are essential. Rest means a constant center curve over the interval, while non-rest does not mean velocity is nonzero at every instant. At the stated absolute-continuity regularity, velocity identities hold almost everywhere unless stronger differentiability is supplied.

**The linked dependency needs a separate disposition.** Detecting's lines 187 and 201 correctly avoid making curvature necessary for the geometric self-hit equality. The Master Equation's linked requirements instead say the worldline must curve and that straight-line motion admits no self-hits. The same prescribed path disproves that assertion as a general property of the root equation. At reception $T_r=1$ and emission $T_t=0$, displacement and delay are both one. For nearby emission time $s<1$,

$$
F(1,s)=\|\mathbf X(1)-\mathbf X(s)\|-(1-s)
=\frac12s(1-s),
\qquad
\partial_sF(1,0)=\frac12.
$$

The root is noncoincident and simple; its transmitter factor is $D_t=1-1/2=1/2$ and the declared weight is $W^{\mathrm{acc}}=2$. This is not the degenerate constant-speed $c_f$ riding case. It is a direct root-geometry counterexample, not a demonstrated trajectory of the full EOM solver: no claim is made that the prescribed acceleration is produced by a complete interacting configuration. Restricting the dependency statement to full dynamically realized histories would require a separate theorem excluding this type of straight accelerated history; the scalar root condition does not provide one.

**Smallest repair:** replace the target's summary by “uniform motion gives an affine center curve in absolute time; acceleration changes its time derivative and may change speed, direction, or both.” Retain the exact self-hit equality and its transversality distinction. Record the linked Master Equation's curvature requirement for explicit correction or later Dynamics adjudication; do not weaken the target's correct geometry to match that sentence. This dependency was inspected because the target relies on it; it does not count as a completed Master Equation review and is not authorization to edit that chapter.

Claim grade: derived for the kinematics and root calculation. Falsifier: differentiating the displayed path or substituting it into the declared root function fails to give the stated nonzero acceleration and simple root. A future proof about dynamically realized histories would constrain realization, not undo the kinematic calculation. The operator decision is whether to accept the target clarification and how to route the dependency correction before subsequent claims rely on curvature as a necessary condition.

#### F5-3 — Define what the observer-hiding diameter compares

**Location:** target lines 315–337, with context at lines 17, 66–68, 251–263, and 295–299. The chapter correctly labels operational hiding as a recovery target, not a demonstrated result. Its final inequality is nevertheless underdefined as an operator-checkable target: $\operatorname{diam}_{\mathrm{obs}}$ needs a fixed output space and metric; $\mathcal O$ needs a specified, calibrated observable family; and “re-preparing the same experiment” needs a rule for apparatus, medium, nuisance data, and comparison across histories. A velocity range alone does not supply those choices.

There are two distinct comparison problems. A deterministic matched-history statement compares calibrated outputs from a declared family of corresponding preparations. A statistical experimental statement compares record distributions or specified estimators across identically controlled preparation ensembles. In a deterministic substrate model, the ensemble describes unresolved preparation records; it is not a primitive probability postulate. Arbitrarily selecting one raw outcome at each velocity does not test either invariance claim. For example, identical unbiased binary-output laws at two velocities can yield one recorded 0 and one recorded 1, giving diameter one despite exact equality of the laws. Conversely, selecting matching outcomes from two different laws can give diameter zero. This is an abstract measurement-model counterexample, not an assumed architrino realization.

Normalization matters independently. If a scalar readout $f$ is replaced by $\alpha f$, its numerical diameter scales by $|\alpha|$. The same physical criterion is preserved only when the metric and tolerance transform consistently, or when a calibrated dimensionless residual is fixed in advance. Without that declaration, the written inequality has no unique numerical interpretation. This is missing specification, not evidence that a physically defined leakage bound fails.

The existing [Observer Framework](../../../content/markdown/aaa/spacetime/observer-framework.md) supplies the relevant retained-record vocabulary: readout, apparatus response, modulation protocol, calibration covariance, nuisance family, and boundary-wake data. [Theorem G](../../../content/markdown/aaa/spacetime/lorentz-kinematics.md#theorem-g-structural-integrity-common-limit-closure) likewise requires the clock, ruler, photon, and other channel residuals to come from the same retained branch and medium account. Those are appropriate dependencies for this chapter's target. They must be instantiated for the selected comparison rather than replaced by a universal raw-record diameter.

**Smallest repair:** define $Q_{\mathrm{erase}}$ as the specified loss of inaccessible provenance; say explicitly whether the retained output is a deterministic matched observable, an estimator, or a record law; fix a calibrated metric or dimensionless channel residual and admissible family; and state which preparation and environment quantities remain controlled as $\mathbf w$ varies. The page can remain at theorem-target grade without supplying a numerical closure proof. Also distinguish an unproved bound from a violated bound in the closing sentence: lack of a derivation leaves recovery open, while a verified above-bound residual in the declared tested regime falsifies that particular recovery claim. The sentence at line 299 about a frame hidden by emergent geometry should retain the target status stated at lines 253 and 295.

Claim grade: derived for the raw-outcome and rescaling counterexamples; inferred for the recommendation that the target needs this explicit type and protocol declaration. Falsifier: a local definition fixes the matched preparations, output type, calibration, and metric and the equation is explicitly restricted to that definition. Neither counterexample establishes observable preferred-frame leakage in the actual theory.

#### What survives and a useful next derivation

The exact sphere-center lemma survives. If two centers generated the same full sphere, subtracting their squared-distance equations would put that full sphere inside one affine plane unless the centers were identical, which is impossible for a positive-radius sphere. The transmitter tags therefore recover the center curve on the declared emission window. For an absolutely continuous curve, equal position functions give equal velocities almost everywhere. Retained identity and polarity must be part of the tagged record, as the proof states; untagged geometry alone cannot recover polarity. No conclusion extends to the unobserved history or to an observer-accessible decomposition of a summed signal.

The diameter identity also survives: $D_a(I)=0$ exactly when every center is the same, and uniform motion has $D_a(I)=\|\mathbf V_a\|\Delta T_I$ on a bounded interval. This is a result within the fixed Euclidean spatial identification and absolute-time structure; it does not derive those substrate commitments. The boosted wake equation in Absolute Timespace explains why a time-dependent translation changes the propagation representation, while a fixed origin shift or rotation preserves center coincidence.

The self-hit threshold remains a geometric necessary condition. Absolute continuity gives

$$
\|\mathbf X(T_r)-\mathbf X(T_t)\|
\le\int_{T_t}^{T_r}\|\mathbf V(s)\|\,ds.
$$

A strict sub-wake-speed history cannot reach the required chord length. Constant straight motion with speed below or above $c_f$ has no positive-delay root; constant speed exactly $c_f$ has the degenerate riding equality rather than a simple-root chart. Variable-speed straight motion is the distinct case in F5-2. These statements neither prove binding nor supply a constitutive inertial response.

The seven continuous generators follow from the declared $E(3)\times\mathbb R$ kinematic symmetry: three spatial translations, three rotations, and one time translation. Reflection is disconnected and adds no continuous generator. The target correctly retains conservation of the associated charges as conditional on an appropriate action and its history/boundary terms. The link to Theorem G supplies a recovery target, not proof that effective boost generators have already been constructed.

A useful extension is an uncertainty statement for the rest diagnostic. Suppose every retained center estimate has position error at most $\eta_z$, and let $\widehat D$ be the diameter of the estimated centers at those emission times. Pairwise triangle inequalities give

$$
\max(0,\widehat D-2\eta_z)\le D_{\mathrm{sample}}
\le\widehat D+2\eta_z.
$$

Thus $\widehat D>2\eta_z$ certifies non-rest at the sampled times; small estimated diameter does not certify exact rest. If a path speed bound $\|\mathbf V\|\le L$ is independently available, the emission samples include the interval endpoints, and the largest sample gap is $h$, then every time is within $h/2$ of a sample and

$$
\max(0,\widehat D-2\eta_z)\le D_a(I)
\le\widehat D+2\eta_z+Lh.
$$

Each of two centers can move at most $Lh/2$ to its nearest sampled time, which proves the extra $Lh$ term. This is a derived conditional error bound, not a new measured instrument or a bound already available from the theory. Without a temporal regularity bound, excursions between identical samples can be missed. The extension would turn the chapter's warning about finite access into a precise limited statement once F5-1 supplies center-error bounds. Falsifier: the assumed error enclosure or speed bound fails, or the sample endpoints/gap condition is not met. It does not authorize approximate-rest claims from an uncalibrated reconstruction.

#### External source and completion boundary

The cited Nagel et al. 2015 result was checked against the [publisher's article](https://www.nature.com/articles/ncomms9174), abstract and Results/Analysis. It supports the stated orientation-dependent fractional-frequency constraint $(9.2\pm10.7)\times10^{-19}$ at 95% confidence. The apparatus used orthogonal cryogenic sapphire oscillators and analyzed rotation-related frequency modulation. The Discussion explicitly notes that its readout constrains a combination of photon and material effects. This supports the target's observer-level comparison and its insistence on an apparatus-dependent closure; it is not a direct bound on primitive $c_f$ or on arbitrary raw outputs. No new literature-mining campaign or claim about the latest experimental ceiling was made.

Coverage after this complete target reading is 7 of 9 Foundations chapters: six with accepted corrections verified in the existing receipts, one with findings awaiting discussion, and two not yet reviewed. The findings above are unaccepted, and none was implemented in corpus sources. No physical response map, operational hiding theorem, full solver conformance, or new scientific closure is claimed. The next unread target remains Constructing the Absolute Frame, but it has not been started as a review. This turn stops for Mark's decisions on F5-1 through F5-3; no external or execution blocker prevented the review.

Review-record validation: after correcting a scratch-only module import path, `.tmp/sabrina-detecting-review/check-review.cjs` passed its known extraction and KaTeX cases before checking the new review section. All 80 mathematical expressions parsed with vendored KaTeX, and its four local file-link targets exist. This verifies syntax and file existence, not visual rendering, fragment validity, or scientific correctness. `git diff --check -- reference/priorities/aaa-corpus-rewrite/work-queue.md reference/priorities/aaa-corpus-rewrite/priorities.md` passed. A final `shasum -a 256` returned the same reviewed target hash, so the reviewed corpus bytes remain unchanged. Only the two existing review records and disposable ignored scratch scripts were written.

#### F5-1 accepted integration — 2026-09-09

Mark explicitly accepted F5-1 after discussion and authorized its smallest complete correction in Detecting the Absolute Frame, followed by a complete chapter reread and verification. This acceptance covers exact uniqueness versus measurement-error sensitivity, continuous footprints versus discrete samples, positive normalized weights, known versus fitted or uncertain radius, and independent uniqueness or side selection. F5-2, F5-3, the Master Equation dependency, and subsequent chapter reviews remain outside edit authority.

The integrated passage retains the full-sphere and four-point determinant statements and derives the center equations by subtracting squared distances. It explains the dimensional and error-model limits of a positive determinant, makes a footprint threshold an instrument-dependent sufficient criterion rather than a universal necessity, and defines the radial residual and its differential. The known-radius matrix controls local first-order sensitivity; eliminating a freely fitted radius gives the centered matrix. Constrained radius uncertainty must be propagated or included in a joint fit. The two-center example demonstrates why local rank does not select a global solution. The tagged-emission lemma now assumes unique center recovery from exact support data rather than an aperture threshold; this is the only correction outside the finite-reconstruction passage and is required to keep its proof consistent with F5-1.

The mathematical grade is derived from the squared-distance subtraction and weighted residual minimization recorded above and now included in the chapter. The unchanged counterexample instrument was rerun after its known Gram, determinant, and six-axis cases passed: it again verified both unit-radius centers, the local and centered matrices, and the tetrahedral determinant within its floating-point tolerance. These calculations supplement the exact algebra; they do not constitute an EOM solution, interval certificate, or independent review. A full reread of the revised chapter using two contiguous `sed` ranges was editorial self-review. It retained the existing F5-2 and F5-3 findings without implementing them or claiming whole-chapter closure.

Measured validation and preservation:

- `shasum -a 256` verified the pre-edit chapter against reviewed hash `8a62ef2951e06ed1aa6586f2e2ca010f63368bc2cbdc6f256cd82d335d451d9b`; the resulting 361-line chapter measured by `wc -l` has SHA-256 `d70eefd394dbcc29864cc62727b6d4fa1e7cdd4fe888de12d7db06909c808cec`.
- `.tmp/sabrina-detecting-review/check-integration.cjs` passed known extraction and KaTeX cases before its target run. All 103 chapter math expressions parsed with vendored KaTeX; all 29 local file-link occurrences have existing file targets. It verified that all 12 original display equations and the entire existing link list are unchanged; there are now 15 displays. It also compared the baseline prefix and suffix, allowing only the finite-reconstruction passage and the lemma assumption to differ. This checks syntax, file existence, and byte preservation, not rendered appearance, every fragment, or mathematical correctness.
- `node scripts/validate-equation-mapping-links.mjs` passed for its 23 registered canonical equation links. This is the checker's registered scope, not all corpus links.
- `node scripts/validate-content.mjs --check --strict` completed with zero errors and zero warnings. Scoped `git diff --check` passed for the chapter and these two review records.
- `node scripts/build-equation-mapping-corpus.mjs --check` reported the three new displays without generated canonical source links and stale `content/generated/equation-mapping/corpus-equations.json`. Expected source-edit drift remains for `node scripts/build-equation-mapping-corpus.mjs --write` under the authorized regeneration/publication procedure. No generated files were edited.

Falsifier and completion limit: a baseline comparison showing changes outside the stated passage and lemma assumption, a failed recorded check, or a failure of the displayed subtraction/minimization algebra would overturn this scoped completion claim. The accepted correction does not supply an apparatus error model, establish observer hiding, or resolve F5-2/F5-3. Current coverage remains seven complete Foundations readings: six chapters with all accepted corrections verified, one partially integrated chapter, and two not reviewed. The immediate next discussion is F5-2; F5-3 follows separately.

#### F5-2 accepted integration — 2026-09-09

Mark accepted the general explanatory correction and explicitly authorized both Detecting the Absolute Frame and the linked Master Equation Self-Hit Condition requirements. Mark explains that the curvature requirement escaped from an earlier constrained example; this is operator-provided historical context, not independently verified Git attribution. No historical commit attribution was attempted.

Detecting now distinguishes a center curve affine in absolute emission time from a straight spatial path traversed at variable speed. Its displacement formula is explicitly scoped to uniform motion. The rest procedure distinguishes rest throughout an interval from non-rest without asserting nonzero velocity at every instant, and states the almost-everywhere velocity conclusion for absolutely continuous paths. The Master Equation requirements now distinguish constant-velocity straight motion, degenerate field-speed riding, and variable-speed straight histories with isolated simple roots. The prescribed quadratic path and direct root substitution establish the geometric counterexample at derived grade, explicitly without asserting dynamical realization or acceleration balance. Inspection of the immediate persistent-memory context found the same general curvature requirement in its concluding implication; that sentence was corrected while the valid curved-motion scenario and circular examples were preserved.

Validation and scope: the complete Detecting chapter was reread after integration, supplementing the main `cat` output with `sed` for its truncated middle; the immediate Master Equation self-hit context was reread with `sed`. This was editorial self-review, not a full Master Equation review or independent scientific review. `.tmp/sabrina-detecting-review/check-f5-2.cjs` passed known extraction, polynomial-value, and boundary-selection cases before its final target run. It parsed all 105 mathematical expressions in Detecting and 43 in the immediate Master Equation self-hit context with vendored KaTeX. It compared all display equations and link lists in both full files and found them unchanged, and compared prefixes/suffixes to restrict changes to the approved prose passages. The first preservation run used an ambiguous abbreviated start marker that matched an earlier curvature item; the corrected exact marker passed after correcting an off-by-one expected position in its known-case fixture. These scratch-checker failures did not establish source defects. The final result verifies syntax and scoped byte preservation, not rendered appearance or solver behavior.

`node scripts/validate-equation-mapping-links.mjs` passed for its 23 registered links, and `node scripts/validate-content.mjs --check --strict` completed with zero errors and zero warnings. Scoped `git diff --check` passed for the two corpus sources and two existing review records. The F5-1 generated-drift disposition remains unchanged; no generators were run in write mode. No solver code or acceleration kernel was edited.

`shasum -a 256` measured Detecting before F5-2 as `d70eefd394dbcc29864cc62727b6d4fa1e7cdd4fe888de12d7db06909c808cec` and after as `9e2e70745995584bf365ef16184cd4fe64bc2f7b758a6093025f888306587b3c`; it measured the Master Equation before as `dbb88e073d51b5980e0520c0720439e803eeab35b350c49b3dd67adc3f036a3d` and after as `6a9675f6a6e193e939f20e78f11ed65a881b75bafde695677604656ab145d865`. Falsifier: a differing display equation, an out-of-scope baseline difference, or failed substitution/differentiation of the prescribed path would overturn the respective preservation or geometric claim. F5-1 and F5-2 are separately accepted and verified; F5-3 remains unapproved and unchanged. The next discussion is F5-3, and no following-chapter review has begun.

#### F5-3 accepted integration and chapter closeout — 2026-09-09

Mark accepted F5-3 and authorized completion of the current chapter assignment, stopping before Constructing the Absolute Frame. The correction defines the deterministic matched-history interpretation of the existing diameter target: a controlled apparatus and preparation rule, admissible environment and nuisance family, specified provenance erasure, fixed calibrated readout into a metric output space, and a metric/tolerance selected for the actual observable and empirical comparison. It separates statistical record or estimator distributions from individual deterministic outcomes and requires their own ensemble, distance, and uncertainty analysis. It corrects both the closing statement and the earlier experimental comparison to distinguish an unproved bound from a demonstrated violation; emergent hiding remains a derivation target.

The live Observer Framework retained-record definition and Theorem G common-branch requirement ground the preparation, calibration, nuisance, and medium restrictions. Their source files were read as dependencies and not modified. No numerical tolerance, apparatus model, physical response, ensemble law, or hiding result was invented. This is a definition and claim-boundary repair, not a proof of observer-level recovery.

The complete revised Detecting chapter was reread through contiguous `sed` ranges 1–180 and 181–390. This was editorial self-review. `.tmp/sabrina-detecting-review/check-f5-3.cjs` passed known extraction and KaTeX cases before checking the chapter: all 109 math expressions parsed, all 31 local file-link occurrences have existing file targets, and all 15 display equations are unchanged from the F5-2 baseline. It retained the existing links and verified byte preservation before the final target except for the two approved claim-boundary paragraphs. Thus F5-1 and F5-2 remain intact. These checks establish syntax, file existence, and bounded source preservation, not visual rendering, arbitrary link fragments, or scientific correctness.

`node scripts/validate-equation-mapping-links.mjs` passed its 23 registered canonical links; `node scripts/validate-content.mjs --check --strict` completed with zero errors and zero warnings; scoped `git diff --check` passed for the two corpus sources and two review records. `shasum -a 256` measured the resulting Detecting source as `a0e851334dd06d929cc37261b34a58c1c9901b33e095cfa4164c3b8d719f7e30` and the unchanged F5-2 Master Equation source as `6a9675f6a6e193e939f20e78f11ed65a881b75bafde695677604656ab145d865`. F5-3 adds no display equations; the recorded F5-1 generated-drift disposition remains for its existing owner. No publication or regeneration was performed.

Chapter completion: F5-1, F5-2, and F5-3 each have accepted, implemented, verified corrections. The current disposition table now records seven of nine Foundations chapters with their accepted corrections verified, zero partially integrated chapters, and two unread chapters. This closes the assigned Detecting review and its explicitly authorized F5-2 dependency correction; it does not count as a complete Master Equation review. Historical review-stage statements and earlier receipts retain their chronology.

Remaining scientific obligations are apparatus-specific center-error and temporal-sampling bounds for finite rest diagnostics; dynamical realization of candidate histories rather than prescribed-path root geometry alone; and a common dynamics/medium derivation of clock, ruler, photon, and matter responses satisfying calibrated leakage bounds for declared deterministic or statistical comparison families. The existing conservation/action and physical-response obligations remain open. Falsifier: failure of the stated baseline/check results would invalidate the relevant integration receipt; a calibrated, uncertainty-controlled above-bound prediction in an admitted family would refute that particular hiding claim. No further correction decision remains for F5-1 through F5-3. Stop here; Constructing the Absolute Frame remains the next unread chapter and requires a subsequent assignment.

### CRW-005 Packet 2 document 1 — Master Equation assurance review, 2026-09-10

#### Scope, disposition, and coverage

The operator authorized exactly one complete assurance review of [Master Equation](../../../content/markdown/aaa/dynamics/master-equation.md), comparison with its pre-campaign source and the live edition requirements, and capture in this existing workstream record. This entry is that review's disposition: **review complete; corrections proposed for discussion, not accepted or applied**. The corpus chapter and the lane manuscript were not edited. No second chapter was reviewed. Reads of linked definitions and headings below are dependency checks, not additional document reviews. This fresh Codex review follows the current assignment; it does not impersonate the Claude reviewer named in the earlier campaign plan or claim a separate agent's verification.

The reviewed chapter has 5,891 source lines and SHA-256 `6a9675f6a6e193e939f20e78f11ed65a881b75bafde695677604656ab145d865`, measured by `wc -l` and `shasum -a 256`. The pre-campaign source is Git object `897fe1aa7:content/markdown/aaa/dynamics/master-equation.md`, SHA-256 `ccff8f702e9c2b3919a20186f05e804d11c7b829575850cae1b7844c3c963513`, extracted with `git show`. The review read the complete current chapter in sequential ranges and compared the baseline through the complete nonblank change set from `git diff --ignore-blank-lines --unified=0 897fe1aa7 -- content/markdown/aaa/dynamics/master-equation.md`, with the full diff retained as scratch. Line references below address that reviewed current hash; later changes require remapping them.

The comparison used CRW-005 and this queue's edition-1.0 preservation and teaching requirements, the current edition-1.1 [academic style guide](../../../content/markdown/aaa/archie/academic-style-guide.md), mathematical and terminology guidance, the live corpus-reviewer procedure, and the foundational distinction among substrate, assemblies, effective descriptions, and observer records. The imported mathematical frameworks below are comparison tools and proof obligations; standard-physics laws are not premises for architrino motion.

By the recorded Packet 1 inventory of 14 documents plus this one new disposition, **15 of 190 assurance documents are reviewed and 175 remain**. This is review coverage, not 15 fully corrected chapters and not completion of CRW-005. A known-case-tested preorder traversal of `content/graph/textbook_toc.json` gives the Dynamics order: Master Equation, Energy, Entropy, Binary Dynamics, Causal Action Functional, Effective Lagrangian. The exact next target is [Energy](../../../content/markdown/aaa/dynamics/energy.md), `content/markdown/aaa/dynamics/energy.md`. The separate nine-document Foundations campaign and the manuscript fidelity review do not change this denominator. A newer recorded assurance disposition or a changed live reader order would overturn this progress calculation; check the CRW-005 row and the textbook TOC before the next assignment.

#### Overall assessment and preserved strengths

The current chapter makes several sound and valuable distinctions: the sharp causal-root acceleration law is the postulate; the dual mollifier is an auxiliary calculation; transmitter-side weight is distinct from receiver-side playback; finite-history boundary exits are distinct from interior singular roots; prescribed geometry does not establish a realized stable assembly; and work-integral constancy does not independently prove a Noether charge. Those distinctions should survive any repair.

The baseline comparison also confirms substantive corrections, so the resulting chapter cannot be described as a purely mechanical, equation-preserving conversion. Examples include restoring acceleration-first action diagnostics, removing unconditional well-posedness and energy claims, correcting effective redshift conventions, identifying the sharp-law recovery limit, and renaming the claimed exact action as a candidate. These are appropriate changes in authority where justified by the displayed reasoning, but exact before-and-after provenance remains necessary. Equal display counts do not establish identical equations. The review does not reverse prior accepted corrections merely to satisfy the original mechanical criterion.

The remaining problems are concentrated in duplicate summaries, missing hypotheses, the full circular-root chart, and statements that outrun the proof immediately preceding them. Findings ME-1 through ME-11 include explicit internal contradictions or counterexamples. ME-12 through ME-16 distinguish incomplete mathematical constructions, source and teaching defects, and questions requiring additional definitions. None establishes an EOM solver defect or a physically realized counterexample trajectory.

**Severity and relative importance:** High within this chapter: ME-5 (incorrect circular formulas/count), ME-6 (incorrect delayed-distance substitution), and ME-7 (incompatible well-posedness statement). Address these first because they change quantitative conclusions or the domain on which a solution is asserted. Medium: ME-1 through ME-4 and ME-8 through ME-14, covering mathematical scope, dimensional and sign errors, unsupported stability/cost claims, incomplete action and topology constructions, and lost measurement provenance. Low: ME-15, an editorial repair under the lane requirements. ME-16 is an unresolved reproducibility/specification question of medium importance, not a proved defect in a populated benchmark. These are document-review priorities; no downstream implementation failure has been established.

#### ME-1 — Straight spatial motion can admit a simple self-hit

**Location and grade:** lines 1248–1264 versus the later Self-Hit Condition around lines 2684–2717. Derived counterexample; definite internal contradiction.

The early list makes curvature necessary and its implication repeats “exceeded … and curved.” The later section already correctly removes that requirement. In normalized units $c_f=1$, take the prescribed path $\mathbf X(T)=((T+T^2)/2,0,0)$ on $[0,1]$. At reception $T_r=1$ and emission $T_t=0$, the separation and elapsed time both equal one. For emission variable $s$ near zero, the causal gap is $F(s)=s(1-s)/2$, so $F'(0)=1/2\ne0$. This is a noncoincident simple geometric root on a straight spatial line with changing speed. It is not a solved trajectory of the full interaction law, nor a complete assembly-admissibility certificate; it suffices to disprove the claimed geometric necessity of curvature.

**Smallest repair and falsifier:** make the early list and implication agree with the later interval-speed lemma and counterexample. A valid objection would have to show the root is coincident, nonsimple, or the path spatially curved under the stated definitions. Direct differentiation and the coordinates settle those checks. Inspection of the actual `27f5f3781^..27f5f3781` target diff shows the later repair while the early duplicate survives; this is a residual inconsistency, not evidence that the accepted later correction introduced a dynamics error.

#### ME-2 — A singular root is not necessarily an ordinary fold

**Location and grade:** Proposition 3, lines 1023–1041; separator table around line 1178. Derived counterexample to the unqualified fold classification.

The equations $F=0$ and $F_{T_t}=0$ locate a singular root. An ordinary fold additionally needs a nonzero second emission derivative and a transverse control derivative. The chapter correctly states those extra conditions for the generic pair-creation calculation and in its earlier caustic discussion, then says all interior root-count changes occur only at folds. For $F(u;\lambda)=u^3-\lambda u$, negative $\lambda$ gives one simple root and positive $\lambda$ gives three. At the transition $F_{uu}=0$, so it is not an ordinary fold. The signed degree remains one: after the transition the two outer derivatives are positive and the middle derivative negative. This local scalar family disproves the universal classification; no physical realization is claimed.

**Smallest repair and falsifier:** say “singular roots,” reserve the fold jump law for its stated generic hypotheses, and keep higher degeneracies routed to their own normal forms. In the separator table, $D_t=0$ alone must not certify an ordinary fold; similarly, $D_r=0$ gives stationary playback but reversal needs a sign change. A proof that the admitted family excludes all higher degeneracies would justify a narrower fold-only statement; its hypotheses must be supplied where the claim is made.

#### ME-3 — A lower delay bound does not give an equivalent retention test

**Location and grade:** lines 1144–1166. Derived inequality error.

The proposition establishes $\Delta_{\mathrm{fwd}}\ge d_{\min}/(c_f-u)$. Consequently $\Delta_{\mathrm{fwd}}<h$ implies $u<c_f-d_{\min}/h$; the converse does not follow. For a prescribed stationary pair with separation vector $(1,3,0)$, choose the first coordinate as the forward direction, $d_{\min}=1$, $h=2$, and $c_f=1$. Then $u=0<1/2$, but the exact delay is $\sqrt{10}>2$ and the root is outside the retained memory. The current word “equivalently” loses transverse separation and any slack in the lower bound.

**Smallest repair and falsifier:** call the speed inequality necessary, or state the special collinear equality assumptions under which it becomes sufficient. Substitution in the exact distance equation checks the counterexample. This does not reject the forward-starvation obstruction at or above the bound; it rejects using that obstruction as an exact availability threshold below it.

#### ME-4 — Sub-field-speed monotonicity gives at most one retained root

**Location and grade:** Single-Hit Regime, lines 1191–1210, against Proposition 2. Derived existence counterexample.

A positive derivative on the entire declared interval makes the delay map injective. Existence still requires an endpoint bracket or another existence assumption. With $c_f=1$, a stationary transmitter at zero, receiver at distance two, reception time zero, and retained interval $[-1,-0.1]$, the gap is $F(s)=s+2>0$: there is no retained root despite strict sub-field-speed motion. A bound only locally near a candidate root also cannot establish global monotonicity on the retained interval.

**Smallest repair and falsifier:** retain Proposition 2's interval-wide bound and bracket; say “at most one” before imposing existence. Scope the causal set explicitly to retained emissions. The stated affine gap and its endpoint signs provide the operator-checkable falsifier of the current singleton assertion. The full-history root at $s=-2$ remains present outside this window.

#### ME-5 — Three formulas still use an incomplete circular-root chart

**Location and grade:** lines 3341–3376, 3395–3430, and 3542–3567. Derived algebraic defects; the later signed branch treatment supplies part of the repair.

For circular motion, the actual distance equation is $|\sin\xi|=\xi/\beta_f$. Its nonzero domain includes $0<\xi\le\beta_f$. At $\beta_f=\pi/2$, the endpoint $\xi=\beta_f$ is a noncoincident simple root with $J=1$ and separation $2R$. The strict upper bound printed repeatedly excludes it; it is not the excluded zero-delay diagonal.

The full-chart Jacobian is

$$
J=1-\beta_f\operatorname{sgn}(\sin\xi)\cos\xi=1-\xi\cot\xi.
$$

The intermediate equality $J=1-\beta_f\cos\xi$ is valid only on positive-sine sheets. Likewise the unsigned threshold $\beta_f^\star=\sec\xi^\star$ omits the sign needed on alternating lobes. The later signed proposition is the appropriate local reference; its scope must also govern the earlier formulas.

Finally the bound $N_{\mathrm{self}}\le\beta_{\max}/\pi+C_{\mathrm{circ}}$ with an absolute endpoint constant cannot cover the full absolute-sine chart. Set $\beta_f=(m+1/2)\pi$. The first lobe contributes one positive root and each subsequent lobe through index $m$ contributes two, including the admitted final endpoint, giving $N=2m+1$. On each such lobe the function is strictly concave, negative at the left zero, positive before its crossing, and nonpositive at the right boundary; at the final peak its derivative is negative, so equality at the peak does not remove the earlier crossing. Thus the discrepancy from $\beta_f/\pi=m+1/2$ grows with $m$ and cannot be absorbed into a fixed constant. The full-chart leading coefficient is two, while a positive-sine-only count can have coefficient one.

**Smallest repair and falsifier:** include the regular upper endpoint, apply the sheet sign consistently, and state a valid full-chart count with an explicit endpoint convention. Substitution at $\beta_f=\pi/2$ checks the first defect; a negative-sine root checks the Jacobian; the lobe argument checks the unbounded count discrepancy. These are geometric root counts on prescribed circles. They do not certify a retained circular solution, fold transit, stability, or a runtime cost estimate.

#### ME-6 — Radial fall substitutes present separation for delayed separation

**Location and grade:** lines 2754–2781. Derived mismatch with the canonical kernel, plus an unsupported speed inference.

Write the symmetric positions as $\mathbf X_1(T)=-x(T)\mathbf e$ and $\mathbf X_2(T)=x(T)\mathbf e$. Their current separation is $r(T)=2x(T)$, whereas a retained partner hit has delayed separation $r_p=x(T)+x(T_t)$. The two-receiver contribution is therefore $r''=-2\kappa\epsilon^2W_p^{\mathrm{acc}}/r_p^2$, not the displayed expression with $r(T)^2$. “Schematic” does not identify the omitted retardation approximation when the formula is also described as canonical. The assertion that moderate initial separation keeps the speeds sub-field-speed is also unproved; a starting separation alone supplies no speed bound over an entire fall.

**Smallest repair and falsifier:** use delayed separation, or explicitly restrict both the distance replacement and $W\approx1$ to a slow, short interval. Make sub-field-speed behavior a checked interval assumption. Any inward-moving history with $x(T_t)\ne x(T)$ distinguishes the denominators. A complete retained-history solution with a proved speed bound could settle the second issue; this review supplies no such solution and does not infer a collision from an instantaneous approximation.

#### ME-7 — The proposed well-posedness statement omits initial compatibility

**Location and grade:** lines 2493–2563. Derived necessary-condition failure in the stated theorem target; applicability of the cited framework remains open.

A solution that is $C^1$ across the join between prescribed history and forward evolution must satisfy $\phi'(0)=\mathcal G(\phi)$, where $\mathcal G$ is the chosen history evolution functional. This includes the position-velocity relation and the endpoint acceleration. An arbitrary $C^1$ history does not satisfy it. For example, two distinct stationary unlike histories can have simple positive-distance partner roots inside the memory horizon, finite branch count and bounded couplings, yet their nonzero endpoint acceleration under the kernel disagrees with the zero left derivative. W1–W5 do not remove that mismatch.

The later caveat correctly says the external hypotheses have not been verified, but the preceding “for any initial history” statement still promises a joined $C^1$ solution under insufficient assumptions. The finite-width integral and a root-resolved evaluation also need separately specified support and regularity; root floors alone do not describe every point sampled by a noncompact mollifier.

**Smallest repair and falsifier:** formulate the target on a compatible solution manifold, or weaken the joined regularity and state the corresponding history class and theorem. Keep local existence and global continuation conditional until the functional's extension and admissibility hypotheses are proved. Evaluating the two one-sided derivatives at the join checks the definite defect. A verified theorem covering the exact functional, compatible domain, boundary treatment, and continuation bounds would discharge the open application question.

#### ME-8 — Direct wake support is not a proved universal influence cone

**Location and grade:** lines 2652–2666. Inferred proof-gap finding.

A wake emitted at one event propagates at $c_f$ from its fixed emission center. That establishes its direct surface support. The stronger claim that all later influence of that event must remain inside the filled $c_f$ cone needs a theorem about the complete interacting histories. The model permits faster architrino motion; an altered intermediate history can be carried to later emission sites. The direct wake-support equation alone places no corresponding bound on that material-history leg. The existing Foundations distinction between direct hits and inherited influence is relevant here.

**Smallest repair and falsifier:** scope the equation to direct wake support, or explicitly to relay constructions whose every displacement leg is independently bounded by $c_f$ times its duration. Leave a universal influence or operational signal-speed theorem open. A derivation bounding all admitted material-history and retransmission legs would overturn this proof-gap finding. No actual faster-than-$c_f$ signal, observable violation, or dynamically realized relay has been demonstrated here.

#### ME-9 — The acceleration correction has a dimensional denominator error

**Location and grade:** lines 1354–1368. Derived dimensional inconsistency; the order of the physical correction remains guessed.

For acceleration $a$ and length $L_0$, the printed ratio $a^2L_0^2/c_f^2$ has dimensions of velocity squared. It cannot be added to one as a dimensionless relative period correction. If the intended small parameter is $aL_0/c_f^2$, its square has denominator $c_f^4$. Setting numerical $c_f=1$ does not settle the symbolic dimensional requirement or prove that the leading correction is quadratic rather than linear.

**Smallest repair and falsifier:** define a dimensionless acceleration parameter and state that the correction's order requires the transport derivation. A different declared meaning or normalization of $a$ could change this diagnosis, but the current prose calls it an acceleration scale; its units must be specified where used.

#### ME-10 — Circular balance has a sign inconsistency, and nonexistence is not instability

**Location and grade:** Corollary heading at line 3291, radial convention at line 3772, balance around line 3924, interpretation at line 3963. Derived sign inconsistency and unsupported stability conclusion.

The circular analysis declares outward radial acceleration positive and reports inward values as negative. Its signed balance therefore requires $\overline A_{\mathrm{rad}}=-\omega^2R$. The later positive right-hand side either has the wrong sign or silently switches to an inward magnitude. The adjacent text correctly says no stability verdict follows, then assigns an explanatory role to the bare MCB's “instability.” No spectrum or other stability evidence supplied there establishes that statement. Likewise a nonzero tangential residual excludes the specified constant-speed circle; it is not a stability spectrum about an equilibrium.

**Smallest repair and falsifier:** preserve one radial convention, describe the restricted partner-circle result as nonexistence within that ansatz, and keep instability conditional for a realized equilibrium. An explicit inward-magnitude redefinition at the later equation would resolve the sign issue; a balanced history with an independently justified delay spectrum would resolve the stability question. Neither follows from the current algebraic cancellation points.

#### ME-11 — The numerical advice lacks a traversal-rate condition and a cost model

**Location and grade:** lines 2933–2954. Derived insufficiency of the stated resolution rule; cost claims unmeasured in this review.

For fixed emission time, $g(T)=r(T,T_t)-c_f(T-T_t)$ has derivative $-D_r$. A mollifier width $\eta$ in this gap is traversed on a local time scale $\eta/|D_r|$. Therefore $\Delta T<\eta/c_f$ alone does not ensure resolution for unrestricted receiver motion. In normalized units $c_f=1$, a receiver approaching a stationary emission center at speed ten has $|D_r|=11$: a step $\eta/2$ satisfies the printed bound while exceeding the traversal scale $\eta/11$. Resolution by itself would still not prove integrator stability.

Spatial hashing also has no unconditional $O(N\log N)$ all-pairs bound when arbitrarily many sources or retained history samples occupy every queried neighborhood. The assertion that more than 100 particles is intractable provides no instrument, hardware, accuracy, history size, or wall-time measurement.

**Smallest repair and falsifier:** distinguish gap-resolution criteria from a stability proof, include the relevant traversal rates and event controls, and condition expected cost on a stated occupancy/history model backed by profiling. A proved global bound on $|D_r|$ or a method that resolves these events independently of the step rule would alter the first assessment. Actual profiling under an explicit accuracy and history contract could support the cost claim. No solver implementation or performance campaign was run.

#### ME-12 — The full action variation needs more than the receiver residual

**Location and grade:** lines 4942–5000, 5033–5208, and summary around line 5496. Derived additional term in the full path variation; the complete action construction remains open.

The displayed action sums ordered pair functionals $S_{ij}$ over complete paths. Varying $\mathbf X_i(t)$ changes its receiver appearances in $S_{ij}$ and its transmitter appearances in $S_{ji}$. The latter integrate over reception times later than $t$: past-causal support for each pair does not erase this part of a full path variation. The chapter's explicit residual $\mathbf C_{ij}$ is described as the receiver interior derivative plus its boundary term. Cancelling it is not, by itself, a derivation of the full Euler derivative of the displayed action. The action's $i\ne j$ sum also needs a separate self-history extension if it is to reproduce a master law containing admitted $i=j$ roots.

**Smallest repair and falsifier:** retain the receiver calculation as a necessary ingredient and list the transmitter variation, self-history domain, and common boundaries among the remaining action obligations. The summary's “only when” condition is necessary language; do not treat it as sufficient. State the remaining full-variation conditions alongside it, and remove the earlier description of the candidate as an exact variational action. A full variation or a precisely defined alternative variational principle that accounts for these terms could discharge the finding. This is not a no-go theorem for every possible delayed action.

#### ME-13 — The proposed root cohomology lacks its defining structure

**Location and grade:** lines 645–657 and Signed Causal-Root Complex after line 1043. Inferred formalization defect.

The chapter defines a set of admissible charts and restriction maps, then writes a Cech $\check H^1$ obstruction without specifying an abelian coefficient sheaf, a group-valued transition structure, or an alternative cohomology construction. A disagreement on triple overlaps does not automatically define that class. Likewise positive and negative root spans define a graded vector space, but a chain complex additionally requires a differential and its compatibility. The local-to-global distinction is useful; the displayed mathematical objects need enough structure for their conclusions to have a defined meaning.

**Smallest repair and falsifier:** state the concrete overlap-compatibility problem until the transition objects, cocycle law and equivalence relation are defined; call the root split graded bookkeeping unless a differential is supplied. A complete definition and a worked consistent/inconsistent overlap example would resolve this objection. Theorem-target status appropriately withholds proof, but does not define an otherwise unspecified object.

#### ME-14 — Conversion removed the identities of four cited instruments

**Location and grade:** current lines 332, 1622, 2218, and 3772; corresponding deleted baseline text. Measured provenance loss by target Git diff and exact-basename `rg --files scripts/equation-mapping` checks.

The baseline identifies `derive-causal-wake-update-law.mjs`, `verify-moving-single-root-scalar-gradient.mjs`, `analyze-fixed-point-cloud-residual.mjs`, and `analyze-circular-self-hit-binary.mjs`. The current text substitutes descriptions without a stable source reference, while preserving precise residuals, scan domains, or claims about instrument independence. All four implementation paths are present under `scripts/equation-mapping/` by the scoped file inventory. This review did not rerun them or establish that they still produce the reported results.

**Smallest repair and falsifier:** retain readable instrument names with stable, appropriate source links or an owning accessible evidence reference, following the corpus sources policy. A raw internal filename need not dominate the prose, but the claimed measurement must remain traceable. An existing unambiguous reference binding each passage to its instrument and exact run domain would overturn the provenance finding. Generic equation-viewer links alone do not identify these numerical runs.

#### ME-15 — Tag removal left repeated prose and fragmented mathematical teaching

**Location and grade:** lines 196–215, 602–604, 660–705, and 2528–2552. Editorial assessment supported by direct baseline/current paragraph comparison.

The wake-center paragraph is immediately retold with the same fixed center and growing radius; the emission-density explanation is likewise followed by a second explanation of the same dilution. The baseline delta shows that several retired plain-language labels were removed while the paired technical and paraphrase paragraphs remained. Criterion 12 requires integration of the explanation. Later, isolated displays for $h>0$, the branch-count symbol, the pair $(i,j)$, and the time $T$ interrupt sentences with separate viewer links. At the same time the root-sheaf discussion assumes substantially more apparatus than it teaches.

**Smallest repair and falsifier:** integrate each explanation where it introduces the mechanism, define new mathematical structures before using them, and preserve the existing equation and viewer identities through an explicitly authorized presentation change. Do not mechanically delete every explanatory repetition: definitions and examples that perform distinct work should remain. A rendered reading showing distinct instructional roles could overturn a specific redundancy judgment; the present review establishes source structure and KaTeX parseability, not visual layout quality.

#### ME-16 — The prescribed spiral “complete record” is not supplied for reproduction

**Location and grade:** lines 4541–4658. Open specification question, not a demonstrated numerical or physical error.

The text names a pitch amplitude, turn-center speed ratio, interval, four root tubes, and associated inactive-gap and memory data as the complete fixed record $C_{\mathrm{rs}}$. It does not supply those tube functions and bounds or an unambiguous executable source for them. Values and derivatives subsequently written as functions of $C_{\mathrm{rs}}$ therefore cannot be independently reconstructed from the displayed scalar inputs alone. The section correctly withholds canonical dynamics and an acceleration-balance verdict; that restriction should remain.

**Smallest repair and falsifier:** either give the complete prescribed history and tube/boundary data in an accessible source, or explicitly present this as a symbolic conditional construction whose data remain unspecified. A unique construction from the stated inputs, with independently checkable roots and derivative values, would settle the question. This review makes no claim that the proposed record is impossible.

#### Sources, links, and validation boundary

The bibliography's Hamilton and Noether identities were checked against the [Trinity College Dublin Hamilton archive](https://www.maths.tcd.ie/pub/HistMath/People/Hamilton/Dynamics/) and the [EuDML original-publication record](https://eudml.org/doc/59024). These support bibliographic attribution and the role of external variational mathematics, not an application theorem for the chapter's delayed action. The publisher search record matches the cited [Walther 2003 paper](https://www.sciencedirect.com/science/article/pii/S0022039603002183), but direct full-text retrieval returned HTTP 403. The author's accessible [2024 solution-manifold paper](https://arxiv.org/abs/2402.07636) explicitly states the solution-manifold restriction in its abstract. That provides context for ME-7; the endpoint-compatibility argument above is independent elementary differentiation. No full-text verification of Walther 2003 or new literature-mining campaign is claimed.

A task-local Node checker passed known cases for inline and quoted display extraction, fenced-code exclusion, local-link extraction, preorder TOC traversal, and a simple KaTeX expression before being run on the target. Its `check-results.txt` records 1,593 extracted current mathematical expressions accepted by the vendored KaTeX renderer, 412 display blocks in both baseline and current sources, and 433 local-link occurrences with existing file targets. The 20 distinct non-viewer local links were compared with their destination files and applicable headings. A separately known-case-tested viewer-ID extraction found all 412 current viewer-link occurrences in `content/generated/equation-mapping/corpus-equations.json`. Registry membership establishes that the IDs resolve in that local registry; it does not certify registry freshness, formula agreement, browser rendering, or mathematical truth.

The link delta removes the old `#exact-nonlocal-lagrangian` self-link in favor of the renamed candidate section and replaces viewer ID `corpus-equation-294f2da9e1cc87a7` with `corpus-equation-2760b9055d10f80c` for the revised regulator recovery statement. Those are recorded semantic changes, not unexplained missing links. External sites other than the bibliography checks were not exhaustively fetched. No generator was run, no instrument or oracle was modified, and no EOM run, full solver suite, visual render, or independent-agent acceptance is claimed.

Disposable extraction code, baseline, diffs, and checker output are under `.tmp/crw005-master-review/`; the useful findings, counterexamples, source limitations, hashes, progress and next target are preserved here. The chapter hash was rechecked before capture and matched the reviewed hash. The manuscript was measured immediately before capture as SHA-256 `7b99cacfe5fc297bc25f7a3b51a1b2f88c425288dea0295b4ccb0ba0bece6013`; this records the capture boundary, not a claim about other agents' earlier manuscript activity.

**Next authorized boundary:** discuss and adjudicate this chapter's findings. No correction is applied by this review, and Energy remains unreviewed until a subsequent assignment. CRW-005 remains in progress because its accepted-correction and remaining-document obligations are still open.

#### Capture validation

The review-record checker passed its known extraction and KaTeX cases before checking this entry, then accepted all 95 mathematical expressions and found all three local file-link targets. `git diff --check` passed for the three edited workstream files: this queue, `priorities.md`, and `evidence/conversion-ledger.md`. No conversion row was changed. A post-capture `shasum -a 256` still returned the reviewed chapter hash. The manuscript hash changed during this capture interval to `2e1ea92399257f97df446403b77a9c44413ba418a1aec881769793b71675d28d`; this task made no manuscript writes and claims neither byte stability nor a review of that concurrent manuscript revision. The measurement establishes a concurrent change, not its author or cause.

### CRW-005 Master Equation ME-1 through ME-16 — accepted integration, 2026-09-10

The operator explicitly requested correction of all 16 findings after the complete assurance review above. All 16 are **accepted and implemented within Master Equation**. Acceptance of a correction does not promote the associated open physical construction: the action, compatible-history existence theorem, global influence bound, stability analysis, and populated spiral example retain their stated proof burdens. No finding is deferred for an operator decision. The original review remains an immutable account of its inspected version; this entry records the subsequent correction.

The immediate pre-edit chapter had SHA-256 `6a9675f6a6e193e939f20e78f11ed65a881b75bafde695677604656ab145d865`; the corrected 5,892-line chapter has SHA-256 `d2a25fb7d970f4231e72f4c9564b1a15d20e5efe2caf8f0f63f88e2cbdc290d8`, measured by `shasum -a 256` and `wc -l`. Edits were guarded against a changed target before installation. The authored corpus scope is only [Master Equation](../../../content/markdown/aaa/dynamics/master-equation.md); the manuscript, other corpus chapters, source instruments, and historical scientific evidence were not edited by this task. Current-state assurance summaries in this queue, `priorities.md`, and the ledger introduction are updated separately from historical conversion rows.

| Finding | Disposition and implemented repair |
| --- | --- |
| ME-1 | Accepted. The early self-hit requirements now agree with the existing straight-line, variable-speed counterexample; super-field-speed interval history is necessary, not sufficient. |
| ME-2 | Accepted. Singular roots are distinguished from generic folds; the cubic counterexample and the extra fold hypotheses are explicit. Stationary playback is distinguished from reversal. |
| ME-3 | Accepted. The speed condition derived from a delay lower bound is necessary only, with the stationary transverse-offset counterexample showing why it is not sufficient. |
| ME-4 | Accepted. Uniqueness requires the interval-wide speed bound; existence requires a bracket. Both unsigned count and signed degree now explicitly restrict to the retained interval, as do the graded root spans. |
| ME-5 | Accepted. The circular root domain includes its regular upper endpoint, the Jacobian and tangency conditions carry the sine-sheet sign, and the full absolute-sine census has leading coefficient two. A half-wave counting argument gives an explicit uniform upper bound. |
| ME-6 | Accepted. Symmetric radial fall uses the actual partner-hit separation, with the simultaneous-distance approximation and its conditions stated separately. Initial separation no longer implies a global speed bound. |
| ME-7 | Accepted. The proposed theorem uses compatible histories and an applicable functional-domain theorem. It separates the finite-width integral from a root-resolved model, addresses noncompact mollifier support, and keeps continuation conditional. Repeated summaries and the pathology target now use the same hypotheses. |
| ME-8 | Accepted. Direct wake support is the emitted sphere. The filled cone is derived only for wake-only relay legs; the broader inherited-influence and observer-channel questions remain open. The opening summary was corrected too. |
| ME-9 | Accepted. The quadratic ansatz uses the dimensionless acceleration ratio squared, with denominator $c_f^4$. Its order remains guessed pending the transport derivation. |
| ME-10 | Accepted. Outward-positive radial balance has the negative centripetal sign. The partner-circle result is scoped nonexistence; no unsupported instability is assigned to the bare MCB. |
| ME-11 | Accepted. Numerical guidance distinguishes gap-traversal resolution from stability, treats stationary crossings separately, and conditions spatial-index cost on occupancy and retained history. A fixed particle-count performance threshold is removed. |
| ME-12 | Accepted. The candidate action explicitly includes the transmitter-variation obligation, self-history extension, ordered-pair normalization, and common boundaries. The receiver residual is necessary, not a complete action derivation; early and late summaries agree. |
| ME-13 | Accepted. Root spaces are a signed grading, with no unspecified differential or homology claim. Global gluing is formulated through actual record agreement and compatible relabelings. The previous section fragment remains as an explicit anchor for existing links. |
| ME-14 | Accepted. Four readable instrument names link to their actual source implementations. Their numerical and domain claims remain locally scoped; the reruns below independently reproduce the cited checks within those instruments' limits. |
| ME-15 | Accepted. Repeated wake-center, emission-density, and branch-record explanations are integrated. Parameter and history-space displays receive coherent introductions. Existing equation-viewer identities are retained. |
| ME-16 | Accepted. The spiral example is a conditional construction with unspecified full history and root data. Local radial shape and center-rate assumptions are explicit, including the locally even radial curve needed for the displayed radial-jet specialization. Unprovided sampled cancellation and inventory claims are removed. |

The chapter-wide self-review combined the complete source review from the preceding assignment, comparison of every changed passage and display against that unchanged baseline, whole-document structural checks, and targeted rereads across the theorem, summary, circular, spiral, and action sections. This found and repaired repeated versions of the same defects beyond the original cited lines: the opening universal-influence claim, the early action-residual sufficiency framing, the pathology theorem's abbreviated existence hypothesis, and the finite-interval root-count notation. This was the integrating author's self-review, not a separate agent review or a new full independent assurance pass. No additional chapter was reviewed or counted.

**Mathematical validation.** A task-local bisection helper returned the independently known square root of two before any circular target calculation. Direct Cartesian position/velocity geometry at three prescribed circular roots then agreed with the corrected signed Jacobian, including the upper endpoint and a negative-sine sheet. The root census gave 1, 3, 5, and 41 roots at the four tested half-integer multiples of $\pi$, matching the separate half-wave argument. Elementary checks covered the straight self-hit, missing bracket, delay-bound counterexample, delayed radial denominator, and receiver traversal scale. All numerical examples used $c_f=1$. These checks establish prescribed geometry and algebra; none is a solved EOM trajectory, singular-event continuation, or stability certificate. The proofs and counterexamples in the review and corrected chapter are the independent mathematical references, rather than agreement between duplicate implementations of a new rule.

The unchanged causal-wake update-law instrument and moving-simple-root scalar-gradient verifier both completed successfully with their built-in assertions. The latter returned maximum component residual `2.1183055309847987e-12`, reproducing the chapter's rounded figure; its wrong-scaling control returned `0.5125312228736556`. The unchanged circular analyzer completed its `--max-beta=20` run and returned the first formal cancellation at speed ratio `3.070356625390253`; this remains an algebraic candidate, not a stable solution. The existing `node --test tests/fixed-point-cloud-residual.test.js` suite passed 5 of 5 tests. No oracle or implementation was changed to make these comparisons agree.

**Structural validation.** The task-local validator passed known cases for quoted math, links, the canonical display parser, and KaTeX before checking the chapter. It accepted all 1,631 extracted mathematical expressions, found all 438 local file-link occurrences' targets, and verified that all 412 equation-viewer links retain their original IDs and order. Of 412 display blocks, 399 are byte-identical to the immediate baseline and 13 have the explicitly reviewed mathematical repairs. The canonical abstract and per-hit acceleration law is unchanged. The previous signed-root and circular-corollary fragments are retained as explicit anchors. These are source and syntax checks, not browser-layout verification or proof that every external link is reachable.

`node scripts/build-equation-mapping-corpus.mjs --check` exited 1 because `content/generated/equation-mapping/corpus-equations.json` is stale. The chapter's edited formulas and headings require that generated source binding to advance; no generated file was written. The exact regeneration command for the later authorized publication/regeneration procedure is `node scripts/build-equation-mapping-corpus.mjs --write`, followed by its `--check`. Other retained hashes in historical evidence continue to identify their original reviewed source versions and were not repinned. Consequently current source corrections do not retroactively change what those older instruments or reviews established.

Scratch baselines, the complete diff, the mathematical checks, instrument outputs, and validation receipts are in `.tmp/crw005-master-fixes/`. Their useful results and authority limits are preserved here. `git diff --check` is the final whitespace check for the target and three edited workstream files. A differing final chapter hash, a changed viewer-ID sequence, a failed substitution in the stated counterexamples, or a failed focused check would overturn the corresponding completion claim.

**Remaining scope:** all 16 chapter corrections are complete; the explicitly unproved scientific obligations remain unproved. The source-link inventory also found older incoming references using the former signed-complex wording in already-reviewed Noether-braid material; their anchors still resolve, but those passages have not been re-adjudicated in this target-only repair. This is retained as a downstream terminology/proof-scope follow-up in CRW-005, not silently counted as a second chapter correction. Assurance coverage remains **15 of 190 reviewed, 175 remaining**. The next unread assurance target is [Energy](../../../content/markdown/aaa/dynamics/energy.md).

### CRW-005 Packet 2 document 2 — Energy assurance review, 2026-09-10

**Disposition: complete review; corrections proposed, not applied.** The operator's “do 1” selected the recommended Energy review after the Master Equation corrections. This pass read all 1,564 lines of [Energy](../../../content/markdown/aaa/dynamics/energy.md), compared the complete baseline-to-current diff, and checked the mathematical dependencies against the corrected Master Equation. It did not review the next chapter or edit Energy, another corpus chapter, or the manuscript. This is a fresh semantic assessment by the current reviewer, not a second-agent validation of its own counterexamples.

The reviewed Energy SHA-256 is `5d3c7f0b5537b72749e86f80df7ff4b795ec3b7863896bbe72ddaf5e24937516`. The pre-campaign source is `897fe1aa7:content/markdown/aaa/dynamics/energy.md`, SHA-256 `3c78c6d48e5bf1ff84829e0e366e89b8c551454511b2f7f6654e6967c9c89723`. The corrected Master Equation dependency is SHA-256 `d2a25fb7d970f4231e72f4c9564b1a15d20e5efe2caf8f0f63f88e2cbdc290d8`. Line references below refer to the reviewed Energy bytes. These are measured identities by `shasum -a 256`; later edits require refreshing the affected references.

The chapter has a useful central distinction: the acceleration law is postulated, whereas the universal kinetic scalar, history energy, conservation theorem, mass map, and universal action increment remain constructions to establish. Its work-power conjugacy calculation and tensor trace algebra are sound within their stated ansatz. Fifteen findings remain. E-1 through E-3 have the clearest immediate algebraic consequences; the remaining items concern incomplete identities, unsupported implications, operational definitions, and reader access. All are **○ Proposed** pending adjudication. Their derivations below are independently checkable mathematical references, not EOM solver results or evidence of a realized assembly.

#### E-1 — High: the radial-power display loses the polarity sign

**Location:** lines 246–254, with the correct signed formula at lines 192–205. **Type:** hard sign error, inherited from the baseline.

The display equates $\mathbf A_{ij}\cdot\mathbf V_i$ to $\|\mathbf A_{ij}\|V_r$. The line-of-action vector points from the retained transmitter event to the receiver. An unlike-polarity contribution is antiparallel to that vector, so its norm removes a physically necessary sign. With $c_f=1$, choose $\hat{\mathbf r}=\mathbf V=(1,0,0)$ and an attractive contribution $\mathbf A=(-1,0,0)$ in normalized acceleration units. The true power factor is $-1$; the display gives $+1$.

**Smallest repair:** write $(\mathbf A_{ij}\cdot\hat{\mathbf r}_{ij})V_r$, or retain the explicit $\sigma_{ij}$ multiplying the positive amplitude, consistently with the preceding per-hit equation. **Grade:** derived from the chapter's polarity convention and the dot product. **Falsifier:** an explicit convention making the norm signed would overturn this reading; the present norm and signed kernel do not do that.

#### E-2 — High: the action table's increment rule excludes its own redistribution

**Location:** lines 1395–1401, 1411–1467. **Type:** incompatible constraints under the table's stated action interpretation, inherited from the baseline.

The binary-3 transaction is $\Delta I_3=\hbar$. Binary 1 takes two positive steps with energy $2\omega_1\hbar$ under the declared action-angle interpretation, hence $\Delta I_1=2\hbar$. The angular account then requires

$$
\Delta I_2=-2\hbar-\Delta I_{\mathrm{wake}}.
$$

But the same paragraph requires every binary increment to be at least $-\epsilon_w\hbar$, while $|\Delta I_{\mathrm{wake}}|\le\epsilon_w\hbar$. The largest possible $\Delta I_2$ is $(-2+\epsilon_w)\hbar$, below the required floor whenever $\epsilon_w<1$. For example, $\epsilon_w=0.1$ requires both $\Delta I_2\le-1.9\hbar$ and $\Delta I_2\ge-0.1\hbar$. The summed energy equality, in contrast, is true by substitution of $\varepsilon_2=\varepsilon_w-2\varepsilon_1$; it does not validate angular closure or independently establish conservation.

A second distinction is needed before summing the $I_a$: orbital action magnitudes of differently oriented binaries are not automatically signed angular-momentum components about one common axis. Finally, $\Delta E\approx\omega\Delta I$ requires a reduced Hamiltonian with $\omega=\partial H/\partial I$, fixed remaining variables, and a controlled finite-step remainder. Calling that relation a notation choice does not supply those assumptions. The text also uses $f$ as both a dimensionless state index and a frequency in $\Delta E\approx f\Delta A_{\mathrm{cycle}}$.

**Smallest repair:** allow compensating signed internal increments, define either a common-axis angular component or the complete vector balance, and distinguish those components from nonnegative cycle actions. Use a state index such as $n$ and a separately defined frequency. Keep the table a guessed energy allocation until independent energy and angular accounts are supplied. **Grade:** derived incompatibility for the stated small-wake action interpretation; inferred ambiguity if “two steps” is intended to mean something else. **Falsifier:** a fully specified table satisfying all three action increments, the wake bound, and the per-binary sign bound for $\epsilon_w<1$ would refute the contradiction.

#### E-3 — High: a sufficient positive-trace bound is treated as necessary

**Location:** lines 1019–1044. **Type:** hard implication error, inherited from the baseline.

Write the trace bracket as $B+C$, where $B=\zeta_{\mathrm{probe}}(1+\delta\mathcal M_0)$ and $C=\mathcal Z_{\mathrm{tf},ab}\delta\mathcal M_{\mathrm{tf}}^{ab}/3$. With positive overall prefactor, positivity requires $B+C>0$. The stronger bound $B>|C|$ is sufficient for either sign of $C$, not necessary for the measured sign. Thus failure of that stronger bound cannot by itself falsify the mass map.

An algebraic example uses Euclidean coordinates, $\mathcal Z=\operatorname{diag}(2.8,0.1,0.1)$ and the dimensionless sea tensor $c_{\mathrm{eff},0}^2\mathcal M=\operatorname{diag}(2.8,0.1,0.1)$. Both are positive definite. Their isotropic parts are one and their trace-free parts are $(1.8,-0.9,-0.9)$. Hence $B=1$, $C=1.62$, and the actual trace bracket is $2.62>0$, although $1>1.62$ fails. The symmetrized response has positive diagonal entries $7.84,0.01,0.01$ up to the positive prefactor. This is a counterexample to the algebraic implication, not a certified sea state or a claim that this anisotropy lies in a weak-anisotropy approximation.

**Smallest repair:** state the exact signed trace criterion, name $B>|C|$ a conservative sufficient bound, and classify its failure as loss of that guarantee. Positive trace also does not imply positive directional response in general; a tensor claim requires its own eigenvalue or quadratic-form condition. **Grade:** derived. **Falsifier:** a stated additional admissible-domain restriction that makes the stronger inequality necessary would change the assessment; no such theorem is supplied here.

#### E-4 — High: the work and virial formulas omit their time and kinetic assumptions

**Location:** lines 320–334. **Type:** incomplete mathematical identities, inherited from the baseline.

Fixing the set of source identities does not make a delayed potential time independent. Even in the quadratic chart with $\mu_{\mathrm{arch}}\mathbf A=-\nabla U$, the chain rule gives

$$
\Delta K_\mu=-\Delta U+\int_{T_a}^{T_b}\partial_T U(\mathbf X(T),T)\,dT.
$$

The displayed $-\Delta U$ follows only when the explicit time/history contribution vanishes or is accounted for separately. A stationary receiver in a changing external scalar has zero displacement work but can have nonzero $\Delta U$. At general $K$, the displayed $\mu_K\mathbf A\cdot d\mathbf X$ still equals $dK$, but a gradient for the conjugate-momentum rate needs a fresh derivation; it is not established by the quadratic gradient identity.

Likewise, $\langle2K-pU\rangle=0$ requires quadratic kinetic bookkeeping and a vanishing averaged virial endpoint term, in addition to a degree-$p$ potential. If $\dot{\mathbf p}=-\nabla U$ on a suitable reduced chart, then $d(\mathbf X\cdot\mathbf p)/dT=\mathbf V\cdot\mathbf p-\mathbf X\cdot\nabla U$. Homogeneity replaces the last term by $pU$, whereas $\mathbf V\cdot\mathbf p=2K$ is specific to the quadratic family. For example $K(s)=s^4$ gives $P(s)=4s^3/3$, hence $sP(s)=4K/3$, not $2K$.

**Smallest repair:** give the complete chain-rule work identity, state the stationary/quadratic reduction explicitly, and retain the finite-window virial endpoint term before taking any periodic or long-time limit. **Grade:** derived calculus on the declared bookkeeping chart. **Falsifier:** an explicit source-history stationarity, kinetic, and endpoint hypothesis establishing the omitted terms are zero would discharge this finding.

#### E-5 — High: finite-window energy flux omits particle crossings

**Location:** lines 496–518; moving-window response target at lines 616–651. **Type:** incomplete balance law.

$E_W$ explicitly sums kinetic energy only for particles currently inside $W$, but $\mathbf J_E$ is defined as causal-wake energy flux. When a particle crosses the boundary with nonzero kinetic proxy, the retained sum changes even without local work or a wake-energy transfer. In the distributional derivative of $K_a\mathbf1_W(\mathbf X_a)$, the boundary term is $K_a\mathbf V_a\cdot\nabla\mathbf1_W$. It must be balanced by mechanical transport. Timestep or mollifier refinement cannot remove an omitted physical crossing term. The momentum paragraph already includes assembly crossings; energy needs the corresponding definition.

The later $W_A(T)$ also moves. Its transport must be relative to the boundary velocity, or the Reynolds transport term must be explicit. For a density and laboratory flux, the relative normal flux is $(\mathbf J_E-e_E\mathbf v_{\partial W})\cdot\hat{\mathbf n}$, with the analogous momentum correction.

**Smallest repair:** define total energy flux to include mechanical, interaction, and wake transport without double counting, and specify fixed versus moving windows. **Grade:** derived control-volume bookkeeping. **Falsifier:** an explicit no-particle-crossing assumption or an existing definition of $\mathbf J_E$ that already contains the transport would remove the counterexample; the present energy-flux definition does neither. The fixed-window omission is present in the baseline.

#### E-6 — High: the assembly and appendix totals discard undecomposed self-history energy

**Location:** lines 795–807, 1286–1296, 1315–1327; compare lines 338–348 and 391–417. **Type:** incomplete ledger definition, inherited in substance.

The chapter first requires kinetic, interaction, and wake-history entries with an explicit nonoverlap rule. Its assembly formula then contains kinetic energy, $\tfrac12\sum_{i\ne j}U_{ij}$, and coupling to the sea, with no internal self-history or remaining internal wake account. The half factor is justified for a deliberately symmetric pair-energy definition, but receiver-indexed delayed entries are not automatically the same mutual pair energy counted twice. The appendix similarly calls $K(r)+U(r)$ the total after defining $U$ as a branch-local scalar; a receiver-coordinate potential is not automatically the entire nonlocal conserved charge. A gauge choice cannot remove a time-varying history term.

**Smallest repair:** state the exact internal pair/self/wake/sea partition and its provenance. If the appendix intentionally reduces the full charge to $K+U$, require a proof that all remaining history terms are included in that $U$ or constant on the reduced chart; otherwise label it a mechanical diagnostic and retain the omitted account. Cross-cell matching must compare the same complete energy. In the no-runaway discussion at line 447, also make explicit the corrected Master Equation's independence limit: a work-integral reconstruction alone tests bookkeeping, not an independently established conserved wake charge.

**Grade:** derived distinction between the displayed sums and the chapter's earlier total; inferred missing construction. **Falsifier:** definitions explicitly absorbing every admitted self/root-history term into the named entries, with no double booking and the stated reduction proved, would discharge the issue.

#### E-7 — Medium: Legendre compatibility does not identify primitive and medium speeds

**Location:** lines 107–115. **Type:** unsupported implication, inherited from the baseline.

The valid relation $P'(s)=K'(s)/s$ constrains the kinetic chart and its momentum. It contains neither a medium response law nor an assembly signal speed. Consequently it cannot derive $|c_{\mathrm{eff}}/c_K-1|\le\epsilon_{cK}$ across those different levels. For example a kinetic chart with a divergence at $c_K=2$ can be paired algebraically with an independent effective response scale $c_{\mathrm{eff}}=1/2$ in units $c_f=1$ without violating the conjugacy equation. This is a logical countermodel, not a physical assembly construction.

**Smallest repair:** retain any same-scale comparison only as an additional, explicitly guessed matching hypothesis for a specified reduction, with a falsifier; do not call it a consequence of the Legendre calculation. Preserve the primitive unbounded-speed option and the independent sea-response construction. **Grade:** derived nonimplication from the displayed equations. **Falsifier:** an assembly reduction deriving the equality of the two scales would supply the missing bridge.

#### E-8 — Medium: the mass shell does not by itself determine trajectory velocity

**Location:** lines 1143–1195. **Type:** incomplete claimed equivalence, inherited from the baseline.

The positive mass shell relates $E$ and $p$. It does not constrain a separately measured $v_{\mathrm{CM}}$ until the same effective dynamics proves $v_{\mathrm{CM}}=\partial E/\partial p=pc_{\mathrm{eff}}^2/E$, or an equivalent momentum-velocity relation. Thus the displayed gamma formulas are stronger than the one scalar mass-shell test. For an algebraic check with $c_f=1$, $c_{\mathrm{eff}}=1/2$, $M_0=1$, and $p=1/2$, the positive-shell energy is $\sqrt{1/8}$. Assigning an independent measured velocity zero does not violate that scalar equation, but it violates $p=\gamma M_0v$. The example diagnoses missing information, not admissible physical motion.

**Smallest repair:** state the velocity relation, positive-energy branch, positive constant local speed, and fixed rest invariant as additional effective closure conditions before claiming equivalence. **Grade:** derived. **Falsifier:** a previously established velocity relation explicitly made an assumption here would close the gap.

#### E-9 — Medium: emission density is confused with its reconstructed scalar

**Location:** lines 213–225 and 274–282. **Type:** representation and regularity overclaim.

The assertion that the ideal potential is necessarily a distribution supported on causal isochrons confuses the emission-time selector with the result after integrating emissions. The corrected [Master Equation local scalar derivation](../../../content/markdown/aaa/dynamics/master-equation.md#superposition-and-local-wake-geometry) supplies $C\operatorname{sgn}(D_t)/r$ on a regular moving-simple-root chart. For a stationary source with $c_f=1$ and retained history covering the required roots, $D_t=1$ and this scalar is $C/r$, smooth on an open receiver region away from the source. The delta distribution in the emission integral does not make its root-collapsed value a singular surface distribution on that region. Similarly, smoothing a selector alone does not prove smoothness of the full potential at a point-source singularity or for an uncontrolled infinite source sum.

**Smallest repair:** separate emitted-surface distributions, integrated wake responses, and valid local scalar representatives; state separation, root, summability, and differentiation hypotheses. Retain global and regulator-dependent scalar constructions as open. **Grade:** derived regular-chart counterexample from current canon. **Falsifier:** an explicit alternative definition of $\Phi$ as the unintegrated emission distribution would change its mathematical type, but would then require a separate definition for the scalar used in the gradient and energy equations. The problematic representation sentences already occur in the baseline.

#### E-10 — Medium: body prose asserts several results that its summary leaves open

**Location:** lines 304–314, 767–782, 1127–1137, 1375–1387. **Type:** claim-grade inconsistency.

The body says that a breather exchanges energy across a bounded cycle, that a sea provides constitutive relations, that the high-speed response yields the relativistic kinetic law, and that redistribution stabilizes only at discrete resonances. Elsewhere this same chapter correctly states that no stable sea-coupled assembly has been derived, quietness requires a controlled variance, conservation remains open, and discrete root counts do not quantize action. Those qualifications need to govern the assertions where made. In particular a large incoherent population does not by itself imply small variance, nearest-source dominance, or a bound breather.

**Smallest repair:** state each as a proposed mechanism or conditional consequence and name its local premise. Preserve the stronger derived dot-product, conjugacy, and trace results. Do not turn the named hypotheses into either established recoveries or disproofs. **Grade:** inferred editorial mismatch, supported by the explicit internal contrasts; these overstatements survive from the baseline while the conversion improved several surrounding qualifications. **Falsifier:** a cited, applicable branch and response derivation establishing the stated behavior would justify stronger wording.

#### E-11 — Medium: root parity is stated for unrestricted separator crossings

**Location:** lines 1359 and 1463. **Type:** missing domain boundary in a topological claim, inherited from the baseline.

An interior ordinary fold creates or destroys two simple roots of opposite signed degree, hence $\Delta N=\pm2$ and $\Delta D=0$ when all other roots remain retained. A root crossing a history-window boundary changes the retained count by one. For example $F(s,\lambda)=s-\lambda$ on the fixed open interval $0<s<1$ has zero roots for $\lambda<0$ and one for $0<\lambda<1$; its derivative is one throughout. No fold occurred. A singular coincident endpoint or higher degeneracy also requires its own classification.

**Smallest repair:** restrict the parity row to certified interior fold events with nonzero second root derivative, transverse unfolding, and no endpoint crossing. Track boundary entries/exits separately from grouped channels. **Grade:** derived elementary root-count counterexample, consistent with the corrected Master Equation. **Falsifier:** an explicit definition restricting every separator in this table to that interior-fold class would remove the overbreadth.

#### E-12 — Medium: the shielding measurement leaves its denominator and observable ambiguous

**Location:** lines 820–842. **Type:** operational definition gap, inherited in substance.

The “naive constituent sum” is not specified as unsigned or otherwise nonvanishing. For a neutral equal-polarity-count source, a signed monopole sum can be zero, making the shielding ratio undefined. A potential coefficient and an acceleration coefficient also have different radial powers: the elementary static scalar is proportional to $1/r$, while its radial gradient is proportional to $1/r^2$. They can be cross-checked after differentiation and common normalization, but cannot be interchanged as the same fitted coefficient without that map. A higher multipole also needs its own angular and radial basis.

**Smallest repair:** define the reference ledger, require a positive denominator or return an undefined scalar, fix the measured quantity and multipole basis, and derive any potential-to-acceleration conversion. **Grade:** derived denominator and radial-scaling issues; inferred operational incompleteness. **Falsifier:** a local definition already specifying a nonzero reference and the measurement conversion would close the gap.

#### E-13 — Medium: the entropy residual needs sign and window assumptions to imply its stated result

**Location:** lines 686–717. **Type:** incomplete diagnostic contract.

The residual is zero when $\Delta S_{\mathcal Q}\ge\int\mathcal D_{\mathcal Q}/(T_{\mathcal Q}+\varepsilon_T)\,dT'$. This implies nondecreasing entropy only if the integral is nonnegative. The paragraph does not state positivity of the temperature channel or dissipation rate and includes wake-boundary channels, which may be signed transport rather than nonnegative production. Algebraically, $\Delta S=-1$ and integrated signed rate $-2$ produce zero residual despite decreasing entropy. This is not a thermodynamic counterexample under positive dissipation; it identifies the assumptions the diagnostic needs. In addition, $W$ previously denotes a spatial region, but $\int_W dT'$ requires a time interval.

**Smallest repair:** distinguish a spatial window from its observation interval, impose the intended positive-temperature and nonnegative-production assumptions, and keep entropy boundary transport separate if the window is not isolated. State precisely what a vanishing residual tests. **Grade:** derived inequality; inferred missing sign contract. **Falsifier:** definitions ensuring nonnegative production and a positive denominator on the declared time interval would discharge the implication gap. The formula and these omissions are present in the baseline.

#### E-14 — Medium: several load-bearing terms and symbols remain unexplained

**Location:** lines 7–11, 246–256, 391–417, 563–613, 849–905, 931–1017, 1061–1077, 1121–1123, 1294–1296. **Type:** required teaching and notation repair, not a request to simplify away mathematics.

The chapter uses causal roots and isochrons before explaining the emission-time equation; invokes an affine partner chart and $J_p$ without introducing its geometry; and introduces $h^{ab}$, the tensor index range and contractions, $\theta$, $\lambda_A$, $\xi_A$, $\mathcal H_A$, $n$, $\chi_{\mathrm{sea}}$, and $\Gamma_N$ without enough local definitions. Terms such as “flatness,” “fibers,” and “exactness condition on one forgetting map” are used for scalar constancy and energy partition without defining the additional mathematical structure those terms normally require. “Tier 2 shielding” and a legacy reference-attractor gate are process vocabulary in reader prose. The gauge-matching paragraph references table entries before their definitions without explaining what is being matched.

**Smallest repair:** define the causal event, the Euclidean index metric, the constitutive arguments actually needed, and the energy partition in place. Use direct descriptions such as constancy across the comparison family and a sum of disjoint energy accounts unless a genuine geometric construction is supplied. Replace workflow labels with their physical prerequisites. Add one worked signed-power example and one finite-window or tensor example where they expose the meaning of the formulas. Optional presentation choices include a diagram or a short notation table; the missing definitions themselves are not optional. **Grade:** inferred conformance judgment against edition 1.0 and the current edition 1.1. **Falsifier:** a complete first-use explanation in the reviewed text would defeat a specific omission. The passages largely predate the conversion; removing the old inline explanation label did not resolve all of their teaching burden.

#### E-15 — Low: the opening wake link names a nonexistent anchor

**Location:** line 3. **Type:** confirmed reader-navigation defect.

The link ends in `foundations/architrino.md#the-emitted-wake`. A targeted heading/explicit-ID scan followed by manual inspection of the current Architrino heading inventory finds no such anchor. The current relevant section is [The wake is geometry, not fluid](../../../content/markdown/aaa/foundations/architrino.md#the-wake-is-geometry-not-fluid), which explains the expanding sphere and its point emission center.

**Smallest repair:** point the opening link to that existing section, after checking its final wording. **Grade:** measured against current target headings and explicit IDs, not a claim that the target file is absent. **Falsifier:** an explicit alias or renderer routing rule resolving `the-emitted-wake` would overturn the navigation finding. The link was added between the baseline and current Energy source; this review does not attribute the missing destination to a particular editor or commit without inspecting its historical transition.

#### Preservation, source support, and verification

The scratch validator `.tmp/crw005-energy-review/validate.mjs` first passed known quoted-math, link, canonical display-parser, and KaTeX cases, then checked Energy. It found 499 accepted math expressions, 95 display equations, 95 viewer links with identical IDs and order to the baseline, and 117 local-link occurrences whose file targets exist. Eighty-nine display formulas are byte-identical; six differ. Those six are two acceleration-first substitutions, the corrected redshift deficit sign, removal of an unjustified nonnegativity assertion, replacement of an unproved kinetic maximum, and an explicit additive effective-potential shift. Each changed display was reviewed in the baseline diff. They are defensible mathematical corrections, not exact preservation; this assurance record does not silently classify the conversion as character-for-character equation preservation or recommend restoring the errors.

The same baseline diff strengthens or clarifies several claim boundaries: the kinetic scalar, sea response, shielding proxy, ground-state language, and universal action increment. These changes are scientifically preferable but are substantive exceptions to the original no-claim-change conversion rule. Historical conversion rows remain historical evidence; this review supplies the current qualified disposition.

The known-case-first link/order screen `.tmp/crw005-energy-review/check-links-order.mjs` checked 11 Markdown fragment occurrences. Ten match a current heading or explicit ID; the remaining opening wake anchor was manually confirmed as E-15. This was source-level resolution, not a browser navigation test. Its TOC traversal verified Energy immediately after Master Equation and Entropy next. `node scripts/validate-equation-mapping-links.mjs` passed its 23 registered curated links; that instrument does not cover all 95 Energy corpus-viewer IDs, so the latter count and identity comparison come from the scoped validator rather than that global curated-link result.

The separate arithmetic script `.tmp/crw005-energy-review/mathematical-checks.mjs` first passed known dot-product and trace cases, then reproduced the signed-power, positive-trace, action-bound, mass-shell nonimplication, and entropy-sign examples recorded above. These computations check the written algebra, not assembly existence, dynamics, conservation, or stability. The proofs and counterexamples are retained in this durable record so scratch files are not their only evidence.

The chapter's Hamilton and Noether references are appropriate historical sources for canonical mechanics and variational symmetry, but neither supplies a delay-compatible conservation theorem for this postulated acceleration law. This pass retains the reference verification limits already established in the Master Equation review: bibliographic identity and accessible primary material, not a claim of full verification of every historical theorem against the delayed model. The present findings rely on explicit algebra, calculus, current canon, and scoped source checks; no additional literature-mining campaign or new reference requirement was inferred from the two-entry bibliography. The guessed physical constructions need their own future derivations, not decorative citations.

**Current campaign state:** Packet 1 contributes 14 reviewed paths; Packet 2 now has recorded reviews of Master Equation and Energy, giving 16 of 190 reviewed and 174 remaining by the CRW-005 disposition inventory. Master Equation's 16 accepted corrections remain closed. Energy's E-1 through E-15 are proposed and unapplied; review coverage is not correction completion. The next unread Dynamics document is Entropy, subject to the one-document instruction. The substantive Foundations campaign and manuscript retain their separate scope.

### CRW-005 Energy — revised repair scope and mass boundaries, 2026-09-10

**Status: accepted for implementation.** The operator authorized revising the Energy repair scope and then applying the recommended changes. E-1 through E-15 are accepted within the following boundaries; the original review remains historical evidence. This assignment owns Energy and its existing review/current-status records, not another chapter, the manuscript, generated artifacts, or Git publication.

Architrinos have no physical mass property. The coefficients $a$, $\mu_{\mathrm{arch}}$, and $\mu_K$ are kinetic-bookkeeping quantities, never universal or species-specific architrino masses. Effective assembly inertial mass is an operational response target; its direction-dependent tensor, scalar trace, effective rest mass, and gravitational response must remain distinct. The mass mechanism based on internal energy, exposure, and Noether sea coupling remains guessed, with its quantitative derivation open. Algebraic repairs inside that ansatz do not establish it. An external assembly-force measurement must be calibrated independently of the mass being inferred. The appendix's centrifugal potential is a comparison reduction until its kinetic, angular, and radial premises are derived; the word effective alone does not license importing it into a primitive binary.

E-7's phrase “primitive unbounded-speed option” is corrected here: unrestricted primitive speed is the ontological boundary; a finite saturation chart is only an auxiliary comparison. E-8's velocity relation and E-4's canonical/virial equations remain conditional reduced-model or effective recovery relations, never new substrate postulates. E-2's scalar action balance requires a declared common-axis angular interpretation, or a separate vector account. The permitted repair makes the table internally consistent at its guessed grade without claiming quantization, energy conservation, or angular-momentum conservation has been derived.

The source baseline remains SHA-256 `5d3c7f0b5537b72749e86f80df7ff4b795ec3b7863896bbe72ddaf5e24937516`, measured before editing. Existing equation-viewer IDs, historical evidence, and downstream generated consumers are preserved. Validation will compare the revised source with this baseline, check mathematical examples against explicit algebra, and review the entire resulting chapter.

### CRW-005 Energy E-1 through E-15 — accepted integration, 2026-09-10

**Status: ✓ Done — all 15 accepted document repairs implemented.** This receipt supersedes the original review's proposed/unapplied disposition. The operator first authorized the revised mass boundaries above and then the recommended repairs. The canonical [Energy chapter](../../../content/markdown/aaa/dynamics/energy.md) now carries those changes. Correction completion concerns the stated mathematical and editorial defects; the physical energy, mass, conservation, stable-assembly, and quantization constructions remain open at their declared grades.

| Finding | Disposition | Implemented correction and retained boundary |
| --- | --- | --- |
| E-1 | ✓ Done | Signed radial acceleration replaces its norm in the power identity. The negative-power example preserves polarity, and root playback is derived separately from the causal equation. |
| E-2 | ✓ Done | The state index is dimensionless, frequency has its own symbol, and the action-angle relation is a conditional canonical approximation. Signed binary-2 compensation replaces the incompatible lower bound. Both energy and common-axis angular balance must hold; a general braid still needs vector angular bookkeeping. |
| E-3 | ✓ Done | The signed trace condition is exact within the ansatz. Absolute-value and norm bounds are sufficient guarantees. Their failure does not falsify a positive trace, and positive trace does not establish positive directional response or physical mass. |
| E-4 | ✓ Done | The work relation includes explicit potential time dependence. The virial comparison retains the endpoint term and uses the actual momentum contraction; the familiar quadratic form requires its extra hypotheses. |
| E-5 | ✓ Done | Window flux includes particle/assembly transport, interaction transport, and wake transport without overlap. Moving boundaries use relative flux. A crossing-particle example explains the mechanical term. |
| E-6 | ✓ Done | Assembly and appendix accounts retain internal self/history energy. The pair entry is an explicit symmetric allocation, not an assumption of reciprocal delayed receiver potentials. Gauge matching compares complete accounts. No-runaway claims require an independently derived charge and lower bound. |
| E-7 | ✓ Done | Primitive speed remains uncapped. A finite kinetic saturation chart is an auxiliary comparison, and matching its speed to sea response is an additional hypothesis. |
| E-8 | ✓ Done | Effective rest mass is distinguished from total internal energy and inertial response. Gamma parameterization requires a positive-energy mass shell and an independently justified momentum-velocity relation with constant local coefficients. |
| E-9 | ✓ Done | Emission-time distributions are distinguished from root-integrated local scalars. The moving-simple-root scalar is stated with its normalization, separation, root, and summation assumptions; global and regularized constructions remain separate obligations. |
| E-10 | ✓ Done | Breather binding, nearest-source dominance, sea constitutive response, relativistic behavior, smooth transitions, and discrete resonance are conditional claims or proposed mechanisms where stated. |
| E-11 | ✓ Done | The parity rule applies to certified interior ordinary folds with transverse unfolding and no history-endpoint crossing. Boundary entry/exit is counted separately. |
| E-12 | ✓ Done | Shielding uses a positive unsigned reference norm in a declared basis. Zero reference is undefined. Acceleration and scalar-potential fits have distinct radial powers and require a normalization-preserving derivative comparison. |
| E-13 | ✓ Done | The entropy diagnostic names its time interval, positive temperature, nonnegative production, and units. Signed boundary transport is separate. Free energy and fluctuation-dissipation residuals retain their diagnostic limits. |
| E-14 | ✓ Done | Causal roots, quadratic bookkeeping, Euclidean indices, constitutive variables, partitions, and gauge matching are explained locally. Undefined geometric/process language is replaced with the actual mathematical operation or prerequisite. The mass table and worked examples expose the distinctions. |
| E-15 | ✓ Done | The opening wake link resolves to the existing “The wake is geometry, not fluid” section. |

**Mass terminology and evidence independence.** Architrinos have no physical mass property; a kinetic coefficient is neither zero mass nor a hidden common mass. The chapter distinguishes kinetic-bookkeeping coefficients, effective assembly inertial mass, its directional response tensor and scalar trace, the effective rest-mass recovery parameter, and the appendix's comparison-model inertial coefficient. Gravitational mass and its equality with inertial mass are unproved. Assembly force must be calibrated independently of the unknown mass. The full post-integration reread also identified and repaired a circular universality test: its numerator must use independently measured response, because substitution of the ansatz's own predicted trace merely recovers the input coefficient. The exposed-energy partition likewise cannot count a remainder defined by subtraction as independent evidence.

**Mathematical verification.** The unchanged pre-repair reference script `.tmp/crw005-energy-review/mathematical-checks.mjs` again passed its known dot-product and trace cases before reproducing the recorded counterexamples. Its `displayed` fields describe the old review target, not the repaired source. The separate `.tmp/crw005-energy-fixes/check-repairs.mjs` passed known dot-product and positive/negative equality-check fixtures before testing the revised algebra. These instruments verify arithmetic against explicit calculus and algebra, not trajectories or physical mass. New numerical examples use $c_f=1$.

The checks include both radial polarities; the tensor example with isotropic term $1$, signed correction $1.62$, and positive trace bracket $2.62$; and a compatible common-axis table with increments $(1,-2,2)\hbar$, equal frequencies, and zero wake exchange. In the latter, signed compensation closes both linear budgets, while existence of a physical transition and the finite-action remainder remain unproved. For the time-dependent quadratic comparison, take $U(X,T)=-X+T$, $X(T)=T^2/2$, and unit bookkeeping coefficient over $0\le T\le1$. Then $\ddot X=-\partial_XU=1$, $\Delta K=1/2$, $\Delta U=1/2$, and $\int_0^1\partial_TU\,dT=1$, confirming the corrected work relation and rejecting the omitted-time-term version. For $K=s^4$, conjugacy gives $P=4s^3/3$ and $sP=4K/3$, not $2K$. The effective mass-shell parameterization reproduces both the shell and the added velocity relation for $c_{\mathrm{eff}}=1/2$, $M_0=1$, and $v=1/5$. Positive-production entropy examples satisfy the stated nondecrease implication. Each is a conditional algebraic check, not an imported substrate law.

**Source and navigation verification.** A full source reread covered all 1,582 lines measured by `wc -l`, followed by inspection of the complete Energy diff and all changed display formulas. After the final notation correction, `.tmp/crw005-energy-fixes/validate.mjs` passed its known extraction/parser/KaTeX cases and accepted 594 math expressions, 95 display equations, 95 viewer links with identical IDs and order to the pre-repair source, and 120 local-link occurrences whose file targets exist. Eight display formulas changed and 87 remain byte-identical under the canonical display parser. The raw-source diff was also inspected because that parser strips Markdown quote prefixes and does not alone preserve every standalone inequality token. The eight changes are the signed power, work relation, entropy integration interval, assembly history term, signed trace condition, and three appendix history-account formulas. The action-table corrections also change inline mathematics and table entries; the display count is not a count of all substantive changes.

The known-case-first fragment/order screen `.tmp/crw005-energy-review/check-links-order.mjs` resolved all 13 Markdown section-fragment occurrences against current headings or explicit IDs and confirmed that Entropy follows Energy. This is source-level navigation validation, not a browser test. `node scripts/validate-equation-mapping-links.mjs` passed its 23 registered curated links; the scoped validator supplies the separate 95-ID Energy assurance. The bibliography retains the original review's source-verification limits; no new historical source is presented as a derivation of the delayed theory.

**Generated consumers and publication handoff.** Before editing, exact-path and baseline-hash `rg` searches under `scripts/`, `tests/`, this review lane, `content/generated/`, and `content/graph/` identified Energy consumers in the graph/TOC, generated reading copies and source/reference indexes, equation registry, source-index fixture, and foundational-impact configuration. This is a scoped consumer inventory, not a claim that each is a byte pin. Authored Energy was edited; generated consumers and historical evidence were not manually rewritten. `node scripts/build-equation-mapping-corpus.mjs --check` returned stale `content/generated/equation-mapping/corpus-equations.json` for its 199-file scan. The publication procedure's required refresh is `node scripts/build-equation-mapping-corpus.mjs --write`, followed by the same `--check`; it was not run during this edit batch. This whole-corpus check does not attribute every registry difference to Energy.

The integrated Energy source has SHA-256 `2ad8fd5d5b6093b494575ad671dfbc0b835fbe0e3cc321e56a59632a3a0fef00` by `shasum -a 256`. The original review and accepted scope remain intact above. Current assurance coverage remains 16 of 190 reviewed, with 174 remaining in the disposition inventory; this repair adds no newly reviewed chapter. Both Master Equation's previously accepted repairs and Energy's E-1 through E-15 now have implementation receipts. The next unread Dynamics document is Entropy under the one-document instruction. The substantive Foundations campaign and manuscript retain their separate scope.

### CRW-005 Packet 2 document 3 — Entropy assurance review, 2026-09-10

**Disposition: complete review; 14 corrections proposed, not applied.** The operator's “do 1” selected the recommended [Entropy](../../../content/markdown/aaa/dynamics/entropy.md) review after the Energy corrections. This pass read the entire 1,013-line chapter and the complete pre-campaign-to-current diff. Line references below identify the reviewed source. No corpus chapter or manuscript was edited. This is a semantic review by the current reviewer; independent references consist of the explicit finite examples, calculus, and identified primary-source passages, not a separate reviewing agent or EOM solver run.

By `shasum -a 256`, the reviewed source is `39f4fe93b8627e91e51d8e8163b352f83b229e894dab65c204ca2098405cfb5d`; the pre-campaign source `897fe1aa7:content/markdown/aaa/dynamics/entropy.md` is `d54e64350554d26a3f1dcc5bb49f4f35ae9ffc5be90ac1ee2c787ced73e213a1`. The current Energy dependency is `2ad8fd5d5b6093b494575ad671dfbc0b835fbe0e3cc321e56a59632a3a0fef00`. The TOC traversal places Entropy third in Dynamics, after Energy and before Binary Dynamics.

The chapter correctly keeps entropy, temperature, horizon thermodynamics, and quantum state descriptions out of primitive ontology. It also correctly distinguishes relative-entropy data processing from entropy growth, makes delayed-flow measure preservation a separate obligation, and rejects a universal measurement-locking cost. Its main unresolved problem is mathematical: several different entropy functionals are subsequently treated as one quantity. Five high-priority findings affect definitions, a balance sign, a product count, available work, and the inherited mass criterion. Nine medium-priority findings concern missing assumptions, scope, and operational definitions. All ENT-1 through ENT-14 are **○ Proposed** pending adjudication; an open physical recovery target by itself is not counted as a defect.

#### ENT-1 — High: record entropy and hidden-history entropy are different quantities

**Location:** lines 9–19, 61–92, 116–146, 192–207, 483–487, 625, and 775. **Type:** incompatible definitions and refinement interpretations, inherited in substance.

For a discrete history variable $X$ and deterministic record $Z=\Pi(X)$, the definition at lines 63–66 is $k_BH(Z)$: uncertainty about which retained record occurs. The opening explanation and receiver-inference formula instead concern $k_BH(X\mid Z=z)$, or its average $k_BH(X\mid Z)$. The Boltzmann expression counts the compatible histories of one observed macrostate. These quantities are not equivalent. Take four equiprobable histories. A constant record has $H(Z)=0$ but conditional hidden-history entropy $H(X\mid Z)=\log4$. An exact record has $H(Z)=\log4$ but $H(X\mid Z)=0$. Refinement moves the two quantities in opposite directions. The finite identity is $H(X)=H(Z)+H(X\mid Z)$. For uniform counting within each fiber, $H(X\mid Z=z)=\log|\Pi^{-1}(z)|$; that uniformity is an additional condition, not a property of pushforward.

The chapter's continuous reference measure and conditional-singleton caveats are useful, but do not resolve this discrete contradiction. Nor does a realized universe history and a record partition select a unique ignorance measure; the preparation model must still supply the weights. An invariant constant on each fiber can vary between fibers and contribute to $H(Z)$, contrary to the universal entropy-relevance rule at line 92.

**Smallest repair:** define record-outcome entropy, conditional inference entropy, and Boltzmann log-volume separately; identify which one each later formula uses. Keep the valid KL data-processing result. Use the four-history example to explain conditioning and the opposite refinement directions. Thermodynamic identification then requires the relevant physical reduction. **Grade:** derived finite counterexample. **Falsifier:** a fully specified conditioning convention making every occurrence consistent with these identities would close the finding; changing only the prose label would not.

#### ENT-2 — High: the second-law formula adds the chart-change correction twice

**Location:** lines 629–649 and 705–721. **Type:** sign/double-accounting error, inherited.

The local balance defines the measured entropy change to contain $+\mathcal R_{\mathcal Q}$, where that term accounts for a change of record map. The later purported total then adds $+\int\mathcal R_{\mathcal Q}\,dT$ to the already measured inside change. With no physical evolution, flux, or production, refine a fair-bit record from a constant label to an exact label. Its record entropy changes by $k_B\log2$, entirely accounted for by the chart term. The later formula reports $2k_B\log2$ rather than zero physical production. Under the earlier sign convention, subtract the map-change term to remove its contribution from the observed change. For both inside and environment chart changes, both corrections must be treated consistently.

Line 721 also says that an irreversible comparison has a positive residual. Physical entropy production can be positive on a fixed exact chart with zero record-change residual, so these terms cannot share that interpretation.

**Smallest repair:** derive the total diagnostic from the integrated balance, state whether it measures observed entropy change or physical production, and give the chart correction one consistent sign. Keep physical production separate from map changes and numerical errors. **Grade:** derived from the displayed definitions. **Falsifier:** an alternative explicitly defined residual with the opposite sign in the first balance would change the conclusion, but would require changing that balance too.

#### ENT-3 — High: horizon patch counts do not factor without compatibility assumptions

**Location:** lines 531–579 and 893–971. **Type:** unjustified exact factorization and incomplete entropy identification.

The final horizon formula sets the globally admissible label count equal to the product of the locally admissible counts. With two patches each allowing labels $0,1$, but a shared-history condition requiring equal labels, there are only two global assignments, $(0,0)$ and $(1,1)$, while the product is four. In general, the global set is a subset of the Cartesian product. Equality requires that every local combination be globally compatible. That is different from statistical independence of probabilities, which is also needed if entropy is to be added as marginal entropies.

The preceding finite-edge capacity bound is sound only when distinct assignments being counted are distinguished by the finite edge-label tuple. Uncounted internal multiplicity cannot be bounded by that tuple. Even when this holds, a finite capacity gives an entropy upper bound, not an attained entropy. For the two compatible assignments, probabilities $(0.9,0.1)$ give $H=0.325083$, below $\log2=0.693147$. With many binary edges constrained to one common label, capacity per edge and edge density may remain finite while total entropy stays $k_B\log2$; an upper bound of area order does not establish a nonzero area-law coefficient.

**Smallest repair:** define the global compatibility set; use the product as an upper bound unless factorization is proved. Distinguish log-capacity from the entropy of a declared measure and state the additional condition for a positive limiting entropy density. Keep terminal alignment and the proposed surviving labels at their actual hypothesis level, rather than treating them as an exhaustive derived microstate classification. **Grade:** derived counting counterexample; inferred missing physical construction. **Falsifier:** a global compatibility theorem, an entropy measure, and the required limiting density would discharge the corresponding parts. The exact final product predates the conversion; the finite-alphabet bound was added during it.

#### ENT-4 — High: increased exposure is not net extractable work

**Location:** lines 274–345. **Type:** objective mismatch and unjustified additivity, inherited.

The operational definition maximizes net energy delivered to a weight. The later de-shielding term instead maximizes gross positive changes of exposure times a fixed internal energy. It omits control work, reset cost, heat, changes of the internal account, and the final-state requirement. In a normalized comparison with $c_f=1$, releasing one energy unit at a control cost of two gives net work $-1$, while the exposure formula gives $+1$. This logical countermodel does not assume that such a physical de-shielding process exists.

The displayed sum of exposed and de-shielding availabilities also need not equal the joint optimum. If the only allowed controls produce contributions $(1,0)$ or $(0,1)$, the joint supremum is one, while the sum of separate suprema is two. For an empty control class the displayed supremum needs an explicit convention; it is not automatically a zero resource. Calling the expression schematic does not justify interpreting it as the operational quantity already defined.

**Smallest repair:** retain gross exposed energy as a candidate diagnostic, and calculate actual availability through the existing net-work optimization on one admissible process. State the assumptions under which the terms can be added. Before using the free-energy work bound at lines 288–300, name the physical thermodynamic entropy, bath, first/second-law comparison, and allowed work/control channels; an arbitrary record entropy does not acquire that bound by definition. **Grade:** derived counterexamples to the identification; inferred missing thermodynamic reduction. **Falsifier:** a cost-complete process and separability result equating the gross proxy with the joint net optimum would close the issue.

#### ENT-5 — High: the mass-window criterion repeats Energy's corrected error

**Location:** lines 347–360. **Type:** necessary/sufficient-condition reversal and current cross-chapter inconsistency, inherited.

Write the proposed scalar-trace bracket as $B+C$, with $B=\zeta_{\mathrm{probe}}(1+\delta\mathcal M_0)$ and signed $C=\mathcal Z_{\mathrm{tf},ab}\delta\mathcal M_{\mathrm{tf}}^{ab}/3$. With positive prefactor, positivity requires $B+C>0$. The chapter imposes the stronger $B>|C|$ and says failure has not supplied a positive scalar-mass reservoir. Energy now explicitly corrects this inference. Its algebraic example has $B=1$, $C=1.62$, and positive trace bracket $2.62$, while failing $1>1.62$.

**Smallest repair:** propagate the signed criterion and sufficient-bound distinction from Energy. Name the quantity as the scalar trace of a proposed assembly inertial-response tensor, not derived physical mass. Positive trace is neither positive directional response nor evidence of extractable work; dissociation can be an allowed process if the declared control/final-state class permits it. **Grade:** derived algebra and measured inconsistency by comparison with current Energy. **Falsifier:** a stated additional physical constraint making this sufficient bound necessary on the particular reservoir family would require its own derivation. The mass mechanism and any relation to gravitational mass remain open.

#### ENT-6 — Medium: equal hit records do not imply measure-preserving involutions

**Location:** lines 165–207. **Type:** unsupported promotion of a local inference equivalence, inherited.

The cited Master Equation passage describes ambiguity in one received hit and a stationary surrogate as an inference device. It does not construct a map on full admissible histories, show that applying it twice returns the original history, or establish preservation of the preparation measure. Two histories with the same retained hit and probabilities $0.9$ and $0.1$ already disprove the implication from record invariance to measure preservation under their swap. The swap is an involution, but sends the measure to $(0.1,0.9)$. A stationary surrogate can additionally discard transmitter motion, so involutivity is not automatic even as a local recast.

**Smallest repair:** keep the local observational ambiguity; require separate full-history admissibility, bijectivity/involutivity, and measure-invariance hypotheses before making the stronger statement. A computable multiplicity also requires the declared measure or finite counting construction. **Grade:** derived nonimplication and live dependency check. **Falsifier:** an explicit history-space transformation with all three properties would justify the stronger claim.

#### ENT-7 — Medium: a general record entropy has no automatic additive spatial balance

**Location:** lines 386–400, 627–649, and 705–721. **Type:** missing local thermodynamic reduction and correlation terms, inherited.

For correlated discrete records, $H(A,B)=H(A)+H(B)-I(A;B)$, where $I$ is their mutual information. The inside-plus-environment sum therefore need not be the joint entropy. A reversible binary permutation that maps $(A,B)=(X,0)$ to $(X,X)$ for a fair bit $X$ preserves joint entropy $\log2$, but increases the sum of marginal entropies from $\log2$ to $2\log2$. The difference is correlation, not demonstrated irreversible production.

A general history or access-cut entropy likewise does not automatically have an additive local density $s_{\mathcal Q}$ with a local entropy current. The moving-boundary correction in the displayed balance is mathematically appropriate once such a density and balance have been established. It does not establish that reduction for every entropy introduced in the chapter. The local organization row's $\Delta S_{\mathrm{inside}}\le0$ is one process class, not a definition of all organized systems; a maintained steady state may have zero change while continually producing and exporting entropy.

**Smallest repair:** restrict the density/current and additive thermodynamic balances to an explicitly justified coarse local regime, or retain correlation/information-flow terms in the general record account. Identify the entropy used before invoking the second-law inequality. **Grade:** derived finite correlation example; inferred missing reduction. **Falsifier:** an applicable additive-entropy construction or controlled bound on the omitted correlations would discharge the issue.

#### ENT-8 — Medium: escaping distinctions do not determine the sign or amount of entropy change

**Location:** lines 671–689 and 773–775. **Type:** underdefined theorem target tied to the wrong entropy functional, inherited.

The wake-escapement set classifies causal intersections. It does not assign probabilities, entropy weights, or independence to distinctions, so counting escaping roots cannot by itself yield an entropy rate. Losing access to a fair bit reduces the retained outcome entropy from $\log2$ to zero while increasing hidden conditional uncertainty by $\log2$. A hundred duplicate records of the same bit still carry at most one bit of new information. At the thermodynamic level, outward positive entropy transport enters the window balance with a minus sign; it is not automatically positive internal production.

**Smallest repair:** state which entropy the arrow target concerns after ENT-1, define a measure-weighted information-loss or entropy-transfer functional, and derive its relation to the earlier signed flux balance. Keep the common-boundary-functional hypothesis and its existing falsifier, but do not identify its distinct projections or signs by analogy. **Grade:** derived counterexamples to the automatic sign/count interpretation; guessed physical mechanism remains open. **Falsifier:** a construction yielding the stated equality for the chosen entropy on the declared history class would close the target.

#### ENT-9 — Medium: the complexity score does not imply a stability criterion

**Location:** lines 404–421. **Type:** undefined normalization and unsupported dynamical inference, inherited.

For normalized quantities $x=S^{\mathrm{incoh}}/S^{\max}$ and $y=S^{\mathrm{coh}}/S^{\max}$, the score is $x(1-y)$. On the square $0\le x,y\le1$ it peaks at the corner $(1,0)$. The formula contains no acceleration balance, recurrence, perturbation dynamics, or stability spectrum. Without an admissible-state relation between $x$ and $y$, a fixed finite positive maximum entropy, and a definition of the coherent/incoherent probability spaces, it does not supply a stability criterion or an intrinsic measure of structural complexity. Enlarging an unrelated noisy background can change the score without changing the core's dynamics.

**Smallest repair:** define the distributions, constraints, and normalization; label the association of stable assemblies with ridges as a guessed diagnostic hypothesis, with stability determined independently from actual retained trajectories. Remove the implied derivation conveyed by “therefore.” **Grade:** derived properties of the score; inferred missing dynamical bridge. **Falsifier:** a proved relation between the score and an independent stability result on a specified assembly family would support stronger wording.

#### ENT-10 — Medium: cross-entropy is an ideal coding cost, not every actual mean code length

**Location:** lines 591–613. **Type:** exact-versus-ideal coding identification, inherited.

For $P=Q=(0.9,0.1)$, the displayed cross-entropy is approximately $0.468996$ bits per symbol. Any binary prefix code for two symbols uses at least one bit per symbol. Thus this value is not the exact length of a one-symbol implemented prefix code. It is the expected ideal logarithmic loss; block/arithmetic coding can approach the rate under declared assumptions and overhead. The mathematical identity $H_2(P,Q)=H_2(P)+D_{\mathrm{KL}}(P\|Q)/\log2$ is valid when the support conditions hold.

**Smallest repair:** call it expected ideal code length or log-loss, and state the coding limit/overhead needed for physical implementation. Specify infinite loss when $q_i=0<p_i$. Preserve the preceding valid prefix-code lower bound. **Grade:** derived binary counterexample. **Falsifier:** an explicitly ideal fractional-length convention would make the formula exact for that convention, while still requiring a separate physical code interpretation.

#### ENT-11 — Medium: reset error and side information need a defined entropy correction

**Location:** lines 869–883. **Type:** incomplete Landauer comparison contract; the environment-side correction is an improvement over the baseline.

The leading reset bound is appropriate for an uncorrelated, fully erased memory under the declared thermal comparison. The unspecified “measure/readout tolerance” is not automatically an additive entropy tolerance. If a binary reset ends in probabilities $(0.9,0.1)$, its residual entropy is $h(0.1)=-0.1\log0.1-0.9\log0.9=0.325083$, not its error probability $0.1$. Under the simple thermal entropy-balance assumptions, the erased entropy is $\log2-h(0.1)$, rather than $\log2-0.1$. For more states, the relation also depends on alphabet size and the failure distribution.

Accessible side information can change the entropy actually erased. A perfect retained copy of a classical bit permits a reversible controlled reset of that bit while consuming their correlation; resetting the copy later restores the full-cycle cost. This does not violate the ordinary uncorrelated reset bound. The quantum comparison literature also treats the conditioning explicitly, as in [del Rio et al., The thermodynamic meaning of negative entropy](https://arxiv.org/abs/1009.1630); its abstract was inspected only for that scope, not used as a substrate premise.

**Smallest repair:** define $\varepsilon_\mu$ as a proved entropy deficit or replace it with initial-minus-final entropy under a stated error model. State the initial correlation, usable side-information, and eventual reset conventions. **Grade:** derived finite entropy arithmetic; effective thermodynamic comparison. **Falsifier:** a previously declared entropy-error bound and uncorrelated protocol matching this notation would discharge the issue.

#### ENT-12 — Medium: a cyclic device need not return its environment to its initial state

**Location:** line 885. **Type:** overly restrictive cycle boundary, inherited.

The paragraph requires the memory, apparatus, target, and boundary environment all to return to the same physical record. Cyclic device operation normally restores the designated working device; reservoirs, processed targets, and work stores can change. Here the previous reset inequality explicitly requires entropy export. Returning that same environment to its exact initial record would erase the stated export and impose a stronger global cycle. Such a stronger cycle can be studied, but it is not the definition of every cyclic demon or engine.

**Smallest repair:** identify which apparatus variables are cyclic and which external variables carry heat, entropy, work, or processed outputs. State that a full return of all those resources is a separate condition. **Grade:** derived inconsistency between the reset export and the proposed universal return requirement; effective comparison. **Falsifier:** explicitly restricting the paragraph to a closed global cycle, rather than all cyclic apparatus operation, would remove the overreach.

#### ENT-13 — Medium: quasi-invariance alone does not conserve fine-grained entropy

**Location:** lines 150–161, with the stronger condition correctly stated at line 798. **Type:** missing measure-change qualification, inherited.

A quasi-invariant reference measure preserves null sets under an invertible transformation; it need not preserve volumes or differential entropy. For $Y=2X$ with $X$ uniform on $[0,1]$, Lebesgue measure is quasi-invariant on the ambient real line, but differential entropy relative to that fixed reference rises from zero to $\log2$. The change is the mean logarithm of the Jacobian. A transported reference can yield an invariant relative functional, but then the reference is changing and must be named. The phrase “suitably quasi-invariant” does not specify this correction.

**Smallest repair:** require the relevant invariant reference and invertibility for the conservation statement, or state the Radon–Nikodym/Jacobian correction and transported-reference convention explicitly. Preserve the existing warning that determinism supplies no delayed Liouville theorem. **Grade:** derived change-of-variables example and inferred underspecification. **Falsifier:** explicit conditions making the correction vanish, or an explicitly transported reference, would discharge the gap.

#### ENT-14 — Medium: several diagnostic domains and teaching definitions remain missing

**Location:** lines 27–37, 94–114, 165–211, 243–266, 489–507, 719, 804–839, and 906–947. **Type:** operational/notation omissions, not a request for decorative explanation.

The chapter needs a local explanation of a causal root before its receiver record, of pushforward and conditional measure at their first load-bearing use, and of the divergence in the data-processing comparison. The preparation fiber in the basin-weight formula must be placed in the same time-indexed domain as $\mu_T$ and the inverse flow. The ratio requires positive finite conditioning mass and a basin partition covering the admitted outcomes. The Boltzmann-brain ratio likewise needs a nonzero finite denominator or an explicit undefined/infinite result, and the wake-concordance fraction needs a rule for a record with zero retained incoming roots. A fluctuation tolerance intended as a statistical guarantee needs a measure, confidence/failure probability, and tested regime; it cannot be a universal deterministic cap on entropy decreases merely because it is named.

The horizon section uses $T_U^{(O)}$, $\delta_\ell$, and $\epsilon_{\mathrm{local}}$ without adequate local definitions. Its coefficient has units of inverse area, so $\ell_{\mathrm{eff}}$ must be a length scale whose square is an area, rather than an “area scale” as written at line 936. The temperature derivative also needs its admissible state variables and fixed sea/control parameters specified when those variables independently affect entropy. The provenance graph must say whether its edges are known from retained tags, conditioned on one candidate history, or uncertain across compatible histories; hidden transmitter identity does not define one observed graph automatically.

**Smallest repair:** define these objects in place, give each ratio its admissible domain and undefined case, and add a compact worked record/fiber example. Preserve sophisticated mathematics where it is actually constructed; do not substitute unexplained words such as cut space or boundary operator for the missing map from labels to entropy. **Grade:** inferred conformance findings against the live edition-1.1 teaching standard and the written formulas. **Falsifier:** an existing local definition that resolves a specific listed omission would remove that subitem. Diagram or table layout is optional; the definitions are not.

#### Preservation, source support, and verification

The pre-campaign diff contains scientifically helpful changes beyond style: a proper counting reference replaces a normalized probability inside the Boltzmann logarithm; temperature is separated from absolute time in two formulas; apparatus locking becomes conditional; the reset bound is moved to the environmental account; a success-probability-only computation-cost equation is removed; the horizon coefficient acquires its area normalization; and several unsupported cosmology, purity, recurrence, and measure-suppression assertions are weakened to their defensible levels. These improvements should not be reverted to satisfy character-for-character preservation. They also mean the historical conversion cannot be certified as preserving all equations and claim grades exactly. The cosmological exponent changed with its comparison budget; it remains a rough sensitivity illustration, not a derived probability or a justified identification of that horizon with every possible $S_{\max}$.

The scoped validator first passed known math/link/KaTeX extraction fixtures. Its initial strict viewer-ID equality assertion correctly failed: although both versions contain 54 display equations, the current source adds the finite-edge capacity bound `corpus-equation-fb24ad351d46fbe8` and removes the unjustified computation-cost equation `corpus-equation-b97fdcb000af71bb`. The comparison was then changed to align surviving equations by their viewer IDs; a known added/reordered-ID fixture passed before target alignment. The final report accepts 253 math expressions under vendored KaTeX, finds 54 display equations and 54 viewer links, and confirms 70 local-link file occurrences. Of 53 surviving IDs, 47 displayed formulas remain identical and six change; surviving IDs retain their relative order. The full raw-source diff was inspected as well, since the canonical display parser strips Markdown quote prefixes and does not by itself certify every standalone inequality token.

The six changed surviving displays are the Boltzmann count, two temperature-symbol corrections, the cosmological exponential scale, the environment-side reset bound, and the horizon area normalization. The finite-edge bound is a seventh mathematical addition and the computation-cost row a deletion. The known-case-first fragment/order checker resolves all 11 chapter links containing Markdown section fragments against current headings or explicit IDs. `node scripts/validate-equation-mapping-links.mjs` passes its 23 registered curated links; it is not an independent check of all 54 Entropy viewer IDs. No browser navigation or visual layout audit is claimed.

The unchanged reviewed source is the target of `.tmp/crw005-entropy-review/mathematical-checks.mjs`, whose entropy helper first returned zero for a singleton and $\log2$ for a fair bit, and whose equality checker passed positive/negative fixtures before the review examples. It reproduced the four-history distinction, double-added chart term, compatible patch count, positive trace, gross-versus-net work, nonadditive optimizations, correlated marginal entropies, unequal-weight recast, binary coding gap, reset-error entropy, and quasi-invariant rescaling examples above. These finite constructions are independently checkable algebraic counterexamples; none claims an admissible physical assembly, a constitutive response, or an EOM solver result. All newly instantiated numerical comparisons use $c_f=1$.

Primary-source checks were bounded to claims used in this review. [Shannon's original paper, accessible reprint](https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf), particularly its conditional/joint-entropy discussion and noiseless coding theorem, supports the distinctions used here. The [Egan–Lineweaver abstract](https://arxiv.org/abs/0909.3983) supports the quoted orders of magnitude and black-hole dominance of its observable-universe estimate. The publisher abstracts for [Gibbons–Hawking](https://doi.org/10.1103/PhysRevD.15.2738), [Bekenstein](https://doi.org/10.1103/PhysRevD.7.2333), and [Hawking](https://doi.org/10.1007/BF02345020) support their historical horizon/thermodynamic roles; full-paper theorem verification is not claimed. The Kullback–Leibler DOI could not be retrieved by the browser, and the Landauer DOI returned an anti-bot page, so neither full source was certified. These access limits are not evidence that the underlying citations are wrong. The finite proofs above do not depend on inaccessible text, and no new source-mining campaign or compulsory bibliography expansion is proposed.

**Current campaign state:** Packet 1 contributes 14 reviewed paths; Packet 2 now contains Master Equation, Energy, and Entropy, giving 17 of 190 reviewed and 173 remaining in the CRW-005 disposition inventory. Master Equation and Energy retain their accepted implementation receipts. Entropy has 14 proposed findings awaiting adjudication. The next unread Dynamics document is Binary Dynamics, under the one-document instruction; the Foundations campaign and manuscript remain separately scoped. A changed target hash, failed example, or resolving local definition would overturn the corresponding measured or inferred finding and requires re-adjudication.

### CRW-005 Entropy ENT-1 through ENT-14 — accepted integration, 2026-09-10

The operator's “do 1 and then do the next document” authorizes all 14 Entropy corrections followed by a review-only pass of Binary Dynamics. All ENT-1 through ENT-14 are **✓ Accepted and implemented** in [Entropy](../../../content/markdown/aaa/dynamics/entropy.md). This receipt supersedes their proposed status above without changing the historical review. It does not close the physical entropy, mass, horizon, or singular-event derivations.

| Finding | Implemented correction |
| --- | --- |
| ENT-1 | Separated record-outcome entropy, conditional inference entropy, Boltzmann log-volume, and thermodynamic identification; supplied the four-history example and opposite refinement directions. |
| ENT-2 | Subtracted both inside and environment map-change contributions from their observed changes; kept physical production distinct. |
| ENT-3 | Defined globally compatible assignments, conditional weights, finite-edge injection, capacity bounds, and the extra positive-density requirement for an area law. |
| ENT-4 | Replaced the claimed additive availability with a gross-exposure proxy; routed actual extraction through cost-complete net work and final-state constraints; defined no-extraction and infeasible cases. |
| ENT-5 | Propagated Energy's exact signed trace condition with its actual positive prefactor, distinguished the sufficient absolute-value bound, and retained the open assembly-mass mechanism. |
| ENT-6 | Separated equal local hit records from admissible, involutive, measure-preserving transformations of complete histories. |
| ENT-7 | Restricted local density/current balances to a justified additive thermodynamic regime and supplied the mutual-information correction for correlated records. |
| ENT-8 | Defined information lost under a specified record coarsening and measure; separated its sign from outcome entropy and outward thermodynamic flux. |
| ENT-9 | Defined finite record alphabets and fixed normalization; kept the complexity/stability association at guessed grade with an independent stability test. |
| ENT-10 | Distinguished ideal logarithmic coding cost from implemented prefix lengths, including support and overhead conditions. |
| ENT-11 | Defined the reset correction as residual entropy under an error model and retained correlation/side-information accounting. |
| ENT-12 | Distinguished a device cycle from restoring its bath, targets, and work store. |
| ENT-13 | Required an invariant reference or explicit measure-change correction for fine-grained conservation. |
| ENT-14 | Defined conditioning, pushforward, causal roots, divergence, graph provenance, ratio domains, temperature controls, statistical confidence, and horizon variation/length conventions in place. |

**Editorial closure:** the complete revised 993-line source was reread, including unchanged sections. That reread additionally clarified the minimum entropy specification, removed the remaining claim that all quantities factor through one fiber, and aligned the heat-death passage with the fixed-reference distinction. This is editorial self-review, not a second agent's review. By `shasum -a 256`, the pre-edit source is `39f4fe93b8627e91e51d8e8163b352f83b229e894dab65c204ca2098405cfb5d` and the revised source is `bf462293a13b9c9b26376454361be6b146155dfcd1c46e08415adb9e66395f2c`.

**Verification:** the scoped `.tmp/crw005-entropy-fixes/validate.mjs` passes its known extraction and alignment fixtures before checking the target; its final output is retained in `final-validation.txt` in that scratch directory. It confirms all 54 display equations and 54 viewer IDs remain in order, with 10 intentional formula changes and no added or removed IDs, and verifies 70 local-file link occurrences. The known-case-first fragment checker resolves all 11 Markdown section-link occurrences. Vendored KaTeX accepts all 306 extracted expressions in the final source; an intermediate missing-brace error was corrected before the passing final run. `node scripts/validate-equation-mapping-links.mjs` passes its 23 registered curated links, which is not a check of all chapter viewer destinations. Scoped `git diff --check` passes. No visual layout or browser-navigation certification is claimed.

The unchanged `.tmp/crw005-entropy-review/mathematical-checks.mjs` was rerun as a separate finite mathematical reference. Its singleton/fair-bit fixtures pass before the four-history, chart, compatibility, signed-mass, net-work, correlation, coding, reset, and reference-rescaling examples. The repaired definitions and signs were checked against those constructions; no reference formulas were modified to agree with the edits. The examples establish the stated algebra, not a realized assembly or EOM evolution. Every new numerical instantiation uses $c_f=1$. Source-verification boundaries remain those recorded in the Entropy review; no bibliography expansion was needed.

All 14 corrections are closed at the document-integration level. The physical reduction of entropy, candidate mass map, positive horizon entropy density, and unified wake-boundary mechanism remain explicitly open in the chapter. Existing conversion history and evidence bytes were preserved. The source changed without generated writes; equation-map regeneration belongs to the final publication procedure, using `node scripts/build-equation-mapping-corpus.mjs --write` when that procedure is invoked.

### CRW-005 Packet 2 document 4 — Binary Dynamics assurance review, 2026-09-10

**Scope:** complete review-only reading of all 2,318 lines of [Binary Dynamics](../../../content/markdown/aaa/dynamics/binary-dynamics.md), its changed source lines and displayed-equation comparison against pre-campaign `897fe1aa7`, and relevant current Master Equation/Energy definitions. No Binary Dynamics edits were made. The textbook TOC traversal places it after Entropy and before Causal Action Functional. The reviewed SHA-256 is `afeae578058591cb6feba913d039c5b48df9bfd55beb250608ecb225962148a2`; the historical source hash is `95d068269ae12c29d10633838f5a43434c025d7da15feeab1d16023854bb3c57`, measured with `shasum -a 256`.

The chapter's separation of prescribed circular balance from stable retained dynamics is sound and must be preserved. Its full-angle self-root equations, principal partner certificate, collision-free winding lemma, and first reported full-ledger circular balance remain useful. This review finds **18 actionable issues: nine high and nine medium**. All BD-1 through BD-18 are **○ Proposed**, awaiting operator adjudication. Existing open MCB or mass derivations are not themselves counted as defects; the findings concern inconsistent formulas or claims that exceed their stated assumptions.

#### BD-1 — High: boundary energy bookkeeping cannot replace pointwise tangential acceleration balance

**Location:** lines 560–572, 911–961, 1003–1054, 1584–1627, and 1820–1859. **Type:** kinematic contradiction, inherited.

A prescribed constant-speed circle has $\mathbf V=s\hat{\mathbf e}_t$ and $\mathbf A=-(s^2/R)\hat{\mathbf e}_r$, hence $A_{\mathrm{tan}}(T)=0$ at every time. A positive sum of canonical tangential accelerations changes the speed regardless of which wake account receives the compensating energy. The principal-partner passage offers wake flux as an alternative to the zero sum; the circular requirements then omit pointwise tangential balance and add a boundary acceleration to the normative balance residual without adding that acceleration to the EOM. Those are incompatible equations for one trajectory. A period average is sufficient on the exactly symmetric stationary circular chart only because the component is constant; it is not sufficient for a deformed periodic history. An oscillating speed can have zero mean tangential acceleration.

The quadratic power row also changes a sum over both members into one $\mu_{\mathrm{arch}}s_b\langle A^{\mathrm{tan}}\rangle$ without declaring that the last acceleration is the sum; for identical per-member components the total is twice the single-member value.

**Smallest repair:** require the total actual acceleration to satisfy the radial and tangential kinematics pointwise; keep energy and boundary closure as additional conditions. If a boundary interaction supplies acceleration, derive it and include the same term in the EOM and power sum. Define per-member versus summed normalization. **Grade:** derived directly from differentiating the circular ansatz. **Falsifier:** a consistent acceleration term already included in the same EOM, or a nonuniform-speed scope explicitly replacing the circular claim, would resolve the relevant subclaim.

#### BD-2 — High: surface smoothing leaves the zero-delay self singularity and makes the stated self-inclusive theorem inapplicable

**Location:** lines 2033–2113. **Type:** singular kernel and empty self-channel admissibility condition, inherited despite an improved finite-width theorem.

Definition 3 sums over $j=i$ and integrates to $\theta=0$, where the self separation is exactly zero. A positive separation floor on every $\theta\in[-h,0]$ cannot hold for that channel. Excluding the single endpoint does not supply a positive infimum for a continuous self history. For a smooth nonzero-speed segment, separation scales as $|\theta|$ and the inverse-square vector amplitude as $|\theta|^{-2}$. A usual smooth mollifier positive near zero does not remove that nonintegrable behavior. The canonical exclusion of the zero-delay self root therefore does not automatically pass through to this smeared integral.

**Smallest repair:** state an explicit admissible self-support/early-time exclusion or independently declared core regularization and its sharp-limit scope; otherwise restrict the theorem to channels with a genuine separation floor and say that it supplies no self-inclusive binary well-posedness result. The current Master Equation distinguishes singular-event controls and auxiliary core regularization; a surface mollifier alone is not a coincidence law. **Grade:** derived endpoint and local asymptotic counterexample. **Falsifier:** an explicit kernel-support prescription making the integral finite and satisfying the stated floor would discharge the issue.

#### BD-3 — High: the proposed impulse history space excludes the advertised limits

**Location:** lines 1979–1993 and 2047–2049. **Type:** wrong functional space for finite impulses; the conversion extended the older position-only space to include velocity.

The chapter chooses $\mathcal H_*=W^{1,\infty}([-h,0];(X,V))$ and calls it the home for finite-impulse limits with velocity jumps. Both $X$ and $V$ are Lipschitz in that space; $V$ cannot jump and its derivative must be essentially bounded. Even an ordinary integrable fold can violate this requirement: $A(T)=T^{-1/2}$ on $T>0$ gives $V(T)=2\sqrt T$, bounded with finite impulse but not Lipschitz at zero. A nonzero delta impulse is still less regular. Bounded velocity and finite total impulse do not imply convergence in the stated norm.

**Smallest repair:** distinguish smooth finite-$\eta$ histories from their limits; use an explicitly justified class such as absolutely continuous velocity for integrable accelerations or bounded-variation velocity with an event convention for jump impulses, while positions retain the corresponding integral regularity. State the convergence topology and one-sided history evaluations. **Grade:** derived counterexamples. **Falsifier:** a uniform acceleration bound and strong convergence excluding every advertised jump would justify $W^{1,\infty}$, but would narrow the claimed impulse class.

#### BD-4 — High: an isolated circular normal does not define the claimed protected handedness label

**Location:** lines 1134–1146. **Type:** explicit counterexample to the stated invariant, inherited.

The normal $\hat{\mathbf n}=\hat{\mathbf r}\times\hat{\mathbf V}$ is an axial vector, not by itself a two-component chirality invariant of an isolated circle. Rotate the complete labeled history continuously through angle $a\in[0,\pi]$ about an axis in its plane. The endpoint normal is its negative. Every intermediate circle is nondegenerate; distances, transmitter order, causal-root times, and Jacobian dot products are preserved by the same proper spatial rotation. This is exactly the chapter's stated falsifier and is licensed by its later $O(3)$ covariance proof.

**Smallest repair:** describe an oriented normal relative to a declared external or assembly frame. Retain a protected $\mathbb Z_2$ claim only after defining additional framing data and proving that the above rotation is excluded by the physical state class. **Grade:** derived rigid-rotation counterexample. **Falsifier:** additional physically retained framing that obstructs this deformation would change the problem; a drawing orientation alone would not.

#### BD-5 — High: the signed labels undercount roots and confuse representation changes with births

**Location:** lines 421–469, 619–724, 1158–1225, 1489–1569. **Type:** root-index and chart-domain errors, inherited.

A root is not uniquely identified by $(m,\sigma)$: a fold produces two roots in the same signed window. At $s=3$, the complete partner census has three roots but only two distinct $(m,\sigma)$ pairs; at $s=4.65$, the self census has three roots but two pairs. The definitions of $N_s$ and $M_p$ therefore undercount. These counts were reproduced using the unchanged circular analyzer, with the sign/window mapping checked on known examples first.

The principal self root continues smoothly through full delay angle $\pi$ at $s=\pi/2$, where $J=1$ and the total self count remains one. It changes signed representation; a new physical self root is not born there. Similarly a partner root crosses full delay $2\pi$ at $s=\pi$, with $J=1$. The domain $\alpha_p\in(0,\pi)$ excludes $\alpha_p=0$, although this is a nonzero-length diameter partner chord for older windings. The statement that the $m=0$, positive-sheet self representation exists for every $s>1$ conflicts with its restricted $\alpha_s\le\pi$ domain. The assertion that all higher delays are one common principal angle plus $2\pi m$ also hides the root-specific angles. Finally, decreasing a positive self-sheet angle toward zero sends its emission azimuth toward zero, not toward $-\pi$ as claimed.

**Smallest repair:** enumerate roots by the full delay, or add a left/right-root index inside each signed window; handle shared endpoints once and distinguish a chart change from physical birth. Propagate this convention through the count formulas, speed ladder, and azimuth section. Preserve the later correct full-half-angle sign theorem. **Grade:** derived from the delay equations, with scoped numerical confirmation. **Falsifier:** a one-to-one root-label map covering the cited two-root windows and endpoints would resolve it.

#### BD-6 — High: the averaged history Hessian has no established stability sign test

**Location:** lines 1651–1700. **Type:** unsupported necessary condition and instability inference, inherited.

The passage says negative averaged stiffness signals instability and positive stiffness is necessary, although its history potential may be only a diagnostic work reconstruction. Neither follows for general delayed or gyroscopic dynamics. For example, the two-dimensional comparison system $\ddot x+2\Omega J\dot x-a x=0$, with $J$ a quarter-turn matrix and $\Omega^2>a>0$, has negative potential Hessian $-aI$ but distinct purely imaginary characteristic roots and bounded linear motions. This is a mathematical counterexample to the proposed necessity, not an imported binary law. Conversely, for $\ddot x(T)+k x(T-\tau)=0$, the positive coefficient $k$ does not prevent delay instability: differentiating $\lambda^2+k e^{-\lambda\tau}=0$ at $\tau=0$ gives $d\lambda/d\tau=k/2>0$ at $\lambda=i\sqrt k$.

**Smallest repair:** keep the Hessian as a diagnostic unless a restricted energy/variational theorem establishes its relation to the actual linearized history operator. Use the full return operator for the stability verdict. **Grade:** derived mathematical counterexamples and inferred missing bridge. **Falsifier:** a theorem for the declared binary chart proving the required relation would license the sign test within that scope.

#### BD-7 — High: period rescaling is not automatically a neutral physical direction

**Location:** lines 1662 and 1881. **Type:** unjustified mode removal from the stability operator, inherited.

Time translation and spatial isometries are symmetries of the stated law; changing the period at fixed spatial shape is not. If $Y(T)=X(aT)$, the delayed chord condition rescales the history arguments while $c_f\Delta$ remains tied to absolute elapsed time. The old roots do not generally remain roots. A phase shift of a periodic solution yields the familiar neutral tangent; a period variation is an unknown in an augmented periodic-boundary problem and need not generate a second unit multiplier of the physical return map.

**Smallest repair:** remove only neutral directions proved for the full retained dynamics. Distinguish an auxiliary period variable or numerical phase condition from a physical neutral mode; avoid removing phase and an overlapping rotation twice. **Grade:** derived failure of time-rescaling invariance and inferred spectral risk. **Falsifier:** an explicit second symmetry generator with unit multiplier in the physical return operator would justify its quotient.

#### BD-8 — Medium: Conley-index persistence does not establish an attracting periodic orbit

**Location:** lines 1085 and 1700. **Type:** incomplete topological stability bridge, inherited.

An isolating neighborhood confines the invariant set, not every nearby forward trajectory. A persistent Conley index can describe a saddle; for instance, the fixed planar system $\dot x=x,\dot y=-y$ has an isolated hyperbolic saddle whose index persists under small parameter changes, while nearby trajectories escape along $x$. Index persistence alone proves neither attraction nor that the invariant set is one periodic orbit. At a singular $\eta\to0$ limit, failure of a chosen isolating neighborhood or index comparison does not by itself prove that no stable limit orbit exists elsewhere or under another valid continuation.

**Smallest repair:** separate invariant-set persistence, periodic-orbit identification, and attraction. Supply the trapping/contraction or other dynamical argument appropriate to the claimed attractor, and specify the admissibility/compactness conditions for a history-space index. **Grade:** derived nonimplication via a hyperbolic saddle; inferred missing continuation conditions. **Falsifier:** an applicable theorem with the extra attraction and orbit-identification hypotheses would resolve it.

#### BD-9 — High: small residuals and a spectral margin are not an existence theorem

**Location:** lines 1746–1948. **Type:** numerical diagnostic promoted to mathematical certification, inherited.

The final implication certifies a finite-$\eta$ binary from small nonzero EOM/period residuals, positive root floors, and a spectral radius below one at the candidate. A derivative evaluated away from an actual periodic solution is not yet a Floquet certificate. Small return defect and pointwise derivative below one are insufficient: the scalar flow $\dot y=\varepsilon(1+y^2)$ is strictly increasing and has no periodic orbit. At $y_0=-1$, period one, and $\varepsilon=10^{-4}$, its return defect is about $0.00019998$ and return derivative $0.99980004<1$. This checks the logical gap, not an AAA counterexample. The earlier proposed neighborhood self-map must itself be proved with the needed space, compactness or contraction assumptions; it is not included quantitatively in the final residual implication.

The finite inactive-record complement also needs a covering proof: checking finitely many declared gaps does not exclude undeclared roots over the continuous delay interval. Literal $1+$ acceleration denominators require the stated nondimensional acceleration scale to be applied consistently.

**Smallest repair:** label the tuple a numerical acceptance diagnostic, or add an actual a posteriori existence enclosure, nonlinear error bounds, complete root exclusion, and a verified spectral bound at the enclosed orbit. State the nondimensional norm/scales. **Grade:** derived counterexample to the residual inference and inferred missing certification hypotheses. **Falsifier:** a validated fixed-point or equivalent existence theorem satisfying those quantitative hypotheses would justify certification.

#### BD-10 — Medium: generic interior folds do not describe all ledger changes

**Location:** lines 1222–1254, 1569, 1785–1800, and 2009–2031. **Type:** missing unfolding and boundary hypotheses, inherited.

The fold conditions omit transversality to the parameter: $F=F_{T_t}=0$ and $F_{T_tT_t}\ne0$ do not ensure a generic birth as $s$ varies without an appropriate nonzero unfolding derivative. For example, $F(t;s)=t^2+s^2$ meets the listed second-derivative condition at zero but does not produce a pair on either nearby side. Root entry at the finite-history boundary, the excluded coincident self endpoint, and the signed-representation changes in BD-5 are not generic interior folds. A retained signed degree can change at a history boundary. The delay-map lemma also needs an interior root $0<\Delta^*<h$; a root at $h$ can leave the domain after an arbitrarily small perturbation.

**Smallest repair:** state the generic interior-fold and parameter-unfolding assumptions, preserve the $\Delta N=\pm2,\Delta D=0$ result only there, and separately account for endpoint, memory-boundary, and chart events. Require an interior delay margin for local retained-root continuation. **Grade:** derived local normal-form and domain examples. **Falsifier:** explicit event exclusions or additional unfolding hypotheses would resolve the corresponding statements.

#### BD-11 — Medium: the opening circular magnitude omits its Jacobian and later prose misreads the full radial coefficient

**Location:** lines 89–97, 773–829, and 1060–1077. **Type:** coefficient and scope inconsistency, inherited.

The opening calls $T_p\propto\sin(\delta_p/2)/\cos^2(\delta_p/2)$ canonical while omitting the speed-dependent factor $1/J_p$. At $s=0.8$, $R=\kappa\epsilon^2=1$, the stripped expression is about $0.232809$ and the canonical one $0.157465$; $J_p\approx1.478484$. Its positive sign survives, but its magnitude does not. Later statements that every partner has $J_p>1$ and that the partner acceleration denominator is $J_p$ instead of $|J_p|$ apply only to the principal/positive chart, not the complete negative partner sheets. The diagnostic subsection simultaneously denies canonical status to formulas that already include the canonical weight on the declared circle.

The maximum-curvature explanation also infers stronger partner pull from decreasing $\cos(\delta_p/2)$ while ignoring the changing $J_p$. The full dimensionless radial coefficient $1/(\cos\xi_p(1+s\sin\xi_p))$ falls from about $0.995086$ at $s=0.1$ to $0.808445$ at $s=1$ and approaches $2/\pi$ at large $s$. The displayed one-partner/one-self radial row also needs its restricted-ledger qualification.

**Smallest repair:** include the canonical weight, label chart domains and absolute values consistently, and discuss curvature using the full signed radial balance at specified speed/radius, not one geometric factor. **Grade:** derived formulas with unchanged-analyzer confirmation. **Falsifier:** an explicit stripped-geometry convention or fixed-weight comparison would make that narrower claim valid.

#### BD-12 — High: the center-of-mass corollary both assumes an unmapped quantity and contradicts exact symmetry

**Location:** line 2244, with lines 2210–2227. **Type:** terminology and conservation overclaim, inherited and inconsistent with current Energy.

Architrinos have no physical mass; the optional equal coefficients define a bookkeeping midpoint, not a primitive center of mass. For the chapter's exactly symmetric circle, $X_1(T)=C+\rho(T)$ and $X_2(T)=C-\rho(T)$ give $(X_1+X_2)/2=C$ exactly. Omitting a wake account cannot make that geometric midpoint oscillate. In a less symmetric history a mechanical response center may move, but this requires its actual weights and domain.

Total translation-charge conservation alone does not forbid unbounded growth of the mechanical component while the wake component compensates it. A velocity or center bound additionally requires control of the separate wake charge and a coercive energy account, as the later conditional no-runaway section partly recognizes.

**Smallest repair:** use the defined midpoint or candidate center of response, state exact symmetry pinning, and restrict generic center motion and no-runaway claims to proven charge/energy bounds. Keep assembly inertial and gravitational mass mapping open. **Grade:** derived midpoint identity and inferred unsupported conservation consequence. **Falsifier:** explicit unequal effective assembly weights or a separate bounding theorem would change the applicable center statement; neither assigns mass to primitive architrinos.

#### BD-13 — Medium: angular impulse, work, and escaped angular momentum are conflated

**Location:** lines 55–75, 167–200, 1015–1052. **Type:** sign, normalization, and account mismatch, inherited.

The opening cross product uses the outward delayed chord although the unlike-polarity acceleration is its negative; it gives the opposite of the mechanical angular-change direction under the declared orientation. The hinge expression $\int R A_{\mathrm{tan}}\,dT$ is an unweighted kinematic angular increment, not automatically angular momentum exported through a boundary. A generic finite-$\eta$ root transition need not make the pre-existing partner cycle contribution continuous in the singular limit, so equating the entire cycle-budget jump to the new self term needs additional hypotheses.

The one-form $R T_{\mathrm{net}}d\theta$ is work per bookkeeping coefficient; angular impulse is $\int R T_{\mathrm{net}}dT$. Dividing by uniform $\omega$ relates the two, but calling the first an angular-momentum potential obscures the distinction. Nor is replacing $\mu_{\mathrm{arch}}$ by $\mu_K$ a valid general angular-momentum conversion: for $p=P(s)\hat V$, transverse momentum response is $P(s)/s$, while longitudinal response is $P'(s)=\mu_K(s)$. For $K(s)=s^4/4$, $P=s^3/3$, those factors differ by three.

**Smallest repair:** define the kinematic increment, chosen momentum/kinetic chart, actual escaped charge, and conservation equation separately; correct the cross-product sign and one-form units. Keep the finite hinge impulse conditional on existence and proper normalization. **Grade:** derived sign/dimension/conjugacy checks; inferred missing escaped-charge construction. **Falsifier:** an action-derived charge equating the specified accounts with the correct coefficients would close the gap.

#### BD-14 — Medium: forward-root decay and the memory wall need their missing hypotheses

**Location:** lines 366–419. **Type:** a conditional asymptotic presented as following from smooth simple roots, inherited.

The current Master Equation conditions the decay estimate on a chasing root with $r\sim c_fd_{\min}/(c_f-u)$ and $D_t\sim c_f-u$. Binary Dynamics retains only “smooth simple-root history.” Smoothness and $D_t\ne0$ alone imply neither asymptotic. The delay lower bound requires a positive leading receiver-minus-transmitter projection in the co-moving history, not an unspecified “forward transmitter” separation. If $d_{\min}$ shrinks with the moving branch, its lower-bound divergence can change.

Likewise $u_{\mathrm{crit}}=c_f-d_{\min}/h$ is an exclusion bound under fixed stated floors, not necessarily the exact first root-exit speed. A stationary separation $(1,3,0)$ with $c_f=1$, $d_{\min}=1$, and $h=2$ satisfies the speed inequality while the actual delay $\sqrt{10}$ already exceeds the window. These distinctions are explicit in the current Master Equation.

**Smallest repair:** propagate the exact direction, uniform-floor, sharpness, and chasing-root assumptions; distinguish necessary retention bounds from actual exit events and from an independently derived moving clock period. **Grade:** derived bound counterexample and live cross-file comparison. **Falsifier:** an explicit moving family attaining those estimates would justify the stronger family-specific statement.

#### BD-15 — Medium: a local attractor and integer root counts do not establish universality or quantized geometry

**Location:** lines 296–305, 1091–1132, and 1630–1649. **Type:** missing global selection/uniqueness inference, inherited.

A stable reproducible circular branch provides candidate local units. It does not alone prove a unique global curvature cap, exclude a separate smaller-radius attractor or noncircular family, or show that all assembly clocks and rulers reduce to fixed multiples. Similarly integer root counts are constant on open parameter intervals: they can label a continuum of histories. A self-map preserving one ledger does not imply that its radius/frequency solutions form isolated values. The displayed candidate equations could yield isolated intersections, a curve, or no solution unless a rank/selection result is supplied.

**Smallest repair:** retain global cap, universal standards, and quantization as separate hypotheses requiring global comparison, basin/selection, and isolation arguments. Preserve the local candidate units and measured algebraic intersections. **Grade:** inferred missing logical premises, with the chapter's own open intervals as the counterexample to count-only discreteness. **Falsifier:** an exhaustive admissible-family bound and a theorem isolating the allowed geometric outputs would justify the stronger claims.

#### BD-16 — Medium: curvature is not necessary for every possible self-hit history

**Location:** lines 204 and 1211. **Type:** uniform-motion theorem stated for all straight paths, inherited.

Uniform straight motion at speed different from $c_f$ has no nontrivial self root, but a straight history with changing speed can. In units $c_f=1$, $X(T)=(T^2,0,0)$ on $[0,1]$ has emission at zero and reception at one with chord one and delay one. The path lies on a straight line and its reception speed is two. This is a prescribed-history geometric counterexample, not a claim that the free primitive equation generates that trajectory.

**Smallest repair:** say uniform rectilinear motion, and explain that the no-self-hit result follows from constant chord-speed mismatch; arbitrary histories require the full root test. **Grade:** derived direct chord calculation. **Falsifier:** an explicitly uniform-motion restriction removes the issue.

#### BD-17 — Medium: asymptotic equivalence symbols discard nonunit constants

**Location:** lines 228–241 and 373–375. **Type:** asymptotic-notation error, inherited.

From $\sin(\delta_s/2)\sim\sqrt{6\mu}$ and $J_s\sim2\mu$, the actual equivalents are $1/(\sin(\delta_s/2)|J_s|)\sim(2\sqrt6)^{-1}\mu^{-3/2}$ and $1/(\sin^2(\delta_s/2)|J_s|)\sim(1/12)\mu^{-2}$. The chapter drops those constants while using $\sim$, which conventionally asserts ratio one. The exponents and singularity warning remain correct. Likewise $\gamma_f(u)\sim\sqrt{c_f/2}(c_f-u)^{-1/2}$, including a factor $1/\sqrt2$ when $c_f=1$.

**Smallest repair:** retain the constants or use proportional/order notation with its convention explicit. **Grade:** derived substitution into the displayed asymptotics, confirmed by near-hinge evaluations. **Falsifier:** an explicitly declared nonstandard use of $\sim$ would remove the narrow notation error but would still need consistency with the math style guide.

#### BD-18 — Medium: instrument provenance and several teaching definitions were lost or remain ambiguous

**Location:** lines 67–75, 117–121, 650–677, 1281–1326, 1419–1423, and 1651–1700. **Type:** reproducibility and local-definition omissions.

The historical source names `scripts/equation-mapping/analyze-circular-self-hit-binary.mjs`; the current source replaces it with a generic instrument description while retaining ten-digit numerical results. The implementation still exists and was used in this review. Restore a reader-appropriate source link and identify the scan domain/tolerance and independence boundary. “Supplied tangential values” and corrections of unexplained older numbers refer to conversation history that the chapter's reader does not have.

The spiral ansatz states that the paths are opposite about their midpoint, a rotation by $\pi$ in the plane; “mirror-conjugate” needs its actual map and must not imply an orientation-reversing reflection without proof. The signed-sheet section calls $\Delta^{\sigma,m}$ a delay while defining a dimensionless angle; later $\Delta$ again means elapsed time. The self packet changes $\xi$ from a minimal angle to a full delay half-angle and $\sigma$ from orientation-sheet sign to sine-lobe sign. These conventions can be correct locally but need explicit transitions. The root-degree, cohomology, and Hessian passages need the mathematical objects they use, rather than treating a list of roots as an already constructed Morse complex. The standard effective-potential introduction also leaves “Therefore the usual angular-momentum barrier and the instantaneous effective potential” as an incomplete sentence.

**Smallest repair:** restore stable instrument discoverability and scope, remove stale conversation references, define the maps/domains at first use, and explain which topological constructions are established and which are proposed. **Grade:** measured source comparison and inferred teaching-standard defects. **Falsifier:** a current explicit definition or discoverable instrument link resolving a listed omission would remove that subitem.

#### Binary Dynamics verification, preserved results, and limits

The scoped validator first passes known math/link extraction, canonical display parsing, KaTeX, and viewer-ID alignment fixtures. It then accepts **760 mathematical expressions**, finds **171 displays and 171 viewer links**, and confirms **188 local-file link occurrences**. All 170 historical viewer IDs survive in order; one new ID is the conditional work-rate bound. Eleven surviving displayed formulas changed during the conversion, primarily the corrected standard comparison potential, the first-order history-space formulation, and the finite-width acceleration functional with its required $c_f$ factor. These are substantive improvements, not an equation-identical style conversion. All nine chapter links containing Markdown section fragments resolve against the current headings/explicit anchors. The raw source and the changed prose/math lines were read; no visual layout certification is claimed.

`node --test tests/circular-self-hit-binary-analysis.test.js` passes **7/7** tests, including the finite scan through $1<s<20$ of the counterfactual line of action. The unchanged analyzer's `ledgerAt(3.070356625390253)` returns one self root, three partner roots, outward-positive radial coefficient $-0.8196069638161786$, and tangential coefficient $6.509515149133449\times10^{-13}$. This reproduces the existing algebraic candidate and its direct chord checks; it is not a new independent dynamical acceptance result. Golden numerical rows remain reproduction evidence; separately authored closed forms and direct chord geometry provide the stated independent checks only in their documented scopes. No EOM evolution, finite-event continuation, or new MCB stability calculation was run.

The additional `.tmp/crw005-binary-review/check-mathematics.mjs` first passes known dot-product, identity-rotation, signed-window, and exact diameter-root fixtures. It then checks the rotation counterexample, missing label multiplicity, circle-weight discrepancy, full radial coefficient, hinge constants, straight-line self-hit, integrable-fold regularity, failed time rescaling, and small-defect nonperiodic flow. Those finite calculations use $c_f=1$ and leave the analyzer and its reference tests unchanged. Their outputs are retained in `mathematics.txt`, with test output in `tests.txt` and equation comparison in `validation.txt` in the same scratch directory. The durable finding explanations above contain the mathematical constructions, so scratch is not their only home.

Bounded source verification found the [Walther publisher search record](https://www.sciencedirect.com/science/article/pii/S0022039603002183) supporting the cited solution-manifold/smooth-semiflow role; the full publisher page was blocked. The Noether original-publication page and a primary Conley-index survey also returned access errors, so this pass does not certify their full texts. The defects above rely on the displayed equations and explicit counterexamples, not on inaccessible source text. No compulsory bibliography expansion is proposed.

**Disposition:** Entropy's 14 accepted integrations are complete. Binary Dynamics has 18 proposed findings; its source remains unchanged. Packet 1's 14 reviewed paths plus four Dynamics documents give **18 of 190 reviewed, 172 remaining** in the CRW-005 disposition inventory. These are assurance-review counts, not stability certificates or correction-completion counts. The next unread document is **Causal Action Functional**. The Foundations campaign and manuscript remain separately scoped. A changed target hash, failed counterexample, or resolving local definition would require re-adjudication of the corresponding finding.

**Final scoped checks:** `node scripts/validate-content.mjs --check --strict` completes with exit 0, zero errors, zero warnings, and 30 informational notes. The known-case-first review-record checker confirms BD-1 through BD-18 exactly once, nine high and nine medium findings, accepts 138 math expressions in the new Entropy receipt/Binary review, and verifies their local-file targets. Scoped `git diff --check` passes for Entropy and the three review owners. `cmp` confirms Binary Dynamics is byte-identical to the reviewed snapshot. `rg --files` filtered to Markdown measures 199 corpus files, nine Foundations files, and 14 Noether Braid files; together with the four explicitly recorded Dynamics reviews, this verifies the current 190-document denominator and 18 reviewed dispositions. These checks establish document structure, current source identity, and inventory scope; they do not certify the open physical theory.

### CRW-005 Binary Dynamics BD-1 through BD-18 — accepted integration, 2026-09-10

The operator authorized implementation of the preceding recommendations followed by the next document review. All **18 Binary Dynamics findings are accepted, implemented, and verified by self-review**. This acceptance concerns the document corrections, not completion of the physical MCB, action, singular-event, or mass derivations.

The integration makes the following changes in [Binary Dynamics](../../../content/markdown/aaa/dynamics/binary-dynamics.md):

| Finding | Implemented disposition |
| --- | --- |
| BD-1 | Requires pointwise radial and tangential circular acceleration balance, places absolute values before averaging the balance residual, and keeps independently constructed energy exchange separate. Defines both-member versus per-member power. |
| BD-2 | Restricts the finite-width local theorem to fixed smooth support masks with a positive separation floor, explicitly excluding a self interval near zero delay. No new canonical core or event law is asserted. |
| BD-3 | Separates continuous fixed-width histories from bounded-variation velocity limits, states position/velocity compatibility and candidate convergence topologies, and preserves the open limit/uniqueness obligation. |
| BD-4 | Replaces protected isolated-circle handedness with an oriented axial normal; gives the continuous rotation counterexample and identifies the additional physical framing needed for protection. |
| BD-5 | Enumerates full-delay roots, allows multiple roots in each signed window, assigns shared endpoints once, and separates physical births from representation changes. Corrects self-chart domains and emission-azimuth limits. |
| BD-6 | Makes the averaged Hessian diagnostic conditional on a proved relation to the full linearized history operator; removes its unsupported sign verdict. |
| BD-7 | Removes only proved neutral symmetry directions, avoids overlapping phase/rotation modes, and retains period variation as an auxiliary unknown rather than an automatic physical symmetry. |
| BD-8 | Separates Conley-index persistence, orbit identification, and attraction; requires the relevant trapping, compactness, and continuation arguments. |
| BD-9 | Classifies the residual tuple as numerical diagnostics; requires existence enclosures, nonlinear error bounds, complete excluded-root coverage, and stability bounds at the actual orbit. Defines nondimensional norms. |
| BD-10 | Adds the fold unfolding derivative, distinguishes memory/coincidence endpoints, qualifies degree persistence, and requires interior delay margins for the implicit-function argument. |
| BD-11 | Restores the opening partner Jacobian, qualifies signed denominators and restricted radial rows, and gives the full principal radial coefficient's monotonicity proof. |
| BD-12 | Defines the mechanical midpoint without primitive mass, proves its exact symmetry pinning, and keeps center-of-response and no-runaway conclusions conditional on actual assembly and charge bounds. |
| BD-13 | Corrects the angular cross-product sign; distinguishes kinematic angular increments, work one-forms, and escaped charges; states hinge continuity assumptions and longitudinal/transverse momentum factors. |
| BD-14 | Restores leading-separation and chasing-root hypotheses and identifies the memory wall as a necessary bound, with a counterexample to sufficiency. |
| BD-15 | Keeps the global curvature cap, universal standards, and isolated geometric selection as separate hypotheses beyond local attraction or integer root counts. |
| BD-16 | Restricts the straight-path no-self-hit result to uniform rectilinear motion and supplies the nonuniform prescribed-history counterexample. |
| BD-17 | Restores the nonunit constants in the hinge and Lorentz-factor asymptotic equivalents. |
| BD-18 | Restores the analyzer link and measurement scope; defines the opposed-path rotation, full versus reduced angles, and sign conventions; separates signed degree from an unconstructed Morse complex and completes the effective-potential introduction. |

The complete revised chapter was reread, followed by a reread of the final targeted corrections. `shasum -a 256` measures the resulting 2,287-line source as `1bc6f8a1b4b0cdef7682bbff04a54bf98fa590a7c8675a8f843b147cebd137b8`, against the reviewed pre-edit hash `afeae578058591cb6feba913d039c5b48df9bfd55beb250608ecb225962148a2`. The canonical residual tuple's identifiers and order are preserved. A targeted binding search found the existing numerical-recipe, analytic-baseline, and delay-energy consumers referring to that owner; this task did not rewrite those consumers or claim a full downstream audit.

The known-case-first scoped parser and vendored KaTeX check accept **762 mathematical expressions**, **171 displays with all 171 existing viewer IDs preserved in order**, and **189 local-file link occurrences**. Twenty-two displayed formulas changed deliberately. A separate heading/explicit-anchor check resolves all nine Markdown section-link occurrences; the old Morse heading anchor is retained explicitly. `node --test tests/circular-self-hit-binary-analysis.test.js` passes **7/7**. The unchanged review mathematics script passes its known cases and target calculations. The analyzer, its reference tests, and the mathematical comparison script were not edited with the subject. These checks preserve the measured circular candidates; they do not establish a periodic-history or stability certificate.

`node scripts/validate-content.mjs --check --strict` reports zero errors, zero warnings, and 30 informational notes. `node scripts/validate-equation-mapping-links.mjs` passes its scope of 23 registered links, not an exhaustive generated-viewer freshness check. Scoped `git diff --check` passes the Binary source. Disposable receipts are under `.tmp/crw005-binary-fixes/`; the table and mathematical findings above are the durable evidence. No generated files were rewritten and no Git publication was attempted. Expected equation-content drift remains for the authorized regeneration/publication procedure, using `node scripts/build-equation-mapping-corpus.mjs --write` and its corresponding check. A changed source hash, failed reference calculation, or unresolved accepted subitem would reopen the corresponding disposition.

### CRW-005 Packet 2 document 5 — Causal Action Functional assurance review, 2026-09-10

**Scope:** complete review-only reading of all 205 lines of [Causal Action Functional](../../../content/markdown/aaa/dynamics/causal-action-functional.md), the entire source diff against pre-campaign `897fe1aa7`, all ten displayed equations, and the relevant current Master Equation, Binary Dynamics, Energy, and Delay Dynamics Energy definitions. The textbook TOC traversal places this chapter after Binary Dynamics and before Effective Lagrangian. `shasum -a 256` measures the reviewed source as `6be6618db2cff3a15f45ce0df630bb4c4f3d72841e2e5e4a075c88a411b89a87`; the historical baseline is `2b8dd00b0082f01f8e7d1fb8bbc8badfd36d75b13de60376a0d5ea54995bb7ef`. The chapter remains unedited.

The distinction between the sign-blind scalar statistic and the vector acceleration law is useful and should survive the repair. The current transmitter weight, signed playback distinction, inverse-area units, and warning that extrema do not establish mass or stability are correct in their declared roles. The review finds **12 actionable issues: four high and eight medium**. All CAF-1 through CAF-12 are **○ Proposed**. An open physical mass or action derivation is not itself counted as a defect; the findings target unsupported implications, incomplete definitions, and concrete cross-file errors.

#### CAF-1 — High: the full circular count has the wrong leading coefficient

**Location:** lines 130–150. **Type:** mathematical error inherited from the baseline; the conversion added a proof paragraph and derived label without fixing it.

For the full equation $|\sin\xi|=\xi/\beta_f$, the first sine half-wave contributes at most one positive root and each later active half-wave can contribute two. Thus $N_{\mathrm{self}}=2\beta_f/\pi+O(1)$, not a bound with leading coefficient $1/\pi$ and an absolute additive constant. A direct lower bound already rules out the written theorem: every complete later half-wave whose midpoint lies below $\beta_f$ has negative root function at both ends and positive value at its midpoint, yielding two roots. The difference from $\beta_f/\pi$ therefore grows without bound. The current Master Equation supplies $N_{\mathrm{self}}\le2\beta_f/\pi+2$ and distinguishes the positive-sine subchart $N^{(+)}=\beta_f/\pi+O(1)$.

The unchanged analyzer, checked first against the exact diameter root at $\beta_f=\pi/2$, measures full counts **5, 63, 317** at speeds **10, 100, 500**, with positive-sine counts **3, 31, 159**. These finite evaluations support the separately derived lobe argument; they do not themselves prove the asymptotic theorem. “One sign” must mean the sine-lobe sign, not Binary Dynamics' reduced-angle orientation sign. The stated falsifier tests only linear growth and would miss the erroneous coefficient.

**Smallest repair:** propagate the full-chart factor two and an explicit valid endpoint constant, define the one-sign restriction, show the lobe count, and make the falsifier test the actual inequality. **Grade:** derived lobe-count proof, with measured analyzer checks. **Falsifier:** an omitted domain restriction to positive sine lobes would justify the smaller coefficient for that restricted count; it would not justify the displayed full count.

#### CAF-2 — High: instantaneous circular parameters do not determine the delayed chord of a changing history

**Location:** lines 123–150. **Type:** missing uniform-history hypothesis.

Writing $R(T)$ and $\omega(T)$ and assuming only bounded instantaneous $\beta_f(T)$ suggests a nonuniform history theorem. The equation used in the proof requires a fixed-radius circle with constant angular rate over the entire relevant lookback. For a nonuniform angle, the phase difference is $\int_{T_t}^{T_r}\omega(u)du$, not $\omega(T_r)(T_r-T_t)$; a changing radius additionally changes the chord formula.

A concrete prescribed-history check uses $c_f=R=1$ and $\theta(T)=(\pi/3)T^2$. Emission at zero and reception at one have chord $2\sin(\pi/6)=1$, exactly the delay. The instantaneous speed ratio at reception is $2\pi/3$, and substituting it into the uniform formula predicts chord $2\sin(\pi/3)=\sqrt3$. This is a geometric counterexample to the substitution, not a claimed EOM solution or a disproof of every possible nonuniform count bound.

**Smallest repair:** state a family of prescribed uniform circular histories, with a separate family parameter and positive speed magnitude. Restrict the count and $D_r=D_t$ conclusions to that family; leave general nonuniform root-count control separate. **Grade:** derived direct chord comparison and live Master Equation agreement. **Falsifier:** a proof using the actual varying-history chord, or an explicit uniform-history restriction, would resolve the relevant scope claim.

#### CAF-3 — High: the displayed scalar is not defined across the advertised caustic and regulator routes

**Location:** lines 39–54, 88–100, and 168–186. **Type:** missing existence/domain conditions for a nonnegative integral.

The distance replacement $r^2+\epsilon_c^2$ does not control $W^{\mathrm{acc}}=c_f/|D_t|$. The table mentions $\eta$ but the scalar formula contains no finite-width definition or event limit. At a simple-root chart the finite sum is meaningful with strict past delays, excluded zero-delay self coincidence, finite receiver/transmitter inventory, and appropriate separation/Jacobian floors. Those assumptions must precede its use as a finite statistic or barrier.

At a generic transverse fold the pair weight can scale as $|T-T_*|^{-1/2}$, which is locally integrable. That is not a blanket caustic result: the local family $g(x;T)=x^2-T^2$ has roots $x=\pm|T|$ and pair coarea weight $1/|T|$, whose integral diverges. A positive distance floor or positive $\epsilon_c$ does not cure it. A prescribed uniform circular record held exactly at a root tangency has $D_t=0$ throughout the reception window. The correct value is undefined or infinite until an actual regularization is given, not a finite branch comparison by declaration.

**Smallest repair:** define the finite simple-root domain first, the units and role of $\epsilon_c$, and either an explicit finite-$\eta$ functional/event prescription with convergence scope or exclusion of singular histories. Never infer finiteness from surface or distance smoothing alone. **Grade:** derived singularity examples; inferred missing regulator definition. **Falsifier:** a stated regulator and proven finite limit on the claimed path class would discharge the corresponding objection.

#### CAF-4 — High: a realized-trajectory work record is not a Noether pullback

**Location:** lines 194–205. **Type:** evidence-independence and conservation overclaim.

The certificate's “Noether pullback” accepts records from the same action **or realized trajectory** without distinguishing their grades. For any differentiable prescribed motion and chosen quadratic kinetic proxy, defining $U(T)=-\int\mu\mathbf A\cdot\mathbf V\,dT$ makes $K+U$ constant identically. For example, $V(T)=T$, $K=T^2/2$, and $U=-T^2/2$ satisfy it without a variational law or conserved physical energy. Momentum and angular momentum can likewise be canceled by their own negative increments. Common provenance does not make those reconstructions independent charges. Energy and the linked Delay Dynamics Energy chapter explicitly preserve this distinction.

**Smallest repair:** separate trajectory-local work diagnostics from action-derived or independently constructed wake charges, with boundary exchange and normalization stated. Reserve Noether terminology for a proved variational symmetry construction. Complete same-record tables alone do not establish action closure. **Grade:** derived identity counterexample and current-owner comparison. **Falsifier:** an independently derived compatible charge with the required symmetry/boundary proof would license the stronger claim.

#### CAF-5 — Medium: rounded intervals and box identity do not certify root existence or physical branch identity

**Location:** lines 88–100 and 201. **Type:** incomplete enclosure criterion and coordinate-dependent continuation rule.

“Root residual zero on the retained box” is ambiguous: a root equation is zero at a root, not throughout a nontrivial simple-root interval. Merely enclosing zero is insufficient. For $g(x)=x-x+1+0.1x$ on $[0,2]$, natural interval evaluation gives $[-1,3.2]$, while the exact range is $[1,1.2]$ and the derivative is $0.1$. Even a nonzero derivative bound plus this enclosure does not prove existence. Rounding an approximate value outward also does not account for input or truncation error unless those errors were already enclosed.

A tracked root can move from one overlapping box into another without a fold or physical change. Conversely, distinct roots can occupy one large box. Different boxes can certify the same history; identical box labels cannot substitute for validated overlap and root matching. This distinguishes physical identity from a convenient numerical representation.

**Smallest repair:** require root existence/uniqueness bounds, complete complement coverage, and validated overlap continuation; distinguish computational box replacement from physical ledger events. **Grade:** derived interval counterexample and inferred representation mismatch. **Falsifier:** an explicit enclosure/overlap contract providing those guarantees would resolve it.

#### CAF-6 — Medium: causal writhe lacks a counting convention and a stated invariance class

**Location:** lines 104–117. **Type:** incomplete mathematical definition.

The sum runs over ordered pairs of strands or segments, while the indicator is only zero or one. One strand pair can cross more than once; subdividing the strands can change how many positive indicators are summed. Counting both $(\alpha,\beta)$ and $(\beta,\alpha)$ doubles a symmetric crossing sign, whereas an antisymmetric sign cancels the pair. The text does not select either convention, exclude self-pairs, or define which projection/over-under data determine a signed event. A diagram crossing sum is also not automatically the geometric writhe in the framed $Lk=Wr+Tw$ relation.

**Smallest repair:** define a finite crossing-event set, count each event once with explicit projection/framing and sign rules, and state which deformations preserve the statistic. Keep linking events and diagram crossings distinct unless their conversion is derived. **Grade:** derived counting ambiguity and inferred incomplete topology scope. **Falsifier:** a subdivision-independent event definition resolving the ordered-pair ambiguity would make the statistic reproducible; a separate invariance proof would justify topological use.

#### CAF-7 — Medium: the barrier needs an admissible path class, common comparison conventions, and bounds over all paths

**Location:** lines 39–63 and 168–186. **Type:** incomplete minimax domain and transition-cost interpretation.

The formula gives a symmetric excess height above the **larger** endpoint value. A monotone scalar path from zero to ten has barrier zero despite its positive uphill change; it is not a directional activation cost. A single exhibited path gives an upper bound on the infimum, not a certified positive barrier. Two paths with maxima three and zero and endpoints zero show why the first path's height proves no lower bound.

The path topology, admissible histories, allowed event crossings, and convention for no admissible path are unspecified. Restricting paths to isolated fixed-root charts may disconnect endpoints; allowing arbitrary independent charts may admit nonphysical shortcuts. Comparisons also need a fixed cohort, history window, length units, and regulator prescription. The statistic scales as inverse length squared when lengths and $\epsilon_c$ are scaled together, and changing receiver count or the averaging window can change it without establishing a physical barrier. These are genuine normalization choices, not evidence of a universal cost.

**Smallest repair:** define the admissible continuous path class and shared comparison data, use the empty-infimum convention explicitly, call the formula excess saddle height, and distinguish an upper bound from a proved global lower bound. Explain that its units remain inverse area. **Grade:** derived minimax counterexamples and scaling; inferred missing domain. **Falsifier:** a declared admissible class and exhaustive lower-bound argument could establish a positive barrier in that class, but would not by itself identify physical transition energy.

#### CAF-8 — Medium: the scalar forgets branch information and has no necessary stationarity condition for physical solutions

**Location:** lines 58–73, 196, and 205. **Type:** summary overstatement and unproved selection condition.

The last paragraph says the functional “preserves causal-root topology, branch labels, caustic routing.” Those data remain in its argument $\mathfrak B$; they cannot in general be recovered from one sign-blind sum. Distinct lists of positive weights can have the same sum, and orientation and polarity have been explicitly discarded. The correct object preserving provenance is the pair of the retained record and its scalar value.

Likewise the vector law does not imply stationarity of this chosen statistic. Multiplying, changing, or substituting a diagnostic scalar does not change an already specified acceleration law. A stationarity row can be a declared search criterion but cannot be required of every physical branch unless a variational equivalence is proved. Finite discrete comparisons prove only what was compared, not a first-variation identity.

**Smallest repair:** attribute topology retention to the full record and make scalar stationarity an optional search hypothesis with its own variation space and constraint set. Preserve vector EOM and actual stability tests as independent requirements. **Grade:** derived information-loss statement; inferred missing variational implication. **Falsifier:** an injective reconstruction theorem or an actual equivalence between EOM solutions and constrained scalar extrema would license the respective stronger claim.

#### CAF-9 — Medium: mass-response and action terminology need their level and units stated in place

**Location:** lines 3–9, 35, 54–63, 121, and 205. **Type:** terminology underspecification, not evidence of a primitive mass term.

No mass parameter appears in the scalar, and the chapter correctly says that its extrema do not establish mass. Nevertheless repeated unqualified “mass-response tests” leave the response channel undefined. The current Energy chapter places mass only at the effective assembly/observer level and keeps its quantitative map open. This inverse-area statistic is neither a physical inertial coefficient nor an energy-equivalent, passive-gravitational, or active-gravitational mass. Nothing here identifies those channels with one another. “Exact Fokker-type variational action” also outruns the current Master's explicitly candidate action and documented variation obstruction.

**Smallest repair:** say candidate effective assembly response, name the inertial or gravitational channel only when a defined probe actually selects it, state that no mass map is derived, and link to Energy's current distinctions. Describe the present object as a scalar branch statistic and the Fokker functional as a candidate variational scaffold. A title change is optional; the in-place claim and units corrections are substantive. **Grade:** measured formula/terminology comparison and inferred ambiguity. **Falsifier:** an explicit response experiment and derivation mapping this scalar to a specified assembly coefficient would resolve the missing link; it would not assign mass to individual architrinos.

#### CAF-10 — Medium: the displayed vector factor is a normalized kernel, not the complete acceleration or an action integrand

**Location:** lines 65–73. **Type:** omitted coupling/sign scope and conflated consumer roles.

The row $W^{\mathrm{acc}}\hat{\mathbf r}/r^2$ has inverse-area units and points along the outward chord. The complete per-hit acceleration is $\kappa\sigma_{ij}|q_iq_j|$ times that row, with the sum over retained hits; unlike-polarity contributions reverse the direction. The preceding scalar deliberately strips those factors, but the “exact vector acceleration/action consumer” sentence does not restore or qualify them. Nor does a variational action generally use its Euler derivative as its own integrand: the Master candidate uses a causal $1/r$ scaffold and has an unresolved variation obstruction.

**Smallest repair:** call the displayed row the normalized directional acceleration kernel, explicitly restore polarity/coupling in the vector consumer, and describe the action requirement as an Euler-derivative target. **Grade:** derived dimensions/sign comparison and current Master Equation definition. **Falsifier:** an explicit normalization convention and a separately proved variational map would resolve the respective ambiguities.

#### CAF-11 — Medium: the root-event account repeats the generic-fold-only error

**Location:** lines 100 and 148–150. **Type:** missing event distinctions.

Interior circular pair births have $J=0$ and the usual nonzero second root derivative and unfolding derivative. The principal self onset at speed one is instead the excluded zero-delay coincident endpoint. A finite memory boundary can change a retained count with nonzero $J$, and changing a signed representation can leave the count unchanged: the principal self root at $s=\pi/2$ has full delay angle $\pi$ and $J=1$. Binary Dynamics now makes these distinctions explicit. Treating all births, null thresholds, and inactive-gap changes as one interchangeable ledger hides which continuation theorem applies.

**Smallest repair:** classify interior folds, the principal coincident endpoint, memory entry/exit, and harmless chart changes separately; use the generic pair rule only with its hypotheses. **Grade:** derived circular endpoint calculations and live Binary comparison. **Falsifier:** explicit event restrictions matching the formulas would resolve the overgeneralization.

#### CAF-12 — Medium: two section links fail and internal certification language obscures the reader explanation

**Location:** lines 3, 39, 54, 88–100, and 152–201. **Type:** measured navigation failure and editorial repair.

The scoped Markdown fragment check flags `../foundations/architrino.md#the-emitted-wake` and `master-equation.md#exact-causal-delay-fokker-type-interaction-term`; direct heading and explicit-anchor inspection confirms neither current target exists. The first was added during the conversion; the second was already present in the baseline. Use a verified current wake section and the candidate-action section. “Native-time” should mean absolute time here; the negative-control row's “Not advanced disposition” is internal workflow language. The long certificate tables repeatedly refer to boxes, routing, emitted records, and acceptance without first explaining the physical/mathematical content or identifying the missing proofs.

**Smallest repair:** fix both section links and time terminology, define essential mathematical concepts in place, and replace internal status language with a direct reader-facing account of what each check establishes. Do not delete mathematical assumptions or provenance needed to assess a measured claim. **Grade:** measured source/anchor comparison and inferred academic-style defects. **Falsifier:** live matching target anchors or a resolving local definition would remove the corresponding finding.

#### Causal Action Functional verification, attribution, and disposition

The known-case-first scoped validator accepts **70 mathematical expressions**, finds **10 displays and 10 preserved viewer IDs**, and checks **19 local-file link occurrences**. Against `897fe1aa7`, only the statistic's displayed integration window/differential changed: the current $[T_0,T_1]$ window and $dT_r$ correct and clarify the older formula. This is a valid substantive clarification, not exact equation preservation. The entire textual diff was read. Most mathematical defects were already present in the baseline; the conversion added an explicit proof/grade for the count claim, the new broken wake link, and the stronger final “preserves” wording. This attribution follows the inspected source diff, not commit subjects or last-editor identity. Two of eight Markdown-fragment occurrences fail as specified in CAF-12; generated HTML equation-viewer entries were not regenerated or exhaustively checked.

The new `.tmp/crw005-causal-review/check-mathematics.mjs` passes known interval-arithmetic, minimax, and exact diameter-root fixtures before target calculations. It then checks the complete versus one-sign counts with the unchanged analyzer, the nonuniform circle chord, zero-containing interval without a root, tangential fold divergence, excess-height examples, arbitrary-motion work reconstruction, and inverse-area scaling. An initial hand-written expected interval was corrected after its assertion failed; the interval arithmetic itself matched the known fixtures, and the final target run passes with $[-1,3.2]$ versus exact range $[1,1.2]$. The record uses the corrected calculation only. The derived arguments above are the durable evidence; scratch holds executable checks and outputs. All numerical examples use $c_f=1$; none is claimed as a new free EOM solution, action construction, mass mapping, or stability result. The chapter cites only repository pages; no new external literature premise was required for these elementary derivations and local comparisons.

**Disposition:** all 18 accepted Binary corrections are complete. Causal Action Functional has 12 proposed findings and remains byte-identical to its reviewed snapshot. `rg --files` filtered to Markdown measures 199 corpus documents, nine Foundations documents, and 14 Noether Braid documents; the 14 Packet 1 reviews plus five explicitly recorded Dynamics reviews give **19 of 190 reviewed, 171 remaining**. These are review dispositions, not correction-completion or physical-closure counts. The next unread document is **Effective Lagrangian**, which has not been reviewed in this turn. A changed target hash, failed counterexample, or resolving definition would reopen the affected proposed finding. The Foundations campaign, manuscript, generated outputs, analyzer, and its reference tests remain outside this task's edits.

**Final scoped checks:** the known-case-first record checker finds CAF-1 through CAF-12 exactly once, four high and eight medium, accepts 58 mathematical expressions in the new Binary receipt/Causal review, and resolves their local-file targets. After the final Binary endpoint correction, the scoped source validator accepts 762 math expressions and records 22 deliberately changed displays with all 171 IDs preserved. `cmp` confirms the Causal source remains byte-identical to its reviewed snapshot. Scoped `git diff --check` passes the Binary source and three review owners. A final strict content check reports zero errors, zero warnings, and 30 informational notes; the registered equation-link check again passes its 23-link scope. These structural checks do not clear the two Causal section-link findings or its mathematical recommendations, and do not establish the missing theory proofs.

### CRW-005 Causal Action Functional CAF-1 through CAF-12 — accepted integration, 2026-09-10

The operator selected implementation of all 12 recommendations followed by review of Effective Lagrangian. All **CAF-1 through CAF-12 are accepted, implemented, and verified by full-document self-review** in [Causal Action Functional](../../../content/markdown/aaa/dynamics/causal-action-functional.md). The action, mass, singular-extension, and stability derivations remain open; acceptance concerns the repairs to their definitions and claim boundaries.

| Finding | Disposition and change |
| --- | --- |
| CAF-1 | ✓ Done: restores the full count's factor two, supplies an explicit upper constant and matching half-wave lower argument, and distinguishes positive-sine from reduced-angle signs. |
| CAF-2 | ✓ Done: restricts the theorem to complete prescribed uniform circular histories, separates the family parameter from reception time, and includes the nonuniform chord counterexample. |
| CAF-3 | ✓ Done: defines a finite regular-root domain, excludes self coincidence and endpoint roots, proves a simple finite bound, and separates the distance comparison length from an unconstructed singular extension. |
| CAF-4 | ✓ Done: separates reconstructed work from independently derived conservation and Noether charges. |
| CAF-5 | ✓ Done: explains existence/uniqueness enclosures, complement coverage, input/truncation/rounding errors, and root matching across overlapping boxes. |
| CAF-6 | ✓ Done: defines a projected crossing-event sum with explicit realization, orientation, over/under data, selection rule, and one count per event; no geometric-writhe or arbitrary-deformation invariant is claimed. |
| CAF-7 | ✓ Done: specifies a continuous path class in a declared regular history space, common comparison conventions, the empty-infimum meaning, excess-height interpretation, and upper-versus-lower-bound distinction. |
| CAF-8 | ✓ Done: attributes retained information to the full record and treats scalar stationarity as an optional search hypothesis. |
| CAF-9 | ✓ Done: states inverse-area units and candidate assembly-response scope; no primitive mass or quantitative mass map is inferred; the linked action is explicitly a candidate scaffold. |
| CAF-10 | ✓ Done: identifies the normalized acceleration kernel and restores coupling and polarity in the complete per-hit law; variation of an action remains a separate target. |
| CAF-11 | ✓ Done: distinguishes generic interior folds, coincident onset, finite-memory boundary events, and harmless representation changes, including the regular diameter crossing. |
| CAF-12 | ✓ Done: repairs both broken section links, uses absolute time, and replaces internal acceptance tables with reader-facing explanations of definitions and evidence. |

The integration additionally clarifies that $D_t\ne0$ on smooth interior history supplies the implicit-function theorem, while recording $D_r$ verifies the playback derivative; missing a stored receiver factor does not invalidate the mathematical continuation theorem. It also distinguishes the circular family's known continuation at a tangency from evaluating the undefined quotient $0/0$. These are bounded consistency repairs found during the complete reread, not a new theory mechanism.

`shasum -a 256` measures the revised 193-line source as `7e585c26bd6702dcb01efbf329431ae17295d3293d19d373816c7c28657d62dd`, from pre-edit `6be6618db2cff3a15f45ce0df630bb4c4f3d72841e2e5e4a075c88a411b89a87`. The known-case-first scoped parser and vendored KaTeX check accept **108 math expressions**, **10 displays**, and **all ten existing viewer IDs in order**, with **three deliberately changed displays**: crossing sum, speed definition, and root-count bound. All **21 local-file occurrences** exist and the separate fragment checker resolves all ten Markdown section-link occurrences. The unchanged review mathematics script passes its known fixtures and its root counts, chord, interval, fold, minimax, work-identity, and scaling cases. The circular analyzer and comparison instruments were not modified with the source. The new lobe argument and finite-domain bound are explicit derivations; reference reproduction does not establish a physical action or dynamics.

A scoped binding search identified the `mass-action.energy-ledger` impact-contract path trigger and a constraint-ledger consumer. Existing viewer IDs and chapter section anchors remain available. Effective Lagrangian's incompatible singular-barrier use is recorded in EL-14 below rather than silently modified during its review. This is not an exhaustive downstream audit. `node scripts/validate-content.mjs --check --strict` reports zero errors, zero warnings, and 30 informational notes; `node scripts/validate-equation-mapping-links.mjs` passes its 23 registered-link scope. Disposable receipts are under `.tmp/crw005-causal-fixes/`. Generated equation content remains for the existing regeneration/publication procedure; no generated files or Git publication were included. A source-hash change, failed derivation, or unresolved accepted subitem would reopen the corresponding disposition.

### CRW-005 Packet 2 document 6 — Effective Lagrangian assurance review, 2026-09-10

**Scope:** full review-only reading of all 1,163 lines of [Effective Lagrangian](../../../content/markdown/aaa/dynamics/effective-lagrangian.md), all 79 displayed equations, the entire diff against pre-campaign `897fe1aa7`, and the relevant current Master Equation, Energy, Binary Dynamics, Causal Action Functional, and assembly-topological-charge definitions. The current source hash by `shasum -a 256` is `9d974db22027ba28beeadcaca9ed1d01b9a00b345434f33a0da690bf33336aed`; the historical baseline hash is `6a474cf83e5d93c556c580b16f89545661268cca2d0a998d09244ac6ea4d11aa`. The chapter is unedited. The TOC traversal places it last in Dynamics.

The standard oscillator, Legendre transform, phase-space action, receiver-gradient formula, and characteristic-integral identity are useful within their stated mathematical roles. The conversion correctly removed a spurious kinetic coefficient from the acceleration law, distinguished kinetic energy from kinetic Lagrangian, and weakened several mass-gap and spin claims. Those improvements are preserved by the review. The established $c_1$ notation is treated as phase-return degree data, as its current owner specifies; no unsupported blanket rename is recommended.

The review finds **16 actionable issues: seven high and nine medium**. All EL-1 through EL-16 are **○ Proposed**. Explicitly open research targets are not defects merely because they remain open; the findings concern erroneous formulas, missing definitions, or conclusions stronger than the supplied arguments.

#### EL-1 — High: the variation residual compares against the desired scale law rather than the complete Euler derivative

**Location:** lines 235–289, 314–415, and 1155–1157. **Type:** incomplete variational test with a false-positive route.

The displayed $R_{A,i}=A_i-\sum_j\kappa\sigma_{ij}|q_iq_j|A_{ij,\mathrm{scale}}$ omits precisely the constraint-derivative contribution the chapter is meant to test. A canonical EOM trajectory makes that difference vanish in the regular sharp limit even if the candidate action still has a nonzero derivative residual. The current Master Equation's energy-residual definition instead uses $R_A=A-A_{\mathrm{act}}$, with the action side including every surviving contribution. On-shell agreement with the desired EOM is not an off-shell variational identity.

There is also a second event role. Varying $X_i(T)$ affects kernels in which it is the receiver **and** kernels in which it is an earlier transmitter to a later receiver. A triangular integration domain does not remove the latter. The elementary discrete action $S=q_1q_0+q_2q_1$ has $\partial S/\partial q_1=q_0+q_2$, not only $q_0$. In the continuous ordered-pair action, collecting the full variation gives both a past-receiver integral and a future-receiver integral, each with the displayed one-half coefficient. Neither the future term nor its normalization becomes a boundary term merely because the receiver constraint derivative is canceled.

**Smallest repair:** define the full Euler derivative with receiver, transmitter, admitted self, cutoff, and boundary contributions; keep the scale-only row as an EOM diagnostic. Require a functional identity on the admitted variation class and a causal treatment of any future dependence before claiming a generator. **Grade:** derived product-rule counterexample and current-owner residual comparison. **Falsifier:** an explicit complete variation showing the missing terms cancel or reduce to valid boundaries under stated hypotheses would close the obstruction for that action class.

#### EL-2 — High: the conservation residuals retain an undefined symbol and lose the kinetic coefficient

**Location:** lines 129, 382–411, 573–647. **Type:** incomplete propagation of the acceleration-first conversion.

The chapter now defines $R_{A,i}^{(\eta)}$ with acceleration units, but the energy, momentum, and angular-momentum tests still contain undefined $R_i^{(\eta)}$. Reading that as the new acceleration residual makes all three numerators dimensionally inconsistent. The quadratic energy defect is $\sum_i\mu_{\mathrm{arch}}V_i\cdot R_{A,i}$, the momentum defect is $\sum_i\mu_{\mathrm{arch}}R_{A,i}$, and the angular defect is $\sum_i\mu_{\mathrm{arch}}X_i\times R_{A,i}$. The current Master Equation explicitly retains the coefficient in its energy balance. The old baseline defined a weighted residual, so the source diff identifies the conversion that left these consumers unresolved; this attribution is based on the actual formulas, not last touch.

**Smallest repair:** use the complete acceleration residual from EL-1 consistently and restore the kinetic coefficient in each charge equation. Define separate normalization floors with the units of their denominators; one bare $\varepsilon$ cannot literally have acceleration-impulse, energy, momentum, and angular-momentum units at once. General kinetic charts require their actual momentum derivative, not automatic scalar substitution. **Grade:** derived dimension/work identity and measured baseline comparison. **Falsifier:** an explicit definition of a weighted residual and compatible units would resolve the mismatch; none is supplied at these uses.

#### EL-3 — High: resonance locking is not necessary for a global Hamiltonian chart

**Location:** lines 171–232 and 873–945. **Type:** false implication from quasiperiodicity to monodromy, leakage, or loss of Hamiltonian validity.

On the global phase space $T^*\mathbb T^2$, take the mathematical comparison Hamiltonian $H=I_1+\sqrt2 I_2$. Its flow is $\theta_1(T)=\theta_1(0)+T$, $\theta_2(T)=\theta_2(0)+\sqrt2T$, with both actions constant. It has no common nonzero period, but preserves the globally defined symplectic form $d\theta_1\wedge dI_1+d\theta_2\wedge dI_2$ and its volume exactly. Its action variables acquire no monodromy. Temporal phase drift and monodromy of an action bundle over a parameter loop are different objects.

Thus the assertions that global Hamiltonian validity occurs only on resonance-locked branches and that off-lock branches necessarily leak symplectic content do not follow from Hamiltonian geometry. A special delayed branch may require a stronger retention condition, but that must be derived for its actual dynamics. Slow external parameters can also produce a time-dependent Hamiltonian without destroying symplecticity, while energy need not remain constant.

**Smallest repair:** retain phase-locked histories as a useful restricted search domain; distinguish periodic, quasiperiodic, globally canonical, and closed-energy properties. Remove universal off-lock leakage/monodromy claims until a branch-specific theorem proves them. **Grade:** derived explicit canonical-flow counterexample. **Falsifier:** an additional physical restriction excluding the counterexample class and proving necessity for the admitted delayed reduction would license that narrower result.

#### EL-4 — High: single-valued classical angles do not force action quantization

**Location:** lines 183–232 and 951–971. **Type:** missing quantum recovery premise.

A canonical cylinder with $\theta\in S^1$, $I\in\mathbb R$, and $H=I$ has globally single-valued $e^{i\theta}$, a periodic angle, and arbitrary real action $\oint I\,d\theta=2\pi I$. With comparison units $\hbar_{\mathrm{eff}}=1$ and $I=1/2$, the integral is $\pi$, not an allowed multiple of $2\pi$ under the displayed condition. Phase return therefore supplies an integer winding but does not discretize the conjugate action. To obtain the latter from single-valuedness, one needs an independently justified transported amplitude with phase $\exp(i\oint\Pi dQ/\hbar_{\mathrm{eff}})$ and its boundary/holonomy rule; that identification is missing.

The early guessed flat-bundle block does not repair the later affirmative “positive selection rule” and “Thus quantization” conclusion. Even the action-cycle and frequency formulas require the declared integrable/action-angle setting and a specified cycle basis; phase locking alone does not create independent canonical pairs for every subassembly.

**Smallest repair:** keep the integer action condition and observable algebra as recovery hypotheses, distinguish phase winding from action holonomy, and state the missing amplitude/scale derivation. Preserve the canonical $c_1$ phase-degree notation without treating it as an action quantum. **Grade:** derived canonical-cylinder counterexample. **Falsifier:** a derived transport law and scale enforcing the proposed amplitude single-valuedness would provide the missing implication within its stated domain.

#### EL-5 — High: signed polarity density and current are not mechanical kinetic moments

**Location:** lines 653–765. **Type:** invalid moment identification and neutral-medium singularity.

The ratio $u=j_q/\rho_q$ is a signed-current ratio. It is not generally the barycentric velocity of the constituents, even where $\rho_q\ne0$. For two populations with polarity signs $+1,-1$, densities $1.1,1$, and velocities $+1,-1$, the ratio is $2.1/0.1=21$, outside the constituent velocity interval. In an exactly neutral co-moving population with unit positive and negative densities and both velocities two, $\rho_q=j_q=0$, while a unit quadratic bookkeeping coefficient gives mechanical momentum four and kinetic energy four. This directly affects the Noether sea, whose neutral state is central to the proposed application.

The equation for $\partial_T(\rho_q u^i)=\partial_Tj_q^i$ is a polarity-weighted current moment, not a mechanical momentum balance without a derived weighting map. Likewise $f_q\cdot u$ is not automatically delivered mechanical power, especially with velocity dispersion and different responses of the two polarities. Naming an energy density $e_q$ does not define its weights.

**Smallest repair:** keep polarity continuity separate from number/species, mechanical-momentum, stress, and energy moments, defining each from the chosen kinetic chart and distribution. Use the signed-current ratio only on its stated nonneutral domain and do not make it the neutral medium's material velocity. **Grade:** derived two-population counterexamples. **Falsifier:** restrictive single-stream/single-polarity hypotheses or a separately proved response map would justify a narrower identification; neither supplies neutral-sea mechanics as written.

#### EL-6 — High: the polarity-wall circulation mixes action and phase units and does not define a nontrivial double cover

**Location:** lines 1030–1059 and 1095–1102. **Type:** dimensional error and unsupported topological carrier.

The later envelope convention $\psi=\sqrt\rho\exp(iS_{\mathrm{env}}/\hbar_{\mathrm{eff}})$ gives $S_{\mathrm{env}}$ action units. The earlier circulation $\oint\nabla S_{\mathrm{env}}\cdot d\ell=\pi N_{\mathrm{wall}}\pmod{2\pi}$ equates an action with a dimensionless phase. It requires division by $\hbar_{\mathrm{eff}}$ or an explicitly different phase variable.

A single-valued continuous real density also does not automatically carry the proposed odd holonomy. Along a closed loop with finitely many transverse zero crossings, every sign change must be undone before returning to the initial point, so the number of crossings is even. A loop that avoids the zero set stays in a constant-sign component. “Enclosed domain-wall intersections” is not a defined intersection number for a loop and a surface. A nontrivial sign bundle requires extra configuration-space and transition-function structure, not simply the pointwise map $\rho_q\mapsto\operatorname{sign}\rho_q$. A zero level set is not by itself a physically stable domain wall.

**Smallest repair:** correct the phase units and define the actual base space, loop, cover, and transition rule before assigning wall-parity holonomy. Keep the spin/exchange interpretation guessed and remove any implication that ordinary signed-density zero sets already construct it. **Grade:** derived dimensions and sign-continuity argument. **Falsifier:** a well-defined additional bundle structure yielding odd exchange holonomy would change the topological model; it must be derived from the retained histories.

#### EL-7 — High: the envelope residual lacks a common physical map and can miss density mismatch entirely

**Location:** lines 1021–1145. **Type:** incompatible quantities and incomplete closure test.

$\rho_q$ has polarity-density units, while the nonnegative envelope is introduced for a fixed-particle-number benchmark. No conversion or projection operator is inserted before subtracting $j_q-j_{\mathrm{env}}$ and $\rho_q-\rho_{\mathrm{env}}$. The reader cannot tell whether these are comparable quantities, or which polarity/number normalization is used. A nonlinear projection of a signed density does not generally transform its current by the identity.

Even if common units are imposed, the final $\mathcal R_{\mathrm{env}}$ omits the density mismatch that the preceding prose says must be controlled. Take spatially and temporally constant normalized densities $\rho_q=2$, $\rho_{\mathrm{env}}=1$, zero currents, constant $S_{\mathrm{env}}$, and $V_{\mathrm{eff}}=0$. Every displayed continuity, Hamilton-Jacobi, and memory-current residual vanishes, while the density difference is one. The constant wavefunction is a valid comparison solution, but it does not establish the claimed mapping from the supplied density. Near nodes, $Q_{\mathrm{env}}$ additionally needs a positive-density domain or a separate weak formulation.

**Smallest repair:** define the physical projection and units first, derive its density/current identities, and include the actual density/normalization and boundary mismatches in the acceptance scope. State node regularity and distinguish approximate residuals from a proved reduction. **Grade:** derived zero-residual counterexample and dimensional comparison. **Falsifier:** an explicit projection fixing density equality by construction, with compatible current and boundary transport, would discharge the corresponding missing test.

#### EL-8 — Medium: the action's history domain and variation boundaries are not completely specified

**Location:** lines 235–289, 354–381, and 465–469. **Type:** incomplete functional domain and limiting hypotheses.

The action integrates emissions from $-\infty$, while EL1 defines histories only on $[T_a,T_b]$. Fixed endpoint variations of positions do not specify variations of the earlier history or the later receiver terms exposed by EL-1. The admissible self sum may be selected by history-dependent roots or cutoffs; then its variation can have boundary contributions not shown in the kernel gradient. A finite time window is covariant when translated with the history, but not invariant under translating only the path while holding the window fixed.

The simple-root delta limit is valid locally with its full integrability and separation assumptions; it does not assert uniform convergence over a varying history family or justify taking a derivative through an uncontrolled singular limit. These distinctions are only partly stated.

**Smallest repair:** choose one complete integration/history domain, freeze or vary the prehistory and endpoints explicitly, specify fixed-support versus state-dependent exclusions, and retain every resulting boundary term. State the topology and domination/uniform bounds for each limit actually used. **Grade:** inferred missing functional definitions, with the explicit mismatch of domains as measured evidence. **Falsifier:** a complete admissible variation class and boundary calculation would resolve the gap.

#### EL-9 — Medium: the displayed wake-energy expression has not been derived as a Noether charge

**Location:** lines 531–558 and 593–647. **Type:** an unproved boundary formula given stronger status than its owner.

The current Master Equation calls the same double integral a candidate in-flight interaction term, not yet a canonical energy charge. Effective Lagrangian says the action-level Noether charge “can be written” in this form. If $\partial_{T_1}$ is the total derivative of the composite kernel and the upper boundary decays, the proposed expression reduces to $\tfrac12\sum_{ij}\int_{-\infty}^{T}\mathcal K^E_{ij}(T,T_t)dT_t$. A static sign check does not prove that this quantity completes the energy of a general nonlocal action. If a partial derivative holding some path data fixed is intended, that different operator must be defined.

A fixed-delay mathematical comparison makes the missing theorem concrete. For $S=\int[\dot q^2/2-gq(T)q(T-1)/2]dT$, the full Euler equation is $\ddot q=-g[q(T-1)+q(T+1)]/2$. Set $g=-1/\cosh1$ and $q=e^T$. This solves the equation, but the analogous proposed energy $\dot q^2/2+gq(T)q(T-1)/2$ has derivative $e^{2T}\tanh1\ne0$. This counterexample rejects the generic boundary-form inference, not the specific geometric kernel by itself.

**Smallest repair:** retain the displayed expression as a candidate with a defined derivative operator and derive its complete time-translation identity before naming it a charge. Symmetry preservation alone does not validate an arbitrary candidate expression. **Grade:** derived boundary reduction and comparison counterexample; inferred missing geometric-kernel proof. **Falsifier:** a full boundary-variation calculation yielding this expression and its conservation on the admitted solutions would establish it.

#### EL-10 — Medium: coarse-graining a quadratic interaction requires two-point correlations

**Location:** lines 653–699. **Type:** missing closure assumption in the Eulerian density product.

An exact microscopic density can rewrite an admissible pair sum, subject to self-exclusion and delta conventions. Replacing it by a smoothed density is another step: averaging a two-time density product gives a product of means plus a two-point correlation, not just the displayed product of coarse means. Two zero-mean variables with values $+1,-1$ can have product mean $+1$ when correlated or $-1$ when anticorrelated, despite identical one-point means. Neutral coarse density therefore does not imply zero pair interaction. The guessed transmitter-compression paragraph acknowledges one inheritance problem but not this distinct loss of pair data.

**Smallest repair:** distinguish exact microscopic rewrite from coarse closure, retain the correlation/self-exclusion term, or explicitly state and test the factorization regime. Do not add an extra transmitter Jacobian to compensate for missing correlation: those are separate operations. **Grade:** derived averaging identity and finite counterexample. **Falsifier:** a controlled limit proving the relevant connected correlation negligible would justify the factorized action in that regime.

#### EL-11 — Medium: time-frequency parity does not determine tensor antisymmetry or universal transport ratios

**Location:** lines 701–715 and 767–807. **Type:** unsupported constitutive inference.

Odd frequency dependence concerns reversal of frequency; antisymmetric stress concerns exchange of spatial indices. They are independent. The comparison response $\widetilde K^{ij}(\omega)=e^{i\omega\tau}\delta^{ij}$ has a nonzero odd imaginary part for $\tau>0$ and an identically zero antisymmetric spatial part. Delayed failure of pairwise mechanical cancellation can be represented by a source or wake exchange without forcing a particular antisymmetric mechanical stress.

The formula $\operatorname{Im}\widetilde K/\omega$ also needs a Fourier-sign convention, an identified input/output pair (for example stress versus strain rather than strain rate), and finite response moments. Causality alone does not guarantee a Taylor expansion at zero frequency. Even coefficients include static stiffness as well as possible inertia corrections. Certification of a kernel/window does not by itself make coefficient ratios invariant under changes of state or units.

**Smallest repair:** derive spatial tensor sectors separately from frequency moments, define the response convention and moment assumptions, and restrict ratio claims to what the actual kernel and comparison transformation establish. **Grade:** derived tensor counterexample and inferred missing constitutive premises. **Falsifier:** a branch-derived response law connecting these sectors with the required symmetries and regularity would license its specific relation.

#### EL-12 — Medium: the dissipation residual can count the same transferred energy twice

**Location:** lines 809–837. **Type:** ambiguous energy partition and missing flux terms.

The residual adds both integrated positive viscous conversion $D$ and $\Delta E_{\mathrm{wake}}$, while the prose requires that converted content appear in the wake, heat, or medium account. If one unit leaves coherent kinetic energy and enters the wake account, then $\Delta K=-1$ and $\Delta E_{\mathrm{wake}}=+1$ already conserve total energy. Adding $D=1$ reports a false residual of one. A separate disjoint wake term could make the formula valid, but that exclusion is not defined. Boundary work, transport, reversible internal-energy exchange, and the memory-stress power likewise need the account appropriate to the chosen window. Negative viscosity-like coefficients would also make the current denominator unsuitable as a nonnegative normalizer.

**Smallest repair:** define a nonoverlapping energy partition and signed finite-window balance, include the relevant boundary terms, and state positivity assumptions or use a norm-based denominator. **Grade:** derived one-unit bookkeeping counterexample. **Falsifier:** explicit disjoint account definitions and a derived balance containing each transfer once would resolve it.

#### EL-13 — Medium: a preserved memory two-form is not yet a reduced symplectic structure

**Location:** lines 873–945. **Type:** missing descent, closedness, nondegeneracy, and flux definition.

An induced effective flow is not automatic: histories with the same coarse coordinates must have the same coarse future, or a controlled approximation to it. The proposed history two-form must also descend through the coarse-graining, meaning it gives the same reduced bilinear value regardless of the unresolved representative and annihilates discarded directions. Closedness and nondegeneracy must be proved. Preservation alone is insufficient: the zero two-form is preserved by every flow, and the identity preserves even a nonclosed form.

The vector wedge $\delta X\wedge\delta V$ needs its index contraction or tensor kernel, units, and pullback to the reduced tangent space. The claimed equivalence to a boundary flux is not derived. Integrating an unspecified two-form around a one-dimensional return loop is not a scalar integral without an explicit contraction or a form-valued time-integration convention. “Zero-Floquet neutral directions” should distinguish zero exponents from unit multipliers. None of these definitions follows from periodic replay alone.

**Smallest repair:** state the reduced-flow closure condition and candidate form's precise domain, prove descent/closedness/nondegeneracy, and define a correctly typed boundary identity before using its residual as a Hamiltonian test. **Grade:** derived mathematical nonimplications and inferred missing definitions. **Falsifier:** a constructed reduced flow and symplectic form satisfying these properties would resolve the issue; small preservation error for an undefined form would not.

#### EL-14 — Medium: the fold-crossing barrier lies outside the scalar's defined regular domain

**Location:** lines 974–1015. **Type:** incompatible chart floors and barrier interpretation.

A root birth at a fold has $D_t=0$ and cannot occur under one strictly positive sharp-root Jacobian floor. The newly corrected Causal Action Functional defines $B_{\mathrm{rec}}$ on a declared regular history space and supplies no finite-$\eta$ singular extension. A continuous path in that space cannot connect different root-count sectors through a fold; an empty connecting path class gives $+\infty$ by definition. This is a domain exclusion, not evidence of a finite physical barrier. Writing endpoints at finite regulator and taking a positive liminf does not define the missing interpolating functional or event rule.

The quantity is an excess minimax height above the larger endpoint, not the minimum raw scalar value. Phase-lock and frame-degeneracy walls are also not necessarily the same codimension-one root fold. Loss of a chosen phase chart need not change a physical invariant.

**Smallest repair:** inherit the current regular-domain and excess-height definitions; keep a cross-sector gap as an unconstructed extension requiring its own finite event model, admissible path class, and path-independent lower bound. Preserve the correct statement that inverse-area units do not give mass or energy. **Grade:** derived incompatibility of positive floors with a fold and current-owner comparison. **Falsifier:** a defined finite event extension with a proved positive finite barrier would establish the proposed diagnostic in its own domain.

#### EL-15 — Medium: the delayed spring is a comparison model, not the derived first correction to an assembly spring

**Location:** lines 73–119. **Type:** unsupported identification and insufficient expansion assumptions.

The Taylor expansion has the correct signs for the explicitly chosen equation $m\ddot x=-kx(T-\Delta)$ with positive fixed $k,\Delta$. It produces an inertia-like coefficient shift and anti-damping. But the statement that a real assembly spring's first effective model is this single delayed displacement channel is not derived. A general response can contain distributed delays, immediate terms, several internal variables, and additional contributions represented by the ellipsis; those can contribute at the same orders and change the net sign.

A controlled remainder needs smoothness on the entire delay interval and a bound such as $k\Delta^3\sup|x^{(3)}|/6$, not merely a pointwise derivative at the reception time. “Slowly varying” should specify the comparison scale and the treatment of omitted channels. The mass-like shift is an effective inertia coefficient of this assumed model, not an assembly mass result.

**Smallest repair:** introduce it as one illustrative effective response model, state constant-delay and remainder hypotheses, and limit sign and linked-moment conclusions to that channel. **Grade:** derived Taylor identity; inferred missing physical reduction. **Falsifier:** an actual branch-derived assembly response reducing to the stated channel at the claimed order would justify the stronger identification.

#### EL-16 — Medium: the local variational templates need their derivative and endpoint conventions

**Location:** lines 471–523 and 841–869. **Type:** incomplete scope of standard mathematical comparison formulas.

The moving-endpoint boundary expression $[p_a\delta q^a-H\delta t]$ requires $\delta q$ at the endpoint to mean the total endpoint displacement; a fixed-time vertical variation instead gives $[p_a\delta q^a+L\delta t]$. Mixing those meanings changes the boundary term. The later transformation $q\mapsto q+\epsilon X(q,t)$ is vertical and has no time component, so the time-translation case needs either an explicit time generator or the corresponding evolutionary characteristic and boundary term.

The field action displays an ellipsis after first derivatives, then gives only the first-derivative Euler-Lagrange formula. If higher derivatives are admitted, they contribute higher total derivatives and need additional boundary data. For the one-dimensional comparison $L=(q'')^2/2$, the displayed first-derivative formula would give zero while the actual Euler derivative is $q^{(4)}$. For $q=T^4$, that derivative is 24. Merely invoking Einstein-Hilbert as a comparison does not remove its boundary/second-derivative issue.

**Smallest repair:** define vertical versus total endpoint variations and the time generator explicitly; restrict the field formula to first derivatives or include the higher-derivative sum with appropriate boundary conditions. **Grade:** derived endpoint and higher-derivative checks. **Falsifier:** explicit restrictions or conventions matching the written formulas would resolve the respective ambiguity.

#### Effective Lagrangian verification, provenance, and disposition

The known-case-first scoped parser and vendored KaTeX check accept **329 mathematical expressions**, **79 displays**, and **all 79 viewer IDs preserved in order** against the historical baseline. Five displays changed in the inspected conversion: two acceleration equations, the acceleration-residual definition, its normalized window diagnostic, and the renamed branch-gap statistic. All **89 local-file occurrences** exist; all seven Markdown-fragment occurrences resolve against current headings or explicit anchors. The full changed prose and formula diff was read. The conversion improved several claim grades and added a useful reference orientation; most concerns above were already present in the baseline. EL-2 identifies the specific incomplete residual conversion. No visual-layout, generated-viewer freshness, or full downstream audit is claimed.

The mathematical check script `.tmp/crw005-effective-review/check-mathematics.mjs` passes known averaging, polynomial-derivative, and phase fixtures before evaluating its targets. It checks both event roles in a triangular discrete action, the fixed-delay comparison solution and failed candidate energy, continuous classical action on a periodic cylinder, the irrational canonical flow's explicit data, neutral mechanical moments, correlated two-point products, duplicate energy transfer, missed density mismatch, even sign-crossing parity, independent temporal/spatial parity, and Taylor/higher-derivative examples. Numerical examples use normalized wake-speed units $c_f=1$ where a wake speed is needed; the ordinary comparison models are mathematical counterexamples to implications, not imported substrate laws. The explicit proofs and counterexamples above are the durable evidence; scratch contains the executable arithmetic and source snapshots. The existing analyzer and its mathematical references were unchanged.

Bounded source verification attempted the cited Hamilton and Madelung DOI pages and the Noether original-publication page. The DOI opens were blocked as unsafe by the browser service and the Noether page returned 403. A publisher search located supporting Madelung bibliographic references in primary research articles, but did not expose the cited originals for full-text verification. This review therefore does not certify those original texts or use inaccessible claims as proof. The actionable mathematical findings rely on the displayed local equations and explicit derivations; no compulsory bibliography expansion is proposed.

**Disposition:** all 12 Causal Action corrections are complete. Effective Lagrangian has **16 proposed findings** and remains byte-identical to the reviewed snapshot. With all six Dynamics chapters and the already recorded 14 Noether Braid chapters, CRW-005 has **20 of 190 reviewed, 170 remaining**. Packet 2's document review coverage is complete; its Effective Lagrangian corrections await adjudication. The next unreviewed textbook-order chapter after the already completed Noether Braid packet is **Noether Sea**, `content/markdown/aaa/spacetime/noether-sea.md`; it has not been reviewed in this turn. A changed source hash, failed counterexample, or resolving definition would require re-adjudication of the affected finding. No new investigation, generated rewrite, or publication was launched.

Final verification after tracker updates: the known-case-first record checker finds EL-1 through EL-16 exactly once (seven high, nine medium), renders all 93 math expressions in the new acceptance/review record with vendored KaTeX, and resolves its local file targets. `node scripts/validate-content.mjs --check --strict` reports zero errors, zero warnings, and 30 notes. Scoped `git diff --check` passes for Causal Action Functional and the three review owners. `shasum -a 256` confirms both source hashes above, and `cmp` confirms Effective Lagrangian is identical to its review-start snapshot. The `rg --files content/markdown/aaa` Markdown inventory counted by `awk` is 199, including nine Foundations and 14 Noether Braid documents; the 190-document denominator and 20 recorded reviewed paths therefore leave 170 unreviewed paths. These checks establish the stated syntax, inventory, and snapshot boundaries; they do not establish the missing physical derivations.

### CRW-005 Packet 3 document 1 — Noether Sea assurance review, 2026-09-10

**Scope and disposition:** the operator requested the next document review, without implementation. The full 1,236-line [Noether Sea](../../../content/markdown/aaa/spacetime/noether-sea.md) chapter and its entire 172-line diff against pre-campaign `897fe1aa7` were read. The source is unchanged by this review. `shasum -a 256` identifies the reviewed source as `2dcd65594cdeb201cb6e8ab6f393304b72d909a70c70cd9548c1ac9d24dfd512` and the baseline as `255cb1bb0441724cf9ce36110a4a7c30b173abbc7454420d163fd379cac8798d`. The canonical display parser finds all 68 baseline displays and viewer IDs unchanged in order. The actual diff adds paragraph separation and one missing article; it does not introduce the mathematical issues below. They are inherited issues or conflicts with subsequently corrected neighboring chapters, not demonstrated conversion regressions.

The review records **13 findings: six high and seven medium**, all **○ Proposed**. The physical-medium ontology, fixed void, absolute time, distinction between polarity and pro/anti orientation, comparative ambient-selection target, open constitutive status, and separation of density, delay, and cadence are retained. The mass passage at lines 1172–1184 concerns candidate assembly-level inertial response; it does not assign mass to architrinos or claim a completed mass map. The gravitational-loading passage similarly needs its effective assembly interpretation, not a new primitive mass parameter. No blanket terminology rename is recommended. Effective Lagrangian's 16 earlier proposals remain pending and are outside this turn's implementation scope.

#### NS-1 — High: the shell argument needs weighted-root moment hypotheses and an explicit convergence mode

**Location:** lines 20–49. The counting argument supplies a useful conditional mean-square theorem, but does not derive its hypotheses for the actual wake sum. An acceleration hit contains the transmitter factor $c_f/|D_t|$ and the number of admitted roots, not only inverse-square distance. Neutrality and spatial correlation length alone bound neither of these history-dependent factors, nor their second moments. A finite correlation range does not cure an infinite single-cell variance. A population of nearly tangent emission histories can invalidate the claimed $O(n^{-2})$ shell variance unless the weighted cell law is controlled. This identifies a missing hypothesis, not a constructed counterexample to an accepted Noether sea population.

Let $A_n$ denote centered vector shell contributions with finite second moments. The precise elementary conclusion follows from

$$
\mathbb E\left\|\sum_{n=N}^{M}A_n\right\|^2
=\sum_{n=N}^{M}\mathbb E\|A_n\|^2
+2\sum_{N\le n<m\le M}\mathbb E(A_n\cdot A_m).
$$

A summable variance bound and an absolutely summable covariance bound make these partial sums Cauchy in $L^2$. This proves convergence in mean square, hence in probability, along the declared shell order. It does not by this argument establish an almost-sure limit on the particular deterministic universe history, uniform receiver/time convergence, or permission to differentiate the limit. The covariance expression should declare a matrix norm or the scalar dot-product covariance. The weak-gradient paragraph is right to keep the mean contribution open; a local Taylor expansion cannot be extended to all far shells without a global density profile and remainder control.

**Smallest repair:** state the weighted cell/root moment assumptions, derive the displayed tail estimate, label the result conditional $L^2$ convergence, and retain physical realization and stronger limits as separate obligations. **Grade:** derived conditional probability estimate; inferred missing link to the wake ensemble. **Falsifier:** a same-history weighted-cell estimate with finite second moments and the required convergence theorem would support a stronger statement.

#### NS-2 — High: the braid energy and transaction rules identify an unclosed action unit with Planck's constant

**Location:** lines 519–608. The local claim $E_N=h\nu_N$ and transactions $\Delta A_{\mathrm{cyc}}=\pm h$ do not match the current [Cadence-Scale Retuning Hypothesis](../../../content/markdown/aaa/noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md#cadence-scale-retuning-hypothesis). That owner distinguishes its candidate cycle-action unit $h_{\mathrm{act}}$ from observer Planck $h$, and writes a branch action $A_N=Nh_{\mathrm{act}}$ with candidate energy bookkeeping $E_N=A_Nf_N$. The reviewed chapter silently chooses one action unit and closes its observer calibration. Its denial of a new quantum postulate does not establish those identifications.

Action divided by a period has energy dimensions; dimensions do not by themselves establish that it equals the full branch energy. Even in an ordinary mathematical Hamiltonian comparison, $dE/dI=\omega$ yields $E(I)=\int\omega(I)\,dI+\text{constant}$, not generally $I\omega(I)$. The corrected neighboring hypothesis can be retained at its stated candidate grade without treating it as an independently proved energy identity. Observer photon readout $E_{\mathrm{obs}}=h\nu_{\mathrm{obs}}$ is a separately labeled effective recovery relation and need not be renamed with the assembly variable.

**Smallest repair:** inherit $h_{\mathrm{act}}$, the branch action level, its unclosed mapping to $h$, and the candidate status of the energy relation throughout the current and temperature rows. Specify a one-unit restriction if that is the intended model. **Grade:** measured owner comparison plus derived distinction between dimensions and an energy identity. **Falsifier:** a derived branch energy/action map with a proved one-unit domain and observer calibration would justify the stronger formulas.

#### NS-3 — Medium: the unsubtracted Hilbert-transform residual can reject a causal response

**Location:** lines 483–515. A causal kernel does not automatically satisfy the particular unsubtracted relation printed here. The instantaneous causal response $K(T)=\delta(T)$ has $\chi(\omega)=1$, so $\operatorname{Im}\chi=0$ and the displayed numerator is nonzero. A contact term may be excluded by a declared domain, or subtracted as a high-frequency constant; neither convention is stated. Frequency convention, analyticity half-plane, integrability or growth assumptions, subtraction order, principal-value sign, and finite-band tail treatment matter. A generic evolving medium also has a two-time response; a diagonal $\chi(\omega,\mathbf k)$ requires a stationary homogeneous reference or a controlled local approximation.

**Smallest repair:** define the Fourier and Hilbert conventions and the admissible response class, use the appropriately subtracted dispersion relation, and distinguish an actual causal violation from finite-band or modeling error. **Grade:** derived contact-response counterexample. **Falsifier:** a declared strictly delayed decaying kernel class and controlled full-frequency reconstruction would make the printed test applicable within that class.

#### NS-4 — High: the cadence-current remainder omits rate derivatives and the leading diffusion contribution

**Location:** lines 543–571 and 577–588. For an admitted jump process with increments $d_\varsigma(\nu)$ and rates $r_\varsigma(\nu)$ per braid per unit absolute time, define the first and second jump moments $a=\sum_\varsigma r_\varsigma d_\varsigma$ and $b=\sum_\varsigma r_\varsigma d_\varsigma^2$. Taylor expansion of the gain-minus-loss equation, when small jumps and smoothness justify it, gives the current

$$
J_\nu=af_N-\frac12\partial_\nu(bf_N)+\cdots.
$$

The chapter retains $af_N$ and writes $O((\Delta\nu_N)^2\partial_\nu f_N)$ without a rate scale or derivatives of rates and increments. Even with constant $f_N$ the omitted term need not vanish: take equal local rates $r_+=r_-=\nu^2$ and constant increments $\pm d$. Then $a=0$, $b=2d^2\nu^2$, and the diffusion current is $-2d^2\nu f_N$, while the printed remainder is zero. For constant equal rates and $f_N=e^{-\nu}$, the exact symmetric-jump evolution is $2r(\cosh d-1)e^{-\nu}>0$, despite zero first jump moment. These are comparison processes used to check the proposed mathematics, not primitive stochastic laws for the theory.

**Smallest repair:** start with the branch-transition gain/loss measure, retain the diffusion current or bound it in a stated drift-dominated regime, and supply a rate-bearing error estimate. State separately whether the projected process has enough retained state to use rates without unresolved memory. **Grade:** derived jump-expansion counterexamples. **Falsifier:** a controlled scaling in which the second and higher jump moments are uniformly negligible would validate a drift-only approximation.

#### NS-5 — Medium: detailed balance needs the cadence measure and does not erase local drift

**Location:** lines 592–608. The reverse-map identity is useful and should be preserved. If $f_N$ is a density per unit continuous cadence and the forward retuning is $F(\nu)=\nu+d_+(\nu)$, flux balance between corresponding intervals compares

$$
f_N(\nu)r_+(\nu)
=f_N(F(\nu))r_-(F(\nu))|F'(\nu)|.
$$

The Jacobian is absent from the chapter's pair test. For $F(\nu)=2\nu$, forward density-rate product one and reverse density-rate product one-half give equal interval fluxes, but the printed residual is one-half. The printed formula is appropriate for discrete state probabilities with counting measure, or a translation map with unit Jacobian; the chapter has not chosen that representation.

Detailed balance means cancellation of paired probability fluxes in equilibrium. It does not mean every state's conditional first cadence increment is zero. A reversible three-state chain with probabilities $(1/4,1/2,1/4)$ and adjacent rates $(2,1)$ on the first edge and $(1,2)$ on the second has zero pair residuals and local drifts $(2,0,-2)$. The population's mean drift is zero, while local drift is balanced by redistribution. This distinction is essential once NS-4's diffusion term is retained.

**Smallest repair:** choose the measure, include any retuning Jacobian, and distinguish pair current, local drift, and ensemble mean drift. **Grade:** derived change-of-variable and reversible-chain examples. **Falsifier:** an explicit discrete branch-state measure with a demonstrated continuum limit would justify the corresponding discrete test.

#### NS-6 — High: the cadence-distribution equation is not joined to the declared population balance

**Location:** lines 9–18, 226–241, 315–384, 543–571, and 650–664. The chapter does not state whether $f_N$ is a normalized probability density or a population density per cadence. If it is a population density, the required normalization is $\int_0^\infty f_N\,d\nu=\rho_{\mathrm{NS}}$. Integrating the candidate transport equation then requires

$$
S_\rho+r_\rho
=\int_0^\infty(S_{\mathrm{BH}}+S_{\mathrm{GW}}-R_{\mathrm{eq}})\,d\nu
-[J_\nu]_{0}^{\infty},
$$

on the same spatial-flux convention. A disturbance that only retunes existing braids must have zero integrated number source, and number-preserving neighbor equilibration must integrate to zero. Otherwise a positive gravitational-wave disturbance term creates counted braids without a reaction. The full source decomposition earlier in the chapter also contains return, recruitment, pair participation, dissociation, reclassification, and relaxation; their placement in this kinetic equation is not supplied. A cadence-dependent spatial velocity would require its own flux moment rather than automatic use of one population mean.

The finite reaction-window count also lacks an explicit transit flux. Braids can enter or leave a fixed spatial window with no reaction, so its count change cannot equal only the displayed reaction terms unless the window is a material/identity cohort or transit is carried explicitly. Likewise, collimated release that later joins the ambient population is counted at the actual classification event, not automatically at launch.

**Smallest repair:** define the density measure and smoothing normalization, derive its zeroth moment, specify frequency-boundary and spatial-boundary terms, and map each existing source channel exactly once. **Grade:** derived integration constraint; no new physical conservation law is assumed. **Falsifier:** an explicit normalization and source/flux map recovering the existing continuity ledger would close the mismatch.

#### NS-7 — High: the path-rate expression still depends on an unselected cadence variable

**Location:** lines 694–759, 829–965, and 1051–1086. The state $f_N(\nu,\mathbf X,T)$ and its ratio $\mathcal C_N[f_N]$ are functions of cadence $\nu$, while $\alpha_{\mathrm{prop},X}(s)$ must be a scalar along the packet path. No evaluation cadence, response-weighted integral, or branch-state projection is specified. Segmenting the path does not remove this free variable. For the simple positive distribution $f_N=e^{-\nu T}$, zero spatial flow, and a source chosen to satisfy the stated transport equation, $\mathcal C_N=-\nu$ away from the floor. The same cell gives values $-1$ and $-2$ at cadences one and two. Thus the input record does not yet define a unique scalar propagation update.

The dimensional handoff is also undeclared: $D_\gamma\boldsymbol\theta$ has inverse-length units for dimensionless $\boldsymbol\theta$, but $\mathcal C_N$ and $\nabla\cdot\mathbf u$ have inverse-time units. Their coefficients need time-per-length units or a stated division by photon-channel speed; the stress coefficient needs the corresponding inverse stress-length units. Setting $c_f=1$ in numerical work does not identify an effective channel speed or remove this symbolic obligation. The symbol $S(t_s)$ must specify absolute time $T(s)$, and the evolving scalar $\boldsymbol\theta$ later drops the orientation variables included in its earlier definition without an explicit projection. Finally, $\mathcal C_N$ is a source-balanced material-rate quantity, not an equation-defect residual: it can be nonzero when transport is satisfied exactly.

**Smallest repair:** define the map from the full cadence distribution and orientation record to each scalar segment response, give coefficient units and positive-density domain/floor error, and use explicit absolute-time and projected-state notation. **Grade:** derived type and dimensional checks. **Falsifier:** a specified normalized channel weighting or evaluation rule that produces a unique scalar and retains the needed state would resolve the issue.

#### NS-8 — High: endpoint redshift uses the sea cadence without the clock mismatch required by its owner

**Location:** lines 51–58, 282–294, 791–827, 1003–1049, and 1112–1152. The hypothesis table correctly lists local clock/sea cadence tracking as unproved, but the executable endpoint formulas drop its mismatch. [Proper Time and Time Dilation](../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md) explicitly requires $\Delta_{\mathrm{clk\text{-}sea},\mathcal A}=0$ within tolerance before using $\Gamma_N$ as a source/detector clock conversion. Writing a clock rate as $C_{\mathcal A}=C_N\exp(\Delta_{\mathcal A})$ makes the extra frequency conversion $\exp(\Delta_E-\Delta_R)$, and therefore the extra log-redshift term $-\Delta_E+\Delta_R$. With identical sea cadence and a receiver mismatch $0.1$, this is a real log-redshift contribution of $0.1$ that the current subtraction attributes to propagation.

**Smallest repair:** explicitly restrict all displayed transport tests to the tracking branch, or retain both endpoint mismatch terms in the inputs, frequency, duration, and subtraction equations. Do not absorb them into $B_X$, $D_v$, or a fitted path term. **Grade:** derived rate-ratio algebra and measured clock-owner comparison. **Falsifier:** both endpoint mismatch records demonstrably below the declared error budget permit the shorter equations.

#### NS-9 — Medium: the constant-coefficient gradient path term is exactly an endpoint term

**Location:** lines 759–808, 829–862, 913–965, and 1003–1086. When $\mathbf p_X$ is fixed and $D_\gamma=d/ds$ on the declared path, the fundamental theorem gives

$$
\int_E^R\mathbf p_X\cdot D_\gamma\boldsymbol\theta\,ds
=\mathbf p_X\cdot(\boldsymbol\theta_R-\boldsymbol\theta_E).
$$

This term can be a useful constitutive contribution, but it is not independent interior-history sensitivity. Paths with equal endpoint state produce the same contribution regardless of intermediate excursions. On state components shared with the endpoint coefficient row, redshift depends only on the difference between the endpoint and gradient coefficients until independent clock calibration separates them. For one scalar component, $b(\theta_E-\theta_R)+p(\theta_R-\theta_E)$ is unchanged by $(b,p)\mapsto(b+a,p+a)$. Additional segmented samples cannot remove this exact degeneracy by themselves.

**Smallest repair:** evaluate this exact differential at the endpoints, explain its calibration degeneracy, and reserve path-dependent evidence for the remaining terms or a separately derived state-dependent/non-exact response. Do not require a new response mechanism merely to make the term nontrivial. **Grade:** derived fundamental-theorem identity. **Falsifier:** varying coefficients or a derived non-exact response would remove the stated constant-row reduction, but must be included in the model explicitly.

#### NS-10 — Medium: the source calibration is ambiguous and does not determine envelope duration

**Location:** lines 692, 1003–1013, and 1112–1152. $B_X(E)$ is described as the actual emitted frequency relative to $\nu_{X,0}$ while also declared separate from endpoint cadence. Those statements need a clock convention: an absolute-frequency ratio already contains the source cadence, whereas an intrinsic branch factor measured per source-clock unit does not. The later product applies both $B_X(E)$ and $\Gamma_{N,E}^{-1}$, so choosing the former interpretation counts cadence twice.

There is a distinct duration assumption. A carrier-frequency calibration does not automatically fix a packet-envelope duration. The formula assumes the source duration changes by $B_X(E)^{-1}$. Two source wave packets can have different carrier frequency with the same envelope width; this is a mathematical waveform example, not a theory of photon generation. For $B_X=2$, unit reference and actual envelope duration, and no endpoint or propagation change, the printed duration diagnostic gives $\ln2$ although the path has not stretched the packet.

**Smallest repair:** define $B_X$ in a stated source-clock calibration and introduce an independently measured source-duration factor, or restrict the family to a proved fixed-cycle-count waveform class where the reciprocal relation holds. Define the observation-time convention too. **Grade:** derived factorization and waveform counterexample. **Falsifier:** a same-source derivation of the reciprocal duration law for the declared family would support the shorter form.

#### NS-11 — Medium: several residuals test identities or unnormalized quantities rather than constitutive closure

**Location:** lines 127–161, 390–426, 628–648, and 1088–1137. The maximum assembly-class score is not comparable across classes until its component norms and reference scales are fixed; the visibility numerator similarly adds loss/scattering and preferred-frame residuals without declaring common dimensionless normalization. The moment test uses one $\varepsilon$ across density, momentum, energy, cadence, and orientation equations with different units. These require moment-specific scales or explicit nondimensionalization.

A small moment-equation defect also cannot by itself show that omitted memory has been controlled: a model solved using its own chosen moments, currents, and sources satisfies its own equation. In the extreme, identically zero definitions pass while measuring nothing. Define the moments and fluxes independently from the same resolved history and evaluate the proposed closure on histories not used to choose its coefficients. Likewise, defining $Y^{\mathrm{freq}}$ from the measured frequency and inserting it into the inverse frequency formula is algebraic replay; prediction requires an independently evaluated path rate. Image/chromaticity/duration agreement alone does not close an energy balance, and a generic free coherence residue can otherwise absorb the quantity being tested. Finally, cadence-and-balance acceptance is a population membership diagnostic; it supplies no dynamical equilibrium or stability proof.

**Smallest repair:** state the normalization and independent extraction for each test, identify definition/replay versus prediction, bound residuals from retained evidence, and keep membership distinct from equilibrium. **Grade:** derived false-positive routes and dimensional checks. **Falsifier:** independently extracted moments, held-out or analytically known responses, and a bounded omitted-history error would support the closure interpretation.

#### NS-12 — Medium: the stated torque, support, and cage measurements have no inspectable instrument attribution here

**Location:** lines 179–185. The chapter calls forward torque and axial support measured readings while saying their instrument record is pending. The following paragraph describes an acceleration-balanced braid-plus-cage candidate while also saying the cage's reciprocal acceleration still needs evaluation. Those are different scopes: balancing a central receiver against prescribed neighbors does not establish acceleration balance of the whole complex. The explicit open stability statement is appropriate and must remain.

**Smallest repair:** identify the actual prescribed-response instrument, input history, evaluated receivers, normalized wake-speed convention, and retained evidence through a reader-appropriate source/methods note. If that evidence cannot be supplied, retain only a clearly labeled mechanism hypothesis and say which balance is unestablished. Do not fabricate a source or infer a self-consistent cage from a prescribed central response. **Grade:** measured attribution gap by complete reading of the target; no assertion that the measurements are false or that evidence exists nowhere else. **Falsifier:** an inspectable independent instrument record demonstrating the exact stated scope would close the attribution issue.

#### NS-13 — Medium: the acoustic and named stochastic-gravity comparisons need their source-specific scope

**Location:** lines 428–481. The acoustic metric is presented for an ordinary acoustic medium without the assumptions that make this scalar metric representation valid. The checked primary source, Matt Visser, *Acoustic black holes: horizons, ergospheres, and Hawking radiation* (1997 preprint; 1998 publication), states a barotropic, inviscid, irrotational background and treats small velocity-potential perturbations; its theorem and equation (4) match the displayed metric. These assumptions belong beside the example, because a viscous or vortical medium need not admit this same scalar-wave reduction. [Primary source, theorem and equation (4)](https://arxiv.org/html/gr-qc/9712010).

The named Hu comparison also needs an identifiable source and a bounded mapping. Hu and Verdaguer, *Stochastic Gravity: Theory and Applications* (2008), section 3.2, equation (3.11), defines a centered, symmetrized stress-tensor two-point noise kernel. A generic classical cadence/response covariance is a useful analogy, but does not by itself reproduce that quantum noise kernel or imply all higher correlations. [Primary source, section 3.2](https://arxiv.org/html/0802.0658). The chapter's explicit refusal to add primitive stochastic metric noise is correct and should be retained.

**Smallest repair:** add concise assumptions, identify the perturbation and statistical observables being compared, and give these two targeted source notes. No broad bibliography or imported substrate dynamics is needed. **Grade:** measured primary-source comparison, limited to the stated passages. **Falsifier:** a different explicitly derived acoustic regime or a concrete observer correlation map could justify a broader comparison.

**Verification and limits:** the known-case-first scoped extractor, canonical display parser, and vendored KaTeX render all **247 math expressions**, retain **68 displays and viewer IDs**, resolve **97 local-file occurrences**, and find **eight Markdown fragment occurrences with no unresolved simple-heading or explicit-anchor candidates**. The display comparison records no changed equations against the historical baseline. The unchanged source can still contain the semantic issues above; syntax checks are not a proof. A separate small mathematical check first passed known sum, derivative, and exponential fixtures, then reproduced the symmetric-jump, rate-gradient diffusion, change-of-variable, reversible-chain, free-cadence, exact-gradient, clock-mismatch, independent-envelope, contact-response, and independent-shell-tail examples. Their status is explicit mathematical comparison, not an EOM evolution or physical medium measurement. Scratch scripts, snapshot, and baseline diff are under `.tmp/crw005-noether-sea-review/`.

The live TOC traversal places Noether Sea first in Spacetime and **Noether Sea Pro/Anti Coupling** next. This review completes one document only. The next unread path is `content/markdown/aaa/spacetime/noether-sea-pro-anti-coupling.md`; all NS findings and the prior EL findings remain proposed. Any source-hash change or a counterderivation meeting a finding's falsifier requires reassessing that finding before integration.

Final verification: `node scripts/validate-content.mjs --check --strict` reports zero errors, zero warnings, and 30 notes. The known-case-first review-record checker finds NS-1 through NS-13 exactly once (six high, seven medium), renders all 89 math expressions in this record, and resolves its local file targets. Scoped `git diff --check` passes for the three updated assurance owners. A byte comparison with the review-start snapshot and a fresh SHA-256 calculation confirm the reviewed Noether Sea source is unchanged. The `rg --files content/markdown/aaa` inventory counted by `awk` remains 199 Markdown files, including nine Foundations and 14 Noether Braid files. With the six recorded Dynamics reviews and this one Spacetime review, current assurance coverage is 21 of 190, leaving 169 unread documents; this is review coverage, not correction completion or independent physical validation.
