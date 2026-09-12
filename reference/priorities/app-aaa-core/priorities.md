# AAA Core

## Workstream Metadata

- Kind: `priority-platform`
- Product classification: `shared-headless-application-platform`
- Status: `logical-service-contracts-and-client-v0-accepted; measured-workloads-blocked`
- Claim level: `priority-contract-and-design`
- Platform name: `AAA Core`
- Priority directory: `app-aaa-core`
- Architecture draft: [AAA Core architecture v0](contracts/architecture-v0.md)
- Accepted path interchange: [AAA Core Path Interchange v0](contracts/path-interchange-v0.md)
- Accepted codec registry: [AAA Core Codec Registry v0](contracts/codec-registry-v0.md)
- Accepted history stream: [AAA Core Accepted-History Stream v0](contracts/accepted-history-stream-v0.md)
- Accepted query and publication contract: [AAA Core Query, Transform, And Publication v0](contracts/query-transform-publication-v0.md)
- Accepted application client: [AAA Core Client v0](contracts/client-v0.md)
- Accepted shared Potential API: [AAA Core Potential v1](contracts/potential-v1.md)
- Execution ledger: [work queue](work-queue.md)
- Exploratory notes: [brainstorming](brainstorming.md)
- Chronological record: [work log](work-log.md)
- Representative workload contract: [path workload matrix](contracts/representative-path-workload-matrix.md)
- Ranking: pending measured representative workload estimates and external dataset or accelerator access

## Objective

Establish AAA Core as the headless factory and shared-service layer for the interoperating application suite. AAA Core owns the canonical logical path model, path construction and validation services, representation profiles, codec control plane and common codec providers, storage, indexing, streaming, queries, reproducible transforms, resource dispatch, and publication of path-derived products.

AAA Core is not one monolithic runtime. It is a collection of focused services behind versioned contracts so that each application can consume the capabilities it needs without copying path logic or depending on another application's private state.

AAA Core is not an end-user application. It has no public scene, visitor launch route, standalone HTML entrypoint, or browser composition root. The `app-aaa-core` directory name is retained as a compatibility routing identifier, and the accepted `aaa_core_*` schemas, capability IDs, classes, and refusal codes remain unchanged.

## Current Decisions

1. The retained compatibility directory name is `app-aaa-core`; the platform name is `AAA Core`. Neither name places Core in the public application catalogue.
2. Path histories are the primary interchange object. Derived maps, query views, ledgers, and experimental comparison records are separately versioned interchange products bound to their sources.
3. One logical path model supports multiple purpose-specific encodings rather than forcing every consumer through one storage format.
4. Authoritative history, precision-bounded analysis, and display-stream representations remain visibly distinct.
5. EOM is the sole forward production solver. AAA Core may submit EOM requests and distribute accepted outputs, but it does not reimplement evolution or acceptance decisions.
6. Applications own user experience and app-specific composition. AAA Core owns reusable path and data-plane services.
7. Scientific owners define observable kernels and evidence meaning. AAA Core registers, dispatches, and records versioned kernels without inventing their physics.
8. Regular bulk path work is GPU-ready by design; difficult geometry, adaptive precision, and certification use explicit stricter return paths.
9. Experimental paths enter through provenance- and uncertainty-preserving import adapters and remain observer-level unless a validated mapping says otherwise.
10. Every service operation is reproducible from immutable inputs, a versioned request, declared numeric policy, and an output manifest or exact failure record.
11. Core owns codec registration, capability negotiation, common envelopes, conformance, and broadly reusable providers. Solvers, applications, and experimental adapters may own specialized codec providers, but any published or cross-process representation registers with Core.
12. Source-native experimental measurements are preserved unchanged. Calibrated, filtered, normalized, or model-coordinate path variants are separately identified derived products.
13. Root acceleration uses staged regular queues, candidate compaction, conditioning buckets, explicit difficult-row return, and deterministic accounting; the scientific owner retains the root equation and completeness rules.
14. The initial operating posture is hybrid and benchmark-gated: local Apple hardware may serve development, operations, display, decoding, and bulk preprocessing, while cloud FP64-capable GPUs are rented for measured root campaigns before any accelerator purchase decision.

## Current Blocker

The accepted path, codec, accepted-history, query/publication, client, and Potential contracts are the current service boundaries. Their detailed synthetic-conformance results and closure history remain in the focused contract owners and [work log](work-log.md); they establish neither production transport or service behavior nor scientific or performance acceptance. No application should create a competing local path schema, and Core owns no Potential page, scene, controls, or visualization.

Plainly: Core computes and packages Potential results; applications decide how to show them, and no application fills a missing result with zero.

No executable Core queue row remains. CORE-006 and CORE-009 require measured local and rented-accelerator workloads, while CORE-007 requires a selected public experimental dataset and scientific comparison mapping. Production transport, persistence, authentication, and retention choices remain open but are not independently accepted queue objects.

The [representative path workload matrix](contracts/representative-path-workload-matrix.md) is accepted as the shared benchmark definition for EOM continuation, Potential live maps, reaction studies, optimization sweeps, and collider imports. All five workloads remain unmeasured; the matrix selects no representation, deployment, or accelerator posture.

## Promotion Boundary

This lane owns shared application infrastructure and its measured software behavior. It does not grant EOM authority, derive a physical observable, promote an experimental comparison, or turn a display approximation into evidence. Those claims remain with their solver, scientific, or experimental owners.

## Manuscript synthesis

The [manuscript](manuscript.md) develops logical paths, encodings, accepted-history streams, source-bound products and the limits of local conformance. [Source coverage](analysis/manuscript-source-coverage.md) preserves all original dispositions and verification limits; the [independent fidelity review](analysis/manuscript-review.md) records the closed supporting correction. This editorial synthesis does not execute the deferred workloads or accept production or scientific capabilities.
