# Quantitative asymptotic law after certified monotone escape

Consider any selected positive-width/core law with the complete original held-tail preparation, both declared self and partner channels, and normalized $c_f=K=1$. Suppose its unrestricted mirror-symmetric continuation remains monotone after contact and $u(t)=-x'(t)\to\infty$. The separately derived [braking-work criterion](alternatives-screen-2026-10-05-width-entry-braking-work.md) supplies these hypotheses when the exact contact kinetic value exceeds its work cap. Then the stronger asymptotic conclusion is

$$
u(t)\sim\sqrt{2C_{h,\rho}t},\qquad
-x(t)\sim\frac23\sqrt{2C_{h,\rho}}\,t^{3/2},
$$

where

$$
C_{h,\rho}=\int_0^h\frac{1-g/h}{h}\,\frac{g}{(g^2+\rho^2)^{3/2}}\,dg
=\frac1{h\rho}-\frac{\operatorname{arsinh}(h/\rho)}{h^2}>0.
$$

The scalar speed $u(t)$ retains its orientation through contact. No equation coefficient is changed, and this conclusion concerns the unrestricted softened law after its earlier unit-speed event.

## Complete self-source decomposition

Write $d(t)=1/2-x(t)$, with $d(s)=0$ throughout the held tail $s\le-\delta$. The self reception gap is

$$
g_t(s)=d(t)-d(s)-t+s.
$$

Choose a fixed $T$ after which $u(s)>2$. Since $d(t)-t\to\infty$, the whole compact source interval $[-\delta,T]$ eventually has $g_t(s)>h$ and contributes exactly zero. On the held tail, $g_t(s)=d(t)-t+s$ sweeps the complete triangular window once, and its exact self contribution is $f_\rho(d(t))$. This distant held-tail band must be retained even though it becomes asymptotically small.

On $[T,t]$, $\partial_sg_t=1-u(s)<-1$, while $g_t(t)=0$. Thus the only remaining self band is the unique near-diagonal interval on which $g$ runs from $h$ down to zero. With its inverse source $S_t(g)$ and age $w_t(g)=t-S_t(g)$, the exact near self contribution is

$$
S_{\rm near}(t)=\int_0^h\frac{1-g/h}{h}\,
\frac{f_\rho(g+w_t(g))}{u(S_t(g))-1}\,dg.
$$

This change of variable includes the transmitter factor from the original time integral; it does not replace the finite-width law by an unweighted hit sum.

## Uniform near-band limit

The previously proved global positive-core acceleration bound gives $|u'|\le C_0$. Set $m_t=\inf_{s\in[t-1,t]}u(s)$, so $m_t\to\infty$. The whole near band eventually lies in this last unit interval and satisfies

$$
0\le w_t(g)\le\frac{h}{m_t-1},\qquad
|u(S_t(g))-u(t)|\le\frac{C_0h}{m_t-1}.
$$

Consequently $w_t\to0$ and $u(t)/(u(S_t(g))-1)\to1$ uniformly on $g\in[0,h]$. Continuity and boundedness of the positive-core kernel give

$$
u(t)S_{\rm near}(t)\longrightarrow C_{h,\rho}.
$$

## Remaining channels and integration

Eventually $y(t)=-x(t)>1/2$. Every partner source then has braking orientation and range at least $y(t)-1/2$. The monotone partner clock has derivative $1+u_s\ge1$, including the complete held past, so

$$
0\le P(t)\le\frac1{(y(t)-1/2)^2}.
$$

Because $u(t)\to\infty$, eventually $y(t)\ge t-C_1$. The global acceleration bound also gives $u(t)\le C_2+C_0t$. Hence both $u(t)P(t)$ and $u(t)f_\rho(d(t))$ tend to zero. Combining every declared channel yields

$$
u(t)u'(t)\longrightarrow C_{h,\rho}.
$$

Integrating $(u^2/2)'=uu'$ proves $u(t)^2/(2t)\to C_{h,\rho}$; a second integration proves the displayed $t^{3/2}$ displacement law. Positivity of $C_{h,\rho}$ follows directly from its integral, or from $\operatorname{arsinh}(z)<z$ for $z>0$.

> Grade: derived conditional asymptotic theorem, awaiting independent assessment. It strengthens a proved monotone-escape entry; it does not establish entry by itself. A surviving omitted self band, failure of the global acceleration bound, or invalid complete partner-clock mass bound would falsify the argument. The exact held-tail assumption is explicit; no claim is made here for arbitrary unbounded old histories.
