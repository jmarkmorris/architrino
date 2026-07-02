# Archie Service Platform

## Workstream Metadata

- Kind: `priority-design`
- Status: `long-term`
- Claim level: `priority-only`
- Parent priority: [archie.md](archie.md)
- Assistant contract: [assistant-mode-contract.md](assistant-mode-contract.md)
- System Card markdown: [System Card markdown](../../../content/markdown/aaa/archie/system-card.md)
- Answer artifact manifest: [answer-artifact-manifest.md](../app-archie-interface/answer-artifact-manifest.md)
- Manifest-driven service architecture: [manifest-driven-service-architecture.md](../app-archie-interface/manifest-driven-service-architecture.md)
- Manifest service contracts: [manifest-service-contracts.md](../app-archie-interface/manifest-service-contracts.md)
- Generated media corporate standard: [corporate-media-standards.md](../app-archie-interface/corporate-media-standards.md)
- Generated media acceptance fixtures: [corporate-media-acceptance-fixtures.md](../app-archie-interface/corporate-media-acceptance-fixtures.md)

## Purpose

This priority captures the long-term Archie service: a properly deployed public question interface for architrino.com where readers can ask Archie typed, spoken, and image-grounded questions and receive source-grounded $\mathbb{A}\mathbb{A}\mathbb{A}$-native answers.

This is not a static/local-source UI prototype. The current GitHub Pages site can continue to host the Archie sphere, System Card, corpus navigation, apps, comics, and public project links. The full Archie question service requires a separate deployed platform with backend or serverless runtime support, secret management, source routing, privacy policy, logging policy, rate limits, token accounting, cost controls, monitoring, and rollback behavior.

## Product Direction

Build Archie as a real service after the core theory-closure push has produced enough stable substance for public explanation. The platform should make Archie available to users without asking the GitHub Pages site to do work it cannot safely do.

The desired service should support:

1. typed questions;
2. spoken replies when speech-output policy and privacy handling are ready;
3. spoken questions when speech-input policy and privacy handling are ready;
4. generated image responses when image-generation policy, spending limits, and retention handling are ready;
5. image-grounded questions when image storage, retention, and source-routing rules are ready;
6. generated text, audio, image, diagram, storyboard, and future media artifacts when they satisfy the corporate media standard;
7. $\mathbb{A}\mathbb{A}\mathbb{A}$-native explanatory mode;
8. prior-physics comparison mode;
9. site navigation and app-help mode;
10. claim-level explanation mode;
11. compact source links and System Card routing;
12. unsupported-answer behavior that fails closed rather than inventing claims.

## Deployment Requirements

The service platform must define:

1. public entry route: architrino.com path, subdomain, or linked service entry;
2. frontend hosting strategy: GitHub Pages entry, separate app host, or hybrid;
3. backend runtime: server, serverless function, edge worker, or managed AI gateway;
4. environment and secret management for model/API credentials;
5. model provider abstraction so the UI is not welded to one vendor;
6. corpus ingestion pipeline from versioned repository content;
7. retrieval/index service for authored corpus, generated reading copies, app guides, and curated prior-physics sources;
8. source-authority flags for public, operator/developer, priority-only, and excluded material;
9. Answer Artifact Manifest schema for source context, claim context, answer body, generated artifacts, speech synchronization, token receipts, privacy state, available actions, and issue-mining metadata;
10. manifest-driven service architecture for request gateway, mode router, retrieval context, answer engine, artifact orchestration, speech service, token ledger, issue draft service, privacy/audit, action broker, validators, and conversation surface;
11. manifest service contracts for typed service-boundary inputs/outputs, validator order, endpoint contracts, fail-closed manifest shape, speech sync, token receipts, issue mining, and contract fixtures;
12. token ledger for user-visible token balances, subscription grants, spending limits, auto-fund settings, pending holds, post-run receipts, and refunds;
13. service-native speech and presentation layer for spoken answers, narration scripts, and animated-explainer storyboards that preserve source authority;
14. generated-image response layer for controlled visual artifacts that preserve source authority;
15. corporate media standard enforcement for generated text, audio, images, diagrams, animation storyboards, captions, transcripts, alt text, issue drafts, and future media;
16. speech, image-generation, avatar, animation, and generated-video policy before any service-native spoken, generated-image, or animated output ships;
17. GitHub issue handoff through prefilled issue URLs or a later authenticated action broker, with visible GitHub-login and public-visibility warnings;
18. issue-mining pipeline for duplicate clustering, recurring signal extraction, noise classification, owner routing, and fix queues;
19. rate limits, abuse controls, and cost ceilings;
20. observability: logs, metrics, latency, error classes, source misses, unsupported-answer rate, manifest validation failures, token estimates, tokens spent, presentation/artifact requests, issue handoffs, issue-mining signals, and cost per answer;
21. staging and production environments;
22. release, rollback, and incident-response procedure;
23. privacy, retention, deletion, and user-consent policy for prompts, speech, images, answer histories, narration scripts, animation storyboards, submitted issue links, issue-mining metadata, and token transaction records.

The Answer Artifact Manifest is the platform mechanism for normalizing response shape. It gives the answer engine, media generators, speech layer, token ledger, action rail, issue handoff, issue-mining loop, privacy policy, and observability one shared response envelope instead of separate ad hoc payloads. The manifest-driven service architecture maps that envelope to concrete service components, validators, and endpoint responsibilities. The manifest service contracts turn those components into typed boundary, validator, endpoint, and fail-closed response obligations.

The token ledger is not only a billing convenience. It is the platform mechanism for normalizing heterogeneous service work: static source routing, corpus retrieval, curated external comparison, long-context reasoning, diagram or image work, service-native speech generation, narration scripting, animation storyboarding, issue preparation, speech input, image intake, document intake, and future saved notebooks can all draw different backend resources while still presenting one understandable user-facing unit.

The issue handoff and issue-mining pipeline should follow the same public-safety boundary as the iOS/iPadOS reader feedback path: users control GitHub submission, GitHub login is visible, public issue visibility is explicit, and no public client embeds GitHub credentials. The service must still preserve enough structured issue metadata to mine recurring signal and route fixes instead of letting user feedback become an unprocessed comment pile.

Service-native speech output, generated image responses, and animated explainers are presentation layers, not source authorities. The platform must keep narration style, generated audio, generated images, avatar animation, and generated video subordinate to the same source chips, claim labels, and System Card routes as the plain answer. Native speech is the first target for answer listening, sphere-initiated markdown-portion listening, full-document sphere listening, and concept narration; browser/system narration is only a compatibility fallback. Speech output must be high-quality only: the service should not offer medium-quality or low-quality speech tiers, and if high-quality speech is unavailable the compliant fallback is text-only display rather than degraded audio. Speech output also needs spending-limit behavior, ephemeral audio by default, synchronized displayed verbatim text, accessibility captions/transcripts, basic playback controls, and no real-person imitation or authority-implying voice identity. Generated images need purpose labels, source-basis captions, spending-limit behavior, retention policy, and no proof-status implication. All generated media must also pass the [Generated Media Corporate Standard](../app-archie-interface/corporate-media-standards.md).

## Source Authority

The service must preserve the source classes in [assistant-mode-contract.md](assistant-mode-contract.md). Public answers may use priority material only when the UI clearly exposes development status. External prior-physics sources must be curated or searched through a deliberate source policy; they remain comparison material and do not become $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology.

The answer engine must not treat model memory, chat history, app visuals, or priority prose as proof. When the requested claim exceeds the available sources, Archie should route to the closest supported source, the open proof burden, or the System Card.

## System Card Integration

The System Card must remain visible from the service. The platform should expose:

1. current closure scorecard and date;
2. open proof burdens and known tensions;
3. source-authority policy;
4. enabled input modes;
5. privacy, logging, token cost, and retention status;
6. model/provider status when public answers depend on a model;
7. launch gates and incident/change history.

## Milestones

1. `theory_closure_readiness` - Identify the minimum corpus and validation maturity needed before public AI answers are useful rather than premature. Status: `deferred`.
2. `platform_architecture_packet` - Choose the deployment shape: GitHub Pages entry plus backend, separate hosted app, serverless/edge service, or managed AI gateway. Status: `long-term`.
3. `source_ingestion_design` - Define versioned corpus ingestion, retrieval indexes, source classes, public/operator visibility, and citation payloads. Status: `long-term`.
4. `answer_artifact_manifest_contract` - Turn the Answer Artifact Manifest into typed response schema, validation fixtures, UI rendering obligations, and API failure behavior. Status: `long-term`.
5. `manifest_driven_service_architecture` - Turn the manifest-driven service architecture map into service components, endpoint contracts, validator order, and fail-closed behavior. Status: `long-term`.
6. `manifest_service_contracts` - Encode typed service-boundary inputs/outputs, validator order, endpoint contracts, fail-closed manifest shape, and contract fixtures. Status: `long-term`.
7. `answer_engine_contract` - Define mode routing, retrieval prompts, claim labels, System Card routing, unsupported-answer behavior, manifest population, and regression fixtures. Status: `long-term`.
8. `corporate_media_standard_enforcement` - Define and enforce generated-media policy fixtures for text, audio, images, diagrams, animation storyboards, captions, transcripts, alt text, issue drafts, and future media. Status: `long-term`. Source fixture contract: [corporate-media-acceptance-fixtures.md](../app-archie-interface/corporate-media-acceptance-fixtures.md).
9. `privacy_security_token_cost_policy` - Define prompt/image/speech handling, retention, logs, consent, rate limits, abuse controls, token accounting, and budget controls. Status: `long-term`.
10. `service_native_speech_and_presentation_policy` - Define native speech requirements, narration style rules, speech-input/avatar/video deferrals, storyboard format, accessibility captions/transcripts, token schedule, and source-authority guardrails. Status: `long-term`.
11. `github_issue_feedback_loop` - Define prefilled GitHub issue handoff, public-visibility warning, issue metadata, issue-mining reports, signal/noise classification, and owner-routed fix queues. Status: `long-term`.
12. `deployment_and_ops_plan` - Define staging, production, environment variables, CI/CD, monitoring, rollback, incident response, and domain routing. Status: `long-term`.
13. `public_beta_gate` - Run fixture questions, manifest validation, service-contract validation, source-link QA, System Card checks, generated-media corporate-standard checks, native-speech/storyboard checks, GitHub issue handoff checks, issue-mining checks, privacy review, cost review, and deployment smoke tests before any public beta. Status: `long-term`.

## Near-Term Rule

Do not spend near-term effort on a static/local-source Archie question UI. Keep the current Archie sphere and System Card useful as public navigation and status surfaces, then return effort to core theory closure. When the project is ready to build Archie as a user-facing question service, start from this platform priority rather than from a static mockup.

## Future Implementation Prompt

```text
Closure goal:
Design the long-term Archie service platform so users can ask source-grounded typed, spoken, and image-grounded questions through a properly deployed architrino.com service.

Use the Archie priority packet as the source of truth.

Context:
- The current architrino.com site is deployed through GitHub Pages.
- The operator does not want a static/local-source Archie UI prototype.
- The desired Archie question interface is a long-term service with backend or serverless deployment, privacy policy, token accounting, cost controls, source authority, System Card disclosure, and production operations.
- Every response should use the Answer Artifact Manifest as the shared contract for source context, claim context, answer body, artifacts, speech synchronization, token receipts, privacy state, available actions, and issue-mining metadata.
- Use the manifest-driven service architecture map for service components, validators, endpoint responsibilities, and fail-closed behavior.
- Use the manifest service contracts for typed service-boundary inputs/outputs, validator ordering, endpoint request/response shapes, and contract fixtures.
- Generated text, audio, images, diagrams, animation storyboards, captions, transcripts, alt text, issue drafts, and future media must satisfy the Generated Media Corporate Standard and its acceptance fixtures.
- The service should wait behind core theory closure unless platform work directly unblocks public readiness.

Task:
- Produce a deployment architecture packet for the full Archie service.
- Compare deployment options: GitHub Pages entry plus backend, separate hosted webapp, serverless/edge service, and managed AI gateway.
- Define the source-ingestion pipeline, Answer Artifact Manifest schema, manifest-driven service components, typed service-boundary contracts, validator order, endpoint contracts, answer-engine boundary, model/provider abstraction, service-native speech and presentation layer, generated-media corporate-standard enforcement, animation-storyboard boundary, privacy/security/token-accounting policy, GitHub issue handoff, issue-mining loop, observability, staging/production split, and rollback plan.
- Identify the minimum theory-closure and corpus-readiness gates before public beta.

Scope:
- Inspect `reference/priorities/archie/archie.md`, `reference/priorities/archie/assistant-mode-contract.md`, `reference/priorities/archie/service-platform.md`, `reference/priorities/app-archie-interface/answer-artifact-manifest.md`, `reference/priorities/app-archie-interface/manifest-driven-service-architecture.md`, `reference/priorities/app-archie-interface/manifest-service-contracts.md`, `reference/priorities/app-archie-interface/corporate-media-standards.md`, `reference/priorities/app-archie-interface/corporate-media-acceptance-fixtures.md`, `content/markdown/aaa/archie/system-card.md`, `README.md`, deployment files, and runtime entry points.
- Do not build runtime code unless explicitly requested.
- Do not add browser-side model API calls, private credentials, or public prompt logging.

Constraints:
- Preserve TeX exactly.
- Use canonical $\mathbb{A}\mathbb{A}\mathbb{A}$ terminology.
- Keep priority-only material visibly priority-only.
- Treat this as a product, deployment, privacy, and operations design packet, not a theory proof claim.

Expected output:
- Recommended long-term architecture.
- Deployment option comparison.
- Required platform decisions.
- Public beta gates.
- Concrete implementation phases.
```
