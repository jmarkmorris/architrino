# Computing Delayed Histories with the EOM Solver

This is a brief outline for a future technical manuscript. It identifies the explanations to develop; it is not a completed synthesis or new evidence of solver capability. Expansion is owned by [EOM-015](work-queue.md#eom-015--eom-solver-manuscript-development), with particular attention to the GPU execution work in EOM-010.

## 1. From retained history to computed motion

Explain why the input is a set of past paths and an absolute-time interval, and how causal roots determine acceleration and the next accepted history extension. Distinguish computed future motion from prescribed paths and display interpolation. Use the [master-equation binding](contracts/master-eom-binding-v1.md) and [evolution contract](contracts/evolution-contract-v1.md); use normalized wake-speed units in every numerical example.

## 2. History representation and complete causal roots

Develop continuous history representations, interpolation enclosures, partner and self-history accounting, root isolation and continuation, and proofs of root-free complements. Explain how folds, ambiguous roots and history boundaries require refinement, a declared event route or a failure that prevents an unsupported step.

## 3. Coupled evolution, error budgets and precision

Explain atomic coupled steps, causal synchronization, multirate evolution and event handling. Derive how root and acceleration uncertainty propagate into velocity and position, distinguishing inherited history uncertainty from new step error. Connect the [error-budget ledger](contracts/certified-error-budget-ledger.md) to precision escalation and accepted-step decisions.

## 4. What establishes numerical correctness

Explain the roles of analytic cases, the [independent dynamical oracle](contracts/independent-dynamical-acceptance-oracle.md), convergence, negative controls and reproducible continuation. Distinguish independent correctness evidence from deterministic replay and implementation parity. Describe checkpoint identity and restart without reproducing operational receipts.

## 5. CPU execution and algorithmic scaling

Develop the relationship between measured bottlenecks, threading, vectorization, memory locality and retained-history cost. Explain certified exclusion, proposed active aggregation and exact fallback, including causal-root discovery as well as acceleration accumulation. Reconcile each capability with its implementation and evidence version; keep bounded-population acceptance distinct from the million-path target.

## 6. GPU and heterogeneous execution

Develop this chapter alongside EOM-010. Explain which work can be batched, how histories and certificates move between processors, and how irregular root searches and precision escalation affect scheduling. Cover device memory, transfers, synchronization, CPU fallback and eventual multi-GPU partitioning.

State the precision and reduction policy for each proposed backend. Explain how complete root accounting, certified error budgets, independent-oracle checks and checkpoint continuation constrain accelerator design. CPU agreement alone does not establish the mathematical rule.

Present speed and resource claims only from matched, reproducible end-to-end benchmarks, including transfers, certification and fallback costs. Report the workload and measured break-even point, unsuccessful optimizations and unresolved limits. Separate exploratory kernels from accepted EOM evolution.

## 7. Distributed histories and long runs

Explain immutable history ownership, causal data availability, streamed output, cancellation and atomic restart. Connect resource admission and dense-workload failure to complete interaction accounting. Develop distributed and million-path claims only as their separate acceptance obligations are met.

## 8. Interpreting solver output

Explain what the returned histories, root ledgers, error records and execution provenance establish. Distinguish numerical evolution from a demonstrated physical branch, persistence or stability result. Connect to the Braid Program and Master-Equation Closure manuscripts while retaining their scientific claim ownership.

## 9. Equation modes and precise analytical methods

The operator selected a shared EOM capability on 2026-10-10: support explicitly selectable alternative Master Equations and speed regimes while retaining **the canonical Master Equation with no speed limit as the default**. Numerical evolution uses the standard EOM solver. Surface, Borg and headless consumers must select the same solver-owned definitions rather than implement alternative acceleration laws locally. This is an accepted design requirement; it is not an implemented capability or an amendment to the frozen canonical contract.

Treat the interaction law, speed regime and optional geometric constraint as separate parts of a resolved run mode:

| Setting | Required identity and behavior |
| --- | --- |
| Master Equation | Exact definition/version, parameters, causal support, self/partner rules, root accounting, superposition and receiver-response order. Canonical is the default; alternative definitions come from their scientific owner. |
| Speed regime | Unrestricted by default. A selected strict or inclusive ceiling records its threshold, admissible histories and defined boundary response or halt. No inequality silently creates a clamp or continuation rule. |
| Geometry | Unconstrained by default. A selected Surface experiment explicitly records the fixed surface and normal support, including tangent projection, curvature and receiver-total discarded-normal bookkeeping. |

No speed limit means the solver imposes no speed ceiling; it does not guarantee that acceleration is defined on every possible history. Canonical treatment of roots, singular geometry and events still applies. A selected restricted regime changes the declared domain or response and must retain its own definition. The [equation-variant registry](../master-equation-closure/equation-variants/README.md) owns scientific definitions and investigation scope; adding a selector does not establish a law's correctness or expand that scope.

Resolve and validate the mode before execution. Requests, outputs, checkpoints and restarts must preserve the complete equation/speed/geometry identity. A changed mode starts a new run or an explicitly recorded branch. Unsupported combinations reject before advancing. Alternative-law and supported-surface outputs retain distinguishable authority and do not inherit the canonical evidence label. Introduce a versioned contract extension or successor for these capabilities; preserve the existing [canonical contract](contracts/evolution-contract-v1.md) and its consumers while that design is developed. The next design artifact is the common mode specification, including capability negotiation, valid combinations, dispatch, events and restart semantics, with [Surface](../app-surface/manuscript.md#shared-solver-modes) as a concrete consumer.

The operator also permits analytical methods where they are precise and far less expensive than numerical evolution. An independently checked derivation can supply an analytical result directly; reproducing it numerically is required only when a current verification question needs that comparison. Exact formulas or proved reductions can also reduce work within EOM, provided their domain includes the selected law, speed regime, geometry and complete causal history relevant to the claim. Record assumptions, root completeness where required, domain, exactness or controlled error, and an explicit fallback or halt outside the proved domain. An analytical candidate path with an unchecked delayed residual remains a candidate.

Keep analytical results, numerical evolution and declared combinations distinguishable in evidence and presentation. Mathematical precision requires a derivation or certified error bound and independent checking. A cost advantage requires matched measurements of wall time and resource use, including certification and fallback; no advantage is measured here. **Claim grade: inferred** for the expected usefulness of analytical reductions. A missed causal branch, domain violation, independent residual outside the bound, or measured overhead eliminating the claimed saving falsifies the reduction's claim within its stated scope. This method choice creates no second production solver.
