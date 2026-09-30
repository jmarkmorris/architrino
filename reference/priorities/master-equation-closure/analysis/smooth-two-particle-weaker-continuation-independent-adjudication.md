# Independent adjudication of weaker continuation at the first wake-speed event

**Accepted: the literal unchanged Master Equation has no continuation with a finite continuous velocity trace and locally absolutely continuous outgoing velocity in the uniform lattice-position neighborhood specified below.** Acceleration may be unbounded or discontinuous, and the equation need hold only almost everywhere. In particular, this excludes the proposed $C^1$ position, absolutely continuous velocity and locally integrable acceleration class. The proof does not transfer a future Taylor expansion from the smooth incoming history. The separately authored [subject theorem](smooth-two-particle-weaker-continuation.md) is accepted at this scope; an additional everywhere-pointwise class is excluded in §6.1.

The inputs are the [canonical Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form), the [accepted first global event](../lattice-research/analysis/smooth-two-particle-next-event-independent-adjudication.md), the [conditional smooth root-birth theorem](smooth-two-particle-next-event-root-birth.md) and the [accepted reciprocal-delay estimate](mec-008-self-delay-independent-adjudication.md). They remain unchanged. The event is $87/16<t_*\le351/64$, with a finite set of possible first identities and positive incoming radial acceleration at each. The same complete supplied past, $g=16$, $c_f=1$, alternating infinite lattice and stationary block prescription are retained.

## 1. What a weaker literal continuation means

Translate the event time to zero and fix any identity that first attains wake speed there. Write $X(0)=x_*$, $v(0)=e$, $|e|=1$. The accepted earlier path has $|v(s)|<1$ for every $s<0$ and a stationary sufficiently remote past. Its incoming acceleration has a finite limit with

$$
e\cdot a(0-)=\alpha>0.
$$

For a proposed outgoing continuation, assume:

1. $X$ is $C^1$ across zero, with the same $x_*$ and $e$. Its outgoing velocity is absolutely continuous on every compact interval $[a,b]\subset(0,\varepsilon)$. No right acceleration limit, bounded acceleration or future second derivative is assumed.
2. Almost everywhere, its derivative equals the literal canonical sum of the cross contribution $R(t)$ and every positive simple own-history row. That sum exists as a finite vector at almost every reception. No row is removed, no receiver playback factor multiplies its amplitude, and no added singular acceleration measure is included. A null set of exceptional reception times does not affect the integral argument.
3. The cross contribution is continuous at zero, with $R(0)=a(0-)$, and bounded on a sufficiently short outgoing interval. Section 5 derives this from the accepted lattice history and an explicit uniform position neighborhood.

The own row at emission $s<t$ is

$$
A_s(t)=\frac{g\,n(t,s)}{(t-s)^2|D_t(t,s)|},\qquad
n(t,s)=\frac{X(t)-X(s)}{t-s},\qquad
D_t=1-n\cdot v(s).
$$

The definition of $n$ here is on a positive root, where $|X(t)-X(s)|=t-s$. Same-label polarity makes the scalar coefficient positive. The zero-delay diagonal remains excluded. Positive roots at which the literal denominator is undefined cannot be reinterpreted by this theorem; the equation must have its stated almost-everywhere meaning.

These hypotheses are weaker than requiring $v\in AC([0,\varepsilon])$ and $a\in L^1([0,\varepsilon])$. The latter natural integral-solution class is an immediate special case. The proof below also excludes the former class, which initially assumes absolute continuity only away from the endpoint.

## 2. All nearby own contributions point forward

At the event itself, every positive-delay self chord is strictly shorter than its delay:

$$
|X(0)-X(s)|\le\int_s^0|v(u)|\,du<-s,\qquad s<0.
$$

Fix any negative emission cutoff. On a compact range of earlier emissions, the strict residual inequality has a uniform margin. The stationary remote past excludes all more distant emissions as well. Continuity of the future receiver position therefore implies that, for receptions sufficiently close to zero, every possible own root has emission arbitrarily close to zero. This is a root localization argument; it assumes no future Taylor coefficients or finite count of recent roots.

Continuity of $v$ at zero supplies a small common interval on which $|v(u)-e|<1/2$ and $|v(u)|\le M$ for some finite $M$. Every root chord then lies in that interval. Since

$$
n(t,s)=\frac1{t-s}\int_s^t v(u)\,du,
$$

all such roots obey $e\cdot n\ge c$ with $c=1/2$. Their acceleration projections are positive. A convergent sum of these rows cannot conceal cancellation: its projected summands are nonnegative, and their norms are at most $c^{-1}$ times their projections. In particular a finite projected sum also makes this local own-root sum absolutely convergent. No uniform bound on the number of roots or on their transmitter denominators is required.

Continuity of the cross field and $e\cdot R(0)=\alpha>0$ now give $e\cdot R(t)\ge\alpha/2$ after shortening the interval. The complete almost-everywhere equation implies

$$
\frac{d}{dt}(e\cdot v(t))\ge\frac\alpha2.
$$

Integrate on $[a,t]$ with $a>0$, then let $a\downarrow0$ using the continuous velocity trace. Consequently

$$
e\cdot v(t)\ge1+\frac\alpha2t,
\qquad
e\cdot[X(t)-X(0)]\ge t+\frac\alpha4t^2>t.
\tag{1}
$$

Thus forward motion past the wake cone follows from the full equation. It is not imported from the incoming acceleration or assumed as a proposed future.

## 3. A simple root emitted before the event is unavoidable

Let

$$
F(t,s)=|X(t)-X(s)|-(t-s).
$$

Equation (1) gives $F(t,0)>0$. For one fixed negative emission sufficiently separated from zero, $F(t,s)<0$ persists from its strictly negative event-time value. The intermediate value theorem therefore gives an emission $s(t)<0$ with $F(t,s(t))=0$.

For any $s_1<s_2<0$, strict subunit speed of the fixed earlier path gives $|X(s_2)-X(s_1)|<s_2-s_1$. The reverse triangle inequality then yields $F(t,s_2)>F(t,s_1)$. The negative-time root is unique. At this root,

$$
D_t(t,s(t))\ge1-|v(s(t))|>0.
$$

It is therefore simple at every sufficiently small positive reception, irrespective of degeneracies among other outgoing-emission roots. The $C^1$ implicit-function theorem makes $s(t)$ a $C^1$ function on the punctured outgoing interval. Root localization gives $s(t)\to0$ and

$$
\delta(t)=t-s(t)\longrightarrow0
\quad(t\downarrow0).
\tag{2}
$$

Only this one root branch will be used. The full finite/simple-section assumptions of the earlier uniform delay-floor theorem are unnecessary here: the fixed strictly subunit past supplies an explicit simple branch and its diagonal endpoint.

## 4. Reciprocal-delay variation contradicts the finite velocity trace

Differentiate the selected root equation on its positive-reception domain. Direct implicit differentiation gives

$$
s'=\frac{1-n\cdot v(t)}{1-n\cdot v(s)},\qquad
\delta'=\frac{n\cdot[v(t)-v(s)]}{D_t}.
$$

The canonical magnitude therefore satisfies the exact identity

$$
|A_s|\,|n\cdot[v(t)-v(s)]|
=g\left|(\delta^{-1})'\right|.
$$

The local velocity bound gives

$$
|A_s|\ge\frac{g}{2M}\left|(\delta^{-1})'\right|.
\tag{3}
$$

Neither division by the velocity difference nor monotone delay is assumed. All other own rows have nonnegative projection along $e$, so the full equation implies

$$
\frac{cg}{2M}\left|(\delta^{-1})'\right|
\le e\cdot v'(t)-e\cdot R(t)
\quad\text{almost everywhere}.
$$

Fix $b>0$ in this interval and integrate from $a$ to $b$, where $0<a<b$. Absolute continuity on this compact interval yields

$$
\frac{cg}{2M}
\left|\delta(a)^{-1}-\delta(b)^{-1}\right|
\le e\cdot[v(b)-v(a)]-\int_a^b e\cdot R(t)\,dt.
\tag{4}
$$

As $a\downarrow0$, the right side has a finite limit because velocity has a finite continuous trace and $R$ is bounded. The left side diverges by (2). This contradiction proves the exclusion.

The argument does not require acceleration to remain bounded or continuous, a future second-order expansion, a prescribed root-birth rate, a monotone selected delay, a finite count of other own roots, or a uniform lower bound on $D_t$ at the endpoint. Its independent reference is the direct canonical root identity and the projected integral inequality. The earlier delay-floor result supports the identity, but its additional global root-section hypotheses are not silently imported.

## 5. Why the actual lattice cross field has the required trace

The event certificate has uniform displacement below $0.265390942$ and positive distinct-label separation. Specify a hypothetical population continuation inside a common uniform displacement neighborhood $B=7/20<1/2$. This is a local mathematical neighborhood, not a speed cap, altered law or return to the original $1/16$ displacement class. Continuity at the event in the supremum norm of the lattice displacement sequence suffices to enter this neighborhood. Coordinatewise continuity of infinitely many paths alone does not suffice, so that weaker population topology is not claimed here.

For any distinct-label cross root with a post-event emission $s\ge0$, both positions would be inside this neighborhood and its range would be at least $1-2B=3/10$. At reception $0<t<3/10$, its delay $t-s\le t$ is smaller than that range. Such a root is impossible. Thus all cross emissions lie in the fixed accepted past. If $0<t<3/20$, the same range bound places all those emissions before $-3/20$.

Only finitely many earlier source histories were disturbed; the rest are the same stationary background. The fixed source velocities on the relevant past segment are continuous and strictly subunit, with a common margin because their nonstationary portions form a finite collection of compact intervals. The remote past is stationary. Each cross root is consequently unique and simple, remains away from zero range, and depends continuously on reception position and time. The full cross sum is the regular stationary field plus finitely many fixed-history corrections. Therefore it gives a bounded continuous $R(t,X(t))$ through zero.

Before the event the selected identity has no positive own roots. Its incoming equation is exactly $a=R$. Hence the cross-field trace obeys $e\cdot R(0,x_*)=\alpha>0$, with the accepted bound $\alpha>1.463081418064$ for every possible first identity. Simultaneous first-event identities cause no additional future-source terms: their cross emissions also remain in the earlier fixed past. No unique first label is needed for this application.

## 6. A direct lower bound and a nonsmooth control

The coordinator's separate direct argument supplies a useful second route. The accepted incoming $C^2$ path and $\alpha>0$ imply an incoming chord deficit

$$
|X(0)-X(-u)|\le u-c_0u^2
$$

for a positive $c_0$ and sufficiently small $u>0$. An arbitrary continuous future velocity has some finite bound $M>1$. At the selected root $s=-u(t)$, the triangle inequality gives

$$
t+u\le Mt+u-c_0u^2,
\qquad u^2\le\frac{M-1}{c_0}t.
$$

Thus $(t+u)^2\le C t$ on a short interval. The fixed pre-event source has $0<D_t\le2$, and the forward cone has $e\cdot n\ge1/2$. The selected projected row therefore satisfies

$$
e\cdot A_s(t)\ge\frac{g}{4Ct},
$$

whose integral diverges. This confirms nonintegrability without assuming the former smooth rate $\delta\sim2t$ or $A_s\sim t^{-3}$. It uses more incoming regularity than the main projected-variation argument, which needs only the positive cross-field trace.

A local geometric control makes the distinction explicit. Set $g=16$ and use the collinear path $X(t)=(t+t^2)e$ for negative $t$ near zero and $X(t)=(t+t^{4/3})e$ for positive $t$. Its velocity is continuous, its outgoing acceleration $(4/9)t^{-2/3}e$ is unbounded but integrable, and its future path has no second-order Taylor expansion matching the incoming acceleration. Direct substitution gives

$$
s(t)=-t^{2/3},\qquad
\delta(t)=t+t^{2/3},\qquad
D_t=2t^{2/3},\qquad
A_s(t)=\frac{8e}{t^{2/3}(t+t^{2/3})^2}\sim8t^{-2}e.
$$

This is a kinematic control, not an EOM solution or replacement supplied history. It verifies that the old $2t$ delay and $t^{-3}$ acceleration rates cannot be imposed on every $C^1$ continuation. The new exclusion survives precisely because it uses the canonical positive row and an integral contradiction instead.

The separate exact-rational instrument `root-control.py` first checks the smooth quadratic control $X=t+t^2$, recovering delay $2t$, transmitter factor $2t$ and the canonical $g=16$ row $2t^{-3}$. Its subsequent target uses $t=z^3$ at four positive rational values of $z$ in the nonsmooth control above. It verifies the root, source factor, reciprocal-delay identity and direct $1/t$ lower bound exactly. Its known and target receipts pass. This is a check of the displayed algebra and distinction between regularity classes, not a numerical evolution or an independent existence claim.

### 6.1. Everywhere pointwise solutions without an absolute-continuity assumption

A second exclusion class follows from the direct bound. Suppose $X$ is $C^1$ across the endpoint, $v$ is differentiable at every positive reception, and the full ordinary equation holds at every such reception. Absolute continuity is not assumed. The common-cone and cross-field arguments give $p'(t)\ge\alpha/2$ everywhere, where $p=e\cdot v$. By the mean value theorem, $p(t)-\alpha t/2$ is nondecreasing on every compact positive interval. The finite continuous trace then gives (1), and therefore the selected pre-event root.

Section 6 bounds its projection below by $k/t$ for a fixed $k>0$, while the cross projection and other own projections remain positive. Hence $p'(t)\ge k/t$ everywhere. Apply the mean value theorem to $p(t)-k\log t$ to obtain

$$
p(b)-p(a)\ge k\log(b/a),\qquad 0<a<b.
$$

This contradicts the finite trace as $a\downarrow0$. The argument is valid for an everywhere differentiable, everywhere-law solution even when absolute continuity was not included in its definition. Replacing everywhere by almost everywhere without restoring a condition linking derivatives to increments would invalidate this particular inference.

## 7. Excluded and unresolved interpretations

| Continuation notion | Disposition |
| --- | --- |
| $C^1$ position, velocity absolutely continuous through the event, literal locally integrable canonical acceleration | Excluded in the stated regular population neighborhood. |
| Finite continuous velocity trace, velocity absolutely continuous only on compact outgoing intervals, full literal equation almost everywhere | Also excluded by (4); integrability at the endpoint need not be assumed in advance. |
| $C^1$ position, velocity differentiable everywhere after the event, literal equation everywhere, without assumed absolute continuity | Excluded separately by the mean value theorem and the $1/t$ bound in §6.1. |
| A distributional equation whose acceleration is exactly a locally integrable canonical function | Excluded: its velocity has the corresponding absolutely continuous representative. |
| Continuous velocity with arbitrary singular-continuous variation, constrained only by a pointwise derivative equation almost everywhere | Not covered as an integral solution. Such an equation alone does not account for singular velocity variation; a distributional interpretation would require a singular acceleration component not supplied by the literal function-valued row sum. |
| Finite velocity jump to a strictly superunit right limit, with punctured absolutely continuous velocity and bounded cross remainder | Excluded separately in §7.1. A finite atom at the event cannot compensate for the divergent outgoing integral. |
| Other velocity jumps, generalized products or finite-part prescriptions at degenerate roots | No continuation is constructed or excluded in all such notions. Their meaning requires an additional mathematical formulation; no such event rule is adopted. |
| Arbitrary coordinatewise continuous infinite-population extensions without a uniform neighborhood or controlled cross sum | Outside the application proved in §5. The present proof does not supply an infinite-population summation theorem in that topology. |

The result strengthens the fixed-preparation obstruction. It supplies neither formal Lyapunov instability of the stationary lattice nor a typical populated-universe claim, and it does not establish nonexistence in every possible generalized continuation class.

### 7.1. Separate exclusion of a finite jump to strictly superunit velocity

The [equation-domain audit](smooth-two-particle-weaker-continuation-domain.md) supplies an additional conditional theorem. Preserve continuous position and the fixed strictly subunit incoming past, but allow a finite outgoing velocity limit $w$ with $|w|>1$, different from $e$. Require a $C^1$ path for positive times, velocity absolutely continuous on every compact outgoing interval, the full literal equation almost everywhere there, and a bounded cross remainder. The uniform position neighborhood of §5 is again sufficient for the population remainder bound; no future finite-support assumption is needed.

Independently, $X(t)-X(0)=tw+o(t)$ implies $F(t,0)>0$ for all sufficiently small $t>0$. The fixed incoming history therefore supplies the same unique simple negative-emission root $s(t)<0$ and delay $\delta(t)\to0$. There are no entirely outgoing roots: every sufficiently short outgoing velocity has projection greater than one on $w/|w|$, and so does its chord average. Compact-past and remote-past margins exclude all other negative-emission roots. The selected root is thus the complete local own-root set. The source velocity at the jump itself is never sampled, since the selected emission is strictly negative and $F(t,0)>0$.

The cone direction need not be the incoming $e$. Set $\theta=t/\delta\in(0,1)$. One-sided velocity limits give

$$
n(t)=\theta(t)w+[1-\theta(t)]e+o(1),\qquad |n(t)|=1.
$$

Every cluster direction lies in the intersection of the line segment $[e,w]$ with the unit sphere. Since $w\ne e$, that intersection has at most two points. The root and its direction are continuous for positive times; compactness then makes their endpoint cluster set connected. Explicitly, repeated transitions between disjoint neighborhoods of two alleged limiting directions would produce a third limiting direction outside those neighborhoods. The cluster set is consequently one unit vector $n_+$, and $n_+\cdot n(t)\ge1/2$ on a sufficiently short interval.

Project the canonical equation onto $n_+$. The same reciprocal-delay inequality (4), with this new direction and a finite bound for incoming and outgoing velocities, bounds the diverging reciprocal delay by a finite right-velocity difference and bounded cross integral. This is impossible. An atom at time zero has finite mass and does not cancel an infinite positive integral on the open interval afterward. The additional exclusion is therefore accepted; it does not classify every jump with a subunit right limit or a changed unit right direction, and it adopts no singular event update.

## 8. Independent review record and falsifiers

This independent derivation was written before reading the new subject proof. The mathematical reference is the canonical implicit-root derivative, complete forward-cone projection, fixed-past root construction and integrated reciprocal-delay contradiction. The coordinator's direct incoming-deficit bound is independently reconciled in §6. The old subjects, event receipts and reference instruments were not changed.

The result would be overturned by a path satisfying all stated hypotheses with a finite continuous velocity trace that violates the projected integral inequality, by a canonical sign or transmitter-Jacobian error, or by an omitted opposing own contribution despite the proved common cone. Application to the lattice would fail if a cross emission could enter the proposed future despite the uniform separation bound, if the stationary background or fixed-history corrections failed continuity, or if the accepted incoming positive radial-acceleration bound were invalid. A proposal outside the specified integral equation or population neighborhood is outside the theorem, not a counterexample to it.

The separately authored subject was read in full after this independent derivation was captured. Its common-cone argument, unique simple pre-event root, punctured absolute-continuity proof, direct incoming-deficit bound, uniform-position population application and everywhere-pointwise corollary agree with the independent arguments above. No mathematical correction was required. The subject's different nonsmooth control uses $t+t^{3/2}$ and a $t^{3/4}$ delay scale; direct substitution confirms its stated geometry without identifying that prescribed curve with an EOM solution.

The primary reviewed subject is frozen with SHA-256 `c04f4bd20910c88dee219d0ce5373378ba083222c0ea28fd2743d5835b5ebee2`. The separately authored domain audit's finite-superunit-jump theorem is accepted by the independent argument in §7.1. Its remaining source-velocity, exceptional-set and singular-measure distinctions were also read against the canonical equation. In particular, an almost-everywhere derivative equation is not a definition of an omitted singular derivative component, while a possible measure obtained from a future justified same-law limit is not ruled out merely by being singular.

The independent exact control has SHA-256 `9f4c02ee29dba415c359dbf4144ace53422d43f5b3405dc82c9684c50e1974c6`. Its source, known/target receipts, frozen subject snapshots and presentation-check records are retained under `.local-data/master-equation-closure/weaker-continuation/independent/`. No new physical simulation was run. The prior accepted event and reference inputs remain unchanged.
