# Kinetic and Potential Energy

In this model, all energy is fundamentally tied to architrinos and the causal wakes they generate. Architrinos are the sole primitive carriers of kinetic energy through their motion and the sole primitive sources of potential energy through their interactions. There is no standalone wake substance or vacuum energy independent of architrinos and their assemblies. A **wake** is the causal-isochron imprint of an architrino's emissions; motion affects the geometry, not the existence, of the wake. `Wake` is the architrino-native description of what appears as a field at the effective level.

This chapter underwrites [Particle Masses](../assemblies/particle-masses.md), [Tri-Binary Dynamics](tri-binary-dynamics.md), [Noether Core](../assemblies/noether-core.md), [Spacetime Assemblies](../spacetime/spacetime-assemblies.md), and [Emergent Metric](../spacetime/emergent-metric.md).

All such dynamics unfold on a fixed ontological background: absolute time plus the Euclidean void. Forces and motion arise from **delayed causal hits from causal isochrons**, with line-of-action direction and Jacobian-weighted magnitude, on this fixed background. We work in units with wake speed $c_f=1$.

Crucially, `spacetime` in this framework belongs to the effective level, not the ontological one. The underlying substrate is a **dense sea of scalable high-energy tri-binary assemblies** occupying the Euclidean void. These tri-binaries are extremely small compared to ordinary Standard Model particles and constitute the Noether Sea through which all other assemblies move and interact. The energetic state and configuration of this tri-binary sea control how energy, inertia, and effective geometry appear at larger scales.

---

## Kinetic Energy and Momentum of a Single Architrino

An architrino in motion possesses kinetic energy and momentum.

- **Kinetic Energy $E_k$**
  
  A scalar quantity representing the energy of motion. For a single architrino $a$ with velocity $\mathbf{v}_a(t)$, we write
  
  $$E_{k,a}(t) = K\big(|\mathbf{v}_a(t)|\big),$$
  
  where $K$ is a strictly convex, monotonically increasing function with $K(0)=0$ and $K'(v)\to\infty$ as effective saturation is reached (if applicable), or growing unboundedly in the primitive limit. $K$ is left unspecified because mass is emergent from interactions between assemblies, especially the Noether-Sea tri-binaries. Strict convexity ensures a one-to-one mapping between kinetic energy and speed magnitude. Because a free Architrino has no intrinsic speed limit in the micro-model, $E_k$ is, in principle, unbounded as $|\mathbf{v}_a|\to\infty$.

- **Momentum $\mathbf{p}_a$**
  
  The vector counterpart of kinetic energy:
  
  $$\mathbf{p}_a(t) = P\big(|\mathbf{v}_a(t)|\big)\,\hat{\mathbf{v}}_a(t), \quad \hat{\mathbf{v}}_a = \frac{\mathbf{v}_a}{|\mathbf{v}_a|},$$
  
  where $P$ is a speed-dependent magnitude. Its detailed form is not postulated at the architrino level; it emerges from matching to assembly behavior.

**No fundamental mass:**

In this model, there is no **particle-specific substrate mass** assigned to individual architrinos. We do **not** assume $E_k = \frac{1}{2}m v^2$ or $\mathbf{p} = m \mathbf{v}$ at the substrate level for distinct architrino species. Instead:

- Kinetic energy and momentum are **primitive kinematic quantities** of architrinos.
- The substrate law is written in **acceleration-first** form.
- If force-like or quadratic-kinetic bookkeeping is needed, one may introduce a single universal conversion constant $\mu_{\text{arch}}$, but this is not a particle-specific inertial mass.
- "Mass" in the usual observer sense appears **only at the assembly level** as a derived property of how a large internal energy distribution responds to external forcing in the tri-binary sea.

---

## Work–Energy Relation and Per-Hit Power

Regardless of the explicit form of $K(v)$, kinetic-energy accounting is controlled by the acceleration-first master law. If one introduces the optional universal bookkeeping constant $\mu_{\text{arch}}$ and defines $\mathbf{F}_a \equiv \mu_{\text{arch}}\mathbf{a}_a$, then the quadratic bookkeeping proxy satisfies the familiar **work–energy theorem**:

$$\frac{dE_{k,a}}{dt} = \mathbf{F}_a(t)\cdot\mathbf{v}_a(t),$$

where $\mathbf{F}_a$ is the optional force-like bookkeeping quantity associated with the net acceleration from all causal hits.

From the canonical per-hit law

$$
\mathbf{a}_{o'\leftarrow o}(t; t_0)
=
\kappa\,\sigma_{q_o q_{o'}}\,
\frac{|q_o q_{o'}|}{r^2\,|J_{o'\leftarrow o}(t;t_0)|}\,\hat{\mathbf{r}},
$$

where
$$
J_{o'\leftarrow o}(t;t_0)
\equiv
1-\frac{\mathbf{v}_o(t_0)\cdot\hat{\mathbf{r}}}{c_f}
$$
is the causal Jacobian encoding geometric bunching or dilation of the received wake flux.

decompose the receiver's velocity into radial and transverse components:

$$\mathbf{v}_{o'} = v_r \hat{\mathbf{r}} + \mathbf{v}_\perp, \quad v_r=\mathbf{v}_{o'}\cdot\hat{\mathbf{r}}.$$

Because $\mathbf{a}_{o'\leftarrow o}\parallel\hat{\mathbf{r}}$:

- The **instantaneous work rate** from this hit is
  
  $$
  \frac{dE_k}{dt}\bigg|_{\text{hit}}
  =
  \mathbf{a}_{o'\leftarrow o}\cdot\mathbf{v}_{o'}
  =
  \frac{\kappa\,\sigma_{q_o q_{o'}}\,|q_o q_{o'}|}{r^2\,|J_{o'\leftarrow o}(t;t_0)|}\,v_r.
  $$
  
  Only $v_r$ contributes to instantaneous power.

- A hit only changes the **along-the-line** component of velocity; sideways motion $\mathbf{v}_\perp$ is unchanged instantaneously.

---

## Potential Energy and Net Potential

Potential energy arises from the interaction of an architrino with the **net potential wake landscape** generated by all architrinos (including, in some regimes, its own past emissions).

### Net Potential Field

At a point $\mathbf{s}$ and time $t$, the net potential is the **superposition** of contributions from all sources:

$$\Phi_{\text{net}}(\mathbf{s},t) = \sum_o \Phi_o(\mathbf{s},t).$$

Each $\Phi_o$ is built from the expanding causal isochrons emitted by source $o$, using the measure-valued or mollified emission density described in the architrino section. In the mollified representation with causal-surface width $\eta>0$, $\Phi_{\text{net}}$ is a smooth function of $(\mathbf{s},t)$; in the ideal limit $\eta\to 0$ it becomes measure-valued ("paint on isochrons").

### Potential Availability Is Geometric

The phrase "an architrino emits potential" should not be read as a source continually spending an internal fuel. The emission is the causal-wake geometry of the architrino itself: at each emission time, an expanding causal isochron is added to the source's path history. That causal structure can later participate in work, but it is not a material energy substance stored inside the Euclidean void.

Potential energy is therefore relational. It is assigned when a receiver is placed in a source's path-history wake landscape and its trajectory intersects the relevant causal wake surfaces. The receiver's energy accounting depends on the active causal roots, their inverse-square distance factors, their polarity signs, the branch Jacobians, and the receiver's radial motion through the line of action. In the general per-hit law the source-side branch factor is

$$
J_{o'\leftarrow o}(t;t_0)
=
1-\frac{\mathbf{v}_o(t_0)\cdot\hat{\mathbf{r}}}{c_f},
$$

while the instantaneous power delivered to the receiver is controlled by

$$
\mathbf{a}_{o'\leftarrow o}\cdot\mathbf{v}_{o'}
=
\lVert\mathbf{a}_{o'\leftarrow o}\rVert\,v_r.
$$

On the affine partner chart used in the [closed-form collinear breather ansatz](../proof-programs/closed-form-collinear-breather-ansatz.md), the same causal bunching appears in the simple branch factor $J_p=1+\dot{x}/c_f$. That formula is not a new global definition of energy; it is the one-dimensional branch expression for how emission cadence is received on that chart.

Thus the potential to do work is broadly available wherever causal wakes pass, but work is realized only through an actual receiver trajectory. A quiet region is not a region with no causal activity; it is a region where the active wake contributions sum to negligible net acceleration and negligible net power for the assemblies present there.

### Potential Energy

For a particle $o'$ with charge $q_{o'}$ at position $\mathbf{s}_{o'}(t)$, the potential energy $U_{o'}(t)$ is defined as the work required to assemble the current configuration against the causal path-history wake landscape:

$$U_{o'}(t) = q_{o'}\,\Phi_{\text{net}}[\text{history}]\big(\mathbf{s}_{o'}(t),t\big).$$

Unlike electrostatics, $\Phi_{\text{net}}$ is not a function of instantaneous source positions but a functional of their past worldlines intercepted by the backward causal cone of $\mathbf{s}_{o'}(t)$. The gradient $\nabla\Phi_{\text{net}}$ is taken with respect to the receiver's spatial coordinates on the fixed background, holding the causal history fixed. In the idealized picture, $\Phi$ is a distribution supported on causal isochrons, not a smooth continuum field.

When we work with the mollified effective potential $\Phi_\eta$, we can also write:

$$\mathbf{F}_{o'}(t) = -\nabla_{\mathbf{s}_{o'}}U_{o'}(t) = -q_{o'} \nabla_{\mathbf{s}_{o'}} \Phi_{\text{net}}[\text{history}]\big(\mathbf{s}_{o'}(t),t\big),$$

and this is equivalent to the Master Equation in the quasi-static, resolved-in-time limit.
The force-as-gradient identity is valid only when taking the gradient at fixed causal history; the fundamental force law remains the per-hit sum of the Master EOM.

### Macroscopic Cancellation and Localized Resonance

Constant causal emission by many architrinos does not imply a large random macroscopic force. The net potential wake landscape is a superposition, and in a large, incoherent population the leading gradients arrive with many signs, distances, phases, and line-of-action directions. For a receiver sampling such a population, positive and negative gradient influences cancel statistically:

$$
\left\langle \nabla \Phi_{\text{net}}\right\rangle_{\text{incoherent}}
\approx
\mathbf{0}.
$$

This cancellation is one reason the Noether Sea can be densely active while remaining macroscopically quiet. What standard prose may call a vacuum state is not empty Euclidean void; it is the effective limit in which the local Noether-Sea assemblies and their causal wakes balance so well that only small residual gradients remain available to ordinary probes.

Phase-locked bound states are the important exception. In a localized assembly, nearby constituents do not sample random phases; their active causal roots are correlated, and the $1/r^2$ distance factor lets the nearest coherent branches dominate over the far incoherent background. A [collinear breather](../proof-programs/collinear-breather.md), for example, is precisely a reduced setting in which two opposite-polarity architrinos can form a localized, non-canceling causal resonance. The breather ansatz isolates this effect: instead of averaging away, the partner-hit and self-hit branches stay phase organized enough to exchange kinetic and potential energy across a bounded cycle.

---

## Energy Conservation and Exchange

In the exact causal theory, energy conservation is enforced through exchange between kinetic motion and the causal-history interaction content encoded by wakes. This wake term should not be read as an independent material reservoir that drains from the emitter with every unreceived isochron; it is the nonlocal bookkeeping required by the same delayed causal action that generates the hits. For mollified working models, the strongest exact conservation claims remain conditional on the regularization being derived from the same time-translation-invariant causal action rather than inserted only at the equation-of-motion level.

For a single architrino:

$$\Delta E_k = \int \mathbf{F}\cdot d\mathbf{s} = -\Delta U$$

(when we restrict attention to its interactions with a fixed set of sources). For an **isolated system** of architrinos and their wakes, the total energy is:

$$E_{\text{total}} = \sum_a E_{k,a} + U_{\text{int}} + E_{\text{wake}},$$

and is constant in time for exact isolated solutions of the causal action. In mollified working models, this same bookkeeping should be treated as exact only when the mollified kernel inherits that action-level time-translation symmetry; otherwise it remains the natural candidate history functional to monitor, but not yet an established exact invariant.

- $U_{\text{int}}$ is an optional effective decomposition of near-field interaction energy.
- $E_{\text{wake}}$ accounts for the exact nonlocal interaction content carried by wake structures and any radiation-like transport through the tri-binary sea.

Consistency rule: either use $E_{\text{wake}}$ alone for all interaction energy, or, if a $U_{\text{int}}$ pairwise term is retained as an effective decomposition inside assemblies, then $E_{\text{wake}}$ must explicitly omit the corresponding near-field content to prevent double counting.

In practice, for finite systems or simulation domains, we verify conservation by monitoring $E_{\text{total}}(t)$ and checking convergence as $\eta$ and $\Delta t$ are reduced.

---

## Noether Sea, Effective Spacetime, and Energy Storage

At the fundamental level, the Euclidean void is an empty container. **Effective spacetime** is the observer-level summary of a **sea of high-energy tri-binary assemblies**:

- These tri-binaries are extremely small compared to ordinary particles (electrons, protons, etc.).
- Each tri-binary is itself a tightly bound architrino assembly with very high internal kinetic and potential energy.
- As a sea, they form a **dense manifold of coupled assemblies** that fills the Euclidean void. This ambient Noether-Sea content carries non-zero assembly density and internal stress. It provides the constitutive relations (permittivity, permeability, and medium-dressed inertial response) that deform the primitive architrino dynamics into effective relativistic kinematics, providing the bridge-level spacetime medium for:
  - Emergent inertia and mass,
  - Emergent light cones and Lorentz-like behavior,
  - Effective gravitational coupling (emergent geometry at large scales).

Energy in this picture is distributed across:

1. **Unbound Architrinos** (rare at low energies),
2. **Standard Model assemblies** (electrons, nucleons, etc.),
3. The **tri-binary sea** that constitutes the Noether Sea and, in bridge prose, the spacetime medium.

---

## Assemblies: Internal vs Apparent Energy

For composite systems—Standard Model particles, nuclei, composite bound states—formed from architrinos and embedded in the tri-binary sea, we distinguish:

- **Total internal energy**: what's stored inside the assembly and in its immediate tri-binary environment,
- **Apparent energy**: what leaks out as a long-range wake signature and governs how the assembly interacts with the outside world.

### Internal Energy of an Assembly

For an assembly $A$ (e.g., tri-binary or higher structure), let $i\in A$ run over its constituent architrinos. Then:

$$E_{\text{internal}}(A) = \sum_{i\in A} E_{k,i} + \frac{1}{2} \sum_{\substack{i,j\in A \\ i\neq j}} U_{ij} + E_{\text{coupling to sea}}(A),$$

where:

- $E_{k,i}$ is the kinetic energy of architrino $i$,
- $U_{ij}$ is mutual potential energy of pair $(i,j)$,
- $E_{\text{coupling to sea}}$ accounts for how the assembly deforms and polarizes the surrounding tri-binary sea, that is, the local Noether-Sea environment (or in bridge prose, the local spacetime medium).

This internal energy can be **very large**: tri-binaries and more complex assemblies may store Planck-scale or higher internal energy, even when the assembly appears as a low-mass particle externally.

### Apparent Energy and Shielding

The surrounding tri-binary sea, and the arrangement of pro/anti architrinos inside an assembly, can **shield** internal energy from the external world through:

- **Charge cancellation**: positive and negative architrinos within the assembly (and in surrounding tri-binaries) emit wakes that interfere destructively at larger distances.
- **Sphere-stream structuring**: the geometry of internal orbits and tri-binary polarization patterns generates cancellation of most multipoles at scales $r \gg$ assembly size (multipole cancellation in the far field).
- **Nested shielding**: in multi-binary fermion cores, outer binaries partially screen the deeper binaries from the surrounding sea. Generation shifts can therefore be read as loss of shielding tiers, not only as loss of constituent count.

Define a **shielding (leakage) factor** $\zeta(A)\in[0,1]$ for an assembly $A$ as:

$$\zeta(A) \equiv \frac{\text{measured external field amplitude (or effective coupling)}}{\text{naive sum of constituent contributions}},$$

evaluated in a regime where the assembly appears as an effective point source. For a strongly shielded, neutral tri-binary in the tri-binary sea, we expect $\zeta\ll 1$.
Operationally, extract $\zeta(A)$ from a far-field fit of $\Phi_{\text{net}}$ (or hit amplitude) at $r \gg \text{size}(A)$: $\zeta \equiv A_{\text{measured}}/A_{\text{naive}}$, the ratio of the leading $1/r^2$ (or multipole) coefficient to the naive constituent sum.

The **apparent energy** that influences other assemblies at large distances is then roughly:

$$E_{\text{apparent}}(A) \sim \zeta(A)\,E_{\text{internal}}(A),$$

up to proportionality constants fixed by matching to effective low-energy theory (e.g. mapping to $mc^2$).

---

## Emergent Inertia (Mass) from Shielded Energy

**Inertia** is not fundamental; it is the externally exposed response of an assembly's trapped internal causal history, shielding factor, and Noether-Sea coupling to changes in bulk motion.

### Operational Definition of Inertial Mass

For an assembly $A$, define its inertial mass $m_{\text{inertial}}(A)$ operationally via:

- Apply a small external potential field (from a distant test source) that exerts a known net force $\mathbf{F}_{\text{ext}}$ on $A$,
- Measure the resulting acceleration of its center of mass $\mathbf{a}_{\text{cm}}$ in the tri-binary sea,
- Define:

$$m_{\text{inertial}}(A) \equiv \frac{|\mathbf{F}_{\text{ext}}|}{|\mathbf{a}_{\text{cm}}|}.$$

Because the external field couples mainly to the **apparent energy**, not the full internal storm, we expect:

$$m_{\text{inertial}}(A) \approx \alpha\,\frac{\zeta(A)\,E_{\text{internal}}(A)}{c_{\text{eff}}^2}.$$

Here $E_{\text{internal}}$ names the large internal energy circulation, while $\zeta(A)$ names the small external leakage that survives cancellation and Noether-Sea shielding. The formula therefore explains weak long-range gravitational and inertial footprints without making the internal energy small: ordinary probes couple to the leaked pattern, not to every internal exchange branch.

This is the same shielding-based logic developed more directly in [Particle Masses](../assemblies/particle-masses.md), with $\alpha$ fixed to $1$ by a reference assembly (e.g., electron) in the regime where effective Lorentz kinematics hold.

---

### Noether Sea and Effective Relativistic Behavior

The tri-binary Noether Sea adds an additional layer:

- Moving assemblies must retune their internal causal ledger and reorganize local Noether-Sea coupling.
- The effective resistance to high center-of-mass speed (near the internal tri-binary field speed) increases steeply, producing an emergent "speed of light" scale $c_{\text{eff}}$ at which assemblies effectively saturate.

Thus:

- At low speeds $v\ll c_{\text{eff}}$, we recover $E_k \approx \frac{1}{2}m_{\text{inertial}} v^2$ for assemblies.
- At high speeds approaching $c_{\text{eff}}$, internal coupling to the tri-binary sea and self-hit effects yield a relativistic-like $E_k \sim m_{\text{inertial}}(\gamma-1)$, with $\gamma = 1/\sqrt{1-v^2/c_{\text{eff}}^2}$, as an **effective law**.
- Near $c_{\text{eff}}$, axial architrinos would likely be stripped off, and the assembly may undergo other changes as it oblates.

The details of this emergent relativistic law arise from the combined dynamics of the assembly and the tri-binary sea; they are not postulated but must be confirmed by coefficient extraction, simulation, and matching to known particle kinematics. Ordinary dissipative drag is a failure channel for this program, not the mass mechanism. The mass-side integration and quantitative derivation path are tracked in [Particle Masses](../assemblies/particle-masses.md).

---

## Effective Energy-Momentum Closure

For assembly center-of-mass motion in the Lorentz-suppressed regime, impose the relativistic mass-shell relation as an **effective closure test** (not a substrate postulate):

$$
E_{\text{CM}}^2 = p_{\text{CM}}^2 c_{\text{eff}}^2 + M_0^2 c_{\text{eff}}^4.
$$

Here:
- $M_0$ is the assembly rest/internal invariant extracted at $v_{\text{CM}}=0$ in a locally homogeneous sea.
- $E_{\text{CM}}$ and $p_{\text{CM}}$ are the total center-of-mass energy and momentum measured from trajectory dynamics.
- $c_{\text{eff}}$ is the emergent signal speed of the local medium; in weak-field isotropic conditions, $c_{\text{eff}}\to c_f$.

Equivalent parameterization:
$$
E_{\text{CM}}=\gamma_{\text{eff}} M_0 c_{\text{eff}}^2,\qquad
p_{\text{CM}}=\gamma_{\text{eff}} M_0 v_{\text{CM}},\qquad
\gamma_{\text{eff}}=\frac{1}{\sqrt{1-v_{\text{CM}}^2/c_{\text{eff}}^2}}.
$$

Consistency requirement: if this closure fails in regimes where emergent Lorentz behavior is claimed, the current mass-loading and medium-response model is incomplete.

Cross-links:
- [Proper-time closure test](../spacetime/proper-time-and-time-dilation.md#effective-energy-momentum-closure-test)
- [SR mapping entry](../philosophy-history/theory-mapping.md#special-relativity-sr)

---

## Energy and Self-Hit in the Tri-Binary Sea

In the **super-field-speed** regime ($|\mathbf{v}_a|>1$ at some emission times), architrinos and assemblies can intersect their own past isochrons (self-hit). In the presence of the tri-binary sea:

- Self-hit repulsion acts as an internal **stiffening mechanism** for tri-binaries and more complex assemblies, contributing to their stability.
- Energy that an architrino (or assembly) emitted into its local Noether-Sea environment can be partially re-absorbed through delayed self-interaction. At the bookkeeping level, this is an exchange between internal kinetic energy and wake/medium energy associated with the local tri-binary configuration.

At the exact causal-action level, global energy is conserved: self-hit just routes energy along more complex paths (architrino → causal isochron → local Noether Sea → back to architrino/assembly). In dual-mollified local theorem models, the same statement should be read conditionally unless the mollified kernel is explicitly tied to an action-level regularization.

---

## Intuition (Plain Language)

Inside an assembly there is a huge storm of energy. Outside, you only see a faint ripple whose amplitude is set by how imperfect the internal cancellations and sea shielding are.

Architrinos and their assemblies are where all the energy lives. The tri-binary sea is a dense, high-energy ocean in which a few special assemblies (electrons, quarks, nucleons) are like boats. The boats' mass and inertia are not just in the hull; they live in how the hull is built and how it pulls on the water. In nested fermion cores, the outer binaries also act like energy screens around the deeper engine. Most of the ocean's energy never shows up in long-range effective fields, because the waves from different directions cancel almost exactly and the deeper layers are partly hidden behind those screening shells. The tiny leftover ripples are what we call gravity and particle masses.

## Summary and Role in the Larger Theory

- **At the architrino level:**
  
  Kinetic energy and potential energy are defined via the Master EOM. Exact global conservation belongs to the exact causal-action theory; in mollified working models it is the target bookkeeping structure and is exact only when the regularization preserves the underlying time-translation symmetry. The substrate law is acceleration-first; no particle-specific fundamental mass is assigned to architrinos, and speeds are unbounded in principle.
  Potential availability is geometric rather than fuel-like: causal wakes are emitted as path-history structure, while work appears only when a receiver intersects active wake branches with nonzero radial power.

- **At the assembly level:**
  
  Large internal energies, plus coupling to the tri-binary sea, generate:
  - Effective inertia (mass),
  - Shielded external wake signatures (tiny apparent energy compared to internal),
  - Generation dependence through how many outer screening shells still surround the deepest core,
  - An emergent speed scale $c_{\text{eff}}$ and relativistic-like behavior.
  Macroscopic quietness follows from superposition and shielding: incoherent populations cancel statistically, while phase-locked assemblies such as collinear breathers preserve localized, non-canceling wake structure.

- **For spacetime and gravity:**
  
  The sea of small, high-energy tri-binaries forms the Noether Sea and, at coarse-grained level, the effective spacetime medium whose energy density and stress give rise to an emergent metric. The shielding factors and internal energies of both Noether-Sea tri-binaries and "matter" assemblies will determine:
  - The effective Newton constant $G$,
  - The cosmological Noether-Sea energy density,
  - How strongly spacetime curvature responds to different kinds of energy.
  
  Density-driven oblation: as the tri-binary sea encounters denser matter, local tri-binaries scale down and oblate, creating a compliance gradient that contributes directly to the effective gravitational coupling $G$.

---

## Appendix A: Energy Zero and Bookkeeping

$\mathbb{A}\mathbb{A}\mathbb{A}$ uses a **binding-energy convention** that fixes the zero of potential energy at the **inner turning point** of a bound pair (the self-hit / max-curvature radius). This choice is both physical and operational: the system has a **hard inner cutoff** (no further compression), so the deepest accessible state is unique and history-independent.

### Physical Setup and Why a New Zero is Needed

For an attractive two-body system (opposite polarities), the inward motion accelerates until it reaches a **minimum radius** $r_{\min}$ where self-hit dynamics and curvature limits prevent further collapse. The motion then rebounds or orbits. Unlike a pure Coulomb potential, this system **does** have a lower bound on radius (and hence on accessible energy states).

Because a lower bound exists, the natural reference is **not** "infinite separation" but the **ground configuration** at $r_{\min}$.

### The Bookkeeping Convention

We adopt a **singular-boundary gauge**: since the self-hit dynamics impose a geometric lower bound $r_{\min}$ (the maximum curvature attractor), we fix the potential gauge at this wall.

$$U(r_{\min}) \equiv 0.$$

In this gauge, $U(r)$ represents the **accumulated work** performed to separate the binary from its ground state to radius $r$. Total energy is thus partitioned into *kinetic* (motion) and *deformation* (separation) components, with fully separated (unbound) pairs carrying maximal deformation energy $U_{\max} \equiv B_{\max}$.

### Binding Energy and Total Energy

Let $B(r)$ denote the **binding energy** at radius $r$, with

$$B(r_{\min}) = B_{\max}.$$

Define

$$U(r) = B_{\max} - B(r).$$

Then total energy bookkeeping is:

$$E_{\text{total}} = K(r) + U(r), \qquad U(r) \ge 0.$$

At the minimum radius:

$$E_{\text{total}} = K_{\max}, \quad U(r_{\min}) = 0.$$

All available mechanical energy is kinetic at the inner turning point. Moving outward converts kinetic energy into potential energy (the rebound / climb-out phase).

### Effective Potential Language

If an effective potential is used, the centrifugal term and the self-hit barrier both contribute:

$$V_{\text{eff}}(r) = V(r) + \frac{L^2}{2 q_{\text{inertia}} r^2} + V_{\text{self-hit}}(r).$$

Here $q_{\text{inertia}}$ is an **effective inertial scale** (a bookkeeping proxy for mass in the coarse-grained description), not the architrino charge $q$ used in $U=q\Phi$ above.

The convention above fixes:

$$V_{\text{eff}}(r_{\min}) = 0.$$

This does **not** change dynamics; it sets a physically meaningful reference.

### Self-Hit Echo and Discrete Steps (Working Note)

In the current picture, the self-hit region is **not** assumed to change the local force law. The radial slope remains smooth:

$$\frac{dU}{dr} \text{ is continuous, and both spirals start with slope } 1.$$

So the transition between the $v=c_f$ regime and the self-hit regime is a **gentle grafting**, not a kink in the potential. The distinction shows up in **how energy is discretized and routed** between binaries, not in a new macroscopic slope.

The discrete step is a causal-root ledger effect, not an assumption that energy itself is made of independent chunks. On a fixed branch chart, the active causal intersections have an integer multiplicity: a self-hit count $N$ and an analogous partner-hit or channel count $M$ in the root-ledger language developed in the [closed-form collinear breather ansatz](../proof-programs/closed-form-collinear-breather-ansatz.md). In the circular binary notation this same idea appears as the pair $(N_s,M_p)$ in [Super-Field-Speed Root Ledgers and Resonance Lock](binary-dynamics.md#super-field-speed-root-ledgers-and-resonance-lock). Within one ledger cell the underlying trajectory and $U(r)$ remain continuous. A visible $h$-like transaction occurs when a separator crossing changes the admissible integer ledger, for example by adding one grouped channel or, in the raw simple-root table, by a fold-pair jump satisfying $\Delta N\in 2\mathbb{Z}$ with $\Delta D=0$.

Thus the candidate quantum of action is geometric bookkeeping: it is the action scale assigned to a threshold crossing of the causal-root ledger. The energy shift appears in steps because the allowed causal intersections have changed discretely, even though the path-history geometry and the local potential slope remain continuous through the regularized fold layer.

Working bookkeeping hypothesis:

- Outer binary registers a single-step transaction ($h$-like unit), meaning one minimal admissible update of its active partner and self channel ledger.
- Middle binary adjusts to conserve total energy.
- Inner binary executes a two-step shift ($2h$-like unit), i.e., two discrete ledger updates rather than one. The "step" corresponds to the system crossing a separatrix between basins of attraction in the nonlinear delay dynamics. While the underlying trajectory is continuous, the energy redistribution stabilizes only at discrete resonances (winding numbers and causal-root multiplicities), making the effective energy transfer appear quantized.

This can read as an "amplified" response, but only because the inner binary is **releasing or reconfiguring stored energy** when the self-hit echo is engaged. It is **not** net energy creation; it is a redistribution between internal stores under a smooth $U(r)$.

### Tri-Binary as Routing/Locking Circuit (Analogy)

It is useful (as a **bookkeeping analogy**) to think of the tri-binary as a **routing/locking circuit** rather than a simple reservoir. An incoming single-step transaction ($h$-like) couples most strongly to the **outer binary**, the **middle binary** acts as a buffer/fulcrum that maintains overall consistency, and the **inner binary** can respond with a two-step reconfiguration when the self-hit echo is engaged. This makes the response feel like a **gear or ratchet**, but the mechanism is still deterministic energy routing, not creation.

In this language, a discrete input can **lock in** a new tri-binary configuration: a threshold-triggered, history-dependent update that selects one stable branch over another. This is a **collapse-like** event in the phenomenological sense (a sudden, discrete state update), but in $\mathbb{A}\mathbb{A}\mathbb{A}$ it is treated as a **deterministic, microstate-sensitive bifurcation**, not an intrinsically stochastic collapse.

### Bookkeeping Table: One $h$ of Angular Momentum (Outer $v < c_f$)

Assumptions for this bookkeeping pass:

- $f$ labels a discrete outer-binary orbital state (frequency index). The three rows are **pre-hit** ($f-1$), **action/transition** ($f_{\psi}$), and **post-redistribution** ($f$). There is **one** step in frequency. The $f_{\psi}$ label is a transient bookkeeping state, not a new frequency index or literal wavefunction.
- The transaction is a single angular-momentum unit, $\Delta L_{\text{out}} = +h$, delivered to the **outer** binary while $v_{\text{out}} < c_f$.
- The symbol $h$ labels the action unit associated with one accepted causal-root ledger update, not a primitive energy grain.
- Energy bookkeeping uses action-angle language: for a small discrete step, $\Delta E \approx \omega\,\Delta L$. This is a **notation choice**, not a claim about the exact micro-law.
- The **inner binary** responds with a two-step reconfiguration ($2h$-like). The **middle binary** adjusts to satisfy conservation of total energy and angular momentum (including any wake/field exchange).

Notation in the table:

- $K_o, U_o$ = outer-binary kinetic and potential energies.
- $K_m, U_m$ = middle-binary kinetic and potential energies.
- $K_i, U_i$ = inner-binary kinetic and potential energies.
- Superscripts $(f-1)$, $(f_{\psi})$, and $(f)$ denote the state index (one-step update).

Per-step increments (explicit, no deltas):

- Outer step energy: $\varepsilon_o \equiv \omega_o h$ with
  $$k_o \equiv \chi_o\,\varepsilon_o,\quad u_o \equiv (1-\chi_o)\,\varepsilon_o,$$
  so $k_o + u_o = \varepsilon_o$.
- Inner step energy: $\varepsilon_i \equiv \omega_i h$ with
  $$k_i \equiv \chi_i\,\varepsilon_i,\quad u_i \equiv (1-\chi_i)\,\varepsilon_i,$$
  so $k_i + u_i = \varepsilon_i$. Because the inner binary takes **two steps**, it adds $2k_i$ and $2u_i$.
- Middle adjustment energy: $\varepsilon_m$ is whatever is needed to close the ledger. Here $\varepsilon_w$ denotes the **wake/field exchange energy** during the step:
  $$\varepsilon_m \equiv \varepsilon_w - 2\varepsilon_i,$$
  and we split it as
  $$k_m \equiv \chi_m\,\varepsilon_m,\quad u_m \equiv (1-\chi_m)\,\varepsilon_m.$$

| State | Outer (o) | Middle (m) | Inner (i) | Notes |
| --- | --- | --- | --- | --- |
| $f-1$ | $K_o^{f-1}$, $U_o^{f-1}$ | $K_m^{f-1}$, $U_m^{f-1}$ | $K_i^{f-1}$, $U_i^{f-1}$ | Baseline. No pending transaction. |
| $f_{\psi}$ | $K_o^{f_{\psi}} = K_o^{f-1} + k_o$<br>$U_o^{f_{\psi}} = U_o^{f-1} + u_o$ | $K_m^{f_{\psi}} = K_m^{f-1}$<br>$U_m^{f_{\psi}} = U_m^{f-1}$ | $K_i^{f_{\psi}} = K_i^{f-1}$<br>$U_i^{f_{\psi}} = U_i^{f-1}$ | Immediate post-hit. <br>Outer receives $\Delta L_o = +h$ <br>Outer records a $(k_o,u_o)$ increment. |
| $f$ | $K_o^{f} = K_o^{f-1} + k_o$<br>$U_o^{f} = U_o^{f-1} + u_o$ | $K_m^{f} = K_m^{f-1} + k_m$<br>$U_m^{f} = U_m^{f-1} + u_m$ | $K_i^{f} = K_i^{f-1} + 2k_i$<br>$U_i^{f} = U_i^{f-1} + 2u_i$ | Post-redistribution. <br>Outer update is complete at $f_{\psi}$; <br>only middle/inner continue to settle. |

Constraints to apply across the $f-1 \to f$ transition (bookkeeping level):

- **Angular momentum**: $\Delta L_{\text{out}} + \Delta L_{\text{mid}} + \Delta L_{\text{in}} + \Delta L_{\text{wake}} = +h$. For a **net positive** transaction, all binaries should register **nonnegative** increments (no mixed signs): $\Delta L_{\text{out}}, \Delta L_{\text{mid}}, \Delta L_{\text{in}} \ge 0$ with $\Delta L_{\text{wake}} \approx 0$, and the distribution is left unspecified. For a **net negative** transaction, all three should be nonpositive. This preserves a consistent sign across the assemblies while still allowing arbitrary partitioning.
- **Energy**: $(k_o+u_o) + (k_m+u_m) + 2(k_i+u_i) = \varepsilon_o + \varepsilon_w$. This is the explicit version of conservation using the per-step increments defined above.
- **Root-ledger closure**: the transition must move from one admissible integer causal-root ledger to another and then close consistently over the full cycle. In a raw self-root table, separator crossings obey the parity rule $\Delta N\in 2\mathbb{Z}$ and $\Delta D=0$; in a grouped channel ledger, the same event may be recorded as one newly active channel.
- **Smooth slope**: $dU/dr$ remains continuous across the graft; the discrete behavior comes from **state updates**, not a kink in $U(r)$.

This table is intentionally explicit: every $h$ transaction is split into a kinetic part ($k$) and a potential part ($u$), and the only remaining freedom is **how** each binary partitions its step (the $\chi$ fractions).

### Comparison to Coulomb and Standard Conventions

In pure Coulomb,

$$V(r) = -\frac{k q^2}{r},$$

so there is no inner bound and no natural finite zero. Classical mechanics therefore chooses $V(\infty)=0$.

In $\mathbb{A}\mathbb{A}\mathbb{A}$, the hard inner cutoff **creates** a natural zero at $r_{\min}$, which is the lowest accessible state. The bookkeeping therefore switches from "energy relative to infinity" to "energy relative to the ground state."

### Summary Table (Operational Meaning)

| Region | $K$ | $U$ | Meaning |
| --- | --- | --- | --- |
| $r = r_{\min}$ | max | 0 | Fully bound (ground) |
| $r > r_{\min}$ | $\downarrow$ | $\uparrow$ | Climbing out / rebound |
| escape limit | 0 | $B_{\max}$ | Free (unbound) |

### One-Line Rule

If the model has a hard inner bound, **set the potential zero at that bound** and measure all energies outward from it.
