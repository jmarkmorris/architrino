Closure goal: Find only claim-boundary defects in the main AAA textbook corpus that another agent can fix as one bounded Markdown edit or exact check, and return execution-ready action cards.

**Mandatory execution model:** Launch this prompt with `GPT-5.6 Luna` at `High` reasoning effort. This is an execution-model instruction, not a label.

# GPT-5.6 Luna Claim-Boundary Scout

Use this prompt for a complete, read-only scan that admits only directly executable claim-boundary repairs. It does not adjudicate theory, close proofs, or grant acceptance.

## Scope

Scan every Markdown file (`*.md`) under exactly one root, in full, on every run:

1. `content/markdown/aaa/`, the main AAA textbook corpus.

This is the complete scan boundary. Do not scan, inspect, parse, or use any file outside this root, including priority or work-queue material. Do not narrow the scan to an owner, queue row, workstream, claim family, subdirectory, or fallback. Do not add a second root. Do not read, parse, inspect, execute, or use source code or any other non-Markdown file, even when a corpus Markdown file cites it. Record such citations literally and mark them uninspected. If a source or owner detail is unavailable within the corpus, report no action; do not seek it outside the corpus or preserve an absence record.

Apply the repository startup policy already supplied to this prompt, then inspect only Markdown files in the declared corpus root and eligible corpus Markdown owners needed to check a claim. Work read-only. Do not browse, contact external services, edit repository files, stage, commit, push, stash, reset, change status, run generators, or make external changes. The sole exception is the optional report artifact below.

## Method and claim discipline

Search corpus prose, metadata, status tables, claim grades, evidence statements, contracts, scorecards, and corpus cross-references for a mismatch with a live corpus Markdown owner. Preserve `derived`, `measured`, `inferred`, and `guessed` grades. Do not upgrade diagnostic, provider, prescribed, display-only, seed-grade, local, replay, or historical evidence into physical realization, retained-branch evidence, acceptance, conservation, release readiness, score movement, or closure.

## Actionability gate

Retain a finding only when every condition holds:

1. one precise, bounded claim-boundary issue is named;
2. exact eligible corpus Markdown `path:line` evidence is cited;
3. exact target Markdown file(s), all under `content/markdown/aaa/`, for the change or check are named;
4. a precise proposed edit is stated, such as the exact sentence, label, link, or status phrasing to replace or insert, or a narrowly defined Markdown check;
5. one owner or implementer lane is identified within eligible corpus Markdown;
6. one concrete acceptance check on the corpus target is stated;
7. why it matters or the collision risk is stated; and
8. a falsifier or close condition is stated. A decision may appear only when two valid edit alternatives genuinely remain, and both alternatives must be written exactly.

Reject vague `review`, `assess`, `reconcile`, `identify`, or `require` actions; generic open research programs; broad scientific proof targets; repeated queue rows; known long-horizon prerequisites; broad validation gaps with no executable edit; routine descriptions of already-recorded blockers; and mere keyword matches. If the source, owner, target, or acceptance detail is unavailable within eligible corpus Markdown, return no actionable finding; do not search outside the corpus or preserve an absence record.

Use `candidate` for a plausible mismatch not fully checked against all relevant owners, `verified` only for the bounded local mismatch directly confirmed against the current target and named Markdown owner, and `stronger reviewer required` when mathematical, physical, acceptance, provenance, or authority judgment exceeds this scout.

## Return

Return a short numbered list of admitted action cards grouped under this scout. If none pass, report exactly one line:

`No actionable findings — scan scope: every Markdown file under content/markdown/aaa/.`

For each retained card, use this exact compact format and do not add an inventory or counts:

`Finding 1 — <short action title>`

- `Issue:` one bounded defect; separate fact from inference.
- `Target Markdown file(s):` exact repository-relative path(s), all under `content/markdown/aaa/`.
- `Proposed edit/check:` precise replacement, insertion, link/status change, or narrowly defined Markdown command/check another agent can execute directly.
- `Owner/implementer lane:` one named owner or implementer lane identified within the corpus.
- `Evidence:` exact eligible corpus Markdown `path:line` evidence.
- `Acceptance check:` concrete check on the corpus target that passes when the card is closed.
- `Why/collision:` significance or collision risk.
- `Decision:` `none`, unless two valid alternatives are written explicitly.
- `Close condition/falsifier:` exact evidence that closes or overturns the card.
- `Status/grade:` preserved status, claim grade, provenance, independence, and uninspected-endpoint limits.

## Output artifact (.tmp)

When dispatched by `Luna Corpus Dragnet Pass`, write exactly one UTF-8 Markdown report to the coordinator-provided unique directory `.tmp/luna-corpus-dragnet/<run>/` as `luna-claim-boundary.md`, containing exactly the report returned above. Do not create another file or directory and do not write anywhere else. A standalone scout requires no launcher field; with no supplied directory, return the report directly and write no artifact.
