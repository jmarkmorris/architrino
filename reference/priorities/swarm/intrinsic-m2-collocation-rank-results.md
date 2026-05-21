# Intrinsic $M=2$ Collocation Rank Results

Promotion status: `priority-only`. This packet records a richer finite-mode rank screen after [finite-mode-rank-screen-results.md](finite-mode-rank-screen-results.md). Instead of the six scalar common radial-plus-normal variables, this screen opens an exact-antipodal vector Fourier perturbation basis with cutoff $M=2$ around the best common plane-normal row.

The result is the first positive numerical signal that the full intrinsic collocation direction is worth pursuing: the larger basis is full rank and actual clipped least-squares steps reduce the intrinsic residual while preserving the active root count.

No branch is retained. The period and unit-speed regularity rows are still not solved exactly, and event/action rows are not computed.

---

## 1. Base Row

The base row is the common plane-normal candidate from [plane-normal-precession-search-results.md](plane-normal-precession-search-results.md):

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

In the present six-node collocation screen, the base row had:

| Diagnostic | Base result |
| --- | ---: |
| Weighted residual norm | $6.6030110423$ |
| Weighted residual component RMS | $0.4854630268$ |
| Tangential residual RMS | $0.4432679851$ |
| Force-versus-curvature RMS | $0.9966687106$ |
| Construction-speed spread RMS | $0.2916797922$ |
| Best scalar $\Gamma_*$ | $-0.4311625175$ |
| Euclidean noncollision floor | $d_{\min}\approx0.8375410472R$ |
| Jacobian floor | $J_{\min}\approx0.2521962978$ |
| Root count | $5$-$5$ |
| Length spread | below $8.1\times10^{-15}R$ |

The six-node values differ from the refined packet values because this rank screen uses a smaller collocation grid and a weighted residual vector designed for linear algebra diagnostics.

---

## 2. Perturbation Basis

For each binary $a\in\{1,2,3\}$, the plus-site curve received a vector Fourier perturbation

$$
\delta\mathbf{Z}_{a,+}(\theta)
=
\sum_{m=1}^{2}
\left(
\mathbf{c}_{a,m}\cos m\theta
+
\mathbf{s}_{a,m}\sin m\theta
\right),
$$

with

$$
\mathbf{c}_{a,m},\mathbf{s}_{a,m}\in\mathbb{R}^3.
$$

Exact antipodality was preserved:

$$
\delta\mathbf{Z}_{a,-}(\theta)
=
-\delta\mathbf{Z}_{a,+}(\theta).
$$

Thus the perturbation vector has

$$
3\ \text{binaries}
\times
2\ \text{modes}
\times
2\ \text{trigonometric slots}
\times
3\ \text{spatial components}
=36
$$

free coefficients. This basis includes radial, tangential, plane-normal, and mixed vector directions. It is still smaller than the full solver in [intrinsic-curve-solver-protocol.md](intrinsic-curve-solver-protocol.md), because it keeps exact antipodality and omits independent mean, higher-mode, and pair-midpoint degrees of freedom.

---

## 3. Residual Vector

The residual vector stacked:

1. tangential closure,
2. vector force-versus-curvature closure after fitting $\Gamma_*$,
3. a mild construction-speed spread row,
4. and a period-length row.

Symbolically,

$$
\mathbf{r}(\alpha)
=
\left(
\mathbf{T}\cdot\widetilde{\mathbf{F}},
\widetilde{\mathbf{F}}-\Gamma_*\mathbf{K},
\frac{1}{2}R_{\mathrm{speed\ spread}},
2R_L
\right).
$$

The diagnostic scale row was

$$
\Gamma_*(\alpha)
=
\frac{
\sum_{i,n}\widetilde{\mathbf{F}}_{i,n}\cdot\mathbf{K}_{i,n}
}{
\sum_{i,n}\|\mathbf{K}_{i,n}\|^2
}.
$$

This is not yet the final retained residual because a retained branch must derive $\Gamma$ from action/inertia data and must solve unit-speed and period rows as hard constraints. The point of this screen is local direction finding.

---

## 4. Finite-Difference Rank

The finite-difference Jacobian

$$
J_{\mathrm{fd}}=D_{\alpha}\mathbf{r}(\alpha_0)
$$

was computed with centered steps $2\times10^{-4}$.

It had:

| Quantity | Result |
| --- | ---: |
| Residual dimension | $185$ |
| Parameter count | $36$ |
| Numerical rank | $36$ |
| Largest singular value | $73.1581161724$ |
| Smallest singular value | $1.9316861867$ |
| Condition number | $37.8726713878$ |

The top singular values were:

$$
73.1581,\ 57.9404,\ 47.2287,\ 40.7685,\ 32.6114,\ 24.2903.
$$

The bottom singular values were:

$$
3.4590,\ 3.2726,\ 3.0659,\ 2.6194,\ 2.3553,\ 1.9317.
$$

So the $M=2$ exact-antipodal vector basis has many active local residual directions. Unlike the six-variable common row, this basis is not obviously too small at the linear-algebra level.

---

## 5. Linear Least-Squares Prediction

The unconstrained least-squares step

$$
J_{\mathrm{fd}}\Delta\alpha\approx-\mathbf{r}(\alpha_0)
$$

had

$$
\|\Delta\alpha\|\approx1.1039789524,
\qquad
\max_k|\Delta\alpha_k|\approx0.3704048749.
$$

It predicted a residual-norm reduction from

$$
6.6030110423
\quad\text{to}\quad
3.4519753906,
$$

or about

$$
47.7211931265\%
$$

relative improvement.

That unconstrained step is too large to accept as a branch correction. It is evidence for local directions, not a retained solution.

---

## 6. Actual Clipped Steps

Actual residuals were recomputed for clipped steps along the least-squares direction. The results were:

| Trust radius | Residual norm | Component RMS | Tangential RMS | Curvature RMS | Unit-spread RMS | $J_{\min}$ | $d_{\min}/R$ | Length spread |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| $0$ | $6.6030110423$ | $0.4854630268$ | $0.4432679851$ | $0.9966687106$ | $0.2916797922$ | $0.2521962978$ | $0.8375410472$ | $<8.1\times10^{-15}$ |
| $0.02$ | $6.5307817341$ | $0.4801526225$ | $0.4313223424$ | $0.9885421123$ | $0.2932454319$ | $0.2547091144$ | $0.8389871834$ | $0.0018130557$ |
| $0.05$ | $6.4335948703$ | $0.4730073021$ | $0.4149154393$ | $0.9776581728$ | $0.2951720204$ | $0.2582495483$ | $0.8411599783$ | $0.0042554824$ |
| $0.10$ | $6.2969085620$ | $0.4629579249$ | $0.3918883146$ | $0.9621459125$ | $0.2973914385$ | $0.2635268715$ | $0.8447907960$ | $0.0076032901$ |
| $0.20$ | $6.0912026229$ | $0.4478341234$ | $0.3620799900$ | $0.9365067237$ | $0.2997670232$ | $0.2715537876$ | $0.8520874830$ | $0.0116637487$ |
| $0.40$ | $5.8946507455$ | $0.4333833420$ | $0.3564324994$ | $0.9022314913$ | $0.3100246352$ | $0.2786591461$ | $0.8668169230$ | $0.0187474297$ |

The clipped steps improve the force residuals and improve both $J_{\min}$ and $d_{\min}$ in this local screen. The cost is growth in construction-speed spread and period-length spread. That cost is exactly why the full solver must impose $R_T$ and $R_L$ as equations, not diagnostic rows.

---

## 7. Dynamics Interpretation

This is the strongest numerical signal so far for the intrinsic curve route.

The low-mode scalar ansatz was too small: it had full rank but could only predict about $5.6\%$ residual-norm improvement. The $M=2$ exact-antipodal vector basis is larger and predicts almost $48\%$ improvement linearly, with actual clipped steps showing monotone residual improvement up to the tested radius.

The result does not retain a branch because:

$$
\mathcal{R}_{\mathrm{tan}}\ne0,
\qquad
\mathcal{R}_{\mathrm{curv}}\ne0,
\qquad
\mathcal{R}_{T}\ne0,
\qquad
\mathcal{R}_{L}\ne0,
$$

and no event/action ledger has been computed.

The correct next run is a constrained Gauss-Newton or Levenberg-Marquardt solve using the same $M=2$ vector basis, with $R_T$ and $R_L$ enforced strongly and with hard barriers for

$$
J_{\min}>\epsilon_J,
\qquad
d_{\min}>\epsilon_x.
$$

Failure/status codes:

$$
\texttt{promising-rank-direction},
\qquad
\texttt{tangential-residual-open},
\qquad
\texttt{curvature-force-mismatch},
\qquad
\texttt{period-length-open},
\qquad
\texttt{not-retained}.
$$

