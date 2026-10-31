# Operator Explanation Standard

This document owns operator-facing response structure, questions, corrections, live maintenance of working documents, and recommended next actions. **Writing style is defined by the [academic style guide](../../content/markdown/aaa/archie/academic-style-guide.md).** Its academic standard applies equally to the ideas explained in the thread and to their durable working documents, so substantive prose can be prepared for eventual corpus promotion.

## Import

**Every content rule in that guide applies to operator-facing output and to every operator-facing Markdown artifact that carries technical or theory information.** The current imported edition is **1.1**. When the guide advances an edition, the new edition governs; update the edition number recorded here and review this document for consistency. That guide is the single authority for audience, plain-by-default prose, what an explanation must do, definition at first use, clarity and the cost of repetition, scope of assumed knowledge, structure, and the expected tools of analogy, worked numbers, signposting, and picture-before-symbol.

The import is wholesale and is not restated here, because a summary would drift from its source. Read the style guide. Technical or theory content does not receive a lesser prose standard because it appears in `reference/`, a dormant lane, a queue, a brainstorming file, a work log, a requirements packet, a design record, a prompt, or an operator report. Artifact purpose still controls structure, chronology, lifecycle fields, and appropriate density. This document adds only what a published textbook has no use for.

### Audience and review surfaces

The academic style guide’s audience rule applies to the material’s purpose. A full academic treatment prepared in a working document is an explanatory reference for its intended eventual reader, even while it lives under `reference/`. Its location does not make the operator’s knowledge or this conversation available to that reader. Operational records accompanying the treatment retain their own audience and structure.

| Surface | Reader and purpose | Required explanation |
| --- | --- | --- |
| Chat response | The operator, following the current discussion | Lead with the result, explain what the operator needs to assess it, and name a decision or next step only when useful. Follow [Next possible actions](#next-possible-actions) when a choice is actually needed. |
| Academic treatment in a working document | The intended eventual reader, independently of the chat | Complete definitions, assumptions, reasoning, equations, evidence, and limitations needed to understand and assess the subject |
| Agent supporting records | Repository agents continuing or checking the work | Source inventories, exact identities, execution checkpoints, detailed validation and handoffs. Agents maintain these records and bring consequential findings into the standard files. |

In chat, established shared knowledge may shorten the explanation when comprehension is preserved. In the full academic treatment, do not omit necessary definitions or reasoning because the operator already knows them or has just used a term. Use the academic guide’s chapter and explanatory-reference audience rules for material intended for corpus promotion. Define the concepts and symbols the eventual reader needs, and make assumptions and evidence boundaries explicit. An operational queue row may link to that treatment; the treatment must not require reconstruction from queue entries or chat history.

## Document preview default

When Codex or Claude presents a Markdown document to the operator in a side or right-hand panel, prefer the application’s rendered Markdown preview (pretty-print mode), including KaTeX-rendered equations, rather than the raw Markdown editor. Use the existing preview control when available; source view remains appropriate when the operator asks to inspect or edit markup. This is a presentation preference and does not authorize changing document content.

Ordinary document viewing does not require creating a PDF, screenshot, HTML export, or separate rendering pipeline. Use those deliverables only when requested or when an established task needs them. The architrino-math-preview skill is for cases where the normal preview is inadequate, not an automatic step for every document containing equations. If the application does not expose a usable rendered preview or its equations do not render, state that specific limitation and offer the smallest suitable alternative; do not silently substitute a PDF or claim that opening a source file enabled preview.

## Scope

This standard governs the agent’s chat responses and the ongoing maintenance of the operator-facing working documents affected by the discussion. Substantive ideas, explanations, findings, and decisions are recorded and organized in their appropriate documents so the operator can read the current account without reconstructing the conversation. The academic style guide defines writing style for both surfaces. Chat response mechanics, including the final action list, apply to responses; working documents retain the structure required by their purpose.

Choose the appropriate destinations according to the material and the task:

- **Working documents:** Keep the existing subject owner and standard priority files current when the discussion produces a useful finding, decision, developed explanation, or accepted task. Ordinary discussion does not require a new document or a full academic treatment of every idea. Develop explanations to the depth their subject and reader require, using the academic style guide.
- **Reader-facing corpus:** When the task authorizes changes under `content/markdown/aaa`, write ready corrections, improvements, or insights directly into the appropriate document. Follow the corpus authoring and promotion rules; an intermediate working copy is not required for material already ready for publication.
- **Application content:** When the task authorizes application changes, update the relevant content. Use the academic style guide for substantive explanations and the UI guidance named below for interface wording and controls.
- **Edit boundaries:** Routine discussion capture authorizes maintenance of working documents. It does not, by itself, expand the task to include corpus or application edits. Use authority already granted by the task without asking again, and respect explicit read-only instructions.


Historical evidence, append-only chronology, exact quotations, generated artifacts, code, commands, schemas, identifiers, and machine-readable records retain their preservation rules. Existing protected bytes are not rewritten for tone; academically written framing, companion synthesis, and new entries carry the explanation when clarification is needed.

Three neighbouring authorities own different material and are not consolidated here: the [mathematics style guide](../../content/markdown/aaa/archie/mathematics-style-guide.md) owns notation, [terminology usage](../../content/markdown/aaa/archie/terminology-usage.md) owns project vocabulary, and the [UI guidelines](../../content/markdown/aaa/archie/ui-guidelines.md) own end-user wording. Terminology rules in AGENTS.md, including the canonical name of the EOM solver and the ban on causal-delay variants, are terminology rather than response shape.

AGENTS.md, CLAUDE.md, the generated startup router, the Codex prompt template, the Research Office prompt library, and the repository skills all point here and restate nothing. CLAUDE.md carries a short pre-read floor, because a session must behave correctly before it reaches this file; that floor is the only authorized restatement, it is labeled as one, and it is deliberately narrower than what is written here.

## Registers

Every register follows the same academic content standard. The registers vary explanatory density and response shape, not rigor, terminology, claim authority, or evidence discipline:

| Register | Typical output | Density |
| --- | --- | --- |
| Explainer | Walking through a settled result, an imported framework, or a term the operator has asked about | Explain the mechanism and necessary definitions at the depth the question requires. Apply the academic guide’s explanation tools where they improve comprehension. |
| Adjudication | Priority packets, findings reports, theorem targets, review dispositions | High for imported apparatus and for the verdict; formal statements stay precise and are explained immediately after. Claim grades and falsifiers are mandatory. |
| Correction | Superseding an earlier statement | Explainer density, plus an explicit statement of what was wrong, why, and what downstream conclusions change. |
| Status | Completion notices, closeouts, short answers, "the file is written" | Outcome first, followed by the evidence and limitations needed to assess it. A technical status may be brief when that suffices; expand any dependency that needs explanation. |

Choosing the register is part of writing the response. A response that mixes them — a status line followed by an explainer — is normal, and the density changes accordingly. No register exempts technical or theory-bearing content from the academic style guide.

## Flexible response structure

Lead with the answer or outcome, develop the reasoning and evidence needed to assess it, and identify material limitations or decisions. Include only the parts relevant to the request. A direct answer may need a paragraph; a derivation may need a sustained explanation. Lists and tables serve parallel items or comparisons; they are not mandatory report sections.

There is no separate completion-report template. Completion uses the same flexible structure, with changes, validation, and remaining limitations included when they matter. Avoid repeating the outcome in an executive summary, a completed-work list, and a closing recap.

Progress updates explain a meaningful finding, change of direction, or unresolved dependency. They need no closing block. Final responses state the outcome, material limits and any useful next step; use an action list only under the rule below.

## Explanation length and the primary review surface

The chat response presents the main result, its significance, and any decision needed, with enough explanation to support the current discussion. Link directly to the document and section containing the full academic treatment, whether it is a working document or an authorized reader-facing update. Omit background the operator already holds only from the chat response, and only when doing so preserves comprehension. Expand the thread explanation when the operator asks to work through the reasoning there.

The document containing the full treatment is the primary review surface for the explanation. It provides a self-contained academic treatment for its intended eventual reader: definitions, assumptions, reasoning, equations, evidence, and limitations. Do not omit necessary material because it appeared in the chat or because the operator knows it. Completeness is measured against the subject and its evidence obligations, not the amount needed for an immediate chat decision. Additional development information may accompany the treatment, clearly separated according to its purpose.

When the task authorizes reader-facing edits and a correction, improvement, or insight meets the applicable mathematical, evidentiary, and publication standards, the thread agent may write it directly into the appropriate reader-facing document. No intermediate working-document copy or separate promotion pass is required merely to satisfy discussion capture. Confidence alone does not establish readiness; preserve the supported claim level and any required review boundary. Keep development notes, decisions, and validation history in their non-reader-facing owners, and link the completed corpus treatment from the relevant priority entry. Material that is not ready for publication continues to develop in the working documents.

Both surfaces follow the academic style guide. Their difference is the amount of the treatment presented and where it is reviewed. A concise thread response does not justify an abbreviated academic treatment, and a complete document does not justify an unexplained verdict in the thread.

## Instruction precedence

This document governs response mechanics within higher-priority instructions and the operator’s explicit task direction. Repository guidance does not override system or developer instructions. A default brevity preference does not justify an explanation the operator cannot follow.

## Live discussion and priority capture

Maintain the information the operator needs in the existing standard files: `priorities.md` for the objective and current state, `work-queue.md` for accepted work and completion conditions, `manuscript.md` for the coherent subject account, and `brainstorming.md` for provisional ideas. Keep chronology in `work-log.md`. The [priority guidance](../priorities/README.md#operator-files-and-agent-supporting-records) owns their detailed responsibilities and the placement of agent records. The operator should be able to understand current findings and direct work from these files without reconstructing chats, receipts or handoffs.

This is standing authority to integrate useful changes into existing working owners within the task's scope. It is not a requirement to transcribe every conversation or create a document for each question, review, checkpoint or completion. A finding is integrated when the existing files explain its significance, evidence grade and remaining consequence; a link alone is insufficient. Full scientific arguments remain complete in their manuscript or established derivation owner.

Agents own continuity and supporting records. Keep exact source identities, coverage inventories, raw validation output and restart details in their established supporting owners, using ignored local storage where the retention policy permits. These records are accessible to successor agents and linked from the relevant task or log when needed. They do not form a second task queue or conceal an accepted decision, material uncertainty or blocker from the operator.

An explicit read-only or no-file-edit instruction takes precedence within its stated scope. Do not treat a request for an explanation or review as an automatic exemption from capture. A restriction on editing the reviewed document still permits capture elsewhere when that is within the request’s boundaries; a restriction on all repository writes does not. When capture is prohibited or unavailable, provide the proposed capture and destination in the thread and state the limitation. Acknowledgments, transient logistics, and information already recorded accurately need no duplicate artifact.

### Choosing the documents to update

Update the existing document that owns the subject. Read the relevant guidance and the live owner before editing; document ownership is determined by responsibility, not by which directory is easiest to append to. Use the [priority guidance](../priorities/README.md) to organize priority material. The following destinations preserve that organization while covering working documents beyond priority directories:

| Material discussed | Destination |
| --- | --- |
| A publication-ready correction, improvement, or insight within the task’s reader-facing edit authority | The appropriate reader-facing document, with development records retained in non-reader-facing owners |
| Developed explanation or derivation | Integrate into `manuscript.md` or its existing derivation owner at the supported grade |
| Provisional idea or alternative | `brainstorming.md`, with enough reasoning to assess it; promotion to accepted work is a separate decision |
| A procedure or accepted operating decision | The document that owns that procedure or decision; proposals remain visibly provisional in working material until accepted |
| Current priorities and unresolved choices | `priorities.md`, with a readable synthesis and links to the full account |
| Accepted executable work | `work-queue.md`, following the priority guide’s acceptance and ranking rules |
| Chronology and validation history | `work-log.md` or the existing evidence record |

Keep the tracker concise: explain the present objective, strongest findings, main limitation and next accepted work. Put the substance in the standard file that owns it, rather than appending a second account to every file. Before creating a supporting document, identify its standing question or concrete consumer and explain why an existing owner cannot hold it. A new session, reviewer, date or status update alone does not justify a new file. Use the existing work log for a short review disposition or completion entry. Do not create a competing owner or a separate completion report.

### Keeping the discussion and documents current

- **Integrate useful outcomes.** Before reporting completion, update the standard files affected by the result. Preserve developed reasoning in its subject owner, provisional alternatives in brainstorming, and accepted tasks in the queue. Transient discussion and already recorded information need no duplicate capture.
- **Organize when capturing.** Integrate by subject, dependencies, and established priority rules. Merge duplicates, connect related ideas, and revise the current synthesis as understanding changes. Preserve concurrent work; reread the exact live passage before patching shared documents.
- **Preserve status and authority.** Distinguish proposals, accepted decisions, open questions, rejected ideas, and deferred work. Capture does not accept a claim, authorize implementation, change a score, reactivate a deferred task, or grant permission to alter controlled canon. Preserve assumptions, evidence limits, claim grades, and falsifiers where relevant.
- **Keep both surfaces consistent.** Keep the thread’s result, scope, and limitations faithful to the full treatment. State corrections explicitly in the thread and update the current written account. Preserve earlier evidence and chronology in their proper records. Link the affected owner and priority entry so the operator can review the organized material directly.
- **Respect preservation and access.** Keep generated artifacts, protected evidence, and append-only history under their existing rules. Explain any actual write limitation and never claim a document was updated when it was not.

Keep open questions, alternatives, operational status, decisions, and validation history clearly separated from the academic treatment. Subsequent authorized promotion preserves prepared explanation at its honest claim level and leaves development records in their appropriate working locations. Academic prose alone does not establish mathematical or evidentiary readiness for promotion.

### Research checkpoint and handoff completion

Before reporting a substantive research milestone, handoff or completion, reconcile the existing operator-facing research account with the evidence obtained. State the current findings, assumptions, verification status, limitations and unresolved questions, and link the supporting artifacts. Include negative, failed and inconclusive results when they affect the conclusion. Update the owning synthesis/manuscript and affected status surfaces within authority; a work-log append or chat summary alone does not complete integration. Keep frozen subject/reference outputs and original observations unchanged, documenting corrections and supersession in accompanying records.

Each researcher integrates findings within its assigned scope; the coordinator integrates workers' results into the existing account. Agents manage continuity and supporting evidence, resolve routine reconciliation themselves, and surface incomplete integration or missing evidence when it affects a conclusion or blocks work. A read-only worker returns precise findings and receiving paths without violating its write boundary. At meaningful checkpoints and before closeout, apply the [evidence retention requirements](machine-artifact-retention.md#preservation-from-creation-through-closeout). Lack of a separate backup is not an incomplete handoff when the retention owner's accepted local-storage conditions are satisfied. Use existing records, not a separate reporting system. The publication runner verifies scoped integration and retention; a validator pass does not establish either obligation.

## Action-item status display

In operator-facing plans and checklists, show a status marker beside every current actionable item, including detailed table rows and nested tasks, rather than only in a summary checklist. Use a short legend: ✓ Done, ◐ Partial, ○ Not done. Add an explicit Deferred or Blocked label when applicable; these are not completion states. Pair the marker with readable status text so meaning does not depend on the symbol alone. Keep the underlying queue lifecycle vocabulary and required removal of completed live tasks intact. Retained completion records may show ✓ Done.

Mark an item done only when its full stated scope and completion evidence are satisfied. For a partial item, name the remaining condition and link to the evidence where useful. Keep detailed items and summaries consistent as work advances. Standing rules and explanatory paragraphs are not actionable items and do not need status markers.

## Next possible actions

End with a useful next step only when one exists. State a single recommendation directly; use `Next possible actions:` and a numbered list only when the operator has materially different choices to make. Give a recommendation and brief reason for each choice. A completed task needs no menu of further reviews or administrative work.

Bring the operator decisions requiring their judgment: scientific or scope choices, competing goals, substantial commitments, or actual permission boundaries. Resolve routine evidence navigation, bookkeeping, reconciliation and already-authorized dependent work autonomously. For a required decision, state what is needed and what remains blocked. Optional suggestions do not create approval gates. An interesting open question stays in brainstorming until selected; it does not automatically become another queue item or suggested task.

Keep outstanding decisions and blockers in their standard owners. Mention them in chat when relevant to the present request, without repeating the whole backlog. Do not repeat completed work as possible next actions or add a ceremonial recommendation to take no further action.

There is no separate `Open items:` block or required `Closure goal:` line. Generated and recommended prompts begin directly with a concrete task; no fixed opening label is required. Provide a detailed reusable prompt only when it helps the operator act, rather than expanding every next action into a full prompt.

## Agent and task names

When working a numbered item such as `ABC-012`, begin every associated agent name and task/thread title with the item's identifier in lowercase, followed by a concise role or purpose: `abc-012 HQ`, `abc-012 implementation`, or `abc-012 geometry review`. Apply the same prefix to coordinators, delegated workers, independent reviewers, follow-up tasks, and handoffs. Preserve an explicitly requested full name and carry its item prefix into subsequent launches. Work without an assigned item identifier uses a descriptive name; do not invent a queue item merely to name an agent.

The launching coordinator checks the prefix before dispatch and includes the item identifier in the worker's assignment. Keep a Specialist's role-file basename as its role identity, separate from the prefixed launch name. If a tool accepts only underscores in machine identifiers, use the equivalent `abc_012_` prefix there and retain `abc-012` in the display title and assignment. Verify any returned or automatically normalized display title and correct it when the tool supports renaming.

When continuing an existing item, correct unprefixed active task titles within that item's coordination scope. If a running sub-agent has an immutable name, preserve its execution and record its stable ID beside the prefixed assignment label; subsequent launches use the required prefix. Naming changes do not authorize creating additional tasks, restarting work, or renaming unrelated tasks. These names identify work in task lists and records; prompts still begin with the concrete task rather than a salutation.

## Response mechanics

- **Ask only necessary questions.** Bundle closely related clarifications when they can be answered together; separate dependent decisions so the operator can assess each. Put the recommended choice first when fixed choices help, and use open discussion for nuanced decisions. Distinguish a recommendation from a request for permission; do not ask again for work already authorized.
- **Do not address the agent by name** in prompts or operator communication. Start directly with the task. When a role label is useful, use `Principal Proof Architect & Integrator`; the fuller role description lives in [the CTO role file](../office-of-research/cto/cto.md).
- **In closeouts, distinguish scoped edits from ambient multi-agent worktree state.** Avoid generic warnings such as "the broader working tree has additional user changes" unless those changes alter the next action. The operator runs many agents in one checkout, so a dirty tree is normal and reporting it as an incident wastes attention.
- **Do not surface branch/PR-process work during ordinary development.** Staging, commits, pushes, generator `--write` regeneration, pull requests, merges, branch deletion, and rollover belong to an operator-invoked [pr-lifecycle.md](git/pr-lifecycle.md) run, which resolves them within its own procedure. Generated drift in a target that the procedure regenerates from a source the current task edited is an expected consequence of editing, not a finding. Record it where that procedure will consume it and continue. Do not report it as an operator-facing result and do not offer it as a next possible action, unless it blocks the current task or the operator has invoked the procedure.
- **Do not use the phrase `instead of guessing`** in operator-facing communication.
- **Correct your own numbers explicitly.** When a figure, count, or claim in an earlier response turns out to be wrong, say so plainly, give the corrected value, and say what conclusion changes. Silently restating a corrected number is worse than the original error, because it removes the operator's ability to notice the correction.
- **Measure before asserting a quantity.** Any count, size, or scope figure offered to the operator is measured when it is written, not recalled from an earlier turn or estimated from a related figure. Aggregating two previously measured numbers into a third is a common way to produce a wrong one.
- **Keep one track per thread.** When a request would mix an unrelated workstream into a conversation, say so and offer to split it before doing the work. Interleaving two tracks produces a conversation that must be mined later instead of a set of changes that stand on their own. An instruction to do the work is not itself a judgment that the tracks belong together.

## Composition with other rules

The claim-grading, falsifier, layer-discipline, and terminology rules in AGENTS.md are unchanged and compose with this standard. Operator comprehension is part of verification: an explanation the operator can independently check is safer than an opaque correct-looking result.

A closing recap is permitted but never substitutes for explanation delivered as the response goes along. A response whose only comprehensible content is its final paragraph is non-compliant.

## Short examples

These examples illustrate response mechanics and routine working-document capture; their placeholder findings are not project evidence.

### Explanation

“The condition excludes this case because [mechanism and necessary reasoning]. Its scope is [assumptions and limitation]. The full academic treatment is in [working document and section], with the open question indexed in [owning priority entry].”

### Completed edit

“Updated [document] to implement [accepted decision]. [Relevant check] passed. The decision and its supporting material are recorded in [owning priority entry].”

### Review

“[Finding] follows from [source evidence]. I recommend [change] because [reason]. The proposal is recorded as unresolved in [owning priority entry].”

Next possible actions:

1. Discuss the proposed change. Recommendation: resolve [specific choice] first; implementation depends on it.
2. Explore [optional extension]. Recommendation: defer until [condition]; it does not block the current decision.

### Correction

“My earlier statement [claim] was incorrect because [reason]. The supported statement is [correction], which changes [consequence]. I updated the current synthesis in [owning priority entry] and preserved the earlier evidence record.”

## Self-check

1. The response answers the request directly and follows the academic style guide.
2. The chat supports the immediate discussion and links directly to the full treatment; the working document supplies the complete academic explanation for its intended eventual reader, independently of the chat.
3. Useful findings, decisions and accepted work are integrated into existing standard owners. Agent supporting records contain continuity detail; transient or already-recorded discussion has not produced duplicate artifacts. Explicit read-only boundaries are respected.
4. Proposals, decisions, deferred work, and accepted tasks retain their actual status and authority.
5. Reported quantities were verified, corrections are explicit, and validation claims name checks actually performed.
6. The final response names a next step only when useful. A numbered action menu appears only for material operator choices, with a recommendation and reason; routine dependent work has been completed autonomously.
7. No separate completion report or repeated closing summary is needed to understand the response.

## Existing documents

Existing explanatory documents must meet the academic style guide, including those in inactive workstreams. Bring them into compliance through scoped, reviewable edits. This requirement does not authorize a repository-wide rewrite or reactivate deferred work.

Improve the explanation while preserving exact mathematics, technical meaning, evidence limits, claim grades, sources, task status, chronology, provenance, working links and anchors, and the document’s purpose. Generated files follow their generation procedures. Protected historical records retain their original content; add clarification in accompanying prose when needed.

For example, when revising a passage with an old `Plainly:` label, integrate its useful explanation into the surrounding academic prose. Removing the label alone does not improve the explanation, and useful content must not be discarded merely to remove the old format.
