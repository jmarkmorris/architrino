# Potential App Requirements And Design

## Status

- Stage: `initial-priority-design`
- Implementation: `not-started`
- Application authority: display and analysis consumer
- Forward-evolution authority: EOM solver only
- Shared interchange: [AAA Core architecture v0](../app-aaa-core/architecture-v0.md), proposed and awaiting verification

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
| Potential observable definition and production sampler | Shared analytical capability with explicit scientific ownership; exact location pending |
| Slice/volume selection, timespace tiling, progressive map assembly, publication, filters, color mapping, camera, and interaction | `app-potential` |
| Experimental-record provenance and observer-to-model transforms | Import adapter plus the scientific lane that owns the comparison |

The app may request, cache, decode, filter, sample, and display. It may not evolve future paths, repair missing source history, infer undeclared units, or substitute a display approximation for an accepted numerical result.

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

1. Ratification of `aaa_core_path_interchange/v0` and its concrete codec-family boundary.
2. Home of shared path libraries, Core codec providers, and the Potential-owned registered map/tile provider.
3. Ownership of production potential-query kernels within the AAA Core kernel-registry boundary.
4. Initial app deployment target and GPU API.
5. First analytical reference case and representative performance workload.
6. The first bounded spatial volume, timespace volume, and full-timespace publication workloads.
7. Live latency, accepted-through lag, map-resolution, and publication-throughput targets.
