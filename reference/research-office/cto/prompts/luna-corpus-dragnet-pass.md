Closure goal: Run one bounded Corpus Dragnet pass that converts only evidenced cross-corpus or durable organization findings into human-triage-ready records while preserving all theory, status, acceptance, promotion, and reorganization decisions for their owners.

# GPT-5.6 Luna Corpus Dragnet Pass

Use this prompt to bridge the reusable Luna scouting methods into the durable Corpus Dragnet lane. The Dragnet remains the priority lane and human-triage ledger; the scouts are optional read-only methods for gathering and checking evidence.

## Pass declaration

**Pass ID:** [CD-###]

**Bounded question or relationship class:** [QUESTION OR FINDING CLASS]

**Included roots:** [EXACT PATHS]

**Excluded roots:** [EXACT PATHS OR CATEGORIES]

**Live owners:** [CANONICAL, STATUS, QUEUE, CONTRACT, OR PROVENANCE OWNERS]

**Execution authority:** `report-only` | `dragnet-ledger-write`

Read `AGENTS.md` and all owner files under `reference/priorities/corpus-dragnet/` before scanning. Read only the target material and nearby owners needed to interpret the evidence. Keep every inspected file outside `reference/priorities/corpus-dragnet/` read-only.

`report-only` is the default and permits no file edits. `dragnet-ledger-write` must be expressly authorized for this execution and must name `recommendations.md` and `work-log.md` as the only writable files. Do not infer write authority from the use of this prompt, a queued pass, or a scout result.

## Scout selection

Select only the methods relevant to the declared pass, and combine them only when their evidence boundaries remain visible:

- [Claim-Boundary Scout](luna-claim-boundary-scout.md) for possible claim-grade or status mismatches;
- [Repository Hygiene Scout](luna-repository-hygiene-scout.md) for reference drift, duplicates, stale paths, and canonical-owner problems;
- [Validation-Coverage Scout](luna-validation-coverage-scout.md) for obligation-to-check and independent-oracle mapping;
- [TODO and Blocker Scout](luna-todo-blocker-scout.md) for unresolved-item clustering against live owners;
- [Source and Corpus Evidence Scout](luna-source-corpus-evidence-scout.md) for repository-local evidence and provenance.

Scout output is evidence input, not authority. Generic scout output is not automatically a Corpus Dragnet finding. Recheck every retained item against the declared scan boundary, exact source paths, and live owners. Preserve each scout's `candidate`, `verified`, or `stronger reviewer required` status as evidence metadata; do not convert it into a Corpus Dragnet disposition or an acceptance judgment.

## Finding admission test

Admit a recommendation only when all of the following are true:

1. The observable relationship is supported by exact repository-relative paths and stable line or section anchors.
2. The relationship is genuinely cross-corpus, or it exposes a durable organization, duplication, terminology, dependency, provenance, or routing issue that belongs in human triage across runs.
3. The current canonical, status, queue, contract, or provenance owner has been identified, or its absence is itself evidenced.
4. The entry can state why the relationship may matter without inferring an unproved theory consequence.
5. Independent evidence, terminology, provenance, and claim grades remain separate rather than being collapsed because passages look similar.
6. A bounded existing owner or `none` can be named as the suggested triage route without creating, reprioritizing, or advancing work.

Do not admit a generic scout observation, keyword resemblance, isolated local defect better returned to its owner, unverified semantic similarity, unsupported organization preference, or theory inference. When an item fails the admission test, report why it was not admitted; do not write it to `recommendations.md`.

## Non-authority rules

- Do not decide or change theory, proof, claim grade, promotion, priority, queue, status, acceptance, disposition, ownership, or corpus organization.
- Do not move, rewrite, promote, merge, delete, regrade, rename, or reorganize inspected material.
- Do not turn diagnostic, provider, prescribed, display-only, seed-grade, replay, local, or historical evidence into physical realization, retained-branch evidence, conservation, acceptance, release readiness, score movement, or global closure.
- Do not treat agreement as independent evidence unless the two sides are independently sourced and that independence is named.
- Do not browse, acquire external sources, make external changes, or run mutating tests, generators, or workflows.
- Do not stage, commit, push, stash, reset, or alter another priority lane.

## Durable records

When and only when `dragnet-ledger-write` authority is explicit:

1. Append a dated pass receipt to `reference/priorities/corpus-dragnet/work-log.md` stating the pass ID, boundary and exclusions, scouts used, material searches, owners checked, admitted-finding count, recommendation IDs written or `none`, material limitations, and the exact execution authority. Record a zero-finding receipt when no item passes the admission test.
2. Write one entry to `reference/priorities/corpus-dragnet/recommendations.md` for each admitted finding, following its current finding format exactly. Set `Status` to `untriaged`; leave `Disposition` blank; preserve exact evidence, ownership, provenance, evidence status, and claim grades in the appropriate fields.
3. Do not write a recommendation merely to prove the pass ran. No actual evidenced finding means no recommendation write.

Under `report-only` authority, make no durable write. Include the complete proposed pass receipt and any finding-format entries in the final report so an authorized human or later execution can inspect them without treating them as ledger records.

## User-readable final output

Post a user-readable report in the task's final output; do not return the result only to a coordinator. Include:

Start every substantive finding with a stable numbered label (`Finding 1`, `Finding 2`, and so on). If the pass yields none, state `No findings` explicitly.

1. pass ID, bounded scope, exclusions, execution authority, and files inspected;
2. scout methods selected, why each was relevant, and searches or commands run;
3. live owners checked and the evidence boundary preserved from each method;
4. each admitted finding with exact evidence, claim grade, evidence status, bounded significance, falsifier, and suggested human-triage route;
5. candidates not admitted and the failed admission criterion;
6. durable records written, or the proposed receipt and entries when report-only;
7. scan limitations, zero-result searches that materially bound the pass, and collision risk with active owners;
8. an explicit statement that no theory, promotion, queue, status, acceptance, disposition, or reorganization decision was made.

End with the exact result: `Advanced: pass receipt only`, `Advanced: pass receipt and untriaged recommendations`, or `Not advanced: report-only`; then state the next bounded closure goal, or `Closure goal: none required` when no continuation is needed.
