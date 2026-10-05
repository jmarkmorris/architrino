# Independent adjudication of the class-level first-exit obstruction, with jump and infinite-limit extensions

## Verdict

**Accept** the [class-level continuous-velocity obstruction](collinear-review-integration-2026-10-03.md#class-level-continuous-velocity-obstruction), the [negative exponent range](logarithmic-critical-exponent-comparison.md#what-the-self-root-measure-proves) $n\le-1$, and the [capped incoming-segment uniqueness proof](capped-incoming-segment-uniqueness.md), each at its stated scope. **Extend** the first of these: under the hypotheses listed below, the exclusions that were previously proved only for the stationary release, namely finite velocity jumps, an exact reversal and an infinite one-sided velocity limit, hold for every history in the class. The extension is a new derivation by this reviewer. Its [separate adjudication](class-level-jump-extension-independent-adjudication-2026-10-03.md) accepts the Lemma and both theorems, in every case, with six corrections to wording and stated hypotheses; those corrections are applied in the text below.

**Claim grade:** derived, conditional on the unchanged inverse-square Master Equation with every positive-delay root retained, no speed cap and no event rule. All statements use $c_f=1$. Nothing here selects a continuation, an equation variation or a deferred task.

**Provenance and independence.** The reviewer proposed the class-level statement in the supplied read-only review of 2026-10-03 and did not write the subject proof. The argument below was constructed separately from it. It is organized by the right-hand velocity trace and rests on one lemma, that the acceleration measure has no atom at the event, which the subject does not use. Agreement with the subject is therefore agreement between two constructions, not a replay. The reviewer's earlier proposal is not counted as evidence.

## What is being claimed, in words

Two opposite-polarity architrinos approach along one line. One of them, called the receiver, reaches wake speed while the two are still apart. The question is how the receiver's motion can continue. The answer for the whole class is the same as for the stationary release: it cannot continue by any motion whose velocity has bounded variation and which satisfies the equation through the event. The reason has two parts. If the velocity stays continuous, the partner's pull carries the receiver above wake speed, where it immediately meets its own wake at vanishing range and the accumulated self contribution is infinite. If the velocity jumps, the equation would have to supply an impulse at the instant of the event, and it supplies none, because no earlier emission of any source arrives concentrated at that instant.

## Hypotheses

Place the event at $t=0$. Let $x(t)$ be the receiver's coordinate measured so that it increases as the receiver moves toward its partner, and let $u=x'$ be its inward speed. Write $K_p>0$ for the pair coefficient and $K_s>0$ for the receiver's self coefficient.

- **H1, complete monotone past.** For every $s<0$ the path is continuously differentiable with $0\le u(s)<1$, and $u(s)\to1$ as $s\uparrow0$.
- **H2, regular partner root.** The partner has opposite polarity and lies on the inward side at positive distance at $t=0$. The receiver's causal root in the partner's history at $t=0$ is emitted at a time $s_p<0$, at positive range, where the partner's path is continuously differentiable with Lipschitz velocity and its transmitter factor $D_p=1-\mathbf n\cdot\mathbf V_p(s_p)$ is positive. This root is the only positive-delay root in the partner's history at $t=0$, the partner's incidence residual is bounded away from zero on its past outside a neighbourhood of $s_p$, and the partner's own position remains continuous after $t=0$. All three hold when the partner's retained past is strictly below wake speed. No other source is present.
- **H3, the equation holds before the event.** On some interval $(-\eta,0)$ the receiver's acceleration is the partner row.

Mirror symmetry is not assumed. Apart from these conditions the partner's motion after $s_p$ is unconstrained, and it may reach wake speed itself: emissions between $s_p$ and $0$ stay off the receiver's causal set near the event by uniqueness at $t=0$ and compactness, and emissions after $t=0$ cannot arrive before the positive gap has been crossed. A history in the class $\mathcal H_{\mathrm{att}}^{\mathrm{reg}}$ of the [first-exit packet](../../../../office-of-research/research-history/review-packets/master-equation-admissible-history-pre-coincidence-first-exit-theorem-2026-07-29.md) whose first exit is speed equality at positive separation, with its retained past continuous up to the event, satisfies H1 to H3 for each label.

## Three geometric facts

Define $h(t)=x(t)-t$ and $k(t)=x(t)+t$. A self root is an earlier time $s<t$ at which the receiver's own wake, emitted at $s$, reaches it at $t$. With the receiver ahead of its emission site this requires $x(t)-x(s)=t-s$, that is $h(s)=h(t)$; such a chord points inward. With the receiver behind its emission site it requires $x(s)-x(t)=t-s$, that is $k(s)=k(t)$; such a chord points outward.

**Fact 1, monotone past.** By H1, $h'=u-1<0$ and $k'=u+1>0$ on the past. Hence $h$ is strictly decreasing and $k$ strictly increasing on $(-\infty,0]$, no two past times are joined by a self chord, and the receiver has no self root before or at the event.

**Fact 2, bounded partner row near the event.** By H2 and the implicit-function theorem, for receiver positions and times near $(x(0),0)$ the partner root persists, depends continuously on them, and gives an inward row $P$ with $0<m\le P\le M<\infty$. This holds for any continuation with continuous position, since the bound depends only on where the receiver is, not on how fast it moves. Emissions of the partner after $t=0$ cannot arrive before the positive gap has been crossed.

**Fact 3, regular incoming approach.** By H3 and Fact 1 the incoming acceleration equals $P$, so $u$ is continuously differentiable up to the event with $u'(0^-)=a>0$. Consequently $1-u(s)=a\lvert s\rvert+o(\lvert s\rvert)$, $h(s)-h(0)=a s^2/2+o(s^2)$ and $k(s)-k(0)=2s+o(s)$ as $s\uparrow0$.

## The acceleration measure has no atom at the event

Write the equation in its measure form: the distributional derivative of velocity equals the acceleration measure. On any set of reception times at which every positive-delay causal root is ordinary, meaning isolated with nonzero transmitter factor, this measure is the canonical root sum times $dt$, with the source-side transmitter factor only. It can assign mass to a single reception instant only if a set of emission times of positive length is received at that one instant with positive delay.

**Lemma.** Under H1 to H3, for any continuation with continuous position, the acceleration measure assigns zero to the single instant $\{0\}$.

*Proof.* The partner contribution near $t=0$ has the bounded density $P$ of Fact 2 and so gives no mass to a point. A self contribution at reception time $0$ would need an emission time $s<0$ with $h(s)=h(0)$ or $k(s)=k(0)$. Fact 1 excludes both. The set of own emissions received at $t=0$ with positive delay is empty, and the partner's is a single regular point, so no set of emission times of positive length is received at that instant. $\square$

The zero-delay diagonal $s=t$ is excluded by the equation's own convention and is not used.

## Theorem: no bounded-variation continuation

**Theorem 1.** Assume H1 to H3. There is no continuation on any interval $[0,t_1]$ with continuous position and velocity of bounded variation that satisfies the measure form of the equation on $(-\eta,t_1)$.

*Proof.* A function of bounded variation has a finite right limit $U=u(0^+)$. Consider the possible values.

*Case $U=1$.* The velocity is continuous at $0$ and positive on some $(0,t_2)$. The receiver therefore keeps moving inward, as it did throughout its past, so it lies ahead of every one of its earlier emission sites. Every self chord points inward, and a same-polarity contribution along an inward chord is inward. The self measure is thus nonnegative. With Fact 2, $u(t)-1\ge mt$ for $0<t<t_2$, so $u>1$ there and $h$ is strictly increasing on $(0,t_2)$. Since $h$ is strictly decreasing on the past, each small $t>0$ has exactly one self root $s(t)<0$, with $h(s)=h(t)$, and no root between two outgoing times. Put $\rho=t-s$, $w_-=1-u(s)>0$ and $w_+=u(t)-1>0$. The transmitter factor of this root is $w_-$, so its row is $A_s=K_s/(\rho^2w_-)$. Differentiating $h(s(t))=h(t)$ gives $ds/dt=-w_+/w_-$, hence $d\rho/dt=(w_-+w_+)/w_-$ and

$$
A_s\,dt=\frac{K_s}{\rho^2\,(w_-+w_+)}\,d\rho .
$$

Each gap is bounded above by some $B$ near the event, so their sum is at most $2B$, and $\rho\downarrow0$ as $t\downarrow0$. Hence $\int_\delta^{t}A_s\,dt\ge(K_s/2B)\,[1/\rho(\delta)-1/\rho(t)]\to\infty$ as $\delta\downarrow0$. The velocity would have infinite variation. Contradiction.

*Case $U>1$.* Then $u>1$ on some $(0,t_2)$. As in the previous case the receiver lies ahead of every earlier emission site, so every self chord points inward and the self measure is nonnegative; $h$ is strictly increasing on $(0,t_2)$, so the single root $s(t)<0$ exists, no root joins two outgoing times, and the same identity holds. Now $w_+\to U-1$ and $w_-\to0$, so the denominator stays bounded and the integral again diverges. Contradiction with bounded variation on $(0,t_2)$.

*Case $U<-1$.* Then $u<-1$ on some $(0,t_2)$, so $k$ is strictly decreasing there, and by Fact 1 each small $t$ has one root $s(t)<0$ with $k(s)=k(t)$. Its chord points outward, its transmitter factor is $1+u(s)\in[1,2)$, and by Fact 3 its range is $\rho=\tfrac12(1-U)\,t+o(t)$. Its row is outward with magnitude $K_s/(\rho^2(1+u(s)))\ge 2K_s/((1-U)^2t^2)\,(1+o(1))$, which is not integrable. No inward self chord exists, because $h(t)<h(0)<h(s)$ for $s<0<t$, and none joins two outgoing times, because both $h$ and $k$ are strictly monotone there. The bounded partner row cannot cancel the divergence. Contradiction.

*Case $-1\le U<1$.* The velocity jumps by $U-1\ne0$ at the event, so its distributional derivative has the atom $(U-1)\,\delta_0$. By the Lemma the acceleration measure has no atom there. Contradiction.

Every finite right limit is excluded. $\square$

The fourth case covers the exact reversal $U=-1$ and every restart below wake speed. It does not need the detailed outgoing root inventory, because the failure is at the instant of the event and not after it.

## What the weaker, punctured formulation allows

Some earlier arguments imposed the equation only on compact intervals strictly after the event. That formulation cannot see an impulse at $t=0$. Its class-level content is as follows.

**Theorem 2.** Assume H1 to H3. Let the continuation have continuous position on $[0,t_1]$ and velocity locally absolutely continuous on each $[\delta,t_1]$, $\delta>0$, with the ordinary-root equation holding almost everywhere there, so that receptions with a nonisolated root or a vanishing transmitter factor form a null set, and suppose the velocity has a right limit at $0$, finite or infinite.

1. A right limit $U$ with $\lvert U\rvert>1$ or $U=1$ is impossible, by the first three cases above, which use only the equation after the event.
2. An infinite right limit of either sign is impossible. If $u\to+\infty$, the receiver moves inward, every contribution is inward, so $u$ is nondecreasing on $(0,t_2)$ and cannot descend from $+\infty$ to a finite value. If $u\to-\infty$, the receiver moves outward; no inward self chord exists because $h(t)<h(0)<h(s)$; every self contribution is outward; and with Fact 2, $u(t)-u(\delta)\le M(t-\delta)$, which cannot hold as $u(\delta)\to-\infty$.
3. For $-1<U<1$ a punctured solution exists and is unique near the event. Near $0^+$ every speed is below one in magnitude, so by the strict inequalities $h(t)<h(0)<h(s)$ and $k(s)<k(0)<k(t)$ there is no self root, and the motion solves the ordinary equation $x''=P(t,x)$, whose right side is Lipschitz in $(t,x)$ by H2, with data $x(0)$, $x'(0^+)=U$.

Part 3 is why the punctured formulation alone is not a continuation rule. It admits a one-parameter family of outgoing segments, one for each assigned $U$, and each of them violates the equation at the event by the missing impulse $(U-1)\,\delta_0$ of Theorem 1. For $U=-1$ the stationary analysis proves the corresponding existence and uniqueness by a [running-maximum argument](stationary-binary-first-interval.md#the-punctured-integral-equation-selects-a-subfield-outgoing-segment). That argument uses only Facts 1 to 3 and transfers to the class; it was read and its inputs checked here, and it was not reconstructed.

## A worked control

Take the local model path $x(s)=s+as^2/2$ for $-1/a<s\le0$ and $x(t)=t+mt^2/2$ for $t\ge0$, with $a,m>0$. Continued to all $s\le0$ the parabola moves outward before $s=-1/a$, violates H1, and has a second self root on an outward chord, emitted at $s=-(2+\sqrt{4+2a\,k(t)})/a\approx-4/a$, with bounded row $-K_sa^2/32$ at leading order; the control is therefore local. Then $h(s)=as^2/2$ and $h(t)=mt^2/2$, the root is $s=-t\sqrt{m/a}$, and

$$
\rho=t\left(1+\sqrt{m/a}\right),\qquad w_-=t\sqrt{am},\qquad
A_s=\frac{K_s}{t^3\left(1+\sqrt{m/a}\right)^2\sqrt{am}} .
$$

The self row grows as $t^{-3}$ and its time integral diverges as $t^{-2}$. The identity gives the same value: $w_-+w_+=t(\sqrt{am}+m)$ and $d\rho/dt=1+\sqrt{m/a}$, so $K_s\,(d\rho/dt)/(\rho^2(w_-+w_+))$ reduces to the displayed expression. This is exact algebra on a prescribed path and serves only to check the root and the identity; the path is not a solution.

## Assessment of the three subjects

**Class-level continuous-velocity obstruction.** Accepted. It is the case $U=1$ of Theorem 1. Its hypotheses are H1 to H3 in other words. Two clarifications are worth recording. First, mirror symmetry of the past is not needed, only H2 for each receiver separately. Second, the phrase "nonnegative inward self measure" should be read as a consequence of inward motion on both sides of the event, as shown above, and not as an extra assumption.

**Negative exponent range.** Accepted. With a distance response proportional to $r^n$ the same root gives $A_s\,dt=K_n\rho^n\,d\rho/(w_-+w_+)$, whose lower bound $(K_n/B)\int_0\rho^n\,d\rho$ diverges exactly when $n\le-1$. The Lemma and the jump cases of Theorem 1 use only the geometry of the root and the non-integrability of the outgoing row, so for $n\le-1$ the jump cases $\lvert U\rvert>1$ also fail, and the zero-atom case is independent of $n$. The subject's statement that $n>-1$ is not thereby shown sufficient is correct: the lower bound becomes finite, but the true integrand still contains the vanishing denominator. Its dominant-balance exponent $p=(n+1)/(3-n)$ was rederived here from the gap equality $a\delta^2/2\sim bt^{p+1}/(p+1)$ and is correct as an inferred asymptotic for $-1<n<1$.

**Capped incoming-segment uniqueness.** Accepted. The census step is sound: the speed bound gives $S+y_j(S)\ge T_c$ for every emission at or after cap entry, while the receiver's side satisfies $T-y_i(T)<T_c$, so every partner root lies in the strictly increasing incoming past and is unique. Projection then makes inward speed nondecreasing and bounded by one, which forces it to equal one. The proof needs absolute continuity of velocity and collinear competitors, as it says, and it supplies nothing at coincidence.

## Consequences and limits

For the unchanged equation, a collinear attracting history that reaches wake speed at positive separation under H1 to H3 has no continuation of bounded-variation velocity. Together with the [downward-crossing obstruction](../../analysis/downward-wake-speed-crossing-obstruction.md), regular collinear passage through wake speed is excluded in both directions under each theorem's hypotheses.

The result does not cover the following, and none should be inferred from it.

- A first exit of a different kind: a fold or birth of a partner root, loss of monotonicity, or an edge of the retained history.
- Pasts that are not monotone inward, that already contain self roots, or that have been above wake speed.
- Non-collinear motion after the event. A transverse departure changes the chord geometry and is not examined.
- Additional sources. A population can supply opposing contributions that are not integrable, which is the only way the downward theorem leaves open.
- Velocities without a one-sided limit, and generalized equations that define an event contribution by a limiting procedure. The Lemma is a statement about the equation as written, not about every regularization of it.

**Falsifiers.** A history satisfying H1 to H3 with a self root at or before the event defeats Fact 1. A continuation with continuous position for which the partner row is unbounded near the event defeats Fact 2. A bounded-variation continuation satisfying the measure equation with any finite right trace defeats Theorem 1; the place to look is an admitted contribution with the opposite sign to those listed in the relevant case. An explicit derivation of a nonzero event atom from the unchanged equation defeats the Lemma.

## Coverage

Read for this review: the three subjects named in the verdict, the continuation-alternative sections of the [stationary analysis](stationary-binary-first-interval.md#local-continuation-alternatives-for-the-original-collinear-history), the class definition in the first-exit packet, and the [review task](../work-queue.md#independently-review-collinear-endpoint-and-exponent-proofs). No instrument was run. The interval certificate for the stationary event, the logarithmic encounter treatment and the capped coincidence analyses were not re-examined.
