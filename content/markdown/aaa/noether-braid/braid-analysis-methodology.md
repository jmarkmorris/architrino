# Candidate Braid Analysis Methodology

This chapter defines a common analysis method for prescribed braid charts and evolved candidate braid records. Its purpose is comparison: every candidate should be evaluated with the same causal-wake formula, probe set, energy boundaries, return window, and grading rules before one geometry is said to shield, close, or outperform another.

The method does not promote a prescribed path to a retained solution of the EOM solver. A prescribed record supports geometry and causal-wake diagnostics. An evolved record supports dynamical claims only to the grade established by its residuals, root certificate, refinement study, and perturbation response.

The phrase **absolute observer position** means a coordinate probe at an event $(T,\mathbf X)$ in absolute time and the Euclidean void. It does not introduce a Physical Observer or an effective spacetime frame. The native coordinates are

$$
(T,\mathbf X)=(T,X^1,X^2,X^3).
$$

## Analysis Record

Every published candidate analysis must identify one source record. At minimum that record carries:

- the paths $\mathbf X_j(T)$, velocities $\mathbf V_j(T)$, polarities $q_j$, and persistent identities of all architrinos;
- the family/member identifier and complete taxonomy-coordinate row;
- whether the paths are prescribed geometry or EOM-solver output;
- the retained history interval, analysis window, return duration $T_{\mathrm{ret}}$, and absolute-time origin $T_0$;
- the field speed $c_f$, coupling convention, root policy, self-hit policy, and any mollifier or cutoff;
- the spatial probe set, enclosing surfaces, temporal sampling rule, and numerical tolerances; and
- the source hash, engine identity, parameter vector, sampling seed, and generated result hash.

An analysis that changes its probe set, history depth, root policy, or boundary while comparing candidates is not a controlled comparison unless the change is declared as a separate sensitivity study.

## Superimposed Causal-Wake Map

The requested wave formula is not an imported wave-equation partial differential equation. It is the superposition of the same delayed causal isochrons used by the [Master Equation](../dynamics/master-equation.md#path-history-sum-and-integral-representation).

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

A source-normalized signed causal-wake map is then

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

for the declared retained-history start $T_{\min}$. This scalar records signed causal-wake exposure under the declared source normalization. It is not by itself energy, potential, or acceleration.

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

under the canonical simple-root Master EOM convention. The stationary probe is a comparison instrument, not an added source in the braid record. Positive- and negative-polarity probe responses must be reported separately when their distinction matters.

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

For a declared primitive kinetic scalar $K(s)$, the corresponding received kinetic-energy rate is

$$
\dot E_{k,i}^{\mathrm{others}}(T)
=
\mu_K(s_i)
\mathbf A_i^{\mathrm{others}}(T)\cdot\mathbf V_i(T),
\qquad
\mu_K(s)=\frac{K'(s)}{s}.
$$

This is an energy-rate row only when it uses the same kinetic scalar and causal-hit convention as the owning energy ledger. The unweighted diagnostic $\mathbf A\cdot\mathbf V$ is an acceleration-power proxy, not energy.

## Probe Geometry

A candidate should be tested on the same nested probe geometry:

1. the braid center and each binary midpoint;
2. each architrino path and declared binary axis;
3. a three-dimensional interior grid covering the path-history envelope;
4. one or more enclosing surfaces $S_R$ outside that envelope;
5. a far-field directional grid with enough angular resolution to separate isotropic and anisotropic leakage; and
6. adaptive samples near small-$|D_t|$ roots, close approaches, envelope extrema, and rapid phase changes.

The enclosing radius $R$ must be large enough to test the intended far-field approximation and varied to show whether the extracted multipole coefficients have settled. A single favorable direction cannot establish shielding.

## Objective Measures

The first analysis pass should publish the following measures. Each is objective once the source record, norm, boundary, and sampling rule have been fixed.

| Measure | Definition or required record | What it tests |
| --- | --- | --- |
| Return residual | Position, velocity, phase, root-ledger, and wake-ledger difference between $T_0$ and $T_0+T_{\mathrm{ret}}$ | Whether one complete cycle actually returns |
| Minimum separation | $\min_{T,i\ne j}\|\mathbf X_i(T)-\mathbf X_j(T)\|$ | Collision or near-collision margin |
| Root-transversality margin | $\min|D_{t,j}|$ over all retained probe and internal roots | Distance from an unresolved caustic boundary |
| Root-topology ledger | Root counts, identities, births, deaths, and reconnections versus $T$ | Whether averaged curves hide branch changes |
| Internal response balance | Per-architrino peak and RMS $\|\mathbf A_i^{\mathrm{others}}\|$, plus spread across $i$ | Load imbalance and internally exposed channels |
| Internal energy-rate closure | Cycle integral of all declared $\dot E_{k,i}$ rows plus interaction, wake, boundary, and sea rows | Whether the energy ledger returns |
| External signed exposure | $\mathcal W$ on $S_R$ through the complete cycle | Net polarity-signed leakage |
| External raw exposure | $\mathcal W_{\mathrm{abs}}$ on $S_R$ through the complete cycle | Strength before cancellation |
| Directional response | $\mathbf A_p$ for both probe polarities on $S_R$ | Vector leakage and polarity dependence |
| Multipole ledger | Cycle-resolved isotropic, dipole, quadrupole, and higher retained coefficients | Which external channels survive cancellation |
| Anisotropy | Non-isotropic far-field ledger relative to the naive constituent ledger | Whether a scalar shielding summary is admissible |
| Spectral ledger | Fourier coefficients over $T_{\mathrm{ret}}$ for selected internal and external rows | Harmonic content, sidebands, and phase locking |
| Robustness | Change of all reported measures under path perturbation and numerical refinement | Whether a favorable result is structurally stable |

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

is a geometry-response exposure fraction. It measures external cancellation under a declared probe and surface convention. It is not the apparent-energy fraction.

## Energy and External-Wake Ledgers

The energy analysis must use the definitions and boundary balance in [Energy](../dynamics/energy.md#assemblies-internal-vs-apparent-energy). Four rows must remain distinct:

| Ledger | Meaning |
| --- | --- |
| $E_{\mathrm{total},W}$ | The history-aware total for the declared finite window: architrino kinetic/configuration energy, retained wake-history energy, Noether sea energy when included, and boundary terms |
| $E_{\mathrm{internal}}(A)$ | Energy retained by the braid assembly and its declared immediate environment |
| $\mathcal L_{\mathrm{wake}}(A)$ | Far-field wake ledger, including isotropic and anisotropic coefficients |
| $E_{\mathrm{apparent}}(A)$ | Externally exposed energy inferred only after the wake ledger is mapped through a declared probe and Noether sea response |

The far-field leakage factor is

$$
\zeta(A)
=
\frac{\|\Pi_0\mathcal L_{\mathrm{wake}}(A)\|}
{\|\mathcal L_{\mathrm{naive}}(A)\|},
$$

with anisotropic leakage reported separately. At roadmap grade,

$$
E_{\mathrm{apparent}}(A)
\sim
\zeta(A)E_{\mathrm{internal}}(A).
$$

The candidate-analysis report should publish both requested fractions:

$$
f_{\mathrm{app,int}}
=
\frac{E_{\mathrm{apparent}}}{E_{\mathrm{internal}}},
\qquad
f_{\mathrm{app,tot}}
=
\frac{E_{\mathrm{apparent}}}{E_{\mathrm{total},W}}.
$$

Neither ratio is accepted merely because $\eta_{\mathrm{ext}}$ is small. The apparent-energy map must close on the same record, window, Noether sea response, and boundary flux as the total-energy ledger. If the energy residual fails to converge, or if a claimed subset fraction falls outside its declared ledger bounds, the energy grade fails even when the geometry-response plot looks well shielded.

## Parameter Sampling

Let $\boldsymbol\theta$ contain the complete taxonomy coordinates, group-translation speed, phase origin, environmental coordinates, and any permitted history coordinates. A sampling campaign must publish the domain $\Theta$, units, constraints, and sampling measure. There is no coordinate-free meaning to “random braid”; uniform sampling in radius, logarithmic radius, speed, or frequency represents different candidate populations.

The recommended campaign has three stages:

1. **Random coverage.** Draw a reproducible, seeded sample from each declared measure over $\Theta$. Use stratification so narrow coordinate regions are not lost by chance.
2. **Directed refinement.** Refine around low residuals, strong external cancellation, admissible root margins, and boundaries where root topology or return behavior changes. Include deliberately adverse directions so the method does not optimize only one favorable projection.
3. **Dynamical adjudication.** Send surviving prescribed charts to the EOM solver with declared histories and perturbations. Recompute every metric on the evolved record rather than carrying prescribed-geometry scores forward.

Every result row must include the family/member identifier, full parameter vector, source grade, sampling measure, seed or directed-selection rule, root status, numerical resolution, and metric uncertainty.

## Candidate Grading

Grading is fail-closed and occurs in proof order:

1. **Record validity:** complete provenance, finite values, legal coordinates, and reproducible paths.
2. **Geometric admissibility:** no undeclared collision, complete return window, and stable metric extraction.
3. **Causal admissibility:** complete retained roots, declared self-hit treatment, and resolved fold events.
4. **Dynamical retention:** EOM-solver residuals, branch return, perturbation recovery, and collapse tests.
5. **Energy and action closure:** same-record ledgers with convergent boundary and numerical residuals.
6. **External performance:** shielding, apparent energy, anisotropy, peak exposure, and robustness.

A prescribed chart can pass only the first three gates and can be ranked only as a prescribed geometry. It cannot receive a retained-braid grade.

Among candidates at the same accepted grade, report a vector of objectives rather than hiding choices inside one number:

$$
\mathbf G
=
\left(
\mathcal R_{\mathrm{return}},
f_{\mathrm{app,int}},
\eta_{\mathrm{ext}},
\epsilon_{\mathrm{aniso}},
A_{\mathrm{internal,peak}},
\mathcal R_E,
\mathcal R_{\mathrm{pert}}
\right).
$$

One candidate dominates another only when it is no worse on every declared objective and better on at least one. A single weighted score is permitted only after the weights and normalization are fixed before inspecting the result. “Lowest apparent energy” and “strongest shielding” are therefore legitimate comparison questions, but neither can compensate for failed causal roots, failed retention, or an unclosed total-energy ledger.

Separate grades are required for a family/member chart and for a particular instantiation. A strong instantiation supports existence within a sampled region; it does not establish that the family as a whole has the same performance.

## Borg Analysis Surface

Borg should expose this method as a record-derived analysis surface. A user should be able to place fixed or moving probes at arbitrary $(T,\mathbf X)$ coordinates and display:

- $\mathcal W$, $\mathcal W_{\mathrm{abs}}$, and $\chi_{\mathcal W}$;
- positive- and negative-polarity virtual-probe responses;
- individual transmitter contributions and their vector sum;
- root count, root identity, $D_t$, and fold events;
- time graphs over the full return cycle;
- spatial slices, enclosing-surface maps, spectra, and multipole coefficients; and
- the external-wake, apparent-energy, total-energy, and fraction rows at their actual available claim grade.

The graph must remain synchronized with animation time and preserve source-record provenance. Borg may also present a teaching sequence that highlights selected binaries, axes, wakes, envelopes, roots, or probes while explanatory text appears on the canvas. Teaching cues are annotations on the record; they are not evidence generated by the record.

## Minimum Publication Packet

A publishable candidate analysis contains:

1. the complete source record and taxonomy row;
2. the superimposed causal-wake formula and all normalization choices;
3. the internal receiver-wake ledger through one complete return cycle;
4. the probe geometry and raw time-dependent curves;
5. return, root, separation, shielding, anisotropy, spectral, and robustness metrics;
6. total, internal, wake, apparent-energy, boundary, and residual ledgers at their available grades;
7. the random and directed sampling declarations;
8. the gate result and multi-objective comparison vector; and
9. the exact observation that would falsify each promoted claim.

This packet makes candidate comparison reproducible while preserving the central distinction: a visually compelling prescribed braid is a geometry hypothesis until the EOM solver and the same-record ledgers establish more.
