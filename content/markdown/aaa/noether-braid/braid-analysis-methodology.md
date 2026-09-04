# Candidate Braid Analysis Methodology

This chapter defines an analytical method for prescribed braid records. Its purpose is controlled comparison: every candidate is evaluated with the same [causal-wake formula](../foundations/architrino.md#the-wake-is-geometry-not-fluid), which constructs the source-dependent delayed geometry emitted by architrinos, and with the same probe set, retained-history rule, return window, and scoring rules before one geometry is said to cancel or expose more wake than another.

A prescribed record supplies known transmitter paths from which the delayed roots, wake superposition, virtual-probe response, cancellation, angular structure, and spectra can be evaluated at any event $(T,\mathbf X)$. The method concerns only those analytical consequences of the declared paths. It does not assess assembly stability, environmental support, or any unprescribed motion.

The phrase **absolute observer position** means a coordinate probe at an event $(T,\mathbf X)$ in absolute time and the Euclidean void. It does not introduce a Physical Observer or an effective spacetime frame. The native coordinates are

$$
(T,\mathbf X)=(T,X^1,X^2,X^3).
$$

[View →](../../../../equation-mapping.html#corpus-equation-d8a0d1e2beec2131)

## Analysis Record

Every published candidate analysis must identify one source record. At minimum that record carries:

- the paths $\mathbf X_j(T)$, velocities $\mathbf V_j(T)$, polarities $q_j$, and persistent identities of all architrinos;
- the exact assembly identity and complete characteristic row;
- the mathematical chart and numerical method used to evaluate the prescribed geometry;
- the retained history interval, analysis window, return duration $P_{\mathrm{ret}}$, and absolute-time origin $T_0$;
- when envelope geometry is reported, the exact directional-support grid, constant-time emission measure, centered path second-moment convention, and any quadratic-fit rule, tie-break, and tolerance;
- the field speed $c_f$, coupling convention, root policy, self-hit policy, and any mollifier or cutoff;
- the spatial probe set, enclosing surfaces, temporal sampling rule, and numerical tolerances; and
- the complete parameter vector, sampling algorithm and seed, and a publicly identifiable account of the numerical implementation.

Write the scored result as $\mathbf G[S;P]$, where $S$ is the complete source record and $P$ is the complete analysis protocol. The protocol includes the probe set, history depth, root policy, surface geometry, normalization, tolerances, and sampling rule.

A result for $S$ also applies to a changed source $S'$ only when the measure is invariant under that change. In particular:

- a path, radius, frequency, phase, group-translation, polarity, or retained-history change requires new roots and recomputation of every downstream wake measure;
- a probe, boundary, root-policy, normalization, or tolerance change defines a new protocol $P'$ and requires every compared candidate to be evaluated under $P'$;
- an added environmental response defines a different analysis outside the scope of this method; and
- a correction to descriptive labels leaves a numerical measure unchanged only when its mathematical inputs are unchanged.

Comparing $\mathbf G[S;P]$ directly with $\mathbf G[S';P']$ is uncontrolled unless the difference is explicitly presented as a sensitivity study. Any comparison that retains an earlier measure must explain why that measure is invariant under the changed inputs.

## Superimposed Causal-Wake Map

The $\mathbb{A}\mathbb{A}\mathbb{A}$-native wake equation used here is not an imported wave-equation partial differential equation. It constructs the superimposed causal-wake map from the same delayed causal isochrons used by the [Master Equation](../dynamics/master-equation.md#path-history-sum-and-integral-representation). The equation is the construction rule. For one declared source record and analysis protocol, its evaluated scalar is the wake map; the map's spatial or temporal structure is its wake pattern, and a frequency or angular-mode decomposition is its wake spectrum. An assembly's wake is shorthand for the superposition of its constituent architrino wakes, not emission by the assembly as a single transmitter.

For source $j$, emission time $T_t<T$, and coordinate probe $\mathbf X$, define

$$
\mathbf r_j(T,\mathbf X;T_t)
=
\mathbf X-\mathbf X_j(T_t),
\qquad
r_j=\|\mathbf r_j\|,
\qquad
\widehat{\mathbf r}_j=\frac{\mathbf r_j}{r_j},
$$

[View →](../../../../equation-mapping.html#corpus-equation-e799824be9554103)

and the causal constraint

$$
g_j(T,\mathbf X;T_t)
=
r_j(T,\mathbf X;T_t)-c_f(T-T_t).
$$

[View →](../../../../equation-mapping.html#corpus-equation-f19abad336f3ba8e)

The active emission-time roots are

$$
\mathcal C_j(T,\mathbf X)
=
\left\{
T_t<T:g_j(T,\mathbf X;T_t)=0
\right\}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-b6a121886318a05b)

The source-normalized signed wake equation is

$$
\boxed{
\mathcal W(T,\mathbf X)
=
\sum_j q_j
\int_{T_{\min}}^T
\frac{
\delta\!\left(g_j(T,\mathbf X;T_t)\right)
}{4\pi r_j^2(T,\mathbf X;T_t)}
\,dT_t
}
$$

[View →](../../../../equation-mapping.html#corpus-equation-20e0de54f61b12e3)

for the declared retained-history start $T_{\min}$. For fixed source record $S$ and protocol $P$, the resulting scalar $\mathcal W(T,\mathbf X)$ is the causal-wake map. It records signed causal-wake exposure under the declared source normalization. It is not by itself energy, potential, or acceleration.

For simple roots, define the transmitter-side factor

$$
D_{t,j}
=
c_f-\widehat{\mathbf r}_j\cdot\mathbf V_j(T_t).
$$

[View →](../../../../equation-mapping.html#corpus-equation-ee434d278de0fc08)

The delta integral collapses to

$$
\boxed{
\mathcal W(T,\mathbf X)
=
\sum_j
\sum_{T_t\in\mathcal C_j(T,\mathbf X)}
\frac{q_j}{4\pi r_j^2|D_{t,j}|}
}
$$

[View →](../../../../equation-mapping.html#corpus-equation-f7a2872bbe3e6d42)

when $|D_{t,j}|>0$ on every retained root. A root with $D_{t,j}=0$ is a caustic-like chart boundary and must be routed through the declared fold or regularization treatment rather than silently clipped.

Total path speed above $c_f$ does not by itself invalidate this reduction. It removes the global shortcut that proves $g_j$ strictly increasing from a whole-path speed bound, but the event can still contain finitely many transverse roots with either sign of $D_{t,j}$. The event-specific root policy therefore partitions the retained emission-time interval and, on each partition, uses declared bounds on speed, acceleration, distance, and the derivative

$$
\frac{\partial g_j}{\partial T_t}
=
D_{t,j}
=
c_f-\widehat{\mathbf r}_j\cdot\mathbf V_j(T_t)
$$

[View →](../../../../equation-mapping.html#corpus-equation-3f7ac54e0860fd3a)

to certify one of two dispositions:

1. the residual interval excludes zero, so the partition is root-free; or
2. the derivative interval excludes zero, so the partition is monotonic and any endpoint sign change isolates exactly one simple root.

Every isolated root is retained, including a descending branch with $D_{t,j}<0$. The root ordinal is assigned in increasing emission-time order for that transmitter. The event is complete only when every retained partition has one of the two certified dispositions. If a numerical subdivision limit is reached while a possible root or fold remains, the event is unresolved and has no valid score. The unresolved interval, transmitter identity, and reason the root count remains uncertain must be stated. An incomplete evaluation is not evidence that the geometry fails an analytical condition.

The unsigned companion ledger

$$
\mathcal W_{\mathrm{abs}}(T,\mathbf X)
=
\sum_j
\sum_{T_t\in\mathcal C_j(T,\mathbf X)}
\frac{|q_j|}{4\pi r_j^2|D_{t,j}|}
$$

[View →](../../../../equation-mapping.html#corpus-equation-b8f9f2a4191b5281)

separates weak net exposure caused by cancellation from weak exposure caused by small individual contributions. The pointwise signed-cancellation ratio

$$
\chi_{\mathcal W}(T,\mathbf X)
=
\frac{|\mathcal W(T,\mathbf X)|}
{\mathcal W_{\mathrm{abs}}(T,\mathbf X)+\varepsilon_{\mathcal W}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-1e52bfd7bdd58151)

lies near zero when the signed contributions cancel and near one when they reinforce, subject to the declared denominator floor $\varepsilon_{\mathcal W}>0$.

### Explicit Prescribed-Orbit Reduction

For a circular prescribed endpoint with fixed orbit center $\mathbf C_j$, orthonormal plane vectors $\mathbf u_j$ and $\mathbf v_j$, radius $R_j$, angular frequency $\omega_j$, and phase $\phi_j$, write

$$
\mathbf X_j(T_t)
=
\mathbf C_j
+
R_j\left[
\mathbf u_j\cos(\omega_jT_t+\phi_j)
+
\mathbf v_j\sin(\omega_jT_t+\phi_j)
\right].
$$

[View →](../../../../equation-mapping.html#corpus-equation-2de02b2d369f91aa)

At an arbitrary event $(T,\mathbf X)$, define

$$
\mathbf d_j=\mathbf X-\mathbf C_j,
\qquad
A_j=\mathbf d_j\cdot\mathbf u_j,
\qquad
B_j=\mathbf d_j\cdot\mathbf v_j,
$$

[View →](../../../../equation-mapping.html#corpus-equation-c43c716286202ab0)

$$
H_j=\sqrt{A_j^2+B_j^2},
\qquad
\delta_j=\operatorname{atan2}(B_j,A_j).
$$

[View →](../../../../equation-mapping.html#corpus-equation-61ccf6bc23419b70)

The causal-root condition then reduces exactly to the scalar equation

$$
\boxed{
c_f^2(T-T_t)^2
=
\|\mathbf d_j\|^2+R_j^2
-2R_jH_j\cos(\omega_jT_t+\phi_j-\delta_j)
}
$$

[View →](../../../../equation-mapping.html#corpus-equation-00ad37719d748130)

for each transmitter $j$. Thus the full spatial problem does not require evolving the source: at each requested $(T,\mathbf X)$, solve this one-dimensional delayed-time equation over the retained history, substitute all certified roots into $\mathcal W$ or $\mathbf A_p$, and sum the six endpoint contributions. A translating orbit is handled by placing the declared center path $\mathbf C_j(T_t)$ directly in the original causal equation; the fixed-center reduction above applies in a co-translating coordinate chart only when that chart and its conversion back to absolute coordinates are stated.

This reduction supports complete time traces, spatial slices, enclosing-surface maps, angular decompositions, and spectra for prescribed circular records. More general prescribed paths use the same root equation $g_j=0$ without the circular trigonometric reduction.

### Virtual-Probe Response

The scalar wake map does not encode the polarity or direction of a receiving architrino. For a stationary virtual probe with declared charge $q_p$ at $\mathbf X$, the acceleration-first response is

$$
\boxed{
\mathbf A_p(T,\mathbf X;q_p)
=
\sum_j
\sum_{T_t\in\mathcal C_j(T,\mathbf X)}
\kappa\,\operatorname{sign}(q_jq_p)|q_jq_p|
\frac{c_f}{|D_{t,j}|}
\frac{\widehat{\mathbf r}_j}{r_j^2}
}
$$

[View →](../../../../equation-mapping.html#corpus-equation-450e402b2ac14c29)

under the canonical simple-root acceleration convention of the Master Equation. The stationary probe is a comparison instrument, not an added source in the braid record. Positive- and negative-polarity probe responses must be reported separately when their distinction matters.

For a moving diagnostic probe $\mathbf X_p(T)$, the same arriving-hit strength applies at its current position. Its velocity changes root playback through

$$
m_{p\leftarrow j}
=
\frac{D_{r,j}}{D_{t,j}},
\qquad
D_{r,j}
=
c_f-\widehat{\mathbf r}_j\cdot\mathbf V_p(T),
$$

[View →](../../../../equation-mapping.html#corpus-equation-639b558f96b531cf)

but $D_{r,j}$ does not multiply the instantaneous acceleration.

## Wakes Experienced Inside the Braid

At receiver architrino $i$, set $\mathbf X=\mathbf X_i(T)$ and exclude $i$ from the transmitter sum to obtain the wake received from the other architrinos:

$$
\boxed{
\mathbf A_i^{\mathrm{others}}(T)
=
\sum_{j\ne i}
\sum_{T_t\in\mathcal C_{i\leftarrow j}(T)}
\mathbf A_{i\leftarrow j}(T;T_t)
}
$$

[View →](../../../../equation-mapping.html#corpus-equation-48521c1fd99cce8c)

Self-hit acceleration, when active, is recorded separately as $\mathbf A_i^{\mathrm{self}}(T)$. This separation prevents a geometry with strong self-hit support from being mistaken for one stabilized by inter-architrino exchange.

Over the complete orbital or return cycle,

$$
T_0\le T<T_0+P_{\mathrm{ret}},
$$

[View →](../../../../equation-mapping.html#corpus-equation-387e54177ff768a5)

Here $P_{\mathrm{ret}}$ is the declared complete-history return period of the braid.

The cycle-resolved analysis retains each pairwise contribution, the net vector, its components in the declared braid frame, root identities, $D_t$ margins, and root-playback derivatives. Cycle averages must not replace peak values or root-transition events.

Because the paths are known, their required kinematic acceleration is also known analytically. Define the prescribed-path equation mismatch

$$
\boxed{
\mathbf R_i^{\mathrm{path}}(T)
=
\frac{d^2\mathbf X_i}{dT^2}
-
\left(
\mathbf A_i^{\mathrm{others}}(T)
+
\mathbf A_i^{\mathrm{self}}(T)
\right)
}
$$

[View →](../../../../equation-mapping.html#corpus-equation-bd35bd7213eae37d)

under the declared self-hit convention. This is a pointwise comparison between the acceleration required by the prescribed path and the acceleration supplied by the analytical causal-hit sum. Its peak, RMS, mean vector, phase dependence, and per-binary decomposition are legitimate prescribed-record measures. If the self-hit term or another accepted acceleration contribution is unavailable, the result must be labeled a partial mismatch rather than a complete Master Equation residual. A small mismatch measures compatibility of the declared chart with the evaluated acceleration contributions; it does not establish stability.

When the declared isolated acceleration inventory is certified complete, summing these rows gives a stronger falsification-only reduction. Define

$$
\mathbf S_A(T)
=
\sum_i \mathbf A_i(T)
$$

[View →](../../../../equation-mapping.html#corpus-equation-a3dbf374c52a2605)

for the evaluated canonical-kernel acceleration supplied to every declared architrino. If the prescribed kinematics satisfy

$$
\sum_i \frac{d^2\mathbf X_i}{dT^2}=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-ab18edbcaca5670d)

pointwise, as occurs for antipodal prescribed pairs about inertially moving centers, then any exact solution on that prescribed history must satisfy

$$
\boxed{
\mathbf S_A(T)=0
}
$$

[View →](../../../../equation-mapping.html#corpus-equation-bfbe66e65d843015)

at every evaluation time. This follows directly by summing the individual equations of motion; it introduces no force, mass, momentum, return-map, or stability assumption. The prescribed pair accelerations cancel before the interaction law is evaluated, so the complete evaluated acceleration sum must also cancel at each instant if that exact history solves the equations.

A value of $\|\mathbf S_A(T)\|$ beyond the declared numerical tolerance and convergence allowance falsifies only that exact isolated prescribed history under the certified inventory. A zero value is recorded only as not falsified by this screen. It does not establish a branch, a taxonomy member, stability, retention, or physical realization. If the same-worldline contribution, root inventory, or another contribution inside the declared isolated system is not certified complete, the screen is inapplicable rather than partial.

The summed row can hide equal-and-opposite member errors. Therefore a certified complete inventory also carries the stronger pointwise member screen

$$
E_\infty(W)
=
\max_{\substack{i\\T\in W}}
\left\|
\mathbf R_i^{\mathrm{path}}(T)
\right\|,
\qquad
E_2(W)
=
\left[
\frac{1}{N|G_W|}
\sum_i\sum_{T\in G_W}
\left\|
\mathbf R_i^{\mathrm{path}}(T)
\right\|^2
\right]^{1/2},
$$

[View →](../../../../equation-mapping.html#corpus-equation-114a9d058c00b424)

where $G_W$ is the declared time grid in window $W$. Any sampled member residual above the declared numerical threshold falsifies that exact isolated prescribed history even when $\sum_i\mathbf R_i^{\mathrm{path}}=0$. A sampled near-zero is only a search diagnostic and must survive time-grid refinement and independent causal-root residual checks. Two wrong accelerations can cancel in the total. Checking every architrino separately prevents that cancellation from hiding a bad prescribed record.

For a declared cycle split into first and second halves, $W_P=W_{1/2}^{(1)}\cup W_{1/2}^{(2)}$, the same-grid reductions obey

$$
E_\infty(W_P)
=
\max\left\{
E_\infty(W_{1/2}^{(1)}),
E_\infty(W_{1/2}^{(2)})
\right\},
$$

[View →](../../../../equation-mapping.html#corpus-equation-c261ebabc6589fa6)

and

$$
E_2(W_P)^2
=
\frac{
|G_1|E_2(W_{1/2}^{(1)})^2
+
|G_2|E_2(W_{1/2}^{(2)})^2
}{
|G_1|+|G_2|
}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-2bc4b23304c70db2)

Thus one half-cycle is useful only as a staged early rejector. Candidate search minimizes the refined full-cycle $E_\infty$ first and refined full-cycle $E_2$ second, while retaining both half-cycle peaks and their imbalance as diagnostics. One favorable half cannot support positive selection; both halves are required, and the window split changes no return-symmetry or taxonomy contract. The full-cycle worst error is exactly the worse half's worst error. Testing one half can save work when it already fails, but passing one half says nothing about the other half.

## Probe Geometry

A candidate should be tested on the same nested probe geometry:

1. the braid center and each binary midpoint;
2. each architrino path and declared binary axis;
3. a three-dimensional interior grid covering the path-history envelope;
4. one or more enclosing surfaces $S_R$ outside that envelope;
5. a far-field directional grid with enough angular resolution to separate isotropic and anisotropic leakage; and
6. adaptive samples near small-$|D_t|$ roots, close approaches, envelope extrema, and rapid phase changes.

The enclosing radius $R$ must be large enough to test the intended far-field approximation and varied to show whether the extracted angular coefficients have settled. A single favorable direction cannot establish external wake cancellation.

## Objective Measures

Every measure in this chapter is a deterministic analytical consequence of a prescribed source record. Root finding, quadrature, and sampling may be performed numerically, but they evaluate the declared formulas rather than evolving the source.

### Prescribed-Record Analytical Measures

| Measure | Definition or required record | What it tests |
| --- | --- | --- |
| Prescribed-period closure | Position, velocity, and phase differences between $T_0$ and $T_0+P_{\mathrm{ret}}$ | Whether the declared formulas and chosen return period are internally consistent |
| Minimum separation | $d_{\min}=\min_{T,i\ne j}\|\mathbf X_i(T)-\mathbf X_j(T)\|$ | Whether the prescribed chart contains a collision, an undeclared coincidence, or a near-singular pair geometry |
| Exact directional support | $H_{\mathrm{env}}(\hat{\mathbf m};W)$ on a declared directional grid, with angular refinement | The furthest centered constituent-path excursion in each direction and therefore the convex hull over the declared window; non-convex indentations are not retained |
| Centered path second moment | Six independent components, eigenvalues, and non-degenerate principal directions of $\mathsf M_{\mathrm{env}}^{ab}(W)$ under the constant-time emission measure | Dwell-weighted scale, anisotropy, and orientation of the centered path distribution |
| Quadratic-envelope fit | Positive-definite $\mathsf Q_{\mathrm{env}}^{ab}(W)$, angular fitting rule, tie-break, and $\mathcal R_Q(W)$ | Whether the exact directional support is adequately compressed by one ellipsoid for the intended geometric approximation |
| Support-moment disagreement | Principal-subspace angles or normalized-tensor mismatch between admitted $\mathsf Q_{\mathrm{env}}$ and $\mathsf M_{\mathrm{env}}$ | Whether boundary extrema and dwell-weighted path occupancy support one quadratic summary |
| Root-transversality margin | $\min|D_{t,j}|$ over all retained probe and internal roots | Distance from an unresolved causal-root fold |
| Root-topology ledger | Root counts, identities, births, deaths, and reconnections versus $T$ | Whether averaged curves hide causal-branch changes |
| Internal prescribed-path response | Per-endpoint peak, RMS, and cycle integral of $\mathbf A_i^{\mathrm{others}}$ evaluated on the prescribed paths | The acceleration that the other prescribed paths would deliver, not whether those paths persist |
| Prescribed-path equation mismatch | Peak, RMS, mean, phase-resolved, and per-binary rows of $\mathbf R_i^{\mathrm{path}}$; when its hypotheses hold, the falsification-only pointwise sum $\mathbf S_A(T)$ | Pointwise compatibility between the prescribed kinematics and the evaluated acceleration contributions, without promoting a non-falsifying sum to a branch claim |
| External signed exposure | $\mathcal W$ on $S_R$ through the complete cycle | Net polarity-signed wake exposure |
| External raw exposure | $\mathcal W_{\mathrm{abs}}$ on $S_R$ through the complete cycle | Wake strength before signed cancellation |
| Complete-cycle signed normal wake flux | $F_{\mathrm{signed}}(R)$ from the outward-normal projection of the signed causal-wake contributions | The global signed crossing total, which vanishes for a polarity-neutral assembly and is therefore not a cancellation score |
| Complete-cycle raw normal wake flux | $F_{\mathrm{raw}}(R)$ with transmitter and root identities retained before absolute aggregation | The emitted wake measure crossing $S_R$ before polarity cancellation; its source-normalized reference is $P_{\mathrm{ret}}\sum_j|q_j|$ |
| Complete-cycle residual normal wake flux | $F_{\mathrm{res}}(R)$ from the absolute locally superposed signed normal flux | How much local signed wake survives cancellation over the complete cycle |
| Complete-cycle normal wake-flux cancellation | $\eta_{\mathcal W,\mathrm{flux}}(R)=F_{\mathrm{res}}(R)/F_{\mathrm{raw}}(R)$ | Linear wake cancellation under the declared enclosing-surface convention, not energy or work |
| Frequency-resolved normal wake-flux cancellation | $\eta_{\mathcal W,\mathrm{flux}}^{(\ell mn)}(R)$ from transmitter-root-tagged complex coefficients | Which temporal harmonics and angular modes survive phase-sensitive signed superposition at each enclosing radius |
| Resonance-block cancellation score | $C_L(m,n;\phi)$ with certified tail bound $\varepsilon_L$ for a declared lock | Whether the leading score gap over every alternative exceeds $2\varepsilon_L$ under the [axially separated 4:2:1 reference cancellation certificate](three-binary-4-2-1-frequency-lock.md#rg-style-truncation-test) |
| Directional response | $\mathbf A_p$ for both probe polarities on $S_R$ | Vector exposure and polarity dependence |
| Angular ledger | Cycle-resolved isotropic and higher angular coefficients | Which external angular channels survive cancellation |
| Anisotropy | Non-isotropic far-field ledger relative to the naive constituent ledger | Whether a scalar cancellation summary is adequate |
| Spatial response gradient | $\nabla_{\mathbf X}\mathbf A_p$ away from source paths and causal-root folds | How differently nearby absolute-coordinate probes respond |
| Temporal variation | $\partial_T\mathcal W$ and $\partial_T\mathbf A_p$ on continuous root branches | Peak rate of change and phase localization of wake features |
| Radial scaling | The same angular and exposure rows evaluated over a declared sequence of enclosing radii $R$ | Whether a claimed far-field regime and its power-law scaling have been reached |
| Symmetry residual | Difference between a measure and its transform under each declared chart symmetry | Which prescribed symmetries survive in the causal-wake field |
| Spectral ledger | Fourier coefficients over $P_{\mathrm{ret}}$ for selected internal and external rows | Harmonic content, sidebands, and phase locking |
| Source-parameter sensitivity | Recomputed measures under declared changes of radius, frequency, phase, orientation, and translation | How dependent the analytical result is on the prescribed coordinates |
| Numerical convergence | Change under tighter root and quadrature tolerances for the same $S$ and $P$ | Whether the analytical result has been evaluated accurately |

Minimum separation is a validity diagnostic, not a claim that architrinos are hard objects. A zero separation may make the $1/r^2$ response singular or expose an undeclared coincidence in the chart. A small separation warns that a reported score may be dominated by a near-singular pair. It should normally be a validity condition or an annotation, not a reward to maximize.

Envelope extraction follows [Braid Envelope Geometry](braid-envelope-geometry.md#exact-support-and-centered-path-second-moments). Report $H_{\mathrm{env}}$ and $\mathsf M_{\mathrm{env}}$ from the same declared source record and emission window, refine both temporal sampling and the support-direction grid, and preserve rank loss or repeated-eigenvalue ambiguity rather than inventing a three-dimensional principal frame. A quadratic fit is reportable only when its angular quadrature, optimizer, deterministic tie-break, and tolerance were fixed before inspection and $\mathcal R_Q$ passes that tolerance. Agreement between the support fit and the second moment is same-record implementation consistency, not independent confirmation; disagreement falsifies only the proposed single-quadratic compression for the intended geometric approximation. The maximum-reach envelope and the dwell-weighted tensor are two readings of the same paths. Refinement checks whether those readings were computed accurately, but their mutual agreement cannot prove that the prescribed paths are dynamically retained or physically realized.

The **prescribed-period closure residual** checks only that the declared orbital path formulas return to the same position relative to the declared common translating center, and to the same velocity and phase, after $P_{\mathrm{ret}}$. The absolute displacement of a translating source is recorded separately as $\mathbf V_{\mathrm{grp}}P_{\mathrm{ret}}$ and is subtracted before computing the orbital position residual. Closure is often zero by construction and is an integrity check on the chart and selected period, not a stability measure. Root and wake ledgers may also be checked for periodicity, but their endpoint differences remain analytical consistency diagnostics.

Spatial and temporal derivatives must be evaluated branch by branch. At a causal-root birth, death, or fold, the discontinuity or singular behavior is itself the reported event; a derivative must not be fabricated by differencing across it.

Two additional diagnostics are useful but must not be mislabeled as energy. Define the cycle-and-surface external-exposure norm

$$
\mathcal L_{\mathrm{ext}}(R)
=
\frac{1}{P_{\mathrm{ret}}}
\int_{T_0}^{T_0+P_{\mathrm{ret}}}
\int_{S_R}
\|\mathbf A_p(T,\mathbf X)\|^2
\,dA\,dT
$$

[View →](../../../../equation-mapping.html#corpus-equation-5b13ed230f4f5388)

and the corresponding uncancelled norm $\mathcal L_{\mathrm{raw}}(R)$ formed by replacing the net vector with the sum of constituent response magnitudes before squaring. Then

$$
\eta_{\mathrm{ext}}(R)
=
\frac{\mathcal L_{\mathrm{ext}}(R)}
{\mathcal L_{\mathrm{raw}}(R)+\varepsilon_L}
$$

[View →](../../../../equation-mapping.html#corpus-equation-c091ecaa794c4b50)

is a geometry-response exposure fraction. It measures external cancellation under a declared probe and surface convention. It is analytically computable from a prescribed record and is not the apparent-energy fraction.

### Complete-Cycle Normal Causal-Wake Flux

The causal-wake map also supports a linear complete-cycle surface diagnostic. It is distinct from the acceleration-squared exposure fraction and from every energy construction. A plain surface integral of $\mathcal W$ is insufficient because it omits the direction in which each causal wake crosses the surface.

For a retained simple root emitted by transmitter $j$, define its outward-normal wake-flux density on $S_R$ by

$$
f_{j,T_t}(T,\mathbf X)
=
\frac{q_jc_f}{4\pi r_j^2|D_{t,j}|}
\widehat{\mathbf r}_j\cdot\widehat{\mathbf n}
$$

[View →](../../../../equation-mapping.html#corpus-equation-5cdacddfb9e7882c)

where $\widehat{\mathbf n}$ is the outward unit normal. The signed, raw, and residual complete-cycle measures are

$$
F_{\mathrm{signed}}(R)
=
\int_{T_0}^{T_0+P_{\mathrm{ret}}}
\int_{S_R}
\sum_j\sum_{T_t\in\mathcal C_j(T,\mathbf X)}
f_{j,T_t}(T,\mathbf X)
\,dA\,dT
$$

[View →](../../../../equation-mapping.html#corpus-equation-21fb6a55b1345889)

$$
F_{\mathrm{raw}}(R)
=
\int_{T_0}^{T_0+P_{\mathrm{ret}}}
\int_{S_R}
\sum_j\sum_{T_t\in\mathcal C_j(T,\mathbf X)}
\left|f_{j,T_t}(T,\mathbf X)\right|
\,dA\,dT
$$

[View →](../../../../equation-mapping.html#corpus-equation-621040bc250ec783)

and

$$
F_{\mathrm{res}}(R)
=
\int_{T_0}^{T_0+P_{\mathrm{ret}}}
\int_{S_R}
\left|
\sum_j\sum_{T_t\in\mathcal C_j(T,\mathbf X)}
f_{j,T_t}(T,\mathbf X)
\right|
\,dA\,dT
$$

[View →](../../../../equation-mapping.html#corpus-equation-3beaede78df94500)

The raw measure takes absolute values before transmitter contributions are superposed. The residual measure superposes the signed contributions first and then takes the absolute value. Their ratio

$$
\eta_{\mathcal W,\mathrm{flux}}(R)
=
\frac{F_{\mathrm{res}}(R)}{F_{\mathrm{raw}}(R)}
$$

[View →](../../../../equation-mapping.html#corpus-equation-34d872d3fa9ec86f)

is admitted only when $F_{\mathrm{raw}}(R)$ exceeds the predeclared positive floor. The triangle inequality then gives $0 \le \eta_{\mathcal W,\mathrm{flux}}(R) \le 1$. Values near zero indicate strong local signed cancellation over the complete cycle; values near one indicate that little of the raw normal wake flux cancels.

The instantaneous normal fluxes on two enclosing spheres need not agree. At the same absolute time, the inner and outer spheres are crossed by wake surfaces emitted at different transmitter phases. No individual wake front stalls: the difference is the time derivative of the integrated wake measure currently in transit between the spheres. For nested fixed volumes $V_1\subset V_2$ containing every transmitter path,

$$
\Phi_{\mathrm{raw}}(R_2,T)
-
\Phi_{\mathrm{raw}}(R_1,T)
=
-\frac{d}{dT}
N_{\mathrm{raw}}(V_2\setminus V_1,T)
$$

[View →](../../../../equation-mapping.html#corpus-equation-bdd8559a176dbb70)

If the prescribed paths, retained history, and in-transit wake measure all return after $P_{\mathrm{ret}}$, integration over the complete cycle removes this storage difference. For fixed convex enclosing surfaces,

$$
F_{\mathrm{raw}}(R)
=
P_{\mathrm{ret}}\sum_j|q_j|.
$$

[View →](../../../../equation-mapping.html#corpus-equation-127c3043301fa2f7)

This identity is both the source-normalized reference and an independent implementation check. The signed global integral similarly equals $P_{\mathrm{ret}}\sum_jq_j$ and therefore vanishes for a polarity-neutral braid. The residual $F_{\mathrm{res}}(R)$ and its ratio may still depend on radius because the signed contributions superpose differently after different causal travel delays. A far-field plateau is a measured radial result, not an assumed invariance.

These quantities measure causal-wake crossings only. They are not energy, potential, realized work, braid depletion, intrinsic leakage, or stability. The wake-flux measures are invalid when roots or history are incomplete, a transmitter leaves an enclosing surface, the raw cycle integral fails its source-normalized reference after refinement, or the primary and refined time-and-surface quadratures fail their declared tolerance.

#### Frequency-Resolved Normal Wake-Flux Cancellation

The complete-cycle scalar $\eta_{\mathcal W,\mathrm{flux}}(R)$ combines every temporal frequency and angular pattern. It therefore cannot show whether one wake harmonic cancels strongly while another survives. The phase-sensitive reduction must occur before any absolute aggregation.

Let $a$ identify a retained transmitter-root branch, let $Y_{\ell m}$ be the declared real orthonormal spherical-harmonic basis, and let $\Omega_0=2\pi/P_{\mathrm{ret}}$. Define

$$
\widetilde f_{a,\ell mn}(R)
=
\frac{1}{P_{\mathrm{ret}}}
\int_{T_0}^{T_0+P_{\mathrm{ret}}}
e^{-in\Omega_0(T-T_0)}
\int_{S_R}
f_a(T,\mathbf X)Y_{\ell m}(\widehat{\mathbf X})
\,dA\,dT.
$$

[View →](../../../../equation-mapping.html#corpus-equation-e1e595c1c6b986e6)

Here $P_{\mathrm{ret}}$ is the declared complete-history return period of the braid.

The coefficient retains temporal phase, angular mode, enclosing radius, transmitter identity, and root ordinal. Form the raw and net coefficient magnitudes only after every transmitter-root coefficient exists:

$$
A_{\mathrm{raw},\ell mn}(R)
=
\sum_a\left|\widetilde f_{a,\ell mn}(R)\right|,
\qquad
A_{\mathrm{net},\ell mn}(R)
=
\left|\sum_a\widetilde f_{a,\ell mn}(R)\right|.
$$

[View →](../../../../equation-mapping.html#corpus-equation-c4b11106e26ccda2)

For $A_{\mathrm{raw},\ell mn}$ above the declared effective coefficient floor, define

$$
\eta_{\mathcal W,\mathrm{flux}}^{(\ell mn)}(R)
=
\frac{A_{\mathrm{net},\ell mn}(R)}
{A_{\mathrm{raw},\ell mn}(R)}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-cf11e32029fb0890)

The triangle inequality gives $0 \le \eta_{\mathcal W,\mathrm{flux}}^{(\ell mn)}(R) \le 1$. A value near zero identifies strong phase-sensitive cancellation in one temporal-harmonic and angular-mode channel. A value near one identifies little cancellation in that channel. The reducer also reports the Euclidean norm over the retained angular modes for each temporal harmonic and evaluates those rows across the declared enclosing radii.

The effective coefficient floor is the larger of a declared absolute floor and a declared fraction of the largest raw coefficient on that enclosing surface. Source-root coefficients below that floor remain available as diagnostic rows, but they do not receive accepted cancellation ratios. A logarithmic radial fit for a net coefficient or cancellation ratio additionally requires the net magnitude to exceed the same floor at every fitted radius. This prevents numerical zero from acquiring an arbitrary radial exponent.

The frequency ledger must report retained-band coverage. A coefficient is accepted only when transmitter-root tags reconstruct the sampled signed normal flux, primary and refined grids agree within tolerance, and the transmitter-tagged signal outside the retained harmonic band remains below its declared RMS fraction. A Fourier transform of the rectified trace $\int_{S_R}|\sum_a f_a|\,dA$ is a different diagnostic: rectification creates sum, difference, and multiple frequencies. Those created frequencies must not be reported as transmitter-emission frequencies.

These complex coefficients, coefficient magnitudes, and cancellation ratios are signal-processing wake diagnostics. They are not spectral energy, energy transport, or realized work.

## Analytical Claim Boundary

The signed wake $\mathcal W$, unsigned wake $\mathcal W_{\mathrm{abs}}$, virtual-probe response $\mathbf A_p$, angular coefficients, exposure fraction $\eta_{\mathrm{ext}}$, and complete-cycle normal wake-flux measures are the available analytical ledgers. None is an energy quantity. This method therefore does not report total energy, apparent energy, apparent-energy fractions, escaping energy, intrinsic leakage, or stability scores. It also does not include a Noether-sea response. Introducing any such quantity requires a separate definition and cannot be accomplished by relabeling a wake-exposure measure.

## Numerical Evaluation

The measures in this chapter require analytical programs that evaluate the declared formulas for an exact source record. These programs are not assembly-evolution simulations. They hold the prescribed paths fixed and calculate their consequences at the requested absolute-coordinate events.

Numerical evaluation consists of:

1. validating and evaluating the source paths, velocities, accelerations, periods, and taxonomy coordinates;
2. enumerating every retained causal root and recording its identity, topology, and $D_t$ margin;
3. evaluating $\mathcal W$, $\mathcal W_{\mathrm{abs}}$, $\chi_{\mathcal W}$, and $\mathbf A_p$ at internal and external probes;
4. reducing the event-level results into the separation, root, mismatch, exposure, complete-cycle normal wake-flux, angular, spectral, radial-scaling, symmetry, and sensitivity measures defined above; and
5. reporting the results together with the complete source definition and analysis protocol.

Each calculation must state its numerical tolerances and convergence checks. Where a closed-form, symmetry-protected, static, or other independently known analytical case exists, it should be used as an independent check. Replaying output from the same program establishes reproducibility, not correctness.

A common, validated set of measures is necessary for comparing a broad sample of configurations. Sampling more configurations cannot compensate for an undefined or unreliable comparison.

## Monte Carlo Configuration-Space Analysis

Let $\boldsymbol\theta$ contain the complete taxonomy coordinates, group speed, phase origin, and any permitted prescribed-history coordinates. A sampling study must specify the domain $\Theta$, units, constraints, and sampling measure. There is no coordinate-free meaning to “random braid”; uniform sampling in radius, logarithmic radius, speed, or frequency represents different candidate populations.

### Degrees of Freedom by Exact Configuration

A degree of freedom is an independently variable source coordinate whose change can alter at least one prescribed worldline or its polarity-tagged contribution after the selected member's constraints are imposed. A derived quantity is not counted again. In particular, only two coordinates in

$$
R_a^2=h_a^2+\rho_a^2
$$

[View →](../../../../equation-mapping.html#corpus-equation-d25b45684b031b0c)

are independent. Here $R_a$ is the endpoint distance from the binary midpoint, $h_a$ is the axial half-separation, and $\rho_a$ is the transverse orbit radius measured from the binary axis. The phrase “orbit radius from the axis” therefore means $\rho_a$, not $R_a$, except on a zero-axial-offset locus where $h_a=0$ and $\rho_a=R_a$.

The coordinate types recur across the taxonomy, but they are not all independently free in every member:

| Coordinate type | Status across the studied six- and twelve-architrino configurations | Constraint or interpretation |
| --- | --- | --- |
| Binary radius $R_a$ and transverse orbit radius $\rho_a$ | Present in every binary record | $R_a$ and $\rho_a$ coincide only when $h_a=0$. An axial binary with $\rho_a=0$ has no circular path even if $R_a>0$. |
| Binary frequency $f_a$ | Present in every binary record | The two endpoints of one neutral binary share a frequency. Equal-frequency and fixed-ratio members reduce several frequency coordinates to one scale. At $\rho_a=0$, frequency remains a record label but does not change the path. |
| Binary phase $\phi_a$ | Present in every binary record and required in addition to radius and frequency | Phase is measured relative to the common braid-level zero point. Some members fix the relative phases. At $\rho_a=0$, phase does not change the path. |
| Binary midpoint and axis data | Present in every braid record | Orthogonal-axis three-binary configurations constrain three axes through $\lambda_A$; the coincident-axis three-binary locus makes the three axes and midpoints coincide; two-component circular configurations order twelve architrino worldlines on one common axis. |
| Group velocity $\mathbf V_{\mathrm{grp}}$ | Present at assembly level | The common scalar taxonomy coordinate is $s_{\mathrm{grp}}=\|\mathbf V_{\mathrm{grp}}\|$. Orthogonal-axis three-binary configurations fix its direction to $\hat{\mathbf u}_A$; the axial coincident-axis three-binary locus is a specialization rather than the whole coincident-axis three-binary locus class. |
| Circulation sense and endpoint polarity assignment | Required discrete source choices | A member may lock circulation within or between braids. Neutrality fixes one electrino and one positrino per binary, but which persistent endpoint carries each polarity still changes the signed source record. |
| Architrino worldline count and binary grouping | Record-defining discrete choices | The six-architrino records contain three neutral binaries. Two-component circular records contain twelve worldlines in six neutral binaries and require an explicit fixed-point-free counterpart map. |
| Axial spacing | Not universal | The axially separated orthogonal-axis locus and coincident-axis three-binary locus use binary axial half-separations $h_a$ along their respective binary axes. Two-component circular configurations carry the complete ordered spacing vector $\mathbf d_C$; the coaxial-separated co-rotating through coaxial two-planar-braid counter-rotating configurations additionally carry the coincident-axis three-binary locus-component center separation $d_C$. General orthogonal-axis three-binary configurations have no single common axis on which all orbits can be spaced. |
| Orbit order along one axis | Not an independent universal coordinate | In a coaxial chart, order is derived by sorting the signed axial positions. Persistent binary indices do not change when two radii, frequencies, or axial positions cross. Order becomes a separate discrete choice only when assigning different path or polarity data to the ordered sites changes the source record. |

Thus radius, frequency, phase, and group translation are the common kinematic coordinate types. Axis and midpoint data, circulation, and endpoint polarity assignment are also required source coordinates. Axial spacing and axial order belong only to charts that actually have a common axis; they must not be imposed on every candidate.

The member-level inventory below describes the admissible taxonomy space. An orthogonal-axis three-binary sample restricted to $\lambda_A=0$ covers only that subspace; conclusions about variable flattening require sampling the wider orthogonal-axis three-binary coordinate.

| Exact configuration description | Independent continuous coordinates beyond the common radius, frequency, phase, and group-translation columns | Relations that add or remove freedom |
| --- | --- | --- |
| Coincident-midpoint orthogonal-axis record | Flattening $\lambda_A$ | $h_a=0$ for all three binaries; $R_a$, $f_a$, and $\phi_a$ may otherwise differ. |
| Coincident-midpoint common-frequency record | $\lambda_A$ | One common frequency; radii and phases remain independently assignable. |
| Coincident-midpoint equal-radius record | $\lambda_A$ | One radius, one frequency, fixed phases $0$, $2\pi/3$, and $4\pi/3$. |
| Coincident-midpoint fixed-ratio records | $\lambda_A$ | One base frequency with the indexed ratio $4{:}2{:}1$ or $3{:}2{:}1$; radii and phases remain independently assignable. |
| Phase-compensated equal-geometry record | $\lambda_A$ and one common axial/transverse decomposition coordinate in addition to the common radius | All three binaries have the same $R$, $h$, $\rho$, $f$, and circulation; phases are fixed $120^\circ$ apart. |
| Axially separated orthogonal-axis record | $\lambda_A$ and one axial/transverse decomposition coordinate per binary in addition to $R_a$ | Each binary may independently choose its geometry, frequency, and phase subject to $R_a^2=h_a^2+\rho_a^2$. |
| Axially separated common-frequency record | The axially separated decomposition coordinates and $\lambda_A$ | One common frequency; radii, decompositions, and phases remain independently assignable. |
| Axially separated equal-radius record | The axially separated decomposition coordinates and $\lambda_A$ | One common radius and frequency with fixed $120^\circ$ phase spacing; the three decompositions may still differ. |
| Axially separated fixed-ratio records | The axially separated decomposition coordinates and $\lambda_A$ | One base frequency with the indexed ratio $4{:}2{:}1$ or $3{:}2{:}1$; radii, decompositions, and phases remain independently assignable. |
| Axial-transverse coincident-axis interior record | One axial/transverse decomposition coordinate per binary in addition to $R_a$ | One common midpoint, axis, frequency, and circulation; $h_a>0$ and $\rho_a>0$. Axial orbit-plane order is derived from the resulting signed offsets. |
| High-axial coincident-axis interior record | The same coincident-axis decomposition coordinates | The inequalities $h_a>\rho_a>0$ further restrict the domain. |
| Planar common-center three-binary record | No additional continuous internal coordinate beyond the common columns | The all-equatorial boundary fixes $h_a=0$ and $\rho_a=R_a$; frequency and circulation are common. |
| Coincident-center two-component records | Eleven positive spacings after fixing the common axial origin, twelve radii, twelve frequencies, twelve phases, and an explicit six-binary counterpart map | One record fixes common circulation; its peer fixes opposite senses on the two ordered six-index subsets. Equal radii, equal spacings, reflection symmetry, and component-braid decomposition are additional characteristics rather than inherited relations. |
| Coaxial-separated two-component records | Two coincident-axis three-binary coordinate sets, positive axial component-center separation $d_C$, and the relative transverse-frame/phase relation | Both components are coaxial. One peer fixes equal component circulation senses and the other fixes opposite senses; equality of the two component frequencies is not required. |
| Coaxial-separated two-planar-braid records | Two planar common-center three-binary coordinate sets, positive axial component-center separation $d_C$, and the relative transverse-frame/phase relation | Both components are coaxial and all-equatorial. One peer fixes equal component circulation senses and the other fixes opposite senses; equality of the two component frequencies is not required. |

An overall shift of absolute-time origin changes the stored phase coordinates, and an overall global spatial placement changes the stored centers and frames. Whether those are sampled coordinates or fixed frame conventions depends on the probe and environment protocol. A sampling study must state that convention before reporting a numerical degree-of-freedom count.

The coincident-axis three-binary locus sampling domain requires $\sum_a\rho_a^2>0$. In the purely axial limit, $\rho_a=0$ and $h_a=R_a$ for every binary, so frequency and phase no longer change the endpoint paths. This limit has no internal orbital motion and serves only as an axial-limit control, not an orbiting coincident-axis three-binary locus candidate.

For coaxial-separated co-rotating two-component configuration through coaxial two-planar-braid counter-rotating configuration, the axial component-center separation $d_C$ is a required Monte Carlo coordinate in $\boldsymbol\theta$. Each sampled source must retain the coaxial constraint $\Delta\mathbf C=d_C\hat{\mathbf n}_C$ while varying $d_C$ under the declared positive domain and sampling measure. The constrained display records use a dimensionless catalog length coordinate, so $d_C=1.10$ means $1.10$ catalog length units rather than a dimensional physical length. It is one reference point, not a fixed sampling value. A sampling study must specify the minimum, maximum, unit conversion or normalized-unit convention, and probability measure for $d_C$ before drawing samples.

### Declared Full-Taxonomy Reference Measure

A deterministic counter-based sampler supplies a reproducible bounded reference measure over every coordinate type in the table above. “Full taxonomy” means that no independently variable coordinate type is silently fixed; it does not mean that this bounded measure is uniform in a coordinate-free sense or exhausts an unbounded family.

| Coordinate group | Declared sampling rule |
| --- | --- |
| Overall geometry | Multiply the catalog reference geometry by a uniform scale in $[0.30,0.42]$. |
| Binary radii | Multiply each permitted independent radius by an additional uniform factor in $[0.85,1.15]$; equal-radius members share one factor. |
| Axial/transverse decomposition | Sample $h/R$ uniformly in $[0.10,0.90]$ for generic decompositions and in $[0.72,0.98]$ for high-axial interior reference. Exact equatorial, axial, equal-decomposition, and member-specific boundary relations remain exact. |
| Frequencies | Draw positive integer return-period harmonics from $\{1,2,3\}$; common-frequency members share one harmonic and fixed-ratio members draw a base harmonic from $\{1,2\}$ before applying their exact ratio. |
| Phases | Draw each free phase and braid offset uniformly on $[0,2\pi)$; symmetry-fixed phase patterns remain exact. |
| orthogonal-axis three-binary flattening | Draw $\lambda_A$ uniformly on $[0,1]$. |
| General coincident-center co-rotating two-component configuration/coincident-center counter-rotating two-component configuration axial geometry | Draw eleven positive adjacent orbit-center gaps independently and uniformly in $[0.035,0.075]$, center the ordered set on the common axis, pair adjacent centers into six neutral binaries, and assign persistent binary identities by a seeded permutation. |
| coaxial-separated co-rotating two-component configuration through coaxial two-planar-braid counter-rotating configuration component spacing | Multiply the reference coaxial component-center separation by a uniform factor in $[0.65,0.80]$. |
| Circulation and polarity | Draw every permitted independent sign from a balanced two-point distribution, then impose exact same-sense or opposite-sense member relations. |
| Common translation | Draw a permitted direction and a speed uniformly from zero to one-half of the conservative envelope-safe speed. Orthogonal-axis three-binary configurations use their declared translation direction. The resulting exact source must remain inside radius $0.99$ through the retained record. |

The sampler constructs the constrained coordinates directly and checks the defining member relations. A draw that violates those relations is a sampling error, not evidence against that member. Reproducibility requires the seed, member identifier, sample ordinal, complete drawn coordinates, and results of the constraint checks.

For an exact candidate $M$, the analysis gates are the declared validity conditions. Define its admissible configuration space by

$$
\Theta_M
=
\left\{
\boldsymbol\theta:
\boldsymbol\theta\text{ satisfies the taxonomy relations and declared analysis gates for }M
\right\}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-6d2001fa252a0ee2)

A Monte Carlo study draws prescribed instantiations $\boldsymbol\theta^{(k)}\in\Theta_M$, builds the exact source record $S(\boldsymbol\theta^{(k)})$, and runs the analytical programs to obtain

$$
\mathbf G^{(k)}
=
\mathbf G\!\left[S(\boldsymbol\theta^{(k)});P\right].
$$

[View →](../../../../equation-mapping.html#corpus-equation-bad8e277d9a3d067)

The common protocol $P$ must remain fixed across the compared sample. Changing the source definition, measure, probe set, history depth, root policy, boundary, or normalization requires recomputation of every affected measure before comparison.

### Balanced Per-Member Sampling Procedure

A balanced initial sample includes every catalog member rather than drawing the member identity from a probability distribution. If the catalog contains $N_M$ members and assigns $N$ initial cases to each member, the sample contains $N_M N$ cases before directed refinement. Randomizing evaluation order helps distinguish geometric differences from changes in numerical conditions over the course of a study.

Before sampling, specify:

- every included exact assembly identity;
- the bounds, units, constraints, and probability measure for each continuous coordinate;
- the probabilities or balanced quotas for each discrete source choice;
- the fixed-frame convention for coordinates removed as global spatial placement or absolute-time origin;
- the common analytical protocol $P$, including $c_f=1$, numerical resolutions, tolerances, and validity conditions;
- the pseudorandom or randomized space-filling algorithm, seed, and stream-assignment rule; and
- the initial quota $N$, any later adaptive-allocation rule, and the stopping rule.

Then, for every included member $M$:

1. draw $\boldsymbol\theta^{(k)}$ from the declared measure on $\Theta_M$, using a constraint-preserving parameterization or a recorded reject-and-redraw rule;
2. assign every discrete choice, including circulation and persistent endpoint polarity data, under the declared quota or probability rule;
3. construct and validate the exact source record $S(\boldsymbol\theta^{(k)})$;
4. evaluate the fixed measures and validity conditions with protocol $P$;
5. record the result, including an explicit unresolved outcome when evaluation is incomplete; and
6. repeat until the member has its declared initial quota.

The same procedure is repeated for all members. Equal initial quotas make the first family comparison transparent. Adaptive top-ups may then spend more evaluations near favorable regions, validity boundaries, or poorly resolved strata, but the adaptive rows must retain their selection rule and must not be mixed into estimates for the original sampling measure without the corresponding statistical weighting.

### Reproducible Sampling Results

A reproducible result identifies both the sampled configuration and the calculation performed on it.

| Information | Required contents |
| --- | --- |
| Sample identity | Family/member, sample ordinal, and complete source coordinates |
| Sampling measure | Algorithm, seed, distribution, stratum, and any rejection or directed-selection rule |
| Source definition | Continuous parameters, discrete choices, and frame convention |
| Analysis protocol | Normalized wake-speed units with $c_f=1$, numerical resolutions, tolerances, and validity conditions |
| Result | Evaluated measures, uncertainty, convergence behavior, and any unresolved interval or failed validity condition |
| Independent support | A named analytical reference or independently authored calculation or measurement that supports the stated conclusion |

A seed alone is insufficient: a changed parameterization or sampling algorithm can map it to a different source. Reproducing a result requires the source coordinates and analysis protocol as well as the numerical method. Repeating the same implementation establishes repeatability; correctness requires an independent check.

### Screening Resolution and Independent Verification

Broad sampling and detailed evaluation answer different questions. A coarse calculation can identify promising regions and obvious mismatches. It cannot support a conclusion whose required roots, time resolution, angular resolution, or independent evidence are absent.

Selected favorable points, points near validity boundaries, anomalous results, and a stratified sample of the remaining population require evaluation at the full declared resolution. A separate sample of coarse-screen rejections tests for false negatives: configurations discarded at coarse resolution that satisfy the conditions when evaluated more accurately. The observed disagreement estimates screening error under that sampling measure; it is not a guarantee about unsampled configurations.

Calibration compares identical sources at coarse and refined resolution, distinguishing agreement, false positives, false negatives, and unresolved evaluations. This comparison measures sensitivity to numerical resolution. It does not independently verify the underlying formulas, because both calculations may share the same implementation error. A faster calculation can help locate candidates, but its selection errors must be measured. Refining the same calculation checks resolution; an independent calculation or derivation checks whether the method itself is correct.

A sample quota requires statistical justification under the declared measure and desired uncertainty. The number of completed samples alone does not establish adequate coverage or a bound on the probability of missing a favorable region.

### Adaptive Sampling and Robustness

Configuration-space analysis has three stages:

1. **Monte Carlo coverage.** Draw a reproducible, seeded sample from each declared measure over $\Theta_M$. Use stratification so narrow coordinate regions are not lost by chance.
2. **Directed refinement.** Add targeted samples around strong external cancellation, admissible root margins, candidate optima, and boundaries where root topology or prescribed-period closure changes. Include deliberately adverse directions so the method does not optimize only one favorable projection.
3. **Robustness and sensitivity analysis.** Resample neighborhoods around leading instantiations, vary one declared coordinate at a time where useful, and report whether the apparent advantage survives small changes in coordinates, sampling measure, and numerical resolution.

Each sampled result identifies the exact assembly, full parameter vector, prescribed-path claim level, sampling measure, seed or directed-selection rule, root completeness, numerical resolution, and metric uncertainty.

The analysis reports the distribution of each objective, the frequency of each failed validity condition, parameter-to-measure sensitivity, correlations that may reveal redundant coordinates, the non-dominated set under $\mathbf G_{\mathrm{an}}$, and the location and width of robust favorable regions. A single best sampled point is not enough: the central question is whether a candidate has a reproducible favorable region in configuration space or only a narrowly tuned instantiation.

### Common-Axis Architrino-Worldline Chart

The common-axis chart supplies a six-worldline coincident-axis three-binary dimension extension and the twelve-worldline two-component circular parent geometry. Let $\hat{\mathbf n}$ be the oriented translation axis, with transverse orthonormal vectors $\hat{\mathbf e}_1,\hat{\mathbf e}_2$. Assign persistent architrino-worldline indices $m=1,\ldots,N_w$, ordered axial coordinates

$$
\xi_1<\xi_2<\cdots<\xi_{N_w},
$$

[View →](../../../../equation-mapping.html#corpus-equation-cf756e051aab49c9)

and spacings

$$
d_m=\xi_{m+1}-\xi_m>0.
$$

[View →](../../../../equation-mapping.html#corpus-equation-79c627eaede20738)

For group speed $0\le s_{\mathrm{grp}}<c_f$, architrino worldline $m$ is

$$
\mathbf X_m(T)
=
\mathbf C_0
+s_{\mathrm{grp}}T\hat{\mathbf n}
+\xi_m\hat{\mathbf n}
+\rho_m
\left[
\cos\theta_m(T)\hat{\mathbf e}_1
+\sin\theta_m(T)\hat{\mathbf e}_2
\right],
$$

[View →](../../../../equation-mapping.html#corpus-equation-4caf4daecfa06c59)

$$
\theta_m(T)=q_m\omega_mT+\phi_m,
\qquad
q_m\in\{+1,-1\}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-58a036628b028ba8)

The binary-counterpart map $\pi$ must be a fixed-point-free involution,

$$
\pi(\pi(m))=m,
\qquad
\pi(m)\ne m,
$$

[View →](../../../../equation-mapping.html#corpus-equation-07f4eb1c6f27b3a0)

and every pair must declare its polarities, radii, frequencies, phases, circulation relation, axial midpoint, axial separation, and exact constraint. A pairing label has no analytical effect unless it changes a declared path or polarity.

For an even ordered chart, adjacent-pair association slots may be declared as

$$
P_k=(2k-1,2k),
\qquad
\mu_k=\frac{\xi_{2k-1}+\xi_{2k}}{2}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-4f111536748b6e55)

For a twelve-worldline two-component circular source, six additional architrino worldlines may be declared as an Accessory Configuration only when all six polarities and complete paths are supplied. A three-worldline coincident-axis three-binary scaling control is not an Accessory Configuration. An additional path associated with slot $P_k$ has the form

$$
\mathbf Y_k(T)
=
\mathbf C_0
+s_{\mathrm{grp}}T\hat{\mathbf n}
+(\mu_k+\epsilon_k)\hat{\mathbf n}
+\boldsymbol\delta_k(T),
$$

[View →](../../../../equation-mapping.html#corpus-equation-50864fece8656c97)

where the axial offset $\epsilon_k$ and transverse path $\boldsymbol\delta_k(T)$ are exact source coordinates. The adjacent-pair association map and binary-counterpart map remain separate.

Write any declared architrino worldline as

$$
\mathbf Z_a(T)
=
\mathbf C_0
+s_{\mathrm{grp}}T\hat{\mathbf n}
+\zeta_a\hat{\mathbf n}
+\boldsymbol\delta_a(T).
$$

[View →](../../../../equation-mapping.html#corpus-equation-cb5911cb4a64d87d)

Every retained positive causal delay from transmitter $a$ to receiver $b$ satisfies

$$
\left\|
\left(
\zeta_b-\zeta_a+s_{\mathrm{grp}}u
\right)\hat{\mathbf n}
+\boldsymbol\delta_b(T)
-\boldsymbol\delta_a(T-u)
\right\|
=c_fu,
\qquad
u>0.
$$

[View →](../../../../equation-mapping.html#corpus-equation-315f6279cd8807c5)

This equation covers every ordered transmitter-receiver pair in the declared source inventory, including Accessory Configuration sites when present. It is generally transcendental because the causally delayed transmitter phase contains $u$. A stationary transverse transmitter reduces the squared equation to a quadratic in $u$. Equal frequency, equal radius, rational frequency ratios, or reflection symmetry can reduce the number of distinct equations or pair contribution rows, but they do not generally remove the delayed phase. Rotating sectors therefore require certified retained-root enumeration.

For each declared worldline, compare prescribed acceleration with the master-equation acceleration from the complete declared source inventory:

$$
\mathbf R_a(T)
=
\ddot{\mathbf Z}^{\mathrm{prescribed}}_a(T)
-\mathbf A^{\mathrm{ME}}_a(T).
$$

[View →](../../../../equation-mapping.html#corpus-equation-d72539efdf9773d2)

Report axial, radial, and tangential projections separately over the complete return period. Pointwise rows, signed cycle averages, RMS values, maxima, primary/refined differences, and source-resolved contributions are all required. Cancellation in one projection cannot conceal failure in another. A converged residual remains a prescribed-path analytical result; it is not stability, retention, binding, or physical realization.

## How Braid Candidates Are Tested

### Screening and Evolution

The analysis has two evidential stages. **Prescribed screening** evaluates the master-equation residual on a declared geometry and motion. A certified nonzero residual rules out that prescribed record within the evaluated domain. A small or converged residual only nominates the record for further study: it establishes neither persistence nor response to unprescribed motion.

**EOM evolution** tests whether a nominated record persists when the EOM solver supplies the motion from declared initial data. Only evolution can rule a candidate in. Because the dynamical state includes path history across the delay horizon, every evolution result must declare its prehistory rather than treating one convenient history as a neutral default. Object-level temporal claims require at least three materially different prehistories matched at the endpoint state, evolution beyond the delay horizon, comparison on symmetry-reduced observables, and a numerical refinement envelope covering the time step, history segmentation, and causal-root search. The claim window begins only after the retained root ledger certifies that no active causal root can still reach the seeded interval.

### Proof-Burden Order

Claims about assemblies depend on evidence at several levels. **Rest branch retention** requires the complete delayed-history record to persist in its declared rest environment. **Noether sea embedded retention** additionally requires the same branch to remain coherent when the surrounding population response is included. **Observer-level descriptions of a moving branch** require transport, clock, ruler, action, and leakage quantities derived from that same retained record. Particle assignments, effective-metric recovery, and other observer-level claims depend on these underlying results.

A later rung cannot repair an earlier one. A favorable particle, mass, topology, clock, or metric diagnostic may classify a retained branch, but it cannot establish that the branch is retained; equally, a prescribed-path balance result can nominate an evolution seed without supplying any rung of the retention ladder by itself.

## Prescribed-Record Grading

A valid prescribed-record comparison requires:

1. **Record validity:** a complete source definition, finite values, admissible coordinates, reproducible paths, and measures evaluated for that exact source.
2. **Geometric admissibility:** no undeclared collision or coincidence, a complete declared period, and converged geometric extraction.
3. **Causal admissibility:** complete retained roots, declared self-hit treatment, resolved fold events, and converged root sums.
4. **Analytical wake comparison:** signed and raw exposure, complete-cycle normal wake flux and cancellation, anisotropy, spectra, peak response, and source-parameter sensitivity under one common protocol.

A prescribed chart receives only an analytical prescribed-record grade. Stability and energy are outside the method and outside its score.

### Interpretation of Results

A candidate-specific conclusion states its assumptions, domain, claim grade, instrument or independent derivation, uncertainty when measured, and the observation that would falsify it. Prescribed-path evidence supports conclusions about the declared geometry and its analytical wake response. It does not establish retention, stability, binding, or physical realization without the corresponding EOM-evolution evidence.

Among prescribed candidates evaluated under the same protocol, report an analytical objective vector rather than hiding choices inside one number. One suitable starting vector is

$$
\mathbf G_{\mathrm{an}}
=
\left(
\eta_{\mathrm{ext}},
\eta_{\mathcal W,\mathrm{flux}},
\epsilon_{\mathrm{aniso}},
A_{\mathrm{ext,peak}},
\chi_{\mathcal W,\mathrm{peak}},
S_{\boldsymbol\theta}
\right),
$$

[View →](../../../../equation-mapping.html#corpus-equation-2619367386ede276)

where $S_{\boldsymbol\theta}$ is the declared sensitivity of the wake measures to source-coordinate changes. Prescribed-period closure, minimum separation, and the root-transversality margin are validity conditions or annotations rather than performance rewards.

One candidate dominates another only when it is no worse on every declared objective and better on at least one. A single weighted score is permitted only after the weights and normalization are fixed before inspecting the result. “Strongest analytical wake cancellation” is a legitimate comparison question. “Lowest apparent energy” is not a quantity defined by this methodology.

Separate grades are required for a parameterized chart and for a particular exact instantiation. A strong instantiation supports existence within a sampled region; it does not establish that the whole chart has the same performance.

## Visualization of Analytical Results

Fixed or moving probes at specified $(T,\mathbf X)$ coordinates provide complementary views of the same prescribed source. Useful visualizations include:

- $\mathcal W$, $\mathcal W_{\mathrm{abs}}$, and $\chi_{\mathcal W}$;
- positive- and negative-polarity virtual-probe responses;
- individual transmitter contributions and their vector sum;
- root count, root identity, $D_t$, and fold events;
- time graphs over the full return cycle;
- spatial slices, enclosing-surface maps, spectra, and angular coefficients;
- complete-cycle signed, raw, and residual normal wake flux together with $\eta_{\mathcal W,\mathrm{flux}}(R)$ and the raw emission-reference residual;
- transmitter-root-tagged complex normal wake-flux coefficients and $\eta_{\mathcal W,\mathrm{flux}}^{(\ell mn)}(R)$ across the declared enclosing radii; and
- source-parameter sensitivity and the source coordinates, analysis interval, and numerical resolution used for each comparison.

Time-dependent plots and geometric views must refer to the same absolute time and prescribed source. Highlighting selected binaries, axes, wakes, envelopes, roots, or probes can clarify the calculation, but visual annotations supply no additional evidence.

These views display analytical wake properties. They do not supply energy or stability measurements, which this method does not define.

## Reproducible Candidate Comparisons

A complete candidate comparison specifies:

1. the complete source record and taxonomy row;
2. the superimposed causal-wake formula and all normalization choices;
3. the receiver-wake contributions inside the braid through one complete return cycle;
4. the probe geometry and raw time-dependent curves;
5. prescribed-period closure, root, separation, cancellation, anisotropy, spectral, source-sensitivity, and any claimed envelope support, moment, quadratic-fit, and support-moment disagreement metrics;
6. an explicit analytical claim boundary that excludes energy and stability conclusions;
7. the Monte Carlo, directed-refinement, and robustness sampling declarations;
8. the validity results and multi-objective comparison vector; and
9. the exact observation that would falsify each claim.

Together, these specifications make analytical candidate comparison reproducible. A prescribed braid remains a prescribed geometry with analytically evaluated causal-wake properties; the method makes no claim about stability or physical retention.
