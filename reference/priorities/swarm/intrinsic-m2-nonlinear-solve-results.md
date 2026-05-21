# Intrinsic $M=2$ Nonlinear Solve Results

Promotion status: `priority-only`. This packet records the first bounded nonlinear solve using the exact-antipodal $M=2$ vector Fourier basis from [intrinsic-m2-collocation-rank-results.md](intrinsic-m2-collocation-rank-results.md). It is the strongest numerical evidence so far that the intrinsic collocation route is viable, but it does not retain a branch.

The solve substantially reduces the intrinsic residual on its training grid and preserves the $5$-$5$ active-root count. Refinement shows off-grid residual peaks, open period/unit rows, and coefficient-bound saturation. The result is a candidate direction for the next constrained solve, not a retained same-level branch.

---

## 1. Solve Setup

The base row was the common plane-normal candidate from [plane-normal-precession-search-results.md](plane-normal-precession-search-results.md), and the perturbation basis was the exact-antipodal $M=2$ vector Fourier basis:

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

$$
\delta\mathbf{Z}_{a,-}(\theta)
=
-\delta\mathbf{Z}_{a,+}(\theta).
$$

The coefficient vector has $36$ entries:

$$
3\ \text{binaries}
\times
2\ \text{modes}
\times
2\ \text{trigonometric slots}
\times
3\ \text{spatial components}.
$$

The bounded least-squares solve used coefficient bounds

$$
-0.28\le\alpha_k\le0.28,
$$

six collocation phases, and residual rows:

$$
\mathbf{r}
=
\left(
\mathcal{R}_{\mathrm{tan}},
\mathcal{R}_{\mathrm{curv}},
1.5\,\mathcal{R}_{T,\mathrm{spread}},
8\,\mathcal{R}_L,
\mathcal{P}_J,
\mathcal{P}_x
\right).
$$

The barrier rows penalized

$$
J_{\min}<0.24,
\qquad
d_{\min}<0.70R.
$$

The solve stopped at the maximum evaluation budget:

$$
n_{\mathrm{fev}}=12.
$$

It did not converge to a stationary point:

$$
\text{first-order optimality}\approx0.7256558552.
$$

---

## 2. Training-Grid Result

The initial weighted residual norm was

$$
\|\mathbf{r}_0\|\approx7.0514844887.
$$

The final weighted residual norm was

$$
\|\mathbf{r}_*\|\approx3.7363629092.
$$

The final training-grid diagnostics were:

| Diagnostic | Result |
| --- | ---: |
| Weighted residual norm | $3.7363629092$ |
| Weighted residual component RMS | $0.2732299162$ |
| Tangential residual RMS | $0.2565644842$ |
| Force-versus-curvature RMS | $0.4386543563$ |
| Construction-speed spread RMS | $0.2388868325$ |
| Best scalar $\Gamma_*$ | $-0.1704850888$ |
| Euclidean noncollision floor | $d_{\min}\approx1.0284735747R$ |
| Jacobian floor | $J_{\min}\approx0.3525687879$ |
| Root count | $5$-$5$ |
| Length spread | $0.0253536842R$ |
| Maximum coefficient magnitude | $0.2799999722$ |

The curvature RMS in this packet is the reciprocal force-from-curvature screen

$$
\widetilde{\mathbf{F}}-\Gamma_F^{\mathrm{fit}}\mathbf{K}.
$$

It is useful for continuity with earlier deformation screens, but the retained intrinsic dynamics row is the curvature-from-force residual

$$
\mathbf{K}-\Gamma_K^{\mathrm{fit}}P^\perp\widetilde{\mathbf{F}}.
$$

The active-root count, noncollision floor, and Jacobian floor all survived on the training grid. The open rows are the nonzero force residuals, construction-speed spread, and period-length spread.

---

## 3. Refined Rescore

The candidate was rescored on denser phase grids without re-optimization.

| Grid | Tangential RMS | Tangential max | Curvature RMS | Curvature max | Unit-spread RMS | $J_{\min}$ | $d_{\min}/R$ | Length spread |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| $K=6$ | $0.2565499805$ | $0.4750014349$ | $0.4386538307$ | $0.6592820073$ | $0.2388896668$ | $0.3525778244$ | $1.0284735747$ | $0.0253536842$ |
| $K=12$ | $0.5233979467$ | $2.0916658609$ | $0.7791711200$ | $2.7003572972$ | $0.2559434794$ | $0.3525814124$ | $0.6318667230$ | $0.0253536842$ |
| $K=18$ | $0.5538480706$ | $1.7929692151$ | $0.9059889518$ | $2.8581000958$ | $0.2688934639$ | $0.3232950885$ | $0.6738030969$ | $0.0253536842$ |

The refinement degrades the residuals but does not erase the signal. Compared with earlier screens, the candidate keeps a good root count and a better Jacobian floor than the marginal common-breathing row, while its refined force-versus-curvature RMS remains below the common plane-normal row's refined curvature RMS.

The main refinement failure is off-grid peaking:

$$
\max|\mathcal{R}_{\mathrm{tan}}|
\approx2.0917
\quad
\text{on }K=12,
$$

and

$$
\max\|\mathcal{R}_{\mathrm{curv}}\|
\approx2.8581
\quad
\text{on }K=18.
$$

This shows that six collocation phases are too few for certification.

---

## 4. Saturated Coefficients

Several coefficients reached the imposed box bound:

$$
|\alpha_k|\approx0.28.
$$

This matters because the solve may be asking for more deformation than the current support-band model should allow without stronger barrier terms. Coefficient saturation is not itself a failure, but it means the next solve should replace simple coefficient bounds with geometric constraints:

$$
1-\delta\le\|\mathbf{Z}_i(\theta_n)\|\le1+\delta,
$$

and

$$
\|\partial_\theta\mathbf{Z}_i(\theta_n)\|^2-\ell^2=0
$$

as hard or high-weight rows.

---

## 5. Dynamics Interpretation

This solve changes the status of the intrinsic curve program.

The six-variable common row was too small. The $M=2$ exact-antipodal vector basis is large enough to produce real descent. On the training grid it reduces:

$$
\operatorname{rms}(\mathcal{R}_{\mathrm{tan}})
\quad
\text{from about }0.4433\text{ to }0.2566,
$$

and

$$
\operatorname{rms}(\mathcal{R}_{\mathrm{curv}})
\quad
\text{from about }0.9966\text{ to }0.4387.
$$

The refined grid still fails, so the result is not a branch. But the failure is now more constructive: it points to collocation density, period/unit constraints, and support-band geometry rather than to a lack of local force-balancing directions.

---

## 6. Next Solver Target

The next solve should use:

1. at least $K=18$ training phases;
2. the same exact-antipodal $M=2$ vector Fourier basis;
3. hard or high-weight rows for $\mathcal{R}_T$ and $\mathcal{R}_L$;
4. geometric support-band inequalities rather than only coefficient bounds;
5. hard barriers for $J_{\min}$ and $d_{\min}$;
6. optional antipodal relaxation only after the exact-antipodal solve stalls under the stronger constraints.

The immediate nonlinear target is:

$$
\min_{\alpha,\ell,\Gamma}
\left[
\|\mathcal{R}_{\mathrm{tan}}\|^2
+\|\mathcal{R}_{\mathrm{curv}}\|^2
+w_T\|\mathcal{R}_T\|^2
+w_L\|\mathcal{R}_L\|^2
+\mathcal{P}_x
+\mathcal{P}_J
+\mathcal{P}_{\mathrm{support}}
\right],
$$

with refinement checks on a grid at least twice as dense as the training grid.

Failure/status codes:

$$
\texttt{promising-collocation-descent},
\qquad
\texttt{off-grid-residual-peak},
\qquad
\texttt{period-length-open},
\qquad
\texttt{unit-speed-row-open},
\qquad
\texttt{not-retained}.
$$
