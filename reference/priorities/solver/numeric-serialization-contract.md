# Numeric Serialization Contract

Status: `closed-design-capture`

Kind: `solver-contract`

Source task: `numeric_serialization_contract` in [solver.md](solver.md)

Primary dependency: [precision.md](precision.md)

Implementation surfaces:

- [NumericSerialization.hpp](../../../src/solver/include/architrino/solver/NumericSerialization.hpp)
- [NumericSerialization.cpp](../../../src/solver/src/NumericSerialization.cpp)
- [SolverAppBridge.mjs](../../../src/solver/app/SolverAppBridge.mjs)
- [schema.json](../../../src/contracts/solver-app-bridge/v1/schema.json)

## Purpose

This contract defines the canonical byte and export representation for every declared central-solver numeric type. It is the storage and transport companion to the precision-path contract: precision paths choose the numeric method, while this note defines how the selected numeric values are encoded, compared, exported, and validated.

The declared numeric types are:

- `f64`
- `scaled_i64`
- `interval_f64_pair`
- `decimal128`
- `mp_limb_block`

All solver manifests, stream manifests, dense-buffer descriptors, package manifests, and validation artifacts that carry authoritative numeric values must name the numeric type, numeric chart, precision path, unit convention, scale normalization, and error-budget authority that make the stored value interpretable.

## Global Rules

| Rule | Contract |
| --- | --- |
| Byte order | All binary numeric storage is little-endian. A big-endian host must convert at the solver boundary and must not expose host object layout as a wire format. |
| Finite solver storage | Authoritative solver storage rejects `NaN`, `Infinity`, and `-Infinity`. Unbounded states, unavailable values, and rejected rows use explicit status records rather than non-finite numeric sentinels. |
| Signedness | All declared numeric types are signed. Unsigned fields may appear inside a container layout, such as limb words, but the represented numeric value remains signed. |
| Scale authority | A value's scale is part of its manifest or encoded exponent. Consumers must not infer scale from field names, display units, or app defaults. |
| Rounding authority | Rounding mode is part of the producing stage. Validation replay must record enough rounding metadata to reproduce or bound the encoded value. |
| Comparison authority | Numeric comparison uses the declared numeric semantics, never raw byte lexicographic order unless a format says it has already been canonicalized for byte comparison. |
| App-buffer authority | `f64` is the only declared numeric type that is app-buffer safe by default. Other types may be exported to apps through structured JSON, projected `f64` buffers, or stream handles with explicit authority labels. |
| Text export | Text export must preserve round-trip or containment authority. JSON numbers are allowed only when the schema field and numeric type explicitly permit them; exact integer, decimal, and limb payloads use strings or structured fields. |

## Type Contracts

| Numeric type | Byte order | Size | Signedness | Scale factor | Exponent or limb layout | Interval convention | Rounding mode | Comparison semantics | JSON/export form |
| --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| `f64` | Little-endian | 8 bytes | Signed IEEE binary floating point | Identity | IEEE 754 binary64 sign, exponent, and significand; host object padding is not part of storage. | Not an interval. | Nearest, ties to even for storage conversion unless a stricter stage produces a bounded value in another type. | Ordered finite numeric values. `NaN` is invalid. `+0` and `-0` compare equal for solver semantics; bitwise equality is a separate byte-stability check. | Round-trip decimal with 17 significant digits. JSON number is permitted only for schema-declared `f64` fields; textual artifacts may use strings to prevent downstream reformatting. |
| `scaled_i64` | Little-endian | 8 bytes | Signed two's-complement integer | Manifest-declared power-of-two or power-of-ten scale. The represented value is `integer * base^scaleExponent`, where `base` is `2` or `10`. | One signed little-endian `i64`; no separate exponent inside the value bytes. The scale lives in the owning row, stream column metadata, or manifest. | Not an interval. | Integer storage is exact. Conversion from a real value rounds to nearest under a manifest-declared tie policy; no implicit tie policy is allowed. Overflow, underflow, or missing scale is a validation error. | Compare after applying the declared scale. Different scales require exact integer rescaling or a stricter comparison kernel; consumers must not compare through `f64` when that can lose authority. | Integer decimal string plus scale metadata, for example `{"integer":"-123","scale":{"base":10,"exponent":-9}}`. A JSON integer is allowed only when the schema range is known to fit exactly. |
| `interval_f64_pair` | Little-endian | 16 bytes | Signed endpoints | Identity per endpoint | Two consecutive IEEE 754 binary64 endpoints. `lower` is stored first, then `upper`. | Closed interval `[lower, upper]`; endpoints must be finite and `lower <= upper`. Singleton intervals are allowed. Empty or unbounded intervals use status records, not reversed endpoints or infinities. | Producers use directed outward rounding: lower endpoint toward `-Infinity`, upper endpoint toward `+Infinity`. A copied interval preserves its original endpoint bytes and authority metadata. | Use containment, overlap, disjointness, or enclosure width. Point comparison requires an explicit projection such as lower endpoint, upper endpoint, midpoint, or certified representative. | Two-element array `[lower, upper]` using 17-significant-digit endpoint text, plus surrounding metadata when the field is not self-describing. |
| `decimal128` | Little-endian | 16 bytes | Signed finite decimal | Decimal exponent carried by the encoded value | Canonical finite decimal coefficient and exponent value. The logical value is `sign * coefficient * 10^exponent`, with up to 34 decimal digits. If a producer materializes coefficient limbs internally, least-significant decimal limb comes first; those materialized limbs are not the wire format. | Not an interval. | Nearest, ties to even unless the producing stage declares directed rounding for a bounded result. Noncanonical encodings must be canonicalized before comparison or export. | Decimal numeric order after canonicalization. Negative zero must canonicalize to zero unless a field explicitly records signed-zero diagnostics. | Canonical decimal scientific notation string with no redundant leading zeros and an explicit exponent when needed. JSON number export is not authoritative. |
| `mp_limb_block` | Little-endian | Variable; descriptor size `0` | Signed-magnitude numeric value with unsigned limbs | Explicit binary exponent and limb count in the owning row or manifest. The represented value is `sign * significand * 2^exponent`. | Header fields declare sign, signed exponent, limb count, and limb bit width. Canonical limb blocks use unsigned 64-bit little-endian limbs, least-significant limb first. Leading zero limbs are forbidden except for the canonical zero block. | Not an interval unless a higher-level interval layout wraps two limb blocks with a declared endpoint convention. | Producer-declared. Validation replay must record the rounding mode, target precision, guard bits or equivalent bound, and whether the value is exact or rounded. | Arbitrary-precision numeric order after canonicalization. Compare sign first, then exponent-normalized significand magnitude. Raw byte comparison is valid only after canonicalization and only inside the same limb-block layout version. | Structured object with sign, exponent, limb bit width, limb count, limbs as fixed-width hexadecimal strings, and an exact limb checksum. |

## Canonical JSON Descriptor

The app bridge exposes this contract as `solver-numeric-serialization.v1`. Each descriptor must include these fields:

| Field | Meaning |
| --- | --- |
| `numericType` | One of `f64`, `scaled_i64`, `interval_f64_pair`, `decimal128`, or `mp_limb_block`. |
| `byteOrder` | Always `little-endian`. |
| `scalarSizeBytes` | Fixed scalar byte length, or `0` for variable-size limb blocks. |
| `signedness` | `signed` for all declared solver numeric types. |
| `scaleFactor` | Identity, manifest-declared scale, encoded decimal exponent, or explicit limb-block exponent policy. |
| `exponentLayout` | The binary64, integer, decimal, endpoint-pair, or limb-block exponent/significand layout. |
| `limbOrder` | `none` for scalar and interval endpoint types; least-significant limb first for materialized decimal or multiprecision limb payloads. |
| `intervalEndpointConvention` | `not-interval` for scalar values; closed lower-first endpoints for interval pairs. |
| `roundingMode` | The required producer rounding rule. |
| `comparisonSemantics` | The valid comparison rule for the represented value. |
| `textExport` | The canonical text or JSON payload shape for exported values. |
| `appBufferSafe` | Whether apps may consume the raw dense buffer as authoritative numeric values without a structured wrapper. |
| `authoritativeStorageSafe` | Whether the type may store authoritative solver values when its metadata obligations are satisfied. |

The bridge-level descriptor list must contain exactly the five declared numeric types. Adding another numeric type requires updating the native enum, native descriptor, app bridge descriptor, TypeScript declaration, JSON schema, package-manifest export, and validation checks together.

## Validation Obligations

1. Native descriptor validation must prove that all five numeric types have nonempty byte order, scale, exponent or limb layout, interval convention, rounding mode, comparison semantics, and text export fields.
2. App bridge validation must prove that `solver-numeric-serialization.v1` exposes exactly five numeric descriptors and that the numeric type ids match the schema enum.
3. Schema validation must reject descriptors with missing fields, unsupported byte order, unsupported signedness, or unknown numeric type ids.
4. Stream and run manifests must record stored numeric type, numeric chart, selected precision path, unit convention, scale normalization, claim level, global error budget, stage error budgets, and value authority.
5. `f64` validation must reject non-finite values, preserve little-endian binary64 storage, and verify 17-significant-digit text round trip for exported authoritative values.
6. `scaled_i64` validation must require scale base, scale exponent, tie policy, overflow checks, and exact compare or rescale logic. Missing scale metadata invalidates the value.
7. `interval_f64_pair` validation must require finite lower and upper endpoints, `lower <= upper`, lower-first storage, directed outward producer rounding, and explicit projection before point comparison.
8. `decimal128` validation must reject non-finite decimal payloads, canonicalize coefficient and exponent before comparison, record directed rounding when used, and export authoritative values as decimal strings.
9. `mp_limb_block` validation must require sign, signed exponent, limb count, limb bit width, least-significant-limb-first order, no noncanonical leading zero limbs, producer rounding metadata, and checksum verification.
10. Validation replay must fail closed when a value's numeric type, scale, rounding mode, endpoint convention, or comparison semantics cannot be reconstructed from the artifact.

## Closure Decision

`numeric_serialization_contract` is closed as a contract-definition task. The native descriptor, app bridge descriptor, TypeScript contract, JSON schema, and this priority note now define the requested byte order, signedness, scale factors, exponent and limb layout, interval endpoint convention, rounding mode, comparison semantics, JSON/export form, and validation obligations for every declared solver numeric type.
