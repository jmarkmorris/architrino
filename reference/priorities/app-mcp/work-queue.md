# Architrino MCP Work Queue

This is the canonical execution ledger for accepted MCP work. The service remains read-only and source-grounded.

## Ranked Next Objects

1. `named_http_client_conformance` — [MCP-001](#mcp-001--named-http-client-conformance). Status: `In progress`.
2. `higher_order_graph_tools` — [MCP-002](#mcp-002--higher-order-graph-tools). Status: `Deferred / blocked`.
3. `hybrid_semantic_retrieval` — [MCP-003](#mcp-003--hybrid-semantic-retrieval). Status: `Deferred / blocked`.

## Queued

No rows.

## In progress

### MCP-001 — Named HTTP client conformance

- **Status:** In progress
- **Priority object:** `named_http_client_conformance`
- **Request / acceptance:** Verify the loopback URL through ephemeral Codex and the supported ChatGPT desktop surface without replacing the working stdio entry or creating an unapproved persistent HTTP configuration.
- **Evidence / blocker:** [Codex fixture HTTP conformance](codex-http-fixture-conformance-2026-09-02.json) passes all four tools plus typed `SOURCE_NOT_FOUND` through an ephemeral CLI session with command-line-only configuration against a fixture built in memory from current source input. The removed System Card anchor and moved dormant Archie route are repaired; the focused HTTP suite passes 9/9, including the full-corpus launcher, and the deployment contract now matches the checked-in snapshot it names. Current full-corpus Codex HTTP remains unmeasured because `build-full-corpus-source-index.mjs --check` reports generated drift. ChatGPT desktop HTTP remains unmeasured because the call must originate from a fresh ChatGPT surface after connection discovery or restart.
- **Completion:** Both named surfaces have reproducible pass/fail records with the working stdio route preserved.

## Deferred / blocked

### MCP-002 — Higher-order graph tools

- **Status:** Deferred / blocked
- **Priority object:** `higher_order_graph_tools`
- **Request / acceptance:** Add mechanically checkable `walk`, `trace`, `compare`, `related`, `context`, or `learning_path` operations only after semantics and authority limits are fixture-tested.
- **Evidence / blocker:** Depends on accepted V1 service evidence.
- **Completion:** Each added tool has deterministic semantics, bounded output, provenance, and source-authority tests.

### MCP-003 — Hybrid semantic retrieval

- **Status:** Deferred / blocked
- **Priority object:** `hybrid_semantic_retrieval`
- **Request / acceptance:** Add embeddings only as a declared fallback after deterministic retrieval.
- **Evidence / blocker:** Requires measured deterministic-recall gaps plus model, privacy, freshness, cost, and authority gates.
- **Completion:** Fallback behavior is measurable, bounded, and cannot raise claim authority.

## Awaiting verification

No rows.

## Verified

No rows.

## Superseded / withdrawn

No rows.
