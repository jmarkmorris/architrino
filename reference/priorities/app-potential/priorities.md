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
- Ranking: pending the AAA Core contract and representative workload estimate

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

[AAA Core](../app-aaa-core/priorities.md) now owns the shared path and interchange boundary. Its first [architecture draft](../app-aaa-core/architecture-v0.md) is not yet a fixture-backed contract, so `app-potential` must continue to avoid inventing an app-local schema or an unregistered interchange codec.

## Promotion Boundary

This lane owns application requirements, consumer behavior, visualization, performance measurements, display-grade evidence, and any Potential-specific registered map/tile codec provider. The EOM solver owns forward evolution and accepted history production. Scientific lanes own the meaning and authority of imported observables. [AAA Core](../app-aaa-core/priorities.md) owns shared path interchange, codec registration and common providers, streaming, queries, reusable compute dispatch, and derived-product publication.
