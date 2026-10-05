# Independent subfield contact theorem for a sublinear radial response

## Fixed theorem and explicit sufficient preparation size

**Claim grade: derived candidate, requiring independent assessment.** Fix $0<p<1$, $K=R_*=c_f=1$, and the opposite-polarity collinear mirror pair $x(T),-x(T)$. Use the complete held-and-ramped preparation below and the unchanged ordinary self/partner root convention. The explicit sufficient condition

$$
0<a\le\frac12\left(\frac{1-p}{64}\right)^{1/(1-p)}
$$

guarantees a unique ordinary separated future up to a finite contact time $T_*$. Throughout this future and its complete supplied past, the individual speed is at most $1/4$. At contact,

$$
x(T)\downarrow0,\qquad v(T)=x'(T)\downarrow-w_*,
\qquad 0<w_*\le\frac14.
$$

Thus the first endpoint is coincidence at finite time with a strict subfield margin. It is neither a unit-speed event nor a transmitter fold. Incoming acceleration diverges but has finite time integral. This gives an incoming contact trace, not a collision rule or an ordinary continuation through coincidence.

A concrete frozen selection is $p=1/2$, $a=2^{-16}$ and $d=2^{-20}$, with $A$ determined by the displayed compatibility equation. For this exponent the sufficient bound is $a\le2^{-15}$. The proof below establishes the stronger statement for each fixed $0<p<1$; it makes no uniform claim as $p\uparrow1$.

The result was derived independently before reading any new coordinator sublinear-contact analysis. It retains the selected fixed law and the complete compatible history. No physical conservation law, numerical target, root deletion or boundary regularization is used. The analytical role is a lens rather than an acceptance authority. The sufficient radius bound is explicit and conservative; no necessity or optimality is asserted.

## Complete compatible preparation

Set $d=a/16$. Supply $x(S)=a$ for every $S\le-d$. For $-d\le S\le0$, put $q=(S+d)/d$ and prescribe

$$
v(S)=Ad\,q^2(1-q),\qquad
x(S)=a+\int_{-d}^{S}v(u)\,du,
$$

where $A$ solves the exact compatibility equation

$$
A=\left(2a+\frac{Ad^2}{12}\right)^{-p}.
$$

The reflected label has the exact negative history. The left side of the compatibility equation increases strictly with $A$ and the right side decreases strictly. Their difference is negative at zero and positive at $(2a)^{-p}$. Its derivative is

$$
1+\frac{pd^2}{12}\left(2a+\frac{Ad^2}{12}\right)^{-p-1}>0.
$$

Thus there is exactly one positive solution and $A<(2a)^{-p}$. Direct integration and differentiation of $q^2(1-q)$ give

$$
x_0:=x(0)=a+\frac{Ad^2}{12},\qquad
v(0)=0,\qquad v'(0-)=-A.
$$

At the old seam the velocity and acceleration vanish. Position is locally $C^{2,1}$ on the complete past. Its radial coordinate is nondecreasing, between $a$ and $x_0$, and its speed obeys

$$
0\le v(S)\le\frac{4Ad}{27}
\le\frac{2^{-p}a^{1-p}}{108}<\frac1{108}.
$$

The last inequality follows from the stated radius bound, which in particular implies $a<1/2$. Also

$$
a<x_0\le a\left(1+\frac{2^{-p}a^{1-p}}{3072}\right)<2a.
$$

The release partner source is $S_0=-(x_0+a)<-2a<-d$, in the held tail. Its transmitter velocity is zero and its range is $x_0+a=2a+Ad^2/12$. The exact received acceleration is therefore $-(x_0+a)^{-p}=-A$, equal to the left acceleration. Release compatibility is exact. The prescribed past need not solve the released future equation.

## Complete roots and the ordinary evolution

The selected radial law preserves the [Master Equation](../../../../../content/markdown/aaa/dynamics/master-equation.md#per-hit-acceleration) root convention and transmitter weight while replacing only the radial magnitude by $R^{-p}$. On a separated chart with $x(T)>0$ and complete strict speed bound, the partner source satisfies

$$
R(T)=T-S(T)=x(T)+x(S(T)),\qquad
D(T)=1+v(S(T))>0.
$$

For fixed reception $T$, the residual $g_T(u)=u-x(T)-x(T-u)$ has $g_T(0)=-2x(T)<0$, derivative $1+v(T-u)>0$, and tends to positive infinity in the old held tail. It has exactly one positive simple root over the entire supplied and generated history. A positive-delay self root would require a displacement equal to the elapsed time, contrary to the strict speed chord inequality. Thus no root is omitted by this reduction.

The actual right-member equations are

$$
x'=v,\qquad v'=-Q(T),\qquad
Q(T)=\frac1{R(T)^pD(T)}>0,
$$

and the source clock obeys

$$
S'(T)=\frac{1-v(T)}{1+v(S(T))}>0.
$$

On a compact interval with positive radius and strict speed margin, the positive delay and transmitter factor have positive floors. The implicit root estimate bounds source-time displacement by the positional discrepancy divided by the transmitter floor; bounded source acceleration controls velocity evaluation at the displaced time. Ordinary position-velocity steps shorter than the delay floor therefore give local existence, uniqueness and continuation. Reflection symmetry of the law and complete preparation preserves the mirror pair. These statements concern the regular ordinary domain only.

Since $v(0)=0$ and $v'=-Q<0$, every positive regular time has $v<0$. Write $w=-v>0$ for the incoming speed; then $x'=-w$ and $w'=Q>0$.

## Closing a uniform subfield bound before contact

Start with the provisional complete speed bound $b=1/2$. The supplied history already satisfies it. The complete chord estimate gives

$$
\frac{2x}{1+b}\le R\le\frac{2x}{1-b},\qquad
1-b\le D\le1+b.
$$

For example, $|x(S)-x(T)|\le bR$ combined with $R=x(T)+x(S)$ gives both range inequalities. They apply even while the source lies in the outward ramp or held tail. At $b=1/2$ they imply

$$
\frac23\,4^{-p}x^{-p}\le Q(T)
\le2\left(\frac34\right)^p x^{-p}\le2x^{-p}.
$$

Because $x$ is strictly decreasing after release, it can be used as a coordinate for every positive time. The exact chain rule gives $d(w^2)/dx=-2Q$. Integrating from the release radius, or first from a positive time and then taking its limit to zero, gives

$$
\frac{4\,4^{-p}}{3(1-p)}\left(x_0^{1-p}-x^{1-p}\right)
\le w^2
\le\frac4{1-p}\left(x_0^{1-p}-x^{1-p}\right).
$$

No central-energy conservation is used; these are integrals of the actual delayed acceleration evaluated along its trajectory. The upper bound and $x_0<2a$ imply

$$
w^2\le\frac{4x_0^{1-p}}{1-p}
<\frac{4(2a)^{1-p}}{1-p}\le\frac1{16}.
$$

Thus a first crossing of the provisional speed $1/2$ is impossible. The actual complete history retains speed at most $1/4$, including its supplied segment. This stronger bound persists as long as the radius is positive. In particular no transmitter denominator tends to zero: $D\ge3/4$ throughout the future root chart.

At a finite proposed endpoint with positive limiting radius, the root range has a positive lower bound, sampled sources lie in a compact strictly earlier interval, and the complete speed and source-regularity margins remain strict. Ordinary continuation then applies. The only remaining finite endpoint is contact.

## Finite contact and quantitative endpoint bounds

The positive acceleration lower bound prevents indefinite persistence at positive radius. Since $x(T)\le x_0$,

$$
w'(T)=Q(T)\ge\frac23\,4^{-p}x_0^{-p}=:q_0>0.
$$

It follows that $w(T)\ge q_0T$ and $x(T)\le x_0-q_0T^2/2$ as long as the regular chart survives. Therefore its maximal time is finite and

$$
T_*\le\sqrt3\,2^p x_0^{(p+1)/2}.
$$

The preceding continuation argument excludes a positive-radius endpoint, so $x(T)\to0$. Monotone bounded $w$ has a limit $w_*$. The integrated bounds give

$$
\frac{4\,4^{-p}}{3(1-p)}x_0^{1-p}
\le w_*^2\le\frac4{1-p}x_0^{1-p}\le\frac1{16}.
$$

In particular $w_*>0$. Since $x_0=\int_0^{T_*}w(T)\,dT\le w_*T_*$, one also has

$$
\frac{\sqrt{1-p}}2x_0^{(p+1)/2}
\le T_*\le\sqrt3\,2^p x_0^{(p+1)/2}.
$$

These are explicit preparation-scoped time and speed bounds in normalized physical units. They certify a contact endpoint without locating its exact speed or time numerically.

## Incoming source and contact asymptotics

Put $\delta=T_*-T$ and retain the finite incoming speed $w_*\in(0,1/4]$. Since $x(T)=\int_T^{T_*}w(t)\,dt$,

$$
x(T)\sim w_*\delta.
$$

The complete range bound gives $R\le4x\to0$, so $S=T-R\to T_*$. Thus all sufficiently late source times lie in the generated incoming segment. On their full receiving intervals, $w\to w_*$ uniformly, and

$$
x(S)-x(T)=\int_S^T w(t)\,dt=w_*R+o(R).
$$

Substitution in $R=x(T)+x(S)$ gives

$$
R\sim\frac{2x}{1-w_*}
\sim\frac{2w_*}{1-w_*}\delta,
\qquad
T_*-S\sim\frac{1+w_*}{1-w_*}\delta,
\qquad D\to1-w_*>0.
$$

The transmitter factor remains regular; the diverging acceleration comes from vanishing positive range. Its exact leading form is

$$
Q(T)\sim B_*x(T)^{-p}\sim C_*\delta^{-p},
$$

$$
B_*=2^{-p}(1-w_*)^{p-1},\qquad
C_*=2^{-p}(1-w_*)^{p-1}w_*^{-p}>0.
$$

These factors retain the actual incoming source velocity. Replacing the delayed range by $2x$ at fixed preparation would give a wrong contact coefficient unless the extra small-speed limit were also taken.

Since $0<p<1$, integration of the eventual two-sided bounds on $Q/(C_*\delta^{-p})$ gives

$$
w_*-w(T)=\frac{C_*}{1-p}\delta^{1-p}+o(\delta^{1-p}),
$$

and therefore

$$
v(T)=-w_*+\frac{C_*}{1-p}\delta^{1-p}+o(\delta^{1-p}),
$$

$$
x(T)=w_*\delta
-\frac{C_*}{(1-p)(2-p)}\delta^{2-p}
+o(\delta^{2-p}).
$$

The second relation follows by integrating the first speed expansion once more over the remaining time interval. No derivative of an unspecified asymptotic remainder is taken. Equivalently, $w_*^2-w^2\sim2B_*x^{1-p}/(1-p)$ follows from the radius-coordinate integral. The two forms agree.

## Optional small-radius family limits

For fixed $p$, the theorem also gives the leading dependence on $a$ as $a\downarrow0$, without changing the law or choosing a history from a future outcome. The complete speed bound is $b_a=O_p(a^{(1-p)/2})\to0$, and $x_0/a\to1$. The complete chord and transmitter inequalities then give a uniform relative estimate along the entire positive-radius trajectory,

$$
Q(T)=2^{-p}x(T)^{-p}[1+O_p(b_a)].
$$

Integrating its two-sided bounds yields

$$
w(T)^2=\frac{2^{1-p}}{1-p}
\left(x_0^{1-p}-x(T)^{1-p}\right)[1+O_p(b_a)],
$$

with the same relative control for all $0<x<x_0$. In particular

$$
w_*\sim\sqrt{\frac{2^{1-p}}{1-p}}\,a^{(1-p)/2}.
$$

Using $T_*=\int_0^{x_0}dx/w(x)$ and the uniform relative bounds gives

$$
T_*\sim
\sqrt{\frac{1-p}{2^{1-p}}}\,
a^{(p+1)/2}
\int_0^1\frac{dy}{\sqrt{1-y^{1-p}}}.
$$

The last integral is finite because its only endpoint singularity is proportional to $(1-y)^{-1/2}$. These are additional family asymptotics, not an instantaneous-law premise for the fixed-$a$ contact proof. They are not uniform as $p\uparrow1$.

## Why the unit exponent has a different first endpoint

At $p=1$, the same preparation formula is compatible for every $a>0$ and has supplied speed at most $1/216$, since $A\le(2a)^{-1}$ and $d=a/16$. Starting at rest, its released velocity again becomes strictly negative and decreases. Hence a separated strict-subfield future cannot persist for infinite time: after any positive time its incoming speed has a positive lower bound.

Suppose contact occurred before or simultaneously with the first unit-speed boundary. A positive limiting partner delay would require the right member to cover the displacement from the source position to zero at unit average speed, although its entire intervening open interval is strictly subfield. The strict chord inequality excludes that possibility. Therefore the source must approach $T_*$ and $R\to0$.

The exact source-clock change of variables is

$$
Q(T)\,dT=\frac{dS}{R^p[1-v(T)]}
\ge\frac{dS}{2(T_*-S)^p}.
$$

At $p=1$ its integral diverges, while $\int Q\,dT=-v(T)$ remains bounded before unit speed. Contact on that chart is impossible. The finite endpoint must instead be inward unit speed at positive separation. There the sampled source lies strictly earlier, with a positive transmitter margin, so the received acceleration has a finite strictly inward limit. This agrees with, and directly reconstructs for this preparation, the endpoint mechanism in the [long-range analysis](alternatives-screen-2026-10-05-radial-long-range-class.md).

For $0<p<1$, the corresponding source-time integral is locally integrable; the explicit construction above proves that contact can actually occur while speed stays uniformly below one. Thus $p=1$ is a sharp boundary for this incoming-contact mechanism. This comparison does not select a post-unit continuation for $p=1$. In particular, the supplied ramp is outward and does not satisfy a complete monotone-inward-past premise that some separate continuation obstructions require.

## Endpoint meaning and exclusions

At the contact limit the two labels have positions zero and distinct finite incoming velocities $-w_*$ and $+w_*$. Their individual accelerations have magnitude asymptotic to $C_*\delta^{-p}$, so they are unbounded but integrable. Position has a $C^1$ incoming extension to the endpoint and velocity is absolutely continuous up to it; there is no $C^2$ ordinary continuation matching this incoming acceleration limit.

At the contact reception itself there is no positive-delay partner or self root in the incoming history: such a root would require a unit-speed chord ending at zero, contradicted by the complete speed bound. The limiting zero-delay coincidence is outside the ordinary positive-range chart. The finite incoming trace and finite accumulated acceleration do not define an outgoing collision rule. A weaker almost-everywhere continuation, crossing rule, reflection rule or other endpoint prescription would require a separately stated mathematical problem and an existence/selection analysis. None is asserted or silently supplied here.

The theorem gives a concrete complete family with subfield contact. It does not classify all sublinear preparations, prove an optimal radius bound, establish arbitrary-history or nonmirror stability, or apply at $p=0$, $p=1$ or other unselected radial laws. The leading contact coefficient depends on the actual terminal incoming speed $w_*$; the comparison bounds do not locate that speed exactly for a fixed nonzero $a$.

## Falsifiers, source identities and scoped validation

Load-bearing falsifiers are a failure of the ramp jets or endpoint fixed point; a release source entering the patch; an extra root under the complete strict speed bound; an incorrect full-history range inequality; a speed crossing $1/2$ despite the derived squared-speed bound; a finite positive-radius failure with all ordinary margins intact; or an incoming source limit inconsistent with the displayed range and transmitter factors. Each can be checked against the explicit equations above. An alleged divergence of contact impulse for $p<1$ would contradict the derived $\delta^{-p}$ acceleration and its integrable exponent; no numerical fit is needed for that conclusion.

The new complete preparation is specified directly in this document. Relevant live source identities were measured with `shasum -a 256` before authoring:

| Source | SHA-256 |
| --- | --- |
| [Master Equation root-weight owner](../../../../../content/markdown/aaa/dynamics/master-equation.md) | `8a106d615611efe5b6baf8705a47f03edcf53ffe13d7998fb7af86432c139f7f` |
| [Long-range endpoint comparison](alternatives-screen-2026-10-05-radial-long-range-class.md) | `a3e356d5fd78c1c5e626db4db907574c5c76a104b05a7a9b4c4ed5634a1fd198` |

Validation is analytical: the scalar fixed point, polynomial jets, complete residual monotonicity, strict chord exclusions, exact radius-coordinate integration, finite-time continuation argument, source-clock limit and two tail integrations. No new executable instrument, numerical trajectory, Python process or background computation was used. Only this new independent analysis was authored; existing subjects and shared owners were preserved. Whitespace validation and final source identities are checked after creation. Separate assessment is required before scientific integration.
