# Convergence Tests for Non-Markovian Dynamics

This chapter defines the convergence standard for simulations that include self-hit structure and other delayed-memory effects. Its role is to specify which observables are checked, which refinement ladders are required, and what pass/fail thresholds count as numerical control rather than artifact.

Convergence means the result is not a trick of the mesh, time step, history buffer, root solver, or regulator. For delayed dynamics that matters especially, because a tiny bookkeeping error in the past can return later as a fake branch, fake stability window, or fake invariant.

Because self-hit dynamics are especially prone to fake structure under poor time or history resolution, this document should be read as a validation gate rather than as optional numerical hygiene.

All convergence claims in this chapter are finite-window claims. Passing the gates below validates the declared observables on the analysis window, with the stated detector set, history horizon, and regulator choices. It does not decide unbounded reachability questions for the full delayed dynamics; those would require a separate theorem about the global flow rather than a stronger convergence plot.

## Convergence in Non-Markovian (Self-Hit) Dynamics

### Scope and default observable set

For each claim, compute convergence on a fixed native analysis window $W=[T_a,T_b]$ and detector set $\{\mathbf X_k\}$ using:

- $\Phi(\mathbf X_k,T)$
- $\|\nabla_{\mathbf X}\Phi(\mathbf X_k,T)\|$
- self-hit event rate $\lambda_{\text{self}}(\mathbf X_k)$
- key invariant drift (e.g., normalized energy drift) $\epsilon_E$

### Comparison metrics (required)

For any observable $Y$ on two runs A (coarser) and B (finer), define
$$
E_{\mathrm{rel}}(Y;A,B)\equiv
\frac{\|R(Y_B)-Y_A\|_{L^2(W,\{\mathbf X_k\})}}
{\|R(Y_B)\|_{L^2(W,\{\mathbf X_k\})}+\varepsilon_{0,Y}}
$$
Here $R$ is restriction of the finer run to the coarser sampling grid, and $\varepsilon_{0,Y}$ is a predeclared floor with the same units as the norm of $Y$. A bare dimensionless constant must not be added to a dimensional channel.

For provenance distributions of solved `t_emit`, define:
$$
D_W \equiv \frac{W_1(P_A,P_B)}{\mathrm{IQR}(P_B)+\varepsilon_T},
\qquad
D_{JS}\equiv \mathrm{JSD}(P_A\|P_B)
$$
where $W_1$ is 1-Wasserstein distance, JSD uses logarithm base $2$, and $\varepsilon_T$ is a predeclared absolute-time floor.

For delayed source-state interpolation, the run must declare an order-$q$ history interpolation operator $I_h^q$. On a fixed analysis window $W$, define
$$
E_{\mathrm{hist}}(S_\eta;\Delta h,\Delta h/2;W)
=
\frac{
\left(\sum_{m\in W}\|I_{\Delta h/2}^qS_\eta(T_{t,m})-I_{\Delta h}^qS_\eta(T_{t,m})\|^2w_m\right)^{1/2}
}{
\left(\sum_{m\in W}\|I_{\Delta h/2}^qS_\eta(T_{t,m})\|^2w_m\right)^{1/2}+\varepsilon_{0,S}
}
$$
The weights $w_m\ge0$ are predeclared quadrature or sample weights normalized by $\sum_{m\in W}w_m=1$, and $\varepsilon_{0,S}$ has the same units as the weighted state norm.

For nonsmooth state-dependent delay windows, define the jump residual rows
$$
\mathcal{D}_{\mathrm{jump}}
=
\{(\xi_a,k_a,\ell_a,\xi_{\pi(a)},R_{\mathrm{jump},a})\},
\qquad
R_{\mathrm{jump},a}
=
\frac{|T_{0,\ell_a}(\xi_a)-\xi_{\pi(a)}|}
{\max(\Delta T,\Delta h,\eta/c_f,\varepsilon_T)}
$$
Here $\xi_a$ is a sampled reception time in the transition window, $k_a$ is the tracked root index, $\ell_a$ is its branch/root-class label, and $\pi(a)$ is the predeclared matching permutation into the comparison run. The map $T_{0,\ell_a}(\xi_a)$ returns the matched transition time for that labeled root. A row is invalid if the matching rule or permutation is chosen after inspecting the residual.

### Required refinements with pass/fail thresholds

1. Temporal refinement ($\Delta T$ and $\Delta T/2$, plus $\Delta T/4$ for order check):
- Pass if $E_{\mathrm{rel}}(\Phi)\le 0.02$, $E_{\mathrm{rel}}(\|\nabla\Phi\|)\le 0.03$, and
  $|\lambda_{\text{self},A}-\lambda_{\text{self},B}|/\max(|\lambda_{\text{self},B}|,\lambda_{\min})\le0.05$, with the rate floor $\lambda_{\min}$ declared before the run. If both rates lie below that floor, compare absolute event counts and root identities instead of reporting an undefined relative rate.
- Estimated observed order:
$$
p_{\mathrm{obs}}(Y)=\log_2\!\frac{E_{\mathrm{rel}}(Y;\Delta T,\Delta T/2)}
{E_{\mathrm{rel}}(Y;\Delta T/2,\Delta T/4)}
$$
Require $p_{\mathrm{obs}}\ge 0.8$ for at least one primary field channel ($\Phi$ or $\|\nabla\Phi\|$).

2. History-resolution refinement (history step halved or interpolation order increased):
- Pass if $E_{\mathrm{rel}}(\Phi)\le 0.02$, $E_{\mathrm{rel}}(\|\nabla\Phi\|)\le 0.03$.
- Provenance stability mandatory: $D_W\le 0.05$ and $D_{JS}\le 0.02$.
- Delayed-source interpolation stability mandatory whenever delayed states are evaluated from stored history: $E_{\mathrm{hist}}\le\tau_{\mathrm{hist}}$ with $\tau_{\mathrm{hist}}$ declared before the run.

3. Spatial refinement (grid/particle resolution increase):
- Pass if $E_{\mathrm{rel}}(\Phi\text{-map})\le 0.03$ and $E_{\mathrm{rel}}(\nabla\Phi\text{-map})\le 0.05$.
- Self-hit counts and stability-window boundaries must satisfy relative shift $\le 0.05$.

4. Cross-integrator validation (e.g., symplectic vs RK with matched resolution):
- Pass if $E_{\mathrm{rel}}(\Phi)\le 0.03$, $E_{\mathrm{rel}}(\|\nabla\Phi\|)\le 0.05$.
- Provenance agreement must satisfy $D_W\le 0.08$ and $D_{JS}\le 0.03$.
- The cross-integrator report must name solver family, interpolation policy, solver residual controls, and event/restart handling. If the compared runs select different active-root identities or transition statuses, the claim fails even if observable plots are close.

5. Continuum moment refinement when a run promotes a coarse PDE, kinetic moment, or Noether sea transport equation:
- Pass if the retained density/current channel satisfies
  $$
  E_{\mathrm{rel}}(R_{\rho}^{\mathrm{cg}})\le0.03,
  \qquad
  E_{\mathrm{rel}}(R_{P}^{\mathrm{cg}})\le0.05,
  \qquad
  E_{\mathrm{rel}}(R_E^{\mathrm{cg}})\le0.05
  $$
- The moment-closure residual must decrease under temporal, history, and spatial refinement. A continuum plot is not promotion evidence if the next unresolved moment grows or if the memory-current residual is absorbed into fitted constants.

6. Stochastic and response refinement when a run adds Langevin, Fokker-Planck, or fluctuation-response summaries:
- For the first two moments of any declared distribution $P(z,t)$, require agreement with direct event-root ensembles:
  $$
  E_{\mathrm{rel}}(\langle z\rangle)\le0.03,
  \qquad
  E_{\mathrm{rel}}(\operatorname{Cov}(z))\le0.05
  $$
- If a diffusion tensor $D^{ij}(z)$ is inferred from jump or ledger increments, require it to remain positive semidefinite on the retained domain and stable under refinement.
- If a response kernel $\chi_{AB}$ is promoted, require the causal dispersion residual $\mathcal R_{\mathrm{KK}}(\chi_{AB})\le0.05$ on the declared frequency band and require any fluctuation-dissipation residual to be reported from the same record.

7. Revised branch-coordinate model selection when a run changes a reduced branch coordinate, chart partition, or residual basis before rerun:
- The proposed coordinate must declare its source fields, equality map, symmetry quotients, and excluded locked keys before any coefficient fit or rerun.
- The selection report must include a held-out residual check, and it must include a phase-origin check whenever the coordinate uses an observation-phase split.
- The design must remain overdetermined after quotienting, with $N_{\mathrm{eq}}>N_{\mathrm{coef}}$ or $R_{\mathrm{df}}>0$. Report
  $$
  R_{\mathrm{df}}=\frac{N_{\mathrm{eq}}-N_{\mathrm{coef}}}{N_{\mathrm{eq}}},
  \qquad
  \frac{\operatorname{tr}H}{N_{\mathrm{eq}}}\le\frac{1}{2},
  \qquad
  \max_i H_{ii}\le\frac{1}{2}
  $$
  or an explicitly justified equivalent if a linear hat matrix $H$ is not available.
- Branch identity must persist under temporal refinement, history-window refinement, regulator refinement when a regulator is used, and root-ledger refinement. A coordinate that only improves the fitted residual while changing the active branch identity fails model selection.

### Machine-checkable convergence output

Every promoted claim must emit `convergence_table.csv` with one row for each required gate: temporal refinement, history-resolution refinement, history-interpolation refinement when delayed states are reconstructed from stored history, spatial refinement, cross-integrator validation, regulator ladder when used, transition-window refinement when a fold-layer or active-root status transition is claimed, and negative control. Each row records the two run identifiers being compared, the restricted observable channel, $E_{\mathrm{rel}}(\Phi)$, $E_{\mathrm{rel}}(\|\nabla\Phi\|)$, $D_W$, $D_{JS}$, $E_{\mathrm{hist}}$ when applicable, $p_{\mathrm{obs}}$, active-root mismatch, self-hit or stability-window shift, transition-window status, pass/fail status, and failure code.

For continuum or stochastic promotions, append rows for `moment-closure`, `distribution-moments`, `diffusion-tensor`, `causal-response`, and `fluctuation-dissipation` when those channels are claimed. These rows must include the artifact hash of the direct event-root run and the artifact hash of the reduced continuum or stochastic run being compared.

For field-theory or continuum-limit promotions, the packet must also declare the scaling-limit datum: regulator family, scaling trajectory, volume or window trajectory when relevant, test-observable class, observable maps from the regulated state to the promoted variables, normalization and mixing rules for composite observables, convergence topology, positivity or reconstruction condition when the claim uses a quantum-field analogue, and the artifact hashes for every regulated run consumed by the limit. Without this datum, a finite-regulator trend is a diagnostic, not a promoted continuum claim.

If the promoted claim invokes an Osterwalder-Schrader-like or Wightman-like field-theory reconstruction, the packet must identify the full reconstruction package it is borrowing: positivity, covariance or symmetry, locality or support condition, vacuum-sector or clustering condition, test-function space, regularity and growth control, and the target reconstructed object. Reflection positivity alone is not enough to promote a regulated numerical family into a local quantum-field analogue.

For revised branch-coordinate promotions, append rows for `branch-coordinate-source`, `branch-coordinate-heldout`, `branch-coordinate-phase-origin` when applicable, `branch-coordinate-design`, and `branch-identity-refinement`. These rows must include the artifact hash of the predeclared coordinate packet and the rerun candidate that consumes it.

The regulator row must include each promoted observable $Y$ and the value of
$$
E_\eta(Y;\eta,\eta/2)
=
\frac{\|R(Y_{\eta/2})-Y_{\eta}\|_{L^2(W,\{\mathbf X_k\})}}
{\|R(Y_{\eta/2})\|_{L^2(W,\{\mathbf X_k\})}+\varepsilon_{0,Y}}
$$
It also records whether active root-ledger entries match between $\eta$ and $\eta/2$ after matching source, receiver, root class, and branch status. A convergence plot is not promotion evidence unless the table row containing the plotted quantity is present and tied to the campaign artifact hash.

Regulator extrapolation fits must report the fitted observable, the regulator ladder, the assumed asymptotic form, excluded points if any, stability under fit-window changes, endpoint or singular-window controls when they affect the extrapolation, and a negative-control observable. A fit that behaves smoothly but has no declared observable map, topology, normalization, volume or window estimate when relevant, remainder bound, or independent continuum reconstruction remains below theorem-grade evidence.

### Negative control (null test, mandatory)

Run at least one intentionally wrong model choice, such as a wrong history kernel, a swapped transmitter/receiver factor, or a perturbed emission-time solver. Keep the numerical wake-speed normalization fixed at $c_f=1$ even in the negative control.

Pass condition for the *pipeline* (not the null run): the null run must break expected invariants by a clear margin, with at least one of:

- invariant drift increase by $\ge 5\times$ relative to the validated run,
- provenance instability $D_W>0.10$ or $D_{JS}>0.05$,
- stability-window shift $>0.10$.

If the null run still passes the convergence gates above, treat the claim as numerically unvalidated.

### Global acceptance rule

A claim is numerically validated only if all applicable refinement gates pass and the null test fails as required. Conditional gates such as revised branch-coordinate model selection apply only when the claim changes the reduced coordinate, chart partition, or residual basis before rerun.
