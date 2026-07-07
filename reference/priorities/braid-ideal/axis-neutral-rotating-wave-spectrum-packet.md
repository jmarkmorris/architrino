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

## Next Steps

1. Write the explicit residual functions for the $u=0$ rotating form (three unknowns plus lags) and solve numerically as a priority-only diagnostic.
2. Feed any candidate row to the angular-momentum sweep as a seed and to the interior-field and escape-certificate diagnostics.
3. Classify traced figures per the lissajou lane once two-frequency generalizations (breathing against rotation) are added.
