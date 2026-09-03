# Academic Style Guide

This guide defines the prose standard for reader-facing textbook material in the webapp. Its purpose is to make voice, structure, tone, and editorial discipline consistent enough that chapters read like parts of one coherent corpus rather than isolated notes with incompatible habits.

The core writing rule is simple: make the claim easy to locate, the mechanism easy to follow, and the claim level impossible to confuse. A reader should not have to guess whether a sentence is ontology, effective recovery, comparison, open proof work, or historical explanation.

The sections below move from scope and core aims to concrete rules for headings, tone, explanation, and editorial review.

## Purpose

This guide defines the default prose standard for textbook-facing content in the webapp. It is intended for chapters, scene notes, comparative essays, and explanatory reference documents that are part of the public reading surface.

This guide complements, rather than replaces, the mathematical guide in [mathematics-style-guide.md](mathematics-style-guide.md). The mathematical guide governs notation and formal dialect. This guide governs prose, structure, tone, and editorial discipline.

## Scope

Apply this guide to the following content classes unless a more specific local template overrides it:

- chapter overviews
- section leaves derived from markdown trees or splits
- comparative essays
- historical and philosophical analysis
- explanatory theory summaries
- methodology and meta-reference documents intended for readers

Do not apply this guide mechanically to interface chrome such as button labels, tooltips, and ultra-short glossary entries, where a hard size constraint makes full explanation impossible. Longer in-application guides, help pages, and explanatory panels are explanatory prose and do follow this guide.

## Audience

Write for a reader who knows neither $\mathbb{A}\mathbb{A}\mathbb{A}$ nor the established physics it must eventually recover.

That is the whole audience decision, and everything else in this guide follows from it. $\mathbb{A}\mathbb{A}\mathbb{A}$ is a new field, and the corpus exists to bring people into it. A reader who already held both bodies of knowledge would not need the book.

Two consequences deserve stating plainly, because each is easy to miss.

**Every $\mathbb{A}\mathbb{A}\mathbb{A}$ concept is defined where it is used.** Architrino, causal root, path history, wake, polarity, absolute time, the Euclidean void, the master equation: none of these may be assumed. They are the subject matter, not the shared background.

**Established physics is explained, not merely named.** This is the consequence most often missed. Phrases such as "Lorentz behavior is a recovery target," "this recovers the inverse-square law," or "the effective metric reproduces the parameterized post-Newtonian limit" carry no meaning for a reader who has not studied special relativity, electrostatics, or general relativity. Wherever an appeal to established physics is doing real work in an argument, say in plain terms what that established result claims and why it matters here. Naming it is not explaining it.

The corpus does not assume that a reader started at page one. It is published as a website, and readers arrive from a search result, an external link, or the application on an arbitrary page. The scoping rule in Explanation Standard below follows from that.

## Core Aim

The target voice is that of an academic textbook: clear, orderly, explicit, and serious without becoming inflated, evasive, or bureaucratic.

The prose should do three things at once:

1. State the claim.
2. Explain the conceptual structure behind the claim.
3. Distinguish what is established, what is inferred, and what remains open.

For central theory passages, the strongest pattern combines explanatory prose, formal precision, and a small equation. Begin by naming what is happening in the substrate or effective layer. Then give a compact map, table, or list that separates the moving parts. Then introduce the equation that binds those parts together, followed immediately by plain-language meanings for the symbols and the closure question that remains. The equation should clarify the prose rather than replace it, and the prose should make the equation's conceptual burden visible.

The prose must also do a fourth thing that is easy to leave out: **say why the claim is true, not only what it says and why it matters.** A passage that states a result, then explains its significance, has skipped the mechanism. "The approach reverses because the sideways requirement grows faster than the inward pull, one over distance cubed against one over distance squared" is an explanation. "The approach reverses, which rules out contact" is a summary wearing an explanation's clothes. Give the reader the reason, in words, before or alongside the formal statement.

## Plain by Default

Write technical prose plainly in the first instance. Do not write a dense passage and then repair it with a plainer restatement afterwards.

This matters more than it may appear. A convention that promises a translation later removes the pressure on the technical prose to be readable, and quietly licenses density everywhere outside the translation. What it produces is a hard version followed by a repair, when what serves the reader is prose that never needed repairing.

Some objects are irreducible: an equation, a results table, a data ledger, a measurement block. Their precision is the point and they cannot be written plainly. Follow each immediately with prose that names every symbol in words and says what the object is and why it holds. That prose carries no label; it is simply the next sentence.

Plainness is not informality. The tone remains formal and exact, as the Tone Standard below requires. What plainness rules out is unnecessary density, not seriousness.

## Style Principles

### 1. Prefer disciplined clarity over rhetorical flourish

Write for sustained comprehension, not performance.

Use:

- direct topic sentences
- explicit conceptual transitions
- stable terminology
- concrete distinctions between levels, causes, and interpretations

Avoid:

- hype
- conversational filler, fluff, or cruft
- motivational language
- unexplained intensifiers
- vague gestures such as "obviously," "clearly," or "of course" when an argument is actually needed

### 2. Treat each section as a teaching unit

A reader should be able to enter a section cold and learn from it without already sharing the author's assumptions.

Each section should, in some form:

- identify its subject
- explain why the subject matters
- define the central distinction or pressure
- preserve what is strongest in the inherited view
- state the limitation, tension, or reinterpretation
- locate the topic within the larger architecture

### 3. Separate ontology, effective description, and inference

This distinction is central to the project and should remain explicit in prose.

When relevant, state whether a claim belongs to:

- substrate ontology
- assembly or constitutive behavior
- effective law or geometry
- statistical closure
- observational or inferential reconstruction

Do not allow predictive success, measurement language, and final ontology to collapse into one another by stylistic implication.

When a subject has both a substrate record and an observer-level readout, write both layers explicitly. A good passage should say what happens in absolute time and the Euclidean void, what changes in assemblies or the Noether sea, what physical observers infer, and which equation connects those levels. For example, do not stop at "the photon is redshifted"; state which emission ledger, path-history term, medium cadence, and receiver coupling are being compared.

### 4. Preserve strengths before criticizing limits

When assessing an existing theory, tradition, or interpretation, first state what still works. Then state what is incomplete, overstated, or mislocated.

This avoids caricature and maintains textbook credibility.

### 5. Prefer analytic transitions over dramatic transitions

Use transitions such as:

- "The central issue is..."
- "The stronger claim is..."
- "The comparative point is..."
- "The limitation appears when..."
- "At the effective level..."
- "From the standpoint of $\mathbb{A}\mathbb{A}\mathbb{A}$..."

Avoid transitions such as:

- "The real truth is..."
- "What everyone misses is..."
- "This changes everything..."
- "The obvious conclusion is..."

## Explanation Standard

### Define at or before first use

Define a term where it first appears, never several paragraphs later. A term defined after its first use has already cost the reader everything in between.

### Clarity, and the cost of repetition

Clarity is the objective. Repetition is neither required nor forbidden: it is a cost worth paying when it buys clarity, and a defect when it does not.

The asymmetry justifies erring toward explanation. A reader who already knows a term loses one skipped line. A reader who does not know it loses the passage. Omission costs comprehension; redundancy costs a scan. Once a reader has internalized a term they read straight past its definition, and that skipping is cheap and automatic. So when the judgment is close, explain.

**Symbols are a solved case.** Corpus prose carries `View →` links into the equation viewer, which holds each symbol's full definition. A symbol therefore needs only to be named in words where it is used; re-glossing every symbol at every recurrence is padding.

**Concepts are the open case.** They are reintroduced as the corpus advances, because a reader arriving at a later chapter may not carry an earlier one's vocabulary. The point at which reintroduction stops buying clarity and becomes padding is not yet settled and will not be settled here by assertion. Until it is, reintroduce a concept when it has not yet appeared in the current document, or when it is load-bearing in the argument being made, and treat anything beyond that as padding.

What is bounded in every case is re-derivation rather than re-definition. The full development of a concept happens once; later recurrences say what the object is and what it is doing here without rebuilding it.

### Scope of assumed knowledge

**Cumulative within a document, self-contained at document boundaries.**

Within one document a defined concept stays defined, and later sections build on earlier ones. At the start of a new document nothing is assumed: it opens by orienting the reader and defines what it imports from elsewhere.

The reason is the delivery surface rather than a preference about prose. The corpus is published as a website, and a reader may arrive at any document first. A fully cumulative corpus, where each chapter assumes all earlier ones, fails that reader. Full self-containment at every section boundary fails a different way, multiplying redundancy without a matching gain, since a reader three sections into a document already holds the first section's vocabulary.

## Paragraphing Standard

Default paragraph pattern:

1. Opening sentence states the claim or function of the paragraph.
2. Middle sentences develop the distinction, mechanism, or historical pressure.
3. Final sentence either closes the point or prepares the next step.

Prefer medium-length paragraphs. Avoid both one-sentence fragment chains and extremely long blocks unless the material genuinely requires them.

In Markdown source, keep each prose paragraph and each prose-bearing list item on one physical line. Do not manually hard-wrap prose to a fixed column. Retain separate physical lines only where Markdown structure, display mathematics, code, tables, quotations, or an intentional explicit hard break requires them.

## Expected Tools

These are expected of good explanatory prose, not merely permitted.

**Analogy that carries the mechanism.** A concrete comparison conveying how something works is worth more than a careful restatement of what it does. Always say where the analogy stops, because an unbounded analogy quietly becomes a claim. Choose comparisons from everyday experience or from geometry rather than from an observer-level physical theory the framework must derive.

This is distinct from the prohibition in What To Avoid below. Metaphor used *in place of* mechanism is a defect; analogy used to *carry* mechanism is the tool. The difference is whether the reader could reconstruct the reasoning after reading it.

**Worked numbers.** One instantiated example with actual values does more than a paragraph of qualitative description. Set $c_f = 1$.

**Signposting the surprise.** Say explicitly when a step is counterintuitive or a result unexpected. This tells the reader where to spend attention and where coasting is safe.

**Picture before symbol.** Establish the physical or geometric situation in words, then introduce notation for it. Do not open with an equation and describe it afterwards.

## Heading Standard

Use headings to organize instruction, not merely to decorate the page.

A good heading should tell the reader what kind of work the subsection is doing, for example:

- Overview
- Historical Motivation
- Ontology
- Core Commitments
- Internal Tensions
- Assessment from $\mathbb{A}\mathbb{A}\mathbb{A}$
- What Survives
- Failure Mode
- Mapping Target

Within generated markdown trees or split documents, subsection headings should support the local teaching sequence rather than multiply unnecessary navigation levels.

## Tone Standard

The preferred tone is:

- formal
- explanatory
- non-defensive
- non-polemical
- exact about uncertainty

The tone should not be:

- casual
- promotional
- combative
- mystical by accident
- inflated through constant superlatives

Where a strong claim is made, the prose should earn it through distinctions and reasons rather than through emphasis alone.

Plain and formal are not opposites, and the target is both. Plainness is the formality here: a sentence a reader understands on first pass is more exact than a dense one they must decode, because the decoding introduces error the author never sees. What the tone rules out is chattiness, not clarity. Avoid filler, jokes, and conversational drift; do not avoid short words, direct sentences, or ordinary vocabulary.

## Preferred Sentence Patterns

Good sentence patterns for this project include:

- "The question is whether..." only when the sentence introduces a genuinely open, explicitly named closure target
- "The framework treats X as..., while Y is treated as..."
- "What survives is..."
- "The limitation appears when..."
- "This remains useful at the effective level, but not as final ontology."
- "The comparison is strongest at the level of..., and weakest at the level of..."

These patterns keep the prose analytic and layered.

## Claim Grades and Falsifiers

Use one fixed label in evidence blocks: `Claim grade:`. The allowed values are:

- `derived`: follows from declared premises by a shown proof or exact derivation
- `measured`: reported by a named instrument over a declared domain
- `inferred`: a stated conclusion drawn from derived or measured premises, with the extra inference identified
- `guessed`: a candidate interpretation or hypothesis that is not yet derived, measured, or securely inferred

Every claim block must state a checkable falsifier: the observation or counterexample that would overturn the claim, together with enough information for a reader to evaluate it. A measured claim also names its instrument, the kind of evidence it provides, and the boundary of what it can establish. Repeating the same computation establishes repeatability; correctness requires comparison with an independent derivation, measurement, or reference.

Example:

> Claim grade: derived. The function $f(x)=x-1$ has exactly one simple root on $[0,2]$: $f(1)=0$, and its derivative is $1$ throughout the interval. Falsifier: a second zero of this function, or a zero derivative at $x=1$, would contradict the claim.

Use these tags for explicit claim or evidence blocks, not as status flags scattered through ordinary explanatory prose.

## What To Avoid

Avoid the following unless there is a specific reason to retain them:

- colloquialisms
- chatty asides
- hype phrases
- empty intensifiers
- process-history filler, such as "previously," "now redesigned," "obsolete plan," or "we used to"
- unresolved pronouns such as "this" or "that" when the referent is unclear
- metaphor used in place of mechanism, as distinguished from analogy that carries mechanism in Expected Tools above
- rhetorical questions used as ornament rather than structure

Second-person address is permitted where it does pedagogical work. "Picture two architrinos and draw the line between them" instructs the reader to perform a step, and the second person is the natural way to say so. It remains out of place in ordinary exposition, where it becomes chatty, and it is never a substitute for a claim: "you can see that the barrier holds" asserts nothing the reader can check.

Labelled plain-language restatements, such as a passage introduced by a fixed tag announcing a simpler version, are not used. Explanation is interleaved with the material it explains, as Plain by Default requires, rather than appended to it under a marker.

## Forward-Only Documentation

Reader-facing prose should state the architecture, claim, rule, or curriculum directly. It should not preserve drafting history, migration story, abandoned counts, old names, or "what changed from the last version" unless that history is the subject of the document.

Use present-tense, source-of-truth wording:

- "The chapter distinguishes two cases."
- "The diagram shows the causal geometry."
- "The derivation assumes a smooth trajectory."
- "The remaining proof obligation is..."

Avoid process-history wording:

- "The redesigned series..."
- "The prior plan was..."
- "This is now obsolete..."
- "The old version used to..."

Historical context belongs where it helps explain the subject, such as a history of an idea or a comparison in which an earlier formulation is relevant evidence. Ordinary textbook and reference prose should present the current explanation without narrating its drafting or revision history.

## Project-Specific Rules

### $\mathbb{A}\mathbb{A}\mathbb{A}$ styling

When referring to the theory in prose or math, use the stylized form `$\mathbb{A}\mathbb{A}\mathbb{A}$`.

Do not replace it with plain-text variants except in literal file paths or code identifiers.

For compact uses of `AAA`, follow the narrower policy in [terminology-usage.md](./terminology-usage.md#architrino-architecture-aaa-and-disallowed-variants). A-cubed forms are disallowed everywhere, including artwork, icons, badges, and title graphics; do not treat them as visual marks.

### TeX preservation

Preserve TeX delimiters and content exactly:

- `$...$`
- `$$...$$`
- `\(...\)`
- `\[...\]`

Do not rewrite prose in ways that break KaTeX rendering or accidentally trigger markdown emphasis inside TeX expressions.

KaTeX authoring rules:

- Use `$...$` for inline math in prose sentences.
- Use `$$...$$` only for standalone equations, not for sentence fragments or preview-style summary lines.
- Treat `\(...\)` and `\[...\]` as compatibility forms for literal examples or renderer-specific validated cases, not as default authoring syntax.
- Do not place `$$...$$` inline inside headings, list labels, callouts, captions, or running sentences. A list item may introduce a following standalone display equation.
- For inline inequalities or expressions containing `<` or `>` in prose, keep them in `$...$` with spaces, for example `$1 < m < n$`.
- When a short formula is part of a narrative sentence, prefer one inline expression over a stacked display unless the derivation truly needs display layout.

### Links

- Use relative link targets resolved from the current document.
- Link to published chapters, references, or data sources rather than locations on an author's machine.
- Keep the explanation self-contained. State the necessary definitions, assumptions, and reasoning in the text; links provide supporting detail rather than access to unpublished working notes.

### Causal-delay terminology

Prefer:

- causal
- delayed
- path-history
- multistability
- attractor
- constitutive
- effective closure
- wake

Do not use `retard`, `retarded`, `retarding`, `retardation`, or related variants in authored prose. This sentence is the explicit enforcement exception: it is allowed to name the disallowed terms so future terminology passes preserve the rule rather than deleting it. Use causal-delay, delayed, path-history, or causal-wake language instead.

### Quantum-comparison terminology

When a chapter is translating standard quantum language, preserve the historical phrase `particle-wave duality` as a comparative label when needed. But do not let that phrase become the native $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology.

In $\mathbb{A}\mathbb{A}\mathbb{A}$-first prose, prefer `assembly and wake`:

- `assembly` for the localized ontological object or bound hierarchy,
- `wake` for the emitted distributed causal structure,
- `particle` and `wave` for standard comparative or observer-level discussion.

Reserve `field` for effective, continuum, or explicitly comparative discussion. When the prose is naming emitted substrate-level $\mathbb{A}\mathbb{A}\mathbb{A}$ structure, prefer `wake` so the emission order and ontological level remain explicit.

The important editorial point is that $\mathbb{A}\mathbb{A}\mathbb{A}$ does not frame the issue as one thing being either particle or wave depending on circumstance. The localized assembly and the distributed wake are both part of the same causal account.

### Reaction terminology

Do not let generic Standard Model `decay` language become the running explanatory vocabulary of $\mathbb{A}\mathbb{A}\mathbb{A}$ chapters.

Preferred prose discipline:

- `reaction` as the default channel label when mechanism detail is not yet specified,
- `associate` / `association` for reaction-built sub-assemblies or corridors forming,
- `dissociate` / `dissociation` for unstable assemblies or sub-assemblies breaking apart,
- `reconfigure`, `transmute`, or more specific mechanism terms when they say more.

Use `decay` only for fixed historical or canonical Standard Model labels, and translate immediately at first mention, for example `beta reaction` (SM label: `beta decay`).

### Spacetime terminology

Do not let `spacetime`, `void`, `timespace`, `Noether sea`, and `spacetime medium` drift into one another.

Preferred prose discipline:

- `Euclidean void` for the fixed spatial container
- `absolute time` for the universal temporal parameter
- `absolute timespace` for the formal product background $\mathbb{R}\times\mathbb{R}^3$
- `Noether sea` for the ambient contents
- `spacetime medium` only as a bridge term
- `spacetime` for emergent or observer-level geometry

If a sentence could refer either to the background, the contents, or the emergent geometry, rewrite it until the level is explicit.

### Reader-facing posture

Chapters and explanatory references should be complete enough to read without access to private working notes.

Avoid:

- internal team notes
- planning checklists inside textbook prose
- status flags embedded in the body
- references to private collaboration context

### Self-contained exposition

Organize each explanation in the order a reader needs to understand it: definitions and assumptions, reasoning and evidence, then conclusions and remaining mathematical questions. Preserve the substance of an argument without reproducing the sequence in which it was discovered or drafted.

Identify published computational evidence by a comprehensible title and stable public identifier, and explain what it establishes. Technical reproduction details belong in the accompanying methods or data-availability record. Raw content hashes do not belong in explanatory prose or visible link labels; hashes within URLs and functional link anchors may be retained.

## Section-Length Standard

Length is not a constraint. Completeness of explanation outranks economy, and a long passage a reader can follow is preferred to a compact one they cannot. For substantial conceptual leaves, the default target is at least one page of meaningful prose, and often more.

That is not licence to pad. Explaining something again in different words because a reader may need it is completeness; restating a thesis in different words is padding, and remains a defect however unconstrained the length budget.

Length is justified when it adds one or more of the following:

- clearer derivation
- stronger historical context
- better distinction of levels
- more explicit assessment criteria
- concrete recovery or falsification targets

Length is not justified when it only repeats the same thesis in slightly different words.

## Comparison Standard

When comparing theories, traditions, or thinkers:

1. Identify the object of comparison precisely.
2. State the strongest durable insight first.
3. State the limiting tension second.
4. Classify the relation to $\mathbb{A}\mathbb{A}\mathbb{A}$ explicitly.
5. End with what remains useful after reinterpretation.

This sequence should be the default comparative rhythm across philosophy, history, cosmology, and theory mapping chapters.

## Evidence and Qualification

Use qualification where it clarifies rather than weakens.

Examples:

- "in this framework"
- "at the effective level"
- "in comparative terms"
- "under the declared interpretation"
- "as a first-pass classification"

Do not use qualification to evade commitment. If the text is making a real claim, state it plainly and then delimit its scope.

### Source and AI-Assistance Disclosure

About Architrino is the policy authority for references and sources. Follow its [selective-reference policy](about-architrino.md#sources-references-and-attribution) for inclusion, omission, durable identification, and presentation, and its [AI-assisted research and review policy](about-architrino.md#ai-assisted-research-and-review) for source checking and disclosure. Apply those policies rather than maintaining a separate citation requirement in a chapter template or review checklist.

Factual, legal, and scientific assertions require support appropriate to their kind: an explicit derivation, an independently checkable source, or a declared validation record. Model output is not source evidence. Model-training or training-data provenance is neither author credit nor source evidence and does not substitute for identifying and checking the underlying source. AI-assisted wording, analysis, or implementation does not acquire authority from generation alone.

When AI systems, including generative-AI tools or local AI agents, materially assist a publication, they may be acknowledged by a documented, reader-comprehensible contribution role such as research synthesis, analysis, drafting, critique, software implementation, or review support. Do not claim that every AI use is individually recorded or that attribution is exhaustive unless such a record actually exists. Named human contributors retain editorial and publication accountability; do not present an AI system as an independent legal person or academically accountable author.

Published source notes and contribution statements support transparency, but they do not prove that every claim has been independently verified. Do not attribute individual passages to particular AI systems unless that attribution is documented.

## Editorial Checklist

Before finalizing a reader-facing chapter or section, check the following:

1. Does the opening identify the subject and its significance?
2. Could a reader who knows neither $\mathbb{A}\mathbb{A}\mathbb{A}$ nor established physics follow it, with every $\mathbb{A}\mathbb{A}\mathbb{A}$ concept defined where used and every appeal to established physics explained rather than named?
3. Does the document stand on its own at its opening, assuming nothing from other documents that it does not introduce?
4. Does the prose say why each claim is true, not only what it says and why it matters?
5. Is every symbol named in words where it appears, and is each irreducible object followed immediately by prose explaining it?
6. Is the technical prose plain on its own, rather than dense followed by a simpler restatement?
7. Are ontology, effective description, and inference kept distinct where needed?
8. Does the section preserve real strengths before stating criticism?
9. Are transitions explicit enough for textbook reading?
10. Is the tone formal and explanatory rather than conversational?
11. Are all project-specific notation and terminology rules respected?
12. Does the final paragraph clarify what survives, what changes, or what remains open?
13. Are factual, legal, and scientific assertions supported by explicit derivations, independently checkable sources, or declared validation records as appropriate, with references selected under the About Architrino policy?
14. Does any material AI assistance use clear contribution language without implying independent AI authorship or accountability?

## Relation to Local Templates

Many major documents in the project define their own local coverage templates in their overview sections. Those local templates remain authoritative for document-specific structure.

This guide supplies the higher-level prose standard that those templates should be written in.

In short:

- local template decides what a section must cover
- academic style guide decides how that coverage should read
