# Arclength-Inverse Restricted Rank Screen

Promotion status: `priority-only`. This packet runs the first restricted linear-algebra screen requested by [equal-period-constraint-qualification.md](equal-period-constraint-qualification.md) and [arclength-inverse-rescore-results.md](arclength-inverse-rescore-results.md). It tests whether the projected exact-antipodal $M=2$ candidate still has local force-closing directions after the equal-period row is removed from the tangent space.

No branch is retained.

---

## 1. Screened Point

The base point is the minimum-norm equal-period projection of the refined $M=2$ candidate. The length row at the projected point was:

$$
\mathbf{L}(\alpha_P)
\approx
(1.76109686\times10^{-5},\ 2.58442612\times10^{-5}).
$$

The finite-difference length Jacobian at $\alpha_P$ had singular values

$$
7.58152437,
\qquad
4.35680813.
$$

Thus the equal-period tangent basis had dimension

$$
\dim\ker D\mathbf{L}(\alpha_P)=34
$$

inside the $36$-coefficient exact-antipodal chart.

---

## 2. Residual Vector

The screen used the arclength-inverse shape chart. The residual was

$$
\mathcal{H}_{\mathrm{arc}}(\alpha)
=
\left(
\mathcal{R}_{\mathrm{tan}}(\alpha),
\mathcal{R}_{K}(\alpha)
\right),
$$

where

$$
\mathcal{R}_{K}
=
\mathbf{K}
-
\Gamma_K^{\mathrm{fit}}P^\perp\widetilde{\mathbf{F}}.
$$

The collocation grid was deliberately small:

$$
K=6.
$$

The residual dimension was therefore

$$
6K+18K=144.
$$

At the base point:

$$
\|\mathcal{H}_{\mathrm{arc}}(\alpha_P)\|
\approx5.2449618921,
$$

with component RMS

$$
0.4370801577.
$$

The fitted curvature-from-force scale was

$$
\Gamma_K^{\mathrm{fit}}\approx-0.8482853064.
$$

The root ledger stayed in the $5$-$5$ convention on this grid, with

$$
J_{\min}\approx0.2925469869.
$$

The sampled Euclidean noncollision floor on the $K=6$ phases was

$$
d_{\min}\approx0.9857596745R.
$$

This sampled $d_{\min}$ should not be compared directly to denser-grid floors; it is only a local rank-screen floor.

---

## 3. Full Versus Equal-Period-Restricted Matrix

Let

$$
A_{\mathrm{full}}
=
D\mathcal{H}_{\mathrm{arc}}(\alpha_P)
$$

be the $144\times36$ finite-difference matrix, and let

$$
N_L
$$

span $\ker D\mathbf{L}(\alpha_P)$. The restricted matrix is

$$
A_L
=
D\mathcal{H}_{\mathrm{arc}}(\alpha_P)N_L.
$$

The full matrix had:

| Quantity | Value |
| --- | ---: |
| Shape | $144\times36$ |
| Numerical rank | $36$ |
| Largest singular value | $42.39265491$ |
| Smallest singular value | $0.96903468$ |
| Condition number | $43.74730404$ |

The top singular values were:

$$
42.39265491,\ 29.07455866,\ 23.94261078,\ 20.23990486,\ 16.35215273,\ 12.80356218.
$$

The bottom singular values were:

$$
1.71230058,\ 1.54041987,\ 1.37725515,\ 1.28090064,\ 1.17255306,\ 0.96903468.
$$

The equal-period-restricted matrix had:

| Quantity | Value |
| --- | ---: |
| Shape | $144\times34$ |
| Numerical rank | $34$ |
| Largest singular value | $42.22412727$ |
| Smallest singular value | $0.97913755$ |
| Condition number | $43.12379519$ |

The top singular values were:

$$
42.22412727,\ 26.75756215,\ 23.29566959,\ 19.01285412,\ 16.02234551,\ 12.74761986.
$$

The bottom singular values were:

$$
1.92831680,\ 1.60526534,\ 1.43787801,\ 1.29210720,\ 1.18408285,\ 0.97913755.
$$

Thus enforcing the equal-period tangent space does not remove the local rank signal. The $M=2$ exact-antipodal chart still has independent arclength-inverse force directions after length has been projected out.

---

## 4. Linear Prediction

The full least-squares step predicted:

$$
\|\Delta\alpha_{\mathrm{full}}\|
\approx2.6850907359,
\qquad
\max_k|\Delta\alpha_k|
\approx1.3685640128,
$$

and reduced the linearized residual norm to

$$
1.9428946657.
$$

That is a predicted relative reduction of about

$$
62.95693456\%.
$$

The equal-period-restricted least-squares step predicted:

$$
\|\xi_L\|
\approx2.6204583988,
\qquad
\max_k|\xi_{L,k}|
\approx1.5165675954,
$$

and reduced the linearized residual norm to

$$
2.0285731406.
$$

That is a predicted relative reduction of about

$$
61.32339601\%.
$$

The small loss relative to the full matrix is important: it means the equal-period constraint is not the main local rank obstruction in this chart.

The large step norm is equally important. This is not an accepted Newton correction. It is a direction certificate showing that the restricted tangent space contains useful descent directions, but any actual solve must use trust regions, support floors, root/Jacobian barriers, and nonlinear recomputation.

---

## 5. Interpretation

This screen changes the current bottleneck again.

The problem is no longer:

$$
\text{the equal-period row kills the force-closing directions}.
$$

At least on the $K=6$ arclength-inverse screen, the more accurate statement is:

$$
\text{the equal-period tangent space still has rank, but the linear force-closing step is too large for immediate branch acceptance}.
$$

The next solver should therefore run a trust-region arclength-inverse constrained solve:

$$
\min_{\Delta\alpha\in\ker D\mathbf{L}}
\left\|
\mathcal{H}_{\mathrm{arc}}
+
D\mathcal{H}_{\mathrm{arc}}\Delta\alpha
\right\|^2
$$

with nonlinear re-evaluation after clipped steps. It should report whether small radii produce actual descent while preserving:

$$
\mathbf{L}\approx0,
\qquad
S_{\min}>0,
\qquad
J_{\min}>\epsilon_J,
\qquad
d_{\min}>\epsilon_x,
\qquad
\text{root count }5\text{-}5.
$$

If clipped restricted steps descend but stall at large residual, the next geometry expansion should be either:

1. $M=3$ exact-antipodal arclength-inverse modes; or
2. controlled antipodal relaxation with equal-period and arclength-inverse roots recomputed.

The first clipped-step result is now recorded in [arclength-inverse-trust-region-results.md](arclength-inverse-trust-region-results.md). It confirms nonlinear descent through $\rho=0.8$ while preserving the $5$-$5$ root convention, but rejects $\rho=1.2$ because the root count changes.

Failure/status codes:

$$
\texttt{restricted-rank-full},
\qquad
\texttt{equal-period-not-local-rank-blocker},
\qquad
\texttt{linear-step-too-large},
\qquad
\texttt{trust-region-solve-required},
\qquad
\texttt{not-retained}.
$$
