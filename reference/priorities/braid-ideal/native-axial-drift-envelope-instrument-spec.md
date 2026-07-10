# Native Axial-Drift Envelope Instrument — Build Spec (CTO Handoff)

Claim level: build spec / instrument handoff. This packet specifies a native diagnostic that measures the spindle braid's envelope semiaxes under axial drift. It is a CTO/solver-owned build (extends the existing native retained-history runner; the central solver contract is unchanged). It is the empirical half of the [boosted-delay shape-attractor theorem target](../master-equation-closure/boosted-delay-attractor-theorem-target.md).

## What it measures and why

One diagnostic answers three open Lorentz-recovery questions at once:

- $\xi(u)=R_\parallel(u)/R_\perp(u)$ vs $1/\gamma=\sqrt{1-u^2}$ — the **ruler arm** (tested as *relative flattening*, see caveat 1).
- The composed transverse shape tensor $q_\perp(v_1,v_2)$ and its anisotropy decay — the **$\sigma=0$** corollary.
- The constituent bidirectional-wake phase offsets (from the one-way leg difference) — the **$\mathcal S_{\text{asm}}$** synchrony-selection corollary.

## Architecture verdict: REUSE the solver contract, small BUILD in the release integrator

Uniform axial drift is **already a native capability**. The native central solver `src/solver/app/AbsoluteHistoryRootRuntime.mjs` (`solveMovingCircularSourceCausalRoots`) carries `centerVelocity` on the moving-circular source and `velocity` on the receiver; a read-only prototype driving `source.centerVelocity = {0,0,u}` reproduced the reference screw-rigid drift wake to ~4 significant figures across all six layers at $u=0$ and $u=0.2$. **No central-solver contract or ABI change is required** — this preserves solver ownership.

The gap is entirely in the *release-integrator seed, held prehistory, and readback* of `scripts/braid-ideal/spindle-braid-native-retained-history-confirmation-run.mjs`, which is rest-only (`heldSourceModel` hardcodes `centerVelocity {0,0,0}`; `rigidPosition`/`rigidVelocity` have no z-drift). This is a knob-and-readback extension to the existing native runner, **not** a new or parallel solver.

## Minimal extension (five touch points + fixture)

All touch points are already exported (the test file imports them), so the change is local and testable.

1. **Contract field.** `DECLARED.axialDrift = 0` — boost velocity $u$ along $+z$ (the aligned spin axis), in units of $c_f$. Expressed through the existing `centerVelocity`/receiver-`velocity` surfaces; no native-ABI field is added.
2. **Held prehistory + seed.** `rigidPosition(site,t)` z-component $\to z_0 + \texttt{axialDrift}\cdot t$; `rigidVelocity(site,t)` z-component $\to \texttt{axialDrift}$. Drifts both the initial `states` seed and the analytic held tail consistently.
3. **Held source model.** `heldSourceModel(site)` $\to$ `centerVelocity: {x:0,y:0,z: DECLARED.axialDrift}` (keep `centerAtEpoch.z = z0`; with `epochTime 0` this gives $z(t)=z_0+ut$, matching point 2). Released-segment sources are unchanged (they already carry `seg.v`).
4. **Cadence pin (drift steady state).** In `selectTabledRow`, when `axialDrift ≠ 0` set the rail pin $\omega = \sqrt{1-u^2}/\cos\alpha_M$ (middle transverse speed $= c_f/\gamma$, total middle site speed $= c_f$), matching the `driftSupportRatios` convention. Leave $\alpha_M$ **free** rather than pinned — letting the tilt relax is the whole point over the screw-rigid reference.
5. **Envelope readback.** Per record, from the relaxed `states`: for each layer $a$, $R_a=$ mean pair radius, $\alpha_a=$ mean tilt ($\operatorname{atan2}(z,\rho)$ of the two sites); then $R_\parallel=\max_a|R_a\sin\alpha_a|$, $R_\perp=\max_a R_a\cos\alpha_a$, $\xi=R_\parallel/R_\perp$, alongside $1/\gamma=\sqrt{1-u^2}$ and $\lambda=R_\perp/R_\perp(u{=}0)$. Definitions match canon ([mathematics-terminology.md](../../../content/markdown/aaa/archie/mathematics-terminology.md): $\xi\equiv R_\parallel/R_\perp$, $\lambda\equiv R_\perp/R_{\perp,0}$). For the $\sigma$ measurement, also record the full transverse $2\times2$ block of the cycle-averaged shape tensor (not only its max), so a two-drift-direction run yields $q_{\perp1},q_{\perp2}$.
6. **Validation fixture** (mirror `tests/braid-ideal-spindle-braid-native-retained-history-confirmation-run.test.js`): (a) at `axialDrift=0` every existing assertion and the seed envelope are unchanged (regression guard); (b) `heldSourceModel` with drift equals `rigidPosition/rigidVelocity` under `evaluateMovingCircularSourceHistory` at sample times; (c) at small $u$ the native single-time inward wake equals `driftSupportRatios` to ~1e-3; (d) the recorded envelope is finite and $R_\perp$ scales as $\lambda$ over a short release.

## Two load-bearing caveats

1. **Test the ruler law as relative flattening, not the raw ratio.** The raw layer-max gives $\xi(0)=0.707\neq1/\gamma(0)=1$, because $R_\parallel$ and $R_\perp$ are taken from different layers at rest. The Lorentz claim to test is $\xi(u)/\xi(0)$ vs $1/\gamma$ (relative flattening), or a properly reduced single-envelope definition — not $\xi(u)=1/\gamma$ directly.
2. **The native free-tilt release is mandatory.** The screw-rigid reference `driftFixedPoint` breaks down for $u\geq0.4$ (unphysical $\lambda\to2.4$–$3.0$, support ratios go negative), so it cannot answer the ruler question. Only the native retained-history release with free tilt and released wake tail is valid evidence.

## Runtime / feasibility

Buildable now. A full-fidelity drifting release (3 rotations, $dt=0.0025$) is ~minutes per $u$ through the native solver, so the built diagnostic should expose the existing `budgetMs`/`resumeState` chunking (already in `runRelease`) and sweep $u\in\{0,0.2,0.4,0.6\}$ as resumable cells. A coarse-$dt$, 1–2 rotation pilot is enough to see whether $\xi(u)/\xi(0)$ tracks $1/\gamma$ before committing to the fine sweep.

## Ownership note

Native solver root engine (`AbsoluteHistoryRootRuntime.mjs`) is untouched; drift lives in the existing `centerVelocity`/velocity surfaces; only the runner's seed and readback grow. This is CTO/solver-lane work and should be built and validated under the central-solver architecture and validation-gate policy, not as reference/comparison JS.

## Build + run status (2026-07-10)

BUILT. All five touch points and the four-part fixture are implemented in `scripts/braid-ideal/spindle-braid-native-retained-history-confirmation-run.mjs` (contract field `DECLARED.axialDrift`; z-drift through `rigidPosition`/`rigidVelocity`/`heldSourceModel`; the drift cadence pin $\omega=\sqrt{1-u^2}/\cos\alpha_M$ with $\alpha_M$ free, applied in `selectTabledRow`; the envelope readback `envelopeReadback` plus the cycle-averaged transverse block `transverseShapeTensorBlock` and the constituent-leg readback `constituentPhaseOffsets`; a top-level resumable `--drift-envelope` sweep). The `AbsoluteHistoryRootRuntime.mjs` central solver is unchanged. Fixture parts (a)–(d) pass and the 29-row rest-only regression is unchanged. Release is at the frozen gauge-invariant coupling $\kappa_{\rm eq}=1/R_M(\rm eq)=0.28623$ (fitted once at $u=0$; the bare-channel fitted $\kappa^\star$ under-supports and collapses the envelope), seeded from the $u=0$ rail-pinned equilibrium shape; the screw-rigid `driftFixedPoint`/`driftRailPinnedEquilibrium` is used only to set $\kappa_{\rm eq}$ and the $u=0$ seed shape, never as evidence (caveat 2 confirmed: it clamps $\lambda\to3$ and loses the basin at $u\ge0.4$).

Reproduce: `node scripts/braid-ideal/spindle-braid-native-retained-history-confirmation-run.mjs --drift-envelope --row=7 --u-grid=0,0.2,0.4,0.6 --drift-rotations=0.5 --drift-dt=0.001 --tag=fine2` (resumable per $u$-cell).

### Results — the ruler arm ($\xi$, S2)

The bare braid coherently expands during release (the un-absorbed rail pump, the Row 7 finding), so the ruler law is read as **relative flattening at matched rotation** $\xi(u,t)/\xi(0,t)$ vs $1/\gamma$ (caveat 1; raw $\xi(0)\approx0.706$ reproduced). At **$u=0.2$ the ruler law holds**: $\xi(u)/\xi(0)$ descends from $\approx1.0$ through $1/\gamma=0.9798$, closest approach $0.9813$ (residual $+0.0015$) at $\approx0.45$ rotation. At **$u=0.4$ and $u=0.6$ the ruler law is not confirmed in the bare release**: the axis-sector tilt runaway (scoped *out* of the theorem) contaminates the shape envelope before it relaxes — $\xi(u)/\xi(0)$ dips toward $1/\gamma$ once ($0.988$ at $u=0.4$, rot $0.25$; residual $0.071$) then diverges to $\gtrsim1.9$ as $R_\parallel$ overtakes $R_\perp$. This directly bears on the theorem's **decoupling hypothesis**: the shape sector relaxes to the oblate ruler at small drift, but the native bare release does *not* cleanly decouple the shape sector from the axis-sector flutter at $u\ge0.4$ — a structured-sea axis absorber (the same one the $A_0$ release needs) appears necessary before the ruler can be read at larger drift.

### Results — transverse isotropy ($q_\perp$, S3) and synchrony ($\mathcal S_{\rm asm}$, S4)

The cycle-averaged transverse block $q_\perp$ carries a mild anisotropy that grows with drift ($0.577\to0.655$ from $u=0$ to $0.6$ at rot $0.2$; off-diagonal $q_{xy}$: $-0.043\to-0.086$) — the single-axis residual; the full $2\times2$ block is recorded so a two-drift-direction run yields $q_{\perp1},q_{\perp2}$ for the $\sigma$ shear. The constituent one-way-leg half-difference (the $\mathcal S_{\rm asm}$ simultaneity offset) is **exactly $0$ at $u=0$** and grows monotonically: middle-pair half-difference $0.103$ ($u=0.2$), $0.223$ ($u=0.4$), $0.413$ ($u=0.6$) — the fore-aft leg asymmetry $\delta\tau\sim(v/c_f^2)x'$ read directly from the native root machinery.

## Oblique two-axis extension — Corollary 1 ($\sigma\to0$) run (2026-07-10)

The scalar `axialDrift` was generalized to a drift 3-vector via `DECLARED.driftAngle` $\theta$ (angle between drift and the spin axis; drift $=u\,(\sin\theta,0,\cos\theta)$), threaded through `rigidPosition`/`rigidVelocity`/`heldSourceModel` exactly as the axial knob (`centerVelocity` is already a 3-vector, so the central solver is untouched); $\theta=0$ regresses the axial path exactly. New readback: `braidAxisRow` now returns the spin-axis unit vector $\hat n$, and `transverseShapeTensorBlock` takes a frame normal so $\sigma=(q_{\perp1}-q_{\perp2})/(q_{\perp1}+q_{\perp2})$ is read in the **drift frame** (the plane $\perp\hat d$). CLI `--drift-angle` (deg). Fixture part (e) added; the 33-row axial+rest suite is unchanged.

Run at $u=0.2$, row 7 V5, $dt=0.001$, $0.5$ rot, native free-tilt release:

**(1) Does the spin axis anchor to the drift? No.** In both $\theta=30°$ and $\theta=90°$ the oblique drift immediately torques the axis and it **tumbles** rather than realigning: $\theta=30°$ axis-vs-drift wanders $67°\to89°$ (spin axis ends nearly $\perp$ drift; tilt-vs-$z$ swings to $\sim83°$); $\theta=90°$ axis-vs-drift wanders $66°\to64°$ non-monotonically while tilt-vs-$z$ swings past the equator to $120°$. There is no monotonic orientation-torque anchoring toward $\hat d$ in the bare braid — the same unresolved axis-sector flutter (`spindle-braid.md` "Motion, Inertia, Isotropy") that closes the bare release fatal, now excited *directly* by the transverse drift component even at small $u$.

**(2) Does $\sigma$ decay to $0$? Only transiently, and contingent on the axis — not a settled $\sigma=0$.** $\theta=30°$: $\sigma$ falls $0.797\to$ a near-zero minimum $\mathbf{0.015}$ at rot $0.35$, then **rebounds** to $0.336$ — a clear $\sigma\to0$ *tendency* (Corollary 1 direction) that does not hold because the axis keeps tumbling. $\theta=90°$: $\sigma$ does **not** decay — it dips only to $0.269$ then **grows to $0.603$** (the shear/triaxial residual survives). So the composed transverse shear does not settle to isotropy in the bare release.

**Bearing on Corollary 1 and the decoupling hypothesis.** Corollary 1 ($\sigma\to0$ under relaxation to the oblate spheroid about $\hat v_{\rm comb}$) is **conditional on the shape sector relaxing while the axis realigns with the drift**. The instrument shows the axis does *not* realign in the bare braid (it tumbles), and correspondingly $\sigma$ shows at best a transient dip ($\theta=30°$) or grows ($\theta=90°$). This is the oblique counterpart of the axial finding that the axis-sector flutter contaminates the shape sector at $u\ge0.4$: the shape/axis **decoupling hypothesis fails for oblique drift in the bare braid**, and a settled $\sigma=0$ test of Corollary 1 requires the structured-sea axis absorber (the same one the $A_0$ native release needs) to anchor $\hat n\to\hat d$ first. Reproduce: `--drift-envelope --row=7 --u-grid=0,0.2 --drift-angle=30|90 --drift-rotations=0.5 --drift-dt=0.001`.
