# Higher-Order Graph Tools V1

## Status

- Kind: `priority-contract`
- Claim level: `priority-only`
- Status: `fixture-backed-local-implementation`
- Parent tracker: [Architrino MCP](priorities.md)
- Primitive tool contract: [MCP Tool Contract V1](mcp-tool-contract-v1.md)

## Scope

The first higher-order graph extension adds one `walk` tool to the existing read-only MCP surface. `walk` composes declared snapshot edges across multiple hops; it does not create relationships, infer similarity, adjudicate theory, or treat graph reachability as causation, prerequisite status, or proof.

No `trace`, `compare`, `related`, `context`, or `learning_path` operation is added. Those names still lack a separately accepted need and exact semantics, and the existing `walk` result already supplies the bounded path primitive needed for deterministic multi-hop inspection.

## Deterministic Semantics

`walk(topicOrRoute, edgeTypes?, direction?, maxDepth?, limit?, cursor?)` resolves one exact visible origin, then performs breadth-first traversal over only the active immutable snapshot's declared graph edges.

The ordering rule is:

1. inspect graph edges in ascending `edgeId` order;
2. visit every depth-$d$ record before any depth-$(d+1)$ record;
3. return each source at most once, excluding the origin;
4. when several shortest paths reach the same source, retain the first path induced by the prior two rules.

Each returned record carries its depth, full ordered path, and ordinary source chip. Each path step carries the declared edge id and type, the traversal direction, its from/to source ids, and the evidence source id. This is path provenance, not evidence that the linked claims are correct.

## Bounds And Pagination

| Boundary | Limit |
| --- | ---: |
| Client-selected depth | 1 to 3 edges |
| Materialized non-origin records | 256 |
| Response page | 1 to 20 records |
| Edge-type filters | 16 unique controlled types |
| Encoded tool response | 32,768 UTF-8 bytes |

The 256-record traversal ceiling bounds expansion independently of page size. `traversalComplete: false` and `traversal_node_limit` disclose when that hard ceiling cuts off a reachable graph. Ordinary page truncation uses `record_limit`. A cursor is bound to the snapshot, tool, visibility scope, origin, edge types, direction, maximum depth, and page limit; changing any bound or selector rejects the cursor.

Cycles and converging paths terminate because the origin begins in the visited set and every newly reached source enters it before further expansion. Self-loops, returns to the origin, cycles, and later paths to an already visited source are suppressed.

## Visibility And Authority

An edge is traversable only when its current node, next node, and `evidenceSourceId` record are all visible in the authorized request scope. A hidden node or hidden evidence record blocks that path; traversal cannot pass through private material to reach a later public source.

Returned source chips preserve `sourceClass`, `authorityStatus`, `visibility`, `canonicalParent`, `claimLabelFloor`, and `selectionSha256`. Authorized operator/developer traversal may return priority material, but it remains labeled `priority_only` and `development_status`. Public traversal cannot return or traverse it.

## Implemented Artifacts

| Artifact | Role |
| --- | --- |
| [Pure query engine](../../../../src/archie-service/mcp/tool-contract-v1.mjs) | Implements bounded breadth-first traversal, visibility checks, cycle suppression, deterministic first-path selection, pagination, and response ceilings. |
| [MCP adapter](../../../../src/archie-service/mcp/fixture-stdio-adapter.mjs) | Publishes the `walk` input schema and normalizes client defaults across stdio and Streamable HTTP. |
| [Service schema](../../../../src/archie-service/contracts/v1/schema.json) | Defines typed walk requests, path records, results, bounds, and truncation reasons. |
| [Independent graph fixture](../../../../tests/archie-service/fixtures/mcp/mcp-walk-graph-suite.v1.json) | Declares a cyclic, converging, mixed-visibility graph with expected public and operator traversal paths plus the hard-cap case. |
| [Focused tests](../../../../tests/archie-service-mcp-tool-contract.test.js) | Checks fixture paths, pagination, cycle suppression, shortest deterministic path selection, visibility, authority, cursor scope, response bytes, depth, and the 256-node ceiling. |
| [Transport checks](../../../../scripts/archie-service/check-full-corpus-mcp-server.mjs) | Exercises a real two-hop full-corpus route over stdio; the loopback HTTP suite calls the same tool through the stateless handler. |

## Measured Validation

On 2026-09-02, the pure contract checker passed eight positive and nine fail-closed cases; 11 focused contract/adapter tests passed; the current full-corpus subprocess returned a declared two-hop path; all nine loopback HTTP tests passed; the remote deployment contract retained all 19 negative cases; and the shared service schema accepted 39 fixtures.

The graph fixture is an independently authored expected-path oracle for the traversal algorithm. It establishes implementation conformance to the rules above. It does not establish that the graph edges themselves are scientifically correct or that depth three and 256 records are optimal usability limits.

## Acceptance Falsifiers

This extension is not accepted if any of these observations occurs:

- a returned step is absent from the active snapshot;
- a path includes a hidden node or hidden evidence source;
- public scope returns priority material;
- a cycle repeats the origin or another source;
- a longer or later path replaces the deterministic first shortest path;
- depth exceeds three, traversal materializes more than 256 non-origin records, a page exceeds 20 records, or the encoded response exceeds 32,768 bytes;
- changing walk scope accepts an old cursor;
- truncation occurs without its declared reason;
- a returned source chip loses its authority or selection provenance;
- the focused contract, stdio, HTTP, deployment, or schema checks fail.

## Remaining Boundary

The local stdio and loopback HTTP implementations now expose `walk`. Named-client receipts retained for MCP-001 cover the earlier four-tool surface and do not independently establish ChatGPT or Codex invocation of `walk`. Remote TLS, OAuth, accepted-`main` publication, hosting, and availability remain unimplemented and unauthorized.
