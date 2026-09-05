# Operator Explanation Standard

This document owns operator-facing response structure, questions, corrections, live priority capture, and recommended next actions. **Writing style is defined by the [academic style guide](../../content/markdown/aaa/archie/academic-style-guide.md).** Its academic standard applies equally to the ideas explained in the thread and to their durable priority material, so substantive prose can be prepared for eventual corpus promotion.

It owns none of the content rules. Those live in the [academic style guide](../../content/markdown/aaa/archie/academic-style-guide.md), which this document imports wholesale.

## Import

**Every content rule in the [academic style guide](../../content/markdown/aaa/archie/academic-style-guide.md) applies to operator-facing output and to every operator-facing Markdown artifact that carries technical or theory information.** The imported edition is **1.1**; when that guide advances an edition, this import follows it without needing an edit here. That guide is the single authority for audience, plain-by-default prose, what an explanation must do, definition at first use, clarity and the cost of repetition, scope of assumed knowledge, structure, and the expected tools of analogy, worked numbers, signposting, and picture-before-symbol.

The import is wholesale and is not restated here, because a summary would drift from its source. Read the style guide. Technical or theory content does not receive a lesser prose standard because it appears in `reference/`, a dormant lane, a queue, a brainstorming file, a work log, a requirements packet, a design record, a prompt, or an operator report. Artifact purpose still controls structure, chronology, lifecycle fields, and appropriate density. This document adds only what a published textbook has no use for.

### The audience rule applied to operator output

The style guide's audience rule is a test, not a fixed answer: **define what the reader of this artifact plausibly lacks.** Its table assigns a reader to each artifact class. Two rows govern operator-facing work, and this is the row the table does not have room to state, since chat is not a corpus surface:

| Artifact class | Reader | May assume | Must define |
| --- | --- | --- | --- |
| Priority packet, analysis, findings report | Operator and repository agents | $\mathbb{A}\mathbb{A}\mathbb{A}$, repository vocabulary | imported apparatus, material from another lane |
| Chat response | The operator | $\mathbb{A}\mathbb{A}\mathbb{A}$, repository vocabulary, this thread | imported apparatus, anything load-bearing |

So operator-facing output assumes the theory and defines the imports. Architrinos, causal roots, path history, wake, polarity, the transmitter-side row, the master equation, absolute time, the Euclidean void, and claim grading need no introductory tutorial; the operator knows them better than the agent does. They are still restated in a clause when their meaning carries the local argument. Anything brought in from outside — a class of differential equation, a geometric construction, a numerical method, a term of art such as *secular* or *areal rate* or *codimension* — is defined completely, in place.

The style guide's three refinements apply unchanged and matter most here. The **load-bearing override** means a term decisive for the claim being made right now gets a restating clause even though the operator knows it. **Never define a term the operator has just used**: if it appeared in their message, they hold it. And **redundancy cost scales with the artifact**, so a chat response tolerates an unneeded definition far better than a corpus chapter does.

One surface difference changes what a rule requires rather than whether it applies. Corpus prose carries `View →` links into the equation viewer, so a symbol needs only to be named in words where it is used. A chat response has no such channel, so there a symbol is defined in words wherever it appears.

## Scope

These mechanics apply to all operator-facing output from any agent working in this repository: chat responses, adjudications, findings reports, closeouts, milestone reports, completion reports, priority and analysis packets under `reference/priorities`, and the reporting sections of generated or recommended prompts. The imported academic content standard additionally applies to all authored operator-facing Markdown containing technical or theory information, including trackers, work queues, brainstorming documents, work logs, proof and evidence packets, requirements, designs, contracts, protocols, audits, and source-mining records.

They do not apply to reader-facing corpus prose under `content/markdown/aaa`, nor to end-user application chrome, which follows the [UI guidelines](../../content/markdown/aaa/archie/ui-guidelines.md). Those surfaces take the style guide's content rules without these mechanics.

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

Progress updates explain a meaningful finding, change of direction, or unresolved dependency. They need no closing block. A substantive final response closes with the numbered next-action list defined below. Acknowledgments and routine tool-progress notices are not substantive final responses.

## Length and precedence

Give enough explanation for the operator to understand and assess the answer. Expand where reasoning is necessary; omit background the operator already holds, repetition, and unrelated implications. Completeness is measured against the question and its evidence obligations. Do not shorten away a necessary derivation or add exposition merely because the subject is technical.

The academic style guide governs writing style and explanatory rigor. This document governs response mechanics within higher-priority instructions and the operator’s explicit task direction. Repository guidance does not override system or developer instructions. A default brevity preference does not justify an explanation the operator cannot follow.

## Live discussion and priority capture

Durable findings produced by a write-authorized task should be captured in the existing owning workstream as they are established. The thread still explains the result in full enough to follow it, while the tracker supplies an organized, current reading path for material that must outlive the conversation. A file link alone is not an explanation, and durable work left only in chat has not been captured.

Report-only reviews, read-only diagnostics, transient questions, and ordinary explanations do not authorize repository writes and do not require creation of priority material. Capture is also unnecessary when the information is already recorded accurately in its owner and the response adds no durable result. Do not manufacture an artifact merely because a conversation occurred.

- **Capture during the work when authorized.** When a task authorizes writes and produces a durable idea, finding, correction, recommendation, decision, or unresolved question within scope, update its owner before the final response. Do not defer authorized capture to a separate completion report.
- **Read and organize the owner.** Before capturing a finding, select the relevant workstream using the [priority guidance](../priorities/README.md), reread its live tracker, and integrate the material under the appropriate subject. Merge duplicates, connect related ideas, and revise the current synthesis as understanding changes. Preserve concurrent work and provenance. Organize by subject, dependencies, and established priority rules rather than by message arrival.
- **Keep captured ideas visible in `priorities.md`.** Include a readable statement of the idea, its significance, current disposition, and any decision or next step needed to understand its state. Use a stable heading or existing identifier when useful. A bare link or unexplained identifier is insufficient.
- **Use the existing document split.** The tracker holds the current synthesis and links to fuller academic explanation in `brainstorming.md` or a focused sibling document, executable tasks in `work-queue.md`, and dated provenance in `work-log.md`. Detailed material remains accessible from the idea’s tracker entry. Follow the priority guide for task acceptance, ranking, renumbering, completion, and cross-workstream routing.
- **Preserve status and authority.** Label proposals, accepted decisions, open questions, rejected ideas, and deferred work accurately. Recording an idea is not acceptance of its claim or authorization to implement it. Preserve assumptions, evidence limits, claim grades, and falsifiers where relevant. Do not silently promote a proposal or reactivate a deferred task.
- **Keep both surfaces consistent.** Corrections update the current priority synthesis and are stated explicitly in the response; preserve earlier evidence and chronology in their proper records. Link the affected tracker entry from the response so the operator can review the organized material directly.
- **Capture across lanes without inventing ownership.** Use each durable finding’s existing owner and link related entries. If no owner fits, report the ownership gap; create a new priority home only when the task authorizes that artifact. Do not create a separate completion report or an unorganized conversation transcript.
- **Respect authority and access.** If a write is outside the request, unavailable, or explicitly prohibited, keep the answer self-contained in the thread and identify any durable capture that remains advisable. Never claim a priority update was saved when it was not.

The academic style guide governs the explanatory material on both surfaces. Keep operational status and decision records separate from prose intended for publication, so promotion preserves prepared explanation and its honest claim level.

## Next possible actions

End every substantive final response with `Next possible actions:` followed by a numbered list. Each item states a concrete action, the agent’s recommendation for that action, and a brief reason. Put the preferred immediate action first. Recommendations may be to proceed, review, discuss, defer until a named condition, or take no further action.

Distinguish decisions required now from optional follow-ups. For a required decision, state what is needed and what remains blocked if it is deferred or declined. Optional suggestions do not create approval gates. Continue already-authorized work without stopping at an action menu.

When an owning priority artifact exists and the task authorizes writes, keep outstanding durable decisions recorded there until resolved. Carry current blockers into the numbered list; link deferred decisions when relevant rather than repeating an accumulating backlog. Do not repeat completed actions as possible next actions. When no useful continuation remains, use one numbered item recommending no further action and briefly explain why.

There is no separate `Open items:` block or required `Closure goal:` line. Generated and recommended prompts begin directly with a concrete task; no fixed opening label is required. Provide a detailed reusable prompt only when it helps the operator act, rather than expanding every next action into a full prompt.

## Response mechanics

- **Ask only necessary questions.** Bundle closely related clarifications when they can be answered together; separate dependent decisions so the operator can assess each. Put the recommended choice first when fixed choices help, and use open discussion for nuanced decisions. Distinguish a recommendation from a request for permission; do not ask again for work already authorized.
- **Do not address the agent by name** in prompts or operator communication. Start directly with the task. When a role label is useful, use `Principal Proof Architect & Integrator`; the fuller role description lives in [the CTO role file](../research-office/cto/cto.md).
- **In closeouts, distinguish scoped edits from ambient multi-agent worktree state.** Avoid generic warnings such as "the broader working tree has additional user changes" unless those changes alter the next action. The operator runs many agents in one checkout, so a dirty tree is normal and reporting it as an incident wastes attention.
- **Do not use the phrase `instead of guessing`** in operator-facing communication.
- **Correct your own numbers explicitly.** When a figure, count, or claim in an earlier response turns out to be wrong, say so plainly, give the corrected value, and say what conclusion changes. Silently restating a corrected number is worse than the original error, because it removes the operator's ability to notice the correction.
- **Measure before asserting a quantity.** Any count, size, or scope figure offered to the operator is measured when it is written, not recalled from an earlier turn or estimated from a related figure. Aggregating two previously measured numbers into a third is a common way to produce a wrong one.
- **Keep one track per thread.** When a request would mix an unrelated workstream into a conversation, say so and offer to split it before doing the work. Interleaving two tracks produces a conversation that must be mined later instead of a set of changes that stand on their own. An instruction to do the work is not itself a judgment that the tracks belong together.

## Composition with other rules

The claim-grading, falsifier, layer-discipline, and terminology rules in AGENTS.md are unchanged and compose with this standard. Operator comprehension is part of verification: an explanation the operator can independently check is safer than an opaque correct-looking result.

A closing recap is permitted but never substitutes for explanation delivered as the response goes along. A response whose only comprehensible content is its final paragraph is non-compliant.

## Short examples

These examples illustrate response mechanics for tasks in which durable capture is authorized; their placeholder findings are not project evidence.

### Explanation

“The condition excludes this case because [mechanism and necessary reasoning]. Its scope is [assumptions and limitation]. The explanation and open question are organized in [owning priority entry].”

Next possible actions:

1. Examine the remaining case. Recommendation: proceed; it is the unresolved part of the argument.

### Completed edit

“Updated [document] to implement [accepted decision]. [Relevant check] passed. The decision and its supporting material are recorded in [owning priority entry].”

Next possible actions:

1. Review the revised passage. Recommendation: review it now; it is ready for the requested operator review.

### Review

“[Finding] follows from [source evidence]. I recommend [change] because [reason]. The proposal is recorded as unresolved in [owning priority entry].”

Next possible actions:

1. Discuss the proposed change. Recommendation: resolve [specific choice] first; implementation depends on it.
2. Explore [optional extension]. Recommendation: defer until [condition]; it does not block the current decision.

### Correction

“My earlier statement [claim] was incorrect because [reason]. The supported statement is [correction], which changes [consequence]. I updated the current synthesis in [owning priority entry] and preserved the earlier evidence record.”

Next possible actions:

1. Reassess [affected conclusion]. Recommendation: proceed using the corrected premise.

## Self-check

1. The response answers the request directly and follows the academic style guide.
2. Reasoning, definitions, evidence, and limitations are sufficient without redundant exposition.
3. When the task produced a durable finding and authorized repository capture, the finding appears in both the response and an organized, current entry in its owner; report-only and transient answers did not create unnecessary artifacts.
4. Proposals, decisions, deferred work, and accepted tasks retain their actual status and authority.
5. Reported quantities were verified, corrections are explicit, and validation claims name checks actually performed.
6. The final response ends with numbered next possible actions, each with a recommendation and reason; necessary decisions are distinct from optional follow-ups.
7. No separate completion report or repeated closing summary is needed to understand the response.

## Existing documents

Documents written under the retired inline plain-language tag keep those passages unless a scoped rewrite improves the surrounding explanation. Do not run a mechanical tag-removal campaign; the objective is academic explanation, not deletion of a historical formatting habit.

New writing follows this standard and the style guide it imports. Existing authored Markdown whose purpose includes technical or theory information is also a conversion obligation, whether active or dormant. Carry out that work through reviewable editorial campaigns that preserve exact mathematics, technical meaning, evidence boundaries, claim grades, source support, queue state, chronology, provenance, functional anchors, and operational purpose. Generated artifacts and provenance-bearing historical bytes remain controlled by their own preservation rules rather than being rewritten for stylistic uniformity.
