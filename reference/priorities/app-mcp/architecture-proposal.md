# Architrino MCP Architecture Proposal

## Status

- Kind: `priority-architecture`
- Claim level: `priority-only`
- Status: `starting-design`
- Parent tracker: [Architrino MCP](priorities.md)

This proposal defines a target architecture. It is not evidence that an MCP runtime, production index pipeline, client integration, or public deployment already exists.

## Goal

Expose the Architrino knowledge system as a structured, queryable source for AI clients instead of presenting it only as a collection of Markdown documents.

The repository remains the single source of truth. The public website, source-index snapshots, and MCP service all derive from or identify one accepted repository `main` commit. The human interface remains the GitHub Pages site. The AI interface is a separately deployed MCP service that consumes the same accepted source state.

## Architecture

```text
                    GitHub repository
                    accepted main commit
                           |
          authored Markdown, scenes, assets, metadata
                           |
                           v
                 GitHub Actions pipeline
                           |
           validate -> build -> verify -> publish
                           |
                           v
              versioned source-index snapshot
           +---------------+---------------+
           |               |               |
       search view      graph view     metadata view
           +---------------+---------------+
                           |
                           v
                     MCP service
                           |
                  read-only MCP tools
                           |
              +------------+------------+
              |            |            |
            Codex        Claude       ChatGPT

              GitHub Pages remains the human UI
```

The website and MCP service are separate delivery surfaces. Neither becomes a second editing authority.

## Current Repository Alignment

The implementation should extend the live repository shape rather than create a parallel generic `docs/`, `scenes/`, or service hierarchy.

| Concern | Current or target home | Role |
| --- | --- | --- |
| Authored corpus | `content/markdown/aaa/` | Primary source for published corpus claims. |
| Scene records | `content/scenes/` | Scene routing, visual metadata, and canonical-source association. |
| Generated graph artifacts | `content/graph/` | Existing runtime routes, scene graph, and textbook table of contents. |
| Assets | `content/assets/` | Images and other public source assets. |
| Existing service contracts | `src/archie-service/contracts/` | Source, manifest, endpoint, provider, action, and service boundaries. |
| Existing source-index check | `scripts/archie-service/build-source-index.mjs` | Check-only route and authority fixture validation; not yet a production index writer. |
| MCP adapter target | `src/archie-service/mcp/` | Proposed protocol adapter over the shared source-index and retrieval contracts. |
| Versioned index output target | `content/generated/source-index/` or deployment artifact storage | Proposed immutable snapshots; final storage decision remains open. |

The MCP service should be a protocol adapter over the shared source index. It should not fork source classes, visibility rules, source authority, System Card routing, or deployment boundaries already owned by the Archie service packets.

## Repository Authority

The accepted repository snapshot contains the authoritative or routing inputs:

- authored Markdown;
- JSON scene records and generated graph artifacts;
- TeX expressions rendered by the web application with KaTeX;
- images and other assets;
- topic, route, and cross-reference metadata;
- System Card and proof-status routes.

Generated reading copies, indexes, excerpts, summaries, and graph projections are derived artifacts. Each derived record must identify its canonical parent and may carry no greater claim authority than that parent.

## Build Pipeline

Every accepted push to `main` should run one ordered pipeline.

### 1. Validate source consistency

Run the existing content-integrity checks and MCP-specific checks for:

- broken relative links and missing anchors;
- duplicate topic, scene, route, equation, figure, or citation identifiers;
- missing images and referenced assets;
- missing source-class, canonical-parent, visibility, or authority metadata;
- generated graph drift;
- source routes that cannot reach an authored parent;
- priority material accidentally admitted as ordinary public corpus authority.

### 2. Build the search view

The search view should contain normalized, reviewable fields such as:

- stable source and topic identifiers;
- title, headings, aliases, and controlled keywords;
- authored summary or safely derived teaser;
- canonical file route and section anchor;
- source class, visibility, authority status, and canonical parent;
- content hash and snapshot identifier.

V1 search should be deterministic. Ranking inputs and tie-breaks must be explicit and fixture-tested.

### 3. Build the graph view

The graph view should contain declared or mechanically derived relationships such as:

- parent and child routes;
- scene-to-source relationships;
- explicit related-concept links;
- declared prerequisite links;
- document and section containment;
- dependency or conceptual edges whose source can be named.

An edge needs a type and provenance. Co-occurrence alone must not silently become a conceptual, causal, prerequisite, or proof relationship.

### 4. Build the metadata view

The metadata view should provide routeable records for:

- equations;
- figures and visual assets;
- citations;
- glossary entries;
- walkthrough and app-guide references;
- topic and section identifiers;
- System Card and proof-status routes.

Equation extraction must preserve TeX delimiters and content exactly.

### 5. Verify and publish one immutable snapshot

The three views should be published as one source-index snapshot with:

- schema version;
- repository commit;
- build identifier and build time;
- per-artifact hashes and record counts;
- visibility-policy version;
- freshness state;
- rollback parent;
- validation disposition.

Publication should be atomic: request handlers see either the complete prior snapshot or the complete new snapshot, never a partially updated mixture.

### 6. Add semantic retrieval only after a measured need

Embeddings are not required for V1. If deterministic search produces a measured natural-language recall gap, a later hybrid path may:

1. query deterministic route, keyword, graph, and metadata views;
2. use embeddings only when the deterministic result is below a declared confidence boundary;
3. rerank only among records allowed by the same visibility and authority policy;
4. return the canonical sources and snapshot provenance, never an embedding as authority.

## MCP Service Responsibilities

The MCP service stores no independent knowledge. It loads one validated immutable source-index snapshot and exposes read-only tools over that snapshot.

Every tool result should include enough context to audit the answer:

- tool and schema version;
- active snapshot identifier and repository ref;
- source ids, canonical routes, source classes, authority status, and visibility;
- truncation, pagination, and confidence or ranking details where applicable;
- missing, stale, excluded, ambiguous, or unsupported dispositions;
- System Card route when proof status or unsupported claims are involved.

The service must fail closed when source identity, visibility, authority, freshness, or result completeness cannot be established.

## V1 Tool Surface

V1 should start with four primitive tools.

### `search(query, filters?, cursor?)`

Returns ranked matching source or topic records with explicit match reasons, safe teasers, canonical routes, source class, authority status, snapshot provenance, and pagination.

### `read(topic_or_route, section?, budget?)`

Returns the requested authored content or declared derived record, plus canonical-parent metadata, related routes, equations, figures, and an explicit truncation state.

### `topics(filters?, cursor?)`

Lists stable topic records from the active snapshot.

### `neighbors(topic, edge_types?, cursor?)`

Returns directly connected concepts with typed, source-backed edges. It does not infer an undeclared relationship.

These tools are sufficient to prove the indexing, provenance, visibility, pagination, and client-compatibility boundary before the service grows.

## Later Graph Tools

The following tools are useful candidates after V1, but their names must not imply more authority than their algorithms provide.

| Tool | Allowed deterministic meaning | Required boundary |
| --- | --- | --- |
| `walk(topic, depth)` | Traverse typed graph edges to a bounded depth. | Bound depth, node count, edge classes, cycles, and pagination. |
| `graph(scope?)` | Return graph statistics or a bounded subgraph. | Never return an unbounded corpus graph in one response. |
| `figures(topic)` | Return indexed figure records and assets. | Preserve license, caption, alt text, source, and canonical parent. |
| `equations(topic)` | Return exact indexed TeX and its source route. | Preserve TeX exactly; extraction is not mathematical validation. |
| `locate(term)` | Return indexed occurrences with source routes. | State normalization and truncation rules. |
| `compare(a, b)` | Return mechanical field, ancestor, descendant, and edge overlap/difference. | A structural diff is not a theory adjudication. |
| `trace(origin, destination)` | Return one or more typed graph paths. | State path-selection rule; graph reachability is not causation or proof. |
| `related(topic)` | Return declared relations or a scored association method. | Name whether the edge is explicit, structural, lexical, or semantic. |
| `context(topic)` | Return a bounded source bundle around a topic. | Define minimality as an algorithmic rule, not a completeness claim. |
| `learning_path(start, goal)` | Order declared prerequisites and connecting routes. | Return gaps and cycles instead of inventing missing prerequisites. |

The proposed `derive(topic)` name should not be used for a V1 graph lookup because it can be mistaken for a mathematical derivation. If retained later, its contract must mean only “return declared prerequisites” and must say that no claim has been derived.

The proposed `validate(path)` operation must also remain narrow. A graph-only implementation can validate source existence, edge types, visibility, and declared adjacency. It cannot certify that a reasoning chain is physically or mathematically correct. Any stronger consistency check belongs behind an explicit theorem, rule set, or answer-engine contract with independent evidence.

The proposed `explain(topic)` operation is not a primitive retrieval tool unless it returns an authored explanation or a deterministic excerpt bundle. Model-generated explanation belongs to the Archie answer engine and must inherit its source-context, claim-label, provider, privacy, token, and manifest gates.

## Deployment

GitHub Pages remains the public human interface. The MCP service is deployed independently because it needs a long-lived protocol endpoint, server-side configuration, rate limits, health checks, logs, rollback, and possibly authentication.

The service build should consume a validated snapshot artifact created from `main`; it should not clone and scan the repository for every request. Deployment must pin the service version to compatible index schema versions and retain a rollback pointer to the last passing service-and-snapshot pair.

### Provisional host candidates

The following order is preserved from the starting proposal as an unverified candidate ranking, not a current procurement decision:

| Rank | Platform | Starting assessment |
| ---: | --- | --- |
| 1 | Railway | Simple GitHub-connected Node.js deployment and scaling candidate. |
| 2 | Fly.io | Global deployment and low-latency candidate with more operational work. |
| 3 | Render | Low-operations GitHub deployment candidate; cold-start and scaling behavior require measurement. |
| 4 | DigitalOcean App Platform | Predictable platform candidate if databases or workers become necessary. |
| 5 | AWS Lambda plus API Gateway | High-scale serverless candidate with greater architecture and operations burden. |
| 6 | Azure Functions | Enterprise serverless candidate with greater setup burden for this scope. |

Before selection, refresh pricing, free-tier terms, supported MCP transport behavior, request-duration limits, streaming support, region availability, cold starts, custom domains, logs, secret storage, health checks, rollback, and expected monthly cost using current primary provider documentation. Then run the same minimal server benchmark on the finalists.

## Security And Operations

- Public V1 tools are read-only.
- Do not expose provider, deployment, GitHub, database, signing, or monitoring secrets in static output, index snapshots, tool responses, logs, or client bundles.
- Apply response-size, depth, result-count, request-rate, and execution-time limits.
- Keep private prompts and client conversation content out of index artifacts and public logs.
- Record service version, snapshot id, tool name, duration, disposition, and safe error class without storing private query text by default.
- Health checks must distinguish service health, snapshot freshness, snapshot compatibility, and upstream artifact availability.
- Rollback must restore a compatible service-and-snapshot pair.
- Authentication and per-client quotas remain a deployment decision; public access must not imply unlimited graph export or denial-of-service exposure.

## V1 Acceptance Boundary

V1 is accepted only when all of the following are independently checkable:

1. A schema validates one immutable source-index snapshot containing search, graph, and metadata views.
2. A clean build from the same pinned repository commit produces the same normalized records and content hashes.
3. Broken links, duplicate ids, missing assets, missing canonical parents, visibility leaks, and source-authority inflation fail the build.
4. `search`, `read`, `topics`, and `neighbors` pass positive and negative fixture suites with provenance, pagination, truncation, and fail-closed errors.
5. Request handling reads only the accepted snapshot and performs no repository scan or write.
6. Priority material is excluded by default and cannot appear as published corpus authority.
7. At least one supported client completes a local conformance run, followed by documented tests for the other target clients where their current MCP support allows it.
8. Staging proves health checks, safe logs, rate limits, secret boundaries, snapshot compatibility, atomic publication, and rollback.
9. Hosting and operating-cost claims are measured or cited from current provider terms before a production decision.

## Long-Term Direction

The long-term objective is a first-class Architrino knowledge provider for compatible AI systems. Humans continue to use the GitHub Pages site. AI clients use MCP tools over the same versioned sources. Deterministic structure remains the primary retrieval path, while semantic retrieval is an optional, measured fallback that cannot alter source authority.
