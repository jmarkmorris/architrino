# EOM Language And Numeric Architecture

## Status

- Stage: `priority-design`
- Decision status: `open-evidence-gate`
- Production language: `not-selected`
- Accelerator stack: `not-selected`
- Numeric library stack: `not-selected`
- Numeric certification contract: `frozen-v0`; source: [precision-dynamic-range-and-certification-contract.md](precision-dynamic-range-and-certification-contract.md)
- Existing central solver: `preserved-for-current-dependencies`

## Decision Principle

For EOM, language selection is part of the numerical and performance architecture. The engine must combine extremely high bulk throughput with a controlled path beyond hardware floating point for the subset of work whose condition demands it. The winning stack is the one that produces accepted, reproducible, precision-controlled evolved histories fastest across the target workload and remains maintainable across the supported hardware envelope. Every candidate must implement [eom_numeric_certification/v0](precision-dynamic-range-and-certification-contract.md); candidate limitations cannot redefine the acceptance criteria.

No candidate wins through language preference, ecosystem size, peak FLOP claims, or one regular kernel. The decision must include causal-root irregularity, branch events, multirate synchronization, many-source reductions, precision escalation, accelerator transfers, checkpoints, diagnostics, and failure behavior.

## Required Numeric Architecture

The implementation must expose one numeric policy across every backend:

| Requirement | Minimum architectural consequence |
| --- | --- |
| Many orders of spatial and temporal scale | Nondimensionalization, declared scale maps, local coordinate origins, and stable absolute-time representation. |
| Fine steps at large absolute epochs | Epoch-plus-offset or equivalent split time; no repeated addition that stops advancing because the increment is below local representable spacing. |
| Causal roots and branch events | Problem-scaled residuals, safeguarded isolation/refinement, condition estimates, certified root counts where required, and exact/adaptive predicates for unresolved discrete decisions. |
| Near-caustic or cancellation-prone rows | Local escalation beyond the bulk format, with the promoted inputs and achieved bounds recorded. |
| Many-source accumulation | Deterministic or explicitly reproducible compensated, pairwise, binned, expansion, or stricter-precision reductions with measured error. |
| Million-path causal exclusion | Blockwise outward enclosures, deterministic membership records, exact surviving-pair fallback, and no cutoff or sampled-inactivity shortcut. |
| Distributed retained histories | Immutable content-addressed chunks, stable serialization across precision levels, receiver ownership, causal prefetch, and atomic accepted-window publication. |
| CPU/GPU agreement | Equality of certified discrete outcomes and convergence of continuous outputs under a shared model and precision policy. |
| Bounded execution | Caller-declared maximum precision, escalation count, memory, and wall/resource posture; fail closed when certification remains impossible. |
| Restart | Checkpoints preserve numeric representation, rounding policy, scale map, pending escalations, controller state, and all continuation-critical data. |

The initial precision ladder to prototype is:

1. hardware binary64 for well-conditioned bulk computation;
2. validated hardware extended precision where the target actually supports it;
3. software double-double, quad-double, floating-point expansion, or binary128-class arithmetic;
4. arbitrary-precision floating point with explicit precision and rounding;
5. interval or ball arithmetic for certified enclosures;
6. exact or adaptive robust predicates for discrete sign, order, coincidence, and topology decisions.

This is a capability ladder, not a requirement that every state use every representation. The preferred architecture promotes the smallest affected unit—predicate, root, interaction row, reduction, correction stage, or accepted step—while retaining a single provenance and error-budget model.

## Candidate Implementation Families

| Candidate family | Why it enters the benchmark | Questions that must be answered |
| --- | --- | --- |
| Modern C++ native core | Direct memory/layout control; mature CPU, SIMD, profiling, accelerator, and multiprecision ecosystems. | Can the build remain controlled, the mathematical interfaces safe, the backends consistent, and undefined-behavior risk acceptably contained? |
| Rust native core | Native performance with strong ownership and concurrency checks and a clear ABI boundary. | Do the required SIMD, accelerator, arbitrary-precision, interval, profiler, and target-platform paths meet the actual EOM envelope without fragile or duplicated kernels? |
| Native host plus separately compiled accelerator kernels | May permit the strongest host precision/control stack and the strongest device toolchain. | Can one model contract and generated/shared kernel definitions prevent CPU/GPU mathematical drift? Are transfer and maintenance costs justified? |
| Numerical reference environment | Useful for independently authored multiprecision or interval oracles and rapid integrator experiments. | Can it remain independent of production code, reproducible, and fast enough for validation envelopes without becoming an accidental production solver? |

The benchmark may add a candidate when it offers a credible advantage, but it must apply the same contract and scoring. JavaScript or TypeScript may serve the thin application shell used for run configuration, monitoring, and output inspection; it is not a candidate for the authoritative production numerical kernel absent extraordinary end-to-end evidence.

## Representative Benchmark Suite

Every serious candidate must implement the same versioned benchmark packet with identical inputs and output checks:

1. retained-history interpolation across shallow and deep histories, including scale-separated timestamps;
2. batched causal-residual evaluation and root-bracket isolation over regular and highly divergent workloads;
3. a near-caustic root refinement case that forces precision escalation and produces a certified root count;
4. receiver-normal branch evaluation containing near-cancellation and discrete sign decisions;
5. deterministic many-source acceleration reductions across population and worker-count ladders;
6. multirate scheduling, cross-rate interpolation, rejection, rollback, and branch-event subdivision;
7. hot-history residency, cold-history streaming, checkpoint creation, and exact continuation;
8. a CPU/GPU pipeline including compaction, difficult-row return, stricter-precision resolution, and final deterministic assembly;
9. certified block exclusion with exact surviving-pair parity against exhaustive smaller controls;
10. distributed immutable-history fetch, receiver ownership, checkpoint/restart, and streamed output-manifest reconstruction;
11. a population ladder through $N=10^6$, including certified sparse evolution and dense resource-envelope rejection;
12. an end-to-end controlled evolution that returns accepted path histories and all required ledgers against the independent oracle.

The packet must include ordinary, adversarial, and failure cases. It must measure cold start, steady state, memory use, transfer, precision-escalation frequency and cost, and time to the first accepted or rejected result—not only steady regular-kernel throughput.

## Decision Scorecard

| Dimension | Evidence |
| --- | --- |
| Mathematical correctness | Independent-oracle agreement, certified root/sign/event decisions, convergence, and deliberate negative-control failures. |
| Bulk CPU performance | Single-thread baseline, bounded thread scaling, SIMD gain, memory bandwidth, and load balance. |
| Accelerator performance | Kernel and end-to-end speed, residency, transfers, compaction, divergence, multi-device scaling, and difficult-row handling. |
| Precision reach | Available extended/arbitrary-precision and enclosure methods, rounding control, escalation overhead, and CPU/GPU interoperability. |
| Reproducibility | Deterministic or explicitly reproducible reductions, cross-worker/backend behavior, checkpoint continuation, and provenance. |
| Memory and scale | Layout control, allocator behavior, immutable distributed history storage, the $10^4$, $10^5$, and $10^6$ path ladder, certified pair-domain compression, and out-of-core posture. |
| Safety and failure containment | Bounds checking, concurrency discipline, nonfinite handling, cancellation, resource limits, and fail-closed numeric behavior. |
| Portability and deployment | Supported operating systems, CPU architectures, accelerator vendors, build reproducibility, packaging, and ABI stability. |
| Development quality | Profilers, sanitizers, debuggers, testing, documentation, compile/build feedback, and ease of independent oracle integration. |
| Maintainability | Amount of duplicated backend math, dependency stability, contributor comprehensibility, upgrade burden, and long-term control. |

Correctness and precision reach are hard gates. Performance, portability, and maintainability choose among candidates that pass them; they cannot compensate for a candidate that publishes an uncertified dynamical result.

## Prototype Outputs Required Before Selection

The language/runtime decision record must contain:

- the versioned benchmark packet and model contract;
- candidate toolchain, compiler, numeric library, accelerator, and platform versions;
- source for every benchmark implementation and any generated/shared mathematical definitions;
- correctness, certification, convergence, throughput, scaling, memory, energy or cost where measured, and build/deployment tables;
- profiles identifying the actual runtime distribution, including precision escalation and data movement;
- a portability and hardware-support matrix;
- a safety, maintenance, and dependency-risk assessment;
- the selected stack, the rejected alternatives, and the measured tradeoff for each;
- the stable native engine interface used by the thin application shell;
- an explicit re-evaluation trigger when the target hardware envelope or numeric requirement changes materially.

## Selection Boundary

Language selection is complete only when at least two credible native candidate families have been tested on the same representative packet, the independent precision oracle exists, and one candidate demonstrably satisfies the correctness gates while offering the best defensible end-to-end path to the required scale.

Implementation of the production integrator should not begin before this decision. Small prototypes, the independent oracle, benchmark fixtures, model-contract work, and numeric experiments are authorized because they create the evidence needed to choose correctly.

The current central solver remains untouched throughout this gate. No prototype output may be represented as EOM production evolution or used to migrate a consumer.
