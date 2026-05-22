# Finite-Mode Rank Screen Results

Promotion status: `priority-only`. This packet records a finite-difference rank screen around the best common plane-normal row from [plane-normal-precession-search-results.md](plane-normal-precession-search-results.md). It tests whether that six-parameter low-mode family has enough local directions to reduce the intrinsic curve residual.

The answer is negative in a precise way: the local Jacobian is full rank in its six columns, but those six directions explain only a small part of the residual vector. This supports moving to the full collocation solver in [intrinsic-curve-solver-protocol.md](intrinsic-curve-solver-protocol.md) rather than continuing to tune the same small ansatz.

---

## 1. Linearized Screen Point

The screen point was the common plane-normal row

$$
A\approx-0.35346601,
\qquad
B\approx0.16632878,
$$

$$
C\approx0.07616684,
\qquad
D\approx0.03420821,
$$

$$
\phi_2\approx6.29032702,
\qquad
\phi_3\approx0.12208002.
$$

The six-parameter vector is

$$
\alpha=(A,B,C,D,\phi_2,\phi_3).
$$

On the eight-sample arclength grid, its diagnostic rows were:

| Diagnostic | Result |
| --- | ---: |
| Tangential RMS | $0.5404134068$ |
| Force-versus-curvature RMS | $0.9503577733$ |
| Best scalar $\Gamma_*$ | $-0.3294196308$ |
| Euclidean noncollision floor | $d_{\min}\approx0.8375410472R$ |
| Jacobian floor | $J_{\min}\approx0.3712720865$ |
| Root count | $5$-$5$ |
| Length spread | below $2\times10^{-14}R$ |

The refined grid in [plane-normal-precession-search-results.md](plane-normal-precession-search-results.md) is stricter, but the eight-sample row is sufficient for a local rank diagnostic.

---

## 2. Residual Vector

The residual vector stacked the tangential scalar and vector curvature mismatch:

$$
\mathbf{r}(\alpha)
=
\left(
\{\mathbf{T}_{i,n}\cdot\widetilde{\mathbf{F}}_{i,n}\}_{i,n},
\{\widetilde{\mathbf{F}}_{i,n}-\Gamma_*(\alpha)\mathbf{K}_{i,n}\}_{i,n}
\right).
$$

Here

$$
\Gamma_*(\alpha)
=
\frac{
\sum_{i,n}\widetilde{\mathbf{F}}_{i,n}\cdot\mathbf{K}_{i,n}
}{
\sum_{i,n}\|\mathbf{K}_{i,n}\|^2
}
$$

was refitted at each finite-difference evaluation. With six sites and eight samples, this produced

$$
6\cdot8
$$

tangential entries and

$$
3\cdot6\cdot8
$$

curvature-vector entries.

The residual norm was

$$
\|\mathbf{r}(\alpha_0)\|
\approx
7.5743563609,
$$

with component RMS

$$
\left(
\frac{1}{N_r}
\sum_k r_k^2
\right)^{1/2}
\approx
0.5466320855.
$$

---

## 3. Finite-Difference Jacobian

The finite-difference Jacobian was

$$
J_{\mathrm{fd}}
=
D_{\alpha}\mathbf{r}(\alpha_0),
$$

using centered steps $10^{-4}$ in each coordinate. Its singular values were:

| Index | Singular value |
| ---: | ---: |
| $1$ | $37.1737051843$ |
| $2$ | $26.3972194088$ |
| $3$ | $24.1466653512$ |
| $4$ | $16.7900662069$ |
| $5$ | $12.0365845779$ |
| $6$ | $10.2677243610$ |

Thus

$$
\operatorname{rank}J_{\mathrm{fd}}=6,
\qquad
\kappa(J_{\mathrm{fd}})\approx3.6204424542.
$$

The six directions are numerically independent. The failure is not column degeneracy.

---

## 4. Least-Squares Step

The linear least-squares step solving

$$
J_{\mathrm{fd}}\Delta\alpha
\approx
-\mathbf{r}(\alpha_0)
$$

was

$$
\Delta\alpha
\approx
(-0.0705873,\ 0.0669722,\ -0.0424286,\ -0.0176960,\ 0.0360789,\ -0.0322543).
$$

Its norm was

$$
\|\Delta\alpha\|\approx0.1179965938.
$$

The predicted residual norm after the linear step was

$$
\|\mathbf{r}+J_{\mathrm{fd}}\Delta\alpha\|
\approx
7.1495938101,
$$

with component RMS

$$
\approx0.5159774889.
$$

The predicted relative improvement is only

$$
1-
\frac{
\|\mathbf{r}+J_{\mathrm{fd}}\Delta\alpha\|
}{
\|\mathbf{r}\|
}
\approx
0.0560790291.
$$

The step also pushes the radial coefficients toward a broader support-band excursion:

$$
A+\Delta A\approx-0.4241,
\qquad
B+\Delta B\approx0.2333,
$$

so a real trust-region step would need support-band and Jacobian barriers before accepting it.

---

## 5. Interpretation

The rank screen says:

1. the common radial-plus-normal family has six genuinely active residual directions;
2. those directions do not span enough of the tangential-plus-curvature residual to close the branch locally;
3. the best linear correction wants to move toward larger support-band deformation;
4. continuing to tune the same six variables is unlikely to retain a branch.

The correct next mathematical object is therefore the full collocation problem with many Fourier coefficients, gauge rows, hard period constraints, and hard root/Jacobian barriers. This is exactly the protocol in [intrinsic-curve-solver-protocol.md](intrinsic-curve-solver-protocol.md).

Failure codes:

$$
\texttt{low-mode-rank-insufficient},
\qquad
\texttt{curvature-force-mismatch},
\qquad
\texttt{tangential-residual-open},
\qquad
\texttt{not-retained}.
$$

