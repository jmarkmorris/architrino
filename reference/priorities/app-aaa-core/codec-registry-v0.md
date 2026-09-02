# AAA Core Codec Registry v0

## Status and authority

- **Registry:** `aaa_core_codec_registry/v0`
- **Lifecycle:** accepted at registry-contract and synthetic-conformance grade
- **Logical dependency:** [`aaa_core_path_interchange/v0`](path-interchange-v0.md)
- **Machine control record:** [`aaa-core-codec-registry.v0.json`](aaa-core-codec-registry.v0.json)
- **Registry schema:** [`src/contracts/aaa-core-codec-registry/v0/schema.json`](../../../src/contracts/aaa-core-codec-registry/v0/schema.json)
- **Executable conformance:** [`src/aaa-core/codec-registry-v0.mjs`](../../../src/aaa-core/codec-registry-v0.mjs)
- **Focused tests:** [`tests/aaa-core-codec-registry-v0.test.js`](../../../tests/aaa-core-codec-registry-v0.test.js)
- **Authority boundary:** codec registration, negotiation, deterministic fixture encoding and decoding, semantic round-trip, declared error behavior, and exact refusal only

Plainly: this contract says which encoders and decoders exist, what each one may carry, who may consume it, what it preserves, and how it refuses an unsafe request. It does not select a production storage format or make encoded data scientifically authoritative.

## Registry and provider boundary

AAA Core owns the registry schema, provider discovery, compatibility check, capability negotiation, common envelope, authority caps, conformance suites, and refusal vocabulary. A provider remains owned by the component that understands its representation:

| Provider class | Owner | Registered responsibility | Boundary |
| --- | --- | --- | --- |
| Core | AAA Core | Canonical logical-record JSON and a reusable quantized path-display layout | No EOM evolution or scientific interpretation |
| Core product | AAA Core Potential | Existing fixture map JSON for a Potential publication product | Fixture-only; no production map format selected |
| Experimental | Synthetic experiment adapter | Fixture CSV decoding with source-native byte retention | Fixture-only; no public dataset or production detector decoder selected |

Plainly: Core controls the loading-dock rules. Core, an app, or an experiment adapter may own particular loading equipment, but anything exchanged outside its private process must register the same facts and pass the same safety checks.

## Capability negotiation

A request binds all of these fields before encoding or decoding begins:

```json
{
  "registrySchema": "aaa_core_codec_registry/v0",
  "capabilityId": "aaa-core.canonical-json-path-record/v0",
  "deterministicVersion": "0.1.0",
  "profile": "authoritative_history",
  "consumer": "EOM solver",
  "requestedAccess": "whole_record"
}
```

The registry rejects an unknown capability, version mismatch, unsupported profile, unlisted consumer, unsupported access mode, or unsupported direction before a provider sees the payload. Negotiation never substitutes a weaker capability automatically.

Plainly: a caller gets the exact format and guarantees it requested or a named refusal. It never receives a smaller or less trustworthy representation without being told.

## Representation profiles

| Profile | Numeric and error rule | Events and branches | Authority and use |
| --- | --- | --- | --- |
| `authoritative_history` | Decoded logical record must be identical; no downcast, quantization, interpolation change, or added error | Preserved exactly | Source authority is preserved; EOM continuation still requires the source record's independent permission |
| `precision_bounded_analysis` | Any change requires a finite declared purpose-specific bound; the source numeric policy and transforms remain visible | Preserved exactly | Authority may stay the same or decrease; EOM continuation is forbidden |
| `display_stream` | Decoded coordinates remain within the declared display bound; unavailable values remain unavailable | Preserved exactly | Effective output authority is capped at `display_only`; EOM continuation is forbidden |

Plainly: the profile identifies what a consumer is allowed to believe about the bytes. Exact history, bounded analysis, and display data are visibly different even when they depict the same path.

## Registered capabilities

### Canonical path-record JSON

`aaa-core.canonical-json-path-record/v0` encodes any of the five accepted path-interchange records as recursively key-sorted UTF-8 JSON. It supports authoritative-history and precision-bounded-analysis profiles. The payload envelope binds the source record ID, source content hash, encoded-byte hash, capability ID, deterministic provider version, and representation profile. Decode succeeds only when the logical record and its canonical identity are unchanged.

Plainly: this is the simple reference codec. It prioritizes exact, inspectable meaning over compactness or GPU layout.

### Quantized path-display layout

`aaa-core.quantized-path-display-int16le/v0` stores time offsets as little-endian signed 32-bit integers and three-axis positions as little-endian signed 16-bit integers. The fixture uses normalized units with $c_f=1$, a time quantum $q_T=10^{-3}$, a position quantum $q_X=10^{-3}$, and the reconstruction rule

$$
\widehat v=q\operatorname{round}\!\left(\frac{v}{q}\right),
\qquad
|\widehat v-v|\le 5\times 10^{-4}.
$$

The provider also applies the record's tighter declared maximum error, so a record that permits less error than the grid produces is refused. Coverage, provenance, and event or branch markers stay in exact metadata. The envelope caps effective authority at `display_only`, permits whole-record and sample-range access, declares a structure-of-arrays CPU view and GPU-ready integer arrays, and forbids continuation consumers.

Plainly: positions and times can be packed efficiently for drawing, but the display grid must fit the record's stated error budget. The exact event labels are carried separately so compression cannot slide an event across a boundary.

### Potential fixture-map JSON

`potential_fixture_map_json/v1` registers the accepted Potential product fixture as a Core-owned capability. It encodes the complete contract-valid document as canonical UTF-8 JSON and preserves the derived map, source binding, coverage, provenance, completeness, error grade, and publication identity exactly. It supports `precision_bounded_analysis` and `display_stream`, but the current fixture exercises only the precision-bounded-analysis profile. Its status is `conformance_accepted_fixture_only`.

Plainly: the Potential test map has one Core registry entry. That does not choose a production tile format.

### Experimental fixture CSV decoder

`experiment.synthetic-track-csv-decoder/v0` accepts only the fixture schema `synthetic_track_csv/v0`. It verifies the SHA-256 identity of the source-native UTF-8 bytes, requires every reconstructed sample to retain a nonnegative position uncertainty, preserves event columns exactly, produces an observer-level path chunk, and forbids EOM continuation. The conformance wrapper retains the source-native bytes outside the derived path record and re-emits those retained bytes rather than reconstructing CSV from parsed coordinates.

Plainly: the decoded path is a traceable interpretation of an instrument-shaped record. The original bytes remain untouched and the result cannot be mistaken for an EOM-produced architrino history.

## Access, chunking, and device layout

Each provider declares its supported access granularity, stream behavior, chunk boundary rule, CPU representation, GPU representation, and whether decode may remain device-resident. The accepted fixture providers make only these claims:

| Capability | Random access | Streaming and chunking | Device posture |
| --- | --- | --- | --- |
| Canonical path-record JSON | Whole record | One record per envelope; source chunk boundaries preserved | CPU UTF-8; no GPU layout |
| Quantized path display | Whole record and sample range | One path chunk per envelope; source chunk boundaries preserved | CPU structure of arrays; GPU-ready integer arrays |
| Potential fixture map | Whole record | No streaming; one fixture map per envelope | CPU UTF-8; no GPU layout |
| Experimental fixture CSV | Whole record | No streaming; one source record to one path chunk | CPU parsed rows; no GPU layout |

Plainly: device readiness is a declared layout property, not a measured speed claim. No provider has yet run the representative workload matrix.

## Refusal surface

| Code | Meaning |
| --- | --- |
| `missing_required_field` | A registry, provider, request, envelope, or source field is absent |
| `unknown_capability` | The requested capability ID is not registered |
| `incompatible_version` | Registry, provider, or envelope version is incompatible |
| `unsupported_profile` | The provider or logical record does not support the requested representation profile |
| `capability_mismatch` | Direction, logical type, or access requirement is unsupported |
| `forbidden_consumer` | The named consumer is not permitted to use the capability |
| `payload_integrity_mismatch` | Encoded bytes do not match the envelope hash |
| `semantic_round_trip_failure` | Decode changes the protected logical record or publication |
| `error_budget_exceeded` | Quantization range or reconstruction error exceeds the declared bound |
| `event_preservation_failure` | An event or branch marker changes or becomes incomplete |
| `source_identity_mismatch` | Experimental source-native bytes or their provenance have a stale identity |
| `uncertainty_loss` | An experimental sample loses its required uncertainty |
| `unsupported_source_schema` | The source-native fixture columns or version are unknown |

Plainly: every tested unsafe case has one stable reason. A failed codec request never becomes missing data, zero data, complete coverage, or a silently downgraded product.

## Conformance evidence

Run:

```bash
node src/aaa-core/codec-registry-v0.mjs
node --test tests/aaa-core-codec-registry-v0.test.js
node scripts/check-potential-consumer-publication-contract.mjs
```

The positive suite covers exact Core authoritative-history and precision-bounded-analysis JSON round trips, the Core quantized display layout, the application-owned Potential map fixture, and the experimental decoder's source-byte round trip. The negative suite covers eleven distinct refusals: unknown capability, incompatible version, unsupported profile, unsupported access, forbidden display continuation, corrupt payload, exceeded display error, lost event, stale experimental source identity, lost uncertainty, and unknown source schema.

The round-trip fixtures establish deterministic implementation conformance. They do not independently validate a compression algorithm's scientific suitability, a Potential kernel, an experimental reconstruction, or a workload cost. Those claims require independent references and measured workload evidence under their owning lanes.

Plainly: the registry rules work on the small controlled examples and fail in the intended ways. Real representation choices still have to pass independent correctness gates and measured end-to-end workloads.

## Remaining boundary

CORE-003 closes the registry and conformance contract. The later [Accepted-History Stream v0](accepted-history-stream-v0.md) closes synthetic broker behavior; stable query and publication semantics in CORE-005, production experimental import in CORE-007, application SDK behavior in CORE-008, and every measured codec, storage, transfer, memory, GPU, energy, cost, or scientific result remain open.

Closure goal: use the accepted registry and stream contract as the shared boundary for immutable query, transform, cache, and publication identity in CORE-005.
