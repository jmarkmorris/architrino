# Academic Style Guide

This guide defines the prose standard for reader-facing textbook material in the webapp. Its purpose is to make voice, structure, tone, and editorial discipline consistent enough that chapters read like parts of one coherent corpus rather than isolated notes with incompatible habits.

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

Do not apply this guide mechanically to interface help text or ultra-short glossary entries where brevity is the dominant requirement.

## Core Aim

The target voice is that of an academic textbook: clear, orderly, explicit, and serious without becoming inflated, evasive, or bureaucratic.

The prose should do three things at once:

1. State the claim.
2. Explain the conceptual structure behind the claim.
3. Distinguish what is established, what is inferred, and what remains open.

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

## Paragraphing Standard

Default paragraph pattern:

1. Opening sentence states the claim or function of the paragraph.
2. Middle sentences develop the distinction, mechanism, or historical pressure.
3. Final sentence either closes the point or prepares the next step.

Prefer medium-length paragraphs. Avoid both one-sentence fragment chains and extremely long blocks unless the material genuinely requires them.

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

## Preferred Sentence Patterns

Good sentence patterns for this project include:

- "The question is whether..."
- "The framework treats X as..., while Y is treated as..."
- "What survives is..."
- "The limitation appears when..."
- "This remains useful at the effective level, but not as final ontology."
- "The comparison is strongest at the level of..., and weakest at the level of..."

These patterns keep the prose analytic and layered.

## What To Avoid

Avoid the following unless there is a specific reason to retain them:

- colloquialisms
- chatty asides
- second-person address in textbook chapters
- hype phrases
- empty intensifiers
- unresolved pronouns such as "this" or "that" when the referent is unclear
- metaphor used in place of mechanism
- rhetorical questions used as ornament rather than structure

## Project-Specific Rules

### $\mathbb{A}\mathbb{A}\mathbb{A}$ styling

When referring to the theory in prose or math, use the stylized form `$\mathbb{A}\mathbb{A}\mathbb{A}$`.

Do not replace it with plain-text variants except in literal file paths or code identifiers.

### TeX preservation

Preserve TeX delimiters and content exactly:

- `$...$`
- `$$...$$`
- `\(...\)`
- `\[...\]`

Do not rewrite prose in ways that break KaTeX rendering or accidentally trigger markdown emphasis inside TeX expressions.

KaTeX authoring rules:

- Use inline math for short expressions that live inside prose sentences.
- Use display math only for standalone equations, not for sentence fragments or preview-style summary lines.
- Do not place `$$...$$` inline inside headings, list items, callouts, captions, or notebook summary sentences.
- For inline inequalities or expressions containing `<` or `>` in prose, prefer `\(...\)` with spaces, for example `\(1 < m < n\)`.
- When a short formula is part of a narrative sentence, prefer one inline expression over a stacked display unless the derivation truly needs display layout.

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

Avoid outdated terminology built from `retard` or `retarded` outside literal historical quotations.

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

Do not let `spacetime`, `void`, `timespace`, `Noether Sea`, and `spacetime medium` drift into one another.

Preferred prose discipline:

- `Euclidean void` for the fixed spatial container
- `absolute time` for the universal temporal parameter
- `absolute timespace` for the formal product background $\mathbb{R}\times\mathbb{R}^3$
- `Noether Sea` for the ambient contents
- `spacetime medium` only as a bridge term
- `spacetime` for emergent or observer-level geometry

If a sentence could refer either to the background, the contents, or the emergent geometry, rewrite it until the level is explicit.

### Reader-facing posture

Documents in `content/markdown/aaa` should be reader-ready.

Avoid:

- internal team notes
- planning checklists inside textbook prose
- status flags embedded in the body
- references to private collaboration context

## Section-Length Standard

For substantial conceptual leaves, the default target is at least one page of meaningful prose, and often more.

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
- "under current interpretation"
- "as a first-pass classification"

Do not use qualification to evade commitment. If the text is making a real claim, state it plainly and then delimit its scope.

## Editorial Checklist

Before finalizing a reader-facing chapter or section, check the following:

1. Does the opening identify the subject and its significance?
2. Are ontology, effective description, and inference kept distinct where needed?
3. Does the section preserve real strengths before stating criticism?
4. Are transitions explicit enough for textbook reading?
5. Is the tone formal and explanatory rather than conversational?
6. Are all project-specific notation and terminology rules respected?
7. Does the final paragraph clarify what survives, what changes, or what remains open?

## Relation to Local Templates

Many major documents in the project define their own local coverage templates in their overview sections. Those local templates remain authoritative for document-specific structure.

This guide supplies the higher-level prose standard that those templates should be written in.

In short:

- local template decides what a section must cover
- academic style guide decides how that coverage should read
