# Model Provider Capability Registry Contract

## Workstream Metadata

- Kind: `priority-contract`
- Status: `draft`
- Claim level: `priority-only`
- Parent priority: [Archie](priorities.md)
- Answer artifact manifest: [answer-artifact-manifest.md](answer-artifact-manifest.md)
- Manifest-driven service architecture: [manifest-driven-service-architecture.md](manifest-driven-service-architecture.md)
- Manifest service contracts: [manifest-service-contracts.md](manifest-service-contracts.md)
- Answer engine source contract: [answer-engine-source-contract.md](answer-engine-source-contract.md)
- Token ledger and privacy contract: [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md)
- Observability, public status, and incident contract: [observability-public-status-incident-contract.md](observability-public-status-incident-contract.md)
- Service terms and account policy contract: [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md)
- Service-native speech and presentation contract: [service-native-speech-presentation-contract.md](service-native-speech-presentation-contract.md)
- Visual artifact contract: [visual-artifact-contract.md](visual-artifact-contract.md)
- Generated media corporate standard: [corporate-media-standards.md](corporate-media-standards.md)
- V1 product requirements: [v1-product-requirements.md](v1-product-requirements.md)
- Service platform owner: [Archie Service Platform](service-platform.md)

## Purpose

This packet defines the model/provider capability registry contract for the future Archie question service.

The service may eventually use different providers for text answer generation, source-grounded comparison, high-quality speech, image generation, caption/transcript work, embeddings or retrieval support, vision input, transcription, document intake, moderation, and future video. The user interface should not know provider secrets, provider-specific billing units, provider-specific model names, or raw capability quirks. It should see only product capabilities with declared quality gates, token classes, privacy behavior, fallback behavior, and rules requiring verification for advancement.

This packet is not a provider selection, runtime integration, credential store, or deployment config. It is the product and platform contract that future provider adapters, model gateways, capability toggles, token estimates, media validators, and service health checks must satisfy before any provider-backed capability ships.

## Core Invariant

Provider capability is not source authority.

A model or media provider can generate, transform, transcribe, speak, embed, classify, or moderate under a declared service capability. It cannot become a source class, strengthen a claim label, bypass unsupported-answer behavior, replace source routes, or make generated media into evidence. Provider output must enter the Answer Artifact Manifest through the same source, claim, media, speech, token, privacy, terms, and action validators as every other artifact.

## Registry Entry Shape

Each provider-backed product capability should be represented by a registry entry.

| Field | Requirement |
| --- | --- |
| `capability_id` | Stable product capability id, such as `answer_text_v1`, `speech_high_quality_v1`, or `generated_image_v1`. |
| `capability_type` | `answer_text`, `retrieval_embedding`, `rerank`, `speech_output`, `speech_input`, `image_generation`, `image_input`, `document_input`, `caption_transcript`, `moderation`, `video_generation`, or `utility`. |
| `provider_id` | Internal provider id; not exposed as source authority. |
| `provider_model_ref` | Internal model or deployment reference; hidden from public UI unless policy allows display. |
| `enabled_state` | `disabled`, `internal_only`, `beta_enabled`, `public_enabled`, or `degraded`. |
| `supported_modes` | Answer modes allowed to request the capability. |
| `supported_artifact_types` | Artifact types the capability may produce or transform. |
| `quality_gate` | Required quality bar, such as high-quality-only speech or text-only fallback. |
| `source_authority_effect` | Must be `none`; provider output cannot strengthen source or claim status. |
| `input_data_classes` | Prompt, source excerpt, verbatim segment, image, document, account metadata, or safe summary inputs accepted. |
| `output_data_classes` | Text, audio, image, transcript, embedding, moderation label, or other output class. |
| `privacy_retention_state` | Provider-side and service-side retention behavior. |
| `terms_required` | Required service terms, privacy notice, generated-media terms, or provider terms state. |
| `credential_boundary` | Server, serverless, edge, managed gateway, or internal tool boundary; never public browser secrets. |
| `token_work_units` | User-visible work units and cost class used by the token ledger. |
| `fallback_behavior` | Text-only fallback, reduced-scope answer, disabled action, retry, or behavior for a Not advanced disposition. |
| `health_state` | `healthy`, `degraded`, `unavailable`, `policy_blocked`, or `unknown`. |
| `observability_fields` | Safe latency, error, cost, refusal, and provider-health metrics. |

The registry may keep internal provider names and model references server-side. The public UI should expose product capabilities and status, not provider secrets.

## Capability Families

V1 should define provider capability families before implementation.

| Capability family | V1 status | Required boundary |
| --- | --- | --- |
| `answer_text` | required | Source-grounded answer generation after validated retrieval context; no model-memory authority. |
| `retrieval_embedding` | optional/internal | Retrieval support only; cannot appear as source evidence. |
| `rerank` | optional/internal | Candidate ordering only; cannot create citations. |
| `speech_output` | required for listen feature | High-quality-only; synchronized displayed verbatim text; text-only fallback. |
| `caption_transcript` | required with speech | Accessibility support; same retention as answer text unless separately saved. |
| `image_generation` | limited/controlled | Purpose label, source-basis caption, alt text, media-standard validation, terms gate. |
| `moderation` | required for public/generated media | Safety classification only; does not decide source authority. |
| `speech_input` | deferred | Requires consent, transcript visibility, retention/deletion, and token schedule. |
| `image_input` | deferred | Requires upload policy, redaction, retention/deletion, and source-separation behavior. |
| `document_input` | deferred | Requires copyright, retention, deletion, source-separation, and token schedule. |
| `video_generation` | deferred | Requires separate video policy, accessibility, retention, rights, and human-review gates. |

No capability is public just because a provider offers it. Public enablement requires product policy, quality gates, privacy/terms state, token schedule, validation fixtures, and observability.

## Credential And Deployment Boundary

Provider credentials must stay behind the service boundary.

Rules:

1. no browser-side model API keys;
2. no direct public model calls from browser JavaScript;
3. provider model references are server-side implementation details unless public disclosure is explicitly approved;
4. provider adapters must use scoped credentials, environment management, and rotation policy;
5. managed AI gateways must still enforce the same manifest validators;
6. provider error details should be redacted before reaching user receipts, issue metadata, or diagnostics;
7. operator/developer diagnostics may include safe provider ids and error classes, but not private prompt text or secrets.

If a provider capability cannot run behind an approved credential boundary, it should remain disabled.

## Quality And Fallback Rules

Every provider capability needs an explicit quality gate and fallback.

Required fallback examples:

| Capability | Fallback |
| --- | --- |
| `answer_text` | Unsupported or reduced-scope answer with nearest source when source support is inadequate. |
| `speech_output` | Text-only display when high-quality synchronized speech is unavailable. |
| `image_generation` | Diagram spec, generated-image prompt draft, or text-only explanation when image generation is unavailable or unsafe. |
| `caption_transcript` | Disable speech output until captions/transcripts can be produced when required. |
| `moderation` | Do not advance for public/generated media if moderation is unavailable and policy requires it. |
| `retrieval_embedding` | Keyword or route-based retrieval fallback when embeddings are unavailable, with weaker source recall noted internally. |
| `speech_input` | Typed text input only. |
| `image_input` | Text description only; do not infer from unavailable image analysis. |
| `document_input` | Ask user to quote or link allowed excerpts; do not ingest unsupported uploads. |

Provider fallback must never silently lower source authority, privacy, quality, media-safety, or token standards. In particular, high-quality speech may fall back to text-only, not medium-quality or low-quality audio.

## Token And Cost Mapping

Provider costs must be translated into user-visible token work units by [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md).

Registry entries should provide:

1. cost class: `free_static`, `low`, `standard`, `large_context`, `media`, `premium_media`, or `operator_only`;
2. estimate basis: source count, output length, audio duration, image count, context size, provider call count, or storage size;
3. whether a pre-run estimate is required;
4. whether attempted-provider work can ever be charged after refusal;
5. refund behavior when output is omitted, downgraded, or was not advanced;
6. cap behavior for per-request, monthly, and auto-fund limits.

Provider-specific billing units should not appear directly in the public UI. Receipts should show product work units, safe provider capability ids when useful, and token charges/refunds.

## Privacy, Terms, And Provider Data Use

Provider-backed capabilities must follow [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md), [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md), and provider-specific data-use policy.

Registry entries should state:

1. whether private prompt text is sent to the provider;
2. whether source excerpts are sent to the provider;
3. whether generated audio, images, transcripts, embeddings, or moderation labels are retained by the service;
4. whether provider-side retention, training use, logging, abuse review, or regional processing exists;
5. what user-facing notice is required;
6. what deletion/export behavior is available or not available;
7. which public beta legal-review state is required.

If provider-side data use cannot be disclosed or bounded enough for the service terms, the capability should remain disabled.

Provider-health telemetry, fallback rates, latency/error classes, cost classes, public status, and incident records must follow [observability-public-status-incident-contract.md](observability-public-status-incident-contract.md). Provider observability may expose safe product capability ids and error classes; it must not expose provider secrets, raw provider payloads, private prompt text, or source-authority effects.

## Manifest Integration

Provider execution details should enter the Answer Artifact Manifest as safe capability context, not as source authority.

The manifest should record:

1. provider capability ids used;
2. capability types requested;
3. enabled/health state at the time of response;
4. quality gate result;
5. fallback behavior used;
6. token work units and cost class;
7. privacy and terms gates applied;
8. safe provider error classes when useful for support.

The manifest should not expose secrets, raw provider request payloads, full private prompt text, provider-specific billing internals, or provider output as a citation.

## Verification Required for Advancement

The provider registry should not advance when:

1. no registry entry exists for a requested capability;
2. capability is disabled, internal-only, policy-blocked, or below required health state;
3. quality gate is unavailable or fails;
4. fallback behavior is undefined;
5. token cost mapping is missing;
6. privacy or provider data-use policy is missing;
7. service terms or provider notices are missing or stale;
8. credential boundary is not approved;
9. public client would need a model/API key;
10. provider output would be needed to support a claim label.

Behavior for a Not advanced disposition should return a manifest-shaped unsupported, unavailable, text-only, reduced-scope, or confirmation-required response without hidden provider calls, hidden charges, hidden retention, or proof-status inflation.

## Regression Fixtures

The current schema-only service scaffold includes [provider-registry.v1.json](../../../../tests/archie-service/fixtures/provider-registry/provider-registry.v1.json), [provider-sandbox-contracts.v1.json](../../../../tests/archie-service/fixtures/provider-registry/provider-sandbox-contracts.v1.json), [provider-gateway-contracts.v1.json](../../../../tests/archie-service/fixtures/provider-registry/provider-gateway-contracts.v1.json), [validate-provider-sandbox.mjs](../../../../scripts/archie-service/validate-provider-sandbox.mjs), and [validate-provider-gateway.mjs](../../../../scripts/archie-service/validate-provider-gateway.mjs). These fixtures cover answer text, high-quality speech, generated image, moderation, retrieval embedding, and rerank capability gates, then map those gates through no-call gateway request classes without selecting a real provider or enabling runtime provider calls.

The future implementation should include provider-registry fixtures for:

| Fixture | Required proof |
| --- | --- |
| `provider-answer-text-001` | Answer generation uses validated source context and cannot cite model memory. |
| `provider-speech-high-quality-001` | Speech output runs only through a high-quality capability and produces synchronized displayed text. |
| `provider-speech-fallback-001` | Unavailable high-quality speech returns text-only fallback and no low-quality audio. |
| `provider-image-policy-001` | Image generation requires media-standard, terms, privacy, token, and source/claim inheritance gates. |
| `provider-browser-key-negative-001` | Public client receives no provider secrets or direct model-call config. |
| `provider-cost-map-negative-001` | Capability is unavailable when token work-unit mapping is missing. |
| `provider-privacy-negative-001` | Capability is unavailable when provider data-use or retention state is missing. |
| `provider-terms-negative-001` | Capability is unavailable when required service/provider terms are stale. |
| `provider-health-degraded-001` | Degraded provider health produces declared fallback or unavailable action. |
| `provider-source-authority-negative-001` | Provider output cannot upgrade claim label, source class, or proof status. |
| `provider-observability-001` | Safe capability id, latency class, error class, and cost class are observable without private prompt text. |

## Implementation Handoff

Closure goal: Preserve provider capability, gateway, token-ledger, issue-mining, and action-broker boundaries while adding observability/public-status sandbox fixtures with redacted provider and action classes.

Use this packet, [answer-artifact-manifest.md](answer-artifact-manifest.md), [manifest-service-contracts.md](manifest-service-contracts.md), [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md), [observability-public-status-incident-contract.md](observability-public-status-incident-contract.md), [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md), [service-native-speech-presentation-contract.md](service-native-speech-presentation-contract.md), [visual-artifact-contract.md](visual-artifact-contract.md), [corporate-media-standards.md](corporate-media-standards.md), and [v1-product-requirements.md](v1-product-requirements.md) as the source of truth.

Task:
- Add observability fixtures that may reference safe provider capability ids, cost classes, fallback classes, token receipt ids, issue-mining queue ids, and action result classes.
- Block provider payloads, provider-specific billing internals, private prompt text, account history, credentials, and source-authority effects from public status and incident metadata.
- Preserve provider-sandbox, provider-gateway, token-ledger sandbox, issue-mining sandbox, and action-broker sandbox checks as prerequisites for observability handoff.

Constraints:
- Do not select a real provider, add runtime model calls, add credentials, change deployment config, or launch public provider-backed features unless explicitly requested.
- Do not expose provider secrets, raw private prompt text, or provider-specific billing internals in browser state, receipts, issue-mining metadata, or diagnostics.
- Do not let provider output become source evidence, proof status, or citation authority.
- Preserve high-quality-only speech and text-only fallback behavior.
