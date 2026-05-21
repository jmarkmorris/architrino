# Support-Complete $M=3$ Corrector System

Promotion status: `priority-only`. This packet defines the exact-antipodal $M=3$ residual, derivative, range-cokernel, action, and obstruction rows to run after [support-complete-m3-tail-resolution-protocol.md](support-complete-m3-tail-resolution-protocol.md) and [support-complete-m3-tail-execution-ledger.md](support-complete-m3-tail-execution-ledger.md) produce a support-complete tail ledger. The action-scale computation used by $R_\gamma$ is specified in [support-complete-m3-action-scale-protocol.md](support-complete-m3-action-scale-protocol.md), the Krawczyk proof-budget inequalities are specified in [support-complete-m3-krawczyk-proof-budget.md](support-complete-m3-krawczyk-proof-budget.md), and the equivalent explicit-delay formulation is stated in [support-complete-m3-augmented-root-corrector.md](support-complete-m3-augmented-root-corrector.md). It does not retain a branch. Its role is to turn the present residual descent into a mathematical solve-or-obstruct decision.

The system is local to one support-complete root ledger. If the tail pass finds roots, every row below must use the assimilated ledger. If the tail pass excludes all roots, every row below must use the certified active ledger with $\epsilon_{\mathcal{F}}^{\mathrm{tail}}=0$.

---

## 1. Ledger Fixed Before Solving

The corrector is not allowed to change the root policy while solving. Fix

$$
\mathcal{L}
=
\left(
\eta_{\mathrm{mem}},
\mathcal{A}_{\eta},
\Pi_{\mathrm{src}},
\Pi_{\mathrm{end}},
\operatorname{sign}J_a,
W_{\mathcal{E}},
E_{\mathrm{tail}},
\operatorname{persist}(\mathsf{L}_{\mathrm{tail}})
\right),
$$

where $\mathcal{A}_{\eta}$ is support-complete up to the certified support bound for the declared source-pair policy. The weight $W_{\mathcal{E}}$ defines the residual norm used by the SVD, Krawczyk, and cokernel rows. The tail entries must come from the execution ledger. A pointwise-only tail certificate may seed a diagnostic corrector, but it cannot feed the Krawczyk or obstruction rows; those require

$$
\operatorname{persist}(\mathsf{L}_{\mathrm{tail}})
=
\texttt{coefficient-box}.
$$

The current target row is the exact-antipodal arclength-inverse $M=3$ chart:

$$
\mathbf{Y}_{a,-}(\lambda;u)
=
-
\mathbf{Y}_{a,+}(\lambda;u),
\qquad
a=1,2,3.
$$

Let $u\in\mathbb{R}^n$ be the gauge-reduced equal-period coefficient vector. Add a scalar force scale $\gamma$ and write

$$
x=(u,\gamma).
$$

The action row later identifies $\gamma$ with $\Gamma_B(u)$. Before that identification is certified, $\gamma$ is a dynamics-scale unknown, not a physical mass/action result.

---

## 2. Root And Force Blocks

For root label

$$
r=(i,j,n,\mu)\in\mathcal{A}_{\eta},
$$

write

$$
\mathbf{R}_r
=
\mathbf{Y}_i(\lambda_n)
-
\mathbf{Y}_j(\lambda_n-\eta_r),
\qquad
\|\mathbf{R}_r\|-\eta_r=0.
$$

The unit separation and Jacobian are

$$
\widehat{\mathbf{R}}_r
=
\frac{\mathbf{R}_r}{\eta_r},
\qquad
J_r
=
1-\mathbf{T}_j(\lambda_n-\eta_r)\cdot\widehat{\mathbf{R}}_r.
$$

The delayed force contribution is

$$
\mathbf{f}_r
=
\frac{\sigma_i\sigma_j}{\eta_r^2|J_r|}
\widehat{\mathbf{R}}_r.
$$

For each receiver and node, the support-complete force and normal force are

$$
\widetilde{\mathbf{F}}_{i,n}
=
\sum_{r\in\mathcal{A}_{i,n}}\mathbf{f}_r,
\qquad
\mathbf{A}_{i,n}
=
P_{i,n}^{\perp}\widetilde{\mathbf{F}}_{i,n}.
$$

Here

$$
P_{i,n}^{\perp}
=
I-\mathbf{T}_{i,n}\mathbf{T}_{i,n}^{T}.
$$

---

## 3. Residual Vector

The support-complete corrector residual is

$$
\mathcal{F}_{M3}(u,\gamma)
=
\begin{bmatrix}
R_T\\
R_K\\
R_{\gamma}\\
R_{\mathrm{curl}}
\end{bmatrix}.
$$

The tangential row is

$$
R_{T,i,n}
=
\mathbf{T}_{i,n}\cdot\widetilde{\mathbf{F}}_{i,n}.
$$

The curvature row is

$$
R_{K,i,n}
=
\mathbf{K}_{i,n}
-
\gamma\mathbf{A}_{i,n}.
$$

The action-scale row is

$$
R_{\gamma}
=
\gamma-\Gamma_B(u).
$$

If the action-derived scale is not yet available, the corrector may run a provisional dynamics solve on $(R_T,R_K)$ or $(R_T,R_K,\gamma-\Gamma_K^{\mathrm{fit}})$, but that outcome has status

$$
\texttt{gamma-fitted-not-derived}.
$$

The action exactness row is

$$
R_{\mathrm{curl}}
=
\frac{\operatorname{vec}_{\mathrm{skew}}\mathcal{C}(u)}
{1+\|W(u)\|_{\mathrm{F}}}.
$$

If second-variation data for $R_{\mathrm{curl}}$ are not available inside the same support-complete ledger, keep this as an interval audit after the Newton correction, not as an uncertified Newton row.

The scalar inertia audit from [support-complete-m3-action-scale-protocol.md](support-complete-m3-action-scale-protocol.md) is

$$
R_{\mathrm{iso}}
=
\sup_{\|v\|=1}
\frac{
\|\mathsf{M}_{B,\perp}Qv-m_{\mathrm{car}}Qv\|
}{m_{\mathrm{car}}}.
$$

When derivatives of $R_{\mathrm{iso}}$ are not certified, it is also a post-Krawczyk interval audit. If it fails, the scalar-$\Gamma$ corrector does not produce an action-scale candidate.

---

## 4. Root-Sensitive Derivatives

For a coefficient direction $\xi=\partial_p\mathbf{Y}$, use the root-motion formula

$$
\delta\eta_r[\xi]
=
\frac{
\widehat{\mathbf{R}}_r\cdot(\xi_i-\xi_j^-)
}{J_r},
$$

where

$$
\xi_j^-=\xi_j(\lambda_n-\eta_r),
\qquad
(\xi_j')^-=\xi_j'(\lambda_n-\eta_r).
$$

Then

$$
\delta\mathbf{R}_r
=
\xi_i-\xi_j^-+\mathbf{T}_j^-\delta\eta_r,
$$

and

$$
\delta\widehat{\mathbf{R}}_r
=
\frac{
(I-\widehat{\mathbf{R}}_r\widehat{\mathbf{R}}_r^T)
\delta\mathbf{R}_r
}{\eta_r}.
$$

The Jacobian derivative is

$$
\delta J_r
=
-
\left((\xi_j')^--\mathbf{K}_j^-\delta\eta_r\right)
\cdot
\widehat{\mathbf{R}}_r
-
\mathbf{T}_j^-
\cdot
\delta\widehat{\mathbf{R}}_r.
$$

On a fixed sign stratum for $J_r$, the force derivative is

$$
\delta\mathbf{f}_r
=
\frac{\sigma_i\sigma_j}{\eta_r^2|J_r|}
\left[
\delta\widehat{\mathbf{R}}_r
-
\left(
2\frac{\delta\eta_r}{\eta_r}
+
\frac{\delta J_r}{J_r}
\right)
\widehat{\mathbf{R}}_r
\right].
$$

The assembled derivative rows are

$$
\delta\widetilde{\mathbf{F}}_{i,n}
=
\sum_{r\in\mathcal{A}_{i,n}}\delta\mathbf{f}_r,
$$

$$
\delta R_{T,i,n}
=
\delta\mathbf{T}_{i,n}\cdot\widetilde{\mathbf{F}}_{i,n}
+
\mathbf{T}_{i,n}\cdot\delta\widetilde{\mathbf{F}}_{i,n},
$$

and

$$
\delta\mathbf{A}_{i,n}
=
\delta P_{i,n}^{\perp}\widetilde{\mathbf{F}}_{i,n}
+
P_{i,n}^{\perp}\delta\widetilde{\mathbf{F}}_{i,n},
$$

with

$$
\delta P_{i,n}^{\perp}
=
-\delta\mathbf{T}_{i,n}\mathbf{T}_{i,n}^T
-
\mathbf{T}_{i,n}\delta\mathbf{T}_{i,n}^T.
$$

Finally,

$$
\delta R_{K,i,n}
=
\delta\mathbf{K}_{i,n}
-
\gamma\delta\mathbf{A}_{i,n}
-
\delta\gamma\,\mathbf{A}_{i,n},
$$

and

$$
\delta R_{\gamma}
=
\delta\gamma-D\Gamma_B(u)[\delta u].
$$

If the scalar action row uses

$$
\Gamma_B
=
\frac{E_{\epsilon}(R_*)}{m_{\mathrm{car}}c_f^2},
$$

then the first derivative is

$$
D\Gamma_B[\delta u]
=
-\Gamma_B
\left(
\frac{DR_*[\delta u]}{R_*}
+
\frac{Dm_{\mathrm{car}}[\delta u]}{m_{\mathrm{car}}}
\right),
$$

assuming $E_{\epsilon}$ and $c_f$ are held fixed in the branch-scale row. If those quantities vary, their derivatives must be included explicitly rather than hidden in $\Gamma_B$.

---

## 5. Range-Cokernel Corrector

Define the weighted residual

$$
F(x)
=
W_{\mathcal{E}}^{1/2}\mathcal{F}_{M3}(x),
\qquad
A_0=DF(x_0).
$$

Compute a thin singular-value decomposition

$$
A_0=U_R\Sigma V^T
$$

with rank cutoff $\sigma_k>\sigma_{\mathrm{cut}}$. Let

$$
P_{\mathrm{cok}}
=
I-U_RU_R^T,
\qquad
F_R(x)
=
U_R^TF(x),
\qquad
C=V\Sigma^{-1}.
$$

For a ball $\|h\|\le\rho$ inside the chart radius $\rho_{\mathrm{chart}}$, compute

$$
Y=\|CF_R(x_0)\|,
\qquad
Z=
\sup_{\|h\|\le\rho}
\|I-CDF_R(x_0+h)\|.
$$

The range corrector passes if

$$
Z<1,
\qquad
Y+Z\rho<\rho,
\qquad
\rho\le\rho_{\mathrm{chart}}.
$$

A strong practical row is

$$
Z\le\frac12,
\qquad
Y\le\frac{\rho}{4}.
$$

This proves range closure only. It does not prove a dynamics zero until the cokernel audit passes.

---

## 6. Cokernel And Action Audits

Let $X_*$ be the Krawczyk enclosure. The cokernel audit is

$$
\epsilon_C
=
\sup_{x\in X_*}
\|P_{\mathrm{cok}}F(x)\|.
$$

The support-complete dynamics row passes only if

$$
\epsilon_C
+
\epsilon_{\mathrm{disc}}
+
\epsilon_{\mathrm{root}}
\le
\tau_{\mathrm{dyn}},
$$

with $\epsilon_{\mathcal{F}}^{\mathrm{tail}}=0$ because the tail has already been excluded or assimilated into $\mathcal{A}_{\eta}$.

The action exactness audit must also satisfy

$$
\frac{\|\mathcal{C}(u)\|_{\mathrm{F}}}
{1+\|W(u)\|_{\mathrm{F}}}
\le
\epsilon_{\mathrm{curl}}.
$$

The scalar inertia audit must satisfy

$$
R_{\mathrm{iso}}\le\epsilon_{\mathrm{iso}},
\qquad
m_{\mathrm{car}}>0.
$$

The fitted and action-derived scales are compatible only if

$$
\operatorname{dist}
\left(
\Gamma_B,
[\Gamma_K^{\mathrm{fit}}-\epsilon_{\Gamma},
\Gamma_K^{\mathrm{fit}}+\epsilon_{\Gamma}]
\right)
\le
\frac{\tau_K+\tau_M}{A_0^{\mathrm{norm}}},
$$

where $A_0^{\mathrm{norm}}$ is the force-normalization denominator used in the curvature residual. This row prevents the numerical fit $\Gamma_K^{\mathrm{fit}}$ from being promoted as an action-derived branch scale without a compatible history-action calculation.

---

## 7. Obstruction Before Relaxation

If the range corrector or cokernel audit fails, compute an adjoint cokernel basis $\ell_r$ for the same weighted residual and support-complete ledger. The obstruction scalars are

$$
b_r
=
\langle F(x_0),\ell_r\rangle_{\mathcal{E}}.
$$

An exact-antipodal local obstruction is certified only if, for at least one normalized adjoint mode,

$$
|b_r|
>
\epsilon_{\mathrm{adj}}\rho
+
\frac12L_r\rho^2
+
\epsilon_{\mathrm{disc}}
+
\epsilon_{\Gamma}
+
\epsilon_{\mathrm{act}}.
$$

If this inequality does not pass, the correct status is

$$
\texttt{continue-exact-antipodal-refine},
$$

not antipodal relaxation.

Before midpoint relaxation is opened, the higher exact-antipodal columns must also be tested using [exact-antipodal-mode-refinement-certificate.md](exact-antipodal-mode-refinement-certificate.md). A stable $M=3$ cokernel defect that is spanned by $M=4$ or $M=5$ exact-antipodal columns is a finite-mode defect, not a relaxation trigger.

If the obstruction does pass and exact-antipodal mode refinement fails on the declared ladder, midpoint relaxation is opened only when the relaxation columns span the obstructing block:

$$
\sigma_{\min}
\left(
\langle C_{\mathrm{rel},b},\ell_r\rangle_{\mathcal{E}}
\right)
>
\epsilon_{\mathrm{col}}
$$

on the obstructing row-aware symmetry block. This is the bridge to [antipodal-relaxation-column-certificate.md](antipodal-relaxation-column-certificate.md), not a shortcut around it.

---

## 8. Decision Statuses

Return

$$
\texttt{support-complete-exact-antipodal-dynamics-action-candidate}
$$

only if all of the following pass on the same ledger:

| Row | Required pass |
| --- | --- |
| tail ledger | `tail-exclusion-restored` or `tail-root-sheet-assimilated` |
| root regularity | all brackets, gaps, Jacobian floors, and sign strata certified |
| Krawczyk range | $Z<1$ and $Y+Z\rho<\rho$ |
| cokernel | $\epsilon_C+\epsilon_{\mathrm{disc}}+\epsilon_{\mathrm{root}}\le\tau_{\mathrm{dyn}}$ |
| action exactness | curl row below threshold |
| scalar inertia | $R_{\mathrm{iso}}\le\epsilon_{\mathrm{iso}}$ and $m_{\mathrm{car}}>0$ |
| scale compatibility | $\Gamma_B$ compatible with the fitted $\Gamma_K$ interval |
| refinement | off-grid and projector-drift errors below tolerance |

Return

$$
\texttt{support-complete-exact-antipodal-obstruction}
$$

only if the support-complete adjoint inequality passes with all tail, discretization, action, and active-chart errors included.

Return

$$
\texttt{continue-exact-antipodal-refine}
$$

if the proof budget fails but no adjoint obstruction is certified.

Return

$$
\texttt{open-antipodal-relaxation}
$$

only after both the exact-antipodal obstruction and the relaxation-column block-span tests pass.

---

## 9. Current $M=3$ Consequence

The exact-antipodal $M=3$ branch is still mathematically live. The known row has strong rank and descent evidence, but the present status remains

$$
\texttt{active-window-only},
\qquad
\texttt{gamma-fitted-not-derived},
\qquad
\texttt{event-action-not-computed},
\qquad
\texttt{root-ledger-floquet-stability-open}.
$$

The shortest route to a solution is now:

```text
1. certify or assimilate the support tail
2. freeze the support-complete ledger
3. run the exact-antipodal M=3 range-cokernel corrector
4. audit action curl and Gamma_B compatibility
5. test higher exact-antipodal modes if an M3 cokernel defect remains
6. only then decide candidate, obstruction, or relaxation
```

This packet makes the decisive mathematical fork explicit: the next result must be either a support-complete exact-antipodal candidate, a certified exact-antipodal obstruction, or a proof-budget failure. The current data are not yet any of those.
