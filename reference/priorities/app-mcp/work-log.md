# Architrino MCP Work Log

This file is the chronological work log for the `app-mcp` priority area. Use it for dated implementation status, validation evidence, failed paths, deployment measurements, adjudications, and handoffs. Keep provisional ideas in [brainstorming.md](brainstorming.md), the compact live queue in [priorities.md](priorities.md), and stable architecture or contract detail in focused sibling files.

## Log Entries

### 2026-07-20 - Priority Packet Seeded

- Created the `app-mcp` priority packet from the operator-provided Architrino MCP architecture proposal.
- Preserved the central decision: the repository remains authoritative, GitHub Pages remains the human interface, and a separately deployed MCP service reads immutable generated indexes.
- Aligned the generic starting directory sketch with the live repository: authored corpus under `content/markdown/aaa/`, scenes under `content/scenes/`, graph artifacts under `content/graph/`, and existing service contracts and source-index checks under the Archie service paths.
- Corrected the web math-rendering reference from MathJax to the repository's KaTeX target.
- Kept the hosting order as an unverified candidate ranking because provider pricing, limits, and protocol support are time-sensitive.
- Narrowed V1 to `search`, `read`, `topics`, and `neighbors`; staged graph composition tools and semantic retrieval behind explicit contracts and evidence.
- Added fail-closed boundaries for source authority, visibility, priority-material exclusion, canonical parents, proof-status routing, pagination, truncation, and missing sources.
- Left the workstream unranked. Its first unresolved object is the executable `source_index_contract`; a future full priority-scoring pass must compare it with every live bucket before assigning numeric rank, value, cost, or ROI.
- Current repository inspection found an existing check-only Archie source-index scaffold and fixture contracts, but no production MCP runtime or production index writer. That makes reuse of the existing source classes and service boundary the first integration constraint.

### 2026-07-20 - Source Index Snapshot V1 Fixture-Backed

- Completed the first `source_index_contract` and its deterministic fixture builder in [source-index-snapshot-v1.md](source-index-snapshot-v1.md). Removed the completed source-index contract and builder objects from the live queue and promoted `mcp_tool_contract_v1` to local item `1`.
- Added `archie-source-index-build-input/v1` and expanded `archie-source-index-snapshot/v1` with schema versions, SHA-256 rules, canonical JSON normalization, generated-artifact digests, per-source file and section hashes, search/graph/metadata views, per-view hashes, and one enclosing snapshot hash.
- Added six representative source records spanning published corpus, generated reading copy, scene route, app guide, System Card reference, and priority material; added two typed graph edges, one exact TeX record, and one source-linked figure.
- Added ten fail-closed cases for missing paths, duplicate ids, missing or wrong-class parents, priority authority inflation, priority public-visibility leakage, false equation provenance, false figure provenance, stale source hashes, and altered view hashes.
- The builder normalizes source records, graph edges, metadata records, aliases, and keywords before hashing. Reversing all declared input arrays produces the same snapshot hash.
- Measured validation: the source-index check passed with six source records, two graph edges, two metadata records, and ten negative cases; the service schema validator accepted all 32 fixtures; the combined Archie service and focused snapshot tests passed all 17 tests; and the priority-ranking validator kept all 37 ranked rows aligned.
- The first combined test run caught a compatibility-only failure because the builder's success text no longer contained the established `Archie source-index check passed` phrase. The output was restored to the existing contract, and the full combined test rerun passed.
- The repository-wide content-integrity run passed content/reference validation, then failed closed because `content/graph/scene_graph.json` is out of date against the current ambient scene sources: the checker computed 587 nodes and 1,352 edges. No generated write was run. The owning repair command is `node scripts/build-scene-graph.mjs --write`; after that repair is explicitly accepted, rerun its check and then regenerate and recheck the source-index snapshot because its generated-artifact digest will change.
- Scope boundary: this is a fixture-backed contract and representative builder, not a complete production corpus index, MCP runtime, client conformance result, deployment, or launch artifact.

### 2026-07-20 - MCP Tool Contract V1 Fixture-Backed

- Completed `mcp_tool_contract_v1` in [mcp-tool-contract-v1.md](mcp-tool-contract-v1.md), removed it from the live queue, and promoted `fixture_backed_mcp_server` to local item `1`.
- Added typed `archie-mcp-tool-request/v1` and `archie-mcp-tool-response/v1` envelopes for `search`, `read`, `topics`, and `neighbors`, with exact tool-specific arguments, snapshot provenance, source chips, result/page unions, explicit error statuses, and no result data on fail-closed responses.
- Implemented a pure snapshot-query engine with 256-character queries, 512-character ids/routes, 20-record pages, 256-to-8,000-character read pages, a 32,768-byte response ceiling, unique bounded filters, canonical-source search preference, exact-content reads, non-routing topic enumeration, and direct typed graph neighbors.
- Bound opaque pagination cursors to snapshot id, tool, visibility scope, all non-cursor arguments, and the next record or Unicode-character offset. SHA-256 provides deterministic scope integrity only; it is not represented as authentication.
- Added seven complete request/response fixtures covering all four tools, missing-source reads, public priority exclusion, authorized operator/developer priority access, record truncation, content truncation, and continuation cursors.
- Added eight fail-closed cases covering excess record and content limits, snapshot mismatch, unauthorized visibility, malformed cursor, stale snapshot, unsupported edge type, and duplicate filters.
- Corrected a supply-contract defect discovered while specifying `read`: the prior snapshot held selection hashes but not selected content, so snapshot-only reads were impossible. Added a hashed `archie-source-content-view/v1` with exact content and content type for all six fixture sources; after the owning source-index specification update, the enclosing snapshot hash is `0f37ac2a582bccb817591a261fd0530e508943bb9279309c7ec861e656ce880c`.
- The first MCP fixture write run exposed a checker bookkeeping defect: continuation checks still referenced the pre-write in-memory cases whose expected responses were null. The checker now rebuilds its case map after writing; the rerun passed.
- Measured validation at this point: the MCP checker passed seven positive and eight negative cases; the schema validator accepted 34 fixtures; and the combined MCP, source-index, and Archie service test run passed all 22 tests.
- The repository-wide freshness gate remains fail-closed at the pre-existing generated scene-graph drift: content/reference validation passes, then `content/graph/scene_graph.json` reports 587 nodes and 1,352 edges and is out of date. No scene-graph write was run. After the owning drift is explicitly repaired with `node scripts/build-scene-graph.mjs --write`, rerun its strict check, the source-index `--write`/`--check`, and the MCP tool-contract `--write`/`--check` because both downstream fixtures bind the graph digest or snapshot hash.
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
- The first real Codex run failed closed before session creation with `tools/list has unsupported params`. Inspection of the official SDK request schemas showed that `_meta` is a standard optional field on base request parameters.
- Corrected the adapter to accept object-valued `_meta` on `tools/list` and `tools/call`, reject malformed metadata and other unsupported top-level parameters, and continue rejecting task-augmented calls. Added `_meta` coverage to the subprocess transcript and focused lifecycle test.
- The repeated ephemeral Codex run used bundled client `0.145.0-alpha.18`, required only `architrino_fixture`, and completed all four MCP calls with typed structured content and `status: ok`. The ordinary npm-installed `codex` wrapper was separately broken because its architecture-specific binary was missing; the installed ChatGPT app's bundled Codex executable was healthy.
- Checked the fresh OpenAI Codex manual and the installed ChatGPT desktop Settings surface. Current documentation says ChatGPT desktop supports local stdio MCP and shares its MCP configuration with Codex, while ChatGPT web does not read local Codex configuration. Direct ChatGPT desktop tool invocation remains unmeasured because an already-running task cannot reload a newly added connection; a fresh chat or connection restart is required.
- Queue decision: retired the broad `transport_and_client_conformance` wording, captured the completed SDK and Codex evidence, and narrowed local item `1` to `chatgpt_desktop_conformance`. No global or project MCP configuration was written.
