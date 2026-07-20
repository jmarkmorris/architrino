# The Master Equation Receiver-Factor Correction

This document explains the scoped, implemented correction to the Master Equation: the receiver's wake-crossing rate does not multiply the base acceleration. The transmitter's motion still matters because it changes how densely successive wake surfaces are laid down in space. The receiver's motion changes how the selected emission time moves through the transmitter's history, but that playback rate is not itself acceleration strength.

The corrected base equation is

$$
\boxed{
\mathbf A_r(T_r)
=
\sum_t
\sum_{T_t\in\mathcal C_{r\leftarrow t}(T_r)}
\kappa\,\sigma_{tr}\,|q_tq_r|
\frac{1}{r^2}
\frac{c_f}{|D_t|}
\hat{\mathbf r}_t
}
$$

Its status is deliberately narrow:

- **Completed scoped migration:** the receiver factor $|D_r|/c_f$ is removed from the canonical base acceleration, the EOM solver, and Borg's live v1 request path on the certified transmitter-side domain.
- **Conditional derivation:** $c_f/|D_t|$ follows from uniform wake emission in transmitter time and the causal-root change of variables.
- **Retained postulates:** the inverse-square spatial dependence, radial line of action, polarity rule, linear superposition, and uniform emission measure remain model commitments unless separately derived.
- **Passed within scope:** the simple-root derivation, ordinary-fold integrated acceleration, first-order static-transmitter discriminator, contract migration, certified-budget identity checks, and fail-closed regression tests.
- **Open beyond scope:** coincident same-transmitter continuation, conservation on general histories, complete observer-level recovery, and any separately derived receiver-velocity-dependent acceleration.

Nothing in this correction says that receiver velocity can never affect the complete dynamics. It says only that the root-playback identity $D_r/D_t$ does not justify multiplying this base acceleration by $|D_r|/c_f$.

## Terminology

| Symbol or term | Meaning |
| --- | --- |
| $T_r$ | reception time: the absolute time at which acceleration is evaluated |
| $T_t$ | emission time: an earlier absolute time on the transmitter's history |
| transmitter | the architrino whose past emission reaches the receiver; position $\mathbf X_t(T)$, velocity $\mathbf V_t(T)$, polarity $q_t$ |
| receiver | the architrino accelerated at $T_r$; position $\mathbf X_r(T)$, velocity $\mathbf V_r(T)$, polarity $q_r$ |
| $\mathbf r_t$ | emission-event separation $\mathbf X_r(T_r)-\mathbf X_t(T_t)$ |
| $r$ | $\|\mathbf r_t\|$ |
| $\hat{\mathbf r}_t$ | $\mathbf r_t/r$, directed from the transmitter's emission site toward the receiver |
| root | an emission time $T_t$ whose wake surface reaches the receiver at $T_r$ |
| $\mathcal C_{r\leftarrow t}(T_r)$ | the set of all active roots from transmitter $t$ to receiver $r$ at $T_r$ |
| $D_t$ | $c_f-\hat{\mathbf r}_t\cdot\mathbf V_t(T_t)$, the transmitter-side wake-spacing factor |
| $D_r$ | $c_f-\hat{\mathbf r}_t\cdot\mathbf V_r(T_r)$, the receiver-side wake-crossing rate |
| fold | a root birth or death event at which $D_t=0$ |
| $\sigma_{tr}$ | $\operatorname{sign}(q_tq_r)$: positive for like polarity and negative for unlike polarity |

The subscript $t$ means transmitter and the subscript $r$ means receiver. The canonical notation is $D_t$ for the transmitter-side factor and $D_r$ for the receiver-side factor.

## 1. The Causal Hit

A wake surface emitted by transmitter $t$ at $T_t$ reaches receiver $r$ at $T_r$ only when

$$
g(T_r,T_t)
\equiv
r-c_f(T_r-T_t)
=0.
$$

The equation compares two distances:

- $r$ is the distance from the transmitter's emission site $\mathbf X_t(T_t)$ to the receiver's reception site $\mathbf X_r(T_r)$;
- $c_f(T_r-T_t)$ is the radius reached by the wake surface during the elapsed absolute time.

A solution $T_t$ is a root. Every active root identifies one past emission event that contributes to the receiver's acceleration now. Curved or super-field-speed transmitter history can produce more than one active root, so the equation sums all of them.

Only the emission site enters the acceleration geometry. The transmitter's position at $T_r$ has no causal role in the arriving wake and does not appear in the proposed equation.

For an eternal transmitter history whose speed remains strictly below $c_f$, the causal function is strictly monotone and has one root under the usual reach assumptions. In a finite retained history, no-root intervals and roots crossing the history boundary must be handled explicitly; those are not interior fold events.

## 2. Why Transmitter Velocity Changes the Base Acceleration

Assume the transmitter emits wake uniformly per unit transmitter time. Consider the wake emitted during a small interval $dT_t$. Along the emission ray, the oriented spacing between neighboring wake surfaces is

$$
D_t\,dT_t
=
\left(c_f-\hat{\mathbf r}_t\cdot\mathbf V_t(T_t)\right)dT_t.
$$

If the transmitter moves toward the receiver along the emission ray, its later emission site moves closer while the earlier wake continues expanding. Neighboring wake surfaces are compressed. If it moves away, they are stretched. This is a spatial change in the arriving wake itself, not a change caused by how the receiver moves through it.

The same result follows directly from the hit condition. At fixed reception event,

$$
\frac{\partial g}{\partial T_t}
=
c_f-\hat{\mathbf r}_t\cdot\mathbf V_t(T_t)
=D_t.
$$

Collapsing a uniform transmitter-time wake integral onto its simple roots therefore gives

$$
\int dT_t\,f(T_t)\,\delta\!\left(g(T_r,T_t)\right)
=
\sum_{T_t\in\mathcal C_{r\leftarrow t}(T_r)}
\frac{f(T_t)}{|D_t|}.
$$

The denominator $1/|D_t|$ is thus the change-of-variables factor produced by uniform emission in $T_t$. Multiplication by $c_f$ normalizes a static transmitter, for which $D_t=c_f$, to unit weight.

This derivation is conditional on the uniform transmitter-time emission measure. A different emission measure would define a different model and would have to be justified independently.

## 3. Why Receiver Crossing Rate Does Not Multiply the Base Acceleration

Let an active root move as reception time advances: $T_t=T_t(T_r)$. Differentiating the same hit condition gives

$$
\frac{dT_t}{dT_r}
=
\frac{D_r}{D_t},
$$

where

$$
D_r
=
c_f-\hat{\mathbf r}_t\cdot\mathbf V_r(T_r).
$$

This identity says how many seconds of transmitter history are traversed per second of receiver time. It is required for root tracking:

- $D_r/D_t>0$: the selected emission time advances through transmitter history;
- $D_r/D_t<0$: the selected emission time runs backward through transmitter history;
- $D_r=0$: the selected emission time is instantaneously stationary as reception time advances.

None of those statements determines the instantaneous acceleration magnitude. They describe how the root label changes from one reception time to the next.

The distinction is the same as the distinction between a spatial slope and the rate at which a moving probe reads that slope. A steeper spatial wake changes the acceleration assigned at a location. Moving faster through an unchanged wake changes the time rate of the probe's readout. Converting that playback rate into extra acceleration would require an additional physical rule, such as a fixed impulse per crossed wake surface. No such rule has been derived for the base equation.

The earlier receiver multiplier

$$
\left|\frac{D_r}{D_t}\right|
$$

therefore combined two different operations:

1. the transmitter-time change of variables, which supplies $1/|D_t|$;
2. the receiver-time root-transport rate, which supplies $D_r/D_t$ only to playback and tracking.

The exact root-transport identity remains part of the dynamics machinery. Its promotion into base acceleration strength is rejected.

## 4. The Proposed Acceleration

For each active root, the proposed contribution is

$$
\mathbf A_{r\leftarrow t}(T_r;T_t)
=
\kappa\,\sigma_{tr}\,|q_tq_r|
\frac{1}{r^2}
\frac{c_f}{|D_t|}
\hat{\mathbf r}_t.
$$

The direction and polarity convention are:

- like polarities have $\sigma_{tr}=+1$ and accelerate apart along $\hat{\mathbf r}_t$;
- unlike polarities have $\sigma_{tr}=-1$ and accelerate toward the transmitter's emission site.

The receiver's total acceleration is the sum over every transmitter and every active root. Same-transmitter roots are included whenever the receiver's own past history satisfies the positive-delay hit condition; only the trivial coincident event $T_t=T_r$ is excluded.

This is a delayed, past-history equation. It consumes the receiver's current state and transmitter histories at $T_t<T_r$. It consumes neither a transmitter's future path nor its position at $T_r$.

No additional action-derived correction is included here. The scalar-action investigations remain useful diagnostics, but they do not supply a general acceleration computable from retained past history. In a complete variation of the proposed two-time action, a worldline's present emission also couples to a partner's future reception. That future dependence disqualifies the action as a derivation of this past-history Master Equation; it does not create an obligation to add the action's extra term to the equation.

### 4.1 Causal feedback is path-history feedback

The causal feedback loop does not require an additional present-time acceleration on the transmitter. A wake emitted in the past reaches a receiver now and changes that receiver's acceleration. The resulting change in velocity and position changes the receiver's later path. Because every architrino emits continuously, that changed path changes the origin and spacing of its later wake surfaces. It also changes which already-emitted wakes the architrino will cross later. Those later receptions produce later accelerations, and the loop continues.

Schematically, with $\mathcal H_{T_r}$ denoting the retained path histories available at reception time $T_r$,

$$
\mathcal H_{T_r}
\longrightarrow
\mathbf A(T_r)
\longrightarrow
\bigl(\mathbf X(T_r+\Delta T),\mathbf V(T_r+\Delta T)\bigr)
\longrightarrow
\mathcal H_{T_r+\Delta T}.
$$

The final step appends the emissions generated by the changed path and advances the pending wake history. It does not alter a wake that was already emitted, and it does not use a future receiver position. This is the smallest causal feedback update already implied by the point-transceiver ontology and the past-history Master Equation.

The retained wake history may be represented computationally as the in-flight part of $\mathcal H_{T_r}$, but the current ontology does not give it freely specifiable degrees of freedom independent of the transmitter histories. Introducing such degrees of freedom would be a new theory decision, not a required rewriting of the existing feedback loop.

Claim classification: **derived structural consequence of continuous emission plus the causal retained-history acceleration law**. The claim would fail if two admissible evolutions with identical complete retained histories and identical current architrino states required different next updates; that would demonstrate a missing causal state variable.

## 5. Singular Events and Boundaries

The sharp root formula is valid only for simple roots with

$$
D_t\ne0
$$

and nonzero separation. The following cases require separate treatment.

### 5.1 Transmitter-side folds

At $D_t=0$, the emission-time change of variables fails. Two roots can be born or die at an interior fold.

For an ordinary interior fold with nonzero separation and $D_r\ne0$, the two-root sharp acceleration grows as $1/\sqrt{|T_r-T_0|}$. Its value is infinite at the fold instant, but its reception-time integral is finite. [Transmitter-Side Fold and Coincident-Birth Analysis](analysis-transmitter-factor-fold-and-coincident-birth.md) proves that the finite-width impulse has a regulator-independent sharp limit. The transition must therefore be advanced by its integrated acceleration, not by sampling the pointwise root formula at the fold.

A simultaneous receiver turning point, higher-order contact, root accumulation, or memory-boundary contact is not an ordinary fold and remains outside that theorem.

### 5.2 Receiver turning points

At $D_r=0$ with $D_t\ne0$, the root is instantaneously stationary as a function of reception time. This is not a fold and does not make the proposed acceleration vanish. It is a root-transport turning point that the root tracker must preserve.

### 5.3 Coincident endpoints and self-root birth

When an accelerating architrino crosses from below to above $c_f$, it can overtake wake surfaces emitted moments earlier. The newborn same-transmitter root approaches the coincident endpoint with $D_t\to0$. Removing the former vanishing receiver numerator makes the local sharp impulse more singular, not less.

The local analysis gives a sharp newborn acceleration proportional to $(T_r-T_0)^{-3}$ and a divergent, refinement-path-dependent impulse as wake width and core scale are removed. Fixed positive wake width and core scale make the event finite. Positive wake width alone is insufficient. On matched refinements the complete endpoint layer diverges as the inverse square of the core scale; on extreme refinements the finite reception window changes the power but a uniform lower bound still diverges. A calculation that isolates only the newborn noncoincident root is not the complete transition.

The calculation proves that a generic smooth crossing is incompatible with the sharp base equation. The finite-window lower bound in [Transmitter-Side Fold and Coincident-Birth Analysis](analysis-transmitter-factor-fold-and-coincident-birth.md) diverges on every joint wake-width and core-scale refinement path. The present point-transceiver primitives fix neither width as a positive physical scale and supply no alternative near-origin same-transmitter rule. This route therefore closes negatively: a finite accepted transition requires new derived structure, not a different regulator schedule.

The exact quadratic control also rules out an event-only patch. Every newborn root at every $T_r>T_0$ is already a noncoincident simple root, and its canonical acceleration remains proportional to $(T_r-T_0)^{-3}$. A finite transition must suppress the contribution throughout an open post-birth neighborhood by more than two powers of $T_r-T_0$, exclude the entire endpoint-born branch, or derive a physical wake state that changes the near-origin law. Altering only the birth instant while resuming the simple-root formula immediately afterward leaves the divergent impulse unchanged.

### 5.4 Finite retained history

Roots may enter or leave the retained history window even when no interior fold occurs. The EOM solver must distinguish a genuine root birth or death from a memory-boundary event and must fail closed when the available history is insufficient.

## 6. Promotion Evidence and Remaining Scope

The correction was not selected merely because it is simpler than the former receiver-weighted law. Promotion requires evidence that addresses the law rather than reproducing its own output.

### 6.1 Mathematical checks

1. **Passed on the declared domain:** the uniform-emission finite-width equation, static normalization, joint regulator limit, and $c_f/|D_t|$ simple-root reduction are derived in [Transmitter-Side Finite-Width Equation and Simple-Root Limit](analysis-transmitter-factor-finite-width-simple-root-limit.md) and pass [independent mathematical review](analysis-transmitter-factor-simple-root-independent-review.md).
2. **Passed for ordinary folds:** the finite-width acceleration has a finite, regulator-independent impulse across a nondegenerate interior fold with nonzero separation and $D_r\ne0$.
3. **Failed under the current primitives for coincident same-transmitter birth:** the complete finite-window impulse diverges on every joint regulator-removal path. A fixed positive core would change the point-transceiver law unless an Architrino-native near-origin rule fixes the scale and kernel. No such rule is currently derived.
4. **Passed for the positive-width equation and regular sharp charts:** [Transmitter-Side Causal Retained-History Functional](analysis-transmitter-factor-causal-history-functional.md) proves that the acceleration is a causal functional of current receiver state plus retained past histories. Global sharp continuation remains blocked at coincident same-transmitter birth, not by future dependence.
5. **Failed under the current primitives for conservation:** [History-Only Conservation Obstruction](analysis-transmitter-factor-conservation-obstruction.md) carries the retained-history construction to its present limit. The equation determines acceleration but not the kinetic function, momentum function, or an independently specified wake-account update. Defining wake changes as the negative accumulated motion changes would balance by construction and is rejected as circular. This failure does not justify adding another acceleration term; it identifies missing kinematic and wake-account structure.
6. **Failed as two separate patches:** the finite-transition rule and the conserved accounts must come from one causal construction. A passive wake ledger cannot select among the infinitely many finite near-origin suppressions, while an active wake state changes the Master Equation state and must derive its own emission, propagation, reception, and boundary updates.
7. **The independent wake-state route was executed and closed negatively under the current primitives:** [Independent Causal Wake-State Minimum and Obstruction](../master-equation-closure/analysis-independent-causal-wake-state.md) derives the minimum information that a candidate state must determine: direction-resolved coupling, scalar energy, vector momentum, and explicit retained-boundary flux. Finite coincident birth requires more-than-quadratic suppression; an analytic rule begins no lower than cubic order. The present primitives select neither that suppression nor the motion-account, emission-capacity, and reception-transfer maps. The analysis therefore supplies a precise missing-law boundary, not an accepted wake ontology.

### 6.2 Discriminating tests

The static-transmitter receiver-motion test now supplies an independently anchored first-order discriminator between

$$
\frac{c_f}{|D_t|}
\qquad\text{from}\qquad
\left|\frac{D_r}{D_t}\right|
$$

while holding the root, emission geometry, transmitter history, separation, polarity, and numerical regulators fixed. [Static-Transmitter Receiver-Motion Discriminator](analysis-transmitter-factor-stationary-transmitter-discriminator.md) compares receivers passing the same position with opposite radial velocities. The transmitter-side equation gives the same acceleration to both; the receiver-weighted equation does not. The independent stationary-transmitter electrodynamics recovery anchor contains no first-order receiver-velocity term and therefore selects the transmitter-side result at that order.

Useful tests must not use an oracle derived from either candidate law. A closed form from an independently justified wake model, a separately authored instrument with declared reach, or a downstream recovery calculation can supply independent evidence.

The exact finite-width control in the [independent simple-root review](analysis-transmitter-factor-simple-root-independent-review.md) verifies the native algebra. The observer-level stationary-transmitter anchor supplies the independent selection. This passes one discriminator without claiming that the complete electrodynamics recovery is finished.

### 6.3 Recovery obligations

Observer-level electrodynamics, magnetism, Lorentz behavior, and assembly dynamics remain downstream recovery targets. They are not premises that may be inserted into the architrino-level equation. If receiver-velocity-dependent acceleration is required for those recoveries, it must be derived through an architrino-native mechanism, assembly dynamics, or Noether sea response rather than restored by reusing the unsupported receiver playback multiplier.

The native feedback mechanism already present in the proposal is sufficient to change later behavior: reception changes acceleration, acceleration changes the later path, and the later path changes both later emissions and later wake crossings. No present event is allowed to depend on where that event's newly emitted wake will be received in the future.

The history-only conservation construction has now been attempted. Its causal state update is sufficient for acceleration away from the unresolved transition, but its conservation accounts are underdetermined. The missing information is explicit: a fixed kinetic and momentum map, plus a wake-account rule stated before evolution that assigns emission, propagation, reception, and boundary changes without reading the residual it must explain.

The independently evolving wake-state option has now been tested rather than merely proposed. It requires a direction-resolved state that determines acceleration coupling, energy, and momentum, plus a predeclared reception update and boundary flux. That test did not find a unique Architrino-native construction: the current primitives leave the coincident-birth suppression, motion-account maps, emission capacity, and reception transfer undetermined. This negative result neither licenses restoring the receiver playback multiplier nor licenses importing an observer-level field law.

The same construction must also determine the near-origin acceleration. Conservation accounts added after a finite activation function has been chosen do not validate that function; conversely, a finite activation function without predeclared accounts does not close conservation. Broader Master Equation closure therefore remains barred until one joint retained-state update survives both tests on the same non-circular histories.

The first retained-branch recomputation has also begun. [Spiral A1 Transmitter-Side Rebuild](../master-equation-closure/spiral-a1-restart.md) derives transmitter-side acceleration-weight intervals for the retained $P_1,P_2,P_3,S_1$ roots and reports a turn-center radial/tangential diagnostic with signed playback kept separate. It does not promote the A1 branch: outward aggregate bounds and an accepted causal wake state are still missing, so action and all three conserved accounts remain fail closed.

### 6.4 Repeated promotion audit

The transmitter-side decision has three different standings, and they must not be merged into one verdict: mathematical support for the factor, measured completion of the scoped repository migration, and global closure of the full equation.

The mathematical correction is supported within its declared domain: uniform emission gives $c_f/|D_t|$, receiver playback $D_r/D_t$ does not justify multiplying base acceleration by $|D_r|/c_f$, the first-order static-transmitter discriminator agrees, and ordinary folds have a finite integrated acceleration. At a receiver turning point with $D_r=0$ and $D_t\ne0$, the root remains present and the transmitter-side acceleration remains finite.

The scoped repository migration is also complete. Borg now emits
`eom_borg_shadow_request/v1` under `eom_evolution_contract/v1`, with no scale
amendment and with `master_eom_binding/v1`. Its process bridge rejects stale
contract identities and recomputes the selected certified-budget hash from the
canonical allocation object before native execution. The current Interactive
and Research hashes are recorded in the
[Certified Error-Budget Ledger](certified-error-budget-ledger.md). The complete
Borg migration validation passed `102/102`, as recorded in
[Borg Receiver-Factor Contract Migration Validation](evidence/borg-receiver-factor-contract-migration-2026-07-19.md).

The complete Master Equation is not globally closed. The 2026-07-20 repeated audit executed the independently evolving wake-state route and the first A1 transmitter-side recomputation. Two fundamental debts remain negative under the current primitive set:

1. the coincident same-transmitter transition has no finite joint regulator limit, and no physical near-origin rule is derived;
2. the causal retained-history update does not determine non-circular energy, momentum, and angular-momentum accounts without additional kinematic and wake-account structure.

The repository-authority audit is complete for the receiver-factor change. The three obsolete receiver-weighted Master Equation packets are isolated under `reference/priorities/master-equation-closure/history/`; current priority dependencies no longer treat them as acceleration, action, or promotion authority. The old parallel-stream specification that explicitly consumed the removed equation is likewise isolated under `reference/priorities/app-eom/archive/receiver-weighted-law/`. Historical records remain available as history, not as current evidence.

The coincident-birth divergence must remain fail-closed and visible. It blocks a claim of globally complete same-transmitter evolution. Missing conservation likewise remains a global closure obligation and does not justify adding receiver playback to the acceleration magnitude.

The resulting disposition is:

- **implemented within the scoped promotion boundary:** the base acceleration factor is $c_f/|D_t|$ on the certified transmitter-side domain, $D_r/D_t$ is retained for root playback, and singular-event routing remains fail closed;
- **completed as a scoped migration:** canon, the v1 binding, the EOM solver, and Borg's live request and certified-budget identities agree on that boundary;
- **not ready for global closure claims:** coincident same-transmitter continuation, causal conservation, and complete moving-transmitter and moving-receiver recovery remain open.

The correction changes canon and EOM solver semantics. Completing its migration
does not reclassify old numerical evidence computed under the removed law, does
not turn historical allocation hashes into current identities, and does not
claim global same-transmitter or conservation closure.
