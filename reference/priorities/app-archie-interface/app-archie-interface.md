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

The existing [Archie Service Platform](../archie/service-platform.md) remains the owner for deployment architecture, backend or serverless runtime, model/provider abstraction, source ingestion, privacy, logging, rate limits, token ledger, cost controls, observability, and rollback. This bucket focuses on the user experience: conversation modes, multimodal input and output, subscription shape, guided corpus explanation, idea triage, GitHub issue drafting, and generated explanatory media.

The v1 product boundary is captured in [v1-product-requirements.md](v1-product-requirements.md). No runtime AI answer generation is implemented here. This is priority-only planning for a future service.

## Objective

Design Archie as a disciplined public interface to $\mathbb{A}\mathbb{A}\mathbb{A}$ that can help readers ask questions, understand corpus sections, explore new ideas, and produce useful follow-up artifacts without exceeding source authority.

The interface should feel like a working research guide, not an oracle. It should cite sources, expose claim level, explain open proof burdens, and ask for explicit confirmation before filing issues, retaining user media, or spending meaningful tokens.

## Initial Product Thesis

Archie should provide:

1. multimodal input: text first, then speech, image, screenshot, diagram, and document intake when privacy and retention rules are ready;
2. multimodal output: cited text, spoken replies, diagrams, generated images, guided reading paths, app links, issue drafts, and saved session notes;
3. corpus guidance: source-grounded explanations of published $\mathbb{A}\mathbb{A}\mathbb{A}$ material with claim labels;
4. idea triage: structured feedback on user proposals, including whether they are already covered, plausible, unsupported, or worth turning into an issue;
5. GitHub action support: draft issues or discussion packets only after explicit user confirmation;
6. visual explanation support: generate images or diagrams when they clarify a question, with source and claim boundaries attached;
7. token-based cost control: make all paid or scarce work pass through a visible token wallet with preflight quotes, per-request caps, and post-run receipts.

## Boundaries

- Do not put model API keys, private credentials, or direct public model calls in browser JavaScript.
- Do not present priority-only notes as established corpus claims.
- Do not let generated images imply proof status; label them as explanatory or speculative media.
- Do not file GitHub issues, send mail, create durable user records, retain uploaded media, or charge usage without explicit user consent.
- Do not make the interface depend on model memory as source evidence.
- Do not route around the System Card when an answer touches closure status, caveats, validation, or open proof burdens.

## Product Tracks

1. `corpus_guide` - Ask a question and get a cited explanation with source links, claim level, and next reading path. Status: `candidate`.
2. `multimodal_question_box` - Accept text, voice, screenshots, images, diagrams, and later documents through one intake surface. Status: `candidate`.
3. `visual_explainer` - Produce diagrams or generated images for concepts that benefit from visual grounding. Status: `candidate`.
4. `idea_triage` - Help users sharpen new ideas, compare them against the corpus, and decide whether a GitHub issue is warranted. Status: `candidate`.
5. `issue_drafting` - Convert accepted user ideas into structured GitHub issue drafts with source context, claim level, and reproduction or proof burden fields. Status: `candidate`.
6. `token_wallet_and_subscription` - Define account tiers, token grants, per-request caps, preflight quotes, pending holds, receipts, rate limits, paid media generation, and abuse controls. Status: `candidate`.
7. `saved_research_notebook` - Let opted-in users save conversations, citations, generated media, and issue drafts. Status: `candidate`.

## Next Work

1. Use [v1-product-requirements.md](v1-product-requirements.md) to drive the next service-platform architecture packet.
2. Align implementation support with [Archie Service Platform](../archie/service-platform.md) so interface promises match deployment, privacy, token-ledger, and cost boundaries.
3. Convert the fixture-question list into executable regression expectations after the service implementation exists.
4. Decide which deferred multimodal capabilities should enter the first post-v1 expansion.
