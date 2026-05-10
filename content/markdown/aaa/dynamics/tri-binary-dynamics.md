# Tri-Binary Dynamics

This chapter develops a working draft of tri-binary dynamics by extending the two-body delay system to a coupled three-binary core. The focus is the geometric response at high group velocity and under strong gravitational gradients, along with the diagnostic quantities used to assess stability and alignment.

It should be read together with [Binary Dynamics](binary-dynamics.md), [Dyadic Resonance Lock](dyadic-resonance-lock.md), [Mapping the Planck Scale](../spacetime/mapping-planck-scale.md), [Noether Core](../assemblies/noether-core.md), and [Emergent Metric](../spacetime/emergent-metric.md), since those notes supply the binary precursor, lock structure, alignment target, assembly carrier, and effective geometric bridge.

## Relation to the Causal Closure Workstream

This chapter owns the dynamics baseline: the Noether-core roles, speed-regime conventions, delay-envelope geometry, gradient response, local clock diagnostics, and stability tests that define the tri-binary mechanism. It does not try to close the full rest-mass, proper-time, photon, or relativistic-limit proof program.

The stronger causal-closure program uses the mechanism defined here as an input. In this chapter, those stronger claims are included only where they clarify the dynamics baseline, and they are marked as reconstruction targets rather than completed theorems.

## Publication Status and Claim Scope

This chapter is publishable as a canonical dynamics baseline. It is not a completed derivation of rest mass, photon behavior, or general relativity from first principles. Its claims are organized into three classes:

| Class | Treatment in this chapter |
| --- | --- |
| Dynamics baseline | Noether-core roles, speed-regime conventions, delay-envelope geometry, spiral-helical motion, clock diagnostics, and stability tests. |
| Reconstruction target | Mass response, proper time, observer-level metric data, photon-channel behavior, and weak-field matching as quantities to be derived from the dynamics. |
| Open proof burden | Shielding extraction, momentum-skew derivation, Floquet stability, photon closure, equivalence-principle residual bounds, and ADM/Cartan closure. |

The chapter should therefore be read as the stable dynamics layer beneath the causal-closure program. It preserves the mechanism and the diagnostic quantities while leaving the full theorem burden explicit.

## Substrate and Effective Levels

Tri-binary dynamics uses four levels of description:

| Level | Meaning |
| --- | --- |
| Substrate ontology | Euclidean void, absolute substrate time $t$, architrinos, causal wakes, and causal-root branch structure. |
| Assembly dynamics | Noether cores, three coupled binary layers, self-hit multiplicity, shielding, phase closure, and root-ledger transitions. |
| Effective physics | Rest mass, proper time, photon propagation, Lorentz kinematics, geodesics, and horizon behavior as reconstructed by assembly-built observers. |
| Theorem roadmap | Mathematical closures that remain to be derived before the effective claims can be treated as proved. |

The distinction matters because the Euclidean void is not being curved at the substrate level. Curvature, geodesic motion, lapse, and horizon language enter as observer-level bookkeeping reconstructed from Noether-Sea state variables and assembly response.

## Speed Hierarchy

Several speed symbols must remain separated:

| Symbol or phrase | Meaning |
| --- | --- |
| $c_f$ | Primitive wake propagation speed in the substrate. |
| $c_{\text{eff}}(\mathbf{x})$ | Local effective signal speed through the Noether Sea for assembly-level closure. |
| $c_\gamma(\mathbf{x})$ | Local photon-channel speed; in the working observer-level photon branch, $c_\gamma(\mathbf{x})\equiv c_{\text{eff}}(\mathbf{x})$. |
| Locally measured light speed | The operational speed reconstructed by assembly clocks, rulers, and photon synchronization. |

The primitive speed $c_f$ is used for wake-intersection and self-hit geometry. The effective speed $c_{\text{eff}}$ is used for Noether-Sea dressed closure and observer-level comparisons. These are not interchangeable. Any diagnostic that moves from primitive wake geometry to observer-level clocks, rulers, or photons must declare its dressing map.

## Mass Thesis as a Dynamics Target

The conservative mass thesis is that rest mass is not primitive architrino substance. It is the externally measurable response of shielded, phase-locked internal causal history.

In roadmap form, the target relation is

$$
m_0(A)c_{\text{eff}}^2
\sim
\zeta(A)E_{\text{internal}}(A),
$$

where $E_{\text{internal}}(A)$ is the trapped internal causal-history ledger of assembly $A$, and $\zeta(A)$ is the shielding or leakage factor that controls how much of that ledger couples to external probes. This is not yet a derived mass formula. It becomes a theorem only after the shielding factor, the internal energy ledger, and the first-order momentum-skew response are derived from the closed tri-binary dynamics.

## Spiral-Helical Motion Picture

A resting Noether core is modeled as a nested, phase-locked tri-binary structure with three coupled binary planes. When the core moves with center-of-mass velocity $\mathbf{V}_{\text{cm}}$, the rest-state circular or near-circular binary motions are drawn into braided spiral-helical cable patterns through the Euclidean void.

The spiral-helical picture is not decorative. A causal wake sent between partners, or between the inner, middle, and outer layers, must now reach a receiver that has moved during the wake's travel time. The internal phase geometry must therefore retune its pitch, radius, tilt, and timing to preserve the same closure ledger. In dynamics language, bulk velocity is encoded as internal geometry.

This is the common mechanical basis for three later effective readouts:

- clock-rate change, because each completed internal cycle requires a different causal path;
- longitudinal ruler contraction, because inter-assembly spacing must retune for forward and backward exchange;
- inertial response, because acceleration forces the internal causal ledger to re-close under a changing kinematic bias.

## Proper Time as Internal Cycle Count

Proper time $\tau$ is the cycle count of a stable Noether-core clock, not the absolute substrate time $t$ itself. In a homogeneous Noether-Sea cell, the transverse causal budget for a moving assembly is

$$
c_{\perp}
=
c_{\text{eff}}
\sqrt{1-\frac{\|\mathbf{V}_{\text{cm}}\|^2}{c_{\text{eff}}^2}}.
$$

The clock-rate diagnostic is therefore

$$
\frac{\Delta\tau}{\Delta t}
=
\frac{c_{\perp}}{c_{\text{eff}}}
=
\sqrt{1-\frac{\|\mathbf{V}_{\text{cm}}\|^2}{c_{\text{eff}}^2}}.
$$

This is the causal-budget route to the standard effective dilation law. The chapter treats it as a working mechanism: moving assembly clocks tick more slowly because less transverse causal capacity remains for closing their internal tri-binary cycles.

## ADM/Cartan Reconstruction Target

For observer-level comparison with effective geometry, tri-binary dynamics should reconstruct three local fields from Noether-Sea state variables and assembly response:

$$
N(\mathbf{x},t),
\qquad
u^i_{\text{sea}}(\mathbf{x},t),
\qquad
\gamma_{ij}(\mathbf{x},t)=\delta_{ab}e^a{}_i e^b{}_j.
$$

Here $N$ is the effective clock-rate or lapse field, $u^i_{\text{sea}}$ is medium drift, and $\gamma_{ij}$ is the spatial compliance metric. The observer-level bookkeeping metric target is

$$
ds_{\rm eff}^2
=
-N^2c_0^2dt^2
+
\gamma_{ij}
\left(dx^i-u^i_{\text{sea}}dt\right)
\left(dx^j-u^j_{\text{sea}}dt\right).
$$

This metric is not substrate ontology. It is the effective clock, ruler, and null-path bookkeeping induced by the Noether-Sea state. The open reconstruction task is to show that the resulting connection reproduces Newtonian acceleration, redshift, Shapiro delay, lensing, and the required weak-field PPN coefficients while keeping torsion, nonmetricity, dispersion, birefringence, and preferred-frame residuals below observational limits.

## Dynamics-Side Roadmap

The dynamics chapter contributes the stable pieces needed by the larger theorem program:

1. Define the speed hierarchy and the causal-speed guardrails.
2. Model the tri-binary Noether core as inner engine, middle fulcrum, and outer shielding/interface layer.
3. Track how motion deforms the rest-state lock into braided spiral-helical geometry.
4. Derive local clock diagnostics from transverse causal budget.
5. Output alignment, closure, Floquet, grazing, and Cartan reconstruction diagnostics.
6. Keep mass, photon, equivalence-principle, and full GR matching claims at the level of reconstruction targets until their proof burdens close.

## Working Hypotheses

1. The formed Noether core has stable invariants ($R_{\text{core}}$, $\omega_{\text{core}}$, fixed phase offsets).
2. The outer-binary delay loop yields discrete plateaus and a terminal aligned mode under increasing stress.
3. High group velocity produces an oblate causal envelope that drives planar alignment in the terminal rung.
4. High gravitational gradient modifies phase closure through tidal or differential delay effects, shifting or destabilizing rungs.

---

## Regime Map for Speed Statements (CFT / Horizon / AdS)

To keep speed claims consistent across documents, all binary-speed statements should be read as **regime-qualified**:

| Regime | Inner binary | Middle binary | Outer binary | Operational meaning |
| --- | --- | --- | --- | --- |
| **CFT exterior** (sub-horizon, weak/medium stress) | Typically in self-hit branch ($v \gtrsim c_f$ history-supported) | Near the hinge scale ($v \approx c_f$) in working models | Typically $v < c_f$ | Hierarchical tri-binary operation and ordinary ladder behavior |
| **Holographic horizon transition** (terminal alignment) | Forward-sector components approach $c_f$ | Forward-sector components approach $c_f$ | Forward-sector components approach $c_f$ | 3D precessing structure collapses toward planar lock |
| **AdS / self-hit interior** (post-transition, strongly nonlocal memory) | Self-hit dominated; effective closure may involve super-field effective speed | Strongly coupled to inner/outer delay closure | Can participate in states where combined in-plane effective speed satisfies $v_{\text{eff}} > c_f$ | Mach-wedge-like causal geometry and interior recycling hypotheses |

**Notation guardrail:** "$v < c_f$" or "$v = c_f$" in role summaries refers to a component/regime statement, while $v_{\text{eff}} > c_f$ refers to the **combined in-plane effective motion** used in wake-geometry closure.

**Geometry speed guardrail:** Use a declared causal speed $c_\star$ in envelope and closure diagnostics. For primitive architrino wake intersections, set $c_\star=c_f$. For observer-level Noether-Sea dressed closure, set $c_\star=c_{\text{eff}}(\mathbf{x})$. The corresponding kinematic parameter is
$$
\beta_\star=\frac{v_{\text{trans}}}{c_\star},
\qquad
\gamma_\star=\frac{1}{\sqrt{1-\beta_\star^2}}.
$$
Primitive dynamics scans and effective-metric comparisons must not mix $c_f$ and $c_{\text{eff}}$ in the same diagnostic without an explicit dressing map.

---

## Geometry Focus

### A) High Group Velocity Geometry (Oblate Spheroid)

**Assumption (testable):** The outer binary moving at translational speed $v_{\text{trans}}$ generates a causal interaction envelope that is oblate and flattens along the direction of motion as $v_{\text{trans}} \to c_f$.

**Geometry:** Let the motion define the $z$-axis. Model the envelope as an ellipsoid
$$
\frac{x^2 + y^2}{R_\perp^2} + \frac{z^2}{R_\parallel^2} = 1,
$$
with transverse radius $R_\perp$ and longitudinal radius $R_\parallel$.

Adopt a kinematic contraction law (to be validated by dynamics):
$$
\beta = \frac{v_{\text{trans}}}{c_f}, \quad \gamma = \frac{1}{\sqrt{1-\beta^2}}, \quad R_\parallel = \frac{R_\perp}{\gamma}.
$$
As $\beta \to 1$, $R_\parallel \to 0$ and the envelope collapses toward a disk.
**Right-triangle link:** Treat $c_f$ as the fixed causal propagation speed and decompose it into orthogonal components: one leg is the group translation $v_{\text{trans}}$, the other leg is the longitudinal closure speed $v_\parallel$. Then
$$
c_f^2 = v_{\text{trans}}^2 + v_\parallel^2 \quad \Rightarrow \quad v_\parallel = c_f\sqrt{1-\beta^2}.
$$
Mapping causal speed to closure length gives $R_\parallel = R_\perp (v_\parallel/c_f) = R_\perp\sqrt{1-\beta^2} = R_\perp/\gamma$, recovering the ellipsoid law from the triangle geometry.

**Impact on delay locking:** The round-trip delay $\Delta t_{\text{rt}}$ is the time between an outer-binary architrino’s emission and the moment its wake returns to influence that same architrino, approximating the inner+middle as a compact core at the center. For a ray at polar angle $\theta$ relative to the $z$-axis, the intersection radius with the ellipsoid is
$$
R(\theta) = \left(\frac{\sin^2\theta}{R_\perp^2} + \frac{\cos^2\theta}{R_\parallel^2}\right)^{-1/2}.
$$
Then $\Delta t_{\text{rt}}(\theta) \approx 2 R(\theta)/c_f$, and the phase condition generalizes to
$$
\Phi_n(\theta, \mathbf{v}_{\text{trans}}) = \omega_n\,\Delta t_{\text{rt}}(\theta) + \phi_{\text{geom}}(n).
$$
**Conjecture (velocity convergence):** As translational speed increases, delay-closure constraints drive the orbital degree of freedom to adjust (e.g., by shrinking radius and raising $v_{\text{orb}}^{\text{tan}}$) so that both $v_{\text{trans}}$ and $v_{\text{orb}}^{\text{tan}}$ converge toward $c_f$ at the planar transition.

**Exclusion volume (instantaneous):**
$$
V(v_{\text{trans}}) = \frac{4\pi}{3} R_\perp^2 R_\parallel
= \frac{4\pi}{3} R_\perp^3 \sqrt{1-\left(\frac{v_{\text{trans}}}{c_f}\right)^2}.
$$
If the outer radius is infalling, treat $R_\perp = R_\perp(t)$ so
$$
V(t) = \frac{4\pi}{3} R_\perp(t)^3 \sqrt{1-\left(\frac{v_{\text{trans}}(t)}{c_f}\right)^2}.
$$

---

### B) High Gravitational Gradient Geometry

**Coupling caveat:** Whether $v_{\text{trans}}$ is independent of the radial infall speed $v_r$ is unresolved. Use the independent form by default, or adopt a coupling $v_{\text{trans}} = f(R_\perp)$ and substitute to test specific scenarios.

**Assumption (testable):** A strong external gradient (tidal field or effective curvature) perturbs the delay loop, altering phase closure and stability of rungs.

**Origin of the gradient (model definition):** Gravitation is implemented as an emergent spatial gradient in Noether core volume. As energy accumulates in dense collections of standard-model assemblies (protons, neutrons, electrons), the local Noether core volume contracts, and surrounding regions experience a gradient in available core volume. This gradient is the effective gravitational field in the delay-geometry model.

**Geometry inputs:** Represent this gradient as a scalar control parameter $G_{\text{grad}}$ (e.g., $|\partial \Phi/\partial r|$ or a tidal tensor magnitude) applied to the outer-binary environment. In simulations, treat $G_{\text{grad}}$ as the local radial derivative of Noether core volume (or its proxy) around the outer-binary orbit.

**Expected effects to test:**
- Differential path delays across the outer orbit (forward vs backward sector).
- Drift in precession cone angle and inter-plane tilt under increasing $G_{\text{grad}}$.
- Shifts in the stability sign $\partial \Phi_n/\partial r$ or loss of plateau behavior.
**Prediction:** Increasing $G_{\text{grad}}$ shifts stable $n$ values and narrows or removes plateaus; strong gradients can pull the terminal alignment inward or erase it.

### C) Exclusion Volume Under Precession (Caveat)

**Implication:** Outer-binary precession sweeps an exclusion region that is larger than a static orbit. The effective exclusion volume is the union of the orbit's causal envelope over a precession cycle, not just a single instantaneous envelope.
This union geometry sets packing and overlap limits by construction, rather than relying on point-particle exclusion rules.

**Modeling at $v>0$:** Use the oblate envelope as a time-dependent exclusion region whose axis precesses. The exclusion volume becomes anisotropic and typically increases with precession cone angle.

**As $v_{\text{trans}} \to c_f$:** The envelope flattens toward a disk, so the exclusion volume becomes a thin, swept annulus dominated by the equatorial plane. This tends to amplify planar alignment constraints and reduce accessible 3D configurations.
At sufficiently high stress, this implies a terminal rung: further increases cannot support a stable 3D mode, only a planar aligned state.

**Status:** This precession-expanded exclusion volume is not explicitly modeled in the current minimal system; treat results as lower bounds until the swept-volume effect is added.

### D) Time Distortion: Spacetime Time vs Absolute Time

**Goal:** Define "time in spacetime" as a geometric effect in the delay loop, not a relativistic postulate.

**Absolute clock:** Use the outer-binary Planck cadence as a reference cadence: $T_0 = 1/f_P$.

The cadence $T_0=1/f_P$ is a reference assembly cadence, not the absolute substrate time itself. Absolute time $t$ remains the uniform ordering parameter for causal-hit evaluation. The local clock diagnostic compares assembly cycle counts to this reference cadence:
$$
N_{\text{clock}}(\mathbf{x})
\equiv
\frac{d\tau}{dt}
=
\frac{T_0}{T_{\text{local}}(\mathbf{x})}
$$
in the rest branch of the local Noether-Sea cell. This quantity is the dynamics-side precursor of the effective lapse field used in the emergent-metric construction.

**Local clock from delay geometry:** Define a reference round-trip delay $\Delta t_{\text{rt,ref}}$ and a local delay $\Delta t_{\text{rt}}(\theta, G_{\text{grad}})$. Then
$$
\alpha(\theta, G_{\text{grad}}) = \frac{\Delta t_{\text{rt}}(\theta, G_{\text{grad}})}{\Delta t_{\text{rt,ref}}}
$$
and, for the ellipsoid-only case with no gradient,
$$
\alpha(\theta) = \frac{R(\theta)}{R_{\text{ref}}}
$$
measures how the local phase-closure period compares to the invariant clock:
$$
T_{\text{local}}(\theta) = T_0 \, \alpha(\theta, G_{\text{grad}}).
$$
When $\alpha > 1$, local cycles are longer relative to $T_0$; when $\alpha < 1$, they are shorter. This is the penultimate definition of time distortion in this model.

**Geometric source of distortion:** The causal envelope shape sets $\Delta t_{\text{rt}}$. As the tri-binary tilts out of planar and loses energy, the envelope becomes less oblate (larger $R_\parallel/R_\perp$), increasing some path lengths and stretching $T_{\text{local}}$; as it flattens, $R_\parallel$ shrinks and the corresponding delays contract. Gradients ($G_{\text{grad}}$) further skew delays across the orbit.

**Lorentz beta in geometric form:** In Lorentz kinematics, $\beta = v/c$ and $\gamma = 1/\sqrt{1-\beta^2}$. In this model, use $\beta = v_{\text{trans}}/c_f$ and the oblate ellipsoid relation
$$
R_\parallel = R_\perp \sqrt{1-\beta^2} = \frac{R_\perp}{\gamma}.
$$
Geometrically, $\beta$ is the axis-squash control: as $\beta \to 1$, the causal envelope collapses along the motion axis, shrinking longitudinal path lengths and altering the delay.

**Where it enters phase closure:** In scans, treat the local clock as an effective frequency $\omega_n/\alpha$ inside $\Phi_n$ for the sector under consideration. Redshift follows because emitted periodicity inherits the local clock rate: longer causal loops (larger $\alpha$) yield lower observed frequency at fixed absolute-time reference.

---

## Minimal Models

### Noether Core Baseline (Inner + Middle Fixed)

**Focus:** Treat inner + middle as a formed Noether core with fixed (or slowly varying) center of mass. Track convergence of phase relations and extract $R_{\text{core}}$, $\omega_{\text{core}}$, and stable phase offsets. Check repeatability across nearby initial conditions and whether any core element rides $v = c_f$ continuously.

### Outer-Binary Delay Loop Model with Formed Core

**Focus:** Characterize the discrete ladder / top-rung behavior in a minimal delay system and quantify geometry at high $v_{\text{trans}}$ and high $G_{\text{grad}}$.

**Model ingredients:**
- Inner + middle modeled as a rigid core with fixed timescales.
- Outer binary orbits the core with non-coplanar planes initially.
- Translational speed $\mathbf{v}_{\text{trans}}$ and gradient $G_{\text{grad}}$ are control parameters.
- Use ellipsoid-based $\Delta t_{\text{rt}}(\theta)$ for high-velocity geometry.

**Phase condition:**
$$
\Phi_n(\theta, \mathbf{v}_{\text{trans}}, G_{\text{grad}}) = \omega_n\,\Delta t_{\text{rt}}(\theta) + \phi_{\text{geom}}(n),
$$
and track when $\partial \Phi_n/\partial r$ changes sign.
Quantization here is emergent: only delay-locked, stable closures persist as discrete rungs, not imposed eigenmodes.

### Alignment Invariants and Configuration Diagnostics

**Diagnostics (operational):**
- **Inter-plane angles:** $\theta_{ij} = \arccos(\hat{n}_i \cdot \hat{n}_j)$ for $(i,j)\in\{\text{inner, mid, outer}\}$. Track $\max(\theta_{ij})$ over an outer period.
- **Planarity threshold:** Declare “planar aligned” if $\max(\theta_{ij}) < \epsilon_\theta$ for $N$ consecutive outer periods.
- **Precession cone angle:** Let $\hat{n}_{\text{net}}$ be the normalized sum of plane normals. Define $\theta_{\text{cone}} = \max_t \arccos(\hat{n}_{\text{net}}(t)\cdot\langle\hat{n}_{\text{net}}\rangle)$ over one outer period.
- **Rotation test (SU(2) vs U(1)):** Evolve the same state under an imposed $2\pi$ spatial rotation and compare the causal configuration $\mathcal{C}(t)$ to the unrotated one (e.g., phase-closure residuals and relative plane phases). If $\mathcal{C}(t)$ matches only after $4\pi$, treat as SU(2)-like; if after $2\pi$, treat as U(1)-like.
- **Prediction:** As alignment strengthens, $\theta_{ij}$ and $\theta_{\text{cone}}$ should decrease monotonically; the rotation test should transition from $4\pi$ to $2\pi$ return.
As alignment increases and planes coincide, the remaining degree of freedom is a single in-plane phase (U(1)-like), consistent with a boson-like terminal configuration.

### Floquet and Grazing Diagnostics

Two nonlinear-dynamics diagnostics extend the standard alignment invariants and connect this chapter to the broader causal-closure program.

**Floquet basin-robustness gap:** For a periodic tri-binary state $\mathcal{S}_{\mathbf{k}}$ with integer winding $\mathbf{k}$ and period $T_{\mathbf{k}}$, linearize the delay system around the periodic orbit and compute the leading Floquet multipliers $\{\mu_i\}$ off the symmetry directions. Define
$$
\Delta_{\mathbf{k}} = 1 - \max_{i\notin G}\|\mu_i(\mathbf{k})\|.
$$
Track $\Delta_{\mathbf{k}}$ along scans in $\beta = v_{\text{trans}}/c_f$ and $G_{\text{grad}}$. Stable rungs have $\Delta_{\mathbf{k}}>0$; rung termination, separator clock-freeze, and gradient-driven failure should all coincide with $\Delta_{\mathbf{k}}\to 0^+$.

**Grazing-bifurcation diagnostics at the separator:** Near $\|\mathbf{v}\|=c_f$, the post-crossing trajectory deviation is predicted to scale as $\sqrt{t-t_*}$ along the eigenvector of the newly activated self-hit root. Two simulation tests follow:

- log-log fit of phase-deviation versus time-since-crossing, expected to yield slope $1/2$;
- parameter sweep across the separator looking for a period-adding cascade in the integer ledger, with each adding event respecting $\Delta N\in 2\mathbb{Z}$.

These diagnostics belong here as observational quantities for the dynamics chapter. Their proof burdens include Floquet-spectrum discreteness for state-dependent self-hit path-history delays and grazing-normal-form derivation.

---

## Metric and Connection Reconstruction Diagnostics

For comparison with the emergent-metric chapters, each dynamics scan should output the local Cartan data reconstructed from the Noether-core response:
$$
N(\mathbf{x},t),\qquad
u^i_{\text{sea}}(\mathbf{x},t),\qquad
e^a{}_i(\mathbf{x},t),
\qquad
\gamma_{ij}=\delta_{ab}e^a{}_i e^b{}_j.
$$
The effective bookkeeping line element is
$$
ds_{\rm eff}^2
=
-N^2c_0^2dt^2
+
\gamma_{ij}
\left(dx^i-u^i_{\text{sea}}dt\right)
\left(dx^j-u^j_{\text{sea}}dt\right).
$$
The corresponding connection diagnostic is the Levi-Civita connection of $g^{\rm eff}_{\mu\nu}$ in the GR-matching regime, with any torsion or nonmetricity treated as a deviation observable:
$$
\Gamma^\mu{}_{\nu\rho}
=
\frac12 g_{\rm eff}^{\mu\sigma}
\left(
\partial_\nu g^{\rm eff}_{\rho\sigma}
+
\partial_\rho g^{\rm eff}_{\nu\sigma}
-
\partial_\sigma g^{\rm eff}_{\nu\rho}
\right).
$$
Simulation output should therefore include geodesic residuals
$$
\mathcal{R}^\mu
=
\frac{d^2x^\mu}{d\lambda^2}
+
\Gamma^\mu{}_{\nu\rho}
\frac{dx^\nu}{d\lambda}
\frac{dx^\rho}{d\lambda},
$$
evaluated on coarse-grained assembly trajectories and photon planar-mode rays.

## Observables and Diagnostics (Summary)

- Core invariants: $R_{\text{core}}$, $\omega_{\text{core}}$, phase offsets.
- Ladder metrics: $R_{\text{out}}(t)$, $\omega_{\text{out}}(t)$, plateau stability.
- Geometry metrics: anisotropy ratio $A = R_\parallel/R_\perp$, forward vs backward delay ratio.
- Orientation metrics: inter-plane angles, precession cone angle.
- Stability metrics: sign of $\partial \Phi_n/\partial r$, phase-closure residuals.
- Gradient metric: $G_{\text{grad}}$ and its effect on stability thresholds.
- Cartan reconstruction metrics: lapse $N$, drift $u^i_{\text{sea}}$, spatial compliance $\gamma_{ij}$, frame fields $e^a{}_i$, effective connection $\Gamma^\mu{}_{\nu\rho}$, and geodesic residual $\mathcal{R}^\mu$.
- Weak-field matching metrics: Newtonian acceleration residual, redshift residual, Shapiro-delay residual, lensing residual, and extracted PPN coefficients $\gamma_{\rm PPN}$ and $\beta_{\rm PPN}$.

---

## Revision Triggers (Failure Modes)

1. **Core stability:** Unstable or non-repeatable invariants undermine outer-binary claims.
2. **Discrete rungs:** If plateaus do not exist or terminate, the top-rung thesis must be revised.
3. **High-velocity geometry:** If oblate geometry does not improve phase closure, the envelope model fails.
4. **High-gradient behavior:** If strong gradients erase alignment, record the boundary conditions and revise the alignment narrative.

---

## Equivalence Principle (Working Constraint)

The current framework should treat the equivalence principle as a closure constraint rather than as already-derived microphysics. The requirement is local: a uniformly accelerated assembly and a stationary assembly placed in a matched Noether-Sea gradient should exhibit the same local delay-geometry diagnostics to the order probed by observer-built clocks and rulers.

In current language, the comparison is:

- **Gravity case:** the surrounding Noether Sea carries a local gradient that skews the assembly's delay structure.
- **Acceleration case:** the assembly is externally driven, but the experienced delay pattern must reorganize so that the same local constitutive observables are recovered.

The important point is that the comparison cannot be made by deforming the assembly alone. The ambient medium must participate. Otherwise the framework would fail to explain why locally constructed observers infer equivalence between gravitational and inertial response.

The practical diagnostics are the same in both cases:

- phase-closure residuals,
- anisotropy ratios of the internal geometry,
- clock-rate shifts,
- stability thresholds for aligned and oblate states.

For resonance questions, one additional diagnostic is worth tracking explicitly: a cycle-averaged causal-work or phase-slip variance. The working intuition is that non-commensurate drift samples the large-$1/|J|$ region irregularly, producing large cycle-to-cycle swings in delayed work, whereas a true lock should compress that variance and make the return map locally contractive.

In connection language, the local equivalence-principle test is a first-jet matching condition. At a reference event $x_0$, compare the reconstructed Cartan data for an accelerated assembly in a homogeneous Noether-Sea cell with the data for a stationary assembly in a matched Noether-Sea gradient:
$$
\mathcal{J}_1(e,\omega)_{\rm accel}(x_0)
=
\mathcal{J}_1(e,\omega)_{\rm grad}(x_0)
+
O(L^2\nabla R_{\rm eff}),
$$
where $\mathcal{J}_1$ denotes the frame and connection through first order over a laboratory scale $L$. The residual is tidal: it depends on second gradients of the effective metric data and therefore cannot be removed by a local acceleration comparison.

If those quantities cannot be matched between the gradient-driven and acceleration-driven cases in the local limit, then the observer-level recovery of the equivalence principle fails and the constitutive map must be revised.

---

## Routed Extensions

The following items are retained here only as dynamics-facing boundary conditions. Their full proof burdens belong to the broader causal-closure program, not to this chapter.

### Tri-Binary Role Hypotheses

An electrino:positrino binary is the most primitive assembly considered in the current architecture. Architrino assembly architecture posits that three binaries can become coupled into a Noether core, with each binary playing a distinct dynamical role.

- **Inner binary** (MCB, CFT-exterior role): typically in/near self-hit branch ($v \gtrsim c_f$ by history), and would define fundamental units if MCB attractor is confirmed.
- **Middle binary** (CFT-exterior role): near the symmetry hinge ($v \approx c_f$) with variable radius/frequency; energy-storage fulcrum and coupling bridge.
- **Outer binary** (CFT-exterior role): typically $v < c_f$ with expansion/contraction modes; couples strongly to Noether-Sea gravitational/cosmological response.
At the holographic horizon, the three binaries are treated as a different regime where forward-sector components approach $c_f$ together; in interior AdS-like hypotheses, wake-closure can be described with combined $v_{\text{eff}} > c_f$ without requiring every component speed to exceed $c_f$.

The stronger claim that this architecture supplies the basis for rest mass, proper time, photon behavior, and standard-model particle families remains a theorem burden for the broader causal-closure program.

### Hinge Equation Sketch

**Equation of motion near the hinge ($v \approx c_f$)** For each architrino $i$ interacting with its partner $j$:
$$
\ddot{\mathbf{x}}_i(t)=\mathbf{a}_{i,j}(t;\{t_{p,k}\})+H(s-1)\,\mathbf{a}_{i,i}(t;\{t_{s,m}\})+\mathbf{a}_{\text{ext}}(t),
$$
with delay constraints (causal roots):
$$
\|\mathbf{x}_j(t_{p,k})-\mathbf{x}_i(t)\|=c_f\,(t-t_{p,k}), \quad
\|\mathbf{x}_i(t_{s,m})-\mathbf{x}_i(t)\|=c_f\,(t-t_{s,m}),
$$
and $s=|\mathbf{v}|/c_f$. For symmetric, non-translating circular geometry, the delay angles satisfy
$$
\delta_p=2s\cos(\delta_p/2), \qquad \delta_s=2s\sin(\delta_s/2),
$$
with no self-hit solution for $s\le 1$ and a small-root branch $\tilde{\delta}_s\to 0^+$ for $s>1$. The radial/tangential split then reads
$$
\ddot r-r\dot\theta^2=A_{\text{rad}}(\delta_p,\delta_s), \qquad r\ddot\theta+2\dot r\dot\theta=T(\delta_p,\delta_s).
$$
The symmetry breaking at the hinge is geometric: as $\tilde{\delta}_s\to 0^+$ the self-hit radial factor scales like $1/\sin(\tilde{\delta}_s/2)$, turning on a large outward term while the state remains continuous.

The working guess that the self-hit regime may change the effective action-step scale from $\Delta L_c$ to $2\Delta L_c$ is a theorem burden for the broader causal-closure program. This chapter keeps only the local hinge geometry needed to state the dynamical branch condition.

### Black-Hole Regime Note

The detailed black-hole treatment now lives in [../spacetime/black-holes.md](../spacetime/black-holes.md). For the purposes of this dynamics chapter, only the regime summary is needed:

- at the horizon interface, forward-sector components approach terminal alignment near $c_f$;
- in the interior, maximum-curvature and recycling dynamics dominate;
- outward release may later appear as jets, diffuse outflow, or dark-sector / dark-photon-like channels.

This chapter therefore keeps only the tri-binary regime map and leaves the ontology, recycling logic, and observer-facing strong-field interpretation to the canonical spacetime chapters.

In the tri-binary picture, each Noether core is a nested stack of three coupled binaries whose internal frequencies and radii are locked by self-hit geometry. This chapter uses that mechanism to define the local dynamics and diagnostics. The coarse-grained metric, observer-clock, and strong-field ontology belong to the spacetime chapters and the causal-closure proof synthesis.

For the strong-field continuation of that story, see [Black Holes](../spacetime/black-holes.md) and [Horizon Chirality](../spacetime/horizon-chirality.md).
