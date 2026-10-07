# A quadratic relative-row bound integrated across the actual moving clocks

**Grade: derived candidate, awaiting independent assessment.** On a finite ordinary-root tube, bounded variation of source acceleration repairs the pointwise release-seam obstruction at the level of the time-integrated relative row. The bound retains both actual clocks and is quadratic in a norm controlling midpoint velocity and acceleration. The centered comparison row is evaluated on the same relative history as the nonmirror row; it is not automatically the accepted mirror solution. This result therefore supplies a finite-prefix nonlinear reduction, not an all-future dispersal neighborhood.

The selected law, source identities, and independence contract remain those in the [Package D method record](authorized-cases-ten-hour-d-primary-method.md). In particular $c_f=1$, $K>0$ is source-fixed, all positive-delay ordinary roots are included, and no physical preparation is smoothed, completed, or replaced. The [pointwise seam obstruction](authorized-cases-ten-hour-d-primary-seam-regularity.md) remains valid on the broader $W^{2,\infty}$ class.

## Finite tube and the stronger history norm

Let $I=[T_0,T_1]$, $L=T_1-T_0>0$, and use complete histories $X_\pm=C\pm x$. As before, the comparison homotopy is $X_\pm^\lambda=\lambda C\pm x$, $-1\le\lambda\le1$, interpreted only as inputs to the unchanged acceleration functional. Assume complete speed at most $\beta<1$, and put $m=1-\beta$. Suppose all homotopy partner ranges on $I$ lie in $[a,b]$ with $0<a\le b<\infty$. One may obtain these from positive lower and finite upper simultaneous-separation bounds using the complete root inequalities.

Choose a compact buffered interval $J$ containing $[T_0-b,T_1]$ in its relative interior on the past side. The histories need only be defined through $T_1$; an analytical approximation below can use one-sided convolution. Set

$$
M=\sup_J|C'|,\quad A_C=\mathop{\mathrm{ess\,sup}}_J|C''|,\quad
A=\mathop{\mathrm{ess\,sup}}_J\max_i|X_i''|,\quad
V=\max_i\operatorname{TV}_J(X_i''),\quad \eta=bA.
\tag{1}
$$

Here $\operatorname{TV}$ is total variation of the vector-valued acceleration, including its jumps. The finite value $V$ is an additional hypothesis; a mere $W^{2,\infty}$ bound does not supply it. For fixed length and time units, a norm containing $M$ and a time-scaled $A_C$ makes the estimate below quadratic. The full-past position and velocity norm from the method record remains responsible for root completeness and finite-window closeness. Neither a present velocity sample nor $M$ alone uniformly controls a family with unrestricted midpoint acceleration.

The homotopy source accelerations are convex combinations of the original accelerations and their negatives, so their essential bounds and total variations are at most $A$ and $V$. Their complete speed remains at most $\beta$. Every homotopy receiver has one partner root and no positive-delay self root. The two reception-time clocks satisfy

$$
\frac m{1+\beta}\le s_t^\lambda\le\frac{1+\beta}m.
\tag{2}
$$

## Explicit second-parameter bound on smooth controls

First suppose the histories are smooth. This temporary proof step is removed below. For the positive row write $R=t-s$, $n=S/R$, $v=(X_-^\lambda)'(s)$, $D=1-n\cdot v$, and $p=\partial_\lambda s$. The first-parameter identities from the [nonlinear center calculation](authorized-cases-ten-hour-d-primary-nonlinear-center.md) imply

$$
|p|\le\frac{RM}m,\quad
|n_\lambda|\le\frac Mm,\quad
|D_\lambda|\le\frac{M(1+\eta)}m.
\tag{3}
$$

Define the following explicit nonnegative constants:

$$
P_2=\frac2{m^2}+\frac{1+\eta}{m^3},\qquad
N_2=\frac2m+\frac{2+\eta}{m^2}+(1+\beta)P_2,
\tag{4}
$$

$$
L_1=\frac2m+\frac{1+\eta}{m^2},\qquad
D_2=\beta N_2+\frac2m+\frac{2\eta}{m^2}+\eta P_2.
\tag{5}
$$

Differentiating $p=-n\cdot[C(t)-C(s)]/D$ gives $|p_\lambda|\le RM^2P_2$. Differentiating $S_\lambda=C(t)-C(s)-vp$ and using $S=Rn$ gives the particularly useful identity

$$
Rn_{\lambda\lambda}
=-2C'(s)p-(X_-^\lambda)''(s)p^2+(n-v)p_\lambda+2p n_\lambda.
\tag{6}
$$

Thus $|n_{\lambda\lambda}|\le M^2N_2$. Let $j=(X_-^\lambda)'''$ for this smooth calculation. The sampled velocity derivative satisfies

$$
v_{\lambda\lambda}=2C''(s)p+j(s)p^2+(X_-^\lambda)''(s)p_\lambda.
\tag{7}
$$

Consequently

$$
|D_{\lambda\lambda}|
\le M^2D_2+\frac{2A_CRM}m+\frac{|j(s)|R^2M^2}{m^2}.
\tag{8}
$$

Equation (7) retains the second moving-source derivative. Its two copies of $C''(s)p$ have different origins: the direct midpoint-velocity derivative and the parameter dependence of the source acceleration. Dropping either would lose a quadratic term.

For $f=R^{-2}D^{-1}$, one has $|f_\lambda/f|\le ML_1$ and

$$
\left|\frac{f_{\lambda\lambda}}f\right|
\le M^2\left\{\frac6{m^2}+\frac{4(1+\eta)}{m^3}+\frac{2(1+\eta)^2}{m^4}+2P_2\right\}
+\frac{|D_{\lambda\lambda}|}m.
\tag{9}
$$

The row $F(\lambda)=-Kfn$ therefore obeys

$$
|F_{\lambda\lambda}|
\le\frac K{R^2}\mathcal C M^2
+\frac{2K A_CM}{Rm^3}
+\frac{K M^2}{m^4}|j(s)|,
\tag{10}
$$

where the explicit constant is

$$
\mathcal C=\frac1m\left\{
N_2+\frac{2L_1}m+\frac6{m^2}+\frac{4(1+\eta)}{m^3}
+\frac{2(1+\eta)^2}{m^4}+2P_2+\frac{D_2}m
\right\}.
\tag{11}
$$

All coefficients depend only on the stated tube bounds. They do not require a bound on the pointwise jerk once (10) is integrated in reception time.

## Integrating the moving source, including acceleration jumps

The ordinary-clock bound (2) gives, for each fixed $\lambda$ in the smooth calculation,

$$
\int_I|j(s^\lambda(t))|\,dt
\le\frac{1+\beta}m\int_J|j(u)|\,du
\le\frac{1+\beta}m V.
\tag{12}
$$

This is the required source-to-reception change of variables. It retains the clock Jacobian explicitly. Applying (10) and $R\ge a$ gives

$$
\int_I|F_{\lambda\lambda}(t,\lambda)|\,dt
\le\frac{KL}{a^2}\mathcal C M^2
+\frac{2KL}{a m^3}A_CM
+\frac{K(1+\beta)}{m^5}VM^2.
\tag{13}
$$

For nonsmooth accelerations of bounded variation, approximate the complete input histories on the buffered interval by one-sided convolutions. This is a proof device for the functional inequality, not a substituted physical source or a selected future. The approximants converge in $C^1$ on every compact interval, preserve the speed bound by convexity, retain uniform bounds $M,A_C,A$, and have integrated acceleration derivatives bounded by the original total variation on $J$. Slightly enlarged range bounds provide common ordinary charts, and tend to the original $a,b$ as the convolution width tends to zero. Ordinary-root continuity then makes their acceleration rows converge uniformly on $I$. Applying (13) to the smooth approximants and passing to the original row proves the same integrated bound with the original finite total variation, including every acceleration jump. There is no claim that the original row has a pointwise second parameter derivative at a seam.

The scalar known control $v(u)=a_0u_+$ has second central difference $a_0(h-|u|)_+$, integral $a_0h^2$, and acceleration total variation $a_0$. It checks the quadratic integrated scaling and the necessity of including the jump measure before applying this passage to actual source histories. The complete affine controls have zero source-acceleration variation and reduce to smooth parameter differentiation. These analytical controls precede the coupled finite-prefix use.

## The full relative functional remainder

Reflection gives $F_-(\lambda)=-F_+(-\lambda)$. Let $F=F_+$ and define the difference between the actual full relative row and the centered row on the same relative history by

$$
\mathcal R(t)=F(t,1)+F(t,-1)-2F(t,0).
\tag{14}
$$

For smooth approximants the central-difference identity is

$$
F(1)+F(-1)-2F(0)
=\int_{-1}^1(1-|\lambda|)F_{\lambda\lambda}(\lambda)\,d\lambda.
\tag{15}
$$

The weight has integral one. Equations (13)–(15), followed by the same $C^1$ limit, prove

$$
\boxed{\displaystyle
\int_I|\mathcal R(t)|\,dt
\le\frac{KL}{a^2}\mathcal C M^2
+\frac{2KL}{a m^3}A_CM
+\frac{K(1+\beta)}{m^5}VM^2.}
\tag{16}
$$

For the half-relative equation $x''$, divide the bound by two. The bound is quadratic in $(M,A_C)$ at fixed source-acceleration variation and finite tube. It controls unequal, time-dependent clocks without identifying them or assuming that their shifts are symmetric. The original seam's possible pointwise absolute-linear cusp is consistent with (16).

## Why the finite BV class is compatible with generated canonical evolution

On a finite ordinary chart with range floor $a$, bounded velocities and bounded source accelerations, the generated acceleration is locally Lipschitz in reception time. To see this directly, write $F(S,v)=-KS/(|S|^3[1-\widehat S\cdot v])$. Along the actual clock,

$$
|S_t|\le\frac{2\beta}m,\qquad
\left|\frac{d}{dt}v(s(t))\right|\le\frac{(1+\beta)A}m
\tag{17}
$$

almost everywhere. The row derivative norms satisfy

$$
\|F_S\|\le K\left(\frac2{a^3m}+\frac\beta{a^3m^2}\right),\qquad
\|F_v\|\le\frac K{a^2m^2}.
\tag{18}
$$

Hence

$$
|A_i'(t)|\le K\left\{
\frac{4\beta}{a^3m^2}+\frac{2\beta^2}{a^3m^3}
+\frac{(1+\beta)A}{a^2m^3}\right\}
\tag{19}
$$

almost everywhere. The actual acceleration value uses continuous positions, velocities and ordinary clocks, so it is continuous for generated reception times. A supplied acceleration jump at release can create a jump in the differentiated row when sampled, but it does not create a new acceleration-value jump at each later sampling. A locally BV supplied acceleration, its one permitted release jump, and the generated locally Lipschitz acceleration therefore give finite total variation on every compact retained interval. The bound still grows with the finite interval and its tube constants; this is no uniform all-future BV estimate.

This local regularity statement applies to the exact original histories. The nominal circular metadata have smooth supplied accelerations on their declared interval, but extending their functional source or identifying them with a complete source remains subject to the unchanged historical assessment. No historical certificate is completed by the convolution proof.

## Remaining nonlinear transfer burden

Equation (16) repairs one specific gap under a stated stronger history norm. It does not bound accumulated deviation from an actual mirror reference, because $F(t,0)$ is evaluated on the actual relative history $x$, which itself evolves under the extra row. A transfer still needs continuous dependence and a global relative estimate, including arbitrary three-dimensional relative-history perturbations rather than only a chosen planar centered path.

Nor does an unweighted integrated acceleration bound close the [zero-speed angular tail](authorized-cases-ten-hour-d-primary-zero-speed-tail.md). Multiplying an anisotropic $O(|c|^2/d^2)$ row by separation to estimate angular motion costs a factor $d$ and introduces the divergent $\int dt/d$ on that branch. Passing from (16) to an infinite interval with finite constants would assume additional information not supplied by the accepted mirror theorem.

Falsifiers are an omitted term in (6) or (7), an incorrect denominator power in (10)–(13), a source seam whose total-variation measure is lost in the approximation, a finite ordinary tube satisfying all stated bounds but violating (16), or a generated acceleration-value jump despite continuous source velocities and strict ordinary-root margins. Failure of an arbitrary $W^{2,\infty}$ source to have finite $V$ is outside this theorem and leaves the earlier broad-class obstruction intact. No target computation or trajectory was run.
