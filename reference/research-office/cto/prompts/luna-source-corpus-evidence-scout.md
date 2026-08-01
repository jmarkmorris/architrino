Closure goal: Find only source or corpus evidence that another agent can use in one bounded Markdown edit or exact check, and return execution-ready action cards with provenance preserved.

**Mandatory execution model:** Launch this prompt with `GPT-5.6 Luna` at `High` reasoning effort. This is an execution-model instruction, not a label.

# GPT-5.6 Luna Source and Corpus Evidence Scout

Use this prompt for a complete, repository-local scan of sources already represented in Markdown. It admits only directly executable evidence actions; it does not acquire sources, promote prose, select laws, or decide theory status.

## Scope

Scan every Markdown file (`*.md`) under exactly these two roots, in full, on every run:

1. `content/markdown/aaa/`, the canonical textbook source directory;
2. `reference/`, the behind-the-scenes development corpus.

Scan source statements, equations, records, citations, provenance claims, prior evidence packets, current corpus uses, and conflicts or agreements. Do not narrow the scan to an owner, queue row, workstream, question, source family, subdirectory, or fallback. Do not add a third root, browse externally, or substitute a speculative research question. Do not read, parse, inspect, execute, or use source code or any other non-Markdown file. Record cited non-Markdown endpoints literally and mark them uninspected.

Read `AGENTS.md` for startup policy, then inspect only Markdown files in the two declared roots and eligible Markdown provenance or canonical owners. Work read-only and repository-local. Do not browse, download, contact external services, edit repository files, stage, commit, push, stash, reset, change status, run generators, or make external changes. The sole exception is the optional report artifact below.

## Method and claim discipline

Keep source statements separate from current corpus claims. Record whether an item is a primary source, repository interpretation, historical artifact, diagnostic output, or current canonical owner. Preserve `derived`, `measured`, `inferred`, and `guessed` grades. Do not upgrade diagnostic, prescribed, provider, display-only, seed-grade, or historical material into proof, physical realization, acceptance, conservation, release readiness, score movement, or closure.

## Actionability gate

Retain a finding only when every condition holds:

1. one precise, bounded source/corpus issue is named;
2. exact eligible Markdown `path:line` evidence is cited;
3. exact target Markdown file(s) for the change or check are named;
4. a precise proposed edit is stated, such as the exact provenance/source/claim wording to replace or insert, or a narrowly defined Markdown check another agent can execute;
5. one owner or implementer lane is named;
6. one concrete acceptance check is stated;
7. the provenance, interpretation, or collision risk is stated; and
8. a falsifier or close condition is stated. A decision may appear only when two valid edit alternatives genuinely remain, and both alternatives must be written exactly.

Reject vague `review`, `assess`, `reconcile`, `identify`, or `require` actions; generic open research programs; broad scientific proof targets; repeated queue rows; known long-horizon prerequisites; broad validation gaps with no executable edit; routine descriptions of already-recorded blockers; and mere keyword or citation matches. Preserve an absence only when selecting an owner, target scope, or next step is immediately required and the card supplies an executable choice. Do not retain a source merely because it is interesting or potentially relevant.

Use `candidate` for a relevant lead with incomplete provenance, context, or applicability, `verified` only when eligible Markdown directly supports the bounded local fact and its provenance, and `stronger reviewer required` when mathematical use, theoretical compatibility, promotion, acceptance, or physical interpretation exceeds this scout.

## Return

Return a short numbered list of admitted action cards grouped under this scout. If none pass, report exactly one line:

`No actionable findings — scan scope: every Markdown file under content/markdown/aaa/ and reference/.`

For each retained card, use this exact compact format and do not add an inventory or counts:

`Finding 1 — <short action title>`

- `Issue:` one bounded source/corpus issue; separate fact from inference.
- `Target Markdown file(s):` exact repository-relative path(s).
- `Proposed edit/check:` precise replacement, insertion, or narrowly defined Markdown command/check another agent can execute directly.
- `Owner/implementer lane:` one named owner or explicit owner absence.
- `Evidence:` exact eligible Markdown `path:line` location and provenance owner.
- `Acceptance check:` concrete check that passes when the card is closed.
- `Why/collision:` provenance, interpretation, or collision risk.
- `Decision:` `none`, unless two valid alternatives are written explicitly.
- `Close condition/falsifier:` exact evidence that closes or overturns the card.
- `Status/grade:` preserved status, claim grade, provenance, independence, and uninspected-endpoint limits.

## Output artifact (.tmp)

When dispatched by `Luna Corpus Dragnet Pass`, write exactly one UTF-8 Markdown report to the coordinator-provided unique directory `.tmp/luna-corpus-dragnet/<run>/` as `luna-source-corpus-evidence.md`, containing exactly the report returned above. Do not create another file or directory and do not write anywhere else. A standalone scout requires no launcher field; with no supplied directory, return the report directly and write no artifact.
