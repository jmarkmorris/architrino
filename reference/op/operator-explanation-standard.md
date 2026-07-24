# Operator Explanation Standard

This document is the detailed authority for plain-language explanation in operator-facing agent output. AGENTS.md and the Codex goal-seeking template state the rule in one line and point here.

## Scope

The standard applies to all operator-facing output from any agent working in this repository: chat responses, adjudications, findings reports, closeouts, milestone reports, completion reports, and the reporting sections of generated or recommended prompts.

It does not apply to reader-facing corpus prose under `content/markdown/aaa`, which follows the [academic style guide](../../content/markdown/aaa/archie/academic-style-guide.md), or to end-user app language, which follows the UI guidelines.

## Audience

Write the plain-language track for a high-school AP STEM senior or a university sophomore electrical-engineering student whose calculus, linear algebra, ODEs, signals and systems, feedback, and basic numerics may be rusty. Everyday and EE-course vocabulary is fair ground: feedback loop, noise floor, settling, signal cancellation, bookkeeping, benchmark. Every other technical or project-specific term is defined where it is used, not in a glossary the operator must hold in memory.

## Unit Rule

Every technical unit is immediately followed by a `Plainly:` passage. A technical unit is any of:

- a displayed equation or equation stack
- a derivation step or chain of algebraic manipulations
- a dense results table or ledger
- a jargon-dense paragraph
- a code, configuration, or measurement block
- a claim-grading or falsifier statement whose meaning is not self-evident

## Content Rule

A `Plainly:` passage explains; it does not summarize. It says what the object is, what just happened, and why it matters, in plain vocabulary. Every symbol that appears in the preceding unit is named in words. The passage introduces no new claims. Its length is proportional to the unit it explains — a ten-line derivation does not get a one-line gloss.

## Cadence Rule

Never let more than three consecutive technical paragraphs pass without a `Plainly:` interlude. Total response length is explicitly not a constraint: completeness of inline explanation outranks brevity. The operator prefers a long response that can be reviewed inline over a compact response that cannot be followed.

## Closing Recap

A short closing recap ("The recap, plainly:") may end a substantive response, but it is a complement to inline explanation, never a substitute. A response whose only plain-language content is the closing recap is non-compliant.

## Self-Check

Before sending a substantive response, verify:

1. Every technical unit has its `Plainly:` neighbor.
2. No stretch of more than three technical paragraphs lacks an interlude.
3. No symbol appears in prose without having been named in words.
4. No jargon or project term appears without an in-place definition at first use.
5. Deleting the closing recap would leave the response fully understandable.

## Worked Example

Non-compliant unit:

> The corrector converges because the per-hit acceleration kernel is contractive on the stored-radius ball: successive path-history refinements satisfy $\lVert \Delta_{n+1} \rVert \le q \lVert \Delta_n \rVert$ with $q \approx 0.3$, so the iteration settles geometrically to the fixed point within the emission-measure tolerance.

Compliant form:

> The corrector converges because the per-hit acceleration kernel is contractive on the stored-radius ball: successive path-history refinements satisfy $\lVert \Delta_{n+1} \rVert \le q \lVert \Delta_n \rVert$ with $q \approx 0.3$, so the iteration settles geometrically to the fixed point within the emission-measure tolerance.
>
> Plainly: the solver refines its answer in rounds, and each round's remaining error ($\Delta_n$ is the error after round $n$) is at most about 30% of the previous round's error (that fraction is $q$). Like a feedback loop with strong damping, the error shrinks by the same factor every round, so a handful of rounds drives it below the tolerance we accept. "Contractive" is just the mathematical name for "each round shrinks the error," and the "stored-radius ball" is the region of candidate answers the solver is allowed to search.

The `Plainly:` passage restates the same content, names every symbol, defines the two jargon terms in place, and adds no new claims.

## Relation to Other Rules

The claim-grading, falsifier, `Closure goal:`, and one-question-at-a-time rules in AGENTS.md are unchanged and compose with this standard. Operator comprehension is part of verification: an explanation the operator can independently check is safer than an opaque correct-looking result.
