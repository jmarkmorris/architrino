# A quadratic speed response for the stationary encounter

## Equation and scope

This is one proposed implementation of $v<c_f$, examined on 2026-09-26. It changes the Master Equation by multiplying its complete acceleration by a receiver-speed factor:

$$
\frac{d\mathbf X_i}{dT}=\mathbf V_i,\qquad
\frac{d\mathbf V_i}{dT}=
\left(1-\frac{\|\mathbf V_i\|^2}{c_f^2}\right)
\mathbf A_i^{\mathrm{ME}}[\mathbf X_{\le T}],
\qquad \|\mathbf V_i\|<c_f.
$$

Here $\mathbf A_i^{\mathrm{ME}}$ is the complete causal-history acceleration from the Master Equation evaluated on the evolving histories. Its source terms and causal condition are unchanged. The speed factor is a proposed modification, not a derived property of the Master Equation or an imported relativistic law. No lower fixed cap, contact rule or velocity jump is added. The formula applies where the original acceleration is defined; multiplying an undefined contact acceleration by zero does not define it.

The investigation uses the [same stationary preparation](stationary-binary-first-interval.md#scope-and-model): $c_f=1$, opposite polarities, $X_+(T)=a=1/2$, $X_-(T)=-a$, and zero velocity on $-20\le T\le0$. Keep the original coupling and charge tokens, with $G=\kappa|q_+q_-|>0$. The arguments below hold for every positive $G$, including their exact product, so they require no numerical replacement of the tokens. They concern the mirror-symmetric release and continuous classical motion before coincidence.

**Result, derived for this proposed equation:** speed remains strictly below one at every positive separation. Nevertheless, the pair approaches coincidence in finite time, with speed tending to one. There is no earlier braking or turn. Consequently this prescription does not complete the encounter under the strict-speed requirement. This is an analytical derivation and editorial self-check, not an independently reviewed theorem or a simulation result.

## Reduced delayed equation

Write $X_+=x(T)$, $X_-=-x(T)$ and $u(T)=-x'(T)$ for inward speed. Before coincidence, the partner emission time $S(T)$ obeys

$$
T-S=x(T)+x(S)=R(T),\qquad
x'=-u,\qquad
u'=(1-u^2)F(T),\qquad
F(T)=\frac{G}{R(T)^2[1-u(S(T))]}.
$$

On the stationary past, $x=a$ and $u=0$. The transmitter on the negative side moves positively, toward the receiver, so its transmitter factor is $1-u(S)$, not $1+u(S)$. A speed below one throughout the intervening history makes every same-label displacement smaller than its elapsed time, excluding positive-delay self arrivals. Thus zero self contribution here follows from the causal geometry; it is not separately imposed.

The function $H(S)=S+x(S)$ has derivative $1-u(S)>0$. The partner equation $H(S)=T-x(T)$ therefore has a unique root. At release $S=-1$, $R=1$, and $u'(0)=G$, matching the original release acceleration. As long as $x>0$ and $u<1$, $F>0$, hence $u$ increases and the pair moves inward. Also $0<x\le a$, $R\le2a=1$, and $S\ge T-1\ge-1$: the retained stationary history is sufficient throughout this approach.

## Why speed cannot reach one at positive separation

The reduced equation gives the exact identity

$$
\operatorname{artanh}u(T)=\int_0^T F(t)\,dt,\qquad
u(T)=\tanh\left(\int_0^T F(t)\,dt\right).
$$

This guarantees $u<1$ when the integral is finite. Its finiteness must be checked, not assumed. Suppose a finite endpoint $T_*$ has $x(T)\ge\varepsilon>0$. Then $R\ge2\varepsilon$, so $S\le T_*-2\varepsilon$. The source velocities lie in an earlier compact interval where their maximum is below one. Consequently both denominators in $F$ have positive lower bounds, and $F$ is bounded up to $T_*$. The identity then forbids $u\to1$ there. The same separation and source-factor bounds allow regular local continuation of the delayed equation. The history join at zero has continuous position and velocity and causes no vanishing source factor.

This also closes the reasoning used to exclude self arrivals and establish the root: start on the regular release interval and extend these strict bounds until separation tends to zero. A finite endpoint at positive separation cannot be caused by speed equality or loss of the partner root.

## Why coincidence is approached in finite time

Since $R\le2a$ and $0<1-u(S)\le1$, define $g_0=G/(4a^2)$ and obtain

$$
F(T)\ge g_0,\qquad
u(T)\ge\tanh(g_0T),\qquad
x(T)\le a-\frac{\log\cosh(g_0T)}{g_0}.
$$

The right side reaches zero at a finite time. Together with continuation at positive separation, this proves a finite limiting coincidence time $T_c$, with

$$
a<T_c\le\frac{\operatorname{arcosh}(e^{g_0a})}{g_0},
\qquad \lim_{T\uparrow T_c}x(T)=0.
$$

The strict lower bound follows from $a=\int_0^{T_c}u(T)\,dT$ and $u<1$. This is a bound for the modified encounter, not the original equation's wake-speed time or position. The pair never brakes because $u'>0$ throughout the separated approach.

## Why speed tends to one at that endpoint

Monotonicity and the upper bound give a limit $L=\lim_{T\uparrow T_c}u(T)\le1$. Assume $L<1$. All earlier speeds are then at most $L$, and

$$
x(S)-x(T)=\int_S^T u(t)\,dt\le L(T-S)=LR,
\qquad R\le\frac{2x(T)}{1-L}.
$$

It follows that

$$
F(T)\ge\frac{G(1-L)^2}{4x(T)^2}
\ge\frac{G(1-L)^2}{4(T_c-T)^2},
$$

where $x(T)=\int_T^{T_c}u(t)\,dt\le T_c-T$. The last bound makes $\int_0^T F$ diverge as $T\uparrow T_c$. The exact hyperbolic-tangent identity then gives $u\to1$, contradicting $L<1$. Therefore $L=1$.

The actual modified acceleration has a finite incoming integral: $\int_0^{T_c}u'(T)\,dT=1$. That does not supply an allowed endpoint. A continuous velocity extension would have speed one at coincidence, which the requirement forbids. Assigning a smaller endpoint velocity would add a jump absent from this prescription. Even if equality were admitted, the undefined contact response and later motion would still need examination. No passage, bounce or later return is established here.

## An exact early-interval cross-check

While the partner emission remains in the stationary past, $S=T-x-a\le0$ and $F=G/(x+a)^2$. Eliminating time and integrating from $(x,u)=(a,0)$ gives

$$
1-u^2=\exp\left[-2G\left(\frac{1}{x+a}-\frac{1}{2a}\right)\right].
$$

Differentiating this expression and using $x'=-u$ recovers $u'=(1-u^2)G/(x+a)^2$, while its initial value gives $u=0$. This is an algebraic consistency check of the first-interval reduction; it is not independent validation of the complete delayed solution. Do not extend it after the emission time becomes positive.

## Interpretation and checkable limits

The proposal postpones speed equality from positive separation to the coincidence limit. It therefore avoids the original separated speed-crossing event without completing a strictly sub-field encounter. A counterexample would have to violate a displayed implication: exhibit a regular positive-separation speed-equality event despite the bounded earlier-source argument, a separated solution beyond the finite upper time bound, or a coincidence limit with $L<1$ satisfying the same delayed equation. Different response factors and different histories are outside this conclusion.

The operator’s target is passage: follow reception of the partner’s bunched wake, coincidence, and then the outgoing motion. Absence of a turn before coincidence is not a failure against that target. This candidate fails to complete the strict-speed passage because its continuous endpoint velocity would equal $c_f$ and its contact response is undefined. The next useful analysis is a passage-compatible strict-speed equation with a defined accumulated response through coincidence, followed by an outgoing calculation using the retained histories. Passage is the proposed outcome to test, not an event rule already supplied by this equation.
