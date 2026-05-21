# Low-Order Deformation Search Results

Promotion status: `priority-only`. This packet records a bounded numerical search over the first deformed support-band ansatz after the rigid carrier results in [rigid-carrier-dynamics-results.md](rigid-carrier-dynamics-results.md). The search is exploratory and does not retain a branch. Its value is to separate deformation directions that genuinely reduce the tangential residual from those that merely move the failure into speed or radial support closure.

Later packets [arc-length-dynamics-reduction.md](arc-length-dynamics-reduction.md) and [arclength-deformation-search-results.md](arclength-deformation-search-results.md) refine the interpretation of the speed row. In a deformed-curve chart, fixed speed should be built into the arclength time map; the decisive blocker is then force-versus-curvature closure, not the naive angle-clock speed residual alone.

---

## 1. Search Ansatz

The screened ansatz kept the orthogonal carrier directions but allowed a common second-harmonic radial breathing mode:

$$
\rho(\theta)
=
R\left(1+A\cos2\theta+B\sin2\theta\right),
$$

with phase offsets

$$
\theta_1=\theta,
\qquad
\theta_2=\theta+\phi_2,
\qquad
\theta_3=\theta+\phi_3.
$$

The six sites were

$$
\mathbf{x}_{a,+}(\theta)
=
\rho(\theta_a)\mathbf{p}_a(\theta_a),
\qquad
\mathbf{x}_{a,-}(\theta)
=
-\rho(\theta_a)\mathbf{p}_a(\theta_a).
$$

The neutral polarity row remained

$$
q_{a,+}=+\epsilon,
\qquad
q_{a,-}=-\epsilon.
$$

The evaluation used the retained partner and cross-binary root convention from the rigid screen, with roots recomputed for each deformed candidate. No same-source root was retained.

---

## 2. Objective Components

The bounded search minimized a weighted objective built from:

$$
\operatorname{rms}
\left(\widetilde{\mathcal{R}}_{\mathrm{tan}}\right),
\qquad
\max
\left|
\widetilde{\mathcal{R}}_{\mathrm{tan}}
\right|,
\qquad
\operatorname{rms}
\left(\mathcal{R}_{\mathrm{speed}}\right),
\qquad
\operatorname{rms}
\left(\widetilde{\mathcal{R}}_{\mathrm{rad}}\right),
$$

plus penalties for $d_{\min}$ and $J_{\min}$ falling below screening floors. The radial row used the best constant rigid-scale term $\Gamma_R$ for each candidate and measured the remaining radial projection residual.

The search was intentionally small: it is a direction finder, not a retained-branch optimizer.

---

## 3. Results

The best screened candidate found was

$$
A\approx0.30561886,
\qquad
B\approx0.02499254,
\qquad
\phi_2\approx3.07849141,
\qquad
\phi_3\approx3.08073199.
$$

Its diagnostics were:

| Diagnostic | Result |
| --- | ---: |
| Tangential residual RMS | $0.6663341607$ |
| Tangential residual max | $1.6956318298$ |
| Speed residual RMS | $0.2344152124$ |
| Speed residual max | $0.3065753416$ |
| Radial residual RMS after best constant $\Gamma_R$ | $0.5835895528$ |
| Radial residual max after best constant $\Gamma_R$ | $1.4462564995$ |
| Best constant $\Gamma_R$ | $0.0756667988$ |
| Euclidean noncollision floor | $d_{\min}\approx0.8528200937R$ |
| Jacobian floor | $J_{\min}\approx0.2478018328$ |
| Root count per receiver and sampled phase | $5$-$5$ |

Relative to the best rigid phase row, the tangential RMS improves from about $0.8798$ to about $0.6663$. Relative to the zero-offset rigid row, it improves from about $1.1010$ to about $0.6663$.

The cost is serious: the speed residual becomes order $0.2$, the Jacobian floor approaches the low screening floor, and the radial support residual worsens. The candidate is not close to retention.

---

## 4. Coupled Common Phase-Modulation Check

A follow-up bounded search added a common phase modulation

$$
\psi_a(\theta)
=
\theta+\phi_a+C\cos(2(\theta+\phi_a))+D\sin(2(\theta+\phi_a)),
$$

while retaining the common radial mode. The best screened row found was approximately

$$
A\approx0.0948870861,
\qquad
B\approx-0.0002396262,
\qquad
C\approx-0.0000746477,
\qquad
D\approx-0.0005866257,
$$

$$
\phi_2\approx3.77697314,
\qquad
\phi_3\approx3.11263523.
$$

Its diagnostics were:

| Diagnostic | Result |
| --- | ---: |
| Tangential residual RMS | $1.0771124944$ |
| Tangential residual max | $2.5558885057$ |
| Speed residual RMS | $0.0668680185$ |
| Speed residual max | $0.0938249818$ |
| Radial residual RMS after best constant $\Gamma_R$ | $0.6373831980$ |
| Radial residual max after best constant $\Gamma_R$ | $1.8075896831$ |
| Best constant $\Gamma_R$ | $-0.0727685406$ |
| Euclidean noncollision floor | $d_{\min}\approx0.6468338286R$ |
| Jacobian floor | $J_{\min}\approx0.4580053485$ |
| Root count per receiver and sampled phase | $5$-$5$ |

This common phase-modulation row is worse than the best rigid phase row and worse than the breathing-only tangential fit. It improves speed relative to the breathing-only candidate, but it gives back the tangential improvement and worsens radial support.

Interpretation: a single shared phase modulation is not the right correction. If phase modulation is useful, it must likely be pair-specific or site-specific and solved simultaneously with radial support rather than imposed as one common waveform.

---

## 5. Dynamics Interpretation

The common radial breathing mode has the right qualitative effect on tangential closure: it changes the delayed line-of-action projections enough to reduce fixed-speed power leakage. However, the same deformation changes the carrier speed and radial support balance. A tangential-only fit therefore shifts the failure rather than solving the branch.

This supports three conclusions:

1. Deformation is not optional. Rigid phase offsets alone do not close the dynamics.
2. A retained same-level branch must solve the coupled system
   $$
   \mathcal{R}_{\mathrm{tan}}=0,
   \qquad
   \mathcal{R}_{\mathrm{speed}}=0,
   \qquad
   \mathcal{R}_{\mathrm{rad}}=0
   $$
   together, not sequentially.
3. The next ansatz should allow phase modulation and radial breathing to cancel each other's speed error:
   $$
   \rho_{a,\sigma}(\theta)
   =
   R\left[1+\alpha_{a,\sigma}\cos(2\theta+\psi_{a,\sigma})\right],
   $$
   $$
   \theta_a(\theta)
   =
   \theta+\phi_a+\beta_a\sin(2\theta+\chi_a).
   $$

The first retained-branch search should penalize speed and radial residuals at the same order as tangential residuals. Otherwise the optimizer will find deformations that reduce $\mathcal{R}_{\mathrm{tan}}$ while destroying the carrier.

---

## 6. Failure Classification

This low-order candidate has:

| Row | Status |
| --- | --- |
| Active root count | screened stable on sampled phases |
| Jacobian floor | marginal but positive |
| Noncollision | positive |
| Tangential closure | improved but failed |
| Speed closure | failed |
| Radial/support closure | failed |
| Same-source root | not retained |
| Event/action ledger | not computed |
| Stability row | not computed |

The correct failure codes are:

$$
\texttt{tangential-residual-open},
\qquad
\texttt{support-band-escape}\ \text{risk},
\qquad
\texttt{jacobian-floor-violation}\ \text{risk under refinement},
$$

with `not_computed` for energy/action, stability, exposure, and observer-export rows.

---

## 7. Next Search

The next bounded search should use the ansatz from [deformed-carrier-dynamics-ansatz.md](deformed-carrier-dynamics-ansatz.md) with:

1. independent pair-level radial amplitudes instead of a common $\rho(\theta)$;
2. phase modulation to keep $\|\mathbf{u}_i\|$ near $c_f$;
3. a strict Jacobian floor penalty, because the breathing candidate pushed $J_{\min}$ down to about $0.248$;
4. radial/support residual in the primary objective, not as a diagnostic after the fact;
5. optional self/fold-layer terms only if their event/action ledger contribution is explicitly tracked.

This is the first evidence that same-level dynamics may need a genuinely deformable support-band attractor rather than a lightly tuned octahedral loop.
