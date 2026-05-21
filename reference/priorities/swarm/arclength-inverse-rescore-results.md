# Arclength-Inverse Rescore Results

Promotion status: `priority-only`. This packet rescored the refined exact-antipodal $M=2$ candidate, and its equal-period projection, in the arclength-inverse shape chart described in [unit-speed-chart-reparameterization.md](unit-speed-chart-reparameterization.md). It recomputes delayed roots, tangents, curvature, and force after inverse arclength reparameterization rather than treating the construction phase as arclength.

No branch is retained.

---

## 1. Purpose

The earlier $M=2$ packets report a nonzero construction-speed spread. The reparameterization packet shows that this row is a chart row when the curve-speed floor

$$
S_i(\theta)=\|\partial_\theta\mathbf{Z}_i(\theta)\|
$$

stays positive. The present rescore asks whether the force and curvature rows improve, degrade, or remain essentially unchanged after using the inverse arclength clock.

The test used:

1. the refined $M=2$ coefficient vector from [intrinsic-m2-refined-solve-results.md](intrinsic-m2-refined-solve-results.md);
2. the minimum-norm equal-period projection from [equal-period-projection-results.md](equal-period-projection-results.md);
3. one positive delayed root for each non-self source at each collocation row, matching the existing $5$-$5$ active-root convention;
4. no self or medium-response terms;
5. the same neutral polarity row.

---

## 2. Geometry Floors

The equal-period projection closes the length row and preserves a positive construction-speed floor:

| Row | Length spread | $\min S_i$ | $\max S_i$ |
| --- | ---: | ---: | ---: |
| Refined $M=2$ candidate | $0.0770638055$ | $0.6946504150$ | $1.8085561365$ |
| Equal-period projected candidate | $2.5844268\times10^{-5}$ | $0.6903544930$ | $1.8030269714$ |

Thus inverse arclength is numerically admissible on both rows. The projected row is the relevant one for same-level equal-period continuation.

---

## 3. Dual Curvature Diagnostics

Two scalar curvature diagnostics were computed because the existing packets have used both conventions.

The retained intrinsic convention is curvature-from-force:

$$
\mathcal{R}_{K}
=
\mathbf{K}
-
\Gamma_K^{\mathrm{fit}}P^\perp\widetilde{\mathbf{F}},
$$

with

$$
\Gamma_K^{\mathrm{fit}}
=
\frac{\sum \mathbf{K}\cdot P^\perp\widetilde{\mathbf{F}}}
{\sum \|P^\perp\widetilde{\mathbf{F}}\|^2}.
$$

Many earlier screens also reported the reciprocal force-from-curvature diagnostic:

$$
\mathcal{R}_{F}
=
\widetilde{\mathbf{F}}
-
\Gamma_F^{\mathrm{fit}}\mathbf{K},
$$

with

$$
\Gamma_F^{\mathrm{fit}}
=
\frac{\sum \widetilde{\mathbf{F}}\cdot\mathbf{K}}
{\sum \|\mathbf{K}\|^2}.
$$

These are equivalent only at an exact scalar-aligned zero, with

$$
\Gamma_K\Gamma_F=1.
$$

Away from zero they measure different failures. This rescore therefore reports both.

---

## 4. $K=12$ Rescore

On the same $K=12$ density used in [equal-period-projection-results.md](equal-period-projection-results.md):

| Row | Tangential RMS | Tangential max | $\mathcal{R}_{K}$ RMS | $\mathcal{R}_{K}$ max | $\Gamma_K^{\mathrm{fit}}$ | $\mathcal{R}_{F}$ RMS | $\mathcal{R}_{F}$ max | $\Gamma_F^{\mathrm{fit}}$ | $d_{\min}/R$ | $J_{\min}$ | Root count |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Refined | $0.3888520147$ | $0.9477447445$ | $0.8962188862$ | $1.7743043039$ | $-0.5644805778$ | $0.6361861993$ | $1.2889560509$ | $-0.1781742839$ | $0.7231982728$ | $0.2886585450$ | $5$-$5$ |
| Equal-period projected | $0.3923320928$ | $1.0053542516$ | $0.8952027047$ | $1.7769185674$ | $-0.5749080154$ | $0.6377414350$ | $1.3568322816$ | $-0.1813488935$ | $0.7125242695$ | $0.2925489675$ | $5$-$5$ |

The reciprocal force-from-curvature row reproduces the prior projection packet closely:

$$
\operatorname{rms}(\mathcal{R}_{F})
\approx0.6377
$$

for the projected candidate. The intrinsic curvature-from-force row is harsher:

$$
\operatorname{rms}(\mathcal{R}_{K})
\approx0.8952.
$$

Thus the equal-period row remains under control, but the actual intrinsic curvature equation is not as close as the reciprocal diagnostic alone suggests.

---

## 5. $K=18$ Rescore

The same rows were rescored on $K=18$ collocation phases:

| Row | Tangential RMS | Tangential max | $\mathcal{R}_{K}$ RMS | $\mathcal{R}_{K}$ max | $\Gamma_K^{\mathrm{fit}}$ | $\mathcal{R}_{F}$ RMS | $\mathcal{R}_{F}$ max | $\Gamma_F^{\mathrm{fit}}$ | $d_{\min}/R$ | $J_{\min}$ | Root count |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Refined | $0.5581476305$ | $2.1129921833$ | $0.9471231148$ | $1.8418068940$ | $-0.2010351073$ | $0.8805260801$ | $2.8755369523$ | $-0.1039411085$ | $0.6297271710$ | $0.2886585450$ | $5$-$5$ |
| Equal-period projected | $0.5537026732$ | $2.0955433905$ | $0.9571846635$ | $1.8460898121$ | $-0.2078947070$ | $0.8837807218$ | $2.9279888366$ | $-0.1076642326$ | $0.6363675749$ | $0.2925489675$ | $5$-$5$ |

The $K=18$ rescore exposes off-grid peaks again. Equal-period projection does not remove them. The root count stays stable, but the force rows remain far from retention.

---

## 6. Interpretation

The arclength-inverse rescore sharpens the dynamics picture:

1. The construction-speed row was not a physical no-go. The projected candidate has $S_{\min}\approx0.6904$, so fixed speed can be imposed by inverse arclength.
2. Equal-period projection remains valid in the geometric chart. It closes length spread to the quadrature scale and preserves root count, $d_{\min}$, and $J_{\min}$.
3. The force residuals remain open. In particular, $K=18$ tangential maxima return to about $2.1$, and reciprocal curvature maxima return to about $2.9$.
4. The $\Gamma$ convention matters. The older $\mathcal{R}_{F}$ diagnostic is useful for comparison with previous packets, but the retained intrinsic row is $\mathcal{R}_{K}$.

The next rank screen should therefore use the arclength-inverse chart and report the restricted matrix

$$
D\left(\mathcal{R}_{\mathrm{tan}},\mathcal{R}_{K}\right)N_L
$$

on the equal-period manifold. It should also continue to report the reciprocal $\mathcal{R}_{F}$ row as a compatibility diagnostic with the earlier numerical history.

Failure/status codes:

$$
\texttt{arclength-inverse-rescored},
\qquad
\texttt{equal-period-preserved},
\qquad
\texttt{off-grid-residual-peak},
\qquad
\texttt{gamma-convention-sensitive},
\qquad
\texttt{tangential-residual-open},
\qquad
\texttt{curvature-force-mismatch},
\qquad
\texttt{not-retained}.
$$
