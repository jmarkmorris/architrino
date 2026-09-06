# AAA Core Path Interchange v0

## Status and authority

- **Contract:** `aaa_core_path_interchange/v0`
- **Lifecycle:** accepted at logical interchange and fixture-conformance grade
- **Machine control record:** [`aaa-core-path-interchange.v0.json`](../aaa-core-path-interchange.v0.json)
- **Record schema:** [`src/contracts/aaa-core-path-interchange/v0/schema.json`](../../../../src/contracts/aaa-core-path-interchange/v0/schema.json)
- **Validator:** [`src/aaa-core/path-interchange-v0.mjs`](../../../../src/aaa-core/path-interchange-v0.mjs)
- **Focused tests:** [`tests/aaa-core-path-interchange-v0.test.js`](../../../../tests/aaa-core-path-interchange-v0.test.js)
- **Authority boundary:** shared logical path interchange only; no forward-evolution, scientific-kernel, experimental-interpretation, codec-performance, or publication-acceptance authority

Plainly: v0 fixes what shared path records mean and how they fail. It does not decide which paths nature realizes, whether an analysis is scientifically correct, or which storage and transport implementation is fastest.

## Contract envelope

Every record has the same immutable envelope:

```json
{
  "schema": "aaa_core_path_interchange/v0",
  "recordType": "path_set_manifest",
  "recordId": "record.example.manifest",
  "version": 0,
  "contentSha256": "sha256-of-canonical-record",
  "payload": {}
}
```

`contentSha256` is SHA-256 over canonical JSON for the complete record after removing only the `contentSha256` field. Canonical JSON recursively sorts object keys while preserving array order. An unknown schema, version, or record type fails closed.

Plainly: two implementations can independently calculate the same identity from the same record. Changing any protected field changes the identity, while changing array order remains visible because sequence and transform order can be meaningful.

## Record family

| Record type | Owns | Does not own |
| --- | --- | --- |
| `path_set_manifest` | membership, history kind, coverage, frame, normalized units, numeric and interpolation policy, provenance, authority, and ordered chunk references | sample payloads or future evolution |
| `path_chunk` | one immutable time slab of declared path samples, event boundaries, numeric policy, provenance, and source authority | path-set meaning or acceptance beyond its source manifest |
| `stream_envelope` | ordered chunk delivery, accepted-through watermark, open/halted/sealed state, and exact halt payload | transport implementation, subscriptions, reconnect, or backpressure policy |
| `view_manifest` | immutable query and ordered transform request bound to exact source manifests | source mutation or scientific-kernel correctness |
| `derived_product_manifest` | product kind, source closure, optional view binding, coverage, completeness, codec capability identity, provenance, and reduced authority | source-history replacement or EOM continuation authority |

Plainly: the five records separate source meaning, data slabs, delivery state, requested views, and published derivatives. A map or display cannot impersonate the history that produced it.

## Identity order

The v0 reference graph is acyclic:

1. A path chunk names its immutable manifest `recordId` and hashes only its own content.
2. A path-set manifest binds the ordered chunk IDs, content hashes, and sequence numbers, then receives its own content hash.
3. Streams, views, and derived products bind the finalized path-set manifest hash.
4. A derived product may name a view by `viewId`; the validator also requires their source-binding arrays to agree exactly.

Plainly: chunks can be hashed first, their manifest second, and every consumer record afterward. There is no circular requirement for a chunk and its manifest to know each other's final hash before either can exist.

## Path-set contract

A path-set manifest must declare:

- stable path-set and member identities with one role per member;
- one of `eom_accepted_history`, `prescribed_history`, or `experimental_observer_path`;
- ordered coverage fields `startT <= acceptedThroughT <= endT`, with `acceptedThroughT = endT` whenever `complete=true`;
- one right-handed Euclidean frame with axes `X1`, `X2`, and `X3`;
- normalized units with numerical `wakeSpeed=1` and an explicit length scale, time scale, and scale-map identity;
- one numeric representation profile and exact nonfinite behavior;
- one interpolation basis, maximum position error, and `split_chunk` behavior at event boundaries;
- producer version, immutable source-record hashes, and ordered transforms;
- source authority, scientific owner, continuation permission, and evidence use; and
- ordered chunk IDs, hashes, and sequence numbers.

The history kind fixes the maximum source authority:

| History kind | Required authority | EOM continuation |
| --- | --- | --- |
| `eom_accepted_history` | `accepted_history` | permitted |
| `prescribed_history` | `prescribed_path` | forbidden |
| `experimental_observer_path` | `observer_measurement` | forbidden |

Plainly: an EOM-accepted history, an authored path, and an observed track are different kinds of evidence even when their coordinate arrays look alike. The envelope keeps that difference machine-visible.

## Numeric profiles

| Profile | Representations | Precision range | Declared approximation error | Continuation |
| --- | --- | ---: | --- | --- |
| `authoritative_history` | `binary64`, `decimal_string`, `interval_decimal` | 53–256 bits | exactly zero | eligible only when source authority also permits it |
| `precision_bounded_analysis` | `binary32`, `binary64`, `decimal_string`, `interval_decimal` | 24–256 bits | finite and nonnegative | forbidden |
| `display_stream` | `binary16`, `binary32`, `quantized_integer` | 8–24 bits | finite and nonnegative | forbidden |

All new numerical fixtures instantiate the normalized wake speed as $c_f=1$. A codec may implement one or more profiles later, but it may not silently change the profile, precision, scale map, maximum error, rounding rule, or nonfinite behavior.

Plainly: authoritative history is kept exact at its declared representation, analysis data carries a numerical error bound, and display data is visibly display-only. Smaller data is allowed; hidden loss is not.

## Chunk and predecessor closure

For each path set, chunk sequence numbers begin at zero and are contiguous. The first chunk has `predecessorChunkSha256=null`; every following chunk names the preceding chunk's actual content hash. Each manifest reference must agree with the corresponding chunk ID, hash, and sequence. Samples must name declared member paths, lie inside chunk coverage, and carry finite three-dimensional positions. Event markers are explicit chunk boundaries.

Plainly: omission, duplication under another identity, reordering, and branch-boundary smearing cannot pass as an intact path history.

## Streams

A stream envelope binds one finalized path-set manifest and a contiguous prefix of its chunks. It declares `sequenceBase`, `nextSequence`, `acceptedThroughT`, and one of three states:

- `open` carries no halt payload and may expose an incomplete manifest;
- `halted` carries an exact code and message;
- `sealed` carries no halt payload and requires complete source coverage plus every declared chunk.

The v0 envelope fixes identity, ordering, watermarks, halt state, and sealing. The later [Accepted-History Stream v0](accepted-history-stream-v0.md) closes subscription semantics, duplicate delivery, bounded buffering, backpressure, reconnect, deterministic replay, and exact terminal propagation at synthetic in-process conformance grade.

Plainly: v0 says what a valid stream snapshot contains. It does not yet specify the complete behavior of a long-lived broker and its consumers.

## Views and derived products

A view binds exact source path-set IDs and manifest hashes, then records one query, ordered transforms, numeric policy, provenance, and authority. A derived product additionally declares its product kind, optional view ID, coverage, completeness, registered codec capability identity, and publication authority.

The output authority rank may not exceed the weakest bound source. A derived product is limited to `display_only`, `diagnostic`, or `derived_analysis`, and EOM continuation is always forbidden. A sealed product requires complete product coverage and complete source manifests.

Plainly: filtering, resampling, mapping, or rendering can preserve or lower evidential authority, never raise it. A beautifully complete visualization is still not an accepted trajectory.

## Experimental imports

An `experimental_observer_path` manifest must retain at least one immutable source-record hash. Every decoded path sample carries an explicit nonnegative position uncertainty. Calibration and coordinate transforms are recorded in order, while the unchanged source-native payload remains outside the derived path record under its own source identity.

Plainly: the contract can carry an observed track into the workbench without relabeling it as an architrino history or discarding the instrument record from which it was reconstructed.

## Refusal surface

The executable validator returns the first applicable code from this controlled set:

| Code | Meaning |
| --- | --- |
| `missing_required_field` | a required identity, semantic field, sample field, or provenance field is absent |
| `unknown_schema_version` | the schema, version, or record type is unsupported |
| `duplicate_record_identity` | a record, path member, chunk, or path-set identity is repeated |
| `identity_mismatch` | canonical content does not match the recorded SHA-256 identity |
| `missing_coverage` | coverage is absent, unordered, falsely complete, or does not contain a sample or event |
| `incompatible_scales` | a wake speed, unit set, or scale map differs across one source chain |
| `unsupported_precision` | a representation, precision, rounding rule, nonfinite rule, or error declaration violates its profile |
| `broken_predecessor_chain` | chunk hashes or sequence numbers do not form the declared contiguous chain |
| `missing_source_binding` | a chunk, stream, view, or product cannot resolve its declared source |
| `authority_escalation` | a history kind, transform, product, or continuation flag claims stronger authority than its source permits |
| `invalid_stream_state` | stream state, halt data, next sequence, or watermark is inconsistent |
| `incomplete_seal` | a stream or product claims sealing without complete source and output coverage |
| `invalid_experimental_provenance` | an observer import loses source identity or per-sample uncertainty |

Plainly: bad input is refused with a stable reason. Missing or incompatible data is never interpreted as zero, complete, accepted, or scientifically authoritative.

## Fixture coverage

The positive suite contains five independent bundles:

1. a two-path EOM-produced accepted history;
2. a prescribed analytic path with nonzero declared approximation bound;
3. a two-chunk open accepted-history stream with a valid predecessor chain;
4. a Potential view and sealed derived map manifest bound to the current Potential v1 consumer field set; and
5. an observer-level experimental import with source-native provenance and per-sample uncertainty.

The negative suite mutates those bundles to reject missing coverage, incompatible normalized scale, a broken predecessor, unsupported precision, an unknown version, authority escalation, a missing source binding, an incomplete seal, experimental uncertainty loss, and stale identity.

The Potential compatibility test maps a Core path-set manifest into every upstream field currently required by [`potential-product-contract.v1.json`](../potential/potential-product-contract.v1.json). This proves field-level Core product conformance for the synthetic v1 fixture; it does not prove a production Potential service, codec, kernel, stream broker, or published map.

Plainly: every completion family named by CORE-001 has a passing example, and every required fail-closed class has an executable negative control. The evidence is contract conformance, not runtime or scientific acceptance.

## Validation

Run:

```bash
node src/aaa-core/path-interchange-v0.mjs
node --test tests/aaa-core-path-interchange-v0.test.js
```

The checker reads the accepted control record and both fixture suites, verifies local semantics before cross-record closure, and checks canonical identities last. Negative mutations therefore test their intended contract rule rather than being masked by the expected downstream hash mismatch.

Plainly: the negative cases demonstrate exact refusal behavior, while the positive cases prove that one consistent source-to-product record family can pass all declared v0 rules.

## Remaining boundary

CORE-001 closes the logical interchange contract. It does not close:

- measured representation choice; provider registration and synthetic round-trip behavior are now closed by [Codec Registry v0](codec-registry-v0.md), while every representative workload remains unmeasured;
- production transport and persistence beyond the subscription, replay, idempotency, backpressure, reconnect, and halt conformance closed by [Accepted-History Stream v0](accepted-history-stream-v0.md);
- stable query identity, transform-cache semantics, or general publication workflows (CORE-005);
- a production experimental adapter or selected public dataset (CORE-007); or
- an application client SDK (CORE-008).

Closure goal: use this one logical record family as the invariant meaning behind every later codec, stream, query, transform, and application client without allowing representation changes to alter source identity or authority.
