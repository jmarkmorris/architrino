# Saved Notebook And Account History Contract

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
- Token ledger and privacy contract: [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md)
- Issue mining signal contract: [issue-mining-signal-contract.md](issue-mining-signal-contract.md)
- Observability, public status, and incident contract: [observability-public-status-incident-contract.md](observability-public-status-incident-contract.md)
- Action broker confirmation contract: [action-broker-confirmation-contract.md](action-broker-confirmation-contract.md)
- Service terms and account policy contract: [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md)
- Service-native speech and presentation contract: [service-native-speech-presentation-contract.md](service-native-speech-presentation-contract.md)
- Visual artifact contract: [visual-artifact-contract.md](visual-artifact-contract.md)
- V1 product requirements: [v1-product-requirements.md](v1-product-requirements.md)
- Service platform owner: [Archie Service Platform](service-platform.md)

## Purpose

This packet defines the saved notebook and account history contract for the future Archie question service.

The service may let a user save an answer, reading path, source route, issue draft, submitted issue link, generated diagram, generated image, narration script, storyboard, or follow-up prompt. This contract defines when that save is allowed, what retention and deletion obligations apply, how export and sharing work, how storage affects tokens, and why private notes never become corpus evidence.

It is not storage code, account code, or a public sharing implementation. It is the policy and schema target for future saved-note drafts, durable notebook entries, account history, deletion routes, export flows, share links, token/storage receipts, and regression fixtures.

## Core Invariant

Saved user material is memory for the user, not evidence for the project.

A saved notebook can help the user resume a reading path, revisit generated media, inspect a token receipt, or track submitted issue links. It cannot promote a private note, prompt, uploaded sketch, generated image, generated audio, model summary, or unsent issue draft into `published_corpus`, `priority_material`, source evidence, proof status, or issue-mining evidence without a separate public confirmation and project review path.

## Supported Notebook Surfaces

V1 may support session-local saved-note drafts. Durable account history is deferred until retention, deletion, export, storage-cost, and account policy exist.

| Surface | V1 status | Contract |
| --- | --- | --- |
| `saved_note_draft` | allowed local draft | Ephemeral or session-local note preview attached to a manifest. |
| `durable_notebook_entry` | deferred | Opt-in stored note with deletion and export route. |
| `account_history_entry` | deferred | Account-level history item for answers, receipts, actions, or submitted issue links. |
| `submitted_issue_link` | conditional | Retained only with consent or account policy after GitHub handoff. |
| `saved_artifact` | deferred | Stored image, diagram, script, storyboard, transcript, or future media with retention state. |
| `shared_notebook_item` | deferred | Public or link-share item requiring separate share policy. |

The MVP should not silently retain prompts, answers, generated audio, generated images, uploaded material, issue drafts, or account history.

## Notebook Item Shape

Saved notebook items should include:

| Field | Requirement |
| --- | --- |
| `notebook_item_id` | Stable id for deletion, export, support, and receipts. |
| `item_type` | `answer`, `source_route`, `reading_path`, `artifact`, `issue_draft`, `submitted_issue_link`, `followup_prompt`, `user_note`, or `token_receipt`. |
| `manifest_id` | Manifest that produced or owns the item. |
| `source_context` | Inherited validated source context or explicit `none` for private user notes. |
| `claim_context` | Inherited claim context or explicit `not_evidence`. |
| `privacy_state` | Retention, consent, public inclusion, and deletion state. |
| `retention_state` | `session_local`, `durable_opt_in`, `redacted`, `deleted`, or `exported`. |
| `delete_available` | Required for durable user content. |
| `export_available` | Whether the user can export the item. |
| `share_state` | `private`, `share_disabled`, `share_pending_confirmation`, or `shared_public`. |
| `token_storage_effect` | Storage cost, free local draft, or no-charge state. |
| `evidence_status` | Must be `not_project_evidence` unless separately promoted through public/project review. |

Notebook entries should avoid expanding private prompt text in receipts, issue-mining metadata, observability events, diagnostics, incidents, or support summaries.

## Save Scope Rules

Allowed session-local saved-note draft content:

1. safe request summary;
2. answer summary or selected answer text;
3. source route and source-chip payloads;
4. reading path;
5. generated diagram or generated-image metadata when retention is ephemeral;
6. narration script, comparison script, or storyboard text;
7. issue draft title/body preview;
8. submitted issue link after user-confirmed GitHub handoff;
9. follow-up prompt;
10. user note text marked private and not evidence.

Durable saved content requires opt-in consent, retention period, deletion route, export route, and storage-cost policy before it can leave session-local state.

Durable saved content also requires current saved-notebook/account-history terms under [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md).

## Account History Rules

Account history is broader than a saved note and should be deferred until policy exists.

Account history may eventually include:

1. manifest ids;
2. safe request summaries;
3. source routes and reading paths;
4. action history;
5. submitted issue links;
6. token receipts;
7. saved notebook item ids;
8. deletion/export events.

Account history must not include full private prompt text, uploaded media, generated audio, generated images, or issue draft text by default. If a user opts into richer history, the service must show exactly what is stored and how to delete or export it.

Account-history terms must be current before any durable account history leaves session-local state.

## Deletion And Export

Deletion is required before durable notebooks or account history can launch.

Deletion requirements:

1. user can delete each durable notebook item;
2. deletion removes or tombstones stored item payloads according to legal and billing constraints;
3. token transaction records may retain minimal billing metadata without private prompt expansion;
4. submitted public GitHub issues cannot be deleted by deleting local account history;
5. deletion status is visible in `privacy_state` and notebook item state.

Export requirements:

1. user can export saved notebook items in a plain portable format;
2. export includes source routes, claim labels, and generated artifact metadata;
3. export states which media are missing because they were ephemeral;
4. export does not include hidden internal diagnostics or unconsented private material;
5. export preserves TeX exactly.

## Sharing Rules

Sharing is a public action and must go through [action-broker-confirmation-contract.md](action-broker-confirmation-contract.md).

Before sharing, the service must disclose:

1. exact item or fields being shared;
2. public or link-accessible destination;
3. included source context and claim label;
4. included generated artifacts;
5. included user notes or uploaded material;
6. retention and revocation behavior;
7. whether the shared item can be indexed or mined.

Sharing private notes, uploaded sketches, issue drafts, generated images, or account history is disabled until sharing policy exists.

Sharing also requires current service terms, generated-media terms when media is included, and saved-notebook terms.

## Token And Storage Behavior

Saved notebooks must follow [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md).

Rules:

1. session-local saved-note drafts are free or near-free;
2. durable notebook storage may consume tokens or plan storage quota only after policy exists;
3. storage cost must be estimated before durable save when it exceeds configured limits;
4. deletion should not charge unless a disclosed storage-provider policy requires it;
5. export may consume tokens only if the export requires meaningful generation or large media packaging;
6. token receipts must not expand private prompt text.

Payment can buy storage quota or longer account history. It cannot buy source authority, proof status, or corpus promotion.

## Issue And Evidence Boundaries

Saved notes can support the user's memory, not project evidence.

Rules:

1. private saved notes are excluded from issue mining;
2. unsubmitted issue drafts are excluded unless retention and consent allow use;
3. submitted public issue links may be mined as public issue metadata;
4. a saved note can suggest a future issue draft, but filing still requires action-broker confirmation;
5. a private note cannot become a priority packet or corpus edit without a separate project-authoring review path;
6. generated images, diagrams, and storyboards remain explanatory artifacts, not proof witnesses.

## Verification Required for Advancement

The notebook service should not advance when:

1. durable save is requested before retention policy exists;
2. deletion route is missing;
3. export route is missing for durable user content;
4. storage-cost policy is missing;
5. saved-notebook/account-history terms are missing, stale, or require re-acceptance;
6. user asks to save or share private material without consent;
7. user asks to treat a private note as corpus evidence;
8. generated media retention state is unresolved;
9. submitted issue link retention is unresolved;
10. account history would store full prompt text without explicit opt-in.

Behavior for a Not advanced disposition should return a saved-note draft, text-only summary, unavailable action, or confirmation-required state with no hidden durable storage.

## Regression Fixtures

The future implementation should include notebook fixtures for:

| Fixture | Required proof |
| --- | --- |
| `notebook-session-draft-001` | Session-local saved-note draft records source routes, claim label, privacy state, and no durable retention. |
| `notebook-durable-save-negative-001` | Durable save is unavailable when retention, deletion, export, or storage-cost policy is missing. |
| `notebook-terms-negative-001` | Durable notebook or account-history action is unavailable when saved-notebook terms are missing or stale. |
| `notebook-delete-001` | Durable item deletion updates item state and privacy state. |
| `notebook-export-001` | Export includes source routes, claim labels, TeX-preserved text, and ephemeral-media omissions. |
| `notebook-share-negative-001` | Sharing is blocked without action-broker confirmation and share policy. |
| `notebook-private-note-evidence-negative-001` | Private user note cannot become corpus evidence or proof status. |
| `notebook-generated-media-retention-001` | Generated audio/images remain ephemeral unless saved under explicit policy. |
| `notebook-issue-link-001` | Submitted issue link is retained only with consent or account policy. |
| `notebook-token-storage-001` | Durable storage cost is estimated, charged, or refused through token ledger rules. |
| `notebook-no-private-prompt-receipt-001` | Notebook receipts and diagnostics do not expand private prompt text. |

## Implementation Handoff

Closure goal:
Turn the Saved Notebook And Account History Contract into saved-note schemas, retention/deletion/export validators, action-broker save/share gates, token storage rules, and regression fixtures for the Archie service.

Use this packet, [answer-artifact-manifest.md](answer-artifact-manifest.md), [manifest-service-contracts.md](manifest-service-contracts.md), [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md), [observability-public-status-incident-contract.md](observability-public-status-incident-contract.md), [action-broker-confirmation-contract.md](action-broker-confirmation-contract.md), [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md), and [v1-product-requirements.md](v1-product-requirements.md) as the source of truth.

Task:
- Encode saved-note draft, durable notebook entry, account history entry, submitted issue link, saved artifact, export, delete, and share schemas.
- Define retention, deletion, export, storage-cost, and privacy validators.
- Define saved-notebook/account-history terms validators and re-acceptance behavior.
- Define observability redaction for saved-note, account-history, export, deletion, sharing, and support-summary events.
- Add action-broker gates for save, share, public issue-link retention, and user-material inclusion.
- Add token/storage rules for durable notebook and account-history features.
- Add fixtures for session drafts, durable-save refusal, missing terms, deletion, export, share refusal, private-note evidence refusal, generated-media retention, issue-link retention, token storage, and no-private-prompt receipts.

Constraints:
- Do not retain prompts, answers, generated media, issue drafts, uploaded material, or account history without explicit policy and consent.
- Do not treat private saved notes, generated artifacts, or account history as corpus evidence.
- Preserve TeX exactly in saved and exported text.
- Do not add storage code, account implementation, payment code, credentials, deployment config, or public launch behavior unless explicitly requested.
