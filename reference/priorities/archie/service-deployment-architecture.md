# Archie Service Deployment Architecture

## Workstream Metadata

- Kind: `priority-architecture`
- Status: `draft`
- Claim level: `priority-only`
- Parent priority: [service-platform.md](service-platform.md)
- Service scaffolding and fixtures: [service-scaffolding-and-fixtures.md](service-scaffolding-and-fixtures.md)
- Deployment option decision: [service-deployment-option-decision.md](service-deployment-option-decision.md)
- App interface: [Archie Interface App](../app-archie-interface/priorities.md)
- V1 product requirements: [v1-product-requirements.md](../app-archie-interface/v1-product-requirements.md)
- Answer artifact manifest: [answer-artifact-manifest.md](../app-archie-interface/answer-artifact-manifest.md)
- Manifest-driven service architecture: [manifest-driven-service-architecture.md](../app-archie-interface/manifest-driven-service-architecture.md)
- Manifest service contracts: [manifest-service-contracts.md](../app-archie-interface/manifest-service-contracts.md)
- Source ingestion and retrieval context contract: [source-ingestion-retrieval-context-contract.md](../app-archie-interface/source-ingestion-retrieval-context-contract.md)
- Answer engine source contract: [answer-engine-source-contract.md](../app-archie-interface/answer-engine-source-contract.md)
- Model/provider capability registry contract: [model-provider-capability-registry-contract.md](../app-archie-interface/model-provider-capability-registry-contract.md)
- Token ledger and privacy contract: [token-ledger-privacy-contract.md](../app-archie-interface/token-ledger-privacy-contract.md)
- Action broker confirmation contract: [action-broker-confirmation-contract.md](../app-archie-interface/action-broker-confirmation-contract.md)
- Issue mining signal contract: [issue-mining-signal-contract.md](../app-archie-interface/issue-mining-signal-contract.md)
- Observability, public status, and incident contract: [observability-public-status-incident-contract.md](../app-archie-interface/observability-public-status-incident-contract.md)
- Service terms and account policy contract: [service-terms-account-policy-contract.md](../app-archie-interface/service-terms-account-policy-contract.md)

## Purpose

This packet turns the selected deployment option into an implementation-ready deployment architecture for the future Archie question service.

The selected shape is `github_pages_entry_plus_hosted_service_backend`: the existing static site remains the public entry, documentation, System Card, and corpus/app navigation surface, while the question service runs behind a hosted service API with server-side provider gateways, source retrieval, token authority, terms/account state, manifest validation, action confirmation, issue mining, observability, and privacy/audit behavior.

This packet is not vendor selection, deployment configuration, credential setup, runtime AI code, public launch approval, or account billing implementation.

The schema-only scaffolding and fixture target that follows from this deployment architecture is captured in [service-scaffolding-and-fixtures.md](service-scaffolding-and-fixtures.md).

## Architecture Summary

The service should split responsibilities across five deployment boundaries:

| Boundary | Primary responsibility | Launch invariant |
| --- | --- | --- |
| `static_public_site` | Serve current public site, Archie sphere, System Card, corpus routes, app routes, Legal Terms, and service entry link. | No provider credentials, token authority, account state, private logs, or direct model calls. |
| `browser_conversation_client` | Render the conversation UI, source chips, claim labels, token wallet display, audio playback, visual artifacts, issue previews, and confirmation dialogs. | Render only validated manifests or fail-closed states returned by the service. |
| `service_api` | Own request gateway, provider registry, source retrieval, answer orchestration, manifest validation, token ledger, terms policy, privacy/audit, action broker, notebook drafts, and public-safe status. | Every endpoint returns a validated Answer Artifact Manifest or manifest-shaped refusal. |
| `background_jobs` | Build source records, refresh source indexes, mine public issues, reconcile token/provider costs, aggregate public status, and prepare incident/change-history records. | Jobs produce versioned artifacts and safe summaries; they do not publish answer claims directly. |
| `external_services` | Provide model, speech, generated image, moderation, embedding/rerank, payment, GitHub, auth, storage, and monitoring capabilities behind service adapters. | External providers never own source authority, proof status, token policy, action confirmation, or public issue-mining conclusions. |

## Domain And Route Model

The domain decision is intentionally vendor-neutral, but the route model should follow this shape:

| Route class | Candidate route | Owner | Behavior |
| --- | --- | --- | --- |
| Public site | `https://architrino.com/` | `static_public_site` | Existing static site, scenes, corpus navigation, apps, support, Legal Terms, System Card, and service entry. |
| Service app | `https://architrino.com/ask` or `https://ask.architrino.com/` | `browser_conversation_client` plus `service_api` | Hosted question interface. Route choice remains deferred until host/domain selection. |
| Service API | `/api/archie/...` under the service host | `service_api` | Manifest endpoints, provider capability status, service status, terms, token ledger, and action confirmation. |
| Public status | `/status` or `/api/archie/status` under the service host | `service_api` | Public-safe product status and incident/change history. |
| Legal/account terms | Existing Legal Terms plus service-specific routes | `static_public_site` plus `service_api` | Static legal page remains public; service returns terms versions and acceptance state. |

The static site may link into the service, embed a service entry, or host a thin shell that loads the service app. It must not become the credential or token authority.

## Service API Ownership

The service API owns these endpoint groups:

| Endpoint group | Required owner | Notes |
| --- | --- | --- |
| `answers` | `request_gateway`, `mode_router`, `retrieval_context`, `answer_engine`, `manifest_validator` | Builds the base manifest and returns source-grounded answer text or unsupported-answer state. |
| `answer_actions` | `artifact_orchestrator`, `speech_service`, `visual_artifact_service`, `issue_draft_service`, `notebook_service`, `action_broker` | Adds listen, visualize, issue draft, save-note draft, and confirmed action results. |
| `provider_capabilities` | `provider_registry_gateway` | Returns public-safe capability ids, health, fallbacks, and cost classes without provider secrets. |
| `token_ledger` | `token_ledger` | Estimates, holds, charges, refunds, receipts, caps, auto-fund, and insufficient-token state. |
| `terms` | `terms_policy` | Service terms, token/subscription terms, privacy notices, media terms, GitHub handoff notices, notebook terms, support routes, legal-review state, and accepted version state. |
| `service_status` | `observability_status` | Product status, degraded capabilities, active incidents, and public-safe recent changes. |
| `account_notebook` | `notebook_service` | Session-local drafts first; durable account history only after deletion, export, sharing, and storage-cost policy exists. |

Endpoint names are implementation details. Endpoint behavior is not: each endpoint must return either a validated Answer Artifact Manifest, a validated partial-manifest update, or a manifest-shaped refusal/error state.

## Background Job Ownership

Background jobs should be separate from request handling when work is periodic, expensive, or operational.

| Job | Inputs | Outputs | Required gates |
| --- | --- | --- | --- |
| `source_index_build` | Repository commit, authored markdown, generated reading copies, scene graph, app guides, Archie references, priority docs, curated external bundles. | Versioned source records, source-chip index, route freshness summary, missing-route inventory. | Content integrity, source authority, freshness, rollback snapshot. |
| `source_index_publish` | Built source index plus validation result. | Active source-index snapshot for service retrieval. | Atomic publish, rollback pointer, public/operator visibility flags. |
| `issue_mining_report` | Public GitHub issues, submitted issue links, safe issue metadata, labels, duplicate keys. | Periodic signal report, clusters, owner lanes, noise classes, fix queues, fixture candidates, source-index candidates, privacy statement. | Private prompt exclusion, public-link evidence, owner-lane routing. |
| `status_rollup` | Safe event classes, provider health, source freshness, token ledger summaries, validator dispositions, incidents. | Public status summary and internal diagnostics. | Observability redaction, no raw provider payloads, no private prompt text. |
| `cost_reconciliation` | Provider cost classes, token receipts, holds/refunds, payment events. | Reconciled billing classes and refund candidates. | No private prompt expansion, token/subscription terms current. |
| `incident_followup` | Incident records, change history, validator failures, issue clusters. | Postmortem, fix queue, fixture candidate, policy update, or rollback follow-up. | Public/private disclosure split and legal-review state. |

The static site build already has generated scene and markdown artifacts. The service source-index build should consume those generated artifacts as route inputs, not treat browser state or generated reading copies as stronger source authority than authored markdown.

## Source Index And Retrieval Ownership

The service source index should include these source families:

1. authored corpus markdown;
2. generated reading copies with canonical parent links;
3. scene graph routes and sphere-to-section mappings;
4. public app guides and runtime route metadata;
5. Archie references, System Card routes, and legal/account terms routes;
6. priority material with development-status visibility;
7. curated external prior-physics bundles only after source policy exists.

Each source-index snapshot must record:

| Field | Purpose |
| --- | --- |
| `snapshot_id` | Stable id for retrieval, logs, receipts, incidents, and rollback. |
| `repository_ref` | Commit or build ref used to create the index. |
| `generated_artifact_refs` | Scene graph, markdown index, reading-copy, and TOC artifact versions. |
| `source_record_count` | Count by source class. |
| `visibility_policy_version` | Public, development-status, operator/developer, external-curated, and excluded-source policy. |
| `freshness_state` | Fresh, stale, degraded, unavailable, or rollback snapshot. |
| `rollback_parent` | Previous active snapshot when available. |

The retrieval service may expose source chips and freshness summaries to users. It should keep operator/developer diagnostics, missing-route inventories, and excluded-source detail behind safe diagnostics unless a public route is needed.

## Secret And Environment Classes

The service must classify configuration before implementation.

| Class | Examples | Exposure rule |
| --- | --- | --- |
| `public_static_config` | Static site entry link, public status route, public Legal Terms route, public service capability labels. | May be browser-visible. |
| `public_service_config` | Product capability ids, public health state, public fallback labels, public cost classes. | May be returned through public-safe service endpoints. |
| `server_secret` | Model provider keys, speech provider keys, image provider keys, embedding/rerank keys, payment secrets, GitHub app secrets, signing keys, webhook secrets, database credentials. | Server-side only; never in browser bundles, static files, logs, receipts, or issue drafts. |
| `operator_secret` | Deployment tokens, CI/CD secrets, monitoring write tokens, incident escalation credentials. | Operator/developer and CI/CD only. |
| `regulated_user_state` | Account ids, billing ids, accepted terms, token balances, saved-note ids, submitted issue-link retention, deletion/export records. | Service-side storage with privacy, retention, deletion, and support-policy gates. |
| `ephemeral_private_content` | Current prompt text, generated audio, unsubmitted issue draft, unsaved answer text, transient media. | Retain only for request execution unless the user explicitly opts into a permitted durable feature. |

No secret class may be copied into GitHub Pages output, scene manifests, browser JavaScript, public issue metadata, public status, token receipts, or support summaries.

## Staging And Production

The service needs at least two environments before public beta:

| Environment | Purpose | Required behavior |
| --- | --- | --- |
| `staging` | Validate source-index snapshots, provider capability registry, token ledger, service terms, action confirmation, issue handoff, observability redaction, and rollback. | May use test providers, sandbox payments, test GitHub repos/issues, non-public status, and synthetic token grants. |
| `production` | Public or limited-beta service. | Uses production source-index snapshots, production terms versions, production token/payment state, public status, incident records, and rollback plan. |

Both environments should support:

1. environment-specific source-index snapshots;
2. environment-specific provider capability registry entries;
3. environment-specific service terms and legal-review state;
4. environment-specific token/payment mode;
5. environment-specific issue-handoff destination;
6. environment-specific public status;
7. rollback to a prior service version and compatible source-index snapshot.

## CI/CD Gates

The existing repository content-integrity gate remains necessary for the static site and generated artifacts. The future service pipeline should add these gates before deployment:

1. static content integrity check;
2. service type/schema check for Answer Artifact Manifest and endpoint contracts;
3. source-index build check with snapshot diff;
4. manifest validator fixture suite;
5. provider capability registry fixture suite;
6. token ledger and privacy fixture suite;
7. service terms and account policy fixture suite;
8. action broker fixture suite;
9. issue-mining signal fixture suite;
10. observability redaction and public-status fixture suite;
11. speech sync and high-quality-only fallback fixture suite;
12. generated-media corporate-standard fixture suite;
13. browser bundle secret scan;
14. staging smoke test;
15. rollback smoke test.

The pipeline should fail closed when any gate cannot determine whether private prompts, provider secrets, token authority, source authority, action side effects, or public status are safe.

## Rollback And Incident Response

Rollback should treat service code, source index, provider capability registry, terms versions, and token ledger schema as separate but coordinated surfaces.

| Surface | Rollback requirement |
| --- | --- |
| Service code | Restore last passing deployment with compatible endpoint contracts. |
| Source index | Restore prior active source-index snapshot and freshness state. |
| Provider registry | Disable degraded capabilities or restore last passing provider capability map. |
| Token ledger | Preserve transaction records; issue refunds or hold releases through ledger policy rather than deleting records. |
| Terms policy | Preserve accepted-version history and block features when terms compatibility is unknown. |
| Public status | Publish public-safe incident and mitigation state when user-visible reliability, billing, privacy, source authority, or public action behavior is affected. |

Incident response should follow the observability contract. Incidents are required for privacy exposure, billing correctness, source-authority errors, public-action errors, provider outages with no valid fallback, terms/legal gate failures, and rollback events that affect users.

## Public Beta Smoke Tests

Before public beta, staging must pass these smoke tests:

| ID | Required proof |
| --- | --- |
| `deploy-static-entry-001` | Public site links to the service entry and Legal Terms without embedding service secrets. |
| `deploy-answer-text-001` | Staging returns a validated text Answer Artifact Manifest from a source-backed question. |
| `deploy-unsupported-001` | Unsupported claim returns a fail-closed manifest with nearest supported route or open burden. |
| `deploy-source-index-001` | Active source-index snapshot records repository ref, generated artifact refs, source counts, freshness, and rollback parent. |
| `deploy-provider-registry-001` | Public provider capability endpoint returns product capability ids and health/fallback state without secrets. |
| `deploy-token-receipt-001` | Token estimate, hold, charge, refund, cap status, and receipt are server-authoritative and omit private prompt text. |
| `deploy-speech-fallback-001` | High-quality speech outage returns text-only fallback and no speech charge. |
| `deploy-visual-policy-001` | Generated visual request inherits source/claim context and refuses proof-inflating media. |
| `deploy-issue-handoff-001` | Issue draft shows public/GitHub-login warning and requires confirmation before handoff. |
| `deploy-action-unconfirmed-001` | Unconfirmed public, durable, paid, retained, or credentialed action performs no side effect. |
| `deploy-service-terms-001` | Paid, durable, public, retained, generated-media, and credentialed features fail closed when terms are missing or stale. |
| `deploy-public-status-001` | Public status reports product-level degradation without provider secrets, account ids, private prompt text, raw logs, or private saved notes. |
| `deploy-secret-scan-001` | Browser bundle and static output contain no provider, GitHub, payment, database, signing, or monitoring secrets. |
| `deploy-rollback-001` | Staging rollback restores prior service code and compatible source-index snapshot. |

## Deferred Implementation Choices

These remain open until implementation:

1. exact host and framework for the service app;
2. path versus subdomain route;
3. database and object storage provider;
4. queue/background-job runtime;
5. payment provider;
6. model, speech, image, embedding, rerank, moderation, and monitoring providers;
7. auth/session provider;
8. GitHub handoff implementation beyond prefilled URL;
9. public status hosting;
10. external-source search policy.

No deferred choice may weaken the core deployment boundary: static public entry and browser rendering are separate from provider secrets, token authority, source authority, action side effects, durable user state, observability internals, and manifest validation.

## Implementation Handoff

Closure goal:
Turn the Archie service scaffolding and fixture plan into schema-only service contract files and fixture expectations without enabling runtime AI generation or public launch.

Use [service-scaffolding-and-fixtures.md](service-scaffolding-and-fixtures.md), this packet, [service-deployment-option-decision.md](service-deployment-option-decision.md), [service-platform.md](service-platform.md), [manifest-driven-service-architecture.md](../app-archie-interface/manifest-driven-service-architecture.md), [manifest-service-contracts.md](../app-archie-interface/manifest-service-contracts.md), [v1-product-requirements.md](../app-archie-interface/v1-product-requirements.md), and [observability-public-status-incident-contract.md](../app-archie-interface/observability-public-status-incident-contract.md) as the source of truth.

Task:
- Add schema-only service contract files, fixture directories, and validation placeholders for the Archie service.
- Keep provider selection, credentials, payment processing, account billing, durable notebooks, runtime AI calls, generated media calls, and public launch disabled unless explicitly requested.

Constraints:
- Do not put provider, GitHub, payment, database, signing, or monitoring secrets in browser JavaScript or static output.
- Preserve source authority, claim labels, System Card routing, token authority, action confirmation, privacy retention, and observability redaction.
- Keep priority-only material visibly priority-only.
- Preserve TeX exactly.
