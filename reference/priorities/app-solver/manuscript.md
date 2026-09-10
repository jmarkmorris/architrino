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
