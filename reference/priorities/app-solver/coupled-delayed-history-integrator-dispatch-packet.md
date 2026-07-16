# Dispatch Packet — Coupled Delayed-History Integrator + Independent Dynamical Regression

Historical naming: **zombie-solver (then called the central solver)**.

**Date:** 2026-07-12
**Status:** ready to dispatch (authored by jughead from the 2026-07-12 zombie-solver audit)
**Depends on / supersedes framing in:** [zombie-solver audit](central-solver-independent-audit-2026-07-12.md)
**Discipline:** extend the zombie-solver; do not create a parallel solver. Report-only until the operator reviews diffs.

---

Closure goal: Build and validate a genuine coupled delayed-history integrator for the canonical Architrino equation of motion — retained evolved history, a per-step implicit causal-root solve over all sources including self-hit, and adaptive $(\eta,\Delta T)$ convergence, with the real native kernel wired in — gated by an **independently authored** dynamical regression suite, so that dynamical and long-term conclusions become trustworthy for the first time.

## Why this exists (what the audit established)

The path everything currently runs on (`AbsoluteHistoryRootRuntime.mjs`, `js_reference_facade`) is a **faithful delayed-force/root evaluator over prescribed analytic orbits with no integrator**. Its force kernel is canonical and passes its unit tests; that is genuine and must be preserved. What is missing — and what this packet builds — is the coupled *dynamical* layer: evolving the trajectory so the motion is *determined by* the delayed interaction rather than assumed. The audit's P0/P1 items (instantaneous "masterEquation" toy at `SolverCAbi.cpp:3678`; native engine not wired, smoke-only wasm; self-hit absent from the C++ kernel; no independent dynamical validation) are the concrete gaps to close.

Standing scope boundary carried from the audit: **force-balance ($\epsilon_{\rm bind}$) and linear-stability (pencil) conclusions built on the evaluator remain valid** (the §99 non-binding verdict survives). This packet does not relitigate those; it builds the tool required before any *temporal / long-term* claim (dispersal, release, growth, super-$c_f$ fate) can be trusted.

## Non-negotiable principles

1. **One authoritative solver.** Extend the zombie-solver (native `architrino_solver_core` + bridge). Do not add a parallel default engine. The instantaneous `masterEquation`/`pairInteraction` motion paths and T3 soft-sphere are **gated out of any canonical-evidence status** as part of this work (truth-in-labeling, audit P0-1/P1-4).
2. **Genuine evolved history — never prescribed motion.** Source positions at emission times must be read from the **actual integrated trajectory** stored in retained history (reuse `PathHistoryStreamWriter`, `src/solver/include/architrino/solver/PathHistoryStream.hpp`), not from a closed-form circle. Prescribed-analytic sources are allowed only inside the regression oracle as *known-input* cases, never as the production motion representation.
3. **Tolerances must control refinement.** Request tolerances must feed step control and root refinement and change the answer; they may not be dropped metadata (audit P2-1). Any tolerance the integrator accepts must be demonstrably consumed.
4. **Carry the signed branch degree** into the force where the theory requires it (master-equation.md:609-611; binary-dynamics.md:452,468), not just the unsigned magnitude (audit P2-2).
5. **Honest provenance.** Run records must state truthfully whether the native kernel or the JS reference executed. No output may be labeled "native" when the JS facade ran.

## Phase 1 — Independent acceptance oracle (BUILD THIS FIRST, author it BLIND)

The regression suite is the gate, and it is only meaningful if it is authored **independently of the integrator's internals** — ideally by a different thread — derived from the canonical documents and first principles, so the integrator cannot be tuned to pass it. Build the oracle before wiring the integrator to it. Required cases:

- **O1 — Inertial exactness.** A single architrino, and mutually out-of-causal-contact architrinos, must follow exact straight lines to machine precision. Catches gross integrator/history bugs.
- **O2 — Single prescribed source, closed-form impulse.** A receiver evolved under one source on a *known analytic* trajectory: the first causal-hit time, distance, and branch factor are closed-form (cf. the existing root-arithmetic tests). Compare the receiver's early evolved trajectory to an independent high-order series/quadrature. Tests force→motion coupling with a known source.
- **O3 — 1D collinear two-body, independent reference.** Collinear opposite charges under the mutual delayed force. There is no simple closed form, so the truth is an **independently coded** reference integrator (different method, multiprecision, tiny fixed step). The production integrator must **converge to it** under refinement.
- **O4 — Sub-$c_f$ circular falsification (theorem-anchored).** Seed the analytically constructed symmetric circular binary. Binary-dynamics.md:682-717 **proves** a strictly sub-$c_f$ constant-speed circular orbit is impossible (partner-only row is anti-damped). A correct integrator must therefore **not** sustain it: it must reproduce the analytic positive tangential-work sign and an evolved departure from the held circle. The theorem does not determine whether the radial motion is inward or outward; that direction is an output. (An integrator that holds the circle is wrong.)
- **O5 — Super-$c_f$ self-hit, closed-form root + coupled reference.** On the prescribed uniform super-$c_f$ circular branch the self-hit condition is closed form, $\delta_s = 2s\sin(\delta_s/2)$, $s=\lVert V\rVert/c_f>1$ (binary-dynamics.md:323, 142-147); check the self-hit root and force against it. Then a curved evolved super-$c_f$ case vs an independent reference integration for the coupled self-hit dynamics.
- **O6 — $(\eta,\Delta T)$ convergence and conservation.** For O2/O3/O5, produce convergence tables showing error → 0 as $\Delta T\to0$ with $\Delta T<\eta/c_f$ and $\eta\to0$ jointly (master-equation.md:1797). Where the delay-dynamics energy/action packet is defined ([delay-dynamics-energy](../../../content/markdown/aaa/validation/simulations/action-energy/delay-dynamics-energy.md), binary-dynamics.md:1190), report the energy/action residual; state honestly if the ledger is too open to serve as a check.

Acceptance oracle deliverable: a test suite that a correct integrator passes and a subtly wrong one fails, with O1/O3/O4/O5 as the load-bearing cases. No production-integrator code may be imported into the oracle.

## Phase 2 — Wire the real native kernel; add self-hit; feed genuine history

- Add a **non-smoke** build target that compiles and exports the real solver kernel symbols (linking `architrino_solver_core`; the current `CMakeLists.txt` only builds smoke targets, `ARCHITRINO_SOLVER_BUILD_WASM` gates a smoke build). Flip the app/bridge default off `architrino_solver_wasm_smoke.mjs` so `hasNativeMovingCircularSourceRootExport` succeeds and the native path actually runs (audit P1-1: `SolverAppBridge.mjs:9411-9415, 15413`; `PhotonSolverBridgeOptions.js:1-2`).
- **Add same-source (self-hit) roots to the C++ kernel** (`CausalRootSolver.cpp` currently has none), matching the JS runtime's self-hit residual, including super-$c_f$ curved-history roots. Bit-compare native vs JS force evaluation on shared cases as a cross-implementation check (this is legitimate cross-validation, distinct from self-referential golden fixtures).
- Wire `PathHistoryStreamWriter` as the source-history provider so emission-time source samples come from stored evolved trajectory, with memory depth $h$ a first-class parameter (master-equation.md:334, 504).

## Phase 3 — The coupled delayed DDE integrator

Implement the state-dependent delay-differential integrator per master-equation.md:1759-1797:

- **Per step**, for each receiver $i$ and every source $j$ (including $j=i$): solve the implicit causal constraint $\lVert X_i(T)-X_j(T_{em})\rVert=c_f(T-T_{em})$ over retained history, **enumerate all** positive roots (not earliest/latest only), and sum branch contributions with source-normal and receiver-normal factors and signed degree.
- **Predictor-corrector / fixed-point iteration** each step because the delay depends on the solution being computed (master-equation.md:1793); iterate to `rootTolerance`/state tolerance.
- **Adaptive time-stepping** with $\Delta T<\eta/c_f$ enforced and step size responsive to root proximity/multiplicity; error-controlled, tolerances actually consumed.
- **Field speed $c_f$ explicit** throughout; sub/super-$c_f$ handled by the same code path (self-hit roots simply present or absent).
- Emit per-step provenance: active/excluded root ledger with signed degree, Jacobian floors, root-transport residual (master-equation.md:258), and native-vs-JS execution tag.

## Phase 4 — Run the gate; classify; deprecate the toys

Run the Phase-1 oracle against the Phase-3 integrator. Produce: pass/fail per O-case, the $(\eta,\Delta T)$ convergence tables, and an honest capability classification (implemented+validated / weakly validated / partial / declared-not-implemented) per capability. Gate the instantaneous motion paths out of canonical-evidence status with a status guard and a one-line provenance note.

## Acceptance gate — what "validated" means here

Native release of any **dynamical/long-term** conclusion is unlocked only when: the native kernel actually executes (provenance-verified, not `js_reference_facade`); self-hit is present and matches the closed-form O5 root; O1–O5 pass with O4 reproducing the positive tangential-work sign and an evolved departure rather than a sustained circle; O6 shows genuine $(\eta,\Delta T)$ convergence to the independent references; and the oracle is confirmed to have been authored without importing the integrator. Until then, dynamical claims stay blocked and only force-balance/linear-stability statements are admissible.

## Adjudication hooks (what jughead will check on return)

Oracle authored blind (no integrator import; ideally a separate thread); convergence tables are real refinement, not a passthrough comparing code to itself; the native path genuinely runs (inspect provenance + confirm the non-smoke build exports the symbol); self-hit present in C++ and matching O5; O4 positive tangential work and non-hold departure reproduced (a held circle is an automatic fail, while radial direction is measured); tolerances demonstrably change results; instantaneous toys gated out. zombie-solver ownership respected; "delayed" not the disallowed variant; architrino-level, no mass.

## Sequencing / parallelization

Phase 1 (oracle) and Phase 2 (native wiring + self-hit) are independent and should run as **two parallel threads**; Phase 3 depends on both; Phase 4 is the join. Strong recommendation: the **oracle thread and the integrator thread are different threads** so the gate is not co-designed to pass. This is a multi-day engineering effort, not a single run — scope it as a workstream with the four phases as checkpoints.

## Expected output

A non-smoke native build target + bridge default flip; C++ self-hit; the retained-history-fed coupled DDE integrator on the zombie-solver path; the independent oracle suite (O1–O6) with convergence tables; provenance records; the capability classification; and status guards demoting the instantaneous motion paths. Report thread state, authority, files changed, validation commands + outcomes, and a `Closure goal:` for the next step.
