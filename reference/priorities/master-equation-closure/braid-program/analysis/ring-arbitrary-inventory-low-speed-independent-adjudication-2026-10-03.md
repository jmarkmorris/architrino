# Independent adjudication of low-speed exclusion at arbitrary even inventory

Date: 2026-10-03. **Scenario: unchanged Master Equation, all ordinary positive-delay roots retained, $c_f=1$ in numerical expressions.** Subject: [ring-arbitrary-inventory-low-speed-attempt-2026-10-03.md](ring-arbitrary-inventory-low-speed-attempt-2026-10-03.md), frozen SHA-256 `4d3789216b66d8b6879bc1eeeefc8729e618b2f18fe0b629b876b5d53747b493`. The subject, previous instruments and numerical receipts were not edited.

## Verdict and scope

**Accepted, derived analytical theorem:** no regular planar equally spaced alternating circular history with any finite even $M\ge2$, positive radius $R$, positive baseline coupling $K$, and speed $0\le\beta=v/c_f\le1$ is an exact solution of the unchanged Master Equation. At positive speed, its complete tangential acceleration is strictly positive in the chosen rotation convention. At rest, its radial acceleration is strictly negative while the proposed history has zero acceleration. Reflection gives the same exclusion for the opposite rotation convention.

More precisely, at every $0<\beta\le1$,

$$
C_t(\beta;M)\ge C_t(\beta;2)
=\frac{\sin d}{4\cos^2d(1+\beta\sin d)}>0,
\qquad d=\beta\cos d,\quad 0<d<\pi/2.
$$

The first inequality is strict for every $M>2$. These are exact analytical signs, rather than sampled or floating-point interval signs. No numerical root solver is required by their proof.

The result covers symmetric alternating circles, not unequal radii, deformed phases, breathing or noncircular trajectories, translating centers, puckering, nonalternating orders, or infinitely many sources. It does not establish a stability spectrum: the excluded histories are not balanced references about which one may linearize. It does not supply an event continuation through the wake boundary.

**Falsifier:** a missing ordinary root in the circular causal reduction, a wrong sign in a per-hit acceleration row, a failure of either kernel comparison or of the midpoint weight, or an exact regular alternating circle with zero tangential residual in the stated domain overturns the corresponding conclusion. The static statement separately fails if the signed radial sum is nonnegative. Every premise and comparison can be inspected below without rerunning a finite scan.

## Independent reconstruction of the complete causal census

This adjudication uses the accepted [baseline circular reduction](ring-low-speed-census-2026-10-03.md#2-complete-subwake-and-equality-census) and reconstructs its census and paired sum. It does not import an existing evaluator, numerical oracle, or subject script. The old [seven-inventory interval certificates](ring-low-speed-census-2026-10-03.md#4-new-outward-interval-cover) remain historical evidence; their finite inventory scope is not used to infer the present arbitrary-inventory theorem.

Let $h=\pi/M$. In a circular causal chart, the half-chord angle lies in $0<x<\pi$, the delay is $2R\sin x$, and lattice levels satisfy $F_\beta(x)=\beta\sin x-x=mh$. For $0\le\beta\le1$, $F_\beta$ decreases strictly from zero to $-\pi$ on the open angle interval. Its derivative is $\beta\cos x-1<0$ there, including equality $\beta=1$ because $x>0$. The interior levels are precisely $m=-1,\ldots,-M+1$; each has one root, associated with one partner source. Equivalently,

$$
x_j-\beta\sin x_j=jh,\quad j=1,\ldots,M-1,
\qquad D_j=1-\beta\cos x_j>0.
$$

The only self lattice levels in the closed range are the endpoints $m=0,-M$. Their angles $x=0,\pi$ have zero delay and zero range; neither is an ordinary positive-delay self hit. No positive-delay self root is present. Thus the complete directed census is exactly $M(M-1)$ partner hits and zero self hits at every speed in the closed low-speed interval. This is an empty retained self channel, not an exclusion rule. At wake equality every partner row is still ordinary; a self root born immediately above equality belongs to a different chart and cannot be substituted into the equality ledger.

With $D_j>0$, the baseline per-hit radial/tangential acceleration is $K/R^2$ times $(-1)^j(\sin x_j,\cos x_j)/(4\sin^2x_jD_j)$. Hence

$$
C_t=\frac14\sum_{j=1}^{M-1}(-1)^j
\frac{\cos x_j}{\sin^2x_j(1-\beta\cos x_j)}.
$$

No radius can cancel a nonzero $C_t$, since multiplying it by $K/R^2>0$ preserves its sign and the prescribed circular history has zero tangential acceleration.

## A decreasing paired kernel

Fix $0<\beta\le1$ and $0<a\le\pi/2$. Define $x,y$ by $x-\beta\sin x=a$ and $y+\beta\sin y=a$. Both relevant scalar functions are strictly increasing on their open domains; $0<y<a<x<\pi$. The complementary root at level $\pi-a$ is $\pi-y$. Define

$$
q(a)=\frac{\cos y}{\sin^2y(1+\beta\cos y)}
-\frac{\cos x}{\sin^2x(1-\beta\cos x)}.
$$

Independent implicit differentiation, keeping the extra implicit divisor, gives

$$
q'(a)=-\frac{N_y}{T_y^3}+\frac{N_x}{T_x^3},
$$

$$
N_y=1+\cos^2y+2\beta\cos^3y,\quad
N_x=1+\cos^2x-2\beta\cos^3x,
$$

$$
T_y=\sin y(1+\beta\cos y),\quad
T_x=\sin x(1-\beta\cos x).
$$

The cubic denominator is essential. For example, differentiating $\cos x/[\sin^2x(1-\beta\cos x)]$ first in $x$ yields $-N_x/[\sin^3x(1-\beta\cos x)^2]$; the derivative $dx/da=1/(1-\beta\cos x)$ supplies the third divisor. Both $T_x,T_y$ are positive. Since $y<\pi/2$, $N_y>0$. If $\cos x<0$, $N_x>0$ immediately. For $0\le c=\cos x<1$,

$$
N_x\ge1+c^2-2c^3=(1-c)(2c^2+c+1)>0.
$$

It remains to compare numerators and denominators simultaneously; neither alone would imply the derivative's sign. Put $m=(x+y)/2$ and $d=(x-y)/2$. Adding and subtracting the defining equations gives

$$
d=\beta\sin m\cos d,\qquad a=m-\beta\cos m\sin d.
$$

Because $y>0$ and $x<\pi$, one has $0<d<m<\pi$ and $d<\pi/2$. On the open half interval $a<\pi/2$, the second identity excludes $m\ge\pi/2$: at equality it would give $a=\pi/2$, and above equality it would give $a>m>\pi/2$. Hence $0<m<\pi/2$ and $0<d<m$ in that open interval.

Let $C=\cos m\cos d$ and $V=\sin m\sin d$, both positive. Since $\cos y=C+V$ and $\cos x=C-V$, exact expansion gives

$$
N_y-N_x=4C[V+\beta(C^2+3V^2)]>0.
$$

Separately, direct trigonometric subtraction gives

$$
T_x-T_y=2\cos m[\sin d-\beta\sin m\cos(2d)]
=\frac{2\cos m}{\cos d}[\sin d\cos d-d\cos(2d)].
$$

For $g(d)=\sin d\cos d-d\cos(2d)$, $g(0)=0$ and $g'(d)=2d\sin(2d)>0$ on $0<d<\pi/2$. Thus $T_x>T_y>0$. Combining both comparisons with numerator positivity yields $N_y/T_y^3>N_x/T_x^3$, proving $q'(a)<0$ for the whole open half interval. At the midpoint the two numerator and denominator comparisons become equalities, and $q'(\pi/2)=0$; this does not weaken strict decrease before the midpoint.

At $a=\pi/2$, the identity for $a$ excludes both $m<\pi/2$ and $m>\pi/2$, so $m=\pi/2$. The other identity becomes $d=\beta\cos d$. Its left-minus-right function is strictly increasing from a negative value at zero to a positive value at $\pi/2$, so it has exactly one positive solution. Therefore

$$
q(\pi/2)=\frac{2\sin d}{\cos^2d(1+\beta\sin d)}>0.
$$

Continuity and the strict derivative sign imply $q(a)>q(\pi/2)>0$ for all $0<a<\pi/2$. Every inequality above is analytical on its entire stated domain, including $\beta=1$; no lower divisor bound uniform in increasing $M$ is needed to determine the sign.

## Alternating midpoint bookkeeping and rest

Set $N=M/2$. Complementary indices $k,M-k$ have equal polarity because $M$ is even. Their sum is $(-1)^{k+1}q(kh)/4$, while the midpoint index $N$ contributes exactly half its paired expression. The full sum is therefore

$$
C_t=\frac14\left[\sum_{k=1}^{N-1}(-1)^{k+1}q(kh)
+\frac12(-1)^{N+1}q(\pi/2)\right].
$$

For odd $N$, consecutive positive-minus-negative pairs are strictly positive, leaving $q(\pi/2)/2$. For even $N$, pair through $N-2$ and combine the last term as $q((N-1)h)-q(\pi/2)/2>q(\pi/2)/2$. The binary $N=1$ has no paired terms and gives equality. Hence $C_t\ge q(\pi/2)/8>0$, strictly for $M>2$. This proves the positive-speed exclusion for every finite even inventory.

At $\beta=0$, the same census gives $x_j=jh$ and

$$
C_r(0)=\frac14\sum_{j=1}^{M-1}(-1)^j\csc(jh)
=-\frac12\left[\sum_{k=1}^{N-1}(-1)^{k+1}\csc(kh)
+\frac12(-1)^{N+1}\right].
$$

The positive sequence $\csc(kh)$ decreases strictly through its midpoint value one. The same alternating argument gives $C_r(0)\le-1/4<0$, with equality only for $M=2$. The binary value is also the direct analytical static-source control: its opposite-polarity neighbor at range $2R$ gives radial acceleration $-K/(4R^2)$. Thus the rest obstruction follows independently of the positive-speed kernel and requires no continuity inference at a degenerate endpoint.

## Evidence and disposition

This is a separately constructed analytical adjudication, rather than agreement between two numerical implementations. No new physics instrument, numerical target scan, or spectrum was built or run. The exact causal census, derivative, numerator polynomial, denominator subtraction and alternating sum above form the independent check. A controlled document checker verifies mathematical rendering, local link destinations, whitespace and the subject freeze; it is not evidence for the theorem's inequalities.

**Recommended disposition:** accept the arbitrary-finite-even-inventory low-speed circle exclusion at derived grade. Preserve the earlier seven-inventory interval evidence as its narrower historical certificate, and preserve the separate above-wake self-birth result and its singular boundary. The coordinator may now close the all-even low-speed sign question; stability of actual superwake balances and event continuation remain separate obligations. No shared queue, tracker, index, manuscript, work log, rank, score, qualification method or scenario was edited by this review.
