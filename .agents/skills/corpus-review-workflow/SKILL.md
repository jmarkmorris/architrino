---
name: corpus-review-workflow
description: Use when reviewing Architrino corpus material, assessing or integrating review feedback, verifying closure, or reviewing a theorem target. Routes the request to the live CTO review prompts.
---

# Corpus Review Workflow

Select the review procedure by the requested outcome. Follow the repository [startup instructions](../../../AGENTS.md), then read the matching live owner before acting.

| Request | Live owner |
| --- | --- |
| Review a corpus directory in reading order | [Corpus reviewer](../../../reference/research-office/cto/prompts/corpus-reviewer.md) |
| Assess whether supplied comments are correct or worth applying | [Review comment assessor](../../../reference/research-office/cto/prompts/review-comment-assessor.md) |
| Apply supplied feedback and review the full target document | [Integrator reviewer](../../../reference/research-office/cto/prompts/integrator-reviewer.md) |
| Check whether edits resolved a prior review | [Review closure verifier](../../../reference/research-office/cto/prompts/review-closure-verifier.md) |
| Examine a named theorem, equation stack, or proof gap | [Core geometry theorem reviewer](../../../reference/research-office/cto/prompts/core-geometry-theorem-reviewer.md) |

The selected owner governs review coverage and write authority. Assessment and verification do not imply permission to integrate changes. Directory review retains its one-file-per-turn boundary unless the user changes it. Use the request and current context to distinguish assessment from implementation; ask only when the intended action remains unresolved.

For active corpus convergence or source mining, use [the convergence procedure](../../../reference/research-office/cto/prompts/convergence-campaign.md). For open-ended idea exploration, use [brainstorming](../../../reference/research-office/cto/prompts/brainstorming.md). The [operator explanation standard](../../../reference/op/operator-explanation-standard.md) and [academic style guide](../../../content/markdown/aaa/archie/academic-style-guide.md) govern responses, capture, and exposition.
