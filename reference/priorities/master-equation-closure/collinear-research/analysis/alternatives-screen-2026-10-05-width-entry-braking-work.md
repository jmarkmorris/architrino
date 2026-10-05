# Complete partner braking work after contact

This independently reconstructs the coordinator's proposed braking-work bound for the same four finite-width laws and the same original compatible approaching preparations. The [earlier passage theorem](alternatives-screen-2026-10-05-collinear-checkpoint-v2.md) gives a finite first contact with positive inward speed and a complete nonincreasing past. The present theorem reduces all-future escape to one lower bound on that contact speed. It does not supply that lower bound from numerical refinement.

## Law, source domain and orientation

Keep $c_f=K_{ij}=1$, the selected positive $h,\rho$, $f_\rho(R)=R/(R^2+\rho^2)^{3/2}$ for $R\ge0$, and normalized triangular reception $\delta_h(g)=h^{-1}(1-|g|/h)_+$. Both complete self and opposite-polarity partner channels remain present. Let first contact be $t_c$, and write $y=-x$, $u=y'>0$ after it, provisionally up to a first loss of monotonicity. The complete past has $u(s)\ge0$ and $x(s)\le a=1/2$; the stationary old tail remains included.

The partner input has accelerating and braking orientations. Its braking part occurs when $R=y(t)-x(s)>0$, and has magnitude

$$
P(t)=\int_{s\le t,\,y(t)-x(s)>0}
 f_\rho(y(t)-x(s))\,
 \delta_h(y(t)-x(s)-t+s)\,ds.
$$

Set $Q(s)=s-x(s)$. Since $Q'=1+u(s)\ge1$, $Q$ is strictly increasing. Its complete old tail tends to $-\infty$, so it has exactly one inverse source time for every target at most $Q(t)$. For a fixed reception gap $g\in[-h,h]$, let

$$
S_g(t)=Q^{-1}(t-y(t)+g).
$$

It is an admitted past source exactly when $t-y+g\le Q(t)=t+y$, equivalently $g\le2y(t)$. Because $y$ increases, each fixed gap's source domain is an interval that starts at most once. When $g>0$ enters at the diagonal boundary $y=g/2$, its range is $R=g>0$; the lower range limit is not incorrectly set to zero. For $g\le0$, the source is already in the past at contact, but its braking orientation may begin only later when $R$ first becomes positive.

Within the admitted domain define $R_g(t)=y(t)-x(S_g(t))$. Differentiation gives

$$
S_g' =\frac{1-u(t)}{1+u(S_g)},\qquad
R_g'=\frac{u(t)+u(S_g)}{1+u(S_g)}>0.
$$

Thus the braking orientation $R_g>0$ also begins at most once. The active set for a fixed gap is an interval, possibly empty or truncated by the final time. It cannot leave and re-enter with the same range. The source time itself may reverse direction when the receiver crosses unit speed; this does not spoil the strictly increasing range.

## Derived total-work bound

Changing from source time to gap at fixed reception time gives

$$
P(t)=\int_{-h}^h\delta_h(g),
\mathbf1_{\{g\le2y(t),\,R_g(t)>0\}}
\frac{f_\rho(R_g(t))}{1+u(S_g(t))}\,dg.
$$

All integrands are nonnegative, so Tonelli's theorem exchanges the complete time and gap integrals without first assuming their finiteness. On each gap's active interval, the increasing-range substitution yields

$$
\frac{u(t)}{1+u(S_g(t))}\,dt
=\frac{u(t)}{u(t)+u(S_g(t))}\,dR_g\le dR_g.
$$

Any positive lower range at domain entry and every finite upper truncation only reduce the integral. Consequently, up to every time before a first loss of monotonicity,

$$
\int_{t_c}^T u(t)P(t)\,dt
\le\int_{-h}^h\delta_h(g)\,dg
\int_0^\infty f_\rho(R)\,dR
=\frac1\rho.
$$

This includes complete old-past sources, reception-band truncation, diagonal entry and orientation entry. No root or source interval is suppressed.

## Sufficient contact-speed theorem

Let $u_c=u(t_c)>0$. Self input and accelerating partner input are nonnegative in the $u$ equation while the complete history remains nonincreasing. Thus

$$
\frac{u(T)^2}{2}\ge\frac{u_c^2}{2}-\int_{t_c}^T uP\,dt
\ge\frac{u_c^2}{2}-\frac1\rho.
$$

If $u_c^2/2>1/\rho$, a first zero of $u$ is impossible. The global positive-width existence theorem gives every future time, and the strict lower speed floor implies $y\to\infty$ at least linearly. Once $y>a$, all partner input is braking with $P\le(y-a)^{-2}$; it is then integrable in time. The earlier finite interval has bounded input and contributes a finite integral. Therefore $u+\int P$ is eventually nondecreasing and has a finite positive or infinite limit. A finite positive limit is excluded by the strictly positive affine-self response and uniform integrable age-tail bound, exactly as in the assessed escape theorem. It follows that $u\to\infty$ and $y/t\to\infty$, with no later turn or contact.

The scalar $u^2/2$ is an integrating factor used in this inequality. No physical energy, mass, mechanical law or conservation premise is imported.

> Claim grade: derived, independent assessment requested. The sufficient thresholds are $u_c>8$ for $\rho=1/32$ and $u_c>\sqrt{128}$ for $\rho=1/64$. A missed gap re-entry, missing complete source support, failed increasing-range identity or future turn despite the strict exact threshold would falsify the corresponding argument. The contact-speed lower bound for the original preparations remains a separate certification target.
