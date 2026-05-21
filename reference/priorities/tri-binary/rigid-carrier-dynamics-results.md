# Rigid Carrier Dynamics Results

Promotion status: `priority-only`. This packet records the first dynamics screens run after the rigid zero-offset octahedral carrier in [octahedral-carrier-worked-example.md](octahedral-carrier-worked-example.md) failed fixed-speed tangential closure. It does not promote a same-level branch. Its purpose is to keep failed and partially successful numerical evidence from being lost, and to identify the next search direction.

---

## 1. Screened Carrier Class

The screened rigid class keeps the three orthogonal carrier planes

$$
\begin{aligned}
\mathbf{p}_1(\theta)&=(\cos\theta,\sin\theta,0),\\
\mathbf{p}_2(\theta)&=(0,\cos\theta,\sin\theta),\\
\mathbf{p}_3(\theta)&=(\sin\theta,0,\cos\theta),
\end{aligned}
$$

but allows phase offsets

$$
\theta_a=\theta+\phi_a,
\qquad
\phi_1=0,
\qquad
\phi_2,\phi_3\in[0,2\pi).
$$

The six sites remain antipodal:

$$
\mathbf{x}_{a,+}=R\mathbf{p}_a(\theta_a),
\qquad
\mathbf{x}_{a,-}=-R\mathbf{p}_a(\theta_a).
$$

The primary polarity row screened here is the neutral opposite-pair pattern

$$
q_{a,+}=+\epsilon,
\qquad
q_{a,-}=-\epsilon.
$$

All force residuals below use the same dimensionless normalization as the worked example, removing the common factor $\kappa\epsilon^2/R^2$.

---

## 2. Zero-Offset Baseline

The zero-offset row has:

| Diagnostic | Result |
| --- | --- |
| Euclidean noncollision floor | $d_{\min}=R$ |
| Antipodal partner delay | $y_*\approx1.4781702664$ |
| Partner Jacobian | $J_{\mathrm{partner}}\approx1.6736120292$ |
| Screened cross-root count | one root per ordered cross pair and sampled phase |
| Screened cross-root delay range | $0.6367346708\le y\le1.9793201188$ |
| Screened cross-root Jacobian floor | $J_{\min,\mathrm{cross}}\approx0.7284199113$ |
| Neutral tangential residual max | $\max|\widetilde{\mathcal{R}}_{\mathrm{tan}}|\approx2.0636859695$ |
| Neutral tangential residual RMS | $\operatorname{rms}(\widetilde{\mathcal{R}}_{\mathrm{tan}})\approx1.1009590702$ |

Interpretation: the rigid zero-offset carrier passes the first geometry/root screen but fails the fixed-speed force screen with failure code `tangential-residual-open`.

The same zero-offset row also gives a dimensionless radial force projection

$$
\widetilde{\Xi}_i(\theta)
=
\hat{\mathbf{n}}_i(\theta)\cdot
\sum_{(j,y)\in\mathcal{A}_i(\theta)}
\frac{\mathrm{sign}(q_iq_j)}
{y_{ij}^2|J_{ij}|}
\hat{\mathbf{r}}_{ij}.
$$

The sampled radial projection has

$$
-0.7065533455
\le
\widetilde{\Xi}_i(\theta)
\le
0.3022977323,
\qquad
\operatorname{mean}(\widetilde{\Xi})
\approx
-0.2021113735.
$$

For a rigid-radius row, the radial equation requires $\widetilde{\Xi}_i+\Gamma_R=0$ with a constant $\Gamma_R$. The best constant least-squares choice is therefore

$$
\Gamma_R\approx0.2021113735,
$$

but the remaining residual is still large:

$$
\max|\widetilde{\Xi}+\Gamma_R|
\approx0.5044419719,
\qquad
\operatorname{rms}(\widetilde{\Xi}+\Gamma_R)
\approx0.3480839364.
$$

Thus the rigid row also fails exact radial/support closure unless a support-band deformation, medium-response term, self/fold-layer contribution, or scale-dependent correction supplies the missing projection.

---

## 3. Phase-Offset Screen

A coarse phase grid over the neutral opposite-pair pattern allowed $\phi_2$ and $\phi_3$ to vary while keeping the same rigid carrier planes and active-root screening method. The best coarse rows found were:

| $\phi_2$ | $\phi_3$ | RMS tangential residual | Max tangential residual | $J_{\min}$ | $d_{\min}/R$ | Root count |
| ---: | ---: | ---: | ---: | ---: | ---: | --- |
| $3.267$ | $3.267$ | $0.8798$ | $1.8433$ | $0.695$ | $0.939$ | $5$-$5$ |
| $0.000$ | $3.016$ | $0.8803$ | $1.7122$ | $0.692$ | $0.939$ | $5$-$5$ |
| $3.016$ | $0.000$ | $0.8803$ | $1.7122$ | $0.692$ | $0.939$ | $5$-$5$ |
| $6.032$ | $2.765$ | $0.9269$ | $2.2058$ | $0.605$ | $0.802$ | $5$-$5$ |
| $3.016$ | $0.251$ | $0.9271$ | $2.2330$ | $0.604$ | $0.800$ | $5$-$5$ |

The best grid row reduces the RMS residual by about $20\%$ relative to the zero-offset RMS:

$$
\frac{1.1009590702-0.8798}{1.1009590702}\approx0.201.
$$

However, no sampled phase row came close to pointwise tangential closure. The best rows keep reasonable noncollision and Jacobian floors, but their maximum residual remains $O(1)$ in the same dimensionless units.

Interpretation: phase offsets alone are not enough to retain the rigid orthogonal-carrier branch. The residual can be improved but not closed in the screened class.

---

## 4. Force-Balance Implication

[force-balance-reduction.md](force-balance-reduction.md) shows that a retained same-level carrier must close both:

$$
\mathcal{R}_{\mathrm{tan},i}
=
\mathbf{u}_i\cdot\mathbf{a}_i^{\mathrm{rel}}
=0,
$$

and the support-radius or support-band residual. For a rigid radius,

$$
\hat{\mathbf{n}}_i\cdot
\mathbf{a}_i^{\mathrm{rel}}
+
\frac{c_f^2}{R}
=0.
$$

The phase screen above only attacked the first equation. Therefore even a hypothetical phase row with small tangential residual would still need a radial/support-band row and a scale/coupling row.

This matters because the zero-offset carrier has no retained positive-delay same-source root. Without a self/fold-layer or medium-response term, the branch has only partner and cross-binary forces available to supply both tangential closure and centripetal support. That is a strong constraint.

---

## 5. Current Dynamics Inference

The current evidence supports the following narrow inference:

1. The rigid orthogonal octahedral carrier is a good geometry/root seed.
2. The rigid zero-offset neutral row is not a retained dynamics branch.
3. Rigid phase offsets improve but do not close tangential residuals.
4. A viable same-level branch likely needs at least one non-rigid ingredient:
   - radial breathing $\rho_{a,\sigma}(\theta)$,
   - phase modulation $\theta_a(\theta)$ rather than constant offsets,
   - plane-normal precession,
   - antipodal relaxation,
   - controlled self/fold-layer contribution,
   - or a declared Noether-Sea medium-response term with event-ledger closure.
5. The next useful computation is a low-order deformed support-band least-squares problem using the projection equations from [force-balance-reduction.md](force-balance-reduction.md) and the ansatz variables from [deformed-carrier-dynamics-ansatz.md](deformed-carrier-dynamics-ansatz.md).

The candidate branch should not be moved toward corpus migration until a deformed row closes $\mathcal{R}_{\mathrm{tan}}$, radial/support-band closure, active-root floors, and event/action rows on the same retained branch convention.

---

## 6. Next Search Target

The highest-value next ansatz is the smallest deformation that can affect the tangential projection without immediately destroying the good root floors:

$$
\rho_{a,\sigma}(\theta)
=
R\left[1+\alpha_{a,\sigma}\cos(2\theta+\psi_{a,\sigma})\right],
$$

with phase modulation

$$
\theta_a(\theta)
=
\theta+\phi_a+\beta_a\sin(2\theta+\chi_a).
$$

The search objective should be

$$
\mathcal{J}
=
w_{\mathrm{tan}}
\left\|\widetilde{\mathcal{R}}_{\mathrm{tan}}\right\|_2^2
+
w_{\mathrm{rad}}
\left\|\widetilde{\mathcal{R}}_{\mathrm{rad}}\right\|_2^2
+
w_{\mathrm{speed}}
\left\|\mathcal{R}_{\mathrm{speed}}\right\|_2^2
+
w_x\mathcal{P}_x
+
w_J\mathcal{P}_J,
$$

where $\mathcal{P}_x$ penalizes $d_{\min}\le\epsilon_x$ and $\mathcal{P}_J$ penalizes $J_{\min}\le\epsilon_J$. The first retained branch search should report the full objective vector, not only the optimized scalar.
