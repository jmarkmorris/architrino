# Axis-Neutral Rotating-Wave Spectrum Packet

Status: priority-only proof packet draft, 2026-07-06.
Claim level: theorem-target statement with one discharged reduction lemma. This packet does not claim a retained branch, an admissible spectrum row, accepted evidence, stability, or score movement. A rotating-wave solution, if one is found, is a relative equilibrium of the declared kernel and still requires transverse stability, action/wake/event rows, and same-record receiver-normal evidence before any retention reading.
Parent lemma: [Six-Point Symmetry Invariant Lemma Proof Packet](six-point-symmetry-invariant-lemma-proof-packet.md). Executable witness: [Angular-Momentum Held-Release Sweep Spec](angular-momentum-held-release-sweep-spec.md). Figure-class consumer: [lissajou](../lissajou/priorities.md).

## Object

The eigen-braid candidate family is the rotating-wave (relative equilibrium) ansatz on the axis-neutral channel:

$$
\mathbf X_\ell(t)
=
\operatorname{Rot}(\hat{\mathbf n},\omega t)\,\mathbf X_\ell(0)
+u\,\hat{\mathbf n}\,t
$$

with $\hat{\mathbf n}=(1,1,1)/\sqrt3$, angular rate $\omega$, and axial drift $u$. On the channel the free data reduce to the representative worldlines: $\epsilon_{+,x}(0)$ alone for $u=0$ (with $\iota$), or the pair $\epsilon_{+,x}(0),\epsilon_{-,x}(0)$ for $u\ne0$ (with $\iota$ broken). The natural branch coordinate is the screw pitch $\mathbf J\cdot\mathbf P/\|\mathbf P\|^2$, equivalently the pair $(u,\omega)$ with the channel radius.

## Lemma R1 (constant-lag reduction) - discharged

On the rotating-wave ansatz, every directed-pair causal delay is constant in time. Split any initial separation into axial and transverse parts relative to $\hat{\mathbf n}$. For receiver $i$ at time $T$ and source $j$ at time $T-\tau$,

$$
\mathbf X_i(T)-\mathbf X_j(T-\tau)
=
\operatorname{Rot}(\hat{\mathbf n},\omega T)
\left[
\boldsymbol\Delta_\perp(\tau)
\right]
+
\left(\Delta_\parallel+u\tau\right)\hat{\mathbf n}
$$

where $\boldsymbol\Delta_\perp(\tau)$ and $\Delta_\parallel$ depend only on $\tau$ and the initial data, because the rotation acts only on the transverse part and fixes $\hat{\mathbf n}$. The norm is therefore $T$-independent, and the root residual

$$
F_{ij}(\tau)
=
\left\|
\boldsymbol\Delta_\perp(\tau)
\right\|^2
+\left(\Delta_\parallel+u\tau\right)^2
-c_f^2\tau^2
$$

is a fixed transcendental function of $\tau$ per directed pair. Causal roots are its zeros: constant phase lags. The same argument covers same-source rows. $\square$

Consequence: on this ansatz the state-dependent delay system collapses to a finite algebraic problem. The infinite-dimensional history disappears from the unknowns.

## Theorem Target T1 (spectrum system)

An admissible rotating-wave row is a solution of the finite residual system

$$
\mathcal S(\epsilon_{+,x}(0),\epsilon_{-,x}(0),\omega,u;\ \mathcal T)
=
\mathbf 0
$$

consisting of, for each representative receiver: the kinematic identity that the kernel sum over all constant-lag roots equals the ansatz acceleration (pure transverse centripetal $-\omega^2$ times the transverse position, zero axial component); the root equations $F_{ij}(\tau_r)=0$ for every retained lag in the declared root-topology class $\mathcal T$; and the admissibility inequalities (sub-field-speed or declared hinge occupancy, positive Jacobian floors, noncollision margins). The unknown count is finite: six or three position components, $\omega$, $u$ (or pitch), and the lag set. Solutions are the **eigen-braid spectrum**: for fixed $u$ and fixed root-topology class, the solution set is the theorem-target spectrum $\{(\omega_k,R_k)\}$, indexed by root topology and winding data.

Discreteness is stated as a target, not assumed: the residuals are real-analytic in the unknowns away from caustics ($D_s=0$) and collisions, so solution sets are generically isolated; a degenerate continuum would itself be a reportable structure.

## Theorem Target T2 (pitch quantization interface)

Each spectrum row carries a definite screw pitch and helicity sign. The interface hypothesis is that admissible rows at fixed root topology form a discrete pitch ladder, and that transitions between rows are root-topology transitions — the click picture for $h_{\mathrm{act}}$ — so that action quantization is inherited from integer root counts rather than imposed. This target consumes Lemma R1 and the hinge material; it is not assumed by T1.

## Failure Modes

1. No admissible sub-field-speed solution for any tested root topology: extends the isolated no-return evidence to the rotating-wave family and sharpens the Noether sea and self-hit routes.
2. Solutions exist only at or beyond the field-speed edge: relocates the family into hinge or fold-layer territory, which requires the controlled self-hit program before interpretation.
3. Caustic degeneracy ($D_s\to0$ on a needed root) voids the row's branch weight and blocks the kinematic identity.
4. A found row is a relative equilibrium only; transverse instability, action or wake imbalance, or failed same-record rows keep it non-retained.

## First Hunt Result - 2026-07-06

Executable diagnostic: [axis-neutral-rotating-wave-residual-scan.mjs](../../../scripts/braid-ideal/axis-neutral-rotating-wave-residual-scan.mjs), tests in [braid-ideal-axis-neutral-rotating-wave-residual-scan.test.js](../../../tests/braid-ideal-axis-neutral-rotating-wave-residual-scan.test.js). Kernel: $c_f=1$, $\kappa=1$, zero softening, receiver-normal over floored source-normal branch weights, partner-wake only, no self-hits. Scaling removes the radius: the unknowns reduce to the drum aspect $\alpha=h/\rho$ and rim-speed fraction $\beta=\omega\rho$, with $\rho$ recovered from the radial equation when $\Phi_{\mathrm{rad}}<0$.

**Result 1 - axial no-balance lemma (analytic; numerically witnessed).** For any $\alpha>0$, any sub-field $\beta$, any delays, and any branch weights: same-ring contributions have exactly zero axial component (the rings are rigid and level), while every opposite-ring contribution is attractive with axial part pulling the rings together. A sum of strictly one-signed terms cannot vanish, so the rigid two-ring rotating wave has no axial equilibrium; the grid witness gives maximum axial residual $-0.159<0$ over $\alpha\in[0.1,2]$, $\beta\in[0.05,0.95]$. The rigid single-frequency eigen-braid, if it existed, would be forced planar ($\alpha=0$): the hexagonal ring.

**Result 2 - planar tangential anti-damping (sampled screen).** On the planar hexagon, the tangential residual is strictly positive across $\beta\in[0.02,0.985]$ (zero sign changes; minimum $+0.058$ at the low end; growth $\Phi_{\mathrm{tan}}\approx2.9\beta$, nearly linear, an anti-drag coefficient), while $\Phi_{\mathrm{rad}}\approx-0.67$ stays inward. Net wake force along the velocity: the delayed kernel pumps the rotation rather than braking it, so no rigid rotating-wave equilibrium exists in the scanned sub-field range.

**Disposition.** `rigid_u0_rotating_wave_family_no_admissible_row_in_scan` — failure mode 1 of this packet, with a sharper mechanism than expected: the rigid class fails twice independently (axial collapse for $\alpha>0$; tangential pump at $\alpha=0$). This extends the anti-damping evidence family to a third independent chart: the frozen octahedral zero-mean obstruction, the held-release escape, and now the exact planar rotating channel all show the same sign phenomenon under their own conventions (qualitative consilience only; no cross-chart ledger consumption). Claim level: the axial lemma is a derivation; the tangential screen is a sampled diagnostic, certifiable later by interval methods if needed. Nothing here is a retained-branch statement.

**Consequences for the spectrum program.** Admissible eigen-braids, if any, are necessarily non-rigid: the pumped tangential action must be exchanged with another internal channel (radial breathing against rotation — the two-frequency Lissajous class, where the closed figures are the integer phase-closure states), or absorbed by same-source rows at the field-speed hinge, or exported to a Noether sea environment. The rigid ansatz also cannot represent wake exhaust by construction, so its failure was arguably necessary: a retained branch must have somewhere to put the pumped action. This converts the spectrum hunt from relative equilibria to relative periodic orbits.

## Next Steps

1. Extend the residual system to the breathing ansatz $\rho(t)=\rho_0+\delta\cos(\Omega t+\phi_0)$ (two frequencies; delays become periodic rather than constant) and hunt for closed rows where the tangential pump averages to zero over the breathing cycle.
2. Feed the anti-damping coefficient $\Phi_{\mathrm{tan}}(\beta)\approx2.9\beta$ to the escape-certificate lemma as the driving term the environment or breathing channel must beat.
3. Classify any found rows per the lissajou lane; the closed-figure condition is the integer phase-closure label.
