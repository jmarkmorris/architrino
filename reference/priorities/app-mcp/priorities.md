# Architrino MCP

## Workstream Metadata

- Kind: `priority-app-candidate`
- Status: `seeded-unranked`
- Claim level: `priority-only`

## Current

This folder owns the proposed Model Context Protocol (MCP) access layer for the Architrino knowledge system.

The target is a read-only, source-grounded protocol surface over versioned indexes built from the repository's accepted `main` snapshot. The repository remains authoritative. Generated indexes and MCP responses remain derived routing and retrieval artifacts; they do not promote theory claims or replace authored corpus sources.

The starting design is recorded in [architecture-proposal.md](architecture-proposal.md). Provisional extensions belong in [brainstorming.md](brainstorming.md), and dated implementation or adjudication history belongs in [work-log.md](work-log.md).

## Objective

Define and implement the smallest deterministic MCP service that lets compatible AI clients search, read, and traverse Architrino source material while preserving repository provenance, source authority, visibility policy, and proof-status boundaries.

## Queue

1. `source_index_contract` — Define one versioned source-index snapshot contract containing search, graph, and metadata views, with repository ref, schema versions, hashes, source classes, canonical parents, visibility, freshness, and rollback parent. Status: `next`. Depends on: the existing Archie source-ingestion and retrieval-context contract.
2. `mcp_tool_contract_v1` — Specify request and response schemas, size limits, pagination, errors, provenance, and fail-closed behavior for the V1 tools `search`, `read`, `topics`, and `neighbors`. Status: `pending`. Depends on: `source_index_contract`.
3. `deterministic_index_builder` — Extend the existing check-only Archie source-index scaffold into an independently reviewable builder for immutable search, graph, and metadata artifacts. Status: `pending`. Depends on: `source_index_contract`.
4. `fixture_backed_mcp_server` — Implement a local fixture-backed MCP adapter with no model calls, repository writes, public deployment, or per-request repository scan. Status: `pending`. Depends on: `mcp_tool_contract_v1`, `deterministic_index_builder`.
5. `transport_and_client_conformance` — Verify the selected MCP transport and tool schemas against current official MCP specifications and test at least Codex, Claude, and ChatGPT where supported. Status: `pending`. Depends on: `fixture_backed_mcp_server`.
6. `host_and_deployment_decision` — Refresh the provisional hosting comparison, choose a host, and define staging, production, health checks, rollback, rate limits, logs, secrets, and availability expectations. Status: `pending`. Depends on: `transport_and_client_conformance`.
7. `higher_order_graph_tools` — Add mechanically checkable graph operations such as `walk`, `trace`, `compare`, `related`, `context`, and `learning_path` only after their semantics and source-authority limits are fixture-tested. Status: `deferred`. Depends on: accepted V1 service evidence.
8. `hybrid_semantic_retrieval` — Add embeddings only as a declared fallback after deterministic retrieval, with model/provider, privacy, freshness, cost, and source-authority gates. Status: `deferred`. Depends on: stable deterministic retrieval and measured recall gaps.

## Current Blocker

The proposal does not yet define an executable source-index snapshot or MCP response contract. Without those contracts, implementation could duplicate the existing Archie service source-index work, blur source authority, or let higher-order tool names imply reasoning or proof that the deterministic graph cannot establish.

## Next Action

Write `source-index-snapshot/v1` as a focused schema-and-fixture packet that reuses the existing Archie source classes and live generated graph artifacts. Prove that the same pinned repository snapshot produces the same normalized records and hashes before implementing a network service.

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

- [Archie service source ingestion and retrieval context](../app-archie-interface/source-ingestion-retrieval-context-contract.md)
- [Archie manifest-driven service architecture](../app-archie-interface/manifest-driven-service-architecture.md)
- [Archie service deployment architecture](../archie/service-deployment-architecture.md)
- [Archie service scaffolding and fixtures](../archie/service-scaffolding-and-fixtures.md)
- [Archie Interface App](../app-archie-interface/priorities.md)

## Promotion Map

- Keep architecture decisions, tool contracts, deployment evidence, and implementation status in this priority folder until accepted.
- Promote stable public usage instructions into the appropriate Archie or app documentation only after the service and client compatibility are verified.
- Do not link reader-facing corpus prose to this priority packet. If a stable explanation belongs in the corpus, restate it in the owning reader-facing document.
