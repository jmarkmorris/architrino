Closure goal: Resume an existing `reference/priorities/` workstream from live state, make the next scoped progress step, and leave the tracker, brainstorming, and work-log split clean.

# Priority Lane Resume Prompt

Use this prompt when Op names a priority workstream and wants the next practical step done, not just summarized.

## Startup

Run:

```bash
git status --short --untracked-files=all
```

Then read:

1. `AGENTS.md`
2. `reference/priorities/README.md`
3. The named workstream's `priorities.md` or main tracker.
4. The named workstream's `brainstorming.md`, if present.
5. The named workstream's `work-log.md`, if present.
6. Any focused sibling packet directly named by the current top item.

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
- safe corpus promotion when the material is already corpus-solid and Op's request grants edit authority

Maintain the priority-lane split:

- keep the tracker compact and focused on live queue state
- put provisional theory insight in `brainstorming.md`
- put dated proof attempts, status, and handoff notes in `work-log.md`
- use focused sibling files for long specs, certificates, evidence packets, or derivations

If a priority item is completed, remove it from the priority list and renumber following items. If a substantive theory advancement is made, decide whether it belongs directly in `content/markdown/aaa`, in the priority lane, or only in the closeout with a reason.

## Validation

Run focused validation appropriate to the files touched. At minimum, run:

```bash
git diff --check
```

For ordinary priority or corpus edits, do not run generator `--write` commands unless Op explicitly asks for regeneration or the task is in final PR flow.

## Closeout

Report:

1. Workstream resumed.
2. Live top item or blocker found.
3. Files changed.
4. Concrete progress made.
5. Priority item removed, updated, or left open.
6. Validation commands and results.
7. Remaining blocker or next step.
