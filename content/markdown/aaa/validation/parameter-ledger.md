# Parameter Ledger

This chapter is the canonical bookkeeping page for the symbols that control closure across the $\mathbb{A}\mathbb{A}\mathbb{A}$ corpus. Its purpose is not to re-derive every quantity. Its purpose is to keep the roles of primitive postulates, geometric closure targets, constitutive coefficients, state variables, and observer-level benchmarks from collapsing into one another.

An architrino is a polarity-bearing point transceiver whose emitted causal wake reaches other events after a propagation delay. An assembly is a candidate organized set of architrino histories; the Noether sea is the ambient assembly population whose collective response is intended to produce effective clock, ruler, and signal behavior. A constitutive map relates that population's state to those responses. The ledger distinguishes definitions and conditional maps from quantities actually derived from retained dynamics.

The central bookkeeping rule is simple: not every symbol that appears in an equation is a free parameter. Some symbols are fixed substrate inputs, some are assembly-dependent outputs, some are constitutive functions of the Noether sea, and some are measured benchmarks that the theory is supposed to recover.

## Purpose

This ledger records, for each recurrent symbol:

- what kind of object it is,
- whether it is treated as primitive, derived, or still open,
- which chapter owns its definition,
- and which closure program is responsible for fixing it.

That distinction matters because the corpus spans several layers at once:

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

The canonical symbol for wake speed is
$$
c_f
$$

[View →](../../../../equation-mapping.html#corpus-equation-fd14eacc9dd4bd4a)

Numerical instantiations use $c_f=1$; a generic velocity symbol such as $v$ denotes a separately defined motion and must not replace it.

### Parameter versus field

The following should **not** be treated as free global constants:

- $n(\mathbf X,T)$,
- $\rho_{\text{NS}}(\mathbf X,T)$,
- $\Phi_{\text{eff}}(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})$,
- $c_{\text{eff}}(\mathbf X,T)$,
- $\chi_{\text{sea}}(\mathbf X,T)$,
- $m_{\text{inertial}}(A)$ for a specific assembly $A$.

These are state variables, constitutive fields, or derived outputs. They may be controlled by a smaller parameter set, but they are not themselves independent parameters.

### Benchmark versus postulate

The following observer-level quantities are closure targets, not primitive inputs:

- $e$,
- $h,\hbar$,
- $G$,
- $\gamma_{\mathrm{PPN}},\beta_{\mathrm{PPN}},\alpha_i$,
- particle masses and electroweak angles,
- observer-level redshift and expansion summaries such as $Z_X$, $a_{\mathrm{eff}}(t_{\mathrm{eff}})$, $H_{\mathrm{eff}}(t_{\mathrm{eff}})$, and $H_{\mathrm{eff}}$.

If the theory must reset them independently for each chapter, parameter closure has failed.

### Collision-resistant symbol ownership

The same glyph must not silently name unrelated objects inside one validation packet. The canonical disambiguations are:

| Meaning | Canonical notation | Do not reuse as |
| --- | --- | --- |
| Planck action benchmark | $h$ or $\hbar$ | path-history horizon |
| retained history horizon | $H_{\mathrm{hist}}$ | Planck action benchmark |
| effective metric perturbation | $h_{\mu\nu}^{\mathrm{eff}}$ | scalar history step |
| wake or smoothing regulator | $\eta$ with a declared local subscript when needed | baryon-to-photon ratio |
| baryon-to-photon ratio | $\eta_B$ | numerical regulator |
| energy tolerance | $E_{\mathrm{tol}}$ | an energy-drift observable |
| normalized energy-drift observable | $\varepsilon_E^{(\eta)}$ | dimensional energy tolerance |
| physical field speed | $c_f$ | branch speed or generic velocity |

Local loop indices such as $w_a$ are allowed only where their scope is explicit and they cannot be mistaken for an equation-of-state parameter. A packet that needs the cosmological parameter convention must use a descriptive superscript or name rather than relying on context alone.

### CODATA Benchmark Contract

The [NIST/CODATA 2022 constants table](https://physics.nist.gov/cuu/Constants/Table/allascii.txt) supplies observer-level benchmarks. Its entries have three different roles here:

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
\frac{X_{\mathbb{A}\mathbb{A}\mathbb{A}}-X_{\mathrm{CODATA}}}{X_{\mathrm{CODATA}}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-513d15a756279280)

where $u(X)$ is the quoted standard uncertainty. If $X$ is exact by SI definition, the residual is not a measurement residual. The closure test is instead whether the same substrate-to-observer unit map recovers the exact convention while also passing the adjusted measured rows that depend on it.

The displayed $Z_X$ measures discrepancy in units of the benchmark uncertainty; it is a statistical significance only when prediction uncertainty and shared calibration covariance are negligible or explicitly included. For a difference of prediction and benchmark estimates, its variance is the sum of their variances minus twice their covariance. Joint tests must retain correlations between adjusted constants and avoid counting conversions or duplicate forms as independent evidence. A row used to calibrate the unit map cannot also serve as an independent test of that calibration. The fractional residual $\rho_X$ requires a nonzero benchmark, and the uncertainty-normalized residual requires $u(X_{\mathrm{CODATA}})>0$.

The uncertainty convention is also fixed. A standard uncertainty $u(y)$ is an estimated standard deviation for the result $y$, and the relative standard uncertainty is
$$
u_r(y)=\frac{u(y)}{|y|}
$$

[View →](../../../../equation-mapping.html#corpus-equation-f39bec73110a44c8)

for $y\ne0$. When the quoted distribution is approximately Gaussian, $y\pm u(y)$ is the one-standard-uncertainty comparison interval, not a broad tolerance band to be enlarged after a fit.

Useful 2022 CODATA rows for the closure stack are:

| Quantity | CODATA 2022 value | Standard uncertainty | Ledger role |
| --- | ---: | ---: | --- |
| $c$ | $299792458\,\mathrm{m\,s^{-1}}$ | exact | SI convention and low-gradient photon-channel benchmark; not primitive ontology unless $c_\gamma\to c_f$ is derived. |
| $h$ | $6.62607015\times10^{-34}\,\mathrm{J\,Hz^{-1}}$ | exact | SI convention and action benchmark; the Planck-alignment program must recover the action scale rather than fit it. |
| $\hbar$ | $1.054571817\ldots\times10^{-34}\,\mathrm{J\,s}$ | exact | Radian-normalized action benchmark derived from $h/(2\pi)$ in SI units. |
| $e$ | $1.602176634\times10^{-19}\,\mathrm{C}$ | exact | Observer-level electric-charge convention; substrate polarity bookkeeping still uses $\epsilon$ and the charge-reconstruction map. |
| $k_B$ | $1.380649\times10^{-23}\,\mathrm{J\,K^{-1}}$ | exact | Thermodynamic unit convention; Noether sea thermodynamics must recover the energy-temperature map. |
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

Exact rows such as $h$, $e$, $k_B$, and $c$ are exact in SI because the units are defined through them. Physical tests come from adjusted and dimensionless rows, especially $\alpha$, $m_p/m_e$, $R_\infty$, particle mass-energy equivalents, and $G$, after the common unit map and its calibration inputs have been declared. The symbol $u$ in the atomic-mass row denotes the atomic mass constant, distinct from the uncertainty function $u(y)$.

### LHC scalar benchmark contract

The LHC scalar rows are observer-level benchmark rows, not CODATA constants and not substrate inputs. The [ATLAS 2012 discovery report](https://arxiv.org/abs/1207.7214v2) supplies the date-stamped neutral-boson benchmark for the Higgs-sector comparison used by [Particle Masses](../assemblies/particle-masses.md) and [Electroweak Bosons](../assemblies/bosons/electroweak-bosons.md). Its compatibility with a scalar hypothesis is a comparison target, not a spin-zero determination from these rows alone. Recovery must address mass, production-and-branching normalization, channel response, and the source's model-dependent exclusion limits.

| Entry | ATLAS 2012 benchmark | Ledger role |
| --- | ---: | --- |
| $M_H^{\mathrm{ATLAS\,2012}}$ | $126.0\,\mathrm{GeV}$ with $0.4\,\mathrm{GeV}$ statistical and $0.4\,\mathrm{GeV}$ systematic uncertainty | Date-stamped scalar-mass benchmark; not a native scalar-mode identification. |
| $\hat{\mu}_H^{\mathrm{ATLAS\,2012}}$ | $1.4\pm0.3$ | Production-and-branching normalization benchmark near $126\,\mathrm{GeV}$. |
| local discovery significance | $5.9\sigma$ | Discovery-strength record; not an independent residual term unless a likelihood reconstruction declares one. |
| principal channels | $ZZ^{(*)}\to4\ell$, $\gamma\gamma$, $WW^{(*)}\to\ell\nu\ell\nu$ | The first two reconstruct invariant mass with high resolution; the neutrinos make the listed $WW$ channel a lower-resolution comparison. This is not the full combined channel inventory. |

For the ATLAS 2012 row, an approximate scalar comparison combines the quoted statistical and systematic mass widths in quadrature, assuming independent contributions:
$$
M_H^{\mathrm{ledger}}=126.0\,\mathrm{GeV},
\qquad
\sigma_H^{\mathrm{ledger}}
=
\sqrt{0.4^2+0.4^2}\,\mathrm{GeV},
\qquad
\mu_H^{\mathrm{ledger}}=1.4,
\qquad
\sigma_{\mu_H}^{\mathrm{ledger}}=0.3
$$

[View →](../../../../equation-mapping.html#corpus-equation-f283da4c13fc3b29)

with the channel set
$$
\mathcal{C}_{H}^{\mathrm{ATLAS\,2012}}
=
\{ZZ^{(*)}\to4\ell,\gamma\gamma,WW^{(*)}\to\ell\nu\ell\nu\}.
$$

[View →](../../../../equation-mapping.html#corpus-equation-797be6d4c83539ce)

The following expression is a schematic discrepancy score, not a reconstructed ATLAS likelihood:
$$
\mathcal{R}_{H,\mathrm{ATLAS\,2012}}(\theta)
=
\left[
\frac{M_H^{\mathrm{breath}}(\theta)-M_H^{\mathrm{ledger}}}
{\sigma_H^{\mathrm{ledger}}}
\right]^2
+
\left[
\frac{\mu_H^{\mathrm{eff}}(\theta)-\mu_H^{\mathrm{ledger}}}
{\sigma_{\mu_H}^{\mathrm{ledger}}}
\right]^2
+
\sum_{c\in\mathcal{C}_{H}^{\mathrm{ATLAS\,2012}}}
\left[
\frac{Z_c^{\mathbb{A}\mathbb{A}\mathbb{A}}(\theta)-Z_c^{\mathrm{ATLAS\,2012}}}
{\sigma_{Z_c}}
\right]^2
+
\mathcal{R}_{\mathrm{excluded\,scalar}}(\theta)
$$

[View →](../../../../equation-mapping.html#corpus-equation-4e92a4c55241055e)

Here $\theta$ is the declared common parameter record, $M_H^{\mathrm{breath}}(\theta)$ is a candidate scalar-mode mass, and $\mu_H^{\mathrm{eff}}(\theta)$ is its predicted production-and-branching normalization relative to the source's Standard Model reference. The superscript does not identify a realized breathing mode. A channel statistic $Z_c$, its width $\sigma_{Z_c}$, and the exclusion contribution $\mathcal{R}_{\mathrm{excluded\,scalar}}$ require an explicit likelihood and detector model before evaluation. Discovery significance is not a Gaussian measurement with an automatically assigned error bar. Combined strength and channel statistics reuse events and correlated nuisance parameters; adding their squares does not create independent evidence. Quantitative acceptance requires a joint likelihood or a justified covariance treatment without double counting, including prediction uncertainty and the source's exclusion assumptions.

The date-stamped row remains a recovery target after branch, energy, exposure, and detector records are fixed independently. It is not a branch-search, shielding, or mass-map input, and no current world-average substitution is made here.

### Naturalness and sensitivity

When a symbol is claimed as a closure output rather than a free fit, use the fine-tuning quotient
$$
\mathrm{FTQ}(p)=
\frac{\Delta p/p}{\Delta \mathrm{obs}/\mathrm{obs}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-3d0c9994146c3809)

as a local inverse-sensitivity diagnostic.

Here $\Delta p/p$ is a declared fractional perturbation and $\Delta \mathrm{obs}/\mathrm{obs}$ is the resulting fractional observable change, with the other independent inputs held fixed. The quotient requires nonzero reference values and nonzero observable change. Its magnitude is the reciprocal of the fractional response: $|\mathrm{FTQ}(p)|<0.1$ means more than tenfold sensitivity, whereas $|\mathrm{FTQ}(p)|>10$ means weak response. These thresholds are heuristic diagnostics, not physical acceptance criteria or proof of fine tuning. For example, a 1% input change producing a 20% output change gives an inverse sensitivity of 0.05. A discrete branch label needs an admissible branch comparison rather than a continuous derivative; a derived output can be perturbed only through admissible underlying inputs. Zero or unresolved response must be reported separately.

Status:

- $\epsilon$ is treated as the discrete primitive polarity-unit magnitude, while the observer-level calibration target is $|e|=6\epsilon$; neither is a continuous per-observable fit.
- $\kappa$ is the universal coupling in the primitive acceleration law. In the bare two-body scale closure below it combines with $c_f$ and $\epsilon$ to set length and time units rather than an independent dimensionless tuning knob, while its primitive, derived, or normalization-sensitive status in the observer-level unit map remains open.
- $\rho_{\text{NS},0}$ and related medium-density normalizations remain naturalness risks until energy shielding and cosmological closure are quantified.

### Regulator versus physical pulse

The wake-width regulator $\eta$ is a computational and analytic regularization, not a claim that causal wakes are fundamentally pulsed. It smooths causal wake surfaces for finite-resolution evaluation. The limit $\eta\to0$ must be established on the declared history domain; it is not guaranteed at a tangent causal root or a coincident position. Wake-surface smoothing alone does not regularize the spatial inverse-square singularity. Numerical time steps approximate continuous path-history interaction and do not define physical emission pulses.

### Layer-I two-body scale closure

The displayed bare two-body kernel has no remaining dimensionless coupling built solely from the following positive dimensional substrate triplet, once a regulator-independent limit has been justified:
$$
(c_f,\kappa,\epsilon)
$$

[View →](../../../../equation-mapping.html#corpus-equation-6762729b0329ae98)

spans the base dimensions $(\mathrm{L},\mathrm{T},\mathrm{Q})$ because
$$
[c_f]=\mathrm{L}\,\mathrm{T}^{-1},
\qquad
[\kappa]=\mathrm{L}^3\,\mathrm{T}^{-2}\,\mathrm{Q}^{-2},
\qquad
[\epsilon]=\mathrm{Q}
$$

[View →](../../../../equation-mapping.html#corpus-equation-91f5f3fec832e76d)

It therefore defines canonical two-body units
$$
Q_*=\epsilon,
\qquad
R_*=\frac{\kappa\epsilon^2}{c_f^2},
\qquad
T_*=\frac{R_*}{c_f}=\frac{\kappa\epsilon^2}{c_f^3}
$$

[View →](../../../../equation-mapping.html#corpus-equation-2b6eafb45d37a37a)

For $\tilde{\mathbf X}=\mathbf X/R_*$, $\tilde T=T/T_*$, and $\tilde q_i=q_i/\epsilon=\pm1$, the causal constraint and bare acceleration law reduce to
$$
\tilde R_{ij}=\tilde T-\tilde T_t
$$

[View →](../../../../equation-mapping.html#corpus-equation-f4ca714a9893ed48)

and
$$
\frac{d^2\tilde{\mathbf X}_i}{d\tilde T^2}
=
\sum_j\sum_{\tilde T_t\in\tilde{\mathcal{C}}_{ij}(\tilde T)}
\sigma_{ij}
\frac{|\tilde q_i\tilde q_j|\,\tilde W_{ij}^{\mathrm{acc}}}
{\tilde R_{ij}^2}
\hat{\mathbf R}_{ij}
$$

[View →](../../../../equation-mapping.html#corpus-equation-ec1cfba383b1b28c)

up to the separately declared regulator ratio $\eta/R_*$ when a mollified surrogate is being used.

This removes a dimensionless coupling from the kernel, not the dimensionless initial-history data. Root multiplicities, branch thresholds, curvature, and residuals can still depend on the retained histories, polarity assignment, boundary conditions, and selected branch. For a fixed branch problem those quantities must be computed from the delayed dynamics; rescaling the dimensional triplet cannot independently tune them. A declared geometric chart alone neither selects a unique history nor certifies a stable maximum-curvature binary.

## Layer I: Substrate and Kernel Parameters

These symbols belong to the delayed microscopic law itself.

| ID | Symbol | Class | Status | Meaning | Primary home |
| --- | --- | --- | --- | --- | --- |
| K1 | $c_f$ | Fundamental parameter | Primitive | field speed of causal wake propagation | [../dynamics/master-equation.md](../dynamics/master-equation.md), [../foundations/absolute-timespace.md](../foundations/absolute-timespace.md) |
| K2 | $\epsilon$ | Fundamental parameter | Primitive | potential polarity-unit magnitude, with observer-level electric charge reconstructed from it | [../assemblies/fermions/quantum-number-mapping.md](../assemblies/fermions/quantum-number-mapping.md), [../assemblies/gauge-structure-emergence.md](../assemblies/gauge-structure-emergence.md) |
| K3 | $\kappa$ | Fundamental parameter or normalization-sensitive coupling | Open as primitive/normalization split; universal in the substrate acceleration law | coupling multiplying $\sigma_{ij}\lvert q_iq_j\rvert W_{ij}^{\mathrm{acc}}/r_{ij}^2$ in the per-hit acceleration law; because a single architrino has no primitive inertial mass, this is not an $F=ma$ coefficient; with $c_f$ and $\epsilon$ it sets the two-body scale $R_*=\kappa\epsilon^2/c_f^2$ rather than a Layer-I dimensionless fit constant; dimensional row $[\kappa]=\mathrm{L}^3\,\mathrm{T}^{-2}\,\mathrm{Q}^{-2}$ | [../dynamics/master-equation.md](../dynamics/master-equation.md), [architrino-si-base-units.md](./architrino-si-base-units.md), [../foundations/architrino.md](../foundations/architrino.md) |
| K4 | $\eta$ | Regulator / convention | Open but non-ontological | mollifier width used to regularize causal wake surfaces for smooth dynamics and numerics | [simulations/action-energy/well-posedness-and-regularization.md](./simulations/action-energy/well-posedness-and-regularization.md), [../dynamics/master-equation.md](../dynamics/master-equation.md) |
| K5 | $Z_e$ | Regulator / convention | Convention, default $Z_e=1$ | charge-map normalization at the observer interface; not an additional microscopic acceleration-law parameter | [../assemblies/gauge-structure-emergence.md](../assemblies/gauge-structure-emergence.md), [../assemblies/fermions/quantum-number-mapping.md](../assemblies/fermions/quantum-number-mapping.md) |

## Layer II: Assembly-Geometry Closure Targets

These quantities belong to Noether braid architecture, shielding, branch structure, and assembly response.

| ID | Symbol | Class | Status | Meaning | Primary home |
| --- | --- | --- | --- | --- | --- |
| G0 | $A_0$ | Geometric closure target | Open | calibration-free neutral rest-branch Noether braid reference attractor used to derive the first mass-map outputs before particle benchmarks enter | [Particle Masses](../assemblies/particle-masses.md), [Coincident-Midpoint Orthogonal-Axis Braid Dynamics](../noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md#zero-axial-offset-three-binary-dynamics-and-interpretation), [Energy](../dynamics/energy.md) |
| G0a | $\mathcal{P}_{A_0}$ | Geometric closure target | Open; proposed certificate, not an established attractor | candidate-specific record relating geometry, causal roots, stability, shielding, and medium response; any negative result applies only to its tested chart and assumptions | [simulations/a0-branch-certificate-protocol.md](./simulations/a0-branch-certificate-protocol.md), [simulations/a0-tier0-result-interpretation.md](./simulations/a0-tier0-result-interpretation.md), [../assemblies/particle-masses.md](../assemblies/particle-masses.md) |
| G1 | $R_1,R_2,R_3$ | Geometric closure target | Open | characteristic radii of the indexed coincident-midpoint orthogonal-axis braid binary rows | [Noether Braid](../noether-braid/noether-braid.md), [Braid Envelope Geometry](../noether-braid/braid-envelope-geometry.md), [Coincident-Midpoint Orthogonal-Axis Braid Dynamics](../noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md#zero-axial-offset-three-binary-dynamics-and-interpretation) |
| G2 | $\omega_1,\omega_2,\omega_3$ | Geometric closure target | Open | characteristic frequencies of the indexed coincident-midpoint orthogonal-axis braid binaries | [Coincident-Midpoint Orthogonal-Axis Braid Dynamics](../noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md#zero-axial-offset-three-binary-dynamics-and-interpretation), [Particle Masses](../assemblies/particle-masses.md) |
| G3 | $R_{\text{align}}$ | Geometric closure target | Open, conjectural | assembly-level alignment radius in the terminal orthogonal-axis three-binary map | [Mapping the Planck Scale to Coincident-Midpoint Orthogonal-Axis Geometry](../philosophy-history/theory-bridges/mapping-planck-scale-to-coincident-midpoint-orthogonal-axis-geometry.md) |
| G4 | $\mathcal{A}_{\text{align}}^{\text{cycle}}, I_{\text{align}}$ | Geometric closure target | Open, conjectural | closed-cycle action and radian-normalized rotational-action increment of the aligned terminal mode | [Mapping the Planck Scale to Coincident-Midpoint Orthogonal-Axis Geometry](../philosophy-history/theory-bridges/mapping-planck-scale-to-coincident-midpoint-orthogonal-axis-geometry.md) |
| G5 | $\zeta(A)$ | Geometric closure target | Open | probe-facing exposure fraction used by the mass map, after separating sea-coupled and unresolved channels; distinct from raw far-field suppression | [../dynamics/energy.md](../dynamics/energy.md), [../assemblies/particle-masses.md](../assemblies/particle-masses.md) |
| G6 | $\alpha$ | Geometric closure target | Open | axial-frame misalignment angle used in the weak-mixing / quark-geometry program | [../assemblies/fermions/weak-mixing-angle.md](../assemblies/fermions/weak-mixing-angle.md) |
| G7 | $\phi_c$ | Geometric closure target | Open | color-sector azimuth selecting the exceptional axial-frame orientation | [../assemblies/fermions/weak-mixing-angle.md](../assemblies/fermions/weak-mixing-angle.md) |

## Layer III: Constitutive Spacetime Parameters

These symbols control the handoff from the Euclidean substrate plus Noether sea to effective metric language.

Here a field marked derived is defined from an admitted state or response map. That status does not establish the underlying population, constitutive law, or numerical field. The substrate-to-observer coordinate map and common clock, ruler, and signal calibration remain required.

| ID | Symbol | Class | Status | Meaning | Primary home |
| --- | --- | --- | --- | --- | --- |
| C1 | $\rho_{\text{NS},0}$ | Constitutive closure target | Open | reference Noether braid density used to normalize the Noether sea | [../spacetime/emergent-metric.md](../spacetime/emergent-metric.md), [../spacetime/proper-time-and-time-dilation.md](../spacetime/proper-time-and-time-dilation.md) |
| C2 | $n(\mathbf X,T)$ | State variable / field | Derived field | normalized Noether braid density, $n=\rho_{\text{NS}}/\rho_{\text{NS},0}$ | [../spacetime/emergent-metric.md](../spacetime/emergent-metric.md), [../spacetime/proper-time-and-time-dilation.md](../spacetime/proper-time-and-time-dilation.md) |
| C3 | $\Omega(x_{\mathrm{eff}}^i),\xi(x_{\mathrm{eff}}^i)$ | Constitutive closure target | Open | conformal response and Noether braid envelope shape ratio in the stated metric subclass; their product supplies the clock-rate factor only after the geometry-to-clock map is fixed | [../spacetime/emergent-metric.md](../spacetime/emergent-metric.md), [../spacetime/lorentz-kinematics.md](../spacetime/lorentz-kinematics.md) |
| C4 | $\Phi_{\text{eff}}(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})$ | State variable / field | Derived field | constitutive effective potential defined from the clock channel | [../spacetime/emergent-metric.md](../spacetime/emergent-metric.md), [../spacetime/proper-time-and-time-dilation.md](../spacetime/proper-time-and-time-dilation.md) |
| C5 | $c_{\text{eff}}(\mathbf X,T)$ | State variable / field | Conditional response field | dressed assembly-channel speed used for clock/ruler and effective-metric comparisons; equality with the wake speed or photon-channel speed $c_\gamma$ requires separate recovery evidence | [../spacetime/emergent-metric.md](../spacetime/emergent-metric.md), [../spacetime/ppn-parameters.md](../spacetime/ppn-parameters.md) |
| C5a | $\chi_{\text{sea}}(\mathbf X,T)$ | Derived response field | Derived from $c_{\text{eff}}$ | Noether sea delay factor, $\chi_{\text{sea}}=c_f/c_{\text{eff}}$; replaces optical refractive-index notation in Noether sea propagation maps | [../spacetime/noether-sea.md](../spacetime/noether-sea.md), [../spacetime/emergent-metric.md](../spacetime/emergent-metric.md), [../spacetime/ppn-parameters.md](../spacetime/ppn-parameters.md) |
| C6 | $\gamma_{\mathrm{PPN}}$ | Constitutive closure target with observable meaning | Open | first-order refraction / space-curvature coefficient in the weak-field map | [../spacetime/ppn-parameters.md](../spacetime/ppn-parameters.md) |
| C7 | $C_2$ or $\beta_{\mathrm{PPN}}$ | Constitutive closure target with observable meaning | Open | second-order clock-channel nonlinearity entering the $g_{00}$ expansion | [../spacetime/ppn-parameters.md](../spacetime/ppn-parameters.md) |
| C8 | $\Xi_1,\Xi_2,\Xi_3,\Xi_4$ | Constitutive closure target | Open | preferred-frame leakage coefficients in the weak-field constitutive expansion | [../spacetime/ppn-parameters.md](../spacetime/ppn-parameters.md) |
| C9 | $\mathcal{M}_{\text{sea}}^{ab}$ | Constitutive closure target | Open | medium-response tensor that maps shielded internal assembly energy to inertial momentum response, reducing to $h^{ab}/c_{\text{eff}}^2$ in a homogeneous isotropic Noether sea cell | [../dynamics/energy.md](../dynamics/energy.md), [../assemblies/particle-masses.md](../assemblies/particle-masses.md) |

## Layer IV: Observer-Level Benchmarks and Derived Outputs

These quantities are where closure is tested. They are not substrate inputs.

| ID | Symbol | Class | Status | Meaning | Primary home |
| --- | --- | --- | --- | --- | --- |
| O1 | $e$ | Observable benchmark | Derived target | elementary charge reconstructed from substrate charge and normalization map | [../assemblies/fermions/quantum-number-mapping.md](../assemblies/fermions/quantum-number-mapping.md), [../assemblies/gauge-structure-emergence.md](../assemblies/gauge-structure-emergence.md) |
| O2 | $h,\hbar$ | Observable benchmark / geometric target | Open | full-cycle action quantum and radian-normalized angular-momentum quantum to be related to orthogonal-axis three-binary alignment, orbital closure, and any lower recordable basin-measure scale derived by quantum closure | [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md), [Mapping the Planck Scale to Coincident-Midpoint Orthogonal-Axis Geometry](../philosophy-history/theory-bridges/mapping-planck-scale-to-coincident-midpoint-orthogonal-axis-geometry.md), [Architrino SI Base Units](./architrino-si-base-units.md) |
| O3 | $G$ or $G_{\text{eff}}$ | Observable benchmark / constitutive target | Open | effective gravitational coupling emerging from medium compliance and alignment geometry | [Mapping the Planck Scale to Coincident-Midpoint Orthogonal-Axis Geometry](../philosophy-history/theory-bridges/mapping-planck-scale-to-coincident-midpoint-orthogonal-axis-geometry.md), [Emergent Metric](../spacetime/emergent-metric.md) |
| O4 | $m_{\text{inertial}}(A)$ | Derived output | Open | inertial mass of assembly $A$, extracted operationally from shielding and medium response | [../dynamics/energy.md](../dynamics/energy.md), [../assemblies/particle-masses.md](../assemblies/particle-masses.md) |
| O5 | $\theta_W^{\text{bare}}$ and $\theta_W$ | Geometric target / observable benchmark | Open | bare geometric weak-mixing increment and the measured electroweak mixing angle it must eventually inform | [../assemblies/fermions/weak-mixing-angle.md](../assemblies/fermions/weak-mixing-angle.md), [../assemblies/gauge-structure-emergence.md](../assemblies/gauge-structure-emergence.md) |
| O6 | $(\alpha_1,\alpha_2,\alpha_3)$ | Observable benchmark | Open | standard PPN preferred-frame coefficients derived from $(\Xi_1,\Xi_2,\Xi_3)$ | [../spacetime/ppn-parameters.md](../spacetime/ppn-parameters.md) |
| O7 | $Z_X^{E\to R}$, $Y_{X,E\to R}$, and $H_{\mathrm{eff},X}$ | Observer-level derived output | Open | total signed photon-frequency transfer, path-history exchange contribution, and inferred redshift-transfer slope for a declared source/receiver record; not primitive expansion parameters | [../cosmology/expansion-mechanism.md](../cosmology/expansion-mechanism.md), [simulations/redshift-budget-toy-model.md](./simulations/redshift-budget-toy-model.md), [reaction-cosmology-provenance-ledger.md](reaction-cosmology-provenance-ledger.md) |
| O8 | $M_H^{\mathrm{ledger}}$, $\mu_H^{\mathrm{ledger}}$, and $Z_c^{\mathrm{ATLAS\,2012}}$ | Observable benchmark | ATLAS 2012 row recorded; Higgs-sector closure open | date-stamped neutral-boson mass, production-and-branching normalization, and channel comparison for Higgs-sector recovery; not branch-search or mass-map input | [../assemblies/particle-masses.md](../assemblies/particle-masses.md), [../assemblies/bosons/electroweak-bosons.md](../assemblies/bosons/electroweak-bosons.md) |

## Canonical Relations

The ledger above is only useful if the interfaces between layers stay explicit. The following relations are canonical handoff points in the corpus.

### 1. Microscopic delayed dynamics

The regularized representation of the microscopic law uses the kernel-side set
$$
(c_f,\epsilon,\kappa,\eta)
$$

[View →](../../../../equation-mapping.html#corpus-equation-dc8084e941317a8f)

A representative regularized form is
$$
\frac{d^2\mathbf X_a}{dT^2}
=
\sum_b
\kappa\,\sigma_{ab}|q_aq_b|
\int_{-\infty}^{T}\!dT_t\;
\frac{\hat{\mathbf R}_{ab}(T;T_t)}{R_{ab}(T;T_t)^2}\,
c_f\,\delta_\eta\!\big(R_{ab}(T;T_t)-c_f(T-T_t)\big)
$$

[View →](../../../../equation-mapping.html#corpus-equation-996e953dc8ddbd9e)

Here $a$ is the receiver, $b$ the transmitter, $\mathbf R_{ab}=\mathbf X_a(T)-\mathbf X_b(T_t)$ the delayed separation, and $\sigma_{ab}=\operatorname{sign}(q_aq_b)$ the polarity sign. The mollifier $\delta_\eta$ is normalized in its length argument and has inverse-length units. The factor $c_f$ gives a dimensionless transmitter-time weight: at a simple causal root the integral collapses to $c_f/|c_f-\hat{\mathbf R}_{ab}\cdot\mathbf V_b(T_t)|$, as in the [Master Equation](../dynamics/master-equation.md). Removing that factor while retaining the stated dimensions of $\kappa$ breaks both units and root normalization. The expression requires admitted histories, positive noncoincident separations, exclusion of instantaneous self-interaction, and controlled convergence of the history integral and regulator limit. A finite history window requires its boundary and omitted-tail treatment to be declared.

### 2. Charge reconstruction

The substrate-to-observer charge bookkeeping map is
$$
|e| = 6\epsilon Z_e
$$

[View →](../../../../equation-mapping.html#corpus-equation-83891c7a130507c1)

with canonical normalization choice
$$
Z_e=1
$$

[View →](../../../../equation-mapping.html#corpus-equation-fbc107b8e0be0ee6)

The elementary charge magnitude is an observer-level recovery target. This bookkeeping equality fixes a normalization; it does not demonstrate its dynamical recovery.

Here $Z_e$ is dimensionless. The coupling $\kappa$ and wake speed $c_f$ do not enter this equality: with the dimensional row for $\kappa$ above, a factor $\sqrt{\kappa c_f}$ would not have charge-conversion units. The equation is therefore an observer bookkeeping normalization, not a second primitive definition of $\epsilon$ and not a dynamical derivation of electric charge. A deeper derivation must explain why the six-site assembly ledger selects $Z_e=1$ without inserting the measured value of $|e|$ into the branch calculation.

### 3. Medium normalization and clock-channel potential

The constitutive spacetime layer uses
$$
\rho_{\text{NS}}(\mathbf X,T)=\rho_{\text{NS},0}\,n(\mathbf X,T)
$$

[View →](../../../../equation-mapping.html#corpus-equation-e6cb05ef8b933aa2)

and
$$
\Phi_{\text{eff}}(x_{\mathrm{eff}}^i)
=
c_0^2\ln\!\big(\Omega(x_{\mathrm{eff}}^i)\xi(x_{\mathrm{eff}}^i)\big)
$$

[View →](../../../../equation-mapping.html#corpus-equation-01d5073d69f34580)

Here $\xi$ is the Noether braid envelope shape ratio, while the positive product $\Omega\xi$ is the clock-rate factor in this static exponential metric subclass after the geometry-to-clock map is fixed. The speed $c_0=c_{\text{eff}}(\infty)$ sets the asymptotic observer calibration, with the reference clock factor normalized to one. A small difference between $c_f$ and $c_0$ is a recovery condition to establish, not a consequence of homogeneity alone.

This is the cleanest statement of the Noether sea-to-metric handoff:
$$
(\delta_{ij},n,\chi_{\text{sea}},\Phi_{\text{eff}},\text{stress})
\mapsto
g_{\mu\nu}^{\text{eff}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-949080302d1377fa)

### 4. Weak-field PPN extraction

The parameterized post-Newtonian (PPN) coefficients describe possible observer-level departures from general relativity in weak gravity. On the stationary, isotropic, zero-shift signal branch of [PPN Parameters](../spacetime/ppn-parameters.md), the normalized delay map is
$$
\bar{\chi}_{\text{sea}}(\mathbf x_{\mathrm{eff}})
\equiv
\frac{c_0}{c_{\text{eff}}(\mathbf x_{\mathrm{eff}})}
=\frac{c_0}{c_f}\chi_{\text{sea}}(\mathbf x_{\mathrm{eff}})
=
1-(1+\gamma_{\mathrm{PPN}})\frac{\Phi_N(\mathbf x_{\mathrm{eff}})}{c_0^2}
+\mathcal{O}\!\left(\frac{\Phi_N^2}{c_0^4}\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-b18b7ff2a38aea93)

Here $\mathbf x_{\mathrm{eff}}$ denotes the effective spatial chart, $\Phi_N$ is the negative Newtonian comparison potential, and the substrate fields are projected into that chart by the declared common response map. The normalized factor tends to one at infinity without assuming $c_0=c_f$.

For the static isolated-source subclass in which the other PPN potentials vanish or already have their general-relativistic coefficients,
$$
\beta_{\mathrm{PPN}}=\frac{1+2C_2}{2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-1d4f4c3826849997)

Here $C_2$ means $C_2^{(U)}$, the quadratic coefficient of the static clock-rate expansion in $U/c_0^2$ with $U=-\Phi_N$. Squaring the clock rate gives the coefficient $1+2C_2$ of $U^2/c_0^4$ in $-g_{00}$. A coefficient extracted in the constitutive potential $-\Phi_{\text{eff}}$ cannot be substituted without the second-order potential conversion.

Preferred-frame leakage is encoded by
$$
\alpha_1=\Xi_1+2\Xi_2,\qquad
\alpha_2=\Xi_2,\qquad
\alpha_3=\Xi_1+\Xi_2-\Xi_3
$$

[View →](../../../../equation-mapping.html#corpus-equation-130d0ee5eb8ed77b)

The three displayed PPN coefficients vanish exactly when
$$
\Xi_1=\Xi_2=\Xi_3=0
\quad\Longleftrightarrow\quad
\alpha_1=\alpha_2=\alpha_3=0
$$

[View →](../../../../equation-mapping.html#corpus-equation-a89e0bc1240ed7ec)

In the same standard PPN gauge and preferred-frame velocity convention, matching the remaining matter-current term requires $\Xi_4=2\alpha_3-\alpha_1=\Xi_1-2\Xi_3$. An independently extracted $\Xi_4$ that violates this relation rejects the reduced dictionary. Thus zero leakage requires the fourth coefficient to vanish as well; observing or defining it without satisfying the consistency relation does not close the map. The other PPN potential coefficients remain separate recovery requirements.

### 5. Mass map

The assembly-side scalar hypothesis for the probe-facing internal-energy contribution is
$$
m_{\text{inertial}}(A)
\approx
\alpha_{\mathrm{m}}\,\frac{\zeta(A)\,E_{\text{internal}}(A)}{c_{\text{eff}}^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-ba82b34369d50270)

with a positive dimensionless $\alpha_{\mathrm{m}}$ fixed once by a reference assembly in a declared weak homogeneous regime. Its universality is a prediction to test on other assemblies.

Here $E_{\text{internal}}(A)$ is a candidate physical energy account with a declared reference, history boundary, and energy-unit conversion. The fraction $\zeta(A)$ is the probe-facing exposure after separating sea-coupled and unresolved contributions, as defined by [Particle Masses](../assemblies/particle-masses.md); raw far-field suppression alone does not supply it. These distinctions prevent counting the same energy twice. Mass remains an assembly-level recovery target until energy, exposure, and medium response have been derived.

Notation note: $\alpha_{\mathrm{m}}$ denotes the mass-map normalization; bare $\alpha$ remains reserved for the measured fine-structure benchmark or for a locally declared weak-mixing branch angle, while $\alpha_i$ denotes PPN preferred-frame coefficients.

For small group velocity relative to the local sea flow, the corresponding tensor response ansatz is
$$
p_{\text{int}}^a
\approx
\alpha_{\mathrm{m}}\,\zeta(A)E_{\text{internal}}(A)\,
\mathcal{M}_{\text{sea}}^{ab}V_{\text{cm},b},
\qquad
\mathcal{M}_{\text{sea}}^{ab}
\to
\frac{h^{ab}}{c_{\text{eff}}^2}
$$

[View →](../../../../equation-mapping.html#corpus-equation-7bf6d5e1a3792c98)

Here $h^{ab}$ is the inverse Euclidean spatial metric, $p_{\text{int}}^a$ the proposed internal-source momentum contribution, and $V_{\text{cm},b}$ the assembly response-center velocity relative to local sea flow; the notation does not assign masses to primitive architrinos. The tensor $\mathcal{M}_{\text{sea}}^{ab}$ has inverse-speed-squared units and is an unresolved constitutive response, with the displayed scalar reduction restricted to the homogeneous isotropic limit.

The first requirement is a retained assembly under the delayed dynamics. The symbol $A_0$ names one proposed neutral reference, not an established attractor or the unique admissible geometry. Using that candidate requires geometry, winding, causal-root, stability, internal-energy, exposure, and medium-response evidence before particle-mass benchmarks enter. Its proposed mass-facing dimensionless output is
$$
\frac{\zeta(A_0)E_{\text{internal}}(A_0)}{E_0}
$$

[View →](../../../../equation-mapping.html#corpus-equation-fe1b1bb03918ffaa)

together with the unresolved constants and response-map assumptions needed for an observer-level prediction. Here $E_0>0$ is a declared energy normalization from the same independent unit map; it cannot be chosen from the mass being predicted. Forming a dimensionless quotient alone does not establish calibration independence.

A negative result for a compact coordinate chart excludes only that chart under its tested assumptions. The linked certificate and interpretation chapters specify candidate tests without establishing an evolved attractor. Any revised chart must declare its assumptions and held-out tests before fitting; coordinate consistency alone supplies no retained history or mass output.

### 6. Planck-alignment map

The Planck-scale program uses the conjectural relations
$$
\mathcal{A}_{\text{align}}^{\text{cycle}} \stackrel{\text{hyp.}}{\approx} h,
\qquad
I_{\text{align}} \stackrel{\text{hyp.}}{\approx} \hbar,
\qquad
2\pi R_{\text{align}} = \ell_P
$$

[View →](../../../../equation-mapping.html#corpus-equation-568a4acff58ea768)

and the effective gravity-side alignment estimate
$$
G_{\text{eff}}
\equiv
\frac{R_{\text{align}}^2 c_f^3}{\mathcal{A}_{\text{align}}^{\text{cycle}}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-d720a95e23e61e03)

These are not yet closed derivations. They are the alignment-side targets connecting geometric closure to $(h,G)$.

The circumference identification also has an unresolved numerical normalization. Using the observer definitions $\ell_P^2=\hbar G/c^3$ and $h=2\pi\hbar$, the displayed hypotheses imply $G_{\text{eff}}/G\approx(c_f/c)^3/(8\pi^3)$. Even after speed matching, this ratio is not one. The formula is retained as a conjectural dimensional estimate; deriving the missing geometric factor or revising the alignment identification is required before it predicts the measured gravitational coupling. The observer definitions serve only as comparison constraints.

### 7. Weak-mixing branch structure

The weak-mixing geometry note uses the following guessed branch-increment hypothesis. Here $\theta_W^{\text{bare}}$ names the candidate geometric increment $\theta_{\mathrm{inc}}$ of that chapter, distinct from its measured electroweak mixing angle; the value in degrees selects the smallest positive representative in the first quadrant:
$$
\sin^2\theta_W^{\text{bare}}=\frac14,
\qquad
\theta_W^{\text{bare}}=30^\circ
$$

[View →](../../../../equation-mapping.html#corpus-equation-cbd33793a8a0a990)

and the discrete axial-frame branch hypothesis
$$
\alpha_n=n\,\theta_W^{\text{bare}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-d3abedfdd180d1fe)

Here $n$ is a discrete branch index local to this equation, not the Noether sea density field, and $\alpha_n$ labels an axial-frame orientation, not the fine-structure benchmark. Neither the increment nor this discrete sequence establishes a retained branch, an energy minimum, or electroweak dressing. Their relation to the measured angle requires the same assembly's neutral-current and charged-current response.

## What Is Not Yet Closed

The corpus supports the following conservative closure assessment.

### Closed enough to treat as canonical

- $c_f$ denotes the substrate wake speed, with $c_f=1$ in numerical instantiations.
- $\epsilon$ denotes the potential polarity-unit magnitude.
- The displayed bare two-body kernel admits the nondimensionalization by $R_*=\kappa\epsilon^2/c_f^2$ and $T_*=R_*/c_f$; dimensionless histories and branch data remain inputs to each well-posed problem.
- $\rho_{\text{NS},0}$ is the reference density symbol for the Noether sea.
- $\Phi_{\text{eff}}=c_0^2\ln(\Omega\xi)$ is the canonical clock-channel potential definition for the exponential metric subclass, with $\xi$ retained as a geometry-first Noether braid shape ratio and $c_0$ marking observer-sector calibration.

### Still genuinely open

- whether $\kappa$ is primitive, derived, or partly a normalization artifact,
- whether $\eta$ should disappear entirely from physical statements after the weak limit is taken,
- whether any specific maximum-curvature binary branch exists and is stable under the full signed-root, finite-window two-body dynamics,
- the $A_0$ reference-attractor output packet,
- the actual indexed coincident-midpoint orthogonal-axis braid radii/frequency record,
- the shielding map $\zeta(A)$ across the fermion spectrum,
- the medium-response tensor $\mathcal{M}_{\text{sea}}^{ab}$ that turns shielded internal energy into inertial and gradient response,
- the constitutive functions $(\Omega,\xi)$ and the weak-field coefficient set $(\gamma_{\mathrm{PPN}},C_2,\Xi_i)$,
- the Planck-alignment identification of $(R_{\text{align}},\mathcal{A}_{\text{align}}^{\text{cycle}},I_{\text{align}},h,\hbar,G)$,
- and the reduction of weak-mixing branch labels to a predictive electroweak closure.

## Immediate Parameter-Closure Priorities

The unresolved derivations follow the dependencies between the layers:

1. Fix the observer-level status of $\kappa$ once, with an explicit statement of what part is physical coupling, what part is absorbed normalization, and how the two-body scale $R_*=\kappa\epsilon^2/c_f^2$ enters the unit map.
2. Derive or numerically extract a reusable constitutive parameterization for $(\Omega,\xi)$, then hold it fixed across redshift, Shapiro delay, lensing, and preferred-frame tests.
3. Establish a retained assembly before extracting probe-facing $\zeta(A)$ and a reusable $\mathcal{M}_{\text{sea}}^{ab}$ response map; $A_0$ is one candidate, and applying that map across particle sectors requires separate response evidence.
4. Decide whether the Planck-alignment map yields $(h,G)$ as true outputs or only as analogy-level scaling relations.
5. Derive the weak-mixing branch selection from delayed dynamics and the observer coupling map. A minimization problem for $E_{\text{eff}}(\alpha,\phi_c)$ is a possible effective description only after that energy function and its relation to the dynamics are established.

## Falsification Gate

Parameter closure fails if any of the following occurs:

- a symbol advertised as fundamental changes meaning across chapters,
- a constitutive coefficient must be re-fit independently for different observable classes,
- a state field such as $n(\mathbf X,T)$ is implicitly treated as a free global constant to rescue a calculation,
- or observer-level benchmarks such as $e$, $G$, or particle masses are matched only by introducing one-off per-sector normalizations.

In compact form, the closure target is a nonempty shared parameter set
$$
\mathcal{P}_{\text{shared}} \neq \varnothing
$$

[View →](../../../../equation-mapping.html#corpus-equation-889bfc545ab9c36b)

where $\mathcal{P}_{\text{shared}}$ is the common substrate-plus-constitutive set that survives particle, spacetime, and quantum-side tests simultaneously.

This condition is a necessary compatibility target for the declared tests, not proof of universal validity or parameter identifiability. State dependence predicted by one fixed constitutive law is legitimate; independent per-observable retuning after seeing residuals is not. An unevaluated comparison leaves compatibility unresolved, whereas an excluded shared set rejects the tested model and domain.

## Sources

- NIST, *CODATA Recommended Values of the Fundamental Physical Constants: 2022*, [complete table](https://physics.nist.gov/cuu/Constants/Table/allascii.txt). Source of the dated values and quoted standard uncertainties; these are observer benchmarks, not substrate premises.
- ATLAS Collaboration, *Observation of a New Particle in the Search for the Standard Model Higgs Boson with the ATLAS Detector at the LHC* (2012), [arXiv:1207.7214v2](https://arxiv.org/abs/1207.7214v2), DOI: 10.1016/j.physletb.2012.08.020. The discovery record supplies the dated mass and strength rows; §§7–9 explain the channel combination, correlations, and different mass resolutions.

## Related Chapters

- [constraint-ledger.md](./constraint-ledger.md)
- [architrino-si-base-units.md](./architrino-si-base-units.md)
- [../dynamics/master-equation.md](../dynamics/master-equation.md)
- [../dynamics/energy.md](../dynamics/energy.md)
- [../philosophy-history/theory-bridges/angular-momentum-and-spin.md](../philosophy-history/theory-bridges/angular-momentum-and-spin.md)
- [Mapping the Planck Scale to Coincident-Midpoint Orthogonal-Axis Geometry](../philosophy-history/theory-bridges/mapping-planck-scale-to-coincident-midpoint-orthogonal-axis-geometry.md)
- [../spacetime/emergent-metric.md](../spacetime/emergent-metric.md)
- [../spacetime/ppn-parameters.md](../spacetime/ppn-parameters.md)
- [../assemblies/fermions/weak-mixing-angle.md](../assemblies/fermions/weak-mixing-angle.md)
