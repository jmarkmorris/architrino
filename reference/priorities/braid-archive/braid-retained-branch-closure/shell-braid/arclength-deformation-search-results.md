# Arc-Length Deformation Search Results

Promotion status: `priority-only`. This packet records the first numerical screen after the arclength correction in [arc-length-dynamics-reduction.md](arc-length-dynamics-reduction.md). It reuses the common radial-breathing carrier class from [low-order-deformation-search-results.md](low-order-deformation-search-results.md), but evaluates roots and velocities using the arclength clock rather than the naive angle clock.

The result is important but negative: arclength timing strengthens the evidence that radial breathing can reduce tangential leakage, but the same rows still do not close the full force-versus-curvature equation.

---

## 1. Screened Class

The carrier planes are

$$
\begin{aligned}
\mathbf{p}_1(u)&=(\cos u,\sin u,0),\\
\mathbf{p}_2(u)&=(0,\cos u,\sin u),\\
\mathbf{p}_3(u)&=(\sin u,0,\cos u).
\end{aligned}
$$

For site $i=(a,\sigma)$, the curve is

$$
\mathbf{X}_{a,\sigma}(q)
=
\sigma\rho(q+\phi_a)\mathbf{p}_a(q+\phi_a),
$$

with

$$
\rho(u)=1+A\cos2u+B\sin2u,
\qquad
\phi_1=0.
$$

The physical phase $q_i(t)$ is not set equal to $t+\phi_i$. It is defined by

$$
\int_0^{q_i(t)}
\left\|
\frac{d\mathbf{X}_i}{dq}(\zeta)
\right\|d\zeta
=
c_ft
\pmod {L_i}.
$$

For this common radial row, all six curve lengths agree up to numerical quadrature:

$$
L_i=L_*.
$$

The neutral polarity row remains

$$
q_{a,+}=+\epsilon,
\qquad
q_{a,-}=-\epsilon.
$$

The active-root convention retained one partner or cross-binary positive-delay root per ordered non-self source when present. Same-source roots were not retained.

---

## 2. Residuals

For each retained hit, the dimensionless line-of-action force uses

$$
\widetilde{\mathbf{F}}_{ij}^{\alpha}
=
\frac{\mathrm{sign}(q_iq_j)W_{ij}^{\mathrm{rec},\alpha}}
{(y_{ij}^{\alpha})^2}
\hat{\mathbf{r}}_{ij}^{\alpha}.
$$

The total force projection uses

$$
\widetilde{\mathbf{F}}_i
=
\sum_{(j,\alpha)\in\mathcal{A}_i}
\widetilde{\mathbf{F}}_{ij}^{\alpha}.
$$

The arclength tangent and curvature were

$$
\mathbf{T}_i(q)=
\frac{\mathbf{X}'_i(q)}
{\|\mathbf{X}'_i(q)\|},
\qquad
\boldsymbol{\kappa}_i(q)=
\frac{1}{\|\mathbf{X}'_i(q)\|}
\frac{d\mathbf{T}_i}{dq}.
$$

Tangential closure was measured by

$$
\widetilde{\mathcal{R}}_{\mathrm{tan},i}(t)
=
\mathbf{T}_i(q_i(t))\cdot\widetilde{\mathbf{F}}_i(t).
$$

The vector dynamics screen used the best scalar coupling row

$$
\Gamma_*
=
\arg\min_{\Gamma}
\sum_{i,t}
\left\|
\widetilde{\mathbf{F}}_i(t)
-\Gamma\boldsymbol{\kappa}_i(q_i(t))
\right\|^2,
$$

and then measured

$$
\widetilde{\mathcal{R}}_{\mathrm{dyn},i}(t)
=
\widetilde{\mathbf{F}}_i(t)
-\Gamma_*\boldsymbol{\kappa}_i(q_i(t)).
$$

This is still only a screening row. A retained branch must derive $\Gamma$ from the energy/action and scale ledger rather than choose it by least squares.

---

## 3. Baseline Re-Checks

The arclength evaluator reproduces the rigid results at the expected scale.

| Row | Tangential RMS | Tangential max | Vector dynamics RMS | Vector dynamics max | Best $\Gamma_*$ | $J_{\min}$ | $d_{\min}/R$ | Root count |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Rigid zero-offset | $1.1125177505$ | $2.0387082119$ | $1.5035165567$ | $2.1698080038$ | $0.2021113735$ | $0.7571435071$ | $1.0000000000$ | $5$-$5$ |
| Rigid phase row $(\phi_2,\phi_3)\approx(3.267,3.267)$ | $0.8904916669$ | $1.8427355316$ | $1.3409832990$ | $1.9854100272$ | $0.2021113735$ | $0.7057740839$ | $0.9395607004$ | $5$-$5$ |

The small differences from [rigid-carrier-dynamics-results.md](rigid-carrier-dynamics-results.md) come from sample count and root-scanning tolerance, not a changed convention.

---

## 4. Previous Breathing Row Under Arclength Time

The best breathing-only row from [low-order-deformation-search-results.md](low-order-deformation-search-results.md) was

$$
A\approx0.30561886,
\qquad
B\approx0.02499254,
\qquad
\phi_2\approx3.07849141,
\qquad
\phi_3\approx3.08073199.
$$

Under the arclength clock its diagnostics were:

| Diagnostic | Result |
| --- | ---: |
| Common curve length $L_*$ | $6.8490421827R$ |
| Tangential residual RMS | $0.5747157670$ |
| Tangential residual max | $1.2171524143$ |
| Vector dynamics residual RMS after best $\Gamma_*$ | $1.3916368620$ |
| Vector dynamics residual max after best $\Gamma_*$ | $2.9586363865$ |
| Best scalar $\Gamma_*$ | $-0.0059652468$ |
| Euclidean noncollision floor | $d_{\min}\approx0.8425171970R$ |
| Jacobian floor | $J_{\min}\approx0.4133511762$ |
| Root count per receiver and sampled phase | $5$-$5$ |

Compared with the same geometric row under the naive angle clock, the tangential RMS improves from about $0.6663$ to about $0.5747$. Thus the deformation direction was not an artifact. However, the full vector dynamics residual remains order one, and the best scalar coupling is nearly zero, which means the line-of-action force is poorly aligned with the curvature field of this curve.

---

## 5. Arclength-Optimized Common Breathing Row

A bounded differential-evolution plus local screen over

$$
(A,B,\phi_2,\phi_3)
$$

with the arclength evaluator found the coarse candidate

$$
A\approx0.39622470,
\qquad
B\approx-0.19066192,
$$

$$
\phi_2\approx3.05890448,
\qquad
\phi_3\approx3.02113755.
$$

On the refinement sample its diagnostics were:

| Diagnostic | Result |
| --- | ---: |
| Tangential residual RMS | $0.4658704026$ |
| Tangential residual max | $1.1024110203$ |
| Vector dynamics residual RMS after best $\Gamma_*$ | $1.4628229490$ |
| Vector dynamics residual max after best $\Gamma_*$ | $3.2748073068$ |
| Best scalar $\Gamma_*$ | $0.0139686763$ |
| Euclidean noncollision floor | $d_{\min}\approx0.6396929821R$ |
| Jacobian floor | $J_{\min}\approx0.2487273439$ |
| Root count per receiver and sampled phase | $5$-$5$ |

The coarse objective drove tangential leakage down but did not improve full dynamics. It also pushed the Jacobian floor close to a marginal value and reduced Euclidean separation. This row is not retention material.

---

## 6. Dynamics Interpretation

The arclength correction separates two facts that were mixed in the first deformation screen.

First, fixed speed should be built into the clock:

$$
\|\dot{\mathbf{y}}_i(t)\|=c_f
$$

is automatic when $q_i(t)$ is the arclength inverse. Therefore the earlier speed residual is not the decisive blocker for deformed curves.

Second, the real blocker is stronger. The force ledger must match curvature:

$$
\widetilde{\mathbf{F}}_i(t)
=
\Gamma\boldsymbol{\kappa}_i(q_i(t))
$$

with one scale row $\Gamma$ and one active-root convention. The common breathing family reduces the tangential projection but does not make the force field parallel to curvature.

This means the next retained-branch search should not optimize $\mathcal{R}_{\mathrm{tan}}$ alone. It should optimize the full vector residual

$$
\left\|
\widetilde{\mathbf{F}}
-\Gamma\boldsymbol{\kappa}
\right\|
$$

while preserving $d_{\min}$, $J_{\min}$, equal arclength periods, and event/action rows.

---

## 7. Failure Classification

The best arclength common-breathing row has:

| Row | Status |
| --- | --- |
| Active root count | screened stable on sampled phases |
| Jacobian floor | positive but marginal |
| Noncollision | positive but reduced |
| Fixed speed | built into arclength clock |
| Tangential closure | improved but failed |
| Force-versus-curvature closure | failed |
| Same-source root | not retained |
| Event/action ledger | not computed |
| Stability row | not computed |

The correct failure codes are:

$$
\texttt{tangential-residual-open},
\qquad
\texttt{curvature-force-mismatch},
\qquad
\texttt{jacobian-floor-violation}\ \text{risk under refinement}.
$$

The main live hypothesis is now narrower: a viable same-level branch likely requires site-specific curve deformation, plane-normal motion, a controlled self/fold-layer contribution, or a declared medium-response term. Common breathing alone is not enough.
