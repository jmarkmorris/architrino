# Equal-Period Constraint Qualification

Promotion status: `priority-only`. This packet turns the projection evidence in [equal-period-projection-results.md](equal-period-projection-results.md) into a local proof route for the exact-antipodal $M=2$ dynamics search. It does not retain a branch. Its role is to separate the period row, which now appears locally controllable, from the force, curvature, unit-speed, root, event, and action rows that remain open.

---

## 1. Chart And Length Map

Work in the exact-antipodal $M=2$ vector Fourier chart used in [intrinsic-m2-collocation-rank-results.md](intrinsic-m2-collocation-rank-results.md), [intrinsic-m2-nonlinear-solve-results.md](intrinsic-m2-nonlinear-solve-results.md), and [intrinsic-m2-refined-solve-results.md](intrinsic-m2-refined-solve-results.md). For each binary $a\in\{1,2,3\}$,

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
\delta\mathbf{Z}_{a,-}(\theta)
=
-\delta\mathbf{Z}_{a,+}(\theta).
$$

Let

$$
\alpha\in\mathbb{R}^{36}
$$

denote the coefficient vector after the fixed seed row and phase convention have been chosen. Let

$$
L_a(\alpha)
=
\int_0^{2\pi}
\left\|
\partial_{\theta}\mathbf{Z}_{a,+}(\theta;\alpha)
\right\|d\theta
$$

be the binary length. Exact antipodality gives the same length for the minus partner. Define the equal-period map

$$
\mathbf{L}(\alpha)
=
\left(
L_2(\alpha)-L_1(\alpha),
L_3(\alpha)-L_1(\alpha)
\right).
$$

The equal-period row is

$$
\mathbf{L}(\alpha)=\mathbf{0}.
$$

The refined candidate had

$$
\mathbf{L}(\alpha_0)
\approx
(-0.0483405794,\ 0.0287232260),
$$

with length spread

$$
\Delta L_{\max}\approx0.0770638055R.
$$

The projection packet computed

$$
\operatorname{singular\ values}D\mathbf{L}(\alpha_0)
\approx
(7.5839341802,\ 4.3580357148),
$$

and a minimum-norm correction

$$
\|\Delta\alpha_L\|\approx0.0126750530,
\qquad
\max_k|\Delta\alpha_{L,k}|\approx0.0075667770.
$$

The full projected row closed the length spread to

$$
\Delta L_{\max}\approx2.5844\times10^{-5}R
$$

while preserving root count, noncollision, and Jacobian margin.

---

## 2. Equal-Period Manifold Lemma

**Lemma target: equal-period constraint qualification.** Let $\alpha_0$ be an exact-antipodal intrinsic-curve candidate inside a certified active-root chart. Assume:

1. the gauge-reduced derivative $D\mathbf{L}(\alpha_0)$ has rank $2$;
2. the root/Jacobian barrier hypotheses of [root-jacobian-barrier-lemma.md](root-jacobian-barrier-lemma.md) hold on a coefficient ball $B_r(\alpha_0)$;
3. the support and noncollision margins stay positive on $B_r(\alpha_0)$.

Then, after possibly shrinking $r$, the equal-period set

$$
\mathcal{M}_L
=
\left\{
\alpha\in B_r(\alpha_0):
\mathbf{L}(\alpha)=\mathbf{0}
\right\}
$$

is a $C^1$ codimension-$2$ submanifold of the root chart. Its tangent space at any equal-period point $\alpha$ is

$$
T_{\alpha}\mathcal{M}_L
=
\ker D\mathbf{L}(\alpha).
$$

Moreover the restricted root, force, unit-speed, and curvature residual maps are $C^1$ functions on $\mathcal{M}_L$ as long as the same active-root labels and barrier floors remain valid.

### Proof Route

The length function is a smooth functional of the Fourier coefficients wherever

$$
\left\|
\partial_{\theta}\mathbf{Z}_{a,+}(\theta;\alpha)
\right\|>0
$$

on the chart. The positive support and noncollision margins prevent the accepted step from leaving the declared geometric chart, while the root/Jacobian barrier lemma supplies smooth continuation of the retained delayed roots. Rank $D\mathbf{L}(\alpha_0)=2$ therefore lets the implicit function theorem apply to $\mathbf{L}$. The tangent-space identity is the standard differential characterization of a regular level set. The residual maps inherit $C^1$ regularity because the roots, Jacobians, tangents, normal projectors, and curvature vectors are smooth on the same chart.

This lemma is only a local proof route. The finite-difference singular values above are a screened certificate, not an interval proof. A retained packet must replace them with either interval bounds, automatic-differentiation certificates, or a reproducible finite-difference tolerance ledger.

---

## 3. Restricted Dynamics Residual

On the equal-period manifold, the dynamics problem is not

$$
D\mathcal{F}(\alpha)\Delta\alpha
=
-\mathcal{F}(\alpha)
$$

in all $36$ coefficients. It is the restricted problem

$$
\Delta\alpha\in T_{\alpha}\mathcal{M}_L
=
\ker D\mathbf{L}(\alpha).
$$

Let

$$
\mathcal{H}(\alpha,\Gamma)
=
\left(
\mathcal{R}_T(\alpha),
\mathcal{R}_{\mathrm{tan}}(\alpha),
\mathcal{R}_{\mathrm{curv}}(\alpha,\Gamma)
\right)
$$

where

$$
\mathcal{R}_{\mathrm{curv},i,n}
=
\mathbf{K}_{i,n}
-
\Gamma P_{i,n}^{\perp}\widetilde{\mathbf{F}}_{i,n}.
$$

This is the constant-speed Fourier version of the restricted residual. In the arclength-inverse shape chart of [unit-speed-chart-reparameterization.md](unit-speed-chart-reparameterization.md), $\mathcal{R}_T$ is replaced by the regularity floor $S_i>0$, and the restricted physical residual is

$$
\mathcal{H}_{\mathrm{arc}}(\alpha,\Gamma)
=
\left(
\mathcal{R}_{\mathrm{tan}}(\alpha),
\mathcal{R}_{\mathrm{curv}}(\alpha,\Gamma)
\right),
$$

with roots and curvature computed after inverse arclength reparameterization.

If $N_L$ is a matrix whose columns span $\ker D\mathbf{L}(\alpha)$, the first-order equal-period Newton target is

$$
D\mathcal{H}(\alpha,\Gamma)N_L\,\xi
+
\partial_{\Gamma}\mathcal{H}(\alpha,\Gamma)\Delta\Gamma
=
-\mathcal{H}(\alpha,\Gamma).
$$

Equivalently, away from an already projected point, use the constrained step

$$
\min_{\Delta\alpha,\Delta\Gamma}
\left\|
\mathcal{H}
+
D_{\alpha}\mathcal{H}\Delta\alpha
+
\partial_{\Gamma}\mathcal{H}\Delta\Gamma
\right\|^2
$$

subject to

$$
D\mathbf{L}(\alpha)\Delta\alpha
=
-\mathbf{L}(\alpha),
$$

plus trust-region, support, noncollision, and Jacobian barriers.

Thus the useful rank test is no longer the full-column rank of the unconstrained $M=2$ residual matrix. It is the rank and range test of the restricted matrix

$$
\left[
D\mathcal{H}(\alpha,\Gamma)N_L
\quad
\partial_{\Gamma}\mathcal{H}(\alpha,\Gamma)
\right].
$$

If

$$
-\mathcal{H}(\alpha,\Gamma)
\notin
\operatorname{range}
\left[
D\mathcal{H}(\alpha,\Gamma)N_L
\quad
\partial_{\Gamma}\mathcal{H}(\alpha,\Gamma)
\right],
$$

then the exact-antipodal $M=2$ equal-period chart is locally too small at that point. The correct response is to increase modes, relax exact antipodality, change the active-root chart with a new certificate, or introduce a declared action/medium row. It is not to hide length mismatch inside the period row.

---

## 4. Dynamics-Zero Theorem Target

**Theorem target: exact-antipodal equal-period $M=2$ dynamics zero.** Fix:

1. the exact-antipodal $M=2$ Fourier chart;
2. a gauge convention;
3. a polarity row;
4. a support band;
5. one certified active-root ledger.

Suppose there exist $\alpha_*$ and $\Gamma_*$ such that

$$
\mathbf{L}(\alpha_*)=\mathbf{0},
$$

$$
\mathcal{R}_T(\alpha_*)=\mathbf{0},
$$

$$
\mathcal{R}_{\mathrm{root}}(\alpha_*)=\mathbf{0},
$$

$$
\mathcal{R}_{\mathrm{tan}}(\alpha_*)=\mathbf{0},
$$

and

$$
\mathcal{R}_{\mathrm{curv}}(\alpha_*,\Gamma_*)=\mathbf{0},
$$

with strict margins

$$
d_{\min}>\epsilon_x,
\qquad
J_{\min}>\epsilon_J,
\qquad
\eta_{\min}>\epsilon_{\eta},
$$

positive support margin, finite memory, and no required root row assigned `reject`. Then $\alpha_*$ is a retained exact-antipodal same-level dynamics candidate.

It becomes a retained physical same-level branch only after the event/action, return-map, stability, exposure, and observer-export rows close on the same state history and the same active-root ledger.

---

## 5. Interpretation Of The Projection Result

The equal-period projection is strong evidence against a period-row no-go in the current chart. It shows that

$$
\mathcal{R}_L
$$

can be closed by a small coefficient correction while preserving:

$$
J_{\min}>0,
\qquad
d_{\min}>0,
\qquad
\text{root count }5\text{-}5.
$$

It does not show that the dynamics are close to solved. After projection, the best reported row still has

$$
\operatorname{rms}(\mathcal{R}_{\mathrm{tan}})
\approx0.3923,
$$

and

$$
\operatorname{rms}(\mathcal{R}_{\mathrm{curv}})
\approx0.6377.
$$

The constrained force-step diagnostic also showed that the force-improving direction is large in coefficient norm before clipping:

$$
\|\Delta\alpha\|\approx1.8048113689,
\qquad
\max_k|\Delta\alpha_k|\approx0.8520528662.
$$

That is a chart signal, not a branch. It says the residual has descent directions, but the equal-period, unit-speed, root, and support rows must be enforced during the solve.

---

## 6. Next Solver Certificate

The next accepted solver packet should report:

| Row | Required output |
| --- | --- |
| Equal-period manifold | $D\mathbf{L}$ singular values, projection norm, and rank-$2$ certificate |
| Tangent basis | numerical basis $N_L$ for $\ker D\mathbf{L}$ after gauge reduction |
| Restricted dynamics matrix | singular values of $\left[D\mathcal{H}N_L\ \partial_{\Gamma}\mathcal{H}\right]$ |
| Range test | projected residual norm and least-squares predicted reduction on $\mathcal{M}_L$ |
| Trust region | accepted $\|\Delta\alpha\|$, support margin, $d_{\min}$, $J_{\min}$, and root count after re-solving roots |
| Unit-speed row | $\mathcal{R}_T$ before and after the restricted step |
| Force rows | $\mathcal{R}_{\mathrm{tan}}$ and $\mathcal{R}_{\mathrm{curv}}$ before and after the restricted step |
| Scale row | whether $\Gamma$ is fitted, continuation-fixed, or action-derived |

For the arclength-inverse shape chart, replace the unit-speed row with the minimum construction-speed floor and report the arclength-inverse quadrature tolerance. The branch status cannot improve unless the root, force, curvature, and period rows are recomputed in that same chart.

The first arclength-inverse restricted rank screen is now recorded in [arclength-inverse-restricted-rank-screen.md](arclength-inverse-restricted-rank-screen.md). It shows that, on a $K=6$ grid, the equal-period tangent matrix has full $34$-column rank and predicts meaningful residual descent, but only through a large linear step. Therefore the next certificate is not another unconstrained rank test; it is a clipped nonlinear trust-region solve on the equal-period manifold.

The packet should use the status

$$
\texttt{constraint-qualified-equal-period-screen}
$$

only when $D\mathbf{L}$ remains rank $2$ inside the declared trust region. It should use

$$
\texttt{restricted-dynamics-rank-open}
$$

until the restricted force/unit matrix passes the range test.

Failure/status codes:

$$
\texttt{constraint-qualified-equal-period-screen},
\qquad
\texttt{restricted-dynamics-rank-open},
\qquad
\texttt{tangential-residual-open},
\qquad
\texttt{curvature-force-mismatch},
\qquad
\texttt{unit-speed-row-open},
\qquad
\texttt{not-retained}.
$$
