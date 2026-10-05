# Critical zero-speed escape in a complete collinear radial-power family

## Result and fixed scenario

**Claim grade: derived candidate, awaiting fresh independent assessment.** Fix an exponent $p>1$ and one held radius $a\ge100$ satisfying

$$
\frac{(2a)^{1-p}}{p-1}<\frac9{32}.
$$

The complete compatible held-and-ramped mirror family defined below contains a launch with global outward separation and terminal speed zero. The only free launch parameter is the release speed $v_0\in[0,3/4]$; the exponent, law coefficients, held radius and ramp shape remain fixed. The zero-speed launch can be chosen on the boundary of the parameter component that turns inward. For every zero-speed member of this family, the right-member radius has the exact leading asymptotic

$$
x(T)\sim
\left[
\frac{p+1}{2}\sqrt{\frac{2^{1-p}}{p-1}}\,T
\right]^{2/(p+1)}
\qquad(T\to\infty).
$$

Here $x(T)>0$ is the physical coordinate of the right member; the left member is at $-x(T)$ and their separation is $2x(T)$. The symbol $\sim$ means that the ratio tends to one. All numerical instantiations use $K=R_*=c_f=1$. The equation is the selected opposite-polarity radial response $R^{-p}$ with its unchanged transmitter factor and complete ordinary self/partner convention. No receiver multiplier, speed cap, root deletion, energy-conservation premise or response at unit speed is added.

The fixed choice $a=100$ satisfies the displayed condition at both $p=3/2$ and $p=2$. For any other fixed $p>1$, sufficiently large fixed $a$ satisfies it. This is not a common bounded-radius statement as $p\downarrow1$.

The proof gives two nonempty disjoint relatively open parameter sets: members that turn inward and reach a finite inward unit-speed endpoint before contact, and members that scatter outward with positive terminal speed. Their complement consists of global outward zero-speed members and is nonempty. No uniqueness, monotone dependence on $v_0$, isolated critical value, numerical critical parameter or universal fate for other histories is asserted.

## One complete compatible family

This extends the launch-speed parameter in the [held/ramped outward preparation](alternatives-screen-2026-10-05-radial-long-range-class.md), whose finite-domain and outward comparison arguments were assessed in the [fate adjudication](../../analysis/alternatives-screen-2026-10-05-fate-adjudication.md#radial-long-range-classification-and-compatible-outward-barriers). All ingredients needed here are reconstructed below, including the finite inward endpoint for the new range of launch speeds.

For each $v_0\in[0,3/4]$, let $A=A(v_0)$ be the unique solution in $(0,1/100)$ of

$$
A=\left(2a+\frac{v_0}{2}+\frac A{12}\right)^{-p}.
$$

The left side increases and the right side decreases in $A$. At $A=0$ the right side is positive; at $A=1/100$ it is at most $(2a)^{-p}<1/200<1/100$. Thus the root exists and is unique. The derivative of the difference with respect to $A$ is

$$
1+\frac p{12}\left(2a+\frac{v_0}{2}+\frac A{12}\right)^{-p-1}>1,
$$

so $A(v_0)$ is smooth on a neighborhood of the parameter interval. Its variation is a required compatibility adjustment within this declared family, not a change in the acceleration law or a choice based on the future outcome.

For physical past time $S\le-1$, prescribe $x(S)=a$. On $-1\le S\le0$, set $q=S+1$ and prescribe

$$
v(S)=v_0(3q^2-2q^3)+Aq^2(1-q),\qquad
x(S)=a+\int_{-1}^{S}v(u)\,du.
$$

The other label has the exact negative history. At the old seam the velocity and acceleration vanish. At release,

$$
x_0:=x(0)=a+\frac{v_0}{2}+\frac A{12},\qquad
v(0)=v_0,\qquad v'(0-)=-A.
$$

The complete past is locally $C^{2,1}$, separated, and nondecreasing in $x$. Since $0\le3q^2-2q^3\le1$ and $0\le q^2(1-q)\le4/27$, its speed satisfies

$$
0\le v(S)\le\frac34+\frac4{2700}<\frac45<1.
$$

The release root lies in the held tail at $S_0=-R_0$, with $R_0=x_0+a>200$. The source velocity is zero, so the exact release acceleration is $-R_0^{-p}=-A$, equal to the supplied left acceleration. The joined history is therefore acceleration-compatible. At $v_0=0$ the ramp has a small positive velocity before release and ends at rest; this is the same family, not the separate held-rest release with an acceleration seam.

## Complete roots and the ordinary future equation

While $x(T)>0$ and the joined histories are strictly subfield, the unique partner emission time $S(T)<T$ obeys

$$
R(T)=T-S(T)=x(T)+x(S(T)),\qquad
D(T)=1+v(S(T))>0.
$$

For fixed reception, the delay residual $u-x(T)-x(T-u)$ starts at $-2x(T)<0$, has derivative $1+v(T-u)>0$ and tends to positive infinity because the remote past is held at $a$. It has exactly one simple positive zero. The strict speed chord inequality excludes every positive-delay self root. Mirror symmetry follows from uniqueness and the reflection symmetry of the selected law and complete preparation.

The right-member future therefore solves the exact scalar system

$$
x'=v,\qquad
v'=-Q(T),\qquad
Q(T)=\frac1{R(T)^pD(T)}>0.
$$

Primes here denote physical-time derivatives. In particular, generated velocity strictly decreases, although the supplied ramp need not have decreasing velocity. The source clock differentiates to

$$
S'(T)=\frac{1-v(T)}{1+v(S(T))}>0.
$$

On a compact separated chart with a complete strict speed margin, the partner delay has a positive floor and the root has a transmitter-factor floor. A step shorter than the delay floor samples only already known history. The source positions and velocities are locally Lipschitz, so the root and acceleration are locally Lipschitz functions of reception time and position. Ordinary position-velocity steps give local existence, uniqueness and continuation. Endpoint compatibility gives the stated joined regularity at release. These are the local facts used in the global arguments; no missing source segment is assigned zero response.

## Every inward turn reaches a finite unit-speed endpoint before contact

Consider a maximal separated strict-subfield future with a finite upper time $T_*$. Bounded velocity makes $x$ Lipschitz on that interval, and the decreasing bounded velocity has a limit. Source times have a finite lower bound: if a source lies below $-1$, then it equals $T-x(T)-a$, which is bounded on a finite reception interval. Thus $S(T)$ has a finite limit $S_*\le T_*$.

Suppose first that $x(T)\to0$. If $S_*<T_*$, the limiting root relation would give

$$
x(S_*)=T_*-S_*.
$$

But $x(T_*)=0$ and the path is strictly subfield at every interior time of that interval. Its displacement is strictly less than its elapsed time, contradicting this equality. This remains true if the limiting present speed is unit speed: a single endpoint equality does not turn a strictly subfield interior chord into a unit-average-speed chord. Consequently $S_* = T_*$ and $R\to0$.

Changing from reception to the increasing source clock gives

$$
Q(T)\,dT=\frac{dS}{R^p[1-v(T)]}
\ge\frac{dS}{2(T_*-S)^p}.
$$

Here $R=T-S\le T_*-S$ and $1-v(T)\le2$ on the strict chart. The right integral diverges as $S\uparrow T_*$ for $p\ge1$, whereas $\int Q\,dT=v_0-v(T)$ remains bounded while $v>-1$. Contact before or simultaneous with first unit speed is therefore impossible.

If $x(T)\to x_*>0$, then $R=x(T)+x(S)>x(T)$ has a positive lower bound. Sampled sources remain in a compact time interval strictly before $T_*$. Their velocities have a strict subfield margin and their already generated regularity is bounded there. Hence the received acceleration has a finite positive magnitude at the endpoint. If the limiting present speed were strictly above $-1$, the method of steps would continue the regular chart. Since $v(T)\le v_0\le3/4$, the only finite strict-domain endpoint is

$$
v(T)\longrightarrow-1,\qquad x(T)\longrightarrow x_*>0,
\qquad v'(T)\longrightarrow-Q_*<0.
$$

The last limit records transverse inward approach to unit speed. It does not assign any outgoing continuation.

Now suppose $v(T_1)<0$ at a regular finite time. Strict decrease gives $v(T)\le v(T_1)<0$ afterward, so a separated strict-subfield future cannot persist beyond $T_1+x(T_1)/|v(T_1)|$: its radius would reach zero by then. The finite-endpoint classification shows that it instead reaches inward unit speed at positive separation. At $v_0=0$, exact compatibility gives $v'(0)=-A<0$, so this outcome occurs for that endpoint parameter.

This proof deliberately establishes the first finite boundary only. The complete ramp is outward before release, so a theorem requiring a complete monotone inward past cannot be imported as a post-unit continuation obstruction for this family without a separate argument.

## Every member that never turns is global and disperses

If a member never has negative velocity, then $v(T)>0$ at every positive finite time: an actual zero would immediately be followed by negative velocity because $v'<0$. It follows that $x(T)\ge x_0>a$ and $0<v(T)\le v_0\le3/4$. Together with the complete supplied speed bound below $4/5$, this is a common strict-subfield margin for the entire joined history. Separation and the ordinary root margins therefore prevent any finite endpoint, so the solution exists for every $T\ge0$.

The decreasing positive velocity has a limit $V\ge0$. The increasing radius must be unbounded. Otherwise $x(T)\le L$ and all its complete source positions also lie between $a$ and $L$, giving $R\le2L$ and $D\le2$. Thus $Q\ge[2(2L)^p]^{-1}>0$, incompatible with positive bounded decreasing velocity for all time. Therefore $x(T)\to\infty$.

Every parameter consequently has exactly one of three outcomes: a finite inward unit-speed endpoint after a turn; global outward scattering with $V>0$; or global outward escape with $V=0$. This is a classification for this fixed complete family, not for arbitrary collinear histories.

## An open positive-speed scattering set

While the complete joined history remains outward, $x(S)\ge a$ and $v(S)\ge0$. The exact equation implies

$$
v'\ge-(x+a)^{-p}.
$$

Define the mathematical comparison function

$$
E(T)=\frac{v(T)^2}{2}-\frac{(x(T)+a)^{1-p}}{p-1}.
$$

It satisfies $E'=v[v'+(x+a)^{-p}]\ge0$ during outward motion. If $E$ is positive at any finite time reached through an outward history, a first later zero of $v$ is impossible: $E$ there would be negative. The velocity remains at least $\sqrt{2E(T_0)}>0$ after that time, and the preceding global continuation argument applies. This is an inequality derived from the selected response, not physical energy conservation.

At $v_0=3/4$,

$$
E(0)\ge\frac9{32}-\frac{(2a)^{1-p}}{p-1}>0.
$$

Thus this endpoint parameter has positive terminal speed. For $a=100$, the subtracted term is $\sqrt2/10<9/32$ at $p=3/2$, and $1/200<9/32$ at $p=2$; these exact inequalities verify the two specified cases. A fixed admissible $a$ for any other fixed $p>1$ can be chosen directly from the displayed inequality, before varying $v_0$.

Conversely, if a member has $V>0$, then its unbounded radius and convergent speed give $E(T)\to V^2/2>0$. It therefore enters the positive-comparison region at a finite time. This finite witness is what makes positive-speed scattering stable under small changes of the launch parameter.

## Complete-history continuity and a critical parameter

The compatibility solution $A(v_0)$ is smooth, and the past ramp is polynomial in time and smooth in $v_0$. The complete supplied histories therefore vary continuously in $C^2$ on compact past intervals. In this particular held-tail family they are even identical before the fixed seam $S=-1$; no infinite-past phase convergence is required.

Fix any parameter and a finite time before its first unit endpoint, if it has one. Its radius and complete sampled speeds have strict margins on that interval. The root bounds place every sampled source in one compact old-time interval. A neighborhood of these margins gives a common positive delay floor and root derivative floor. Root displacement is bounded by the history/position discrepancy divided by the transmitter floor; bounded source acceleration controls source-velocity evaluation at a displaced root. On successive steps shorter than the delay floor, the ordinary integral difference estimate then gives continuous dependence of position and velocity on $v_0$. A compact finite interval requires only finitely many such steps. Neighborhood bounds close by ordinary continuation and the strict margins of the reference solution.

Let $\mathcal I$ be the set of parameters having $v(T_1)<0$ at some finite regular time. By the finite-boundary proof, this is exactly the set that subsequently reaches a finite inward unit-speed endpoint. It is relatively open in $[0,3/4]$ because negative velocity at that finite time persists under the just-established parameter continuity. It contains $v_0=0$ and hence a relative neighborhood of zero.

Let $\mathcal P$ be the set with positive terminal speed. For each of its members choose a finite $T_0$ with $E(T_0)>0$. Its speed is bounded below by its positive terminal speed throughout the finite prefix. Nearby parameters therefore remain outward through $T_0$ and retain $E(T_0)>0$. The comparison then keeps them outward with positive terminal speed forever. Thus $\mathcal P$ is relatively open and contains a neighborhood of $3/4$. The two sets are disjoint.

Connectedness now forces the complement to be nonempty. More explicitly, let

$$
v_* = \inf\bigl([0,3/4]\setminus\mathcal I\bigr).
$$

The endpoint neighborhoods imply $0<v_*<3/4$. Openness of $\mathcal I$ and the definition imply $[0,v_*)\subset\mathcal I$ and $v_*\notin\mathcal I$. Nor can $v_*\in\mathcal P$, since openness of $\mathcal P$ would place nearby smaller parameters in both sets. The three-outcome classification therefore gives a unique ordinary global trajectory at this parameter with $v(T)>0$, $x(T)\to\infty$ and $v(T)\to0$.

The word critical refers here to the boundary of the inward-turn component containing zero. It does not assert a single threshold separating all parameters, monotone dependence of trajectories on launch speed, or uniqueness of the zero-speed member. The full zero-speed set is relatively closed as the complement of the two open outcome sets, but can have more than one member or contain an interval.

## Sharp zero-speed asymptotic from the actual source clock

Take any member with global outward motion and $v(T)\to0$. Since $x'=v$, elementary averaging gives $x(T)/T\to0$. The source time must eventually be positive: if $S(T)\le0$, then $x(S)\le x_0$ and the root equation would imply $T\le x(T)+x_0$, impossible for large $T$. With positive source time, monotonicity of radius gives

$$
0\le T-S(T)=x(T)+x(S(T))\le2x(T),
\qquad \frac{S(T)}T\longrightarrow1.
$$

In particular $S(T)\to\infty$ and $v(S(T))\to0$. Since generated velocity decreases,

$$
0\le x(T)-x(S(T))
=\int_{S(T)}^T v(u)\,du
\le v(S(T))[T-S(T)]
\le2v(S(T))x(T).
$$

Therefore $x(S(T))/x(T)\to1$, $R(T)/(2x(T))\to1$ and $D(T)=1+v(S(T))\to1$. Substitution into the exact delayed acceleration gives

$$
-v'(T)=2^{-p}x(T)^{-p}[1+o(1)].
$$

This passage retains the actual source history. It does not replace it by a stationary source or an instantaneous equation at a finite time.

Because $v(T)>0$ and $x(T)\to\infty$, use radius as a coordinate on this trajectory. For $V_x(x)=v(T(x))$, the chain rule gives

$$
\frac{d}{dx}V_x(x)^2=2v'(T(x))
=-2^{1-p}x^{-p}[1+o(1)].
$$

The terminal condition is $V_x(x)\to0$ as $x\to\infty$. Integrating to infinity, permissible because $p>1$, yields

$$
v(T)^2\sim\frac{2^{1-p}}{p-1}x(T)^{1-p}.
$$

For precision, once the acceleration ratio is within $1\pm\eta$, the entire tail integral is trapped between $(1\pm\eta)2^{1-p}x^{1-p}/(p-1)$; taking $\eta\downarrow0$ proves the equivalence without differentiating an unspecified asymptotic remainder.

Put $C_p=\sqrt{2^{1-p}/(p-1)}$ and $B_p=(p+1)C_p/2$. Then

$$
\frac d{dT}x(T)^{(p+1)/2}
=\frac{p+1}{2}x(T)^{(p-1)/2}v(T)
\longrightarrow B_p.
$$

Integration and division by $T$ give the announced exact leading radius. The speed itself satisfies

$$
v(T)\sim\frac{2}{p+1}B_p^{2/(p+1)}
T^{-(p-1)/(p+1)}.
$$

Thus the coefficient is independent of the held radius and of which zero-speed parameter is chosen, for the fixed normalized radial law. Those preparation details determine the selected trajectory and its subleading behavior, not this leading coefficient.

At the two specified exponents the formulas become

$$
\begin{array}{c|c|c}
p & v^2\text{ as a function of }x & x(T)\text{ at late time}\\ \hline
3/2 & \sqrt2\,x^{-1/2} & \left(\dfrac54\,2^{1/4}T\right)^{4/5}\\[3pt]
2 & \dfrac1{2x} & \left(\dfrac9{8}\right)^{1/3}T^{2/3}
\end{array}
$$

Each entry in the last two columns is an asymptotic equivalent, not an equality at finite time. The left member has opposite velocity and coordinate. This is escape with vanishing speed, not capture or a bound pair.

## Falsifiers, limitations and frozen antecedents

The load-bearing falsifiers are a failure of the compatibility equation or ramp jets; an extra ordinary root under the complete strict speed bound; contact before or with unit speed despite the divergent source-time integral; failure of finite-step parameter continuity within positive separation and root margins; a turn from positive $E$; or failure of $R/(2x)\to1$ on a global outward zero-speed member. The late coefficient can be independently checked by deriving the source-clock limit and integrating the squared-speed derivative; an assumed conserved energy does not validate it.

The critical parameter is not numerically located. No theorem about uniqueness, monotone parameter ordering, rates of approach to criticality, nonmirror perturbations, bound states, or post-unit continuation follows. The complete outward ramp differs from the complete monotone inward histories required by some existing unit-event obstruction theorems, so those stronger continuation exclusions are not claimed here. At $p=1$, the tail integral and the fixed positive-comparison construction used here fail; the separately assessed long-range theorem instead forces a finite unit endpoint in its stated class. No uniform limit through $p=1$ is supplied.

Before this source was authored, `shasum -a 256` measured the antecedent `alternatives-screen-2026-10-05-radial-long-range-class.md` as `a3e356d5fd78c1c5e626db4db907574c5c76a104b05a7a9b4c4ed5634a1fd198`, matching its retained fate assessment. The comparison preparation is fixed before the parameter argument; neither law nor radius is chosen from a computed trajectory.

Validation is analytical: complete-root monotonicity, compatibility jets and implicit-function derivative, finite-contact integral, outward comparison, finite-history method of steps, open-set connectedness and the source-clock asymptotic. No numerical target, new executable instrument, Python process or background computation was used. Only this new subject is authored for this assignment; shared owners and assessed sources remain unchanged by it. The theorem and exact leading coefficient require a fresh independent assessment before scientific integration.
