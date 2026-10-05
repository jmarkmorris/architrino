# Low-speed exclusion for every finite even alternating inventory

Date: 2026-10-03. **Scenario: unchanged Master Equation, all ordinary positive-delay roots including self channels retained.** Numerical normalization is $c_f=1$; $K>0$ and $R>0$ remain symbolic. **Grade: derived analytical theorem, frozen for separately constructed adjudication.** This extends the inventory scope of the [seven-inventory continuous exclusion](ring-low-speed-census-2026-10-03.md) and its [independent adjudication](ring-low-speed-independent-adjudication-2026-10-03.md). Their instruments, sources and receipts remain unchanged. No new numerical scan, spectrum or EOM evolution is performed.

## Result

For every finite even $M\ge2$, a regular planar alternating circular ring fails the unchanged Master Equation at every positive speed $0<\beta=v/c_f\le1$, whatever its positive radius. Its complete tangential interaction coefficient is strictly positive, while the prescribed circular acceleration has zero tangential component. A stronger uniform bound is

$$
C_t(\beta;M)\ge\frac{\sin d}{4\cos^2d(1+\beta\sin d)}>0,
\qquad d=\beta\cos d,\quad 0<d<\pi/2.
$$

Equality in the first inequality holds only for $M=2$; it is strict for every larger finite even inventory. The lower bound is the two-member tangential coefficient at the same speed. The positivity is an exact analytical inequality, not a floating-point sign claim.

At rest, the already derived all-even-inventory static radial obstruction applies; it is consumed rather than rederived here. Thus no regular alternating circular balance exists at any $0\le\beta\le1$ for any finite even inventory. At equality the complete ordinary chart still has $M(M-1)$ directed partner hits and no positive-delay self hits. The coincident zero-delay endpoint is excluded by the ordinary causal definition; no event rule is added. The existing separate above-wake self birth remains as previously derived.

The result concerns the symmetric planar circular history. It does not cover nonalternating orders, uneven radii or phases, breathing, noncircular members, axial translation or infinitely many sources. A reflection of the plane reverses the rotation convention and preserves the exclusion. **Falsifier:** a failure of the complete below-wake chart, the implicit kernel derivative, either exact numerator/denominator comparison, the alternating midpoint bookkeeping, or an exact regular alternating circle with vanishing tangential residual in the stated domain overturns the theorem. Independent review is required before calling it independently checked.

## Complete partner chart and the paired coefficient

Consume the [all-even low-speed census and static result](ring-low-speed-census-2026-10-03.md#3-near-rest-expansion-and-static-obstruction). Write $h=\pi/M$ and $N=M/2$. The complete ordinary roots at positive speed below or at wake satisfy

$$
x_j-\beta\sin x_j=jh,\qquad j=1,\ldots,M-1,\quad 0<x_j<\pi,
\qquad D_j=1-\beta\cos x_j>0.
$$

There is one such root per partner source; strict monotonicity holds on the open angle interval even at $\beta=1$. The empty positive-delay self census is part of this complete root chart, not a disabled source channel. The exact tangential acceleration is $K C_t/R^2$, with

$$
C_t=\frac14\sum_{j=1}^{M-1}(-1)^j
\frac{\cos x_j}{\sin^2x_j(1-\beta\cos x_j)}.
$$

For $0<a\le\pi/2$, define unique $x,y\in(0,\pi)$ by

$$
x-\beta\sin x=a,\qquad y+\beta\sin y=a.
$$

The functions on the left are strictly increasing in their open domains for $0<\beta\le1$. In particular $0<y<a<x<\pi$. The root with complementary level $\pi-a$ is $\pi-y$. Since $M$ is even, complementary indices have the same polarity product. Their combined tangential coefficient is $(-1)^{k+1}q_\beta(kh)/4$, where

$$
q_\beta(a)=
\frac{\cos y}{\sin^2y(1+\beta\cos y)}
-\frac{\cos x}{\sin^2x(1-\beta\cos x)}.
$$

The midpoint has only one source and is counted with half of that paired expression. Therefore the complete finite coefficient is exactly

$$
C_t=\frac14\left[
\sum_{k=1}^{N-1}(-1)^{k+1}q_\beta(kh)
+\frac12(-1)^{N+1}q_\beta(\pi/2)\right].
$$

The conjectured positivity and monotonicity of this kernel are proved next; neither is assumed from a scan.

## Strictly decreasing paired kernel

Implicit differentiation in $a$ gives

$$
q_\beta'(a)=-H_y+H_x,
$$

$$
H_y=\frac{1+\cos^2y+2\beta\cos^3y}
{[\sin y(1+\beta\cos y)]^3},
\qquad
H_x=\frac{1+\cos^2x-2\beta\cos^3x}
{[\sin x(1-\beta\cos x)]^3}.
$$

Every denominator is positive. The numerator of $H_y$ is positive because $y<a\le\pi/2$ and $\cos y>0$. The numerator of $H_x$ is also positive: if $c=\cos x<0$ it is immediate; if $0\le c<1$, then

$$
1+c^2-2\beta c^3\ge1+c^2-2c^3
=(1-c)(2c^2+c+1)>0.
$$

Put $m=(x+y)/2$ and $d=(x-y)/2$. Adding and subtracting the two causal equations yields

$$
d=\beta\sin m\cos d,\qquad
a=m-\beta\cos m\sin d.
$$

Here $0<d<\pi/2$ and $0<m<\pi$. If $m>\pi/2$, the second identity gives $a>m>\pi/2$, a contradiction. If $m=\pi/2$, it gives $a=\pi/2$. Thus $0<m<\pi/2$ throughout the open half interval $0<a<\pi/2$.

First compare the numerators. Let $C=\cos m\cos d$ and $V=\sin m\sin d$. Then $\cos y=C+V$, $\cos x=C-V$, and both $C,V$ are strictly positive. Exact polynomial expansion gives

$$
N_y-N_x
=4C\,[V+\beta(C^2+3V^2)]>0,
$$

where $N_y,N_x$ are the displayed numerators. No estimate on how close a root is to wake speed enters this sign.

Next compare the positive denominator bases, $T_y=\sin y(1+\beta\cos y)$ and $T_x=\sin x(1-\beta\cos x)$. The addition formulas and $\beta\sin m=d/\cos d$ give

$$
T_x-T_y
=2\cos m[\sin d-\beta\sin m\cos(2d)]
=\frac{2\cos m}{\cos d}
[\sin d\cos d-d\cos(2d)]>0.
$$

For the last sign define $g(d)=\sin d\cos d-d\cos(2d)$. It has $g(0)=0$ and

$$
g'(d)=2d\sin(2d)>0,\qquad 0<d<\pi/2.
$$

Thus $N_y>N_x>0$ and $0<T_y<T_x$. It follows that $H_y=N_y/T_y^3>N_x/T_x^3=H_x$, proving

$$
q_\beta'(a)<0\quad\text{for }0<a<\pi/2,\quad 0<\beta\le1.
$$

This is a uniform analytical domain statement. It does not depend on a finite inventory or on discretely sampled $a,\beta$.

## Positive midpoint and complete alternating sum

At $a=\pi/2$, the identity for $a$ forces $m=\pi/2$ and the identity for $d$ becomes $d=\beta\cos d$. This has exactly one solution in $(0,\pi/2)$: $d-\beta\cos d$ is strictly increasing, negative at zero and positive at $\pi/2$. Hence $x=\pi/2+d$ and $y=\pi/2-d$, so

$$
q_\beta(\pi/2)=
\frac{2\sin d}{\cos^2d(1+\beta\sin d)}>0.
$$

Strict decrease on the open half interval and continuity at the midpoint now show $q_\beta(a)>q_\beta(\pi/2)>0$ for every $0<a<\pi/2$.

If $N$ is odd, pair successive positive and negative terms in the finite sum through index $N-1$, leaving the positive midpoint half term. Every pair is strictly positive. If $N$ is even, pair successive terms through index $N-2$, then combine the remaining last positive term with the negative midpoint half term:

$$
q_\beta((N-1)h)-\frac12q_\beta(\pi/2)
>\frac12q_\beta(\pi/2)>0.
$$

The binary has no ordinary paired terms and attains $C_t=q_\beta(\pi/2)/8$. Every larger inventory has a strictly positive excess. This proves the claimed uniform lower bound and therefore exact circle exclusion. No primitive mass, conservation law, root modification or outside response equation is used.

## Evidence boundary and recommended disposition

The proof is analytical: no new instrument was built or run on physics targets, and no existing evaluator was changed. Its independent references are the exact baseline circular reduction, the already admitted all-even root chart, elementary implicit differentiation and exact trigonometric/polynomial identities. The old numerical seven-inventory scope remains sound historical evidence, with the present proof supplying the proposed extension to every finite even inventory. The prior near-rest expansion and wake self-birth were not rerun.

Recommended next action: independently reconstruct the paired reduction, kernel derivative and simultaneous numerator/denominator comparisons; if accepted, the coordinator can extend the low-speed exclusion's owner and indexes to all finite even inventories. Keep differential, axial, deformed-history and event-continuation questions separate from this symmetric-circle exclusion. No shared manuscript, queue, registry, ledger, work log, ranks, scores or scenario selections were edited by this work.
