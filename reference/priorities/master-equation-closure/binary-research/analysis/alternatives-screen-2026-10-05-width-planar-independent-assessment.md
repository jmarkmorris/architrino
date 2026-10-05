# Independent finite-width planar unit-event assessment

## Complete case and conclusion

**Derived and independently reconstructed:** each of the four selected triangular finite-width laws, $(h,\rho)\in\{1/16,1/32\}\times\{1/32,1/64\}$ with $K_{ij}=c_f=1$, admits the explicit compatible planar mirror preparation below. Its coupled future reaches its first unit-speed event before $T=1/6$, at present separation greater than $199$. The crossing is transverse, with $d|V|/dT>1$ at unit speed. The unrestricted softened equation continues uniquely through the crossing. A strict-ceiling interpretation stops there unless an additional response is selected.

This is a large-separation tangential preparation. It is neither an exact circular balance nor a claim about the later fate of the continued pair. The four laws retain every self and opposite-polarity partner source in the complete time integral. No sharp-root census is substituted for that integral.

The subject [compatible planar theorem](../../collinear-research/analysis/alternatives-screen-2026-10-05-width-entry-planar-unit-event.md) and [transversality supplement](../../collinear-research/analysis/alternatives-screen-2026-10-05-width-entry-planar-transversality.md) were read before this assessment. The reconstruction below uses a separate full-age partner estimate and a different moving cone, avoiding the subject's sharper affine-source clock change of variable. This is mathematical independence after disclosure, not blind rediscovery or numerical reproduction.

## Equation, complete history and compatibility

For the positive member write $q(T)$ and for the other $-q(T)$. With $w_h(g)=(1-|g|/h)_+/h$ and $F_\rho(z)=z/(|z|^2+\rho^2)^{3/2}$, its equation is

$$
q''(T)=\int_{-\infty}^{T} F_\rho(q(T)-q(S))w_h(|q(T)-q(S)|-T+S)\,dS
-\int_{-\infty}^{T} F_\rho(q(T)+q(S))w_h(|q(T)+q(S)|-T+S)\,dS.
$$

Fix $R=100$, $b=1/2$, $\delta=2^{-24}$ and $C=2^{14}$. The complete supplied history is

$$
q_A(S)=R e_x+bS e_y+\frac{(S+\delta)_+^3}{6\delta}A,\qquad S\le0,
$$

where $A$ is the unique fixed point of the full release acceleration map on $|A|\le C$. This history is $C^{2,1}$, its old tail is affine, and $q_A''(0)=A$. Its velocity differs from $b e_y$ by at most $C\delta/2=1/2048$; positions differ from the affine reference by at most $C\delta^2/6$.

Here is an independent check of the uniform functional bounds needed for this fixed point. The maximum of $|F_\rho|$ is $2/(3\sqrt3\rho^2)$, and $\|DF_\rho\|\le\rho^{-3}$. The latter follows from the tangential eigenvalue $(r^2+\rho^2)^{-3/2}$ and radial eigenvalue $(\rho^2-2r^2)/(r^2+\rho^2)^{5/2}$; after squaring, $(1-2z)^2\le(1+z)^5$ for $z\ge0$ bounds the radial term. Split the age integral at $2h$. On the first part, use $w_h\le1/h$ and $|w_h'|\le1/h^2$. On the second, any active window has $r\ge\tau-h$, so $|F_\rho|\le(\tau-h)^{-2}$ and $\|DF_\rho\|\le2(\tau-h)^{-3}$. The resulting bounds are no larger than the subject's per-channel constants

$$
B=\frac4{3\sqrt3\rho^2}+\frac2{h^2},\qquad
L=\frac2{\rho^3}+\frac4{3\sqrt3h\rho^2}+\frac4{h^3}.
$$

The two-channel acceleration is bounded by $2B<C$. Since $4/(3\sqrt3)<4/5$, the largest permitted reciprocal widths and cores give $L<760218<2^{20}$. The displacement change in either channel under $A\mapsto\widetilde A$ is at most $\delta^2|A-\widetilde A|/3$. Therefore the release map has Lipschitz constant at most $2L\delta^2/3<1/2$ and takes the closed ball into itself. This establishes the claimed fixed point, separation of the complete past, and exact acceleration compatibility. The same complete-age estimates give the previously admitted global existence, uniqueness and continuous acceleration for this finite-width equation; mirror and planar symmetries persist by uniqueness.

## A separate complete partner bound

For a hypothetical pre-unit future through $T\le1/6$, every generated horizontal coordinate satisfies $q_x(S)\ge100-C\delta^2/6-1/6$. The supplied past has an even stronger lower bound. Thus every partner displacement, regardless of its source time, has length

$$
r\ge L_0=200-C\delta^2/3-1/3>199.
$$

If a partner age $\tau=T-S$ contributes, then $|r-\tau|\le h$, so $\tau\ge L_0-h$ and $r\ge\tau-h$. Without any monotonicity or uniqueness assertion about the source clock,

$$
|A_{\rm partner}(T)|\le\frac1h\int_{L_0-h}^{\infty}\frac{d\tau}{(\tau-h)^2}
=\frac1{h(L_0-2h)}<\frac16.
$$

The last inequality holds for all four fixed pairs because $h\ge1/32$, $2h\le1/8$ and $L_0>199$. This deliberately broad full-age bound includes any extra source band. The subject's sharper $1/1000$ bound is also valid after proving that all active partner sources lie in the old affine tail, but the conclusions below do not require it.

## Self propulsion and the first unit event

Suppose the complete history through a reception has $|V|\le1$ and $V_y\ge q_*>0$. On every age in $[h/4,h/2]$, the self displacement $z$ obeys $z_y\ge q_*\tau$, $|z|\le\tau$, and $w_h(|z|-\tau)\ge1/(2h)$. Its contribution is consequently bounded below by

$$
A_{{\rm self},y}\ge\frac{q_*h}{32[(h/2)^2+\rho^2]^{3/2}}>8q_*.
$$

For the final inequality, $(h/2)^2+\rho^2\le1/512$, so its three-halves power is smaller than $1/8192$, and $h\ge1/32$. Every other self contribution has nonnegative longitudinal component, because each self displacement integrates the complete positive longitudinal velocity history.

Every candidate supplied history has $V_y>49/100$, including candidates whose coefficient has negative longitudinal component. The preceding release bounds therefore give $\mathcal F(A)_y>8(49/100)-1/6>3$. At the actual compatible fixed point, $A_y>3$, and its entire supplied history has $V_y\ge1/2$, with strict inequality at release. A first future loss of this lower velocity barrier is impossible before unit speed: at its proposed first boundary the complete past still satisfies the barrier, and $V_y'>4-1/6>3$. Hence the barrier and this acceleration bound persist up to the first unit event.

If the speed stayed below one through $T=1/6$, integration would give $V_y(1/6)>1/2+3/6=1$. Thus $T_*<1/6$. The horizontal bound already proves the separation at this first event exceeds $199$. The global finite-width theorem excludes an earlier loss of the unrestricted solution domain.

## Independent cone proof of transversality

Use the larger cone slope

$$
\kappa(T)=\frac1{1000}+\frac T2\quad(T\ge0),\qquad \kappa(S)=\frac1{1000}\quad(S<0).
$$

The supplied velocities lie strictly in $|V_x|<\kappa V_y$, since their ratio is at most $1/1024<1/1000$. Before $T=1/6$, $\kappa<1/10$. If all past velocities lie in this expanding cone, integrating them over any source interval shows that every self displacement, and then its positive weighted acceleration contribution, lies in the current cone. At a proposed first boundary of $\kappa V_y\pm V_x\ge0$,

$$
\frac d{dT}(\kappa V_y\pm V_x)
\ge\frac12V_y-\sqrt{1+\kappa^2}|A_{\rm partner}|
>\frac14-\frac{\sqrt{101/100}}6>0.
$$

The cone is therefore invariant before the first unit event. Its two inequalities give

$$
V\cdot A\ge(1-\kappa^2)V_y A_{{\rm self},y}-|V||A_{\rm partner}|
>\frac{99}{100}\frac12\,4-\frac16>1.
$$

Continuity of the full acceleration extends this strict lower bound to the unit event. At $|V|=1$, $d|V|/dT=V\cdot A>1$. The unique unrestricted continuation is immediately superfield. No source acceleration, root birth or imposed ceiling response is hidden in this argument: the law is the original complete finite-width integral throughout.

## Boundaries and falsifiers

The result is a compatible coupled planar first-event theorem for four fixed softened laws. It establishes no bounded binary, circular reference, later escape rate, arbitrary nonmirror stability or sharp-width limit. The strict-ceiling endpoint and the unrestricted transverse crossing are separate speed-domain statements. A failure of the global complete-age bounds, a missed source band in the full-age partner estimate, a self displacement leaving the cone despite its complete velocity history, or a failure of the fixed-point compatibility would falsify the corresponding proof. No numerical target or evolution was used.
