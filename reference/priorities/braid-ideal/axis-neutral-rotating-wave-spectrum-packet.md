# Axis-Neutral Rotating-Wave Spectrum Packet

Status: priority-only proof packet, 2026-07-06; first-hunt and breathing-hunt dispositions recorded 2026-07-06/2026-07-07.
Claim level: theorem-target statement with two discharged reduction lemmas (R1 constant-lag, R2 periodic-lag) and two rejection dispositions (rigid family; common-phase constant-$\omega$ breathing family in the scanned box). This packet does not claim a retained branch, an admissible spectrum row, accepted evidence, stability, or score movement. A rotating-wave solution, if one is found, is a relative equilibrium of the declared kernel and still requires transverse stability, action/wake/event rows, and same-record receiver-normal evidence before any retention reading.
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

consisting of, for each representative receiver: the kinematic identity that the kernel sum over all constant-lag roots equals the ansatz acceleration (pure transverse centripetal $-\omega^2$ times the transverse position, zero axial component); the root equations $F_{ij}(\tau_r)=0$ for every retained lag in the declared root-topology class $\mathcal T$; and the admissibility inequalities (sub-field-speed or declared hinge occupancy, positive Jacobian floors, receiver-normal branch-strength floors, noncollision margins). The unknown count is finite: six or three position components, $\omega$, $u$ (or pitch), and the lag set. Solutions are the **eigen-braid spectrum**: for fixed $u$ and fixed root-topology class, the solution set is the theorem-target spectrum $\{(\omega_k,R_k)\}$, indexed by root topology and winding data.

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

## Breathing Hunt Result - 2026-07-07

Executable diagnostic: [axis-neutral-breathing-residual-scan.mjs](../../../scripts/braid-ideal/axis-neutral-breathing-residual-scan.mjs), tests in [braid-ideal-axis-neutral-breathing-residual-scan.test.js](../../../tests/braid-ideal-axis-neutral-breathing-residual-scan.test.js) (seven tests). Kernel conventions identical to the first hunt. Ansatz: common-phase radial breathing $\rho(t)=\rho_0\left(1+\delta\cos(\Omega t+\phi_0)\right)$ with constant angular rate $\omega$ and fixed drum height; common phase across all six sites keeps the motion on the $C_3\times\langle\iota\rangle$ channel, so one representative receiver still closes the system. Scaled coordinates: drum aspect $\alpha$, mean rim-speed fraction $\beta=\omega\rho_0$, amplitude fraction $\delta$, and the lock ratio $r=\Omega/\omega$ (the Lissajous coordinate; $\phi_0$ is quotiented, see Lemma R2).

**Lemma R2 (periodic-lag reduction) - discharged.** On the breathing ansatz, every co-rotating residual projection depends on time only through the breathing phase $\theta=\Omega t+\phi_0$: the directed-pair separation at receiver time $T$ and lag $\tau$ is a function of $\rho(T)$, $\rho(T-\tau)$, and the relative angle $\psi+\omega\tau$ alone, so the root residual $F_{ij}(\tau;\theta)$ and its causal roots are $2\pi$-periodic in $\theta$. When every site speed stays sub-field, $\partial_\tau\!\left\|\Delta\right\| < 1$, so the root residual is strictly decreasing in $\tau$ and each directed pair carries a unique smooth periodic lag $\tau_{ij}(\theta)$. Consequences: the infinite-dimensional history again collapses, now to a finite loop of algebraic problems over one breathing cycle; and every cycle average is independent of $\phi_0$, which removes $\phi_0$ from the scan box. $\square$

**Per-cycle closure condition.** The ansatz acceleration is $(\ddot\rho-\rho\omega^2)\,\hat{\mathbf e}_r+2\dot\rho\,\omega\,\hat{\mathbf e}_t$ with zero axial part. Since $\langle\dot\rho\rangle=\langle\ddot\rho\rangle=0$ over a cycle, the cycle-averaged tangential closure reduces to $\langle F_{\mathrm{tan}}\rangle=0$; the radial average sets the scale ($\rho_0$ recoverable when $\langle F_{\mathrm{rad}}\rangle<0$); the axial residual must vanish separately. Cycle-averaged closure is a first-pass filter only: a true breathing row must also close the harmonic content (first-harmonic radial balance selecting $(\delta,\Omega)$, the drum-mode condition), which this scan does not test.

**Result 1 - axial no-balance extends to the breathing family (analytic; numerically witnessed).** Radial breathing keeps both rings level and rigid in the axial direction, so same-ring contributions still have exactly zero axial component and every opposite-ring contribution still pulls the rings together, now pointwise in $\theta$. The rigid axial no-balance lemma therefore extends verbatim: no axial equilibrium for any $\alpha>0$, any admissible $(\beta,\delta,\Omega)$. Grid witness: maximum pointwise axial residual $-0.128<0$ over 396 admissible cells. Breathing candidates are again forced planar.

**Result 2 - no zero-average row in the scanned box (sampled screen).** Planar box $\beta\in[0.05,0.9]$, $\delta\in[0.05,0.45]$, $r\in[0.25,4]$ (1206 admissible cells) plus an extended delay-resonant probe $\delta\in[0.1,0.8]$, $\Omega\in[0.25,8]$ absolute (467 admissible cells, reaching $\Omega\tau=\mathcal O(\pi)$ where delay modulation is strongest): the cycle-averaged tangential pump is strictly positive at every admissible cell, with zero sign changes along all scan axes. Sharper structure: breathing does suppress the pump, monotonically in the breathing rim velocity $\delta\Omega$, but the suppression floors at $\approx0.73$ of the rigid pump as $\delta\Omega$ approaches the sub-field admissibility edge (best cell $\beta=0.05$, $\delta=0.6$, $\Omega=1.5$); the instantaneous pump does reverse within the cycle (negative on $\approx1/3$ of the phases at the probe minimum) but never on average. The suppression factor is nearly $\beta$-independent, so the surviving pump is $\approx0.73\times2.9\beta\approx2.1\beta$ after maximal admissible breathing.

**Disposition.** `breathing_family_no_zero_average_row_in_scanned_box` — packet failure mode 1 extends from the rigid family to the common-phase constant-$\omega$ breathing family in the scanned region. The edge-limited suppression points at failure mode 2 territory: the extrapolated zero, if it exists at all, requires breathing rim velocities at or beyond the field-speed edge, which is controlled self-hit / hinge territory, not this scan's domain. Claim level: Lemma R2 and the axial extension are derivations; the planar screen is a sampled diagnostic (midpoint quadrature over 64 phases, quadrature-stability tested), certifiable later by interval methods if needed. Nothing here is a retained-branch statement; no row is named and `native_retained_history_promotion` remains gated.

**Consequences for the spectrum program.** Within partner-wake-only, sub-field, common-phase-breathing assumptions, the internal radial-breathing channel cannot absorb the tangential pump: it caps at roughly a quarter of it. The remaining candidate absorbers sharpen to same-source rows at the field-speed hinge (self-hit program) and Noether-sea export (`sh0sea_dipole_wake_sum`), plus the untested ansatz enlargements: anti-phase or per-ring breathing modes off the common-phase channel (these break $\iota$ or $C_3$ and need a larger reduced system), constant-angular-momentum breathing (with $\omega(t)\rho(t)^2$ fixed rather than $\omega$), and axial drum-height breathing against rotation.

## Next Steps

1. Feed the post-breathing residual pump $\approx2.1\beta$ (rigid $\Phi_{\mathrm{tan}}\approx2.9\beta$ times the $\approx0.73$ breathing floor) to the escape-certificate lemma as the driving term the environment must beat.
2. Decide between the hinge/self-hit route and the Noether-sea export route as the next absorber test; the breathing result removes the last purely internal sub-field candidate in the scanned classes.
3. If the breathing class is revisited, test the ansatz enlargements in order of reduced-system cost: constant-angular-momentum breathing, axial-height breathing, then symmetry-broken per-ring modes; add first-harmonic radial balance to the residual system at that point.
