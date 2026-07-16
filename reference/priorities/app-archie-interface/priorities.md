# Archie Interface App

## Workstream Metadata

- Kind: `priority-app`
- Rank: `30`
- Value: `0.86`
- Cost: `3.5`
- ROI: `0.25`
- Status: `investigate`
- Claim level: `priority-only`
- Parent priority: [Archie](../archie/priorities.md)
- Service platform packet: [Archie Service Platform](../archie/service-platform.md)
- Service deployment option decision: [service-deployment-option-decision.md](../archie/service-deployment-option-decision.md)
- Service deployment architecture: [service-deployment-architecture.md](../archie/service-deployment-architecture.md)
- Service scaffolding and fixtures: [service-scaffolding-and-fixtures.md](../archie/service-scaffolding-and-fixtures.md)
- Assistant contract: [assistant-mode-contract.md](../archie/assistant-mode-contract.md)
- Brainstorming: [brainstorming.md](brainstorming.md)
- V1 product requirements: [v1-product-requirements.md](v1-product-requirements.md)
- Answer artifact manifest: [answer-artifact-manifest.md](answer-artifact-manifest.md)
- Manifest-driven service architecture: [manifest-driven-service-architecture.md](manifest-driven-service-architecture.md)
- Manifest service contracts: [manifest-service-contracts.md](manifest-service-contracts.md)
- Source ingestion and retrieval context contract: [source-ingestion-retrieval-context-contract.md](source-ingestion-retrieval-context-contract.md)
- Answer engine source contract: [answer-engine-source-contract.md](answer-engine-source-contract.md)
- Model/provider capability registry contract: [model-provider-capability-registry-contract.md](model-provider-capability-registry-contract.md)
- Token ledger and privacy contract: [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md)
- Issue mining signal contract: [issue-mining-signal-contract.md](issue-mining-signal-contract.md)
- Observability, public status, and incident contract: [observability-public-status-incident-contract.md](observability-public-status-incident-contract.md)
- Action broker confirmation contract: [action-broker-confirmation-contract.md](action-broker-confirmation-contract.md)
- Saved notebook and account history contract: [saved-notebook-account-history-contract.md](saved-notebook-account-history-contract.md)
- Service terms and account policy contract: [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md)
- Service-native speech and presentation contract: [service-native-speech-presentation-contract.md](service-native-speech-presentation-contract.md)
- Visual artifact contract: [visual-artifact-contract.md](visual-artifact-contract.md)
- Generated media corporate standard: [corporate-media-standards.md](corporate-media-standards.md)
- Generated media acceptance fixtures: [corporate-media-acceptance-fixtures.md](corporate-media-acceptance-fixtures.md)
- AI communication standards: [ai-communication-standards.md](ai-communication-standards.md)

## Current

This bucket owns product and interface planning for a user-facing Archie question surface.

The existing [Archie Service Platform](../archie/service-platform.md) remains the owner for deployment architecture, backend or serverless runtime, model/provider abstraction, source ingestion, privacy, logging, rate limits, token ledger, presentation/media handling, GitHub issue handoff, issue-mining operations, cost controls, observability, and rollback. Its deployment option decision is captured in [service-deployment-option-decision.md](../archie/service-deployment-option-decision.md): public static entry plus hosted service backend. Its concrete deployment boundary map is captured in [service-deployment-architecture.md](../archie/service-deployment-architecture.md). Its first schema-only implementation target is captured in [service-scaffolding-and-fixtures.md](../archie/service-scaffolding-and-fixtures.md). This bucket focuses on the user experience: conversation modes, multimodal input and output, subscription shape, service-native speech output, guided corpus explanation, idea triage, GitHub issue submission, generated explanatory media, and the [Generated Media Corporate Standard](corporate-media-standards.md).

The v1 product boundary is captured in [v1-product-requirements.md](v1-product-requirements.md). The shared answer response shape is captured in [answer-artifact-manifest.md](answer-artifact-manifest.md). The first service-boundary map is captured in [manifest-driven-service-architecture.md](manifest-driven-service-architecture.md). The typed service, validator, and endpoint contract target is captured in [manifest-service-contracts.md](manifest-service-contracts.md). Source ingestion, route identity, freshness, source chips, and `source_context` population are captured in [source-ingestion-retrieval-context-contract.md](source-ingestion-retrieval-context-contract.md). The upstream source-selection and claim-label rules are captured in [answer-engine-source-contract.md](answer-engine-source-contract.md). Model/provider capabilities, quality gates, fallback behavior, credential boundaries, cost classes, privacy/terms checks, and no-browser-key behavior are captured in [model-provider-capability-registry-contract.md](model-provider-capability-registry-contract.md). Token accounting, spending limits, receipts, privacy state, and retention rules are captured in [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md). Issue-mining report, clustering, noise, owner-lane, and fix-queue rules are captured in [issue-mining-signal-contract.md](issue-mining-signal-contract.md). Privacy-safe logs, metrics, public status, incident records, change history, and diagnostics redaction are captured in [observability-public-status-incident-contract.md](observability-public-status-incident-contract.md). Confirmation-gated public, durable, paid, retained, and credentialed actions are captured in [action-broker-confirmation-contract.md](action-broker-confirmation-contract.md). Saved-note drafts, durable notebook entries, account history, deletion, export, sharing, storage-cost rules, and private-note evidence boundaries are captured in [saved-notebook-account-history-contract.md](saved-notebook-account-history-contract.md). Service terms, token/subscription disclosures, account acceptance, public issue notices, generated-media terms, support routes, abuse controls, and legal-review launch gates are captured in [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md). Service-native speech, synchronized verbatim text, captions/transcripts, narration scripts, and storyboards are captured in [service-native-speech-presentation-contract.md](service-native-speech-presentation-contract.md). Visual diagrams, generated images, purpose labels, captions, alt text, retention, and proof-status guardrails are captured in [visual-artifact-contract.md](visual-artifact-contract.md). No runtime AI answer generation is implemented here. This is priority-only planning for a future service.

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
- Do not expose provider-specific billing units, raw provider payloads, model secrets, or provider output as source evidence.
- Do not present priority-only notes as established corpus claims.
- Do not generate any media that fails the [Generated Media Corporate Standard](corporate-media-standards.md).
- Do not let generated images imply proof status; label them as explanatory or speculative media.
- Do not let presentation voice, narration, animation, or character framing imply source authority, proof status, or external endorsement.
- Do not file GitHub issues, send mail, create durable user records, retain uploaded media, or charge usage without explicit user consent.
- Do not offer paid, durable, retained, public, generated-media, or credentialed service actions unless the required service terms, privacy notice, token terms, and action notices are current.
- Do not expose private prompt text, private user media, provider secrets, raw provider payloads, account history, or private saved notes through logs, metrics, support summaries, issue-mining records, public status, or incidents.
- Do not make the interface depend on model memory as source evidence.
- Do not route around the System Card when an answer touches closure status, caveats, validation, or open proof burdens.

## Product Tracks

1. `corpus_guide` - Ask a question and get a cited explanation with source links, claim level, and next reading path. Status: `candidate`.
2. `multimodal_question_box` - Accept text, voice, screenshots, images, diagrams, and later documents through one intake surface. Status: `candidate`.
3. `answer_artifact_manifest` - Keep source context, claim labels, answer body, generated media, speech sync, token receipt, privacy state, available actions, and issue-mining metadata in one response envelope. Status: `candidate`.
4. `manifest_driven_service_architecture` - Map the manifest to service components, validators, endpoints, speech sync, token receipts, privacy state, and issue-mining flow. Status: `candidate`.
5. `manifest_service_contracts` - Define typed service-boundary inputs/outputs, validator ordering, endpoint contracts, fail-closed manifest shape, and contract fixtures. Status: `candidate`.
6. `source_ingestion_retrieval_context_contract` - Define source records, route identity, freshness, source chips, source visibility, missing-route behavior, and manifest `source_context` population. Status: `candidate`.
7. `answer_engine_source_contract` - Define source selection, claim-label assignment, unsupported-answer behavior, answer body fields, and idea-triage classification before media or token work. Status: `candidate`.
8. `model_provider_capability_registry_contract` - Define provider-backed capabilities, quality gates, fallback behavior, credential boundaries, cost classes, provider privacy/terms checks, health state, observability, and no-browser-key enforcement. Status: `candidate`.
9. `token_ledger_privacy_contract` - Define account grants, spending limits, auto-fund, holds, receipts, privacy state, retention defaults, deletion routes, and confirmation gates. Status: `candidate`.
10. `issue_mining_signal_contract` - Define mining inputs, cluster shape, signal scoring, noise classes, owner lanes, periodic reports, fix queues, and privacy-safe evidence. Status: `candidate`.
11. `observability_public_status_incident_contract` - Define privacy-safe event classes, metrics, public status, incident records, change history, support diagnostics, and redaction gates. Status: `candidate`.
12. `action_broker_confirmation_contract` - Define confirmation-gated GitHub handoff, saved-note, auto-fund, user-material inclusion, sharing, credentialed action, action-result, and side-effect guards. Status: `candidate`.
13. `saved_notebook_account_history_contract` - Define session drafts, durable notebook entries, account history, deletion, export, sharing, storage cost, issue-link retention, and private-note evidence boundaries. Status: `candidate`.
14. `service_terms_account_policy_contract` - Define hosted-service terms, token/subscription disclosures, account acceptance, privacy notices, public issue notices, generated-media terms, support routes, abuse controls, and legal-review launch gates. Status: `candidate`.
15. `service_native_speech_and_presentation_contract` - Define high-quality speech, synchronized displayed verbatim text, captions/transcripts, narration scripts, storyboards, accessibility, voice identity, token, and retention rules. Status: `candidate`.
16. `visual_artifact_contract` - Define diagrams, generated images, generated-image prompts, app mockups, candidate sketches, purpose labels, captions, alt text, retention, and proof-status guardrails. Status: `candidate`.
17. `ai_communication_standards` - Track emerging standards for AI disclosure, generated-media labeling, provenance, user control, accessibility, and service-status communication, then translate any adoption into normal user-facing language. Status: `candidate`.
18. `idea_triage` - Help users sharpen new ideas, compare them against the corpus, and decide whether a GitHub issue is warranted. Status: `candidate`.
19. `github_issue_submission` - Convert accepted user ideas or feedback into structured, user-confirmed GitHub issues with source context, claim level, reproduction fields, proof burden fields, and visible public/GitHub-login warnings. Status: `candidate`.
20. `issue_signal_mining` - Mine submitted GitHub issues for duplicates, recurring signal, noise classes, affected surfaces, owner routing, and fix queues. Status: `candidate`.
21. `token_wallet_and_subscription` - Define account tiers, token grants, spending limits, auto-fund settings, per-request caps, pending holds, receipts, rate limits, paid media generation, presentation/media generation, and abuse controls. Status: `candidate`.
22. `saved_research_notebook` - Let opted-in users save conversations, citations, generated media, narration scripts, animation storyboards, submitted issue links, and issue drafts. Status: `candidate`.
23. `service_deployment_option_decision` - Use the GitHub Pages public entry plus hosted service backend decision as the boundary between the public site, browser client, service API, background jobs, and external providers. Status: `candidate`.
24. `service_deployment_architecture` - Assign public site, browser client, service API, background jobs, source-index, provider gateway, token ledger, action broker, issue-mining, observability, staging, production, CI/CD, rollback, and smoke-test responsibilities. Status: `candidate`.
25. `service_scaffolding_and_fixtures` - Define schema-only service module targets, fixture families, environment variable classes, CI gates, and implementation stages before runtime providers or public launch. Status: `candidate`.

## Next Work

1. Keep the Answer Artifact Manifest as the response envelope for source context, claim labels, answer body, generated media, speech sync, token receipt, privacy state, available actions, and issue-mining metadata.
2. Use the [ai-communication-standards.md](ai-communication-standards.md) gate for any future service-boundary, speech, token, issue-mining, generated-media, privacy, service-status, action-confirmation, or saved-note work.
3. Defer service-native speech, generated-media, service-terms, observability, token-ledger, action-broker, and issue-mining fixture expansion until the standards gate and service implementation target both need executable regression coverage.
4. Keep runtime providers, payments, durable storage, public launch behavior, browser-side model calls, hidden GitHub writes, and generated-media calls out of scope unless explicitly selected.
5. Decide which deferred multimodal capabilities should enter the first post-v1 expansion only after the manifest communication gate is stable.
