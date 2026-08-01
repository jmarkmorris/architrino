Closure goal: Find only active TODO or blocker items that another agent can execute as one bounded Markdown edit or exact check, and return execution-ready action cards.

**Mandatory execution model:** Launch this prompt with `GPT-5.6 Luna` at `High` reasoning effort. This is an execution-model instruction, not a label.

# GPT-5.6 Luna TODO and Blocker Scout

Use this prompt for a complete, read-only scan of explicit TODO, FIXME, blocker, deferred, unresolved, missing, follow-up, and open-question language. It admits only directly executable actions; it does not reprioritize, resolve, or mutate the backlog.

## Scope

Scan every Markdown file (`*.md`) under exactly these two roots, in full, on every run:

1. `content/markdown/aaa/`, the canonical textbook source directory;
2. `reference/`, the behind-the-scenes development corpus.

Do not narrow the scan to an owner, queue row, workstream, phrase family, subdirectory, or fallback. Do not add a third root. Do not read, parse, inspect, execute, or use source code or any other non-Markdown file. Record cited non-Markdown endpoints literally and mark them uninspected.

Read `AGENTS.md` for startup policy, then inspect only Markdown files in the two declared roots and eligible Markdown owners. Separate active obligations from historical notes, examples, completed items, and generated mirrors. Work read-only. Do not browse, edit repository files, stage, commit, push, stash, reset, change status, renumber priorities, run generators, or make external changes. The sole exception is the optional report artifact below.

## Actionability gate

Retain a finding only when every condition holds:

1. one precise, bounded active issue is named;
2. exact eligible Markdown `path:line` evidence is cited for the item and owner;
3. exact target Markdown file(s) for the change or check are named;
4. a precise proposed edit is stated, such as the exact TODO/status/owner/link phrasing to replace or insert, or a narrowly defined Markdown check another agent can execute;
5. one owner or implementer lane is named;
6. one concrete acceptance check is stated;
7. the blocker consequence or collision risk is stated; and
8. a falsifier or close condition is stated. A decision may appear only when two valid edit alternatives genuinely remain, and both alternatives must be written exactly.

Reject vague `review`, `assess`, `reconcile`, `identify`, or `require` actions; generic open research programs; broad scientific proof targets; repeated queue rows; known long-horizon prerequisites; broad validation gaps with no executable edit; routine descriptions of already-recorded blockers; and mere keyword matches. A keyword hit alone is never an admitted finding. Preserve an absence only when selecting an owner, target scope, or next step is immediately required and the card supplies an executable choice.

Use `candidate` for an active-looking item not fully reconciled with its live Markdown owner, `verified` only when an eligible live owner directly confirms the bounded item remains open, and `stronger reviewer required` when proof status, physical meaning, acceptance, provenance, or priority judgment exceeds this scout.

Preserve `derived`, `measured`, `inferred`, and `guessed` grades and every existing status boundary. Do not select a law, invent a prescription, propose contact continuation, claim proof closure, change a score, or make a physics verdict.

## Return

Return a short numbered list of admitted action cards grouped under this scout. If none pass, report exactly one line:

`No actionable findings — scan scope: every Markdown file under content/markdown/aaa/ and reference/.`

For each retained card, use this exact compact format and do not add an inventory or counts:

`Finding 1 — <short action title>`

- `Issue:` one bounded active item; separate fact from inference.
- `Target Markdown file(s):` exact repository-relative path(s).
- `Proposed edit/check:` precise replacement, insertion, or narrowly defined Markdown command/check another agent can execute directly.
- `Owner/implementer lane:` one named owner or explicit owner absence.
- `Evidence:` exact eligible Markdown `path:line` evidence for item and owner.
- `Acceptance check:` concrete check that passes when the card is closed.
- `Why/collision:` blocker consequence or collision risk.
- `Decision:` `none`, unless two valid alternatives are written explicitly.
- `Close condition/falsifier:` exact evidence that closes or overturns the card.
- `Status/grade:` preserved status, claim grade, provenance, and uninspected-endpoint limits.

## Output artifact (.tmp)

When dispatched by `Luna Corpus Dragnet Pass`, write exactly one UTF-8 Markdown report to the coordinator-provided unique directory `.tmp/luna-corpus-dragnet/<run>/` as `luna-todo-blocker.md`, containing exactly the report returned above. Do not create another file or directory and do not write anywhere else. A standalone scout requires no launcher field; with no supplied directory, return the report directly and write no artifact.
