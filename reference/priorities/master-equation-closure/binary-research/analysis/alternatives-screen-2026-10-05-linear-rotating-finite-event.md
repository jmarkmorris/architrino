# Finite unit arrival for the fixed rotating linear-vector comparison

## Equation, domain and conclusion

This analysis selects exactly the fixed multiplier-free vector-linear comparison in the [ten-hour screen](../../analysis/alternatives-screen-2026-10-05.md), with $c_f=1$ and $k=0.2862286103053385$. Its complete ordinary response is the signed sum of $k\mathbf r/|D|$ over every positive-delay self and partner root. No quadratic receiver multiplier, cap, softened distance or outgoing selector is added. On a complete separated uniformly subfield mirror-planar history $X_1=q$, $X_2=-q$, causal geometry gives one partner root and no positive-delay self root. The exact future equation on that chart is

$$
q''(T)=-\frac{k[q(T)+q(S)]}{D},\qquad
R=T-S=|q(T)+q(S)|,\qquad
D=1+n\cdot q'(S),\quad n=\frac{q(T)+q(S)}R.
$$

Assume the complete past has nonnegative signed areal rate $h=q\times q'$ and the compatible release has $h(0)=h_0>0$. The [positive radial class argument](alternatives-screen-2026-10-05-radial-rotating-class.md) supplies local ordinary evolution, preservation of $h>0$, positive torque and positive radius, and identifies unit speed as the only finite maximal strict-domain boundary. Its hypotheses include the stated complete-past regularity and uniform speed margin. The present argument adds a uniform radial upper bound for this particular magnitude $g(R)=kR$.

**Derived proposed conclusion, awaiting independent assessment:** every such compatible rotating mirror preparation has a finite first unit-speed endpoint at positive separation. It cannot remain in the strict ordinary subfield chart for all future time. An explicit compatible circle-tail preparation is constructed below. The conclusion supplies neither universal transversality nor an outgoing event rule, periodic motion, stable binding or a nonlinear continuation beyond equality.

## A radial upper bound independent of a future speed margin

Let $r=|q|$, $u=r'$ and $h=q\times q'$. The exact causal geometry gives the actual lifted angular change $0<\theta(T)-\theta(S)<\pi/2$ and hence $q(T)\cdot q(S)>0$ throughout the strict future. These facts do not require a common all-future speed margin; the complete joined history on each finite preceding interval has one.

Project the exact equation onto $q(T)/r$. Since $0<D<2$,

$$
A_r=-\frac{k[r+r(S)\cos(\theta(T)-\theta(S))]}D
\le-\frac{k r}{2}.
$$

The exact polar identity is $r''=h^2/r^3+A_r$. Strict receiving speed gives $h^2/r^2<1$ and $|r'|<1$. Therefore

$$
r''\le\frac1r-\frac{k r}{2}.
$$

Set $L=2/\sqrt{k}$ and $c=\sqrt{k}/2$. Whenever $r\ge L$, the right side is at most $-kr/4\le-c$. During an excursion above $L$, its initial positive radial speed is less than one. The integrated inequality $r''\le-c$ bounds its additional height by $1/(2c)=1/\sqrt{k}$. The same bound applies from release if $r(0)>L$, while an initially nonpositive radial speed only reduces the excursion. Repeated exits and returns obey the same bound, so throughout the entire maximal strict future

$$
r(T)\le M:=\max\{r(0),2/\sqrt{k}\}+1/\sqrt{k}.
$$

This is a consequence of the acceleration equation and kinematic speed bound, not an assumed orbit or a physical conserved quantity. No asymptotic speed margin was inserted into the estimate.

## Contradiction to an infinite strict future

The exact positive-torque class theorem excludes a bounded all-future strict-subfield rotating mirror trajectory. Its proof eventually samples generated source history, uses the positive lower areal rate to bound the causal angle from below, and obtains a positive lower bound on $h'$ whenever both positions remain in a bounded region. But strict speed implies $h<r\le M$, a contradiction after enough elapsed time. Combining that theorem with the upper bound just proved rules out an infinite strict future.

The maximal endpoint is therefore finite. The same class theorem has $r>h_0$ on every strict generated interval. At a finite endpoint, positive radius keeps a positive root delay; sampled sources remain in already regular earlier compact intervals with positive transmitter margins. Root fold, contact and a missing old source cannot occur first. Ordinary continuation then leaves unit speed as the endpoint. In particular, limiting separation is at least $2h_0>0$. This conclusion does not imply that the limiting speed derivative is positive. If equality is excluded by the chosen domain, it is its first boundary, not a defined equality response.

## One complete compatible near-circular preparation

Choose release member radius one and speed $\beta=3/10$. The complete old circular path is

$$
q_c(T)=(\cos(\beta T),\sin(\beta T)),\qquad T\le0.
$$

Let $\xi$ be the unique solution of $\xi=\beta\cos\xi$ in $(0,\beta)$. Its complete partner source at release is $S_0=-2\cos\xi$. The exact received acceleration for this circular input is

$$
A_c=-\frac{k}{1+\beta\sin\xi}
\begin{pmatrix}1+\cos2\xi\\-\sin2\xi\end{pmatrix}.
$$

This acceleration is not the circular kinematic acceleration. Define $\Delta=A_c+\beta^2(1,0)$, choose $\delta=1/100$, and prescribe the complete past

$$
q(T)=q_c(T)+\phi(T)\Delta,\qquad
\phi(T)=
\begin{cases}
0,&T\le-\delta,\\
\tfrac12T^2(1+T/\delta)^3,&-\delta\le T\le0.
\end{cases}
$$

At the old seam the patch and its first two derivatives vanish. At release $\phi=\phi'=0$ and $\phi''=1$. Thus the history is $C^{2,1}$, preserves release position and velocity, and has $q''(0-)=A_c$. Since $0<\xi<3/10$, $S_0<-2\cos(3/10)<-1.9<-\delta$. The root remains in the unchanged circular tail; whole-history subfield monotonicity makes it the unique partner root. Therefore its complete response remains exactly $A_c$, proving endpoint compatibility. Ordinary self reception is absent by geometry, not suppressed.

The preparation bounds can be checked without a numerical root. Its acceleration correction obeys $|\Delta|\le2k+9/100<2/3$. On the patch, $|\phi|\le\delta^2/2$ and $|\phi'|\le5\delta/2$, by bounding the two derivative terms individually on $[-1,0]$. Consequently

$$
|q-q_c|<1/30000,\qquad
|q'-q_c'|<1/60,\qquad
|q'|<19/60<1,
$$

and $|q|>1-1/30000$. Expanding the cross product gives

$$
|q\times q'-3/10|
\le |q-q_c|\,\beta+|q'-q_c'|+|q-q_c|\,|q'-q_c'|
<1/50.
$$

The entire past therefore has $h>7/25$, while $h(0)=3/10$. Separation is positive, the past speed margin is explicit, and the history is complete. The preceding theorem applies with $r(0)=1$, hence $M=3/\sqrt{k}$, and limiting pair separation at least $3/5$.

For this bounded supplied past one can also give a conservative explicit elapsed-time upper bound. Put $h_p=7/25$. Both supplied and generated paths have radius below $M$, areal rate at least $h_p$, and radius at least $h_p$ while the future remains strict. The complete causal angle satisfies $\Delta\theta\ge h_pR/M^2$, $R\ge r\ge h_p$, and $\sin\Delta\theta\ge2\Delta\theta/\pi$. Exact linear torque then gives

$$
h'=\frac{k r r(S)\sin\Delta\theta}D
\ge\frac{k h_p^4}{\pi M^2}=:c_h>0.
$$

Since $h(T)<r(T)\le M$, a strict future cannot last as long as $(M-3/10)/c_h$. This upper bound is intentionally conservative and is not a numerical trajectory measurement. It is finite with the exact selected decimal coupling treated as a rational number.

## Evidence boundary and falsifiers

The coordinator derived the radial inequality and preparation directly from the fixed response after the initial broad screen. The earlier positive-torque class proof and its [independent reconstruction](../../analysis/alternatives-screen-2026-10-05-adjudication-escape-supplement.md#rotating-mirror-radial-class) supply the declared geometric premises. No new numerical instrument or target evolution was used. Independent assessment of this new specialization and explicit preparation is pending; this source is to remain frozen during that review.

A complete compatible trajectory in the stated class with an infinite strict-subfield future would falsify the theorem. More local falsifiers are a causal source with nonpositive current dot product despite the proved lifted-angle hypotheses, a radial excursion exceeding $M$ while the displayed differential inequality and speed bound hold, a failed release compatibility/root census, or a finite ordinary endpoint other than unit speed with the stated positive margins. Nonmirror paths, a negative earlier areal rate, changed coupling, a receiver multiplier, superfield prescribed segments and post-event branch choices are outside this theorem.
