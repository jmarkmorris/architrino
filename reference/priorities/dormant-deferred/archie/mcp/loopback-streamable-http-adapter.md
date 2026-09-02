# Loopback Streamable HTTP Adapter

## Status

- Transport: `streamable_http`
- Bind address: `127.0.0.1` only
- Session mode: `stateless`
- Deployment state: local fixture-backed implementation
- Remote ready: `false`
- Public deployment authorized: `false`
- Claim level: `measured where marked; otherwise priority-only contract`

## Purpose

This adapter implements the HTTP-facing behavior defined by [Remote Transport and Deployment Hardening V1](remote-transport-deployment-hardening-v1.md) without changing the existing stdio launchers or saved stdio connection.

It is a production-shaped local protocol-adapter test surface, not a deployment or user-facing application. It starts an HTTP server only on the IPv4 loopback address, requires a local bearer credential, reads validated snapshots at startup, serves the five current read-only tools from memory, and performs no model call, repository write, durable user-state write, or external action.

## Artifacts

| Artifact | Responsibility |
| --- | --- |
| [Loopback adapter](../../../../../src/archie-service/mcp/loopback-streamable-http-adapter.mjs) | Owns loopback binding, HTTP routing, origin and protocol gates, authorization hook, limits, safe events, health, immutable active-snapshot selection, and rollback. |
| [Full-corpus launcher](../../../../../scripts/archie-service/run-loopback-mcp-http-server.mjs) | Loads the full-corpus snapshot, requires a bearer token from the environment, starts on loopback, emits a safe startup event and 30-second heartbeat, and closes on `SIGINT` or `SIGTERM`. |
| [HTTP smoke fixture](../../../../../tests/archie-service/fixtures/mcp/mcp-loopback-http-smoke.v1.json) | Declares 21 lifecycle, tool, health, method, origin, authorization, protocol, media-type, JSON, query-string, and body-size requests with expected HTTP or JSON-RPC results. |
| [Focused tests](../../../../../tests/archie-service-mcp-loopback-http.test.js) | Exercise the fixture through real HTTP, rate and concurrency gates, safe logging, atomic activation/rollback, bind refusal, snapshot no-write behavior, and outside-repository launcher startup. |
| [Official SDK runner](../../../../../scripts/archie-service/check-loopback-mcp-http-sdk-conformance.mjs) | Starts the full-corpus loopback adapter and drives it with the official TypeScript SDK Streamable HTTP client without changing persistent client configuration. |

## Request Path

```text
MCP client
    |
    | local HTTP + bearer credential
    v
127.0.0.1:<port>/mcp
    |
    +--> exact Origin check when Origin is supplied
    +--> authorization and architrino:mcp:read scope
    +--> fixed request, burst, concurrency, body, response, and time limits
    +--> MCP protocol-version check after initialization
    v
stateless MCP request handler
    |
    v
validated immutable active snapshot in memory
    |
    v
search | read | topics | neighbors | walk
```

The HTTP adapter uses the same tool definitions, argument normalization, tool engine, source chips, visibility rules, pagination, provenance, and errors as stdio. The only shared-core change is an additional stateless request handler; the stateful stdio session path remains the default and its lifecycle regression still passes.

## Stateless Lifecycle

The server returns no `MCP-Session-Id`. Initialization returns MCP revision `2025-11-25`; the initialized notification returns HTTP 202; subsequent POST, GET, and DELETE requests must carry `MCP-Protocol-Version: 2025-11-25`.

Because no cross-request session is stored, a request carrying the negotiated protocol version can be handled independently after authentication. GET and DELETE return HTTP 405 after their authorization and protocol gates. The official SDK accepts this flow and treats GET 405 as the declared absence of a server-initiated event stream.

## Local Authorization Boundary

The launcher reads the bearer credential from `ARCHITRINO_MCP_LOCAL_TOKEN` and refuses startup when it is absent or shorter than 16 characters. The token is not stored in a fixture, command argument, response, or log. Comparison uses a constant-time byte comparison.

This is an executable authorization hook, not OAuth conformance. A real remote release still requires protected-resource metadata, an authorization server, audience validation, TLS ingress, and the other remote gates. The local adapter therefore does not change `remoteReady` or `publicDeploymentAuthorized`.

When a valid principal lacks `architrino:mcp:read`, the adapter returns HTTP 403 with an `insufficient_scope` challenge. A missing or invalid credential returns HTTP 401. A supplied invalid `Origin` returns HTTP 403 before tool execution. A native client that sends no `Origin` may proceed only after successful authorization.

## Limits

The adapter executes the contract values directly:

| Boundary | Value |
| --- | ---: |
| Request body | 65,536 bytes |
| Response body | 32,768 bytes |
| Request time | 10,000 ms |
| Authenticated requests | 60 per principal per minute |
| Authenticated burst | 10 per principal per second |
| Authenticated concurrency | 4 per principal |
| Unauthenticated requests | 10 per source address per minute |

HTTP 429 responses include `Retry-After`. An oversized request returns HTTP 413. If a complete JSON-RPC response would exceed the response ceiling, the adapter replaces it with a bounded JSON-RPC response-size error.

Every response sets `Cache-Control: no-store` and `X-Content-Type-Options: nosniff`, including health, rejection, notification, and tool responses.

These are fixture-backed policy values, not measured capacity or optimal user quotas. A remote host must be load-tested independently.

## Safe Events

The adapter constructs each event from the contract allowlist. It refuses an event containing an undeclared field. Request events may contain request id, a keyed principal pseudonym, tool name, typed result status, HTTP status, duration, byte counts, and snapshot identity. Startup may additionally contain the loopback listen address.

Events never receive the authorization header, token, Origin, URL query, tool arguments, query text, source content, raw response, or private prompt. Tests send recognizable token, query, source-id, and source-content markers and verify that none enters the event stream.

The launcher emits a heartbeat every 30 seconds containing elapsed milliseconds and active snapshot identity. This makes a manually detached local process observable; it does not make the server persistent across restarts.

## Health and Snapshot State

`GET /health/live` returns only `{"status":"live"}`. `GET /health/ready` returns only `{"status":"ready"}` or HTTP 503 with `{"status":"unavailable"}`.

Local readiness requires:

- a structurally valid, fresh active snapshot;
- exact match to the configured candidate id and hash;
- a configured exact origin list;
- the authorization hook, rate limiter, and safe logger;
- a distinct transport-compatible rollback fixture.

Transport compatibility requires the same snapshot schema, visibility-policy version, and content/search/graph/metadata view schemas. Activation validates and freezes the complete candidate before one JavaScript reference assignment changes the active bundle. Requests therefore observe one complete handler/snapshot pair, never a partially replaced bundle.

The launcher derives a distinct rollback fixture from the active snapshot with fixture-only provenance and the same content. This tests validation, compatibility, pointer swapping, readiness loss on an unconfigured active hash, and restoration mechanics. It is deterministic self-agreement, not independent evidence that a prior production snapshot can restore changed content. A staging release still needs a separately published prior snapshot and a real rollback smoke.

## Local Run

Set a temporary credential, then start on an operating-system-selected loopback port:

```bash
export ARCHITRINO_MCP_LOCAL_TOKEN="choose-a-local-token-with-at-least-16-characters"
node scripts/archie-service/run-loopback-mcp-http-server.mjs --port 0
```

The first safe JSON event on stderr contains `listen_address`. Send `SIGINT` to stop the process. The launcher prints no credential and makes no persistent Codex or ChatGPT configuration change.

The optional `ARCHITRINO_MCP_LOCAL_ALLOWED_ORIGIN` variable replaces the default exact test origin. Wildcards, paths, non-HTTPS origins, and multiple undeclared origins are rejected.

## Validation

Run the fixture and launcher tests:

```bash
node --test tests/archie-service-mcp-loopback-http.test.js
```

Run the official SDK client with an independently installed SDK root:

```bash
node scripts/archie-service/check-loopback-mcp-http-sdk-conformance.mjs \
  --sdk-root /path/to/node_modules/@modelcontextprotocol/sdk
```

Measured on 2026-07-21:

- all nine focused HTTP tests passed;
- all 21 declared HTTP cases returned their expected status and typed result;
- the full-corpus launcher started from `/tmp`, reported local readiness, served a search, kept recognizable credential/query markers out of logs, and closed cleanly;
- official `@modelcontextprotocol/sdk` `1.29.0` initialized over Streamable HTTP, accepted GET 405, found exactly four tools, called all four successfully, observed `SOURCE_NOT_FOUND`, pinged, remained stateless and ready, and changed no persistent client configuration;
- the existing stdio lifecycle and tool regression remained passing.
- the combined Archie service, source-index, stdio, remote-contract, and HTTP suite passed all 45 tests; the shared schema validator accepted 38 fixtures with zero errors; strict content validation reported zero errors and warnings; priority ranking kept all 37 rows aligned; and `git diff --check` passed.

Measured again on 2026-09-02, all nine focused HTTP tests passed after adding the fifth `walk` tool, including a real loopback `tools/call`; the remote contract retained its 19 fail-closed cases and the shared schema accepted 39 fixtures. The 2026-07-21 official SDK result above remains bounded to the four tools it actually measured.

These are measured implementation and interoperability results. They do not establish Codex-over-HTTP or ChatGPT-over-HTTP conformance, OAuth behavior, TLS ingress, remote rollback, host capacity, availability, or public launch readiness.

## Acceptance Falsifiers

The loopback adapter is not accepted if:

- it can bind to `0.0.0.0`, a LAN address, IPv6 any-address, or a public interface;
- stdio lifecycle or tool behavior changes;
- a request bypasses authorization, scope, origin, version, rate, size, or response ceilings;
- a sensitive request or result field enters an operational event;
- readiness stays green after the active snapshot id/hash changes;
- an incompatible visibility policy can become active or serve as rollback;
- activation exposes a partially validated bundle;
- any request reads repository source files, writes files, invokes a model, creates durable user state, or performs an external action;
- the transport regression or any of the five current tools fails over HTTP; the retained official-SDK claim remains limited to its measured four-tool run until repeated.

## Remaining Boundary

Named Codex and ChatGPT desktop conformance is complete for the primitive four-tool surface. Direct named-client invocation of `walk` remains unmeasured; any future pass must not replace or disable the working stdio connection and must not make a persistent HTTP client change without operator approval. Real OAuth, TLS ingress, accepted-`main` publication, remote rollback, host capacity, availability, and public launch remain outside this loopback boundary.
