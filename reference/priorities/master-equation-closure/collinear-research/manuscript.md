# Collinear encounters: approach, coincidence and subsequent motion

This manuscript brings together the collinear investigations under the Master Equation and the separately specified alternatives. The comparison comes first; the subsequent sections preserve the supporting incoming and coincidence arguments. Numerical examples use $c_f=1$. A change in document location changes neither the equation used nor the grade or scope of a result.

The [shared equation definition](../analysis/field-speed-ceiling-definition-and-shared-results.md) supplies the capped response used in some cases. The conditional event constructions below add further rules and are not consequences of that response alone. Circular and transverse-moving binaries belong to the [Braid Program](../braid-program/manuscript.md).

## Speed regimes to explore

The [assumption audit](analysis/master-equation-assumption-audit.md) separates the Master Equation's starting geometry from its chosen reception response. Inverse-square acceleration, linear addition and same-law self reception are commitments of the current law, not deductions from causal delay alone. The comparison below retains every tested equation and result; reconsidering those commitments has not adopted a replacement law. The isolated pair and exact collinearity are also experimental choices, not requirements imposed by the underlying point identities.

Both collinear geometries and braids use exactly three top-level speed regimes. Here $v$ is the speed of an individual architrino and $c_f$ is the field propagation speed.

| Speed regime | Meaning | Field speed ceiling? |
| --- | --- | --- |
| Unrestricted $v$ | No imposed upper speed limit; speed may be below, equal to or above $c_f$. | No |
| $v\le c_f$ | Speed may reach $c_f$ but may not exceed it. | Yes; equality allowed |
| $v<c_f$ | Speed must remain below $c_f$; equality is excluded. | Yes; equality excluded |

These are ideas to explore in each geometry. The two ceiling regimes each require an equation that produces motion consistent with the stated restriction. Different ways of doing that are implementations within the same regime. A fixed lower cap is a particular choice within $v<c_f$, not a fourth top-level regime. Changes to the interaction, treatment of self acceleration or coincidence rules are recorded separately from the speed regime. A result belongs to the particular equation and history examined; the speed restriction alone does not establish it.

## 1. Collinear encounter comparison

**For the stationary collinear pair, we have explained the inward approach to wake speed, but we have not obtained a complete passage, bounce or repeating motion under the unchanged Master Equation.** The first mathematical difficulty occurs while the architrinos are still separated. Adding a speed cap avoids that particular difficulty, but brings us to a second problem at coincidence. Further changes can produce passage or turning, but those results depend on the changes and do not complete the original investigation.

Here, *coincidence* means that both architrinos occupy the same position at the same time. *Braking* means that acceleration reduces speed; a *turn* means that the direction of motion reverses. A history specifies where each architrino was moving before the calculation starts, not just its starting position and velocity. All cases use wake speed $c_f=1$.

### Where the investigation stands

The first table answers what we tried and what prevents each attempt from settling the encounter. The second follows the same numbered cases through the stages of motion. A result obtained after adding a rule is identified as such. The notes explain the mechanism and link to the exact analysis.

Rows 1–3 examine unrestricted $v$; rows 4–6 and 9 examine $v\le c_f$; rows 7–8 and 10–12 examine $v<c_f$. These labels describe the speed restriction being tested, not the speeds successfully reached. Row 2 tests an assigned reversal against the unrestricted Master Equation; the candidate motion staying below or at $c_f$ does not make that equation a ceiling model. Row 8 uses a fixed lower cap as one choice within $v<c_f$. Equation modifications remain separate entries within their speed regime.

| No. | Speed regime | What we tried | Starting conditions | How far the examination goes | Summary: result and remaining problem |
| --- | --- | --- | --- | --- | --- |
| [1](#collinear-note-1) | Unrestricted $v$ | Keep the Master Equation unchanged; allow speeds above wake speed | Opposite-polarity pair held at rest at x = ±0.5, then released with its past retained | Proved approach to wake speed, still at separate positions | **Blocked before coincidence.** Attempting to continue produces an infinite accumulated self-wake acceleration, incompatible with finite continuous velocity in the classes examined. |
| [2](#collinear-note-2) | Unrestricted $v$ | Try reversing both velocities instantly when they first reach wake speed | Same approach as 1; assign a reversal while still separated | Constructed a short outward motion after the assigned reversal | **The reversal itself is missing.** The equation can describe the motion after the proposed jump, but does not supply the acceleration impulse needed to cause that jump. |
| [3](#collinear-note-3) | Unrestricted $v$ | Weaken the newly encountered self-wake acceleration with the proposed quintic factor | Same stationary incoming history as 1 | Proved a short continuation above wake speed under the modified equation | **Short-term mathematical success for a changed law.** Coincidence and later motion remain unproved. This modification is set aside in the unchanged-law investigation. |
| [4](#collinear-note-4) | $v\le c_f$ | Use the Master Equation with speed capped at wake speed and self acceleration set to zero | Same incoming approach, then motion at the cap | Derived approach all the way to coincidence; examined passage, rebound and stopping attempts | **Blocked at coincidence and departure.** The event response is not defined as a finite velocity change; the tested outgoing motions either have infinite accumulated braking or an undefined partner response. |
| [5](#collinear-note-5) | $v\le c_f$ | Add rules for coincidence and for ignoring a particular continuing wake contact; try straight passage | Complete matching inward histories at wake speed | Straight passage and continued separation are allowed by those extra rules | **This passage result depends on added rules.** They are not supplied by the cap alone, and the same past also permits other futures. |
| [6](#collinear-note-6) | $v\le c_f$ | Use the rules in 5, then choose a later time for braking to begin | Same past as 5; same straight separation until the chosen time | Derived braking, a turn and return to coincidence when the stated bounds hold | **The start of braking is unexplained.** We choose it; the equation does not. This is a conditional return, not a prediction of a self-sustaining cycle. |
| [7](#collinear-note-7) | $v<c_f$ | Require speed to remain strictly below wake speed; check whether the unchanged incoming equation satisfies this requirement | Same stationary history as 1 | The unchanged incoming equation reaches the forbidden boundary in finite time | **Compatible dynamics remain unresolved.** Equality is forbidden. The unchanged incoming equation supplies no permitted continuation through that time; this does not rule out the strict-speed regime. |
| [8](#collinear-note-8) | $v<c_f$ | Consider a fixed speed cap lower than wake speed | General complete histories obeying that lower cap; no one release experiment selected | Derived simpler wake-arrival geometry while the pair remains separated | **Only part of the problem was examined.** Easier wake calculations do not remove the interaction's divergence at zero distance. A complete encounter is still missing. |
| [9](#collinear-note-9) | $v\le c_f$ | Spread wake reception over a finite width and soften the interaction at short distances; cap speed and omit self acceleration | Prescribed inward motion at wake speed; simulation starts at coincidence | Numerical outward motion, braking, turning and repeated crossings | **Turning occurs in the smoothed model.** We have not shown that it remains a solution when smoothing is removed. Different smoothing choices change the measured motion. |
| [10](#collinear-note-10) | $v<c_f$ | Multiply the Master Equation acceleration by $1-v^2/c_f^2$ | Same stationary positions, history, charges and coupling as 1 | Derived strict speed at positive separation, then a finite coincidence limit with speed tending to $c_f$ | **Blocked at the endpoint.** No braking or turn occurs. A continuous endpoint velocity would equal $c_f$, forbidden by the requirement; contact and departure remain undefined. |
| [11](#collinear-note-11) | $v<c_f$ | Multiply acceleration by $1-v^2/c_f^2$ and replace the inverse-square interaction by a finite short-distance response with length $\ell=0.5$ | Same stationary preparation and coupling as 1; acceleration changes with the equation | Numerical passage, outgoing braking, a turn and return through coincidence | **Passage obtained numerically; return depends on the chosen length.** The sensitivity study finds return at lengths 1 and 0.5, but continued separation through the tested interval at smaller lengths, with conditional analytical support for escape. Independent trajectory validation remains open. |
| [12](#collinear-note-12) | $v<c_f$ | Use a response linear in delayed separation at every distance, with the same source weight and receiver factor $1-v^2$ | Stationary history at $x=\pm0.5$; $k=0.2862286103053385$ matches original release acceleration at separation one | Three numerical passages and two turns through $T=16$, compared with exact instantaneous controls | **Regular passage, but increasing excursions.** Crossing speeds rise from 0.432764 to 0.666169 to 0.937309; turns move from 0.831831 to 1.639889. The instantaneous version with the same speed factor repeats at distance 0.5. No breather or indefinite-growth theorem is established. |

Rows 1 and 4 locate different mathematical problems. Row 1 encounters the architrino's own wake just beyond first wake-speed arrival, before coincidence. Row 4 prevents that speed crossing, but still has to explain the partner interaction at coincidence and immediately afterward. Rows 5–6 and 9 demonstrate what additional assumptions can accomplish; they do not resolve those problems under the original rules. Row 3 also changes the law, while rows 7–8 test restrictions on speed with different levels of completeness.

For the original stationary investigation, the present blocker is therefore **a valid continuation past first wake-speed arrival under the unchanged equation**. The source analysis rules out the specified forms of continuous finite-velocity continuation; extending the same simulation is not by itself a remedy. Broader mathematical descriptions of the event would need to be defined and shown to satisfy the equation. The separate capped investigation needs a valid coincidence response and subsequent motion. These are the blockers for these collinear cases, not a verdict on every geometry in the Braid Program.

### What happens at each stage

**“Beyond the result” means that the analysis has not established that later stage.** Where an earlier step is mathematically blocked, the later cells point back to that same problem; they are not additional failures. “With added rules” means the result belongs only to the stated modified model. “Prescribed” means the motion was supplied as input rather than derived from the equation.

For rows 1–4 and 7, the shared incoming wake-speed positions are approximately x = +0.051507 and x = −0.051507, with the labels still on their original sides. The exact enclosure and its input assumptions are in note 1. Rows 5–6 start from a general incoming cap of duration L, placing A at x = −L and B at x = +L at cap entry; that setup does not fix the first wake-speed coordinates of an earlier release.

| No. | Speed regime | Reaching wake speed | Just before coincidence | At coincidence | Just after coincidence | Braking | Turn or return |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Unrestricted $v$ | Approach proved; continuation fails immediately afterward in the tested classes | Beyond the earlier speed-crossing obstruction | Same earlier obstruction | Same earlier obstruction | None on the proved incoming segment | No turn derived |
| 2 | Unrestricted $v$ | Same positions as 1; reversal assigned here | Outside the short outward restart studied | Outside that restart | Outside that restart | Outward motion would slow, if the reversal were supplied | Instant reversal lacks its required impulse; later turn unknown |
| 3 | Unrestricted $v$ | Crosses above wake speed under the weakened self response | Beyond the short proved segment | Beyond the result | Beyond the result | None on the proved segment | Beyond the result |
| 4 | $v\le c_f$ | Reaches and stays at the cap | Inward motion supported under capped assumptions | Finite event response missing | Tested passage and rebound attempts fail | Outgoing braking would accumulate without bound | No valid bounce or stop derived |
| 5 | $v\le c_f$ | Incoming motion at the cap supplied | Incoming capped approach | Velocity preserved by an added event rule | Straight passage, with added rules | None on this straight branch | No turn on this branch |
| 6 | $v\le c_f$ | Same incoming cap as 5 | Same as 5 | Same added event rule | Straight separation until chosen braking time | Derived after the chosen time | Turn and return proved under sufficient parameter bounds |
| 7 | $v<c_f$ | Equality forbidden; the unchanged incoming equation reaches this boundary in finite time | Compatible strict-speed dynamics not established | Same unresolved dynamics | Same unresolved dynamics | Slowing or turning consistent with the requirement not established | No turn established |
| 8 | $v<c_f$ | Forbidden by the lower cap; lower-cap entry coordinates not calculated | No full approach calculated | Zero-distance problem remains | A constant-speed separating trial fails | No valid braking interval established | No turn derived |
| 9 | $v\le c_f$ | Already imposed on the supplied past | Prescribed incoming motion | Simulation initialized here | Outward motion measured with smoothing | Measured with smoothing | Turns and crossings measured with smoothing |
| 10 | $v<c_f$ | Not reached at positive separation; approached at the coincidence endpoint | Inward motion with speed strictly below $c_f$ | Continuous limiting speed equals $c_f$, forbidden; contact response undefined | No permitted continuation established | None during approach | No turn before coincidence; later motion undefined |
| 11 | $v<c_f$ | Not reached; strict incoming bound derived | Compressed partner arrivals; finite response | First crossing measured near $T=2.054357$, speed about $0.580409c_f$; acceleration tends to zero | Labels pass through; retained-history acceleration opposes departure | Starts immediately after passage without an assigned start time | Turn measured near $T=11.768426$; return crossing near $T=22.190686$ |
| 12 | $v<c_f$ | Remains below wake speed in the computed interval; no equality event | Finite incoming response and compressed partner arrivals | First passage at $T\approx1.984851$, speed 0.432764; zero limiting acceleration | Labels pass through and slow | Starts immediately after passage | First turn at distance 0.831831; return crossing speed 0.666169; second turn at distance 1.639889 |

### Why each attempt succeeds or runs into trouble

The notes distinguish three kinds of evidence. A **derived** result follows from the equation and the stated assumptions. A **conditional derived** result additionally depends on the specified modified rule. A **measured** result reports what a named numerical instrument produced and the limits of its checks. No new simulation or mathematical acceptance is supplied by this comparison.

<a id="collinear-note-1"></a>
### Note 1. The original equation encounters a self-wake problem before coincidence

The pair starts at rest at opposite positions and accelerates inward. The [stationary analysis](analysis/stationary-binary-first-interval.md#scope-and-model) fixes its full past on the retained interval from time −20 to zero, its charge tokens and coupling. The [continuous interval construction](analysis/stationary-binary-first-interval.md#continuous-interval-construction-from-the-exact-stationary-history), implemented by `stationary-mirror-incoming-interval-certificate.py`, bounds the whole approach through first wake-speed arrival. Writing that time as $T_*$ and the positive member's position as $q_*$, it gives

$$
T_*\in[1.572637654589540,\;1.572640138062056],\qquad
q_*\in[0.051505978182147,\;0.051508831342540].
$$

The other member is at $-q_*$. Both are still moving inward. These are bounds for this particular history and coupling, not universal encounter coordinates. They are stronger evidence for the incoming path than a collection of sampled simulation points.

At that instant, the partner supplies finite inward acceleration and there is no positive-delay self-wake arrival. The problem develops when the motion is continued: the partner keeps increasing inward speed, the architrino then encounters its own earlier wake, and the resulting self acceleration has an infinite integral over an arbitrarily short outgoing interval. Velocity change must equal integrated acceleration, so this cannot produce a finite continuous velocity in the mathematical classes examined. The self and partner contributions both point inward and cannot cancel each other.

This [derived obstruction](analysis/stationary-binary-first-interval.md#local-continuation-alternatives-for-the-original-collinear-history) assumes the unchanged equation, the same complete past, and either the specified integral equation or nonnegative locally finite acceleration-measure formulation. It does not assume a universal speed limit. It also does not predict that the architrinos stop: the analysis supplies no later motion. An outgoing solution satisfying those same assumptions would have to overturn the sign or divergent-integral argument. More general event descriptions remain outside the result and need their own precise definition.

<a id="collinear-note-2"></a>
### Note 2. A possible motion after reversal does not explain the reversal

The [reversal calculation](analysis/stationary-binary-first-interval.md#exact-reversal-outgoing-roots-and-the-missing-event-impulse) asks what happens if both architrinos reverse instantly at the separated positions where they reach wake speed. After that assigned change, a short outward path can be constructed: the partner still accelerates each member inward, so their outward speeds decrease. No later turn or coincidence was established by this local result.

The missing piece is the instantaneous change itself. Changing inward velocity from +1 to −1 requires an acceleration impulse of −2 in each inward coordinate, represented by $-2\delta_0$. The ordinary partner acceleration is bounded and supplies no such impulse; the relevant self arrivals are absent on this candidate path. Thus the proposed joined motion fails the full event equation even though its short outward part solves the equation away from the joining instant. This is a derived result for the specified class. A derivation of the missing impulse from the unchanged equation would be new evidence capable of changing the conclusion.

<a id="collinear-note-3"></a>
### Note 3. Weakening the self interaction repairs the first difficulty only by changing the law

The [quintic proposal](analysis/quintic-mirror-boundary-assessment.md) reduces the newly encountered self-wake acceleration with a fifth-power factor. The factor makes that contribution small enough to have a finite time integral just after wake-speed crossing. The partner interaction is left unchanged. This produces a short inward continuation above wake speed, with no braking on the proved segment.

The [independent review](../analysis/quintic-mirror-boundary-independent-adjudication.md) accepts existence and uniqueness of that short continuation under the proposed equation and stated mirror-symmetric assumptions. It proves neither approach to coincidence nor motion after coincidence. It also stops before the modification's later release condition, where the weakening rule changes. The [operator disposition](analysis/stationary-binary-first-interval.md#boundary-result-and-modified-law-scope) sets this route aside for the unchanged-law investigation. The result is conditional and derived: extending the candidate through its release condition and coincidence would advance the modified model, but would not make it a solution of the original equation.

<a id="collinear-note-4"></a>
### Note 4. A speed cap moves the difficulty to coincidence

The capped model prevents speed from increasing above one and assigns zero self acceleration. After the same incoming approach as row 1, both members continue inward at speed one. The [incoming analysis](analysis/capped-collinear-endpoint-reanalysis.md) supports this segment up to coincidence: the partner input accumulated before the event is finite, and the cap suppresses its forward acceleration. With the notation of note 1, the half-separation is $q(T)=q_*-(T-T_*)$ and coincidence occurs at $T_c=T_*+q_*$.

At coincidence, wakes emitted throughout the partner's incoming capped segment arrive together. The ordinary formula for separate wake arrivals no longer supplies a finite event response; applying its inverse-square weight to the whole family gives a divergent result. A finite approach therefore does not provide the missing rule at the meeting point.

The [outgoing analysis](#collinear-coincidence-with-speed-cap) then examines several possibilities under its stated mirror and older-history assumptions. Smooth passage produces backward partner acceleration at least as strong in magnitude as $K/(2t^2)$, where K is the positive interaction coefficient and t is elapsed time after coincidence. Its integral is infinite, so the proposed finite outgoing speed is inconsistent. The cap does not remove backward acceleration. An immediate full-speed bounce instead stays on an entire family of old partner wakes, for which the ordinary response is undefined over an interval. Bouncing and immediately slowing again produces the divergent braking problem. Remaining at the meeting point still needs a stopping impulse and a rule for continuing coincidence.

These are derived objections to the particular outgoing motions tested. They do not establish a physical bounce, stopping state or infinite speed. The missing result is a complete finite event response together with a subsequent path satisfying this capped equation. Adding the event rules used in rows 5–6 answers a different mathematical question.

<a id="collinear-note-5"></a>
### Note 5. Extra rules allow straight passage but do not select it

The [extended event model](#3-a-finite-coincidence-event-and-its-restart-data) adds two ingredients beyond the cap: a special way of combining matching source histories at coincidence that gives no velocity jump, and a rule assigning zero response to a particular wake contact that persists on straight outgoing motion. The latter is called frozen-root suppression in the source. That name means the receiver continues to meet the same emission front; it does not mean the original equation already assigns that contact zero acceleration.

Under these additions, both labels can pass through and continue straight at wake speed. The complete histories are retained, and the special event rule does not simply erase the sources. Ordinary radial acceleration contributions would not cancel by the same argument. The result is conditional and derived: straight passage is permitted by this extended model, but it is not a result for the cap-only model in row 4. Nor is it a unique prediction, because row 6 starts from the same complete past and supplies different permitted futures. A missing contribution in the complete straight-path calculation would challenge its compatibility even with the extra rules.

<a id="collinear-note-6"></a>
### Note 6. Turning can be proved once we choose when braking starts

The [delayed-braking construction](#41-delayed-braking-from-the-same-complete-past) uses the same added event rules as row 5. Let the pair separate at wake speed for a chosen positive time $\tau$. After that time, there is a solution in which a new partner-wake arrival starts slowing the outward motion. The equation determines the braking after its start has been supplied; it does not explain why braking begins at this particular time.

For the mathematical statement, write $x_A(t)=t-E(t)$ and $v_A(t)=1-m(t)$. E is the distance lost relative to straight unit-speed motion, and m is the reduction in outward velocity. The equations after onset are

$$
E'=m,\qquad m'=\frac{K}{2(t-E/2)^2},\qquad E(\tau)=m(\tau)=0.
$$

The [return analysis](#421-turnaround-and-inward-ceiling-arrival) proves a turn under sufficient bounds, including $K\ge3\tau$, and a complete return to coincidence under the stronger sufficient bound $K\ge7\tau/2$. The turn occurs at $m=1$, when outward velocity reaches zero, followed by inward motion. Equal chosen waiting times permit repeated reflected excursions within the extended model. These are conditional derived results, not a proof that every waiting time and interaction strength gives a return.

The blocker is predictive: the same complete past permits continued straight motion and different positive braking-start times. No current wake or action law selects that time. A derivation selecting it would address this ambiguity; it would still leave the extra event rules to justify. Failure of the stated source-history or return bounds would instead weaken the corresponding return theorem.

<a id="collinear-note-7"></a>
### Note 7. The strict-speed requirement needs compatible dynamics

The requirement is $v<c_f$ at every time. Equality is forbidden. This is a valid condition to propose for exploration; it can be stated before an equation satisfying it has been established. It does not require an additional fixed cap below $c_f$.

Row 7 checks this requirement against the unchanged incoming equation for the stationary history in row 1. That equation drives speed to $c_f$ in finite time. Thus its incoming solution cannot continue through that time while satisfying the strict inequality. Equality has not become an allowed state: the proposed combination of this history, the unchanged equation and the strict-speed requirement supplies no permitted continuation.

The [strict-speed discussion](#433-strict-speed-domains-and-nonattainment-targets) distinguishes that derived incompatibility from the open research question. A complete model needs dynamics that satisfy the requirement, whether by approaching $c_f$ without reaching it, slowing earlier, or turning earlier. A rule or derivation establishing such behavior for this history would address the missing dynamics. It would still need to establish what happens at close approach and coincidence. The present result does not rule out the $v<c_f$ regime or show that every possible implementation fails.

<a id="collinear-note-8"></a>
### Note 8. A lower cap simplifies wake timing but does not settle contact

The [lower-cap result](../analysis/field-speed-ceiling-definition-and-shared-results.md#211-strict-gap-control-and-its-boundary) assumes a fixed cap $0<c_a<1$ for the complete histories. While the members are separated, each receives one partner emission at a time, with positive bounds on the factors used to calculate that arrival. This makes the wake-arrival calculation better controlled. It is a derived geometric result; no particular cap value and complete stationary-release experiment were fixed for this row.

The inverse-square interaction can still diverge as distance tends to zero. A separate trial in which the pair leaves coincidence at constant speed $0<v_0<1$ gives backward acceleration magnitude $K(1+v_0)/(4v_0^2t^2)$, which again has an infinite time integral. That trial therefore does not solve the departure problem. It does not rule out every possible lower-cap history. What remains is a specified lower-cap equation and history with a complete encounter calculation, including the zero-distance event. Better control of arrival times alone cannot fill that gap.

<a id="collinear-note-9"></a>
### Note 9. Numerical turns occur under the modified interaction; removing those changes remains unproved

The [auxiliary simulation](analysis/partner-only-auxiliary-evolution-results.md) spreads reception over a finite width and softens the short-distance interaction. It uses a unit speed cap, zero self response, mirror symmetry, $K=1$, and a memory horizon of one. The incoming motion is supplied as $x_A(s)=s$, $x_B(s)=-s$ for $-1\le s\le0$; evolution begins when they coincide. Thus this run tests departure from prescribed incoming data, not the whole approach from rest.

The instrument `partner-only-auxiliary-evolution.mjs` produces outward motion, braking, turning and repeated crossings. For the recorded Gaussian width and core scale of 0.04, A first stops near time 0.0491598 at position 0.0414336 and returns through the origin near time 0.0970891; B mirrors it. These are measured results of the modified numerical model. Known analytical cases check components of the instrument, and finer numerical steps check consistency; neither establishes an independent certificate for the full trajectory.

Changing how wake reception is spread out or how the short-distance interaction is reduced changes the measured motion. We have not proved that shrinking both modifications to zero produces a path satisfying the Master Equation with the speed cap and zero self acceleration used in this case, including through coincidence. Smaller excursions alone do not prove that the limiting pair sticks or bounces. Reproduction and refinement can test the numerical observations; transferring them to that equation requires a proof that positions, velocities and accumulated acceleration approach a solution as the modifications are removed.

<a id="collinear-note-10"></a>
### Note 10. Reducing acceleration near wake speed does not complete the encounter

The [quadratic speed response](analysis/strict-speed-quadratic-response.md) multiplies the complete Master Equation acceleration by $1-v^2/c_f^2$. It uses the same stationary preparation as row 1. This is a proposed modified equation, not a derived property of the Master Equation.

For the mirror pair, write $x$ for half-separation and $u=-x'$ for inward speed, with $c_f=1$. The delayed equation becomes $u'=(1-u^2)F$, where $F>0$ is the original partner contribution evaluated on the modified history. Its exact identity $u=\tanh(\int_0^T F(t)\,dt)$ keeps speed below one while separation is positive. The source delay bounds make that integral finite at every such finite time.

The same analysis proves that separation tends to zero in finite time and $u$ tends to one at that endpoint. Inward speed increases throughout, so there is no braking or turn. The incoming modified acceleration has a finite integral, but a continuous endpoint velocity would violate $v<c_f$ and the contact equation remains undefined. The candidate moves the difficulty to coincidence; it does not establish passage. These are derived results in the specified continuous mirror class, with an analytical self-check and no independent review or numerical trajectory.

<a id="collinear-note-11"></a>
### Note 11. A finite short-distance response permits a numerical passage and return

The [finite-contact candidate](analysis/strict-speed-finite-contact-passage.md) adds a short-distance change to row 10's speed factor: $\mathbf r/R^3$ becomes $\mathbf r/(R^2+\ell^2)^{3/2}$, with $\ell=0.5$ and $c_f=1$. The causal arrival condition remains unchanged. The continuous partner acceleration at exact coincidence is defined to be zero under a strict speed gap. The same stationary history, charges and coupling are used; the modified equation changes the release acceleration. This is one specified equation in the strict-speed regime, not a result for the Master Equation alone.

The incoming derivation bounds speed strictly below one through the finite contact limit. The numerical calculation then follows the same labels through coincidence, outgoing braking, a turn and a return crossing, without a velocity reset or assigned braking time. Three refinements through $T=24$ preserve the sequence; the finest first-crossing speed is about $0.580409$, and the largest sampled speed through the run is about $0.662823$. The turn occurs after first passage, at positive separation; the return is a second passage through coincidence. The first and return crossings have different speeds, so a periodic cycle has not been established. The [motion-sequence explanation](analysis/strict-speed-finite-contact-passage.md#what-the-turn-and-return-mean) distinguishes this measured excursion from a sustained bounded breather.

The instrument passed analytical root and early-interval controls before the target runs. Later trajectory refinement checks consistency, not independent correctness. The result is measured for the chosen softened interaction and length; its physical justification, independent trajectory validation, long-time behavior and any limit removing the short-distance change remain open. This supplies the desired passage as a concrete comparison, while preserving those limitations.

The [length-sensitivity study](analysis/strict-speed-finite-contact-passage.md#sensitivity-to-the-short-distance-length) repeats row 11 at lengths 1, 0.5, 0.25, 0.125 and 0.0625. First passage becomes faster across that sequence, with speeds about 0.3164, 0.5804, 0.8176, 0.9566 and 0.9968. The two larger lengths turn and return; the three smaller lengths keep separating through the runs to time 24. Their numerical outgoing states satisfy a derived sufficient condition for no later turn, conditional on state accuracy. Smaller lengths require substantially finer steps, and the smallest long run is not quantitatively settled. This supports sensitivity of the proposed model, not a result for vanishing short-distance length.

The [acceleration audit](analysis/strict-speed-acceleration-balance.md) separates the factors along the length-0.5 saved path. Source-motion weighting changes a distance-only braking surplus into a return-acceleration surplus; the receiver-speed factor reduces the excess but leaves the second crossing faster. This is a diagnosis of the modified equation on its recorded history, not a conserved wake account or a new evolution experiment.

The [derivation check](analysis/strict-speed-acceleration-balance.md#does-the-source-motion-weighting-survive-the-two-modifications) confirms that this weighting still follows from the unchanged wake-arrival condition when the distance response is softened. The receiver-speed factor can multiply that response consistently, but the arrival geometry does not derive it. The unresolved issue is why these two additions should describe architrinos and how the coupled paths and wakes account for the changing motion; the higher return speed does not by itself identify a wrong source weight.

The [two-path action calculation](analysis/strict-speed-two-path-action.md) rejects one attempted justification of this modified equation. Adding the two prescribed-partner expressions produces an extra term depending on the partner's later reception of emissions. Correcting the static pair count does not remove it. This is a failure of that proposed derivation, not a missing term in the simulated causal equation, and it establishes no impossibility of a collinear breather.

### Length comparison through the first two turns

The [response comparison with springs](analysis/finite-passage-response-comparison.md) shows that this softened interaction already becomes linear in delayed separation near coincidence. That behavior supports a finite passage but does not establish a repeated cycle. A spring's regular center and the balance that keeps its oscillation amplitude constant are distinct properties; the latter must be checked for the actual delayed equation.

Speeds are the magnitudes for either member. Turn distances are each member’s distance from the midpoint; the pair separation is twice the listed distance. Initial separation is one, with $c_f=1$. A dash means that event was not observed by $T=200$, not a zero distance or speed. The first turn follows first coincidence; the second turn, when present, follows second coincidence.

| Length $\ell$ | First crossing speed $v/c_f$ | Distance at first turn | Second crossing speed $v/c_f$ | Distance at second turn |
| --- | --- | --- | --- | --- |
| 0.3 | 0.7628 | — | — | — |
| 0.4 | 0.6643 | 3.379 | 0.7352 | — |
| 0.5 | 0.5804 | 1.727 | 0.6628 | — |
| 0.6 | 0.5093 | 1.274 | 0.5976 | — |
| 0.7 | 0.4489 | 1.062 | 0.5385 | 6.349 |
| 0.8 | 0.3976 | 0.938 | 0.4846 | 2.944 |
| 0.9 | 0.3538 | 0.856 | 0.4358 | 2.025 |
| 1.0 | 0.3164 | 0.798 | 0.3917 | 1.596 |

The [extended experiment](analysis/strict-speed-finite-contact-passage.md#extended-runs-and-the-first-two-turns) uses the same softened equation and stationary preparation, with two time steps through $T=200$. At $\ell=0.5$, the pair keeps separating after the second crossing rather than making a second turn. At lengths 0.7 through 1, the second turn is farther out than the first. These results do not establish a breather. Conditional escape inequalities support continued separation for lengths 0.3 through 0.8; exact trajectory validation remains open.

<a id="collinear-note-12"></a>
### Note 12. A linear delayed attraction still produces growing excursions

The [linear-response comparison](analysis/linear-delayed-response-comparison.md) removes the short-distance singularity everywhere while retaining the same delayed arrival weighting and strict-speed receiver factor. Both members begin at rest at distance 0.5 from the midpoint. The response coefficient is chosen to match the original inverse-square release acceleration at separation one; it does not match every softened-length row.

The instantaneous equation with the same speed factor has an exact repeating solution with crossing speed 0.365164 and turning distance 0.5. The delayed equation instead gives crossing speeds 0.432764, 0.666169 and 0.937309, and turning distances 0.831831 and 1.639889, through time 16. Three numerical time steps preserve this sequence. Analytical controls passed before the target runs; independent full-trajectory validation remains open.

The exact balance calculation explains the distinction: delay and arrival weighting remove the cancellation that keeps the instantaneous oscillator's position-and-speed quantity constant. Regular passage and stronger attraction at large separation are therefore insufficient to produce recurrence in this tested case. The comparison changes delay and its source weighting together; it does not identify either alone as the cause, prove unlimited growth or rule out other equations.

**Scope of the comparison.** The [off-axis cancellation examples](../analysis/speed-crossing-opposing-interaction-geometry.md) use additional, noncollinear prescribed source histories. They can cancel selected local divergences, but are not complete coupled solutions for this collinear binary. The [transverse-moving rebound](../binary-research/manuscript.md#21-a-transverse-rebound-without-a-completed-return) likewise belongs to a different geometry. Neither supplies a missing stage in the tables above.


## 2. Earlier stationary-release diagnostics

The stationary two-member release begins at $(\pm0.5,0,0)$ with zero velocity and a constant past. Its separately recomputed release acceleration is inward, approximately $\mp0.28622861030534$ along the axis. The retained refinement ladder advances through increasingly close approach, but all recorded motion remains inward. It establishes no certified crossing, positive-separation inner turn, outer turn or recapture.

The failure frontier belongs to cross-pair certification rather than nontrivial self roots. Extending the same constant past from depth 10 to 20 or 40 produced identical streams in one recorded control. That checks sensitivity to the cutoff of that particular constant history; it does not prove that different endpoint-matched histories are forgotten. Symmetric zero midpoint and transverse drift likewise do not establish a general conservation law.

These are the earlier numerical diagnostics. Section 1 reports the subsequent incoming certificate and continuation obstruction. The [stationary diagnostic](../binary-research/evidence/2026-07-24-stationary-rest-two-architrino-breather-diagnostic.md) retains the original evidence.


## 3. History uncertainty in the stationary calculation

The stationary frontier initially stopped near $T=1.24$ despite opposite root-face signs and positive transmitter and receiver factors. The diagnosis identified a missing accepted joint-history carrier. This was an ordinary simple-root width problem, not a fold or absence of a physical root.

A validation-only carrier then certified the formerly blocked step to $1.245$. Further retained correlation advanced the frontier to $1.365$, a traversal-carrier repair to $1.38$, and a refined prefix to $1.395$. These changes retained the root-time tolerance $10^{-5}$. The next step still failed because its certified width exceeded that tolerance. Repeating interval arithmetic more often changed almost nothing when the retained-history remainder was the limiting term.

The chain is evidence of specific capability improvements, not a completed stationary fate. Direct/traversal parity through the same exact-pair implementation checks an interface. A fixture that expects an atomic rejection can pass while the requested future evolution remains unresolved. An in-process history carrier also does not become checkpoint persistence until its serialization and restart obligations are actually supplied.


<a id="22-incoming-acceleration-and-the-singular-endpoint"></a>
## 4. Incoming acceleration and the singular endpoint

The mirror approach exposes why the type and domain of a measure matter. Integrating ordinary arrivals before coincidence and assigning acceleration to a whole family at coincidence are different operations. The first can be finite even when an ordinary-kernel extension of the second diverges.

<a id="221-clock-transfer-and-finite-incoming-accumulation"></a>
### 4.1. Clock transfer and finite incoming accumulation

Along an injective ordinary branch with $D_t,D_r>0$, implicit differentiation gives $dS/dT=D_r/D_t$. For the vector kernel $\mathbf K=\sigma_{ij}K_{ij}c_f\hat{\mathbf r}/r^2$, changing clocks yields

$$
\int_B\frac{\|\mathbf K(T,S(T))\|}{D_t(T,S(T))}\,dT
=\int_{S(B)}\frac{\|\mathbf K(T(S),S)\|}{D_r(T(S),S)}\,dS
$$

Positive range and a positive receiver-factor floor can make a pointwise $1/D_t$ spike integrable. The branch and clock hypotheses are essential: this is not permission to evaluate $dS/D_r$ as $0/0$ on a frozen interval.

For the normalized mirror approach, let first ceiling arrival occur at $T_\ast$ with half-separation $q_\ast>0$. The proposed response gives the straight inward cap $q(T)=q_\ast-(T-T_\ast)$ until $T_c=T_\ast+q_\ast$. The one ordinary partner root moves through the pre-ceiling history, with playback $dS/dT=2/(1-u(S))$, where $u(S)$ is the positive inward source speed. The cap-emitted partner family has not yet arrived. If $u$ is left-$C^1$ at $T_\ast$ with $\alpha=u'(T_\ast^-)>0$, then $S(T)\uparrow T_\ast$ as the later receiver time $T\uparrow T_c$, with

$$
T_\ast-S(T)=\frac{2}{\sqrt\alpha}\sqrt{T_c-T}+o\!\left(\sqrt{T_c-T}\right).
$$

The emission-time deficit has square-root rather than Lipschitz dependence on the remaining receiver time. This open-segment asymptotic supplies no endpoint measure or event update.

The [endpoint reanalysis](analysis/capped-collinear-endpoint-reanalysis.md) gives the complete open-cap raw integral

$$
\frac K2\int_{S_0}^{T_\ast}\frac{dS}{R_p(S)^2}<\infty,\qquad R_p(S)\ge q_\ast>0
$$

Here $R_p$ is the causal partner range and $S_0$ is the source time received at cap entry. The complete row is forward on this prescribed segment, so its effective velocity increment is zero. At $T_c$, however, the whole partner cap becomes a characteristic family with $D_t=0$. Extending the ordinary inverse-square expression onto that event family produces the separate endpoint density $K/[2c_f^2(T_c-S)^2]$.

<a id="222-endpoint-divergence-and-failed-completions"></a>
### 4.2. Endpoint divergence and failed completions

The [open-interval convergence theorem](../analysis/coincidence-open-interval-convergence-and-endpoint-residue.md) retains the exact distinction. On each compact source interval ending short of $T_c$, an ordinary-root resolution converges in total variation if it has eventual coverage, uniform collapse to the event, convergent moving traces and kernel, positive convergent $D_r$, retained source labels and separated competing strata. Uniform position convergence and $L^1$ velocity convergence alone do not imply these conditions. Fixed positive-range pieces push forward to finite labeled receiver-time atoms; the endpoint variation satisfies

$$
\operatorname{TV}(\rho)=\frac{K}{2c_f^2}\left(\frac1\rho-\frac1{\rho_0}\right),\qquad
\lim_{\rho\downarrow0}\rho\,\operatorname{TV}(\rho)=\frac{K}{2c_f^2}
$$

The resolution limit precedes $\rho\downarrow0$. The residue measures the strength of the divergence; it is not an event impulse. There is no finite vector-Radon ordinary measure on a closed neighborhood containing that endpoint under the theorem's consistency assumptions.

Two tempting repairs fail. Signed principal-value cancellation across different times does not reduce total variation. Projecting a divergent forward coefficient does not define a response on an infinite raw ledger: a small transverse direction rotating while its coefficient grows can retain a bounded but nonconvergent transverse vector. Even exact removal of a leading term leaves the integrability of the remainder to prove. These rejected routes explain why the event construction needs its own carrier and law.

<a id="223-transverse-variation-on-the-open-cap"></a>
### 4.3. Transverse variation on the open cap

The singular endpoint does not prevent a conditional calculation on the preceding open segment. Its purpose is to describe the response to transverse displacement while the same ordinary branch and projection regime persist.

There is also a conditional first variation on the open inward cap. Write its positive raw component as $a_0\hat{\mathbf v}_r$, its causal range as $R=T-S$, and transverse perturbations as $\delta\mathbf y_r$ and $\delta\mathbf y_t$. To first order, the transverse displacement changes the arrival direction but not the root time, range or transmitter factor. The active projection gives

$$
\delta\mathbf A^{\mathrm{eff}}=-a_0\left[\frac{\delta\mathbf y_r(T)-\delta\mathbf y_t(S)}R+\delta\hat{\mathbf v}_r(T)\right]
$$

This is bending without a first-order longitudinal slowing term while the raw forward component remains strictly positive. A sign change leaves that smooth response branch. The calculation is a conditional variation about the stated cap solution, not a stability theorem or an exclusion of new partner events.


<a id="3-a-finite-coincidence-event-and-its-restart-data"></a>
## 5. A finite coincidence event and its restart data

The endpoint obstruction leaves a precise gap: the ordinary kernel does not provide a finite event update. The construction in this chapter supplies one under additional event assumptions. Its output is immediate data and retained history; whether those data determine one future is the subject of Section 6.

<a id="31-a-common-finite-source-carrier"></a>
### 5.1. A common finite source carrier

The proposed [common coincidence event](analysis/common-impulse-event-measure-and-mirror-cancellation.md) uses finite source-history data rather than the singular ordinary kernel. For cap duration $L$, retain both labels on a common lookback carrier $(0,L]\times\{+,-\}$ with finite matching measure $\nu$. Exact mirror symmetry gives signed source weights $+q\nu$ and $-q\nu$. Pushing them onto the same event $E$ produces opposite scalar atoms. Applying one common linear event-to-acceleration map after aggregation gives

$$
\mathsf M_E^{\mathrm{imp}}=q\nu((0,L])\delta_E-q\nu((0,L])\delta_E=0,\qquad
\mathbf J_{i,-}=-\mathbf J_{i,+},\qquad \Delta\mathbf V_i=\mathbf0
$$

The common map is additional law. Ordinary radial contributions would reinforce, because polarity and direction both reverse; their cancellation is not what was proved. Both source records remain present. The zero coefficient belongs to the event update, not to a vanished source, a finite part of the inverse-square kernel, or an independently derived conserved account.

<a id="32-complete-history-ownership-and-the-straight-right-trace"></a>
### 5.2. Complete history, ownership, and the straight right trace

Cancellation of the matched event coefficient retains both source histories in the restart state. A restart must therefore retain labels and distinguish emissions that have passed, belong to the current event, or remain inbound. Otherwise a statement about the net event update would silently become a deletion of history.

The [exact-mirror restart](analysis/mirror-event-family-completion-and-right-trace.md) requires coincident positions, matched incoming opposite wake-speed velocities and cap records, a classified incoming census, and no unmatched incoming event atom. It preserves continuous positions and velocities, splices the full labeled histories, and carries received-source clocks, ownership, emission records and typed measures. Every velocity atom must belong to a declared event; regular right velocities are absolutely continuous. The event supplies immediate data and bookkeeping. Right histories are solutions of the restart inclusion, possibly more than one.

A retained emission is sorted at the event by its causal gap. If $g(T_c,S)<0$, its front has already passed; if $g=0$, it lies on the current event/frozen family; if $g>0$, it remains inbound and must stay in the remainder. For an owned front, the opposite gap

$$
\gamma(T)=c_f(T-S)-\|\mathbf X_i(T)-\mathbf X_j(S)\|
$$

is nondecreasing under every ceiling-admissible future. Once strictly positive it stays positive, so an owned emission cannot return as an ordinary crossing. Equality can persist only on the rigid ridden geometry. This permanence argument preserves other wakes rather than deleting inconvenient contributions.

On the isolated straight right trace, normalized to $T_c=0$, the partner root is $S=0$ with $D_t=2$, $D_r=0$; older cap records have passed, new partner emissions have positive constant margin $2S$, and the self family is inactive in this extended model. Its additional frozen-root suppression sets the received ledger to zero, making straight separation compatible with that extended model. The canonical sharp row itself is nonzero: stationary receiver-side playback does not silence acceleration. Immediate exact rebound would require velocity jumps of magnitude two and is excluded by the extended model's zero-atom event rule. A zero atom does not exclude continuous reversal later within that model.

The inherited cap's incidence depends on the candidate trace: it is a whole characteristic family at coincidence, has passed on the prescribed straight separation, and is a whole ridden $D_t=D_r=0$ interval on exact rebound. Generic right traces need have neither disposition. This geometric census precedes the question of whether the proposed event law admits the candidate trace.

<a id="33-frozen-reception-remains-an-additional-choice"></a>
### 5.3. Frozen reception remains an additional choice

The frozen disposition itself remains additional semantics. The joint distribution $\mathbf K\delta(g)$ exists away from zero range on the frozen chart $g=2S$, and its receiver-time marginal supplies a nonzero density $\mathbf K(T,0)/2$. A source-crossing measure instead assigns zero to a frozen singleton. Both agree on ordinary crossing branches. Regular-chart equivalence cannot choose between them. The [swept-source proposal](../field-speed-ceiling/analysis/mathematics-geometry-dynamical-system.md) must therefore remain distinct from both the canonical regular row and the separate finite coincidence event.


<a id="4-multiple-futures-and-the-missing-selection-law"></a>
## 6. Multiple futures and the missing selection law

The straight restart is compatible, but compatibility establishes only one member of the allowed future set. This chapter constructs other members, follows prescribed braking through a return where sufficient bounds permit it, and then identifies what a selector would have to add. The nonuniqueness is a result within the proposed law and declared solution class, not a consequence of incomplete incoming data.

<a id="41-delayed-braking-from-the-same-complete-past"></a>
### 6.1. Delayed braking from the same complete past

The straight future has no uniform inactive-gap margin: the constant positive margins $2S$ tend to zero as post-event emission times approach zero. The [trailing-front theorem](analysis/trailing-front-activation-dichotomy.md) turns this observation into exact nonuniqueness in the stated isolated mirror class.

Set $c_f=1$, place the event at $T=0$, and write the mirror half-position and signed velocity as $x(T)=T-E(T)$ and $v(T)=1-m(T)$, with deficit integral $E'=m$. Choose any onset duration $u>0$ and keep the history straight through $T=u$. The partner causal equation is

$$
2S=E(T)+E(S)
$$

Immediately after onset its source time lies in the stored straight segment, so $E(S)=0$, $S=E(T)/2$, $D_t=2$ and $D_r=m(T)>0$. The complete active local system becomes

$$
E'=m,\qquad m'=\frac{K}{2(T-E/2)^2},\qquad E(u)=m(u)=0
$$

This smooth active system has a local solution with $m'(u^+)=K/(2u^2)>0$. Its one new partner root is ordinary for $T>u$; there is no new self root, no rebilling of the owned event family and no external or transverse contribution. Exact mirror symmetry embeds it in the two-label vector restart. A finite acceleration jump at onset is compatible with the declared absolutely continuous, almost-everywhere solution class.

Every positive $u$ therefore gives a distinct continuation sharing the complete preceding straight history, while the indefinitely straight continuation also remains. The acceleration law governs braking after the onset is supplied. It does not implement a causal mechanism producing that onset.

<a id="411-why-exclusion-of-an-immediate-cascade-does-not-select-onset"></a>
#### 6.1.1. Why exclusion of an immediate cascade does not select onset

The [event-adjacent no-cascade lemma](analysis/event-adjacent-no-cascade-lemma.md) closes a separate concern. A positive activation creates a nondecreasing speed deficit and a persistent ordinary partner root, so the nearby active set cannot consist of disconnected shrinking bursts. Onset at zero would require $m'(T)\ge K/(2T^2)$ and infinite variation. Each admitted local mirror solution has a positive initial interval free of ordinary active roots. This excludes the proposed thin ordinary cascade in that class, not the arbitrary positive waiting time or broader singular-clock phenomena.

Earlier claims that swept-source reception uniquely selected straight passage consequently fail. The historical ceiling-exit story in which a self-family atom is delivered and then projected to zero is also unnecessary and unsupported by the selected event law: the current construction retains that family as inactive, and its disappearance is not a newly declared atom. The [complete-lobe review](../field-speed-ceiling/analysis/independent-complete-lobe-returning-event-review-2026-09-02.md) records this correction explicitly.

<a id="42-returning-lobes-and-controlled-recurrence"></a>
### 6.2. Returning lobes and controlled recurrence

Choosing an onset makes it possible to ask a further question: how far does the resulting branch continue? The answer depends on source-window and range estimates. Return and repetition below are conditional on the supplied onset and the proposed event law; neither construction retroactively supplies an onset mechanism.

<a id="421-turnaround-and-inward-ceiling-arrival"></a>
#### 6.2.1. Turnaround and inward ceiling arrival

For a supplied onset, let $y=T-E/2$ be the causal range while the source remains on its initial straight segment. The [return-map analysis](analysis/two-lobe-return-map-and-autonomous-trigger-audit.md) derives

$$
2m-\frac{m^2}{2}=K\left(\frac1u-\frac1y\right),\qquad
y_{\mathrm{turn}}=\frac{2Ku}{2K-3u}
$$

Turnaround is $m=1$, where $v=0$. A finite positive value of this first-chart balance requires $K/u>3/2$; the sufficient bound $K\ge3u$ keeps the source root in the stored straight segment through turnaround. The stronger sufficient bound $K\ge7u/2$ gives $x_{\max}<y_{\mathrm{turn}}\le K/2$. After turnaround, with inward speed $w=-v$, the complete partner row supplies

$$
w^2\ge K\left(\frac1{x+x_{\max}}-\frac1{2x_{\max}}\right),\qquad
x_{\mathrm{cap}}\ge\frac{x_{\max}(K-2x_{\max})}{K+2x_{\max}}>0
$$

The continuation argument uses positive-range, simple-root local evolution until inward cap arrival or coincidence; it must not assume extension merely from an inequality. The bound forces inward ceiling speed at positive separation. The pair then coasts inward to a second coincidence.

<a id="422-the-complete-returning-cap-census"></a>
#### 6.2.2. The complete returning-cap census

The returning-cap census needs one additional observation. The helper $H(S)=S+x(S)$ becomes constant on the transmitter's inward cap, but its constant value is the return time, strictly above the root equation's right side before that event. Thus the unique ordinary partner root remains in the pre-cap source history. The receiver's same-label cap family is separately recorded inactive. On the open inward cap, $D_r=2$ and

$$
\int\frac{K}{r^2D_t}\,dT=\int\frac{K}{2r^2}\,dS,\qquad r\ge x_{\mathrm{cap}}>0
$$

The ordinary approach is integrable and has no event atom. The final matched cap, including its assigned start endpoint, belongs to the event carrier. All pre-cap records have strictly passed; equality at the return occurs exactly on the final inward cap. The same proposed event guard therefore reapplies with reversed orientation and incoming cap length $L_{\mathrm{out}}=x_{\mathrm{cap}}$.

<a id="423-recurrence-of-the-live-state"></a>
#### 6.2.3. Recurrence of the live state

Let $G(K,u)=x_{\mathrm{cap}}$. Permanent passage makes this outgoing duration independent of older incoming cap length. Equal prescribed onsets generate reflected lobes and a spatial period-two cycle. Literal all-past history nevertheless grows. The [future-equivalence theorem](analysis/future-equivalence-quotient-and-two-cycle.md) removes only complete owned and consumed record bundles with a strict permanent all-receiver passage margin. Zero-gap frozen families, current event data, source clocks, ownership and cap duration stay live. When all transition clauses consult only this live data, equivalent states have identical sets of future ledgers and continuations. Equal prescribed onsets then give a genuine cycle on the normalized event-section quotient. This is a controlled cycle of a relation, not an autonomous breather or a claim that the literal archive repeats.

<a id="424-the-cap-duration-reset-has-no-positive-fixed-cycle"></a>
#### 6.2.4. The cap-duration reset has no positive fixed cycle

The natural cap-duration reset also fails to select a positive fixed cycle. In the sufficient closed-form regime $\alpha=K/u\ge6$, define $z=\sqrt{2/(\alpha-2)}$. Then

$$
\frac{G(K,u)}u=(1+z^2)(1-z\arctan z)=\ell(\alpha),\qquad
P(K,u)=\frac{2Ku}{K-2u},\qquad 0<\ell(\alpha)<1
$$

The root stays in the stored straight history because $S_{\mathrm{cap}}/u=(1+z^2)z\arctan z<3/4$. The recursion $u_{n+1}=L_{n+1}=G(K,u_n)$ shrinks to zero, with $\ell(\alpha)=1-8/[3(\alpha-2)^2]+O(\alpha^{-3})$. Its waits are of inverse-square-root order and $\sum_nP_n$ diverges: no positive fixed cycle and no finite-time accumulation follow in this controlled regime. The formulas must not be extrapolated to ratios where the source leaves the stored straight segment.

The historical review reports lower-ratio numerical lobes and a sharper threshold for one estimate, but the [live reproducibility item](../field-speed-ceiling/work-queue.md#routed-reproducibility-gap) records that its two numerical instruments were not retained. Those measurements are unresolved reproducibility evidence, not a stronger theorem or a fresh calculation by this manuscript. The conservative sufficient bounds above remain the analytic statement.

<a id="43-what-a-selection-law-would-add"></a>
### 6.3. What a selection law would add

The local branches and returning lobes establish what the relation permits. A predictive choice among them requires an additional criterion whose input state, causal mechanism, and admissible solution class are specified. A regularity restriction or smoothing convention can change that choice, but its selection effect must be attributed to the added rule.

<a id="431-selection-proposals-and-the-retained-multivalued-relation"></a>
#### 6.3.1. Selection proposals and the retained multivalued relation

The [selection analysis](analysis/exact-mirror-continuation-selection-analysis.md) tests several proposed uniqueness routes. Active-chart ODE uniqueness begins only after $u$ is supplied. A continuous-acceleration restriction, scalar minimality principle or prohibition on an inactive channel causing its own first crossing changes the admissible solution law. A smooth-limit prescription is incomplete without an approximation family: zero-preserving smoothing can retain straight motion, while a vanishing seed near a selected positive onset can approach that braking branch. A set-valued differential-equation closure does not supply missing values merely by being named.

A positive onset functional built from a reduced event state would have to respect translation, rotation and scaling; a dimensional form is $u=K\Phi(L/K)$ in normalized units. No current wake or action equation defines $\Phi$. A selector consulting older records could have more arguments, but would also have to restore those records to the live quotient state. Causality, a single root, determinism and Markov sufficiency are different requirements. Even a unique partner root depends on a past position and velocity that instantaneous $(\mathbf X,\mathbf V)$ generally cannot reconstruct. Promoting a sufficient retained history to the state can address that information loss; it cannot cure multiple futures from the same complete state without a selection law.

The current [operator decision](../field-speed-ceiling/decisions/continuation-selection-operator-decision-2026-09-02.md) retains the multivalued relation as multivalued exact-mirror continuation. It adds neither a deterministic selector nor a probability distribution. This is closure of the present decision at its stated authority, not closure of the physical dynamics.

<a id="432-short-range-and-alternative-continuation-proposals"></a>
#### 6.3.2. Short-range and alternative continuation proposals

Other historical alternatives carry different missing data. A bounded short-range kernel or positive minimum separation introduces a new scale; excluding only exact coincidence does not bound arbitrarily close approaches. A finite transition interval needs entry, exit, retained-history and wake accounts throughout the interval. Stopping after a wake-speed segment exposes a nonordinary self-history family rather than an already defined braking row. An external third source can supply asymmetric input but does not determine how coincident opposite source records are aggregated. Non-collinear escape needs a declared perturbation class and cannot serve as a universal noncoincidence theorem. These proposals remain distinct from the controlled continuations already constructed.

<a id="433-strict-speed-domains-and-nonattainment-targets"></a>
#### 6.3.3. Strict speed domains and nonattainment targets

The strict requirement $\|\mathbf V\|<c_f$ excludes equality. If the existing capped response is changed only by excluding its boundary, it supplies no additional acceleration at any permitted speed. For the stationary incoming history, the unchanged equation then reaches the forbidden boundary in finite time, so this prescription supplies no permitted continuation through that time. This is a limitation of that prescription, not a rejection of the strict-speed requirement. A constant sub-wake separating trial $x(T)=v_0T$, $0<v_0<1$, has

$$
S(T)=\frac{1-v_0}{1+v_0}T,\qquad r(T)=\frac{2v_0}{1+v_0}T,\qquad
\|\mathbf a\|=\frac{K(1+v_0)}{4v_0^2T^2}
$$

Its ordinary backward contribution is nonintegrable at coincidence; the trial does not establish a finite turnaround. An emergent nonattainment target is instead an integrable bound $\mathbf V\cdot\mathbf A\le C(T)(c_f^2-\|\mathbf V\|^2)$, which would preserve a positive speed gap by Gronwall. This is an FSC-local candidate-update obligation, not a proved property of the unchanged law. Even proving it would not prove positive-separation reversal, which needs enough finite backward acceleration to cancel the incoming speed.

<a id="434-response-gains-and-a-drifting-encounter"></a>
#### 6.3.4. Response gains and a drifting encounter

A broader exploratory response writes separate longitudinal and transverse gains multiplying the corresponding complete-ledger components. The hard cap is one particular gain choice. Smooth nonattainment would instead require an appropriate boundary reachability estimate and generally changes the interior response. Such gains must be derived from the admitted wake and assembly dynamics before they can explain a ceiling; an observer-level relativistic comparison is only a recovery target. The historical suggestion that a gain modification removes every event obligation is too broad: range singularities, history strata and other events require their own analysis. Likewise, a drifting mirror encounter is a proposed preferred-frame diagnostic, whose interpretation needs an independently derived emergent comparison map and complete drifted histories.

<a id="collinear-coincidence-with-speed-cap"></a>
<a id="44-collinear-coincidence-under-the-sharp-equation-alone"></a>
### 6.4. Collinear coincidence with the speed cap and zero self acceleration

<a id="441-source-measure-surface-density-and-the-incoming-family"></a>
#### 6.4.1. Source measure, surface density, and the incoming family

Set $c_f=1$ and coincidence at $t=0$. The incoming mirror cap has $X_A(s)=s$, $X_B(s)=-s$ for $-L\le s\le0$. Earlier histories remain retained; the results below assume $|X_A(s)|<-s$ for $s<-L$, no external sources, and zero self response. These are restrictions of the theorem, not universal initial data.

Continuous emission labels do not conflict with isolated reception roots. At a fixed receiver event, an ordinary root is an isolated emission time whose sphere passes through that event. A continuum of emitted labels can supply one such root. At coincidence the incoming capped partner instead supplies an entire interval of simultaneous roots. The ordinary sum cannot be applied term by term to that interval.

An emission at $s=-\tau$ from B is centered at $+\tau$. Its sphere reaches the origin at zero. The direction of attraction on A is positive, toward the old center and along its incoming motion, not backward. The outgoing braking row on a straight-through candidate is a different reception: the crossover root gives $-K/(2t^2)$ for $t>0$.

The signed emitted amount is a source measure proportional to $q\,ds$. A sphere's integrated normalization is distinct from its local density and the receiver acceleration kernel. Finite total source measure therefore neither bounds the inverse-square acceleration near zero range nor supplies a finite velocity change at coincidence. No separate finite kick equal to $q$ may be added at incidence. The [continuous-emission analysis](analysis/cap-only-continuous-emission-crossover.md) records the endpoint obstruction without replacing the kernel.

<a id="442-continuous-passage-and-two-sharp-rebound-attempts"></a>
#### 6.4.2. Continuous passage and two rebound attempts

The [partner-only calculation](analysis/self-silent-partner-near-event-balance.md) follows the root of the actual moving history. For a continuous positive outgoing launch, the unique new root satisfies $s+x(s)=t-x(t)$ and produces $a(t)\le-K/(2t^2)$. The cap retains this backward acceleration. Integrating from any $\delta>0$ to $t$ and sending $\delta$ to zero contradicts bounded velocity. This excludes the stated regular continuous-launch class; it does not predict an unbounded physical speed.

An exact immediate full-speed rebound would put A at $x(t)=-t$. Every old partner cap emission remains a root because $|-t+s|=t-s$. The residual is identically zero over an open set of receiver and source times, with $D_t=D_r=0$. This persists at positive ranges away from coincidence. The ordinary weight is undefined; the finite-impulse theorem for an isolated nondegenerate fold does not apply because its nonzero-derivative hypotheses fail. All old partner centers attract A to the right, opposing rebound, so the ceiling does not silence the family. The [sharp rebound audit](analysis/cap-only-rapid-reversal-geometry.md#sharp-law-audit--2026-09-16) therefore identifies both an underived event update and an undefined subsequent interval, not merely one missing value at zero.

Suppose instead A reverses and immediately slows below the ceiling. Write $X_A=-y$, $X_B=y$, $y(0)=0$, outward speed $w=y'$ with $0<w\le1$, and $y(t)<t$ for all positive times in an initial outward interval. The old family is then absent. The complete ordinary ledger contains one new root satisfying $s+y(s)=t-y(t)$ and gives

$$
w'(t)=-\frac{K}{[t-s(t)]^2[1+w(s(t))]}\le-\frac{K}{2t^2},
\qquad
w(t)-w(\delta)\le-\frac K2\left(\frac1\delta-\frac1t\right).
$$

Bounded outward speed contradicts this inequality as $\delta\downarrow0$. Local absolute continuity on positive intervals suffices; even a separately granted initial velocity jump would not repair this ordinary outward leg. The proof excludes neither every singular continuation nor different histories, external interactions, or broken mirror symmetry.

<a id="443-once-only-passage-and-the-unresolved-contact-alternative"></a>
#### 6.4.3. Once-only passage and the unresolved contact alternative

For a fixed labeled emission center $C_s$, the interior gap $d_s(t)=t-s-|x(t)-C_s|$ is nondecreasing under the cap. Once strictly positive, it cannot return to zero. Thus an emission that has passed cannot be encountered again. A ridden front has persistent equality instead; the theorem supplies no response or source-depletion rule during that contact. Declaring a family spent after a reversing action would add semantics not derived from the sharp equation. A positive-duration turn opens a positive gap, but drawing such a turn does not establish its dynamical existence.

A candidate stationary pair at the origin has no ordinary positive-delay partner roots after crossover under the stated older-history conditions. This empty ordinary sum does not admit persistent coincidence or supply the required stopping changes $\Delta v_A=-1$, $\Delta v_B=+1$. Likewise, convergence of positions toward coincidence would not establish convergence of velocities or of the singular delayed acceleration. Neither a prescribed oscillation nor the retained smoothed runs resolves this boundary.

The current collinear result is therefore a set of scoped obstructions, with no derived sharp bounce, stopping event, or retained binary. A complete sharp event response remains a foundational target. The positive regular circular result below is a separate reason to continue investigating the ceiling.
