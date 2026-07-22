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

The term **return residual** is replaced here by **prescribed-period closure residual**. It checks only that the declared path formulas return to the same position, velocity, and phase after $T_{\mathrm{ret}}$. It is often zero by construction and is an integrity check on the chart and selected period, not a stability measure. Root and wake ledgers may also be checked for periodicity, but their endpoint differences remain analytical consistency diagnostics.

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

For C1.1 and C2.1, the axial braid-center separation $d_C$ is a required Monte Carlo coordinate in $\boldsymbol\theta$. Each sampled source must retain the coaxial constraint $\Delta\mathbf C=d_C\hat{\mathbf n}_C$ while varying $d_C$ under the campaign's declared positive domain and sampling measure. The canonical display value $d_C=1.10$ is one reference point, not a fixed sampling value. A campaign must publish the minimum, maximum, units, and probability measure for $d_C$ before drawing samples.

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

The analytical campaign has three stages:

1. **Monte Carlo coverage.** Draw a reproducible, seeded sample from each declared measure over $\Theta_M$. Use stratification so narrow coordinate regions are not lost by chance.
2. **Directed refinement.** Add targeted samples around strong external cancellation, admissible root margins, candidate optima, and boundaries where root topology or prescribed-period closure changes. Include deliberately adverse directions so the method does not optimize only one favorable projection.
3. **Robustness and sensitivity analysis.** Resample neighborhoods around leading instantiations, vary one declared coordinate at a time where useful, and report whether the apparent advantage survives small changes in coordinates, sampling measure, and numerical resolution.

Every result row must include the family/member identifier, full parameter vector, source grade, sampling measure, seed or directed-selection rule, root status, numerical resolution, and metric uncertainty.

The campaign output should include the distribution of every objective and gate, parameter-to-measure sensitivity, correlations that may reveal redundant coordinates, the non-dominated set under $\mathbf G_{\mathrm{an}}$, and the location and width of robust favorable regions. A single best sampled point is not enough: the central question is whether a candidate has a reproducible favorable region in configuration space or only a narrowly tuned instantiation.

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
