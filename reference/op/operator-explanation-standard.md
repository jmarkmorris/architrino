# Operator Explanation Standard

This document is the single authority for how agents write to the operator in this repository. It owns audience, explanation density, response length, structure, register, response mechanics, question format, agent naming, the `Closure goal:` line, the `Open items:` block, closeout content, phrasing constraints, and corrections.

AGENTS.md, CLAUDE.md, the generated startup router, the Codex prompt template, the Research Office prompt library, and the repository skills all state that this file governs and do not restate its rules. If any of them appears to define explanation style directly, this file wins and the duplicate is reduced to a pointer. The same applies to guidance set outside the repository in a client application: such settings are invisible to other agents working in the same checkout, carry no repository authority, and are overridden by this document.

CLAUDE.md carries a short pre-read floor, because a session must behave correctly before it reaches this file. That floor is the only authorized restatement, it is explicitly labeled as one, and it is deliberately narrower than what is written here.

## Scope

The standard applies to all operator-facing output from any agent working in this repository: chat responses, adjudications, findings reports, closeouts, milestone reports, completion reports, priority and analysis packets under `reference/priorities`, and the reporting sections of generated or recommended prompts.

It does not apply to reader-facing corpus prose under `content/markdown/aaa`, which follows the [academic style guide](../../content/markdown/aaa/archie/academic-style-guide.md), nor to end-user app language, which follows the [UI guidelines](../../content/markdown/aaa/archie/ui-guidelines.md).

Four neighbouring authorities govern different audiences and are not consolidated here, because none of them contains operator-communication content: the [academic style guide](../../content/markdown/aaa/archie/academic-style-guide.md) owns corpus prose, the [mathematics style guide](../../content/markdown/aaa/archie/mathematics-style-guide.md) owns notation, [terminology usage](../../content/markdown/aaa/archie/terminology-usage.md) owns project vocabulary, and the [UI guidelines](../../content/markdown/aaa/archie/ui-guidelines.md) own end-user wording. Terminology rules in AGENTS.md, including the canonical name of the EOM solver and the ban on causal-delay variants, likewise remain terminology and are not response-shape rules.

## Audience

Write for a reader who is an expert in $\mathbb{A}\mathbb{A}\mathbb{A}$ and in this repository, and a non-specialist in whatever external mathematical or computational framework is currently being imported.

Getting the audience wrong licenses two opposite failures at once: re-explaining the theory to the person who built it, and waving through an imported apparatus that has never been defined here. The division that avoids both is:

- **Assume the theory.** Architrinos, causal roots, path history, wake, polarity, the transmitter-side row, the master equation, absolute time, the Euclidean void, claim grading, and this repository's own vocabulary need no introduction. The operator knows them better than the agent does.
- **Define everything imported.** Any concept brought in from outside — a class of differential equation, a geometric construction, a statistical notion, a numerical method, a term of art like *secular* or *areal rate* or *codimension* — is defined completely, in place, on the assumption that the reader has not met it in this context before.

The test is not "how much mathematics does the reader know." It is "did this concept enter from outside the theory." If it did, define it.

## Plain by default

Technical prose is written plainly in the first instance. Do not write a dense passage and then repair it with a translation afterwards.

Do not use an inline `Plainly:` tag, or any other marker that announces a translation. A marker promising a plain version later removes all pressure on the technical prose to be readable, so it quietly licenses density everywhere outside the gloss. What it produces is a hard version plus a repair, when what is wanted is prose that did not need repairing.

Explanation is interleaved and worked in, not labelled. The clarifying sentence follows the thing it clarifies in ordinary prose, as part of the same paragraph or the next one. No marker introduces it.

An equation, a results table, a ledger, a code block, or a measurement block is irreducible — it cannot be written plainly, because its precision is the point. Follow it immediately with prose that names every symbol in words and says what the object is and why it is true. That prose carries no label either.

## What an explanation must do

An explanation explains; it does not summarize. Specifically it must:

- **Say what the object is,** in words, before or as it is introduced.
- **Name every symbol** that appears in the preceding unit. A symbol that has never been spoken aloud in words has not been introduced.
- **Say why the result is true,** not only what it says and why it matters. This is the most commonly missed obligation. "The barrier holds because the required inward acceleration grows as one over distance cubed while the available inward acceleration grows as one over distance squared" is an explanation; "the barrier holds, which matters because it rules out contact" is a summary wearing an explanation's clothes.
- **Introduce no new claims.** An explanatory passage that smuggles in content the technical unit did not establish is a defect, because the claim then carries no grade and no falsifier.
- **Be proportional.** A ten-line derivation does not get a one-line gloss.

## Repetition is a feature

Define a term again on later use. Do not suppress a definition because the term was defined earlier in the document, earlier in the session, or in a neighboring document.

The asymmetry is the whole argument. A reader who already knows the term loses one skipped line. A reader who does not know it, or knew it last week and has since been working on something else, loses the entire passage. Redundancy costs a scan; omission costs comprehension. Once a reader has internalized a term they learn to read straight past its definition, and that skipping is cheap and automatic.

Bound the repetition by depth, not by whether it happens. The full development of an imported concept happens once. Each later recurrence gets a one- to three-sentence restatement — what the object is and what it is doing here — never a second development. Repeating the definition is cheap; repeating the derivation is padding.

This applies to imported terms with particular force, because they recur across sessions separated by days of unrelated work.

## Structure

- **Picture before symbol.** Establish the physical or geometric configuration in words first, then introduce notation for it. The picture is the actual configuration — the emission event, the separation, the wake, the branch — not a comparison to something else. Do not open a passage with an equation and describe it afterwards.
- **One idea per section.** Break an explanation into short titled or numbered parts, each carrying a single step. A long undifferentiated block is harder to follow than the same content chunked, even when the sentences are identical.
- **Define at or before first use,** never after. A term defined three paragraphs after it appears has already cost the reader those paragraphs.
- **Lead with the outcome.** When a decision, verdict, or headline exists, state it first and use what follows as support.
- **State the finding before the mathematics.** The sentence is the claim; equations, code, and measurements are the evidence for it. A response that opens with evidence and arrives at the claim last forces the operator to hold everything in mind before learning what it was for.
- **Explain components and their relationships before asking the operator to accept a conclusion.** Use a compact mapping, comparison, or diagram whenever it makes three or more relationships easier to check.
- **Give a short overview before detailed step-by-step instructions.**

## Expected tools

These are expected, not merely permitted.

- **The configuration itself.** Explain by walking the actual objects — the emission event, the separation vector, the wake, the branch, the retained history — and naming each symbol as it enters. The subject matter here is geometric and symbolic, and an explanation that stays inside it can be checked against the equations line by line. This is the default carrier of every mechanism.
- **Exact engineering vocabulary where the mapping is exact.** An irreducible stored error radius is a noise floor; a seed effect against numerical scatter is a signal-to-noise ratio; a converging corrector is a settling feedback loop. Use these when they are exact and name the point at which the correspondence fails.
- **Worked numbers.** A single instantiated example with actual values does more than a paragraph of qualitative description. Use $c_f=1$.
- **Signposting the surprise.** Say explicitly when a step is counterintuitive or when a result was unexpected. This tells the reader where to spend attention and where coasting is safe.
- **Naming the correction.** When a statement supersedes an earlier one, say what was wrong and why, rather than silently replacing it.

## Analogy

Analogy is a last resort, not a default, and it is never the carrier of a mechanism.

An analogy imports a second system with its own behaviour. The reader then holds two systems and works out where they differ, which is more work than the original passage and imports exactly the observer-level intuitions this theory exists to displace. In $\mathbb{A}\mathbb{A}\mathbb{A}$ the mechanism is the geometry, and the geometry is available directly.

When one is used:

- Use it only after the geometry has been stated plainly, and only when the comparison adds something the geometry did not.
- Keep it to a sentence or two. An analogy extended across a paragraph, with its own cast and its own scenario, has become the explanation and has displaced the thing being explained.
- Say where it stops. An unbounded analogy silently becomes a claim.
- Draw it from everyday experience or from geometry, never from an observer-level physical theory, per the layer discipline in AGENTS.md.

## Registers

One standard does not fit every output. Four registers, each with its own density:

| Register | Typical output | Density |
| --- | --- | --- |
| Explainer | Walking through a settled result, an imported framework, or a term the operator has asked about | Highest. Every imported term defined, picture before symbol, worked numbers throughout, one idea per section. Length is not a concern. |
| Adjudication | Priority packets, findings reports, theorem targets, review dispositions | High for imported apparatus and for the verdict; the formal statements stay precise and are explained immediately after. Claim grades and falsifiers are mandatory. |
| Correction | Superseding an earlier statement | Explainer density, plus an explicit statement of what was wrong, why, and what downstream conclusions change. |
| Status | Completion notices, closeouts, short answers, "the file is written" | Lowest. Outcome first, no exposition, no restated background. Do not pad a status with explanation the operator did not ask for. |

Choosing the register is part of writing the response. When a response mixes them — a status line followed by an explainer — that is normal and the density should change accordingly.

## Length and precedence

Total response length is not a constraint. Completeness of inline explanation outranks brevity. A long response that can be reviewed inline is preferred over a compact one that cannot be followed.

This rule governs work in this repository and outranks any client-level brevity setting, including the built-in `Concise` response style and any account-level or global instruction asking for shorter output. Those settings are set outside this repository, are invisible to other agents working in the same checkout, and carry no repository authority. Where such a setting conflicts with this standard, this standard wins.

The Status register is the exception that keeps this honest: short output is correct when the response carries no explanatory obligation. Length is earned by content, never spent on restating what the operator already knows.

## Open items and outstanding recommendations

Every substantive response ends with an explicit `Open items:` block listing everything currently awaiting an operator decision. This is the response's only channel for such requests. A recommendation, proposed action, or question that exists only inside the prose of a response does not count as having been raised, because prose is scanned and a request buried in it is a request the operator never received.

The rules are:

- **Carry items forward.** An item stays in the block, response after response, until the operator explicitly decides it or it is executed. Do not drop an item because it was first raised several turns ago; age is exactly what makes it easy to lose.
- **Say what each item is asking and what happens if it is declined.** An item the operator cannot act on without re-reading three earlier responses is not an item, it is a reminder to go looking.
- **Distinguish an item from a suggestion.** If no decision is needed, it does not belong in the block. Padding the block with things the agent intends to do anyway destroys its value.
- **Never let the block be implicit.** When nothing is outstanding, write `Open items: none.` Absence of the block is indistinguishable from forgetting it.
- **File durable items; carry only live ones.** An item that will outlive the conversation belongs in the owning work queue, referenced by identifier. The block itself carries only what blocks the current turn. An `Open items:` list that grows without bound recreates the problem it exists to solve — it just moves the mining from prose into a list — and a conversation is not a tracking system.

`Open items:` is not the same thing as `Closure goal:` and neither replaces the other. `Closure goal:` names the single objective the work is driving toward. `Open items:` is the carried list of decisions blocked on the operator.

Every substantive response ends with exactly these two blocks, in this order, with nothing after them:

```
Open items:
1. <what is being asked, and what happens if it is declined>
2. ...

Closure goal: <the single objective the work is driving toward>
```

When nothing is outstanding the first block collapses to the single line `Open items: none.`

## Response mechanics

These rules govern the shape of operator-facing responses and generated prompts. They live here rather than in AGENTS.md so that all operator-communication policy has one owner.

- **Ask necessary questions one at a time.** Put fixed choices in ranked order with the preferred choice first and end with the explicit option prompt, such as `(y/n)` or `(a/b)`. Use open discussion instead when the decision is genuinely nuanced and a fixed-choice framing would distort it.
- **Do not address the agent by name** in prompts or operator communication. Start directly with the task or with `Closure goal:`. When a role label is useful, use `Principal Proof Architect & Integrator`; the fuller role description lives in [the CTO role file](../research-office/cto/cto.md).
- **Close every substantive response with a concise `Closure goal:` line,** and open every generated or recommended prompt with one. It names the single objective the work is driving toward, not a summary of what was done, and it is the last line of the response.
- **State the boundary of the work.** Say what was not run, not read, not re-measured, and not verified, in the same response that reports what was found. A result whose limits go unstated is read as a result without limits, and the operator's principal defence against a plausible wrong answer is knowing where the agent did not look.
- **Scope every negative.** A negative result names what was searched, over what range or parameter space, and with which instrument, and says what remains open outside that boundary. An unscoped negative reads as a general impossibility, which is almost never what was established.
- **In closeouts, distinguish scoped edits from ambient multi-agent worktree state.** Avoid generic warnings such as "the broader working tree has additional user changes" unless those changes alter the next action. The operator runs many agents in one checkout, so a dirty tree is normal and reporting it as though it were an incident wastes attention.
- **Do not use the phrase `instead of guessing`** in operator-facing communication.
- **Correct your own numbers explicitly.** When a figure, count, or claim in an earlier response turns out to be wrong, say so plainly, give the corrected value, and say what conclusion changes. Silently restating a corrected number is worse than the original error, because it removes the operator's ability to notice the correction.
- **Keep one track per thread.** When a request would mix an unrelated workstream into a conversation, say so and offer to split it before doing the work. Interleaving two tracks produces a conversation that has to be mined later instead of a set of changes that stand on their own. An instruction to do the work is not by itself a judgment that the tracks belong together; the agent holds the thread's shape and should raise the collision.
- **Measure before asserting a quantity.** Any count, size, or scope figure offered to the operator is measured at the time it is written, not recalled from an earlier turn or estimated from a related figure. Aggregating two previously measured numbers into a third is a common way to produce a wrong one.

## Composition with other rules

The claim-grading, falsifier, `Closure goal:`, layer-discipline, and terminology rules in AGENTS.md are unchanged and compose with this standard. Operator comprehension is part of verification: an explanation the operator can independently check is safer than an opaque correct-looking result.

A closing recap is permitted but is never a substitute for explanation delivered as the response goes along. A response whose only comprehensible content is its final paragraph is non-compliant.

## Self-check

Before sending a substantive response, verify:

1. Every imported term is defined in place, and restated in one to three sentences if it recurs after a gap.
2. No symbol appears in prose without having been named in words.
3. Every technical unit is followed immediately by prose saying what it is and why it is true.
4. No passage is dense-then-glossed; the technical prose reads plainly on its own, and no `Plainly:` tag or equivalent marker appears.
5. The mechanism is carried by the configuration and its symbols. Any analogy is at most a sentence or two, arrives after the geometry, is bounded, and imports no observer-level law.
6. The register is right, and a Status response has not been padded with unrequested exposition.
7. Every quantity offered was measured now, and every negative states its scope.
8. What the work did not cover is stated.
9. An `Open items:` block is present, carries forward everything still undecided from earlier turns, and says `none` when nothing is outstanding.
10. No recommendation or question requiring an operator decision exists only in the prose.
11. Any figure corrected from an earlier response is flagged as a correction rather than silently restated.
12. Questions were asked one at a time, with ranked fixed choices and an explicit option prompt.
13. `Closure goal:` is present, names one objective, and is the last line.
14. Deleting the final paragraph would leave the response fully understandable.

## Worked example

Non-compliant, because it is dense and unexplained:

> The barrier survives because the transverse requirement scales as $h^{2}/d^{3}$ against a near-field row of $O(d^{-2})$, so reversal occurs at $d\approx h^{2}/C$ provided the secular part of $\dot h$ vanishes.

Also non-compliant, because it repairs density rather than avoiding it:

> The barrier survives because the transverse requirement scales as $h^{2}/d^{3}$ against a near-field row of $O(d^{-2})$, so reversal occurs at $d\approx h^{2}/C$.
>
> Plainly: the sideways effect grows faster than the inward one, so they turn instead of touching.

Compliant:

> Let $d$ be the current distance between the two architrinos and $\theta$ the angle of the line joining them, so $\dot\theta$ is the rate at which that line swings around. The **areal rate** is $h=d^{2}\dot\theta$ — twice the rate at which the joining line sweeps out area. It is built only from positions and velocities, with no mass and no force anywhere, which is what makes it usable at this layer.
>
> Two quantities grow as the pair closes in, and they grow at different rates. The inward acceleration available grows as $C/d^{2}$, where $C$ collects the couplings. The inward acceleration required to keep the line turning at fixed $h$ grows as $h^{2}/d^{3}$: holding $h=d^{2}\dot\theta$ fixed while $d$ shrinks forces $\dot\theta$ up as $1/d^{2}$, and the inward acceleration needed to hold that turn, $d\dot\theta^{2}$, therefore rises as $1/d^{3}$. One over $d$ cubed outruns one over $d$ squared, so below some separation the requirement exceeds the supply and the approach reverses. Setting $C/d^{2}=h^{2}/d^{3}$ places the crossover at $d\approx h^{2}/C$.
>
> The barrier is a race between two powers of $d$, and the gap of one in the exponent is its entire content. The escape clause is the open question, and it sits in the numerator: the requirement is proportional to $h^{2}$, so it vanishes when $h=0$. An exactly aimed approach has $\dot\theta=0$, no turning requirement at any separation, and nothing in this argument to stop the arrival.

The compliant version defines the imported term where it appears, names every symbol in words, gives the mechanism rather than its significance, carries the mechanism in the geometry with no analogy at all, flags the escape clause as the thing to attend to, and never needs a translation because it was never dense.

## Existing documents

Many documents across the corpus, the priority packets, the procedure files, and the Research Office prompts carry inline `Plainly:` tags. Leave them. Removing them would be a large mechanical diff with no reader benefit and real review cost.

New writing follows this standard. A document already under substantial revision for other reasons may be converted opportunistically, as part of that revision rather than as a separate cleanup pass.
