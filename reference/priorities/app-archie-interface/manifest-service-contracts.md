# Manifest Service Contracts

## Workstream Metadata

- Kind: `priority-contract`
- Status: `draft`
- Claim level: `priority-only`
- Parent priority: [Archie Interface App](app-archie-interface.md)
- Answer artifact manifest: [answer-artifact-manifest.md](answer-artifact-manifest.md)
- Manifest-driven service architecture: [manifest-driven-service-architecture.md](manifest-driven-service-architecture.md)
- Answer engine source contract: [answer-engine-source-contract.md](answer-engine-source-contract.md)
- Token ledger and privacy contract: [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md)
- Issue mining signal contract: [issue-mining-signal-contract.md](issue-mining-signal-contract.md)
- Service-native speech and presentation contract: [service-native-speech-presentation-contract.md](service-native-speech-presentation-contract.md)
- Visual artifact contract: [visual-artifact-contract.md](visual-artifact-contract.md)
- V1 product requirements: [v1-product-requirements.md](v1-product-requirements.md)
- Service platform owner: [Archie Service Platform](../archie/service-platform.md)

## Purpose

This packet turns the [Answer Artifact Manifest](answer-artifact-manifest.md) and [Manifest-Driven Service Architecture](manifest-driven-service-architecture.md) into typed service-boundary, validator, and endpoint contracts.

It is not runtime code. It defines the contracts a future implementation should encode in TypeScript, JSON Schema, API validators, integration tests, and UI rendering tests.

The core invariant is simple: every service endpoint returns either a validated Answer Artifact Manifest or a fail-closed manifest-shaped refusal/error response. No endpoint should return a separate ad hoc answer shape.

## Shared Type Vocabulary

The future typed schema should start with these closed or controlled vocabularies.

| Type | Values |
| --- | --- |
| `Mode` | `Ask`, `Explain`, `Compare`, `Visualize`, `Triage Idea`, `Find Source` |
| `SourceClass` | `published_corpus`, `generated_reading_copy`, `scene_route`, `app_guide`, `priority_material`, `external_prior_physics` |
| `ClaimLabel` | `published corpus`, `derivation target`, `priority-only`, `app diagnostic`, `external comparison`, `AAA-native stance`, `unsupported` |
| `ArtifactType` | `text`, `audio`, `image`, `diagram`, `generated_image_prompt`, `app_mockup`, `publication_asset_draft`, `narration_script`, `comparison_script`, `animation_storyboard`, `caption_track`, `transcript`, `issue_draft`, `saved_note_draft` |
| `ActionType` | `open_source`, `make_diagram`, `listen`, `submit_issue`, `save_note`, `continue_reading`, `confirm_action` |
| `WorkUnit` | `source_navigation`, `retrieval`, `answer_generation`, `comparison`, `diagram`, `image`, `image_prompt`, `app_mockup`, `publication_asset_draft`, `high_quality_speech`, `caption_transcript`, `narration_script`, `comparison_script`, `animation_storyboard`, `issue_draft`, `saved_note`, `action_handoff` |
| `CapStatus` | `inside_limits`, `estimate_required`, `cap_exceeded`, `auto_fund_pending`, `insufficient_tokens`, `privacy_confirmation_required` |
| `RetentionState` | `ephemeral`, `ephemeral_unless_saved`, `minimal`, `session_local`, `durable_opt_in`, `disabled`, `redacted` |
| `ConfirmationReason` | `public_visibility`, `durable_save`, `token_cap`, `auto_fund`, `privacy`, `retention`, `credentialed_action`, `user_media_inclusion` |
| `ValidatorDisposition` | `pass`, `fail_closed`, `allow_with_changes`, `refuse_artifact`, `text_only_fallback` |

Any new value should be added to this packet before it becomes public product behavior.

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
| `retrieval_context` | Manifest shell, request summary, source policy, corpus/app indexes. | `source_context` with source classes, primary/supporting routes, excluded classes, freshness, System Card route. | source authority, source freshness, priority visibility. |
| `answer_engine` | Manifest shell plus `source_context`. | `claim_context`, `answer_body`, unsupported route, reading path, follow-up prompt. | answer-engine source contract, claim context, unsupported answer, TeX preservation. |
| `artifact_orchestrator` | Manifest, requested artifact actions, token estimate, media policy. | Artifact work plan. | media standard precheck, token cap precheck, privacy precheck. |
| `speech_service` | Manifest with `answer_body.verbatim_segments`, token allowance, speech provider status. | `audio` artifact plus `speech_sync`, or text-only fallback state. | speech sync, high-quality-only, retention, token receipt. |
| `visual_artifact_service` | Manifest, visual request, media policy, token allowance. | `image` or `diagram` artifact. | media standard, purpose label, source/claim inheritance, alt text/caption. |
| `issue_draft_service` | Manifest, user category, feedback/idea text, privacy inclusion state. | `issue_draft` artifact and `issue_mining_context`. | issue mining, public visibility, privacy inclusion. |
| `token_ledger` | Work plan, provider costs, user caps, completed work units. | `token_receipt`. | token ledger and privacy contract, receipt consistency, cap status, auto-fund state. |
| `privacy_and_audit` | Manifest, consent state, retention policy, generated artifacts. | `privacy_state`, safe diagnostics. | token ledger and privacy contract, retention, deletion route, private data redaction. |
| `action_broker` | Manifest, action request, confirmation state. | Updated `available_actions` and optional action result. | action confirmation, credentialed-action boundary. |
| `manifest_validator` | Complete candidate manifest. | Validated manifest or fail-closed manifest-shaped response. | all validators in defined order. |
| `conversation_surface` | Validated manifest. | Rendered UI only. | no new authority fields, no unmanifested actions. |

## Validator Contract Order

Validators should run in this order because later validators depend on earlier authority and privacy decisions.

1. `shape_validator` checks required top-level fields, schema version, ids, timestamps, and enum values.
2. `source_authority_validator` checks source classes, source routes, excluded classes, freshness, and priority visibility.
3. `claim_context_validator` checks claim label, unsupported routing, proof-status warnings, and System Card route.
4. `answer_body_validator` checks displayed text, verbatim segments, TeX preservation, and follow-up prompt shape.
5. `media_standard_validator` checks generated text, audio, images, diagrams, scripts, storyboards, issue drafts, captions, transcripts, and future media.
6. `speech_sync_validator` checks high-quality-only speech, synchronized displayed verbatim text, playback controls, and ephemeral audio retention.
7. `token_receipt_validator` checks estimate, hold, charge, refund, work units, cap status, and auto-fund state.
8. `privacy_state_validator` checks prompt retention, answer retention, media retention, uploaded material, consent, visibility, and deletion route.
9. `action_confirmation_validator` checks durable, public, paid, retained, and credentialed action confirmation requirements.
10. `issue_mining_validator` checks public issue metadata, duplicate keys, source routes, privacy inclusion, owner routing, and smallest next artifact.
11. `render_contract_validator` checks that the UI can render the manifest without inventing source authority, claim status, billing state, or action state.

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
| `token_cap` | Optional per-request cap. |
| `privacy_preferences` | User-selected retention or public-inclusion preferences. |

Required response:

- validated Answer Artifact Manifest; or
- fail-closed manifest-shaped response with `claim_label: unsupported`, no unsafe artifacts, and a clear nearest supported route when available.

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

### `POST /answers/{manifest_id}/actions/confirm`

Execute a user-confirmed action.

Allowed V1 confirmations:

| Action | Result |
| --- | --- |
| `submit_issue` | Open prefilled GitHub issue URL or later approved action broker path. |
| `save_note` | Save only when retention, deletion, and storage-cost policy exists. |
| `auto_fund` | Trigger only within user-enabled auto-fund cap. |
| `include_user_material` | Include only the explicitly consented material. |

The endpoint must record confirmation reason, destination, public visibility, token effect, privacy effect, and resulting artifact type.

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

## Fail-Closed Manifest Shape

A failure should still look like a manifest so the UI, token ledger, issue draft path, and diagnostics do not need a separate response model.

Required fail-closed fields:

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

Fail-closed responses should be regression-tested for unsupported answers, unavailable high-quality speech, insufficient tokens, missing source routes, media-standard refusal, privacy refusal, and unconfirmed public issue submission.

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
6. missing retention policy returns a fail-closed manifest or text-only fallback.

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
| `contract-answer-text-001` | `POST /answers` returns a valid text-only manifest with source and claim context. |
| `contract-answer-unsupported-001` | Unsupported answer returns fail-closed manifest with nearest route or burden. |
| `contract-listen-high-quality-001` | Listen action adds high-quality audio, `speech_sync`, timed segments, and token receipt work unit. |
| `contract-listen-fallback-001` | High-quality speech unavailable returns text-only fallback and no low-quality audio artifact. |
| `contract-presentation-storyboard-001` | Storyboard includes scene beats, captions, source basis, claim label, and no proof overclaim. |
| `contract-presentation-hidden-summary-001` | Audio cannot secretly speak a summary instead of displayed verbatim text. |
| `contract-visualize-001` | Visualize action adds purpose-labeled image or diagram with caption, alt text, source context, and claim context. |
| `contract-visual-proof-negative-001` | Visual request that asks for proof is refused or reshaped to a concept diagram or analogy. |
| `contract-visual-publication-draft-001` | Publication asset draft records human-review-required state and does not imply final approval. |
| `contract-issue-draft-001` | Issue draft includes public warning, confirmation requirement, and issue-mining context. |
| `contract-issue-mining-report-001` | Mining report emits clusters, signal scores, noise classes, owner queues, representative public issues, and privacy statement. |
| `contract-confirm-issue-001` | Submit issue action requires confirmation and exposes GitHub public-visibility warning. |
| `contract-token-cap-001` | Cap exceedance returns insufficient-token or estimate-required manifest without running expensive work. |
| `contract-privacy-refusal-001` | Private user material is excluded unless explicit consent exists. |
| `contract-render-001` | Conversation surface can render all required manifest fields without inventing side-channel state. |

## Implementation Handoff

Closure goal:
Turn Manifest Service Contracts into concrete TypeScript interfaces, JSON Schema validators, and endpoint tests for the Archie service.

Use this packet, [answer-artifact-manifest.md](answer-artifact-manifest.md), [manifest-driven-service-architecture.md](manifest-driven-service-architecture.md), [answer-engine-source-contract.md](answer-engine-source-contract.md), [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md), [issue-mining-signal-contract.md](issue-mining-signal-contract.md), [service-native-speech-presentation-contract.md](service-native-speech-presentation-contract.md), and [visual-artifact-contract.md](visual-artifact-contract.md) as the source of truth.

Task:
- Encode the shared type vocabulary.
- Define request and response types for each service boundary.
- Implement validator ordering and fail-closed result types.
- Define endpoint request/response schemas.
- Create fixtures for text answers, unsupported answers, high-quality speech, speech fallback, visuals, issue drafts, token caps, privacy refusals, and rendering.

Constraints:
- Preserve source authority and claim labels across every artifact.
- Keep high-quality speech only; use text-only fallback if the bar is not met.
- Do not charge for omitted low-quality speech fallback.
- Do not expose private prompt text in receipts or issue-mining metadata.
- Do not create runtime AI calls, credentials, deployment config, or public launch behavior unless explicitly requested.
