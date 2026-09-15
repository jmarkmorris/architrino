# Stationary Binary Release: Initial Acceleration and First Feedback

## Scope and model

This analysis starts from the sharp simple-root acceleration law in the [EOM evolution contract](../../app-solver/contracts/evolution-contract-v1.md#canonical-per-root-calculation). It concerns two opposite-polarity architrinos with mirror-symmetric stationary histories, released at absolute time $T=0$. Wake speed is normalized to $c_f=1$. The statements below are derived for the exact nominal history; numerical comparisons to the EOM solver must separately retain its input-history uncertainty and integration enclosures. Neither a finite approach nor passage through an instrument boundary establishes permanent binding or a repeated breather.

Write the two positions as $X_+(T)=y(T)$ and $X_-(T)=-y(T)$ on their common axis. Initially $y(T)=a=1/2$ and $y'(T)=0$ on the retained interval $-20\le T\le0$. Let $G=\kappa|q_+q_-|>0$. The ideal shorthand $q_\pm=\pm1/6$ gives $G=\kappa/36$. The executable fixture instead consumes finite decimal charge tokens; an independent numerical comparison uses those exact tokens and the emitted coupling, not a silently substituted exact fraction. The current fixture computes the coupling as `36.0 * 0.2862286103053385`, whose binary64 value is serialized as `10.304229970992187`.

The restriction to mirror symmetry is a reduced initial-value problem, not a perturbation theorem. On the regular sub-field chart, reflection and exchange preserve the equations; uniqueness of that local delayed initial-value problem preserves the symmetry. The argument below does not claim uniqueness across coincidence, a multiple causal root, or an unsupported self-interaction event.

## Initial acceleration and root playback

At release the partner distance is $2a=1$, the unique partner emission time is $S=-1$, and both velocities vanish. Therefore $D_t=D_r=1$ and $W^{\mathrm{acc}}=1$. Each self-history is stationary and has no positive-delay causal root; the same-time diagonal is excluded by the binding. The initial accelerations are consequently

$$
X_+''(0)=-G,
\qquad
X_-''(0)=G.
$$

These are acceleration values obtained directly from the charge product, inverse-square distance and transmitter-side root weight. No architrino mass or imported mechanical law enters the calculation.

The first-interval equation derived below also gives the immediate motion:

$$
y(T)=\frac12-\frac{G}{2}T^2-\frac{G^2}{12}T^4+O(T^6),
\qquad
y'(T)=-GT-\frac{G^2}{3}T^3+O(T^5).
$$

To verify the coefficients, substitute $r(T)=1+a_2T^2+a_4T^4+O(T^6)$ into $r''=-G/r^2$. The constant term gives $2a_2=-G$, and the quadratic term gives $12a_4=2Ga_2=-G^2$. Thus the separation begins to shrink quadratically in time, and the inward speed begins to grow linearly. These local series do not replace the parametric solution over the complete first interval.

For later times with $y(T)>0$ and a partner root emitted before contact, the delayed displacement from the negative transmitter to the positive receiver is $y(T)+y(S)>0$. The causal equation is

$$
S+y(S)=T-y(T).
$$

The transmitter moves with velocity $-y'(S)$, so

$$
D_t=1+y'(S),
\qquad
D_r=1-y'(T),
\qquad
\frac{dS}{dT}=\frac{1-y'(T)}{1+y'(S)}.
$$

The receiver factor controls root playback. It does not multiply the acceleration. As long as the retained trajectory remains sub-field, $D_t>0$, and the equation of motion is

$$
\boxed{y''(T)=-\frac{G}{[y(T)+y(S)]^2[1+y'(S)]}.}
$$

Its right side is strictly negative while the separation and transmitter factor are positive. Thus an initially stationary member accelerates inward throughout this chart. A positive-separation radial turn cannot occur inside this same regular symmetric sub-field chart. This conditional sign statement does not decide what happens after its assumptions fail.

## Exact first interval: only held-source emissions arrive

Before emissions from $S=0$ arrive, the transmitter position is fixed at $-a$. Define $r(T)=y(T)+a$, the distance to that held source. The causal time and acceleration reduce to

$$
S=T-r(T),\qquad
r''(T)=-\frac{G}{r(T)^2},\qquad
r(0)=1,\quad r'(0)=0.
$$

Multiplying this differential equation by $r'$ and integrating gives the mathematical first integral

$$
\frac{[r'(T)]^2}{2}=G\left[\frac{1}{r(T)}-1\right].
$$

This identity is an integration device for this scalar equation; it is not an assignment of physical kinetic or potential energy to an architrino. The inward branch has $r'\le0$. Introduce $0\le\theta<\pi/2$ by $r=\cos^2\theta$. Direct integration gives

$$
T(\theta)=\frac{\theta+\sin\theta\cos\theta}{\sqrt{2G}},
\qquad
y(\theta)=\cos^2\theta-\frac12,
\qquad
y'(\theta)=-\sqrt{2G}\tan\theta.
$$

The first arriving release emission occurs at $S=0$, hence $T_1=r(T_1)$. Its unique parameter solves

$$
\theta_1+\sin\theta_1\cos\theta_1
=\sqrt{2G}\cos^2\theta_1.
$$

The left side increases and the right side decreases for $0<\theta<\pi/2$, so there is exactly one solution. At that event $y(T_1)=T_1-1/2$. For the declared coupling, $G<1/2$ and the root occurs below $\theta=\pi/4$: evaluating $T-r$ at $\theta=\pi/4$ gives a positive value, whereas its value at zero is negative. Therefore $y>0$ and $|y'|<\sqrt{2G}<1$ throughout the first interval. Neither contact nor field-speed onset precedes the first release arrival.

For a path whose speed is strictly below one over the complete interval from $S$ to $T$,

$$
|X(T)-X(S)|\le\int_S^T|X'(u)|\,du<T-S.
$$

This excludes positive-delay self roots throughout that interval, independently of the numerical root finder. The earliest partner emission at release is $S=-1$; it lies inside the fixture's retained history beginning at $-20$.

## Independent continuation by known history

Let $H(S)=S+y(S)$. On the sub-field chart $H'(S)=1+y'(S)>0$, so the partner root is the unique inverse $S=H^{-1}(T-y(T))$. The complete first interval above therefore provides an independent source history after $T_1$. Until the relevant emission time reaches $T_1$, evaluating the delayed acceleration requires only this exact parametric history. The receiver evolution is an ordinary two-state differential equation with an analytically specified delayed source, rather than a recurrence through the EOM solver's retained cubic segments.

For further reference continuation, suppose an independently computed history is available through $L$ and remains positive and sub-field. Since $y(T)\ge0$ before contact, any receiver time $T\le L+y(L)=H(L)$ has $T-y(T)\le H(L)$. Its partner root therefore lies in the already available history. Integrating only through this known-history horizon gives an explicit method of steps. Every source query must stay within the completed history; extrapolating a prior interpolant is forbidden.

The next physical feedback event is the first solution of $S(T)=T_1$, equivalently $T-y(T)=T_1+y(T_1)$. That event is distinct from an artificial numerical segment boundary. A reference run also stops at contact or the first individual speed reaching one. Field speed is a scope boundary of this reference, not a universal speed ceiling or a singularity by itself. The root and acceleration factors must be examined separately.

On any one of these intervals, assume the completed source history is continuously differentiable, its velocity is locally Lipschitz, $1+y'(S)$ has a positive lower bound, and the partner distance has a positive lower bound. The inverse $H^{-1}$ is then locally Lipschitz. The acceleration above is locally Lipschitz in the current position, so the ordinary initial-value problem has a unique local continuation. Repeating such intervals gives a constructive uniqueness argument within the declared chart. It does not extend across vanishing delay, contact, loss of the transmitter-factor bound, or a change in the complete self-root inventory.

## Independent validation and limits

The independent instrument is kept in ignored local evidence storage. Its known controls must pass before it evaluates the stationary target: an affine history with an exactly invertible causal-time map, and integration of the held-source scalar equation against the parametric solution above. Its target implementation may use general-purpose scalar root finding and ordinary differential-equation integration, but it may not import the EOM solver's roots, acceleration, integration, histories or evidence classifier.

A comparison using this instrument is measured independent numerical agreement, not an outward interval proof. Refinement of its tolerances and maximum step estimates numerical stability; it does not establish a rigorous global error bound. Production trajectory points should be checked against the reference values and their observed refinement spread, with production enclosures and input-history uncertainty retained. A disagreement larger than these numerical scales is a live discrepancy to diagnose, not a reason to widen acceptance bounds.

The analytical identities are falsified by a direct substitution that fails their stated differential or causal equation. The independent comparison is falsified by unstable reference refinement, a source query beyond completed history, loss of the simple-root or sub-field assumptions, or production output failing to contain independently computed values where its stated enclosure is claimed to do so. The following section records the completed known-case controls and bounded target evaluations.

## Numerical reference results — 2026-09-14

The separately authored `stationary-binary-independent-reference.py` uses only general-purpose SciPy root finding and DOP853 integration, mpmath evaluation of the first-interval formula, and its own completed-history storage. It imports no production EOM component. The instrument and receipts are retained under `.local-data/braid-program/2-braid-2026-09-14/`. Before target evaluation, its `--known` mode returned the exact affine inverse $4/9$, agreed with the held-source parametric solution at 21 points to a maximum absolute discrepancy of `1.1102230246251565e-16`, and passed positive and negative interval-containment controls. These checks establish the stated control behavior, not a general error theorem.

Using the exact decimal coupling and charge tokens above, the high-precision first-interval calculation gives

$$
G=0.286228610305338527777777777777777892\ldots,
$$

$$
T_1=0.883694026178491895\ldots,
\quad y(T_1)=0.383694026178491895\ldots,
\quad y'(T_1)=-0.274486867030422266\ldots.
$$

These values are measured evaluations of the derived formulas. The exact mathematical definition remains the unique root equation for $\theta_1$ above, not its decimal approximation. At this event the partner emission advances from the held past into the first generated trajectory. The acceleration is continuous because source position and velocity are continuous across release; subsequent acceleration derivatives can change when the newly generated source acceleration first enters the root response.

The independent reference was evaluated with three pairs of relative tolerance and maximum step: `(1e-10, 0.02)`, `(1e-12, 0.01)`, and `(2e-13, 0.005)`, with absolute tolerance one-hundredth of the relative tolerance. These are reference-integration settings; they change no EOM acceptance threshold. At $T=1.4$, the finest reference gives

| Quantity | Independent reference |
| --- | ---: |
| Positive member position $y$ | `0.17786329539883375` |
| Positive member velocity $y'$ | `-0.5796053503973103` |
| Partner emission time $S$ | `0.8222640266856925` |
| Transmitter factor $D_t$ | `0.7476186341174966` |
| Receiver factor $D_r$ | `1.5796053503973102` |
| Positive member acceleration $y''$ | `-1.1470282235149243` |

The three-reference spread is `9.71445146547012e-16` in position and `2.7755575615628914e-15` in velocity at this endpoint. Here $S<T_1$, so the relevant transmitter data still come entirely from the exact first-interval formula. The small spread is numerical refinement evidence, not a certified enclosure radius. The process reported `0.03250058297999203` seconds internally, and every recorded source query stayed within completed history.

A separately requested bounded reference extension stopped at the first field-speed event rather than at its requested upper time `1.7`. It predicts the following order:

| Event | Time | Positive member position | Positive member velocity |
| --- | ---: | ---: | ---: |
| Arrival of emissions from $S=T_1$ | `1.428341244444872` | `0.16095319208788816` | `-0.6145780611054112` |
| Individual speed reaches $c_f=1$ | `1.5726396643813725` | `0.051506703140738186` | `-0.9999999999999994` |

The last displayed velocity differs from $-1$ by floating-point rounding in event location. Across the three reference refinements, the field-speed event times lie between `1.5726396643789333` and `1.5726396644726117`. The positive separation at the finest event is twice the displayed position, approximately `0.1030134062814764`; contact has not occurred. The extension reported `0.11132441693916917` seconds internally and no source query beyond completed history.

**Measured-reference boundary.** These event locations guide a certified EOM continuation; they are not certified production events. The reference stops at first speed equality and does not admit subsequent super-field motion. The first equality does not itself produce a positive-delay self root: for every strictly earlier emission interval the prior sub-field speed gives a strict integrated distance inequality. The existing mirror-boundary theorem supplies the post-threshold root argument and unchanged-law obstruction summarized below. The finite positive separation and source-side factor must still be confirmed in any production event record.

## Incoming speed-boundary bounds and complete causal census

The first speed event can be enclosed from the exact stationary history without integrating through the singular self-root birth. Two distinct arguments matter. Global incoming inequalities provide broad bounds without any computed trajectory. A separately authored interval method then encloses the whole incoming solution and gives a much narrower event interval. A tight estimate made from production endpoint boxes alone remains conditional on those boxes containing one common exact solution; agreement with a converged numerical reference does not discharge that premise.

### Global incoming margins and an unconditional broad bracket

**Derived on the stationary mirror chart.** Put $u=-y'\ge0$, $u_s=u(S)$, $R=T-S=y(T)+y(S)$ and $d=1-u_s$. Before first speed equality, the complete one-partner, zero-self chart gives

$$
A=u'=\frac{G}{R^2d},\qquad
R'=-\frac{u+u_s}{d},\qquad
\frac{du}{dR}=-\frac{G}{R^2(u+u_s)}.
$$

Here $0\le u_s\le u<1$ and $R\le1$, since both positions decrease from $1/2$. Hence $u'\ge G$. For $T>0$, multiplication of the last identity by $2u$ gives

$$
\frac{d(u^2)}{dR}
=-\frac{2Gu}{R^2(u+u_s)}
\le-\frac{G}{R^2}.
$$

Integrating toward decreasing $R$ from the release limit $(R,u)=(1,0)$ reverses the integration inequality:

$$
u^2\ge G\left(\frac1R-1\right),
\qquad
R\ge\frac{G}{G+u^2}\ge\frac{G}{1+G}.
$$

These bounds also explain why the incoming solution cannot terminate at an earlier regularity loss while $u$ stays below one. If $u\le1-\sigma$ for some fixed $\sigma>0$, then $d\ge\sigma$, $R\ge G/(1+G)$ and

$$
2y(T)=\int_S^T[1-u(\tau)]\,d\tau\ge\sigma R.
$$

The partner root moves forward from $S=-1$, so the retained boundary at $-20$ remains clear. Strict sub-field speed excludes self roots, the partner root stays unique, and the positive distance and derivative margins permit the local delayed continuation already established above. Since $u'\ge G$, the speed cannot remain below one for arbitrarily long time. This is an incoming existence argument from the prescribed history, consistent with the [stationary mirror first-boundary theorem](../../master-equation-closure/analysis/mirror-close-approach-causal-root-boundary.md#stationary-mirror-first-boundary); sampled production histories are not a premise.

The exact first interval shows that the release-emission arrival $S=0$ occurs while $u<1$. Therefore the first speed event has $S_\ast>0$. On its complete positive-time delay interval, $u'\ge G$ gives

$$
1-u(\tau)\ge G(T_\ast-\tau),
\qquad S_\ast\le\tau\le T_\ast.
$$

Consequently

$$
R_\ast\ge\frac{G}{1+G},\qquad
y_\ast\ge\frac{G R_\ast^2}{4}
\ge\frac{G^3}{4(1+G)^2},\qquad
D_{t,\ast}^{\mathrm{partner}}\ge G R_\ast
\ge\frac{G^2}{1+G}.
$$

In particular the limiting partner distance, present separation and partner-root derivative remain positive. Also $y(T)\le1/2-GT^2/2$, so $y_\ast>0$ implies $T_\ast<1/\sqrt G$.

A rational lower time bound follows directly from the held-source equation. Bootstrap $r\ge4/5$ on $0\le T\le4/5$. Then $u'=G/r^2\le25G/16$, so $r\ge1-G/2>4/5$ and $u\le5G/4<1$ for the present $G<2/5$. These strict improvements exclude either departure from the bootstrap or arrival of $S=0$ before $4/5$. Thus $T_\ast>4/5$.

Exact rational evaluation for the current coupling and charge tokens, followed by outward decimal rounding, gives the broad bounds

$$
0.8<T_\ast<1.87,\qquad
0.003543584582049\le y_\ast\le0.408406844702292,
$$

$$
R_\ast\ge0.222533232437887,\qquad
D_{t,\ast}^{\mathrm{partner}}\ge0.063695377867451.
$$

The upper position bound uses $T_\ast>0.8$ in $y(T)\le1/2-GT^2/2$. These bounds depend on the exact stationary release and incoming equations, not the decimal event estimate or production step-size comparisons.

### A local event enclosure from trusted incoming boxes

Suppose at a known incoming time $t_0$ one common exact solution obeys $y(t_0)\in[L,U]$ and $u(t_0)\in[a,b]$, with $0\le a\le b<1$. Choose $h>0$ with $L-h>0$. Until first speed equality, monotonicity gives

$$
y(T)\in[L-h,U],\qquad
T-y(T)\in[t_0-U,t_0+2h-L],
\qquad t_0\le T\le t_0+h.
$$

Let $H(s)=s+y(s)$. If two completed source times $s_L<s_R<t_0$ have certified bounds satisfying

$$
H(s_L)_{\mathrm{upper}}<t_0-U,\qquad
t_0+2h-L<H(s_R)_{\mathrm{lower}},
$$

then every relevant partner emission remains in $[s_L,s_R]$. Decreasing $y$ and increasing $u$ turn source endpoint bounds into uniform source bounds on that whole interval. Together with the receiver box, they bound $R$, $d$ and hence $A\in[A_{\min},A_{\max}]$, with $A_{\min}>0$.

Define

$$
\delta_{\min}=\frac{1-b}{A_{\max}},\qquad
\delta_{\max}=\frac{1-a}{A_{\min}}.
$$

If $\delta_{\max}<h$, integration of the acceleration bounds and the compact regular margins prove

$$
T_\ast\in[t_0+\delta_{\min},t_0+\delta_{\max}],
\qquad
y_\ast\in[L-\delta_{\max},\,U-a\delta_{\min}].
$$

The upper time bound is an existence statement: an incoming solution staying below speed one until that time would contradict $u(T)\ge a+A_{\min}(T-t_0)$. No super-field endpoint is consumed. Position bounds may be tightened by using

$$
D_{\min}=a\delta_{\min}+\frac12A_{\min}\delta_{\min}^2,\qquad
D_{\max}=\min\left\{\delta_{\max},\,b\delta_{\max}+\frac12A_{\max}\delta_{\max}^2\right\},
$$

and $y_\ast\in[L-D_{\max},U-D_{\min}]$.

**Conditional production-box calculation.** Applied with $h=1/5000$ to the last repaired production endpoint and two earlier source frames, the exact rational packet (local artifact: `.local-data/braid-program/2-braid-2026-09-14/incoming-event-rational-bound.json`) gives

$$
T_\ast\in[1.572632783297250,\;1.572643602856084],
\qquad
y_\ast\in[0.051501046908095,\;0.051514626172863].
$$

The arithmetic is an outward implication of its stated common-solution enclosure premise. Production full-step versus half-step endpoint differences, and the preceding independent sampled comparisons, do not by themselves prove continuous solution containment from release. This particular calculation therefore remains conditional. Its constant-acceleration and outward-rounding controls preceded the target evaluation; the exact binary64 endpoint fractions and exact coupling product are retained in the packet.

### Continuous interval construction from the exact stationary history

**Derived enclosure method, implemented by an independent instrument.** The [stationary mirror incoming interval certificate](../../../../scripts/eom/stationary-mirror-incoming-interval-certificate.py) starts with the exact history $y=1/2$, $u=0$ on $[-20,0]$ and the right-hand initial acceleration $A(0)=G$. It imports no EOM production component or frozen numerical trajectory. Its enclosure operations round outward, and the coupling is converted from its exact rational token product into an enclosing binary64 interval.

On the incoming chart, differentiation of the delayed acceleration gives

$$
S'=\frac{1+u}{d},\qquad
d'=-A(S)\frac{1+u}{d},
$$

$$
A'=A\left[
\frac{2(u+u_s)}{Rd}
 +
\frac{A(S)(1+u)}{d^2}
\right]\ge0.
$$

For a panel $[t_n,t_n+h]$, assume that the completed history is enclosed and that its endpoint satisfies $u_n<1$. The bootstrap receiver box $y\in[y_{n,\mathrm{lower}}-h,y_{n,\mathrm{upper}}]$, $u\in[u_{n,\mathrm{lower}},1]$ is valid until a possible first speed event. Strict source-bracketing inequalities confine each inverse of $H$ to completed history. Interval Newton contractions intersect only that already containing source interval, using the positive derivative enclosure $H'=1-u_s$. A source query may not precede $-20$ or exceed completed history.

For any source interval, monotonicity bounds $y$ between the lower value at its right endpoint and the upper value at its left endpoint; it bounds $u$ and $A$ in the opposite endpoint order. Source endpoint evaluation uses the already certified panel formulas, so this also covers queries spanning several stored panels. The displayed expression for $A'$ then supplies a whole-panel interval $J_n$ containing the derivative almost everywhere. If $A_n$ encloses the acceleration at $t_n$, exact integral remainders give, for every $0\le\tau\le h$,

$$
u(t_n+\tau)\in u_n+A_n\tau+\frac12J_n\tau^2,
$$

$$
y(t_n+\tau)\in y_n-u_n\tau-\frac12A_n\tau^2-\frac16J_n\tau^3.
$$

At source release, $A(S)$ changes from zero to $G$, while $u(S)$ remains continuous. Thus the received acceleration $A(T)$ is continuous and locally Lipschitz; its derivative can jump but remains bounded almost everywhere. Including both one-sided source-acceleration values in $J_n$ preserves these integral remainder formulas. No differentiability across the release join is assumed.

If the full-panel upper velocity bound is below one, its nonnegative upper coefficients also bound every shorter elapsed time below one. Together with the positive position, source-distance and derivative bounds, this excludes an earlier exit and closes the bootstrap. Appending the entire interval polynomial therefore extends a continuous solution enclosure by induction. A panel whose upper speed bound reaches one is not appended. The local event enclosure above is instead applied from the last certified endpoint, using a completed-source cap and verifying positive event position and positive partner delay. This encloses the first event without advancing through it.

The canonical known controls pass before target use: exact rational operations, a constant-acceleration event time, stationary and moving-source inverses, a source interval crossing release, and the held-source solution derived earlier in this document. With dyadic panel size $2^{-12}$, the final recorded run certifies 6,441 panels from release through $t_n=1.572509765625$ and then encloses the terminal event. The numerical interval witness is recorded in the canonical result (local artifact: `.local-data/braid-program/2-braid-2026-09-14/incoming-interval-canonical-power12.json`), with its matching known-case receipt (local artifact: `.local-data/braid-program/2-braid-2026-09-14/incoming-interval-canonical-known.json`).

The following displayed decimal endpoints have been widened outward from the emitted binary64 intervals:

| Event quantity | Continuous interval bound |
| --- | --- |
| First speed-equality time $T_\ast$ | $[1.572637654589540,\;1.572640138062056]$ |
| Positive member position $y_\ast$ | $[0.051505978182147,\;0.051508831342540]$ |
| Present separation $2y_\ast$ | $[0.103011956364294,\;0.103017662685080]$ |
| Partner emission $S_\ast$ | $[1.280881308632144,\;1.282779344830728]$ |
| Delayed distance $R_\ast$ | $[0.290230751640356,\;0.291627465589404]$ |
| Partner transmitter factor $D_{t,\ast}$ | $[0.527011778575762,\;0.528403749315797]$ |

The event-time enclosure comes from the interval induction and local acceleration inequalities. Its validity is not inferred from agreement among decimal oracle refinements. The negative member has the mirror position interval, and the onset velocities are exactly $(X_+'(T_\ast),X_-'(T_\ast))=(-1,+1)$ in positive-label, negative-label order by the event definition.

**Independent measured check.** The separately authored trace comparison (local artifact: `.local-data/braid-program/2-braid-2026-09-14/check-incoming-interval-trace.json`) finds that all 12,884 position and inward-speed values from the frozen numerical reference lie inside the 6,442 emitted endpoint boxes. That comparison checks the numerical witness; the whole-panel induction above supplies the continuous enclosure argument. Exact rational comparison also verifies that all six displayed decimal intervals contain their emitted binary64 endpoints. No comparison widens an interval or changes the reference.

### Exact causal census at onset and acceptance scope

On the complete incoming history, $H(s)=s+y(s)$ is strictly increasing for $s<T_\ast$. The event's positive half-separation gives $H(T_\ast)>T_\ast-y_\ast$, while the enclosed earlier emission lies in the retained domain. Thus each ordered partner bundle has exactly one root, and the positive partner-factor bound makes it simple.

For either self bundle and any $s<T_\ast$, the prior speed is strictly below one throughout a nonzero interval. Therefore

$$
|X_i(T_\ast)-X_i(s)|
\le\int_s^{T_\ast}|X_i'(\tau)|\,d\tau
<T_\ast-s.
$$

There are no positive-delay self roots at the event. The same-time diagonal remains excluded by the binding. The complete four-bundle census at onset is consequently one simple partner root in each direction and zero positive-delay roots in each self bundle; $D_r^{\mathrm{partner}}=2$ exactly. These are theorem-level root counts for the incoming solution, not counts inferred from a finite sample of emission times.

The interval witness certifies this incoming event on the declared stationary mirror record. It does not change the EOM solver's accepted frontier, publish its rejected candidate, certify a post-onset self-root transition, or select an outgoing history. An arithmetic enclosure failure, a missing source interval, an invalid derivative bound, or violation of the stated incoming hypotheses would overturn the corresponding certificate. The subsequent unchanged-law obstruction remains the one described below.

## Existing sharp-law obstruction at this boundary

**Derived result already established for this stationary mirror record.** The [mirror close-approach causal-root boundary owner](../../master-equation-closure/analysis/mirror-close-approach-causal-root-boundary.md#unchanged-sharp-law-post-threshold-obstruction) proves that its first regular-chart boundary is inward speed $u(T_\ast)=1$ at positive half-separation. Its position notation $q(T)$ is the $y(T)$ used here, and $u=-y'$. At that instant the partner root remains at positive delay with $D_t^{\mathrm{partner}}>0$ and $D_r^{\mathrm{partner}}=2$. No positive-delay self root yet exists, and the excluded diagonal $T_s=T_r$ acquires no acceleration value. Thus the numerical reference's speed stopping rule agrees with this record's derived regular boundary; speed equality alone is not a universal singularity criterion for other histories.

To state the obstruction, prescribe a continuous regular extension that enters $u>1$ immediately after $T_\ast$, preserves the monotone incoming history and positive separation, and retains the simple partner-root tube. These are hypotheses for testing a possible extension, not a trajectory selected by the law. With inward coordinate $x$ and $h(T)=x(T)-T$, the function $h$ decreases strictly before the boundary and increases on the prescribed super-field side. Each label therefore acquires one positive-delay self root satisfying

$$
h(T_s)=h(T_r),\qquad
\int_{T_s}^{T_r}(u(T)-1)\,dT=0,\qquad
T_s<T_\ast<T_r.
$$

Write

$$
\rho=T_r-T_s,\qquad
w_-=1-u(T_s)>0,\qquad
w_+=u(T_r)-1>0.
$$

The newborn self contribution has fixed inward sign. With $K_s=\kappa|q_i|^2>0$ and $c_f=1$, the existing theorem gives its exact reception-time measure:

$$
\frac{dT_s}{dT_r}=-\frac{w_+}{w_-},
\qquad
A_s\,dT_r=
\frac{K_s}{\rho^2(w_-+w_+)}\,d\rho.
$$

At birth, $\rho\to0$ and $w_-+w_+\to0$. In particular the latter sum is bounded above near birth by some finite positive $M$, so the integrated inward contribution is bounded below by $(K_s/M)\int_0^\varepsilon\rho^{-2}\,d\rho=\infty$. The self measure is not locally finite. Its fixed sign prevents cancellation on either receiver, and the partner contribution remains locally bounded. Opposite coordinate directions for the two mirror receivers do not cancel either receiver's local acceleration update.

Consequently the unchanged complete sharp-root sum supplies no regular Carathéodory continuation, meaning one whose velocity change comes from a locally integrable acceleration, and no locally finite measure continuation for this branch. It supplies no regular passage or rebound through the event. The [binding singular-event contract](../../app-solver/contracts/master-eom-binding-v1.md#singular-event-contract) accordingly leaves coincident same-transmitter birth uncertified and forbids publication of the candidate segment; the finite-impulse route for an ordinary positive-separation fold does not resolve this diagonal birth. The obstruction is an existing derived result, while the decimal event coordinates above remain measured reference evaluations. Neither the argument nor the present numerical record selects a replacement transition, an outgoing history, or a binding outcome.

## Boundary result and modified-law scope

The result for this stationary initial-value problem is the certified inward motion through first wake-speed equality at positive separation, together with the obstruction to regular continuation under the unchanged sharp-root acceleration sum. At the boundary the positive label remains on the positive axis and moves inward, while the negative label remains on the negative axis and moves inward. Neither has passed or turned around. Failure of regular continuation assigns no later position or velocity and does not establish that the charges physically stop at the boundary. The result is confined to the stated stationary mirror history and solution class; it imposes no universal speed ceiling or general encounter outcome.

The separately proposed [quintic lineage candidate](../../master-equation-closure/analysis/diagonal-birth-lineage-causal-wake-candidate.md) multiplies active newborn self contributions by a factor strictly below one over an open interval of positive-delay causal hits. That changes the acceleration prescribed by the Master Equation throughout that interval. The [independently reviewed short continuation](../../master-equation-closure/analysis/quintic-mirror-boundary-independent-adjudication.md) is derived conditional on this guessed modification. Its local existence and uniqueness result does not establish a continuation of the unchanged equation. Likewise, convergence of an approximation to the weighted candidate would establish a property of that candidate; the [regulator assessment](../../master-equation-closure/analysis/quintic-mirror-regulator-assessment.md) identifies the different acceleration at the same positive-delay root explicitly. These conditional results remain valid at their recorded scopes without supplying passage, rebound or binding under the unchanged law.

Claim grade: **derived scope distinction**, by the different positive-delay acceleration weights and the hypotheses of the cited theorems. Equality of the two operators on the active newborn branch would overturn the distinction; a counterexample satisfying the unchanged-law obstruction's complete history and solution-class hypotheses would overturn that obstruction. A finite solution of the weighted candidate satisfies neither falsifier merely by existing.

**Operator disposition, 2026-09-15:** retain this unchanged-equation boundary result and set aside the quintic continuation route, including the proposed smoothing work, for the stationary-binary investigation. The existing candidate and independent reviews remain preserved in their own workstream. Exploring a modified law requires a separate explicit operator decision. This disposition changes the investigation's scope, not the mathematical validity of the conditional candidate theorem or the broader BP-001/BP-003 campaign status.

## Mathematical techniques that preserve the equation

The stationary binary presents a divergent accumulated acceleration, rather than a finite acceleration that is merely difficult to evaluate. A mathematical reformulation preserves this initial-value problem only if it keeps absolute time, the prescribed history, every admitted causal root and its original acceleration contribution. A continuation must also specify the regularity of position and velocity and show that the complete equation holds in that class. The following assessment distinguishes useful methods from a demonstrated outgoing solution.

### Auxiliary time and source-delay integration

An auxiliary parameter can change how a trajectory is calculated while retaining its physical absolute time. Write $T=\phi(\sigma)$, where $\phi$ is an increasing $C^1$ diffeomorphism away from the event, and carry $T$ as a state variable. Thus ordinary change of variables is valid on every compact interval excluding the event; a singular merely monotone map is not covered. The causal condition must remain

$$
\left\|\mathbf X_i(\phi(\sigma_r))-\mathbf X_j(\phi(\sigma_s))\right\|
=\phi(\sigma_r)-\phi(\sigma_s),
\qquad c_f=1.
$$

Here $\sigma_r$ and $\sigma_s$ label reception and emission; the right side is their absolute-time difference. This is the admissible passive use of a time transformation. Sundman transformations supply a general mathematical example of changing a differential equation's parameter; their mechanics examples are comparisons, not premises for the architrino equation. See Cariñena, Martínez and Muñoz-Lecanda, [*Infinitesimal Time Reparametrisation and Its Applications*, Section 2](https://link.springer.com/article/10.1007/s44198-022-00037-w), and the [absolute-time root invariance proof](../../master-equation-closure/analysis/coincide-or-not.md#reparameterization-invariance).

For a nonnegative acceleration component, an honest change of variables preserves its improper integral:

$$
\int A(T)\,dT
=\int A(\phi(\sigma))\phi'(\sigma)\,d\sigma.
$$

The equality holds first on compact intervals away from the singularity and then by monotone limits. Slowing the auxiliary clock can move the event to an infinite parameter value or make a transformed coordinate bounded. It cannot make the divergent physical velocity increment finite. Parameterizing by the newborn delay is particularly informative here: the exact formula $A_s\,dT_r=K_s\,d\rho/[\rho^2(w_-+w_+)]$ already establishes divergence in that parameter. Thus source-delay integration and time transformations are compatible analysis methods, but neither supplies a finite-velocity extension of this stationary branch.

Claim grade: `derived`. Falsifier: a parameterization in the stated substitution class preserving the displayed absolute-time roots and the same positive acceleration measure whose transformed improper integral is finite while the original is infinite.

### Integral and distributional formulations

A weak formulation describes acceleration through its action on smooth test functions and may accommodate a finite impulse, meaning a finite jump in velocity. It cannot automatically accommodate an infinite positive contribution. A positive distribution is a locally finite measure: see Patrick Gérard, [*Lecture Notes on Distributions*, Proposition 1.9.11 and Remark 1.9.12, page 46](https://www.imo.universite-paris-saclay.fr/~patrick.gerard/Distributions2019_Chap1,2,3.pdf). This is a mathematical theorem, not an imported physical law.

For this branch the incompatibility can also be seen directly. Choose a nonnegative smooth function $\chi$ equal to one near the event, and functions $0\le\psi_n\le\chi$ supported away from the event that exhaust its outgoing neighborhood. If a positive distribution $\mathcal A_s$ agreed with the self acceleration there, positivity would imply

$$
\mathcal A_s(\chi)\ge\mathcal A_s(\psi_n)
=\int A_s(T)\psi_n(T)\,dT\longrightarrow\infty.
$$

A distribution has a finite value on each fixed test function, so such an extension cannot exist. The bounded partner contribution cannot remove this contradiction. A principal value has no opposite-sign singular contribution to cancel on this branch. A finite-part prescription would instead subtract divergent terms before taking a limit; it therefore requires additional extension semantics and does not preserve the original positive acceleration measure merely by agreeing away from the endpoint. A chosen finite velocity jump would likewise require a finite event measure that this branch does not supply.

Claim grade: `derived` for the stationary branch's positive self measure and bounded remainder. Falsifier: a positive distribution agreeing with the stated self acceleration on the punctured outgoing neighborhood and finite on $\chi$. No exclusion of every conceivable generalized nonlinear solution follows from this positivity argument.

### Curvature and a general bounded-acceleration obstruction

Curving the trajectory does not by itself prevent a first self-root birth. Set the candidate crossing time to zero, write $\mathbf V=\mathbf X'$ and $v=\|\mathbf V\|$, and suppose $\mathbf V$ is continuous, $v<1$ immediately before zero and $v>1$ immediately afterward. For an earlier emission time $s<0$, define the self-root residual

$$
F(T,s)=\left\|\int_s^T\mathbf V(u)\,du\right\|-(T-s).
$$

At $T=0$, strict subfield speed gives $F(0,s)<0$. This sign persists for sufficiently small positive $T$. At the same reception, $F(T,T-\delta)/\delta\to v(T)-1>0$ as $\delta\downarrow0$. Continuity in emission time therefore gives a positive-delay root between these two signs. Choosing $s$ arbitrarily close to zero produces roots with delays tending to zero. This is a geometric existence argument for a candidate path; it does not assert root simplicity or that the path solves the EOM.

There is a direct acceleration bound at any simple short self root. Assume $\mathbf X$ is $C^{1,1}$ near the event, meaning that its velocity is Lipschitz continuous, with $\|\mathbf V(T)-\mathbf V(s)\|\le L|T-s|$ for some $L>0$. Acceleration then exists almost everywhere and is bounded by $L$. At a root of delay $\delta=T-s$, the unit chord direction equals the mean velocity:

$$
\mathbf n=\frac{1}{\delta}\int_s^T\mathbf V(u)\,du,
\qquad \|\mathbf n\|=1.
$$

The transmitter factor is $D_t=1-\mathbf n\cdot\mathbf V(s)$. Consequently,

$$
|D_t|
=\left|\mathbf n\cdot\frac{1}{\delta}\int_s^T[\mathbf V(u)-\mathbf V(s)]\,du\right|
\le\frac{L\delta}{2},
\qquad
\|\mathbf A_s\|=\frac{K_i}{\delta^2|D_t|}
\ge\frac{2K_i}{L\delta^3},
$$

where $K_i=\kappa q_i^2>0$ is the self coupling. Endpoint continuity puts every sufficiently short self chord in a fixed forward cone: with $\mathbf e=\mathbf V(0)$, which is a unit vector, there is $b>0$ such that $\mathbf e\cdot\mathbf n\ge b$. Separate all these short self contributions from the complete remaining acceleration $\mathbf R$. If $\|\mathbf R\|\le R_0$, the full equation at a regular reception gives

$$
L+R_0\ge\frac{2bK_i}{L\delta^3}.
$$

This inequality imposes a positive lower bound on the delay, contradicting the roots approaching zero. For an almost-everywhere equation, the reception times must be chosen within its full-measure validity set in the open superfield interval. The argument assumes those receptions belong to the simple-root domain, with the complete short-root sum defined; the sign argument alone supplies no such simplicity theorem. Non-simple roots require their own event analysis and supply no automatic continuation.

For a $C^2$ crossing with positive speed derivative $a_\parallel=\mathbf V(0)\cdot\mathbf X''(0)>0$, the familiar local expansion makes the divergence explicit:

$$
\delta=2T+o(T),\qquad
D_t=a_\parallel T+o(T),\qquad
\mathbf A_s\sim\frac{K_i}{4a_\parallel T^3}\mathbf e.
$$

The chord mean is $\mathbf V(0)+\mathbf X''(0)(T-\delta/2)+o(T+\delta)$, so its unit-norm condition gives the first relation; substitution in $D_t$ gives the second. Transverse acceleration changes neither leading relation. The bounded-acceleration inequality also covers flatter crossings under its declared simple-root and remainder assumptions. Related chord and variation estimates are developed in the [independent self-delay adjudication](../../master-equation-closure/analysis/mec-008-self-delay-independent-adjudication.md).

Claim grade: `derived` for the specified regularity, complete simple-root domain and bounded actual remainder; independently checked by a separate read-only reviewer. Falsifier: a trajectory satisfying these hypotheses whose complete unchanged EOM crosses from below to above unit speed, or a valid short simple self row violating the displayed transmitter-factor estimate. The result neither establishes a universal speed ceiling nor resolves nonintegrable opposing contributions or singular root accumulation.

### Remaining mathematical route: the complete signed acceleration

A possible unchanged-law crossing in a broader history must evade the obstruction through actual geometry or a justified solution class. One concrete research method is a simultaneous local expansion of all trajectories and all causal-root branches, followed by matching their signed vector acceleration contributions. For a Carathéodory continuation the resulting total acceleration must be locally integrable; a locally finite measure continuation instead requires a separately established finite event measure. Cancelling only the leading divergent coefficient is insufficient if lower-order nonintegrable terms remain. Every cancellation must come from admitted contributions with their original weights; subtracting a counterterm by choice is a different prescription.

Finite continuous velocity by itself is a broader condition: an oscillatory acceleration can have a conditionally convergent improper integral even when its absolute integral diverges. Such a velocity can have unbounded total variation, meaning that the sum of the magnitudes of its successive changes is unbounded. A proposed continuation in that class needs its own precise equation and proof of compatibility; the locally integrable and finite-measure statements do not exclude it in general. The stationary branch's fixed-sign divergence and bounded partner contribution provide no such conditional cancellation.

This is a compatibility test, not an existence result. The stationary binary fails it because its partner acceleration is bounded and its newborn self acceleration has a fixed inward sign. In broader configurations, bounded contributions cannot cancel the divergence, and finitely many isolated ordinary positive-range folds supply only integrable contributions under the [accepted complement hypotheses](../../master-equation-closure/analysis/mec-008-self-complement-independent-adjudication.md). An actual nonintegrable opposing contribution, singular accumulation, or failure of the assumed endpoint regularity would require a separate construction and proof. A prescribed superfield path or an EOM history initialized above wake speed does not demonstrate a crossing from below.

Claim grade: `inferred` research direction from the proved obstructions; existence of a successful cancellation is unresolved. In the Carathéodory or locally finite measure classes, the test succeeds only upon constructing a complete EOM history with a finite inherited velocity, all root contributions retained and an integrable total or derived finite event measure. Ruling out every such contribution within a declared broader history class would close that class without supplying an outgoing solution for the stationary binary. More general weak classes require separate compatibility criteria.

### What a successful cancellation would have to mean

The proposed investigation searches for a different configuration or history under the unchanged equation. No starting positions or histories realizing the proposed cancellation have been identified. The stationary pair cannot supply the needed opposing contribution: its partner acceleration stays bounded at the first speed boundary. Adding more particles is not sufficient by itself; their admitted wake contributions would have to have the required singular magnitude, direction and timing.

Here simultaneous refers to reception. Several contributions would become singular at the same receiver and absolute time, although their emissions could occur at different earlier times. A causal root identifies an earlier emission whose wake reaches that receiver. The cancellation must occur in each affected receiver's acceleration equation; summing opposite accelerations of different particles does not cancel either particle's velocity change.

A hypothetical algebraic example illustrates the requirement. Let $\tau=T-T_\ast>0$ be elapsed time after the event, let $\mathbf e$ be a fixed unit direction, and take $B>0$ and $a_0>0$ with $c_f=1$. Suppose the complete contributions were

$$
\mathbf A_{\mathrm{self}}(\tau)=\frac{B}{\tau^3}\mathbf e,
\qquad
\mathbf A_{\mathrm{other}}(\tau)=-\frac{B}{\tau^3}\mathbf e+a_0\mathbf e.
$$

At every $\tau>0$ both expressions are finite, and their sum is $\mathbf A_{\mathrm{total}}=a_0\mathbf e$. If this were the complete equation through a compatible endpoint with inherited velocity $\mathbf V(T_\ast)=\mathbf e$, integration would give $\mathbf V(T_\ast+\tau)=(1+a_0\tau)\mathbf e$, which exceeds unit speed for positive $\tau$. This illustrates finite cancellation before taking the event limit. It does not assign values to two infinite impulses or establish any actual EOM trajectory. The constants $B$ and $a_0$ are illustrative coefficients; in a real construction the self-root geometry would constrain them together.

The missing work is to derive both contributions from actual trajectories and causal roots. Such a construction must reproduce the required directions and coefficients, include every additional contribution, and eliminate any remaining nonintegrable terms in the declared regular or finite-measure solution class. Every participating particle must satisfy its own equation, and the crossing particle must inherit a valid subfield past. Endpoint compatibility must be established without inserting a chosen velocity jump. A finite summed acceleration alone does not establish crossing unless the resulting velocity actually moves from below to above wake speed.

Claim grade: `derived` algebra under explicitly hypothetical contributions; existence of a corresponding EOM configuration is unresolved. Falsifier for the illustration is failure of the displayed sum or its integrated velocity. The scientific compatibility claim would require the missing complete EOM construction; a prescribed cancellation profile, unmatched singular remainder or failed equation for any participating particle defeats that candidate.

### Investigation disposition

The mathematical-technique assessment preserves the decision to set aside the quintic candidate. Auxiliary time, exact integral formulations and simultaneous root/trajectory asymptotics are permissible analytical tools. No technique assessed here has established an unchanged-law crossing for the stationary binary. The proposed next investigation is to determine whether a declared finite-history configuration can supply the required opposing singular contribution, while completing the root-domain assumptions of the broader obstruction. This is an open research proposal, with no new simulation, solver modification, campaign completion or modified-law authorization implied.
