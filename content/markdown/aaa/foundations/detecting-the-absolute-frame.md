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

For uniform motion with velocity $\mathbf V$, emission occurs at $T_t$ from $\mathbf X_{\mathrm{em}}$, but by $T_1$ the transmitter has displaced to $\mathbf X_{\mathrm{em}}+\mathbf V\Delta T$, where $\Delta T=T_1-T_t$. The first surface stays centered where it was emitted, later surfaces are centered on later positions along the path, and the centers are **not coincident** when $\mathbf V\ne\mathbf0$. This creates a source-motion asymmetry in the tagged geometry. Recovering an observer-level Doppler law from that asymmetry remains a signal and clock-channel derivation.

Rest means one repeated center. Uniform motion means a center curve affine in absolute emission time: its velocity is constant. Acceleration changes that velocity and may change speed, direction, or both. A straight spatial line of centers can therefore describe variable-speed accelerated motion; the emission-time labels distinguish it from uniform motion.

### The procedure

Track the centers of all surfaces emitted by a target architrino over an interval, then test whether they coincide.

- **All coincident:** the transmitter remains at rest throughout the interval; for an absolutely continuous history, $\mathbf V_{\text{abs}}=\mathbf{0}$ almost everywhere.
- **Centers are not all coincident:** the transmitter is not at rest throughout the interval, although its velocity may vanish at individual times or on subintervals. For a uniform segment the displacement per unit time gives the velocity directly, $\mathbf V_{\text{abs}}=\Delta\mathbf X/\Delta T$.

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

For exact finite samples, four support points $\mathbf Y_0,\ldots,\mathbf Y_3$ determine a unique sphere when they are affinely independent:

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

This Gram determinant is the **square** of the parallelepiped volume spanned by the three displacements. It vanishes exactly when the four points are coplanar and cannot determine a unique unconstrained sphere in three dimensions. To derive the uniqueness claim, subtract the squared-distance equation for $\mathbf Y_0$ from the other three. With $\mathbf d_\alpha=\mathbf Y_\alpha-\mathbf Y_0$ and unknown center $\mathbf z$, this gives

$$
2\mathbf d_\alpha\cdot\mathbf z
=\|\mathbf Y_\alpha\|^2-\|\mathbf Y_0\|^2,
\qquad \alpha=1,2,3.
$$

[View →](../../../../equation-mapping.html#corpus-equation-99b1ff8486e53d57)

Affine independence makes this linear system invertible; its center fixes the radius as $\|\mathbf Y_0-\mathbf z\|$. The determinant belongs to the same family as the signed-volume test in [Constructing the Absolute Frame](constructing-the-absolute-frame.md). Positivity proves exact uniqueness, but a determinant with dimensions of length to the sixth power does not by itself bound sensitivity to measurement error. That requires a scale, an error model, and a quantitative bound on the smallest singular value of the reconstruction matrix. If the radius is known in advance, three non-collinear points can leave two centers on opposite sides of their plane; a justified side selection can remove that ambiguity.

### Finite apertures need their own floor

Exact uniqueness and sensitivity to measurement error are separate questions. If an instrument observes a continuous footprint $U_a(T_t;T)\subset W_a(T_t;T)$, define the **solid angle** that footprint subtends, which is how much of the sky it covers as seen from the center:

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

An instrument may impose a footprint threshold

$$
\omega_a(T_t;T)\ge \omega_{\min} > 0
$$

[View →](../../../../equation-mapping.html#corpus-equation-0ec92f269c9d25a5)

as part of a sufficient recovery criterion justified for its sampling and measurement-error model. This is not a necessary condition for every exact reconstruction. A finite set of sample directions has spherical area zero, even when four sampled points determine a unique sphere. A continuous footprint and its discrete samples must therefore be distinguished. Nor does footprint area alone specify how observations are distributed or weighted within it. A small cap can leave a center fit poorly conditioned, especially when its radius is also fitted.

For a local sensitivity calculation, use radial residuals $r_k(\mathbf z,R)=\|\mathbf Y_k-\mathbf z\|-R$ with fixed positive weights $w_k$ normalized by $\sum_k w_k=1$. The weights define the relative contribution of each observation to the squared residual; an uncertainty interpretation also requires a declared measurement-error model. At an exact fit of positive radius, set $\hat{\mathbf n}_k=(\mathbf Y_k-\mathbf z)/R$. Holding the samples fixed, the first-order residual change is

$$
\delta r_k=-\hat{\mathbf n}_k\cdot\delta\mathbf z-\delta R.
$$

[View →](../../../../equation-mapping.html#corpus-equation-3ccaca4fe20dbe83)

If $R=c_f(T-T_t)$ is known exactly from the tagged times, then $\delta R=0$. The weighted squared residual change is $\delta\mathbf z^T G_a\delta\mathbf z$, where

$$
G_a=\sum_k w_k\,\hat{\mathbf{n}}_k\hat{\mathbf{n}}_k^{T}
$$

[View →](../../../../equation-mapping.html#corpus-equation-387e8ed2a2a758c3)

Thus a bound $\lambda_{\min}(G_a)\ge\lambda_{\min}^{\mathrm{ctr}}>0$ controls first-order center sensitivity near a selected solution for the fixed-radius fit. Its numerical threshold must be tied to the required accuracy and error model. It does not prove global uniqueness or select between separated candidate centers.

When radius is fitted as well, the residual Jacobian has rows $[-\hat{\mathbf n}_k^T,-1]$. Minimizing the weighted squared residual change over $\delta R$ gives $\delta R=-\bar{\mathbf n}\cdot\delta\mathbf z$, leaving the center matrix

$$
C_a=G_a-\bar{\mathbf n}\bar{\mathbf n}^{T},
\qquad
\bar{\mathbf n}=\sum_k w_k\hat{\mathbf n}_k.
$$

[View →](../../../../equation-mapping.html#corpus-equation-08fc6a7d8d3b7269)

Indeed, substitution leaves $\sum_k w_k[(\hat{\mathbf n}_k-\bar{\mathbf n})\cdot\delta\mathbf z]^2=\delta\mathbf z^T C_a\delta\mathbf z$. The augmented Jacobian, or this centered matrix after eliminating radius, detects a tradeoff between center displacement and radius that $G_a$ alone misses. If radius is constrained but uncertain, including uncertainty in the tagged times, that uncertainty must enter the joint fit or be propagated into the center error bound. The fixed-radius matrix alone cannot justify treating it as zero.

For example, in units with $c_f=1$, let $R=1$, $a=\sqrt{2/3}$, and $b=1/\sqrt3$. The four coplanar points $(\pm a,0,0)$ and $(0,\pm a,0)$ lie at unit distance from both $(0,0,b)$ and $(0,0,-b)$. Equal weights give $G_a=I_3/3$ at either center, so both fits have full local fixed-radius rank. Yet they are globally ambiguous. With free radius, the center can move continuously along their common axis while the radius changes; $C_a=\operatorname{diag}(1/3,1/3,0)$ detects that freedom. The four-point determinant correctly vanishes here. It and $G_a$ test different properties.

A finite reconstruction therefore needs both an exact uniqueness argument or justified side selection and an error bound for its actual unknowns and measurements. It must **fail closed**, returning no definite center, when required tags are absent, candidate ambiguity remains unresolved, or the declared error bound cannot be met. Footprint thresholds can contribute to an instrument's sufficient criteria; they do not replace these mathematical obligations. The basis floor $\sin\theta_{\min}$ in frame construction, separatrix regularity, and the root transversality floor $\kappa_{\mathrm{hit}}$ concern other maps. Each condition must be justified for the inversion or continuation it actually controls.

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

The diagnostic operates on **tagged** centers: transmitter identity, emission time, and support geometry are part of its data. An interferometer samples a summed observer channel through physical clocks, rulers, mirrors, and photon transport. A null result does not contradict the geometric identity of tagged centers, but it constrains the theory that contains that identity. An unproved leakage bound leaves observer-hiding recovery open. A demonstrated prediction above the empirical ceiling, using the same calibrated observable and controlled experimental conditions, would falsify that recovery claim in the tested regime.

### Tagged-emission injectivity lemma

Let $\mathcal{H}_{\mathrm{tag}}$ be an admissible tagged history record and $\mathcal{E}_{\mathrm{tag}}(\mathcal{H}_{\mathrm{tag}})$ its family of emitted supports on a declared window. Assume tags are retained, propagation is transmitter-motion independent after emission, each emission's exact support data determine a unique center, and the worldlines are absolutely continuous. Full nondegenerate spheres satisfy the center assumption; partial support data require their own uniqueness argument as above. Then

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

Differing from it: the Noether sea is an assembly network rather than a continuous classical ether or a coordinate grid; hiding the frame through emergent effective geometry is a derivation target; and the framework states explicit closure targets and failure criteria for where symmetry-breaking signatures would appear.

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

In map language, the target pairs the injectivity lemma above with approximate observer invariance. First fix a controlled comparison as required by the [Observer Framework](../spacetime/observer-framework.md): apparatus, readout channels, modulation and timing protocol, calibration, nuisance model, and admitted medium and boundary-wake conditions. A matched preparation rule must specify how these correspond as absolute velocity $\mathbf w$ varies, including the clock, ruler, and signal responses whose recovery is being tested. Holding the operational protocol fixed does not assume that the underlying moving assemblies are undeformed. Their response must follow from the same dynamics and medium account, as required by [Theorem G](../spacetime/lorentz-kinematics.md#theorem-g-structural-integrity-common-limit-closure), rather than being fitted separately at each velocity.

For a deterministic matched-history comparison, let $\mathcal H_{\mathrm{tag}}^{(\mathbf w)}$ denote the resulting family of complete tagged histories. Define $Q_{\mathrm{erase}}$ as the specified loss of provenance inaccessible to the apparatus, and $\mathcal O$ as one fixed calibrated readout map, possibly collecting several channels into a vector. Its outputs lie in a declared metric space $(\mathcal Y_{\mathrm{obs}},d_{\mathrm{obs}})$. For a set $S$ of such outputs, $\operatorname{diam}_{\mathrm{obs}}S=\sup_{y,y'\in S}d_{\mathrm{obs}}(y,y')$. Fix the metric and tolerance $\epsilon_{\mathrm{PF}}$ from the observable's calibration and the empirical ceiling being compared, before evaluating the histories. A change of readout units must transform them consistently; it cannot change whether the same physical bound is met.

For each admitted matched preparation and environment family defined over the stated velocity range, the recovery target is

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

The diameter compares velocities within one matched family, not unrelated preparations or arbitrary changes of environment. A claim covering several preparations, nuisance values, or medium states must specify that admissible family and establish the bound for each member. No universal numerical tolerance is supplied here: the appropriate residual, calibration uncertainties, and ceiling depend on the declared observer channel.

A statistical experiment requires a different output type. Unresolved preparation histories define an ensemble under a declared preparation rule; this introduces no primitive randomness into the substrate law. One then compares the resulting record distributions, or specified estimator distributions, using a fixed statistical distance and an uncertainty or confidence procedure appropriate to that experiment. Arbitrarily chosen single outcomes at different velocities do not test equality of those distributions. The deterministic inequality above does not establish the statistical bound without this additional ensemble and measurement analysis.

The injectivity lemma establishes tagged center recovery within complete-state geometry under its assumptions. The calibrated observer bound remains an unproved recovery target. Establishing it for a declared family would support hiding only for those observables and conditions; a demonstrated above-bound residual, with uncertainty controlled under the same comparison, would refute that particular recovery claim. Lack of a proof leaves the obligation open and is not itself a demonstrated violation.
