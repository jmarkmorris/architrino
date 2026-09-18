# Stationary Binary Release: Initial Acceleration and First Feedback

## Scope and model

This investigation uses unrestricted architrino velocity under the unchanged Master Equation. The field propagation speed $c_f=1$ fixes the wake geometry and units; it imposes no constraint $\|\mathbf V_i\|\le c_f$. The operator explicitly distinguished this investigation from the separate field-speed-ceiling work on 2026-09-16. No velocity clamp, constrained acceleration response or ceiling continuation rule enters this analysis. The question at speed equality is whether the original equation and retained history admit continuation into $\|\mathbf V_i\|>c_f$. A derived obstruction for a specified history and regularity class is not an imposed speed limit or a universal exclusion of superfield motion.

This analysis starts from the sharp simple-root acceleration law in the [EOM evolution contract](../../app-solver/contracts/evolution-contract-v1.md#canonical-per-root-calculation). It concerns two opposite-polarity architrinos with mirror-symmetric stationary histories, released at absolute time $T=0$. Wake speed is normalized to $c_f=1$. The statements below are derived for the exact nominal history; numerical comparisons to the EOM solver must separately retain its input-history uncertainty and integration enclosures. Neither a finite approach nor passage through an instrument boundary establishes permanent binding or a repeated breather.

Write the two positions as $X_+(T)=y(T)$ and $X_-(T)=-y(T)$ on their common axis. Initially $y(T)=a=1/2$ and $y'(T)=0$ on the retained interval $-20\le T\le0$. Let $G=\kappa|q_+q_-|>0$. The ideal shorthand $q_\pm=\pm1/6$ gives $G=\kappa/36$. The executable fixture instead consumes finite decimal charge tokens; an independent numerical comparison uses those exact tokens and the emitted coupling, not a silently substituted exact fraction. The current fixture computes the coupling as `36.0 * 0.2862286103053385`, whose binary64 value is serialized as `10.304229970992187`.

The restriction to mirror symmetry is a reduced initial-value problem, not a perturbation theorem. On the regular sub-field chart, reflection and exchange preserve the equations; uniqueness of that local delayed initial-value problem preserves the symmetry. The argument below does not claim uniqueness across coincidence, a multiple causal root, or an unsupported self-interaction event.

All positions in this prescribed retained history lie on the same fixed axis. Each defined causal chord is therefore axial, and every canonical acceleration contribution has zero transverse component. The later [opposing-interaction construction](speed-crossing-opposing-interaction-geometry.md#this-construction-uses-a-noncollinear-source-history) introduces different, off-axis source histories; its transverse terms are not a result for this collinear release.

## Kinematics and the frictionless-track analogy

The [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md#abstract-form) has the familiar second-order kinematic structure

$$
\frac{d\mathbf X_i}{dT}=\mathbf V_i,
\qquad
\frac{d\mathbf V_i}{dT}=\mathbf A_i.
$$

On an ordinary interval where acceleration is integrable, this means

$$
\mathbf V_i(T)=\mathbf V_i(T_0)+\int_{T_0}^{T}\mathbf A_i(s)ds,
\qquad
\mathbf X_i(T)=\mathbf X_i(T_0)+\int_{T_0}^{T}\mathbf V_i(s)ds.
$$

Existing velocity is retained. Acceleration specifies its change, not its replacement. Zero total vector acceleration preserves constant velocity. Acceleration opposite the velocity reduces speed while the particle initially continues in its existing direction; in one dimension, sustained opposing acceleration can bring velocity through zero and then reverse the motion. Acceleration perpendicular to velocity changes direction without instantaneously changing speed. None of these kinematic statements requires primitive architrino mass or a speed ceiling.

As an explicitly labeled ordinary-mechanics comparison, consider an ideal frictionless slider constrained to a fixed smooth track. Let $s$ be arc length and $h(s)$ its height under uniform downward gravitational acceleration of magnitude $g$. Its tangential equation is $\ddot s=-g\,dh/ds$. A slider moving uphill can therefore keep moving uphill while accelerating downhill. At a horizontal tangent the tangential acceleration vanishes, but the slider need not stop; track curvature can still give nonzero normal acceleration. This comparison illustrates position, velocity and acceleration. The track constraint and gravitational law are not premises of the architrino model.

The important difference is what determines acceleration. A fixed track specifies its tangential acceleration from the current track position. The Master Equation instead sums causal hits selected from the retained histories: each row uses the receiver's current position, the transmitter's earlier position and velocity, their polarity product, and the positive transmitter-side weight. Identical current positions and velocities with different retained histories need not give identical acceleration. At a fixed hit, current receiver velocity does not multiply the acceleration; it changes root playback and subsequent geometry. There is no general derivation here of a fixed hill-shaped potential or of the slider's ordinary mechanical-energy formula for the delayed binary. The absence of an imposed friction term does not supply that derivation.

For the original incoming pair, the summed acceleration points along each label's inward velocity, so inward speed increases. At first speed equality $v=c_f=1$, the partner acceleration remains finite and no positive-delay self hit exists. The continuation obstruction arises when a candidate path goes beyond that endpoint and acquires newborn self hits with a nonintegrable inward acceleration contribution. It does not arise from discarding existing velocity, reaching a horizontal track tangent, or enforcing a maximum permitted speed. The kinematic integration rule remains the same; the acceleration supplied by the candidate continuation is what fails the tested finite-velocity integral formulation.

Claim grade: derived kinematic interpretation of the displayed Master Equation and the previously established binary root census; the hilly track is an illustrative comparison only. A canonical update that replaces velocity with acceleration, a receiver-velocity multiplier in the fixed-hit kernel, or a finite outgoing accumulated acceleration satisfying the stated self-birth hypotheses would falsify the corresponding interpretation. This explanation introduces no new continuation or standard-physics premise.

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

## Local continuation alternatives for the original collinear history

### Fixed data and solution classes

Return to the original two labels and their complete retained history. Shift the certified speed event to $t=T-T_\ast=0$. Let $X_L<X_R$ denote their laboratory positions and define inward scalar velocities $u_L=X_L'$ and $u_R=-X_R'$. The inherited values are $u_L(0)=u_R(0)=1$, with positive separation. The entire incoming record is stationary or inward-moving, is strictly subfield before the event, and has one simple partner root per receiver. No additional particles, off-axis source histories, velocity ceiling or root reweighting enter this examination.

First test collinear extensions with finite continuous velocities at the event and velocities locally absolutely continuous on every compact outgoing interval $[\delta,t_1]$, where $\delta>0$. Absolute continuity means that velocity changes on such an interval equal the integral of its derivative. The complete canonical equation is required almost everywhere there. This class permits an unbounded acceleration near zero and does not assume absolute continuity through the event, outgoing mirror symmetry, immediate superfield motion or an outgoing Taylor expansion.

A second tested class retains continuous velocity and uses the full distributional measure equation: the derivative of velocity must equal the locally finite acceleration measure obtained from all the canonical contributions, preserving their signs. This subsection does not extend its root-map proof to arbitrary discontinuous BV velocities. Merely requiring a derivative equation almost everywhere, without an integral or full measure identity, is weaker and is treated separately below.

### The inherited partner row forces increasing inward speed

For the right receiver, its partner residual on incoming emission times is

$$
F_R(t,s)=X_R(t)-X_L(s)-(t-s),
\qquad
\partial_sF_R=1-u_L(s)>0.
$$

The corresponding left-receiver derivative is $1-u_R(s)>0$. Each event partner root lies strictly inside the inherited history, with positive range and positive transmitter factor. The implicit-function theorem preserves it in a compact emission neighborhood for each independently continued receiver. After shortening the reception interval, its inward acceleration satisfies

$$
0<m_i\le P_i(t)
=\frac{G}{r_i(t)^2D_{t,i}(t)}
\le M_i<\infty.
$$

For example, valid compact bounds $r_{\min}\le r_i\le r_{\max}$ and $0<d_{\min}\le D_{t,i}\le d_{\max}$ give $m_i=G/(r_{\max}^2d_{\max})$ and $M_i=G/(r_{\min}^2d_{\min})$. Strict monotonicity of the residual on the complete incoming record preserves uniqueness there. Positive separation excludes a partner root emitted after zero at sufficiently small reception times: its available delay is shorter than the spatial gap. These conclusions use neither outgoing mirror symmetry nor an assumed superfield branch.

Continuity of $u_i(0)=1$ keeps both inward velocities positive on a short interval. Each label's new motion therefore continues in the same spatial direction as its entire inherited history. Every positive-delay self chord points inward. Its charge product is positive, so its acceleration also points inward. Every opposite-polarity partner contribution points inward as well. The absolute transmitter factor cannot change these signs. Thus, wherever the complete ordinary-root sum is defined,

$$
\dot u_i=P_i+S_i,\qquad S_i\ge0.
$$

Integration on $[\delta,t]$ and then the finite endpoint limit give

$$
u_i(t)-u_i(\delta)\ge m_i(t-\delta),
\qquad
\boxed{u_i(t)\ge1+m_it>1\quad(t>0).}
$$

The same conclusion follows from the full measure equation $Du_i=P_i\,dt+d\mu_i^{\mathrm{self}}$ when the admitted self measure is nonnegative. Therefore continuous braking, waiting at speed one, remaining subfield until a later crossing, and downward oscillations across speed one are not alternatives in these classes. The equation would require immediate inward superfield motion. This necessary inequality does not establish that such a continuation exists.

### The forced branch contradicts finite continuous velocity

For either label let $x_i$ be its inward coordinate and put $h_i(t)=x_i(t)-t$. The inherited $h_i$ is strictly decreasing. The inequality just derived makes the outgoing $h_i$ strictly increasing. Consequently there is one incoming-born self root $s_i(t)<0$ with $h_i(s_i(t))=h_i(t)$ and no self match between two distinct outgoing times. The root stays inside the completed incoming history. It is simple at each $t>0$ because $1-u_i(s_i)>0$.

Write

$$
\rho=t-s_i(t),\qquad
w_-=1-u_i(s_i)>0,\qquad
w_+=u_i(t)-1>0,\qquad
K_i=\kappa q_i^2>0.
$$

Position is $C^1$ and the incoming inverse is regular at every $s_i<0$. The exact root identities therefore require no outgoing $C^2$ assumption:

$$
\frac{ds_i}{dt}=-\frac{w_+}{w_-},
\qquad
A_{ii}(t)\,dt
=\frac{K_i}{\rho^2(w_-+w_+)}\,d\rho.
$$

As $t\downarrow0$, $\rho\downarrow0$ and $w_-+w_+\to0$. An upper bound $w_-+w_+\le M$ already implies a lower bound $(K_i/M)\int_0^{\rho_1}\rho^{-2}\,d\rho=\infty$ for the accumulated inward acceleration. Its positive sign prevents cancellation with the partner row. On $[\delta,t_1]$ the integral equation would equate this growing integral to $u_i(t_1)-u_i(\delta)$, which has a finite limit as $\delta\downarrow0$. That is a contradiction.

**Derived conclusion:** the original retained binary history has no collinear continuation with finite continuous endpoint velocities in the local integral class just specified, nor in a locally finite nonnegative canonical acceleration-measure class. Outgoing mirror symmetry and monotonicity are not additional assumptions. Their relevant local sign consequences follow from continuity and the equation. The result strengthens the branch-specific obstruction without imposing any universal architrino speed limit.

An exactly straight segment at speed one is also not a root-free waiting period. Every earlier point on that segment lies on a causal self chord and has $D_t=0$. It creates a nonisolated self-root set, whose acceleration is not defined by the simple-root sum. Deleting those roots would still leave the nonzero partner acceleration and would not justify coasting.

Claim grade: derived and independently checked by two separate analytical reviews. Falsifier: a collinear path with the declared inherited record and full integral or nonnegative measure equation that violates the inward lower bound, an additional outward admitted local contribution, or a finite accumulated self contribution satisfying the displayed exact delay identity. A merely almost-everywhere derivative identity without the required integral relation is not an in-class counterexample.

### Finite velocity jumps do not bypass the outgoing equation

Now relax velocity continuity while retaining continuous position. For one label, the inherited inward motion has

$$
x(s)=x_0+s+\frac a2s^2+o(s^2),
\qquad
u(s)=1+as+o(|s|),
\qquad s<0,\quad a>0.
$$

Here $a$ is the finite positive incoming partner acceleration at the event. Suppose an outgoing path has a finite velocity right limit $u(t)\to U$, so $x(t)=x_0+Ut+o(t)$. The velocity limit, not just the position expansion, is part of the hypothesis. The persistent partner row remains bounded because its emissions lie in the unchanged incoming record.

For a jump to a strictly greater inward speed $U>1$, the incoming self root solves $x(t)-t=x(s)-s$. Hence

$$
s(t)\sim-\sqrt{\frac{2(U-1)}a}\,\sqrt t,\qquad
\rho\sim\sqrt{\frac{2(U-1)}a}\,\sqrt t,\qquad
D_t\sim\sqrt{2a(U-1)}\,\sqrt t.
$$

The canonical inward self contribution is therefore

$$
\boxed{
A_{\mathrm{self}}(t)
\sim\frac{K_i\sqrt a}{[2(U-1)]^{3/2}}\,t^{-3/2}.
}
$$

It still has an infinite time integral. A finite jump at zero cannot cancel a divergence on every outgoing interval $(0,t_1]$. As an elementary local analytical control, prescribe $x(s)=x_0+s+as^2/2$ on a sufficiently small negative-time neighborhood and $x(t)=x_0+Ut$ on a sufficiently small positive-time neighborhood. Their exact local root is $s=-\sqrt{2(U-1)t/a}$, which reproduces the displayed coefficient directly. This control is not a replacement for the original complete retained history.

For a jump to strictly superfield outward velocity $U<-1$, the chord direction reverses. The incoming root instead solves $x(t)+t=x(s)+s$, giving

$$
s(t)\sim\frac{U+1}{2}t,\qquad
\rho\sim\frac{1-U}{2}t,\qquad D_t=1+u(s)\to2,
$$

$$
\boxed{
A_{\mathrm{self}}(t)\sim-\frac{2K_i}{(1-U)^2}\,t^{-2}.
}
$$

This is a divergent outward contribution. The bounded inward partner row cannot cancel it. In either strict-superfield case, the outgoing speed stays on its corresponding side of one in magnitude near the event; therefore distinct outgoing points supply no further self roots. The inherited strict-subfield chord deficit excludes older roots away from the displayed incoming match.

For either strict case, an independent exact check uses chord sign $n=\operatorname{sgn}U$, $w_-=1-nu(s)>0$ and $w_+=nu(t)-1>0$:

$$
|A_{\mathrm{self}}|\,dt
=\frac{K_i}{\rho^2(w_-+w_+)}\,d\rho.
$$

Now $w_-+w_+$ tends to a positive finite constant while $\rho\to0$, again giving an infinite integral. No finite atom supported at zero repairs an equation that already fails on $[\delta,t_1]$ as $\delta\downarrow0$.

A strictly subfield restart $-1<U<1$ has a different issue. All nearby incoming and outgoing speeds have magnitude below one except at the isolated inherited endpoint, so the cross-event chord is shorter than its elapsed time and no newborn self root exists. The ordinary partner contribution stays bounded. But the velocity drop $\Delta u=U-1<0$ requires an event acceleration atom $(U-1)\delta_0$. Neither the bounded ordinary rows nor the excluded diagonal supplies that atom. Such a restart remains an unspecified event prescription unless the missing impulse is independently derived.

First-order data with $U=\pm1$ do not determine the outgoing self-root topology by themselves. The continuous $U=1$ case in the tested integral classes is already excluded above. The exact reversed trace $U=-1$ is treated next using its full local root geometry and integral equation. An exactly constant unit-speed outgoing segment has a continuum of self roots and cannot be evaluated as a finite simple-root sum.

Claim grade: derived conditional jump asymptotics, independently rederived from the incoming root equations and checked against the exact delay measure. The strict-superfield exclusion assumes a finite velocity trace and the unchanged integral equation on every compact outgoing interval. Falsifier: a complete in-class strict-superfield jump with finite outgoing accumulated acceleration, a missing cancelling admitted root, or failure of a displayed root coefficient. The calculation does not select a jump or prove that an arbitrary event prescription preserves the original equation.

### Exact reversal: outgoing roots and the missing event impulse

Consider a continuous position with the original incoming trace $u(0^-)=1$ and a proposed outgoing trace $u(0^+)=-1$, still in inward coordinates and with $c_f=1$. This is an instantaneous reversal at the same speed magnitude. It is not continuous passage through zero velocity. The two labels remain separated. Their partner roots stay in the unchanged smooth incoming history for a short outgoing interval, so each partner acceleration remains bounded and inward, $0<m_i\le P_i(t)\le M_i$. No outgoing mirror symmetry is needed for these local bounds.

For one label define the outgoing displacement relative to straight outward unit-speed motion,

$$
q(t)=x(t)+t-x_0,\qquad q(0)=0,\qquad q'(t)=u(t)+1\longrightarrow0.
$$

Thus $q(t)=o(t)$. Positive $q$ means that the receiver is inward of that straight reference path. It does not alone imply a pointwise velocity bound. On incoming times define $k(s)=x(s)+s-x_0$. The fixed history has

$$
k(s)=2s+\frac a2s^2+o(s^2),\qquad k'(s)=1+u(s)>0,
\qquad k(0)=0.
$$

The complete local self-root inventory follows from these two scalar functions:

- An outward self chord emitted at $s<0$ is causal precisely when $k(s)=q(t)$. It exists uniquely for $q(t)<0$, is absent for $q(t)>0$, and reaches the emission join $s=0$ when $q(t)=0$.
- For $q(t)<0$, $s(t)=q(t)/2+O(q(t)^2)=o(t)$, $\rho=t-s\sim t$, and $D_t=1+u(s)\to2$. Hence its inward-coordinate acceleration is

$$
\boxed{A_{\mathrm{self,in}}(t)\sim-\frac{K}{2t^2},\qquad K=\kappa q_i^2>0.}
$$

- For $0<s<t$, outgoing velocity is negative near zero, so every outgoing self chord points outward. Its causal equation is exactly $q(s)=q(t)$. Each simple level recurrence contributes

$$
A_{\mathrm{self,out}}(t;s)
=-\frac{K}{(t-s)^2|q'(s)|}.
$$

An incoming chord pointing inward cannot be causal here. The incoming function $x(s)-s-x_0$ is positive for $s<0$, whereas its outgoing value is $-2t+o(t)<0$. Incoming emissions bounded away from zero also retain a strict causal deficit by continuity and the original subfield history. The displayed inventory therefore excludes older omitted roots, not just roots in a Taylor neighborhood.

When $q(t)=0$ at a positive reception, $s=0$ is a genuine positive-delay causal emission. Its source velocity jumps, so it is not an ordinary differentiable simple-root evaluation. It must not be deleted using the same-time diagonal exclusion. A plateau of $q$ instead produces a continuum of outgoing self roots with $D_t=0$. Both cases require additional event treatment if they persist; assigning them zero acceleration would change the root inventory.

#### The punctured integral equation selects a subfield outgoing segment

The following result tests a precise regularity class. Require finite right velocity trace, continuous position, velocity locally absolutely continuous on every $[\delta,t_1]$ with $\delta>0$, and the complete ordinary simple-root equation almost everywhere there. No extra singular velocity variation or unassigned interior impulse is permitted. Source-join and non-simple-root receptions may form a null exceptional set; an interval or positive-measure set of unresolved such receptions is outside this class. No monotonicity of $q$ is assumed.

All admitted self contributions now point outward. Write their nonnegative total magnitude as $S$, so

$$
q''(t)=P(t)-S(t),\qquad S(t)\ge0,\qquad 0<P(t)\le M.
$$

Integration from $\delta$ to $t$ and the limit $q'(\delta)\to0$ show that $\int_0^t S$ is finite for any in-class solution. They also give $q'(t)\le Mt$ and $q(t)\le Mt^2/2$. These facts follow from the full integral equation, not a derivative identity that could hide singular variation.

First, $q$ cannot have negative excursions arbitrarily near zero. On $q<0$ the incoming-born row gives $S\ge c/t^2$ for a fixed $c>0$. On a sufficiently short interval, $q''\le M-c/t^2<0$. Every negative component is consequently concave. A bounded negative component whose endpoints both have $q=0$ is impossible, since a concave function lies above its endpoint chord. A component beginning at zero would require integrating a $-c/t^2$ acceleration to a finite right velocity trace, also impossible. All remaining negative points, if any, lie in a terminal component whose left endpoint is positive. Hence $q\ge0$ on some initial interval.

Next set $Q(t)=\max_{0\le s\le t}q(s)$, the running maximum. On any component of $\{q<Q\}$, $Q$ stays constant. At an ordinary reception with $0<q(t)<Q(t)$, continuity supplies an earlier outgoing time with the same value of $q$, and hence a self root. Since $q'(s)\to0$, choose the interval so that $|q'(s)|\le1$. Its delay is below $t$, so that row alone gives $S\ge K/t^2$. Receptions with $q(t)=0$ have the source-join root and belong to the null exceptional set stipulated above. Thus $q''<0$ almost everywhere in each running-maximum deficit component after further shortening the interval.

A bounded component cannot be a concave dip below its common endpoint value $Q$. A component beginning at zero would have constant $Q=Q(0)=0$, contradicting $0\le q<Q$. At most a terminal component with a positive left endpoint remains. It follows that $q=Q$ on some initial interval. There $q$ is nondecreasing. A plateau would supply a continuum of self roots over a positive reception interval, contrary to the tested equation class. Therefore $q$ is strictly increasing and positive for $t>0$, and its self-root inventory is empty.

The equation reduces to the smooth historical-partner problem

$$
x_i''=P_i(t,x_i),\qquad
x_i(0)=x_{i,0},\qquad x_i'(0^+)=-1.
$$

The source emission is a smooth implicit function of reception time and receiver position because the inherited transmitter factor stays positive. Ordinary local ODE existence and uniqueness therefore construct the outgoing segment. With $a_i=P_i(0,x_{i,0})>0$,

$$
\boxed{
u_i(t)=-1+a_it+o(t),\qquad
x_i(t)=x_{i,0}-t+\frac{a_i}{2}t^2+o(t^2).
}
$$

Consequently $-1<u_i(t)<0$ on a short interval: the labels move outward, while their inward acceleration reduces outward speed. The spliced incoming and outgoing paths have speed magnitude below one almost everywhere, so every positive-delay self chord is strictly shorter than its elapsed time. This independently checks the empty self-root inventory. One historical partner root remains per receiver. The running-maximum argument establishes local uniqueness within the stated punctured ordinary-root class, not within unspecified singular-event formulations.

For both labels reversed, their separation $d$ satisfies

$$
d(t)=d_0+2t-\frac{a_L+a_R}{2}t^2+o(t^2).
$$

They would move apart immediately, without passing each other. This statement describes the conditionally assigned restart, not an event generated by the equation.

The partner playback provides another exact check. With inherited source time $s_{i,*}$ and transmitter factor $D_{t,i,*}>0$,

$$
\frac{ds_i}{dt}=\frac{1+u_i(t)}{D_{t,i}(t)},\qquad
s_i(t)=s_{i,*}+\frac{a_i}{2D_{t,i,*}}t^2+o(t^2).
$$

The receiver factor is zero at the reversed endpoint, so source playback pauses to first order. The acceleration there remains $a_i>0$: receiver playback does not multiply the canonical acceleration.

#### The full event equation still lacks the reversal

For this conditional restart, the ordinary partner acceleration is bounded on both sides, and there are no self roots on either side. Continuous position with the two velocity traces nevertheless has the distributional second derivative

$$
\boxed{D u_i=P_i(t)\,dt-2\delta_0.}
$$

Here $\delta_0$ denotes a unit event impulse at zero, and $P_i$ denotes the corresponding bounded partner density on each side. The coefficient $-2$ is the exact velocity change $-1-(+1)$ in units $c_f=1$. Integrating the actual ordinary canonical rows over a shrinking event interval gives zero, while the velocity change tends to $-2$. The conditional restart therefore fails the full distributional EOM by precisely this missing atom. A solution of the punctured equation alone does not generate its assigned reversal.

The [canonical endpoint convention](../../../../content/markdown/aaa/dynamics/master-equation.md#conventions-and-exclusions) and [singular-event binding](../../app-solver/contracts/master-eom-binding-v1.md#singular-event-contract) supply no accepted reversal impulse. Excluding a single endpoint is not, by itself, a proof against every possible concentration limit. The stronger auxiliary statement available here concerns regular separated collinear families actually evolved from the original monotone inward data: their inward velocities are nondecreasing by the sign argument below, so a bounded convergent such family cannot produce the required negative jump. Evaluating an already prescribed reversed history is different; its self chords can point outward and it is not covered by that inward-sign assertion.

#### Analytical control and claim boundary

For an exact local root control, take $x(s)=x_0+s+as^2/2$ for negative $s$ and $x(t)=x_0-t+bt^2/2$ for positive $t$, with $a>0$. Then $q(t)=bt^2/2$. If $b<0$, its incoming root is

$$
s(t)=\frac{-2+\sqrt{4+ab t^2}}{a},\qquad
D_t=\sqrt{4+ab t^2},\qquad
A_{\mathrm{self}}=-\frac{K}{[t-s(t)]^2\sqrt{4+ab t^2}}
\sim-\frac{K}{2t^2}.
$$

If $b>0$, no local self root exists. If $b=0$, all outgoing emission times are self roots with $D_t=0$. These exact local comparison paths check the topology and coefficient; they are not replacements for the original complete history or solutions of the coupled equation.

Claim grade: **derived**, with independent analytical derivations and review of the complete local root inventory, punctured integral argument and distributional event balance. Falsifiers are an additional admitted local root with an opposing sign, an in-class finite-trace solution violating the concavity/running-maximum proof, a failure of the exact quadratic control, or a derivation of the required $-2\delta_0$ from the full unchanged event equation. An independently specified singular-event operator would require separate analysis. The present result constructs a conditional outgoing segment and shows exactly why it does not constitute a reversal under the existing equation. It introduces no speed ceiling, modified root weight or numerical continuation.

### Integrable velocity singularity fails the acceleration-sign check

The proposed outgoing form $u(t)\sim Bt^{-p}$, with $B\ne0$ and $0<p<1$, permits continuous position: its displacement is asymptotic to $Bt^{1-p}/(1-p)$. The square-root example is $u=C/\sqrt t$, $x=x_0+2C\sqrt t$, with $C>0$ and $c_f=1$. This kinematic property does not establish compatibility with the acceleration equation. The operator required that this route proceed only if it conforms to the unchanged Master Equation.

Use the original collinear incoming history and continuous positions. Require finite velocity at each positive time, local absolute continuity of velocity on compact punctured intervals, and the complete integral EOM there. The argument needs only an eventually fixed velocity sign and an infinite right limit; it does not differentiate an uncontrolled asymptotic remainder. Positive separation and continuity keep the partner root in its earlier regular incoming source interval, so $0<P(t)\le M$ remains valid. Unbounded receiver velocity does not multiply the canonical acceleration.

If $B>0$, the outgoing receiver moves inward from its inherited endpoint. Every self chord, whether emitted in the retained incoming history or on the short outgoing segment, points inward. The partner contribution also points inward. The unchanged positive transmitter weight therefore implies

$$
u(t)-u(s)=\int_s^t[P(r)+S(r)]dr\ge0,
\qquad 0<s<t,\quad S\ge0.
$$

As $s\downarrow0$, $u(s)\to+\infty$, contradicting a finite $u(t)$. For the exact square-root example the conflict is already pointwise: $u'=-C/(2t^{3/2})<0$, whereas every defined canonical contribution is inward and the partner term is strictly positive.

If $B<0$, outgoing self chords point outward. An inward-directed self hit from an incoming emission $s<0$ would require

$$
x(t)-t-x_0=x(s)-s-x_0.
$$

The left side is negative because the outgoing position moves outward from $x_0$, while the right side is positive on the original strictly subfield incoming history. Such a hit is impossible. All remaining admitted self contributions are therefore outward. Writing their magnitude as $S\ge0$ gives

$$
u(t)-u(s)=\int_s^t[P(r)-S(r)]dr\le M(t-s).
$$

But $u(s)\to-\infty$ makes the left side diverge positively for each fixed finite $u(t)$, another contradiction. The sign check therefore excludes either sign of the proposed power-law singularity, and more generally either infinite one-sided velocity limit under these same position, history and integral-equation hypotheses.

Claim grade: **derived**, independently checked from the actual canonical radial kernel and inherited geometry. Falsifier: an in-class continuation with the claimed infinite limit that violates the corresponding integral inequality, or an additional admitted contribution reversing the proved sign or invalidating the bounded partner remainder. Rapid sign-changing histories without a one-sided velocity limit and separately defined nonordinary event operators are not covered. The failed compatibility check ends this candidate; no numerical continuation, regularization, altered weight or speed ceiling is introduced.

### Conditional limits of positive finite-width approximations

The [binding's finite-width causal-surface equation](../../app-solver/contracts/master-eom-binding-v1.md#finite-width-transmitter-side-acceleration) uses a nonnegative Gaussian and a radial core kernel that preserves chord direction. Consider a regular collinear family evolved from the monotone inward retained history, on an interval where the two labels remain separated. As long as each inward velocity is nonnegative, every self integrand is inward or zero and every signed opposite-polarity partner integrand is inward. The resulting nonnegative inward acceleration preserves that condition. Thus each inward velocity is nondecreasing throughout this interval.

Consequently a bounded convergent family of this kind cannot create a negative velocity-jump atom: its acceleration measures are nonnegative, and any locally finite weak limit preserves that sign. If the family converges to the original incoming trace $u_i(0^-)=1$, a finite outgoing trace must satisfy $U_i\ge1$. If its punctured outgoing limit also recovers the unchanged sharp equation, the strict-superfield jump calculation excludes $U_i>1$. The continuous $U_i=1$ alternative is excluded in the integral classes established above.

Both convergence premises are additional hypotheses. Finite regulators can already change self contributions before the event. Neither convergence to this particular incoming history nor recovery of the complete sharp equation through a singular limit has been proved here. The result is therefore a conditional obstruction to finite resets under positive causal-surface approximation, not a claimed regulator limit or a numerical experiment. A scheme producing a negative impulse would need to identify where it ceased preserving the stated geometry, sign or convergence assumptions.

Claim grade: derived conditional sign argument, independently checked against the binding's actual kernel. Falsifier: a regular collinear separated family satisfying these hypotheses with a decreasing inward velocity or a negative limiting acceleration measure.

### What remains outside these results

| Proposed continuation | Result for this inherited collinear record |
| --- | --- |
| Finite continuous velocity, with acceleration allowed to diverge near zero | Excluded in the local integral and nonnegative locally finite measure classes. |
| Continuous waiting, braking, rebound or oscillation near speed one | The positive partner row forces increasing inward speed; none avoids the same contradiction in those classes. |
| Finite velocity jump to $U>1$ or $U<-1$ | Excluded by nonintegrable outgoing self acceleration, even after the proposed jump. |
| Finite restart at $-1<U<1$ | Ordinary outgoing rows are finite, but the required negative event impulse has not been supplied by the equation. |
| Exact reversed limit $U=-1$ in the punctured integral and ordinary-root class | The unique local outgoing segment moves outward and slows below unit speed; joining it to the incoming path requires a missing $-2\delta_0$ event impulse. |
| Persistent nonisolated roots or a source-join event on a positive-measure reception set | Outside the ordinary-root theorem; no full event operator or continuation has been constructed. |
| Infinite one-sided velocity limit with continuous position | Excluded by the acceleration-sign inequalities in the punctured integral class, including integrable power-law singularities of either sign. |
| No one-sided velocity limit, or a non-measure generalized equation | Outside the proved classes; a precise definition and compatibility proof are still required. |

One regularity distinction matters. A continuous velocity can have a derivative almost everywhere while also carrying singular variation that its almost-everywhere derivative misses. A negative singular part could formally evade the integrated inward inequality if only that derivative identity were checked. The full distributional equation would have to account for that part as an additional acceleration. Merely choosing such a function does not obtain the missing contribution from the canonical root sum.

Likewise, neither an auxiliary clock nor a finite-part subtraction establishes an unchanged-law continuation. The clock preserves the divergent physical-time integral; the subtraction needs an independently justified generalized event operator. Any such proposal must specify position continuity, velocity traces, root admission, and the complete event acceleration. The near-diagonal audit below evaluates the auxiliary causal-surface integral on the original incoming history: its prescribed ordered limit recovers zero incoming accumulated self acceleration, while other joint limits need not. The conditional sign result above constrains any evolved approximation before it could supply an event rule. The present analysis finds no outgoing solution for the original binary. It does not show that the particles stop, pass, rebound, or obey a velocity ceiling.

## Near-diagonal width and core limits

### The sharp equation and its auxiliary regulator

The [Master Equation's auxiliary dual-mollified regulator](../../../../content/markdown/aaa/dynamics/master-equation.md#auxiliary-dual-mollified-regulator-for-proof-and-computation) is an evaluation device, not a second defining law. Its recovery statement specifies wake width $\eta\downarrow0$ first and core length $\epsilon\downarrow0$ second, on compact regular charts with isolated simple roots, positive range and a positive transmitter-factor floor. That statement supplies no extension at the excluded diagonal. Arbitrary joint-limit dependence there does not contradict the declared ordered recovery on regular charts.

Use the actual original incoming history, shift the first speed-equality event to $t=0$, and let $x(t)$ be either label's inward coordinate. Its endpoint data are $x'(0^-)=1$ and $x''(0^-)=a>0$. In this section $a$ denotes incoming acceleration, not the initial half-separation used earlier. Set $K=\kappa q_i^2>0$. For positive delay $\rho=t-S$, define

$$
d(t,\rho)=x(t)-x(t-\rho),\qquad
g(t,\rho)=d(t,\rho)-\rho.
$$

At each moving incoming reception, $d>0$ and $g<0$ throughout the retained positive-delay history. There are no admitted self roots. The [binding's Gaussian and softened radial kernel](../../app-solver/contracts/master-eom-binding-v1.md#finite-width-transmitter-side-acceleration) nevertheless give the auxiliary scalar self integral

$$
I_{\eta,\epsilon}(t)=
\frac{K}{\sqrt{2\pi}\eta}
\int_0^{h(t)}
\frac{d(t,\rho)}{[d(t,\rho)^2+\epsilon^2]^{3/2}}
\exp\!\left[-\frac{g(t,\rho)^2}{2\eta^2}\right]d\rho.
$$

Here $h(t)$ reaches the original retained-history edge; that edge stays outside the local event neighborhood. All evaluations below hold this history fixed. They do not evolve a regularized binary or prove that such an evolution converges to it. Removing only the single integration point $\rho=0$ leaves every finite-regulator integral unchanged. A shrinking neighborhood of that point can still contribute.

### Fixed incoming receptions: the two limits do not commute

Fix $t<0$ with $v=x'(t)\in(0,1)$ and put $b=1-v$. Local smoothness gives $d=v\rho+O(\rho^2)$ and $g=-b\rho+O(\rho^2)$. Substitution $\rho=\eta z/b$, when $\eta/\epsilon\to0$, gives

$$
\boxed{
I_{\eta,\epsilon}(t)
\sim\frac{Kv}{\sqrt{2\pi}b^2}\frac{\eta}{\epsilon^3}.
}
$$

The coefficient uses $\int_0^\infty z e^{-z^2/2}dz=1$. A Gaussian bound dominates the rescaled integrand on a small delay interval. On the remaining compact history, both $d$ and $-g$ have positive lower bounds, so the contribution is exponentially small. This establishes the result for the original history, rather than just an affine comparison path. It is not uniform as $v\uparrow1$.

At fixed positive core, width removal gives zero. At fixed positive width, the substitution $\rho=\epsilon z/v$ instead gives

$$
I_{\eta,\epsilon}(t)\sim
\frac{K}{\sqrt{2\pi}\eta v\epsilon}.
$$

Consequently

$$
\lim_{\epsilon\downarrow0}\lim_{\eta\downarrow0}I_{\eta,\epsilon}(t)=0,
\qquad
\lim_{\eta\downarrow0}\lim_{\epsilon\downarrow0}I_{\eta,\epsilon}(t)=+\infty.
$$

Power-law refinement routes require a fixed reference length $L$: write $\bar\eta=\eta/L$, $\bar\epsilon=\epsilon/L$ and $\bar\eta=C\bar\epsilon^p$, with $C>0$. For $p>1$ the displayed fixed-reception asymptotic applies. It gives zero for $p>3$, a tunable positive finite value for $p=3$, and positive divergence for $1<p<3$. These are auxiliary diagonal-layer contributions, not extra sharp causal hits. At release itself the entire retained self history is stationary, $d\equiv0$, and the softened self integral is exactly zero for every positive width and core. Instantaneous zero velocity alone would not establish that stationary-history control.

An independent closed-form comparison uses an affine history $d=v\rho$ on an infinite delay window. With $\beta=b\epsilon/(v\eta)$,

$$
I^{\infty}_{\eta,\epsilon}
=\frac{K}{\sqrt{2\pi}\eta v\epsilon}F(\beta),
\qquad
F(\beta)=\int_0^\infty
\frac{y e^{-\beta^2y^2/2}}{(1+y^2)^{3/2}}dy
=1-\beta\sqrt{\frac\pi2}e^{\beta^2/2}
\operatorname{erfc}\!\left(\frac\beta{\sqrt2}\right).
$$

Integration by parts proves the identity. Substitution $y=z/\beta$ gives $F(\beta)=\beta^{-2}-3\beta^{-4}+O(\beta^{-6})$. For a finite affine delay window $h$, the omitted acceleration is nonnegative and at most $K e^{-b^2h^2/(2\eta^2)}/(\sqrt{2\pi}\eta v^2h)$. This comparison is a coefficient control; it is not a replacement initial history for the binary.

### The endpoint value diverges, but its incoming integral need not

At the speed event the actual $C^2$ incoming record gives

$$
d(0,\rho)=\rho-\frac a2\rho^2+o(\rho^2),
\qquad
g(0,\rho)=-\frac a2\rho^2+o(\rho^2).
$$

If $\eta/(a\epsilon^2)\to0$, the significant delays are of order $\sqrt{\eta/a}\ll\epsilon$. The denominator is asymptotic to $\epsilon^3$, and

$$
\begin{aligned}
I_{\eta,\epsilon}(0)
&\sim\frac{K}{\sqrt{2\pi}\eta\epsilon^3}
\int_0^\infty\rho e^{-a^2\rho^4/(8\eta^2)}d\rho\\
&=\boxed{\frac{K}{2a\epsilon^3}}.
\end{aligned}
$$

Every joint approach $\eta,\epsilon\downarrow0$ diverges pointwise at this endpoint, including other scale ratios. Indeed, on $0<\rho<c\min(\epsilon,\sqrt{\eta/a})$, the Gaussian has a positive lower bound, $d$ is comparable to $\rho$, and the denominator is at most a constant times $\epsilon^3$. Thus, with a fixed positive constant $c_1$,

$$
I_{\eta,\epsilon}(0)
\ge c_1K\frac{\min(\epsilon^2,\eta/a)}{\eta\epsilon^3}.
$$

For $\eta\le a\epsilon^2$ this bounds the integral below by a positive multiple of $K/(a\epsilon^3)$; for $\eta\ge a\epsilon^2$ it gives a positive multiple of $K/(\eta\epsilon)$. Both diverge. An infinite limiting value at one reception alone does not establish an infinite accumulated acceleration, however.

To determine that accumulation, fix a short incoming interval and define

$$
J_{\eta,\epsilon}=\int_{-t_0}^{0}I_{\eta,\epsilon}(t)dt.
$$

For $z=-t\ge0$, the original $C^2$ history implies the uniform corner expansion

$$
G(z,\rho):=\rho-d(-z,\rho)
=\int_z^{z+\rho}[1-x'(-v)]dv
=a\rho\left(z+\frac\rho2\right)
+o\!\left(\rho(z+\rho)\right).
$$

Set $\rho=\sqrt{\eta/a}\,r$ and $z=\sqrt{\eta/a}\,w$. If $\eta/(a\epsilon^2)\to0$, then

$$
\boxed{
J_{\eta,\epsilon}\sim
C_0\frac{K\sqrt\eta}{a^{3/2}\epsilon^3},
\qquad
C_0=\frac{\Gamma(3/4)}{2^{1/4}\sqrt\pi}.
}
$$

The constant follows by changing the order of integration:

$$
\begin{aligned}
\sqrt{2\pi}C_0
&=\int_0^\infty\!\int_0^\infty
r e^{-r^2(w+r/2)^2/2}\,dw\,dr\\
&=\int_0^\infty\!\int_{r^2/2}^\infty e^{-y^2/2}\,dy\,dr\\
&=\sqrt2\int_0^\infty y^{1/2}e^{-y^2/2}dy
=2^{1/4}\Gamma(3/4).
\end{aligned}
$$

For rigor, on a small corner $z+\rho\le\delta$, continuity of the incoming acceleration bounds $G$ between $a_-\rho(z+\rho/2)$ and $a_+\rho(z+\rho/2)$, where $a_\pm\to a$ as $\delta\downarrow0$, and gives $d/\rho\to1$. The normalized core factor is at most one. The scaled integrand is dominated by a constant times $r e^{-c r^2(w+r/2)^2}$, whose quadrant integral is finite by the same order-of-integration calculation. Dominated convergence therefore applies. Reception times away from zero contribute $O(\eta/\epsilon^3)$, which is smaller than the displayed $\sqrt\eta/\epsilon^3$ scale; delays away from zero have a uniform causal deficit and an exponentially small contribution. This proof uses the actual smooth incoming record, not a prescribed quadratic surrogate.

In the dimensionless routes already defined, every $p>3$ recovers zero self acceleration at every fixed $t<0$, while

$$
J_{\eta,\epsilon}\sim
\frac{C_0K\sqrt C}{a^{3/2}L^{5/2}}
\bar\epsilon^{p/2-3}.
$$

| Joint route $\bar\eta=C\bar\epsilon^p$ | Every fixed incoming reception $t<0$ | Accumulated incoming self acceleration |
| --- | --- | --- |
| $p>6$ | Tends to zero. | Tends to zero. |
| $p=6$ | Tends to zero. | Tends to the positive finite value $C_0K\sqrt C/(a^{3/2}L^{5/2})$. |
| $3<p<6$ | Tends to zero. | Diverges positively. |

For $p=6$, positivity and concentration imply weak convergence on the closed incoming interval to a positive atom at $t=0$ with the displayed mass. Varying $C$ varies that mass. This is an inward contribution and cannot supply the negative event impulse required by a rebound. It also shows why pointwise incoming recovery is weaker than recovery of the accumulated acceleration.

The literal prescribed iterated incoming integral instead satisfies

$$
\boxed{\lim_{\epsilon\downarrow0}\lim_{\eta\downarrow0}J_{\eta,\epsilon}=0.}
$$

At fixed core, the endpoint layer has shrinking total mass proportional to $\sqrt\eta$ even though its endpoint value tends to $K/(2a\epsilon^3)$. The final core limit makes that endpoint value infinite, without creating an incoming acceleration atom in the prescribed iterated integral. None of these fixed-history limits establishes an outgoing trajectory.

### Delay excision and faithful outgoing limits

A proof truncation $\rho\ge\delta>0$ removes the diagonal neighborhood before taking either regulator limit. For each fixed incoming reception, including $t=0$, the truncated residual stays away from zero, so taking width to zero, then core to zero, then $\delta$ to zero gives zero self contribution. Here $\delta$ is an auxiliary proof cutoff, not a physical minimum delay.

For a candidate continuous outgoing branch, every fixed $t>0$ has the genuine positive-delay self root $\rho_s(t)>0$ derived above. Once $\delta<\rho_s(t)$, ordered regular recovery retains its full sharp contribution. After those two regulator limits the truncated density is $A_\delta(t)=\mathbf1_{\{\rho_s(t)>\delta\}}A_s(t)$, apart from a single irrelevant cutoff reception. The exact delay measure gives

$$
\int A_\delta(t)dt
=\int_\delta^{\rho_1}
\frac{K}{\rho^2(w_-+w_+)}d\rho
\ge\frac K M\left(\frac1\delta-\frac1{\rho_1}\right)
\longrightarrow+\infty.
$$

Thus removing the incoming diagonal layer does not remove the outgoing nonintegrable self contribution. Keeping a positive cutoff would delete admitted causal roots and change the equation.

More generally, let nonnegative outgoing acceleration densities $f_n$ satisfy $\liminf_n f_n(t)\ge A_s(t)$ for almost every fixed $t>0$. For a nonnegative smooth test function $\chi$ equal to one near zero, the nonnegative integral limit inequality gives

$$
\liminf_n\int\chi(t)f_n(t)dt
\ge\int_0^{t_1}\chi(t)A_s(t)dt=+\infty.
$$

No locally finite nonnegative acceleration-measure limit can retain those outgoing densities. The statement also applies to varying histories if the density-recovery premise is independently established. Convergence of trajectories alone, or a recovery theorem for a fixed regular history, does not establish that premise.

### Evidence and conclusion of the audit

Claim grade: **derived**, with separate analytical derivations of the fixed-reception limit, the $C^2$ endpoint layer and the outgoing delay-excision obstruction. The bounds and exact integrals above are the references. A bounded mpmath 1.3.0 diagnostic at 80 decimal digits separately checked the affine closed form and the two universal coefficients, after recording successful exponential-integral, Gaussian-moment and stationary-kernel controls. It returned $C_0\approx0.581368317019118581841602$. Direct quadrature and the gamma expression differed by about $1.05\times10^{-81}$; the explicit omitted quadrature tail was bounded by $2.17\times10^{-548}$. These are numerical coefficient checks, not interval certificates or binary evolution. The [work log](../work-log.md#2026-09-16--near-diagonal-regulator-audit) records the instrument and its scope.

Falsifiers are a failure of the affine integration identity, a different leading coefficient under the stated smoothness and scale assumptions, a failure of the quadrant integral or concentration estimate, or a locally finite nonnegative outgoing limit satisfying the displayed density-recovery premise. The audit does not identify a solver implementation defect and does not alter the sharp-root postulate.

The auxiliary integral supplies no regulator-independent diagonal extension. Its declared width-first order recovers the original incoming zero self measure; other joint approaches can agree at every earlier reception yet supply different endpoint masses. Faithful positive recovery of the outgoing sharp rows of the continuous inward crossing still has infinite accumulated acceleration. No passage or rebound under the full equation has been constructed, and unrestricted architrino velocity remains the scope of the investigation. The exact reversed unit-speed trace is classified separately above: its regular conditional outgoing segment exists, but the required negative event impulse is absent.

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

The investigation concerns a different configuration or history under the unchanged equation. The [geometry derivation](speed-crossing-opposing-interaction-geometry.md#a-reflected-pair-with-a-finite-outgoing-acceleration-sum) now supplies two reflected prescribed source histories whose eight local partner roots cancel every negative-power term of the receiver's local self-plus-partner sum. This gives a finite outgoing limit, but no complete EOM history realizing those paths has been established. The stationary pair cannot supply the needed opposing contribution: its partner acceleration stays bounded at the first speed boundary. Adding more particles is not sufficient by itself; their admitted wake contributions would have to have the required singular magnitude, direction and timing.

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

The current examination retains the [original collinear history](#local-continuation-alternatives-for-the-original-collinear-history) with unrestricted velocity. Positivity of the inherited partner contribution and every nearby admitted self contribution forces any finite continuous-velocity integral solution into the already-obstructed superfield branch. This rules out waiting, braking and oscillation as alternative continuous continuations in that class without assuming outgoing mirror symmetry. Finite jumps to strictly superfield velocity also fail through nonintegrable outgoing self contributions. Subfield restarts require negative event impulses that have not been derived.

The [exact reversal analysis](#exact-reversal-outgoing-roots-and-the-missing-event-impulse) classifies the trace $U=-1$ in the punctured integral and ordinary-root class, including oscillatory candidates. Assigning that reversal gives a unique local self-root-free segment that moves outward and slows below unit speed. The full distributional equation would require an additional $-2\delta_0$ acceleration impulse per inward coordinate; the actual bounded partner rows and absent self rows do not supply it. The conditional segment therefore does not establish rebound under the original equation. Persistent nonordinary root sets, additional singular event operators and histories without any one-sided velocity limit remain outside the proved classes.

The proposed [integrable velocity singularity](#integrable-velocity-singularity-fails-the-acceleration-sign-check) fails its unchanged-equation compatibility check. For an infinite inward right limit, the equation requires nondecreasing inward velocity, contradicting finite velocity at any later time. An infinite outward right limit cannot recover a finite value under the bounded inward partner acceleration and outward self contributions. This excludes both signs of $u(t)\sim Bt^{-p}$, $0<p<1$, without differentiating its asymptotic remainder. Under the operator's condition, this candidate is not pursued further. Histories with no one-sided velocity limit and nonordinary event formulations remain outside these sign-limit results.

The [near-diagonal regulator audit](#near-diagonal-width-and-core-limits) adds a fixed-history limit result: the auxiliary width-first order recovers zero incoming accumulated self acceleration, while other joint refinements can give zero, finite positive or infinite endpoint mass despite pointwise recovery earlier. None supplies the required negative rebound impulse. Positive approximations retaining the genuine outgoing sharp densities still have divergent accumulated acceleration. These findings limit what the auxiliary integral establishes at the event; they do not impose a speed ceiling or diagnose a solver defect.

The [four-root and reflected-source calculations](speed-crossing-opposing-interaction-geometry.md) remain separate prescribed noncollinear geometry results. Their finite selected sum does not apply to the original binary or establish a coupled EOM crossing. Auxiliary time and integral formulations remain analysis tools; none supplies a new event contribution by changing notation.
