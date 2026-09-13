# $A_0$ Branch Certificate Protocol

This protocol defines the mathematical and numerical evidence required for $A_0$, the reference-attractor candidate described in [Particle Masses](../../assemblies/particle-masses.md#reference-attractor-gate), [Coincident-Midpoint Orthogonal-Axis Braid Dynamics](../../noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md#zero-axial-offset-three-binary-dynamics-and-interpretation), and [Energy](../../dynamics/energy.md). The symbol $A_0$ names one proposed neutral rest branch of a [Noether braid](../../noether-braid/noether-braid.md), the neutral six-architrino scaffold of three binaries, in the [coincident-midpoint orthogonal-axis three-binary configuration](../../noether-braid/3d-braid-assemblies.md#coincident-midpoint-orthogonal-axis-three-binary-configuration), in which the three binary midpoints coincide and the three binary axes are mutually orthogonal. A branch certificate is the finite record that would establish such a branch: the retained history, its causal-root ledger, its return under the delayed dynamics, its stability, and the residuals and tolerances that make each entry checkable. The protocol specializes the general [Simulation Run Protocols](run-protocols.md) to this one neutral rest-branch mass-map candidate constrained to coincident-midpoint orthogonal-axis braid coordinates: persistent indices, independently assignable positive radii and frequencies, mutually orthogonal near-rest axes, the declared orthogonal-axis three-binary response direction, and explicit remaining binary coordinates. The first requirement of the mass program is a persistent object under the [Master Equation](../../dynamics/master-equation.md); $A_0$ is one candidate for that object and this chart is not the unique route to particle mass. No computed $A_0$ branch is reported here. Retention and stability require the stated conditions to hold on the same evolved history.

The protocol does not treat $A_0$ as a particle label. It treats $A_0$ as a calibration-free branch certificate problem: find a finite, stable, multi-scale [causal-root](../../foundations/architrino.md) ledger, whose entries identify the earlier emissions that reach a receiver at an evaluation time, before energy, shielding, Noether sea response, or mass comparisons enter. Every numerical quantity in this protocol is stated in normalized wake-speed units with $c_f=1$, where $c_f$ is the primitive speed at which a causal wake surface expands; the symbol $c_f$ is retained in the equations below so that their dependence on it stays visible.

## Master-Equation Handoff Boundary

If a run consumes a master-equation [branch-chart closure object](../../dynamics/master-equation.md#branch-chart-closure-object) $\mathfrak{B}(\Gamma,\mathcal{S};H_{\mathrm{hist}},\eta,\epsilon_c)$, the consumed data must remain branch-certificate data: active roots, inactive gaps, transmitter-side Jacobian floors, same-record transmitter-side acceleration-weight intervals $W^{\mathrm{acc}}$, receiver-side factors $D_r$, signed root-playback intervals $D_r/D_t$, memory depth, returned-section residual, section stability, and the refinement schedule that preserves the same branch identity. Here $\Gamma$ is the retained history of the six worldlines, $\mathcal{S}$ is the section on which the return of that history is measured, $\eta$ is the causal-wake-surface width of the regularized kernel, and $\epsilon_c$ is the auxiliary core scale that regularizes zero separation. $H_{\mathrm{hist}}$ is the finite retained-history horizon, written $h$ in the Master Equation's object; this protocol renames it so that it is not confused with the observer-level Planck benchmark $h$, which appears below as the action quantum whose recovery is a closure target. With $\hat{\mathbf r}_t$ the unit vector from the transmitter's emission site to the receiver, $\mathbf V_t(T_t)$ the transmitter velocity at emission time $T_t$, and $\mathbf V_r(T_r)$ the receiver velocity at reception time $T_r$, the transmitter-side acceleration weight $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$, with $D_t=c_f-\mathbf V_t(T_t)\cdot\hat{\mathbf r}_t$, sets the strength of an arriving hit from the transmitter's motion at emission; the receiver-side factor $D_r=c_f-\mathbf V_r(T_r)\cdot\hat{\mathbf r}_t$ sets how fast the receiver plays through the emitted wake sequence, and the ratio $D_r/D_t$ is the signed rate at which the selected emission time advances with reception time. These fields may support Tier 0 and Tier 1 certification only.

The analysis must distinguish branch geometry from downstream physical quantities. Energy, far-field shielding, Noether sea response, and mass extraction remain uncomputed until the required analyses are performed. Three downstream quantities are named here so that their refinement test can be stated. The shielding factor $\zeta(A_0)$ is the leading isotropic fraction of the far-field wake that escapes the assembly relative to the unshielded constituent sum, and the anisotropic leakage $\mathcal{L}_{\text{aniso}}$ is the direction-dependent remainder of that far-field wake; both are defined in [Energy](../../dynamics/energy.md#apparent-energy-and-shielding). The Noether sea response tensor $\mathcal{M}_{\text{sea}}^{ab}$ converts exposed energy and response-center velocity into effective momentum and reduces to $h^{ab}/c_{\text{eff}}^2$ in the homogeneous isotropic limit; it is defined in the [inertial-response section of Energy](../../dynamics/energy.md#operational-definition-of-inertial-mass). An extraction fails the stated consistency test if $\zeta(A_0)$, $\mathcal{L}_{\text{aniso}}$, or $\mathcal{M}_{\text{sea}}^{ab}$ changes by more than its declared tolerance under root-ledger refinement, inactive-gap refinement, history-window extension, or controlled $\eta$ refinement while the branch label and quotient row are claimed to be unchanged.

## Evidence Required for a Branch

An auditable $A_0$ analysis distinguishes the following information across all tiers. Quantities not computed at a given tier remain explicitly uncomputed, with their scientific role stated.

| Evidence | Required content | Interpretation |
| --- | --- | --- |
| Reproducibility | publicly identifiable method and data versions, integrator, tolerances, $\eta$, sampling schedule, and history-window rule | makes the calculation reproducible |
| Noether sea environment | the Noether sea drift velocity $u^i_{\text{sea}}$, its density-gradient measure $G_{\text{grad}}$, the normalized Noether braid density $n$, the Noether sea delay factor $\chi_{\text{sea}}=c_f/c_{\text{eff}}$, the declared comparison-channel speed $c_\star$, and boundary conditions | fixes the homogeneous Noether sea cell and prevents mixing $c_f$ with $c_{\text{eff}}$ |
| Branch identity | layer windings, inter-layer closure integers, handedness, carrier ellipticity, and active root-branch summary | identifies the branch being certified |
| Reduced coordinates | quotient-coordinate row $z_\Lambda$: the radius ratios $\varepsilon_{12}=R_1/R_2$ and $\varepsilon_{23}=R_2/R_3$, the cycle-period ratios $P_1/P_2$ and $P_2/P_3$, the binary-2 speed offset $\delta_2=(s_2-c_f)/c_f$, binary ellipticities, the Gram matrix $G_{\ell m}$ of the binary-plane normals, the orientation triple product $\chi_N$ of those normals, the circulation-handedness labels $H_1,H_2,H_3$, the relative phase $\Phi_{\text{rel}}$ after the common phase origin is removed, the removed gauges (global rotations $SO(3)$, the common closed-cycle phase $S^1_{\mathbf{k}}$, and the permitted discrete relabelings $\Gamma_\Lambda$), the branch class $[\Lambda]$, and quotient-degeneracy status | records the reduced moduli coordinate rather than an unquotiented carrier representative |
| Coordinate revision | revised reduced branch coordinates declared before fitting, including source coordinates, equality relations, equation and coefficient counts, held-out residual tests, phase-origin convention, symmetry quotients, excluded locked-root contributions and benchmarks, and an explicit distinction from evolved-history evidence | prevents residual-selected coordinates or post-fit added columns from masquerading as branch geometry |
| State | six architrino labels, polarities, reduced geometry, frequencies, phase offsets, carrier chart, history segment, and center gauge | gives the reduced Noether braid state vector |
| Closure equations | active variables, causal-root equations, layer phase closure, inter-layer closure, center-gauge closure, speed-ordering inequalities, and tolerances | ties closure labels to equations rather than only to names |
| Causal roots | active and raw partner, self, and inter-layer root classes with delays, branch Jacobians, separator flags, root-count changes across separators, parity events, and excluded near-zero self roots separated | verifies finite causal-root bookkeeping |
| Interaction terms | terms assigned to averaging, locking, and leakage channels, with measured or derived residual size | makes the size and role of each correction explicit |
| Residual vector | complete branch-row residual surface $\mathcal{R}_{A_0}$, with $\mathcal{R}_{\text{state}}$, $\mathcal{R}_{\text{root}}$, $\mathcal{R}_{\text{phase}}$, $\mathcal{R}_{E}$, $\mathcal{R}_{\text{drift}}$, $\mathcal{R}_{\text{speed}}$, $\mathcal{R}_{\text{avg}}$, $\mathcal{R}_{\text{lock}}$, $\mathcal{R}_{\text{leak}}$, and $\mathcal{R}_{\text{Floquet}}$, each with value, tolerance, status, role, and note fields | states the errors and leaves later-tier omissions explicit |
| Floquet gap | $\Delta_{\mathbf{k}}$ and its interpretation under the stated stability criterion; uncomputed at Tier 0 | distinguishes an unevaluated stability condition from a positive or nonpositive computed gap |
| Stability | monodromy or finite-difference return map, excluded symmetry modes, non-symmetry Floquet multipliers, and the computed $\Delta_{\mathbf{k}}$ once Tier 1 exists; the acceleration-balance and return residuals of the evolved history on the same retained cycle, which must pass before the return map is linearized | separates integer closure from attractor stability |
| Motion-induced anisotropy | $\mathbf{V}_{\text{cm}}$, declared $c_\star$, $\beta_\star$, envelope ratio, forward/backward delay ratio, tensor $\mathcal{A}_{\mathrm{gv}}^{ij}$, refinement status, and whether the entry is rest residue, small-velocity response, or probe-induced drift | keeps motion-induced deformation separate from shielding leakage |
| Energy | sign-resolved kinetic content, interaction terms, wake/history terms, binary totals $E_1,E_2,E_3$, $E_{\text{internal}}(A_0)$, delayed-Noether status (`action-derived`, `quasi-Noether`, or `diagnostic-only`), the running retained-history energy-like functional across active self-hit crossings, and action per closed cycle after bounded-energy status | supplies the unshielded energy reservoir after Tier 1 passes |
| Far-field shielding | extraction radii, angular grid, selected wake channel, $\mathcal{L}(\hat{\mathbf{R}})$, naive constituent sum, leading isotropic projection, $\zeta(A_0)$, $\mathcal{L}_{\text{aniso}}$, and convergence status | turns shielding into an extracted far-field quantity after Tier 1 passes |
| Noether sea response | acceleration probes, gradient probes, extracted $\mathcal{M}_{\text{sea}}^{ab}$ baseline, symmetric tensor part, antisymmetric residue, and response anisotropy | tests Noether sea inertial and gravitational response after shielding passes |
| Mass comparison | $\zeta(A_0)E_{\text{internal}}(A_0)/E_0$, where $E_0>0$ is a declared energy normalization from an independent unit map and cannot be chosen from the mass being predicted, together with unresolved constants, response-map assumptions, and explicitly excluded particle benchmarks | records only calibration-free mass-facing output |
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

Its components measure, in order, the carrier-chart return mismatch over one declared period ($\mathcal{R}_{\text{state}}$), the defect of the active causal-root equations ($\mathcal{R}_{\text{root}}$), the integer winding mismatch ($\mathcal{R}_{\text{phase}}$), the regularized energy or history functional ($\mathcal{R}_{E}$), the center drift ($\mathcal{R}_{\text{drift}}$), the sign-aware violation of the declared speed ordering ($\mathcal{R}_{\text{speed}}$), the size of terms claimed to average out ($\mathcal{R}_{\text{avg}}$), the defect of the selected locking terms ($\mathcal{R}_{\text{lock}}$), the far-field leakage placeholder ($\mathcal{R}_{\text{leak}}$), and the stability entry ($\mathcal{R}_{\text{Floquet}}$); the tier-by-tier reading of each entry is in [$A_0$ Tier 0 Result Interpretation](a0-tier0-result-interpretation.md#residual-semantics). The stability entry is stated through the non-symmetry Floquet gap $\Delta_{\mathbf{k}}=1-\max_{i\notin G}\lvert\mu_i(\mathbf{k})\rvert$, defined in the [action-increment protocol](coincident-midpoint-orthogonal-axis-action-increment-protocol.md): the Floquet multipliers $\mu_i$ are the eigenvalues of the linearized one-cycle return map, so a multiplier of modulus below one means that a small deviation from the periodic history in that direction shrinks after one cycle, and $G$ is the set of neutral symmetry directions, such as time translation and global rotation, that are excluded before the maximum is taken. A positive gap is the stated attractor criterion for a history that is already a solution; it says nothing about a history that is not.

Tier 0 may evaluate only part of this vector. Every omitted component remains explicitly uncomputed, together with the later analysis needed to determine it. A missing tolerance is not evidence that a residual is small.

### Self-Hit Energy And Action-Spacing Order

For any row that claims an active self-hit branch, the certificate must report the branch invariants in the required order. First, it reports the active causal-root count by class and the root-count change across separators, the events at which a root is born, annihilated, or leaves the retained history, classified in the Master Equation's [separator taxonomy](../../dynamics/master-equation.md#separator-taxonomy); any creation or annihilation event must state whether the count changes by an even number rather than hiding the transition inside interpolation, because an ordinary fold changes the count by two while an odd change signals entry or exit at the memory boundary and must be attributed to that event. Second, it reports the transversality floor

$$
J_{\min}
=
\min_{\text{active }(T_r,T_t)}
\left|
1-\frac{\mathbf{V}_j(T_t)\cdot\hat{\mathbf{r}}_{o'j}(T_r;T_t)}{c_f}
\right|
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e80a6a39747b59e2)

Here the minimum runs over every active root on the retained cycle, each labeled by its reception time $T_r$ and emission time $T_t$; $\mathbf V_j(T_t)$ is the velocity of the transmitting architrino $j$ at emission, and $\hat{\mathbf r}_{o'j}(T_r;T_t)$ is the unit vector from that emission site to the receiving architrino $o'$ at reception. The quantity inside the bars is the dimensionless transmitter-side Jacobian $\lvert D_t\rvert/c_f$, so a floor bounded away from zero certifies that every active root crosses the causal condition transversally rather than grazing it. On the same active records the certificate must also report the transmitter-side acceleration weight $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$ on its certified floor or bounded interval. It must report the receiver-side factor $D_r=c_f-\mathbf V_{o'}(T_r)\cdot\hat{\mathbf r}_{o'j}(T_r;T_t)$ separately for signed root playback. A healthy transversality floor $J_{\min}$ alone does not certify the branch's acceleration or action contribution.

Third, it reports a running retained-history energy-like functional and its variation across self-hit or separator crossings under $\Delta T$, $\eta$, and history-window refinement. A bounded-energy claim fails if the apparent bound disappears under refinement.

The same row must state whether the energy object is action-derived, quasi-Noether, or diagnostic-only. A diagnostic-only energy row may reject a branch by showing runaway, regulator dependence, or nonconvergent drift, but it cannot promote closed-cycle action spacing or no-runaway conservation as theorem-level output.

Closed-cycle action spacing requires those well-posedness conditions. The analysis records the action accumulated over one closed cycle, $\mathcal{A}_{\text{cycle}}(A_0)$, its branch label $\Lambda$, period $P_{\mathbf{k}}$, and spacing relative to neighboring accepted branches. This ordering prevents a numerically periodic carrier with an unbounded self-hit energy ledger from being read as evidence for a derived $h$, the observer-level action quantum known as Planck's constant, whose recovery from closed-cycle action spacing is a closure target rather than an input.

The group-velocity anisotropy entry uses the reduced centered covariance of the six-worldline state. Here $\mathbf{V}_{\text{cm}}$ is the declared translation velocity of the equal-weight centroid of the six worldlines; the subscript is a fixed corpus label, not a mass-weighted center, because architrinos carry no mass. With
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

Here $\mathbf{C}_{A_0}(T)$ is the centroid of the six worldlines at absolute time $T$, and the angle brackets average over one declared return period $P_{\mathbf{k}}$, so $D^{ij}_{A_0}$ is the cycle-averaged second-moment tensor of the six positions about their centroid. $h_{mn}=\delta_{mn}$ is the Euclidean spatial metric on $\Sigma_T$ and $h^{ij}=\delta^{ij}$ is its inverse, so the denominator is the Euclidean trace of $D^{ij}_{A_0}$. Dividing by that trace makes $Q^{ij}_{A_0}$ a unit-trace shape tensor, and subtracting one third of the identity leaves $\mathcal{A}_{\mathrm{gv}}^{ij}$ traceless, so it vanishes exactly for an isotropic distribution and its nonzero part records the direction dependence alone. This tensor measures motion-induced or probe-induced Noether braid deformation. It is not the same object as the far-field leakage residue $\mathcal{L}_{\text{aniso}}$, which is extracted from cycle-averaged wake coefficients in Tier 2.

## Tier 0: Algebraic Branch Search

Tier 0 is a reduced branch-search pass. It samples diagnostic carrier charts, prescribed families of six closed paths on which the causal-root equations are solved without evolving the dynamics, classifies internal terms, and emits candidate rows. It does not claim a physical attractor.

Required inputs:

- homogeneous Noether sea cell with $u^i_{\text{sea}}=0$, $G_{\text{grad}}=0$, $n=1$, $\chi_{\text{sea}}=1$, and primitive wake speed $c_f=1$;
- persistent binary labels $\ell\in\{1,2,3\}$ and polarity labels $\sigma\in\{+,-\}$;
- scale ratios $\varepsilon_{12}=R_1/R_2$ and $\varepsilon_{23}=R_2/R_3$, where $R_\ell$ is the orbital radius of binary $\ell$ on the chart;
- speed offsets enforcing $s_1 > c_f$, $s_2 \approx c_f$, and $s_3 < c_f$, where $s_\ell$ is the orbital speed of the two members of binary $\ell$; this ordering is the declared constraint of the specialized $A_0$ hypothesis in [Particle Masses](../../assemblies/particle-masses.md#reference-attractor-gate), and speed above $c_f$ alone does not establish a self-hit, which requires the actual root inventory;
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

Tier 0 must distinguish raw self-root sightings from active self-hit branches. A self root at or below the configured near-zero delay threshold is recorded in the raw ledger but excluded from the active ledger. The exact zero-delay endpoint is removed by the convention $H(0)=0$, which forbids an instantaneous self-kick; the positive-delay neighborhood below the threshold lies inside the unregularized self-coincidence locus that the Master Equation quarantines by a declared separation floor, so its exclusion is a declared numerical policy rather than a consequence of $H(0)=0$ alone. The exclusion is conservative: it does not show that no positive-delay self-root branch exists nearby.

Such a root may not count as self-hit closure merely because a fold-layer diagnostic, a chart on which a self root sits inside the regularized neighborhood of a fold of its causal-root equation, where the transmitter-side factor $D_t$ vanishes and the simple-root weight is singular, preserves the locked self-root entries. The fold-layer row is a transition candidate only; it promotes after a corrected one-period branch-equation attempt passes the declared residual surface, with $\Delta_{\mathbf{k}}$ and $\eta$-ladder persistence still downstream.

The reader-facing interpretation of these rows is in [$A_0$ Tier 0 Result Interpretation](a0-tier0-result-interpretation.md).

## Tier 1: $\eta > 0$ Continuation

Tier 1 examines a geometry satisfying the Tier 0 conditions under direct delayed dynamics, with the regularized wake kernel still active. All quantities retain their declared absolute-frame interpretation.

Required checks:

1. direct evolution over at least one declared $P_{\mathbf{k}}$, with the evolved rather than prescribed history covering at least one retained horizon $H_{\mathrm{hist}}$ plus one period, so that the returned history segment compared below contains no prescribed data;
2. root-ledger stability under $\Delta T$ and history-window refinement;
3. persistence of averaging, locking, and leakage classifications;
4. no secular center drift after symmetry modes are removed;
5. acceleration balance and return on the same retained cycle: the kinematic acceleration $d^2\mathbf X_a/dT^2$ of the history on the returned cycle, including its initially prescribed segment, agrees with the summed causal-root acceleration evaluated on that same history within the declared tolerance at every reception time, and the history segment returns to itself after one period within the declared $\mathcal{R}_{\text{state}}$ and $\mathcal{R}_{\text{root}}$ tolerances, before any linearization, because a return map linearized about a history that does not satisfy the acceleration law has no referent;
6. monodromy or finite-difference return-map estimate with symmetry modes quotiented;
7. positive non-symmetry Floquet gap $\Delta_{\mathbf{k}}>0$;
8. convergence under the standards in [Convergence Tests](convergence-tests.md);
9. a Floquet or monodromy report stating whether the state-dependent delay derivative term, the contribution to the linearized operator from the dependence of each root's emission time on the perturbed history, was included in the variational operator, since omitting it changes the multipliers;
10. resolved transition data whenever the run crosses a fold-layer, separator, or active-root status transition.

The return-map estimate in item 6 is a finite projection of the return operator on history space. Evaluated at a history that passes item 5 within tolerance, it is a numerical spectral diagnostic; it becomes a stability certificate only when an existence enclosure with nonlinear error bounds establishes a nearby periodic history and the spectral bound is carried by the full history-space operator, as required by the [two-body closure packet](../../dynamics/binary-dynamics.md#two-body-closure-packet-theorem-target).

### Branch-Chart Revision Checkpoint

If a Tier 1 diagnostic or corrected carrier calculation establishes a no-go result within a finite coordinate family, a proposed revision must be specified before a new numerical evaluation. The proposed reduced coordinate $z_\Lambda^\star$ or finer branch partition $\mu^\star$ must be declared from branch geometry, causal-root data, quotient-row data, or corrected carrier state before residual fitting. It may not be selected from residual-sign binning, particle benchmarks, fitted weights, or post-fit cancellation.

The revised chart must state its source coordinates, equality relations, equation and coefficient counts, held-out residual checks, phase-origin checks when a phase split is used, excluded locked-root contributions, symmetry quotients, and excluded benchmarks. A proposed coordinate change is not an evolved history. The design must remain overdetermined after quotienting, $N_{\mathrm{eq}}>N_{\mathrm{coef}}$, equivalently $R_{\mathrm{df}}=(N_{\mathrm{eq}}-N_{\mathrm{coef}})/N_{\mathrm{eq}}>0$, where $N_{\mathrm{eq}}$ counts the independent residual equations after the symmetry quotient and $N_{\mathrm{coef}}$ counts the fitted coefficients, and the same branch identity must survive the refinement checks in [Convergence Tests](convergence-tests.md).

Such a revision is a candidate coordinate description, not an evolved history. A hidden fit split, inadequate degrees of freedom, or failure on held-out residuals leaves the compact-coordinate no-go unresolved. Even a revision satisfying these checks still requires corrected one-period residuals, quotient-row identity, monodromy or $\Delta_{\mathbf{k}}$, and $\eta$-ladder persistence with the same branch identity.

Tier 1 passes only if the same branch remains stable before any $\eta\to0^+$ extrapolation. A Tier 1 pass establishes a finite-$\eta$ periodic candidate that satisfies the acceleration law within tolerance and carries a positive numerical Floquet gap; certified attractor status additionally requires the existence enclosure and full-operator bound named above.

### Corrected One-Period Branch-Equation Boundary

The proposed compact fold-layer-locked configuration is a negative control, not an established attractor or a broad falsification of possible $A_0$ branches. Preserving locked self-root contributions in $\mathcal{R}_{\text{lock}}$ is insufficient if state return, root closure, phase closure, speed ordering, center drift, or energy closure fails. No numerical residual result is reported for this control. A corrected calculation must declare either a non-circular carrier correction $\mathbf D_{a,\ell}(T)$ or a richer branch-native interaction basis before residual fitting.

For a declared period window $W=[T_0,T_0+P_{\mathbf{k}}]$, the corrected carrier has the form
$$
\mathbf X_{a,\ell}^{\star}(T)
=
\mathbf X_{a,\ell}^{(0)}(T)+\mathbf D_{a,\ell}(T),
\qquad
\mathbf D_{a,\ell}(T+P_{\mathbf{k}})=\mathbf D_{a,\ell}(T),
\qquad
\left\langle\mathbf D_{a,\ell}\right\rangle_W=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ed6d2de7bf72ebb0)

Here $T_0$ is the chosen absolute-time origin of the window, $P_{\mathbf{k}}$ is the declared return period indexed by the winding vector $\mathbf k$, $\mathbf X_{a,\ell}^{(0)}(T)$ is the uncorrected circular carrier of member $a$ of binary $\ell$, and $\mathbf D_{a,\ell}(T)$ is a periodic correction with zero mean over the window, so that a constant offset is left to the center gauge rather than duplicated in the correction. The correction carries the member index as well as the binary index: a correction shared by both members of a binary only translates that binary, leaving the separation $\mathbf X_{+,\ell}-\mathbf X_{-,\ell}$ and hence the relative orbit circular, so it cannot serve as a non-circular carrier correction.

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

with $\mathbf D_{a,\ell}(T)$, the basis terms $\mathbf A_{a,B}$, the coefficient rule for $\alpha_B$, and any held-out interval declared before fitting. In the residual, $a$ runs over the six architrinos, $\mathbf A^{\mathrm{ME}}_a(T;\mathbf D)$ is the Master Equation acceleration of architrino $a$ evaluated on the corrected carrier with the causal roots solved on that carrier, $\mathbf A_{a,B}(T;\mathbf D)$ are the declared basis terms for the self-hit, partner-hit, and inter-binary channels, $\alpha_B$ are their scalar coefficients under the predeclared rule, the norm is the Euclidean norm on $\Sigma_T$, and $\varepsilon_0$ is a predeclared positive floor with the units of the denominator that keeps the ratio finite. The residual therefore tests whether the declared basis represents the Master Equation acceleration on the corrected carrier over one period; it does not by itself test whether the carrier satisfies the Master Equation. That acceleration-balance residual, the mismatch between the carrier's kinematic acceleration $d^2\mathbf X_{a,\ell}^{\star}/dT^2$ and $\mathbf A^{\mathrm{ME}}_a$ over the same window within its declared tolerance, must also pass before the rerun proceeds to monodromy, $\Delta_{\mathbf{k}}$, or $\eta$-ladder persistence, as [Well-posedness and Regularization](action-energy/well-posedness-and-regularization.md) requires. A scalar-basis no-go is therefore a chart or basis failure. It becomes a no-go for the declared search class only when every admissible corrected carrier and branch-native basis inside that class fails the same residual boundary, and even then the negative applies to the tested class and domain rather than to every $A_0$ candidate.

## Tier 2: Energy and Shielding

Tier 2 begins only after Tier 1 passes. It computes the internal-energy ledger and far-field shielding extraction described in [Energy](../../dynamics/energy.md). The required outputs are:

- $E_1$, $E_2$, $E_3$, and $E_{\text{internal}}(A_0)$;
- interaction and wake/history bookkeeping with no double counting;
- far-field wake coefficients $\mathcal{L}(\hat{\mathbf{R}})$ over extraction radii and angular grids;
- the naive constituent sum $\mathcal{L}_{\text{naive}}$ and the leading isotropic projection $\Pi_0\mathcal{L}$, where the reference norm $\|\mathcal{L}_{\text{naive}}\|$ is the sum of the norms of the individual unshielded constituent contributions in the same basis, not their signed sum, which vanishes for a neutral assembly and would leave $\zeta(A_0)$ undefined;
- $\zeta(A_0)$ from the leading isotropic projection;
- anisotropic leakage $\mathcal{L}_{\text{aniso}}=(1-\Pi_0)\mathcal{L}$ retained as a separate tensor or channel list;
- convergence status under extraction radius, angular resolution, $\Delta T$, history-window, and $\eta$ refinement.

Tier 2 fails if particle masses, charged-lepton ratios, electron radius, or the measured fine-structure constant $\alpha$ enter as inputs.

## Tier 3: Medium-Response Probe

Tier 3 begins only after Tier 2 passes. It applies small acceleration and gradient probes to the accepted branch and extracts the homogeneous baseline for $\mathcal{M}_{\text{sea}}^{ab}$. The probe must report whether the acceleration and gradient channels share the same shielded-energy coefficient to first order, which is the recovery target corresponding to the observer-level equality of inertial and gravitational response, and it must report response anisotropy separately from both $\mathcal{A}_{\mathrm{gv}}^{ij}$ and $\mathcal{L}_{\text{aniso}}$.

## Acceptance Boundary

The $A_0$ branch is not an attractor until Tier 1 passes. It is not a mass-map result until Tier 2 passes. It is not an inertial-response result until Tier 3 passes. A reported group-velocity anisotropy tensor is a deformation diagnostic, not a shielding extraction and not a substitute for the Noether sea response probe.
