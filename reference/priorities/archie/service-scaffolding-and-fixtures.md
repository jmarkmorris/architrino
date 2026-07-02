# Archie Service Scaffolding And Fixtures

## Workstream Metadata

- Kind: `priority-implementation-plan`
- Status: `active-scaffold`
- Claim level: `priority-only`
- Parent priority: [service-platform.md](service-platform.md)
- Deployment architecture: [service-deployment-architecture.md](service-deployment-architecture.md)
- Deployment option decision: [service-deployment-option-decision.md](service-deployment-option-decision.md)
- App interface: [Archie Interface App](../app-archie-interface/app-archie-interface.md)
- V1 product requirements: [v1-product-requirements.md](../app-archie-interface/v1-product-requirements.md)
- Answer artifact manifest: [answer-artifact-manifest.md](../app-archie-interface/answer-artifact-manifest.md)
- Manifest-driven service architecture: [manifest-driven-service-architecture.md](../app-archie-interface/manifest-driven-service-architecture.md)
- Manifest service contracts: [manifest-service-contracts.md](../app-archie-interface/manifest-service-contracts.md)
- Source ingestion and retrieval context contract: [source-ingestion-retrieval-context-contract.md](../app-archie-interface/source-ingestion-retrieval-context-contract.md)
- Model/provider capability registry contract: [model-provider-capability-registry-contract.md](../app-archie-interface/model-provider-capability-registry-contract.md)
- Token ledger and privacy contract: [token-ledger-privacy-contract.md](../app-archie-interface/token-ledger-privacy-contract.md)
- Action broker confirmation contract: [action-broker-confirmation-contract.md](../app-archie-interface/action-broker-confirmation-contract.md)
- Issue mining signal contract: [issue-mining-signal-contract.md](../app-archie-interface/issue-mining-signal-contract.md)
- Observability, public status, and incident contract: [observability-public-status-incident-contract.md](../app-archie-interface/observability-public-status-incident-contract.md)
- Service terms and account policy contract: [service-terms-account-policy-contract.md](../app-archie-interface/service-terms-account-policy-contract.md)

## Purpose

This packet defines the first implementation scaffold and fixture plan for the future Archie question service.

It translates the deployment architecture into concrete module boundaries, schema packages, fixture locations, source-index artifacts, environment variable classes, CI gates, and rollout stages. It is intentionally schema-only: it does not create runtime AI calls, provider credentials, deployment config, payment processing, durable notebooks, public launch behavior, or production service code.

## Current Schema-Only Landing

The first schema-only scaffold is now present:

| Surface | Path | Role |
| --- | --- | --- |
| Root contract schema | [schema.json](../../../src/archie-service/contracts/v1/schema.json) | Validates Answer Artifact Manifest, answer request, source-index snapshot, provider capability registry, token receipt, action preflight, service status, service terms, and deployment smoke-plan fixture shapes. |
| Contract validator | [validate-contracts.mjs](../../../scripts/archie-service/validate-contracts.mjs) | Checks all Archie service fixture JSON files against the root schema and runs a simple secret-boundary scan. |
| Node test wrapper | [archie-service-contracts.test.js](../../../tests/archie-service-contracts.test.js) | Runs the contract validator through `node --test`. |
| Manifest fixture example | [text-answer.manifest.v1.json](../../../tests/archie-service/fixtures/manifests/text-answer.manifest.v1.json) | Stores schema-only manifest expectations for source context, claim context, answer body, token receipt, privacy state, actions, issue-mining metadata, and observability context. |
| Deployment fixture example | [staging-smoke-plan.v1.json](../../../tests/archie-service/fixtures/deployment/staging-smoke-plan.v1.json) | Stores schema-only deployment smoke expectations for static entry, text answer, secret scan, and rollback checks. |

Current validation command:

```bash
node scripts/archie-service/validate-contracts.mjs --check
node --test tests/archie-service-contracts.test.js
```

This is still not a service runtime. The schema and fixtures are the fail-closed contract surface that future implementation must satisfy before endpoint handlers, provider adapters, payment flows, durable storage, deployment config, or public routes are added.

## Scaffold Principle

The first implementation pass should be contract-first.

Before any provider-backed answer generation exists, the repo should be able to validate:

1. a manifest schema;
2. service endpoint request/response schemas;
3. source-index snapshot shape;
4. provider capability registry shape;
5. token ledger receipt shape;
6. action broker confirmation shape;
7. observability/public-status/incident shape;
8. service terms and account policy shape;
9. deployment smoke fixtures and rollback fixtures.

Only after those contract fixtures pass should the project wire real providers, payments, durable storage, or public routes.

## Candidate Module Layout

The implementation should keep service contracts separate from runtime app code.

| Path | Ownership |
| --- | --- |
| `src/archie-service/contracts/` | TypeScript types and JSON Schemas for manifests, endpoint requests/responses, provider capabilities, tokens, actions, status, incidents, terms, and source records. Initial JSON Schema is present under `v1/schema.json`. |
| `src/archie-service/validators/` | Pure validators for shape, provider capability, source authority, claim context, media standard, speech sync, token receipt, privacy state, terms, observability redaction, action confirmation, notebook, issue mining, and render contract. |
| `src/archie-service/source-index/` | Source-record normalization, generated artifact ingestion, snapshot metadata, freshness checks, visibility policy, and rollback pointer handling. |
| `src/archie-service/provider-registry/` | Product capability ids, enabled states, health states, fallback classes, credential-boundary categories, cost classes, and provider terms state. |
| `src/archie-service/token-ledger/` | Estimate, hold, charge, refund, cap, auto-fund, receipt, and no-private-prompt receipt logic. |
| `src/archie-service/actions/` | Action preflight, confirmation text, destination disclosure, credential boundary, and action result state. |
| `src/archie-service/observability/` | Safe event classes, public status shape, incident/change-history shape, support-summary redaction, and diagnostics classes. |
| `src/archie-service/terms/` | Service terms versioning, accepted versions, feature blockers, legal-review state, support route, and re-acceptance policy. |
| `src/archie-service/http/` | Endpoint handlers after schemas and validators exist. Initially stubbed to fixture-backed manifests only. |
| `src/archie-service/browser-client/` | Future service UI shell, manifest renderer, source chips, claim labels, token wallet display, action confirmations, audio player, visual artifact display, and status display. |

Most paths remain targets, not current files. If implementation chooses a separate package or service repository, the same ownership split should be preserved.

## Future Script Targets

The first script layer should produce and verify artifacts without running runtime AI.

| Script | Purpose |
| --- | --- |
| `scripts/archie-service/build-source-index.mjs --check` | Verify source-index snapshots from repo markdown, generated reading copies, scene graph, app guides, Archie references, priority docs, and curated external bundles. |
| `scripts/archie-service/build-source-index.mjs --write` | Write versioned source-index snapshots only when explicitly requested or when generated drift is expected. |
| `scripts/archie-service/validate-contracts.mjs --check` | Present. Validates JSON Schema fixtures and secret-boundary negatives for the schema-only scaffold. |
| `scripts/archie-service/check-secret-boundary.mjs --check` | Scan static output and browser bundle candidates for forbidden provider, GitHub, payment, database, signing, and monitoring secret classes. |
| `scripts/archie-service/run-staging-smoke.mjs --check` | Exercise fixture-backed staging endpoints: answer, unsupported, receipt, status, terms, provider capabilities, issue draft, and rollback. |
| `scripts/archie-service/check-rollback.mjs --check` | Verify service version, source-index snapshot, provider registry, and terms compatibility rollback fixtures. |

Do not add the remaining scripts until implementation is selected. This packet names them so the next code pass has a concrete target.

## Fixture Layout

Fixtures now live in a service-owned test area rather than being mixed into app runtime fixtures.

| Path | Fixture family |
| --- | --- |
| `tests/archie-service/fixtures/manifests/` | Present. Text answer, unsupported answer, speech sync, issue draft, token receipt, privacy state, source context, and issue-mining metadata. |
| `tests/archie-service/fixtures/endpoints/` | Present. `POST /answers` request fixture. |
| `tests/archie-service/fixtures/source-index/` | Present. Source-index snapshot fixture with generated artifact refs, source counts, visibility policy, freshness, and rollback parent. |
| `tests/archie-service/fixtures/provider-registry/` | Present. Answer text, high-quality speech fallback, generated image policy block, cost class, health state, and no-browser-key fixture. |
| `tests/archie-service/fixtures/token-ledger/` | Present. Standalone token receipt with hold, charge, refund, work units, source classes, and no-private-prompt flag. |
| `tests/archie-service/fixtures/actions/` | Present. GitHub issue preflight requiring public-visibility and external-handoff confirmation. |
| `tests/archie-service/fixtures/observability/` | Present. Public status fixture with product-level degradation and no private prompt. |
| `tests/archie-service/fixtures/terms/` | Present. Service terms version-set fixture with legal-review state. |
| `tests/archie-service/fixtures/deployment/` | Present. Staging smoke-plan fixture for static entry, text answer, secret scan, and rollback checks. |

Fixture outputs should be stable enough for regression checks and small enough to review in pull requests.

## Environment Variable Classes

Implementation should define environment variables by class before assigning real values.

| Candidate variable | Class | Requirement |
| --- | --- | --- |
| `ARCHIE_SERVICE_ENV` | `public_service_config` | `development`, `staging`, or `production`. |
| `ARCHIE_PUBLIC_SITE_ORIGIN` | `public_static_config` | Public static site origin, for links and CORS policy. |
| `ARCHIE_SERVICE_ORIGIN` | `public_service_config` | Service app/API origin. |
| `ARCHIE_PUBLIC_STATUS_ROUTE` | `public_service_config` | Public-safe status route. |
| `ARCHIE_SOURCE_INDEX_SNAPSHOT` | `public_service_config` | Active source-index snapshot id or path. |
| `ARCHIE_PROVIDER_REGISTRY_PATH` | `public_service_config` | Path or key for provider capability registry metadata, not provider secrets. |
| `ARCHIE_TERMS_VERSION_SET` | `public_service_config` | Active service/token/privacy/media/GitHub/notebook terms version set. |
| `ARCHIE_TOKEN_LEDGER_MODE` | `public_service_config` | `disabled`, `fixture`, `sandbox`, or `production`. |
| `ARCHIE_GITHUB_HANDOFF_MODE` | `public_service_config` | `prefilled_url`, `sandbox`, or future approved broker mode. |
| `ARCHIE_MODEL_PROVIDER_SECRET_REF` | `server_secret` | Secret reference only; never a browser-visible value. |
| `ARCHIE_SPEECH_PROVIDER_SECRET_REF` | `server_secret` | Secret reference only; high-quality speech capability remains disabled without registry and terms gates. |
| `ARCHIE_IMAGE_PROVIDER_SECRET_REF` | `server_secret` | Secret reference only; generated image capability remains disabled without media gates. |
| `ARCHIE_PAYMENT_SECRET_REF` | `server_secret` | Secret reference only; token payments remain disabled until token/subscription terms and payment provider are selected. |
| `ARCHIE_GITHUB_APP_SECRET_REF` | `server_secret` | Secret reference only; V1 uses prefilled GitHub handoff unless an action broker is approved. |
| `ARCHIE_DATABASE_SECRET_REF` | `server_secret` | Secret reference only; durable notebooks/account history remain disabled until retention/delete/export policy exists. |
| `ARCHIE_MONITORING_WRITE_SECRET_REF` | `operator_secret` | Secret reference only; public status must use redacted read models. |

The suffix `_SECRET_REF` is intentional: deployment code should reference secrets through the host's secret manager rather than embedding secret values in config files.

## First Implementation Stages

| Stage | Allowed work | Still disabled |
| --- | --- | --- |
| `stage_0_docs_only` | Accept priority packets and fixture names. | All service runtime behavior. |
| `stage_1_schema_fixtures` | Add schemas, type fixtures, manifest examples, and validator ordering fixtures. | Runtime AI, provider calls, payment, durable storage, public deployment. |
| `stage_2_source_index_dry_run` | Add source-index builder in check mode and snapshot fixtures from existing static artifacts. | External live source search and public service answers. |
| `stage_3_fixture_backed_service_stub` | Add local/staging endpoint stubs that return fixture-backed manifests and refusals. | Real provider-backed generation and paid work. |
| `stage_4_staging_smoke` | Exercise staging with fixture providers, sandbox token ledger, public-status redaction, and rollback fixtures. | Production launch and real paid capabilities. |
| `stage_5_provider_sandbox` | Add sandbox provider adapters behind provider registry and terms/token gates. | Public beta until launch gates pass. |
| `stage_6_public_beta_candidate` | Enable limited public beta only after source, manifest, token, terms, action, issue-mining, observability, speech, visual, deployment, legal, cost, privacy, and rollback gates pass. | Any capability whose provider, terms, privacy, cost, or media gate is not green. |

## CI Gate Names

The future service pipeline should expose named gates so failures are actionable:

1. `archie_service_contract_schema_check`;
2. `archie_service_source_index_check`;
3. `archie_service_manifest_fixture_check`;
4. `archie_service_provider_registry_fixture_check`;
5. `archie_service_token_privacy_fixture_check`;
6. `archie_service_terms_fixture_check`;
7. `archie_service_action_fixture_check`;
8. `archie_service_issue_mining_fixture_check`;
9. `archie_service_observability_redaction_check`;
10. `archie_service_speech_visual_media_fixture_check`;
11. `archie_service_secret_boundary_check`;
12. `archie_service_staging_smoke_check`;
13. `archie_service_rollback_smoke_check`.

These gates should run after the existing content-integrity checks when service implementation exists.

## Non-Goals

This scaffold must not:

1. choose providers;
2. add provider credentials;
3. add browser-side model calls;
4. enable runtime AI generation;
5. enable real generated speech or images;
6. enable payments, auto-fund, or paid token debits;
7. enable durable notebooks or account history;
8. file GitHub issues through hidden credentials;
9. expose private prompt text in logs, receipts, support summaries, issue mining, public status, or incidents;
10. launch public beta.

## Implementation Handoff

Closure goal:
Expand the Archie service schema-only scaffold into source-index dry-run contracts and validator placeholders without enabling runtime AI generation or public launch.

Use this packet, [service-deployment-architecture.md](service-deployment-architecture.md), [manifest-service-contracts.md](../app-archie-interface/manifest-service-contracts.md), [answer-artifact-manifest.md](../app-archie-interface/answer-artifact-manifest.md), [source-ingestion-retrieval-context-contract.md](../app-archie-interface/source-ingestion-retrieval-context-contract.md), [model-provider-capability-registry-contract.md](../app-archie-interface/model-provider-capability-registry-contract.md), [token-ledger-privacy-contract.md](../app-archie-interface/token-ledger-privacy-contract.md), [action-broker-confirmation-contract.md](../app-archie-interface/action-broker-confirmation-contract.md), [issue-mining-signal-contract.md](../app-archie-interface/issue-mining-signal-contract.md), [observability-public-status-incident-contract.md](../app-archie-interface/observability-public-status-incident-contract.md), and [service-terms-account-policy-contract.md](../app-archie-interface/service-terms-account-policy-contract.md) as source of truth.

Task:
- Add source-index dry-run contract details, validator placeholder coverage, and negative fixtures for browser-key refusal, private-prompt leakage, low-quality speech fallback, unconfirmed GitHub handoff, stale terms, and source-authority inflation.
- Do not add provider integrations, payment integrations, account storage, generated media calls, deployment config, public routes, or production secrets.

Constraints:
- Preserve source authority, claim labels, System Card routing, token authority, action confirmation, privacy retention, and observability redaction.
- Keep priority-only material visibly priority-only.
- Preserve TeX exactly.
