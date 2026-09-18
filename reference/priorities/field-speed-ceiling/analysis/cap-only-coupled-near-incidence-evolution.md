# Coupled capped evolution near mirror incidence

**Date:** 2026-09-15. **Status:** exploratory formulation and conditional obstruction proved below; no event update, response regularization, or continuation selected. **Authority:** unchanged Master Equation reception plus the speed cap, interpreted on regular finite ledgers by the previously discussed least-change response. **Grade:** derived regular equations and conditional inequality; unresolved complete singular-event dynamics.

## Result in context

**Operator clarification (2026-09-15):** the intended field-speed-ceiling model has zero self-action even on exact co-moving characteristic families. In subsequent use of the equations below, omit the self acceleration by this stated model scope while retaining the labeled emission history. The displayed general self-channel formula documents the audited canonical comparison, not an authorized self response in the clarified FSC model. The self-active Gaussian diagnostic is excluded. No derivation of this equality-boundary self rule from the canonical singular integral is claimed. This removes self acceleration as a possible compensating term; it does not define the partner incidence event or select its outgoing velocity.

Updating the trajectory does not remove the near-incidence partner singularity for a continuous outgoing launch with the incoming velocity. A moving-root argument gives a lower bound $K/(2t^2)$ on its backward contribution, without holding the receiver straight. If the complete remainder is locally integrable and there is no unclassified contribution, this contradicts a finite continuous outgoing velocity. This does not exclude velocity jumps, changes to the singular solution concept, a nonintegrable competing contribution with a demonstrated cancellation, or every possible cap-only continuation.

The [continuous-emission calculation](cap-only-continuous-emission-crossover.md) treated a prescribed straight trace. The [rapid-reversal geometry](cap-only-rapid-reversal-geometry.md) showed that immediate rebound creates a different nonordinary family. This note formulates the coupled problem and proves the continuous-launch obstruction under explicit remainder conditions. It advances part of the older [separating-trace theorem target](near-contact-separating-trace-incompatibility-theorem-target.md), not that target's complete-ledger or event-closure obligations.

## 1. Retained state and geometry

Set $c_f=1$, crossover at $t=0$, and assume exact mirror symmetry with equal polarity magnitudes and opposite signs:

$$
X_1(t)=x(t),\qquad X_2(t)=-x(t),\qquad v(t)=x'(t).
$$

The incoming cap is $x(s)=s$, $v(s)=1$ on $[-L,0]$. The earlier admissible history must also be retained; specifying the cap alone does not authorize deleting older emissions. The current task is to determine the right path with $x(0)=0$ and $|v|\le1$. A continuous-launch test imposes $v(0^+)=1$; a general event investigation must instead determine the right velocity from a justified event equation rather than silently impose that continuity.

Let $K=\kappa|q_1q_2|>0$. Equal magnitudes make the self-channel magnitude coefficient the same $K$, with opposite sign convention from the attractive partner channel.

## 2. Root sets must be recomputed from the evolving path

Partner and self residuals are respectively

$$
g_{\mathrm p}(t,s)=|x(t)+x(s)|-(t-s),
\qquad
g_{\mathrm s}(t,s)=|x(t)-x(s)|-(t-s),
\qquad s<t.
$$

For a positive-range simple partner root define

$$
n_{\mathrm p}=\operatorname{sign}(x(t)+x(s)),
\qquad D_{t,\mathrm p}=1+n_{\mathrm p}v(s),
$$

and for a positive-range simple self root define

$$
n_{\mathrm s}=\operatorname{sign}(x(t)-x(s)),
\qquad D_{t,\mathrm s}=1-n_{\mathrm s}v(s).
$$

On a chart whose complete causal census is ordinary, finite, and noncoincident, the signed scalar ledger is

$$
a_{\mathrm{ord}}[x](t)
=-K\sum_{s\in\mathcal C_{\mathrm p}(t)}
\frac{n_{\mathrm p}}{(t-s)^2|1+n_{\mathrm p}v(s)|}
+K\sum_{s\in\mathcal C_{\mathrm s}(t)}
\frac{n_{\mathrm s}}{(t-s)^2|1-n_{\mathrm s}v(s)|}.
$$

The sums consume the full retained history. The zero-delay diagonal is excluded from ordinary reception. A nonordinary root or characteristic family is not silently left out: its presence prevents this formula from being the complete acceleration until its response is justified by the governing law.

Indeed, under the speed bound, equality in $|x(t)-x(s)|\le\int_s^t|v|\le t-s$ requires a straight unit-speed self segment. Such self roots form the characteristic case, not a license to assign zero self response. No ordinary simple self hit can be inserted to cancel the partner row under a globally capped history, but a nonordinary self-family remains an unresolved domain question.

## 3. Coupled cap response on regular charts

For a complete finite net acceleration $a$, the regular equations are

$$
x'=v,
\qquad
v'=P(v,a),
$$

where

$$
P(v,a)=\begin{cases}
a,&-1<v<1,\\
\min(a,0),&v=1,\\
\max(a,0),&v=-1.
\end{cases}
$$

Equivalently $v'+N_{[-1,1]}(v)\ni a$ on the corresponding regular solution class. This explicitly preserves backward acceleration at the positive boundary and suppresses further negative acceleration only after reaching the negative boundary. The response is applied to the complete sum, not to channels separately. The bare speed inequality does not itself define this response or its extension to singular events; this is the regular cap interpretation being investigated.

At $t=0$, the retained partner cap has a continuum of roots and the self cap is also nonordinary. Consequently the displayed finite-ledger evolution cannot simply be initialized by evaluating $a_{\mathrm{ord}}(0)$. A singular response, if derivable, must be obtained separately. No pulse shape or smoothing has been chosen to fill that gap.

## 4. The moving partner root during a continuous outgoing launch

Assume a hypothetical right path has $x\in C^1([0,h])$, $v(0)=1$, $|v|\le1$, and locally absolutely continuous velocity on $(0,h]$. Shrink $h$ so that $v(t)>1/2$. Then $x(t)>0$ for $t>0$. For a new partner emission $0\le s<t$, the direction is positive and the causal equation becomes

$$
x(t)+x(s)=t-s.
$$

Define

$$
H(s)=s+x(s),\qquad E(t)=t-x(t).
$$

Then $H'(s)=1+v(s)>3/2$, $H(0)=0$, $E(t)\ge0$, and $H(t)-E(t)=2x(t)>0$. There is exactly one root

$$
s(t)=H^{-1}(E(t))\in[0,t).
$$

If $E(t)>0$ it is a post-event emission; if $E(t)=0$ it is the crossover emission. In the latter case continuity with the incoming source velocity gives a simple partner root with $D_t=2$; no frozen-root suppression is used. The exact canonical partner contribution is

$$
a_{\mathrm p}(t)
=-\frac{K}{[t-s(t)]^2[1+v(s(t))]}.
$$

Since $0<t-s(t)\le t$ and $0<1+v(s(t))\le2$,

$$
\boxed{a_{\mathrm p}(t)\le-\frac{K}{2t^2}.}
$$

This bound tracks the evolving path and emission time. It does not substitute the straight-trial value for the actual row.

One can also recover its leading coefficient. Continuity of $v$ gives $x(t)=t+o(t)$ and $E(t)=o(t)$. The inverse bound $H(s)>3s/2$ implies $s(t)=o(t)$. Hence $t-s(t)\sim t$, $v(s(t))\to1$, and

$$
a_{\mathrm p}(t)=-\frac{K}{2t^2}\,[1+o(1)].
$$

## 5. Conditional contradiction for the complete evolution

Now additionally assume the full acceleration is defined on $(0,h]$ and equals

$$
a(t)=a_{\mathrm p}(t)+R(t),\qquad R\in L^1(0,h),
$$

with no omitted or unclassified stratum. This is a complete-remainder hypothesis, not a conclusion about the unresolved self family. For the positive velocities in this interval, $P(v,a)\le a$: in the interior equality holds, and at $v=1$ the projection only removes positive acceleration. Therefore

$$
v'(t)\le-\frac K{2t^2}+R(t)
$$

almost everywhere. Integrating from $\delta>0$ to fixed $t\le h$ gives

$$
v(t)-v(\delta)
\le-\frac K2\left(\frac1\delta-\frac1t\right)
+\int_\delta^tR(u)\,du.
$$

The right side tends to $-\infty$ as $\delta\downarrow0$, while the left side remains bounded and tends to $v(t)-1$. This is a contradiction.

**Conditional conclusion:** no continuous velocity-preserving outgoing launch exists in this mirror class with the unchanged partner reception and a complete locally integrable remainder. A finite-duration continuous reversal starting exactly at incidence is included, because continuity would first leave an interval with positive velocity. There is no such interval under these hypotheses, however short it is chosen.

This conclusion does not say that the cap permits velocity to exceed its bound; it says that this proposed solution class cannot satisfy the coupled equations at all. It also does not decide the nonordinary event, prove that the full remainder is integrable, or exclude a singular cancellation. An instantaneous rebound or other jump is outside this continuous-launch hypothesis and must have its own full root/response account.

## 6. What a complete event solution still needs

Three tasks remain mathematically distinct:

1. Define or derive the complete labeled response at the incidence family, rather than infer it from total source weight or omit it.
2. Obtain the right-hand velocity and retained state from that response, allowing the investigation to test jumps rather than borrowing the old zero-impulse convention.
3. Evolve the resulting state with the new root census, including characteristic families. Exact rebound has the persistent older partner family identified in the rapid-reversal note; it is not a regular initial state supplied automatically by the speed cap.

No numerical run was launched from an undefined initial ledger. Doing so would require a selected event value, cutoff, or smoothing. Such a calculation could be useful as a named diagnostic, but would not by itself establish cap-only continuation or approximation independence.

## Verification and falsifiers

### Exploratory route: accumulated-acceleration parameter through the event

The operator asks whether a different mathematical organization could resolve the singularity. One candidate is to separate raw magnitude from signed balance before examining a singular limit. This is a proposed analytical method, not a new clock in the ontology, a new response law, or an adopted event update.

On any complete finite ordinary chart with channel contributions $a_k(t)$ and positive

$$
\Lambda(t)=\sum_k|a_k(t)|,
\qquad b(t)=\frac{\sum_k a_k(t)}{\Lambda(t)},
\qquad |b(t)|\le1,
$$

define a calculation parameter $\theta$ by $d\theta/dt=\Lambda(t)$. This parameter has units of velocity; it is not physical time. Zero-ledger intervals retain the ordinary time parameter. Positive homogeneity of the cap projection gives the exactly equivalent regular equations

$$
\frac{dt}{d\theta}=\frac1\Lambda,
\qquad
\frac{dx}{d\theta}=\frac v\Lambda,
\qquad
\frac{dv}{d\theta}=P(v,b).
$$

Thus the velocity derivative in this parameter is bounded by one. Large acceleration magnitude appears in the conversion back to ordinary time instead of an unbounded velocity derivative. Every contribution remains in the net sum; the separate absolute values normalize the parameter and do not change the physical response.

For a supplied purely backward ledger, $b=-1$, and a finite parameter interval of length two carries velocity from $+1$ to $-1$, after which the cap holds it. If a sequence of actual coupled solutions concentrates such a transition into an ordinary-time interval tending to zero, it could produce a bounded jump. That sequence and its limit are not established here. In particular, an infinite integral of $\Lambda$ cannot simply be relabeled as a finite parameter interval, and a changing sign of $b$ can cause arbitrarily large velocity variation despite a speed bound.

The substantive target is the limit of the complete signed balance $b$, together with the source-time roots and reconstructed time. Expressions such as infinity divided by infinity are not evaluated in the sharp law. One must use an already justified finite chart or a declared auxiliary resolving family, prove the balance and constrained flow converge, and test whether different admissible resolutions yield the same transition. Self-family and partner-family contributions must be resolved together; omitting either can change $b$ and select an artificial event.

Success would be a cap-only event-transition theorem: equal admitted incoming histories determine the same outgoing velocity and retained wake state, independently of the auxiliary resolution, while recovering the unchanged regular law away from the event. Failure would be two admissible resolutions with different transitions, persistent undefined channel weights, absence of convergence, or a limiting history that fails the complete root census. Those outcomes would expose missing event information rather than justify choosing a preferred regulator. This method is worth trying because it directly addresses the operator's bounded-velocity intuition without first changing the inverse-square kernel.

Verification is analytical: differentiate the root residuals to obtain the denominators, solve the monotone scalar root equation implicitly, bound its range and denominator, and integrate the resulting differential inequality. The known prescribed straight case $x(t)=t$ gives $s=0$, $D_t=2$, and $a_{\mathrm p}=-K/(2t^2)$, matching the direct canonical row. This is an algebraic check, not an independent numerical validation.

The conditional obstruction is falsified by a path satisfying all its assumptions for which the root equation, canonical sign/weight, projection inequality, or integrated bound fails. A nonintegrable compensating contribution or a velocity jump does not refute it; either changes an explicit hypothesis and identifies a separate route to examine. The actual event and self-family response remain the limiting proof obligations.
