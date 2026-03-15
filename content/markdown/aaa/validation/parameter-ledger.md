# Parameter Ledger

## Purpose

This chapter is the canonical bookkeeping page for the parameters that appear across the current $\mathbb{A}\mathbb{A}\mathbb{A}$ closure program. Its job is not to re-derive every quantity. Its job is to state:

- which symbols are fundamental,
- which are constitutive or geometric closure targets,
- which are observable-fit coefficients,
- and which chapters are responsible for determining them.

The ledger is therefore the bridge between ontology, dynamics, and validation. It prevents the same symbol from silently changing meaning across chapters.

## Status Classes

Use the following status labels consistently.

- **Fundamental:** part of the substrate-level postulate set.
- **Geometric closure target:** expected to be fixed by assembly geometry or delay-lock dynamics.
- **Constitutive closure target:** effective-medium coefficient that must be extracted from coarse-graining and then held fixed across observables.
- **Observable benchmark:** not fundamental to the theory, but a measured quantity used to calibrate or test the mapping.

## Canonical Parameter Table

| ID | Symbol | Name | Status | Current role | Primary closure home |
| --- | --- | --- | --- | --- | --- |
| A1 | $c_f$ | field speed | Fundamental | speed of causal wake propagation | [foundations/ontology.md](../foundations/ontology.md), [dynamics/master-equation.md](../dynamics/master-equation.md) |
| A2 | $\epsilon$ | architrino charge magnitude | Fundamental | elementary substrate charge with $e = 6\epsilon$ | [assemblies/fermions/quantum-number-mapping.md](../assemblies/fermions/quantum-number-mapping.md) |
| A3 | $\kappa$ | microscopic coupling constant | Geometric closure target | overall strength of the reception law | [dynamics/master-equation.md](../dynamics/master-equation.md), [validation/architrino-si-base-units.md](./architrino-si-base-units.md) |
| A4 | $\eta$ | kernel regularization width | Constitutive closure target | defines the regularized causal kernel used in exact and numerical dynamics | [validation/simulations/action-energy/well-posedness-and-regularization.md](./simulations/action-energy/well-posedness-and-regularization.md) |
| A5 | $s_{\text{core}}$ | pro/anti core orientation sign | Fundamental | matter/antimatter bookkeeping sign for core chirality | [assemblies/fermions/quantum-number-mapping.md](../assemblies/fermions/quantum-number-mapping.md) |
| B1 | $\rho_{\text{core},0}$ | reference Noether-core density | Constitutive closure target | baseline medium density for spacetime constitutive maps | [spacetime/emergent-metric.md](../spacetime/emergent-metric.md) |
| B2 | $n(x,t)$ | normalized Noether-core density | Constitutive closure target | $n=\rho_{\text{core}}/\rho_{\text{core},0}$ | [spacetime/emergent-metric.md](../spacetime/emergent-metric.md) |
| B3 | $R_{\text{inner}},R_{\text{middle}},R_{\text{outer}}$ | tri-binary radii | Geometric closure target | nested binary scales for clock, spin, and shielding structure | [assemblies/noether-core.md](../assemblies/noether-core.md), [dynamics/tri-binary-dynamics.md](../dynamics/tri-binary-dynamics.md) |
| B4 | $R_{\text{align}}$ | alignment radius | Geometric closure target | event-horizon / Planck-alignment scale | [dynamics/mapping-Planck-scale.md](../dynamics/mapping-Planck-scale.md) |
| C1 | $\Phi_{\text{eff}}$ | constitutive effective potential | Constitutive closure target | clock-channel potential entering the metric map | [spacetime/emergent-metric.md](../spacetime/emergent-metric.md) |
| C2 | $\Omega,\xi$ | metric constitutive factors | Constitutive closure target | observer-level clock and ruler response functions | [spacetime/emergent-metric.md](../spacetime/emergent-metric.md) |
| C3 | $\gamma_{\text{eff}},\beta_{\text{eff}},\alpha_i$ | PPN coefficients | Observable benchmark / constitutive outputs | weak-field GR comparison coefficients | [spacetime/ppn-parameters.md](../spacetime/ppn-parameters.md) |
| C4 | $\zeta(A)$ | shielding factor of assembly $A$ | Geometric closure target | ratio of apparent to internal field amplitude | [dynamics/energy.md](../dynamics/energy.md) |
| C5 | $\alpha$ | personality-frame misalignment angle | Geometric closure target | quark electroweak / flavor geometry datum | [assemblies/fermions/weak-mixing-angle.md](../assemblies/fermions/weak-mixing-angle.md) |
| D1 | $e$ | elementary charge | Observable benchmark | recovered via $e = 6\epsilon \sqrt{\kappa c_f}\,Z_e$ | [assemblies/fermions/quantum-number-mapping.md](../assemblies/fermions/quantum-number-mapping.md) |
| D2 | $h,\hbar$ | action quantum | Geometric closure target | alignment / orbital action scale | [dynamics/mapping-Planck-scale.md](../dynamics/mapping-Planck-scale.md), [validation/architrino-si-base-units.md](./architrino-si-base-units.md) |
| D3 | $G$ | effective Newton coupling | Constitutive closure target | medium-compliance parameter in the gravity map | [spacetime/emergent-metric.md](../spacetime/emergent-metric.md), [dynamics/mapping-Planck-scale.md](../dynamics/mapping-Planck-scale.md) |
| D4 | $m_{\text{inertial}}(A)$ | inertial mass of assembly $A$ | Geometric closure target | emergent inertia from shielding and internal energy | [dynamics/energy.md](../dynamics/energy.md), [assemblies/particle-masses.md](../assemblies/particle-masses.md) |

## Canonical Relations

The following relations are the current canonical interfaces between the ledger symbols.

### Substrate charge normalization

$$
e = 6\epsilon \sqrt{\kappa c_f}\,Z_e,
$$

with $Z_e$ the observer-level field-normalization factor used when matching the substrate to canonical kinetic terms.

### Regularized microscopic dynamics

At the exact dynamical level, the regularized force law is represented schematically by
$$
m_a\ddot{\mathbf{x}}_a(t)=
\sum_b
\kappa\,\sigma_{ab}|q_aq_b|
\int_{-\infty}^{t}\!dt_0\;
\frac{\hat{\mathbf{r}}_{ab}(t;t_0)}{r_{ab}(t;t_0)^2}\,
\delta_\eta\!\big(r_{ab}(t;t_0)-c_f(t-t_0)\big).
$$

So $(c_f,\epsilon,\kappa,\eta)$ are the kernel-side parameters that any exact or numerical closure must control.

### Metric constitutive map

For spacetime phenomenology, the canonical constitutive handoff is
$$
(\delta_{ij},n,\Phi_{\text{eff}},\text{stress})\mapsto g_{\mu\nu}^{\text{eff}},
$$
with
$$
\Phi_{\text{eff}}(x)=-c_f^2\ln\!\big(\Omega(x)\xi(x)\big).
$$

The first weak-field expansion is
$$
g^{\text{eff}}_{00}=
-\left(1+\frac{2\Phi_N}{c_f^2}\right)+O(c_f^{-4}),
\qquad
g^{\text{eff}}_{ij}=
\delta_{ij}\left(1-2\gamma_{\text{eff}}\frac{\Phi_N}{c_f^2}\right)+O(c_f^{-4}).
$$

### Emergent inertial mass

The current closure interface for inertia is
$$
m_{\text{inertial}}(A)\approx
\alpha_{\text{mass}}
\frac{\zeta(A)\,E_{\text{internal}}(A)}{c_{\text{eff}}^2},
$$
where the prefactor is to be fixed once by a reference assembly and then carried across the mass map without per-particle retuning.

### Quark electroweak geometry

The quark-sector electroweak closure presently uses
$$
Q=T_3+\frac{Y}{2},
$$
together with the discrete personality-frame datum
$$
\alpha \in \{0,\theta_W^{\text{bare}},2\theta_W^{\text{bare}},\dots\},
\qquad
\sin^2\theta_W^{\text{bare}}=\frac14.
$$

That is not yet a finished derivation of the observed weak angle. It is the current geometric parameterization that must eventually reduce the electroweak sector's fit freedom.

## Closure Rules

A parameter should be considered closed only if it satisfies the rule appropriate to its status class.

### Fundamental

A fundamental quantity is closed when:

- its definition is fixed once,
- it enters every later chapter with the same meaning,
- and no later observable fit is allowed to redefine it.

### Geometric closure target

A geometric quantity is closed when:

- it is computed from assembly geometry or delay-lock conditions,
- the same value or branch assignment is reused across multiple observables,
- and the value is not reset independently per process.

### Constitutive closure target

A constitutive quantity is closed when:

- it is extracted from one medium/observer map,
- then reused across clocks, rulers, signals, and force observables,
- with no observable-specific re-fitting.

### Observable benchmark

An observable benchmark is not itself ontological closure. It is the comparison layer that tests whether the underlying geometric or constitutive parameters are working.

## Immediate Parameter-Closure Priorities

The fastest remaining closure gains from this ledger are:

1. Fix the admissible role of $\kappa$: fundamental constant, derived combination, or normalization artifact.
2. Convert $(\Omega,\xi)$ from symbolic constitutive functions to one reusable parameterization constrained by redshift, Shapiro delay, and light bending together.
3. Replace the current mass-prefactor calibration with one explicit reference prescription that is then held fixed across the charged-lepton ladder.
4. Reduce the weak-mixing parameter $\alpha$ from a candidate branch label to a derived minimum of an effective geometric energy.

## Falsification Gate

Parameter closure fails if either of the following occurs:

- one observable class requires a parameter value outside the uncertainty band demanded by another class,
- or a symbol that was advertised as geometric/constitutive must be re-fit independently in different chapters to preserve agreement.

In shorthand, the parameter program must move toward
$$
\mathcal{P}_{\text{shared}}
\neq
\varnothing,
$$
where $\mathcal{P}_{\text{shared}}$ is the common parameter set that survives the gravity, quantum, and particle-side closure gates simultaneously.

## Related Chapters

- [architrino-si-base-units.md](./architrino-si-base-units.md)
- [constraint-ledger.md](./constraint-ledger.md)
- [../dynamics/energy.md](../dynamics/energy.md)
- [../spacetime/emergent-metric.md](../spacetime/emergent-metric.md)
- [../assemblies/fermions/quantum-number-mapping.md](../assemblies/fermions/quantum-number-mapping.md)
