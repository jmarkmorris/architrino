# Exclusion of bounded smooth height on a unit-speed circular plane

## Statement

The independently accepted [unit-planar-speed theorem](overnight2-b-independent-unit-planar-speed.md) excludes every nonconstant periodic height when the planar circle runs at unit speed. The remaining bounded aperiodic possibility is strictly monotone height approaching a finite limit. For a circular planar path, the limiting partner geometry stays ordinary, so it cannot compensate the recent self contributions forced by that approach. This closes the bounded-height case when the second derivative is uniformly bounded.

This is a derived subject awaiting independent analytical review. Consider the complete six-member histories
$$
X_j(t)=R\bigl(\cos(\tau+j\pi/3),\sin(\tau+j\pi/3),(-1)^jz(\tau)\bigr),
\qquad \tau=t/R,\quad R>0. \tag{1}
$$
Thus the normalized radius and rotation parameter are exactly one. Let $z$ be complete $C^2$, bounded on its entire past and future, with a uniformly bounded second normalized-time derivative on a future interval $[\tau_0,\infty)$. Exactness is required on that whole future interval. Retain $K=c_f=1$, all ordinary positive-delay self and partner roots, positive self polarity, unit polarity magnitudes, the absolute source divisor and a finite canonical sum. No event response or ceiling is introduced.

The proposed conclusion is that **no history (1) satisfies these ordinary exactness assumptions on an unbounded future**, for any $R>0$. Height need not be periodic, and no upper amplitude or frequency is imposed. The uniform second-derivative bound is an explicit assumption; merely being $C^2$ at every finite time would not supply it.

Positive planar radius separates every simultaneous pair. Bounded complete height and unit radius bound all complete positions and therefore supply the complete-past delay cutoff. Every normalized delay is less than a fixed number $d_+$ chosen larger than $2\sqrt{1+\|z\|_\infty^2}$. Physical delay is $Rd$.

## Monotone height and its limiting velocity

Suppose first that $z$ is nonconstant on the exact future. The accepted unit-planar-speed theorem makes it strictly monotone there. Boundedness gives a finite limit
$$
z(\tau)\longrightarrow L.
$$
Since $z$ is differentiable and monotone, $\dot z$ has one sign. Its absolute integral on the future is finite. Write $|\ddot z|\le B_2<\infty$ there. The derivative is uniformly Lipschitz and must satisfy
$$
\dot z(\tau)\longrightarrow0. \tag{2}
$$
An elementary proof avoids an unproved decay assumption. If $|\dot z(\tau_n)|\ge\epsilon>0$ along arbitrarily late times and $B_2>0$, Lipschitz continuity makes $|\dot z|\ge\epsilon/2$ on a forward interval of length $\epsilon/(2B_2)$ after each such time. A subsequence of disjoint intervals would contribute at least $\epsilon^2/(4B_2)$ each to its finite absolute integral, a contradiction. If $B_2=0$, bounded affine height is constant, already contrary to this case.

Both limits are uniform on every delayed window of fixed length at sufficiently late receptions: all arguments in $[\tau-d_+,\tau]$ eventually lie beyond any prescribed tail threshold. Therefore the squared causal gaps $G_j=|Q_j|^2-d^2$ and their delay derivatives converge uniformly on compact delay intervals away from zero to those of
$$
z(\tau)\equiv L.
$$
This is convergence of geometry and first source derivatives; no convergence of $\ddot z$ is assumed.

## Complete limiting partner geometry

Rotate coordinates by the receiving angle at member zero. For source offset $j$, put $s=(-1)^j$ and $\alpha=j\pi/3-d$. At constant limiting height the separation and source velocity are
$$
Q_j=(1-\cos\alpha,-\sin\alpha,(1-s)L),\qquad
V_j=(-\sin\alpha,\cos\alpha,0).
$$
Source speed is exactly one. The unsquared causal gap is $g_j(d)=|Q_j(d)|-d$.

For any $d_2>d_1$, the source's planar chord has length
$$
2|\sin((d_2-d_1)/2)|<d_2-d_1.
$$
Triangle inequality then gives $g_j(d_2)<g_j(d_1)$. Each partner has positive gap at zero and negative gap beyond the common remote bound, so it has exactly one positive root. The self gap is
$$
g_0(d)=2|\sin(d/2)|-d<0\qquad(d>0),
$$
so there are no positive self roots in the limit.

Every limiting partner root is ordinary. Its signed divisor is
$$
D=1-n\cdot V_j,\qquad n=Q_j/d.
$$
Both $n$ and $V_j$ are unit vectors, so $D\ge0$. If $D=0$, equality in Cauchy–Schwarz forces $n=V_j$. The planar receiving position would then be the planar source position plus $dV_j$. But the source radius and its unit tangent are orthogonal, making that receiving planar radius squared $1+d^2>1$, whereas both lie on the same unit circle. This is impossible for $d>0$. Hence each of the five partner roots has $D>0$.

Fix any sufficiently small $\eta>0$, smaller than all five limiting partner delays and smaller than one. On $[\eta,d_+]$, the limiting self gap is bounded strictly below zero. Around each limiting partner root choose a protected interval where the squared-gap delay derivative $G_d=-2dD$ is bounded strictly away from zero, and use the positive minimum absolute squared gap on its compact complement. Uniform convergence of the actual squared gaps and their derivatives then proves that, at every sufficiently late reception:
- there is no self root with $d\ge\eta$;
- each partner has exactly one root, lying in its protected interval;
- all five partner delays and absolute divisors have fixed positive lower bounds.

The complementary exclusion is part of this argument; continuing five selected roots alone would not exclude extra ones. Recent partner roots are uniformly absent as well: simultaneous planar separation is at least one, and late source speed is bounded by (2), so a sufficiently small fixed recent interval has positive partner gap by the triangle inequality. Shrink $\eta$ accordingly. Thus the complete late partner contribution is uniformly bounded.

## Recent self contribution cannot be compensated

Nonconstant height supplies a strict above-wake reception because full speed squared is $1+\dot z^2$. The accepted recent-gap theorem therefore makes the self gap positive at sufficiently small delays at every reception in the connected exact future. Bounded complete positions make it negative at $d_+$. Continuity supplies at least one positive self root at every such reception.

The limiting self gap has no roots away from zero, as proved above. Hence along receptions tending to infinity one can select positive self roots $d_n\to0$. This conclusion can also be read from the accepted bounded-projection theorem, but the circular limiting geometry gives it directly here.

The normalized acceleration of a prescribed member has norm at most
$$
M=\sqrt{1+B_2^2}.
$$
At a self root, averaging the source velocity over the delayed segment gives
$$
0<|D_n|\le Md_n/2.
$$
The strict lower inequality is the ordinary-domain assumption. In the receiving planar frame the self tangential separation is exactly $\sin d$, so its tangential direction component is $\sin d/d$. For all sufficiently small positive delays this is at least $1/2$. Therefore its canonical tangential contribution is positive and satisfies
$$
a_{t,d_n}=\frac{\sin d_n/d_n}{d_n^2|D_n|}
\ge\frac1{M d_n^3}\longrightarrow+\infty. \tag{3}
$$
All other self roots also lie below the fixed small $\eta$ at late receptions and have positive tangential projection. Their signed divisors cannot reverse this sign because the canonical denominator is absolute. The complete partner contribution remains uniformly bounded. Thus the full canonical tangential sum tends to positive infinity along the selected receptions, or at least exceeds every fixed bound there.

But the prescribed planar radius and angular rate are constant, so its tangential kinematic acceleration is identically zero and exactness requires $A_t=0$. This contradicts (3). Here total tangential divergence is established only after independently bounding the entire partner sum and proving the common sign of every self row. It is not inferred from one large contribution alone.

## Constant future height

It remains possible in the preceding dichotomy that $z$ is constant on the exact future, even if the older past differed. After a finite time longer than the uniform complete-past delay cutoff, all contributing source times lie within that constant future. The complete geometry is then exactly the limiting geometry just analyzed: five ordinary partner roots and no positive self roots.

If the constant is $L\ne0$, even offsets have zero axial separation, whereas each odd offset contributes
$$
-\frac{2L}{d^3D}
$$
to member zero's axial acceleration, with $D>0$. The complete axial sum has sign opposite to $L$ and is nonzero, contradicting the zero prescribed axial acceleration. Only $L=0$ remains for separate examination.

## Flat unit-speed circle: explicit positive tangential sum

For $L=0$, there are exactly five ordinary partner roots, all with $D>0$, and no positive self roots. Let $d_j$ denote the unique source-$j$ root and $\alpha_j=j\pi/3-d_j$. At each root
$$
d_j=2|\sin(\alpha_j/2)|,\qquad
D_j=1+\frac{\sin\alpha_j}{d_j},\qquad
a_{t,j}=\frac{-(-1)^j\sin\alpha_j}{d_j^3D_j}. \tag{4}
$$
The following elementary bounds prove $A_t>1/10$ without a numerical root solve.

For $j=1$, the unique root lies before $d=\pi/3$, and $\alpha_1\in(0,\pi/3)$. The inequality $d_1=2\sin(\alpha_1/2)\le\alpha_1=\pi/3-d_1$ gives $d_1\le\pi/6$, so $\alpha_1\ge\pi/6$ and $\sin\alpha_1\ge1/2$. Since $D_1\le2$,
$$
a_{t,1}\ge\frac{54}{\pi^3}.
$$

For $j=2$, similarly $\alpha_2\in(0,2\pi/3)$. Concavity of sine gives $2\sin(\alpha_2/2)\ge2\alpha_2/\pi$, hence
$$
d_2\ge\frac{4\pi}{3(\pi+2)}.
$$
At a root with positive $\sin\alpha$, the ratio $x=\sin\alpha/d=\cos(\alpha/2)$ lies in $[0,1]$, and its torque magnitude is $x/[d^2(1+x)]\le1/(2d^2)$. Thus the negative source-two contribution has magnitude at most
$$
|a_{t,2}|\le\frac{9(\pi+2)^2}{32\pi^2}.
$$

For $j=3$, the root lies before $d=\pi$, so $\alpha_3\in(0,\pi)$ and its odd-polarity tangential contribution is positive. It can be discarded in a lower bound.

For $j=4$, the gap at $d=\pi/3$ is $2-\pi/3>0$, so the unique root has $d_4>\pi/3$. Since $d_4\le2$ and $\pi>3$, its angle lies in $(0,\pi)$. Its negative contribution therefore has magnitude
$$
|a_{t,4}|\le\frac{9}{2\pi^2}.
$$

For $j=5$, $d_5\le2<2\pi/3$, so $\alpha_5>\pi$ and the contribution is negative. At $d=\sqrt3$, the angle $5\pi/3-\sqrt3$ lies strictly between $2\pi/3$ and $4\pi/3$, so its planar chord is strictly longer than $\sqrt3$. Hence the unique root satisfies $d_5>\sqrt3$. At that root
$$
y=-\frac{\sin\alpha_5}{d_5}=\sqrt{1-d_5^2/4}<1/2,
$$
and
$$
|a_{t,5}|=\frac{y}{d_5^2(1-y)}<\frac13.
$$

Combining the five rows and using only $3<\pi<22/7$ yields
$$
\begin{aligned}
A_t
&\ge\frac{54}{\pi^3}
-\frac{9(\pi+2)^2}{32\pi^2}
-\frac9{2\pi^2}-\frac13\\
&>\frac{9261}{5324}-\frac{25}{32}-\frac12-\frac13\\
&=\frac{15959}{127776}>\frac1{10}.
\end{aligned}
$$
The final comparison is $159590>127776$. All constants and row signs in this bound refer to the canonical five-root sum; the positive source-three row was not required. Exact tangential balance again fails for every $R>0$.

## Interpretation and review boundary

Together the nonconstant and constant cases exclude the whole stated bounded-height, bounded-second-derivative class at unit planar circular speed. The proof does not apply unchanged when the planar rate differs from one, radius varies, the height's second derivative is unbounded, or the complete old past lacks a bound. It does not identify an actual solution, a stability spectrum or a finite-time continuation event.

Independent review must reconstruct the derivative-decay argument, complete limiting root census and complement, the uniform partner bound, the common positive self projection, and all five flat-circle torque bounds. A missing limiting partner root, a zero limiting source divisor, an unbounded late partner sum despite the proved compact convergence, or an error in the explicit flat-circle lower bound would defeat the respective step. An exact member satisfying every displayed assumption would directly refute the conclusion.

This is an analytical proposal; no numerical instrument, solver target or new runtime receipt is required. The parent owns integration into [the current research account](overnight2-b-followup-and-research-2026-10-07.md), and all earlier subjects, references and retained evidence remain frozen.
