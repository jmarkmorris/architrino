# Strict convexity of the complete paired tangential response

## Statement and scientific scope

**Derived claim, pending independent reconstruction:** for $0\le v\le1$, the equal-radius tangential kernel $B_v(\beta)$ has strictly negative third derivative on $0<\beta<2\pi$. Hence its antipodal-pair difference $Q_v(x)=B_v(x)-B_v(x+\pi)$ is strictly convex on $0<x<\pi$.

The functions are those of the independently reconstructed [complete angle chart](overnight2-c-equal-radius-chart-independent-review.md) and [alternating-gap equations](overnight2-c-alternating-gap-independent-review.md). The selected logarithmic law keeps $K_{\log}=c_f=1$, complete circular histories, unchanged transmitter weighting and every positive ordinary root. For $v\le1$ there are thirty partner and no positive self roots. This derivative theorem is a property of the complete paired response, not an existence, global phase exclusion or stability result.

## Derivative polynomial and exact positivity

Put $c=\cos(\alpha/2)\in(-1,1)$, $s=\sqrt{1-c^2}>0$ and $D=1-vc>0$, where $\beta=\alpha-2v\sin(\alpha/2)$. Then

$$
B_v=\frac{c}{sD},\qquad \frac d{d\beta}=-\frac{s}{2D}\frac d{dc},\qquad
B_v'''=-\frac{N(c,v)}{4(1-c^2)^2D^7}.
$$

Direct differentiation gives the polynomial

$$
N=1+2c^2+\frac{c-c^5-18c^3}{2}v
+\frac{15-48c^2+59c^4-8c^6}{2}v^2-3c^7v^3.
$$

The [symbolic proposal instrument](../evidence/overnight2-c-tangential-curvature-symbolic-rational.py) produced this algebra after known controls; the following positivity argument is exact algebra and requires separate reconstruction. Write it in the cubic Bernstein basis in $v$:

$$
N=b_0(1-v)^3+3b_1v(1-v)^2+3b_2v^2(1-v)+b_3v^3,
$$

with

$$
b_0=1+2c^2,
$$

$$
b_1=\frac{1-c}{6}(c^4+c^3+19c^2+7c+6),
$$

$$
b_2=\frac{(1-c)^2}{6}(-8c^4-18c^3+31c^2+44c+21),
$$

$$
b_3=\frac{(1-c)^3}{2}(6c^4+26c^3+61c^2+52c+17).
$$

Expanding the four basis terms recovers the displayed power polynomial. Every coefficient is strictly positive for $-1<c<1$:

- $b_0>0$ immediately. For $b_1$, its bracket is positive for $c\ge0$. For $-1<c<0$, $c^4+c^3\ge-1$, while $19c^2+7c+5>0$ by its negative discriminant $49-380<0$ and positive leading coefficient. Thus that bracket remains positive.
- For $b_2$ and $c\ge0$, the bracket is at least $5c^2+44c+21>0$, using $c^3,c^4\le c^2$. For $c=-x$, $0<x<1$, its first two terms become $-8x^4+18x^3\ge0$, while $31x^2-44x+21>0$ by $44^2-4\cdot31\cdot21=-668<0$.
- For $b_3$ and $c\ge0$, all bracket coefficients are positive. For $c=-x$, the bracket $6x^4-26x^3+61x^2-52x+17$ has quartic Bernstein coefficients $(17,4,7/6,2,6)$ on $0\le x\le1$. Thus it is a positive weighted sum of the nonnegative basis functions $\binom4k x^k(1-x)^{4-k}$, whose sum is one.

The factors $1-c$ are strictly positive. Since the cubic Bernstein weights are nonnegative and sum to one for $v\in[0,1]$, $N>0$ throughout the domain, including both speed endpoints. The denominator is positive, giving $B_v'''<0$.

At $v=0$ this reduces to the independently known cotangent identity $B_0'''=-(1+2c^2)/[4(1-c^2)^2]$. At $v=1$ the polynomial has the factorization $N=(1-c)^3(6c^4+26c^3+61c^2+52c+17)/2$, with positive interior factors. These are exact limiting checks, not an extension through excluded coincidence angles.

## Paired convexity and a necessary gap restriction

Because $B_v'''<0$, its second derivative strictly decreases. Consequently

$$
Q_v''(x)=B_v''(x)-B_v''(x+\pi)
=-\int_x^{x+\pi}B_v'''(y)\,dy>0.
$$

For each fixed speed, $Q_v(x)$ diverges to positive infinity at both endpoints $x\downarrow0$ and $x\uparrow\pi$. For $v<1$, the leading divergences of $B_v$ are $2/\beta$ at zero and $-2/(2\pi-\beta)$ at the upper endpoint; the transmitter factor cancels from those leading terms after the inverse angle map. At $v=1$, $H_1(\alpha)\sim\alpha^3/24$, $D\sim\alpha^2/8$ and $B_1\sim16/\alpha^3=2/(3\beta)$ at zero; the upper endpoint remains $-2/(2\pi-\beta)$. Other terms of the paired difference stay finite at each endpoint. Therefore strict convexity gives a unique minimum at some $m_v\in(0,\pi)$, with $Q_v'<0$ to its left and $Q_v'>0$ to its right.

For $v>0$, $H_v(\pi)=\pi-2v<\pi$ implies $\alpha_v(\pi)>\pi$, hence $B_v(\pi)<0$. The complete alternating tangential equations are

$$
Q_v(\pi-x_{i-1})-Q_v(x_i)=B_v(\pi)<0,
\qquad x_1+x_2+x_3=\pi.
$$

Their first argument equals $x_i+x_{i+1}>x_i$. If any $x_i\ge m_v$, strict increase of $Q_v$ to the right of its minimum would make that difference positive, a contradiction. Thus every exact alternating configuration must satisfy

$$
0<x_i<m_v\quad(i=1,2,3),\qquad m_v>\pi/3.
$$

In particular, every speed for which $m_v\le\pi/3$ is excluded by the full tangential equations, without a radial hypothesis. This is a necessary condition and a conditional exclusion: the position of $m_v$ has not yet been bounded here. Strict convexity alone does not place it at or below $\pi/2$, nor does it license a claim that all configurations have regular gaps.

## Next deciding step and falsifiers

The useful next question is the location of the unique minimizer $m_v$, equivalently the sign of $Q_v'$ at a specified angle, while preserving the coupled radial equations. A proof that $m_v\le\pi/2$ would add a monotone-successor constraint on the three linked equations, but it is not assumed here. A bounded, known-first interval sign check can select or certify a speed range if direct analytic comparison fails. The earlier failed unrestricted total-tangential sign remains excluded as a proof shortcut.

A different third derivative, an incorrect Bernstein coefficient or sign, failure of the endpoint asymptotics, or a complete tangential-balanced configuration with any $x_i\ge m_v$ would falsify the corresponding statement. Independent reconstruction must cover the polynomial and positivity, not just replay the same symbolic output. No alternate kernel, coupling, phase preparation, omitted root or new ceiling is introduced.

The allocation clock remains start 03:25:15 UTC, exploration stop 13:55:15 UTC and hard deadline 15:25:15 UTC on October 7. The only numerical software use was a bounded exact symbolic proposal calculation; its failed first representation and corrected rational representation remain retained separately.
