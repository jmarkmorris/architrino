# Compatible outward histories for the gradient and memory laws

The selected gradient and canonical-plus-uniform-memory laws each admit exact compatible preparations whose unrestricted future stays separated, uniformly subfield and outward. These examples complement their incoming first-unit preparations and entire-history exclusions. The prescribed past is a preparation, not an entire solution of the selected equation. Both constructions use the fixed selected coefficients and every original self/partner channel.

## Shared complete history family

Put $a=100$, $v_0=3/4$. Hold the right member at $x=a$ for $s\le-1$. On $[-1,0]$, with $q=s+1$, prescribe

$$
v_A(s)=v_0(3q^2-2q^3)+Aq^2(1-q),\qquad
x_A(s)=a+\int_{-1}^s v_A(r)\,dr.
$$

Reflect the other member through the origin. The history joins the held tail with zero velocity and acceleration and is $C^{2,1}$. At release,

$$
x_0=a+v_0/2+A/12,\qquad v(0)=v_0,\qquad v'(0)=-A.
$$

For $0<A<2/5$, its speed is nonnegative and at most $3/4+8/135<5/6$. Every release partner root lies in the held tail, at range $R_0=x_0+a>200$, with unit transmitter factor and zero source acceleration. No positive-delay self root exists. Select $A$ separately for each law below; the response coefficients are unchanged.

## Gradient response: a two-sided velocity barrier

For the amplitude-gradient law choose the unique $A\in(0,1/100)$ solving

$$
A=(200+3/8+A/12)^{-2}.
$$

Increasing left and decreasing right sides prove existence and uniqueness. The stationary-tail source gives release acceleration exactly $-R_0^{-2}=-A$, so the preparation is compatible.

For mirror outward motion let $v=x'$, $F(v)=v-v^2/2$ and $L=F(v)+\Psi$, where $\Psi=1/[R(1+v(s))]$. The exact gradient identity is

$$
L'=-Q,\qquad Q=\frac1{R^2[1+v(s)]}.
$$

Consider the interval before a first exit from $1/2<v<4/5$. Its complete history has nonnegative outward source velocities and $x(s)\ge a$. Hence

$$
R=x(t)+x(s)\ge x(t)+a,\qquad
0<\Psi\le\frac1{x+a},\qquad 0<Q\le\frac1{(x+a)^2}.
$$

Since $v\ge1/2$ there, $x\ge x_0+t/2$, so $\int_0^tQ\,dt\le2/(x_0+a)<1/100$. The upper barrier follows from

$$
F(v)=L-\Psi<L_0=\frac{15}{32}+\frac1{R_0}<\frac{15}{32}+\frac1{200}<F(4/5)=\frac{12}{25}.
$$

For the lower barrier,

$$
F(v)\ge L_0-\frac2{x_0+a}-\frac1{x_0+a}
>\frac{15}{32}-\frac3{200}>F(1/2)=\frac38.
$$

The map $F$ is strictly increasing on this interval, so neither endpoint can be reached. The complete source history retains a uniform speed margin, the separation grows and no finite regularity boundary remains. Thus the unique prepared solution persists for all future time with $1/2<v<4/5$. The already derived gradient monotone identity and $\Psi\to0$ imply a positive terminal speed $v_\infty\ge1/2$.

This argument accommodates either sign of sampled source acceleration. It does not discard the acceleration term or infer the sign of $v'$ from a stationary-source control after the source root leaves the held tail.

## Uniform memory: bounded-input velocity barrier

For the canonical-plus-memory law choose $A$ from

$$
\frac{13}{12}A=\frac38+(200+3/8+A/12)^{-2},\qquad 0<A<\frac25.
$$

The left side increases and the right side decreases; endpoint signs give one root. The mean velocity on the last unit interval is $3/8+A/12$, so the complete release acceleration is

$$
-R_0^{-2}-\frac34+\frac38+\frac A{12}=-A.
$$

Thus this preparation also has exact acceleration compatibility.

Use the [memory history variable](alternatives-screen-2026-10-05-memory-monotone-identity.md)

$$
M=v+\int_0^1(1-\theta)v(t-\theta)\,d\theta,\qquad M'=-Q,
\quad Q=\frac1{R^2[1+v(s)]}.
$$

The upper bound $v<5/6$ persists by a first-crossing argument: at a prospective new maximum equal to $5/6$, all past velocities in its memory average are at most $5/6$, so $v'=-Q-v+\overline v<0$. Consider a first prospective fall to $U=1/4$. Before it, $x\ge x_0+t/4$, all source velocities are nonnegative, and $Q\le(x+a)^{-2}$. Therefore $\int_0^tQ\,dt\le4/(x_0+a)<1/50$. Since $M_0\ge v_0=3/4$ and the memory part of $M$ is at most $\frac12(5/6)=5/12$,

$$
v(t)\ge M_0-\int_0^tQ\,dt-\frac5{12}
>\frac34-\frac1{50}-\frac5{12}>\frac14.
$$

The lower barrier cannot be reached. Hence the compatible solution is globally separated and uniformly subfield, with $1/4<v<5/6$. The exact memory transform and its bounded convolution inverse give a terminal speed $v_\infty\ge1/4>0$.

> Claim grade: derived, independent assessment requested. These are exact compatible prepared forward examples for the selected laws, not entire-history solutions or bound pairs. Falsifiers are a failed release equality, a missed complete root, a velocity-barrier failure under the displayed inequalities, or loss of finite-time regular continuation while all stated margins hold.
