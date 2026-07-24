# Candidate Braid Analysis Methodology

This chapter defines an analytical method for prescribed braid records. Its purpose is controlled comparison: every candidate is evaluated with the same causal-wake formula, probe set, retained-history rule, return window, and scoring rules before one geometry is said to cancel or expose more wake than another.

A prescribed record supplies known transmitter paths from which the delayed roots, wake superposition, virtual-probe response, cancellation, angular structure, and spectra can be evaluated at any event $(T,\mathbf X)$. The method concerns only those analytical consequences of the declared paths. It does not assess assembly stability, environmental support, or any unprescribed motion.

The phrase **absolute observer position** means a coordinate probe at an event $(T,\mathbf X)$ in absolute time and the Euclidean void. It does not introduce a Physical Observer or an effective spacetime frame. The native coordinates are

$$
(T,\mathbf X)=(T,X^1,X^2,X^3).
$$

## Analysis Record

Every published candidate analysis must identify one source record. At minimum that record carries:

- the paths $\mathbf X_j(T)$, velocities $\mathbf V_j(T)$, polarities $q_j$, and persistent identities of all architrinos;
- the family/member identifier and complete taxonomy-coordinate row;
- the prescribed-geometry engine and chart version;
- the retained history interval, analysis window, return duration $T_{\mathrm{ret}}$, and absolute-time origin $T_0$;
- the field speed $c_f$, coupling convention, root policy, self-hit policy, and any mollifier or cutoff;
- the spatial probe set, enclosing surfaces, temporal sampling rule, and numerical tolerances; and
- the source hash, engine identity, parameter vector, sampling seed, and generated result hash.

Write the scored result as $\mathbf G[S;P]$, where $S$ is the complete source record and $P$ is the complete analysis protocol. The protocol includes the probe set, history depth, root policy, surface geometry, normalization, tolerances, and sampling rule.

Any source change $S\rightarrow S'$ invalidates the prior score by default. A score may be retained only when a dependency review demonstrates that the changed field cannot enter that measure. In particular:

- a path, radius, frequency, phase, group-translation, polarity, or retained-history change requires new roots and recomputation of every downstream wake measure;
- a probe, boundary, root-policy, normalization, or tolerance change defines a new protocol $P'$ and requires every compared candidate to be evaluated under $P'$;
- an added environmental response defines a different analysis outside the scope of this method; and
- a metadata-only correction may preserve numerical measures only when the source identity and dependency review are recorded with the correction.

Comparing $\mathbf G[S;P]$ directly with $\mathbf G[S';P']$ is uncontrolled unless the difference is explicitly presented as a sensitivity study. The dependency review must state which measures were invalidated, which were recomputed, and why any retained measure is invariant.

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

and the causal constraint

$$
g_j(T,\mathbf X;T_t)
=
r_j(T,\mathbf X;T_t)-c_f(T-T_t).
$$

The active emission-time roots are

$$
\mathcal C_j(T,\mathbf X)
=
\left\{
T_t<T:g_j(T,\mathbf X;T_t)=0
\right\}.
$$

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

for the declared retained-history start $T_{\min}$. For fixed source record $S$ and protocol $P$, the resulting scalar $\mathcal W(T,\mathbf X)$ is the causal-wake map. It records signed causal-wake exposure under the declared source normalization. It is not by itself energy, potential, or acceleration.

For simple roots, define the transmitter-side factor

$$
D_{t,j}
=
c_f-\widehat{\mathbf r}_j\cdot\mathbf V_j(T_t).
$$

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

when $|D_{t,j}|>0$ on every retained root. A root with $D_{t,j}=0$ is a caustic-like chart boundary and must be routed through the declared fold or regularization treatment rather than silently clipped.

Total path speed above $c_f$ does not by itself invalidate this reduction. It removes the global shortcut that proves $g_j$ strictly increasing from a whole-path speed bound, but the event can still contain finitely many transverse roots with either sign of $D_{t,j}$. The event-specific root policy therefore partitions the retained emission-time interval and, on each partition, uses declared bounds on speed, acceleration, distance, and the derivative

$$
\frac{\partial g_j}{\partial T_t}
=
D_{t,j}
=
c_f-\widehat{\mathbf r}_j\cdot\mathbf V_j(T_t)
$$

to certify one of two dispositions:

1. the residual interval excludes zero, so the partition is root-free; or
2. the derivative interval excludes zero, so the partition is monotonic and any endpoint sign change isolates exactly one simple root.

Every isolated root is retained, including a descending branch with $D_{t,j}<0$. The root ordinal is assigned in increasing emission-time order for that transmitter. The event is complete only when every retained partition has one of the two certified dispositions. If the subdivision depth or candidate-interval limit is reached while a possible root or fold remains, the event is **drawn but not evaluated**: it receives no score, and the unresolved interval, reason code, transmitter identity, and exact rerun instruction must remain in the campaign table. This fail-closed disposition is distinct from a measured gate rejection.

The unsigned companion ledger

$$
\mathcal W_{\mathrm{abs}}(T,\mathbf X)
=
\sum_j
\sum_{T_t\in\mathcal C_j(T,\mathbf X)}
\frac{|q_j|}{4\pi r_j^2|D_{t,j}|}
$$

separates weak net exposure caused by cancellation from weak exposure caused by small individual contributions. The pointwise signed-cancellation ratio

$$
\chi_{\mathcal W}(T,\mathbf X)
=
\frac{|\mathcal W(T,\mathbf X)|}
{\mathcal W_{\mathrm{abs}}(T,\mathbf X)+\varepsilon_{\mathcal W}}
$$

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

At an arbitrary event $(T,\mathbf X)$, define

$$
\mathbf d_j=\mathbf X-\mathbf C_j,
\qquad
A_j=\mathbf d_j\cdot\mathbf u_j,
\qquad
B_j=\mathbf d_j\cdot\mathbf v_j,
$$

$$
H_j=\sqrt{A_j^2+B_j^2},
\qquad
\delta_j=\operatorname{atan2}(B_j,A_j).
$$

The causal-root condition then reduces exactly to the scalar equation

$$
\boxed{
c_f^2(T-T_t)^2
=
\|\mathbf d_j\|^2+R_j^2
-2R_jH_j\cos(\omega_jT_t+\phi_j-\delta_j)
}
$$

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

Self-hit acceleration, when active, is recorded separately as $\mathbf A_i^{\mathrm{self}}(T)$. This separation prevents a geometry with strong self-hit support from being mistaken for one stabilized by inter-architrino exchange.

Over the complete orbital or return cycle,

$$
T_0\le T<T_0+T_{\mathrm{ret}},
$$

the internal report must retain each pairwise contribution, the net vector, its components in the declared braid frame, root identities, $D_t$ margins, and root-playback derivatives. Cycle averages must not replace peak values or root-transition events.

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

under the declared self-hit convention. This is a pointwise comparison between the acceleration required by the prescribed path and the acceleration supplied by the analytical causal-hit sum. Its peak, RMS, mean vector, phase dependence, and per-binary decomposition are legitimate prescribed-record measures. If the self-hit term or another accepted acceleration contribution is unavailable, the result must be labeled a partial mismatch rather than a complete Master Equation residual. A small mismatch measures compatibility of the declared chart with the evaluated acceleration contributions; it does not establish stability.

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
| Prescribed-period closure | Position, velocity, and phase differences between $T_0$ and $T_0+T_{\mathrm{ret}}$ | Whether the declared formulas and chosen return period are internally consistent |
| Minimum separation | $d_{\min}=\min_{T,i\ne j}\|\mathbf X_i(T)-\mathbf X_j(T)\|$ | Whether the prescribed chart contains a collision, an undeclared coincidence, or a near-singular pair geometry |
| Root-transversality margin | $\min|D_{t,j}|$ over all retained probe and internal roots | Distance from an unresolved causal-root fold |
| Root-topology ledger | Root counts, identities, births, deaths, and reconnections versus $T$ | Whether averaged curves hide causal-branch changes |
| Internal prescribed-path response | Per-endpoint peak, RMS, and cycle integral of $\mathbf A_i^{\mathrm{others}}$ evaluated on the prescribed paths | The acceleration that the other prescribed paths would deliver, not whether those paths persist |
| Prescribed-path equation mismatch | Peak, RMS, mean, phase-resolved, and per-binary rows of $\mathbf R_i^{\mathrm{path}}$ | Pointwise compatibility between the prescribed kinematics and the evaluated acceleration contributions |
| External signed exposure | $\mathcal W$ on $S_R$ through the complete cycle | Net polarity-signed wake exposure |
| External raw exposure | $\mathcal W_{\mathrm{abs}}$ on $S_R$ through the complete cycle | Wake strength before signed cancellation |
| Complete-cycle signed normal wake flux | $F_{\mathrm{signed}}(R)$ from the outward-normal projection of the signed causal-wake contributions | The global signed crossing total, which vanishes for a polarity-neutral assembly and is therefore not a cancellation score |
| Complete-cycle raw normal wake flux | $F_{\mathrm{raw}}(R)$ with transmitter and root identities retained before absolute aggregation | The emitted wake measure crossing $S_R$ before polarity cancellation; its source-normalized reference is $T_{\mathrm{ret}}\sum_j|q_j|$ |
| Complete-cycle residual normal wake flux | $F_{\mathrm{res}}(R)$ from the absolute locally superposed signed normal flux | How much local signed wake survives cancellation over the complete cycle |
| Complete-cycle normal wake-flux cancellation | $\eta_{\mathcal W,\mathrm{flux}}(R)=F_{\mathrm{res}}(R)/F_{\mathrm{raw}}(R)$ | Linear wake cancellation under the declared enclosing-surface convention, not energy or work |
| Frequency-resolved normal wake-flux cancellation | $\eta_{\mathcal W,\mathrm{flux}}^{(\ell mn)}(R)$ from transmitter-root-tagged complex coefficients | Which temporal harmonics and angular modes survive phase-sensitive signed superposition at each enclosing radius |
| Resonance-block cancellation score | $C_L(m,n;\phi)$ with certified tail bound $\varepsilon_L$ for a declared lock | Whether the leading score gap over every alternative exceeds $2\varepsilon_L$ under the [A3.3 cancellation certificate](braid-a3-3-doubling-frequency-lock.md#rg-style-truncation-test) |
| Directional response | $\mathbf A_p$ for both probe polarities on $S_R$ | Vector exposure and polarity dependence |
| Angular ledger | Cycle-resolved isotropic and higher angular coefficients | Which external angular channels survive cancellation |
| Anisotropy | Non-isotropic far-field ledger relative to the naive constituent ledger | Whether a scalar cancellation summary is adequate |
| Spatial response gradient | $\nabla_{\mathbf X}\mathbf A_p$ away from source paths and causal-root folds | How differently nearby absolute-coordinate probes respond |
| Temporal variation | $\partial_T\mathcal W$ and $\partial_T\mathbf A_p$ on continuous root branches | Peak rate of change and phase localization of wake features |
| Radial scaling | The same angular and exposure rows evaluated over a declared sequence of enclosing radii $R$ | Whether a claimed far-field regime and its power-law scaling have been reached |
| Symmetry residual | Difference between a measure and its transform under each declared chart symmetry | Which prescribed symmetries survive in the causal-wake field |
| Spectral ledger | Fourier coefficients over $T_{\mathrm{ret}}$ for selected internal and external rows | Harmonic content, sidebands, and phase locking |
| Source-parameter sensitivity | Recomputed measures under declared changes of radius, frequency, phase, orientation, and translation | How dependent the analytical result is on the prescribed coordinates |
| Numerical convergence | Change under tighter root and quadrature tolerances for the same $S$ and $P$ | Whether the analytical result has been evaluated accurately |

Minimum separation is a validity diagnostic, not a claim that architrinos are hard objects. A zero separation may make the $1/r^2$ response singular or expose an undeclared coincidence in the chart. A small separation warns that a reported score may be dominated by a near-singular pair. It should normally be a gate or an annotation, not a reward to maximize.

The term **return residual** is replaced here by **prescribed-period closure residual**. It checks only that the declared orbital path formulas return to the same position relative to the declared common translating center, and to the same velocity and phase, after $T_{\mathrm{ret}}$. The absolute displacement of a translating source is recorded separately as $\mathbf V_{\mathrm{grp}}T_{\mathrm{ret}}$ and is subtracted before computing the orbital position residual. Closure is often zero by construction and is an integrity check on the chart and selected period, not a stability measure. Root and wake ledgers may also be checked for periodicity, but their endpoint differences remain analytical consistency diagnostics.

Spatial and temporal derivatives must be evaluated branch by branch. At a causal-root birth, death, or fold, the discontinuity or singular behavior is itself the reported event; a derivative must not be fabricated by differencing across it.

Two additional diagnostics are useful but must not be mislabeled as energy. Define the cycle-and-surface external-exposure norm

$$
\mathcal L_{\mathrm{ext}}(R)
=
\frac{1}{T_{\mathrm{ret}}}
\int_{T_0}^{T_0+T_{\mathrm{ret}}}
\int_{S_R}
\|\mathbf A_p(T,\mathbf X)\|^2
\,dA\,dT
$$

and the corresponding uncancelled norm $\mathcal L_{\mathrm{raw}}(R)$ formed by replacing the net vector with the sum of constituent response magnitudes before squaring. Then

$$
\eta_{\mathrm{ext}}(R)
=
\frac{\mathcal L_{\mathrm{ext}}(R)}
{\mathcal L_{\mathrm{raw}}(R)+\varepsilon_L}
$$

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

where $\widehat{\mathbf n}$ is the outward unit normal. The signed, raw, and residual complete-cycle measures are

$$
F_{\mathrm{signed}}(R)
=
\int_{T_0}^{T_0+T_{\mathrm{ret}}}
\int_{S_R}
\sum_j\sum_{T_t\in\mathcal C_j(T,\mathbf X)}
f_{j,T_t}(T,\mathbf X)
\,dA\,dT
$$

$$
F_{\mathrm{raw}}(R)
=
\int_{T_0}^{T_0+T_{\mathrm{ret}}}
\int_{S_R}
\sum_j\sum_{T_t\in\mathcal C_j(T,\mathbf X)}
\left|f_{j,T_t}(T,\mathbf X)\right|
\,dA\,dT
$$

and

$$
F_{\mathrm{res}}(R)
=
\int_{T_0}^{T_0+T_{\mathrm{ret}}}
\int_{S_R}
\left|
\sum_j\sum_{T_t\in\mathcal C_j(T,\mathbf X)}
f_{j,T_t}(T,\mathbf X)
\right|
\,dA\,dT
$$

The raw measure takes absolute values before transmitter contributions are superposed. The residual measure superposes the signed contributions first and then takes the absolute value. Their ratio

$$
\eta_{\mathcal W,\mathrm{flux}}(R)
=
\frac{F_{\mathrm{res}}(R)}{F_{\mathrm{raw}}(R)}
$$

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

If the prescribed paths, retained history, and in-transit wake measure all return after $T_{\mathrm{ret}}$, integration over the complete cycle removes this storage difference. For fixed convex enclosing surfaces,

$$
F_{\mathrm{raw}}(R)
=
T_{\mathrm{ret}}\sum_j|q_j|.
$$

This identity is both the source-normalized reference and an independent implementation check. The signed global integral similarly equals $T_{\mathrm{ret}}\sum_jq_j$ and therefore vanishes for a polarity-neutral braid. The residual $F_{\mathrm{res}}(R)$ and its ratio may still depend on radius because the signed contributions superpose differently after different causal travel delays. A far-field plateau is a measured radial result, not an assumed invariance.

These quantities measure causal-wake crossings only. They are not energy, potential, realized work, braid depletion, intrinsic leakage, or stability. A packet must reject the accepted wake-flux measures when roots or history are incomplete, a transmitter leaves an enclosing surface, the raw cycle integral fails its source-normalized reference after refinement, or the primary and refined time-and-surface quadratures fail their declared tolerance.

#### Frequency-Resolved Normal Wake-Flux Cancellation

The complete-cycle scalar $\eta_{\mathcal W,\mathrm{flux}}(R)$ combines every temporal frequency and angular pattern. It therefore cannot show whether one wake harmonic cancels strongly while another survives. The phase-sensitive reduction must occur before any absolute aggregation.

Let $a$ identify a retained transmitter-root branch, let $Y_{\ell m}$ be the declared real orthonormal spherical-harmonic basis, and let $\Omega_0=2\pi/T_{\mathrm{ret}}$. Define

$$
\widetilde f_{a,\ell mn}(R)
=
\frac{1}{T_{\mathrm{ret}}}
\int_{T_0}^{T_0+T_{\mathrm{ret}}}
e^{-in\Omega_0(T-T_0)}
\int_{S_R}
f_a(T,\mathbf X)Y_{\ell m}(\widehat{\mathbf X})
\,dA\,dT.
$$

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

For $A_{\mathrm{raw},\ell mn}$ above the declared effective coefficient floor, define

$$
\eta_{\mathcal W,\mathrm{flux}}^{(\ell mn)}(R)
=
\frac{A_{\mathrm{net},\ell mn}(R)}
{A_{\mathrm{raw},\ell mn}(R)}.
$$

The triangle inequality gives $0 \le \eta_{\mathcal W,\mathrm{flux}}^{(\ell mn)}(R) \le 1$. A value near zero identifies strong phase-sensitive cancellation in one temporal-harmonic and angular-mode channel. A value near one identifies little cancellation in that channel. The reducer also reports the Euclidean norm over the retained angular modes for each temporal harmonic and evaluates those rows across the declared enclosing radii.

The effective coefficient floor is the larger of a declared absolute floor and a declared fraction of the largest raw coefficient on that enclosing surface. Source-root coefficients below that floor remain available as diagnostic rows, but they do not receive accepted cancellation ratios. A logarithmic radial fit for a net coefficient or cancellation ratio additionally requires the net magnitude to exceed the same floor at every fitted radius. This prevents numerical zero from acquiring an arbitrary radial exponent.

The frequency ledger must report retained-band coverage. A coefficient is accepted only when transmitter-root tags reconstruct the sampled signed normal flux, primary and refined grids agree within tolerance, and the transmitter-tagged signal outside the retained harmonic band remains below its declared RMS fraction. A Fourier transform of the rectified trace $\int_{S_R}|\sum_a f_a|\,dA$ is a different diagnostic: rectification creates sum, difference, and multiple frequencies. Those created frequencies must not be reported as transmitter-emission frequencies.

These complex coefficients, coefficient magnitudes, and cancellation ratios are signal-processing wake diagnostics. They are not spectral energy, energy transport, or realized work.

## Analytical Claim Boundary

The signed wake $\mathcal W$, unsigned wake $\mathcal W_{\mathrm{abs}}$, virtual-probe response $\mathbf A_p$, angular coefficients, exposure fraction $\eta_{\mathrm{ext}}$, and complete-cycle normal wake-flux measures are the available analytical ledgers. None is an energy quantity. This method therefore does not report total energy, apparent energy, apparent-energy fractions, escaping energy, intrinsic leakage, or stability scores. It also does not include a Noether-sea response. Introducing any such quantity requires a separate definition and cannot be accomplished by relabeling a wake-exposure measure.

## Analytical Evaluation Programs

The measures in this chapter require analytical programs that evaluate the declared formulas for an exact source record. These programs are not assembly-evolution simulations. They hold the prescribed paths fixed and calculate their consequences at the requested absolute-coordinate events.

The analytical program suite should have separable components for:

1. validating and evaluating the source paths, velocities, accelerations, periods, and taxonomy coordinates;
2. enumerating every retained causal root and recording its identity, topology, and $D_t$ margin;
3. evaluating $\mathcal W$, $\mathcal W_{\mathrm{abs}}$, $\chi_{\mathcal W}$, and $\mathbf A_p$ at internal and external probes;
4. reducing the event-level results into the separation, root, mismatch, exposure, complete-cycle normal wake-flux, angular, spectral, radial-scaling, symmetry, and sensitivity measures defined above; and
5. emitting a result packet keyed by the exact source hash and protocol hash.

Each component must expose numerical tolerances and convergence checks. Where a closed-form, symmetry-protected, static, or other independently known analytical case exists, it should be used as an independent check. Replaying output from the same program establishes reproducibility, not correctness.

Only after these programs can calculate the common measure set should a broad parameter campaign begin. Otherwise a sampling run merely produces many configurations without a controlled basis for comparing them.

## Monte Carlo Configuration-Space Analysis

Let $\boldsymbol\theta$ contain the complete taxonomy coordinates, group-translation speed, phase origin, and any permitted prescribed-history coordinates. A sampling campaign must publish the domain $\Theta$, units, constraints, and sampling measure. There is no coordinate-free meaning to “random braid”; uniform sampling in radius, logarithmic radius, speed, or frequency represents different candidate populations.

### Degrees of Freedom by Braid Class

A degree of freedom is an independently variable source coordinate whose change can alter at least one prescribed worldline or its polarity-tagged contribution after the selected member's constraints are imposed. A derived quantity is not counted again. In particular, only two coordinates in

$$
R_a^2=h_a^2+\rho_a^2
$$

are independent. Here $R_a$ is the endpoint distance from the binary midpoint, $h_a$ is the axial half-separation, and $\rho_a$ is the transverse orbit radius measured from the binary axis. The phrase “orbit radius from the axis” therefore means $\rho_a$, not $R_a$, except on a zero-axial-offset locus where $h_a=0$ and $\rho_a=R_a$.

The coordinate types recur across the taxonomy, but they are not all independently free in every member:

| Coordinate type | Status across Families A, B, and C | Constraint or interpretation |
| --- | --- | --- |
| Binary radius $R_a$ and transverse orbit radius $\rho_a$ | Present in every binary record | $R_a$ and $\rho_a$ coincide only when $h_a=0$. An axial binary with $\rho_a=0$ has no circular path even if $R_a>0$. |
| Binary frequency $f_a$ | Present in every binary record | The two endpoints of one neutral binary share a frequency. Equal-frequency and fixed-ratio members reduce several frequency coordinates to one scale. At $\rho_a=0$, frequency remains a record label but does not change the path. |
| Binary phase $\phi_a$ | Present in every binary record and required in addition to radius and frequency | Phase is measured relative to the common braid-level zero point. Some members fix the relative phases. At $\rho_a=0$, phase does not change the path. |
| Binary midpoint and axis data | Present in every braid record | Family A constrains three axes through $\lambda_A$; B1 makes the three axes and midpoints coincide; Family C orders twelve architrino worldlines on one common axis. |
| Group velocity $\mathbf V_{\mathrm{grp}}$ | Present at assembly level | The common scalar taxonomy coordinate is $s_{\mathrm{grp}}=\|\mathbf V_{\mathrm{grp}}\|$. Family A fixes its direction to $\hat{\mathbf u}_A$; axial B1 is a specialization rather than the whole B1 class. |
| Circulation sense and endpoint polarity assignment | Required discrete source choices | A member may lock circulation within or between braids. Neutrality fixes one electrino and one positrino per binary, but which persistent endpoint carries each polarity still changes the signed source record. |
| Architrino worldline count and binary grouping | Member-defining discrete choices | Families A and B contain six architrino worldlines in three neutral binaries. Family C contains twelve architrino worldlines in six neutral binaries and requires an explicit fixed-point-free counterpart map. |
| Axial spacing | Not universal | A3 and B1 use binary axial half-separations $h_a$ along their respective binary axes. Family C carries the complete ordered spacing vector $\mathbf d_C$; C3 through C6 additionally carry the B1-component center separation $d_C$. General Family A has no single common axis on which all orbits can be spaced. |
| Orbit order along one axis | Not an independent universal coordinate | In a coaxial chart, order is derived by sorting the signed axial positions. Persistent binary indices do not change when two radii, frequencies, or axial positions cross. Order becomes a separate discrete choice only when assigning different path or polarity data to the ordered sites changes the source record. |

Thus radius, frequency, phase, and group translation are the common kinematic coordinate types. Axis and midpoint data, circulation, and endpoint polarity assignment are also required source coordinates. Axial spacing and axial order belong only to charts that actually have a common axis; they must not be imposed on all A, B, and C candidates.

The member-level inventory below describes the admissible taxonomy space, not the single display coordinate selected by a catalog source record. In particular, the current Family-A Borg reference records select $\lambda_A=0$; varying $\lambda_A$ requires a campaign that explicitly includes the wider Family-A coordinate.

| Braid class or catalog members | Independent continuous coordinates beyond the common radius, frequency, phase, and group-translation columns | Relations that add or remove freedom |
| --- | --- | --- |
| `A1` | Family-A flattening $\lambda_A$ | $h_a=0$ for all three binaries; $R_a$, $f_a$, and $\phi_a$ may otherwise differ. |
| `A1.1` | $\lambda_A$ | One common frequency; radii and phases remain independently assignable. |
| `A1.2` | $\lambda_A$ | One radius, one frequency, fixed phases $0$, $2\pi/3$, and $4\pi/3$. |
| `A1.3`, `A1.4` | $\lambda_A$ | One base frequency with the indexed ratio $4{:}2{:}1$ or $3{:}2{:}1$; radii and phases remain independently assignable. |
| `A2` | $\lambda_A$ and one common axial/transverse decomposition coordinate in addition to the common radius | All three binaries share $R$, $h$, $\rho$, $f$, and circulation; phases are fixed $120^\circ$ apart. |
| `A3` | $\lambda_A$ and one axial/transverse decomposition coordinate per binary in addition to $R_a$ | Each binary may independently choose its geometry, frequency, and phase subject to $R_a^2=h_a^2+\rho_a^2$. |
| `A3.1` | The `A3` decomposition coordinates and $\lambda_A$ | One common frequency; radii, decompositions, and phases remain independently assignable. |
| `A3.2` | The `A3` decomposition coordinates and $\lambda_A$ | One common radius and frequency with fixed $120^\circ$ phase spacing; the three decompositions may still differ. |
| `A3.3`, `A3.4` | The `A3` decomposition coordinates and $\lambda_A$ | One base frequency with the indexed ratio $4{:}2{:}1$ or $3{:}2{:}1$; radii, decompositions, and phases remain independently assignable. |
| `B1.1` | One axial/transverse decomposition coordinate per binary in addition to $R_a$ | One common midpoint, axis, frequency, and circulation; $h_a>0$ and $\rho_a>0$. Axial orbit-plane order is derived from the resulting signed offsets. |
| `B1.2` | The same B1 decomposition coordinates | The high-axial inequalities $h_a>\rho_a>0$ further restrict the domain. |
| `B1.3` | No additional continuous internal coordinate beyond the common columns | The all-equatorial boundary fixes $h_a=0$ and $\rho_a=R_a$; frequency and circulation are common. |
| `C1`, `C2` | Eleven positive spacings after fixing the common axial origin, twelve radii, twelve frequencies, twelve phases, and an explicit six-binary counterpart map | `C1` fixes one circulation sense across all twelve worldlines. `C2` fixes opposite senses on the two ordered six-index subsets. Equal radii, equal spacings, reflection symmetry, and B1 decomposition are additional strata rather than member relations. |
| `C3`, `C4` | Two inherited B1 coordinate sets, positive axial component-center separation $d_C$, and the relative transverse-frame/phase relation | Both components are coaxial. `C3` fixes equal component circulation senses and `C4` fixes opposite senses; equality of the two component frequencies is not required. |
| `C5`, `C6` | Two inherited B1.3 coordinate sets, positive axial component-center separation $d_C$, and the relative transverse-frame/phase relation | Both components are coaxial and all-equatorial. `C5` fixes equal component circulation senses and `C6` fixes opposite senses; equality of the two component frequencies is not required. |

An overall shift of absolute-time origin changes the stored phase coordinates, and an overall rigid spatial placement changes the stored centers and frames. Whether those are sampled coordinates or fixed frame conventions depends on the probe and environment protocol. A campaign must state that convention before reporting a numerical degree-of-freedom count.

The active B1 sampling domain requires $\sum_a\rho_a^2>0$. The former `B1.4` source fixes $\rho_a=0$ and $h_a=R_a$ for every binary, so its frequency and phase labels do not change its endpoint paths. Its immutable historical rows remain valid records of the deprecated axial-limit null control, but future active-candidate sampling and comparative rankings exclude it.

For C3 through C6, the axial component-center separation $d_C$ is a required Monte Carlo coordinate in $\boldsymbol\theta$. Each sampled source must retain the coaxial constraint $\Delta\mathbf C=d_C\hat{\mathbf n}_C$ while varying $d_C$ under the campaign's declared positive domain and sampling measure. The constrained display records use a dimensionless catalog length coordinate, so $d_C=1.10$ means $1.10$ catalog length units rather than a dimensional physical length. It is one reference point, not a fixed sampling value. A campaign must publish the minimum, maximum, unit conversion or normalized-unit convention, and probability measure for $d_C$ before drawing samples.

### Declared Full-Taxonomy Reference Measure

The compact campaign implementation `constraint-preserving-full-taxonomy/sha256-counter-v1` supplies a reproducible bounded reference measure over every coordinate type in the table above. “Full taxonomy” means that no independently variable coordinate type is silently fixed; it does not mean that this bounded measure is uniform in a coordinate-free sense or exhausts an unbounded family.

| Coordinate group | Declared sampling rule |
| --- | --- |
| Overall geometry | Multiply the catalog reference geometry by a uniform scale in $[0.30,0.42]$. |
| Binary radii | Multiply each permitted independent radius by an additional uniform factor in $[0.85,1.15]$; equal-radius members share one factor. |
| Axial/transverse decomposition | Sample $h/R$ uniformly in $[0.10,0.90]$ for generic decompositions and in $[0.72,0.98]$ for B1.2. Exact equatorial, axial, equal-decomposition, and member-specific boundary relations remain exact. |
| Frequencies | Draw positive integer return-period harmonics from $\{1,2,3\}$; common-frequency members share one harmonic and fixed-ratio members draw a base harmonic from $\{1,2\}$ before applying their exact ratio. |
| Phases | Draw each free phase and braid offset uniformly on $[0,2\pi)$; symmetry-fixed phase patterns remain exact. |
| Family-A flattening | Draw $\lambda_A$ uniformly on $[0,1]$. |
| General C1/C2 axial geometry | Draw eleven positive adjacent orbit-center gaps independently and uniformly in $[0.035,0.075]$, center the ordered set on the common axis, pair adjacent centers into six neutral binaries, and assign persistent binary identities by a seeded permutation. |
| C3 through C6 component spacing | Multiply the reference coaxial component-center separation by a uniform factor in $[0.65,0.80]$. |
| Circulation and polarity | Draw every permitted independent sign from a balanced two-point distribution, then impose exact same-sense or opposite-sense member relations. |
| Common translation | Draw a permitted direction and a speed uniformly from zero to one-half of the conservative envelope-safe speed. Family A uses its declared translation direction. The resulting exact source must remain inside radius $0.99$ through the retained record. |

The sampler constructs the constrained coordinates directly and then calls the canonical member validator. A validator failure is a sampler defect, not a Monte Carlo gate rejection. The seed, member identifier, sample ordinal, every drawn coordinate, the complete sampled source, and the validator result are retained.

For a family/member candidate $M$, define its admissible configuration space by

$$
\Theta_M
=
\left\{
\boldsymbol\theta:
\boldsymbol\theta\text{ satisfies the taxonomy relations and declared analysis gates for }M
\right\}.
$$

A Monte Carlo campaign draws prescribed instantiations $\boldsymbol\theta^{(k)}\in\Theta_M$, builds the exact source record $S(\boldsymbol\theta^{(k)})$, and runs the analytical programs to obtain

$$
\mathbf G^{(k)}
=
\mathbf G\!\left[S(\boldsymbol\theta^{(k)});P\right].
$$

The common protocol $P$ must remain fixed across the compared sample. A changed source definition, measure, probe set, history depth, root policy, boundary, or normalization requires an impact review and invalidates every affected score. The campaign must recompute those scores before they re-enter the comparison population.

### Balanced Per-Member Sampling Procedure

A complete initial campaign samples every catalog member rather than drawing the member identity from a probability distribution. If the catalog contains $N_M$ members and assigns $N$ initial cases to each member, the balanced campaign contains $N_M N$ cases before directed refinement. The execution order should be randomized so temperature, memory pressure, or other machine-time effects do not remain correlated with family order.

Before the first draw, freeze a versioned campaign declaration containing:

- every included family/member identifier;
- the bounds, units, constraints, and probability measure for each continuous coordinate;
- the probabilities or balanced quotas for each discrete source choice;
- the fixed-frame convention for coordinates removed as rigid placement or absolute-time origin;
- the common analytical protocol $P$, including $c_f=1$, numerical resolutions, tolerances, and gate definitions;
- the pseudorandom or randomized space-filling algorithm, seed, and stream-assignment rule; and
- the initial quota $N$, any later adaptive-allocation rule, and the stopping rule.

Then, for every included member $M$:

1. draw $\boldsymbol\theta^{(k)}$ from the declared measure on $\Theta_M$, using a constraint-preserving parameterization or a recorded reject-and-redraw rule;
2. assign every discrete choice, including circulation and persistent endpoint polarity data, under the declared quota or probability rule;
3. construct and validate the exact source record $S(\boldsymbol\theta^{(k)})$;
4. attempt to evaluate the fixed metric and gate vector with protocol $P$;
5. append one compact, reproducible case row whether the evaluation succeeds or balks; and
6. repeat until the member has its declared initial quota.

The same procedure is repeated for all members. Equal initial quotas make the first family comparison transparent. Adaptive top-ups may then spend more evaluations near favorable regions, gate boundaries, or poorly resolved strata, but the adaptive rows must retain their selection rule and must not be mixed into estimates for the original sampling measure without the corresponding statistical weighting.

### Compact Reproducible Case Row

“Store only the test case and its scores” is a valid coverage policy only when the test case is an exact rerun instruction. Each compact row must contain:

| Record group | Required contents |
| --- | --- |
| Case identity | Campaign identifier, family/member identifier, case ordinal, and unique case identifier |
| Draw provenance | Sampling algorithm, seed, stream index, measure, stratum, and any rejection count or directed-selection rule |
| Exact source | Complete continuous parameter vector, all discrete choices, frame convention, source-schema version, and exact source hash |
| Analytical protocol | Protocol identifier and hash, $c_f=1$, resolution tier, tolerances, and gate-definition version |
| Result | Evaluation status; metric values, gate outcomes, convergence and uncertainty rows, disposition, and score hash when evaluated; otherwise a null score plus the stage, reason code, error type, message, and structured unresolved details |
| Implementation provenance | Evaluator identifier and version plus an immutable implementation or build identifier |
| Measured cost | Wall time, processor time when available, peak memory, and retained-byte count |
| Evidence references | Independent-check receipt and content-addressed raw-artifact references when those artifacts were retained |

The source vector, protocol hash, and implementation identifier are necessary because a seed alone does not guarantee that a later program version will reconstruct the same source or calculation. Recomputing an exact compact row establishes reproducibility. It does not establish correctness unless the recomputation includes the declared independent check.

### Coverage and Full-Adjudication Lanes

The broad campaign should separate cheap configuration-space coverage from evidence-bearing adjudication:

1. **Coverage lane.** Evaluate every sampled source with a declared screening resolution and retain compact rows. Raw event ledgers may be omitted. These rows are diagnostic and may rank regions, reveal correlations, and identify obvious failures, but they cannot receive an acceptance grade that requires absent raw or independent evidence.
2. **Full-adjudication lane.** Rerun selected favorable points, points near gate boundaries, anomalies, and a stratified audit sample at the complete protocol resolution. Retain the raw ledgers and independent-check receipts required by the gates. Only this lane can support catalog acceptance.
3. **False-negative audit.** Full-adjudicate a declared sample of ordinary coverage-lane rejects. The observed disagreement rate measures whether the screening lane is discarding potentially favorable points and determines whether its resolution must be increased.

The coverage resolution must therefore be calibrated against the full protocol rather than assumed adequate. A faster grid that changes a frequency, radial-scaling, root-topology, or other gate remains useful for screening only. Local finite-difference sensitivity calculations should likewise be deferred to selected points unless they are an explicit initial-campaign objective; running them for every broad-coverage draw multiplies cost without increasing configuration-space coverage.

The compact calibration runner first compares coverage and full numerical resolution on identical sampled sources. It classifies both-pass, both-reject, coverage-false-negative, coverage-false-positive, and inconclusive-not-evaluated rows, with per-gate disagreements and exact source hashes. This is a measured resolution calibration, not independent acceptance, because compact rows omit the acceptance-bearing raw ledgers. A stratified raw-evidence audit remains necessary before any selected row can enter the accepted catalog.

An initial quota such as $N=64$ per member is not a production rule merely because the runner accepts that integer. Production designation requires: successful constraint-preserving draws across every catalog member; no unexplained not-evaluated stratum; a declared false-negative audit large enough to bound the missed-candidate risk; stable wall-time and memory measurements under the intended worker count; and a frozen campaign declaration. Until those conditions are met, $N=64$ is a capacity-planning value, not a statistically or evidentially calibrated quota.

Campaign storage should follow the same split. Compact rows belong in an append-oriented tabular store suited to filtering and aggregation. Large raw ledgers should be content-addressed and retained only for full-adjudication rows, anomalies, boundary cases, and the declared audit sample. The logical evidence contract is independent of whether the compact table is implemented as a database or a columnar or delimited file.

### Performance Measurement

Cost is a measured property of the implementation and machine, not a consequence inferred from sample counts alone. A campaign pilot must profile at least one complete point and report stage-level wall time for source construction, root evaluation, surface reduction, metric reduction, hashing, serialization, compression, storage, independent checks, and sensitivity evaluation. It must also report median and upper-quantile point times across members, because one member need not represent the full catalog.

Optimization experiments must compare the same exact source and protocol and verify equality of the compact score record when claiming an output-preserving speedup. Lower resolutions, omitted sensitivity rows, or missing evidence artifacts are separate evaluation tiers, not output-preserving optimizations. Campaign-level parallel execution may reduce elapsed campaign time, but it does not reduce the processor cost of one point and must be evaluated under measured memory and storage contention.

### Local and Cloud Throughput

One **test point** in this supplement means one exact source-protocol pair evaluated into one compact reproducible case row. Throughput is the number of completed points divided by total elapsed campaign time, including dispatch, retries, merging, and final verification:

$$
R_{\mathrm{test}}
=
\frac{N_{\mathrm{verified}}}{t_{\mathrm{elapsed}}}
$$

where $R_{\mathrm{test}}$ is reported in verified tests per hour. A worker count is an implementation setting, not a throughput prediction. The useful count is the measured maximum before processor scheduling, memory pressure, compression, or storage contention makes another worker counterproductive.

Machine-specific benchmarks and dated price observations belong in operational campaign records rather than this reader-facing method. The portable rule is to use a bounded dynamic queue, measure worker scaling on every selected platform, and remeasure whenever the protocol, member mix, runtime, or machine changes. Interruptible cloud execution is appropriate only after every completed point is checkpointed independently, an interrupted point can be retried without changing its identity, and duplicate results are rejected by case hash. On-demand and interruptible runs must be priced and reported separately.

#### Deterministic Cloud Execution

Monte Carlo points are independent after the campaign declaration and random streams are frozen. The controller should construct the immutable test-point definitions, place them in a deterministic queue, and let each worker claim one point at a time. Each worker returns one compact case row to a single deterministic merger. Workers should not write concurrently into one shared database file. The merger sorts by family/member identifier and case ordinal, rejects conflicting duplicates, records retries, and performs the final hash and inventory checks.

Cloud execution does not change the coverage and full-adjudication distinction:

- ordinary coverage workers return compact rows and do not upload large raw ledgers;
- selected full-adjudication points retain the required content-addressed raw ledgers and independent-check receipts; and
- a preempted point contributes no result until one complete verified row is committed.

Before cloud results enter a comparison population, freeze the runtime, dependencies, evaluator implementation, source schema, campaign declaration, and analytical protocol. Run the same qualification fixture locally and on each selected cloud machine type, then require identical sampled-source definitions, source hashes, protocol hashes, compact score-record hashes, case hashes, aggregate hash, and gate inventory. Different processor, operating-system, and compression environments require byte identity to be tested rather than assumed. If any required identity differs, cloud coverage remains diagnostic-only and selected points must be rerun on the declared canonical platform before promotion. Same-output replay establishes determinism; it does not replace an independent correctness check.

#### Price-Performance Measurement

For a cloud run using instances indexed by $i$, define

$$
K_{\mathrm{compute}}
=
\sum_i p_i h_i
$$

where $p_i$ is the actual instance price in dollars per billed hour and $h_i$ is its billed duration. Total campaign cost is

$$
K_{\mathrm{campaign}}
=
K_{\mathrm{compute}}
+K_{\mathrm{storage}}
+K_{\mathrm{network}}
+K_{\mathrm{operations}}.
$$

The measured price-performance quantities are

$$
P_{\mathrm{test}}
=
\frac{N_{\mathrm{verified}}}{K_{\mathrm{campaign}}},
\qquad
C_{\mathrm{million}}
=
\frac{10^6}{P_{\mathrm{test}}}.
$$

Thus $P_{\mathrm{test}}$ is verified tests per dollar and $C_{\mathrm{million}}$ is dollars per million verified tests. Billed startup time, idle capacity, failed or preempted attempts, retries, compact-output storage, network transfer, deterministic merge, and final verification all remain in the denominator. Quoting core count times a local single-worker rate is only a capacity estimate and must not be reported as measured cloud throughput.

The controlled cloud experiment should sweep worker counts from one through the selected machine's useful concurrency range, using one warm-up and at least three repetitions per setting. It should then compare several fleet sizes of identical instances on one fixed logical workload. Every run must report individual and median wall time, tests/hour, processor utilization, peak memory, retries, bytes transferred, total billed cost, tests/dollar, and exact-output comparison. The preferred execution mode is the one with the lowest measured cost per verified test that also meets the desired completion time and every evidence boundary.

The analytical campaign has three stages:

1. **Monte Carlo coverage.** Draw a reproducible, seeded sample from each declared measure over $\Theta_M$. Use stratification so narrow coordinate regions are not lost by chance.
2. **Directed refinement.** Add targeted samples around strong external cancellation, admissible root margins, candidate optima, and boundaries where root topology or prescribed-period closure changes. Include deliberately adverse directions so the method does not optimize only one favorable projection.
3. **Robustness and sensitivity analysis.** Resample neighborhoods around leading instantiations, vary one declared coordinate at a time where useful, and report whether the apparent advantage survives small changes in coordinates, sampling measure, and numerical resolution.

Every result row must include the family/member identifier, full parameter vector, source grade, sampling measure, seed or directed-selection rule, root status, numerical resolution, and metric uncertainty.

The campaign output should include the distribution of every objective and gate, parameter-to-measure sensitivity, correlations that may reveal redundant coordinates, the non-dominated set under $\mathbf G_{\mathrm{an}}$, and the location and width of robust favorable regions. A single best sampled point is not enough: the central question is whether a candidate has a reproducible favorable region in configuration space or only a narrowly tuned instantiation.

### Common-Axis Architrino-Worldline Chart

The common-axis chart supplies a six-worldline Family-B dimension extension and the twelve-worldline Family-C parent geometry. Let $\hat{\mathbf n}$ be the oriented translation axis, with transverse orthonormal vectors $\hat{\mathbf e}_1,\hat{\mathbf e}_2$. Assign persistent architrino-worldline indices $m=1,\ldots,N_w$, ordered axial coordinates

$$
\xi_1<\xi_2<\cdots<\xi_{N_w},
$$

and spacings

$$
d_m=\xi_{m+1}-\xi_m>0.
$$

For group-translation speed $0\le s_{\mathrm{grp}}<c_f$, architrino worldline $m$ is

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

$$
\theta_m(T)=q_m\omega_mT+\phi_m,
\qquad
q_m\in\{+1,-1\}.
$$

The binary-counterpart map $\pi$ must be a fixed-point-free involution,

$$
\pi(\pi(m))=m,
\qquad
\pi(m)\ne m,
$$

and every pair must declare its polarities, radii, frequencies, phases, circulation relation, axial midpoint, axial separation, and exact constraint. A pairing label has no analytical effect unless it changes a declared path or polarity.

For an even ordered chart, adjacent-pair association slots may be declared as

$$
P_k=(2k-1,2k),
\qquad
\mu_k=\frac{\xi_{2k-1}+\xi_{2k}}{2}.
$$

For a twelve-worldline Family-C source, six additional architrino worldlines may be declared as an Accessory Configuration only when all six polarities and complete paths are supplied. A three-worldline Family-B scaling control is not an Accessory Configuration. An additional path associated with slot $P_k$ has the form

$$
\mathbf Y_k(T)
=
\mathbf C_0
+s_{\mathrm{grp}}T\hat{\mathbf n}
+(\mu_k+\epsilon_k)\hat{\mathbf n}
+\boldsymbol\delta_k(T),
$$

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

This equation covers every ordered transmitter-receiver pair in the declared source inventory, including Accessory Configuration sites when present. It is generally transcendental because the causally delayed transmitter phase contains $u$. A stationary transverse transmitter reduces the squared equation to a quadratic in $u$. Equal frequency, equal radius, rational frequency ratios, or reflection symmetry can reduce the number of distinct equations or pair contribution rows, but they do not generally remove the delayed phase. Rotating sectors therefore require certified retained-root enumeration.

For each declared worldline, compare prescribed acceleration with the master-equation acceleration from the complete declared source inventory:

$$
\mathbf R_a(T)
=
\ddot{\mathbf Z}^{\mathrm{prescribed}}_a(T)
-\mathbf A^{\mathrm{ME}}_a(T).
$$

Report axial, radial, and tangential projections separately over the complete return period. Pointwise rows, signed cycle averages, RMS values, maxima, primary/refined differences, and source-resolved contributions are all required. Cancellation in one projection cannot conceal failure in another. A converged residual remains a prescribed-path analytical result; it is not stability, retention, binding, or physical realization.

## Candidate Grading

The prescribed-record analytical grade is fail-closed and occurs in this order:

1. **Record validity:** complete provenance, finite values, legal coordinates, reproducible paths, and a current score for the exact source hash.
2. **Geometric admissibility:** no undeclared collision or coincidence, a complete declared period, and converged geometric extraction.
3. **Causal admissibility:** complete retained roots, declared self-hit treatment, resolved fold events, and converged root sums.
4. **Analytical wake comparison:** signed and raw exposure, complete-cycle normal wake flux and cancellation, anisotropy, spectra, peak response, and source-parameter sensitivity under one common protocol.

A prescribed chart receives only an analytical prescribed-record grade. Stability and energy are outside the method and outside its score.

### Candidate Summary Publication

Candidate-specific coordinates, source hashes, protocol hashes, gate results, and metric values enter this chapter only from a complete accepted generation of the analytical database. A fresh generation must cover the entire registered candidate cohort under one declared protocol before any comparison row is published. Regeneration replaces the table as one unit; values from different database generations must not be mixed.

The reader-facing summary should remain compact. It may show named reference cases, the leader under an explicitly named measure, and operator-selected cases of analytical interest. Each row must carry its source hash, protocol hash, database-generation hash, acceptance state, and the reason it is included. A rejected case may be shown only when its failed gate is explicit. An undeclared combined score or global braid ranking is not permitted.

Each published table must state the enclosing radius or radius sequence, surface and time reductions, probe polarity, normalization, tolerance, and uncertainty attached to every scalar row. A cell may link to a fuller ledger when a scalar would hide root transitions, angular structure, or phase dependence.

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

where $S_{\boldsymbol\theta}$ is the declared sensitivity of the wake measures to source-coordinate changes. Prescribed-period closure, minimum separation, and the root-transversality margin are validity gates or annotations rather than performance rewards.

One candidate dominates another only when it is no worse on every declared objective and better on at least one. A single weighted score is permitted only after the weights and normalization are fixed before inspecting the result. “Strongest analytical wake cancellation” is a legitimate comparison question. “Lowest apparent energy” is not a quantity defined by this methodology.

Separate grades are required for a family/member chart and for a particular instantiation. A strong instantiation supports existence within a sampled region; it does not establish that the family as a whole has the same performance.

## Borg Analysis Surface

Borg should expose this method as a record-derived analysis surface. A user should be able to place fixed or moving probes at arbitrary $(T,\mathbf X)$ coordinates and display:

- $\mathcal W$, $\mathcal W_{\mathrm{abs}}$, and $\chi_{\mathcal W}$;
- positive- and negative-polarity virtual-probe responses;
- individual transmitter contributions and their vector sum;
- root count, root identity, $D_t$, and fold events;
- time graphs over the full return cycle;
- spatial slices, enclosing-surface maps, spectra, and angular coefficients;
- complete-cycle signed, raw, and residual normal wake flux together with $\eta_{\mathcal W,\mathrm{flux}}(R)$ and the raw emission-reference residual;
- transmitter-root-tagged complex normal wake-flux coefficients and $\eta_{\mathcal W,\mathrm{flux}}^{(\ell mn)}(R)$ across the declared enclosing radii; and
- source-parameter sensitivity, invalidated-score status, and the exact source and protocol hashes.

The graph must remain synchronized with animation time and preserve source-record provenance. Borg may also present a teaching sequence that highlights selected binaries, axes, wakes, envelopes, roots, or probes while explanatory text appears on the canvas. Teaching cues are annotations on the record; they are not evidence generated by the record.

Energy and stability controls should not appear as outputs of this analytical surface because the method does not define them.

## Minimum Publication Packet

A publishable candidate analysis contains:

1. the complete source record and taxonomy row;
2. the superimposed causal-wake formula and all normalization choices;
3. the internal receiver-wake ledger through one complete return cycle;
4. the probe geometry and raw time-dependent curves;
5. prescribed-period closure, root, separation, cancellation, anisotropy, spectral, and source-sensitivity metrics;
6. an explicit analytical claim boundary that excludes energy and stability conclusions;
7. the Monte Carlo, directed-refinement, and robustness sampling declarations;
8. the gate result and multi-objective comparison vector; and
9. the exact observation that would falsify each promoted claim.

This packet makes analytical candidate comparison reproducible. A prescribed braid remains a prescribed geometry with analytically evaluated causal-wake properties; the method makes no claim about stability or physical retention.
