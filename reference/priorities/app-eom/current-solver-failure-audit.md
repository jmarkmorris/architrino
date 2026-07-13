# Current Solver Failure Audit

## Status

- Audit date: `2026-07-13`
- Scope: native routine named `architrino_solver_integrate_master_equation_motion_f64`
- Finding: `not-a-canonical-master-eom-solver`
- Current-runtime disposition: preserve for dependency compatibility; do not use its output as canonical EOM evidence
- EOM implementation status: not started

## Executive Finding

The native routine currently labeled as Master Equation integration does not consume retained path histories or evaluate the canonical delayed receiver-normal Master EOM. It advances instantaneous states under a hard-coded softened partner interaction, omits self-pairs, emits no wake rows, and nevertheless reports `canonical_eom_evidence = 1` on successful buffer sizing and execution.

The result may remain available as a compatibility calculation while its dependencies are inventoried. Its canonical-evidence field is invalid for the implemented mathematics and must not be consumed by EOM, migration, theory promotion, or new dynamical claims.

## Verified Implementation Findings

| Required behavior | Current implementation | Evidence | Consequence |
| --- | --- | --- | --- |
| Consume retained path history | The request contains `history_depth`, but the state input contains only one initial position and velocity per path. No history rows enter the routine. | [SolverCAbi.hpp](../../../src/solver/include/architrino/solver/SolverCAbi.hpp), request/state structures; [SolverCAbi.cpp](../../../src/solver/src/SolverCAbi.cpp), lines 3617–3652 and 3783–3871 | The routine cannot find delayed roots from supplied prehistory. |
| Use requested field speed and history | Validation checks the two scalars, but the acceleration function explicitly discards the request with `(void)request`. The values are copied into the summary only. | `SolverCAbi.cpp`, lines 3625–3637, 3675–3680, and 3770–3775 | Changing field speed or history depth cannot change the computed acceleration. |
| Use a declared model contract | Coupling and softening are compiled constants: `1.0e-4` and `1.0`. | `SolverCAbi.cpp`, lines 305–309 and 3678–3680 | The advertised model/version request does not determine the actual interaction parameters. |
| Evaluate delayed source events | The interaction uses `other.position - state.position` from the same working-state instant. | `SolverCAbi.cpp`, lines 3682–3701 | This is instantaneous partner interaction, not causal-history evolution. |
| Include all ordered pairs, including self | `if (other_index == index) continue;` excludes every same-source row. The API also rejects `state_count < 2`. | `SolverCAbi.cpp`, lines 3634–3637 and 3682–3687 | A single architrino cannot be evolved for self-history, and nontrivial self-hits are impossible. |
| Apply the canonical charge factor | The magnitude uses `abs(other.charge)` rather than $|q_iq_j|$. Receiver charge affects only the sign test. | `SolverCAbi.cpp`, lines 3697–3701 | Non-unit charge magnitudes do not follow the canonical per-hit law. |
| Apply source-normal legality and receiver-normal branch strength | No causal root, $D_s$, $D_T$, $W^{\mathrm{rec}}$, active-root set, or branch identity is computed. | Entire `master_equation_accelerations` function, `SolverCAbi.cpp`, lines 3675–3705 | The routine cannot implement the canonical receiver-normal force row or report its legal branch. |
| Emit causal evidence | The summary hard-codes zero wake rows while equating acceleration rows with frame count. | `SolverCAbi.cpp`, lines 3751–3780 | The emitted counts cannot reconstruct the interaction or demonstrate causal evolution. |
| Report canonical authority only after proof | A valid request is immediately summarized with `canonical_eom_evidence = Yes` before output-buffer sufficiency and before any integration step. | `SolverCAbi.cpp`, lines 3842–3858 | The authority flag describes the routine name or intended lane, not the calculation performed. |
| Test canonical semantics | The native smoke test requires both `canonical_eom_evidence == 1` and `wake_row_count == 0`; its motion checks only require displacement in the expected instantaneous-attraction direction. | [solver_motion_smoke.cpp](../../../src/solver/native/solver_motion_smoke.cpp), lines 562–582 | The test locks in the false-positive evidence status rather than detecting the missing EOM terms. |

## Change Reconstruction For This Routine

| Date | Commit | What changed in this capability | Effect |
| --- | --- | --- | --- |
| 2026-07-01 09:36 EDT | `e50fd678ef` — `Advance Borg fixture, equation mapping, and closure benchmarks (#197)` | Introduced the native Master-Equation-labeled request, state, summary, integrator, hard-coded softened instantaneous partner calculation, self-pair exclusion, canonical-evidence success flag, and smoke assertions accepting zero wake rows. | A compatibility-style Borg interaction was placed behind a canonical-solver name and evidence field without the causal-history mathematics needed to support that status. |
| 2026-07-01 14:02 EDT | `4cb2e9521a` — `Advance live solver-backed app runtimes (#198)` | Changed the coupling from `1.0` to `1.0e-4`, removed the duration-derived scaling, explicitly discarded the request inside acceleration evaluation, and relaxed smoke-test motion thresholds. | The fixed-parameter instantaneous behavior became even more explicit while the canonical-evidence assertion remained unchanged. |

This table reconstructs the currently blamed introduction and same-day modification of this routine. It does not yet reconstruct every earlier prescribed-path, bridge, fixture, or consumer decision elsewhere in the solver tree.

## EOM Counter-Requirements

Each verified failure becomes a negative control for EOM:

1. perturbing field speed while holding retained histories fixed must change causal roots or explicitly prove that the selected case is invariant;
2. changing available history must change the active-root ledger when an admitted older root enters or leaves coverage;
3. a request with no retained history must fail whenever the declared interval requires it;
4. every ordered pair $(i,j)$, including $i=j$, must be logically accounted for at every accepted receiver event through an explicit row or a certified exclusion/aggregation record that resolves membership back to the pair;
5. a pair with no active root must be recorded or certified as inactive rather than omitted;
6. the coincident same-source endpoint $T_{\mathrm{em}}=T$ remains excluded, while nontrivial same-source roots at $T_{\mathrm{em}}<T$ remain eligible;
7. exact $\|\mathbf V\|=c_f$ and super-field-speed $\|\mathbf V\|>c_f$ inputs must be accepted and routed by causal-root geometry, not rejected or clamped by speed magnitude alone;
8. source-normal, receiver-normal, polarity, charge product, distance/regularization, and root identity must be present on every consumed interaction row;
9. canonical EOM authority must be derived from completed ledger and acceptance gates, never set by entrypoint name or successful execution alone;
10. a result with zero wake/root rows cannot report canonical EOM evidence unless the run explicitly proves that every ordered pair had no admitted root and the resulting inertial motion passes the same ledger contract.

## Containment Boundary

This audit does not authorize editing or removing the current routine, changing its ABI, or redirecting its consumers. Those actions remain blocked on the dependency inventory and migration plan. It does authorize treating the routine and its `canonical_eom_evidence` field as non-authoritative in all new EOM design and evidence work.
