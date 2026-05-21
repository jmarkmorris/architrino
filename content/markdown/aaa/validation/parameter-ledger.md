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

### CODATA Benchmark Contract

The NIST/CODATA constants tables should be used as a benchmark contract, not as an extra ontology layer. The 2022 CODATA adjustment separates three different kinds of entries:

- exact SI-defining constants, whose numerical values are fixed by unit convention;
- adjusted measured constants, whose quoted standard uncertainties are experimental and theoretical benchmark widths;
- derived conversion factors, whose uncertainty follows from the constants used to construct them.

This distinction controls how residuals are formed. If a candidate closure predicts a measured dimensionless or conversion-independent quantity $X$, compare it to the CODATA value by
$$
Z_X
=
\frac{X_{\mathbb{A}\mathbb{A}\mathbb{A}}-X_{\mathrm{CODATA}}}{u(X_{\mathrm{CODATA}})},
\qquad
\rho_X
=
\frac{X_{\mathbb{A}\mathbb{A}\mathbb{A}}-X_{\mathrm{CODATA}}}{X_{\mathrm{CODATA}}},
$$
where $u(X)$ is the quoted standard uncertainty. If $X$ is exact by SI definition, the residual is not a measurement residual. The closure test is instead whether the same substrate-to-observer unit map recovers the exact convention while also passing the adjusted measured rows that depend on it.

The uncertainty convention is also fixed. A standard uncertainty $u(y)$ is an estimated standard deviation for the result $y$, and the relative standard uncertainty is
$$
u_r(y)=\frac{u(y)}{|y|}
$$
for $y\ne0$. When the quoted distribution is approximately Gaussian, $y\pm u(y)$ is the one-standard-uncertainty comparison interval, not a broad tolerance band to be enlarged after a fit.

Useful 2022 CODATA rows for the current closure stack are:

| Quantity | CODATA 2022 value | Standard uncertainty | Ledger role |
| --- | ---: | ---: | --- |
| $c$ | $299792458\,\mathrm{m\,s^{-1}}$ | exact | SI convention and low-gradient photon-channel benchmark; not primitive ontology unless $c_\gamma\to c_f$ is derived. |
| $h$ | $6.62607015\times10^{-34}\,\mathrm{J\,Hz^{-1}}$ | exact | SI convention and action benchmark; the Planck-alignment program must recover the action scale rather than fit it. |
| $\hbar$ | $1.054571817\ldots\times10^{-34}\,\mathrm{J\,s}$ | exact | Radian-normalized action benchmark derived from $h/(2\pi)$ in SI units. |
| $e$ | $1.602176634\times10^{-19}\,\mathrm{C}$ | exact | Observer-level electric-charge convention; substrate polarity bookkeeping still uses $\epsilon$ and the charge-reconstruction map. |
| $k_B$ | $1.380649\times10^{-23}\,\mathrm{J\,K^{-1}}$ | exact | Thermodynamic unit convention; Noether-Sea thermodynamics must recover the energy-temperature map. |
| $N_A$ | $6.02214076\times10^{23}\,\mathrm{mol^{-1}}$ | exact | Counting convention, not a substrate particle number. |
| $\alpha$ | $7.2973525643\times10^{-3}$ | $1.1\times10^{-12}$ | Dimensionless electromagnetic benchmark; strong test of any charge/action/signal-speed closure. |
| $\alpha^{-1}$ | $137.035999177$ | $2.1\times10^{-8}$ | Same benchmark in inverse form; do not count both as independent residuals. |
| $G$ | $6.67430\times10^{-11}\,\mathrm{m^3\,kg^{-1}\,s^{-2}}$ | $1.5\times10^{-15}\,\mathrm{m^3\,kg^{-1}\,s^{-2}}$ | Gravity-side benchmark with comparatively weak relative uncertainty $u_r\approx2.25\times10^{-5}$. |
| $m_e c^2$ | $0.51099895069\,\mathrm{MeV}$ | $1.6\times10^{-10}\,\mathrm{MeV}$ | Mass-map benchmark after $A_0$, shielding, and response-map extraction; not an input. |
| $m_p c^2$ | $938.27208943\,\mathrm{MeV}$ | $2.9\times10^{-7}\,\mathrm{MeV}$ | Hadronic mass benchmark after confinement and residual-strong closure. |
| $m_n c^2$ | $939.56542194\,\mathrm{MeV}$ | $4.8\times10^{-7}\,\mathrm{MeV}$ | Neutron/proton split benchmark; tests hadronic plus electromagnetic and weak-stability bookkeeping. |
| $m_\mu c^2$ | $105.6583755\,\mathrm{MeV}$ | $2.3\times10^{-6}\,\mathrm{MeV}$ | Charged-lepton hierarchy benchmark after the first mass map exists. |
| $m_p/m_e$ | $1836.152673426$ | $3.2\times10^{-8}$ | Dimensionless mass-ratio benchmark for hierarchy closure. |
| $u$ | $1.66053906892\times10^{-27}\,\mathrm{kg}$ | $5.2\times10^{-37}\,\mathrm{kg}$ | Atomic-mass conversion benchmark for nuclear and chemistry-facing rows. |
| $R_\infty$ | $10973731.568157\,\mathrm{m^{-1}}$ | $1.2\times10^{-5}\,\mathrm{m^{-1}}$ | Spectral benchmark binding $m_e$, $\alpha$, $h$, and $c$ in the hydrogen/atomic closure stack. |
| $\ell_P$ | $1.616255\times10^{-35}\,\mathrm{m}$ | $1.8\times10^{-40}\,\mathrm{m}$ | Derived Planck-unit comparison dominated by $G$ uncertainty; not independent of $h,c,G$. |
| $m_P$ | $2.176434\times10^{-8}\,\mathrm{kg}$ | $2.4\times10^{-13}\,\mathrm{kg}$ | Derived Planck-unit comparison dominated by $G$ uncertainty; not an extra fitted mass. |
| $t_P$ | $5.391247\times10^{-44}\,\mathrm{s}$ | $6.0\times10^{-49}\,\mathrm{s}$ | Derived Planck-time comparison dominated by $G$ uncertainty; use only after the alignment map declares its SI conversion. |

The most important mining consequence is procedural: exact rows such as $h$, $e$, $k_B$, and $c$ are not easier physical targets because their listed uncertainty is zero. They are exact in SI because the units are defined through them. The physical pressure comes from the adjusted and dimensionless rows, especially $\alpha$, $m_p/m_e$, $R_\infty$, particle mass-energy equivalents, and $G$.

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
| K2 | $\epsilon$ | Fundamental parameter | Primitive | potential polarity-unit magnitude, with observer-level electric charge reconstructed from it | [../assemblies/fermions/quantum-number-mapping.md](../assemblies/fermions/quantum-number-mapping.md), [../interactions/gauge-structure-emergence.md](../interactions/gauge-structure-emergence.md) |
| K3 | $\kappa$ | Fundamental parameter or normalization-sensitive coupling | Open | universal coupling strength in the per-hit acceleration law | [../dynamics/master-equation.md](../dynamics/master-equation.md), [architrino-si-base-units.md](./architrino-si-base-units.md) |
| K4 | $\eta$ | Regulator / convention | Open but non-ontological | mollifier width used to regularize causal wake surfaces for smooth dynamics and numerics | [simulations/action-energy/well-posedness-and-regularization.md](./simulations/action-energy/well-posedness-and-regularization.md), [../dynamics/master-equation.md](../dynamics/master-equation.md) |
| K5 | $Z_e$ | Regulator / convention | Convention, default $Z_e=1$ | coarse-graining / normalization factor in the substrate-to-observer charge map | [../interactions/gauge-structure-emergence.md](../interactions/gauge-structure-emergence.md), [../assemblies/fermions/quantum-number-mapping.md](../assemblies/fermions/quantum-number-mapping.md) |

## Layer II: Assembly-Geometry Closure Targets

These quantities belong to tri-binary architecture, shielding, branch structure, and assembly response.

| ID | Symbol | Class | Current status | Meaning | Primary home |
| --- | --- | --- | --- | --- | --- |
| G0 | $A_0$ | Geometric closure target | Open | calibration-free neutral rest-branch tri-binary Noether-core reference attractor used to derive the first mass-map outputs before particle benchmarks enter | [../assemblies/particle-masses.md](../assemblies/particle-masses.md), [../dynamics/tri-binary-dynamics.md](../dynamics/tri-binary-dynamics.md), [../dynamics/energy.md](../dynamics/energy.md) |
| G0a | $\mathcal{P}_{A_0}$ | Geometric closure target | Open; compact finite-coordinate no-go recorded, branch-chart revision required before Tier 1 continuation | certificate packet tying the finite closure graph $\mathcal{G}_{A_0}$, active root ledger, quotient Floquet gap $\Delta_{\mathbf{k}}$, shielding extraction, and $\mathcal{M}_{\text{sea}}^{ab}$ response probe into one promotion sequence | [simulations/a0-branch-certificate-protocol.md](./simulations/a0-branch-certificate-protocol.md), [simulations/a0-tier0-result-interpretation.md](./simulations/a0-tier0-result-interpretation.md), [../assemblies/particle-masses.md](../assemblies/particle-masses.md) |
| G1 | $R_{\text{inner}},R_{\text{middle}},R_{\text{outer}}$ | Geometric closure target | Open | characteristic radii of the nested binaries in the Noether core | [../spacetime/noether-swarm.md](../spacetime/noether-swarm.md), [../spacetime/noether-core-geometry.md](../spacetime/noether-core-geometry.md), [../dynamics/tri-binary-dynamics.md](../dynamics/tri-binary-dynamics.md) |
| G2 | $\omega_{\text{inner}},\omega_{\text{middle}},\omega_{\text{outer}}$ | Geometric closure target | Open | characteristic binary frequencies associated with the nested radii | [../dynamics/tri-binary-dynamics.md](../dynamics/tri-binary-dynamics.md), [../assemblies/particle-masses.md](../assemblies/particle-masses.md) |
| G3 | $R_{\text{align}}$ | Geometric closure target | Open, conjectural | outer-binary alignment radius in the terminal Planck-alignment map | [../philosophy-history/theory-bridges/planck-scale-tri-binary-alignment.md](../philosophy-history/theory-bridges/planck-scale-tri-binary-alignment.md) |
| G4 | $\mathcal{A}_{\text{align}}^{\text{cycle}}, I_{\text{align}}$ | Geometric closure target | Open, conjectural | closed-cycle action and radian-normalized rotational-action increment of the aligned terminal mode | [../philosophy-history/theory-bridges/planck-scale-tri-binary-alignment.md](../philosophy-history/theory-bridges/planck-scale-tri-binary-alignment.md) |
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
| C5 | $c_{\text{eff}}(\mathbf{x},t)$ | State variable / field | Derived field | Noether-Sea dressed assembly-channel propagation speed used for clock/ruler closure and effective-metric comparisons, with $c_{\text{eff}}\to c_f$ in weak homogeneous conditions; separate from photon-channel speed $c_\gamma$ unless Gate A closes that identification | [../spacetime/emergent-metric.md](../spacetime/emergent-metric.md), [../spacetime/ppn-parameters.md](../spacetime/ppn-parameters.md) |
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
| O2 | $h,\hbar$ | Observable benchmark / geometric target | Open | full-cycle action quantum and radian-normalized angular-momentum quantum to be related to tri-binary alignment, orbital closure, and any lower recordable basin-measure scale derived by quantum closure | [../philosophy-history/theory-bridges/angular-momentum-and-spin.md](../philosophy-history/theory-bridges/angular-momentum-and-spin.md), [../philosophy-history/theory-bridges/planck-scale-tri-binary-alignment.md](../philosophy-history/theory-bridges/planck-scale-tri-binary-alignment.md), [architrino-si-base-units.md](./architrino-si-base-units.md) |
| O3 | $G$ or $G_{\text{eff}}$ | Observable benchmark / constitutive target | Open | effective gravitational coupling emerging from medium compliance and alignment geometry | [../philosophy-history/theory-bridges/planck-scale-tri-binary-alignment.md](../philosophy-history/theory-bridges/planck-scale-tri-binary-alignment.md), [../spacetime/emergent-metric.md](../spacetime/emergent-metric.md) |
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
\mathbf{a}_a(t)=
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
|e| = 6\epsilon \sqrt{\kappa c_f}\,Z_e,
$$
with canonical normalization choice
$$
Z_e=1.
$$

This relation is important because it shows that the elementary charge magnitude is not presently a primitive input in the architrino ontology. It is a recovered observer-level benchmark.

This equation is a normalization-sensitive substrate-to-observer reconstruction, not a second primitive definition of $\epsilon$. The primitive polarity convention used by the foundation and mathematics-canon pages is $\epsilon=|e|/6$ after the observer-level electric bookkeeping normalization is fixed. If $\sqrt{\kappa c_f}Z_e\ne1$ in a dimensional convention, that factor belongs to the conversion map rather than to a separate architrino charge ontology. Closing this equivalence remains tied to the K3/K5 normalization problem.

### 3. Medium normalization and clock-channel potential

The constitutive spacetime layer uses
$$
\rho_{\text{core}}(\mathbf{x},t)=\rho_{\text{core},0}\,n(\mathbf{x},t),
$$
and
$$
\Phi_{\text{eff}}(\mathbf{x})
=
c_f^2\ln\!\big(\Omega(\mathbf{x})\xi(\mathbf{x})\big).
$$

Here $\xi$ is the Noether-core envelope shape ratio, while $\Omega\xi$ is the clock-rate factor used by this exponential metric subclass after the geometry-to-clock map is fixed.

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
\alpha_{\mathrm{m}}\,\frac{\zeta(A)\,E_{\text{internal}}(A)}{c_{\text{eff}}^2},
$$
with $\alpha_{\mathrm{m}}$ fixed once by a reference assembly rather than re-fit separately for each particle.

This relation means that $m_{\text{inertial}}(A)$ is not a primitive parameter. It is an output of shielding, internal energy, and medium response.

Notation note: $\alpha_{\mathrm{m}}$ denotes the mass-map normalization; bare $\alpha$ remains reserved for the measured fine-structure benchmark or for a locally declared weak-mixing branch angle, while $\alpha_i$ denotes PPN preferred-frame coefficients.

In a resolved Noether-Sea environment, this scalar relation is the homogeneous isotropic limit of the tensor response
$$
p_{\text{int}}^a
\approx
\alpha_{\mathrm{m}}\,\zeta(A)E_{\text{internal}}(A)\,
\mathcal{M}_{\text{sea}}^{ab}V_{\text{cm},b},
\qquad
\mathcal{M}_{\text{sea}}^{ab}
\to
\frac{h^{ab}}{c_{\text{eff}}^2}.
$$

Here $h^{ab}$ is the inverse Euclidean spatial metric on the local substrate slice. The tensor $\mathcal{M}_{\text{sea}}^{ab}$ is not a particle-specific fit parameter. It is a constitutive closure target for the Noether-Sea response map.

The first closure gate for this relation is the reference attractor $A_0$. It must report geometry, winding, root-ledger, stability, internal-energy, shielding, medium-response, and mass-facing outputs before any observed particle mass or charged-lepton ratio is used as a benchmark. The mass-facing output is the calibration-free combination
$$
\frac{\zeta(A_0)E_{\text{internal}}(A_0)}{E_0},
$$
together with the unresolved constants and response-map assumptions needed to turn that dimensionless coefficient into an observer-level mass prediction.

The current compact finite-coordinate no-go is a status blocker inside $\mathcal{P}_{A_0}$, not an additional free parameter and not a benchmark input. It requires a predeclared branch-chart revision before Tier 1 continuation can be interpreted as progress toward the mass-facing output above.

### 6. Planck-alignment map

The current Planck-scale program uses the conjectural relations
$$
\mathcal{A}_{\text{align}}^{\text{cycle}} \stackrel{\text{hyp.}}{\approx} h,
\qquad
I_{\text{align}} \stackrel{\text{hyp.}}{\approx} \hbar,
\qquad
2\pi R_{\text{align}} = \ell_P,
$$
and the effective gravity-side alignment estimate
$$
G_{\text{eff}}
\equiv
\frac{R_{\text{align}}^2 c_f^3}{\mathcal{A}_{\text{align}}^{\text{cycle}}}.
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
- $\epsilon$ is treated consistently as the potential polarity-unit magnitude.
- $\rho_{\text{core},0}$ is the reference density symbol for the spacetime medium.
- $\Phi_{\text{eff}}=c_f^2\ln(\Omega\xi)$ is the canonical clock-channel potential definition for the exponential metric subclass, with $\xi$ retained as a geometry-first Noether-core shape ratio.

### Still genuinely open

- whether $\kappa$ is primitive, derived, or partly a normalization artifact,
- whether $\eta$ should disappear entirely from physical statements after the weak limit is taken,
- the $A_0$ reference-attractor output packet,
- the actual tri-binary radii/frequency ladder,
- the shielding map $\zeta(A)$ across the fermion spectrum,
- the medium-response tensor $\mathcal{M}_{\text{sea}}^{ab}$ that turns shielded internal energy into inertial and gradient response,
- the constitutive functions $(\Omega,\xi)$ and the weak-field coefficient set $(\gamma_{\text{eff}},C_2,\Xi_i)$,
- the Planck-alignment identification of $(R_{\text{align}},\mathcal{A}_{\text{align}}^{\text{cycle}},I_{\text{align}},h,\hbar,G)$,
- and the reduction of weak-mixing branch labels to a predictive electroweak closure.

## Immediate Parameter-Closure Priorities

The shortest path to a better closure score is:

1. Fix the status of $\kappa$ once, with an explicit statement of what part is physical coupling and what part is absorbed normalization.
2. Derive or numerically extract a reusable constitutive parameterization for $(\Omega,\xi)$, then hold it fixed across redshift, Shapiro delay, lensing, and preferred-frame tests.
3. Resolve the $A_0$ branch-chart revision and accepted branch packet, then replace symbolic shielding language with an operational $\zeta(A)$ extraction protocol and a reusable $\mathcal{M}_{\text{sea}}^{ab}$ response map that can be applied to electron, quark, and neutrino assemblies without redefinition.
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
- [../philosophy-history/theory-bridges/angular-momentum-and-spin.md](../philosophy-history/theory-bridges/angular-momentum-and-spin.md)
- [../philosophy-history/theory-bridges/planck-scale-tri-binary-alignment.md](../philosophy-history/theory-bridges/planck-scale-tri-binary-alignment.md)
- [../spacetime/emergent-metric.md](../spacetime/emergent-metric.md)
- [../spacetime/ppn-parameters.md](../spacetime/ppn-parameters.md)
- [../assemblies/fermions/weak-mixing-angle.md](../assemblies/fermions/weak-mixing-angle.md)
