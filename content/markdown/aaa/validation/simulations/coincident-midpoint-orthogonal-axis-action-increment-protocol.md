# Coincident-Midpoint Orthogonal-Axis Action-Increment Protocol

This protocol defines the simulation-facing test for deriving or falsifying the one-cycle action increment used by the quantum closure program. The action increment is the smallest amount of angular momentum, counted in radian-normalized action units, that an assembly transacts with its surroundings in one accepted change of branch. The candidate assembly is a [Noether braid](../../noether-braid/noether-braid.md), six architrinos bound in three neutral binaries, in its coincident-midpoint orthogonal-axis member, where the three binary midpoints coincide and the binary axes are mutually orthogonal at the near-rest endpoint. It specializes [Simulation Run Protocols](run-protocols.md) and [Convergence Tests](convergence-tests.md) to the question left open by [Coincident-Midpoint Orthogonal-Axis Braid Dynamics](../../noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md#zero-axial-offset-three-binary-dynamics-and-interpretation), [Three-Binary 4:2:1 Frequency Lock](../../noether-braid/three-binary-4-2-1-frequency-lock.md), [Angular Momentum and Spin](../../philosophy-history/theory-bridges/angular-momentum-and-spin.md), and [Mapping the Planck Scale](../../philosophy-history/theory-bridges/mapping-planck-scale-to-coincident-midpoint-orthogonal-axis-geometry.md).

Here a coincident-midpoint orthogonal-axis braid candidate must carry the complete prescribed coordinate ownership: persistent indices $a\in\{1,2,3\}$, independently assignable positive radii and frequencies, mutually orthogonal axes at the orthogonal-axis three-binary near-rest endpoint, axes converging toward the group-translation direction as the prescribed flattening coordinate $\lambda_A$ increases, axial half-separations fixed at zero ($h_a=0$, so each transverse orbit radius equals its endpoint radius, $\rho_a=R_a$), and explicit transverse-orbit-radius, phase, and circulation rows, as fixed in [Braid Taxonomy](../../noether-braid/braid-taxonomy.md#coordinate-constraints-used-by-worked-configurations); a nonzero axial half-separation belongs to the distinct axially separated member. Coincident-midpoint orthogonal-axis 4:2:1 braid additionally requires $f_1:f_2:f_3=4:2:1$. Neither label supplies stability, retention, or a universal action increment; failure of the same evolved record to preserve the coordinate and ledger rows rejects the candidate.

The target is narrow. The run must compute the smallest accepted Master-Equation projected action increment from candidate coincident-midpoint orthogonal-axis braid branch transitions whose stability rows pass. It may compare the resulting scale to the observer-level $h,\hbar$ benchmark after the computation. It may not insert $\hbar$ as an input step size.

## Closure Question

The action-angle bridge in [Angular Momentum and Spin](../../philosophy-history/theory-bridges/angular-momentum-and-spin.md#the-h-and-hbar-convention) states the conditional theorem target:
$$
\Delta I_i=\hbar
\quad\Longrightarrow\quad
\Delta\Gamma_{\text{cell}}=h^n
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6c4b509a949c3341)

for $n$ record-facing action-angle channels. This protocol tests the missing premise. It asks whether accepted coincident-midpoint orthogonal-axis braid dynamics select a positive increment $\Delta I_*$ such that
$$
h_{\mathbb{A}\mathbb{A}\mathbb{A}}=2\pi\Delta I_*
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c08fff78900e1809)

matches the observer-level Planck constant benchmark. Here $h_{\mathbb{A}\mathbb{A}\mathbb{A}}$ is the candidate closed-cycle action unit that the braid chapters write as $h_{\mathrm{act}}$, and the factor $2\pi$ converts a radian-normalized action increment into a closed-cycle action under the $h$ and $\hbar$ convention. [Effective Lagrangian](../../dynamics/effective-lagrangian.md) states the same boundary from the action side: an integer action condition is a conditional recovery target on a retained phase-locked bundle, not a derived quantization law, so a positive increment established here would supply the missing premise rather than presuppose it.

Passing this protocol would not complete quantum theory. It would only promote the action-increment step from bookkeeping convention to candidate derived output.

## Accepted Transition Class

Let $B_q$ and $B_{q'}$ denote candidate coincident-midpoint orthogonal-axis braid branch states with passed stability rows, indexed binary radii, frequencies, speeds, plane normals, an active [causal-root](../../foundations/architrino.md) ledger identifying the earlier emissions that reach each receiver, and a wake ledger. A candidate accepted transition belongs to

$$
\mathcal{T}_{\mathrm{acc}}=\varnothing
$$

[View →](../../../../../equation-mapping.html#corpus-equation-affbf38439b59823)

unless both endpoint packets first satisfy branch-certificate eligibility: matching ledger identity, matching active-root convention, positive Jacobian floors, positive transmitter-side acceleration-weight floors or certified intervals, declared inactive-root or tail status, a return-map and acceleration-residual record showing that each endpoint is a retained solution of the delayed dynamics on its own record rather than a prescribed configuration, $\Delta_{\mathbf{k}}>0$ computed about that retained solution, conservation pullback on the same rows, and refinement records sufficient to keep the endpoint status stable. The order matters: a stability spectrum is defined by linearizing the one-period return map about a cycle the dynamics actually occupies, so a Floquet gap computed about a prescribed configuration that does not close under the delayed dynamics has no referent, at any sign or magnitude. Before that eligibility is supplied, a run may report diagnostics or rejected endpoint packets, but it may not promote `candidate_action_increment` or `candidate_h_recovery`.

When endpoint eligibility has been established, the accepted transition class is

$$
\mathcal{T}_{\mathrm{acc}}
=
\left\{
B_q\to B_{q'}:
\Delta_{\mathbf{k}}>0,\ 
\mathcal{R}_{\mathrm{phase}}\le\tau_{\mathrm{phase}},\ 
\mathcal{R}_{E}\le\tau_E,\ 
\mathcal{R}_{P}\le\tau_P,\ 
\mathcal{R}_{J}\le\tau_J,\ 
\Delta N_{\mathrm{self}}\in2\mathbb{Z},\ 
\mathcal{R}_{\mathrm{root}}\le\tau_{\mathrm{root}}
\right\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f12757a4496ccae3)

In this set, $\mathcal{R}_{\mathrm{phase}}$ is the layer and inter-layer phase-closure residual, $\mathcal{R}_{E}$, $\mathcal{R}_{P}$, and $\mathcal{R}_{J}$ are the energy, momentum, and angular-momentum pullback residuals defined below, $\mathcal{R}_{\mathrm{root}}$ is the active-root residual, the change in causal-root identity and count under refinement, $\Delta_{\mathbf{k}}$ is the non-symmetry Floquet gap defined below, and $\Delta N_{\mathrm{self}}$ is the net change in the active self-root count between the two endpoint records. This accepted class is restricted to transition charts certified free of retained-memory boundary crossings, coincidence births, exclusion-boundary crossings, and higher degeneracies. Every root-count change needs its own generic interior-fold certificate, including the opposite signs of the paired generators, under the $\Delta N=\pm2$ fold law of the [Master Equation](../../dynamics/master-equation.md#caustic-transit-and-finite-impulse). Endpoint parity is only a necessary screen for that class: an even net count also permits two unrelated boundary exits and therefore does not certify a fold. An odd net change identifies a failure of the declared fold-only chart, not its cause; retained-memory exits, coincidence events, and other excluded strata require separate attribution and treatment before the accepted class can be extended. The tolerances $\tau_{\mathrm{phase}}$, $\tau_E$, $\tau_P$, $\tau_J$, and $\tau_{\mathrm{root}}$ must be declared before the run. The transition is not accepted merely because it improves a fit to $h$: only stable branch changes with accounted conservation and causal roots contribute to the action increment.

## Master-Equation Increment

For each candidate transition, compute acceleration moments and the wake boundary term directly from the delayed dynamics. Let $\mathbf X_C(T)$ be the equal-weight centroid of the six constituent sites, $\mathbf X_C=\tfrac16\sum_i\mathbf X_i$; the weights are equal because architrinos carry no mass and the bookkeeping constant introduced below is universal, and on the prescribed coincident-midpoint configuration this centroid is the common binary midpoint. For persistent binary index $a\in\{1,2,3\}$, let $\mathcal B_a$ be its constituent set and define the specific acceleration moment
$$
\boldsymbol{\tau}^{(A)}_a(T)
=
\sum_{i\in\mathcal B_a}
\big(\mathbf X_i(T)-\mathbf X_C(T)\big)
\times
\mathbf A_i(T),
$$

[View →](../../../../../equation-mapping.html#corpus-equation-07210d95933edafb)

which has the units of acceleration times length, the units of specific torque. Because the centroid velocity is the mean constituent velocity, the term $-\mathbf V_C\times\sum_i\mathbf V_i$ that a moving reference point would add vanishes, and the sum of the three moments over $a$ is exactly the rate of change of the specific angular momentum $\sum_i(\mathbf X_i-\mathbf X_C)\times\mathbf V_i$ of the six constituents about the centroid; the term also vanishes for any reference-point velocity parallel to the summed constituent velocity, so the centroid is a sufficient choice rather than the unique one. The index carries no radius order. With transaction axis $\hat{\mathbf n}_{\mathrm{txn}}$, the unit vector along which the transacted angular momentum is projected, declared before the run in `state_vectors.json`, and transition window $[T_i,T_f]$ in absolute time, the action-unit increment is
$$
\Delta I_{\mathrm{ME}}
=
\mu_{\text{arch}}\,
\hat{\mathbf n}_{\mathrm{txn}}\cdot
\left(
\sum_{a\in\{1,2,3\}}
\int_{T_i}^{T_f}\boldsymbol{\tau}^{(A)}_a(T)\,dT
+
\Delta\mathbf L_{\mathrm{wake},\partial}^{\mathrm{spec}}
\right).
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1afa3c3d67c9e6b8)

Here $\Delta\mathbf L_{\mathrm{wake},\partial}^{\mathrm{spec}}$ is the change over the same window, the value at $T_f$ minus the value at $T_i$, in the specific angular momentum carried in flight by emitted wake surfaces that have crossed the declared braid boundary and have not yet been received. For this projection both wake endpoints are expressed about the same moving centroid as the mechanical term. If the wake charge is supplied about a fixed origin $O$, convert it at each endpoint by $\mathbf L_{\mathrm{wake},C}^{\mathrm{spec}}=\mathbf J_{\mathrm{wake},O}/\mu_{\text{arch}}-\mathbf X_C\times\mathbf P_{\mathrm{wake}}/\mu_{\text{arch}}$, using the wake momentum of the same boundary account. The centroid increment is a projection diagnostic, distinct from fixed-origin total conservation below. The superscript marks a quantity per unit of the bookkeeping constant, so both terms in the bracket are specific angular momenta and the product with $\mu_{\text{arch}}$ has action units. The universal $\mu_{\text{arch}}$ is an action/energy bookkeeping conversion only; it is not primitive architrino mass.

The packet must declare $\mu_{\text{arch}}$ in `campaign.json`, record units for every action and acceleration-moment column, and keep that normalization fixed across all candidate and control transitions. It must also be fixed independently of the benchmark. Dimensional analysis fixes what the run itself can derive: the specific increment has the units of $\kappa\epsilon^2/c_f$, where $\kappa$ is the universal coupling and $\epsilon$ the polarity-unit magnitude of the Master Equation, so $\Delta I_*^{\mathrm{spec}}=N_*\,\kappa\epsilon^2/c_f$ for a pure number $N_*$ set by the branch geometry, and in normalized wake-speed units with $c_f=1$ the run's derived output is $N_*=\Delta I_*^{\mathrm{spec}}/(\kappa\epsilon^2)$. The benchmark comparison then needs the conversion $\mu_{\text{arch}}\kappa\epsilon^2/c_f$ in observer action units from an independent calibration, such as the mass map or the [SI base-unit map](../architrino-si-base-units.md); choosing $\mu_{\text{arch}}$ or the unit map to make $\delta_h$ small is benchmark contamination, not recovery. A packet that omits the conversion may report $N_*$ as a specific-action diagnostic, but it may not evaluate $\delta_h$ or promote `candidate_h_recovery`.

## Branch-Chart Conservation Pullback

The projected action increment is a diagnostic until one accepted action or independently derived causal-wake update supplies the motion and all three conserved accounts on the same live-ledger branch chart. For each accepted transition, report
$$
\mathcal{E}_{\mathrm{tot}}^{(\eta)}
=
K_{\mu}+E_{\mathrm{wake}}^{(\eta)},
\qquad
\boldsymbol{\mathcal{P}}_{\mathrm{tot}}^{(\eta)}
=
\mathbf{P}_{\mathrm{mech}}+\mathbf{P}_{\mathrm{wake}}^{(\eta)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-dfa6dd9138d96765)

$$
\boldsymbol{\mathcal{J}}_{\mathrm{tot}}^{(\eta)}
=
\mathbf{J}_{\mathrm{mech}}+\mathbf{J}_{\mathrm{wake}}^{(\eta)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-06c4d8a4e74d35da)

Here $K_{\mu}=\sum_i\tfrac12\mu_{\text{arch}}\|\mathbf V_i\|^2$ is the quadratic kinetic bookkeeping proxy, $E_{\mathrm{wake}}^{(\eta)}$ is the candidate in-flight wake interaction term evaluated at causal-surface mollifier width $\eta$, $\mathbf{P}_{\mathrm{mech}}=\mu_{\text{arch}}\sum_i\mathbf V_i$ and $\mathbf{J}_{\mathrm{mech}}=\mu_{\text{arch}}\sum_i\mathbf X_i\times\mathbf V_i$ are the mechanical momentum and angular momentum on the same bookkeeping convention, with angular momentum about the fixed Cartesian origin $O$. The wake angular momentum uses that same fixed origin, and the other wake entries are the corresponding in-flight terms; the candidate energy charge and its finite-window balance are stated in the [Master Equation](../../dynamics/master-equation.md#action-level-wake-energy-functional-at-a-time-boundary). The residuals $\mathcal{R}_{E}$, $\mathcal{R}_{P}$, and $\mathcal{R}_{J}$ are the normalized window changes of these three totals after subtracting the window integrals of the acceleration-residual terms, $\sum_i\mu_{\text{arch}}\mathbf V_i\cdot\mathbf R_{A,i}^{(\eta)}$, $\sum_i\mu_{\text{arch}}\mathbf R_{A,i}^{(\eta)}$, and $\sum_i\mu_{\text{arch}}\mathbf X_i\times\mathbf R_{A,i}^{(\eta)}$ about the fixed origin $O$, where $\mathbf R_{A,i}^{(\eta)}$ is the acceleration residual between the Master Equation acceleration and the acceleration the candidate action generates, and the endpoint-leakage flux through the window boundary. An Euler residual, the interior coefficient of an action variation, is a different object and may not be substituted for these terms without a derived conversion. The subtracted residual terms are reported beside the totals; when they are not small on the branch rows, the candidate action does not generate the motion and the pullback remains a diagnostic. They must use the same branch rows as the root ledger, acceleration residual, and $\Delta I_{\mathrm{ME}}$ calculation. The centroid projection above is a separate quantity: transforming the full charge gives $\mathbf J_C=\mathbf J_O-\mathbf X_C\times\mathbf P_{\mathrm{tot}}$, whose derivative also contains $-\mathbf V_C\times\mathbf P_{\mathrm{tot}}$. Only the mechanical part of that transport term cancels by the equal-weight centroid identity; the wake part need not vanish and is not automatically endpoint leakage. The conservation residual here therefore remains at fixed $O$. A work-integral energy reconstruction or torque projection may be reported as a diagnostic, but it does not replace the exact wake-history pullback.

The candidate increment floor is
$$
\Delta I_*
=
\inf_{B_q\to B_{q'}\in\mathcal{T}_{\mathrm{acc}}}
\left|\Delta I_{\mathrm{ME}}(B_q\to B_{q'})\right|
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c6b35efac3472013)

with required positivity condition
$$
0<\Delta I_*<\infty
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4d2f12a6478c55c2)

A finite nonempty set of nonzero increments has a positive minimum equal to its infimum; that sample does not establish the infimum of the full accepted class. Enlargement and refinement must distinguish a positive limiting floor from an unresolved lower bound or arbitrarily small increments. A decreasing sample minimum is not itself failure: the sequence $1+1/n$ decreases to the positive infimum $1$. The failure `no-positive-increment-floor` requires evidence for arbitrarily small nonzero accepted increments. A candidate positive floor requires controlled enlargement and refinement evidence, with the covered family and uncertainty stated; a full-class positivity claim additionally requires a justified positive lower bound.

The benchmark comparison is
$$
\delta_h
=
\left|
\frac{2\pi\Delta I_*-h}{h}
\right|
$$

[View →](../../../../../equation-mapping.html#corpus-equation-07388e8aaacd6745)

## Cluster and Stability Residuals

Because a single transition can be a numerical accident, the packet must scan a family of branch transitions with passed stability rows. For a selected class $\mathcal{C}\subset\mathcal{T}_{\mathrm{acc}}$, report
$$
\delta_I(\mathcal{C})
=
\frac{
\operatorname{std}_{\mathcal{C}}\!\left(\Delta I_{\mathrm{ME}}\right)
}{
\left|\operatorname{mean}_{\mathcal{C}}\!\left(\Delta I_{\mathrm{ME}}\right)\right|
+\varepsilon_I
},
$$

[View →](../../../../../equation-mapping.html#corpus-equation-796980e1e5662ff5)

Here $\varepsilon_I$ is a predeclared action-increment floor with the same units as $\Delta I_{\mathrm{ME}}$. Also report the non-symmetry Floquet gap
$$
\Delta_{\mathbf{k}}
=
1-\max_{i\notin G}\|\mu_i(\mathbf{k})\|
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e1bb97ae077631e6)

for each endpoint branch and each transition continuation. Here $\mu_i(\mathbf{k})$ are the Floquet multipliers, the eigenvalues of the linearized one-period return map of the retained cycle with winding label $\mathbf{k}$, with the treatment of the state-dependent delay derivative in the variational operator stated in `floquet_report.json`; $G$ indexes the neutral symmetry modes (time translation, spatial translation, rotation, and phase shift) excluded from the maximum; and the double bars denote the modulus of a multiplier. A positive gap means every non-symmetry multiplier lies inside the unit circle, which establishes linear attraction of the retained cycle and not the size of its basin. The gap is defined only for an endpoint that the return-map and acceleration-residual record has shown to be a retained solution; the same order of checks governs the Tier 1 continuation of the [$A_0$ Branch Certificate Protocol](a0-branch-certificate-protocol.md) and the [stability constraint](../../assemblies/particle-masses.md#stability-constraint) of Particle Masses.

The action-increment claim is numerically meaningful only when $\delta_I$ is small, $\Delta_{\mathbf{k}}>0$, and the phase, energy, and root residuals remain below their predeclared tolerances across refinement.

## Field-Speed Approach Scan

The campaign must include an approach-to-$c_f$ diagnostic on the same branch rows used for the action-increment calculation. This is not a new gate. It is the root-and-action stress test that prevents a stable-looking increment from being promoted when the branch survives only by numerical accident near the field-speed boundary.

This scan is the minimal numerical artifact for the paired action-spacing and self-hit well-posedness walls: it measures whether causal-root multiplicity, Jacobian floors, and stable-cycle action increments remain controlled as branch speed approaches $c_f$.

For each declared scan family, report rows approaching the field speed from below, at the boundary when the continuation reaches it, and from above when the branch chart admits a super-field-speed interval. Each row must record the layer speed ratios, active partner-root count, active self-root count, active inter-layer-root count, minimum accepted Jacobian floor, minimum accepted transmitter-side acceleration weight, separator status, root-ledger identity, accepted/rejected status, and stable-cycle $\Delta I_{\mathrm{ME}}$ cluster assignment.

The scan has a simple discipline. A packet may not promote `candidate_h_recovery` if the accepted near-boundary rows lose their Jacobian floor, change active-root identity under refinement, or split into non-uniform stable action increments without a derived branch-class reason. In that case the packet may still report a useful diagnostic, but it has not recovered the Planck benchmark from a well-posed coincident-midpoint orthogonal-axis braid action scale.

## Required Packet Files

The minimum campaign packet contains the files below. In their rows, $\eta$ is the causal-surface mollifier width, $\epsilon_c$ is the coincidence-core regularization scale, and $\nu_J$ is the transmitter-side Jacobian floor, each with the meaning fixed in the [Master Equation](../../dynamics/master-equation.md).

| File | Required contents |
| --- | --- |
| `campaign.json` | source commit, protocol version, run ids, integrator, tolerances, declared benchmark policy, the independent calibration behind $\mu_{\text{arch}}$ and the unit map, and whether $h$ and $\hbar$ entered only after the Master-Equation increment was computed |
| `branch_pairs.csv` | each $B_q\to B_{q'}$ row, branch labels, integer windings, inter-layer closure integers, transition window, and inclusion/exclusion status |
| `state_vectors.json` | pre/post layer radii, frequencies, speeds, plane normals, phase offsets, source channel, transaction axis, fixed-origin mechanical endpoint charges, and centroid positions at both cuts |
| `root_ledger_before_after.json` | partner, self, and inter-layer roots before and after transition, with delays, action-level $g$, $u$, Jacobians, separator flags, $\Delta N_{\mathrm{self}}$, and event-level fold certificates with the declared boundary exclusions along the transition |
| `torque_integrals.csv` | diagnostic $\int\boldsymbol{\tau}^{(A)}_1\,dT$, $\int\boldsymbol{\tau}^{(A)}_2\,dT$, $\int\boldsymbol{\tau}^{(A)}_3\,dT$, $\Delta\mathbf L_{\mathrm{wake},\partial}^{\mathrm{spec}}$, and projection onto $\hat{\mathbf n}_{\mathrm{txn}}$ |
| `action_increment_rows.csv` | $\Delta I_{\mathrm{ME}}$, absolute value, cluster id, accepted/rejected status, and failure code |
| `field_speed_approach_scan.csv` | scan-family id, speed-window label, layer speed ratios, active partner/self/inter-layer root counts, minimum accepted $|J|$, separator status, root-ledger stability, $\Delta I_{\mathrm{ME}}$, cluster id, accepted/rejected status, and failure code |
| `energy_ledger.csv` | $\sum_{a\in\{1,2,3\}}\int\omega_a\,dI_a$, $\Delta E_{\mathrm{wake}}$, $\Delta E_{\mathrm{coupl}}$, accepted $E_{\mathrm{wake}}^{(\eta)}$ when available, diagnostic $U$ if used, and $\mathcal{R}_E$ |
| `conservation_pullback.csv` | branch-chart id, fixed origin, cut/window id, $\eta$, $\epsilon_c$, `history_horizon`, endpoint convention, $\nu_J$, inactive-gap minimum, `memory_depth`, $K_{\mu}$, $E_{\mathrm{wake}}^{(\eta)}$, $\mathbf{P}_{\mathrm{mech}}$, $\mathbf{P}_{\mathrm{wake}}^{(\eta)}$, $\mathbf{J}_{\mathrm{mech}}$, $\mathbf{J}_{\mathrm{wake}}^{(\eta)}$, $\mathcal{R}_E$, $\mathcal{R}_P$, $\mathcal{R}_J$, provenance of the accepted motion-plus-wake update, and verdict. The two history fields carry absolute-time durations and are distinct from the observer-level Planck benchmark $h$. |
| `phase_closure_residuals.csv` | layer and inter-layer phase closure residuals, winding labels, and tolerance status |
| `floquet_report.json` | monodromy or finite-difference return map, excluded symmetry modes, multipliers, and $\Delta_{\mathbf{k}}$ |
| `cluster_summary.json` | $\Delta I_*$, class means, class standard deviations, $\delta_I$, $h_{\mathbb{A}\mathbb{A}\mathbb{A}}$, $\delta_h$, and promotion status |
| `convergence_table.csv` | the convergence rows required by [Convergence Tests](convergence-tests.md), including active-root mismatch and stability-window shift |
| `negative_control_report.md` | null runs and the invariant, provenance, or stability channel they break |
| `promotion_gate.md` | final pass/fail statement and the strongest claim the packet authorizes |

## Promotion Gates

A packet may promote `candidate_action_increment` only if all of the following pass:

1. $h$ and $\hbar$ are absent from the simulated equations of motion, the accepted-transition selection, and the calibration of $\mu_{\text{arch}}$ and the unit map, except as post-run benchmark labels.
2. Both endpoint packets satisfy branch-certificate eligibility, including return-map and acceleration-residual closure, on matching ledger identity and active-root convention.
3. At least one declared transition class has a positive finite candidate floor supported by controlled family enlargement and refinement, with uncertainty and coverage reported as above; a full-class $0<\Delta I_*<\infty$ claim requires its positive lower-bound argument.
4. Endpoint branches and transition continuations have $\Delta_{\mathbf{k}}>0$ after symmetry modes are removed.
5. Phase closure, root residuals, energy residuals, momentum residuals, and angular-momentum residuals pass the predeclared tolerances.
6. $\delta_I$ is below the predeclared cluster tolerance.
7. The temporal, history-resolution, spatial, cross-integrator, and negative-control checks from [Convergence Tests](convergence-tests.md) pass.
8. The packet reports $\delta_h$ honestly, whether or not the benchmark match is good.

Only a packet that also has small $\delta_h$ may promote `candidate_h_recovery`. A packet with a positive and stable $\Delta I_*$ but poor $\delta_h$ promotes only a derived action increment that does not recover the measured Planck benchmark.

## Failure-Code Enum

| Code | Trigger |
| --- | --- |
| `input-hbar-contamination` | the run seeded transition size, branch selection, or tolerances from $\hbar$ before computing $\Delta I_{\mathrm{ME}}$, or fixed $\mu_{\text{arch}}$ or the unit map from $h$ |
| `no-positive-increment-floor` | accepted transitions accumulate arbitrarily small nonzero $\Delta I_{\mathrm{ME}}$ |
| `multi-cluster-action-scale` | multiple stable increment clusters appear with no derived reason to choose one |
| `nonpositive-floquet-gap` | an endpoint branch or transition continuation has $\Delta_{\mathbf{k}}\le0$ |
| `phase-closure-open` | layer or inter-layer closure residuals exceed tolerance |
| `root-ledger-instability` | active roots change under refinement, the self-hit parity condition fails, or an event lacks the required generic-fold and boundary-exclusion certificates |
| `jacobian-floor-loss` | accepted near-boundary records lose the declared minimum Jacobian floor |
| `transmitter-acceleration-weight-loss` | accepted records lose the declared transmitter-side acceleration-weight floor or leave its certified interval because $D_t$ is uncertified, approaches a pole, or changes sign under refinement |
| `field-speed-root-instability` | the approach-to-$c_f$ scan changes active-root identity, separator status, or branch status under refinement |
| `nonuniform-action-spacing` | stable-cycle action increments split across the field-speed approach scan with no derived branch-class reason |
| `energy-ledger-open` | $\mathcal{R}_E$ exceeds tolerance or the wake/root energy channel is unaccounted |
| `conservation-pullback-open` | $\mathcal{R}_P$ or $\mathcal{R}_J$ exceeds tolerance, or the exact Noether pullback uses different rows than the root ledger or acceleration residual |
| `convergence-fail` | required convergence or cross-integrator gates fail |
| `negative-control-fail` | the intentionally wrong model still passes the packet gates |
| `benchmark-mismatch` | $h_{\mathbb{A}\mathbb{A}\mathbb{A}}$ is stable but fails the declared $h$ benchmark tolerance |

## Interpretation

This protocol preserves the level distinction. A passing action-increment packet would support the action-cell step used by [Wavefunction Ontology](../../quantum/wavefunction-ontology.md#lower-bound-on-recordable-basin-measure). It would not by itself derive the Born rule, spin statistics, Bell correlations, photon polarization, or observer-level orbital quantum numbers. Those remain downstream closure targets.
