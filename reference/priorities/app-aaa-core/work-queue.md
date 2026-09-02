# AAA Core Work Queue

This is the canonical execution ledger for accepted AAA Core work. [priorities.md](priorities.md) owns strategy, [architecture-v0.md](architecture-v0.md) is the current design draft, and [brainstorming.md](brainstorming.md) holds ideas that are not yet accepted tasks.

## Rules

1. Keep one canonical logical path model and test every concrete representation against it.
2. Keep EOM evolution, scientific kernels, shared data services, and application rendering as separate responsibilities.
3. Require immutable source identity, declared precision, provenance, authority, and exact failure behavior for every product.
4. Benchmark end-to-end consumer workloads; codec ratio or GPU kernel throughput alone is not an acceptance result.

## Next real work

No Core row is executable without new measured workload, external dataset, or accelerator evidence. Preserve the accepted logical contracts and client while those inputs are acquired.

## Ranked Next Objects

1. `heterogeneous_path_compute_architecture` — [CORE-006](#core-006--heterogeneous-path-compute-architecture). Status: `Deferred / blocked`.
2. `experimental_path_import_profile` — [CORE-007](#core-007--experimental-path-import-profile). Status: `Deferred / blocked`.
3. `root_accelerator_benchmark_and_operating_decision` — [CORE-009](#core-009--root-accelerator-benchmark-and-operating-decision). Status: `Deferred / blocked`.

## Awaiting verification

No rows.

## Queued

No rows.

## Deferred / blocked

### CORE-006 — Heterogeneous path-compute architecture

- **Status:** Deferred / blocked
- **Priority object:** `heterogeneous_path_compute_architecture`
- **Request / acceptance:** Implement staged candidate screening, compaction, bracket isolation, conditioning buckets, branch-preserving refinement queues, difficult-row return, stricter CPU or precision services, deterministic or bounded reductions, device-resident decoding, and measured end-to-end scheduling without moving EOM root authority into Core.
- **Evidence / blocker:** CORE-001 through CORE-003 now fix logical records, representative workloads, codec profiles, and provider/device-layout declarations. Every representative workload remains unmeasured, so the [dated options packet](root-gpu-and-operations-options-2026-08-02.md) remains a benchmark plan rather than GPU suitability or a purchase result.
- **Completion:** CPU-reference and accelerator runs agree within declared discrete and continuous obligations, and profiles include decoding, indexing, transfer, divergence, fallback, reduction, and publication.

### CORE-007 — Experimental path import profile

- **Status:** Deferred / blocked
- **Priority object:** `experimental_path_import_profile`
- **Request / acceptance:** Define import adapters for observer-level experimental paths, beginning with a synthetic collider-track record carrying its unchanged source-native measurement payload, coordinate transforms, time basis, calibration, uncertainty, reconstruction provenance, selection history, and separately identified decoded or normalized path variants.
- **Evidence / blocker:** The path-interchange observer fixture and codec-registry CSV decoder preserve immutable source identity, source-native bytes, ordered transforms, per-sample uncertainty, and observer-only authority. A public dataset, production decoder, and scientific comparison mapping have not been selected.
- **Completion:** Imported records round-trip without losing uncertainty or provenance and cannot be mistaken for EOM-produced architrino histories.

### CORE-009 — Root accelerator benchmark and operating decision

- **Status:** Deferred / blocked
- **Priority object:** `root_accelerator_benchmark_and_operating_decision`
- **Request / acceptance:** Execute the benchmark ladder in [Root GPU and operations options](root-gpu-and-operations-options-2026-08-02.md) on the local CPU/Metal reference posture and at least one rented FP64-capable accelerator, then select or reject a near-term operating posture from measured correctness, latency, throughput, memory, difficult-row rate, utilization, and total cost.
- **Evidence / blocker:** The current hardware table is a dated market snapshot. No common root workload, independently checked result, utilization profile, or backend parity record exists yet.
- **Completion:** The same versioned workload and input hashes run on each candidate; a separately authored reference or analytical case checks root identity and completeness; profiles include codec, upload, screening, compaction, refinement, fallback, accumulation, publication, and dollar cost; the decision names its workload envelope and falsifier.

## In progress

No rows.

## Verified

### CORE-010 — AAA Core Potential API

- **Status:** Verified on 2026-09-02.
- **Priority object:** `aaa_core_potential_v1`
- **Result:** The accepted [AAA Core Potential v1](potential-v1.md), machine contract, headless implementation, Topo consumer module, migrated Lorentz Geometry scheduler, and focused tests establish one supported Potential calculation and product boundary behind consuming applications.
- **Claim boundary:** This is prescribed-path software integration and fail-closed output conformance only. It does not independently validate the delayed-Potential kernel, establish a physical Potential result, add a standalone application, or grant EOM authority.

### CORE-008 — Application client SDK

- **Status:** Verified on 2026-09-02.
- **Priority object:** `application_client_sdk`
- **Result:** The accepted [AAA Core Client v0](client-v0.md), machine control record, schema, thin service/client implementation, two-application fixture, and focused tests expose manifest validation, codec negotiation, query identity, explicit stream subscriptions and progress, sealed publication caching, exact retrieval, and source failure state through one shared interface.
- **Claim boundary:** This is synchronous in-process client conformance only. It supplies no network API, durable service or cache, authentication, production retry, workload measurement, scientific kernel, EOM evolution, or application release.

### CORE-005 — Query, transform, and publication contract

- **Status:** Verified on 2026-09-02.
- **Priority object:** `query_transform_and_publication_contract`
- **Result:** The accepted [query, transform, and publication contract v0](query-transform-publication-v0.md), machine control record, schema, executable builder and validator, two positive fixtures, and fifteen negative controls close stable query/cache identity, explicit transform order, source closure, provisional/sealed state, authority propagation, and exact cross-application retrieval.
- **Claim boundary:** This is synthetic contract conformance only. It validates no transform scientifically, publishes no production product, deploys no cache or catalog, measures no workload, and grants no EOM or scientific authority.

### CORE-004 — Accepted-history stream contract

- **Status:** Verified on 2026-09-02.
- **Priority object:** `accepted_history_stream_contract`
- **Result:** The accepted [stream contract v0](accepted-history-stream-v0.md), machine control record, schema, in-process broker, three-chunk accepted path bundle, two separately implemented consumers, reconnect/replay and halt scenarios, and twelve negative controls close the shared sequencing and subscription contract.
- **Claim boundary:** This is synthetic in-process broker and consumer conformance only. It supplies no production network transport, durable service, measured performance, live EOM integration, scientific kernel, or application release.

### CORE-003 — Path codec profile contracts

- **Status:** Verified on 2026-09-02.
- **Priority object:** `path_codec_profile_contracts`
- **Result:** The accepted [codec registry v0](codec-registry-v0.md), machine control record, JSON Schema, executable negotiation and conformance layer, four provider capabilities, five positive cases, and eleven negative controls close the registry and provider-profile contract.
- **Claim boundary:** This is registry and synthetic conformance only. No provider is selected for production, no representative workload is measured, and no codec result grants EOM, scientific, experimental-interpretation, storage, transport, or accelerator authority.

### CORE-001 — AAA Core path interchange v0

- **Status:** Verified on 2026-09-02.
- **Priority object:** `aaa_core_path_interchange_v0`
- **Result:** The accepted [path-interchange v0 contract](path-interchange-v0.md), JSON control record, record schema, executable validator, five positive fixture families, ten negative controls, and Potential field-compatibility test close the logical interchange requirement.
- **Claim boundary:** This is contract and fixture conformance only. It supplies no production storage, transport, codec, scientific kernel, forward evolution, experimental interpretation, or accepted derived product.

## Superseded / withdrawn

No rows.
