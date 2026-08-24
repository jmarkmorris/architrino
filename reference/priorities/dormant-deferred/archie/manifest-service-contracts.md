# Manifest Service Contracts

## Workstream Metadata

- Kind: `priority-contract`
- Status: `draft`
- Claim level: `priority-only`
- Parent priority: [Archie](priorities.md)
- Answer artifact manifest: [answer-artifact-manifest.md](answer-artifact-manifest.md)
- Manifest-driven service architecture: [manifest-driven-service-architecture.md](manifest-driven-service-architecture.md)
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
- AI communication standards: [ai-communication-standards.md](ai-communication-standards.md)
- V1 product requirements: [v1-product-requirements.md](v1-product-requirements.md)
- Service platform owner: [Archie Service Platform](service-platform.md)
- Service deployment option decision: [service-deployment-option-decision.md](service-deployment-option-decision.md)
- Service deployment architecture: [service-deployment-architecture.md](service-deployment-architecture.md)
- Service scaffolding and fixtures: [service-scaffolding-and-fixtures.md](service-scaffolding-and-fixtures.md)

## Purpose

This packet turns the [Answer Artifact Manifest](answer-artifact-manifest.md) and [Manifest-Driven Service Architecture](manifest-driven-service-architecture.md) into typed service-boundary, validator, and endpoint contracts.

It is not runtime code. It defines the contracts a future implementation should encode in TypeScript, JSON Schema, API validators, integration tests, and UI rendering tests.

The core invariant is simple: every service endpoint returns either a validated Answer Artifact Manifest or a manifest-shaped refusal/error response with a Not advanced disposition. No endpoint should return a separate ad hoc answer shape.

A second invariant governs rendering: every endpoint response that reaches a user must be explainable in normal language before internal terms appear. The rendering contract follows [ai-communication-standards.md](ai-communication-standards.md) and keeps implementation terms inside schemas, diagnostics, support, legal review, or developer-facing packets.

The deployment boundary for these contracts follows [service-deployment-option-decision.md](service-deployment-option-decision.md), [service-deployment-architecture.md](service-deployment-architecture.md), and [service-scaffolding-and-fixtures.md](service-scaffolding-and-fixtures.md): public static entry and browser rendering are separate from the service API, provider gateways, token authority, source retrieval, action broker, issue-mining pipeline, observability, and privacy/audit state.

## Current Schema-Only Contract Surface

The service scaffold now includes a root schema at [schema.json](../../../../src/archie-service/contracts/v1/schema.json). It validates the Answer Artifact Manifest, answer request, source-index snapshot, MCP tool request/response suites, source-index dry-run, service validation plan, provider capability registry, provider-sandbox contracts, provider-gateway contracts, token-ledger sandbox contracts, issue-mining sandbox contracts, action-broker sandbox contracts, token receipt, action preflight, service status, service terms, and deployment smoke-plan fixture shapes.

The validator-order contract is currently represented by [negative-validator-suite.v1.json](../../../../tests/archie-service/fixtures/validators/negative-validator-suite.v1.json). That fixture records expectations for Not advanced dispositions for browser-key refusal, private-prompt leakage, low-quality speech fallback, unconfirmed GitHub handoff, stale terms, and source-authority inflation. [validate-negative-validators.mjs](../../../../scripts/archie-service/validate-negative-validators.mjs) checks those expectations and requires a matching manifest-shaped refusal or fallback fixture for each negative case, without provider calls, payments, durable storage, deployment config, or public routes.

The retrieval/source side is currently checked by [build-source-index.mjs](../../../../scripts/archie-service/build-source-index.mjs), which builds and verifies a deterministic fixture snapshot with hashed exact-content, search, graph, and metadata views, then verifies dry-run route cases, current repo files, markdown anchors, scene-source routing, canonical parents, priority exclusion, missing-route behavior, and ten source-index-specific cases with a Not advanced disposition.

Endpoint response behavior is currently represented by [endpoint-response-contracts.v1.json](../../../../tests/archie-service/fixtures/endpoints/endpoint-response-contracts.v1.json) and checked by [validate-endpoint-responses.mjs](../../../../scripts/archie-service/validate-endpoint-responses.mjs). The fixture covers `POST /answers`, listen, visualize, issue draft, service terms, and service status responses, and requires each route to return a validated manifest, partial manifest update, manifest-shaped refusal, service terms object, or service status object without enabling HTTP handlers, provider calls, payments, durable storage, deployment config, or public routes.

Local fixture-stub response selection is currently represented by [fixture-response-selector.mjs](../../../../src/archie-service/http/fixture-response-selector.mjs) and checked by [check-fixture-service-stub.mjs](../../../../scripts/archie-service/check-fixture-service-stub.mjs). The selector maps endpoint ids and request fixture classes to the validated response fixtures, returns the loaded fixture payload, and refuses unknown endpoints or any contract that enables runtime providers, public routes, durable storage, or payments. This is still not an HTTP handler or runtime AI path; it is the fixture-backed bridge needed before render-contract fixtures can prove the conversation surface displays manifests without inventing side-channel state.

Render behavior is currently represented by [render-contracts.v1.json](../../../../tests/archie-service/fixtures/render/render-contracts.v1.json), [fixture-render-model.mjs](../../../../src/archie-service/browser-client/fixture-render-model.mjs), and [validate-render-contracts.mjs](../../../../scripts/archie-service/validate-render-contracts.mjs). The render contract consumes selected response fixtures and checks that source chips, claim labels, displayed verbatim text, token receipts, action confirmations, speech sync, issue drafts, service terms, and service status can be rendered from the selected response only, without side-channel source authority, private prompt text, provider secrets, runtime providers, public routes, durable storage, or payments.

Secret-boundary behavior is currently represented by [secret-boundary-plan.v1.json](../../../../tests/archie-service/fixtures/security/secret-boundary-plan.v1.json), [service-entry.fixture.html](../../../../tests/archie-service/fixtures/static-output/service-entry.fixture.html), and [check-secret-boundary.mjs](../../../../scripts/archie-service/check-secret-boundary.mjs). The check scans Archie service fixtures, browser-client helpers, fixture HTTP source, and static-output candidates for forbidden provider, GitHub, payment, database, signing, monitoring, browser-model-key, provider-payload, and private-prompt secret classes before any staging-smoke runner or public route exists.

Fixture-backed staging smoke is currently represented by [staging-smoke-plan.v1.json](../../../../tests/archie-service/fixtures/deployment/staging-smoke-plan.v1.json) and [run-staging-smoke.mjs](../../../../scripts/archie-service/run-staging-smoke.mjs). The runner stays local and no-network while exercising static entry, text answer, service terms, service status, secret-boundary, and rollback-readiness expectations through the selected response fixtures.

Rollback smoke is currently represented by [rollback-smoke-plan.v1.json](../../../../tests/archie-service/fixtures/deployment/rollback-smoke-plan.v1.json) and [check-rollback.mjs](../../../../scripts/archie-service/check-rollback.mjs). The rollback check verifies service-version identity, source-index snapshot compatibility, provider-registry compatibility, service terms compatibility, selected response fixtures, side-effect-disabled invariants, no-browser-key behavior, and private-prompt exclusion.

Provider-sandbox gating is currently represented by [provider-registry.v1.json](../../../../tests/archie-service/fixtures/provider-registry/provider-registry.v1.json), [provider-sandbox-contracts.v1.json](../../../../tests/archie-service/fixtures/provider-registry/provider-sandbox-contracts.v1.json), and [validate-provider-sandbox.mjs](../../../../scripts/archie-service/validate-provider-sandbox.mjs). The check covers answer, speech, image, moderation, embedding, and rerank capability gates for enabled state, health state, quality gate, fallback behavior, token work units, privacy/terms state, credential boundary, no-browser-key behavior, source-authority neutrality, and fallback manifest compatibility, without real provider calls.

Provider-gateway behavior is currently represented by [provider-gateway-contracts.v1.json](../../../../tests/archie-service/fixtures/provider-registry/provider-gateway-contracts.v1.json) and [validate-provider-gateway.mjs](../../../../scripts/archie-service/validate-provider-gateway.mjs). The check maps sandbox capabilities to no-call gateway request classes for answer text, high-quality speech, generated image requests, public media moderation, retrieval embeddings, and rerank support. It allows only fixture manifest contexts, declared fallbacks, or safe internal contexts, and keeps runtime provider calls, browser keys, provider payloads, private prompt expansion, payments, durable storage, public routes, and source-authority effects disabled.

Token-ledger sandbox behavior is currently represented by [token-ledger-sandbox.v1.json](../../../../tests/archie-service/fixtures/token-ledger/token-ledger-sandbox.v1.json) and [validate-token-ledger-sandbox.mjs](../../../../scripts/archie-service/validate-token-ledger-sandbox.mjs). The check consumes provider-gateway work units and verifies normal answer estimates/holds/charges/refunds, high-quality speech charges, terms-blocked generated media, provider-cost-map blocks, auto-fund-pending blocks, and cap-exceeded blocks without enabling payments, payment attempts, provider payload exposure, private prompt expansion, durable storage, runtime provider calls, or source-authority effects.

Issue-mining sandbox behavior is currently represented by [issue-mining-sandbox.v1.json](../../../../tests/archie-service/fixtures/issue-mining/issue-mining-sandbox.v1.json) and [validate-issue-mining-sandbox.mjs](../../../../scripts/archie-service/validate-issue-mining-sandbox.mjs). The check consumes manifest source context, claim labels, token receipt ids, action preflight state, and draft issue metadata to verify duplicate keys, owner lanes, smallest next artifacts, public issue URL state, report clusters, noise summary, fix queues, private-prompt exclusion, no hidden GitHub writes, no durable storage, and no source-authority effects.

Action-broker sandbox behavior is currently represented by [action-broker-sandbox.v1.json](../../../../tests/archie-service/fixtures/actions/action-broker-sandbox.v1.json) and [validate-action-broker-sandbox.mjs](../../../../scripts/archie-service/validate-action-broker-sandbox.mjs). The check consumes manifest `submit_issue` actions, issue-mining draft metadata, action preflight fixtures, token receipt ids, and terms state to verify confirmed prefilled GitHub handoff, unconfirmed no-run, cancelled no-run, stale-terms verification incomplete behavior, credentialed-write behavior for a Not advanced disposition, no hidden GitHub writes, no credentials, no payments, no durable storage, no private prompt exposure, and no source-authority effects.

## Shared Type Vocabulary

The future typed schema should start with these closed or controlled vocabularies.

| Type | Values |
| --- | --- |
| `Mode` | `Ask`, `Explain`, `Compare`, `Visualize`, `Triage Idea`, `Find Source` |
| `SourceClass` | `published_corpus`, `generated_reading_copy`, `scene_route`, `app_guide`, `archie_reference`, `priority_material`, `external_prior_physics` |
| `SourceAuthorityStatus` | `primary`, `routing_only`, `diagnostic`, `priority_only`, `comparison_only`, `excluded`, `unsupported` |
| `SourceVisibility` | `public`, `development_status`, `operator_developer`, `external_curated`, `excluded` |
| `ClaimLabel` | `published corpus`, `derivation target`, `priority-only`, `app diagnostic`, `external comparison`, `AAA-native stance`, `unsupported` |
| `ArtifactType` | `text`, `audio`, `image`, `diagram`, `generated_image_prompt`, `app_mockup`, `publication_asset_draft`, `narration_script`, `comparison_script`, `animation_storyboard`, `caption_track`, `transcript`, `issue_draft`, `saved_note_draft` |
| `ActionType` | `open_source`, `continue_reading`, `make_diagram`, `listen`, `submit_issue`, `save_note`, `auto_fund`, `include_user_material`, `share_artifact`, `confirm_action` |
| `WorkUnit` | `source_navigation`, `retrieval`, `retrieval_embedding`, `rerank`, `answer_generation`, `comparison`, `moderation`, `diagram`, `image`, `image_prompt`, `app_mockup`, `publication_asset_draft`, `high_quality_speech`, `caption_transcript`, `narration_script`, `comparison_script`, `animation_storyboard`, `issue_draft`, `saved_note`, `action_handoff` |
| `CapStatus` | `inside_limits`, `estimate_required`, `cap_exceeded`, `auto_fund_pending`, `insufficient_tokens`, `privacy_confirmation_required` |
| `RetentionState` | `ephemeral`, `ephemeral_unless_saved`, `minimal`, `session_local`, `durable_opt_in`, `disabled`, `redacted` |
| `ActionPreflightStatus` | `ready`, `estimate_required`, `confirmation_required`, `blocked`, `unavailable` |
| `ActionResultStatus` | `not_run`, `confirmed`, `completed`, `cancelled`, `failed_closed`, `external_pending` |
| `ConfirmationReason` | `public_visibility`, `durable_save`, `token_cap`, `auto_fund`, `privacy`, `retention`, `credentialed_action`, `user_media_inclusion`, `external_handoff` |
| `NotebookItemType` | `answer`, `source_route`, `reading_path`, `artifact`, `issue_draft`, `submitted_issue_link`, `followup_prompt`, `user_note`, `token_receipt` |
| `NotebookEvidenceStatus` | `not_project_evidence`, `public_issue_metadata`, `promoted_by_review` |
| `ShareState` | `private`, `share_disabled`, `share_pending_confirmation`, `shared_public` |
| `ProviderCapabilityType` | `answer_text`, `retrieval_embedding`, `rerank`, `speech_output`, `speech_input`, `image_generation`, `image_input`, `document_input`, `caption_transcript`, `moderation`, `video_generation`, `utility` |
| `ProviderEnabledState` | `disabled`, `internal_only`, `beta_enabled`, `public_enabled`, `degraded` |
| `ProviderHealthState` | `healthy`, `degraded`, `unavailable`, `policy_blocked`, `unknown` |
| `ProviderCostClass` | `free_static`, `low`, `standard`, `large_context`, `media`, `premium_media`, `operator_only` |
| `OperationalStatus` | `operational`, `degraded`, `partial_outage`, `maintenance`, `incident_active` |
| `IncidentSeverity` | `critical`, `high`, `medium`, `low`, `info` |
| `IncidentStatus` | `open`, `mitigated`, `resolved`, `postmortem_required` |
| `TermsAcceptanceScope` | `anonymous_session`, `account`, `billing`, `notebook`, `github_handoff`, `operator_developer` |
| `LegalReviewState` | `draft`, `counsel_required`, `approved_for_beta`, `approved_for_public` |
| `ValidatorDisposition` | `pass`, `fail_closed`, `allow_with_changes`, `refuse_artifact`, `text_only_fallback` |

Any new value should be added to this packet before it becomes public product behavior.

The `failed_closed`, `fail_closed`, and `failClosedAction` spellings are retained V1 compatibility values. Human-facing explanations must classify the underlying outcome as `Verification failed`, `Verification incomplete`, or the disposition `Not advanced`. These compatibility values do not change the policy: verification is required for advancement.

## User-Facing Rendering Contract

Service contracts may expose structured fields to implementation code, but the browser client must render the following plain-language states from the manifest:

| Rendered state | Required behavior |
| --- | --- |
| AI identity | State that the user is asking an AI assistant. |
| Source basis | Show source chips, freshness when needed, and claim label before proof-sensitive answers. |
| Displayed answer | Render `answer_body.display_text` and make `verbatim_segments` available for copy, export, and speech sync. |
| Spoken answer | Say high-quality speech is available with displayed text, or explain text-only fallback. |
| Generated media | Label generated or edited artifacts as AI-generated or AI-drafted, with purpose, caption, alt text, source basis, and claim level. |
| Token receipt | Show spending-limit state, estimate, hold, charge, refund, and cap state without private prompt expansion. |
| Privacy | State whether material is private, retained, deleted, public, saved, redacted, or ephemeral. |
| Public issue handoff | Show issue preview, included material, public visibility, destination, and confirmation requirement before handoff. |
| Service status | Show available, degraded, unavailable, or safe fallback state without raw logs or provider secrets. |
| Accessibility | Render captions, transcripts, alt text, status messages, or text fallback where needed. |

Implementation terms such as `provider_execution_context`, `speech_sync`, `token_receipt`, `issue_mining_context`, `observability_context`, `terms_acceptance_state`, `fixture`, `validator`, `C2PA`, `AI RMF`, or `ISO/IEC 42001` can remain in types, schemas, logs, and diagnostics. They should not be required for a user to understand the result.

## Base Result Shape

Every component should return a typed result that can be composed into a manifest.

```ts
type ContractResult<T> = {
  ok: boolean;
  value?: T;
  errors: ContractError[];
  warnings: ContractWarning[];
};

type ContractError = {
  code: string;
  field?: string;
  message: string;
  failClosedAction: "omit_artifact" | "text_only_fallback" | "refuse_response" | "require_confirmation";
};

type ContractWarning = {
  code: string;
  field?: string;
  message: string;
};
```

Errors should be visible to developer diagnostics and, when relevant, represented to the user as a compliant fallback or refusal. They should not silently disappear.

## Service Boundary Contracts

Each service boundary reads a narrow input, writes a narrow output, and leaves the rest of the manifest untouched.

| Boundary | Input | Output | Required validators |
| --- | --- | --- | --- |
| `request_gateway` | User prompt, selected mode, account/session state, token caps, enabled capabilities. | Normalized request envelope with request id, safe request summary, capability flags, and spending limits. | privacy state, account/cap sanity, request-size cap. |
| `mode_router` | Normalized request envelope. | Manifest shell with `manifest_id`, `schema_version`, `created_at`, `mode`, `request_summary`, initial actions. | allowed mode, unavailable capability fallback. |
| `provider_registry` | Manifest shell, requested capabilities, account/session capability state, provider health, terms/privacy policy. | `provider_execution_context`, capability availability, fallback state, credential boundary, cost class. | model/provider capability registry contract, browser-key refusal, quality gate, fallback, cost map, privacy/terms state. |
| `retrieval_context` | Manifest shell, request summary, source policy, corpus/app indexes, scene indexes, source records. | `source_context` with source classes, primary/supporting routes, excluded classes, source policy, freshness, System Card route, missing routes, and source-chip payloads. | source ingestion and retrieval context contract, source authority, source freshness, priority visibility, missing-route behavior. |
| `answer_engine` | Manifest shell plus `source_context`. | `claim_context`, `answer_body`, unsupported route, reading path, follow-up prompt. | answer-engine source contract, claim context, unsupported answer, TeX preservation. |
| `artifact_orchestrator` | Manifest, requested artifact actions, token estimate, media policy. | Artifact work plan. | media standard precheck, token cap precheck, privacy precheck. |
| `speech_service` | Manifest with `answer_body.verbatim_segments`, token allowance, speech provider status. | `audio` artifact plus `speech_sync`, or text-only fallback state. | speech sync, high-quality-only, retention, token receipt. |
| `visual_artifact_service` | Manifest, visual request, media policy, token allowance. | `image` or `diagram` artifact. | media standard, purpose label, source/claim inheritance, alt text/caption. |
| `issue_draft_service` | Manifest, user category, feedback/idea text, privacy inclusion state. | `issue_draft` artifact and `issue_mining_context`. | issue mining, public visibility, privacy inclusion. |
| `notebook_service` | Manifest, save request, consent state, retention policy, storage policy. | `saved_note_draft`, notebook item state, account-history state, delete/export/share state. | saved notebook and account history contract, retention, delete/export, storage cost, not-project-evidence. |
| `terms_policy` | Manifest, requested feature set, account/session terms state, legal-review state. | `terms_acceptance_state`, feature blockers, re-acceptance requirements. | service terms and account policy contract, terms versions, feature blockers, legal-review state. |
| `token_ledger` | Work plan, provider costs, user caps, completed work units. | `token_receipt`. | token ledger and privacy contract, receipt consistency, cap status, auto-fund state. |
| `privacy_and_audit` | Manifest, consent state, retention policy, generated artifacts. | `privacy_state`, safe diagnostics. | token ledger and privacy contract, retention, deletion route, private data redaction. |
| `observability_status` | Manifest, validator dispositions, provider health, token receipt, issue context, privacy redaction state, incident policy. | Safe event classes, aggregate metrics, public-status state, support-summary redaction state, incident/change-history candidates. | observability public status and incident contract, redaction, public status, incident safety, no-proof-authority metrics. |
| `action_broker` | Manifest, action request, confirmation state, consent state, token state. | Updated `available_actions`, confirmation text, destination, credential boundary, and optional action result. | action broker confirmation contract, side-effect guard, credentialed-action boundary. |
| `manifest_validator` | Complete candidate manifest. | Validated manifest or manifest-shaped response with a Not advanced disposition. | all validators in defined order. |
| `conversation_surface` | Validated manifest. | Rendered UI only. | no new authority fields, no unmanifested actions. |

## Validator Contract Order

Validators should run in this order because later validators depend on earlier authority and privacy decisions.

1. `shape_validator` checks required top-level fields, schema version, ids, timestamps, and enum values.
2. `provider_capability_validator` checks provider capability registry entries, enabled state, health state, quality gates, fallback behavior, credential boundary, cost mapping, privacy/terms state, and no-browser-key behavior.
3. `source_authority_validator` checks source classes, source routes, source policy, source chips, missing routes, excluded classes, freshness, canonical parents, and priority visibility.
4. `claim_context_validator` checks claim label, unsupported routing, proof-status warnings, and System Card route.
5. `answer_body_validator` checks displayed text, verbatim segments, TeX preservation, and follow-up prompt shape.
6. `media_standard_validator` checks generated text, audio, images, diagrams, scripts, storyboards, issue drafts, captions, transcripts, and future media.
7. `speech_sync_validator` checks high-quality-only speech, synchronized displayed verbatim text, playback controls, and ephemeral audio retention.
8. `token_receipt_validator` checks estimate, hold, charge, refund, work units, cap status, and auto-fund state.
9. `privacy_state_validator` checks prompt retention, answer retention, media retention, uploaded material, consent, visibility, and deletion route.
10. `terms_policy_validator` checks service terms, token/subscription terms, privacy notices, generated-media terms, GitHub handoff notices, notebook terms, support-route availability, re-acceptance state, feature blockers, and legal-review state.
11. `observability_redaction_validator` checks logs, metrics, public status, support summaries, issue-mining handoff, and incident records for private prompt text, provider secrets, raw payloads, account history, private saved notes, and no-proof-authority metrics.
12. `action_confirmation_validator` checks durable, public, paid, retained, and credentialed action confirmation requirements.
13. `notebook_history_validator` checks saved-note draft, durable-save availability, account-history state, deletion route, export route, share state, storage cost, and not-project-evidence labels.
14. `issue_mining_validator` checks public issue metadata, duplicate keys, source routes, privacy inclusion, owner routing, and smallest next artifact.
15. `render_contract_validator` checks that the UI can render the manifest without inventing source authority, claim status, provider state, billing state, action state, terms state, observability state, notebook evidence state, or user-facing implementation jargon.

If a validator fails, the response should either remove the invalid artifact, return text-only fallback, require confirmation, or return a manifest-shaped refusal. The system should not patch source authority or proof status invisibly.

## Endpoint Contracts

### `POST /answers`

Build a new manifest for a text-first answer and any initially requested artifacts.

Required request fields:

| Field | Purpose |
| --- | --- |
| `mode` | Requested mode. |
| `prompt` | User question or instruction. |
| `context_route` | Optional page, scene, document, sphere, app, or source route. |
| `artifact_requests` | Requested artifacts such as audio, image, diagram, or issue draft. |
| `provider_capability_requests` | Product-level requested provider-backed capabilities; no provider secrets or direct model config. |
| `token_cap` | Optional per-request cap. |
| `privacy_preferences` | User-selected retention or public-inclusion preferences. |
| `accepted_terms` | Safe accepted terms-version state when the request needs paid, retained, durable, public, generated-media, or credentialed features. |

Required response:

- validated Answer Artifact Manifest; or
- manifest-shaped response with a Not advanced disposition and `claim_label: unsupported`, no unsafe artifacts, and a clear nearest supported route when available.

### `POST /answers/{manifest_id}/actions/listen`

Add service-native speech to an existing manifest.

Required behavior:

- use only `answer_body.verbatim_segments` as speech source text;
- generate high-quality audio only;
- create `speech_sync` timed segments;
- keep audio ephemeral by default;
- update `token_receipt` with high-quality speech work units;
- return text-only fallback if high-quality speech, synchronization, privacy, or token constraints fail.

The endpoint must not generate lower-quality audio.

### `POST /answers/{manifest_id}/actions/visualize`

Add a diagram or generated image artifact.

Required behavior:

- preserve source and claim context;
- assign purpose label;
- provide caption and alt text when practical;
- run media-standard validation;
- update token receipt;
- refuse proof-inflating visuals.

### `POST /answers/{manifest_id}/actions/issue-draft`

Add an issue draft and issue-mining metadata.

Required behavior:

- include title, body, labels, source context, claim label, public visibility warning, and confirmation requirement;
- include `issue_mining_context`;
- exclude private user material unless explicit inclusion consent exists;
- keep GitHub submission user-confirmed.

### `POST /answers/{manifest_id}/actions/save-note`

Add a session-local saved-note draft or return durable-save unavailable/confirmation state.

Required behavior:

- follow [saved-notebook-account-history-contract.md](saved-notebook-account-history-contract.md);
- include source context and claim context when saving answer-derived material;
- mark private user notes as `not_project_evidence`;
- include retention, delete, export, share, and storage-cost state;
- require action-broker confirmation before durable save, share, submitted issue-link retention, user-material inclusion, or account-history opt-in.

### `POST /answers/{manifest_id}/actions/confirm`

Execute a user-confirmed action.

The endpoint must follow [action-broker-confirmation-contract.md](action-broker-confirmation-contract.md).

Allowed V1 confirmations:

| Action | Result |
| --- | --- |
| `submit_issue` | Open prefilled GitHub issue URL or later approved action broker path. |
| `save_note` | Save only when retention, deletion, and storage-cost policy exists. |
| `auto_fund` | Trigger only within user-enabled auto-fund cap. |
| `include_user_material` | Include only the explicitly consented material. |
| `share_artifact` | Deferred unless public sharing policy exists. |

The endpoint must record confirmation reason, destination, public visibility, token effect, privacy effect, and resulting artifact type.

### `GET /service-terms`

Return current hosted-service terms and version ids.

Required response fields:

- public Legal Terms route;
- service terms version;
- privacy notice version;
- token/subscription terms version;
- generated-media terms version;
- GitHub handoff notice version;
- saved-notebook/account-history terms version;
- support route;
- abuse policy version;
- terms-change notice;
- legal-review state.

### `POST /account/terms/accept`

Record accepted terms versions for the safe account/session scope.

Required behavior:

- accept only current terms versions;
- record acceptance scope;
- return feature blockers if any required term remains unaccepted;
- never store private prompt text as part of terms acceptance;
- require re-acceptance when a versioned term changes in a way that affects paid, durable, public, retained, generated-media, or credentialed features.

### `GET /provider-capabilities`

Return public-safe product capability state.

Required response fields:

- capability id;
- capability type;
- enabled state;
- health state;
- quality gate summary;
- fallback behavior;
- cost class;
- public-safe privacy/terms requirement;
- credential boundary category;
- disabled or degraded reason when user-visible.

The endpoint must not return provider secrets, raw model references, direct model-call configuration, or provider-specific billing internals.

### `GET /service-status`

Return public-safe product status and incident/change-history state.

Required response fields:

- service status;
- answer status;
- source status;
- speech status;
- visual status;
- issue handoff status;
- token status;
- terms status;
- active public incident ids and severity;
- recent public-safe changes.

The endpoint must not return private prompt text, raw logs, provider secrets, raw provider errors, account identifiers, unsubmitted issue drafts, or private saved-note state.

### `GET /answers/{manifest_id}/receipt`

Return token receipt and privacy state without expanding private prompt text.

Required response fields:

- receipt id;
- estimate shown;
- estimated tokens;
- hold;
- actual charge;
- refund;
- source classes;
- work units;
- artifact count;
- cap status;
- auto-fund event;
- privacy state.

## Not advanced Manifest Shape

A failure should still look like a manifest so the UI, token ledger, issue draft path, and diagnostics do not need a separate response model.

Fields required for advancement verification:

| Field | Required value |
| --- | --- |
| `claim_context.claim_label` | `unsupported` unless a weaker non-unsupported label is more accurate. |
| `answer_body.display_text` | Plain explanation of what could not be done and what safe alternative exists. |
| `artifacts` | Empty or only compliant fallback artifacts. |
| `speech_sync` | `null` unless valid high-quality synchronized audio exists. |
| `token_receipt.actual_tokens_charged` | Zero or only the allowed charge for completed safe work. |
| `privacy_state` | Must state whether anything was retained. |
| `available_actions` | Only safe alternatives or confirmation-gated actions. |
| `diagnostics` | Safe developer summary without private prompt leakage. |

Responses with a Not advanced disposition should be regression-tested for unsupported answers, unavailable high-quality speech, insufficient tokens, missing source routes, media-standard refusal, privacy refusal, unsafe observability redaction, and unconfirmed public issue submission.

## Speech Sync Contract

The speech contract is stricter than ordinary artifact generation and must follow [service-native-speech-presentation-contract.md](service-native-speech-presentation-contract.md):

1. `answer_body.verbatim_segments` is the only speech source in V1.
2. `speech_sync.quality_policy` must be `high_quality_only`.
3. `speech_sync.fallback_policy` must be `text_only_if_high_quality_unavailable`.
4. `speech_sync.timed_segments` must cover the spoken content.
5. Audio must be ephemeral by default.
6. Voice identity must avoid real-person imitation, endorsement framing, and proof-authority framing.
7. Token receipts must not charge for low-quality or omitted audio fallback.

If any item fails, the endpoint should return text-only fallback.

## Token Receipt Contract

The token receipt should be updated by service components but owned by `token_ledger` and governed by [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md).

Rules:

1. work units are reported by components but priced by the token ledger;
2. estimate and hold are recorded before work that exceeds configured limits or triggers auto-fund;
3. actual charge is recorded after validation, not before artifact validation;
4. refunded holds are explicit;
5. failed artifacts are not charged unless a policy explicitly charges for attempted provider work;
6. token spend cannot alter claim labels, source context, or unsupported-answer behavior.

## Privacy Retention Contract

Privacy state should be populated by `privacy_and_audit` and governed by [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md).

Rules:

1. privacy preflight runs before work that retains, publishes, attaches, or shares user material;
2. generated audio is ephemeral by default in the MVP;
3. durable saved notes require consent, retention policy, deletion route, and storage-cost policy;
4. issue drafts exclude private material unless explicit inclusion consent exists;
5. receipts, issue-mining metadata, and diagnostics must not expand private prompt text;
6. missing retention policy returns a manifest for a Not advanced disposition or text-only fallback.

## Issue Mining Contract

Issue mining metadata should be produced at issue-draft time, not reconstructed later, and downstream reports should follow [issue-mining-signal-contract.md](issue-mining-signal-contract.md).

Required minimum:

1. origin mode;
2. origin surface;
3. source routes;
4. claim label;
5. user-selected category;
6. suggested labels;
7. duplicate keys;
8. privacy inclusion state;
9. recommended owner;
10. smallest next artifact.

The issue-mining pipeline should be able to cluster recurring signal from this public metadata even when private prompt text is unavailable. It should emit clusters, signal scores, noise classes, owner-routed fix queues, fixture candidates, source-index candidates, and a privacy statement.

## Contract Fixtures

The future implementation should include fixtures for:

| Fixture | Required proof |
| --- | --- |
| `contract-retrieval-published-001` | `retrieval_context` returns authored corpus route, source chip, freshness, and no model-memory source authority. |
| `contract-retrieval-missing-route-001` | Missing route is recorded in `source_context` and produces nearest route or unsupported behavior. |
| `contract-answer-text-001` | `POST /answers` returns a valid text-only manifest with source and claim context. |
| `contract-answer-unsupported-001` | Unsupported answer returns manifest for a Not advanced disposition with nearest route or burden. |
| `contract-provider-context-001` | Manifest includes provider execution context for provider-backed capabilities without exposing secrets. |
| `contract-provider-browser-key-negative-001` | Public client receives no model API keys, direct model-call config, or raw provider payloads. |
| `contract-provider-fallback-001` | Degraded or unavailable provider health produces declared fallback or unavailable action. |
| `contract-provider-source-authority-negative-001` | Provider output cannot upgrade claim label, source class, or proof status. |
| `contract-listen-high-quality-001` | Listen action adds high-quality audio, `speech_sync`, timed segments, and token receipt work unit. |
| `contract-listen-fallback-001` | High-quality speech unavailable returns text-only fallback and no low-quality audio artifact. |
| `contract-presentation-storyboard-001` | Storyboard includes scene beats, captions, source basis, claim label, and no proof overclaim. |
| `contract-presentation-hidden-summary-001` | Audio cannot secretly speak a summary instead of displayed verbatim text. |
| `contract-visualize-001` | Visualize action adds purpose-labeled image or diagram with caption, alt text, source context, and claim context. |
| `contract-visual-proof-negative-001` | Visual request that asks for proof is refused or reshaped to a concept diagram or analogy. |
| `contract-visual-publication-draft-001` | Publication asset draft records human-review-required state and does not imply final approval. |
| `contract-issue-draft-001` | Issue draft includes public warning, confirmation requirement, and issue-mining context. |
| `contract-issue-mining-report-001` | Mining report emits clusters, signal scores, noise classes, owner queues, representative public issues, and privacy statement. |
| `contract-observability-status-001` | Public status endpoint exposes product-level degradation and incident ids without provider secrets or private prompt text. |
| `contract-observability-redaction-negative-001` | Unsafe log, support summary, issue-mining handoff, or incident disclosure is blocked or redacted. |
| `contract-observability-source-authority-negative-001` | Metrics, issue volume, provider success, or incidents cannot upgrade claim label or source class. |
| `contract-confirm-issue-001` | Submit issue action requires confirmation and exposes GitHub public-visibility warning. |
| `contract-confirm-unsubmitted-negative-001` | Unconfirmed issue submission, auto-fund, save, share, or user-material inclusion produces no side effect. |
| `contract-action-result-001` | Confirmed action writes result status, destination, privacy effect, and token effect back into the manifest. |
| `contract-notebook-draft-001` | Save-note action creates session-local draft with retention, delete/export/share, and not-project-evidence state. |
| `contract-notebook-durable-negative-001` | Durable save is unavailable without retention, deletion, export, and storage-cost policy. |
| `contract-notebook-private-evidence-negative-001` | Private saved note cannot become source evidence or proof status. |
| `contract-terms-state-001` | Manifest includes `terms_acceptance_state` with terms versions, acceptance scope, feature blockers, and legal-review state. |
| `contract-terms-missing-negative-001` | Paid, durable, retained, public, generated-media, or credentialed action is blocked when required terms are missing. |
| `contract-terms-reacceptance-001` | Changed terms block affected features until accepted again. |
| `contract-terms-proof-negative-001` | Terms acceptance or payment cannot alter claim label, source class, or proof status. |
| `contract-token-cap-001` | Cap exceedance returns insufficient-token or estimate-required manifest without running expensive work. |
| `contract-privacy-refusal-001` | Private user material is excluded unless explicit consent exists. |
| `contract-render-001` | Conversation surface can render all required manifest fields without inventing side-channel state. |

## Implementation Handoff

Closure goal: Turn Manifest Service Contracts into concrete TypeScript interfaces, JSON Schema validators, and endpoint tests for the Archie service.

Use this packet, [answer-artifact-manifest.md](answer-artifact-manifest.md), [manifest-driven-service-architecture.md](manifest-driven-service-architecture.md), [ai-communication-standards.md](ai-communication-standards.md), [source-ingestion-retrieval-context-contract.md](source-ingestion-retrieval-context-contract.md), [answer-engine-source-contract.md](answer-engine-source-contract.md), [model-provider-capability-registry-contract.md](model-provider-capability-registry-contract.md), [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md), [issue-mining-signal-contract.md](issue-mining-signal-contract.md), [observability-public-status-incident-contract.md](observability-public-status-incident-contract.md), [action-broker-confirmation-contract.md](action-broker-confirmation-contract.md), [saved-notebook-account-history-contract.md](saved-notebook-account-history-contract.md), [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md), [service-native-speech-presentation-contract.md](service-native-speech-presentation-contract.md), and [visual-artifact-contract.md](visual-artifact-contract.md) as the source of truth.

Use [service-deployment-option-decision.md](service-deployment-option-decision.md), [service-deployment-architecture.md](service-deployment-architecture.md), and [service-scaffolding-and-fixtures.md](service-scaffolding-and-fixtures.md) for the deployment responsibility split before assigning endpoint ownership and schema fixture locations.

Task:
- Encode the shared type vocabulary.
- Encode source record, source chip, source visibility, freshness, and missing-route types.
- Encode provider capability, enabled-state, health-state, quality-gate, fallback, credential-boundary, cost-class, privacy/terms, and observability types.
- Encode observability event, public-status, incident, change-history, support-summary, and redaction types.
- Encode action preflight, confirmation reason, credential boundary, destination, and result-status types.
- Encode saved-note, notebook item, account-history, share-state, export/delete, and evidence-status types.
- Encode service terms, accepted-version, acceptance-scope, re-acceptance, feature-blocker, support-route, and legal-review-state types.
- Define request and response types for each service boundary.
- Implement validator ordering and result types for Not advanced dispositions.
- Define endpoint request/response schemas.
- Map executable coverage to accepted service targets only after the standards gate and implementation target require it; keep fixture names and validator vocabulary implementation-only.

Constraints:
- Preserve source authority and claim labels across every artifact.
- Keep high-quality speech only; use text-only fallback if the bar is not met.
- Do not charge for omitted low-quality speech fallback.
- Do not expose private prompt text in receipts or issue-mining metadata.
- Do not expose private prompt text, provider secrets, raw provider payloads, account history, or private saved notes in logs, metrics, public status, support summaries, or incident records.
- Do not create runtime AI calls, credentials, deployment config, or public launch behavior unless explicitly requested.
