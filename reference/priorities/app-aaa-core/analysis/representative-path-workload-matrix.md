# Representative Path Workload Matrix

## Status and Authority

- **Work item:** `CORE-002 representative_path_workload_matrix`
- **Contract:** [`aaa_core_representative_path_workload_matrix/v1`](../contracts/aaa-core-representative-path-workload-matrix.v1.json)
- **Status:** Accepted benchmark definition; all executions remain `unmeasured`.
- **Authority:** AAA Core workload and measurement contract only.

This matrix fixes five path-data workloads for comparing representations and deployment postures. It does not select a codec, transport, service boundary, accelerator, or storage system. It grants no EOM, scientific-kernel, imported-data, or publication authority. Every native numerical workload uses normalized wake-speed units with $c_f=1$; the collider import preserves source-native observer units and treats any normalized model-coordinate form as a separate derived product.

Plainly: The matrix defines the same jobs that every candidate implementation must run. It reports no winner because none of those jobs has been measured yet.

## Common Measurement Rule

Correctness is a hard gate. A candidate that fails source coverage, discrete identity, independent-reference, provenance, uncertainty, or authority checks is rejected for that workload before resource results are compared. Deterministic replay against the candidate's own output proves replay only; it does not replace the independently authored oracle or analytical case named by each workload.

All runs record wall time, throughput, latency distribution, CPU time, peak resident memory, peak device memory where applicable, bytes read and written, host-device and network transfer, sealed and working storage, fallback/escalation rate, failure counts, and energy or dollar cost when the instrument can measure them. Missing measurements are `null` with a reason, never zero. Proxy quantities such as path count or encoded size are workload dimensions, not cost evidence.

Plainly: A fast run is irrelevant if it drops a root, event, uncertainty, or source interval. Resource claims must come from instruments, and unavailable measurements must remain visibly unavailable.

## Fixed Workloads

| ID | Consumer and workload | Frozen dimensions | Access and observable | Correctness gate | Initial posture |
| --- | --- | --- | --- | --- | --- |
| `eom_continuation_6p_long_history_v1` | EOM continuation from an accepted six-path history | 6 paths; $2^{18}$ retained samples per path; $10^4$ declared scale span; piecewise-smooth history with 24 frozen branch/event markers; adaptive 128-bit ceiling; $c_f=1$ | Sequential append plus pairwise causal lookback and event-neighborhood random access; accepted history, root/event identity, and continuation state | Complete input coverage; zero branch/event identity mismatches against a separately authored analytical or certified root oracle; state enclosure inside frozen tolerances; exact halt propagation | CPU reference required; bounded-thread CPU candidate; accelerator only with difficult-row return and identical discrete obligations |
| `potential_live_map_64p_v1` | Potential live map from an accepted path stream | 64 paths; $2^{14}$ samples per path; 64 chunks; $128\times128\times64$ timespace cells; $10^3$ scale span; 64-bit sampling; $c_f=1$ | Sequential stream intake, time-window replay, and tile random access; provisional and sealed source-bound map | No chunk or tile gaps; source and product watermarks close; max absolute/relative sample residual passes against a separately authored analytical sampler; replay seals to identical identity | Single-thread CPU reference, bounded-thread CPU, and GPU tile candidate measured separately |
| `reaction_keyhole_12p_v1` | Local reaction study around one bounded event | 12 paths; $2^{16}$ samples per path; $10^5$ scale span; 8 event markers across 5 account channels; 128-bit event neighborhood; $c_f=1$ | Dense random access around the event plus predecessor/successor history; products and $E,\mathbf p,\mathbf J$ event ledger | Zero missing identities or event owners; complete pre/post coverage; ledger residual within frozen tolerance; independent product and event-order reconstruction agrees | CPU reference required; hybrid bulk-history plus strict event-neighborhood candidate allowed |
| `optimization_sweep_1024x6p_v1` | No-retune parameter sweep over candidate six-path histories | 1,024 candidates; 6 paths each; $2^{12}$ samples per path; $10^4$ scale span; 32 frozen invalid/event cases; 64-bit screen with 128-bit escalation; $c_f=1$ | Batch sequential scans, sparse candidate/event retrieval, and held-out objective evaluation; admissible set and selected candidate identity | All frozen invalid cases rejected; no accepted candidate loses source coverage; held-out objective residual passes a separately authored evaluator; selected identity and tie handling reproduce under deterministic replay | Single-thread CPU reference, bounded-thread CPU, and staged accelerator screening with explicit escalation queue |
| `collider_import_100k_tracks_v1` | Observer-level reconstructed collider-track import | 100,000 tracks; up to 512 source samples per track; source-native coordinate, covariance, time, calibration, selection, and reconstruction payloads; no native $c_f$ instantiation | Column and event random access, source-native round trip, and separately identified coordinate transform; imported track collection and derived comparison view | Source-native payload hashes and uncertainties preserved; provenance and selection coverage complete; transform residual passes a separately specified independent transform oracle; authority remains observer-level | CPU import/reference required; vector or accelerator decode candidate permitted only behind the same source-preservation gate |

Plainly: The five cases stress different things: long causal history, live map delivery, a dense event window, many repeated candidates, and a large experimental import. One small synthetic stream cannot stand in for all five.

## Dimension and Result Schema

Every workload manifest records path count, history depth, time and spatial scale span, smoothness class, event density, root or branch difficulty where applicable, random-access pattern, consumer observable, latency class, numeric precision, storage posture, accelerator posture, source authority, and coverage. A result record binds those dimensions to the candidate implementation, version, host, input hashes, independent reference, measurement instruments, and exact completion or failure state.

The machine-readable matrix requires these correctness metric families:

1. source and interval coverage;
2. discrete path, branch, event, and owner identity;
3. continuous residual or enclosure against an independent reference;
4. provenance, uncertainty, and authority preservation;
5. deterministic replay as a separate reproducibility metric;
6. consumer-specific completion, halt, or publication behavior.

Plainly: Every result must say what data it received, whether it preserved the important discrete decisions, how close its numbers were to an independent check, and whether its consumer actually finished correctly.

## Comparison and Refusal Rules

A codec or deployment candidate may claim coverage only for workloads it ran from the exact versioned input. Cross-workload aggregation must preserve each hard correctness verdict and may not average a failure away. No composite score is defined. Resource values may be compared only after the correctness gate passes and must retain host, warm/cold state, concurrency, cache, and measurement-instrument context.

A run refuses or returns `not_comparable` when the input version differs, required source coverage is absent, the independent reference is unavailable, precision is unsupported, an instrument cannot distinguish missing from zero, or the candidate changes the logical workload. Lower-resolution display or provisional products may be measured as separate derived variants but cannot replace the authoritative workload.

Plainly: Candidates run the same job or they are not being compared. A quicker result obtained by dropping required data is a different product, not a faster implementation of this workload.

## Completion Boundary

CORE-002 is complete because the matrix contains the five required consumers with fixed workload dimensions, correctness metrics, resource metrics, independent-reference obligations, native-unit policy, accelerator posture, and refusal behavior in human- and machine-readable form. The matrix remains unexecuted. Codec selection, stream deployment, performance claims, resource targets, and operating decisions remain open and require measured result records.

Closure goal: run each candidate path representation on the same five source-bound workloads, reject correctness failures first, and base every resource or deployment decision on measured end-to-end evidence.
