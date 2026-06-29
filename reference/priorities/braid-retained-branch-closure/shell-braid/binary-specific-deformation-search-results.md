# Binary-Specific Deformation Search Results

Promotion status: `priority-only`. This packet records a bounded numerical dynamics screen for a binary-specific support-band deformation after the common radial and common phase rows in [low-order-deformation-search-results.md](low-order-deformation-search-results.md). It does not retain a shell braid branch. Its purpose is to determine whether independent low-order radial modes by binary/sign can reduce the coupled tangential, speed, and radial/support residuals without losing the active-root convention.

---

## 1. Search Ansatz

The screen kept the three orthogonal carrier directions

$$
\begin{aligned}
\mathbf{p}_1(\chi)&=(\cos\chi,\sin\chi,0),\\
\mathbf{p}_2(\chi)&=(0,\cos\chi,\sin\chi),\\
\mathbf{p}_3(\chi)&=(\sin\chi,0,\cos\chi),
\end{aligned}
$$

and used the neutral opposite-binary polarity row

$$
q_{a,+}=+\epsilon,
\qquad
q_{a,-}=-\epsilon.
$$

For $i=(a,\sigma)$ with $\sigma\in\{+1,-1\}$, set

$$
\eta_a(\theta)=\theta+\phi_a,
\qquad
\phi_1=0,
$$

and give every site its own second-harmonic radial mode

$$
b_{a,\sigma}(\theta)
=
A_{a,\sigma}\cos 2\eta_a
+
B_{a,\sigma}\sin 2\eta_a.
$$

The radial support and phase were coupled by

$$
\rho_{a,\sigma}(\theta)
=
R\left(1+b_{a,\sigma}(\theta)\right),
$$

$$
\chi_{a,\sigma}(\theta)
=
\eta_a
+
\frac{1}{2}B_{a,\sigma}\cos 2\eta_a
-
\frac{1}{2}A_{a,\sigma}\sin 2\eta_a.
$$

Thus

$$
\frac{d\chi_{a,\sigma}}{d\theta}
=
1-b_{a,\sigma}(\theta),
$$

so the first-order fixed-speed coupling

$$
b_{a,\sigma}
+
\frac{d}{d\theta}
\left(
\chi_{a,\sigma}-\eta_a
\right)
=0
$$

is built into the ansatz. The screened position was

$$
\mathbf{x}_{a,\sigma}(\theta)
=
\sigma\rho_{a,\sigma}(\theta)
\mathbf{p}_a\!\left(\chi_{a,\sigma}(\theta)\right).
$$

This ansatz is still small: it has twelve site-specific radial coefficients plus the two non-gauge binary phase offsets $\phi_2,\phi_3$.

---

## 2. Active-Root And Residual Convention

The active-root convention matches the earlier rigid and low-order screens:

1. for each receiver, include the same-binary partner and the four cross-binary sites;
2. exclude same-source roots unless a separate self/fold-layer row is declared;
3. solve the first positive causal-delay root $y_{ij}=\tau_{ij}c_f/R$ for each retained source;
4. reject rows that lose the $5$-$5$ root count, collide, or approach a near-tangent root.

The receiver-normal restart force sum removes the common dimensional factor and
uses $W_{ij}^{\mathrm{rec}}=\lvert D_{t,ij}/D_{s,ij}\rvert$:

$$
\mathbf{F}_i
=
\sum_{j\in\mathcal{A}_i}
\sigma_i\sigma_j
\frac{W_{ij}^{\mathrm{rec}}}
{y_{ij}^2}
\hat{\mathbf{r}}_{ij}.
$$

The tangential residual was

$$
\widetilde{\mathcal{R}}_{\mathrm{tan},i}
=
\mathbf{u}_i\cdot\mathbf{F}_i.
$$

The speed residual was

$$
\mathcal{R}_{\mathrm{speed},i}
=
\|\mathbf{u}_i\|-c_f.
$$

For the radial/support row, define

$$
\widetilde{\Xi}_i
=
\hat{\mathbf{n}}_i\cdot\mathbf{F}_i,
$$

and

$$
K_i
=
-
\rho_i''
+
\frac{1-(\rho_i')^2}{\rho_i}.
$$

For each candidate, the best constant scale/coupling row was fitted by

$$
\Gamma_R^*
=
-
\frac{\langle\widetilde{\Xi},K\rangle}
{\langle K,K\rangle},
$$

and the measured radial residual was

$$
\widetilde{\mathcal{R}}_{\mathrm{rad},i}
=
\widetilde{\Xi}_i+\Gamma_R^*K_i.
$$

This makes the radial diagnostic stricter than a rigid-radius force projection but still leaves the scale/coupling row as a fitted constant rather than a derived branch parameter.

---

## 3. Numerical Objective

The bounded screen used $R=c_f=1$ and optimized on coarse phase grids, then rescored the best row on denser phase grids. The primary optimization used:

$$
\mathcal{J}
=
\operatorname{rms}(\widetilde{\mathcal{R}}_{\mathrm{tan}})^2
+
0.55\,\operatorname{rms}(\widetilde{\mathcal{R}}_{\mathrm{rad}})^2
+
1.25\,\operatorname{rms}(\mathcal{R}_{\mathrm{speed}})^2
$$

$$
\quad
+
0.035\,\max|\widetilde{\mathcal{R}}_{\mathrm{tan}}|^2
+
0.02\,\max|\widetilde{\mathcal{R}}_{\mathrm{rad}}|^2
+
\mathcal{P}_{\mathrm{root}}
+
\mathcal{P}_{\mathrm{floor}}.
$$

The penalty terms enforced:

| Floor | Penalty start |
| --- | ---: |
| Root count per receiver | anything other than $5$ |
| Euclidean noncollision | $d_{\min}<0.55R$ |
| Jacobian floor | $J_{\min}<0.25$ |
| Support-band amplitude | $\max|b_{a,\sigma}|>0.30$ |
| Support radius | $\rho_{\min}<0.70R$ |

The reported run used differential evolution with seed `426`, population size `5`, `12` iterations, and Powell polishing with `180` maximum iterations. The optimizer grid used $10$ then $12$ phase samples; the final diagnostics below use $24$ phase samples.

---

## 4. Best Screened Row

The best row found had binary phase offsets

$$
\phi_2\approx3.32354029,
\qquad
\phi_3\approx3.38494373.
$$

The site-specific radial coefficients were:

| Site | $A_{a,\sigma}$ | $B_{a,\sigma}$ |
| --- | ---: | ---: |
| $(1,+)$ | $0.20318301$ | $-0.10447124$ |
| $(1,-)$ | $0.10694060$ | $0.21994489$ |
| $(2,+)$ | $-0.22000000$ | $0.05177690$ |
| $(2,-)$ | $-0.03263319$ | $-0.21995720$ |
| $(3,+)$ | $-0.21660524$ | $0.21995902$ |
| $(3,-)$ | $-0.18849848$ | $0.10851816$ |

On the $24$-sample rescore, the diagnostics were:

| Diagnostic | Result |
| --- | ---: |
| Tangential residual RMS | $0.8208937789$ |
| Tangential residual max | $2.5726494144$ |
| Speed residual RMS | $0.0688569367$ |
| Speed residual max | $0.1622593236$ |
| Radial residual RMS after best constant $\Gamma_R^*$ | $0.4951385934$ |
| Radial residual max after best constant $\Gamma_R^*$ | $1.2440209681$ |
| Best constant $\Gamma_R^*$ | $0.1948671425$ |
| Euclidean noncollision floor | $d_{\min}\approx0.8205700822R$ |
| Jacobian floor | $J_{\min}\approx0.3662761430$ |
| Causal-delay range | $0.5518201760\le y\le2.4351755272$ |
| Root count per receiver and sampled phase | $5$-$5$ |
| Support radius range | $0.6996056192R\le\rho\le1.3003943808R$ |
| Maximum radial mode amplitude | $\max|b_{a,\sigma}|\approx0.3003943808$ |

The same row rescored on $18$ phase samples gave tangential RMS $0.8405918472$, radial RMS $0.4995751337$, speed RMS $0.0688572571$, and $J_{\min}\approx0.2964255759$. The row is therefore not a sampling accident, but it remains far from closure.

---

## 5. Comparison With Earlier Rows

| Row | Tangential RMS | Speed RMS | Radial RMS | Root/Jacobian status |
| --- | ---: | ---: | ---: | --- |
| Rigid zero-offset | $1.1009590702$ | $0$ | $0.3480839364$ | stable roots |
| Best rigid phase row | $\approx0.8798$ | $0$ | not rescreened as deformed support | stable roots |
| Common radial breathing | $0.6663341607$ | $0.2344152124$ | $0.5835895528$ | marginal $J_{\min}\approx0.2478$ |
| Common phase modulation | $1.0771124944$ | $0.0668680185$ | $0.6373831980$ | stable but worse tangential row |
| Pair/site-specific row here | $0.8208937789$ | $0.0688569367$ | $0.4951385934$ | stable roots, $J_{\min}\approx0.3663$ |

The binary-specific deformation improves the speed residual and root conditioning relative to the common radial breathing row, but it gives back the main tangential gain. It is better interpreted as a stability-preserving deformation direction than as a force-balance solution.

---

## 6. Branch Status

No branch is retained.

| Closure row | Status |
| --- | --- |
| Active root count | screened stable on sampled phases |
| Noncollision | positive |
| Jacobian floor | positive but not certification-grade |
| Speed closure | improved but failed |
| Radial/support closure | failed |
| Tangential closure | failed |
| Same-source row | not retained |
| Energy/action ledger | not computed |
| Stability row | not computed |
| Observer export | not computed |

The dominant open residual is tangential closure. The pointwise tangential residual remains $O(1)$ and reaches about $2.57$ in the same dimensionless normalization, while the radial residual reaches about $1.24$ and the speed residual remains below about $0.17$.

Failure codes:

$$
\texttt{tangential-residual-open},
\qquad
\texttt{support-band-residual-open},
\qquad
\texttt{not-retained}.
$$

---

## 7. Dynamics Inference

The screen sharpens the current dynamics picture:

1. Site-specific radial freedom does not automatically close the tangential force-balance row. The optimizer can preserve roots and improve speed, but the line-of-action projections still leave a large pointwise tangential residual.
2. The leading-order speed-coupled phase row works as intended: speed RMS drops from the common radial row's $0.2344$ to about $0.0689$. This confirms that radial breathing and phase modulation must be solved together.
3. The common radial row's stronger tangential improvement appears to use deformation in a way that is dynamically expensive: it damages speed closure and pushes the Jacobian floor toward the screening boundary.
4. A retained shell braid branch probably requires at least one additional force-balance degree of freedom beyond binary-specific radial breathing with speed-coupled phase modulation. The next mathematical candidate is a controlled plane-normal precession or antipodal-relaxation row, because those can rotate line-of-action projections without relying only on radial-support changes.

This packet should remain priority-only until a single candidate row closes $\widetilde{\mathcal{R}}_{\mathrm{tan}}$, $\mathcal{R}_{\mathrm{speed}}$, $\widetilde{\mathcal{R}}_{\mathrm{rad}}$, noncollision, active-root floors, and event/action ledgers on the same branch convention.
