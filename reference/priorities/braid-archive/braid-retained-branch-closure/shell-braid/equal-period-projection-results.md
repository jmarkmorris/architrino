# Equal-Period Projection Results

Promotion status: `priority-only`. This packet tests the period blocker identified in [intrinsic-m2-refined-solve-results.md](intrinsic-m2-refined-solve-results.md) and formalized in [period-closure-and-winding-targets.md](period-closure-and-winding-targets.md). The question is whether the refined $M=2$ exact-antipodal candidate can be projected back to equal binary lengths with a small coefficient correction, and how much force closure that projection gives back.

No branch is retained.

---

## 1. Starting Candidate

The starting point is the refined $M=2$ exact-antipodal vector Fourier candidate from [intrinsic-m2-refined-solve-results.md](intrinsic-m2-refined-solve-results.md). On the $K=12$ grid it had:

| Diagnostic | Starting value |
| --- | ---: |
| Tangential residual RMS | $0.3763297069$ |
| Tangential residual max | $0.8634360460$ |
| Force-versus-curvature RMS | $0.6254654501$ |
| Force-versus-curvature max | $1.1645708394$ |
| Construction-speed spread RMS | $0.1930425698$ |
| Best scalar $\Gamma_*$ | $-0.1793002001$ |
| Euclidean noncollision floor | $d_{\min}\approx0.7546993670R$ |
| Jacobian floor | $J_{\min}\approx0.2919005315$ |
| Root count | $5$-$5$ |
| Maximum coefficient magnitude | $0.3176373716$ |

The curvature numbers in this packet use the reciprocal force-from-curvature diagnostic

$$
\mathcal{R}_{F}
=
\widetilde{\mathbf{F}}-\Gamma_F^{\mathrm{fit}}\mathbf{K},
$$

for comparison with earlier screens. The retained intrinsic row is instead

$$
\mathcal{R}_{K}
=
\mathbf{K}-\Gamma_K^{\mathrm{fit}}P^\perp\widetilde{\mathbf{F}},
$$

as clarified in [gamma-scale-action-row.md](gamma-scale-action-row.md) and rescored in [arclength-inverse-rescore-results.md](arclength-inverse-rescore-results.md).

The three binary lengths were:

$$
(L_1,L_2,L_3)
\approx
(9.1113549620,\ 9.0630143825,\ 9.1400781880).
$$

Thus

$$
L_2-L_1\approx-0.0483405794,
\qquad
L_3-L_1\approx0.0287232260,
$$

and

$$
\Delta L_{\max}\approx0.0770638055R.
$$

---

## 2. Linearized Length Projection

Let $\alpha$ be the $36$-coefficient vector of the exact-antipodal $M=2$ basis. Define the exact-antipodal length row

$$
\mathbf{L}(\alpha)
=
\left(
L_2(\alpha)-L_1(\alpha),
L_3(\alpha)-L_1(\alpha)
\right).
$$

The finite-difference length Jacobian

$$
D\mathbf{L}(\alpha)
$$

had singular values

$$
7.5839341802,
\qquad
4.3580357148.
$$

The minimum-norm correction solving

$$
D\mathbf{L}(\alpha)\Delta\alpha
=
-\mathbf{L}(\alpha)
$$

had

$$
\|\Delta\alpha\|\approx0.0126750530,
\qquad
\max_k|\Delta\alpha_k|\approx0.0075667770.
$$

So the equal-length row is locally easy to correct in coefficient space.

---

## 3. Actual Length Projection

The actual corrected rows along this projection were:

| Projection fraction | Tangential RMS | Curvature RMS | Unit-spread RMS | $J_{\min}$ | $d_{\min}/R$ | Length spread | Max coefficient |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| $0$ | $0.3763297069$ | $0.6254654501$ | $0.1930425698$ | $0.2919005315$ | $0.7546993670$ | $0.0770638055$ | $0.3176373716$ |
| $0.25$ | $0.3796823696$ | $0.6275676512$ | $0.1937500716$ | $0.2920595660$ | $0.7433767696$ | $0.0577983592$ | $0.3175417006$ |
| $0.50$ | $0.3834727453$ | $0.6302944664$ | $0.1945471626$ | $0.2922189730$ | $0.7325558221$ | $0.0385339359$ | $0.3192164456$ |
| $0.75$ | $0.3876948474$ | $0.6336768378$ | $0.1954383520$ | $0.2923787517$ | $0.7222586429$ | $0.0192705543$ | $0.3211081398$ |
| $1.00$ | $0.3923346697$ | $0.6377422162$ | $0.1964263986$ | $0.2925403065$ | $0.7125201707$ | $0.0000258442$ | $0.3229998341$ |

The full projection closes the period row to the quadrature scale:

$$
\Delta L_{\max}\approx2.5844\times10^{-5}R.
$$

It modestly worsens force closure:

$$
\operatorname{rms}(\mathcal{R}_{\mathrm{tan}})
:
0.3763\to0.3923,
$$

and

$$
\operatorname{rms}(\mathcal{R}_{\mathrm{curv}})
:
0.6255\to0.6377.
$$

The root ledger remains stable:

$$
J_{\min}\approx0.2925,
\qquad
d_{\min}\approx0.7125R,
\qquad
\text{root count }5\text{-}5.
$$

This is the best period-row evidence so far: equal length can be restored without destroying the force progress.

---

## 4. Constrained Force Step Diagnostic

A linearized constrained least-squares step was also computed:

$$
\min_{\Delta\alpha}
\left\|
\mathbf{r}_{\mathrm{force}}(\alpha)
+D\mathbf{r}_{\mathrm{force}}(\alpha)\Delta\alpha
\right\|^2
$$

subject to

$$
D\mathbf{L}(\alpha)\Delta\alpha
=
-\mathbf{L}(\alpha).
$$

The unconstrained correction from this KKT system was large:

$$
\|\Delta\alpha\|\approx1.8048113689,
\qquad
\max_k|\Delta\alpha_k|\approx0.8520528662.
$$

Clipped steps along this direction improved the force residuals, but did not close the length row unless a much larger step was taken. The sampled clipped rows were:

| Trust radius | Tangential RMS | Curvature RMS | Unit-spread RMS | $J_{\min}$ | $d_{\min}/R$ | Length spread | Max coefficient |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| $0.05$ | $0.3665968129$ | $0.6092028432$ | $0.1928154404$ | $0.2921400716$ | $0.7656985205$ | $0.0749312538$ | $0.3411251298$ |
| $0.10$ | $0.3572729337$ | $0.5935762927$ | $0.1928102664$ | $0.2924259873$ | $0.7766634654$ | $0.0728043648$ | $0.3647301691$ |
| $0.20$ | $0.3397599882$ | $0.5640981782$ | $0.1934577943$ | $0.2931383722$ | $0.7985123689$ | $0.0685720596$ | $0.4119402478$ |
| $0.40$ | $0.3086941677$ | $0.5114342594$ | $0.1973079402$ | $0.2951240494$ | $0.8419111253$ | $0.0602171435$ | $0.5063604050$ |

This diagnostic confirms that the force residual still has strong descent directions, but the descent directions are not automatically compatible with equal-period closure at small trust radius.

---

## 5. Interpretation

The period row is not a hard no-go. The minimum-norm length projection is small and preserves the root ledger, noncollision floor, and most of the force improvement. Therefore the correct next solve is not to abandon the equal-length branch. It is to combine:

1. a force-reducing Gauss-Newton step;
2. the length-projection correction;
3. hard or augmented constraints for $\mathcal{R}_L$;
4. support-band and Jacobian barriers.

The corresponding proof route is now isolated in [equal-period-constraint-qualification.md](equal-period-constraint-qualification.md): when $D\mathbf{L}$ has rank $2$, the equal-period row should be treated as a local constraint manifold, and the force/unit residuals should be solved on $\ker D\mathbf{L}$ rather than in the full coefficient space.

The unit-speed part of that statement depends on the numerical chart. In the constant-speed Fourier chart, $\mathcal{R}_T$ remains an algebraic row. In the arclength-inverse shape chart described in [unit-speed-chart-reparameterization.md](unit-speed-chart-reparameterization.md), fixed speed is exact once $S_i>0$ and $L_i=L_*$, but the root and force rows must be recomputed through the inverse arclength maps.

The current best equal-period projected row has:

$$
\operatorname{rms}(\mathcal{R}_{\mathrm{tan}})
\approx0.3923,
\qquad
\operatorname{rms}(\mathcal{R}_{\mathrm{curv}})
\approx0.6377,
$$

with

$$
\Delta L_{\max}\approx2.6\times10^{-5}R,
\qquad
J_{\min}\approx0.2925,
\qquad
d_{\min}\approx0.7125R.
$$

This is still far from branch retention, but it is the first row that simultaneously has:

1. a stable active-root count;
2. a positive Jacobian margin;
3. noncollision;
4. nearly equal period;
5. and force residuals below the earlier rigid, polarity, radial, and common nonplanar rows.

Failure/status codes:

$$
\texttt{promising-equal-period-projection},
\qquad
\texttt{tangential-residual-open},
\qquad
\texttt{curvature-force-mismatch},
\qquad
\texttt{unit-speed-row-open},
\qquad
\texttt{not-retained}.
$$
