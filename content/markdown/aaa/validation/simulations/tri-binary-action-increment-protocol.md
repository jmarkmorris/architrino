# Tri-Binary Action-Increment Protocol

This protocol defines the simulation-facing test for deriving or falsifying the one-cycle action increment used by the quantum closure program. It specializes [Simulation Run Protocols](run-protocols.md) and [Convergence Tests](convergence-tests.md) to the question left open by [Tri-Binary Dynamics](../../dynamics/tri-binary-dynamics.md), [Dyadic Resonance Lock](../../dynamics/dyadic-resonance-lock.md), [Angular Momentum and Spin](../../theory-bridges/angular-momentum-and-spin.md), and [Mapping the Planck Scale](../../theory-bridges/planck-scale-tri-binary-alignment.md).

The target is narrow. The run must compute the smallest accepted Master-Equation projected action increment from stable tri-binary branch transitions. It may compare the resulting scale to the observer-level `$h,\hbar$` benchmark after the computation. It may not insert $\hbar$ as an input step size.

## Closure Question

The action-angle bridge in [Angular Momentum and Spin](../../theory-bridges/angular-momentum-and-spin.md#the-h-and-hbar-convention) states the conditional theorem target:
$$
\Delta I_i=\hbar
\quad\Longrightarrow\quad
\Delta\Gamma_{\text{cell}}=h^n
$$
for $n$ record-facing action-angle channels. This protocol tests the missing premise. It asks whether stable tri-binary dynamics select a positive increment $\Delta I_*$ such that
$$
h_{\mathrm{AAA}}=2\pi\Delta I_*
$$
matches the observer-level Planck constant benchmark.

Passing this protocol would not complete quantum theory. It would only promote the action-increment step from bookkeeping convention to candidate derived output.

## Accepted Transition Class

Let $B_q$ and $B_{q'}$ denote stable tri-binary branch states with layer radii, frequencies, speeds, plane normals, active causal-root ledger, and wake ledger. A candidate accepted transition belongs to
$$
\mathcal{T}_{\mathrm{acc}}
=
\left\{
B_q\to B_{q'}:
\Delta_{\mathbf{k}}>0,\ 
\mathcal{R}_{\mathrm{phase}}\le\tau_{\mathrm{phase}},\ 
\mathcal{R}_{E}\le\tau_E,\ 
\Delta N_{\mathrm{self}}\in2\mathbb{Z},\ 
\mathcal{R}_{\mathrm{root}}\le\tau_{\mathrm{root}}
\right\}.
$$
The tolerances $\tau_{\mathrm{phase}}$, $\tau_E$, and $\tau_{\mathrm{root}}$ must be declared before the run. The transition is not accepted merely because it improves a fit to `$h$`.

Plain language: only stable, energy-accounted, root-accounted branch changes are allowed to vote on the action increment.

## Master-Equation Increment

For each candidate transition, compute the layer torque integrals and wake boundary term directly from the delayed dynamics. With transaction axis $\hat{\mathbf a}$, the projected increment is
$$
\Delta I_{\mathrm{ME}}
=
\hat{\mathbf a}\cdot
\left(
\sum_{\ell\in\{I,M,O\}}
\int_{t_i}^{t_f}\mathbf T_\ell(s)\,ds
+
\Delta\mathbf L_{\mathrm{wake},\partial}
\right).
$$
Here $\mathbf T_\ell$ is the layer torque reconstructed from causal-wake forces on the architrinos in layer $\ell$, and $\Delta\mathbf L_{\mathrm{wake},\partial}$ is the angular momentum still carried across the chosen core boundary at the end of the transition window.

The candidate increment floor is
$$
\Delta I_*
=
\inf_{B_q\to B_{q'}\in\mathcal{T}_{\mathrm{acc}}}
\left|\Delta I_{\mathrm{ME}}(B_q\to B_{q'})\right|,
$$
with required positivity condition
$$
0<\Delta I_*<\infty.
$$
The benchmark comparison is
$$
\delta_h
=
\left|
\frac{2\pi\Delta I_*-h}{h}
\right|.
$$

## Cluster and Stability Residuals

Because a single transition can be a numerical accident, the packet must scan a family of stable branch transitions. For a selected class $\mathcal{C}\subset\mathcal{T}_{\mathrm{acc}}$, report
$$
\delta_I(\mathcal{C})
=
\frac{
\operatorname{std}_{\mathcal{C}}\!\left(\Delta I_{\mathrm{ME}}\right)
}{
\left|\operatorname{mean}_{\mathcal{C}}\!\left(\Delta I_{\mathrm{ME}}\right)\right|
+\varepsilon_0
},
\qquad
\varepsilon_0=10^{-12}.
$$
Also report the Floquet basin-robustness gap
$$
\Delta_{\mathbf{k}}
=
1-\max_{i\notin G}\|\mu_i(\mathbf{k})\|
$$
for each endpoint branch and each transition continuation.

The action-increment claim is numerically meaningful only when $\delta_I$ is small, $\Delta_{\mathbf{k}}>0$, and the phase, energy, and root residuals remain below their predeclared tolerances across refinement.

## Required Packet Files

The minimum campaign packet contains:

| File | Required contents |
| --- | --- |
| `campaign.json` | source commit, protocol version, run ids, integrator, tolerances, declared benchmark policy, and whether `$h,\hbar$` entered only after the Master-Equation increment was computed |
| `branch_pairs.csv` | each $B_q\to B_{q'}$ row, branch labels, integer windings, inter-layer closure integers, transition window, and inclusion/exclusion status |
| `state_vectors.json` | pre/post layer radii, frequencies, speeds, plane normals, phase offsets, source channel, and transaction axis |
| `root_ledger_before_after.json` | partner, self, and inter-layer roots before and after transition, with delays, Jacobians, separator flags, and $\Delta N_{\mathrm{self}}$ |
| `torque_integrals.csv` | $\int\mathbf T_I\,dt$, $\int\mathbf T_M\,dt$, $\int\mathbf T_O\,dt$, $\Delta\mathbf L_{\mathrm{wake},\partial}$, and projection onto $\hat{\mathbf a}$ |
| `action_increment_rows.csv` | $\Delta I_{\mathrm{ME}}$, absolute value, cluster id, accepted/rejected status, and failure code |
| `energy_ledger.csv` | $\sum_\ell\int\omega_\ell\,dI_\ell$, $\Delta E_{\mathrm{wake}}$, $\Delta E_{\mathrm{coupl}}$, and $\mathcal{R}_E$ |
| `phase_closure_residuals.csv` | layer and inter-layer phase closure residuals, winding labels, and tolerance status |
| `floquet_report.json` | monodromy or finite-difference return map, excluded symmetry modes, multipliers, and $\Delta_{\mathbf{k}}$ |
| `cluster_summary.json` | $\Delta I_*$, class means, class standard deviations, $\delta_I$, $h_{\mathrm{AAA}}$, $\delta_h$, and promotion status |
| `convergence_table.csv` | the convergence rows required by [Convergence Tests](convergence-tests.md), including active-root mismatch and stability-window shift |
| `negative_control_report.md` | null runs and the invariant, provenance, or stability channel they break |
| `promotion_gate.md` | final pass/fail statement and the strongest claim the packet authorizes |

## Promotion Gates

A packet may promote `candidate_action_increment` only if all of the following pass:

1. `$h,\hbar$` are absent from the simulated equations of motion and accepted-transition selection, except as post-run benchmark labels.
2. At least one transition class has $0<\Delta I_*<\infty$.
3. Endpoint branches and transition continuations have $\Delta_{\mathbf{k}}>0$ after symmetry modes are removed.
4. Phase closure, root residuals, and energy residuals pass the predeclared tolerances.
5. $\delta_I$ is below the predeclared cluster tolerance.
6. The temporal, history-resolution, spatial, cross-integrator, and negative-control checks from [Convergence Tests](convergence-tests.md) pass.
7. The packet reports $\delta_h$ honestly, whether or not the benchmark match is good.

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
| `energy-ledger-open` | $\mathcal{R}_E$ exceeds tolerance or the wake/root energy channel is unaccounted |
| `convergence-fail` | required convergence or cross-integrator gates fail |
| `negative-control-fail` | the intentionally wrong model still passes the packet gates |
| `benchmark-mismatch` | $h_{\mathrm{AAA}}$ is stable but fails the declared `$h$` benchmark tolerance |

## Interpretation

This protocol preserves the level distinction. A passing action-increment packet would support the action-cell step used by [Wavefunction Ontology](../../quantum/wavefunction-ontology.md#lower-bound-on-recordable-basin-measure). It would not by itself derive the Born rule, spin statistics, Bell correlations, photon polarization, or observer-level orbital quantum numbers. Those remain downstream closure targets.
