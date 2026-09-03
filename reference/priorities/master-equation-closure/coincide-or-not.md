# Coincide Or Not: Adjudicating Architrino Coordinate Coincidence In A Populated Universe

## Status

- Kind: `priority`
- Queue item: `MEC-008`
- Priority object: `same_transmitter_coincidence_domain_reachability`
- Claim level: `framework survey, two steel-man cases, and one decisive open question; no continuation law claimed`
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

This packet supplies the analytical frame for controls (2) and (3) and identifies the quantity control (2) must measure. It executes none of the four controls.

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

Claim grade: this is a `method`, not a claim. Its applicability here requires that the rescaled field extend continuously, which is not established for a state-dependent delay system and must be checked before the construction can be trusted. That check is the first concrete deliverable this packet recommends.

### Framework 3 — Regularization and its obstruction

Separately from reachability, a singularity may be *removable*: a change of dependent variables together with a change of the evolution parameter can sometimes convert an apparent singularity into a regular passage with a unique continuation.

There is a specific structural reason to doubt removability here, and it is native to $\mathbb{A}\mathbb{A}\mathbb{A}$ rather than borrowed. Regularization schemes operate by finding a new evolution parameter in which the motion is smooth. But the *content* of the Master Equation — which past emission event acts on a given reception — is fixed by absolute time through $r=c_f\Delta$. An integrator's parameter may be rescaled freely; the causal-root condition may not be reparameterized without changing which events are admitted. The standard technique therefore has strictly less freedom than it does for an instantaneous law.

Plainly: the usual trick for surviving a singularity is to change clocks until the motion looks smooth. Here the clock is not a convenience — it is what decides who hears whom. You cannot change it without changing the physics.

Claim grade: `inferred`, and checkable. Falsified by exhibiting a reparameterization that leaves the causal-root admission set invariant while regularizing the coincidence endpoint. Existing corroborating evidence sits on the same side: the straight-through mirror trial in [the continuation scratchpad](../field-speed-ceiling/coincidence-continuation-scratchpad.md) yields a $\delta^{-2}$ obstruction rather than a clean passage, and [the endpoint-residue result](../field-speed-ceiling/coincidence-open-interval-convergence-and-endpoint-residue.md) establishes that ordinary receiver measures cannot converge to a finite vector-Radon measure on any neighborhood containing the endpoint.

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

A secular drain removing areal rate makes $h=0$ an attractor, and coincidence is generic for bound opposite-polarity pairs. A secular gain, or a vanishing secular part, leaves the transverse barrier intact and confines coincidence to a set that a populated environment never holds.

Plainly: whether two architrinos can ever touch comes down to whether the time lag steadily bleeds away their sideways swing, or merely rocks it back and forth. Steady bleeding means they eventually stop swinging and fall straight in. Rocking means they always turn away in time.

Claim grade: the central-case barrier $\ddot d=h^{2}/d^{3}-a(d)$ and the reversal at $d\approx h^{2}/C$ are `derived` for exactly central rows. The $d$-independence of $\alpha$ is `derived` under the near-field lemma's hypotheses. The power-versus-logarithm comparison is `derived` given those scalings. The reduction of the whole verdict to the secular part of $\dot h$ is `inferred` and is this packet's principal claim. It is falsified by exhibiting a populated approach in which the barrier fails while the secular part of $\dot h$ vanishes, or survives while a one-signed secular drain is present.

A consistency check points toward the barrier surviving: the workstream's own bound-pair behavior settles to a characteristic separation rather than collapsing, which requires the secular transverse part to vanish or reverse at that separation. This is corroboration by internal coherence, not independent evidence, and it must not be counted as such.

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

The ruling-out case is currently the stronger of the two, and the reason is specific rather than a matter of weight of argument. O1 and O4 are polarity-independent: the first concerns the degradation of the solution concept, the second concerns what the environment can and cannot do. The ordinary intuition that a barrier protects only like-polarity pairs does not limit either one. O6 additionally converts the strongest ruling-in argument, R5, into an exact-aim condition, which places it under the same protection as O3.

The ruling-in case retains one argument that the ruling-out case has not answered: R2 combined with R3. For an opposite-polarity pair there is no repulsive barrier at all, and the transverse barrier that would replace it is a scaling statement whose sufficiency depends entirely on the secular question posed above. Until the secular part of $\dot h$ is computed, the ruling-out case rests on an unproven scaling and the adjudication is not closed.

Plainly: the case against coincidence is winning, and it is winning for reasons that survive whichever polarities are involved. But it has exactly one hole, and the hole is the ordinary attracting pair, which is also the most common configuration in the universe. That is not a hole one can leave open.

## Recommended Dispatch

Four deliverables, in dependency order. The first three are analytical and belong to this packet; the fourth is MEC-008's required control (2) and belongs to the EOM solver.

1. **Secular transverse row.** Compute the secular part of $\dot h=d\,a_\perp$ for an opposite-polarity pair under the transmitter-side row, averaged over a turn, to leading order in the near-field regime. Report its sign. This single result closes or reopens the adjudication.
2. **Blow-up admissibility check.** Determine whether the rescaled field of Framework 2 extends continuously to $\rho=0$ for a state-dependent delay system. If it does, construct the flow on the exceptional set and classify its fixed points by $\rho$-stability. If it does not, record the obstruction, because that obstruction is itself a ruling-out result of type O1.
3. **Reparameterization invariance test.** Determine whether any change of evolution parameter leaves the causal-root admission set invariant. A negative result upgrades Framework 3 from `inferred` to `derived`.
4. **Minimally noncollinear EOM control.** Execute MEC-008 control (2) with a complete root census, instrumented to report the turn-averaged transverse contribution that deliverable 1 predicts, so the analytical sign and the evolved sign are produced by separately authored instruments. Under the evidence-independence rule this pairing is evidence only if the analytical calculation and the solver instrumentation are not authored in the same change; if they are, the agreement tests implementations rather than the scaling claim.

Deliverable 1 is the decider and should be dispatched first, because it tells deliverable 4 what to measure. Deliverables 2 and 3 strengthen the ruling-out case but cannot by themselves close the R2/R3 hole, and neither satisfies MEC-008's exclusion criterion on its own: an invariant-region theorem on the populated retained-history phase space is still required, with explicit quantifiers over population, initial histories, regular-root margins, and finite evolution interval.

## Claim Register

| Claim | Grade | Falsifier |
| --- | --- | --- |
| $r=0\iff\Delta=0$; coincidence is vanishing delay | `derived` | a root admitted with $r=0$ and $\Delta\neq0$ |
| Null-action-at-$r=0$ is inert for reachability and continuation | `derived` | any such conclusion that changes when only the single-instant value changes |
| Near-field magnitude $\approx\kappa\lvert q_iq_j\rvert c_f\lvert D_t\rvert/d^{2}$ | `derived` under stated hypotheses | exact root computation on a compliant chart departing from this leading order |
| Transmitter factor suppresses rather than amplifies after root substitution | `derived` under the same hypotheses | as above |
| Delay misalignment angle $\alpha$ is independent of $d$ | `derived` under the same hypotheses | a compliant approach on which $\alpha$ vanishes or diverges with $d$ |
| Exactly central rows give a transverse turning point at $d\approx h^{2}/C$ for $h\neq0$ | `derived` | an exactly central case with $h\neq0$ reaching $d=0$ |
| Barrier threshold falls as $\sqrt{d}$ while transverse drain accumulates as $\ln(1/d)$ | `derived` given the above scalings | a compliant approach violating either rate |
| Verdict reduces to the secular part of $\dot h$ | `inferred` — principal claim | barrier failing with vanishing secular part, or surviving with one-signed secular drain |
| Vanishing-delay spectral escape obstructs finite-regularity continuation | `inferred` — transfer from constant-lag systems unproven | a continuation with bounded local regularity across a coincidence event |
| Regularization is structurally narrowed by absolute-time root admission | `inferred` | a reparameterization preserving the admission set and regularizing the endpoint |
| Codimension two implies coincidence is non-generic | `derived`, and explicitly insufficient alone | not applicable; the limitation is stated rather than claimed |
| Coincidence is unreachable in a populated universe | **not claimed** | — |
| Coincidence occurs in a populated universe | **not claimed** | — |

## Nonclaims

This packet establishes no continuation, passage, rebound, coordinate-crossing outcome, outgoing history, boundary value, event semantics, conserved account, stability verdict, physical realization, MEC closure, or EOM solver acceptance. It does not reopen MEC-006 or MEC-007, does not modify the canonical transmitter-side acceleration row, and treats every receiver-side factor strictly as signed playback rather than as acceleration strength, per the workstream's revocation boundary. It asserts neither that coincidence occurs nor that it cannot; it establishes what would settle the question and which single computation decides it.

It does not close MEC-008. Neither MEC-008 acceptance condition is met: no invariant-region theorem over the populated retained-history phase space has been derived, and no independently certified EOM-evolved counterexample exists. MEC-008 remains open, and MEC-002 and MEC-003 may not cite domain exclusion as a solution on the strength of anything in this document.

This document does not answer whether two architrinos can touch. It does establish that the answer is decided by one computable quantity, and it names that quantity.

Closure goal: replace the null-action convention at $r=0$ with an adjudicated verdict by computing the secular transverse areal-rate contribution for an opposite-polarity pair, thereby either proving a populated transverse barrier or exposing coincidence as a dynamical attractor requiring a derived event rule.
