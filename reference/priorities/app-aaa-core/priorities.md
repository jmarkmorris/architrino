# AAA Core

## Workstream Metadata

- Kind: `priority-platform`
- Status: `first-draft-awaiting-verification`
- Claim level: `priority-design`
- Platform name: `AAA Core`
- Priority directory: `app-aaa-core`
- Architecture draft: [AAA Core architecture v0](architecture-v0.md)
- Execution ledger: [work queue](work-queue.md)
- Exploratory notes: [brainstorming](brainstorming.md)
- Chronological record: [work log](work-log.md)
- Ranking: pending contract review and representative workload estimate

## Objective

Establish AAA Core as the headless factory and shared-service layer for the interoperating application suite. AAA Core owns the canonical logical path model, path construction and validation services, representation profiles, codec control plane and common codec providers, storage, indexing, streaming, queries, reproducible transforms, resource dispatch, and publication of path-derived products.

AAA Core is not one monolithic runtime. It is a collection of focused services behind versioned contracts so that each application can consume the capabilities it needs without copying path logic or depending on another application's private state.

## Current Decisions

1. The accepted name is `app-aaa-core`; the platform name is `AAA Core`.
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

## First Blocker

The first draft [AAA Core architecture v0](architecture-v0.md) needs review and a concrete `aaa_core_path_interchange/v0` contract with fixtures. Its codec-provider interface and capability declaration are now part of that blocker. Until the contract is ratified, no application should create a competing local path schema or unregistered interchange codec.

## Promotion Boundary

This lane owns shared application infrastructure and its measured software behavior. It does not grant EOM authority, derive a physical observable, promote an experimental comparison, or turn a display approximation into evidence. Those claims remain with their solver, scientific, or experimental owners.
