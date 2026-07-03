# Virtual Observer Path Record Contract

Status: `closed-design-capture`

Kind: `solver-contract`

Source task: `virtual_observer_path_record_contract` in [priorities.md](priorities.md)

Primary dependencies:

- [precision.md](precision.md)
- [path-history-stream-contract.md](path-history-stream-contract.md)
- [numeric-serialization-contract.md](numeric-serialization-contract.md)
- [storage-lifecycle-policy.md](storage-lifecycle-policy.md)
- [spatiotemporal-query-algorithm-survey.md](spatiotemporal-query-algorithm-survey.md)

Implementation evidence:

- [CausalRootSolver.hpp](../../../src/solver/include/architrino/solver/CausalRootSolver.hpp) defines `LinearPathSegment` with path identity, time bounds, endpoint state, numeric type, and error bound.
- [PathHistoryStream.hpp](../../../src/solver/include/architrino/solver/PathHistoryStream.hpp) defines `PathHistoryRowF64`, `PathHistoryIndexRow`, chunk rows, stream metadata, and range query fields.
- [SolverAppBridgeContract.d.ts](../../../src/solver/app/SolverAppBridgeContract.d.ts) exposes `path_segment.v1`, `SolverPathHistoryRowF64`, `solver-path-history-stream-metadata.v1`, and dynamic replay metadata.
- [schema.json](../../../src/contracts/solver-app-bridge/v1/schema.json) validates `pathHistoryRowF64`, `streamDescriptor`, path-history stream metadata, numeric type ids, numeric chart ids, and indexed range readback.

## Purpose

The virtual observer is solver instrumentation, not a human-like observer and not an added physical entity. Its path-record job is minimal: record enough kinematic data to reconstruct a path segment precisely within declared error bounds. Dynamic replay, potential audit, assembly membership, and derived geometry may attach to that segment, but they must not change the segment's path definition.

This contract closes the design boundary for one segment-level path record. It defines the stable minimum that path-history streaming, causal-root solving, delayed-hit reconstruction, geometry queries, app playback, and validation replay can share without turning every path row into a full dynamic ledger.

## Contract Boundary

The virtual-observer path record owns:

- path identity and segment identity;
- segment time bounds;
- coordinate frame and unit authority;
- numeric type, numeric chart, and scale authority needed to decode stored values;
- interpolation law;
- endpoint state or segment coefficients sufficient to reconstruct $\mathbf{x}(t)$ on the segment;
- segment error bounds and value authority.

It does not own:

- the force law or model contract;
- causal-root ledgers, delayed-hit rows, Jacobian rows, or potential contributions;
- assembly graph semantics;
- broad-phase query indices;
- display-only projection buffers;
- storage lifecycle decisions beyond the active-window flags and references needed by the stream layer.

## Minimal Segment-Level Record

The authoritative kinematic path segment is the smallest record from which a reader can reconstruct the path over the declared interval without consulting a dynamic replay ledger. The reader may need dictionary metadata for numeric decoding and frame transforms, but it must not need potential rows, assembly rows, or app state to compute the segment curve.

Minimum logical record:

```text
virtual_observer_path_segment.v1
  runId
  pathId
  pathKey
  segmentId or segmentIndex
  timeBounds
    start
    end
    endpointConvention
  coordinateFrame
    frameId
    units
    frameAuthority
    transformErrorBound
  numeric
    numericType
    numericChart
    scaleNormalization
    precisionPath
  interpolation
    law
    payloadKind
    payload
  error
    interpolationErrorBound
    stateErrorBound
    encodingErrorBound
    readbackErrorBound
    aggregateErrorBound
  authority
    valueAuthority
    claimLevel
    status
```

`pathId` is the stable semantic identity inside a run. `pathKey` is the compact binary key used by current stream and bridge layouts. `segmentId` or `segmentIndex` orders immutable segments for the same path. A manifest may compress repeated `runId`, frame, unit, numeric, and precision metadata into dictionaries, but the decoded logical record must contain the fields above.

The interval convention is start-inclusive and end-exclusive for ordinary adjacent segments: $t_{\mathrm{start}} \leq t < t_{\mathrm{end}}$. A finalized last segment may declare an end-inclusive convention. Zero-duration event rows are not kinematic path segments; they belong in event, root, membership, or diagnostic ledgers.

## Interpolation Payloads

Each segment must declare one interpolation law and one payload kind. The law defines how to reconstruct $\mathbf{x}(t)$ and, where supported, $\mathbf{v}(t)$ over the segment.

| Payload kind | Required fields | Reconstruction authority |
| --- | --- | --- |
| `linear_endpoint_state` | `positionAtStart`, `velocity`, `startTime`, `endTime` | Matches the current `LinearPathSegment` and `PathHistoryRowF64` shape. The segment reconstructs $\mathbf{x}(t)=\mathbf{x}_0+\mathbf{v}(t-t_0)$ in the declared frame. |
| `hermite_endpoint_state` | `positionAtStart`, `velocityAtStart`, `positionAtEnd`, `velocityAtEnd`, `startTime`, `endTime` | Reconstructs a cubic Hermite segment. Use when endpoint velocities matter and linear reconstruction cannot satisfy the interpolation error bound. |
| `polynomial_coefficients` | coefficient vectors, coefficient basis, normalized-time convention, `startTime`, `endTime` | Reconstructs a declared polynomial or series in normalized segment time $u=(t-t_0)/(t_1-t_0)$. |
| `sampled_subsegment_reference` | child segment ids or chunk row spans plus reconstruction rule | Allows dense samples or subsegments while preserving the same parent path identity. The referenced child records become the authority for reconstruction. |

If a solver cannot meet the declared error bound using the chosen payload, it must store denser segments, stricter coefficients, or a stricter numeric type. A replay method by itself is not a path definition unless the replay output materializes one of the authoritative payloads above or explicitly marks the path as replay-dependent and non-authoritative for standalone path reconstruction.

## Error Bounds And Authority

Every segment carries a nonnegative aggregate `errorBound`. The aggregate is a convenience bound, not a substitute for stage budgets. Authoritative manifests should also expose the stage components:

| Error component | Meaning |
| --- | --- |
| `stateErrorBound` | Uncertainty or integration error in stored endpoint state or coefficients. |
| `interpolationErrorBound` | Maximum path reconstruction error inside the segment after applying the declared interpolation law. |
| `transformErrorBound` | Bound introduced by coordinate-frame transforms or local-frame origin and basis metadata. |
| `encodingErrorBound` | Bound introduced by numeric serialization or scale conversion. |
| `readbackErrorBound` | Bound introduced by stream readback, projection, or buffer conversion. |

The value authority vocabulary follows the solver precision contract: authoritative, approximate, broad-phase-only, projection, display-only, or validation-only. A downstream buffer may lower authority for app display, but it must not raise authority above the source segment and must preserve a reference to the authoritative segment when replay or audit matters.

## Attachment Model

Attachments are keyed by `runId`, `pathId` or `pathKey`, segment range, and time interval. They may be stored in the stream manifest, event store, root ledger, assembly graph streams, geometry buffers, or deep indices. They do not mutate the path segment.

| Attachment | Required reference | Rule |
| --- | --- | --- |
| Dynamic replay | `dynamicReplayRef`, request hash, integration method, timestep policy, tolerance policy, precision path, and produced segment range. | Replays how the solver produced or advanced the segment. It may validate or regenerate segments, but the segment definition remains the kinematic payload plus interpolation law. |
| Potential audit rows | `potentialAuditRef`, root-ledger refs, delayed-hit refs, branch-geometry refs, Jacobian refs, contribution rows, and rejection or halt reasons. | Explains the potential or force inputs perceived at a time or over a segment. These rows are required for audit and validation, not for standalone path reconstruction. |
| Assembly membership | `membershipId`, `assemblyId`, `assemblyStateId`, role, membership interval, membership version, and status. | Joins the path to the temporal assembly graph. Membership changes are interval or event records, not edits to prior path segments. |
| Derived geometry | `geometryRef`, geometry kind, source segment ids, frame id, padding/error policy, coverage status, and checksum when persisted. | Accelerates bounds, projection, shell, path-vs-path, or broad-phase queries. It is rebuildable acceleration metadata unless a later contract explicitly promotes a geometry row to validation evidence. |

This attachment model lets future implementations add better indices and query plans without changing what a path segment means. A deep-index miss can only reject a fast query when the index declares complete coverage for that query family; otherwise the reader falls back to authoritative path segments.

## Active Window And Aged-Out Data

Active-window path data is the hot subset required for the next precise solver actions. It includes the current kinematic segments, minimal active indices, and only the attachment references needed by live causal-root, delayed-hit, interpolation, assembly-membership, branch-transition, or validation obligations.

A segment or chunk may leave the active window only when:

1. its authoritative kinematic payload, frame metadata, numeric metadata, and error bounds are committed;
2. any attachment needed by a current live query remains hot or has a committed reference;
3. the path-history stream index can recover the segment by path id, time range, frame range, chunk, and byte range;
4. checksum and manifest metadata are committed;
5. the age-out decision preserves the declared value authority and replay status.

Aged-out path data is not deleted. It moves to warm or cold storage through the storage lifecycle policy. The authoritative path record remains the committed segment plus its manifest and dictionary metadata. Optional dynamic replay rows, potential audit rows, assembly rows, and derived geometry may be aged differently, but their references must either remain valid or be marked unavailable with an explicit replay or audit status.

## Indexing And Query Optimization

The path record is deliberately small so indexing can evolve. Query acceleration should attach to path records through sidecars, not by adding model-specific columns to the path definition.

Stable index keys:

- `runId`;
- `pathId` and `pathKey`;
- `segmentId` or `segmentIndex`;
- time bounds;
- frame range when sampled frames exist;
- chunk id and byte range;
- coordinate-frame id;
- numeric chart id;
- value authority and claim level.

Allowed index products include active-window interval maps, chunk-level stream indices, spacetime summaries, emission-shell broad-phase candidates, path-vs-path candidates, speed-regime transition maps, and replay decimation ladders. These products may store conservative padding from error bounds and numeric-chart transforms. They do not become the path definition.

## Current Implementation Mapping

The current live bridge and native code already cover the first linear form of this contract:

| Contract field | Current evidence |
| --- | --- |
| Path identity | `pathId` in `LinearPathSegment`; `pathKey` in `PathHistoryRowF64` and `SolverPathHistoryRowF64`. |
| Time bounds | `startTime` and `endTime` in `LinearPathSegment`, `PathHistoryRowF64`, and schema `pathHistoryRowF64`. |
| Endpoint state | `positionAtStart` and `velocity` in `LinearPathSegment`; `start` and `velocity` in bridge path-history rows. |
| Numeric type | `NumericType` in native segment and stream metadata; `SolverNumericType` and `numericTypeId` in bridge declarations and schema. |
| Numeric chart and precision path | `SolverPathHistoryStreamMetadata` and schema `pathHistoryStreamMetadata` require `numericChart`, `precisionPath`, `scaleNormalization`, value authority, and claim level. |
| Interpolation law | `PathHistoryStreamOptions` and stream metadata carry `interpolationRule`; the current row layout is a linear-segment payload. |
| Error bounds | `errorBound` is present in native path rows, bridge path rows, schema rows, and stream metadata. |
| Dynamic replay attachment | `solver-path-history-dynamic-replay.v1` metadata attaches replay requests to the stream without changing the row layout. |
| Assembly membership attachment | `assembly_membership.v1` and related assembly graph row families attach by path and time interval. |
| Derived geometry attachment | path bounds, spacetime index rows, stream ranges, and broad-phase query records attach to the segment stream as acceleration or projection data. |

The implementation does not yet need to support every payload kind above. The contract requirement is that each supported payload declares its reconstruction law, numeric authority, and error bounds, and that future payloads extend the payload vocabulary rather than redefining `pathId` or segment identity.

## Validation Obligations

The design-level contract is accepted when these obligations are encoded in schema and tests:

1. A segment record with `pathId` or `pathKey`, ordered time bounds, coordinate-frame metadata, numeric type, interpolation law, endpoint state or coefficients, and nonnegative error bounds validates.
2. Unsupported interpolation laws fail closed unless the reader has a declared fallback to child authoritative segments.
3. Dynamic replay metadata may regenerate or validate path rows but cannot replace the kinematic payload in an authoritative path segment.
4. Potential audit rows, root rows, delayed-hit rows, assembly rows, and derived geometry rows join by references and cannot mutate the path segment after commit.
5. Active-window age-out keeps segments hot while any declared live root, delayed-hit, interpolation, assembly-membership, branch-transition, or validation consumer still requires them.
6. Warm or cold readback reconstructs the same path within declared error bounds using the manifest, dictionary, chunks, and stream index.
7. Deep indices and broad-phase query products are treated as acceleration metadata and fall back to authoritative segment replay when coverage is incomplete, stale, or unknown.

## Close And Remaining Status

`virtual_observer_path_record_contract` is closed at the design-capture level. This note defines the minimal segment-level kinematic path record, the required path identity, time, frame, numeric, interpolation, payload, and error-bound fields, the attachment boundary for replay/audit/assembly/geometry data, the active-window versus aged-out behavior, and the future indexing rule.

Remaining work is implementation:

1. Encode any missing logical fields from this contract into the solver schema set when schema work is reopened.
2. Add fixtures for non-linear payloads when Hermite or coefficient segments are implemented.
