# Archie Interface App

## Workstream Metadata

- Kind: `priority-app`
- Status: `investigate`
- Claim level: `priority-only`
- Parent priority: [Archie](../archie/archie.md)
- Service platform packet: [Archie Service Platform](../archie/service-platform.md)
- Assistant contract: [assistant-mode-contract.md](../archie/assistant-mode-contract.md)
- Brainstorming: [brainstorming.md](brainstorming.md)
- V1 product requirements: [v1-product-requirements.md](v1-product-requirements.md)

## Current

This bucket owns product and interface planning for a user-facing Archie question surface.

The existing [Archie Service Platform](../archie/service-platform.md) remains the owner for deployment architecture, backend or serverless runtime, model/provider abstraction, source ingestion, privacy, logging, rate limits, token ledger, presentation/media handling, GitHub issue handoff, issue-mining operations, cost controls, observability, and rollback. This bucket focuses on the user experience: conversation modes, multimodal input and output, subscription shape, read-aloud support, guided corpus explanation, idea triage, GitHub issue submission, and generated explanatory media.

The v1 product boundary is captured in [v1-product-requirements.md](v1-product-requirements.md). No runtime AI answer generation is implemented here. This is priority-only planning for a future service.

## Objective

Design Archie as a disciplined public interface to $\mathbb{A}\mathbb{A}\mathbb{A}$ that can help readers ask questions, understand corpus sections, explore new ideas, and produce useful follow-up artifacts without exceeding source authority.

The interface should feel like a working research guide, not an oracle. It should cite sources, expose claim level, explain open proof burdens, and ask for explicit confirmation before filing issues, retaining user media, or spending meaningful tokens.

## Initial Product Thesis

Archie should provide:

1. multimodal input: text first, then speech, image, screenshot, diagram, and document intake when privacy and retention rules are ready;
2. multimodal output: cited text, read-aloud friendly answers, spoken replies, narration scripts, animation storyboards, diagrams, generated images, guided reading paths, app links, submitted issue links, issue drafts, and saved session notes;
3. corpus guidance: source-grounded explanations of published $\mathbb{A}\mathbb{A}\mathbb{A}$ material with claim labels;
4. presentation voice: agent-selected tone, pacing, narration, or storyboard framing that makes papers and concepts easier to read or hear without changing source authority;
5. idea triage: structured feedback on user proposals, including whether they are already covered, plausible, unsupported, or worth turning into a GitHub issue;
6. GitHub action support: user-confirmed issue submission through GitHub, with no embedded credentials or autonomous filing;
7. visual explanation support: generate images or diagrams when they clarify a question, with source and claim boundaries attached;
8. token-based cost control: make all paid or scarce work pass through a visible token wallet with preflight quotes, per-request caps, and post-run receipts.

## Boundaries

- Do not put model API keys, private credentials, or direct public model calls in browser JavaScript.
- Do not present priority-only notes as established corpus claims.
- Do not let generated images imply proof status; label them as explanatory or speculative media.
- Do not let presentation voice, narration, animation, or character framing imply source authority, proof status, or external endorsement.
- Do not file GitHub issues, send mail, create durable user records, retain uploaded media, or charge usage without explicit user consent.
- Do not make the interface depend on model memory as source evidence.
- Do not route around the System Card when an answer touches closure status, caveats, validation, or open proof burdens.

## Product Tracks

1. `corpus_guide` - Ask a question and get a cited explanation with source links, claim level, and next reading path. Status: `candidate`.
2. `multimodal_question_box` - Accept text, voice, screenshots, images, diagrams, and later documents through one intake surface. Status: `candidate`.
3. `read_aloud_and_presentation` - Offer reader-friendly answer formatting, narration scripts, and animation storyboards while preserving source chips, claim labels, and System Card routing. Status: `candidate`.
4. `visual_explainer` - Produce diagrams or generated images for concepts that benefit from visual grounding. Status: `candidate`.
5. `idea_triage` - Help users sharpen new ideas, compare them against the corpus, and decide whether a GitHub issue is warranted. Status: `candidate`.
6. `github_issue_submission` - Convert accepted user ideas or feedback into structured, user-confirmed GitHub issues with source context, claim level, reproduction fields, proof burden fields, and visible public/GitHub-login warnings. Status: `candidate`.
7. `issue_signal_mining` - Mine submitted GitHub issues for duplicates, recurring signal, noise classes, affected surfaces, owner routing, and fix queues. Status: `candidate`.
8. `token_wallet_and_subscription` - Define account tiers, token grants, per-request caps, preflight quotes, pending holds, receipts, rate limits, paid media generation, presentation/media generation, and abuse controls. Status: `candidate`.
9. `saved_research_notebook` - Let opted-in users save conversations, citations, generated media, narration scripts, animation storyboards, submitted issue links, and issue drafts. Status: `candidate`.

## Next Work

1. Use [v1-product-requirements.md](v1-product-requirements.md) to drive the next service-platform architecture packet.
2. Align implementation support with [Archie Service Platform](../archie/service-platform.md) so interface promises match deployment, privacy, token-ledger, and cost boundaries.
3. Convert the fixture-question list into executable regression expectations after the service implementation exists.
4. Define the issue-mining report format that distinguishes recurring signal from noise and routes fixes to owners.
5. Define read-aloud output requirements and the animated-explainer storyboard format.
6. Decide which deferred multimodal capabilities should enter the first post-v1 expansion.
