# EOM Language And Numeric Architecture

## Status

- Stage: `selected-host-active-backend-evidence`
- Decision status: `C++20-host-selected-by-operator`
- Production language: `C++20`
- Accelerator stack: `not-selected`
- Numeric library stack: `outward-binary64-fast-path; MPFR-4.2.2/GMP-6.3.0-directed-interval-escalation`
- Numeric certification contract: `frozen-v0`; source: [precision-dynamic-range-and-certification-contract.md](precision-dynamic-range-and-certification-contract.md)

## Decision Principle

The operator selected C++20 as the EOM production host on 2026-07-13. The
decision is recorded in
[eom-cpp-production-host.md](../../architectural-decisions/eom-cpp-production-host.md).
The engine must combine extremely high bulk throughput with a controlled path
beyond hardware floating point for the subset of work whose condition demands
it. C++ selection does not relax
[eom_numeric_certification/v0](precision-dynamic-range-and-certification-contract.md),
and host or backend limitations cannot redefine the acceptance criteria.

The selected host still has to pass causal-root irregularity, branch events,
multirate synchronization, many-source reductions, precision escalation,
accelerator transfers, checkpoints, diagnostics, and failure behavior before
it gains production EOM authority.

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

## Selected Host And Supporting Families

| Family | Disposition | Questions that must be answered |
| --- | --- | --- |
| C++20 native core | Selected production host; direct memory/layout control plus mature CPU, SIMD, profiling, accelerator, and multiprecision ecosystems. | Can the build remain controlled, the mathematical interfaces safe, the backends consistent, and undefined-behavior risk acceptably contained? |
| Other native hosts | No longer a selection prerequisite; retained only for optional portability or risk comparisons. | Does a comparison expose a material correctness, portability, safety, or performance risk in the selected host? |
| Separately compiled accelerator kernels | Required backend lane under the C++ host. | Can one model contract and shared certificate definitions prevent CPU/GPU mathematical drift? Are transfer and maintenance costs justified? |
| Python numerical reference environment | Retained as the separately authored independent oracle and benchmark harness, never as the production solver. | Does it remain independent, reproducible, and sufficiently broad to challenge every promoted C++ or accelerator path? |

JavaScript or TypeScript may serve the thin application shell used for run
configuration, monitoring, and output inspection. It is not the authoritative
production numerical kernel.

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

## Evidence Required Before Production Promotion

The production-promotion record must contain:

- the versioned benchmark packet and model contract;
- candidate toolchain, compiler, numeric library, accelerator, and platform versions;
- source for every benchmark implementation and any generated/shared mathematical definitions;
- correctness, certification, convergence, throughput, scaling, memory, energy or cost where measured, and build/deployment tables;
- profiles identifying the actual runtime distribution, including precision escalation and data movement;
- a portability and hardware-support matrix;
- a safety, maintenance, and dependency-risk assessment;
- the selected C++ stack, backend choices, and measured tradeoffs;
- the stable native engine interface used by the thin application shell;
- an explicit re-evaluation trigger when the target hardware envelope or numeric requirement changes materially.

## Promotion Boundary

Host-language selection is complete by operator decision. Production promotion
is complete only when the C++ host and each promoted backend demonstrably
satisfy the independent correctness gates and the representative end-to-end
resource envelope.

Implementation of the C++ production integrator is authorized. Its outputs
remain architecture evidence until coupled evolution, precision, performance,
checkpoint, and migration gates pass.

No prototype output may be represented as EOM production evolution or used to migrate a consumer.
