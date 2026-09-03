# Archie Service MCP Adapter

## Workstream Metadata

- Kind: `priority-service-protocol-adapter`
- Rank: `unranked / dormant-deferred`
- Archived attention score: Value `1.06`; Cost `2.9`; ROI `0.37`
- Status: `dormant-deferred`
- Claim level: `priority-only`

## Current

This folder preserves the Model Context Protocol (MCP) adapter owned by the Archie service. It is a controlled integration boundary for compatible software clients, not a user-facing application, website, or standalone product. It is parked with its parent Archie service under `dormant-deferred`; its completed named-client conformance evidence and bounded higher-order graph extension remain preserved, and no parked row is executable until the operator explicitly reactivates the service lane.

The target is a read-only, source-grounded protocol surface over versioned indexes built from the repository's accepted `main` snapshot. The repository remains authoritative. Generated indexes and MCP responses remain derived routing and retrieval artifacts; they do not promote theory claims or replace authored corpus sources. MCP-003 passed the measured [deterministic-recall benchmark](deterministic-recall-benchmark-2026-09-02.md): bounded lexical normalization recovered all reviewed targets. The separate embeddings implementation proposal received a negative decision because no residual reviewed retrieval failure remained for embeddings to solve.

The starting design is recorded in [architecture-proposal.md](architecture-proposal.md). The executable source-index contract is recorded in [source-index-snapshot-v1.md](source-index-snapshot-v1.md), the primitive tool boundary is recorded in [mcp-tool-contract-v1.md](mcp-tool-contract-v1.md), the bounded multi-hop extension is recorded in [higher-order-graph-tools-v1.md](higher-order-graph-tools-v1.md), the fixture regression surface is recorded in [local-fixture-mcp-adapter.md](local-fixture-mcp-adapter.md), the complete local implementation is recorded in [full-corpus-local-v1.md](full-corpus-local-v1.md), the remote safety boundary is recorded in [remote-transport-deployment-hardening-v1.md](remote-transport-deployment-hardening-v1.md), the loopback HTTP implementation is recorded in [loopback-streamable-http-adapter.md](loopback-streamable-http-adapter.md), and independent client results are recorded in [client-conformance.md](client-conformance.md). Accepted tasks live in [work-queue.md](work-queue.md), provisional extensions belong in [brainstorming.md](brainstorming.md), and dated implementation or adjudication history belongs in [work-log.md](work-log.md).

## Objective

Define and implement the smallest deterministic MCP protocol adapter that lets authorized compatible software clients search, read, and traverse Architrino source material while preserving repository provenance, source authority, visibility policy, and proof-status boundaries.

## Work Queue

The locally ranked execution order, lifecycle states, and acceptance boundaries live in [work-queue.md](work-queue.md).

## Current Blocker

MCP-001 named-client conformance, MCP-002 bounded higher-order graph traversal, and MCP-003 deterministic-recall adjudication are complete. The local stdio and loopback HTTP surfaces expose deterministic `walk` over declared edges with explicit depth, node, page, cycle, provenance, visibility, and cursor rules. The reviewed MCP-003 benchmark measured 8-of-8 natural-language search recall, 2-of-2 exact reads, complete topic enumeration for its declared targets, and 2-of-2 declared-graph cases after a bounded deterministic lexical repair; embeddings remain unimplemented because no residual reviewed need survives that repair. The parent Archie service remains parked. Remote readiness separately remains false because TLS ingress, a trusted proxy, exact deployment origins, an authorization server, an accepted-`main` snapshot, and a real prior rollback snapshot do not exist yet.

## Boundaries

- Reuse the existing Archie service source-index, retrieval-context, source-class, visibility, and System Card contracts rather than creating a competing knowledge authority.
- Keep V1 read-only. No MCP tool may edit repository content, change branches, submit issues, or perform other external side effects.
- Do not list MCP in the user-facing application inventory or expose it through a static browser surface. A remote endpoint is a separately deployed, authenticated software-client protocol boundary only.
- Expose no local tools, live repository state, credentials, provider calls, prompts, resources, or durable user state through MCP.
- Use authored markdown as the primary source for corpus claims. Scene JSON and generated graph or reading-copy artifacts are routing or convenience layers with canonical-parent links.
- Exclude priority material from ordinary public retrieval unless development-status visibility is explicitly requested and returned as `priority-only`.
- A tool may return indexed facts, declared relationships, excerpts, and routes. It may not turn retrieval into proof, promote a claim, or substitute model memory for a missing source.
- Keep per-request execution independent of repository scanning. Request handlers read an already validated immutable snapshot.
- Treat hosting assessments, costs, free tiers, protocol support, and client compatibility as time-sensitive claims that require live verification before selection or launch.
- Do not introduce semantic embeddings until deterministic retrieval has a measured recall failure that embeddings are intended to address.

## Related Work

- [Archie service source ingestion and retrieval context](../source-ingestion-retrieval-context-contract.md)
- [Archie manifest-driven service architecture](../manifest-driven-service-architecture.md)
- [Archie service deployment architecture](../service-deployment-architecture.md)
- [Archie service scaffolding and fixtures](../service-scaffolding-and-fixtures.md)
- [Archie interface product plan](../interface-product-plan.md)

## Promotion Map

- Keep architecture decisions, tool contracts, deployment evidence, and implementation status in this priority folder until accepted.
- Promote stable software-client integration instructions into Archie service documentation only after the service and client compatibility are verified.
- Do not link reader-facing corpus prose to this priority packet. If a stable explanation belongs in the corpus, restate it in the owning reader-facing document.
