# Potential App Work Log

This file is the chronological work log for the `app-potential` priority area. Use [priorities.md](priorities.md) for strategy, [work-queue.md](work-queue.md) for accepted executable work, [brainstorming.md](brainstorming.md) for provisional ideas, and [requirements-and-design.md](requirements-and-design.md) for the current application boundary.

## Log Entries

### 2026-09-02 — Potential Bound To CORE-005 Query And Publication Semantics

- Bound Potential's accepted consumer and live-pipeline contracts to `aaa_core_query_transform_publication/v0` for equivalent-request normalization, ordered transforms, cache identity, source closure, authority propagation, sealing, and receipt-bound retrieval.
- Reused the registered `potential_fixture_map_json/v1` provider in the complete CORE-005 fixture and retained Potential ownership of observable and map-product semantics.
- Retrieved the exact sealed fixture product through an explicitly permitted Equation Mapping consumer, without defining another application-local path or publication schema.
- Claim boundary: this is synthetic cross-application contract conformance only. It does not execute a potential kernel, establish a reference surface, publish a production map, or prove scientific correctness.

Plainly: Potential can use Core's shared identity and handoff rules, but a scientific owner must still supply the independently checkable potential calculation needed for POT-003.

Closure goal: close the first reference slice only after its potential observable and independent analytical check are declared.

### 2026-09-02 — CORE-004 accepted-history stream conformance

- The accepted [`aaa_core_accepted_history_stream/v0`](../app-aaa-core/accepted-history-stream-v0.md) now supplies the shared sequencing, duplicate, bounded-buffer, acknowledgement, backpressure, disconnect/reconnect, replay, sealing, and exact halt semantics consumed by Potential's live pipeline contract.
- Updated the Potential control record and prose from proposed to accepted upstream status without changing Potential's app-owned state machine or promoting its fixture event envelope into production interchange.
- Preserved the blocker: the first reference slice still requires an independently defined analytical potential and a declared scientific sampling owner.

Plainly: the shared delivery rulebook is no longer hypothetical. Potential's remaining first-slice blocker is the calculation it must check, not how accepted chunks reach the app.

### 2026-09-02 — CORE-003 codec-registry conformance

- The accepted [`aaa_core_codec_registry/v0`](../app-aaa-core/codec-registry-v0.md) now registers `potential_fixture_map_json/v1` as an application-owned, fixture-only provider with exact canonical-JSON round trip and derived-analysis authority.
- Aligned Potential's `analysis` and `display` aliases to the shared `precision_bounded_analysis` and `display_stream` profile identifiers and refreshed the request identity.
- Retained the production boundary: no map/tile representation has been selected or measured, and the fixture codec supplies no scientific-kernel or EOM authority.

Plainly: Potential's test map now uses the same profile names and registry that Core enforces. A real production map format still has to earn acceptance on measured workloads.

### 2026-09-02 — CORE-001 upstream conformance

- The accepted [`aaa_core_path_interchange/v0`](../app-aaa-core/path-interchange-v0.md) fixture maps every upstream field required by Potential's consumer/publication contract and carries a source-bound Potential view plus sealed derived-product manifest.
- The Potential control record marked the logical path interchange accepted while the codec registry was still proposed; the later CORE-003 entry records its acceptance.
- Claim boundary: this is synthetic field-level conformance only. It does not close the Core stream-service behavior, register a production codec, execute a potential kernel, or publish a scientific map.

Plainly: Potential no longer depends on an undefined path envelope, but it still depends on unfinished transport, codec, and scientific-computation layers.

### 2026-09-02 — POT-002 live timespace pipeline contract v1

- Closed POT-002 with the accepted [machine-readable contract](potential-live-timespace-pipeline-contract.v1.json), [state-machine and cross-owner sequence specification](potential-live-timespace-pipeline-contract-v1.md), [three-chunk synthetic stream](fixtures/potential-live-timespace-pipeline.synthetic.v1.json), [ten-case negative suite](fixtures/potential-live-timespace-pipeline-negative.v1.json), executable checker, and focused tests.
- Kept AAA Core ownership intact: `aaa_core_accepted_history_stream/v0` was then a proposed typed dependency, while `potential_live_pipeline_fixture_event/v1` remained an in-repository test harness. CORE-004 later accepted the shared semantics without promoting the fixture envelope into production transport.
- Exercised three contiguous accepted chunks and map tiles over $T=0$ through $T=3$, one exact duplicate, two provisional snapshots, one bounded backpressure entry and release, exact source sealing, and immutable derived-product publication.
- Replayed the same accepted prefix without the duplicate and reproduced sealed product SHA-256 `de5685831fea7c93e91d06cdae783e2d54f7a45fee3e3f5761ac17dbd3d72fd2`.
- Rejected candidate EOM output, a missing sequence, a changed duplicate, a broken predecessor, buffer overflow, out-of-order map completion, premature source sealing, source rebinding, exact producer halt, and mutation after sealing.
- Wired the checker into the content-integrity runner, removed POT-002 from the live queue, and promoted deferred POT-003 to local rank 1.

Plainly: Potential's live bookkeeping is now executable and fail-closed. The result does not implement the Core transport or a production potential kernel, so the reference slice remains blocked on those separate owners.

### 2026-09-02 — POT-001 consumer and publication contract v1

- Closed POT-001 with the accepted [versioned contract](potential-consumer-publication-contract.v1.json), [eight-cell synthetic example](fixtures/potential-consumer-publication.synthetic.v1.json), [five-case negative suite](fixtures/potential-consumer-publication-negative.v1.json), executable checker, and focused tests.
- Enumerated the required upstream path-history identity, coverage, coordinate, normalized-scale, numeric, interpolation, and provenance fields without defining a competing `aaa_core_path_interchange/v0` payload.
- Defined fixed-$T$ spatial volumes on $(X^1,X^2,X^3)$, timespace volumes on $(u,v,T)$, and full timespace products on $(X^1,X^2,X^3,T)$. The synthetic example exercises the first class; the contract fixes the other two classes and their interval-time semantics.
- Kept immutable source history separate from derived map values. The publication retains source hashes and authority, cannot carry source-history payloads, cannot replace the source manifest, and cannot serve as solver-continuation input.
- Registered the fixture codec as an `app-potential` provider candidate for the then-proposed AAA Core codec registry. CORE-003 later accepted that fixture capability without selecting a production map/tile encoding.
- Confirmed exact refusal behavior for missing history, incompatible scales, unsupported precision, incomplete sealed publication, and unknown observable versions. Additional focused negatives cover geometry mismatch, source rebinding, unregistered codecs, source-history leakage, and stale request or map identity.
- Wired the checker into the full content-integrity runner, removed POT-001 from the live queue, and promoted POT-002 to local rank 1.

Plainly: Potential now has a testable loading-and-publication agreement. Live solver streaming remains separate and is the next contract task.

### 2026-08-02 — Potential Codec Provider Boundary Clarified

- Kept the logical interchange model, registry, common envelopes, and conformance rules with AAA Core.
- Assigned any specialized published Potential map/tile encoder and decoder to Potential as a registered AAA Core provider.
- Kept transient GPU textures, vertex buffers, and renderer caches private when they are not published or consumed across a process boundary.

Plainly: Potential can optimize its map data for real-time use without turning that application-specific format into an undocumented island.

### 2026-08-02 — AAA Core Became The Shared Owner

- Accepted [AAA Core](../app-aaa-core/priorities.md) as the shared path factory and service layer.
- Replaced the unnamed suite/interchange dependency with the first [AAA Core architecture draft](../app-aaa-core/architecture-v0.md).
- Moved suite-wide interchange, codec, experimental-import, filtering, accelerator, and reaction-workspace ideas from Potential brainstorming into AAA Core ownership.
- Retained Potential ownership of map selection, progressive assembly, publication behavior, rendering, and app interaction.

Plainly: Potential now asks AAA Core for shared path and compute services instead of developing its own incompatible path system.

### 2026-08-02 — Timespace Publication And Live EOM Streaming Accepted

- Promoted timespace-map publication and real-time EOM path-stream consumption from optional future ideas into required `app-potential` capabilities.
- Required every map to distinguish a fixed-$T$ 3D spatial volume, a two-space-plus-time volume, or a tiled full three-space-plus-time product.
- Added publishable map manifests with source hashes, observable version, axes, domain, time interval, resolution, filters, error/display grade, coverage, completeness, and publication identity.
- Established a published potential-timespace map as a reusable derived interchange product that remains bound to, and does not replace, its source path manifest.
- Added a live accepted-history pipeline with source, consumer, and map-completion watermarks; deterministic replay; duplicate handling; missing-predecessor failure; backpressure; and provisional-versus-sealed publication.
- Expanded the queue with the live-pipeline contract, reference publisher, and measured GPU streaming surface.

Plainly: Potential must be able to build and share maps across time, and it must update those maps while accepted solver history is still arriving without disguising lag or incomplete coverage.

### 2026-08-02 — Priority Area Created

- Accepted `app-potential` as the priority-directory name and `Potential` as the display name.
- Established the application as a standalone consumer of provenance-complete path histories and declared potential observables.
- Recorded 2D slices as the first reference visualization surface; later on 2026-08-02, 3D spatial maps, timespace publication, and live time playback became required capabilities.
- Kept EOM forward evolution outside the application and deferred the common path schema, codec family, shared libraries, and accelerator API to a suite-level architecture decision.
- Captured the application-suite, experimental-import, filter/shaping, heterogeneous GPU, and reaction-workspace ideas in [brainstorming.md](brainstorming.md).
- Queued the smallest next object, later expanded to `potential_consumer_and_publication_contract_v1`.

Plainly: the app now has an owned planning home and a clear first contract, while the shared path system remains a separate architecture decision rather than being buried inside the viewer.
