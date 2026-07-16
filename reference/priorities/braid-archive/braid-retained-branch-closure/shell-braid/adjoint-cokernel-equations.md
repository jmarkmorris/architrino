# Adjoint Cokernel Equations

Promotion status: `priority-only`. This packet sharpens [support-complete-dynamics-obstruction-certificate.md](support-complete-dynamics-obstruction-certificate.md) and [support-complete-newton-closure-certificate.md](support-complete-newton-closure-certificate.md) by replacing an undifferentiated numerical left-null projection with the adjoint equations of the root-dependent dynamics row. A nonzero residual is an obstruction only after its component against a certified adjoint cokernel vector is too large to be removed by nonlinear remainder, tail uncertainty, discretization error, action-scale uncertainty, or a permitted chart extension.

The packet is local to one support-complete memory ledger, one root-label convention, one arclength-inverse coefficient chart, one equal-period gauge convention, one action-scale row, one residual weighting, and one finite-mode truncation.

Regeneration cadence: this priority-only packet follows the checkpoint policy in [codex-pr-branch.md](../../../../op/codex-pr-branch.md). Editing this file alone does not require generated textbook writes. Request a full regeneration checkpoint with `regenerate`, `full regeneration`, `full regen`, `regeneration checkpoint`, or:

```text
Closure goal: Regenerate.
```

---

## 1. Weighted Residual Pairing

Let

$$
\mathcal{F}_{\eta}(\alpha)
=
\begin{bmatrix}
\mathcal{R}_{\mathrm{tan}}^{(\eta)}(\alpha)\\
\mathcal{R}_{K}^{(\eta)}(\alpha)\\
\mathcal{R}_{\mathrm{act}}^{(\eta)}(\alpha)
\end{bmatrix}
\in \mathcal{E}_{\eta}
$$

denote the gauge-reduced residual map on the fixed root stratum. The third block represents whichever action, curl, scale, event, or constraint rows are included in the current certificate. Let $X$ be the reduced coefficient tangent space and let

$$
A
=
D\mathcal{F}_{\eta}(\alpha_0):X\to\mathcal{E}_{\eta}.
$$

Equip the residual space with the weighted pairing

$$
\langle u,v\rangle_{\mathcal{E}}
=
\sum_r
\int_0^L
u_r(\lambda)\cdot W_r(\lambda)v_r(\lambda)\,d\lambda
$$

plus the declared quadrature terms for scalar rows. The adjoint operator is defined by

$$
\langle A\xi,\ell\rangle_{\mathcal{E}}
=
\langle \xi,A^*\ell\rangle_X
\qquad
\text{for every }\xi\in X.
$$

The numerical cokernel is not just a small singular-value artifact. It is the finite-dimensional representation of

$$
A^*\ell=0.
$$

Thus an obstruction row should emit both a matrix left-null basis and the adjoint residual norm

$$
\|A^*\ell\|_X
$$

after applying the same root solver, memory convention, weights, and gauge quotient as the dynamics residual.

---

## 2. Root-Dependent Linear Block

For a retained root label

$$
a=(i,j,\lambda,\mu),
\qquad
\nu_a(\lambda)=\lambda-\eta_a(\lambda),
$$

the force variation from [root-dependent-variational-equation.md](root-dependent-variational-equation.md) can be written only after the same retained record emits $D_s$, $D_T$, and the differentiated receiver-normal branch strength $D_\xi W_a^{\mathrm{rec}}$:

$$
\delta\mathbf{f}_a[\xi]
=
B_{a,i}^{0}\xi_i(\lambda)
+
B_{a,j}^{0}\xi_j(\nu_a)
+
B_{a,j}^{1}\xi_j'(\nu_a).
$$

The matrices $B_{a,i}^{0}$, $B_{a,j}^{0}$, and $B_{a,j}^{1}$ are determined by the branch data

$$
\eta_a,\quad
\widehat{\mathbf{R}}_a,\quad
\mathbf{T}_{j,a}^{-},\quad
\mathbf{K}_{j,a}^{-},\quad
J_a,
$$

including the root-delay variation

$$
\delta\eta_a[\xi]
=
\frac{
\widehat{\mathbf{R}}_a\cdot
(\xi_i(\lambda)-\xi_j(\nu_a))
}{J_a}.
$$

This block notation is not a frozen-root approximation. It is a compact representation of the differentiated root solver. If any successor implementation emits $B$ matrices without including $\delta\eta_a$ and $\delta J_a$, the adjoint certificate must exit with

$$
\texttt{adjoint-frozen-root-invalid}.
$$

---

## 3. Adjoint Transfer Across A Root

Let $p_i(\lambda)$ be the multiplier paired with the projected dynamics residual at receiver site $i$. The root block above contributes three adjoint terms.

The receiver contribution is local:

$$
\mathcal{A}_{a,\mathrm{rec}}^*p
=
\left(B_{a,i}^{0}\right)^T p_i(\lambda).
$$

The delayed-source contributions are pulled back through the root graph

$$
\nu=\nu_a(\lambda).
$$

On every monotone slab where $\partial_{\lambda}\nu_a\ne0$, define the root-transfer operator

$$
\left(\mathcal{D}_{a}^{j,*}\varphi\right)(\nu)
=
\sum_{\lambda:\nu_a(\lambda)=\nu}
\frac{\varphi(\lambda)}
{|\partial_{\lambda}\nu_a(\lambda)|}.
$$

Then the source-position pullback is

$$
\mathcal{A}_{a,\mathrm{src0}}^*p
=
\mathcal{D}_{a}^{j,*}
\left(
\left(B_{a,j}^{0}\right)^T p_i
\right),
$$

and the source-tangent pullback is the integrated-by-parts term

$$
\mathcal{A}_{a,\mathrm{src1}}^*p
=
-
\partial_{\nu}
\mathcal{D}_{a}^{j,*}
\left(
\left(B_{a,j}^{1}\right)^T p_i
\right),
$$

with periodic boundary conditions on the closed branch. Therefore the force-row adjoint contribution at site $k$ is

$$
\mathcal{A}_{\mathrm{force},k}^*p
=
\sum_{a:i=k}\mathcal{A}_{a,\mathrm{rec}}^*p
+
\sum_{a:j=k}
\left(
\mathcal{A}_{a,\mathrm{src0}}^*p
+
\mathcal{A}_{a,\mathrm{src1}}^*p
\right).
$$

This transfer equation is the continuum analogue of transposing the root-recomputed finite-mode force matrix. A finite solver may use the matrix transpose directly, but the certificate should still report the slab monotonicity and transfer-density margins. If a root graph has a turning point in $\nu_a(\lambda)$, the branch must split the slab or exit with

$$
\texttt{adjoint-root-transfer-singular}.
$$

---

## 4. Full Adjoint Dynamics Row

Write the projected dynamics residual as

$$
\mathcal{R}_{K,i}
=
\mathbf{K}_i
-
\Gamma_B A_i,
\qquad
A_i=P_i^\perp\widetilde{\mathbf{F}}_i.
$$

Let $p_i$ be the multiplier for $\mathcal{R}_{K,i}$ and let $\tau_i$ be the scalar multiplier for the tangential row

$$
\mathcal{R}_{T,i}
=
\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i.
$$

In a normal arclength chart, the formal adjoint equation has the schematic form

$$
0
=
\mathcal{J}_{\mathrm{geom},i}^*p
-
\Gamma_B\mathcal{A}_{\mathrm{force},i}^*
\left(P_i^\perp p_i+\tau_i\mathbf{T}_i\right)
+
\mathcal{J}_{\mathrm{proj},i}^*p
+
\mathcal{J}_{\Gamma,i}^*p
+
\mathcal{J}_{\mathrm{act},i}^*\ell_{\mathrm{act}}.
$$

Here:

1. $\mathcal{J}_{\mathrm{geom}}^*$ is the adjoint of the curvature variation, including the arclength and equal-period constraints;
2. $\mathcal{A}_{\mathrm{force}}^*$ is the root-transfer force adjoint from Section 3;
3. $\mathcal{J}_{\mathrm{proj}}^*$ is the adjoint contribution from $\delta P_i^\perp$;
4. $\mathcal{J}_{\Gamma}^*$ is the branch-global adjoint contribution from $D\Gamma_B$;
5. $\mathcal{J}_{\mathrm{act}}^*$ collects action, curl, event, and scalar constraint rows.

The finite-mode certificate does not need to solve this operator equation symbolically. It must verify the coefficient-space version:

$$
A_N^T W_{\mathcal{E}}\ell=0,
\qquad
A_N=D(\mathcal{F}_{\eta}\circ N)(0),
$$

where $N$ embeds reduced equal-period coefficients into the full arclength-inverse chart. The continuum row above is the audit trail proving that $A_N^T$ contains delayed root transfer, source-tangent integration by parts, projector variation, and action-scale derivatives rather than a frozen-root least-squares transpose.

---

## 5. Scalar Obstruction Inequality

Normalize an adjoint cokernel vector by

$$
\|\ell\|_{\mathcal{E}}=1,
\qquad
\|A^*\ell\|_X\le\epsilon_{\mathrm{adj}}.
$$

Define its obstruction scalar

$$
b_{\ell}
=
\langle \mathcal{F}_{\eta}(\alpha_0),\ell\rangle_{\mathcal{E}}.
$$

On a certified ball $\|\delta\|\le\rho$, assume the scalar nonlinear remainder bound

$$
\left|
\left\langle
\mathcal{F}_{\eta}(\alpha_0+\delta)
-
\mathcal{F}_{\eta}(\alpha_0)
-
A\delta,
\ell
\right\rangle_{\mathcal{E}}
\right|
\le
\frac{1}{2}L_{\ell}\|\delta\|^2.
$$

The adjoint obstruction test is

$$
|b_{\ell}|
>
\epsilon_{\mathrm{adj}}\rho
+
\frac{1}{2}L_{\ell}\rho^2
+
\epsilon_{\mathcal{F}}^{\mathrm{tail}}
+
\epsilon_{\mathrm{disc}}
+
\epsilon_{\Gamma}
+
\epsilon_{\mathrm{act}}.
$$

If this inequality holds, no exact zero of the declared support-complete dynamics/action residual exists inside the ball on the fixed chart and ledger. The $\epsilon_{\mathrm{adj}}\rho$ term accounts for a numerically approximate adjoint; $\epsilon_{\Gamma}$ accounts for action-scale uncertainty; $\epsilon_{\mathrm{act}}$ accounts for the curl, event, or scalar action rows when they are interval-enclosed rather than exact.

For a cokernel basis $\ell_1,\ldots,\ell_m$, the vector form is

$$
\mathbf{b}_{\mathrm{cok}}
=
\left(
\langle\mathcal{F}_{\eta}(\alpha_0),\ell_r\rangle_{\mathcal{E}}
\right)_{r=1}^m,
$$

with a componentwise or normwise version of the same inequality. This is the adjoint version of the projection test in [support-complete-dynamics-obstruction-certificate.md](support-complete-dynamics-obstruction-certificate.md).

---

## 6. Relaxation Column Test In The Adjoint Basis

Let $\beta$ denote candidate pair-midpoint or other chart-extension variables and let

$$
C_{\mathrm{rel}}
=
D_{\beta}\mathcal{F}_{\eta}(\alpha_0).
$$

The obstruction visible to adjoint basis vectors is

$$
M_{\mathrm{rel},rb}
=
\langle C_{\mathrm{rel},b},\ell_r\rangle_{\mathcal{E}}.
$$

Antipodal relaxation is mathematically justified only if the projected relaxation matrix can control the obstructing cokernel component:

$$
\operatorname{dist}
\left(
-\mathbf{b}_{\mathrm{cok}},
\operatorname{range}M_{\mathrm{rel}}
\right)
\le
\epsilon_{\mathrm{rel}},
$$

with a declared singular-value floor on the active projected columns. If

$$
M_{\mathrm{rel}}=0
$$

on the obstructing adjoint sector, pair-midpoint relaxation is cokernel-blind and should not be opened as the next chart merely because exact-antipodal residual descent stalled.

This row is the adjoint form of [antipodal-relaxation-column-certificate.md](antipodal-relaxation-column-certificate.md).

---

## 7. Output Schema And Status Codes

A support-complete successor run should emit:

| Field | Required content |
| --- | --- |
| `adjoint_basis` | normalized left-null or near-left-null vectors in the weighted residual space |
| `adjoint_residual_norm` | $\|A^*\ell_r\|_X$ for every emitted adjoint vector |
| `root_transfer_margins` | monotone-slab margins for each delayed root graph used by the continuum adjoint audit |
| `obstruction_scalars` | $b_{\ell_r}$ and normwise $\mathbf{b}_{\mathrm{cok}}$ values |
| `adjoint_remainder_bounds` | $L_{\ell_r}$ or a certified normwise bound |
| `tail_disc_action_error_budget` | $\epsilon_{\mathcal{F}}^{\mathrm{tail}}$, $\epsilon_{\mathrm{disc}}$, $\epsilon_{\Gamma}$, and $\epsilon_{\mathrm{act}}$ |
| `relaxation_projected_columns` | $M_{\mathrm{rel}}$, singular floor, and range-distance result |
| `adjoint_decision` | one of the statuses below |

Failure/status codes:

$$
\texttt{adjoint-cokernel-basis-open},
\qquad
\texttt{adjoint-frozen-root-invalid},
\qquad
\texttt{adjoint-root-transfer-singular},
$$

$$
\texttt{adjoint-projection-unstable},
\qquad
\texttt{adjoint-obstruction-open},
\qquad
\texttt{adjoint-obstruction-certified},
$$

$$
\texttt{relaxation-columns-cokernel-blind},
\qquad
\texttt{relaxation-columns-cokernel-spanning}.
$$

Current $M=3$ rows do not yet emit a support-complete residual matrix, weighted adjoint basis, root-transfer margins, scalar obstruction budget, or projected relaxation-column matrix. Therefore the current state remains

$$
\texttt{adjoint-cokernel-basis-open},
\qquad
\texttt{tail-force-error-unbounded},
\qquad
\texttt{continue-exact-antipodal}.
$$
