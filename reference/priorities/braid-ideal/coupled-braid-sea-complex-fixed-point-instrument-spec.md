# Coupled Braid+Sea Complex Fixed-Point Instrument — Global Angular-Momentum-Drain Build Spec

Claim level: build spec / instrument handoff. This packet scopes the instrument for the object the [Section 70](fold-crossing-chart-spec.md#70-the-tangential-sea-no-go-and-the-braidsea-complex-reframe) reframe selected: the **self-consistent braid+sea complex fixed point**, solved jointly, whose success criterion is a **global angular-momentum balance** rather than a local equatorial rail brake. It extends the runner only (`spindle-support-ratio-targeted-search.mjs` and `spindle-braid-native-retained-history-confirmation-run.mjs`), reusing the built co-drift dynamical-sea surfaces and the §69 coupled breathing–flutter pencil; the central solver `AbsoluteHistoryRootRuntime.mjs` is untouched. It is a seed-grade, operator-gated, fail-closed instrument — it authorizes no release.

It is the shared closure instrument for **S1/S2** (the rail-pump absorption), the **axis-anchor coherence** ($\hat n\to\hat d$, settled), and the mass-map **$A_0$** native release — the three obligations the boosted-delay grand convergence ([../master-equation-closure/boosted-delay-attractor-theorem-target.md](../master-equation-closure/boosted-delay-attractor-theorem-target.md)) funnels through one structured-sea object.

## Why this instrument (what Section 70 changed)

Section 70 proved the **Tangential-Sea No-Go**: no cap-organized sea supplies a net cycle-averaged **tangential** force on the middle **equatorial** rail (exact $m=0$ bar; static $Q<10\%$ certified; the one dissipative $\chi''(3\omega)$ channel independently closed). Every bare and internal channel is likewise closed (bare self-hit caps $2/3$ even super-field §66; cross-hit ejective §14; §68(a) breathing closed at linear and parametric grade). So the deficit cannot be absorbed by any **local** mechanism.

The reframe: the "$\approx0.076$ deficit" is a **local equatorial-rail** quantity manufactured by the bare-release protocol, which freezes three coordinates — the middle rail speed $\beta_M$ (pinned exactly at $c_f$), the internal-deformation (breathing/shape) coordinate, and the sea (passive). The No-Go forbids a **local equatorial** brake but **not** a **global angular-momentum drain**: the rail pump injects angular momentum at the equator, and the sea provably carries tangential/orientational authority on the **off-equatorial** channels — the tilted inner (Row-4 native $+0.117$) and the axis-orientation torque (§68, the rifle-bullet stiffness $k(u)$). The question no bare instrument can pose:

> Does the middle's rail-pump angular momentum **transport off the equator** — through the now-dynamical §69 internal-deformation coordinate — into the inner/axis sector, where the sea **drains** it, so the **total** angular-momentum budget of the braid+sea complex closes in steady state, with **no local equatorial brake**?

This instrument makes $\beta_M$, the deformation coordinate, and the sea **all dynamical at once**, and books the **global angular-momentum flow** to answer it.

**This supersedes the tangential half of [structured-sea-shared-absorber-instrument-spec.md](structured-sea-shared-absorber-instrument-spec.md).** That packet asked one structured sea to supply the *local* $\ge1/3$-pump rail brake **and** anchor the axis; the local rail brake is now barred (§70). The sea's axis-anchor / angular-momentum-drain role is retained and is exactly the off-equatorial authority this instrument leans on.

## The object it solves (the joint fixed point)

A self-consistent fixed point of the coupled delay dynamics over the joint coordinate vector

$$
\mathcal Q=\big(\;\underbrace{R_I,R_M,R_O,\ \omega}_{\text{size + cadence (incl. }\beta_M=\omega R_M/c_f\text{)}}\;,\;\underbrace{\hat n}_{\text{axis}}\;,\;\underbrace{s_L,\ \dot s_L}_{\text{§69 deformation}}\;,\;\underbrace{\Xi_{\text{sea}}}_{\text{dynamical co-drift sea}}\;\big),
$$

subject to three simultaneous closure conditions (none of which the bare release imposes jointly):

1. **Radial/size basin** — the bare V5 self-equilibration (§57/§58), retained: net radial force zero per layer with the rail-pin size feedback $\omega=c_f/(R_M\cos\alpha_M)$; symmetric radial Jacobian negative-definite. Already native-measured at rest; this instrument keeps it as a live constraint, not a frozen seed.
2. **Global angular-momentum steady state** — $\dfrac{d}{dt}\langle J_{\text{tot}}\rangle_{\text{cycle}}=0$ for the braid+sea complex, where the rail-pump injection is balanced by the sea drain **routed through the off-equatorial channels**, not by a local equatorial force. This replaces the bare framing's "middle rail tangential balance."
3. **Sea self-consistency (reciprocity)** — every sea member's own radial/orientation ledger closes in the braid's near field (§55), co-moving/co-orbiting; the axis torque is the settled $\dot{\hat n}$-tracking dynamical response (the §-dynamical-sea escape mechanism), not a frozen multipole (barred by the static-multipole no-go).

**Crucial framing (the load-bearing distinction).** The instrument does **not** look for a sea tangential force on the equatorial ring (barred). It books whether the pump's angular momentum **leaves the equator** via coordinate transport and is drained where the sea has authority. Success is a *global budget*, measured as a *flow*, not a local force balance.

## What it builds (three reused halves + one new ledger)

Reused (already implemented and validated):

- **Radial/size basin.** `radialStabilityMatrix(railPinned:true)` and the §58 self-equilibrated V5 seed (`SELF_EQUILIBRATED_V5`), frozen $\kappa_{\rm eq}=0.28623$.
- **§69 internal-deformation coupling.** The coupled breathing–flutter blocks $C_{rt}$, $C_{tr}$, and the spin-transport rate block $G_{rt}$ from [nonrigid-axis-internal-deformation-instrument-spec.md](nonrigid-axis-internal-deformation-instrument-spec.md) — the exact channel by which a pump-driven breath transports spin ($\dot J_L\hat n_L$) between the equatorial rail and the tilt/axis sector. This is the transport pathway the global drain rides.
- **Dynamical co-drift sea.** `coDriftCage.reorient`/`orbit` (the reorienting-dipole / co-orbital surfaces, `dynamical-sea-axis-absorber-instrument-spec.md`), carried on the production `centerVelocity` surface by per-emission-time tangent reconstruction (central solver untouched). Its measured capability: the settled $\dot{\hat n}$-tracking torque anchors $\hat n\to\hat d$ (gain-reachable), and it exchanges angular momentum with the tilted/inner layers.

New (the instrument's core — the block every prior instrument omits):

**The global angular-momentum-flow ledger $\dot{\mathcal J}$.** For the braid+sea complex, book the cycle-averaged angular-momentum flow through four gates, all on the existing exact-causal-root evaluator bodies (no new force path):

- $\dot J^{\text{pump}}_M$ — the rail-pump injection at the middle equator ($+0.2274$, the source term).
- $\dot J^{M\to\{I,O,\hat n\}}$ — the **transport off the equator** through the §69 deformation coordinate ($G_{rt}$-mediated $\dot J_L\hat n_L$ exchange): how much of the injected angular momentum the breathing–flutter coupling moves out of the rail into the tilted/inner/axis sector per cycle.
- $\dot J^{\text{sea drain}}_{\{I,\hat n\}}$ — the sea's **off-equatorial** drain: the cycle-averaged angular-momentum removed by the dynamical co-drift sea on the tilted inner (Row-4 authority) and the axis (§68 torque), where the No-Go does **not** apply.
- $\dot J^{\text{escape}}$ — the residual coherent-expansion / outward drift (the Row-7 leak) if the budget does **not** close.

The steady-state closure condition is the **cycle-averaged balance**

$$
\dot J^{\text{pump}}_M \;=\; \dot J^{M\to\{I,O,\hat n\}} \;=\; \dot J^{\text{sea drain}}_{\{I,\hat n\}}, \qquad \dot J^{\text{escape}}\to 0,
$$

i.e. the pump's angular momentum flows out of the equator (transport) and out of the complex (sea drain) at the injection rate, leaving no coherent expansion — **with no term of the form "sea tangential force on the equatorial rail."**

## Two measurements (separated by claim level)

**Deliverable 1 — the coupled fixed-point solve (seed grade, the core gate).** Alternate: (i) the rail-pinned radial Newton (size/cadence), (ii) the §69 deformation relaxation, (iii) the axis torque toward $\hat n\to\hat d$ from the dynamical sea, (iv) the sea reciprocity relaxation — to a joint fixed point $\mathcal Q^\star$ (the `driftFixedPoint` alternation of §68, extended with the deformation and sea legs). Read:

- **Existence.** Does a self-consistent $\mathcal Q^\star$ exist with the radial basin held, the axis settled at $\hat n\to\hat d$, and the sea reciprocity closed? (The two halves — bare V5 radial + co-drift axis anchor — are each separately established; the question is joint co-existence with the deformation coordinate live.)
- **The global-drain readout (the decisive number).** At $\mathcal Q^\star$, does the $\dot{\mathcal J}$ ledger close — $\dot J^{\text{escape}}\to0$ with the pump balanced by transport-off-equator plus sea drain — or does a residual coherent expansion survive ($\dot J^{\text{escape}}>0$, S1/S2 still open)? Attribution map: turn the sea drain and the $G_{rt}$ transport on one at a time to isolate whether the closure (if any) is carried by the transport, the drain, or only their composition.

**Deliverable 2 — the reduced complex-escapement integrator (reference grade).** The linear fixed-point solve does not contain the nonlinear rail-pin runaway (the Row-7 coherent expansion is the $\beta_M=1$ size-pin inversion, §60). A reduced/reference integrator (sibling of the §12 field-speed-pin and the §68(a) `breathingEscapementReduced` integrators, explicitly non-native) carries the low-dimensional normal form on $(s_M,\dot s_M;\ a_{\rm flutter};\ J_{\rm sea})$ — the size mode driven by the pump through the rail-pin feedback, the flutter carrying the coupled eigenvalue, **and the sea drain as an explicit angular-momentum sink on the off-equatorial channel**. Question:

- **Bounded, drained steady state.** With the sea drain active on the off-equatorial channel (magnitude bounded by the measured Row-4 $+0.117$ / §68 $k(u)$ authorities — **not** by a free local-rail parameter), does the size mode settle into a **bounded** cycle returning $\beta_M$ to the rail, with the pump's angular momentum partitioned into transport + drain, rather than the monotone coherent expansion? This is the §68(a) Deliverable-2 test **with the one term §68(a) had to omit** — the off-equatorial sea drain that the No-Go permits (§68(a) closed the no-environment version and required "a structured sea supplying the $\ge1/3$ deficit"; §70 forbids that as a *local* brake but the drain enters here as a *global* off-equatorial sink).

## Mechanics (contract-preserving, runner-only)

Every force/torque/angular-momentum sample stays on the existing cycle-averaged $\kappa_{\rm eq}$-scaled exact-causal-root evaluator bodies (`radialStabilityMatrix` net-force sum, `gyroscopicTiltAnalysis` `torquesXY`, the `coDriftCage` seaWake path, the §69 cross-block builders). New code only (i) composes them at the joint fixed-point coordinate and (ii) books the four-gate $\dot{\mathcal J}$ ledger by differencing cycle-averaged per-layer/per-sea angular momenta across the transport and drain channels. Frozen $\kappa_{\rm eq}=0.28623$; V5 seed shape; rail-pin size feedback reused. All new terms null when their coordinate/sea is off, so the block-diagonal control reproduces §57 (radial basin), §61/§69 (flutter), and the bare Row-7 leak to the digit — the regression witnesses. Central solver untouched; consumes `buildBraid`/`wakeAccel`/`residuals`/`coDriftCage` read-only exactly as §68 does.

## Touch points (runner only)

1. `coupledComplexFixedPoint({ geo, sea, coupling, driftU, Nt, soft, eps, railPinned })` — the joint alternation (size/cadence × deformation × axis-torque × sea-reciprocity) returning $\mathcal Q^\star$ and its residuals. Extends the §68 `driftFixedPoint` alternation with the deformation and sea legs.
2. `angularMomentumFlowLedger(state)` — the four-gate $\dot{\mathcal J}$ book (pump injection, $G_{rt}$ transport-off-equator, off-equatorial sea drain, escape residual), cycle-averaged, per-layer and per-sea, with dt/`Nt` witnesses.
3. `complexEscapementReduced({ pump, seaDrain, ... })` — the Deliverable-2 reduced integrator (reference/comparison code, explicitly labeled non-native; sibling of the §12 and §68(a) reduced integrators), with the sea drain as an explicit off-equatorial angular-momentum sink bounded by measured authorities.
4. Reuse (no new algorithm): the §69 cross-block builders (`radialTiltCrossBlocks`, `spinTransportCrossBlock`), the `coDriftCage.reorient/orbit` surfaces, the §68 null-count deflation, and the `radialStabilityMatrix(railPinned:true)` net-force evaluator.
5. Validation rows (extend the owner suite, keep green): (a) **all couplings off** reproduces §57 radial eigenvalues, §61/§69 flutter, and the bare Row-7 escape rate ($\dot J^{\text{escape}}\to$ the §60 bare $0.081$/unit) to $\le10^{-6}$ — the regression; (b) $z$-rotation covariance of the $\dot{\mathcal J}$ ledger ($\sim10^{-15}$); (c) angular-momentum conservation check — with the sea drain **off**, the transport gate $G_{rt}$ moves $J$ between layers but the complex total is conserved to $\sim10^{-12}$ (the transport is a genuine internal exchange, not a source); (d) the sea drain sign is dissipative (removes $J$) on the tilted-inner/axis channels and **null on the equatorial rail** (the No-Go, witnessed numerically — the sea's equatorial-tangential row is $\le10\%$, order-robust, per §70/Corollary S); (e) dt/`Nt`/`eps` witnesses on any budget-closing cell.
6. CLI: `--coupled-complex`, `--am-ledger`, `--reduced-complex-escapement`, `--coupling=all|none|transport|drain`, `--drift-u=<value>`, `--pump=<value>` (default $+0.2274$), `--rail-pinned`.

## Decision tree (what each outcome means)

- **Budget closes globally** ($\dot J^{\text{escape}}\to0$; pump balanced by transport + off-equatorial drain; axis settled; radial basin + sea reciprocity held): S1/S2 and the axis-anchor coherence close **together** as one complex, with **no local equatorial brake** — vindicating the reframe. This is the first self-consistent braid+sea complex in the program and the seed of the first native candidate row since Row 7 (a joint-complex release), **and** the object the $A_0$ native release consumes. Gate the native row in the same thread (fail-closed acceptance discipline).
- **Transport closes but the drain cannot keep up** (angular momentum reaches the off-equatorial sector but the sea's Row-4/§68-class authority drains too little): the deficit is real and quantified as a **global** drain shortfall (not a local brake shortfall) — a sharper, correctly-posed sea target than the barred local one, handed to the dynamical-sea gain/coherence lane.
- **Transport itself fails** ($G_{rt}$ moves too little $J$ off the equator; the pump stays trapped on the rail and coherently expands): the §69 shared-channel hypothesis is falsified at the complex level, and S1/S2 has no closed route under the rigid-plus-deformation-plus-sea ontology — a genuine open problem to escalate (candidate: the object is missing a degree of freedom, e.g. formation-history / reaction channel, entry 34(ii)).

## Assumptions and claim ladder

- Prescribed/dynamical-sea seed grade → native retained-history (the standing grade lift; native release gated, not authorized here).
- Central solver untouched; runner + fixtures only; suites stay green; block-diagonal control reproduces §57/§61/§69/Row-7 to the digit.
- Frozen $\kappa_{\rm eq}=0.28623$; single retained branch; the sea's off-equatorial authority is bounded by the **measured** Row-4 ($+0.117$) and §68 ($k(u)$) values, never by a free local-rail parameter (the No-Go forbids the latter).
- Claim level: the global-drain closure is a **hypothesis**; this instrument is its first quantitative test. The Tangential-Sea No-Go (§70) it rests on is exact ($m=0$) / certified (static) / measured (dynamical). Fail-closed: `retainedBranchClaim=false`, `scoreMovement=no_score_increase`; no release or schema.

## Handoff

On a global-budget closure, this instrument emits the self-consistent complex $\mathcal Q^\star$ as the seed for (1) the shared S1/S2 + axis-anchor native candidate row and (2) the $A_0$ mass-map native release (the same complex), and reports the $\dot{\mathcal J}$ ledger as the first quantified substrate angular-momentum metabolism (brainstorming entry 32/34) with the No-Go fixing which channel carries it.
