# Validation

## Validation Protocols

Validation connects claims in Architrino Assembly Architecture, $\mathbb{A}\mathbb{A}\mathbb{A}$, to evidence that can support or overturn them. An observer-level record is a physical measurement, such as a frequency ratio or detector count. A native history describes the underlying paths of [architrinos](../../../../markdown/aaa/foundations/architrino.md), the polarity-bearing point entities whose delayed interactions determine acceleration through the [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md). A branch is a specified family of candidate histories. Validation asks whether those histories obey the dynamics and whether their predicted measurements meet the applicable empirical constraints.

A visual resemblance, a deterministic replay, or agreement between two implementations of the same rule is not enough: a correctness claim needs an independent closed form, theorem, analytically known case, or separately authored instrument. A demonstrated contradiction rejects the claim and domain to which it applies. Missing evidence leaves verification incomplete; rejecting a tested candidate does not establish that every admissible branch fails.

The chapter proceeds in scene order from unit and parameter declarations to event provenance, empirical constraints, formal failure logic, no-go results, unresolved tensions, dedicated massive-superposition tests, executable simulation protocols, and the closure scorecard.

### Chapter Map

1. [Architrino and SI Base Units](../../../../markdown/aaa/validation/architrino-si-base-units.md) separates exact SI definitions from adjusted observer benchmarks and declares the unit-map burden.
2. [Parameter Ledger](../../../../markdown/aaa/validation/parameter-ledger.md) owns primitive inputs, conversion conventions, constitutive coefficients, and branch-derived quantities.
3. [Reaction Ledger](../../../../markdown/aaa/validation/reaction-ledger.md) requires constituent, energy, momentum, and channel provenance for reaction records.
4. [Reaction-Cosmology Provenance Ledger](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md) extends the same-record discipline across source loading, thermalization, and cosmological observables.
5. [Constraint Ledger](../../../../markdown/aaa/validation/constraint-ledger.md) records empirical tolerances and the shared records that must satisfy them.
6. [Failure Criteria](../../../../markdown/aaa/validation/failure-criteria.md) defines incompatibility witnesses, promotion conditions, and Not advanced dispositions.
7. [No-Go Theorems](../../../../markdown/aaa/validation/no-go-theorems.md) classifies whether a theorem applies directly, imposes a replacement constraint, or depends on assumptions absent from the substrate theory.
8. [Known Tensions](../../../../markdown/aaa/validation/known-tensions.md) collects unresolved recovery burdens without treating them as solved mechanisms.
9. [Massive-Superposition Gravity](../../../../markdown/aaa/validation/massive-superposition-gravity.md) defines a focused observer-level discriminator for gravity-linked record formation.
10. [Simulation Protocols](../../../../markdown/aaa/validation/simulations/README.md) owns executable packet schemas, convergence tests, negative controls, synthetic observables, and branch-specific fixtures.
11. [Closure Scorecard](../../../../markdown/aaa/validation/closure-scorecard.md) distinguishes validated closure from readiness under its declared assessment rubric. Diagnostics and fixtures can support category-specific readiness credit, but do not by themselves establish recovered coefficients, fixed parameters, or empirical agreement. Adding a document does not automatically change a score.

This map follows the chapter reading order; the linked documents supply the detailed definitions. A residual measures a mismatch between a claim's prediction and its required result, while an acceptance condition specifies how small that mismatch must be and which evidence must accompany it. Definitions of parameters, records, residuals, acceptance conditions, and failure codes belong with their respective subject documents.

### Promotion Standard

A validation claim states its grade, premises, tested domain, and falsifier: the observation or counterexample that would overturn it. A derived claim supplies its reasoning; a measured claim names its instrument and reach; an inferred claim identifies the additional inference; and a guessed claim remains a hypothesis. A mathematical lemma can be established without an observer map, while an instrument check can be established without a physical assembly. Neither result alone establishes an observable or a persistent physical branch.

For a simulation-backed physical recovery claim, the applicable evidence must refer to one declared history, or to a matched family of histories when several preparations or experiments are compared:

- the worldlines, meaning paths parameterized by absolute time, and causal roots, meaning past emission times whose expanding wakes reach a receiver, together with the retained history, boundary conditions, and identities needed to reproduce the result;
- the observer map that turns native quantities into the tested measurement through the declared apparatus, calibration, and reference channel;
- the parameter and unit declarations, tested time window, comparison statistic, uncertainty treatment, and tolerances fixed before evaluating the test result;
- convergence under the relevant temporal, history, regulator, and spatial refinements, with remaining numerical uncertainty small enough to resolve the claimed tolerance;
- an independent correctness reference when correctness is claimed;
- controls that establish the instrument's reach before it is used on the target: a known valid case and a negative control that fails for the intended reason, including a known nonzero signal when a null result is interpreted;
- an explicit verification outcome and the applicable reason or failure code when a required condition cannot be established.

New numerical instantiations use normalized wake-speed units with $c_f=1$, where $c_f$ is the primitive wake propagation speed. The mapping to laboratory units is a separate declaration, not a derivation of a measured constant. An inapplicable check requires a scope reason; an unperformed required check cannot be treated as passed. A finite simulation also declares its spatial domain and history coverage: it does not contain the complete universe state.

Verification is incomplete when a required record or calculation is unavailable, and failed when a completed check supplies a contradiction or a resolved tolerance miss. An unresolved refinement sequence leaves the limit claim incomplete; an established divergent limit refutes a claim requiring that limit. Both incomplete and failed verification leave the dependent claim Not advanced. The [failure criteria](../../../../markdown/aaa/validation/failure-criteria.md) distinguish these dispositions from a proof that no admissible shared record can satisfy the required constraints.

Cross-integrator agreement is implementation-parity evidence. A replay of a saved record proves deterministic reproduction. Neither is an independent oracle for the mathematical rule being implemented.

### Preferred-Frame Leakage as One Protocol Family

The absolute-frame question is one important family inside the broader validation chapter. [Absolute time](../../../../markdown/aaa/foundations/absolute-time.md) supplies a universal ordering parameter, and the [Euclidean void](../../../../markdown/aaa/foundations/euclidean-void.md) supplies fixed three-dimensional geometry. A [Physical Observer](../../../../markdown/aaa/spacetime/observer-framework.md) is an apparatus built from assemblies, accessing measurements through its own clocks, rulers, and signals. Lorentz recovery means deriving the tested special-relativistic comparisons of moving clocks, lengths, and signal timing from those assemblies. Preferred-frame leakage is an observable dependence on motion relative to the substrate rest frame beyond the applicable experimental bound. The [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md) is the ambient population of neutral assemblies; its flow is distinct from the rest frame of the fixed container.

#### Complete-State and Observational Proxies

- **Complete-state diagnostic:** The $\mathbb{U}_{\text{now}}$ universe state includes the histories required for delayed evolution. With transmitter identity, emission times, and sufficiently resolved wake geometry, the diagnostic in [Detecting the Absolute Frame](../../../../markdown/aaa/foundations/detecting-the-absolute-frame.md) reconstructs emission centers and tests their concentricity, meaning whether the centers coincide. Its data assumptions belong to complete-state bookkeeping; they are not supplied by ordinary laboratory measurements.
- **CMB rest-frame proxy:** The cosmic microwave background (CMB) supplies an observer-level radiation-frame comparison through its dipole, the leading opposite-direction temperature variation. Interpreting the dipole-free frame as Noether sea rest is a hypothesis requiring a source, transport, and observer-response map. It identifies neither local sea flow nor the Euclidean-void rest frame by itself; the [CMB frame-consistency discussion](../../../../markdown/aaa/cosmology/CMB.md#cmb-dipole-and-matter-dipole-gate) states the additional burden.
- **Protocol:** Compare synthetic observer records with CMB-frame summaries only through that declared map and its uncertainties. Agreement supports the tested large-scale consistency claim, not an independent measurement of the substrate or sea rest frame.

#### Null Tests for Absolute-Frame Group velocity

- **Protocol:** A Michelson-Morley comparison measures interference between light sent along differently oriented round trips; a resonator comparison measures frequencies selected by physical cavities. Simulate a matched family with a fixed preparation rule, apparatus definition, calibration, and model of nuisance effects such as temperature changes. Declare the apparatus center used to define group velocity, the velocity relative to the Euclidean-void frame, and the local Noether sea flow. Rotations are compared with a physical direction such as nonzero group velocity or medium anisotropy, not with arbitrarily labeled coordinate axes. Different group velocities require a separate boost comparison; a rotation test alone does not cover it.
- **Success criterion:** The declared round-trip phase difference or frequency ratio has no excess orientation or boost dependence beyond the predeclared bound, with numerical and measurement uncertainty resolved. A benchmark must identify the observable, reference channel, experimental source, regime, and uncertainty convention; a bound on inferred propagation anisotropy is not automatically a bound on every frequency record.
- **Mechanism target:** In a homogeneous reference cell, [Lorentz Kinematics](../../../../markdown/aaa/spacetime/lorentz-kinematics.md) requires the longitudinal ruler response relative to its rest reference and the normalized clock-rate response to approach $1/\gamma_{\mathrm{eff}}$. Here $\gamma_{\mathrm{eff}}=(1-\beta_{\mathrm{eff}}^2)^{-1/2}$ and $\beta_{\mathrm{eff}}=v/c_{\mathrm{eff}}$, with $v$ the declared assembly group speed relative to the reference medium and $c_{\mathrm{eff}}$ its dressed clock-and-ruler channel speed, for $0\le v<c_{\mathrm{eff}}$. The clock rate is $d\tau/dt_{\mathrm{eff}}$, where $\tau$ is a physical clock readout and $t_{\mathrm{eff}}$ is the calibrated observer coordinate time. The substrate-to-observer map, rest normalization, and relation of medium flow to the absolute frame must be stated. The same history must also supply photon transport; equality of its speed with $c_{\mathrm{eff}}$ is a recovery condition. These are conditional targets, not deformations inserted into prescribed trajectories as evidence.
- **Failure condition:** A resolved excess residual rejects the proposed hiding mechanism for the tested family and conditions. Missing apparatus response or insufficient sensitivity leaves its verification incomplete. Neither outcome alone proves a universal rejection across untested branches.

#### Precision Atomic Comparison

- **Protocol:** Use the hydrogen $1S$-$2S$ transition, a frequency associated with the ground and first excited S states, as an observer-level recovery target. For matched apparatus histories with different orientations and group velocities, derive its measured frequency relative to a declared reference clock or transition. The hydrogen and reference-channel responses both belong to the prediction; calling the line derived does not supply either response.
- **Success criterion:** The same unit map, photon transport, assembly response, and calibration rule keep the predicted frequency-ratio modulation within the applicable bound. Sidereal variation means modulation over Earth's rotation relative to the stars. The [Constraint Ledger](../../../../markdown/aaa/validation/constraint-ledger.md) routes the comparison, but its generic clock bound is not automatically a hydrogen $1S$-$2S$ limit: the actual reference, source, protocol, and sensitivity must match. A missing channel-specific comparison leaves this test unevaluated.
- **Failure condition:** Independently adjusting sea response, line mapping, or calibration after inspecting each residual is hidden tuning. State changes predicted by one fixed constitutive law, or measured environmental inputs handled by a predeclared nuisance model, are legitimate variations and must retain their provenance. A fit used to set a parameter is reported as calibration, not as independent validation of that parameter's prediction.

### Reading a Null Result

A null result constrains a declared observable map only at demonstrated sensitivity. An instrument that always returns zero also returns a null result, which is why a known nonzero control must establish that the analysis can detect the excluded signal. For statistical records, compare the declared distributions or estimators with their uncertainty treatment: equality of means alone does not establish equality of distributions, and two individual outcomes do not establish either. A central residual near zero with an uncertainty interval wider than the claimed bound does not resolve that bound.

Such a result does not show that the underlying absolute frame is absent. Conversely, naming a Noether sea mechanism does not explain a null result until one common dynamical and calibration account produces the clock, ruler, propagation, and apparatus responses within tolerance across the matched histories. A complete-state reconstruction, an analytical benchmark, a simulation check, and empirical recovery each retain their own scope; none confers the others by implication.

## Architrino SI Base Units

This chapter examines how the International System of Units (SI) interfaces with Architrino Assembly Architecture, $\mathbb{A}\mathbb{A}\mathbb{A}$. It distinguishes choosing the numerical size of a unit from deriving a physical relationship. A theory can predict a ratio of spectral frequencies after its dynamics are fixed; it cannot determine that a human-defined second must contain a particular chosen number of periods.

The substrate consists of architrinos, point entities carrying polarity and interacting through expanding causal wakes determined by their past paths. They move in the Euclidean void, a fixed three-dimensional space, in absolute time $T$. An assembly is an organized collection of architrinos; the Noether sea is the ambient population of neutral assemblies. Physical clocks and rulers are assembly-level instruments whose readings require a map from this substrate description. These distinctions are developed in [Ontology](../../../../markdown/aaa/foundations/ontology.md).

The required parameter, action, mass, scale, and spectroscopy interfaces are developed in [Parameter Ledger](../../../../markdown/aaa/validation/parameter-ledger.md), [Angular Momentum and Spin](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md), [Mapping the Planck Scale](../../../../markdown/aaa/philosophy-history/theory-bridges/mapping-planck-scale-to-coincident-midpoint-orthogonal-axis-geometry.md), [Energy](../../../../markdown/aaa/dynamics/energy.md), [Particle Masses](../../../../markdown/aaa/assemblies/particle-masses.md), and [Atomic Spectra](../../../../markdown/aaa/nuclear-atomic/atomic-spectra.md).

### Executive Summary

The SI revision effective on 20 May 2019 expressed all seven base-unit definitions through seven defining constants and removed the kilogram prototype from the definition of mass. Four units received new defining foundations: the kilogram, ampere, kelvin, and mole. This metrological choice does not assert that all seven constants are ontologically primitive. The $\mathbb{A}\mathbb{A}\mathbb{A}$ task is to derive observable relationships from the substrate and its acceleration law, including its coupling $\kappa$. The relation $\epsilon\leftrightarrow|e|/6$ is an observer-level calibration target. The definitions below follow the BIPM's [SI Brochure](https://www.bipm.org/documents/20126/41483022/SI-Brochure-9.pdf), ninth edition, §2.3.1.

The $\mathbb{A}\mathbb{A}\mathbb{A}$ program can potentially:

1. Derive physical frequency, action, charge, and energy relationships after declaring their conversion to observer units.
2. Distinguish primitive dynamical inputs, assembly outputs, medium-state dependence, and unit conventions.
3. Predict dimensionless relationships using the same dynamics and calibrations across observables.
4. Determine whether fewer independent physical inputs suffice; this does not replace the SI's conventional definitions.

---

### The 2019 SI Revision: What Changed

The **new SI** defines all units via **exact values** of seven constants:

| Constant | Symbol | Exact Value (by definition) | Defines Unit |
|----------|--------|----------------------------|--------------|
| Unperturbed ground-state hyperfine frequency of Cs-133 | $\Delta \nu_{\text{Cs}}$ | 9,192,631,770 Hz | second (s) |
| Speed of light in vacuum | $c$ | 299,792,458 m/s | meter (m) |
| Planck constant | $h$ | $6.62607015 \times 10^{-34}$ J·s | kilogram (kg) |
| Elementary charge | $e$ | $1.602176634 \times 10^{-19}$ C | ampere (A) |
| Boltzmann constant | $k_B$ | $1.380649 \times 10^{-23}$ J/K | kelvin (K) |
| Avogadro constant | $N_A$ | $6.02214076 \times 10^{23}\,\mathrm{mol}^{-1}$ | mole (mol) |
| Luminous efficacy of 540 THz radiation | $K_{\text{cd}}$ | 683 lm/W | candela (cd) |

**Key insight:** These SI rows are definitions, not measurements. Their exactness is a property of the unit system. A physical closure claim still has to recover the observer-level records that make those definitions useful: spectral frequencies, charge inventories, action increments, thermal energy scales, and signal propagation.

#### CODATA 2022 Benchmark Discipline

The 2022 CODATA constants tables add a second layer to the SI discussion. Exact SI-defining constants, adjusted constants, and derived conversion factors should not be mixed as if they carried the same evidential status.

| Class | Examples | How $\mathbb{A}\mathbb{A}\mathbb{A}$ should use it |
| --- | --- | --- |
| Exact SI definitions | $c$, $h$, $e$, $k_B$, $N_A$, $\Delta\nu_{\mathrm{Cs}}$, $K_{\text{cd}}$ | Treat as unit conventions. Test the physical relationships and repeatable realizations that connect clocks, rulers, charges, action records, and thermodynamic records under those conventions. |
| Adjusted dimensionless or near-direct benchmarks | $\alpha$, $\alpha^{-1}$, $m_p/m_e$, magnetic-moment ratios | Use as high-pressure residual rows because they are mostly independent of arbitrary unit scale. |
| Adjusted dimensional benchmarks | $G$, $m_e c^2$, $m_p c^2$, $m_n c^2$, $m_\mu c^2$, $R_\infty$ | Use only after the substrate-to-observer unit map is declared. These rows test mass, gravity, and spectral closure, but they cannot be inserted as primitive inputs. |
| Derived conversion factors | $\ell_P$, $m_P$, $t_P$, electron volt relationships, atomic-mass relationships | Use as consistency checks, not independent constraints, because their uncertainties inherit the constants used to construct them. |

For the stated CODATA 2022 comparison, the fine-structure constant, the dimensionless electromagnetic coupling, is
$$
\alpha=7.2973525643\times10^{-3},
\qquad
u_r(\alpha)\approx1.51\times10^{-10}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6fb75e10f6253f63)

while the Newtonian constant is
$$
G=6.67430\times10^{-11}\,\mathrm{m^3\,kg^{-1}\,s^{-2}},
\qquad
u_r(G)\approx2.25\times10^{-5}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3ba8046cca4fb71f)

Here $u_r(X)=u(X)/|X|$ is relative standard uncertainty and $u(X)$ is the quoted standard uncertainty. The displayed approximations use the rounded uncertainties $u(\alpha)=1.1\times10^{-12}$ and $u(G)=1.5\times10^{-15}\,\mathrm{m^3\,kg^{-1}\,s^{-2}}$ from the [CODATA 2022 table](https://physics.nist.gov/cuu/pdf/wall_2022.pdf). Thus $\alpha$ is a much sharper relative-precision target; $G$ is dimensional and additionally requires a unit map. The Planck length $\ell_P$, mass $m_P$, and time $t_P$ depend on $G$ to powers $1/2$, $-1/2$, and $1/2$. Their relative standard uncertainties are approximately $u_r(G)/2$, since $h$ and $c$ are exact in SI. These derived quantities do not add independent evidence to the constants from which they are calculated.

The standard uncertainty convention matters for scoring. For a measured or adjusted row $X$, use
$$
Z_X
=
\frac{X_{\mathbb{A}\mathbb{A}\mathbb{A}}-X_{\mathrm{CODATA}}}{u(X_{\mathrm{CODATA}})}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8086133e73d9fc7c)

when the same observable and unit map have been specified. This is a residual measured in benchmark uncertainty units, not automatically a statistical significance. It is a standard-score comparison only when prediction uncertainty is negligible and the benchmark was not used to tune the prediction. Otherwise the variance of the difference is $u_{\mathrm{pred}}^2+u_{\mathrm{bench}}^2-2\operatorname{Cov}(X_{\mathrm{pred}},X_{\mathrm{bench}})$, with prediction and benchmark covariance declared; correlated benchmark sets require a joint covariance treatment. For exact SI rows, do not divide by zero uncertainty. Test the adjusted observables under the same unit map instead.

---

### $\mathbb{A}\mathbb{A}\mathbb{A}$: Fundamental Parameters

In this framework, the candidate substrate-level quantities are:

#### Category A: Ontological Substrate

- **Euclidean void**, with its fixed Euclidean metric and no material contents supplied by the container itself
- **Absolute time** $T$ (continuous, oriented parameter)
- **Wake propagation speed** $c_f$ (primitive propagation speed relative to the Euclidean-void rest frame)

#### Category B: Fundamental Entity

- **Architrino polarity-unit magnitude** $\epsilon$, with observer calibration target $|e|=6\epsilon$
- **Causal wake acceleration kernel**, with coupling $\kappa>0$, inverse-square line-of-action weighting, and dimensionless transmitter-side weight $W^{\mathrm{acc}}=c_f/|D_t|$, where $D_t$ measures emission-root transversality. It applies to admitted delayed roots at positive separation; a regularization does not by itself supply physical continuation through coincidence. The [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form) owns that boundary.

#### Category C: Assembly Geometry (Emergent but Calculable)

In this section a coincident-midpoint orthogonal-axis braid is a prescribed six-worldline configuration in three neutral binaries with a common midpoint, zero axial half-separations, mutually orthogonal axes at the declared reference endpoint, and persistent binary indices. Its positive radii and frequencies, phases, and circulation are explicit coordinates. A deformation toward aligned axes requires a declared flattening operator; the label does not establish that such a deformation occurs dynamically. No radius ordering, particle identity, quantization, stability, or persistence follows from the label; the [braid taxonomy](../../../../markdown/aaa/noether-braid/braid-taxonomy.md) distinguishes prescribed coordinates from physical realization.

- **coincident-midpoint orthogonal-axis braid indexed radius tuple** $(R_1,R_2,R_3)$, with no radius order encoded by the indices
- **Candidate maximum-curvature binary radius** $r_{\text{max-curv}}$, defined only if a specified branch and curvature diagnostic select it; super-wake-speed motion alone selects no radius or stable branch
- **Reference Noether braid number density** $\rho_{\text{NS},0}$, with units of inverse volume, used to normalize $n(\mathbf X,T)=\rho_{\text{NS}}(\mathbf X,T)/\rho_{\text{NS},0}$; this is a state normalization, not a universal geometric constant

Masses, effective couplings, and cosmological observables require additional derivations from declared histories and medium conditions through:

- Self-hit dynamics (non-Markovian evolution)
- Assembly existence and stability analysis, followed separately by an action and statistics recovery
- Noether sea coupling (emergent metric, inertia)

#### Primitive-to-Derived Measure Ladder

For the units program, it is useful to distinguish primitive measures from derived ones rather than treating the SI list as a flat catalog.

- **Primitive dynamics and scale conventions:** $c_f$, $\epsilon$, the coupling $\kappa$, absolute time, and the Euclidean metric. The [Parameter Ledger](../../../../markdown/aaa/validation/parameter-ledger.md#layer-i-two-body-scale-closure) gives $[\kappa]=\mathrm L^3\mathrm T^{-2}\mathrm Q^{-2}$ for polarity dimension $\mathrm Q$, so $R_*=\kappa\epsilon^2/c_f^2$ and $T_*=R_*/c_f$ are natural length and time units. These are dimensional scales, not established bound-orbit radii or periods.
- **Conditional assembly measures:** a realized branch can supply dimensionless radii, periods, and specific-action coefficients in those units. Multiplication by a declared conversion $\mu_{\text{arch}}$ supplies conventional mass-based action or energy units without assigning mass to a primitive architrino.
- **Compound measures:** area, volume, velocity ratios, densities, and currents can be expressed in the resulting units. Transport coefficients require constitutive dynamics as well as dimensional bookkeeping.

The dimensionally derived scales fix the units in which a branch problem can be posed; they do not solve that problem. Boundary histories and the Noether sea state remain inputs to any claimed assembly result. All new substrate numerical work uses normalized wake-speed units $c_f=1$. Exact SI values quoted here belong to observer metrology and do not assign an SI numerical value to $c_f$.

---

### Mapping SI Constants to Architrino Physics

#### The Second (Time Unit) — $\Delta \nu_{\text{Cs}}$

**SI Definition:** The second uses the unperturbed ground-state hyperfine transition frequency of caesium-133. Hyperfine splitting is the small separation between atomic energy levels associated with nuclear and electronic magnetic coupling:
$$
1 \text{ s} = \frac{9,192,631,770}{\Delta \nu_{\text{Cs}}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1588e1af2a0e26f2)

**Architrino Interpretation:**

The observer-level magnetic coupling must be recovered from the complete atomic assembly and its environment. A proposed allocation assigns an electronic magnetic-moment contribution to binary 2 near the wake speed and a nuclear contribution to constituent assemblies. No specific evolved Cs source record is supplied here, so this allocation remains a hypothesis. An index does not determine a magnetic moment.

This is an atomic-clock validation target, not a closed spin derivation. The electron magnetic moment, nuclear spin ledger, and hyperfine coupling must inherit [Angular Momentum and Spin](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md), [Atomic Structure](../../../../markdown/aaa/nuclear-atomic/atomic-structure.md), and [Atomic Spectra](../../../../markdown/aaa/nuclear-atomic/atomic-spectra.md) before $\Delta \nu_{\text{Cs}}$ can be claimed from first principles.

**What we must derive:**
$$
\Delta \nu_{\text{Cs}}
\stackrel{\text{target}}{=}
\frac{\widehat{\nu}_{\mathrm{Cs}}(\mathcal H_{\mathrm{Cs}},\theta_{\mathrm{sea}})}{a_{\mathrm{clk}}T_*}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d7d54a608eba2015)

Here $\mathcal H_{\mathrm{Cs}}$ denotes a specified dimensionless atomic path history, $\theta_{\mathrm{sea}}$ its fixed medium conditions, and $\widehat{\nu}_{\mathrm{Cs}}$ the derived number of transition cycles per duration $T_*$. The locally constant clock factor $a_{\mathrm{clk}}=d\tau/dT>0$ converts absolute time to a physical clock readout $\tau$. For a varying clock factor, periods require integrating $d\tau=a_{\mathrm{clk}}(T)\,dT$. Neither the transition frequency nor that clock map is supplied by naming the geometry.

**Challenge:** A derivation must determine:

- The complete electronic magnetic response, rather than one prescribed orbital frequency alone
- The effective coupling between electronic and nuclear assemblies
- The full neutral atom: its 55 electrons and its Cs-133 nucleus containing 55 protons and 78 neutrons

**Pathway:**

1. Specify an atomic candidate and derive its electronic and nuclear response.
2. For a standard circular-current comparison only, a signed effective charge $Q$ moving at angular frequency $\omega_{\mathrm{eff}}$ on radius $r_{\mathrm{eff}}$ has axial moment $\mu_{\mathrm{loop}}=Q\omega_{\mathrm{eff}}r_{\mathrm{eff}}^2/2$: current $Q\omega_{\mathrm{eff}}/(2\pi)$ times loop area $\pi r_{\mathrm{eff}}^2$. A composite moment needs the signed sum of its contributions and the map to these effective variables. The formula does not turn a primitive polarity into a measured magnetic moment.
3. Derive the hyperfine energy separation and its spectral readout under the same action and clock maps.
4. Compare a frequency ratio to another transition after calibration; reproducing the defining Cs number in Cs-defined seconds is not an independent test.

---

#### The Meter (Length Unit) — $c$

**SI Definition:**
$$
1 \mathrm{m} = \frac{c}{299\,792\,458}\,\mathrm{s}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f61b3d6b23fd83d3)

where $c$ is the speed of light.

**Architrino Interpretation:**

The SI constant $c$ belongs to the operational light channel. The substrate has a separately defined wake speed $c_f$. The proposed photon carrier is a coaxial contra-rotating polarity-conjugate planar pair propagating through the Noether sea; its existence and photon behavior require dynamical and observational recovery.

**Conditional photon-channel parameterization:**
$$
c_\gamma(\mathbf X,T)=\frac{c_f}{\chi_\gamma(\mathbf X,T)},
\qquad
\chi_\gamma(\mathbf X,T)=f_\gamma\!\left(\rho_{\text{NS}}(\mathbf X,T),n(\mathbf X,T),\text{Noether sea state}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1a2f168d268128da)

Here $c_\gamma$ is the candidate group speed measured in Euclidean distance per absolute time, and $\chi_\gamma>0$ is a dimensionless response factor. The function $f_\gamma$ is undetermined; density and normalized density are related, not independent inputs. Weak spatial gradients alone do not imply $\chi_\gamma=1$: a spatially constant factor of 2 would still give $c_\gamma=c_f/2$.

If the medium response tends to unity and the clock/ruler maps identify the speed scales, the proposed weak-homogeneous matching is
$$
c_{\mathrm{eff}}=c
\stackrel{\text{target}}{\approx}c_f
$$

[View →](../../../../../equation-mapping.html#corpus-equation-aaa74c94b6bb625d)

Here $c_{\mathrm{eff}}$ denotes the photon speed after mapping to physical clocks and rulers. Locally in one direction, write $dx_{\mathrm{eff}}=b_{\mathrm{rul}}\,dX$ and $d\tau=a_{\mathrm{clk}}\,dT$ with positive ruler and clock factors. Then $c_{\mathrm{eff}}=(b_{\mathrm{rul}}/a_{\mathrm{clk}})c_\gamma$. A comparison of $c$ with $c_f$ therefore requires these factors as well as photon dynamics.

**What we must show:**

- The candidate planar pair exists as an assembly and recovers photon propagation, polarization, and statistics.
- Any photon speed bound follows from its dynamics and the declared response. The parameterization bounds $c_\gamma\le c_f$ only with the additional condition $\chi_\gamma\ge1$.
- Predicted clock and signal comparisons satisfy a specified experiment's observable and uncertainty. Lorentz tests constrain particular orientation, boost, dispersion, or clock effects; an unspecified $10^{-17}$ bound cannot be assigned to $|c/c_f-1|$.

**Candidate deviation channels:**

- In gravitational environments, changes in the Noether sea and clock/ruler maps are candidate sources of altered path bending and travel time. Deriving them requires constitutive response, not density alone.
- Microscopic dispersion is a possible test of a derived medium scale. No equality between that scale and the Planck length, nor any observable Lorentz violation, follows from the unit definitions.

---

#### The Kilogram (Mass Unit) — $h$

**SI Definition:**
$$
1 \text{ kg} = \frac{h}{(6.62607015 \times 10^{-34}) \text{ m}^2 \text{ s}^{-1}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-31393e5ede6a895d)

One realization uses a Kibble balance, which compares mechanical and electrical power. The defining relation is independent of that particular instrument.

**Architrino Interpretation:**

The Planck constant $h$ is the observer-level benchmark for a quantum of **closed-cycle action**. The $\mathbb{A}\mathbb{A}\mathbb{A}$ derivation target is to recover this scale from coincident-midpoint orthogonal-axis braid geometry and the lower recordable basin-measure scale, not to assume it as a primitive input. Because the Master Equation is acceleration-first, a branch calculation first produces a specific-action scale. The optional universal bookkeeping constant $\mu_{\text{arch}}$ converts that scale to action units without assigning primitive mass to an architrino:
$$
\mu_{\text{arch}}I_3
\stackrel{\text{target}}{=}
N_3\hbar=N_3\frac{h}{2\pi}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-781f2ac09c5affe0)

The dimensionally admissible hypothesis is
$$
\hbar
\stackrel{\text{hyp.}}{=}
\mu_{\text{arch}}\,
\frac{\kappa\epsilon^2}{c_f}\,
\mathcal J_3,
\qquad
h = 2\pi\hbar
$$

[View →](../../../../../equation-mapping.html#corpus-equation-30d92a90f0b0e032)

Here $I_3$ is a candidate specific action per radian, with dimensions $\mathrm L^2\mathrm T^{-1}$, and $N_3$ is a proposed nonnegative integer excitation label, distinct from the normalized sea density $n$. The factor $\kappa\epsilon^2/c_f$ has the same specific-action dimensions. In the hypothesis for $\hbar$, $\mathcal J_3$ denotes the dimensionless action increment per excitation; for a state with $N_3$ increments, $I_3=N_3(\kappa\epsilon^2/c_f)\mathcal J_3$. A branch-dependent action value is not automatically a universal quantum.

The conversion $\mu_{\text{arch}}$ has mass dimensions and must be fixed before testing independent action-sensitive observables. Choosing it to match $h$ calibrates the action unit and cannot also count as predicting $h$. The internal label $N_3$ is not the observer-level electron orbital angular momentum quantum number $\ell$ of the hydrogen $1s$ state. The particle assignment and action role remain hypotheses.

**Derivation pathway:**

1. Establish a hydrogen-like assembly record and derive an action functional compatible with its dynamics, including any necessary history and wake-boundary contributions.
2. Define the specific radian action by $I_3=(2\pi)^{-1}\oint p_{\mathrm{sp},3}\,dq_3$ only when a valid reduced canonical description exists; $q_3$ is its generalized coordinate and $p_{\mathrm{sp},3}$ its specific conjugate momentum. Then cycle action is $2\pi\mu_{\text{arch}}I_3$. The condition that it take integer multiples of $h$ is a quantization target, not a consequence of periodic motion or stability.
3. Derive a universal increment $\mathcal J_3$ and test it across independently selected states. Quantum comparison rules can contain boundary or phase offsets; an unqualified integer-cycle formula is not a universal quantum theorem.

**Target relation:**
$$
h
\stackrel{\text{target}}{=}
2\pi\mu_{\text{arch}}
\frac{\kappa\epsilon^2}{c_f}
\mathcal J_3
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5150234f2e692da3)

---

#### The Ampere (Current Unit) — $e$

**SI Definition:**
$$
1 \mathrm{A} = \frac{e}{1.602176634 \times 10^{-19}}\,\mathrm{s}^{-1}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0ea5b1cad3404774)

**Architrino Interpretation:**

The positive elementary charge $e$ sets the SI charge unit. The proposed observer charge calibration is
$$
|e| = 6\epsilon
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2672169532aa37cf)

**What we must explain:**

- Why the proposed polarity inventory maps to the observed charge spectrum under one common calibration.
- Why quark charge assignments are $\pm e/3$ or $\pm2e/3$ within confined systems, while familiar isolated charged particles and ions carry integer multiples of $e$, including multiples greater than one. Fractional quark charges are not a catalog of isolated particles.
- How dynamical binding or suppression excludes stable isolated $e/6$ carriers in the declared observational regime. Integer polarity counting alone permits such a carrier; choosing $e=6\epsilon$ neither establishes the observed spectrum nor derives confinement.

---

#### The Kelvin (Temperature Unit) — $k_B$

**SI Definition:**
$$
1 \text{ K} = \frac{1.380649 \times 10^{-23}}{k_B} \text{ J}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9ebeaf5fc2b28f45)

**Architrino Interpretation:**

Boltzmann's constant $k_B$ is the conversion factor between **energy** and **temperature**. In $\mathbb{A}\mathbb{A}\mathbb{A}$, temperature is not the internal energy of one Noether braid or the total energy stored in the Noether sea. It is an effective ensemble variable admitted when a declared coarse-graining supplies an accessible energy ledger, a measure over retained states, a fixed inventory or access variable, and a local equilibrium or thermalization condition. The general rule is the same-record entropy relation developed in [Entropy](../../../../markdown/aaa/dynamics/entropy.md#temperature-as-a-same-record-ensemble-variable).

**Thermalized-ensemble limit:** In the classical equilibrium comparison, each independent accessible quadratic energy term has the mean
$$
\langle E_{\mathrm{quad},j} \rangle = \frac{1}{2} k_B T_{\mathrm{temp}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-727378deccb8f892)

Here $j$ indexes one quadratic term, not the total kinetic energy of an assembly. The comparison requires a normalizable equilibrium measure and negligible quantum freezing of the selected modes. For a neutral Noether braid assembly in the Noether sea, a six-channel comparison is available only after the three translational and three rotational channels have been shown to be independent accessible thermalized modes. In that special limit,

$$
\langle E_{\mathrm{acc}} \rangle = 3 k_B T_{\mathrm{temp}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7feeee8f66e8b549)

Here $E_{\mathrm{acc}}$ is the sum of those six accessible quadratic terms, measured relative to their reference energy. This is a recovery target, not the general definition of temperature. Configuration energy can contribute to equilibrium thermodynamics when it belongs to the accessible ensemble; only energy excluded by the stated measure or unable to equilibrate within the declared window lies outside this temperature account.

**What we must derive:** The physical energy-temperature relation, under a declared entropy convention, has the effective equilibrium target
$$
k_B T_{\mathrm{temp}}
=
\left[
\left(\frac{\partial S_*}{\partial E_{\mathrm{acc}}}\right)_{\mathcal V,N_{\mathrm{ent}}}
\right]^{-1}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-053769453c128364)

Here $S_*=S/k_B$ is dimensionless entropy, $\mathcal V$ is fixed ensemble volume, and $N_{\mathrm{ent}}$ is fixed accessible entity count; all belong to one declared ensemble. The derivative has inverse-energy units and is assumed nonzero. This relation supplies a thermal energy scale. The exact numerical value assigned to $k_B$ fixes the kelvin convention and cannot be derived from a mass and speed alone: those can produce energy, but contain no independent temperature-unit dimension.

**Pathway:**

1. Derive the effective assembly mass or accessible mode-energy scale from coincident-midpoint orthogonal-axis braid dynamics.
2. Declare the thermalized ensemble window, retained measure, and Noether sea state.
3. Show that the accessible velocity or mode distribution recovers the Maxwell-Boltzmann or equipartition limit inside that window.
4. Relate the distribution width to $k_B T_{\mathrm{temp}}$ while keeping shielded stored energy outside the accessible temperature channel.

**Derivation target:**
$$
\left\langle \|\mathbf v_{\mathrm{eff}}-\mathbf u_{\mathrm{eff}}\|^2\right\rangle
=
\frac{3k_B T_{\mathrm{temp}}}{m_{\mathrm{eff}}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-df39b3f7358076e5)

Here $\mathbf v_{\mathrm{eff}}$ is the assembly velocity and $\mathbf u_{\mathrm{eff}}=\langle\mathbf v_{\mathrm{eff}}\rangle$ the ensemble's mean group velocity in the same observer chart. Subtracting that mean excludes coherent motion from thermal variance. The relation assumes three classical translational quadratic modes with scalar inertia $m_{\mathrm{eff}}>0$, an observer-level effective assembly mass supplied by the same record, not a primitive architrino mass.

---

#### The Mole — $N_A$

**SI Definition:**
$$
1 \mathrm{mol} = \frac{6.02214076 \times 10^{23}}{N_A}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6eb9f380eafc80fe)

**Architrino Interpretation:**

Avogadro's constant converts a dimensionless count of specified entities to amount of substance: $n_{\mathrm{mol}}=N_{\mathrm{ent}}/N_A$. The amount $n_{\mathrm{mol}}$ is distinct from the normalized sea density $n$. A mole of atoms and a mole of molecules contain the same number of their respective specified entities, irrespective of their masses.

**Relation:**
$$
N_A=\frac{M_u}{m_u},
\qquad
m_u=\frac{m({}^{12}\mathrm C)}{12}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4b4a0af04b5029f5)

Here $m_u$ is the unified atomic mass constant, defined from an unbound carbon-12 atom at rest in its ground state, and $M_u=N_A m_u$ is the molar-mass constant. Since $N_A$ is exact but $m_u$ expressed in kilograms is measured, $M_u$ is measured and is no longer exactly $10^{-3}\,\mathrm{kg\,mol^{-1}}$. The ratio above is a conversion identity, not a derivation of $N_A$ from particle masses. The proton mass is not one twelfth of the carbon-12 mass.

**What we must derive:**

- Assembly and atomic masses, including binding contributions, under a fixed mass map. This tests physical mass ratios and molar masses after choosing the mole convention. A proton-mass derivation alone neither fixes the carbon-12 atomic mass nor selects the Avogadro number.

---

#### The Candela (Luminous Intensity) — $K_{\text{cd}}$

**SI Definition:**
$$
1 \mathrm{cd} = \frac{K_{\text{cd}}}{683}\,\mathrm{W\,sr^{-1}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-cf962aafd06dee6e)

**Architrino Interpretation:**

At the defining frequency, $K_{\text{cd}}$ relates radiant intensity, power per solid angle in $\mathrm{W\,sr^{-1}}$, to luminous intensity in candelas. A lumen is $\mathrm{cd\,sr}$; the steradian labels solid angle. Thus a monochromatic radiant intensity of $(1/683)\,\mathrm{W\,sr^{-1}}$ corresponds to one candela.

Radiant power is energy per time, not photons per time. For monochromatic radiation the standard observer-level relation is $P_{\mathrm{rad}}=h\nu\dot N_\gamma$, where $\nu$ is frequency and $\dot N_\gamma$ is the photon count rate. Photon-energy recovery is an additional assembly-level obligation. The SI wavelength at 540 THz is $c/\nu\approx555.17\,\mathrm{nm}$ in vacuum. Photometry uses a standardized visual response; it does not identify the brightness experienced by each individual observer.

**What we can say:**

- Radiation at 540 THz has observer angular frequency $\omega_{\mathrm{eff}}=2\pi\times540\times10^{12}\,\mathrm{rad\,s^{-1}}$. Assigning that frequency to an internal planar-mode phase or a specific binary requires the clock map and a photon derivation.
- A retinal-response explanation would require a separate biological and molecular account; the SI definition does not establish resonant coupling to one selected frequency.
- The exact value 683 fixes a photometric convention with a specified visual-response basis and historical continuity. It is not a new primitive dynamical parameter or a number to derive from braid geometry.

---

### Summary Table: SI Constants vs $\mathbb{A}\mathbb{A}\mathbb{A}$ Parameters

| SI Constant | Status in $\mathbb{A}\mathbb{A}\mathbb{A}$ | Derivation Pathway |
|-------------|-------------------------------|-------------------|
| $\Delta \nu_{\text{Cs}}$ | **Exact second convention; spectral recovery open** | Full atomic response and clock conversion; binary-2 moment allocation remains a hypothesis |
| $c$ | **Exact SI convention; propagation recovery open** | Photon dynamics, $\chi_\gamma$, and clock/ruler maps must jointly recover operational speed |
| $h$ | **Exact action-unit convention; quantization recovery open** | Derive universal action increments and quantum records; the binary-3 allocation remains a hypothesis |
| $e$ | **Exact SI convention; charge-spectrum recovery open** | $e=6\epsilon$ is a calibration target; realized charge inventories require dynamics |
| $k_B$ | **Exact temperature-unit convention** | Derive ensemble thermodynamics and thermal energy scales under that convention |
| $N_A$ | **Exact amount-unit convention** | Converts specified entity count to amount; masses are independent physical targets |
| $K_{\text{cd}}$ | **Exact photometric convention** | Converts reference radiant intensity to luminous intensity; biological response is a separate subject |

---

### Implications: Reducing the SI to Architrino Postulates

Reduction of physical inputs means deriving more independent observables from fewer specified dynamical quantities. It does not mean deriving the arbitrary sizes of the SI units. The relevant dimensional and physical roles are:

#### Candidate Substrate Inputs (Architrino SI)

1. Polarity magnitude $\epsilon$ supplies the substrate polarity unit, subject to a derived observer charge map.
2. Wake speed $c_f$ and coupling $\kappa$ supply the dimensional scales $R_*$ and $T_*$. Their role in the observer map follows the [Parameter Ledger](../../../../markdown/aaa/validation/parameter-ledger.md).
3. Dimensionless radii, action increments, and frequency ratios are prospective branch outputs. They cannot be counted as derived while also chosen freely to fit observations.
4. Neutral-assembly effective mass and medium response are additional outputs to derive. They do not replace $k_B$ or determine the mole convention.

The physical targets are the charge spectrum, operational signal propagation, action increments, thermal response, mass ratios, and spectral ratios. The candidate relation $h \stackrel{\text{target}}{=} 2\pi\mu_{\text{arch}}(\kappa\epsilon^2/c_f)\mathcal J_3$ must distinguish a chosen action calibration from an independently derived increment. Likewise, $\Delta\nu_{\text{Cs}}$ requires a full atomic history and clock conversion, not a geometry label alone.

No count of three or four independent physical parameters is established here. Such a count must include or derive the coupling, constitutive functions, state and boundary conditions, and observer conversions. The dimensional span of $(c_f,\kappa,\epsilon)$ establishes a choice of substrate units, not universal parameter closure.

---

### Closure Priorities

#### Tier 1 (Must Answer)

1. **Derive $h$ from coincident-midpoint orthogonal-axis braid geometry**
   - Establish the proposed binary-3 relation $\mu_{\text{arch}}I_3=N_3\hbar$ with $\mu_{\text{arch}}$ fixed before testing.
   - Compute $\mathcal J_3$ for the hydrogen $1s$ source record.
   - Test the same unit map against adjusted action-sensitive rows such as $\alpha$ and $R_\infty$; the exact SI value of $h$ defines the comparison unit and does not supply a zero-uncertainty physical residual.

2. **Test the photon and observer speed maps**
   - Derive $c_\gamma$, $\chi_\gamma$, and the clock/ruler conversions for one declared medium state.
   - Compare predicted observable deviations with a named experiment and its uncertainty, without assigning a universal Lorentz-test bound to $c/c_f$.

3. **Derive particle masses**
   - Establish an independently supported reference assembly before assigning observed particle masses. The $A_0$ criterion in [Particle Masses](../../../../markdown/aaa/assemblies/particle-masses.md#reference-attractor-gate) describes a required reference-attractor result, not an existing assembly.
   - Derive its internal energy $E_{\text{internal}}(A_0)$, probe-facing exposure fraction $\zeta(A_0)$, and Noether sea response tensor $\mathcal{M}_{\text{sea}}^{ab}$ before using electron, proton, or charged-lepton data as tests.
   - Only after the mass-map gate is fixed, test downstream predictions such as $m_e$, $m_p$, and $m_p/m_e \approx 1836$.

#### Tier 2 (High Priority)

4. **Calculate $\Delta \nu_{\text{Cs}}$ from first principles**
   - Map Cs atomic structure to Noether braid assemblies
   - Derive hyperfine coupling strength
   - Show that the derived clock row is consistent with adjusted atomic benchmarks under the same second realization; $9{,}192{,}631{,}770\,\mathrm{Hz}$ is the exact SI definition, not an independent fitted datum

5. **Derive thermodynamics under the chosen kelvin convention**
   - Calculate neutral Noether braid assembly effective mass
   - Recover the Maxwell-Boltzmann distribution in its classical dilute regime; equilibrium alone does not select it for every ensemble.
   - Recover dimensionless and adjusted thermodynamic benchmark rows under the same temperature map; the exact SI value of $k_B$ fixes the kelvin convention

#### Tier 3 (Refinement)

6. **Map all SM particles to family/member assembly recipes**
   - Create "particle cookbook" (analogous to chemical formulas)
   - Show charge, spin, statistics all emerge from geometry

7. **Explain fine-structure constant $\alpha$**
   - The standard SI electromagnetic relation is $\alpha=e^2/(4\pi\epsilon_0\hbar c)\approx1/137$, where $\epsilon_0$ is vacuum electric permittivity. In the present SI, $e$, $h$, and $c$ are exact while $\epsilon_0$ inherits experimental uncertainty. Calculating $\epsilon_0$ from an input $\alpha$ and substituting it back does not predict $\alpha$.
   - The low-energy benchmark is a declared observer-level anchor, not a primitive substrate constant:
     $$
     \alpha_{\mathrm{ref}}
     =
     \alpha(\mu_{\mathrm{ref}};\theta_{\mathrm{sea}})
     $$

     [View →](../../../../../equation-mapping.html#corpus-equation-3760e7503aee13bf)

     Here $\mu_{\mathrm{ref}}$ is the reference probe energy scale and $\theta_{\mathrm{sea}}$ denotes the fixed Noether sea record for the comparison window. The subscript distinguishes this scale from vacuum magnetic permeability.
   - Running with probe scale must be recovered as an effective electromagnetic response:
     $$
     \alpha(\mu;\theta_{\mathrm{sea}})
     =
     \alpha_{\mathrm{ref}}\,
     \mathcal K_{\mathrm{EM}}(\mu;\theta_{\mathrm{sea}},I_\mu)
     $$

     [View →](../../../../../equation-mapping.html#corpus-equation-f87315c0fab0a87f)

     Here $\mu$ is probe energy, $\mathcal K_{\mathrm{EM}}$ is the proposed dimensionless electromagnetic response, and $I_\mu$ records the charged thresholds visible at that scale. The anchor requires $\mathcal K_{\mathrm{EM}}(\mu_{\mathrm{ref}};\theta_{\mathrm{sea}},I_{\mu_{\mathrm{ref}}})=1$. This factorization predicts running only when the response is derived independently; an unspecified function can reproduce any chosen running curve.
   - In architrino terms, the fixed part of the low-energy anchor requires a derived effective electromagnetic response from $\epsilon$, a candidate action increment $h_\vartheta$, the photon-channel speed $c_\gamma$, and the declared Noether sea record. Here $h_\vartheta$ is an action quantity, not a time period. The scale-dependent part belongs in $\mathcal K_{\mathrm{EM}}$ and $I_\mu$, with the underlying state and conversions held fixed.
   - Derive numerically; explain why $\alpha_{\mathrm{ref}}\ll 1$ and why $\alpha(\mu)$ runs with energy without changing the primitive wake speed or the action-period carrier.

---

### Philosophical Payoff

The SI provides reproducible conventions without settling the ontology of the quantities measured. A successful substrate theory would explain why different physical realizations agree and predict relationships that remain after arbitrary choices of units are removed.

Lengths measured relative to $R_*$, absolute durations relative to $T_*$, and polarity relative to $\epsilon$ provide a coherent starting description. Mass-based action units, temperatures, amounts, and luminous intensities additionally require their stated observer or metrological conventions. Reducing the independent physical assumptions is an open derivation problem; retaining kilograms, kelvins, and moles for communication does not add primitive substances to the ontology.

### Sources

The BIPM's *The International System of Units (SI)*, ninth edition (2019), version 4.01 (June 2026), [DOI: 10.59161/AUEZ1291](https://doi.org/10.59161/AUEZ1291), §§2.2–2.3.2, supplies the unit definitions, their conventional status, and the mole and candela interpretations. The chapter paraphrases these definitions and rearranges their quantity equations.

NIST's [CODATA Recommended Values of the Fundamental Physical Constants: 2022](https://physics.nist.gov/cuu/pdf/wall_2022.pdf) supplies the numerical electromagnetic and gravitational comparison values. They are observer-level benchmarks, not substrate inputs.

## Parameter Ledger

This chapter is the canonical bookkeeping page for the symbols that control closure across the $\mathbb{A}\mathbb{A}\mathbb{A}$ corpus. Its purpose is not to re-derive every quantity. Its purpose is to keep the roles of primitive postulates, geometric closure targets, constitutive coefficients, state variables, and observer-level benchmarks from collapsing into one another.

An architrino is a polarity-bearing point transceiver whose emitted causal wake reaches other events after a propagation delay. An assembly is a candidate organized set of architrino histories; the Noether sea is the ambient assembly population whose collective response is intended to produce effective clock, ruler, and signal behavior. A constitutive map relates that population's state to those responses. The ledger distinguishes definitions and conditional maps from quantities actually derived from retained dynamics.

The central bookkeeping rule is simple: not every symbol that appears in an equation is a free parameter. Some symbols are fixed substrate inputs, some are assembly-dependent outputs, some are constitutive functions of the Noether sea, and some are measured benchmarks that the theory is supposed to recover.

### Purpose

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

### Status Classes

Use the following classes consistently.

- **Fundamental parameter:** part of the substrate-level postulate set.
- **Regulator / convention:** introduced for regularization, nondimensionalization, or normalization; not itself an ontological observable.
- **Geometric closure target:** should be fixed by assembly geometry, delay locking, or branch selection.
- **Constitutive closure target:** effective-medium quantity that must be extracted once and then reused across observables.
- **State variable / field:** varies over space, time, or assembly; not a single global fit constant.
- **Observable benchmark:** measured output used to test the closure map.

### Canonical Guardrails

#### Field-speed notation

The canonical symbol for wake speed is
$$
c_f
$$

[View →](../../../../../equation-mapping.html#corpus-equation-fd14eacc9dd4bd4a)

Numerical instantiations use $c_f=1$; a generic velocity symbol such as $v$ denotes a separately defined motion and must not replace it.

#### Parameter versus field

The following should **not** be treated as free global constants:

- $n(\mathbf X,T)$,
- $\rho_{\text{NS}}(\mathbf X,T)$,
- $\Phi_{\text{eff}}(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})$,
- $c_{\text{eff}}(\mathbf X,T)$,
- $\chi_{\text{sea}}(\mathbf X,T)$,
- $m_{\text{inertial}}(A)$ for a specific assembly $A$.

These are state variables, constitutive fields, or derived outputs. They may be controlled by a smaller parameter set, but they are not themselves independent parameters.

#### Benchmark versus postulate

The following observer-level quantities are closure targets, not primitive inputs:

- $e$,
- $h,\hbar$,
- $G$,
- $\gamma_{\mathrm{PPN}},\beta_{\mathrm{PPN}},\alpha_i$,
- particle masses and electroweak angles,
- observer-level redshift and expansion summaries such as $Z_X$, $a_{\mathrm{eff}}(t_{\mathrm{eff}})$, $H_{\mathrm{eff}}(t_{\mathrm{eff}})$, and $H_{\mathrm{eff}}$.

If the theory must reset them independently for each chapter, parameter closure has failed.

#### Collision-resistant symbol ownership

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

#### CODATA Benchmark Contract

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

[View →](../../../../../equation-mapping.html#corpus-equation-513d15a756279280)

where $u(X)$ is the quoted standard uncertainty. If $X$ is exact by SI definition, the residual is not a measurement residual. The closure test is instead whether the same substrate-to-observer unit map recovers the exact convention while also passing the adjusted measured rows that depend on it.

The displayed $Z_X$ measures discrepancy in units of the benchmark uncertainty; it is a statistical significance only when prediction uncertainty and shared calibration covariance are negligible or explicitly included. For a difference of prediction and benchmark estimates, its variance is the sum of their variances minus twice their covariance. Joint tests must retain correlations between adjusted constants and avoid counting conversions or duplicate forms as independent evidence. A row used to calibrate the unit map cannot also serve as an independent test of that calibration. The fractional residual $\rho_X$ requires a nonzero benchmark, and the uncertainty-normalized residual requires $u(X_{\mathrm{CODATA}})>0$.

The uncertainty convention is also fixed. A standard uncertainty $u(y)$ is an estimated standard deviation for the result $y$, and the relative standard uncertainty is
$$
u_r(y)=\frac{u(y)}{|y|}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f39bec73110a44c8)

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

#### LHC scalar benchmark contract

The LHC scalar rows are observer-level benchmark rows, not CODATA constants and not substrate inputs. The [ATLAS 2012 discovery report](https://arxiv.org/abs/1207.7214v2) supplies the date-stamped neutral-boson benchmark for the Higgs-sector comparison used by [Particle Masses](../../../../markdown/aaa/assemblies/particle-masses.md) and [Electroweak Bosons](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md). Its compatibility with a scalar hypothesis is a comparison target, not a spin-zero determination from these rows alone. Recovery must address mass, production-and-branching normalization, channel response, and the source's model-dependent exclusion limits.

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

[View →](../../../../../equation-mapping.html#corpus-equation-f283da4c13fc3b29)

with the channel set
$$
\mathcal{C}_{H}^{\mathrm{ATLAS\,2012}}
=
\{ZZ^{(*)}\to4\ell,\gamma\gamma,WW^{(*)}\to\ell\nu\ell\nu\}.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-797be6d4c83539ce)

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

[View →](../../../../../equation-mapping.html#corpus-equation-4e92a4c55241055e)

Here $\theta$ is the declared common parameter record, $M_H^{\mathrm{breath}}(\theta)$ is a candidate scalar-mode mass, and $\mu_H^{\mathrm{eff}}(\theta)$ is its predicted production-and-branching normalization relative to the source's Standard Model reference. The superscript does not identify a realized breathing mode. A channel statistic $Z_c$, its width $\sigma_{Z_c}$, and the exclusion contribution $\mathcal{R}_{\mathrm{excluded\,scalar}}$ require an explicit likelihood and detector model before evaluation. Discovery significance is not a Gaussian measurement with an automatically assigned error bar. Combined strength and channel statistics reuse events and correlated nuisance parameters; adding their squares does not create independent evidence. Quantitative acceptance requires a joint likelihood or a justified covariance treatment without double counting, including prediction uncertainty and the source's exclusion assumptions.

The date-stamped row remains a recovery target after branch, energy, exposure, and detector records are fixed independently. It is not a branch-search, shielding, or mass-map input, and no current world-average substitution is made here.

#### Naturalness and sensitivity

When a symbol is claimed as a closure output rather than a free fit, use the fine-tuning quotient
$$
\mathrm{FTQ}(p)=
\frac{\Delta p/p}{\Delta \mathrm{obs}/\mathrm{obs}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3d0c9994146c3809)

as a local inverse-sensitivity diagnostic.

Here $\Delta p/p$ is a declared fractional perturbation and $\Delta \mathrm{obs}/\mathrm{obs}$ is the resulting fractional observable change, with the other independent inputs held fixed. The quotient requires nonzero reference values and nonzero observable change. Its magnitude is the reciprocal of the fractional response: $|\mathrm{FTQ}(p)|<0.1$ means more than tenfold sensitivity, whereas $|\mathrm{FTQ}(p)|>10$ means weak response. These thresholds are heuristic diagnostics, not physical acceptance criteria or proof of fine tuning. For example, a 1% input change producing a 20% output change gives an inverse sensitivity of 0.05. A discrete branch label needs an admissible branch comparison rather than a continuous derivative; a derived output can be perturbed only through admissible underlying inputs. Zero or unresolved response must be reported separately.

Status:

- $\epsilon$ is treated as the discrete primitive polarity-unit magnitude, while the observer-level calibration target is $|e|=6\epsilon$; neither is a continuous per-observable fit.
- $\kappa$ is the universal coupling in the primitive acceleration law. In the bare two-body scale closure below it combines with $c_f$ and $\epsilon$ to set length and time units rather than an independent dimensionless tuning knob, while its primitive, derived, or normalization-sensitive status in the observer-level unit map remains open.
- $\rho_{\text{NS},0}$ and related medium-density normalizations remain naturalness risks until energy shielding and cosmological closure are quantified.

#### Regulator versus physical pulse

The wake-width regulator $\eta$ is a computational and analytic regularization, not a claim that causal wakes are fundamentally pulsed. It smooths causal wake surfaces for finite-resolution evaluation. The limit $\eta\to0$ must be established on the declared history domain; it is not guaranteed at a tangent causal root or a coincident position. Wake-surface smoothing alone does not regularize the spatial inverse-square singularity. Numerical time steps approximate continuous path-history interaction and do not define physical emission pulses.

#### Layer-I two-body scale closure

The displayed bare two-body kernel has no remaining dimensionless coupling built solely from the following positive dimensional substrate triplet, once a regulator-independent limit has been justified:
$$
(c_f,\kappa,\epsilon)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6762729b0329ae98)

spans the base dimensions $(\mathrm{L},\mathrm{T},\mathrm{Q})$ because
$$
[c_f]=\mathrm{L}\,\mathrm{T}^{-1},
\qquad
[\kappa]=\mathrm{L}^3\,\mathrm{T}^{-2}\,\mathrm{Q}^{-2},
\qquad
[\epsilon]=\mathrm{Q}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-91f5f3fec832e76d)

It therefore defines canonical two-body units
$$
Q_*=\epsilon,
\qquad
R_*=\frac{\kappa\epsilon^2}{c_f^2},
\qquad
T_*=\frac{R_*}{c_f}=\frac{\kappa\epsilon^2}{c_f^3}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2b6eafb45d37a37a)

For $\tilde{\mathbf X}=\mathbf X/R_*$, $\tilde T=T/T_*$, and $\tilde q_i=q_i/\epsilon=\pm1$, the causal constraint and bare acceleration law reduce to
$$
\tilde R_{ij}=\tilde T-\tilde T_t
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f4ca714a9893ed48)

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

[View →](../../../../../equation-mapping.html#corpus-equation-ec1cfba383b1b28c)

up to the separately declared regulator ratio $\eta/R_*$ when a mollified surrogate is being used.

This removes a dimensionless coupling from the kernel, not the dimensionless initial-history data. Root multiplicities, branch thresholds, curvature, and residuals can still depend on the retained histories, polarity assignment, boundary conditions, and selected branch. For a fixed branch problem those quantities must be computed from the delayed dynamics; rescaling the dimensional triplet cannot independently tune them. A declared geometric chart alone neither selects a unique history nor certifies a stable maximum-curvature binary.

### Layer I: Substrate and Kernel Parameters

These symbols belong to the delayed microscopic law itself.

| ID | Symbol | Class | Status | Meaning | Primary home |
| --- | --- | --- | --- | --- | --- |
| K1 | $c_f$ | Fundamental parameter | Primitive | field speed of causal wake propagation | [../dynamics/master-equation.md](../../../../markdown/aaa/dynamics/master-equation.md), [../foundations/absolute-timespace.md](../../../../markdown/aaa/foundations/absolute-timespace.md) |
| K2 | $\epsilon$ | Fundamental parameter | Primitive | potential polarity-unit magnitude, with observer-level electric charge reconstructed from it | [../assemblies/fermions/quantum-number-mapping.md](../../../../markdown/aaa/assemblies/fermions/quantum-number-mapping.md), [../assemblies/gauge-structure-emergence.md](../../../../markdown/aaa/assemblies/gauge-structure-emergence.md) |
| K3 | $\kappa$ | Fundamental parameter or normalization-sensitive coupling | Open as primitive/normalization split; universal in the substrate acceleration law | coupling multiplying $\sigma_{ij}\lvert q_iq_j\rvert W_{ij}^{\mathrm{acc}}/r_{ij}^2$ in the per-hit acceleration law; because a single architrino has no primitive inertial mass, this is not an $F=ma$ coefficient; with $c_f$ and $\epsilon$ it sets the two-body scale $R_*=\kappa\epsilon^2/c_f^2$ rather than a Layer-I dimensionless fit constant; dimensional row $[\kappa]=\mathrm{L}^3\,\mathrm{T}^{-2}\,\mathrm{Q}^{-2}$ | [../dynamics/master-equation.md](../../../../markdown/aaa/dynamics/master-equation.md), [architrino-si-base-units.md](../../../../markdown/aaa/validation/architrino-si-base-units.md), [../foundations/architrino.md](../../../../markdown/aaa/foundations/architrino.md) |
| K4 | $\eta$ | Regulator / convention | Open but non-ontological | mollifier width used to regularize causal wake surfaces for smooth dynamics and numerics | [simulations/action-energy/well-posedness-and-regularization.md](../../../../markdown/aaa/validation/simulations/action-energy/well-posedness-and-regularization.md), [../dynamics/master-equation.md](../../../../markdown/aaa/dynamics/master-equation.md) |
| K5 | $Z_e$ | Regulator / convention | Convention, default $Z_e=1$ | charge-map normalization at the observer interface; not an additional microscopic acceleration-law parameter | [../assemblies/gauge-structure-emergence.md](../../../../markdown/aaa/assemblies/gauge-structure-emergence.md), [../assemblies/fermions/quantum-number-mapping.md](../../../../markdown/aaa/assemblies/fermions/quantum-number-mapping.md) |

### Layer II: Assembly-Geometry Closure Targets

These quantities belong to Noether braid architecture, shielding, branch structure, and assembly response.

| ID | Symbol | Class | Status | Meaning | Primary home |
| --- | --- | --- | --- | --- | --- |
| G0 | $A_0$ | Geometric closure target | Open | calibration-free neutral rest-branch Noether braid reference attractor used to derive the first mass-map outputs before particle benchmarks enter | [Particle Masses](../../../../markdown/aaa/assemblies/particle-masses.md), [Coincident-Midpoint Orthogonal-Axis Braid Dynamics](../../../../markdown/aaa/noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md#zero-axial-offset-three-binary-dynamics-and-interpretation), [Energy](../../../../markdown/aaa/dynamics/energy.md) |
| G0a | $\mathcal{P}_{A_0}$ | Geometric closure target | Open; proposed certificate, not an established attractor | candidate-specific record relating geometry, causal roots, stability, shielding, and medium response; any negative result applies only to its tested chart and assumptions | [simulations/a0-branch-certificate-protocol.md](../../../../markdown/aaa/validation/simulations/a0-branch-certificate-protocol.md), [simulations/a0-tier0-result-interpretation.md](../../../../markdown/aaa/validation/simulations/a0-tier0-result-interpretation.md), [../assemblies/particle-masses.md](../../../../markdown/aaa/assemblies/particle-masses.md) |
| G1 | $R_1,R_2,R_3$ | Geometric closure target | Open | characteristic radii of the indexed coincident-midpoint orthogonal-axis braid binary rows | [Noether Braid](../../../../markdown/aaa/noether-braid/noether-braid.md), [Braid Envelope Geometry](../../../../markdown/aaa/noether-braid/braid-envelope-geometry.md), [Coincident-Midpoint Orthogonal-Axis Braid Dynamics](../../../../markdown/aaa/noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md#zero-axial-offset-three-binary-dynamics-and-interpretation) |
| G2 | $\omega_1,\omega_2,\omega_3$ | Geometric closure target | Open | characteristic frequencies of the indexed coincident-midpoint orthogonal-axis braid binaries | [Coincident-Midpoint Orthogonal-Axis Braid Dynamics](../../../../markdown/aaa/noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md#zero-axial-offset-three-binary-dynamics-and-interpretation), [Particle Masses](../../../../markdown/aaa/assemblies/particle-masses.md) |
| G3 | $R_{\text{align}}$ | Geometric closure target | Open, conjectural | assembly-level alignment radius in the terminal orthogonal-axis three-binary map | [Mapping the Planck Scale to Coincident-Midpoint Orthogonal-Axis Geometry](../../../../markdown/aaa/philosophy-history/theory-bridges/mapping-planck-scale-to-coincident-midpoint-orthogonal-axis-geometry.md) |
| G4 | $\mathcal{A}_{\text{align}}^{\text{cycle}}, I_{\text{align}}$ | Geometric closure target | Open, conjectural | closed-cycle action and radian-normalized rotational-action increment of the aligned terminal mode | [Mapping the Planck Scale to Coincident-Midpoint Orthogonal-Axis Geometry](../../../../markdown/aaa/philosophy-history/theory-bridges/mapping-planck-scale-to-coincident-midpoint-orthogonal-axis-geometry.md) |
| G5 | $\zeta(A)$ | Geometric closure target | Open | probe-facing exposure fraction used by the mass map, after separating sea-coupled and unresolved channels; distinct from raw far-field suppression | [../dynamics/energy.md](../../../../markdown/aaa/dynamics/energy.md), [../assemblies/particle-masses.md](../../../../markdown/aaa/assemblies/particle-masses.md) |
| G6 | $\alpha$ | Geometric closure target | Open | axial-frame misalignment angle used in the weak-mixing / quark-geometry program | [../assemblies/fermions/weak-mixing-angle.md](../../../../markdown/aaa/assemblies/fermions/weak-mixing-angle.md) |
| G7 | $\phi_c$ | Geometric closure target | Open | color-sector azimuth selecting the exceptional axial-frame orientation | [../assemblies/fermions/weak-mixing-angle.md](../../../../markdown/aaa/assemblies/fermions/weak-mixing-angle.md) |

### Layer III: Constitutive Spacetime Parameters

These symbols control the handoff from the Euclidean substrate plus Noether sea to effective metric language.

Here a field marked derived is defined from an admitted state or response map. That status does not establish the underlying population, constitutive law, or numerical field. The substrate-to-observer coordinate map and common clock, ruler, and signal calibration remain required.

| ID | Symbol | Class | Status | Meaning | Primary home |
| --- | --- | --- | --- | --- | --- |
| C1 | $\rho_{\text{NS},0}$ | Constitutive closure target | Open | reference Noether braid density used to normalize the Noether sea | [../spacetime/emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md), [../spacetime/proper-time-and-time-dilation.md](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md) |
| C2 | $n(\mathbf X,T)$ | State variable / field | Derived field | normalized Noether braid density, $n=\rho_{\text{NS}}/\rho_{\text{NS},0}$ | [../spacetime/emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md), [../spacetime/proper-time-and-time-dilation.md](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md) |
| C3 | $\Omega(x_{\mathrm{eff}}^i),\xi(x_{\mathrm{eff}}^i)$ | Constitutive closure target | Open | conformal response and Noether braid envelope shape ratio in the stated metric subclass; their product supplies the clock-rate factor only after the geometry-to-clock map is fixed | [../spacetime/emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md), [../spacetime/lorentz-kinematics.md](../../../../markdown/aaa/spacetime/lorentz-kinematics.md) |
| C4 | $\Phi_{\text{eff}}(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})$ | State variable / field | Derived field | constitutive effective potential defined from the clock channel | [../spacetime/emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md), [../spacetime/proper-time-and-time-dilation.md](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md) |
| C5 | $c_{\text{eff}}(\mathbf X,T)$ | State variable / field | Conditional response field | dressed assembly-channel speed used for clock/ruler and effective-metric comparisons; equality with the wake speed or photon-channel speed $c_\gamma$ requires separate recovery evidence | [../spacetime/emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md), [../spacetime/ppn-parameters.md](../../../../markdown/aaa/spacetime/ppn-parameters.md) |
| C5a | $\chi_{\text{sea}}(\mathbf X,T)$ | Derived response field | Derived from $c_{\text{eff}}$ | Noether sea delay factor, $\chi_{\text{sea}}=c_f/c_{\text{eff}}$; replaces optical refractive-index notation in Noether sea propagation maps | [../spacetime/noether-sea.md](../../../../markdown/aaa/spacetime/noether-sea.md), [../spacetime/emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md), [../spacetime/ppn-parameters.md](../../../../markdown/aaa/spacetime/ppn-parameters.md) |
| C6 | $\gamma_{\mathrm{PPN}}$ | Constitutive closure target with observable meaning | Open | first-order refraction / space-curvature coefficient in the weak-field map | [../spacetime/ppn-parameters.md](../../../../markdown/aaa/spacetime/ppn-parameters.md) |
| C7 | $C_2$ or $\beta_{\mathrm{PPN}}$ | Constitutive closure target with observable meaning | Open | second-order clock-channel nonlinearity entering the $g_{00}$ expansion | [../spacetime/ppn-parameters.md](../../../../markdown/aaa/spacetime/ppn-parameters.md) |
| C8 | $\Xi_1,\Xi_2,\Xi_3,\Xi_4$ | Constitutive closure target | Open | preferred-frame leakage coefficients in the weak-field constitutive expansion | [../spacetime/ppn-parameters.md](../../../../markdown/aaa/spacetime/ppn-parameters.md) |
| C9 | $\mathcal{M}_{\text{sea}}^{ab}$ | Constitutive closure target | Open | medium-response tensor that maps shielded internal assembly energy to inertial momentum response, reducing to $h^{ab}/c_{\text{eff}}^2$ in a homogeneous isotropic Noether sea cell | [../dynamics/energy.md](../../../../markdown/aaa/dynamics/energy.md), [../assemblies/particle-masses.md](../../../../markdown/aaa/assemblies/particle-masses.md) |

### Layer IV: Observer-Level Benchmarks and Derived Outputs

These quantities are where closure is tested. They are not substrate inputs.

| ID | Symbol | Class | Status | Meaning | Primary home |
| --- | --- | --- | --- | --- | --- |
| O1 | $e$ | Observable benchmark | Derived target | elementary charge reconstructed from substrate charge and normalization map | [../assemblies/fermions/quantum-number-mapping.md](../../../../markdown/aaa/assemblies/fermions/quantum-number-mapping.md), [../assemblies/gauge-structure-emergence.md](../../../../markdown/aaa/assemblies/gauge-structure-emergence.md) |
| O2 | $h,\hbar$ | Observable benchmark / geometric target | Open | full-cycle action quantum and radian-normalized angular-momentum quantum to be related to orthogonal-axis three-binary alignment, orbital closure, and any lower recordable basin-measure scale derived by quantum closure | [Angular Momentum and Spin](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md), [Mapping the Planck Scale to Coincident-Midpoint Orthogonal-Axis Geometry](../../../../markdown/aaa/philosophy-history/theory-bridges/mapping-planck-scale-to-coincident-midpoint-orthogonal-axis-geometry.md), [Architrino SI Base Units](../../../../markdown/aaa/validation/architrino-si-base-units.md) |
| O3 | $G$ or $G_{\text{eff}}$ | Observable benchmark / constitutive target | Open | effective gravitational coupling emerging from medium compliance and alignment geometry | [Mapping the Planck Scale to Coincident-Midpoint Orthogonal-Axis Geometry](../../../../markdown/aaa/philosophy-history/theory-bridges/mapping-planck-scale-to-coincident-midpoint-orthogonal-axis-geometry.md), [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md) |
| O4 | $m_{\text{inertial}}(A)$ | Derived output | Open | inertial mass of assembly $A$, extracted operationally from shielding and medium response | [../dynamics/energy.md](../../../../markdown/aaa/dynamics/energy.md), [../assemblies/particle-masses.md](../../../../markdown/aaa/assemblies/particle-masses.md) |
| O5 | $\theta_W^{\text{bare}}$ and $\theta_W$ | Geometric target / observable benchmark | Open | bare geometric weak-mixing increment and the measured electroweak mixing angle it must eventually inform | [../assemblies/fermions/weak-mixing-angle.md](../../../../markdown/aaa/assemblies/fermions/weak-mixing-angle.md), [../assemblies/gauge-structure-emergence.md](../../../../markdown/aaa/assemblies/gauge-structure-emergence.md) |
| O6 | $(\alpha_1,\alpha_2,\alpha_3)$ | Observable benchmark | Open | standard PPN preferred-frame coefficients derived from $(\Xi_1,\Xi_2,\Xi_3)$ | [../spacetime/ppn-parameters.md](../../../../markdown/aaa/spacetime/ppn-parameters.md) |
| O7 | $Z_X^{E\to R}$, $Y_{X,E\to R}$, and $H_{\mathrm{eff},X}$ | Observer-level derived output | Open | total signed photon-frequency transfer, path-history exchange contribution, and inferred redshift-transfer slope for a declared source/receiver record; not primitive expansion parameters | [../cosmology/expansion-mechanism.md](../../../../markdown/aaa/cosmology/expansion-mechanism.md), [simulations/redshift-budget-toy-model.md](../../../../markdown/aaa/validation/simulations/redshift-budget-toy-model.md), [reaction-cosmology-provenance-ledger.md](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md) |
| O8 | $M_H^{\mathrm{ledger}}$, $\mu_H^{\mathrm{ledger}}$, and $Z_c^{\mathrm{ATLAS\,2012}}$ | Observable benchmark | ATLAS 2012 row recorded; Higgs-sector closure open | date-stamped neutral-boson mass, production-and-branching normalization, and channel comparison for Higgs-sector recovery; not branch-search or mass-map input | [../assemblies/particle-masses.md](../../../../markdown/aaa/assemblies/particle-masses.md), [../assemblies/bosons/electroweak-bosons.md](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md) |

### Canonical Relations

The ledger above is only useful if the interfaces between layers stay explicit. The following relations are canonical handoff points in the corpus.

#### 1. Microscopic delayed dynamics

The regularized representation of the microscopic law uses the kernel-side set
$$
(c_f,\epsilon,\kappa,\eta)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-dc8084e941317a8f)

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

[View →](../../../../../equation-mapping.html#corpus-equation-996e953dc8ddbd9e)

Here $a$ is the receiver, $b$ the transmitter, $\mathbf R_{ab}=\mathbf X_a(T)-\mathbf X_b(T_t)$ the delayed separation, and $\sigma_{ab}=\operatorname{sign}(q_aq_b)$ the polarity sign. The mollifier $\delta_\eta$ is normalized in its length argument and has inverse-length units. The factor $c_f$ gives a dimensionless transmitter-time weight: at a simple causal root the integral collapses to $c_f/|c_f-\hat{\mathbf R}_{ab}\cdot\mathbf V_b(T_t)|$, as in the [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md). Removing that factor while retaining the stated dimensions of $\kappa$ breaks both units and root normalization. The expression requires admitted histories, positive noncoincident separations, exclusion of instantaneous self-interaction, and controlled convergence of the history integral and regulator limit. A finite history window requires its boundary and omitted-tail treatment to be declared.

#### 2. Charge reconstruction

The substrate-to-observer charge bookkeeping map is
$$
|e| = 6\epsilon Z_e
$$

[View →](../../../../../equation-mapping.html#corpus-equation-83891c7a130507c1)

with canonical normalization choice
$$
Z_e=1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-fbc107b8e0be0ee6)

The elementary charge magnitude is an observer-level recovery target. This bookkeeping equality fixes a normalization; it does not demonstrate its dynamical recovery.

Here $Z_e$ is dimensionless. The coupling $\kappa$ and wake speed $c_f$ do not enter this equality: with the dimensional row for $\kappa$ above, a factor $\sqrt{\kappa c_f}$ would not have charge-conversion units. The equation is therefore an observer bookkeeping normalization, not a second primitive definition of $\epsilon$ and not a dynamical derivation of electric charge. A deeper derivation must explain why the six-site assembly ledger selects $Z_e=1$ without inserting the measured value of $|e|$ into the branch calculation.

#### 3. Medium normalization and clock-channel potential

The constitutive spacetime layer uses
$$
\rho_{\text{NS}}(\mathbf X,T)=\rho_{\text{NS},0}\,n(\mathbf X,T)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e6cb05ef8b933aa2)

and
$$
\Phi_{\text{eff}}(x_{\mathrm{eff}}^i)
=
c_0^2\ln\!\big(\Omega(x_{\mathrm{eff}}^i)\xi(x_{\mathrm{eff}}^i)\big)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-01d5073d69f34580)

Here $\xi$ is the Noether braid envelope shape ratio, while the positive product $\Omega\xi$ is the clock-rate factor in this static exponential metric subclass after the geometry-to-clock map is fixed. The speed $c_0=c_{\text{eff}}(\infty)$ sets the asymptotic observer calibration, with the reference clock factor normalized to one. A small difference between $c_f$ and $c_0$ is a recovery condition to establish, not a consequence of homogeneity alone.

This is the cleanest statement of the Noether sea-to-metric handoff:
$$
(\delta_{ij},n,\chi_{\text{sea}},\Phi_{\text{eff}},\text{stress})
\mapsto
g_{\mu\nu}^{\text{eff}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-949080302d1377fa)

#### 4. Weak-field PPN extraction

The parameterized post-Newtonian (PPN) coefficients describe possible observer-level departures from general relativity in weak gravity. On the stationary, isotropic, zero-shift signal branch of [PPN Parameters](../../../../markdown/aaa/spacetime/ppn-parameters.md), the normalized delay map is
$$
\bar{\chi}_{\text{sea}}(\mathbf x_{\mathrm{eff}})
\equiv
\frac{c_0}{c_{\text{eff}}(\mathbf x_{\mathrm{eff}})}
=\frac{c_0}{c_f}\chi_{\text{sea}}(\mathbf x_{\mathrm{eff}})
=
1-(1+\gamma_{\mathrm{PPN}})\frac{\Phi_N(\mathbf x_{\mathrm{eff}})}{c_0^2}
+\mathcal{O}\!\left(\frac{\Phi_N^2}{c_0^4}\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b18b7ff2a38aea93)

Here $\mathbf x_{\mathrm{eff}}$ denotes the effective spatial chart, $\Phi_N$ is the negative Newtonian comparison potential, and the substrate fields are projected into that chart by the declared common response map. The normalized factor tends to one at infinity without assuming $c_0=c_f$.

For the static isolated-source subclass in which the other PPN potentials vanish or already have their general-relativistic coefficients,
$$
\beta_{\mathrm{PPN}}=\frac{1+2C_2}{2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1d4f4c3826849997)

Here $C_2$ means $C_2^{(U)}$, the quadratic coefficient of the static clock-rate expansion in $U/c_0^2$ with $U=-\Phi_N$. Squaring the clock rate gives the coefficient $1+2C_2$ of $U^2/c_0^4$ in $-g_{00}$. A coefficient extracted in the constitutive potential $-\Phi_{\text{eff}}$ cannot be substituted without the second-order potential conversion.

Preferred-frame leakage is encoded by
$$
\alpha_1=\Xi_1+2\Xi_2,\qquad
\alpha_2=\Xi_2,\qquad
\alpha_3=\Xi_1+\Xi_2-\Xi_3
$$

[View →](../../../../../equation-mapping.html#corpus-equation-130d0ee5eb8ed77b)

The three displayed PPN coefficients vanish exactly when
$$
\Xi_1=\Xi_2=\Xi_3=0
\quad\Longleftrightarrow\quad
\alpha_1=\alpha_2=\alpha_3=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a89e0bc1240ed7ec)

In the same standard PPN gauge and preferred-frame velocity convention, matching the remaining matter-current term requires $\Xi_4=2\alpha_3-\alpha_1=\Xi_1-2\Xi_3$. An independently extracted $\Xi_4$ that violates this relation rejects the reduced dictionary. Thus zero leakage requires the fourth coefficient to vanish as well; observing or defining it without satisfying the consistency relation does not close the map. The other PPN potential coefficients remain separate recovery requirements.

#### 5. Mass map

The assembly-side scalar hypothesis for the probe-facing internal-energy contribution is
$$
m_{\text{inertial}}(A)
\approx
\alpha_{\mathrm{m}}\,\frac{\zeta(A)\,E_{\text{internal}}(A)}{c_{\text{eff}}^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ba82b34369d50270)

with a positive dimensionless $\alpha_{\mathrm{m}}$ fixed once by a reference assembly in a declared weak homogeneous regime. Its universality is a prediction to test on other assemblies.

Here $E_{\text{internal}}(A)$ is a candidate physical energy account with a declared reference, history boundary, and energy-unit conversion. The fraction $\zeta(A)$ is the probe-facing exposure after separating sea-coupled and unresolved contributions, as defined by [Particle Masses](../../../../markdown/aaa/assemblies/particle-masses.md); raw far-field suppression alone does not supply it. These distinctions prevent counting the same energy twice. Mass remains an assembly-level recovery target until energy, exposure, and medium response have been derived.

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

[View →](../../../../../equation-mapping.html#corpus-equation-7bf6d5e1a3792c98)

Here $h^{ab}$ is the inverse Euclidean spatial metric, $p_{\text{int}}^a$ the proposed internal-source momentum contribution, and $V_{\text{cm},b}$ the assembly response-center velocity relative to local sea flow; the notation does not assign masses to primitive architrinos. The tensor $\mathcal{M}_{\text{sea}}^{ab}$ has inverse-speed-squared units and is an unresolved constitutive response, with the displayed scalar reduction restricted to the homogeneous isotropic limit.

The first requirement is a retained assembly under the delayed dynamics. The symbol $A_0$ names one proposed neutral reference, not an established attractor or the unique admissible geometry. Using that candidate requires geometry, winding, causal-root, stability, internal-energy, exposure, and medium-response evidence before particle-mass benchmarks enter. Its proposed mass-facing dimensionless output is
$$
\frac{\zeta(A_0)E_{\text{internal}}(A_0)}{E_0}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-fe1b1bb03918ffaa)

together with the unresolved constants and response-map assumptions needed for an observer-level prediction. Here $E_0>0$ is a declared energy normalization from the same independent unit map; it cannot be chosen from the mass being predicted. Forming a dimensionless quotient alone does not establish calibration independence.

A negative result for a compact coordinate chart excludes only that chart under its tested assumptions. The linked certificate and interpretation chapters specify candidate tests without establishing an evolved attractor. Any revised chart must declare its assumptions and held-out tests before fitting; coordinate consistency alone supplies no retained history or mass output.

#### 6. Planck-alignment map

The Planck-scale program uses the conjectural relations
$$
\mathcal{A}_{\text{align}}^{\text{cycle}} \stackrel{\text{hyp.}}{\approx} h,
\qquad
I_{\text{align}} \stackrel{\text{hyp.}}{\approx} \hbar,
\qquad
2\pi R_{\text{align}} = \ell_P
$$

[View →](../../../../../equation-mapping.html#corpus-equation-568a4acff58ea768)

and the effective gravity-side alignment estimate
$$
G_{\text{eff}}
\equiv
\frac{R_{\text{align}}^2 c_f^3}{\mathcal{A}_{\text{align}}^{\text{cycle}}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d720a95e23e61e03)

These are not yet closed derivations. They are the alignment-side targets connecting geometric closure to $(h,G)$.

The circumference identification also has an unresolved numerical normalization. Using the observer definitions $\ell_P^2=\hbar G/c^3$ and $h=2\pi\hbar$, the displayed hypotheses imply $G_{\text{eff}}/G\approx(c_f/c)^3/(8\pi^3)$. Even after speed matching, this ratio is not one. The formula is retained as a conjectural dimensional estimate; deriving the missing geometric factor or revising the alignment identification is required before it predicts the measured gravitational coupling. The observer definitions serve only as comparison constraints.

#### 7. Weak-mixing branch structure

The weak-mixing geometry note uses the following guessed branch-increment hypothesis. Here $\theta_W^{\text{bare}}$ names the candidate geometric increment $\theta_{\mathrm{inc}}$ of that chapter, distinct from its measured electroweak mixing angle; the value in degrees selects the smallest positive representative in the first quadrant:
$$
\sin^2\theta_W^{\text{bare}}=\frac14,
\qquad
\theta_W^{\text{bare}}=30^\circ
$$

[View →](../../../../../equation-mapping.html#corpus-equation-cbd33793a8a0a990)

and the discrete axial-frame branch hypothesis
$$
\alpha_n=n\,\theta_W^{\text{bare}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d3abedfdd180d1fe)

Here $n$ is a discrete branch index local to this equation, not the Noether sea density field, and $\alpha_n$ labels an axial-frame orientation, not the fine-structure benchmark. Neither the increment nor this discrete sequence establishes a retained branch, an energy minimum, or electroweak dressing. Their relation to the measured angle requires the same assembly's neutral-current and charged-current response.

### What Is Not Yet Closed

The corpus supports the following conservative closure assessment.

#### Closed enough to treat as canonical

- $c_f$ denotes the substrate wake speed, with $c_f=1$ in numerical instantiations.
- $\epsilon$ denotes the potential polarity-unit magnitude.
- The displayed bare two-body kernel admits the nondimensionalization by $R_*=\kappa\epsilon^2/c_f^2$ and $T_*=R_*/c_f$; dimensionless histories and branch data remain inputs to each well-posed problem.
- $\rho_{\text{NS},0}$ is the reference density symbol for the Noether sea.
- $\Phi_{\text{eff}}=c_0^2\ln(\Omega\xi)$ is the canonical clock-channel potential definition for the exponential metric subclass, with $\xi$ retained as a geometry-first Noether braid shape ratio and $c_0$ marking observer-sector calibration.

#### Still genuinely open

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

### Immediate Parameter-Closure Priorities

The unresolved derivations follow the dependencies between the layers:

1. Fix the observer-level status of $\kappa$ once, with an explicit statement of what part is physical coupling, what part is absorbed normalization, and how the two-body scale $R_*=\kappa\epsilon^2/c_f^2$ enters the unit map.
2. Derive or numerically extract a reusable constitutive parameterization for $(\Omega,\xi)$, then hold it fixed across redshift, Shapiro delay, lensing, and preferred-frame tests.
3. Establish a retained assembly before extracting probe-facing $\zeta(A)$ and a reusable $\mathcal{M}_{\text{sea}}^{ab}$ response map; $A_0$ is one candidate, and applying that map across particle sectors requires separate response evidence.
4. Decide whether the Planck-alignment map yields $(h,G)$ as true outputs or only as analogy-level scaling relations.
5. Derive the weak-mixing branch selection from delayed dynamics and the observer coupling map. A minimization problem for $E_{\text{eff}}(\alpha,\phi_c)$ is a possible effective description only after that energy function and its relation to the dynamics are established.

### Falsification Gate

Parameter closure fails if any of the following occurs:

- a symbol advertised as fundamental changes meaning across chapters,
- a constitutive coefficient must be re-fit independently for different observable classes,
- a state field such as $n(\mathbf X,T)$ is implicitly treated as a free global constant to rescue a calculation,
- or observer-level benchmarks such as $e$, $G$, or particle masses are matched only by introducing one-off per-sector normalizations.

In compact form, the closure target is a nonempty shared parameter set
$$
\mathcal{P}_{\text{shared}} \neq \varnothing
$$

[View →](../../../../../equation-mapping.html#corpus-equation-889bfc545ab9c36b)

where $\mathcal{P}_{\text{shared}}$ is the common substrate-plus-constitutive set that survives particle, spacetime, and quantum-side tests simultaneously.

This condition is a necessary compatibility target for the declared tests, not proof of universal validity or parameter identifiability. State dependence predicted by one fixed constitutive law is legitimate; independent per-observable retuning after seeing residuals is not. An unevaluated comparison leaves compatibility unresolved, whereas an excluded shared set rejects the tested model and domain.

### Sources

- NIST, *CODATA Recommended Values of the Fundamental Physical Constants: 2022*, [complete table](https://physics.nist.gov/cuu/Constants/Table/allascii.txt). Source of the dated values and quoted standard uncertainties; these are observer benchmarks, not substrate premises.
- ATLAS Collaboration, *Observation of a New Particle in the Search for the Standard Model Higgs Boson with the ATLAS Detector at the LHC* (2012), [arXiv:1207.7214v2](https://arxiv.org/abs/1207.7214v2), DOI: 10.1016/j.physletb.2012.08.020. The discovery record supplies the dated mass and strength rows; §§7–9 explain the channel combination, correlations, and different mass resolutions.

### Related Chapters

- [constraint-ledger.md](../../../../markdown/aaa/validation/constraint-ledger.md)
- [architrino-si-base-units.md](../../../../markdown/aaa/validation/architrino-si-base-units.md)
- [../dynamics/master-equation.md](../../../../markdown/aaa/dynamics/master-equation.md)
- [../dynamics/energy.md](../../../../markdown/aaa/dynamics/energy.md)
- [../philosophy-history/theory-bridges/angular-momentum-and-spin.md](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md)
- [Mapping the Planck Scale to Coincident-Midpoint Orthogonal-Axis Geometry](../../../../markdown/aaa/philosophy-history/theory-bridges/mapping-planck-scale-to-coincident-midpoint-orthogonal-axis-geometry.md)
- [../spacetime/emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md)
- [../spacetime/ppn-parameters.md](../../../../markdown/aaa/spacetime/ppn-parameters.md)
- [../assemblies/fermions/weak-mixing-angle.md](../../../../markdown/aaa/assemblies/fermions/weak-mixing-angle.md)

## Reaction Ledger

This ledger records how reaction channels account for constituent architrinos, Noether braids, axial layers, energy, momentum, charge, polarity, and path-history provenance. It retains Standard Model reaction notation while stating what an $\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation must conserve before a reaction map can be treated as more than a provisional diagram.

An [architrino](../../../../markdown/aaa/foundations/architrino.md) is a persistent point transceiver with fixed polarity and a continuous path history in absolute time $T$. An assembly is an organized set of those histories; a [Noether braid](../../../../markdown/aaa/noether-braid/noether-braid.md) is a neutral braided scaffold, and an axial layer is the candidate material attached at its polar sites. The [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md) is the proposed ambient assembly population. A causal wake is the transmitter-tagged family of expanding causal surfaces that carries delayed interaction. Provenance records which constituent follows which history, rather than merely matching particle labels or totals.

Fixed primitive identities and polarities imply inventory conservation for a fully accounted event. They do not supply physical energy, momentum, angular momentum, spin, or an observer charge map. Those require the independent assembly and response constructions in [Energy](../../../../markdown/aaa/dynamics/energy.md) and [Angular Momentum and Spin](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md); the balances below are recovery requirements on such constructions. Numerical substrate instantiations use $c_f=1$.

For radiative channels, use this ledger together with [Radiation](../../../../markdown/aaa/reactions/radiation.md#radiation-event-record-schema). For cosmology-facing radiation and thermalization channels, use it together with [Reaction-Cosmology Provenance Ledger](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md).

### Scope and Status

Reaction provenance is a closure target. A channel may use standard observer notation such as $d \to u + W^-$ or $\gamma+\gamma\to e^+ + e^-$, but the $\mathbb{A}\mathbb{A}\mathbb{A}$ map is not closed until the underlying constituent ledger is explicit.

The conservative status is:

- Architrino count and polarity conservation are required constraints.
- Noether sea participation is allowed, but it must be recorded as a reactant, product reservoir, or medium-excitation channel rather than left implicit.
- W, Z, photon, and pair-production language may be retained at observer level, while the substrate map must identify the transient assembly, exchanged payload, or planar-mode nucleation event being invoked.
- Radiative, photon-capture, and sub-threshold shedding entries must attach the shared radiation event-record schema: source assembly, trigger geometry, $\delta\Theta_a$, $E_{\text{exc}}$, $E_\gamma$, recoil, medium excitation, polarization handoff, causal-wake ledger, and closure status.
- Any weak-channel ledger that depends on chirality, axial-frame orientation, CKM/PMNS mixing, or antineutrino routing remains provisional until the corresponding geometry is derived.
- Within the charged-fermion scaffold hypothesis, a generation change must route the scaffold-count difference $\Delta N_{\mathrm{scaffold}}=-2\,\Delta g$: each adjacent heavier-generation step releases one neutral two-architrino support binary, and each adjacent lighter-generation step recruits one. Here $g\in\{1,2,3\}$ is the generation index and $\Delta g$ is final minus initial; the count follows from the proposed $N_{\mathrm{scaffold}}(g)=8-2g$, not from primitive ontology alone. The source or destination Noether sea row must be explicit; see [Quantum Number Mapping](../../../../markdown/aaa/assemblies/fermions/quantum-number-mapping.md#generation-step-scaffold-ledger).
- Any reaction-level spin, helicity, polarization, or vector-channel angular-momentum entry is a downstream consumer of the angular-momentum and spin workstream. It should record what must close, not function as a local proof of that closure.

Charge-changing reaction notation is assembly-level shorthand. A weak or high-energy event may change an outgoing assembly's observer-level net charge, but the primitive polarity inventory does not mutate. The ledger must derive the before/after charge from conserved $\epsilon_+/\epsilon_-$ counts, the effective calibration target $|e|=6\epsilon$ where applicable, shielding-state changes, Noether sea participation, and outgoing assembly routing. A reaction map that changes a particle label without this constituent and exposure accounting remains an observer-level placeholder.

### Provenance Protocol

Each reaction record should state:

1. **Observer channel:** the standard reaction label, including historical labels such as `beta decay` only when immediately translated into native reaction language.
2. **Active assemblies:** which incoming assemblies actually reconfigure, and which are spectators.
3. **Noether sea participation:** whether local Noether braids, neutral binaries, axial layers, or medium excitations are consumed, split, reconfigured, or returned.
4. **Constituent inventory:** total $\epsilon_+$ and $\epsilon_-$ counts before and after, separated into braid and axial-layer contributions where the distinction matters.
5. **Polarity and charge accounting:** how observer-level charge bookkeeping emerges from the conserved $\epsilon_+/\epsilon_-$ routing, axial-layer exposure, shielding state, Noether sea participation, and outgoing assembly routing.
6. **Energy-momentum and angular-momentum accounting:** where kinetic energy, internal binding energy, photon assemblies, recoil, medium excitation, spin/vector ledger terms, and wake-carried angular momentum enter and exit.
7. **Path-history provenance:** which emitted causal wakes, source identities, and delayed interactions are needed to make the reaction deterministic in absolute time.
8. **Weak-corridor record, when applicable:** for $W^\pm$ or $Z^0$ channels, record the axial-inventory payload $\Delta A_W$, any neutral Noether braid scaffold recruited into the corridor, the generation-step count $\Delta N_{\mathrm{scaffold}}=-2\,\Delta g$ when applicable, shielded internal energy exposed as corridor stiffness or apparent weak-boson mass, corridor recoil, outgoing-product identity routing, and Noether sea return row.
9. **Radiation event record, when applicable:** for emitted, absorbed, shifted, captured, or failed photon channels, attach the shared event fields from [Radiation](../../../../markdown/aaa/reactions/radiation.md#radiation-event-record-schema), including $E_{\text{exc}}$, $E_\gamma$, recoil, medium excitation, polarization handoff, and causal-wake ledger.
10. **Hybrid Standard Model matching, when applicable:** identify the source for the observer-level prediction: perturbative electroweak chart, matched weak effective theory, lattice-QCD or nuclear matrix element, infrared-safe QCD observable, QED, kinetic model, or detector functional. Include the scheme, operator or observable definition, matching normalization, CKM/PMNS factor when applicable, expansion or scaling parameter, systematic remainder, and regulator-removal or continuum record when one is used.
11. **Closure status:** baseline, provisional map, derivation target, failed map, or inherited gate.

### Record Template

| Field | Required content |
| --- | --- |
| Observer channel | Standard reaction notation and native reaction label |
| Active assembly change | Braid and axial-layer changes for the transformed assembly |
| Noether sea input/output | Neutral braids, axial material, or medium excitations recruited or returned |
| Conserved inventory | $\epsilon_+/\epsilon_-$ totals and charge/polarity balance |
| Energy-momentum and angular-momentum ledger | Internal energy, recoil, emitted assemblies, spin/vector ledger terms, wake-carried angular momentum, and medium excitation |
| Weak-corridor record, when applicable | $\Delta A_W$, neutral Noether braid scaffold sourcing, $\Delta N_{\mathrm{scaffold}}=-2\,\Delta g$ for generation changes, shielded-energy exposure, corridor payload, recoil, product identity routing, and Noether sea return row |
| Radiation event record, when applicable | Source assembly, source-depletion row, trigger geometry, $\delta\Theta_a$, $E_{\text{exc}}$, $E_\gamma$, recoil, medium excitation, polarization handoff, causal-wake ledger, photon Gate B event residual when $E_\gamma\ne0$, and closure status |
| Provenance data | Transmitter identity, emission time, causal-root branch, and local Noether sea state |
| Hybrid Standard Model matching, when applicable | Observer-level prediction source, scheme, operator or observable, matching normalization, CKM/PMNS factor when applicable, matrix-element or factorization source, expansion or scaling parameter, systematic remainder, and regulator-removal or continuum record |
| Closure status | What is established, what is assumed, and what remains to derive |

### High-Energy Collision Records

Collider-scale reactions are the stress case for this ledger because incoming beam work, exposed energy, shielded internal energy, Noether sea updates, and detector-facing products can all change during one event. The record must not treat collision energy as a single undifferentiated input. For every incoming assembly whose internal branch is opened or whose shielding state changes, refine the routed output record as

$$
Y_{\mathsf e}^{\mathrm{coll}}
=
\left(
Y_{\mathsf e},
E_{\mathrm{work}}^{\mathrm{in}},
\{(\mathcal{S}_A^{-},\zeta_A^{-}E_{\text{internal},A}^{-})\}_{A},
\{(\mathcal{S}_B^{+},\zeta_B^{+}E_{\text{internal},B}^{+})\}_{B}
\right),
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b52163966c6d084d)

where the first set ranges over the resolved incoming assemblies and the second set ranges over resolved outgoing or remnant assemblies. This is not a new conservation law. It is a collision-specific refinement of the same event record: shielding loss, shielding gain, dissociation, association, recoil, photon output, medium excitation, Noether sea update, detector-facing products, and any re-shielded remnant must all be named inside the same $\mathcal{L}_{E\mathbf{p}\mathbf{J}}(\mathsf e)$ balance. If the calculation exposes internal energy from an incoming assembly without routing it to one of those named terms, the reaction remains a provisional map rather than a closed provenance record.

Here $\mathsf e$ labels the event, $Y_{\mathsf e}$ its output record, $E_{\mathrm{work}}^{\mathrm{in}}$ the declared external work, and $\mathcal S_A^-$ and $\mathcal S_B^+$ the incoming and outgoing assembly states. The fraction $\zeta$ denotes probe-facing exposure of a physical internal-energy account, as in [Particle Masses](../../../../markdown/aaa/assemblies/particle-masses.md); it is not raw far-field cancellation. Source depletion, exposed energy, recoil, and remnant terms must partition the account without counting the same energy twice. Beam kinetic energy already included in the incoming account is not added again as external work.

#### Hadronization Spin-Correlation Records

High-energy collision records that claim to recover nonperturbative strong-sector behavior must preserve spin and provenance through hadronization, the observer-level formation of composite hadrons from quark and gluon degrees of freedom. The [STAR hyperon-pair measurement](https://pmc.ncbi.nlm.nih.gov/articles/PMC12872435/) supplies a dated detector comparison. Its strange quark-pair origin is an interpretation; the measured quantity is a decay-angular correlation after reconstruction, background, and acceptance corrections. Feed-down means production through decay of a heavier particle and must be included in the response model. None of these observer-level mechanisms is a substrate premise.

A native record for such a channel should therefore add a spin-correlation readout to the collision event:

$$
\mathsf e_{\Lambda\bar{\Lambda}}
=
\left(
X_{\mathrm{coll}},
I_{\mathrm{had}},
Y_{\Lambda\bar{\Lambda}},
\Theta_{\mathrm{decay}},
P_{\Lambda\bar{\Lambda}}(\Delta R)
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5748c27fad026cad)

where $X_{\mathrm{coll}}$ includes the incoming beam and local Noether sea state, $I_{\mathrm{had}}$ is the selected hadronization route, $Y_{\Lambda\bar{\Lambda}}$ names the outgoing hyperon pair and any feed-down or remnant rows, and $\Theta_{\mathrm{decay}}$ records the weak-decay analyser geometry. The comparison residual is not just whether two hyperons are produced. It is whether the same event record recovers

$$
P_{\Lambda\bar{\Lambda}}(\Delta R\ \mathrm{short})>0,
\qquad
P_{\Lambda\bar{\Lambda}}(\Delta R\ \mathrm{long})\approx0,
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0739d971321d33e1)

without changing the source, hadronization, or detector-response record between the two bins. If the short-range signal is matched only by assigning an independent spin label after hadronization, the strong-sector map has fit a detector statistic while failing provenance closure.

Here $P$ is the dimensionless relative-polarization coefficient in STAR's corrected decay-angle distribution, not a probability or a single-event spin label. The separation $\Delta R=\sqrt{(\Delta y)^2+(\Delta\phi)^2}$ uses rapidity difference along the beam and azimuthal-angle difference around it. STAR's short/long comparison uses separate cuts in those two coordinates, not a single radial cutoff: short range has $|\Delta y|<0.5$ and $|\Delta\phi|<\pi/3$; long range has $0.5<|\Delta y|<2.0$ and/or $\pi/3<|\Delta\phi|<\pi$. The displayed signs summarize the measured trend; the long-range result is compatible with zero within uncertainty, not an exact zero. Quantitative recovery must use the same selection, decay-analyser convention, uncertainty model, and bin-dependent acceptance under one response law. Independently specified kinematic variation across bins is legitimate.

### Residual-Routing Event-Ledger Contract

Residual-routing material enters this ledger only as a theorem-target contract. It does not by itself prove that any weak, radiative, pair-production, nuclear, or cosmology-facing reaction channel has closed. The common target is:

$$
\mathcal{R}(\Gamma,\mathcal{H},\rho_{\text{NS}},\chi_{\text{sea}},\dots)
\longrightarrow
\{B_i\}
\longrightarrow
\mathcal{L}_{E\mathbf{p}\mathbf{J}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-60630e8821df770c)

Here $\mathcal{R}$ is the replayable residual computed from the local assembly state, path-history ledger, Noether braid density, Noether sea delay factor, and any named sector variables. The set $\{B_i\}$ is the finite list of admissible output channels, such as retuning, bound excitation, radiation, recoil, medium heating, weak or nuclear reaction, record formation, release channel, or branch transition. The event ledger $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ is the balance object that must close after all selected outputs are named.

The local state is denoted $\Gamma$, its required retained histories $\mathcal H$, the density $\rho_{\text{NS}}$, and the effective delay factor $\chi_{\text{sea}}$. The residual and admissible channels must be derived on a declared history domain; naming them neither constructs a unique evolution nor proves that the chosen reduced state contains all information needed for replay.

For a reaction attempt, the input state should be recorded as:

$$
X
=
\left(
\Gamma,
\mathcal{H},
\rho_{\text{NS}}(\mathbf X,T),
\chi_{\text{sea}}(\mathbf X,T),
Z_S
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f2c3abd2dad6a7db)

where $Z_S$ denotes sector-local variables such as nuclear configuration, weak-corridor data, apparatus state, or horizon-interface boundary data when those variables control the route. A routed reaction event is a triple

$$
\mathsf e=(X,I_{\mathsf e},Y_{\mathsf e})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-80a897b3666bd7af)

where $I_{\mathsf e}$ is the selected finite channel set and $Y_{\mathsf e}$ lists outgoing assemblies, recoil targets, medium updates, remnant states, and provenance records. A single reaction vertex may select more than one output channel when photon output, recoil, medium update, and reaction products are simultaneous terms in one closed event.

The shared ledger object is:

$$
\mathcal{L}_{E\mathbf{p}\mathbf{J}}(\mathsf e)
=
\left(
\Delta_E,
\Delta_{\mathbf{p}},
\Delta_{\mathbf{J}},
\Delta_{\mathrm{pol}},
\Delta_{\mathrm{arch}},
\Delta_{\mathrm{path}},
\Delta_{\mathrm{med}},
\Delta_{\mathrm{rem}}
\right)(\mathsf e)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-11e1de72f52ff6f1)

Ledger closure means:

$$
\mathcal{L}_{E\mathbf{p}\mathbf{J}}(\mathsf e)=\mathbf{0}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2a8a3adca4192257)

componentwise across the tuple. Nonzero physical recoil, medium heating, remnant excitation, outgoing product energy, or photon output is allowed only as a named term inside $Y_{\mathsf e}$; it is not allowed as an implicit loss.

Each $\Delta$ is a discrepancy between independently specified input and output accounts, not the physical amount of that channel. The first three are energy, momentum, and angular-momentum balance defects; polarity and architrino defects compare primitive inventories. Path, medium, and remnant defects require declared record-comparison maps with a specified zero. Unlike counts, a path history is not a conserved scalar. Uncomputed or missing entries are unknown, never zero. A finite numerical record uses predeclared component tolerances, uncertainty bounds, and refinement tests; exact equality is the analytical target. Defining a missing output as the residual would make the check tautological.

A reaction record should also state how the surviving assemblies restabilize after work is done. The compact restabilization record is
$$
\Theta_{\mathrm{restab}}
=
\left(
B_{\mathrm{pre}},
W_{\mathrm{in}},
\Delta\mathcal A,
B_{\mathrm{post}},
\tau_{\mathrm{return}},
\mathcal{L}_{E\mathbf p\mathbf J}^{\mathrm{post}}
\right).
$$

[View →](../../../../../equation-mapping.html#corpus-equation-841b7edb919624f1)

Here $B_{\mathrm{pre}}$ and $B_{\mathrm{post}}$ are the retained branch records before and after the interaction, $W_{\mathrm{in}}$ is the applied work or incoming excitation, $\Delta\mathcal A$ is the branch-action change, $\tau_{\mathrm{return}}$ is the return or relaxation time when a stable branch is recovered, and $\mathcal{L}_{E\mathbf p\mathbf J}^{\mathrm{post}}$ is the post-event balance. This prevents a reaction map from closing only by label replacement while leaving the outgoing assemblies dynamically unsettled.

An action change requires an independently justified action functional; a scalar path statistic alone does not supply it. The return time must identify its clock convention and return criterion, and remain unresolved if the trajectory never returns. Dissociation or escape can be valid outgoing channels without a recovered bound branch.

The stronger event-balance target bundles energy, momentum, and angular momentum instead of checking photon polarization separately from the source ledger. All terms must use one event window, coordinate frame, unit map, and angular-momentum origin. Source internal depletion excludes separately recorded recoil; medium, wake, handoff, and remnant accounts are disjoint signed net gains, with boundary influx negative. A remnant already included in the final source account is not added again. For $\mathcal Q\in\{E,\mathbf p,\mathbf J\}$, define source depletion by

$$
\Delta\mathcal Q_{\mathrm{src}}^{0}
=
\mathcal Q_{\mathrm{src}}^{-}
-
\mathcal Q_{\mathrm{src}}^{+}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d575eaa3ea0af7b8)

A resolved radiative event closes only if

$$
\Delta\mathcal Q_{\mathrm{src}}^{0}
=
\mathcal Q_{\gamma}^{\mathrm{sub}}
+
\mathcal Q_{\mathrm{recoil}}^{0}
+
\mathcal Q_{\mathrm{med}}^{0}
+
\mathcal Q_{\mathrm{wake}}^{0}
+
\mathcal Q_{\mathrm{handoff}}^{0}
+
\mathcal Q_{\mathrm{rem}}^{0}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1d2026d1ba263da1)

with normalized residual

$$
\Delta_{\mathrm{evt}}^\gamma
=
\sum_{\mathcal Q\in\{E,\mathbf p,\mathbf J\}}
\frac{
\left\|
\Delta\mathcal Q_{\mathrm{src}}^{0}
-
\mathcal Q_{\gamma}^{\mathrm{sub}}
-
\mathcal Q_{\mathrm{recoil}}^{0}
-
\mathcal Q_{\mathrm{med}}^{0}
-
\mathcal Q_{\mathrm{wake}}^{0}
-
\mathcal Q_{\mathrm{handoff}}^{0}
-
\mathcal Q_{\mathrm{rem}}^{0}
\right\|
}{
\varepsilon_{\mathcal Q}
+
\left\|
\Delta\mathcal Q_{\mathrm{src}}^{0}
\right\|
}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2506d93e03bb04f0)

For the normalized residual, $\varepsilon_{\mathcal Q}>0$ is a fixed reference scale with the same units as $\mathcal Q$; the norm is absolute value for energy and the declared Euclidean norm for vectors. This makes each summand dimensionless and nonnegative, including zero-depletion cases. The scales and acceptance tolerances must be fixed independently of the result. A small value tests the declared accounts, not the existence or correctness of their physical extraction.

The Gate B angular-momentum row is the $\mathcal Q=\mathbf J$ projection of this same identity. Gate B denotes the photon spin, polarization, and capture-response requirements inherited from the photon program. Let the event window be labeled by superscript $0$, and let $\mathbf J_{\mathrm{src}}^-$ and $\mathbf J_{\mathrm{src}}^+$ be the source angular-momentum ledger before and after the event. Define

$$
\Delta\mathbf J_{\mathrm{src}}^{0}
=
\mathbf J_{\mathrm{src}}^-
-
\mathbf J_{\mathrm{src}}^+
$$

[View →](../../../../../equation-mapping.html#corpus-equation-27e50e7199e1a89f)

The photon event row is

$$
\Delta\mathbf J_{\mathrm{src}}^{0}
=
\mathbf J_{\gamma}^{\mathrm{sub}}
+
\mathbf J_{\mathrm{recoil}}^{0}
+
\mathbf J_{\mathrm{med}}^{0}
+
\mathbf J_{\mathrm{wake}}^{0}
+
\mathbf J_{\mathrm{handoff}}^{0}
+
\mathbf J_{\mathrm{rem}}^{0}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-729845df1c51d616)

Define the corresponding balance defect by

$$
\mathbf B_{\gamma}^{0}
=
\Delta\mathbf J_{\mathrm{src}}^{0}
-
\mathbf J_{\gamma}^{\mathrm{sub}}
-
\mathbf J_{\mathrm{recoil}}^{0}
-
\mathbf J_{\mathrm{med}}^{0}
-
\mathbf J_{\mathrm{wake}}^{0}
-
\mathbf J_{\mathrm{handoff}}^{0}
-
\mathbf J_{\mathrm{rem}}^{0}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9c4e96401d520bed)

For a Gate B-admissible photon helicity eigenstate, the following is an observer-level recovery target. Here $\hat{\mathbf k}$ is a unit propagation direction, and $\mathbf J_{\gamma}^{\mathrm{sub}}$ is the candidate substrate-derived angular account whose intrinsic longitudinal projection must be matched to photon spin. The two-valued outcome is not implied by conservation. A polarization superposition or ensemble need not have mean helicity $\pm1$. In this normalization, $\hbar>0$ is the action benchmark to be recovered by the shared action-alignment map, not an established output or an event-local fit.

$$
\lambda_{\mathrm{hel}}
=
\frac{\hat{\mathbf k}\cdot\mathbf J_{\gamma}^{\mathrm{sub}}}{\hbar},
\qquad
\lambda_{\mathrm{hel}}\in\{+1,-1\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-30eced4a51e02da5)

The event balance bounds the projection error by the Euclidean Cauchy–Schwarz inequality $|\hat{\mathbf k}\cdot\mathbf B|\le\|\mathbf B\|$:

$$
\left|
\frac{\hat{\mathbf k}\cdot\mathbf J_{\gamma}^{\mathrm{sub}}}{\hbar}
-
\frac{
\hat{\mathbf k}\cdot
\left(
\Delta\mathbf J_{\mathrm{src}}^{0}
-
\mathbf J_{\mathrm{recoil}}^{0}
-
\mathbf J_{\mathrm{med}}^{0}
-
\mathbf J_{\mathrm{wake}}^{0}
-
\mathbf J_{\mathrm{handoff}}^{0}
-
\mathbf J_{\mathrm{rem}}^{0}
\right)
}{\hbar}
\right|
\le
\frac{\|\mathbf B_{\gamma}^{0}\|}{\hbar}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7dfed49d1a382e14)

The normalized event-balance residual is

$$
\Delta_{\mathrm{bal}}^\gamma
=
\frac{
\left\|
\Delta\mathbf J_{\mathrm{src}}^{0}
-
\mathbf J_{\gamma}^{\mathrm{sub}}
-
\mathbf J_{\mathrm{recoil}}^{0}
-
\mathbf J_{\mathrm{med}}^{0}
-
\mathbf J_{\mathrm{wake}}^{0}
-
\mathbf J_{\mathrm{handoff}}^{0}
-
\mathbf J_{\mathrm{rem}}^{0}
\right\|
}{
1+\left\|\Delta\mathbf J_{\mathrm{src}}^{0}\right\|
}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-16c9cd66b736dd8e)

This last ratio uses dimensionless angular-momentum coordinates: divide every angular quantity by the same fixed positive reference action before evaluating it. In dimensional coordinates it is equivalently $\|\mathbf B_{\gamma}^{0}\|/(J_*+\|\Delta\mathbf J_{\mathrm{src}}^0\|)$ with reference action $J_*>0$; the numeral one cannot be added to a dimensional action. Missing source, recoil, medium, wake, handoff, or remnant rows keep the photon record provisional even when the outgoing photon substrate ledger is algebraically clean.

#### Provenance-Preserving Polarity Inventory

Count conservation is not enough for reaction closure. Since the ontic architrino set $\mathcal{A}$ is fixed, every serious reaction record must route identity-labeled architrinos through the event after expanding the input and output state to include any explicitly recruited or returned Noether sea content.

Let $R_{\mathsf e}^{\mathrm{in}}\subset\mathcal{A}$ and $R_{\mathsf e}^{\mathrm{out}}\subset\mathcal{A}$ denote the participating architrino identities before and after the event. A closed event must supply a bijection
$$
\Pi_{\mathsf e}:R_{\mathsf e}^{\mathrm{in}}\to R_{\mathsf e}^{\mathrm{out}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8909242d8a237edc)

For global ontic identity labels, expand both sides to include every participating reservoir and boundary-crossing constituent. The resulting sets must be equal, and $\Pi_{\mathsf e}(a)=a$: the same architrino continues along its own worldline while its assembly membership may change. If endpoint records use local labels, supply their maps to the global labels and require the composed route to preserve the global identity. A same-polarity permutation without worldline provenance does not meet this condition. In particular, for every routed identity $a$,
$$
q_{\Pi_{\mathsf e}(a)}=q_a,\qquad
q_a=\sigma_a\epsilon,\qquad
\sigma_a\in\{-1,+1\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c4fd41e2c372412c)

As a necessary consequence, the polarity inventory vector, with each count restricted to the appropriate finite participating input or output set,
$$
\mathbf{N}_{\mathsf e}
=
\left(
\#\{a:q_a=-\epsilon\},
\#\{a:q_a=+\epsilon\}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-dbe4751658e9ad74)

must agree before and after the event once all named reservoir terms are included. Equal counts alone are insufficient: replacing one positive identity with a different positive identity preserves the vector while losing provenance. Causal wakes are history records, not additional architrinos; assigning them energy or angular momentum still requires the physical account above. Photon assemblies and corridor payloads do not create new elements of $\mathcal A$. If a pair-production, weak, charged-pair relock, bremsstrahlung, synchrotron, or scattering record lacks $\Pi_{\mathsf e}$ or an equivalent identity-routing statement, the record remains provisional even when its net observer-level charge balances.

The contract for each serious channel is:

| Contract field | Required content |
| --- | --- |
| Residual | Define $\mathcal{R}$ from the local state, causal-wake ledger, density field, Noether sea delay factor, and sector variables. |
| Threshold or separatrix | State the critical surface, basin boundary, channel boundary, or return-map condition that selects an admissible route. |
| Candidate channels | List the allowed routes, including radiative, recoil, medium, reaction, remnant, or record-forming terms when applicable. |
| Event ledger | Close $E$, $\mathbf{p}$, $\mathbf{J}$, charge/provenance, recoil, medium update, remnant state, architrino inventory, and identity routing where applicable. |
| Benchmark recovery | Name the observer-level reaction, cross-section, threshold, rate, or conservation benchmark recovered by the route. |
| Closure status | Mark the record as baseline, provisional map, derivation target, failed map, or inherited gate. |

#### Promotion Criterion

A reaction record may be promoted beyond a provisional map only when all of the following conditions have been met in the same sector case:

1. **Replayable residual:** $\mathcal{R}(X)$ is computed from $\Gamma$, $\mathcal{H}$, $\rho_{\text{NS}}(\mathbf X,T)$, $\chi_{\text{sea}}(\mathbf X,T)$, and explicitly named sector variables, with no hidden sector-specific residual term.
2. **Boundary selection:** each selected channel has a stated boundary test $g_i(X,\mathcal{R})\ge0$, and every excluded channel required by the sector either fails its boundary test or is ruled out by a compatibility condition.
3. **Admissible output:** $Y_{\mathsf e}$ names all outgoing assemblies, recoil targets, medium updates, remnant states, and provenance records required by the selected channel set.
4. **Ledger closure:** $\mathcal{L}_{E\mathbf{p}\mathbf{J}}(\mathsf e)=\mathbf{0}$ after adding the sector-required charge, polarity, architrino-inventory, identity-routing, path-history, Noether sea, and remnant rows.
5. **Benchmark compatibility:** the promoted event recovers the sector benchmark without breaking any required weak, quantum, gravity, hadronic, radiation, cosmology, conservation-law, or direct-observation acceptance gate.

This is a promotion criterion, not a completed theorem. Worked sector cases remain open until at least one channel supplies a named residual, a named threshold or separatrix, a channel decision, a complete $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ ledger, a benchmark recovery, and a failure diagnostic in one record. The free-neutron beta reaction, the $t\to b+W^+$ channel, radiation-coupled pair channels, and nuclear reaction examples therefore remain provisional where their sector records still lack closed residual routing, outgoing braid provenance, angular-momentum balance, rate recovery, or quantitative benchmark closure.

#### Failure Modes

| Failure mode | What blocks promotion |
| --- | --- |
| Residual replay failure | Two records with the same $(\Gamma,\mathcal{H},\rho_{\text{NS}},\chi_{\text{sea}},Z_S)$ produce different $\mathcal{R}$ values or different selected channel sets without an additional recorded state variable. |
| Boundary failure | A resolved event occurs while every required $g_i(X,\mathcal{R})<0$, or two mutually exclusive selected channels demand incompatible output assignments. |
| Ledger residual failure | After all sector-required rows are included, $\Delta_E\ne0$, $\Delta_{\mathbf{p}}\ne\mathbf{0}$, or $\Delta_{\mathbf{J}}\ne\mathbf{0}$. |
| Inventory or provenance failure | $\Delta_{\mathrm{pol}}\ne0$, $\Delta_{\mathrm{arch}}\ne0$, or $\Delta_{\mathrm{path}}\ne0$ after the claimed Noether sea, corridor, transmitter-identity, emission-time, causal-root, and branch-Jacobian records are included. |
| Identity-routing failure | No worldline-supported $\Pi_{\mathsf e}$, or equivalent route preserving global identities, maps participating input architrinos to participating output architrinos after named Noether sea reservoir and boundary terms are included. Equal polarity counts or an arbitrary same-polarity bijection do not suffice. |
| Medium or remnant failure | $\Delta_{\mathrm{med}}\ne0$ or $\Delta_{\mathrm{rem}}\ne0$, meaning the route used medium heating, recoil, retained excitation, or remnant deformation as an implicit loss term. |
| Retuning failure | The same benchmark family can be recovered only by changing the residual law, channel-boundary law, or fitted medium inputs after seeing each result. Independently specified or dynamically predicted Noether sea state variation under one fixed law is legitimate. |
| Cross-sector failure | The local route succeeds only by violating another required sector acceptance gate. |

### Weak-Corridor Provenance Gate

Weak reactions require an explicit corridor-provenance stance. Two proposed bookkeeping alternatives are:

1. **Transaction-payload corridor:** $W^\pm$ carries the charged triad payload and phase relation, while final-state pro/anti Noether braid material is supplied by the local Noether sea or by explicitly identified incoming assemblies.
2. **Provenance-carrying corridor:** $W^\pm$ carries not only the charged transaction payload but also enough pro/anti Noether braid provenance to seed some final-state lepton or antilepton braid content.

The ledger should not choose between these silently. For each serious weak record, add a row or note that states which stance is being used, which Noether braid material enters and exits, and what would falsify the accounting. This gate is coupled to the weak-coupling-triad exposure problem: the same geometry that permits left-handed charged-current docking must also determine which corridor payload can be transferred and where the outgoing lepton braids come from.

Minimum weak-channel records should therefore include:

- the active weak-coupling-triad transition,
- the corridor provenance stance,
- all Noether sea or incoming-assembly braid material used for charged lepton and neutrino outputs,
- the CKM/PMNS overlap weight when a flavor or generation branch is selected,
- and the energy, angular momentum, polarity, and path-history terms needed for deterministic replay.

### Weak Reaction Case: $t \to b + W^+$ Channel

Observer-level notation:

$$
t \to b + W^+,\qquad W^+ \to e^+ + \nu_e
$$

[View →](../../../../../equation-mapping.html#corpus-equation-469dba1ff1902953)

Native status: provisional weak-reaction provenance map.

In the candidate assembly catalog, the active quark change is modeled as an axial-layer reconfiguration from the top axial pattern to the bottom axial pattern:

$$
(5\epsilon_+ + 1\epsilon_-)_{\text{axial}} \to (2\epsilon_+ + 4\epsilon_-)_{\text{axial}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d69b17996828fffc)

Equivalently, the active quark sector requires a $+3\epsilon_-,-3\epsilon_+$ axial-inventory change. In observer language this is the $W^+$ channel. In substrate language it is a transient payload and coupling event whose geometry, chirality selection, and energy routing still need closure.

This is exchange of fixed-polarity constituents, never conversion of an individual polarity. The quark's signed inventory changes by $-6\epsilon$, balanced by the opposite corridor/reservoir change under the declared charge map. Both quarks are generation III, so this proposed transition has $\Delta g=0$ and no scaffold-count change; that arithmetic does not source the positron and neutrino material.

The lepton products cannot be asserted as creation from nothing. Their braid and axial-layer material must be drawn from a local Noether sea reservoir or from explicitly identified incoming assemblies. The provisional ledger target is:

| Component | Ledger requirement | Status |
| --- | --- | --- |
| Top-to-bottom axial exchange | Route the $+3\epsilon_-,-3\epsilon_+$ change through a weak-channel coupling event | Provisional |
| Positron assembly | Identify the Noether braid and axial material used to form the charged lepton output | Provisional |
| Electron-neutrino assembly | Identify neutral braid and axial-layer routing, including chirality/orientation | Provisional |
| Energy-momentum | Account for quark mass difference, lepton energies, recoil, and medium excitation | Derivation target |
| Weak geometry | Derive the left-handed selection rule and allowed coupling operator | Derivation target |

This channel should not be presented as a completed architrino derivation until the inventory table balances polarity-unit counts, braid orientation, axial-layer routing, and energy-momentum in one consistent record.

### Free Neutron Beta Reaction

Observer-level notation:

$$
n \to p + e^- + \bar{\nu}_e
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ccf161f1794267ba)

with the active quark-level comparison

$$
d \to u + W^-,\qquad W^- \to e^- + \bar{\nu}_e
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e1c1de79d984acfb)

Native interpretation: one down-like constituent assembly changes its axial occupancy while the outgoing proton, electron, and antineutrino accounts are assembled. The quark-level $W^-$ notation is an internal weak-interaction comparison, not an emitted on-shell W boson in free-neutron decay or proof of a propagating substrate corridor.

The proposed spectator assignment keeps one $u$ and one $d$ constituent identity through the reaction. Spectator identity does not require unchanged motion, binding, or wake history as the neutron becomes a proton. The active channel is the other down-like assembly reconfiguring into an up-like assembly.

The axial-layer comparison is:

$$
(2\epsilon_+ + 4\epsilon_-)_{\text{axial}} \to (5\epsilon_+ + 1\epsilon_-)_{\text{axial}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5b1e3302723ef84a)

So the active quark assembly has a three-unit decrease in negative-polarity axial occupancy and a matching three-unit increase in positive-polarity axial occupancy. The natural provenance hypothesis is that local neutral Noether sea material supplies the compensating polarity units while the released negative-polarity axial material participates in electron axial-layer formation.

#### Exposure-operator record

The controlled beta channel has a first finite-state exposure operator in [Weak-Mixing CKM](../../../../markdown/aaa/philosophy-history/theory-bridges/weak-mixing-ckm.md). The ledger record for this channel should use that operator as the geometry gate before any rate or provenance claim is made.

The operator is a conditional test model. Its left/right handedness labels and blocked channel are supplied assumptions until the same retained geometry derives the selection; they are not independent evidence for chirality. CKM and PMNS denote observer-level flavor-mixing matrices; $V_{ud}$ is the up/down CKM amplitude, requiring an independently defined pair of bases before a geometric overlap is predictive.

This gate inherits the unresolved spinor/helicity proof in [Angular Momentum and Spin](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md). The blocked right-handed branch, antineutrino orientation, and weak-channel angular-momentum balance remain provisional until the weak-coupling-triad exposure geometry and the reaction-level angular-momentum ledger are derived from the same substrate proof.

| Gate field | Beta-reaction record |
| --- | --- |
| Active assembly | One generation-I down-like quark inside the neutron |
| Spectators | One $u$ and one $d$ assembly pass through by identity |
| Exposure domain | $\Sigma_{\mathrm{WCT}}^{(L)}$ on the leading, phase-matched weak-coupling triad |
| Gate condition | Left-handed charged-current docking with $\lvert\Sigma_{\mathrm{WCT}}^{(L)}\rvert=3$ and active inventory $3\epsilon_-$ |
| Blocked condition | Right-handed $d$ channel has no charged-corridor docking in the finite-state model |
| Quark-side action | $A_{\Sigma}=3\epsilon_-\to3\epsilon_+$, with shielded inventory $A_{\mathrm{sh}}=(2\epsilon_+ + 1\epsilon_-)$ unchanged |
| Corridor payload | Proposed $W^-$ transaction $\Delta A_W=3(\epsilon_- - \epsilon_+)$, signed net change $-6\epsilon=-|e|$ under the declared charge normalization; a signed inventory difference is not a list of six physical payload constituents |
| CKM weight | $V_{ud}$, interpreted as the same-tier weak-basis to shielding-eigenstate overlap |
| Provenance stance | Transaction-payload corridor unless a later derivation proves provenance-carrying corridor content is required |

This record keeps the beta reaction from becoming two separate stories. The same exposed triad must explain the left-handed selection rule, supply the $V_{ud}$ overlap domain, and identify what the $W^-$ corridor transfers. The remaining open work is to identify the electron and antineutrino braid provenance and then attach the energy, angular momentum, recoil, and path-history terms.

The conservative ledger is:

| Component | Required provenance statement | Closure status |
| --- | --- | --- |
| Active $d \to u$ assembly | Route the $3\epsilon_-\to3\epsilon_+$ active axial-layer transition | Provisional map |
| Electron assembly | Combine the released $3\epsilon_-$ contribution with additional local Noether sea material and a suitable braid | Provisional map |
| Antineutrino assembly | Identify neutral braid orientation, axial-layer routing, and weak-channel phase relation | Open derivation target |
| Noether sea | Record every neutral braid, axial layer, or medium excitation consumed or returned | Required |
| Energy and angular momentum | Track mass difference, recoil, electron kinetic energy, antineutrino energy, and medium response | Required |

This map supports a strong but bounded claim: beta reaction charge bookkeeping can be interpreted as local separation and rerouting of neutral Noether sea material plus active quark axial reconfiguration. It does not yet establish a full weak-interaction derivation, because chirality selection, antineutrino routing, and quantitative rate closure still belong to the weak-sector closure program.

#### Method-Resolved Lifetime Benchmark

The lifetime benchmark should not be reduced to a single scalar until the experimental comparison channel is declared. The [PDG 2024 neutron listing, mean-life section](https://pdg.lbl.gov/2024/listings/rpp2024-list-n.pdf) averages ultracold-neutron storage measurements at $\tau_n^{\mathrm{UCN}}=878.4\pm0.5\,\mathrm{s}$, while the in-beam trapped-proton result `YUE 13` reports $\tau_n^{\mathrm{beam}}=887.7\pm1.2_{\mathrm{stat}}\pm1.9_{\mathrm{syst}}\,\mathrm{s}$. That edition excludes the beam row from its main average and includes a scale factor of 1.8 in the quoted storage uncertainty. These are dated comparison rows, not a claim about the latest average. Storage counts surviving neutrons; the beam method counts decay protons relative to neutron flux. Their disagreement alone does not establish a hidden reaction channel.

A native closure attempt should therefore publish two readouts from the same free-neutron beta-reaction record:

$$
\mathcal{R}_{\tau_n}^{\mathrm{method}}
=
\left(
\frac{\tau_n^{\mathrm{UCN}}-\tau_n^{\mathbb{A}\mathbb{A}\mathbb{A}}}{\sigma_{\mathrm{UCN}}},
\frac{\tau_n^{\mathrm{beam}}-\tau_{n,p}^{\mathbb{A}\mathbb{A}\mathbb{A}}}{\sigma_{\mathrm{beam}}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a1d64e6af84992a8)

Here $\tau_n^{\mathbb{A}\mathbb{A}\mathbb{A}}$ is the storage-style survival lifetime predicted by the branch record, while $\tau_{n,p}^{\mathbb{A}\mathbb{A}\mathbb{A}}$ is the proton-counting readout in a beam geometry. The two entries must share the same weak-coupling-triad exposure, $V_{ud}$ overlap, lepton-provenance, recoil, and Noether sea rows. If the method residual remains nonzero after known detector, trap, wall-loss, and normalization systematics are represented at observer level, the residual stays an unresolved comparison pressure; it should not be promoted to hidden-channel ontology without explicit reaction provenance and null-result closure.

For this dated diagnostic, $\sigma_{\mathrm{UCN}}=0.5\,\mathrm{s}$ and $\sigma_{\mathrm{beam}}=\sqrt{1.2^2+1.9^2}\,\mathrm{s}$ only under independent statistical/systematic quadrature. Both denominators must be positive. Prediction uncertainty, common calibration covariance, and method-specific nuisance parameters must enter a quantitative likelihood; these two normalized discrepancies are not automatically independent significance scores. Nonzero noisy residuals are expected and are judged against a predeclared uncertainty model, not exact zero. The shared record means one common reaction law with independently specified experimental environments and response maps, not identical trap and beam states.

### Closure Targets

The reaction ledger needs at least four tables for each serious channel:

1. **Constituent inventory table:** braid and axial-layer $\epsilon_+/\epsilon_-$ counts for every input, output, Noether sea contribution, and returned medium product.
2. **Energy-momentum table:** internal energy changes, kinetic output, recoil, photon assemblies, neutrino channel, and medium excitation.
3. **Geometry table:** axial frame, braid orientation, chirality, polarity routing, and allowed coupling/docking geometry.
4. **Path-history table:** causal-root branches, source identities, emission times, and local Noether sea state variables needed for deterministic replay.

Radiative or photon-coupled channels also need the shared radiation event-record table. The polarization handoff in that table remains inherited from Gate B; this ledger records the required transverse and capture/rejection fields but does not derive photon spin locally.

### Validation Links

- Weak-sector geometry and chirality closure remain tied to [Quantum Number Mapping](../../../../markdown/aaa/assemblies/fermions/quantum-number-mapping.md), [Weak Mixing Angle](../../../../markdown/aaa/assemblies/fermions/weak-mixing-angle.md), and [Weak-Mixing CKM](../../../../markdown/aaa/philosophy-history/theory-bridges/weak-mixing-ckm.md).
- Radiative and pair-production provenance should use [Synchrotron](../../../../markdown/aaa/reactions/synchrotron.md), [Bremsstrahlung](../../../../markdown/aaa/reactions/bremsstrahlung.md), and [Reaction-Cosmology Provenance Ledger](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md).
- Parameter closure belongs in [Parameter Ledger](../../../../markdown/aaa/validation/parameter-ledger.md).

## Reaction-Cosmology Provenance Ledger

This ledger connects local reaction provenance to cosmology-facing radiation, thermalization, and source-history claims. It is the bridge record for channels where synchrotron cascades, bremsstrahlung, pair production, BBN photon loading, and CMB thermalization all depend on the same underlying bookkeeping.

Use it with [Reaction Ledger](../../../../markdown/aaa/validation/reaction-ledger.md), [Radiation](../../../../markdown/aaa/reactions/radiation.md#radiation-event-record-schema), [Synchrotron](../../../../markdown/aaa/reactions/synchrotron.md), [Bremsstrahlung](../../../../markdown/aaa/reactions/bremsstrahlung.md), [BBN Constraints](../../../../markdown/aaa/cosmology/BBN-constraints.md), and [CMB](../../../../markdown/aaa/cosmology/CMB.md).

### Purpose

Cosmology-facing reaction claims need more than a source story. They need a record of what enters and exits each channel at the substrate level, and how those local channels become observer-level background quantities such as photon bath temperature, $N_{\text{eff}}$ (the effective number of light relativistic species inferred from the radiation energy budget), light-element yields, redshift, and TT/TE/EE spectra (the angular power spectra of the CMB temperature and polarization and their cross-correlation).

This ledger separates four levels:

- **Ontology:** architrinos, Noether braids, axial layers, photon assemblies, and the Noether sea itself; the Noether sea state variables used below, the braid density $\rho_{\text{NS}}$, its normalized form $n$, and the delay factor $\chi_{\text{sea}}$, are coarse-grained descriptors of that content rather than additional primitives.
- **Reaction mechanics:** association, dissociation, planar-mode nucleation, pair production, recoil, and medium excitation.
- **Transport and thermalization:** opacity, scattering, cascade depth, diffusion, cooling, path-history redshift, and signed photon-frequency exchange.
- **Effective observables:** emissivity, light-element yield, blackbody spectrum, anisotropy, polarization, and inferred cosmological parameters.

### Leap Opportunity Record

The ledger tests a possible unification of four related bookkeeping problems: radiative planar-mode nucleation, pair-production provenance, BBN photon loading, and CMB thermalization. The shared claim is not that these channels are already derived from one equation. The disciplined claim is that they may need one common provenance ledger because each asks the same question at a different scale: which assemblies, Noether braid material, energy-momentum terms, and Noether sea state variables enter and exit the channel?

#### Claim Status

| Claim | Bucket | Status | Decision gate |
| --- | --- | --- | --- |
| Bremsstrahlung and synchrotron both require planar-mode nucleation from assembly stress or wake concentration | Derivation-closure target | Provisional map | A common threshold condition must recover standard emissivity scalings in validated regimes |
| Pair production reorganizes local substrate content rather than creating charged assemblies from nothing | Ontology plus derivation-closure target | Accepted as ontology framing, open as quantitative derivation | Event records must balance architrino inventory, energy-momentum, and Breit-Wheeler rate behavior |
| BBN photon loading can be supplied by the same radiation and pair channels used in high-energy transport | Speculation promoted to closure target | Open | The source-zone photon ledger must preserve D, $^4$He, Li, and $N_{\text{eff}}$ constraints without per-source retuning |
| CMB blackbody recovery can be treated as source-to-transport-to-decoupling provenance rather than as an isolated source story | Derivation-closure target | Open | Thermalization depth, damping, anisotropy, polarization, and redshift handoff must all survive one shared parameter map |

#### Discussion Gate

Before this bridge is promoted from ledger opportunity to mainline cosmology doctrine, the corpus needs a first quantitative record for at least one full path:

$$
\text{source channel}
\rightarrow
\text{photon or pair assembly output}
\rightarrow
\text{thermalization path}
\rightarrow
\text{observer-level background variable}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1a80b835ef4ef7cf)

The minimal useful first path is BBN photon loading: identify a source-zone radiation channel, record its event-level provenance, propagate it through the local thermalization assumptions, and show whether it can support an effective baryon-to-photon number ratio $\eta_B\approx6\times10^{-10}$ during the deuterium bottleneck window. The bottleneck window is the interval in which the photon bath is still energetic enough to dissociate newly formed deuterium faster than it forms, so that nucleosynthesis waits until the bath cools; because photons outnumber baryons by roughly $10^{9}$ to one, even the high-energy tail of the bath matters, and the reference value is the post-annihilation ratio fixed by the present CMB photon density, as recorded in [BBN Constraints](../../../../markdown/aaa/cosmology/BBN-constraints.md).

### Shared Provenance Fields

| Field | What must be recorded | Why it matters |
| --- | --- | --- |
| Architrino inventory | $\epsilon_+/\epsilon_-$ counts, braid/axial-layer separation, and identity routing for recruited or returned substrate content | Prevents creation-from-nothing wording in pair and weak channels |
| Noether sea state | $\rho_{\text{NS}}(\mathbf X,T)$, $n(\mathbf X,T)$, $\chi_{\text{sea}}(\mathbf X,T)$, anisotropy, and excitation state | Keeps density, delay, and transport variables distinct |
| Noether sea recruitment and return | Neutral Noether braid content recruited into a reaction, returned to the ambient population, reclassified into another branch, or left as local excitation | Treats the Noether sea as a participant in vertices that change apparent inventory, not as a passive background |
| Radiation event record | Source assembly, trigger geometry, the phase-closure mismatch $\delta\Theta_a$ of each active binary index $a$, the excess excitation energy $E_{\text{exc}}$ above the nearest stable rung, the photon energy $E_\gamma$, recoil, medium excitation, polarization handoff, causal-wake ledger, and closure status | Provides the local event schema that can be propagated into source-zone, transport, and observer-level cosmology claims |
| Photon assembly channel | Planar-mode nucleation threshold, emitted energy, direction, polarization basis, and transverse angular-momentum ledger | Links bremsstrahlung, synchrotron, and CMB photon-bath claims |
| Pair channel | Incoming photon assemblies, the declared provenance fork (direct rearrangement of the photon constituents, or recruited and returned neutral Noether braid content), identity routing under that fork, final $e^+e^-$ assemblies, and recoil/medium excitation | Keeps pair production as association from local substrate content, not ex nihilo creation |
| Energy-momentum ledger | Internal energy, kinetic energy, recoil, emitted assemblies, and medium excitation | Required for observer-rate and spectrum recovery |
| Thermalization path | scattering depth, coupling time, cooling time, and escape time | Determines when local reactions can feed BBN or CMB background claims |
| Observer handoff | emissivity, opacity, redshift kernel, effective temperature, $N_{\text{eff}}$, and $C_\ell$ inputs | Keeps standard comparison variables useful without treating them as ontology |

### Photon Closure Gates

Photon-channel records should be sorted into three gates before they are used in cosmology-facing arguments.

The chapter-level source for the photon ontology and Gate A theorem scaffold is [Electroweak Bosons](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md#photon-closure-interface). This ledger records what a reaction or cosmology channel must carry forward from that scaffold before it uses photon propagation, polarization, pair production, or thermal radiation as settled input. Gate B is downstream of [Angular Momentum and Spin](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md); the fields below are acceptance records, not an independent derivation of photon spin or polarization statistics. Photon-pair Bell/CHSH claims (correlation tests between the polarization outcomes of two photons, whose bounds depend on the single-photon statistics that Gate B must recover) and CMB polarization-transfer claims must therefore inherit Gate B and the pair-provenance measure rather than being closed by cosmology bookkeeping alone.

| Gate | Claim bucket | What the ledger must track | Closure test |
| --- | --- | --- | --- |
| Gate A: kinematics and optics | Derivation-closure target | $c_f$, $c_\gamma$, $\delta_\gamma\equiv1-c_\gamma/c_f$, planar-pair spacing $d$, phase frequency $\omega$, phase wavelength $\lambda_\gamma$, geometric phase, and medium delay state | Recover $E_\gamma=h\nu$, $p_\gamma=h/\lambda_\gamma$, masslessness, no rest proper-time branch, nondispersion, and no unacceptable preferred-frame leakage without identifying phase wavelength with carrier radius, pair spacing, or packet extent |
| Gate B: polarization and spin | Derivation-closure target | transverse ledger orientation, analyzer basis, helicity, projection/capture geometry, accepted/rejected channel outcomes, source depletion, recoil, causal-wake, handoff, and event-balance rows | Recover exactly two transverse modes, no longitudinal mode, Malus' law, helicity $\pm1$, single-photon statistics, no-signaling constraints, and the photon Gate B event residual $\mathcal R_{\gamma B}^{\mathrm{event}}$ below tolerance |
| Gate C: vertices and transitions | Derivation-closure target | emission, absorption, pair production, recoil, medium excitation, transition rates, and overlap/capture probabilities | Recover QED/Maxwell limits, Breit-Wheeler thresholds and rates, blackbody behavior, Compton-like scattering, photon-photon limits, and the effective electromagnetic coupling scale $\alpha_{\mathrm{EM}}$ (written $\alpha$ in Electroweak Bosons; this ledger reserves bare $\alpha$ for a neutrino flavor label below) |

These gates are not separate ontologies. They are bookkeeping filters that prevent a local photon-source story from being used as cosmology doctrine before the same event record also closes photon transport, polarization, pair conversion, and observer-level comparison variables. The shared radiation event record is the carrier for those gate handoffs; Gate B remains inherited and is not re-derived by this cosmology ledger.

### Channel Map

| Channel | Source document | Provenance target | Status |
| --- | --- | --- | --- |
| Bremsstrahlung planar-mode nucleation | [Bremsstrahlung](../../../../markdown/aaa/reactions/bremsstrahlung.md) | Record electron assembly energy loss, target recoil, photon assembly output, and medium excitation | Provisional map |
| Synchrotron planar-mode nucleation | [Synchrotron](../../../../markdown/aaa/reactions/synchrotron.md) | Derive photon output from curved charged-assembly transport in anisotropic Noether sea states | Provisional map |
| Breit-Wheeler pair channel | [Synchrotron](../../../../markdown/aaa/reactions/synchrotron.md) | Record incoming photon assemblies, the declared provenance fork with its recruited or returned Noether braid content, and final $e^+e^-$ assemblies | Derivation target |
| BBN photon bath | [BBN Constraints](../../../../markdown/aaa/cosmology/BBN-constraints.md) | Show that pair, bremsstrahlung, synchrotron, and related channels maintain effective $\eta_B\approx6\times10^{-10}$ during the bottleneck window | Closure target |
| CMB thermal spectrum | [CMB](../../../../markdown/aaa/cosmology/CMB.md) | Show that source emission, transport, and thermalization produce a near-blackbody photon bath with allowed anisotropy and damping structure | Closure target |
| Horizon-interface photon release | [Black Holes](../../../../markdown/aaa/spacetime/black-holes.md#horizon-adjacent-photon-channel) and [CMB](../../../../markdown/aaa/cosmology/CMB.md#horizon-interface-photon-release-candidate) | Record photon-channel or photon-channel-adjacent packets processed near the symmetry-breaking threshold, including interior blueshift, exterior redshift, thermalization, and release-channel selection | Candidate strong-field source record |
| Intergalactic pair/reaction production | [CMB](../../../../markdown/aaa/cosmology/CMB.md), [Expansion Mechanism](../../../../markdown/aaa/cosmology/expansion-mechanism.md), and [Dark Matter](../../../../markdown/aaa/cosmology/dark-matter.md) | Inventory photon, neutrino, plasma, cosmic-ray, neutral-assembly, and Noether sea source components before using sparse visible matter as an ontology argument | Source-component target |
| Redshift and clock handoff | [Expansion Mechanism](../../../../markdown/aaa/cosmology/expansion-mechanism.md) | Map photon transport through $\rho_{\text{NS}}$, $n$, $\chi_{\text{sea}}$, and clock-rate comparison | Effective summary with open derivation |
| Sunyaev-Zeldovich / Compton-like frequency exchange | [CMB](../../../../markdown/aaa/cosmology/CMB.md#sunyaev-zeldovich-path-history-calibration) and [Radiation](../../../../markdown/aaa/reactions/radiation.md#path-frequency-exchange) | Record incoming photon packet, intervening electron or medium state, outgoing frequency, recoil, medium energy change, and thermalization side effects | Calibration entry and closure target |

### Minimum Records by Channel

Each minimum record below specializes the shared event schema in [Radiation](../../../../markdown/aaa/reactions/radiation.md#radiation-event-record-schema). Additional cosmology variables may be added, but the source assembly, source-depletion row, trigger geometry, the phase-closure mismatch $\delta\Theta_a$ of each active binary index $a$, the excess excitation energy $E_{\text{exc}}$ above the nearest stable rung, the photon energy $E_\gamma$ (recorded separately for incoming and outgoing photons when the event captures or scatters), recoil, medium excitation, polarization handoff, photon Gate B event residual when $E_\gamma\ne0$, causal-wake ledger, identity routing, and closure status fields remain required. Throughout this ledger, an energy entry written $\Delta E$ with a counterparty subscript is the final-minus-initial gain of that counterparty over the event window, in one declared frame, so that a photon energy loss is balanced by equal recorded gains elsewhere.

#### Bremsstrahlung

The minimum event record carries the reduced relaxation budget of [Bremsstrahlung](../../../../markdown/aaa/reactions/bremsstrahlung.md):

$$
E_{\text{exc}}^{\mathrm{br}}
=
E_\gamma
+
\Delta E_{\text{recoil}}
+
\Delta E_{\text{med}}
+
\Delta E_{\text{rem}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b9cc5364cea8d5e3)

Here $E_{\text{exc}}^{\mathrm{br}}$ is the bremsstrahlung excitation energy prepared by the deceleration event, $E_\gamma$ is the emitted photon energy, and $\Delta E_{\text{recoil}}$, $\Delta E_{\text{med}}$, and $\Delta E_{\text{rem}}$ are the gains of the target recoil account, the Noether sea excitation account, and the excitation retained above the chosen final reference. This reduced budget is the minimum record only under the conditions its owner states: external driving has ended, the wake and handoff energy changes vanish within the declared tolerance, and no reaction product carries energy away. Otherwise the wake, handoff, and reaction terms of the general schema remain explicit, and the reduced equation is not a substitute for the full source-depletion balance. The provenance record must also include the source electron assembly, target assembly, source-depletion row, trigger geometry, $\delta\Theta_a$, local $\rho_{\text{NS}}(\mathbf X,T)$, $n(\mathbf X,T)$, $\chi_{\text{sea}}(\mathbf X,T)$, planar-mode threshold status, emitted photon assembly direction, recoil, medium excitation, causal-wake ledger, identity routing, closure status, and whether the event occurs in a regime where standard free-free emissivity remains the observer-level scaffold. Its polarization handoff inherits photon Gate B rather than deriving photon spin locally, and the record remains provisional until the event residual routes source, recoil, medium, wake, handoff, and remnant rows.

#### Synchrotron Emission

The event record must connect charged-assembly curvature, the effective magnetic-field map, source depletion, trigger geometry, $\delta\Theta_a$, $E_{\text{exc}}$, photon assembly output $E_\gamma$, recoil, medium excitation, causal-wake ledger, identity routing, and photon Gate B event residual. The closure target is to derive the standard $\nu_c \propto \gamma^2 B$ and $P_{\mathrm{syn}}\propto U_B\gamma^2$ scalings from Noether sea anisotropy and wake-strain threshold conditions rather than fitting a separate emission rule. In these standard comparison forms, $\nu_c$ is the characteristic emitted frequency, $P_{\mathrm{syn}}$ the emitted power, $\gamma$ the Lorentz factor of the emitting charged assembly (a quoted benchmark symbol, distinct from the photon label $\gamma$ used elsewhere in this ledger), $B$ the effective magnetic-field magnitude, and $U_B$ the corresponding effective field energy density. Synchrotron polarization records inherit Gate B, so this ledger carries the transverse handoff without proving photon helicity locally.

#### Pair Production

The event record must avoid creation-from-nothing wording. Incoming photon assemblies trigger association of local substrate content into $e^+e^-$ assemblies when the observer-level threshold is satisfied; in the standard comparison form that threshold requires the invariant mass of the photon pair to reach twice the electron rest energy, $s\ge4m_e^2c^4$ in the convention recorded in [Synchrotron](../../../../markdown/aaa/reactions/synchrotron.md). The incoming photons supply energy, momentum, polarization handoff, and trigger geometry; no architrino identity is created at the vertex. Which existing identities become the charged assemblies is the provenance fork of [Electroweak Bosons](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md#pair-production-note): in the direct-rearrangement fork the constituents of the two photon ledgers alone supply the outgoing Noether braid and axial inventories, with no net Noether sea requisition; in the recruited-source fork a declared neutral two-braid source assembly from the Noether sea supplies or receives braid content while the photons provide the energy and the trigger. The record must declare which fork it uses, and the fork is decided by closure, not by wording. The incoming photons preserve their radiation event records through the pair vertex. The pair-channel record must include:

- incoming photon assembly energies and directions,
- incoming photon polarization handoffs as inherited Gate B records,
- the declared provenance fork, with the local Noether braid material recruited, returned, or reconfigured under it and identity routing for the architrinos assigned to the final charged assemblies,
- final charged assembly inventories,
- recoil and medium-excitation terms,
- causal-wake ledger and closure status,
- and the standard-limit cross-section target.

This is the ledger distinction that ordinary absorption does not need: atomic or material capture closes the photon ledger into an existing target or medium record, while pair production closes the photon ledger and separately routes identity-tracked substrate content, from the photon constituents or from a recruited source, into new charged assemblies.

#### Intergalactic Pair And Reaction Source Components

Sparse visible matter between galaxies is not enough to close a cosmology source inventory. A reaction-cosmology packet should include a component inventory
$$
\mathcal{I}_{\mathrm{IGM}}
=
\left(
N_\gamma,
N_\nu,
N_{\mathrm{CR}},
N_{\mathrm{plasma}},
N_{\mathrm{dust}},
N_A,
\rho_{\text{NS}},
S_{\mathrm{pair}},
S_{\mathrm{return}}
\right)_W
$$

[View →](../../../../../equation-mapping.html#corpus-equation-eea86edc186d76ca)

for a declared window $W$. Here $N_\gamma$, $N_\nu$, $N_{\mathrm{CR}}$, $N_{\mathrm{plasma}}$, and $N_{\mathrm{dust}}$ count the photon, neutrino, cosmic-ray, plasma, and dust content of the window, $N_A$ records neutral or dark assembly candidates, $\rho_{\text{NS}}$ is the local Noether braid density, $S_{\mathrm{pair}}$ records pair or reaction production inside the window, and $S_{\mathrm{return}}$ records content returned to the Noether sea or reclassified after reactions. This inventory is a source-component record, not a proof of a specific production rate; it prevents "empty intergalactic space" from replacing the actual component ledger.

#### BBN Photon Loading

The BBN module needs a source-zone photon ledger. It must identify which radiation channels supply the effective photon-dominated environment and whether they preserve deuterium survival, helium clustering, and $N_{\text{eff}}$ compatibility without per-source retuning.

#### Matter-Asymmetry Provenance

The observed baryon-to-photon ratio is a data-product constraint, not permission to import an external baryogenesis mechanism as doctrine. Any matter-asymmetry story used by the cosmology program must be rewritten as a reaction provenance record over a declared source window $W$. Let $N_B(W)$, $N_{\bar B}(W)$, and $N_\gamma(W)$ be the baryon, antibaryon, and photon counts after the event records have been transported to the BBN comparison surface. The comparison surface must name its epoch, because photon number is not conserved through the source-to-BBN history: in the standard comparison calculation, electron-positron annihilation alone raises the comoving photon count by the entropy-transfer factor $11/4$, and the reference value $\eta_B\approx6\times10^{-10}$ is the post-annihilation value fixed by the present CMB photon density. A ledger evaluated earlier must carry the photon-number-changing channels forward to that surface. Define
$$
\eta_B^{\mathrm{ledger}}(W)
=
\frac{N_B(W)-N_{\bar B}(W)}{N_\gamma(W)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4174fcb7e432fb8f)

This is the net baryon number per photon in the transported window; it is dimensionless and reduces to the standard $\eta$ when surviving antibaryons are negligible. For leptogenesis-like source routes, meaning routes in which an asymmetry between leptons and antileptons is generated first and later converted into the baryon asymmetry, the ledger must also carry a neutrino/antineutrino CP-asymmetry comparison term rather than assuming the external mechanism. CP asymmetry here means a difference between the behavior of a process and that of its charge-conjugate, mirror-image process; in neutrino oscillations it appears as a difference between the flavor-transition probabilities of neutrinos and antineutrinos. The comparison inputs are measured long-baseline neutrino and antineutrino transition probabilities and the summaries of the CP-violating phase of the lepton mixing (PMNS) matrix built from them. The comparison term is
$$
\Delta_{\nu\bar\nu}^{\mathrm{CP}}(E,L;\alpha,\beta)
=
P_{\nu_\alpha\to\nu_\beta}(E,L)
-
P_{\bar\nu_\alpha\to\bar\nu_\beta}(E,L)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8a12867edd3ecb8c)

where $E$ is neutrino energy, $L$ is baseline, $\alpha,\beta$ label flavor channels, and $P_{\nu_\alpha\to\nu_\beta}$ is the probability that a neutrino produced in flavor $\alpha$ is detected in flavor $\beta$ after traveling $L$. Two restrictions come with this term. First, it carries intrinsic CP information only in appearance channels, $\alpha\ne\beta$: for $\alpha=\beta$ the vacuum transition probabilities of neutrino and antineutrino coincide, so the survival-channel difference is zero by construction. Second, transit through ordinary matter shifts neutrino and antineutrino transition probabilities in opposite directions even when no intrinsic CP violation is present, so a measured long-baseline difference is an intrinsic CP input only after that matter-induced part has been separated with the declared density profile. The source-window ledger may report $\Delta_{\nu\bar\nu}^{\mathrm{ledger}}(W)$ as the event-record-weighted version of this comparison over $W$, with $\Delta_{\nu\bar\nu}^{\mathrm{obs}}(W)$ the measured probabilities propagated through the same weighting, but that reported value is only an input constraint on the matter-asymmetry closure. The low-energy oscillation phase constrains the lepton-sector CP violation without by itself fixing the asymmetry a high-scale source route would need, and the term is not an established $\mathbb{A}\mathbb{A}\mathbb{A}$ derivation of baryon excess.

The acceptance residual should be reported as
$$
\mathcal{R}_{B/\gamma}(W)
=
\max\left(
\frac{|\eta_B^{\mathrm{ledger}}(W)-\eta_B^{\mathrm{obs}}|}{\epsilon_\eta},
\frac{|\Delta_{\nu\bar\nu}^{\mathrm{ledger}}(W)-\Delta_{\nu\bar\nu}^{\mathrm{obs}}(W)|}{\epsilon_{\nu\bar\nu}},
\frac{|\Delta B_{\mathrm{unrec}}(W)|}{\epsilon_B},
\frac{|\Delta Q_{\mathrm{unrec}}(W)|}{\epsilon_Q},
\frac{|\Delta E_{\mathrm{unrec}}(W)|}{\epsilon_E}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-01a825d10e240729)

Here $\eta_B^{\mathrm{obs}}$ is the observed baryon-to-photon ratio (the $\eta_{\mathrm{obs}}$ of BBN Constraints), and $\Delta_{\nu\bar\nu}^{\mathrm{ledger}}$, $\Delta B_{\mathrm{unrec}}$, $\Delta Q_{\mathrm{unrec}}$, and $\Delta E_{\mathrm{unrec}}$ are not new ontology. They are comparison or failure counters for CP-asymmetric neutrino/antineutrino transition rates, baryon-number bookkeeping, electric-charge bookkeeping, and energy balance after all declared reaction, recoil, medium, and escape channels have been included. Each $\epsilon$ in the denominators is a positive tolerance declared before the comparison, in the units of its numerator; the energy tolerance $\epsilon_E$ is the same declared energy allowance used by the exchange residuals below. A leptogenesis-like source model may remain in the comparison ledger only when $\mathcal{R}_{B/\gamma}\le1$ and the same event record also passes the BBN photon-loading and CMB thermalization checks below. The condition $\mathcal{R}_{B/\gamma}\le1$ is a componentwise bound, not a joint confidence level: correlated inputs such as $\eta_B^{\mathrm{obs}}$ and the light-element yields require a covariance or joint-likelihood treatment before a pass is read as statistical agreement.

#### CMB Thermalization

The CMB module needs a source-to-transport-to-decoupling ledger. It must track:

- source-channel selection from supermassive black hole (SMBH) local release, medium relaxation, and conversion/dissociation pathways,
- thermalization depth and blackbody recovery,
- anisotropy and polarization transfer, with the polarization handoff inherited from Gate B,
- redshift and clock-rate handoff,
- and separation between source interpretation and the shared prediction target $C_\ell$.

The thermalization-depth record is a diagnostic field, not a new substrate entity. For each modeled source-to-decoupling path, the ledger should record

$$
\mathcal{D}_{\mathrm{th}}(\nu;t_{\mathrm{eff},a},t_{\mathrm{eff},b})
=
\int_{t_{\mathrm{eff},a}}^{t_{\mathrm{eff},b}}\tau_{\mathrm{th}}^{-1}(\nu,t_{\mathrm{eff}})\,dt_{\mathrm{eff}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-cd03fb5593128be0)

Here $\nu$ is the photon frequency at which the depth is evaluated, $t_{\mathrm{eff}}$ is effective observer coordinate time along the path, with $t_{\mathrm{eff},a}$ and $t_{\mathrm{eff},b}$ the start and end of the modeled segment, and $\tau_{\mathrm{th}}$ is the relaxation duration in that same time, so that its inverse is a relaxation rate and the integral is the dimensionless number of relaxation times the path accumulates. The same clock must be used for the rate and the interval; a calculation in absolute time $T$ must include the clock-map Jacobian rather than relabel the variable. The rate $\tau_{\mathrm{th}}^{-1}$ is decomposed into the specific event-recorded channels being used: planar-mode capture/release, Compton-like redistribution, pair channels, and non-radiative medium exchange. A CMB blackbody claim requires $\mathcal{D}_{\mathrm{th}}\gg1$ before decoupling, an effective photon chemical potential driven to zero (the parameter that measures a photon-number surplus or deficit relative to a Planck spectrum at the same temperature, which number-conserving scattering alone cannot remove), and a post-decoupling transport map that preserves the already-generated spectrum while carrying anisotropy, polarization, damping, and redshift information.

#### Horizon-Interface Photon Release

The strong-field photon-release record is the black-hole version of source-to-transport provenance. It applies when a photon-channel packet, or a photon-channel-adjacent dark-sector mode, is processed near the horizon-interface symmetry-breaking threshold before contributing to an exterior radiative, jet, diffuse, or CMB-facing channel.

The minimum record must include:

- the selected horizon-interface label ensemble $\mathcal{B}_H$ or finite strong-field branch record;
- incoming and outgoing photon-channel frequencies $\nu_{\gamma}^{-}$ and $\nu_{\gamma}^{+}$ for every retained strong-field segment;
- whether each segment is blueshift, redshift, trapping, conversion, thermalization, or release;
- the horizon-interface energy entry $\Delta E_H$ together with the medium, recoil, remnant, and returned Noether sea entries;
- the Gate A and Gate B handoffs for any packet still treated as a photon after the segment;
- the release selector that routes the output into jet, diffuse radiative, dark-sector, CMB thermalization, or later visible-conversion channels.

The strong-field exchange residual is inherited from [Black Holes](../../../../markdown/aaa/spacetime/black-holes.md#horizon-adjacent-photon-channel), and like its owner it applies only in a validated effective photon regime where the calibration $E_\gamma=h\nu$ holds:
$$
\mathcal{R}_{H\gamma\text{-}\mathrm{ex}}
=
\sum_{j\in\Gamma_H}
\frac{
\left|
h(\nu_{\gamma,j}^{+}-\nu_{\gamma,j}^{-})
+\Delta E_{H,j}
+\Delta E_{\mathrm{med},j}
+\Delta E_{\mathrm{recoil},j}
+\Delta E_{\mathrm{rem},j}
\right|
}{\epsilon_{E,j}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0a95eb11f08bb1b6)

Here $\Gamma_H$ is the retained horizon-adjacent path and $j$ indexes its strong-field segments; $\nu_{\gamma,j}^{-}$ and $\nu_{\gamma,j}^{+}$ are the photon-channel frequencies entering and leaving segment $j$ on a common comparison clock; $h$ is Planck's constant; $\Delta E_{H,j}$ is the gain of the horizon-interface or interior strong-field account; the medium, recoil, and remnant entries are the gains of those counterparties; and $\epsilon_{E,j}>0$ is the declared energy tolerance of the segment. Because every summand is nonnegative, the residual closes only when each segment closes separately: a blueshift segment, $\nu^{+}>\nu^{-}$, must be paid for by an equal recorded loss in the interface or medium accounts, and a redshift segment must deposit its loss in a named account. This record is a candidate source mechanism, not a completed CMB derivation. It becomes cosmology-facing only after the emitted or converted packet is propagated through the CMB thermalization, distortion, anisotropy, polarization, and redshift handoff checks. A high-energy interior photon population that cannot be routed through those checks may remain a black-hole release-channel hypothesis, but it cannot be used as a CMB source.

#### Path Frequency Exchange

Post-emission photon frequency changes are not automatically new photon emission events. A photon packet may exchange energy with an intervening electron population, plasma, or Noether sea state and continue as the same transported packet. For each such event or coarse segment, the ledger must record incoming frequency $\nu^-$, outgoing frequency $\nu^+$, the local medium state, recoil or target momentum, and the residual of [Radiation](../../../../markdown/aaa/reactions/radiation.md#path-frequency-exchange)

$$
\mathcal{R}_{\nu\text{-}\mathrm{ex}}
=
\frac{
\left|
h(\nu^+-\nu^-)
+\Delta E_{\mathrm{target}}
+\Delta E_{\mathrm{med}}
+\Delta E_{\mathrm{recoil}}
+\Delta E_{\mathrm{rem}}
\right|
}{\epsilon_E}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7ee4a4cb676933c1)

Here $h$ is Planck's constant, both frequencies are read on the same local observer clock and energy calibration so that $h(\nu^+-\nu^-)$ is the photon's energy change in the validated $E_\gamma=h\nu$ regime, $\Delta E_{\mathrm{target}}$ is the change in the internal energy of the scattering target, $\Delta E_{\mathrm{med}}$ the gain of the Noether sea or intervening medium, $\Delta E_{\mathrm{recoil}}$ the kinetic gain of the recoiling target or medium component, $\Delta E_{\mathrm{rem}}$ any excitation retained above the final reference, and $\epsilon_E>0$ the declared energy tolerance. Target internal energy and target recoil are disjoint accounts and must not be counted twice. The residual is dimensionless, and a frequency boost therefore requires an equal recorded loss from the target or medium, while a depletion requires an equal recorded gain. The same exchange record must state whether the exchange is thermalizing, spectrally distorting, or coherently transported. A Sunyaev-Zeldovich-type boost is admissible only when the electron or medium record supplies the photon energy increase and when the side effects remain compatible with the CMB spectrum, anisotropy, polarization, and the kSZ/tSZ observables, the kinetic and thermal Sunyaev-Zeldovich signatures in which bulk electron motion Doppler-shifts, and hot electrons spectrally distort, the CMB seen through a cluster. A depletion entry is admissible only when the lost photon energy is routed into a named medium, recoil, remnant, or thermalization channel.

For coherent redshift transport, the exchange record should also expose the response curve rather than treating frequency change as a fitted scalar. For a path segment $s$ traversed by photon packet $\gamma$ along the Euclidean path $\Gamma_s$ with arclength element $d\ell$, write
$$
\Delta\ln\nu_{\gamma,s}
=
-\mathcal{Y}_{\gamma,s},
\qquad
\mathcal{Y}_{\gamma,s}
=
\int_{\Gamma_s}
\mathcal{K}_{\nu}
\!\left(
\Theta_{\gamma},
\theta_{\mathrm{sea}},
\nabla\theta_{\mathrm{sea}},
\Theta_{\mathrm{med}}
\right)\,d\ell.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8badadff6a6a3f3b)

Here $\Delta\ln\nu_{\gamma,s}$ is the change in the logarithm of the packet frequency across the segment, so that a positive $\mathcal{Y}_{\gamma,s}$ is a redshift and a negative value a blueshift, matching the sign convention of the strong-field frequency entry in Black Holes; $\mathcal{K}_{\nu}$ is the per-length response kernel; $\Theta_{\gamma}$ is the transported packet record, including its Gate A and Gate B state; $\theta_{\mathrm{sea}}$ is the local Noether sea state record and $\nabla\theta_{\mathrm{sea}}$ its spatial gradient along the path; and $\Theta_{\mathrm{med}}$ is the state of any intervening non-sea medium such as an electron population or plasma. In the validated $E_\gamma=h\nu$ regime the packet energy change across the segment is $\Delta E_{\gamma,s}=h\nu_s^{-}\,(e^{-\mathcal{Y}_{\gamma,s}}-1)$, where $\nu_s^{-}$ is the entering frequency; for example, $\mathcal{Y}_{\gamma,s}=\ln 2$ halves the frequency and the counterparties below must together gain $h\nu_s^{-}/2$. The segment-level energy closure remains
$$
\Delta E_{\gamma,s}
+
\Delta E_{\mathrm{sea,path},s}
+
\Delta E_{\mathrm{recoil/rem},s}
=0.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5cc26baa2c07808b)

Here $\Delta E_{\mathrm{sea,path},s}$ is the gain of the Noether sea along the segment and $\Delta E_{\mathrm{recoil/rem},s}$ the combined recoil and remnant gains; with $\Delta E_{\mathrm{target}}$ and $\Delta E_{\mathrm{med}}$ of the exchange residual identified with these path accounts, this closure is the statement $\mathcal{R}_{\nu\text{-}\mathrm{ex}}=0$ for the segment. The kernel $\mathcal{K}_{\nu}$ is a derivation target, not a free redshift law. It must state whether the segment is coherent transparent transport, thermalizing exchange, spectral distortion, capture, or carrier exit, and it must preserve the same photon packet identity unless a reaction or remnant row explicitly terminates it.

### Closure Targets

1. **Planar-mode threshold closure:** derive a shared threshold condition for bremsstrahlung and synchrotron photon assembly output.
2. **Pair-production provenance closure:** prove that one declared provenance fork, direct rearrangement of the photon constituents or local Noether sea recruitment and return, satisfies architrino inventory, energy-momentum, and Breit-Wheeler rate constraints in the same event record.
3. **Photon-bath closure:** show that the relevant radiation channels can maintain BBN-compatible photon loading during the deuterium bottleneck window.
4. **Matter-asymmetry closure:** derive $\eta_B^{\mathrm{ledger}}$ from event-level reaction provenance without hidden baryon inventory, charge, or energy sources; for leptogenesis-like routes, also recover $\Delta_{\nu\bar\nu}^{\mathrm{ledger}}$ from primary-source neutrino CP-asymmetry comparisons without promoting leptogenesis to doctrine.
5. **Detailed-balance closure:** derive the rate symmetry and ensemble weight relation that make emission, absorption, and stimulated terms recover Planck occupation with zero effective photon chemical potential.
6. **Blackbody closure:** show that distributed source channels plus Noether sea transport can generate and preserve the CMB blackbody spectrum within observational limits.
7. **Clock/redshift closure:** use one Noether sea state map for photon propagation, endpoint clock comparison, and redshift-distance inference.

### Failure Modes

The provenance program fails for a channel if a source story cannot survive the same ledger used for reaction, transport, thermalization, and observer handoff.

| Failure mode | What fails | Diagnostic consequence |
| --- | --- | --- |
| Single Noether braid temperature mistake | A single excited Noether braid is treated as thermodynamically hot rather than internally excited, closure-mismatched, or metastable | Temperature is being used before an ensemble distribution or entropy-energy relation has been established |
| Inventory gap | Architrino inventory, Noether braid recruitment, recoil, or returned medium content cannot be balanced without unrecorded substrate creation | Pair and radiation channels cannot be promoted beyond provisional maps |
| Per-observable refit | The same Noether sea state variables must be re-fit independently for photon loading, blackbody recovery, damping, redshift, or growth observables | The cosmology interpretation loses its shared Noether sea state map |
| Standard-limit violation | Pair, Compton-like, bremsstrahlung, synchrotron, or photon propagation channels violate validated limits in regimes where those limits are already measured | The proposed substrate route fails before it can claim new deviations |
| Insufficient thermalization depth | $\mathcal{D}_{\mathrm{th}}$ is too small, or its channel decomposition is not tied to event records | Source photons need not relax to a Planck bath, and a nonzero effective photon chemical potential or spectral distortion remains |
| Matter-asymmetry ledger failure | $\eta_B^{\mathrm{ledger}}$ cannot match the observed baryon-to-photon ratio, or $\Delta_{\nu\bar\nu}^{\mathrm{ledger}}$ is imported without event-record support; the source route then relies on unrecorded baryon inventory, charge imbalance, or energy imbalance | A baryogenesis-like or leptogenesis-like source story cannot be promoted into cosmology provenance |
| BBN photon-loading failure | Source-zone photon production cannot preserve deuterium survival, helium clustering, lithium constraints, and $N_{\text{eff}}$ compatibility | The BBN local-reactor mapping cannot replace the standard photon-to-baryon environment |
| CMB handoff failure | Blackbody precision, damping behavior, anisotropy, polarization, or TT/TE/EE coherence cannot be carried through the same transport and redshift map | CMB thermalization cannot be treated as a successful source-to-observer provenance path |
| Frequency-exchange ledger failure | A path segment changes photon frequency without a closed target, medium, recoil, remnant, or side-effect entry | Redshift, blueshift, SZ, or distance-ladder claims are being used without photon provenance |

### Sources

The following sources were inspected as observer-level constraints on the comparison variables named above; they are not premises of any $\mathbb{A}\mathbb{A}\mathbb{A}$ derivation.

- B. D. Fields, P. Molaro, and S. Sarkar, "Big-Bang Nucleosynthesis," in *Review of Particle Physics*, Particle Data Group, revised August 2025, [PDG review](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-bbang-nucleosynthesis.pdf), §24.2 and equations (24.5) and (24.8). Supports the definition of the baryon-to-photon ratio as $\eta\equiv n_b/n_\gamma$ with $n_\gamma$ fixed by the present CMB temperature, and the reference value $\eta\approx6\times10^{-10}$ used in the Discussion Gate, Channel Map, and Matter-Asymmetry Provenance sections.
- M. C. Gonzalez-Garcia and R. Wendell, "Neutrino Masses, Mixing, and Oscillations," in *Review of Particle Physics*, Particle Data Group, revised August 2025, [PDG review](https://pdg.lbl.gov/2025/reviews/rpp2025-rev-neutrino-mixing.pdf), §14.4 equation (14.39) and §14.5 equation (14.58). Supports the two restrictions stated for the CP-asymmetry comparison term: the CP-odd part of the vacuum transition probability changes sign between neutrinos and antineutrinos and is absent from survival channels, and the matter potential enters with opposite sign for neutrinos and antineutrinos.

## Constraint Ledger

This ledger collects the observable constraints that can reject $\mathbb{A}\mathbb{A}\mathbb{A}$: measured bounds from experiments and observations that any model version must satisfy. It keeps measurable limits separate from general research priorities so each model version can be tested against experimental scrutiny. A model version is one shared record, written $\theta$ where an entry needs it: the retained assembly branches, the state of the [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md) (the population of neutral assemblies that fills the fixed [Euclidean void](../../../../markdown/aaa/foundations/euclidean-void.md)), and the observer maps that turn substrate histories in [absolute time](../../../../markdown/aaa/foundations/absolute-time.md) into clock, ruler, and signal readouts.

### Experimental Constraint Ledger and Falsification Criteria

Each entry combines an empirical bound, the proposed mechanism, and an explicit failure condition so that experimental results can shape or reject the model.

The entries use a fixed vocabulary. A **Constraint** is an observer-level measured bound; it names the instrument or observation that sets it, and the numbers it quotes are those benchmarks rounded to the ledger's order of magnitude. An **Observable** lists the data products the comparison consumes. A mechanism, requirement, target, residual, check, or interpretation entry states what the same shared record must produce; these are closure targets at effective grade, not derived results, and the standard-physics formulas inside them enter only as recovery targets, never as substrate premises. A **Failure Condition** is the falsifier: the observation that rejects the model version. Claim grade: measured for the quoted bounds, whose instruments are named in the entries and in the Sources section; guessed or inferred for every mechanism and target until its owning chapter supplies the derivation.

#### Lorentz Invariance & Preferred Frame Effects (Tier 1)

An absolute frame, the rest frame of the Euclidean void in which the primitive wake speed $c_f$ is isotropic, remains hidden only if the required experimental isotropy and observational invariance hold together; [Detecting the Absolute Frame](../../../../markdown/aaa/foundations/detecting-the-absolute-frame.md) develops what a physical observer inside the Noether sea can and cannot reconstruct. The entries below identify the observables, state the emergent timing and ruler behavior attributed to the Noether sea, and define the tolerance beyond which the preferred frame would become detectable.

* **Constraint** – isotropy from Michelson–Morley-type resonator experiments, which read the orientation-dependent fractional frequency change $\Delta\nu/\nu$ of a rotating resonator as the two-way light-speed anisotropy $|\Delta c/c|$, constrains that anisotropy below $10^{-17}$ (the current resonator bound is at the $10^{-18}$ level, rounded conservatively here), while atomic clock sidereal drift stays below $10^{-16}$, keeping Lorentz-invariance leakage under the $10^{-17}$ falsification threshold.
* **Consolidated Requirement** – prove preferred-frame hiding: architrino assemblies must acquire Lorentz-compatible deformation and clock behavior in the Euclidean-void rest frame so no local observer can detect the Noether sea's rest frame.
* **Observable** – local Lorentz invariance is preserved.
* **Mechanism** – assembly-based clocks/rulers must emerge with derived clock time $\tau$, the readout of a physical assembly clock, rather than absolute time $T$; the clock map from $T$ to $\tau$ is a recovery target, not a substrate premise.
* **Shared Residual** – the structural-integrity common-limit closure in [Lorentz Kinematics](../../../../markdown/aaa/spacetime/lorentz-kinematics.md#theorem-g-structural-integrity-common-limit-closure) couples this row to photon and gravitational-wave speed gates: the same branch record must make $c_{\mathrm{mat}}^{\mathrm{lim}}$, $c_{\text{eff}}$, $c_\gamma$, and $c_0$ agree within $O(\epsilon_{\text{LV}})$ while also producing clock/ruler deformation and two-way photon synchronization.
* **Failure Condition** – any orientation-dependent anisotropy signal above $10^{-17}$ in the resonator or clock comparisons, or a residual $\delta$ in the longitudinal ruler law $L_{\parallel} = L_0 (\gamma_\star^{-1} + \delta)$ that exceeds $10^{-17}$, invalidates the theory. Here $L_0$ is the rest length, $L_{\parallel}$ the length along the direction of motion, and $\gamma_\star$ the Lorentz factor of the assembly group speed in the declared comparison channel, as in the [kinematic closure target](../../../../markdown/aaa/spacetime/lorentz-kinematics.md#kinematic-closure-target); a resonator reads the combination of ruler deformation and two-way wake-speed anisotropy from one branch record, so $\delta$ is bounded through that combination rather than measured on its own.

#### Photon Time-of-Flight Dispersion Gate

High-energy transient events at cosmological distance test whether photon-channel propagation accumulates a frequency-dependent delay. The observable is a time-of-arrival residual after source-intrinsic emission lag has been modeled; it is not direct evidence for or against microscopic spatial grains by itself.

For two photon phase frequencies $\omega_a$ and $\omega_b$ emitted by the same source at redshift $z$, a candidate photon-channel delay is
$$
\Delta t_{\gamma}^{\mathrm{model}}(\omega_a,\omega_b;z)
=
\int_{\Gamma_z}
\frac{
\chi_\gamma(\omega_a,\mathbf X,T)
-
\chi_\gamma(\omega_b,\mathbf X,T)
}{c_0}\,d\ell
$$

[View →](../../../../../equation-mapping.html#corpus-equation-cfbc53f331d1f5c8)

Here $\Gamma_z$ is the observer-level path used by the comparison, $d\ell$ its calibrated spatial length element, $c_0$ the asymptotic observer-sector speed calibration, and $\chi_\gamma$ the photon-channel delay factor from the same branch record used for photon synchronization, written with an explicit frequency argument. It is evaluated at the native position $\mathbf X$ and absolute time $T$ that the declared effective chart assigns to each path element, and at the local phase frequency that element carries after its redshift evolution along the path. On a nondispersive branch it reduces to the canonical $\chi_\gamma(\mathbf X,T)=c_0/c_\gamma$, the two terms cancel, and the model delay vanishes. A useful residual is
$$
\mathcal{R}_{\gamma\mathrm{disp}}
=
\sup_{\mathcal{E}}
\frac{
\left|
\Delta t_{\mathrm{obs}}
-
\Delta t_{\mathrm{src}}
-
\Delta t_{\gamma}^{\mathrm{model}}
\right|
}{\sigma_{\Delta t}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1abb38f3751b71cb)

where $\mathcal{E}$ is the declared transient catalog, $\Delta t_{\mathrm{src}}$ is the modeled source lag, and $\sigma_{\Delta t}$ is the adopted timing uncertainty.

* **Constraint** – the same photon branch that recovers local Lorentz synchronization must keep $\mathcal{R}_{\gamma\mathrm{disp}}$ below the declared catalog threshold without per-source retuning.
* **Observable** – measured arrival-time differences across photon energy or frequency bands, source-lag model, redshift, instrument timing uncertainty, and event-selection rule.
* **Validation Target** – Gate A in [Electroweak Bosons](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md) must derive a nondispersive weak homogeneous photon branch rather than assume it after the fact.
* **Shared Residual** – this is the photon-channel component of the same common-limit residual defined in [Lorentz Kinematics](../../../../markdown/aaa/spacetime/lorentz-kinematics.md#theorem-g-structural-integrity-common-limit-closure); the $\chi_\gamma$ record cannot be repaired independently of the clock/ruler $c_{\text{eff}}$ record.
* **Failure Condition** – a photon closure branch fails if it predicts an accumulated frequency-dependent delay in the validated band, hides that delay by changing the source-lag model event by event, or uses a different $c_\gamma$ / $\chi_\gamma$ record from the one used in [Lorentz Kinematics](../../../../markdown/aaa/spacetime/lorentz-kinematics.md).

#### The Absolute-Frame Group-Velocity Check (Lorentz Contraction Enforcement)

This entry frames the requirement that the underlying Noether sea affords a dynamical contraction mechanism to assemblies moving through the Euclidean void; without such a mechanism, assemblies would reveal their motion relative to the sea and the preferred frame would manifest.

* **Constraint** – the Noether sea must supply a dynamical closure that yields Lorentz-compatible contraction of assemblies; otherwise the model is equivalent to an untested preferred frame.
* **Failure Condition** – without contraction enforced by the Noether sea, preferred frame effects become measurable and falsify the theory.

#### Noether Sea Drag

This entry catalogues how coupling between macroscopic bodies and the Noether sea can influence orbital dynamics. The constraint ensures any additional dissipation or effective drag remains below the levels already constrained by binary-pulsar orbital-period timing, whose measured orbital decay matches the gravitational-wave emission predicted by general relativity.

* **Constraint** – interactions with the Noether sea must not induce orbital decay that outpaces GR’s gravitational-wave emission bounds, as measured by binary-pulsar orbital-period timing.
* **Validation Target** – match observed orbital stability and perihelion advance within GR limits while modeling any extra coupling as a conserving medium-dressed response rather than ordinary dissipative drag.

#### Condensed-Matter Response Gate

Ordinary materials supply a broad recovery surface for the same assembly, electron-envelope, and Noether sea response variables. The gate is not that $\mathbb{A}\mathbb{A}\mathbb{A}$ adopts band theory as ontology. The gate is that periodic material branches recover the benchmark mathematics of bands, lattice scattering, phonons, and Hall response without per-probe retuning.

* **Constraint** – one material-branch record $\theta_{\mathrm{mat}}=(\mathcal B_e,\mathcal B_{\mathrm{lat}},\rho_{\text{NS}},n,\chi_{\text{sea}},\mathcal M_{\text{sea}}^{ab})$ must recover Bloch-form bands $E_\alpha(\mathbf k)$ indexed by band $\alpha$ and crystal momentum $\mathbf k$, the effective mass tensor $(m_{\alpha,*}^{-1})^{ij}=\hbar^{-2}\,\partial^2E_\alpha/\partial k_i\partial k_j$ (the band curvature with respect to crystal momentum, with $\hbar$ the reduced observer-level action quantum), Fermi-surface or band-gap classification, reciprocal-lattice scattering $\mathbf q\in\Lambda^*$ with structure factor $S(\mathbf q)$, and phonon dispersion from one declared lattice branch.
* **Hall / Topology Target** – for two-dimensional gapped branches with an effective U(1) connection, the same record must recover the Hall conductance $\sigma_{xy}=(e^2/2\pi\hbar)C$, with $e$ the elementary-charge magnitude and $C$ the integer Chern number, and the longitudinal resistivity $\rho_{xx}$ below tolerance on the plateau. Fractional Hall, anyon, and Chern-Simons descriptions are recovery/comparison structures unless a local branch derivation consumes them directly.
* **No-Drag Consistency** – the ideal periodic branch must not require ordinary dissipative drag; a finite transport relaxation rate $\tau_{\mathrm{rel}}^{-1}$ must be routed to disorder, vacancies, phonons, boundary exchange, heating, radiation-like shedding, or branch transition.
* **Failure Condition** – the condensed-matter branch fails if it fits band curvature, phonon stiffness, scattering peaks, Hall conductance, and transport relaxation with independent material records, if a filled band carries unlogged current or heat, if a topological plateau changes without a gap closure or branch change, or if ordinary Noether sea drag is used to explain resistance below the transport threshold in [Condensed Matter](../../../../markdown/aaa/nuclear-atomic/condensed-matter.md).

#### GW Speed

The propagation speed of gravitational-wave disturbances in the Noether sea must align with the measured gravitational-wave velocity, so this section records the tolerance within which new physics can coexist with GW timing data without contradicting the LIGO/Virgo baseline. The benchmark is multi-messenger: the arrival-time comparison between the gravitational-wave event GW170817 and the gamma-ray burst GRB 170817A constrained the gravity-channel and photon-channel speed difference at roughly the $10^{-15}$ level.

* **Constraint** – gravitational waves, modeled as collective Noether sea disturbances, must satisfy the multi-messenger speed gate. In the standard comparison form quoted from that analysis, with $v_{\mathrm{GW}}$ the gravitational signal speed and $c_0$ standing for the quoted light speed in the same calibration, GW170817/GRB 170817A gives the reference scale
  $$
  -3\times10^{-15}
  \lesssim
  \frac{v_{\mathrm{GW}}-c_0}{c_0}
  \lesssim
  7\times10^{-16}
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-e5dc0f030c4b58dc)

  Equivalently, for the weak homogeneous observer branch in which $c_\gamma\to c_0$,
  $$
  \left|
  \frac{c_{\mathrm{GW}}}{c_\gamma}
  -
  1
  \right|
  \lesssim
  10^{-15}
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-1a57d4fecb90841c)

  is the order-of-magnitude ledger tolerance. The symbol map from the quoted form is $v_{\mathrm{GW}}\mapsto c_{\mathrm{GW}}$, the gravitational-wave effective transport speed, and $c_0\to c_\gamma$ on that branch; the second form is the layer-explicit ledger row, and its symmetric scale is a rounding of the asymmetric published interval, not that interval. Any tighter ledger tolerance adopted for a specific validation band should be stated explicitly rather than inferred from ontology.
* **Shared-Channel Requirement** – the effective gravitational-wave channel and photon channel must be derived from one Noether sea state record in the weak-field branch, as required by [Lorentz Kinematics](../../../../markdown/aaa/spacetime/lorentz-kinematics.md#theorem-g-structural-integrity-common-limit-closure). A medium-based gravity model fails this row if it lets gravitational waves and photons acquire independently tunable dressed speeds in the same region.
* **Mode and Dispersion Gate** – finite-range or medium-compliance corrections must keep accumulated dispersion, false-alarm residuals, calibration residuals, and any scalar, vector, or longitudinal gravitational-wave detector response below the residual bounds for the validated band.
* **Low-Frequency Extension** – if a cosmological-scale weakening channel claims finite-range behavior, it must also report the low-frequency residual $\mathcal{R}_{\mathrm{GW,low}}(\theta)$ from [Gravitational Waves](../../../../markdown/aaa/spacetime/gravitational-waves.md#linear-wave-equation) for the declared pulsar-timing or space-interferometer band. A band not yet measured may be listed as a forecast, but it cannot be used to override the existing high-frequency speed, polarization, and dispersion gates.
* **Failure Condition** – a cosmological-scale weakening channel fails if it predicts measurable gravitational-wave dispersion, an unsuppressed non-TT mode, or a speed offset in the same regime where the weak-field metric map is supposed to recover GR.

#### Euclidean vs. Metric Pathing (The Refraction Mapping)

This constraint explains how apparent metric deviations (Shapiro delay and light bending) emerge from a Euclidean signalling framework endowed with a varying Noether sea delay factor $\chi_{\text{sea}}=c_f/c_{\text{eff}}$, the ratio of the primitive wake speed to the dressed signal speed, which allows the emergent delay to be compared with the standard GR potential.

* **Constraint** – Shapiro delay and light bending must match GR within the Cassini-scale PPN bound. The Cassini radio-link measurement gives $\gamma_{\mathrm{PPN}}-1=(2.1\pm2.3)\times10^{-5}$, where $\gamma_{\mathrm{PPN}}$ is the parameterized post-Newtonian space-curvature parameter, equal to one in general relativity, and both the delay and the bending are proportional to $1+\gamma_{\mathrm{PPN}}$; the ledger tolerance is a few $\times10^{-5}$.
* **Architrino Interpretation** – signals propagate through Euclidean space, but observer-level paths are effective travel-time extremals in the Noether sea delay map. The perceived delay or curvature arises from $\chi_{\text{sea}}$ responding to spatial variations in the Noether braid density $\rho_{\text{NS}}$ and related Noether sea state variables.
* **Validation Target** – in the corpus-wide $(-,+,+,+)$ convention, the lapse entry $g_{00}^{\mathrm{eff}} \approx -(1+2\Phi_N/c_0^2)$, with $\Phi_N<0$ the Newtonian benchmark potential, fixes only the clock-channel half of the signal delay. The refractive slowing of photon-channel signals moving through the Noether sea must recover the full first-order delay factor $c_0/c_{\text{eff}}=1-(1+\gamma_{\mathrm{PPN}})\Phi_N/c_0^2$ of the [explicit weak-field delay map](../../../../markdown/aaa/spacetime/ppn-parameters.md#explicit-weak-field-noether-sea-delay-map-ppn-gamma), whose other half is the spatial-compliance (ruler) response; a lapse-only map reproduces half the observed bending and delay and fails the Cassini constraint.

#### Gravitational Time Dilation

This entry requires that the proposed mechanical slowing induced by Noether braid density aligns quantitatively with satellite-clock and redshift observations such as GPS offsets and the Pound–Rebka experiment, offering a concrete mapping between the new microphysics and the classical time-dilation effects.

* **Constraint** – reproduce GPS clock offsets ($38\,\mu\mathrm{s/day}$, the net relativistic rate offset of an orbiting GPS clock relative to a ground clock), the Pound–Rebka redshift, and height-resolved optical-clock redshift with $\Delta\nu/\nu\approx gL/c_0^2$, where $g$ is the local gravitational acceleration and $L$ the height difference; this includes the approximate scales $1.1\times10^{-19}$ across $1\,\mathrm{mm}$ and $3.6\times10^{-17}$ across $33\,\mathrm{cm}$ near Earth's surface, the scales of the [finite-height clock benchmark](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md#finite-height-clock-benchmark).
* **Mechanism** – mechanical slowing of Noether braid orbital frequencies couples to the local Noether braid density and Noether sea delay factor, generating the observed dilation without changing the constitutive map used for other weak-field observables.

#### Massive-Superposition Gravitational Distinguishability

Massive-interference experiments and precision gravity readouts jointly test whether the effective-metric channel carries enough branch information to become a which-path record. The observable is not whether spacetime is declared classical or quantum. The observable is whether two mass-density histories produce a distinguishable gravitational response before the apparatus has formed a durable record.

* **Constraint** – for two branch-level mass-density histories $\rho_1$ and $\rho_2$, the gravitational distinguishability diagnostic
  $$
  \mathcal{D}_{\mathrm{grav}}(T_W;\theta)
  =
  \int_0^{T_W}\!\!\int_0^{T_W}
  \Delta h_A(t_{\mathrm{eff}})\,
  N^{-1}_{AB}(t_{\mathrm{eff}},t'_{\mathrm{eff}})\,
  \Delta h_B(t'_{\mathrm{eff}})\,dt_{\mathrm{eff}}\,dt'_{\mathrm{eff}}
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-ad599d5e1bd52189)

  with $\Delta h_A(t_{\mathrm{eff}})=h_A(t_{\mathrm{eff}};\rho_1,\theta)-h_A(t_{\mathrm{eff}};\rho_2,\theta)$, must remain below the declared which-path threshold for any interference-preserving run unless a record-forming separatrix crossing and persistence window are also derived. Here $h_A$ is the gravitational response in resolved detector channel $A$ under the shared effective-metric record $\theta$, $t_{\mathrm{eff}}$ is effective observer time, $T_W$ is the record window over which the readout is formed, and $N_{AB}$ is the observer-level noise covariance between channels, whose inverse weights the response difference; the diagnostic is the squared signal-to-noise ratio with which the two branch histories could be told apart.
* **Observable** – the data products are massive-superposition coherence time, branch separation and mass-displacement history, precision-gravity response, detector noise covariance, any two-probe entanglement witness, non-gravitational coupling residuals, and the absence or presence of a durable which-path record.
* **Validation Target** – combine long-coherence interferometry with Cavendish-like, atom-interferometric, or gravitational-wave-instrument precision bounds to constrain $\mathcal{D}_{\mathrm{grav}}$ using one effective-metric constitutive record $\theta$; the concrete scaffold is [Massive-Superposition Gravity Validation Packet](../../../../markdown/aaa/validation/massive-superposition-gravity.md).
* **Mediated-Entanglement Target** – for gravitationally induced entanglement comparisons, the same $\theta$ must generate the branch interaction phase $\Delta\Phi_{\mathrm{ent}}$ needed for the observed witness $C_{\mathrm{obs}}$ while keeping $\mathcal{R}_{\mathrm{nongrav}}$ below the isolation threshold and $\mathcal{D}_{\mathrm{grav}}$ below the which-path threshold.
* **Failure Condition** – the measurement and spacetime branches fail jointly if the same parameter record predicts $\mathcal{D}_{\mathrm{grav}}\gg1$ for an interference-preserving experiment while no apparatus/environment record satisfies the record-autonomy condition in [Measurement Ontology](../../../../markdown/aaa/quantum/measurement-ontology.md).

#### CMB Scalar/Tensor Gate

The cosmology branch must recover the CMB scalar and tensor observables as data products before any source interpretation is promoted.

* **Constraint** – one Noether sea and assembly record must recover TT/TE/EE spectra, damping, CMB-lensing reconstruction, blackbody preservation, scalar amplitude $A_s$, scalar tilt $n_s$, acoustic phase coherence, vector-mode suppression, and the bound $r\le r_{\max}$ on the tensor-to-scalar ratio without changing Noether sea state variables between the CMB, BBN, expansion, and growth modules.
* **Observable** – the CMB comparison residual $\mathcal{R}_{\mathrm{CMB}}(\theta)$ defined in [CMB](../../../../markdown/aaa/cosmology/CMB.md) must remain within the declared tolerance for the data release being used, and the added $\mathcal{R}_{\mathrm{phase}}(\theta)$, $\mathcal{R}_{V}(\theta)$, and $\mathcal{R}_{\mathrm{lens}}(\theta)$ gates must not require a separate medium history.
* **Smoothness Check** – the same record must also bound the effective smoothness residual $\mathcal{R}_{\mathrm{smooth}}(\theta)$, so early-universe smoothness is tested as low observer-level gravitational free-mode content rather than assumed from an imported origin story.
* **Failure Condition** – if the framework can fit the source story only by retuning scalar power, acoustic phase, vector-mode content, CMB-lensing reconstruction, tensor contribution, blackbody recovery, or TT/TE/EE transfer independently, the cosmology closure fails at the observational layer.

#### Compact Dark-Sector Local-Detection Gate

Compact neutral-assembly or primordial-defect branches must face local gravitational searches as data products, not only cosmological abundance fits. For a branch record $\theta_A$ with representative mass $M_A$, local fraction $f_A$ of the local dark-matter mass density $\rho_{\mathrm{DM}}$, and relative-speed distribution $p(v_{\mathrm{rel}})$ with mean $\langle v_{\mathrm{rel}}\rangle_{\theta_A}$, the first estimate of the rate of passages within impact parameter $b_{\max}$ of a tracked body is
$$
\Gamma_{\mathrm{flyby}}(b_{\max},M_A;\theta_A)
=
\frac{f_A\rho_{\mathrm{DM}}}{M_A}\,
\pi b_{\max}^2\,
\langle v_{\mathrm{rel}}\rangle_{\theta_A}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8fbef462600b538c)

The corresponding impulse scale on a tracked body, in the observer-level Newtonian comparison form used only as an effective-grade estimate, is
$$
\Delta v_{\mathrm{test}}
\simeq
\frac{2GM_A}{b\,v_{\mathrm{rel}}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d00c040262a64977)

where $G$ is the observer-level gravitational constant, $b$ the impact parameter of one passage, and $v_{\mathrm{rel}}$ its relative speed; the velocity change is the momentum transfer of a single distant flyby, and the accepted comparison uses the full ephemeris covariance rather than this estimate alone.

* **Constraint** – any claimed local compact dark-sector signal must produce an ephemeris residual $\Delta x_{\mathrm{ephem,eff}}^{i,\theta}(t_{\mathrm{eff}})$ above the declared ranging and model-error floor while remaining inconsistent with ordinary catalogued bodies under the same orbit-reconstruction covariance.
* **Co-Signature Check** – if the branch predicts high-energy particles, radiation, or gravitational-wave sidebands, those observables must use the same trajectory, mass, and abundance record as the ephemeris perturbation.
* **Failure Condition** – a compact dark-sector branch fails locally if it explains cosmological abundance with one mass or population record but requires a different record for ephemerides, visible-object exclusions, or high-energy null results.

#### Closure Program Tracking Hooks

Use this ledger as the acceptance layer for the six integrated closure programs:

| Program | Primary chapters | Ledger gate |
| --- | --- | --- |
| CKM holonomy closure | [theory-bridges/weak-mixing-ckm.md](../../../../markdown/aaa/philosophy-history/theory-bridges/weak-mixing-ckm.md) | CKM hierarchy and CP-phase consistency with propagated uncertainty |
| PMNS neutral braid closure | [assemblies/fermions/neutrinos.md](../../../../markdown/aaa/assemblies/fermions/neutrinos.md) | Oscillation pattern consistency across $L/E$ and medium regimes |
| Emergent metric / PPN closure | [spacetime/emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md), [spacetime/ppn-parameters.md](../../../../markdown/aaa/spacetime/ppn-parameters.md), [spacetime/proper-time-and-time-dilation.md](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md) | Lorentz leakage, PPN, redshift, Shapiro, GW-speed bounds |
| Non-relativistic Schrödinger + Born closure | [theory-bridges/pilot-wave-character.md](../../../../markdown/aaa/philosophy-history/theory-bridges/pilot-wave-character.md), [quantum/wavefunction-ontology.md](../../../../markdown/aaa/quantum/wavefunction-ontology.md), [theory-bridges/superposition-mechanism.md](../../../../markdown/aaa/philosophy-history/theory-bridges/superposition-mechanism.md) | Effective fixed-particle-number wave equation + statistical outcome consistency |
| Photon Gate A/B/C closure | [assemblies/bosons/electroweak-bosons.md](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md), [theory-bridges/angular-momentum-and-spin.md](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md), [validation/reaction-cosmology-provenance-ledger.md](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md), [spacetime/lorentz-kinematics.md](../../../../markdown/aaa/spacetime/lorentz-kinematics.md) | Gate A massless nondispersive photon kinematics, Gate B polarization and squared-amplitude capture as a downstream spin/helicity ledger, and Gate C Maxwell/QED vertices, pair/radiation provenance, and $\alpha$ recovery |
| Topological spin/confinement closure | [dynamics/causal-action-functional.md](../../../../markdown/aaa/dynamics/causal-action-functional.md), [assemblies/fermions/color-charge-su3.md](../../../../markdown/aaa/assemblies/fermions/color-charge-su3.md) | $4\pi$ spin structure and open-vs-closed color-energy scaling |

For each program $P$ in the table, let $\mathcal{C}_P$ be its acceptance set: the set of shared records $\theta$ that pass that program's ledger gate within its declared tolerance after uncertainty propagation. The six sets are program-level views of one record; the sector acceptance sets of [Failure Criteria](../../../../markdown/aaa/validation/failure-criteria.md#sector-acceptance-sets) partition the same record by physical sector and remain in force alongside them. The cross-program acceptance principle is that one record must lie in every program's set:
$$
\mathcal{C}_{\mathrm{CKM}}
\cap
\mathcal{C}_{\mathrm{PMNS}}
\cap
\mathcal{C}_{\mathrm{PPN/GR}}
\cap
\mathcal{C}_{\mathrm{QM}}
\cap
\mathcal{C}_{\mathrm{Photon}}
\cap
\mathcal{C}_{\mathrm{Topo}}
\neq \varnothing
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b6a0379c548612df)

If the intersection is empty after uncertainty propagation, the integrated model version is rejected.

### Sources

The quoted bounds in this ledger are observer-level measurements; each source below supports the passage named and enters as a constraint, never as a substrate premise.

- M. Nagel et al., *Direct Terrestrial Test of Lorentz Symmetry in Electrodynamics to $10^{-18}$*, Nature Communications 6, 8174 (2015), [arXiv:1412.6954](https://arxiv.org/abs/1412.6954), DOI: 10.1038/ncomms9174. Supports the resonator anisotropy bound in the Lorentz-invariance entry: orientation-dependent relative frequency changes constrained to $(9.2\pm10.7)\times10^{-19}$ at 95% confidence, which the ledger rounds to the conservative $10^{-17}$ threshold.
- B. P. Abbott et al., *Gravitational Waves and Gamma-rays from a Binary Neutron Star Merger: GW170817 and GRB 170817A*, Astrophysical Journal Letters 848, L13 (2017), [arXiv:1710.05834](https://arxiv.org/abs/1710.05834), DOI: 10.3847/2041-8213/aa920c. Supports the GW Speed entry: the observed $(+1.74\pm0.05)\,\mathrm{s}$ delay constrains the gravity-to-light speed difference to between $-3\times10^{-15}$ and $+7\times10^{-16}$ of the speed of light under the analysis's distance and emission-lag assumptions.
- B. Bertotti, L. Iess, and P. Tortora, *A test of general relativity using radio links with the Cassini spacecraft*, Nature 425, 374–376 (2003), DOI: [10.1038/nature01997](https://doi.org/10.1038/nature01997). Supports the refraction-mapping entry: $\gamma_{\mathrm{PPN}}=1+(2.1\pm2.3)\times10^{-5}$ from the frequency shift of radio signals passing near the Sun, with bending and delay proportional to $1+\gamma_{\mathrm{PPN}}$.
- N. Ashby, *Relativity in the Global Positioning System*, Living Reviews in Relativity 6, 1 (2003), DOI: [10.12942/lrr-2003-1](https://doi.org/10.12942/lrr-2003-1). Supports the GPS figure in the time-dilation entry: the net constant fractional rate offset of $-4.4647\times10^{-10}$ in its equation (35) corresponds to about $38\,\mu\mathrm{s}$ per day.
- C. W. Chou, D. B. Hume, T. Rosenband, and D. J. Wineland, *Optical Clocks and Relativity*, Science 329, 1630–1633 (2010), DOI: [10.1126/science.1192720](https://doi.org/10.1126/science.1192720). Supports the $33\,\mathrm{cm}$ scale: a height change of $33\,\mathrm{cm}$ between two optical clocks produced a fractional frequency change of $(4.1\pm1.6)\times10^{-17}$, against the $gL/c^2$ expectation of about $1.1\times10^{-16}$ per meter.
- T. Bothwell et al., *Resolving the gravitational redshift within a millimeter atomic sample*, Nature 602, 420–424 (2022), [arXiv:2109.12238](https://arxiv.org/abs/2109.12238), DOI: 10.1038/s41586-021-04349-7. Supports the $1\,\mathrm{mm}$ scale: a linear frequency gradient consistent with the gravitational redshift was resolved within a single millimeter-scale atomic sample.

## Failure Criteria

This chapter states the hard-stop conditions for $\mathbb{A}\mathbb{A}\mathbb{A}$. Its purpose is to distinguish ordinary incompleteness from genuine failure modes, especially where a local success in one sector cannot survive the shared closure intersection. A closure attempt is a proposed derivation of an accepted observer-level result from the substrate primitives, and a closure record is the complete set of assumptions, branch data, ledgers, and tolerances that the attempt consumes. A sector is one benchmark domain, such as weak reactions or cosmology, with its own accepted observations. Promotion is the step that accepts a closure record as part of the theory rather than as a local result, and a gate is a condition a record must pass before that step. Every rejection below names the gate it fails.

Its operational companions are [Validation Protocols](../../../../markdown/aaa/validation/validation-protocols.md), [No-Go Theorems](../../../../markdown/aaa/validation/no-go-theorems.md), [Known Tensions](../../../../markdown/aaa/validation/known-tensions.md), [Lorentz Kinematics](../../../../markdown/aaa/spacetime/lorentz-kinematics.md), [Proper Time and Time Dilation](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md), and [Absolute Time Defense](../../../../markdown/aaa/foundations/absolute-time-defense.md).

### Shared Closure Record

Let

$$
\mathfrak{S}
=
\{
\mathrm{weak},
\mathrm{quantum},
\mathrm{gravity},
\mathrm{hadronic},
\mathrm{radiation},
\mathrm{cosmology}
\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ae0906211b8f859b)

be the sector set. A candidate promoted closure is a record $\theta$ in the space $\mathfrak{X}$ of candidate closure records, whose shared coordinates include

$$
\theta_{\mathrm{join}}
=
\left(
A,
\Gamma,
\mathcal{H},
\mathcal{R},
\mathcal{L}_{E\mathbf{p}\mathbf{J}},
\zeta,
\mathcal{M}_{\mathrm{sea}}^{ab},
\{B_i\}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-dec17fd95fce165f)

where $A$ is the assembly or branch family, $\Gamma$ is the assembly microstate, $\mathcal{H}$ is the path-history and causal-wake ledger, $\mathcal{R}$ is the active residual family, $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ is the event ledger, $\zeta$ is shielding or exposure data, $\mathcal{M}_{\mathrm{sea}}^{ab}$ is the Noether sea response object, and $\{B_i\}$ is the basin or channel partition. Sector-local coordinates $Z_S(\theta)$ record the benchmark variables, theorem assumptions, provenance entries, and tolerances used by sector $S$. The space $\mathfrak{X}$ is the set of all such records: every $\theta\in\mathfrak{X}$ carries the shared coordinates $\theta_{\mathrm{join}}$ together with the sector-local coordinates $Z_S(\theta)$ for every sector $S\in\mathfrak{S}$.

For each sector $S$, fix a gate predicate $P_S:\mathfrak{X}\to\{0,1\}$, a benchmark map $\mathcal{B}_S:\mathfrak{X}\to\mathfrak{B}_S$ into the sector's benchmark space $\mathfrak{B}_S$, a validated benchmark region $\mathfrak{B}^{\mathrm{obs}}_S\subseteq\mathfrak{B}_S$, a benchmark metric $d_S$, a tolerance $\epsilon_S$, and a no-go pass predicate $\mathcal{G}_S:\mathfrak{X}\to\{0,1\}$. The gate predicate returns $1$ when the record supplies the sector's required structure, as listed in the Sector Acceptance Sets below. The no-go predicate returns $1$ only when every exclusion record of [No-Go Theorems](../../../../markdown/aaa/validation/no-go-theorems.md) that applies to sector $S$ is satisfied and every predicted non-baseline channel whose null data product lies in the sector's comparison domain passes the null-result residual defined below; the null-result gate therefore enters the sector sets through $\mathcal{G}_S$ rather than as a separate rule. Define the distance from a benchmark point to the validated region by

$$
\operatorname{dist}_{d_S}(b,\mathfrak{B}^{\mathrm{obs}}_S)
=
\inf_{b'\in\mathfrak{B}^{\mathrm{obs}}_S}d_S(b,b')
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ff05dd41fc1da9a3)

Here $b$ is a benchmark point, $b'$ ranges over the validated region, and the infimum is the smallest separation the metric $d_S$ assigns between them. The distance is zero exactly when $b$ lies in the closure of the validated region, and it is infinite when that region is empty, so an undeclared benchmark region fails every record. The sector acceptance set is the mathematical subset

$$
\mathcal{C}_S
=
\left\{
\theta\in\mathfrak{X}
:
P_S(\theta)=1,\quad
\operatorname{dist}_{d_S}\!\left(\mathcal{B}_S(\theta),\mathfrak{B}^{\mathrm{obs}}_S\right)
\le
\epsilon_S,\quad
\mathcal{G}_S(\theta)=1
\right\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c4e2ee8e8c2cc7a0)

A record belongs to $\mathcal{C}_S$ when three conditions hold together: the sector predicate passes, the benchmark image lies within the tolerance $\epsilon_S$ of the validated region, and the no-go predicate passes. The shared acceptance intersection is

$$
\mathcal{C}_{\mathbb{A}\mathbb{A}\mathbb{A}}
=
\bigcap_{S\in\mathfrak{S}}\mathcal{C}_S
$$

[View →](../../../../../equation-mapping.html#corpus-equation-297152e984480f6c)

A closure attempt survives the validation gate only as an element of $\mathcal{C}_{\mathbb{A}\mathbb{A}\mathbb{A}}$. A sector result that lies in one $\mathcal{C}_S$ but in no element of the full intersection remains a local result rather than a promoted $\mathbb{A}\mathbb{A}\mathbb{A}$ closure.

#### Residual-Bearing Criticism

A proposed failure claim must name the coordinate in $\theta_{\mathrm{join}}$, the sector predicate $P_S$, the benchmark distance, the no-go predicate $\mathcal{G}_S$, or the residual family $\mathcal{R}$ that it changes. Generic skepticism that leaves the closure record and every residual unchanged is not a closure-blocking condition. It may remain a comparison concern, but it does not promote to a validation failure until it moves an existing gate.

Let $q$ be a proposed criticism of a candidate record $\theta$. The notation $P_S(\theta;q)$, $\mathcal{B}_S(\theta;q)$, and $\mathcal{G}_S(\theta;q)$ means that the corresponding sector gate has been re-evaluated after applying the claimed change. Then $q$ can block promotion only if

$$
\left[
\exists S\in\mathfrak{S}:P_S(\theta;q)=0
\right]
\lor
\left[
\exists S\in\mathfrak{S}:
\operatorname{dist}_{d_S}\!\left(\mathcal{B}_S(\theta;q),\mathfrak{B}^{\mathrm{obs}}_S\right)
>
\epsilon_S
\right]
\lor
\left[
\exists S\in\mathfrak{S}:\mathcal{G}_S(\theta;q)=0
\right]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3cf57c3864ae23fe)

This rule does not make the validation suite less severe. It prevents a residual-bearing closure record from being rejected by a criticism that has not identified which accepted observable, mathematical consistency condition, or no-go assumption has actually changed.

#### Null-Result Residual for Added Channels

When a closure attempt predicts channels outside the validated Standard Model and GR-facing benchmark set, those channels must be tested against null results before the record can be promoted. Let $\mathfrak{E}_{\theta}^{\mathrm{new}}$ be the set of predicted additional channels for a candidate record $\theta$: unstable baryon channels, new charged or neutral partners, extra gauge or transport modes, preferred-frame leakage channels, or other non-baseline outputs that would have produced an observed rate, cross-section, lifetime shift, branching ratio, dispersion, or anisotropy. For each channel $e$, let $O_e(\theta)\ge0$ be the predicted observable and $O_e^{\max}>0$ the accepted upper bound in the comparison regime. Define

$$
\mathcal{R}_{\mathrm{null}}(\theta)
=
\sup_{e\in\mathfrak{E}_{\theta}^{\mathrm{new}}}
\left[
\log\frac{O_e(\theta)}{O_e^{\max}}
\right]_+,
\qquad
[x]_+\equiv\max(x,0)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-faae5e242e82d710)

The bracket $[x]_+$ keeps only the positive excess, so a channel contributes only when its predicted observable exceeds its bound, and a channel predicted absent, with $O_e(\theta)=0$, contributes nothing. The logarithm makes the residual a dimensionless excess measured in orders of magnitude, which is why the bound must be strictly positive; a bound stated as a lower limit on a lifetime is first converted to a rate ceiling, as in the proton case below. When the record predicts no additional channel, $\mathfrak{E}_{\theta}^{\mathrm{new}}=\varnothing$ and the residual is zero by convention. A promoted record must satisfy

$$
\mathcal{R}_{\mathrm{null}}(\theta)=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8936ac4a31efb763)

using the same shared coordinates $\theta_{\mathrm{join}}$ that recover the positive benchmarks. Because each sector's no-go predicate $\mathcal{G}_S$ carries this condition for the channels tested in its comparison domain, $\mathcal{R}_{\mathrm{null}}(\theta)=0$ is a necessary condition for membership in $\mathcal{C}_{\mathbb{A}\mathbb{A}\mathbb{A}}$; the residual-bearing disjunction above reaches it through its third clause, and the Promotion Lemma below inherits it through the extension fiber. A channel may avoid this gate only by being outside the validated comparison domain, by being an exactly unobservable gauge redundancy, or by being proven absent in the accepted branch family. It is not enough to add a large symmetry, partner family, hidden transport dimension, or unstable reaction corridor and then tune it below every bound with sector-specific parameters.

For symmetry-container comparisons, the extra-sector test is part of the positive claim rather than a later cleanup. If a larger algebra, hidden sector, or partner family is invoked to explain one observed pattern, every non-baseline channel it brings into the tested domain must either be exactly redundant, absent in the accepted branch family, or routed through the same $\mathcal{R}_{\mathrm{null}}^{\mathrm{op}}$ record that recovered the observed pattern.

##### Operational Null-Result Ledger

For audits and simulations, the same condition should be expanded into a channel ledger rather than left as a single symbol. Let $\theta_+$ denote the record used for the positive Standard-Model, GR, quantum, and cosmology benchmarks, and let $\theta_e$ denote the record used to suppress a predicted non-baseline channel $e$. Define the shared-record split
$$
\Delta_{\mathrm{shared}}(e;\theta)
=
\operatorname{dist}_{\mathrm{shared}}\!\left(
\pi_{\mathrm{shared}}\theta_e,
\pi_{\mathrm{shared}}\theta_+
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ba8fc2bca7b714c9)

where $\pi_{\mathrm{shared}}$ keeps the common Noether sea, assembly, weak-exposure, metric, and provenance coordinates consumed by both the positive benchmark and the null channel, and $\operatorname{dist}_{\mathrm{shared}}$ is a declared metric on those shared coordinates. In a consistent audit both sub-records are the candidate itself, $\theta_e=\theta_+=\theta$, and the split vanishes; the split is nonzero only when the audit trail shows that the positive benchmark and the channel suppression consumed different shared coordinates. The operational audit residual is
$$
\mathcal{R}_{\mathrm{null}}^{\mathrm{op}}(\theta)
=
\sup_{e\in\mathfrak{E}_{\theta}^{\mathrm{new}}}
\left(
\left[
\log\frac{O_e(\theta)}{O_e^{\max}}
\right]_+
+
\lambda_{\mathrm{split}}\Delta_{\mathrm{shared}}(e;\theta)
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-563febb2371718fa)

Here $\lambda_{\mathrm{split}}>0$ is a declared weight, fixed before the audit, that places the shared-record split on the same dimensionless scale as the logarithmic excess. Both summands are nonnegative and the weight is strictly positive, so $\mathcal{R}_{\mathrm{null}}^{\mathrm{op}}(\theta)=0$ holds exactly when every channel satisfies its bound and every split vanishes; a zero weight would silently drop the split condition. Requiring $\mathcal{R}_{\mathrm{null}}^{\mathrm{op}}(\theta)=0$ therefore implies the original promotion condition $\mathcal{R}_{\mathrm{null}}(\theta)=0$ and adds a second one. This form rejects a second failure mode: a channel can be numerically hidden but still fail because its suppression uses a different shared record from the one that fit the observed sector. The no-go predicates carry this operational form: $\mathcal{G}_S(\theta)=1$ requires the summand to vanish for every channel $e$ whose null data product lies in sector $S$'s comparison domain.

| Added-channel family | Example observable $O_e(\theta)$ | Null data product | Same-record requirement |
| --- | --- | --- | --- |
| Mirror matter or added charged partners | production cross-section, branching ratio, stable relic abundance | collider exclusions, precision electroweak fits, cosmological abundance bounds | the axial-layer and gauge-representation record that yields observed fermions must also exclude the partner branch |
| Superpartners or large symmetry partners | missing-energy rate, partner mass threshold, coupling strength | collider missing-energy and resonance searches | partner absence must follow from the accepted branch family, not from an independent mass threshold |
| Proton-instability or baryon-violating corridors | $\Gamma_p(\theta)$ or forbidden nuclear transition rate | proton-lifetime and rare-event limits | the same color/topology and reaction-provenance ledger used for hadrons must suppress the channel |
| Extra gauge bosons or gauge modes | resonance rate, precision-contact term, long-range force strength | collider, fifth-force, and precision-scattering bounds | the effective gauge residual must recover $U(1)_Y\times SU(2)_L\times SU(3)_c$ without an unsuppressed added mode |
| Magnetic-charge or monopole sectors | monopole event rate, effective magnetic-charge flux, stable relic abundance, long-range magnetic-charge force | monopole-search, collider, cosmic-ray, and cosmological abundance bounds | the same effective gauge record that recovers electric charge, loop phase, and electromagnetic force must prove the magnetic-charge sector absent, redundant, or below bounds |
| Hidden transport or extra propagation modes | dispersion, birefringence, scalar/vector gravitational-wave response | photon, gravitational-wave, and timing residuals | the same Noether sea response map must set clock, signal, and metric channels |
| Sterile or neutral partner branches | mixing angle, $\Delta N_{\mathrm{eff}}$, relic abundance, free-streaming scale | oscillation, BBN, CMB, and structure-formation bounds | the neutral-sector Hamiltonian and cosmology record must be shared |
| Preferred-frame leakage channels | two-way anisotropy, clock drift, PPN preferred-frame coefficients | resonator, atomic-clock, solar-system, and gravitational-wave timing bounds | the Lorentz-closure map must suppress leakage without retuning clock, ruler, or signal coefficients |

For the hidden-transport family, free-space birefringence is a direct null-result specialization rather than a new ontology. If $v_+(\omega,\hat{\mathbf{k}};\theta)$ and $v_-(\omega,\hat{\mathbf{k}};\theta)$ are the two physical photon-polarization propagation speeds extracted from the same record $\theta$, meaning the group speeds of the two polarization states of the photon assembly at angular frequency $\omega$ and propagation direction $\hat{\mathbf{k}}$, whose common nondispersive value is the photon-channel transport speed $c_\gamma$, define
$$
\mathcal{R}_{\mathrm{biref}}(\theta)
=
\sup_{\omega,\hat{\mathbf{k}}}
\left|
\frac{
v_+(\omega,\hat{\mathbf{k}};\theta)
-
v_-(\omega,\hat{\mathbf{k}};\theta)
}{c_0}
\right|
$$

[View →](../../../../../equation-mapping.html#corpus-equation-be440df4c80c8d28)

The residual is the largest fractional speed difference between the two polarizations, normalized by $c_0$, the asymptotic observer-sector speed calibration used in weak-field comparisons; the supremum runs over the frequencies and directions of the declared comparison regime, not over frequencies outside the tested domain. The photon/effective-metric record can be promoted only when $\mathcal{R}_{\mathrm{biref}}(\theta)\le\epsilon_{\mathrm{biref}}$ in the declared weak homogeneous regime and when the same $\theta$ also supplies the clock, ruler, signal, and metric coefficients used for the positive GR-facing benchmarks. If birefringence is numerically hidden by switching to a different channel record than the one used for lensing, Shapiro delay, spectra, or photon synchronization, $\mathcal{R}_{\mathrm{null}}^{\mathrm{op}}$ fails even if the split is individually small.

##### Null-Result Ownership Matrix

The following matrix assigns each recurring null-result family to the corpus homes that should carry the positive derivation and the absence proof. The owner document does not need to reproduce every experimental limit; it must state the observable $O_e(\theta)$, name the comparison bound $O_e^{\max}$, and route the channel through $\mathcal{R}_{\mathrm{null}}^{\mathrm{op}}$ when the channel is predicted.

| Channel family | Observable vector | Bound symbol | Primary owner | Supporting gates |
| --- | --- | --- | --- | --- |
| Mirror matter / added charged fermions | $(\sigma_{\mathrm{prod}},B_{\mathrm{vis}},\Omega_{\mathrm{relic}})$ | $O_{\mathrm{mirror}}^{\max}$ | [Quantum Number Mapping](../../../../markdown/aaa/assemblies/fermions/quantum-number-mapping.md) | [Gauge Symmetries](../../../../markdown/aaa/assemblies/gauge-symmetries.md), [Known Tensions](../../../../markdown/aaa/validation/known-tensions.md) |
| Superpartners / symmetry partners | $(\sigma_{\mathrm{miss}},m_{\mathrm{partner}},B_{\mathrm{cascade}})$ | $O_{\mathrm{partner}}^{\max}$ | [Gauge Symmetries](../../../../markdown/aaa/assemblies/gauge-symmetries.md) | [Theory Differentials](../../../../markdown/aaa/philosophy-history/theory-differentials.md), [No-Go Theorems](../../../../markdown/aaa/validation/no-go-theorems.md) |
| Proton-instability corridors | $(\Gamma_p,B_{p\to e^+\pi^0},B_{p\to\bar\nu K^+})$ | $\Gamma_p^{\max}$ | [Color Charge SU(3)](../../../../markdown/aaa/assemblies/fermions/color-charge-su3.md) | [Reaction Ledger](../../../../markdown/aaa/validation/reaction-ledger.md), [Known Tensions](../../../../markdown/aaa/validation/known-tensions.md) |
| Extra gauge bosons / gauge modes | $(\sigma_{Z'},\sigma_{W'},g_{\mathrm{new}},\Delta_{\mathrm{contact}})$ | $O_{\mathrm{gauge+}}^{\max}$ | [Gauge Symmetries](../../../../markdown/aaa/assemblies/gauge-symmetries.md) | [Gauge Structure Emergence](../../../../markdown/aaa/assemblies/gauge-structure-emergence.md), [Electroweak Bosons](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md) |
| Magnetic-charge / monopole sectors | $(R_m,Q_{m,\mathrm{eff}},\mathcal{F}_{m,\mathrm{eff}},\Omega_{\mathrm{mon}})$ | $O_m^{\max}$ | [Gauge Structure Emergence](../../../../markdown/aaa/assemblies/gauge-structure-emergence.md) | [Gauge Symmetries](../../../../markdown/aaa/assemblies/gauge-symmetries.md), [Constraint Ledger](../../../../markdown/aaa/validation/constraint-ledger.md) |
| Hidden transport / extra propagation modes | $(\Delta v/c,\omega_{\mathrm{disp}},h_{\mathrm{scalar}},h_{\mathrm{vector}})$ | $O_{\mathrm{transport}}^{\max}$ | [Constraint Ledger](../../../../markdown/aaa/validation/constraint-ledger.md) | [Observer Framework](../../../../markdown/aaa/spacetime/observer-framework.md), [PPN Parameters](../../../../markdown/aaa/spacetime/ppn-parameters.md) |
| Sterile / neutral partner branches | $(\theta_{\mathrm{mix}},\Delta N_{\mathrm{eff}},\Omega_{\nu_R},\lambda_{\mathrm{fs}})$ | $O_{\mathrm{sterile}}^{\max}$ | [Neutrinos](../../../../markdown/aaa/assemblies/fermions/neutrinos.md) | [Dark Matter](../../../../markdown/aaa/cosmology/dark-matter.md), [CMB](../../../../markdown/aaa/cosmology/CMB.md) |
| Preferred-frame leakage | $(\Delta_{\mathrm{tw}},\delta\nu/\nu,\alpha_1,\alpha_2,\alpha_3)$ | $O_{\mathrm{LV}}^{\max}$ | [Lorentz Kinematics](../../../../markdown/aaa/spacetime/lorentz-kinematics.md) | [PPN Parameters](../../../../markdown/aaa/spacetime/ppn-parameters.md), [Constraint Ledger](../../../../markdown/aaa/validation/constraint-ledger.md) |

For proton-instability corridors, convert every current partial-mean-life lower limit $\tau_c^{\min}$ into a channel-rate ceiling
$$
\Gamma_{p,c}^{\max}=\frac{1}{\tau_c^{\min}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d3bddeffcc50cf81)

Here $\Gamma_{p,c}$ is the partial rate of the proton into channel $c$, the product of its total reaction rate and the channel's branching fraction $B_c$, and $\tau_c^{\min}$ is the experimental lower limit on the partial mean life $\tau/B_c$. A lower limit on the partial mean life is therefore exactly an upper limit on the partial rate, which is the form the residual consumes. The current benchmark scale is already severe: the 2024 Particle Data Group listing gives $\tau/B(p\to e^+\pi^0)>2.4\times10^{34}\,\mathrm{yr}$ and $\tau/B(p\to\bar\nu K^+)>5.9\times10^{33}\,\mathrm{yr}$, each at 90% confidence; see Sources below. These numbers are comparison anchors, not permanent constants; a closure packet should cite the current experimental source when the hadronic gate is evaluated.

### Sector Acceptance Sets

The table names each sector's predicate, benchmark condition, and falsifier. The benchmark names are established observer-level results; the owner chapters linked from the ownership matrix above and from the failure-mode table below explain what each result claims and how the comparison is made, and no benchmark enters the substrate law as a premise.

| Sector | Predicate $P_S(\theta)=1$ | Benchmark condition | Falsifier |
| --- | --- | --- | --- |
| $\mathcal{C}_{\mathrm{weak}}$ | One weak-coupling-triad exposure record $\mathcal{E}_{\mathrm{weak}}(A)=Q_{\mathrm{weak}}[\Pi_{\mathrm{weak}}\mathcal{L}_A]$ supplies `V-A`, CKM/PMNS overlap, and weak-corridor provenance without redefining $\Pi_{\mathrm{weak}}$, $Q_{\mathrm{weak}}$, or the exposed domain. Here $\mathcal{L}_A$ is the retained ledger of branch family $A$, $\Pi_{\mathrm{weak}}$ is the weak consumer projection that keeps the exposed weak-coupling-triad data, and $Q_{\mathrm{weak}}$ is the quotient that reads the exposure class from that projection. | $\mathcal{B}_{\mathrm{weak}}(\theta)$ lies in the observed charged-current handedness, mixing, and provenance region within $\epsilon_{\mathrm{weak}}$. | Right-handed charged-current coupling is not strongly suppressed in the validated regime, or the weak exposure domain changes between chirality, mixing, and provenance. |
| $\mathcal{C}_{\mathrm{quantum}}$ | A transfer operator or return map $\mathcal{T}_{\Delta t}$, with $\Delta t$ the effective-chart time step declared in [Measurement Ontology](../../../../markdown/aaa/quantum/measurement-ontology.md), basin partition $\{B_i\}$, invariant or metastable measure $\mu_*$, and detector kernel produce $p_i=\mu_*(B_i)$ from $\Gamma$ and $\mathcal{H}$ without assigning probabilities as an external rule. | $\mathcal{B}_{\mathrm{quantum}}(\theta)$ lies in the Born-rule, Bell/CHSH/Tsirelson/GHZ/Hardy, Leggett-Garg temporal-correlation, detector-record, and no-signaling benchmark region within $\epsilon_{\mathrm{quantum}}$. | The validated regime gives non-Born weights, a classical-axis linear-correlation failure, untracked temporal-measurement disturbance, superluminal signal transfer, or a detector kernel not derived from the recorded causal state. |
| $\mathcal{C}_{\mathrm{gravity}}$ | One Noether sea response map $\mathcal{M}_{\mathrm{sea}}^{ab}$ supplies clock, ruler, effective signal-speed, weak-field metric, and PPN channels without changing coefficients per observable. | $\mathcal{B}_{\mathrm{gravity}}(\theta)$ lies in the redshift, Shapiro-delay, lensing, orbital, gravitational-wave-speed, PPN, and preferred-frame bound region within $\epsilon_{\mathrm{gravity}}$. | Clock, ruler, signal, or metric coefficients must be tuned independently, ordinary dissipative drag appears in stable motion, or preferred-frame leakage exceeds the recorded bounds. |
| $\mathcal{C}_{\mathrm{hadronic}}$ | An accepted branch family $A$, exposure quotient, color/topology ledger, residual strong channel set, and $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ close confinement, quark mass, baryon-stability, and nuclear-binding entries. | $\mathcal{B}_{\mathrm{hadronic}}(\theta)$ lies in the confinement, quark-hierarchy, proton-stability, deuteron, saturation, and alpha-like benchmark region within $\epsilon_{\mathrm{hadronic}}$. | The sector predicts generic fast proton decay, unphysical nuclear binding signs, missing color/topology closure, or an unbalanced architrino / Noether braid inventory. |
| $\mathcal{C}_{\mathrm{radiation}}$ | A radiation residual $\mathcal{R}_{\Theta}$, the event-ledger residual of [Radiation](../../../../markdown/aaa/reactions/radiation.md), selects admissible channels from $\{B_i\}$ and closes $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ with photon output, recoil, medium update, signed photon-frequency exchange, non-radiative remnant, or reaction entries explicitly recorded. | $\mathcal{B}_{\mathrm{radiation}}(\theta)$ lies in the Larmor/Liénard, bremsstrahlung, synchrotron, pair-threshold, Compton-like, SZ-like transfer, and blackbody benchmark region within $\epsilon_{\mathrm{radiation}}$. | Any benchmark requires per-observable retuning, untracked energy loss or gain, a missing recoil/provenance entry, a free longitudinal photon mode, or a blackbody fit not tied to the event ledger. |
| $\mathcal{C}_{\mathrm{cosmology}}$ | One source, transport, signed photon-frequency-transfer, thermalization, and clock-rate record uses the same $\rho_{\text{NS}}(\mathbf X,T)$, $n(\mathbf X,T)$, $\chi_{\text{sea}}(\mathbf X,T)$, $\mathcal{M}_{\mathrm{sea}}^{ab}$, and reaction provenance ledger across local source channels and observer-level cosmology. | $\mathcal{B}_{\mathrm{cosmology}}(\theta)$ lies in the BBN, CMB blackbody, damping, anisotropy, polarization handoff, redshift-budget, $H(z)$, BAO, and growth benchmark region within $\epsilon_{\mathrm{cosmology}}$. | BBN photon loading, CMB thermalization, redshift handoff, frequency-exchange closure, or structure growth requires unbalanced substrate creation, unlogged photon energy transfer, per-source retuning, or Noether sea variables incompatible with local reaction / radiation ledgers. |

### Promotion Lemma

For sector $S$, let $\pi_S:\mathfrak{X}\to\mathfrak{X}_S$ be the projection that keeps the sector-$S$ coordinates and shared coordinates consumed by that sector. For a local sector result $c\in\mathfrak{X}_S$, define the extension fiber

$$
\operatorname{Ext}_S(c)
=
\left\{
\theta\in\mathcal{C}_{\mathbb{A}\mathbb{A}\mathbb{A}}
:
\pi_S(\theta)=c
\right\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-071b8555e1818934)

**Lemma.** A local sector result $c$ is promotable through the validation gate if and only if $c\in\pi_S(\mathcal{C}_S)$ and

$$
\operatorname{Ext}_S(c)\ne\varnothing
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8559df833249e0d2)

Here promotable means that some record in $\mathcal{C}_{\mathbb{A}\mathbb{A}\mathbb{A}}$ retains $c$ as its sector-$S$ projection. The first condition is implied by the second, because any element of the fiber lies in $\mathcal{C}_S$ and projects to $c$; it is stated separately so that the local gate a result must first pass is named. Proof route: if $c$ is promoted, the promoted record must retain the sector-$S$ result and pass every sector gate, so it is an element of $\operatorname{Ext}_S(c)$. Conversely, any $\theta\in\operatorname{Ext}_S(c)$ is a shared closure record whose sector-$S$ projection equals $c$ and whose weak, quantum, gravity, hadronic, radiation, and cosmology predicates all pass; therefore the local result has survived the validation gate. If the fiber is empty, the result is blocked by at least one sector predicate, benchmark region, no-go record, or failure condition.

### Incompatibility Witnesses

A local claim $c$ imposes a constraint subset $I(c)\subseteq\mathfrak{X}$ consisting of all closure records that preserve the claim's definitions, coefficients, ledger entries, and effective-limit assumptions. For a target sector $T$, define the constrained target set

$$
\mathcal{C}_T\!\mid c
=
\mathcal{C}_T\cap I(c)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f33de09893345388)

An incompatibility witness from sector $S$ to sector $T$ is the object

$$
W_{S\to T}(c)
=
\left(
c,
T,
I(c),
P_T,
\mathcal{B}_T,
\mathfrak{B}^{\mathrm{obs}}_T,
d_T,
\epsilon_T,
\mathcal{G}_T,
\delta_T(c)
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-20f6249a882cd82b)

where

$$
\delta_T(c)
=
\epsilon_T
-
\inf_{\theta\in I(c),\,P_T(\theta)=1,\,\mathcal{G}_T(\theta)=1}
\operatorname{dist}_{d_T}\!\left(\mathcal{B}_T(\theta),\mathfrak{B}^{\mathrm{obs}}_T\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8d60299fd03e1e3d)

The margin $\delta_T(c)$ is the tolerance left over after the best record compatible with the claim has been placed as close as possible to the validated region; it is nonnegative whenever some compatible record passes the benchmark, so a negative margin certifies that none does, and it is $-\infty$ when no compatible record passes the predicates at all. The witness empties the target gate when $\mathcal{C}_T\!\mid c=\varnothing$. It damages the target gate when $\mathcal{C}_T\!\mid c\ne\varnothing$ but $\delta_T(c)$ falls below the sector's declared minimum margin, forces a hidden sector-specific parameter split, or leaves a required ledger entry undefined.

| Witness class | Imposed local claim $c$ | Target effect | Failure code |
| --- | --- | --- | --- |
| Weak-domain split | $I(c)$ requires distinct weak exposure domains for `V-A`, CKM/PMNS, and weak-corridor provenance. | $\mathcal{C}_{\mathrm{weak}}\!\mid c=\varnothing$ because $P_{\mathrm{weak}}$ requires one weak-coupling-triad exposure record. | `weak.hidden_domain_split` |
| Gravity coefficient split | $I(c)$ requires separate clock, ruler, signal, and PPN coefficients not derived from one $\mathcal{M}_{\mathrm{sea}}^{ab}$. | $\mathcal{C}_{\mathrm{gravity}}\!\mid c=\varnothing$ if the split is needed for benchmark recovery. | `gravity.hidden_tuning` |
| Radiation-cosmology split | $I(c)$ fits blackbody recovery with $\chi_{\text{sea}}^{\mathrm{CMB}}(\mathbf X,T)$ incompatible with the BBN or local radiation event ledger. | $\mathcal{C}_{\mathrm{cosmology}}\!\mid c=\varnothing$ or $\delta_{\mathrm{cosmology}}(c)<0$. | `cosmology.incompatible_transport_limit` |
| Quantum signal leak | $I(c)$ recovers Bell correlations through a detector kernel that transfers controllable signals outside the causal-wake ledger. | $\mathcal{C}_{\mathrm{quantum}}\!\mid c=\varnothing$ and the same record damages $\mathcal{C}_{\mathrm{gravity}}$ through preferred-frame leakage. | `quantum.signal_transfer` |
| Event-ledger omission | $I(c)$ routes radiation, reaction, measurement, or strong-field release without a required $E$, $\mathbf{p}$, $\mathbf{J}$, polarity, provenance, medium, or remnant entry. | The target sector using that event has no admissible $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ completion. | `event.missing_ledger_row` |
| Null-result violation | $I(c)$ predicts a non-baseline channel $e\in\mathfrak{E}_{\theta}^{\mathrm{new}}$ with $O_e(\theta)>O_e^{\max}$ in a tested regime. | The relevant sector may fit its positive benchmark condition, but its no-go predicate $\mathcal{G}_S$ returns $0$ and the shared closure record fails $\mathcal{R}_{\mathrm{null}}(\theta)=0$. | `null.observed_absence_violation` |

### Testable Failure Modes

| Failure mode | Mathematical test | Routed workstream |
| --- | --- | --- |
| Empty intersection | $\mathcal{C}_{\mathbb{A}\mathbb{A}\mathbb{A}}=\varnothing$ or $\operatorname{Ext}_S(c)=\varnothing$ for a proposed local promotion. | [Known Tensions](../../../../markdown/aaa/validation/known-tensions.md), [Closure Scorecard](../../../../markdown/aaa/validation/closure-scorecard.md) |
| Hidden tuning | A shared variable or map has sector-specific values $p_S\ne p_T$ with no recorded state variable, or the same benchmark family is recovered only by changing $\Pi_S$ or $Q_S$ (sector $S$'s consumer projection and exposure quotient, the analogues of $\Pi_{\mathrm{weak}}$ and $Q_{\mathrm{weak}}$), $\mathcal{R}$, $\{B_i\}$, the branch-chart revision record, equality map, root-coordinate split, $\mathcal{M}_{\mathrm{sea}}^{ab}$, $\rho_{\text{NS}}(\mathbf X,T)$, or $\chi_{\text{sea}}(\mathbf X,T)$ between cases. Branch-chart revisions selected after residual inspection rather than declared from branch geometry fail this test. | [Parameter Ledger](../../../../markdown/aaa/validation/parameter-ledger.md), [Constraint Ledger](../../../../markdown/aaa/validation/constraint-ledger.md) |
| Null-result violation | $\mathcal{R}_{\mathrm{null}}(\theta)>0$ for a predicted added channel in a validated comparison regime. | [Known Tensions](../../../../markdown/aaa/validation/known-tensions.md), [Constraint Ledger](../../../../markdown/aaa/validation/constraint-ledger.md) |
| Missing conservation/provenance field | $\mathcal{L}_{E\mathbf{p}\mathbf{J}}(\mathsf e)$ has an undefined or nonzero required ledger entry after all claimed outputs, recoil, medium updates, remnants, polarity / charge, architrino inventory, transmitter identity, emission time, causal-root branch, and branch-Jacobian records are included. | [Reaction Ledger](../../../../markdown/aaa/validation/reaction-ledger.md), [Reaction-Cosmology Provenance Ledger](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md) |
| Benchmark-only fitting | A target benchmark in $\mathfrak{B}^{\mathrm{obs}}_S$ is used as an input to $\mathcal{L}_A$, $\Pi_S$, $Q_S$, $\mathcal{R}$, $\{B_i\}$, a branch-chart revision, an equality map, a root-coordinate split, or $\mathcal{M}_{\mathrm{sea}}^{ab}$ rather than as an output of a replayable closure record. | [Particle Masses](../../../../markdown/aaa/assemblies/particle-masses.md), [Measurement Ontology](../../../../markdown/aaa/quantum/measurement-ontology.md), [Radiation](../../../../markdown/aaa/reactions/radiation.md) |
| Incompatible effective limits | Two sectors require asymptotic maps whose overlap is empty, for example incompatible weak-field metric limits, photon / radiation limits, blackbody / BBN transport limits, or quantum no-signaling / gravity causal limits. | [Known Tensions](../../../../markdown/aaa/validation/known-tensions.md), [General Relativity](../../../../markdown/aaa/spacetime/general-relativity.md), [Cosmology Ontology](../../../../markdown/aaa/cosmology/cosmology-ontology.md) |

### Preferred-Frame Hiding Stop Condition

1. **Hard wall:** If the Euclidean-void rest frame is detectable by any physical experiment at a two-way anisotropy $\Delta c/c > 10^{-17}$, the theory fails. Here $\Delta c/c$ is the fractional difference between round-trip signal speeds along differently oriented paths, the quantity written $\Delta_{\mathrm{tw}}$ in the ownership matrix above; a Michelson-Morley-type test compares such round trips as the apparatus rotates and reports the largest orientation-dependent change. The numerical threshold is the comparison anchor carried by the [Constraint Ledger](../../../../markdown/aaa/validation/constraint-ledger.md#lorentz-invariance--preferred-frame-effects-tier-1), and the stop condition compares the theory's predicted leakage with the current source-checked bound for the same calibrated observable, as [Lorentz Kinematics](../../../../markdown/aaa/spacetime/lorentz-kinematics.md) requires.
2. **Required compensation:** Moving assemblies must acquire the Lorentz-compatible deformation and clock laws, $L_{\parallel}=L_0/\gamma_{\mathrm{eff}}$ and $P=\gamma_{\mathrm{eff}}P_0$, from delayed causal closure and Noether sea response rather than from kinematic postulates. Here $L_0$ and $P_0$ are the assembly's rest extent and rest cycle period, $L_{\parallel}$ is its extent along the direction of motion, $P$ is its cycle period in motion compared with $P_0$ in the same declared time coordinate, and $\gamma_{\mathrm{eff}}=(1-\beta_{\mathrm{eff}}^2)^{-1/2}$ with $\beta_{\mathrm{eff}}=v/c_{\mathrm{eff}}$ is the Lorentz factor of the dressed channel, with $v$ the assembly group speed relative to the reference medium and $c_{\mathrm{eff}}$ its dressed clock-and-ruler channel speed. The channel qualification is the target declared in [Lorentz Kinematics](../../../../markdown/aaa/spacetime/lorentz-kinematics.md); the primitive wake speed $c_f$ enters it only through the dressed speed, and equality of the photon-channel speed with $c_{\mathrm{eff}}$ is a separate recovery condition.
3. **Coefficient closure:** Clock, ruler, signal, and metric response coefficients must suppress two-way anisotropy and other preferred-frame leakage to the validated bounds. A qualitative contraction story is not sufficient.
4. **Dissipative drag:** If the Noether sea induces ordinary drag that slows cosmological bodies without a conserving medium-dressed response mechanism, the theory is falsified.

### Critical Stop Conditions

- **$c_f$ variance:** If the primitive causal-wake speed $c_f$, the field speed at which every architrino wake expands through the Euclidean void, varies with position, time, direction, or emitter state, the theory fails. This condition concerns the primitive speed alone. The dressed assembly-channel speed $c_{\mathrm{eff}}$ and the photon-channel speed $c_\gamma$ vary with Noether sea state by construction, and that variation is the mechanism behind the gravity-sector benchmarks rather than a failure.
- **Noether sea drag:** If the Noether sea causes orbital decay or secular kinetic-energy loss through ordinary dissipative drag, rather than a reversible medium-dressed inertial response, the theory fails. Energy carried away as gravitational-wave or photon output is radiation recorded in the event ledger, not drag in this sense.
- **Lorentz leakage:** If absolute motion affects atomic spectra above $10^{-17}$, the theory fails. The observable is the fractional frequency modulation $\delta\nu/\nu$ of a named transition against a declared reference channel as the apparatus orientation and velocity relative to the Euclidean-void rest frame change over sidereal and annual comparison windows, the entry written $\delta\nu/\nu$ in the ownership matrix; the numerical threshold is the comparison anchor carried by the [Constraint Ledger](../../../../markdown/aaa/validation/constraint-ledger.md#lorentz-invariance--preferred-frame-effects-tier-1).
- **Empty shared intersection:** If quantitative development makes $\mathcal{C}_{\mathbb{A}\mathbb{A}\mathbb{A}}=\varnothing$, the implementation is rejected even if individual sector chapters remain locally suggestive.

### Sources

- S. Navas et al. (Particle Data Group), *Review of Particle Physics*, Phys. Rev. D 110, 030001 (2024), DOI: 10.1103/PhysRevD.110.030001; [proton listing](https://pdg.lbl.gov/2024/listings/rpp2024-list-p.pdf). Source of the two partial-mean-life lower limits quoted in the Null-Result Ownership Matrix, which the listing attributes to the Super-Kamiokande searches recorded there as TAKENAKA 20 for $p\to e^+\pi^0$ and ABE 14G for $p\to\bar\nu K^+$. These are observer-level comparison anchors, not substrate premises.

## No Go Theorems

This chapter classifies the formal obstruction results that act as validation filters for the Architrino Assembly Architecture ($\mathbb{A}\mathbb{A}\mathbb{A}$), the theory in which nature is built from [architrinos](../../../../markdown/aaa/foundations/architrino.md), point transceivers of definite polarity that move through a fixed Euclidean void in absolute time and interact only through the delayed causal wakes they emit. A no-go theorem is not useful here as a decorative citation. It is useful only when its assumptions, conclusion, and replacement burden can be recorded against a candidate closure, meaning a proposed account that claims to recover a tested piece of physics from those primitives.

A no-go theorem has a simple shape: if these assumptions are accepted, this conclusion cannot be avoided. That does not automatically defeat a theory that rejects one of the assumptions. It does mean the theory now owes a replacement mechanism for the tested behavior that the theorem was protecting.

This page is the bookkeeping layer for that debt. It separates direct falsifiers from assumption mismatches, and it prevents the easy mistake of saying "that theorem does not apply" while quietly keeping the theorem's validated target.

The operational companion is [Failure Criteria](../../../../markdown/aaa/validation/failure-criteria.md). That page defines the shared closure intersection. This page defines how a theorem enters one sector gate: directly as a rejection condition, as an assumption mismatch, as a replacement constraint, or as an irrelevant comparison.

Several entries below name objects that other chapters own, and each is used here only as the label of a declared record. The candidate record $\theta$ is the [shared closure record](../../../../markdown/aaa/validation/failure-criteria.md#shared-closure-record): one bundle of retained substrate histories, response maps, and observer maps that every sector benchmark must read from together, so that no benchmark is passed by a private choice of parameters. The retained path history $\mathcal{H}$ is the [retained causal-wake and branch-ledger history](../../../../markdown/aaa/quantum/measurement-ontology.md#transfer-operator-measure-contract) that the [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md) needs in order to evolve a receiver, because each acceleration contribution arrives from a transmitter's past emission point rather than from its present position. A [basin](../../../../markdown/aaa/quantum/wavefunction-ontology.md#closure-interface-basin-measure-formalization) $B_i$ is the set of admissible histories that resolve to one apparatus outcome, $\mu_*$ is the preparation-selected measure on those histories whose basin weights $\mu_*(B_i)$ are the predicted outcome probabilities, and $\mathcal{T}_{\Delta t}$ is the declared transition or return operator that advances the retained state by one step. An apparatus kernel $\mathcal{K}$ is the declared physical coupling between a probe and its target, so that a [record](../../../../markdown/aaa/quantum/measurement-ontology.md#what-makes-an-interaction-a-record) is an outcome of the same delayed dynamics rather than an external rule. A [Physical Observer](../../../../markdown/aaa/spacetime/observer-framework.md#physical-observers) is an assembly inside the [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md), the ambient population of neutral architrino assemblies that fills the void, and its clocks, rulers, and detectors are themselves dynamical outputs. The residuals $\Delta_{\mathrm{MI}}$ and $\Delta_{\mathrm{NS}}$ measure how far a candidate joint record law departs from measurement independence, the statistical independence of detector settings from the pair preparation, and from no-signaling, the setting-independence of each wing's marginal; the [Bell-family record-measure harness](../../../../markdown/aaa/validation/simulations/bell-family-record-measure.md#residual-object) defines both. The [null-result residual](../../../../markdown/aaa/validation/failure-criteria.md#null-result-residual-for-added-channels) $\mathcal{R}_{\mathrm{null}}(\theta)$ collects every non-baseline channel a candidate predicts and requires each to stay below its observational bound.

### Applicability Record

For a no-go family $G$, let $\mathcal{A}_G$ be its assumption set and let

$$
\sigma_{\theta,G}:\mathcal{A}_G\to
\{
\mathrm{accepted},
\mathrm{rejected},
\mathrm{replaced},
\mathrm{effective},
\mathrm{absent}
\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2c4d070c50ce6697)

record the $\mathbb{A}\mathbb{A}\mathbb{A}$ stance toward each assumption in the candidate record $\theta$. The applicability class is

$$
\operatorname{app}(G,\theta)
\in
\{
\mathrm{direct},
\mathrm{assumption\ mismatch},
\mathrm{replacement\ constraint},
\mathrm{irrelevant\ comparison}
\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0f1dd0a4d3ac0325)

The five statuses have fixed meanings. An assumption is `accepted` when it holds at the substrate level, `effective` when it holds only at the observer level in the tested regime, `rejected` when the substrate denies it and nothing in $\theta$ plays its role, `replaced` when the substrate denies it but a named $\mathbb{A}\mathbb{A}\mathbb{A}$ object in $\theta$ carries the role the assumption played in the proof, and `absent` when the objects the assumption speaks about do not occur in $\theta$ at all. The class is `direct` when every assumption in $\mathcal{A}_G$ is accepted or effective in the tested regime, so the conclusion applies to $\theta$ as a rejection condition. The class is `assumption mismatch` when at least one required assumption is rejected or absent and the theorem does not by itself supply a validated replacement burden. The class is `replacement constraint` when at least one assumption is rejected or replaced but the theorem protects a validated behavior that the candidate record must recover by $\mathbb{A}\mathbb{A}\mathbb{A}$ objects; the distinction from a mismatch lies entirely in whether a tested behavior stands behind the theorem. The class is `irrelevant comparison` when $G$ shares no benchmark variable, conservation condition, or effective limit with the local claim under test.

### Applicability Map

| No-go family | Applicability class | Assumption status | Replacement constraint or falsifier |
| --- | --- | --- | --- |
| [Bell/CHSH/Tsirelson](../../../../markdown/aaa/philosophy-history/theory-bridges/bell-theorem.md), including GHZ and Hardy subbenchmarks | `replacement constraint` | Bell's theorem assumes measurement independence and Bell factorizability: conditional on the complete hidden state $\lambda$, the joint outcome law factors into one local response per wing. The theorem admits any $\lambda$, including the complete retained history $\mathcal{H}$, so retaining path history does not by itself evade it, and neither does a finite wake speed. The rejected hypothesis is factorizability, status `replaced`: the [selected route](../../../../markdown/aaa/foundations/ontology.md#bell-nonlocality-placement) carries the non-factorizable response on a live $c_f$-mediated coordination channel between the two apparatus couplings, gated by pair provenance and operating outside the effective photon cone, which requires $c_f > c_0$ for the calibrated low-energy photon speed $c_0$. Measurement independence and observer-level no-signaling are `accepted` and remain benchmark constraints, as do the validated correlation bounds, the GHZ perfect-correlation products, and the Hardy zero and positive probability patterns. | Derive pair provenance, detector kernels, Born weights, no-signaling, Tsirelson-compatible correlations, GHZ product signs, and Hardy event margins from $\mathcal{T}_{\Delta t}$, $\{B_i\}$, and $\mu_*$. Record reconstruction is not sufficient unless the induced joint record measure also passes the Bell, no-signaling, measurement-independence, factorization-residual, GHZ parity, and Hardy-event gates. The finite-speed route carries its own obstruction: Bancal and collaborators showed that a model reproducing the quantum correlations through hidden influences of any finite speed above the light speed permits controllable faster-than-light signaling in suitable multipartite arrangements, under their stated causal and no-signaling assumptions, so a candidate must name which of that theorem's hypotheses its coordination channel fails. Failure occurs if the model reduces to the classical-axis linear-correlation mode, uses controllable superluminal transfer, treats final records as an explanation without deriving their tested joint distribution, lets the declared common-past record screen the wings into a Bell-local product law, assigns context-independent local values across GHZ contexts, erases Hardy's zero-probability constraints while claiming the positive event, or relies on a $c_f$ channel whose multipartite predictions permit signaling. |
| [Gleason probability measure](https://doi.org/10.1512/iumj.1957.6.56050) | `replacement constraint` | The theorem assumes a real or complex Hilbert space of dimension at least three and one normalized, countably additive, noncontextual probability measure on its closed subspaces or projectors. Hilbert-space projectors are not substrate ontology, but the protected benchmark is the Born-form consistency of probabilities across every calibrated orthogonal resolution of the same effective state. | Derive one apparatus-conditioned event measure from basin and preparation records, then show that its probabilities are normalized and additive over mutually exclusive outcomes and assign the same marginal to the same effective projector across overlapping calibrated contexts. Failure occurs if Born weights are inserted, if each basis receives an independently fitted measure, or if the theorem is invoked for a two-dimensional effective space without an additional continuity, POVM, or composite-system extension. |
| [Kochen-Specker noncontextual values](https://doi.org/10.1512/iumj.1968.17.17004) | `replacement constraint` | The theorem applies to Hilbert spaces of dimension at least three and assumes a context-independent value assignment that respects the functional relations among commuting observables. Such a global effective value map is not a substrate assumption. Effective operator values exist only after a preparation, apparatus kernel, coarse-graining, and record channel are declared. The protected benchmark is the quantum contextuality pattern: commuting context products, compatible shared marginals, and the absence of a global noncontextual value map in validated regimes. | Derive context-indexed apparatus records $r_{O,C}=R_{O,C}(\Phi_{\tau_C}^{\mathrm{tot}}(\Gamma_0;\mathcal{K}_C))$ from one substrate flow, where $\Gamma_0$ is the initial substrate state, $\mathcal{K}_C$ the apparatus kernel of context $C$, $\Phi_{\tau_C}^{\mathrm{tot}}$ the coupled apparatus-target flow run to the declared record time $\tau_C$, and $R_{O,C}$ the record map for observable $O$, as fixed by the [apparatus-context guardrail](../../../../markdown/aaa/philosophy-history/theory-bridges/quantum-operator-mapping.md#apparatus-context-guardrail), while recovering the declared context product constraints and shared-observable marginals. Failure occurs if the closure silently assigns substrate values to all effective operators, changes the target state per context, applies the theorem outside its dimension and functional-relation assumptions, or recovers contextuality only by making apparatus records inconsistent across overlapping calibrated contexts. |
| [Pusey-Barrett-Rudolph quantum-state reality theorem](https://doi.org/10.1038/nphys2309) | `replacement constraint` | The theorem assumes that distinct pure quantum states correspond to overlapping distributions over ontic states and that independently prepared systems have product ontic distributions. Preparation independence and ontic-state overlap are not substrate axioms; the wavefunction is observer-level bookkeeping rather than a primitive physical field. The protected benchmark is stronger: independently prepared systems must have declared preparation records, product or non-product provenance status, and the standard state-discrimination statistics. | A candidate wavefunction account must state whether its substrate preparation measure factorizes for independently prepared systems and must expose any provenance correlation needed to avoid the theorem. Failure occurs if the model treats overlapping effective wavefunctions as harmless while also accepting product preparation independence and the PBR measurement statistics, or if it evades the theorem by hiding unrecorded correlations between supposedly independent preparation devices. |
| Leggett-Garg temporal-correlation inequalities | `replacement constraint` | Macroscopic realism per se and noninvasive measurability are not substrate axioms. A measurement in $\mathbb{A}\mathbb{A}\mathbb{A}$ is a physical apparatus-target coupling, so temporal readouts may disturb later basin dynamics; the protected benchmark is the observed sequential-correlation data together with an explicit disturbance ledger. | A candidate measurement account must declare the apparatus kernels used at each time, recover the tested temporal correlators, and report whether earlier probes perturb later record statistics. Failure occurs if the model asserts a definite macro-trajectory with noninvasive readout while accepting a Leggett-Garg violation, or if it explains the violation only by untracked apparatus disturbance rather than a declared record-channel residual. |
| Frauchiger-Renner / Wigner-friend observed-observer consistency | `replacement constraint` | The standard no-go setup assumes that quantum state descriptions can be applied to other theory-users, that one observer may import another observer's certified certainty, and that one declared record channel cannot certify mutually exclusive outcomes. $\mathbb{A}\mathbb{A}\mathbb{A}$ rejects an external classical-observer cut, but it also rejects importing another observer's conclusion without a physical record channel, access region, apparatus kernel, and boundary-data model. | A measurement closure that includes observed Physical Observers must derive every imported statement from the same substrate flow, record-autonomy test, and finite communication channel used for ordinary apparatus records. Failure occurs if a model needs a hidden external observer, lets a Physical Observer import certainty without a durable record, treats an unbuildable reference/readout setup as a completed experiment, or allows two mutually exclusive outcomes to be certified inside one declared record channel. If the reference or readout channel cannot satisfy the physical record criteria, the thought experiment is blocked by realizability rather than promoted into ontology. |
| Groenewold-van Hove / global quantization map | `replacement constraint` | A global quantization map from all classical observables $C^\infty(M)$ to Hilbert-space operators, preserving every Poisson bracket as a commutator, is not a substrate assumption. The protected benchmark is narrower: in validated quantum regimes, the selected observer-level observables must recover the tested commutator algebra on the calibrated record domain. | Derive an admissible observable set from the same coarse-graining, apparatus kernel, retained path-history data, and record window used for the effective operator model, then bound the quantization-domain residual in [Quantum Operator Mapping](../../../../markdown/aaa/philosophy-history/theory-bridges/quantum-operator-mapping.md#admissible-quantization-domain-guardrail). Failure occurs if a closure claims bracket-to-commutator recovery for all smooth classical functions, uses a choice of polarization or representation as hidden ontology, or changes the observable domain per benchmark without recording the physical apparatus and coarse-graining that justify the restriction. |
| Lorentz invariance and preferred-frame tests | `direct` | Observer-level clock, ruler, two-way signal, PPN, and spectral bounds apply directly to any candidate effective metric or transport map. | Bound the preferred-frame leakage scale $\epsilon_{\mathrm{LV}}$ and the two-way anisotropy mismatch $\Delta_{\mathrm{tw}}(\beta_f)$ of [Lorentz Kinematics](../../../../markdown/aaa/spacetime/lorentz-kinematics.md), where $\beta_f$ is the assembly group speed divided by the wake speed $c_f$, together with the [PPN parameters](../../../../markdown/aaa/spacetime/ppn-parameters.md), spectra, and gravitational-wave-speed differences, within recorded limits. The absolute frame is real in the substrate ontology, so the test is whether a candidate record predicts observer-level leakage above the accepted thresholds; failure occurs when it does. |
| Spin-statistics / exchange | `replacement constraint` | Local Lorentz-QFT axioms are not fundamental substrate assumptions, but matter stability and exchange classes are validated effective constraints. | Derive the ordered-frame lift, $4\pi$ spinor behavior, and bosonic/fermionic exchange classes from the topology of the [Noether braid](../../../../markdown/aaa/noether-braid/noether-braid.md), the neutral braided scaffold of coupled architrino worldlines that underlies matter assemblies, and from its angular-momentum ledger. Failure occurs if the lift cannot separate fermionic and bosonic closure classes. |
| CPT theorem / local relativistic QFT assumptions | `replacement constraint` | Local relativistic QFT assumptions are not substrate assumptions for absolute time, Euclidean void, and delayed causal wakes. This includes local field operators, microcausal commutation structure, fundamental Poincare symmetry, and a Lorentz-invariant vacuum as primitive assumptions. The protected benchmarks remain observer-level particle/antiparticle mass degeneracy, charge-conjugate reaction bookkeeping, neutral-meson and lepton-sector CPT bounds, Lorentz-leakage bounds, and the absence of unobserved baryon/lepton channels. | Recover the tested CPT-facing benchmarks from architrino polarity, the [pro/anti orientation and polarity-conjugation](../../../../markdown/aaa/archie/terminology-usage.md#proanti-orientation-and-polarity-conjugation) mapping between an assembly and its antimatter partner, delayed dynamics, effective Lorentz closure, and the existing null-result ledger. A candidate record should publish a residual vector such as $\mathcal{R}_{\mathrm{CPT}}(\theta)=(\Delta m_{p\bar p},\Delta q_{p\bar p},\Delta\Gamma_{\mathrm{conj}},\epsilon_{\mathrm{LV}},\mathcal{R}_{\mathrm{null}})$, whose components are the predicted proton-antiproton mass difference, the predicted proton-antiproton charge-magnitude difference, the predicted rate difference between a reaction and its charge-conjugate reaction, the preferred-frame leakage scale, and the null-result residual, and show that each component stays within the declared experimental or closure bound. Failure occurs if the record hides rejected local-QFT assumptions inside the proof, predicts CPT-violating mass or reaction asymmetries above bounds, or restores the symmetry only by adding untracked channels outside $\mathcal{R}_{\mathrm{null}}$. |
| Exact global architrino flips or permutations | `assumption mismatch` with replacement constraint when effective indistinguishability is claimed | Substrate architrinos are provenance-bearing entities with path-history and causal-wake records. A global flip, polarity reassignment, or label permutation is not exact unless it preserves those records and all causal-root relations, not merely the instantaneous exposed properties. | State whether the symmetry is a kernel/background symmetry, a full-history symmetry on a special state, or an effective coarse-grained equivalence. Effective exchange, gauge, flavor, or charge bookkeeping may be used only after the suppressed provenance data and replacement recovery target are named. Failure occurs if a closure treats provenance-suppressed interchangeability as substrate identity, or if an effective symmetry claim cannot recover the validated observer-level degeneracies, conservation laws, and exchange classes. |
| Coleman-Mandula / gauge unification constraints | `assumption mismatch` with replacement constraint when effective scattering is claimed | Exact Lorentz-invariant analytic S-matrix assumptions are not substrate assumptions for delayed absolute-time dynamics. Compact internal symmetry, unitarity, positive-energy particle states, and effective gauge-sector factorization become benchmarks when Standard-Model-facing scattering or mixing is claimed. A pre-effective symmetry container may evade the theorem's literal hypotheses only before observer-level spacetime, scattering states, and gauge factors have been recovered; after that recovery, the same record must reproduce the validated factorization and may not use mixed spacetime/internal generators to create observed-sector shortcuts. | State which assumptions are effective, recover compact internal gauge behavior in the tested regime, and derive gauge-like symmetries without contradicting observed factorization. Failure occurs if a claimed unification predicts forbidden effective-sector mixing, hides added channels outside $\mathcal{R}_{\mathrm{null}}$, uses gauge covariance as an unexplained fit, or suppresses non-baseline sectors with a record different from the positive recovery record. |
| Weinberg-Witten-like obstructions | `assumption mismatch` with replacement constraint when emergent photon or gravity language is claimed | The theorem has two parts with separate hypotheses. A theory with a Lorentz-covariant conserved current cannot contain a massless particle of spin greater than one half that carries a nonzero value of that current's charge, and a theory with a Lorentz-covariant conserved stress tensor cannot contain a massless particle of spin greater than one. Exact Lorentz covariance of a conserved current or stress tensor is not a substrate assumption for Noether sea state and assembly closures, because the substrate has a preferred frame and the covariance is an effective recovery. A composite photon is touched by the first part only if it carries the conserved charge of such a current; a composite graviton is touched by the second part whenever such a stress tensor exists. Photon and gravity claims must still recover the validated effective channels. | Keep photon and metric objects as medium/assembly closures with explicit domain limits, and state at which level the conserved current and stress tensor exist. Failure occurs if the record describes the emergent photon or graviton by an exactly Lorentz-covariant theory that carries a Lorentz-covariant conserved current or stress tensor of the relevant kind, because that record then satisfies the theorem's hypotheses and the composite massless state is forbidden, or if the effective limits cannot be recovered. |
| Boundary-Hamiltonian / kinematic-locality constraints on emergent gravity | `replacement constraint` when emergent gravity, boundary unitarity, or black-hole information claims are made | In generally covariant gravity comparisons, the Hamiltonian can be a boundary term, and Marolf-style arguments show that non-linear gravity is not straightforwardly recovered from a kinematically local theory with independently commuting bulk observables. $\mathbb{A}\mathbb{A}\mathbb{A}$ does not accept local QFT operator algebras, boundary Hamiltonians, or asymptotic boundary observables as substrate primitives, but the protected benchmark remains: effective gravity must carry unitary observer-level information accounting without freezing local dynamics or treating local horizon entanglement as a sharply defined substrate observable. | A candidate record must replace the rejected assumptions with finite boundary wake data, declared reference resources, access-region limits, and a Noether sea continuation map that recovers both local effective dynamics and boundary-accessible bookkeeping. Failure occurs if the model claims emergent GR from purely local commuting substrate variables, hides all bulk dynamics behind a boundary algebra, or treats horizon-crossing correlations as lost or recovered without a declared Physical Observer access model. |
| Global-GR underdetermination and observationally indistinguishable spacetime results | `replacement constraint` when a global cosmology, horizon, or effective-metric claim is promoted from observer records | Lorentzian manifold ontology, global spacetime extension classes, and model-class maximality assumptions are not substrate assumptions. The protected benchmark is methodological: rich local records and local-property preservation do not by themselves license a unique global reconstruction. | A promoted global claim must state the Physical Observer access region, data-product projection, local-induction assumptions, and ambiguity residual that make the claim invariant across admissible closure records. Failure occurs if a cosmology or strong-field packet treats a fitted FLRW, de Sitter, extension, or horizon interpretation as final ontology merely because it reproduces the observer-accessible data, or if it changes the admissible model class to obtain determinism or uniqueness without recording that assumption as part of the closure. |
| Massive-gravity and finite-range-gravity obstructions | `replacement constraint` when large-scale gravity modification is claimed | Fundamental massive-graviton and Lorentzian spin-2 assumptions are not $\mathbb{A}\mathbb{A}\mathbb{A}$ substrate assumptions. The protected constraints remain local GR recovery, bounded physical energy, stable mode counting, low-energy positivity bounds where the effective comparison domain accepts their assumptions, de Sitter or cosmological background bounds, and gravitational-wave polarization, speed, and dispersion limits. | A medium-response closure must recover the GR limit in validated regimes, keep perturbation energy bounded below after gauge and effective redundancies are removed, pass the accepted positivity tests for any claimed low-energy effective scattering or response map, and prevent extra scalar or longitudinal gravitational-wave modes or finite-range drift from exceeding observational bounds. Failure occurs if large-scale weakening is obtained only by allowing ghost-like negative-energy modes, positivity-violating effective coefficients, order-one solar-system deviations, or unconstrained gravitational-wave dispersion or polarization. |
| AdS/CFT, island, replica-wormhole, string, or loop-quantum-gravity comparison constraints | `irrelevant comparison` unless a specific tested benchmark is imported | These frameworks are comparison tools unless the local packet imports a precise entropy, unitarity, horizon, or observational condition as a gate. | No acceptance burden is created by analogy alone. A burden is created only by a named benchmark such as area-scaling entropy, Page-curve-compatible accounting, horizon regularity, or direct compact-object data. |

Black-hole CPT comparisons are handled by the CPT row, not by importing global mirror-boundary ontology. If a horizon-interface packet uses CPT or thermal-equilibrium language, it must publish the corresponding formation/release balance residual in the [black-hole chapter](../../../../markdown/aaa/spacetime/black-holes.md) and keep $\mathcal{R}_{\mathrm{CPT}}(\theta)$ within the tested particle-sector bounds. A record fails if it restores apparent balance only by adding untracked release channels, spectator species outside $\mathcal{R}_{\mathrm{null}}$, or a second state record for horizon entropy.

Cosmic Bell tests sharpen the Bell row by converting measurement-independence leakage into an observationally bounded residual. When detector settings are chosen from distant photons, quasars, or other causally screened sources, a candidate closure may not rely on an untracked common cause linking those settings to the pair-preparation record. Such a route must be recorded as nonzero $\Delta_{\mathrm{MI}}$ and compared against the experimental setting-source covariance bound rather than hidden inside pair provenance.

The GHZ and Hardy subbenchmarks sharpen the Bell row by removing any reliance on a single CHSH average. For a calibrated three-party GHZ setup, each wing measures one of two binary settings, written $X$ and $Y$, and a context is one choice of setting on every wing. The four product contexts $\mathcal{C}_{\mathrm{GHZ}}=\{XXX,XYY,YXY,YYX\}$ carry signs $\chi_C$, the perfectly correlated product of the three outcomes that the calibrated state fixes in context $C$, whose product over the four contexts is $-1$. Any context-independent local value assignment makes that product $+1$, because each wing's $X$ value and $Y$ value then appear exactly twice across the four contexts and every square is $+1$. A compact record residual is
$$
\Delta_{\mathrm{GHZ}}
=
\max_{C\in\mathcal{C}_{\mathrm{GHZ}}}
\left[
1-\chi_C E_\theta(C)
\right]_+
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5bb7e87614bf70d1)

where $E_\theta(C)$ is the product expectation predicted by the candidate record for the declared apparatus context and $[x]_+\equiv\max(x,0)$; the residual vanishes exactly when the record reproduces every perfect correlation. For a Hardy setup, $U_i$ and $D_i$ are the two calibrated binary measurement settings on wing $i\in\{1,2\}$, each with outcomes $0$ and $1$, and the displayed probabilities come from four distinct setting pairs: $(D_1,D_2)$, $(U_1,U_2)$, $(D_1,U_2)$, and $(U_1,D_2)$. They must therefore be assembled from those four declared apparatus contexts rather than treated as one joint context. The experiment fixes three of the four probabilities at zero and the first at a positive value. Any local value assignment in which both $D$ outcomes equal $1$ must either have both $U$ outcomes equal to $1$ or fall into one of the two mixed zero-probability events, so under Bell factorizability the first probability can never exceed the sum of the other three. Use the zero-probability constraints and positive Hardy event as a margin:
$$
\Delta_{\mathrm{Hardy}}
=
\left[
P_\theta(D_1=1,D_2=1)
-
P_\theta(U_1=1,U_2=1)
-
P_\theta(D_1=1,U_2=0)
-
P_\theta(U_1=0,D_2=1)
\right]_+
$$

[View →](../../../../../equation-mapping.html#corpus-equation-dde13de1c762fe9e)

A positive margin therefore certifies a departure from Bell factorizability without any inequality average. A useful Bell-family closure must make $\Delta_{\mathrm{GHZ}}$ small on the perfect-correlation contexts, produce the positive Hardy margin where the experiment requires it, and still keep $\Delta_{\mathrm{MI}}$ and $\Delta_{\mathrm{NS}}$ inside tolerance. These are validation targets for the joint record measure, not new ontology.

The Kochen-Specker row includes the Mermin-Peres magic square as a preferred compact benchmark when a candidate operator map claims contextuality recovery. In that subcase nine two-qubit observables are arranged in a three-by-three array so that the three observables in each row and in each column commute; the six row and column contexts carry product signs $\chi_C$, five of which equal $+1$ and one of which equals $-1$. The closure must derive context-indexed apparatus records that satisfy those products and preserve shared marginals while refusing a global noncontextual value map. A proof that only assigns prewritten substrate values to all effective operators fails the parity check: each observable appears in exactly one row and one column, so the product of all six context products of assigned values is $+1$, whereas the benchmark product signs multiply to $-1$.

The Pusey-Barrett-Rudolph row is a preparation-independence audit, not a license to ignore independent preparation. For two declared preparations $P_A$ and $P_B$, with substrate preparation measures $\rho_A(\lambda_A|P_A)$ and $\rho_B(\lambda_B|P_B)$ over the substrate states $\lambda_A$ and $\lambda_B$ of the two systems, and joint measure $\rho_{AB}(\lambda_A,\lambda_B|P_A,P_B)$, define
$$
\Delta_{\mathrm{PI}}
=
D_{\mathrm{TV}}\!\left(
\rho_{AB}(\lambda_A,\lambda_B|P_A,P_B),
\rho_A(\lambda_A|P_A)\rho_B(\lambda_B|P_B)
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6d6792f3a465044d)

where $D_{\mathrm{TV}}$ is the total variation distance, half the integrated absolute difference between the two measures, so that $\Delta_{\mathrm{PI}}=0$ states exact preparation independence. If a candidate avoids the theorem by allowing $\Delta_{\mathrm{PI}}>0$, that residual must be tied to a physical shared-provenance, boundary-data, or apparatus-coupling record. Otherwise it is an untracked preparation correlation. The theorem has two hypotheses beyond the quantum statistics, overlap and preparation independence, and a candidate must report the status of both. The useful closure target is therefore two-part: recover the PBR state-discrimination statistics in the declared record channel while reporting whether distinct effective preparations have overlapping substrate measures and whether the joint preparation measure factorizes. A record in which the effective wavefunction is a function of the retained substrate history, so that distinct effective states have disjoint substrate supports, fails the overlap hypothesis and needs no preparation correlation. If both the PBR measurement statistics and preparation independence are accepted in the same domain, overlapping effective wavefunction descriptions cannot be treated as a harmless epistemic overlap.

The Leggett-Garg row protects temporal correlation data without importing macrorealism as ontology. For dichotomic records $q_i\in\{-1,+1\}$ taken at three ordered absolute times $T_1 < T_2 < T_3$, with $\mathcal{K}_i$ the apparatus kernel applied at the $i$-th time and $P_\theta(q_i,q_j|\mathcal{K}_i,\mathcal{K}_j)$ the joint record law the candidate predicts when only the $i$-th and $j$-th probes are applied, define
$$
C_{ij}
=
\sum_{q_i,q_j=\pm1}
q_iq_j\,P_\theta(q_i,q_j|\mathcal{K}_i,\mathcal{K}_j),
\qquad
K_{\mathrm{LG}}=C_{12}+C_{23}-C_{13}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-fa042f9258181515)

Here $C_{ij}$ is the two-time correlator of the records and $K_{\mathrm{LG}}$ the three-time Leggett-Garg combination. Macrorealism plus noninvasive measurability gives $K_{\mathrm{LG}}\le 1$ for this sign convention, because those two assumptions make every run carry three definite values $q_1,q_2,q_3$ unaffected by which probes were applied, and every assignment of three signs gives $q_1q_2+q_2q_3-q_1q_3\le 1$; averaging preserves the bound. The $\mathbb{A}\mathbb{A}\mathbb{A}$ replacement burden is not to accept noninvasive readout, but to declare the disturbance residual
$$
\Delta_{\mathrm{NIM}}
=
\sup_{i<j}
D_{\mathrm{TV}}\!\left(
P_\theta(q_j|\mathcal{K}_j),
P_\theta(q_j|\mathcal{K}_i,\mathcal{K}_j)
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e0a9ccb05be2c366)

which is the largest total variation distance between the law of a later record taken alone and the law of the same record after an earlier probe has been applied, then recover the observed $K_{\mathrm{LG}}$-type statistics, and state whether the violation is carried by ordinary record-forming apparatus coupling, weak-probe disturbance, or a still-unclosed measurement model. A result that leaves $\Delta_{\mathrm{NIM}}$ implicit has not converted the Leggett-Garg comparison into a usable validation gate.

For finite-range gravity comparisons, positivity bounds should be treated as an effective-domain filter, not as imported ontology. Let $E_{\min}^{\mathrm{phys}}(\theta)$ denote the lowest physical perturbation energy after gauge and redundant variables are removed, so that a negative value signals a ghost-like mode, and let $\Pi_a(\theta)$ denote the low-energy positivity functionals whose signs are fixed by the accepted comparison theorem for the declared scattering or response domain, so that a negative value signals a violated bound. Let $\mathcal{R}_{\mathrm{GR}}(\theta)$ be the local general-relativity recovery residual, the normalized distance of the record's clock, delay, lensing, orbital, and [PPN](../../../../markdown/aaa/spacetime/ppn-parameters.md) predictions from their validated region, and let $\mathcal{R}_{\mathrm{shared}}(\theta)$ be the [shared cosmological calibration residual](../../../../markdown/aaa/cosmology/dark-energy.md#inference-dependency-and-calibration-gates) that ties the same Noether sea record to the expansion-history data. A compact residual for a candidate large-scale weakening record is
$$
\mathcal{R}_{\mathrm{range}}(\theta)
=
w_{\mathrm{GR}}\mathcal{R}_{\mathrm{GR}}(\theta)
+
w_E
\left[
\frac{-E_{\min}^{\mathrm{phys}}(\theta)}{\epsilon_E}
\right]_+^2
+
w_{\mathrm{pos}}
\sum_a
\left[
\frac{-\Pi_a(\theta)}{\epsilon_{\mathrm{pos},a}}
\right]_+^2
+
w_{\mathrm{pol}}
\frac{\mathcal{P}_{\mathrm{extra}}}{\mathcal{P}_{\mathrm{TT}}}
+
w_{\mathrm{disp}}
\int_{\mathcal{B}_{\mathrm{GW}}}
\left|
\frac{\omega_\theta}{c_0^2}
\frac{\partial^2\omega_\theta}{\partial k^2}
\right|^2\,d\log f
+
w_{\mathrm{cos}}\mathcal{R}_{\mathrm{shared}}(\theta)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3d02cb85278d2376)

where $[x]_+\equiv\max(x,0)$, the weights $w_{\mathrm{GR}}$, $w_E$, $w_{\mathrm{pos}}$, $w_{\mathrm{pol}}$, $w_{\mathrm{disp}}$, and $w_{\mathrm{cos}}$ are positive and declared before evaluation, and $\epsilon_E$ and $\epsilon_{\mathrm{pos},a}$ are the positive tolerances that make the energy and positivity terms dimensionless. The polarization term is the ratio of inferred non-tensor detector power $\mathcal{P}_{\mathrm{extra}}$ to transverse-traceless tensor power $\mathcal{P}_{\mathrm{TT}}$ from [Gravitational Waves](../../../../markdown/aaa/spacetime/gravitational-waves.md#polarization-content), which requires $\mathcal{P}_{\mathrm{TT}}>0$. The dispersion term integrates the [dimensionless band diagnostic](../../../../markdown/aaa/spacetime/gravitational-waves.md#linear-wave-equation) over the validated gravitational-wave band $\mathcal{B}_{\mathrm{GW}}$: $\omega_\theta(k)$ is the record's angular frequency as a function of wave number $k$, $c_0$ is the calibrated asymptotic observer-sector speed, $f$ is the frequency, and a dispersionless record has $\partial^2\omega_\theta/\partial k^2=0$ throughout the band, which makes the term vanish. Every term is therefore a pure number, which is what allows one weighted sum to compare them. The record is useful only if one shared Noether sea response map can make this residual small. A result that passes local GR tests by changing the energy, positivity, polarization, dispersion, or cosmology record separately is not a promoted closure.

### Use in Validation

A candidate closure record must name the no-go family it touches and fill the applicability record before the result can be promoted. If $\operatorname{app}(G,\theta)=\mathrm{direct}$, the theorem's conclusion is a hard rejection condition. If $\operatorname{app}(G,\theta)=\mathrm{replacement\ constraint}$, the rejected assumption does not remove the burden; it only changes the object that must carry the validated behavior.

The no-go record therefore becomes one component of the no-go pass predicate $\mathcal{G}_S(\theta)$ that [Failure Criteria](../../../../markdown/aaa/validation/failure-criteria.md#sector-acceptance-sets) evaluates for each sector $S$ alongside that sector's benchmark distance. A result that passes a local benchmark but evades the relevant theorem by changing assumptions without supplying the replacement constraint is not a closure result.

### Sources

The three DOI links in the applicability map identify the original statements of Gleason's theorem, the Kochen-Specker theorem, and the Pusey-Barrett-Rudolph theorem, whose hypotheses those rows restate. The Bell row restates, in the stochastic form used by the CHSH benchmark, the locality and setting-independence hypotheses first stated deterministically in J. S. Bell, *On the Einstein Podolsky Rosen paradox*, Physics Physique Fizika 1, 195–200 (1964), [DOI 10.1103/PhysicsPhysiqueFizika.1.195](https://doi.org/10.1103/PhysicsPhysiqueFizika.1.195); the same row's finite-speed obstruction is J.-D. Bancal, S. Pironio, A. Acín, Y.-C. Liang, V. Scarani, and N. Gisin, *Quantum non-locality based on finite-speed causal influences leads to superluminal signalling*, Nature Physics 8, 867–870 (2012), [DOI 10.1038/nphys2460](https://doi.org/10.1038/nphys2460). The Weinberg-Witten row restates the two theorems of S. Weinberg and E. Witten, *Limits on massless particles*, Physics Letters B 96, 59–62 (1980), [DOI 10.1016/0370-2693(80)90212-9](https://doi.org/10.1016/0370-2693%2880%2990212-9). Each reference supplies the hypotheses of a comparison theorem at the observer level; none of them enters an $\mathbb{A}\mathbb{A}\mathbb{A}$ derivation as a premise.

## Known Tensions

This chapter is the pressure ledger for unresolved $\mathbb{A}\mathbb{A}\mathbb{A}$ closure burdens. It collects the places where the framework is not yet closed, where the derivation stack is thinner than the claim it supports, or where observations impose a hard quantitative burden that the corpus has not yet fully carried. Vague future ideas and low-stakes aspirations do not belong here.

This page does not collect vague uncertainty. Each tension identifies:

- the issue,
- why it matters,
- the repo status,
- the closure target,
- and the failure condition.

### Severity Scale

- **Tier 1:** a tension whose failure condition, if met, directly falsifies the architecture; while it remains open, verification of the architecture is incomplete rather than failed.
- **Tier 2:** does not by itself falsify the architecture, but blocks a serious Standard-Model or GR-level closure claim.
- **Tier 3:** important downstream completion issue, but not yet the main credibility gate.

### Pressure Ledger

| Tier | Issue | Why it matters | Repo status | Closure target | Failure condition |
| --- | --- | --- | --- | --- | --- |
| 1 | Weak `V-A` selection rule | The weak interaction must distinguish left-chiral fermions from right-chiral ones. | [quantum-number-mapping.md](../../../../markdown/aaa/assemblies/fermions/quantum-number-mapping.md) gives a geometric lock-out story, and [weak-mixing-ckm.md](../../../../markdown/aaa/philosophy-history/theory-bridges/weak-mixing-ckm.md) identifies this as part of the shared weak-coupling-triad exposure problem, but no operator derivation is complete. | Derive a docking or coupling operator that exposes the weak-coupling triad for left-handed charged-current coupling, hides it for right-handed charged-current coupling, and then reuses the same domain for CKM/PMNS overlap and weak-reaction provenance. | If right-handed neutrino or right-handed charged-fermion coupling to `W` is not strongly suppressed in the same regime, or if the exposure domain must be redefined separately for mixing and provenance, the weak-sector picture fails. |
| 1 | Preferred-frame leakage | The ontology has absolute time and a medium, so observer-level Lorentz hiding must be quantitative. | The requirement is clear in [constraint-ledger.md](../../../../markdown/aaa/validation/constraint-ledger.md), and [Lorentz Kinematics](../../../../markdown/aaa/spacetime/lorentz-kinematics.md) states the moving-assembly coefficient targets plus the translating-binary residual test, but the full attractor proof is not complete. | First solve the translating two-body branch and test $P_u/P_0=\gamma_f$ and $L_{\parallel}/L_{\perp}=1/\gamma_f$ on the same causal-root ledger, where $P_u$ is the cycle period of the binary translating at group speed $u$, $P_0$ its rest cycle period, $L_{\parallel}$ and $L_{\perp}$ its orbit extents along and transverse to the motion, and $\gamma_f=(1-u^2/c_f^2)^{-1/2}$ the Lorentz factor formed with the primitive wake speed $c_f$; then show that Noether braid clocks, rulers, and signal transport suppress measurable preferred-frame effects below recorded experimental bounds through coupled shape, clock, and two-way anisotropy closure. | Any robust preferred-frame signal above the recorded bounds, a non-Lorentzian binary residual that cannot be traced to a controlled branch feature, or any need to tune clock and ruler coefficients independently falsifies the observer-level spacetime closure. |
| 1 | Born-rule derivation | Quantum replacement claims are not credible without a basin-measure or equivalent statistical closure. | [wavefunction-ontology.md](../../../../markdown/aaa/quantum/wavefunction-ontology.md) and [measurement-ontology.md](../../../../markdown/aaa/quantum/measurement-ontology.md) fix the ontology; [quantum-operator-mapping.md](../../../../markdown/aaa/philosophy-history/theory-bridges/quantum-operator-mapping.md) states the finite-time invariant-measure, thermodynamic ensemble consistency, and admissible quantization-domain targets, but the derivation is still open. | Derive outcome weights from deterministic basin measures in the same regime that yields the effective wave equation, show that the same finite-window measure projects to the thermodynamic summaries used for apparatus irreversibility, decoherence, and record formation, and restrict effective operators to a physically declared observable domain rather than a global quantization of all classical functions. | If the deterministic closure produces a non-Born weighting in validated regimes, if Born weights and thermodynamic summaries require incompatible measures, or if the operator map requires ad hoc observable-domain changes per benchmark, the quantum story fails. |
| 1 | Weak-field GR recovery | Redshift, Shapiro delay, lensing, and orbital tests must come from one constitutive map. | The interface exists in [general-relativity.md](../../../../markdown/aaa/spacetime/general-relativity.md) and [ppn-parameters.md](../../../../markdown/aaa/spacetime/ppn-parameters.md), but the shared fit is incomplete. | Produce one constitutive law, a single Noether sea response map, whose weak-field metric coefficients serve every listed observable without per-observable retuning; its state-dependent quantities are fields of that record ([Parameter Ledger](../../../../markdown/aaa/validation/parameter-ledger.md#parameter-versus-field)), not separately fitted constants. | If different observables require incompatible constitutive coefficients, the emergent-metric program fails. |
| 2 | Low-energy quantum-gravity EFT recovery | Quantized metric methods are not $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology, but their long-distance effective predictions are fixed by known low-energy degrees of freedom. | [general-relativity.md](../../../../markdown/aaa/spacetime/general-relativity.md) and [emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md) state the classical weak-field map; they need an explicit observer-level GR-EFT recovery gate. | Recover the standard long-distance quantum correction to the Newtonian potential, the term of relative size $\tfrac{41}{10\pi}\,G\hbar/(r^{2}c^{3})$ that follows when general relativity is treated as a low-energy effective field theory and only its massless degrees of freedom propagate in the loop, using the same weak-field constitutive record that supports PPN, redshift, Shapiro delay, lensing, and gravitational-wave speed. Here $G$ is the gravitational constant, $\hbar$ the reduced Planck constant, $c$ the quoted standard light speed, and $r$ the separation of the two masses; the term lies far below present measurement, so this is a consistency target rather than an observational constraint. | If the calculable low-energy quantum correction requires an independent coefficient set, spacetime closure is incomplete even if the classical observables are matched. |
| 2 | Parameter non-closure | Too many symbols remain geometric promises rather than fixed quantities. | [parameter-ledger.md](../../../../markdown/aaa/validation/parameter-ledger.md) organizes them, but most are still open. | Close $\kappa$, the mass prefactor, the metric constitutive coefficients, and the weak-mixing datum without per-observable retuning. | If the same symbol has to be re-fit independently across chapters, the closure claim weakens sharply. |
| 2 | Null-result closure for added channels | A unification claim can fail even while matching known positive benchmarks if it predicts extra channels that experiments have not seen. | [failure-criteria.md](../../../../markdown/aaa/validation/failure-criteria.md) defines $\mathcal{R}_{\mathrm{null}}(\theta)$ for predicted non-baseline channels, but the main sector ledgers have not all routed their null-result bounds through that residual. The concrete comparison cases are mirror matter, superpartners, proton-instability channels, extra gauge bosons, hidden transport modes, sterile or neutral partner branches, and preferred-frame leakage channels. | For every added partner family, unstable baryon channel, extra gauge or transport mode, preferred-frame leakage channel, or other non-baseline output, compute the predicted observable $O_e(\theta)$ of each added channel $e$ under the shared record $\theta$ and show $O_e(\theta)\le O_e^{\max}$, where $O_e^{\max}$ is the accepted experimental upper bound in the comparison regime, from the same shared closure record used for the positive benchmarks. A symmetry container that includes the Standard Model as a subcase passes only when the added channels are proven absent, exactly redundant, or below bounds by the same branch record that recovers the observed sector. | If unobserved channels are hidden only by sector-specific masses, thresholds, compactification-like assumptions, or disconnected suppression factors, the framework has reproduced the failure pattern of overextended unification rather than closing it. |
| 2 | Thermodynamic-gravity closure | If the metric is an emergent equation of state, the repo needs more than constitutive rhetoric. | [emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md) states the Noether sea-first picture, defines a local-horizon residual $\mathcal{R}_{\mathrm{thermo}}(\theta)$, and links the proof scaffold to [Thermodynamic Residual](../../../../markdown/aaa/validation/simulations/thermodynamic-residual.md); [black-holes.md](../../../../markdown/aaa/spacetime/black-holes.md) frames horizon entropy as a block-density count over horizon-compatible reduced Noether braid closure labels. No run has yet driven the residual small from a simulated Noether sea record. | Show that the Noether sea admits an area-scaling entropy channel $S_H=k_B\log\lvert\mathcal{B}_H\rvert$ whose local coefficient is recovered as a block entropy density, a local Rindler/Unruh recovery in the appropriate limit, a Jacobson-style $dQ=T_UdS$ residual for boundary-wake data, Page-curve-compatible information release through horizon-interface channels, and a controlled nonequilibrium regime where distinctive departures are predicted. | If GR-like recovery requires thermodynamic language but the Noether sea cannot supply area scaling, local horizon temperature, a shared stress/entropy/temperature record, Page-curve-compatible information accounting, or a coherent nonequilibrium boundary, the gravity interpretation loses depth and may be mislocated. |
| 2 | Reaction-cosmology provenance closure | The local-reaction story and the cosmology-source story now meet at photon loading, pair production, signed photon-frequency exchange, and thermalization. | [reaction-cosmology-provenance-ledger.md](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md) defines the shared ledger, including path-frequency exchange, but no full source-to-background path has been closed. | Produce one conserved provenance path from a radiation, pair, or Compton/SZ-like transfer channel through thermalization to a BBN or CMB observable, using the same Noether sea state variables throughout. | If BBN photon loading, CMB blackbody recovery, or redshift-budget reconstruction requires unbalanced substrate creation, unlogged photon energy transfer, per-source retuning, or incompatible thermalization assumptions, the local-recycling cosmology branch fails. |
| 2 | Shared cosmology state closure | Dark-energy, $H_0$, $S_8$, CMB, BBN, BAO, weak-lensing, redshift-budget, and pre-BBN comparison claims all consume overlapping Noether sea state variables. | [cosmology-ontology.md](../../../../markdown/aaa/cosmology/cosmology-ontology.md), [dark-energy.md](../../../../markdown/aaa/cosmology/dark-energy.md), and [hubble-s8-tensions.md](../../../../markdown/aaa/cosmology/hubble-s8-tensions.md) state the shared-state requirement; [inflation-model.md](../../../../markdown/aaa/cosmology/inflation-model.md#pre-bbn-comparison-gate), [BBN-constraints.md](../../../../markdown/aaa/cosmology/BBN-constraints.md#pre-bbn-handoff-gate), [structure-formation.md](../../../../markdown/aaa/cosmology/structure-formation.md#cmb-lensing-and-acoustic-peaks), and [gravitational-waves.md](../../../../markdown/aaa/spacetime/gravitational-waves.md#early-universe-stochastic-background-gate) route pre-BBN branch projections through the same record; [simulations/cosmology-shared-residual-fit.md](../../../../markdown/aaa/validation/simulations/cosmology-shared-residual-fit.md) supplies the first mock residual-packet scaffold; and [dark-energy.md](../../../../markdown/aaa/cosmology/dark-energy.md) gives a thermodynamic $\Lambda_{\mathrm{eff}}$ conjugacy target, but no empirical joint residual fit exists. | Produce one $\theta_{\mathrm{sea}}$ and projection family that keeps SN, BAO, CMB, WL, RSD, BBN, $H_0$, $S_8$, signed path-frequency-transfer rows, pre-BBN branch projections, and stochastic-background bounds inside tolerance without per-pipeline retuning; if $\Lambda_{\mathrm{eff}}$ is treated thermodynamically, derive the entropy-conjugate multiplier of an effective observer-level four-volume functional of the same $\theta_{\mathrm{sea}}$ together with the separate constitutive map that carries that multiplier, of units inverse length to the fourth power, to $\Lambda_{\mathrm{eff}}$, of units inverse length squared; the two objects cannot be identified directly. | If distance, growth, early-universe, calibration, path-frequency-transfer, pre-BBN branch, stochastic-background, or thermodynamic-$\Lambda_{\mathrm{eff}}$ observables require incompatible Noether sea state records, the cosmology branch has hidden the tension rather than closed it. |
| 2 | Radiation Gate C benchmark closure | Radiation must recover standard electromagnetic and QED-like benchmarks before Noether sea-dependent deviations or cosmology source claims are credible. | [radiation.md](../../../../markdown/aaa/reactions/radiation.md) carries a classified closure-target ledger, with channel scaffolds in [bremsstrahlung.md](../../../../markdown/aaa/reactions/bremsstrahlung.md), [synchrotron.md](../../../../markdown/aaa/reactions/synchrotron.md), and [reaction-cosmology-provenance-ledger.md](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md), but no unified Gate C derivation is complete. | Close Larmor/Lienard recovery, free-free emissivity, synchrotron $\gamma^2B$ and power scaling, pair thresholds, Compton-like scattering, and blackbody detailed balance through one event record, while treating free photon polarization as a Gate B handoff only. | If any benchmark requires per-observable retuning, violates validated limits, or derives free photon polarization outside Gate B, radiation Gate C does not close. |
| 2 | CKM / PMNS quantitative closure | Flavor mixing cannot remain only qualitative if the framework claims Standard-Model replacement. | [Neutrinos](../../../../markdown/aaa/assemblies/fermions/neutrinos.md#pmns-mixing-as-an-effective-recovery-target) states the PMNS oscillation formulas as an effective recovery target; [weak-mixing-ckm.md](../../../../markdown/aaa/philosophy-history/theory-bridges/weak-mixing-ckm.md) gives the CKM overlap/holonomy scaffold tied to the same weak-coupling-triad exposure route as `V-A` and reaction provenance. | Derive one geometric overlap map for quark and lepton mixing from the exposed weak-coupling-triad domain, shielding eigenstates, and near-photon neutral-sector Hamiltonian, then test it against CKM and PMNS data. | If no stable geometry reproduces the observed hierarchy and phases, or if the CKM/PMNS definitions require a different weak-basis domain from the `V-A` operator, the mixing architecture is incomplete at best. |
| 2 | Quark mass map | The quark catalog is in place, but the mass hierarchy is still not quantitative. | [quarks.md](../../../../markdown/aaa/assemblies/fermions/quarks.md) closes structure, not masses. | Produce a first-pass mass map for `u,d,c,s,t,b` from shielding and internal-energy accounting. | If the hierarchy cannot be reproduced even at scaling level, the generation-by-shielding account is in doubt. |
| 2 | Spin / statistics closure | The framework repeatedly appeals to spinor and bosonic/fermionic behavior. | [Angular Momentum and Spin](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md#ordered-frame-spinor-target) defines the history-lifted ordered frame and the $2\pi/4\pi$ return-parity test, and [Fermi-Dirac and Bose-Einstein Statistics](../../../../markdown/aaa/quantum/fermi-dirac-and-bose-einstein-statistics.md) consumes those parity indicators, but no formal closure proof exists. | Derive the ordered-frame history-lift map cleanly enough to justify spin-$\tfrac{1}{2}$ and associated statistics sectors. | If the topology cannot distinguish fermionic and bosonic closure classes, several assembly claims lose their footing. |
| 2 | Baryon stability and baryon-number status | Proton stability is a major empirical constraint and a major theoretical claim. | [Color Charge](../../../../markdown/aaa/assemblies/fermions/color-charge-su3.md) proposes a protected-topology route but states that naming the network a three-strand braid does not prove baryon-number conservation; a protection argument must still specify the configuration and history space, the allowed transitions, a deformation-invariant quantity, and its map to observer baryon number, so the quantitative baryon-number status remains open. Comparison bounds summarized by PDG 2024 from the Super-Kamiokande searches already put representative partial mean lives at $\tau/B(p\to e^+\pi^0)>2.4\times10^{34}\,\mathrm{yr}$ and proton neutrino/kaon modes near $5.9\times10^{33}\,\mathrm{yr}$ at 90% confidence, so this is an active null-result gate rather than a qualitative concern. | Show whether proton stability is exact, exponentially protected, or only effective in a quantified regime, and route every predicted baryon-violating corridor through the channel-rate ceiling $\Gamma_{p,c}^{\max}=1/\tau_{c}^{\min}$, the reciprocal of the measured partial-mean-life lower limit $\tau_{c}^{\min}$ for channel $c$, in [Failure Criteria](../../../../markdown/aaa/validation/failure-criteria.md). | If the theory predicts generic fast proton decay, or suppresses it by a sector-local parameter not tied to the same color/topology and reaction-provenance ledger that recovers hadron structure, the hadronic sector is not viable. |
| 3 | Nuclear binding closure | The residual strong-force story must eventually recover nuclear phenomenology beyond pions-as-metaphor. | [nuclear-binding.md](../../../../markdown/aaa/nuclear-atomic/nuclear-binding.md) gives a first effective interface, but no fitted nuclear map. | Recover at least deuteron binding, saturation, and alpha-like enhancement in one coherent effective model. | If even the sign and scaling of nuclear binding cannot be stabilized, the hadronic coarse-graining is inadequate. |
| 3 | Condensed-matter branch recovery | Materials provide dense, precise tests of whether electron-envelope, lattice, phonon, and Noether sea response variables remain one record instead of becoming probe-specific fits. | [condensed-matter.md](../../../../markdown/aaa/nuclear-atomic/condensed-matter.md) states Bloch-band, effective-mass, Fermi-surface, diffraction, phonon, Hall, and topological-response residuals; [constraint-ledger.md](../../../../markdown/aaa/validation/constraint-ledger.md) records the corresponding response gate. No derivation yet computes these objects from the master equation or a settled material branch. | Recover Bloch form, reciprocal-lattice scattering, phonon dynamical matrices, effective mass tensors, Fermi-surface or band-gap classification, Hall sign/plateaux, and no-drag transport from one declared material branch and Noether sea state record. | If band curvature, lattice stiffness, diffraction peaks, Hall response, and transport relaxation require independent response maps, or if resistance is explained by ordinary Noether sea drag below the transport threshold, the material-response program has split from the main ontology. |
| 3 | Strong-field / black-hole closure | Strong-field claims are distinctive and therefore risky. | [Black Holes](../../../../markdown/aaa/spacetime/black-holes.md) states the terminal-alignment framing, but the predictive map is not yet broad. | Derive concrete departures near the alignment regime while preserving weak-field success. | If the strong-field story contradicts weak-field closure or observed compact-object data, it must be revised. |

### Highest-Leverage Cluster

The top credibility cluster is:

1. weak `V-A`,
2. preferred-frame hiding,
3. Born-rule emergence,
4. weak-field GR recovery.

Those four form the hard gate because each one touches a major validated pillar of modern physics:

- electroweak structure,
- Lorentz hiding,
- quantum statistics,
- and relativistic gravity phenomenology.

A cross-cutting null-result discipline now sits over that cluster. A proposed closure may not buy unification by adding hidden sectors whose only role is to disappear below proton-stability, collider, precision-symmetry, preferred-frame, or cosmology bounds. The residual $\mathcal{R}_{\mathrm{null}}(\theta)$ in [Failure Criteria](../../../../markdown/aaa/validation/failure-criteria.md#null-result-residual-for-added-channels) must vanish using the same shared record that passes the positive recovery gates.

The strict implementation is to treat each elegant symmetry package as a joint positive-and-absence record: the same $\theta$ that recovers the Standard-Model-facing rows must also set each extra-channel observable $O_e(\theta)$ to zero or below its validated bound.

If those remain open, the framework can still be a promising substrate program, but not yet a closed replacement architecture.

### Interdependence Map

Several tensions are linked and should not be treated as isolated tasks.

#### Weak sector cluster

The weak-selection problem, right-handed neutrino stance, CKM/PMNS closure, weak-corridor provenance, and the axial-frame misalignment datum $\alpha$ of [Weak Mixing Angle](../../../../markdown/aaa/assemblies/fermions/weak-mixing-angle.md#minimal-geometric-parameterization) all belong to the same electroweak geometry stack. The synthesis is that these are readouts of one weak-coupling-triad exposure problem: axial-frame branch selection determines what can be exposed, the `V-A` operator determines which handedness can dock, the overlap integrals determine mixing weights, and the reaction ledger determines where the corridor payload and outgoing Noether braid provenance enter and exit. A clean derivation of one should constrain the others rather than leaving them as independent stories.

The neutrino branch of this cluster has four empirical decision handles: the lightest-neutrino mass, the mass sum $\sum_i m_i$, neutrinoless double-beta limits or detection, and any evidence for a sterile or right-handed singlet. These data products should decide between the minimal [near-photon neutral-pair stance](../../../../markdown/aaa/assemblies/fermions/neutrinos.md), a sterile $\nu_R$ branch, or a lepton-number-violating provenance channel. They should not be used to rewrite the charged-fermion axial-layer rule or to import a sterile dark-matter interpretation before the PMNS, reaction, BBN, CMB, and structure-formation gates are simultaneously satisfied.

A useful benchmark-only sharpening is the package $m_{\mathrm{lightest}}\to0$, $\sum_i m_i\approx0.06\,\mathrm{eV}$, suppressed neutrinoless double-beta rate, and any sterile or right-handed singlet behaving as cold collisionless matter only after the neutral-sector and cosmology gates close. These values should be treated as discriminator targets, not as adopted ontology: they can rank the neutral-lepton branches, but they cannot bypass the PMNS Hamiltonian, reaction provenance, BBN, CMB, structure-formation, and null-result residuals.

#### Quantum cluster

Superposition, measurement, Born-rule emergence, and Bell/nonlocality closure are one package. A good ontology chapter without a basin-measure derivation is progress, but not endpoint closure.

Penrose-Diosi gravitational-collapse tests are an external benchmark for the same finite-time threshold-resolution burden, not an adopted ontology; [Measurement Ontology](../../../../markdown/aaa/quantum/measurement-ontology.md#external-penrose-diosi-benchmark) owns the comparison. In its standard comparison form, the proposal assigns two alternative mass distributions $\rho_1$ and $\rho_2$, written as functions of the effective observer coordinates $x_{\mathrm{eff}}^i$ and $y_{\mathrm{eff}}^i$, the gravitational self-energy of their difference,
$$
\Delta E_G \sim \frac{G}{2}\int\!\!\int
\frac{(\rho_1-\rho_2)(x_{\mathrm{eff}}^i)(\rho_1-\rho_2)(y_{\mathrm{eff}}^i)}
{\|x_{\mathrm{eff}}^i-y_{\mathrm{eff}}^i\|}\,d^3x_{\mathrm{eff}}\,d^3y_{\mathrm{eff}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e427327b2d9dcf27)

with the collapse-time estimate
$$
\tau_G\sim \frac{\hbar}{\Delta E_G}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f84f0cdfb8311821)

Here $G$ is the gravitational constant and $\hbar$ the reduced Planck constant; the numerical prefactor of $\Delta E_G$ is convention-dependent in the proposal itself, which is why both relations are stated with $\sim$. The useful comparison pressure is the tension between local free-fall equivalence and linear superposition when the two branches carry measurably different mass distributions. The validation burden is to compare the measured persistence time $\tau_{\text{meas}}$ of a demonstrated massive-superposition record, once the observable it names (trigger, loss of coherence, or record completion) has been identified, against $\tau_G$ and ordinary environmental decoherence. Spatially separated Bose-Einstein condensate (BEC) records containing roughly $10^9$ to $10^{10}$ atoms are a forecast target from the Howl-Penrose-Fuentes proposal, not an achieved interference class. The comparison must preserve the $\mathbb{A}\mathbb{A}\mathbb{A}$ claim that branch selection is finite-time threshold resolution rather than fundamental gravitational collapse. Any collapse variant that predicts persistent spontaneous heating must also pass low-background and compact-object heating bounds before it can serve even as a comparison baseline.

#### Spacetime cluster

Preferred-frame hiding, redshift, Shapiro delay, lensing, gravitational-wave speed, and the long-distance quantum correction to Newtonian gravity are all readouts of the same observer-level constitutive map. Thermodynamic-gravity closure belongs in the same cluster because area scaling, local horizon temperature, and nonequilibrium breakdown define whether the constitutive picture is merely suggestive or genuinely explanatory. Low-energy quantum-gravity EFT is kept here as a recovery benchmark, not as a commitment that the effective metric is microscopic ontology. These issues rise or fall together.

#### Reaction-cosmology cluster

Radiative planar-mode nucleation, pair-production provenance, BBN photon loading, CMB blackbody recovery, signed path-frequency exchange, and redshift handoff form one closure cluster when cosmology is read through SMBH-local recycling and Noether sea transport. A local source story is not enough; the same provenance record must carry architrino inventory, energy-momentum, thermalization depth, photon-frequency transfer, and observer-level comparison variables without changing the Noether sea state map between channels.

Pre-BBN comparison branches belong to this same cluster. They can add value only as stress tests on the shared record: light-element yields, $N_{\text{eff}}$, CMB acoustic and lensing products, matter power, and stochastic gravitational-wave bounds must all be projections of the same Noether sea history. If the branch is kept alive by independent hiding assumptions, it is a null-result failure rather than a productive extension.

#### Radiation benchmark checks

Radiation Gate C closure is validated only if the same event record passes the following classified checks. These checks are not alternate ontologies; they are benchmark recoveries that prevent source-channel language from outrunning the photon and reaction ledgers.

| Check | Class | Required validation | Failure signal |
| --- | --- | --- | --- |
| Radiative event record | ontology | Record routed closure residuals, planar-mode photon output when present, non-photon shedding channels, recoil, local Noether sea state, and conservation ledgers. | Radiation is treated as primitive field emission or as untracked energy loss. |
| Larmor/Lienard recovery | derivation target | Recover $P\propto\|\mathbf{a}\|^2$ in the weak nonrelativistic limit and the Larmor/Lienard observer-level power/angular behavior after clock conversion. | Low-speed power is not quadratic in acceleration, or relativistic recovery needs a separate fit. |
| Bremsstrahlung emissivity | derivation target | Recover $d\sigma/dk$, screening/form-factor corrections, $\epsilon_{\nu}^{\mathrm{ff}}\propto Z^2 n_e n_i T_{\mathrm{temp}}^{-1/2}e^{-h\nu/(k_B T_{\mathrm{temp}})}g_{\mathrm{ff}}$, and $\epsilon_{\mathrm{ff}}\propto Z^2 n_e n_i T_{\mathrm{temp}}^{1/2}$ in LTE. | Cross-section and emissivity require incompatible Noether sea variables or plasma-specific hidden fits. |
| Synchrotron $\gamma^2B$ scaling | derivation target | Recover $\nu_c\propto\gamma^2B$, $P_{\mathrm{syn}}\propto U_B\gamma^2$, and cooling breaks from one effective magnetic-state map. | The $\gamma^2$ frequency scaling is absent, or the $B$ map changes between curvature and emission. |
| Pair thresholds | derivation target | Recover $s\ge4m_e^2c^4$ and the angle-dependent photon-photon threshold while preserving architrino inventory and pair provenance. | Pair channels imply creation from nothing, wrong thresholds, or unbalanced Noether braid recruitment. |
| Compton-like scattering | derivation target | Recover the Compton shift, Thomson limit, Klein-Nishina correction, recoil, and outgoing photon provenance in one Gate C vertex. | The channel becomes phenomenological frequency loss without a closed recoil and photon ledger. |
| Aharonov-Bohm phase | derivation target | Recover a relative phase proportional to enclosed magnetic flux while the local force channel on the interferometer arms vanishes, using the same effective U(1) connection and photon/action ledger as the rest of Gate C. | The phase requires a local force on the arms, an independent phase fit, or a literal gauge-potential ontology rather than a derived effective connection. |
| Blackbody recovery | derivation target | Recover Planck occupation, zero effective photon chemical potential, thermalization depth, damping, anisotropy, polarization handoff, and redshift handoff without retuning the Noether sea map. | The CMB or thermal branch needs unbalanced photon loading, per-observable retuning, or incompatible transport assumptions. |
| Free photon polarization boundary | derivation target | Use Gate B records for transverse modes, helicity, Malus' law, and analyzer statistics; radiation and cosmology pages may only consume that handoff. | Any radiation channel derives free photon polarization locally, adds a free longitudinal mode, or treats Gate B as already proven. |
| Noether sea-dependent deviations | speculation | State a benchmark-preserving limit and a measurable residual before promoting any $\rho_{\text{NS}}(\mathbf X,T)$, $\chi_{\text{sea}}(\mathbf X,T)$, anisotropy, or threshold-floor effect. | A deviation is used to repair a failed standard recovery or is fitted separately per observable. |

### Ontology Watchlist

The foundational ontology hub keeps only stable commitments. Open questions are tracked here or in the relevant branch chapters:

- **Deterministic branch selection:** close the rule for active causal roots, weighted sums, phase-sensitive thresholding, and basin selection in [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md) and [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md). The working hypothesis remains deterministic multistability, with apparent randomness coming from chaotic sensitivity to microstate and wake history.
- **Polarity unit and coupling scale:** derive the observer calibration target $|e|=6\epsilon$ from primitive $\epsilon$ and close $\kappa$ through [Parameter Ledger](../../../../markdown/aaa/validation/parameter-ledger.md), [Architrino SI Base Units](../../../../markdown/aaa/validation/architrino-si-base-units.md), and the charge-mapping chapters. The unresolved question is whether six-site Noether braid organization derives the six-unit observer charge map, and whether $\kappa$ is related to $\epsilon$, $c_f$, $\hbar$, or Planck-alignment quantities rather than being independently postulated.
- **Quantum ontology:** keep wavefunction status, decoherence, and Born-rule recovery in [Wavefunction Ontology](../../../../markdown/aaa/quantum/wavefunction-ontology.md), [Measurement Ontology](../../../../markdown/aaa/quantum/measurement-ontology.md), and the Born-rule tension above. Decoherence still needs a stance on whether its irreversibility is fundamental in the Noether sea environment or practical because reversal is dynamically inaccessible to Physical Observers.
- **Symmetry and conservation:** close CPT stance, baryon-number status, and proton-stability regime through the particle and interaction chapters. The unresolved CPT issue is treated as a replacement constraint in [No-Go Theorems](../../../../markdown/aaa/validation/no-go-theorems.md#applicability-map): the standard proof assumes local relativistic QFT, while this framework uses absolute time and delayed substrate dynamics, so the corpus must preserve tested CPT-facing observables without importing those assumptions as ontology.
- **Cosmological history:** keep beginning/eternity and initial-condition questions in [Cosmology Ontology](../../../../markdown/aaa/cosmology/cosmology-ontology.md), [Expansion Mechanism](../../../../markdown/aaa/cosmology/expansion-mechanism.md), and related cosmology modules. If the background is eternal, the theory still owes a large-scale homogeneity and isotropy account, including a scale-neutral residual comparing dimensionless pair-separation distributions across large windows; if it has an initialization boundary, it owes an architrino-distribution account.
- **Unification claim:** treat "all forces from Noether braid geometry and Noether sea dynamics" as a closure program, not as a primitive ontology statement. The qualitative structure exists across interaction chapters, but quantitative derivations remain the acceptance gate.

### Acceptance Principle

The framework should be judged by the intersection of its surviving closure sets:
$$
\mathcal{C}_{\mathrm{weak}}
\cap
\mathcal{C}_{\mathrm{quantum}}
\cap
\mathcal{C}_{\mathrm{gravity}}
\cap
\mathcal{C}_{\mathrm{hadronic}}
\cap
\mathcal{C}_{\mathrm{radiation}}
\cap
\mathcal{C}_{\mathrm{cosmology}}
\neq \varnothing
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9f42e80cbbf30a6b)

If that intersection becomes empty after quantitative work is done, the implementation is rejected even if many individual chapters remain suggestive. The detailed sector predicates, benchmark tolerances, and promotion-fiber test are recorded in [Failure Criteria](../../../../markdown/aaa/validation/failure-criteria.md).

### Sources

- N. E. J. Bjerrum-Bohr, J. F. Donoghue, and B. R. Holstein, *Quantum Gravitational Corrections to the Nonrelativistic Scattering Potential of Two Masses* (2003), Phys. Rev. D 67, 084033, [arXiv:hep-th/0211072](https://arxiv.org/abs/hep-th/0211072). Its Eq. (44) supplies the coefficient $41/(10\pi)$ of the long-distance quantum correction named in the low-energy quantum-gravity row. The correction is a recovery target at effective grade, not an architrino-level premise.
- R. Howl, R. Penrose, and I. Fuentes, *Exploring the unification of quantum theory and general relativity with a Bose-Einstein condensate* (2019), New J. Phys. 21, 043047, [arXiv:1812.04630](https://arxiv.org/abs/1812.04630). Its Section 3.1 gives the condensate atom numbers of order $10^9$ to $10^{10}$ behind the forecast target in the quantum cluster and states that such superposition states have not been achieved; its convention-dependent prefactor for $E_G$ is why the comparison relations carry $\sim$.
- Super-Kamiokande Collaboration (A. Takenaka et al.), *Search for proton decay via p → e+π0 and p → μ+π0 with an enlarged fiducial volume in Super-Kamiokande I-IV* (2020), Phys. Rev. D 102, 112011, [arXiv:2010.16098](https://arxiv.org/abs/2010.16098). Source of the $2.4\times10^{34}\,\mathrm{yr}$ partial-lifetime limit at 90% confidence quoted in the baryon-stability row.
- Super-Kamiokande Collaboration (K. Abe et al.), *Search for proton decay via p → νK+ using 260 kiloton·year data of Super-Kamiokande* (2014), Phys. Rev. D 90, 072005, [arXiv:1408.1195](https://arxiv.org/abs/1408.1195). Source of the $5.9\times10^{33}\,\mathrm{yr}$ limit at 90% confidence quoted for the neutrino/kaon mode.

### Related Chapters

- [constraint-ledger.md](../../../../markdown/aaa/validation/constraint-ledger.md)
- [closure-scorecard.md](../../../../markdown/aaa/validation/closure-scorecard.md)
- [../assemblies/fermions/quantum-number-mapping.md](../../../../markdown/aaa/assemblies/fermions/quantum-number-mapping.md)
- [../spacetime/general-relativity.md](../../../../markdown/aaa/spacetime/general-relativity.md)
- [../quantum/measurement-ontology.md](../../../../markdown/aaa/quantum/measurement-ontology.md)

## Massive Superposition Gravity

This packet turns massive-superposition gravity experiments into concrete validation targets. It belongs to the observable and inference layer: the task is to preserve the branch mass histories, coherence data, detector response, entanglement data, and record criteria without importing any external collapse ontology or quantum-metric ontology.

Related homes are [Measurement Ontology](../../../../markdown/aaa/quantum/measurement-ontology.md#external-gravitational-which-path-benchmark), [Observer Framework](../../../../markdown/aaa/spacetime/observer-framework.md#boundary-wake-covariance-scaffold), and [Constraint Ledger](../../../../markdown/aaa/validation/constraint-ledger.md#massive-superposition-gravitational-distinguishability).

### Comparison Boundary

The packet may use external classical-quantum gravity proposals as comparison pressure, but only at the level of observables and inference. Three objects recur in the rows and are defined in Observable Target below: the gravitational which-path distinguishability $\mathcal{D}_{\mathrm{grav}}$, a squared signal-to-noise ratio measuring how well a gravity-side readout separates the two branches; the readout covariance $N_{AB}$, which summarizes the detector, environment, and boundary-wake residuals (causal wakes entering the observer's access region from histories it does not resolve) that the readout cannot separate from signal; and the shared effective-metric constitutive record $\theta$, the one weak-field gravity description that every gravity benchmark in the corpus must reuse. A Physical Observer is an assembly inside the Noether sea whose clocks, rulers, and detector records are themselves dynamical outputs, as developed in [Observer Framework](../../../../markdown/aaa/spacetime/observer-framework.md#physical-observers). The comparison rows are:

| External comparison | Retained pressure | $\mathbb{A}\mathbb{A}\mathbb{A}$ use | Not imported |
| --- | --- | --- | --- |
| Oppenheim-style classical-quantum gravity | A classical or effective gravity readout must not reveal branch information while the quantum branch description still shows interference. | Bound $\mathcal{D}_{\mathrm{grav}}$, constrain $N_{AB}$, and require a Physical Observer record before treating gravity-side branch information as a measurement. | Stochastic-metric ontology, fundamental collapse, external terminology, or the claim that gravity must remain classical at the substrate level. |
| Gravitationally induced entanglement | Two isolated massive probes can acquire branch-dependent correlations through gravity alone. | Require the same effective-metric record $\theta$ to generate the branch interaction phase and to keep which-path leakage below the retained weak-probe threshold. | Constructor-theory doctrine, `Q-number` terminology, fundamental graviton ontology, or the claim that spacetime geometry itself has been prepared in superposition. |

Every averaged quantity in this packet is a run-record summary. A covariance matrix, branch expectation value, or correlation function may be used only after the Physical Observer access region, detector channel, boundary-data model, and persistence criterion have been declared. It may not be promoted into a primitive gravity state or collapse mechanism merely because it appears in a successful inference pipeline.

### Experiment-Family Classification

Different laboratory proposals enter this packet at different levels. The classification below keeps the observable pressure while preventing passive phase tests, active branch-mass tests, and mediated-entanglement tests from being treated as one result.

| Experiment family | Retained observable | Packet status | Interpretation guardrail |
| --- | --- | --- | --- |
| guided/free-fall atom-interferometer phase tests | fitted cubic-time phase coefficient $\widehat{\beta}_{T^3}$ of the guided/free-fall protocol in [Proper Time and Time Dilation](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md#finite-height-clock-benchmark), fringe visibility, and control-phase record | passive external-field phase benchmark | Confirms or constrains the weak-field phase map; does not by itself test active self-gravity or fundamental collapse. |
| BEC, solid, nanoparticle, nanodiamond, membrane, or cantilever massive-superposition tests | branch mass histories $\rho_1,\rho_2$, visibility $\mathcal{V}(T_W)$, the finite measurement time $\tau_{\text{meas}}$, the gravitational self-energy scale $\Delta E_G$ of the branch mass difference defined in [Measurement Ontology](../../../../markdown/aaa/quantum/measurement-ontology.md#external-penrose-diosi-benchmark), and $\mathcal{D}_{\mathrm{grav}}$ | active branch-mass-history benchmark | Tests whether finite-time threshold resolution, ordinary decoherence, and Penrose-Diosi-like collapse scales remain quantitatively distinguishable. |
| two-probe gravitationally induced entanglement tests | cross-branch phase $\Delta\Phi_{\mathrm{ent}}$, entanglement witness $C_{\mathrm{obs}}$, and non-gravitational residual $\mathcal{R}_{\mathrm{nongrav}}$ | mediated-entanglement benchmark | Tests the shared gravity-side constitutive record without importing fundamental graviton ontology or a quantum-metric substrate. |

The packet should classify a run by the strongest observable it actually carries. A passive phase benchmark may constrain $\theta$ for later active-mass tests, but it cannot be used as evidence that gravity has or has not selected a branch. Conversely, an active branch-mass run that loses visibility must still show a record-forming separatrix crossing, meaning that the apparatus state crosses the boundary between basins that resolve to different durable records as defined in [Measurement Ontology](../../../../markdown/aaa/quantum/measurement-ontology.md#minimal-dynamical-model), before the loss is interpreted as measurement rather than uncontrolled environmental decoherence.

### Observable Target

The target experiment compares two branch-level mass-density histories over an effective-observer coherence window $T_W$:
$$
\rho_1(x_{\mathrm{eff}}^i,t_{\mathrm{eff}}),
\qquad
\rho_2(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c69723565da73081)

The branch pair is interference-preserving only if the apparatus and environment have not produced an autonomous which-path record. The gravitational or effective-metric channel therefore becomes a constraint through the response difference
$$
\Delta h_A(t_{\mathrm{eff}})
=
h_A(t_{\mathrm{eff}};\rho_1,\theta)-h_A(t_{\mathrm{eff}};\rho_2,\theta)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-375d225ad5501528)

where $A$ labels the resolved detector response channel and $\theta$ is the shared effective-metric constitutive record. The response $h_A$ is the object written $s_A$ in the [external benchmark of Measurement Ontology](../../../../markdown/aaa/quantum/measurement-ontology.md#external-gravitational-which-path-benchmark).

The which-path diagnostic is
$$
\mathcal{D}_{\mathrm{grav}}(T_W;\theta)
=
\int_0^{T_W}\!\!\int_0^{T_W}
\Delta h_A(t_{\mathrm{eff}})\,
N^{-1}_{AB}(t_{\mathrm{eff}},t'_{\mathrm{eff}};\theta)\,
\Delta h_B(t'_{\mathrm{eff}})\,dt_{\mathrm{eff}}\,dt'_{\mathrm{eff}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-50e88c5154061093)

Here $N_{AB}$ is the observer-level covariance decomposed in [Observer Framework](../../../../markdown/aaa/spacetime/observer-framework.md#boundary-wake-covariance-scaffold). It summarizes unresolved deterministic boundary histories and calibrated detector/environment residuals; it is not an ontological randomness postulate. The inverse $N^{-1}_{AB}$ is the operator inverse on a declared finite-bandwidth readout space on which the covariance is positive definite, not an entrywise reciprocal; a singular covariance requires an explicit supported-subspace or regularized model before the diagnostic is evaluated. The diagnostic is a squared signal-to-noise ratio: it measures how far apart the two branch responses are, in units of the unresolved readout fluctuations, summed over the channel pairs $A,B$ and over the window.

### Minimal Response Model

A concrete first packet can use a displaced normalized mass packet. Let $\varphi_\sigma$ be normalized by
$$
\int_{\Sigma_{t_{\mathrm{eff}}}^{\mathrm{eff}}}
\varphi_\sigma(x_{\mathrm{eff}}^i)\,d^3x_{\mathrm{eff}}
=
1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e4d48d120889744e)

For branch separation $d_{\mathrm{eff}}^i(t_{\mathrm{eff}})$ around center $x_{0,\mathrm{eff}}^i(t_{\mathrm{eff}})$, set
$$
\begin{aligned}
\rho_1(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})
&=
m\,\varphi_\sigma\!\left(
x_{\mathrm{eff}}^i-x_{0,\mathrm{eff}}^i(t_{\mathrm{eff}})-\frac{d_{\mathrm{eff}}^i(t_{\mathrm{eff}})}{2}
\right),\\
\rho_2(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})
&=
m\,\varphi_\sigma\!\left(
x_{\mathrm{eff}}^i-x_{0,\mathrm{eff}}^i(t_{\mathrm{eff}})+\frac{d_{\mathrm{eff}}^i(t_{\mathrm{eff}})}{2}
\right).
\end{aligned}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4fd6fbfe6f73ce2f)

Let $G_A(t_{\mathrm{eff}},t'_{\mathrm{eff}};x_{\mathrm{eff}}^i;\theta)$ be the detector response kernel implied by the same effective-metric constitutive record used for the classical weak-field benchmarks developed in [General Relativity](../../../../markdown/aaa/spacetime/general-relativity.md) and [PPN Parameters](../../../../markdown/aaa/spacetime/ppn-parameters.md): gravitational redshift (the clock-rate shift between different depths in a potential), Shapiro delay (the extra travel time of a signal passing near a mass), lensing (the bending of light paths near a mass), gravitational-wave speed, and, when the record is extrapolated to compact sources, horizon-scale ring/shadow imaging. The kernel gives the channel-$A$ readout at time $t_{\mathrm{eff}}$ produced by a unit of mass density at $x_{\mathrm{eff}}^i$ at the earlier time $t'_{\mathrm{eff}}$. The branch response is
$$
h_A(t_{\mathrm{eff}};\rho_k,\theta)
=
\int_0^{t_{\mathrm{eff}}}\!\int_{\Sigma_{t'_{\mathrm{eff}}}^{\mathrm{eff}}}
G_A(t_{\mathrm{eff}},t'_{\mathrm{eff}};x_{\mathrm{eff}}^i;\theta)\,
\rho_k(x_{\mathrm{eff}}^i,t'_{\mathrm{eff}})\,d^3x_{\mathrm{eff}}\,dt'_{\mathrm{eff}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2dbca964292c79b2)

Therefore
$$
\Delta h_A(t_{\mathrm{eff}})
=
\int_0^{t_{\mathrm{eff}}}\!\int_{\Sigma_{t'_{\mathrm{eff}}}^{\mathrm{eff}}}
G_A(t_{\mathrm{eff}},t'_{\mathrm{eff}};x_{\mathrm{eff}}^i;\theta)\,
\left[
\rho_1(x_{\mathrm{eff}}^i,t'_{\mathrm{eff}})-\rho_2(x_{\mathrm{eff}}^i,t'_{\mathrm{eff}})
\right]d^3x_{\mathrm{eff}}\,dt'_{\mathrm{eff}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-302094ee722b2d79)

When $\|d_{\mathrm{eff}}^i(t_{\mathrm{eff}})\|$ is small relative to the packet scale,
$$
\rho_1(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})-\rho_2(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})
=
-m\,d_{\mathrm{eff}}^i(t_{\mathrm{eff}})\,
\partial_i\varphi_\sigma(x_{\mathrm{eff}}^i-x_{0,\mathrm{eff}}^i(t_{\mathrm{eff}}))
+
O(\|d_{\mathrm{eff}}^i(t_{\mathrm{eff}})\|^3)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-fd544e0647db09fe)

so the leading branch response is
$$
\Delta h_A(t_{\mathrm{eff}})
\approx
-m\int_0^{t_{\mathrm{eff}}}
d_{\mathrm{eff}}^i(t'_{\mathrm{eff}})
\int_{\Sigma_{t'_{\mathrm{eff}}}^{\mathrm{eff}}}
G_A(t_{\mathrm{eff}},t'_{\mathrm{eff}};x_{\mathrm{eff}}^i;\theta)\,
\partial_i\varphi_\sigma(x_{\mathrm{eff}}^i-x_{0,\mathrm{eff}}^i(t'_{\mathrm{eff}}))\,d^3x_{\mathrm{eff}}\,dt'_{\mathrm{eff}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0e4a6803bb07bbdd)

This gives the first closure equation: a mass displacement history should map to a predicted detector-channel separation before any interpretive claim about classical or quantum spacetime is introduced.

### Mediated Entanglement Comparison

A complementary massive-superposition test asks whether two independently prepared massive probes can become entangled through the gravity-side channel while non-gravitational couplings are suppressed or bounded. This is a positive branch-phase benchmark, not a new ontology. The observable is the final two-probe correlation record, together with the calibration record showing that electromagnetic, spin-spin, thermal, and apparatus cross-talk channels are too small to account for the effect.

Let the two probes be $A$ and $B$, with branch labels $a,b\in\{+,-\}$ and branch mass histories $\rho_A^a(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})$ and $\rho_B^b(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})$. The same weak-field constitutive record $\theta$ used for redshift, Shapiro delay, lensing, the parameterized post-Newtonian (PPN) parameters, gravitational-wave speed, compact-source ring/shadow extrapolations, and $\mathcal{D}_{\mathrm{grav}}$ must determine the branch interaction energy
$$
U_{ab}^{\mathrm{eff}}(t_{\mathrm{eff}};\theta)
=
-G_{\mathrm{eff}}(\theta)
\int_{\Sigma_{t_{\mathrm{eff}}}^{\mathrm{eff}}}\!\!\int_{\Sigma_{t_{\mathrm{eff}}}^{\mathrm{eff}}}
\frac{\rho_A^a(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})\rho_B^b(y_{\mathrm{eff}}^i,t_{\mathrm{eff}})}
{\|x_{\mathrm{eff}}^i-y_{\mathrm{eff}}^i\|}
\,d^3x_{\mathrm{eff}}\,d^3y_{\mathrm{eff}}
+O(c_0^{-2})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c958539326c1fe1e)

Here $G_{\mathrm{eff}}(\theta)$ is the effective gravitational coupling fixed by the record $\theta$, which must reduce to Newton's constant $G$ wherever the classical benchmarks are met, and $c_0$ is the asymptotic observer-sector speed calibration, so the $O(c_0^{-2})$ term collects the post-Newtonian corrections carried by the same record. The double integral is the Newtonian interaction energy of the two branch mass distributions, negative because the interaction is attractive. The branch phase is then
$$
\Phi_{ab}(T_W;\theta)
=
\frac{1}{\hbar}
\int_0^{T_W}
U_{ab}^{\mathrm{eff}}(t_{\mathrm{eff}};\theta)\,dt_{\mathrm{eff}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-be3fcd29783bff71)

where $\hbar$ is the reduced Planck constant, entering as the observer-level action-to-phase conversion of the standard low-energy description; the overall sign convention of the phase does not affect the witness below. Local branch phases can be absorbed into the one-probe descriptions. The entangling invariant is the cross-branch phase combination
$$
\Delta\Phi_{\mathrm{ent}}(T_W;\theta)
=
\Phi_{++}(T_W;\theta)+\Phi_{--}(T_W;\theta)
-\Phi_{+-}(T_W;\theta)-\Phi_{-+}(T_W;\theta)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-445d12e9377697cc)

Any phase of the form $\alpha_a+\beta_b$, attributable to one probe alone, cancels in this combination, which is why it is the entangling invariant. For the ideal equal-amplitude two-branch packet, a first witness target is
$$
C_{\mathrm{GIE}}(T_W;\theta)
=
\left|
\sin\frac{\Delta\Phi_{\mathrm{ent}}(T_W;\theta)}{2}
\right|
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a2fd3ef591382d1e)

This is the concurrence of the ideal four-branch state. For equal amplitudes the state is separable exactly when $\Delta\Phi_{\mathrm{ent}}$ is a multiple of $2\pi$, and the concurrence of a pure two-qubit state with amplitudes $c_{ab}$ is $2|c_{++}c_{--}-c_{+-}c_{-+}|$, which evaluates to the displayed sine. A measured witness $C_{\mathrm{obs}}$ lower-bounds the entanglement actually present, which is why the acceptance test below is one-sided. This formula is an observer-level benchmark. It does not say that the [Euclidean void](../../../../markdown/aaa/foundations/euclidean-void.md) is quantized, that the [effective metric](../../../../markdown/aaa/spacetime/emergent-metric.md) is fundamental, or that a graviton field is the native substrate. It says that the same gravity-side constitutive record must produce the branch phase that standard low-energy descriptions would attribute to gravitational mediation.

The comparison is meaningful only when the non-gravitational residual is bounded. Let $\mathcal{R}_{\mathrm{nongrav}}$ collect calibrated electromagnetic, spin-spin, Casimir, thermal, vibration, and apparatus cross-talk contributions to the same entanglement witness. A run can be used as a gravity-side validation target only if
$$
\mathcal{R}_{\mathrm{nongrav}}
\le
\varepsilon_{\mathrm{iso}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-513877d2a0e424f8)

with $\varepsilon_{\mathrm{iso}}$ declared by the apparatus class and retained alongside the covariance record $N_{AB}$.

### Input Record Schema

The packet is evaluated on an explicit run record:

| Field | Symbol | Required content |
| --- | --- | --- |
| branch mass histories | $\rho_1,\rho_2$ | mass-density histories on $\Sigma_{t_{\mathrm{eff}}}^{\mathrm{eff}}$ over $0\le t_{\mathrm{eff}}\le T_W$, each integrating to the branch mass $m$ |
| branch separation | $d_{\mathrm{eff}}^i(t_{\mathrm{eff}})$ | center or multipole separation history with declared packet width $\sigma$ |
| apparatus/environment record | $\mathcal{A}_{\mathrm{rec}}$ | record variable, persistence window, environmental coupling channels, and ordinary decoherence estimate |
| gravity response kernel | $G_A(t_{\mathrm{eff}},t'_{\mathrm{eff}};x_{\mathrm{eff}}^i;\theta)$ | detector response derived from the same effective-metric constitutive record used in weak-field gravity |
| mediated-entanglement phase | $\Delta\Phi_{\mathrm{ent}}$ | cross-branch phase predicted from $\rho_A^a,\rho_B^b$ and the shared constitutive record $\theta$ |
| non-gravitational residual | $\mathcal{R}_{\mathrm{nongrav}}$ | calibrated bound on non-gravity channels that could create the observed correlation |
| covariance decomposition | $N_{AB}$ | detector noise, unresolved boundary-wake terms, environmental residuals, and calibration residuals |
| visibility data | $\mathcal{V}(T_W)$ | observed or predicted interference visibility over the run |
| entanglement data | $C_{\mathrm{obs}}$ | measured or predicted two-probe entanglement witness in the retained readout basis |
| record criteria | $R,\Sigma,T_{\text{rec}}$ | Physical Observer record variable (the coarse apparatus readout that stores the outcome), separatrix (the basin boundary the apparatus state must cross for a record to form), and persistence threshold, as defined in [Measurement Ontology](../../../../markdown/aaa/quantum/measurement-ontology.md#what-makes-an-interaction-a-record) |

No row may be filled by changing the weak-field metric record after the positive gravity benchmarks have already been fit. The same $\theta$ must be replayable through redshift, Shapiro delay, lensing, PPN, gravitational-wave speed, compact-source ring/shadow extrapolations, and this massive-superposition packet.

### Evaluation Protocol

1. **Normalize the branch histories.** Verify $\int_{\Sigma_{t_{\mathrm{eff}}}^{\mathrm{eff}}}\rho_k(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})\,d^3x_{\mathrm{eff}}=m$ for each branch and each resolved time slice, or record the known mass exchange with the apparatus ledger.
2. **Compute the response difference.** Use one kernel $G_A(t_{\mathrm{eff}},t'_{\mathrm{eff}};x_{\mathrm{eff}}^i;\theta)$ to compute $h_A(t_{\mathrm{eff}};\rho_1,\theta)$, $h_A(t_{\mathrm{eff}};\rho_2,\theta)$, and $\Delta h_A(t_{\mathrm{eff}})$.
3. **Assemble the covariance.** Build $N_{AB}=N^{\mathrm{det}}_{AB}+N^{\mathrm{env}}_{AB}+N^{\mathrm{bw}}_{AB}+N^{\mathrm{cal}}_{AB}$, where $N^{\mathrm{bw}}_{AB}$ is the boundary-wake covariance defined in [Observer Framework](../../../../markdown/aaa/spacetime/observer-framework.md#boundary-wake-covariance-scaffold), with each term either derived from the apparatus model or bounded by calibration data. The additive form holds only when the cross-kernels between the boundary-wake, detector, and environment residuals vanish under the same joint conditional law; otherwise those cross-kernels are retained, as that owner requires.
4. **Evaluate distinguishability.** Compute $\mathcal{D}_{\mathrm{grav}}(T_W;\theta)$ and compare it with $\varepsilon_{\mathrm{wp}}$.
5. **Evaluate record formation.** Compute $\tau_{\text{meas}}$, $\Delta_{\mathrm{rec}}$, and the persistence window from the measurement chapter's record criteria.
6. **Evaluate mediated entanglement when present.** If the run is a two-probe mediated-entanglement experiment, compute $\Delta\Phi_{\mathrm{ent}}$, $C_{\mathrm{GIE}}$, and $\mathcal{R}_{\mathrm{nongrav}}$ from the same run record.
7. **Classify the run.** Use the same output record to assign one of four statuses:

| Status | Conditions | Interpretation |
| --- | --- | --- |
| weak-probe | $\mathcal{D}_{\mathrm{grav}}\le\varepsilon_{\mathrm{wp}}$ and no durable record forms | gravitational response is too weak to act as a which-path record |
| mediated-entangling | $C_{\mathrm{GIE}}\ge C_{\mathrm{obs}}-\varepsilon_C$, $\mathcal{R}_{\mathrm{nongrav}}\le\varepsilon_{\mathrm{iso}}$, $\mathcal{D}_{\mathrm{grav}}\le\varepsilon_{\mathrm{wp}}$, and no durable which-path record forms | the branch phase is strong enough to account for the entanglement witness while the gravity-side readout remains below record threshold |
| record-forming | $\mathcal{D}_{\mathrm{grav}} > \varepsilon_{\mathrm{wp}}$, $\tau_{\text{meas}} < T_W$, and $\Delta_{\mathrm{rec}}$ stays below threshold through $T_{\text{rec}}$ | the apparatus/environment has formed an autonomous record |
| falsifying | $\mathcal{D}_{\mathrm{grav}}\gg1$ while visibility remains high, no record-autonomy criterion is met, and the independently calibrated information-to-visibility relation of [Measurement Ontology](../../../../markdown/aaa/quantum/measurement-ontology.md#external-gravitational-which-path-benchmark) predicts visibility suppression at that $\mathcal{D}_{\mathrm{grav}}$ | the effective-metric response overproduces observable which-path information |

The four rows are not exhaustive. A run with $\mathcal{D}_{\mathrm{grav}}>\varepsilon_{\mathrm{wp}}$ that forms no durable record and does not meet the falsifying conditions is indeterminate: the quadratic diagnostic by itself proves neither record formation nor loss of interference, so such a run counts as evidence on neither side until the calibrated relation is supplied.

For a white-noise readout approximation, $N_{AB}(t_{\mathrm{eff}},t'_{\mathrm{eff}})=S_{AB}\delta(t_{\mathrm{eff}}-t'_{\mathrm{eff}})$, the distinguishability reduces to
$$
\mathcal{D}_{\mathrm{grav}}(T_W;\theta)
=
\int_0^{T_W}
\Delta h_A(t_{\mathrm{eff}})\,
S_{AB}^{-1}\,
\Delta h_B(t_{\mathrm{eff}})\,dt_{\mathrm{eff}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-176db1732240ec6c)

This special case is the first numerical target because it turns the validation packet into a finite time-series calculation once $m$, $\sigma$, $d_{\mathrm{eff}}^i(t_{\mathrm{eff}})$, $G_A$, and $S_{AB}$ are supplied.

### Worked Acceleration Bound

A first sanity bound can use a single acceleration readout channel before introducing a full detector geometry. Suppose the branch displacement is bounded by $\|d_{\mathrm{eff}}^i(t_{\mathrm{eff}})\|\le d_0$, the detector is at effective-chart distance $R_{\mathrm{eff}}$ from the branch center with $d_0\ll R_{\mathrm{eff}}$, and the weak-field map satisfies $G_{\mathrm{eff}}(\theta)\to G$, Newton's gravitational constant, in the tested regime. Write $M$ for the branch mass, the $m$ of the response model. The branch acceleration difference is bounded by
$$
|\Delta h(t_{\mathrm{eff}})|
\le
\frac{2G_{\mathrm{eff}}(\theta)M d_0}{R_{\mathrm{eff}}^3}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5f1d153305299ef6)

The bound follows from differentiating the comparison acceleration $G_{\mathrm{eff}}(\theta)M/R_{\mathrm{eff}}^2$ with respect to the source position: displacing the mass by $d_0$ along the line of sight changes the acceleration at the detector by $2G_{\mathrm{eff}}(\theta)Md_0/R_{\mathrm{eff}}^3$ to leading order in $d_0/R_{\mathrm{eff}}$, a transverse displacement changes it by half as much, and the radial coefficient $2$ is therefore the largest over displacement directions. For a white acceleration readout covariance $N(t_{\mathrm{eff}},t'_{\mathrm{eff}})=S_a\delta(t_{\mathrm{eff}}-t'_{\mathrm{eff}})$, the distinguishability obeys
$$
\mathcal{D}_{\mathrm{grav}}(T_W;\theta)
\le
\frac{4G_{\mathrm{eff}}^2(\theta)M^2d_0^2T_W}{R_{\mathrm{eff}}^6S_a}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-574ade487f4f363b)

With benchmark values
$$
M=10^{-14}\,\mathrm{kg},\qquad
d_0=10^{-6}\,\mathrm{m},\qquad
R_{\mathrm{eff}}=10^{-3}\,\mathrm{m},\qquad
T_W=1\,\mathrm{s}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-054b99eaa3208ed3)

and an aggressive acceleration-noise amplitude
$$
S_a^{1/2}=10^{-15}\,\mathrm{m\,s^{-2}}/\sqrt{\mathrm{Hz}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7830ae65acb464c1)

the bound, evaluated with $G=6.674\times10^{-11}\,\mathrm{m^{3}\,kg^{-1}\,s^{-2}}$, is
$$
\mathcal{D}_{\mathrm{grav}}
\lesssim
1.8\times10^{-12}
\left(\frac{M}{10^{-14}\,\mathrm{kg}}\right)^2
\left(\frac{d_0}{10^{-6}\,\mathrm{m}}\right)^2
\left(\frac{10^{-3}\,\mathrm{m}}{R_{\mathrm{eff}}}\right)^6
\left(\frac{T_W}{1\,\mathrm{s}}\right)
\left(
\frac{10^{-15}\,\mathrm{m\,s^{-2}}/\sqrt{\mathrm{Hz}}}{S_a^{1/2}}
\right)^2
$$

[View →](../../../../../equation-mapping.html#corpus-equation-966cd853ccca3102)

For a which-path threshold of order unity, this run is deep in the weak-probe class. Solving the same bound for the mass needed to reach $\mathcal{D}_{\mathrm{grav}}\sim\varepsilon_{\mathrm{wp}}$ gives
$$
M_{\mathrm{crit}}
\approx
\frac{R_{\mathrm{eff}}^3}{2G_{\mathrm{eff}}(\theta)d_0}
\sqrt{\frac{\varepsilon_{\mathrm{wp}}S_a}{T_W}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-67400247e859d41c)

or, in the same benchmark geometry,
$$
M_{\mathrm{crit}}
\approx
7.5\times10^{-9}\,\mathrm{kg}\,
\varepsilon_{\mathrm{wp}}^{1/2}
\left(\frac{R_{\mathrm{eff}}}{10^{-3}\,\mathrm{m}}\right)^3
\left(\frac{10^{-6}\,\mathrm{m}}{d_0}\right)
\left(
\frac{S_a^{1/2}}{10^{-15}\,\mathrm{m\,s^{-2}}/\sqrt{\mathrm{Hz}}}
\right)
\left(\frac{1\,\mathrm{s}}{T_W}\right)^{1/2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-cba1f5370733d869)

This is not a new ontology or an experimental forecast. It is a scale check: for ordinary mesoscopic masses, gravity-side which-path leakage is negligible unless the branch mass, separation, proximity, coherence time, or readout sensitivity moves by many orders of magnitude. A full detector calculation should replace the scalar factor $2/R_{\mathrm{eff}}^3$ with the tensor response in the Minimal Response Model above.

### Acceptance Criteria

For an interference-preserving run, the metric or gravity-side readout must satisfy
$$
\mathcal{D}_{\mathrm{grav}}(T_W;\theta)
\le
\varepsilon_{\mathrm{wp}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-baf70e8bcbab6b6a)

For a mediated-entanglement run, the same record must also satisfy
$$
C_{\mathrm{GIE}}(T_W;\theta)
\ge
C_{\mathrm{obs}}-\varepsilon_C,
\qquad
\mathcal{R}_{\mathrm{nongrav}}
\le
\varepsilon_{\mathrm{iso}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f6c04406d9dbf53e)

This combined gate preserves the observable without overclaiming the interpretation: the run tests whether the retained gravity-side constitutive record can generate the observed branch correlation while avoiding premature which-path record formation.

If a which-path record is claimed instead, the measurement chapter's record criteria must also hold:
$$
\tau_{\text{meas}} < T_W,
\qquad
\sup_{t_{\mathrm{eff}}\in[\tau_{\text{meas}},\,\tau_{\text{meas}}+T_{\text{rec}}]}
\Delta_{\mathrm{rec}}(t_{\mathrm{eff}};k)
\le
\varepsilon_{\mathrm{rec}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-bd4cb4ebf205ebde)

The failure condition is strict. If $\mathcal{D}_{\mathrm{grav}}\gg1$ while interference visibility remains high, no record-autonomy condition is satisfied, and the independently calibrated information-to-visibility relation of [Measurement Ontology](../../../../markdown/aaa/quantum/measurement-ontology.md#external-gravitational-which-path-benchmark) predicts visibility suppression at that value, the effective-metric response has overproduced observable which-path information. Without that calibrated relation the diagnostic alone does not establish the failure.

The same $\theta$ must also remain compatible with the gravity-side ledger: redshift, Shapiro delay, lensing, PPN parameters, gravitational-wave speed, dispersion, detector-mode bounds, and compact-source ring/shadow extrapolations. A parameter set that fits the massive-superposition channel only by changing the weak-field metric record is not a valid closure.

### Simulation Target

The minimal simulation target is the map
$$
\mathcal{S}_{\mathrm{grav}}:
\left(
m,\sigma,d_{\mathrm{eff}}^i(t_{\mathrm{eff}}),T_W,G_A,N_{AB},R,\Sigma,\rho_A^a,\rho_B^b
\right)
\longmapsto
\left(
\mathcal{D}_{\mathrm{grav}},
\mathcal{V}(T_W),
\Delta\Phi_{\mathrm{ent}},
C_{\mathrm{GIE}},
\tau_{\text{meas}},
\Delta_{\mathrm{rec}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3454fb0e13ca120b)

The inputs are the branch mass scale, packet width, separation history, coherence window, detector response kernel, covariance decomposition, record variable, separatrix, and two-probe branch histories when present. The outputs are the gravitational distinguishability, interference visibility, entangling phase, mediated-entanglement witness, finite measurement time, and record-autonomy residual.

The worked acceleration bound supplies the first analytic $\mathcal{D}_{\mathrm{grav}}$ estimate. The mediated-entanglement comparison supplies the first branch-phase target. Full packet closure still requires one numerical or analytic instance that computes the retained outputs from a shared constitutive record and reports whether the branch pair is weak-probe, mediated-entangling, record-forming, or falsifying.

### Sources

- J. Oppenheim, *A Postquantum Theory of Classical Gravity?*, Physical Review X 13, 041040 (2023), [arXiv:1811.03116](https://arxiv.org/abs/1811.03116), DOI: 10.1103/PhysRevX.13.041040. The classical-quantum gravity proposal named in Comparison Boundary; read as an external comparison at observer level, with its stochastic-metric ontology not imported.
- J. Oppenheim, C. Sparaciari, B. Šoda, and Z. Weller-Davies, *Gravitationally induced decoherence vs space-time diffusion: testing the quantum nature of gravity*, Nature Communications 14, 7910 (2023), [arXiv:2203.01982](https://arxiv.org/abs/2203.01982), DOI: 10.1038/s41467-023-43348-2. Source of the decoherence-versus-diffusion trade-off behind the retained pressure that a classical gravity readout must not reveal branch information while interference persists.
- S. Bose et al., *Spin Entanglement Witness for Quantum Gravity*, Physical Review Letters 119, 240401 (2017), [arXiv:1707.06050](https://arxiv.org/abs/1707.06050), DOI: 10.1103/PhysRevLett.119.240401; and C. Marletto and V. Vedral, *Gravitationally Induced Entanglement between Two Massive Particles is Sufficient Evidence of Quantum Effects in Gravity*, Physical Review Letters 119, 240402 (2017), DOI: 10.1103/PhysRevLett.119.240402. The two-probe gravitationally induced entanglement proposals behind Mediated Entanglement Comparison; the ideal-state witness $C_{\mathrm{GIE}}$ reproduces their branch-phase construction, while their inference that entanglement certifies a quantum mediator remains comparison pressure rather than a premise of this packet.

## Validation Simulations

### Architrino

The minimum tier-1 tests establish provenance-resolved propagation, baseline diagnostics, and a workable history-buffer strategy before any strong [self-hit](../../../../markdown/aaa/foundations/architrino.md) claim—one in which an architrino encounters its own earlier wake—or other delayed-memory claim is trusted numerically. Tier 1 is the first and mandatory tier of this chapter's test ordering: every test in it passes before a run reports any self-hit or delayed-memory result, and the label is local to this ordering.

The reader should treat this as the simulator's first honesty check. Before the code reports rich self-hit behavior, it has to show that causal wake surfaces—the expanding spheres an architrino emits at every instant of its motion—arrive in the right order, that transmitter identities are preserved, and that history lookups return only retained, interpolable history and never fabricate a past state the record does not contain.

This chapter is therefore an implementation-facing test specification rather than a general theory chapter. It should be read as a gate on simulation credibility.

#### Tier-1 Mandatory Unit Tests (Before Self-Hit Claims)

##### Provenance-resolved propagation test
Implement one-architrino and two-architrino setups observed by $\mathbb{U}_{\text{now}}$ sensors—fixed virtual probes that read the complete universe state $\mathbb{U}_{\text{now}}$ directly, as the [Simulation Run Protocols](../../../../markdown/aaa/validation/simulations/run-protocols.md#master-simulation-protocol-absolute-frame) declare, and that are simulation instruments rather than physical observers—placed on concentric spheres, or their planar circular sections, of declared radii $r_k$ about each transmitter's initial site. We work in normalized wake-speed units with $c_f=1$. For a transmitter at rest at $\mathbf X_t$ with polarity $q$, the causal wake surface emitted at $T_t$ is the sphere $\|\mathbf X-\mathbf X_t\|=T-T_t$, so the sensor at radius $r_k$ records that emission at $T_r=T_t+r_k$ with surface density $q/(4\pi r_k^2)$; this closed form, stated in the [mathematics style guide](../../../../markdown/aaa/archie/mathematics-style-guide.md#distributions-and-regularization-causal-wake-surfaces), is the analytic reference against which the checks below are made. The one-architrino setup at rest is also the zero-self-root control: a stationary transmitter can meet its own wake only at $T_t=T_r$, which the convention $H(0)=0$ excludes, so its same-transmitter root set must be reported empty and its velocity must remain exactly constant. The two-architrino setup adds partner hits, so each architrino is both transmitter and receiver; its emissions from at-rest segments of the retained history still obey the closed form above, and its later emissions are checked by the root-condition residual and the refinement metrics below.
- Verify causal wake-surface propagation at $c_f$: each sensor's recorded arrival time matches $T_t+r_k$ within the predeclared arrival tolerance.
- Verify correct arrival ordering and phase behavior (per kernel): for one emission, sensors at increasing radius record it at increasing reception times, and at one sensor successive emissions arrive in emission order while the transmitter's speed stays below $c_f$; for each declared regularization kernel—the mollified causal wake surface $\delta_\eta$ of width $\eta$—the arrival profile at radius $r_k$ is centered on $T_t+r_k$ with temporal width $\eta$, so its timing and sign match the sharp surface.
- Verify numerical stability of $T_t$ inversion as $\Delta T \to \Delta T / 2$. Here $T_t$ inversion means solving the causal-root condition $\|\mathbf X_r(T_r)-\mathbf X_t(T_t)\|=c_f(T_r-T_t)$—the receiver's position at reception time $T_r$ lies exactly $c_f(T_r-T_t)$ from the transmitter's position at emission time $T_t$—for the emission time at each reception event, as defined in the [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#causal-interaction-set-the-geometry-of-delay). Halve the time step together with the history-sampling step, as the [Simulation Run Protocols](../../../../markdown/aaa/validation/simulations/run-protocols.md#master-simulation-protocol-absolute-frame) require, and compare the solved emission-time distributions between the two runs with the provenance metrics $D_W$ and $D_{JS}$ of [Convergence Tests](../../../../markdown/aaa/validation/simulations/convergence-tests.md#comparison-metrics-required) against their predeclared tolerances; on at-rest history segments the solved $T_t$ must also match $T_r-r_k$ directly.
- Produce provenance tables showing correct `transmitter_id` values and emission times: for every received contribution the table records the receiver identity, the reception time $T_r$, the `transmitter_id`, and the solved $T_t$, and on at-rest history segments each entry is checked against the analytic $T_t=T_r-r_k$.

##### Baseline diagnostics
- On the same root and history records, report the normalized finite-window energy, momentum, and angular-momentum pullback residuals $\mathcal R_E$, $\mathcal R_P$, and $\mathcal R_J$ defined by the [Coincident-Midpoint Orthogonal-Axis Action-Increment Protocol](../../../../markdown/aaa/validation/simulations/coincident-midpoint-orthogonal-axis-action-increment-protocol.md#branch-chart-conservation-pullback); each is the normalized change over the analysis window of a conserved total that adds the mechanical part to the part stored in the retained wake history, after the protocol's declared correction terms are subtracted, evaluated on the same branch chart as the root ledger. Each residual must satisfy its predeclared tolerance and remain stable under temporal and history refinement. A diagnostic work integral or acceleration moment does not replace that exact wake-history pullback. The residuals are conservation evidence only for motion generated by the Master Equation from its retained history; on a setup that holds any architrino on a prescribed history they are conditional diagnostics, because a prescribed path is not a solution of the acceleration law.
- Compare the numerical arrival times and surface normalization with an independently authored stationary-transmitter analytic causal wake surface—the closed form $T_r=T_t+r_k$ and $q/(4\pi r_k^2)$ above, implemented separately from the code under test. Cross-integrator agreement is an additional implementation-parity check, not an independent oracle.

##### Grid Cache Boundary

1. **Problem**: A finite simulation cannot retain unbounded path history.
2. **Authoritative record**: Retain bounded, interpolable worldline segments $\mathbf X_i(T)$ and $\mathbf V_i(T)$ with stable transmitter identities over the declared causal horizon, the retained history depth behind each reception time, with the interpolant and its error bound declared alongside the record. A candidate root that reaches the retained-history boundary is reported as unresolved, never as absent: the contribution is not silently dropped, because a lookup that returns no root where the record simply ends would be inventing an empty past.
3. **Optional cache**: A $\mathbb{U}_{\text{now}}$ grid may cache potential and gradient summaries for visualization or broad-phase search, but a nearest-node lookup cannot replace the transmitter-tagged history needed to solve a self-hit root, because the root condition must be solved against the transmitter's own position and velocity at the emission time. A node summary retains neither that emission time nor the transmitter velocity that fixes the transmitter-side factor $D_t=c_f-\hat{\mathbf r}_t\cdot\mathbf V_t(T_t)$, where $\hat{\mathbf r}_t$ is the unit direction from the emission point to the receiver, and through it the transmitter-side acceleration weight $W^{\mathrm{acc}}=c_f/|D_t|$ of the [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form).
4. **Deliverable**: Demonstrate convergence against an independently authored analytic causal wake surface, using the comparison metrics of [Convergence Tests](../../../../markdown/aaa/validation/simulations/convergence-tests.md#comparison-metrics-required), and show that grid caching preserves the same root identity, emission time, and acceleration contribution as the authoritative history record. That cache-versus-record agreement is an implementation-parity check between two paths of the same code; the analytic surface remains the only independent reference.

##### Grid-Based History

* **Memory Strategy:** Store finite authoritative worldline history; use the fixed grid only as a derived cache.
* **Lookup:** Use a grid or spatial index, keyed by retained emission positions rather than current transmitter positions, to nominate candidate transmitters and history intervals, then solve the causal-root equation against the retained transmitter history. Nomination narrows the search but does not establish completeness: every admitted root in the retained interval must still be found and summed, as the [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#spatial-hashing-for-history-buffers) implementation notes require.
* **Validation:** Verify causal wake-surface propagation, phase ordering, transmitter identity, and emission time under joint temporal, history, and spatial refinement, with the metrics and predeclared tolerances named above.

### Convergence Tests

The convergence standard specifies which observables are checked, which refinement ladders are required, and what pass/fail thresholds distinguish numerical control from artifacts in simulations of delayed dynamics. An [architrino](../../../../markdown/aaa/foundations/architrino.md) is a point transceiver of fixed polarity; each of its past positions emits a causal wake, an expanding disturbance that travels outward at the wake speed $c_f$, and a receiver is accelerated at a reception time only by the wakes that arrive exactly then, at the causal roots found by solving the delay condition in stored history. The dynamics are therefore non-Markovian: the next update depends on path history, not on the instantaneous state alone, and in the [self-hit](../../../../markdown/aaa/dynamics/master-equation.md#self-hit-condition) regime an architrino encounters its own earlier wake. Convergence, in the mathematical sense used here, means that a reported result on a declared window is not produced by the mesh, time step, history-interpolation resolution, root solver, or regulator. The requirement matters more for delayed dynamics than for ordinary differential equations, because a small bookkeeping error in the past can return later as a spurious branch, stability window, or invariant. The standard is therefore a validation gate, not optional numerical hygiene.

All convergence claims in this chapter are finite-window claims. Passing the gates below establishes that the declared observables on the analysis window are stable under refinement of the discretization parameters the ladders vary, with the stated detector set, history horizon, and regulator choices held fixed. Every ladder compares runs of the same instrument with itself, so a pass is evidence that the discretization did not produce the result; it is not by itself evidence that the result is correct, because an error shared by every rung, such as a wrong kernel, a root missed at every resolution, or a truncated history tail, survives refinement unchanged. Correctness additionally requires the independent known-case check of the [numerical recipe](../../../../markdown/aaa/validation/simulations/action-energy/numerical-recipe-and-stability.md): agreement with a closed form, an analytically known case such as the fixed-center solutions in [Analytic Baselines](../../../../markdown/aaa/validation/simulations/action-energy/analytic-baselines.md), or an instrument authored separately from the run. The gates also do not decide unbounded reachability questions for the full delayed dynamics; those would require a separate theorem about the global flow rather than a stronger convergence plot.

#### Convergence in Non-Markovian (Self-Hit) Dynamics

##### Scope and default observable set

For each claim, compute convergence on a fixed native analysis window $W=[T_a,T_b]$ in absolute time $T$ and a fixed detector set $\{\mathbf X_k\}$ of evaluation points in the Euclidean void, using:

- the mollified bookkeeping potential $\Phi(\mathbf X_k,T)$, meaning the potential $\Phi_\eta$ reconstructed from the superposed causal wakes of the run at its declared causal-wake-surface width $\eta$; it is an evaluation channel, not the substrate law, which is the per-hit acceleration of the [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md)
- its gradient magnitude $\|\nabla_{\mathbf X}\Phi(\mathbf X_k,T)\|$
- the self-hit event rate $\lambda_{\text{self},i}$ on $W$ for each tracked receiver $i$, the number of admitted causal roots per unit absolute time whose transmitter and receiver are the same architrino; a self-hit is an event on a receiver worldline, so the rate is indexed by the receiver rather than by a fixed detector point
- the drift of a key invariant on $W$, for example the normalized energy drift $\epsilon_E$ constructed as in [Delay Dynamics Energy](../../../../markdown/aaa/validation/simulations/action-energy/delay-dynamics-energy.md) with the same regulator, retained branches, and window-boundary account as the motion

When the run evolves architrino motion rather than evaluating prescribed paths, the observable set also includes the motion channels that the numerical recipe compares on the same window: root identities, the acceleration record, and the integrated velocity change of each tracked architrino. Each observable is declared, with its norm, tolerance, and normalization scale, before the run.

##### Comparison metrics (required)

For any observable $Y$ on two runs A (coarser) and B (finer), define
$$
E_{\mathrm{rel}}(Y;A,B)\equiv
\frac{\|R(Y_B)-Y_A\|_{L^2(W,\{\mathbf X_k\})}}
{\|R(Y_B)\|_{L^2(W,\{\mathbf X_k\})}+\varepsilon_{0,Y}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5d43236ba1f86777)

Here $R$ is restriction of the finer run to the coarser sampling grid, and $\varepsilon_{0,Y}$ is a predeclared floor with the same units as the norm of $Y$. The norm $\|\cdot\|_{L^2(W,\{\mathbf X_k\})}$ is the weighted root-mean-square over the reception samples in $W$ and the detector points, with predeclared quadrature weights that sum to one, the same convention as the history norm below; a normalized norm keeps the meaning of the floor independent of the sample count, so that pairs of runs on different grids can be compared in one ratio. A bare dimensionless constant must not be added to a dimensional channel.

For the provenance distributions of solved emission times $T_t$, recorded in the compatibility field `t_emit` of the [run protocol](../../../../markdown/aaa/validation/simulations/run-protocols.md), define:
$$
D_W \equiv \frac{W_1(P_A,P_B)}{\mathrm{IQR}(P_B)+\varepsilon_T},
\qquad
D_{JS}\equiv \mathrm{JSD}(P_A\|P_B)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-72d15bc24c00f4fb)

where $P_A$ and $P_B$ are the distributions of admitted-root emission times over the reception samples in $W$ and the tracked receivers of the two runs, $W_1$ is the 1-Wasserstein distance, the smallest average displacement of emission-time mass that turns one distribution into the other, $\mathrm{IQR}(P_B)$ is the interquartile range of the finer run's distribution, $\varepsilon_T$ is a predeclared absolute-time floor, and $\mathrm{JSD}$ is the Jensen–Shannon divergence with logarithm base $2$, which lies between $0$ for identical distributions and $1$ for distributions with disjoint support. Solved emission times are continuous values that differ between runs by their root-time error, so their raw sample sets have disjoint support and give $D_{JS}=1$ whatever the agreement. The divergence is therefore evaluated on a discretization declared before the run and shared by both runs, a bin width or kernel width no smaller than the largest certified root-time error of the compared runs. The Wasserstein ratio $D_W$ needs no binning; $D_{JS}$ compares the shapes of the two distributions at the declared resolution.

For delayed transmitter-state interpolation, the run must declare an order-$q$ history interpolation operator $I_{\Delta H_{\mathrm{hist}}}^q$, which reconstructs the stored transmitter history at any emission time from samples spaced $\Delta H_{\mathrm{hist}}$ apart using a polynomial of degree $q$. On a fixed analysis window $W$, define
$$
E_{\mathrm{hist}}(S_\eta;\Delta H_{\mathrm{hist}},\Delta H_{\mathrm{hist}}/2;W)
=
\frac{
\left(\sum_{m\in W}\|I_{\Delta H_{\mathrm{hist}}/2}^qS_\eta(T_{t,m})-I_{\Delta H_{\mathrm{hist}}}^qS_\eta(T_{t,m})\|^2w_m\right)^{1/2}
}{
\left(\sum_{m\in W}\|I_{\Delta H_{\mathrm{hist}}/2}^qS_\eta(T_{t,m})\|^2w_m\right)^{1/2}+\varepsilon_{0,S}
}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6beb3447a5cd62ba)

Here $S_\eta(T_t)$ is the regularized transmitter state, position and velocity, evaluated at the emission time $T_t$ of an admitted root, as declared in the run protocol; $T_{t,m}$ is the emission time of the $m$-th admitted root whose reception time lies in $W$; and the two terms evaluate the same state at two history resolutions, so $E_{\mathrm{hist}}$ measures how much the reconstructed delayed state moves when the history step is halved. The state norm $\|\cdot\|$ is declared before the run together with its unit weights for the position and velocity components, which in normalized wake-speed units with $c_f=1$ are both dimensionless. The weights $w_m\ge0$ are predeclared quadrature or sample weights normalized by $\sum_{m\in W}w_m=1$, and $\varepsilon_{0,S}$ has the same units as the weighted state norm.

For nonsmooth state-dependent delay windows, meaning reception intervals in which a causal root is born, lost, or changes status, define the jump residual rows
$$
\mathcal{D}_{\mathrm{jump}}
=
\{(\xi_a,k_a,\ell_a,\xi_{\pi(a)},R_{\mathrm{jump},a})\},
\qquad
R_{\mathrm{jump},a}
=
\frac{|T_{0,\ell_a}(\xi_a)-\xi_{\pi(a)}|}
{\max(\Delta T,\Delta H_{\mathrm{hist}},\eta/c_f,\varepsilon_T)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-98702b057ef78ec6)

Here $\xi_a$ is a sampled reception time in the coarser run's transition window at which tracked root $k_a$, with branch or root-class label $\ell_a$, changes status; $T_{0,\ell_a}(\xi_a)$ is the transition time that the coarser run's event location assigns to that labeled root from the sample $\xi_a$; $\pi(a)$ is the predeclared matching permutation into the comparison run; and $\xi_{\pi(a)}$ is the transition time of the matched labeled root in the comparison run. The residual therefore compares the two runs' transition times for one labeled root, normalized by the largest resolution scale in play: the reception step $\Delta T$, the history step $\Delta H_{\mathrm{hist}}$, the reception-time width $\eta/c_f$ of the causal-wake-surface regulator, and the time floor $\varepsilon_T$. The transition-window row passes when every residual satisfies $R_{\mathrm{jump},a}\le\tau_{\mathrm{jump}}$ with $\tau_{\mathrm{jump}}$ declared before the run. A row is invalid if the matching rule or permutation is chosen after inspecting the residual.

##### Required refinements with pass/fail thresholds

1. Temporal refinement ($\Delta T$ and $\Delta T/2$, plus $\Delta T/4$ for order check), with the root residual and root-time tolerances tightened with the step so that the certified root-time error of the numerical recipe stays below the reception step at every rung:
- Pass if $E_{\mathrm{rel}}(\Phi)\le 0.02$, $E_{\mathrm{rel}}(\|\nabla\Phi\|)\le 0.03$, and $|\lambda_{\text{self},A}-\lambda_{\text{self},B}|/\max(|\lambda_{\text{self},B}|,\lambda_{\min})\le0.05$ for each tracked receiver, with the rate floor $\lambda_{\min}$ declared before the run. If both rates lie below that floor, compare absolute event counts and root identities instead of reporting an undefined relative rate.
- Estimated observed order:
$$
p_{\mathrm{obs}}(Y)=\log_2\!\frac{E_{\mathrm{rel}}(Y;\Delta T,\Delta T/2)}
{E_{\mathrm{rel}}(Y;\Delta T/2,\Delta T/4)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b32cc921fe0fef67)

Require $p_{\mathrm{obs}}\ge 0.8$ for at least one primary potential channel ($\Phi$ or $\|\nabla\Phi\|$). The estimate reads the convergence order from the ratio of successive differences: if the error at step $\Delta T$ scales as $\Delta T^{\,p}$, each halving divides the difference between neighboring rungs by $2^p$, so the base-two logarithm of the ratio recovers $p$. It is meaningful only when the three runs share the same active-root identities on $W$ and both differences exceed the declared floor; a root census that changes at one rung produces an order-one difference that is not a discretization error, and a fold or status transition inside $W$ lowers the attainable order below that of the smooth integrator, so the transition-window row, not this estimate, governs such windows.

2. History-resolution refinement (history step halved or interpolation order increased):
- Pass if $E_{\mathrm{rel}}(\Phi)\le 0.02$, $E_{\mathrm{rel}}(\|\nabla\Phi\|)\le 0.03$.
- Provenance stability mandatory: $D_W\le 0.05$ and $D_{JS}\le 0.02$.
- Delayed-transmitter interpolation stability mandatory whenever delayed states are evaluated from stored history: $E_{\mathrm{hist}}\le\tau_{\mathrm{hist}}$ with $\tau_{\mathrm{hist}}$ declared before the run.
- The retained-history horizon $H_{\mathrm{hist}}$ is held fixed here and in every other ladder. Memory truncation is assessed separately under the numerical recipe's finite-memory or bounded-tail requirement; a passing table does not bound the omitted tail.

3. Spatial refinement (refinement of the detector or map grid on which $\Phi$ and $\nabla\Phi$ are sampled, and an increase of sampling density for any coarse-grained or continuum representation of the Noether sea; the architrino count of a direct run is physical input, not a resolution parameter):
- Pass if $E_{\mathrm{rel}}(\Phi\text{-map})\le 0.03$ and $E_{\mathrm{rel}}(\nabla\Phi\text{-map})\le 0.05$.
- Self-hit counts and stability-window boundaries must satisfy relative shift $\le 0.05$, where a stability window is the declared interval of a control parameter on which the run reports a retained branch as stable and the relative shift is the boundary displacement divided by the window width.

4. Cross-integrator validation (two time-stepping methods of different construction, for example a linear multistep method and a Runge–Kutta method, at matched resolution):
- Pass if $E_{\mathrm{rel}}(\Phi)\le 0.03$, $E_{\mathrm{rel}}(\|\nabla\Phi\|)\le 0.05$.
- Provenance agreement must satisfy $D_W\le 0.08$ and $D_{JS}\le 0.03$.
- The cross-integrator report must name solver family, interpolation policy, solver residual controls, and event/restart handling. If the compared runs select different active-root identities or transition statuses, the claim fails even if observable plots are close.
- Two integrators that share the root-finding, history-interpolation, and regulator code test only the time stepping. Their agreement is an implementation-parity check and does not replace the independent reference that a correctness claim requires.

5. Continuum moment refinement when a run promotes a coarse partial differential equation, kinetic moment, or Noether sea transport equation, meaning a reduced description obtained by averaging over many architrinos:
- Pass if the retained density and current channels, compared between the reduced run and the direct event-root run, satisfy
  $$
  E_{\mathrm{rel}}(R_{\rho}^{\mathrm{cg}})\le0.03,
  \qquad
  E_{\mathrm{rel}}(R_{P}^{\mathrm{cg}})\le0.05,
  \qquad
  E_{\mathrm{rel}}(R_E^{\mathrm{cg}})\le0.05
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-c74a4352b28ee9e6)

- Here $R_{\rho}^{\mathrm{cg}}$, $R_{P}^{\mathrm{cg}}$, and $R_E^{\mathrm{cg}}$ are the coarse-grained density, momentum-current, and energy channels of the moment hierarchy, each evaluated in the reduced run and in the direct event-root run coarse-grained on the same cells and window; the subscript $P$ labels the momentum moment and is not a cycle period. The moment-closure residual must decrease under temporal, history, and spatial refinement. A continuum plot is not promotion evidence if the next unresolved moment grows or if the memory-current residual is absorbed into fitted constants.

6. Stochastic and response refinement when a run adds Langevin, Fokker-Planck, or fluctuation-response summaries, reduced descriptions in which unresolved architrino history enters a reduced variable as noise: a Langevin equation adds a random forcing term to the reduced variable, a Fokker-Planck equation evolves that variable's probability density, and a fluctuation-response summary relates the variable's spontaneous fluctuations to its response to a small perturbation. These are effective-level summaries of deterministic delayed dynamics, and the direct event-root ensemble is their reference.
- For the first two moments of any declared distribution $P(z,T)$ of a reduced variable $z$ at absolute time $T$, require agreement with direct event-root ensembles:
  $$
  E_{\mathrm{rel}}(\langle z\rangle)\le0.03,
  \qquad
  E_{\mathrm{rel}}(\operatorname{Cov}(z))\le0.05
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-aac85420eb464059)

- If a diffusion tensor $D^{ij}(z)$, the coefficient of the second-derivative term of the Fokker-Planck equation, is inferred from jump or ledger increments, require it to remain positive semidefinite on the retained domain and stable under refinement.
- If a response kernel $\chi_{AB}$, the linear response of observable $A$ to a perturbation coupled to observable $B$, is promoted, require the causal dispersion residual $\mathcal R_{\mathrm{KK}}(\chi_{AB})\le0.05$ on the declared frequency band, where $\mathcal R_{\mathrm{KK}}$ measures the violation of the dispersion relations that tie the real and imaginary frequency parts of any causal kernel, and require any fluctuation-dissipation residual, the mismatch between the measured fluctuation spectrum and the one implied by the response kernel, to be reported from the same record.

7. Revised branch-coordinate model selection when a run changes a reduced branch coordinate, chart partition, or residual basis before rerun:
- The proposed coordinate must declare its source fields, equality map, symmetry quotients, and excluded locked keys before any coefficient fit or rerun.
- The selection report must include a held-out residual check, and it must include a phase-origin check whenever the coordinate uses an observation-phase split.
- The design must remain overdetermined after quotienting, with $N_{\mathrm{eq}}>N_{\mathrm{coef}}$, equivalently $R_{\mathrm{df}}>0$, where $N_{\mathrm{eq}}$ counts the independent residual equations after the symmetry quotient and $N_{\mathrm{coef}}$ counts the fitted coefficients. Report
  $$
  R_{\mathrm{df}}=\frac{N_{\mathrm{eq}}-N_{\mathrm{coef}}}{N_{\mathrm{eq}}},
  \qquad
  \frac{\operatorname{tr}H}{N_{\mathrm{eq}}}\le\frac{1}{2},
  \qquad
  \max_i H_{ii}\le\frac{1}{2}
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-1bce23587507a703)

  or an explicitly justified equivalent if a linear hat matrix $H$ is not available. Here $H$ is the hat matrix of the linear least-squares fit, the matrix that maps the observed residual values to their fitted values, and $H_{ii}$ is the leverage of equation $i$. For a full-rank linear fit the trace of $H$ equals $N_{\mathrm{coef}}$, so the displayed trace bound is the stronger requirement $N_{\mathrm{eq}}\ge2N_{\mathrm{coef}}$, equivalently $R_{\mathrm{df}}\ge1/2$; the leverage bound separately forbids any single equation from determining half or more of its own fitted value.
- Branch identity must persist under temporal refinement, history-window refinement, regulator refinement when a regulator is used, and root-ledger refinement. A coordinate that only improves the fitted residual while changing the active branch identity fails model selection.

##### Machine-checkable convergence output

Every promoted claim must emit `convergence_table.csv` with one row for each required gate: temporal refinement, history-resolution refinement, history-interpolation refinement when delayed states are reconstructed from stored history, spatial refinement, cross-integrator validation, regulator ladder when used, transition-window refinement when a fold-layer or active-root status transition is claimed, a fold being a reception interval in which two causal roots meet at zero transmitter-side derivative, and negative control. Each row records the two run identifiers being compared, the restricted observable channel, $E_{\mathrm{rel}}(\Phi)$, $E_{\mathrm{rel}}(\|\nabla\Phi\|)$, $D_W$, $D_{JS}$, $E_{\mathrm{hist}}$ when applicable, $p_{\mathrm{obs}}$, active-root mismatch, self-hit or stability-window shift, transition-window status with the jump residuals $R_{\mathrm{jump},a}$ when applicable, pass/fail status, and failure code.

For continuum or stochastic promotions, append rows for `moment-closure`, `distribution-moments`, `diffusion-tensor`, `causal-response`, and `fluctuation-dissipation` when those channels are claimed. These rows must include the artifact hash of the direct event-root run and the artifact hash of the reduced continuum or stochastic run being compared.

For field-theory or continuum-limit promotions, the packet must also declare the scaling-limit datum: regulator family, scaling trajectory, volume or window trajectory when relevant, test-observable class, observable maps from the regulated state to the promoted variables, normalization and mixing rules for composite observables, convergence topology, positivity or reconstruction condition when the claim uses a quantum-field analogue, and the artifact hashes for every regulated run consumed by the limit. Without this datum, a finite-regulator trend is a diagnostic, not a promoted continuum claim.

If the promoted claim invokes an Osterwalder-Schrader-like or Wightman-like field-theory reconstruction, meaning a theorem that recovers a quantum field theory from correlation functions satisfying a stated list of conditions, the packet must identify the full reconstruction package it is borrowing: positivity, covariance or symmetry, locality or support condition, vacuum-sector or clustering condition, test-function space, regularity and growth control, and the target reconstructed object. Reflection positivity alone is not enough to promote a regulated numerical family into a local quantum-field analogue.

For revised branch-coordinate promotions, append rows for `branch-coordinate-source`, `branch-coordinate-heldout`, `branch-coordinate-phase-origin` when applicable, `branch-coordinate-design`, and `branch-identity-refinement`. These rows must include the artifact hash of the predeclared coordinate packet and the rerun candidate that consumes it.

The regulator row must include each promoted observable $Y$ and the value of
$$
E_\eta(Y;\eta,\eta/2)
=
\frac{\|R(Y_{\eta/2})-Y_{\eta}\|_{L^2(W,\{\mathbf X_k\})}}
{\|R(Y_{\eta/2})\|_{L^2(W,\{\mathbf X_k\})}+\varepsilon_{0,Y}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4ef903e8a02b096f)

It also records whether active root-ledger entries match between $\eta$ and $\eta/2$ after matching transmitter, receiver, root class, and branch status. The regulator $\eta$ is the causal-wake-surface width of the [auxiliary dual-mollified regulator](../../../../markdown/aaa/dynamics/master-equation.md#auxiliary-dual-mollified-regulator-for-proof-and-computation). Each rung of the ladder must remain resolved: the reception step and history spacing stay below the local traversal scales $\eta/|D_r|$ and $\eta/|D_t|$ stated in the numerical recipe, where $D_t$ and $D_r$ are the transmitter-side and receiver-side factors, so that halving $\eta$ is accompanied by the resolution it needs; shrinking the width while its support goes unresolved is not a regulator ladder. When the run also uses the core scale $\epsilon_c$, which controls the inverse-square kernel near zero separation, that scale forms a separate ladder with its own row, because surface-width removal and core removal are distinct limits. A convergence plot is not promotion evidence unless the table row containing the plotted quantity is present and tied to the campaign artifact hash.

Regulator extrapolation fits must report the fitted observable, the regulator ladder, the assumed asymptotic form, excluded points if any, stability under fit-window changes, endpoint or singular-window controls when they affect the extrapolation, and a negative-control observable. A fit that behaves smoothly but has no declared observable map, topology, normalization, volume or window estimate when relevant, remainder bound, or independent continuum reconstruction remains below theorem-grade evidence.

##### Negative control (null test, mandatory)

Run at least one intentionally wrong model choice, such as a wrong history kernel, a swapped transmitter/receiver factor that uses $D_r$ where the acceleration weight requires $D_t$, or a perturbed emission-time solver. Keep the numerical wake-speed normalization fixed at $c_f=1$ even in the negative control.

Pass condition for the *pipeline* (not the null run): the null run must break expected invariants by a clear margin, with at least one of:

- invariant drift increase by $\ge 5\times$ relative to the validated run,
- provenance instability $D_W>0.10$ or $D_{JS}>0.05$,
- stability-window shift $>0.10$.

If the null run still passes the convergence gates above, treat the claim as numerically unvalidated.

##### Global acceptance rule

A claim is numerically validated only if all applicable refinement gates pass and the null test fails as required. Numerical validation in this sense certifies refinement stability of the instrument on the declared window; a correctness claim additionally names the independent known-case reference required by the numerical recipe, and a physical claim requires the separate evidence of the relevant owner. Conditional gates such as revised branch-coordinate model selection apply only when the claim changes the reduced coordinate, chart partition, or residual basis before rerun.

### Perspective

This chapter separates the mechanisms already defined by the [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md) from the recovery claims that simulation must still test. An [architrino](../../../../markdown/aaa/foundations/architrino.md) is a point transceiver of fixed polarity, one of two signs; it emits a causal wake, an expanding spherical surface that travels outward at the primitive wake speed $c_f$, and it is accelerated only by the wakes that reach it. The primitive inputs are the [two architrino polarities](../../../../markdown/aaa/foundations/architrino.md), which set the sign of each interaction; delayed line-of-action acceleration, directed from the transmitter's past emission point to the receiver; transmitter-side causal-surface weighting, which scales each arriving contribution by the spacing of the transmitter's emitted surfaces; and same-transmitter causal-root branches, the self-hits in which an architrino meets its own earlier wake, a causal root being an emission time whose wake reaches the receiver exactly at the reception time. Stability, scale selection, inertia, gauge-sector behavior, and quantum-like statistics are downstream closure targets rather than consequences licensed by naming those inputs.

General relativity and quantum mechanics supply observer-level recovery targets: the clock, ruler, orbit, and light-bending behavior that general relativity describes, and the interference, correlation, and measurement statistics that quantum mechanics describes, are outputs the substrate dynamics must eventually reproduce, never premises of the simulation. A simulation supports such a recovery only when an independently specified observable map and benchmark residual pass; resemblance of internal geometry is not evidence by itself.

We work in normalized wake-speed units with $c_f=1$ throughout; the symbol $c_f$ is retained in the factors displayed below only so that their dependence stays visible. Per-hit accelerations are directed along $\hat{\mathbf{r}}$, the unit vector from the transmitter's emission point to the receiver, are weighted by the transmitter-side acceleration weight, and superpose linearly.

---

#### Delayed Emission and Transmitter-Side Acceleration

- What we assume:
  - Transmitters emit potential on expanding causal wake surfaces with surface density $\propto 1/r^2$, represented distributionally by $\delta(r-c_f\Delta)$ with $\Delta=T_r-T_t$, where $T_t$ is the emission time, $T_r$ the reception time, and $r$ the distance from the emission point to the receiver.
  - Each causal hit is directed along $\hat{\mathbf{r}}$ from the transmitter's emission point to the receiver, with received magnitude weighted by $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$, where $D_t=c_f-\mathbf V_t(T_t)\cdot\hat{\mathbf r}$ is the transmitter-side wake-spacing factor and $D_r=c_f-\mathbf V_r(T_r)\cdot\hat{\mathbf r}$ is the receiver-side root-playback factor, $\mathbf V_t(T_t)$ being the transmitter velocity at emission and $\mathbf V_r(T_r)$ the receiver velocity at reception.

- Why it matters:
  - Gauss-like behavior follows immediately ($1/r^2$ on causal wake fronts): the surface density falls as the inverse square of the distance while the surface area grows as its square, so the total emission crossing any sphere about the emission point is the same at every radius, which is the property that Gauss's law states for a static charge in classical electrostatics.
  - Moving histories can generate tangential components relative to an assembly-centered chart because the line of action points to the transmitter’s past position. Transmitter motion changes $D_t$, while receiver motion changes $D_r$ and future geometry.

- Closure target:
  - Determine whether retained assembly histories reproduce specific magnetic observables, the deflection of moving charges and the circulation patterns that classical electrodynamics attributes to a magnetic field, through delayed geometry alone. The simulation must name the observable, effective map, benchmark, and falsifying residual; the radial substrate law by itself does not establish circulation, axial vortices, or flux tubes.

---

#### Constant per-wavefront emission

- What we assume:
  - Emission cadence and per-wavefront amplitude are constant at the transmitter.

- Why it matters:
  - It isolates delay and self-interaction as candidate stability and scale-selection mechanisms. Transmitter motion supplies the transmitter-side factor, receiver motion supplies the receiver-side factor, and the signed instantaneous specific power, the rate of change of the receiver's bookkeeping kinetic energy per unit of the bulk conversion $\mu_{\mathrm{arch}}$, is $(\mathbf A\cdot\hat{\mathbf r})V_r$, where $V_r=\mathbf V_r\cdot\hat{\mathbf r}$ is the radial component of the receiver velocity; the transverse component does no instantaneous work because every per-hit acceleration is radial.
  - With $\eta$-mollification ($\delta\to\delta_\eta$, replacing the zero-thickness causal wake surface by a Gaussian of width $\eta$), the calculation can define the mollified potential $\Phi_\eta$ reconstructed from the superposed wakes, the potential-energy bookkeeping $U=q_r\Phi_\eta$ for a receiver of polarity $q_r$, and the kinetic proxy $E_k=\tfrac12\mu_{\mathrm{arch}}\|\mathbf V_r\|^2$, where $\mu_{\mathrm{arch}}$ is the universal bulk bookkeeping conversion and not a mass, and can test $\Delta E_k=-\Delta U$ on resolved intervals. That identity is the static-potential form. A potential reconstructed from delayed wakes depends explicitly on absolute time, so on an interval where the acceleration sum equals $-\nabla U/\mu_{\mathrm{arch}}$ the kinetic rate is $-\nabla U\cdot\mathbf V_r$ while $dU/dT=\nabla U\cdot\mathbf V_r+\partial_TU$; the test therefore compares $\Delta E_k$ with $-\Delta U$ plus the integrated explicit-time term $\int\partial_TU\,dT$ over the interval, or with the history-aware construction of [Delay Dynamics Energy](../../../../markdown/aaa/validation/simulations/action-energy/delay-dynamics-energy.md). A work-integral energy that balances kinetic change by construction is an arithmetic consistency check, not conservation evidence. A sharp-impulse claim additionally requires stable root identity and weak convergence as $\eta\to0$.

---

#### Self-Hit Root Onset

- What we assume:
- Same-transmitter self-hit is accepted only when the same-transmitter causal set, the set of emission times at which architrino $a$ emitted a wake that reaches its own later position $\mathbf X_a(T_r)$ exactly at $T_r$,
  $$
  \mathcal{C}_{aa}(T_r)=\{\,T_t<T_r:\|\mathbf X_a(T_r)-\mathbf X_a(T_t)\|=c_f(T_r-T_t)\,\}
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-c1c370d5a364709f)

  is nonempty and the active root passes the transversality/Jacobian floor, a declared lower bound $\lvert D_t\rvert\ge\nu_t>0$ on the transmitter-side factor at the root, and carries a retained transmitter-side acceleration weight. A speed excursion above $c_f$ is a necessary warning condition for simple nontrivial roots, not a sufficient criterion.
- Self-hits are always repulsive (like-on-like): the interaction sign of a transmitter with itself is $\operatorname{sign}(q_aq_a)=+1$.

- Why it matters:
  - Strictly sub-field-speed interval history rules out nontrivial self-hit roots on that interval, while super-field-speed curved history can open a repulsive channel. Whether that channel balances inward contributions on a retained branch is a simulation and proof question.
  - The scale-selection target is to derive a smallest sustainable orbital radius $d_0$ and fastest natural period $P_0$ from a retained balance, not to assume them from root onset.

---

#### Superposition with causal wake surfaces and $\eta$-regularization

- What we assume:
  - All wake contributions superpose linearly at the level of distributions (causal wake surfaces add).
  - We use a narrow Gaussian causal wake surface $\delta_\eta$ when continuous-time derivatives are needed.

- Why it matters:
  - Locality: inverse-square geometric weighting together with finite-speed branch selection makes nearby coherent roots dominant, but infinite populations still require an explicit cutoff, screening rule, cancellation estimate, sampled mean field, or principal-value/mean-field subtraction.
  - Bookkeeping: with $\delta_\eta$, delayed-history solvers can integrate smooth contributions; with $\delta$, the analysis can reason about impulses and events. Agreement in the $\eta\to0$ limit is a required convergence result, not an automatic property of the two representations.

---

#### Assembly Grammar to Candidate Braids and Flux Tubes

- What we assume:
  - Binary orbits are the base motif; binaries can occupy widely separated radii; a three-binary candidate is hypothesized to be dynamically robust, but this statement does not assign a taxonomy member.
  - Persistent axial structures and inter-assembly coupling are hypotheses to test on retained branch records.

- Why it matters:
  - The three-index geometry, one persistent index per binary, nominates a color-sector mapping, but an effective $\mathfrak{su}(3)$ algebra (the Lie algebra of the color gauge group of quantum chromodynamics, whose eight generators and commutation relations the mapping must reproduce at the effective level), confinement-facing transport, and absence of extra channels remain recovery burdens.
  - A flux-tube-like interpretation requires a retained geometric linkage and a benchmarked confinement observable; it is not established by the candidate picture.

---

#### Observer Charge Calibration

- What we assume:
  - The substrate carries primitive polarity magnitude $\epsilon$. The observer-level calibration target is $|e|=6\epsilon$, so quark electric-charge labels become integer multiples of $\epsilon$.

- Why it matters:
  - Observed quark fractions ($\pm1/3$ and $\pm2/3$ of $e$) become $\pm2\epsilon$ and $\pm4\epsilon$. This is a compact effective ledger convention; it does not derive the quark spectrum or gauge sector.

---

#### Candidate Consequences and Proof Burdens

- Stability without fine-tuned potentials:
  - Same-transmitter roots can add an outward channel. A retained operating point still requires net-acceleration balance, branch floors, and nonlinear stability; $\|\mathbf V\|=c_f$ alone is not a switch or a collapse-prevention theorem.
- Scale emergence:
  - $d_0$ and $P_0$ are branch-derived targets. They become physical scales only after a retained binary family establishes attraction/self-hit balance, stability, and regulator persistence.
- Shielding and apparent inertia:
  - Far-zone cancellation is a shielding diagnostic. Inertial response additionally requires a same-record external acceleration/gradient probe and cannot be inferred from a small wake signature alone.
- Magnetic-observable recovery:
  - Tangential delayed geometry nominates an effective magnetic-like mapping. The mapping remains open until retained assemblies reproduce declared observer-level observables without importing cross-product dynamics into the substrate.

---

#### What the model explicitly does not use

- No Lorentzian spacetime metric, the four-dimensional metric of relativity that combines time and space in one line element, at the fundamental level (the background is [absolute time](../../../../markdown/aaa/foundations/absolute-time.md) and the [Euclidean void](../../../../markdown/aaa/foundations/euclidean-void.md), the fixed flat spatial container; emergent cones are effective, not kinematic).
- No right-hand-rule magnetism or $\mathbf V\times\mathbf B$ acceleration term at the substrate level; every per-hit acceleration is along $\hat{\mathbf{r}}$.
- No gauge field inventory beyond architrino causal wakes; interaction carriers are the geometry of delayed causal wake surfaces and their couplings.

---

#### Validation and next steps (concrete)

1) Far-field cancellation and the zero-potential axis
- Compute the time-averaged multipole expansion of a high-frequency binary; show leading terms cancel along the rotation axis and decay rapidly off-axis. For an equal-radius opposite-polarity binary and a receiver at rest on the axis, the on-axis cancellation of the potential is exact at every instant, not only in leading order: every point of the orbit circle is at the same distance from an axis point, so both transmitters have the same emission time and the same transmitter-side factor $D_t=c_f$, and their contributions are equal and opposite.
- Observable: a “quiet line” (near-zero net potential) threading the binary. The line is quiet in potential and in orbit-averaged acceleration, not in instantaneous acceleration: on the axis the two per-hit accelerations point along different lines of action, and their sum is transverse, of magnitude $2\kappa\epsilon\lvert q_r\rvert a/(z^2+a^2)^{3/2}$ for orbit radius $a$, axial distance $z$, receiver polarity $q_r$, coupling $\kappa$, and $c_f=1$; it rotates with the binary, so its orbit average vanishes.

2) Scale selection for $d_0$ and $P_0$
- With $\delta\to\delta_\eta$, compute the mean inward radial acceleration from the partner versus the mean outward radial self-hit acceleration across one orbit; a radial fixed point nominates $d_0$ and the maximum orbital frequency $2\pi/P_0$ only when the tangential acceleration also vanishes at every instant of the circular candidate, as [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md#requirements-for-true-circular-orbit-working-hypothesis) requires; a radial balance with nonzero tangential drive is not a circular branch and defines no scale.
- Prediction: the same $d_0$ appears across binaries with the same $\kappa$, $\epsilon$, and $c_f$, independent of initial conditions after sufficient relaxation. All three inputs enter because the per-hit acceleration scales as $\kappa\epsilon^2/r^2$, so the only length the law supplies is $\kappa\epsilon^2/c_f^2$, which is $\kappa\epsilon^2$ in normalized units, and $d_0$ is a branch-determined multiple of it. The independence from initial conditions is a hypothesis under test, not a derived result: it fails if certified binary branches with the same three inputs settle at different radii, or if no mechanism carries the binary to a common branch, since the principal partner circular branch is anti-damped rather than dissipative.

3) Energy consistency across a same-transmitter root-onset window
- Use $\Phi_\eta$ to evaluate $U=q_r\Phi_\eta$ and test $\Delta E_k=-\Delta U$, with the explicit-time term stated above included, across a certified root-birth or fold window, a fold being a reception interval in which two causal roots meet at zero transmitter-side factor. A speed crossing $\|\mathbf V\|=c_f$ is not by itself that event. The $\eta\to0$ claim additionally requires stable transition metadata and weak convergence of the integrated work.

4) Numerical recipe (robust, minimal assumptions)
- For each reception time $T_r$: (i) root-find causal emission times $T_t$ for all transmitters (and self), (ii) discard non-physical roots: the coincident emission $T_t=T_r$ is excluded by the convention $H(0)=0$, and no accepted sharp root has $r=0$, because $r=c_f(T_r-T_t)$ makes $r=0$ that same excluded case; the direction $\hat{\mathbf r}$ is undefined there and receives no symmetry-cancellation contribution, so a positive separation approaching zero is handled by the declared core scale of the [numerical recipe](../../../../markdown/aaa/validation/simulations/action-energy/numerical-recipe-and-stability.md), not by symmetry, (iii) sum $\mathbf A_{o'\leftarrow o}(T_r;T_t)$, the per-hit acceleration of receiver $o'$ from transmitter $o$, over all transmitters and admitted roots, (iv) integrate velocity and position with an event-aware scheme. Use $\eta$-mollification for smooth integration when needed, in the finite-neighborhood form of the recipe rather than by evaluating the sharp root formula at broadened roots.

---

#### Comparisons and falsifiable edges

- Classical electromagnetism:
  - Recovery target: reproduce declared far-zone radiation observables from retained coherent assemblies, then test whether near-zone residuals differ near transmitter-side folds or admitted self-hit windows.
- QCD phenomenology:
  - Hypothesis: retained axial linkage supplies confinement-like behavior. It fails if the same branch record cannot reproduce the declared hadron reaction and energy-distribution benchmarks without per-channel retuning.
- Inertia/apparent mass:
  - Hypothesis: shielding may produce phase-dependent inertial response. It must be tested by applying the same external acceleration/gradient probe to independently prepared branch phases and is falsified if no reproducible phase dependence survives refinement.

---

#### Open Closure Questions

- Exact analytic forms for $d_0$ and $P_0$ in the symmetric binary with the canonical transmitter-side acceleration weight $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$.
- Rigorous conditions for uniqueness/multiplicity of causal roots in accelerated motion and their contribution to stability.
- Statistical mechanics of many-body wake structures: when and how do coherent, Lorentz-consistent effective cones emerge, cones whose speed is the same for every moving assembly at leading order, so that clocks and rulers deform in the way special relativity describes and no preferred frame is detectable at that order, from moving-assembly deformation, clock/ruler retuning, and the response of the Noether sea, the ambient population of neutral assemblies that fills the void, and with what characteristic speed, the dressed channel speed $c_{\mathrm{eff}}$, relative to the primitive wake speed $c_f$?

Radial hits, causal delay, constant per-wavefront amplitude, and admitted self-hit roots define the simulation mechanism. Stable branches, natural scales, inertial response, and magnetic-like observables are results that the mechanism must still earn.

---

#### Effective observables and states (quantum-like layer)

Premise: single-hit information is sparse. At an instant, the receiver-local dynamical datum is the signed acceleration vector $\mathbf A$. That vector fixes the net acceleration direction but not the transmitter ray and polarity assignment: attraction from one ray and repulsion from the opposite ray can produce the same $\mathbf A$. The corresponding unoriented axis is therefore an inference quotient over transmitter hypotheses, not the raw received datum. The $\mathbb{U}_{\text{now}}$ universe-state perspective, the complete state of every architrino on one absolute-time slice, can include the full transmitter-tagged emission ledger as complete-state bookkeeping, but a local receiver or Physical Observer, an assembly inside the Noether sea whose detectors are themselves dynamical outputs, cannot infer that hidden ledger from a single hit.

- Emission ledger (microstate): the provenance ledger of the arriving hits, the set of tuples $(T_t,\mathbf X_j(T_t),\mathbf V_j(T_t),q_j)$ of emission time, emission position, transmitter velocity at emission, and polarity over all transmitters $j$ that causally affect the receiver; it is bookkeeping read off the path-history record, not a separate content carried by the wake.
- Observational map: ledgers map to histories of receiver-local acceleration vectors $\{\mathbf A(T_k)\}$ across one or more receivers and over time.
- Observational equivalence: two ledgers are equivalent if they induce indistinguishable hit histories at the chosen resolution (including mollifier width $\eta$, temporal sampling, and receiver geometry).

- Coarse-grained PDE observables (Method 1, the whole-field grid method of the [Action Model](../../../../markdown/aaa/validation/simulations/action-energy/action-model.md#cross-method-selection), whose symbols are used here):
  - Number density $n(\mathbf X,T)$: count-per-volume of architrinos; in this coarse-grained use it is distinct from the canonical normalized Noether sea density that the mathematics terminology also writes $n$.
  - Polarity density $\rho(\mathbf X,T)$: net polarity per unit volume, counting $+\epsilon$ for each positrino and $-\epsilon$ for each electrino; natural source term in continuum PDE variants, and distinct from the causal wake surface distribution that the mathematics style guide writes $\rho$.
  - Energy density $\mathcal{E}(\mathbf X,T)$: a declared assembly-level or diagnostic energy channel for validation and conservation checks; it is not primitive architrino mass-energy.
  - Use: these fields are the natural inputs/targets for grid-based PDE runs and for validating event-driven simulations in aggregate.

Observability axioms:
- A1 A single-hit receiver record contains $\mathbf A$. Its magnitude and direction are observable, but transmitter identity, transmitter ray, polarity assignment, distance $r$, and transmitter speed $\|\mathbf{V}_t\|$ are not individually recoverable at an instant. Quotienting the opposite-ray/opposite-polarity hypotheses produces an unoriented inference axis $L$.
- A2 All practical observables are functionals of hit histories across time and receivers; unique micro inversion is generically impossible.
- A3 An effective “state” is a probability measure over observationally equivalent ledger classes, updated as new hits arrive.

Bayesian operational stance:
- State update = conditioning on new hit histories; active interventions (changing receiver geometry/filters) alter future histories and thus the posterior over ledger classes.

A receiver never sees the full transmitter ledger; it sees only a time series of acceleration vectors. The appropriate description is therefore statistical over transmitter and polarity histories that fit those vectors.

---

#### $\mathbb{U}_{\text{now}}$ Note: Limits of Perfect Clocks and Frames

Absolute time and Euclidean frames remove coordinate ambiguity (synchronization and alignment) but not physical ambiguity:
- Sign/side ambiguity: for a receiver of polarity $-\epsilon$, attraction from $+\epsilon$ on one side versus repulsion from $-\epsilon$ on the opposite side along the same line remain indistinguishable at an instant; for a receiver of polarity $+\epsilon$ the two species exchange roles.
- Baseline distance scaling and branch geometry: $\|\mathbf A\|\propto W^{\mathrm{acc}}/r^2$; transmitter motion sets $D_t$ and the arriving acceleration weight, while receiver motion enters root playback through $D_r/D_t$ and changes future geometry.
- Collinear superposition: several transmitters on the two rays of one inference axis can sum to the same instantaneous $\mathbf A$.
- Self-hit aliasing: self-intersections can mimic external transmitters along $L$.
- Surrogate location recast: any instantaneous hit may be recast to a stationary surrogate transmitter placed somewhere along $L$ with an adjusted emission time; useful for inference and visualization, but it does not resolve the sign/side ambiguity or fix distance without temporal data.

Consequence: embedded observers and synthetic detector records must reason statistically over ledger classes. The $\mathbb{U}_{\text{now}}$ universe-state perspective can compare those classes against the complete ledger, but the observer-accessible data remain many-to-one; “quantum-like” observability is not a contradiction but a necessity.

---

#### Single-transmitter multi-hit nuance vs universal superposition

Even for a single transmitter, the receiver cannot be sure that a given acceleration did not come from multiple distinct emission times $T_t\in\mathcal{C}_{r\leftarrow t}(T_r)$ on that same transmitter, where $\mathcal{C}_{r\leftarrow t}(T_r)$ is the causal set of emission times of transmitter $t$ whose wakes reach receiver $r$ at $T_r$, the set written $\mathcal{C}_{aa}(T_r)$ above when transmitter and receiver are the same architrino. When the transmitter has a super-field-speed history interval or its trajectory curves, several roots of $r=c_f(T_r-T_t)$ can occur and arrive in close succession along one acceleration axis, contributing separate per-hit accelerations whose emission-time origins are not recoverable from the net vector alone.

However, this is not the dominant practical difficulty. The governing issue is global superposition: at any instant the net acceleration is the linear sum of contributions from all architrinos in the universe whose causal wake surfaces intersect the receiver now. While inverse-square surface dilution and transmitter-side acceleration weight usually make nearby transmitters dominate, the mapping from the universal emission ledger to observed hit histories remains vastly many-to-one. Consequently, inference must be temporal, statistical, and multi-view, not a frame-perfect instantaneous inversion.

---

#### Operational noncommutativity and contextuality (emergent)

Measurement procedures are interventions that condition future hit histories:
- Let $F,G$ be experimental contexts (e.g., planar-mode analyzers, path blockers, timing gates), where a planar mode is the coaxial contra-rotating polarity-conjugate planar pair proposed as the photon carrier in [Electroweak Bosons](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md#photon-referent-status), a referent whose acceleration-balance closure remains open. Because they modify trajectories and thus the set of future causal roots, their composition generally satisfies $F\circ G\ne G\circ F$ at the level of observed statistics.
- Contextuality: the distribution over ledger classes that best explains data depends on which filters were applied and in what order; the outcomes are context-dependent without invoking microscopic cross-product acceleration terms.

A present intervention changes which acceleration contributions will be recorded later; applying $F$ and then $G$ is therefore not generally equivalent to applying $G$ and then $F$.

---

#### Planar-Mode Interference Closure Target

Linear wake superposition nominates, but does not derive, an effective complex-amplitude description:
- A detector map must define how transmitter-tagged path histories become a complex $A_{\mathrm{mode}}$ over a declared aperture and time window.
- The Born-like target is to derive an intensity proportional to $|A_{\mathrm{mode}}|^2$ from that detector map and an independently specified ensemble measure.
- The polarization target is to recover Malus’s $\cos^2\theta$ benchmark, the observer-level law that the intensity transmitted by an ideal polarization analyzer varies as the squared cosine of the angle $\theta$ between the analyzer axis and the incident polarization, from a retained planar-mode and analyzer interaction record. Geometric projection alone is implementation scaffolding until the record-forming dynamics supply the measure.

Planar-mode overlap supplies a candidate geometry for interference, while the amplitude-squared measure and analyzer statistics remain explicit recovery tests.

---

#### Reconstruction Under Information Bounds

Instantaneous inversion is ill-posed; reconstruction is temporal, multi-view, and prior-guided:
- Multi-receiver geometry: use separated receivers to triangulate unoriented lines at the same $T$; intersecting rays yield two-sided candidate loci.
- Time-series constraints: track $L(T)$ and timing-derived $r(T)$ proxies; curvature and rotation of $L$ constrain transmitter paths.
- Active probing: vary receiver motion/filters to sample different roots and break degeneracies.
- Priors: charge inventories, speed bounds, assembly templates (e.g., binaries, planar-mode statistics) shrink the hypothesis space.
- Estimation: run Bayesian filters or particle sets over ledger classes; update with each hit; report identifiability and uncertainty, not single-point transmitters.

---

#### Worked micro-to-effective examples

- Two-planar-mode interference:
  - Setup: two coherent photon planar modes reach a screen. Their geometric overlap and path-history phase define a candidate complex-amplitude map. An observed intensity proportional to its squared norm is obtained only if the independently specified detector and ensemble record passes the Born-like closure residual above.
  - Which-way intervention: inserting a context that disrupts one planar mode's coherence changes the ledger classes and removes the overlap term, flattening the pattern.

- Polarization analyzer:
  - The analyzer projects the planar mode's transverse ledger onto its axis. Geometric projection supplies the candidate $\cos\theta$ amplitude factor; transmission $\propto\cos^2\theta$ remains a recovery result that requires the same record-forming measure and analyzer residual used by the polarization target above.

- Sequential filters (order matters):
  - Two non-parallel analyzers $F(\theta_1)$ and $G(\theta_2)$ applied in different orders yield different transmitted patterns because they recondition future causal roots differently: $F\circ G \ne G\circ F$.

---

#### Falsifiable edges and tests (observability-focused)

- Context order test: demonstrate order-dependent transmission with sequential analyzers on coherent planar modes; quantify the asymmetry $F\circ G$ vs. $G\circ F$.
- Planar-mode interference robustness: map how partial decoherence (deliberate jitter in transmitter paths) suppresses the overlap term; compare to predicted $|A_{\mathrm{mode}}|^2$ decay with coherence length.
- Multi-receiver triangulation under ambiguity: show that two-sided localization from unoriented lines plus time series reduces, but does not eliminate, sign/side and distance–speed degeneracies—matching the limits stated under [Reconstruction Under Information Bounds](#reconstruction-under-information-bounds).
- Bell-type correlation target (open): assess whether planar-mode phase models with absolute time can reproduce observed $\cos(2\theta)$ correlations across separated analyzers without hidden cross-product acceleration terms; treat Tsirelson-like bounds as a stringent benchmark. Bell-type experiments correlate analyzer outcomes at two separated stations; the tested quantum prediction for polarization-correlated pairs varies with the relative analyzer angle as $\cos(2\theta)$, Bell inequalities bound what any account with settings independent of the hidden state and a factorizable local response can produce, and the Tsirelson bound is the largest violation quantum theory allows. Absolute time and a finite wake speed do not by themselves evade the theorem: a candidate must name the Bell hypothesis that its record-forming dynamics fail, and the route the corpus selects rejects factorizability through a $c_f$-mediated coordination channel while keeping measurement independence and observer-level no-signaling, as [No-Go Theorems](../../../../markdown/aaa/validation/no-go-theorems.md#applicability-map) and the [Bell nonlocality placement](../../../../markdown/aaa/foundations/ontology.md#bell-nonlocality-placement) state; the [Bell-family record-measure harness](../../../../markdown/aaa/validation/simulations/bell-family-record-measure.md) supplies the residuals such a candidate must pass.

Together these tests check order effects, the weakening of interference under disrupted coherence, and the information gained from multiple receivers. Reproducing quantum correlations is the most demanding target and remains explicitly open.

### README

This chapter indexes the simulation protocols of the [validation program](../../../../markdown/aaa/validation/validation-protocols.md). A simulation in this directory is a numerical integration of the [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md), the delayed acceleration law under which each [architrino](../../../../markdown/aaa/foundations/architrino.md), a point transceiver of fixed polarity, is accelerated only by the causal wakes, the expanding disturbances emitted from past positions of itself and of other architrinos, that arrive at it at the current instant. The protocols state how such a run is set up, logged, refined, and compared, and what a run can establish: a result is evidence only against the independent reference its protocol names, such as a closed-form baseline, a refinement-ladder convergence test, or an observer-level benchmark, and agreement of a run with its own earlier output or with a replay establishes repeatability, not correctness. No entry below is itself a physical acceptance; each protocol carries its own acceptance conditions and claim grades. The simulation protocols share an [absolute-frame](../../../../markdown/aaa/foundations/constructing-the-absolute-frame.md) execution model, meaning fixed Euclidean coordinates and one universal time, together with a virtual $\mathbb{U}_{\text{now}}$ universe-state perspective, a bookkeeping view of the complete modeled state at one absolute time that no physical observer holds, and a strict separation between raw microstate logs and detector-level synthetic observables. The protocols are grouped by responsibility:

- common execution and interpretation: [Simulation Run Protocols](../../../../markdown/aaa/validation/simulations/run-protocols.md), [Convergence Tests for Non-Markovian Dynamics](../../../../markdown/aaa/validation/simulations/convergence-tests.md), [Architrino Simulation Tests](../../../../markdown/aaa/validation/simulations/architrino.md), and [Simulation Perspective and Closure Targets](../../../../markdown/aaa/validation/simulations/perspective.md);
- detector-facing and statistical outputs: [Synthetic Observables and $\mathbb{U}_{\text{now}}$ Logging](../../../../markdown/aaa/validation/simulations/synthetic-observables.md), [Bell-Family Record-Measure Harness](../../../../markdown/aaa/validation/simulations/bell-family-record-measure.md), and [Thermodynamic Residual](../../../../markdown/aaa/validation/simulations/thermodynamic-residual.md);
- protocols and toy models toward mass-map and action closure targets: [$A_0$ Branch Certificate Protocol](../../../../markdown/aaa/validation/simulations/a0-branch-certificate-protocol.md), [$A_0$ Tier 0 Result Interpretation: Reduced Branch Search](../../../../markdown/aaa/validation/simulations/a0-tier0-result-interpretation.md), [Coincident-Midpoint Orthogonal-Axis Action-Increment Protocol](../../../../markdown/aaa/validation/simulations/coincident-midpoint-orthogonal-axis-action-increment-protocol.md), [Retuning-Map Toy Model](../../../../markdown/aaa/validation/simulations/retuning-map-toy-model.md), and the [Action Model Comparison](../../../../markdown/aaa/validation/simulations/action-energy/action-model.md) with its [sibling derivation notes](../../../../markdown/aaa/validation/simulations/action-energy/action-model.md#sibling-derivation-notes);
- cosmology and response scaffolds: [Cosmology Shared Residual Fit Protocol](../../../../markdown/aaa/validation/simulations/cosmology-shared-residual-fit.md), [Redshift-Budget Toy Model](../../../../markdown/aaa/validation/simulations/redshift-budget-toy-model.md), [Static Response Vector Toy Model](../../../../markdown/aaa/validation/simulations/static-response-vector-toy-model.md), and [Hydrogen $\Gamma_N$ Spectral Coefficient Row Toy Scan](../../../../markdown/aaa/validation/simulations/hydrogen-gamma-n-spectral-row-toy-scan.md).

#### Simulation Frame and the $\mathbb{U}_{\text{now}}$ Universe-State Perspective

All simulations are implemented in the absolute frame:

- **Spatial frame:** fixed Cartesian grid in the [Euclidean void](../../../../markdown/aaa/foundations/euclidean-void.md), the flat and unmoving spatial container, with $(X,Y,Z)$ constant in time; a grid address is a chart label for a point of the void, not a structure in it.
- **Temporal frame:** global absolute time $T$, advanced in discrete steps $\Delta T$.
- **Microdynamics:** architrino positions and velocities updated according to the Master Equation; causal wakes, which carry the potential each architrino emits, propagate at the wake speed $c_f$, normalized to $c_f=1$ in every numerical run.

The simulator occupies the **$\mathbb{U}_{\text{now}}$ universe-state perspective**:

- It records the complete modeled state $S(T)$, meaning the position, velocity, polarity, and retained path history of every modeled architrino and assembly, at each time step.
- It computes the superposed wake potential $\Phi$, its gradient $\nabla\Phi$, and the [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md) state, the ambient assembly medium that occupies the void, anywhere in the declared domain.

To connect to experiment:

- Embed **model detectors**, represented by the worldlines of assemblies (bound configurations of architrinos), in this frame.
- Compute the wake potential and gradient they experience along their paths, their derived clock time $\tau$, the readout of a physical clock, relative to $T$, and the arrival times, redshifts, and intensity patterns they register.
- Synthetic observables are derived from these detector responses, not from raw $S(T)$ directly.

This enforces a clean separation between:

- Fundamental dynamics in the absolute frame (what the simulation integrates),
- Emergent observational physics (what real experiments would see).

#### Simulation Scope Envelope

A simulation is a bounded experiment on the model, not a complete copy of $\mathbb{U}_{\text{now}}$. Every run should declare its scope before outputs are interpreted:

- spatial domain and boundary conditions;
- absolute-time span, $\Delta T$, and retained history depth;
- entity count, assembly inventory, and Noether sea initialization;
- spatial, temporal, and path-history resolution ladders;
- logged $\mathbb{U}_{\text{now}}$ channels and detector-synthetic channels;
- runtime-rate or cost budget when feasible replay matters;
- feedback or intervention mode, including whether the run is passive replay, diagnostic probing, controlled perturbation, or detector post-processing.

Near-threshold events need a margin report. If an unresolved perturbation, sampling choice, or detector context can flip a reaction, branch, or record classification, the simulation should report the threshold margin and alternate-outcome band. In $\mathbb{A}\mathbb{A}\mathbb{A}$ this is not substrate randomness; it is unresolved state sensitivity inside a deterministic causal-history model.

#### Path-History Provenance

Path-history provenance lets a simulation record support replay and audit, not merely trajectory display. A provenance-rich run keeps stable identities for modeled architrinos and assemblies, authoritative path segments for position and velocity, causal-root records, delayed transmitter-state records, assembly-membership intervals, and reaction or record-forming event references. Those records let a later audit ask which transmitter history, emitted causal wake, receiver state, Noether sea context, and outgoing assembly record produced a synthetic observation.

This does not make the simulator a physical observer and does not require unbounded storage of $\mathbb{U}_{\text{now}}$. The scope envelope decides how much provenance is retained, at what resolution, for which entities, and under which replay or compression authority. Full path retention is valuable only where it changes the scientific claim: reaction balancing, branch replay, process demographics, detector-synthetic output, or failure analysis.

### Run Protocols

The mandatory runtime protocol standardizes the [absolute frame](../../../../markdown/aaa/foundations/constructing-the-absolute-frame.md)—fixed Euclidean coordinates governed by one universal time—together with logging requirements, provenance bookkeeping, metadata, and acceptance gates so that results from different simulations can be compared and audited coherently. The simulated objects are [architrinos](../../../../markdown/aaa/foundations/architrino.md), point transceivers of fixed polarity; each past position of an architrino emits a causal wake, an expanding disturbance that travels outward at the wake speed $c_f$, and a receiver is accelerated at a reception time only by the wakes that arrive exactly then, at the causal roots found by solving the delay condition of the [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md) in stored history. A run therefore carries its own past: every acceleration depends on retained worldline history, and in the [self-hit](../../../../markdown/aaa/dynamics/master-equation.md#self-hit-condition) regime an architrino meets its own earlier wake. The protocol exists so that this history, and every root solved against it, is recorded well enough to be audited.

#### Master Simulation Protocol (Absolute Frame)

1. **Coordinate Anchor**: All simulations run on a fixed Cartesian grid chosen as the coordinate scaffold for the Euclidean void. `Grid[x][y][z]` is a chart address, not an intrinsic label in the void. The grid is the chart and the sensor and cache scaffold; architrino worldlines are integrated as continuous paths in that chart and are not confined to grid nodes, and the authoritative record of a run is its retained worldline history, as [Architrino Simulation Tests](../../../../markdown/aaa/validation/simulations/architrino.md#grid-based-history) requires.
2. **Clock Rate**: The simulator uses a global `Time` counter for absolute time $T$. No relativistic scaling is applied to the integration step itself: the step is not rescaled by the motion of any assembly or by an observer clock, because clock-rate effects are outputs read from assembly records against $T$, not inputs to the integration.
3. **$\mathbb{U}_{\text{now}}$ universe-state interface**: $\mathbb{U}_{\text{now}}\equiv S(T)$ is the complete state of the simulated universe on one absolute-time slice, including every architrino's position, velocity, polarity, and retained path history. Every run must instantiate an array of fixed virtual sensors to log $\Phi$ and $\nabla\Phi$ at declared absolute-frame grid addresses. The sensors read $\mathbb{U}_{\text{now}}$ directly and are simulation instruments, not physical observers. Here $\Phi$ is the mollified bookkeeping potential reconstructed from the superposed causal wakes of the run at its declared regularization width, and $\nabla\Phi$ is its spatial gradient; both are evaluation channels for comparison, while the substrate law remains the per-hit acceleration of the Master Equation.
4. **Noether sea Initialization**: A run that claims Noether sea response must declare its initialized braid inventory, branch status, and constitutive variables. A lattice of prescribed braid records is a model input, not evidence that those records form a retained Noether sea.
5. **Convergence**: $\Delta T$ refinement must be accompanied by history-resolution refinement: the time step and the history-sampling step are halved together, with the root residual and root-time tolerances tightened so that the certified root-time error stays below the reception step, while the retained-history horizon, the regulators, and the observation window are held fixed, in the order the [numerical recipe](../../../../markdown/aaa/validation/simulations/action-energy/numerical-recipe-and-stability.md) prescribes. A delayed root is solved against stored transmitter history, so refining the step alone leaves the interpolation error of that history untouched, and a self-hit calculation whose emission-time error is not refined with the step cannot report a converged root. Joint refinement is a necessary condition for a convergence claim, checked by the ladders of [Convergence Tests](../../../../markdown/aaa/validation/simulations/convergence-tests.md); it is not a stability guarantee for the chosen integrator.
6. **Scope Envelope**: Every campaign declares the bounded simulation envelope: spatial domain, absolute-time span, entity count, resolution ladder, history depth, output channels, runtime-rate or cost budget, feedback or intervention mode, and threshold-event policy.
7. **Campaign Packet**: Any run used for a proof certificate, branch-certificate gate, or promoted validation claim must emit a machine-checkable packet rather than only plots or summaries.

The scope envelope is metadata for the existing campaign packet, not a separate gate family. It prevents a $\mathbb{U}_{\text{now}}$ run from being read as unlimited computation, unlimited observation, or unlimited control. A numerical result is valid only for the declared scale, resolution, feedback path, and observer layer.

#### Simulation Campaign Object

Every promoted numerical claim is carried by a campaign object, not by an isolated plot or best-fit table:
$$
\mathcal{C}_{\mathrm{sim}}
=
\big(
\mathsf{id},
S_\eta,
\mathcal{G}_{\mathrm{mesh}},
\Delta T,
\eta,
I_{\Delta H_{\mathrm{hist}}}^q,
\mathcal{L}_{\mathrm{root}},
\mathcal{T}_{\eta},
\mathcal{R}_{\mathrm{branch}},
\Pi_{\mathbb{U}_{\text{now}}},
\mathcal{E}_{\mathrm{conv}},
\mathcal{F}
\big)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5f180b89feee6f9e)

Here $\mathsf{id}$ fixes the run identifier and source commit, $S_\eta$ is the state history of the run evolved at regularization width $\eta$, the subscript recording that width rather than any smoothing of the state itself, $\mathcal{G}_{\mathrm{mesh}}$ is the spatial and history mesh, $\Delta T$ is the absolute-time step, $\eta > 0$ is the causal-wake regularization width, $I_{\Delta H_{\mathrm{hist}}}^q$ is the declared order-$q$ history interpolation operator, which reconstructs stored transmitter history at any emission time from samples spaced $\Delta H_{\mathrm{hist}}$ apart using a polynomial of degree $q$, $\mathcal{L}_{\mathrm{root}}$ is the causal-root ledger, the record of which causal roots are active for each receiver, $\mathcal{T}_{\eta}$ is the transition-record family for fold-layer, separator, or active-root status windows, meaning reception windows in which a causal root is born, lost, or changes status, whether at a fold, where two causal roots meet at zero transmitter-side derivative, or at a separator crossing, where the branch chart's active-root ledger changes, $\mathcal{R}_{\mathrm{branch}}$ is the named branch-residual vector, $\Pi_{\mathbb{U}_{\text{now}}}$ is the provenance log, $\mathcal{E}_{\mathrm{conv}}$ is the convergence-measure vector, and $\mathcal{F}$ is the finite failure-code set.

When a campaign is used for a continuum, field-theory, or regulator-removal claim, it must also attach an extraction map: the regulated observables, test windows, volume or window trajectory when relevant, normalization and mixing rules, convergence topology, positivity or reconstruction condition when applicable, and the artifact hashes for the regulator ladder. If independent methods or benchmarks are used, the packet must expose their normalization conventions and error envelopes before comparing coordinates. These fields tell reviewers exactly what is claimed to survive the finite run and what remains only a regulator-level diagnostic.

For a QFT-like reconstruction claim, the campaign must also state the presentation being targeted, such as Wightman data, Osterwalder-Schrader data, a local observable net, or a weaker named comparison; the first two name theorems that recover a quantum field theory from correlation functions satisfying a stated list of conditions, and [Convergence Tests](../../../../markdown/aaa/validation/simulations/convergence-tests.md#machine-checkable-convergence-output) lists the package such a claim must borrow. The packet must then list the hypotheses required by that presentation rather than using generic terms such as `continuum field` or `reconstructed field`.

The state history is
$$
S_\eta(T)
=
\{(\mathbf X_i(T),\mathbf V_i(T),q_i)\}_{i=1}^{N},
\qquad
S_{\eta,T}(\theta)=S_\eta(T+\theta),\quad \theta\in[-H_{\mathrm{hist}},0]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2fcf7a56df428c35)

Here $S_\eta(T)$ collects the position $\mathbf X_i(T)$, velocity $\mathbf V_i(T)$, and polarity $q_i$ of each of the $N$ architrinos, and $S_{\eta,T}$ is the history segment that the delayed problem needs at time $T$: the same state read back over the retained interval of length $H_{\mathrm{hist}}$ behind $T$. Tier 0 and Tier 1 name the first two stages of the [$A_0$ Branch Certificate Protocol](../../../../markdown/aaa/validation/simulations/a0-branch-certificate-protocol.md): a Tier 0 packet records a reduced algebraic branch search that emits candidate rows, and a Tier 1 packet records a delayed-dynamics continuation run at $\eta>0$. A Tier 1 packet must state whether this history is evaluated in $C^1([-H_{\mathrm{hist}},0])$, $W^{1,\infty}([-H_{\mathrm{hist}},0])$, or a stricter history class. The first class holds histories whose position is continuously differentiable, so the velocity is continuous; the second holds histories whose position is Lipschitz, so the velocity is bounded but may jump. The class matters because the transmitter-side factor $D_t=c_f-\hat{\mathbf r}_t\cdot\mathbf V_t(T_t)$ at a causal root is evaluated from the velocity at the emission time: in the first class it has one value at every root, while in the second a root that falls at a velocity jump has no single value and must be treated as an event. Here $H_{\mathrm{hist}}>0$ is the retained-history horizon; it is distinct from the observer-level Planck benchmark $h$. A missing history class is an incomplete artifact, because the delayed transmitter-state evaluation cannot be audited without it.

The mesh and interpolation record is
$$
\mathcal{G}_{\mathrm{mesh}}=(\Omega_{\mathrm{sim}},\Delta X,\{\mathbf X_k\}_{k=1}^{K},\Theta_{\mathrm{hist}},\Delta H_{\mathrm{hist}},\mathsf{bc})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f8987fe2240989d2)

where $\Omega_{\mathrm{sim}}\subset\mathbb{R}^3$ is the Euclidean-void computational domain, $\Delta X$ is the spacing of the fixed Cartesian grid, $\{\mathbf X_k\}$ are the fixed $\mathbb{U}_{\text{now}}$ sample points, $\Theta_{\mathrm{hist}}\subset[-H_{\mathrm{hist}},0]$ is the stored path-history mesh, $\Delta H_{\mathrm{hist}}$ is the history resolution, and $\mathsf{bc}$ records boundary conditions. The interpolation operator $I_{\Delta H_{\mathrm{hist}}}^q$ is part of the packet; delayed transmitter states cannot be reconstructed by an implicit or undocumented lookup rule.

The path-history part of $\mathcal{G}_{\mathrm{mesh}}$ and $\Pi_{\mathbb{U}_{\text{now}}}$ should distinguish authoritative kinematic segments from attached audit rows. Authoritative segments reconstruct $\mathbf X_i(T)$ and $\mathbf V_i(T)$ over declared intervals with error bounds. Causal-root rows, delayed transmitter-state rows, assembly-membership intervals, reaction-event references, and display projections attach to those segments by identifier and time range. Chunking, compression, and broad-phase indices are allowed as storage or acceleration layers; they do not replace authoritative replay when a promoted claim depends on provenance.

#### Executable Diagnostic Contract

A campaign that disciplines a proof certificate must reduce its numerical status to predeclared scalar diagnostics. The default diagnostic vector is
$$
\mathcal{D}_{\mathrm{exec}}
=
\big(
D_{\mathrm{branch}},
D_{\mathrm{ref}},
D_{\mathrm{ord}},
D_{\mathrm{hist}},
D_{\mathrm{space}},
D_{\mathrm{cross}},
D_{\mathrm{prov}},
D_{\mathrm{cons}},
D_{\eta},
D_{\mathrm{jump}}
\big)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e6033146454ef60f)

where every component is a ratio with passing threshold $1$: each residual is divided by the tolerance declared for it before the run, so that a value at or below $1$ passes. The refinement, history, spatial, cross-integrator, and provenance components are built from the comparison metrics $E_{\mathrm{rel}}$, $D_W$, $D_{JS}$, and $E_{\mathrm{hist}}$ of [Convergence Tests](../../../../markdown/aaa/validation/simulations/convergence-tests.md#comparison-metrics-required) divided by their declared thresholds. The observed-order gate is the one component whose raw quantity must be large rather than small; its ratio is the required order divided by the observed order $p_{\mathrm{obs}}$, so that a higher observed order passes. The conservation gate uses the drifts constructed as in [Delay Dynamics Energy](../../../../markdown/aaa/validation/simulations/action-energy/delay-dynamics-energy.md) with the same regulator, retained branches, and window-boundary account as the motion. The component meanings are:

| Component | Required role |
| --- | --- |
| $D_{\mathrm{branch}}$ | largest branch residual divided by its declared tolerance |
| $D_{\mathrm{ref}}$ | temporal refinement residual for $\Phi$, $\|\nabla\Phi\|$, and self-hit rate |
| $D_{\mathrm{ord}}$ | observed-order gate for the retained primary potential channel, $\Phi$ or $\|\nabla\Phi\|$ |
| $D_{\mathrm{hist}}$ | history-resolution, interpolation, and provenance-distribution gate |
| $D_{\mathrm{space}}$ | spatial refinement and self-hit stability-window gate |
| $D_{\mathrm{cross}}$ | cross-integrator agreement with matching branch identity |
| $D_{\mathrm{prov}}$ | $\mathbb{U}_{\text{now}}$ causal-provenance residual |
| $D_{\mathrm{cons}}$ | energy, momentum, and angular-momentum drift gate |
| $D_{\eta}$ | regulator-dependence gate for promoted observables |
| $D_{\mathrm{jump}}$ | jump or branch-transition residual for nonsmooth windows |

The Tier 1 acceptance predicate is
$$
\mathsf{Accept}_1(\mathcal{C}_{\mathrm{sim}})
\Longleftrightarrow
R_0\in\mathsf{Candidate}_{1},
\quad
\max_{D\in\mathcal{D}_{\mathrm{exec}}}D\le 1,
\quad
\Delta_{\mathrm{root}}(\Delta T,\Delta T/2)=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d554ab86f5f9ce0f)

$$
\Delta_{\mathrm{root}}(\Delta H_{\mathrm{hist}},\Delta H_{\mathrm{hist}}/2)=0,
\quad
\Delta_{\eta,\mathrm{root}}=0,
\quad
\mathsf{NullFail}=1,
\quad
\mathsf{Artifacts}=1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0e40a08d19729731)

Here $R_0\in\mathsf{Candidate}_1$ means the Tier 0 packet carries the declared value `failure_code: "candidate"` in its `failure_codes.md` and passes its `tier0_continuation` gate, which is the Tier 0 pass condition of the [$A_0$ Branch Certificate Protocol](../../../../markdown/aaa/validation/simulations/a0-branch-certificate-protocol.md): at least one candidate row with a finite causal-root ledger, nondegenerate quotient coordinates, retained scale separation, correct speed ordering, bounded carrier residuals, no unclassified separator term, and a complete residual surface. For two runs $A,B$, $\Delta_{\mathrm{root}}(A,B)$ is the number of unmatched active-root records after matching receiver, transmitter, root class, branch label, and transition status, the comparison being made on the coarser run's reception samples with the finer run restricted to that grid, as the comparison metrics of Convergence Tests restrict a finer run. The regulator version $\Delta_{\eta,\mathrm{root}}$ applies the same matching rule between adjacent $\eta$ values. Thus a zero value means identity-preserving root agreement, not merely equal root counts; a root whose status changes inside the window is compared through its transition record and the jump component $D_{\mathrm{jump}}$, not by demanding that its birth or loss fall on the same sample in both runs. Finally, $\mathsf{NullFail}=1$ means the negative control violates at least one required null-test margin, and $\mathsf{Artifacts}=1$ means every required artifact exists with a content hash and source commit.

Failure routing is deterministic. Missing required artifacts, source commits, pre-run tolerances, or hashes route to $\mathsf{artifact\_incomplete}$. Changing a promoted observable, tolerance, branch label, or regulator ladder after output inspection routes to $\mathsf{hidden\_tuning}$. Unstable active-root identity routes to $\mathsf{branch\_root\_instability}$; failed refinement routes to $\mathsf{mesh\_nonconvergence}$; failed provenance routes to $\mathsf{provenance\_discontinuity}$; failed conservation routes to $\mathsf{conservation\_drift}$; failed regulator rows route to $\mathsf{regulator\_dependence}$; and exit from the admissible $\eta$ continuation set routes to $\mathsf{eta\_continuation\_failure}$.

#### Proof-Certificate Handoff

The proof-to-simulation handoff for a finite certificate is
$$
\mathsf{H}_{\mathrm{proof}\to\mathrm{sim}}
=
\big(
\mathsf{certificate\_id},
S_{\eta,0},
W,
\Lambda,
\mathcal{L}_{\mathrm{root}}^{\mathrm{expected}},
\tau_{\mathrm{branch}},
\tau_{\mathrm{conv}},
\tau_{\eta},
\mathsf{Null},
\mathsf{Outputs}
\big)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b00aeecb82963742)

It names the source certificate, initial history $S_{\eta,0}$, analysis window $W$, branch label $\Lambda$, expected active-root classes, branch tolerances $\tau_{\mathrm{branch}}$, convergence tolerances $\tau_{\mathrm{conv}}$, regulator-dependence tolerances $\tau_{\eta}$, one tolerance $\tau_{\eta,Y}$ for each promoted observable $Y$ compared across the declared regulator ladder, negative-control mutation, and required output channels before the run starts.

The simulation-to-proof handoff is
$$
\mathsf{H}_{\mathrm{sim}\to\mathrm{proof}}
=
\big(
\mathsf{artifact\_hashes},
\mathcal{L}_{\mathrm{root}}^{\mathrm{matched}},
\mathcal{T}_{\eta},
\mathcal{R}_{\mathrm{branch}},
\mathcal{E}_{\mathrm{conv}},
\mathcal{D}_{\mathrm{exec}},
\mathsf{failure\_code},
\mathsf{promotion\_status}
\big)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-88f09a895086b857)

A proof packet may cite a simulation only through this handoff. It must state whether every expected active root was matched under $\Delta T$, $\Delta H_{\mathrm{hist}}$, and $\eta$ refinement, which residual component controls the verdict, and which artifact contains each value.

**Lemma (simulation-promotion criterion).** Let $Q$ be a theory claim whose variables are contained in $\mathcal{C}_{\mathrm{sim}}$, and let $R_1$ be a Tier 1 continuation of a Tier 0 candidate $R_0$. If $R_0$ satisfies the Tier 0 acceptance criteria, $R_1$ satisfies the Tier 1 acceptance criteria, the negative control fails as required, and
$$
\max_a\frac{\mathcal{E}_{\mathrm{ref},a}}{\tau_{\mathrm{ref},a}}\le 1,
\qquad
\max_a\frac{\mathcal{E}_{\mathrm{prov},a}}{\tau_{\mathrm{prov},a}}\le 1,
\qquad
\max_a\frac{\mathcal{E}_{\mathrm{cons},a}}{\tau_{\mathrm{cons},a}}\le 1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c243717f0feffac2)

$$
\max_a\frac{\mathcal{R}_{\mathrm{branch},a}}{\tau_{\mathrm{branch},a}}\le 1,
\qquad
\max_Y\frac{E_\eta(Y)}{\tau_{\eta,Y}}\le 1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-909e0ce8a28038e2)

with all tolerances declared before the run, then the result may be promoted from numerical candidate to simulation-supported claim for $Q$. This lemma does not convert a simulation-supported claim into an analytic theorem; it authorizes the claim to enter a proof program only with artifact hashes and the failure-code ledger attached.

In this lemma, $\mathcal E_{\mathrm{ref},a}$ are temporal, history, spatial, and integrator-parity refinement errors; $\mathcal E_{\mathrm{prov},a}$ are causal-root and transmitter-provenance errors; $\mathcal E_{\mathrm{cons},a}$ are declared conservation-ledger residuals; $\mathcal R_{\mathrm{branch},a}$ are the owning branch protocol's residual components; and $E_\eta(Y)$ is the regulator-dependence error of the promoted observable $Y$ between adjacent rungs of the regulator ladder, defined in [Convergence Tests](../../../../markdown/aaa/validation/simulations/convergence-tests.md#machine-checkable-convergence-output). Each $\tau_{\cdot,a}>0$ has the same units as its numerator and is frozen before execution.

Every hypothesis of the lemma compares the instrument with itself: the refinement, integrator-parity, provenance, conservation, and regulator conditions all test runs of the same code against one another, and the negative control tests only that the pipeline can fail. A pass therefore establishes that the declared observables are stable under refinement on the window and consistent with the packet's own ledgers; an error shared by every run, such as a wrong kernel or a root missed at every resolution, survives every hypothesis unchanged. Simulation-supported means exactly this refinement-stable, self-consistent support. A claim that the computed result is correct additionally requires the independent reference named in the packet's `independent_reference_report.md`: a closed form, a theorem, an analytically known case such as the fixed-center solutions in [Analytic Baselines](../../../../markdown/aaa/validation/simulations/action-energy/analytic-baselines.md), or an instrument authored separately from the run, as the [global acceptance rule](../../../../markdown/aaa/validation/simulations/convergence-tests.md#global-acceptance-rule) of Convergence Tests and the [numerical recipe](../../../../markdown/aaa/validation/simulations/action-energy/numerical-recipe-and-stability.md) require.

#### $A_0$ Branch-Certificate Protocol

The first target of the mass map, the program in [Particle Masses](../../../../markdown/aaa/assemblies/particle-masses.md) that seeks to derive what an observer calls mass from a stable assembly's retained internal history and its coupling to the surrounding Noether sea, has a specialized protocol in [$A_0$ Branch Certificate Protocol](../../../../markdown/aaa/validation/simulations/a0-branch-certificate-protocol.md), with Tier 0 row semantics summarized in [$A_0$ Tier 0 Result Interpretation](../../../../markdown/aaa/validation/simulations/a0-tier0-result-interpretation.md). That protocol separates four stages:

1. Tier 0 algebraic branch search for finite root-ledger candidates.
2. Tier 1 $\eta > 0$ delayed-dynamics continuation and Floquet diagnostics, meaning the multipliers of the return map of small perturbations over one candidate period, which remain sensitivity diagnostics of an approximate periodic history until its existence and approximation error are controlled.
3. Tier 2 internal-energy and shielding extraction.
4. Tier 3 Noether sea response tensor probes.

A rerun after a finite-coordinate no-go must include the predeclared branch-chart revision record; residual-selected coordinates, locked keys promoted into branch geometry, or benchmark-derived inputs invalidate the packet as hidden fitting.

After the compact scalar-basis no-go, an $A_0$ rerun must also predeclare the corrected one-period branch-equation basis, the non-circular carrier correction if used, the residual-balance ledger, held-out residual rule, and failure code before it can proceed to the Floquet gap $\Delta_{\mathbf{k}}$ or $\eta$-ladder persistence.

No simulation run should report the far-field shielding factor $\zeta(A_0)$, the internal energy $E_{\text{internal}}(A_0)$, or the Noether sea response tensor $\mathcal{M}_{\text{sea}}^{ab}$ as accepted outputs unless the preceding branch-certificate gates have passed.

#### Cosmology Shared-Residual Protocol

The first cosmology-facing validation scaffold is [Cosmology Shared Residual Fit Protocol](../../../../markdown/aaa/validation/simulations/cosmology-shared-residual-fit.md). It specializes the campaign-packet rule to the shared dark-energy and cosmology calibration gate. The packet tests whether the residuals of the observational families, supernova distances (SN), baryon acoustic oscillations (BAO), the cosmic microwave background (CMB), weak lensing, redshift-space distortion, big-bang nucleosynthesis (BBN), and the pre-BBN branch, can consume one $\theta_{\mathrm{sea}}$, the shared Noether sea state record projected into each family, without per-observable retuning. Each family is an observer-level data product against which the recovered effective description is compared; none enters the substrate dynamics as a premise.

No cosmology packet should report a promoted dark-energy, $H_0$, $S_8$, BBN, CMB, or growth closure, where $H_0$ is the present expansion rate and $S_8$ the amplitude of matter clustering as inferred in the effective chart, unless its ordinary residuals and cross-family projection penalty, the cost of projecting one shared record into every family at once, are both inside declared tolerances.

#### Public Gravitational-Wave Benchmark Protocol

A public gravitational-wave benchmark packet tests the effective gravitational-radiation limit against versioned open strain and parameter-estimation records. The packet is not evidence for a fundamental metric ripple in the Euclidean void. It is an observer-level validation object: the $\mathbb{A}\mathbb{A}\mathbb{A}$ simulation must predict detector strain, phase, event-ledger energy balance, and any photon/gravity timing residual through its Noether sea response map and then compare those predictions to public artifacts.

The packet object is
$$
\mathcal{C}_{\mathrm{GW}}
=
\big(
\mathsf{event\_id},
\mathsf{catalog},
\mathsf{event\_version},
\mathcal{D},
\mathcal{S}_h,
\mathcal{P}_{\mathrm{PE}},
\mathcal{P}_{\mathrm{wave}},
\mathcal{Q}_{\mathrm{det}},
\mathcal{L}_{E\mathbf{p}\mathbf{J}},
\mathcal{R}_{\mathrm{GW}},
\Pi_{\mathrm{wave}},
\mathcal{F}
\big)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5890b528aec32323)

Here $\mathcal{D}$ names the detectors, $\mathcal{S}_h$ names the strain files, $\mathcal{P}_{\mathrm{PE}}$ names posterior-sample and parameter-estimation records, $\mathcal{P}_{\mathrm{wave}}$ names the waveform-family or numerical-relativity provenance, $\mathcal{Q}_{\mathrm{det}}$ carries calibration, data-quality, injection-mask, down-sampling, and glitch-treatment records, $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ is the event conservation ledger, $\mathcal{R}_{\mathrm{GW}}$ is the residual vector, and $\Pi_{\mathrm{wave}}$ maps each fitted or plotted sample back to public artifacts.

The residual vector is
$$
\mathcal{R}_{\mathrm{GW}}
=
\big(
R_h,R_\phi,R_E,R_J,R_{c_g},R_{\mathrm{det}},R_{\mathrm{PE}},R_{\mathrm{prov}}
\big)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-28eb7c6ab9d0959c)

$R_h$ compares whitened or otherwise declared detector strain on the predeclared analysis window; $R_\phi$ compares unwrapped inspiral-merger phase on the declared frequency band; $R_E$ checks source masses, remnant mass, radiated energy, recoil, ejecta or heat-channel terms, and boundary exchange in one conservation ledger; $R_J$ checks angular-momentum accounting when the packet claims spin or recoil closure; $R_{c_g}$ is used only for multimessenger timing rows, its subscript labeling the gravitational-wave transport speed written $c_{\mathrm{GW}}$ elsewhere in the corpus; and the final three residuals are provenance-completeness checks.

For a multimessenger row,
$$
R_{c_g}
=
\frac{\Delta t_{\mathrm{eff,obs}}-\Delta t_{\mathrm{eff,src}}}{D_L/c_\gamma},
\qquad
\Delta t_{\mathrm{eff,obs}}=t_{\mathrm{eff},\gamma}-t_{\mathrm{eff,GW}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-fe7e80122ceb6452)

Here $t_{\mathrm{eff},\gamma}$ and $t_{\mathrm{eff,GW}}$ are the effective observer-chart arrival times of the photon signal and the gravitational-wave signal at the detector, $\Delta t_{\mathrm{eff,src}}$ is the delay between the two emissions at the source in the same chart, $D_L$ is the distance to the source in the packet's declared effective-chart distance convention, luminosity distance unless the packet states another, and $c_\gamma$ is the photon-channel transport speed. The denominator is the photon travel time, so the residual is the arrival-time mismatch as a fraction of that travel time; to first order in a small speed difference it equals $(c_{\mathrm{GW}}-c_\gamma)/c_\gamma$, the fractional speed mismatch that [Gravitational Waves](../../../../markdown/aaa/spacetime/gravitational-waves.md) bounds, because a signal traveling the same distance at speed $c_{\mathrm{GW}}$ arrives earlier by $D_L(c_{\mathrm{GW}}-c_\gamma)/(c_\gamma c_{\mathrm{GW}})$. The intrinsic effective-chart source-emission delay $\Delta t_{\mathrm{eff,src}}$ must be declared before fitting the gravity-channel speed. A packet fails as hidden tuning if it absorbs photon/gravity timing into an undeclared source delay, changes the analysis band after inspecting residuals, substitutes a cleaned strain product without recording a new provenance row, or changes waveform family after comparing to the data.

The minimum artifact list is `event.json`, `strain_files.json`, `detector_quality.json`, `parameter_estimation.json`, `waveform_provenance.json`, `analysis_window.json`, `strain_residuals.csv`, `phase_residuals.csv`, `energy_ledger.csv`, `speed_residual.json` when applicable, `artifact_hashes.json`, and `failure_report.md`. For long binary-neutron-star inspirals the packet must also include a glitch/cleaning row, a low-frequency cutoff row, and a reason if any detector is excluded from a visible-strain comparison. For short binary-black-hole benchmarks the packet must include an inspiral-merger-ringdown window, detector arrival-time comparison, and ringdown handoff row.

The normalized public-data diagnostic is
$$
\mathcal{D}_{\mathrm{GW}}
=
\big(
D_h,D_\phi,D_E,D_{c_g},D_{\mathrm{det}},D_{\mathrm{PE}},D_{\mathrm{prov}}
\big)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a66d4ddde2fba4f7)

with
$$
D_h=\frac{R_h}{\tau_h},
\qquad
D_\phi=\frac{R_\phi}{\tau_\phi},
\qquad
D_E=\frac{R_E}{\tau_E},
\qquad
D_{c_g}=\frac{|R_{c_g}|}{\tau_{c_g}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2b476af8027a70db)

Here $\tau_h$, $\tau_\phi$, $\tau_E$, and $\tau_{c_g}$ are the tolerances declared for the four residuals before the comparison. $D_{\mathrm{det}}$, $D_{\mathrm{PE}}$, and $D_{\mathrm{prov}}$ are binary completeness ratios whose value is `0` only when detector masks/calibration, parameter-estimation release metadata, and artifact hashes are all present, and whose value exceeds $1$ otherwise, so that a missing item fails the maximum rule below rather than passing it at the threshold. A packet can support a promoted gravitational-wave claim only if
$$
\max_a\mathcal{D}_{\mathrm{GW},a}\le 1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9ca0778f323eaef8)

and the public-data provenance row was fixed before waveform comparison.

The first benchmark triad is:

| Packet row | Required public-data role | Failure routed if missing |
| --- | --- | --- |
| `GW150914_short_bbh` | Short inspiral-merger-ringdown strain, two-detector arrival timing, radiated-energy ledger, numerical-relativity waveform provenance, and ringdown handoff | $\mathsf{artifact\_incomplete}$ or $\mathsf{hidden\_tuning}$ |
| `GW170817_long_bns` | Long inspiral strain, three-detector timing, glitch/cleaning provenance, chirp-mass phase benchmark, and parameter-estimation waveform-family record | $\mathsf{provenance\_discontinuity}$ or $\mathsf{mesh\_nonconvergence}$ |
| `GW170817_GRB_speed` | Photon/gravity timing residual with luminosity distance, observed delay, and intrinsic source-emission lag nuisance | $\mathsf{hidden\_tuning}$ or $\mathsf{conservation\_drift}$ |

This public benchmark packet is a success marker under the existing simulation provenance and conservation gates, not a new gate family. Its value is that public strain, parameter-estimation samples, waveform provenance, and multimessenger timing make strong-field radiation tests replayable without importing the success of general-relativistic (GR) waveform templates, the numerically solved GR predictions against which the public parameter estimates were made, as $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology. Those templates are comparison material at the observer level; the $\mathbb{A}\mathbb{A}\mathbb{A}$ prediction must come from the Noether sea response map, and the effective gravitational-radiation description is a recovery target rather than a premise.

#### Tier 0 / Tier 1 Campaign Packet

Tier 0 and Tier 1 results are accepted only through an auditable campaign packet. The packet must include the source commit, pre-run tolerances, root ledger, branch residual vector, convergence table, $\eta$ ladder when a regulator claim is made, declared history interpolation, failure report, and artifact hashes. When a run crosses a fold-layer, separator, or active-root status transition, the packet must also include transition records for that window.

The minimum Tier 0 packet contains `campaign.json`, `mesh.json`, `state_vector.json`, `root_ledger.json`, `branch_residuals.json`, `candidate_rows.csv`, `failure_codes.md`, and `promotion_gate.md`. For corrected branch-equation reruns, `branch_residuals.json` must include the branch-native basis, predeclared coefficient rule, held-out residual rule, and pass/fail value for the residual-balance record. Corrected Master EOM branch reruns must also report same-record $D_t$, $D_r$, $D_r/D_t$, and $W^{\mathrm{acc}}$ records: the transmitter-side factor $D_t=c_f-\hat{\mathbf r}_t\cdot\mathbf V_t(T_t)$, the receiver-side factor $D_r=c_f-\hat{\mathbf r}_t\cdot\mathbf V_r(T_r)$, the signed root-playback derivative $dT_t/dT_r=D_r/D_t$, and the transmitter-side acceleration weight $W^{\mathrm{acc}}=c_f/|D_t|$ of the [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form), each evaluated on the same root record. A negative control must show that an acceleration claim is not advanced when $D_t$ or $W^{\mathrm{acc}}$ is absent or mismatched, while action and conserved-account claims are not advanced when their required $D_r/D_t$ playback record is absent or mismatched. The minimum Tier 1 packet adds `run_metadata.json`, $\mathbb{U}_{\text{now}}$ provenance data, `history_interpolation.json`, `convergence_table.csv` with the rows that [Convergence Tests](../../../../markdown/aaa/validation/simulations/convergence-tests.md#machine-checkable-convergence-output) require, `eta_ladder.csv`, `conservation_ledger.csv`, `cross_integrator_report.md`, `negative_control_report.md`, `failure_report.md`, and `promotion_lemma_check.md`. A claim of numerical correctness also requires an `independent_reference_report.md` naming the closed form, theorem, analytically known case, or separately authored instrument used as the oracle. If a Tier 1 run claims a branch transition, it also emits `transition_records.json` with the status, regularization route, transition-window scale, root-ledger records, and promoted observables for each transition window.

The `cross_integrator_report.md` artifact must name the solver family, delayed interpolation polynomial or reconstruction rule, nonlinear solve residuals when implicit stages are used, small-delay or vanishing-delay encounters, and event or restart handling. Cross-integrator agreement is valid implementation-parity evidence only when branch identity and transition records match; it is not an independent correctness oracle.

A Tier 1 packet supports a proof or validation claim only when the branch residuals, convergence checks, provenance checks, conservation checks, regulator-dependence checks, and negative control all pass with tolerances declared before the run. If any promoted scalar, root count, branch label, stability gap, or tolerance is selected after inspecting output, the packet fails as hidden tuning.

#### Runtime Instantiation

The [Master Simulation Protocol](#master-simulation-protocol-absolute-frame) is the single owner of absolute-frame, grid, Noether sea initialization, and campaign-packet requirements. A concrete run instantiates it by recording:

- fixed native chart coordinates $(X,Y,Z)$ and absolute time $T$ with step $\Delta T$;
- numerical wake-speed normalization $c_f=1$;
- the $\mathbb{U}_{\text{now}}$ sensor geometry, logged $\Phi$ and $\nabla_{\mathbf X}\Phi$ channels, and boundary conditions;
- authoritative transmitter-tagged worldline history, root identity with the transmitter identity recorded as `transmitter_id`, the emission time $T_t$ of each admitted root, and the compatibility field `t_emit`, which stores that same emission time under its legacy name;
- declared candidate Noether braid inventory and branch status only when Noether sea response is part of the run;
- integrator, interpolation rule, tolerances, history horizon, random seed when applicable, source commit, and artifact hashes.

A one- or two-architrino benchmark in an otherwise empty Euclidean void therefore uses the same coordinate and provenance protocol without loading a Noether braid lattice. Cross-integrator agreement remains an implementation-parity check; any correctness claim also needs the independent reference required by the campaign packet.

### A0 Branch Certificate Protocol

This protocol defines the mathematical and numerical evidence required for $A_0$, the reference-attractor candidate described in [Particle Masses](../../../../markdown/aaa/assemblies/particle-masses.md#reference-attractor-gate), [Coincident-Midpoint Orthogonal-Axis Braid Dynamics](../../../../markdown/aaa/noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md#zero-axial-offset-three-binary-dynamics-and-interpretation), and [Energy](../../../../markdown/aaa/dynamics/energy.md). The symbol $A_0$ names one proposed neutral rest branch of a [Noether braid](../../../../markdown/aaa/noether-braid/noether-braid.md), the neutral six-architrino scaffold of three binaries, in the [coincident-midpoint orthogonal-axis three-binary configuration](../../../../markdown/aaa/noether-braid/3d-braid-assemblies.md#coincident-midpoint-orthogonal-axis-three-binary-configuration), in which the three binary midpoints coincide and the three binary axes are mutually orthogonal. A branch certificate is the finite record that would establish such a branch: the retained history, its causal-root ledger, its return under the delayed dynamics, its stability, and the residuals and tolerances that make each entry checkable. The protocol specializes the general [Simulation Run Protocols](../../../../markdown/aaa/validation/simulations/run-protocols.md) to this one neutral rest-branch mass-map candidate constrained to coincident-midpoint orthogonal-axis braid coordinates: persistent indices, independently assignable positive radii and frequencies, mutually orthogonal near-rest axes, the declared orthogonal-axis three-binary response direction, and explicit remaining binary coordinates. The first requirement of the mass program is a persistent object under the [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md); $A_0$ is one candidate for that object and this chart is not the unique route to particle mass. No computed $A_0$ branch is reported here. Retention and stability require the stated conditions to hold on the same evolved history.

The protocol does not treat $A_0$ as a particle label. It treats $A_0$ as a calibration-free branch certificate problem: find a finite, stable, multi-scale [causal-root](../../../../markdown/aaa/foundations/architrino.md) ledger, whose entries identify the earlier emissions that reach a receiver at an evaluation time, before energy, shielding, Noether sea response, or mass comparisons enter. Every numerical quantity in this protocol is stated in normalized wake-speed units with $c_f=1$, where $c_f$ is the primitive speed at which a causal wake surface expands; the symbol $c_f$ is retained in the equations below so that their dependence on it stays visible.

#### Master-Equation Handoff Boundary

If a run consumes a master-equation [branch-chart closure object](../../../../markdown/aaa/dynamics/master-equation.md#branch-chart-closure-object) $\mathfrak{B}(\Gamma,\mathcal{S};H_{\mathrm{hist}},\eta,\epsilon_c)$, the consumed data must remain branch-certificate data: active roots, inactive gaps, transmitter-side Jacobian floors, same-record transmitter-side acceleration-weight intervals $W^{\mathrm{acc}}$, receiver-side factors $D_r$, signed root-playback intervals $D_r/D_t$, memory depth, returned-section residual, section stability, and the refinement schedule that preserves the same branch identity. Here $\Gamma$ is the retained history of the six worldlines, $\mathcal{S}$ is the section on which the return of that history is measured, $\eta$ is the causal-wake-surface width of the regularized kernel, and $\epsilon_c$ is the auxiliary core scale that regularizes zero separation. $H_{\mathrm{hist}}$ is the finite retained-history horizon, written $h$ in the Master Equation's object; this protocol renames it so that it is not confused with the observer-level Planck benchmark $h$, which appears below as the action quantum whose recovery is a closure target. With $\hat{\mathbf r}_t$ the unit vector from the transmitter's emission site to the receiver, $\mathbf V_t(T_t)$ the transmitter velocity at emission time $T_t$, and $\mathbf V_r(T_r)$ the receiver velocity at reception time $T_r$, the transmitter-side acceleration weight $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$, with $D_t=c_f-\mathbf V_t(T_t)\cdot\hat{\mathbf r}_t$, sets the strength of an arriving hit from the transmitter's motion at emission; the receiver-side factor $D_r=c_f-\mathbf V_r(T_r)\cdot\hat{\mathbf r}_t$ sets how fast the receiver plays through the emitted wake sequence, and the ratio $D_r/D_t$ is the signed rate at which the selected emission time advances with reception time. These fields may support Tier 0 and Tier 1 certification only.

The analysis must distinguish branch geometry from downstream physical quantities. Energy, far-field shielding, Noether sea response, and mass extraction remain uncomputed until the required analyses are performed. Three downstream quantities are named here so that their refinement test can be stated. The shielding factor $\zeta(A_0)$ is the leading isotropic fraction of the far-field wake that escapes the assembly relative to the unshielded constituent sum, and the anisotropic leakage $\mathcal{L}_{\text{aniso}}$ is the direction-dependent remainder of that far-field wake; both are defined in [Energy](../../../../markdown/aaa/dynamics/energy.md#apparent-energy-and-shielding). The Noether sea response tensor $\mathcal{M}_{\text{sea}}^{ab}$ converts exposed energy and response-center velocity into effective momentum and reduces to $h^{ab}/c_{\text{eff}}^2$ in the homogeneous isotropic limit; it is defined in the [inertial-response section of Energy](../../../../markdown/aaa/dynamics/energy.md#operational-definition-of-inertial-mass). An extraction fails the stated consistency test if $\zeta(A_0)$, $\mathcal{L}_{\text{aniso}}$, or $\mathcal{M}_{\text{sea}}^{ab}$ changes by more than its declared tolerance under root-ledger refinement, inactive-gap refinement, history-window extension, or controlled $\eta$ refinement while the branch label and quotient row are claimed to be unchanged.

#### Evidence Required for a Branch

An auditable $A_0$ analysis distinguishes the following information across all tiers. Quantities not computed at a given tier remain explicitly uncomputed, with their scientific role stated.

| Evidence | Required content | Interpretation |
| --- | --- | --- |
| Reproducibility | publicly identifiable method and data versions, integrator, tolerances, $\eta$, sampling schedule, and history-window rule | makes the calculation reproducible |
| Noether sea environment | the Noether sea drift velocity $u^i_{\text{sea}}$, its density-gradient measure $G_{\text{grad}}$, the normalized Noether braid density $n$, the Noether sea delay factor $\chi_{\text{sea}}=c_f/c_{\text{eff}}$, the declared comparison-channel speed $c_\star$, and boundary conditions | fixes the homogeneous Noether sea cell and prevents mixing $c_f$ with $c_{\text{eff}}$ |
| Branch identity | layer windings, inter-layer closure integers, handedness, carrier ellipticity, and active root-branch summary | identifies the branch being certified |
| Reduced coordinates | quotient-coordinate row $z_\Lambda$: the radius ratios $\varepsilon_{12}=R_1/R_2$ and $\varepsilon_{23}=R_2/R_3$, the cycle-period ratios $P_1/P_2$ and $P_2/P_3$, the binary-2 speed offset $\delta_2=(s_2-c_f)/c_f$, binary ellipticities, the Gram matrix $G_{\ell m}$ of the binary-plane normals, the orientation triple product $\chi_N$ of those normals, the circulation-handedness labels $H_1,H_2,H_3$, the relative phase $\Phi_{\text{rel}}$ after the common phase origin is removed, the removed gauges (global rotations $SO(3)$, the common closed-cycle phase $S^1_{\mathbf{k}}$, and the permitted discrete relabelings $\Gamma_\Lambda$), the branch class $[\Lambda]$, and quotient-degeneracy status | records the reduced moduli coordinate rather than an unquotiented carrier representative |
| Coordinate revision | revised reduced branch coordinates declared before fitting, including source coordinates, equality relations, equation and coefficient counts, held-out residual tests, phase-origin convention, symmetry quotients, excluded locked-root contributions and benchmarks, and an explicit distinction from evolved-history evidence | prevents residual-selected coordinates or post-fit added columns from masquerading as branch geometry |
| State | six architrino labels, polarities, reduced geometry, frequencies, phase offsets, carrier chart, history segment, and center gauge | gives the reduced Noether braid state vector |
| Closure equations | active variables, causal-root equations, layer phase closure, inter-layer closure, center-gauge closure, speed-ordering inequalities, and tolerances | ties closure labels to equations rather than only to names |
| Causal roots | active and raw partner, self, and inter-layer root classes with delays, branch Jacobians, separator flags, root-count changes across separators, parity events, and excluded near-zero self roots separated | verifies finite causal-root bookkeeping |
| Interaction terms | terms assigned to averaging, locking, and leakage channels, with measured or derived residual size | makes the size and role of each correction explicit |
| Residual vector | complete branch-row residual surface $\mathcal{R}_{A_0}$, with $\mathcal{R}_{\text{state}}$, $\mathcal{R}_{\text{root}}$, $\mathcal{R}_{\text{phase}}$, $\mathcal{R}_{E}$, $\mathcal{R}_{\text{drift}}$, $\mathcal{R}_{\text{speed}}$, $\mathcal{R}_{\text{avg}}$, $\mathcal{R}_{\text{lock}}$, $\mathcal{R}_{\text{leak}}$, and $\mathcal{R}_{\text{Floquet}}$, each with value, tolerance, status, role, and note fields | states the errors and leaves later-tier omissions explicit |
| Floquet gap | $\Delta_{\mathbf{k}}$ and its interpretation under the stated stability criterion; uncomputed at Tier 0 | distinguishes an unevaluated stability condition from a positive or nonpositive computed gap |
| Stability | monodromy or finite-difference return map, excluded symmetry modes, non-symmetry Floquet multipliers, and the computed $\Delta_{\mathbf{k}}$ once Tier 1 exists; the acceleration-balance and return residuals of the evolved history on the same retained cycle, which must pass before the return map is linearized | separates integer closure from attractor stability |
| Motion-induced anisotropy | $\mathbf{V}_{\text{cm}}$, declared $c_\star$, $\beta_\star$, envelope ratio, forward/backward delay ratio, tensor $\mathcal{A}_{\mathrm{gv}}^{ij}$, refinement status, and whether the entry is rest residue, small-velocity response, or probe-induced drift | keeps motion-induced deformation separate from shielding leakage |
| Energy | sign-resolved kinetic content, interaction terms, wake/history terms, binary totals $E_1,E_2,E_3$, $E_{\text{internal}}(A_0)$, delayed-Noether status (`action-derived`, `quasi-Noether`, or `diagnostic-only`), the running retained-history energy-like functional across active self-hit crossings, and action per closed cycle after bounded-energy status | supplies the unshielded energy reservoir after Tier 1 passes |
| Far-field shielding | extraction radii, angular grid, selected wake channel, $\mathcal{L}(\hat{\mathbf{R}})$, naive constituent sum, leading isotropic projection, $\zeta(A_0)$, $\mathcal{L}_{\text{aniso}}$, and convergence status | turns shielding into an extracted far-field quantity after Tier 1 passes |
| Noether sea response | acceleration probes, gradient probes, extracted $\mathcal{M}_{\text{sea}}^{ab}$ baseline, symmetric tensor part, antisymmetric residue, and response anisotropy | tests Noether sea inertial and gravitational response after shielding passes |
| Mass comparison | $\zeta(A_0)E_{\text{internal}}(A_0)/E_0$, where $E_0>0$ is a declared energy normalization from an independent unit map and cannot be chosen from the mass being predicted, together with unresolved constants, response-map assumptions, and explicitly excluded particle benchmarks | records only calibration-free mass-facing output |
| Consistency conditions | satisfied, failed, or uncomputed conditions for quotient nondegeneracy, scale separation, speed ordering, phase closure, carrier residuals, root residual, active root-ledger stability, active separator-root handling, near-zero self-root handling, residual interpretation, Floquet stability, and continuation into direct dynamics | distinguishes branch-search, attractor, shielding, and response evidence |
| Unresolved or failed conditions | conditions not satisfied or not evaluated, and their consequences for the conclusion | prevents incomplete or failed calculations from being read as mass-map results |

The complete residual vector is
$$
\mathcal{R}_{A_0}
=
\left(
\mathcal{R}_{\text{state}},
\mathcal{R}_{\text{root}},
\mathcal{R}_{\text{phase}},
\mathcal{R}_{E},
\mathcal{R}_{\text{drift}},
\mathcal{R}_{\text{speed}},
\mathcal{R}_{\text{avg}},
\mathcal{R}_{\text{lock}},
\mathcal{R}_{\text{leak}},
\mathcal{R}_{\text{Floquet}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4b5f8d0c47ae2134)

Its components measure, in order, the carrier-chart return mismatch over one declared period ($\mathcal{R}_{\text{state}}$), the defect of the active causal-root equations ($\mathcal{R}_{\text{root}}$), the integer winding mismatch ($\mathcal{R}_{\text{phase}}$), the regularized energy or history functional ($\mathcal{R}_{E}$), the center drift ($\mathcal{R}_{\text{drift}}$), the sign-aware violation of the declared speed ordering ($\mathcal{R}_{\text{speed}}$), the size of terms claimed to average out ($\mathcal{R}_{\text{avg}}$), the defect of the selected locking terms ($\mathcal{R}_{\text{lock}}$), the far-field leakage placeholder ($\mathcal{R}_{\text{leak}}$), and the stability entry ($\mathcal{R}_{\text{Floquet}}$); the tier-by-tier reading of each entry is in [$A_0$ Tier 0 Result Interpretation](../../../../markdown/aaa/validation/simulations/a0-tier0-result-interpretation.md#residual-semantics). The stability entry is stated through the non-symmetry Floquet gap $\Delta_{\mathbf{k}}=1-\max_{i\notin G}\lvert\mu_i(\mathbf{k})\rvert$, defined in the [action-increment protocol](../../../../markdown/aaa/validation/simulations/coincident-midpoint-orthogonal-axis-action-increment-protocol.md): the Floquet multipliers $\mu_i$ are the eigenvalues of the linearized one-cycle return map, so a multiplier of modulus below one means that a small deviation from the periodic history in that direction shrinks after one cycle, and $G$ is the set of neutral symmetry directions, such as time translation and global rotation, that are excluded before the maximum is taken. A positive gap is the stated attractor criterion for a history that is already a solution; it says nothing about a history that is not.

Tier 0 may evaluate only part of this vector. Every omitted component remains explicitly uncomputed, together with the later analysis needed to determine it. A missing tolerance is not evidence that a residual is small.

##### Self-Hit Energy And Action-Spacing Order

For any row that claims an active self-hit branch, the certificate must report the branch invariants in the required order. First, it reports the active causal-root count by class and the root-count change across separators, the events at which a root is born, annihilated, or leaves the retained history, classified in the Master Equation's [separator taxonomy](../../../../markdown/aaa/dynamics/master-equation.md#separator-taxonomy); any creation or annihilation event must state whether the count changes by an even number rather than hiding the transition inside interpolation, because an ordinary fold changes the count by two while an odd change signals entry or exit at the memory boundary and must be attributed to that event. Second, it reports the transversality floor

$$
J_{\min}
=
\min_{\text{active }(T_r,T_t)}
\left|
1-\frac{\mathbf{V}_j(T_t)\cdot\hat{\mathbf{r}}_{o'j}(T_r;T_t)}{c_f}
\right|
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e80a6a39747b59e2)

Here the minimum runs over every active root on the retained cycle, each labeled by its reception time $T_r$ and emission time $T_t$; $\mathbf V_j(T_t)$ is the velocity of the transmitting architrino $j$ at emission, and $\hat{\mathbf r}_{o'j}(T_r;T_t)$ is the unit vector from that emission site to the receiving architrino $o'$ at reception. The quantity inside the bars is the dimensionless transmitter-side Jacobian $\lvert D_t\rvert/c_f$, so a floor bounded away from zero certifies that every active root crosses the causal condition transversally rather than grazing it. On the same active records the certificate must also report the transmitter-side acceleration weight $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$ on its certified floor or bounded interval. It must report the receiver-side factor $D_r=c_f-\mathbf V_{o'}(T_r)\cdot\hat{\mathbf r}_{o'j}(T_r;T_t)$ separately for signed root playback. A healthy transversality floor $J_{\min}$ alone does not certify the branch's acceleration or action contribution.

Third, it reports a running retained-history energy-like functional and its variation across self-hit or separator crossings under $\Delta T$, $\eta$, and history-window refinement. A bounded-energy claim fails if the apparent bound disappears under refinement.

The same row must state whether the energy object is action-derived, quasi-Noether, or diagnostic-only. A diagnostic-only energy row may reject a branch by showing runaway, regulator dependence, or nonconvergent drift, but it cannot promote closed-cycle action spacing or no-runaway conservation as theorem-level output.

Closed-cycle action spacing requires those well-posedness conditions. The analysis records the action accumulated over one closed cycle, $\mathcal{A}_{\text{cycle}}(A_0)$, its branch label $\Lambda$, period $P_{\mathbf{k}}$, and spacing relative to neighboring accepted branches. This ordering prevents a numerically periodic carrier with an unbounded self-hit energy ledger from being read as evidence for a derived $h$, the observer-level action quantum known as Planck's constant, whose recovery from closed-cycle action spacing is a closure target rather than an input.

The group-velocity anisotropy entry uses the reduced centered covariance of the six-worldline state. Here $\mathbf{V}_{\text{cm}}$ is the declared translation velocity of the equal-weight centroid of the six worldlines; the subscript is a fixed corpus label, not a mass-weighted center, because architrinos carry no mass. With
$$
\mathbf{C}_{A_0}(T)=\frac{1}{6}\sum_{a\in A_0}\mathbf X_a(T)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e6bd9714da63ff7a)

define
$$
D^{ij}_{A_0}(\mathbf{V}_{\text{cm}})
=
\left\langle
\sum_{a\in A_0}
\left(X_a^i-C_{A_0}^i\right)
\left(X_a^j-C_{A_0}^j\right)
\right\rangle_{P_{\mathbf{k}}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-56322f39346f96b8)

$$
Q^{ij}_{A_0}
=
\frac{D^{ij}_{A_0}}{h_{mn}D^{mn}_{A_0}},
\qquad
\mathcal{A}_{\mathrm{gv}}^{ij}
=
Q^{ij}_{A_0}-\frac{1}{3}h^{ij}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f022c55f30d3b266)

Here $\mathbf{C}_{A_0}(T)$ is the centroid of the six worldlines at absolute time $T$, and the angle brackets average over one declared return period $P_{\mathbf{k}}$, so $D^{ij}_{A_0}$ is the cycle-averaged second-moment tensor of the six positions about their centroid. $h_{mn}=\delta_{mn}$ is the Euclidean spatial metric on $\Sigma_T$ and $h^{ij}=\delta^{ij}$ is its inverse, so the denominator is the Euclidean trace of $D^{ij}_{A_0}$. Dividing by that trace makes $Q^{ij}_{A_0}$ a unit-trace shape tensor, and subtracting one third of the identity leaves $\mathcal{A}_{\mathrm{gv}}^{ij}$ traceless, so it vanishes exactly for an isotropic distribution and its nonzero part records the direction dependence alone. This tensor measures motion-induced or probe-induced Noether braid deformation. It is not the same object as the far-field leakage residue $\mathcal{L}_{\text{aniso}}$, which is extracted from cycle-averaged wake coefficients in Tier 2.

#### Tier 0: Algebraic Branch Search

Tier 0 is a reduced branch-search pass. It samples diagnostic carrier charts, prescribed families of six closed paths on which the causal-root equations are solved without evolving the dynamics, classifies internal terms, and emits candidate rows. It does not claim a physical attractor.

Required inputs:

- homogeneous Noether sea cell with $u^i_{\text{sea}}=0$, $G_{\text{grad}}=0$, $n=1$, $\chi_{\text{sea}}=1$, and primitive wake speed $c_f=1$;
- persistent binary labels $\ell\in\{1,2,3\}$ and polarity labels $\sigma\in\{+,-\}$;
- scale ratios $\varepsilon_{12}=R_1/R_2$ and $\varepsilon_{23}=R_2/R_3$, where $R_\ell$ is the orbital radius of binary $\ell$ on the chart;
- speed offsets enforcing $s_1 > c_f$, $s_2 \approx c_f$, and $s_3 < c_f$, where $s_\ell$ is the orbital speed of the two members of binary $\ell$; this ordering is the declared constraint of the specialized $A_0$ hypothesis in [Particle Masses](../../../../markdown/aaa/assemblies/particle-masses.md#reference-attractor-gate), and speed above $c_f$ alone does not establish a self-hit, which requires the actual root inventory;
- candidate handedness tuple and carrier ellipticity;
- $\eta > 0$, sampling resolution, and history-window rule.

The local symbol $\ell$ denotes the persistent binary index in this protocol. It does not encode a radial-role ordering, and the binary labels are not reassigned when radii, frequencies, or branch-derived roles cross.

Required outputs:

| Output | Meaning |
| --- | --- |
| Branch identity | indexed-binary windings, inter-binary closure integers, handedness, and active root-branch summary |
| Periodic closure | declared $P_{\mathbf{k}}$, winding integers, inter-binary closure integers, and active root classes |
| Reduced coordinates | reduced quotient-coordinate row $z_\Lambda$, including radius ratios, period ratios, $\delta_2$, binary ellipticities, plane Gram data $G_{\ell m}$, $\chi_N$, handedness labels, phase-offset quotient status, removed gauges, branch class $[\Lambda]$, and coordinate-degeneracy status |
| State | reduced geometry, frequencies, phase offsets, carrier chart, and center gauge |
| Closure equations | active causal-root, phase-closure, inter-binary closure, center-gauge, and speed-ordering equations used by the row |
| Causal roots | active and raw partner, self, and inter-binary root counts with delays, branch Jacobians, separator flags, root-count changes across separators, parity events, and excluded near-zero self roots separated |
| Interaction terms | terms assigned to averaging, locking, and leakage channels |
| Residual vector | every component of $\mathcal{R}_{A_0}$, each with value, tolerance, status, role, and note fields; $\mathcal{R}_{E}$ and $\mathcal{R}_{\text{Floquet}}$ are explicit Tier 0 omissions unless supplied by a later diagnostic |
| Floquet gap | $\Delta_{\mathbf{k}}$ status object; uncomputed until Tier 1 constructs the monodromy or finite-difference return map |
| Motion-induced anisotropy | rest-branch residue if computed, or an explicit not-computed Tier 0 status; no Tier 0 row may use this as shielding evidence |
| Consistency conditions | satisfied, failed, or uncomputed conditions for quotient coordinates, scale separation, speed ordering, phase closure, carrier residuals, root residual, active root ledger, active separator roots, near-zero self roots, residual interpretation, $\Delta_{\mathbf{k}}$, and continuation into direct dynamics |
| Unresolved or failed conditions | reason a candidate fails or remains eligible for Tier 1 |

Tier 0 passes only if at least one row has a finite causal-root ledger, nondegenerate quotient coordinates, retained scale separation, correct speed ordering, bounded carrier residuals, no unclassified separator term, and a complete residual surface. Passing Tier 0 only authorizes Tier 1 continuation.

##### Interpreting Failure

A failure identifies the condition that remains unsatisfied: coordinate nondegeneracy, scale separation, speed ordering, phase closure, carrier or causal-root residuals, averaging or locking accuracy, separator treatment, or the active-root inventory. None of these preliminary tests computes a Floquet gap. A nonpositive gap can reject the stated attractor criterion only after a return-map calculation supplies it.

##### Near-Zero Self Roots

Tier 0 must distinguish raw self-root sightings from active self-hit branches. A self root at or below the configured near-zero delay threshold is recorded in the raw ledger but excluded from the active ledger. The exact zero-delay endpoint is removed by the convention $H(0)=0$, which forbids an instantaneous self-kick; the positive-delay neighborhood below the threshold lies inside the unregularized self-coincidence locus that the Master Equation quarantines by a declared separation floor, so its exclusion is a declared numerical policy rather than a consequence of $H(0)=0$ alone. The exclusion is conservative: it does not show that no positive-delay self-root branch exists nearby.

Such a root may not count as self-hit closure merely because a fold-layer diagnostic, a chart on which a self root sits inside the regularized neighborhood of a fold of its causal-root equation, where the transmitter-side factor $D_t$ vanishes and the simple-root weight is singular, preserves the locked self-root entries. The fold-layer row is a transition candidate only; it promotes after a corrected one-period branch-equation attempt passes the declared residual surface, with $\Delta_{\mathbf{k}}$ and $\eta$-ladder persistence still downstream.

The reader-facing interpretation of these rows is in [$A_0$ Tier 0 Result Interpretation](../../../../markdown/aaa/validation/simulations/a0-tier0-result-interpretation.md).

#### Tier 1: $\eta > 0$ Continuation

Tier 1 examines a geometry satisfying the Tier 0 conditions under direct delayed dynamics, with the regularized wake kernel still active. All quantities retain their declared absolute-frame interpretation.

Required checks:

1. direct evolution over at least one declared $P_{\mathbf{k}}$, with the evolved rather than prescribed history covering at least one retained horizon $H_{\mathrm{hist}}$ plus one period, so that the returned history segment compared below contains no prescribed data;
2. root-ledger stability under $\Delta T$ and history-window refinement;
3. persistence of averaging, locking, and leakage classifications;
4. no secular center drift after symmetry modes are removed;
5. acceleration balance and return on the same retained cycle: the kinematic acceleration $d^2\mathbf X_a/dT^2$ of the history on the returned cycle, including its initially prescribed segment, agrees with the summed causal-root acceleration evaluated on that same history within the declared tolerance at every reception time, and the history segment returns to itself after one period within the declared $\mathcal{R}_{\text{state}}$ and $\mathcal{R}_{\text{root}}$ tolerances, before any linearization, because a return map linearized about a history that does not satisfy the acceleration law has no referent;
6. monodromy or finite-difference return-map estimate with symmetry modes quotiented;
7. positive non-symmetry Floquet gap $\Delta_{\mathbf{k}}>0$;
8. convergence under the standards in [Convergence Tests](../../../../markdown/aaa/validation/simulations/convergence-tests.md);
9. a Floquet or monodromy report stating whether the state-dependent delay derivative term, the contribution to the linearized operator from the dependence of each root's emission time on the perturbed history, was included in the variational operator, since omitting it changes the multipliers;
10. resolved transition data whenever the run crosses a fold-layer, separator, or active-root status transition.

The return-map estimate in item 6 is a finite projection of the return operator on history space. Evaluated at a history that passes item 5 within tolerance, it is a numerical spectral diagnostic; it becomes a stability certificate only when an existence enclosure with nonlinear error bounds establishes a nearby periodic history and the spectral bound is carried by the full history-space operator, as required by the [two-body closure packet](../../../../markdown/aaa/dynamics/binary-dynamics.md#two-body-closure-packet-theorem-target).

##### Branch-Chart Revision Checkpoint

If a Tier 1 diagnostic or corrected carrier calculation establishes a no-go result within a finite coordinate family, a proposed revision must be specified before a new numerical evaluation. The proposed reduced coordinate $z_\Lambda^\star$ or finer branch partition $\mu^\star$ must be declared from branch geometry, causal-root data, quotient-row data, or corrected carrier state before residual fitting. It may not be selected from residual-sign binning, particle benchmarks, fitted weights, or post-fit cancellation.

The revised chart must state its source coordinates, equality relations, equation and coefficient counts, held-out residual checks, phase-origin checks when a phase split is used, excluded locked-root contributions, symmetry quotients, and excluded benchmarks. A proposed coordinate change is not an evolved history. The design must remain overdetermined after quotienting, $N_{\mathrm{eq}}>N_{\mathrm{coef}}$, equivalently $R_{\mathrm{df}}=(N_{\mathrm{eq}}-N_{\mathrm{coef}})/N_{\mathrm{eq}}>0$, where $N_{\mathrm{eq}}$ counts the independent residual equations after the symmetry quotient and $N_{\mathrm{coef}}$ counts the fitted coefficients, and the same branch identity must survive the refinement checks in [Convergence Tests](../../../../markdown/aaa/validation/simulations/convergence-tests.md).

Such a revision is a candidate coordinate description, not an evolved history. A hidden fit split, inadequate degrees of freedom, or failure on held-out residuals leaves the compact-coordinate no-go unresolved. Even a revision satisfying these checks still requires corrected one-period residuals, quotient-row identity, monodromy or $\Delta_{\mathbf{k}}$, and $\eta$-ladder persistence with the same branch identity.

Tier 1 passes only if the same branch remains stable before any $\eta\to0^+$ extrapolation. A Tier 1 pass establishes a finite-$\eta$ periodic candidate that satisfies the acceleration law within tolerance and carries a positive numerical Floquet gap; certified attractor status additionally requires the existence enclosure and full-operator bound named above.

##### Corrected One-Period Branch-Equation Boundary

The proposed compact fold-layer-locked configuration is a negative control, not an established attractor or a broad falsification of possible $A_0$ branches. Preserving locked self-root contributions in $\mathcal{R}_{\text{lock}}$ is insufficient if state return, root closure, phase closure, speed ordering, center drift, or energy closure fails. No numerical residual result is reported for this control. A corrected calculation must declare either a non-circular carrier correction $\mathbf D_{a,\ell}(T)$ or a richer branch-native interaction basis before residual fitting.

For a declared period window $W=[T_0,T_0+P_{\mathbf{k}}]$, the corrected carrier has the form
$$
\mathbf X_{a,\ell}^{\star}(T)
=
\mathbf X_{a,\ell}^{(0)}(T)+\mathbf D_{a,\ell}(T),
\qquad
\mathbf D_{a,\ell}(T+P_{\mathbf{k}})=\mathbf D_{a,\ell}(T),
\qquad
\left\langle\mathbf D_{a,\ell}\right\rangle_W=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ed6d2de7bf72ebb0)

Here $T_0$ is the chosen absolute-time origin of the window, $P_{\mathbf{k}}$ is the declared return period indexed by the winding vector $\mathbf k$, $\mathbf X_{a,\ell}^{(0)}(T)$ is the uncorrected circular carrier of member $a$ of binary $\ell$, and $\mathbf D_{a,\ell}(T)$ is a periodic correction with zero mean over the window, so that a constant offset is left to the center gauge rather than duplicated in the correction. The correction carries the member index as well as the binary index: a correction shared by both members of a binary only translates that binary, leaving the separation $\mathbf X_{+,\ell}-\mathbf X_{-,\ell}$ and hence the relative orbit circular, so it cannot serve as a non-circular carrier correction.

The one-period residual is
$$
\mathcal{R}_{\mathrm{1per}}
=
\frac{
\left(
\int_W
\sum_a
\left\|
\mathbf A^{\mathrm{ME}}_a(T;\mathbf D)
-
\sum_{B\in\{B_{\text{self}},B_{\text{partner}},B_{\text{inter}}\}}
\alpha_B\,\mathbf A_{a,B}(T;\mathbf D)
\right\|^2 dT
\right)^{1/2}
}{
\left(
\int_W
\sum_a
\|\mathbf A^{\mathrm{ME}}_a(T;\mathbf D)\|^2 dT
\right)^{1/2}
+\varepsilon_0
}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-aee97242a02ad6b6)

The rerun may proceed toward monodromy only if
$$
\mathcal{R}_{\mathrm{1per}}\le 0.02
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7579aacacf0ef4a6)

with $\mathbf D_{a,\ell}(T)$, the basis terms $\mathbf A_{a,B}$, the coefficient rule for $\alpha_B$, and any held-out interval declared before fitting. In the residual, $a$ runs over the six architrinos, $\mathbf A^{\mathrm{ME}}_a(T;\mathbf D)$ is the Master Equation acceleration of architrino $a$ evaluated on the corrected carrier with the causal roots solved on that carrier, $\mathbf A_{a,B}(T;\mathbf D)$ are the declared basis terms for the self-hit, partner-hit, and inter-binary channels, $\alpha_B$ are their scalar coefficients under the predeclared rule, the norm is the Euclidean norm on $\Sigma_T$, and $\varepsilon_0$ is a predeclared positive floor with the units of the denominator that keeps the ratio finite. The residual therefore tests whether the declared basis represents the Master Equation acceleration on the corrected carrier over one period; it does not by itself test whether the carrier satisfies the Master Equation. That acceleration-balance residual, the mismatch between the carrier's kinematic acceleration $d^2\mathbf X_{a,\ell}^{\star}/dT^2$ and $\mathbf A^{\mathrm{ME}}_a$ over the same window within its declared tolerance, must also pass before the rerun proceeds to monodromy, $\Delta_{\mathbf{k}}$, or $\eta$-ladder persistence, as [Well-posedness and Regularization](../../../../markdown/aaa/validation/simulations/action-energy/well-posedness-and-regularization.md) requires. A scalar-basis no-go is therefore a chart or basis failure. It becomes a no-go for the declared search class only when every admissible corrected carrier and branch-native basis inside that class fails the same residual boundary, and even then the negative applies to the tested class and domain rather than to every $A_0$ candidate.

#### Tier 2: Energy and Shielding

Tier 2 begins only after Tier 1 passes. It computes the internal-energy ledger and far-field shielding extraction described in [Energy](../../../../markdown/aaa/dynamics/energy.md). The required outputs are:

- $E_1$, $E_2$, $E_3$, and $E_{\text{internal}}(A_0)$;
- interaction and wake/history bookkeeping with no double counting;
- far-field wake coefficients $\mathcal{L}(\hat{\mathbf{R}})$ over extraction radii and angular grids;
- the naive constituent sum $\mathcal{L}_{\text{naive}}$ and the leading isotropic projection $\Pi_0\mathcal{L}$, where the reference norm $\|\mathcal{L}_{\text{naive}}\|$ is the sum of the norms of the individual unshielded constituent contributions in the same basis, not their signed sum, which vanishes for a neutral assembly and would leave $\zeta(A_0)$ undefined;
- $\zeta(A_0)$ from the leading isotropic projection;
- anisotropic leakage $\mathcal{L}_{\text{aniso}}=(1-\Pi_0)\mathcal{L}$ retained as a separate tensor or channel list;
- convergence status under extraction radius, angular resolution, $\Delta T$, history-window, and $\eta$ refinement.

Tier 2 fails if particle masses, charged-lepton ratios, electron radius, or the measured fine-structure constant $\alpha$ enter as inputs.

#### Tier 3: Medium-Response Probe

Tier 3 begins only after Tier 2 passes. It applies small acceleration and gradient probes to the accepted branch and extracts the homogeneous baseline for $\mathcal{M}_{\text{sea}}^{ab}$. The probe must report whether the acceleration and gradient channels share the same shielded-energy coefficient to first order, which is the recovery target corresponding to the observer-level equality of inertial and gravitational response, and it must report response anisotropy separately from both $\mathcal{A}_{\mathrm{gv}}^{ij}$ and $\mathcal{L}_{\text{aniso}}$.

#### Acceptance Boundary

The $A_0$ branch is not an attractor until Tier 1 passes. It is not a mass-map result until Tier 2 passes. It is not an inertial-response result until Tier 3 passes. A reported group-velocity anisotropy tensor is a deformation diagnostic, not a shielding extraction and not a substitute for the Noether sea response probe.

### Synthetic Observables

The virtual $\mathbb{U}_{\text{now}}$ perspective provides a canonical log of the [complete modeled state](../../../../markdown/aaa/foundations/ontology.md), meaning every modeled entity and its history at the same absolute time $T$, the one universal clock that orders the [Euclidean void](../../../../markdown/aaa/foundations/euclidean-void.md). The entities are [architrinos](../../../../markdown/aaa/foundations/architrino.md), point transceivers of fixed polarity, each of whose past positions emits a causal wake, an expanding spherical disturbance that travels outward at the wake speed $c_f$; the complete state $\mathbb{U}_{\text{now}}\equiv S(T)$ therefore holds every architrino's position, velocity, polarity, and the retained path history that the delayed acceleration law of the [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md) reads. Detector-like synthetic observables are post-processed from that log through a declared model of a [Physical Observer](../../../../markdown/aaa/spacetime/observer-framework.md#physical-observers), an assembly-built clock or detector embedded in the [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md), so exact simulation bookkeeping remains distinct from the quantities that stand in for measurements. We work in normalized wake-speed units with $c_f=1$; the definitions below keep $c_f$ symbolic so that the dimensions of each quantity stay visible.

#### $\mathbb{U}_{\text{now}}$ Logging Standard

The canonical $\mathbb{U}_{\text{now}}$ universe-state perspective is used across all simulation tiers of the [Simulation Run Protocols](../../../../markdown/aaa/validation/simulations/run-protocols.md) for logging, diagnostics, and synthetic datasets. It is not a physical device: the perspective is the complete ledger $\mathbb{U}_{\text{now}}\equiv S(T)$ itself, and logging it is a bookkeeping operation on the full microstate, carried out by the $\mathbb{U}_{\text{now}}$ sensors defined next rather than by any observer inside the simulated universe.

##### Definition
A $\mathbb{U}_{\text{now}}$ log is produced by an array of **$\mathbb{U}_{\text{now}}$ sensors**: fixed virtual probes that read the complete universe state $\mathbb{U}_{\text{now}}$ directly at declared sample points, as the [Master Simulation Protocol](../../../../markdown/aaa/validation/simulations/run-protocols.md#master-simulation-protocol-absolute-frame) requires. A sensor is a simulation instrument, not a Physical Observer: it is not an architrino, it emits no wake, receives no acceleration, and carries no clock of its own. The log is defined by:
- Fixed Euclidean sample points or declared sensor worldlines $\{\mathbf X_k\}$ in a declared coordinate scaffold on $\mathbb{R}^3$; for a moving sensor every condition below uses its position at the reception time
- Access to the full state $S(T) = \{(\mathbf X_i(T), \mathbf V_i(T), q_i, \dots)\}$ for all architrinos, where the ellipsis stands for the retained path-history and provenance data that the delayed dynamics require
- Output channels:
  - Local potential $\Phi(\mathbf X_k,T)$: the mollified bookkeeping potential $\Phi_\eta$ reconstructed from the superposed causal wakes of the run at its declared causal-wake-surface width $\eta$, as the [Master Simulation Protocol](../../../../markdown/aaa/validation/simulations/run-protocols.md#master-simulation-protocol-absolute-frame) defines it; an evaluation channel for comparison, not the substrate law
  - Local gradient $\nabla_{\mathbf X}\Phi(\mathbf X_k,T)$ (a potential-gradient channel, read as an acceleration proxy only under the declared calibration; the substrate acceleration is the per-hit sum of the [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form), which enters the log through the provenance table's contribution strength and the retained worldlines in $S(T)$)
  - Optional local Noether sea state variables (e.g., the Noether braid density $\rho_{\text{NS}}$, alignment/orientation metrics)
  - Causal wake surface provenance/event tags: for each received contribution at $(\mathbf X_k,T_r)$, record `transmitter_id` together with the emission time $T_t$, satisfying $\| \mathbf X_k - \mathbf X_{\text{transmitter}}(T_t)\| = c_f (T_r - T_t)$, the causal-time condition that the wake surface emitted at $T_t$ has expanded exactly to the sensor by the reception time $T_r$; each such $T_t$ is a causal root of that reception event
  - Photon packet provenance when a radiation channel is declared: transmitter event, path segment, before/after frequency, recoil or medium-energy exchange, remnant entry, and signed exchange residual
  - Optional finite-window operator diagnostics for declared reconstructed channels $\mathbf{Y}_\eta$, including the Gauss, Stokes, and wake-surface normalization residuals defined under the validation checks below

##### Minimal synthetic products
- Time series: $\Phi(T)$, $\nabla_{\mathbf X}\Phi(T)$ at fixed points ("stationary detectors")
- Snapshot potential maps: $\Phi(\mathbf X,T_\ast)$, $\nabla_{\mathbf X}\Phi(\mathbf X,T_\ast)$ over grids at a fixed evaluation time $T_\ast$
- Provenance tables: `receiver_id`, $T_r$, `transmitter_id`, $T_t$, `contribution_strength`; the emission-time column is also carried as the compatibility field `t_emit` declared in the [run protocol](../../../../markdown/aaa/validation/simulations/run-protocols.md#runtime-instantiation)
- Propagation diagnostics: arrival-time distributions, dispersion tests, effective $c_{\text{eff}}$ estimates. Primitive wakes propagate at exactly $c_f$ by construction, so at the sensors their arrival times are checked against the causal-time condition above, which for a transmitter at rest and a sensor at distance $r_k$ from it is the closed form $T_r=T_t+r_k$ used by [Architrino Simulation Tests](../../../../markdown/aaa/validation/simulations/architrino.md); a dispersion test or an estimate of the dressed assembly-channel speed $c_{\text{eff}}$ applies only to a declared assembly-level signal propagating through a retained Noether sea population
- Coarse kinetic moments when a continuum reduction is claimed: density, current, momentum-current tensor, energy-flux vector, and memory-current residuals derived from the same event-root records, meaning the per-hit records of solved causal roots
- Stochastic summaries when a noise model is claimed: drift vector, diffusion tensor, first two distribution moments, and direct ensemble comparison against event-root histories
- Reaction-diffusion probes when pattern or front language is claimed: front speed, unstable-mode band, selected wavelength, and conservation or source ledger for each reaction term
- Jet/outflow source products when a collimated release or working surface is claimed: beam radius, head radius, bow-shock speed, Mach number, jet-to-ambient density ratio, knot spacing, cooling ratio, synthetic line map, synthetic synchrotron map, inverse-Compton map, polarization fraction, and polarization angle
- Cosmology-facing photon products when redshift is inferred: total $Z_X$, endpoint/source/launch/path decomposition, signed path-frequency exchange $Y_{X,\mathrm{path}}$, packet-cadence stretch, flux factors, and image-sharpness diagnostics, in the logarithmic redshift-budget convention of the [Redshift-Budget Toy Model](../../../../markdown/aaa/validation/simulations/redshift-budget-toy-model.md#replay-equation)

##### Mapping: $\mathbb{U}_{\text{now}}$ data → Physical observables
Synthetic observables must be generated by post-processing $\mathbb{U}_{\text{now}}$ logs with a model of a *physical* observer (assembly clock/detector), a [Physical Observer](../../../../markdown/aaa/spacetime/observer-framework.md#physical-observers) in the sense of the Observer Framework. This post-processing is the observer projection described in [Ontology](../../../../markdown/aaa/foundations/ontology.md), a deliberate sequence of losses from the complete state to an accessible record, so a synthetic observable is a finite-precision record rather than a second copy of the state:
1. Extract local Noether sea state along the detector worldline $\mathbf X_{\text{det}}(T)$
2. Compute derived detector clock time $\tau_{\text{det}}$ via the declared clock map $d\tau = F(\text{Noether sea state}, \mathbf V_{\text{det}}, \Phi, \nabla_{\mathbf X}\Phi, \dots)\,dT$, the shorthand for the counted-phase clock channel $d\tau_{\mathcal A}=(\Omega_{\mathcal A}/\Omega_{\mathcal A}^{(0)})\,dT$ declared in [Proper Time and Time Dilation](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md); here $\mathbf V_{\text{det}}$ is the detector's group velocity, and an observer comparison projects the result to the observer-chart rate $d\tau/dt_{\mathrm{eff}}$ as that chapter requires
3. Generate detector-like outputs:
   - clock readings $\tau(T)$
   - photon arrival times and frequency shifts, with signed exchange entries separated from endpoint cadence and launch geometry
   - inferred "geodesics" (effective paths) from travel-time minimization through the Noether sea effective signal speed $c_{\text{eff}}$, an observer-level comparison construct whose effective-metric closure remains a recovery target

Synthetic observables are envelope-limited: each is valid only within the scope envelope that the [Master Simulation Protocol](../../../../markdown/aaa/validation/simulations/run-protocols.md#master-simulation-protocol-absolute-frame) declares for the run, its spatial domain, absolute-time span, entity count, resolution, history depth, output channels, and feedback mode. A detector-like output should carry the sampling cadence, aperture or worldline, sensitivity threshold, and intervention context that generated it. A reduced channel, such as a kinetic moment or a drift-diffusion surrogate, is justified for a declared observable only after that observable's dependence on the retained information has been derived and the effect of the discarded information bounded; agreement of a summary statistic with the direct ensemble on the compared moments does not by itself establish that the summary suffices for other claims. When a near-threshold branch, reaction, or record-forming event can flip under unresolved perturbations, the packet should report a threshold margin and alternate-outcome band instead of promoting one microhistory as uniquely observed.

##### Validation checks (must pass)
- **Causality residual (per record $m$):**
  $$
  \rho_m \equiv
  \frac{\left|\|\mathbf X_k-\mathbf X_{i_m}(T_{t,m})\|-c_f\,(T_m-T_{t,m})\right|}
  {\max(c_f\Delta T,\varepsilon_r)}
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-6ff7273d4e81cb6c)

  where $\mathbf X_k$ is the sensor position, $i_m$ is the transmitter identity of record $m$, $T_{t,m}$ its solved emission time, $T_m$ its reception time (the $T_r$ of the provenance table), $\Delta T$ the absolute-time step, and $\varepsilon_r>0$ is a predeclared floor with units of length. The numerator is the defect of the causal-time condition for the logged root, the transmitter-to-sensor distance at emission minus the distance the wake has travelled, measured against one step's wake travel; this residual is a dimensionless root-condition defect and is unrelated to the wake-surface density $\rho_{m,\eta}$ of the normalization check below. Pass if at least $99.9\%$ of records satisfy $\rho_m\le 10^{-2}$ and $\max_m \rho_m \le 5\times 10^{-2}$.

- **Temporal ordering check:**
  $$
  \theta_m \equiv \frac{T_{t,m}-T_m}{\Delta T}
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-7ac22ecc1b685464)

  Here $\theta_m$ is the emission time minus the reception time of record $m$ in units of the step, so a legal hit has $\theta_m<0$ and a positive value would mean a wake received before it was emitted. Pass if fraction with $\theta_m>10^{-9}$ is $\le 10^{-6}$. A record with $\theta_m=0$ within the same tolerance is a coincident-time root, which the convention $H(0)=0$ of the [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#conventions-and-exclusions) excludes; such records are reported as excluded rather than counted as passing hits.

- **Cross-integrator parity:** For any channel $Y$ logged by two integrators $A$ and $B$ at matched resolution, use a predeclared floor $\varepsilon_{0,Y}$ with the same units as the norm of $Y$:
  $$
  E_{\mathrm{rel}}(Y;A,B)\equiv
  \frac{\|R(Y_B)-Y_A\|_{L^2}}{\|R(Y_B)\|_{L^2}+\varepsilon_{0,Y}}
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-45d921bacfcb3108)

  Here $R$ restricts run $B$ to run $A$'s sampling grid, and $\|\cdot\|_{L^2}$ is the normalized root-mean-square norm over the window and sensor set defined in [Convergence Tests](../../../../markdown/aaa/validation/simulations/convergence-tests.md#comparison-metrics-required), so that the floor keeps one meaning whatever the sample count. Pass if $E_{\mathrm{rel}}(\Phi)\le 0.03$ and $E_{\mathrm{rel}}(\|\nabla\Phi\|)\le 0.05$. Passing shows implementation parity on the declared channels; it is not an independent correctness oracle.

- **Finite-window Gauss/Stokes residuals:** for any declared reconstructed vector channel $\mathbf{Y}_\eta$ on $\Sigma_T$, use
  $$
  R_G[V,T;\mathbf{Y}_\eta]\equiv
  \frac{\left|\int_{\partial V}\mathbf{Y}_\eta\!\cdot\!\hat{\mathbf{n}}\,dS-\int_V\nabla\!\cdot\!\mathbf{Y}_\eta\,dV\right|}
  {\int_{\partial V}\left|\mathbf{Y}_\eta\!\cdot\!\hat{\mathbf{n}}\right|\,dS+\int_V\left|\nabla\!\cdot\!\mathbf{Y}_\eta\right|\,dV+\varepsilon_G}
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-de36de38c8014c6a)

  and
  $$
  R_S[S,T;\mathbf{Y}_\eta]\equiv
  \frac{\left|\oint_{\partial S}\mathbf{Y}_\eta\!\cdot dX^i-\int_S(\nabla_{\mathbf X}\times\mathbf{Y}_\eta)\!\cdot\!\hat{\mathbf{n}}\,dS\right|}
  {\oint_{\partial S}\left|\mathbf{Y}_\eta\!\cdot dX^i\right|+\int_S\left|(\nabla_{\mathbf X}\times\mathbf{Y}_\eta)\!\cdot\!\hat{\mathbf{n}}\right|\,dS+\varepsilon_S}
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-71bcfdb75185b2f8)

  Here $V$ is a declared volume with closed boundary surface $\partial V$, $S$ a declared surface with boundary loop $\partial S$, $\hat{\mathbf n}$ the unit normal (outward on $\partial V$, oriented consistently with the traversal of $\partial S$ on $S$), $dS$ and $dV$ the surface and volume elements, and the line element of $R_S$ is $dX^i$ contracted with the components of $\mathbf Y_\eta$. Gauss's theorem states that the outward flux of a smooth vector field through a closed surface equals the volume integral of its divergence, and Stokes's theorem states that the circulation of a smooth field around a closed loop equals the flux of its curl through any spanning surface; both hold exactly on the flat slice $\Sigma_T$, so each numerator vanishes for the continuum channel and a nonzero residual measures the discretization or reconstruction defect. $\varepsilon_G$ and $\varepsilon_S$ are predeclared floors with the units of their respective integral channels. Pass if both residuals are $\le 2\times10^{-2}$ on resolved windows and decrease under spatial refinement. These are diagnostics on reconstructed continuum channels, not claims that the channel is substrate ontology.

- **Distributional wake-surface normalization:** for emitted wake surface $m$ with source strength $q_m$, causal delay $\Delta_m=T-T_{t,m}$, and radial annulus $R_-\le r_m\le R_+$ around the emission point, use
  $$
  Q^{\mathrm{ann}}_{m,\eta}=
  q_mH(\Delta_m)\int_{R_-}^{R_+}\delta_\eta(r_m-c_f\Delta_m)\,dr_m
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-68fb0e6740be2980)

  and
  $$
  R_{N,m}\equiv
  \frac{\left|\int_{R_-\le r_m\le R_+}\rho_{m,\eta}(T,\mathbf X)\,dV-Q^{\mathrm{ann}}_{m,\eta}\right|}
  {|q_m|+\varepsilon_q}
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-16c23eb963833104)

  Here $r_m$ is the distance from the emission point, $\delta_\eta$ is the Gaussian mollifier of width $\eta$, $H$ is the Heaviside step with $H(0)=0$, and $\rho_{m,\eta}(T,\mathbf X)=q_m\,\delta_\eta(r_m-c_f\Delta_m)H(\Delta_m)/(4\pi r_m^2)$ is the mollified wake-surface density of the [mathematics style guide](../../../../markdown/aaa/archie/mathematics-style-guide.md#distributions-and-regularization-causal-wake-surfaces). The check holds because the $1/(4\pi r_m^2)$ surface density cancels the shell volume element $4\pi r_m^2\,dr_m$, so the volume integral of the continuum density over any annulus equals $Q^{\mathrm{ann}}_{m,\eta}$ exactly, whether or not the annulus contains the whole surface; a nonzero residual therefore measures the discretized reconstruction, not the definition. $\varepsilon_q$ is a predeclared source-strength floor with the same units as $q_m$. Pass if at least $99.9\%$ of emitted wake surfaces satisfy $R_{N,m}\le 10^{-2}$ and the maximum resolved-window residual is $\le 5\times10^{-2}$.

- **Photon-frequency exchange closure:** when a photon packet changes frequency during transport, the logged before/after frequencies must close with medium, recoil, and remnant entries:
  $$
  R_{\nu\text{-}\mathrm{ex},m}
  =
  \frac{
  \left|
  E_\gamma(\nu_m^{+})-E_\gamma(\nu_m^{-})
  +\Delta E_{\mathrm{med},m}
  +\Delta E_{\mathrm{recoil},m}
  +\Delta E_{\mathrm{rem},m}
  \right|
  }
  {\varepsilon_{\nu\text{-}\mathrm{ex}}}
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-052bcc73fc3ef5ff)

  Here $E_\gamma(\nu)$ is the declared photon-channel energy map, $\nu_m^{-}$ and $\nu_m^{+}$ are the logged frequencies before and after exchange event $m$, each $\Delta E$ is the energy gained by the named reservoir (the intervening medium, the recoiling assembly, and the remnant), so the bracketed sum vanishes exactly when the exchange conserves energy, and $\varepsilon_{\nu\text{-}\mathrm{ex}}>0$ is a predeclared photon-exchange tolerance with units of energy, the tolerance the toy model writes $E_{\mathrm{tol}}$; it is distinct from the normalized energy-drift observable $\epsilon_E$ in [Convergence Tests](../../../../markdown/aaa/validation/simulations/convergence-tests.md). Pass if $R_{\nu\text{-}\mathrm{ex},m}\le1$. The medium, recoil, and remnant entries use the same signed balance equation and outcome-neutral ledger convention defined in the [Redshift-Budget Toy Model](../../../../markdown/aaa/validation/simulations/redshift-budget-toy-model.md#replay-equation). The observer-level comparison $E_\gamma=h\nu$ may be used only as a labeled recovery calibration after the $\mathbb{A}\mathbb{A}\mathbb{A}$ map is declared; it is not an architrino-level premise. A cosmology-facing redshift or blueshift product may consume this entry only after the residual is reported with the same photon provenance used for arrival-time, flux, and image-sharpness outputs.

- **Operator consistency across PDE and event-root runs:** when the same reconstructed channel is produced both by a partial-differential-equation (PDE) reduction on a grid and by direct event-root evaluation, resample the event-root reconstruction onto the PDE grid and define
  $$
  \Delta\mathbf{Y}_\eta\equiv
  \mathbf{Y}^{\mathrm{PDE}}_\eta-R(\mathbf{Y}^{\mathrm{root}}_\eta),
  \qquad
  E_{\mathrm{op}}(W)\equiv
  \frac{\left\|\Delta\mathbf{Y}_\eta\right\|_{L^2(W)}}
  {\left\|R(\mathbf{Y}^{\mathrm{root}}_\eta)\right\|_{L^2(W)}+\varepsilon_{0,Y}}
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-7ed20edd08550fc8)

  Here $R$ is that resampling, $W$ is the declared validation window, the norm is the same normalized root-mean-square norm as in the cross-integrator check, and $\varepsilon_{0,Y}$ is the floor for that channel; the Gauss and Stokes residuals $R_G$ and $R_S$ are reported for each of the two channels separately on the same $V$ and $S$, because those residuals test whether a channel satisfies the integral identities, not how far two channels lie apart. Pass if $E_{\mathrm{op}}\le0.03$ on the declared validation windows and decreases under temporal/history/spatial refinement, with both channels' own Gauss/Stokes residuals passing. This is a parity check on the common observable map, not independent evidence for that map or the canonical law.

- **Curvilinear-coordinate hygiene:** finite-window residuals must use the coordinate weights and operator formulas of the declared Euclidean scaffold. In spherical coordinates $(r,\theta,\varphi)$,
  $$
  w_V=r^2\sin\theta\,\Delta r\,\Delta\theta\,\Delta\varphi,\qquad
  w_{S_R}=R^2\sin\theta\,\Delta\theta\,\Delta\varphi
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-e4643ea121b6bf2e)

  and a radial channel must evaluate $\nabla\!\cdot(F_r\hat{\mathbf{r}})$ as
  $$
  \frac{1}{r^2}\frac{\partial}{\partial r}\!\left(r^2F_r\right)
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-abc15d6ef5fa2b06)

  not as $\partial_rF_r$. Here $w_V$ is the volume weight of a cell of extents $(\Delta r,\Delta\theta,\Delta\varphi)$, $w_{S_R}$ is the surface weight on the sphere $S_R$ of radius $R$ (a radius, unrelated to the resampling operator $R(\cdot)$, which always appears with its argument), and $F_r$ is the radial component of the channel; the second form is the divergence of a radial field in spherical coordinates, and the bare radial derivative omits the $2F_r/r$ term that the change of shell area with radius contributes. Fail the run if the coordinate scaffold does not declare these weights.

- **Provenance distribution agreement:** for `t_emit` distributions, require
  $$
  D_W \equiv \frac{W_1(P_A,P_B)}{\mathrm{IQR}(P_B)+\varepsilon_T} \le 0.08,
  \qquad
  D_{JS}\equiv \mathrm{JSD}(P_A\|P_B)\le 0.03
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-1c462490bd67bf21)

  Here $P_A$ and $P_B$ are the distributions of solved emission times over the provenance records of the two compared runs, $W_1$ is the 1-Wasserstein distance, the smallest average displacement of emission-time mass that turns one distribution into the other, $\mathrm{IQR}(P_B)$ is the interquartile range of the finer run's distribution, $\varepsilon_T$ is a predeclared absolute-time floor, and $\mathrm{JSD}$ is the Jensen–Shannon divergence with logarithm base $2$, evaluated on the discretization declared before the run and shared by both runs, as [Convergence Tests](../../../../markdown/aaa/validation/simulations/convergence-tests.md#comparison-metrics-required) requires, because raw continuous samples have disjoint support and would give $D_{JS}=1$ whatever the agreement. The letters $P_A$ and $P_B$ name distributions; the period of a pulsed inlet below is written $P$ as a cycle period.

- **Kinetic-moment closure:** for any promoted continuum observable, compute the direct event-root moments
  $$
  \rho_{\mathrm{dir}},\quad
  \mathbf{j}_{\mathrm{dir}},\quad
  \Pi_{\mathrm{dir}}^{ij},\quad
  \mathbf{J}_{e,\mathrm{dir}}
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-a3a1b083c3f39089)

  and compare them with the reduced continuum reconstruction. Here $\rho_{\mathrm{dir}}$ is the direct density of the declared kind (architrino count or polarity-weighted), $\mathbf{j}_{\mathrm{dir}}$ its velocity-weighted current, $\Pi_{\mathrm{dir}}^{ij}$ the second velocity moment, and $\mathbf{J}_{e,\mathrm{dir}}$ the flux of the declared energy bookkeeping; the names momentum-current and energy-flux belong to assembly-level bookkeeping through the declared bulk conversion, since architrinos carry no mass. The reduced channel must report
  $$
  R_{\mathrm{mom}}
  =
  \max_Y
  \frac{
  \left\|Y_{\mathrm{cg}}-R(Y_{\mathrm{dir}})\right\|_{L^2(W)}
  }{
  \left\|R(Y_{\mathrm{dir}})\right\|_{L^2(W)}+\varepsilon_{0,Y}
  }
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-4417dca37385cf10)

  where $Y$ ranges over the retained density, current, momentum-current, and energy-flux channels, $Y_{\mathrm{cg}}$ is the reduced continuum channel, and $R(Y_{\mathrm{dir}})$ is the direct moment resampled onto its grid. Pass if $R_{\mathrm{mom}}\le0.05$ and the omitted memory-current residual, the contribution of unresolved path history that the reduced moment equations drop, decreases under refinement.

- **Drift-diffusion reconstruction:** if a Fokker-Planck or Langevin surrogate is emitted, a reduced description in which unresolved architrino history enters a reduced variable $z$ as noise, estimate drift and diffusion from increments over a declared coarse-graining interval $\Delta T_{\mathrm{cg}}$,
  $$
  u^a(z)
  =
  \frac{\langle\Delta z^a\rangle_z}{\Delta T_{\mathrm{cg}}},
  \qquad
  D^{ab}(z)
  =
  \frac{\langle\Delta z^a\Delta z^b\rangle_z}{2\Delta T_{\mathrm{cg}}}
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-fd952a25a000734c)

  Here $\Delta z$ is the increment of $z$ over $\Delta T_{\mathrm{cg}}$ and $\langle\cdot\rangle_z$ is the average over direct event-root histories passing through $z$. The interval cannot be sent to zero: the substrate increments are deterministic and smooth, so $\Delta z$ scales as the interval and the second-moment quotient vanishes linearly with it; diffusion is a property of the coarse-grained description and exists only for $\Delta T_{\mathrm{cg}}$ longer than the correlation time of the unresolved history and shorter than the evolution time of $z$. The packet declares that interval and reports the estimates as stable across a declared range of it. The synthetic distribution must match direct event-root ensembles in $\langle z\rangle$ and $\operatorname{Cov}(z)$ before higher stochastic claims are trusted. Higher cumulants may differ from the surrogate unless a separate closure entry has been declared.

- **Reaction-diffusion and pattern probes:** when a reduced scalar or multi-channel field $y$ obeys
  $$
  \partial_T y^a
  =
  D^{ab}\nabla^2 y_b
  +
  F^a(y)
  +
  R_{\mathrm{rd}}^a
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-934747a7edb23032)

  with $y^a$ the reduced channels, $D^{ab}$ their diffusion matrix, $\nabla^2$ the Euclidean Laplacian on $\Sigma_T$, $F^a(y)$ the local reaction term, and $R_{\mathrm{rd}}^a$ the residual the reduction leaves unmodeled, the packet must report the fixed points, the linearized growth matrix, the unstable wavenumber band if one exists, and the front-speed estimate if a traveling-front claim is made. For two-channel pattern claims, the Turing-style gate, a diffusion-driven instability, is that the homogeneous fixed point is stable before diffusion and that the diffusion-shifted linear operator has a declared finite unstable band. Without those entries, visual pattern formation is not a validated synthetic observable.

- **Jet/outflow head and radiation probes:** when a simulation claims an astrophysical jet, outflow, knot chain, or working surface, the synthetic packet must compare the logged event-root dynamics to the observer-level jet-head and radiation benchmarks of [Synchrotron](../../../../markdown/aaa/reactions/synchrotron.md#jet-and-outflow-source-benchmarks). For a supersonic head with jet speed $v_j$, beam radius $R_j$, head radius $R_h$, density ratio $\eta_j=\rho_j/\rho_a$ (the jet-to-ambient mass-density ratio, unrelated to the regularization width $\eta$), and $a_h=(R_j/R_h)^2$, the bow-shock speed target is
  $$
  v_{\mathrm{bs,std}}
  =
  v_j
  \left[
  1+(\eta_j a_h)^{-1/2}
  \right]^{-1}
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-0dedd040f9d66e89)

  This is the advance speed of the jet head, the working surface at which the beam's ram pressure balances the ambient medium's, obtained by solving that balance, $\rho_j(v_j-v_{\mathrm{bs,std}})^2R_j^2=\rho_a v_{\mathrm{bs,std}}^2R_h^2$, for the head speed: a light jet with $\eta_ja_h\ll1$ advances slowly and a heavy one at nearly $v_j$. The bow shock itself runs ahead of that surface by a shock-jump factor, so the mapped speed $v_{\mathrm{bs,map}}$ must be measured as the same head-advance speed, and the packet states which surface it tracks. The head residual is
  $$
  R_{\mathrm{head}}
  =
  \left|
  \frac{v_{\mathrm{bs,map}}}{v_{\mathrm{bs,std}}}
  -1
  \right|
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-1a782a336acb1682)

  For radiative shocks, also report
  $$
  \mathcal{R}_{\mathrm{cool}}
  =
  \frac{t_{\mathrm{cool}}}{t_{\mathrm{dyn}}},
  \qquad
  t_{\mathrm{dyn}}\sim\frac{\ell_j}{v_j}
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-8a0d4df15f3b9d02)

  where $t_{\mathrm{cool}}$ is the radiative cooling time of the shocked gas and $t_{\mathrm{dyn}}$ the flow time across the jet length scale $\ell_j$, both observer-level comparison timescales, and route the synthetic emission to thermal line/free-free entries when $\mathcal{R}_{\mathrm{cool}}\ll1$ (the gas cools before it flows away), or to adiabatic, particle-acceleration, synchrotron, inverse-Compton, cocoon, and lobe entries when $\mathcal{R}_{\mathrm{cool}}\gg1$. If a pulsed inlet is declared with period $P$, the knot spacing should report
  $$
  R_{\mathrm{knot}}
  =
  \left|
  \frac{\Delta x_{\mathrm{knot}}}{v_jP}
  -1
  \right|
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-a616e48e6d3fc870)

  up to projection, cooling, and deceleration corrections named in the packet, where $\Delta x_{\mathrm{knot}}$ is the measured spacing of successive knots along the jet and $v_jP$ is the spacing a pulse train advancing at $v_j$ lays down. For synchrotron-bearing jets, the same run must emit $I_\nu^{\mathrm{syn}}$, $I_\nu^{\mathrm{IC}}$, $\Pi_\nu$, and $\psi_\nu$ maps (synthetic synchrotron and inverse-Compton intensities and the linear-polarization fraction and angle) from one effective $B_{\mathrm{eff}}\leftrightarrow\mathcal{V}_{\mathrm{NS}}$ reconstruction, the provisional map from anisotropic Noether sea response to an observer-level magnetic amplitude that the Synchrotron chapter owns. These are observer-level comparison variables; passing them does not promote magnetohydrodynamic (MHD) fields into substrate ontology.

- **Convergence triad:** must pass temporal/history/spatial gates from [convergence-tests.md](../../../../markdown/aaa/validation/simulations/convergence-tests.md), including null-test failure.

##### Failure mode
If any of the quantitative checks above fail (or if the null test does not fail), treat $\mathbb{U}_{\text{now}}$ outputs as numerically unreliable for any promoted claim, including claims about self-hit, an architrino's encounter with its own earlier wake, until thresholds are met.

##### $\mathbb{U}_{\text{now}}$ as Standard Probe

1. **Definition**: The $\mathbb{U}_{\text{now}}$ universe-state perspective is the complete ontic state $\mathbb{U}_{\text{now}}\equiv S(T)$ on one absolute-time slice; reading it is a non-physical bookkeeping operation on the full microstate, performed by $\mathbb{U}_{\text{now}}$ sensors rather than by any assembly inside the simulation.
2. **Synthetic Observables**:
    - **Raw Data**: Time series of $\Phi(\mathbf X,T)$ at fixed points.
    - **Post-Processing**: To simulate a physical detector, we act on the raw data by integrating the derived clock time $\tau$ of a "clock assembly" moving through the $\mathbb{U}_{\text{now}}$ grid.
3. **Separation of Concerns**: This explicitly separates Ontology (simulation state/$\mathbb{U}_{\text{now}}$ data) from Phenomenology (synthetic detector data).

##### Virtual Sensor & Data Extraction

* **Virtual Sensor:** A $\mathbb{U}_{\text{now}}$ sensor, the fixed virtual probe defined above, implements the $\mathbb{U}_{\text{now}}$ universe-state perspective for a run. It samples potential/gradient at fixed coordinates and is a simulation instrument, not a Physical Observer.
* **Post-Processing:** Convert $\mathbb{U}_{\text{now}}$ sensor data (Ground Truth) into Physical Observer data (what a moving clock measures).
* **Provenance:** Track transmitter identity and emission time for every potential contribution at a grid point.

### Branch / Quantum

#### A0 Tier 0 Result Interpretation

This note explains the mathematical information supplied by a reduced $A_0$ branch search. The symbol $A_0$ names one proposed neutral reference assembly: six architrinos, the polarity-bearing point transceivers of $\mathbb{A}\mathbb{A}\mathbb{A}$, arranged as three neutral binaries, each an electrino paired with a positrino, on the coincident-midpoint orthogonal-axis chart. The mass program in [Particle Masses](../../../../markdown/aaa/assemblies/particle-masses.md#reference-attractor-gate) uses it as one calibration-free candidate for the first mass-map output; it is a candidate to test, not an established object. The note is a companion to the [$A_0$ Branch Certificate Protocol](../../../../markdown/aaa/validation/simulations/a0-branch-certificate-protocol.md), the general [Simulation Run Protocols](../../../../markdown/aaa/validation/simulations/run-protocols.md), and the convergence standards in [Convergence Tests](../../../../markdown/aaa/validation/simulations/convergence-tests.md).

The certificate protocol proceeds in four tiers. Tier 0 is the reduced branch search treated here: a prescribed family of six worldlines, called a carrier chart, is sampled without evolving the dynamics, and the delayed root equations are solved on it. Tier 1 continues a surviving chart under direct delayed dynamics with the causal-wake-surface width $\eta>0$ still active; Tier 2 extracts internal energy and far-field shielding; Tier 3 probes the Noether sea response. Tier 0 tests whether a reduced branch chart satisfies the geometric and numerical conditions for continuation. It does not establish that the branch is physically realized, stable under the full delayed dynamics, or sufficient to support a mass-map claim.

A candidate geometry can satisfy preliminary consistency conditions without being a physical attractor, a closed cycle of the delayed dynamics to which nearby histories return. The distinction separates a useful search result from evidence for a stable assembly.

Tier 0 is not an attractor proof. It specifies consistency conditions for a reduced carrier chart before Tier 1 $\eta > 0$ continuation, where $\eta$ is the regulator width that gives each causal wake surface a small thickness so that root crossings and near-fold events remain computable; the regulator is defined in the [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#auxiliary-dual-mollified-regulator-for-proof-and-computation). Any future output must be read together with the mass thesis in [Particle Masses](../../../../markdown/aaa/assemblies/particle-masses.md), the energy ledger definitions in [Energy](../../../../markdown/aaa/dynamics/energy.md), the dynamics baseline in [Coincident-Midpoint Orthogonal-Axis Braid Dynamics](../../../../markdown/aaa/noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md#zero-axial-offset-three-binary-dynamics-and-interpretation), and the closure bookkeeping in [Parameter Ledger](../../../../markdown/aaa/validation/parameter-ledger.md).

No computed branch-search result is reported here. The conditions below define a proposed analysis and the limits of any result obtained from it. Every numerical instantiation of these conditions uses normalized wake-speed units with $c_f=1$; the symbol $c_f$ is kept in the definitions below so that the dependence stays visible.

##### Interpretation of a Candidate

A preliminary analysis distinguishes reduced coordinates, active causal roots, residual errors, and uncomputed dynamical quantities. A causal root is an earlier emission event whose expanding wake surface reaches the receiver exactly at the evaluation time; it is active when it contributes an admitted acceleration on the chart. Global rotations, the common closed-cycle phase, and permitted discrete relabelings must not be counted as distinct physical configurations. Excluded instantaneous self roots must not count as active interactions. Each residual requires a value or an explicit statement that it has not been evaluated.

Satisfying the preliminary conditions makes a geometry eligible for direct delayed-dynamics analysis. It does not establish an attractor, compute the far-field shielding factor $\zeta(A_0)$, the ratio of the leading isotropic part of the assembly's far-field wake to the naive constituent sum as defined in [Energy](../../../../markdown/aaa/dynamics/energy.md#apparent-energy-and-shielding), validate the internal energy $E_{\text{internal}}(A_0)$, or derive the Noether sea inertial-response tensor $\mathcal{M}_{\text{sea}}^{ab}$.

Tier 0 is a search over a declared finite domain: a carrier family, a sampling grid, an interaction basis, tolerances, a near-zero self-root threshold, and one value of $\eta$. Its negative results are measured statements about that domain. Failure of a compact coordinate chart does not falsify every possible $A_0$ branch; it excludes that chart on its tested carrier family, basis, and tolerances. An empty candidate set is likewise evidence only that this domain contains no candidate, and only once the search instrument has returned the known answer on a case whose root ledger is derived independently, for example the uniform circular binary whose self-hit threshold and delay equation are derived in [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md#circular-self-hit-threshold-at-the-wake-speed); a search that has not passed such a case cannot distinguish an empty domain from a defective instrument. A revised chart must specify its geometry, equality relations, adjustable parameters, held-out residual tests, phase convention, and excluded benchmarks before fitting. A successful coordinate test still supplies no evolved history.

##### Quotient-Coordinate Row

The reduced coordinate $z_\Lambda$ describes the geometry after quotienting away global rotations, the common $S^1_{\mathbf{k}}$ phase gauge, and allowed discrete relabelings $\Gamma_\Lambda$ that preserve polarity assignment, layer roles, speed ordering, and the [causal-root](../../../../markdown/aaa/foundations/architrino.md) branch class identifying which earlier emissions reach the receiver. Quotienting means that two carrier representatives related by one of these operations count as the same geometry. The rotations form the group $SO(3)$ of rigid rotations of the Euclidean void. The phase gauge $S^1_{\mathbf{k}}$ is the freedom to shift the time origin along the closed cycle, a single circle's worth of freedom because all three layers advance together over the return period $P_{\mathbf{k}}$ indexed by the winding vector $\mathbf{k}=(k_1,k_2,k_3)$. The relabelings $\Gamma_\Lambda$ are the finite set of index permutations that leave the declared chart data unchanged. The subscript $\Lambda$ names the branch class of the candidate, its winding integers and active-root classes, recorded in the table below. The word gauge here means a redundancy of the chart description; it is not the effective gauge symmetry of the observer-level Standard Model record. A layer is one of the three binaries regarded as a stratum of the reduced chart.

For this protocol only, the source-record layer aliases map to persistent indices by
$$
I\leftrightarrow1,\qquad M\leftrightarrow2,\qquad O\leftrightarrow3.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-cf884bbe20f012b6)

Persistent indices identify the binaries. The aliases describe the declared radial role on this one chart, with $I$ the smallest declared radius, $M$ the intermediate, and $O$ the largest, and do not relabel the taxonomy; the persistent indices $a\in\{1,2,3\}$ carry no radius, speed, or channel meaning of their own.

| Geometric information | Meaning |
| --- | --- |
| Radius ratios | $\varepsilon_{12}=R_1/R_2$ and $\varepsilon_{23}=R_2/R_3$, where $R_a$ is the declared radius of binary $a$; the aliases $\varepsilon_{IM}$ and $\varepsilon_{MO}$ are explanatory only under the declared map above |
| Period ratios | $P_I/P_M$ and $P_M/P_O$, where $P_I,P_M,P_O$ are the cycle periods for the declared layer aliases, so time-scale separation is checked alongside radius separation |
| Binary-2 speed offset | $(s_2-c_f)/c_f$ in the declared chart, where $s_a$ is the constituent speed of binary $a$ relative to the Euclidean void; with $c_f=1$ this is $s_2-1$, and its declared tolerance is the sense in which $s_M\approx c_f$ below |
| Ellipticity | the departure of each layer's path from a circle, and whether Tier 0 used a shared scalar chart with one ellipticity value for all three layers |
| Plane-normal Gram matrix | $G_{\ell m}$, the pairwise dot products of the unit normals to the three binary planes after quotient reduction; on the orthogonal-axis chart the target is the identity matrix, and departures record axis misalignment |
| Orientation | $\chi_N$, the sign of the signed volume spanned by the three plane normals (their triple product), with a nondegenerate status when that volume is nonzero and a degenerate status when the normals are coplanar |
| Circulation orientation | $H_1,H_2,H_3$, the circulation sense of each binary about its own plane normal, one sign per persistent index, with $H_I,H_M,H_O$ explanatory aliases only on this chart |
| Relative phase | $\Phi_{\text{rel}}$ status, the phase offsets between layers that remain after removing the common $S^1_{\mathbf{k}}$ phase origin; a gauge-fixed zero-offset representative alone does not establish the full phase quotient |
| Branch class | $[\Lambda]$ data from winding integers (the number of cycles each layer completes over $P_{\mathbf{k}}$), inter-layer closure, active and raw root classes, and excluded roots; the representative is not yet a certified discrete quotient |
| Removed symmetries | declared gauge removals: $SO(3)$, $S^1_{\mathbf{k}}$, and $\Gamma_\Lambda$ |
| Coordinate degeneracy | Failure of the proposed coordinate to distinguish the relevant geometric configurations after symmetry reduction |

The quotient row is not a new dynamical assumption. It is the coordinate audit that prevents a raw carrier chart, a gauge choice, and a branch class from being mistaken for three independent pieces of physics.

##### Near-Zero Self-Root Policy

The preliminary analysis distinguishes raw self-root sightings from active self-hit branches. A self root is a causal root whose transmitter and receiver are the same architrino: the worldline has re-entered its own earlier wake surface. A raw self root whose delay lies at or below the configured near-zero threshold is recorded but excluded from the active ledger as an instantaneous self-kick.

This policy extends the canonical convention $H(0)=0$, which excludes the coincident-time root $T_t=T_r$ exactly, to the resolution of the chart: a root whose delay cannot be separated from zero at the chart's sampling resolution is treated as that excluded coincident root. The reason the exclusion matters is geometric. A self root of delay $\Delta_{\text{self}}=T_r-T_t$ has separation $r=c_f\Delta_{\text{self}}$, so a near-zero delay places the receiver almost on top of its own emission site, where the inverse-square factor of the per-hit acceleration is unbounded; the [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#self-hit-condition) admits a self-hit contribution only on a retained branch with positive separation or explicit regularization data. The exclusion is conservative. It does not prove that no nearby regularized fold-layer branch exists; it says only that the diagnostic carrier has not yet supplied a positive-delay self-root branch that can be promoted. A chart that passes with a raw root excluded has passed as a truncated chart, and whether the excluded root is real remains an open question for that chart.

The threshold is not independent of the speed tolerance. On an exact circular layer of radius $R$ and constituent speed $s$, with $c_f=1$, a same-transmitter root exists only for $s>1$, and its smallest delay is $\Delta_{\text{self}}=R\delta_s/s$, where the delay angle solves $\delta_s=2s\sin(\delta_s/2)$; for $s=1+\mu$ with small $\mu>0$ this gives $\Delta_{\text{self}}\approx2R\sqrt{6\mu}$. The leading self root of the near-field-speed layer therefore approaches zero delay as the square root of the speed excess, and a near-zero threshold $\Delta_{\mathrm{thr}}$ excludes it whenever $\mu<(\Delta_{\mathrm{thr}}/2R)^2/6$. The threshold and the binary-2 speed tolerance must be declared together, and this square-root sensitivity is the mechanism by which raw sightings crowd the threshold on that layer. The delay equation and its threshold are derived in [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md#circular-self-hit-threshold-at-the-wake-speed).

The specified fold-layer diagnostic, the treatment of the layer whose declared speed sits near the onset of its own self root, where that root is born at a fold of the delay map with vanishing transmitter-side factor $D_t=c_f-\mathbf V_t\cdot\hat{\mathbf r}_t$ and hence a singular per-hit weight $c_f/\lvert D_t\rvert$, may preserve locked self-root contributions, contributions held at their sampled root keys rather than re-solved, as a candidate transition, but it does not by itself establish self-hit closure. A fold-layer candidate must satisfy the declared residual conditions in a corrected one-period branch-equation calculation; the non-symmetry Floquet gap $\Delta_{\mathbf{k}}$, defined under Floquet Stability below, and persistence under $\eta$ refinement require additional analysis.

##### Residual Semantics

A residual is the numerical mismatch between what the carrier chart asserts and what the delayed root equations return on it, measured against a declared tolerance. The complete residual vector is
$$
\mathcal{R}_{A_0}
=
\left(
\mathcal{R}_{\text{state}},
\mathcal{R}_{\text{root}},
\mathcal{R}_{\text{phase}},
\mathcal{R}_{E},
\mathcal{R}_{\text{drift}},
\mathcal{R}_{\text{speed}},
\mathcal{R}_{\text{avg}},
\mathcal{R}_{\text{lock}},
\mathcal{R}_{\text{leak}},
\mathcal{R}_{\text{Floquet}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ae45d430bea6eace)

Each component has a stated tolerance and interpretation. An uncomputed component is explicitly identified as uncomputed, not assigned zero.

The Tier 0 residual surface deliberately includes entries that are not computed at Tier 0:

| Residual | Tier 0 interpretation |
| --- | --- |
| $\mathcal{R}_{\text{state}}$ | Carrier-chart return mismatch over one declared period $P_{\mathbf{k}}$ |
| $\mathcal{R}_{\text{root}}$ | Active root defect on candidate causal-root branches: the residual of the causal-root condition on each admitted root |
| $\mathcal{R}_{\text{phase}}$ | Integer layer-winding mismatch: the departure of each layer's accumulated phase over $P_{\mathbf{k}}$ from its integer winding |
| $\mathcal{R}_{E}$ | Not computed at Tier 0; Tier 1 or Tier 2 must supply a regularized energy/history functional |
| $\mathcal{R}_{\text{drift}}$ | Centering check for the diagnostic chart; Tier 1 must retest under direct delayed dynamics |
| $\mathcal{R}_{\text{speed}}$ | Sign-aware violation of the intended $s_I > c_f$, $s_M \approx c_f$, $s_O < c_f$ ordering, recording on which side of $c_f$ each layer falls |
| $\mathcal{R}_{\text{avg}}$ | Diagnostic size of the interaction terms assigned to the averaging channel, those claimed to average out over the cycle |
| $\mathcal{R}_{\text{lock}}$ | Diagnostic fraction or defect of selected locking terms, the interaction terms claimed to hold the layers in their declared frequency relation |
| $\mathcal{R}_{\text{leak}}$ | Far-field leakage placeholder for the wake terms that survive cancellation at large distance, not a shielding extraction |
| $\mathcal{R}_{\text{Floquet}}$ | Not computed at Tier 0; Tier 1 must construct the monodromy diagnostic |

This makes the residual vector complete as an audit surface without implying that Tier 0 has done Tier 1 or Tier 2 work. A bounded residual establishes the chart's self-consistency under the instrument that solved its roots, at the declared tolerance; it is not independent evidence that the roots are correct, because the same root solver produced both the chart and its residual. Correctness of the solver rests on the independently derived known case named above, and the residual tolerances are declared protocol constants rather than derived quantities.

##### Floquet Stability

Tier 0 does not construct the monodromy operator, which describes perturbation evolution over one period: it maps a small perturbation of the candidate at the start of one return period $P_{\mathbf{k}}$ to the perturbation one period later. Floquet theory, the linear theory of perturbations about a periodic solution, reads stability from the eigenvalues of that operator, the multipliers: perturbations shrink when every multiplier that does not belong to an exact symmetry direction lies strictly inside the unit circle. The non-symmetry Floquet gap $\Delta_{\mathbf{k}}$ is the margin by which the largest such multiplier lies inside that circle. It is therefore uncomputed at Tier 0, not zero and not positive. Because the dynamics are delayed, the perturbed state is a history segment, so the operator acts on history perturbations and must include the variation of the root delays with the state; a finite projection of it supplies a numerical diagnostic, not a certificate.

A stability conclusion requires Tier 1 to construct the return map and evaluate the gap after excluding symmetry modes. The gap has a referent only for a candidate that itself returns under the full delayed acceleration law on the same retained history, that is, only once $\mathcal{R}_{\text{state}}$ and $\mathcal{R}_{\text{root}}$ are bounded on the evolved cycle rather than on the prescribed carrier. A spectrum computed about a carrier that the dynamics do not occupy has no dynamical referent, whatever its sign: it is void, neither a measured instability nor a measured stability. On an actual returning candidate, a computed $\Delta_{\mathbf{k}}\le0$ fails the attractor criterion stated in [Particle Masses](../../../../markdown/aaa/assemblies/particle-masses.md#reference-attractor-gate), which requires every non-symmetry multiplier inside the unit circle with numerical error controlled.

##### Preliminary Consistency Conditions

The reduced geometry must have nondegenerate quotient coordinates, retain its declared radius and period separation, satisfy $s_I > c_f$, $s_M \approx c_f$, and $s_O < c_f$ within tolerance, and close its layer windings over $P_{\mathbf{k}}$, meaning that each layer returns to its phase after its integer number of cycles within the declared return period. State-return, center-drift, and active-root residuals must be bounded by their declared tolerances. Partner, self, and inter-layer active root classes, whose transmitter is respectively the receiver's binary partner, the receiver itself, or an architrino of another layer, must be accounted for, and active separator roots require an explicit continuation rule. A separator is a boundary of the root structure at which roots are created, annihilated, or leave the retained history, classified in the [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#separator-taxonomy); a root sitting on one cannot be carried across it by the ordinary simple-root formula.

A candidate fails the corresponding test if coordinate degeneracy, scale collapse, incorrect speed ordering, open phase closure, excessive carrier or root residuals, uncontrolled averaging or locking errors, unresolved separator singularities, or an incomplete active-root inventory remains. Excluded instantaneous roots cannot establish self-hit closure. Missing energy or stability calculations remain explicit limitations.

##### Scope of the Preliminary Result

Tier 0 can only answer a finite branch-search question: does this reduced carrier chart have an active root ledger, controlled chart residuals, and no unresolved near-zero self-root obstruction?

It cannot answer the attractor question, because that requires Tier 1 direct delayed dynamics and a positive non-symmetry Floquet gap $\Delta_{\mathbf{k}}>0$. It cannot answer the mass-map question, because that requires Tier 2 energy and shielding extraction. It cannot answer the inertial-response question, because that requires Tier 3 acceleration and gradient probes for $\mathcal{M}_{\text{sea}}^{ab}$.

The safe reading is therefore:

$$
\text{Tier 0 pass}
\quad\Longrightarrow\quad
\text{eligible for Tier 1 continuation}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2ce658272c030da8)

not

$$
\text{Tier 0 pass}
\quad\Longrightarrow\quad
\text{accepted } A_0 \text{ attractor}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-04837b449761ec48)

These implications distinguish preliminary geometric consistency from dynamical and mass-map results. The negative direction is bounded the same way: a Tier 0 failure or an empty candidate set means that this chart, on this search domain, did not earn a continuation run; it does not establish that no $A_0$ branch exists.

#### Bell-Family Record-Measure Harness

This protocol gives the Bell-family residuals in [No-Go Theorems](../../../../markdown/aaa/validation/no-go-theorems.md) an executable scaffold. It is not a closure proof. It is a probability-table harness: it takes a proposed table of outcome probabilities for a Bell-type experiment and checks whether that table keeps the standard benchmark shape, before any claim is made that the table follows from [architrino](../../../../markdown/aaa/foundations/architrino.md) dynamics, in which the two polarities of architrino, electrino and positrino, accelerate one another along the line of action through delayed causal wakes. The objects a derivation would have to supply to this harness are pair provenance, apparatus kernels, and a finite-window record-basin measure; each is defined below where the harness first consumes it.

The immediate target is discipline, and the reason is that one Bell number is not enough. A candidate table may match a single CHSH average while failing GHZ parity, Hardy zero and positive-event structure, no-signaling, or measurement-independence accounting. The harness therefore evaluates CHSH, GHZ, Hardy, no-signaling, measurement-independence, and observed-factorization residuals in one packet, so that the deeper dynamics cannot claim success on one number.

Several terms below are owned by other chapters and are used here only as the labels of declared inputs. A Bell-type experiment sends two or more assemblies from one source to separated apparatus wings; each wing chooses a setting and records a binary outcome, and the harness works only with the resulting table of outcome probabilities per setting context. Bell's theorem, developed in [Bell's Theorem](../../../../markdown/aaa/philosophy-history/theory-bridges/bell-theorem.md), shows that any model in which each wing's outcome law depends only on its own setting and a shared complete hidden state (Bell factorizability), with settings statistically independent of that state (measurement independence), obeys the CHSH bound $|S|\le 2$ defined below; quantum theory reaches $2\sqrt{2}$, the Tsirelson bound, and loophole-free experiments exceed $2$. Such a model is called Bell-local, and a table it produces is said to be product-screened by the shared state, because conditioning on that state factors the table into a product of one local response per wing. No-signaling is the observer-level requirement that each wing's outcome statistics do not change when a far wing's setting changes. GHZ and Hardy are strengthened Bell tests that replace an inequality average by perfect-correlation signs and by zero-probability events respectively. On the $\mathbb{A}\mathbb{A}\mathbb{A}$ side, where $\mathbb{A}\mathbb{A}\mathbb{A}$ abbreviates Architrino Assembly Architecture, a [record](../../../../markdown/aaa/quantum/measurement-ontology.md#what-makes-an-interaction-a-record) is a durable apparatus outcome produced by the same delayed dynamics that moves every architrino; pair provenance is the retained shared history of the two assemblies from their common source; an apparatus kernel is the declared physical coupling between a wing's apparatus and its target; a record basin is the set of admissible retained histories that resolve to one outcome; and the [finite-window basin measure](../../../../markdown/aaa/quantum/measurement-ontology.md#transfer-operator-measure-contract) $\mu_{*,T_W}$ over a record window $T_W$ assigns those basins their weights. A candidate record $\theta$, in the sense of the [shared closure record](../../../../markdown/aaa/validation/failure-criteria.md#shared-closure-record), is the bundle of declared substrate histories and response maps from which a table $P_\theta$ is predicted.

##### Runtime Artifact

Run:

```text
node scripts/quantum/bell-family-residual-harness.mjs --pretty
```

To inspect one case:

```text
node scripts/quantum/bell-family-residual-harness.mjs --scenario ghz_local_value_table --pretty
```

To inspect the candidate-fixture intake path:

```text
node scripts/quantum/bell-family-residual-harness.mjs \
  --candidate scripts/quantum/product-screened-axis-candidate.json \
  --pretty
```

The script emits JSON with one row per scenario:

| Field | Meaning |
| --- | --- |
| `metadata.source` | whether the run used built-in scenarios or a candidate JSON fixture |
| `metadata.candidate_path` | candidate fixture path when `metadata.source` is `candidate` |
| `id` | stable scenario identifier |
| `description` | one-sentence statement of what the scenario exercises |
| `classification` | `benchmark` or `negative_control` for built-in scenarios; a candidate fixture may declare its own or defaults to `candidate` |
| `source_protocol` | declared source construction for candidate fixtures, when supplied |
| `source_record_count` | number of retained source records in a candidate fixture |
| `metrics.chsh` | CHSH expectations, $S$, local-bound excess, and Tsirelson excess |
| `metrics.ghz` | GHZ product-context expectations and $\Delta_{\mathrm{GHZ}}$ residual |
| `metrics.hardy` | Hardy zero-term probabilities and positive-event margin |
| `metrics.no_signaling` | maximum one-party marginal drift under remote setting changes |
| `metrics.measurement_independence` | total-variation drift of declared provenance labels across settings |
| `metrics.observed_factorization` | total-variation distance between the observed joint table and the product of its observed marginals |
| `metrics.product_screening` | total-variation distance between the emitted table and a declared Bell-local product-screening reconstruction |
| `metrics.complete_record_parity` | for tables that carry a deterministic local response per retained record, the weight $\Delta_{\mathrm{par}}$ of records whose four CHSH context products multiply to $-1$; a deterministic local response always has parity $+1$, so nonzero weight marks records that no local deterministic response can realize; `null` when no record-level data is supplied |
| `gates` | pass/fail records for the residuals that apply to the scenario: `no_signaling`, `measurement_independence`, `tsirelson` for CHSH tables, `ghz`, `hardy_margin`, and `product_screening_escape` and `complete_record_parity` for record-bearing tables |
| `witness_tags` | non-failure tags such as `bell.chsh_local_bound_violated`, `bell.ghz_products_matched`, `bell.hardy_positive_margin`, and `bell.superquantum` |
| `failure_codes` | stable failure codes: `bell.signal_transfer`, `bell.measurement_independence_blur`, `bell.tsirelson_open`, `bell.ghz_parity_open`, `bell.hardy_margin_open`, `bell.product_screening_collapse`, and `bell.complete_record_parity_obstruction` |

##### Residual Object

For a two-party CHSH table with setting $x$ on the first wing, setting $y$ on the second, and binary outcomes $a,b\in\{-1,+1\}$, the harness computes the correlation

$$
E(x,y)=\sum_{a,b=\pm1}ab\,P(a,b|x,y)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-71254ad87038302b)

which is the expectation of the outcome product in the context $(x,y)$, and the CHSH combination over the two calibrated settings $A_0,A_1$ of the first wing and $B_0,B_1$ of the second,

$$
S=E(A_0,B_0)-E(A_0,B_1)+E(A_1,B_0)+E(A_1,B_1)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2146fac9d103d6dd)

where $E(A_i,B_j)$ abbreviates $E(x{=}A_i,y{=}B_j)$. Every deterministic assignment of the four local outcomes gives $|S|=2$ exactly: writing $a_i$ and $b_j$ for the outcomes fixed under settings $A_i$ and $B_j$, $S=a_0(b_0-b_1)+a_1(b_0+b_1)$, and one of the two brackets vanishes while the other is $\pm2$; a Bell-local table is a mixture of such assignments, so it obeys $|S|\le2$. The singlet table at the built-in settings gives $|S|=2\sqrt{2}$. The gate reports both the local-bound excess

$$
\Delta_{\mathrm{CHSH}}
=
\left[|S|-2\right]_+
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1546459b8c9dbe9e)

and the Tsirelson excess

$$
\Delta_{\mathrm{Ts}}
=
\left[|S|-2\sqrt{2}\right]_+
$$

[View →](../../../../../equation-mapping.html#corpus-equation-787cfba82c912754)

where $[x]_+\equiv\max(x,0)$ is the positive part, so each excess is zero exactly when the corresponding bound holds.

For GHZ, a three-wing test in which each wing measures one of two binary settings $X$ and $Y$, the script uses the context set and the sign product fixed in [Bell's Theorem](../../../../markdown/aaa/philosophy-history/theory-bridges/bell-theorem.md#bell-family-strengthenings-ghz-and-hardy):

$$
\mathcal{C}_{\mathrm{GHZ}}=\{XXX,XYY,YXY,YYX\},
\qquad
\prod_{C\in\mathcal{C}_{\mathrm{GHZ}}}\chi_C=-1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5a08dfcbc8537c99)

Here $\chi_C\in\{-1,+1\}$ is the perfectly correlated product of the three outcomes in context $C$. Bell's Theorem fixes only the product of the four signs. The built-in benchmark fixes the individual signs as $\chi_{XXX}=-1$ and $\chi_{XYY}=\chi_{YXY}=\chi_{YYX}=+1$, the perfect-correlation signs of the three-party GHZ state formed with a relative minus sign between its two product components; a candidate fixture that carries GHZ contexts declares its own four signs with the same product. With $E(C)$ the product expectation of the three outcomes in context $C$, the script computes

$$
\Delta_{\mathrm{GHZ}}
=
\max_{C\in\mathcal{C}_{\mathrm{GHZ}}}
\left[
1-\chi_C E(C)
\right]_+
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c2658ae1bc60a210)

The residual vanishes exactly when every context reproduces its perfect correlation. A context-independent deterministic local value table has context products whose four-fold product is $+1$, because each wing's $X$ value and $Y$ value each appear twice, so at least one context has $\chi_C E(C)=-1$ and the residual is $2$.

For Hardy, it consumes the setting and context convention owned by [No-Go Theorems](../../../../markdown/aaa/validation/no-go-theorems.md#applicability-map): $U_i$ and $D_i$ are the two calibrated binary settings on wing $i$, and the four terms below come from four distinct setting pairs. It computes the positive margin

$$
\Delta_{\mathrm{Hardy}}
=
\left[
P(D_1=1,D_2=1)
-
P(U_1=1,U_2=1)
-
P(D_1=1,U_2=0)
-
P(U_1=0,D_2=1)
\right]_+
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e7d367805a1941b2)

where each probability is read from its own setting context, $(D_1,D_2)$, $(U_1,U_2)$, $(D_1,U_2)$, or $(U_1,D_2)$, with outcomes $0$ and $1$. Under Bell factorizability every local value assignment with $D_1=D_2=1$ either has $U_1=U_2=1$ or falls into one of the two mixed events, so the first probability never exceeds the sum of the other three and the margin is zero for every Bell-local table; a positive margin certifies a departure from that class without any inequality average.

No-signaling is evaluated for each wing $i$ as the maximum drift of that wing's outcome marginal between contexts that keep its own setting fixed. Write $\mathbf{s}=(s_1,\dots,s_n)$ for the settings of the $n$ wings, $\mathbf{s}_{-i}$ for the settings of every wing other than $i$, and $r_i$ for wing $i$'s outcome:

$$
\Delta_{\mathrm{NS}}^{i}
=
\sup_{s_i,\mathbf{s}_{-i},\mathbf{s}'_{-i}}
\sum_{r_i}
\left|
P(r_i|s_i,\mathbf{s}_{-i})
-
P(r_i|s_i,\mathbf{s}'_{-i})
\right|
$$

[View →](../../../../../equation-mapping.html#corpus-equation-054fa35178229131)

The reported residual is $\Delta_{\mathrm{NS}}=\max_i\Delta_{\mathrm{NS}}^{i}$. Each term sums the absolute differences of two marginals, which is twice their total-variation distance; this is the definition [Bell's Theorem](../../../../markdown/aaa/philosophy-history/theory-bridges/bell-theorem.md#bell-closure-diagnostics) writes for two wings as $\Delta_{\mathrm{NS}}^{A}$ and $\Delta_{\mathrm{NS}}^{B}$, and the residual [No-Go Theorems](../../../../markdown/aaa/validation/no-go-theorems.md#applicability-map) consumes.

Measurement-independence leakage is represented by a declared provenance-label distribution $\rho_{\mathrm{prov}}(\Pi|\mathbf{s})$ in each context, where $\Pi$ labels the retained source record, the pair provenance, and $D_{\mathrm{TV}}$ is the total-variation distance, half the sum of absolute probability differences:

$$
\Delta_{\mathrm{MI}}
=
\sup_{\mathbf{s}}
D_{\mathrm{TV}}\!\left(
\rho_{\mathrm{prov}}(\Pi|\mathbf{s}),
\rho_{\mathrm{prov}}(\Pi|\mathbf{s}_0)
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f884ee6c0c0f4ee6)

where $\mathbf{s}_0$ is the packet baseline, the first context in the scenario that carries a provenance distribution. The residual vanishes exactly when the label distribution is the same in every context, which is also the zero condition of the unconditional form $\sup_{\mathbf{s}}D_{\mathrm{TV}}(\rho(\lambda|\mathbf{s}),\rho(\lambda))$ used in Bell's Theorem; when either form is nonzero, each is at most twice the other by the triangle inequality, so a tolerance stated in one convention transfers to the other with at most a factor of two. A real closure packet should replace this toy provenance distribution with the pair-provenance ledger described below.

For generated pair-provenance cases, the harness also checks whether the emitted table is exactly reconstructed by a Bell-local product-screening form. Here $\mathbf{r}=(r_1,\dots,r_n)$ is the outcome vector, $K_i(r_i|s_i,\Pi)$ is wing $i$'s local apparatus kernel, the probability of outcome $r_i$ given only that wing's own setting and the shared record $\Pi$, and $P_\theta(\mathbf{r}|\mathbf{s})$ is the candidate table:

$$
\Delta_{\mathrm{screen}}
=
\sup_{\mathbf{s}}
D_{\mathrm{TV}}\!\left(
P_\theta(\mathbf{r}|\mathbf{s}),
\int_{\Pi}
\prod_i
K_i(r_i|s_i,\Pi)\,
d\rho_{\mathrm{prov}}(\Pi)
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3b844a3d59fa9d1a)

Here $\Delta_{\mathrm{screen}}=0$ is not a success for Bell closure. It means the proposed table has collapsed back into the screened common-cause model excluded by the Bell-family gate. A closure candidate must avoid that collapse while still keeping $\Delta_{\mathrm{MI}}$ and $\Delta_{\mathrm{NS}}$ within tolerance.

##### Generated Pair-Provenance Path

The first generated path is a deliberately failing local-axis model. It declares a finite pair-provenance grid

$$
\Pi_{AB}^{(N)}
=
\left\{
(\phi_k,\phi_k+\pi,w_k)
\right\}_{k=1}^{N},
\qquad
w_k=\frac{1}{N}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f02225be9fbe350f)

and two local deterministic apparatus kernels:

$$
K_A(a|A_i,\Pi_k)
=
\mathbf{1}\!\left[
a=\operatorname{sgn}\cos(A_i-\phi_k)
\right]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0e2f163fcaadd409)

$$
K_B(b|B_j,\Pi_k)
=
\mathbf{1}\!\left[
b=\operatorname{sgn}\cos(B_j-\phi_k-\pi)
\right]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-99e20024a6549477)

The generated table is then

$$
P_{\mathrm{gen}}(a,b|A_i,B_j)
=
\sum_k
w_k
K_A(a|A_i,\Pi_k)
K_B(b|B_j,\Pi_k)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-974c75a4bc0c2af8)

Here $\mathbf{1}[\cdot]$ is the indicator of the bracketed condition and $\operatorname{sgn}$ the sign, so each kernel is deterministic: wing $A$ answers $+1$ when its setting angle lies within a quarter turn of the record's axis $\phi_k$, and wing $B$ answers the same question against the opposite axis $\phi_k+\pi$. The built-in instantiation uses $N=720$ midpoint angles $\phi_k=(k-\tfrac12)\,2\pi/N$, the settings $A_0=0$, $A_1=\pi/2$, $B_0=\pi/4$, and $B_1=3\pi/4$, and the convention $\operatorname{sgn}0=+1$; on this grid no setting makes the cosine vanish, so the convention is never invoked. Counting grid points with equal and with opposite signs gives $E(A_i,B_j)=-1+2|A_i-B_j|/\pi$ for separations up to $\pi$, so each of the four expectations has magnitude $\tfrac12$ and $|S|=2$ exactly; the harness reports that value to within floating-point summation error.

This is a useful negative control because it has explicit pair provenance, explicit local kernels, clean no-signaling, and clean measurement independence, but it still reaches only the classical-axis correlation. The product-screening residual is zero by construction, so the `product_screening_escape` gate must fail with `bell.product_screening_collapse`.

The candidate-reader path makes that obstruction inspectable from a declared source-record fixture rather than only from built-in tables. The fixture `scripts/quantum/product-screened-axis-candidate.json` supplies eight explicit source records, local deterministic response tables, normalized source weights, and four CHSH contexts. It is not a positive Bell candidate. It is a compact negative control showing that explicit provenance can still reduce to Bell-local product screening unless the completed record law supplies a stronger joint record-basin measure.

##### Built-In Scenarios

| Scenario | Role | Expected signal |
| --- | --- | --- |
| `chsh_quantum_singlet` | benchmark | $|S|=2\sqrt{2}$, no-signaling passes, measurement independence passes |
| `local_classical_axis` | negative control | classical-axis response reaches only the local CHSH bound |
| `separable_pair_measure` | negative control | independent outcomes produce no Bell-family structure |
| `generated_pair_provenance_screened_axis` | negative control | generated pair provenance and local kernels collapse to Bell-local product screening |
| `setting_dependent_provenance` | negative control | CHSH table is present, but $\Delta_{\mathrm{MI}}>0$ |
| `signaling_box` | negative control | one-party marginals change under remote setting changes |
| `ghz_product_benchmark` | benchmark | GHZ product signs match with $\Delta_{\mathrm{GHZ}}=0$ |
| `ghz_local_value_table` | negative control | context-independent local values fail GHZ parity |
| `hardy_no_signaling_margin` | benchmark | Hardy margin is positive while no-signaling passes |
| `hardy_local_forbidden_event` | negative control | the positive Hardy event is cancelled by a forbidden event and no-signaling also fails |

These scenarios are deliberately small. The singlet and GHZ benchmark tables are the state-vector predictions at the built-in settings. The Hardy benchmark is a hand-written no-signaling table that carries the Hardy pattern with positive term $0.09$; it is not the prediction of a particular quantum state of the pair, so it checks the margin arithmetic rather than agreement with quantum theory. The goal is to catch wiring errors, sign errors, and invalid escape routes before a larger Master Equation packet consumes the residuals.

##### Proof Scaffold Boundary

The harness encodes a useful obstruction:

$$
P_\theta(\mathbf{r}|\mathbf{s})
=
\int_{\Pi}
\prod_i
K_i(r_i|s_i,\Pi)\,
d\rho_{\mathrm{prov}}(\Pi)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7c60ad066ae4fbef)

is still a Bell-local product form when $d\rho_{\mathrm{prov}}(\Pi)$ is independent of the settings and $\Pi$ is a complete common-past screen. Such a model fails each Bell-family benchmark separately: it cannot exceed the CHSH local bound, cannot reproduce the four GHZ perfect-correlation signs, and cannot produce a positive Hardy margin, because in each case the product form is a mixture of deterministic local value assignments and the enumeration of those assignments closes the bound. A successful $\mathbb{A}\mathbb{A}\mathbb{A}$ closure must therefore derive a stronger object:

$$
P_\theta(\mathbf{r}|\mathbf{s})
=
\mu_{*,T_W}^{(n)}
\left(
B_{\mathbf{r}}^{\mathbf{s}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a64d345d5c74e75e)

where $B_{\mathbf{r}}^{\mathbf{s}}$ is the record-basin subset that resolves to the outcome vector $\mathbf{r}$ under the setting vector $\mathbf{s}$ for the declared preparation, pair or multiplet provenance, local apparatus kernels, coarse-graining, and record window, and the superscript $(n)$ marks the measure on the joint retained record of the $n$ wings, two for a pair and three for a GHZ triplet. This is the same measurement discipline used in [Measurement Ontology](../../../../markdown/aaa/quantum/measurement-ontology.md#born-rule-interface), but lifted from single-assembly basin weights to a Bell-family joint record measure.

The hypothesis this object must fail is fixed by the owners this harness serves, and the harness gates follow from it. [Ontology](../../../../markdown/aaa/foundations/ontology.md#bell-nonlocality-placement) selects, provisionally until the Bell derivation closes, the substrate-nonseparability route: measurement independence and observer-level no-signaling are retained, and Bell factorizability, the product form above, is the replaced hypothesis. [No-Go Theorems](../../../../markdown/aaa/validation/no-go-theorems.md#applicability-map) records the same route: the nonfactorizable joint response is carried by a live $c_f$-mediated coordination channel between the two apparatus couplings, gated by pair provenance and operating outside the effective photon cone, which requires the causal-wake speed $c_f$ to exceed the calibrated low-energy photon speed $c_0$. That is why $\Delta_{\mathrm{MI}}$ and $\Delta_{\mathrm{NS}}$ are gates rather than adjustable residuals, and why $\Delta_{\mathrm{screen}}=0$ is a failure. The route carries an obstruction this harness cannot test: Bancal and collaborators showed that a model reproducing the quantum correlations through hidden influences of any finite speed above the light speed permits controllable faster-than-light signaling in suitable arrangements of more than two parties, under their stated causal and no-signaling assumptions. The no-signaling residual here is evaluated only on the declared two- or three-wing tables, so a candidate packet must separately state which hypothesis of that theorem its coordination channel fails and supply the multipartite probability law on which observer no-signaling is then re-evaluated.

The native proof packet must supply:

1. a pair-provenance ledger $\Pi_{AB}$ or multiplet ledger $\Pi_{ABC}$;
2. local apparatus kernels derived from the Stern-Gerlach-like or photon-analyzer channel;
3. one finite-window measure $\mu_{*,T_W}^{(n)}$ on the retained joint record manifold;
4. a compression audit showing why the completed record law does not reduce to Bell-local product screening;
5. no-signaling and measurement-independence residuals evaluated on the same packet;
6. a premise audit against the finite-speed signaling obstruction: the hypothesis of that theorem the coordination channel fails, and the multipartite probability law on which observer no-signaling is re-evaluated.

The single-assembly Stern-Gerlach response in [Angular Momentum and Spin](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md#stern-gerlach-like-measurement-response) is a prerequisite, not the Bell proof itself. Bell-family closure starts only after the pair-provenance measure and the joint record basins are explicit.

##### Acceptance Boundary

Passing this harness means only that the residual calculations and negative controls behave as expected. It does not validate $\mathbb{A}\mathbb{A}\mathbb{A}$ quantum closure.

A future closure packet becomes promotable only if:

1. the probability tables are generated from declared substrate variables rather than written by hand;
2. $\Delta_{\mathrm{MI}}$ and $\Delta_{\mathrm{NS}}$ remain within tolerance, because measurement independence and observer no-signaling are accepted rather than replaced;
3. CHSH, GHZ, and Hardy benchmarks are evaluated together;
4. the same $\mu_{*,T_W}^{(n)}$ also agrees with the record and repeated-frequency discipline in [Quantum Operator Mapping](../../../../markdown/aaa/philosophy-history/theory-bridges/quantum-operator-mapping.md#statistical-measure-and-the-born-rule-emergence);
5. the product-screening audit does not collapse the completed substrate record, which plays the role of Bell's complete hidden state $\lambda$, into $\int_{\Pi}\prod_iK_i\,d\rho_{\mathrm{prov}}$;
6. failure cases are reported when the model reduces to classical-axis response, separable pair measure, product-screened pair provenance, context-independent GHZ values, forbidden Hardy events, setting-dependent provenance, or signaling marginals, or when its coordination channel's multipartite predictions permit signaling.

##### Sources

The finite-speed obstruction named in the proof scaffold boundary is J.-D. Bancal, S. Pironio, A. Acín, Y.-C. Liang, V. Scarani, and N. Gisin, *Quantum non-locality based on finite-speed causal influences leads to superluminal signalling*, Nature Physics 8, 867–870 (2012), [DOI 10.1038/nphys2460](https://doi.org/10.1038/nphys2460). It is the same source the Bell entry of [No-Go Theorems](../../../../markdown/aaa/validation/no-go-theorems.md#sources) cites, and it enters this chapter only as an observer-level constraint on the selected route, never as a premise of an $\mathbb{A}\mathbb{A}\mathbb{A}$ derivation. The CHSH local bound and the Tsirelson bound used by the gates are standard results whose statements belong to [Bell's Theorem](../../../../markdown/aaa/philosophy-history/theory-bridges/bell-theorem.md); this chapter verifies the local bound by the enumeration stated beside the CHSH combination and uses the Tsirelson value as a benchmark constant.

#### Coincident-Midpoint Orthogonal-Axis Action-Increment Protocol

This protocol defines the simulation-facing test for deriving or falsifying the one-cycle action increment used by the quantum closure program. The action increment is the smallest amount of angular momentum, counted in radian-normalized action units, that an assembly transacts with its surroundings in one accepted change of branch. The candidate assembly is a [Noether braid](../../../../markdown/aaa/noether-braid/noether-braid.md), six architrinos bound in three neutral binaries, in its coincident-midpoint orthogonal-axis member, where the three binary midpoints coincide and the binary axes are mutually orthogonal at the near-rest endpoint. It specializes [Simulation Run Protocols](../../../../markdown/aaa/validation/simulations/run-protocols.md) and [Convergence Tests](../../../../markdown/aaa/validation/simulations/convergence-tests.md) to the question left open by [Coincident-Midpoint Orthogonal-Axis Braid Dynamics](../../../../markdown/aaa/noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md#zero-axial-offset-three-binary-dynamics-and-interpretation), [Three-Binary 4:2:1 Frequency Lock](../../../../markdown/aaa/noether-braid/three-binary-4-2-1-frequency-lock.md), [Angular Momentum and Spin](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md), and [Mapping the Planck Scale](../../../../markdown/aaa/philosophy-history/theory-bridges/mapping-planck-scale-to-coincident-midpoint-orthogonal-axis-geometry.md).

Here a coincident-midpoint orthogonal-axis braid candidate must carry the complete prescribed coordinate ownership: persistent indices $a\in\{1,2,3\}$, independently assignable positive radii and frequencies, mutually orthogonal axes at the orthogonal-axis three-binary near-rest endpoint, axes converging toward the group-translation direction as the prescribed flattening coordinate $\lambda_A$ increases, axial half-separations fixed at zero ($h_a=0$, so each transverse orbit radius equals its endpoint radius, $\rho_a=R_a$), and explicit transverse-orbit-radius, phase, and circulation rows, as fixed in [Braid Taxonomy](../../../../markdown/aaa/noether-braid/braid-taxonomy.md#coordinate-constraints-used-by-worked-configurations); a nonzero axial half-separation belongs to the distinct axially separated member. Coincident-midpoint orthogonal-axis 4:2:1 braid additionally requires $f_1:f_2:f_3=4:2:1$. Neither label supplies stability, retention, or a universal action increment; failure of the same evolved record to preserve the coordinate and ledger rows rejects the candidate.

The target is narrow. The run must compute the smallest accepted Master-Equation projected action increment from candidate coincident-midpoint orthogonal-axis braid branch transitions whose stability rows pass. It may compare the resulting scale to the observer-level $h,\hbar$ benchmark after the computation. It may not insert $\hbar$ as an input step size.

##### Closure Question

The action-angle bridge in [Angular Momentum and Spin](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md#the-h-and-hbar-convention) states the conditional theorem target:
$$
\Delta I_i=\hbar
\quad\Longrightarrow\quad
\Delta\Gamma_{\text{cell}}=h^n
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6c4b509a949c3341)

for $n$ record-facing action-angle channels. This protocol tests the missing premise. It asks whether accepted coincident-midpoint orthogonal-axis braid dynamics select a positive increment $\Delta I_*$ such that
$$
h_{\mathbb{A}\mathbb{A}\mathbb{A}}=2\pi\Delta I_*
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c08fff78900e1809)

matches the observer-level Planck constant benchmark. Here $h_{\mathbb{A}\mathbb{A}\mathbb{A}}$ is the candidate closed-cycle action unit that the braid chapters write as $h_{\mathrm{act}}$, and the factor $2\pi$ converts a radian-normalized action increment into a closed-cycle action under the $h$ and $\hbar$ convention. [Effective Lagrangian](../../../../markdown/aaa/dynamics/effective-lagrangian.md) states the same boundary from the action side: an integer action condition is a conditional recovery target on a retained phase-locked bundle, not a derived quantization law, so a positive increment established here would supply the missing premise rather than presuppose it.

Passing this protocol would not complete quantum theory. It would only promote the action-increment step from bookkeeping convention to candidate derived output.

##### Accepted Transition Class

Let $B_q$ and $B_{q'}$ denote candidate coincident-midpoint orthogonal-axis braid branch states with passed stability rows, indexed binary radii, frequencies, speeds, plane normals, an active [causal-root](../../../../markdown/aaa/foundations/architrino.md) ledger identifying the earlier emissions that reach each receiver, and a wake ledger. A candidate accepted transition belongs to

$$
\mathcal{T}_{\mathrm{acc}}=\varnothing
$$

[View →](../../../../../equation-mapping.html#corpus-equation-affbf38439b59823)

unless both endpoint packets first satisfy branch-certificate eligibility: matching ledger identity, matching active-root convention, positive Jacobian floors, positive transmitter-side acceleration-weight floors or certified intervals, declared inactive-root or tail status, a return-map and acceleration-residual record showing that each endpoint is a retained solution of the delayed dynamics on its own record rather than a prescribed configuration, $\Delta_{\mathbf{k}}>0$ computed about that retained solution, conservation pullback on the same rows, and refinement records sufficient to keep the endpoint status stable. The order matters: a stability spectrum is defined by linearizing the one-period return map about a cycle the dynamics actually occupies, so a Floquet gap computed about a prescribed configuration that does not close under the delayed dynamics has no referent, at any sign or magnitude. Before that eligibility is supplied, a run may report diagnostics or rejected endpoint packets, but it may not promote `candidate_action_increment` or `candidate_h_recovery`.

When endpoint eligibility has been established, the accepted transition class is

$$
\mathcal{T}_{\mathrm{acc}}
=
\left\{
B_q\to B_{q'}:
\Delta_{\mathbf{k}}>0,\
\mathcal{R}_{\mathrm{phase}}\le\tau_{\mathrm{phase}},\
\mathcal{R}_{E}\le\tau_E,\
\mathcal{R}_{P}\le\tau_P,\
\mathcal{R}_{J}\le\tau_J,\
\Delta N_{\mathrm{self}}\in2\mathbb{Z},\
\mathcal{R}_{\mathrm{root}}\le\tau_{\mathrm{root}}
\right\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f12757a4496ccae3)

In this set, $\mathcal{R}_{\mathrm{phase}}$ is the layer and inter-layer phase-closure residual, $\mathcal{R}_{E}$, $\mathcal{R}_{P}$, and $\mathcal{R}_{J}$ are the energy, momentum, and angular-momentum pullback residuals defined below, $\mathcal{R}_{\mathrm{root}}$ is the active-root residual, the change in causal-root identity and count under refinement, $\Delta_{\mathbf{k}}$ is the non-symmetry Floquet gap defined below, and $\Delta N_{\mathrm{self}}$ is the net change in the active self-root count between the two endpoint records. The parity condition $\Delta N_{\mathrm{self}}\in2\mathbb{Z}$ admits only self-roots that appear or disappear in opposite-sign pairs at a generic fold of the causal-root condition, the $\Delta N=\pm2$ fold law of the [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#caustic-transit-and-finite-impulse); an odd change signals a root born on the coincidence locus, which that law does not certify. The tolerances $\tau_{\mathrm{phase}}$, $\tau_E$, $\tau_P$, $\tau_J$, and $\tau_{\mathrm{root}}$ must be declared before the run. The transition is not accepted merely because it improves a fit to $h$: only stable branch changes with accounted conservation and causal roots contribute to the action increment.

##### Master-Equation Increment

For each candidate transition, compute acceleration moments and the wake boundary term directly from the delayed dynamics. Let $\mathbf X_C(T)$ be the equal-weight centroid of the six constituent sites, $\mathbf X_C=\tfrac16\sum_i\mathbf X_i$; the weights are equal because architrinos carry no mass and the bookkeeping constant introduced below is universal, and on the prescribed coincident-midpoint configuration this centroid is the common binary midpoint. For persistent binary index $a\in\{1,2,3\}$, let $\mathcal B_a$ be its constituent set and define the specific acceleration moment
$$
\boldsymbol{\tau}^{(A)}_a(T)
=
\sum_{i\in\mathcal B_a}
\big(\mathbf X_i(T)-\mathbf X_C(T)\big)
\times
\mathbf A_i(T),
$$

[View →](../../../../../equation-mapping.html#corpus-equation-07210d95933edafb)

which has the units of acceleration times length, the units of specific torque. Because the centroid velocity is the mean constituent velocity, the term $-\mathbf V_C\times\sum_i\mathbf V_i$ that a moving reference point would add vanishes, and the sum of the three moments over $a$ is exactly the rate of change of the specific angular momentum $\sum_i(\mathbf X_i-\mathbf X_C)\times\mathbf V_i$ of the six constituents about the centroid; a reference point with any other velocity would leave that term in place. The index carries no radius order. With transaction axis $\hat{\mathbf n}_{\mathrm{txn}}$, the unit vector along which the transacted angular momentum is projected, declared before the run in `state_vectors.json`, and transition window $[T_i,T_f]$ in absolute time, the action-unit increment is
$$
\Delta I_{\mathrm{ME}}
=
\mu_{\text{arch}}\,
\hat{\mathbf n}_{\mathrm{txn}}\cdot
\left(
\sum_{a\in\{1,2,3\}}
\int_{T_i}^{T_f}\boldsymbol{\tau}^{(A)}_a(T)\,dT
+
\Delta\mathbf L_{\mathrm{wake},\partial}^{\mathrm{spec}}
\right).
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1afa3c3d67c9e6b8)

Here $\Delta\mathbf L_{\mathrm{wake},\partial}^{\mathrm{spec}}$ is the change over the same window, the value at $T_f$ minus the value at $T_i$, in the specific angular momentum carried in flight by emitted wake surfaces that have crossed the declared braid boundary and have not yet been received. The superscript marks a quantity per unit of the bookkeeping constant, so both terms in the bracket are specific angular momenta and the product with $\mu_{\text{arch}}$ has action units. The universal $\mu_{\text{arch}}$ is an action/energy bookkeeping conversion only; it is not primitive architrino mass.

The packet must declare $\mu_{\text{arch}}$ in `campaign.json`, record units for every action and acceleration-moment column, and keep that normalization fixed across all candidate and control transitions. It must also be fixed independently of the benchmark. Dimensional analysis fixes what the run itself can derive: the specific increment has the units of $\kappa\epsilon^2/c_f$, where $\kappa$ is the universal coupling and $\epsilon$ the polarity-unit magnitude of the Master Equation, so $\Delta I_*^{\mathrm{spec}}=N_*\,\kappa\epsilon^2/c_f$ for a pure number $N_*$ set by the branch geometry, and in normalized wake-speed units with $c_f=1$ the run's derived output is $N_*=\Delta I_*^{\mathrm{spec}}/(\kappa\epsilon^2)$. The benchmark comparison then needs the conversion $\mu_{\text{arch}}\kappa\epsilon^2/c_f$ in observer action units from an independent calibration, such as the mass map or the [SI base-unit map](../../../../markdown/aaa/validation/architrino-si-base-units.md); choosing $\mu_{\text{arch}}$ or the unit map to make $\delta_h$ small is benchmark contamination, not recovery. A packet that omits the conversion may report $N_*$ as a specific-action diagnostic, but it may not evaluate $\delta_h$ or promote `candidate_h_recovery`.

##### Branch-Chart Conservation Pullback

The projected action increment is a diagnostic until one accepted action or independently derived causal-wake update supplies the motion and all three conserved accounts on the same live-ledger branch chart. For each accepted transition, report
$$
\mathcal{E}_{\mathrm{tot}}^{(\eta)}
=
K_{\mu}+E_{\mathrm{wake}}^{(\eta)},
\qquad
\boldsymbol{\mathcal{P}}_{\mathrm{tot}}^{(\eta)}
=
\mathbf{P}_{\mathrm{mech}}+\mathbf{P}_{\mathrm{wake}}^{(\eta)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-dfa6dd9138d96765)

$$
\boldsymbol{\mathcal{J}}_{\mathrm{tot}}^{(\eta)}
=
\mathbf{J}_{\mathrm{mech}}+\mathbf{J}_{\mathrm{wake}}^{(\eta)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-06c4d8a4e74d35da)

Here $K_{\mu}=\sum_i\tfrac12\mu_{\text{arch}}\|\mathbf V_i\|^2$ is the quadratic kinetic bookkeeping proxy, $E_{\mathrm{wake}}^{(\eta)}$ is the candidate in-flight wake interaction term evaluated at causal-surface mollifier width $\eta$, $\mathbf{P}_{\mathrm{mech}}=\mu_{\text{arch}}\sum_i\mathbf V_i$ and $\mathbf{J}_{\mathrm{mech}}=\mu_{\text{arch}}\sum_i(\mathbf X_i-\mathbf X_C)\times\mathbf V_i$ are the mechanical momentum and angular momentum on the same bookkeeping convention, and the wake entries are the corresponding in-flight terms; the candidate energy charge and its finite-window balance are stated in the [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md#action-level-wake-energy-functional-at-a-time-boundary). The residuals $\mathcal{R}_{E}$, $\mathcal{R}_{P}$, and $\mathcal{R}_{J}$ are the normalized window changes of these three totals after subtracting the window integrals of the acceleration-residual terms, $\sum_i\mu_{\text{arch}}\mathbf V_i\cdot\mathbf R_{A,i}^{(\eta)}$, $\sum_i\mu_{\text{arch}}\mathbf R_{A,i}^{(\eta)}$, and $\sum_i\mu_{\text{arch}}(\mathbf X_i-\mathbf X_C)\times\mathbf R_{A,i}^{(\eta)}$ about the same reference point, where $\mathbf R_{A,i}^{(\eta)}$ is the acceleration residual between the Master Equation acceleration and the acceleration the candidate action generates, and the endpoint-leakage flux through the window boundary. An Euler residual, the interior coefficient of an action variation, is a different object and may not be substituted for these terms without a derived conversion. The subtracted residual terms are reported beside the totals; when they are not small on the branch rows, the candidate action does not generate the motion and the pullback remains a diagnostic. They must use the same branch rows as the root ledger, acceleration residual, and $\Delta I_{\mathrm{ME}}$ calculation. A work-integral energy reconstruction or torque projection may be reported as a diagnostic, but it does not replace the exact wake-history pullback.

The candidate increment floor is
$$
\Delta I_*
=
\inf_{B_q\to B_{q'}\in\mathcal{T}_{\mathrm{acc}}}
\left|\Delta I_{\mathrm{ME}}(B_q\to B_{q'})\right|
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c6b35efac3472013)

with required positivity condition
$$
0<\Delta I_*<\infty
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4d2f12a6478c55c2)

A finite scanned family has a minimum rather than an infimum, and a finite set of nonzero increments always has a positive minimum, so one family does not establish positivity. The floor counts only when it is stable under enlargement of the family and under the refinement ladder; a floor that keeps decreasing as accepted transitions are added is the failure `no-positive-increment-floor` below.

The benchmark comparison is
$$
\delta_h
=
\left|
\frac{2\pi\Delta I_*-h}{h}
\right|
$$

[View →](../../../../../equation-mapping.html#corpus-equation-07388e8aaacd6745)

##### Cluster and Stability Residuals

Because a single transition can be a numerical accident, the packet must scan a family of branch transitions with passed stability rows. For a selected class $\mathcal{C}\subset\mathcal{T}_{\mathrm{acc}}$, report
$$
\delta_I(\mathcal{C})
=
\frac{
\operatorname{std}_{\mathcal{C}}\!\left(\Delta I_{\mathrm{ME}}\right)
}{
\left|\operatorname{mean}_{\mathcal{C}}\!\left(\Delta I_{\mathrm{ME}}\right)\right|
+\varepsilon_I
},
$$

[View →](../../../../../equation-mapping.html#corpus-equation-796980e1e5662ff5)

Here $\varepsilon_I$ is a predeclared action-increment floor with the same units as $\Delta I_{\mathrm{ME}}$. Also report the non-symmetry Floquet gap
$$
\Delta_{\mathbf{k}}
=
1-\max_{i\notin G}\|\mu_i(\mathbf{k})\|
$$

[View →](../../../../../equation-mapping.html#corpus-equation-e1bb97ae077631e6)

for each endpoint branch and each transition continuation. Here $\mu_i(\mathbf{k})$ are the Floquet multipliers, the eigenvalues of the linearized one-period return map of the retained cycle with winding label $\mathbf{k}$, with the treatment of the state-dependent delay derivative in the variational operator stated in `floquet_report.json`; $G$ indexes the neutral symmetry modes (time translation, spatial translation, rotation, and phase shift) excluded from the maximum; and the double bars denote the modulus of a multiplier. A positive gap means every non-symmetry multiplier lies inside the unit circle, which establishes linear attraction of the retained cycle and not the size of its basin. The gap is defined only for an endpoint that the return-map and acceleration-residual record has shown to be a retained solution; the same order of checks governs the Tier 1 continuation of the [$A_0$ Branch Certificate Protocol](../../../../markdown/aaa/validation/simulations/a0-branch-certificate-protocol.md) and the [stability constraint](../../../../markdown/aaa/assemblies/particle-masses.md#stability-constraint) of Particle Masses.

The action-increment claim is numerically meaningful only when $\delta_I$ is small, $\Delta_{\mathbf{k}}>0$, and the phase, energy, and root residuals remain below their predeclared tolerances across refinement.

##### Field-Speed Approach Scan

The campaign must include an approach-to-$c_f$ diagnostic on the same branch rows used for the action-increment calculation. This is not a new gate. It is the root-and-action stress test that prevents a stable-looking increment from being promoted when the branch survives only by numerical accident near the field-speed boundary.

This scan is the minimal numerical artifact for the paired action-spacing and self-hit well-posedness walls: it measures whether causal-root multiplicity, Jacobian floors, and stable-cycle action increments remain controlled as branch speed approaches $c_f$.

For each declared scan family, report rows approaching the field speed from below, at the boundary when the continuation reaches it, and from above when the branch chart admits a super-field-speed interval. Each row must record the layer speed ratios, active partner-root count, active self-root count, active inter-layer-root count, minimum accepted Jacobian floor, minimum accepted transmitter-side acceleration weight, separator status, root-ledger identity, accepted/rejected status, and stable-cycle $\Delta I_{\mathrm{ME}}$ cluster assignment.

The scan has a simple discipline. A packet may not promote `candidate_h_recovery` if the accepted near-boundary rows lose their Jacobian floor, change active-root identity under refinement, or split into non-uniform stable action increments without a derived branch-class reason. In that case the packet may still report a useful diagnostic, but it has not recovered the Planck benchmark from a well-posed coincident-midpoint orthogonal-axis braid action scale.

##### Required Packet Files

The minimum campaign packet contains the files below. In their rows, $\eta$ is the causal-surface mollifier width, $\epsilon_c$ is the coincidence-core regularization scale, and $\nu_J$ is the transmitter-side Jacobian floor, each with the meaning fixed in the [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md).

| File | Required contents |
| --- | --- |
| `campaign.json` | source commit, protocol version, run ids, integrator, tolerances, declared benchmark policy, the independent calibration behind $\mu_{\text{arch}}$ and the unit map, and whether $h$ and $\hbar$ entered only after the Master-Equation increment was computed |
| `branch_pairs.csv` | each $B_q\to B_{q'}$ row, branch labels, integer windings, inter-layer closure integers, transition window, and inclusion/exclusion status |
| `state_vectors.json` | pre/post layer radii, frequencies, speeds, plane normals, phase offsets, source channel, transaction axis, and mechanical endpoint charges |
| `root_ledger_before_after.json` | partner, self, and inter-layer roots before and after transition, with delays, action-level $g$, $u$, Jacobians, separator flags, and $\Delta N_{\mathrm{self}}$ |
| `torque_integrals.csv` | diagnostic $\int\boldsymbol{\tau}^{(A)}_1\,dT$, $\int\boldsymbol{\tau}^{(A)}_2\,dT$, $\int\boldsymbol{\tau}^{(A)}_3\,dT$, $\Delta\mathbf L_{\mathrm{wake},\partial}^{\mathrm{spec}}$, and projection onto $\hat{\mathbf n}_{\mathrm{txn}}$ |
| `action_increment_rows.csv` | $\Delta I_{\mathrm{ME}}$, absolute value, cluster id, accepted/rejected status, and failure code |
| `field_speed_approach_scan.csv` | scan-family id, speed-window label, layer speed ratios, active partner/self/inter-layer root counts, minimum accepted $|J|$, separator status, root-ledger stability, $\Delta I_{\mathrm{ME}}$, cluster id, accepted/rejected status, and failure code |
| `energy_ledger.csv` | $\sum_{a\in\{1,2,3\}}\int\omega_a\,dI_a$, $\Delta E_{\mathrm{wake}}$, $\Delta E_{\mathrm{coupl}}$, accepted $E_{\mathrm{wake}}^{(\eta)}$ when available, diagnostic $U$ if used, and $\mathcal{R}_E$ |
| `conservation_pullback.csv` | branch-chart id, cut/window id, $\eta$, $\epsilon_c$, `history_horizon`, endpoint convention, $\nu_J$, inactive-gap minimum, `memory_depth`, $K_{\mu}$, $E_{\mathrm{wake}}^{(\eta)}$, $\mathbf{P}_{\mathrm{mech}}$, $\mathbf{P}_{\mathrm{wake}}^{(\eta)}$, $\mathbf{J}_{\mathrm{mech}}$, $\mathbf{J}_{\mathrm{wake}}^{(\eta)}$, $\mathcal{R}_E$, $\mathcal{R}_P$, $\mathcal{R}_J$, provenance of the accepted motion-plus-wake update, and verdict. The two history fields carry absolute-time durations and are distinct from the observer-level Planck benchmark $h$. |
| `phase_closure_residuals.csv` | layer and inter-layer phase closure residuals, winding labels, and tolerance status |
| `floquet_report.json` | monodromy or finite-difference return map, excluded symmetry modes, multipliers, and $\Delta_{\mathbf{k}}$ |
| `cluster_summary.json` | $\Delta I_*$, class means, class standard deviations, $\delta_I$, $h_{\mathbb{A}\mathbb{A}\mathbb{A}}$, $\delta_h$, and promotion status |
| `convergence_table.csv` | the convergence rows required by [Convergence Tests](../../../../markdown/aaa/validation/simulations/convergence-tests.md), including active-root mismatch and stability-window shift |
| `negative_control_report.md` | null runs and the invariant, provenance, or stability channel they break |
| `promotion_gate.md` | final pass/fail statement and the strongest claim the packet authorizes |

##### Promotion Gates

A packet may promote `candidate_action_increment` only if all of the following pass:

1. $h$ and $\hbar$ are absent from the simulated equations of motion, the accepted-transition selection, and the calibration of $\mu_{\text{arch}}$ and the unit map, except as post-run benchmark labels.
2. Both endpoint packets satisfy branch-certificate eligibility, including return-map and acceleration-residual closure, on matching ledger identity and active-root convention.
3. At least one transition class has $0<\Delta I_*<\infty$ with a floor that is stable under family enlargement and refinement.
4. Endpoint branches and transition continuations have $\Delta_{\mathbf{k}}>0$ after symmetry modes are removed.
5. Phase closure, root residuals, energy residuals, momentum residuals, and angular-momentum residuals pass the predeclared tolerances.
6. $\delta_I$ is below the predeclared cluster tolerance.
7. The temporal, history-resolution, spatial, cross-integrator, and negative-control checks from [Convergence Tests](../../../../markdown/aaa/validation/simulations/convergence-tests.md) pass.
8. The packet reports $\delta_h$ honestly, whether or not the benchmark match is good.

Only a packet that also has small $\delta_h$ may promote `candidate_h_recovery`. A packet with a positive and stable $\Delta I_*$ but poor $\delta_h$ promotes only a derived action increment that does not recover the measured Planck benchmark.

##### Failure-Code Enum

| Code | Trigger |
| --- | --- |
| `input-hbar-contamination` | the run seeded transition size, branch selection, or tolerances from $\hbar$ before computing $\Delta I_{\mathrm{ME}}$, or fixed $\mu_{\text{arch}}$ or the unit map from $h$ |
| `no-positive-increment-floor` | accepted transitions accumulate arbitrarily small nonzero $\Delta I_{\mathrm{ME}}$ |
| `multi-cluster-action-scale` | multiple stable increment clusters appear with no derived reason to choose one |
| `nonpositive-floquet-gap` | an endpoint branch or transition continuation has $\Delta_{\mathbf{k}}\le0$ |
| `phase-closure-open` | layer or inter-layer closure residuals exceed tolerance |
| `root-ledger-instability` | active roots change under refinement or the self-hit parity condition fails |
| `jacobian-floor-loss` | accepted near-boundary records lose the declared minimum Jacobian floor |
| `transmitter-acceleration-weight-loss` | accepted records lose the declared transmitter-side acceleration-weight floor or leave its certified interval because $D_t$ is uncertified, approaches a pole, or changes sign under refinement |
| `field-speed-root-instability` | the approach-to-$c_f$ scan changes active-root identity, separator status, or branch status under refinement |
| `nonuniform-action-spacing` | stable-cycle action increments split across the field-speed approach scan with no derived branch-class reason |
| `energy-ledger-open` | $\mathcal{R}_E$ exceeds tolerance or the wake/root energy channel is unaccounted |
| `conservation-pullback-open` | $\mathcal{R}_P$ or $\mathcal{R}_J$ exceeds tolerance, or the exact Noether pullback uses different rows than the root ledger or acceleration residual |
| `convergence-fail` | required convergence or cross-integrator gates fail |
| `negative-control-fail` | the intentionally wrong model still passes the packet gates |
| `benchmark-mismatch` | $h_{\mathbb{A}\mathbb{A}\mathbb{A}}$ is stable but fails the declared $h$ benchmark tolerance |

##### Interpretation

This protocol preserves the level distinction. A passing action-increment packet would support the action-cell step used by [Wavefunction Ontology](../../../../markdown/aaa/quantum/wavefunction-ontology.md#lower-bound-on-recordable-basin-measure). It would not by itself derive the Born rule, spin statistics, Bell correlations, photon polarization, or observer-level orbital quantum numbers. Those remain downstream closure targets.

#### Retuning-Map Toy Model

This chapter defines a proposed arithmetic model for the cadence-scale retuning map introduced in [Coincident-Midpoint Orthogonal-Axis Braid Dynamics](../../../../markdown/aaa/noether-braid/zero-axial-offset-three-binary-dynamics-and-interpretation.md#cadence-scale-retuning-hypothesis). The model is not a delayed-dynamics proof. It tests conditional branch bookkeeping for a stipulated total cycle-plus-wake action transaction $\sigma h$, where $\sigma\in\{-1,+1\}$ and $h>0$ is an assumed action scale.

A Noether braid is a candidate neutral assembly of six architrinos in three binaries; cadence is a cycle frequency, and retuning changes that frequency together with the geometry. A branch chart specifies one local family of histories and its causal-root identities. Arithmetic feasibility can reject an inconsistent specification. It cannot establish a retained braid, physical acceptance of the transaction, or stability of the retuned history.

The quantities of interest are $(\Delta\nu_N,\Delta R_1,\Delta R_2,\Delta R_3,\Delta\lambda,\Delta\xi)$ and the corresponding first estimate for the cadence-space current $J_\nu$.

##### Scope and Evidence

No numerical evaluation is reported here. The model specifies a conditional calculation, not an observed action transaction or a demonstrated stable braid. Action increments are expressed in units of $h$, speeds relative to $c_f$, and radius and cadence changes as logarithmic increments. Numerical instantiations use $c_f=1$. The linked branch owner calls a candidate derived cycle-action unit $h_{\mathrm{act}}$; identifying it with the observer Planck benchmark requires the separate [Action-Increment Protocol](../../../../markdown/aaa/validation/simulations/coincident-midpoint-orthogonal-axis-action-increment-protocol.md). Inserting that benchmark into this toy calculation cannot count as recovering it. A physical return-map linearization requires a retained reference solution before any stability interpretation.

##### Replay Equation

On branch chart $q$, use positive radii $R_a$, positive cadence magnitudes $\nu_a$, a positive envelope scale $\lambda$, and a positive envelope shape ratio $\xi$. Circulation signs and orientations are separate fixed branch data. Every logarithm below acts on the dimensionless ratio to a fixed positive reference with the same units: $\ln\nu_a$ abbreviates $\ln(\nu_a/\nu_{a,*})$, and similarly for radius, scale, and shape. References remain fixed across the transaction. A zero-valued flattening coordinate is outside this logarithmic chart and must not silently replace the positive scale $\lambda$. The eight-component toy state is

$$
\mathbf{y}_q
=
\left(
\ln\nu_1,\ln\nu_2,\ln\nu_3,\,
\ln R_1,\ln R_2,\ln R_3,\,
\ln\lambda,\ln\xi
\right)^T
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6016bd6fa4dec409)

Given a real symmetric positive semidefinite $8\times8$ retuning-cost matrix $\mathbf K_q^{\mathrm{ret}}$, select an increment by the constrained minimization below. The cost has one declared normalization and is not assumed to be physical energy. The notation denotes a unique vector only under the uniqueness condition below; otherwise the argmin is a set.

$$
\Delta\mathbf{y}_{q,\sigma}
=
\underset{\Delta\mathbf{y}}{\operatorname{arg\,min}}\;
\frac{1}{2}\Delta\mathbf{y}^{T}
\mathbf{K}^{\mathrm{ret}}_q
\Delta\mathbf{y}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2f2be58ed4c74128)

subject to

$$
D A_{\mathrm{cyc},q}[\Delta\mathbf{y}]
+
\Delta A_{\mathrm{wake}}
=
\sigma h
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8850fe0716bb5eeb)

and the declared linearized branch constraints, evaluated at the same reference state. The action derivative is a linear functional with action units per dimensionless coordinate. The wake increment is prescribed independently; if it varies with the unknown state, its derivative belongs in the constraint row rather than being adjusted after solving.

Collect the action row divided by $h$ and the scaled branch rows into $C\Delta\mathbf y=b$. For $m$ rows, $C$ is an $m\times8$ real matrix, and the action component of $b$ is $\sigma-\Delta A_{\mathrm{wake}}/h$. Feasibility requires $b\in\operatorname{range}(C)$, equivalently $\operatorname{rank}(C)=\operatorname{rank}([C\ b])$. Duplicate rows are allowed only if their targets agree. An inconsistent system has no minimizer and is reported as infeasible.

On a nonempty affine feasible set, this semidefinite quadratic has a minimum. It is unique precisely when $\ker C\cap\ker\mathbf K_q^{\mathrm{ret}}=\{0\}$: the cost must be positive in every nonzero feasible direction. The optimality equations are $\mathbf K_q^{\mathrm{ret}}\Delta\mathbf y+C^T\boldsymbol\mu=0$ and $C\Delta\mathbf y=b$, with constraint multipliers $\boldsymbol\mu$. Redundant rows may make the multipliers nonunique even when the increment is unique. A null-cost feasible direction requires reporting the family or declaring an extra selection convention; a least-norm solver's choice is not a derived physical preference.

For finite log increments, reconstruct each positive component exactly as $z'=z\exp(\Delta\ln z)$ and $\Delta z=z[\exp(\Delta\ln z)-1]$. The action constraint remains first order: with a twice-differentiable action and Hessian norm bounded by $M_A$ on the step segment, its omitted term is at most $M_A\|\Delta\mathbf y\|^2/2$. Branch constraints need analogous bounds or direct nonlinear reevaluation. A one-unit action transaction need not be small in this chart. Impose a declared local step domain; rejecting a candidate outside it does not prove that every feasible increment or another branch is impossible.

For the circular characteristic-speed ansatz $s_a=2\pi R_a\nu_a$, the layer-speed diagnostic is

$$
\Delta\ln s_a
=
\Delta\ln R_a
+
\Delta\ln\nu_a,
\qquad
a\in\{1,2,3\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-161a0863a2c781cf)

This log-product identity is exact for the stated speed ansatz with fixed conversion factor; it is not a general instantaneous-speed formula for noncircular histories. Reconstruct $s_a'=s_a\exp(\Delta\ln R_a+\Delta\ln\nu_a)$ before checking the speed conditions. The reference must already lie in the selected domain, and $\epsilon_2\ge0$ is a dimensionless tolerance fixed beforehand. These source-record roles do not follow from the persistent indices or assign a taxonomy member:

$$
s_1'>c_f,
\qquad
\left|s_2'-c_f\right|\le\epsilon_2 c_f,
\qquad
s_3'<c_f
$$

[View →](../../../../../equation-mapping.html#corpus-equation-665a2b9b2bcfaf55)

For fixed nonnegative weights summing to one, define the representative cadence as a weighted geometric mean in the fixed reference units. Its log increment is

$$
\Delta\ln\nu_N
=
w_1\Delta\ln\nu_1
+
w_2\Delta\ln\nu_2
+
w_3\Delta\ln\nu_3,
\qquad
w_1+w_2+w_3=1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-bd4ef1008dbdcd71)

Thus $\Delta\nu_N=\nu_N[\exp(\sum_a w_a\Delta\ln\nu_a)-1]$, rather than the log increment itself. If the weights change during a transaction, their change must enter the extraction; the displayed identity applies to fixed weights only.

For a coarse-grained jump model, let $f_N(\nu,T)$ be braid number density per unit cadence at fixed spatial location, and $r_\sigma(\nu,T)\ge0$ the accepted transaction rate per braid per absolute time. Here $f_N$ is a distribution; the linked branch chapter uses that glyph for its representative cadence, written $\nu_N$ here. Set $\delta_\sigma=\Delta\nu_N^{(q,\sigma)}$ and $a_n=\sum_\sigma r_\sigma\delta_\sigma^n$. The current through second jump order is

$$
J_\nu
=
\sum_{\sigma=\pm1}
f_N r_\sigma\Delta\nu_N^{(q,\sigma)}
-\frac12\partial_\nu(f_N a_2)
+\mathcal R_{\ge3}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f914069606810168)

The first term is drift and the second is leading spreading. For a smooth compactly supported test function $\varphi$, the jump model gives $\partial_T\int\varphi f_N\,d\nu=\int f_N\sum_\sigma r_\sigma[\varphi(\nu+\delta_\sigma)-\varphi(\nu)]\,d\nu$. Taylor expansion and integration by parts yield $\partial_T f_N=-\partial_\nu(f_Na_1)+\tfrac12\partial_\nu^2(f_Na_2)+\cdots$, hence the displayed current in $\partial_T f_N+\partial_\nu J_\nu=0$. The remainder $\mathcal R_{\ge3}$ starts formally with $\tfrac16\partial_\nu^2(f_Na_3)$. Rates and jump sizes stay inside derivatives when they vary with cadence. Controlled truncation requires finite jump moments, bounded derivatives, jumps small relative to the distribution's variation scale, and a stated cadence-boundary treatment. Source, sink, or inter-branch transfers require additional terms. This is an effective statistical assumption, not a derivation of Markovian transport from delayed histories.

##### Model Inputs

Each scenario supplies:

| Input | Meaning |
| --- | --- |
| Reference state | positive $R_a,\nu_a,\lambda,\xi,\nu_N$, fixed reference units, branch label, $s_a,c_f,\epsilon_2$, and the reference constraint residuals |
| Cadence weights | weights $w_1,w_2,w_3$ used to extract $\Delta\nu_N$ |
| Retuning-cost matrix | declared symmetric matrix $\mathbf K_q^{\mathrm{ret}}$; diagonal nonnegative entries define the simple toy case |
| Action gradient | linearized $D A_{\mathrm{cyc},q}$ row in $h$ units per log variable |
| Branch constraints | linearized branch constraints, each with coefficients and target |
| Cadence distribution | local Noether braid cadence-state distribution value |
| Cadence-distribution slope | derivatives of the distribution and rate-weighted jump moments, through the retained transport order |
| Transactions | accepted or control $\sigma$ transactions with wake action increment and local rate density |

A diagonal matrix is a simplifying model choice. A physical application needs a justified response or variational construction that relates the cost to the same retained dynamics, including off-diagonal couplings when required. A return map alone does not uniquely determine a symmetric positive cost matrix.

##### Consistency Tests

A calculated increment is arithmetically admissible only if feasibility, the stated selection rule, local step domain, nonlinear remainder bounds, and speed conditions all pass their declared tolerances. The relevant diagnostics are the solved logarithmic retuning vector, the reconstructed component changes, the largest constraint residual, and the post-retuning speed in each binary. The cadence-current calculation also needs each transaction's contribution $f_N r_\sigma\Delta\nu_N^{(q,\sigma)}$, their sum, and the derivative of the second jump moment and a bound on $\mathcal R_{\ge3}$.

Two controls distinguish arithmetic consistency from physical evidence. Opposite action signs need not give opposite cadence jumps: even symmetric log steps give $\nu_N(e^d-1)$ and $\nu_N(e^{-d}-1)$, whose sum is $2\nu_N(\cosh d-1)$. Unequal rates can add further drift; symmetric finite cadence jumps with equal rates have zero first moment but can still produce a spreading current in a nonuniform distribution. Conversely, a solution of the linear action constraint is inadmissible if binary 2 leaves its declared wake-speed tolerance. Neither control establishes that an actual braid realizes the assumed transaction.

A residual above tolerance means that the linearized constraints are unsatisfied. A speed-regime crossing rejects the proposed increment in that domain; it does not prove the constrained problem has no other admissible solution. Linearized equality and endpoint speed checks also do not certify unchanged causal-root topology along the path. A large higher-order current remainder calls for smaller increments or a higher-order transport approximation.

The physical derivation remains open. It requires a dynamically justified $\mathbf K_q^{\mathrm{ret}}$, nonlinear retained-branch continuation with preservation of the same causal-root ledger, and speed conditions evaluated on the same branch state that supplies $\Delta\nu_N$. An arithmetic solution without that dynamical input is only a conditional retuning model.

### Metric / Observer

#### Static Response Vector Toy Model

The Noether sea is the ambient population of Noether braid assemblies. Its local cadence-stretch factor $\Gamma_N$ is the reference cadence divided by the local cadence; its reciprocal is the corresponding normalized clock-rate factor on the declared shared clock branch. The parameterized post-Newtonian (PPN) framework supplies an observer-level weak-gravity comparison.

This protocol documents the first replay fixture for the weak static response vector used in the $\Gamma_N$ geometry extraction target. It is a small arithmetic gate for the endpoint row in [Proper Time and Time Dilation](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md#gamma-n-geometry-extraction-target) and the Shapiro-delay coefficient in [PPN Parameters](../../../../markdown/aaa/spacetime/ppn-parameters.md#explicit-weak-field-noether-sea-delay-map-ppn-gamma).

The fixture is not an empirical PPN fit. It keeps the clock cadence row, the clock-rate row, and the signal-delay coefficient separate while the $\mathbb{A}\mathbb{A}\mathbb{A}$ constitutive response is still being derived.

##### Runtime Artifact

Run the default mock packet with:

```text
node scripts/spacetime/static-response-vector-toy-model.mjs --pretty
```

The script consumes:

```text
scripts/spacetime/static-response-vector-mock.json
```

and emits one result row per scenario.

##### Replay Equations

Use the stationary, isotropic, nondispersive, zero-shift comparison branch and fixed standard PPN chart of the linked PPN owner, with common asymptotic clock and ruler calibration. Let $U=-\Phi_N>0$ have speed-squared units, $c_0=c_{\mathrm{eff}}(\infty)$, and $u=U/c_0^2\ll1$. Normalize the positive density ratio $n$ and envelope scale $\lambda$ to one in the reference cell; take $R_{\mathrm{braid},0}>0$ and $\chi_{\mathrm{sea},0}=c_f/c_0>0$, which need not equal one. Numerical instantiations use $c_f=1$ without identifying it with $c_0$. For a weak static endpoint cell, write

$$
\ln n=a_n\frac{U}{c_0^2},\qquad
\ln\frac{\chi_{\text{sea}}}{\chi_{\mathrm{sea},0}}=a_\chi\frac{U}{c_0^2},\qquad
\ln\lambda=a_\lambda\frac{U}{c_0^2},\qquad
\ln\frac{R_{\text{braid}}}{R_{\text{braid},0}}=a_R\frac{U}{c_0^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-de1046c46595692a)

These are first-order expansions with an omitted $O(u^2)$ remainder in each component. The four-component response is a vector of dimensionless scalar feature derivatives, not a spatial vector or acceleration. This four-feature specialization holds the shape contribution zero at the retained order; isotropy alone does not establish that restriction. The cadence-stretch row, as a weak-redshift recovery target rather than a derived constitutive law, must satisfy

$$
b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R=1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-953a48797990d736)

while the inverse clock-rate row must satisfy

$$
\omega_n a_n+\omega_\chi a_\chi+\omega_\lambda a_\lambda+\omega_R a_R=-1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ae41bab5f949f37c)

The row-inverse condition checks

$$
b_i+\omega_i=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-1c43cb618b3469c0)

for $i\in\{n,\chi,\lambda,R\}$. Coefficient inversion enforces reciprocal clock and cadence response throughout the declared four-dimensional feature domain. The two endpoint dot products alone only imply $(\mathbf b+\boldsymbol\omega)\cdot\mathbf a=0$ along one response direction; they do not determine all four coefficients.

The Shapiro-delay neighbor supplies

$$
a_\chi^{\mathrm{sig}}=1+\gamma_{\mathrm{PPN}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-755895c36f9de785)

so the shared clock/signal delay residual is

$$
\Delta_\chi^{\mathrm{clk\text{-}sig}}
=
a_\chi-a_\chi^{\mathrm{sig}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-aaed5ebd81e127ec)

The supplied coefficients satisfy the shared-delay arithmetic only when $\Delta_\chi^{\mathrm{clk\text{-}sig}}=0$ within the declared tolerance.

In the same weak static metric comparison with a common independently calibrated source potential, the GR-matching signal-deflection target is

$$
\gamma_{\mathrm{PPN}}=1,
\qquad
a_\chi^{\mathrm{sig}}=2
$$

[View →](../../../../../equation-mapping.html#corpus-equation-002feaffad73d597)

while the clock endpoint must separately satisfy the cadence and inverse-clock equations above. A value $a_\chi^{\mathrm{sig}}\neq2$ misses that GR-matching coefficient under these assumptions; it is not by itself a clock/signal split, which is diagnosed by $\Delta_\chi^{\mathrm{clk\text{-}sig}}$. The fixture contains no orbital, hydrostatic, ray-tracing, or mass-inference calculation and establishes no galaxy or cluster lensing/dynamics equality.

##### Minimal Shared-Delay Packet

The first admissible static endpoint packet is the shared scalar delay response specialization of the equations above. Define

$$
A_\chi\equiv1+\gamma_{\mathrm{PPN}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-15c18a8f6475836f)

Assume $A_\chi\neq0$; at $\gamma_{\mathrm{PPN}}=-1$ the proposed pure-delay vector vanishes and cannot satisfy the endpoint target. The minimal response vector is

$$
\left(
a_n,\,
a_\chi,\,
a_\lambda,\,
a_R
\right)
=
\left(
0,\,
A_\chi,\,
0,\,
0
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b4087c75dcc2e063)

with cadence row

$$
\left(
b_n,\,
b_\chi,\,
b_\lambda,\,
b_R
\right)
=
\left(
0,\,
A_\chi^{-1},\,
0,\,
0
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-45336e0578f5886a)

and inverse clock-rate row

$$
\left(
\omega_n,\,
\omega_\chi,\,
\omega_\lambda,\,
\omega_R
\right)
=
\left(
0,\,
-A_\chi^{-1},\,
0,\,
0
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7fa5ee9f40685ed2)

For the GR-matching branch, this gives $A_\chi=2$, $a_\chi=2$, $b_\chi=1/2$, and $\omega_\chi=-1/2$. The `shared_delay_clean_gr_branch` row in the mock packet is exactly this replay. The `density_scale_compensated_branch` row samples the remaining compensated family, where nonzero $a_n$, $a_\lambda$, or $a_R$ are allowed only if the same cadence row still satisfies $b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R=1$ and the inverse row remains $\omega_i=-b_i$.

##### Pressure Bridge

Pressure-response packets can feed the same fixture after their anisotropic terms are separated from the isotropic static projection. Here $\delta\ln q$ denotes the logarithm of a ratio of positive endpoint values, with $R=R_{\mathrm{braid}}$. A fixed local coefficient row predicts these increments to first order; for a nonlinear constitutive map the neglected remainder is $O(\|\delta\mathbf g^P\|^2)$ and requires a separate bound. The script evaluates the linear ansatz exactly and does not estimate that remainder. For a pressure row $r$, the bridge uses

$$
\delta\mathbf{g}_r^{P}
=
\left(
\delta\ln n,\,
\delta\ln\chi_{\text{sea}},\,
\delta\ln\lambda,\,
\delta\ln R
\right)_r
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f0eb6c3085236f38)

and checks the pressure version of the cadence row:

$$
\widehat{\delta\ln\Gamma}_{N,r}^{P}
=
b_n\delta\ln n_r
+b_\chi\delta\ln\chi_{\text{sea},r}
+b_\lambda\delta\ln\lambda_r
+b_R\delta\ln R_r
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b46f88398900ea10)

The pressure cadence residual is

$$
\mathcal{R}_{\Gamma,r}^{P}
=
\widehat{\delta\ln\Gamma}_{N,r}^{P}
-\delta\ln\Gamma_{N,r}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-57966ac8e89f2e87)

The inverse clock-rate row must also close:

$$
\mathcal{R}_{C,r}^{P}
=
\left(
\omega_n\delta\ln n_r
+\omega_\chi\delta\ln\chi_{\text{sea},r}
+\omega_\lambda\delta\ln\lambda_r
+\omega_R\delta\ln R_r
\right)
+\delta\ln\Gamma_{N,r}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-101e700c091ae24f)

When `derive_response` is `gamma_normalized`, the fixture also forms a normalized static-equivalent response vector

$$
a_i^{P\to\Gamma}
=
\frac{\delta g_i^P}{\delta\ln\Gamma_N}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d8828178bd959776)

This normalization requires nonzero $\delta\ln\Gamma_N$ and becomes ill-conditioned near zero relative to measurement uncertainty. With the same row it makes the normalized endpoint condition an algebraic rescaling of the pressure cadence condition, not an independent test. This normalization makes pressure rows replayable by the same endpoint arithmetic, but it does not convert pressure loading into a gravitational PPN branch. The `gamma_eff_sweep` diagnostic is only an algebraic comparison against $a_\chi^{\mathrm{sig}}=1+\gamma_{\mathrm{PPN}}$; a pressure-normalized value that closes for some formal $\gamma_{\mathrm{PPN}}$ is not a solar-system Shapiro result.

Anisotropic pressure entries, such as $\Delta\Pi^{\parallel-\perp}$ or deviatoric strain, must be either projected out before the isotropic static row is evaluated or carried in `anisotropic_residuals`. The isotropic $\Gamma_N$ row must not absorb directional pressure response as a hidden scalar coefficient. The script carries `anisotropic_residuals` as metadata; it does not perform a tensor projection or check its correctness.

##### Input Packet

Each scenario supplies:

| Field | Meaning |
| --- | --- |
| `gamma_eff` | PPN Shapiro-delay coefficient through $a_\chi^{\mathrm{sig}}=1+\gamma_{\mathrm{PPN}}$ |
| `gamma_eff_sweep` | optional list of trial $\gamma_{\mathrm{PPN}}$ values for the shared-delay diagnostic |
| `response` | static weak-potential response vector $(a_n,a_\chi,a_\lambda,a_R)$ |
| `pressure_bridge` | optional pressure row used to derive a normalized static-equivalent response vector |
| `cadence_row` | cadence-stretch coefficients $(b_n,b_\chi,b_\lambda,b_R)$ for $\ln\Gamma_N$ |
| `clock_rate_row` | inverse clock-rate coefficients $(\omega_n,\omega_\chi,\omega_\lambda,\omega_R)$ |
| `expect_shared_delay` | defaults to requiring shared delay; `false` waives this requirement rather than asserting a nonzero residual |
| `tolerance` | optional scenario-level residual tolerance |

##### Output Diagnostics

The fixture reports:

| Output field | Meaning |
| --- | --- |
| `diagnostics.a_chi_sig` | signal-delay coefficient fixed by the PPN Shapiro map |
| `diagnostics.delta_chi_clk_sig` | shared clock/signal delay residual |
| `diagnostics.gamma_eff_sweep` | optional sweep of shared-delay residuals over trial $\gamma_{\mathrm{PPN}}$ values |
| `diagnostics.endpoint_sum` | cadence-stretch row sum |
| `diagnostics.endpoint_residual` | endpoint residual relative to $1$ |
| `diagnostics.clock_rate_sum` | inverse clock-rate row sum |
| `diagnostics.clock_rate_residual` | clock-rate residual relative to $-1$ |
| `diagnostics.row_inverse_residuals` | coefficient-by-coefficient residuals $b_i+\omega_i$ |
| `diagnostics.pressure_bridge` | optional pressure-row replay of $\mathcal{R}_{\Gamma}^{P}$, $\mathcal{R}_{C}^{P}$, and effective-speed identity |

These diagnostics test supplied arithmetic. In the current script, omitted cadence or clock rows produce null residuals with passing flags; missing coefficients within a supplied row default to zero. An omitted speed-identity observation also passes without evaluation. An explicit `response` takes precedence over pressure-derived normalization without a consistency check between the two. `gamma_eff_sweep` and anisotropic metadata do not determine scenario status. The command exits successfully even when result rows fail, so consumers must inspect both record completeness and the JSON statuses.

The effective-speed check, when both observations exist, evaluates $\delta\ln\chi_{\mathrm{sea}}+\delta\ln(c_{\mathrm{eff}}/c_f)=0$, an identity for a consistently defined delay factor at fixed $c_f$. It does not derive a constitutive speed law. Use finite numerical inputs and a nonnegative dimensionless tolerance; the script does not enforce positivity of underlying physical records, schema identity, or nonnegativity of the tolerance. A later measured response requires independent instrument provenance, uncertainty and truncation bounds, common branch calibration, and complete required rows before these arithmetic diagnostics can support physical comparison.

##### Expected Mock Behavior

The default mock packet has five rows.

| Scenario | Expected behavior |
| --- | --- |
| `shared_delay_clean_gr_branch` | Passes with $\gamma_{\mathrm{PPN}}=1$, $a_\chi=2$, and $b_\chi=0.5$. |
| `density_scale_compensated_branch` | Passes with nonzero density, scale, and core-radius responses while preserving the endpoint and row-inverse constraints. |
| `split_clock_signal_delay_branch` | Fails shared-delay closure even though its endpoint and clock-rate rows close arithmetically. |
| `underclosed_clock_row` | Fails the endpoint and clock-rate sums while satisfying the shared-delay residual. |
| `pressure_bridge_fe_cr_toy_isotropic_projection` | Passes the pressure-projected cadence and clock-rate rows using the Fe/Cr toy isotropic projection, while correctly reporting that its pressure-normalized $a_\chi^{P\to\Gamma}=0.6$ is not the GR-matching Shapiro branch. |

The two failing rows are intentional failure witnesses. They show that a model can fit the static clock row while violating shared delay, or satisfy shared delay while underclosing the endpoint row. The pressure bridge row is a third kind of witness: it demonstrates that a pressure packet can close the isotropic $\Gamma_N$ arithmetic while still remaining outside the gravitational PPN interpretation.

##### Compensated-Family Validation Result

The executable separates three claims that should not be collapsed.

First, the minimal shared-delay row passes the weak GR endpoint:

$$
\left(
a_n,\,
a_\chi,\,
a_\lambda,\,
a_R
\right)
=
\left(
0,\,
2,\,
0,\,
0
\right),
\qquad
\left(
b_n,\,
b_\chi,\,
b_\lambda,\,
b_R
\right)
=
\left(
0,\,
\frac{1}{2},\,
0,\,
0
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-02bdd1e32326471a)

Second, the density/scale-compensated row also passes the endpoint and inverse-row checks:

$$
\left(
a_n,\,
a_\chi,\,
a_\lambda,\,
a_R
\right)
=
\left(
0.25,\,
2,\,
-0.1,\,
0.05
\right),
\qquad
\left(
b_n,\,
b_\chi,\,
b_\lambda,\,
b_R
\right)
=
\left(
0.4,\,
0.4,\,
-0.5,\,
1
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-eff82b8a77ad6499)

because

$$
0.4(0.25)+0.4(2)+(-0.5)(-0.1)+1(0.05)=1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a2e5034aebc68bd6)

This is an admissibility witness for the compensated static family, not a derivation of those numbers.

Third, the Fe/Cr pressure bridge falsifies the $\chi_{\text{sea}}$-only shared row for the toy isotropic pressure projection. The pressure-normalized response is

$$
\mathbf{a}^{P\to\Gamma}
=
\left(
0,\,
0.6,\,
0,\,
0
\right)^T
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c0ee41fb50bd9e25)

so no single $\chi_{\text{sea}}$ coefficient can satisfy both

$$
b_\chi(2)=1,
\qquad
b_\chi(0.6)=1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-794a88ddcbadfd48)

The incompatibility is conditional on these two pure-delay response vectors and one common coefficient row. The pure-delay pressure vector fixes $b_\chi=5/3$; retaining the static value $a_\chi=2$ would then require the sum of non-delay static contributions to equal $1-10/3=-7/3$. It does not require each such component to be nonzero. More generally, a pressure response with non-delay components does not require non-delay static responses: $\mathbf a^G=(0,2,0,0)$, $\mathbf a^P=(0,0.6,0.7,0)$ and $\mathbf b=(0,0.5,1,0)$ satisfy both dot products with target one.

For several normalized response records, a shared row exists exactly when the linear system whose rows are the response vectors and whose target entries are one is consistent; the row is unique only when those records span the four-dimensional feature space. The mock scenarios choose their rows separately and do not establish one universal coefficient row. Branch-derived responses and a justified common constitutive domain are needed to promote any component split beyond these algebraic witnesses.

The hydrogen spectral toy scan may replay this compensated row as a scaffold, but that replay is not evidence that the gravitational endpoint has acquired nonzero $a_n$, $a_\lambda$, or $a_R$. Those entries become promotable only when the hydrogen branch or another declared branch derives the same component split for the same Noether sea cell.

#### Hydrogen $\Gamma_N$ Spectral Coefficient Row Toy Scan

The Noether sea is the ambient population of Noether braid assemblies. Its cadence-stretch factor $\Gamma_N>0$ is reference cadence divided by local cadence; the proposed shared clock branch uses its reciprocal as the normalized clock-rate factor.

This protocol is a constructed arithmetic packet for the hydrogen spectral coefficient row $\mathbf{b}_{N}^{\mathrm{spec}}$. Its purpose is narrow: constrain the row that extracts $\Gamma_N$ for the hydrogen spectral channel without fitting a separate clock factor to each line. A passing finite candidate scan checks those supplied records; it does not establish an independently inferred hydrogen coefficient row.

The packet depends on the clock/rate convention in [Proper Time and Time Dilation](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md#hydrogen-spectral-clock-rate-conversion-target) and the hydrogen line-set benchmark in [Atomic Spectra](../../../../markdown/aaa/nuclear-atomic/atomic-spectra.md#hydrogen-rydberg-benchmark-target). It keeps the cadence-stretch factor and the observer frequency multiplier separate:

$$
C_{N,\mathrm H}^{(\ell)}
=
\left(\Gamma_{N,\mathrm H}^{(\ell)}\right)^{-1}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-763386ea69e29115)

##### Runtime Artifact

Run the default executable packet with:

```text
node scripts/spacetime/hydrogen-gamma-n-spectral-row-toy-scan.mjs --pretty
```

The script consumes:

```text
scripts/spacetime/hydrogen-gamma-n-spectral-row-mock.json
```

and emits one result row per scenario. The packet also keeps one mock passing shared-row case and intentional failure witnesses for direct cadence multiplication, per-line row fitting, endpoint-row violation, and response-record mismatch.

The default packet now begins with `hydrogen_rydberg_static_response_scaffold`. That scenario is not a completed hydrogen derivation, but it is a scaffold organized around theory recovery targets: the line labels are ordinary hydrogen transitions with recovered principal labels, the executable derives normalized Rydberg line factors, the envelope gaps declare one shared line-inferred cadence stretch, the $\mathbf{g}_{N,\mathrm H}^{(\ell)}$ entries preserve the density/delay/scale/core split, and the static response vector copies the declared values of the static response packet. The script does not load or authenticate that neighboring packet at runtime.

##### Theory-Bearing Input Scaffold

The scaffold uses the line factors from the hydrogen Rydberg benchmark as observer-level recovery targets, not primitive dynamics. Here $n_a>n_b$ are positive principal-label integers, distinct from the density variable $n$; the resolution superscript $(\ell)$ is not an orbital angular label. For each line object, the executable reads the recovered labels `principal_n_a` and `principal_n_b` and forms

$$
\Lambda_{ab}
=
\frac{1}{n_b^2}
-
\frac{1}{n_a^2}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8378006f41db916f)

Both frequency and envelope-gap-over-$h$ entries use one fixed frequency unit; the normalized numbers below are dimensionless numerical values in that unit. The physical gap divided by $h$ has inverse-time units, with frequency in cycles per time, not angular frequency. The record-level `frequency_scale` represents the normalized $R_{\mathrm H}c_{\gamma,0}$ comparison scale. In the first scaffold this comparison scale is chosen as the frequency unit, so the executable constructs

$$
\nu_{a\to b}^{\mathrm{obs},(\ell)}
=
\Lambda_{ab}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-55f8ad8906861bdd)

The record-level `line_inferred_ln_Gamma_N` supplies a declared cadence stretch used to derive the replay envelope gap:

$$
\frac{
E_{\text{env}}^{(\ell)}(a)-E_{\text{env}}^{(\ell)}(b)
}{
h
}
=
e^{0.001}\Lambda_{ab}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f3999a86c93c8426)

so every selected line infers

$$
\ln\widehat\Gamma_{N,\mathrm H}^{(\ell)}(a,b)
=
0.001
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8c468f682d4da342)

The accepted scaffold row is the density/scale-compensated static-response row

$$
\mathbf{b}_{N}^{\mathrm{spec}}
=
\left(
0.4,\,
0.4,\,
-0.5,\,
1,\,
1
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0b1d5badb58fbbbb)

with static response vector

$$
\left(
a_n,\,
a_\chi,\,
a_\lambda,\,
a_R
\right)
=
\left(
0.25,\,
2,\,
-0.1,\,
0.05
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-bd606b5cb197f1a4)

It satisfies the endpoint constraint because

$$
0.4(0.25)+0.4(2)+(-0.5)(-0.1)+1(0.05)=1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-c16b16de3198a0ec)

The two admissible spectral records keep different component splits while preserving the same row prediction:

$$
\mathbf{g}_{N,\mathrm H}^{(A)}
=
\left(
0.0005,\,
0.002,\,
0.0002,\,
0,\,
0.0001
\right)^T,
\qquad
\mathbf{g}_{N,\mathrm H}^{(B)}
=
\left(
0.0007,\,
0.0018,\,
0.0001,\,
0,\,
0.00005
\right)^T
$$

[View →](../../../../../equation-mapping.html#corpus-equation-96bed8f6f2191331)

and

$$
\mathbf{b}_{N}^{\mathrm{spec}}\cdot\mathbf{g}_{N,\mathrm H}^{(A)}
=
\mathbf{b}_{N}^{\mathrm{spec}}\cdot\mathbf{g}_{N,\mathrm H}^{(B)}
=
0.001
$$

[View →](../../../../../equation-mapping.html#corpus-equation-46d308d4693eff56)

The same declared stretch generates every gap and frequency ratio: dividing $e^{0.001}\Lambda_{ab}$ by $\Lambda_{ab}$ cancels the line factor exactly. Multiple line labels therefore do not independently corroborate the stretch. This remains a constructed arithmetic witness. It checks that a declared row inherited from the static response packet can control several hydrogen line labels across two admissible records without collapsing $n$ and $\chi_{\text{sea}}$ or fitting a separate coefficient row to each transition.

The scaffold still has a limited claim level. It derives the observer-frequency and envelope-gap entries from the Rydberg line-factor equation and a declared shared cadence stretch, but it does not derive the hydrogen envelope gaps from the master dynamics, does not derive the static response vector, and does not assign real observer frequencies. Its job is to make those inputs explicit and replaceable while keeping the coefficient-row scan executable.

##### Hydrogen Spectral Residual Separation

The row scan uses the Rydberg principal-label factor as its leading benchmark, but real hydrogen spectroscopy is not exhausted by that factor. The observer-level comparison stack separates at least five corrections that must not be hidden inside $\Gamma_N$:

| Channel | Standard benchmark role | Packet treatment |
| --- | --- | --- |
| reduced mass | replaces $m_e$ by $m_eM/(m_e+M)$ in the leading Coulomb spectrum | declared input to the envelope gap, not a per-line row fit |
| fine structure | relativistic kinetic, spin-orbit with Thomas-precession factor, and Darwin/contact terms split levels at order $(Z\alpha)^4$ | later correction residual, not part of the shared cadence row |
| hyperfine structure | nuclear spin and magnetic moment couple to electron spin/orbital channels | apparatus/source-branch residual unless explicitly modeled |
| Lamb-type shift | QED photon-field correction splitting Dirac-degenerate levels | external QED recovery residual |
| finite nuclear structure | nuclear size and magnetic distribution affect hydrogen levels; an electric quadrupole term requires a nucleus supporting that moment | envelope/source-model residual |

For a line $a\to b$, write the declared comparison gap as
$$
\Delta E_{\mathrm H}^{(\ell)}(a,b)
=
\Delta E_{\mathrm{Ryd}}(a,b)
+
\Delta E_{\mathrm{fs}}(a,b)
+
\Delta E_{\mathrm{hfs}}(a,b)
+
\Delta E_{\mathrm{Lamb}}(a,b)
+
\Delta E_{\mathrm{nuc}}(a,b)
+
\Delta E_{\mathrm{rem}}(a,b)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-75cb6c62dd8f8dee)

The current toy scaffold sets the correction terms to zero by declaration and therefore tests only the shared-row handling of the leading Rydberg factor. A non-toy packet must report a residual-separation check
$$
\mathcal{R}_{\mathrm{H,res}}^{(\ell)}
=
\max_{(a,b)\in\mathcal L_{\mathrm H}^{0}}
\frac{
\left|
\Delta E_{\mathrm H}^{(\ell)}(a,b)
-
\sum_{c\in\{\mathrm{Ryd},\mathrm{fs},\mathrm{hfs},\mathrm{Lamb},\mathrm{nuc}\}}
\Delta E_c(a,b)
\right|
}{
\varepsilon_{\mathrm{rem}}(a,b)
}
\le 1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6fd6aa7d88433d84)

Here $\varepsilon_{\mathrm{rem}}(a,b)>0$ is a fixed energy uncertainty budget, with terms defined in one calibration and without double counting recoil or nuclear contributions. The displayed decomposition makes the numerator the magnitude of the declared remainder; it tests a budget only when that remainder and the correction channels are independently determined. The executable does not evaluate this residual. A completed implementation would use it to prevent the coefficient scan from absorbing known spectral physics into the cadence-stretch row. It also fixes the degeneracy burden: the ideal nonrelativistic Coulomb comparison has $n^2$ orbital states at fixed principal label before electron spin is counted, which the recovery target must reproduce before correction channels split it, while the fine-structure channel may depend on $j$ and the hyperfine channel may depend on nuclear-spin records.

##### Compensated-Row Readout

The current scaffold makes the compensated-family test explicit. The accepted split-record row is

$$
\mathbf{b}_{N}^{\mathrm{spec}}
=
\left(
0.4,\,
0.4,\,
-0.5,\,
1,\,
1
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0b1d5badb58fbbbb-2)

with

$$
\mathbf{g}_{N,\mathrm H}^{(A)}
=
\left(
0.0005,\,
0.002,\,
0.0002,\,
0,\,
0.0001
\right)^T,
\qquad
\mathbf{g}_{N,\mathrm H}^{(B)}
=
\left(
0.0007,\,
0.0018,\,
0.0001,\,
0,\,
0.00005
\right)^T
$$

[View →](../../../../../equation-mapping.html#corpus-equation-96bed8f6f2191331-2)

The refinement difference satisfies

$$
\mathbf{b}_{N}^{\mathrm{spec}}\cdot
\left(
\mathbf{g}_{N,\mathrm H}^{(B)}
-
\mathbf{g}_{N,\mathrm H}^{(A)}
\right)
=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b046ca020fb02f73)

so both records give the same $\ln\Gamma_{N,\mathrm H}=0.001$ while preserving separate $n$, $\chi_{\text{sea}}$, $\lambda$, and $R_{\text{braid}}$ entries. By contrast, the shared-delay-only control row

$$
\left(
0,\,
\frac{1}{2},\,
0,\,
1,\,
0
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8c167a0768bb8224)

predicts record $B$ at $0.0009$, a prediction-minus-declared-stretch difference of $-0.0001$. With the executable’s $A-B$ convention the refinement residual is $+0.0001$ in the default scaffold. This is a scan-logic falsification witness, not a hydrogen validation result: atom-local refinement can reject the minimal row when the accepted response record changes component split, but the scaffold does not yet require nonzero gravitational endpoint coefficients $a_n$, $a_\lambda$, or $a_R$ unless a constitutive hydrogen branch derives the same split from the static endpoint response.

##### Input Variables

Each toy packet supplies one weak-homogeneous hydrogen line set $\mathcal L_{\mathrm H}^{0}$ and one or more admissible resolution records $\ell\in I_{\mathrm{spec}}^{\mathrm{atom}}$. For each record, the packet declares:

| Variable | Meaning |
| --- | --- |
| $\Theta_{\mathrm H,\mathrm{spec}}^{(\ell)}$ | shared hydrogen channel ledger used to extract the envelope gaps and local Noether sea response |
| $\mathcal L_{\mathrm H}^{0}$ | chosen isolated hydrogen transitions $a\to b$ with recovered labels |
| $E_{\text{env}}^{(\ell)}(a)-E_{\text{env}}^{(\ell)}(b)$ | envelope gap from the same spectral channel record |
| $\nu_{a\to b}^{\mathrm{obs},(\ell)}$ | observer-level frequency used only after the clock-rate conversion is declared |
| $\mathbf{g}_{N,\mathrm H}^{(\ell)}$ | shared clock-facing deformation record for the line set |
| $\varepsilon_{\Gamma},\Delta_{\Gamma}^{\mathrm{tol}}$ | line-inferred cadence-stretch denominator floor and tolerance |
| $\varepsilon_{\mathrm{row}},\Delta_{\mathrm{row}}^{\mathrm{tol}}$ | coefficient row denominator floor and row-stability tolerance |
| $\mathcal R_{\Gamma,\mathrm H}^{\mathrm{spec},(\ell)}$ | declared higher-order residual budget, not a fitted clock row |

The deformation record is the one used by the hydrogen clock/rate target. All arguments are positive; density, scale and shape are normalized to one in the reference cell, $R_{\mathrm{braid},0}>0$, and $\chi_{\mathrm{sea},0}=c_f/c_{\mathrm{eff},0}>0$ need not be one. Numerical work uses $c_f=1$, separately from the observer frequency unit. The stored `ln_chi_sea` key must carry the normalized logarithm below; the script simply reads that number and does not enforce its reference calibration.

$$
\mathbf{g}_{N,\mathrm H}^{(\ell)}
=
\left(
\ln n_{\mathrm H}^{(\ell)},\,
\ln\frac{\chi_{\text{sea},\mathrm H}^{(\ell)}}{\chi_{\mathrm{sea},0}},\,
\ln\lambda_{\mathrm H}^{(\ell)},\,
-\ln\xi_{\mathrm H}^{(\ell)},\,
\ln\frac{R_{\text{braid},\mathrm H}^{(\ell)}}{R_{\text{braid},0}}
\right)^T
$$

[View →](../../../../../equation-mapping.html#corpus-equation-715f91247a96ce2a)

For each line, the packet also forms the line-inferred cadence stretch. Here $h$ is the observer-level action benchmark in the recovered spectroscopic energy-frequency relation; it is not a substrate input and cannot be fitted independently inside this scan.

$$
\widehat\Gamma_{N,\mathrm H}^{(\ell)}(a,b)
=
\frac{
E_{\text{env}}^{(\ell)}(a)
-
E_{\text{env}}^{(\ell)}(b)
}{
h\nu_{a\to b}^{\mathrm{obs},(\ell)}
}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-94c038d78f3fb9eb)

The displayed ratio assumes zero event-frequency residual, a positive gap and frequency, and an envelope energy calibrated before applying the clock conversion. For the general owner’s conversion, replace the frequency denominator by $\nu^{\mathrm{obs}}-\nu^{\mathrm{res}}>0$ and propagate its independent uncertainty. An energy already calibrated as $h\nu^{\mathrm{obs}}$ cannot receive the clock factor again. The toy sets that residual and the higher-order row remainder to zero; it does not estimate or subtract either budget. This inferred value is a diagnostic readout. It is not a permission to fit a separate $\Gamma_N$ or coefficient row to the transition.

##### Coefficient Constraints

The spectral row has the same component order as the $\Gamma_N$ extraction target:

$$
\mathbf{b}_{N}^{\mathrm{spec}}
=
\left(
b_n^{\mathrm{spec}},\,
b_\chi^{\mathrm{spec}},\,
b_\lambda^{\mathrm{spec}},\,
1,\,
b_R^{\mathrm{spec}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-65baded38ee379b1)

The fixed fourth entry imposes the homogeneous Lorentz-branch constraint $b_\xi=1$ only under that branch’s remainder assumptions; it is not derived for hydrogen by this scan. The remaining entries must satisfy the static weak-field endpoint constraint when evaluated on the same static response vector used by the clock row:

$$
b_n^{\mathrm{spec}}a_n
+b_\chi^{\mathrm{spec}}a_\chi
+b_\lambda^{\mathrm{spec}}a_\lambda
+b_R^{\mathrm{spec}}a_R
=
1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9d9151e80a3edae2)

within the declared endpoint tolerance. If the packet also supplies the inverse clock-rate row $\boldsymbol{\omega}^{\mathrm{spec}}$, then it must satisfy

$$
\omega_i^{\mathrm{spec}}
=
-b_i^{\mathrm{spec}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-977f6ccceaaa5ffe)

for $i\in\{n,\chi,\lambda,R\}$, and $\omega_\xi=-1$ for the shape entry if the full five-feature reciprocal row is used. These are coefficient identities on the declared feature domain, stronger than a single endpoint dot product. The executable does not accept or test an inverse clock-rate row. A branch may additionally impose shared clock/signal delay only by declaring the same condition used in the static response vector packet:

$$
a_\chi
=
1+\gamma_{\mathrm{PPN}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-fc15015a2aa080cc)

The spectral coefficient row is therefore a constrained row inherited from clock closure. It is not a spectral nuisance parameter and not a per-line normalization constant.

##### Minimal Toy Scan

The minimal scan is a finite grid over the four free entries $(b_n^{\mathrm{spec}},b_\chi^{\mathrm{spec}},b_\lambda^{\mathrm{spec}},b_R^{\mathrm{spec}})$ after setting $b_\xi=1$.

1. Reject every row that violates the endpoint constraint

   $$
   \left|
   b_n^{\mathrm{spec}}a_n
   +b_\chi^{\mathrm{spec}}a_\chi
   +b_\lambda^{\mathrm{spec}}a_\lambda
   +b_R^{\mathrm{spec}}a_R
   -1
   \right|
   >
   \Delta_{\mathrm{row}}^{\mathrm{tol}}
   $$

   [View →](../../../../../equation-mapping.html#corpus-equation-6af82e9c60457ddc)

2. For each remaining row and resolution record, compute

   $$
   \ln\Gamma_{N,\mathrm H}^{\mathrm{row},(\ell)}
   =
   \mathbf{b}_{N}^{\mathrm{spec}}\cdot
   \mathbf{g}_{N,\mathrm H}^{(\ell)}
   $$

   [View →](../../../../../equation-mapping.html#corpus-equation-d787a1e9d212e65b)

3. Compare the row prediction to every line-inferred cadence stretch:

   $$
   \mathcal E_{\Gamma}^{(\ell)}(a,b;\mathbf{b}_{N}^{\mathrm{spec}})
   =
   \ln\widehat\Gamma_{N,\mathrm H}^{(\ell)}(a,b)
   -
   \ln\Gamma_{N,\mathrm H}^{\mathrm{row},(\ell)}
   $$

   [View →](../../../../../equation-mapping.html#corpus-equation-120384e63fc2a57f)

4. Across refinement records, require the accepted row to keep the same predicted clock-rate conversion for records representing the same physical state and calibration, with any independently evaluated convergence correction handled before input. The toy performs no budget subtraction:

   $$
   \mathcal E_{\mathrm{ref}}(\ell,\ell';\mathbf{b}_{N}^{\mathrm{spec}})
   =
   \ln\Gamma_{N,\mathrm H}^{\mathrm{row},(\ell)}
   -
   \ln\Gamma_{N,\mathrm H}^{\mathrm{row},(\ell')}
   $$

   [View →](../../../../../equation-mapping.html#corpus-equation-d32fe2a68c0de51e)

The scan output is the accepted coefficient row set

$$
\mathcal B_{\mathrm H}^{\mathrm{spec}}
=
\left\{
\mathbf{b}_{N}^{\mathrm{spec}}
\;\middle|\;
\text{endpoint, line-set, and refinement residuals pass}
\right\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-dd504cebf2ec8388)

For this finite scan the returned set is a finite subset of the supplied candidates, possibly empty. It is not a continuous interval family or an exhaustive solution set. In the underlying linear problem, subtract the fixed shape contribution and form a matrix from the static endpoint row and the four free feature entries of each independent spectral record. Exact consistency requires the target vector to lie in its range; unique coefficients require column rank four. Positive tolerances instead define an admissible region, potentially unbounded along an unconstrained direction.

For the displayed endpoint and two records the matrix has rank three. The direction $(16,-9,-45,190)$ has zero dot product with all three rows; adding any multiple of it to the four free coefficients preserves every displayed exact constraint. The unique accepted candidate in the mock list therefore does not identify a unique coefficient row. Repeating lines with the same deformation record and constructed stretch adds no rank.

##### Pass Condition

The toy scan passes when $\mathcal B_{\mathrm H}^{\mathrm{spec}}$ is nonempty and every accepted row satisfies

$$
\max_{\ell,(a,b)\in\mathcal L_{\mathrm H}^{0}}
\frac{
\left|
\mathcal E_{\Gamma}^{(\ell)}(a,b;\mathbf{b}_{N}^{\mathrm{spec}})
\right|
}{
\left|
\ln\widehat\Gamma_{N,\mathrm H}^{(\ell)}(a,b)
\right|
+
\varepsilon_{\Gamma}
}
\le
\Delta_{\Gamma}^{\mathrm{tol}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-aa2463e037cd5e69)

with the refinement check over all record pairs

$$
\max_{\ell,\ell'}
\frac{
\left|
\mathcal E_{\mathrm{ref}}(\ell,\ell';\mathbf{b}_{N}^{\mathrm{spec}})
\right|
}{
\left|
\ln\Gamma_{N,\mathrm H}^{\mathrm{row},(\ell)}
\right|
+
\varepsilon_{\mathrm{row}}
}
\le
\Delta_{\mathrm{row}}^{\mathrm{tol}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-25846057e51b8c2e)

The displayed all-pairs maximum tests both denominator choices for each distinct pair. The script instead uses only pairs with the first input index smaller than the second and divides by the left-record value; its statistic can depend on input order and is weaker than this displayed requirement. One record supplies no refinement evidence and yields a zero maximum in the executable. Positive denominator floors and nonnegative tolerances must be fixed before the scan. Independent held-out lines and genuinely refined records, with gaps and clock data not manufactured from the fitted row, are needed to assess predictive performance.

The stronger extraction claim concerns the continuous admissible coefficient region in a fixed domain with fixed tolerances and uncertainty bounds. Its diameter must contract through additional independent constraints with full column rank and controlled conditioning, not by narrowing an arbitrary candidate grid. Independent hydrogen records or a constitutive response calculation for $(a_n,a_\chi,a_\lambda,a_R)$ must provide that information. The first packet does not require that stronger claim; it only requires that a shared constrained row survive the line set.

This is not yet the full promotion gate. That gate requires $\mathbf{g}_{N,\mathrm H}^{(\ell)}$, $E_{\text{env}}^{(\ell)}(a)-E_{\text{env}}^{(\ell)}(b)$, $\nu_{a\to b}^{\mathrm{obs},(\ell)}$, and $(a_n,a_\chi,a_\lambda,a_R)$ to be extracted from one declared hydrogen spectral channel record and the same Noether sea cell, with recoil, hyperfine structure, photon-channel propagation, and source-branch effects carried outside $\Gamma_N$ unless they are in the declared residual budget.

##### Hydrogen $\Gamma_N$ Certificate Boundary

A proposed hydrogen certificate must contain independently supported inputs and all residual checks; deterministic replay alone does not supply it. The proposed certificate object is
$$
\mathcal C_{\mathrm H}^{\Gamma}
=
\left(
\Theta_{\mathrm H,\mathrm{spec}}^{(\ell)},
\mathcal L_{\mathrm H}^{0},
\mathbf{g}_{N,\mathrm H}^{(\ell)},
\Delta E_{\mathrm{env}}^{(\ell)},
\nu_{\mathrm{obs}}^{(\ell)},
\mathbf a^{G},
\mathbf b_{N}^{\mathrm{spec}},
\boldsymbol{\tau}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8b633f489c34b06c)

where $\mathbf a^{G}=(a_n,a_\chi,a_\lambda,a_R)$ is the static Noether sea response row for the same cell and $\boldsymbol{\tau}$ collects the declared tolerances.

The certificate residual vector is
$$
\mathcal R_{\mathrm H}^{\Gamma}
=
\left(
b_\xi^{\mathrm{spec}}-1,\,
\mathbf b_{N,\mathrm{stat}}^{\mathrm{spec}}\cdot\mathbf a^{G}-1,\,
\mathcal R_{\mathrm{line}},\,
\mathcal R_{\mathrm{ref}},\,
\mathcal R_{\mathrm{H,res}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-eb0cef5d6dcf9a1c)

with
$$
\mathcal R_{\mathrm{line}}
=
\max_{\ell,(a,b)}
\frac{
\left|
\ln\widehat\Gamma_{N,\mathrm H}^{(\ell)}(a,b)
-
\mathbf b_{N}^{\mathrm{spec}}\cdot\mathbf g_{N,\mathrm H}^{(\ell)}
\right|
}{
\left|\ln\widehat\Gamma_{N,\mathrm H}^{(\ell)}(a,b)\right|+\varepsilon_\Gamma
}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f393c7f4c4feebe7)

and
$$
\mathcal R_{\mathrm{ref}}
=
\max_{\ell,\ell'}
\frac{
\left|
\mathbf b_{N}^{\mathrm{spec}}\cdot
\left(
\mathbf g_{N,\mathrm H}^{(\ell)}
-
\mathbf g_{N,\mathrm H}^{(\ell')}
\right)
\right|
}{
\left|\mathbf b_{N}^{\mathrm{spec}}\cdot\mathbf g_{N,\mathrm H}^{(\ell)}\right|+\varepsilon_{\mathrm{row}}
}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-44e1ef7dd7312079)

Here $\mathbf b_{N,\mathrm{stat}}^{\mathrm{spec}}=(b_n^{\mathrm{spec}},b_\chi^{\mathrm{spec}},b_\lambda^{\mathrm{spec}},b_R^{\mathrm{spec}})$ is the four-entry static endpoint subrow. The proposed certificate passes only if every component of $\mathcal R_{\mathrm H}^{\Gamma}$ is within its declared tolerance and all packet inputs share the same provenance ledger $\Theta_{\mathrm H,\mathrm{spec}}^{(\ell)}$ and the same static Noether sea cell. Otherwise it fails with the first violated row: provenance, $b_\xi$, endpoint, line-set, refinement, or residual separation.

##### Failure Tests

A completed validation packet must include intentional failing rows or records for the following cases. The current mock directly covers cadence direction, per-line fitting, endpoint failure and response mismatch. Its split-record control rejects a particular delay-only row, not every possible scalar compression. Residual-overuse and spectral-correction-collapse checks are proposed requirements and are not implemented by this script:

| Failure test | Required failure |
| --- | --- |
| direct cadence multiplication | using $\Gamma_N$ instead of $C_N=\Gamma_N^{-1}$ in the observer-frequency comparison fails the line-set residual |
| per-line row fit | allowing $\mathbf{b}_{N}^{\mathrm{spec}}(a,b)$ makes isolated lines pass but fails the shared-row condition |
| collapsed density/delay variable | replacing $(n,\chi_{\text{sea}})$ by one scalar fails when the packet contains density-delay split records |
| endpoint-row violation | a row that fits the line set but violates $b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R=1$ is rejected |
| residual overuse | hiding recoil, hyperfine structure, photon-channel propagation, or unresolved source-branch effects inside $\mathcal R_{\Gamma,\mathrm H}^{\mathrm{spec},(\ell)}$ beyond the declared budget fails |
| response-record mismatch | changing $\mathbf{g}_{N,\mathrm H}^{(\ell)}$ between lines after $\mathcal L_{\mathrm H}^{0}$ is chosen fails |
| spectral-correction collapse | absorbing fine-structure, hyperfine, Lamb-type, reduced-mass, or nuclear-size corrections into $\mathbf{b}_{N}^{\mathrm{spec}}$ fails once the correction channels are declared |

These failure tests keep the spectral row tied to the shared clock/rate map. They also separate the proof obligations: the envelope calculation owns the line gaps, the clock-row calculation owns $\Gamma_N$ and $C_N$, and the photon-channel event record owns emission and absorption propagation.

##### Output Diagnostics

The executable evaluates declared candidate rows or a finite Cartesian grid. Missing free row coefficients and feature components default to zero, while missing $b_\xi$ defaults to one. It requires nonempty records and line arrays, but it does not authenticate provenance, enforce distinct physical transitions or refinement levels, check positive normalization floors/nonnegative tolerances, or evaluate correction and event-residual budgets. `require_refinement_consistency:false` waives the refinement requirement. The executable packet reports:

| Output field | Meaning |
| --- | --- |
| `diagnostics.accepted_rows` | candidate rows that satisfy $b_\xi=1$, the endpoint constraint, the line-set residual, and the refinement residual |
| `diagnostics.response_record_mismatch_pass` | whether every line used the shared $\mathbf{g}_{N,\mathrm H}^{(\ell)}$ record for its resolution |
| `diagnostics.per_line_spoof` | whether each line has some passing candidate; this flag can also be true when a shared row passes |
| `diagnostics.row_results[].diagnostics.endpoint_residual` | residual for $b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R=1$ |
| `diagnostics.row_results[].diagnostics.line_residuals` | line-by-line values of $\mathcal E_{\Gamma}^{(\ell)}(a,b;\mathbf{b}_{N}^{\mathrm{spec}})$ |
| `diagnostics.row_results[].diagnostics.line_residuals[].line_factor_Lambda_ab` | derived or declared hydrogen line factor $\Lambda_{ab}$ |
| `diagnostics.row_results[].diagnostics.line_residuals[].envelope_gap_over_h` | declared or derived envelope gap divided by $h$ |
| `diagnostics.row_results[].diagnostics.line_residuals[].observed_frequency` | declared or derived observer frequency used in the cadence-stretch readout |
| `diagnostics.row_results[].diagnostics.refinement_residuals` | resolution-pair residuals for the shared row prediction |

The mismatch check compares only explicit per-line feature overrides with the record-level numbers; it does not verify their physical provenance. Candidate acceptance and scenario acceptance are separate, since a response mismatch can reject a scenario after candidate checks. Expected-failure status alone does not authenticate a particular failure cause unless the corresponding diagnostics are inspected. The process exits with code one when packet expectations fail and code zero when they all pass, even if expected-failure scenarios have `status: "fail"`. The packet succeeds only when its declared expectations are met. A failure witness should therefore have `status: "fail"` but `expectation_status: "pass"` when it fails for the intended reason.

#### Thermodynamic Residual

This protocol turns the local-horizon target in [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md#local-horizon-recovery-target) into a validation scaffold. It does not assume that gravity is thermodynamic at the substrate level. It tests whether one [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md) state—the ambient assembly medium—and observer-channel record can supply the three observer-level quantities used in the Jacobson comparison: boundary entropy, local temperature, and boost-energy flux.

The protocol is a proof-and-simulation target, not an empirical claim. A successful packet would show that the same record that recovers weak-field ADM/Cartan and PPN behavior also makes the local Clausius residual small in the equilibrium comparison regime.

##### Minimal Record

A Physical Observer is an assembly-based observer with a declared clock and accessible record. Here the Arnowitt–Deser–Misner (ADM) decomposition and Cartan coframe describe an effective clock/ruler metric, while the parameterized post-Newtonian (PPN) comparison tests its weak-gravity behavior. For each Physical Observer $O$, two-dimensional effective-horizon cut $\partial\Omega$, and finite observer-chart analysis window $W=[t_a,t_b]$, the packet must declare one shared record $\theta$ with the following content.

| Channel | Required content | Failure prevented |
| --- | --- | --- |
| Noether sea state | $n(\mathbf X,T)$, $\rho_{\text{NS}}(\mathbf X,T)$, $\chi_{\text{sea}}(\mathbf X,T)$, $u^i_{\mathrm{sea,eff}}$, $e^a{}_i$, $\gamma_{ij}^{\mathrm{eff}}$, and $N$ on the relevant region | fitting entropy, flux, and metric response with separate Noether sea states |
| Physical Observer | worldline, clock-rate record, access region, reference resources, and observer acceleration $a_O$ derived from the metric channel | importing an external observer or a free Rindler frame |
| Boundary patch | $\partial\Omega$, effective patch area $A_{\partial\Omega}^{\mathrm{eff}}$, orientation, and signed crossing convention | hiding the area comparison in an undefined horizon surface |
| Boundary wake labels | alternative compatible history configurations $\mathcal{B}_{\partial\Omega}^{(O)}(\theta;W)$ under a fixed readout and counting measure; separately, realized crossing events $\mathcal J$ with transmitter, emission, reception, channel and persistence records | counting unrecorded or inaccessible microstates |
| Flux projection | either $T_{\mu\nu}^{\mathrm{eff}}(\theta)$ on the patch or a declared discrete estimator from the same causal-wake and provenance logs | fitting $dQ$ independently of the record |
| Gates | predeclared $\epsilon_{\mathrm{thermo}}$, $\epsilon_A$, $\epsilon_E$, convergence tolerances, and negative controls | selecting tolerances after seeing the output |

##### Boundary Count and Area Slope

The observer-accessible boundary label set is
$$
\mathcal{B}_{\partial\Omega}^{(O)}(\theta;W)
=
\left\{
b:
b\ \text{labels an alternative retained boundary history}
\ \text{compatible with the fixed readout of}\ O\ \text{during}\ W
\right\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-636ca4071c2285ff)

The labels distinguish alternative configurations under a fixed finite-precision readout, not individual wake hits within one realized history. A counting reference and the admissible alternatives must be declared separately from the event log. The first entropy estimator is the microcanonical count
$$
\widehat{S}_{\partial\Omega}^{(O)}(\theta;W)
=
k_B\log
\left|
\mathcal{B}_{\partial\Omega}^{(O)}(\theta;W)
\right|,
\qquad
\left|
\mathcal{B}_{\partial\Omega}^{(O)}(\theta;W)
\right|>0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-5a609f0b967fed91)

This count equals the conditional statistical entropy only for uniform probabilities over the retained alternatives. Nonuniform weights require $-k_B\sum_b p_b\log p_b$ with normalized probabilities. A log-count alone does not establish thermodynamic entropy. This finite count is a packet estimator, not the final horizon-interface coefficient. For coefficient recovery, a row should be interpreted as a finite-block sample of the block-density target
$$
\widehat{s}_{U}^{(O)}(\theta;W)
=
\frac{1}{|U|}
\log
\left|
\mathcal{B}_{U}^{(O)}(\theta;W)
\right|
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6d0011c0615ed3d5)

where $U$ is the declared connected patch block and $\mathcal{B}_{U}^{(O)}$ retains only labels accessible to the same observer record. When $|U|$ is physical patch area, $\widehat{s}_{U}^{(O)}$ has inverse-area units and the large-block target is
$$
\widehat{s}_{U}^{(O)}
\longrightarrow
\frac{1}{4A_{\text{align}}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f2a9596dff16070c)

after controlled boundary corrections. The family must keep intensive state, binning and observer calibration fixed, with correlation length much smaller than block size and block size much smaller than curvature and medium-variation scales. A single finite record does not provide that limit. The dimensionless value $1/4$ applies only when the packet has explicitly normalized $A_{\text{align}}=1$; it is not a literal one-patch cardinality.

Area scaling is a recovery target, not a definition. Compare neighboring patches or refinements with the same observer and record:
$$
\mathcal{R}_{A}^{(O)}
=
\frac{
\left|
\dfrac{\Delta \widehat{S}_{\partial\Omega}^{(O)}}{\Delta A_{\partial\Omega}^{\mathrm{eff}}}
-
\dfrac{k_B}{4A_{\text{align}}}
\right|
}{
\dfrac{k_B}{4A_{\text{align}}}
+\varepsilon
}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-dc362e5d890cc318)

Here $A_{\mathrm{align}}>0$, the area difference is nonzero, and the denominator floor has entropy-per-area units. Passing this subgate means the retained logarithmic label count has the target area slope in the relevant equilibrium regime. It does not yet prove Page-curve recovery or black-hole endpoint closure.

##### Temperature and Flux

In the temperature comparison below, $\hbar$ and $k_B$ are observer-level SI action and energy-temperature benchmarks. They test the recovered unit and thermodynamic maps; neither is a substrate input.

The local temperature comparison must be derived from the observer-channel acceleration:
$$
\widehat{T}_{U}^{(O)}
=
\frac{\hbar a_O}{2\pi k_B c_0},
\qquad
a_O^2
=
g_{\mu\nu}^{\mathrm{eff}}a_O^\mu a_O^\nu
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8c4e5cebf5971cba)

Here $a_O^\mu=u_O^\nu\nabla_\nu u_O^\mu$ is proper four-acceleration in the effective metric of signature $(-,+,+,+)$, with $u_O^\mu=dx_O^\mu/d\tau_O$ and derived proper time $\tau_O$. Its norm reduces to a spatial norm only in the instantaneous rest frame. The comparison requires positive temperature and an approximately stationary local boost regime; arbitrary coordinate acceleration is insufficient.

Let $\mathscr H_{\partial\Omega}(W)$ be the null three-dimensional history of the cut over the window. The continuum flux estimator is
$$
\widehat{dQ}_{\partial\Omega}^{(O)}(\theta;W)
=
\int_{\mathscr H_{\partial\Omega}(W)}
T_{\mu\nu}^{\mathrm{eff}}(\theta)\xi^\mu d\Sigma^\nu
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0b06633a3e01e30c)

The directed element $d\Sigma^\nu$ already includes integration along the horizon generators and over cross-sectional area; no additional time integral is applied. The approximate boost generator $\xi^\mu$ and its temperature must use one normalization: rescaling the generator rescales both boost flux and temperature. Include the chart conversion factors so the flux has energy units, and choose outward boost flow as positive with a compatible entropy orientation.

When the run has not constructed a continuum $T_{\mu\nu}^{\mathrm{eff}}$, the packet may use a discrete estimator, but only if every term comes from the same boundary-wake and observer record:
$$
\widehat{dQ}_{\partial\Omega,\mathrm{disc}}^{(O)}(\theta;W)
=
\sum_{b\in\mathcal{J}_{\partial\Omega}^{(O)}(\theta;W)}
\sigma_b E_b^{(O)}\omega_b^{(O)}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4010deace7face00)

Here $\mathcal J$ is the realized crossing-event set, distinct from the alternative-history set $\mathcal B$ used for entropy. The discrete flux must converge to the same boost-current integral. Each weight includes the declared boost projection and sampling convention and is dimensionless when $E_b^{(O)}$ has energy units; no crossing may be counted twice. Here $\sigma_b$ is the signed crossing convention, $E_b^{(O)}$ is the observer-level energy assigned by the same channel that builds $T_{\mu\nu}^{\mathrm{eff}}$, and $\omega_b^{(O)}$ is the declared quadrature or coarse-graining weight.

For nearby local-equilibrium states with approximately constant temperature over the variation, interpret $d\widehat S$ as the entropy change between the corresponding cuts. Finite counts require a controlled finite-difference or thermodynamic limit. The local-horizon residual estimator is then
$$
\widehat{\mathcal{R}}_{\mathrm{thermo}}^{(O)}
=
\frac{
\left|
\widehat{dQ}_{\partial\Omega}^{(O)}
-
\widehat{T}_{U}^{(O)}
d\widehat{S}_{\partial\Omega}^{(O)}
\right|
}{
\left|\widehat{dQ}_{\partial\Omega}^{(O)}\right|
+
\widehat{T}_{U}^{(O)}
\left|d\widehat{S}_{\partial\Omega}^{(O)}\right|
+
\varepsilon
}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ac1e36657438f6c2)

##### Conservation and Same-Record Gate

The thermodynamic comparison is not allowed to pass by sacrificing local observer-level conservation. The packet must also report
$$
\mathcal{R}_{E,\partial\Omega}^{(O)}
=
\frac{
\left|
\Delta E_{\Omega}^{(O)}(\theta;W)
+
\widehat{dQ}_{\partial\Omega}^{(O)}(\theta;W)
\right|
}{
\left|\Delta E_{\Omega}^{(O)}(\theta;W)\right|
+
\left|\widehat{dQ}_{\partial\Omega}^{(O)}(\theta;W)\right|
+
\varepsilon
}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2df316b1a7c19a7a)

The two-term balance uses the energy associated with that same boost current. For symmetric conserved effective stress, the product rule gives $\nabla_\nu(T^{\mu\nu}\xi_\mu)=T^{\mu\nu}\nabla_{(\nu}\xi_{\mu)}$. A non-Killing generator therefore contributes a volume source; other boundary transfers and external work also enter the balance. The displayed residual applies only when all these omitted terms are bounded within the energy tolerance, not for an arbitrary laboratory-energy change.

A local-horizon packet passes only when
$$
\widehat{\mathcal{R}}_{\mathrm{thermo}}^{(O)}
\le
\epsilon_{\mathrm{thermo}},
\qquad
\mathcal{R}_{A}^{(O)}
\le
\epsilon_A,
\qquad
\mathcal{R}_{E,\partial\Omega}^{(O)}
\le
\epsilon_E
$$

[View →](../../../../../equation-mapping.html#corpus-equation-919e2119526aa9ec)

and the same $\theta$ also satisfies the weak-field metric gates relevant to the run. A packet that fits $\widehat{S}$, $\widehat{T}_U$, and $\widehat{dQ}$ with independent records fails even if each scalar looks plausible by itself.

##### Free-Energy and Response Consistency

The same record should also support the near-equilibrium free-energy direction when such a channel is claimed. Let the packet declare a coarse state $z(\theta;t)$, entropy estimator $\widehat S_z$, energy estimator $\widehat E_z$, and local temperature $\widehat T_z$ built from the same observer and Noether sea record. Define
$$
\widehat F_z
=
\widehat E_z
-
\widehat T_z\widehat S_z
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4f8237eae20a7ef1)

For this inequality set the displayed $\widehat T_z$ equal to the fixed reservoir/reference temperature, not an independently varying instantaneous local temperature. For a closed system coupled to a fixed-temperature reservoir, with fixed external parameters or their work explicitly included, the equilibrium comparison gives $\Delta F\le W_{\mathrm{ext}}$ for work done on the system. In the zero-work specialization $F$ may decrease. A varying temperature contributes $-S\,dT$, so absence of work alone does not imply this inequality. Under the fixed-temperature and heat/work assumptions, the free-energy residual is
$$
\widehat{\mathcal R}_{F}^{(O)}
=
\frac{
\left[
\Delta_W\widehat F_z
-
W_{\mathrm{ext},z}^{(O)}
\right]_+
}{
|\Delta_W\widehat F_z|
+|W_{\mathrm{ext},z}^{(O)}|
+\varepsilon
}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-57d7414d9ab567f8)

The gate is optional unless the packet uses free-energy minimization, order-parameter relaxation, or Landau-Ginzburg language. If invoked, it must pass with the same $\theta$ that supplies $\widehat{\mathcal{R}}_{\mathrm{thermo}}^{(O)}$.

If the packet includes stochastic or fluctuation claims, it must report a response/noise residual rather than fitting noise independently. For a declared observable pair $(A,B)$, use the measured fluctuation spectrum $S_{AB}^{(O)}(\omega)$ and the dissipative response $\chi_{AB}^{\prime\prime(O)}(\omega)$:
$$
\widehat{\mathcal R}_{\mathrm{FD}}^{(O)}(A,B)
=
\frac{
\left\|
S_{AB}^{(O)}(\omega)
-
\mathcal F_{\widehat T_z}
\!\left(
\chi_{AB}^{\prime\prime(O)}(\omega)
\right)
\right\|_{\omega}
}{
\left\|S_{AB}^{(O)}\right\|_{\omega}
+
\left\|
\mathcal F_{\widehat T_z}
\!\left(
\chi_{AB}^{\prime\prime(O)}
\right)
\right\|_{\omega}
+\varepsilon
}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-6a2d20c88edfa0f8)

All occurrences of $\varepsilon$ denote separately declared positive floors with the units of their denominator: entropy per area for the area slope, energy for thermodynamic/conservation/free-energy norms, and the selected spectrum norm for fluctuation-dissipation. They are not one universal dimensional constant. The response check must declare spectral conventions, observable units, frequency range and norm before comparison. Here $\mathcal F_{\widehat T_z}$ is the packet's declared classical or quantum fluctuation-dissipation map. The equilibrium map requires an independently justified thermal state and admissible response regime, including the declared stationarity, linear-response and spectral conventions. Temperature inferred from distinct observable pairs must agree with the independently calibrated temperature within uncertainty; choosing a separate map or fitted temperature per pair does not establish thermal admissibility. This check is a same-record discipline for equilibrium response. It does not assert that Noether sea dynamics is fundamentally stochastic.

##### Proof Route

The proof route has four controlled steps.

1. Show that $\mathcal{B}_{\partial\Omega}^{(O)}(\theta;W)$ is stable under temporal, spatial, and history-resolution refinement for the fixed observer and patch.
2. Show that $\Delta\widehat{S}/\Delta A_{\partial\Omega}^{\mathrm{eff}}$ converges to $k_B/(4A_{\text{align}})$ in the equilibrium local-horizon regime.
3. Show that the flux estimator from the same $\theta$ has an energy mismatch bounded by $\epsilon_{\mathrm{thermo}}$ times the declared energy denominator while $\mathcal{R}_{E,\partial\Omega}^{(O)}$ remains small.
4. Use the existing ADM/Cartan handoff to show that the same record recovers the weak-field observer metric. These finite tests still do not derive the effective Einstein equation. The [Jacobson derivation](https://arxiv.org/html/gr-qc/9504004v2) additionally imposes local equilibrium with vanishing expansion and shear, a universal area coefficient, null focusing and Clausius balance in every null direction, then uses stress conservation and the contracted Bianchi identity. Recovering these hypotheses from the Noether sea remains a separate proof.

##### Failure Codes

| Failure code | Meaning |
| --- | --- |
| `thermo-label-coverage-open` | the packet does not record enough boundary-wake labels to define $\mathcal{B}_{\partial\Omega}^{(O)}$ |
| `thermo-area-scaling-open` | $\widehat{S}$ scales with volume, history length, or patch choice rather than $A_{\partial\Omega}^{\mathrm{eff}}$ |
| `thermo-temperature-split-open` | $\widehat{T}_U$ requires an acceleration or clock channel not present in the metric record |
| `thermo-flux-split-open` | $\widehat{dQ}$ is fitted from a stress or energy record not used by the observer metric |
| `thermo-residual-open` | $\widehat{\mathcal{R}}_{\mathrm{thermo}}^{(O)}$ exceeds the declared tolerance |
| `thermo-conservation-open` | $\mathcal{R}_{E,\partial\Omega}^{(O)}$ exceeds tolerance |
| `thermo-ppn-split-open` | the local-horizon residual passes only for a record that fails the weak-field ADM/Cartan or PPN gates |
| `thermo-negative-control-open` | a declared negative control still passes the local-horizon packet |

##### Negative Controls

A promoted packet must include at least three null runs:

1. perturb the alternative-history counting or crossing record in a predeclared way that analytically changes the tested residual beyond tolerance; arbitrary label permutations or negligible deletions need not fail;
2. replace $a_O$ with a constant temperature parameter, which should fail the same-record temperature test;
3. compute flux with an independently fitted stress record, which should be rejected as a split-record pass.

Only controls independently shown to violate the declared assumptions or thresholds are required to fail. Passing such a violating control falsifies the claimed gate coverage.

##### Runtime Artifact

The first scaffold is:

```text
node scripts/gravity/thermodynamic-residual.mjs --pretty
```

It consumes:

```text
scripts/gravity/thermodynamic-residual-mock.json
```

and emits a JSON result with this shape:

| Output field | Meaning |
| --- | --- |
| `observations` | computed label counts or finite-block samples, entropy change, local temperature, flux, area residual, thermodynamic residual, conservation residual, same-record checks, and weak-field gate checks |
| `negative_controls` | input control names and supplied failure codes; these are not executed null runs |
| `totals.max_area_residual` | largest area-scaling residual across local-horizon rows |
| `totals.max_thermodynamic_residual` | largest $\widehat{\mathcal{R}}_{\mathrm{thermo}}^{(O)}$ across rows |
| `totals.max_conservation_residual` | largest $\mathcal{R}_{E,\partial\Omega}^{(O)}$ across rows |
| `gates` | label coverage, same-record temperature, same-record flux, area scaling, thermodynamic residual, conservation, weak-field same-record, and negative-control gates |
| `failure_code` | null on pass, otherwise the first failed thermodynamic-residual gate |

The mock packet is deliberately dimensionless. It uses $k_B=\hbar=c_0=A_{\text{align}}=1$ so the packet shape can be inspected by hand before any real Noether sea simulation supplies physical units, observer records, and boundary-wake provenance.

The current runtime accepts any positive real count, so noninteger values are log-count proxies rather than literal cardinalities. It checks record-name equality, not provenance authenticity. Entropy-label mismatches are reported in `record_split_failures` but omitted from the final gate aggregation; an empty `weak_field_gates` object passes. Explicit temperature and flux values override acceleration and crossing terms without comparing them. Negative controls are accepted from non-null input failure-code strings; no controls are run, and an empty list passes. The program exits successfully even for a rejected result, so consumers must inspect `failure_code`.

The runtime uses one numerical epsilon for area differences, area slopes and energy norms, valid only after separate nondimensionalization. It evaluates neither the free-energy nor the fluctuation-dissipation residual. In the mock, temperature is one, the two flux terms sum to the declared energy change in magnitude, and the entropy counts were chosen to nearly satisfy the same scalar arithmetic. These are constructed inputs, not measured constitutive outputs. New numerical instantiations use $c_f=1$; the legacy mock’s $c_0=1$ is an observer normalization and does not derive equality of observer and wake speeds.

This runtime should not be expanded into a large fixture family unless it protects a live derivation. Its main value is to keep the theory honest at the handoff point where a candidate Noether sea record claims to supply entropy, temperature, flux, and weak-field metric recovery together. Until such a record exists, additional passing and failing fixtures are lower value than deriving the record itself.

##### Promotion Boundary

Passing the implemented arithmetic supports only the declared finite comparisons. A local equilibrium recovery route additionally requires the independent entropy measure, boost-current and temperature maps, error budgets and all-null-direction proof conditions above. It would not by itself close black-hole information release, strong-field endpoint regularity, Page-curve recovery, or cosmological horizon thermodynamics. Those remain separate validation packets that may consume the same boundary-label and same-record discipline.

### Cosmology Residuals

#### Cosmology Shared Residual Fit Protocol

This protocol turns the shared calibration gate in [Dark Energy](../../../../markdown/aaa/cosmology/dark-energy.md#inference-dependency-and-calibration-gates) into a first machine-checkable validation scaffold. Its purpose is narrow: test whether supernova, BAO, CMB, weak-lensing, redshift-space-distortion, BBN, and pre-BBN comparison packets can consume one shared Noether sea state record without silently replacing the state per observable family.

The Noether sea is the ambient population of Noether braid assemblies. One declared state and its physical evolution must supply every claimed observable, with fixed projection laws and independently calibrated nuisance variables. Supernovae (SN), baryon acoustic oscillations (BAO), cosmic microwave background (CMB), weak lensing (WL), redshift-space distortions (RSD), and big-bang nucleosynthesis (BBN) are observer-level comparison families. Agreement of a few supplied projection coordinates is a necessary compatibility check, not proof that they came from one state.

This is not a cosmological parameter fit and not an empirical claim. The first runtime artifact is a mock packet that fixes the object shape, residual accounting, projection-penalty semantics, gates, and failure codes that a real survey-facing packet must later populate.

##### Residual Object

Let

$$
\mathcal{X}_{\mathrm{cos}}
=
\{\mathrm{SN},\mathrm{BAO},\mathrm{CMB},\mathrm{WL},\mathrm{RSD},\mathrm{BBN},\mathrm{PREBBN}\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d22b0a963d28c309)

For each family $X\in\mathcal{X}_{\mathrm{cos}}$, the packet records a residual vector $r_X$, a covariance object $C_X$, nuisance/calibration context $\nu_X$, and a projection $\Pi_X\theta_{\mathrm{sea}}$ of the shared Noether sea state record into that family. The scaffold computes

$$
\mathcal{R}_X
=
r_X(\theta_{\mathrm{sea}},\nu_X)^T
C_X^{-1}
r_X(\theta_{\mathrm{sea}},\nu_X)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a1cbbaa65e6c0daf)

and the cross-family projection penalty

$$
\mathcal{P}_{XY}
=
\sum_{a\in K_X\cap K_Y}
w_a
\left(
(\Pi_X\theta_{\mathrm{sea}})_a
-
(\Pi_Y\theta_{\mathrm{sea}})_a
\right)^2
$$

[View →](../../../../../equation-mapping.html#corpus-equation-76a8d0efa5baae69)

where $K_X$ contains only shared physical quantities mapped into the same dimensionless coordinates, reference calibration and epoch. The maps must be declared before subtraction; equal key names alone do not establish comparable quantities, and distinct observables need not be numerically equal. Require $w_a\ge0$, with positive weights for every claimed tested coordinate. The following packet-level residual is the block-diagonal covariance specialization used by the runtime:

$$
\mathcal{R}_{\mathrm{shared}}
=
\sum_{X\in\mathcal{X}_{\mathrm{cos}}}
\mathcal{R}_X
\;+\;
\lambda
\sum_{X<Y}
\mathcal{P}_{XY}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-39d5df0b3b399238)

For empirical work, stack the retained residuals and use $\mathbf r^T C_{\mathrm{joint}}^{-1}\mathbf r$ with the full positive-definite covariance on that subspace, as in the Dark Energy owner. The displayed block sum requires vanishing cross-family covariance or a justified approximation; shared catalogues, calibrations and model parameters can invalidate it. The projection penalty can reveal a declared coordinate mismatch but cannot authenticate state provenance or constrain unreported directions. A zero penalty from projections constructed to agree is an internal identity, not independent evidence.

A covariance-weighted quadratic is not automatically chi-square distributed. Exact chi-square calibration requires centered Gaussian residuals with known covariance and the stated linear fit/projection assumptions; nonlinear, estimated-covariance or non-Gaussian models require their own sampling calibration. For example, a residual equal to either $-1$ or $1$ with equal probabilities has covariance one, but its quadratic is always one. Let $N_X$ be the retained covariance rank and $p_X$ the identifiable fitted model rank for a separately justified family-level linear Gaussian analysis. Under those assumptions the packet may report
$$
\nu_X^{\mathrm{dof}}=N_X-p_X
$$

[View →](../../../../../equation-mapping.html#corpus-equation-353e97dc6eff2fe6)

and, when $\nu_X^{\mathrm{dof}}>0$, the reduced statistic
$$
\overline{\mathcal{R}}_X
=
\frac{\mathcal{R}_X}{\nu_X^{\mathrm{dof}}}.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2fbc568db154dbb9)

The raw $\mathcal{R}_X$ remains the additive packet term; $\overline{\mathcal{R}}_X$ is a scale diagnostic and must not replace a likelihood without a declared statistical derivation.

For a joint fit, subtract the identifiable rank of the joint whitened design from the joint retained dimension; allocating a shared parameter separately to each family generally gives incorrect degrees of freedom. Profiled or marginalized nonlinear nuisance models and penalty terms do not automatically preserve the simple chi-square law. The nuisance record $\nu_X$ must state, before fitting, whether each nuisance quantity is fixed, profiled, or marginalized and how that choice changes $p_X$ and the effective covariance. The projection weights $w_a$, the penalty coefficient $\lambda$, and all residual and overlap thresholds are likewise frozen before fitting. They may be changed only in a separately identified sensitivity run, never retuned after seeing the shared-state result.

Residual coordinates must be consistent with their covariance. A raw difference uses its raw covariance; a component divided by its standard deviation uses the resulting correlation matrix; a fully whitened residual uses identity covariance. Applying the original inverse covariance again double-weights uncertainty. In the examples below, every positive denominator and whitening matrix belongs to the declared retained data representation, not an additional weight to apply later. Parameter-dependent covariance also requires the appropriate likelihood normalization. The first empirical packet should keep the leading standard comparison objects visible inside the residual vectors:
$$
r_{\mathrm{SN/BAO}}
\supset
\left(
\frac{d_L^\theta(z)-d_L^{\mathrm{obs}}(z)}{\sigma_{d_L}},
\frac{D_M^\theta(z)/r_d^\theta-(D_M/r_d)^{\mathrm{obs}}}{\sigma_{D_M/r_d}},
\frac{H^\theta(z)r_d^\theta-(Hr_d)^{\mathrm{obs}}}{\sigma_{Hr_d}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ac97f573e12870bf)

$$
r_{\mathrm{CMB}}
\supset
\left(
\frac{\Delta T_{\mathrm{bb}}^\theta}{\epsilon_{\mathrm{bb}}},
\frac{C_{\ell}^{\theta}-C_{\ell}^{\mathrm{obs}}}{\sigma_{C_\ell}},
\frac{C_L^{\phi\phi,\theta}-C_L^{\phi\phi,\mathrm{obs}}}{\sigma_{C_L^{\phi\phi}}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-086b4246d26df244)

$$
r_{\mathrm{growth}}
\supset
\left(
\frac{f\sigma_8^\theta(z,k)-f\sigma_8^{\mathrm{obs}}(z,k)}{\sigma_{f\sigma_8}},
\frac{P^\theta(k,z)-P^{\mathrm{obs}}(k,z)}{\sigma_P}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-106f9c9e30cd0bd7)

Here $d_L$ is luminosity distance, $D_M$ transverse comoving distance, $H$ the comparison expansion rate, and $r_d$ the calibrated acoustic ruler. The CMB spectra and growth coordinates are effective data-product summaries with their published model dependencies. Correlated derived summaries must not be counted twice as independent measurements. Where independently supported by the packet, $r_{\mathrm{BBN}}$ may retain D/H, $Y_p$, lithium, $\eta$, and $\Delta N_{\text{eff}}$ rows. These are data-product coordinates, not ontology claims. They make the shared packet check luminosity distance, BAO rulers, blackbody preservation, CMB lensing, growth, and BBN yield recovery before any Noether sea state interpretation is promoted.

Redshift-facing packets must expose the signed photon-frequency transfer row rather than treating redshift as a primitive expansion coordinate. For a line or photon family $X$, retain
$$
r_{\nu\text{-}\mathrm{path}}
\supset
\left(
\frac{Z_X^\theta-Z_X^{\mathrm{obs}}}{\sigma_Z},\;
\frac{Y_{X,\mathrm{path}}^\theta-Y_{X,\mathrm{cal}}^{\mathrm{obs}}}{\sigma_Y},\;
\frac{\mathcal{R}_{\nu\text{-}\mathrm{ex}}^\theta}{\epsilon_{\nu\text{-}\mathrm{ex}}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-161938fb0ad62752)

where $Z_X$ is the total logarithmic redshift budget, $Y_{X,\mathrm{path}}$ is the signed path-history exchange contribution, and $Y_{X,\mathrm{cal}}^{\mathrm{obs}}$ is any declared calibration row such as a Sunyaev-Zeldovich or kinematic-Sunyaev-Zeldovich frequency-shift packet. A thermal Sunyaev-Zeldovich distortion is generally a frequency-resolved spectral redistribution, not a single signed line-frequency shift; such a row needs the corresponding transfer operator and covariance. This row does not add a separate cosmology gate. It prevents a shared-state fit from hiding path-frequency exchange inside $H(z)$, distance modulus, or CMB temperature calibration.

The source-mined empirical packet should retain the following benchmark families without turning them into separate gates:

| Family | Required packet content | Shared-state overlap |
| --- | --- | --- |
| `CMB_PLANCK_LAMBDA` | Planck/LAMBDA frequency-map and component-separation provenance, TT/TE/EE spectra, likelihood choice, CMB lensing map or bandpower provenance, foreground and beam nuisance context | `theta_star`, `r_d`, `omega_b`, `omega_c`, `tau`, `A_s`, `n_s`, `CMB_lensing`, `blackbody` |
| `CMB_ACT` | ACT DR6 high-$\ell$ spectra or likelihood rows, ACT lensing bandpowers, covariance, foreground model context, SZ/kSZ frequency-exchange provenance when used | `CMB_lensing`, `small_scale_damping`, `foreground_context`, `growth_projection`, `frequency_exchange` |
| `BAO_DESI` | DESI tracer label, effective redshift, isotropic or anisotropic BAO vector, covariance, likelihood or chain provenance | `r_d`, `D_M`, `D_H`, `D_V`, `H_eff`, `theta_acoustic` |
| `SN_SH0ES_PANTHEON` | Pantheon+ light-curve and covariance provenance, redshift convention, calibration/standardization context, Cepheid/SN ladder anchor context, local $H_0$ row when used | `D_L`, `H_eff_ladder`, `clock_endpoint`, `path_history`, `frequency_exchange`, `calibration_context` |
| `WL_RSD_DES` | DES weak-lensing/clustering data vector, shear calibration, photo-$z$ calibration, covariance, DESI RSD rows when present | `S_8`, `f_sigma_8`, `CMB_lensing`, `growth_response`, `noether_sea_coupling` |
| `EUCLID_PUBLIC` | Public release identifier, image/catalogue/mask/photo-$z$ readiness products, covariance readiness note | `mask_context`, `photo_z_context`, `shape_context`, `future_growth_projection` |

`EUCLID_PUBLIC` remains a readiness row whenever the cited public release lacks a cosmology data vector and covariance. Such a packet may test mask, catalogue, image, spectroscopy, and photo-$z$ bookkeeping, but it must not count Euclid as a successful weak-lensing or clustering cosmology residual until its cited release supplies the required data vector and covariance.

For empirical packets, the BAO row should use the explicit anisotropic/isotropic vector

$$
\mathbf r_{\mathrm{BAO},i}
=
\mathbf C_{\mathrm{BAO},i}^{-1/2}
\left[
\begin{pmatrix}
D_M^\theta(z_i)/r_d^\theta\\
D_H^\theta(z_i)/r_d^\theta\\
D_V^\theta(z_i)/r_d^\theta
\end{pmatrix}_{\!\mathrm{kept}}
-
\begin{pmatrix}
(D_M/r_d)_i^{\mathrm{obs}}\\
(D_H/r_d)_i^{\mathrm{obs}}\\
(D_V/r_d)_i^{\mathrm{obs}}
\end{pmatrix}_{\!\mathrm{kept}}
\right]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3a5d3bee6d4cecb5)

where `kept` means the subset reported by the survey bin. This avoids pretending that isotropic BAO bins contain independent radial and transverse information.

The acoustic-ruler coherence check is evaluated inside this BAO family rather than as a separate cosmology gate. Partition the catalogue into predeclared sky patches $p$, tracer classes, and redshift bins $b$; fit every subset with the same distance calibration, nuisance model, window-function treatment, and reconstruction procedure. Let

$$
\ell_{pb}
\equiv
\ln\frac{r_{d,pb}^{\mathrm{fit}}}{r_{d,0}},
\qquad
\bar{\ell}_d
=
\frac{
\mathbf 1^T\mathbf C_{\ell}^{-1}\boldsymbol{\ell}
}{
\mathbf 1^T\mathbf C_{\ell}^{-1}\mathbf 1
},
$$

[View →](../../../../../equation-mapping.html#corpus-equation-bef1a332fe8468b8)

with a fixed positive reference length $r_{d,0}$ and positive fitted rulers. This log normalization leaves dispersion invariant under a common reference change. Require a symmetric positive-definite covariance on the retained patch space; the weighted mean estimates a common log ruler under that model. Here $\mathbf C_\ell$ includes cross-patch covariance and survey-window coupling. The dispersion row is

$$
\mathcal R_{\mathrm{BAO,disp}}
=
\left(
\boldsymbol{\ell}-\bar{\ell}_d\mathbf 1
\right)^T
\mathbf C_\ell^{-1}
\left(
\boldsymbol{\ell}-\bar{\ell}_d\mathbf 1
\right).
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ec413a9b4c42a07e)

Homogeneous comparison mocks determine the noise-only distribution after masks, selection, reconstruction, and shared-distance calibration are applied. A recovered branch passes when its predicted patch and bin dispersion is consistent with that distribution. Because BAO measures distance-to-ruler ratios, $r_{d,pb}^{\mathrm{fit}}$ is not treated as a model-free direct observation; the same declared distance map must be used in every subset.

The SN/local-ladder row should analogously keep the distance-modulus and local-slope rows separate:

$$
\mathbf r_{\mathrm{SN/H_0}}
=
\left(
\mathbf C_\mu^{-1/2}
\left[
\boldsymbol\mu^\theta-\boldsymbol\mu^{\mathrm{obs}}
\right],
\frac{H_{\mathrm{eff,ladder}}^\theta-H_{0,\mathrm{ladder}}^{\mathrm{obs}}}{\sigma_{H_0}},
\frac{\Delta_{\mathrm{cal}}^\theta}{\sigma_{\mathrm{cal}}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7ef9bfdd4f931dc1)

The CMB row should preserve spectra and lensing as separate but overlapping checks:

$$
\mathbf r_{\mathrm{CMB}}
=
\left(
\mathbf C_{\ell}^{-1/2}
\left[
\mathbf C_{\ell,\mathrm{TTTEEE}}^\theta
-
\mathbf C_{\ell,\mathrm{TTTEEE}}^{\mathrm{obs}}
\right],
\mathbf C_{\phi\phi}^{-1/2}
\left[
\mathbf C_{L}^{\phi\phi,\theta}
-
\mathbf C_{L}^{\phi\phi,\mathrm{obs}}
\right],
\frac{\theta_*^\theta-\theta_*^{\mathrm{obs}}}{\sigma_{\theta_*}},
\frac{\Delta T_{\mathrm{bb}}^\theta}{\epsilon_{\mathrm{bb}}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-dfc36d70b2a4fd7e)

The separately whitened blocks displayed above still retain cross-block correlations unless joint whitening or conditional likelihoods remove them; derived acoustic-scale and ladder summaries require covariance with their parent data. The overlap key `CMB_lensing` must appear in both CMB and growth-facing projections whenever lensing is used. Otherwise a packet can accidentally fit CMB spectra with one projection and weak-lensing or clustering with another, which is exactly the split-ontology failure this protocol is meant to catch.

Dark-sector comparison packets should also retain the linear/nonlinear split exposed by scalar-fluid and MOND-like hybrid models:

$$
r_{\mathrm{DM,split}}
\supset
\left(
\frac{w_{\mathrm{lin}}^\theta-w_{\mathrm{lin}}^{\mathrm{CDM}}}{\sigma_w},
\frac{(c_{s,\mathrm{lin}}^2)^\theta-(c_s^2)^{\mathrm{CDM}}}{\sigma_{c_s^2}},
\frac{v_c^\theta(r,E_{\mathrm{gal}})-v_c^{\mathrm{obs}}(r,E_{\mathrm{gal}})}{\sigma_{v_c}},
\frac{\Delta_{\mathrm{BTFR}}^\theta(M_b,v_f,E_{\mathrm{gal}})}{\sigma_{\mathrm{BTFR}}},
\frac{\mathrm{RAR}^{\theta}(g_{\mathrm{bar}},E_{\mathrm{gal}})-\mathrm{RAR}^{\mathrm{obs}}(g_{\mathrm{bar}})}{\sigma_{\mathrm{RAR}}},
\frac{a_\star^{\theta}(E)-a_\star^{\mathrm{obs}}(E)}{\sigma_{a_\star}},
\frac{f_\star^{\theta}(E)-f_\star^{\mathrm{obs}}(E)}{\sigma_f}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-14d79998fa0ff35c)

The dark-sector rows below are optional comparison templates, not a requirement to manufacture observational estimates for unmeasured quantities. Every superscript `obs` needs a specified estimator, calibration, uncertainty and covariance; otherwise retain that quantity as a model diagnostic outside the data likelihood. Here $w_{\mathrm{lin}}$ and $c_{s,\mathrm{lin}}^2$ are comparison coordinates for CDM-like linear loading, while $v_c(r)$, $\Delta_{\mathrm{BTFR}}$, $\mathrm{RAR}$, $a_\star(E)$, and $f_\star(E)$ are nonlinear acceleration-response coordinates. A dimensionless BTFR residual can be recorded as

$$
\Delta_{\mathrm{BTFR}}^\theta
\equiv
\frac{G_N M_b^{\mathrm{obs}} a_\star^\theta(E_{\mathrm{gal}})}{(v_f^\theta)^4}
-1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f0921c41253a26f0)

with $v_f$ the retained flat-curve velocity and $M_b$ the retained baryonic mass. The environment label $E$ is not a new ontology coordinate; it is the observable context carried in $\nu_X$. For these rows it should include at least $M_{\mathrm{halo}}$, $z_{\mathrm{vir}}$, $\sigma_v$, $T_{\mathrm{eff}}$, the baryon profile, and, for mergers, the declared ratio $v_{\mathrm{inf}}/c_s$ when the comparison template supplies a sound-speed coordinate. The low-acceleration galaxy comparison may be expressed as

$$
g_{\mathrm{obs}}^\theta(r,E_{\mathrm{gal}})
=
g_{\mathrm{bar}}(r)
+
g_{\mathrm{med}}^\theta(r,E_{\mathrm{gal}})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7f2356452b86ade2)

where $g_{\mathrm{med}}^\theta$ is only the Noether sea response projection being tested against a MOND-like comparison residual. To make the galaxy-vs-cluster split measurable, the same packet should evaluate $a_\star(E)$ and $f_\star(E)$ at both $E_{\mathrm{gal}}$ and $E_{\mathrm{cl}}$. Passing the galaxy rotation-curve, BTFR, and RAR rows while failing the cluster rows below is not promotable as a shared-state success. These rows are not a request to add a new fundamental scalar-fluid ontology. Their purpose is to prevent a packet from fitting CMB and matter power data with one effective dark component while fitting galaxy, cluster, and merger accelerations with a separately tuned Noether sea law.

For cluster-facing rows, include the hydrostatic/lensing equality packet

$$
r_{\mathrm{cl}}
\supset
\left(
\frac{T_{\mathrm{ICM}}^\theta(r)-T_{\mathrm{ICM}}^{\mathrm{obs}}(r)}{\sigma_T},
\frac{P_{\mathrm{SZ}}^\theta(r)-P_{\mathrm{SZ}}^{\mathrm{obs}}(r)}{\sigma_P},
\frac{\Phi_{\mathrm{lens}}^\theta(r)-\Phi_{\mathrm{lens}}^{\mathrm{obs}}(r)}{\sigma_{\Phi_{\mathrm{lens}}}},
\frac{\Phi_{\mathrm{dyn}}^\theta(r)-\Phi_{\mathrm{dyn}}^{\mathrm{obs}}(r)}{\sigma_{\Phi_{\mathrm{dyn}}}},
\frac{\gamma_{\mathrm{PPN}}^\theta(r)-1}{\sigma_\gamma},
\frac{d_{\mathrm{lens-gal}}^\theta-d_{\mathrm{lens-gal}}^{\mathrm{obs}}}{\sigma_{d,\mathrm{lg}}},
\frac{d_{\mathrm{lens-gas}}^\theta-d_{\mathrm{lens-gas}}^{\mathrm{obs}}}{\sigma_{d,\mathrm{lgas}}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ea14d73a0e7bd124)

The $\gamma_{\mathrm{PPN}}=1$ term is a conditional GR-matching comparison, not a measured universal cluster law. Extending a solar-system PPN coefficient to a galaxy or cluster requires a justified weak-field metric and scale/regime map. Lensing and dynamical potentials also depend on source geometry, gas equilibrium, nonthermal pressure and calibration; those uncertainties cannot be replaced by an equality assumption. This row is a comparison under the existing shared-state gate, not a new standalone gate. It records whether the same Noether sea state packet can recover cluster gas temperature, SZ pressure, lensing potential, dynamical potential, and Bullet-like lensing/galaxy/gas peak separation without changing the acceleration law between observables.

Merger-facing rows may be attached to the same cluster or dark-sector observable family when the packet claims regime-dependent behavior:

$$
r_{\mathrm{merge}}
\supset
\left(
\frac{t_{\mathrm{merge}}^\theta(v_{\mathrm{inf}}/c_s)-t_{\mathrm{merge}}^{\mathrm{obs}}}{\sigma_t},
\frac{\Delta_{\mathrm{fric}}^\theta(v_{\mathrm{inf}}/c_s)-\Delta_{\mathrm{fric}}^{\mathrm{obs}}}{\sigma_{\mathrm{fric}}},
\frac{\mathcal{I}_{\mathrm{int}}^\theta(v_{\mathrm{inf}}/c_s)-\mathcal{I}_{\mathrm{int}}^{\mathrm{obs}}}{\sigma_{\mathcal{I}}},
\frac{N_{\mathrm{vort}}^\theta(R)-N_{\mathrm{vort}}^{\mathrm{obs}}(R)}{\sigma_N}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-df474580a5d4640c)

The ratio $v_{\mathrm{inf}}/c_s$, with positive $c_s$, labels the declared comparison regime; it alone does not determine dissipation or merger outcome. The coordinate $\mathcal{I}_{\mathrm{int}}$ is a declared shell or interference-morphology statistic for high-relative-speed mergers, and $N_{\mathrm{vort}}(R)$ is included only when the comparison template predicts vortex-like substructure measurable through lensing over projected radius $R$. Cold-atom or other laboratory analogue simulations can supply provenance for these dimensionless template variables, but visual analogy is not a substitute for astronomical residual rows under the shared-state packet.

##### Packet Schema

The runtime packet should preserve this shape even when a later empirical packet replaces the mock values:

| Field | Required content | Promotion role |
| --- | --- | --- |
| `metadata` | run identifier, source commit when available, input provenance, fit family, and declared comparison level | makes the packet reproducible |
| `required_families` | required observable families, defaulting to `SN`, `BAO`, `CMB`, `WL`, `RSD`, `BBN`, and `PRE_BBN` | prevents cherry-picking a subset of cosmology constraints |
| `theta_sea` | shared dimensionless state record used by all projections | names the single Noether sea state candidate under test |
| `observables` | one row per family with residual vector, covariance, nuisance/calibration note when available, and projection coordinates | supplies $\mathcal{R}_X$ and $\Pi_X\theta_{\mathrm{sea}}$ |
| `projection_weights` | dimensionless weights $w_a$ for common projection coordinates | makes the split penalty explicit rather than rhetorical |
| `lambda` | nonnegative coefficient multiplying the projection penalty | controls how strongly shared-state incompatibility is penalized |
| `thresholds` | predeclared maxima for ordinary residuals, raw projection penalty, shared residual, and projection overlap | prevents post-fit gate selection |
| `gates` | pass/fail records for coverage, residual total, projection penalty, projection overlap, and total shared residual | turns the comparison into an auditable decision surface |
| `failure_code` | null on pass, otherwise the first failed gate | gives follow-up work a stable repair target |

The mock packet uses normalized comparison coordinates such as `H_norm`, `w_eff`, `n`, `chi_sea`, `G_growth`, `Y_BBN`, `Delta_N_eff`, `lambda_fs`, `Omega_GW`, `Z_total`, `Y_path`, and `frequency_exchange_residual`. These are not new ontology. They are dimensionless placeholders for observer-level expansion, equation-of-state, normalized Noether braid density, Noether sea delay, growth-response, BBN-yield, relativistic-species, free-streaming, stochastic-gravitational-wave, total redshift-budget, path-frequency-transfer, and exchange-ledger comparison channels.

##### Pre-BBN Branch Packet

The `PRE_BBN` row is the runtime version of the comparison gate defined in [Inflation Model](../../../../markdown/aaa/cosmology/inflation-model.md#pre-bbn-comparison-gate), [BBN Constraints](../../../../markdown/aaa/cosmology/BBN-constraints.md#pre-bbn-handoff-gate), [Structure Formation](../../../../markdown/aaa/cosmology/structure-formation.md#cmb-lensing-and-acoustic-peaks), and [Gravitational Waves](../../../../markdown/aaa/spacetime/gravitational-waves.md#early-universe-stochastic-background-gate). It represents one declared branch $X$ per packet. Multiple candidate branches should be compared by running separate packets or by building an explicitly documented aggregate row, not by hiding several branches inside one unlabeled residual.

The pre-BBN residual vector should preserve the observable/data-product split:
$$
r_{\mathrm{PREBBN}}
=
\left(
\frac{\|\Delta\mathbf{Y}_{\mathrm{BBN}}^X\|}{\epsilon_{\mathrm{BBN}}},
\frac{\|\Delta C_\ell^X\|}{\epsilon_{\mathrm{CMB}}},
\frac{\|\Delta P_X(k,z)\|}{\epsilon_{\mathrm{growth}}},
\sup_f\frac{\Omega_{\mathrm{GW}}^X(f)}{\Omega_{\mathrm{GW}}^{\max}(f)}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3f446f1eb1b133d1)

The norm and upper-limit ratios in this vector are nonnegative diagnostics, not signed Gaussian residuals. Their squared sum has no default chi-square interpretation; duplicated BBN/CMB/growth data and gravitational-wave upper limits require a joint or conditional likelihood and matched frequency support. The projection keys should include the ordinary shared cosmology coordinates plus branch-facing coordinates such as `Delta_N_eff`, `lambda_fs`, and `Omega_GW`. The packet passes this subgate only when the ordinary residual $\mathcal{R}_{\mathrm{PREBBN}}$ is small and the mapped projection coordinates are compatible and independent provenance establishes that the same $\theta_{\mathrm{sea}}$ is being consumed by BBN, CMB, growth, and gravitational-wave comparisons.

##### Frame-Split Measurement Recipe

The `cosmology.frame_split` witness is the directional subgate for the same shared-state problem. It asks whether the rest-frame correction used for CMB inference can coexist with matter dipoles, supernova residual directionality, BAO anisotropy, and local $H_0$ scatter without giving each family its own hidden frame.

The required frame families are

$$
\mathcal{F}_{\mathrm{frame}}
=
\{\mathrm{CMB},\mathrm{MD},\mathrm{SN},\mathrm{BAO},H_0\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8b61b616046af765)

where $\mathrm{MD}$ denotes matter-dipole catalogues such as radio, infrared, quasar, or galaxy-count samples. Each row must report a measured three-vector $\mathbf{y}_i$, an expected three-vector $\mathbf{m}_i(\theta_{\mathrm{frame}})$ from the declared common frame model, a covariance object $C_i$, calibration or mask context $\nu_i$, and a projection $\Pi_i\theta_{\mathrm{frame}}$ onto shared frame coordinates.

The context $\nu_i$ must distinguish observational provenance from physical residuals. At minimum it should identify the sky mask or footprint, foreground or component-separation recipe when relevant, beam or transfer-function correction, redshift-bin and selection function, standardization or calibration model, covariance construction, and any simulation, mock-catalogue, or machine-learning training source used to estimate significance. These entries do not add another cosmology gate; they prevent a frame residual from being promoted when the mismatch is actually a reduction-pipeline or training-prior artifact.

The preprocessing rules are:

- CMB: $\mathbf{y}_{\mathrm{CMB}}=\mathbf{D}_{\mathrm{CMB}}$. Setting $\mathbf m_{\mathrm{CMB}}$ to that same measured vector defines a conditioning reference with identically zero residual, not an independent validation row. An independent prediction may instead be tested with its joint uncertainty.
- Matter dipoles: for catalogue $X$, $\mathbf{y}_{\mathrm{MD},X}=\mathbf{D}_X$ and
  $$
  \mathbf{m}_{\mathrm{MD},X}
  =
  K_X(\alpha_X,x_X)\,\mathbf{D}_{\mathrm{CMB}}
  +
  \mathbf{F}_{X}(\theta_{\mathrm{frame}},\nu_X)
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-5f4ee677a09b9410)

  where $K_X$ includes the declared amplitude normalization and units as well as the catalogue kinematic amplification factor and $\mathbf{F}_X$ is the allowed non-kinematic directional residual from the shared frame state and survey context.
- Supernovae: $\mathbf{y}_{\mathrm{SN}}(z_b)$ is the fitted distance-modulus dipole in redshift bin $z_b$, after standardization and host-environment bookkeeping; $\mathbf{m}_{\mathrm{SN}}(z_b)$ is the corresponding shared-frame prediction.
- BAO: $\mathbf{y}_{\mathrm{BAO}}(z_b)$ is the anisotropic BAO-scale dipole or lowest retained directional harmonic in bin $z_b$; $\mathbf{m}_{\mathrm{BAO}}(z_b)$ is the shared-frame prediction in the same basis.
- Local $H_0$: $\mathbf{y}_{H_0}(z_b)$ is the directional local-ladder or low-redshift inferred-$H$ scatter vector; $\mathbf{m}_{H_0}(z_b)$ is the shared-frame prediction after the same peculiar-velocity and environment cuts.

For a packet of rows $i\in I_{\mathrm{frame}}$, the directional residual is

$$
\mathcal{Q}_{\mathrm{frame}}
=
\sum_{i\in I_{\mathrm{frame}}}
\left(\mathbf{y}_i-\mathbf{m}_i\right)^T
C_i^{-1}
\left(\mathbf{y}_i-\mathbf{m}_i\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b281f805db01a924)

The displayed sum assumes block-diagonal residual covariance. A common measured CMB reference induces cross-row covariance, so empirical frame tests need joint covariance or a properly conditioned likelihood. An angle requires two nonzero vectors in the same coordinate basis and units; a null angle from a zero vector is missing direction information, not a direction pass. The frame-projection penalty is

$$
\mathcal{P}_{\mathrm{frame}}
=
\sum_{i<j}
\sum_{a\in K_i\cap K_j}
w_a
\left[
(\Pi_i\theta_{\mathrm{frame}})_a
-
(\Pi_j\theta_{\mathrm{frame}})_a
\right]^2
$$

[View →](../../../../../equation-mapping.html#corpus-equation-20a4883a89d61171)

and the combined frame score is

$$
\mathcal{R}_{\mathrm{frame}}
=
\mathcal{Q}_{\mathrm{frame}}
+
\lambda_{\mathrm{frame}}\mathcal{P}_{\mathrm{frame}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4ed41d6110734ee0)

The packet also records a direction check for every nonzero row,

$$
\alpha_i
=
\cos^{-1}
\left(
\frac{\mathbf{y}_i\cdot\mathbf{m}_i}
{\|\mathbf{y}_i\|\|\mathbf{m}_i\|}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-86944af1aaee1ff0)

Tolerances must be declared before fitting: maximum $\mathcal{Q}_{\mathrm{frame}}$, maximum $\mathcal{P}_{\mathrm{frame}}$, maximum $\mathcal{R}_{\mathrm{frame}}$, minimum shared projection-key overlap, and maximum allowed $\alpha_i$ for nonzero vectors. These tolerances are not universal constants; they belong to the survey packet, covariance construction, redshift binning, and systematics budget.

The falsifiers are concrete:

| Failure code | Meaning |
| --- | --- |
| `frame-split-coverage-open` | At least one required family from $\mathcal{F}_{\mathrm{frame}}$ is absent. |
| `frame-split-residual-open` | The directional residual total exceeds the declared tolerance. |
| `frame-split-projection-open` | Families can fit their own vectors only by using incompatible frame-state projections. |
| `frame-split-projection-overlap-open` | The packet does not share enough projection coordinates to test a common frame. |
| `frame-split-angle-open` | A measured vector points too far away from its expected shared-frame vector. |
| `frame-split-shared-open` | The combined residual-plus-projection score exceeds tolerance. |

Any of these failures activates the witness code `cosmology.frame_split`. Passing the mock gate means only that the packet shape is coherent; a real packet must replace the mock vectors with survey-derived dipoles, covariance matrices, redshift-bin definitions, and nuisance records.

##### Runtime Artifact

The first scaffold is:

```text
node scripts/cosmology/shared-residual-fit.mjs --pretty
```

It consumes:

```text
scripts/cosmology/shared-residual-mock.json
```

and emits a JSON result with this shape:

| Output field | Meaning |
| --- | --- |
| `residual_terms` | computed $\mathcal{R}_X$ for each observable family |
| `projection_penalties` | all pairwise $\mathcal{P}_{XY}$ terms, including shared keys and per-key contributions |
| `totals.observable_residual` | $\sum_X\mathcal{R}_X$ |
| `totals.projection_penalty_raw` | $\sum_{X<Y}\mathcal{P}_{XY}$ |
| `totals.projection_penalty_weighted` | $\lambda\sum_{X<Y}\mathcal{P}_{XY}$ |
| `totals.shared_residual` | full $\mathcal{R}_{\mathrm{shared}}$ |
| `gates` | coverage, residual, projection, overlap, and total shared-residual pass/fail records |
| `failure_code` | `observable-coverage-open`, `residual-total-open`, `projection-penalty-open`, `projection-overlap-open`, `shared-residual-open`, or null |
| `frame_split` | optional directional frame-consistency result with vector rows, projection penalties, gates, and `cosmology.frame_split` witness status |

The runtime never reads `theta_sea` or generates projections from it; all residuals, expected frame vectors and projection values are supplied independently. It checks diagonal covariance positivity but does not check full-matrix symmetry or positive definiteness. A full matrix overrides the identity default only when no diagonal covariance is supplied. Negative finite projection weights are accepted, empty residual vectors are accepted, and explicitly empty required-family and observable lists can pass vacuously. Missing thresholds default to infinity; schema, physical provenance, joint covariance and fit degrees of freedom are not evaluated. Frame coverage checks presence rather than unique family occurrence, and zero vectors skip the angle test. The process exits zero even for rejected packets, so consumers must inspect `failure_code`.

The mock packet is deliberately small enough to inspect by hand. A real packet should replace the dimensionless residual entries with survey-derived residual vectors and covariance matrices, and must extend the runtime where joint covariance, authenticated state projections and statistical calibration require it.

##### Acceptance Boundary

Passing the mock packet means only that the scaffold computes the intended residual and gate structure. It does not validate dark energy, $H_0$, $S_8$, BBN, CMB, or growth claims.

A real shared-state packet becomes promotable only if:

1. every required observable family is present exactly once;
2. residual vectors and covariance models are stated before fitting;
3. $\Pi_X\theta_{\mathrm{sea}}$ projections share enough coordinates to test compatibility;
4. ordinary residuals stay inside declared tolerance;
5. the projection penalty stays inside declared tolerance;
6. any included `frame_split` packet passes coverage, residual, projection, angle, and shared-score gates;
7. the same $\theta_{\mathrm{sea}}$ also remains compatible with the cosmology sector predicate in [Failure Criteria](../../../../markdown/aaa/validation/failure-criteria.md#sector-acceptance-sets).

Failure is informative. If the ordinary residual passes but the projection penalty fails, the supplied common coordinates disagree; provenance and coordinate-map review determine whether that represents a state split. If the projection penalty passes but an observable residual fails, the reported coordinates agree but the declared prediction misses that residual tolerance; agreement alone does not establish physical coherence. If coverage fails, the packet is not a cosmology closure artifact.

#### Redshift-Budget Toy Model

This protocol documents the first redshift-budget simulation fixture for the cosmology branch. The fixture is a bookkeeping replay of the factorized redshift record in [Expansion Mechanism](../../../../markdown/aaa/cosmology/expansion-mechanism.md#minimal-redshift-budget-toy-model), not an empirical distance-ladder fit.

The Noether sea is the ambient population of Noether braid assemblies. Its cadence-stretch factor $\Gamma_N$ is reference cadence divided by local cadence, with reciprocal clock rate on the declared shared-clock branch. A redshift budget accounts for a photon record. It separates endpoint cadence, source-branch state, launch geometry, path-history transport, and signed frequency exchange so that a line shift is not silently converted into one undifferentiated expansion variable.

Its purpose is narrow: check the arithmetic of a declared separation of endpoint cadence, source-branch state, launch geometry, and Noether sea path-history in a machine-readable packet before any survey-facing cosmology comparison is attempted. The current packet also exposes the continuity-disciplined path-rate law, so source loading, equilibration, frequency-space current, flow divergence, and anisotropic response are not hidden as unrelated fitted terms.

##### Runtime Artifact

Run the default mock packet with:

```text
node scripts/cosmology/redshift-budget-toy-model.mjs --pretty
```

The script consumes:

```text
scripts/cosmology/redshift-budget-mock.json
```

and emits one result row per scenario. Frequencies are in hertz, path distances in megaparsecs, observer velocities in kilometres per second, and $h$ in joule-seconds; propagation coefficients have inverse-megaparsec units. New numerical instantiations use $c_f=1$ with a separately declared observer-unit conversion. The recorded legacy mock constants are preserved as observer reporting values, not a numerical choice of primitive wake speed. Here $h$ is the observer-level action benchmark used by the recovered photon energy-frequency map; it is not a substrate input.

##### Replay Equation

For a line family $X$, divide the absolutely timed Euclidean path into positive segment lengths $\Delta s_j$ summing to the declared path distance. Each $\alpha_{\mathrm{prop},X,j}$ is a segment average or quadrature approximation with inverse-length units; the update is exact for piecewise constant coefficients and otherwise requires a refinement error bound. The propagation bookkeeping variable starts at

$$
Y_{X,0}=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-262fcd74d54db9f3)

and advances by

$$
Y_{X,j+1}
=
Y_{X,j}
+
\alpha_{\mathrm{prop},X,j}\Delta s_j
$$

[View →](../../../../../equation-mapping.html#corpus-equation-36fa591663237b70)

The fixture then reconstructs the logarithmic redshift budget

$$
Z_X
\equiv
\ln(1+z_X)
=
\ln\Gamma_{N,E}
-\ln\Gamma_{N,R}
+Y_{X,N}
-\ln B_X(E)
-\ln D_v
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8cdca5def216b3bc)

The observed receiver-facing frequency and photon energy are

$$
\nu_{\mathrm{obs},X}
=
\nu_{X,0}\exp(-Z_X),
\qquad
E_{\mathrm{obs},X}
=
h\nu_{\mathrm{obs},X}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a5160b7940772df7)

The positive factors and fixed frequency/clock calibration make these algebraic reconstructions well defined, but do not derive the physical factorization or energy map. Endpoint and path contributions can trade off without independent calibration. $Y_{X,N}$ is the path-history phase-cadence stretch left after endpoint cadence, source-branch shift, and launch geometry have been declared.

The path-history term is signed. A positive increment in $Y_X$ is a redward frequency depletion relative to the clean emitted line, while a negative increment is a blueward frequency boost. For a segment-level exchange row,

$$
\Delta Y_{X,j}^{\mathrm{ex}}
=
-\ln
\frac{\nu_{X,j}^{+}}{\nu_{X,j}^{-}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d90174afa41f1ed8)

with $\nu_{X,j}^{-}$ and $\nu_{X,j}^{+}$ measured in the same local comparison convention before and after the exchange. For an identified coherent line, signed exchange events can represent a frequency ratio rather than a new expansion variable: a hot or coherently moving intervening medium may produce $\Delta Y_{X,j}^{\mathrm{ex}}<0$, while a lower-energy absorbing or relaxing segment may produce $\Delta Y_{X,j}^{\mathrm{ex}}>0$.

A thermal Sunyaev-Zeldovich spectrum is generally redistributed across frequencies and cannot be represented by one line ratio; such comparisons need a spectral transfer operator. Each exchange row should also carry the local energy residual

$$
R_{\nu\text{-}\mathrm{ex},j}
=
\frac{
\left|
E_\gamma(\nu_{X,j}^{+})-E_\gamma(\nu_{X,j}^{-})
+\Delta E_{\mathrm{med},j}
+\Delta E_{\mathrm{recoil},j}
+\Delta E_{\mathrm{rem},j}
\right|
}{E_{\mathrm{tol}}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-9cfc061db347e0cb)

Here $E_\gamma(\nu)$ is the declared photon-channel energy map and $E_{\mathrm{tol}}>0$ is a predeclared tolerance with units of energy. The observer-level relation $E_\gamma=h\nu$ is a recovery benchmark, not a substrate input. The signs of the $\Delta E$ terms are ledger signs, not assumptions about the outcome. A photon boost is allowed only when the intervening medium or target record supplies the energy; a photon depletion is allowed only when the lost photon energy is routed into a named medium, recoil, remnant, or thermalization entry.

For cosmology-facing packets, the same replay should expose whether the redshift channel also supplies the standard time-dilation and flux factors. The comparison target is
$$
\frac{\Delta t_{\mathrm{obs}}}{\Delta t_{\mathrm{emit}}}
=
1+z_X,
\qquad
F
=
\frac{L}{4\pi D_A^2(1+z_X)^4}
=
\frac{L}{4\pi d_L^2},
\qquad
d_L=(1+z_X)^2D_A
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ed2d332ff83e42bf)

Here $L$ is bolometric luminosity and $F$ bolometric received flux. These targets require a transparent metric propagation limit, photon-number conservation and consistent source/receiver clock, angular-distance and luminosity calibration. Packet arrival-time dilation is an additional recovery requirement, not a consequence of shifting one carrier frequency. Angular-distance reciprocity supplies two of the four redshift factors in the displayed $D_A$ denominator; energy and arrival-rate changes supply the other two. These are observer-level distance-ladder diagnostics. A path law that shifts line frequencies but does not dilate packet cadence, or that loses flux without the two redshift factors and angular-distance reciprocity, is not an acceptable cosmological redshift replacement.

##### Input Packet

Each scenario supplies:

| Field | Meaning |
| --- | --- |
| `line_family` | spectral family whose reference frequency is replayed |
| `comparison_line_family` | optional clean comparison family used for chromaticity diagnostics |
| `distance_mpc` | corrected Euclidean path length used for the local transfer slope |
| `B_X_E` | source-branch factor $B_X(E)$ |
| `D_v` | launch or relative-motion factor $D_v$ |
| `Gamma_N_E` | emitter endpoint Noether sea cadence factor $\Gamma_{N,E}$ |
| `Gamma_N_R` | receiver endpoint Noether sea cadence factor $\Gamma_{N,R}$ |
| `endpoint_records` | optional endpoint records from which $\Gamma_{N,E}$ and $\Gamma_{N,R}$ are extracted |
| `launch_record` | optional source/receiver velocity record from which $D_v$ is extracted |
| `segments` | path segments carrying $\Delta s_j$ and propagation coefficients |
| `continuity_transport_by_line` | optional segment-level continuity packet for $\mathbf p_X\cdot D_\gamma\boldsymbol\theta_{\mathrm{sea}}$, $\mathcal C_N[f_N]$, flow divergence, and anisotropic response |
| `transport_terms_by_line` | optional segment-level decomposition of $\alpha_{\mathrm{prop},X}$ into named source, relaxation, or perturbation terms |
| `transport_terms_cadence_by_line` | optional cadence-channel version of the same decomposition for time-dilation checks |
| `dark_energy_transport_by_line` | optional coefficient packet that computes $\alpha_{\mathrm{prop},X}^{\mathrm{DE}}$ from a declared $\boldsymbol{\lambda}_X$ row and $\mathbf{q}_{\mathrm{DE}}$ record |
| `frequency_exchange_events_by_line` | proposed signed exchange records; the current executable does not read this field, integrate its shifts, or evaluate its energy residual |

Segment records may provide separate coefficient arrays for frequency, packet cadence, line-family comparison, and image-bundle beams. This is intentional: the first validation target is to expose when those channels agree and when they split.

Endpoint records may declare $\Gamma_N$ directly or provide a cadence measurement from which the same factor is computed:

$$
\Gamma_N
=
\frac{P_N}{P_{N0}}
=
\frac{\Omega_{N0}}{\Omega_N}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-13a3a8f06b1c1980)

In JSON, this is supplied as `Gamma_N`, `T_N_over_T_N0`, `Omega_N_over_Omega_N0`, or the weak-field proxy `Phi_N_over_c0_squared`, for which the fixture uses $\Gamma_N\approx1-\Phi_N/c_0^2$. The literal input key `T_N_over_T_N0` represents the period ratio $P_N/P_{N0}$; its spelling is preserved as a serialization contract. The weak-field proxy requires $|\Phi_N/c_0^2|\ll1$ and an omitted second-order error bound; the code checks positivity only. Conflicting endpoint representations are not cross-validated: their precedence is direct factor, period ratio, inverse cadence ratio, then weak-field proxy. Scalar `Gamma_N_E` and `Gamma_N_R` values remain valid fallbacks for older or hand-written scenarios.

The executable retains the following legacy comparison formula, which is not the current absolute-record launch target:

$$
\beta_r
=
\frac{(\mathbf{v}_R-\mathbf{v}_E)\cdot\hat{\mathbf{k}}}{c_0},
\qquad
D_v
=
\sqrt{\frac{1-\beta_r}{1+\beta_r}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-0f2c441127207ad6)

The current Expansion Mechanism owner instead defines the absolute-record factor $D_v=(c_0-v_{R,k})/(c_0-v_{E,k})$, with projected endpoint velocities and a common homogeneous propagation calibration. Moving-clock effects belong in the endpoint ratio: only $(\Gamma_{N,R}/\Gamma_{N,E})D_v$ is required to recover the collinear relativistic frequency factor. Inserting the legacy square root as $D_v$ while also applying moving endpoint cadence can double-count that correction. The runtime and recorded mock values retain the legacy formula pending a separate implementation repair.

Here $\hat{\mathbf{k}}$ points from emitter to receiver and $v_r>0$ means increasing separation. The legacy and canonical launch factors agree only to first order in small endpoint speeds divided by $c_0$. The square root is exact in the collinear special-relativistic comparison only when $\beta_r$ is the correctly composed relative velocity, with $|\beta_r|<1$; for collinear velocities in one inertial frame this is $(\beta_R-\beta_E)/(1-\beta_R\beta_E)$. General noncollinear motion requires the full photon/observer contraction, including transverse effects. These are effective recovery comparisons, not primitive kinematics. A packet may provide `beta_r`, `radial_velocity_km_s`, or the triple `emitter_velocity_km_s`, `receiver_velocity_km_s`, and `line_of_sight`. Scalar `D_v` remains the fallback. This observer-level launch factor is not either causal-root factor from the Master Equation: it must not be serialized as the transmitter-side $D_t$, the receiver-side $D_r$, or the signed root-playback ratio $D_r/D_t$.

The continuity-transport extension is a reduced scalar ansatz evaluated on declared segment records:

$$
\alpha_{\mathrm{prop},X,j}
=
\mathbf p_X\cdot\mathbf d_{\theta,j}
+
p_{\nu,X}
\frac{
S_{\mathrm{BH},j}
+
S_{\mathrm{GW},j}
-
R_{\mathrm{eq},j}
-
\partial_\nu J_{\nu,j}
}{
f_{N,j}+\epsilon_f
}
+
p_{u,X}\delta_{u,j}
+
p_{\sigma,X}\sigma_{X,j}
+
\mathcal R_{\mathrm{coh},X,j}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-807179b1743cc166)

Here $\mathbf d_{\theta,j}$ is the path derivative of a declared dimensionless scalar-state projection, with units inverse length. The source-balanced ratio has inverse-absolute-time units when source terms are cadence-density rates. Thus $p_{\nu,X}$ and $p_{u,X}$ have time/length units, while $p_{\sigma,X}$ has inverse-stress/length units if $\sigma_X$ is stress; $\mathbf p_X$ is dimensionless and $\mathcal R_{\mathrm{coh}}$ has inverse-length units. Require positive $f_N$ on the sampled support and nonnegative $\epsilon_f$ in the same units. The ratio is not the clock-rate factor $C_N=\Gamma_N^{-1}$ and need not vanish for an exactly satisfied kinetic equation.

The full Noether Sea owner includes general population sources, a bounded kinetic remainder and a declared cadence-weighted scalar response. This toy reduces those to its named source fields and one supplied scalar; `S_BH` is a retained input key, not an assertion that black holes exhaust the population source. Its physical use needs an independent cadence projection and omitted-source/error bounds. The runtime does not perform that projection or convert continuity time rates to path units. Its legacy numbers must be read as already combined path-unit terms or supplied with appropriately dimensioned coefficients. In JSON, `continuity_transport_by_line` supplies `p_theta_row`, `D_gamma_theta`, `p_nu`, `f_N`, `S_BH`, `S_GW`, `R_eq`, `partial_nu_J_nu`, `p_u`, `div_u_sea`, `p_sigma`, `sigma_projection`, and `R_coh` as needed. The fixture logs the resulting pieces as `continuity.theta_gradient`, `continuity.cadence_residual`, `continuity.flow_divergence`, `continuity.anisotropic_response`, and `continuity.coherence_residue`. Scalar alpha, named terms, continuity terms and dark-energy terms are added, so they must represent nonoverlapping contributions; a previously total alpha must not be supplied alongside its decomposition. Colliding named keys are overwritten by computed continuity/dark-energy keys. Legacy named `transport_terms_by_line` values are still accepted as explicit additions, but a promotable transport scenario should prefer the continuity packet whenever it is claiming to test Noether sea equilibrium transport.

##### Coefficient-Row Validation Notes

The physical interpretation requires each scenario to restrict one independently derived coefficient map. The executable only extracts supplied endpoint factors or ratios; it does not read, estimate or enforce the cadence coefficient row

$$
\mathbf b_N
=
\left(
b_n,\,
b_\chi,\,
b_\lambda,\,
1,\,
b_R
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-cbaa709a5d87fc7e)

The fixed shape coefficient one is inherited only under the homogeneous Lorentz branch’s remainder assumptions, not established by this runtime. The row is subject to the weak static condition $b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R=1$, or $b_n a_n+b_\chi(1+\gamma_{\mathrm{PPN}})+b_\lambda a_\lambda+b_R a_R=1$ when the shared clock/signal delay closure is imposed. This fixture does not determine the individual endpoint coefficients; it checks whether endpoint records are replayed as endpoint cadence rather than hidden inside propagation or source factors.

The launch extraction replays its supplied factor without verifying the canonical endpoint/launch separation. With equal endpoint cadence factors and no source-branch or path-history contribution, the algebra reduces to

$$
Z_X=-\ln D_v,
\qquad
Y_{X,N}=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ff72ac7abe8a8156)

This tests arithmetic sign only; the legacy `launch_record` formula does not validate the current canonical ownership of moving-clock and launch terms. A scenario fails the coefficient-row reading if it needs a nonzero propagation packet to recover a clean relative-motion redshift.

The continuity packet tests only the path row

$$
\left(
\mathbf p_X,\,
p_{\nu,X},\,
p_{u,X},\,
p_{\sigma,X}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-014a4ac66ecbb7a1)

After endpoint, source-branch, and launch corrections have been subtracted, the residual must be

$$
Z_{\mathrm{prop},X}
=
\sum_j
\left[
\mathbf p_X\cdot\mathbf d_{\theta,j}
+p_{\nu,X}\mathcal C_{N,j}
+p_{u,X}\delta_{u,j}
+p_{\sigma,X}\sigma_{X,j}
+\mathcal R_{\mathrm{coh},X,j}
\right]
\Delta s_j
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3a65bb5e5a0781b4)

The mock rows constrain products of coefficients with declared segment records; they do not by themselves fix $\mathbf p_X$, $p_{\nu,X}$, $p_{u,X}$, or $p_{\sigma,X}$ individually. For a constant $\mathbf p_X$ multiplying a true path derivative, the gradient integral is exactly $\mathbf p_X\cdot(\boldsymbol\theta_R-\boldsymbol\theta_E)$ on the selected scalar coordinates. It depends only on endpoint states, and common shifts of shared endpoint/path coefficient rows can leave total redshift unchanged. Independent clock calibration is required to separate them; more path samples do not remove that degeneracy. Independently measured diagnostics can constrain those freedoms: chromaticity residuals, image-bundle variance, time-dilation residuals, nonzero laboratory residuals, or a need to replace the continuity packet with unrelated named terms.

The dark-energy coefficient extension uses

$$
\alpha_{\mathrm{prop},X}^{\mathrm{DE}}
=
\frac{1}{c_\gamma}
\left(
\lambda_\rho^X q_\rho
+\lambda_w^X q_w
+\lambda_{\mathrm{sea}}^X q_{\mathrm{sea}}
+\lambda_{\mathrm{BH}}^X q_{\mathrm{BH}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7a2ad8800789faee)

In JSON, `lambda_row` supplies the four dimensionless coefficients and `q_DE_per_s` supplies the corresponding rate entries in inverse seconds. The script divides by the declared photon-channel speed, using the per-record `c_gamma_km_s`, then the packet-level value, then `c0_km_s`, to convert the result into a path coefficient in $\mathrm{Mpc}^{-1}$. A packet may instead supply `q_DE_per_mpc` when the rate has already been converted into path units.

##### Output Diagnostics

The v1 fixture reports the fields already emitted by `scripts/cosmology/redshift-budget-toy-model.mjs`. Four additional diagnostics remain schema targets and are labeled explicitly below rather than being attributed to the current runtime.

| Output field | Meaning |
| --- | --- |
| `diagnostics.Z_prop_X` | corrected propagation residual $Y_{X,N}$ |
| `diagnostics.Z_total_X` | total reconstructed logarithmic redshift $Z_X$ |
| `diagnostics.redshift_z` | observed redshift $z_X=\exp(Z_X)-1$ |
| `diagnostics.inferred_H_eff_km_s_Mpc` | short-path slope proxy $c_0Y_{X,N}/D$ |
| `diagnostics.chromaticity_residual` | $\left|Y_{X,N}-Y_{Y,N}\right|$ for two clean lines |
| `diagnostics.image_bundle_variance` | variance of beam-specific $Y$ values |
| `diagnostics.time_dilation_residual` | split between frequency and packet-cadence propagation |
| `diagnostics.luminosity_factor_residual` | **Not yet emitted by v1.** Planned mismatch between the replayed flux factor and $F=L/(4\pi D_A^2(1+z_X)^4)=L/(4\pi d_L^2)$ |
| `diagnostics.distance_reciprocity_residual` | **Not yet emitted by v1.** Planned mismatch in the observer-level $d_L=(1+z_X)^2D_A$ relation |
| `diagnostics.frequency_exchange_residual` | **Not yet emitted by v1.** Planned maximum or norm of the signed exchange energy-ledger residuals $R_{\nu\text{-}\mathrm{ex},j}$ |
| `diagnostics.path_transfer_sign` | **Not yet emitted by v1.** Planned classification of whether the corrected path term is net redward, net blueward, or balanced after endpoint, source, and launch terms are removed |
| `observables.nu_obs_hz` | receiver-facing observed frequency |
| `observables.E_obs_j` | receiver-facing photon energy |
| `component_logs` | endpoint, propagation, source-branch, and launch contributions to $Z_X$ |
| `transport_term_logs` | integrated named contributions to $Y_{X,N}$ for frequency and cadence channels |
| `extraction_logs` | endpoint and launch extraction methods, including scalar fallback versus record-derived values |

The diagnostics report arithmetic differences, with no scenario acceptance thresholds. Frequency and cadence can agree because the cadence channel falls back to frequency. More specifically, absence of cadence named transport terms causes an early fallback before separate cadence continuity or dark-energy packets are read; supplying those packets alone does not exercise their intended difference. When computed cadence transport exists, a frequency scalar alpha may also be omitted from the cadence path unless explicitly supplied there.

Missing comparison lines produce null chromaticity, and identical supplied coefficients give zero without independent spectral evidence. Missing beams produce an empty beam array but variance zero; shorter beam arrays repeat their last entry to match the longest array, and absent segment beam values use the main frequency coefficient. Explicit beam alphas are used as full coefficients without adding continuity or dark-energy terms. This variance is a population variance of supplied $Y$ values, not an angular ray-tracing or image-sharpness measurement. An explicit `distance_mpc` overrides the segment sum without an equality check, changing the slope proxy.

The reported $c_0Y/D$ is a finite-path average slope. It approximates a local derivative only with controlled short-path behavior and does not establish an expansion rate by itself. Default factors of one, ignored exchange fields and shared fallback channels are missing-evidence limitations, not successful physical tests.

##### Expected Mock Behavior

The default mock packet has six hand-checkable rows.

| Scenario | Expected behavior |
| --- | --- |
| `clean_laboratory_line` | All factors are unity or zero, so $Z_{\mathrm{prop},X}=0$, $z=0$, and $H_{\mathrm{eff}}=0$. |
| `endpoint_launch_record_extraction` | Endpoint and launch factors are extracted from records: $\Gamma_{N,E}=1/0.995$, $\Gamma_{N,R}=1$, and $D_v\approx0.998501$. The path residual remains $Z_{\mathrm{prop},X}=0$, so the total redshift comes only from endpoint cadence plus launch geometry. |
| `clean_galaxy_path` | Path history dominates the corrected residual: $Z_{\mathrm{prop},X}=0.02812$, giving a local slope near $70.25\;\mathrm{km\,s^{-1}\,Mpc^{-1}}$ while chromaticity, beam variance, and time-dilation residuals remain small. |
| `equilibrium_transport_smooth_h_step` | The continuity packet supplies $Z_{\mathrm{prop},X}=0.02800$, giving a local slope near $69.95\;\mathrm{km\,s^{-1}\,Mpc^{-1}}$ with source and gravitational-wave contributions logged inside the source-balanced cadence residual. |
| `dark_energy_coefficient_packet` | The propagation coefficient is computed from `lambda_row` and `q_DE_per_s`, giving $Z_{\mathrm{prop},X}\approx0.02788$ and a local slope near $69.66\;\mathrm{km\,s^{-1}\,Mpc^{-1}}$. |
| `strong_source_near_black_hole` | Endpoint cadence and source-branch terms dominate the total redshift. The path residual is only $Z_{\mathrm{prop},X}=0.00201$, so a propagation-only distance estimate would be invalid without the endpoint and source corrections. |

These numbers are fixture expectations only. They validate arithmetic, packet shape, and diagnostic separation, not an observed cosmological model.

##### Failure Reading

The first failure modes are concrete:

| Diagnostic pattern | Meaning |
| --- | --- |
| large `chromaticity_residual` on clean lines | the supplied line-dependent path shifts violate the declared achromaticity tolerance; this alone does not identify an energy-loss mechanism |
| large `image_bundle_variance` | supplied beams accumulate different logarithmic shifts; image consequences require separate geometric-optics and angular records |
| large `time_dilation_residual` | frequency shift and packet-cadence stretch no longer share one propagation record |
| large `dark_energy.*` dominance with failed chromaticity or cadence checks | the declared handoff fails the cross-channel tolerance; its cause and whether coefficients were fitted require independent provenance review |
| continuity packet replaced by unrelated named source terms | the run is not testing the no-case-switch transport law because $\partial_\nu J_\nu$, source loading, equilibration, and flow response have been separated into free fit parameters |
| large total $Z_X$ with small $Z_{\mathrm{prop},X}$ | endpoint cadence, source branch, or launch geometry dominate, so distance cannot be inferred from propagation alone |
| nonzero laboratory residual after local corrections | the declared zero-propagation laboratory comparison fails; source, calibration, transport and numerical causes require separate diagnosis |

A promotable redshift-distance packet must keep these diagnostics attached to the same Noether sea state record that later feeds supernova, BAO, CMB, growth, and local-ladder comparisons.

## Closure Scorecard

This chapter is the reusable assessment surface for closure progress across the theory stack. Its purpose is to keep evaluation criteria stable from one scoring cycle to the next so that changes in score reflect actual progress or regression rather than drift in the assessment lens itself.

The scorecard uses the rejection logic, protocol rules, formal obstructions, and parameter classifications in [Failure Criteria](../../../../markdown/aaa/validation/failure-criteria.md), [Validation Protocols](../../../../markdown/aaa/validation/validation-protocols.md), [No-Go Theorems](../../../../markdown/aaa/validation/no-go-theorems.md), and [Parameter Ledger](../../../../markdown/aaa/validation/parameter-ledger.md).

### Assessment Method

A scoring assessment requires a declared, dated corpus scope and retained evidence for each category below. The dated scores below remain historical assessments until superseded by a separately documented scoring cycle. The criteria are certified equations, derivation depth, coefficient recovery, parameter determination, empirical precision, consistency between geometry and dynamics, unresolved assumptions, and falsifiable predictions. Architectural coherence and explanatory reach do not compensate for missing coefficients or unvalidated benchmark recovery.

The scores are structured assessments under the declared rubric, not measurements of the probability that a theory is correct. Dated results describe the evidence available at that assessment; later exposition or additional documents do not automatically increase a score.

Scale: `0-100` (standard numeric grading scale).
Total score rule: weighted arithmetic mean using the Weight column.

Challenger-theory weighting rule: the table must test incumbent recovery first, then challenger surplus. Empirical benchmarks, formula/coefficient recovery, parameter closure, and certified dynamics keep the largest combined weight because a challenger theory must recover the accepted operational stack before claiming replacement status. Architecture, ontology, coverage, and anomaly discipline are scored explicitly but remain bounded so that explanatory reach cannot compensate for missing recovered coefficients or benchmark passes.

### Scoring Lens

The scorecard now weights highly validated mathematical closure. A high score requires not only a coherent theory route, but also explicit equations, coefficient-level derivations, parameter fixing, and contact with tested benchmark physics.

This lens scores accepted closure, not the presence of a plan for closure. Protocols, ledgers, mock packets, replay fixtures, and negative controls can support Falsification Gates, Coverage+Interface Readiness, or adjacent readiness rows only when their required behavior is implemented and independently verified. Existence of a file, a copied pass flag, an unexecuted control, or agreement caused by a shared fallback is not readiness evidence. They should raise Formula+Coefficient Recovery, Parameter+Scale Closure, or Empirical Precision+Benchmark Validation only when they produce retained branch-derived coefficients, fixed parameters, or benchmark passes under declared tolerances.

Shared-record discipline is part of the score. A result that works only after changing the branch record, Noether sea state, coefficient row, apparatus kernel, or calibration context per observable remains local; it should not be scored as cross-regime or empirical closure. Negative and no-go diagnostics can improve auditability and falsification readiness, but they do not by themselves recover target formulas, constants, or benchmark data.

#### Anti-Ratchet Scoring Discipline

Score changes are symmetric. A new assessment may increase, decrease, or leave unchanged any row, and the default posture is null movement unless category-specific evidence crosses the score boundary. Do not award points merely because a new assessment was requested, more documents exist, more ledgers, gates, or protocols were added, or a research direction appears more promising.

The burden of proof is highest for upward movement. A score can rise only when the new evidence satisfies the category being scored: accepted coefficients for Formula+Coefficient Recovery, fixed constants for Parameter+Scale Closure, benchmark passes for Empirical Precision+Benchmark Validation, certified dynamics for Master EOM+Local Dynamics, and so on. If new work clarifies that an earlier assessment counted scaffolding, provisional diagnostics, local fits, or bookkeeping as accepted closure, the next authorized scoring assessment must reconsider and, where the rubric warrants, reduce the score. Historical scores remain dated records; identifying overcredit during an editorial review does not authorize silently replacing them.

Ledgers, gates, validation packets, mocks, source-mining records, and diagnostics required before advancement usually score as Falsification Gates or Coverage+Interface Readiness only when they add enforceable acceptance or failure conditions. They do not raise formula, parameter, empirical, or coefficient rows until they carry accepted recovered values, same-record derivations, or declared-tolerance passes.

Score bands:

- `90-100`: equation-level closure with derived coefficients or theorems, fixed parameters where relevant, and strong empirical or formal validation.
- `70-89`: validated or mathematically mature closure in a broad regime, but with known interface limits, fitted quantities, or incomplete foundational mechanism.
- `50-69`: coherent formal route with substantial equations or models, but missing key derivations, coefficients, or validation passes.
- `30-49`: developed architecture or proof program with major mathematical targets still open.
- `0-29`: hypothesis, placeholder, or early scaffold without certified mathematical closure.

Architectural coherence and ontic logic remain explicit criteria because they matter to theory quality. They carry limited weight so that a strong $\mathbb{A}\mathbb{A}\mathbb{A}$ architecture can score high as architecture without inflating the validated-closure total.

### Current Form-Level Recoveries

The following are conditional form-level mappings and recovery targets described by their live owners. Their presence does not certify the required branch, coefficients, state measure or constitutive response. The current qualifications below distinguish those mathematical forms from the dated scoring judgments retained later in this chapter.

| Sector | Reproducible now | Still blocked |
| :--- | :--- | :--- |
| Weak-field GR bridge | The [effective metric handoff](../../../../markdown/aaa/spacetime/emergent-metric.md) and [clock owner](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md) define the Arnowitt–Deser–Misner (ADM) clock/shift variables and Cartan ruler coframe. In the weak, slow-motion comparison with fixed clock calibration, its conditional clock expansion is $d\tau_{\mathcal A}/dt\approx1-U_N/c_0^2-\|\mathbf w\|^2/(2c_0^2)$ with $U_N=-\Phi_N>0$, $t=t_{\mathrm{eff}}$ and $\mathbf w$ the observer velocity relative to the declared frame. The sign is equivalent to $1+\Phi_N/c_0^2$ for the potential term; the matching is a recovery requirement. | $\Phi_{\mathrm{eff}}=\Phi_N$, $G_{\mathrm{eff}}$, PPN coefficients, and any Einstein-equation analogue still require one same-record Noether sea constitutive derivation. |
| Quantum envelope bridge | On a smooth positive-density, nonrelativistic fixed-particle-number chart, [Effective Lagrangian](../../../../markdown/aaa/dynamics/effective-lagrangian.md) defines the Madelung/Hamilton-Jacobi residual with $Q_{\mathrm{env}}=-(\hbar_{\mathrm{eff}}^2/(2m_{\mathrm{eff}}))\nabla^2\sqrt{\rho_{\mathrm{env}}}/\sqrt{\rho_{\mathrm{env}}}$, and requires continuity, phase-current and Hamilton-Jacobi residual control. The proposed integer action target additionally requires a regular admitted loop with $\mathbf p=\nabla S_{\mathrm{env}}$ and single-valued $e^{iS_{\mathrm{env}}/\hbar_{\mathrm{eff}}}$, so the phase change is an integer multiple of $2\pi$. Density single-valuedness alone does not impose this condition; the phase chart and its global admissibility remain to be derived. | Born-rule recovery, spin-$\tfrac{1}{2}$ exchange, and fermionic antisymmetry remain blocked by the basin-measure pushforward and the polarity-domain-wall $\mathbb{Z}_2$ holonomy wall. |
| Thermodynamic history bridge | The [entropy chapter](../../../../markdown/aaa/dynamics/entropy.md#mapping-in-from-standard-entropies) defines the same-record sea-retuning ratio $\Lambda_{\text{sea}}=T_{\text{retune}}/P_{\text{cycle}}$ as a scale-separation diagnostic. The condition $\Lambda_{\text{sea}}\gtrsim1$ motivates a hysteresis test but does not itself imply an obstruction. | The obstruction is a nonzero period of the heat-over-temperature one-form on a declared reversible-comparison cycle, with state domain and local closure conditions fixed. Its proposed dependence on retuning lag remains a falsifiable hypothesis. |
| Fixed-void cosmology | No-expanding-void discipline forces transport-redshift rows that must recover Tolman $(1+z)^{-4}$, light-curve time dilation $(1+z)$, and $T_{\mathrm{CMB}}(z)=T_0(1+z)$ rather than tired-light energy loss. | [Expansion Mechanism](../../../../markdown/aaa/cosmology/expansion-mechanism.md) and [Dark Energy](../../../../markdown/aaa/cosmology/dark-energy.md) describe $a_{\mathrm{eff}}(t_{\mathrm{eff}})$, Friedmann and sea-equation-of-state comparisons as conditional targets; [Shared Residual Fit](../../../../markdown/aaa/validation/simulations/cosmology-shared-residual-fit.md) documents a mock scaffold. Those forms do not supply an accepted derivation or empirical fit. Promotion requires independently derived response, calibration and joint-covariance evidence. |

These form-level recoveries should not raise Parameter+Scale Closure, Empirical Precision+Benchmark Validation, or coefficient-recovery scores by themselves. They can raise interface readiness or formula-structure scores only when the document explicitly preserves the same-record blocker and the closure-inheritance dependency on the first certified braid.

### Assessment Table

The table and all dated assessment notes below are retained historical judgments, not freshly verified measurements or a current rescoring. In particular, historical credit for packet or interface readiness is not a claim that every runtime enforces its documented gates; the current evidence must be checked before reusing that credit. Older force-ledger wording and equations remain historical provenance and do not override the acceleration-first master-equation convention.

Modern physics columns use the same categories for the effective-theory stack (`GR`, `QM`, `QED`, `QFT`, `QCD`, `SM`, `LCDM`): one operational/effective score and one mechanism/foundational score. The operational column measures validated mathematical and empirical closure of the effective theories. The mechanism column measures how far the same stack supplies a unified underlying mechanism rather than a collection of successful effective descriptions.

The $\Delta$ column is computed as the latest dated $\mathbb{A}\mathbb{A}\mathbb{A}$ score minus $\max(\text{Modern Physics Operational},\text{Modern Physics Mechanism})$; negative values mark that dated assessment’s $\mathbb{A}\mathbb{A}\mathbb{A}$ deficits against the stronger modern-physics comparator.

| Category | Weight | Description | Modern Physics Operational | Modern Physics Mechanism | $\mathbb{A}\mathbb{A}\mathbb{A}$ 2026-05-16 | $\mathbb{A}\mathbb{A}\mathbb{A}$ 2026-06-28 | $\Delta$ |
| :--- | :---: | :--- | :---: | :---: | :---: | :---: | :---: |
| Empirical Precision+Benchmark Validation | 14 | Agreement with direct observation, precision tests, benchmark experiments, simulations, and quantitative pass/fail thresholds. | 98 | 62 | 20 | 42 | -56 |
| Formula+Coefficient Recovery | 12 | Explicit recovery of target formulas and coefficients: Lorentz behavior, clock/redshift laws, PPN terms, mass formulas, quantum probabilities, and Standard Model mappings. | 96 | 64 | 28 | 51 | -45 |
| Parameter+Scale Closure | 9 | Determination status of constants, couplings, scales, constitutive coefficients, and renormalization or calibration freedom. | 68 | 34 | 25 | 44 | -24 |
| Potential+Action Closure | 8 | Action, potential, variational, and force/acceleration closure, including whether the central dynamics derive from a stable mathematical principle. | 96 | 76 | 45 | 75 | -21 |
| Conservation+Invariant Closure | 7 | Energy, momentum, angular momentum, charge, quantum-number, and symmetry-invariant closure, including no-go consistency. | 98 | 88 | 50 | 75 | -23 |
| UV/IR+Regularization Completion | 6 | Ultraviolet and infrared completion quality, including cutoff dependence, singular behavior, regularization limits, horizon/singularity issues, and asymptotics. | 72 | 30 | 30 | 54 | -18 |
| Master EOM+Local Dynamics | 9 | Certified closure of the core equations of motion: local field/effective equations in modern physics and delayed path-history dynamics in $\mathbb{A}\mathbb{A}\mathbb{A}$. | 95 | 64 | 60 | 83 | -12 |
| Cross-Regime Bridge | 8 | Mathematical consistency across regimes: micro to macro, quantum to classical, particle to cosmology, weak to strong gravity, and thermodynamics. | 78 | 38 | 42 | 74 | -4 |
| Internal Constituent Dynamics | 5 | Detailed closure of internal constituent regimes: bound-state/composite dynamics in modern physics and orthogonal-axis three-binary/Noether braid dynamics in $\mathbb{A}\mathbb{A}\mathbb{A}$. | 82 | 52 | 55 | 82 | 0 |
| Falsification Gates | 4 | Explicitness and enforceability of falsification thresholds, stop conditions, validation gates, and failure criteria. | 98 | 82 | 80 | 98 | 0 |
| Discriminating Predictions+Anomaly Discipline | 6 | Independently checkable risky predictions, anomaly-resolution discipline, residual accounting for known tensions, and protection against post-hoc fitting. | 86 | 48 | 48 | 70 | -16 |
| Coverage+Interface Readiness | 2 | Coverage completeness across mathematics/geometry-relevant domains, including interface consistency and minimally developed sections. | 97 | 72 | 72 | 97 | 0 |
| Axiom+Notation | 3 | Canonical symbols, definitions, and cross-chapter mathematical language consistency. | 94 | 74 | 92 | 99 | 5 |
| Theory Architecture+Ontic Logic | 7 | Unified theoretical architecture, explanatory parsimony, substrate logic, and avoidance of ad-hoc patching, scored separately from validated formula recovery. | 50 | 25 | 96 | 99 | 49 |
| **TOTAL** | **100** | **Weighted mean across all categories.** | **86** | **56** | **46** | **68** | **-18** |

The displayed totals are whole-number rounded weighted means: the raw values are 86.45, 56.43, 45.82 and 67.90 in table-column order. The displayed total deficit -18 is the difference of displayed totals 68 and 86; the weighted mean of the individual deficit entries is -18.55. Neither convention changes the historical row scores.

### 2026-06-28 Comparator and $\mathbb{A}\mathbb{A}\mathbb{A}$ Rescore Notes

The 2026-06-28 comparator rescore changes the Modern Physics Operational column from `88` to `86` and the Modern Physics Mechanism column from `67` to `56`. The prior comparator overcredited the mechanism column by letting sector-by-sector operational success stand in for a unified foundational mechanism. Under the challenger-theory lens, the inherited stack remains extremely strong operationally, but its mechanism score is lower because GR, QFT, the Standard Model, and Lambda-CDM do not yet form one ontic dynamics with fixed constants, a shared quantum-gravity bridge, a solved measurement mechanism, or a single dark-sector account.

One new row is added: Discriminating Predictions+Anomaly Discipline. This row is necessary because a challenger theory is not assessed only by reproducing known benchmarks or by having falsification gates. It must also expose independently checkable consequences, anomaly-resolution residuals, and protections against post-hoc fitting. The row is bounded at weight `6` so that it records challenger surplus without letting speculative reach substitute for benchmark recovery.

The reweighting keeps incumbent recovery dominant. Empirical Precision+Benchmark Validation remains weight `14`, while Formula+Coefficient Recovery, Parameter+Scale Closure, Potential+Action Closure, and Master EOM+Local Dynamics together still carry `38` more points. Architecture and ontology remain important, but Theory Architecture+Ontic Logic falls from weight `8` to `7`, and Axiom+Notation falls from weight `4` to `3`, preventing the table from turning into an architecture-preference score.

The latest $\mathbb{A}\mathbb{A}\mathbb{A}$ column is also replaced with the 2026-06-28 anti-ratchet rescore. Conservation+Invariant Closure rises from `74` to `75`, Cross-Regime Bridge rises from `73` to `74`, Internal Constituent Dynamics rises from `81` to `82`, and Falsification Gates rises from `97` to `98`; all other latest-row scores remain unchanged. The latest $\mathbb{A}\mathbb{A}\mathbb{A}$ weighted total remains displayed as `68` with raw value `67.90`, and the comparator adjustment changes the displayed total deficit from `-20` to `-18`. The row-level advantage is still concentrated in Axiom+Notation and Theory Architecture+Ontic Logic; the major deficits remain Empirical Precision+Benchmark Validation, Formula+Coefficient Recovery, Parameter+Scale Closure, Conservation+Invariant Closure, Potential+Action Closure, UV/IR+Regularization Completion, and Discriminating Predictions+Anomaly Discipline.

### 2026-06-26 Assessment Notes

*Historical assessment: the corresponding dated column is not included in the summary table.*

The 2026-06-26 assessment records a weighted $\mathbb{A}\mathbb{A}\mathbb{A}$ score of `68` after assessing the current `167` markdown files under `content/markdown/aaa` through the validated-closure lens. The gain over the prior retained assessment is real but intentionally bounded. The corpus now has a sharper proof and validation spine: shared closure is expressed as an intersection of sector acceptance sets, null-result residuals now include same-record split penalties, simulation campaigns require artifact-bearing proof handoffs, and equation-mapping checkers more aggressively reject priority prose, generated shells, probes, mocks, and source-evidence fixtures as accepted retained evidence.

The strongest score movement is in action, conservation, regularization, and interface discipline. The Master Equation chapter now distinguishes the accepted delayed branch law from the pure scalar $1/r$ action scaffold, records a local no-go for finite same-support scalar and delta-jet counterterms, and preserves a characteristic-direction receiver-gradient identity without treating it as an accepted action or conservation construction. This sharpens Potential+Action Closure and Conservation+Invariant Closure, but does not establish theorem closure: a retained branch chart still has to show an accepted motion derivation, positive transmitter-side Jacobian floors, retained transmitter-side acceleration-weight rows, finite memory depth, and closed motion-plus-wake history accounts on the same row set.

Formula and cross-regime scores rise because the equation-mapping work now covers a wider physics inventory with explicit first blockers: compact-star support, gravitational-wave source recovery, recombination/acoustic transfer, inverse-Compton/SZ path-frequency exchange, finite-window scattering/resonance carriers, weak-visible ledgers, ordered-frame magnetic rows, radiation source ledgers, and shared observation records. Those packets improve the formula interface and make hidden-retune failures easier to locate. They do not yet supply retained branch-derived coefficients, accepted Noether sea response tensors, or benchmark passes, so Formula+Coefficient Recovery remains only low-`50s`, and Empirical Precision+Benchmark Validation remains in the low `40s`.

Parameter+Scale Closure rises modestly because the Parameter Ledger now separates primitive substrate parameters, regulators, geometric closure targets, constitutive closure targets, state variables, and CODATA benchmark rows more rigorously, including exact-SI versus adjusted-measurement residual discipline and the Layer-I two-body scale reduction. The decisive quantities remain open: $A_0$, $\zeta(A_0)$, $E_{\text{internal}}(A_0)$, $\mathcal{M}_{\text{sea}}^{ab}$, $G_{\mathrm{eff}}$, $\alpha$, mass ratios, weak-mixing values, photon-channel coefficients, and cosmology fit parameters are still closure outputs rather than accepted recovered values.

The score is still held below modern operational closure by the same central blockers. No single accepted native record yet supplies the first certified braid, the mass map, Lorentz/PPN coefficients, Born/Bell measures, Standard Model mixing and mass rows, radiation spectra, public gravitational-wave residuals, BBN/CMB/growth fits, or a shared cosmology observation record inside declared tolerances. The recent work makes the failure boundary more explicit and the proof route more mathematical; it does not erase the need for one branch-derived, same-record coefficient and benchmark recovery stack.

### 2026-06-20 Assessment Notes

*Historical assessment: the corresponding dated column is not included in the summary table.*

The 2026-06-20 assessment records a weighted $\mathbb{A}\mathbb{A}\mathbb{A}$ score of `65` after a full read of the `163` markdown files under `content/markdown/aaa`. The score is concentrated in mathematical scaffolding, validation discipline, and interface coverage rather than in final recovery of observed coefficients. The corpus now has a much stronger causal-action and energy/conservation spine: the scalar causal-hit functional has a regularized theorem spine and finite-memory bounds, the energy chapter separates finite-window wake-history balances from particle-only conservation, and Noether braid dynamics states a shared causal-closure certificate target that ties causal-root ledgers, Jacobian floors, transmitter-side acceleration weights, mass response, observer exports, event ledgers, and stability rows to the same retained branch.

The score increase is deliberately limited by the validated-closure lens. Many of the strongest new artifacts are still explicitly theorem targets, mock packets, replay fixtures, or rejection diagnostics. The hydrogen $\Gamma_N$ spectral scan now keeps density, Noether sea delay, scale, envelope, and braid-scale rows separate and uses a shared coefficient row, but it does not yet derive hydrogen envelope gaps, real observer frequencies, or the static response vector from the master dynamics. The cosmology shared-residual fit, Bell-family record-measure harness, radiation ledgers, massive-superposition gravity packet, and thermodynamic residual protocol improve falsification-readiness and benchmark shape, but they do not yet supply empirical joint fits or accepted branch-derived coefficients.

Formula, parameter, and empirical rows remain the main drag on the total. The corpus still lacks a single accepted native record that supplies $E_{\text{internal}}(A_0)$, $\zeta(A_0)$, $\mathcal{M}_{\text{sea}}^{ab}$, Lorentz/PPN coefficients, photon-channel coefficients, Born/Bell measures, weak-mixing and CKM/PMNS values, Standard Model mass formulas, radiation benchmarks, and shared cosmology residual fits. The Parameter Ledger improves the bookkeeping of primitive constants, geometric closure targets, constitutive closure targets, CODATA benchmark rows, and null-result discipline, but most decisive symbols remain open or branch-dependent rather than fixed outputs.

Falsification and coverage now score near modern-operational levels because the corpus contains explicit sector acceptance sets, null-result residuals, failure conditions, benchmark protocols, and cross-regime packet schemas. That does not make the total near modern physics. Architecture and ontology remain very strong, but their limited score weight prevents coherence from compensating for missing derivations, missing coefficients, unfixed parameters, and unvalidated benchmark recovery.

### 2026-05-22 Assessment Notes

*Historical assessment: this note compares the May 22 result with an intermediate score of `59`; neither intermediate column is included in the summary table.*

The 2026-05-22 assessment raises the weighted $\mathbb{A}\mathbb{A}\mathbb{A}$ score from `59` to `61`. The increase is concentrated in notation, internal constituent dynamics, cross-regime bridge quality, and falsification discipline. It is not a coefficient-recovery jump: the central benchmark rows still lack a retained branch that recovers masses, Lorentz / PPN coefficients, photon-channel coefficients, Born/Bell measures, weak mixing, Standard Model masses, or cosmological residuals from one accepted native record.

The Noether braid taxonomy separates the broad neutral assembly class from the prescribed orthogonal-axis three-binary, coincident-axis three-binary, and two-component circular configurations; treats exact binaries as a proof assumption rather than a naming axiom; and routes dynamic exclusion-envelope geometry into the dedicated braid-envelope chapter. That chapter adds a computable assembly/Noether sea interface diagnostic,

$$
D_{a,X}(\mathbf X,T)
=
\frac{
\left\|\mathcal{W}_{a,X}^{\mathrm{locked}}(\mathbf X,T)\right\|
}{
\left\|\mathcal{W}_{a,X}^{\mathrm{locked}}(\mathbf X,T)\right\|
+
\left\|\mathcal{W}_{\mathrm{sea},X}^{\mathrm{ambient}}(\mathbf X,T)\right\|
}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-18f2bd0c3197fe3c)

with locked and ambient contributions built from the same causal-root kernel, Jacobian floors, transmitter-side acceleration weights, branch records, channel projections, and ledger-derived tolerance scales. This justifies raising Axiom+Notation, Cross-Regime Bridge, Internal Constituent Dynamics, and Coverage+Interface Readiness, while keeping the claim below full closure because the interface diagnostic is still a recovery target rather than a validated medium-response theorem.

The Noether sea branch embedding also improves the master-equation bridge. Local assembly branches are now stated as retained branches inside a surrounding Noether sea state and nearby-assembly record:

$$
\mathcal{R}_{\mathrm{branch}}
\left(
B;\Theta_{\mathrm{sea}},\Theta_{\mathrm{asm}},\mathcal{H}_{\partial\Omega}
\right)=0
$$

[View →](../../../../../equation-mapping.html#corpus-equation-dfb8aaa1c558b9f7)

with the force-ledger split

$$
F_i
=
F_{i,\mathrm{internal}}
+
F_{i,\mathrm{sea}}
+
F_{i,\mathrm{asm}}
+
F_{i,\partial\Omega}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-64aa745a32efae86)

This is a concrete mathematical advance because it prevents isolated seed charts from being read as physical branch closure unless Noether sea, assembly, and boundary residuals are statused. It supports modest increases in Master EOM+Local Dynamics, Potential+Action Closure, Conservation+Invariant Closure, Parameter+Scale Closure, and UV/IR+Regularization Completion.

Executable neutral-braid diagnostics add negative evidence and sharper first-failure semantics. The current sampled octahedral root-ledger diagnostic passes the all-pairs sampled root/Jacobian screen, while the fixed-coordinate zero-offset fixed-speed row is rejected by a nonzero tangential residual witness and an ordinary same-transmitter positive-delay no-go. These artifacts improve falsification readiness and empirical/simulation discipline because they report `not_retained` rather than converting a failed seed into branch evidence. The score increase is deliberately small because sampled diagnostics, no-go witnesses for one fixed-coordinate seed, and finite-mode search schemas do not yet replace an interval-certified all-pairs root ledger, action/Noether row, event ledger, stability certificate, or observer-export recovery.

The total remains far below modern operational closure for the same reason as the prior assessments. The theory stack has stronger taxonomy, residual surfaces, and diagnostics required before advancement, but not the decisive retained branch. Until a single native record supplies $E_{\text{internal}}(A_0)$, $\zeta(A_0)$, $\mathcal{M}_{\text{sea}}^{ab}$, Lorentz/PPN recovery, photon-channel recovery, quantum source measures, Standard Model mapping coefficients, and shared cosmology fits, architecture and auditability must not inflate the validated-closure total.

### 2026-05-19 Assessment Notes

*Historical assessment: the corresponding dated column is not included in the summary table.*

The 2026-05-19 assessment records a weighted $\mathbb{A}\mathbb{A}\mathbb{A}$ score of `55`. The gain is broad but still pre-closure: the corpus now carries more explicit proof scaffolds, branch-certificate packet schemas, CODATA benchmark discipline, Standard Model mapping targets, quantum record-measure residuals, and shared cosmology residual gates. These changes improve mathematical auditability and executable validation readiness, but they do not yet close the first accepted branch, derive the central constants, or pass precision benchmark rows.

The largest score changes come from the proof and validation surfaces. The Master EOM material now contains stronger dual-mollified branch-chart, finite-certificate, fold-layer, impulse-bound, continuity, and self-map structures. The $A_0$ branch-certificate protocol and run protocols now specify machine-checkable residual vectors, gate semantics, artifact lists, hidden-tuning failures, and promotion boundaries. These additions justify higher scores for Master EOM+Local Dynamics, Potential+Action Closure, UV/IR+Regularization Completion, Falsification Gates, and Empirical Precision+Benchmark Validation.

Formula, parameter, and cross-regime scores also rise because the corpus now separates exact SI conventions from adjusted CODATA benchmark rows, states the high-pressure roles of $\alpha$, $m_p/m_e$, $R_\infty$, particle masses, and $G$, and gives the hydrogen $\Gamma_N$ spectral row an executable shared-row scaffold rather than a per-line fit. The electroweak, weak-mixing, CKM/PMNS, Higgs, mass-map, Noether sea, and cosmology files now expose more of the required shared-record structure across particle, atomic, gravitational, thermodynamic, and cosmological regimes.

The total remains far below modern operational closure because the decisive derivations are still open. The first certified $A_0$ branch has not passed; $\zeta(A_0)$, $E_{\text{internal}}(A_0)$, and $\mathcal{M}_{\text{sea}}^{ab}$ are not accepted outputs; Lorentz, PPN, redshift, and photon-channel coefficients still lack one accepted Noether sea constitutive map; Born/Bell closure still has negative controls and measure targets rather than a positive pair-provenance theorem; Standard Model mixing and mass formulas remain shared-record theorem targets; and cosmology has a shared residual scaffold but not a fit to SN, BAO, CMB, growth, BBN, and pre-BBN rows with one $\theta_{\mathrm{sea}}$.

### 2026-05-16 Assessment Notes

The 2026-05-16 assessment is rescored under the validated-closure lens. The previous $\mathbb{A}\mathbb{A}\mathbb{A}$ columns were removed because they used a softer equal-weight closure lens that allowed architecture, coverage, and auditability to dominate the total.

$\mathbb{A}\mathbb{A}\mathbb{A}$ still scores very high in Theory Architecture+Ontic Logic because the corpus has a coherent substrate-first architecture, explicit causal-wake ontology, delayed Master Equation of Motion, Noether sea bridge program, and strong cross-document logic. That score is intentionally preserved rather than diluted.

The total is much lower because the central tested-physics closures remain open. The first certified $A_0$ branch is still absent, $\zeta(A)$ and $E_{\text{internal}}(A)$ are not extracted for a mass map, Lorentz and PPN coefficients are not yet derived from accepted attractors, Born-rule and Bell closure remain source-measure targets, weak `V-A` and CKM/PMNS quantitative closure are open, cosmology lacks an empirical shared-state fit, and UV/IR completion still depends on terminal-alignment, singularity, horizon-entropy, and effective-GR recovery proofs.

Modern physics now scores higher in the operational column because the revised lens rewards validated mathematical closure: GR, QFT, QED, QCD, the Standard Model, and LCDM-era phenomenology carry many precise equations, coefficients, and benchmark tests. Its mechanism/foundational score remains lower because the inherited stack does not supply a single ontic mechanism for quantum measurement, gauge/matter origin, gravity/quantum unification, parameter values, or cosmological initial conditions.
