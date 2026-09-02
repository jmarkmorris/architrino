# Archie Service MCP Adapter Work Log

This file is the chronological work log for the Archie-service MCP adapter. Use it for dated implementation status, validation evidence, failed paths, deployment measurements, adjudications, and handoffs. Keep provisional ideas in [brainstorming.md](brainstorming.md), strategy and status in [priorities.md](priorities.md), accepted executable tasks in [work-queue.md](work-queue.md), and stable architecture or contract detail in focused sibling files.

## Log Entries

### 2026-09-02 — Reclassified as an Archie-service protocol adapter

- Moved this preserved packet beneath the Archie service owner and removed its separate application-inventory identity.
- Preserved the MCP implementation under `src/archie-service/mcp`, the fixture and test suites under `tests/archie-service`, and all prior conformance receipts.
- Added explicit fail-closed remote-contract boundaries against user-facing application classification, static-browser publication, local-tool access, live repository-state access, and credential access.

Plainly: MCP remains a controlled integration boundary for software clients; it is not a website application and it does not expose the local workspace.

### 2026-09-02 — MCP-002 bounded graph walk closed

- Selected one minimal higher-order primitive, `walk`, rather than adding overlapping `trace`, `compare`, `related`, `context`, or `learning_path` operations without separate needs and semantics. The accepted operation is deterministic breadth-first traversal over only declared snapshot edges.
- Added exact depth 1–3, 256-materialized-node, 20-record-page, and 32,768-byte response limits; deterministic `edgeId` ordering and first-shortest-path selection; visited-set cycle suppression; scope-bound pagination; and explicit `traversal_node_limit` disclosure.
- Required every traversed node and edge-evidence source to be visible in the authorized request scope. Public traversal cannot cross hidden material, while authorized priority results retain `priority_only` authority and `development_status` visibility.
- Added a separately authored cyclic and converging graph fixture plus focused checks for two-page order, path provenance, cycle suppression, mixed visibility, operator authority, cursor mismatch, depth rejection, response size, and the 256-node hard ceiling.
- Exposed `walk` through the shared stdio and stateless Streamable HTTP adapters. The full-corpus smoke measured a real two-hop `routes_to` then `contains` path; the loopback suite called the same tool. Named-client receipts for MCP-001 remain evidence for the earlier four-tool surface and do not claim direct ChatGPT or Codex invocation of `walk`.
- Measured validation: the pure contract checker passed 8 positive and 9 fail-closed cases; 11 focused contract/adapter tests passed; full-corpus stdio passed; 9 loopback HTTP tests passed; the remote contract retained all 19 negative cases; and the service schema accepted 39 fixtures.
- Removed completed MCP-002 from the queue and renumbered MCP-003 to item 1. The owner remains dormant-deferred; no semantic retrieval, model call, remote deployment, or theory claim advanced.

Plainly: the server can now follow a small, auditable chain of already-recorded links without looping forever or crossing hidden material. It reports exactly which stored edges formed the path, keeps every source's original authority label, and stops at explicit limits; it does not reason out or validate a scientific connection.

### 2026-09-02 — MCP-001 named-client conformance closed

- Captured the operator-supplied ChatGPT-mode result for the manually submitted five-case full-corpus HTTP prompt. `topics`, `search`, `read`, and `neighbors` returned typed `ok`; a second `read` for `source.missing-full-corpus-conformance` returned `not_found` with `SOURCE_NOT_FOUND` and no source.
- Corroborated the named-client report against the loopback server telemetry: one pseudonymous principal issued the consecutive tool order `topics`, `search`, `read`, `neighbors`, `read`; all five exchanges returned HTTP 200 against snapshot `source_snapshot_full_corpus_v1_6ab8e3d3608d946ccde0`. The safe server log does not retain arguments or structured response bodies, so those remain operator-supplied client evidence.
- Added the [ChatGPT full-corpus conformance receipt](chatgpt-desktop-http-full-corpus-conformance-2026-09-02.json) and removed completed MCP-001 from the work queue. MCP-002 and MCP-003 remain parked; no remote-deployment or theory claim advanced.

Plainly: both required named client surfaces called the bounded local HTTP service successfully, and the missing-source case failed closed. MCP-001 is complete without reactivating the rest of the archived lane.

### 2026-09-02 — Priority owner archived

- Moved the complete then-separate MCP priority packet under `dormant-deferred` at operator direction. The read-only service contracts, implementation notes, and conformance receipts remain preserved.
- MCP-001 is parked, not complete: Codex fixture and full-corpus HTTP calls passed, and ChatGPT initialization and tool discovery were measured, but direct ChatGPT calls to the four tools and typed missing-source behavior remain unmeasured.

### 2026-09-02 - Full-Corpus Codex HTTP Pass And ChatGPT Discovery Boundary

- Confirmed the full-corpus source-index check now passes over 2,042 records and snapshot `source_snapshot_full_corpus_v1_6ab8e3d3608d946ccde0`.
- Rebound the deployment-contract fixture to that current snapshot after the focused HTTP test exposed `SNAPSHOT_IDENTITY_MISMATCH`; the remote-contract checker, its 19 negative cases, and all 9 focused HTTP tests then passed.
- Ran bundled Codex CLI `0.152.0` ephemerally with user configuration ignored, a read-only sandbox, command-line-only HTTP configuration, and a temporary bearer token. `topics`, `search`, `read`, and `neighbors` returned typed `ok`; the missing read returned `not_found` with `SOURCE_NOT_FOUND`. The [full-corpus receipt](codex-http-full-corpus-conformance-2026-09-02.json) records the exact boundary.
- Added a temporary shared HTTP entry and switched a fresh desktop window to ChatGPT. Direct server events establish successful initialization and tool listing by ChatGPT desktop `26.831.20005`, but no prompt was submitted and no tool call is claimed. The [discovery receipt](chatgpt-desktop-http-discovery-2026-09-02.json) records that narrower result.
- The desktop surface switch accidentally submitted an existing operator draft as a new Codex task. The task was stopped, inspected, and archived; its only completed actions were read-only status, memory, and guidance reads, and it made no repository edits. A later focus jump appended `/mcp` to another draft; only those four appended characters were targeted for removal. UI automation was then stopped rather than risk further draft interference.
- Removed the temporary HTTP entry, stopped both loopback servers, and verified that the pre-existing `architrino_fixture` stdio entry remains enabled and unchanged.

Plainly: the current full corpus now passes through Codex over HTTP, and ChatGPT desktop can discover the HTTP server. MCP-001 remains open only because ChatGPT has not yet called the four tools and exercised the missing-source response.

### 2026-09-02 - Codex Streamable HTTP Fixture Conformance Passing

- Verified the current official OpenAI MCP documentation: Codex-host configuration supports Streamable HTTP through `url` and `bearer_token_env_var`, while ChatGPT desktop and Codex share MCP configuration on the same host.
- Launched the repository's six-source immutable HTTP fixture on IPv4 loopback with a temporary bearer token, then ran bundled Codex CLI `0.152.0` in an ephemeral read-only session with user configuration ignored and command-line-only MCP overrides.
- Measured typed `ok` responses for `topics`, `search`, `read`, and `neighbors`; the missing-source read returned structured `SOURCE_NOT_FOUND` with no invented content and no transport error. Retained the exact boundary in [the machine-readable receipt](codex-http-fixture-conformance-2026-09-02.json), then stopped the server.
- Repaired the fixture input from the removed System Card `answering-posture` anchor to `understanding-the-evidence`, updated the moved dormant Archie priority route, and rebound the deployment contract to the checked-in full-corpus snapshot identity. The focused HTTP suite then passed 9/9, including the outside-repository launcher, and the deployment fixture validator passed all 19 negative cases.
- Repeated the Codex run against a six-source snapshot built in memory from the repaired current source input. Snapshot `941a6ecec4dbfcb4ffc68a0df9c107ccfdc841fd7977df471d3702e798a7fd27` returned typed `ok` for all four tools and `SOURCE_NOT_FOUND` for the missing source. The loopback server was stopped after the run; no generated repository artifact or persistent client configuration was written.
- MCP-001 remains in progress: `build-full-corpus-source-index.mjs --check` still reports generated drift, current full-corpus Codex HTTP remains unmeasured, and ChatGPT desktop HTTP requires a fresh ChatGPT surface.

Plainly: Codex now passes against a fixture built from current source input. The current full corpus and ChatGPT desktop remain separate, visible gaps.

### 2026-07-20 - Priority Packet Seeded

- Created the original standalone MCP priority packet from the operator-provided Architrino MCP architecture proposal.
- Preserved the central decision: the repository remains authoritative, GitHub Pages remains the human interface, and a separately deployed MCP service reads immutable generated indexes.
- Aligned the generic starting directory sketch with the live repository: authored corpus under `content/markdown/aaa/`, scenes under `content/scenes/`, graph artifacts under `content/graph/`, and existing service contracts and source-index checks under the Archie service paths.
- Corrected the web math-rendering reference from MathJax to the repository's KaTeX target.
- Kept the hosting order as an unverified candidate ranking because provider pricing, limits, and protocol support are time-sensitive.
- Narrowed V1 to `search`, `read`, `topics`, and `neighbors`; staged graph composition tools and semantic retrieval behind explicit contracts and evidence.
- Added boundaries requiring verification before advancement for source authority, visibility, priority-material exclusion, canonical parents, proof-status routing, pagination, truncation, and missing sources.
- Left the workstream unranked. Its first unresolved object is the executable `source_index_contract`; a future full priority-scoring pass must compare it with every live bucket before assigning numeric rank, value, cost, or ROI.
- Current repository inspection found an existing check-only Archie source-index scaffold and fixture contracts, but no production MCP runtime or production index writer. That makes reuse of the existing source classes and service boundary the first integration constraint.

### 2026-07-20 - Source Index Snapshot V1 Fixture-Backed

- Completed the first `source_index_contract` and its deterministic fixture builder in [source-index-snapshot-v1.md](source-index-snapshot-v1.md). Removed the completed source-index contract and builder objects from the live queue and promoted `mcp_tool_contract_v1` to local item `1`.
- Added `archie-source-index-build-input/v1` and expanded `archie-source-index-snapshot/v1` with schema versions, SHA-256 rules, canonical JSON normalization, generated-artifact digests, per-source file and section hashes, search/graph/metadata views, per-view hashes, and one enclosing snapshot hash.
- Added six representative source records spanning published corpus, generated reading copy, scene route, app guide, System Card reference, and priority material; added two typed graph edges, one exact TeX record, and one source-linked figure.
- Added ten cases with a Not advanced disposition for missing paths, duplicate ids, missing or wrong-class parents, priority authority inflation, priority public-visibility leakage, false equation provenance, false figure provenance, stale source hashes, and altered view hashes.
- The builder normalizes source records, graph edges, metadata records, aliases, and keywords before hashing. Reversing all declared input arrays produces the same snapshot hash.
- Measured validation: the source-index check passed with six source records, two graph edges, two metadata records, and ten negative cases; the service schema validator accepted all 32 fixtures; the combined Archie service and focused snapshot tests passed all 17 tests; and the priority-ranking validator kept all 37 ranked rows aligned.
- The first combined test run caught a compatibility-only failure because the builder's success text no longer contained the established `Archie source-index check passed` phrase. The output was restored to the existing contract, and the full combined test rerun passed.
- The repository-wide content-integrity run passed content/reference validation, then was not advanced because `content/graph/scene_graph.json` is out of date against the current ambient scene sources: the checker computed 587 nodes and 1,352 edges. No generated write was run. The owning repair command is `node scripts/build-scene-graph.mjs --write`; after that repair is explicitly accepted, rerun its check and then regenerate and recheck the source-index snapshot because its generated-artifact digest will change.
- Scope boundary: this is a fixture-backed contract and representative builder, not a complete production corpus index, MCP runtime, client conformance result, deployment, or launch artifact.

### 2026-07-20 - MCP Tool Contract V1 Fixture-Backed

- Completed `mcp_tool_contract_v1` in [mcp-tool-contract-v1.md](mcp-tool-contract-v1.md), removed it from the live queue, and promoted `fixture_backed_mcp_server` to local item `1`.
- Added typed `archie-mcp-tool-request/v1` and `archie-mcp-tool-response/v1` envelopes for `search`, `read`, `topics`, and `neighbors`, with exact tool-specific arguments, snapshot provenance, source chips, result/page unions, explicit error statuses, and no result data on responses with a Not advanced disposition.
- Implemented a pure snapshot-query engine with 256-character queries, 512-character ids/routes, 20-record pages, 256-to-8,000-character read pages, a 32,768-byte response ceiling, unique bounded filters, canonical-source search preference, exact-content reads, non-routing topic enumeration, and direct typed graph neighbors.
- Bound opaque pagination cursors to snapshot id, tool, visibility scope, all non-cursor arguments, and the next record or Unicode-character offset. SHA-256 provides deterministic scope integrity only; it is not represented as authentication.
- Added seven complete request/response fixtures covering all four tools, missing-source reads, public priority exclusion, authorized operator/developer priority access, record truncation, content truncation, and continuation cursors.
- Added eight cases with a Not advanced disposition covering excess record and content limits, snapshot mismatch, unauthorized visibility, malformed cursor, stale snapshot, unsupported edge type, and duplicate filters.
- Corrected a supply-contract defect discovered while specifying `read`: the prior snapshot held selection hashes but not selected content, so snapshot-only reads were impossible. Added a hashed `archie-source-content-view/v1` with exact content and content type for all six fixture sources; after the owning source-index specification update, the enclosing snapshot hash is `0f37ac2a582bccb817591a261fd0530e508943bb9279309c7ec861e656ce880c`.
- The first MCP fixture write run exposed a checker bookkeeping defect: continuation checks still referenced the pre-write in-memory cases whose expected responses were null. The checker now rebuilds its case map after writing; the rerun passed.
- Measured validation at this point: the MCP checker passed seven positive and eight negative cases; the schema validator accepted 34 fixtures; and the combined MCP, source-index, and Archie service test run passed all 22 tests.
- The repository-wide freshness gate remains not advanced at the pre-existing generated scene-graph drift: content/reference validation passes, then `content/graph/scene_graph.json` reports 587 nodes and 1,352 edges and is out of date. No scene-graph write was run. After the owning drift is explicitly repaired with `node scripts/build-scene-graph.mjs --write`, rerun its strict check, the source-index `--write`/`--check`, and the MCP tool-contract `--write`/`--check` because both downstream fixtures bind the graph digest or snapshot hash.
- Evidence boundary: fixture agreement is implementation conformance to the documented V1 rules, not independent evidence that the chosen ranking weights or ceilings are optimal. No MCP protocol server, transport, client compatibility result, authentication, rate limiting, deployment, or public launch behavior was created.

### 2026-07-20 - Local Fixture MCP Adapter Passing

- Completed `fixture_backed_mcp_server` in [local-fixture-mcp-adapter.md](local-fixture-mcp-adapter.md), removed it from the live queue, and promoted `transport_and_client_conformance` to local item `1`.
- Checked the current official MCP lifecycle, stdio transport, and tools specifications. Revision `2025-11-25` was the latest published revision found on 2026-07-20; it requires initialization first, newline-delimited JSON-RPC on stdio, tools capability declaration, `tools/list`, and `tools/call`.
- Found no root Node package manifest or lockfile in the live repository. Implemented the narrow local protocol surface with Node built-ins rather than adding an unowned SDK dependency; official SDK parity remains the next independent conformance target.
- Added a public-scope stdio adapter with initialize/initialized state, static tools capability, `tools/list`, `tools/call`, ping, JSON-RPC errors, client-friendly defaults, structured content plus matching text fallback, and read-only/non-destructive/idempotent/closed-world tool annotations.
- Added a launcher that resolves the repository root from its own location, reads exactly one source-index fixture snapshot at startup, verifies the snapshot and view hashes in memory, and then performs no source-repository read, write, network request, model call, action, or external handoff per request.
- Added a subprocess transcript that initializes the server, lists and calls all four tools, checks a missing-source tool error, rejects an unknown `write` tool, and pings the server. The checker also verifies snapshot size/mtime stability and scans the adapter boundary for filesystem, HTTP, network, child-process, fetch, and write surfaces.
- The first subprocess smoke passed. A follow-up coverage review found that only `search` and a missing `read` crossed the protocol boundary, even though all four tools were listed. The transcript was strengthened to call successful `search`, `read`, `topics`, and `neighbors` operations plus the missing read.
- Measured validation after the final local-launch coverage addition: the stdio checker passed, the service schema accepted 35 fixtures, and the combined service, source-index, tool-contract, and local-server run passed all 27 tests.
- Local-test verdict: this artifact is sufficient to start the server under a local stdio MCP client and to test it with the owned subprocess smoke. It is not yet evidence that Codex, Claude, ChatGPT, or the official SDK accepts every detail.
- The repository-wide freshness gate remains separately blocked by the existing generated scene-graph drift. The local fixture server is testable against its internally valid snapshot, but that snapshot is not publishable until the upstream generated artifact is repaired and all downstream fixtures are regenerated.

### 2026-07-20 - Official SDK And Codex Conformance Passing

- Added [client-conformance.md](client-conformance.md) to keep independent client evidence separate from the adapter implementation specification.
- Checked the current official TypeScript SDK repository and package state. The V2 main branch is currently identified as pre-alpha, while V1 remains recommended for production; the measured pass used `@modelcontextprotocol/sdk@1.29.0` plus `zod@4` in a temporary directory, without adding a repository package manifest or dependency.
- Added `check-fixture-mcp-sdk-conformance.mjs`. The official SDK client initialized the server, negotiated tools, listed exactly `search`, `read`, `topics`, and `neighbors`, called all four successfully, observed `SOURCE_NOT_FOUND` as a tool-level error, pinged, and closed cleanly.
- The first real Codex run was not advanced before session creation with `tools/list has unsupported params`. Inspection of the official SDK request schemas showed that `_meta` is a standard optional field on base request parameters.
- Corrected the adapter to accept object-valued `_meta` on `tools/list` and `tools/call`, reject malformed metadata and other unsupported top-level parameters, and continue rejecting task-augmented calls. Added `_meta` coverage to the subprocess transcript and focused lifecycle test.
- The repeated ephemeral Codex run used bundled client `0.145.0-alpha.18`, required only `architrino_fixture`, and completed all four MCP calls with typed structured content and `status: ok`. The ordinary npm-installed `codex` wrapper was separately broken because its architecture-specific binary was missing; the installed ChatGPT app's bundled Codex executable was healthy.
- Checked the fresh OpenAI Codex manual and the installed ChatGPT desktop Settings surface. Current documentation says ChatGPT desktop supports local stdio MCP and shares its MCP configuration with Codex, while ChatGPT web does not read local Codex configuration. Direct ChatGPT desktop tool invocation remains unmeasured because an already-running task cannot reload a newly added connection; a fresh chat or connection restart is required.
- Queue decision at the first checkpoint: retired the broad `transport_and_client_conformance` wording, captured the completed SDK and Codex evidence, and narrowed local item `1` to `chatgpt_desktop_conformance`; no persistent MCP configuration had yet been written.
- After explicit operator approval, installed `architrino_fixture` as an enabled global stdio entry shared by Codex and ChatGPT desktop. `codex mcp get` and `codex mcp list` confirmed the saved command and absolute launcher path.
- A fresh ephemeral Codex turn loaded the saved entry without command-line server overrides and called `topics`; the typed result had `status: ok` and contained three records. The model's prose incorrectly said the count was unavailable even though the tool event contained `page.returned: 3`; the tool event, not the prose summary, is the measured evidence.
- The development connection remains enabled so the operator can inspect it later. Direct ChatGPT desktop invocation still requires a connection restart or fresh chat and remains the only named-client conformance gap.

### 2026-07-21 - Full-Corpus Local V1 Passing

- Recorded the operator's report that the installed `architrino_fixture` connection is working. Graded it `operator-reported` because no retained ChatGPT transcript establishes all four calls plus the missing-source result; this evidence gap did not block the separate full-corpus implementation.
- Added [Full-Corpus Local MCP V1](full-corpus-local-v1.md), a deterministic enumerator over the 192 authored Markdown files declared by `markdown_index.json`, their 1,480 unique H2 sections, eligible chapter reading-copy sections, and scene routes with exact Markdown parents.
- Defined public eligibility without adding a source class or authority label. Published corpus, selected app guides, Archie references, generated reading copies, and scene routes enter according to controlled path and parent rules. Priority material is excluded before content enters the public artifact, and curated external comparison material remains empty because no curated policy exists.
- Added document-to-section `contains`, generated-copy `mirrors`, and scene `routes_to` edges only. No lexical co-occurrence became a conceptual, prerequisite, causal, or proof relationship.
- Added exact display-equation extraction for `$$...$$` and `\[...\]`, plus local Markdown figures whose assets exist. The final snapshot contains 4,294 equations and 36 figures with exact source evidence.
- Added the MCP packet's atomic builder and generated `content/generated/source-index/local-full-corpus-snapshot.v1.json`. The final local bundle contains 1,898 source records and 1,706 graph edges, identifies `local-source-state:5c4e4fca61a177b7e432f14ae7c0b9cc19c522f84cd1d0aa640c5c65d9ecbeb9`, and has snapshot SHA-256 `592d130a8349e9dde6273a549bf8a6ef1da2d4ba34cca18c525ecc4df01bae26`.
- Added a distinct full-corpus stdio launcher without changing the installed `architrino_fixture` connection. It reads one snapshot at startup, validates hashes, provenance, visibility policy, class counts, source linkage, and freshness, then performs no repository read, write, network request, model call, or external action per request.
- Added independent tests for declared-document coverage, exact extraction, route uniqueness, parent closure, public priority exclusion, repeated-build determinism, input-order invariance, no-write check mode, source-id and route-and-anchor reads, realistic topic pagination, cross-tool cursor rejection, Unicode code-point continuation, metadata assets, missing anchors, and tamper rejection.
- Measured local validation: full-corpus builder check, outside-cwd stdio smoke, official MCP TypeScript SDK `1.29.0`, and fresh ephemeral bundled Codex CLI `0.145.0-alpha.18` all passed against the final snapshot. Codex called `topics`, `search`, `read`, and `neighbors` with `status: ok` and observed `SOURCE_NOT_FOUND`, without a persistent configuration change.
- Regenerated only the MCP packet's six-source snapshot, MCP response fixture, and stdio transcript after their source contract and bound hashes changed. The fixture chain then passed again.
- Measured repository validation: service schema validation passed 35 fixtures; priority ranking passed 37 rows; strict content validation passed with zero errors and warnings; the complete content-integrity suite passed, including the 587-node/1,352-edge scene graph, reading copies, iOS package, notation checks, and runtime smoke.
- Retired the completed local full-corpus object from the live queue. The next implementation object is remote transport and deployment hardening; no deployment or persistent full-corpus ChatGPT configuration was created.

### 2026-07-21 - Remote Transport and Deployment Hardening V1 Fixture-Backed

- Completed [Remote Transport and Deployment Hardening V1](remote-transport-deployment-hardening-v1.md), removed that object from the live queue, and promoted `local_streamable_http_adapter` to item `1`.
- Verified the official MCP `2025-11-25` Streamable HTTP and authorization specifications. Defined one stateless `/mcp` endpoint with JSON POST responses, GET/DELETE HTTP 405 behavior, strict protocol-version handling, exact origin validation, loopback process binding, TLS ingress, OAuth protected-resource metadata, audience validation, one read scope, and no query tokens or token passthrough.
- Added finite request-byte, response-byte, timeout, per-principal rate, burst, concurrency, and pre-authentication limits. The 32,768-byte transport response ceiling is mechanically tied to the existing tool contract; the traffic values are policy defaults pending later load measurement.
- Added safe-log allow/deny fields, separate liveness/readiness paths, status-only public health output, startup-once snapshot loading, validation before atomic pointer activation, accepted-`main` publication requirements, and rollback-before-readiness requirements.
- Kept the fixture not advanced: `deploymentState` is `fixture_only`; `remoteReady` and `publicDeploymentAuthorized` are false; no host is selected; and TLS, trusted proxy, exact origins, authorization server, accepted-`main` identity, and rollback candidate remain unconfigured.
- Added 19 negative cases covering deployment authority, premature readiness, transport, endpoint, streaming, origin policy and values, authorization, query tokens, token passthrough, TLS, response limits, sensitive logging, repository reads, non-atomic activation, rollback, write/model capabilities, and rate limits. A separate test alters the candidate snapshot hash.
- Measured validation: the owned remote-contract checker passed the positive fixture and all 19 negative cases; the combined MCP/source-index regression passed 20 of 20 tests; the Archie service contract suite passed 16 of 16 tests; the shared schema validator accepted 37 fixtures with zero errors; strict content validation reported zero errors and warnings; and priority ranking kept all 37 rows aligned.
- Evidence boundary: this closes the executable contract and fixture semantics, not an HTTP listener, OAuth integration, host choice, staging rollback, client-over-HTTP conformance, availability measurement, or public deployment.

### 2026-07-21 - Loopback Streamable HTTP Adapter Passing

- Completed [Loopback Streamable HTTP Adapter](loopback-streamable-http-adapter.md), removed `local_streamable_http_adapter` from the live queue, and promoted `named_http_client_conformance` to local item `1`.
- Added an additive stateless handler over the existing MCP method core. The original stateful stdio session remains the default, its launcher and saved connection were not changed, and its focused lifecycle/tool regression remains passing.
- Added a Node built-in HTTP adapter that refuses every bind address except `127.0.0.1`, exposes one `/mcp` endpoint plus status-only liveness/readiness routes, returns JSON responses, uses no MCP session id, returns GET/DELETE 405, and requires the negotiated protocol header after initialization.
- Added a constant-time local bearer authorization hook, one read scope, exact supplied-Origin checks, query-string refusal, principal and unauthenticated fixed-window limits, burst and concurrency limits, body/response/time ceilings, and bounded `Retry-After` behavior. This is local hook evidence, not OAuth conformance.
- Added safe operational events with a keyed principal pseudonym and an exact field allowlist. Recognizable bearer-token, query, source-id, and response-content markers remained absent from captured events; the launcher emits a safe startup address and 30-second heartbeat.
- Added immutable active handler/snapshot bundles, validation before one-reference activation, readiness loss on candidate id/hash mismatch, visibility-policy compatibility checks, and rollback restoration. The launcher rollback fixture has distinct fixture provenance but identical content, so it tests mechanics only and is not independent evidence for restoring a prior changed snapshot.
- Added `archie-mcp-loopback-http-smoke/v1` with 21 real HTTP cases and nine focused tests covering lifecycle, health, all four tools, missing source, methods, origin, authorization and scope, protocol versions, media types, malformed JSON, query strings, body size, rate, concurrency, unsafe-log refusal, bind refusal, request-path surface scanning, snapshot no-write behavior, visibility-policy compatibility, activation/rollback, and full-corpus launcher startup from `/tmp`.
- Measured client evidence: official TypeScript SDK `1.29.0` initialized the full-corpus loopback server, accepted GET 405, discovered exactly four tools, called all four with typed `ok` results, observed `SOURCE_NOT_FOUND`, pinged, used no session id, left readiness green, and made no persistent client configuration change.
- Measured repository evidence: the combined Archie service, source-index, stdio, remote-contract, and HTTP run passed 45 of 45 tests; the shared schema validator accepted 38 fixtures with zero errors; the remote deployment checker retained all 19 cases with a Not advanced disposition; strict content validation reported zero errors and warnings; priority ranking kept all 37 rows aligned; and `git diff --check` passed.
- Evidence boundary: this closes the local Streamable HTTP implementation and official SDK interoperability. Codex-over-HTTP, ChatGPT-over-HTTP, OAuth, TLS ingress, accepted-`main` publication, a real prior rollback artifact, hosting, availability, and public deployment remain unmeasured.
