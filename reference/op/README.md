# Op

This directory is for developer and operator procedure notes.

Use it for repeatable working practices, thread orchestration, run procedures, and other operational guidance for people working in the repo.

During the current core geometrical theory push, operational guidance should route default effort toward hard mathematical closure: equations, theorem ladders, proof certificates, simulation diagnostics, and durable capture in the corpus or priority staging.

## Thread Startup Routing

For ordinary Codex thread startup, use this file as the index. Read only the specialized procedure needed for the selected workflow:

- Default meta-optimization wrapper for any Codex thread: [codex-goal-seeking-prompt-template.md](codex-goal-seeking-prompt-template.md).
- Multiple parallel Codex threads: start from [codex-goal-seeking-prompt-template.md](codex-goal-seeking-prompt-template.md), then use [codex-multiprompt.md](codex-multiprompt.md) for worker boundaries and integration.
- GitHub issue resolution: [issue-resolution.md](issue-resolution.md), then [codex-pr-branch.md](codex-pr-branch.md) if the work needs a branch, commit, push, or PR.
- Branch, commit, push, and PR mechanics: [codex-pr-branch.md](codex-pr-branch.md).
- Source mining: [source-mining-best-practice.md](source-mining-best-practice.md).
- Theory orientation for core geometry and corpus sessions: [theory-orientation.md](theory-orientation.md).

Files named `entourage-*` in this directory belong to a separate workflow. Do not treat them as Codex thread-start guidance unless the operator/developer explicitly requests that workflow.

The living operator feedback checklist is [README-op.md](../../README-op.md). Keep detailed procedures here, but put recurring one-line operator improvement tasks in that root checklist.
