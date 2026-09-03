# Operator Explanation Standard

This document owns the **mechanics** of operator-facing output: register, response length precedence, the `Open items:` block, the `Closure goal:` line, question format, agent naming, closeout content, corrections, and the rule that substantive work happens in artifacts rather than in chat.

It owns none of the content rules. Those live in the [academic style guide](../../content/markdown/aaa/archie/academic-style-guide.md), which this document imports wholesale.

## Import

**Every content rule in the [academic style guide](../../content/markdown/aaa/archie/academic-style-guide.md) applies to operator-facing output.** The imported edition is **1.0**; when that guide advances an edition, this import follows it without needing an edit here. That guide is the single authority for audience, plain-by-default prose, what an explanation must do, definition at first use, clarity and the cost of repetition, scope of assumed knowledge, structure, and the expected tools of analogy, worked numbers, signposting, and picture-before-symbol.

The import is wholesale and is not restated here, because a summary would drift from its source. Read the style guide. This document adds only what a published textbook has no use for.

### The audience rule applied to operator output

The style guide's audience rule is a test, not a fixed answer: **define what the reader of this artifact plausibly lacks.** Its table assigns a reader to each artifact class. Two rows govern operator-facing work, and this is the row the table does not have room to state, since chat is not a corpus surface:

| Artifact class | Reader | May assume | Must define |
| --- | --- | --- | --- |
| Priority packet, analysis, findings report | Operator and repository agents | $\mathbb{A}\mathbb{A}\mathbb{A}$, repository vocabulary | imported apparatus, material from another lane |
| Chat response | The operator | $\mathbb{A}\mathbb{A}\mathbb{A}$, repository vocabulary, this thread | imported apparatus, anything load-bearing |

So operator-facing output assumes the theory and defines the imports. Architrinos, causal roots, path history, wake, polarity, the transmitter-side row, the master equation, absolute time, the Euclidean void, and claim grading need no introduction; the operator knows them better than the agent does. Anything brought in from outside — a class of differential equation, a geometric construction, a numerical method, a term of art such as *secular* or *areal rate* or *codimension* — is defined completely, in place.

The style guide's three refinements apply unchanged and matter most here. The **load-bearing override** means a term decisive for the claim being made right now gets a restating clause even though the operator knows it. **Never define a term the operator has just used**: if it appeared in their message, they hold it. And **redundancy cost scales with the artifact**, so a chat response tolerates an unneeded definition far better than a corpus chapter does.

One surface difference changes what a rule requires rather than whether it applies. Corpus prose carries `View →` links into the equation viewer, so a symbol needs only to be named in words where it is used. A chat response has no such channel, so there a symbol is defined in words wherever it appears.

## Scope

These mechanics apply to all operator-facing output from any agent working in this repository: chat responses, adjudications, findings reports, closeouts, milestone reports, completion reports, priority and analysis packets under `reference/priorities`, and the reporting sections of generated or recommended prompts.

They do not apply to reader-facing corpus prose under `content/markdown/aaa`, nor to end-user application chrome, which follows the [UI guidelines](../../content/markdown/aaa/archie/ui-guidelines.md). Those surfaces take the style guide's content rules without these mechanics.

Three neighbouring authorities own different material and are not consolidated here: the [mathematics style guide](../../content/markdown/aaa/archie/mathematics-style-guide.md) owns notation, [terminology usage](../../content/markdown/aaa/archie/terminology-usage.md) owns project vocabulary, and the [UI guidelines](../../content/markdown/aaa/archie/ui-guidelines.md) own end-user wording. Terminology rules in AGENTS.md, including the canonical name of the EOM solver and the ban on causal-delay variants, are terminology rather than response shape.

AGENTS.md, CLAUDE.md, the generated startup router, the Codex prompt template, the Research Office prompt library, and the repository skills all point here and restate nothing. CLAUDE.md carries a short pre-read floor, because a session must behave correctly before it reaches this file; that floor is the only authorized restatement, it is labeled as one, and it is deliberately narrower than what is written here.

## Registers

One standard does not fit every output. Four registers, each with its own density:

| Register | Typical output | Density |
| --- | --- | --- |
| Explainer | Walking through a settled result, an imported framework, or a term the operator has asked about | Highest. Every term defined, picture before symbol, analogies and worked numbers throughout, one idea per section. Length is not a concern. |
| Adjudication | Priority packets, findings reports, theorem targets, review dispositions | High for imported apparatus and for the verdict; formal statements stay precise and are explained immediately after. Claim grades and falsifiers are mandatory. |
| Correction | Superseding an earlier statement | Explainer density, plus an explicit statement of what was wrong, why, and what downstream conclusions change. |
| Status | Completion notices, closeouts, short answers, "the file is written" | Lowest. Outcome first, no exposition, no restated background. Do not pad a status with explanation the operator did not ask for. |

Choosing the register is part of writing the response. A response that mixes them — a status line followed by an explainer — is normal, and the density changes accordingly.

## Length and precedence

Total response length is not a constraint. Completeness of explanation outranks brevity. A long response that can be reviewed inline is preferred over a compact one that cannot be followed.

This governs work in this repository and **outranks any client-level brevity setting**, including a built-in `Concise` response style and any account-level or global instruction asking for shorter output. Those settings are configured outside this repository, are invisible to other agents working in the same checkout, and carry no repository authority. Where such a setting conflicts with this standard, this standard wins.

The Status register keeps that honest: short output is correct when a response carries no explanatory obligation. Length is earned by content, never spent restating what the operator already knows.

## Work in artifacts, not in chat

An insight that exists only in a chat thread is technical debt. It has no owner, no claim grade, no falsifier, and no path to promotion, and recovering it later costs more than writing it down would have. Substantive work therefore happens in a document that is either already an artifact or a candidate for eventual promotion, and the chat response reports what the document now says.

This is a working-mode rule, not only a writing rule. In practice:

- **Write first, report second.** When a session produces a result, a correction, an open question, or a design decision, it goes into the owning document in the same turn it is discovered. The response then says what changed and where, rather than being the only place the content exists.
- **A conversation is not a store.** Do not let a thread accumulate findings on the understanding that they will be captured at the end. Threads are interrupted, redirected, and abandoned, and a long thread that has to be mined afterwards has already failed.
- **Choose the destination before writing the content.** If no document owns the material, that absence is itself the first finding: say so and open the owning artifact.
- **Uncertainty is content.** An open calibration, an unresolved threshold, or a question the operator has not answered belongs in the document, marked as open. A document that records what is not yet known is more useful than one that is silent, and far more useful than a chat message saying the same thing.

## Open items and outstanding recommendations

Every substantive response ends with an explicit `Open items:` block listing what awaits an operator decision. This is the response's only channel for such requests. A recommendation, proposed action, or question that exists only inside prose does not count as having been raised, because prose is scanned and a request buried in it is a request the operator never received.

- **Carry live items forward.** An item stays in the block until the operator decides it or it is executed. Age is what makes an item easy to lose, so age is not grounds for dropping it.
- **File durable items; carry only live ones.** An item that will outlive the conversation belongs in the owning work queue, referenced by identifier. The block carries what blocks the current turn. An `Open items:` list that grows without bound recreates the problem it exists to solve, moving the mining from prose into a list.
- **Say what each item asks and what happens if it is declined.** An item the operator cannot act on without re-reading three earlier responses is not an item, it is a reminder to go looking.
- **Distinguish an item from a suggestion.** If no decision is needed it does not belong in the block. Padding destroys its value.
- **Never let the block be implicit.** When nothing is outstanding, write `Open items: none.` Absence is indistinguishable from forgetting.

`Open items:` is not `Closure goal:` and neither replaces the other. `Closure goal:` names the single objective the work drives toward and appears last. `Open items:` is the carried list of decisions blocked on the operator, and appears immediately before it.

## Response mechanics

- **Ask necessary questions one at a time.** Put fixed choices in ranked order with the preferred choice first and end with the explicit option prompt, such as `(y/n)` or `(a/b)`. Use open discussion instead when the decision is genuinely nuanced and a fixed-choice framing would distort it.
- **Close every substantive response with a concise `Closure goal:` line,** and open every generated or recommended prompt with one. It names the single objective the work is driving toward, not a summary of what was done, and it is the last line.
- **Do not address the agent by name** in prompts or operator communication. Start directly with the task or with `Closure goal:`. When a role label is useful, use `Principal Proof Architect & Integrator`; the fuller role description lives in [the CTO role file](../research-office/cto/cto.md).
- **In closeouts, distinguish scoped edits from ambient multi-agent worktree state.** Avoid generic warnings such as "the broader working tree has additional user changes" unless those changes alter the next action. The operator runs many agents in one checkout, so a dirty tree is normal and reporting it as an incident wastes attention.
- **Do not use the phrase `instead of guessing`** in operator-facing communication.
- **Correct your own numbers explicitly.** When a figure, count, or claim in an earlier response turns out to be wrong, say so plainly, give the corrected value, and say what conclusion changes. Silently restating a corrected number is worse than the original error, because it removes the operator's ability to notice the correction.
- **Measure before asserting a quantity.** Any count, size, or scope figure offered to the operator is measured when it is written, not recalled from an earlier turn or estimated from a related figure. Aggregating two previously measured numbers into a third is a common way to produce a wrong one.
- **Keep one track per thread.** When a request would mix an unrelated workstream into a conversation, say so and offer to split it before doing the work. Interleaving two tracks produces a conversation that must be mined later instead of a set of changes that stand on their own. An instruction to do the work is not itself a judgment that the tracks belong together.

## Composition with other rules

The claim-grading, falsifier, layer-discipline, and terminology rules in AGENTS.md are unchanged and compose with this standard. Operator comprehension is part of verification: an explanation the operator can independently check is safer than an opaque correct-looking result.

A closing recap is permitted but never substitutes for explanation delivered as the response goes along. A response whose only comprehensible content is its final paragraph is non-compliant.

## Self-check

Before sending a substantive response, verify the mechanics. The style guide's own editorial checklist covers the content rules.

1. The register is right, and a Status response has not been padded with unrequested exposition.
2. An `Open items:` block is present, carries forward what is still undecided, files what is durable, and says `none` when nothing is outstanding.
3. No recommendation or question requiring an operator decision exists only in prose.
4. Every quantity offered was measured when written, not recalled.
5. Any figure corrected from an earlier response is flagged as a correction rather than silently restated.
6. Substantive findings were written into their owning document, not left in the response.
7. A `Closure goal:` line closes the response.
8. Deleting the final paragraph would leave the response fully understandable.

## Existing documents

Documents written under the retired inline plain-language tag keep their form. Do not mass-edit those occurrences out of the corpus, the priority packets, the procedure files, or the Research Office prompts; that would be a large mechanical diff with no reader benefit and real review cost.

New writing follows this standard and the style guide it imports. A document already under substantial revision for other reasons may be converted opportunistically, as part of that revision rather than as a separate cleanup pass.
