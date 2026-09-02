# MCP Tool Contract V1

## Status

- Kind: `priority-contract`
- Claim level: `priority-only`
- Status: `fixture-backed-plus-bounded-walk`
- Parent tracker: [Architrino MCP](priorities.md)
- Input contract: [Source Index Snapshot V1](source-index-snapshot-v1.md)

## Purpose

`archie-mcp-tool-request/v1` and `archie-mcp-tool-response/v1` define the bounded retrieval boundary for the four primitive tools `search`, `read`, `topics`, and `neighbors`, plus the later deterministic `walk` extension specified in [Higher-Order Graph Tools V1](higher-order-graph-tools-v1.md).

The contract is implemented as a pure query engine over one validated immutable snapshot. It performs no model call, repository scan, repository write, network request, external action, or MCP transport operation. A later adapter may expose these semantics through the current official Model Context Protocol, but it may not weaken the limits, visibility checks, provenance fields, cursor binding, or error behavior defined here.

## Implemented Artifacts

| Artifact | Role |
| --- | --- |
| [Archie service schema](../../../../../src/archie-service/contracts/v1/schema.json) | Defines typed request, response, result, page, source-chip, error, contract-suite, and negative-suite shapes. |
| [Pure query engine](../../../../../src/archie-service/mcp/tool-contract-v1.mjs) | Applies deterministic search, exact-content reads, topic enumeration, direct-edge traversal, visibility policy, pagination, and verification failed errors over an accepted snapshot. |
| [Positive contract fixture](../../../../../tests/archie-service/fixtures/mcp/mcp-tool-contract.v1.json) | Stores eight complete request/response pairs spanning all five tools, truncation, missing sources, and public/operator visibility. |
| [Negative suite](../../../../../tests/archie-service/fixtures/mcp/mcp-tool-negative-suite.v1.json) | Stores nine invalid or unauthorized cases for limits, snapshot identity, visibility, cursors, freshness, edge types, duplicate filters, and walk depth. |
| [Checker](../../../../../scripts/archie-service/validate-mcp-tool-contracts.mjs) | Recomputes every expected response, checks negative dispositions, and follows the first pagination cursor for all five tools. |
| [Focused tests](../../../../../tests/archie-service-mcp-tool-contract.test.js) | Checks fixture parity, canonical-source ranking, exact-content continuation, response bytes, and priority visibility. |

## Shared Envelope

Every request carries:

- request schema, id, and one of the five tool names;
- the required snapshot id;
- `public` or `operator_developer` visibility scope;
- one exact tool-specific argument object.

Every response carries:

- response schema, request id, and tool name;
- an explicit status;
- snapshot id, snapshot SHA-256, repository ref, visibility-policy version, and freshness state;
- either a typed result and page or a typed error;
- no result or page payload on a response with a Not advanced disposition.

The response provenance identifies the bundle consulted. It does not prove the truth of the indexed claim; source class, authority status, visibility, claim-label floor, and selection hash remain attached to every returned source chip.

## Declared Bounds

| Boundary | V1 limit |
| --- | ---: |
| Query text | 256 Unicode characters |
| Source id or route | 512 Unicode characters |
| Search, topics, neighbors, or walk page | 20 records |
| Read page | 256 to 8,000 Unicode characters |
| Walk depth | 1 to 3 edges |
| Walk materialized nodes | 256 non-origin records |
| Encoded response | 32,768 UTF-8 bytes |
| Filter entries | 16 unique values per filter |

Clients choose a smaller page limit when useful. They cannot raise the server ceiling through request fields.

## Cursor Contract

The V1 cursor is opaque to clients and contains a canonical payload protected by SHA-256. It is bound to:

- cursor version;
- snapshot id;
- tool;
- visibility scope;
- the complete normalized request arguments other than the cursor;
- the next record or Unicode-character offset.

A cursor cannot be reused after changing the query, filters, route, direction, edge types, visibility scope, tool, or snapshot. A malformed, altered, cross-scope, or out-of-range cursor does not advance.

SHA-256 here is an integrity and scope-binding checksum, not authentication. A future public transport that needs adversarial cursor authenticity must add a server-held message-authentication key without changing the logical cursor scope.

## Tool Semantics

### `search`

`search` normalizes Unicode with NFKC, lowercases text, collapses whitespace, scores declared title, alias, keyword, route, source-id, and indexed-content matches, and then uses source id as the final stable tie-break. When those exact phrase and complete-term rules produce no score for a record, a bounded deterministic fallback tokenizes Unicode letters and numbers, removes a fixed list of question and function words, requires at least 60% token coverage with at least two matches for multi-token queries, and applies stable title, alias, keyword, route, and content weights. It performs no stemming, inferred synonym expansion, model call, or embedding lookup.

The deterministic score includes an explicit authority preference after a lexical match. This keeps an authored primary source ahead of a generated reading copy or scene route when both match the same concept. The response exposes the numeric score and its mechanical match reasons; the score is not a probability, proof grade, or confidence in the theory claim.

### `read`

`read` resolves one exact source id or route and optional section anchor. It returns the exact selected content stored in the snapshot's hashed content view, not the shortened search teaser and not a fresh repository read. Character pagination uses Unicode characters so a page boundary does not split a surrogate pair. Indexed equation and figure metadata is returned only when requested.

### `topics`

`topics` lists directly addressable, non-routing records in deterministic title/source-id order. V1 includes published corpus, app-guide, Archie-reference, priority, and curated external classes when their visibility is authorized. Generated reading copies and scene routes remain navigation records and are not separately presented as topics.

### `neighbors`

`neighbors` returns only directly declared graph edges. The request selects incoming, outgoing, or both directions and may restrict controlled edge types. The origin, neighbor, and evidence source must all be visible in the request scope. The operation does not infer causation, prerequisites, similarity, proof, or an undeclared conceptual relationship.

### `walk`

`walk` performs cycle-safe breadth-first traversal over visible declared edges to a maximum depth of three. It returns each source once with the deterministic first shortest path and the evidence source id for every step, materializes at most 256 non-origin records, and paginates at 20 records per response. Graph reachability is not causation, prerequisite status, proof, or a generated theory relationship; the exact semantics and independent path fixture are recorded in [Higher-Order Graph Tools V1](higher-order-graph-tools-v1.md).

## Visibility And Authority Enforcement

Public scope returns only records marked public and public-eligible by the snapshot. Operator/developer scope must also be authorized by the service context; merely placing `operator_developer` in a request does not grant access.

Priority material is absent from public search, topics, reads, graph origins, neighbors, and edge evidence. When an authorized operator/developer request returns it, the source chip continues to state `priority_only` authority and `development_status` visibility. Retrieval never promotes it to published corpus.

## Explicit Status And Error Classes

V1 defines:

- `ok`;
- `invalid_request`;
- `invalid_cursor`;
- `not_found`;
- `excluded_visibility`;
- `forbidden_visibility`;
- `incompatible_snapshot`;
- `stale_snapshot`;
- `response_limit_exceeded`.

Errors include a stable code, a safe message, and a retriable flag. Missing and excluded sources are not replaced with model memory, nearest-neighbor guesses, or synthesized content.

## Source Snapshot Dependency Correction

The first source snapshot stored source and section hashes but did not store the exact selected content. That was insufficient for `read`: a handler would have needed a per-request repository read or would have mislabeled a shortened search teaser as Markdown.

`archie-source-index-snapshot/v1` now includes `archie-source-content-view/v1`. Each content record stores exact selected content, content type, source id, and selection hash. The content view and enclosing snapshot have their own deterministic hashes. This keeps `read` inside the immutable-snapshot boundary.

## Fixture Coverage

The eight complete request/response pairs cover:

1. public search with deterministic canonical-source preference and record pagination;
2. public exact-content read with metadata and character pagination;
3. missing-source read;
4. public topics pagination;
5. direct public neighbors pagination;
6. public exclusion of priority material;
7. authorized operator/developer reading of priority material without authority promotion.
8. bounded public graph walk with path provenance and record pagination.

The nine negative cases reject:

1. a record limit above 20;
2. a read budget above 8,000 characters;
3. a request pinned to another snapshot;
4. an unauthorized operator/developer scope request;
5. a malformed cursor;
6. a stale snapshot;
7. an unknown graph edge type;
8. a duplicate source-class filter.
9. a walk depth above three.

The expected response fixture is generated by the same pure engine that the checker exercises. That agreement proves deterministic implementation conformance to the stated rules; it is not independent evidence that the chosen ranking policy or limits are optimal. Those policy choices remain reviewable V1 contract decisions.

## Commands

Check without writing:

```bash
node scripts/archie-service/validate-mcp-tool-contracts.mjs --check
node --test tests/archie-service-mcp-tool-contract.test.js
node scripts/archie-service/validate-contracts.mjs --check
```

Regenerate the expected request/response fixture after an explicitly accepted contract or source-snapshot change:

```bash
node scripts/archie-service/validate-mcp-tool-contracts.mjs --write
node scripts/archie-service/validate-mcp-tool-contracts.mjs --check
```

## Acceptance Falsifiers

The contract is not accepted if any of these observations occurs:

- a response omits snapshot provenance or source authority fields;
- a public request returns priority material;
- request text or result size exceeds a declared ceiling and still returns `ok`;
- a changed query, filter, tool, scope, or snapshot accepts an old cursor;
- a read page differs from the hashed snapshot content or splits its continuation offset;
- search ranks a routing copy ahead of its equally matching primary canonical source;
- neighbors returns an undeclared edge or an edge whose evidence is not visible;
- a missing, excluded, stale, or incompatible request returns synthesized result data;
- the checker or focused tests fail.

## Remaining Boundary

This closes the MCP tool contract, pure snapshot-query semantics, and representative fixtures. The five semantics are now exposed locally by the [Local Fixture MCP Adapter](local-fixture-mcp-adapter.md); the bounded multi-hop rules and remaining graph-tool exclusions are recorded in [Higher-Order Graph Tools V1](higher-order-graph-tools-v1.md).

Client conformance, authentication, rate limiting, deployment, and public launch behavior remain unresolved.
