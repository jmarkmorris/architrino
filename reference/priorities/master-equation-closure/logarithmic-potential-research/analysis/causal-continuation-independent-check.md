# Causal logarithmic endpoint: independent continuation analysis

## Result and scope

**Claim grade: derived for the declared logarithmic candidate and incoming histories.** The positive-separation wake-speed endpoint has no finite-velocity collinear continuation whose velocity is absolutely continuous and satisfies the complete ordinary-root equation almost everywhere. Absolute continuity means that velocity changes equal the time integral of an integrable acceleration; it allows an unbounded acceleration near the endpoint when that acceleration remains integrable. The obstruction therefore covers more than classical twice-differentiable trajectories.

The reason has two parts. Every possible local reception contribution points inward, so the equation itself requires speed to increase beyond one. That crossing creates one positive-delay self root on each path. Its acceleration has a divergent positive time integral as reception approaches the crossing. The finite partner contribution has the same sign and cannot cancel it. This conclusion does not require an assumed monotone outgoing branch: monotonicity is derived first from the complete operator.

The theorem concerns continuation along the same line from the specified incoming solution. It does not determine a transverse departure, a discontinuous velocity update, a singular generalized event law, or a modified receiver response. Those alternatives require separate definitions and cannot be reported as continuations already supplied by this equation.

## Fixed incoming data and proposed continuation class

Use the [causal logarithmic formulation](causal-logarithmic-formulation.md), with wake speed $c_f=1$, two equal-magnitude opposite polarities, and coupling $K>0$. Every simple positive-delay root is admitted, including self reception. The magnitude of one acceleration contribution is

$$
\frac{K}{R|D_t|},
\qquad
R=|X_i(T)-X_j(S)|=T-S>0,
\qquad
D_t=1-nV_j(S),
$$

where $T$ is reception time, $S<T$ is emission time, and $n=\operatorname{sgn}[X_i(T)-X_j(S)]$ is the direction from the emission point to the receiver. Opposite polarities contribute in direction $-n$; self reception contributes in direction $n$. No zero-delay contribution, cap, suppression, resetting, or impulse is included.

The complete prepared past is $X_\pm(T)=\pm(a-u_0T)$ for $T\le0$, with $a>0$ and $0\le u_0<1$. The [incoming first-event theorem](causal-collinear-first-event.md) gives a finite endpoint $T_*$ with

$$
X_\pm(T_*)=\pm b,\qquad b>0,\qquad
u(T_*)=1,\qquad u(T)<1\quad(T<T_*).
$$

Here $u=-\dot x$ and $X_\pm=\pm x$ on the incoming history. Its speed is nondecreasing on the complete past and strictly increasing after release. Each receiver has exactly one regular partner root at $T_*$ and no positive-delay self root. The incoming partner acceleration has a finite positive limit.

Suppose a proposed extension exists on $[T_*,T_*+\epsilon]$, matches the positions and velocities at $T_*$ continuously, remains collinear, and has absolutely continuous velocities. Require the unchanged complete ordinary-root equation almost everywhere; an undefined multiple-root contribution is not assigned a new value. First consider a mirror extension $X_\pm=\pm x$. Section [Collinear extensions without imposed reflection symmetry](#collinear-extensions-without-imposed-reflection-symmetry) removes that symmetry restriction.

Continuity permits shortening the interval so that $x>b/2$ and $u>1/2$. Thus the right path continues moving left while remaining to the right of the origin. Every earlier point on that same labeled path lies farther right, since the entire incoming path was nonincreasing and the short proposed extension is decreasing. This geometric ordering fixes all contribution signs before any assertion about the derivative of $u$.

## Partner reception remains ordinary and strictly inward

Define the incoming function

$$
P(S)=S+x(S),\qquad S\le T_*.
$$

It is strictly increasing on the entire incoming past, tends to $-\infty$ as $S\to-\infty$, and has endpoint value $P(T_*)=T_*+b$. At the event the partner root solves $P(S)=T_*-b$, so its emission time $S_{p,*}$ is strictly less than $T_*$. Its source factor $1-u(S_{p,*})$ is positive.

At any sufficiently close later reception, the partner equation with an incoming emission is

$$
P(S_p(T))=T-x(T).
$$

The right side remains strictly below $P(T_*)$ and close to $T_*-b$. Therefore there is exactly one incoming partner root; it stays close to $S_{p,*}$ and remains regular. Its inward contribution

$$
B(T)=\frac{K}{[T-S_p(T)][1-u(S_p(T))]}
$$

is continuous and bounded below by some $m>0$ on a sufficiently short closed interval.

No partner emission after $T_*$ can reach either receiver on this interval. Choose its duration smaller than $b$. Both post-event half-separations exceed $b/2$, so such a partner range is greater than $b$, whereas its delay is less than $b$. The causal equality cannot hold. This excludes the whole recent emission interval, rather than relying on a selected root or a truncated search.

## The equation requires an immediate speed crossing

Every partner hit on the right receiver has direction $n=+1$ and opposite polarity, hence leftward acceleration. Every self hit has $n=-1$ because the receiver lies left of every earlier point on its own decreasing path; positive self polarity again gives leftward acceleration. The absolute source factor preserves these signs even before a root census is known. Consequently every defined contribution increases the inward speed. The full equation implies

$$
\dot u(T)\ge B(T)\ge m>0
$$

almost everywhere on the proposed interval. Absolute continuity now gives

$$
u(T)\ge1+m(T-T_*)>1\qquad(T>T_*),
$$

and $u$ is strictly increasing there. A plateau at speed one, braking, or a continuous reversal cannot satisfy the equation. The same conclusion holds if some attempted root sum instead diverges: that sum already fails to define an almost-everywhere finite acceleration for the proposed class.

## Complete outgoing root census

On the incoming history, $P'=1-u>0$ except for its terminal zero at $T_*$. On the proposed outgoing history, the forced crossing gives $P'=1-u<0$. Thus $P$ rises up to the event and falls immediately afterwards.

For the right path a self root obeys

$$
x(S_s)-x(T)=T-S_s,
\qquad\text{equivalently}\qquad P(S_s)=P(T).
$$

Since $P(T)<P(T_*)$ and the complete incoming range of $P$ extends to $-\infty$, there is exactly one solution $S_s(T)<T_*$. There are no outgoing self emission roots: strict decrease gives $P(S)>P(T)$ for $T_*\le S<T$. The diagonal $S=T$ is excluded by definition. The left receiver has the reflected inventory.

For every fixed $T>T_*$ sufficiently close to the event, the self root is simple:

$$
D_{t,s}=1-u(S_s)>0,\qquad
D_{r,s}=1-u(T)<0.
$$

Its source emission approaches $T_*$ from below as reception approaches $T_*$ from above. Thus the complete hypothetical outgoing inventory is one ordinary partner root and one ordinary self root per receiver. There is no hidden outward contribution available to cancel the self term. The incoming endpoint itself still has only the partner root; the self root is born from vanishing delay and is present at every proposed later time.

## The new self contribution is not locally integrable

Let

$$
\rho(T)=T-S_s(T)>0
$$

be the self delay. The incoming inverse of $P$ is differentiable at every $S_s<T_*$, so differentiating $P(S_s)=P(T)$ gives

$$
\dot S_s=\frac{1-u(T)}{1-u(S_s)},\qquad
\dot\rho=\frac{u(T)-u(S_s)}{1-u(S_s)}>0.
$$

These identities follow from the root geometry, not from an additional acceleration weighting. The self acceleration has magnitude

$$
A_s(T)=\frac{K}{\rho(T)[1-u(S_s(T))]}.
$$

Using the increasing delay as integration variable cancels the small transmitter factor exactly:

$$
\boxed{A_s(T)\,dT
=\frac{K}{\rho\,[u(T)-u(S_s)]}\,d\rho.}
$$

Continuity of the proposed finite speed and the known incoming speed supplies a finite upper bound $M>0$ for $u(T)-u(S_s)$ on the short interval. Moreover, $\rho(T)\to0$ as $T\downarrow T_*$. Fix any reception $T_1>T_*$. For $T_*<T_0<T_1$, the displayed identity yields

$$
\int_{T_0}^{T_1}A_s(T)\,dT
\ge\frac{K}{M}\log\!\left(\frac{\rho(T_1)}{\rho(T_0)}\right)
\longrightarrow+\infty
\qquad(T_0\downarrow T_*).
$$

In fact the speed difference in this denominator also tends to zero at birth; the constant bound already suffices for the contradiction. Because the complete acceleration is $B+A_s$ with both terms inward, absolute continuity would require

$$
u(T_1)-u(T_0)=\int_{T_0}^{T_1}[B(T)+A_s(T)]\,dT.
$$

The left side tends to the finite value $u(T_1)-1$, whereas the right side diverges positively. The proposed continuation cannot exist. This is an obstruction to a trajectory satisfying the full equation, not a trajectory prediction of an actual infinite velocity immediately after the event.

## Collinear extensions without imposed reflection symmetry

The contradiction also excludes a collinear extension that tries to lose mirror symmetry while matching the incoming velocities continuously. Let the right and left coordinates be $X_+(T)$ and $X_-(T)$, and define their inward speeds by $u_+=-\dot X_+$ and $u_-=\dot X_-$. Close to the event, continuity gives $X_+>b/2$, $X_-<-b/2$, and $u_\pm>1/2$.

For each path separately, self hits point along its inward motion, while every partner hit attracts it toward the opposite side. All post-event partner emissions remain excluded by the range bound. Incoming partner roots are unique because both supplied incoming source functions are the same strictly increasing $P$. Each path therefore has its own continuous positive partner contribution and satisfies $\dot u_\pm\ge m_\pm>0$ almost everywhere.

Use $P_+(T)=T+X_+(T)$ for the right path and $P_-(T)=T-X_-(T)$ for the left path. Both agree with incoming $P$ before $T_*$ and decrease immediately afterwards because $P_\pm'=1-u_\pm<0$. Each path has exactly one self root from the incoming history. Repeating the delay substitution separately for either path gives the same divergent integral. Reflection symmetry is therefore unnecessary for this local collinear no-go.

## Meaning of the endpoint and falsifiers

At the established endpoint, the two constituents remain separated, their velocities are finite, and the admitted partner contributions are finite. Failure occurs in trying to extend that data through any nonzero later interval under the full unsuppressed law. It does not occur because an already existing partner contribution diverges at the endpoint. The instantaneous comparison has no causal self roots and consequently does not contain this obstruction.

The result excludes finite-velocity classical continuation and the broader absolutely continuous velocity class stated above. An arbitrary non-absolutely-continuous velocity could carry a singular change not accounted for by integration of this acceleration. A velocity jump would require an impulse. Neither is supplied by the ordinary-root model, and neither is selected by this proof. A finite-variation measure treatment would have to define its singular source terms and show how its acceleration measure exists; a positive infinite self contribution cannot be removed merely by assigning a value at the single endpoint. No transverse continuation is assessed here.

**Falsifier.** A counterexample must match the full stated incoming history and solve the same complete collinear ordinary-root equation with finite absolutely continuous velocity on a nonzero interval after $T_*$. It would have to invalidate at least one checkable step: the common inward signs; the positive lower partner bound; the monotonicity obtained by integrating that bound; the one-partner/one-self root inventory; or the exact self-delay integration identity. Removing self roots, changing the transmitter weight, changing the radial response, resetting the history, or supplying an impulse changes a premise and is a distinct model.

## Independence record

This calculation was derived from the fixed formulation and the incoming first-event theorem before inspection of a new primary continuation analysis. Its reference proof is the operator-sign argument followed by the complete root census and the self-delay integration identity. It does not use a numerical continuation, an inherited claimed event time, or a simulation implementation. Freeze this reference before comparison with the primary continuation proof; any later review belongs in a separate appended assessment.

## Appended assessment of the primary proof

**Claim grade: derived.** The [primary continuation proof](causal-continuation-obstruction.md) establishes the same obstruction and justifiably weakens the endpoint regularity assumption. Its ordinary-root conclusion is accepted at its stated scope. The separately stated nonnegative acceleration-measure extension is also supported under its explicit additional interpretation. No correction to the mathematical reference above was made for this assessment.

The comparison used the primary file whose SHA-256 was measured directly with `shasum -a 256` as `ede0c5a22cc19704e507651408b82ffdf6f2299349688b0f0abe275360e6a7e2`. The independent reference was frozen first at `bb9e5ddf0fa183a29aa12e0b5607a8f18281dbca24b10ca25353a3d4e47b040f`, before the primary was read. These digests identify the compared source states; mathematical support is supplied by the independently derived argument, not by matching file contents.

The primary assumes a finite continuous matching velocity at the event and absolute continuity only on compact time intervals strictly after it. This suffices. The lower acceleration bound can first be integrated from $T_*+\delta$ to any fixed later $T$, where the assumed regularity applies. Taking $\delta\downarrow0$ and using the finite trace establishes the forced crossing. The identical limiting procedure then gives a finite velocity difference against the divergent positive self integral. Neither step assumes absolute continuity or integrability across the event. Thus the primary covers a larger class than the initially frozen reference while using the same contradiction.

The primary's two outgoing distances from the original midpoint do not impose reflection symmetry or a fixed future midpoint. Its sign argument is valid separately on each path, and its positive-separation bound excludes every post-event partner emission before outgoing monotonicity is derived. The complete incoming affine past makes the incoming source coordinate range extend to minus infinity. The single incoming partner root and, after forced crossing, the single incoming self root consequently exhaust the root set. The self source factor stays positive at every strictly later reception; negative root playback does not change the acceleration sign. The exact endpoint remains partner-only.

The conditional bounded-variation argument also survives the weaker regularity. Under its stipulated nonnegative derivative measure, inward velocity is nondecreasing and bounded on a sufficiently short finite-variation interval. The positive partner density enforces speed greater than one. Position and its source-coordinate function are absolutely continuous. On every compact interval away from birth, the incoming inverse source-coordinate function has bounded derivative, so the self emission time is absolutely continuous. The self delay has derivative at least one almost everywhere; its increasing inverse is therefore Lipschitz on such an interval. These facts justify both the chain rule and the change of integration variable used for the positive self density. Bounded speed gaps then give the same divergent logarithmic lower bound. A locally finite nonnegative derivative measure cannot contain that infinite positive density.

That measure statement does not follow merely from imposing the ordinary equation almost everywhere on an arbitrary bounded-variation function: a singular signed derivative would not be constrained by that equation. The primary explicitly identifies the stronger measure inequality and does not adopt it as an already specified weak law. Its stated exclusions of arbitrary signed singular updates, transverse motion, altered histories, and changed receiver rules are therefore necessary and accurate. A finite endpoint atom cannot cancel the positive divergence; the theorem does not select an impulse or a realized infinite-velocity outgoing trajectory.

**Falsifier for this assessment:** a primary proof revision that changes any of the identified premises or invalidates the incoming inverse, contribution signs, finite trace, or positive delay integration argument requires a new review. For the measured source state, an admissible finite-trace collinear trajectory in the declared ordinary or expressly stipulated positive-measure class would contradict the assessment and must be checked against the complete root inventory.

### Assessment of the measure-regularity clarification

The revised primary was inspected and its SHA-256 measured directly as `fa56f38ee15ce776127a9617fcf6cb59e577a116b10f483f62b4be991f8b13c8`. It makes two useful precision corrections in the bounded-variation discussion: the measure must have finite mass on a right neighborhood including the birth endpoint, and the incoming source-coordinate map needs continuous differentiability with positive derivative at the sampled source rather than an unqualified assertion of smoothness. Both corrections are accepted. Local finiteness solely in the open interval after birth would allow divergent mass toward its boundary; the explicit endpoint condition rules out that ambiguity. The incoming history can contain an acceleration change at release while its source-coordinate map remains continuously differentiable, which is the regularity used by the inverse argument.

Measured preservation check: an in-memory reversal of only the three identified prose replacements in this bounded-variation paragraph recovers the exact original primary digest recorded above. The ordinary proof and all other primary bytes are therefore unchanged by this clarification. The single-replacement instrument passed a known string control before this source comparison. The independent mathematical reference preceding the appended assessment remains untouched. The clarification sharpens the separate measure interpretation without changing the accepted finite-continuous-trace ordinary-root theorem.
