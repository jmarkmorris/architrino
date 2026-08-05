# Potential App Work Queue

This is the canonical execution ledger for accepted `app-potential` work. [priorities.md](priorities.md) owns strategy, [requirements-and-design.md](requirements-and-design.md) owns the current application envelope, and [brainstorming.md](brainstorming.md) holds ideas that are not yet accepted implementation tasks.

## Rules

1. Promote an idea here only when it has a testable completion condition.
2. Keep EOM evolution, shared interchange, potential sampling, and rendering as separate responsibilities.
3. Treat a visual result as display-only unless its producing observable and numeric error contract grant stronger authority.
4. Do not choose a lossy representation without a declared consumer error budget and retained source provenance.

## Ranked Next Objects

1. `potential_consumer_and_publication_contract_v1` — [POT-001](#pot-001--potential-consumer-and-publication-contract-v1). Status: `Queued`.
2. `live_solver_timespace_pipeline_contract` — [POT-002](#pot-002--live-solver-timespace-pipeline-contract). Status: `Queued`.
3. `potential_slice_reference_surface` — [POT-003](#pot-003--potential-slice-reference-surface). Status: `Deferred / blocked`.
4. `timespace_map_reference_publisher` — [POT-004](#pot-004--timespace-map-reference-publisher). Status: `Deferred / blocked`.
5. `potential_gpu_streaming_surface` — [POT-005](#pot-005--potential-gpu-streaming-surface). Status: `Deferred / blocked`.

## Queued

### POT-001 — Potential consumer and publication contract v1

- **Status:** Queued
- **Priority object:** `potential_consumer_and_publication_contract_v1`
- **Request / acceptance:** Define the smallest app-side contract for selecting a path set, time or time interval, map-axis semantics, spatial domain, potential observable, error/display grade, sampling policy, output view, and publishable map product without choosing an unregistered app-local interchange format. If Potential needs a specialized map/tile codec, define it as an app-owned provider of the AAA Core codec contract.
- **Evidence / blocker:** [AAA Core](../app-aaa-core/priorities.md) is now the shared owner, but `aaa_core_path_interchange/v0` remains a first draft without fixtures.
- **Completion:** A versioned consumer/publication contract identifies every required upstream field, distinguishes source history from derived map data, defines fixed-$T$ 3D and time-spanning map products, and contains one small synthetic example plus negative cases for missing history, incompatible scales, unsupported precision, incomplete publication, and unknown observable versions.

### POT-002 — Live solver timespace pipeline contract

- **Status:** Queued
- **Priority object:** `live_solver_timespace_pipeline_contract`
- **Request / acceptance:** Define the incremental path from accepted EOM history chunks through decoding, potential sampling, map-tile updates, progressive display, and publishable snapshots. The contract must carry stream sequence, accepted-through time, source coverage, map coverage, lag, backpressure, failure, and final sealing state.
- **Evidence / blocker:** The EOM output contract already permits streamed accepted chunks. The [AAA Core architecture draft](../app-aaa-core/architecture-v0.md) now proposes the shared stream boundary, but its interchange and potential-kernel contracts are not yet frozen.
- **Completion:** A versioned state machine and sequence diagram demonstrate duplicate-free and omission-detecting ingestion, deterministic replay, bounded backpressure, fail-closed missing-history behavior, provisional-versus-sealed publication, and one end-to-end synthetic stream fixture.

## Deferred / blocked

### POT-003 — Potential slice reference surface

- **Status:** Deferred / blocked
- **Priority object:** `potential_slice_reference_surface`
- **Request / acceptance:** Implement a correctness-first 2D slice through a declared 3D domain at one absolute time, with visible scale, sign, clipping, uncertainty, provenance, and unavailable-data behavior.
- **Evidence / blocker:** Depends on POT-001 and the common path/interchange decision. Potential evaluation must use a declared shared or EOM-owned analysis capability rather than app-local physics.
- **Completion:** The slice agrees with an independently defined analytical case, fails closed on malformed or under-covered histories, and labels display resampling separately from authoritative inputs.

### POT-004 — Timespace map reference publisher

- **Status:** Deferred / blocked
- **Priority object:** `timespace_map_reference_publisher`
- **Request / acceptance:** Publish an immutable map product over a declared absolute-time interval, with explicit axis semantics, tiled coverage, observable version, error/display grade, source hashes, filters, and completeness state.
- **Evidence / blocker:** Depends on POT-001, POT-002, and the correctness-first reference sampler. A progressive live snapshot must not be labeled complete until its declared source and map coverage are sealed.
- **Completion:** A published synthetic map round-trips through its manifest, reproduces from the same accepted path chunks, exposes unavailable regions, and distinguishes fixed-$T$ spatial volumes, two-space-plus-time volumes, and full three-space-plus-time tiled products.

### POT-005 — Potential GPU streaming surface

- **Status:** Deferred / blocked
- **Priority object:** `potential_gpu_streaming_surface`
- **Request / acceptance:** Add a measured GPU-backed live 3D spatial and timespace-map surface after the reference sampler and publication contract fix observable semantics, completeness, and error handling.
- **Evidence / blocker:** The accelerator API, data layout, precision fallback, and representative workload are not selected. Many regular samples are a GPU candidate, while irregular roots and precision escalation may require a stricter return path.
- **Completion:** A representative live profile reports path-ingest rate, accepted-through lag, map-update latency, decode time, transfer time, kernel time, memory, difficult-row rate, dropped or delayed work, and numerical differences against deterministic replay through the reference sampler.

## Awaiting verification

No rows.

## In progress

No rows.

## Verified

No rows.

## Superseded / withdrawn

No rows.
