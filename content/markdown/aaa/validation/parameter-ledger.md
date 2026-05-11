# Parameter Ledger

This chapter is the canonical bookkeeping page for the symbols that control closure across the current $\mathbb{A}\mathbb{A}\mathbb{A}$ corpus. Its purpose is not to re-derive every quantity. Its purpose is to keep the roles of primitive postulates, geometric closure targets, constitutive coefficients, state variables, and observer-level benchmarks from collapsing into one another.

The central bookkeeping rule is simple: not every symbol that appears in an equation is a free parameter. Some symbols are fixed substrate inputs, some are assembly-dependent outputs, some are constitutive functions of the medium, and some are measured benchmarks that the theory is supposed to recover.

## Purpose

This ledger records, for each recurrent symbol:

- what kind of object it is,
- whether it is currently treated as primitive, derived, or still open,
- which chapter owns its definition,
- and which closure program is responsible for fixing it.

That distinction matters because the corpus currently spans several layers at once:

- substrate dynamics in the Euclidean void,
- assembly geometry and delay-lock structure,
- effective spacetime constitutive maps,
- and observer-level fits to standard benchmarks.

Without a ledger, those layers can silently trade symbols back and forth as if they were interchangeable. They are not.

## Status Classes

Use the following classes consistently.

- **Fundamental parameter:** part of the substrate-level postulate set.
- **Regulator / convention:** introduced for regularization, nondimensionalization, or normalization; not itself an ontological observable.
- **Geometric closure target:** should be fixed by assembly geometry, delay locking, or branch selection.
- **Constitutive closure target:** effective-medium quantity that must be extracted once and then reused across observables.
- **State variable / field:** varies over space, time, or assembly; not a single global fit constant.
- **Observable benchmark:** measured output used to test the closure map.

## Canonical Guardrails

### Field-speed notation

The corpus uses both $v$ and $c_f$ for field speed in different chapters. This ledger treats
$$
c_f
$$
as the canonical symbol for the physical field speed, while $v=1$ or $c_f=1$ denotes a chapter-local nondimensionalization convention.

### Parameter versus field

The following should **not** be treated as free global constants:

- $n(\mathbf{x},t)$,
- $\rho_{\text{core}}(\mathbf{x},t)$,
- $\Phi_{\text{eff}}(\mathbf{x},t)$,
- $c_{\text{eff}}(\mathbf{x})$,
- $\chi_{\text{sea}}(\mathbf{x},t)$,
- $m_{\text{inertial}}(A)$ for a specific assembly $A$.

These are state variables, constitutive fields, or derived outputs. They may be controlled by a smaller parameter set, but they are not themselves independent knobs.

### Benchmark versus postulate

The following observer-level quantities are closure targets, not primitive inputs:

- $e$,
- $h,\hbar$,
- $G$,
- $\gamma_{\text{eff}},\beta_{\text{eff}},\alpha_i$,
- particle masses and electroweak angles.

If the theory must reset them independently for each chapter, parameter closure has failed.

### Naturalness and sensitivity

When a symbol is claimed as a closure output rather than a free fit, use the fine-tuning quotient
$$
\mathrm{FTQ}(p)=
\frac{\Delta p/p}{\Delta \mathrm{obs}/\mathrm{obs}}
$$
as the default sensitivity diagnostic.

Here $\Delta p/p$ is the fractional perturbation of a parameter or closure output, and $\Delta \mathrm{obs}/\mathrm{obs}$ is the resulting fractional perturbation of the observable being tested. Values $\mathrm{FTQ}(p)>10$ should be treated as fine-tuning pressure unless a discrete topology, symmetry, attractor basin, or measured benchmark explains the sensitivity.

Current status:

- $\epsilon=|e|/6$ is treated as a discrete polarity-unit input and an explanatory target, not as a continuous fit.
- $\kappa$ remains to be assessed because its primitive, derived, or normalization-sensitive status is still open.
- $\rho_{\text{core},0}$ and related medium-density normalizations remain naturalness risks until energy shielding and cosmological closure are quantified.

### Regulator versus physical pulse

The wake-width regulator $\eta$ is a computational and analytic regularization, not a claim that causal wakes are fundamentally pulsed. It smooths causal wake surfaces so integrals and simulations can be evaluated with finite resolution. As $\eta\to0$, the intended limit is the continuous path-history law, with each discrete time step in a simulation approximating the contribution from a narrow causal wake surface rather than replacing the underlying continuous emission.

## Layer I: Substrate and Kernel Parameters

These symbols belong to the delayed microscopic law itself.

| ID | Symbol | Class | Current status | Meaning | Primary home |
| --- | --- | --- | --- | --- | --- |
| K1 | $c_f$ | Fundamental parameter | Primitive | field speed of causal wake propagation | [../dynamics/master-equation.md](../dynamics/master-equation.md), [../foundations/absolute-timespace.md](../foundations/absolute-timespace.md) |
| K2 | $\epsilon$ | Fundamental parameter | Primitive | unit architrino charge magnitude, with observer-level charge reconstructed from it | [../assemblies/fermions/quantum-number-mapping.md](../assemblies/fermions/quantum-number-mapping.md), [../interactions/gauge-structure-emergence.md](../interactions/gauge-structure-emergence.md) |
| K3 | $\kappa$ | Fundamental parameter or normalization-sensitive coupling | Open | universal coupling strength in the per-hit acceleration law | [../dynamics/master-equation.md](../dynamics/master-equation.md), [architrino-si-base-units.md](./architrino-si-base-units.md) |
| K4 | $\eta$ | Regulator / convention | Open but non-ontological | mollifier width used to regularize causal wake surfaces for smooth dynamics and numerics | [simulations/action-energy/well-posedness-and-regularization.md](./simulations/action-energy/well-posedness-and-regularization.md), [../dynamics/master-equation.md](../dynamics/master-equation.md) |
| K5 | $Z_e$ | Regulator / convention | Convention, default $Z_e=1$ | coarse-graining / normalization factor in the substrate-to-observer charge map | [../interactions/gauge-structure-emergence.md](../interactions/gauge-structure-emergence.md), [../assemblies/fermions/quantum-number-mapping.md](../assemblies/fermions/quantum-number-mapping.md) |

## Layer II: Assembly-Geometry Closure Targets

These quantities belong to tri-binary architecture, shielding, branch structure, and assembly response.

| ID | Symbol | Class | Current status | Meaning | Primary home |
| --- | --- | --- | --- | --- | --- |
| G1 | $R_{\text{inner}},R_{\text{middle}},R_{\text{outer}}$ | Geometric closure target | Open | characteristic radii of the nested binaries in the Noether core | [../assemblies/noether-core.md](../assemblies/noether-core.md), [../assemblies/noether-core-geometry.md](../assemblies/noether-core-geometry.md), [../dynamics/tri-binary-dynamics.md](../dynamics/tri-binary-dynamics.md) |
| G2 | $\omega_{\text{inner}},\omega_{\text{middle}},\omega_{\text{outer}}$ | Geometric closure target | Open | characteristic binary frequencies associated with the nested radii | [../dynamics/tri-binary-dynamics.md](../dynamics/tri-binary-dynamics.md), [../assemblies/particle-masses.md](../assemblies/particle-masses.md) |
| G3 | $R_{\text{align}}$ | Geometric closure target | Open, conjectural | outer-binary alignment radius in the terminal Planck-alignment map | [../spacetime/mapping-planck-scale.md](../spacetime/mapping-planck-scale.md) |
| G4 | $L_{\text{align}}$ | Geometric closure target | Open, conjectural | action / angular-momentum increment of the aligned terminal mode | [../spacetime/mapping-planck-scale.md](../spacetime/mapping-planck-scale.md) |
| G5 | $\zeta(A)$ | Geometric closure target | Open | shielding or leakage factor of assembly $A$, defined by far-field suppression relative to naive constituent exposure | [../dynamics/energy.md](../dynamics/energy.md), [../assemblies/particle-masses.md](../assemblies/particle-masses.md) |
| G6 | $\alpha$ | Geometric closure target | Open | axial-frame misalignment angle used in the weak-mixing / quark-geometry program | [../assemblies/fermions/weak-mixing-angle.md](../assemblies/fermions/weak-mixing-angle.md) |
| G7 | $\phi_c$ | Geometric closure target | Open | color-sector azimuth selecting the exceptional axial-frame orientation | [../assemblies/fermions/weak-mixing-angle.md](../assemblies/fermions/weak-mixing-angle.md) |

## Layer III: Constitutive Spacetime Parameters

These symbols control the handoff from the Euclidean substrate plus Noether Sea to effective metric language.

| ID | Symbol | Class | Current status | Meaning | Primary home |
| --- | --- | --- | --- | --- | --- |
| C1 | $\rho_{\text{core},0}$ | Constitutive closure target | Open | reference Noether-core density used to normalize the medium | [../spacetime/emergent-metric.md](../spacetime/emergent-metric.md), [../spacetime/proper-time-and-time-dilation.md](../spacetime/proper-time-and-time-dilation.md) |
| C2 | $n(\mathbf{x},t)$ | State variable / field | Derived field | normalized Noether-core density, $n=\rho_{\text{core}}/\rho_{\text{core},0}$ | [../spacetime/emergent-metric.md](../spacetime/emergent-metric.md), [../spacetime/proper-time-and-time-dilation.md](../spacetime/proper-time-and-time-dilation.md) |
| C3 | $\Omega(\mathbf{x}),\xi(\mathbf{x})$ | Constitutive closure target | Open | clock-channel and ruler-channel response functions in the effective metric subclass | [../spacetime/emergent-metric.md](../spacetime/emergent-metric.md), [../spacetime/lorentz-kinematics.md](../spacetime/lorentz-kinematics.md) |
| C4 | $\Phi_{\text{eff}}(\mathbf{x},t)$ | State variable / field | Derived field | constitutive effective potential defined from the clock channel | [../spacetime/emergent-metric.md](../spacetime/emergent-metric.md), [../spacetime/proper-time-and-time-dilation.md](../spacetime/proper-time-and-time-dilation.md) |
| C5 | $c_{\text{eff}}(\mathbf{x})$ | State variable / field | Derived field | effective signal speed in the medium, with $c_{\text{eff}}\to c_f$ in weak homogeneous conditions | [../spacetime/emergent-metric.md](../spacetime/emergent-metric.md), [../spacetime/ppn-parameters.md](../spacetime/ppn-parameters.md) |
| C5a | $\chi_{\text{sea}}(\mathbf{x},t)$ | Derived response field | Derived from $c_{\text{eff}}$ | Noether-Sea delay factor, $\chi_{\text{sea}}=c_f/c_{\text{eff}}$; replaces optical refractive-index notation in Noether-Sea propagation maps | [../spacetime/noether-sea.md](../spacetime/noether-sea.md), [../spacetime/emergent-metric.md](../spacetime/emergent-metric.md), [../spacetime/ppn-parameters.md](../spacetime/ppn-parameters.md) |
| C6 | $\gamma_{\text{eff}}$ | Constitutive closure target with observable meaning | Open | first-order refraction / space-curvature coefficient in the weak-field map | [../spacetime/ppn-parameters.md](../spacetime/ppn-parameters.md) |
| C7 | $C_2$ or $\beta_{\text{eff}}$ | Constitutive closure target with observable meaning | Open | second-order clock-channel nonlinearity entering the $g_{00}$ expansion | [../spacetime/ppn-parameters.md](../spacetime/ppn-parameters.md) |
| C8 | $\Xi_1,\Xi_2,\Xi_3,\Xi_4$ | Constitutive closure target | Open | preferred-frame leakage coefficients in the weak-field constitutive expansion | [../spacetime/ppn-parameters.md](../spacetime/ppn-parameters.md) |
| C9 | $\mathcal{M}_{\text{sea}}^{ab}$ | Constitutive closure target | Open | medium-response tensor that maps shielded internal assembly energy to inertial momentum response, reducing to $h^{ab}/c_{\text{eff}}^2$ in a homogeneous isotropic Noether-Sea cell | [../dynamics/energy.md](../dynamics/energy.md), [../assemblies/particle-masses.md](../assemblies/particle-masses.md) |

## Layer IV: Observer-Level Benchmarks and Derived Outputs

These quantities are where closure is tested. They are not substrate inputs.

| ID | Symbol | Class | Current status | Meaning | Primary home |
| --- | --- | --- | --- | --- | --- |
| O1 | $e$ | Observable benchmark | Derived target | elementary charge reconstructed from substrate charge and normalization map | [../assemblies/fermions/quantum-number-mapping.md](../assemblies/fermions/quantum-number-mapping.md), [../interactions/gauge-structure-emergence.md](../interactions/gauge-structure-emergence.md) |
| O2 | $h,\hbar$ | Observable benchmark / geometric target | Open | action quantum to be related to tri-binary alignment or orbital closure | [../spacetime/mapping-planck-scale.md](../spacetime/mapping-planck-scale.md), [architrino-si-base-units.md](./architrino-si-base-units.md) |
| O3 | $G$ or $G_{\text{eff}}$ | Observable benchmark / constitutive target | Open | effective gravitational coupling emerging from medium compliance and alignment geometry | [../spacetime/mapping-planck-scale.md](../spacetime/mapping-planck-scale.md), [../spacetime/emergent-metric.md](../spacetime/emergent-metric.md) |
| O4 | $m_{\text{inertial}}(A)$ | Derived output | Open | inertial mass of assembly $A$, extracted operationally from shielding and medium response | [../dynamics/energy.md](../dynamics/energy.md), [../assemblies/particle-masses.md](../assemblies/particle-masses.md) |
| O5 | $\theta_W^{\text{bare}}$ and $\theta_W$ | Geometric target / observable benchmark | Open | bare geometric weak-mixing increment and the measured electroweak mixing angle it must eventually inform | [../assemblies/fermions/weak-mixing-angle.md](../assemblies/fermions/weak-mixing-angle.md), [../interactions/gauge-structure-emergence.md](../interactions/gauge-structure-emergence.md) |
| O6 | $(\alpha_1,\alpha_2,\alpha_3)$ | Observable benchmark | Open | standard PPN preferred-frame coefficients derived from $(\Xi_1,\Xi_2,\Xi_3)$ | [../spacetime/ppn-parameters.md](../spacetime/ppn-parameters.md) |

## Canonical Relations

The ledger above is only useful if the interfaces between layers stay explicit. The following relations are the current canonical handoff points in the corpus.

### 1. Microscopic delayed dynamics

The regularized exact law uses the kernel-side set
$$
(c_f,\epsilon,\kappa,\eta).
$$
A representative regularized form is
$$
m_a\ddot{\mathbf{x}}_a(t)=
\sum_b
\kappa\,\sigma_{ab}|q_aq_b|
\int_{-\infty}^{t}\!dt_0\;
\frac{\hat{\mathbf{r}}_{ab}(t;t_0)}{r_{ab}(t;t_0)^2}\,
\delta_\eta\!\big(r_{ab}(t;t_0)-c_f(t-t_0)\big).
$$

This is the substrate-side parameter core. Any exact or numerical closure that changes these symbols chapter by chapter is not a closed theory.

### 2. Charge reconstruction

The current substrate-to-observer charge map is
$$
e = 6\epsilon \sqrt{\kappa c_f}\,Z_e,
$$
with canonical normalization choice
$$
Z_e=1.
$$

This relation is important because it shows that $e$ is not presently a primitive input in the architrino ontology. It is a recovered observer-level benchmark.

### 3. Medium normalization and clock-channel potential

The constitutive spacetime layer uses
$$
\rho_{\text{core}}(\mathbf{x},t)=\rho_{\text{core},0}\,n(\mathbf{x},t),
$$
and
$$
\Phi_{\text{eff}}(\mathbf{x})
=
-c_f^2\ln\!\big(\Omega(\mathbf{x})\xi(\mathbf{x})\big).
$$

This is the cleanest current statement of the medium-to-metric handoff:
$$
(\delta_{ij},n,\chi_{\text{sea}},\Phi_{\text{eff}},\text{stress})
\mapsto
g_{\mu\nu}^{\text{eff}}.
$$

### 4. Weak-field PPN extraction

The observable weak-field coefficients are read from the constitutive map through
$$
\chi_{\text{sea}}(\mathbf{x})
\equiv
\frac{c_f}{c_{\text{eff}}(\mathbf{x})}
=
1-(1+\gamma_{\text{eff}})\frac{\Phi_N(\mathbf{x})}{c_f^2}
+\mathcal{O}\!\left(\frac{\Phi_N^2}{c_f^4}\right),
$$
and
$$
\beta_{\text{eff}}=\frac{1+2C_2}{2}.
$$

Preferred-frame leakage is encoded by
$$
\alpha_1=\Xi_1,\qquad
\alpha_2=\Xi_2,\qquad
\alpha_3=\Xi_1-\Xi_2-\Xi_3.
$$

The zero-leakage closure condition is therefore
$$
\Xi_1=\Xi_2=\Xi_3=\Xi_4=0
\quad\Longleftrightarrow\quad
\alpha_1=\alpha_2=\alpha_3=0.
$$

### 5. Mass map

The current assembly-side inertial map is
$$
m_{\text{inertial}}(A)
\approx
\alpha\,\frac{\zeta(A)\,E_{\text{internal}}(A)}{c_{\text{eff}}^2},
$$
with $\alpha$ fixed once by a reference assembly rather than re-fit separately for each particle.

This relation means that $m_{\text{inertial}}(A)$ is not a primitive parameter. It is an output of shielding, internal energy, and medium response.

In a resolved Noether-Sea environment, this scalar relation is the homogeneous isotropic limit of the tensor response
$$
p_{\text{int}}^a
\approx
\alpha\,\zeta(A)E_{\text{internal}}(A)\,
\mathcal{M}_{\text{sea}}^{ab}V_{\text{cm},b},
\qquad
\mathcal{M}_{\text{sea}}^{ab}
\to
\frac{h^{ab}}{c_{\text{eff}}^2}.
$$

Here $h^{ab}$ is the inverse Euclidean spatial metric on the local substrate slice. The tensor $\mathcal{M}_{\text{sea}}^{ab}$ is not a particle-specific fit parameter. It is a constitutive closure target for the Noether-Sea response map.

### 6. Planck-alignment map

The current Planck-scale program uses the conjectural relations
$$
L_{\text{align}} \stackrel{\text{hyp.}}{\approx} h,
\qquad
2\pi R_{\text{align}} = \ell_P,
$$
and the effective gravity-side alignment estimate
$$
G_{\text{eff}}
\equiv
\frac{R_{\text{align}}^2 c_f^3}{L_{\text{align}}}.
$$

These are not yet closed derivations. They are the current alignment-side targets connecting geometric closure to $(h,G)$.

### 7. Weak-mixing branch structure

The weak-mixing geometry note uses
$$
\sin^2\theta_W^{\text{bare}}=\frac14,
\qquad
\theta_W^{\text{bare}}=30^\circ,
$$
and the discrete axial-frame branch hypothesis
$$
\alpha_n=n\,\theta_W^{\text{bare}}.
$$

This means the present quark-sector use of $\alpha$ is a geometric branch label tied to a candidate bare electroweak increment, not yet a finished derivation of the measured weak angle.

## What Is Not Yet Closed

The current corpus supports the following conservative closure assessment.

### Closed enough to treat as canonical

- $c_f$ is treated consistently as the substrate propagation speed, even when chapters temporarily write $v=1$.
- $\epsilon$ is treated consistently as the unit architrino charge magnitude.
- $\rho_{\text{core},0}$ is the reference density symbol for the spacetime medium.
- $\Phi_{\text{eff}}=-c_f^2\ln(\Omega\xi)$ is the canonical clock-channel potential definition.

### Still genuinely open

- whether $\kappa$ is primitive, derived, or partly a normalization artifact,
- whether $\eta$ should disappear entirely from physical statements after the weak limit is taken,
- the actual tri-binary radii/frequency ladder,
- the shielding map $\zeta(A)$ across the fermion spectrum,
- the medium-response tensor $\mathcal{M}_{\text{sea}}^{ab}$ that turns shielded internal energy into inertial and gradient response,
- the constitutive functions $(\Omega,\xi)$ and the weak-field coefficient set $(\gamma_{\text{eff}},C_2,\Xi_i)$,
- the Planck-alignment identification of $(R_{\text{align}},L_{\text{align}},h,G)$,
- and the reduction of weak-mixing branch labels to a predictive electroweak closure.

## Immediate Parameter-Closure Priorities

The shortest path to a better closure score is:

1. Fix the status of $\kappa$ once, with an explicit statement of what part is physical coupling and what part is absorbed normalization.
2. Derive or numerically extract a reusable constitutive parameterization for $(\Omega,\xi)$, then hold it fixed across redshift, Shapiro delay, lensing, and preferred-frame tests.
3. Replace symbolic shielding language with an operational $\zeta(A)$ extraction protocol and a reusable $\mathcal{M}_{\text{sea}}^{ab}$ response map that can be applied to electron, quark, and neutrino assemblies without redefinition.
4. Decide whether the Planck-alignment map yields $(h,G)$ as true outputs or only as analogy-level scaling relations.
5. Reduce the weak-mixing angle program from discrete branch suggestion to an actual minimization problem for $E_{\text{eff}}(\alpha,\phi_c)$.

## Falsification Gate

Parameter closure fails if any of the following occurs:

- a symbol advertised as fundamental changes meaning across chapters,
- a constitutive coefficient must be re-fit independently for different observable classes,
- a state field such as $n(\mathbf{x},t)$ is implicitly treated as a free global constant to rescue a calculation,
- or observer-level benchmarks such as $e$, $G$, or particle masses are matched only by introducing one-off per-sector normalizations.

In compact form, the closure target is a nonempty shared parameter set
$$
\mathcal{P}_{\text{shared}} \neq \varnothing,
$$
where $\mathcal{P}_{\text{shared}}$ is the common substrate-plus-constitutive set that survives particle, spacetime, and quantum-side tests simultaneously.

## Related Chapters

- [constraint-ledger.md](./constraint-ledger.md)
- [architrino-si-base-units.md](./architrino-si-base-units.md)
- [../dynamics/master-equation.md](../dynamics/master-equation.md)
- [../dynamics/energy.md](../dynamics/energy.md)
- [../spacetime/mapping-planck-scale.md](../spacetime/mapping-planck-scale.md)
- [../spacetime/emergent-metric.md](../spacetime/emergent-metric.md)
- [../spacetime/ppn-parameters.md](../spacetime/ppn-parameters.md)
- [../assemblies/fermions/weak-mixing-angle.md](../assemblies/fermions/weak-mixing-angle.md)
