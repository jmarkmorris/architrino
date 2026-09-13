# Convergence Tests for Non-Markovian Dynamics

The convergence standard specifies which observables are checked, which refinement ladders are required, and what pass/fail thresholds distinguish numerical control from artifacts in simulations of delayed dynamics. An [architrino](../../foundations/architrino.md) is a point transceiver of fixed polarity; each of its past positions emits a causal wake, an expanding disturbance that travels outward at the wake speed $c_f$, and a receiver is accelerated at a reception time only by the wakes that arrive exactly then, at the causal roots found by solving the delay condition in stored history. The dynamics are therefore non-Markovian: the next update depends on path history, not on the instantaneous state alone, and in the [self-hit](../../dynamics/master-equation.md#self-hit-condition) regime an architrino encounters its own earlier wake. Convergence, in the mathematical sense used here, means that a reported result on a declared window is not produced by the mesh, time step, history-interpolation resolution, root solver, or regulator. The requirement matters more for delayed dynamics than for ordinary differential equations, because a small bookkeeping error in the past can return later as a spurious branch, stability window, or invariant. The standard is therefore a validation gate, not optional numerical hygiene.

All convergence claims in this chapter are finite-window claims. Passing the gates below establishes that the declared observables on the analysis window are stable under refinement of the discretization parameters the ladders vary, with the stated detector set, history horizon, and regulator choices held fixed. Every ladder compares runs of the same instrument with itself, so a pass is evidence that the discretization did not produce the result; it is not by itself evidence that the result is correct, because an error shared by every rung, such as a wrong kernel, a root missed at every resolution, or a truncated history tail, survives refinement unchanged. Correctness additionally requires the independent known-case check of the [numerical recipe](action-energy/numerical-recipe-and-stability.md): agreement with a closed form, an analytically known case such as the fixed-center solutions in [Analytic Baselines](action-energy/analytic-baselines.md), or an instrument authored separately from the run. The gates also do not decide unbounded reachability questions for the full delayed dynamics; those would require a separate theorem about the global flow rather than a stronger convergence plot.

## Convergence in Non-Markovian (Self-Hit) Dynamics

### Scope and default observable set

For each claim, compute convergence on a fixed native analysis window $W=[T_a,T_b]$ in absolute time $T$ and a fixed detector set $\{\mathbf X_k\}$ of evaluation points in the Euclidean void, using:

- the mollified bookkeeping potential $\Phi(\mathbf X_k,T)$, meaning the potential $\Phi_\eta$ reconstructed from the superposed causal wakes of the run at its declared causal-wake-surface width $\eta$; it is an evaluation channel, not the substrate law, which is the per-hit acceleration of the [Master Equation](../../dynamics/master-equation.md)
- its gradient magnitude $\|\nabla_{\mathbf X}\Phi(\mathbf X_k,T)\|$
- the self-hit event rate $\lambda_{\text{self},i}$ on $W$ for each tracked receiver $i$, the number of admitted causal roots per unit absolute time whose transmitter and receiver are the same architrino; a self-hit is an event on a receiver worldline, so the rate is indexed by the receiver rather than by a fixed detector point
- the drift of a key invariant on $W$, for example the normalized energy drift $\epsilon_E$ constructed as in [Delay Dynamics Energy](action-energy/delay-dynamics-energy.md) with the same regulator, retained branches, and window-boundary account as the motion

When the run evolves architrino motion rather than evaluating prescribed paths, the observable set also includes the motion channels that the numerical recipe compares on the same window: root identities, the acceleration record, and the integrated velocity change of each tracked architrino. Each observable is declared, with its norm, tolerance, and normalization scale, before the run.

### Comparison metrics (required)

For any observable $Y$ on two runs A (coarser) and B (finer), define
$$
E_{\mathrm{rel}}(Y;A,B)\equiv
\frac{\|R(Y_B)-Y_A\|_{L^2(W,\{\mathbf X_k\})}}
{\|R(Y_B)\|_{L^2(W,\{\mathbf X_k\})}+\varepsilon_{0,Y}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5d43236ba1f86777)

Here $R$ is restriction of the finer run to the coarser sampling grid, and $\varepsilon_{0,Y}$ is a predeclared floor with the same units as the norm of $Y$. The norm $\|\cdot\|_{L^2(W,\{\mathbf X_k\})}$ is the weighted root-mean-square over the reception samples in $W$ and the detector points, with predeclared quadrature weights that sum to one, the same convention as the history norm below; a normalized norm keeps the meaning of the floor independent of the sample count, so that pairs of runs on different grids can be compared in one ratio. A bare dimensionless constant must not be added to a dimensional channel.

For the provenance distributions of solved emission times $T_t$, recorded in the compatibility field `t_emit` of the [run protocol](run-protocols.md), define:
$$
D_W \equiv \frac{W_1(P_A,P_B)}{\mathrm{IQR}(P_B)+\varepsilon_T},
\qquad
D_{JS}\equiv \mathrm{JSD}(P_A\|P_B)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-72d15bc24c00f4fb)

where $P_A$ and $P_B$ are the distributions of admitted-root emission times over the reception samples in $W$ and the tracked receivers of the two runs, $W_1$ is the 1-Wasserstein distance, the smallest average displacement of emission-time mass that turns one distribution into the other, $\mathrm{IQR}(P_B)$ is the interquartile range of the finer run's distribution, $\varepsilon_T$ is a predeclared absolute-time floor, and $\mathrm{JSD}$ is the Jensen–Shannon divergence with logarithm base $2$, which lies between $0$ for identical distributions and $1$ for distributions with disjoint support. Solved emission times are continuous values that differ between runs by their root-time error, so their raw sample sets have disjoint support and give $D_{JS}=1$ whatever the agreement. The divergence is therefore evaluated on a discretization declared before the run and shared by both runs, a bin width or kernel width no smaller than the largest certified root-time error of the compared runs. The Wasserstein ratio $D_W$ needs no binning; $D_{JS}$ compares the shapes of the two distributions at the declared resolution.

For delayed transmitter-state interpolation, the run must declare an order-$q$ history interpolation operator $I_{\Delta H_{\mathrm{hist}}}^q$, which reconstructs the stored transmitter history at any emission time from samples spaced $\Delta H_{\mathrm{hist}}$ apart using a polynomial of degree $q$. On a fixed analysis window $W$, define
$$
E_{\mathrm{hist}}(S_\eta;\Delta H_{\mathrm{hist}},\Delta H_{\mathrm{hist}}/2;W)
=
\frac{
\left(\sum_{m\in W}\|I_{\Delta H_{\mathrm{hist}}/2}^qS_\eta(T_{t,m})-I_{\Delta H_{\mathrm{hist}}}^qS_\eta(T_{t,m})\|^2w_m\right)^{1/2}
}{
\left(\sum_{m\in W}\|I_{\Delta H_{\mathrm{hist}}/2}^qS_\eta(T_{t,m})\|^2w_m\right)^{1/2}+\varepsilon_{0,S}
}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6beb3447a5cd62ba)

Here $S_\eta(T_t)$ is the regularized transmitter state, position and velocity, evaluated at the emission time $T_t$ of an admitted root, as declared in the run protocol; $T_{t,m}$ is the emission time of the $m$-th admitted root whose reception time lies in $W$; and the two terms evaluate the same state at two history resolutions, so $E_{\mathrm{hist}}$ measures how much the reconstructed delayed state moves when the history step is halved. The state norm $\|\cdot\|$ is declared before the run together with its unit weights for the position and velocity components, which in normalized wake-speed units with $c_f=1$ are both dimensionless. The weights $w_m\ge0$ are predeclared quadrature or sample weights normalized by $\sum_{m\in W}w_m=1$, and $\varepsilon_{0,S}$ has the same units as the weighted state norm.

For nonsmooth state-dependent delay windows, meaning reception intervals in which a causal root is born, lost, or changes status, define the jump residual rows
$$
\mathcal{D}_{\mathrm{jump}}
=
\{(\xi_a,k_a,\ell_a,\xi_{\pi(a)},R_{\mathrm{jump},a})\},
\qquad
R_{\mathrm{jump},a}
=
\frac{|T_{0,\ell_a}(\xi_a)-\xi_{\pi(a)}|}
{\max(\Delta T,\Delta H_{\mathrm{hist}},\eta/c_f,\varepsilon_T)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-98702b057ef78ec6)

Here $\xi_a$ is a sampled reception time in the coarser run's transition window at which tracked root $k_a$, with branch or root-class label $\ell_a$, changes status; $T_{0,\ell_a}(\xi_a)$ is the transition time that the coarser run's event location assigns to that labeled root from the sample $\xi_a$; $\pi(a)$ is the predeclared matching permutation into the comparison run; and $\xi_{\pi(a)}$ is the transition time of the matched labeled root in the comparison run. The residual therefore compares the two runs' transition times for one labeled root, normalized by the largest resolution scale in play: the reception step $\Delta T$, the history step $\Delta H_{\mathrm{hist}}$, the reception-time width $\eta/c_f$ of the causal-wake-surface regulator, and the time floor $\varepsilon_T$. The transition-window row passes when every residual satisfies $R_{\mathrm{jump},a}\le\tau_{\mathrm{jump}}$ with $\tau_{\mathrm{jump}}$ declared before the run. A row is invalid if the matching rule or permutation is chosen after inspecting the residual.

### Required refinements with pass/fail thresholds

1. Temporal refinement ($\Delta T$ and $\Delta T/2$, plus $\Delta T/4$ for order check), with the root residual and root-time tolerances tightened with the step so that the certified root-time error of the numerical recipe stays below the reception step at every rung:
- Pass if $E_{\mathrm{rel}}(\Phi)\le 0.02$, $E_{\mathrm{rel}}(\|\nabla\Phi\|)\le 0.03$, and $|\lambda_{\text{self},A}-\lambda_{\text{self},B}|/\max(|\lambda_{\text{self},B}|,\lambda_{\min})\le0.05$ for each tracked receiver, with the rate floor $\lambda_{\min}$ declared before the run. If both rates lie below that floor, compare absolute event counts and root identities instead of reporting an undefined relative rate.
- Estimated observed order:
$$
p_{\mathrm{obs}}(Y)=\log_2\!\frac{E_{\mathrm{rel}}(Y;\Delta T,\Delta T/2)}
{E_{\mathrm{rel}}(Y;\Delta T/2,\Delta T/4)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b32cc921fe0fef67)

Require $p_{\mathrm{obs}}\ge 0.8$ for at least one primary potential channel ($\Phi$ or $\|\nabla\Phi\|$). The estimate reads the convergence order from the ratio of successive differences: if the error at step $\Delta T$ scales as $\Delta T^{\,p}$, each halving divides the difference between neighboring rungs by $2^p$, so the base-two logarithm of the ratio recovers $p$. It is meaningful only when the three runs share the same active-root identities on $W$ and both differences exceed the declared floor; a root census that changes at one rung produces an order-one difference that is not a discretization error, and a fold or status transition inside $W$ lowers the attainable order below that of the smooth integrator, so the transition-window row, not this estimate, governs such windows.

2. History-resolution refinement (history step halved or interpolation order increased):
- Pass if $E_{\mathrm{rel}}(\Phi)\le 0.02$, $E_{\mathrm{rel}}(\|\nabla\Phi\|)\le 0.03$.
- Provenance stability mandatory: $D_W\le 0.05$ and $D_{JS}\le 0.02$.
- Delayed-transmitter interpolation stability mandatory whenever delayed states are evaluated from stored history: $E_{\mathrm{hist}}\le\tau_{\mathrm{hist}}$ with $\tau_{\mathrm{hist}}$ declared before the run.
- The retained-history horizon $H_{\mathrm{hist}}$ is held fixed here and in every other ladder. Memory truncation is assessed separately under the numerical recipe's finite-memory or bounded-tail requirement; a passing table does not bound the omitted tail.

3. Spatial refinement (refinement of the detector or map grid on which $\Phi$ and $\nabla\Phi$ are sampled, and an increase of sampling density for any coarse-grained or continuum representation of the Noether sea; the architrino count of a direct run is physical input, not a resolution parameter):
- Pass if $E_{\mathrm{rel}}(\Phi\text{-map})\le 0.03$ and $E_{\mathrm{rel}}(\nabla\Phi\text{-map})\le 0.05$.
- Self-hit counts and stability-window boundaries must satisfy relative shift $\le 0.05$, where a stability window is the declared interval of a control parameter on which the run reports a retained branch as stable and the relative shift is the boundary displacement divided by the window width.

4. Cross-integrator validation (two time-stepping methods of different construction, for example a linear multistep method and a Runge–Kutta method, at matched resolution):
- Pass if $E_{\mathrm{rel}}(\Phi)\le 0.03$, $E_{\mathrm{rel}}(\|\nabla\Phi\|)\le 0.05$.
- Provenance agreement must satisfy $D_W\le 0.08$ and $D_{JS}\le 0.03$.
- The cross-integrator report must name solver family, interpolation policy, solver residual controls, and event/restart handling. If the compared runs select different active-root identities or transition statuses, the claim fails even if observable plots are close.
- Two integrators that share the root-finding, history-interpolation, and regulator code test only the time stepping. Their agreement is an implementation-parity check and does not replace the independent reference that a correctness claim requires.

5. Continuum moment refinement when a run promotes a coarse partial differential equation, kinetic moment, or Noether sea transport equation, meaning a reduced description obtained by averaging over many architrinos:
- Pass if the retained density and current channels, compared between the reduced run and the direct event-root run, satisfy
  $$
  E_{\mathrm{rel}}(R_{\rho}^{\mathrm{cg}})\le0.03,
  \qquad
  E_{\mathrm{rel}}(R_{P}^{\mathrm{cg}})\le0.05,
  \qquad
  E_{\mathrm{rel}}(R_E^{\mathrm{cg}})\le0.05
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-c74a4352b28ee9e6)

- Here $R_{\rho}^{\mathrm{cg}}$, $R_{P}^{\mathrm{cg}}$, and $R_E^{\mathrm{cg}}$ are the coarse-grained density, momentum-current, and energy channels of the moment hierarchy, each evaluated in the reduced run and in the direct event-root run coarse-grained on the same cells and window; the subscript $P$ labels the momentum moment and is not a cycle period. The moment-closure residual must decrease under temporal, history, and spatial refinement. A continuum plot is not promotion evidence if the next unresolved moment grows or if the memory-current residual is absorbed into fitted constants.

6. Stochastic and response refinement when a run adds Langevin, Fokker-Planck, or fluctuation-response summaries, reduced descriptions in which unresolved architrino history enters a reduced variable as noise: a Langevin equation adds a random forcing term to the reduced variable, a Fokker-Planck equation evolves that variable's probability density, and a fluctuation-response summary relates the variable's spontaneous fluctuations to its response to a small perturbation. These are effective-level summaries of deterministic delayed dynamics, and the direct event-root ensemble is their reference.
- For the first two moments of any declared distribution $P(z,T)$ of a reduced variable $z$ at absolute time $T$, require agreement with direct event-root ensembles:
  $$
  E_{\mathrm{rel}}(\langle z\rangle)\le0.03,
  \qquad
  E_{\mathrm{rel}}(\operatorname{Cov}(z))\le0.05
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-aac85420eb464059)

- If a diffusion tensor $D^{ij}(z)$, the coefficient of the second-derivative term of the Fokker-Planck equation, is inferred from jump or ledger increments, require it to remain positive semidefinite on the retained domain and stable under refinement.
- If a response kernel $\chi_{AB}$, the linear response of observable $A$ to a perturbation coupled to observable $B$, is promoted, require the causal dispersion residual $\mathcal R_{\mathrm{KK}}(\chi_{AB})\le0.05$ on the declared frequency band, where $\mathcal R_{\mathrm{KK}}$ measures the violation of the dispersion relations that tie the real and imaginary frequency parts of any causal kernel, and require any fluctuation-dissipation residual, the mismatch between the measured fluctuation spectrum and the one implied by the response kernel, to be reported from the same record.

7. Revised branch-coordinate model selection when a run changes a reduced branch coordinate, chart partition, or residual basis before rerun:
- The proposed coordinate must declare its source fields, equality map, symmetry quotients, and excluded locked keys before any coefficient fit or rerun.
- The selection report must include a held-out residual check, and it must include a phase-origin check whenever the coordinate uses an observation-phase split.
- The design must remain overdetermined after quotienting, with $N_{\mathrm{eq}}>N_{\mathrm{coef}}$, equivalently $R_{\mathrm{df}}>0$, where $N_{\mathrm{eq}}$ counts the independent residual equations after the symmetry quotient and $N_{\mathrm{coef}}$ counts the fitted coefficients. Report
  $$
  R_{\mathrm{df}}=\frac{N_{\mathrm{eq}}-N_{\mathrm{coef}}}{N_{\mathrm{eq}}},
  \qquad
  \frac{\operatorname{tr}H}{N_{\mathrm{eq}}}\le\frac{1}{2},
  \qquad
  \max_i H_{ii}\le\frac{1}{2}
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-1bce23587507a703)

  or an explicitly justified equivalent if a linear hat matrix $H$ is not available. Here $H$ is the hat matrix of the linear least-squares fit, the matrix that maps the observed residual values to their fitted values, and $H_{ii}$ is the leverage of equation $i$. For a full-rank linear fit the trace of $H$ equals $N_{\mathrm{coef}}$, so the displayed trace bound is the stronger requirement $N_{\mathrm{eq}}\ge2N_{\mathrm{coef}}$, equivalently $R_{\mathrm{df}}\ge1/2$; the leverage bound separately forbids any single equation from determining half or more of its own fitted value.
- Branch identity must persist under temporal refinement, history-window refinement, regulator refinement when a regulator is used, and root-ledger refinement. A coordinate that only improves the fitted residual while changing the active branch identity fails model selection.

### Machine-checkable convergence output

Every promoted claim must emit `convergence_table.csv` with one row for each required gate: temporal refinement, history-resolution refinement, history-interpolation refinement when delayed states are reconstructed from stored history, spatial refinement, cross-integrator validation, regulator ladder when used, transition-window refinement when a fold-layer or active-root status transition is claimed, a fold being a reception interval in which two causal roots meet at zero transmitter-side derivative, and negative control. Each row records the two run identifiers being compared, the restricted observable channel, $E_{\mathrm{rel}}(\Phi)$, $E_{\mathrm{rel}}(\|\nabla\Phi\|)$, $D_W$, $D_{JS}$, $E_{\mathrm{hist}}$ when applicable, $p_{\mathrm{obs}}$, active-root mismatch, self-hit or stability-window shift, transition-window status with the jump residuals $R_{\mathrm{jump},a}$ when applicable, pass/fail status, and failure code.

For continuum or stochastic promotions, append rows for `moment-closure`, `distribution-moments`, `diffusion-tensor`, `causal-response`, and `fluctuation-dissipation` when those channels are claimed. These rows must include the artifact hash of the direct event-root run and the artifact hash of the reduced continuum or stochastic run being compared.

For field-theory or continuum-limit promotions, the packet must also declare the scaling-limit datum: regulator family, scaling trajectory, volume or window trajectory when relevant, test-observable class, observable maps from the regulated state to the promoted variables, normalization and mixing rules for composite observables, convergence topology, positivity or reconstruction condition when the claim uses a quantum-field analogue, and the artifact hashes for every regulated run consumed by the limit. Without this datum, a finite-regulator trend is a diagnostic, not a promoted continuum claim.

If the promoted claim invokes an Osterwalder-Schrader-like or Wightman-like field-theory reconstruction, meaning a theorem that recovers a quantum field theory from correlation functions satisfying a stated list of conditions, the packet must identify the full reconstruction package it is borrowing: positivity, covariance or symmetry, locality or support condition, vacuum-sector or clustering condition, test-function space, regularity and growth control, and the target reconstructed object. Reflection positivity alone is not enough to promote a regulated numerical family into a local quantum-field analogue.

For revised branch-coordinate promotions, append rows for `branch-coordinate-source`, `branch-coordinate-heldout`, `branch-coordinate-phase-origin` when applicable, `branch-coordinate-design`, and `branch-identity-refinement`. These rows must include the artifact hash of the predeclared coordinate packet and the rerun candidate that consumes it.

The regulator row must include each promoted observable $Y$ and the value of
$$
E_\eta(Y;\eta,\eta/2)
=
\frac{\|R(Y_{\eta/2})-Y_{\eta}\|_{L^2(W,\{\mathbf X_k\})}}
{\|R(Y_{\eta/2})\|_{L^2(W,\{\mathbf X_k\})}+\varepsilon_{0,Y}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4ef903e8a02b096f)

It also records whether active root-ledger entries match between $\eta$ and $\eta/2$ after matching transmitter, receiver, root class, and branch status. The regulator $\eta$ is the causal-wake-surface width of the [auxiliary dual-mollified regulator](../../dynamics/master-equation.md#auxiliary-dual-mollified-regulator-for-proof-and-computation). Each rung of the ladder must remain resolved: the reception step and history spacing stay below the local traversal scales $\eta/|D_r|$ and $\eta/|D_t|$ stated in the numerical recipe, where $D_t$ and $D_r$ are the transmitter-side and receiver-side factors, so that halving $\eta$ is accompanied by the resolution it needs; shrinking the width while its support goes unresolved is not a regulator ladder. When the run also uses the core scale $\epsilon_c$, which controls the inverse-square kernel near zero separation, that scale forms a separate ladder with its own row, because surface-width removal and core removal are distinct limits. A convergence plot is not promotion evidence unless the table row containing the plotted quantity is present and tied to the campaign artifact hash.

Regulator extrapolation fits must report the fitted observable, the regulator ladder, the assumed asymptotic form, excluded points if any, stability under fit-window changes, endpoint or singular-window controls when they affect the extrapolation, and a negative-control observable. A fit that behaves smoothly but has no declared observable map, topology, normalization, volume or window estimate when relevant, remainder bound, or independent continuum reconstruction remains below theorem-grade evidence.

### Negative control (null test, mandatory)

Run at least one intentionally wrong model choice, such as a wrong history kernel, a swapped transmitter/receiver factor that uses $D_r$ where the acceleration weight requires $D_t$, or a perturbed emission-time solver. Keep the numerical wake-speed normalization fixed at $c_f=1$ even in the negative control.

Pass condition for the *pipeline* (not the null run): the null run must break expected invariants by a clear margin, with at least one of:

- invariant drift increase by $\ge 5\times$ relative to the validated run,
- provenance instability $D_W>0.10$ or $D_{JS}>0.05$,
- stability-window shift $>0.10$.

If the null run still passes the convergence gates above, treat the claim as numerically unvalidated.

### Global acceptance rule

A claim is numerically validated only if all applicable refinement gates pass and the null test fails as required. Numerical validation in this sense certifies refinement stability of the instrument on the declared window; a correctness claim additionally names the independent known-case reference required by the numerical recipe, and a physical claim requires the separate evidence of the relevant owner. Conditional gates such as revised branch-coordinate model selection apply only when the claim changes the reduced coordinate, chart partition, or residual basis before rerun.
