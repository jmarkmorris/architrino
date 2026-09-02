# Potential App Requirements And Design

## Status

- Stage: `consumer-live-and-core-query-publication-contracts-accepted`
- Implementation: `not-started`
- Application authority: display and analysis consumer
- Forward-evolution authority: EOM solver only
- Shared interchange: [AAA Core Path Interchange v0](../app-aaa-core/path-interchange-v0.md), accepted at logical-contract and fixture-conformance grade
- Shared codec registry: [AAA Core Codec Registry v0](../app-aaa-core/codec-registry-v0.md), accepted at registry-contract and synthetic-conformance grade
- Shared query and publication: [AAA Core Query, Transform, And Publication v0](../app-aaa-core/query-transform-publication-v0.md), accepted at behavior-contract and synthetic-conformance grade
- Shared client: [AAA Core Client v0](../app-aaa-core/client-v0.md), accepted at synchronous in-process conformance grade

## Accepted Contract Baseline

The app-side [Potential consumer and publication contract v1](potential-consumer-publication-contract.v1.json) is accepted and executable. It consumes the accepted logical `aaa_core_path_interchange/v0` envelope and `aaa_core_codec_registry/v0` registry, and it binds source path-set identity, history coverage, coordinates, normalized scale map, numeric and interpolation policy, provenance, observable and kernel version, map geometry, sampling, error/display grade, output view, completeness, codec registration, and publication identity. The current Potential map codec is registered at fixture-conformance grade only; no production map or tile representation is selected.

Plainly: this closes what Potential must receive and return and maps those fields to accepted Core records and registry entries. It does not claim that a production codec, broker, cache, or catalog already exists.

The positive fixture publishes an eight-cell synthetic fixed-$T$ spatial volume while retaining only a hash-bound source-history reference. The checker also fixes the axis semantics for a two-space-plus-time volume and a full three-space-plus-time product, and it rejects missing history, incompatible scale maps or $c_f\ne1$, unsupported precision, incomplete sealed publication, unknown observable versions, geometry mismatches, source rebinding, unregistered codecs, source-history leakage, and stale identities.

Plainly: a map can be small or synthetic and still prove the bookkeeping. It cannot hide a gap, change its source, or gain solver authority merely because it was published.

The app-side [Potential live timespace pipeline contract v1](potential-live-timespace-pipeline-contract.v1.json) and its [readable state-machine and sequence specification](potential-live-timespace-pipeline-contract-v1.md) are also accepted and executable. They consume the accepted [AAA Core Accepted-History Stream v0](../app-aaa-core/accepted-history-stream-v0.md) semantics without defining the Core envelope or production transport. The synthetic fixture admits three contiguous accepted chunks, treats one exact duplicate as an idempotent no-op, enters and releases bounded backpressure, exposes two provisional snapshots, seals complete map coverage, and reproduces the same sealed product identity under duplicate-free replay.

Plainly: Potential now has a tested rulebook for keeping up with a live accepted history. Production transport and a production potential calculation are still separate unfinished dependencies.

The shared [AAA Core Query, Transform, And Publication v0](../app-aaa-core/query-transform-publication-v0.md) contract adds canonical equivalent-request and cache identities, order-sensitive transform identities, exact source closure, non-escalating authority, provisional-versus-sealed rules, and receipt-bound retrieval. Its sealed positive fixture uses Potential's registered fixture codec and is retrieved by Equation Mapping as an explicitly permitted second consumer.

Plainly: the app no longer needs private rules for deciding whether two requests are equivalent or whether another application received the exact published product. The fixture remains bookkeeping evidence, not a potential calculation.

The shared [AAA Core Client v0](../app-aaa-core/client-v0.md) drives Potential and Equation Mapping through the same validation, query, stream, publication, retrieval, progress, and failure interface. Potential-specific observable and map semantics remain in this application contract.

Plainly: the apps share a client, not scientific meaning. Potential still owns what its map represents and must pass an independent reference calculation before the first surface is accepted.

The negative suite refuses candidate EOM output, missing or broken predecessors, changed duplicates, buffer overflow, out-of-order map completion, premature sealing, source rebinding, exact producer halt, and post-seal mutation. These are software-conformance results only; they do not establish production transport performance, kernel correctness, or physical acceptance.

Plainly: every named failure stops the map rather than turning absent data into a value or a completed-looking picture.

## Product Definition

`Potential` is a standalone application for exploring and publishing a declared potential observable reconstructed from time-parameterized path histories. It must support 2D slices and 3D spatial maps at absolute time $T$, timespace maps over a declared interval, playback, and progressive map generation from an advancing EOM path-history stream.

The phrase `potential background` is visual shorthand. The display does not introduce a material field or state stored by the Euclidean void. Every displayed value must identify the path set, observable definition, source time coverage, numeric route, and display transformation that produced it.

## Responsibility Boundary

| Responsibility | Owner |
| --- | --- |
| Forward evolution and accepted retained histories | EOM solver |
| Logical path-interchange model, codec registry, and common providers | [AAA Core](../app-aaa-core/priorities.md) |
| Potential-specific published map/tile codec provider | `app-potential`, registered through the AAA Core codec contract |
| Live accepted-history transport and stream sequencing | AAA Core stream service bound to the EOM output contract |
| Potential observable definition and production sampler | A versioned scientific kernel with explicit scientific ownership; Potential is the sole shared product route that invokes the declared conversion and publishes its products |
| Slice/volume selection, timespace tiling, progressive map assembly, publication, filters, color mapping, camera, and interaction | `app-potential` |
| Experimental-record provenance and observer-to-model transforms | Import adapter plus the scientific lane that owns the comparison |

The app may request, cache, decode, filter, sample, and display. It is the sole shared route for converting selected path products through a declared potential kernel and publishing reusable potential products. Other applications request or render those products through AAA Core; they do not recreate the conversion locally. Potential may not evolve future paths, repair missing source history, infer undeclared units, or substitute a display approximation for an accepted numerical result.

## Cross-Application Potential Product Contract

An application that needs a potential background, a three-dimensional potential view, a fixed-time slice, a timespace map, or a point or region sample must request a Potential product through AAA Core. The request binds:

1. immutable input path-set, chunk, or stream identities and an optional saved Core query;
2. the versioned potential-kernel identity and its declared scientific owner;
3. the requested absolute-time point or interval, spatial domain, coordinate chart, resolution, tile or sample geometry, and representation profile;
4. numeric policy, precision requirement, permitted provisional behavior, and declared consumer purpose; and
5. requested output type: point samples, a slice, a volume, a timespace map, contribution records where supported, or a progressive stream.

AAA Core validates the source identities, coverage, authority, scale, numeric-policy and capability requirements, then routes the request to Potential's product service. Potential invokes the declared kernel, constructs the requested map or sample product, and publishes a versioned manifest through Core. The manifest binds the input and query identities, kernel and implementation version, ordered transforms, output geometry, completed and source watermarks, precision/error behavior, authority, cache identity, backend and fallback records, and the exact first failure or incomplete-coverage state.

An application may subscribe to the resulting product, query an existing product, or render a registered map, tile, volume, or sample representation in its own two- or three-dimensional interface. It may export or share that product only with its manifest and source closure intact. A consumer may request a lower-resolution progressive view while a higher-detail product is still computing, but must expose whether it is provisional, what source history has been processed, which tiles or intervals are missing, and whether it is a display-grade or analysis-grade representation.

Potential is the only shared path-to-potential conversion route. An application may hold transient graphics buffers or apply its own camera, color mapping, clipping, and interaction, but it may not calculate a competing potential from paths, relabel a cached display texture as a potential product, or turn missing source coverage into a zero-valued region. EOM continues to determine causal roots and accepted path extensions; Potential consumes the declared histories and kernel outputs required for its products.

Plainly: any application can show the same potential world in its own view, including 3D, but it gets the values from one traceable Potential product. The app changes how that product is explored, not how paths are converted into potential.

## Scale-Aware Potential Representations

A potential product over two spatial dimensions, three spatial dimensions, or space and time need not have one universal grid, tile size, sampling cadence, or encoding. Potential must support registered multiscale representations such as spatial or time pyramids, adaptive tiles, declared scale-band products, compact functional or coefficient representations, sparse features, and consumer-specific display derivatives. These are separately identified products or views bound to the same source path/query and declared potential-kernel result.

Every representation or scale transform must declare its input product, output domain and coordinate chart, spatial resolution, temporal cadence, scale-band or filtering rule, interpolation or reconstruction behavior, error or uncertainty effect, event and coverage behavior, permitted consumers, and whether it is analysis-grade or display-grade. A large-scale view may intentionally suppress finer variation; a high-detail local view may reveal variation that the coarse product does not resolve. Neither view may be presented as the other, and a color scale, camera choice, clipping rule, or visual smoothing is a display operation rather than a new potential result.

Potential should publish progressive products from coarse coverage to refined tiles or intervals when a consumer needs real-time interaction. Every stage must retain source and completion watermarks, missing-tile or missing-interval state, and a stable identity for the selected scale policy. A user must be able to recover the higher-detail product where it exists, compare scale policies, and reproduce the chosen representation from the saved manifest.

Temporal sampling and video playback are explicit consumer profiles, not implicit display behavior. A video-derived potential product must declare frame times or cadence, time-window exposure where relevant, source accepted-through and map-completed-through coverage, spatial level of detail, frame interpolation or hold rule, playback rate, and every omitted, delayed, or synthesized frame. A renderer may drop presentation frames to remain responsive, but it must not relabel that display behavior as missing physics or as a fully sampled potential sequence.

Plainly: a wide view can show the large pattern while a close, fast-time view shows finer variation. Both are useful, but the system must say exactly how each was sampled or filtered and what detail it leaves out.

A Potential-specific GPU texture or vertex layout may remain private while it is only a transient render buffer. A map or tile encoding intended for replay, publication, another process, or another application is a registered codec provider with declared precision, completeness, source binding, version, and refusal behavior.

Plainly: Potential can optimize its live graphics aggressively, but the moment an encoded product leaves the renderer it must remain understandable and checkable through the shared interchange contract.

## Required Input Capabilities

A usable input must eventually declare:

- dataset, path, chunk, and version identities;
- retained time coverage and absolute-time representation;
- positions and any derivatives required by the selected observable;
- path semantics and source authority;
- polarity or other model metadata only where the source legitimately provides it;
- coordinate frame, units, normalized scale map, and any observer-to-model transform;
- interpolant or segment representation plus a certified or measured error bound;
- numeric representation, precision route, and nonfinite behavior;
- content hashes, predecessor links where applicable, and provenance;
- spatial and temporal indices needed for bounded random access;
- optional multiresolution/display derivatives that remain linked to their authoritative source.
- for live input, monotonically identifiable accepted chunks, accepted-through time, predecessor or sequence identity, and explicit completion or halt state.

## Representation Profiles

One path model should permit several explicitly graded encodings rather than one universal compressed file.

1. **Authoritative history profile:** lossless or certification-preserving coefficients, numeric metadata, error enclosures, hashes, and continuation-critical history.
2. **Precision-bounded analysis profile:** adaptive segments whose approximation error is bounded against a declared observable and scale envelope.
3. **Display-stream profile:** multiresolution, GPU-ready data optimized for live latency and visual fidelity; never a source for solver continuation or stronger scientific claims.

Compression is accepted only relative to a declared purpose. The relevant scorecard includes reconstruction error, observable error, retained branch/event fidelity, bytes per path-time interval, decode throughput, random-access latency, GPU upload cost, and transcode cost.

## Scale And Precision

The path layer must span many decades without relying on one global floating-point origin. Candidate mechanisms include epoch-plus-offset time, per-chunk spatial origins and scales, adaptive time segmentation, coefficient-based curves, precision escalation, and error-bounded level of detail. These are design candidates until benchmarked against representative path families.

Every new numerical fixture uses $c_f=1$. Cross-scale comparison must preserve the explicit scale map rather than baking display units into source coordinates.

## Potential Query

A potential request should declare at least:

- source path-set identity and accepted manifest version;
- absolute time or time interval;
- 2D plane, 3D region, or explicit sample coordinates;
- observable and kernel version;
- source-selection filter;
- required accuracy or display-grade budget;
- spatial and temporal resolution policy;
- singular, unresolved, and insufficient-history behavior;
- output representation and latency posture.

The response must preserve unavailable and unresolved regions. Clipping, smoothing, denoising, interpolation, and color normalization are view operations and must remain inspectable.

## Timespace Map Products

Every map product must declare its axes rather than relying on the phrase `3D map`:

1. **Spatial volume:** $(X^1,X^2,X^3)$ over a declared region at fixed absolute time $T$.
2. **Timespace volume:** $(u,v,T)$, where $u$ and $v$ are declared spatial coordinates or chart axes and $T$ spans a declared interval.
3. **Full timespace product:** $(X^1,X^2,X^3,T)$ stored and exchanged as indexed tiles or chunks, then interrogated through spatial volumes, timespace volumes, slices, paths, isosurfaces, or summaries.

A publishable map manifest must bind the source path manifest and accepted-through time; observable and kernel versions; axis definitions; spatial domain and time interval; sample or tile layout; filters and shaping pipeline; precision and error/display grade; unavailable and unresolved coverage; completeness state; content hashes; and publication identity. Publication may expose a provisional live snapshot, but only complete declared coverage may be sealed as a completed map product.

The sealed or provisional map is itself a derived interchange product. Another application may consume it to avoid repeating the same potential sampling, provided it preserves the map manifest, source-path binding, completeness, and authority. The map does not replace the source histories and cannot serve as solver continuation input.

## Live EOM Stream

The live pipeline is

$$
\text{accepted EOM history chunks}
\longrightarrow
\text{validated path decoding}
\longrightarrow
\text{potential sampling}
\longrightarrow
\text{map-tile updates}
\longrightarrow
\text{display and publication}.
$$

Plainly: the app reads only solver history that has passed the solver's acceptance boundary, computes the requested potential samples, updates the affected map tiles, and then makes the current map available for viewing or exchange.

Only accepted EOM chunks advance the authoritative live watermark. Candidate steps may appear in an explicitly transient debugging view, but they cannot enter a sealed map product. Every live state reports at least source accepted-through time, app consumed-through time, map completed-through time, incomplete spatial tiles, queue depth or backpressure, and the exact first failure or halt.

The same accepted chunk sequence must support deterministic offline replay into the same map product within the declared numeric and rendering budgets. Duplicate chunks are idempotent, missing predecessors halt dependent map advancement, and late chunks fill declared gaps rather than silently changing earlier sealed output.

## Filters And Shaping

Filters answer the application question, “Which part of the signal matters here?” They should be immutable query manifests that reference source data rather than rewriting it. Candidate filters include path identity or group, time window, spatial region, provenance, polarity, scale band, contribution magnitude, uncertainty, source class, and observer-level experimental selection.

Shaping operations may produce a derived dataset for an experiment, but the derivation must retain its input identities, ordered transform pipeline, parameters, hashes, and authority downgrade where applicable.

## GPU Posture

Large batches of independent path/sample evaluations and map tiles are strong accelerator candidates, especially for real-time spatial and timespace-map updates. That observation does not yet select a GPU architecture or prove an end-to-end speedup. Causal-history lookup, branch irregularity, adaptive precision, divergent filters, decoding, transfer, publication, and deterministic reduction may dominate particular workloads.

The intended design therefore separates:

1. GPU-ready regular bulk queues;
2. compacted difficult rows returned to stricter GPU or CPU paths;
3. deterministic or bounded reductions;
4. a correctness-first reference surface;
5. measured end-to-end profiles rather than kernel-only throughput claims.

## Experimental And Reaction Use

The interchange should admit observer-level reconstructed collider tracks and other experimental path records through explicit import profiles. Such records may drive comparison, filtering, detector overlays, or fitted effective models. They do not become substrate histories without a separately defined and validated mapping.

A reaction workspace can combine an initial history, an EOM-produced evolution, selected potential queries, event or interaction ledgers, experimental comparison records, and derived visual views. Each object remains separately versioned so that visual agreement cannot be mistaken for dynamical or experimental validation.

## Open Decisions

1. Ratification of the concrete `aaa_core_codec_registry/v0` provider and codec-family boundary against accepted `aaa_core_path_interchange/v0` records.
2. Home of shared path libraries, Core codec providers, and the Potential-owned registered map/tile provider.
3. Ownership of production potential-query kernels within the AAA Core kernel-registry boundary.
4. Initial app deployment target and GPU API.
5. First analytical reference case and representative performance workload.
6. The first bounded spatial volume, timespace volume, and full-timespace publication workloads.
7. Live latency, accepted-through lag, map-resolution, and publication-throughput targets.
