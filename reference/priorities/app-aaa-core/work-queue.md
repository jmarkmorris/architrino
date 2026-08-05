# AAA Core Work Queue

This is the canonical execution ledger for accepted AAA Core work. [priorities.md](priorities.md) owns strategy, [architecture-v0.md](architecture-v0.md) is the current design draft, and [brainstorming.md](brainstorming.md) holds ideas that are not yet accepted tasks.

## Rules

1. Keep one canonical logical path model and test every concrete representation against it.
2. Keep EOM evolution, scientific kernels, shared data services, and application rendering as separate responsibilities.
3. Require immutable source identity, declared precision, provenance, authority, and exact failure behavior for every product.
4. Benchmark end-to-end consumer workloads; codec ratio or GPU kernel throughput alone is not an acceptance result.

## Next real work

Review and fixture `aaa_core_path_interchange/v0` from the first architecture draft.

## Ranked Next Objects

1. `aaa_core_path_interchange_v0` — [CORE-001](#core-001--aaa-core-path-interchange-v0). Status: `Awaiting verification`.
2. `representative_path_workload_matrix` — [CORE-002](#core-002--representative-path-workload-matrix). Status: `Queued`.
3. `path_codec_profile_contracts` — [CORE-003](#core-003--path-codec-profile-contracts). Status: `Queued`.
4. `accepted_history_stream_contract` — [CORE-004](#core-004--accepted-history-stream-contract). Status: `Queued`.
5. `query_transform_and_publication_contract` — [CORE-005](#core-005--query-transform-and-publication-contract). Status: `Queued`.
6. `heterogeneous_path_compute_architecture` — [CORE-006](#core-006--heterogeneous-path-compute-architecture). Status: `Deferred / blocked`.
7. `experimental_path_import_profile` — [CORE-007](#core-007--experimental-path-import-profile). Status: `Deferred / blocked`.
8. `application_client_sdk` — [CORE-008](#core-008--application-client-sdk). Status: `Deferred / blocked`.
9. `root_accelerator_benchmark_and_operating_decision` — [CORE-009](#core-009--root-accelerator-benchmark-and-operating-decision). Status: `Deferred / blocked`.

## Awaiting verification

### CORE-001 — AAA Core path interchange v0

- **Status:** Awaiting verification
- **Priority object:** `aaa_core_path_interchange_v0`
- **Request / acceptance:** Review and turn [architecture-v0.md](architecture-v0.md) into a versioned logical contract for path sets, chunks, manifests, streams, views, derived products, numeric policies, provenance, and authority.
- **Evidence / blocker:** The first architecture draft exists. It has no schemas, example records, compatibility tests, or application conformance evidence yet.
- **Completion:** Positive fixtures cover EOM-produced history, prescribed paths, a live accepted stream, a Potential map product, and an observer-level experimental import; negative fixtures reject missing coverage, incompatible scales, broken predecessor chains, unsupported precision, unknown versions, and authority escalation.

## Queued

### CORE-002 — Representative path workload matrix

- **Status:** Queued
- **Priority object:** `representative_path_workload_matrix`
- **Request / acceptance:** Define representative workloads across path count, history depth, scale span, smoothness, event density, random-access pattern, consumer observable, latency, precision, storage, and accelerator posture.
- **Evidence / blocker:** No measured workload packet currently selects among path encodings or service deployment modes.
- **Completion:** The matrix contains at least one EOM continuation, Potential live map, reaction study, optimization sweep, and collider-import workload with explicit correctness and resource metrics.

### CORE-003 — Path codec profile contracts

- **Status:** Queued
- **Priority object:** `path_codec_profile_contracts`
- **Request / acceptance:** Specify certification-preserving, precision-bounded analysis, and display-stream codec profiles behind the same logical path model, plus the Core-owned codec registry and the provider boundary for solver-, application-, and experiment-specific encoders and decoders.
- **Evidence / blocker:** Candidate mechanisms exist only as design ideas; no representation has been benchmarked across the workload matrix.
- **Completion:** Each profile and provider declares permitted consumers, logical input/output types, encoding and decoding rules, error and authority semantics, event/branch preservation, random access, chunking, GPU layout, deterministic version, compatibility, and failure behavior. Conformance fixtures cover one Core codec, one app-owned codec, and one experimental decoder with round-trip and purpose-specific error tests.

### CORE-004 — Accepted-history stream contract

- **Status:** Queued
- **Priority object:** `accepted_history_stream_contract`
- **Request / acceptance:** Define immutable accepted-chunk sequencing, subscriptions, accepted-through watermarks, replay, idempotency, backpressure, reconnect, halt, and sealing behavior between EOM, AAA Core, and applications.
- **Evidence / blocker:** EOM permits streamed accepted outputs and Potential requires live ingestion, but the shared envelope is not specified.
- **Completion:** A synthetic producer and two independent consumers demonstrate omission detection, duplicate tolerance, deterministic replay, bounded buffering, reconnect, and exact halt propagation.

### CORE-005 — Query, transform, and publication contract

- **Status:** Queued
- **Priority object:** `query_transform_and_publication_contract`
- **Request / acceptance:** Define immutable filter/query manifests, reproducible shaping pipelines, derived-product caching, source binding, publication state, and authority propagation.
- **Evidence / blocker:** Potential has the first concrete consumer need; cross-app behavior is not yet formalized.
- **Completion:** Equivalent requests have stable cache identity, transform order is explicit, derived products retain source closure, incomplete products cannot be sealed, and authority cannot increase through transformation.

## Deferred / blocked

### CORE-006 — Heterogeneous path-compute architecture

- **Status:** Deferred / blocked
- **Priority object:** `heterogeneous_path_compute_architecture`
- **Request / acceptance:** Implement staged candidate screening, compaction, bracket isolation, conditioning buckets, branch-preserving refinement queues, difficult-row return, stricter CPU or precision services, deterministic or bounded reductions, device-resident decoding, and measured end-to-end scheduling without moving EOM root authority into Core.
- **Evidence / blocker:** Depends on CORE-001 through CORE-003 and representative profiles. The [dated options packet](root-gpu-and-operations-options-2026-08-02.md) establishes a benchmark plan, not GPU suitability or a purchase result.
- **Completion:** CPU-reference and accelerator runs agree within declared discrete and continuous obligations, and profiles include decoding, indexing, transfer, divergence, fallback, reduction, and publication.

### CORE-007 — Experimental path import profile

- **Status:** Deferred / blocked
- **Priority object:** `experimental_path_import_profile`
- **Request / acceptance:** Define import adapters for observer-level experimental paths, beginning with a synthetic collider-track record carrying its unchanged source-native measurement payload, coordinate transforms, time basis, calibration, uncertainty, reconstruction provenance, selection history, and separately identified decoded or normalized path variants.
- **Evidence / blocker:** A public dataset and its scientific comparison mapping have not been selected.
- **Completion:** Imported records round-trip without losing uncertainty or provenance and cannot be mistaken for EOM-produced architrino histories.

### CORE-008 — Application client SDK

- **Status:** Deferred / blocked
- **Priority object:** `application_client_sdk`
- **Request / acceptance:** Provide thin clients for manifest validation, streaming subscriptions, queries, publication, caching, and progress/failure state after the contracts stabilize.
- **Evidence / blocker:** Building an SDK before contract fixtures would harden draft interfaces prematurely.
- **Completion:** Potential and one independent second application consume the same client contracts without application-specific path logic or a compatibility fork.

### CORE-009 — Root accelerator benchmark and operating decision

- **Status:** Deferred / blocked
- **Priority object:** `root_accelerator_benchmark_and_operating_decision`
- **Request / acceptance:** Execute the benchmark ladder in [Root GPU and operations options](root-gpu-and-operations-options-2026-08-02.md) on the local CPU/Metal reference posture and at least one rented FP64-capable accelerator, then select or reject a near-term operating posture from measured correctness, latency, throughput, memory, difficult-row rate, utilization, and total cost.
- **Evidence / blocker:** The current hardware table is a dated market snapshot. No common root workload, independently checked result, utilization profile, or backend parity record exists yet.
- **Completion:** The same versioned workload and input hashes run on each candidate; a separately authored reference or analytical case checks root identity and completeness; profiles include codec, upload, screening, compaction, refinement, fallback, accumulation, publication, and dollar cost; the decision names its workload envelope and falsifier.

## In progress

No rows.

## Verified

No rows.

## Superseded / withdrawn

No rows.
