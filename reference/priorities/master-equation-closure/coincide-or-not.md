# Coincide Or Not: Adjudicating Architrino Coordinate Coincidence In A Populated Universe

## Status

- Kind: `priority`
- Queue item: `MEC-008`
- Priority object: `same_transmitter_coincidence_domain_reachability`
- Claim level: `derived leading secular sign, derived regularization obstruction, bounded EOM arc measurement, and unresolved MEC-008 acceptance; no continuation law claimed`
- Workstream: [master-equation-closure](priorities.md)
- Current lifecycle status: `In progress`
- Promotion status: not promoted
- Normalization: $c_f=1$ throughout; symbolic $c_f$ is retained only where its dependence is the point of the identity.
- Separate mathematical owner: [MEC-007 mirror close-approach causal-root boundary](mirror-close-approach-causal-root-boundary.md) owns the persistent-label mirror-symmetric collinear encounter. This packet does not reopen, re-derive, or contradict it.
- Consumed as settled prior: MEC-007's first-boundary ordering and unchanged-law divergence; [MEC-006 receiver wake-gradient closure](receiver-wake-gradient-closure.md) for the regular fixed-reception gradient; [GD-5 vanishing-delay hazard](../field-speed-ceiling/germund-dahlquist-review-2026-08-02.md); [ceiling rigidity and self-root exclusion](../field-speed-ceiling/jack-k-hale-second-review-2026-08-02.md).

## Scope

This packet is the analytical owner of MEC-008. It asks one question that the completed collinear programs deliberately do not answer.

> In a populated universe of many architrinos in general position, with no imposed symmetry, can two architrinos reach the same point of the Euclidean void at the same absolute time?

The declared objects are: a reframing of coincidence as delay vanishing rather than as a kernel pole; an assessment of the current null-action-at-coincidence convention; a survey of the mathematical frameworks that apply natively to the Master Equation as a delay system in $\mathbb{R}^3$ under absolute time; the strongest available case for ruling coincidence in; the strongest available case for ruling it out; and the identification of the single quantity whose sign decides between them.

The collinear head-on case is already settled and owned elsewhere. This document is about the ordinary case, where two architrinos among many drift near each other with no special alignment, and it exists to decide whether that case can ever end in exact contact.

This packet derives no continuation law, selects no boundary value, assigns no event semantics, and closes no conserved account. It is an adjudication frame and a dispatch target.

## MEC-008 acceptance conditions

MEC-008 is stated in the [work queue](work-queue.md#mec-008--same-transmitter-coincidence-domain-reachability) and its acceptance conditions govern this packet. They are restated here because they bound what any result in this document is allowed to claim.

A **domain exclusion** — a verdict that coincidence cannot occur — is accepted only if a theorem derived from the existing update proves an invariant admissible region that cannot reach the boundary. Singularity of the formula at the boundary is not itself an exclusion proof. That distinction is the reason the codimension argument in Framework 4 below is recorded as insufficient rather than as a verdict, and the reason the transverse barrier is posed as a scaling question with a named decider rather than asserted.

**Reachability** — a verdict that coincidence does occur — is accepted by one independently certified EOM-evolved counterexample carrying complete retained history and causal-root provenance. Prescribed isolated collinear histories are local analytical controls and cannot alone decide physical-domain membership, which is why MEC-007's mirror result is consumed here as a bounded prior rather than as an answer.

An assertion that the Master Equation simply stops before the boundary is classified as an incomplete-domain convention, not a solution, until one of the two verdicts above is supplied or a separately accepted terminal-event ontology exists. The null-action convention assessed below falls under exactly this classification.

MEC-008's required controls are: (1) the existing isolated collinear birth as a singular analytical control; (2) a minimally noncollinear three-or-more-architrino EOM-evolved control with complete root census; (3) perturbations of population, geometry, and retained prehistory testing whether the boundary is avoided robustly or only by fine tuning; and (4) a local chord expansion separating the necessary $\|\mathbf V_i\|=c_f$ contact condition from curvature-dependent higher-order terms. Every numerical instantiation uses $c_f=1$.

This packet supplies the analytical frame for controls (2) and (3), derives the leading signed pair contribution, rules out a nontrivial time-rescaled exceptional-sphere flow on the declared regular chart, and records a bounded EOM-evolved three-architrino arc. The EOM arc does not complete a turn, so required control (2) remains open.

Neither the near-diagonal self-root stratum nor a chance pair encounter is privileged here. MEC-008 covers both the same-transmitter case, in which an architrino's own path history produces a vanishing-delay root, and the two-body case, in which two distinct architrinos approach coincidence. The transverse analysis below addresses the two-body case directly; its bearing on the self-root case runs through ceiling rigidity, recorded as O6.

## Why The Collinear Result Does Not Settle The General Case

MEC-007 proves, on its declared admissible class, that same-event coordinate coincidence cannot be the first event: the receiver speed reaches the primitive wake speed $u=c_f$ while both the present separation $q(T_\ast)$ and the delayed range $R_\ast$ remain strictly positive. It further proves that any continuous regular extension past that threshold births a positive-delay self root whose exact delay measure has infinite total variation, so the unchanged sharp-root row sum supplies no locally finite continuation.

Both results are load-bearing and both are consumed here as settled. Neither transfers to the populated case, for two structural reasons.

First, MEC-007's protection is a *speed* threshold, not a *separation* threshold. It says the encounter exits the regular chart before contact because a receiver runs out of admissible speed. A populated encounter with an arbitrary approach geometry has no reason to saturate speed first; the exit ordering is a property of the mirror chart's one-dimensional forced kinematics, and reordering it is exactly what breaking the symmetry does.

Second, the mirror configuration is invariant under the dynamics. Persistent-label mirror symmetry is preserved by the law, so the relative separation vector is confined to a line for all time. That confinement is the whole reason the encounter is forced. In general position nothing confines it, and the two transverse directions become live degrees of freedom that the collinear analysis has integrated away by hypothesis.

Plainly: the finished proof says two architrinos sliding toward each other on the same wire hit a speed limit before they touch. It says nothing about two architrinos free to move in all three directions, because the wire was doing most of the work.

## Reframing: Coincidence Is Vanishing Delay, Not A Kernel Pole

The causal-root condition is $r_{ij}=c_f(T_r-T_t)$, so on any admitted root

$$r=0 \iff \Delta = T_r-T_t = 0 .$$

Coincidence is therefore not primarily an event at which an inverse-square kernel becomes large. It is the event at which the delay itself vanishes and the Master Equation ceases to be a delay system at all, attempting to degenerate into an instantaneous law.

This reframing has an immediate consequence already recorded in the lane. GD-5 observes that the method-of-steps causality horizon — the forward interval over which the ledger is fully determined by already-computed history — equals the minimum active delay, and collapses to zero precisely on approach to coincidence. Explicit causal stepping is impossible there, not through numerical weakness but because no forward window is causally closed.

Plainly: the equation only knows how to move forward in time by less than the shortest lag it is currently using. Coincidence is where the shortest lag is zero, so the equation has no forward step available at all. That is a statement about the law, not about any particular integrator.

The corresponding solver behavior is the halt code `minimum_step_exhausted` in [`src/eom/src/CoupledEvolution.cpp`](../../../src/eom/src/CoupledEvolution.cpp). Under this reframing that halt should be read as a faithful report of a structural fact rather than as an instrument limitation to be engineered away.

Claim grade: the equivalence $r=0\iff\Delta=0$ is `derived` from the root condition. The causality-horizon collapse is `derived` and already owned by GD-5. The reclassification of `minimum_step_exhausted` as structural is `inferred`; it is falsified by an explicit causal stepping construction that remains well defined with $\inf r=0$, which the delay identity appears to forbid.

### Same-time coincidence is not the same problem as different-time path crossing

Two distinct questions are easy to run together, and only one of them is hard.

**Same-time coincidence** asks whether $\mathbf X_i(T)=\mathbf X_j(T)$ for some absolute time $T$ — two architrinos at one point on one slice. That is the subject of this packet.

**Different-time crossing** asks whether one architrino later occupies a point another once occupied, at a different time. That is not a hazard at all. It is the theory's **normal mode of interaction.**

The reason is the root condition itself. Every admitted contribution is a receiver meeting a surface emitted from a transmitter's past position, so architrinos are continuously arriving at places other architrinos have been. Ordinary interaction *is* different-time crossing, and it happens at every root of every pair at every instant.

The two questions therefore differ in what they impose. Same-time coincidence is three scalar conditions $\mathbf X_i(T)=\mathbf X_j(T)$ against one free parameter $T$, hence codimension two, and it degenerates the delay as recorded above. Different-time crossing imposes only that the root condition hold, which is what the acceleration row requires anyway, and it degenerates nothing.

Stating the distinction matters because an intuition that "architrinos are constantly running into each other's positions" is correct, and it does not bear on coincidence at all. What makes coincidence hard is simultaneity, not proximity.

Claim grade: `derived` from the root structure. Falsified by exhibiting an admitted root whose contribution requires the transmitter and receiver to occupy the same point at the same absolute time, which the $H(0)=0$ endpoint convention excludes.

### Conjecture: three-body coincidence should be more strongly excluded than two-body

Simultaneous coincidence of **three** architrinos imposes six scalar conditions — $\mathbf X_i(T)=\mathbf X_j(T)$ and $\mathbf X_j(T)=\mathbf X_k(T)$ — against the same single free parameter $T$. That is codimension five, against codimension two for a pair.

If codimension counting has any force here, a triple coincidence is far more strongly excluded than a pair coincidence, and an $n$-fold coincidence more strongly still, giving a hierarchy rather than a single threshold.

Two cautions keep this a conjecture rather than a result, and both are the same caution recorded in Framework 4 below. Codimension counting establishes non-genericity within a family of systems, and $\mathbb{A}\mathbb{A}\mathbb{A}$ is one specific system whose flow is free to live on a thin set. More seriously, the count assumes nothing is driving the surplus conditions toward zero — and a bound three-architrino assembly is precisely a mechanism that holds several separations small and correlated. Symmetric configurations may collapse the effective count exactly as the collinear case collapses it for a pair.

Claim grade: `guessed`. Falsifier: a symmetric three-architrino configuration whose retained dynamics drives all three separations to zero together, which would show the effective codimension is lower than the naive count and that the hierarchy does not hold.

The useful form of this conjecture is not the ordering itself but what it predicts for the transverse analysis below: if the barrier argument survives for pairs, it should survive *more easily* for triples, because more transverse conditions must be held simultaneously. A result showing the opposite would indicate that the pair analysis has missed a cooperative channel.

## Assessment Of The Current Null-Action Convention

The working model treats coordinate coincidence as contributing null action: the acceleration row admitted at $r=0$ is assigned the zero vector, and the coincidence event is booked as carrying no update.

The finding of this packet is that the convention is not incorrect but is **inert with respect to the questions it is being asked to settle**. A trajectory's arrival at coincidence is decided by the accumulated update $\int\|\mathbf A\|\,dT$ over an approach interval, and by the existence of an admissible continuation on an open neighborhood of the endpoint. Neither functional is sensitive to the value assigned on a single absolute-time instant, which carries zero measure in that integration. Assigning null action removes a formal ambiguity in how the symbol is evaluated at one point while leaving reachability and continuation entirely undetermined.

This is consistent with the workstream's own acceptance criterion, which demands $\int_{T_0}^{T_0+\epsilon}\|\mathbf A_{ii}(T)\|\,dT<\infty$ on an open neighborhood rather than a value at the event.

Plainly: choosing what the rule says at the exact instant of contact is like choosing what a sign says at the bottom of a cliff. It settles no question about whether you go over, and none about what happens after.

Claim grade: `derived`. Falsified by exhibiting any reachability or continuation conclusion that changes when the assigned value at the single coincidence instant is changed, with the approach neighborhood held fixed.

## Near-Field Magnitude Lemma

Let $d=\|\mathbf X_i(T_r)-\mathbf X_j(T_r)\|$ be the present separation and consider the first partner root. Define

$$g(\Delta)=\|\mathbf X_i(T_r)-\mathbf X_j(T_r-\Delta)\|-c_f\Delta ,
\qquad g(0)=d>0 .$$

Writing $\hat{\mathbf s}$ for the unit vector from the transmitter's delayed position to the receiver's present position, differentiation gives

$$g'(\Delta)=\hat{\mathbf s}\cdot\mathbf v_j(T_r-\Delta)-c_f=-c_f D_t ,
\qquad D_t=1-\frac{\hat{\mathbf s}\cdot\mathbf v_j}{c_f} .$$

So the transmitter factor is exactly the normalized root-condition derivative: $g$ is strictly decreasing precisely when $D_t>0$, which is the sub-field-speed line-of-sight condition. Under the hypothesis that $D_t$ is bounded away from zero on the approach and $\mathbf v_j$ varies negligibly over the root delay, the first root satisfies

$$\Delta_\ast\approx\frac{d}{c_fD_t},\qquad r_\ast=c_f\Delta_\ast\approx\frac{d}{D_t} .$$

The substitution is the point of the lemma, because the canonical row is written in the root range $r$ while every reachability, barrier, and turning-point question is posed in the present separation $d$. These are distinct quantities and $D_t$ is precisely the leading-order conversion factor between them. Substituting $r_\ast=d/D_t$ into $\|\mathbf A\|=\kappa\sigma|q_iq_j|c_f/(r^2|D_t|)$ gives the near-field magnitude in the **present** separation:

$$\boxed{\;\|\mathbf A\|\;\approx\;\frac{\kappa|q_iq_j|\,c_f\,|D_t|}{d^{2}}\;}$$

Plainly: the law is written in terms of where the other architrino was; every question worth asking is about where it is now. The conversion between the two is exactly the transmitter factor, and forgetting to convert inverts the conclusion.

### Power accounting

The sign of the transmitter factor's effect must be stated explicitly, because the naive reading inverts it. In the raw row $|D_t|$ sits in the denominator, which suggests that a transmitter moving toward the receiver amplifies the contribution. After the root substitution it appears linearly in the numerator instead. The two effects act in opposition and the geometric one wins two powers to one:

| Effect | Origin | Power of $D_t$ |
| --- | --- | ---: |
| Range: small $D_t$ pushes the admitted emission point further away | $1/r_\ast^{2}=D_t^{2}/d^{2}$ | $+2$ |
| Bunching: small $D_t$ compresses arriving wake fronts and raises the row amplitude | $1/\lvert D_t\rvert$ | $-1$ |
| Net near-field dependence | | $+1$ |

The bunching enhancement is therefore real but outvoted, because range enters squared while bunching enters linearly. In the limit $D_t\to0^{+}$ the admitted root recedes without bound and the contribution vanishes rather than diverging.

Plainly: ask where the other architrino was standing when it emitted the wake now arriving. A transmitter moving toward the receiver was further away then, so what arrives is fainter; a transmitter moving away was closer then, so what arrives is louder. Compression of the arriving fronts partly offsets this, but distance costs twice over while compression pays back once.

### Exact case check

For a transmitter in constant radial motion the lemma is exact rather than leading order, which supplies an independent check on the algebra. Set $c_f=1$ and let the transmitter move along the line of sight with signed speed $v$, positive toward the receiver, so $D_t=1-v$ exactly. At delay $\Delta$ the transmitter stood at range $d+v\Delta$, so the root condition $d+v\Delta=\Delta$ gives

$$\Delta_\ast=\frac{d}{1-v}=\frac{d}{D_t},\qquad r_\ast=\frac{d}{D_t},$$

with no expansion and no discarded terms. Evaluating at $d=0.1$ with $\kappa|q_iq_j|$ factored out:

| Transmitter motion | $v$ | $D_t$ | $r_\ast$ | $\|\mathbf A\|$ | Relative to static |
| --- | ---: | ---: | ---: | ---: | ---: |
| Approaching at half field speed | $+0.5$ | $0.5$ | $0.200$ | $50$ | $0.5\times$ |
| Static | $0$ | $1.0$ | $0.100$ | $100$ | $1\times$ |
| Receding at half field speed | $-0.5$ | $1.5$ | $0.0667$ | $150$ | $1.5\times$ |

Both the direct evaluation $c_f/(r_\ast^{2}|D_t|)$ and the boxed form $|D_t|/d^{2}$ return the same three magnitudes. The receding row is the sharpest illustration: its admitted emission range $r_\ast=0.0667$ is strictly smaller than the present separation $d=0.1$, so the receiver is acted on by an emission made from nearer than the partner now stands.

Plainly: at the same present separation, an approaching partner delivers half the acceleration a stationary one would, and a receding partner delivers half again more. Nothing is being hidden in an approximation here; the constant-speed radial case gives these numbers exactly.

### Scope of the correction

Three boundaries on what this lemma does and does not establish.

The power is untouched. For sub-field-speed transmitters $D_t\in(0,2)$, so the correction is a bounded coefficient that rescales the near-field constant and never regularizes the $1/d^{2}$ growth. No softening of coincidence follows from it.

Only the transmitter's velocity enters. The receiver's own motion does not appear in the acceleration magnitude at all, per the workstream's transmitter-side convention and its revocation boundary against receiver-weighted $|D_r/D_t|$ as acceleration strength. There is accordingly no symmetric mutual-enhancement mechanism during a close approach: each architrino's coefficient is set by its partner's line-of-sight velocity, independently.

The direction of the effect runs against approach. Because an approaching partner carries $D_t<1$, mutual approach is self-limiting in coefficient rather than self-reinforcing. Any argument that close approach drives its own runaway through transmitter-side bunching is therefore unavailable.

Plainly: this makes close approach slightly weaker than a naive reading suggests, but it does not make it finite, and it removes one route by which coincidence might have been argued to drive itself.

Claim grade: `derived` under the two stated hypotheses ($D_t$ bounded away from zero on the approach; $\mathbf v_j$ approximately constant over $\Delta_\ast$). It is falsified by an exact root computation on a chart satisfying both hypotheses whose leading-order magnitude departs from $|D_t|/d^2$, or by demonstrating that either hypothesis fails generically on populated approaches. The lemma says nothing about charts where $D_t\to0$, which is the field-speed-ceiling boundary owned separately.

## Applicable Mathematical Frameworks

Four frameworks apply natively to the Master Equation in $\mathbb{R}^3$ under absolute time. None imports a law, constant, or mechanism from an observer-level theory; each supplies a method for asking the reachability question rigorously.

### Framework 1 — State-dependent delay systems

The Master Equation is a state-dependent delay differential system: it prescribes a second derivative, the input is drawn from earlier absolute times, and the size of the lag is itself determined by the solution through $r=c_f\Delta$. This is the correct classification, and it is why results proved for instantaneous systems do not transfer without argument.

The relevant structural fact concerns the behavior of such systems as the delay shrinks. For a linear scalar delay system with constant lag $\tau$, seeking solutions of the form $e^{\lambda T}$ yields a transcendental characteristic equation rather than a polynomial one, and hence an infinite family of characteristic roots. One root tracks the instantaneous-system answer as $\tau\to0$; the remainder have magnitudes growing like $|\lambda|\sim 2\pi k/\tau$ and escape to unbounded frequency. They do not merge into the instantaneous limit; the small-delay limit is singular.

Plainly: any system with a lag carries a hidden family of ringing modes whose pitch is set by one over the lag. Shrink the lag toward zero and those modes ring arbitrarily fast. Coincidence is the point where the lag is zero, so the system becomes unboundedly stiff exactly there.

Claim grade: the constant-lag spectral escape is a standard `derived` fact about linear delay systems. Its transfer to the nonlinear, vector, state-dependent Master Equation is `inferred` and unproven; the honest status is a candidate obstruction to any finite-regularity continuation through coincidence, not a theorem. It is falsified by constructing a continuation with bounded local regularity across a coincidence event.

### Framework 2 — Blowing up the diagonal

The diagonal is the set $\{\mathbf X_i=\mathbf X_j\}$ in configuration space. Asking whether the flow reaches it is awkward, because the acceleration row is undefined there, so the question concerns a flow arriving where it has no definition.

The standard geometric repair is to blow up the diagonal: substitute $\mathbf r=\rho\,\hat u$ with $\rho\ge0$ a scalar separation and $\hat u$ a unit direction, and rescale the time parameter so the rescaled vector field extends continuously to $\rho=0$. The single undefined point is replaced by a two-dimensional exceptional set carrying the directions of approach, and the flow becomes an ordinary flow on that set.

Plainly: instead of asking whether the motion hits a bad point, inflate the point into a sphere labelled by which direction you arrived from, and ask which spots on that sphere the motion can actually land on. A question about a singularity becomes a question about an ordinary flow on a surface.

What this buys is decisive rather than descriptive. The rescaled flow on the exceptional set has fixed points, and their stability in the $\rho$ direction answers the reachability question directly: if every fixed point repels in $\rho$, coincidence is unreachable and the ruling-out case is proved; if some attract, coincidence is reachable and the attracting $\hat u$ enumerate the only admissible approach directions, which is exactly the data a continuation law would need.

Claim grade: this is a `method`, not a claim. The admissibility check below rules out its nondegenerate application on the declared bounded-velocity regular chart: every acceleration-regularizing time scaling freezes the geometric sphere and sends the root's rescaled memory span to infinity.

### Framework 3 — Regularization and its obstruction

Separately from reachability, a singularity may be *removable*: a change of dependent variables together with a change of the evolution parameter can sometimes convert an apparent singularity into a regular passage with a unique continuation.

There is a specific structural reason to doubt removability here, and it is native to $\mathbb{A}\mathbb{A}\mathbb{A}$ rather than borrowed. Regularization schemes operate by finding a new evolution parameter in which the motion is smooth. But the *content* of the Master Equation — which past emission event acts on a given reception — is fixed by absolute time through $r=c_f\Delta$. An integrator's parameter may be rescaled freely; the causal-root condition may not be reparameterized without changing which events are admitted. The standard technique therefore has strictly less freedom than it does for an instantaneous law.

Plainly: the usual trick for surviving a singularity is to change clocks until the motion looks smooth. Here the clock is not a convenience — it is what decides who hears whom. You cannot change it without changing the physics.

Claim grade: the universal reparameterization result is `derived` below: with fixed $c_f$, only absolute-time translations preserve the canonical admission equation over the declared history class, and a translation cannot regularize vanishing delay. Existing corroborating evidence sits on the same side: the straight-through mirror trial in [the continuation scratchpad](../field-speed-ceiling/coincidence-continuation-scratchpad.md) yields a $\delta^{-2}$ obstruction rather than a clean passage, and [the endpoint-residue result](../field-speed-ceiling/coincidence-open-interval-convergence-and-endpoint-residue.md) establishes that ordinary receiver measures cannot converge to a finite vector-Radon measure on any neighborhood containing the endpoint.

### Framework 4 — Codimension and transversality, with its limits

Coincidence imposes three scalar conditions $\mathbf X_i(T)=\mathbf X_j(T)$ against one free parameter $T$, hence codimension two. A trajectory in general position misses.

This packet records the argument together with an explicit statement of why it cannot carry the verdict alone, because it is the argument most likely to be over-trusted. Codimension counting establishes non-genericity within a family of systems; $\mathbb{A}\mathbb{A}\mathbb{A}$ is one specific system, and a specific flow is free to live on a codimension-two set. More importantly, the count silently assumes the two surplus conditions are not being actively driven toward zero. If the dynamics contains a channel that shrinks the miss, coincidence is an attractor rather than an accident and the count is irrelevant.

Plainly: counting says you will not land on the target by chance. It says nothing at all if something is steering you onto it.

Claim grade: the codimension count is `derived`. Its adequacy as a ruling-out argument is explicitly `not claimed`. This is precisely the gap that the next section's transverse analysis is built to close.

## The Transverse Barrier And The Decisive Quantity

This section contains the packet's principal new content. Nothing in the lane currently analyzes the transverse degrees of freedom that the collinear programs remove by hypothesis, and they turn out to carry the verdict.

Let $\mathbf d=\mathbf X_i-\mathbf X_j$ be the present relative separation, $d=\|\mathbf d\|$, and let $\theta$ parameterize the direction of $\mathbf d$. Define the areal rate

$$h=d^{2}\dot\theta ,$$

a purely kinematic quantity built from positions and velocities alone, with no mass, no force, and no assembly-level bookkeeping.

If the relative acceleration were directed exactly along $\mathbf d$ with magnitude $a(d)$, then $h$ would be constant and the radial evolution would read

$$\ddot d=\frac{h^{2}}{d^{3}}-a(d) .$$

With the near-field magnitude lemma supplying $a(d)\approx C/d^{2}$, the geometric term $h^{2}/d^{3}$ dominates as $d\to0$ for any $h\neq0$. Radial approach therefore reverses at the finite separation $d\approx h^{2}/C$, and coincidence requires $h=0$ exactly.

Plainly: two things that are not aimed exactly at each other sweep around each other faster and faster as they close, and that sweeping wins over the pull. They turn instead of touching. Only a perfectly aimed approach has nothing to turn.

The Master Equation's row is not exactly central, and this is where the delay enters decisively. The admitted direction $\hat{\mathbf r}_{ij}$ points from the transmitter's *delayed* position, not its present one, so the row is misaligned from $\hat{\mathbf d}$ by an angle $\alpha$. The areal rate is then not conserved but obeys $\dot h=d\,a_\perp$ with $a_\perp$ the transverse component.

The size of that misalignment is the first surprise. The delayed and present transmitter positions differ by approximately $\mathbf v_j\Delta_\ast$ with $\Delta_\ast\approx d/(c_fD_t)$, so the misalignment angle is

$$\alpha\;\approx\;\frac{v_{j\perp}\Delta_\ast}{d}\;\approx\;\frac{v_{j\perp}}{c_fD_t},$$

which is **independent of $d$**. The delay-induced misalignment does not shrink on approach; it persists at fixed angle all the way in.

Plainly: as two architrinos close in, the direction each one is pushed stays tilted away from the straight line between them by the same angle no matter how close they get. Getting closer does not straighten the aim.

Now the competition can be posed exactly. The barrier survives while $h^{2}>Cd$, so the threshold that $h$ must clear falls to zero like $\sqrt{d}$, a power law. Meanwhile the transverse row drains or feeds $h$ at rate $|\dot h|\sim\alpha C/d$, and integrating along an approach at radial speed $u$ gives an accumulated change

$$|\Delta h|\;\sim\;\frac{\alpha C}{u}\,\ln\frac{1}{d},$$

which is logarithmic. A power beats a logarithm, so on this comparison alone the barrier survives and coincidence is confined to the exact-aim set $h=0$.

That comparison is necessary but not sufficient, and the reason is the crux of the entire question. A logarithm that accumulates with a fixed sign still reaches any finite magnitude eventually, so a **secular** one-signed drain drives $h$ through zero at the finite separation $d\sim\exp(-h_0u/\alpha C)$, and at that separation the barrier condition $h^{2}>Cd$ has already failed. A drain that merely oscillates — reversing each half turn as the transverse geometry reverses — leaves $h$ bounded and the barrier intact.

Therefore the verdict reduces to a single quantity:

> **Does the delay-induced transverse row carry a secular component in the areal rate $h$, and if so, what is its sign?**

A secular drain removing areal rate makes $h=0$ an attractor and would make coincidence generic for bound opposite-polarity pairs on this local model. A secular gain repels from $h=0$, while a vanishing secular part leaves the central barrier unchanged. Either non-drain outcome supports the exact-aim case locally, but only an invariant-region theorem can establish populated-domain exclusion.

Plainly: the local question has three answers. The delay can bleed away the sideways swing, rock it back and forth with no net change, or steadily enlarge it. Only the first drives the pair toward exact aim.

Claim grade: the central-case barrier $\ddot d=h^{2}/d^{3}-a(d)$ and the reversal at $d\approx h^{2}/C$ are `derived` for exactly central rows. The $d$-independence of $\alpha$ is `derived` under the near-field lemma's hypotheses. The power-versus-logarithm comparison is `derived` given those scalings. Reduction of the local pair verdict to the secular part of $\dot h$ is `derived`; extension from that local verdict to the full populated domain remains `inferred` and is not claimed. A populated approach in which coincidence is reached while the leading pair coefficient remains positive would falsify the sufficiency of the local reduction for the global domain question.

The earlier consistency expectation that a characteristic separation required the secular term to vanish or reverse was too narrow. A positive secular pair term is also compatible with non-collapse because it strengthens the transverse barrier; whether a retained bound branch exists still requires its own complete-ledger stability certificate.

## Signed Secular Calculation

The turn average does not vanish. On the regular first-root chart, the leading mutual opposite-polarity contribution has the same sign as the areal rate itself. It therefore increases $\lvert h\rvert$ rather than draining it.

Write the relative position and velocity as

$$
\mathbf d=d\hat{\mathbf n},
\qquad
\mathbf w=\mathbf v_i-\mathbf v_j,
\qquad
\mathbf h=\mathbf d\times\mathbf w.
$$

The vector $\mathbf h$ is the three-dimensional form of the signed planar areal rate $h=d^2\dot\theta$. Begin with the declared symmetric absolute-frame control $\mathbf v_i=\mathbf w/2$ and $\mathbf v_j=-\mathbf w/2$; this is a physical restriction, not a change of frame. Impose the same local hypothesis used by the near-field magnitude lemma: each transmitter velocity is constant to leading order across the first-root delay. The two ordered roots then have the same delay $\Delta$, delayed range $r=c_f\Delta$, and positive transmitter factor $D_t$. Their delayed line-of-action vectors are opposite. For the row received by $i$,

$$
\widehat{\mathbf r}_{ij}
=
\frac{d\hat{\mathbf n}-\mathbf w\Delta/2}{c_f\Delta},
\qquad
K
=
\frac{\kappa\lvert q_iq_j\rvert c_f}{r^2D_t}.
$$

Opposite polarity gives $\mathbf A_i=-K\widehat{\mathbf r}_{ij}$ and $\mathbf A_j=+K\widehat{\mathbf r}_{ij}$. The mutual relative acceleration is therefore $\mathbf a_{ij}^{\mathrm{rel}}=-2K\widehat{\mathbf r}_{ij}$, and its contribution to the areal-rate derivative is

$$
\begin{aligned}
\dot{\mathbf h}_{ij}
&=
\mathbf d\times\mathbf a_{ij}^{\mathrm{rel}}\\
&=
-2Kd\hat{\mathbf n}\times
\frac{d\hat{\mathbf n}-\mathbf w\Delta/2}{c_f\Delta}\\
&=
\frac{K}{c_f}\mathbf h\\
&=
\frac{\kappa\lvert q_iq_j\rvert}{r^2D_t}\mathbf h.
\end{aligned}
$$

Every scalar multiplying $\mathbf h$ is positive on the declared regular chart. The result is not an oscillatory torque whose two half-turns cancel: reversing the direction of the pair's turn reverses both $h$ and $\dot h$, so the magnitude grows in either orientation. Using $r\approx d/D_t$ gives the leading present-separation form

$$
\boxed{
\dot h_{ij}^{\mathrm{sec}}
\approx
+\frac{\kappa\lvert q_iq_j\rvert D_t}{d^2}\,h
}
$$

and hence

$$
\operatorname{sgn}\!\left(\dot h_{ij}^{\mathrm{sec}}\right)
=
\operatorname{sgn}(h),
\qquad
\frac{d\lvert h\rvert}{dT}
\approx
\frac{\kappa\lvert q_iq_j\rvert D_t}{d^2}\lvert h\rvert.
$$

The leading coefficient is independent of $D_r$. Receiver-side playback never enters the magnitude or sign.

### Turn average and magnitude

On a planar turn, $\dot\theta=h/d^2$. Division by this kinematic identity gives

$$
\frac{dh}{d\theta}
\approx
\kappa\lvert q_iq_j\rvert D_t.
$$

Consequently one oriented turn contributes

$$
\Delta h_{ij}^{\mathrm{sec}}
\approx
\kappa\lvert q_iq_j\rvert
\oint D_t\,d\theta.
$$

For nearly constant $D_t$, the magnitude is $\lvert\Delta h_{ij}^{\mathrm{sec}}\rvert\approx2\pi\kappa\lvert q_iq_j\rvert D_t$, with the sign of the incoming $h$. In the lowest-order symmetric sub-field chart $D_t=1+O(\lVert\mathbf v\rVert^2/c_f^2)$, so the leading increment is $2\pi\kappa\lvert q_iq_j\rvert$ per turn. The time average over a period $P$ has the equivalent form

$$
\left\langle\dot h_{ij}\right\rangle_P
\approx
\frac{\kappa\lvert q_iq_j\rvert}{P}
\int_0^P\frac{D_t h}{d^2}\,dT,
$$

which has the sign of $h$ whenever $h$ does not reverse on the turn.

This also corrects the earlier interpretation of the logarithmic estimate. If the misalignment angle is frozen as an externally prescribed constant, integrating $\lvert\dot h\rvert\sim\alpha C/d$ along a constant-speed radial approach gives the stated logarithm. For the mutual pair, however, the misalignment is generated by the pair's own transverse velocity, $\alpha\asymp\lvert h\rvert/(2c_fD_td)$. Substitution gives the multiplicative law above. If $\dot d\approx-u<0$ and $D_t$ is nearly constant over a radial subinterval, then

$$
\ln\!\frac{\lvert h(d)\rvert}{\lvert h(d_0)\rvert}
\approx
\frac{\kappa\lvert q_iq_j\rvert D_t}{u}
\left(\frac{1}{d}-\frac{1}{d_0}\right).
$$

The secular term is therefore parametrically stronger than the fixed-angle logarithm on that prescribed approach, but it has the protective sign: positive feedback for $\lvert h\rvert$. The approximation ceases to describe the trajectory once the growing transverse term reverses the radial approach.

The common absolute-translation velocity cancels from the first-order mutual term. Acceleration rows from other architrinos remain bounded relative to the pair's $d^{-2}$ row so long as no third-party separation or transmitter factor becomes singular. Their contribution can tilt $\mathbf h$ and can create a nonzero $\mathbf h$ from exact aim, but it cannot reverse the displayed leading pair coefficient on that regular near-field chart.

Plainly: the delayed attractive direction points slightly ahead in the sense of the pair's existing turn. Each architrino is accelerated along its own sideways motion, so the turn grows rather than being bled away. The target $h=0$ is a repelling set for the leading pair contribution, not an attractor.

Claim grade: `derived` on the pair-center, first-root, positive-$D_t$, locally constant-transmitter-velocity chart. The present-separation and full-turn formulas are leading-order consequences of the same hypotheses as the near-field lemma. Falsifier: a compliant opposite-polarity chart on which the complete two-row mutual contribution has $\mathbf h\cdot\dot{\mathbf h}<0$, or a full turn with fixed sign of $h$ and $D_t>0$ whose mutual contribution satisfies $\Delta\lvert h\rvert\le0$.

### Decider verdict

The calculated secular part is one-signed but has the opposite sign from the proposed attractor branch. It is a secular **gain**, not a secular drain. Therefore the transmitter-side pair row does not drive $h$ through zero. It strengthens the transverse barrier and confines pair coincidence, at this leading local order, to exact aim or to a separate non-pair contribution that cancels the nonzero $h$ at a particular event.

This is not yet MEC-008's accepted domain-exclusion theorem. The derivation is local, assumes the regular first-root chart, and does not quantify every populated retained history through a finite interval. It decides the R2/R3 secular-sign hinge but does not prove a population-stable invariant admissible region.

## Blow-Up Admissibility

No nondegenerate exceptional-sphere flow exists within the declared regular finite-speed chart. The obstruction can be stated without importing an instantaneous collision law.

Let the leading relative acceleration have the near-field form $\dot{\mathbf w}=\rho^{-2}\mathbf F+o(\rho^{-2})$, with $\rho=d$, bounded physical relative velocity $\mathbf w$, and nonzero bounded $\mathbf F$ on a positive-$D_t$ chart. Rescale absolute time by $dT/ds=\rho^p$. The blown-up kinematic equations are

$$
\rho'
=
\rho^p\hat{\mathbf u}\cdot\mathbf w,
\qquad
\hat{\mathbf u}'
=
\rho^{p-1}
\left(\mathbf I-\hat{\mathbf u}\hat{\mathbf u}^{\mathsf T}\right)\mathbf w,
\qquad
\mathbf w'
=
\rho^{p-2}\mathbf F+o(\rho^{p-2}),
$$

where a prime means differentiation in $s$. Continuity of the acceleration equation with bounded physical velocity requires $p\ge2$. For every such $p$, both geometric equations vanish at $\rho=0$, and the radial linearization also vanishes. The exceptional sphere is frozen rather than carrying fixed points with attracting or repelling $\rho$ directions. It therefore supplies no $\rho$-stability classification.

The alternative nondegenerate inverse-square scaling introduces $\mathbf z=\rho^{1/2}\mathbf w$ and $dT/ds=\rho^{3/2}$. A nonzero boundary value of $\mathbf z$ then requires $\lVert\mathbf w\rVert\asymp\rho^{-1/2}$, which exits every finite-speed, transmitter-factor-bounded chart before $\rho=0$. It is not an admitted blow-up of the Master Equation regime being analyzed.

The state-dependent delay adds a second obstruction. Since $\Delta T\asymp\rho$ while $dT/ds=\rho^p$, the same root spans

$$
\Delta s\asymp\rho^{1-p}.
$$

For the only bounded-velocity scalings that regularize the acceleration, $p\ge2$, the required source point recedes to unbounded $s$-history as $\rho\to0$. The boundary value therefore cannot be a closed continuous vector field on $(\rho,\hat{\mathbf u},\mathbf w)$ or on any finite-memory extension of those variables. Retaining the complete absolute-time history preserves the original delayed problem but does not construct an ordinary flow on the exceptional sphere.

Claim grade: `derived` for power-law time rescalings on the declared bounded-velocity, positive-$D_t$, first-root near-field chart. Falsifier: a blow-up with bounded physical velocities whose rescaled field is continuous and nondegenerate at $\rho=0$, retains a finite rescaled memory horizon, and preserves the original absolute-time causal-root set.

## Reparameterization Invariance

Only translations of absolute time preserve the canonical causal-root admission set for the full history class. Let $T=\phi(s)$ be a strictly increasing change of parameter. Passive relabeling preserves the physical roots only if the root condition continues to use the stored absolute-time difference,

$$
\left\lVert
\mathbf X_i(\phi(s_r))-\mathbf X_j(\phi(s_t))
\right\rVert
=
c_f\left[\phi(s_r)-\phi(s_t)\right].
$$

To recover the same canonical equation in the new parameter with the same fixed $c_f$, one would need

$$
\phi(s_r)-\phi(s_t)=s_r-s_t
$$

for every admitted pair. Stationary separated histories realize every positive delay, so the identity must hold for every $s_t$ and every positive increment. Hence $\phi(s)=s+T_0$. A constant translation neither slows the coincidence approach nor removes the vanishing delay. A scaling would change the numerical wake speed, and any state-dependent scaling would change which emission and reception events satisfy the root equation.

A passive nonuniform relabeling can carry absolute time as an additional state and continue evaluating roots with $\phi(s_r)-\phi(s_t)$. That leaves the admission set intact, but it leaves the singular absolute-time equation intact as well; it is bookkeeping, not regularization.

Claim grade: `derived` for invariance over the declared history class with fixed $c_f$. Falsifier: a strictly increasing non-translation $\phi$ that preserves the admitted emission-reception pairs for every stationary separated control and every moving retained history while keeping the canonical root equation and the same $c_f$.

## MEC-008 Control (2): Bounded EOM-Evolved Arc

The existing EOM solver and its pre-existing root-accounting output were used without modifying either instrument. The control initialized an opposite-polarity pair at $\mathbf X_a=(0.05,0,0)$ and $\mathbf X_b=(-0.05,0,0)$ with velocities $(0,0.2,0)$ and $(0,-0.2,0)$, plus a third positive architrino at $(0.3,0.2,0.7)$ with zero velocity. The retained inertial prehistory covered $[-2,0]$, $c_f=1$, $\kappa\lvert q_aq_b\rvert=0.008$, and the EOM solver evolved the complete three-path state from $T=0$ to $T=0.2$ at fixed step $0.001$.

All 200 steps were accepted with no rejected step. Each step certified all nine ordered receiver-transmitter rows, including root-free complements, no unresolved traversal row, and no memory-boundary contact: 1,800 ordered root-accounting rows in total. The pair's areal-rate vector changed from

$$
\mathbf h(0)=(0,0,0.04)
$$

to

$$
\mathbf h(0.2)
=
(-0.0001861421810,\ 0.0004307294674,\ 0.0465138089981).
$$

The component along the initial turn normal therefore increased by $0.0065138089981$, or $16.2845\%$, while the separation direction advanced by $0.8493798015$ radians, or $0.135183$ turns. The sign agrees with the derived secular gain over this certified arc.

Claim grade: `measured` by the pre-existing EOM solver's coupled-evolution, complete-root-accounting, and published-history outputs over the declared $0\le T\le0.2$ control only. The cross product used to read $\mathbf h$ is its defining kinematic expression, not an acceleration oracle. Falsifier: replay of the declared request yielding a non-complete accepted-step root census or a nonpositive change in the initial-normal component of $\mathbf h$.

This does not complete required control (2). The arc covers only $13.5183\%$ of a turn, and the initial retained history is prescribed rather than EOM-produced. Earlier fixed-step attempts to extend a comparable three-path request through a full turn exceeded their bounded process time without returning a retained final record. Two later adaptive requests did return fail-closed records: the original-scale control halted at $0.366036$ turns and a faster-turning sub-field control halted at $0.294148$ turns. In both cases the next candidate step exhausted the root-completeness precision budget at an evolving published-history joint. Their accepted prefixes continued to increase the initial-normal component of $\mathbf h$, but the overall responses were failed and cannot supply a turn average. The required full-turn EOM measurement and an independently retained successful replay artifact therefore remain open.

## Steel-Man: Ruling Coincidence In

Stated at full strength, without hedging, so that it can be defeated on its merits.

**R1. Nothing at the destination opposes arrival.** Architrinos are true geometric points with no volume and no exclusion, as [the foundations](../../../content/markdown/aaa/foundations/architrino.md) state directly. Whatever resistance exists is accumulated during approach and never at the endpoint. This is an unusual situation and it is the primary argument: there is no contact term to appeal to.

**R2. For opposite polarity the accumulated update points inward.** By the near-field lemma the magnitude grows like $|D_t|/d^{2}$, and for opposite polarity that growing contribution is directed along the closing direction. The approach is self-reinforcing, not self-limiting, and no repulsive barrier exists to invoke.

**R3. A populated universe destroys every isolation-based protection.** Barrier and conservation arguments constructed for an isolated pair have no referent when each architrino receives contributions from an enormous number of transmitters. There is no closed subsystem for which a relative account can be conserved, so the transverse barrier of the previous section must be defended as a scaling statement rather than as a conservation statement.

**R4. $\mathbb{A}\mathbb{A}\mathbb{A}$ contains structures that deliberately revisit small separation.** Bound opposite-polarity pairs are basic constituents, not rare accidents. Each is a configuration that returns to small separation repeatedly over cosmological durations. Measure-zero-for-a-random-draw is weak protection against a structure whose function is to revisit the neighborhood.

**R5. Self-action is steerable rather than accidental.** The coincident same-transmitter case needs no second object to be found. An architrino's own path history can be arranged by its own evolution, so the relevant configuration is reachable by design rather than by coincidence in the colloquial sense.

**R6. The convention currently in force concedes the point.** Modeling $r=0$ as null action presupposes that the configuration occurs and needs a value. A model that had ruled coincidence out would not need the assignment.

## Steel-Man: Ruling Coincidence Out

**O1. Vanishing delay degrades the solution concept.** By Framework 1 the delay spectrum escapes to unbounded frequency as $\Delta\to0$, and by GD-5 no causally closed forward window exists at the endpoint. This argument does not assert that something pushes back; it asserts that there is no admissible object to arrive with. It is polarity-independent, which the ordinary repulsion intuition is not.

**O2. Divergent accumulated update is a barrier in the strict sense.** MEC-007's exact result that the newborn self-root measure has infinite total variation is the collinear instance of a general form of argument: a functional that is monotone along admissible histories and unbounded at the target makes the target unreachable. This form is indifferent to genericity, which is what makes it stronger than codimension counting.

**O3. Exact aim is two conditions and a populated environment never holds them.** Coincidence requires $h=0$ exactly at exactly the right instant. A populated environment perturbs every pair transversally and continuously. Failing to hold an exact transverse condition is the one thing an environment can be relied upon to do.

**O4. Magnitude asymmetry means the environment cannot defeat a barrier.** At small $d$ the pair row scales like $1/d^{2}$ while the aggregate environmental contribution remains $O(1)$. The environment therefore cannot push a pair through a divergent barrier. Combined with O3 this is a pincer rather than a tension: the environment destroys exact aim while being unable to remove whatever protection exists.

**O5. Regularization has less freedom here than for instantaneous laws.** By Framework 3, the causal-root condition is tied to absolute time and cannot be reparameterized away, so the standard route to a removable singularity is structurally narrowed. The independent $\delta^{-2}$ and endpoint-measure results corroborate.

**O6. Ceiling rigidity structurally excludes the self-root route for curved paths.** Under the ceiling, every admissible path satisfies $\|\mathbf X(T)-\mathbf X(S)\|\le c_f(T-S)$ with equality only on a straight exact-aim cap-speed chord, so every non-straight ceiling-admissible history has no positive-delay self root at all. R5's steerable self-action route is therefore available only on exactly straight cap-speed segments, which is itself an exact-aim condition of the same kind O3 addresses.

## Adjudication

The signed calculation closes the R2/R3 secular-sign hole in favor of the transverse barrier. The opposite-polarity pair row supplies a secular gain with $\mathbf h\cdot\dot{\mathbf h}>0$, not a drain. The pair therefore does not steer itself toward exact aim; it steers away from it. The blow-up and reparameterization results independently strengthen O1 and O5 by showing why an ordinary exceptional-sphere regularization cannot be constructed without leaving the declared causal-root problem.

The adjudication still does not meet MEC-008's domain-exclusion acceptance condition. A local repelling coefficient is not an invariant-region theorem over all populated retained histories. Third-party rows can create, tilt, or cancel $\mathbf h$, root topology can change outside the first-root chart, and the bounded EOM control covers only part of one turn. Reachability is likewise unproved because no certified EOM history reaches the boundary.

Plainly: the ordinary attracting pair closes the one hole in the local barrier argument, but local repulsion from exact aim is not yet a theorem that every populated history misses coincidence.

## Deliverable Disposition

1. **Secular transverse row — derived.** The leading signed contribution is $\dot h_{ij}^{\mathrm{sec}}\approx+\kappa\lvert q_iq_j\rvert D_t h/d^2$. It increases $\lvert h\rvert$ and makes $h=0$ repelling on the declared chart.
2. **Blow-up admissibility — obstructed.** A bounded-velocity rescaling needs $dT/ds=O(\rho^p)$ with $p\ge2$; this freezes the exceptional sphere and makes the rescaled root-memory span diverge. The nondegenerate inverse-square velocity scaling exits the finite-speed regular chart.
3. **Reparameterization invariance — derived negatively.** Only $T=s+T_0$ preserves the canonical root equation for the full history class with fixed $c_f$, and this translation does not regularize coincidence.
4. **Minimally noncollinear EOM control — partially executed, not accepted.** The unchanged EOM instrumentation gives a complete nine-row census and positive $h$ increment over a certified $0.135183$-turn arc. No full-turn retained result was obtained, so the required turn average remains open.

The remaining closure path is not another sign calculation. It is a full-turn independently retained EOM control followed by an invariant-region theorem with explicit quantifiers over population, initial histories, regular-root margins, and finite evolution interval.

## Claim Register

| Claim | Grade | Falsifier |
| --- | --- | --- |
| $r=0\iff\Delta=0$; coincidence is vanishing delay | `derived` | a root admitted with $r=0$ and $\Delta\neq0$ |
| Null-action-at-$r=0$ is inert for reachability and continuation | `derived` | any such conclusion that changes when only the single-instant value changes |
| Near-field magnitude $\approx\kappa\lvert q_iq_j\rvert c_f\lvert D_t\rvert/d^{2}$ | `derived` under stated hypotheses | exact root computation on a compliant chart departing from this leading order |
| Transmitter factor suppresses rather than amplifies after root substitution | `derived` under the same hypotheses | as above |
| Delay misalignment angle $\alpha$ is independent of $d$ | `derived` under the same hypotheses | a compliant approach on which $\alpha$ vanishes or diverges with $d$ |
| Exactly central rows give a transverse turning point at $d\approx h^{2}/C$ for $h\neq0$ | `derived` | an exactly central case with $h\neq0$ reaching $d=0$ |
| Barrier threshold falls as $\sqrt{d}$ while a prescribed fixed-angle transverse magnitude accumulates as $\ln(1/d)$ | `derived` given the above scalings | a compliant approach violating either rate |
| Leading opposite-polarity mutual row gives $\dot h_{ij}^{\mathrm{sec}}\approx+\kappa\lvert q_iq_j\rvert D_t h/d^2$ | `derived` on the declared chart | a compliant complete two-row calculation with $\mathbf h\cdot\dot{\mathbf h}\le0$ |
| One-turn secular increment is approximately $\kappa\lvert q_iq_j\rvert\oint D_t\,d\theta$ | `derived` on the declared chart | a compliant full turn with fixed-sign $h$ and positive $D_t$ but nonpositive $\Delta\lvert h\rvert$ |
| $h=0$ is repelling under the leading pair contribution | `derived` locally | a negative linear coefficient of $h$ on the declared chart |
| Bounded-velocity blow-up does not yield a nondegenerate exceptional-sphere flow | `derived` for power-law time rescalings on the declared chart | a continuous nondegenerate boundary field preserving bounded velocity, finite rescaled memory, and the original roots |
| Vanishing-delay spectral escape obstructs finite-regularity continuation | `inferred` — transfer from constant-lag systems unproven | a continuation with bounded local regularity across a coincidence event |
| Only absolute-time translations preserve canonical root admission for the full history class at fixed $c_f$ | `derived` | a non-translation preserving every stationary and moving retained-history root pair |
| Three-architrino EOM control increases the initial-normal $h$ component by $0.0065138089981$ over $0.135183$ turns | `measured` on the declared bounded arc | replay with incomplete accepted-step census or nonpositive increment |
| Codimension two implies coincidence is non-generic | `derived`, and explicitly insufficient alone | not applicable; the limitation is stated rather than claimed |
| Different-time path crossing is the normal interaction mode, not a coincidence hazard | `derived` | an admitted root requiring transmitter and receiver at the same point at the same absolute time |
| Three-body coincidence is codimension five, so more strongly excluded than pairwise | `guessed` | a symmetric three-architrino configuration whose retained dynamics drives all three separations to zero together |
| Coincidence is unreachable in a populated universe | **not claimed** | — |
| Coincidence occurs in a populated universe | **not claimed** | — |

## Nonclaims

This packet establishes no continuation, passage, rebound, coordinate-crossing outcome, outgoing history, boundary value, event semantics, conserved account, global stability verdict, physical realization, MEC closure, or EOM solver acceptance. It does not reopen MEC-006 or MEC-007, does not modify the canonical transmitter-side acceleration row, and treats every receiver-side factor strictly as signed playback rather than as acceleration strength, per the workstream's revocation boundary. It asserts neither that coincidence occurs nor that it cannot; it establishes that the leading pair secular term repels from exact aim and records why that local result is not a global domain theorem.

It does not close MEC-008. Neither MEC-008 acceptance condition is met: no invariant-region theorem over the populated retained-history phase space has been derived, and no independently certified EOM-evolved counterexample exists. MEC-008 remains open, and MEC-002 and MEC-003 may not cite domain exclusion as a solution on the strength of anything in this document.

This document does not answer whether two architrinos can touch on every admissible populated history. It does answer the local decider: the transmitter-side mutual pair contribution is a secular gain in $\lvert h\rvert$, not a drain.

Closure goal: replace the null-action convention at $r=0$ with an adjudicated verdict by computing the secular transverse areal-rate contribution for an opposite-polarity pair, thereby either proving a populated transverse barrier or exposing coincidence as a dynamical attractor requiring a derived event rule.
