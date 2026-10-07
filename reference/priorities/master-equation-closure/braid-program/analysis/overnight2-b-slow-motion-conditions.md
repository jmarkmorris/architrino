# Slow-motion tangential compatibility for finite-height six-member histories

## Question and claim boundary

This is a derived necessary condition, currently self-reviewed, for the unchanged canonical equation with $K=c_f=1$ and every ordinary partner and positive-delay self root. It addresses a limitation exposed by the [second overnight search](overnight2-b-followup-and-research-2026-10-07.md): a normalized full-vector residual may decrease as every speed decreases and the fitted radius grows, even while an exact period-averaged tangential balance is impossible. The expansion below evaluates prescribed complete paths. It supplies no stability spectrum about their generally imbalanced zero-speed limit.

Let $R>0$, $\tau=t/R$, and $\phi=\epsilon k\tau$ for a positive slow-motion parameter $\epsilon$ and fixed $k>0$. Prescribe

$$
X_j(t)=R\big(\rho(\phi)\cos[\epsilon b\tau+j\pi/3+p(\phi)],\rho(\phi)\sin[\epsilon b\tau+j\pi/3+p(\phi)],(-1)^j\zeta(\phi)\big),
$$

where $b>0$, and $\rho,p,\zeta$ are real $C^2$, $2\pi$-periodic functions, with $\rho\ge\rho_*>0$. Hold the shapes and $b,k$ fixed as $\epsilon\to0^+$. Bounded shape derivatives give a uniform complete-history speed $O(\epsilon)$, so sufficiently small $\epsilon$ has exactly one ordinary root per partner and no positive self roots by the complete-past monotonic-gap theorem. The scale $R$ may vary with $\epsilon$; it does not enter the dimensionless causal geometry or the necessary averaged identity.

Write $A_r,A_t,A_z$ for the dimensionless canonical acceleration, so the physical acceleration is $A/R^2$. The demand is $L/R$ and the exact equation is $RL=A$. Its tangential component obeys

$$
\rho L_t=\epsilon^2 k\frac{d}{d\phi}\{\rho^2(b+kp')\},
\qquad\langle\rho A_t\rangle=0,
$$

where primes denote phase derivatives and $\langle f\rangle=(2\pi)^{-1}\int_0^{2\pi}f(\phi)\,d\phi$. The second equality follows by integrating the first for an exact periodic shape. It is a geometric consequence of the acceleration equation, with no imported momentum law.

## First-order expansion of one canonical row

Fix reception phase and use the receiver's instantaneous planar frame. At $\epsilon=0$, let $Q_0$ be the simultaneous dimensionless separation to a partner, $s=|Q_0|>0$, and $n=Q_0/s$. Let $\epsilon V_1$ be the source's leading physical velocity at that same phase. The source's shift over dimensionless delay $\delta$ gives

$$
Q=Q_0+\epsilon\delta V_1+O(\epsilon^2),\qquad
\delta=s+\epsilon s(n\cdot V_1)+O(\epsilon^2),\qquad
D=1-\epsilon n\cdot V_1+O(\epsilon^2).
$$

The first relation is the Taylor expansion of the delayed source position; the second follows by expanding $|Q|=\delta$. The positive ordinary divisor allows $|D|=D$ near zero. Substituting into the canonical row gives

$$
\frac{Q}{\delta^3D}
=\frac{Q_0}{s^3}
+\frac{\epsilon}{s^2}\{V_1-2n(n\cdot V_1)\}
+O(\epsilon^2).
$$

The factor two combines the delay dependence of the inverse-cube factor with the single transmitter factor. Omitting the delay variation would give the wrong coefficient. The remainder is uniform in reception phase: positive simultaneous separation, bounded profiles and two bounded phase derivatives provide a common compact delay window and bounded second parameter derivatives. The implicit root derivative has a uniform nonzero divisor for sufficiently small $\epsilon$. For a compact family of such profiles with common derivative/separation bounds, the same Taylor bound is uniform over that family. No numerical remainder constant is claimed here.

## Tangential coefficient after summing all partners

Put $h=\zeta/\rho$ and $\omega=b+kp'$. For source angle $\alpha=j\pi/3$ and parity $\sigma=(-1)^j$, the simultaneous geometry is

$$
Q_0=(\rho(1-\cos\alpha),-\rho\sin\alpha,(1-\sigma)\zeta),
\quad s^2=2\rho^2(1-\cos\alpha)+(1-\sigma)^2\zeta^2.
$$

Radial and vertical source-velocity terms in the tangential expansion cancel between $j$ and $6-j$, because their coefficients are odd in $\sin\alpha$ while separation and parity are even. The diametric source has zero tangential contribution from these velocities. The remaining source rotation is $\rho\omega(-\sin\alpha,\cos\alpha,0)$. Consequently its contribution to $\rho A_t/\epsilon$ is

$$
\sigma\omega\left\{\frac{\rho^2\cos\alpha}{s^2}
-\frac{2\rho^4\sin^2\alpha}{s^4}\right\}.
$$

The two neighboring opposite-polarity channels give $(2-4h^2)/(1+4h^2)^2$ times $\omega$; the two same-polarity channels give $-2\omega/3$; and the diametric opposite-polarity channel gives $\omega/[4(1+h^2)]$. Thus

$$
\rho A_t=\epsilon\omega C(h)+O(\epsilon^2),\qquad
C(h)=\frac{2-4h^2}{(1+4h^2)^2}-\frac23+\frac{1}{4(1+h^2)}.
$$

The leading instantaneous tangential term vanishes by the same partner reflection. The complete first-order coefficient retains all five partner channels, and the absence of self roots has already been proved geometrically.

## Necessary mean condition and its scope

Define

$$
M[\rho,p,\zeta;b,k]=\left\langle(b+kp')C(\zeta/\rho)\right\rangle.
$$

The exact tangential identity and the uniform expansion imply $0=\epsilon M+O(\epsilon^2)$. If $M\ne0$ for fixed profiles and rates, there exists $\epsilon_0>0$ such that no history in this scaled family with $0<\epsilon<\epsilon_0$ and any $R>0$ solves the full equation. This is an asymptotic exclusion, with an unquantified speed threshold until the remainder is bounded. A compact family with $|M|$ bounded away from zero has a common threshold when its separation and derivative hypotheses are uniform.

More generally, if profiles converge in $C^2$ with a common positive radius floor and bounded rates $b,k$ converging to positive limits, any sequence of exact histories with $\epsilon\to0^+$ must have $M=0$ in the limiting shape. This condition remains necessary even if $R\to\infty$. It is not sufficient: radial, axial and pointwise tangential equations remain to be solved.

For an unmodulated planar radius and phase with sinusoidal height, $\rho=1$, $p=0$, $\zeta=H\cos\phi$, elementary integrals give

$$
\overline C(H)=\langle C(H\cos\phi)\rangle
=\frac{2(1+H^2)}{(1+4H^2)^{3/2}}-\frac23+\frac{1}{4\sqrt{1+H^2}}.
$$

To obtain this expression, use $\langle(1+t\cos^2\phi)^{-1}\rangle=(1+t)^{-1/2}$, differentiate it with respect to $t$ to obtain $\langle(1+t\cos^2\phi)^{-2}\rangle=(2+t)/[2(1+t)^{3/2}]$, and write $(2-t\cos^2\phi)/(1+t\cos^2\phi)^2=3/(1+t\cos^2\phi)^2-1/(1+t\cos^2\phi)$. The first integral follows directly by $x=\tan\phi$ on a quadrant.

At zero height $\overline C(0)=19/12$; at infinite height its limit is $-2/3$. For $H>0$,

$$
\overline C'(H)=-\frac{4H(5+2H^2)}{(1+4H^2)^{5/2}}
-\frac{H}{4(1+H^2)^{3/2}}<0.
$$

There is therefore exactly one positive height at which this leading mean vanishes. That height is a necessary tangential compatibility point for the pure sinusoidal family in the slow limit, not an exact canonical solution and not a stability result. A quantitative location and finite-speed remainder remain pending.

## Verification boundary and falsifiers

This document is a fresh analytical subject. It has not yet received independent adjudication or an outward remainder bound. An incorrect source-shift expansion, failure of the paired cancellations, disagreement with a separately derived canonical first-order row, an exact slow family with nonzero limiting $M$, or an error in the elementary integral would defeat the corresponding claim. A small floating residual alone neither validates nor falsifies the mean theorem. The receiving owner is the second-allocation report; shared corpus and ledgers remain read-only. This necessary-condition route complements continued balance searches and does not close the twelve-hour allocation.
