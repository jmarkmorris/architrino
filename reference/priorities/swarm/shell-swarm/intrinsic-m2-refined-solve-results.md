# Intrinsic $M=2$ Refined Solve Results

Promotion status: `priority-only`. This packet records a denser-grid restart of the bounded $M=2$ exact-antipodal solve from [intrinsic-m2-nonlinear-solve-results.md](intrinsic-m2-nonlinear-solve-results.md). The aim was to discipline the off-grid peaks seen in the first six-node solve by training directly on $K=12$ phases with stronger period and construction-speed weights.

The result is again positive but not retained. The solver reduces the refined force residuals while preserving the $5$-$5$ root count, but it worsens period-length spread. The current bottleneck is no longer lack of force-balance directions; it is closing the period and unit-speed rows at the same time.

---

## 1. Restart Setup

The restart used the final coefficient vector from [intrinsic-m2-nonlinear-solve-results.md](intrinsic-m2-nonlinear-solve-results.md) as initial data. The perturbation class remained the exact-antipodal $M=2$ vector Fourier basis:

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

The restart used:

| Item | Value |
| --- | --- |
| Training phases | $K=12$ |
| Coefficient bounds | $-0.32\le\alpha_k\le0.32$ |
| Maximum function evaluations | $8$ |
| Construction-speed weight | $2.0$ |
| Period-length weight | $12.0$ |
| Jacobian barrier start | $J_{\min}<0.25$ |
| Noncollision barrier start | $d_{\min}<0.70R$ |

The solve stopped at the function-evaluation limit:

$$
n_{\mathrm{fev}}=8,
$$

with first-order optimality still open:

$$
\text{optimality}\approx3.7397061411.
$$

---

## 2. Initial Refined State

The $K=12$ diagnostics of the initial restart state were:

| Diagnostic | Initial value |
| --- | ---: |
| Weighted residual norm | $9.3049364117$ |
| Weighted residual component RMS | $0.4857137270$ |
| Tangential residual RMS | $0.5234247089$ |
| Tangential residual max | $2.0917930185$ |
| Force-versus-curvature RMS | $0.7792179545$ |
| Force-versus-curvature max | $2.7006913904$ |
| Construction-speed spread RMS | $0.2559452258$ |
| Best scalar $\Gamma_*$ | $-0.1978626044$ |
| Euclidean noncollision floor | $d_{\min}\approx0.6318525464R$ |
| Jacobian floor | $J_{\min}\approx0.3525687928$ |
| Root count | $5$-$5$ |
| Length spread | $0.0253536842R$ |

The force-versus-curvature RMS values in this packet use the reciprocal force-from-curvature diagnostic

$$
\widetilde{\mathbf{F}}-\Gamma_F^{\mathrm{fit}}\mathbf{K}.
$$

The retained intrinsic residual is

$$
\mathbf{K}-\Gamma_K^{\mathrm{fit}}P^\perp\widetilde{\mathbf{F}},
$$

and must be reported separately in later solver packets.

This is the same candidate that looked strong on the six-node training grid but exposed off-grid peaks on refinement.

---

## 3. Final Refined State

After the bounded $K=12$ restart, the diagnostics were:

| Diagnostic | Final value |
| --- | ---: |
| Weighted residual norm | $7.0716792395$ |
| Weighted residual component RMS | $0.3691386515$ |
| Tangential residual RMS | $0.3763474155$ |
| Tangential residual max | $0.8635320206$ |
| Force-versus-curvature RMS | $0.6254711562$ |
| Force-versus-curvature max | $1.1647181937$ |
| Construction-speed spread RMS | $0.1930451111$ |
| Best scalar $\Gamma_*$ | $-0.1793019677$ |
| Euclidean noncollision floor | $d_{\min}\approx0.7546405402R$ |
| Jacobian floor | $J_{\min}\approx0.2918675274$ |
| Root count | $5$-$5$ |
| Length spread | $0.0770638055R$ |
| Maximum coefficient magnitude | $0.3176373716$ |

The force rows improved on every reported measure. The noncollision floor recovered above the barrier threshold, and the active-root count stayed stable. The Jacobian floor decreased relative to the initial refined state but remained above the barrier used in this run.

The period-length row worsened:

$$
\Delta L_{\max}\approx0.0770638055R.
$$

This is the dominant reason the row is not retained.

---

## 4. Comparison With Previous $M=2$ Solve

Relative to the first $K=6$-trained candidate rescored on $K=12$, the restart changed:

| Diagnostic | Before $K=12$ restart | After $K=12$ restart |
| --- | ---: | ---: |
| Tangential RMS | $0.5233979467$ | $0.3763474155$ |
| Tangential max | $2.0916658609$ | $0.8635320206$ |
| Curvature RMS | $0.7791711200$ | $0.6254711562$ |
| Curvature max | $2.7003572972$ | $1.1647181937$ |
| Unit-spread RMS | $0.2559434794$ | $0.1930451111$ |
| $J_{\min}$ | $0.3525814124$ | $0.2918675274$ |
| $d_{\min}/R$ | $0.6318667230$ | $0.7546405402$ |
| Length spread | $0.0253536842$ | $0.0770638055$ |

The restart succeeded at reducing off-grid force peaks. It failed to preserve common-period closure.

---

## 5. Dynamics Interpretation

The intrinsic curve program has crossed an important threshold. A bounded nonlinear solve with the $M=2$ exact-antipodal vector basis can reduce both:

$$
\mathcal{R}_{\mathrm{tan}}
$$

and

$$
\mathcal{R}_{\mathrm{curv}}
$$

on a refined grid while preserving active-root count, noncollision, and a positive Jacobian floor.

The remaining blocker exposed by this run is:

$$
\mathcal{R}_L\ne0.
$$

The solver is using unequal curve lengths to improve force closure. A retained shell swarm branch candidate cannot do that unless it declares rational winding data or solves a common-period constraint.

---

## 6. Next Solve Target

The next search should stop treating period length as a soft row. It should use one of two charts.

### 6.1 Equal-Length Chart

Introduce explicit scale corrections or phase reparameterizations so that

$$
L_i=L_*
\qquad
\text{for all }i
$$

is solved as an equality. In this chart, the optimizer should use constrained least squares or an augmented Lagrangian with high-weight period rows.

### 6.2 Rational-Winding Chart

If equal length blocks force closure, declare integer winding data

$$
m_iL_i=L_{\mathrm{com}},
\qquad
m_i\in\mathbb{N},
$$

and rerun the active-root ledger on the common period

$$
T_{\mathrm{com}}=\frac{L_{\mathrm{com}}}{c_f}.
$$

This is a larger branch claim and should be treated as a separate branch family, not as a hidden fix to the equal-period row.

Failure/status codes:

$$
\texttt{promising-collocation-descent},
\qquad
\texttt{period-length-open},
\qquad
\texttt{unit-speed-row-open},
\qquad
\texttt{not-retained}.
$$
