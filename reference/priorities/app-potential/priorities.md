# Potential App

## Workstream Metadata

- Kind: `priority-app-candidate`
- Status: `design-open`
- Claim level: `priority-design`
- App name: `Potential`
- Priority directory: `app-potential`
- Execution ledger: [work queue](work-queue.md)
- Requirements packet: [requirements and design](requirements-and-design.md)
- Exploratory notes: [brainstorming](brainstorming.md)
- Chronological record: [work log](work-log.md)
- Shared platform: [AAA Core](../app-aaa-core/priorities.md)
- Ranking: pending the scientific reference sampler and measured representative workload estimates

## Objective

Build a standalone application that reconstructs, displays, and publishes declared causal-wake potential observables from provenance-complete path specifications. Required surfaces include 2D spatial slices at a declared absolute time, 3D spatial maps at a declared absolute time, and timespace maps over a declared absolute-time interval.

The application must also accept an advancing EOM path-history stream and update the corresponding 3D spatial and timespace maps in real time. Progressive output must expose its accepted-through time, coverage, latency, and completeness; it must not present an incomplete live map as a sealed result.

The application must remain a consumer of path histories and declared potential-query results. It must not become another forward solver, silently complete missing histories, or promote a display approximation into EOM or physical evidence.

## Current Decisions

1. The accepted name is `app-potential`; the display name is `Potential`.
2. The application is standalone but is intended to participate in a larger interoperating suite of applications.
3. Path specifications, including retained history, are a primary interchange mechanism.
4. Precision, dynamic range, compression ratio, decode latency, random access, and GPU upload cost are first-class design variables rather than after-the-fact storage concerns.
5. One logical path model may have multiple declared encodings for different authority, storage, and performance requirements.
6. Imported experimental paths, including collider reconstructions, must carry observer-level provenance and transformation metadata; they are not silently reclassified as architrino histories.
7. Filters and shaping operations are non-destructive query/view definitions over immutable source records.
8. EOM evolution remains owned by the EOM solver. Potential sampling, path decoding, and rendering must have separate owners and versioned contracts.
9. Numerical instantiations use normalized wake-speed units with $c_f=1$; imported records require an explicit scale transform before combination.
10. A published map declares whether its displayed axes are three spatial axes at fixed $T$, two spatial axes plus $T$, or a view into a full three-space-plus-time data product.
11. Live mode consumes accepted EOM history chunks incrementally, reports an accepted-through watermark, and supports deterministic replay into the same map product.
12. Published map products retain source-manifest hashes, observable and kernel versions, domain and resolution, error/display grade, filters, completeness, and publication identity.
13. A published potential-timespace map is a reusable derived interchange product for other applications, but it never replaces its source path manifest or inherits more authority than its producer contract grants.
14. Potential may own a specialized map/tile encoder and decoder, but any published or cross-process representation registers as an AAA Core codec provider. Only transient rendering buffers remain app-private.

## First Blocker

[AAA Core](../app-aaa-core/priorities.md) owns the shared path, stream, query, and publication boundary. The accepted [AAA Core Path Interchange v0](../app-aaa-core/path-interchange-v0.md) supplies Potential's fixture-backed logical records, the accepted [AAA Core Codec Registry v0](../app-aaa-core/codec-registry-v0.md) registers Potential's synthetic map codec at fixture-conformance grade, the accepted [AAA Core Accepted-History Stream v0](../app-aaa-core/accepted-history-stream-v0.md) supplies duplicate-tolerant bounded subscription and replay semantics, the accepted [Query, Transform, And Publication v0](../app-aaa-core/query-transform-publication-v0.md) fixes stable cache and receipt identity, and the accepted [AAA Core Client v0](../app-aaa-core/client-v0.md) exposes those contracts to Potential and Equation Mapping without application-local path logic. POT-001 and POT-002 fix Potential's app-side loading, live-consumer, and publication behavior. POT-003 now waits on an independently defined analytical potential case plus a declared shared or EOM-owned sampling capability.

Plainly: Potential and Core now agree on source paths, codec identity, live delivery, query identity, and publication receipts. Potential still cannot build the reference slice until a scientific owner supplies a checkable potential calculation.

## Consumer And Publication Contract V1

POT-001 is closed by the accepted [versioned contract](potential-consumer-publication-contract.v1.json), its [small synthetic fixture](fixtures/potential-consumer-publication.synthetic.v1.json), the [five-case negative suite](fixtures/potential-consumer-publication-negative.v1.json), and the executable checker. The contract enumerates every required upstream path-history field; keeps immutable source-history references separate from derived map cells; defines fixed-$T$ spatial volumes, two-space-plus-time volumes, and full three-space-plus-time products; and registers the synthetic map codec as a fixture-only `app-potential` provider of the accepted AAA Core codec registry rather than as a competing interchange schema.

Plainly: the app can ask for a specific map and publish it without copying or replacing the paths that produced it. A missing history, scale mismatch, unsupported precision, incomplete sealed map, or unknown observable version now stops the request with a named reason.

## Live Timespace Pipeline Contract V1

POT-002 is closed by the accepted [Potential-side live pipeline contract](potential-live-timespace-pipeline-contract.v1.json), its [state-machine and sequence specification](potential-live-timespace-pipeline-contract-v1.md), the [three-chunk synthetic stream](fixtures/potential-live-timespace-pipeline.synthetic.v1.json), the [ten-case negative suite](fixtures/potential-live-timespace-pipeline-negative.v1.json), and the executable checker. The contract exposes source, consumer, and map-completion watermarks; exact lag; queue depth and buffered bytes; missing tiles; bounded backpressure; duplicate idempotency; predecessor-chain failures; source halt; provisional snapshots; and immutable sealing.

Plainly: the app can fall behind without hiding it, receive the same chunk twice without double-counting it, and stop safely when a chunk is missing or changed. A complete product appears only after all three synthetic chunks and their map tiles are accounted for.

The fixture envelope is explicitly test-only. The contract consumes accepted `aaa_core_accepted_history_stream/v0` semantics while leaving the shared envelope and production transport with AAA Core. Deterministic replay of the accepted prefix, with the harmless duplicate removed, reproduces the same sealed product hash.

Plainly: the test proves Potential's bookkeeping, not a production stream service, production latency, or a physical potential result.

## Promotion Boundary

This lane owns application requirements, consumer behavior, visualization, performance measurements, display-grade evidence, and any Potential-specific registered map/tile codec provider. The EOM solver owns forward evolution and accepted history production. Scientific lanes own the meaning and authority of imported observables. [AAA Core](../app-aaa-core/priorities.md) owns shared path interchange, codec registration and common providers, streaming, queries, reusable compute dispatch, and derived-product publication.
