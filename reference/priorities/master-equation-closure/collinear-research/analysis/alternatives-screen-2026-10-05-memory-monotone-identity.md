# Exact monotone history variable for the uniform-memory law

The selected Section 12 law retains the canonical radial baseline, ordinary self channels and the exact uniform-memory term $H_i=-\int_0^1[v_i(t)-v_i(t-\theta)]\,d\theta$, with $\lambda=\tau=c_f=K=1$. The [initial screen](alternatives-screen-2026-10-05-collinear.md#uniform-memory-on-the-canonical-baseline) established a periodic identity and a compatible first-event preparation. The following variable gives stronger conditional fate and entire-history results without treating the sign of $H$ as physical dissipation.

## Complete subfield equation and exact transform

Let two opposite-polarity labels remain ordered, $r=x_1-x_2>0$, with a complete compatible uniformly subfield past and a common speed margin $|v_i|\le1-\eta$, $\eta>0$, throughout the solution interval. Each receiver has one partner root and no positive-delay self root. The ordinary self channel is retained and vanishes by this root census. Write the positive canonical input magnitudes as

$$
Q_i(t)=\frac1{R_i(t)^2D_i(t)}>0,
$$

so the selected equations are

$$
v_1'=-Q_1-v_1+\int_0^1v_1(t-\theta)\,d\theta,
\qquad
v_2'=Q_2-v_2+\int_0^1v_2(t-\theta)\,d\theta.
$$

Define the mathematical history variable

$$
M_i(t)=v_i(t)+\int_0^1(1-\theta)v_i(t-\theta)\,d\theta.
$$

Integration by parts gives

$$
\frac d{dt}\int_0^1(1-\theta)v_i(t-\theta)\,d\theta
=v_i(t)-\int_0^1v_i(t-\theta)\,d\theta.
$$

Therefore

$$
M_1'=-Q_1<0,\qquad M_2'=Q_2>0.
$$

This transform is an exact consequence of the selected memory equation. It is not mass, momentum, mechanical energy or an assumed conservation law.

## Conditional future dispersal and terminal velocities

Assume the prepared solution exists for all $t\ge0$, stays separated and retains the same uniform subfield margin on its complete past and future. Then $|M_i|\le\frac32(1-\eta)$, so both monotone variables have finite future limits and $\int_0^\infty Q_i\,dt<\infty$. The root bounds $R_i\le r/\eta$, $D_i\le2-\eta$ imply $\int_0^\infty r^{-2}\,dt<\infty$. Since $r$ is Lipschitz, this forces $r(t)\to\infty$.

It also implies individual velocity limits, not merely separation. Let $W$ be convolution with the nonnegative kernel $(1-\theta)\mathbf1_{[0,1]}(\theta)$, whose $L^1$ norm is $1/2$. On bounded complete histories, $I+W$ has the uniformly convergent inverse

$$
(I+W)^{-1}=\sum_{n=0}^\infty(-W)^n.
$$

Each convolution power has norm $2^{-n}$ and acts on a function with a terminal limit by multiplying that limit by $2^{-n}$. Uniform convergence and dominated convergence thus give

$$
v_i(t)\longrightarrow v_i^+=\frac23M_i^+.
$$

Although the equation is required only from release onward, $M_i=(I+W)v_i$ is defined on the entire supplied history, so this bounded-history inversion remains applicable. The terminal relative velocity satisfies $v_1^+-v_2^+\ge0$, because a negative derivative limit would eventually violate positive separation. Strictly positive terminal separation speed is not proved; zero remains possible.

## No entire separated uniformly subfield solution

Now additionally require the selected equation at every real time, with complete $C^2$ regularity, positive separation and the same uniform speed margin on all of $\mathbb R$. The bounded monotone $M_i$ have limits at both temporal infinities, and their strictly signed derivatives give positive finite integrals

$$
I_i=\int_{-\infty}^{\infty}Q_i(t)\,dt>0.
$$

The preceding integrability and Lipschitz argument gives $r\to\infty$ at both ends. The convolution inverse likewise gives individual limits $v_i^\pm=\frac23M_i^\pm$. Integrating the exact monotone identities yields

$$
v_1^+-v_1^-=-\frac23I_1<0,\qquad
v_2^+-v_2^-=\frac23I_2>0.
$$

Consequently the relative velocity limits obey $w^+<w^-$. Entire positive separation requires $w^-\le0\le w^+$, a contradiction. Thus no entire separated uniformly subfield two-label solution exists under the selected canonical-plus-memory law.

The entire-history exclusion and the prepared forward-dispersal theorem have different quantifiers. The former requires the equation throughout the supplied past; the latter allows an externally specified compatible preparation and assumes its future retains the stated domain. Neither theorem establishes global subfield existence for every preparation, rules out a finite first-unit event, or provides continuation through canonical self birth.

> Claim grade: derived, independent assessment requested. Falsifiers are an incorrect integration-by-parts identity, failure of the norm-$1/2$ convolution inverse on bounded complete histories, a prepared all-future uniformly subfield solution that fails the stated separation/velocity limits, or an entire separated uniformly subfield solution satisfying the complete equation.
