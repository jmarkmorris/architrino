# Action Broker Confirmation Contract

## Workstream Metadata

- Kind: `priority-contract`
- Status: `draft`
- Claim level: `priority-only`
- Parent priority: [Archie Interface App](priorities.md)
- Answer artifact manifest: [answer-artifact-manifest.md](answer-artifact-manifest.md)
- Manifest-driven service architecture: [manifest-driven-service-architecture.md](manifest-driven-service-architecture.md)
- Manifest service contracts: [manifest-service-contracts.md](manifest-service-contracts.md)
- Source ingestion and retrieval context contract: [source-ingestion-retrieval-context-contract.md](source-ingestion-retrieval-context-contract.md)
- Answer engine source contract: [answer-engine-source-contract.md](answer-engine-source-contract.md)
- Token ledger and privacy contract: [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md)
- Issue mining signal contract: [issue-mining-signal-contract.md](issue-mining-signal-contract.md)
- Observability, public status, and incident contract: [observability-public-status-incident-contract.md](observability-public-status-incident-contract.md)
- Saved notebook and account history contract: [saved-notebook-account-history-contract.md](saved-notebook-account-history-contract.md)
- Service terms and account policy contract: [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md)
- Service-native speech and presentation contract: [service-native-speech-presentation-contract.md](service-native-speech-presentation-contract.md)
- Visual artifact contract: [visual-artifact-contract.md](visual-artifact-contract.md)
- Generated media corporate standard: [corporate-media-standards.md](corporate-media-standards.md)
- V1 product requirements: [v1-product-requirements.md](v1-product-requirements.md)
- Service platform owner: [Archie Service Platform](../archie/service-platform.md)

## Purpose

This packet defines the action broker contract for the future Archie question service.

The Answer Artifact Manifest exposes `available_actions`. This contract defines how those action records are created, when explicit confirmation is required, what the confirmation text must disclose, which side effects are allowed in V1, and how action results return to the manifest without hidden public, durable, paid, retained, or credentialed behavior.

It is not GitHub automation, payment code, saved-note storage, or deployment code. It is the policy and schema target for future action-rail rendering, confirmation dialogs, prefilled GitHub issue handoff, auto-fund confirmation, saved-note gating, user-material inclusion, and regression fixtures.

Paid, durable, retained, public, generated-media, or credentialed actions must also satisfy [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md) before confirmation can authorize them.

## Core Invariant

No durable, public, paid, retained, or credentialed action runs without an explicit manifest-recorded confirmation.

The action broker can open a source, request a diagram, request speech, prepare a draft, open a prefilled GitHub URL, trigger an approved auto-fund event, or save material only when the action record says what will happen. It cannot silently file issues, store private material, spend beyond the user's configured limits, include private uploads in public text, execute credentialed operations, or strengthen source and claim status.

## Action Record Shape

Each `available_actions` entry should include:

| Field | Requirement |
| --- | --- |
| `action_id` | Stable id for rendering, confirmation, receipts, and support. |
| `action_type` | Controlled action type. |
| `enabled` | Whether the user can select the action. |
| `display_label` | Short user-facing label. |
| `preflight_status` | `ready`, `estimate_required`, `confirmation_required`, `blocked`, or `unavailable`. |
| `requires_confirmation` | Whether explicit confirmation is required before side effects. |
| `confirmation_reason` | One or more controlled reasons. |
| `confirmation_text` | Human-readable disclosure shown before confirmation. |
| `destination` | Source route, GitHub URL, saved-note store, billing action, or later approved destination. |
| `estimated_token_effect` | Token estimate or reason no estimate is needed. |
| `privacy_effect` | Data retained, shared, attached, made public, redacted, or excluded. |
| `terms_effect` | Required terms, accepted versions, re-acceptance state, and feature blockers. |
| `public_visibility_effect` | Whether the action can make material public. |
| `credential_boundary` | Whether user login, GitHub, payment provider, or backend credential is involved. |
| `resulting_artifact_type` | Artifact produced or updated if the action succeeds. |
| `result_status` | `not_run`, `confirmed`, `completed`, `cancelled`, `failed_closed`, or `external_pending`. |

The action broker updates action state. Other services may propose actions, but they should not perform side effects directly.

`failed_closed` is a retained V1 wire value. User-facing and operator-facing surfaces must explain the narrower result as `Verification failed`, `Verification incomplete`, or `Not advanced`.

## Controlled Action Types

| Action type | V1 behavior |
| --- | --- |
| `open_source` | Open a public source route or app route. No confirmation unless leaving the service or exposing restricted material. |
| `continue_reading` | Open a reading path from validated `source_context`. No confirmation unless restricted material is involved. |
| `make_diagram` | Request a visual artifact through the visual artifact service. Confirmation only for cap, retention, publication, or private-material changes. |
| `listen` | Request high-quality speech through the speech service. Confirmation only for cap, auto-fund, retention, or privacy changes. |
| `submit_issue` | Open a prefilled GitHub issue URL or later approved brokered submission path after confirmation. |
| `save_note` | Save only when retention, deletion, storage-cost, and privacy policy exist. |
| `auto_fund` | Trigger only within a user-enabled auto-fund policy and disclosed cap. |
| `include_user_material` | Include only specifically named user material in the stated destination. |
| `share_artifact` | Deferred unless public sharing policy exists. |
| `confirm_action` | Internal wrapper for confirmation endpoint behavior; not a standalone user goal. |

V1 should prefer prefilled GitHub issue URLs over authenticated server-side submission. A later authenticated action broker can be added only after credential, audit, and abuse policy exist.

## Confirmation Reasons

Confirmation is required when an action involves:

| Reason | Disclosure requirement |
| --- | --- |
| `public_visibility` | State what will become public and where. |
| `durable_save` | State stored fields, retention period, deletion route, and storage-cost effect. |
| `token_cap` | State estimated debit, request cap, reduced-scope options, and refund behavior. |
| `auto_fund` | State top-up amount, cap, payment effect, and cancellation path. |
| `privacy` | State private or sensitive material affected. |
| `retention` | State whether data becomes ephemeral, session-local, durable, or deleted. |
| `credentialed_action` | State the external account, credential boundary, and action result. |
| `user_media_inclusion` | State exact image, screenshot, document, sketch, or note included and its destination. |
| `external_handoff` | State that GitHub or another destination controls the final submission experience. |
| `terms_acceptance` | State which service terms, token terms, privacy notices, media terms, GitHub notices, or notebook terms must be current. |

If any required disclosure is unavailable, the action must be disabled or return a manifest update with a Not advanced disposition.

## Confirmation Sequence

The action broker should use this sequence:

1. receive proposed action from the manifest, issue draft service, token ledger, visual service, speech service, saved-note surface, or conversation surface;
2. run preflight for source authority, privacy, retention, terms state, token cap, auto-fund, public visibility, and credential boundary;
3. populate or update `available_actions`;
4. show confirmation only when required;
5. record confirmed fields before side effects;
6. perform the side effect or external handoff;
7. update manifest action result, token receipt, privacy state, issue-mining context, or artifact state;
8. do not advance if the side-effect result cannot be verified.

The action broker should not receive raw private prompt text unless policy explicitly requires it. It should work from manifest-safe summaries, source context, artifact ids, consent state, and receipt ids.

Action preflight, confirmation, failure, and result observability must follow [observability-public-status-incident-contract.md](observability-public-status-incident-contract.md). Logs, support summaries, public status, and incident records may include action type, confirmation reason, destination class, token effect class, privacy effect class, and result status; they must not include private prompt text or unconsented user material.

## GitHub Issue Handoff

V1 issue submission should follow the reader-feedback pattern:

1. issue draft service creates title, body, labels, source context, claim label, public warning, and issue-mining context;
2. action broker prepares `submit_issue` with `public_visibility`, `external_handoff`, and possibly `user_media_inclusion` confirmation reasons;
3. user reviews issue preview and GitHub visibility warning;
4. after confirmation, the service opens a prefilled GitHub issue URL;
5. submitted issue id or URL is retained only under the privacy policy;
6. issue mining uses public issue metadata and safe manifest metadata, not private prompt text.

The public client must not embed GitHub credentials. A future authenticated submission path requires explicit credential, audit, abuse-control, and rollback policy.

GitHub handoff terms must follow [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md). If the GitHub handoff notice is missing or stale, `submit_issue` must remain unavailable.

## Auto-Fund And Token Actions

Auto-fund is an action, not an implicit side effect.

Rules:

1. user must enable auto-fund before it can trigger;
2. action record must state amount, cap, and reason;
3. work must remain within the user's configured auto-fund cap;
4. token receipt must record the auto-fund event and final charge/refund;
5. auto-fund cannot override unsupported-answer, media-standard, privacy, or source-authority refusals.

If auto-fund preflight fails, the service should offer reduced scope, wait for renewal, or show insufficient-token state.

Auto-fund terms must be current before auto-fund can trigger. Terms acceptance cannot override token caps, unsupported-answer behavior, media-standard refusals, privacy refusals, or source-authority refusals.

## Saved Notes And Retention Actions

Saved notes and account history must follow [saved-notebook-account-history-contract.md](saved-notebook-account-history-contract.md). Durable saves are deferred until retention, deletion, export, storage-cost, and account-history policy exist.

Before `save_note` can run, the action record must state:

1. what answer text, source routes, artifacts, issue links, prompts, or notes will be stored;
2. whether generated audio, images, diagrams, scripts, or storyboards are included;
3. retention period or account-history rule;
4. deletion route;
5. export/share behavior;
6. token/storage cost.

Absent those fields, `save_note` should remain unavailable or produce a saved-note draft only.

The action broker must not allow `save_note` or `share_artifact` to treat private saved notes, account history, generated media, or submitted issue links as project evidence.

Saved-notebook terms must be current before durable save, account-history opt-in, export, sharing, or submitted issue-link retention can run.

## Verification Required for Advancement

The action broker should not advance when:

1. confirmation is required but missing;
2. confirmation text lacks destination, token effect, privacy effect, or public visibility;
3. user material inclusion is ambiguous;
4. action would exceed token cap or auto-fund cap;
5. action would retain data without retention/deletion policy;
6. action would publish private material without explicit consent;
7. action requires credentials not available under policy;
8. GitHub or external handoff cannot be represented safely;
9. required service terms, token/subscription terms, privacy notices, generated-media terms, GitHub handoff notices, notebook terms, or re-acceptance state are missing;
10. action result cannot be written back into the manifest.

Not advanced action behavior should return the manifest with updated `available_actions`, a user-visible reason, no unsafe side effect, and no hidden token charge.

## Regression Fixtures

The current schema-only service scaffold includes [issue-preflight.v1.json](../../../tests/archie-service/fixtures/actions/issue-preflight.v1.json), [action-broker-sandbox.v1.json](../../../tests/archie-service/fixtures/actions/action-broker-sandbox.v1.json), and [validate-action-broker-sandbox.mjs](../../../scripts/archie-service/validate-action-broker-sandbox.mjs). These fixtures cover confirmation-required `submit_issue` preflight, confirmed prefilled GitHub URL handoff, unconfirmed no-run behavior, cancelled no-run behavior, stale-terms behavior for a Not advanced disposition, credentialed-write behavior for a Not advanced disposition, safe issue-mining draft metadata inheritance, safe token receipt id linkage, no hidden GitHub writes, no browser/server GitHub credentials, no payment side effects, no durable storage, no private prompt expansion, and no source-authority effects.

The future implementation should include action fixtures for:

| Fixture | Required proof |
| --- | --- |
| `action-open-source-001` | Public source route opens without unnecessary confirmation and preserves source context. |
| `action-listen-cap-001` | Listen action requires confirmation when speech exceeds token cap. |
| `action-visualize-privacy-001` | Visual action requiring private material inclusion is blocked until explicit consent. |
| `action-issue-prefill-001` | Submit issue action shows GitHub login/public warning and opens only after confirmation. |
| `action-issue-unconfirmed-negative-001` | Unconfirmed issue submission produces no GitHub handoff. |
| `action-autofund-001` | Auto-fund runs only inside enabled cap and records receipt event. |
| `action-autofund-negative-001` | Disabled or cap-exceeding auto-fund returns reduced-scope/insufficient-token state. |
| `action-terms-negative-001` | Paid, durable, retained, public, generated-media, or credentialed action is unavailable when required terms are missing or stale. |
| `action-save-note-deferred-001` | Save note is unavailable until retention, deletion, and storage-cost policy exist. |
| `action-user-material-negative-001` | Private image, sketch, document, or note is not attached without exact consent. |
| `action-credential-negative-001` | Credentialed action is refused when credential/audit policy is unavailable. |
| `action-result-manifest-001` | Completed action updates manifest action result, token receipt, privacy state, or issue context. |

## Implementation Handoff

Closure goal:
Connect action-broker result classes and confirmation events into observability/public-status sandbox fixtures without exposing private prompt text, provider payloads, account history, credentials, or source-authority effects.

Use this packet, [answer-artifact-manifest.md](answer-artifact-manifest.md), [manifest-service-contracts.md](manifest-service-contracts.md), [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md), [issue-mining-signal-contract.md](issue-mining-signal-contract.md), [observability-public-status-incident-contract.md](observability-public-status-incident-contract.md), [saved-notebook-account-history-contract.md](saved-notebook-account-history-contract.md), [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md), and [v1-product-requirements.md](v1-product-requirements.md) as the source of truth.

Task:
- Add observability fixtures that consume action preflight states, confirmation reasons, destination classes, token receipt ids, issue-mining queue ids, and action result classes.
- Define redacted public-status and incident fields for confirmed external-pending handoff, unconfirmed no-run, cancelled no-run, terms-blocked verification incomplete cases, and credentialed-write cases with a Not advanced disposition.
- Preserve the existing action-broker sandbox as the prerequisite for any future action execution.

Constraints:
- Do not file GitHub issues, charge tokens, trigger auto-fund, save notes, retain media, share artifacts, or include private user material without explicit confirmation.
- Do not embed credentials in public clients.
- Do not let action urgency, payment state, or public issue volume alter source authority or claim labels.
- Do not add runtime action execution, payment code, GitHub credentials, deployment config, or public launch behavior unless explicitly requested.
