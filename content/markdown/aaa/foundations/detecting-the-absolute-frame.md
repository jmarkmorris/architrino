# Detecting the Absolute Frame

If space has no grid painted on it, how can anything be said to be at rest?

That is not a rhetorical question. $\mathbb{A}\mathbb{A}\mathbb{A}$ claims [architrinos](architrino.md) — its sole primitive material entities — have definite positions and velocities in the [Euclidean void](euclidean-void.md). But the void is the same everywhere and in every direction, so nothing about a location marks it out. If the theory cannot distinguish rest from motion using its own physics, then "absolute velocity" is an empty label rather than a fact.

It can. The answer is a **complete-state diagnostic**: the preferred frame is written into the geometry of the [wakes](architrino.md) that architrinos emit, and it can be read off without any coordinate grid at all.

## Overview

The diagnostic is the **concentricity of transmitter-tagged wake centers**, and the rest of this chapter unpacks that phrase.

A stationary architrino is enough to expose the preferred frame, but it does not define it. The frame is defined by the propagation law: it is the one in which wakes expand at the same speed $c_f$ in every direction.

This chapter sits between [Euclidean Void](euclidean-void.md), which states the substrate, and [Constructing the Absolute Frame](constructing-the-absolute-frame.md), which turns a rest condition into a usable coordinate system. Its claims about what observers can and cannot detect connect directly to [Absolute Time Defense](absolute-time-defense.md) and [Lorentz Kinematics](../spacetime/lorentz-kinematics.md).

One separation governs everything below: **tagged geometry versus summed observation.** Complete-state bookkeeping can ask where each individual wake was emitted and by whom. A physical apparatus receives only a combined total, after propagation, coupling, clocking, and medium dressing have blended everything together. A preferred frame can be real in the first sense while remaining unidentified by a specified observer record in the second. Showing that it is hidden across all admitted measurements requires the quantitative leakage bound developed below.

## The Fundamental Challenge

The void and absolute time are ontological commitments, not coordinate labels. Unlike a laboratory bench with meter sticks and clocks, the void has no origin, no painted grid, no axis arrows, and no universal clock reading zero.

That creates an apparent paradox:

- The theory says architrinos have definite positions $\mathbf X(T)$ and velocities $\mathbf V(T)$ in the void.
- Yet the void is unchanged by translation and rotation — the physics is identical at every location and orientation.
- So how can the theory distinguish $\mathbf V=\mathbf{0}$ from $\mathbf V\neq\mathbf{0}$ without reference coordinates?

This is a practical requirement rather than a philosophical nicety. If the theory cannot extract a rest condition from its own physics even in principle, claims about absolute velocity carry no content and reduce to an imposed convention.

## Detecting Absolute Rest: The Causal Wake Diagnostic

### The mechanism

Everything rests on one postulate: wakes propagate at $c_f$ **relative to the void**, not relative to whatever the source does afterward. Once emitted, a wake has no memory of its transmitter's later motion.

That propagation law dynamically distinguishes the void rest frame, and the emitted-center geometry supplies a way to diagnose the distinction.

The way to see it is to follow the *centers* of emitted wake surfaces. A stationary transmitter emits from the same point over and over. A moving transmitter leaves a trail of distinct emission centers behind it. The center pattern carries the diagnostic, and no external grid is needed to read it.

### The nature of wakes

Each architrino continuously emits expanding surfaces. A single emission at time $T_t$ produces a surface expanding at $c_f$ from the emission point. It is not a shell of stuff and not a particle; it is a potential-bearing distribution living on that surface. At any later time $T$, with $\Delta T=T-T_t$, it has radius $r=c_f\Delta T$ centered where it was emitted.

The crucial point is that the surface records where the architrino **was**. Under the unbounded-history postulate, that support continues expanding from the emission point rather than following the architrino; any finite-memory approximation must declare where it truncates the record.

### The concentricity test

Consider a perspective with access to complete microdynamics — able to track every architrino's full path, the identity and provenance of every emitted surface, the geometric center of each, and the absolute emission times.

**The signature.** An architrino at absolute rest stays at the exact center of every surface it has ever emitted during that interval.

Why: it emits at $T_t$ from $\mathbf X_{\mathrm{em}}$, the surface expands centered on $\mathbf X_{\mathrm{em}}$, and if the architrino has not moved it is still at $\mathbf X_{\mathrm{em}}$ when the surface has grown to radius $c_f\Delta T$. Successive emissions produce perfectly **concentric** surfaces, nested like the layers of an onion around one shared point.

If it moves instead: emission at $T_t$ from $\mathbf X_{\mathrm{em}}$, but by $T_1$ it has displaced to $\mathbf X_{\mathrm{em}}+\mathbf V\Delta T$. The first surface stays centered where it was emitted, later surfaces are centered on later positions along the path, and the centers are **not coincident**. This creates a source-motion asymmetry in the tagged geometry. Recovering an observer-level Doppler law from that asymmetry remains a signal and clock-channel derivation.

That difference is the entire diagnostic. Rest means one repeated center. Uniform motion means a straight line of centers. Accelerated motion means a curved center history.

### The procedure

Track the centers of all surfaces emitted by a target architrino over an interval, then test whether they coincide.

- **All coincident:** $\mathbf V_{\text{abs}}=\mathbf{0}$ on that interval.
- **Centers form a trajectory:** $\mathbf V_{\text{abs}}\neq\mathbf{0}$, and for a uniform segment the displacement per unit time gives the velocity directly, $\mathbf V_{\text{abs}}=\Delta\mathbf X/\Delta T$.

This is definitionally a *complete-state* test. It assumes transmitter identity, emission time, and surface support are already available in the provenance-bearing record. One unrestricted summed value at one event does not uniquely recover the tagged centers; extended arrays, time series, or a restricted source model define different inverse problems and may recover partial information.

That limitation marks the boundary between complete-state reconstruction and what an embedded observer can infer after provenance has been erased into a sum. Whether the assumed tagged record is a coherent part of the complete-state ontology remains a separate consistency question.

### Wake-center theorem

Let a tagged surface emitted by transmitter $a$ at time $T_t$, inspected at $T>T_t$, have center $\mathbf Z_a(T_t)=\mathbf X_a(T_t)$ and support

$$
W_a(T_t;T)
=
\left\{
\mathbf Y\in\Sigma_T:
\|\mathbf Y-\mathbf Z_a(T_t)\|=c_f(T-T_t)
\right\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-70fa004fb29fc77e)

the set of points on the slice at exactly the right distance — an ordinary sphere.

In three-dimensional Euclidean space a nondegenerate sphere has exactly one center. So if the tagged support is known, its emission center is reconstructible geometrically, with no coordinates assigned to the void beforehand. That is what makes the diagnostic coordinate-free rather than merely coordinate-independent.

Equivalently, spheres correspond one-to-one with center-and-radius pairs:

$$
W_a(T_t;T)\longleftrightarrow
\left(\mathbf Z_a(T_t),\,c_f(T-T_t)\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-9b2967e14028431c)

In a finite sampled reconstruction, four support points $\mathbf Y_0,\ldots,\mathbf Y_3$ certify nondegeneracy when their displacement determinant stays away from zero:

$$
\Delta_{\mathrm{sph}}
=
\det
\left[
(\mathbf Y_\alpha-\mathbf Y_0)\cdot(\mathbf Y_\beta-\mathbf Y_0)
\right]_{\alpha,\beta=1}^{3}
>
0
$$

[View →](../../../../equation-mapping.html#corpus-equation-98d283752f1455bc)

This Gram determinant is the **square** of the parallelepiped volume spanned by the three displacements. It vanishes exactly when the four points are coplanar and therefore cannot determine a unique unconstrained sphere in three dimensions. It is the same determinant family as the signed-volume test in [Constructing the Absolute Frame](constructing-the-absolute-frame.md): when the sampled points collapse toward a line, a plane, or a tiny patch, fitting a center stops being stable. Given the radius in advance, three non-collinear points plus a side convention can suffice, but the four-point certificate is safer.

### Finite apertures need their own floor

For a full sphere, uniqueness is exact. A real reconstruction sees only a patch $U_a(T_t;T)\subset W_a(T_t;T)$, and fitting a center from a patch has its own conditioning problem. Define the **solid angle** the patch subtends, which is how much of the sky it covers as seen from the center:

$$
\omega_a(T_t;T)
=
\operatorname{area}_{S^2}
\left\{
\frac{\mathbf Y-\mathbf Z_a(T_t)}{\|\mathbf Y-\mathbf Z_a(T_t)\|}:
\mathbf Y\in U_a(T_t;T)
\right\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-cbf26eb9bce2cdc5)

The reconstruction is admissible only when

$$
\omega_a(T_t;T)\ge \omega_{\min} > 0
$$

[View →](../../../../equation-mapping.html#corpus-equation-0ec92f269c9d25a5)

Below that floor the center may remain formally unique in the full-sphere idealization while the finite problem becomes hopelessly ill-conditioned — a small arc of a large sphere looks almost flat, and almost any distant center fits it.

The solid-angle floor is a practical stand-in for a rank condition. For sampled directions $\hat{\mathbf{n}}_k$ with weights $w_k$, define

$$
G_a=\sum_k w_k\,\hat{\mathbf{n}}_k\hat{\mathbf{n}}_k^{T}
$$

[View →](../../../../equation-mapping.html#corpus-equation-387e8ed2a2a758c3)

which accumulates how much the sampled directions cover each spatial axis. The inverse is accepted only when its smallest eigenvalue satisfies $\lambda_{\min}(G_a)\ge\lambda_{\min}^{\mathrm{ctr}}>0$ — meaning no direction is left unconstrained. A direction cloud confined to a small cap or a nearly planar arc is deficient in exactly the way a near-collinear tuple is deficient in frame construction.

So $\omega_{\min}$ and the basis floor $\sin\theta_{\min}$ both condition geometric inversions. Separatrix regularity and the root transversality floor $\kappa_{\mathrm{hit}}$ guard different objects: a branch boundary and implicit root continuation. The shared discipline is to name the exact map and fail closed when its own nondegeneracy condition is lost.

A finite reconstruction must **fail closed** — returning no verdict at all — when tags are missing, the aperture is too small, or the rank floor fails. These are theorem-level acceptance conditions for any future instrument; the ideal full-sphere result does not certify finite sampled recovery.

### The center curve

For a target architrino $a$ and emission interval $I$, the tagged center set is

$$
Z_a(I)=\{\mathbf Z_a(T_t):T_t\in I\}
$$

[View →](../../../../equation-mapping.html#corpus-equation-322da7f047873084)

with diameter

$$
D_a(I)=\sup_{T_t,T'_t\in I}\|\mathbf Z_a(T_t)-\mathbf Z_a(T'_t)\|
$$

[View →](../../../../equation-mapping.html#corpus-equation-a52adb1cf67c9b5d)

the largest separation between any two centers, written compactly as

$$
D_a(I)=\operatorname{diam}Z_a(I)
$$

[View →](../../../../equation-mapping.html#corpus-equation-b55589f8dd99eea7)

With exact access and transmitter-independent propagation, $D_a(I)=0$ if and only if the center never moved, so the transmitter was at rest. For uniform motion over duration $\Delta T_I$ it equals $\|\mathbf V_a\|\Delta T_I$.

This is **coordinate-free**. It compares no position to any external grid. It checks an intrinsic relational property: whether the tagged centers occupy the same point.

The velocity readout in the uniform case assumes the centers lie on a straight line traversed at constant rate. For accelerated or curved histories, the diameter measures only the chord span and cannot recover the velocity history. The faithful object is the whole curve $T_t\mapsto\mathbf Z_a(T_t)$, including its tangent, curvature, and torsion where they exist — and that curve is precisely the record the self-hit ledger samples later.

The diagnostics form a hierarchy on that one curve. **Rest** is the zeroth-order condition that the curve is a point. **Uniform motion** is the first-order condition that its tangent is constant and its curvature vanishes. **Self-hit eligibility** is global: two points on the history must have average chord speed exactly $c_f$. For an absolutely continuous path, this requires $\|\mathbf V\|\ge c_f$ somewhere on the interval, but curvature, torsion, recurrence, or a super-wake-speed segment is neither necessary nor sufficient by itself. Frenet framing is useful on regular segments; the root equality below is decisive.

If nothing is stationary over the interval, the frame structure can still be recovered from the tagged centers, and an origin chosen conventionally from any reconstructed center. A stationary architrino is a convenience, not the definition.

That fixes the level of the claim precisely. **Ontologically**, the preferred frame is defined by the propagation law. **Inferentially**, the concentricity test reconstructs it from tagged records. **Operationally**, it need not be measurable at all, because observers use clocks, rulers, and signal channels that must themselves satisfy Lorentz-recovery closure.

## Connections to Core Dynamics

### Self-hit and delay-root geometry

The diagnostic connects to the geometry in [Self-Interaction](../dynamics/master-equation.md#self-interaction-self-hit-dynamics) and [Causal Interaction Set](../dynamics/master-equation.md#causal-interaction-set-the-geometry-of-delay), but two claims must stay distinct, and running them together is a natural mistake.

- A resting architrino emits concentric surfaces, but **does not** receive a self-hit merely by being still. A self-hit would require $\|\mathbf X_i(T_r)-\mathbf X_i(T_t)\|=c_f(T_r-T_t)$, and for a stationary worldline the left side is zero while the right side is positive. It never catches its own wake because it is not going anywhere.
- An architrino in ordinary straight sub-wake-speed motion emits non-concentric surfaces, and that too is not enough. Self-hit is a root condition on transmitter identity, not a synonym for nonzero velocity.
- Curvature or a super-wake-speed segment may help a history satisfy the condition, but neither guarantees a root. A root exists only when a later point lies exactly on an earlier emitted surface; for an absolutely continuous history, attaining speed at least $c_f$ somewhere is necessary but not sufficient.
- Exactly, a same-transmitter root exists when the transmitter re-enters its own forward surface:

  $$
  \exists\,T_t < T:
  \|\mathbf Z_a(T)-\mathbf Z_a(T_t)\|=c_f(T-T_t)
  $$

  [View →](../../../../equation-mapping.html#corpus-equation-d13fc0e3f2c35584)

  This is re-entry into the expanding-sphere family generated by the past center curve. It does **not** require the spatial path to cross itself. A closed or recurrent framed assembly may separately carry a protected linking or framed self-linking row such as $Lk=\operatorname{Wr}+\operatorname{Tw}$, but linking is not part of the definition of a self-hit. Rest and self-hit are different conditions: rest is concentricity of centers; self-hit is a same-transmitter causal root.
- For bound assemblies the corresponding problem is conditional. A translating braid must retune its deformation, clock and ruler behavior, two-way synchronization, and preferred-frame leakage while its internal ledgers stay admissible. Failure would show as phase loss, dissociation, or unacceptable leakage — but that disruption is a theorem target, not a consequence of the rest diagnostic.
- **Closure target:** delayed-ledger asymmetry, together with shielding and medium coupling, is a candidate contributor to the inertial response of a bound assembly. The rest diagnostic alone neither derives that response nor fixes its magnitude.

**The upshot.** Absolute velocity is not merely a label, but the rest diagnostic is geometric rather than an immediate claim about self-hits. The dynamical burden belongs to the Lorentz-closure ladder.

### Master equation requirements

The [Master Equation](../dynamics/master-equation.md#the-master-equation-canonical-form) needs explicit positions $\mathbf X_i(T)$ to compute separations and to answer "where was $j$ when the contribution now reaching $i$ was emitted?"

The concentricity diagnostic shows those positions are physically meaningful within complete-state reconstruction. Stationarity is identifiable without circular reference to pre-existing labels, and coordinates enter afterward as a representation of an already-defined condition.

### Foundational validation

This serves as a consistency test for [Euclidean Void](euclidean-void.md) and [Absolute Time Defense](absolute-time-defense.md). Can the theory define its own reference frame from intrinsic physics alone? Yes — through the geometry of wake dynamics.

That prevents the preferred-frame claim from being empty inside the formal ontology. Empirical access is a separate matter, depending on the closures that decide whether observers can detect any leakage.

### Conservation-law counting as a frame diagnostic

The absolute frame leaves a second fingerprint, in the symmetry group.

The [proved invariance group of the Master Equation](../dynamics/master-equation.md#fundamental-symmetry-group) is time translation plus the Euclidean motions of the void: one time translation, three space translations, three rotations. **Seven** continuous generators. In a symmetry-preserving delayed action those organize one energy target, three momentum targets, and three angular-momentum targets as particle-plus-wake functionals. The count is proved; exact conservation of the charges is conditional on deriving them from the same action and closing its residuals.

Compare the alternatives. Newtonian mechanics with Galilean invariance has **three more** — the boost generators, which give the center-of-mass theorem once mass and momentum structure are declared. Relativistic mechanics has **ten**, the generators of the Poincaré group, comprising translations, rotations, and Lorentz boosts.

The substrate count is seven rather than ten because boosts are not substrate symmetries: $c_f$ anchors a preferred frame. **The three missing boost generators are that frame's signature** — visible as absent theorems rather than as a measured velocity.

Generator counting is a formal signature complementary to the concentricity test, not an observer-level detection. The recovery program carries the matching obligation: three effective boost generators must join the seven in the ten-generator structure of [Theorem G](../spacetime/lorentz-kinematics.md#theorem-g-structural-integrity-common-limit-closure), while [Information and the Wake](../philosophy-history/information-and-the-wake.md) surveys the separate accounting burden.

## Ontological Clarifications

### Real versus conventional

**Physically real:** the void and absolute time; absolute velocity, meaningful and reconstructible from tagged concentricity; wakes, as continuous source-dependent causal records; and geometric relationships such as concentricity and displacement, which are observer-independent.

**Conventional scaffolding:** coordinate labels, used for calculation and communication; the choice of origin, taken from a stationary architrino when available and otherwise from any reconstructed center; and axis orientation, since the void is isotropic and privileges no direction.

### Why observers do not detect the frame

The diagnostic needs access to full microdynamics. Observers made of assemblies measure through assembly-based apparatus: proper time $\tau$ from internal clocks rather than $T$, effective coordinates from local rulers, relative velocities from Doppler shifts and aberration.

Those instruments are themselves deformed by motion and by coupling to the medium. At accessible energies the recovery target is that moving assemblies contract, retune their internal periods, and synchronize photon channels so that preferred-frame signatures fall below detection thresholds. The frame exists as the ontological foundation, but the shielding must be **derived** rather than assumed — asserting it would beg the question.

### The source-independence assumption

The diagnostic rests on one physical assumption: once emitted, a wake propagates at $c_f$ relative to the void, independent of what the transmitter does next.

This is like sound in air. Once a speaker emits a wave, that wave travels at the speed of sound in the medium and does not follow the speaker. **The analogy stops there**, in an important place: air is a material medium that can be dragged, heated, and blown about, and the void is none of those things. The wake carries no substance and the void has no state.

The analogy also does not answer **Michelson–Morley**-type null results. Interferometric and modern rotating-resonator experiments compare propagation or resonance along differently oriented paths and report no significant preferred-frame anisotropy. Nagel and collaborators measured a relative orientation-dependent frequency change of $(9.2\pm10.7)\times10^{-19}$ at 95% confidence; see [*Direct terrestrial test of Lorentz symmetry in electrodynamics to $10^{-18}$* (2015)](https://doi.org/10.1038/ncomms9174). That observer-level burden belongs to the moving-assembly closure ladder, not to the complete-state diagnostic.

The diagnostic operates on **tagged** centers: transmitter identity, emission time, and support geometry are part of its data. An interferometer samples a summed observer channel through physical clocks, rulers, mirrors, and photon transport. A null result does not contradict the geometric identity of tagged centers, but it constrains the theory that contains that identity: failure to derive leakage below the measured ceiling would falsify the proposed observer-hiding closure and require a different account.

### Tagged-emission injectivity lemma

Let $\mathcal{H}_{\mathrm{tag}}$ be an admissible tagged history record and $\mathcal{E}_{\mathrm{tag}}(\mathcal{H}_{\mathrm{tag}})$ its family of emitted supports on a declared window. Assume tags are retained, propagation is transmitter-motion independent after emission, the supports satisfy the aperture floor, and the worldlines are absolutely continuous. Then

$$
\mathcal{E}_{\mathrm{tag}}(\mathcal{H}_{\mathrm{tag}})
=
\mathcal{E}_{\mathrm{tag}}(\mathcal{H}'_{\mathrm{tag}})
\quad\Longrightarrow\quad
\mathcal{H}_{\mathrm{tag}}=\mathcal{H}'_{\mathrm{tag}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-34d9786056214f65)

On the declared emission window, the same tagged emitted surfaces imply the same transmitter center curves and hence the same worldlines there. The map is **injective on that scoped record**; it makes no claim about history outside the retained window.

*Proof.* Equality of the nondegenerate tagged supports gives the same unique center for every emission, hence the same center curves. Those curves are the transmitter worldlines; absolute continuity then gives the same velocities almost everywhere, and the retained tags carry identity and polarity. Translation, rotation, and time-origin conventions enter only when the same records are presented in convention-relative charts.

This is **not** an observer-accessible decomposition theorem. The proof depends on tags surviving in complete-state bookkeeping. If that fails the map is unavailable. Large fibers of a label-erasing observer map establish non-identifiability from that record alone; operational hiding across all admitted measurements requires the separate quantitative leakage bound below.

## Philosophical Context

### Relationalism versus substantivalism

**Relationalism**, associated with Leibniz and Mach, holds that spatial facts are only relations between objects, and that an independent container is meaningless. **Substantivalism**, associated with Newton and adopted here, holds that the void is a real container with intrinsic structure, existing independently of what occupies it.

The substantival claim here is the reality of the void and absolute time, not the existence of a preferred coordinate chart. The framework is substantivalist while rejecting the idea that space arrives pre-painted with coordinates. The wake dynamics reveal the structure that matters.

### Neo-Lorentzian character

This places the theory in a **neo-Lorentzian** comparison class: absolute space and time are retained, while moving objects and clocks are required to reproduce the Lorentzian observations that special relativity encodes geometrically. Agreement is a target over the tested kinematic regime, not a general result already established for $\mathbb{A}\mathbb{A}\mathbb{A}$.

Shared with that tradition: absolute space and time are fundamental; operational Lorentz symmetry is a recovery target rather than a primitive symmetry; a preferred frame exists but must be operationally hidden.

Differing from it: the Noether sea is an assembly network rather than a continuous classical ether or a coordinate grid; the frame is hidden by emergent effective geometry rather than by stipulation; and the framework states explicit closure targets and failure criteria for where symmetry-breaking signatures would appear.

## Summary: The Detection Method

**Question.** Can complete-state bookkeeping determine when an architrino has zero absolute velocity, without pre-existing coordinates?

**Answer.** Yes, by testing the concentricity of tagged outgoing wake surfaces.

**Signatures.** Rest means all tagged centers coincide. Motion means the centers form a trajectory; for uniform segments, $\mathbf V_{\text{abs}}=\Delta\mathbf X/\Delta T$.

**Why it works.** Wake speed is isotropic in the void's rest frame; emission centers mark absolute positions; concentricity is a coordinate-free invariant.

**Implications.** The void and absolute time have diagnostic content. The theory identifies a complete-state rest condition from its own propagation law. Operational Lorentz invariance is compatible with that structure only if the clock, ruler, photon, and matter closures satisfy the measured leakage bounds.

[Constructing the Absolute Frame](constructing-the-absolute-frame.md) uses this as the starting point for a complete coordinate frame.

### Tagged recovery and observer-hiding theorem target

The risk-bearing claim is two-sided, and both sides can fail.

It fails at the complete-state level if tagged centers cannot define one consistent rest-frame structure. It fails at the observer level if clocks, rulers, or photon channels retain preferred-frame leakage above the declared cavity, two-way anisotropy, or parameterized post-Newtonian ceilings after closure is applied. The framework is committed to a real complete-state frame **and** to a quantitatively hidden observer-sector leakage.

In map language, the target pairs the injectivity lemma above with approximate observer invariance. The label-erasing map must make the preferred-frame spread small across the tested velocity family:

$$
\operatorname{diam}_{\mathrm{obs}}
\left\{
\mathcal{O}\!\left[Q_{\mathrm{erase}}(\mathcal{H}_{\mathrm{tag}}^{(\mathbf w)})\right]:
\|\mathbf w\|\le w_{\max}
\right\}
\le
\epsilon_{\mathrm{PF}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-50fa63b4aacb7a83)

Here $\mathcal{H}_{\mathrm{tag}}^{(\mathbf w)}$ is the tagged record from re-preparing the same experiment at absolute velocity $\mathbf w$, and $\mathcal{O}$ the admitted observer functionals. Read it as: repeat the experiment at every velocity in the tested range, look at what an observer could measure each time, and require the spread across all of them to stay under $\epsilon_{\mathrm{PF}}$.

The injectivity lemma makes the frame real in complete-state geometry. This bound is the recovery burden that makes it hidden from observers. Both are required, and each without the other would leave the theory either empty or falsified.
