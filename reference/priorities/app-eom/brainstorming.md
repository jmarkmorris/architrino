# EOM Brainstorming

This file holds provisional feature ideas, performance directions, validation possibilities, and later-stage application concepts for EOM. Promote an item into [priorities.md](priorities.md) only when it has a concrete consumer, mathematical requirement, implementation target, or acceptance condition.

## Routing Rules

- Keep the defining evolution contract in [application-and-engine-contract.md](application-and-engine-contract.md).
- Keep quarantine and migration sequencing in [migration-plan.md](migration-plan.md).
- Keep the active queue compact in [priorities.md](priorities.md).
- Do not let performance, UI, storage, or visualization work outrank correct coupled Master EOM evolution and independent validation.

## Feature Candidates

### Numerical Control

- Fixed, adaptive, and event-focused timestep modes.
- Individual-path and grouped block-step multirate schedules spanning many orders of magnitude.
- Power-of-two or otherwise exactly nested step bins as a candidate way to keep synchronization events reproducible.
- A renormalization-inspired hierarchy in which slow sectors can be evaluated less frequently than fast sectors while their retained histories remain available at every required emission time.
- A strict distinction between same-law coarse stepping and a genuinely coarse-grained slow-sector model; the latter needs its own validation envelope and claim limit.
- Independent integration cadence, diagnostic cadence, checkpoint cadence, and output cadence.
- Embedded error estimation, step rejection, rollback, and retry limits.
- Root-event prediction so the engine can refine before a birth, death, fold, or same-source onset rather than discovering it only after a large step.
- Multiple integration methods behind one EOM contract for cross-integrator comparison; no method becomes authoritative merely because it is fastest.
- Dense interpolation over accepted steps for output and root search, with interpolation error included in the budget.
- A reproducible convergence-run mode that automatically executes a declared timestep and precision ladder.

### Precision Beyond Hardware

- Nondimensionalized model charts and local coordinate/time origins to prevent scale range from consuming significant digits before the physics calculation begins.
- Epoch-plus-offset absolute time so a very small local step remains representable during a long absolute-time run.
- A measured precision ladder: binary64 bulk work; hardware extended precision where it is real and portable enough; software double-double, quad-double, expansions, or binary128-class arithmetic; arbitrary precision; and interval or ball certification.
- Per-root and per-reduction escalation so a small irregular tail can use expensive arithmetic without forcing every ordered pair onto it.
- Certified sign and ordering predicates around root activity, event order, source-normal and receiver-normal factors, and branch transitions.
- Compensated, pairwise, binned, or expansion reductions for many-source acceleration accumulation and reproducibility across worker counts.
- Cross-precision shadow samples during long runs to measure whether the current fast path remains inside its declared envelope.
- Precision-aware checkpointing that preserves representations, rounding policy, controller state, and pending escalations.
- Explicit maximum-precision and maximum-escalation budgets with a fail-closed unresolved result rather than an unbounded computation.

### Language And Toolchain Candidates

- Benchmark a modern C++ native core because it offers direct memory control, mature CPU/SIMD tooling, broad accelerator ecosystems, and established multiprecision options; measure its safety and build-complexity costs rather than assuming them away.
- Benchmark a Rust native core because it offers explicit ownership and concurrency safety with strong native performance; verify that required accelerator, SIMD, arbitrary-precision, interval, profiler, and cross-platform capabilities are mature enough for the exact EOM workload.
- Benchmark a hybrid native architecture only where a clean boundary is measurable, such as one host language with separately compiled accelerator kernels or a dedicated precision service. Avoid duplicating mathematical kernels across languages without generated/shared definitions and cross-backend tests.
- Consider modern Fortran, Julia, or another numerical environment for independent reference implementations and algorithm prototypes when useful. Do not make an interpreted or runtime-dynamic implementation the production hot path without end-to-end evidence that it meets the same performance, accelerator, precision, deployment, and reproducibility requirements.
- Keep JavaScript or TypeScript in a thin application shell if useful for the existing app environment. Do not put production root solving, Master EOM evaluation, integration, or precision certification there.
- Evaluate CUDA, HIP, SYCL, Metal, and other accelerator routes by target hardware coverage, precision capability, deterministic behavior, tooling, maintenance burden, and measured EOM throughput; do not select an accelerator API independently of the host-language decision.
- Score candidate stacks on accepted simulated time per wall-clock time, not only arithmetic throughput: include difficult-row escalation, transfers, branch divergence, checkpointing, diagnostics, build time, portability, testability, and long-term maintainability.

### History And Root Handling

- Per-path retained-history sufficiency checks before the run starts and during continuation.
- Hot-history windows selected from actual causal reach, with fail-closed behavior when an omitted tail may contribute.
- Root identity continuation between steps to reduce search cost without hiding births or missing additional roots.
- Exhaustive fallback scans that periodically verify accelerated/indexed root search.
- Separate active, inactive-gap, unresolved, caustic, and excluded-coincidence rows.
- History interpolation methods chosen per precision path and recorded in provenance.
- Exact restart of active root identities and integrator/controller state from checkpoints.

### CPU Performance

- Receiver-major, source-major, and history-chunk work partition benchmarks.
- Work stealing only if deterministic result ordering remains controlled.
- Thread-local interaction sums followed by deterministic reduction.
- Vectorized distance/residual evaluation and structure-of-arrays state layout where profiling proves value.
- Spatial-temporal candidate indices that reduce impossible source-history segments before root isolation.
- NUMA-aware allocation and thread placement for large native runs if ordinary workstation benchmarks show a real need.
- Asynchronous output compression and checkpoint writes that never mutate or reorder accepted evolution.
- Performance counters for root candidates, isolated roots, interpolation calls, correction iterations, rejected steps, synchronization, storage, and time per accepted simulated interval.

### GPU And Heterogeneous Performance

- GPU-resident hot histories and path state with compact device-side indices.
- Batched residual evaluation followed by root-bracket compaction to reduce branch-divergent work.
- Separate kernels for regular bulk root work and rare difficult branch/caustic events, with the CPU or a specialized GPU queue handling the irregular tail.
- Deterministic segmented reduction by receiver, plus a reproducible compensated alternative when exact bitwise order is too costly.
- CPU/GPU pipeline overlap: CPU schedules accepted-time events and history/storage work while GPU batches root and force kernels.
- Multi-GPU receiver partition, source partition, history-chunk partition, and spatial-domain partition benchmarks.
- Device-to-device and distributed transfer of immutable history chunks with content hashes.
- Mixed-precision kernels only when an error estimator promotes difficult rows to a stricter path and the final result passes the same convergence gate.

### Million-Path Scaling

- Benchmark envelopes at $N=10^4$, $10^5$, and $10^6$, with exhaustive smaller controls.
- Treat $10^{12}$ logical ordered receiver-source relationships at $N=10^6$ as the synchronized brute-force domain before root multiplicity and history scans.
- Use certified receiver-source-time block enclosures for exact root-free exclusion and retain complete pair membership records.
- Root-branch continuation and predictive brackets between accepted receiver events.
- Evaluate every surviving active candidate exactly in the first production implementation.
- Admit later hierarchical source grouping, multipole-style summaries, and low-rank history representations only with certified root topology and conservative acceleration remainder bounds.
- Dynamic scheduling based on measured root density rather than equal entity counts alone.
- Prefer deterministic receiver ownership with immutable content-addressed source-history chunks replicated or fetched according to causal reach.
- Stream accepted history, ledger, and checkpoint chunks through manifests sized for accelerator memory, host memory, local storage, and distributed storage separately.
- Reject projected dense noncompressible workloads outside the declared resource envelope before candidate publication.

### Performance Search Program

- Compare algorithms before micro-optimizing one implementation: exhaustive scans, indexed scans, branch continuation, hierarchical approximations, and hybrid strategies.
- Maintain one correctness-first single-thread implementation and one independently authored oracle while performance backends evolve.
- Use hardware counters and profilers for cache misses, vector utilization, branch divergence, occupancy, bandwidth, transfer, synchronization, and NUMA effects.
- Benchmark total time to accepted EOM history, not isolated kernel speed alone.
- Track energy use and cost per accepted simulated interval for workstation, GPU, multi-GPU, and distributed envelopes when measurements become available.

### Application And Operations

- Headless batch mode as the first performance/reference surface.
- A thin local run monitor for configuration, progress, resource use, first failure, and accepted output inspection.
- Pause only at accepted step boundaries.
- Resume from a content-hashed checkpoint on the same or a compatible runtime.
- Dry-run simulation-envelope estimation before allocating a large history store.
- A run comparison view for convergence ladders and current-solver-versus-EOM shadow runs.
- Export of compact summaries plus full ledgers without requiring the visualization layer.
- Reproducible command manifest for every run.

### Migration-Dependent Possibilities

- Live EOM-backed Animator playback after Animator has been converted into an output viewer rather than a future-path author.
- EOM-produced photon and braid histories only after their initial-history and branch-closure conditions are defined without prescribing the target orbit.

## Explicit Non-Goals For The First Build

- Migrating current apps before EOM validation.
- Reproducing current prescribed paths as a parity objective.
- Tuning EOM until it visually matches Borg, Photon, Animator, or braid fixtures.
- Promoting a GPU, multi-GPU, distributed, multirate, or reduced-model backend before it passes the independent correctness and convergence boundary.
- UI polish that delays the mathematical operation, independent oracle, or convergence evidence.
- Treating a path that looks stable as a certified branch without the required root, history, error, conservation, and stability records.
