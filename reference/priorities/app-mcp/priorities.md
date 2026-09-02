# Architrino MCP

## Workstream Metadata

- Kind: `priority-app-candidate`
- Rank: `16`
- Value: `1.06`
- Cost: `2.9`
- ROI: `0.37`
- Status: `active-client-conformance`
- Claim level: `priority-only`

## Current

This folder owns the proposed Model Context Protocol (MCP) access layer for the Architrino knowledge system.

The target is a read-only, source-grounded protocol surface over versioned indexes built from the repository's accepted `main` snapshot. The repository remains authoritative. Generated indexes and MCP responses remain derived routing and retrieval artifacts; they do not promote theory claims or replace authored corpus sources.

The starting design is recorded in [architecture-proposal.md](architecture-proposal.md). The executable source-index contract is recorded in [source-index-snapshot-v1.md](source-index-snapshot-v1.md), the bounded four-tool boundary is recorded in [mcp-tool-contract-v1.md](mcp-tool-contract-v1.md), the fixture regression surface is recorded in [local-fixture-mcp-adapter.md](local-fixture-mcp-adapter.md), the complete local implementation is recorded in [full-corpus-local-v1.md](full-corpus-local-v1.md), the remote safety boundary is recorded in [remote-transport-deployment-hardening-v1.md](remote-transport-deployment-hardening-v1.md), the loopback HTTP implementation is recorded in [loopback-streamable-http-adapter.md](loopback-streamable-http-adapter.md), and independent client results are recorded in [client-conformance.md](client-conformance.md). Accepted tasks live in [work-queue.md](work-queue.md), provisional extensions belong in [brainstorming.md](brainstorming.md), and dated implementation or adjudication history belongs in [work-log.md](work-log.md).

## Objective

Define and implement the smallest deterministic MCP service that lets compatible AI clients search, read, and traverse Architrino source material while preserving repository provenance, source authority, visibility policy, and proof-status boundaries.

## Work Queue

The locally ranked execution order, lifecycle states, and acceptance boundaries live in [work-queue.md](work-queue.md).

## Current Blocker

No blocker remains for the loopback HTTP implementation, official SDK conformance, Codex fixture HTTP conformance, or the checked-in deployment-contract identity. Current full-corpus Codex HTTP remains unmeasured because the generated source index is stale. ChatGPT desktop HTTP remains unmeasured because it requires a fresh ChatGPT surface after connection discovery or restart. Remote readiness separately remains false because TLS ingress, a trusted proxy, exact deployment origins, an authorization server, an accepted-`main` snapshot, and a real prior rollback snapshot do not exist yet.

## Boundaries

- Reuse the existing Archie service source-index, retrieval-context, source-class, visibility, and System Card contracts rather than creating a competing knowledge authority.
- Keep V1 read-only. No MCP tool may edit repository content, change branches, submit issues, or perform other external side effects.
- Use authored markdown as the primary source for corpus claims. Scene JSON and generated graph or reading-copy artifacts are routing or convenience layers with canonical-parent links.
- Exclude priority material from ordinary public retrieval unless development-status visibility is explicitly requested and returned as `priority-only`.
- A tool may return indexed facts, declared relationships, excerpts, and routes. It may not turn retrieval into proof, promote a claim, or substitute model memory for a missing source.
- Keep per-request execution independent of repository scanning. Request handlers read an already validated immutable snapshot.
- Treat hosting assessments, costs, free tiers, protocol support, and client compatibility as time-sensitive claims that require live verification before selection or launch.
- Do not introduce semantic embeddings until deterministic retrieval has a measured recall failure that embeddings are intended to address.

## Related Work

- [Archie service source ingestion and retrieval context](../dormant-deferred/archie/source-ingestion-retrieval-context-contract.md)
- [Archie manifest-driven service architecture](../dormant-deferred/archie/manifest-driven-service-architecture.md)
- [Archie service deployment architecture](../dormant-deferred/archie/service-deployment-architecture.md)
- [Archie service scaffolding and fixtures](../dormant-deferred/archie/service-scaffolding-and-fixtures.md)
- [Archie interface product plan](../dormant-deferred/archie/interface-product-plan.md)

## Promotion Map

- Keep architecture decisions, tool contracts, deployment evidence, and implementation status in this priority folder until accepted.
- Promote stable public usage instructions into the appropriate Archie or app documentation only after the service and client compatibility are verified.
- Do not link reader-facing corpus prose to this priority packet. If a stable explanation belongs in the corpus, restate it in the owning reader-facing document.
