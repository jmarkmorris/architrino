# Convergence Tests for Non-Markovian Dynamics

This chapter defines the convergence standard for simulations that include self-hit structure and other delayed-memory effects. Its role is to specify which observables are checked, which refinement ladders are required, and what pass/fail thresholds count as numerical control rather than artifact.

Because self-hit dynamics are especially prone to fake structure under poor time or history resolution, this document should be read as a validation gate rather than as optional numerical hygiene.

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

3. Spatial refinement (grid/particle resolution increase):
- Pass if $E_{\mathrm{rel}}(\Phi\text{-map})\le 0.03$ and $E_{\mathrm{rel}}(\nabla\Phi\text{-map})\le 0.05$.
- Self-hit counts and stability-window boundaries must satisfy relative shift $\le 0.05$.

4. Cross-integrator validation (e.g., symplectic vs RK with matched resolution):
- Pass if $E_{\mathrm{rel}}(\Phi)\le 0.03$, $E_{\mathrm{rel}}(\|\nabla\Phi\|)\le 0.05$.
- Provenance agreement must satisfy $D_W\le 0.08$ and $D_{JS}\le 0.03$.

### Negative control (null test, mandatory)

Run at least one intentionally wrong model choice (wrong history kernel, wrong $c_f$, or perturbed emission-time solver).

Pass condition for the *pipeline* (not the null run): the null run must break expected invariants by a clear margin, with at least one of:

- invariant drift increase by $\ge 5\times$ relative to the validated run,
- provenance instability $D_W>0.10$ or $D_{JS}>0.05$,
- stability-window shift $>0.10$.

If the null run still passes the convergence gates above, treat the claim as numerically unvalidated.

### Global acceptance rule

A claim is numerically validated only if all four refinement gates pass and the null test fails as required.
