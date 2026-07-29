# Archie Service Deployment Option Decision

## Workstream Metadata

- Kind: `priority-design`
- Status: `draft`
- Claim level: `priority-only`
- Parent priority: [service-platform.md](service-platform.md)
- Deployment architecture: [service-deployment-architecture.md](service-deployment-architecture.md)
- Service scaffolding and fixtures: [service-scaffolding-and-fixtures.md](service-scaffolding-and-fixtures.md)
- Interface product plan: [interface-product-plan.md](interface-product-plan.md)
- V1 product requirements: [v1-product-requirements.md](v1-product-requirements.md)
- Answer artifact manifest: [answer-artifact-manifest.md](answer-artifact-manifest.md)
- Manifest-driven service architecture: [manifest-driven-service-architecture.md](manifest-driven-service-architecture.md)
- Manifest service contracts: [manifest-service-contracts.md](manifest-service-contracts.md)
- Source ingestion and retrieval context contract: [source-ingestion-retrieval-context-contract.md](source-ingestion-retrieval-context-contract.md)
- Answer engine source contract: [answer-engine-source-contract.md](answer-engine-source-contract.md)
- Model/provider capability registry contract: [model-provider-capability-registry-contract.md](model-provider-capability-registry-contract.md)
- Token ledger and privacy contract: [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md)
- Action broker confirmation contract: [action-broker-confirmation-contract.md](action-broker-confirmation-contract.md)
- Issue mining signal contract: [issue-mining-signal-contract.md](issue-mining-signal-contract.md)
- Observability, public status, and incident contract: [observability-public-status-incident-contract.md](observability-public-status-incident-contract.md)
- Service terms and account policy contract: [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md)

## Purpose

This packet captures the deployment option decision for the future Archie question service. The concrete deployment architecture that follows from this decision is captured in [service-deployment-architecture.md](service-deployment-architecture.md), and the first schema-only scaffolding target is captured in [service-scaffolding-and-fixtures.md](service-scaffolding-and-fixtures.md).

It converts the service-platform question from an open comparison into a priority-level architecture decision: keep the current public site as the public entry and documentation surface, and place the model, provider, token, account, action, source-retrieval, privacy, and observability machinery behind a deployed service boundary.

This is not deployment configuration, runtime code, vendor selection, credential setup, or public launch approval.

## Decision

Recommended long-term v1 shape: `github_pages_entry_plus_hosted_service_backend`.

The current public site may remain the first public route for the Archie sphere, System Card, corpus navigation, app links, comics, legal pages, and service entry. The question service itself should run as a separate hosted service with a backend or serverless API boundary. That service boundary owns source retrieval, provider gateways, token ledger authority, account and terms state, manifest validation, action confirmation, issue-mining metadata, public status, incident records, and privacy/audit behavior.

Serverless or edge functions are a good implementation style for many service endpoints, but they are not the complete architecture by themselves. A managed AI gateway can be useful behind the provider registry, but it must not become the product authority for tokens, source status, terms, action safety, issue mining, or observability.

## Deployment Options

| Option | Fit | Verdict |
| --- | --- | --- |
| `github_pages_entry_plus_hosted_service_backend` | The public site remains static and trustworthy, while paid/provider/account work lives behind a service boundary. | Recommended for long-term v1. |
| `separate_hosted_webapp` | Strong account/session isolation and product freedom, but it can split the public reader experience away from the existing site. | Viable later if account or app complexity dominates. |
| `serverless_edge_service` | Good endpoint implementation style for request gateway, provider registry, token checks, source retrieval, and manifest validation. | Use as an implementation pattern, not as the whole product decision. |
| `managed_ai_gateway_first` | Useful for provider routing, health, and cost controls when wrapped by the provider registry. | Support role only; insufficient for source authority, tokens, accounts, actions, and issue mining. |
| `static_local_source_prototype` | Can mock a conversation surface but cannot safely own credentials, tokens, provider calls, privacy, GitHub actions, or account state. | Rejected for public service. |

## Decision Criteria

The recommended deployment shape wins because it satisfies these constraints:

1. no browser-side model keys or direct public model API calls;
2. service-side provider registry and provider gateway;
3. server-authoritative token ledger, holds, refunds, receipts, auto-fund, and spending limits;
4. source-ingestion and retrieval-context pipeline with freshness and route identity;
5. server-side Answer Artifact Manifest validation before rendering;
6. service terms, account policy, privacy notices, and legal-review state before paid, durable, public, retained, generated-media, or credentialed actions;
7. action broker confirmation before GitHub handoff, durable saves, public sharing, retained user material, auto-fund, or credentialed actions;
8. issue-mining metadata that can survive public GitHub handoff without retaining private prompt text;
9. observability, public status, incidents, support summaries, and diagnostics redaction;
10. staging, production, rollback, and incident response.

## Boundary Placement

| Boundary | Owns | Must not own |
| --- | --- | --- |
| Public static site | Archie sphere, System Card, corpus navigation, app links, legal pages, service entry, public docs. | Provider secrets, token authority, account state, durable user records, raw logs, or direct model calls. |
| Browser conversation client | Composer, mode controls, source chips, claim labels, rendered manifests, audio playback, visual display, issue preview, action confirmations, token wallet display. | Source authority decisions, model credentials, token ledger authority, private diagnostics, hidden GitHub credentials, or unmanifested side effects. |
| Service API | Request gateway, provider registry, source retrieval, answer-engine orchestration, token ledger, terms state, privacy/audit, action broker, manifest validation, endpoint contracts. | Public claims outside source context or proof status beyond the manifest. |
| Background jobs | Source-index refresh, issue-mining reports, incident rollups, status aggregation, delayed fixture checks, cost reconciliation. | User-facing answer claims without manifest validation. |
| External providers | Model generation, high-quality speech, generated images, moderation, embeddings, rerank, payment, GitHub handoff, monitoring transport. | Source authority, proof status, token policy, action confirmation, or public issue-mining conclusions. |

## Recommended Service Pieces

The hosted service should be built around these pieces:

1. `public_entry` from the existing site into the service;
2. `conversation_surface` for the user-facing app;
3. `request_gateway` for request normalization, account state, terms state, and spending limits;
4. `source_ingestion_index` for corpus, scene, app-guide, Archie reference, priority, generated-copy, and curated external-source records;
5. `retrieval_context` for source chips, freshness, authority flags, exclusions, and missing routes;
6. `provider_registry_gateway` for provider capability ids, health, quality gates, fallback, cost classes, credential boundaries, and privacy/terms state;
7. `answer_engine` for source-grounded answer body, claim labels, and unsupported-answer behavior;
8. `artifact_orchestrator` for speech, visual, diagram, narration, storyboard, issue draft, and saved-note work plans;
9. `token_ledger` for estimates, holds, charges, refunds, receipts, caps, and auto-fund;
10. `terms_policy` for service terms, token terms, privacy notices, media terms, GitHub handoff notices, notebook terms, support routes, and legal-review state;
11. `privacy_and_audit` for retention, deletion, consent, redaction, and support-safe diagnostics;
12. `action_broker` for public, durable, paid, retained, credentialed, auto-fund, saved-note, and user-material confirmations;
13. `observability_status` for safe events, metrics, public status, incidents, change history, and support summaries;
14. `issue_mining_pipeline` for duplicate clusters, signal reports, owner lanes, noise classes, fix queues, source-index candidates, and privacy statements;
15. `notebook_account` for session-local drafts first and durable notebook/account history only after deletion, export, sharing, and storage-cost policy exists.

## Phases

1. `phase_0_priority_contracts` - Accept the priority packets that define source, manifest, provider, token, terms, action, issue-mining, observability, speech, visual, and notebook behavior.
2. `phase_1_static_entry_and_system_card` - Keep the public site as the entry and status route, with Legal Terms and System Card links.
3. `phase_2_service_skeleton` - Implement request gateway, manifest shell, provider registry stub, terms state, token wallet display, and validators requiring verification before advancement without runtime AI launch.
4. `phase_3_source_ingestion_manifest_answers` - Add source records, retrieval context, answer-engine source contract, manifest rendering, and unsupported-answer fixtures.
5. `phase_4_tokens_terms_observability` - Add authoritative token ledger, spending limits, auto-fund controls, terms acceptance, privacy state, public status, incident records, and redacted diagnostics.
6. `phase_5_speech_visual_issue_handoff` - Add high-quality speech, generated visual artifacts, issue drafts, GitHub handoff, saved-note drafts, and issue-mining metadata.
7. `phase_6_public_beta_gate` - Run launch gates, legal review, privacy review, cost review, staging smoke tests, rollback drills, source-link QA, and corporate media fixtures.

## Public Beta Gate Additions

The deployment decision adds these public beta blockers:

1. public entry route selected and documented;
2. service host, API boundary, and environment split selected;
3. no public-client provider credentials in browser JavaScript;
4. provider registry and provider gateways live behind the service boundary;
5. token ledger authority is server-side;
6. terms and privacy state are validated before paid, durable, retained, public, generated-media, or credentialed actions;
7. manifest validation runs server-side before render;
8. source index freshness and rollback behavior are defined;
9. observability redaction and public-status fields pass fixtures;
10. rollback and incident-response path are tested in staging.

## Deferred Decisions

The decision intentionally leaves these choices open until implementation:

1. exact hosting vendor;
2. exact service framework;
3. domain or subdomain layout;
4. payment provider;
5. model, speech, image, embedding, rerank, and moderation providers;
6. database and object-storage provider;
7. queue and background-job runtime;
8. monitoring transport;
9. authentication provider;
10. external-source search policy.

## Regression Targets

Future implementation should include regression expectations for:

| ID | Expected behavior |
| --- | --- |
| `deployment-no-browser-key-001` | Browser bundle contains no model, GitHub, payment, or provider secrets. |
| `deployment-server-manifest-validation-001` | Service validates or refuses manifests before the browser renders them. |
| `deployment-server-token-authority-001` | Client-local token state cannot authorize spending, holds, refunds, or auto-fund. |
| `deployment-provider-gateway-001` | Provider-backed work routes through registered service-side capability ids. |
| `deployment-source-index-snapshot-001` | Source records include snapshot identity, freshness, and rollback behavior. |
| `deployment-action-credential-boundary-001` | GitHub issue handoff exposes no hidden public-client credential. |
| `deployment-public-status-redaction-001` | Public status excludes private prompts, account ids, provider secrets, raw logs, and private saved notes. |
| `deployment-staging-smoke-001` | Staging can run text answer, unsupported answer, token receipt, service status, and terms endpoints. |
| `deployment-rollback-smoke-001` | Rollback path restores a previous service version and compatible source-index snapshot. |

## Implementation Handoff

Closure goal:
Use the service deployment option decision, deployment architecture packet, and service scaffolding packet to define schema-only service contract files and fixture expectations.

Use this packet, [service-deployment-architecture.md](service-deployment-architecture.md), [service-scaffolding-and-fixtures.md](service-scaffolding-and-fixtures.md), [service-platform.md](service-platform.md), [v1-product-requirements.md](v1-product-requirements.md), [manifest-driven-service-architecture.md](manifest-driven-service-architecture.md), [manifest-service-contracts.md](manifest-service-contracts.md), [source-ingestion-retrieval-context-contract.md](source-ingestion-retrieval-context-contract.md), [answer-engine-source-contract.md](answer-engine-source-contract.md), [model-provider-capability-registry-contract.md](model-provider-capability-registry-contract.md), [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md), [action-broker-confirmation-contract.md](action-broker-confirmation-contract.md), [issue-mining-signal-contract.md](issue-mining-signal-contract.md), [observability-public-status-incident-contract.md](observability-public-status-incident-contract.md), and [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md) as the source of truth.

Task:
- Add schema-only service contract files, fixture directories, and validation placeholders for the Archie service.
- Keep vendor selection, credentials, runtime AI calls, public launch, and account billing implementation out of scope unless explicitly requested.

Constraints:
- Do not introduce browser-side model, GitHub, payment, or provider credentials.
- Do not let deployment mechanics alter source authority, claim labels, proof status, or System Card routing.
- Keep priority-only material visibly priority-only.
- Preserve TeX exactly.
