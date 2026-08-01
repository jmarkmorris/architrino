Closure goal: Define the shared execution, evidence, action-card, and artifact contract for every Luna scout scanning the main AAA textbook corpus.

# Luna Scout Common Contract

Every Luna scout prompt that links this file must read and follow it in full before scanning. The scout-specific prompt supplies the only additional instructions: its purpose, distinct rubric, search method, examples, and stable report filename.

## Mandatory execution model

Launch the scout with `GPT-5.6 Luna` at `High` reasoning effort. This is an execution-model instruction, not a label.

## Complete scan scope

Scan every Markdown file (`*.md`) under exactly one root, in full, on every run:

1. `content/markdown/aaa/`, the main AAA textbook corpus.

This is the complete scan boundary. Do not scan, inspect, parse, or use any file outside this root, including priority or work-queue material. Do not narrow the scan to an owner, queue row, workstream, topic, subdirectory, or fallback. Do not add a second root. Retain only Markdown evidence and Markdown targets. Do not read, parse, inspect, execute, or use source code, tests, validators, data, fixtures, images, generated non-Markdown artifacts, or any other non-Markdown file, even when corpus Markdown cites one. Record such endpoints literally and mark them uninspected. Do not browse, download, acquire sources, or contact external services. If source evidence or a corpus target cannot be identified within the corpus, report no action; do not seek it outside the corpus or preserve an absence record.

## Read-only and report-only rules

Apply the repository startup policy already supplied to the prompt, then work read-only. Do not edit repository files, stage, commit, push, stash, reset, change status or priority, run generators, execute tests or validators, update snapshots, or make external changes. The only permitted write is the optional report artifact described below. A standalone scout with no supplied output directory writes no artifact and returns its report directly.

## Exhaustive action-backlog contract

Create one stable, complete numbered action-card list for every concrete corpus defect, inconsistency, stale passage, missing link or cross-reference, unclear claim boundary, unresolved TODO, evidence or provenance gap, or validation-documentation gap that can be handed to another agent as a bounded Markdown task. Do not cap the list, call it short, or silently discard a concrete candidate because ownership is not separately identified, exact final wording is uncertain, or a close condition is not yet known. Missing separate ownership never suppresses a concrete finding: every retained card is addressed `For: Architrino corpus team`.

Retain a card only when the finding is concrete enough to identify exact corpus Markdown evidence and exact target Markdown file(s), and to state a bounded proposed edit/check or next executable Markdown investigation/edit. Every retained card must also state a concrete acceptance check or the bounded check that will establish it, plus the risk or collision. Use `needs-wording` when the defect is concrete but final phrasing is unsettled, and `needs-review` when a bounded review must choose among explicit edit/check options. State the next executable Markdown investigation or edit for either label. Do not require a separate owner, infer one, or label one.

Exclude only non-concrete speculation, exact duplicate copies of the same source occurrence, items requiring non-Markdown inspection, and items requiring external research. A keyword match, broad open research question, generic cleanup request, generic request for more tests, or routine blocker restatement is not a card unless it is converted into a bounded Markdown task with exact corpus evidence, a named corpus target, a proposed edit/check, and an acceptance check. Do not select a law, invent a prescription, propose contact continuation, claim proof closure, change a score, or make a physics verdict.

## Shared claim and status discipline

Preserve every finding's original label, status, severity, claim grade, provenance, exact `path:line` evidence, fact-versus-inference boundary, independence limit, falsifier, limitations, and uninspected-endpoint labels. Preserve `derived`, `measured`, `inferred`, and `guessed` grades and every existing status boundary. Use `candidate` for a plausible item not fully checked against the eligible corpus, `verified` only for a bounded local fact directly confirmed in corpus Markdown, `needs-wording` and `needs-review` as defined above, and `stronger reviewer required` when mathematical, physical, acceptance, provenance, independence, or authority judgment exceeds the scout.

Never turn diagnostic, provider, prescribed, display-only, seed-grade, replay, local, historical, or Markdown-only evidence into physical realization, retained-branch evidence, conservation, acceptance, release readiness, score movement, or closure. A documented check is not proof closure; a parity, replay, fixture, or subject-produced comparison is not an independent correctness result unless corpus Markdown names the independent basis.

## Shared return format

Return the complete stable numbered list of all retained action cards grouped under the scout. Do not cap the list or call it short. Only after an exhaustive scan finds zero concrete Markdown tasks, report exactly one line:

`No actionable findings — scan scope: every Markdown file under content/markdown/aaa/.`

For each retained card, use this exact compact format and do not add an inventory or counts:

`Finding 1 — <short action title>`

- `Issue:` one bounded defect; separate fact from inference.
- `Target Markdown file(s):` exact repository-relative path(s), all under `content/markdown/aaa/`.
- `Proposed edit/check:` precise replacement, insertion, link/status/provenance change, or narrowly defined Markdown command/check another agent can execute directly; if labeled `needs-wording` or `needs-review`, state the next executable Markdown investigation/edit.
- `For:` `Architrino corpus team`.
- `Evidence:` exact corpus Markdown `path:line` evidence.
- `Acceptance check:` concrete check on the corpus target that passes when the card is closed, or the bounded check that will establish it.
- `Why/collision:` significance or collision risk.
- `Decision:` `none`, unless two valid alternatives are written explicitly.
- `Close condition/falsifier:` exact evidence that closes or overturns the card, when known; otherwise state the bounded check that will establish it.
- `Status/grade:` preserved status, claim grade, provenance, independence, and uninspected-endpoint limits.

## Temporary report artifact protocol

When dispatched by `Luna Corpus Dragnet Pass`, write exactly one UTF-8 Markdown report to the coordinator-provided unique directory `.tmp/luna-corpus-dragnet/<run>/` using the stable report filename stated in the scout-specific prompt, containing exactly the report returned above. Do not create another file or directory and do not write anywhere else. Do not overwrite another run directory. The report is an ephemeral output artifact, not a durable repository record.
