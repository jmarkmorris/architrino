# Archie Service MCP Adapter Concept Synthesis

This document retains provisional retrieval and service ideas that are not accepted MCP adapter tasks. Stable protocol, transport, deployment, indexing, and client-conformance rules belong in the existing focused contracts and [work-queue.md](work-queue.md).

## Retrieval and Capability Boundaries

Client-facing discovery should expose only the declared service capabilities, snapshot identity, freshness, limits, and public routes needed for safe use. Retrieval budgets should be explicit across record count, character count, graph depth, and response bytes so truncation is visible rather than inferred.

## Evidence and Performance Boundaries

Semantic retrieval, traversal caches, signatures, and private visibility profiles require separate evidence and security decisions. Search misses define the need for a semantic fallback; measured traversal cost defines the need for caches; a signature is meaningful only with a declared key-distribution and trust model; and private priority access must remain isolated from public visibility and cache identities.

## Unresolved Ideas

- **[inferred] Capability discovery surface.** Determine whether a compact resource or tool should expose supported schemas, snapshot freshness, service version, and declared limits without revealing internal deployment details; next object: a typed response and negative disclosure cases.
- **[inferred] Client-selected retrieval budget.** Define bounded record, character, graph-depth, and response-byte controls with explicit truncation semantics; falsifier: a supported client context cannot be reconstructed within the declared budget contract.
- **[closure target] Deterministic-search recall benchmark.** Build a reviewed question set and measure misses before considering embeddings; the benchmark must state corpus scope, relevance judgments, and the semantic fallback's exact job.
- **[inferred] Typed graph-path caches.** Profile ordinary bounded traversal before specifying cached paths; promotion is blocked unless measured latency or cost identifies a reproducible bottleneck.
- **[inferred] Reader deep links.** Return a matching public Architrino route separately from repository paths for developer clients; next object: a route/path distinction in the tool contract and client fixtures.
- **[guessed] Signed snapshot manifests.** Specify signing, key distribution, rotation, and trust before treating a signature as commit verification; likely destination: a focused security contract if accepted.
- **[closure target] Private operator retrieval profile.** Define authorization and cache isolation for priority material without mixing it into the public service; falsifier: any public response, index, or cache key reveals private-scope content or identity.
