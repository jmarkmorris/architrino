# $A_0$ Branch Certificate Protocol

This protocol defines the mathematical and numerical evidence for the $A_0$ reference attractor described in [Particle Masses](../../assemblies/particle-masses.md#reference-attractor-gate), [Coincident-Midpoint Orthogonal-Axis Braid Dynamics](../../noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md#zero-axial-offset-three-binary-dynamics-and-interpretation), and [Energy](../../dynamics/energy.md). It specializes the general [Simulation Run Protocols](run-protocols.md) to the first neutral rest-branch mass-map candidate constrained to coincident-midpoint orthogonal-axis braid coordinates: persistent indices, independently assignable positive radii and frequencies, mutually orthogonal near-rest axes, the declared orthogonal-axis three-binary response direction, and explicit remaining binary coordinates. No computed $A_0$ branch is reported here. Retention and stability require the stated conditions to hold on the same evolved history.

The protocol does not treat $A_0$ as a particle label. It treats $A_0$ as a calibration-free branch certificate problem: find a finite, stable, multi-scale causal-root ledger before energy, shielding, Noether sea response, or mass comparisons enter.

## Master-Equation Handoff Boundary

If a run consumes a master-equation branch-chart object $\mathfrak{B}(\Gamma,\mathcal{S};H_{\mathrm{hist}},\eta,\epsilon_c)$, the consumed data must remain branch-certificate data: active roots, inactive gaps, transmitter-side Jacobian floors, same-record transmitter-side acceleration-weight intervals $W^{\mathrm{acc}}$, receiver-side factors $D_r$, signed root-playback intervals $D_r/D_t$, memory depth, returned-section residual, section stability, and the refinement schedule that preserves the same branch identity. Here $H_{\mathrm{hist}}$ is the finite retained-history horizon, not the observer-level Planck benchmark $h$. These fields may support Tier 0 and Tier 1 certification only.

The analysis must distinguish branch geometry from downstream physical quantities. Energy, far-field shielding, Noether sea response, and mass extraction remain uncomputed until the required analyses are performed. An extraction fails the stated consistency test if $\zeta(A_0)$, $\mathcal{L}_{\text{aniso}}$, or $\mathcal{M}_{\text{sea}}^{ab}$ changes under root-ledger refinement, inactive-gap refinement, history-window extension, or controlled $\eta$ refinement while the branch label and quotient row are claimed to be unchanged.

## Evidence Required for a Branch

An auditable $A_0$ analysis distinguishes the following information across all tiers. Quantities not computed at a given tier remain explicitly uncomputed, with their scientific role stated.

| Evidence | Required content | Interpretation |
| --- | --- | --- |
| Reproducibility | publicly identifiable method and data versions, integrator, tolerances, $\eta$, sampling schedule, and history-window rule | makes the calculation reproducible |
| Noether sea environment | $u^i_{\text{sea}}$, $G_{\text{grad}}$, $n$, $\chi_{\text{sea}}$, declared $c_\star$, and boundary conditions | fixes the homogeneous Noether sea cell and prevents mixing $c_f$ with $c_{\text{eff}}$ |
| Branch identity | layer windings, inter-layer closure integers, handedness, carrier ellipticity, and active root-branch summary | identifies the branch being certified |
| Reduced coordinates | quotient-coordinate row $z_\Lambda$: $\varepsilon_{12}$, $\varepsilon_{23}$, $T_1/T_2$, $T_2/T_3$, $\delta_2$, binary ellipticities, $G_{\ell m}$, $\chi_N$, $H_1,H_2,H_3$, $\Phi_{\text{rel}}$, removed gauges $SO(3)$, $S^1_{\mathbf{k}}$, $\Gamma_\Lambda$, branch class $[\Lambda]$, and quotient-degeneracy status | records the reduced moduli coordinate rather than an unquotiented carrier representative |
| Coordinate revision | revised reduced branch coordinates declared before fitting, including source coordinates, equality relations, equation and coefficient counts, held-out residual tests, phase-origin convention, symmetry quotients, excluded locked-root contributions and benchmarks, and an explicit distinction from evolved-history evidence | prevents residual-selected coordinates or post-fit added columns from masquerading as branch geometry |
| State | six architrino labels, polarities, reduced geometry, frequencies, phase offsets, carrier chart, history segment, and center gauge | gives the reduced Noether braid state vector |
| Closure equations | active variables, causal-root equations, layer phase closure, inter-layer closure, center-gauge closure, speed-ordering inequalities, and tolerances | ties closure labels to equations rather than only to names |
| Causal roots | active and raw partner, self, and inter-layer root classes with delays, branch Jacobians, separator flags, root-count changes across separators, parity events, and excluded near-zero self roots separated | verifies finite causal-root bookkeeping |
| Interaction terms | terms assigned to averaging, locking, and leakage channels, with measured or derived residual size | makes the size and role of each correction explicit |
| Residual vector | complete branch-row residual surface $\mathcal{R}_{A_0}$, with $\mathcal{R}_{\text{state}}$, $\mathcal{R}_{\text{root}}$, $\mathcal{R}_{\text{phase}}$, $\mathcal{R}_{E}$, $\mathcal{R}_{\text{drift}}$, $\mathcal{R}_{\text{speed}}$, $\mathcal{R}_{\text{avg}}$, $\mathcal{R}_{\text{lock}}$, $\mathcal{R}_{\text{leak}}$, and $\mathcal{R}_{\text{Floquet}}$, each with value, tolerance, status, role, and note fields | states the errors and leaves later-tier omissions explicit |
| Floquet gap | $\Delta_{\mathbf{k}}$ and its interpretation under the stated stability criterion; uncomputed at Tier 0 | distinguishes an unevaluated stability condition from a positive or nonpositive computed gap |
| Stability | monodromy or finite-difference return map, excluded symmetry modes, non-symmetry Floquet multipliers, and the computed $\Delta_{\mathbf{k}}$ once Tier 1 exists | separates integer closure from attractor stability |
| Motion-induced anisotropy | $\mathbf{V}_{\text{cm}}$, declared $c_\star$, $\beta_\star$, envelope ratio, forward/backward delay ratio, tensor $\mathcal{A}_{\mathrm{gv}}^{ij}$, refinement status, and whether the entry is rest residue, small-velocity response, or probe-induced drift | keeps motion-induced deformation separate from shielding leakage |
| Energy | sign-resolved kinetic content, interaction terms, wake/history terms, binary totals $E_1,E_2,E_3$, $E_{\text{internal}}(A_0)$, delayed-Noether status (`action-derived`, `quasi-Noether`, or `diagnostic-only`), the running retained-history energy-like functional across active self-hit crossings, and action per closed cycle after bounded-energy status | supplies the unshielded energy reservoir after Tier 1 passes |
| Far-field shielding | extraction radii, angular grid, selected wake channel, $\mathcal{L}(\hat{\mathbf{R}})$, naive constituent sum, leading isotropic projection, $\zeta(A_0)$, $\mathcal{L}_{\text{aniso}}$, and convergence status | turns shielding into an extracted far-field quantity after Tier 1 passes |
| Noether sea response | acceleration probes, gradient probes, extracted $\mathcal{M}_{\text{sea}}^{ab}$ baseline, symmetric tensor part, antisymmetric residue, and response anisotropy | tests Noether sea inertial and gravitational response after shielding passes |
| Mass comparison | $\zeta(A_0)E_{\text{internal}}(A_0)/E_0$, unresolved constants, response-map assumptions, and explicitly excluded particle benchmarks | records only calibration-free mass-facing output |
| Consistency conditions | satisfied, failed, or uncomputed conditions for quotient nondegeneracy, scale separation, speed ordering, phase closure, carrier residuals, root residual, active root-ledger stability, active separator-root handling, near-zero self-root handling, residual interpretation, Floquet stability, and continuation into direct dynamics | distinguishes branch-search, attractor, shielding, and response evidence |
| Unresolved or failed conditions | conditions not satisfied or not evaluated, and their consequences for the conclusion | prevents incomplete or failed calculations from being read as mass-map results |

The complete residual vector is
$$
\mathcal{R}_{A_0}
=
\left(
\mathcal{R}_{\text{state}},
\mathcal{R}_{\text{root}},
\mathcal{R}_{\text{phase}},
\mathcal{R}_{E},
\mathcal{R}_{\text{drift}},
\mathcal{R}_{\text{speed}},
\mathcal{R}_{\text{avg}},
\mathcal{R}_{\text{lock}},
\mathcal{R}_{\text{leak}},
\mathcal{R}_{\text{Floquet}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4b5f8d0c47ae2134)
Tier 0 may evaluate only part of this vector. Every omitted component remains explicitly uncomputed, together with the later analysis needed to determine it. A missing tolerance is not evidence that a residual is small.

### Self-Hit Energy And Action-Spacing Order

For any row that claims an active self-hit branch, the certificate must report the branch invariants in the required order. First, it reports the active causal-root count by class and the root-count change across separators; any creation or annihilation event must state whether the count changes by an even number rather than hiding the transition inside interpolation. Second, it reports the transversality floor

$$
J_{\min}
=
\min_{\text{active }(T,T_0)}
\left|
1-\frac{\mathbf{V}_j(T_0)\cdot\hat{\mathbf{r}}_{o'j}(T;T_0)}{c_f}
\right|
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e80a6a39747b59e2)

On the same active records the certificate must also report the transmitter-side acceleration weight $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$ on its certified floor or bounded interval. It must report the receiver-side factor $D_r=1-\mathbf V_{o'}(T)\cdot\hat{\mathbf r}_{o'j}(T;T_0)/c_f$ separately for signed root playback. A healthy transversality floor $J_{\min}$ alone does not certify the branch's acceleration or action contribution.

Third, it reports a running retained-history energy-like functional and its variation across self-hit or separator crossings under $\Delta T$, $\eta$, and history-window refinement. A bounded-energy claim fails if the apparent bound disappears under refinement.

The same row must state whether the energy object is action-derived, quasi-Noether, or diagnostic-only. A diagnostic-only energy row may reject a branch by showing runaway, regulator dependence, or nonconvergent drift, but it cannot promote closed-cycle action spacing or no-runaway conservation as theorem-level output.

Closed-cycle action spacing requires those well-posedness conditions. The analysis records $\mathcal{A}_{\text{cycle}}(A_0)$, its branch label $\Lambda$, period $P_{\mathbf{k}}$, and spacing relative to neighboring accepted branches. This ordering prevents a numerically periodic carrier with an unbounded self-hit energy ledger from being read as evidence for a derived $h$.

The group-velocity anisotropy entry uses the reduced centered covariance of the six-worldline state. With
$$
\mathbf{C}_{A_0}(T)=\frac{1}{6}\sum_{a\in A_0}\mathbf X_a(T)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e6bd9714da63ff7a)
define
$$
D^{ij}_{A_0}(\mathbf{V}_{\text{cm}})
=
\left\langle
\sum_{a\in A_0}
\left(X_a^i-C_{A_0}^i\right)
\left(X_a^j-C_{A_0}^j\right)
\right\rangle_{P_{\mathbf{k}}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-56322f39346f96b8)
$$
Q^{ij}_{A_0}
=
\frac{D^{ij}_{A_0}}{h_{mn}D^{mn}_{A_0}},
\qquad
\mathcal{A}_{\mathrm{gv}}^{ij}
=
Q^{ij}_{A_0}-\frac{1}{3}h^{ij}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f022c55f30d3b266)
Here $h_{mn}=\delta_{mn}$ is the Euclidean spatial metric on $\Sigma_T$ and $h^{ij}=\delta^{ij}$ is its inverse, so the denominator is the Euclidean trace of $D^{ij}_{A_0}$. This tensor measures motion-induced or probe-induced Noether braid deformation. It is not the same object as the far-field leakage residue $\mathcal{L}_{\text{aniso}}$, which is extracted from cycle-averaged wake coefficients in Tier 2.

## Tier 0: Algebraic Branch Search

Tier 0 is a reduced branch-search pass. It samples diagnostic carrier charts, solves delayed root equations on those charts, classifies internal terms, and emits candidate rows. It does not claim a physical attractor.

Required inputs:

- homogeneous Noether sea cell with $u^i_{\text{sea}}=0$, $G_{\text{grad}}=0$, $n=1$, $\chi_{\text{sea}}=1$, and primitive wake speed $c_f$;
- persistent binary labels $\ell\in\{1,2,3\}$ and polarity labels $\sigma\in\{+,-\}$;
- scale ratios $\varepsilon_{12}=R_1/R_2$ and $\varepsilon_{23}=R_2/R_3$;
- speed offsets enforcing $s_1 > c_f$, $s_2 \approx c_f$, and $s_3 < c_f$;
- candidate handedness tuple and carrier ellipticity;
- $\eta > 0$, sampling resolution, and history-window rule.

The local symbol $\ell$ denotes the persistent binary index in this protocol. It does not encode a radial-role ordering, and the binary labels are not reassigned when radii, frequencies, or branch-derived roles cross.

Required outputs:

| Output | Meaning |
| --- | --- |
| Branch identity | indexed-binary windings, inter-binary closure integers, handedness, and active root-branch summary |
| Periodic closure | declared $P_{\mathbf{k}}$, winding integers, inter-binary closure integers, and active root classes |
| Reduced coordinates | reduced quotient-coordinate row $z_\Lambda$, including radius ratios, period ratios, $\delta_2$, binary ellipticities, plane Gram data $G_{\ell m}$, $\chi_N$, handedness labels, phase-offset quotient status, removed gauges, branch class $[\Lambda]$, and coordinate-degeneracy status |
| State | reduced geometry, frequencies, phase offsets, carrier chart, and center gauge |
| Closure equations | active causal-root, phase-closure, inter-binary closure, center-gauge, and speed-ordering equations used by the row |
| Causal roots | active and raw partner, self, and inter-binary root counts with delays, branch Jacobians, separator flags, root-count changes across separators, parity events, and excluded near-zero self roots separated |
| Interaction terms | terms assigned to averaging, locking, and leakage channels |
| Residual vector | every component of $\mathcal{R}_{A_0}$, each with value, tolerance, status, role, and note fields; $\mathcal{R}_{E}$ and $\mathcal{R}_{\text{Floquet}}$ are explicit Tier 0 omissions unless supplied by a later diagnostic |
| Floquet gap | $\Delta_{\mathbf{k}}$ status object; uncomputed until Tier 1 constructs the monodromy or finite-difference return map |
| Motion-induced anisotropy | rest-branch residue if computed, or an explicit not-computed Tier 0 status; no Tier 0 row may use this as shielding evidence |
| Consistency conditions | satisfied, failed, or uncomputed conditions for quotient coordinates, scale separation, speed ordering, phase closure, carrier residuals, root residual, active root ledger, active separator roots, near-zero self roots, residual interpretation, $\Delta_{\mathbf{k}}$, and continuation into direct dynamics |
| Unresolved or failed conditions | reason a candidate fails or remains eligible for Tier 1 |

Tier 0 passes only if at least one row has a finite causal-root ledger, nondegenerate quotient coordinates, retained scale separation, correct speed ordering, bounded carrier residuals, no unclassified separator term, and a complete residual surface. Passing Tier 0 only authorizes Tier 1 continuation.

### Interpreting Failure

A failure identifies the condition that remains unsatisfied: coordinate nondegeneracy, scale separation, speed ordering, phase closure, carrier or causal-root residuals, averaging or locking accuracy, separator treatment, or the active-root inventory. None of these preliminary tests computes a Floquet gap. A nonpositive gap can reject the stated attractor criterion only after a return-map calculation supplies it.

### Near-Zero Self Roots

Tier 0 must distinguish raw self-root sightings from active self-hit branches. A self root at the configured near-zero delay threshold is recorded in the raw ledger but excluded from the active ledger as an instantaneous self-kick artifact under the convention $H(0)=0$.

Such a root may not count as self-hit closure merely because a fold-layer diagnostic preserves the locked self-root keys. The current fold-layer row is a transition candidate only; it promotes after a corrected one-period branch-equation attempt passes the declared residual surface, with $\Delta_{\mathbf{k}}$ and $\eta$-ladder persistence still downstream.

The reader-facing interpretation of these rows is in [$A_0$ Tier 0 Result Interpretation](a0-tier0-result-interpretation.md).

## Tier 1: $\eta > 0$ Continuation

Tier 1 examines a geometry satisfying the Tier 0 conditions under direct delayed dynamics, with the regularized wake kernel still active. All quantities retain their declared absolute-frame interpretation.

Required checks:

1. direct evolution over at least one declared $P_{\mathbf{k}}$;
2. root-ledger stability under $\Delta T$ and history-window refinement;
3. persistence of averaging, locking, and leakage classifications;
4. no secular center drift after symmetry modes are removed;
5. monodromy or finite-difference return-map estimate with symmetry modes quotiented;
6. positive non-symmetry Floquet gap $\Delta_{\mathbf{k}}>0$;
7. convergence under the standards in [Convergence Tests](convergence-tests.md);
8. a Floquet or monodromy report stating whether the state-dependent delay derivative term was included in the variational operator;
9. resolved transition data whenever the run crosses a fold-layer, separator, or active-root status transition.

### Branch-Chart Revision Checkpoint

If a Tier 1 diagnostic or corrected carrier calculation establishes a no-go result within a finite coordinate family, a proposed revision must be specified before a new numerical evaluation. The proposed reduced coordinate $z_\Lambda^\star$ or finer branch partition $\mu^\star$ must be declared from branch geometry, causal-root data, quotient-row data, or corrected carrier state before residual fitting. It may not be selected from residual-sign binning, particle benchmarks, fitted weights, or post-fit cancellation.

The revised chart must state its source coordinates, equality relations, equation and coefficient counts, held-out residual checks, phase-origin checks when a phase split is used, excluded locked-root contributions, symmetry quotients, and excluded benchmarks. A proposed coordinate change is not an evolved history. The design must remain overdetermined after quotienting, for example by satisfying $N_{\mathrm{eq}}>N_{\mathrm{coef}}$ or $R_{\mathrm{df}}>0$, and the same branch identity must survive the refinement checks in [Convergence Tests](convergence-tests.md).

Such a revision is a candidate coordinate description, not an evolved history. A hidden fit split, inadequate degrees of freedom, or failure on held-out residuals leaves the compact-coordinate no-go unresolved. Even a revision satisfying these checks still requires corrected one-period residuals, quotient-row identity, monodromy or $\Delta_{\mathbf{k}}$, and $\eta$-ladder persistence with the same branch identity.

Tier 1 passes only if the same branch remains stable before any $\eta\to0^+$ extrapolation.

### Corrected One-Period Branch-Equation Boundary

The proposed compact fold-layer-locked configuration is a negative control, not an established attractor or a broad falsification of possible $A_0$ branches. Preserving locked self-root contributions in $\mathcal{R}_{\text{lock}}$ is insufficient if state return, root closure, phase closure, speed ordering, center drift, or energy closure fails. No numerical residual result is reported for this control. A corrected calculation must declare either a non-circular carrier correction $\mathbf d_\ell(T)$ or a richer branch-native interaction basis before residual fitting.

For a declared period window $W=[T_0,T_0+P_{\mathbf{k}}]$, the corrected carrier has the form
$$
\mathbf X_{a,\ell}^{\star}(T)
=
\mathbf X_{a,\ell}^{(0)}(T)+\mathbf D_\ell(T),
\qquad
\mathbf D_\ell(T+P_{\mathbf{k}})=\mathbf D_\ell(T),
\qquad
\left\langle\mathbf D_\ell\right\rangle_W=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ed6d2de7bf72ebb0)

Here $P_{\mathbf{k}}$ is the declared return period indexed by the winding vector $\mathbf k$.

The one-period residual is
$$
\mathcal{R}_{\mathrm{1per}}
=
\frac{
\left(
\int_W
\sum_a
\left\|
\mathbf A^{\mathrm{ME}}_a(T;\mathbf D)
-
\sum_{B\in\{B_{\text{self}},B_{\text{partner}},B_{\text{inter}}\}}
\alpha_B\,\mathbf A_{a,B}(T;\mathbf D)
\right\|^2 dT
\right)^{1/2}
}{
\left(
\int_W
\sum_a
\|\mathbf A^{\mathrm{ME}}_a(T;\mathbf D)\|^2 dT
\right)^{1/2}
+\varepsilon_0
}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-aee97242a02ad6b6)
The rerun may proceed toward monodromy only if
$$
\mathcal{R}_{\mathrm{1per}}\le 0.02
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7579aacacf0ef4a6)
with $\mathbf D_\ell(T)$, the basis terms $\mathbf A_{a,B}$, the coefficient rule for $\alpha_B$, and any held-out interval declared before fitting. A scalar-basis no-go is therefore a chart or basis failure; it does not become an attractor failure unless every admissible corrected carrier and branch-native basis inside the declared search class fails the same residual boundary.

## Tier 2: Energy and Shielding

Tier 2 begins only after Tier 1 passes. It computes the internal-energy ledger and far-field shielding extraction described in [Energy](../../dynamics/energy.md). The required outputs are:

- $E_1$, $E_2$, $E_3$, and $E_{\text{internal}}(A_0)$;
- interaction and wake/history bookkeeping with no double counting;
- far-field wake coefficients $\mathcal{L}(\hat{\mathbf{R}})$ over extraction radii and angular grids;
- the naive constituent sum $\mathcal{L}_{\text{naive}}$ and the leading isotropic projection $\Pi_0\mathcal{L}$;
- $\zeta(A_0)$ from the leading isotropic projection;
- anisotropic leakage $\mathcal{L}_{\text{aniso}}=(1-\Pi_0)\mathcal{L}$ retained as a separate tensor or channel list;
- convergence status under extraction radius, angular resolution, $\Delta T$, history-window, and $\eta$ refinement.

Tier 2 fails if particle masses, charged-lepton ratios, electron radius, or measured $\alpha$ enter as inputs.

## Tier 3: Medium-Response Probe

Tier 3 begins only after Tier 2 passes. It applies small acceleration and gradient probes to the accepted branch and extracts the homogeneous baseline for $\mathcal{M}_{\text{sea}}^{ab}$. The probe must report whether the acceleration and gradient channels share the same shielded-energy coefficient to first order, and it must report response anisotropy separately from both $\mathcal{A}_{\mathrm{gv}}^{ij}$ and $\mathcal{L}_{\text{aniso}}$.

## Acceptance Boundary

The $A_0$ branch is not an attractor until Tier 1 passes. It is not a mass-map result until Tier 2 passes. It is not an inertial-response result until Tier 3 passes. A reported group-velocity anisotropy tensor is a deformation diagnostic, not a shielding extraction and not a substitute for the Noether sea response probe.
