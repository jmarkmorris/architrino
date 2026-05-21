# Octahedral Carrier Worked Example

Promotion status: `priority-only`. This worked example tests the most rigid same-level carrier candidate from [topological-carrier-and-spin-targets.md](topological-carrier-and-spin-targets.md). It supplies a concrete noncollision row and a numerical causal-root screening row, but it does not prove force balance, energy/action closure, stability, observer exports, or migration readiness.

---

## 1. Candidate Row

Work in the center-gauge chart with $\mathbf{C}(t)=\mathbf{0}$, constant support radius $R$, and carrier frequency

$$
\omega=\frac{c_f}{R}.
$$

Use phase $\theta=\omega t$ and define three orthogonal carrier directions

$$
\begin{aligned}
\mathbf{p}_1(\theta)&=(\cos\theta,\sin\theta,0),\\
\mathbf{p}_2(\theta)&=(0,\cos\theta,\sin\theta),\\
\mathbf{p}_3(\theta)&=(\sin\theta,0,\cos\theta).
\end{aligned}
$$

The six architrino sites are

$$
\mathbf{x}_{a,+}(t)=R\mathbf{p}_a(\omega t),
\qquad
\mathbf{x}_{a,-}(t)=-R\mathbf{p}_a(\omega t),
\qquad
a\in\{1,2,3\}.
$$

The row is exactly antipodal within each binary and uses zero relative phase offsets in this coordinate convention. It is the simplest octahedral braid candidate because each carrier circle passes through two axes while the other carriers are temporally offset at those nodes.

---

## 2. Noncollision Row

For $a\ne b$ and signs $\sigma,\sigma'\in\{+1,-1\}$,

$$
\left\|
\sigma R\mathbf{p}_a(\theta)
-
\sigma'R\mathbf{p}_b(\theta)
\right\|^2
=
R^2\left(2-2\sigma\sigma'\mathbf{p}_a(\theta)\cdot\mathbf{p}_b(\theta)\right).
$$

For the three carrier directions above,

$$
\mathbf{p}_1\cdot\mathbf{p}_2
=
\mathbf{p}_1\cdot\mathbf{p}_3
=
\mathbf{p}_2\cdot\mathbf{p}_3
=
\sin\theta\cos\theta.
$$

Since $|\sin\theta\cos\theta|\le1/2$,

$$
\left\|
\sigma R\mathbf{p}_a(\theta)
-
\sigma'R\mathbf{p}_b(\theta)
\right\|^2
\ge
R^2.
$$

Within each antipodal pair,

$$
\left\|
R\mathbf{p}_a(\theta)+R\mathbf{p}_a(\theta)
\right\|=2R.
$$

Therefore the rigid octahedral row has the exact Euclidean noncollision floor

$$
d_{\min}=R.
$$

This proves only simultaneous coordinate clearance. It does not prove causal-root clearance, Jacobian floors, or fixed-speed force closure.

---

## 3. Antipodal Partner Root

For a receiver on $\mathbf{p}_a(\theta)$ and its antipodal partner as source, write the dimensionless delay

$$
y=\omega(t-s)=\frac{c_f(t-s)}{R}.
$$

The partner-root equation is

$$
y
=
\left\|
\mathbf{p}_a(\theta)+\mathbf{p}_a(\theta-y)
\right\|
=
2\left|\cos\frac{y}{2}\right|.
$$

On $0<y<\pi$, this has the unique positive root

$$
y_*\approx1.4781702664.
$$

The corresponding partner Jacobian is

$$
J_{\mathrm{partner}}
=
1+\frac{\sin y_*}{y_*}
\approx
1.6736120292.
$$

Thus the antipodal partner row is well separated from the Jacobian floor for any tolerance $\epsilon_J<1.67$ in this ideal geometry.

---

## 4. Same-Source Root Status

For a same-source circular carrier at exact speed $c_f$,

$$
y
=
\left\|
\mathbf{p}_a(\theta)-\mathbf{p}_a(\theta-y)
\right\|
=
2\left|\sin\frac{y}{2}\right|.
$$

For $y>0$,

$$
2\left|\sin\frac{y}{2}\right|<y
$$

except at the excluded limit $y=0$. Therefore the rigid circular row has no retained positive-delay same-source root. Its same-source status is not `retained-positive-delay`; it is acceptable only if the branch certificate does not require a self-root row, or if a deformed support-band carrier later supplies a controlled positive-delay or regularized-fold-layer replacement.

---

## 5. Cross-Binary Root Screening

For $a\ne b$, the cross-binary root equation is

$$
y
=
\left\|
\sigma\mathbf{p}_a(\theta)
-
\sigma'\mathbf{p}_b(\theta-y)
\right\|.
$$

The right side is bounded by $2$, so every retained cross-binary root satisfies

$$
0<y\le2,
\qquad
0<\tau\le\frac{2R}{c_f}.
$$

A numerical screening over $361$ phase samples, all ordered receiver/source pairs, and $y\in(0,2]$ found:

| Row | Screened result |
| --- | --- |
| Cross-root count per ordered pair and sampled $\theta$ | exactly $1$ |
| Cross-root delay range | $0.6367346708\le y\le1.9793201188$ |
| Minimum screened cross-root Jacobian | $J_{\min,\mathrm{cross}}\approx0.7284199113$ |
| Simultaneous coordinate clearance | $d_{\min}\approx R$ |

The screening suggests the rigid octahedral carrier is not immediately rejected by partner/cross-root count or Jacobian-floor diagnostics. It is still not a retained branch because the force residual, phase-lock return map, energy/action ledger, angular-momentum ledger, stability row, exposure row, and observer exports have not been computed.

---

## 6. Neutral Force-Residual Screening

Assign the neutral Noether-core polarity pattern

$$
q_{a,+}=+\epsilon,
\qquad
q_{a,-}=-\epsilon,
\qquad
a\in\{1,2,3\}.
$$

Using the retained antipodal partner roots and the screened cross-binary roots above, define the dimensionless tangential residual by removing the common factor $\kappa\epsilon^2/R^2$:

$$
\widetilde{\mathcal{R}}_{\mathrm{tan},i}(\theta)
=
\mathbf{u}_i(\theta)\cdot
\sum_{(j,y)\in\mathcal{A}_i(\theta)}
\frac{\mathrm{sign}(q_iq_j)}
{y_{ij}^2|J_{ij}|}
\hat{\mathbf{r}}_{ij}.
$$

A phase scan over $181$ values of $\theta$ gives

$$
\max_{i,\theta}
\left|
\widetilde{\mathcal{R}}_{\mathrm{tan},i}(\theta)
\right|
\approx
2.0636859695,
\qquad
\operatorname{rms}
\left(\widetilde{\mathcal{R}}_{\mathrm{tan}}\right)
\approx
1.1009590702.
$$

Thus the rigid zero-offset octahedral neutral row fails the fixed-speed tangential closure screen. This is useful: the carrier is geometrically and root-ledger plausible, but the uncorrected rigid phase row is not a retained branch. A viable same-level branch must add at least one of the following before promotion:

1. a deformed support-band carrier that changes the force projections;
2. a nonzero phase-lock row tuned by the causal-wake dynamics;
3. a different central-inventory representative;
4. a regularized fold-layer or additional medium-response term that closes the tangential residual without hiding event-ledger exchange.

The failure code for this rigid neutral row is `tangential-residual-open`.

---

## 7. Immediate Failure Tests

This candidate must be rejected if any later retained packet finds:

1. $\mathcal{R}_{\mathrm{tan}}$ does not close under the actual polarity assignment and retained force row.
2. Cross-binary root count changes under phase or branch refinement.
3. $J_{\min,\mathrm{cross}}$ falls below the declared Jacobian floor under deformed support-band motion.
4. Same-source rows are required but remain only the excluded $y=0$ tangent limit.
5. The phase return map has no stable fixed point, invariant curve, or attractor.
6. The event/action ledger fails to conserve $E$, $\mathbf{p}$, $\mathbf{J}$, and $Q$ on this same active-root convention.

The useful conclusion is narrow: the zero-offset octahedral carrier has an exact Euclidean noncollision floor and a plausible first causal-root screening row, but it fails the first neutral tangential-residual screen in its rigid form. It is therefore a disciplined input for deformed-carrier search, not a retained same-level tri-binary branch.
