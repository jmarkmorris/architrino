# EOM Performance Architecture Survey And Baseline

## Status

- Baseline id: `eom_performance_architecture_baseline/v0`
- Stage: `measured-local-reference-baseline`
- Date: `2026-07-13`
- Host: Apple M3, 8 CPU cores, 10 GPU cores, 24 GiB unified memory
- Evidence record: [performance-architecture-baseline-apple-m3-2026-07-13.json](evidence/performance-architecture-baseline-apple-m3-2026-07-13.json)
- Evidence digest: `06562cccf4b280a3aab481bae3fd54c31c88bba82da71aac2a59b4d7e6fdff8c`
- Authority: `reference-benchmark-only`
- Production language decision: C++20 selected by operator; production authority remains gated
- Native block/root layer: moving-history block enclosure and exact-pair batch implemented
- Native acceleration layer: certified sharp rows and deterministic complete receiver reduction implemented
- Native coupled evolution: sharp cubic correction, step doubling, and atomic in-memory publication implemented
- Production distributed block-exclusion engine: not started

## Outcome

The first executable architecture survey established the scale separation that
the production design must cross. The correctness-first 90-decimal-digit oracle
certified about `10.97` simple stationary ordered pairs per second. In contrast,
bulk binary floating-point classification reached hundreds of millions to
billions of rows per second. A million-path engine therefore cannot be a faster
loop around the independent pair oracle. It requires certified block exclusion,
batched exact fallback, local precision escalation, deterministic reduction,
and streamed retained-history storage as separate execution classes.

The local million-path stationary sparse control traversed the complete
$10^{12}$ logical ordered-pair domain through block membership, excluded
`999,992,340,032` pairs, and promoted `7,659,968` pairs to exact fallback. This
is an algorithmic control over stationary one-dimensional histories, not a
general moving-history million-path result and not EOM evolution. The later
native packet certifies general moving piecewise-cubic blocks and exact pair
roots on bounded parity controls, but it has not rerun the million-path ladder
with those general histories. The dense million-path
projection requires at least `64 TB` merely to materialize one assumed
64-byte row per ordered pair, so it correctly returns
`resource_envelope_exceeded` on this host before any candidate evolution.

## Executed Packet

The versioned composition driver is
[`scripts/eom/performance/architecture_baseline.py`](../../../scripts/eom/performance/architecture_baseline.py).
The scale model and local backend probes are separated into
[`baseline_model.py`](../../../scripts/eom/performance/baseline_model.py) and
[`local_benchmarks.py`](../../../scripts/eom/performance/local_benchmarks.py).
It executes and records:

1. exhaustive nested parity controls for the stationary block-exclusion
   prototype;
2. the independent 90-digit decimal-interval root-completeness cost;
3. NumPy binary64 classification, interpolation, and reduction baselines;
4. C++20 scalar and compiler-auto-vector candidates;
5. C++20 thread scaling and the $10^4$, $10^5$, $10^6$ sparse population
   ladder;
6. a Metal binary32 bulk-bound kernel and unified-memory blit measurement;
7. local immutable-chunk write, `fsync`, read, and SHA-256 throughput;
8. dense pair-row, hot-history, output-row, and optimistic wall-time
   projections.

The C++ source is
[`native_kernel_baseline.cpp`](../../../scripts/eom/performance/native_kernel_baseline.cpp),
and the Metal probe is
[`metal_bound_baseline.swift`](../../../scripts/eom/performance/metal_bound_baseline.swift).
Both identify themselves as reference-only benchmarks and implement no EOM
acceleration or history evolution.

## Correctness Controls

The stationary control places retained paths on one spatial line, fixes
$c_f=1$, and searches an emission-delay interval of $[0,1]$. A receiver-source
block is excluded only when an outward-rounded lower separation exceeds the
outward-rounded maximum causal reach. Inconclusive blocks subdivide to an
eight-by-eight leaf and every leaf member enters exact point classification.

| Population | Spacing | Logical pairs | Excluded | Exact fallback | Active pairs | Exhaustive parity |
| ---: | ---: | ---: | ---: | ---: | ---: | --- |
| 256 | 2.00 | 65,536 | 63,488 | 2,048 | 0 | pass |
| 256 | 0.25 | 65,536 | 59,520 | 6,016 | 2,028 | pass |

Both controls have complete disjoint coverage: excluded plus exact fallback
equals all $N^2$ ordered pairs, including all self-pairs. The active pair count
inside exact fallback agrees with exhaustive enumeration. The control does not
cover moving polynomial histories, history reconstruction error, multiple
roots, folds, receiver-normal evaluation, or precision escalation; those are
covered separately by the next bounded native packet rather than by this
stationary population control.

## Native Moving-History And Exact-Pair Packet

The next executable layer lives under
[`src/eom`](../../../src/eom/README.md). It implements the versioned
`eom_moving_history_block_certificate/v0` and
`eom_native_exact_pair_certificate/v0` schemas in C++20. Regular rows use
outward binary64 intervals. Rows whose tolerance or geometry cannot be
certified there replay locally with MPFR/GMP directed intervals through a
caller-bounded precision ladder.

The independent packet covers moving receiver histories, moving source
histories, root-free pairs, one and two simple roots, difficult close roots,
piecewise-segment boundary identity, retained-memory boundary contact,
sub-field-speed self-endpoint exclusion, exact-field-speed rail degeneracy,
and a tangent caustic. The native four-thread batch preserves input order. Six
Python tests reproduce block signs and root counts, brackets, orientations,
special-route status, and deterministic replay against the independently
authored 90-decimal-digit oracle.

The difficult close-root row bypasses binary64 automatically at a requested
`1e-16` root tolerance and certifies two distinct roots at 128 MPFR bits. The
tangent and exact-field-speed rail rows remain fail-closed after the declared
512-bit ceiling and return `caustic_route_required`; they do not publish a
false complete root set. Evidence is recorded in
[eom-native-history-layer-apple-m3-2026-07-13.json](evidence/eom-native-history-layer-apple-m3-2026-07-13.json).

This packet proves the local certificate and exact-pair execution classes, not
the production million-path traversal. Its root certificates now feed the
separate native acceleration packet below. Coupled accepted-step evolution,
GPU difficult-row return, distributed retained-history ownership, and streamed
checkpoints remain open.

## Native Certified Acceleration And Receiver Reduction Packet

The C++20 layer now implements
`eom_native_pair_acceleration_certificate/v0` and
`eom_native_acceleration_reconstruction_certificate/v0`. The sharp route
accepts only a complete, non-memory-boundary exact-pair certificate whose
searched domain reaches the reception time. For each admitted root it
re-evaluates retained-history position and velocity, intersects the resulting
source and receiver normals with the root certificate, certifies the source
normal away from zero, and emits the bound Master EOM interval-vector
contribution. Root/history identity is bound by both the history identifier and
a fingerprint of the exact segment tokens. Tangent, memory-boundary,
provenance-mismatch, tampered-normal, and excessive-width controls fail without
a total acceleration.

Complete reconstruction requires exactly $N^2$ ordered receiver-source
requests, including self-pairs. Pair work may run on bounded native threads,
but results are placed in canonical receiver-major/source-minor order and
reduced by `fixed_pairwise_interval_tree_v0`. A deliberately shuffled binary
matrix produced byte-identical receiver totals with one and four threads. The
matrix accounts for all four ordered pairs: inactive coincident self-endpoints
remain explicit zero rows rather than being deleted.

The nine native acceleration tests reproduce sharp results with the
90-decimal-digit oracle for stationary, exact-field-speed receiver,
super-field-speed receiver, and two-root histories, then verify self-pair
accounting, negative certification controls, complete binary receiver totals,
and deterministic replay. Evidence is recorded in
[eom-native-acceleration-layer-apple-m3-2026-07-13.json](evidence/eom-native-acceleration-layer-apple-m3-2026-07-13.json).

This is a correctness packet, not a throughput claim. Native acceleration now
includes the bound finite-width causal-surface integral, a tangent recovery
control, and caller-bounded MPFR directed-interval replay for difficult
finite-width rows. Binary64 finite-width integration budgets uncertainty on
the globally summed interval integral, refines the active time cell with the
largest enclosure-width contribution, and checks the deterministic reduction
at a population-proportional cadence. This preserves the caller's global
tolerance and fail-closed resource caps without uniform over-refinement or
quadratic repeated summation. Sharp-row and receiver-reduction MPFR replay
remain open.

## Native Coupled Retained-History Evolution Packet

The C++20 layer now implements
`eom_native_acceleration_snapshot_certificate/v0`,
`eom_native_corrected_substep_certificate/v0`,
`eom_native_atomic_coupled_step_certificate/v0`, and
`eom_native_coupled_evolution_certificate/v0`. Every corrected substep begins
from one immutable accepted-history vector, computes simultaneous cubic
segments for all paths, and evaluates complete root and acceleration snapshots
at both endpoints. Predictor and correction histories remain local candidates.

An attempted atomic step evaluates one full corrected step and two corrected
half-steps. Endpoint position and velocity disagreement is operational: a row
outside the declared tolerance rejects the entire coupled candidate. Accepted
fine segments are inflated by the measured discrepancy, then root and
acceleration certification is rerun on the exact history vector to be
published. Root-count or source-normal-sign changes under the sharp-only policy
return `root_event_requires_subdivision`. Under a finite-width policy, every
changed ordered pair must carry a certified joint reception/emission impulse
whose enclosure overlaps the candidate segment's endpoint-acceleration
impulse. A rejection publishes copies of the input histories with identical
provenance fingerprints; an acceptance publishes all paths together.

The fixture contains four completed evolutions: multistep static self-history,
unclamped super-field-speed inertial self-history, a coupled two-path binary,
and an adaptive binary that rejects twice before completing four smaller
steps. Direct controls cover error-budget rejection, retained-memory contact,
correction exhaustion, sharp branch-event subdivision, finite-width event
acceptance, and event-resource exhaustion. All sixteen accepted or rejected
attempt records are atomic. Seven Python tests compare endpoint evolution and
finite event impulse to the independent 80-decimal-digit oracle, verify
complete $N^2$ acceleration snapshots, confirm unchanged rejection
publication, and require byte-identical one-thread/four-thread replay.
Evidence is recorded in
[eom-native-coupled-evolution-layer-apple-m3-2026-07-13.json](evidence/eom-native-coupled-evolution-layer-apple-m3-2026-07-13.json).

The finite-width packet adds
`eom_native_fold_caustic_impulse_certificate/v0`, binary64 outward joint
quadrature over the causal triangular domain, MPFR finite-width acceleration
replay, independent-oracle overlap, atomic event-resource rejection, and
byte-identical one-thread/four-thread accepted-event replay. Evidence is
recorded in
[eom-native-finite-width-event-layer-apple-m3-2026-07-13.json](evidence/eom-native-finite-width-event-layer-apple-m3-2026-07-13.json).

The MPFR and regulator-convergence packet extends that same event equation,
not a substitute model. Its difficult-row route recomputes history
interpolation, the receiver-normal magnitude, causal residual, Gaussian
surface, core kernel, triangular-domain area, and deterministic quadrature in
directed MPFR intervals. The acceptance layer independently refines causal
width and core scale through three declared levels and fails unless the
worst-case component separation between every pair of interval enclosures is
inside the declared convergence tolerance. The coupled accepted-event fixture
now carries two regulator-convergence certificates; cell exhaustion rejects
atomically. Evidence is recorded in
[eom-native-mpfr-regulator-convergence-layer-apple-m3-2026-07-13.json](evidence/eom-native-mpfr-regulator-convergence-layer-apple-m3-2026-07-13.json).

This layer is still correctness-first architecture evidence. It copies history
vectors during correction, uses binary64 local-time controller values, and
publishes atomically only at the in-memory API boundary. It is not yet the
high-throughput production integrator, durable transaction/checkpoint layer,
MPFR sharp-row/reduction replay, split-time representation, or many-orders
multirate scheduler. The finite ladder certifies the declared regulator
envelope; it does not prove an analytic sharp limit.

## Native Traversal, Checkpoint, And Borg Shadow Measurement

The next C++ packet adds hierarchical moving-history traversal, disjoint
compact pair coverage, bounded exact fallback, and single-host atomic
checkpoint/restart. These components pass their focused controls but are not
yet connected: coupled acceleration snapshots still use exhaustive $N^2$
pair reconstruction.

The first native Borg shadow measurement imported all 16 continuous histories
and evolved `[300,300.01]`. Supplying the full `[0,300]` history exceeded a
180-second process budget. A cube-geometry causal bound reduced retained depth
to `60.6217782649107`; the accepted coarse-tolerance shadow step then took
`48.360968208` seconds. Tighter requests failed atomically, ultimately
isolating ordered pair `1015<-1010` as unresolved at root tolerance `1e-4`.

This measurement establishes a working end-to-end route and a concrete
performance/numeric blocker. It does not pass convergence, interactive
latency, production ABI, or migration gates. Detailed attempts and authority
limits are recorded in
`eom-native-traversal-checkpoint-borg-shadow-apple-m3-2026-07-13.json`. (Evidence withdrawn 2026-07-16: its retained-history baseline did not meet the current EOM provenance requirement; the refinement ladder now seeds app-authored certified inertial history, re-measurement queued.)

## Measured Local Results

Rates below are medians for the recorded run. They compare architecture costs,
not equivalent mathematical operations.

| Path | Numeric format | Measured operation | Rate | Authority limit |
| --- | --- | --- | ---: | --- |
| Independent oracle | 90-digit decimal intervals | Complete one-root pair certification | 10.97 pairs/s | Correctness reference, not production throughput |
| NumPy | binary64 | Bulk distance classification | 1.03 billion rows/s | Prototype vector path only |
| C++20 scalar candidate | binary64 | Bulk distance classification | 3.53 billion rows/s | No retained-history root solve |
| C++20 auto-vector candidate | binary64 | Bulk distance classification | 4.15 billion rows/s | SIMD use not instruction-counter certified |
| C++20 auto-vector candidate | binary64 | Cubic Horner interpolation | 5.06 billion rows/s | No interval or reconstruction-error propagation |
| C++20 fixed tree | binary64 | Deterministic pairwise reduction | 3.33 billion values/s | One synthetic reduction shape |
| Metal, Apple M3 | binary32 | Bulk distance classification | 5.29 billion rows/s wall; 6.97 billion rows/s device | Binary32 throughput only; no root or EOM authority |
| Metal blit | bytes | Shared/private/shared copy | 35.73 GB/s wall | Unified-memory local transfer only |
| Local storage | bytes | Write plus `fsync` | 4.58 GB/s | Temporary local storage only |
| Local storage | bytes | Read plus SHA-256 | 2.05 GB/s | No distributed fetch or manifest reconstruction |

Across five outer process trials, with seven internal timings per process, the
auto-vector candidate was `1.173x` faster than the vector-disabled
classification build and `1.424x` faster on interpolation. This is a useful
candidate gain, but it does not prove which SIMD instructions executed. The
later native representative kernel must use compiler reports or hardware
counters and a less trivial history/root workload before SIMD is credited.

### CPU Thread Scaling

The million-path stationary sparse traversal includes worker creation and uses
deterministic receiver-range ownership.

| Threads | Speedup over one thread |
| ---: | ---: |
| 1 | 1.00x |
| 2 | 1.96x |
| 4 | 3.72x |
| 8 | 4.67x |

The eight-thread result confirms useful parallel work but not linear scaling.
The next native packet must separate worker startup, traversal, exact fallback,
memory bandwidth, and load imbalance rather than treating this synthetic
speedup as the production thread envelope.

### Sparse Population Ladder

| Population | Logical pairs | Visited block nodes | Excluded pairs | Exact fallback | Exclusion ratio |
| ---: | ---: | ---: | ---: | ---: | ---: |
| $10^4$ | $10^8$ | 12,296 | 99,950,960 | 49,040 | 99.950960% |
| $10^5$ | $10^{10}$ | 98,312 | 9,999,388,128 | 611,872 | 99.99388128% |
| $10^6$ | $10^{12}$ | 786,440 | 999,992,340,032 | 7,659,968 | 99.9992340032% |

The $10^4$ active-local control at spacing `0.25` excluded `99,853,400` of
$10^8$ pairs, promoted `146,600`, and found `79,980` active stationary roots.
This confirms that the ledger distinguishes exclusion, exact fallback, and
active roots. It does not measure general active-root density or branch
divergence.

## Dense And Storage Projections

The projection assumes a minimal 64-byte materialized pair row, a 320-byte
retained-history segment, a 19.33 GB benchmark memory budget, and a one-hour
wall budget. Its wall time uses the fastest measured bulk classifier and is an
optimistic lower bound that omits history search, root refinement, precision
escalation, force evaluation, reduction, integration, and output.

| Population | Logical pairs | Minimal dense pair rows | Hot history, $H=32$ | Hot history, $H=128$ | Decision |
| ---: | ---: | ---: | ---: | ---: | --- |
| $10^4$ | $10^8$ | 6.4 GB | 102.4 MB | 409.6 MB | within projection only |
| $10^5$ | $10^{10}$ | 640 GB | 1.024 GB | 4.096 GB | `resource_envelope_exceeded` |
| $10^6$ | $10^{12}$ | 64 TB | 10.24 GB | 40.96 GB | `resource_envelope_exceeded` |

One 320-byte output segment for $10^6$ paths is 320 MB. Even when the hot
history fits, output, checkpoints, ledgers, indices, exact fallback, and
precision-escalation buffers cannot be treated as one inline response. The
content-addressed streamed-manifest design remains mandatory.

## Borg Production-Readiness Control

The 2026-07-13 Borg control connected the moving-history traversal to coupled
acceleration snapshots, reused one persistent native worker for four atomic
requests, and exposed population, requested-duration, Stop, Restart, and
progress controls in the Borg shadow surface. A strict one-path refinement
ladder over `0.01` accepted time used steps `0.01`, `0.005`, and `0.0025` at
root tolerance `1e-8`. Its maximum endpoint state delta was about `2.84e-14`,
and the one-thread and four-thread `0.0025` histories were byte identical.

This control is not the Borg acceptance gate. It covers one of sixteen Borg
histories, and its input history did not meet the current EOM provenance
requirement (Evidence withdrawn 2026-07-16; re-measurement queued). The
follow-up 16-history attempt failed closed for steps `0.01`, `0.005`, and
`0.0025`: all 240 off-diagonal ordered pairs reached
`numeric_precision_limit_exhausted` on every row. The four-thread `0.0025`
attempt reduced wall time from about `54.0` seconds to `21.7` seconds but did
not change the certified outcome.
Traversal exclusions are also expanded into zero-root rows for the current
deterministic receiver reducer, so the control does not demonstrate compressed
million-path reduction. Full-population precision closure, native history
ownership, representative accepted-step throughput, accelerator difficult-row
return, and distributed-history execution remain required. Evidence:
`eom-borg-ui-persistent-traversal-refinement-apple-m3-2026-07-13.json`. (Evidence withdrawn 2026-07-16: its retained-history baseline did not meet the current EOM provenance requirement; the refinement ladder now seeds app-authored certified inertial history, re-measurement queued.)

The 2026-07-15 control uses the
accepted exact inertial $C^1$ seed. On this input, the strict 16-path ladder
completed at the same three steps with zero root failures, a maximum state
difference of about `5.68e-14`, and byte-identical one-thread/four-thread
output. The former precision failure therefore does not reproduce at the seed
cut. A later continuation exposed a misclassified retained-history-boundary
failure at `[0.06,0.07]`; the engine now preserves its upstream failure code.
This remains solver diagnostic evidence, while Borg promotion uses the
accepted-initial-history refinement and thread-determinism gate.

## Exact-V5 Pinned-Fold Benchmark

The analytic pinned-fold route certifies the same Gaussian finite-width
master-equation integral; it does not replace the fold by a sharp root or an
impulse. Eligibility requires a self-pair, a factory-certified circular
prefix, and equality of the certified tangential speed with $c_f$. On each
eligible time cell, Taylor's theorem encloses the causal residual through
second order, preserving the cancellation at the fold, and the vector
integral uses

$$
\int_I A(\tau)\,d\tau
=|I|A(m_I)+R_I,
\qquad
|R_I|\le \sup_{\tau\in I}|A'(\tau)|\frac{|I|^2}{4}.
$$

A synthetic exact fold at $(T,\tau_c)=(0.0024,-0.04)$ is enclosed component by
component by an independent 90-digit quadrature. It requires 563 analytic
cells versus 21,337 on the unchanged legacy route, a $37.9\times$ reduction.
On the exact-V5 first fold-crossing step, the maximum pair cost falls from
193,338 to 1,928 cells, a $100.3\times$ reduction. The full atomic step falls
from 35.72 s to 28.50 s, only a $1.25\times$ wall-time improvement because
exact-root work and coupled correction now dominate.

The analytic integral alone did not remove the §86 feasibility wall. The
legacy full-step/two-half-step estimator sampled the sharp-chart acceleration
at the exact onset while every positive reception time used the finite-width
fold chart. Its velocity error therefore scaled as first order under step
halving, with observed orders $0.991$, $0.996$, and $0.998$. Evidence:
[eom-analytic-pinned-fold-apple-m3-2026-07-14.json](evidence/eom-analytic-pinned-fold-apple-m3-2026-07-14.json).

The pinned-fold-aware temporal step removes that measure-zero endpoint from
the positive-duration acceleration integral. Eligibility is provenance-bound
to the exact circular $v=c_f$ self endpoint, complete root-free open search,
coincident-endpoint exclusion, clear memory boundary, sharp start chart, and
enabled analytic fold route. It applies an implicit right-endpoint
acceleration only to eligible paths; arbitrary histories and all later steps
retain the normal cubic corrector. The master equation, root topology, atomic
publication, and tolerances are unchanged.

Across $\Delta t=10^{-3}$ through $6.25\times10^{-5}$, the corrected velocity
error approaches second order with observed orders $1.29$, $1.63$, $1.79$,
and $1.89$; position error approaches third order. The exact V5 onset accepts
$5\times10^{-4}$, $26.5\times$ the former accepted step. After onset the
controller accepts $10^{-3}$ with velocity error $2.71\times10^{-7}$ and zero
uncertified roots. The dominant collapse was therefore an estimator artifact,
not genuine stiffness at the former $1.89\times10^{-5}$ scale.

The §86 ladder is still not practical. The measured post-onset cost is about
43.7 s per accepted step, dominated by exact-root and coupled-correction
snapshots. Holding the demonstrated $10^{-3}$ step gives about 6,032 steps or
3.05 days per braid cycle, before the convergence and perturbation ladders.
Evidence:
[eom-pinned-fold-temporal-step-apple-m3-2026-07-14.json](evidence/eom-pinned-fold-temporal-step-apple-m3-2026-07-14.json).

## Architecture Survey Disposition

| Candidate | Current evidence | Disposition |
| --- | --- | --- |
| C++ native host | Measured scalar, auto-vector, fixed-tree, thread, population, general moving-history, exact-root, MPFR-root, sharp-acceleration, complete receiver reduction, cubic correction, and atomic step controls | Selected by operator; continue toward representative production evidence |
| Metal accelerator | Measured binary32 bulk-bound and blit throughput on one M3 GPU | Continue as a bulk-bound candidate; difficult rows must return to a certified stricter path |
| Python/NumPy | Measured harness and binary64 prototype; independent arbitrary-precision oracle exists | Retain for oracle, experiment, and benchmark orchestration; not a production-kernel selection |
| Other native hosts | No representative local packet | Optional risk comparison, no longer a C++ selection prerequisite |
| Multi-GPU | One local Metal device | Unmeasured |
| Distributed receiver ownership/history | No distributed test envelope | Unmeasured |

C++20 is the selected host, but neither it nor an accelerator has passed the
complete representative EOM packet. In particular, Metal binary32 speed cannot
satisfy the numeric contract by itself. The C++ result now implements general
retained-history bounds, exact causal-root batches, arbitrary-precision root
escalation, certified sharp acceleration, deterministic receiver reduction,
and atomic coupled history extension, while checkpoint-compatible numeric
state, finite-width event evolution, acceleration-stage precision escalation,
representative throughput, and accelerator parity remain open.

## Remaining Survey Closure

The local baseline is complete, but the full
`performance_architecture_survey_and_baseline` queue item remains active. Its
next evidence packet must implement:

1. representative coupled accepted-time throughput with separated root,
   acceleration, correction, history-copy, rejection, and recertification cost;
2. regular/difficult queue compaction with measured branch divergence and
   precision-escalation frequency;
3. a controlled accelerator difficult-row return path and cross-backend
   discrete-outcome parity;
4. a production hierarchical traversal demonstrating the general moving-history
   certificate through the population ladder, including the million-path row;
5. multi-device and distributed receiver-owner tests when a real hardware and
   storage envelope is available.

Until those rows exist, the production distributed block-exclusion engine and
coupled integrator remain incomplete, and no EOM migration or canonical
dynamics claim is authorized.
