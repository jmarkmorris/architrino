# Non-Rigid Axis / Internal-Deformation Instrument — Coupled Breathing–Flutter Pencil Build Spec

Claim level: build spec / instrument handoff. This packet specifies the minimal
extension of the seed-grade pencil machinery that admits the braid's **internal
radial-deformation (breathing) coordinate as a dynamical degree of freedom
coupled to the tilt/flutter sector** — the one channel the §68 verdict named as
unreachable by every rigid-layer or frozen-radial pencil built so far. It
extends the runner only ([spindle-support-ratio-targeted-search.mjs](../../../../scripts/braid-ideal/spindle-support-ratio-targeted-search.mjs)),
consuming the screw-drift evaluator ([spindle-braid-screw-drift-evaluator.mjs](../../../../scripts/braid-ideal/spindle-braid-screw-drift-evaluator.mjs))
read-only; the central solver `AbsoluteHistoryRootRuntime.mjs` is untouched. It
is the shared closure instrument for **S1/S2** (the tangential rail-pump absorber
/ shape attractor; [fold-crossing-chart-spec.md §69](fold-crossing-chart-spec.md#69-the-super-field-inner-binary-feasibility-resolution),
[master-equation-closure/boosted-delay-attractor-theorem-target.md](../../master-equation-closure/boosted-delay-attractor-theorem-target.md))
and the **axis-anchor coherence** (the gyroscopic-circulatory flutter, §61/§66/§68).

## Why this instrument (the channel the two-frame closure leaves open)

The axis sector is closed at seed grade in **both** frames by rigid-layer
pencils: resting (§§61–66 — every bare axis channel is a pump; the linear sea is
circulatory-dominated) and moving (§68 — the drift orientation torque stiffens
only the global axis, not the internal flutter). Every one of those pencils
holds the **radii frozen** (rigid layers) and every radial-stability instrument
(§57 `radialStabilityMatrix`, §58 `railPinnedEquilibrium`) holds the **tilts
frozen**. The §68 verdict states the surviving analytic route precisely: *"axis
confinement requires either non-rigid axis dynamics (internal deformation modes
coupling to the flutter, outside every rigid-layer pencil built so far) or the
remaining nonlinear/structured sea routes."*

Two independent lines now converge on the same coordinate:

- **The §69 reroute.** The nested-shell super-field hinge cannot supply the
  middle's $\approx0.076$ ($\approx1/3$-pump) tangential deficit (cross-hit relay
  closed for the neutral braid, §14; native self-hit caps at $2/3$, §66), so
  S1/S2 leaves the environment/hinge routes and moves onto the internal
  deformation the radial basin already carries.
- **The §60 failure mode.** The Row 7 rejection is `rail_pump_unabsorbed_coherent_expansion`:
  the un-absorbed rail pump drives $R_\perp:0.96\to2.37$. That coherent expansion
  **is** the breathing/size mode running away. The pump already excites exactly
  the internal-deformation coordinate this instrument makes dynamical.

So the internal-deformation coordinate is the single **shared** object: if the
breathing mode, treated dynamically and coupled to the flutter, both (i) absorbs
the rail pump into a bounded internal oscillation instead of coherent expansion
and (ii) drives the flutter whirl restoring, then §68(a) closes S1/S2 and the
axis-anchor coherence together with **no environment**. This instrument measures
whether it does.

## What it builds (the coupled pencil — the minimal non-rigid extension)

A single generalized pencil on the **9 combined coordinates**

$$
q = (\,\underbrace{s_I,\,s_M,\,s_O}_{\text{breathing}}\;,\;\underbrace{\eta^x_I,\eta^x_M,\eta^x_O}_{\text{tilt }x}\;,\;\underbrace{\eta^y_I,\eta^y_M,\eta^y_O}_{\text{tilt }y}\,),
$$

with $s_L=\delta R_L$ the per-layer radial displacement (the exact coordinates of
`radialStabilityMatrix`) and $\eta^{x,y}_L$ the per-layer plane tilts (the exact
coordinates of `gyroscopicTiltAnalysis`). The pencil is

$$
P_{\rm full}(\lambda)=\lambda^2 M_{\rm full}+\lambda\,(G_{\rm full}+D_{\rm full})+(\Gamma_{\rm full}-K_{\rm full}),
$$

assembled from four **reused** sub-blocks and **three new cross-blocks**:

Reused (already implemented, validated):

- $K_{\rm rad}$ ($3\times3$): the §57 symmetric radial Jacobian $\partial F^{\rm rad}_a/\partial s_b$ (`radialStabilityMatrix`, `railPinned:true` — the size-mode feedback $\omega=c_f/(R_M\cos\alpha_M)$, the natively confirmed speed=size pin). Bare-braid basin at V5 (all three eigenvalues restoring, §57).
- $K_{\rm tilt}$ ($6\times6$), $\Gamma_{\rm tilt}$ ($6\times6$), $G_{\rm tilt}$ ($6\times6$): the §61 measured tilt Jacobian ($A,B,D,E$ blocks), the baseline-torque antisymmetric block (the rail pump $\tau_M=+0.423$ enters here), and the spin gyroscopic block ($J_L=2\rho_L^2\omega$). Optionally $D_{\rm tilt}$, the §63 delay-memory rate block.

New (the instrument's core — the blocks every prior pencil sets to zero):

1. **$C_{rt}$ ($3\times6$): $\partial F^{\rm rad}_a/\partial\eta_L$** — how tilting
   layer $L$ changes the net radial force on layer $a$. Physical content: a
   tilted spinning layer changes both its own centrifugal projection onto the
   equatorial rail and the wake geometry seen by its neighbors, shifting the
   radial balance. Measured by finite-differencing the `radialStabilityMatrix`
   net-force evaluator with the `gyroscopicTiltAnalysis` `rotX`/`rotY` tilt map
   applied to the source/receiver worldlines.

2. **$C_{tr}$ ($6\times3$): $\partial T_L/\partial s_a$** — how a radial breath of
   layer $a$ changes the tilt torque on layer $L$. Physical content: breathing
   moves the wake geometry that produces the transverse torques, so the tilt
   stiffness the flutter rides on is itself breathing-modulated. Measured by
   finite-differencing the `gyroscopicTiltAnalysis` `torquesXY` evaluator with a
   per-layer radius displacement $s_a$ applied.

3. **$G_{rt}$ ($6\times3$): the spin-transport ($\dot J$) rate cross-block — the
   load-bearing term §61 named but could not carry.** §61 flagged that
   *"the spin transport $d(J\hat n)/dT$ contributes $\dot J\,\hat n$ terms"* but
   a frozen-radial pencil sets $\dot\rho_L=0$, so $\dot J_L=0$ and the term
   vanishes by construction. With breathing dynamical, $J_L=2\rho_L^2\omega$
   depends on $s_L$ (rail-pinned: $\omega$ responds too), so
   $$
   \dot J_L=\frac{dJ_L}{ds_L}\,\dot s_L,\qquad \frac{dJ_L}{ds_L}=4\rho_L\cos^2\!\alpha_L\,\omega+2\rho_L^2\,\frac{d\omega}{ds_L},
   $$
   and the gyroscopic torque $d(J_L\hat n_L)/dt=J_L\dot{\hat n}_L+\dot J_L\hat n_L$
   acquires a second piece $\dot J_L\hat n_L$ that couples the **breathing rate
   $\dot s_L$** into the tilt sector. This is a $\lambda^1$ cross-block from the
   radial-rate coordinates into the tilt equations — the exact channel by which
   a pump-driven breath torques the axis, and vice versa. $dJ_L/ds_L$ is a
   declared kinematic constant (analytic above; cross-checked by finite
   difference of the layer $J$).

Block layout (row = equation sector, col = coordinate sector; $r$=breathing,
$t$=tilt):

$$
M_{\rm full}=\begin{bmatrix}M_{\rm rad}&0\\0&M_{\rm tilt}\end{bmatrix},\quad
K_{\rm full}=\begin{bmatrix}K_{\rm rad}&C_{rt}\\ C_{tr}&K_{\rm tilt}\end{bmatrix},\quad
G_{\rm full}=\begin{bmatrix}0&0\\ G_{rt}&G_{\rm tilt}\end{bmatrix},\quad
\Gamma_{\rm full}=\begin{bmatrix}0&0\\0&\Gamma_{\rm tilt}\end{bmatrix},
$$

with $M_{\rm rad}=\mathrm{diag}(m^{\rm rad}_L)$ the layer radial inertia
(unit-site-weight kinematic constant, declared) and $M_{\rm tilt}=\mathrm{diag}(m_L)$,
$m_L=\rho_L^2+2z_L^2$ as in §61. The determinant is now degree 18 in $\lambda$
(extend the existing Durand–Kerner root finder from degree 12; the exact-zero
deflation discipline of §61/§68 carries over — count roots at numerical zero
and deflate them).

## Two measurements (separated by claim level)

**Deliverable 1 — the coupled pencil (seed grade, the core gate).** Reads the
full $P_{\rm full}(\lambda)$ spectrum at V5. Two questions:

- **(ii) Flutter-under-coupling.** Does the §61 flutter whirl pair
  ($\lambda=+0.183\pm0.382\,i$, uncoupled) move **restoring** ($\mathrm{Re}\,\lambda<0$)
  once the breathing cross-blocks $C_{rt}$, $C_{tr}$, $G_{rt}$ are switched on?
  The isolating control is the block-diagonal pencil ($C_{rt}=C_{tr}=G_{rt}=0$),
  which must reproduce §61's flutter and §57's radial basin exactly — the
  regression witness.
- **Sanity/decoupling map.** Turn the three cross-blocks on one at a time to
  attribute any sign change to the specific channel (the $\dot J$ spin-transport
  block $G_{rt}$ is the leading hypothesis, being the only cross-block that is
  velocity- rather than stiffness-class).

**Deliverable 2 — the reduced breathing-escapement integrator (reference grade).**
The linear pencil does **not** contain the coherent-expansion runaway: at V5 the
radial stiffness $K_{\rm rad}$ is a basin (§57), and the runaway is the
**tangential** rail pump acting through the $\beta_M=1$ rail-pin switch (§60),
which is nonlinear. So a second, explicitly reduced/reference integrator (in the
spirit of the §12 field-speed-pin 1-D integrator — **not** the native solver)
carries the low-dimensional normal form on $(s_M,\dot s_M;\,a_{\rm flutter})$:
the size mode driven by the pump through the rail-pin feedback
($\omega=c_f/(R_M\cos\alpha_M)$, the size-pin inversion above $\beta_M=1$), the
flutter amplitude carrying the coupled-pencil eigenvalue, and the $C$/$G_{rt}$
coupling between them. Question:

- **(i) Bounded absorption.** Does the pump drive a **bounded breathing limit
  cycle** (the size mode periodically returning $\beta_M$ to the rail — an
  internal escapement made of the shape mode, no environment) rather than the
  monotone coherent expansion, and does the $\approx0.076$ pump deficit partition
  into that bounded oscillation (and, through $G_{rt}$, into the flutter) instead
  of net outward drift? Read the size-mode envelope: bounded/limit-cycle vs
  runaway, and the residual mean radial drift rate vs the §60 bare $0.081$/unit.

## Mechanics (contract-preserving, runner-only)

Every force/torque sample stays on the existing cycle-averaged $\kappa^*$-scaled
exact-causal-root evaluator bodies (`radialStabilityMatrix` net-force sum and
`gyroscopicTiltAnalysis` `torquesXY`); the only new code composes them at
displaced-**and**-tilted configurations for the cross-blocks. Frozen $\kappa$ at
the gauge-invariant $\kappa_{\rm eq}=0.28623$; V5 geometry; the rail-pin size
feedback reused from `radialStabilityMatrix(railPinned:true)`. All cross-blocks
null when their coordinate is zero, so the block-diagonal control reproduces §57
and §61 to the digit (regression). Central solver untouched; consumes
`buildBraid`/`wakeAccel`/`residuals` read-only exactly as §68 does.

## Touch points (runner only — `spindle-support-ratio-targeted-search.mjs`)

1. `internalDeformationPencil({ geo, cTrans, Nt, soft, eps, eta, railPinned, pumpAbsorbed, couplingMask })` — assembles $P_{\rm full}$; `couplingMask` selects which of $\{C_{rt},C_{tr},G_{rt}\}$ are live (default all; block-diagonal control = none).
2. `radialTiltCrossBlocks(...)` — the finite-difference builder for $C_{rt}$, $C_{tr}$ (compose the two existing evaluators at joint displacement+tilt).
3. `spinTransportCrossBlock(...)` — the analytic $dJ_L/ds_L$ block $G_{rt}$ with a finite-difference cross-check.
4. Extend the Durand–Kerner root finder to degree 18 (reuse the §61 complex-determinant + deflation helpers; no new algorithm).
5. `breathingEscapementReduced({ pump, ... })` — the Deliverable-2 reduced integrator (reference/comparison code, explicitly labeled non-native; sibling of the §12 reduced integrator).
6. Validation rows (extend the 29-test owner suite, keep green): (a) `couplingMask=none` reproduces §57 radial eigenvalues and §61 flutter to $\le10^{-6}$; (b) $z$-rotation covariance of the cross-blocks ($\sim10^{-15}$); (c) $G_{rt}$ analytic-vs-finite-difference agreement; (d) exact-zero root count/deflation preserved; (e) $dt$/`Nt`/`eps` witnesses on any sign-changing eigenvalue.
7. CLI: `--internal-deformation`, `--coupling=all|none|crt|ctr|grt`, `--reduced-escapement`, `--pump=<value>` (default the declared $+0.2274$), `--rail-pinned`.

## Run matrix

V5, $\kappa_{\rm eq}=0.28623$, resting frame first (then optionally the §68
drift family at $u=0.2$ for the moving check):

- `--internal-deformation --coupling=none` — regression control (must reproduce §57 basin + §61 flutter).
- `--internal-deformation --coupling=all` — the coupled spectrum; read the flutter pair's real part.
- `--internal-deformation --coupling=crt|ctr|grt` — one-at-a-time attribution.
- `--internal-deformation --coupling=all --rail-pinned --reduced-escapement --pump=0.2274` — Deliverable 2 bounded-cycle test.
- optionally `--pump-absorbed` (drop $\tau_M$ from $\Gamma$) to separate the pump's role in the flutter from the coupling's, as in §61.

Measure, against the §57/§61 uncoupled baselines: (1) the flutter whirl real part
coupled vs uncoupled; (2) the size-mode envelope (bounded/limit-cycle vs runaway)
and residual mean radial drift; (3) which cross-block carries any sign change;
(4) all regression/covariance/witness rows green.

## Decision tree

- **Coupling flips the flutter restoring AND the reduced model shows a bounded
  breathing cycle that absorbs the $\approx0.076$ pump deficit** ⇒ §68(a) closes
  **both** S1/S2 and the axis-anchor coherence with **no environment**: the
  internal deformation is the shared absorber. This is the strongest outcome —
  it would unblock the large-drift Lorentz ruler, R3 (posable at the now-stable
  fixed point), and the mass-map $A_0$ release at once, and would name the first
  native candidate row since Row 7 (a modewise-breathing-seeded release on the
  native runner as the confirmation gate).
- **Coupling flips the flutter but the breathing runs away (no bounded cycle)**
  ⇒ the axis-anchor coherence closes internally, but S1/S2 still needs an
  environment for the pump; report the residual and hand S1/S2 back to the
  structured-sea routes (§68 b/c).
- **Coupling does not reach the flutter (real part stays $>0$)** ⇒ §68(a) is
  closed; both S1/S2 and the axis route to the remaining nonlinear/structured-sea
  channels: the saturated-orientational-response sea (§67 route (i)) and the
  co-orbital cage (§55) — with a seed-grade no-go now bounding the internal route
  as well.

## Claim ladder

- The pencil assembly and the cross-block finite differences are **seed-grade
  derivation + measurement** (cycle-averaged rigid-per-layer reduction with the
  radii now dynamical; frozen $\kappa$; exact causal roots) — the same grade as
  §57/§61/§68, extended by the three cross-blocks.
- The $dJ_L/ds_L$ spin-transport block is **exact** (analytic, from
  $J_L=2\rho_L^2\omega$), finite-difference cross-checked.
- Deliverable 2 (bounded absorption) is **reference/reduced** — a normal-form
  integrator, not the native solver; a positive result names a native
  confirmation gate, it does not authorize acceptance.
- Fail-closed: `retainedBranchClaim=false`, `scoreMovement=no_score_increase`;
  seed-grade instrument on prescribed worldlines with a dynamical breathing
  coordinate; nothing here authorizes a release. No new validator or schema
  beyond the owner-suite rows above.

## Ownership

Seed-grade pencil lane; extends `spindle-support-ratio-targeted-search.mjs`
alongside §61/§63/§68. Native root engine untouched; consumes the screw-drift
evaluator read-only. The first pencil in the program that is **not** rigid-layer:
it carries the internal radial-deformation coordinate and its spin-transport
coupling to the axis, the one channel the two-frame axis-sector closure explicitly
leaves open.

## Build + run status (2026-07-10)

BUILT and RUN. `internalDeformationPencil` implemented in
`spindle-support-ratio-targeted-search.mjs` (the unified full-causal-root
cycle-averaged cross-block evaluator; the degree-18 Durand–Kerner extending the
§61 complex-determinant + two-zero deflation; `coupling` mask
`all|none|crt|ctr`; the opt-in `parametric` block). Diagonal blocks are taken
from the canonical `gyroscopicTiltAnalysis` (§61) and `radialStabilityMatrix`
(§57, bare/rail-pinned), so `coupling="none"` block-diagonalizes exactly.
`AbsoluteHistoryRootRuntime.mjs` untouched. Two owner-suite tests added (31/31
green): block-diagonal regression + the cross-block null / no-flip result.

### Result — the linear cross-blocks vanish by axisymmetry; the coupling is PARAMETRIC, not linear (seed grade, machine precision)

- **Regression (`coupling=none`).** Flutter $=0.18277$, whirl $0.382$ — the §61
  value to 5 digits ($\Delta=0$); radial sector a basin (eigenvalues
  $-0.250,-1.199,-3.595$, all restoring, the §57/§60 basin up to gauge);
  degree-18 DK residual $6\times10^{-17}$. The pencil reproduces both baselines.
- **The selection rule is exact.** With `coupling=all` the measured cross-blocks
  are at the covariance-null level — $C_{rt}\sim3.7\times10^{-15}$,
  $C_{tr}\sim7.8\times10^{-15}$ (relative $\sim10^{-15}$, scale $2.24$) — so the
  coupled flutter is **unchanged** ($0.18277$, shift $0$, **flip = false**). A
  scalar radial force carries no linear term in the transverse-vector tilt, and a
  transverse-vector torque no linear term in the scalar breath; the $\dot J$
  spin-transport term is second order (bilinear $\dot s\cdot\eta$). **So the
  hypothesized linear $G_{rt}$ block is identically zero: the linear coupled
  pencil decouples, and no linear coupling can turn the flutter restoring.** This
  supersedes the spec's provisional treatment of $G_{rt}$ as a linear block.
- **The operative coupling is parametric and quantified.**
  $d(\text{flutter})/d(\text{size})=-0.48$ (rail-pinned): a bounded expansion
  *reduces* the flutter ($0.183\to0.174$ at $+2\%$ uniform breath), a contraction
  *increases* it ($\to0.193$ at $-2\%$). The spin-transport magnitudes
  $dJ_L/ds_L=(1.81,1.92,0.58)$ for $(I,M,O)$ set the gyroscopic part of that
  modulation. This is the finite-amplitude channel — the flutter's stiffness is
  modulated by the breath — that no rigid-layer or frozen-radial pencil can see.

### Verdict and decision-tree placement

`internal_deformation_linear_pencil_decouples_by_axisymmetry_coupling_is_parametric`.
The §68(a) **linear** seed-grade gate is a scoped negative: breathing does not
flip the flutter at the fixed point, because the linear coupling is forbidden by
axisymmetry. This does **not** close §68(a) — it relocates it precisely onto the
**parametric (Mathieu) problem**: whether a *bounded* breathing limit cycle can,
through the measured $-0.48$ modulation, net-stabilize the flutter over a cycle
while absorbing the $\approx0.076$ rail-pump deficit (Deliverable 2, the reduced
`breathingEscapementReduced` integrator, reference grade). The sign is
encouraging — expansion suppresses the flutter — but a limit cycle spends half
its phase in contraction (which pumps it), so only the phase-average decides. The
native Row 7 runaway is the *un-bounded, rail-detached* face of this coordinate;
the bounded/rail-pinned face is untested and is the Deliverable-2 target.
Fail-closed: `retainedBranchClaim=false`, `scoreMovement=no_score_increase`.

Reproduce: `internalDeformationPencil({ coupling: "none" })` (regression),
`{ coupling: "all" }` (cross-block null / no flip),
`{ coupling: "all", parametric: true })` (the $-0.48$ parametric coefficient).

### Deliverable 2 — the parametric (Mathieu) gate: no bounded breathing cycle absorbs the pump OR damps the flutter; §68(a) CLOSES (reference grade)

`breathingEscapementReduced` built and run — a RK4 reference integrator on
$(s,\dot s,\delta,a_{\rm flutter})$ with declared coefficients from the stack
(pump $+0.2274$; native $2/3$ brake ceiling; $\gamma_0=0.183$; the measured
$-0.48$ size modulation; the §60 rail-pin sign inversion above $\beta_M=1$;
$k_{\rm size}$ from §57). Two owner-suite tests added (32/32 green). The scan is
decisive on two independent counts:

- **Breathing does not absorb the tangential pump.** With the measured bare $2/3$
  brake the trajectory is a **runaway** — $\delta$ (the rail detachment) grows on
  the un-absorbed $\approx1/3$-pump deficit, the size pin inverts above the rail,
  and $s$ disperses by $t\approx7$ (the Row 7 coherent expansion, reproduced). A
  *bounded* size exists **only** when an external brake exceeds the pump
  ($\varrho>1$) with a soft inversion — i.e. only when a **structured sea supplies
  the $\ge1/3$ deficit**, the very environment §68(a) hoped to replace. The only
  radial$\leftrightarrow$tangential coupling, the rail pin, converts the
  un-absorbed pump into *expansion*, not into a bounded oscillation.
- **Even given that environment, the parametric modulation is too weak to damp the
  flutter.** A net flutter damping needs a held mean size
  $\langle s\rangle>\gamma_0/|d\gamma/ds|=0.381$. In every bounded case the mean
  size settles at $\langle s\rangle\le0.27$ (the inverted pin forbids holding a
  large mean expansion), so $\langle\gamma\rangle>0$ and the flutter still grows
  (`fluttrNetDamped=false` for $\varrho=1.2$ soft, $\varrho=2$ full-absorb, and
  the strong-push variant). Expansion suppressing the flutter (the encouraging
  $-0.48$ sign) never gets to act, because the bounded dynamics cannot hold the
  required mean expansion.

**Verdict:** `internal_deformation_route_closed_no_bounded_breathing_absorber_reroute_to_structured_sea`.
§68(a) — the non-rigid internal-deformation channel — is a **scoped negative at
both the linear and the parametric level**: linearly the coupling is
axisymmetry-forbidden; nonlinearly no bounded breathing cycle absorbs the rail
pump (a bound requires the structured sea) and none reaches the mean expansion the
flutter damping needs. The internal deformation is therefore **not** the shared
absorber. This CLOSES the §68 decision tree: both S1/S2 (the rail-pump absorber)
and the axis-anchor coherence hand back to the **structured-sea** routes — the
saturated-orientational-response sea (§67 route (i)) and the co-orbital cage
(§55). Fail-closed: `retainedBranchClaim=false`, `scoreMovement=no_score_increase`;
reference/reduced integrator, not the native solver; authorizes no acceptance.

Reproduce: `breathingEscapementReduced({})` (bare runaway),
`{ speedPinRatio: 2.0, kInv: 0.05 }` (environment-bounded but flutter not damped).
