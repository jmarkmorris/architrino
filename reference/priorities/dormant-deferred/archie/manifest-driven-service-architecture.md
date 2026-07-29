# Manifest-Driven Service Architecture

## Workstream Metadata

- Kind: `priority-architecture`
- Status: `draft`
- Claim level: `priority-only`
- Parent priority: [Archie](priorities.md)
- Answer artifact manifest: [answer-artifact-manifest.md](answer-artifact-manifest.md)
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
- AI communication standards: [ai-communication-standards.md](ai-communication-standards.md)
- V1 product requirements: [v1-product-requirements.md](v1-product-requirements.md)
- Service platform owner: [Archie Service Platform](service-platform.md)
- Service deployment option decision: [service-deployment-option-decision.md](service-deployment-option-decision.md)
- Service deployment architecture: [service-deployment-architecture.md](service-deployment-architecture.md)
- Service scaffolding and fixtures: [service-scaffolding-and-fixtures.md](service-scaffolding-and-fixtures.md)

## Purpose

This packet turns the [Answer Artifact Manifest](answer-artifact-manifest.md) into the first service-architecture map for the future Archie question service.

The goal is to make each service boundary answer one question: which manifest fields does this component read, write, validate, or refuse to touch? That keeps answer generation, generated media, speech synchronization, token receipts, issue handoff, privacy, and issue mining from drifting into parallel response formats.

This is not runtime code. Deployment ownership stays with [service-deployment-option-decision.md](service-deployment-option-decision.md), [service-deployment-architecture.md](service-deployment-architecture.md), and [Archie Service Platform](service-platform.md); this packet defines the service components and manifest boundaries that the chosen deployment shape must host.

## Core Flow

The service should process a user request as a manifest-building pipeline:

1. `request_gateway` receives the user request, account/session state, spending limits, terms state, provider capability state, and enabled modes.
2. `mode_router` chooses the mode and creates the initial manifest with `manifest_id`, `schema_version`, `created_at`, `mode`, and `request_summary`.
3. `provider_registry` follows [model-provider-capability-registry-contract.md](model-provider-capability-registry-contract.md), resolves enabled product capabilities, quality gates, fallback behavior, cost classes, credential boundaries, and health state, then writes `provider_execution_context`.
4. `retrieval_context` follows [source-ingestion-retrieval-context-contract.md](source-ingestion-retrieval-context-contract.md), resolves corpus, scene, app guide, generated reading copy, Archie reference, priority, and curated external prior-physics routes, then writes `source_context`.
5. `answer_engine` follows [answer-engine-source-contract.md](answer-engine-source-contract.md), then writes `claim_context`, `answer_body`, unsupported-answer routing, reading paths, and follow-up prompts.
6. `artifact_orchestrator` decides which optional artifacts are requested or useful, then delegates to media-specific services.
7. `speech_service` may add high-quality audio and `speech_sync`, or record text-only fallback when high-quality speech is unavailable.
8. `visual_artifact_service` may add image or diagram artifacts with purpose labels, captions, alt text, source context, and claim context.
9. `issue_draft_service` may add issue drafts and `issue_mining_context` after idea triage or feedback requests.
10. `notebook_service` may add saved-note drafts, durable-save unavailable state, account-history state, deletion/export state, and not-project-evidence labels under [saved-notebook-account-history-contract.md](saved-notebook-account-history-contract.md).
11. `terms_policy` writes `terms_acceptance_state`, feature blockers, re-acceptance requirements, and legal-review state under [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md).
12. `token_ledger` finalizes `token_receipt`, including estimate, hold, actual charge, refund, source classes, work units, and cap status.
13. `privacy_and_audit` finalizes `privacy_state` and operator/developer-safe diagnostics.
14. `observability_status` follows [observability-public-status-incident-contract.md](observability-public-status-incident-contract.md), records safe event classes, updates metrics, public-status state, incident/change-history candidates, and redaction state.
15. `action_broker` follows [action-broker-confirmation-contract.md](action-broker-confirmation-contract.md), finalizes `available_actions`, confirmation requirements, side-effect preflights, and action results.
16. `manifest_validator` rejects or downgrades any response that violates source authority, provider capability policy, generated-media policy, speech-sync requirements, token rules, privacy state, notebook/history rules, terms-policy rules, observability redaction, or action-confirmation rules.
17. `conversation_surface` renders the validated manifest through [ai-communication-standards.md](ai-communication-standards.md), explaining user-visible behavior before internal service terms appear.

No component should emit user-visible answer content outside the manifest.

## Component Boundaries

| Component | Reads | Writes | Must not do |
| --- | --- | --- | --- |
| `request_gateway` | user request, session/account limits, enabled modes | request envelope for `mode_router` | generate answer text or artifacts |
| `mode_router` | request envelope | `mode`, `request_summary`, initial `available_actions` | assign proof status |
| `provider_registry` | requested mode/artifacts, account/session capability state, provider health, terms/privacy policy | `provider_execution_context`, capability availability, fallback state, cost class, credential boundary | expose provider secrets or treat provider output as source evidence |
| `retrieval_context` | mode, request summary, source policy, source indexes | `source_context` with source records, source chips, freshness, missing routes, and exclusions | treat model memory as a source or promote route authority |
| `answer_engine` | `source_context`, mode, request summary | `claim_context`, `answer_body` | generate media or charge tokens directly |
| `artifact_orchestrator` | manifest, requested actions, token limits | artifact work plan | bypass corporate media standard |
| `speech_service` | `answer_body.verbatim_segments`, claim/source context, token limits | `audio` artifact, `speech_sync`, text-only fallback state | return low-quality audio or unsynchronized audio |
| `visual_artifact_service` | answer body, source/claim context, media standard | image/diagram/mockup/prompt artifacts | imply proof status through visuals |
| `issue_draft_service` | answer body, source/claim context, user category | `issue_draft`, `issue_mining_context` | open GitHub without confirmation |
| `notebook_service` | manifest, save request, consent state, retention policy | `saved_note_draft`, notebook state, account-history state, delete/export state | treat saved notes or account history as source evidence |
| `terms_policy` | manifest, account/session terms state, requested features, legal-review state | `terms_acceptance_state`, feature blockers, re-acceptance requirements | let terms acceptance alter claim labels or proof status |
| `token_ledger` | work plan, provider costs, user caps | `token_receipt` | alter source or claim labels |
| `privacy_and_audit` | manifest, retention policy, consent state | `privacy_state`, safe diagnostics | retain private prompt or media beyond policy |
| `observability_status` | manifest, validator dispositions, provider health, source misses, token receipt, privacy redaction state, issue metadata, incident policy | safe event classes, aggregate metrics, public-status state, incident/change-history candidates, support-summary redaction state | expose private prompts, provider secrets, raw logs, account history, or treat metrics as proof |
| `action_broker` | manifest, available capabilities, confirmation rules, consent state, token state | final `available_actions`, confirmation text, action result state | perform durable, public, paid, retained, or credentialed action without confirmation |
| `manifest_validator` | complete manifest | pass/fail result and downgrade/refusal reasons | silently repair proof status without recording the reason |
| `conversation_surface` | validated manifest | rendered UI with plain labels, accessible status, receipts, and confirmation text | invent fields outside the manifest or make users read implementation terms to understand what happened |

## User-Facing Communication Boundary

All service boundaries may use internal terms, but the rendered response must follow [ai-communication-standards.md](ai-communication-standards.md):

1. show AI identity, source basis, claim label, generated-media status, cost, privacy, public-action state, service status, and accessibility state in normal language;
2. keep `provider_registry`, `provider_execution_context`, `speech_sync`, `token_receipt`, `issue_mining_context`, `observability_context`, `terms_acceptance_state`, validators, fixtures, C2PA, NIST AI RMF, ISO/IEC 42001, and similar terms behind schemas, diagnostics, support, legal review, or implementation packets;
3. present C2PA or Content Credentials as a record of origin when supported, not as proof of the scientific claim;
4. state text-only fallback plainly when high-quality speech, generated media, provider capability, spending, privacy, accessibility, or public-action requirements fail;
5. keep status, incident, support, receipt, and issue-mining records free of private prompt expansion, provider secrets, raw provider payloads, private user media, account history, and private saved notes.

This boundary is architectural, not a new fixture family. Executable coverage should be added only when the accepted service implementation target needs it.

## Manifest Validators

The service architecture should include explicit validators before rendering:

| Validator | Required checks |
| --- | --- |
| `source_authority_validator` | Source classes are allowed; priority material is visibly priority-only; model memory is not source evidence. |
| `provider_capability_validator` | Requested provider-backed capabilities have registry entries, quality gates, fallback behavior, cost mapping, credential boundary, privacy/terms state, and health state. |
| `claim_context_validator` | Claim label matches source support; unsupported answers route to nearest source or burden. |
| `media_standard_validator` | Every generated artifact satisfies the Generated Media Corporate Standard. |
| `speech_sync_validator` | Audio is high-quality only, synchronized with displayed verbatim text, and ephemeral by default. |
| `token_receipt_validator` | Estimate/hold/charge/refund/cap/auto-fund fields are present and internally consistent. |
| `privacy_state_validator` | Retention, consent, delete state, and public issue visibility are explicit. |
| `terms_policy_validator` | Required service terms, token terms, privacy notices, generated-media terms, GitHub handoff notices, notebook terms, re-acceptance state, and legal-review state are current for requested features. |
| `observability_redaction_validator` | Logs, metrics, public status, support summaries, issue-mining handoff, and incident records use safe ids/classes and omit private prompt text, provider secrets, raw payloads, account history, and private saved notes. |
| `action_confirmation_validator` | Durable, public, paid, retained, or credentialed actions require confirmation. |
| `issue_mining_validator` | Issue drafts and feedback include enough metadata for duplicate clustering, signal/noise classification, and owner routing. |
| `notebook_history_validator` | Saved notes, account history, deletion/export state, sharing state, storage cost, and not-project-evidence labels are explicit. |

Validation should not advance. If a requested artifact cannot satisfy its validator, the manifest should omit or downgrade that artifact and record a compliant alternative.

## Provider Capability Architecture

The provider path should follow [model-provider-capability-registry-contract.md](model-provider-capability-registry-contract.md):

1. `request_gateway` receives only product-level requested capabilities from the UI.
2. `provider_registry` resolves capability entries, enabled state, health state, quality gate, fallback behavior, credential boundary, token cost class, privacy/terms state, and observability fields.
3. `provider_registry` writes safe `provider_execution_context` to the manifest.
4. answer, speech, visual, moderation, embedding, transcription, and future input services call only approved provider gateways.
5. `token_ledger` consumes product work units and cost classes rather than provider-specific billing units.
6. `manifest_validator` blocks capabilities with missing registry entries, missing cost maps, missing privacy/provider data-use terms, missing fallback behavior, failed quality gates, or browser-side credential exposure.

Provider failures should return declared fallback behavior: text-only speech fallback, reduced-scope answers, unavailable actions, diagram specs instead of generated images, or manifest-shaped refusals. They should not expose provider secrets, charge hidden work, retain hidden data, or promote provider output into source evidence.

## Observability And Status Architecture

The observability path should follow [observability-public-status-incident-contract.md](observability-public-status-incident-contract.md):

1. service boundaries emit safe event classes, not private prompt text;
2. `observability_status` records request, source, claim, provider, artifact, speech, token, privacy, terms, action, issue, manifest, support, and incident event classes;
3. public status exposes product-level availability, feature degradation, active incidents, and recent changes without provider secrets, account identifiers, private prompts, raw provider errors, or private saved-note state;
4. internal diagnostics use safe ids, route ids, provider capability ids, validator dispositions, fallback classes, receipt ids, terms-version ids, and redaction state;
5. issue-mining handoff uses public issue links and safe duplicate keys, not private prompt text;
6. incidents record severity, affected surfaces, affected capability ids, user impact, privacy impact class, billing impact class, source-authority impact, mitigation, and follow-up artifact;
7. metrics, issue volume, provider success, incidents, and public status history remain operational signals and cannot strengthen source authority or claim labels.

Unsafe diagnostics should not advance by omitting the field, aggregating it, marking `needs_public_reproduction`, or blocking public/support disclosure.

## Source Context Architecture

The retrieval path should be built around [source-ingestion-retrieval-context-contract.md](source-ingestion-retrieval-context-contract.md):

1. ingestion jobs produce source records for authored corpus, generated reading copies, scene routes, app guides, Archie references, priority material, and curated external comparison sources;
2. generated reading copies and scene routes record canonical parents when they mirror authored corpus;
3. `retrieval_context` applies the request mode, source policy, visibility rules, and snapshot freshness before returning route candidates;
4. source chips include class, route, section, authority status, claim-label floor, and freshness summary when needed;
5. missing, stale, disabled, or policy-excluded routes are recorded in `excluded_source_classes`, `missing_source_routes`, and redacted retrieval diagnostics;
6. the answer engine receives this validated `source_context` and may assign claim labels, but it does not reconstruct source authority from scratch.

Retrieval failure should be rendered as useful product behavior: nearest route, System Card route, source-index candidate, issue-draft metadata, or unsupported response.

## Speech Sync Architecture

The speech path should be built around `answer_body.verbatim_segments` and follow [service-native-speech-presentation-contract.md](service-native-speech-presentation-contract.md):

1. The answer engine creates stable segment ids for the displayed answer text.
2. The speech service receives only the approved verbatim segments and source/claim context.
3. The speech service generates high-quality audio or returns `text_only_if_high_quality_unavailable`.
4. The speech service returns timed segment metadata for synchronized display.
5. The manifest validator rejects audio without timed displayed text.
6. The conversation surface renders audio playback and text highlighting from `speech_sync`.

Voice selection, speed controls, character personas, real-person imitation, and authority-implying voice identity are outside V1. Narration scripts, comparison scripts, and animation storyboards are presentation artifacts that inherit source and claim context; they cannot replace the answer engine's source or claim decision.

## Token Receipt Architecture

The token ledger should treat the manifest as the unit of accounting and follow [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md):

1. `request_gateway` and `artifact_orchestrator` estimate likely work units.
2. The UI interrupts only when the request exceeds configured limits, triggers auto-fund, or changes privacy/retention behavior.
3. `token_ledger` places holds for token-bearing work.
4. Each component reports completed work units without editing claim labels or source authority.
5. `token_ledger` finalizes actual charge and refund.
6. The manifest carries the post-run receipt.

The user should be able to inspect a receipt without reading internal logs, thinking about provider-specific billing units, or exposing private prompt text.

## Service Terms Architecture

The terms path should follow [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md):

1. `request_gateway` reads safe account/session terms acceptance state.
2. `terms_policy` maps requested features to required service terms, privacy notices, token/subscription terms, generated-media terms, GitHub handoff notices, notebook terms, support routes, abuse-policy state, and legal-review state.
3. `terms_policy` writes `terms_acceptance_state` with version ids, acceptance scope, feature blockers, re-acceptance requirements, and legal-review state.
4. `token_ledger` uses terms state before paid work, auto-fund, refunds, cancellation, or receipt finalization.
5. `action_broker` uses terms state before public, durable, retained, generated-media, or credentialed actions.
6. `manifest_validator` blocks or downgrades features when required terms are missing, stale, or below required legal-review state.

Terms failures should return reduced-scope answer behavior, unavailable actions, confirmation-required states, or text-only fallback. They should not silently charge, retain, publish, open GitHub, share content, or generate media.

## Privacy Retention Architecture

The privacy/audit boundary should follow [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md):

1. run privacy preflight before work that retains, publishes, attaches, or shares user material;
2. default generated audio and generated media to ephemeral unless a later saved-artifact policy applies;
3. require confirmation before durable save, public issue submission, user-material inclusion, credentialed action, or retention-policy change;
4. write `privacy_state` after artifact validation and before final charge;
5. keep receipts, issue-mining metadata, and diagnostics free of private prompt expansion.

## Issue Mining Architecture

The issue path should produce useful public feedback without leaking private data and should follow [issue-mining-signal-contract.md](issue-mining-signal-contract.md):

1. `Triage Idea` or app feedback creates an `issue_draft` artifact.
2. `issue_draft_service` writes public title/body/labels and a public-visibility warning.
3. `issue_mining_context` records source routes, claim label, origin surface, user category, duplicate keys, privacy inclusion, recommended owner, and smallest next artifact.
4. `action_broker` requires confirmation before opening GitHub.
5. If the user submits, the issue URL or submitted issue id may be retained only according to the privacy policy.
6. The mining pipeline clusters issues from public metadata and representative links instead of private prompt text.

Signal mining should route recurring issues to app runtime, corpus documentation, source-authority policy, service platform, media policy, issue operations, accessibility, operations, or proof/corpus priority work.

## Action Broker Architecture

The action path should follow [action-broker-confirmation-contract.md](action-broker-confirmation-contract.md):

1. service components may propose actions, but they do not execute side effects directly;
2. `action_broker` runs source, privacy, retention, token, public-visibility, and credential preflight;
3. confirmation text names the destination, public visibility, token effect, privacy effect, and credential boundary;
4. public, durable, paid, retained, or credentialed actions run only after confirmation;
5. GitHub issue handoff starts with prefilled URLs in V1 and no public-client credentials;
6. action results return to the manifest as updated `available_actions`, token receipt, privacy state, issue context, or artifact state.

Unconfirmed or unsafe actions should leave the manifest renderable, with a clear unavailable or action state with a Not advanced disposition and no hidden side effect.

## Saved Notebook Architecture

The saved notebook path should follow [saved-notebook-account-history-contract.md](saved-notebook-account-history-contract.md):

1. session-local saved-note drafts may be attached to the manifest without durable storage;
2. durable notebook entries, account history, submitted issue-link retention, export, deletion, and sharing require explicit policy before launch;
3. `notebook_service` records retention, delete, export, share, token-storage, and evidence-status fields;
4. action broker confirmation is required before durable save, share, user-material inclusion, or account-history opt-in;
5. token ledger records storage cost only after notebook validation;
6. private saved notes, account history, generated media, and unsubmitted issue drafts never become source evidence or issue-mining evidence by default.

Notebook failures should return draft-only, unavailable, or confirmation-required action states with no hidden durable retention.

## API Surface Sketch

The later implementation can map this architecture to endpoints such as:

| Endpoint | Responsibility |
| --- | --- |
| `POST /answers` | Build and validate a manifest for text-first answers and requested artifacts. |
| `POST /answers/{manifest_id}/actions/listen` | Add high-quality speech or text-only fallback to an existing manifest. |
| `POST /answers/{manifest_id}/actions/visualize` | Add diagram or image artifacts when allowed. |
| `POST /answers/{manifest_id}/actions/issue-draft` | Add issue draft and issue-mining metadata. |
| `POST /answers/{manifest_id}/actions/save-note` | Add session-local saved-note draft or return durable-save unavailable/confirmation state. |
| `POST /answers/{manifest_id}/actions/confirm` | Execute a confirmed public, durable, paid, or credentialed action. |
| `GET /answers/{manifest_id}/receipt` | Return token receipt and privacy state without private prompt expansion. |
| `GET /provider-capabilities` | Return product-level enabled capabilities, health/fallback status, cost classes, and public-safe quality gates. |
| `GET /service-status` | Return public-safe product status, degraded capabilities, active incidents, and recent changes. |
| `GET /service-terms` | Return public terms, privacy notice, token/subscription terms, media terms, GitHub handoff notice, notebook terms, support route, and version ids. |
| `POST /account/terms/accept` | Record accepted terms versions for a safe account/session scope. |

Endpoint names are illustrative. The required invariant is that each endpoint returns a validated manifest or a error state with a Not advanced disposition.

## Visual Artifact Architecture

The visual path should follow [visual-artifact-contract.md](visual-artifact-contract.md):

1. `visual_artifact_service` receives only validated answer text, source context, claim context, token allowance, and visual request.
2. The service assigns one purpose label before rendering or generation.
3. The service adds source-basis captions and alt text when practical.
4. The service records retention state and human-review state where required.
5. The media validator rejects visuals that imply proof, validation, endorsement, or stronger claim labels.
6. The conversation surface renders the visual with source chips, claim label, purpose label, caption, and any warning.

## Open Architecture Questions

1. Under the selected GitHub Pages public entry plus hosted service backend shape, should manifest validation run as a shared library, a backend service, or both?
2. Should media artifact generation update an existing manifest incrementally or rebuild a fresh manifest from the original request and source context?
3. Which fields are safe to expose in browser state, and which should remain server-side only?
4. Which source-index build process should produce source records for repository commits, generated reading-copy snapshots, scene routes, app guides, and curated external comparison bundles?
5. Which provider capability health states should be user-visible, and which remain operator/developer diagnostics?
6. Which public-status changes require incident records, and which can remain operator/developer diagnostics?
7. What is the retention period for manifests that only contain text, billing counters, and no saved note?
8. What export format and deletion semantics should durable notebook/account-history items use?
9. Which service-term changes require re-acceptance before existing paid, durable, public, retained, generated-media, or credentialed features can continue?
10. How should issue-mining metadata survive if the user opens but does not submit a GitHub issue?

## Implementation Handoff

Closure goal:
Turn the manifest-driven service architecture into concrete typed service-boundary, validator, endpoint, and rendering contracts for the Archie question service while keeping user-facing language plain.

Use this packet, [answer-artifact-manifest.md](answer-artifact-manifest.md), [ai-communication-standards.md](ai-communication-standards.md), [manifest-service-contracts.md](manifest-service-contracts.md), [source-ingestion-retrieval-context-contract.md](source-ingestion-retrieval-context-contract.md), [answer-engine-source-contract.md](answer-engine-source-contract.md), [model-provider-capability-registry-contract.md](model-provider-capability-registry-contract.md), [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md), [issue-mining-signal-contract.md](issue-mining-signal-contract.md), [observability-public-status-incident-contract.md](observability-public-status-incident-contract.md), [action-broker-confirmation-contract.md](action-broker-confirmation-contract.md), [saved-notebook-account-history-contract.md](saved-notebook-account-history-contract.md), [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md), [service-native-speech-presentation-contract.md](service-native-speech-presentation-contract.md), and [visual-artifact-contract.md](visual-artifact-contract.md) as the source of truth.

Use [service-deployment-option-decision.md](service-deployment-option-decision.md), [service-deployment-architecture.md](service-deployment-architecture.md), and [service-scaffolding-and-fixtures.md](service-scaffolding-and-fixtures.md) for the public site, browser client, service API, background job, provider gateway, token ledger, action broker, issue-mining, observability, staging, production, CI/CD, smoke-test, rollback, schema package, and fixture boundary.

Task:
- Define service components, input/output types, validator responsibilities, and behavior for a Not advanced disposition.
- Define model/provider capability registry, provider gateway, quality gate, fallback, credential boundary, cost mapping, privacy/terms, health-state, and observability boundaries before provider-backed features launch.
- Define observability event classes, public status, incident records, change history, support summaries, diagnostics redaction, and safe issue-mining handoff before public beta.
- Define source ingestion, source-index, source-chip, freshness, missing-route, and `source_context` boundaries before answer generation.
- Define action broker preflight, confirmation, side-effect, and action-result boundaries before public, durable, paid, retained, or credentialed actions.
- Define saved-note draft, durable notebook, account-history, delete, export, share, storage-cost, and not-project-evidence boundaries before persistent user memory launches.
- Define service terms, account-policy, terms-version, re-acceptance, feature-blocker, support-route, and legal-review boundaries before paid, durable, public, retained, generated-media, or credentialed features launch.
- Map every V1 answer mode and artifact type to manifest fields.
- Define endpoint contracts that always return a validated manifest or a refusal/error manifest.
- Define rendering obligations that explain answer state, speech fallback, token receipt, issue preview, generated-media labels, service status, and accessibility in normal language before implementation terms appear.
- Keep deployment provider choice, credentials, runtime AI calls, and public launch out of scope unless explicitly requested.
