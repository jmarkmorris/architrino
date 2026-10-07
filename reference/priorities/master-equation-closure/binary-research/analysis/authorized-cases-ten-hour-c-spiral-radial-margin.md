# Infinite continuation has a uniform inward radial margin

## Derived candidate

Every all-future regular strict-subfield continuation of a sufficiently small member of the admitted logarithmic family has constants $\varepsilon>0$ and $T_0<\infty$ such that

$$
r'(t)\ge-1+\varepsilon\qquad(t\ge T_0).
\tag{1}
$$

Consequently its ordinary transmitter factor has an eventual uniform positive lower bound,

$$
D(t)\ge\varepsilon
\tag{2}
$$

after increasing the cutoff, and its causal span satisfies

$$
R(t)\le\frac{2r(t)}{\varepsilon}
\tag{3}
$$

thereafter. This is a margin for inward radial velocity and the source denominator. It does not assert a uniform margin for total speed.

Claim grade: derived candidate pending independent assessment. The fixed law, complete preparation, actual small family and all-root treatment are those of the [method admission](authorized-cases-ten-hour-c-spiral-method-admission.md). The proof uses the accepted positive increasing angle with acute partner lag, source escape and physical radius divergence. It uses the local-delay inward budget derived in the [causal-collapse subject](authorized-cases-ten-hour-c-spiral-causal-collapse.md). That budget is restated below; its proof is the finite inward interval with $R'\le1$, not an assumed asymptotic model.

## A complete acute interval has a fixed acceleration projection

Use the continuous positive angle $\theta$ and let $e_b=x(b)/r(b)$. Consider one generated causal interval $[b,a]$, where $b=s(a)$ and $\theta(a)-\theta(b)<\pi/2$. For every receiving time $u\in[b,a]$, the angle $\nu(u)$ of its actual chord $n(u)$ lies between its source and receiver angles. Since the lag at every such reception is acute,

$$
\theta(b)-\frac\pi2<\theta(s(u))<\nu(u)<\theta(u)
\le\theta(a)<\theta(b)+\frac\pi2.
\tag{4}
$$

All source times in this argument are generated and late when the interval is taken sufficiently late; source escape and monotonicity ensure this. Formula (4) implies

$$
x''(u)\cdot(-e_b)=\frac{n(u)\cdot e_b}{R(u)D(u)}>0.
\tag{5}
$$

Thus the component of velocity in the inward direction at the beginning of the causal interval increases throughout that whole interval. The direction in (5) is fixed while $u$ varies. No monotonicity of the chord angle itself is assumed.

## Assume a sequence of almost unit inward radial velocities

Suppose $a_j\to\infty$ and $p(a_j)=r'(a_j)\to-1$. The strict speed bound gives

$$
|v(a_j)|\to1,\qquad v(a_j)+e_{a_j}\to0.
\tag{6}
$$

Write $b_j=s(a_j)$ and $L_j=R(a_j)$. The local-delay inward budget is

$$
1-|v|^2\ge\frac{p_-^2r^2}{128R^2}.
\tag{7}
$$

Applying (7) at $a_j$ gives $r(a_j)/L_j\to0$. The root equation then gives $r(b_j)/L_j\to1$. Also $L_j\to\infty$ because $r(a_j)\to\infty$. Source escape gives $b_j\to\infty$.

The displacement across this interval has length at least $L_j-2r(a_j)$. Exactly as in the complete-arc calculation, unit speed therefore implies

$$
\frac1{L_j}\int_{b_j}^{a_j}|v(u)+e_{b_j}|^2\,du\longrightarrow0,
\tag{8}
$$

and uniformly for $0\le\xi\le1$,

$$
\frac{x(b_j+\xi L_j)}{L_j}
-(1-\xi)e_{b_j}\longrightarrow0.
\tag{9}
$$

These statements follow from the displacement integral and Cauchy–Schwarz; no uniform acceleration or derivative convergence is presumed.

Choose $m_j=b_j+\xi_jL_j$ with $\xi_j\in[1/4,1/2]$ such that $v(m_j)+e_{b_j}\to0$, which is possible by (8). Formula (9) gives

$$
\frac{r(m_j)}{L_j}\ge\frac12-o(1),\qquad
p(m_j)\to-1,\qquad |v(m_j)|\to1.
\tag{10}
$$

## The fixed projection removes the endpoint layer

By (5), for every $u\in[m_j,a_j]$,

$$
v(u)\cdot(-e_{b_j})\ge v(m_j)\cdot(-e_{b_j})\longrightarrow1.
$$

Since $|v(u)|<1$, this gives the uniform conclusion

$$
\sup_{m_j\le u\le a_j}|v(u)+e_{b_j}|\longrightarrow0.
\tag{11}
$$

In particular (6) and (11) imply $e_{a_j}-e_{b_j}\to0$. The angle difference lies in $(0,\pi/2)$, so

$$
\delta_j:=\theta(a_j)-\theta(b_j)\longrightarrow0.
\tag{12}
$$

This is the additional information absent from mean-square convergence alone. The actual acceleration sign prevents a narrow endpoint interval from changing the nearly unit velocity to another direction while retaining the strict speed bound.

For $u\in[m_j,a_j]$, (4) and (12) put the chord angle in

$$
\theta(b_j)-\frac\pi2<\nu(u)<\theta(b_j)+\delta_j.
$$

Let $k_j$ be the unit vector with angle $\theta(b_j)+3\pi/4$. Its projection on the acceleration direction $-n(u)$ is at least $\cos(\pi/4+\delta_j)$, hence at least $1/2$ for all sufficiently large $j$. Integrating gives

$$
\int_{m_j}^{a_j}|x''(u)|\,du
\le2k_j\cdot[v(a_j)-v(m_j)]\longrightarrow0,
\tag{13}
$$

using (11). This controls total acceleration on the actual interval despite the absence of an assumed denominator margin.

## The range equation gives the contradiction

The exact ordinary clock gives

$$
\frac{R'}R=\frac1R-\frac{1-n\cdot v}{RD}
\ge-\frac2{RD}=-2|x''|.
\tag{14}
$$

Integrating (14) from $m_j$ to $a_j$, and using $R(a_j)=L_j$ and (13), yields

$$
\log\frac{R(m_j)}{L_j}
\le2\int_{m_j}^{a_j}|x''(u)|\,du\longrightarrow0.
\tag{15}
$$

Thus $\limsup R(m_j)/L_j\le1$. But (7) at $m_j$, together with (10), implies $r(m_j)/R(m_j)\to0$. Since $r(m_j)/L_j\ge1/2-o(1)$, it follows that $R(m_j)/L_j\to\infty$. This contradicts (15).

No sequence $p(a_j)\to-1$ exists, proving (1).

## Consequences for the source denominator and delay scale

The source-axis decomposition gives $D\ge1$ when $p_s\ge0$, and $D\ge1+p_s$ when $p_s<0$, because the tangential source velocity and both source-axis chord projections are positive. Source escape therefore transfers (1) to (2).

Once the complete causal interval lies after $T_0$, integrate the radial bound:

$$
r_s-r=-\int_s^t p(u)\,du\le(1-\varepsilon)R.
$$

Since $R\le r+r_s$, this implies

$$
\varepsilon r_s\le(2-\varepsilon)r,
\qquad R\le r+r_s\le\frac{2r}{\varepsilon},
$$

proving (3). On each earlier finite strict segment the existing ordinary denominator has a positive minimum, so an all-future branch also has a positive complete generated-future denominator bound after combining the finite and eventual bounds. The size of that bound is not numerically certified.

The proposed degeneration $D(t_j)\to0$ from the preceding obstruction subject is therefore impossible on an all-future admitted branch if this stronger argument is accepted. The earlier necessary geometry remains mathematically valid; (5)–(15) supply the missing exclusion of its endpoint behavior. This does not exclude total speed approaching one at outward passages.

## Known case, falsifiers and disposition

The exact spiral has $p=a>0$ and $D=1/\lambda>1$, consistent with all three conclusions. The proof is analytical and uses no new history, numerical amplitude, spectrum or trajectory.

Load-bearing falsifiers are failure of the fixed projection (5) on the complete generated causal interval; use of wrapped rather than continuous angle differences; failure to obtain an interior near-unit point from (8); an endpoint velocity change compatible with the monotone projection and the unit ball that evades (11); an incorrect acceleration-cone bound in (13); or a sign error in (14). These statements identify the precise new bridge beyond the earlier mean-square obstruction.

Only this new subject is written. Earlier subject and reference files, complete preparations and shared owners remain frozen. No owned computation is active. Independent assessment is required before integration.
