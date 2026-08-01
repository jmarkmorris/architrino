Closure goal: Run one bounded Corpus Dragnet pass that converts only evidenced cross-corpus or durable organization findings into human-triage-ready records while preserving all theory, status, acceptance, promotion, and reorganization decisions for their owners.

**Mandatory execution model:** Launch this prompt with `GPT-5.6 Luna` at `High` reasoning effort. This is an execution-model instruction, not a label.

# GPT-5.6 Luna Corpus Dragnet Pass

Use this prompt to bridge the reusable Luna scouting methods into the durable Corpus Dragnet lane. The Dragnet remains the priority lane and human-triage ledger; the scouts are optional read-only methods for gathering and checking evidence.

## Pass declaration

Perform a full dragnet over exactly these two corpus areas on every run:

1. `content/markdown/aaa/`, the canonical textbook source directory;
2. `reference/`, the behind-the-scenes development corpus.

Inventory and scan every Markdown file (`*.md`) under both areas in full for every relationship class allowed by the finding admission test below. Do not narrow the dragnet to a selected owner, queue row, workstream, topic family, subdirectory, or fallback. Do not add a third dragnet root. There are no launcher-supplied included or excluded roots. Resolve a Markdown live owner separately for each candidate when one exists, but never use an owner to reduce scan coverage. Do not read, parse, inspect, execute, or use source code or any other non-Markdown file, even when a Markdown file cites it as a verification endpoint. Record the literal Markdown citation and mark the endpoint uninspected.

Derive a temporary report-only pass ID from the current UTC date plus the next unused same-day ordinal. A report-only ID does not reserve or advance a ledger ID. Read existing Corpus Dragnet owner files for format, authority, and prior-finding checks, not for scan selection. If either corpus root, the lane, or an expected owner file is absent, include that exact condition as a numbered absence finding and continue the full report-only scan; do not request input, halt, invent a lane, or substitute a fallback scope.

**Execution authority:** `report-only` by default. Use `dragnet-ledger-write` only when that authority is expressly granted for the current execution.

After reading `AGENTS.md` for startup policy, read all existing Markdown owner files under `reference/priorities/corpus-dragnet/` before scanning. Scan every Markdown file under both declared corpus roots completely, then read only eligible Markdown owners within those roots to interpret evidence. Inspect no source code or other non-Markdown file. Keep every inspected file outside `reference/priorities/corpus-dragnet/` read-only. If the lane directory or an expected Markdown owner file is missing, treat that as evidence to report, not permission to create or reconstruct it.

`report-only` is the default and permits no file edits. `dragnet-ledger-write` must be expressly authorized for this execution and must name `recommendations.md` and `work-log.md` as the only writable files. Do not infer write authority from the use of this prompt, a queued pass, or a scout result.

## Scout selection

Apply all five scout methods across both complete corpus roots. Keep their evidence boundaries visible and record a numbered absence finding when a method has no matching material in either root:

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
- Do not inspect or execute source code, tests, validators, data, fixtures, images, or any other non-Markdown file; a path cited by Markdown is not inspected evidence.
- Do not stage, commit, push, stash, reset, or alter another priority lane.

## Durable records

When and only when `dragnet-ledger-write` authority is explicit:

1. Append a dated pass receipt to `reference/priorities/corpus-dragnet/work-log.md` stating the pass ID, boundary and exclusions, scouts used, material searches, owners checked, admitted-finding count, recommendation IDs written or `none`, material limitations, and the exact execution authority. Record a zero-finding receipt when no item passes the admission test.
2. Write one entry to `reference/priorities/corpus-dragnet/recommendations.md` for each admitted finding, following its current finding format exactly. Set `Status` to `untriaged`; leave `Disposition` blank; preserve exact evidence, ownership, provenance, evidence status, and claim grades in the appropriate fields.
3. Do not write a recommendation merely to prove the pass ran. No actual evidenced finding means no recommendation write.

Under `report-only` authority, make no durable write. Include the complete proposed pass receipt and any finding-format entries in the final report so an authorized human or later execution can inspect them without treating them as ledger records.

## User-readable final output

Post a user-readable report in the task's final output and return the same report to the coordinator when a coordinator channel exists, so both can review and decide on the findings. Do not return the result only to a coordinator. Include:

Start every substantive finding with a stable numbered label (`Finding 1`, `Finding 2`, and so on). If a root contains no admissible or candidate relationship, include a numbered `absence` finding for that root with the searches and coverage limits; do not return an empty list or ask for a pass declaration.

1. pass ID, bounded scope, exclusions, execution authority, and files inspected;
2. all scout methods used, their coverage in each root, and searches or commands run;
3. live owners checked and the evidence boundary preserved from each method;
4. each admitted finding with exact evidence, claim grade, evidence status, bounded significance, falsifier, and suggested human-triage route;
5. candidates not admitted and the failed admission criterion;
6. durable records written, or the proposed receipt and entries when report-only;
7. scan limitations, zero-result searches that materially bound the pass, and collision risk with active owners;
8. an explicit statement that no theory, promotion, queue, status, acceptance, disposition, or reorganization decision was made.

End with the exact result: `Advanced: pass receipt only`, `Advanced: pass receipt and untriaged recommendations`, or `Not advanced: report-only`; then state the next bounded closure goal, or `Closure goal: none required` when no continuation is needed.
