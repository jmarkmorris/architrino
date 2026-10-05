# A complete-history escape criterion for the selected finite-width laws

This checkpoint derives a sufficient all-future criterion for the four fixed laws and the mirror geometry of the [collinear screen](alternatives-screen-2026-10-05-collinear.md). It is not yet an assertion that an exact selected preparation reaches the criterion. The comparison instrument has produced finite candidate histories; reaching this criterion with a numerically interpolated history does not certify the exact solution's entry.

## Complete law and hypotheses

Put $f_\rho(z)=z/(z^2+\rho^2)^{3/2}$ and $\delta_h(g)=h^{-1}(1-|g|/h)_+$. For the right-at-release label $x(t)$, with opposite label $-x(t)$, retain both complete channels:

$$
x''(t)=\int_{-\infty}^t f_\rho(x(t)-x(s))\delta_h(|x(t)-x(s)|-t+s)\,ds
-\int_{-\infty}^t f_\rho(x(t)+x(s))\delta_h(|x(t)+x(s)|-t+s)\,ds.
$$

All coefficients and $c_f$ are one. Each positive pair $(h,\rho)$ is a separate fixed law. The earlier global Volterra theorem gives a unique future for every continuous complete position past and finite current velocity. A usable uniform acceleration bound is

$$
|x''|\le C:=2\left(\frac4{3\sqrt3\rho^2}+\frac2{h^2}\right).
$$

Fix $a>0$ and a time $t_0$ after passage. Assume the actual complete history is continuously differentiable and nonincreasing on $(-\infty,t_0]$, with $x(s)\le a$ throughout. Write $y=-x$, $u=-x'$. Select $U>1$ and define

$$
\ell=\min\left(\frac U C,\frac h{4U}\right),\qquad
S_*(U)=\frac1{8hU}\left[\frac1\rho-\frac1{\sqrt{\rho^2+4U^2\ell^2}}\right].
$$

Require

$$
y(t_0)>a,\qquad u(t_0)>U,\qquad
u(s)\ge U\quad(t_0-\ell\le s\le t_0),\qquad
S_*(U)>\frac1{[y(t_0)-a]^2}.
$$

Assume also that the equation already holds on $[t_0-\ell,t_0]$, so the displayed acceleration bound applies there. For entry after release this is ensured by $t_0-\ell\ge0$.

## Derived invariant and unbounded-speed conclusion

**Claim (derived, independent assessment requested).** Under these hypotheses, the unrestricted finite-width solution exists for every future time, has $u(t)>U$, $y(t)\ge y(t_0)+U(t-t_0)$, and $u(t)\to+\infty$. Consequently $y(t)/t\to+\infty$. It never turns or recontacts. This conclusion is conditional on an actual complete solution entering the stated sector; a measured trajectory alone supplies no such enclosure.

Until a first prospective downward crossing $u(T)=U$, the entire complete path remains nonincreasing. Its self channel points toward decreasing $x$, so its contribution to $u'$ is nonnegative. Also $x(T)+x(s)\le-y(T)+a<0$ for all source times. The partner channel therefore brakes, with magnitude $P(T)\ge0$.

For this partner channel set $Q(s)=s-x(s)$. Its window argument is $Q(s)+y(T)-T$ and $Q'=1+u(s)\ge1$ over the complete past. Changing variables to this window argument, the complete triangular mass is at most one. Every sampled displacement has magnitude at least $y(T)-a$, and $|f_\rho(z)|\le|z|^{-2}$. Thus

$$
0\le P(T)\le\frac1{[y(T)-a]^2}\le\frac1{[y(t_0)-a]^2}.
$$

At the proposed first crossing, every age $0\le w\le\ell$ samples a velocity $u(T-w)\ge U$, including the declared recent pre-entry window if $T-t_0<\ell$. The global acceleration bound also gives $u(T-w)\le U+Cw\le2U$. Hence the self displacement magnitude obeys $Uw\le R(w)\le2Uw$, and its window argument satisfies $0\le R(w)-w\le h/2$. This yields the explicit lower bound

$$
S(T)\ge\frac1{2h}\int_0^\ell\frac{Uw}{(\rho^2+4U^2w^2)^{3/2}}\,dw=S_*(U).
$$

Therefore $u'(T)=S(T)-P(T)>0$, contradicting a first downward crossing. The global theorem rules out a different finite endpoint, so the strict speed floor and linear separation bound persist forever.

To strengthen separation to unbounded speed, observe that

$$
\int_{t_0}^\infty P(t)\,dt\le\frac1{U[y(t_0)-a]}<\infty.
$$

The function $u(t)+\int_{t_0}^tP(q)\,dq$ has derivative $S(t)\ge0$. Thus $u$ has a limit in $[U,+\infty]$. Suppose that limit is finite, $L>1$. On each compact age interval, the self displacement magnitude $x(t-w)-x(t)=\int_{t-w}^t u(q)\,dq$ converges uniformly to $Lw$. The self integrand converges to its affine-history integrand. The complete-age tail is uniformly dominated: when $w\ge2h$, a nonzero triangular window implies $R\ge w-h\ge w/2$, so the absolute integrand is at most $4/(hw^2)$. On finite age intervals it is bounded by the positive-core maximum divided by $h$. Dominated convergence consequently gives

$$
S(t)\longrightarrow S_{\rm aff}(L)
=\frac1{hL\rho}\left[1-\frac{\operatorname{arsinh}z}{z}\right]>0,
\qquad z=\frac{Lh}{\rho(L-1)}>0.
$$

Meanwhile $P(t)\to0$. Hence $u'(t)$ tends to a strictly positive number, incompatible with finite $u(t)\to L$. The only remaining limit is $+\infty$; integrating the eventual lower bound $u(t)>M$ for arbitrary $M$ proves $y(t)/t\to+\infty$.

## Falsifiers and application boundary

An error in the complete partner change of variables, the near-diagonal self lower bound, or the uniform age-tail bound would overturn the theorem. An exact history satisfying all entry inequalities and later reaching $u=U$ would also falsify it. To apply the conclusion to any selected compatible release, one must certify the entire monotonicity history through entry, the recent-window speed floor, and the entry position/velocity inequalities with error bounds or analytical inequalities. Step refinement and a large numerical inequality margin are evidence for an application candidate, not substitutes for that certification.
