# Local Fixture MCP Adapter

## Status

- Kind: `priority-implementation`
- Claim level: `measured local fixture behavior`
- Status: `fixture-regression-and-full-corpus-stdio-passing`
- Parent tracker: [Architrino MCP](priorities.md)
- Tool semantics: [MCP Tool Contract V1](mcp-tool-contract-v1.md)

## Purpose

The shared local MCP adapter exposes five bounded Architrino tools through a process-spawned stdio surface: the four primitive retrieval tools plus the later `walk` extension. The fixture launcher retains the six-source regression bundle. The separate [Full-Corpus Local MCP V1](full-corpus-local-v1.md) launcher consumes the complete immutable local snapshot through the same request core.

This is a local Archie-service protocol-adapter test server, not a user-facing application or production service. It contains no model calls, HTTP listener, remote network request, repository write, action handoff, provider credential, payment path, durable storage, authentication scheme, or public deployment configuration.

## Current Protocol Basis

The adapter targets Model Context Protocol revision `2025-11-25`, which was the latest published revision checked on 2026-07-20. It implements the narrow current surface needed here:

- newline-delimited UTF-8 JSON-RPC over stdin/stdout;
- `initialize` and `notifications/initialized` lifecycle messages;
- a static `tools` capability;
- `tools/list`;
- `tools/call`;
- `ping`;
- JSON-RPC parse, request, method, parameter, initialization, and internal errors.

The protocol references used for this pass are the official [lifecycle](https://modelcontextprotocol.io/specification/2025-11-25/basic/lifecycle), [stdio transport](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports), and [tools](https://modelcontextprotocol.io/specification/2025-11-25/server/tools) specifications.

The repository has no root Node package manifest or lockfile. The adapter therefore uses Node built-ins instead of introducing an unowned SDK dependency. Independent SDK and named-client results are recorded in [MCP Client Conformance](client-conformance.md).

## Implemented Artifacts

| Artifact | Role |
| --- | --- |
| [Fixture stdio adapter](../../../../../src/archie-service/mcp/fixture-stdio-adapter.mjs) | Owns lifecycle state, tool definitions, request normalization, JSON-RPC routing, snapshot-only tool calls, and bundle-integrity checks. |
| [Local launcher](../../../../../scripts/archie-service/run-fixture-mcp-server.mjs) | Loads exactly one fixture snapshot at startup, then reads and writes newline-delimited MCP messages over stdin/stdout. |
| [Protocol smoke checker](../../../../../scripts/archie-service/check-fixture-mcp-server.mjs) | Spawns the launcher, replays the transcript, compares every response, checks all five calls, and enforces static no-network/no-write boundaries. |
| [Protocol transcript](../../../../../tests/archie-service/fixtures/mcp/mcp-stdio-smoke.v1.json) | Stores initialization, initialized notification, tool discovery, all five tool calls, missing-source behavior, unknown-tool rejection, and ping. |
| [Focused tests](../../../../../tests/archie-service-fixture-mcp-server.test.js) | Checks in-memory snapshot tamper rejection, lifecycle ordering, and the subprocess smoke. |
| [Official SDK conformance runner](../../../../../scripts/archie-service/check-fixture-mcp-sdk-conformance.mjs) | Can use an independently installed official SDK client to negotiate, discover, call all five tools, check a missing source, ping, and close. The retained named-client receipts predate `walk`. |
| [Full-corpus launcher](../../../../../scripts/archie-service/run-full-corpus-mcp-server.mjs) | Loads and validates the complete local snapshot once, with a distinct server identity and no per-request repository access. |
| [Full-corpus smoke checker](../../../../../scripts/archie-service/check-full-corpus-mcp-server.mjs) | Launches from `/tmp` and checks all five tools, a real two-hop path, metadata, pagination, public visibility, errors, response ceilings, and no-write boundaries. |

## Runtime Boundary

At startup, the launcher reads only:

```text
tests/archie-service/fixtures/source-index/source-index-snapshot.v1.json
```

It verifies the enclosing snapshot hash, all four view hashes, exact-content hashes, source/search/content linkage, graph endpoints and evidence ids, metadata sources, schema compatibility, and fresh state. After startup, every request uses the in-memory snapshot. Tool calls do not read authored Markdown, scene files, generated graph files, priority files, or any other repository source.

The current local adapter is public-corpus-scope only. That label describes which source records it may return; it does not authorize public network or static-browser exposure. It does not expose the operator/developer visibility path because that requires an authentication decision. Priority material therefore remains unavailable through this server.

## MCP Tool Mapping

The MCP-facing schemas provide client-friendly defaults, then normalize calls into the exact internal request contract:

| MCP tool | Required client argument | Defaults |
| --- | --- | --- |
| `search` | `query` | empty filters, limit 10, no cursor |
| `read` | `topicOrRoute` | no section, 4,000 characters, no cursor, include metadata |
| `topics` | none | empty filters, limit 10, no cursor |
| `neighbors` | `topicOrRoute` | all edge types, both directions, limit 10, no cursor |
| `walk` | `topicOrRoute` | all edge types, both directions, depth 2, limit 10, no cursor |

Every successful or tool-level error result returns both:

- `structuredContent`, containing the complete `archie-mcp-tool-response/v1` object;
- a text content block containing the same object serialized as JSON for client compatibility.

All five tools declare read-only, non-destructive, idempotent, closed-world annotations and explicitly forbid task-augmented execution.

## Local Testing

Run the owned end-to-end subprocess smoke:

```bash
node scripts/archie-service/check-fixture-mcp-server.mjs --check
```

Run the focused Node tests:

```bash
node --test tests/archie-service-fixture-mcp-server.test.js
```

A local stdio MCP client can spawn the server with this process configuration:

```json
{
  "command": "node",
  "args": [
    "/Users/markmorris/vibe/architrino/scripts/archie-service/run-fixture-mcp-server.mjs"
  ]
}
```

The launcher resolves the repository root from its own file location, so the client does not need to set a working directory. The server intentionally writes no startup banner to stdout because stdout is reserved for MCP messages; a directly launched terminal therefore appears idle while it waits for a client.

## Measured Smoke Coverage

The subprocess smoke currently proves:

1. the server starts from the fixture snapshot and exits cleanly when stdin closes;
2. initialization returns protocol revision `2025-11-25`, static tools capability, server identity, and bounded-use instructions;
3. the initialized notification unlocks normal operation;
4. `tools/list` returns exactly the five bounded tools in stable order with read-only annotations;
5. all five tools cross the stdio boundary and return typed structured results;
6. search preserves canonical-source preference;
7. a missing read returns `isError: true` and `SOURCE_NOT_FOUND` without result data;
8. an unknown `write` tool returns JSON-RPC invalid parameters;
9. ping succeeds;
10. the snapshot size and modification time remain unchanged;
11. the adapter core imports no filesystem, HTTP, network, or child-process module and contains no write or fetch call;
12. the launcher performs exactly one startup snapshot read and no write or network call.

These measurements establish local stdio fixture behavior. The full-corpus smoke and focused tests establish current complete-corpus local retrieval and bounded two-hop traversal; the earlier conformance pass establishes acceptance of the four primitive tools by official TypeScript SDK V1 `1.29.0` and Codex. The [Loopback Streamable HTTP Adapter](loopback-streamable-http-adapter.md) separately establishes HTTP, local authorization-hook, rate-limit, health, safe-log, and rollback-fixture behavior. The retained named-client evidence does not establish direct client invocation of `walk`, and neither local adapter establishes remote deployment or public launch readiness.

## Acceptance Falsifiers

The local adapter is not accepted if:

- any non-JSON text reaches stdout;
- a tool call succeeds before the initialized notification;
- a listed tool is absent, writable, open-world, or task-enabled;
- any of the five tools fails to cross the stdio boundary;
- a request reads source-repository files after startup;
- the snapshot changes during a smoke run;
- missing or unknown requests produce invented retrieval data;
- structured and text results disagree;
- the subprocess checker or focused tests fail.

## Remaining Boundary

The primitive named-client conformance boundary is complete. Direct named-client invocation of the later `walk` extension remains unmeasured and is not claimed by this local implementation receipt. Any later client pass or remote deployment must preserve the completed source-authority, visibility, provenance, pagination, response-budget, and no-side-effect contracts.
