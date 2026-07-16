# Independent Zombie-Solver Audit (blind, evidence-first)

This record uses **zombie-solver (then called the central solver)** for the quarantined evaluator audited below.

**Date:** 2026-07-12
**Mode:** audit/report — report-only, no source edits, no generated-artifact writes
**Method:** every finding derived from the live repository; the three most material findings were re-read line-by-line and re-run by the auditor rather than taken from any prior agent, chat summary, or informal assessment. Read-only helper agents located evidence; all conclusions here are the auditor's own, checked against the cited lines.

---

## 1. Executive verdict

**The solver is not currently suitable for canonical *dynamical* theory conclusions, and its "native / Master Equation / central solver" naming overstates what actually executes. But its delayed-force *evaluation* kernel is faithful to the canonical branch law, and force-balance / linear-stability statements built on it (including the §99 non-binding result) remain legitimate.**

The precise situation:

- What runs in the braid program and the apps is a **pure-JavaScript delayed-root force evaluator** (`AbsoluteHistoryRootRuntime.mjs`, self-labeled `js_reference_facade`), operating over **prescribed analytic source motion** (a rigid circle with optional constant angular acceleration). It has **no time integrator** and evolves **no self-consistent coupled history**.
- The compiled/"native" C++ engine is **not wired into any module the apps use** (the shipped wasm is a smoke build), and its root kernel has **no self-hit path** at all.
- The two runnable *full-motion* C++ integrators named `masterEquation` and `pairInteraction` do **not** implement the delayed master equation; `masterEquation` literally discards its request and computes an **instantaneous, softened, fixed-coupling** attraction. `T3` is an instantaneous soft-sphere model.
- **No test** validates evolved coupled dynamics against an independent closed-form solution. The "analytic" tests check delay-root *geometry* on prescribed paths; golden fixtures are self-referential. So "reproduces to 1e-9" attests **self-consistency, not physical correctness**.

Bottom line: this is a correct-as-far-as-it-goes **delayed-force/root evaluator** that has been presented as a state-of-the-art native **dynamical solver**. For force balance and linear stability about a prescribed candidate orbit it is usable; for deciding dynamical or long-term behavior (dispersal, release, growth, super-field-speed evolution) it is not, and those claims are not supported at the solver level.

## 2. Canonical requirement → implementing code → test evidence

| Canonical requirement (master-equation.md / binary-dynamics.md) | Implemented on the executed (JS) path? | Code | Test evidence |
|---|---|---|---|
| Causal-root condition $\lVert X_i(T)-X_j(T_{em})\rVert=c_f(T-T_{em})$ (m-eq:567) | Yes | `AbsoluteHistoryRootRuntime.mjs:189-203` (`distance − c_f·Δt`) | root-geometry only: `absolute-history-root-runtime.test.js:37-45` |
| Sum over **all** active positive roots (m-eq:233-239, 1769) | Yes (fixed 128-grid scan + bisection, cap 32) | `:547-582` | `:37-45` (single/self roots), no multi-hit dynamical test |
| Same-source (self-hit) roots (m-eq:23; bd:176-187) | Yes, **JS only**, via **prescribed** angular accel | `:205-219, :662`; device `:115-118` | `:74` self-hit branch **sign** on a prescribed circle |
| Source-normal & receiver-normal factors $W^{rec}=\lvert(c_f-v_i\cdot\hat r)/(c_f-v_j\cdot\hat r)\rvert$ (m-eq:110-124,284-290) | Yes (magnitude); **unsigned** used for force | `:62-99`; force uses `unsignedReceiverNormalFactor` `:235-237` | `test 1` (branch weight) |
| Signed branch degree / root-ledger transitions (m-eq:609-611; bd:452,468) | Computed but **not applied to force**; sign from charge only | `signedBranchOrientation` `:75` (carried, unused in magnitude) | none dynamical |
| Genuine pre-initial retained history (m-eq:1363,1388; bd:1463) | **No** — source motion is closed-form analytic | `evaluateMovingCircularSourceHistory:126-155` | none |
| Field-speed dependence, sub/super-$c_f$ (m-eq:13; bd:142-147) | Yes in the root condition & normal factors | `:189-203, :62-99` | `test 3` hinge crossing (prescribed) |
| Adaptive / error-controlled integration; $\Delta T<\eta/c_f$ convergence (m-eq:1789-1797) | **No integrator at all** | grep: no `euler/rk/adaptive/integrateStep` in `AbsoluteHistoryRootRuntime.mjs` | none |

Native C++ mirror of the root kernel: `CausalRootSolver.cpp:100-101` (residual), `:212-215` (`m` factor), multiprecision `cpp_dec_float_50` (`:15`) — **no self-hit** (`grep same_source|self_hit` = 0 matches). Not compiled into any shipped module.

## 3. Ranked critiques

### P0 — invalidates canonical physical conclusions

**P0-1. The runnable "masterEquation" motion integrator is not the master equation.** `master_equation_accelerations` discards the request (`(void)request;`, SolverCAbi.cpp:3678) and computes an **instantaneous** softened attraction with a **fixed** coupling and softening: `factor = kBorgMasterEquationCoupling = 1.0e-4` (`:308`), `softening = 1.0` (`:309`), `strength = factor·sign·|q|/radius`, `accel += δ·strength` (`:3697-3701`). No emission time, no delay, no causal root, no field speed. Any dynamical conclusion drawn from the `masterEquation` motion path is non-canonical.

**P0-2. No coupled dynamical solver exists on any executed path.** The path the entire braid program (§82–§99) uses — `solveMovingCircularSourceCausalRoots` from `AbsoluteHistoryRootRuntime.mjs` (imported at `planar-assembled-free-particle.mjs:10`, and by 7 legacy braid workstream solver consumers) — evaluates the delayed force/roots over a **prescribed analytic rigid-circle source** (`:126-155`) and **integrates nothing** (no stepper; grep-confirmed). It therefore cannot self-consistently evolve history and cannot decide dynamical or long-term behavior. *Scope note:* force-balance residual ($\epsilon_{\rm bind}$) and linearized stability (the pencils) about a **prescribed candidate orbit** are legitimate uses of a force evaluator, so the §99 non-binding verdict survives **as a force-balance statement**; but any memory/report claim of temporal evolution — "disperses on release," "amplitude grows to 1 rad by t≈51," "long-term behavior" — is unsupported by this path and would depend on unaudited per-script integration.

**P0-2 addendum — the "run history forward → emit next-stage history" surface is exhaustively non-canonical.** A full-tree search for forward-evolution semantics (`advance|runForward|nextStage|evolveHistory|generatePathHistory|...`) returns exactly: `advance_pair_interaction_states` (MotionSampler.cpp:1084) and `regeneratePathHistoryRowsFromDynamicReplay` (SolverAppBridge.mjs:19768). The former steps with **fixed semi-implicit Euler** (`v+=a·dt; x+=v·dt`, :1114-1119) on the **softened instantaneous** `pair_interaction_accelerations`, with optional **guidance/snapping to prescribed path constraints** (`pair_constraint_guided_acceleration`, `snap_pair_interaction_states_to_constraints`, :1099-1121) — i.e. the "forward evolution" can be steered onto prescribed rails. The latter "generates path history" only as one of {sample a straight line; integrate **constant-acceleration** kinematics; run the softened pair-interaction path} (:19769-19785). **There is no function anywhere that ingests an initial architrino path history and integrates it forward under the delayed master equation to produce the next-stage history.** The retained-history *input* layer is built (rows/providers/adapters/manifests, `PathHistoryStream`, the `central-solver-retained-history-*` modules); the canonical *forward integrator* that consumes it is the missing core.

### P1 — major correctness / authority

**P1-1. "Native / state-of-the-art" is not what runs.** Shipped wasm is smoke-only (`solver_wasm_smoke.cpp:4,8,12` export three self-test functions, no kernels); the Photon default module points at it (`PhotonSolverBridgeOptions.js:1-2`); the native gate requires `_architrino_solver_solve_moving_circular_source_causal_roots_f64` (`SolverAppBridge.mjs:15413-15414`) which the smoke build does not export, so the bridge returns the JS path tagged `js_reference_facade` (`:9411-9415`). The real C++ engine is never in the loop for the apps.

**P1-2. No independent closed-form *dynamical* validation exists; "1e-9 reproductions" are self-referential.** Every "analytic" solver test checks delay-**root arithmetic** on **prescribed** kinematics — e.g. `solver_analytic_smoke.cpp:284-296,330` (hand-set linear/rigid-circle roots), `absolute-history-root-runtime.test.js:37-45,74` (prescribed receiver/self-hit). Golden-response fixtures compare solver output to its own stored output. There is **no** test that evolves multiple mutually-interacting charges under real retained history and checks against an independent reference orbit. Consequence: agreement to 1e-9 across §82–§99 attests internal consistency, not correctness — exactly the failure mode that hides a shared systematic error.

**P1-3. Self-hit is JS-only and prescribed; absent from the "native" kernel.** The C++ `CausalRootSolver` has no self-hit code (0 matches). In JS, self-hit roots are reachable only by *prescribing* a constant angular acceleration so the analytic tangential speed sweeps through $c_f$ (`:115-118`). Super-field-speed self-interaction is thus a kinematic device, not emergent dynamics, and unavailable in the compiled engine.

**P1-4. Five materially different force laws; not one authoritative solver.** Delayed branch law in the root kernels (C++ `CausalRootSolver`, JS `AbsoluteHistoryRootRuntime`, hand-duplicated); instantaneous softened attraction in `masterEquation` (SolverCAbi.cpp:3675-3705) and `pairInteraction` (`MotionSampler.cpp:514-536`); instantaneous soft-sphere in T3 (`T3BulkStep.cpp:437-457`). Only `CausalRootBatchSolver.cpp:71` genuinely reuses the canonical kernel. The shared residual is copied by hand across three files, inviting silent drift.

### P2 — numerical / architectural

**P2-1. No refinement control where the theory demands it.** Canonical docs require adaptive stepping and $(\eta,\Delta T)$ convergence (m-eq:1789-1797); none exists. Root finding uses a fixed 128-subdivision scan, so two roots inside one subinterval are not separately resolved (fixed-grid root-miss). The `errorBudget/projectionTolerance` object the Photon layer attaches (`PhotonFormulaRuntime.js:434-443`) is **dropped** — `createMovingCircularSourceRootRequest` never copies it into the normalized request, so it is metadata only on this path.

**P2-2. Signed branch degree not fed to the force.** The theory needs the signed sheet for fold transitions and self-hit tangential sign (m-eq:609-611; bd:452,468). `signedBranchOrientation` is computed but the force magnitude uses the unsigned factor and takes its sign from charge alone (`:75, :235-237`). The canonical $W^{rec}$ is a modulus, so magnitude is fine, but the signed-degree physics is not exercised in the returned force — needs a dedicated check.

**P2-3. Distance clamps, not principled regularization.** `Math.max(1e-9, r)` (`:226`) and `Math.max(1e-12, r)` (`SolverAppBridge.mjs:9562`) guard divide-by-zero; acceptable, but their effect near close approach is undocumented and not a Plummer-style softening (that lives only in the non-canonical motion paths).

### P3 — documentation / maintainability

**P3-1. Naming overstates execution.** "central solver," "Master Equation solver," "native," "absolute history" imply more than a prescribed-orbit JS force evaluator delivers; the honest label `js_reference_facade` is buried in the bridge. **P3-2.** Hand-duplicated residual across C++/JS/MotionSampler should be one kernel.

## 4. File:line citations for material findings
All verified by direct read/run by the auditor unless marked *(agent-located, structurally spot-checked)*:
- Analytic prescribed source; no integrator: `AbsoluteHistoryRootRuntime.mjs:111-155`, grep-confirmed absence of steppers/imports.
- Braid/§99 consumes this path: `planar-assembled-free-particle.mjs:10`; 7 legacy braid workstream files import `AbsoluteHistoryRootRuntime.mjs`.
- Faithful delayed kernel (counterevidence): residual `:189-203`, normal factors `:62-99`, multi-root `:547-582`, self-hit `:205-219`; test 4/4 green.
- `masterEquation` instantaneous toy: `SolverCAbi.cpp:3678` `(void)request;`, `:308-309` fixed coupling/softening, `:3697-3701`.
- Native not wired: `solver_wasm_smoke.cpp:4,8,12`; `PhotonSolverBridgeOptions.js:1-2`; `SolverAppBridge.mjs:9411-9415,15413-15414`.
- C++ kernel has no self-hit: `CausalRootSolver.cpp` (0 self-hit matches); residual `:100-101`, `m` `:212-215`.
- `pairInteraction`/T3 force laws *(agent-located, structurally spot-checked)*: `MotionSampler.cpp:514-536`; `T3BulkStep.cpp:437-457`.
- No independent dynamical test *(agent-catalogued; pattern verified)*: `solver_analytic_smoke.cpp:284-296,330`; `absolute-history-root-runtime.test.js:37-45,74`.

## 5. Counterevidence supporting solver correctness
- The **delayed-force/root evaluation kernel is faithful** to the canonical branch law: residual $distance-c_f\Delta t$, receiver-normal factor $(c_f-v_i\cdot\hat r)/(c_f-v_j\cdot\hat r)$, multi-root scan+bisection with dedupe, and a self-hit branch. JS kernel test passes 4/4 (branch weight, self-hit sign, field-speed hinge crossing, fixed-ω backward compatibility). The C++ mirror matches and uses 50-digit multiprecision.
- Therefore **force-balance and linear-stability conclusions are not undermined**: the §99 non-binding verdict ($\epsilon_{\rm bind}\approx1.0$) is a force-residual statement the evaluator can legitimately make. The audit narrows *which* claims are safe (force balance, linearization) versus unsafe (temporal evolution, long-term fate), rather than voiding the kernel.

## 6. Minimal reproductions (top-3 findings)
- **P0-1:** `sed -n '3675,3705p' src/solver/src/SolverCAbi.cpp` → `(void)request;` and fixed `kBorgMasterEquationCoupling`; the delayed law is absent.
- **P0-2 / P2-1:** `grep -nE "rungeKutta|euler|integrateStep|adaptive|WebAssembly|\\.wasm|^import" src/solver/app/AbsoluteHistoryRootRuntime.mjs` → none; and `sed -n '126,155p'` shows source position from a closed-form circle → no evolved history, no integration.
- **P1-1:** `sed -n '1,14p' src/solver/wasm/solver_wasm_smoke.cpp` (three smoke exports) + `sed -n '1,2p' src/apps/photon/PhotonSolverBridgeOptions.js` (default = smoke) + `grep -n _architrino_solver_solve_moving_circular_source_causal_roots_f64 src/solver/app/SolverAppBridge.mjs` (required symbol, absent from smoke) → `js_reference_facade` executes.

## 7. Repair sequence (preserve infrastructure, fix the physical core)
1. **Truth-in-labeling now (cheap, high-value).** Gate the instantaneous `masterEquation`/`pairInteraction` motion paths and T3 out of any "canonical evidence" status; surface `js_reference_facade` in run provenance so no report can call it "native." No physics lost.
2. **Build the missing coupled DDE integrator** — the real gap. Retained-history buffer (the native `PathHistoryStream.cpp` already exists), implicit causal-root solve each step, adaptive stepping with $\Delta T<\eta/c_f$ and an $(\eta,\Delta T)$ convergence test, per m-eq:1759-1797. This is what turns a force evaluator into a solver.
3. **Wire the native kernel into a real (non-smoke) build** and flip the bridge to use it; **add self-hit to the C++ kernel** so super-$c_f$ self-interaction exists outside the JS prescribed-α device.
4. **Add independent dynamical regressions:** a sub-$c_f$ two-body delayed orbit vs a semi-analytic reference; a uniform-motion self-consistency (no self-hit) check; a super-$c_f$ curved self-hit case vs a hand-integrated reference. Only these convert "1e-9 self-agreement" into physical validation.
5. **Keep the JS force/root evaluator as a validated reference** for force-balance/linearization; stop presenting prescribed-orbit evaluation as evolution.
6. **Feed `signedBranchOrientation` into the force** where signed degree matters; add a fold/self-hit sign regression.

## 8. Can it decide the long-term behavior of a super-field-speed binary with partner and personal self-hits?
**No — not presently, by any executed path.** (i) There is no coupled integrator anywhere on the executed path, so "long-term" is never evolved. (ii) The JS path evaluates forces on a **prescribed** analytic orbit; it cannot let the orbit be *determined* by the delayed interaction, which is the whole question for a super-$c_f$ binary. (iii) Self-hit exists only in JS and only via a prescribed angular-acceleration device; the compiled C++ kernel has **no** self-hit. (iv) No independent dynamical validation exists to trust such a result even if produced. The most it can currently do is score the **force balance and linear stability of a prescribed candidate orbit** — useful for screening, but categorically not a decision about long-term dynamical fate.

## 9. Uncertainties / not verified
- I did not read all 51 C++ files line-by-line; findings on `pairInteraction`, `T3`, and the test catalog beyond the three P0/P1 items I re-read rest on read-only agent citations that I structurally spot-checked, not full personal reads.
- Whether individual braid run-scripts (e.g. the "native retained-history confirmation run," the §90 nonlinear-saturation run) add their **own** ad-hoc time-stepping on top of the evaluator was **not** audited; the zombie-solver itself provides none, so any such integration is per-script and unvalidated. This is the key follow-up for judging the dynamical memory claims (§83 dispersal, §90 growth).
- The signed-branch-orientation impact on specific braid numbers needs a dedicated numeric check (not run here).
- I could not compile/run the native C++ suite in this sandbox; native "smoke pass" claims rest on their source assertions, not a live run here.

## 10. Discipline
No source edits, no generated-artifact writes, no git commands. This report is a new priority-area document, not a change to solver code, corpus prose, or generated outputs.

---

Thread state: DONE
Mode: audit/report
Authority used: report-only (one new priority document written; no source/generated edits)
Files changed: none in solver source or generated artifacts; added this audit report under `reference/priorities/app-solver/`
Validation: `node --test tests/absolute-history-root-runtime.test.js` → 4/4 pass (kernel counterevidence); grep/read verifications of SolverCAbi.cpp:3678, solver_wasm_smoke.cpp, PhotonSolverBridgeOptions.js, SolverAppBridge.mjs:15413, CausalRootSolver.cpp (0 self-hit), AbsoluteHistoryRootRuntime.mjs (no integrator). Heavy native build/tests not run (sandbox).
Closure goal: build and validate a genuine coupled delayed-history integrator (retained history + implicit per-step causal-root solve + adaptive $(\eta,\Delta T)$ convergence, native kernel wired in and self-hit added), gated by an independent closed-form dynamical regression — before any further dynamical or long-term braid conclusion is trusted.
