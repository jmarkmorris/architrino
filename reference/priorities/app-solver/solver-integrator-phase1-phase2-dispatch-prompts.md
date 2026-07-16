# Ready-to-Dispatch Thread Prompts — Solver Integrator Phases 1 & 2

Historical naming: **zombie-solver (then called the central solver)**.

Two **independent** threads to launch in parallel. Full spec: [coupled-delayed-history-integrator-dispatch-packet.md](coupled-delayed-history-integrator-dispatch-packet.md). Phase 3 (the coupled integrator) is gated on both returning; keep it a **different** thread from Phase 1 so the gate is not co-designed to pass. Do not address either thread by name.

---

## THREAD A — Phase 1: Independent blind acceptance oracle

Closure goal: Author, purely from the canonical dynamics documents and first principles, an independent regression oracle that a correct coupled delayed-history integrator passes and a subtly wrong one fails — so that a later integrator has a fixed, un-gameable target.

Hard constraint — BLIND: do **not** read, import, or reference any integrator implementation (`src/solver/app/AbsoluteHistoryRootRuntime.mjs`, `src/solver/src/*`, the legacy braid workstream runners, or any Phase-3 work). Derive every expected value from `content/markdown/aaa/dynamics/master-equation.md`, `content/markdown/aaa/dynamics/binary-dynamics.md`, and closed-form/independent computation only. If you find yourself needing the integrator to know the answer, the case is not a valid oracle case.

Build these cases (load-bearing: O1, O3, O4, O5):
- **O1 Inertial exactness.** One architrino, and mutually out-of-causal-contact architrinos, follow exact straight lines to machine precision.
- **O2 Single prescribed source, closed-form impulse.** Receiver evolved under one source on a known analytic trajectory; first causal-hit time, distance, branch factor are closed-form; compare the receiver's early trajectory to an independent high-order series/quadrature.
- **O3 1D collinear two-body.** Opposite charges under mutual delayed force; no simple closed form, so the truth is an **independently coded** reference integrator (different method, multiprecision, tiny step). Provide it; the production integrator must converge to it.
- **O4 Sub-$c_f$ circular falsification (theorem-anchored).** `binary-dynamics.md:682-717` proves a strictly sub-$c_f$ constant-speed circular orbit is impossible (partner row anti-damped). Seed the analytic circular binary; the oracle asserts the integrator reproduces the positive tangential-work sign and departs from the held circle. The theorem does not fix inward versus outward radial motion; report the evolved direction. A held circle is an automatic FAIL.
- **O5 Super-$c_f$ self-hit.** On the uniform super-$c_f$ circular branch the self-hit condition is closed form $\delta_s=2s\sin(\delta_s/2)$, $s>1$ (`binary-dynamics.md:323,142-147`); assert the self-hit root/force against it, then a curved evolved case vs an independent reference.
- **O6 $(\eta,\Delta T)$ convergence + conservation.** Convergence tables (error→0 as $\Delta T\to0$ with $\Delta T<\eta/c_f$, $\eta\to0$ jointly, `master-equation.md:1797`); energy/action residual where the delay-dynamics-energy packet supports it, else state honestly it can't.

Deliverable: a runnable oracle test suite with expected values and the independent reference integrator for O3/O5, plus a one-paragraph statement certifying no integrator code was consulted. Report-only on solver source (you may add new oracle/test files; do not edit the solver). Discipline: KaTeX; "delayed" not the disallowed variant; architrino-level, no mass. End with thread state, files changed, validation run, and a `Closure goal:`.

---

## THREAD B — Phase 2: Wire the real native kernel + add C++ self-hit + genuine history

Closure goal: Make the real C++ solver kernel actually execute in the app/bridge path (not the smoke fallback), add same-source (self-hit) roots to the C++ kernel, and provide genuine retained-history sourcing — so Phase 3 can build the integrator on a real compiled foundation with honest provenance.

Tasks:
- Add a **non-smoke** build target that compiles/exports the real solver kernel symbols, linking `architrino_solver_core` (current `src/solver/CMakeLists.txt` builds only smoke targets under `ARCHITRINO_SOLVER_BUILD_WASM`). Flip the app/bridge default off `architrino_solver_wasm_smoke.mjs` (`src/apps/photon/PhotonSolverBridgeOptions.js:1-2`) so `hasNativeMovingCircularSourceRootExport` succeeds (`src/solver/app/SolverAppBridge.mjs:9411-9415, 15413`) and the native path runs. Emit a provenance flag distinguishing native execution from `js_reference_facade`.
- **Add same-source (self-hit) causal roots to the C++ kernel** (`src/solver/src/CausalRootSolver.cpp` currently has none — 0 matches for self-hit/same-source), matching the JS runtime's self-hit residual, including super-$c_f$ curved-history roots. Bit-compare native vs JS force evaluation on shared cases as a cross-implementation check (legitimate cross-validation, distinct from self-referential golden fixtures).
- Wire `PathHistoryStreamWriter` (`src/solver/include/architrino/solver/PathHistoryStream.hpp`) as the source-history provider so emission-time source samples come from stored evolved trajectory, memory depth $h$ a first-class parameter.

Constraints: extend the zombie-solver; no parallel engine. Verify the wasm/native build in-tree (report exact build commands + outcomes); if the sandbox lacks the toolchain (emscripten/clang), say so and provide the build recipe + a CI-runnable target rather than claiming a pass. Report-only on physics conclusions — this is infrastructure. Discipline: KaTeX; "delayed"; architrino-level, no mass. End with thread state, files changed, validation commands + outcomes, and a `Closure goal:`.

---

## Adjudication (jughead, on return of both)

Thread A: confirm the oracle imported no integrator (grep its imports), that O4 asserts positive tangential work and departure rather than a held circle without prescribing radial direction, and that O3/O5 references are independently coded. Thread B: confirm the non-smoke target genuinely exports the symbol and the bridge provenance shows native execution; confirm C++ self-hit matches O5's closed-form root; confirm the native↔JS bit-compare. Only when both pass does Phase 3 dispatch.
