# CRW-005 Photon Guide review — 2026-09-13

## Scope and disposition

Reviewed the full [Photon Guide](../../../../content/markdown/aaa/archie/photon-guide.md), its local changes, and the actual formula, state, and transmitter-history implementation paths. Six bounded documentation findings repaired; no runtime, solver, preset, generated, shared-record, or Git writes. No browser run or dynamical simulation is claimed.

Baseline SHA-256: `7a386cec7dc7ae0c90b04924cc310b903ef4ffa3b4333db7f5e693775394fd32`.

Final SHA-256: `385870e493425b30ba302757e63293dab6dca2a21626c05ad9be21675cf43aa3`.

## Findings and independent evidence

- **PG-01 — medium, repaired: root-coordinate scope.** The displayed static observer root equations are now explicitly co-moving. Absolute-history mode requires the observer at reception time and the source at emission time, with both translated positions and total velocities. `src/apps/photon/PhotonTransmitterHistoryRuntime.js:29–82` implements these distinct time arguments. Independent algebra: the relative longitudinal displacement contains group speed multiplied by reception time minus emission time; equal translation speeds do not cancel that delay term. Time tau in these formulas is emission time, not proper clock time. The guide states normalized wake-speed units explicitly.
- **PG-02 — medium, repaired: inverse-square display floor.** The acceleration display now uses the documented floored radius rather than the bare radius. `PhotonFormulaRuntime.js:36–37,196–204,1382,1682` defines and passes the 0.08 length floor. For radius 0.04 the unfloored inverse square is four times the floored value, independently of gain or root weight. At the near-zero displacement threshold the helper supplies a fixed longitudinal direction; this is no physical coincidence continuation. The display gain is identified as diagnostic, not a recovered electromagnetic coupling.
- **PG-03 — medium, repaired: fit-window claim.** The default plot is three cycles, but the range is one through twelve (`PhotonStateRuntime.js:157,171`). Its common-fit window is the minimum of plotted duration and the slowest enabled period (`PhotonStateRuntime.js:545–565`). Thus selecting one cycle at reference frequency four yields a quarter-unit window while the slowest enabled period remains one. The guide no longer guarantees complete-period leakage removal for every plot setting; finite sampling and solver errors remain separate.
- **PG-04 — medium, repaired: sampled analyzer formula.** The actual implementation (`PhotonFormulaRuntime.js:2499–2509`) divides summed projected squared fields by the maximum of epsilon and summed transverse squared fields, then clamps to the unit interval. The old display used a ratio of averages with an additive epsilon. The corrected display preserves its viewer ID. The instantaneous fraction still uses its different additive safeguard (`PhotonFormulaRuntime.js:2344–2350`). Epsilon and sample indices are defined. An aligned unit sample gives exactly one with the runtime's sum-floor rule, whereas the previous additive formula gives less than one. A squared field of 1e-10 yields 0.1 with the 1e-9 floor.
- **PG-05 — medium, repaired: evidence independence.** Agreement between the two prescribed-history descriptions is a consistency clue, not a stability result. Both modes retain authored trajectories and shared analysis; neither demonstrates a retained physical photon branch. The existing polarity mismatch and referent-pending grade remain intact. `PhotonTransmitterHistoryRuntime.js:12–21` explicitly marks the provider display-only and non-evidence.
- **PG-06 — low, repaired: plot/reset wording.** The introductory and reset descriptions now refer to the default or selected plot length, consistent with the actual configurable range. No control behavior was changed.

## Verification and preservation

Known arithmetic ratio and stationary-translation cases passed before target function calls. Direct exported-function probes then confirmed aligned analyzer fraction one, empty-input fraction zero, weak-signal fraction 0.1, the quarter-unit capped fit window, and a moving observer position of four from initial position two, normalized group speed 0.5, and elapsed time four. These are independently computed algebraic expectations; no subject or reference implementation changed. They test documentation of prescribed runtime behavior, not simulation or physics.

A known TeX extraction example passed before source evaluation. All 88 final expressions render in strict KaTeX. Of 12 displays, only display 7 (floored radius) and display 12 (sum/floor analyzer fraction) changed; the other ten displays, all 12 headings, and every viewer ID are preserved against HEAD. The source `git diff --check HEAD` passes. Final direct two-file link-path and whitespace checks include this new receipt. Broad joined validation is reserved for the coordinator; no generator write was run.

## Remaining obligations

Short-window polarization fits and near-source display regularization remain limitations of the runtime, now stated accurately. The guide does not certify all root searches, full common-period sampling, field normalization, dynamical stability, or physical photon observables. Current equations are display diagnostics; the separate accepted carrier, retained dynamics, and observer map remain unresolved. No runtime-policy change is requested by this receipt.
