# Answer Artifact Manifest

## Workstream Metadata

- Kind: `priority-contract`
- Status: `draft`
- Claim level: `priority-only`
- Parent priority: [Archie Interface App](app-archie-interface.md)
- V1 product requirements: [v1-product-requirements.md](v1-product-requirements.md)
- Manifest service contracts: [manifest-service-contracts.md](manifest-service-contracts.md)
- Source ingestion and retrieval context contract: [source-ingestion-retrieval-context-contract.md](source-ingestion-retrieval-context-contract.md)
- Answer engine source contract: [answer-engine-source-contract.md](answer-engine-source-contract.md)
- Model/provider capability registry contract: [model-provider-capability-registry-contract.md](model-provider-capability-registry-contract.md)
- Token ledger and privacy contract: [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md)
- Issue mining signal contract: [issue-mining-signal-contract.md](issue-mining-signal-contract.md)
- Action broker confirmation contract: [action-broker-confirmation-contract.md](action-broker-confirmation-contract.md)
- Saved notebook and account history contract: [saved-notebook-account-history-contract.md](saved-notebook-account-history-contract.md)
- Service terms and account policy contract: [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md)
- Service-native speech and presentation contract: [service-native-speech-presentation-contract.md](service-native-speech-presentation-contract.md)
- Visual artifact contract: [visual-artifact-contract.md](visual-artifact-contract.md)
- Generated media corporate standard: [corporate-media-standards.md](corporate-media-standards.md)
- Generated media acceptance fixtures: [corporate-media-acceptance-fixtures.md](corporate-media-acceptance-fixtures.md)
- Service platform owner: [Archie Service Platform](../archie/service-platform.md)

## Purpose

The Answer Artifact Manifest is the shared product contract for every Archie service response.

Its job is to keep the answer engine, user interface, generated media, speech synchronization, token accounting, issue drafts, privacy handling, and issue-mining metadata aligned. Without one manifest, each feature can invent its own answer shape, which would make source authority, cost controls, accessibility, and downstream issue mining drift apart.

This packet is not runtime code. It defines the data shape and invariants that the future service implementation should turn into a typed schema, API response contract, validation fixtures, and user-interface rendering contract.

## Contract Principle

Every answer is a manifest first.

The user may see a natural-language answer, a spoken answer, an image, a diagram, an issue preview, a token receipt, or a saved note. Behind those views, the service should keep one manifest that records:

1. what the user asked;
2. which mode handled the request;
3. what source classes and source routes were used;
4. what claim label was assigned;
5. what answer text was produced;
6. what generated media artifacts were produced;
7. how speech aligns with displayed text;
8. which provider-backed product capabilities were used, blocked, or downgraded;
9. what token estimate, hold, charge, and refund occurred;
10. what privacy and retention state applies;
11. what terms acceptance state governs paid, retained, public, media, or credentialed features;
12. what user-confirmed actions are available;
13. what issue-mining metadata should survive if the user files feedback.

The manifest must never upgrade proof status. Source authority lives in the source and claim fields, and those fields must follow [answer-engine-source-contract.md](answer-engine-source-contract.md). Media polish, voice quality, token spend, issue urgency, or presentation style cannot strengthen them.

## Architecture Drivers

The manifest should drive service architecture by assigning each platform component a clear contract boundary.

| Component | Manifest responsibility |
| --- | --- |
| `conversation_surface` | Renders `answer_body`, source chips, claim labels, artifacts, action rail, token receipt, privacy state, and issue previews. |
| `mode_router` | Writes `mode`, request summary, and initial action state. |
| `retrieval_context` | Populates `source_context`, source freshness, source chips, missing routes, excluded source classes, and System Card route. |
| `answer_engine` | Populates `claim_context`, `answer_body`, unsupported-answer routing, reading path, and follow-up prompt. |
| `provider_registry` | Populates safe provider capability state, quality gates, fallback state, cost class, health state, and credential boundary. |
| `artifact_generator` | Adds generated image, diagram, narration-script, storyboard, issue-draft, and saved-note artifacts while inheriting source and claim context. |
| `speech_and_presentation_layer` | Adds high-quality audio artifacts and `speech_sync`; omits audio and records text-only fallback when high-quality speech is unavailable. |
| `token_ledger` | Populates `token_receipt`, pending holds, actual charges, refunds, cap status, and auto-fund state. |
| `terms_policy` | Populates terms-version state, feature blockers, legal-review state, and re-acceptance requirements. |
| `action_broker` | Populates `available_actions` and records confirmation requirements before public, durable, paid, or credentialed actions. |
| `issue_signal_mining` | Consumes `issue_mining_context` for duplicate clustering, signal/noise classification, and owner-routed fix queues. |
| `privacy_and_audit` | Populates `privacy_state` and operator/developer-safe diagnostics without private prompt leakage. |

If a component needs data that does not fit the manifest, the schema should be updated before that data becomes a product behavior. This prevents hidden side channels from becoming source authority, billing authority, privacy policy, or issue-mining authority.

## Manifest Top-Level Fields

| Field | Required | Purpose |
| --- | --- | --- |
| `manifest_id` | yes | Stable per-answer id for receipts, issue drafts, logs, and support review. |
| `schema_version` | yes | Version of the manifest contract used by the service. |
| `created_at` | yes | Timestamp for receipts, logs, issue context, and closure-status freshness. |
| `mode` | yes | One of `Ask`, `Explain`, `Compare`, `Visualize`, `Triage Idea`, or `Find Source`. |
| `request_summary` | yes | Short non-sensitive summary of the user request for UI display, receipts, and issue context. |
| `source_context` | yes | Source classes, source routes, source chips, freshness, missing routes, citations, and excluded source classes. |
| `claim_context` | yes | Claim label, unsupported-answer state, open burden route, and System Card route when relevant. |
| `answer_body` | yes | Displayed answer text or fail-closed response. |
| `artifacts` | yes | Generated media artifacts and issue/save/action previews attached to the answer. |
| `speech_sync` | conditional | Required when generated audio exists; forbidden to be empty for spoken output. |
| `provider_execution_context` | yes | Safe provider capability ids, quality gate outcomes, fallback behavior, credential boundary, cost class, and health state. |
| `token_receipt` | yes | Estimated cost, holds, actual charge, refunds, mode, source classes, and artifact count. |
| `privacy_state` | yes | Retention, consent, uploaded-material handling, durable-save status, and deletion route. |
| `terms_acceptance_state` | yes | Terms versions, acceptance scope, feature blockers, and legal-review state for paid, durable, retained, public, generated-media, or credentialed features. |
| `available_actions` | yes | UI actions allowed from this answer, each with confirmation requirements. |
| `issue_mining_context` | conditional | Required when issue draft, issue handoff, bug report, idea triage, or user feedback is present. |
| `diagnostics` | optional | Operator/developer-safe diagnostic summary without private prompt leakage. |

## Source Context

`source_context` records where the answer came from and what it deliberately did not use. It must be populated by the retrieval context boundary defined in [source-ingestion-retrieval-context-contract.md](source-ingestion-retrieval-context-contract.md) before the answer engine assigns claim labels or writes answer text.

Required fields:

| Field | Purpose |
| --- | --- |
| `source_classes_used` | List of source classes used, such as `published_corpus`, `generated_reading_copy`, `scene_route`, `app_guide`, `archie_reference`, `priority_material`, or `external_prior_physics`. |
| `primary_source_routes` | Ordered source links or route ids the UI can show beside the answer. |
| `supporting_source_routes` | Additional sources used for detail, comparison, or navigation. |
| `excluded_source_classes` | Source classes not used because they were disabled, unsafe, unavailable, or out of scope. |
| `source_policy` | Visibility and source-class policy used for this request. |
| `source_freshness` | Repository version, content snapshot id, or retrieval timestamp needed to explain answer freshness. |
| `system_card_route` | Required for closure-status, caveat, proof-burden, validation, launch-status, or unsupported-answer questions. |
| `missing_source_routes` | Requested routes or source classes that could not be resolved. |
| `source_chip_payloads` | UI-ready source chips with source class, route, section, authority status, claim-label floor, and freshness summary when needed. |

The answer engine must not treat model memory, chat history, generated images, app visuals, or priority prose as proof. If the manifest uses priority material, `source_context` must make that development status visible.

## Claim Context

`claim_context` records the strongest supported answer status.

Required fields:

| Field | Purpose |
| --- | --- |
| `claim_label` | One of the approved v1 labels: `published corpus`, `derivation target`, `priority-only`, `app diagnostic`, `external comparison`, `AAA-native stance`, or `unsupported`. |
| `claim_reason` | Short reason the label was chosen. |
| `unsupported_reason` | Required when the requested claim exceeds available sources. |
| `nearest_supported_route` | Closest source or open burden when the direct answer is unsupported. |
| `open_burden_route` | Proof, source, validation, or implementation burden the answer routes to when relevant. |
| `proof_status_warning` | Required when user wording asks for proof, closure, validation, launch readiness, or endorsement. |

Generated media artifacts inherit this context. They cannot carry a stronger claim label than the answer body.

## Answer Body

`answer_body` is the canonical displayed text.

Required fields:

| Field | Purpose |
| --- | --- |
| `display_text` | The user-visible answer text. |
| `verbatim_segments` | Stable text segments used for synchronized speech, copy/export, and citations. |
| `summary_text` | Optional short summary for receipts, issue drafts, or saved notes. |
| `reading_path` | Optional route list for continuing into corpus or app guide material. |
| `followup_prompt` | Optional follow-up prompt; must start with `Closure goal:` when intended for another agent thread. |

When audio is generated, `display_text` and `verbatim_segments` are the speech source. A spoken artifact may not silently replace this text with an unmarked summary, simplification, or alternate explanation.

## Artifact Records

`artifacts` is a list of answer-attached outputs.

Visual artifacts must follow [visual-artifact-contract.md](visual-artifact-contract.md). The manifest records the artifact payload; the visual artifact layer owns purpose labels, source-basis captions, alt text, retention state, human-review state, rights checks, and proof-status guardrails.

Allowed v1 artifact types:

| Type | Required fields |
| --- | --- |
| `text` | `artifact_id`, `title`, `source_context`, `claim_context`, `display_text`. |
| `audio` | `artifact_id`, `quality_level`, `audio_uri`, `duration_ms`, `speech_sync_id`, `retention_state`, `source_context`, `claim_context`. |
| `image` | `artifact_id`, `purpose_label`, `image_uri`, `caption`, `alt_text`, `retention_state`, `source_context`, `claim_context`. |
| `diagram` | `artifact_id`, `diagram_kind`, `diagram_source`, `caption`, `alt_text`, `source_context`, `claim_context`. |
| `generated_image_prompt` | `artifact_id`, prompt text, `purpose_label`, draft status, `caption`, `alt_text`, `source_context`, `claim_context`. |
| `app_mockup` | `artifact_id`, mockup source or image URI, `purpose_label`, `caption`, `alt_text`, `retention_state`, `source_context`, `claim_context`. |
| `publication_asset_draft` | `artifact_id`, draft URI or prompt, `purpose_label`, `caption`, `alt_text`, `human_review_required`, `retention_state`, `source_context`, `claim_context`. |
| `narration_script` | `artifact_id`, `script_text`, `captions`, `source_context`, `claim_context`. |
| `comparison_script` | `artifact_id`, `script_text`, local claim, external comparison, recovery target, open burden, captions, `source_context`, `claim_context`. |
| `animation_storyboard` | `artifact_id`, `scene_beats`, `captions`, `source_context`, `claim_context`. |
| `caption_track` | `artifact_id`, caption payload, segment ids, `source_context`, `claim_context`. |
| `transcript` | `artifact_id`, transcript text, segment ids, `source_context`, `claim_context`. |
| `issue_draft` | `artifact_id`, `title`, `body`, `labels`, `public_visibility_warning`, `issue_mining_context`. |
| `saved_note_draft` | `artifact_id`, `note_text`, `retention_state`, `delete_available`, `export_available`, `share_state`, `evidence_status`. |

Every artifact must carry or inherit source context and claim context. Mixed-media answers must share one source/claim boundary unless a particular artifact is explicitly weaker.

## Speech Synchronization

`speech_sync` is required for generated audio.

The field must follow [service-native-speech-presentation-contract.md](service-native-speech-presentation-contract.md). The manifest records the synchronized speech payload; the speech/presentation layer owns high-quality-only generation, text-only fallback, timed displayed text, captions/transcripts, voice-identity guardrails, accessibility behavior, and presentation artifact boundaries.

Required fields:

| Field | Purpose |
| --- | --- |
| `speech_sync_id` | Stable id referenced by audio artifacts. |
| `quality_policy` | Must be `high_quality_only` in v1. |
| `fallback_policy` | Must be `text_only_if_high_quality_unavailable` in v1. |
| `voice_identity_policy` | Must record no real-person imitation, no endorsement framing, and no proof-authority framing. |
| `source_text_segments` | Segment ids from `answer_body.verbatim_segments`. |
| `timed_segments` | Text segment id, start time, end time, and displayed text for synchronized highlighting. |
| `caption_track` | Caption or transcript payload shown with the answer. |
| `playback_controls` | Basic controls available to the user; v1 requires play/pause and may defer voice/speed controls. |
| `audio_retention_state` | Must be ephemeral by default in the MVP. |

The service may not return an audio artifact without synchronized displayed verbatim text. If high-quality speech cannot be produced, the manifest should omit the `audio` artifact, record text-only fallback, and avoid charging speech-generation tokens.

## Provider Execution Context

`provider_execution_context` records safe model/provider capability state.

The field must follow [model-provider-capability-registry-contract.md](model-provider-capability-registry-contract.md). The manifest records product capability ids, quality gates, fallback behavior, token cost class, health state, and credential boundary; the provider registry owns provider adapters, model references, credential boundaries, provider data-use policy, and capability health.

Required fields:

| Field | Purpose |
| --- | --- |
| `capability_ids_used` | Product capability ids used, such as answer text, high-quality speech, generated image, caption/transcript, or moderation. |
| `capability_types_requested` | Capability families requested or attempted. |
| `capability_health_state` | `healthy`, `degraded`, `unavailable`, `policy_blocked`, or `unknown` per relevant capability. |
| `quality_gate_result` | Passed, failed, unavailable, or downgraded quality gate result. |
| `fallback_behavior` | Text-only fallback, reduced-scope answer, unavailable action, retry, or fail-closed behavior used. |
| `credential_boundary` | Approved server, serverless, edge, managed gateway, or internal boundary. |
| `cost_class` | Product cost class mapped to token work units. |
| `provider_privacy_terms_state` | Whether provider data-use, privacy, and terms gates were satisfied. |
| `safe_error_classes` | Redacted provider error classes useful for support or observability. |

Provider execution context must never expose provider secrets, raw provider payloads, private prompt text, provider-specific billing internals, or provider output as citation authority.

## Token Receipt

`token_receipt` keeps the user from needing to think about tokens on every action while still making costs auditable.

The field must follow [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md). The manifest records the receipt; the token ledger owns estimates, holds, charges, refunds, cap status, auto-fund state, and no-private-prompt receipt behavior.

Required fields:

| Field | Purpose |
| --- | --- |
| `receipt_id` | Stable receipt id for support, issue context, and billing review. |
| `estimate_shown` | Whether an estimate was shown before work ran. |
| `estimated_tokens` | Estimated debit when shown or available. |
| `hold_tokens` | Pending hold placed while work ran. |
| `actual_tokens_charged` | Final charged amount. |
| `refunded_hold_tokens` | Hold returned to the user. |
| `mode` | Mode that consumed tokens. |
| `work_units` | Breakdown such as source navigation, retrieval, answer generation, diagram, high-quality speech, image, issue draft. |
| `source_classes_used` | Source classes involved in the charged work. |
| `artifact_count` | Number and type of artifacts produced. |
| `cap_status` | Whether the request stayed inside monthly limit, per-request cap, and auto-fund cap. |
| `auto_fund_event` | Whether auto-fund was triggered. |
| `privacy_summary` | Safe statement of retained, ephemeral, redacted, or public material. |
| `private_prompt_expanded` | Must be `false` for receipt views. |

Token spend must not change claim labels, source authority, unsupported-answer behavior, or media-standard enforcement.

## Issue Mining Context

`issue_mining_context` makes user-confirmed GitHub issues and feedback useful later.

The field must follow [issue-mining-signal-contract.md](issue-mining-signal-contract.md). The manifest records the safe metadata available at issue-draft or feedback time; the issue-mining loop owns clustering, signal scoring, noise classification, owner lanes, fix queues, report shape, and privacy-safe evidence handling.

Required when issue drafting, issue submission, app feedback, idea triage, or source-confusion feedback is present:

| Field | Purpose |
| --- | --- |
| `origin_mode` | Archie mode that produced the issue or feedback. |
| `origin_surface` | Page, app, scene, document, sphere, or route where the issue started. |
| `source_routes` | Source routes attached to the answer or issue draft. |
| `claim_label` | Claim label visible when the issue was drafted. |
| `user_category` | User-selected bug, idea, source confusion, app issue, proof burden, accessibility issue, or other category. |
| `suggested_labels` | Labels for GitHub or later triage. |
| `duplicate_keys` | Candidate duplicate signals such as route, app id, source id, error class, or topic id. |
| `privacy_inclusion` | What user material is included, excluded, redacted, or consented for public issue text. |
| `token_receipt_id` | Optional receipt id when useful for cost or support review. |
| `recommended_owner` | App, corpus, service platform, source-authority policy, proof/corpus priority work, or operations. |
| `smallest_next_artifact` | Definition, equation, simulation target, source packet, app mockup, validation fixture, or issue. |

The issue-mining loop should be able to cluster duplicates, identify recurring signal, classify noise, and route fix queues from these fields without reading private prompt text.

## Privacy State

`privacy_state` records what is stored, what is ephemeral, and what needs consent.

The field must follow [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md). The manifest records retention and consent state; the privacy/audit boundary owns redaction, deletion routes, durable-save consent, public issue warnings, and no-private-prompt diagnostics.

Saved-note drafts, durable notebook entries, account history, submitted issue links, exports, deletes, and sharing must also follow [saved-notebook-account-history-contract.md](saved-notebook-account-history-contract.md).

Required fields:

| Field | Purpose |
| --- | --- |
| `prompt_retention` | Whether prompt text is retained, summarized, redacted, or ephemeral. |
| `answer_retention` | Whether answer text is retained, summarized, redacted, or ephemeral. |
| `media_retention` | Retention state for audio, image, diagram, storyboard, and future media artifacts. |
| `uploaded_material_state` | Consent and retention state for user-provided images, documents, app screenshots, or notes. |
| `issue_visibility_warning` | Required before public GitHub issue handoff. |
| `durable_save_consent` | Whether the user opted into saved notes or account history. |
| `delete_available` | Whether the user can delete stored material. |
| `export_available` | Whether saved user material can be exported. |
| `account_history_state` | Whether account history is disabled, session-local, or durable opt-in. |
| `public_material_included` | Whether user material appears in public issue text or shared artifacts. |
| `private_prompt_expanded_in_receipt` | Must be `false`. |
| `diagnostic_redaction` | Whether diagnostics are safe for operator/developer review. |

V1 should default to minimal retention: billing and abuse-control counters may persist, generated speech audio is ephemeral, durable saved notes are opt-in, and user media retention is disabled unless a later policy enables it.

Private saved notes and account history are not source evidence. If a notebook item exists, its evidence status must remain `not_project_evidence` unless a separate public/project review path promotes the material.

## Terms Acceptance State

`terms_acceptance_state` records which service terms, notices, and account policies govern the response.

The field must follow [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md). The manifest records safe terms-version state and feature blockers; the terms-policy boundary owns service terms, token/subscription terms, privacy notices, generated-media terms, GitHub handoff notices, saved-notebook terms, support routes, abuse controls, re-acceptance rules, and legal-review state.

Required fields:

| Field | Purpose |
| --- | --- |
| `terms_version` | Version of the service terms accepted or required. |
| `privacy_notice_version` | Version of the privacy/retention notice accepted or required. |
| `token_terms_version` | Version of token/subscription terms accepted or required. |
| `media_terms_version` | Version of generated-media terms accepted or required. |
| `github_handoff_notice_version` | Version accepted or required before GitHub issue handoff. |
| `notebook_terms_version` | Version accepted or required before durable notebook or account-history actions. |
| `acceptance_scope` | Anonymous session, account, billing, notebook, GitHub handoff, or operator/developer scope. |
| `reacceptance_required` | Whether changed terms block a feature until user action. |
| `feature_blockers` | Terms-dependent features currently unavailable. |
| `legal_review_state` | `draft`, `counsel_required`, `approved_for_beta`, or `approved_for_public`. |

Paid, durable, retained, public, generated-media, and credentialed features should fail closed when required terms state is missing, stale, or below the required legal-review state.

## Available Actions

`available_actions` is the action rail contract.

The field must follow [action-broker-confirmation-contract.md](action-broker-confirmation-contract.md). The manifest records the proposed actions and action results; the action broker owns preflight state, confirmation text, side-effect guards, external handoff, and result updates.

Actions with paid, durable, retained, public, generated-media, or credentialed effects must also consult `terms_acceptance_state`.

Each action record should include:

| Field | Purpose |
| --- | --- |
| `action_id` | Stable id for the action. |
| `action_type` | `open_source`, `make_diagram`, `listen`, `submit_issue`, `save_note`, `continue_reading`, or later approved action. |
| `enabled` | Whether the action is available. |
| `preflight_status` | `ready`, `estimate_required`, `confirmation_required`, `blocked`, or `unavailable`. |
| `requires_confirmation` | Whether explicit confirmation is required. |
| `confirmation_reason` | Public visibility, durable save, token spend, auto-fund, privacy, or retention effect. |
| `confirmation_text` | Human-readable disclosure shown before confirmation. |
| `destination` | Source route, GitHub URL, saved-note store, billing action, or later approved destination. |
| `estimated_token_effect` | Token estimate or reason no estimate is needed. |
| `privacy_effect` | What data would be stored, shared, attached, or made public. |
| `credential_boundary` | Whether user login, GitHub, payment provider, or backend credential is involved. |
| `resulting_artifact_type` | Artifact produced if the user confirms. |
| `result_status` | `not_run`, `confirmed`, `completed`, `cancelled`, `failed_closed`, or `external_pending`. |

No durable, public, paid, or credentialed action should run without the confirmation state recorded in the manifest.

## Minimal JSON Shape

The eventual API response should be stricter than this sketch, but the contract should preserve this structure:

```json
{
  "manifest_id": "ans_...",
  "schema_version": "answer-artifact-manifest.v1",
  "created_at": "2026-07-02T00:00:00Z",
  "mode": "Explain",
  "request_summary": "Explain a selected corpus concept with optional audio.",
  "source_context": {
    "source_classes_used": ["published_corpus"],
    "primary_source_routes": [],
    "supporting_source_routes": [],
    "excluded_source_classes": [],
    "source_policy": "public corpus and route sources enabled",
    "source_freshness": "repo commit or content snapshot id",
    "system_card_route": null,
    "missing_source_routes": [],
    "source_chip_payloads": []
  },
  "claim_context": {
    "claim_label": "published corpus",
    "claim_reason": "Answer is supported by authored corpus material.",
    "unsupported_reason": null,
    "nearest_supported_route": null,
    "open_burden_route": null,
    "proof_status_warning": null
  },
  "answer_body": {
    "display_text": "",
    "verbatim_segments": [],
    "summary_text": "",
    "reading_path": [],
    "followup_prompt": null
  },
  "artifacts": [],
  "speech_sync": null,
  "provider_execution_context": {
    "capability_ids_used": [],
    "capability_types_requested": [],
    "capability_health_state": {},
    "quality_gate_result": "not_required",
    "fallback_behavior": null,
    "credential_boundary": "server_or_gateway_only",
    "cost_class": "free_static",
    "provider_privacy_terms_state": "not_required",
    "safe_error_classes": []
  },
  "token_receipt": {
    "receipt_id": "tok_...",
    "estimate_shown": false,
    "estimated_tokens": null,
    "hold_tokens": 0,
    "actual_tokens_charged": 0,
    "refunded_hold_tokens": 0,
    "mode": "Explain",
    "work_units": [],
    "source_classes_used": ["published_corpus"],
    "artifact_count": 1,
    "cap_status": "inside_limits",
    "auto_fund_event": false,
    "privacy_summary": "No private prompt text expanded in receipt.",
    "private_prompt_expanded": false
  },
  "privacy_state": {
    "prompt_retention": "minimal",
    "answer_retention": "ephemeral_unless_saved",
    "media_retention": "ephemeral",
    "uploaded_material_state": "disabled",
    "issue_visibility_warning": null,
    "durable_save_consent": false,
    "delete_available": false,
    "export_available": false,
    "account_history_state": "disabled",
    "public_material_included": false,
    "private_prompt_expanded_in_receipt": false,
    "diagnostic_redaction": "safe_summary_only"
  },
  "terms_acceptance_state": {
    "terms_version": null,
    "privacy_notice_version": null,
    "token_terms_version": null,
    "media_terms_version": null,
    "github_handoff_notice_version": null,
    "notebook_terms_version": null,
    "acceptance_scope": "anonymous_session",
    "reacceptance_required": false,
    "feature_blockers": [],
    "legal_review_state": "draft"
  },
  "available_actions": [],
  "issue_mining_context": null,
  "diagnostics": null
}
```

## Validation Fixtures

The future service implementation should add manifest-level fixtures for:

1. text-only published-corpus answer with source route and token receipt;
2. unsupported answer with nearest supported route and System Card route;
3. retrieval context with source chips, source freshness, missing-route reporting, and no model-memory source authority;
4. high-quality speech answer with synchronized displayed verbatim text and ephemeral audio;
5. high-quality speech unavailable case with text-only fallback and no low-quality audio artifact;
6. generated image answer with purpose label, caption, alt text, source route, and inherited claim label;
7. mixed text/audio/image answer with one shared source/claim boundary;
8. issue draft with public visibility warning, source context, issue-mining metadata, and confirmation requirement;
9. confirmed action result with destination, privacy effect, token effect, and result status recorded;
10. unconfirmed public issue submission with no GitHub handoff;
11. token cap exceeded case with no generated media and an insufficient-token state;
12. saved-note draft with opt-in retention, delete, export, share, and `not_project_evidence` state;
13. terms missing case where a paid, durable, public, generated-media, or credentialed action is blocked through `terms_acceptance_state`;
14. provider capability unavailable case with declared fallback and no browser-side provider secrets;
15. priority-only answer with development-status label preserved across every artifact.

## Implementation Handoff

Closure goal:
Turn the Answer Artifact Manifest into typed service contracts, response schemas, validator order, endpoint contracts, and validation fixtures that keep answers, generated media, speech synchronization, token receipts, privacy state, available actions, and issue-mining metadata aligned.

Use this packet, [manifest-service-contracts.md](manifest-service-contracts.md), [source-ingestion-retrieval-context-contract.md](source-ingestion-retrieval-context-contract.md), [answer-engine-source-contract.md](answer-engine-source-contract.md), [model-provider-capability-registry-contract.md](model-provider-capability-registry-contract.md), [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md), [issue-mining-signal-contract.md](issue-mining-signal-contract.md), [action-broker-confirmation-contract.md](action-broker-confirmation-contract.md), [saved-notebook-account-history-contract.md](saved-notebook-account-history-contract.md), [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md), [service-native-speech-presentation-contract.md](service-native-speech-presentation-contract.md), and [visual-artifact-contract.md](visual-artifact-contract.md) as the source of truth.

Task:
- Encode the typed schema for the manifest.
- Populate `source_context` from source-ingestion and retrieval records before answer generation.
- Map each v1 product requirement to manifest fields and service-boundary outputs.
- Define provider-execution context, capability ids, quality gates, fallback, credential boundary, cost class, privacy/terms state, and safe error rendering obligations.
- Define UI rendering obligations for source chips, claim labels, action rail, confirmation text, action results, audio synchronization, captions, token receipts, privacy notices, and issue previews.
- Define saved-note draft, notebook/account-history, delete, export, share, issue-link retention, and not-project-evidence rendering obligations.
- Define terms-version, acceptance-state, reacceptance, feature-blocker, and legal-review rendering obligations for paid, durable, retained, public, generated-media, and credentialed actions.
- Define API validation fixtures for each manifest and service-contract fixture.
- Keep runtime AI generation, credentials, deployment config, and public launch changes out of scope unless explicitly requested.

Constraints:
- Preserve TeX exactly.
- Keep priority-only material visibly priority-only.
- Do not let generated media, voice quality, token spend, or presentation style change source authority.
- Do not create browser-side model calls.
