# Archie Service Platform

## Workstream Metadata

- Kind: `priority-design`
- Status: `long-term`
- Claim level: `priority-only`
- Parent priority: [priorities.md](priorities.md)
- Assistant contract: [assistant-mode-contract.md](assistant-mode-contract.md)
- System Card markdown: [System Card markdown](../../../../content/markdown/aaa/archie/system-card.md)
- Service deployment option decision: [service-deployment-option-decision.md](service-deployment-option-decision.md)
- Service deployment architecture: [service-deployment-architecture.md](service-deployment-architecture.md)
- Service scaffolding and fixtures: [service-scaffolding-and-fixtures.md](service-scaffolding-and-fixtures.md)
- MCP software-client protocol adapter: [mcp/priorities.md](mcp/priorities.md)
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
- Generated media corporate standard: [corporate-media-standards.md](corporate-media-standards.md)
- Generated media acceptance fixtures: [corporate-media-acceptance-fixtures.md](corporate-media-acceptance-fixtures.md)

## Purpose

This priority captures the long-term Archie service: a properly deployed public question interface for architrino.com where readers can ask Archie typed, spoken, and image-grounded questions and receive source-grounded $\mathbb{A}\mathbb{A}\mathbb{A}$-native answers.

This is not a static/local-source UI prototype. The current GitHub Pages site can continue to host the Archie sphere, System Card, corpus navigation, apps, comics, and public project links. The full Archie question service requires a separate deployed platform with backend or serverless runtime support, secret management, source routing, privacy policy, logging policy, rate limits, token accounting, cost controls, monitoring, and rollback behavior.

The deployment option decision is captured in [service-deployment-option-decision.md](service-deployment-option-decision.md). The current recommendation is a GitHub Pages public entry plus a hosted service backend: the public site remains the entry and documentation surface, while provider calls, token authority, source retrieval, action confirmation, account policy, manifest validation, issue mining, observability, and privacy/audit behavior live behind the service boundary. The concrete deployment boundary map is captured in [service-deployment-architecture.md](service-deployment-architecture.md). The first schema-only implementation target is captured in [service-scaffolding-and-fixtures.md](service-scaffolding-and-fixtures.md).

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
12. unsupported-answer behavior that does not advance rather than inventing claims.

## Deployment Requirements

The service platform must define:

1. public entry route: architrino.com path, subdomain, or linked service entry;
2. frontend hosting strategy: GitHub Pages entry, separate app host, or hybrid;
3. backend runtime: server, serverless function, edge worker, or managed AI gateway;
4. environment and secret management for model/API credentials;
5. model provider abstraction so the UI is not welded to one vendor;
6. model/provider capability registry for product capability ids, enabled and health state, quality gates, fallback behavior, credential boundaries, token cost classes, privacy/provider data-use, provider terms, observability, and no-browser-key enforcement;
7. corpus ingestion pipeline from versioned repository content;
8. retrieval/index service for authored corpus, generated reading copies, scene routes, app guides, Archie references, priority material, and curated prior-physics sources;
9. source ingestion and retrieval context contract for source records, route identity, source freshness, source chips, missing routes, visibility, and authority flags;
10. Answer Artifact Manifest schema for source context, claim context, answer body, provider execution context, generated artifacts, speech synchronization, token receipts, privacy state, available actions, and issue-mining metadata;
11. manifest-driven service architecture for request gateway, mode router, retrieval context, provider registry, answer engine, artifact orchestration, speech service, token ledger, issue draft service, privacy/audit, action broker, validators, and conversation surface;
12. manifest service contracts for typed service-boundary inputs/outputs, validator order, endpoint contracts, manifest shape for a Not advanced disposition, provider capability context, speech sync, token receipts, issue mining, and contract fixtures;
13. answer-engine source contract for source selection, claim-label assignment, unsupported-answer behavior, answer body fields, and idea-triage classification;
14. token ledger and privacy contract for user-visible token balances, subscription grants, spending limits, auto-fund settings, pending holds, post-run receipts, refunds, provider cost classes, privacy state, retention defaults, deletion routes, and confirmation gates;
15. service-native speech and presentation contract for high-quality speech, synchronized displayed verbatim text, captions/transcripts, narration scripts, storyboards, accessibility, voice identity, token behavior, and retention behavior;
16. generated-image response layer for controlled visual artifacts that preserve source authority;
17. corporate media standard enforcement for generated text, audio, images, diagrams, animation storyboards, captions, transcripts, alt text, issue drafts, and future media;
18. speech, image-generation, avatar, animation, and generated-video policy before any service-native spoken, generated-image, or animated output ships;
19. action broker confirmation contract for preflight, confirmation text, side-effect gating, GitHub issue handoff, auto-fund, saved notes, user-material inclusion, credential boundaries, and action results;
20. saved notebook and account history contract for saved-note drafts, durable notebooks, account history, deletion, export, sharing, submitted issue-link retention, generated-artifact retention, storage-cost policy, and not-project-evidence boundaries;
21. service terms and account policy contract for hosted-service terms, token/subscription disclosures, account acceptance, privacy notices, provider data-use notices, generated-media terms, GitHub handoff notices, saved-notebook terms, support routes, abuse controls, terms changes, and legal-review launch gates;
22. issue-mining signal contract for duplicate clustering, recurring signal extraction, noise classification, owner lanes, periodic reports, privacy-safe evidence, and fix queues;
23. rate limits, abuse controls, and cost ceilings;
24. observability, public status, incident records, change history, support summaries, and diagnostics redaction for logs, metrics, latency, error classes, source misses, unsupported-answer rate, provider health, provider fallback rate, manifest validation failures, token estimates, tokens spent, presentation/artifact requests, issue handoffs, issue-mining signals, and cost per answer;
25. staging and production environments;
26. release, rollback, and incident-response procedure;
27. privacy, retention, deletion, and user-consent policy for prompts, speech, images, answer histories, narration scripts, animation storyboards, submitted issue links, issue-mining metadata, provider-transmitted data, and token transaction records.

The deployment boundary must follow [service-deployment-option-decision.md](service-deployment-option-decision.md) and [service-deployment-architecture.md](service-deployment-architecture.md): the browser conversation client may render validated manifests and show token/action/account state, but it does not own provider credentials, token authority, source authority, durable retention, hidden GitHub credentials, or private diagnostics.

The Answer Artifact Manifest is the platform mechanism for normalizing response shape. It gives the answer engine, media generators, speech layer, token ledger, action rail, issue handoff, issue-mining loop, privacy policy, and observability one shared response envelope instead of separate ad hoc payloads. The manifest-driven service architecture maps that envelope to concrete service components, validators, and endpoint responsibilities. The manifest service contracts turn those components into typed boundary, validator, endpoint, and response with a Not advanced disposition obligations. The source ingestion and retrieval context contract governs source records, route identity, freshness, source chips, missing routes, visibility, and `source_context` population before answer generation. The answer-engine source contract governs the source-selection and claim-label decision after validated retrieval context exists. The model/provider capability registry contract governs provider-backed product capabilities, quality gates, fallbacks, credential boundaries, cost classes, privacy/terms state, health state, and the rule that provider output is not source authority. The token ledger and privacy contract governs cost estimates, holds, charges, refunds, auto-fund, ephemeral media, durable saves, deletion routes, public issue warnings, and no-private-prompt receipts. The issue-mining signal contract governs duplicate clustering, signal scoring, noise classes, owner lanes, periodic reports, fix queues, and privacy-safe evidence. The observability, public status, and incident contract governs privacy-safe event classes, public status fields, incident records, change history, support summaries, diagnostics redaction, and the rule that metrics are operational signals rather than proof. The action broker confirmation contract governs confirmation text, destination disclosure, public/durable/paid/retained/credentialed side effects, GitHub handoff, auto-fund, saved notes, user-material inclusion, and action-result updates. The saved notebook and account history contract governs saved-note drafts, durable notebook entries, account history, deletion, export, sharing, submitted issue-link retention, generated-artifact retention, storage-cost behavior, and the rule that private user material is not project evidence. The service terms and account policy contract governs hosted-service terms, token/subscription notices, account acceptance, privacy notices, generated-media terms, GitHub handoff notices, notebook terms, support routes, abuse controls, terms changes, and legal-review launch gates. The service-native speech and presentation contract governs high-quality audio, synchronized displayed verbatim text, captions/transcripts, narration scripts, storyboards, accessibility, voice identity, token behavior, and retention behavior.

The token ledger is not only a billing convenience. It is the platform mechanism for normalizing heterogeneous service work: static source routing, corpus retrieval, curated external comparison, long-context reasoning, diagram or image work, service-native speech generation, narration scripting, animation storyboarding, issue preparation, speech input, image intake, document intake, and future saved notebooks can all draw different backend resources while still presenting one understandable user-facing unit.

The issue handoff and issue-mining pipeline should follow the same public-safety boundary as the iOS/iPadOS reader feedback path and [action-broker-confirmation-contract.md](action-broker-confirmation-contract.md): users control GitHub submission, GitHub login is visible, public issue visibility is explicit, and no public client embeds GitHub credentials. The service must still preserve enough structured issue metadata to mine recurring signal and route fixes instead of letting user feedback become an unprocessed comment pile.

Service-native speech output, generated image responses, and animated explainers are presentation layers, not source authorities. The platform must keep narration style, generated audio, generated images, avatar animation, and generated video subordinate to the same source chips, claim labels, and System Card routes as the plain answer. Native speech is the first target for answer listening, sphere-initiated markdown-portion listening, full-document sphere listening, and concept narration; browser/system narration is only a compatibility fallback. Speech output must be high-quality only: the service should not offer medium-quality or low-quality speech tiers, and if high-quality speech is unavailable the compliant fallback is text-only display rather than degraded audio. Speech output also needs spending-limit behavior, ephemeral audio by default, synchronized displayed verbatim text, accessibility captions/transcripts, basic playback controls, and no real-person imitation or authority-implying voice identity. Generated images need purpose labels, source-basis captions, spending-limit behavior, retention policy, and no proof-status implication. All generated media must also pass the [Generated Media Corporate Standard](corporate-media-standards.md).

## Source Authority

The service must preserve the source classes in [assistant-mode-contract.md](assistant-mode-contract.md) and the retrieval rules in [source-ingestion-retrieval-context-contract.md](source-ingestion-retrieval-context-contract.md). Public answers may use priority material only when the UI clearly exposes development status. External prior-physics sources must be curated or searched through a deliberate source policy; they remain comparison material and do not become $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology.

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
2. `platform_architecture_packet` - Use [service-deployment-option-decision.md](service-deployment-option-decision.md) as the deployment-shape decision and [service-deployment-architecture.md](service-deployment-architecture.md) as the boundary map for public site, browser client, service API, background jobs, source index, provider gateways, token ledger, action broker, issue-mining pipeline, observability, staging, production, CI/CD, rollback, and smoke tests. Status: `long-term`.
3. `service_scaffolding_and_fixtures` - Use [service-scaffolding-and-fixtures.md](service-scaffolding-and-fixtures.md) as the schema-only implementation target for future service contracts, fixture locations, environment variable classes, CI gates, staging smoke tests, and rollback fixtures. Status: `long-term`.
4. `source_ingestion_retrieval_context_contract` - Define versioned corpus ingestion, retrieval indexes, source records, source classes, source chips, source freshness, missing-route behavior, public/operator visibility, and citation payloads. Status: `long-term`.
5. `answer_artifact_manifest_contract` - Turn the Answer Artifact Manifest into typed response schema, validation fixtures, UI rendering obligations, and API failure behavior. Status: `long-term`.
6. `manifest_driven_service_architecture` - Turn the manifest-driven service architecture map into service components, endpoint contracts, validator order, and behavior for a Not advanced disposition. Status: `long-term`.
7. `manifest_service_contracts` - Encode typed service-boundary inputs/outputs, validator order, endpoint contracts, manifest shape for a Not advanced disposition, and contract fixtures. Status: `long-term`.
8. `answer_engine_source_contract` - Define source selection, mode routing, retrieval prompts, claim labels, System Card routing, unsupported-answer behavior, manifest population, idea-triage classification, and regression fixtures. Status: `long-term`.
9. `model_provider_capability_registry_contract` - Define provider-backed product capabilities, quality gates, fallback behavior, credential boundaries, cost classes, provider privacy/terms checks, health state, observability, and no-browser-key enforcement. Status: `long-term`.
10. `corporate_media_standard_enforcement` - Define and enforce generated-media policy fixtures for text, audio, images, diagrams, animation storyboards, captions, transcripts, alt text, issue drafts, and future media. Status: `long-term`. Source fixture contract: [corporate-media-acceptance-fixtures.md](corporate-media-acceptance-fixtures.md).
11. `token_ledger_privacy_contract` - Define wallet state, prompt/image/speech handling, retention, deletion routes, logs, consent, rate limits, abuse controls, token accounting, budget controls, receipts, auto-fund, and redaction behavior. Status: `long-term`.
12. `service_native_speech_presentation_contract` - Define native speech requirements, narration style rules, speech-input/avatar/video deferrals, storyboard format, accessibility captions/transcripts, token schedule, retention behavior, voice identity, and source-authority guardrails. Status: `long-term`.
13. `github_issue_feedback_loop` - Define prefilled GitHub issue handoff, public-visibility warning, issue metadata, issue-mining reports, signal/noise classification, privacy-safe evidence, and owner-routed fix queues. Status: `long-term`.
14. `issue_mining_signal_contract` - Define issue-mining inputs, clustering, signal scoring, noise classes, owner lanes, report shape, fix queue records, and regression fixtures. Status: `long-term`.
15. `observability_public_status_incident_contract` - Define privacy-safe event classes, public status, incident records, change history, support summaries, diagnostics redaction, issue-mining handoff, and operational fixtures. Status: `long-term`.
16. `action_broker_confirmation_contract` - Define action preflight, confirmation text, destination disclosure, GitHub handoff, auto-fund, saved notes, user-material inclusion, credential boundaries, side-effect guards, and action-result updates. Status: `long-term`.
17. `saved_notebook_account_history_contract` - Define saved-note drafts, durable notebooks, account history, submitted issue links, deletion, export, sharing, storage-cost behavior, and not-project-evidence boundaries. Status: `long-term`.
18. `service_terms_account_policy_contract` - Define hosted-service terms, token/subscription notices, account acceptance, privacy notices, generated-media terms, GitHub handoff notices, saved-notebook terms, support routes, abuse controls, terms changes, and legal-review launch gates. Status: `long-term`.
19. `deployment_and_ops_plan` - Define staging, production, environment variables, CI/CD, monitoring, rollback, incident response, and domain routing. Status: `long-term`.
20. `public_beta_gate` - Run fixture questions, source-ingestion/retrieval validation, answer-engine source-contract validation, model/provider capability validation, manifest validation, service-contract validation, token/privacy validation, issue-mining signal validation, observability/public-status/incident validation, action-broker validation, saved-notebook/account-history validation, service-terms/account-policy validation, speech/presentation validation, source-link QA, System Card checks, generated-media corporate-standard checks, native-speech/storyboard checks, GitHub issue handoff checks, issue-mining checks, privacy review, legal review, cost review, and deployment smoke tests before any public beta. Status: `long-term`.

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
- The service deployment option decision recommends a GitHub Pages public entry plus a hosted service backend, with provider calls, token authority, source retrieval, action confirmation, manifest validation, account policy, issue mining, observability, and privacy/audit behavior behind the service boundary.
- The service deployment architecture assigns ownership for the public site, browser conversation client, service API, background jobs, source index, provider gateways, token ledger, action broker, issue-mining pipeline, observability, staging/production, CI/CD gates, rollback, and public beta smoke tests.
- The service scaffolding and fixtures packet defines the future schema-only module layout, fixture locations, environment variable classes, CI gates, and first implementation stages.
- The desired Archie question interface is a long-term service with backend or serverless deployment, privacy policy, token accounting, cost controls, source authority, System Card disclosure, and production operations.
- Every response should use the Answer Artifact Manifest as the shared contract for source context, claim context, answer body, artifacts, speech synchronization, token receipts, privacy state, available actions, and issue-mining metadata.
- Use the manifest-driven service architecture map for service components, validators, endpoint responsibilities, and behavior for a Not advanced disposition.
- Use the manifest service contracts for typed service-boundary inputs/outputs, validator ordering, endpoint request/response shapes, and contract fixtures.
- Use the source ingestion and retrieval context contract for source records, route identity, source chips, freshness, visibility, missing-route behavior, and `source_context` population.
- Use the answer-engine source contract for source selection, claim-label assignment, unsupported-answer behavior, answer body fields, TeX preservation, and idea-triage classification.
- Use the model/provider capability registry contract for provider-backed product capabilities, quality gates, fallbacks, credential boundaries, cost classes, provider privacy/terms state, health state, observability, and no-browser-key enforcement.
- Use the token ledger and privacy contract for wallet state, spending limits, auto-fund, holds, receipts, retention defaults, deletion routes, public issue warnings, redacted diagnostics, and no-private-prompt receipt behavior.
- Use the issue-mining signal contract for duplicate clustering, signal scoring, noise classes, owner lanes, periodic reports, fix queues, fixture candidates, source-index candidates, and privacy-safe evidence.
- Use the observability, public status, and incident contract for privacy-safe event classes, metrics, public status fields, incident records, change history, support summaries, diagnostics redaction, and operational fixtures.
- Use the action broker confirmation contract for action preflight, confirmation text, destination disclosure, side-effect gating, GitHub handoff, auto-fund, saved notes, user-material inclusion, credential boundaries, and action-result updates.
- Use the saved notebook and account history contract for saved-note drafts, durable notebooks, account history, submitted issue-link retention, deletion, export, sharing, storage-cost behavior, and not-project-evidence boundaries.
- Use the service terms and account policy contract for hosted-service terms, token/subscription notices, account acceptance, privacy notices, generated-media terms, GitHub handoff notices, saved-notebook terms, support routes, abuse controls, terms changes, and legal-review launch gates.
- Use the service-native speech and presentation contract for high-quality speech, synchronized displayed verbatim text, captions/transcripts, narration scripts, storyboards, accessibility, voice identity, token behavior, retention behavior, and text-only fallback.
- Generated text, audio, images, diagrams, animation storyboards, captions, transcripts, alt text, issue drafts, and future media must satisfy the Generated Media Corporate Standard and its acceptance fixtures.
- The service should wait behind core theory closure unless platform work directly unblocks public readiness.

Task:
- Produce a deployment architecture packet for the full Archie service.
- Start from the deployment option decision and define the concrete architecture for the recommended GitHub Pages public entry plus hosted service backend.
- Use the service deployment architecture packet as the deployment boundary source if it already exists; update it rather than reopening the option decision.
- Preserve the option comparison for traceability: GitHub Pages entry plus backend, separate hosted webapp, serverless/edge service, managed AI gateway, and rejected static/local-source prototype.
- Define the source-ingestion and retrieval-context pipeline, Answer Artifact Manifest schema, manifest-driven service components, typed service-boundary contracts, validator order, endpoint contracts, answer-engine source and claim-label boundary, model/provider capability registry, model/provider abstraction, service-native speech and presentation contract, generated-media corporate-standard enforcement, animation-storyboard boundary, token-ledger and privacy-retention policy, action-broker confirmation contract, saved-notebook and account-history contract, service-terms and account-policy contract, GitHub issue handoff, issue-mining signal report loop, observability/public-status/incident contract, staging/production split, and rollback plan.
- Identify the minimum theory-closure and corpus-readiness gates before public beta.

Scope:
- Inspect `reference/priorities/archie/priorities.md`, `reference/priorities/archie/assistant-mode-contract.md`, `reference/priorities/archie/service-platform.md`, `reference/priorities/archie/service-deployment-option-decision.md`, `reference/priorities/archie/service-deployment-architecture.md`, `reference/priorities/archie/service-scaffolding-and-fixtures.md`, `reference/priorities/archie/answer-artifact-manifest.md`, `reference/priorities/archie/manifest-driven-service-architecture.md`, `reference/priorities/archie/manifest-service-contracts.md`, `reference/priorities/archie/source-ingestion-retrieval-context-contract.md`, `reference/priorities/archie/answer-engine-source-contract.md`, `reference/priorities/archie/model-provider-capability-registry-contract.md`, `reference/priorities/archie/token-ledger-privacy-contract.md`, `reference/priorities/archie/issue-mining-signal-contract.md`, `reference/priorities/archie/observability-public-status-incident-contract.md`, `reference/priorities/archie/action-broker-confirmation-contract.md`, `reference/priorities/archie/saved-notebook-account-history-contract.md`, `reference/priorities/archie/service-terms-account-policy-contract.md`, `reference/priorities/archie/service-native-speech-presentation-contract.md`, `reference/priorities/archie/corporate-media-standards.md`, `reference/priorities/archie/corporate-media-acceptance-fixtures.md`, `content/markdown/aaa/archie/system-card.md`, `README.md`, deployment files, and runtime entry points.
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
