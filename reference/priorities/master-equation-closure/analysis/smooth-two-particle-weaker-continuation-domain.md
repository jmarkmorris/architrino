# The equation domain for a weaker continuation through the first speed event

## Scope and conclusion

This is an independent analytical audit of the solution class, based on the canonical Master Equation, the accepted first-event certificate and the accepted same-transmitter delay-floor assessment. It uses the same supplied past, infinite alternating lattice, stationary summation prescription, $g=16$ and $c_f=1$. It changes no equation, numerical history, accepted reference or event rule.

**Derived conclusion, [independently accepted](smooth-two-particle-weaker-continuation-independent-adjudication.md):** a position path that is $C^1$ across the event, whose velocity is locally absolutely continuous on the open interval immediately afterward, and which satisfies the complete canonical acceleration sum almost everywhere cannot continue through the accepted event if the other-label contribution remains continuous there. The proof below uses one simple root emitted strictly before the event. It therefore does not need a finite simple census at every later reception, nor a smooth continuation of the newborn root through the event itself. The separate finite-superunit-jump extension in §5 also received independent mathematical acceptance on its explicit piecewise-regular and bounded-cross hypotheses; no conclusion about arbitrary finite impulses follows from it.

There are two material boundaries. First, continuity of each path separately in an infinite population does not automatically give a uniform bound on all cross contributions. A common local position neighborhood suffices to confine cross emissions to the fixed accepted past; it does not require uniform future velocities or a finite future disturbed population. Alternatively, continuity of the complete cross remainder must be an explicit hypothesis. Second, dropping absolute continuity and retaining only an acceleration equation almost everywhere permits singular changes of velocity that the almost-everywhere derivative does not record. That is a genuine gap in the proposed nonexistence argument, not evidence that such a continuation solves the complete lattice problem.

## 1. What the canonical text actually supplies

The following clauses are in [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md). Line locations refer to the audited bytes; the section names give stable document routes.

| Canonical clause | Exact requirement or boundary | Consequence for this task |
| --- | --- | --- |
| [Path-History Sum and Integral Representation](../../../../content/markdown/aaa/dynamics/master-equation.md#path-history-sum-and-integral-representation), lines 83–163 | The delta collapse gives a sum weighted by $1/|\partial_s g|$ “provided the active roots are simple.” The factor is $D_t=1-n\cdot V(s)$; the receiver factor controls root playback. | A regular hit needs a pointwise source velocity at the selected emission and nonzero $D_t$. Source acceleration is not an input to that hit. |
| [Caustic Transit and Finite Impulse](../../../../content/markdown/aaa/dynamics/master-equation.md#caustic-transit-and-finite-impulse), lines 332–411 | A transverse ordinary fold at positive separation has locally integrable strength of order $|t-t_f|^{-1/2}$. Finite-order variants retain an exponent below one. | Infinite pointwise acceleration at an isolated reception does not by itself exclude continuous velocity or an absolutely continuous continuation. This lemma does not cover simultaneous vanishing range. |
| [Auxiliary Dual-Mollified Regulator](../../../../content/markdown/aaa/dynamics/master-equation.md#auxiliary-dual-mollified-regulator-for-proof-and-computation), lines 775–795 | The stated recovery has a finite complete isolated simple-root set, positive range and a positive transmitter margin. A regulator cannot assign a singular-event value without the required convergence and event certificates. | The history integral is not an automatic definition of every nonsimple-root sum. A regulator limit at this event remains a theorem obligation. |
| [Self-Hit Regime](../../../../content/markdown/aaa/dynamics/master-equation.md#self-hit-regime), lines 1214–1260 | Geometric roots need positive delay and the corresponding admitted branch data. Simple self hits need some superunit interval history. | Equality in the causal equation alone does not define a finite acceleration at a nonsimple root. |
| [Canonical Form](../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form), lines 1365–1535 | All causal roots of all transmitters, including the same persistent identity, enter the total. A self row has positive polarity product. The zero-delay endpoint is excluded, and that exclusion does not certify a finite transition from it. | Neither omitting a troublesome positive self root nor changing its sign is an unchanged-law continuation. $H(0)=0$ does not remove a root at every positive delay immediately afterward. |
| [Conditional Well-Posedness](../../../../content/markdown/aaa/dynamics/master-equation.md#conditional-well-posedness-for-the-auxiliary-finite-width-model), lines 2470–2484 | The text distinguishes $C^1$ and weak-derivative history spaces and says: “An absolutely continuous history formulation requires its own theorem and join convention.” | The canonical text has not already accepted an arbitrary almost-everywhere, bounded-variation or measure-valued continuation merely by displaying the same root equation. |

The finite-width theorem target also says there is no accepted instantaneous self-kick and that a coincident same-transmitter root birth is not an accepted transition in that target. This is a domain boundary, not a proof that every possible generalized formulation is impossible.

The source velocity issue is pointwise. An absolutely continuous source position has a velocity only almost everywhere unless a continuous representative or additional differentiability is supplied. A causal root can select a point of the exceptional set, so a source velocity defined only as an $L^1$ equivalence class is insufficient to evaluate that hit. Changing that representative on a null set leaves its integral unchanged but can change a root weight. A $C^1$ position path avoids this ambiguity even when its acceleration exists only almost everywhere.

## 2. Coherent candidate classes and their obligations

Write $A_i[X](t)$ for the complete canonical acceleration wherever that sum is defined. The distinction between the following candidates must be made before a continuation claim.

| Candidate class | Mathematical interpretation | Present status |
| --- | --- | --- |
| Classical regular continuation | $X_i$ has a continuous velocity and sufficient further smoothness; every retained row is evaluated pointwise on its regular chart. | The accepted root-birth theorem excludes $C^3$ passage for this event. |
| Integral continuation with continuous velocity | $X_i\in C^1$; $V_i$ is locally absolutely continuous after the event; the complete acceleration sum equals $V_i'$ almost everywhere. On each compact regular subinterval, $V_i(b)-V_i(a)=\int_a^b A_i[X](t)\,dt$. | A coherent weaker target using the same regular per-hit kernel. The conditional exclusion in §3 addresses it. No acceleration continuity is assumed. |
| Continuous velocity with a singular derivative component | $X_i\in C^1$, but $V_i$ need not be absolutely continuous; one imposes only $V_i'=A_i[X]$ almost everywhere. | The equation ignores a possible singular continuous derivative. The proof in §3 does not extend to this class. An integral or measure formulation must determine the missing component. |
| Velocity of bounded variation with jumps | $X_i(t)=X_i(0)+\int_0^t V_i(s)\,ds$; $DV_i$ has absolutely continuous, atomic and possibly singular continuous parts. | A distributional equality $DV_i=A_i[X](t)\,dt$ permits no singular part when $A_i[X]\in L^1$. A nonzero jump needs a derived singular acceleration measure or a new update prescription; a root selecting the jump time also needs a source-velocity convention. A finite impulse derived uniquely from the unchanged interaction would not, merely because it is a jump, constitute a changed physical law. |
| Regulator-limit continuation | A declared family of regularized histories converges in a stated topology, with all required root and stationary-sum limits controlled. | A legitimate separate theorem target. Neither existence of a finite-regulator path nor a chosen value at the diagonal establishes its limit or independence from the regulator. |

The local absolute continuity in the second row need only hold on compact subintervals of $(t_*,t_*+\epsilon)$, with a finite continuous velocity at $t_*$. The proof integrates first on $[t_*+\delta,t]$ and then takes $\delta\downarrow0$; it does not assume an integrable acceleration at the endpoint in advance.

The term “finite impulse” in the positive-range fold calculation denotes an integral of ordinary acceleration. Its bound tends to zero as the time window shrinks. That result does not supply a finite nonzero atomic velocity jump at the fold.

## 3. A pre-event emission root avoids the later-root census gap

### Hypotheses

Translate the accepted event to time zero and select any label that reaches wake speed there. Let

$$
e=V(0),\qquad |e|=1,\qquad \alpha=e\cdot A(0)>0.
$$

The accepted incoming path is smooth, has $|V(s)|<1$ for every $s<0$, and is stationary sufficiently far in the past. There is no positive own root at zero. Consider a hypothetical extension satisfying:

1. $X\in C^1$ across zero and $V=X'$ is locally absolutely continuous on $(0,\epsilon)$.
2. The other-label acceleration $R(t)$, including the fixed infinite stationary contribution, is continuous at zero, with $R(0)=A(0)$.
3. The complete canonical equation holds almost everywhere. Every simple positive own root is retained with its positive canonical weight. Any complete own sum is defined so that adding rows in a common forward cone cannot subtract their positive projections. Nonsimple receptions may be omitted from pointwise evaluation only on a set of reception times of measure zero; assigning them a nonzero singular acceleration measure is a different formulation requiring its own justification.

The last condition includes the ordinary finite-root sum and any genuinely convergent complete countable sum. It does not prescribe a value for a nonsimple row. If the right-hand side is undefined on a set of positive reception measure, the proposed almost-everywhere solution has not been specified.

### Step 1: every possible own row is recent and points forward

At zero, the incoming subunit history gives

$$
F(0,s)=|X(0)-X(s)|+s<0\qquad(s<0).
$$

On any compact delay interval bounded away from zero this is a uniform negative margin. The stationary remote past excludes arbitrarily old own roots uniformly for nearby receptions. Continuity of $X$ therefore confines all possible own roots at sufficiently small positive receptions to an arbitrarily small neighborhood of $(t,s)=(0,0)$.

Continuity of $V$ at zero then gives constants $M<\infty$ and $c>0$ such that every such chord satisfies

$$
|V(t)|,|V(s)|\le M,\qquad
e\cdot n=e\cdot\frac{1}{t-s}\int_s^t V(u)\,du\ge c.
$$

Thus every own contribution has positive projection along the same fixed $e$. This conclusion uses no uniqueness or simplicity for all other roots; it applies to each regular row wherever the complete equation is meaningful.

### Step 2: the equation forces an outward displacement beyond the zero-time wake

By cross-remainder continuity, $e\cdot R(t)\ge\alpha/2$ after shrinking the interval. Let $P=e\cdot V$. The canonical positive own sum gives

$$
P'(t)\ge\frac\alpha2
\quad\text{almost everywhere on }(0,\epsilon).
$$

Integrate on $[\delta,t]$ and use continuity at zero to obtain $P(t)\ge1+\alpha t/2$. A further integral gives

$$
e\cdot[X(t)-X(0)]\ge t+\frac\alpha4t^2,
\qquad
F(t,0)=|X(t)-X(0)|-t>0.
$$

This inference is exactly where absolute continuity is needed. An almost-everywhere derivative inequality alone is insufficient; §5 supplies an explicit counterexample to that implication.

### Step 3: one simple root necessarily samples the unchanged pre-event past

Choose a fixed $s_0<0$ sufficiently close to zero. Since $F(0,s_0)<0$, it remains negative for small positive $t$. Together with $F(t,0)>0$, continuity gives a root $s(t)\in(s_0,0)$.

It is unique in the negative-emission past. Indeed, for $s_1<s_2\le0$,

$$
F(t,s_2)-F(t,s_1)
\ge(s_2-s_1)-|X(s_2)-X(s_1)|>0,
$$

because the pre-event velocity is strictly subunit. At the root, the range is positive and

$$
D_t=1-n\cdot V(s(t))\ge1-|V(s(t))|>0.
$$

The implicit-function theorem supplies a $C^1$ root graph on the open positive-time interval, since the receiver position is $C^1$ and this emission remains in the unchanged smooth past. No post-event source derivative is sampled by this row. The root satisfies $s(t)\to0$ and $\tau(t)=t-s(t)\to0$ as $t\downarrow0$, since a negative limiting emission would give an own root at the root-free event.

### Step 4: this one row has an infinite positive integral

Differentiate its causal equation. With $A_s=g n/(\tau^2|D_t|)$,

$$
\tau'=\frac{n\cdot[V(t)-V(s)]}{D_t},\qquad
g\left|(\tau^{-1})'\right|
=|A_s|\,|n\cdot[V(t)-V(s)]|
\le2M|A_s|.
$$

The common cone and the complete equation imply, almost everywhere,

$$
\frac{cg}{2M}\left|(\tau^{-1})'\right|
\le e\cdot A_s\le P'-e\cdot R.
$$

Integrating from $\delta$ to a fixed small $t$ bounds the reciprocal-delay variation by a finite velocity difference and a bounded cross integral. The right side remains bounded as $\delta\downarrow0$, while the left side is at least

$$
\frac{cg}{2M}\left|\tau(\delta)^{-1}-\tau(t)^{-1}\right|\longrightarrow\infty.
$$

This is the contradiction. It uses the accepted [reciprocal-delay identity](mec-008-self-delay-independent-adjudication.md#independent-reciprocal-delay-derivation), but does not invoke that assessment's uniform entrance-delay theorem or its complete finite simple-census hypothesis. The single tracked root is already guaranteed by the unchanged pre-event history. No $(t-t_*)^{-3}$ Taylor asymptotic for the hypothetical weaker path is needed.

## 4. Nonsimple sets, multiplicity and the exact remaining qualifications

The [accepted delay-floor assessment](mec-008-self-delay-independent-adjudication.md#births-folds-and-accumulation-limits) correctly leaves positive-delay folds and changing branch lineages outside its uniform-floor theorem. They are not automatically counterexamples to the argument in §3.

| Proposed escape | Audit conclusion |
| --- | --- |
| A finite number of nonsimple reception times | They can be irrelevant to an integral equation if the remaining acceleration is locally integrable and the pointwise equation is required only almost everywhere. They do not remove the simple negative-emission branch, which exists at every small positive reception. |
| Countably or uncountably many exceptional reception times | Cardinality is the wrong criterion. A countable set is null; an uncountable set can be null or have positive measure. The almost-everywhere equation needs its complete right-hand side on a full-measure set. |
| A continuum of own emission roots at one reception | At every accumulation point where the source path is $C^1$ and the range is positive, the emission derivative vanishes. The ordinary simple-root formula does not assign these roots finite weights. A separate integral or singular-chart construction is needed at that reception. |
| Infinitely many simple recent own roots at a regular reception | In the common cone each contributes at least $cg/[\delta_0^2(1+M)]$ to the fixed projection. Their complete sum diverges. A finite almost-everywhere acceleration therefore already excludes such a count at almost every reception near this event. |
| Opposite playback signs cancel two own roots | They cannot. The canonical weight uses $|D_t|$, while the same-label polarity is positive. Opposite $D_t$ signs reverse playback, not acceleration weight. All sufficiently recent directions lie in the same cone. |
| A new nonsimple root masks the old-emission root | The old-emission root has $D_t>0$ because its source remains strictly subunit. A different future root does not change that fact. If the additional contribution makes the complete equation undefined on positive measure, an a.e. solution has not been defined. |
| A singular opposing contribution from another label | This would defeat the continuous-cross hypothesis. It must arise from the actual complete same-law population, not an adjustable cancellation term. The accepted separated first-event geometry supplies the route for ruling it out in a controlled population neighborhood. |

The ordinary positive-range fold lemma is compatible with these conclusions. Its integrable singularity may permit continuous velocity. The present contradiction instead concerns a positive-cone row whose delay tends to zero and whose reciprocal delay has unbounded variation. A finite number of positive-delay folds in other rows cannot provide the required infinite negative integral.

### The infinite-population qualification

The accepted event has a finite disturbed past, a regular stationary complement and displacement below $0.265390942$. The current subject gives a stronger sufficient condition than a uniform future-speed bound: keep every candidate displacement in one local ball $B=7/20<1/2$, with the same grouped stationary sum. The entire accepted past also lies in this ball. For distinct lattice anchors, every cross range, including a proposed post-event emission, is at least

$$
|X_i(t)-X_j(s)|\ge|i-j|-|y_i(t)|-|y_j(s)|\ge1-2B=\frac3{10}.
$$

For $0<t<3/20$, the causal equality therefore gives $s=t-r<-3/20$. Every cross emission is in the fixed accepted past, irrespective of how many future velocities vary. The earlier nonstationary source histories form a finite collection and are strictly subunit on the sampled compact interval. Their transmitter margins are positive; the stationary remote past and unchanged stationary complement retain their regular sum. The complete cross field is consequently bounded and continuous in time and the receiver's position. It has the incoming trace $R(0)=A(0)$.

The [accepted weaker-continuation application](smooth-two-particle-weaker-continuation-independent-adjudication.md#5-why-the-actual-lattice-cross-field-has-the-required-trace) derives this position-only argument. Continuity of the displacement sequence in the supremum norm supplies the needed right neighborhood from the accepted endpoint margin. Pointwise $C^1$ continuity of infinitely many individual paths does not itself supply one common position ball. The conditional exclusion must not be presented as covering arbitrary coordinatewise continuations without proving the complete cross remainder continuous, or at least proving the positivity and integrability conditions used in §3. No such uncontrolled continuation is constructed here.

## 5. What fails when absolute continuity is removed

### Singular continuous velocity

Let $C$ be the usual continuous Cantor staircase on $[0,1]$. It is constant on each removed middle-third interval, whose union has full Lebesgue measure, so $C'=0$ almost everywhere. Its defining recursion gives $C(t)\ge t/2$; for $t\ge1/3$ this follows from $C(t)\ge1/2$, and for smaller positive $t$ repeated use of $C(t)=C(3t)/2$ reduces the claim to that range.

Set

$$
p(t)=1+t-2C(t),\qquad x(t)=\int_0^t p(u)\,du.
$$

Then $x\in C^1$, $p(0)=1$, and $p'=1$ almost everywhere, but $p(t)\le1$. On a sufficiently small interval $p$ is also positive by continuity. Thus the inference “positive acceleration almost everywhere forces speed above its initial value” is false without absolute continuity. This is an exact regularity counterexample, not a solution of the complete lattice Master Equation. In distributional terms,

$$
Dp=dt-2\,dC.
$$

The negative singular continuous measure is invisible in the almost-everywhere equation $p'=1$. A weak statement that retains only that equation permits it; a statement $Dp=dt$ does not. The singular measure would need to be determined by an additional theorem about the canonical history interaction or by a declared generalized update prescription. It cannot silently be inferred from the ordinary row formula.

### A velocity jump

The analogous elementary control is a continuous piecewise linear position with slopes $v_-$ and $v_+$. Its acceleration is zero almost everywhere, but its distributional velocity derivative contains $(v_+-v_-)\delta_0$. Hence a.e. equality alone fails to determine the jump. If a candidate adopts $DV=A[X]dt$ with locally integrable ordinary acceleration, no such atom is available. A nonzero jump then requires a justified singular acceleration measure, and a source hit exactly at the jump needs a convention for the source velocity in $D_t$.

These controls identify what an exclusion theorem has not proved. They do not establish existence, uniqueness or admissibility of singular-continuous or jump continuations for the supplied lattice. Conversely, the absence of an already accepted convention is a formulation gap, not by itself a mathematical nonexistence theorem for every future formulation.

### A finite jump to a strictly superunit right velocity is still excluded

A useful additional conditional exclusion does not assume continuity of velocity at the event. Suppose position is continuous, the unchanged incoming velocity tends to $e$ with $|e|=1$, and the outgoing velocity has a finite right limit $w$ with $|w|>1$. Assume the outgoing path is $C^1$ for positive times, its velocity is locally absolutely continuous on every compact outgoing interval, and the complete other-label remainder is bounded. The complete canonical equation is imposed almost everywhere away from the jump.

Then $X(t)=X(0)+wt+o(t)$ gives $F(t,0)=(|w|-1)t+o(t)>0$. The same pre-event monotonicity argument supplies exactly one simple root $s(t)<0$, with $s(t)\to0$ and $\tau(t)\to0$. There are no roots whose whole chord lies after zero: with $\widehat w=w/|w|$, the right velocity limit supplies $\widehat w\cdot V(u)>1$ on a sufficiently short outgoing interval. Every entirely outgoing chord has average projection greater than one and consequently has length greater than its delay. Older roots stay excluded by the incoming compact-delay and remote-past margins. Thus the negative-emission root is the complete own-root set locally.

Its direction also has a limit, even for a noncollinear jump. Put $\theta(t)=t/\tau(t)\in(0,1)$. The one-sided velocity limits give

$$
n(t)=\theta(t)w+[1-\theta(t)]e+o(1),\qquad |n(t)|=1.
$$

Every directional cluster point therefore lies in the intersection of the line segment $[e,w]$ with the unit sphere, which contains at most two points because $w\ne e$. The root and direction are continuous for positive times. Their cluster set at zero cannot contain two separated points without also containing an intermediate point: any repeated transition between disjoint neighborhoods would supply such an intermediate limiting subsequence. Hence $n(t)$ has one unit-vector limit $n_+$.

For sufficiently small time, $n_+\cdot n(t)\ge c>0$. Project the single self row along $n_+$ and apply the reciprocal-delay variation estimate from §3. The outgoing velocity remains bounded and has the finite limit $w$, while the cross remainder has a bounded integral. The reciprocal delay nevertheless diverges. This excludes the proposed continuation. A finite velocity atom assigned at zero cannot compensate for an infinite positive integral on the open interval immediately afterward. The argument does not use the value of source velocity at the jump, because the tracked emission is strictly negative.

### A finite jump to a subunit or different unit velocity needs a distinct decision

If $|w|<1$, the entire sufficiently short outgoing velocity history is strictly subunit. The incoming history is also subunit except at its limiting endpoint. All small own chords are then shorter than their elapsed times; older own roots remain absent by compactness. The ordinary cross acceleration is bounded. Thus its ordinary time integral supplies no velocity atom at zero. This excludes a nonzero jump in the direct integral or distributional formulation $DV=A[X]dt$.

It does **not** by itself exclude a singular acceleration measure obtained as a separately justified limit of regularized histories. Such a proof would have to establish the finite atom, its direction and magnitude, independence from the approximation, and compatibility with all retained causal histories. An arbitrary reset to a chosen subunit velocity supplies none of that information. The canonical positive-range caustic lemma cannot provide it here because its fixed separation floor fails at the diagonal birth; moreover its shrinking-window integral tends to zero rather than to a nonzero atom.

If $|w|=1$ but $w\ne e$, the superunit argument does not apply: the sign of $F(t,0)$ is decided by higher-order outgoing behavior. A subunit outgoing segment again has no ordinary impulse mechanism. An exactly straight unit-speed segment has a continuum of nonsimple own roots and is outside the regular per-hit definition. Other unit-speed-limit passages can involve singular root charts. No exclusion or construction covering every such finite-jump passage is supplied by this audit. Their status under a reception-time measure formulation remains unresolved until that formulation and its event measure are derived or explicitly specified.

Accordingly, the supported classification is precise: continuous finite-velocity passage is excluded in the locally absolutely continuous outgoing class of §3; any finite jump to a strictly superunit right velocity is excluded under the stated piecewise-regular and bounded-remainder hypotheses; ordinary integrable acceleration cannot produce a nonzero jump; and a finite same-law singular impulse into other right states remains an unproved event-prescription problem, rather than something ruled out merely by the word “jump.”

## 6. Evidence boundary and falsifiers

The domain proof and singular-continuous/jump classification were drafted independently from the canonical clauses and accepted root geometry before reading the concurrent weaker-continuation subject and adjudication. Those two completed documents were then read for reconciliation: their compact-outgoing-interval absolute-continuity hypothesis matches §3, and neither proof assumes endpoint $L^1$ acceleration. Their position-only cross-range argument is adopted explicitly above. Their additional everywhere-pointwise exclusion uses an everywhere derivative inequality and the mean value theorem; it does not apply that inference to an arbitrary almost-everywhere derivative. Independent review of the separate superunit right-jump argument accepted its unique negative-emission root, outgoing-only chord exclusion, connected directional cluster argument and projected variation contradiction. The right-unit changed-direction and singular-measure cases remain outside that acceptance.

No simulation was run. The mathematical controls are the strict pre-event chord inequality, monotonicity of the negative-emission residual, the exact reciprocal-delay identity, the Cantor-staircase example and the elementary jump distribution. The accepted numerical event inputs remain $87/16<t_*\le351/64$, positive event radial acceleration and separated distinct labels; no new numerical value or actual first-label identification is asserted.

Audited-input hashes, the presentation checker and its preserved predecessor, the known-control receipt and the final document check are retained in `.local-data/master-equation-closure/weaker-continuation/domain/`. The presentation check covers KaTeX syntax, math delimiters, linked-file existence and whitespace; it does not validate the mathematics. The accepted exclusion is falsified by a complete a.e. canonical solution satisfying §3's path, remainder and summation hypotheses but avoiding the forced simple pre-event-emission root or violating its integrated inequality. A non-AC velocity or uncontrolled cross remainder violates a hypothesis and does not falsify that conditional statement. Acceptance of a broader class requires its own source-evaluation, root-multiplicity, integral and event conventions before existence or nonexistence can be decided.
