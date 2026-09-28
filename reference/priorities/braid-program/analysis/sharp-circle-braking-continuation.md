# Braking after circular departure under the sharp ceiling equation

**Date:** 2026-09-26. **Model:** the sharp Master Equation, opposite-polarity antipodal partners, the authorized field-speed ceiling, and no self action at or below that ceiling. **Evidence:** measured floating-point continuation, plus independently reviewed conditional escape theorems. The [corrected independent review](sharp-circle-escape-independent-review.md) supplies the completed regularity and continuation hypotheses, a stronger escape criterion, and a comparison lemma covering ceiling contact. No validated enclosure of the exact released trajectory has been established. These results do not adopt the ceiling as canonical theory.

The expanding input of the [first-departure calculation](sharp-circle-first-departure.md) slows after leaving the ceiling and continues to separate over the computed interval. No radial maximum, speed minimum, or return to the ceiling is observed through normalized time 1000. A bound derived below identifies a finite-history condition sufficient to establish escape under the sharp equation. The computed history satisfies its numerical inequalities with a positive margin; proving that the exact history satisfies them remains open.

## 1. History, normalization, and equations

Use $c_f=1$, length unit $R_\ast$, and time unit $R_\ast/c_f$. The dimensionless coupling is $k=K/R_\ast=4D(1+\sin D)$, where $D=\cos D$. With $r_0=1.001$, supply the entire past

$$
X(t)=r_0(\cos(t/r_0),\sin(t/r_0)),\qquad t\le0,
$$

and its exact unit tangent velocity. The partner has position $-X(t)$ and opposite polarity. These are kinematically consistent supplied histories; their accelerations do not satisfy the equation before release unless $r_0=1$. They are not claimed to be exact unstable-manifold histories. For $t>0$ the future is calculated from the equation, with neither a prescribed orbit nor a smoothed kernel.

At a receiver time $t$, the ordinary partner emission time $s<t$ satisfies

$$
\ell=|X(t)+X(s)|=t-s,\qquad
n=\frac{X(t)+X(s)}{\ell},\qquad
J=1+n\cdot V(s),\qquad
A=-\frac{k n}{\ell^2J}.
$$

Here $\ell$ is the hit range, $n$ its direction, and $J$ the transmitter factor; the plus sign in $J$ follows from the partner velocity $-V(s)$. On this ordinary chart $J>0$. The complete acceleration has this one partner row and zero self contribution. The authorized ceiling response is

$$
\dot X=V,\qquad
\dot V=
\begin{cases}
A,&|V|<1,\\
A-(V\cdot A)_+V,&|V|=1.
\end{cases}
$$

Write $P=V\cdot A$. At the ceiling, a positive $P$ is removed. When $P$ becomes negative, the whole acceleration remains and $d|V|^2/dt=2P<0$: speed decreases. This is why continuation past the first-departure boundary requires a speed variable. Below the ceiling there is no subtraction of the tangential component, including if it later becomes positive.

## 2. Instrument and checks before target use

The explicit-use research instrument is [sharp-circle-braking.mjs](../../../../scripts/field-speed-ceiling/sharp-circle-braking.mjs); it is not the production EOM solver. The earlier departure instrument and independent-review instruments remain unchanged. The [receipt](../evidence/sharp-circle-braking-receipt.json) records the source identity, commands, known cases and two refined target summaries. Detailed half-unit observation samples are retained at the literal runtime paths `.local-data/field-speed-ceiling/braking/long-coarse.json` and `.local-data/field-speed-ceiling/braking/long-fine.json`.

The state is Cartesian position and velocity. Negative-time sources use the analytic circle. Later sources use cubic Hermite position interpolation, with its derivative supplying source velocity. Bisection brackets the causal root between an older negative-gap point and the last accepted history endpoint. The time step is at most one eighth of the current delay; every stage checks that its root precedes accepted history. There is no finite-memory deletion, softened core, wake width, or added reception rule.

RK4 advances the active ceiling branch with its tangential projection. A smooth extension of that branch across a trial sign change is used only to bisect the release event, to a numerical time bracket narrower than $10^{-10}$. The accepted boundary velocity is normalized to unit length to correct floating-point drift, whose largest recorded correction is $4.45\times10^{-16}$. From release onward the instrument integrates the unprojected vector equation and stops at the first detected radial maximum, speed minimum, ceiling return, numerical guard, or observation horizon. Trial extensions and finite-step event locations are numerical devices, not an instantaneous jump or an extra physical response. An event bracket is a bracket on the numerical calculation, not an enclosure of the exact event.

Before target runs, the instrument passed these controls:

1. **Exact sharp circular solution.** At $r_0=1$, after three normalized time units, radius, delay and forward acceleration agree with $1$, $2D$, and $\tan D$ within $10^{-8}$.
2. **Sharp subfield evolution from stationary history.** Start at $X(0)=(r,0)$ with zero velocity and a stationary antipodal past, and stop while the causal source remains at negative time. With $u=r+X_x$ and $u_0=2r$, the equation reduces to $u''=-k/u^2$. Direct integration gives $V_x^2=2k(1/u-1/u_0)$ and, putting $u=u_0\cos^2\eta$,

   $$
   t=\sqrt{\frac{u_0^3}{2k}}(\eta+\sin\eta\cos\eta),\qquad
   V_x=-\sqrt{\frac{2k}{u_0}}\tan\eta.
   $$

   At $r=2,t=0.2$, position and velocity agree with this separate analytic reference within $10^{-10}$. This derives from the acceleration equation without assuming an energy or mass law.
3. **Ceiling-switch algorithm control.** A separately prescribed input $A=(1-t,0)$ releases a unit positive velocity at $t=1$, giving $V_x(1.5)=0.875$ and $X_x(1.5)=1.5-0.125/6$. The switch time, speed and position agree within $10^{-9}$. This checks the event algorithm only; it supplies no two-body physics result.
4. **Whole-segment bound control.** The Hermite-to-Bernstein bounds return minimum longitudinal position 1 and maximum speed 0.5 for an exactly linear segment from position 1 to 2 over two time units. For the target history the same convex-hull construction bounds the represented position and derivative over each entire segment. These bounds use floating-point arithmetic and do not enclose the exact trajectory.

The final instrument passed these controls before the two long target runs. No recurring testing obligation or production-solver acceptance claim is added.

## 3. Observed continuation

The coarse run uses maximum steps 0.002 before time 100 and 0.02 thereafter; the finer run halves both. Additional acceleration and delay step restrictions remain active. Both reach time 1000 without a detected radial turn, speed minimum, or ceiling return after release.

| Quantity | Coarse run | Finer run |
| --- | ---: | ---: |
| Ceiling-release time | 19.9098297508 | 19.9098297541 |
| Radius at release | 2.87223645476 | 2.87223645474 |
| Radius at time 1000 | 489.046747761 | 489.046747759 |
| Speed at time 1000 | 0.478276160499 | 0.478276160499 |
| Outward radial speed at time 1000 | 0.478164031395 | 0.478164031395 |
| Transmitter factor at time 1000 | 1.49238177624 | 1.49238177624 |

At release the outward radial speed is about 0.48484, so braking starts while separation is still increasing. At time 100 the shorter diagnostic runs give radius about 49.16285 and speed about 0.54333. By time 1000 the partner acceleration magnitude is small and the radial speed remains positive. Each architrino's distance from the midpoint is the reported radius; partner separation is twice that number.

The last finer causal source time is about 340.3991 and its range about 659.6009. The smallest evaluated transmitter factor over the finer run is 1.49238; the largest evaluated causal residual is below $3.5\times10^{-13}$. The maximum observed source-interpolation speed excess above the ceiling is about $2.46\times10^{-12}$. These are numerical diagnostics, not continuous chart certificates. Sign checks at finite steps also do not certify absence of arbitrarily short unobserved events. The two long runs took approximately 6.34 and 13.01 seconds on the session host, as recorded by the instrument.

Agreement under refinement checks numerical consistency of this implementation. In particular, its release times differ by more than the numerical bisection bracket widths; those widths cannot be presented as total errors. The analytic controls validate selected cases, not the complete target trajectory. No exact asymptotic speed is inferred from the value at time 1000.

The [independent sixth-order calculation](sharp-circle-escape-independent-review.md#32-agreement-and-the-breaking-point-finding) corroborates the trajectory: its recorded velocity differences from this calculation are below $2.5\times10^{-9}$ at 1,999 matched samples. It places release near 19.90982975694, still at floating-point grade. The acceleration mismatch at zero propagates derivative discontinuities into later source evaluations; fixed steps straddling those discontinuities are a plausible explanation of the release-time drift. The pre-change independent instrument was not retained, so the reported improvement after inserting breaking-point knots is not a reproduced causal attribution. Neither inter-instrument agreement nor a narrow numerical event bracket is an exact-trajectory enclosure.

## 4. A sufficient sharp-equation escape condition

The remaining question can be reduced to a finite-history verification. The idea is to bound every future velocity change from the partner. If that bound is smaller than both the available outward velocity and the margin below a chosen subfield speed, the two members cannot slow enough to return.

Let an exact capped antipodal solution be known through $T_0$, with Lipschitz velocity on the retained finite history through that endpoint and one ordinary partner root at each receiver time on $[0,T_0]$. The supplied analytic past obeys the cap. Reflection with label exchange maps each receiver equation to the other; symmetric initial data and regular-chart uniqueness therefore identify the antipodal reduction with the full two-body solution. Fix a unit direction $e$ and define $x(t)=e\cdot X(t)$, $x_0=x(T_0)>0$, $v_0=V(T_0)$, and $w_0=e\cdot v_0$. Suppose there is a time $S<T_0$ such that

$$
g(T_0,S)=|X(T_0)+X(S)|-(T_0-S)<0,
$$

and throughout $[S,T_0]$,

$$
x(s)\ge0,\qquad |V(s)|\le b<1.
$$

Choose $u$ with $0<u<w_0$, require $|v_0|<b$, and define

$$
I=\frac{k}{(1-b)u x_0}.
$$

**Sufficient condition (derived):** if

$$
I<\min\{b-|v_0|,\ w_0-u\},
$$

then the future remains subfield, has a single regular partner root, and obeys $x(t)\ge x_0+u(t-T_0)$ for all $t\ge T_0$. In particular, separation grows without bound. Velocity has a finite nonzero limit. This is conditional on the exact finite-history hypotheses; it does not claim that the floating-point history has proved them.

**Proof.** On any continuation with the cap, $g(t,S)$ is nonincreasing in receiver time and the gap is nondecreasing in emission time. Consequently the strict negative sign at $S$ excludes every source time at or before $S$, permanently. Bootstrap $|V(t)|<b$ and $e\cdot V(t)>u$ after $T_0$. The relevant past and future source velocities then satisfy the same strict speed bound, so $J\ge1-b>0$. The source projection is nonnegative, which gives

$$
\ell=|X(t)+X(s)|\ge x(t)+x(s)\ge x(t)\ge x_0+u(t-T_0).
$$

The negative gap at $S$, the positive gap $g(t,t)=2|X(t)|$, and the strict emission derivative on $[S,t]$ supply exactly one root. The unchanged sharp row therefore obeys

$$
|A(t)|\le\frac{k}{(1-b)[x_0+u(t-T_0)]^2},\qquad
\int_{T_0}^{\infty}|A(t)|\,dt\le I.
$$

Comparison of the normal-cone response with the constant admissible velocity $v_0$ gives $|V(t)-v_0|\le\int_{T_0}^t|A|\le I$, even without assuming that no ceiling contact occurs. Thus $|V(t)|\le|v_0|+I<b$ and $e\cdot V(t)\ge w_0-I>u$. These strict inequalities prevent a first exit from the bootstrap assumptions.

For continuation, use windows shorter than the delay floor $x_0$. Each source then lies in already determined history, reducing the interior equation to an ordinary differential equation in receiver position and velocity. The positive transmitter factor makes the source time locally Lipschitz in receiver position; Lipschitz source velocity makes the acceleration locally Lipschitz as well. Picard–Lindelöf gives unique local continuation. Bounded velocity, positive range and transmitter floors, and bounded acceleration prevent a finite-time exit from this regular domain and preserve the needed velocity regularity. The integrable acceleration makes velocity Cauchy at infinity, with positive limiting longitudinal component. This proves the condition. An acceleration jump at release is compatible with Lipschitz velocity; a bound only after $T_0$ would not establish the required earlier regularity.

There is also a sufficient condition excluding any later radial maximum. Choose $e=v_0/|v_0|$ and put $p_0=|X(T_0)-x_0e|$. The transverse velocity is bounded by $I$ and the transverse displacement by $p_0+I(t-T_0)$. Therefore

$$
|X|\frac{d|X|}{dt}=X\cdot V
\ge x_0u-p_0I+(u^2-I^2)(t-T_0)>0
$$

provided $u>I$ and $x_0u>p_0I$. This extra condition excludes a radial turn; it does not by itself fix the sign of $d|V|/dt$ forever.

## 5. Numerical margins and the remaining proof boundary

For the finer history, take $T_0=1000$, $e=V(T_0)/|V(T_0)|$, $b=0.7$, and $u=0.35$. Use the first stored source time at or above 100, approximately $S=100.00083$. The represented-history bounds give

| Required quantity | Numerical value |
| --- | ---: |
| $x_0$ | 488.93209 |
| $|v_0|=w_0$ | 0.47827616 |
| $g(T_0,S)$ | −362.48688 |
| Minimum source projection on $[S,T_0]$ | 48.19720 |
| Maximum source speed bound on $[S,T_0]$ | 0.54333064 |
| $I$ | 0.09637656 |
| $\min(b-|v_0|,w_0-u)-I$ | 0.03189960 |

The transverse position is about $p_0=10.58912$, so the additional no-radial-turn inequalities also hold numerically. If validated bounds put the exact trajectory inside these margins, its future escape and lack of a subsequent radial turn would follow from the theorem. The longitudinal limiting speed would then exceed $w_0-I$, about 0.38190 in this numerical evaluation; the current computation alone does not certify that bound for the original history.

This makes the remaining certification target finite, but it is still not an exact escape verdict. The finite-prefix error, whole-history cap and source bounds, and root completeness must be controlled together. The comparison lemma below can account for the ceiling switch without a separate exact event-time certificate. No conclusion about the inward input, arbitrary small perturbations, or a physically prepared all-past solution follows.

## 6. Stronger escape criterion and corrected finite target

The independently reviewed **Theorem B** uses the source motion's direction. Retain §4's solution class and negative old-source gap. With $V_\perp=V-(e\cdot V)e$, set $m=\min_{[S,T_0]}x$, $q=\max_{[S,T_0]}|V_\perp|$, and $q_0=|V_\perp(T_0)|$. Require $e\cdot V\ge0$ on that source interval and $x_0+m>0$. Choose $u>0$ and $q\le\beta<1$. The sufficient inequality is

$$
I_B=\frac{k}{(1-\beta)u(x_0+m)}
<\min\{w_0-u,\ \beta-q_0,\ 1-|v_0|\}.
$$

To derive it, bootstrap $e\cdot V>u$ and $|V_\perp|<\beta$. Source and receiver longitudinal projections have positive sum, so $e\cdot n>0$. Nonnegative longitudinal source velocity cannot lower $J$: $n\cdot V(s)\ge-|V_\perp(s)|\ge-\beta$. Hence $J\ge1-\beta$ and $\ell\ge x_0+m+u(t-T_0)$. Integration gives total velocity change at most $I_B$. The three strict margins preserve positive longitudinal velocity, the transverse bound, and strictly subfield speed. The root and method-of-steps continuation arguments of §4 then apply, with delay floor $x_0+m$. Velocity tends to a nonzero limit and separation grows without bound.

For a fixed direction that is not exactly the endpoint velocity direction, the radial condition must use $Q=q_0+I_B$: $X\cdot V\ge x_0u-p_0Q+(u^2-Q^2)(t-T_0)$. It is positive if $u>Q$ and $x_0u>p_0Q$. Endpoint uncertainty does not permit setting $q_0=0$ without justification.

The [corrected certification plan](sharp-circle-escape-independent-review.md#41-the-finite-obligation-made-explicit) uses $T_0=300$, $S=99.27557599180734$, $\beta=0.285$ and $u=0.2125$. It proposes a validated solution enclosure through time 300, with position error at most 0.5 and velocity error at most 0.02 on $[S,300]$. Together with the sampled reference data, those allowances suggest about 0.09785 of escape margin. This is planning arithmetic, not a certificate: the reference extrema, negative gap, direction normalization, root census and all theorem inequalities must be bounded continuously. The earlier allowance 1 for position was too large: twice that error could reverse the observed gap of about $-1.52826$ at $S$. The corrected radius 0.5 leaves about 0.528 of planning gap margin.

## 7. Bounding equation error through ceiling contact

Let $V$ satisfy $\dot V+\nu=A[X]$ with $\nu\in N_{\mathcal B}(V)$ for the closed unit velocity ball. Choose an absolutely continuous comparison velocity $\widetilde V$ with $|\widetilde V|\le1$, $\dot{\widetilde X}=\widetilde V$, admissible history, and $\widetilde\nu\in N_{\mathcal B}(\widetilde V)$. Its full equation defect is

$$
r=\dot{\widetilde V}+\widetilde\nu-A[\widetilde X].
$$

Monotonicity of the normal cone gives $(V-\widetilde V)\cdot(\nu-\widetilde\nu)\ge0$. Subtracting the two equations, taking this inner product, and treating a zero velocity gap by regularizing its norm yields

$$
\frac{d}{dt}|V-\widetilde V|
\le |A[X]-A[\widetilde X]|+|r|
\quad\text{almost everywhere}.
$$

Thus exact ceiling-release times need not be located to compare the motions. The comparison must satisfy the cap and position–velocity relation exactly, and its full defect must be bounded. Unit-speed heading coordinates alone do not make the tangential defect vanish. The remaining term $|A[X]-A[\widetilde X]|$ still requires a rigorous history-dependent error-propagation estimate and existence control.

The [first-window defect evaluator](sharp-circle-first-window-defect.md) implements the residual part on $[0,1]$, where all source times lie in the supplied analytic past. The separate [first-window trajectory proof](sharp-circle-first-window-tube.md) bounds receiver-position sensitivity, preserves the complete ordinary-root census and closes position error below 0.0000450 and velocity error below 0.0001342 on that interval. The exact supplied-history solution remains at field speed there, subject to the proof and interval-arithmetic dependencies; this finite-prefix result has not yet been independently reviewed. Extension to the time-300 escape hypotheses remains open. Large amplification figures in the independent review are planning estimates, not necessary-precision theorems or proof that another certification route is unavailable.

**Falsifiers and next step.** Failure of a sufficient escape inequality leaves escape unresolved; it does not refute escape. A radial turn refutes the no-turn statement only after its starting time and under all its extra hypotheses. A missing root, inaccurate history derivative, or invalid history query would invalidate the numerical continuation. A counterexample satisfying the exact hypotheses but violating the integrated-acceleration conclusions would refute the theorem. The remaining numerical proof object is a validated finite-prefix enclosure with the corrected margins; more floating-point agreement cannot replace it.
