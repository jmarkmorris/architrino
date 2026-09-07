# CTO Prompt Library

This directory holds reusable prompts for CTO-led repository work. Use it for prompts that are general enough to start future tasks without being tied to one historical run, one priority packet, or one generated artifact.

Every prompt in this directory follows [the operator explanation standard](../../../op/operator-explanation-standard.md) for response mechanics and live discussion capture, and the [academic style guide](../../../../content/markdown/aaa/archie/academic-style-guide.md) for writing style. Task-specific evidence and procedure requirements remain in their live owners; they do not establish a separate completion-report template.

The compact cross-agent startup map is generated at [../../../op/agent-startup-orientation.generated.md](../../../op/agent-startup-orientation.generated.md). Use the generated map for quick routing, then read the live prompt file selected for the task.

All prompts that select, review, or promote sources apply the [About Architrino reference policy](../../../../content/markdown/aaa/archie/about-architrino.md#sources-references-and-attribution) and [source-checking disclosures](../../../../content/markdown/aaa/archie/about-architrino.md#ai-assisted-research-and-review). Prompts may specify acquisition, verification, and reporting procedures, but must not establish a competing citation policy.

## Current Prompts

| Prompt | Use |
| --- | --- |
| [start-pi.md](start-pi.md) | Launch one Principal Investigator with a self-contained brief, claim boundary, live-owner routing, repository authority, and evidence-bounded return contract. |
| [start-research.md](start-research.md) | Guide a Principal Investigator in selecting and launching only the necessary role-based Specialists and integrating their reports. |
| [convergence-campaign.md](convergence-campaign.md) | Shared AAA corpus convergence protocol, including audit/report, edit-batch, self-running exploration, and team-agent variants. |
| [closure-scorecard-assessment.md](closure-scorecard-assessment.md) | Update a requested dated closure assessment; keep the editing procedure outside the reader-facing scorecard. |
| [corpus-reviewer.md](corpus-reviewer.md) | Review every file in an Op-provided directory in scene/textbook reading order, one file per turn. |
| [selective-reference-pass.md](selective-reference-pass.md) | Search the corpus for qualifying reference opportunities for up to 48 elapsed hours; verify and propose source notes without editing the corpus. |
| [integrator-reviewer.md](integrator-reviewer.md) | Integrate supplied review comments, then perform a full document closure review and improve the target as needed. |
| [review-comment-assessor.md](review-comment-assessor.md) | Assess pasted review comments against current repo canon without editing files. |
| [review-closure-verifier.md](review-closure-verifier.md) | Verify whether another agent's edits resolved a specific review, without editing files. |
| [core-geometry-theorem-reviewer.md](core-geometry-theorem-reviewer.md) | Request heavy mathematical review of one theorem target, equation stack, branch certificate, or proof gap. |
| [priority-lane-resume.md](priority-lane-resume.md) | Resume an existing `reference/priorities/` workstream from live state and make the next scoped progress step. |
| [corpus-promotion.md](corpus-promotion.md) | Aggressive-but-honest promotion pass: un-sequester high-quality priority/brainstorming/memory material into the corpus at honest claim grade, anticipating closure without claiming it. |
| [brainstorming.md](brainstorming.md) | Capture-first cross-lane brainstorming session: engage each idea at its strongest defensible claim level and capture every insight to the priority lane or memory. |
| [adjudication.md](adjudication.md) | Decision-hub session: judge finished work from parallel builder/analyst threads, hold claim levels honest, decide and parallelize next steps, and summarize for the operator in plain language. |

## Repository Skill Entry Points

Skills select these live procedures; they do not grant additional write authority. Choose by the requested outcome, using the current request and context to distinguish review, implementation, and exploration.

| Repository skill | Procedures selected |
| --- | --- |
| [Corpus Convergence and Source Mining](../../../../.agents/skills/aaa-corpus-advancement/SKILL.md) | Convergence campaigns, including their audit/report and exploration modes; source mining when requested |
| [Corpus Review Workflow](../../../../.agents/skills/corpus-review-workflow/SKILL.md) | Directory review; assessment of supplied comments; integration of feedback; verification against a prior review; focused theorem review |
| [Research Brainstorming](../../../../.agents/skills/research-exploration/SKILL.md) | Open-ended research discussion and provisional idea capture |
| [Math Preview](../../../../.agents/skills/math-preview/SKILL.md) | On-demand KaTeX presentation and visual verification |

The remaining prompts can be selected directly from this library. They do not require a dedicated skill merely because they are distinct workflows. A link to an external source does not by itself request source mining, and a request to assess feedback does not request its implementation.

## Related Procedure Owners

These procedures and specialized prompts retain their canonical homes. Link to their live owners rather than maintaining mirrored copies.

| Current file | Recommendation |
| --- | --- |
| [../../../op/codex-goal-seeking-prompt-template.md](../../../op/codex-goal-seeking-prompt-template.md) | General execution wrapper, owned in `reference/op/`. |
| [../../../op/codex-multiprompt.md](../../../op/codex-multiprompt.md) | General multi-thread procedure, owned in `reference/op/`. |
| [../../../op/source-mining-best-practice.md](../../../op/source-mining-best-practice.md) | Source-intake specialization with many source-family prompt addenda. Keep in `reference/op/` because it owns procedure, not only prompt text. |
| [../../research-history/review-packets/README.md](../../research-history/review-packets/README.md) and `reference/research-office/research-history/review-packets/*.md` | Historical self-contained review packets. Keep in place as review artifacts, not reusable prompt templates. |
| [../../../priorities/mapping-equations/equation-breakthrough-search-prompt.md](../../../priorities/mapping-equations/campaigns/equation-breakthrough-search-prompt.md) | Priority-specific live breakthrough-search prompt. It resolves queue state from the current tracker and score ladder instead of embedding a dated checkpoint. |
| [../../../learning-office/childrens-books/production/prompts/here-there-back-book-1-imagegen-prompts.md](../../../learning-office/childrens-books/production/prompts/here-there-back-book-1-imagegen-prompts.md) | Production asset prompts. Keep in the children's-books production lane. |

## Maintenance Rule

When a chat prompt becomes reusable, prefer adding it here instead of leaving it only in conversation. If the prompt belongs to a specific workstream, keep the workstream copy and add only a generalized version here.
