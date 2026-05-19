# Convergence Tests for Non-Markovian Dynamics

This chapter defines the convergence standard for simulations that include self-hit structure and other delayed-memory effects. Its role is to specify which observables are checked, which refinement ladders are required, and what pass/fail thresholds count as numerical control rather than artifact.

Because self-hit dynamics are especially prone to fake structure under poor time or history resolution, this document should be read as a validation gate rather than as optional numerical hygiene.

All convergence claims in this chapter are finite-window claims. Passing the gates below validates the declared observables on the analysis window, with the stated detector set, history horizon, and regulator choices. It does not decide unbounded reachability questions for the full delayed dynamics; those would require a separate theorem about the global flow rather than a stronger convergence plot.

## Convergence in Non-Markovian (Self-Hit) Dynamics

### Scope and default observable set

For each claim, compute convergence on a fixed analysis window $W=[t_a,t_b]$ and detector set $\{x_k\}$ using:

- $\Phi(x_k,t)$
- $\|\nabla\Phi(x_k,t)\|$
- self-hit event rate $\lambda_{\text{self}}(x_k)$
- key invariant drift (e.g., normalized energy drift) $\epsilon_E$

### Comparison metrics (required)

For any observable $Y$ on two runs A (coarser) and B (finer), define
$$
E_{\mathrm{rel}}(Y;A,B)\equiv
\frac{\|R(Y_B)-Y_A\|_{L^2(W,\{x_k\})}}
{\|R(Y_B)\|_{L^2(W,\{x_k\})}+\varepsilon_0},
\qquad \varepsilon_0=10^{-12}.
$$
Here $R$ is restriction of the finer run to the coarser sampling grid.

For provenance distributions of solved `t_emit`, define:
$$
D_W \equiv \frac{W_1(P_A,P_B)}{\mathrm{IQR}(P_B)+\varepsilon_0},
\qquad
D_{JS}\equiv \mathrm{JSD}(P_A\|P_B),
$$
where $W_1$ is 1-Wasserstein distance and JSD is Jensen-Shannon divergence.

For delayed source-state interpolation, the run must declare an order-$q$ history interpolation operator $I_h^q$. On a fixed analysis window $W$, define
$$
E_{\mathrm{hist}}(S_\eta;\Delta h,\Delta h/2;W)
=
\frac{
\left(\sum_{m\in W}\|I_{\Delta h/2}^qS_\eta(t_{\mathrm{emit},m})-I_{\Delta h}^qS_\eta(t_{\mathrm{emit},m})\|^2w_m\right)^{1/2}
}{
\left(\sum_{m\in W}\|I_{\Delta h/2}^qS_\eta(t_{\mathrm{emit},m})\|^2w_m\right)^{1/2}+\varepsilon_0
}.
$$
For nonsmooth state-dependent delay windows, define the jump residual rows
$$
\mathcal{D}_{\mathrm{jump}}
=
\{(\xi_a,k_a,\ell_a,\xi_{\pi(a)},R_{\mathrm{jump},a})\},
\qquad
R_{\mathrm{jump},a}
=
\frac{|t_{0,\ell_a}(\xi_a)-\xi_{\pi(a)}|}
{\max(\Delta t,\Delta h,\eta/c_f,\varepsilon_0)}.
$$

### Required refinements with pass/fail thresholds

1. Temporal refinement ($\Delta t$ and $\Delta t/2$, plus $\Delta t/4$ for order check):
- Pass if $E_{\mathrm{rel}}(\Phi)\le 0.02$, $E_{\mathrm{rel}}(\|\nabla\Phi\|)\le 0.03$, and $|\Delta\lambda_{\text{self}}|/\lambda_{\text{self}}\le 0.05$.
- Estimated observed order:
$$
p_{\mathrm{obs}}(Y)=\log_2\!\frac{E_{\mathrm{rel}}(Y;\Delta t,\Delta t/2)}
{E_{\mathrm{rel}}(Y;\Delta t/2,\Delta t/4)}.
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

5. Continuum moment refinement when a run promotes a coarse PDE, kinetic moment, or Noether-Sea transport equation:
- Pass if the retained density/current channel satisfies
  $$
  E_{\mathrm{rel}}(R_{\rho}^{\mathrm{cg}})\le0.03,
  \qquad
  E_{\mathrm{rel}}(R_{P}^{\mathrm{cg}})\le0.05,
  \qquad
  E_{\mathrm{rel}}(R_E^{\mathrm{cg}})\le0.05.
  $$
- The moment-closure residual must decrease under temporal, history, and spatial refinement. A continuum plot is not promotion evidence if the next unresolved moment grows or if the memory-current residual is absorbed into fitted constants.

6. Stochastic and response refinement when a run adds Langevin, Fokker-Planck, or fluctuation-response summaries:
- For the first two moments of any declared distribution $P(z,t)$, require agreement with direct event-root ensembles:
  $$
  E_{\mathrm{rel}}(\langle z\rangle)\le0.03,
  \qquad
  E_{\mathrm{rel}}(\operatorname{Cov}(z))\le0.05.
  $$
- If a diffusion tensor $D^{ij}(z)$ is inferred from jump or ledger increments, require it to remain positive semidefinite on the retained domain and stable under refinement.
- If a response kernel $\chi_{AB}$ is promoted, require the causal dispersion residual $\mathcal R_{\mathrm{KK}}(\chi_{AB})\le0.05$ on the declared frequency band and require any fluctuation-dissipation residual to be reported from the same record.

### Machine-checkable convergence output

Every promoted claim must emit `convergence_table.csv` with one row for each required gate: temporal refinement, history-resolution refinement, history-interpolation refinement when delayed states are reconstructed from stored history, spatial refinement, cross-integrator validation, regulator ladder when used, transition-window refinement when a fold-layer or active-root status transition is claimed, and negative control. Each row records the two run identifiers being compared, the restricted observable channel, $E_{\mathrm{rel}}(\Phi)$, $E_{\mathrm{rel}}(\|\nabla\Phi\|)$, $D_W$, $D_{JS}$, $E_{\mathrm{hist}}$ when applicable, $p_{\mathrm{obs}}$, active-root mismatch, self-hit or stability-window shift, transition-window status, pass/fail status, and failure code.

For continuum or stochastic promotions, append rows for `moment-closure`, `distribution-moments`, `diffusion-tensor`, `causal-response`, and `fluctuation-dissipation` when those channels are claimed. These rows must include the artifact hash of the direct event-root run and the artifact hash of the reduced continuum or stochastic run being compared.

The regulator row must include each promoted observable $Y$ and the value of
$$
E_\eta(Y;\eta,\eta/2)
=
\frac{\|R(Y_{\eta/2})-Y_{\eta}\|_{L^2(W,\{x_k\})}}
{\|R(Y_{\eta/2})\|_{L^2(W,\{x_k\})}+10^{-12}}.
$$
It also records whether active root-ledger entries match between $\eta$ and $\eta/2$ after matching source, receiver, root class, and branch status. A convergence plot is not promotion evidence unless the table row containing the plotted quantity is present and tied to the campaign artifact hash.

### Negative control (null test, mandatory)

Run at least one intentionally wrong model choice (wrong history kernel, wrong $c_f$, or perturbed emission-time solver).

Pass condition for the *pipeline* (not the null run): the null run must break expected invariants by a clear margin, with at least one of:

- invariant drift increase by $\ge 5\times$ relative to the validated run,
- provenance instability $D_W>0.10$ or $D_{JS}>0.05$,
- stability-window shift $>0.10$.

If the null run still passes the convergence gates above, treat the claim as numerically unvalidated.

### Global acceptance rule

A claim is numerically validated only if all four refinement gates pass and the null test fails as required.
