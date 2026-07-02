# Manifest-Driven Service Architecture

## Workstream Metadata

- Kind: `priority-architecture`
- Status: `draft`
- Claim level: `priority-only`
- Parent priority: [Archie Interface App](app-archie-interface.md)
- Answer artifact manifest: [answer-artifact-manifest.md](answer-artifact-manifest.md)
- Manifest service contracts: [manifest-service-contracts.md](manifest-service-contracts.md)
- Answer engine source contract: [answer-engine-source-contract.md](answer-engine-source-contract.md)
- Token ledger and privacy contract: [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md)
- Issue mining signal contract: [issue-mining-signal-contract.md](issue-mining-signal-contract.md)
- Service-native speech and presentation contract: [service-native-speech-presentation-contract.md](service-native-speech-presentation-contract.md)
- V1 product requirements: [v1-product-requirements.md](v1-product-requirements.md)
- Service platform owner: [Archie Service Platform](../archie/service-platform.md)

## Purpose

This packet turns the [Answer Artifact Manifest](answer-artifact-manifest.md) into the first service-architecture map for the future Archie question service.

The goal is to make each service boundary answer one question: which manifest fields does this component read, write, validate, or refuse to touch? That keeps answer generation, generated media, speech synchronization, token receipts, issue handoff, privacy, and issue mining from drifting into parallel response formats.

This is not a deployment decision and not runtime code. It is the architecture target that the later deployment packet should implement.

## Core Flow

The service should process a user request as a manifest-building pipeline:

1. `request_gateway` receives the user request, account/session state, spending limits, and enabled modes.
2. `mode_router` chooses the mode and creates the initial manifest with `manifest_id`, `schema_version`, `created_at`, `mode`, and `request_summary`.
3. `retrieval_context` resolves corpus, scene, app guide, generated reading copy, priority, and curated external prior-physics routes, then writes `source_context`.
4. `answer_engine` follows [answer-engine-source-contract.md](answer-engine-source-contract.md), then writes `claim_context`, `answer_body`, unsupported-answer routing, reading paths, and follow-up prompts.
5. `artifact_orchestrator` decides which optional artifacts are requested or useful, then delegates to media-specific services.
6. `speech_service` may add high-quality audio and `speech_sync`, or record text-only fallback when high-quality speech is unavailable.
7. `visual_artifact_service` may add image or diagram artifacts with purpose labels, captions, alt text, source context, and claim context.
8. `issue_draft_service` may add issue drafts and `issue_mining_context` after idea triage or feedback requests.
9. `token_ledger` finalizes `token_receipt`, including estimate, hold, actual charge, refund, source classes, work units, and cap status.
10. `privacy_and_audit` finalizes `privacy_state` and operator/developer-safe diagnostics.
11. `action_broker` finalizes `available_actions` and confirmation requirements.
12. `manifest_validator` rejects or downgrades any response that violates source authority, generated-media policy, speech-sync requirements, token rules, privacy state, or action-confirmation rules.
13. `conversation_surface` renders the validated manifest.

No component should emit user-visible answer content outside the manifest.

## Component Boundaries

| Component | Reads | Writes | Must not do |
| --- | --- | --- | --- |
| `request_gateway` | user request, session/account limits, enabled modes | request envelope for `mode_router` | generate answer text or artifacts |
| `mode_router` | request envelope | `mode`, `request_summary`, initial `available_actions` | assign proof status |
| `retrieval_context` | mode, request summary, source policy | `source_context` | treat model memory as a source |
| `answer_engine` | `source_context`, mode, request summary | `claim_context`, `answer_body` | generate media or charge tokens directly |
| `artifact_orchestrator` | manifest, requested actions, token limits | artifact work plan | bypass corporate media standard |
| `speech_service` | `answer_body.verbatim_segments`, claim/source context, token limits | `audio` artifact, `speech_sync`, text-only fallback state | return low-quality audio or unsynchronized audio |
| `visual_artifact_service` | answer body, source/claim context, media standard | image/diagram artifacts | imply proof status through visuals |
| `issue_draft_service` | answer body, source/claim context, user category | `issue_draft`, `issue_mining_context` | open GitHub without confirmation |
| `token_ledger` | work plan, provider costs, user caps | `token_receipt` | alter source or claim labels |
| `privacy_and_audit` | manifest, retention policy, consent state | `privacy_state`, safe diagnostics | retain private prompt or media beyond policy |
| `action_broker` | manifest, available capabilities, confirmation rules | final `available_actions` | perform durable, public, paid, or credentialed action without confirmation |
| `manifest_validator` | complete manifest | pass/fail result and downgrade/refusal reasons | silently repair proof status without recording the reason |
| `conversation_surface` | validated manifest | rendered UI | invent fields outside the manifest |

## Manifest Validators

The service architecture should include explicit validators before rendering:

| Validator | Required checks |
| --- | --- |
| `source_authority_validator` | Source classes are allowed; priority material is visibly priority-only; model memory is not source evidence. |
| `claim_context_validator` | Claim label matches source support; unsupported answers route to nearest source or burden. |
| `media_standard_validator` | Every generated artifact satisfies the Generated Media Corporate Standard. |
| `speech_sync_validator` | Audio is high-quality only, synchronized with displayed verbatim text, and ephemeral by default. |
| `token_receipt_validator` | Estimate/hold/charge/refund/cap/auto-fund fields are present and internally consistent. |
| `privacy_state_validator` | Retention, consent, delete state, and public issue visibility are explicit. |
| `action_confirmation_validator` | Durable, public, paid, retained, or credentialed actions require confirmation. |
| `issue_mining_validator` | Issue drafts and feedback include enough metadata for duplicate clustering, signal/noise classification, and owner routing. |

Validation should fail closed. If a requested artifact cannot satisfy its validator, the manifest should omit or downgrade that artifact and record a compliant alternative.

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

## API Surface Sketch

The later implementation can map this architecture to endpoints such as:

| Endpoint | Responsibility |
| --- | --- |
| `POST /answers` | Build and validate a manifest for text-first answers and requested artifacts. |
| `POST /answers/{manifest_id}/actions/listen` | Add high-quality speech or text-only fallback to an existing manifest. |
| `POST /answers/{manifest_id}/actions/visualize` | Add diagram or image artifacts when allowed. |
| `POST /answers/{manifest_id}/actions/issue-draft` | Add issue draft and issue-mining metadata. |
| `POST /answers/{manifest_id}/actions/confirm` | Execute a confirmed public, durable, paid, or credentialed action. |
| `GET /answers/{manifest_id}/receipt` | Return token receipt and privacy state without private prompt expansion. |

Endpoint names are illustrative. The required invariant is that each endpoint returns a validated manifest or a fail-closed error state.

## Open Architecture Questions

1. Should manifest validation run as a shared library, a backend service, or both?
2. Should media artifact generation update an existing manifest incrementally or rebuild a fresh manifest from the original request and source context?
3. Which fields are safe to expose in browser state, and which should remain server-side only?
4. How should manifests reference repository commits, generated reading-copy snapshots, scene routes, and app guides?
5. What is the retention period for manifests that only contain text, billing counters, and no saved note?
6. How should issue-mining metadata survive if the user opens but does not submit a GitHub issue?

## Implementation Handoff

Closure goal:
Turn the manifest-driven service architecture into concrete typed service-boundary, validator, endpoint, and contract-fixture implementation for the Archie question service.

Use this packet, [answer-artifact-manifest.md](answer-artifact-manifest.md), [manifest-service-contracts.md](manifest-service-contracts.md), [answer-engine-source-contract.md](answer-engine-source-contract.md), [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md), [issue-mining-signal-contract.md](issue-mining-signal-contract.md), and [service-native-speech-presentation-contract.md](service-native-speech-presentation-contract.md) as the source of truth.

Task:
- Define service components, input/output types, validator responsibilities, and fail-closed behavior.
- Map every V1 answer mode and artifact type to manifest fields.
- Define endpoint contracts that always return a validated manifest or a refusal/error manifest.
- Keep deployment provider choice, credentials, runtime AI calls, and public launch out of scope unless explicitly requested.
