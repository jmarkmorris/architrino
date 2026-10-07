# A modified scalar account for actual slow nonmirror motion

**Grade: derived candidate, awaiting independent assessment.** The unchanged canonical acceleration law admits an exact scalar derivative identity that absorbs the leading anisotropy from midpoint motion. On an explicitly quantified slow region this scalar increases strictly, including both actual moving clocks and the variation of midpoint velocity. The result supplies a useful conditional dispersal criterion. It does not yet prove that a full neighborhood of the selected slow source stays in that region.

The source identities and ordered analytical controls are those in the [frozen method](authorized-cases-ten-hour-d-primary-method.md). Use source-fixed $K>0$ and $c_f=1$, no response factor, and complete histories with strict member speed at most $\beta<1$. Complete strict speed implies precisely one ordinary partner root per receiver and no positive-delay self roots. The coincident self event remains excluded by the canonical law; no ordinary root is suppressed. The two receiver clocks are evaluated independently throughout.

## Exact current affine decomposition

For actual simultaneous positions and velocities define

$$
Z=dN=X_+-X_-,\quad U=V_+-V_-,\quad W=\frac{V_++V_-}{2},
\quad u=N\cdot U,\quad v=U-uN,
\tag{1}
$$

$$
a=N\cdot W,\quad b=W-aN,\quad g=\sqrt{1-|b|^2},\quad g_0=\sqrt{1-\beta^2}.
\tag{2}
$$

The two current source velocities are $W\mp U/2$. Their entire connecting segment lies in the speed ball of radius $\beta$ by convexity. For a generic source velocity $z=a_zN+b_z$, the complete affine evaluation of the positive receiver's canonical row is

$$
F(N,z)=-\frac K{d^2}\{O(z)+E(z)\},\qquad
O(z)=b_z-a_zN,\quad E(z)=q_zN-\frac{a_zb_z}{q_z},
\quad q_z=\sqrt{1-|b_z|^2}.
\tag{3}
$$

This follows by solving its ordinary positive clock, as in the [current-affine tail calculation](authorized-cases-ten-hour-d-primary-parabolic-tail.md). $O$ is linear and odd; $E$ is even. These are prescribed evaluations used to compare the actual acceleration functional, not coupled affine solutions or a symmetry assertion.

Write $B=2K\nabla_Z(g/d)$, with $W$ held fixed in this spatial derivative. Direct differentiation gives

$$
B=-\frac{2K}{d^2}\left(gN-\frac{ab}{g}\right).
\tag{4}
$$

The exact affine relative and midpoint rows are

$$
A_{\rm rel}^{\rm aff}=B+\frac K{d^2}(U-2uN)+Q,
\tag{5}
$$

$$
A_{\rm ctr}^{\rm aff}=\frac K{d^2}(aN-b)+\Delta,
\tag{6}
$$

$$
Q=-\frac K{d^2}\{E(W-U/2)+E(W+U/2)-2E(W)\},
\quad
\Delta=\frac K{2d^2}\{E(W+U/2)-E(W-U/2)\}.
\tag{7}
$$

In particular the term linear in relative velocity in (5) is independent of $W$ exactly. At $U=0$, (5) and (6) give the accepted parallel affine rows. At $W=0$ and $v=0$, they give $A_{\rm rel}^{\rm aff}=-K(2+u)N/d^2$ and zero midpoint row. These analytical controls precede the actual-row application below.

Let $Q_r=N\cdot Q$ and $Q_t=Q-Q_rN$. Concavity of $g(b)=\sqrt{1-|b|^2}$ gives

$$
0\le Q_r\le\frac{K|v|^2}{4g_0^3d^2}.
\tag{8}
$$

For $f(b)=b/g(b)$ one has $\|Df\|\le g_0^{-3}$ and $|D^2f[z,z]|\le3\beta g_0^{-5}|z|^2$. Expanding the tangential part of (7) yields

$$
|Q_t|\le\frac K{d^2}\left\{
\frac{3\beta^2|v|^2}{4g_0^5}+\frac{|u||v|}{2g_0^3}\right\},
\qquad
|U\cdot Q|\le\frac{3\beta}{2g_0^5}\frac{K|v|^2}{d^2}.
\tag{9}
$$

For clarity, the exact tangential expression is $K d^{-2}\{a[f(b+v/2)+f(b-v/2)-2f(b)]+(u/2)[f(b+v/2)-f(b-v/2)]\}$. The second bound in (9) uses $|u|,|v|\le2\beta$ and $g_0^2+\beta^2=1$. Similarly,

$$
|\Delta_t|\le\frac K{2d^2}\left\{
\frac{\beta|v|}{g_0^3}+\frac{\beta|u|}{g_0}\right\}.
\tag{10}
$$

## Actual-delay error, kept separate

Set

$$
e_{\rm rel}=A_+-A_--A_{\rm rel}^{\rm aff},\qquad
e_{\rm ctr}=\frac{A_++A_-}{2}-A_{\rm ctr}^{\rm aff}.
\tag{11}
$$

These definitions retain the actual clocks and their source velocities. A quantitative bound is available when both current causal windows are generated, the complete speed bound holds, and

$$
\beta\le\frac1{100},\qquad \chi:=\frac Kd\le\frac1{100}.
\tag{12}
$$

Put $m=1-\beta$. Every source-window separation is at least $d(1-3\beta)/m$, because each delay is at most $d/m$ and the relative speed is at most $2\beta$. The canonical root bound therefore gives

$$
\sup_{[t-d/m,t]}|A_j|\le A_0\frac K{d^2},\qquad
A_0=\frac{(1+\beta)^2m}{(1-3\beta)^2}<1.08.
\tag{13}
$$

If the earliest part of this displayed interval precedes release, the hypothesis must instead require the same bound on that supplied part. For the stated generated-window application, take $t-d/m\ge0$; supplied acceleration is never silently replaced by (13).

Taylor's integral formula around the current source state gives a position error at most $A_0K/(2m^2)$ and a source-velocity error at most $A_0K/(md)<1.1K/d$. The strictly monotone affine clock gap has slope at least $m$. Thus the actual clock and chord differ from the current affine clock and chord by at most $\sigma K$, where

$$
\sigma=\frac{A_0}{2m^3}<0.56.
\tag{14}
$$

Both endpoint ranges are at least $d/(1+\beta)$. Every chord on the straight comparison segment consequently has range at least $d/(1+\beta)-0.56K>0.98d$. On that segment the canonical row $-Kn/(R^2D)$, with $D=1-n\cdot V_j$, has derivative bounds

$$
\|D_S A\|\le\frac K{d^3}\left\{
\frac2{0.98^3\,0.99}+\frac{0.01}{0.98^3\,0.99^2}\right\}<\frac{2.2K}{d^3},
\qquad
\|D_V A\|\le\frac K{0.98^2\,0.99^2d^2}<\frac{1.1K}{d^2}.
\tag{15}
$$

The single-row error is therefore less than $(2.2\cdot0.56+1.1^2)K^2/d^3<3K^2/d^3$, and

$$
|e_{\rm rel}|\le\frac{6K^2}{d^3},\qquad
|e_{\rm ctr}|\le\frac{3K^2}{d^3}.
\tag{16}
$$

No acceleration derivative is used: locally bounded acceleration and continuous velocity suffice for the integral expansion. Thus the original release acceleration seam is permitted. The root census remains that of the complete histories, not a truncation to the generated interval.

## Exact scalar identity and a signed lower bound

Define the auxiliary scalar

$$
\mathcal J=\frac{|U|^2}{2}-\frac{2Kg}{d}-\frac{Ku}{d}.
\tag{17}
$$

This is an algebraic account constructed from the canonical motion; it is not an imported physical energy or a conservation premise. Since $N'=v/d$, $u'=|v|^2/d+N\cdot(A_+-A_-)$, and $\partial_Wg=-b/g$, direct differentiation gives the exact actual identity

$$
\begin{aligned}
\mathcal J'={}&\frac{K^2}{d^3}\left(2g+u-\frac{2|b|^2}{g}\right)
+U\cdot Q-\frac Kd Q_r+\frac{2K}{dg}b\cdot\Delta\\
&+\left(U-\frac KdN\right)\cdot e_{\rm rel}
+\frac{2K}{dg}b\cdot e_{\rm ctr}.
\end{aligned}
\tag{18}
$$

The terms containing $\Delta$ and $e_{\rm ctr}$ explicitly account for the actual variation of midpoint velocity. They cannot be discarded by holding $W$ fixed. The cancellation in (18) uses the spatial gradient in (4), then separately differentiates the $W$ argument.

In addition to (12), assume the transverse relative motion satisfies

$$
\Lambda:=\frac{d|v|^2}{K}\le8.
\tag{19}
$$

Equations (8)–(16) give

$$
\mathcal J'\ge\frac{K^2}{d^3}\left\{
2(1-2\beta^2)-2\beta
-\frac{3\beta\Lambda}{2g_0^5}
-\frac{\beta^2}{g_0^3}
-2\beta^3(g_0^{-4}+g_0^{-2})
-12\beta-6\chi-\frac{6\beta\chi}{g_0}
\right\}.
\tag{20}
$$

The displayed braces exceed $3/2$ throughout (12) and (19). A fully rational conservative check replaces every $g_0$ denominator by $0.99$, every positive small parameter by its upper bound, and the leading term by $2(1-2/10000)$. Consequently

$$
\boxed{\mathcal J'\ge\frac{3K^2}{2d^3}>0.}
\tag{21}
$$

This strict sign holds for the actual delay equation inside the stated region. It has not assumed mirror symmetry, planarity, bounded angular motion, convergence of $N$, or positive terminal relative speed.

## Conditional dispersal and the remaining admission problem

If an ordinary actual solution remains in (12) and (19) for all $t\ge T$, with its complete history and generated-window hypothesis as above, then $\mathcal J$ is bounded above by the speed and distance bounds. Integrating (21) gives $\int_T^\infty d(t)^{-3}\,dt<\infty$. Since $|d'|\le2\beta$, any infinitely recurring bounded-distance subsequence would give disjoint intervals of fixed positive length on which $d$ stays bounded. Their contributions contradict that integral. Hence $d(t)\to\infty$.

This is a derived conditional dispersal criterion with an explicit all-future region. It improves the scalar bookkeeping and allows angular behavior different from the mirror tail. It does not prove that a neighborhood of the slow mirror source satisfies its all-future hypotheses. In particular, the known nonlinear midpoint estimate controls $|W|$ using an actual integral of $K/d^2$, while (21) directly controls only the stronger-decaying weight $K^2/d^3$. The difference matters on infinite time intervals. The separate region-admission analysis must address that midpoint bound and passage through $\mathcal J=0$ without substituting the mirror trajectory for the actual histories.

Falsifiers are an incorrect affine parity decomposition (3)–(7), a missing variation term in (18), a complete generated causal window satisfying (12) but violating (16), or an actual ordinary solution satisfying every all-future region hypothesis yet failing to disperse. The last conditional assertion is not a claim that such a region has been established for the literal historical source. No numerical trajectory, new source preparation, modified law or physical conservation law was used.
