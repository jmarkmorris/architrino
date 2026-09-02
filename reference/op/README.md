# Op

This directory is for developer and operator procedure notes.

Use it for repeatable working practices, thread orchestration, run procedures, and other operational guidance for people working in the repo.

During the current core geometrical theory push, operational guidance should route default effort toward hard mathematical closure: equations, theorem ladders, proof certificates, simulation diagnostics, and durable capture in the corpus or priority staging.

## Thread Startup Routing

For ordinary agent startup, begin with the generated compact orientation:

- [agent-startup-orientation.generated.md](agent-startup-orientation.generated.md)

That file is a routing aid, not an authority. If it conflicts with the live source files below, the live source files win. Use this file as the source index and read only the specialized procedure needed for the selected workflow:

- Default meta-optimization wrapper for any Codex thread: [codex-goal-seeking-prompt-template.md](codex-goal-seeking-prompt-template.md).
- Multiple parallel Codex threads: start from [codex-goal-seeking-prompt-template.md](codex-goal-seeking-prompt-template.md), then use [codex-multiprompt.md](codex-multiprompt.md) for worker boundaries and integration.
- GitHub issue resolution: [issue-resolution.md](issue-resolution.md), then [codex-pr-branch.md](git/codex-pr-branch.md) if the work needs a branch, commit, push, or PR.
- Branch, commit, push, and PR mechanics: [codex-pr-branch.md](git/codex-pr-branch.md).
- Unattended PR lifecycle verification: [codex-pr-unattended-verification.md](git/codex-pr-unattended-verification.md).
- Corpus convergence: [convergence-campaign.md](../research-office/cto/prompts/convergence-campaign.md), with [theory-orientation.md](theory-orientation.md) for the smallest relevant live theory read.
- Source mining: [source-mining-best-practice.md](source-mining-best-practice.md).
- Reference and source policy: [About Architrino](../../content/markdown/aaa/archie/about-architrino.md#sources-references-and-attribution), with [source-checking disclosures](../../content/markdown/aaa/archie/about-architrino.md#ai-assisted-research-and-review). Acquisition and review procedures apply this policy; they do not replace it.
- Theory orientation for core geometry and corpus sessions: [theory-orientation.md](theory-orientation.md).
- Long-running tests, simulations, rebuilds, and analytical campaigns: [long-running-test-heartbeats.md](long-running-test-heartbeats.md).
- Simulation protocol ownership and handoff routing: [simulation-protocol-routing-index.md](simulation-protocol-routing-index.md). This is internal operations documentation, not a product application or evidence authority.
- Retention of large generated and machine-readable records: [machine-artifact-retention.md](machine-artifact-retention.md).
- Plain-language explanation in operator-facing output: [operator-explanation-standard.md](operator-explanation-standard.md).
- Textbook reading-copy and PDF regeneration: [textbook-review-exports.md](textbook-review-exports.md).
- Closure curation (milestone corpus reorganization and the volume-split plan): [closure-curation-procedure.md](closure-curation-procedure.md).

Research Lead procedures and historical checkpoints live in [Research Office](../research-office/research-lead/research-lead.md). Do not treat them as general Codex task-start guidance unless the operator/developer explicitly requests that workflow.

The living operator feedback checklist is [README-op.md](README-op.md). Keep detailed procedures here, but put recurring one-line operator improvement tasks in that checklist.
