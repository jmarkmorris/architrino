# EOM Application And Engine Contract

## Status

- Stage: `priority-design`
- Implementation: `not-started`
- Authority: operator-selected EOM boundary
- Frozen normative requirements: [evolution-contract-v0.md](evolution-contract-v0.md)
- Million-path amendment: [eom_evolution_contract/v0/amendment-1](evolution-contract-v0-amendment-1-million-path-scale.md)
- Million-path architecture: [eom_million_path_execution/v0](million-path-certified-execution-architecture.md)

## Defining Operation

EOM evolves histories. It does not draw, fit, replay, guide, or constrain future paths.

For a delayed equation of motion, the initial datum is necessarily a history function. For $N$ architrinos at absolute time $T_0$, define the initial data by history segments

$$
h_{i,T_0}(\theta)=\bigl(\mathbf X_i(T_0+\theta),\mathbf V_i(T_0+\theta)\bigr),
\qquad -h_i\le\theta\le0.
$$

An EOM request supplies these retained histories, an evolution interval $[T_0,T_1]$, the canonical Master EOM model contract, and numerical/resource controls. A successful response returns the same histories extended through $T_1$, together with the evidence needed to reconstruct every accepted step. There is no instantaneous-state-only EOM request form; position and velocity at $T_0$ are merely the endpoint values of the required history functions.

The input history is the initial condition for the delayed system. It is not permission to prescribe $\mathbf X_i(T)$ for $T>T_0$.

## Per-Step Closure

At an accepted receiver time $T_n$, EOM must:

1. read each source path only from retained history available at $T_n$;
2. continue known roots where their chart remains valid, independently scan for new or missed branches, solve the causal-root condition for every ordered receiver-source pair, and certify that every admitted active root was enumerated;
3. evaluate the canonical receiver-normal Master EOM using the same root ledger;
4. advance the coupled state to a candidate $T_{n+1}$;
5. correct, refine, or reject the candidate when root, state, event, or error controls fail;
6. append only the accepted state to retained history;
7. emit step provenance tying history, roots, acceleration, state, error, and thread-reduction records together.

## Velocity Domain And Ordered-Pair Accounting

EOM must accept finite sub-field-speed, exactly field-speed, and super-field-speed path velocities. It must not clamp, reject, or perturb a state merely because $\|\mathbf V_i\|$ is less than, equal to, or greater than $c_f$.

The equality $\|\mathbf V_i\|=c_f$ is not by itself a singularity. At each ordered receiver-source row, including $i=j$, the engine must evaluate the actual causal-root geometry and the source-normal and receiver-normal factors. A rail-aligned row may produce $D_s=0$, $D_T=0$, a root fold, a receiver-normal null, or another chart event; those outcomes require the declared certified transition, regularization, or fail-closed route. They may not be replaced by a global prohibition on field-speed motion.

Super-field-speed motion is also inside the required domain. It may create multiple partner roots or nontrivial self-history roots, so exhaustive root enumeration and branch identity become more important rather than optional.

Every ordered pair $(i,j)$ has continuous logical accounting at every accepted receiver event. This does not assert that every pair has a nonzero force or an active causal root, nor does it require an uncompressed $N^2$ output table. Each pair must resolve to an explicit active, inactive, excluded-coincidence, or unresolved row, or to a certified exclusion or aggregation record whose membership and error bound cover that pair. A missing contribution can therefore never be confused with a skipped pair. Same-source accounting excludes only the coincident endpoint $T_{\mathrm{em}}=T$ under the canonical convention; it must retain every admitted nontrivial same-source root with $T_{\mathrm{em}}<T$. A one-architrino request is therefore valid when its retained self-history satisfies the input contract.

## Required Input

| Input | Required content |
| --- | --- |
| Retained path histories | A continuous evaluable position-and-velocity history for every path on its declared pre-$T_0$ coverage interval. Ordered absolute-time samples are acceptable only with a declared interpolant and certified error bound. Include path identity, polarity/charge, numeric type, scale map, provenance, and content hash. |
| Evolution interval | $T_0$, $T_1$, requested output cadence, and termination conditions. |
| Master EOM model contract | Equation version, constants, field speed, polarity convention, self-hit policy, causal-surface regulator $\eta$, core regulator $\epsilon_c$, branch aggregation policy, coincident-endpoint convention, finite-history rule, and units. |
| Time-step controls | Fixed, adaptive, event-focused, individual-path, or grouped multirate mode; initial/minimum/maximum steps; rate hierarchy; state, root, interpolation, synchronization, and event tolerances; and maximum rejected steps. |
| Precision controls | Allowed numeric representation ladder, default precision, maximum precision, nondimensionalization and local-coordinate policy, condition thresholds, stage error budgets, escalation triggers, certified-decision requirements, and convergence-check policy. |
| Scale and data-plane profile | Applicable contract amendments, content-addressed history manifest, path and segment counts, receiver-owner and history-shard policy, block-exclusion policy, resource projection, output manifest, and streaming posture. |
| Resource envelope | Entity count, interaction policy, memory/storage budgets, CPU thread count, SIMD policy, GPU/backend selection, accelerator memory budget, device count, distributed posture, latency or batch posture, checkpoint cadence, and output detail. |

## Required Output

| Output | Required content |
| --- | --- |
| Evolved path histories | Every accepted position and velocity row through $T_1$, or through the last accepted state before a declared halt, returned inline only for bounded runs and otherwise through immutable content-addressed chunks plus an output manifest. |
| Root ledger | Active, inactive, unresolved, same-source, partner, birth/death, caustic, source-normal, receiver-normal, residual, and branch-identity rows. |
| Interaction ledger | Per-root and per-receiver acceleration contributions tied to the root and history rows actually used. |
| Step ledger | Attempted and accepted steps, error estimate, rejection reason, correction iterations, event subdivisions, and integration method. |
| Execution record | EOM version, model hash, input hash, thread count, deterministic reduction policy, precision path, platform, timing, and resource use. |
| Halt record | Completed interval or exact first failure: insufficient history, unresolved root, branch ambiguity, singular chart, minimum-step exhaustion, nonfinite state, cancellation, storage failure, or resource-envelope rejection. |
| Checkpoint | Complete continuation state, including hot retained history, active root identities, integrator state, and hashes needed to reproduce the next step. |
| Evidence status | Capability-derived `canonical`, `conditional`, `reference`, `display-only`, or `failed` status with the exact gates and records used to derive it. |

## Time Resolution

EOM should support:

- a caller-selected fixed timestep for controlled experiments;
- adaptive timestep selection from local truncation error and root/event proximity;
- time-step ratios spanning many orders of magnitude within one run;
- individual-path or grouped block-step schedules so fast paths and active branch events can advance more finely than slow paths;
- separate integration cadence and output cadence;
- minimum and maximum timestep bounds;
- event-local subdivision around root births, deaths, folds, same-source onset, close approach, and other declared chart boundaries;
- rejected-step rollback without publishing candidate history rows;
- dense output only as interpolation over accepted EOM states, never as a replacement for integration;
- convergence runs over a declared timestep and rate-hierarchy ladder.

Multirate execution must preserve one causal absolute-time ledger. At a receiver event $T$, every source sample at an emission time $T_{\mathrm{em}}$ must come from accepted retained history or from a controlled interpolant over accepted history. Predictor states may participate in an implicit correction iteration, but they do not become retained source history until the coupled step is accepted.

There are two distinct slow-sector strategies:

1. **Same-law multirate integration:** every path obeys the same Master EOM, but slowly changing paths use larger numerical steps. This remains EOM evolution when cross-rate synchronization and error budgets pass.
2. **Reduced slow-sector modeling:** a slow population or assembly is replaced by a coarse-grained response, aggregated history, or renormalization-inspired effective model. This is a declared reduced model until convergence against a resolved Master EOM run establishes its envelope. It must not inherit full EOM authority merely because its fast sector is EOM-evolved.

## Precision Across Many Orders Of Magnitude

EOM must not assume that one hardware floating-point format can resolve every stage of a multiscale run. The engine needs a numeric representation ladder whose fast path is ordinary hardware arithmetic and whose stricter paths are invoked by measured conditioning and declared error budgets.

Candidate levels include:

1. hardware binary64 for well-scaled bulk work;
2. a genuinely supported hardware extended format where the selected platform provides one consistently;
3. software double-double, quad-double, floating-point expansion, or binary128-class arithmetic;
4. arbitrary-precision floating point with explicit rounding and a caller-bounded maximum precision;
5. interval or ball enclosures for decisions that require a certified bound;
6. exact or adaptive robust predicates for signs, orderings, coincidences, and topology-changing decisions when floating-point subtraction is inconclusive.

The exact ladder remains a language-and-library decision. Its contract does not: a row may be promoted locally without forcing the entire simulation into the most expensive representation, every promotion must be recorded, and no stage may silently fall back to a weaker precision than the request or its condition estimate requires. If the maximum allowed precision still cannot certify a required decision, the candidate step must be rejected or the run must halt with the unresolved quantity and achieved enclosure.

### Scaling And Stability Rules

The numerical design should combine additional precision with stable formulations:

- nondimensionalize each declared model and record the scale map used to recover physical units;
- use local space and time origins so small separations are not obtained by subtracting unnecessarily large absolute coordinates or epochs;
- represent absolute time as a stable epoch-plus-offset or equivalent split form when a fine local timestep is small relative to the global epoch;
- use compensated, pairwise, expansion, or otherwise error-controlled accumulation for large interaction reductions;
- use overflow- and underflow-resistant norms, ratios, and residual normalizations;
- carry interpolation, root, force, integration, synchronization, and reduction error estimates separately before combining them into the accepted-step budget;
- use condition estimates to promote only the rows, roots, reductions, or correction stages that require stricter arithmetic;
- compare residuals to problem-scaled tolerances and enclosures, never to an unscaled universal epsilon.

High-risk locations include near-cancelling causal-root residuals, near-caustic source-normal factors, receiver-normal branch strength, close approaches, large-population acceleration sums, interpolation between widely separated multirate levels, and reductions whose order changes across threads or accelerators. Root count, root activity, branch identity, event ordering, and sign decisions are discrete outcomes; tolerance-level disagreement in a continuous value does not excuse disagreement in those outcomes.

### Precision On Accelerators

The accelerator design may use a heterogeneous precision pipeline. Well-conditioned bulk rows can remain on the GPU in a validated hardware format, while flagged rows move to a stricter device kernel or a CPU software-multiprecision queue. The transfer and escalation cost is part of the end-to-end benchmark.

A GPU path is not authoritative when it merely agrees approximately on positions while producing a different certified root count, active-root set, sign, event order, or branch identity. Promotion requires cross-precision and cross-backend convergence, plus certified enclosures or independent multiprecision evidence at the difficult cases defined by the acceptance oracle.

The detailed numeric and implementation-language decision gate is defined in [language-and-numeric-architecture.md](language-and-numeric-architecture.md).

## Language And Runtime Boundary

The EOM production language has not yet been selected. The selected stack must support predictable native memory ownership, bounded multithreading, SIMD, accelerator kernels, deterministic or explicitly reproducible reductions, efficient precision escalation, profiling, checkpoint-compatible numeric representations, and a stable application interface.

The compute engine should remain a headless native boundary. A thin application shell may use a different language for configuration, monitoring, and visualization, but it must not reimplement the Master EOM, root logic, integration, or acceptance decisions. Language selection follows the representative-kernel and accepted-history gate in [language-and-numeric-architecture.md](language-and-numeric-architecture.md), not ecosystem familiarity or a single microbenchmark.

## Extreme-Performance Mandate

EOM must explore every credible performance avenue that can preserve the mathematical contract. Algorithmic reduction comes before brute-force hardware scaling, but CPU, GPU, and distributed designs should be considered from the start so the state layout and work decomposition do not lock the application into one backend.

### CPU Execution

The CPU design should make independent ordered-pair root searches and branch evaluations primary parallel work units. Priorities are:

1. bounded native worker threads with explicit caller control;
2. deterministic receiver and pair partitioning;
3. deterministic accumulation or a declared reproducible compensated-reduction rule;
4. SIMD/vectorized causal residual, interpolation, distance, and branch-evaluation kernels;
5. structure-of-arrays hot state, cache-aware blocking, memory pooling, and NUMA-aware placement where benchmarks justify them;
6. batched history interpolation and root searches;
7. asynchronous checkpoint/output work that cannot mutate accepted state;
8. cancellation and resource-envelope enforcement at safe step boundaries;
9. single-thread replay as the reference execution mode for debugging and deterministic comparison.

### GPU And Heterogeneous Execution

Required GPU investigation includes:

- batched source-history interpolation;
- causal residual evaluation over large candidate sets;
- root-bracket detection and refinement kernels;
- per-root branch-strength and acceleration evaluation;
- active-root compaction and prefix operations;
- deterministic or reproducible receiver reductions;
- resident hot-history/state layouts that minimize host-device transfer;
- overlap of CPU event/control work with GPU numeric kernels;
- multi-GPU receiver, source, history-chunk, or spatial-domain partitioning;
- transfer, synchronization, branch-divergence, occupancy, and accelerator-memory measurements.

A GPU result is not authoritative because it is faster. It must pass the independent oracle, cross-backend convergence, root-count equality or justified bounded differences, and the declared precision budget. Hardware-dependent reduced precision must be explicit.

### Large-Population Scaling

The target envelope includes at least $10^6$ active path identities under the
million-path scale amendment. A synchronized event then contains $10^{12}$
logical ordered relationships before multiple roots and history search are
counted. The production engine must not evaluate this domain by serially
calling the independent pair oracle. It must implement the certified execution
architecture in
[million-path-certified-execution-architecture.md](million-path-certified-execution-architecture.md),
including:

- causal space-time block enclosures that prove complete receiver-source-time
  blocks root free;
- complete disjoint accounting of excluded, exact, enclosed, and unresolved
  ordered relationships;
- temporal slabs, bounding-volume hierarchies, and content-addressed path
  indices;
- continuation of known root branches between nearby accepted receiver events;
- exact evaluation of every surviving active candidate in the first production
  implementation;
- later hierarchical, multipole-style, or low-rank active contributions only
  when root topology and the acceleration remainder are certified inside the
  accepted-state budget;
- deterministic receiver ownership, distributed immutable-history chunks, and
  atomic accepted-window commits across devices or nodes;
- dynamic load balancing for uneven root density and branch events;
- accelerator, host-memory, local-storage, and distributed-storage residency
  tiers without losing causal coverage;
- streamed output and checkpoint manifests rather than an in-memory million-path
  response.

Every accelerated search retains exhaustive controls on smaller envelopes.
Every pruned relationship is covered by a certified exclusion. Every aggregated
active contribution carries traceable membership, certified root topology, and
a conservative remainder, or is labeled as a reduced model. When a dense,
noncompressible workload exceeds the declared resources, preflight returns
`resource_envelope_exceeded`; it does not fabricate an evolved result.

### Performance Evidence

Benchmarks must span population size, path-history depth, active-root density, timestep ratio, speed regime, precision, regularization, and output load. Report at least:

- accepted simulated time per wall-clock time;
- attempted and accepted steps per second;
- candidate pairs, root brackets, resolved roots, and branch evaluations per second;
- strong and weak CPU-thread scaling;
- SIMD gain and memory-bandwidth utilization;
- GPU kernel, transfer, synchronization, and end-to-end speedups;
- multi-GPU or distributed scaling where available;
- peak and steady memory per path and retained-history row;
- load imbalance and time spent in interpolation, root solving, force accumulation, integration, storage, and synchronization;
- numerical differences against the independent oracle and single-thread CPU reference.

GPU, multi-GPU, and distributed prototypes may be developed alongside the validated CPU path. Production promotion remains staged: first establish the independent mathematical oracle, then promote each backend only when it passes the same correctness and convergence boundary.

## Prohibited Substitutions

The following may be useful in separate tools, fixtures, or validation oracles, but they are not EOM production evolution:

- analytic circular or helical future paths;
- path constraints, guidance acceleration, snapping, or boundary landing corrections;
- authored Animator curves or display interpolation;
- constant-acceleration paths supplied as the expected answer;
- instantaneous softened pair laws labeled as the Master EOM;
- a golden fixture generated by the same implementation used as its only correctness oracle.

## First Application Surface

The first application surface should prioritize execution and inspection over presentation. It should expose:

- input path-history manifest selection, validation, path count, and retained
  coverage summary;
- absolute start and end time;
- fixed/adaptive/multirate timestep controls, rate hierarchy, and output cadence;
- equation, constants, regularization, and precision versions;
- CPU thread count, SIMD policy, GPU/backend selection, device count, memory budgets, storage target, and checkpoint cadence;
- start, pause at an accepted boundary, cancel, checkpoint, restart, and resume;
- progress in accepted time, attempted steps, root evaluations, backend utilization, and estimated remaining work;
- current state and path output locations;
- convergence status and the exact first-failure record;
- clear provenance distinguishing EOM evolution from imported prescribed-history analysis.

Visualization can inspect accepted output paths, root events, and diagnostics. It must not feed edited future geometry back into the EOM run.
