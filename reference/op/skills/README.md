# Repository Skills Policy

This document owns repository skill authoring and maintenance policy. Repository startup and task authority remain governed by [AGENTS.md](../../../AGENTS.md). A skill makes a class of requests discoverable and directs the agent to the live knowledge and procedures needed to perform it.

## Canonical Definitions

Maintain each skill's full instructions here in `skill-<skill-name>.md`. Codex discovers `.agents/skills/<skill-name>/SKILL.md`, which contains only its name, trigger description, and an instruction to read the current owner here. Both locations are repository sources, with distinct responsibilities: discovery in `.agents`, maintained instructions in this directory. Move instructions rather than copying them between these locations. Metadata and executable helper resources remain in the discovery package; detailed research procedures remain with their existing live owners.

| Skill | Maintained instructions | Codex discovery file |
| --- | --- | --- |
| Corpus convergence and source mining | [skill-aaa-corpus-advancement.md](skill-aaa-corpus-advancement.md) | [SKILL.md](../../../.agents/skills/aaa-corpus-advancement/SKILL.md) |
| Corpus review and feedback | [skill-corpus-review-workflow.md](skill-corpus-review-workflow.md) | [SKILL.md](../../../.agents/skills/corpus-review-workflow/SKILL.md) |
| Research brainstorming | [skill-research-exploration.md](skill-research-exploration.md) | [SKILL.md](../../../.agents/skills/research-exploration/SKILL.md) |
| Mathematical preview | [skill-math-preview.md](skill-math-preview.md) | [SKILL.md](../../../.agents/skills/math-preview/SKILL.md) |

## Authoring and Authority

Keep purpose, trigger scope, live owner links, required owner reads, and uniquely owned tool procedures in the skill. Do not copy evolving equations, scientific conclusions, proof status, priority order, terminology definitions, shared style rules, approval requirements, or workflow quotas from another owner. Read scientific examples from their current source when needed; historical examples remain explicitly historical evidence rather than current operating premises.

Apply this rule to every instruction-bearing surface: the maintained instruction files here, `SKILL.md` frontmatter and pointer, `agents/openai.yaml` descriptions and default prompts, references, templates, and script output. Metadata describes the task class and routing purpose without embedding a scientific conclusion or a shared procedural rule. A skill-specific tool workflow may retain the operational instructions it actually owns.

Read the selected live owner before dependent work. Reread it after an accepted change, an observed conflict, or evidence that the loaded copy is stale. The designated repository source owner resolves stale repository skill wording, subject to the user's instructions and higher-priority host requirements. Report conflicting passages, correct the duplicate within authorized scope, and continue unaffected work. If the owner is unavailable or the authority conflict remains unresolved, identify the affected dependency; do not substitute remembered skill wording as current authority.

## Maintenance

Review instantiated project skills monthly and when a referenced procedure, canonical path, terminology policy, or skill-owned helper changes. Include affected metadata and supporting resources in change-triggered review. A corpus change does not require a skill edit when its routing remains valid and carries no copied assumption. Use [OPS-027](../../priorities/aaa-operations/work-queue.md#ops-027--periodic-project-skill-maintenance) for the next maintenance pass and the [operations work log](../../priorities/aaa-operations/work-log.md) for completed passes. The cadence is a maintenance obligation, not an automatically scheduled job.

Validate metadata and referenced paths using existing tools. Separately review whether any instruction imposes a rule owned elsewhere or assumes outdated theory. After routing or instruction changes, exercise representative review, integration, brainstorming, source-mining, and preview requests, checking selected owners and action boundaries. Distinguish a written walkthrough from an actual agent execution. A disposable case with a changed owner rule may test stale-instruction handling; never mutate live canon for this purpose. Structural checks and passing behavioral examples provide bounded evidence, not a guarantee against future drift.

Keep this policy reachable through repository startup. Link to it rather than copying its rules into every skill or prompt. General-purpose plugin skills remain outside repository ownership: report relevant conflicts and use their supported maintenance mechanism; a cache edit is not a durable project fix.
