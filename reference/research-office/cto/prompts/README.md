# CTO Prompt Library

This directory holds reusable prompts for CTO-led repository work. Use it for prompts that are general enough to start future tasks without being tied to one historical run, one priority packet, or one generated artifact.

All reusable prompts in this directory should begin with `Closure goal:` and should avoid addressing an agent by name. Role labels and reviewer lenses may appear inside the prompt when they are useful context.

The compact cross-agent startup map is generated at [../../../op/agent-startup-orientation.generated.md](../../../op/agent-startup-orientation.generated.md). Use the generated map for quick routing, then read the live prompt file selected for the task.

## Current Prompts

| Prompt | Use |
| --- | --- |
| [start-pi.md](start-pi.md) | Launch one Principal Investigator with a self-contained brief, claim boundary, live-owner routing, repository authority, and evidence-bounded return contract. |
| [start-research.md](start-research.md) | Guide a Principal Investigator in selecting and launching only the necessary role-based Specialists and integrating their reports. |
| [convergence-campaign.md](convergence-campaign.md) | Shared AAA corpus convergence protocol, including audit/report, edit-batch, self-running exploration, and team-agent variants. |
| [corpus-reviewer.md](corpus-reviewer.md) | Review every file in an Op-provided directory in scene/textbook reading order, one file per turn. |
| [integrator-reviewer.md](integrator-reviewer.md) | Integrate supplied review comments, then perform a full document closure review and improve the target as needed. |
| [review-comment-assessor.md](review-comment-assessor.md) | Assess pasted review comments against current repo canon without editing files. |
| [review-closure-verifier.md](review-closure-verifier.md) | Verify whether another agent's edits resolved a specific review, without editing files. |
| [core-geometry-theorem-reviewer.md](core-geometry-theorem-reviewer.md) | Request heavy mathematical review of one theorem target, equation stack, branch certificate, or proof gap. |
| [priority-lane-resume.md](priority-lane-resume.md) | Resume an existing `reference/priorities/` workstream from live state and make the next scoped progress step. |
| [corpus-promotion.md](corpus-promotion.md) | Aggressive-but-honest promotion pass: un-sequester high-quality priority/brainstorming/memory material into the corpus at honest claim grade, anticipating closure without claiming it. |
| [brainstorming.md](brainstorming.md) | Capture-first cross-lane brainstorming session: engage each idea at its strongest defensible claim level and capture every insight to the priority lane or memory. |
| [adjudication.md](adjudication.md) | Decision-hub session: judge finished work from parallel builder/analyst threads, hold claim levels honest, decide and parallelize next steps, and summarize for the operator in plain language. |

## Prompt-Like Files To Consider Consolidating

These files contain reusable prompt material or prompt procedures. They were not moved during the initial consolidation because other repo guidance links to them or because they are specialized to a local workflow.

| Current file | Recommendation |
| --- | --- |
| [../../../op/codex-goal-seeking-prompt-template.md](../../../op/codex-goal-seeking-prompt-template.md) | High-value general wrapper. Consider moving or mirroring here after updating links from `reference/op/README.md` and other process docs. |
| [../../../op/codex-multiprompt.md](../../../op/codex-multiprompt.md) | General multi-thread procedure. Keep in `reference/op/` unless Op wants all Codex operating procedures mirrored here. |
| Retired `reference/op/research-lead-prompt-template.md` | Generalized here as [core-geometry-theorem-reviewer.md](core-geometry-theorem-reviewer.md). |
| [../../../op/source-mining-best-practice.md](../../../op/source-mining-best-practice.md) | Source-intake specialization with many source-family prompt addenda. Keep in `reference/op/` because it owns procedure, not only prompt text. |
| [../../research-history/review-packets/README.md](../../research-history/review-packets/README.md) and `reference/research-office/research-history/review-packets/*.md` | Historical self-contained review packets. Keep in place as review artifacts, not reusable prompt templates. |
| [../../../priorities/equation-mapping/equation-breakthrough-search-prompt.md](../../../priorities/equation-mapping/equation-breakthrough-search-prompt.md) | Priority-specific live breakthrough-search prompt. It resolves queue state from the current tracker and score ladder instead of embedding a dated checkpoint. |
| [../../../../content/markdown/aaa/validation/closure-scorecard.md](../../../../content/markdown/aaa/validation/closure-scorecard.md) | Reader-facing reusable assessment prompt embedded in its owning scorecard chapter. Keep local so scoring instructions remain self-contained. |
| [../../../learning-office/childrens-books/production/prompts/here-there-back-book-1-imagegen-prompts.md](../../../learning-office/childrens-books/production/prompts/here-there-back-book-1-imagegen-prompts.md) | Production asset prompts. Keep in the children's-books production lane. |

## Maintenance Rule

When a chat prompt becomes reusable, prefer adding it here instead of leaving it only in conversation. If the prompt belongs to a specific workstream, keep the workstream copy and add only a generalized version here.
