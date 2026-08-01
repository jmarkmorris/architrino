Closure goal: Find every concrete active TODO or blocker task in the main AAA textbook corpus, including stale blockers and missing next-action rows.

# GPT-5.6 Luna TODO and Blocker Scout

Read and follow [`luna-scout-common.md`](luna-scout-common.md) in full before scanning. Its shared scope, exhaustive action-backlog contract, Markdown-only evidence rules, claim/status safeguards, card format, and artifact protocol are binding.

## Distinct purpose

Own only active task language and blocker hygiene: TODO/FIXME/deferred/unresolved/missing/follow-up/open-question passages, stale blocker statements, and missing or unclear next-action rows. Do not reprioritize work, resolve the underlying theory or implementation, or turn a generic open question into a task without a bounded Markdown change/check.

## TODO-and-blocker scan rubric

Search every eligible corpus Markdown file for:

- `TODO`, `FIXME`, blocker, deferred, unresolved, missing, follow-up, next action, open question, pending, or equivalent task language;
- status rows or prose that describe an item as active while nearby corpus evidence marks it completed, superseded, historical, or generated;
- active items with a concrete next step implied by their surrounding section but no explicit next-action row or check;
- mixed TODOs that combine multiple bounded tasks and therefore obscure separate acceptance checks;
- stale blocker phrasing that remains current-facing after a later corpus passage records its superseding result; and
- vague task wording that names a real corpus defect but omits the exact Markdown edit, check, or bounded investigation needed to advance it.

Compare the task passage with adjacent status, evidence, completion, and next-action passages. Separate active obligations from historical notes, examples, completed items, and generated mirrors. For a `needs-wording` card, write the exact TODO/status sentence that needs a bounded rewrite. For a `needs-review` card, identify the two corpus passages whose dates/status or next actions must be reconciled and state the Markdown check that decides the result. Do not change priorities or status during the scan.

## In-scope examples

Retain a task to rewrite “TODO: fix this” as an exact Markdown next-action row with a target and acceptance check; mark a blocker stale when a later corpus passage establishes the superseding result; add a missing next-action row beside an active obligation; correct an unresolved status phrase; or split one mixed TODO into two bounded Markdown tasks with separate checks.

## Out-of-scope examples

Do not retain a generic backlog review, a request to reprioritize, a historical TODO with no current-facing defect, a physics question requiring new research, or an item whose resolution requires inspecting code, tests, data, or any non-Markdown artifact.

Stable report filename: `luna-todo-blocker.md`.
