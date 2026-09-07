# AAA Core Client v0

## Status And Scope

`aaa_core_client/v0` is the accepted CORE-008 thin client over the four accepted Core contracts. One `AAAClient` implementation exposes manifest validation, codec negotiation, query preparation, accepted-history stream sessions, immutable publication caching, exact product retrieval, and inspectable operation state.

The implementation is synchronous and in-process. It supplies no network API, durable storage or catalog, authentication, authorization, retry policy, production telemetry, workload measurement, scientific kernel, EOM evolution, or application release.

Plainly: Topo and Equation Mapping can now call the same small interface rather than copying path and publication rules. This is a tested local client boundary, not a deployed service.

## Shared Operation Surface

| Operation | Delegated owner | Client result |
| --- | --- | --- |
| `validateManifest` | Path Interchange v0 | Logical bundle result with exact source validator failure on refusal. |
| `negotiateCodec` | Codec Registry v0 | Capability id, provider id, and deterministic version. |
| `prepareQuery` | Query, Transform, And Publication v0 | Normalized request and query, transform, and cache identities. |
| `openStream` | Accepted-History Stream v0 | One shared broker session bound to its exact path bundle. |
| `streamAction` | Accepted-History Stream v0 | Subscribe, publish, acknowledge, disconnect, reconnect, seal, halt, or observe-terminal result plus current progress. |
| `inspectStream` | Accepted-History Stream v0 | Producer state, accepted-through time, pressure, terminal state, and per-consumer delivery and acknowledgement state. |
| `publish` | Query, Transform, And Publication v0 | Sealed or provisional publication plus `hit` or `miss` cache state. |
| `retrieve` | Query, Transform, And Publication v0 | Exact receipt-bound defensive copy for an explicitly permitted consumer. |
| `inspectOperation` | Client v0 | Defensive copy of the terminal operation envelope. |

Plainly: the client forwards each responsibility to its canonical contract. It does not reinterpret path records or create application-specific compatibility formats.

## Progress And Failure

Every service call returns `aaa_core_client_operation/v0` with the client and application identities, operation name, terminal state, one-unit progress, result, and failure. A failure preserves the originating exception name, exact refusal code, and message. The synchronous fixture surface reports only `succeeded` or `failed`; it does not claim to model a production asynchronous job lifecycle.

All results and stored operation records are defensively copied. A caller cannot mutate the shared cache, catalog, operation log, or another record merely by editing a returned object.

Plainly: each call says whether it finished or failed and keeps the exact reason. Changing a local copy does not rewrite Core's retained result.

## Cache And Consumer Conformance

Only sealed publications enter the in-memory fixture cache. Its key is the accepted computation cache identity plus a separately checked publisher and permission policy. An equivalent request with a different trace request id returns the same immutable publication as a cache hit; a provisional product is never reused as a completed hit.

The conformance fixture creates Topo and Equation Mapping clients from the same class. Both validate the same manifest, normalize equivalent requests to the same cache identity, subscribe to one shared accepted-history session, and inspect identical progress. Topo requests publication of the sealed Core Potential fixture once and receives a hit for the equivalent request; Equation Mapping retrieves its exact product and receipt as a permitted consumer.

Plainly: the two apps share code and records, but they keep their own application identities. The test proves interface reuse and exact handoff, not a potential result or production cache behavior.

## Artifacts

- Machine control record: [`aaa-core-client.v0.json`](aaa-core-client.v0.json)
- Structural schema: [`src/contracts/aaa-core-client/v0/schema.json`](../../../../src/contracts/aaa-core-client/v0/schema.json)
- Thin client: [`src/aaa-core/client-v0.mjs`](../../../../src/aaa-core/client-v0.mjs)
- Consumer fixture: [`tests/fixtures/aaa-core-client/v0/consumer-suite.json`](../../../../tests/fixtures/aaa-core-client/v0/consumer-suite.json)
- Focused tests: [`tests/aaa-core-client-v0.test.js`](../../../../tests/aaa-core-client-v0.test.js)

Closure goal: measure representative workloads before selecting production transport, storage, cache, or accelerator architecture.
