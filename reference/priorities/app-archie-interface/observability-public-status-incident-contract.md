# Observability Public Status And Incident Contract

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
- Model/provider capability registry contract: [model-provider-capability-registry-contract.md](model-provider-capability-registry-contract.md)
- Token ledger and privacy contract: [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md)
- Issue mining signal contract: [issue-mining-signal-contract.md](issue-mining-signal-contract.md)
- Action broker confirmation contract: [action-broker-confirmation-contract.md](action-broker-confirmation-contract.md)
- Saved notebook and account history contract: [saved-notebook-account-history-contract.md](saved-notebook-account-history-contract.md)
- Service terms and account policy contract: [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md)
- Service-native speech and presentation contract: [service-native-speech-presentation-contract.md](service-native-speech-presentation-contract.md)
- Visual artifact contract: [visual-artifact-contract.md](visual-artifact-contract.md)
- V1 product requirements: [v1-product-requirements.md](v1-product-requirements.md)
- Service platform owner: [Archie Service Platform](../archie/service-platform.md)

## Purpose

This packet defines the observability, public-status, incident, and change-history contract for the future Archie question service.

The service needs enough telemetry to keep source routing, answer quality, provider health, token accounting, generated media, issue handoff, saved notes, terms gates, and public beta operations honest. It also needs strict privacy boundaries so logs, metrics, receipts, support summaries, issue-mining reports, and public status pages do not become private prompt stores.

This packet is not runtime logging code, a monitoring vendor selection, a status-page implementation, or a launch approval. It is the product and platform contract that future logs, metrics, dashboards, public status surfaces, incident records, support summaries, and regression fixtures must satisfy.

## Core Invariant

Observe service behavior, not private user content.

Observability may record safe ids, counts, latencies, source classes, provider capability ids, token work units, validator dispositions, error classes, fallback classes, and public issue links. It must not expand private prompt text, private uploaded material, provider secrets, raw provider payloads, raw account history, unsubmitted issue drafts, or private saved notes.

Observability also cannot change source authority. A high error rate, high request volume, provider success, or issue cluster is evidence about service behavior; it is not evidence that an $\mathbb{A}\mathbb{A}\mathbb{A}$ claim is proven.

## Observable Event Classes

The service should define stable event classes before implementation.

| Event class | Safe payload |
| --- | --- |
| `request_received` | request id, mode, account class, enabled capabilities, safe request summary id. |
| `source_context_resolved` | source classes, primary route ids, missing route ids, freshness class, excluded source classes. |
| `claim_label_assigned` | claim label, unsupported reason class, System Card route flag. |
| `provider_capability_resolved` | capability id, capability type, enabled state, health state, cost class, quality-gate result, fallback class. |
| `artifact_requested` | artifact type, purpose label, token cost class, privacy class. |
| `artifact_validated` | artifact type, validator disposition, fallback class, refusal class. |
| `speech_sync_checked` | high-quality gate result, sync result, caption/transcript result, fallback class. |
| `token_ledger_updated` | receipt id, work units, cap status, hold class, charge class, refund class, auto-fund flag. |
| `privacy_state_finalized` | retention classes, consent flags, public material flag, diagnostic-redaction class. |
| `terms_policy_checked` | safe terms-version ids, feature blockers, legal-review state, re-acceptance flag. |
| `action_preflight_checked` | action type, confirmation reason, destination class, action status. |
| `issue_handoff_created` | public issue draft id, source route ids, duplicate keys, privacy inclusion class, owner lane. |
| `issue_mining_report_generated` | report id, cluster count, top owner lanes, noise counts, privacy statement class. |
| `manifest_validation_completed` | manifest id, validator dispositions, reason class for a Not advanced disposition. |
| `support_summary_created` | support id, receipt id, safe error classes, redaction class. |
| `incident_record_created` | incident id, severity, affected capability ids, public-status flag, mitigation state. |

Event payloads should use safe ids and classes rather than raw text. If a field requires private content to be useful, the field should be omitted or represented as `needs_public_reproduction`.

## Privacy And Redaction Boundary

Observability must follow [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md), [saved-notebook-account-history-contract.md](saved-notebook-account-history-contract.md), and [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md).

Rules:

1. no private prompt text in metrics, dashboards, support summaries, public status pages, issue-mining reports, or incident records by default;
2. no raw uploaded images, screenshots, documents, diagrams, or private saved notes in observability records;
3. no provider secrets, raw provider request payloads, raw provider responses, or provider-specific billing internals in browser-visible logs;
4. receipts may link to safe request summaries, source classes, work units, provider capability ids, and artifact counts, not full prompt text;
5. operator/developer diagnostics may include safe ids, route ids, error classes, fallback classes, and validator names;
6. private-content support review requires a separate explicit policy, consent path, retention period, and deletion behavior;
7. public incident records should state impact, affected capability class, mitigation, and user action when needed without exposing private content.

If redaction state is unknown, observability export, issue mining, support display, and public status publication should not advance.

## Public Status Surface

The public service should expose only product-level status.

Allowed public status fields:

| Field | Requirement |
| --- | --- |
| `service_status` | `operational`, `degraded`, `partial_outage`, `maintenance`, or `incident_active`. |
| `answer_status` | Whether text answer generation is available. |
| `source_status` | Whether source retrieval/index freshness is healthy, stale, degraded, or unavailable. |
| `speech_status` | Whether high-quality speech is available, degraded to text-only fallback, or unavailable. |
| `visual_status` | Whether diagrams/generated images are available, degraded, or disabled. |
| `issue_handoff_status` | Whether GitHub handoff and issue drafting are available. |
| `token_status` | Whether wallet, holds, receipts, and auto-fund are available. |
| `terms_status` | Whether required terms/legal-review state blocks public beta or selected features. |
| `current_incidents` | Public incident ids, severity, affected surfaces, and mitigation state. |
| `recent_changes` | Safe change history for launch gates, feature enablement, and material service changes. |

The public status surface should not expose provider secrets, private prompts, raw logs, raw provider errors, account identifiers, unsubmitted issue drafts, or private saved-note state.

## Internal Diagnostics

Internal diagnostics are for debugging and support, not for source authority.

Allowed internal diagnostic fields:

1. manifest id;
2. request id;
3. safe request summary id;
4. source route ids and source freshness class;
5. provider capability ids, health state, quality gate result, cost class, and safe error class;
6. validator disposition list;
7. token receipt id, work units, cap status, hold/charge/refund classes;
8. privacy state classes and redaction state;
9. terms-version ids and feature blockers;
10. action preflight status and destination class;
11. issue draft id, public issue url when submitted, duplicate keys, and owner lane;
12. latency bands and retry/fallback classes.

Internal diagnostics must not become user-facing proof, public issue evidence, or support text unless they pass the redaction boundary for that destination.

## Provider, Token, And Media Observability

Provider and cost observability should follow [model-provider-capability-registry-contract.md](model-provider-capability-registry-contract.md) and [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md).

Required provider metrics:

1. capability health state by product capability id;
2. quality-gate pass/fail/unavailable counts;
3. fallback rates by capability and artifact type;
4. browser-key refusal count;
5. missing cost-map refusal count;
6. missing provider data-use or terms refusal count;
7. source-authority inflation refusal count;
8. latency and safe error classes by capability id.

Required token metrics:

1. estimate-required rate;
2. cap-exceeded rate;
3. insufficient-token rate;
4. auto-fund confirmation rate;
5. hold/refund class distribution;
6. no-charge fallback count;
7. attempted-provider charge count when a future policy allows it.

Required media metrics:

1. generated-media refusal count by corporate-standard rule;
2. high-quality speech fallback count;
3. unsynchronized audio refusal count;
4. generated-image moderation refusal count;
5. accessibility fallback count for caption, transcript, or alt-text gaps.

All metrics should aggregate by safe ids, classes, and counts. They should not include private prompt content or raw generated media.

## Issue Mining Integration

Observability should feed issue mining only through safe fields.

Allowed signal handoff:

1. public issue url or issue id after user-confirmed GitHub handoff;
2. source route ids and missing route ids;
3. claim label and unsupported reason class;
4. duplicate keys;
5. safe error classes;
6. validator disposition classes;
7. provider capability id and fallback class;
8. token receipt id when useful for support;
9. owner lane and smallest next artifact.

If an issue cluster depends on private prompt text, the issue-mining report should mark the cluster `needs_public_reproduction` and route it to a safe reproduction task.

## Incident And Change History

Incidents should be recorded when service behavior risks user trust, billing correctness, privacy, source authority, public actions, or launch readiness.

Incident fields:

| Field | Requirement |
| --- | --- |
| `incident_id` | Stable incident id. |
| `severity` | `critical`, `high`, `medium`, `low`, or `info`. |
| `status` | `open`, `mitigated`, `resolved`, or `postmortem_required`. |
| `started_at` | Start timestamp or detected timestamp. |
| `ended_at` | End timestamp when resolved. |
| `affected_surfaces` | Modes, capabilities, actions, artifacts, or account features affected. |
| `affected_capability_ids` | Product capability ids, not provider secrets. |
| `user_impact` | Plain-language effect. |
| `privacy_impact` | Redacted impact class; no private content. |
| `billing_impact` | Token receipt or refund impact class. |
| `source_authority_impact` | Whether source/claim labels were affected. |
| `mitigation` | Fallback, feature disablement, refund, source-index repair, terms block, or rollback. |
| `public_status_required` | Whether a public status update is required. |
| `followup_artifact` | Fix queue, issue, fixture, source-index repair, policy update, or postmortem. |

Change history should record feature enablement, launch-gate changes, provider capability state changes, terms changes, material validation changes, and public beta decisions. It should link to public docs or issues when available and keep private diagnostics internal.

## Verification Required for Advancement

Observability should not advance when:

1. a metric or log would require private prompt text;
2. public status would expose provider secrets, account identifiers, or private material;
3. support summary redaction is unknown;
4. provider diagnostics include raw provider payloads;
5. issue-mining handoff would include unconsented private material;
6. incident record cannot separate public impact from private content;
7. token/billing diagnostic would reveal private prompt text;
8. legal-review or terms state does not allow the public status or support disclosure.

Behavior for a Not advanced disposition should omit the unsafe diagnostic field, aggregate it, mark `needs_public_reproduction`, or block publication. It should not suppress the underlying service refusal, incident, or fix queue.

## Regression Fixtures

The future implementation should include observability fixtures for:

| Fixture | Required proof |
| --- | --- |
| `observability-request-safe-001` | Request event records mode, safe summary id, and source classes without private prompt text. |
| `observability-provider-health-001` | Provider health, fallback, error class, and cost class are observable by capability id without provider secrets. |
| `observability-token-receipt-001` | Receipt metrics show work units, cap status, charge/refund class, and no prompt expansion. |
| `observability-source-miss-001` | Missing route produces safe source-index candidate and no model-memory substitution. |
| `observability-media-refusal-001` | Generated-media refusal records rule class and fallback without storing unsafe content. |
| `observability-speech-fallback-001` | High-quality speech outage records text-only fallback and no low-quality audio event. |
| `observability-issue-mining-001` | Public issue metadata and safe duplicate keys can enter mining; private prompt text cannot. |
| `observability-public-status-001` | Public status shows product-level degradation without provider secrets or private user data. |
| `observability-incident-001` | Incident record includes severity, impact, mitigation, affected capability ids, and redacted privacy/billing impact. |
| `observability-redaction-negative-001` | Log, metric, support summary, or status output that would expose private content is blocked. |
| `observability-source-authority-negative-001` | Metrics, issue volume, provider success, or incident history cannot raise a claim label. |

## Implementation Handoff

Closure goal:
Turn the Observability Public Status And Incident Contract into privacy-safe event schemas, metrics, public-status fields, incident records, diagnostics redaction, issue-mining handoff rules, and regression fixtures for the Archie service.

Use this packet, [answer-artifact-manifest.md](answer-artifact-manifest.md), [manifest-service-contracts.md](manifest-service-contracts.md), [source-ingestion-retrieval-context-contract.md](source-ingestion-retrieval-context-contract.md), [answer-engine-source-contract.md](answer-engine-source-contract.md), [model-provider-capability-registry-contract.md](model-provider-capability-registry-contract.md), [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md), [issue-mining-signal-contract.md](issue-mining-signal-contract.md), [action-broker-confirmation-contract.md](action-broker-confirmation-contract.md), [saved-notebook-account-history-contract.md](saved-notebook-account-history-contract.md), [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md), [service-native-speech-presentation-contract.md](service-native-speech-presentation-contract.md), [visual-artifact-contract.md](visual-artifact-contract.md), and [v1-product-requirements.md](v1-product-requirements.md) as the source of truth.

Task:
- Encode observable event classes, public status fields, internal diagnostic fields, incident records, and change-history records.
- Define redaction rules for prompts, uploaded media, provider payloads, token receipts, issue metadata, saved notes, support summaries, and public status.
- Define provider, token, source, media, speech, action, terms, and issue-mining metrics.
- Add behavior for a Not advanced disposition for unsafe diagnostics, unsafe public status, unsafe issue-mining handoff, and unsafe incident disclosure.
- Add fixtures for request events, provider health, token receipts, source misses, media refusals, speech fallback, issue-mining handoff, public status, incidents, redaction negatives, and source-authority negatives.

Constraints:
- Do not add runtime logging, monitoring vendor config, credentials, deployment config, or public launch behavior unless explicitly requested.
- Do not expose private prompt text, private user media, provider secrets, raw provider payloads, raw account history, or private saved notes.
- Do not let metrics, issue volume, provider success, or incidents alter source authority, claim labels, proof status, or launch readiness.
- Preserve the existing high-quality-only speech, token, privacy, terms, and generated-media guardrails.
