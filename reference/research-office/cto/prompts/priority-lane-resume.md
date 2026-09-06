Resume an existing `reference/priorities/` workstream from live state, make the next scoped progress step, and leave the strategy, queue, brainstorming, and work-log split clean.

# Priority Lane Resume Prompt

Use this prompt when Op names a priority workstream and wants the next practical step done, not just summarized.

## Startup

Read `AGENTS.md`, the generated startup router, and the selected live workflow owner before inspecting the working set using mechanisms permitted for the current agent. Read the following workstream sources:

1. `AGENTS.md`
2. `reference/priorities/README.md`
3. The named workstream's `priorities.md` strategy and status tracker.
4. The named workstream's `work-queue.md`.
5. The named workstream's `brainstorming.md`, if present.
6. The named workstream's `work-log.md`, if present.
7. Any focused sibling packet directly named by the current top queue item.

Do not rely on memory for the live queue. Treat dirty worktree state as normal and do not revert unrelated changes.

## Method

Identify the smallest next step that actually advances the workstream. Prefer one concrete artifact over broad reorganization:

- definition
- equation
- lemma or theorem target
- branch certificate target
- proof route
- simulation target with variables
- validation criterion
- source-backed evidence object
- focused priority packet update
- corpus promotion when the mathematics, evidence, assumptions, claim grading, and exposition are reader-ready and Op's request grants the required edit authority

Maintain the priority-lane split:

- keep strategy, current state, score metadata, routing, blockers, and promotion state in `priorities.md`
- keep accepted executable tasks and their local rank in `work-queue.md`
- keep non-task hypotheses, questions, and provisional theory insight in `brainstorming.md`
- put dated proof attempts, status, and handoff notes in `work-log.md`
- use focused sibling files for long specs, certificates, evidence packets, or derivations

If a queue item is completed, remove it from the live queue, record the result in `work-log.md` when it has durable handoff value, and renumber following items. Move a brainstorming idea into `work-queue.md` only after it becomes an accepted, testable task with a named acceptance condition. Capture a substantive theory advancement in its authorized subject owner under the operator explanation standard. Use a reader-facing destination only when authorized and ready; if writes are explicitly prohibited or unavailable, provide the proposed capture and destination in the response.

## Validation

Run focused validation appropriate to the files touched. Codex checks whitespace with:

```bash
git diff --check
```

An agent whose environment lacks git uses the applicable non-git validators and reports the scope of verification actually performed.

For ordinary priority or corpus edits, do not run generator `--write` commands unless Op explicitly asks for regeneration or the task is in final PR flow.

## Progress record

Keep the workstream, selected item, changed-file scope, concrete progress, queue disposition, validation results, and remaining blocker current in the authorized owner. Follow [the operator explanation standard](../../../op/operator-explanation-standard.md) for responses and capture, and the [academic style guide](../../../../content/markdown/aaa/archie/academic-style-guide.md) for writing style.
