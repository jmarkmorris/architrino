# Remote Transport and Deployment Hardening V1

## Status

- Contract: `archie-mcp-remote-deployment-contract/v1`
- Negative suite: `archie-mcp-remote-deployment-negative-suite/v1`
- Deployment state: `fixture_only`
- Remote ready: `false`
- Public deployment authorized: `false`
- Claim level: `priority-only`

## Purpose

This contract defines the boundary a future remote Architrino MCP adapter must satisfy before staging or public use. The separate [Loopback Streamable HTTP Adapter](loopback-streamable-http-adapter.md) implements the local test boundary; this contract still does not select a host, create remote credentials, change a persistent client connection, or deploy anything.

The plain-language rule is: the local four-tool query engine may be wrapped in a remote transport only when the wrapper preserves the same read-only snapshot boundary and independently passes its network, authorization, load, health, logging, and rollback gates.

## Artifacts

| Artifact | Responsibility |
| --- | --- |
| [Positive contract fixture](../../../tests/archie-service/fixtures/mcp/mcp-remote-deployment-contract.v1.json) | Records the complete target boundary and the deliberately blocked current deployment state. |
| [Negative suite](../../../tests/archie-service/fixtures/mcp/mcp-remote-deployment-negative-suite.v1.json) | Mutates one boundary at a time and names the verification failed error that must result. |
| [Contract validator](../../../src/archie-service/mcp/remote-deployment-contract-v1.mjs) | Applies cross-field transport, security, limit, snapshot, rollback, and capability invariants. |
| [Executable checker](../../../scripts/archie-service/validate-mcp-remote-deployment-contract.mjs) | Loads the fixtures and current full-corpus candidate, then exercises every positive and negative case without network or writes. |
| [Focused tests](../../../tests/archie-service-mcp-remote-deployment-contract.test.js) | Check fixture-only state, all negative cases, and candidate snapshot identity enforcement. |
| [Loopback implementation](loopback-streamable-http-adapter.md) | Exercises the transport contract locally without promoting the fixture to remote-ready or public-deployment status. |

## Protocol Basis

The protocol target is the latest official MCP revision verified for this pass, `2025-11-25`.

The official [transport specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports) defines Streamable HTTP as a single MCP endpoint receiving JSON-RPC messages through POST. A client advertises both `application/json` and `text/event-stream`; a server may return one JSON response instead of opening an event stream. GET may return HTTP 405 when the server does not offer a server-initiated event stream. The same specification requires `Origin` validation and HTTP 403 for an invalid supplied origin, recommends loopback binding for a local process, and requires supported protocol-version handling after initialization.

The official [authorization specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization) makes authorization optional at the protocol level. This service contract makes it mandatory for remote Architrino access. When configured, the server acts as an OAuth 2.1 protected resource, publishes protected-resource metadata, accepts bearer tokens only in the `Authorization` header, validates that each token was issued for its own audience, and requires only `architrino:mcp:read`. Token passthrough and tokens in query strings are forbidden.

Those protocol facts are externally specified. The exact limits, health paths, read scope name, and JSON-only V1 response mode below are project contract decisions. They are not measured optima.

## Transport Shape

```text
MCP client
    |
    | HTTPS at a configured ingress
    v
exact Origin check -> authentication -> request/rate limits
    |
    v
POST /mcp
    |
    v
existing four-tool adapter core
    |
    v
validated immutable source-index snapshot in memory
```

V1 uses one stateless `/mcp` endpoint:

- POST body: one UTF-8 JSON-RPC message;
- POST client acceptance: `application/json` and `text/event-stream`;
- server response: one `application/json` result;
- GET: HTTP 405, because V1 does not implement a server-initiated event stream;
- DELETE: HTTP 405, because V1 creates no server session;
- unsupported protocol version: HTTP 400;
- no SSE replay, event retention, session identifiers, or server-to-client requests.

The JSON-only choice keeps V1 aligned with the current request/response tools. Adding streaming later would require a separate bounded retention and resumability contract.

## Network and Authorization Gates

The service process binds to `127.0.0.1` behind a configured ingress. Direct public binding is forbidden. Remote readiness requires:

1. TLS at the ingress;
2. a configured trusted-proxy boundary;
3. an exact, non-wildcard origin allowlist;
4. OAuth protected-resource metadata and an authorization server;
5. audience validation and the single read scope;
6. no token passthrough and no query-string tokens.

An invalid supplied `Origin` returns HTTP 403. A client with no `Origin`, such as a non-browser MCP client, may proceed only after authentication. The origin check is therefore an additional browser/network defense, not a substitute for client authorization.

The fixture leaves TLS, trusted proxy, origin list, and authorization-server configuration false. Turning `remoteReady` on while any of them remains false produces `REMOTE_READINESS_GATES_OPEN`.

## Bounded Load

The initial contract ceilings are:

| Boundary | V1 ceiling |
| --- | ---: |
| Request body | 65,536 bytes |
| Response body | 32,768 bytes |
| Request time | 10,000 ms |
| Requests per authenticated principal | 60/minute |
| Burst per authenticated principal | 10 |
| Concurrent requests per authenticated principal | 4 |
| Pre-authentication requests per source address | 10/minute |

The response ceiling exactly preserves [MCP Tool Contract V1](mcp-tool-contract-v1.md). These traffic values are bounded policy defaults, not capacity claims. Before staging, load tests must measure whether they protect availability without rejecting normal client behavior. A measured result that requires different numbers changes this versioned fixture and its tests; it does not create an untracked host override.

## Safe Logging

Logs may retain only operational identifiers and measurements such as event class, request id, a keyed pseudonymous principal id, tool name, typed response status, HTTP status, duration, byte counts, and snapshot identity. The pseudonym must be derived with a server-held key so a raw account or token subject never enters the log.

Logs must not retain:

- authorization headers, access tokens, or cookies;
- raw query text or tool arguments;
- returned source content or response bodies;
- private prompts, provider payloads, credentials, or raw logs.

The current service makes no model calls and has no provider payload, but keeping those fields forbidden prevents a broader Archie service log schema from silently expanding the MCP boundary later.

## Health and Readiness

`GET /health/live` answers only whether the service process is running. `GET /health/ready` answers whether the service is safe to receive MCP work. Public health responses expose status only; internal diagnostics remain in redacted operator events.

Readiness returns HTTP 503 unless all of these are true:

- the snapshot structure and deterministic hashes validate;
- its freshness state is `fresh`;
- its id and SHA-256 match configured values;
- the exact origin allowlist is configured;
- authorization is configured;
- the rate limiter and safe logger are active;
- a compatible rollback candidate exists.

Liveness must not become readiness. A running process with a stale or mismatched snapshot is alive but unavailable for MCP requests.

## Snapshot Activation and Rollback

The loopback adapter reads one immutable snapshot at startup, validates it completely, and swaps an active pointer atomically. An atomic pointer swap means requests see either the complete prior snapshot or the complete new snapshot, never a partially overwritten file. A remote implementation must preserve the same rule with separately published snapshots.

The request path performs no repository scan, filesystem write, model call, or external action. Remote publication additionally requires a snapshot tied to accepted `main`. The current full-corpus artifact identifies a local source state, so `candidateIsAcceptedMain` remains false and blocks readiness.

A remote-ready release must also name a compatible prior snapshot, pass all four tool and missing-source calls against that snapshot, restore it through the same atomic pointer mechanism, and repeat the smoke after restoration. A user-visible rollback also enters the existing redacted public-status/incident boundary.

## Capability Boundary

Remote V1 exposes exactly:

- `search`;
- `read`;
- `topics`;
- `neighbors`.

It exposes no resources or prompts and permits no model call, repository write, external action, or durable user state. A host adapter may reject, meter, authenticate, and route these calls; it may not enlarge the tool semantics or source authority defined by the existing snapshot and tool contracts.

## Verification Fixtures Required for Advancement

The negative suite currently covers 19 unsafe mutations:

- public-deployment authority or premature remote readiness;
- the wrong transport, endpoint, or streaming mode;
- wildcard origin policy or wildcard origin values;
- disabled authorization, query tokens, or token passthrough;
- optional TLS;
- a transport response ceiling larger than the tool ceiling;
- query logging;
- per-request repository reads;
- in-place snapshot overwrite;
- optional rollback;
- a write tool or model call;
- an unbounded principal rate.

The candidate-identity test separately alters the snapshot hash and requires `SNAPSHOT_IDENTITY_MISMATCH`.

## Validation

Run the owned checker:

```text
node scripts/archie-service/validate-mcp-remote-deployment-contract.mjs
```

Run the focused tests and shared schema validator:

```text
node --test tests/archie-service-mcp-remote-deployment-contract.test.js
node scripts/archie-service/validate-contracts.mjs
```

Measured on 2026-07-21, the owned checker accepted the fixture-only contract and all 19 cases with a Not advanced disposition. The combined MCP/source-index regression passed all 20 tests, the broader Archie service contract suite passed all 16 tests, the shared schema validator accepted 37 fixtures with zero errors, strict content validation reported zero errors and warnings, and priority ranking kept all 37 rows aligned.

This is implementation evidence for the contract and validator. The separate local HTTP adapter and official SDK conformance now exist; this evidence still does not establish OAuth, Codex-over-HTTP or ChatGPT-over-HTTP, host load, staging rollback, or public-deployment authorization.

## Closure Boundary

The remote transport and deployment-hardening contract is defined, fixture-backed, and executable without network access or writes. Its falsifier is direct: if an unsafe negative case passes, the candidate snapshot can change without detection, or `remoteReady` becomes true while a named gate is open, this closure fails.

The local-only Streamable HTTP adapter now exercises POST, GET/DELETE 405, origin rejection, protocol versions, authorization hooks, rate and size limits, redacted events, health state, atomic snapshot selection, and rollback mechanics. Named Codex and ChatGPT HTTP client conformance remains the next local evidence object before any host or staging environment is selected.
