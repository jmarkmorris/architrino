Closure goal: Find only documented coverage defects that another agent can address as one bounded Markdown edit or exact check, and return execution-ready action cards.

**Mandatory execution model:** Launch this prompt with `GPT-5.6 Luna` at `High` reasoning effort. This is an execution-model instruction, not a label.

# GPT-5.6 Luna Validation-Coverage Scout

Use this prompt for a complete, Markdown-only mapping of declared obligations to documented checks. It admits only directly executable coverage actions; it does not inspect code, run workflows, implement tests, or certify acceptance.

## Scope

Scan every Markdown file (`*.md`) under exactly these two roots, in full, on every run:

1. `content/markdown/aaa/`, the canonical textbook source directory;
2. `reference/`, the behind-the-scenes development corpus.

Scan for explicit requirements, contract clauses, acceptance conditions, current claim statements, and Markdown references to implementations, tests, validators, fixtures, or independent oracles. Do not narrow the scan to an owner, queue row, workstream, claim family, subdirectory, or fallback. Do not add a third root. Do not read, parse, inspect, execute, or use source code or any other non-Markdown file. Record cited non-Markdown endpoints literally and mark them uninspected.

Read `AGENTS.md` for startup policy, then inspect only Markdown files in the two declared roots. Treat only explicit Markdown statements as obligations. Work read-only. Do not inspect source code, tests, validator implementations, data, fixtures, images, generated non-Markdown artifacts, or any other file type. Do not execute tests, validators, generators, or other programs. Do not browse, edit repository files, stage, commit, push, stash, reset, update snapshots, change status, or make external changes. The sole exception is the optional report artifact below.

## Method and claim discipline

Trace each obligation only to Markdown passages describing its implementation path and check. Distinguish documented execution coverage from a documented independent correctness oracle. A fixture, replay, golden file, or subject-produced comparison establishes determinism or parity only unless Markdown names an independent reference. Preserve claim grades and never turn a documented check into proof closure, physical acceptance, conservation, retained-branch evidence, release readiness, or score movement.

## Actionability gate

Retain a finding only when every condition holds:

1. one precise, bounded coverage issue is named;
2. exact eligible Markdown `path:line` evidence is cited for the obligation and documented check;
3. exact target Markdown file(s) for the change or check are named;
4. a precise proposed edit is stated, such as the exact obligation/check wording to insert or replace, or a narrowly defined Markdown command/check another agent can run;
5. one owner or implementer lane is named;
6. one concrete acceptance check is stated;
7. the claim risk or collision with active validation work is stated; and
8. a falsifier or close condition is stated. A decision may appear only when two valid edit alternatives genuinely remain, and both alternatives must be written exactly.

Reject vague `review`, `assess`, `reconcile`, `identify`, or `require` actions; broad scientific proof targets; generic open research programs; repeated queue rows; known long-horizon prerequisites; broad validation gaps with no executable edit; routine descriptions of already-recorded blockers; and mere keyword matches. Preserve an absence only when selecting an owner, target scope, or next step is immediately required and the card supplies an executable choice.

Use `candidate` for an apparent gap whose owner or documented reach is incomplete, `verified` only when eligible Markdown directly shows the obligation lacks a matching documented check or the documented check cannot establish the property, and `stronger reviewer required` when mathematical validity, physical acceptance, independence, or contract interpretation exceeds this scout.

## Return

Return a short numbered list of admitted action cards grouped under this scout. If none pass, report exactly one line:

`No actionable findings — scan scope: every Markdown file under content/markdown/aaa/ and reference/.`

For each retained card, use this exact compact format and do not add an inventory or counts:

`Finding 1 — <short action title>`

- `Issue:` one bounded gap; separate fact from inference.
- `Target Markdown file(s):` exact repository-relative path(s).
- `Proposed edit/check:` precise replacement, insertion, or narrowly defined Markdown command/check another agent can execute directly.
- `Owner/implementer lane:` one named owner or explicit owner absence.
- `Evidence:` exact eligible Markdown `path:line` evidence for obligation and check.
- `Acceptance check:` concrete check that passes when the card is closed.
- `Why/collision:` claim risk or collision with active validation work.
- `Decision:` `none`, unless two valid alternatives are written explicitly.
- `Close condition/falsifier:` exact evidence that closes or overturns the card.
- `Status/grade:` preserved status, claim grade, provenance, independence, and uninspected-endpoint limits.

## Output artifact (.tmp)

When dispatched by `Luna Corpus Dragnet Pass`, write exactly one UTF-8 Markdown report to the coordinator-provided unique directory `.tmp/luna-corpus-dragnet/<run>/` as `luna-validation-coverage.md`, containing exactly the report returned above. Do not create another file or directory and do not write anywhere else. A standalone scout requires no launcher field; with no supplied directory, return the report directly and write no artifact.
