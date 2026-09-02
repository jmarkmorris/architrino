# AAA Core Work Log

This file is the chronological work log for `app-aaa-core`. Use [priorities.md](priorities.md) for strategy, [work-queue.md](work-queue.md) for accepted work, [architecture-v0.md](architecture-v0.md) for the current architecture draft, and [brainstorming.md](brainstorming.md) for loose ideas.

## Log Entries

### 2026-09-02 — AAA Core Classified As The Shared Headless Application Platform

- Classified AAA Core as shared headless application infrastructure rather than an end-user product, while retaining the `app-aaa-core` compatibility path and every accepted `aaa_core_*` schema, capability, class, and refusal interface.
- Inventoried the six current `src/aaa-core/` modules, their in-process `AAAClientService`/`AAAClient` composition root and headless Potential API, accepted schemas and Core-owned product fixtures, representative consumers, and focused tests.
- Measured with repository import, route, and scene scans that no consumer imports a Core UI. Lorentz Geometry calls the headless Potential API from its own surface scheduler, Topo has a tested thin Potential consumer not yet composed into its browser root, Topo and Equation Mapping share the synthetic client-conformance surface, and Equation Mapping's existing browser runtime remains independent. A Core DOM import, public scene, or standalone route would falsify this result.
- Removed the design-level assignment of a Study Pipeline Workbench UI to Core. A separately owned consuming application may present those capabilities through Core contracts.
- Kept Core outside the public Applications hierarchy and standalone launch routing, separated it from other unranked owners in the priority inventory, and added a focused regression assertion for catalogue and search exclusion.
- Claim boundary: this is an architecture, ownership, and discovery classification. It does not deploy a Core service, add a production consumer, validate a scientific kernel, or upgrade any accepted contract's evidence grade.

Plainly: AAA Core supplies tested shared machinery behind applications; it is not something a visitor launches.

Closure goal: preserve this headless boundary as production services and real application consumers are added.

### 2026-09-02 — CORE-008 AAA Core Client v0 Closed

- Accepted [`aaa_core_client/v0`](client-v0.md) as a thin defensive-copy client over the path, codec, accepted-history stream, and query/publication contracts.
- Exposed manifest validation, codec negotiation, query preparation, explicit stream opening and actions, stream progress, sealed publication caching, exact retrieval, and operation inspection without defining another path or product schema.
- Drove Topo and Equation Mapping through the same `AAAClient` class. Both validate the same source, normalize equivalent requests, subscribe to one shared stream session, and inspect the same producer and consumer progress.
- Published one sealed Potential fixture, returned the same immutable publication as a cache hit for its equivalent request, and retrieved it through Equation Mapping's exact receipt permission.
- Preserved originating exception names, refusal codes, and messages in terminal operation envelopes, and returned defensive copies so callers cannot mutate retained client state.
- Removed CORE-008 from the live queue. CORE-006, CORE-007, and CORE-009 remain blocked on measured workloads, a public dataset and scientific mapping, or rented accelerator evidence.
- Claim boundary: this is synchronous in-process client conformance only. No network API, durable catalog, authentication, production retry, measured performance, scientific kernel, EOM evolution, or application release is accepted.

Plainly: two apps now use one tested client for the same paths, stream, query, publication, and failure rules. Scaling or deploying that client still requires real workload evidence and production service decisions.

Closure goal: measure representative workloads and retain exact correctness, failure, and cost boundaries before choosing production architecture.

### 2026-09-02 — CORE-005 Query, Transform, And Publication v0 Closed

- Accepted [`aaa_core_query_transform_publication/v0`](query-transform-publication-v0.md) above the accepted path-interchange, codec-registry, and accepted-history stream contracts.
- Defined canonical query normalization in which source bindings, path ids, event kinds, and object keys are order-insensitive, request ids are trace-only, and transform order remains semantic.
- Bound query, transform-pipeline, cache, view, product, and publication-receipt identities to exact versioned inputs, numeric policy, output contract, records, and source manifests.
- Built a sealed Potential fixture over a complete prescribed path and proved that an equivalent request shares its cache key while reversed translate/scale order does not. Equation Mapping retrieves the exact immutable product as a permitted second consumer.
- Built a provisional display fixture over an incomplete accepted-history prefix and refused its attempted seal.
- Fixed an aliasing defect found by the negative suite so a product mutation cannot mutate the request, view, or receipt through a shared in-memory source-binding object.
- Added fifteen fail-closed controls covering every contract refusal code, including stale identities, missing source closure, mutable sealing, forbidden retrieval, and authority escalation.
- Removed CORE-005 from the live queue and promoted the now-unblocked CORE-008 thin client SDK to local rank 1.
- Claim boundary: this is synthetic query and publication conformance only. It validates no transform scientifically, publishes no production product, deploys no cache or catalog, measures no workload, and grants no EOM or scientific authority.

Plainly: Core can identify equivalent work, preserve operation order when it matters, and hand an exact source-bound result to a second application without letting a partial or weaker product look complete or authoritative.

Closure goal: expose the accepted contracts through one thin client used unchanged by Potential and a second application.

### 2026-09-02 — CORE-004 AAA Core Accepted-History Stream v0 Closed

- Accepted [`aaa_core_accepted_history_stream/v0`](accepted-history-stream-v0.md) above the path-interchange and codec-registry contracts.
- Added a hash-valid three-chunk EOM-accepted fixture over $T=0$ through $T=3$ in normalized $c_f=1$ units, with exact manifest membership, sequence, predecessor, coverage, identity, and authority checks.
- Added bounded subscription queues with separate producer, delivered, and acknowledged watermarks; idempotent duplicate handling; pressure entry and release; ordered acknowledgement; disconnect; cursor-bound reconnect; retained replay; exact seal; and immutable terminal behavior.
- Drove the same stream through a Potential-style watermark observer and a separately implemented ordered-digest audit observer. They agree on prefix coverage and terminal state but form distinct consumer-specific receipts.
- Added a halt case in which the audit consumer disconnects before the EOM halt and receives the exact same code, detail, failed sequence, and accepted-through boundary after reconnect.
- Added twelve negative controls for gaps, predecessor corruption, conflicting duplicates, time discontinuity, source rebinding, pressure violation, oversized chunks, acknowledgement order, stale cursor, incomplete seal, changed halt identity, and post-terminal publication.
- Updated Potential's live pipeline contract to consume the accepted shared stream semantics while preserving its fixture-only envelope and application-owned state machine.
- Removed CORE-004 from the live queue and promoted CORE-005 to local rank 1.
- Claim boundary: this is synthetic in-process broker and consumer conformance only. No production network transport, durable service, measured throughput or latency, live EOM integration, scientific kernel, or application release is accepted.

Plainly: Core can now deliver one accepted prefix safely to two clients, pause when a bounded client fills, resume from a proven cursor, and carry the same terminal result across a disconnect. Production deployment remains separate work.

Closure goal: define stable query, transform, cache, and publication identities over the accepted path, codec, and stream contracts.

### 2026-09-02 — CORE-003 AAA Core Codec Registry v0 Closed

- Accepted [`aaa_core_codec_registry/v0`](codec-registry-v0.md) as the single capability-negotiation surface above the accepted logical path model.
- Defined authoritative-history, precision-bounded-analysis, and display-stream profiles with exact numeric, error, event, branch, authority, consumer, access, chunking, device-layout, version, compatibility, and refusal behavior.
- Registered two Core capabilities: canonical logical-record JSON for exact authoritative and analysis round trips, and a little-endian quantized path-display layout with an explicit $5\times10^{-4}$ maximum added error and `display_only` effective-authority cap.
- Registered Potential's existing `potential_fixture_map_json/v1` as an application-owned fixture capability and aligned its profile identifiers to the Core registry.
- Added a fixture-only experimental CSV decoder that hash-verifies and re-emits the retained source-native bytes, requires per-sample uncertainty, preserves events, and produces only observer-level non-continuable paths.
- Added five positive conformance cases and eleven negative controls for capability, version, profile, access, consumer, payload identity, error budget, event preservation, source identity, uncertainty, and source schema.
- Removed CORE-003 from the live queue and promoted CORE-004 to local rank 1.
- Claim boundary: this is registry and synthetic-conformance evidence only. It selects no production codec, measures no representative workload, and grants no EOM, scientific, experimental-interpretation, storage, transport, GPU, or cost authority.

Plainly: Core can now choose only among named providers with visible guarantees and refuse an unsafe request before decoding. The next work is the shared accepted-history broker, not another path format.

Closure goal: close duplicate-tolerant, replayable, bounded accepted-history streaming across one producer and two independent consumers.

### 2026-09-02 — CORE-001 AAA Core Path Interchange v0 Closed

- Accepted [`aaa_core_path_interchange/v0`](path-interchange-v0.md) as the single logical record family for path-set manifests, immutable chunks, stream envelopes, query/transform views, and derived-product manifests.
- Added a machine control record, JSON Schema, and executable validator with canonical SHA-256 identities, normalized $c_f=1$ units, three numeric profiles, path-kind authority rules, predecessor closure, stream watermarks and sealing, source-bound transformations, and experimental uncertainty provenance.
- Added five positive fixture bundles for EOM-produced history, prescribed paths, a live accepted stream, a Potential map product, and an observer-level experimental import.
- Added ten negative controls for missing coverage, incompatible scales, broken predecessors, unsupported precision, unknown versions, authority escalation, missing source binding, incomplete sealing, experimental uncertainty loss, and stale identity.
- Verified that every upstream field required by Potential's accepted v1 consumer contract maps from the Core manifest without defining a second path schema.
- Removed CORE-001 from the live queue and promoted CORE-003 to local rank 1.
- Claim boundary: this is logical-contract and synthetic-fixture conformance only. No production storage, transport, codec, scientific kernel, EOM evolution, experimental interpretation, or derived scientific result is accepted.

Plainly: Core now has one tested meaning for paths and their derivatives. The next work is to define how different providers encode that meaning without hiding loss, changing authority, or smearing events.

Closure goal: close codec-provider conformance on top of the accepted logical model, then specify the complete accepted-history broker behavior.

### 2026-09-02 — CORE-002 Representative Workload Matrix Closed

- Added the human-readable [Representative Path Workload Matrix](representative-path-workload-matrix.md) and machine-readable [`aaa_core_representative_path_workload_matrix/v1`](aaa-core-representative-path-workload-matrix.v1.json).
- Froze one EOM continuation, Potential live-map, reaction-keyhole, optimization-sweep, and collider-import workload across path count, history depth, scale span, smoothness, event density, random access, observable, latency, precision, storage, source authority, coverage, and accelerator posture.
- Required independent-reference correctness gates before resource comparison and made deterministic replay a separate reproducibility metric rather than evidence for correctness.
- Required wall time, throughput, latency, CPU time, host/device memory, I/O, transfer, storage, fallback, failure, energy, and cost measurements; unavailable resource values remain `null` with a reason rather than zero.
- Removed CORE-002 from the live queue and updated CORE-003 to consume the accepted but still unmeasured matrix.
- Claim boundary: this closes workload definition only. All result states remain `unmeasured`; no codec, service boundary, storage system, accelerator, deployment, throughput, cost, or scientific result is selected or accepted.
- Verification: machine-readable JSON parsing, `git diff --check`, `node scripts/validate-priority-ranking.mjs`, `node scripts/validate-content.mjs --check --strict`, and `node scripts/build-scene-graph.mjs --check --strict` passed.

Plainly: Future candidates now have to run the same five jobs and pass their independent correctness checks before anyone compares speed or cost. No candidate has run them yet.

Closure goal: execute the versioned matrix and use measured end-to-end evidence to accept or reject each representation and deployment posture.

### 2026-08-02 — AAA Core Named And First Architecture Drafted

- Accepted `app-aaa-core` as the shared factory and service layer for the application ecosystem.
- Drafted `aaa_core/v0` with explicit boundaries among paths, EOM evolution, scientific kernels, application composition, experimental imports, and evidence authority.
- Defined the first conceptual product family: path-set manifests, immutable chunks, stream envelopes, query and transform manifests, kernel requests, derived-product manifests, and resource profiles.
- Defined focused service boundaries for construction/validation, identity, codecs/storage, indexing, streams, queries/transforms, compute dispatch, publication/catalog, and application clients.
- Defined authoritative-history, precision-bounded-analysis, and display-stream representation profiles over one logical path model.
- Captured live accepted-history flow, provisional and sealed publication, replay, backpressure, heterogeneous GPU/CPU routing, and multiple deployment postures.
- Moved suite-wide architecture ideas from the former Potential-app proposal into AAA Core ownership. The later Core Potential consolidation removed that proposal as a separate product and retained applications as presentation consumers.
- Marked `aaa_core_path_interchange/v0` as awaiting verification; no implementation or production authority was claimed.

Plainly: AAA Core now has a first blueprint for turning trustworthy path inputs into reusable services and products for many apps, while keeping the solver and scientific claims in their proper owners.

### 2026-08-02 — Codec Provider Boundary And Root-Compute Posture Added

- Split codec ownership into a Core-owned control plane and registry, broadly reusable Core providers, domain-owned registered providers, and app-private transient layouts.
- Required source-native experimental measurements to remain immutable while decoded, calibrated, filtered, and normalized variants become separately identified derived products.
- Expanded the heterogeneous-compute design around the actual irregularity of causal-root work: staged screening, compaction, bracket isolation, conditioning buckets, branch-preserving refinement, precision escalation, and complete/disjoint accounting.
- Preserved EOM ownership of its root equations, completeness criteria, and acceptance decisions; Core provides shared scheduling and data services only.
- Added a dated local-versus-cloud hardware and cost packet and made a measured root-accelerator operating decision an explicit deferred queue item.

Plainly: specialized apps and instruments may bring their own encoders and decoders, but published data remains interoperable. GPUs receive regular root batches, while hard cases are visibly routed to stricter computation rather than silently weakened.
