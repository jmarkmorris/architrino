# Exact-mirror continuation selection analysis

**Status:** derived negative for the currently declared solution class and its presently available selectors; the operator subsequently selected Option A and retained the multivalued relation without adopting the identified activation-selection clause. **Owner:** FSC-006b/FSC-005. **Primary input:** [Trailing-front delayed-ignition local-existence theorem](trailing-front-activation-dichotomy.md). **Decision record:** [Continuation-selection operator decision](../decisions/continuation-selection-operator-decision-2026-09-02.md). **Claim boundary:** this note derives the selector obstruction but neither supplies a selector nor changes the canonical ordinary law, proposed ceiling response, or proposed exact-mirror event map.

## Decision question

After the proposed zero-impulse exact-mirror restart, does an existing solution principle select either the exact straight trace or one unique positive braking-onset time?

Use normalized units $c_f=1$, coincidence time $T_{\mathrm c}=0$, speed deficit $m=1-v$, and accumulated deficit $E'=m$. The proved local alternatives are

$$
E(t)=m(t)=0
$$

for the straight trace, and, for every freely chosen $u_*>0$, the trace that remains straight through $u_*$ and then solves

$$
E'=m,
\qquad
m'=\frac{K}{2\left(t-E/2\right)^2},
\qquad
E(u_*)=m(u_*)=0.
$$

Every one of these traces has the same complete labeled history through its selected $u_*$. Immediate sustained activation at $u_*=0$ is excluded by the nonintegrable $K/(2t^2)$ coefficient, but every positive $u_*$ gives a finite smooth active right-hand side.

Plainly: the equation has no difficulty calculating the braking after a positive start time has been supplied. Its missing datum is which positive start time, if any, is allowed to be the first one.

## Existing-principle audit

| Candidate principle | Exact effect on this chart | Selection verdict | Authority |
| --- | --- | --- | --- |
| Declared absolutely continuous velocity and almost-everywhere restart equation | Admits the straight trace and every positive-waiting branch because the acceleration switch occurs at one measure-zero time while velocity stays continuous. | No selection. | Current proposed solution class. |
| Picard--Lindelof uniqueness on the active chart | Gives a unique braking segment after $u_*$ is supplied because the active right-hand side is smooth there. | Does not choose $u_*$. | Standard local ODE theorem already used by the local-existence proof. |
| Tangent-cone least-change ceiling response | Projects a complete already-formed ledger. On the straight trace there is no active partner row to project; on a braking branch the new row is backward and the response is the identity below the ceiling. | Does not decide whether the row first activates. | Derived under the proposed constrained-response axiom. |
| Continuous acceleration and pointwise satisfaction at every ordinary-chart time | Excludes every positive-waiting branch because its acceleration jumps from zero on the left to $K/(2u_*^2)>0$ on the right. The straight trace remains. | Selects straight locally, but only by adding a stronger regularity law. | Not present in the packet and not derived from the canonical ordinary equation. |
| Filippov or Krasovskii closure of the discontinuous activation boundary | Requires a full neighborhood or off-domain extension of the one-sided physical state domain. A zero-on-the-inactive-side extension gives a set-valued boundary containing zero and positive acceleration; other extensions can give a different closure. | No packet-defined unique selection; the extension itself would be new data. | External mathematical solution concept, not adopted by this packet. |
| Single-valued semiflow requirement | Demands one future for each complete history but contains no rule that chooses straight or any particular $u_*$. | A well-posedness requirement, not a selector. | Unmet FSC-006b/FSC-007 objective. |
| Pointwise minimal or maximal scalar solution | Ordering by the collinear deficit $m$ makes straight the minimal branch. There is no maximal positive-waiting branch because $u_*>0$ has no earliest admissible member and $u_*=0$ is excluded. The order is special to this scalar mirror reduction and is not a coordinate-free history-space order. | Straight only after adding an order-selection convention. | Not adopted and not generalizable from the present evidence. |
| Entropy, action, conservation, or stability criterion | No such native criterion has been derived for this event class. | Cannot select. | Unavailable; each is a downstream closure target or prohibited import at this layer. |

Plainly: one can force straight passage by demanding smoother acceleration or by declaring the smallest scalar deficit to win. Those are new choices. The principles already inside the proposed model calculate each branch but do not rank the branches.

## Approximation-independence diagnostic

No admissible approximation family is currently part of the event-completed solution definition. Uniform convergence of paths and velocities alone cannot select, because the straight solution and each positive-waiting solution can each be used as its own constant approximating sequence.

Even among smooth threshold repairs, the discontinuity permits different limits. A Lipschitz activation smoothing that vanishes at $E=0$ and starts from $E=m=0$ remains exactly straight. By contrast, a smooth nonnegative seed of vanishing total size placed just before any selected $u_*>0$ makes $E$ positive; after the seed disappears, the unchanged smooth active ODE applies, and continuous dependence on its initial data recovers the $u_*$ braking branch on every compact interval strictly to the right of $u_*$. Both repairs can converge to the sharp law away from the activation boundary, but their solution limits differ.

This is a diagnostic of the missing specification, not a claim that either repair is physically or canonically admissible. A genuine approximation selector would have to declare one parameterization-independent approximation class and prove that every member converges to the same continuation. No such theorem or declared class exists in the packet.

Plainly: “take the smooth limit” is not yet a rule. One smooth limit stays straight; another arbitrarily small seed can choose any later braking time. The allowed approximation family must be specified before its limit can carry authority.

## Minimum additional selection postulate

The narrowest scale-free clause that selects straight passage in the isolated exact-mirror chart is an activation-selection clause at the margin-zero plateau:

> An inactive ordinary channel may leave a received-source-clock plateau only when an isolated positive-separation root with $D_r>0$ has already been produced by the receiver history generated from the complete admitted ledger with that channel omitted. The channel is admitted at the first such crossing. It may not supply the acceleration that creates its own first strict receiver-side crossing condition.

On the isolated exact-mirror straight trace, omitting either inactive partner channel leaves a zero ledger, hence $D_r=0$ and no independently produced crossing. The clause therefore keeps both clocks on their plateaus and selects straight passage. On a separate chart where the channel-omitted history is already well-posed, if another admitted wake contribution first slows a receiver, the partner channel may activate at its first genuine isolated crossing; the clause does not suppress that ordinary consequence. This note does not claim that the required channel-omitted evolution is already well-posed in a general many-label history.

This is minimum in the following scoped sense:

1. it adds no numerical scale or prescribed waiting time;
2. it changes no raw wake, kernel, weight, polarity, or complete-ledger-before-response order;
3. it changes no already active ordinary root below the ceiling;
4. it governs only the first admission of a margin-zero inactive channel; and
5. it does not assign a contact impulse, rebound, conservation law, or later breather.

Plainly: a wake channel may respond after something else has made it catch the receiver, but it may not bootstrap itself from “not catching” to “catching” by using the acceleration that would exist only after it had already been admitted.

## If a unique braking onset is desired instead

The current state supplies no distinguished positive $u_*$. Selecting braking therefore requires strictly more data than the scale-free straight selector: a deterministic history functional

$$
u_*=\tau(\mathcal H_{\mathrm c})>0
$$

together with the instruction to activate the partner channel at that time. The functional's domain, invariance under admissible reparameterization, dependence on $K$ and retained history, and behavior under perturbation would all be new foundational data. Merely requiring a single-valued evolution does not define $\tau$.

Plainly: the equation offers every positive alarm time but contains no alarm clock. Choosing one braking onset means adding the clock or trigger to the law.

## Exact verdict and falsifiers

**Derived verdict:** no currently declared, approximation-independent solution principle selects straight passage or a unique positive braking onset. More strongly, no current FSC theory or hypothesis implements a cause that changes the zero-ledger straight state into the delayed-braking state at a positive time. Continuous-acceleration, scalar-minimality, and a restricted approximation limit can select straight only after adding a stronger solution or selection rule. A unique braking onset requires an additional trigger functional. The minimum scale-free new datum for the isolated mirror case is the displayed activation-selection clause, which selects straight passage; it is identified here but not adopted.

Plainly: the branch theorem proves what the motion can do after someone supplies an alarm time. The present model contains no alarm process, so the waiting time cannot be reported as a caused prediction.

This verdict is overturned if one of the following is demonstrated:

1. an already adopted packet clause, overlooked here, excludes either the straight trace or every positive-waiting branch;
2. the complete-ledger census or vector embedding in the local-existence theorem fails;
3. a declared parameterization-independent approximation class derived from existing premises has a proved unique limit; or
4. an existing coordinate-free order, entropy, action, or semigroup law derived inside $\mathbb{A}\mathbb{A}\mathbb{A}$ ranks these continuations without adding foundational data.

The proposed activation-selection clause is falsified as the minimum necessary straight selector if a weaker already-derived rule selects the same trace, or if a canonical approximation theorem selects a positive-waiting branch without an independently produced crossing deficit.

## Closure goal

Preserve the operator-selected multivalued relation at current FSC authority. Treat the scale-free activation-selection clause and every other selector as a separate future proposal requiring independent derivation and operator authorization.
