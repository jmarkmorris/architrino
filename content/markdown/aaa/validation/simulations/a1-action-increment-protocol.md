# A1 Action-Increment Protocol

This protocol defines the simulation-facing test for deriving or falsifying the one-cycle action increment used by the quantum closure program. It specializes [Simulation Run Protocols](run-protocols.md) and [Convergence Tests](convergence-tests.md) to the question left open by [A1 Dynamics](../../noether-braid/braid-a1-dynamics.md#a1-dynamics), [A3.3 Doubling-Frequency Resonance Lock](../../noether-braid/braid-a3-3-doubling-frequency-lock.md), [Angular Momentum and Spin](../../philosophy-history/theory-bridges/angular-momentum-and-spin.md), and [Mapping the Planck Scale](../../philosophy-history/theory-bridges/mapping-planck-scale-a1-geometry.md).

Here an A1 candidate must carry the complete prescribed coordinate ownership: persistent indices $a\in\{1,2,3\}$, independently assignable positive radii and frequencies, mutually orthogonal axes at the Family-A near-rest endpoint, axes converging toward the group-translation direction along $\lambda_A$, and explicit axial-half-separation, transverse-orbit-radius, phase, and circulation rows. A1.3 additionally requires $f_1:f_2:f_3=4:2:1$. Neither label supplies stability, retention, or a universal action increment; failure of the same evolved record to preserve the coordinate and ledger rows rejects the candidate.

The target is narrow. The run must compute the smallest accepted Master-Equation projected action increment from candidate A1 branch transitions whose stability rows pass. It may compare the resulting scale to the observer-level $h,\hbar$ benchmark after the computation. It may not insert $\hbar$ as an input step size.

## Closure Question

The action-angle bridge in [Angular Momentum and Spin](../../philosophy-history/theory-bridges/angular-momentum-and-spin.md#the-h-and-hbar-convention) states the conditional theorem target:
$$
\Delta I_i=\hbar
\quad\Longrightarrow\quad
\Delta\Gamma_{\text{cell}}=h^n
$$
for $n$ record-facing action-angle channels. This protocol tests the missing premise. It asks whether accepted A1 dynamics select a positive increment $\Delta I_*$ such that
$$
h_{\mathbb{A}\mathbb{A}\mathbb{A}}=2\pi\Delta I_*
$$
matches the observer-level Planck constant benchmark.

Passing this protocol would not complete quantum theory. It would only promote the action-increment step from bookkeeping convention to candidate derived output.

## Accepted Transition Class

Let $B_q$ and $B_{q'}$ denote candidate A1 branch states with passed stability rows, indexed binary radii, frequencies, speeds, plane normals, active causal-root ledger, and wake ledger. A candidate accepted transition belongs to

$$
\mathcal{T}_{\mathrm{acc}}=\varnothing
$$

unless both endpoint packets first satisfy branch-certificate eligibility: matching ledger identity, matching active-root convention, positive Jacobian floors, positive transmitter-side acceleration-weight floors or certified intervals, declared inactive-root or tail status, $\Delta_{\mathbf{k}}>0$, conservation pullback on the same rows, and refinement records sufficient to keep the endpoint status stable. Before that eligibility is supplied, a run may report diagnostics or rejected endpoint packets, but it may not promote `candidate_action_increment` or `candidate_h_recovery`.

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
The tolerances $\tau_{\mathrm{phase}}$, $\tau_E$, $\tau_P$, $\tau_J$, and $\tau_{\mathrm{root}}$ must be declared before the run. The transition is not accepted merely because it improves a fit to `$h$`.

Plain language: only stable, conservation-accounted, root-accounted branch changes are allowed to vote on the action increment.

## Master-Equation Increment

For each candidate transition, compute acceleration moments and the wake boundary term directly from the delayed dynamics. For persistent binary index $a\in\{1,2,3\}$, let $\mathcal B_a$ be its constituent set and define the specific acceleration moment
$$
\boldsymbol{\tau}^{(A)}_a(T)
=
\sum_{i\in\mathcal B_a}
\big(\mathbf X_i(T)-\mathbf X_C(T)\big)
\times
\mathbf A_i(T),
$$
which has units of specific torque. The index carries no radius order. With transaction axis $\hat{\mathbf n}_{\mathrm{txn}}$, the action-unit increment is
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
Here $\Delta\mathbf L_{\mathrm{wake},\partial}^{\mathrm{spec}}$ is the specific angular momentum still carried across the chosen braid boundary at the end of the transition window. The universal $\mu_{\text{arch}}$ is an action/energy bookkeeping conversion only; it is not primitive architrino mass.

The packet must declare $\mu_{\text{arch}}$ in `campaign.json`, record units for every action and acceleration-moment column, and keep that normalization fixed across all candidate and control transitions. A packet that omits the conversion may report a specific-action diagnostic, but it may not evaluate $\delta_h$ or promote `candidate_h_recovery`.

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
$$
\boldsymbol{\mathcal{J}}_{\mathrm{tot}}^{(\eta)}
=
\mathbf{J}_{\mathrm{mech}}+\mathbf{J}_{\mathrm{wake}}^{(\eta)}
$$
The residuals $\mathcal{R}_{E}$, $\mathcal{R}_{P}$, and $\mathcal{R}_{J}$ are the normalized window changes of these three totals after subtracting the declared Euler-residual and endpoint-leakage terms. They must use the same branch rows as the root ledger, acceleration residual, and $\Delta I_{\mathrm{ME}}$ calculation. A work-integral energy reconstruction or torque projection may be reported as a diagnostic, but it does not replace the exact wake-history pullback.

The candidate increment floor is
$$
\Delta I_*
=
\inf_{B_q\to B_{q'}\in\mathcal{T}_{\mathrm{acc}}}
\left|\Delta I_{\mathrm{ME}}(B_q\to B_{q'})\right|
$$
with required positivity condition
$$
0<\Delta I_*<\infty
$$
The benchmark comparison is
$$
\delta_h
=
\left|
\frac{2\pi\Delta I_*-h}{h}
\right|
$$

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
Here $\varepsilon_I$ is a predeclared action-increment floor with the same units as $\Delta I_{\mathrm{ME}}$. Also report the Floquet basin-robustness gap
$$
\Delta_{\mathbf{k}}
=
1-\max_{i\notin G}\|\mu_i(\mathbf{k})\|
$$
for each endpoint branch and each transition continuation.

The action-increment claim is numerically meaningful only when $\delta_I$ is small, $\Delta_{\mathbf{k}}>0$, and the phase, energy, and root residuals remain below their predeclared tolerances across refinement.

## Field-Speed Approach Scan

The campaign must include an approach-to-$c_f$ diagnostic on the same branch rows used for the action-increment calculation. This is not a new gate. It is the root-and-action stress test that prevents a stable-looking increment from being promoted when the branch survives only by numerical accident near the field-speed boundary.

This scan is the minimal numerical artifact for the paired action-spacing and self-hit well-posedness walls: it measures whether causal-root multiplicity, Jacobian floors, and stable-cycle action increments remain controlled as branch speed approaches $c_f$.

For each declared scan family, report rows approaching the field speed from below, at the boundary when the continuation reaches it, and from above when the branch chart admits a super-field-speed interval. Each row must record the layer speed ratios, active partner-root count, active self-root count, active inter-layer-root count, minimum accepted Jacobian floor, minimum accepted transmitter-side acceleration weight, separator status, root-ledger identity, accepted/rejected status, and stable-cycle $\Delta I_{\mathrm{ME}}$ cluster assignment.

The scan has a simple discipline. A packet may not promote `candidate_h_recovery` if the accepted near-boundary rows lose their Jacobian floor, change active-root identity under refinement, or split into non-uniform stable action increments without a derived branch-class reason. In that case the packet may still report a useful diagnostic, but it has not recovered the Planck benchmark from a well-posed A1 action scale.

## Required Packet Files

The minimum campaign packet contains:

| File | Required contents |
| --- | --- |
| `campaign.json` | source commit, protocol version, run ids, integrator, tolerances, declared benchmark policy, and whether `$h,\hbar$` entered only after the Master-Equation increment was computed |
| `branch_pairs.csv` | each $B_q\to B_{q'}$ row, branch labels, integer windings, inter-layer closure integers, transition window, and inclusion/exclusion status |
| `state_vectors.json` | pre/post layer radii, frequencies, speeds, plane normals, phase offsets, source channel, transaction axis, and mechanical endpoint charges |
| `root_ledger_before_after.json` | partner, self, and inter-layer roots before and after transition, with delays, action-level $g$, $u$, Jacobians, separator flags, and $\Delta N_{\mathrm{self}}$ |
| `torque_integrals.csv` | diagnostic $\int\boldsymbol{\tau}^{(A)}_1\,dT$, $\int\boldsymbol{\tau}^{(A)}_2\,dT$, $\int\boldsymbol{\tau}^{(A)}_3\,dT$, $\Delta\mathbf L_{\mathrm{wake},\partial}^{\mathrm{spec}}$, and projection onto $\hat{\mathbf n}_{\mathrm{txn}}$ |
| `action_increment_rows.csv` | $\Delta I_{\mathrm{ME}}$, absolute value, cluster id, accepted/rejected status, and failure code |
| `field_speed_approach_scan.csv` | scan-family id, speed-window label, layer speed ratios, active partner/self/inter-layer root counts, minimum accepted $|J|$, separator status, root-ledger stability, $\Delta I_{\mathrm{ME}}$, cluster id, accepted/rejected status, and failure code |
| `energy_ledger.csv` | $\sum_{a\in\{1,2,3\}}\int\omega_a\,dI_a$, $\Delta E_{\mathrm{wake}}$, $\Delta E_{\mathrm{coupl}}$, accepted $E_{\mathrm{wake}}^{(\eta)}$ when available, diagnostic $U$ if used, and $\mathcal{R}_E$ |
| `conservation_pullback.csv` | branch-chart id, cut/window id, $\eta$, $\epsilon_c$, `history_horizon`, endpoint convention, $\nu_J$, inactive-gap minimum, `memory_depth`, $K_{\mu}$, $E_{\mathrm{wake}}^{(\eta)}$, $\mathbf{P}_{\mathrm{mech}}$, $\mathbf{P}_{\mathrm{wake}}^{(\eta)}$, $\mathbf{J}_{\mathrm{mech}}$, $\mathbf{J}_{\mathrm{wake}}^{(\eta)}$, $\mathcal{R}_E$, $\mathcal{R}_P$, $\mathcal{R}_J$, provenance of the accepted motion-plus-wake update, and verdict. The two history fields carry absolute-time durations and are distinct from the observer-level Planck benchmark $h$. |
| `phase_closure_residuals.csv` | layer and inter-layer phase closure residuals, winding labels, and tolerance status |
| `floquet_report.json` | monodromy or finite-difference return map, excluded symmetry modes, multipliers, and $\Delta_{\mathbf{k}}$ |
| `cluster_summary.json` | $\Delta I_*$, class means, class standard deviations, $\delta_I$, $h_{\mathbb{A}\mathbb{A}\mathbb{A}}$, $\delta_h$, and promotion status |
| `convergence_table.csv` | the convergence rows required by [Convergence Tests](convergence-tests.md), including active-root mismatch and stability-window shift |
| `negative_control_report.md` | null runs and the invariant, provenance, or stability channel they break |
| `promotion_gate.md` | final pass/fail statement and the strongest claim the packet authorizes |

## Promotion Gates

A packet may promote `candidate_action_increment` only if all of the following pass:

1. `$h,\hbar$` are absent from the simulated equations of motion and accepted-transition selection, except as post-run benchmark labels.
2. Both endpoint packets satisfy branch-certificate eligibility on matching ledger identity and active-root convention.
3. At least one transition class has $0<\Delta I_*<\infty$.
4. Endpoint branches and transition continuations have $\Delta_{\mathbf{k}}>0$ after symmetry modes are removed.
5. Phase closure, root residuals, energy residuals, momentum residuals, and angular-momentum residuals pass the predeclared tolerances.
6. $\delta_I$ is below the predeclared cluster tolerance.
7. The temporal, history-resolution, spatial, cross-integrator, and negative-control checks from [Convergence Tests](convergence-tests.md) pass.
8. The packet reports $\delta_h$ honestly, whether or not the benchmark match is good.

Only a packet that also has small $\delta_h$ may promote `candidate_h_recovery`. A packet with a positive and stable $\Delta I_*$ but poor $\delta_h$ promotes only a derived action increment that does not recover the measured Planck benchmark.

## Failure-Code Enum

| Code | Trigger |
| --- | --- |
| `input-hbar-contamination` | the run seeded transition size, branch selection, or tolerances from $\hbar$ before computing $\Delta I_{\mathrm{ME}}$ |
| `no-positive-increment-floor` | accepted transitions accumulate arbitrarily small nonzero $\Delta I_{\mathrm{ME}}$ |
| `multi-cluster-action-scale` | multiple stable increment clusters appear with no derived reason to choose one |
| `nonpositive-floquet-gap` | an endpoint branch or transition continuation has $\Delta_{\mathbf{k}}\le0$ |
| `phase-closure-open` | layer or inter-layer closure residuals exceed tolerance |
| `root-ledger-instability` | active roots change under refinement or the self-hit parity condition fails |
| `jacobian-floor-loss` | accepted near-boundary records lose the declared minimum Jacobian floor |
| `transmitter-acceleration-weight-loss` | accepted records lose the declared transmitter-side acceleration-weight floor or leave its certified interval because $D_t$ is uncertified, approaches a pole, or changes sign under refinement |
| `field-speed-root-instability` | the approach-to-$c_f$ scan changes active-root identity, separator status, or branch status under refinement |
| `nonuniform-action-spacing` | stable-cycle action increments split across the field-speed approach scan with no derived branch-class reason |
| `energy-ledger-open` | $\mathcal{R}_E$ exceeds tolerance or the wake/root energy channel is unaccounted |
| `conservation-pullback-open` | $\mathcal{R}_P$ or $\mathcal{R}_J$ exceeds tolerance, or the exact Noether pullback uses different rows than the root ledger or acceleration residual |
| `convergence-fail` | required convergence or cross-integrator gates fail |
| `negative-control-fail` | the intentionally wrong model still passes the packet gates |
| `benchmark-mismatch` | $h_{\mathbb{A}\mathbb{A}\mathbb{A}}$ is stable but fails the declared `$h$` benchmark tolerance |

## Interpretation

This protocol preserves the level distinction. A passing action-increment packet would support the action-cell step used by [Wavefunction Ontology](../../quantum/wavefunction-ontology.md#lower-bound-on-recordable-basin-measure). It would not by itself derive the Born rule, spin statistics, Bell correlations, photon polarization, or observer-level orbital quantum numbers. Those remain downstream closure targets.
