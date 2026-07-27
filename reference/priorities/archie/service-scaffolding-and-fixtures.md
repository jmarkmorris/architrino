# Archie Service Scaffolding And Fixtures

## Workstream Metadata

- Kind: `priority-implementation-plan`
- Status: `active-scaffold`
- Claim level: `priority-only`
- Parent priority: [service-platform.md](service-platform.md)
- Deployment architecture: [service-deployment-architecture.md](service-deployment-architecture.md)
- Deployment option decision: [service-deployment-option-decision.md](service-deployment-option-decision.md)
- Interface product plan: [interface-product-plan.md](interface-product-plan.md)
- V1 product requirements: [v1-product-requirements.md](v1-product-requirements.md)
- Answer artifact manifest: [answer-artifact-manifest.md](answer-artifact-manifest.md)
- Manifest-driven service architecture: [manifest-driven-service-architecture.md](manifest-driven-service-architecture.md)
- Manifest service contracts: [manifest-service-contracts.md](manifest-service-contracts.md)
- Source ingestion and retrieval context contract: [source-ingestion-retrieval-context-contract.md](source-ingestion-retrieval-context-contract.md)
- Model/provider capability registry contract: [model-provider-capability-registry-contract.md](model-provider-capability-registry-contract.md)
- Token ledger and privacy contract: [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md)
- Action broker confirmation contract: [action-broker-confirmation-contract.md](action-broker-confirmation-contract.md)
- Issue mining signal contract: [issue-mining-signal-contract.md](issue-mining-signal-contract.md)
- Observability, public status, and incident contract: [observability-public-status-incident-contract.md](observability-public-status-incident-contract.md)
- Service terms and account policy contract: [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md)

## Purpose

This packet defines the first implementation scaffold and fixture plan for the future Archie question service.

It translates the deployment architecture into concrete module boundaries, schema packages, fixture locations, source-index artifacts, environment variable classes, CI gates, and rollout stages. It now includes one deliberately narrow runtime: a local, public-scope, fixture-backed stdio MCP adapter. It still does not create runtime AI calls, provider credentials, deployment config, payment processing, durable notebooks, public launch behavior, or production service code.

## Current Contract-First Landing

The contract-first scaffold and local fixture MCP surface are now present:

| Surface | Path | Role |
| --- | --- | --- |
| Root contract schema | [schema.json](../../../src/archie-service/contracts/v1/schema.json) | Validates Answer Artifact Manifest, answer request, source-index build input, hashed source-index snapshot and views, bounded MCP request/response and negative suites, source-index negative suite and dry run, service validation plan, endpoint response contracts, provider capability registry, provider-sandbox contracts, provider-gateway contracts, token-ledger sandbox contracts, issue-mining sandbox contracts, action-broker sandbox contracts, token receipt, action preflight, service status, service terms, and deployment smoke-plan fixture shapes. |
| MCP tool-contract checker | [validate-mcp-tool-contracts.mjs](../../../scripts/archie-service/validate-mcp-tool-contracts.mjs) | Checks seven complete request/response pairs, eight cases with a Not advanced disposition, and first-page cursor continuation across `search`, `read`, `topics`, and `neighbors` without starting a server. |
| Local fixture MCP adapter | [fixture-stdio-adapter.mjs](../../../src/archie-service/mcp/fixture-stdio-adapter.mjs) | Maps current stdio JSON-RPC lifecycle, tool discovery, and tool calls onto the bounded pure query engine with public visibility and in-memory snapshot-only request handling. |
| Local fixture MCP launcher | [run-fixture-mcp-server.mjs](../../../scripts/archie-service/run-fixture-mcp-server.mjs) | Reads one fixture snapshot at startup and then reserves stdin/stdout for newline-delimited MCP messages. |
| Local fixture MCP smoke | [check-fixture-mcp-server.mjs](../../../scripts/archie-service/check-fixture-mcp-server.mjs) | Spawns the launcher and checks initialization, all four tool calls, structured/text parity, missing-source behavior, unknown-tool rejection, ping, and no-write/no-network boundaries. |
| Contract validator | [validate-contracts.mjs](../../../scripts/archie-service/validate-contracts.mjs) | Checks all Archie service fixture JSON files against the root schema and runs a simple secret-boundary scan. |
| Source-index builder and checker | [build-source-index.mjs](../../../scripts/archie-service/build-source-index.mjs) | Writes the expected review snapshot in explicit `--write` mode; in `--check` mode it verifies deterministic exact-content, search, graph, and metadata views, live source and artifact hashes, canonical parents, authority and visibility, equation and figure provenance, route dry runs, and cases with a Not advanced disposition without writing. |
| Negative validator script | [validate-negative-validators.mjs](../../../scripts/archie-service/validate-negative-validators.mjs) | Checks the negative validator suite for no-write behavior, no runtime side effects, no browser secrets, no private prompt leakage, and no source-authority upgrades. |
| Endpoint response script | [validate-endpoint-responses.mjs](../../../scripts/archie-service/validate-endpoint-responses.mjs) | Checks fixture-backed endpoint response contracts for `POST /answers`, listen, visualize, issue draft, service terms, and service status without HTTP handlers or runtime side effects. |
| Fixture service selector | [fixture-response-selector.mjs](../../../src/archie-service/http/fixture-response-selector.mjs) | Selects validated response fixtures by endpoint id and request fixture while requiring runtime providers, public routes, durable storage, and payments to stay disabled. |
| Fixture service selector check | [check-fixture-service-stub.mjs](../../../scripts/archie-service/check-fixture-service-stub.mjs) | Exercises fixture-backed response selection for all endpoint response contracts and verifies that unknown endpoints do not advance without side effects. |
| Fixture render model | [fixture-render-model.mjs](../../../src/archie-service/browser-client/fixture-render-model.mjs) | Derives browser-client render surfaces only from selected fixture responses, without side-channel source authority, provider secrets, private prompt text, or runtime side effects. |
| Render contract script | [validate-render-contracts.mjs](../../../scripts/archie-service/validate-render-contracts.mjs) | Checks render contracts for source chips, claim labels, displayed verbatim text, token receipts, action confirmations, speech sync, issue drafts, service terms, and service status. |
| Secret-boundary script | [check-secret-boundary.mjs](../../../scripts/archie-service/check-secret-boundary.mjs) | Scans service fixtures, browser-client helpers, fixture HTTP source, and static-output candidates for forbidden provider, GitHub, payment, database, signing, monitoring, browser-key, provider-payload, and private-prompt secret classes. |
| Staging smoke script | [run-staging-smoke.mjs](../../../scripts/archie-service/run-staging-smoke.mjs) | Exercises the fixture-backed static entry, answer response, terms response, status response, secret-boundary gate, and rollback-readiness expectations locally without network or writes. |
| Rollback smoke script | [check-rollback.mjs](../../../scripts/archie-service/check-rollback.mjs) | Verifies fixture service version, source-index snapshot, provider registry, service terms, and selected response fixtures remain rollback-compatible without network or writes. |
| Provider-sandbox script | [validate-provider-sandbox.mjs](../../../scripts/archie-service/validate-provider-sandbox.mjs) | Checks answer, speech, image, moderation, embedding, and rerank capability gates for enabled state, health, cost class, fallback, quality gate, terms/privacy state, no-browser-key behavior, token work units, source-authority neutrality, and fallback manifest compatibility. |
| Provider-gateway script | [validate-provider-gateway.mjs](../../../scripts/archie-service/validate-provider-gateway.mjs) | Checks sandbox capabilities against no-call provider-gateway request classes, fixture manifest contexts, declared fallbacks, token work units, privacy/terms gates, safe provider execution context, and source-authority neutrality. |
| Token-ledger sandbox script | [validate-token-ledger-sandbox.mjs](../../../scripts/archie-service/validate-token-ledger-sandbox.mjs) | Checks provider-gateway work units against cost-map coverage, estimates, holds, charges, refunds, cap-exceeded blocks, auto-fund-pending blocks, terms blocks, provider-cost-map blocks, and no-payment/no-private-prompt invariants. |
| Issue-mining sandbox script | [validate-issue-mining-sandbox.mjs](../../../scripts/archie-service/validate-issue-mining-sandbox.mjs) | Checks manifest-derived issue signals for duplicate keys, owner lanes, smallest next artifacts, receipt id linkage, action preflight state, report clusters, noise summary, fix queues, no hidden GitHub writes, and no private prompt leakage. |
| Action-broker sandbox script | [validate-action-broker-sandbox.mjs](../../../scripts/archie-service/validate-action-broker-sandbox.mjs) | Checks manifest submit-issue actions and issue-mining draft metadata for confirmation-gated prefilled GitHub URL behavior, unconfirmed/cancelled/terms/credential not advanced states, and no hidden writes or credentials. |
| Node test wrappers | [archie-service-contracts.test.js](../../../tests/archie-service-contracts.test.js), [archie-service-source-index-snapshot.test.js](../../../tests/archie-service-source-index-snapshot.test.js), and [archie-service-mcp-tool-contract.test.js](../../../tests/archie-service-mcp-tool-contract.test.js) | Run the service contract stack plus focused deterministic snapshot, bounded MCP retrieval, cursor, visibility, stale-hash, and priority-authority tests through `node --test`. |
| Manifest fixture example | [text-answer.manifest.v1.json](../../../tests/archie-service/fixtures/manifests/text-answer.manifest.v1.json) | Stores schema-only manifest expectations for source context, claim context, answer body, token receipt, privacy state, actions, issue-mining metadata, and observability context. |
| Manifest fixtures for Not advanced dispositions | [fail-closed](../../../tests/archie-service/fixtures/manifests/fail-closed/provider-browser-key.manifest.v1.json) | Stores manifest-shaped refusal/fallback responses for browser-key refusal, private-prompt leakage, low-quality speech fallback, unconfirmed GitHub handoff, stale terms, and source-authority inflation. |
| Endpoint response contracts | [endpoint-response-contracts.v1.json](../../../tests/archie-service/fixtures/endpoints/endpoint-response-contracts.v1.json) | Stores fixture-backed response contracts for answer creation, listen, visualize, issue draft, service terms, and service status endpoints. |
| Render contract fixture | [render-contracts.v1.json](../../../tests/archie-service/fixtures/render/render-contracts.v1.json) | Stores selected-response-only render expectations for answer, listen, visualize refusal, issue draft, service terms, and service status responses. |
| Secret-boundary plan | [secret-boundary-plan.v1.json](../../../tests/archie-service/fixtures/security/secret-boundary-plan.v1.json) | Stores scan targets, forbidden secret classes, secret-reference suffix policy, and no-browser-key/no-provider-payload/no-private-prompt-expansion requirements. |
| Static-output fixture | [service-entry.fixture.html](../../../tests/archie-service/fixtures/static-output/service-entry.fixture.html) | Stores a public static entry candidate with only service terms/status routes and disabled provider/payment flags. |
| Source-index dry-run fixture | [source-index-dry-run.v1.json](../../../tests/archie-service/fixtures/source-index/source-index-dry-run.v1.json) | Stores schema-only route-resolution expectations for markdown sections, sphere portions, full-document spheres, app guides, System Card routes, priority exclusion, and missing-route behavior. |
| Negative validator suite | [negative-validator-suite.v1.json](../../../tests/archie-service/fixtures/validators/negative-validator-suite.v1.json) | Stores schema-only check-mode builder expectations and cases with a Not advanced disposition for browser-key refusal, private-prompt leakage, low-quality speech fallback, unconfirmed GitHub handoff, stale terms, and source-authority inflation. |
| Deployment fixture example | [staging-smoke-plan.v1.json](../../../tests/archie-service/fixtures/deployment/staging-smoke-plan.v1.json) | Stores schema-only deployment smoke expectations for static entry, text answer, secret scan, and rollback checks. |
| Rollback smoke fixture | [rollback-smoke-plan.v1.json](../../../tests/archie-service/fixtures/deployment/rollback-smoke-plan.v1.json) | Stores service-version, source-index, provider-registry, terms, and endpoint-response compatibility expectations for local rollback checks. |
| Provider sandbox contracts | [provider-sandbox-contracts.v1.json](../../../tests/archie-service/fixtures/provider-registry/provider-sandbox-contracts.v1.json) | Stores provider-sandbox gate expectations for answer text, high-quality speech, generated image, moderation, retrieval embedding, and rerank capabilities. |
| Provider gateway contracts | [provider-gateway-contracts.v1.json](../../../tests/archie-service/fixtures/provider-registry/provider-gateway-contracts.v1.json) | Stores no-call provider-gateway expectations that map answer, speech, image, moderation, retrieval embedding, and rerank requests to fixture manifest contexts, declared fallbacks, or safe internal contexts. |
| Token-ledger sandbox contracts | [token-ledger-sandbox.v1.json](../../../tests/archie-service/fixtures/token-ledger/token-ledger-sandbox.v1.json) | Stores provider-gateway accounting expectations for normal answer refunds, high-quality speech charges, terms blocks, provider cost-map blocks, auto-fund-pending blocks, and cap-exceeded blocks. |
| Issue-mining sandbox contracts | [issue-mining-sandbox.v1.json](../../../tests/archie-service/fixtures/issue-mining/issue-mining-sandbox.v1.json) | Stores manifest-derived issue signal expectations for unsubmitted drafts, unsupported source gaps, private exclusions, terms blocks, ambiguous owner handoffs, fixture candidates, report clusters, noise summaries, and fix queues. |
| Action-broker sandbox contracts | [action-broker-sandbox.v1.json](../../../tests/archie-service/fixtures/actions/action-broker-sandbox.v1.json) | Stores confirmation-gated submit-issue handoff expectations for confirmed prefilled URLs, unconfirmed no-run, cancelled no-run, stale-terms verification incomplete cases, and credentialed-write cases with a Not advanced disposition. |

Current validation command:

```bash
node scripts/archie-service/validate-contracts.mjs --check
node scripts/archie-service/build-source-index.mjs --check
node scripts/archie-service/validate-mcp-tool-contracts.mjs --check
node scripts/archie-service/check-fixture-mcp-server.mjs --check
node scripts/archie-service/validate-negative-validators.mjs --check
node scripts/archie-service/validate-endpoint-responses.mjs --check
node scripts/archie-service/check-fixture-service-stub.mjs --check
node scripts/archie-service/validate-render-contracts.mjs --check
node scripts/archie-service/check-secret-boundary.mjs --check
node scripts/archie-service/run-staging-smoke.mjs --check
node scripts/archie-service/check-rollback.mjs --check
node scripts/archie-service/validate-provider-sandbox.mjs --check
node scripts/archie-service/validate-provider-gateway.mjs --check
node scripts/archie-service/validate-token-ledger-sandbox.mjs --check
node scripts/archie-service/validate-issue-mining-sandbox.mjs --check
node scripts/archie-service/validate-action-broker-sandbox.mjs --check
node --test tests/archie-service-source-index-snapshot.test.js
node --test tests/archie-service-mcp-tool-contract.test.js
node --test tests/archie-service-fixture-mcp-server.test.js
node --test tests/archie-service-contracts.test.js
```

This is not a production or hosted service runtime. The local MCP process is a test adapter over one fixture snapshot; the broader schemas and fixtures remain the contract with surface requiring verification before advancement that future endpoint handlers, provider adapters, payment flows, durable storage, deployment config, or public routes must satisfy.

## Scaffold Principle

The first implementation pass should be contract-first.

Before any provider-backed answer generation exists, the repo should be able to validate:

1. a manifest schema;
2. service endpoint request/response schemas;
3. source-index snapshot, exact-content view, bounded MCP tool pairs, and dry-run route-resolution shape;
4. provider capability registry shape;
5. token ledger receipt shape;
6. action broker confirmation shape;
7. observability/public-status/incident shape;
8. service terms and account policy shape;
9. negative validator fixture shape;
10. endpoint response fixture shape;
11. render contract fixture shape;
12. secret-boundary fixture shape and scan behavior;
13. deployment smoke fixtures and rollback fixtures;
14. provider-sandbox capability gate fixtures;
15. provider-gateway no-call boundary fixtures;
16. token-ledger sandbox accounting fixtures;
17. issue-mining signal sandbox fixtures;
18. action-broker confirmation and handoff fixtures.

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
| `src/archie-service/http/` | Endpoint handlers after schemas and validators exist. The first present module selects fixture-backed responses only and does not expose public routes. |
| `src/archie-service/browser-client/` | Future service UI shell, manifest renderer, source chips, claim labels, token wallet display, action confirmations, audio player, visual artifact display, and status display. The first present helper derives fixture-backed render models only from selected responses. |

Most paths remain targets, not current files. If implementation chooses a separate package or service repository, the same ownership split should be preserved.

## Future Script Targets

The first script layer should produce and verify artifacts without running runtime AI.

| Script | Purpose |
| --- | --- |
| `scripts/archie-service/build-source-index.mjs --check` | Present. Rebuilds in memory and verifies deterministic snapshot equality, input-order invariance, source and artifact hashes, exact-content/search/graph/metadata view hashes, route dry runs, canonical parents, visibility, source authority, metadata provenance, and ten cases with a Not advanced disposition without writing artifacts. |
| `scripts/archie-service/build-source-index.mjs --write` | Present. Writes the versioned review fixture, then runs the same deterministic and checks required for advancement. Use only for an explicit contract/source change or expected generated drift. |
| `scripts/archie-service/validate-mcp-tool-contracts.mjs --check` | Present. Recomputes seven bounded tool responses, eight cases with a Not advanced disposition, and cursor continuation for all four tools without starting a server. |
| `scripts/archie-service/validate-mcp-tool-contracts.mjs --write` | Present. Regenerates the expected request/response fixture after an explicitly accepted tool-contract or snapshot change, then applies the same checks. |
| `scripts/archie-service/check-fixture-mcp-server.mjs --check` | Present. Spawns the local stdio adapter and checks initialization, static tool discovery, all four calls, missing-source and unknown-tool errors, ping, snapshot immutability, and static no-network/no-write boundaries. |
| `scripts/archie-service/check-fixture-mcp-server.mjs --write` | Present. Regenerates the expected stdio transcript after an explicitly accepted adapter, protocol, tool, or snapshot change, then applies the same checks. |
| `scripts/archie-service/validate-contracts.mjs --check` | Present. Validates JSON Schema fixtures and secret-boundary negatives for the schema-only scaffold. |
| `scripts/archie-service/validate-negative-validators.mjs --check` | Present. Verifies not advanced negative-validator cases for browser-key refusal, private-prompt leakage, low-quality speech fallback, unconfirmed GitHub handoff, stale terms, and source-authority inflation. |
| `scripts/archie-service/validate-endpoint-responses.mjs --check` | Present. Verifies fixture-backed endpoint response contracts for answer, listen, visualize, issue draft, service terms, and service status responses without enabling runtime service behavior. |
| `scripts/archie-service/check-fixture-service-stub.mjs --check` | Present. Verifies local fixture-backed response selection for every endpoint response contract and controlled failure for unknown endpoints without HTTP handlers or side effects. |
| `scripts/archie-service/validate-render-contracts.mjs --check` | Present. Verifies selected-response-only render surfaces for source chips, token receipts, action confirmations, speech sync, issue drafts, service terms, and service status. |
| `scripts/archie-service/check-secret-boundary.mjs --check` | Present. Scans fixture JSON, browser-client helpers, fixture HTTP source, and static-output candidates for forbidden provider, GitHub, payment, database, signing, monitoring, browser-key, provider-payload, and private-prompt secret classes. |
| `scripts/archie-service/run-staging-smoke.mjs --check` | Present. Exercises fixture-backed static entry, answer, terms, status, secret-boundary, and rollback-readiness expectations without network, writes, public routes, providers, payments, durable storage, or production secrets. |
| `scripts/archie-service/check-rollback.mjs --check` | Present. Verifies service version, source-index snapshot, provider registry, service terms, selected response fixtures, side-effect-disabled invariants, and private-prompt/no-browser-key boundaries. |
| `scripts/archie-service/validate-provider-sandbox.mjs --check` | Present. Verifies provider-sandbox capability gates for answer, speech, image, moderation, embedding, rerank, token cost, fallback, privacy, terms, and no-browser-key boundaries. |
| `scripts/archie-service/validate-provider-gateway.mjs --check` | Present. Verifies no-call provider-gateway request classes, fixture manifest contexts, declared fallbacks, safe internal contexts, token work units, privacy/terms gates, and source-authority neutrality. |
| `scripts/archie-service/validate-token-ledger-sandbox.mjs --check` | Present. Verifies provider-gateway work units can produce estimates, holds, charges, refunds, cap-exceeded blocks, auto-fund-pending blocks, terms blocks, and provider-cost-map blocks without payments or private prompt leakage. |
| `scripts/archie-service/validate-issue-mining-sandbox.mjs --check` | Present. Verifies manifest-derived issue signals, action preflight inheritance, receipt id linkage, clusters, noise, fix queues, private-prompt exclusion, and no hidden GitHub writes. |
| `scripts/archie-service/validate-action-broker-sandbox.mjs --check` | Present. Verifies confirmation-gated prefilled GitHub handoff, unconfirmed/cancelled/terms/credential cases with a Not advanced disposition, and no hidden writes, credentials, payments, durable storage, private prompts, or source-authority effects. |

Do not add the remaining scripts until implementation is selected. This packet names them so the next code pass has a concrete target.

## Fixture Layout

Fixtures now live in a service-owned test area rather than being mixed into app runtime fixtures.

| Path | Fixture family |
| --- | --- |
| `tests/archie-service/fixtures/manifests/` | Present. Text answer, unsupported answer, speech sync, issue draft, token receipt, privacy state, source context, issue-mining metadata, and not advanced refusal/fallback manifests for each negative validator case. |
| `tests/archie-service/fixtures/endpoints/` | Present. `POST /answers` request fixture and endpoint response contract fixture for answer, listen, visualize, issue draft, service terms, and service status routes. |
| `tests/archie-service/fixtures/render/` | Present. Render contract fixture for selected response rendering of source chips, claim labels, displayed verbatim text, token receipts, action confirmations, speech sync, issue drafts, service terms, and service status. |
| `tests/archie-service/fixtures/security/` | Present. Secret-boundary scan plan for fixture JSON, browser-client helpers, fixture HTTP source, and static-output candidates. |
| `tests/archie-service/fixtures/static-output/` | Present. Static entry candidate fixture with public terms/status links and disabled provider/payment flags. |
| `tests/archie-service/fixtures/source-index/` | Present. Build input, generated hashed snapshot, ten-case negative suite, and route dry run covering representative source classes, exact-content/search/graph/metadata views, canonical parents, visibility, source authority, equations, figures, generated artifacts, priority exclusion, and missing routes. |
| `tests/archie-service/fixtures/mcp/` | Present. Seven complete bounded request/response pairs, eight not advanced request/snapshot mutations, and one subprocess stdio transcript covering initialization, discovery, all four calls, errors, and ping. |
| `tests/archie-service/fixtures/provider-registry/` | Present. Provider registry, provider-sandbox contracts, and provider-gateway contracts for answer text, high-quality speech fallback, generated image policy block, moderation, retrieval embedding, rerank, cost class, health state, fallback, privacy/terms state, no-call adapter behavior, and no-browser-key fixtures. |
| `tests/archie-service/fixtures/token-ledger/` | Present. Standalone token receipt plus token-ledger sandbox contracts with hold, charge, refund, work units, source classes, cap-exceeded, auto-fund-pending, terms-block, provider-cost-map, payment-disabled, and no-private-prompt expectations. |
| `tests/archie-service/fixtures/issue-mining/` | Present. Issue-mining sandbox contracts with manifest-derived safe inputs, public-link fixtures, excluded drafts/private material, owner lanes, clusters, noise summaries, and fix queues. |
| `tests/archie-service/fixtures/actions/` | Present. GitHub issue preflight and action-broker sandbox contracts requiring public-visibility and external-handoff confirmation, prefilled URL behavior, cancelled/unconfirmed no-run behavior, and no hidden write behavior. |
| `tests/archie-service/fixtures/validators/` | Present. Negative validation plan for check-mode source-index builder expectations, browser-key refusal, private-prompt leakage, low-quality speech fallback, unconfirmed GitHub handoff, stale terms, and source-authority inflation. |
| `tests/archie-service/fixtures/observability/` | Present. Public status fixture with product-level degradation and no private prompt. |
| `tests/archie-service/fixtures/terms/` | Present. Service terms version-set fixture with legal-review state. |
| `tests/archie-service/fixtures/deployment/` | Present. Staging smoke-plan fixture and rollback smoke-plan fixture for static entry, text answer, secret scan, source-index, provider-registry, terms, selected response, and rollback compatibility checks. |

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
| `stage_2_source_index_dry_run` | Add source-index builder in check mode, snapshot fixtures from existing static artifacts, and route-resolution dry-run fixtures that feed manifest `sourceContext`. | External live source search and public service answers. |
| `stage_3_fixture_backed_service_stub` | Add local/staging endpoint stubs that return fixture-backed manifests and refusals. | Real provider-backed generation and paid work. |
| `stage_4_staging_smoke` | Exercise staging with fixture providers, sandbox token ledger, public-status redaction, and rollback fixtures. | Production launch and real paid capabilities. |
| `stage_5_provider_sandbox` | Add sandbox provider adapters, no-call provider-gateway boundaries, token-ledger sandbox accounting, issue-mining signal fixtures, and action-broker handoff fixtures behind provider registry and terms/token/action gates. | Public beta until launch gates pass. |
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
13. `archie_service_rollback_smoke_check`;
14. `archie_service_provider_sandbox_check`;
15. `archie_service_provider_gateway_no_call_check`;
16. `archie_service_token_ledger_sandbox_check`;
17. `archie_service_issue_mining_sandbox_check`;
18. `archie_service_action_broker_sandbox_check`.

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
Add observability/public-status sandbox fixtures that consume manifest, provider, token-ledger, issue-mining, and action-broker safe event classes to produce redacted status and incident records without private prompt text, provider payloads, account history, credentials, or source-authority changes.

Use this packet, [service-deployment-architecture.md](service-deployment-architecture.md), [manifest-service-contracts.md](manifest-service-contracts.md), [answer-artifact-manifest.md](answer-artifact-manifest.md), [source-ingestion-retrieval-context-contract.md](source-ingestion-retrieval-context-contract.md), [model-provider-capability-registry-contract.md](model-provider-capability-registry-contract.md), [token-ledger-privacy-contract.md](token-ledger-privacy-contract.md), [action-broker-confirmation-contract.md](action-broker-confirmation-contract.md), [issue-mining-signal-contract.md](issue-mining-signal-contract.md), [observability-public-status-incident-contract.md](observability-public-status-incident-contract.md), and [service-terms-account-policy-contract.md](service-terms-account-policy-contract.md) as source of truth.

Task:
- Add observability/public-status sandbox fixtures and a check-mode observability script that verifies safe event classes, redacted status summaries, incident records, public-status visibility, and no private prompt/provider payload/account-history leakage.
- Require observability to consume only safe ids/classes from manifests, provider registry/gateway, token receipts, issue-mining reports, and action-broker results.
- Keep the observability pass no-network, no-write, fixture-backed, and local, with hidden GitHub writes, provider calls, payments, durable storage, deployment config, public routes, and production secrets disabled.
- Do not add provider integrations, payment integrations, account storage, generated media calls, deployment config, public routes, or production secrets.

Constraints:
- Preserve source authority, claim labels, System Card routing, token authority, action confirmation, privacy retention, and observability redaction.
- Keep priority-only material visibly priority-only.
- Preserve TeX exactly.
