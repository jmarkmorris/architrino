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
- Answer artifact manifest: [answer-artifact-manifest.md](answer-artifact-manifest.md)
- Manifest-driven service architecture: [manifest-driven-service-architecture.md](manifest-driven-service-architecture.md)
- Manifest service contracts: [manifest-service-contracts.md](manifest-service-contracts.md)
- Answer engine source contract: [answer-engine-source-contract.md](answer-engine-source-contract.md)
- Token ledger and privacy contract: [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md)
- Issue mining signal contract: [issue-mining-signal-contract.md](issue-mining-signal-contract.md)
- Service-native speech and presentation contract: [service-native-speech-presentation-contract.md](service-native-speech-presentation-contract.md)
- Visual artifact contract: [visual-artifact-contract.md](visual-artifact-contract.md)
- Generated media corporate standard: [corporate-media-standards.md](corporate-media-standards.md)
- Generated media acceptance fixtures: [corporate-media-acceptance-fixtures.md](corporate-media-acceptance-fixtures.md)

## Current

This bucket owns product and interface planning for a user-facing Archie question surface.

The existing [Archie Service Platform](../archie/service-platform.md) remains the owner for deployment architecture, backend or serverless runtime, model/provider abstraction, source ingestion, privacy, logging, rate limits, token ledger, presentation/media handling, GitHub issue handoff, issue-mining operations, cost controls, observability, and rollback. This bucket focuses on the user experience: conversation modes, multimodal input and output, subscription shape, service-native speech output, guided corpus explanation, idea triage, GitHub issue submission, generated explanatory media, and the [Generated Media Corporate Standard](corporate-media-standards.md).

The v1 product boundary is captured in [v1-product-requirements.md](v1-product-requirements.md). The shared answer response shape is captured in [answer-artifact-manifest.md](answer-artifact-manifest.md). The first service-boundary map is captured in [manifest-driven-service-architecture.md](manifest-driven-service-architecture.md). The typed service, validator, and endpoint contract target is captured in [manifest-service-contracts.md](manifest-service-contracts.md). The upstream source-selection and claim-label rules are captured in [answer-engine-source-contract.md](answer-engine-source-contract.md). Token accounting, spending limits, receipts, privacy state, and retention rules are captured in [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md). Issue-mining report, clustering, noise, owner-lane, and fix-queue rules are captured in [issue-mining-signal-contract.md](issue-mining-signal-contract.md). Service-native speech, synchronized verbatim text, captions/transcripts, narration scripts, and storyboards are captured in [service-native-speech-presentation-contract.md](service-native-speech-presentation-contract.md). Visual diagrams, generated images, purpose labels, captions, alt text, retention, and proof-status guardrails are captured in [visual-artifact-contract.md](visual-artifact-contract.md). No runtime AI answer generation is implemented here. This is priority-only planning for a future service.

## Objective

Design Archie as a disciplined public interface to $\mathbb{A}\mathbb{A}\mathbb{A}$ that can help readers ask questions, understand corpus sections, explore new ideas, and produce useful follow-up artifacts without exceeding source authority.

The interface should feel like a working research guide, not an oracle. It should cite sources, expose claim level, explain open proof burdens, and ask for explicit confirmation before filing issues, retaining user media, or spending meaningful tokens.

## Initial Product Thesis

Archie should provide:

1. multimodal input: text first, then speech, image, screenshot, diagram, and document intake when privacy and retention rules are ready;
2. multimodal output: cited text, high-quality service-native spoken replies synchronized with displayed verbatim text, narration scripts, animation storyboards, diagrams, generated images, future generated video, guided reading paths, app links, submitted issue links, issue drafts, and saved session notes;
3. corpus guidance: source-grounded explanations of published $\mathbb{A}\mathbb{A}\mathbb{A}$ material with claim labels;
4. presentation voice: agent-selected tone, narration, or storyboard framing that makes papers and concepts easier to read or hear without changing source authority;
5. idea triage: structured feedback on user proposals, including whether they are already covered, plausible, unsupported, or worth turning into a GitHub issue;
6. GitHub action support: user-confirmed issue submission through GitHub, with no embedded credentials or autonomous filing;
7. visual explanation support: generate images or diagrams when they clarify a question, with source and claim boundaries attached;
8. token-based cost control: make paid or scarce work respect user spending limits, optional auto-fund settings, per-request caps, and post-run receipts without forcing constant token prompts.

Question responses may therefore produce text, generated audio, generated images, diagrams, animation storyboards, and any future generated media as answer artifacts when the user requests them or when the selected mode makes them useful. Those artifacts must satisfy the [Generated Media Corporate Standard](corporate-media-standards.md) and remain subordinate to the same source links, claim labels, and System Card routing as the text answer.

Every response should be represented by the [Answer Artifact Manifest](answer-artifact-manifest.md) before it is rendered. The manifest is the shared contract for source context, claim labels, displayed text, generated media, synchronized speech, token receipts, privacy state, available actions, and issue-mining metadata.

## Boundaries

- Do not put model API keys, private credentials, or direct public model calls in browser JavaScript.
- Do not present priority-only notes as established corpus claims.
- Do not generate any media that fails the [Generated Media Corporate Standard](corporate-media-standards.md).
- Do not let generated images imply proof status; label them as explanatory or speculative media.
- Do not let presentation voice, narration, animation, or character framing imply source authority, proof status, or external endorsement.
- Do not file GitHub issues, send mail, create durable user records, retain uploaded media, or charge usage without explicit user consent.
- Do not make the interface depend on model memory as source evidence.
- Do not route around the System Card when an answer touches closure status, caveats, validation, or open proof burdens.

## Product Tracks

1. `corpus_guide` - Ask a question and get a cited explanation with source links, claim level, and next reading path. Status: `candidate`.
2. `multimodal_question_box` - Accept text, voice, screenshots, images, diagrams, and later documents through one intake surface. Status: `candidate`.
3. `answer_artifact_manifest` - Keep source context, claim labels, answer body, generated media, speech sync, token receipt, privacy state, available actions, and issue-mining metadata in one response envelope. Status: `candidate`.
4. `manifest_driven_service_architecture` - Map the manifest to service components, validators, endpoints, speech sync, token receipts, privacy state, and issue-mining flow. Status: `candidate`.
5. `manifest_service_contracts` - Define typed service-boundary inputs/outputs, validator ordering, endpoint contracts, fail-closed manifest shape, and contract fixtures. Status: `candidate`.
6. `answer_engine_source_contract` - Define source selection, claim-label assignment, unsupported-answer behavior, answer body fields, and idea-triage classification before media or token work. Status: `candidate`.
7. `token_ledger_privacy_contract` - Define account grants, spending limits, auto-fund, holds, receipts, privacy state, retention defaults, deletion routes, and confirmation gates. Status: `candidate`.
8. `issue_mining_signal_contract` - Define mining inputs, cluster shape, signal scoring, noise classes, owner lanes, periodic reports, fix queues, and privacy-safe evidence. Status: `candidate`.
9. `service_native_speech_and_presentation_contract` - Define high-quality speech, synchronized displayed verbatim text, captions/transcripts, narration scripts, storyboards, accessibility, voice identity, token, and retention rules. Status: `candidate`.
10. `visual_artifact_contract` - Define diagrams, generated images, generated-image prompts, app mockups, candidate sketches, purpose labels, captions, alt text, retention, and proof-status guardrails. Status: `candidate`.
11. `idea_triage` - Help users sharpen new ideas, compare them against the corpus, and decide whether a GitHub issue is warranted. Status: `candidate`.
12. `github_issue_submission` - Convert accepted user ideas or feedback into structured, user-confirmed GitHub issues with source context, claim level, reproduction fields, proof burden fields, and visible public/GitHub-login warnings. Status: `candidate`.
13. `issue_signal_mining` - Mine submitted GitHub issues for duplicates, recurring signal, noise classes, affected surfaces, owner routing, and fix queues. Status: `candidate`.
14. `token_wallet_and_subscription` - Define account tiers, token grants, spending limits, auto-fund settings, per-request caps, pending holds, receipts, rate limits, paid media generation, presentation/media generation, and abuse controls. Status: `candidate`.
15. `saved_research_notebook` - Let opted-in users save conversations, citations, generated media, narration scripts, animation storyboards, submitted issue links, and issue drafts. Status: `candidate`.

## Next Work

1. Use [answer-engine-source-contract.md](answer-engine-source-contract.md) to drive source-selection, claim-label, unsupported-answer, answer-body, and idea-triage fixtures.
2. Use [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md) to drive wallet, cap, hold, charge, refund, retention-state, deletion-route, receipt, and privacy fixtures.
3. Use [issue-mining-signal-contract.md](issue-mining-signal-contract.md) to drive duplicate clustering, recurring-signal reports, noise classes, owner lanes, fix queues, and privacy-safe evidence fixtures.
4. Use [service-native-speech-presentation-contract.md](service-native-speech-presentation-contract.md) to drive speech-sync, high-quality-only audio, text-only fallback, captions/transcripts, narration-script, storyboard, accessibility, voice-identity, token, and privacy fixtures.
5. Use [visual-artifact-contract.md](visual-artifact-contract.md) to drive diagram, generated-image, purpose-label, caption, alt-text, retention, accessibility, rights, and proof-status fixtures.
6. Use [manifest-service-contracts.md](manifest-service-contracts.md) to drive typed service-boundary, validator, endpoint, and fixture implementation.
7. Use [manifest-driven-service-architecture.md](manifest-driven-service-architecture.md) as the service-boundary map for the next implementation-ready architecture packet.
8. Use [answer-artifact-manifest.md](answer-artifact-manifest.md) as the response-envelope contract for that architecture packet.
9. Use [v1-product-requirements.md](v1-product-requirements.md) to drive the product boundary around that manifest.
10. Align implementation support with [Archie Service Platform](../archie/service-platform.md) so interface promises match deployment, privacy, token-ledger, and cost boundaries.
11. Convert the fixture-question list into executable regression expectations after the service implementation exists.
12. Use [corporate-media-acceptance-fixtures.md](corporate-media-acceptance-fixtures.md) as the concrete fixture contract for generated text, audio, images, diagrams, animation, and future video.
13. Decide which deferred multimodal capabilities should enter the first post-v1 expansion.
