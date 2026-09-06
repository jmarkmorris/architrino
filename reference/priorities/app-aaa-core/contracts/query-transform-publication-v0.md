# AAA Core Query, Transform, And Publication v0

## Status And Scope

`aaa_core_query_transform_publication/v0` is the accepted CORE-005 behavior contract above [AAA Core Path Interchange v0](path-interchange-v0.md), [AAA Core Codec Registry v0](codec-registry-v0.md), and [AAA Core Accepted-History Stream v0](accepted-history-stream-v0.md). Its machine control record, schema, executable conformance layer, and fixtures define deterministic query normalization, ordered transform identity, cache identity, source closure, authority propagation, sealing, and exact cross-application retrieval.

This is contract and synthetic-conformance evidence only. It does not scientifically validate a transform, execute a production query or kernel, deploy a cache or catalog, establish performance, or accept any derived product as physical evidence.

Plainly: Core can now prove when two requests mean the same thing, when operation order makes them different, and whether a published result still points to every source that produced it. The test does not prove that the requested calculation describes nature.

## Computation Identity

The request has seven required fields: schema, request id, source bindings, query, ordered transforms, numeric policy, and output contract. Normalization treats source bindings, selected path ids, and event kinds as sets: duplicates are refused and order is canonicalized. Object keys are recursively sorted. The request id is retained for tracing but excluded from computation identity. Unknown fields are refused rather than silently ignored.

The identities are:

$$
I_q=\operatorname{SHA256}(\text{normalized source bindings},\text{normalized query}),
$$

$$
I_t=\operatorname{SHA256}(\text{ordered transform sequence}),
$$

$$
I_c=\operatorname{SHA256}(\text{contract version},I_q,I_t,\text{numeric policy},\text{output contract}).
$$

Plainly: changing a tracking label does not waste the cache, and reordering set-like filters does not create a new result. Reordering translate-then-scale into scale-then-translate does create a new result because those operations generally do not commute.

## Transform And Authority Rules

Every transform declares an id, version, parameters, maximum added absolute error, coverage effect, and authority effect. Transform order is preserved exactly. The v0 conformance harness recognizes translation, scaling, and selection identities only; it records these operations but does not claim their numerical or scientific correctness.

Output authority is bounded by the weakest source, the derived-product ceiling, and every transform cap. A derived product never permits EOM continuation. Display shaping caps the output at `display_only`; an analysis transform can cap it at `derived_analysis` or `diagnostic`.

Plainly: a polished view cannot become more trustworthy than its source, and no Core transformation can turn a display or analysis product into accepted EOM history.

## Source Closure And Publication

A view, derived product, and publication receipt each carry the same canonical source bindings. The conformance layer resolves every path-set id to the exact manifest SHA-256 and validates the combined source, view, and product bundle through the accepted path-interchange validator.

A provisional product may expose incomplete coverage. A sealed product requires every source manifest and the requested output interval to be complete, and its receipt must be immutable. Retrieval requires an explicitly listed consumer plus the exact product id, product content hash, and receipt hash.

Plainly: a live partial result can be useful, but it stays visibly partial. A completed label is available only when no requested source interval is missing, and another application receives the exact product the publisher named.

## Conformance Evidence

The positive suite uses two existing hash-valid path-interchange fixtures:

| Case | Source | Required result |
| --- | --- | --- |
| Complete equivalent and ordered | Complete prescribed path, normalized $c_f=1$ | Two differently ordered JSON requests with different request ids share one cache identity; reversing translate and scale changes identity; Potential publishes a sealed analysis product; Equation Mapping retrieves it by exact receipt. |
| Incomplete provisional | Open accepted-history prefix, normalized $c_f=1$ | Potential publishes only a provisional display product with incomplete coverage and `display_only` authority; a seal attempt is refused. |

The negative suite covers all fifteen contract refusal codes: invalid contract, missing field, unsupported query field, duplicate or missing source binding, stale cache identity, transform-order identity collision, unsupported transform, unregistered codec, incomplete sealing, authority escalation, source-closure mismatch, mutable sealed publication, forbidden consumer, and stale publication identity.

Plainly: the fixtures cover both the normal exchange and each named way the contract must stop. Deterministic agreement among these implementations is software-conformance evidence, not an independent check of a scientific transform.

## Artifacts

- Machine control record: [`aaa-core-query-transform-publication.v0.json`](../aaa-core-query-transform-publication.v0.json)
- Structural schema: [`src/contracts/aaa-core-query-transform-publication/v0/schema.json`](../../../../src/contracts/aaa-core-query-transform-publication/v0/schema.json)
- Executable validator and builder: [`src/aaa-core/query-transform-publication-v0.mjs`](../../../../src/aaa-core/query-transform-publication-v0.mjs)
- Positive fixtures: [`tests/fixtures/aaa-core-query-transform-publication/v0/positive-suite.json`](../../../../tests/fixtures/aaa-core-query-transform-publication/v0/positive-suite.json)
- Negative fixtures: [`tests/fixtures/aaa-core-query-transform-publication/v0/negative-suite.json`](../../../../tests/fixtures/aaa-core-query-transform-publication/v0/negative-suite.json)
- Focused tests: [`tests/aaa-core-query-transform-publication-v0.test.js`](../../../../tests/aaa-core-query-transform-publication-v0.test.js)

Closure goal: carry these stable identities through the accepted thin client and into measured production-candidate workloads without moving query semantics or path logic into individual applications.
