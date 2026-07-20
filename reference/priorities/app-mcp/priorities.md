# Architrino MCP

## Workstream Metadata

- Kind: `priority-app-candidate`
- Status: `seeded-unranked`
- Claim level: `priority-only`

## Current

This folder owns the proposed Model Context Protocol (MCP) access layer for the Architrino knowledge system.

The target is a read-only, source-grounded protocol surface over versioned indexes built from the repository's accepted `main` snapshot. The repository remains authoritative. Generated indexes and MCP responses remain derived routing and retrieval artifacts; they do not promote theory claims or replace authored corpus sources.

The starting design is recorded in [architecture-proposal.md](architecture-proposal.md). The first executable source-index contract is recorded in [source-index-snapshot-v1.md](source-index-snapshot-v1.md), the bounded four-tool boundary is recorded in [mcp-tool-contract-v1.md](mcp-tool-contract-v1.md), the runnable local stdio surface is recorded in [local-fixture-mcp-adapter.md](local-fixture-mcp-adapter.md), and independent client results are recorded in [client-conformance.md](client-conformance.md). Provisional extensions belong in [brainstorming.md](brainstorming.md), and dated implementation or adjudication history belongs in [work-log.md](work-log.md).

## Objective

Define and implement the smallest deterministic MCP service that lets compatible AI clients search, read, and traverse Architrino source material while preserving repository provenance, source authority, visibility policy, and proof-status boundaries.

## Queue

1. `chatgpt_desktop_conformance` — Add the [local fixture adapter](local-fixture-mcp-adapter.md) as a temporary ChatGPT desktop stdio connection from a fresh client session, call all four tools, record structured-result and missing-source behavior, then remove the temporary connection if it should not persist. Status: `operator-session-required`. Depends on: the completed official SDK and Codex passes in [client-conformance.md](client-conformance.md).
2. `host_and_deployment_decision` — Refresh the provisional hosting comparison, choose a host, and define staging, production, health checks, rollback, rate limits, logs, secrets, and availability expectations. Status: `pending`. Depends on: `chatgpt_desktop_conformance`.
3. `higher_order_graph_tools` — Add mechanically checkable graph operations such as `walk`, `trace`, `compare`, `related`, `context`, and `learning_path` only after their semantics and source-authority limits are fixture-tested. Status: `deferred`. Depends on: accepted V1 service evidence.
4. `hybrid_semantic_retrieval` — Add embeddings only as a declared fallback after deterministic retrieval, with model/provider, privacy, freshness, cost, and source-authority gates. Status: `deferred`. Depends on: stable deterministic retrieval and measured recall gaps.

## Current Blocker

The official TypeScript SDK V1 and installed Codex client now accept the adapter and call all four tools. The remaining blocker is a direct ChatGPT desktop call from a fresh client session; the active task cannot reload a newly added local MCP connection without a restart or new chat, and shared Codex behavior is not accepted as ChatGPT evidence.

## Next Action

From a fresh ChatGPT desktop session, temporarily add the documented stdio connection, discover and call all four tools, verify the typed structured results and missing-source error, and remove the temporary connection if it should not remain installed.

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
