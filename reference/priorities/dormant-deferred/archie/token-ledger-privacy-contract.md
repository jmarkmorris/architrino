# Token Ledger And Privacy Contract

## Workstream Metadata

- Kind: `priority-contract`
- Status: `draft`
- Claim level: `priority-only`
- Parent priority: [Archie](priorities.md)
- Answer artifact manifest: [answer-artifact-manifest.md](answer-artifact-manifest.md)
- Manifest-driven service architecture: [manifest-driven-service-architecture.md](manifest-driven-service-architecture.md)
- Manifest service contracts: [manifest-service-contracts.md](manifest-service-contracts.md)
- Source ingestion and retrieval context contract: [source-ingestion-retrieval-context-contract.md](source-ingestion-retrieval-context-contract.md)
- Answer engine source contract: [answer-engine-source-contract.md](answer-engine-source-contract.md)
- Model/provider capability registry contract: [model-provider-capability-registry-contract.md](model-provider-capability-registry-contract.md)
- Issue mining signal contract: [issue-mining-signal-contract.md](issue-mining-signal-contract.md)
- Observability, public status, and incident contract: [observability-public-status-incident-contract.md](observability-public-status-incident-contract.md)
- Action broker confirmation contract: [action-broker-confirmation-contract.md](action-broker-confirmation-contract.md)
- Saved notebook and account history contract: [saved-notebook-account-history-contract.md](saved-notebook-account-history-contract.md)
- Service terms and account policy contract: [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md)
- AI communication standards: [ai-communication-standards.md](ai-communication-standards.md)
- V1 product requirements: [v1-product-requirements.md](v1-product-requirements.md)
- Service platform owner: [Archie Service Platform](service-platform.md)

## Purpose

This packet defines the token ledger and privacy-retention contract for the future Archie question service.

The Answer Artifact Manifest already carries `token_receipt` and `privacy_state`. This contract defines how those fields are produced, when the user must be interrupted, what can be charged, what must remain ephemeral, and how receipts, saved artifacts, generated media, notebook/account-history entries, issue handoffs, support summaries, and observability events avoid leaking private prompt text.

It is not runtime payment code. It is the policy and data-contract target for future wallet state, subscription grants, spending-limit enforcement, token holds, receipts, privacy notices, retention state, deletion routes, service terms, and regression fixtures.

## Core Invariant

The service should make resource use auditable without making users think about tokens on every ordinary action.

The token ledger may meter heterogeneous backend work, but it cannot change source authority, claim labels, unsupported-answer behavior, privacy state, media-standard enforcement, or action-confirmation requirements. Privacy decisions must be known before work that would retain, publish, attach, or share user material. Final token charges must happen after validation, not before artifact and privacy checks.

## User-Facing Receipt And Privacy Language

Token and privacy rendering must follow [ai-communication-standards.md](ai-communication-standards.md).

The user-facing copy should say:

1. the user's spending limit applies;
2. the receipt shows estimate, hold, charge, refund, cap state, and whether auto-fund would run;
3. normal work runs inside configured limits without constant token prompts;
4. the interface interrupts before cap exceedance, auto-fund, durable retention, public issue text, user-material inclusion, or credentialed action;
5. the receipt does not expose private prompt text;
6. privacy state says what is private, retained, deleted, public, saved, redacted, or ephemeral.

Terms such as `token_receipt`, work unit, provider cost class, cap status, fixture, or validator should remain in schemas, diagnostics, support, and implementation packets. They should not be required for the user to understand cost or privacy behavior.

## Contract Sequence

Every token-bearing or privacy-relevant request should follow this order:

1. normalize the request and account/session state;
2. classify the requested work units;
3. run privacy preflight for uploaded material, public issue text, durable saves, speech, images, and logs;
4. verify required service terms, token/subscription terms, privacy notices, generated-media terms, GitHub handoff notices, notebook terms, and re-acceptance state;
5. estimate token cost when the request exceeds configured limits, triggers auto-fund, or uses unusual work;
6. require confirmation for auto-fund, cap exceedance, durable retention, public visibility, user-material inclusion, or credentialed actions;
7. place a pending hold only for approved token-bearing work;
8. run answer generation and artifact work inside the approved cap;
9. validate source authority, media standard, speech sync, issue-mining metadata, terms state, and privacy state;
10. charge only validated completed work or explicitly policy-covered attempted provider work;
11. refund unused holds;
12. write `token_receipt`, `terms_acceptance_state`, and `privacy_state` into the manifest;
13. expose a receipt that does not expand private prompt text.

If a later validator refuses an artifact, the ledger should either omit the charge or charge only an explicitly disclosed attempted-provider unit. The MVP default should be no charge for omitted low-quality speech, refused unsafe media, unconfirmed issue submission, or unavailable high-quality speech.

## Token Ledger Inputs

The token ledger receives narrow accounting inputs.

| Input | Purpose |
| --- | --- |
| `account_plan` | Public, supporter, research, collaborator, or operator/developer account class. |
| `token_balance` | Available balance before the request. |
| `monthly_grant` | Subscription or account grant for the current period. |
| `monthly_spending_limit` | User-set spending ceiling. |
| `per_request_cap` | User-set or account-default maximum debit for one request. |
| `auto_fund_policy` | Whether auto-fund is enabled and its cap. |
| `work_plan` | Estimated work units from request gateway and artifact orchestrator. |
| `provider_cost_projection` | Internal cost projection mapped through [model-provider-capability-registry-contract.md](model-provider-capability-registry-contract.md) into user-visible tokens. |
| `provider_execution_context` | Safe capability ids, cost classes, health state, fallback state, and provider privacy/terms state. |
| `privacy_preflight` | Whether the work changes retention, publication, or user-material handling. |
| `terms_acceptance_state` | Whether required service terms, token/subscription terms, privacy notices, media terms, notebook terms, or GitHub notices are current for requested work. |
| `completed_work_units` | Validated work units after source, media, speech, and privacy checks. |

The ledger should not receive raw private prompt text unless a support or abuse policy explicitly requires it. Receipts should use `request_summary`, source classes, provider capability ids, work units, artifact counts, and safe ids.

Source classes and source routes in receipts should come from the validated `source_context` produced under [source-ingestion-retrieval-context-contract.md](source-ingestion-retrieval-context-contract.md), not from token-ledger reconstruction.

## Work Unit Policy

V1 work units should start with this accounting policy.

| Work unit | Default prompt behavior | Charge rule |
| --- | --- | --- |
| `source_navigation` | No prompt. | Free or near-free when served from public static routes. |
| `retrieval` | No prompt inside normal caps. | Charge only when backend retrieval exceeds free allowance. |
| `answer_generation` | No prompt inside normal caps. | Charge after answer passes manifest validation. |
| `comparison` | Prompt only for broad or external-source work that exceeds caps. | Charge after local/external source separation is validated. |
| `diagram` | Prompt only above cap or for expensive rendering. | Charge after compliant diagram artifact exists. |
| `image` | Prompt for generated images unless account policy allows silent low-cost image work. | Charge after media-standard validation and privacy state pass. |
| `image_prompt` | No prompt inside normal caps unless publication use is requested. | Charge after the prompt is marked as a draft artifact with source and claim context. |
| `app_mockup` | Prompt only above cap or when durable save/public use is requested. | Charge after mockup validation and privacy state pass. |
| `publication_asset_draft` | Prompt before meaningful work. | Charge only after human-review-required state, caption, alt text, and retention state are recorded. |
| `high_quality_speech` | Prompt only above cap or auto-fund threshold. | Charge only for high-quality synchronized audio; no low-quality fallback charge. |
| `caption_transcript` | No prompt inside normal speech/presentation caps. | Charge only when caption/transcript work is separate from the speech work unit. |
| `narration_script` | Prompt only above cap. | Charge after source/claim-preserving script validation. |
| `comparison_script` | Prompt only above cap or broad comparison threshold. | Charge after local/external source separation is validated. |
| `animation_storyboard` | Prompt only above cap. | Charge after storyboard/caption/source validation. |
| `issue_draft` | No prompt inside normal caps. | Charge for draft preparation, not for user submission handoff. |
| `action_handoff` | Confirm public, durable, paid, or credentialed action. | Free or near-free except abuse controls. |
| `saved_note` | Confirm durable save. | Charge only when durable storage policy exists. |

Payment can buy more tokens, higher caps, and more retained history. It cannot buy stronger claims, proof status, unsafe media, hidden public actions, or exemption from unsupported-answer behavior.

Saved-note drafts, durable notebook entries, account history, export, deletion, sharing, and submitted issue-link retention must follow [saved-notebook-account-history-contract.md](saved-notebook-account-history-contract.md). The token ledger prices storage and export work; it does not decide whether private notes are evidence.

Token subscriptions, paid top-ups, auto-fund, refunds, cancellation, failed payments, support routes, abuse controls, terms acceptance, and terms-version receipt references must follow [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md). The token ledger cannot run paid work when required token/subscription terms are missing, stale, or require re-acceptance.

## Spending Controls

The user should configure guardrails rather than approve every debit.

Required controls:

1. available balance;
2. monthly grant;
3. monthly spending limit;
4. per-request cap;
5. optional auto-fund with explicit cap;
6. pending holds;
7. insufficient-token state;
8. receipt history;
9. refund visibility.

The service should interrupt only when:

1. estimated work exceeds the per-request cap;
2. estimated work exceeds monthly spending limit;
3. auto-fund would trigger;
4. balance is insufficient;
5. work changes retention, deletion, public visibility, or user-material inclusion;
6. required service terms, token/subscription terms, privacy notices, generated-media terms, GitHub handoff notices, or notebook terms are missing or stale;
7. work uses an unusually expensive or deferred capability;
8. policy requires confirmation for abuse, safety, or credentialed action.

## Token Receipt Shape

`token_receipt` should be the user-facing accounting artifact.

Required fields:

| Field | Requirement |
| --- | --- |
| `receipt_id` | Stable safe id for support and billing review. |
| `estimate_shown` | Whether the user saw an estimate before work ran. |
| `estimated_tokens` | Estimate shown or recorded. |
| `hold_tokens` | Pending hold placed before approved work. |
| `actual_tokens_charged` | Final charge after validation. |
| `refunded_hold_tokens` | Returned hold amount. |
| `cap_status` | `inside_limits`, `estimate_required`, `cap_exceeded`, `auto_fund_pending`, `insufficient_tokens`, or `privacy_confirmation_required`. |
| `auto_fund_event` | Whether auto-fund was triggered. |
| `work_units` | User-understandable work units charged or skipped. |
| `source_classes_used` | Source classes used by the answer. |
| `artifact_count` | Number and type summary of generated artifacts. |
| `privacy_summary` | Safe statement of retained, ephemeral, redacted, or public material. |
| `private_prompt_expanded` | Must be `false` for receipt views. |
| `terms_version_refs` | Safe terms-version ids governing paid, retained, public, generated-media, notebook, or GitHub handoff behavior. |
| `provider_capability_refs` | Safe product capability ids and cost classes used for provider-backed work. |

Receipts should be useful for support and user trust without becoming a shadow prompt log.

## Privacy Retention Defaults

V1 should default to minimal retention.

| Data class | V1 default |
| --- | --- |
| prompt text | Minimal, redacted, or ephemeral unless account history is enabled. |
| request summary | Safe summary may persist for receipts, issue context, abuse controls, and support. |
| answer text | Ephemeral unless saved by user or retained under account history policy. |
| generated speech audio | Ephemeral; no durable MVP retention path. |
| speech transcript/verbatim text | Same as answer text; displayed text is the authority. |
| generated images/diagrams | Ephemeral unless user saves under explicit policy. |
| narration scripts/storyboards | Ephemeral unless user saves under explicit policy. |
| uploaded images/documents/screenshots | Disabled in V1 unless a later policy enables retention and deletion. |
| issue drafts | Ephemeral until user confirms public handoff or saved note policy applies. |
| submitted issue links | Retain only with user consent or account policy. |
| token transaction records | Minimal durable records allowed for billing, abuse controls, refunds, and support. |
| diagnostics and observability | Safe summaries, ids, and classes only; no private prompt leakage. |

Any durable user content needs a deletion route before public beta.

Durable notebook and account-history features also need export behavior and `not_project_evidence` state before launch.

## Privacy State Shape

`privacy_state` should tell the user and validators what happened to data.

Required fields:

| Field | Requirement |
| --- | --- |
| `prompt_retention` | `ephemeral`, `minimal`, `redacted`, `session_local`, or `durable_opt_in`. |
| `answer_retention` | `ephemeral`, `ephemeral_unless_saved`, `session_local`, or `durable_opt_in`. |
| `media_retention` | Per-artifact state for audio, images, diagrams, storyboards, and future media. |
| `uploaded_material_state` | `disabled`, `ephemeral`, `redacted`, or explicit consent state. |
| `issue_visibility_warning` | Public issue warning when issue draft or handoff exists. |
| `durable_save_consent` | Whether user opted into durable storage. |
| `delete_available` | Whether stored material can be deleted. |
| `export_available` | Whether saved user material can be exported. |
| `account_history_state` | Whether account history is disabled, session-local, or durable opt-in. |
| `public_material_included` | Whether user material appears in public issue text or shared artifacts. |
| `private_prompt_expanded_in_receipt` | Must be `false`. |
| `diagnostic_redaction` | Whether diagnostics are safe for operator/developer review. |

If the service cannot state retention behavior, the request should not advance or return a text-only response with no durable action.

## Confirmation Matrix

Confirmation behavior should follow [action-broker-confirmation-contract.md](action-broker-confirmation-contract.md). The token ledger owns estimates, holds, charges, refunds, and receipt state; the action broker owns confirmation text, destination, credential boundary, and side-effect gating.

The action broker should require confirmation for:

| Trigger | Required confirmation text |
| --- | --- |
| auto-fund | Amount, cap, payment effect, and refund behavior. |
| cap exceedance | Estimated debit, user cap, and reduced-scope option. |
| durable save | Stored fields, retention period, deletion route, and storage-cost effect. |
| public issue submission | GitHub login, public visibility, included material, and destination. |
| user material inclusion | Exact material included, destination, and whether it is public. |
| credentialed action | Destination service, user account boundary, and action result. |
| privacy policy change | What retention/publication behavior changed. |

Confirmation should happen before the service spends meaningful extra tokens, retains material, opens GitHub, stores a note, triggers auto-fund, or includes private user material in public text.

Terms acceptance should be checked before confirmation can authorize paid, durable, retained, public, generated-media, or credentialed work.

## Issue Handoff Privacy

Issue drafts and issue-mining metadata should be useful without carrying private prompt text.

Downstream clustering, reporting, and fix queues should follow [issue-mining-signal-contract.md](issue-mining-signal-contract.md).

Allowed by default:

1. origin mode;
2. source routes;
3. claim label;
4. user-selected category;
5. duplicate keys;
6. recommended owner lane;
7. smallest next artifact;
8. safe request summary;
9. receipt id when useful for support.

Requires explicit consent:

1. private user text;
2. uploaded sketch or screenshot;
3. personal identifying information;
4. account-specific history;
5. any material the user expects to remain private.

The public issue body should show what will be public before GitHub handoff.

## Verification Required for Advancement

The token/privacy contract should not advance when:

1. estimated work exceeds cap and the user has not approved;
2. auto-fund would trigger and the user has not approved;
3. balance is insufficient;
4. provider capability has no token cost mapping;
5. retention policy is missing for a requested durable save;
6. deletion route is missing for stored user content;
7. public issue text would include private material without consent;
8. high-quality speech is unavailable;
9. media validation fails after a hold is placed;
10. required terms are missing, stale, or require re-acceptance;
11. receipt would need to expose private prompt text to be understandable;
12. token metrics, support summaries, public status, or incident records would expose private prompt text or account history.

Responses with a Not advanced disposition should return a manifest-shaped refusal or fallback with `actual_tokens_charged` set to zero unless a narrow attempted-provider charge policy was shown before work.

## Regression Fixtures

The current schema-only service scaffold includes [token-receipt.v1.json](../../../../tests/archie-service/fixtures/token-ledger/token-receipt.v1.json), [token-ledger-sandbox.v1.json](../../../../tests/archie-service/fixtures/token-ledger/token-ledger-sandbox.v1.json), and [validate-token-ledger-sandbox.mjs](../../../../scripts/archie-service/validate-token-ledger-sandbox.mjs). These fixtures cover provider-gateway accounting for normal answer holds/charges/refunds, high-quality speech charges, terms-blocked generated media, provider-cost-map blocks, auto-fund-pending blocks, cap-exceeded blocks, safe provider capability refs, safe terms refs, payment-disabled state, and no private prompt expansion.

The future implementation should include token/privacy fixtures for:

| Fixture | Required proof |
| --- | --- |
| `ledger-free-source-001` | Source navigation returns receipt with zero or near-zero charge and no prompt expansion. |
| `ledger-normal-answer-001` | Ask answer runs inside limits and returns estimate/hold/charge/refund fields. |
| `ledger-cap-exceeded-001` | Expensive work stops before execution and offers reduced scope or confirmation. |
| `ledger-auto-fund-001` | Auto-fund requires explicit cap-aware confirmation before work runs. |
| `ledger-refund-001` | Hold exceeds actual charge and refunded hold is visible. |
| `ledger-terms-missing-negative-001` | Paid token work is blocked when token/subscription terms are missing or stale. |
| `ledger-terms-receipt-001` | Receipt includes safe terms-version refs without private prompt expansion. |
| `ledger-provider-cost-map-negative-001` | Provider-backed work is blocked when product token cost mapping is missing. |
| `ledger-speech-fallback-001` | High-quality speech unavailable produces text-only fallback and no speech charge. |
| `privacy-ephemeral-audio-001` | Generated audio artifact is ephemeral and paired with speech sync. |
| `privacy-durable-save-001` | Saved note requires retention, deletion route, export route, consent, and storage-cost policy. |
| `privacy-notebook-evidence-negative-001` | Private saved note/account history cannot be treated as source evidence. |
| `privacy-issue-public-001` | Issue draft shows public GitHub warning and included material before handoff. |
| `privacy-private-material-001` | Private user material is excluded from issue text without explicit consent. |
| `receipt-no-private-prompt-001` | Receipt view does not expand private prompt text. |
| `diagnostics-redacted-001` | Operator/developer diagnostics omit private prompt and private media contents. |
| `ledger-observability-redacted-001` | Token metrics, support summaries, and incident records use receipt ids, work units, and charge/refund classes without private prompt text. |

## Implementation Handoff

Closure goal: Connect token receipt ids, privacy summaries, and confirmation states into observability/public-status metadata without exposing private prompt text, creating durable account history, or filing GitHub issues through hidden credentials.

Use this packet, [answer-artifact-manifest.md](answer-artifact-manifest.md), [ai-communication-standards.md](ai-communication-standards.md), [manifest-service-contracts.md](manifest-service-contracts.md), [model-provider-capability-registry-contract.md](model-provider-capability-registry-contract.md), [observability-public-status-incident-contract.md](observability-public-status-incident-contract.md), [action-broker-confirmation-contract.md](action-broker-confirmation-contract.md), [saved-notebook-account-history-contract.md](saved-notebook-account-history-contract.md), [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md), and [v1-product-requirements.md](v1-product-requirements.md) as the source of truth.

Task:
- Define observability metadata that references token receipt ids, privacy summaries, confirmation reasons, public visibility classes, destination classes, and external handoff result classes without copying private prompt text.
- Define public-status and incident checks for paid-work blocks, durable save exclusion, user-material exclusion, cancelled handoff, and prefilled GitHub URL external-pending behavior.
- Preserve receipt privacy: observability metadata may use receipt ids and safe work-unit classes, but not provider payloads, provider billing internals, private prompt text, account history, or private saved notes.
- Keep hidden GitHub writes, durable notebooks, account history, payment integrations, provider calls, deployment config, public routes, and production secrets disabled.

Constraints:
- Do not charge for omitted low-quality speech fallback.
- Do not retain generated audio durably in the MVP.
- Do not expose private prompt text in receipts, issue-mining metadata, observability, support summaries, incident records, or diagnostics.
- Do not let token spend alter source authority, claim labels, media-standard validation, or unsupported-answer behavior.
- Do not add runtime payments, credentials, deployment config, or public launch behavior unless explicitly requested.
