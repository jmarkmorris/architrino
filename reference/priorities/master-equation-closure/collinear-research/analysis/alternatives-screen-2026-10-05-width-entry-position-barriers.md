# Position-parametrized enclosure route for the original incoming preparations

This protocol is a proposed certificate route for the four original compatible finite-width approaching histories. It preserves the already frozen comparison sources, exact controls and analytical references. No target barrier instrument has yet been run at this checkpoint.

## Exact change of independent variable

Before the already proved first contact, the original mirror history is nonincreasing and has strictly positive inward acceleration and speed after the held tail. Set $d=1/2-x$, so $0<d\le1/2$, and write $u(d)>0$ for its speed as a function of displacement. The held tail has $d=0$. The exact preparation on its initial displacement segment is

$$
u(d)=c_A d^{2/3},\qquad
c_A=\frac{6^{2/3}}2 A^{1/3}\delta^{-1/3},\qquad
0<d\le d_0=A\delta^2/6,
$$

with $\delta=1/2048$ and the original unique compatibility coefficient $A$. Define the complete elapsed time from leaving the held tail and the source age by

$$
T(d)=\int_0^d\frac{dq}{u(q)},\qquad
W(z,d)=T(d)-T(z)=\int_z^d\frac{dq}{u(q)}.
$$

The preparation power is integrable at zero. The substitution $q=r^3$ makes its integrand $3r^2/u(r^3)$ constant there, removing the apparent endpoint singularity.

For a source at displacement $z\in(0,d)$, the self range is $d-z$ and the partner range is $1-d-z\ge0$. Source measure is $ds=dz/u(z)$. Let $C_h(g)=\int_{-\infty}^g\delta_h(r)dr$ be the triangular cumulative function. The complete inward acceleration is exactly

$$
\begin{aligned}
\mathcal F[d;u]={}&f_\rho(d)C_h(d-T(d))
+f_\rho(1-d)C_h(1-d-T(d))\\
&+\int_0^d\frac{f_\rho(d-z)\delta_h(d-z-W(z,d))}{u(z)}\,dz\\
&+\int_0^d\frac{f_\rho(1-d-z)\delta_h(1-d-z-W(z,d))}{u(z)}\,dz.
\end{aligned}
$$

The first two terms are the exact complete stationary-tail self and partner channels. The last two terms include every moving source position. All terms are nonnegative before contact. No clock monotonicity, root selector or source-age cutoff is used. The equation becomes

$$
\frac d{dd}\frac{u(d)^2}{2}=\mathcal F[d;u].
$$

Contact is now the fixed endpoint $d=1/2$. A time translation of the rapid ignition phase no longer changes this geometric endpoint, which is the conditioning advantage this route seeks to exploit; it is not yet a measured cost or certified gain.

## Two-sided profile barrier theorem

Choose positive continuous profiles $l(d)\le m(d)$, piecewise differentiable in their squared values, bounding the exact prescribed preparation through $d_0$. Require their inverse-speed integrals to be finite at zero. If $l\le u\le m$ on the whole preceding displacement interval, then

$$
T_m(d)\le T(d)\le T_l(d),\qquad
W_m(z,d)\le W(z,d)\le W_l(z,d),\qquad
\frac1{m(z)}\le\frac1{u(z)}\le\frac1{l(z)}.
$$

Here $T_l=\int_0^d l^{-1}$ and $W_l=\int_z^d l^{-1}$, with analogous definitions for $m$. For a fixed range $R\ge0$, define

$$
D_-(R,z,d)=\min_{w\in[W_m,W_l]}\delta_h(R-w),\qquad
D_+(R,z,d)=\max_{w\in[W_m,W_l]}\delta_h(R-w).
$$

The triangular extrema are explicit: the minimum occurs at a furthest interval endpoint from $R$ or is zero outside support; the maximum occurs at the nearest point to $R$, with value $1/h$ if $R$ lies inside the age interval. Since all spatial factors are nonnegative, valid complete functional bounds are

$$
\begin{aligned}
\mathcal F_-={}&f_\rho(d)C_h(d-T_l(d))
+f_\rho(1-d)C_h(1-d-T_l(d))\\
&+\int_0^d\frac{f_\rho(d-z)D_-(d-z,z,d)+f_\rho(1-d-z)D_-(1-d-z,z,d)}{m(z)}\,dz,
\end{aligned}
$$

and the upper bound $\mathcal F_+$ replaces $T_l$ by $T_m$, $D_-$ by $D_+$ and $m(z)$ by $l(z)$.

If the endpoint-compatible initial bounds are strict and, on the complete future displacement interval,

$$
\left(\frac{l^2}{2}\right)'<\mathcal F_-[d;l,m],\qquad
\left(\frac{m^2}{2}\right)'>\mathcal F_+[d;l,m],
$$

then the exact profile cannot first cross either barrier. At a lower first crossing its kinetic derivative exceeds the lower barrier's derivative; at an upper first crossing it is smaller than the upper barrier's derivative. Piecewise differentiable barriers can use these inequalities almost everywhere with a strict integral margin across each seam. The known precontact existence and monotonicity supply the exact branch up to $d=1/2$.

Thus $l(1/2)>\sqrt{2/\rho}$ would prove the original preparation's all-future escape by the [braking-work theorem](alternatives-screen-2026-10-05-width-entry-braking-work.md). A sharper work cap may reduce this target after independent assessment. This comparison theorem needs no claimed order for the earlier time-stepping instrument.

## Planned numerical certificate boundary

A numerical implementation must first freeze the actual $l,m$ formulas or retained piecewise-polynomial coefficients, the exact prepared-$A$ enclosure, the displacement partition, the outward-rounded arithmetic and the complete quadrature remainder method. Merely sampling the derivative inequalities is not a certificate. Every source interval and every receiver-displacement interval must receive an inclusion or remain explicitly unresolved.

Known controls must precede target use. Suitable independent controls include $l=m=c$ with a finite affine recent history and complete held tail: for $c=2$, $d=3/10$ and all four selected scale pairs, the exact complete self row is $S_{\rm aff}(2)+f_\rho(3/10)$ and the partner row is $f_\rho(7/10)$. The recent affine self band fits before the held tail; its older self band remains included. Polynomial integrals and the original preparation's exact power profile supply additional quadrature and endpoint controls.

An initial floating-point feasibility diagnostic may measure whether candidate barriers have adequate margins and estimate work. Such a diagnostic is not directed enclosure and cannot establish a theorem application. A rigorous successor must retain its source, keep the exact references unchanged, pass known cases first, and classify unresolved intervals rather than assigning their signs by convergence.

> Claim grade: the change of variables and barrier implication are derived and requested for independent assessment; the numerical enclosure route is proposed. Falsifiers are a missing tail/source term, reversed age-bound direction, incorrect positive-kernel ordering, or a first crossing despite fully verified strict inequalities. An interval minimum that erases most of a reception band is a genuine conditioning obstacle, not permission to use its midpoint value.
