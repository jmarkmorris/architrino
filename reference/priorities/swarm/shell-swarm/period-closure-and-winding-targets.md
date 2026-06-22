# Period Closure And Winding Targets

Promotion status: `priority-only`. This packet isolates the period-length blocker exposed by [intrinsic-m2-refined-solve-results.md](intrinsic-m2-refined-solve-results.md). The intrinsic solver can now reduce the force residuals in an exact-antipodal $M=2$ vector Fourier basis, but it does so by allowing unequal curve lengths. A retained shell braid branch candidate must either close the equal-period row or declare rational winding data as part of a distinct branch family.

This packet states the theorem target and solver rows. It does not retain a branch.

---

## 1. Period Data

For each intrinsic curve

$$
\mathbf{Z}_i(\theta),
\qquad
\theta\in[0,2\pi),
$$

define its dimensionless length

$$
L_i
=
\int_0^{2\pi}
\left\|
\frac{d\mathbf{Z}_i}{d\theta}
\right\|d\theta.
$$

The arclength clock for site $i$ is

$$
\ell_i(q)
=
\int_0^q
\left\|
\mathbf{Z}_i'(\zeta)
\right\|d\zeta,
\qquad
\ell_i(q_i(t))=c_ft/R_*.
$$

If the six sites are to form one same-level periodic branch with a shared branch period, the length data must be compatible.

---

## 2. Equal-Length Row

The minimal same-level branch class uses one common period:

$$
L_i=L_*
\qquad
\text{for all }i=1,\ldots,6.
$$

The equal-length residual is

$$
\mathcal{R}_{L,i}
=
\frac{L_i-L_1}{\epsilon_L},
\qquad
i=2,\ldots,6.
$$

For exact-antipodal rows,

$$
\mathbf{Z}_{a,-}=-\mathbf{Z}_{a,+},
$$

the partner lengths agree automatically:

$$
L_{a,+}=L_{a,-}.
$$

Thus the equal-length row reduces to the three binary lengths:

$$
L_1=L_2=L_3.
$$

The refined $M=2$ solve failed this row with

$$
\max_iL_i-\min_iL_i
\approx0.0770638055R.
$$

That is not a small numerical detail. It means the solver used unequal clocks to reduce the force residual.

---

## 3. Equal-Length Enforcement Options

There are three safe ways to enforce the equal-length row.

### 3.1 Constrained Coefficient Projection

Let $\alpha$ be the Fourier coefficient vector. Define

$$
\mathbf{L}(\alpha)
=
\left(
L_2(\alpha)-L_1(\alpha),
L_3(\alpha)-L_1(\alpha)
\right)
$$

for an exact-antipodal three-binary chart. A Gauss-Newton step

$$
\Delta\alpha
$$

must satisfy the linearized constraint

$$
D\mathbf{L}(\alpha)\Delta\alpha
=
-\mathbf{L}(\alpha).
$$

The force residual step should therefore be solved as the constrained least-squares problem

$$
\min_{\Delta\alpha}
\left\|
\mathbf{r}(\alpha)
+D\mathbf{r}(\alpha)\Delta\alpha
\right\|^2
$$

subject to

$$
D\mathbf{L}(\alpha)\Delta\alpha
=
-\mathbf{L}(\alpha),
$$

and trust-region, support, noncollision, and Jacobian barriers.

If the gauge-reduced derivative $D\mathbf{L}(\alpha)$ has rank $2$, the equal-length row is locally a codimension-$2$ constraint manifold rather than a free penalty term. The restricted force solve must then be posed on

$$
\ker D\mathbf{L}(\alpha),
$$

as developed in [equal-period-constraint-qualification.md](equal-period-constraint-qualification.md). This distinction matters because a full-column unconstrained rank result can look promising while the actual equal-period tangent space still lacks enough force-closing directions.

### 3.2 Augmented Lagrangian

Alternatively solve

$$
\min_{\alpha}
\left[
\|\mathcal{R}_{\mathrm{tan}}\|^2
+\|\mathcal{R}_{\mathrm{curv}}\|^2
+w_T\|\mathcal{R}_{T}\|^2
+\mathcal{B}_x
+\mathcal{B}_J
+\mathcal{B}_{\mathrm{support}}
\right]
$$

with the augmented length term

$$
\Lambda_L(\alpha,\lambda_L,\rho_L)
=
\lambda_L\cdot\mathbf{L}(\alpha)
+\frac{\rho_L}{2}\|\mathbf{L}(\alpha)\|^2.
$$

The multiplier update is

$$
\lambda_L^{(k+1)}
=
\lambda_L^{(k)}
+\rho_L\mathbf{L}(\alpha^{(k+1)}).
$$

This chart is useful when the force residual and length row fight each other strongly.

### 3.3 Common-Speed Reparameterization

One may allow a computational phase $\theta_i$ for each curve and enforce a common arclength phase $\lambda$ by interpolation:

$$
\theta_i=\theta_i(\lambda),
\qquad
\frac{d\theta_i}{d\lambda}
=
\frac{L_*}{2\pi\|\partial_{\theta_i}\mathbf{Z}_i\|}.
$$

This does not remove the length row. It only prevents construction-speed variation from masquerading as a physical speed residual. The closure condition remains

$$
L_i=L_*.
$$

---

## 4. Rational-Winding Row

If the equal-length row cannot close while the force residual improves, the next branch family may declare rational winding data:

$$
m_iL_i=L_{\mathrm{com}},
\qquad
m_i\in\mathbb{N}.
$$

For exact-antipodal rows this reduces to three integers:

$$
m_aL_a=L_{\mathrm{com}},
\qquad
a=1,2,3.
$$

The branch period is then

$$
T_{\mathrm{com}}
=
\frac{R_*L_{\mathrm{com}}}{c_f}.
$$

The residual row is

$$
\mathcal{R}_{\mathrm{wind},a}
=
\frac{m_aL_a-L_{\mathrm{com}}}{\epsilon_L}.
$$

A rational-winding row is not a cosmetic fix. It changes the branch class because the active-root ledger must be recomputed over the common period, and return-map, event/action, and spin/topology rows must use the same winding data.

---

## 5. Winding Search Discipline

Before declaring a rational-winding branch, the solver must show:

$$
\left|
\frac{L_a}{L_b}
-\frac{m_b}{m_a}
\right|
<\epsilon_{\mathrm{rat}}
$$

for small integers $m_a,m_b$ under a stable refined solution. A noisy length ratio from a failed force solve is not enough.

The low-integer search should start with

$$
(m_1,m_2,m_3)
\in
\{1,2,3,4\}^3
$$

after quotienting common multiples. Each candidate must be treated as a separate branch label:

$$
q=(\mathcal{K},m_1,m_2,m_3,\mathsf{root\_policy}).
$$

The current refined $M=2$ lengths do not support a nontrivial low-integer winding row; the screen in [rational-winding-screen-results.md](rational-winding-screen-results.md) selects $(1,1,1)$ as the best primitive triple through denominator $6$. Until a later refined solve supplies stable nontrivial integer data, the equal-period chart remains the preferred route.

The failure code for a row that improves force closure only by drifting to unequal irrational lengths is

$$
\texttt{period-length-open}.
$$

The failure code for a rational-winding claim without stable integer data is

$$
\texttt{winding-row-unsupported}.
$$

---

## 6. Theorem Target

**Theorem target.** Let $\alpha_*$ be an intrinsic curve candidate with active-root ledger $\mathcal{A}_{\alpha_*}$, noncollision floor $d_{\min}>\epsilon_x$, and Jacobian floor $J_{\min}>\epsilon_J$. Suppose either:

$$
L_i(\alpha_*)=L_*(\alpha_*)
\qquad
\text{for all }i,
$$

or there are declared integers $m_i$ such that

$$
m_iL_i(\alpha_*)=L_{\mathrm{com}}(\alpha_*)
\qquad
\text{for all }i.
$$

If the same $\alpha_*$ also satisfies

$$
\mathcal{R}_{\mathrm{tan}}=0,
\qquad
\mathcal{R}_{\mathrm{curv}}=0,
\qquad
\mathcal{R}_{T}=0,
$$

and its event/action ledger closes over the same common period, then the period row is compatible with a retained shell braid dynamics candidate.

If the force rows close only while $\mathcal{R}_L$ or $\mathcal{R}_{\mathrm{wind}}$ remains open, the candidate is a useful search direction but not a retained branch.
