# Validation

## Validation Protocols

This chapter collects the observer-level and simulation-level checks that the framework must pass if it is to retain an absolute frame without contradicting established data. Its purpose is to translate foundational claims into concrete validation tasks: null tests, atomic comparisons, and frame-proxy checks.

It should be used with [Failure Criteria](../../../../markdown/aaa/validation/failure-criteria.md), [Constraint Ledger](../../../../markdown/aaa/validation/constraint-ledger.md), [No-Go Theorems](../../../../markdown/aaa/validation/no-go-theorems.md), [Detecting the Absolute Frame](../../../../markdown/aaa/foundations/detecting-the-absolute-frame.md), and [Lorentz Kinematics](../../../../markdown/aaa/spacetime/lorentz-kinematics.md).

The note is therefore a gatekeeping document. It should tell the reader what has to be reproduced, what mechanism is being claimed, and where falsification would occur.

### Validation Protocols: Preferred-Frame Leakage and Frame Proxies

#### Complete-State and Observational Proxies
* **Complete-state diagnostic:** The $\mathbb{U}_{\text{now}}$ universe-state perspective can use the source-tagged wake-concentricity diagnostic in [Detecting the Absolute Frame](../../../../markdown/aaa/foundations/detecting-the-absolute-frame.md). This is a foundational and simulation-level bookkeeping result, not an operational laboratory protocol for Physical Observers.
* **CMB rest-frame proxy:** The CMB dipole-free frame is an empirical large-scale cosmology proxy for Noether sea rest. It is not an identification of the Euclidean-void rest frame, and it does not give Physical Observers direct access to complete source-tagged wake geometry.
* **Protocol:** Compare simulation outputs against CMB-frame observational summaries only as a large-scale consistency check for Noether sea state and cosmological transport records.

#### Null Tests for Absolute-Frame Drift
* **Simulation Protocol:** Run a simulated Michelson-Morley experiment through a declared Noether sea state.
* **Success Criterion:** The observer-level interference pattern must remain invariant, within the declared leakage bound, as the assembly is rotated relative to the Euclidean-void rest frame.
* **Mechanism to Verify:** Check that the Noether swarm naturally contracts by $\gamma^{-1}$ due to its internal architrino trajectories being compressed by motion through the Noether sea state.

#### Precision Atomic Comparison
* **Protocol:** Compare the predicted shift in the 1S-2S Hydrogen transition for a system moving relative to the Euclidean-void rest frame vs. one at rest.
* **Bounds:** Must match experimental lack of sidereal variation to $< 10^{-16}$.

## Architrino SI Base Units

This chapter examines how the modern SI system interfaces with $\mathbb{A}\mathbb{A}\mathbb{A}$. Its purpose is to ask which defining constants might be derivable, which remain primitive, and what kinds of constant-relations the theory should eventually explain if its geometric closure program succeeds.

It should be read together with [Parameter Ledger](../../../../markdown/aaa/validation/parameter-ledger.md), [Angular Momentum and Spin](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md), [Mapping the Planck Scale](../../../../markdown/aaa/philosophy-history/theory-bridges/planck-scale-nested-shell-swarm-alignment.md), [Energy](../../../../markdown/aaa/dynamics/energy.md), [Particle Masses](../../../../markdown/aaa/assemblies/particle-masses.md), and [Atomic Spectra](../../../../markdown/aaa/nuclear-atomic/atomic-spectra.md).

### Executive Summary

The **2019 revision of the SI** redefined all seven base units in terms of **fixed fundamental constants**, eliminating physical artifacts. This is structurally aligned with the goal of $\mathbb{A}\mathbb{A}\mathbb{A}$: deriving observable physics from a minimal set of substrate postulates (Euclidean void, absolute time, architrino polarity-unit magnitude $\epsilon=|e|/6$, field speed $c_f$).

The $\mathbb{A}\mathbb{A}\mathbb{A}$ program can potentially:
1. **Derive** the numerical values of SI-defining constants from architrino geometry
2. **Explain** why certain constants are fundamental while others are emergent
3. **Predict** relationships between constants that appear independent in the Standard Model
4. **Replace** several SI constants with a smaller set of architrino parameters

---

### The 2019 SI Revision: What Changed

The **new SI** defines all units via **exact values** of seven constants:

| Constant | Symbol | Exact Value (by definition) | Defines Unit |
|----------|--------|----------------------------|--------------|
| Hyperfine transition of Cs-133 | $\Delta \nu_{\text{Cs}}$ | 9,192,631,770 Hz | second (s) |
| Speed of light in vacuum | $c$ | 299,792,458 m/s | meter (m) |
| Planck constant | $h$ | $6.62607015 \times 10^{-34}$ J·s | kilogram (kg) |
| Elementary charge | $e$ | $1.602176634 \times 10^{-19}$ C | ampere (A) |
| Boltzmann constant | $k_B$ | $1.380649 \times 10^{-23}$ J/K | kelvin (K) |
| Avogadro constant | $N_A$ | $6.02214076 \times 10^{23}$ mol⁻¹ | mole (mol) |
| Luminous efficacy of 540 THz radiation | $K_{\text{cd}}$ | 683 lm/W | candela (cd) |

**Key insight:** These SI rows are definitions, not measurements. Their exactness is a property of the unit system. A physical closure claim still has to recover the observer-level records that make those definitions useful: spectral frequencies, charge inventories, action increments, thermal energy scales, and signal propagation.

#### CODATA 2022 Benchmark Discipline

The 2022 CODATA constants tables add a second layer to the SI discussion. Exact SI-defining constants, adjusted constants, and derived conversion factors should not be mixed as if they carried the same evidential status.

| Class | Examples | How $\mathbb{A}\mathbb{A}\mathbb{A}$ should use it |
| --- | --- | --- |
| Exact SI definitions | $c$, $h$, $e$, $k_B$, $N_A$, $\Delta\nu_{\mathrm{Cs}}$ | Treat as unit conventions and observer-level target scales. A derivation must recover why the same convention is stable across clocks, rulers, charges, action records, and thermodynamic records. |
| Adjusted dimensionless or near-direct benchmarks | $\alpha$, $\alpha^{-1}$, $m_p/m_e$, magnetic-moment ratios | Use as high-pressure residual rows because they are mostly independent of arbitrary unit scale. |
| Adjusted dimensional benchmarks | $G$, $m_e c^2$, $m_p c^2$, $m_n c^2$, $m_\mu c^2$, $R_\infty$ | Use only after the substrate-to-observer unit map is declared. These rows test mass, gravity, and spectral closure, but they cannot be inserted as primitive inputs. |
| Derived conversion factors | $\ell_P$, $m_P$, $t_P$, electron volt relationships, atomic-mass relationships | Use as consistency checks, not independent constraints, because their uncertainties inherit the constants used to construct them. |

The current numerical anchors are severe in different ways. The fine-structure constant is
$$
\alpha=7.2973525643\times10^{-3},
\qquad
u_r(\alpha)\approx1.51\times10^{-10}
$$
while the Newtonian constant is
$$
G=6.67430\times10^{-11}\,\mathrm{m^3\,kg^{-1}\,s^{-2}},
\qquad
u_r(G)\approx2.25\times10^{-5}
$$
Thus $\alpha$ is a much sharper dimensionless target than $G$, while Planck-unit rows such as $\ell_P$, $m_P$, and $t_P$ inherit roughly half of the relative uncertainty of $G$ through square-root dependence. A Planck-alignment claim should therefore not over-read the apparent precision of derived Planck-unit numbers.

The standard uncertainty convention matters for scoring. For a measured or adjusted row $X$, use
$$
Z_X
=
\frac{X_{\mathbb{A}\mathbb{A}\mathbb{A}}-X_{\mathrm{CODATA}}}{u(X_{\mathrm{CODATA}})}
$$
when the same observable has been derived from the same record. For exact SI rows, do not form a false zero-uncertainty residual; instead test whether the unit map and the adjusted rows that depend on it close simultaneously.

---

### $\mathbb{A}\mathbb{A}\mathbb{A}$: Fundamental Parameters

In this framework, the candidate substrate-level quantities are:

#### Category A: Ontological Substrate
- **Euclidean void** (no intrinsic structure)
- **Absolute time** $t$ (linear, forward-only parameter)
- **Field propagation speed** $c_f$ (primitive propagation speed for causal wakes)

#### Category B: Fundamental Entity
- **Architrino polarity-unit magnitude** $\epsilon=|e|/6$
- **Causal wake interaction kernel** (inverse-square line-of-action weighting over causal wake surfaces, with regularized coincidence handling)

#### Category C: Assembly Geometry (Emergent but Calculable)
- **Nested shell swarm radius ratios** (inner/middle/outer scales)
- **Maximum curvature binary radius** $r_{\text{max-curv}}$ (where $v \gg c_f$)
- **Reference Noether swarm density** $\rho_{\text{NS},0}$ (the normalization scale for $n(\mathbf{x},t)$)

**Everything else** (masses, coupling constants, cosmological parameters) should be **derivable** from these via:
- Self-hit dynamics (non-Markovian evolution)
- Nested shell swarm stability conditions (quantization)
- Noether sea coupling (emergent metric, inertia)

#### Primitive-to-Derived Measure Ladder

For the units program, it is useful to distinguish primitive measures from derived ones rather than treating the SI list as a flat catalog.

- **Primitive substrate inputs:** field speed $c_f$, architrino polarity-unit magnitude $\epsilon=|e|/6$, absolute time ordering, and the geometric closure scales that belong to stable assemblies.
- **First-order derived measures:** characteristic time, length, action, and energy scales attached to a single stable closure problem.
- **Second-order derived measures:** area, volume, velocity ratios, densities, currents, and transport coefficients built from the first-order scales.

This ladder matters because it fixes the order of derivation. The program should first identify the minimal closure scales of the substrate and only then build compound observer-level units from them. On this reading, many SI constants are not peers inside the ontology; they are bookkeeping conventions sitting at different heights in the derivation tree.

---

### Mapping SI Constants to Architrino Physics

#### The Second (Time Unit) — $\Delta \nu_{\text{Cs}}$

**SI Definition:** The second is defined by the hyperfine transition frequency of Cesium-133:
$$
1 \text{ s} = \frac{9,192,631,770}{\Delta \nu_{\text{Cs}}}
$$

**Architrino Interpretation:**

The hyperfine transition is caused by:
- Interaction between the **outer electron's nested shell swarm** (magnetic moment from its Middle Binary orbital motion at $v \approx c_f$)
- The **nuclear spin** (magnetic moment from proton/neutron Middle Binary configurations)

This is an atomic-clock validation target, not a closed spin derivation. The electron magnetic moment, nuclear spin ledger, and hyperfine coupling must inherit [Angular Momentum and Spin](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md), [Atomic Structure](../../../../markdown/aaa/nuclear-atomic/atomic-structure.md), and [Atomic Spectra](../../../../markdown/aaa/nuclear-atomic/atomic-spectra.md) before $\Delta \nu_{\text{Cs}}$ can be claimed from first principles.

**What we must derive:**
$$
\Delta \nu_{\text{Cs}} = f(\text{nested shell swarm geometry, } c_f, \epsilon, \text{ Noether sea coupling})
$$

**Challenge:** The frequency is determined by:
- The Middle Binary's orbital frequency (sets the magnetic moment)
- The coupling strength between electron and atomic nucleus (mediated by Noether sea response, with photon exchange as the observer-level channel)
- The nuclear configuration (133 nucleons = complex assembly)

**Pathway:**
1. Calculate the electron's Middle Binary orbital frequency $\omega_{\text{MB}}$ for Cs ground state
2. Calculate the magnetic moment $\mu = \frac{\epsilon \cdot \omega_{\text{MB}} \cdot r_{\text{MB}}}{2}$ (classical analogue)
3. Calculate the nuclear spin coupling via Noether sea-mediated potential exchange
4. Derive the splitting frequency

---

#### The Meter (Length Unit) — $c$

**SI Definition:**
$$
1 \text{ m} = \frac{c}{299,792,458} \text{ seconds}
$$
where $c$ is the speed of light.

**Architrino Interpretation:**

The speed of light $c$ is **not fundamental**. It is the low-gradient operational speed of photon assemblies, modeled as coaxial contra-rotating pro/anti planar pairs, propagating through the Noether sea.

**Key relation:**
$$
c_\gamma(\mathbf{x},t)=\frac{c_f}{\chi_\gamma(\mathbf{x},t)},
\qquad
\chi_\gamma(\mathbf{x},t)=f_\gamma\!\left(\rho_{\text{NS}}(\mathbf{x},t),n(\mathbf{x},t),\text{Noether sea state}\right)
$$

In the low-energy limit (flat spacetime, weak Noether sea gradients):
$$
c \approx c_f \quad (\text{small corrections from Noether sea refraction})
$$

**What we must show:**
- Photons are coaxial contra-rotating pro/anti planar pairs whose bosonic/statistical behavior is recovered as a downstream closure target
- Their propagation through the Noether sea is **not instantaneous** but limited by $c_f$
- The effective speed $c$ measured by operational observers (made of assemblies) matches $c_f$ within experimental precision (~$10^{-17}$ for Lorentz tests)

**Candidate deviation channels:**
- In strong gravitational fields (dense Noether sea): $c_\gamma < c_f$ in the photon channel (gravitational lensing, Shapiro delay)
- At Planck scales (Noether sea microstructure resolves): $c_\gamma \neq c_f$ in the photon channel (Lorentz violation signatures)

---

#### The Kilogram (Mass Unit) — $h$

**SI Definition:**
$$
1 \text{ kg} = \frac{h}{(6.62607015 \times 10^{-34}) \text{ m}^2 \text{ s}^{-1}}
$$
via the Kibble balance (relating mechanical power to electromagnetic power).

**Architrino Interpretation:**

The Planck constant $h$ is the observer-level benchmark for a quantum of **closed-cycle action**. The $\mathbb{A}\mathbb{A}\mathbb{A}$ derivation target is to recover this scale from nested shell swarm geometry and the lower recordable basin-measure scale, not to assume it as a primitive input. In the target reduction, $h$ is related to the radian-normalized **outer-binary rotational action** by $\hbar=h/(2\pi)$:
$$
L_{\text{outer}} = n \hbar = n \frac{h}{2\pi}
$$

**Hypothesis:**
$$
\hbar \stackrel{\text{hyp.}}{\approx} \epsilon \cdot c_f \cdot r_{\text{outer}},
\qquad
h = 2\pi\hbar
$$
where $r_{\text{outer}}$ is the characteristic radius of the outer binary in the hydrogen ground-state assembly. This is an internal nested shell swarm action variable, not the observer-level electron orbital angular momentum quantum number $\ell$ of the hydrogen $1s$ state.

**Derivation pathway:**
1. Calculate the outer-binary radius for the hydrogen ground-state assembly (energy minimization + self-hit constraints).
2. Show that closed-cycle action quantization ($\oint p\,dq = n h$) and the equivalent radian-normalized relation ($I=n\hbar$) arise from geometric quantization of the internal binary orbit.
3. Relate $h$ and $\hbar$ to $\epsilon$, $c_f$, and nested shell swarm geometry.

**Target relation:**
$$
h \propto \epsilon \cdot c_f \cdot (\text{geometric factor from nested shell swarm})
$$

---

#### The Ampere (Current Unit) — $e$

**SI Definition:**
$$
1 \text{ A} = \frac{e}{1.602176634 \times 10^{-19}} \text{ C/s}
$$

**Architrino Interpretation:**

The elementary charge magnitude is recovered in the observer-level bookkeeping convention:
$$
|e| = 6\epsilon
$$

**What we must explain:**
- Why only integer multiples of $\epsilon$ appear in stable observer-level electric-charge inventories (charge quantization)
- Why we observe $0, \pm |e|/3, \pm 2|e|/3, \pm |e|$ in nature, never an isolated $\pm\epsilon$ polarity unit
- Candidate answer: **confinement or dynamical suppression**. The $\epsilon$ polarity units are bound in nested shell swarms (quarks) or assemblies (leptons). Isolated $\pm\epsilon$ polarity units are not observed as stable observer-level particles, so the suppression mechanism remains a closure target rather than a completed infinite-energy theorem.

---

#### The Kelvin (Temperature Unit) — $k_B$

**SI Definition:**
$$
1 \text{ K} = \frac{1.380649 \times 10^{-23}}{k_B} \text{ J}
$$

**Architrino Interpretation:**

Boltzmann's constant $k_B$ is the conversion factor between **energy** and **temperature**. But what **is** temperature in $\mathbb{A}\mathbb{A}\mathbb{A}$?

**Hypothesis:**
Temperature is the **mean kinetic energy per degree of freedom** in the Noether sea bath:
$$
\langle E_{\text{kinetic}} \rangle = \frac{1}{2} k_B T
$$

For a neutral Noether swarm assembly in the Noether sea:
- 6 degrees of freedom (3 translational + 3 rotational)
- Mean energy: $\langle E \rangle = 3 k_B T$

**What we must derive:**
$$
k_B = f(\text{neutral Noether swarm assembly mass, } c_f, \text{ thermal equilibrium distribution})
$$

**Pathway:**
1. Calculate the **effective mass** of a neutral Noether swarm assembly (from nested shell swarm dynamics)
2. Assume **thermal equilibrium** (Maxwell-Boltzmann distribution in the Noether sea)
3. Relate the width of the velocity distribution to $k_B T$

**Derivation target:**
$$
k_B \propto m_{\text{NS}} \cdot c_f^2 / (\text{typical thermal velocity})^2
$$

---

#### The Mole — $N_A$

**SI Definition:**
$$
1 \text{ mol} = \frac{N_A}{6.02214076 \times 10^{23}} \text{ entities}
$$

**Architrino Interpretation:**

Avogadro's constant is **not fundamental**. It's a **unit conversion factor** between atomic mass units (amu) and grams.

**Relation:**
$$
N_A = \frac{1 \text{ g}}{1 \text{ amu}} = \frac{1 \text{ g}}{m_{\text{proton}}/12}
$$

**What we must derive:**
- The proton mass $m_p$ from nested shell swarm geometry (3 quarks = 3 nested shell swarms + gluon wake structure + Noether sea coupling)

---

#### The Candela (Luminous Intensity) — $K_{\text{cd}}$

**SI Definition:**
$$
1 \text{ cd} = \frac{683}{K_{\text{cd}}} \text{ lm/W at 540 THz}
$$

**Architrino Interpretation:**

This is a **psychophysical constant**, not a physical one. It relates:
- Physical power (photons/second)
- Human perception (brightness)

The frequency 540 THz corresponds to green light ($\lambda \approx 555$ nm), where the human eye is most sensitive.

**What we can say:**
- Photons at 540 THz are planar-mode phase records with $\omega = 2\pi \times 540 \times 10^{12}$ rad/s; assigning that frequency to a specific Middle Binary is still a derivation target.
- The human retina's photoreceptors (assemblies themselves) couple resonantly to this frequency
- The constant 683 lm/W is **arbitrary**—it's a choice of units based on human biology

---

### Summary Table: SI Constants vs $\mathbb{A}\mathbb{A}\mathbb{A}$ Parameters

| SI Constant | Status in $\mathbb{A}\mathbb{A}\mathbb{A}$ | Derivation Pathway |
|-------------|-------------------------------|-------------------|
| $\Delta \nu_{\text{Cs}}$ | **Derivation target (open)** | Hyperfine splitting from middle-binary magnetic moments |
| $c$ | **Operational limit near $c_f$** | Low-gradient photon-channel speed; deviations are encoded by $\chi_\gamma$ |
| $h$ | **Derivation target (open)** | Closed-cycle action quantization; equivalent outer-binary rotational-action increments in units of $\hbar$; lower recordable basin-measure scale after quantum closure |
| $e$ | **Recovered observer benchmark** | $|e|=6\epsilon$ after choosing the observer-level electric bookkeeping normalization |
| $k_B$ | **Derivation target (open)** | Noether sea thermal equilibrium + assembly mass |
| $N_A$ | **Emergent** | Follows from proton mass derivation |
| $K_{\text{cd}}$ | **Anthropic** | Human biology; not fundamental physics |

---

### Implications: Reducing the SI to Architrino Postulates

If the $\mathbb{A}\mathbb{A}\mathbb{A}$ program succeeds, we can **replace** the seven SI-defining constants with:

#### Candidate Substrate Inputs (Architrino SI)
1. **Architrino polarity-unit magnitude** $\epsilon=|e|/6$ (with observer charge benchmark $|e|=6\epsilon$)
2. **Field speed** $c_f$ (replaces $c$)
3. **Nested shell swarm geometry parameter** (e.g., outer radius $r_{\text{outer}}$ or max-curvature radius) (replaces $h$)
4. **Neutral Noether swarm assembly mass** $m_{\text{NS}}$ (replaces $k_B$ when combined with $c_f$)

**Everything else is intended to be derived after closure:**
- $|e| = 6\epsilon$
- $c_{\text{eff}}\to c_f$ in the low-gradient Noether sea limit
- $h \stackrel{\text{target}}{=} 2\pi \epsilon \cdot c_f \cdot r_{\text{outer}}$ after the action-closure derivation, not by definition
- $k_B = f(m_{\text{NS}}, c_f)$
- $N_A = f(m_p / m_{\text{NS}})$
- $\Delta \nu_{\text{Cs}} = f(\text{Cs nested shell swarm geometry})$

**Result target:** If the closure program succeeds, the seven SI constants reduce to **3-4 fundamental parameters**, with the rest emergent.

---

#### Tier 1 (Must Answer)
1. **Derive $h$ from nested shell swarm geometry**
   - Show that Outer Binary quantization yields $L = n\hbar$
   - Calculate $r_{\text{outer}}$ for hydrogen 1s
   - Predict $h$ and compare to SI value

2. **Confirm $c = c_f$ within bounds**
   - Show photon propagation through the Noether sea matches $c$ to $<10^{-17}$
   - Identify where/how deviations appear (Planck scale, strong gravity)

3. **Derive particle masses**
   - First derive the calibration-free $A_0$ reference-attractor packet described in [Particle Masses](../../../../markdown/aaa/assemblies/particle-masses.md#reference-attractor-gate).
   - Use that packet to extract $E_{\text{internal}}(A_0)$, $\zeta(A_0)$, and the baseline $\mathcal{M}_{\text{sea}}^{ab}$ response map before using electron, proton, or charged-lepton data as benchmarks.
   - Only after the mass-map gate is fixed, test downstream predictions such as $m_e$, $m_p$, and $m_p/m_e \approx 1836$.

#### Tier 2 (High Priority)
4. **Calculate $\Delta \nu_{\text{Cs}}$ from first principles**
   - Map Cs atomic structure to Noether swarm assemblies
   - Derive hyperfine coupling strength
   - Compare to 9,192,631,770 Hz

5. **Derive $k_B$ from Noether sea thermodynamics**
   - Calculate neutral Noether swarm assembly effective mass
   - Show thermal equilibrium reproduces Maxwell-Boltzmann
   - Predict $k_B$ value

#### Tier 3 (Refinement)
6. **Map all SM particles to nested shell swarm recipes**
   - Create "particle cookbook" (analogous to chemical formulas)
   - Show charge, spin, statistics all emerge from geometry

7. **Explain fine-structure constant $\alpha$**
   - $\alpha = \frac{e^2}{4\pi \epsilon_0 \hbar c} \approx 1/137$
   - In architrino terms: $\alpha = f(\epsilon, c_f, r_{\text{outer}}, \text{Noether sea})$
   - Derive numerically; explain why $\alpha \ll 1$

---

### Philosophical Payoff

If we succeed, the **2019 SI revision** will be seen as a **halfway house**:
- It eliminated physical artifacts (kilogram prototype)
- But it enshrined **7 constants** as fundamental

The **architrino revision** completes the journey:
- It eliminates **ontological constants** (replacing them with geometric consequences)
- It reduces the foundation to **3-4 substrate parameters**
- It makes all measurements traceable to **void geometry + absolute time**

**The ultimate goal:** A measurement system where every quantity is expressed in terms of:
- **Lengths** (in units of $c_f \cdot t$)
- **Times** (in absolute time units)
- **Polarity units** (in units of $\epsilon=|e|/6$)

No kilograms, no kelvins, no moles—just **geometry, time, and polarity bookkeeping**, with observer units recovered above that layer.

That would be a substrate-level measurement framework, with observer units recovered as derived conventions.

## Parameter Ledger

This chapter is the canonical bookkeeping page for the symbols that control closure across the current $\mathbb{A}\mathbb{A}\mathbb{A}$ corpus. Its purpose is not to re-derive every quantity. Its purpose is to keep the roles of primitive postulates, geometric closure targets, constitutive coefficients, state variables, and observer-level benchmarks from collapsing into one another.

The central bookkeeping rule is simple: not every symbol that appears in an equation is a free parameter. Some symbols are fixed substrate inputs, some are assembly-dependent outputs, some are constitutive functions of the Noether sea, and some are measured benchmarks that the theory is supposed to recover.

### Purpose

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

The corpus uses both $v$ and $c_f$ for field speed in different chapters. This ledger treats
$$
c_f
$$
as the canonical symbol for the physical field speed, while $v=1$ or $c_f=1$ denotes a chapter-local nondimensionalization convention.

#### Parameter versus field

The following should **not** be treated as free global constants:

- $n(\mathbf{x},t)$,
- $\rho_{\text{NS}}(\mathbf{x},t)$,
- $\Phi_{\text{eff}}(\mathbf{x},t)$,
- $c_{\text{eff}}(\mathbf{x})$,
- $\chi_{\text{sea}}(\mathbf{x},t)$,
- $m_{\text{inertial}}(A)$ for a specific assembly $A$.

These are state variables, constitutive fields, or derived outputs. They may be controlled by a smaller parameter set, but they are not themselves independent parameters.

#### Benchmark versus postulate

The following observer-level quantities are closure targets, not primitive inputs:

- $e$,
- $h,\hbar$,
- $G$,
- $\gamma_{\text{eff}},\beta_{\text{eff}},\alpha_i$,
- particle masses and electroweak angles,
- observer-level redshift and expansion summaries such as $Z_X$, $a(t)$, $H(t)$, and $H_{\mathrm{eff}}$.

If the theory must reset them independently for each chapter, parameter closure has failed.

#### CODATA Benchmark Contract

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
\frac{X_{\mathbb{A}\mathbb{A}\mathbb{A}}-X_{\mathrm{CODATA}}}{X_{\mathrm{CODATA}}}
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

The most important mining consequence is procedural: exact rows such as $h$, $e$, $k_B$, and $c$ are not easier physical targets because their listed uncertainty is zero. They are exact in SI because the units are defined through them. The physical pressure comes from the adjusted and dimensionless rows, especially $\alpha$, $m_p/m_e$, $R_\infty$, particle mass-energy equivalents, and $G$.

#### Naturalness and sensitivity

When a symbol is claimed as a closure output rather than a free fit, use the fine-tuning quotient
$$
\mathrm{FTQ}(p)=
\frac{\Delta p/p}{\Delta \mathrm{obs}/\mathrm{obs}}
$$
as the default sensitivity diagnostic.

Here $\Delta p/p$ is the fractional perturbation of a parameter or closure output, and $\Delta \mathrm{obs}/\mathrm{obs}$ is the resulting fractional perturbation of the observable being tested. Values $\mathrm{FTQ}(p)>10$ should be treated as fine-tuning pressure unless a discrete topology, symmetry, attractor basin, or measured benchmark explains the sensitivity.

Current status:

- $\epsilon=|e|/6$ is treated as a discrete polarity-unit input and an explanatory target, not as a continuous fit.
- $\kappa$ is the universal coupling in the primitive acceleration law. In the bare two-body scale closure below it combines with $c_f$ and $\epsilon$ to set length and time units rather than an independent dimensionless tuning knob, while its primitive, derived, or normalization-sensitive status in the observer-level unit map remains open.
- $\rho_{\text{NS},0}$ and related medium-density normalizations remain naturalness risks until energy shielding and cosmological closure are quantified.

#### Regulator versus physical pulse

The wake-width regulator $\eta$ is a computational and analytic regularization, not a claim that causal wakes are fundamentally pulsed. It smooths causal wake surfaces so integrals and simulations can be evaluated with finite resolution. As $\eta\to0$, the intended limit is the continuous path-history law, with each discrete time step in a simulation approximating the contribution from a narrow causal wake surface rather than replacing the underlying continuous emission.

#### Layer-I two-body scale closure

The exact bare two-body kernel has no independent dimensionless tuning constant after the regulator is removed or treated as a numerical convention. The dimensional substrate triplet
$$
(c_f,\kappa,\epsilon)
$$
spans the base dimensions $(\mathrm{L},\mathrm{T},\mathrm{Q})$ because
$$
[c_f]=\mathrm{L}\,\mathrm{T}^{-1},
\qquad
[\kappa]=\mathrm{L}^3\,\mathrm{T}^{-2}\,\mathrm{Q}^{-2},
\qquad
[\epsilon]=\mathrm{Q}
$$
It therefore defines canonical two-body units
$$
Q_*=\epsilon,
\qquad
R_*=\frac{\kappa\epsilon^2}{c_f^2},
\qquad
T_*=\frac{R_*}{c_f}=\frac{\kappa\epsilon^2}{c_f^3}
$$
For $\tilde{\mathbf{x}}=\mathbf{x}/R_*$, $\tilde t=t/T_*$, and $\tilde q_i=q_i/\epsilon=\pm1$, the causal constraint and bare acceleration law reduce to
$$
\tilde r_{ij}=\tilde t-\tilde t_0
$$
and
$$
\frac{d^2\tilde{\mathbf{x}}_i}{d\tilde t^2}
=
\sum_j\sum_{\tilde t_0\in\tilde{\mathcal{C}}_{ij}(\tilde t)}
\sigma_{ij}
\frac{|\tilde q_i\tilde q_j|}
{\tilde r_{ij}^2|\tilde J_{ij}|}
\hat{\mathbf{r}}_{ij}
$$
up to the separately declared regulator ratio $\eta/R_*$ when a mollified surrogate is being used.

Consequently, every dimensionless output of the isolated bare two-body problem is a pure branch-geometry result: root multiplicities, branch-birth thresholds, maximum-curvature speed ratios, residual signs, and any certified radius in units of $R_*$. This does not certify that a stable maximum-curvature binary exists. It says that if a certified two-body branch produces such a number, that number is computed by the root ledger and stability problem rather than fitted by changing a Layer-I dimensionless constant.

### Layer I: Substrate and Kernel Parameters

These symbols belong to the delayed microscopic law itself.

| ID | Symbol | Class | Current status | Meaning | Primary home |
| --- | --- | --- | --- | --- | --- |
| K1 | $c_f$ | Fundamental parameter | Primitive | field speed of causal wake propagation | [../dynamics/master-equation.md](../../../../markdown/aaa/dynamics/master-equation.md), [../foundations/absolute-timespace.md](../../../../markdown/aaa/foundations/absolute-timespace.md) |
| K2 | $\epsilon$ | Fundamental parameter | Primitive | potential polarity-unit magnitude, with observer-level electric charge reconstructed from it | [../assemblies/fermions/quantum-number-mapping.md](../../../../markdown/aaa/assemblies/fermions/quantum-number-mapping.md), [../assemblies/gauge-structure-emergence.md](../../../../markdown/aaa/assemblies/gauge-structure-emergence.md) |
| K3 | $\kappa$ | Fundamental parameter or normalization-sensitive coupling | Open as primitive/normalization split; universal in the substrate acceleration law | coupling multiplying $\sigma_{ij}\lvert q_iq_j\rvert/(r_{ij}^2\lvert J_{ij}\rvert)$ in the per-hit acceleration law; because a single architrino has no primitive inertial mass, this is not an $F=ma$ coefficient; with $c_f$ and $\epsilon$ it sets the two-body scale $R_*=\kappa\epsilon^2/c_f^2$ rather than a Layer-I dimensionless fit constant; dimensional row $[\kappa]=\mathrm{L}^3\,\mathrm{T}^{-2}\,\mathrm{Q}^{-2}$ | [../dynamics/master-equation.md](../../../../markdown/aaa/dynamics/master-equation.md), [architrino-si-base-units.md](../../../../markdown/aaa/validation/architrino-si-base-units.md), [../foundations/architrino.md](../../../../markdown/aaa/foundations/architrino.md) |
| K4 | $\eta$ | Regulator / convention | Open but non-ontological | mollifier width used to regularize causal wake surfaces for smooth dynamics and numerics | [simulations/action-energy/well-posedness-and-regularization.md](../../../../markdown/aaa/validation/simulations/action-energy/well-posedness-and-regularization.md), [../dynamics/master-equation.md](../../../../markdown/aaa/dynamics/master-equation.md) |
| K5 | $Z_e$ | Regulator / convention | Convention, default $Z_e=1$ | coarse-graining / normalization factor in the substrate-to-observer charge map | [../assemblies/gauge-structure-emergence.md](../../../../markdown/aaa/assemblies/gauge-structure-emergence.md), [../assemblies/fermions/quantum-number-mapping.md](../../../../markdown/aaa/assemblies/fermions/quantum-number-mapping.md) |

### Layer II: Assembly-Geometry Closure Targets

These quantities belong to Noether swarm architecture, shielding, branch structure, and assembly response.

| ID | Symbol | Class | Current status | Meaning | Primary home |
| --- | --- | --- | --- | --- | --- |
| G0 | $A_0$ | Geometric closure target | Open | calibration-free neutral rest-branch Noether swarm reference attractor used to derive the first mass-map outputs before particle benchmarks enter | [../assemblies/particle-masses.md](../../../../markdown/aaa/assemblies/particle-masses.md), [../noether-swarm/nested-shell-swarm-dynamics.md](../../../../markdown/aaa/noether-swarm/nested-shell-swarm-dynamics.md), [../dynamics/energy.md](../../../../markdown/aaa/dynamics/energy.md) |
| G0a | $\mathcal{P}_{A_0}$ | Geometric closure target | Open; compact finite-coordinate no-go recorded, branch-chart revision required before Tier 1 continuation | certificate packet tying the finite closure graph $\mathcal{G}_{A_0}$, active root ledger, quotient Floquet gap $\Delta_{\mathbf{k}}$, shielding extraction, and $\mathcal{M}_{\text{sea}}^{ab}$ response probe into one promotion sequence | [simulations/a0-branch-certificate-protocol.md](../../../../markdown/aaa/validation/simulations/a0-branch-certificate-protocol.md), [simulations/a0-tier0-result-interpretation.md](../../../../markdown/aaa/validation/simulations/a0-tier0-result-interpretation.md), [../assemblies/particle-masses.md](../../../../markdown/aaa/assemblies/particle-masses.md) |
| G1 | $R_{\text{inner}},R_{\text{middle}},R_{\text{outer}}$ | Geometric closure target | Open | characteristic radii of the nested binaries in the Noether swarm | [../noether-swarm/noether-swarm.md](../../../../markdown/aaa/noether-swarm/noether-swarm.md), [../noether-swarm/nested-shell-swarm-geometry.md](../../../../markdown/aaa/noether-swarm/nested-shell-swarm-geometry.md), [../noether-swarm/nested-shell-swarm-dynamics.md](../../../../markdown/aaa/noether-swarm/nested-shell-swarm-dynamics.md) |
| G2 | $\omega_{\text{inner}},\omega_{\text{middle}},\omega_{\text{outer}}$ | Geometric closure target | Open | characteristic binary frequencies associated with the nested radii | [../noether-swarm/nested-shell-swarm-dynamics.md](../../../../markdown/aaa/noether-swarm/nested-shell-swarm-dynamics.md), [../assemblies/particle-masses.md](../../../../markdown/aaa/assemblies/particle-masses.md) |
| G3 | $R_{\text{align}}$ | Geometric closure target | Open, conjectural | outer-binary alignment radius in the terminal Planck-alignment map | [../philosophy-history/theory-bridges/planck-scale-nested-shell-swarm-alignment.md](../../../../markdown/aaa/philosophy-history/theory-bridges/planck-scale-nested-shell-swarm-alignment.md) |
| G4 | $\mathcal{A}_{\text{align}}^{\text{cycle}}, I_{\text{align}}$ | Geometric closure target | Open, conjectural | closed-cycle action and radian-normalized rotational-action increment of the aligned terminal mode | [../philosophy-history/theory-bridges/planck-scale-nested-shell-swarm-alignment.md](../../../../markdown/aaa/philosophy-history/theory-bridges/planck-scale-nested-shell-swarm-alignment.md) |
| G5 | $\zeta(A)$ | Geometric closure target | Open | shielding or leakage factor of assembly $A$, defined by far-field suppression relative to naive constituent exposure | [../dynamics/energy.md](../../../../markdown/aaa/dynamics/energy.md), [../assemblies/particle-masses.md](../../../../markdown/aaa/assemblies/particle-masses.md) |
| G6 | $\alpha$ | Geometric closure target | Open | axial-frame misalignment angle used in the weak-mixing / quark-geometry program | [../assemblies/fermions/weak-mixing-angle.md](../../../../markdown/aaa/assemblies/fermions/weak-mixing-angle.md) |
| G7 | $\phi_c$ | Geometric closure target | Open | color-sector azimuth selecting the exceptional axial-frame orientation | [../assemblies/fermions/weak-mixing-angle.md](../../../../markdown/aaa/assemblies/fermions/weak-mixing-angle.md) |

### Layer III: Constitutive Spacetime Parameters

These symbols control the handoff from the Euclidean substrate plus Noether sea to effective metric language.

| ID | Symbol | Class | Current status | Meaning | Primary home |
| --- | --- | --- | --- | --- | --- |
| C1 | $\rho_{\text{NS},0}$ | Constitutive closure target | Open | reference Noether swarm density used to normalize the Noether sea | [../spacetime/emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md), [../spacetime/proper-time-and-time-dilation.md](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md) |
| C2 | $n(\mathbf{x},t)$ | State variable / field | Derived field | normalized Noether swarm density, $n=\rho_{\text{NS}}/\rho_{\text{NS},0}$ | [../spacetime/emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md), [../spacetime/proper-time-and-time-dilation.md](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md) |
| C3 | $\Omega(\mathbf{x}),\xi(\mathbf{x})$ | Constitutive closure target | Open | clock-channel and ruler-channel response functions in the effective metric subclass | [../spacetime/emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md), [../spacetime/lorentz-kinematics.md](../../../../markdown/aaa/spacetime/lorentz-kinematics.md) |
| C4 | $\Phi_{\text{eff}}(\mathbf{x},t)$ | State variable / field | Derived field | constitutive effective potential defined from the clock channel | [../spacetime/emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md), [../spacetime/proper-time-and-time-dilation.md](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md) |
| C5 | $c_{\text{eff}}(\mathbf{x},t)$ | State variable / field | Derived field | Noether sea dressed assembly-channel propagation speed used for clock/ruler closure and effective-metric comparisons, with $c_{\text{eff}}\to c_f$ in weak homogeneous conditions; separate from photon-channel speed $c_\gamma$ unless Gate A closes that identification | [../spacetime/emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md), [../spacetime/ppn-parameters.md](../../../../markdown/aaa/spacetime/ppn-parameters.md) |
| C5a | $\chi_{\text{sea}}(\mathbf{x},t)$ | Derived response field | Derived from $c_{\text{eff}}$ | Noether sea delay factor, $\chi_{\text{sea}}=c_f/c_{\text{eff}}$; replaces optical refractive-index notation in Noether sea propagation maps | [../spacetime/noether-sea.md](../../../../markdown/aaa/spacetime/noether-sea.md), [../spacetime/emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md), [../spacetime/ppn-parameters.md](../../../../markdown/aaa/spacetime/ppn-parameters.md) |
| C6 | $\gamma_{\text{eff}}$ | Constitutive closure target with observable meaning | Open | first-order refraction / space-curvature coefficient in the weak-field map | [../spacetime/ppn-parameters.md](../../../../markdown/aaa/spacetime/ppn-parameters.md) |
| C7 | $C_2$ or $\beta_{\text{eff}}$ | Constitutive closure target with observable meaning | Open | second-order clock-channel nonlinearity entering the $g_{00}$ expansion | [../spacetime/ppn-parameters.md](../../../../markdown/aaa/spacetime/ppn-parameters.md) |
| C8 | $\Xi_1,\Xi_2,\Xi_3,\Xi_4$ | Constitutive closure target | Open | preferred-frame leakage coefficients in the weak-field constitutive expansion | [../spacetime/ppn-parameters.md](../../../../markdown/aaa/spacetime/ppn-parameters.md) |
| C9 | $\mathcal{M}_{\text{sea}}^{ab}$ | Constitutive closure target | Open | medium-response tensor that maps shielded internal assembly energy to inertial momentum response, reducing to $h^{ab}/c_{\text{eff}}^2$ in a homogeneous isotropic Noether sea cell | [../dynamics/energy.md](../../../../markdown/aaa/dynamics/energy.md), [../assemblies/particle-masses.md](../../../../markdown/aaa/assemblies/particle-masses.md) |

### Layer IV: Observer-Level Benchmarks and Derived Outputs

These quantities are where closure is tested. They are not substrate inputs.

| ID | Symbol | Class | Current status | Meaning | Primary home |
| --- | --- | --- | --- | --- | --- |
| O1 | $e$ | Observable benchmark | Derived target | elementary charge reconstructed from substrate charge and normalization map | [../assemblies/fermions/quantum-number-mapping.md](../../../../markdown/aaa/assemblies/fermions/quantum-number-mapping.md), [../assemblies/gauge-structure-emergence.md](../../../../markdown/aaa/assemblies/gauge-structure-emergence.md) |
| O2 | $h,\hbar$ | Observable benchmark / geometric target | Open | full-cycle action quantum and radian-normalized angular-momentum quantum to be related to nested shell swarm alignment, orbital closure, and any lower recordable basin-measure scale derived by quantum closure | [../philosophy-history/theory-bridges/angular-momentum-and-spin.md](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md), [../philosophy-history/theory-bridges/planck-scale-nested-shell-swarm-alignment.md](../../../../markdown/aaa/philosophy-history/theory-bridges/planck-scale-nested-shell-swarm-alignment.md), [architrino-si-base-units.md](../../../../markdown/aaa/validation/architrino-si-base-units.md) |
| O3 | $G$ or $G_{\text{eff}}$ | Observable benchmark / constitutive target | Open | effective gravitational coupling emerging from medium compliance and alignment geometry | [../philosophy-history/theory-bridges/planck-scale-nested-shell-swarm-alignment.md](../../../../markdown/aaa/philosophy-history/theory-bridges/planck-scale-nested-shell-swarm-alignment.md), [../spacetime/emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md) |
| O4 | $m_{\text{inertial}}(A)$ | Derived output | Open | inertial mass of assembly $A$, extracted operationally from shielding and medium response | [../dynamics/energy.md](../../../../markdown/aaa/dynamics/energy.md), [../assemblies/particle-masses.md](../../../../markdown/aaa/assemblies/particle-masses.md) |
| O5 | $\theta_W^{\text{bare}}$ and $\theta_W$ | Geometric target / observable benchmark | Open | bare geometric weak-mixing increment and the measured electroweak mixing angle it must eventually inform | [../assemblies/fermions/weak-mixing-angle.md](../../../../markdown/aaa/assemblies/fermions/weak-mixing-angle.md), [../assemblies/gauge-structure-emergence.md](../../../../markdown/aaa/assemblies/gauge-structure-emergence.md) |
| O6 | $(\alpha_1,\alpha_2,\alpha_3)$ | Observable benchmark | Open | standard PPN preferred-frame coefficients derived from $(\Xi_1,\Xi_2,\Xi_3)$ | [../spacetime/ppn-parameters.md](../../../../markdown/aaa/spacetime/ppn-parameters.md) |
| O7 | $Z_X^{E\to R}$, $Y_{X,E\to R}$, and $H_{\mathrm{eff},X}$ | Observer-level derived output | Open | total signed photon-frequency transfer, path-history exchange contribution, and inferred redshift-transfer slope for a declared source/receiver record; not primitive expansion parameters | [../cosmology/expansion-mechanism.md](../../../../markdown/aaa/cosmology/expansion-mechanism.md), [simulations/redshift-budget-toy-model.md](../../../../markdown/aaa/validation/simulations/redshift-budget-toy-model.md), [reaction-cosmology-provenance-ledger.md](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md) |

### Canonical Relations

The ledger above is only useful if the interfaces between layers stay explicit. The following relations are the current canonical handoff points in the corpus.

#### 1. Microscopic delayed dynamics

The regularized exact law uses the kernel-side set
$$
(c_f,\epsilon,\kappa,\eta)
$$
A representative regularized form is
$$
\mathbf{a}_a(t)=
\sum_b
\kappa\,\sigma_{ab}|q_aq_b|
\int_{-\infty}^{t}\!dt_0\;
\frac{\hat{\mathbf{r}}_{ab}(t;t_0)}{r_{ab}(t;t_0)^2}\,
\delta_\eta\!\big(r_{ab}(t;t_0)-c_f(t-t_0)\big)
$$

This is the substrate-side parameter core. Any exact or numerical closure that changes these symbols chapter by chapter is not a closed theory.

#### 2. Charge reconstruction

The current substrate-to-observer charge map is
$$
|e| = 6\epsilon \sqrt{\kappa c_f}\,Z_e
$$
with canonical normalization choice
$$
Z_e=1
$$

This relation is important because it shows that the elementary charge magnitude is not presently a primitive input in the architrino ontology. It is a recovered observer-level benchmark.

This equation is a normalization-sensitive substrate-to-observer reconstruction, not a second primitive definition of $\epsilon$. The primitive polarity convention used by the foundation and mathematics-canon pages is $\epsilon=|e|/6$ after the observer-level electric bookkeeping normalization is fixed. If $\sqrt{\kappa c_f}Z_e\ne1$ in a dimensional convention, that factor belongs to the conversion map rather than to a separate architrino charge ontology. Closing this equivalence remains tied to the K3/K5 normalization problem.

#### 3. Medium normalization and clock-channel potential

The constitutive spacetime layer uses
$$
\rho_{\text{NS}}(\mathbf{x},t)=\rho_{\text{NS},0}\,n(\mathbf{x},t)
$$
and
$$
\Phi_{\text{eff}}(\mathbf{x})
=
c_f^2\ln\!\big(\Omega(\mathbf{x})\xi(\mathbf{x})\big)
$$

Here $\xi$ is the Noether swarm envelope shape ratio, while $\Omega\xi$ is the clock-rate factor used by this exponential metric subclass after the geometry-to-clock map is fixed.

This is the cleanest current statement of the Noether sea-to-metric handoff:
$$
(\delta_{ij},n,\chi_{\text{sea}},\Phi_{\text{eff}},\text{stress})
\mapsto
g_{\mu\nu}^{\text{eff}}
$$

#### 4. Weak-field PPN extraction

The observable weak-field coefficients are read from the constitutive map through
$$
\chi_{\text{sea}}(\mathbf{x})
\equiv
\frac{c_f}{c_{\text{eff}}(\mathbf{x})}
=
1-(1+\gamma_{\text{eff}})\frac{\Phi_N(\mathbf{x})}{c_f^2}
+\mathcal{O}\!\left(\frac{\Phi_N^2}{c_f^4}\right)
$$
and
$$
\beta_{\text{eff}}=\frac{1+2C_2}{2}
$$

Preferred-frame leakage is encoded by
$$
\alpha_1=\Xi_1,\qquad
\alpha_2=\Xi_2,\qquad
\alpha_3=\Xi_1-\Xi_2-\Xi_3
$$

The zero-leakage closure condition is therefore
$$
\Xi_1=\Xi_2=\Xi_3=\Xi_4=0
\quad\Longleftrightarrow\quad
\alpha_1=\alpha_2=\alpha_3=0
$$

#### 5. Mass map

The current assembly-side inertial map is
$$
m_{\text{inertial}}(A)
\approx
\alpha_{\mathrm{m}}\,\frac{\zeta(A)\,E_{\text{internal}}(A)}{c_{\text{eff}}^2}
$$
with $\alpha_{\mathrm{m}}$ fixed once by a reference assembly rather than re-fit separately for each particle.

This relation means that $m_{\text{inertial}}(A)$ is not a primitive parameter. It is an output of shielding, internal energy, and medium response.

Notation note: $\alpha_{\mathrm{m}}$ denotes the mass-map normalization; bare $\alpha$ remains reserved for the measured fine-structure benchmark or for a locally declared weak-mixing branch angle, while $\alpha_i$ denotes PPN preferred-frame coefficients.

In a resolved Noether sea environment, this scalar relation is the homogeneous isotropic limit of the tensor response
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

Here $h^{ab}$ is the inverse Euclidean spatial metric on the local substrate slice. The tensor $\mathcal{M}_{\text{sea}}^{ab}$ is not a particle-specific fit parameter. It is a constitutive closure target for the Noether sea response map.

The first closure gate for this relation is the reference attractor $A_0$. It must report geometry, winding, root-ledger, stability, internal-energy, shielding, medium-response, and mass-facing outputs before any observed particle mass or charged-lepton ratio is used as a benchmark. The mass-facing output is the calibration-free combination
$$
\frac{\zeta(A_0)E_{\text{internal}}(A_0)}{E_0}
$$
together with the unresolved constants and response-map assumptions needed to turn that dimensionless coefficient into an observer-level mass prediction.

The current compact finite-coordinate no-go is a status blocker inside $\mathcal{P}_{A_0}$, not an additional free parameter and not a benchmark input. It requires a predeclared branch-chart revision before Tier 1 continuation can be interpreted as progress toward the mass-facing output above.

#### 6. Planck-alignment map

The current Planck-scale program uses the conjectural relations
$$
\mathcal{A}_{\text{align}}^{\text{cycle}} \stackrel{\text{hyp.}}{\approx} h,
\qquad
I_{\text{align}} \stackrel{\text{hyp.}}{\approx} \hbar,
\qquad
2\pi R_{\text{align}} = \ell_P
$$
and the effective gravity-side alignment estimate
$$
G_{\text{eff}}
\equiv
\frac{R_{\text{align}}^2 c_f^3}{\mathcal{A}_{\text{align}}^{\text{cycle}}}
$$

These are not yet closed derivations. They are the current alignment-side targets connecting geometric closure to $(h,G)$.

#### 7. Weak-mixing branch structure

The weak-mixing geometry note uses
$$
\sin^2\theta_W^{\text{bare}}=\frac14,
\qquad
\theta_W^{\text{bare}}=30^\circ
$$
and the discrete axial-frame branch hypothesis
$$
\alpha_n=n\,\theta_W^{\text{bare}}
$$

This means the present quark-sector use of $\alpha$ is a geometric branch label tied to a candidate bare electroweak increment, not yet a finished derivation of the measured weak angle.

### What Is Not Yet Closed

The current corpus supports the following conservative closure assessment.

#### Closed enough to treat as canonical

- $c_f$ is treated consistently as the substrate propagation speed, even when chapters temporarily write $v=1$.
- $\epsilon$ is treated consistently as the potential polarity-unit magnitude.
- The exact bare two-body kernel admits the canonical nondimensionalization by $R_*=\kappa\epsilon^2/c_f^2$ and $T_*=R_*/c_f$, so branch thresholds and residual equations are parameter-free once a branch chart is declared.
- $\rho_{\text{NS},0}$ is the reference density symbol for the Noether sea.
- $\Phi_{\text{eff}}=c_f^2\ln(\Omega\xi)$ is the canonical clock-channel potential definition for the exponential metric subclass, with $\xi$ retained as a geometry-first Noether swarm shape ratio.

#### Still genuinely open

- whether $\kappa$ is primitive, derived, or partly a normalization artifact,
- whether $\eta$ should disappear entirely from physical statements after the weak limit is taken,
- whether any specific maximum-curvature binary branch exists and is stable under the full signed-root, finite-window two-body dynamics,
- the $A_0$ reference-attractor output packet,
- the actual nested shell swarm radii/frequency ladder,
- the shielding map $\zeta(A)$ across the fermion spectrum,
- the medium-response tensor $\mathcal{M}_{\text{sea}}^{ab}$ that turns shielded internal energy into inertial and gradient response,
- the constitutive functions $(\Omega,\xi)$ and the weak-field coefficient set $(\gamma_{\text{eff}},C_2,\Xi_i)$,
- the Planck-alignment identification of $(R_{\text{align}},\mathcal{A}_{\text{align}}^{\text{cycle}},I_{\text{align}},h,\hbar,G)$,
- and the reduction of weak-mixing branch labels to a predictive electroweak closure.

### Immediate Parameter-Closure Priorities

The shortest path to a better closure score is:

1. Fix the observer-level status of $\kappa$ once, with an explicit statement of what part is physical coupling, what part is absorbed normalization, and how the two-body scale $R_*=\kappa\epsilon^2/c_f^2$ enters the unit map.
2. Derive or numerically extract a reusable constitutive parameterization for $(\Omega,\xi)$, then hold it fixed across redshift, Shapiro delay, lensing, and preferred-frame tests.
3. Resolve the $A_0$ branch-chart revision and accepted branch packet, then replace symbolic shielding language with an operational $\zeta(A)$ extraction protocol and a reusable $\mathcal{M}_{\text{sea}}^{ab}$ response map that can be applied to electron, quark, and neutrino assemblies without redefinition.
4. Decide whether the Planck-alignment map yields $(h,G)$ as true outputs or only as analogy-level scaling relations.
5. Reduce the weak-mixing angle program from discrete branch suggestion to an actual minimization problem for $E_{\text{eff}}(\alpha,\phi_c)$.

### Falsification Gate

Parameter closure fails if any of the following occurs:

- a symbol advertised as fundamental changes meaning across chapters,
- a constitutive coefficient must be re-fit independently for different observable classes,
- a state field such as $n(\mathbf{x},t)$ is implicitly treated as a free global constant to rescue a calculation,
- or observer-level benchmarks such as $e$, $G$, or particle masses are matched only by introducing one-off per-sector normalizations.

In compact form, the closure target is a nonempty shared parameter set
$$
\mathcal{P}_{\text{shared}} \neq \varnothing
$$
where $\mathcal{P}_{\text{shared}}$ is the common substrate-plus-constitutive set that survives particle, spacetime, and quantum-side tests simultaneously.

### Related Chapters

- [constraint-ledger.md](../../../../markdown/aaa/validation/constraint-ledger.md)
- [architrino-si-base-units.md](../../../../markdown/aaa/validation/architrino-si-base-units.md)
- [../dynamics/master-equation.md](../../../../markdown/aaa/dynamics/master-equation.md)
- [../dynamics/energy.md](../../../../markdown/aaa/dynamics/energy.md)
- [../philosophy-history/theory-bridges/angular-momentum-and-spin.md](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md)
- [../philosophy-history/theory-bridges/planck-scale-nested-shell-swarm-alignment.md](../../../../markdown/aaa/philosophy-history/theory-bridges/planck-scale-nested-shell-swarm-alignment.md)
- [../spacetime/emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md)
- [../spacetime/ppn-parameters.md](../../../../markdown/aaa/spacetime/ppn-parameters.md)
- [../assemblies/fermions/weak-mixing-angle.md](../../../../markdown/aaa/assemblies/fermions/weak-mixing-angle.md)

## Reaction Ledger

This ledger records how reaction channels should account for constituent architrinos, Noether swarms, axial layers, energy, momentum, charge, polarity, and path-history provenance. Its purpose is not to replace Standard Model reaction notation. Its purpose is to state what an $\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation must conserve before a reaction map can be treated as more than a provisional diagram.

For radiative channels, use this ledger together with [Radiation](../../../../markdown/aaa/reactions/radiation.md#radiation-event-record-schema). For cosmology-facing radiation and thermalization channels, use it together with [Reaction-Cosmology Provenance Ledger](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md).

### Scope and Status

Reaction provenance is a closure target. A channel may use standard observer notation such as $d \to u + W^-$ or $\gamma+\gamma\to e^+ + e^-$, but the $\mathbb{A}\mathbb{A}\mathbb{A}$ map is not closed until the underlying constituent ledger is explicit.

The conservative status is:

- Architrino count and polarity conservation are required constraints.
- Noether sea participation is allowed, but it must be recorded as a reactant, product reservoir, or medium-excitation channel rather than left implicit.
- W, Z, photon, and pair-production language may be retained at observer level, while the substrate map must identify the transient assembly, exchanged payload, or planar-mode nucleation event being invoked.
- Radiative, photon-capture, and sub-threshold shedding entries must attach the shared radiation event-record schema: source assembly, trigger geometry, $\delta\Theta_a$, $E_{\text{exc}}$, $E_\gamma$, recoil, medium excitation, polarization handoff, causal-wake ledger, and closure status.
- Any weak-channel ledger that depends on chirality, axial-frame orientation, CKM/PMNS mixing, or antineutrino routing remains provisional until the corresponding geometry is derived.
- Any reaction-level spin, helicity, polarization, or vector-channel angular-momentum entry is a downstream consumer of the angular-momentum and spin workstream. It should record what must close, not function as a local proof of that closure.

### Provenance Protocol

Each reaction record should state:

1. **Observer channel:** the standard reaction label, including historical labels such as `beta decay` only when immediately translated into native reaction language.
2. **Active assemblies:** which incoming assemblies actually reconfigure, and which are spectators.
3. **Noether sea participation:** whether local Noether swarms, neutral binaries, axial layers, or medium excitations are consumed, split, reconfigured, or returned.
4. **Constituent inventory:** total $E$ and $P$ counts before and after, separated into swarm and axial-layer contributions where the distinction matters.
5. **Polarity and charge accounting:** how observer-level charge bookkeeping emerges from the $E/P$ routing.
6. **Energy-momentum and angular-momentum accounting:** where kinetic energy, internal binding energy, photon assemblies, recoil, medium excitation, spin/vector ledger terms, and wake-carried angular momentum enter and exit.
7. **Path-history provenance:** which emitted causal wakes, source identities, and delayed interactions are needed to make the reaction deterministic in absolute time.
8. **Radiation event record, when applicable:** for emitted, absorbed, shifted, captured, or failed photon channels, attach the shared event fields from [Radiation](../../../../markdown/aaa/reactions/radiation.md#radiation-event-record-schema), including $E_{\text{exc}}$, $E_\gamma$, recoil, medium excitation, polarization handoff, and causal-wake ledger.
9. **Closure status:** baseline, provisional map, derivation target, failed map, or inherited gate.

### Record Template

| Field | Required content |
| --- | --- |
| Observer channel | Standard reaction notation and native reaction label |
| Active assembly change | Swarm and axial-layer changes for the transformed assembly |
| Noether sea input/output | Neutral swarms, axial material, or medium excitations recruited or returned |
| Conserved inventory | $E/P$ totals and charge/polarity balance |
| Energy-momentum and angular-momentum ledger | Internal energy, recoil, emitted assemblies, spin/vector ledger terms, wake-carried angular momentum, and medium excitation |
| Radiation event record, when applicable | Source assembly, source-depletion row, trigger geometry, $\delta\Theta_a$, $E_{\text{exc}}$, $E_\gamma$, recoil, medium excitation, polarization handoff, causal-wake ledger, photon Gate B event residual when $E_\gamma\ne0$, and closure status |
| Provenance data | Source identity, emission time, causal-root branch, and local Noether sea state |
| Closure status | What is established, what is assumed, and what remains to derive |

### Residual-Routing Event-Ledger Contract

Residual-routing material enters this ledger only as a theorem-target contract. It does not by itself prove that any weak, radiative, pair-production, nuclear, or cosmology-facing reaction channel has closed. The common target is:

$$
\mathcal{R}(\Gamma,\mathcal{H},\rho_{\text{NS}},\chi_{\text{sea}},\dots)
\longrightarrow
\{B_i\}
\longrightarrow
\mathcal{L}_{E\mathbf{p}\mathbf{J}}
$$

Here $\mathcal{R}$ is the replayable residual computed from the local assembly state, path-history ledger, Noether swarm density, Noether sea delay factor, and any named sector variables. The set $\{B_i\}$ is the finite list of admissible output channels, such as retuning, bound excitation, radiation, recoil, medium heating, weak or nuclear reaction, record formation, release channel, or branch transition. The event ledger $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ is the balance object that must close after all selected outputs are named.

For a reaction attempt, the input state should be recorded as:

$$
X
=
\left(
\Gamma,
\mathcal{H},
\rho_{\text{NS}}(\mathbf{x},t),
\chi_{\text{sea}}(\mathbf{x},t),
Z_S
\right)
$$

where $Z_S$ denotes sector-local variables such as nuclear configuration, weak-corridor data, apparatus state, or horizon-interface boundary data when those variables control the route. A routed reaction event is a triple

$$
\mathsf e=(X,I_{\mathsf e},Y_{\mathsf e})
$$

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

Ledger closure means:

$$
\mathcal{L}_{E\mathbf{p}\mathbf{J}}(\mathsf e)=\mathbf{0}
$$

componentwise across the tuple. Nonzero physical recoil, medium heating, remnant excitation, outgoing product energy, or photon output is allowed only as a named term inside $Y_{\mathsf e}$; it is not allowed as an implicit loss.

The stronger event-balance target bundles energy, momentum, and angular momentum instead of checking photon polarization separately from the source ledger. For $\mathcal Q\in\{E,\mathbf p,\mathbf J\}$, define source depletion by

$$
\Delta\mathcal Q_{\mathrm{src}}^{0}
=
\mathcal Q_{\mathrm{src}}^{-}
-
\mathcal Q_{\mathrm{src}}^{+}
$$

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

The Gate B angular-momentum row is the $\mathcal Q=\mathbf J$ projection of this same identity. Let the event window be labeled by superscript $0$, and let $\mathbf J_{\mathrm{src}}^-$ and $\mathbf J_{\mathrm{src}}^+$ be the source angular-momentum ledger before and after the event. Define

$$
\Delta\mathbf J_{\mathrm{src}}^{0}
=
\mathbf J_{\mathrm{src}}^-
-
\mathbf J_{\mathrm{src}}^+
$$

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

For a Gate B-admissible photon row, helicity is the projection

$$
\lambda_{\mathrm{hel}}
=
\frac{\hat{\mathbf e}\cdot\mathbf J_{\gamma}^{\mathrm{sub}}}{\hbar},
\qquad
\lambda_{\mathrm{hel}}\in\{+1,-1\}
$$

and the event balance bounds the projection error:

$$
\left|
\frac{\hat{\mathbf e}\cdot\mathbf J_{\gamma}^{\mathrm{sub}}}{\hbar}
-
\frac{
\hat{\mathbf e}\cdot
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

The denominator is understood in the normalized angular-momentum units of the event ledger. Missing source, recoil, medium, wake, handoff, or remnant rows keep the photon record provisional even when the outgoing photon substrate ledger is algebraically clean.

#### Provenance-Preserving Polarity Inventory

Count conservation is not enough for reaction closure. Since the ontic architrino set $\mathcal{A}$ is fixed, every serious reaction record must route identity-labeled architrinos through the event after expanding the input and output state to include any explicitly recruited or returned Noether sea content.

Let $R_{\mathsf e}^{\mathrm{in}}\subset\mathcal{A}$ and $R_{\mathsf e}^{\mathrm{out}}\subset\mathcal{A}$ denote the participating architrino identities before and after the event. A closed event must supply a bijection
$$
\Pi_{\mathsf e}:R_{\mathsf e}^{\mathrm{in}}\to R_{\mathsf e}^{\mathrm{out}}
$$
such that, for every routed identity $a$,
$$
q_{\Pi_{\mathsf e}(a)}=q_a,\qquad
q_a=\sigma_a\epsilon,\qquad
\sigma_a\in\{-1,+1\}
$$
Equivalently, the polarity inventory vector
$$
\mathbf{N}_{\mathsf e}
=
\left(
\#\{a:q_a=-\epsilon\},
\#\{a:q_a=+\epsilon\}
\right)
$$
must agree before and after the event once all named reservoir terms are included. Photon assemblies, causal wakes, and corridor payloads may carry energy, momentum, angular momentum, phase, and path-history data, but they do not create new elements of $\mathcal{A}$. If a pair-production, weak, charged-pair relock, bremsstrahlung, synchrotron, or scattering record lacks $\Pi_{\mathsf e}$ or an equivalent identity-routing statement, the record remains provisional even when its net observer-level charge balances.

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

1. **Replayable residual:** $\mathcal{R}(X)$ is computed from $\Gamma$, $\mathcal{H}$, $\rho_{\text{NS}}(\mathbf{x},t)$, $\chi_{\text{sea}}(\mathbf{x},t)$, and explicitly named sector variables, with no hidden sector-specific residual term.
2. **Boundary selection:** each selected channel has a stated boundary test $g_i(X,\mathcal{R})\ge0$, and every excluded channel required by the sector either fails its boundary test or is ruled out by a compatibility condition.
3. **Admissible output:** $Y_{\mathsf e}$ names all outgoing assemblies, recoil targets, medium updates, remnant states, and provenance records required by the selected channel set.
4. **Ledger closure:** $\mathcal{L}_{E\mathbf{p}\mathbf{J}}(\mathsf e)=\mathbf{0}$ after adding the sector-required charge, polarity, architrino-inventory, identity-routing, path-history, Noether sea, and remnant rows.
5. **Benchmark compatibility:** the promoted event recovers the sector benchmark without breaking any required weak, quantum, gravity, hadronic, radiation, cosmology, conservation-law, or direct-observation acceptance gate.

This is a promotion criterion, not a completed theorem. Worked sector cases remain open until at least one channel supplies a named residual, a named threshold or separatrix, a channel decision, a complete $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ ledger, a benchmark recovery, and a failure diagnostic in one record. The free-neutron beta reaction, the $t\to b+W^+$ channel, radiation-coupled pair channels, and nuclear reaction examples therefore remain provisional where their sector records still lack closed residual routing, outgoing swarm provenance, angular-momentum balance, rate recovery, or quantitative benchmark closure.

#### Failure Modes

| Failure mode | What blocks promotion |
| --- | --- |
| Residual replay failure | Two records with the same $(\Gamma,\mathcal{H},\rho_{\text{NS}},\chi_{\text{sea}},Z_S)$ produce different $\mathcal{R}$ values or different selected channel sets without an additional recorded state variable. |
| Boundary failure | A resolved event occurs while every required $g_i(X,\mathcal{R})<0$, or two mutually exclusive selected channels demand incompatible output assignments. |
| Ledger residual failure | After all sector-required rows are included, $\Delta_E\ne0$, $\Delta_{\mathbf{p}}\ne\mathbf{0}$, or $\Delta_{\mathbf{J}}\ne\mathbf{0}$. |
| Inventory or provenance failure | $\Delta_{\mathrm{pol}}\ne0$, $\Delta_{\mathrm{arch}}\ne0$, or $\Delta_{\mathrm{path}}\ne0$ after the claimed Noether sea, corridor, source-identity, emission-time, causal-root, and branch-Jacobian records are included. |
| Identity-routing failure | No bijection $\Pi_{\mathsf e}$, or equivalent identity route, maps participating input architrinos to participating output architrinos after named Noether sea reservoir terms are included. |
| Medium or remnant failure | $\Delta_{\mathrm{med}}\ne0$ or $\Delta_{\mathrm{rem}}\ne0$, meaning the route used medium heating, recoil, retained excitation, or remnant deformation as an implicit loss term. |
| Retuning failure | The same benchmark family can be recovered only by changing the residual definition, the channel boundary, or the Noether sea state variables between sector cases. |
| Cross-sector failure | The local route succeeds only by violating another required sector acceptance gate. |

### Weak-Corridor Provenance Gate

Weak reactions now require an explicit corridor-provenance stance. The current corpus supports two live possibilities:

1. **Transaction-payload corridor:** $W^\pm$ carries the charged triad payload and phase relation, while final-state pro/anti Noether swarm material is supplied by the local Noether sea or by explicitly identified incoming assemblies.
2. **Provenance-carrying corridor:** $W^\pm$ carries not only the charged transaction payload but also enough pro/anti Noether swarm provenance to seed some final-state lepton or antilepton swarm content.

The ledger should not choose between these silently. For each serious weak record, add a row or note that states which stance is being used, which Noether swarm material enters and exits, and what would falsify the accounting. This gate is coupled to the weak-coupling-triad exposure problem: the same geometry that permits left-handed charged-current docking must also determine which corridor payload can be transferred and where the outgoing lepton swarms come from.

Minimum weak-channel records should therefore include:

- the active weak-coupling-triad swap,
- the corridor provenance stance,
- all Noether sea or incoming-assembly swarm material used for charged lepton and neutrino outputs,
- the CKM/PMNS overlap weight when a flavor or generation branch is selected,
- and the energy, angular momentum, polarity, and path-history terms needed for deterministic replay.

### Weak Reaction Case: $t \to b + W^+$ Channel

Observer-level notation:

$$
t \to b + W^+,\qquad W^+ \to e^+ + \nu_e
$$

Native status: provisional weak-reaction provenance map.

The active quark change is an axial-layer reconfiguration. In the current assembly catalog, the top-to-bottom transition is represented as a shift from the top axial pattern to the bottom axial pattern:

$$
(1E,5P)_{\text{axial}} \to (4E,2P)_{\text{axial}}
$$

Equivalently, the active quark sector requires a $+3E,-3P$ axial exchange. In observer language this is the $W^+$ channel. In substrate language it is a transient payload and coupling event whose geometry, chirality selection, and energy routing still need closure.

The lepton products cannot be asserted as creation from nothing. Their swarm and axial-layer material must be drawn from a local Noether sea reservoir or from explicitly identified incoming assemblies. The provisional ledger target is:

| Component | Ledger requirement | Status |
| --- | --- | --- |
| Top-to-bottom axial exchange | Route the $+3E,-3P$ change through a weak-channel coupling event | Provisional |
| Positron assembly | Identify the Noether swarm and axial material used to form the charged lepton output | Provisional |
| Electron-neutrino assembly | Identify neutral swarm and axial-layer routing, including chirality/orientation | Provisional |
| Energy-momentum | Account for quark mass difference, lepton energies, recoil, and medium excitation | Derivation target |
| Weak geometry | Derive the left-handed selection rule and allowed coupling operator | Derivation target |

This channel should not be presented as a completed architrino derivation until the inventory table balances $E/P$ counts, swarm orientation, axial-layer routing, and energy-momentum in one consistent record.

### Free Neutron Beta Reaction

Observer-level notation:

$$
n \to p + e^- + \bar{\nu}_e
$$

with the active quark-level comparison

$$
d \to u + W^-,\qquad W^- \to e^- + \bar{\nu}_e
$$

Native label: free-neutron beta reaction.

The spectator structure is straightforward: one $u$ and one $d$ in the neutron pass through the reaction unchanged. The active channel is the second down-like assembly reconfiguring into an up-like assembly.

The axial-layer comparison is:

$$
(4E,2P)_{\text{axial}} \to (1E,5P)_{\text{axial}}
$$

So the active quark assembly sheds three $E$-type axial units and receives three $P$-type axial units. The natural provenance hypothesis is that local neutral Noether sea material supplies the compensating polarity units while the ejected $E$-type material participates in electron axial-layer formation.

#### Exposure-operator record

The controlled beta channel now has a first finite-state exposure operator in [Weak-Mixing CKM](../../../../markdown/aaa/philosophy-history/theory-bridges/weak-mixing-ckm.md). The ledger record for this channel should use that operator as the geometry gate before any rate or provenance claim is made.

This gate inherits the unresolved spinor/helicity proof in [Angular Momentum and Spin](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md). The blocked right-handed branch, antineutrino orientation, and weak-channel angular-momentum balance remain provisional until the weak-coupling-triad exposure geometry and the reaction-level angular-momentum ledger are derived from the same substrate proof.

| Gate field | Beta-reaction record |
| --- | --- |
| Active assembly | One generation-I down-like quark inside the neutron |
| Spectators | One $u$ and one $d$ assembly pass through by identity |
| Exposure domain | $\Sigma_{\mathrm{WCT}}^{(L)}$ on the leading, phase-matched weak-coupling triad |
| Gate condition | Left-handed charged-current docking with $\lvert\Sigma_{\mathrm{WCT}}^{(L)}\rvert=3$ and active inventory $3E$ |
| Blocked condition | Right-handed $d$ channel has no charged-corridor docking in the finite-state model |
| Quark-side action | $A_{\Sigma}=3E\to3P$, with shielded inventory $A_{\mathrm{sh}}=(1E,2P)$ unchanged |
| Corridor payload | $W^-$ carries the opposite transaction $\Delta A_W=3(E-P)$, net charge $-e$ |
| CKM weight | $V_{ud}$, interpreted as the same-tier weak-basis to shielding-eigenstate overlap |
| Provenance stance | Transaction-payload corridor unless a later derivation proves provenance-carrying corridor content is required |

This record keeps the beta reaction from becoming two separate stories. The same exposed triad must explain the left-handed selection rule, supply the $V_{ud}$ overlap domain, and identify what the $W^-$ corridor transfers. The remaining open work is to identify the electron and antineutrino swarm provenance and then attach the energy, angular momentum, recoil, and path-history terms.

The conservative ledger is:

| Component | Required provenance statement | Closure status |
| --- | --- | --- |
| Active $d \to u$ assembly | Route $3E$ out of the active axial layer and route $3P$ into it | Provisional map |
| Electron assembly | Combine the ejected $3E$ contribution with additional local Noether sea material and a suitable swarm | Provisional map |
| Antineutrino assembly | Identify neutral swarm orientation, axial-layer routing, and weak-channel phase relation | Open derivation target |
| Noether sea | Record every neutral swarm, axial layer, or medium excitation consumed or returned | Required |
| Energy and angular momentum | Track mass difference, recoil, electron kinetic energy, antineutrino energy, and medium response | Required |

This map supports a strong but bounded claim: beta reaction charge bookkeeping can be interpreted as local separation and rerouting of neutral Noether sea material plus active quark axial reconfiguration. It does not yet establish a full weak-interaction derivation, because chirality selection, antineutrino routing, and quantitative rate closure still belong to the weak-sector closure program.

### Closure Targets

The reaction ledger needs at least four tables for each serious channel:

1. **Constituent inventory table:** swarm and axial-layer $E/P$ counts for every input, output, Noether sea contribution, and returned medium product.
2. **Energy-momentum table:** internal energy changes, kinetic output, recoil, photon assemblies, neutrino channel, and medium excitation.
3. **Geometry table:** axial frame, swarm orientation, chirality, polarity routing, and allowed coupling/docking geometry.
4. **Path-history table:** causal-root branches, source identities, emission times, and local Noether sea state variables needed for deterministic replay.

Radiative or photon-coupled channels also need the shared radiation event-record table. The polarization handoff in that table remains inherited from Gate B; this ledger records the required transverse and capture/rejection fields but does not derive photon spin locally.

### Validation Links

- Weak-sector geometry and chirality closure remain tied to [Quantum Number Mapping](../../../../markdown/aaa/assemblies/fermions/quantum-number-mapping.md), [Weak Mixing Angle](../../../../markdown/aaa/assemblies/fermions/weak-mixing-angle.md), and [Weak-Mixing CKM](../../../../markdown/aaa/philosophy-history/theory-bridges/weak-mixing-ckm.md).
- Radiative and pair-production provenance should use [Synchrotron Cascades](../../../../markdown/aaa/reactions/synchrotron.md), [Bremsstrahlung](../../../../markdown/aaa/reactions/bremsstrahlung.md), and [Reaction-Cosmology Provenance Ledger](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md).
- Parameter closure belongs in [Parameter Ledger](../../../../markdown/aaa/validation/parameter-ledger.md).

## Reaction-Cosmology Provenance Ledger

This ledger connects local reaction provenance to cosmology-facing radiation, thermalization, and source-history claims. It is the bridge record for channels where synchrotron cascades, bremsstrahlung, pair production, BBN photon loading, and CMB thermalization all depend on the same underlying bookkeeping.

Use it with [Reaction Ledger](../../../../markdown/aaa/validation/reaction-ledger.md), [Radiation](../../../../markdown/aaa/reactions/radiation.md#radiation-event-record-schema), [Synchrotron Cascades](../../../../markdown/aaa/reactions/synchrotron.md), [Bremsstrahlung](../../../../markdown/aaa/reactions/bremsstrahlung.md), [BBN Constraints](../../../../markdown/aaa/cosmology/BBN-constraints.md), and [CMB](../../../../markdown/aaa/cosmology/CMB.md).

### Purpose

Cosmology-facing reaction claims need more than a source story. They need a record of what enters and exits each channel at the substrate level, and how those local channels become observer-level background quantities such as photon bath temperature, $N_{\text{eff}}$, light-element yields, redshift, and TT/TE/EE spectra.

This ledger separates four levels:

- **Ontology:** architrinos, Noether swarms, axial layers, photon assemblies, and Noether sea state variables.
- **Reaction mechanics:** association, dissociation, planar-mode nucleation, pair production, recoil, and medium excitation.
- **Transport and thermalization:** opacity, scattering, cascade depth, diffusion, cooling, path-history redshift, and signed photon-frequency exchange.
- **Effective observables:** emissivity, light-element yield, blackbody spectrum, anisotropy, polarization, and inferred cosmological parameters.

### Leap Opportunity Record

The opportunity tracked here is a possible unification of four previously separate bookkeeping problems: radiative planar-mode nucleation, pair-production provenance, BBN photon loading, and CMB thermalization. The shared claim is not that these channels are already derived from one equation. The disciplined claim is that they may need one common provenance ledger because each asks the same question at a different scale: which assemblies, Noether swarm material, energy-momentum terms, and Noether sea state variables enter and exit the channel?

#### Current Claim Status

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

The minimal useful first path is BBN photon loading: identify a source-zone radiation channel, record its event-level provenance, propagate it through the local thermalization assumptions, and show whether it can support effective $\eta\approx6\times10^{-10}$ during the deuterium bottleneck window.

### Shared Provenance Fields

| Field | What must be recorded | Why it matters |
| --- | --- | --- |
| Architrino inventory | $E/P$ counts, swarm/axial-layer separation, and identity routing for recruited or returned substrate content | Prevents creation-from-nothing wording in pair and weak channels |
| Noether sea state | $\rho_{\text{NS}}(\mathbf{x},t)$, $n(\mathbf{x},t)$, $\chi_{\text{sea}}(\mathbf{x},t)$, anisotropy, and excitation state | Keeps density, delay, and transport variables distinct |
| Radiation event record | Source assembly, trigger geometry, $\delta\Theta_a$, $E_{\text{exc}}$, $E_\gamma$, recoil, medium excitation, polarization handoff, causal-wake ledger, and closure status | Provides the local event schema that can be propagated into source-zone, transport, and observer-level cosmology claims |
| Photon assembly channel | Planar-mode nucleation threshold, emitted energy, direction, polarization basis, and transverse angular-momentum ledger | Links bremsstrahlung, synchrotron, and CMB photon-bath claims |
| Pair channel | Incoming photon assemblies, identity-routed recruited Noether swarm content, final $e^+e^-$ assemblies, and recoil/medium excitation | Keeps pair production as association from local substrate content, not ex nihilo creation |
| Energy-momentum ledger | Internal energy, kinetic energy, recoil, emitted assemblies, and medium excitation | Required for observer-rate and spectrum recovery |
| Thermalization path | scattering depth, coupling time, cooling time, and escape time | Determines when local reactions can feed BBN or CMB background claims |
| Observer handoff | emissivity, opacity, redshift kernel, effective temperature, $N_{\text{eff}}$, and $C_\ell$ inputs | Keeps standard comparison variables useful without treating them as ontology |

### Photon Closure Gates

Photon-channel records should be sorted into three gates before they are used in cosmology-facing arguments.

The chapter-level source for the photon ontology and Gate A theorem scaffold is [Electroweak Bosons](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md#photon-closure-interface). This ledger records what a reaction or cosmology channel must carry forward from that scaffold before it uses photon propagation, polarization, pair production, or thermal radiation as settled input. Gate B is downstream of [Angular Momentum and Spin](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md); the fields below are acceptance records, not an independent derivation of photon spin or polarization statistics. Photon-pair Bell/CHSH claims and CMB polarization-transfer claims must therefore inherit Gate B and the pair-provenance measure rather than being closed by cosmology bookkeeping alone.

| Gate | Claim bucket | What the ledger must track | Closure test |
| --- | --- | --- | --- |
| Gate A: kinematics and optics | Derivation-closure target | $c_f$, $c_\gamma$, $\delta_\gamma\equiv1-c_\gamma/c_f$, planar-pair spacing $d$, phase frequency $\omega$, geometric phase, and medium delay state | Recover $E_\gamma=h\nu$, $p=h/\lambda$, masslessness, no rest proper-time branch, nondispersion, and no unacceptable preferred-frame leakage |
| Gate B: polarization and spin | Derivation-closure target | transverse ledger orientation, analyzer basis, helicity, projection/capture geometry, accepted/rejected channel outcomes, source depletion, recoil, causal-wake, handoff, and event-balance rows | Recover exactly two transverse modes, no longitudinal mode, Malus' law, helicity $\pm1$, single-photon statistics, no-signaling constraints, and $\mathcal R_{\gamma B}^{\mathrm{event}}$ below tolerance |
| Gate C: vertices and transitions | Derivation-closure target | emission, absorption, pair production, recoil, medium excitation, transition rates, and overlap/capture probabilities | Recover QED/Maxwell limits, Breit-Wheeler thresholds and rates, blackbody behavior, Compton-like scattering, photon-photon limits, and the effective coupling scale $\alpha$ |

These gates are not separate ontologies. They are bookkeeping filters that prevent a local photon-source story from being used as cosmology doctrine before the same event record also closes photon transport, polarization, pair conversion, and observer-level comparison variables. The shared radiation event record is the carrier for those gate handoffs; Gate B remains inherited and is not re-derived by this cosmology ledger.

### Channel Map

| Channel | Source document | Provenance target | Current status |
| --- | --- | --- | --- |
| Bremsstrahlung planar-mode nucleation | [Bremsstrahlung](../../../../markdown/aaa/reactions/bremsstrahlung.md) | Record electron assembly energy loss, target recoil, photon assembly output, and medium excitation | Provisional map |
| Synchrotron planar-mode nucleation | [Synchrotron Cascades](../../../../markdown/aaa/reactions/synchrotron.md) | Derive photon output from curved charged-assembly transport in anisotropic Noether sea states | Provisional map |
| Breit-Wheeler pair channel | [Synchrotron Cascades](../../../../markdown/aaa/reactions/synchrotron.md) | Record incoming photon assemblies, recruited Noether swarm content, and final $e^+e^-$ assemblies | Derivation target |
| BBN photon bath | [BBN Constraints](../../../../markdown/aaa/cosmology/BBN-constraints.md) | Show that pair, bremsstrahlung, synchrotron, and related channels maintain effective $\eta\approx6\times10^{-10}$ during the bottleneck window | Closure target |
| CMB thermal spectrum | [CMB](../../../../markdown/aaa/cosmology/CMB.md) | Show that source emission, transport, and thermalization produce a near-blackbody photon bath with allowed anisotropy and damping structure | Closure target |
| Redshift and clock handoff | [Expansion Mechanism](../../../../markdown/aaa/cosmology/expansion-mechanism.md) | Map photon transport through $\rho_{\text{NS}}$, $n$, $\chi_{\text{sea}}$, and clock-rate comparison | Effective summary with open derivation |
| Sunyaev-Zeldovich / Compton-like frequency exchange | [CMB](../../../../markdown/aaa/cosmology/CMB.md#sunyaev-zeldovich-path-history-calibration) and [Radiation](../../../../markdown/aaa/reactions/radiation.md#path-frequency-exchange) | Record incoming photon packet, intervening electron or medium state, outgoing frequency, recoil, medium energy change, and thermalization side effects | Calibration row and closure target |

### Minimum Records by Channel

Each minimum record below specializes the shared event schema in [Radiation](../../../../markdown/aaa/reactions/radiation.md#radiation-event-record-schema). Additional cosmology variables may be added, but the source assembly, source-depletion row, trigger geometry, $\delta\Theta_a$, $E_{\text{exc}}$, $E_\gamma$, recoil, medium excitation, polarization handoff, photon Gate B event residual when $E_\gamma\ne0$, causal-wake ledger, identity routing, and closure status fields remain required.

#### Bremsstrahlung

The minimum event record is:

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

The provenance record must also include the source electron assembly, target assembly, source-depletion row, trigger geometry, $\delta\Theta_a$, local $\rho_{\text{NS}}(\mathbf{x},t)$, $n(\mathbf{x},t)$, $\chi_{\text{sea}}(\mathbf{x},t)$, planar-mode threshold status, emitted photon assembly direction, recoil, medium excitation, causal-wake ledger, identity routing, closure status, and whether the event occurs in a regime where standard free-free emissivity remains the observer-level scaffold. Its polarization handoff inherits photon Gate B rather than deriving photon spin locally, and the record remains provisional until the event residual routes source, recoil, medium, wake, handoff, and remnant rows.

#### Synchrotron Emission

The event record must connect charged-assembly curvature, the effective magnetic-field map, source depletion, trigger geometry, $\delta\Theta_a$, $E_{\text{exc}}$, photon assembly output $E_\gamma$, recoil, medium excitation, causal-wake ledger, identity routing, and photon Gate B event residual. The closure target is to derive the standard $\nu_c \propto \gamma^2 B$ and $P_{\mathrm{syn}}\propto U_B\gamma^2$ scalings from Noether sea anisotropy and wake-strain threshold conditions rather than fitting a separate emission rule. Synchrotron polarization records inherit Gate B, so this ledger carries the transverse handoff without proving photon helicity locally.

#### Pair Production

The event record must avoid creation-from-nothing wording. Incoming photon assemblies trigger association of local substrate content into $e^+e^-$ assemblies when the observer-level threshold is satisfied. The incoming photons supply energy, momentum, polarization handoff, and trigger geometry; they do not supply new architrino identities. The incoming photons should preserve their radiation event records through the pair vertex. The pair-channel record must include:

- incoming photon assembly energies and directions,
- incoming photon polarization handoffs as inherited Gate B records,
- local Noether swarm material recruited or reconfigured, including identity routing for the architrinos assigned to the final charged assemblies,
- final charged assembly inventories,
- recoil and medium-excitation terms,
- causal-wake ledger and closure status,
- and the standard-limit cross-section target.

This is the ledger distinction that ordinary absorption does not need: atomic or material capture closes the photon ledger into an existing target or medium record, while pair production closes the photon ledger and separately recruits identity-routed substrate content into new charged assemblies.

#### BBN Photon Loading

The BBN module needs a source-zone photon ledger. It must identify which radiation channels supply the effective photon-dominated environment and whether they preserve deuterium survival, helium clustering, and $N_{\text{eff}}$ compatibility without per-source retuning.

#### Matter-Asymmetry Provenance

The observed baryon-to-photon ratio is a data-product constraint, not permission to import an external baryogenesis mechanism as doctrine. Any matter-asymmetry story used by the cosmology program must be rewritten as a reaction provenance record over a declared source window $W$. Let $N_B(W)$, $N_{\bar B}(W)$, and $N_\gamma(W)$ be the baryon, antibaryon, and photon counts after the event records have been transported to the BBN comparison surface. Define
$$
\eta_B^{\mathrm{ledger}}(W)
=
\frac{N_B(W)-N_{\bar B}(W)}{N_\gamma(W)}
$$
For leptogenesis-like source routes, the ledger must also carry a neutrino/antineutrino CP-asymmetry comparison term rather than assuming the external mechanism. Source leads for this row are primary neutrino-oscillation and leptogenesis sources: long-baseline $\nu/\bar\nu$ transition measurements, PMNS CP-phase summaries, and baryogenesis/leptogenesis rate calculations. The comparison term is
$$
\Delta_{\nu\bar\nu}^{\mathrm{CP}}(E,L;\alpha,\beta)
=
P_{\nu_\alpha\to\nu_\beta}(E,L)
-
P_{\bar\nu_\alpha\to\bar\nu_\beta}(E,L)
$$
where $E$ is neutrino energy, $L$ is baseline, and $\alpha,\beta$ label flavor channels. The source-window ledger may report $\Delta_{\nu\bar\nu}^{\mathrm{ledger}}(W)$ as the event-record-weighted version of this comparison over $W$, but that reported value is only an input constraint on the matter-asymmetry closure. It is not an established $\mathbb{A}\mathbb{A}\mathbb{A}$ derivation of baryon excess.

The acceptance residual should be reported as
$$
\mathcal{R}_{B/\gamma}(W)
=
\max\left(
\frac{|\eta_B^{\mathrm{ledger}}(W)-\eta_B^{\mathrm{obs}}|}{\varepsilon_\eta},
\frac{|\Delta_{\nu\bar\nu}^{\mathrm{ledger}}(W)-\Delta_{\nu\bar\nu}^{\mathrm{obs}}(W)|}{\varepsilon_{\nu\bar\nu}},
\frac{|\Delta B_{\mathrm{unrec}}(W)|}{\varepsilon_B},
\frac{|\Delta Q_{\mathrm{unrec}}(W)|}{\varepsilon_Q},
\frac{|\Delta E_{\mathrm{unrec}}(W)|}{\varepsilon_E}
\right)
$$
Here $\Delta_{\nu\bar\nu}^{\mathrm{ledger}}$, $\Delta B_{\mathrm{unrec}}$, $\Delta Q_{\mathrm{unrec}}$, and $\Delta E_{\mathrm{unrec}}$ are not new ontology. They are comparison or failure counters for CP-asymmetric neutrino/antineutrino transition rates, baryon-number bookkeeping, electric-charge bookkeeping, and energy balance after all declared reaction, recoil, medium, and escape channels have been included. A leptogenesis-like source model may remain in the comparison ledger only when $\mathcal{R}_{B/\gamma}\le1$ and the same event record also passes the BBN photon-loading and CMB thermalization checks below.

#### CMB Thermalization

The CMB module needs a source-to-transport-to-decoupling ledger. It must track:

- source-channel selection from SMBH-local release, medium relaxation, and conversion/dissociation pathways,
- thermalization depth and blackbody recovery,
- anisotropy and polarization transfer, with the polarization handoff inherited from Gate B,
- redshift and clock-rate handoff,
- and separation between source interpretation and the shared prediction target $C_\ell$.

The thermalization-depth record is a diagnostic field, not a new substrate entity. For each modeled source-to-decoupling path, the ledger should record

$$
\mathcal{D}_{\mathrm{th}}(\nu;t_a,t_b)
=
\int_{t_a}^{t_b}\tau_{\mathrm{th}}^{-1}(\nu,t)\,dt
$$

with $\tau_{\mathrm{th}}^{-1}$ decomposed into the specific event-recorded channels being used: planar-mode capture/release, Compton-like redistribution, pair channels, and non-radiative medium exchange. A CMB blackbody claim requires $\mathcal{D}_{\mathrm{th}}\gg1$ before decoupling, effective photon chemical potential driven to zero, and a post-decoupling transport map that preserves the already-generated spectrum while carrying anisotropy, polarization, damping, and redshift information.

#### Path Frequency Exchange

Post-emission photon frequency changes are not automatically new photon emission events. A photon packet may exchange energy with an intervening electron population, plasma, or Noether sea state and continue as the same transported packet. For each such event or coarse segment, the ledger must record incoming frequency $\nu^-$, outgoing frequency $\nu^+$, the local medium state, recoil or target momentum, and the residual

$$
\mathcal{R}_{\nu\text{-}\mathrm{ex}}
=
\frac{
\left|
h(\nu^+-\nu^-)
+\Delta E_{\mathrm{med}}
+\Delta E_{\mathrm{recoil}}
+\Delta E_{\mathrm{rem}}
\right|
}{\epsilon_E}
$$

The same row must state whether the exchange is thermalizing, spectrally distorting, or coherently transported. A Sunyaev-Zeldovich-type boost is admissible only when the electron or medium record supplies the photon energy increase and when the side effects remain compatible with the CMB spectrum, anisotropy, polarization, and kSZ/tSZ observable rows. A depletion row is admissible only when the lost photon energy is routed into a named medium, recoil, remnant, or thermalization channel.

### Closure Targets

1. **Planar-mode threshold closure:** derive a shared threshold condition for bremsstrahlung and synchrotron photon assembly output.
2. **Pair-production provenance closure:** prove that local Noether sea recruitment can satisfy architrino inventory, energy-momentum, and Breit-Wheeler rate constraints in the same event record.
3. **Photon-bath closure:** show that the relevant radiation channels can maintain BBN-compatible photon loading during the deuterium bottleneck window.
4. **Matter-asymmetry closure:** derive $\eta_B^{\mathrm{ledger}}$ from event-level reaction provenance without hidden baryon inventory, charge, or energy sources; for leptogenesis-like routes, also recover $\Delta_{\nu\bar\nu}^{\mathrm{ledger}}$ from primary-source neutrino CP-asymmetry comparisons without promoting leptogenesis to doctrine.
5. **Detailed-balance closure:** derive the rate symmetry and ensemble weight relation that make emission, absorption, and stimulated terms recover Planck occupation with zero effective photon chemical potential.
6. **Blackbody closure:** show that distributed source channels plus Noether sea transport can generate and preserve the CMB blackbody spectrum within observational limits.
7. **Clock/redshift closure:** use one Noether sea state map for photon propagation, endpoint clock comparison, and redshift-distance inference.

### Failure Modes

The provenance program fails for a channel if a source story cannot survive the same ledger used for reaction, transport, thermalization, and observer handoff.

| Failure mode | What fails | Diagnostic consequence |
| --- | --- | --- |
| Single Noether swarm temperature mistake | A single excited Noether swarm is treated as thermodynamically hot rather than internally excited, closure-mismatched, or metastable | Temperature is being used before an ensemble distribution or entropy-energy relation has been established |
| Inventory gap | Architrino inventory, Noether swarm recruitment, recoil, or returned medium content cannot be balanced without unrecorded substrate creation | Pair and radiation channels cannot be promoted beyond provisional maps |
| Per-observable refit | The same Noether sea state variables must be re-fit independently for photon loading, blackbody recovery, damping, redshift, or growth observables | The cosmology interpretation loses its shared Noether sea state map |
| Standard-limit violation | Pair, Compton-like, bremsstrahlung, synchrotron, or photon propagation channels violate validated limits in regimes where those limits are already measured | The proposed substrate route fails before it can claim new deviations |
| Insufficient thermalization depth | $\mathcal{D}_{\mathrm{th}}$ is too small, or its channel decomposition is not tied to event records | Source photons need not relax to a Planck bath, and a nonzero effective photon chemical potential or spectral distortion remains |
| Matter-asymmetry ledger failure | $\eta_B^{\mathrm{ledger}}$ cannot match the observed baryon-to-photon ratio, or $\Delta_{\nu\bar\nu}^{\mathrm{ledger}}$ is imported without event-record support; the source route then relies on unrecorded baryon inventory, charge imbalance, or energy imbalance | A baryogenesis-like or leptogenesis-like source story cannot be promoted into cosmology provenance |
| BBN photon-loading failure | Source-zone photon production cannot preserve deuterium survival, helium clustering, lithium constraints, and $N_{\text{eff}}$ compatibility | The BBN local-reactor mapping cannot replace the standard photon-to-baryon environment |
| CMB handoff failure | Blackbody precision, damping behavior, anisotropy, polarization, or TT/TE/EE coherence cannot be carried through the same transport and redshift map | CMB thermalization cannot be treated as a successful source-to-observer provenance path |
| Frequency-exchange ledger failure | A path segment changes photon frequency without a closed medium, recoil, remnant, or side-effect row | Redshift, blueshift, SZ, or distance-ladder claims are being used without photon provenance |

## Constraint Ledger

Notes collected here document the falsification criteria, ordering priorities, and supporting mechanisms for the architrino framework. Keep this page focused on observable constraints so each model version can be checked against experimental scrutiny.

### Experimental Constraint Ledger and Falsification Criteria

This ledger crystallizes the measurable thresholds and theoretical guardrails that could falsify the architrino proposal. Each numbered entry combines the empirical bound, the proposed mechanism, and the explicit failure condition so that we can track how discrete experimental results shape or reject the model.

#### Lorentz Invariance & Preferred Frame Effects (Tier 1)

The purpose of this section is to define the combination of experimental isotropy and observational invariance that must hold if a putative absolute frame is to remain hidden. We identify the observables, derive the emergent timing/ruler behavior implied by the Noether sea, and explicitly state the tolerance beyond which the preferred frame would become perceivable.

* **Constraint** – isotropy from Michelson–Morley and resonator experiments constrains $|\Delta c/c| < 10^{-17}$ while atomic clock sidereal drift stays below $10^{-16}$, keeping Lorentz-invariance leakage under the $10^{-17}$ falsification threshold.
* **Consolidated Requirement** – prove preferred-frame hiding: architrino assemblies must acquire Lorentz-compatible deformation and clock behavior in the Euclidean-void rest frame so no local observer can detect the Noether sea's rest frame.
* **Observable** – local Lorentz invariance is preserved.
* **Mechanism** – assembly-based clocks/rulers must emerge with proper time $\tau$ rather than absolute time $t$.
* **Shared Residual** – the structural-integrity common-limit closure in [Lorentz Kinematics](../../../../markdown/aaa/spacetime/lorentz-kinematics.md#theorem-g-structural-integrity-common-limit-closure) couples this row to photon and gravitational-wave speed gates: the same branch record must make $c_{\mathrm{mat}}^{\mathrm{lim}}$, $c_{\text{eff}}$, $c_\gamma$, and $c_0$ agree within $O(\epsilon_{\text{LV}})$ while also producing clock/ruler deformation and two-way photon synchronization.
* **Failure Condition** – any detectable preferred-frame orientation above $10^{-17}$ or residual $\delta$ in $L_{moving} = L_{rest} (\gamma^{-1} + \delta)$ that exceeds $10^{-17}$ invalidates the theory.

#### Photon Time-of-Flight Dispersion Gate

High-energy transient events at cosmological distance test whether photon-channel propagation accumulates a frequency-dependent delay. The observable is a time-of-arrival residual after source-intrinsic emission lag has been modeled; it is not direct evidence for or against microscopic spatial grains by itself.

For two photon phase frequencies $\omega_a$ and $\omega_b$ emitted by the same source at redshift $z$, a candidate photon-channel delay is
$$
\Delta t_{\gamma}^{\mathrm{model}}(\omega_a,\omega_b;z)
=
\int_{\Gamma_z}
\frac{
\chi_\gamma(\omega_a,\mathbf{x},t)
-
\chi_\gamma(\omega_b,\mathbf{x},t)
}{c_0}\,d\ell
$$
Here $\Gamma_z$ is the observer-level path used by the comparison, and $\chi_\gamma$ is the photon-channel delay factor from the same branch record used for photon synchronization. A useful residual is
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
where $\mathcal{E}$ is the declared transient catalog, $\Delta t_{\mathrm{src}}$ is the modeled source lag, and $\sigma_{\Delta t}$ is the adopted timing uncertainty.

* **Constraint** – the same photon branch that recovers local Lorentz synchronization must keep $\mathcal{R}_{\gamma\mathrm{disp}}$ below the declared catalog threshold without per-source retuning.
* **Observable** – measured arrival-time differences across photon energy or frequency bands, source-lag model, redshift, instrument timing uncertainty, and event-selection rule.
* **Validation Target** – Gate A in [Electroweak Bosons](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md) must derive a nondispersive weak homogeneous photon branch rather than assume it after the fact.
* **Shared Residual** – this is the photon-channel component of the same common-limit residual defined in [Lorentz Kinematics](../../../../markdown/aaa/spacetime/lorentz-kinematics.md#theorem-g-structural-integrity-common-limit-closure); the $\chi_\gamma$ record cannot be repaired independently of the clock/ruler $c_{\text{eff}}$ record.
* **Failure Condition** – a photon closure branch fails if it predicts an accumulated frequency-dependent delay in the validated band, hides that delay by changing the source-lag model event by event, or uses a different $c_\gamma$ / $\chi_\gamma$ record from the one used in [Lorentz Kinematics](../../../../markdown/aaa/spacetime/lorentz-kinematics.md).

#### The Absolute-Frame Drift Check (Lorentz Contraction Enforcement)

This entry frames the requirement that the underlying Noether sea affords a dynamical contraction mechanism to assemblies moving through the Euclidean void; without such a mechanism, assemblies would reveal their motion relative to the sea and the preferred frame would manifest.

* **Constraint** – the Noether sea must supply a dynamical closure that yields Lorentz-compatible contraction of assemblies; otherwise the model is equivalent to an untested preferred frame.
* **Failure Condition** – without contraction enforced by the Sea, preferred frame effects become measurable and falsify the theory.

#### Noether Sea Drag

Here we catalogue how coupling between macroscopic bodies and the Noether sea can influence orbital dynamics. The constraint ensures any additional dissipation or effective drag remains below the levels already constrained by gravitational-wave-based orbital decay measurements in general relativity.

* **Constraint** – interactions with the Noether sea must not induce orbital decay that outpaces GR’s gravitational-wave emission bounds.
* **Validation Target** – match observed orbital stability and perihelion advance within GR limits while modeling any extra coupling as a conserving medium-dressed response rather than ordinary dissipative drag.

#### Condensed-Matter Response Gate

Ordinary materials supply a broad recovery surface for the same assembly, electron-envelope, and Noether sea response variables. The gate is not that $\mathbb{A}\mathbb{A}\mathbb{A}$ adopts band theory as ontology. The gate is that periodic material branches recover the benchmark mathematics of bands, lattice scattering, phonons, and Hall response without per-probe retuning.

* **Constraint** – one material-branch record $\theta_{\mathrm{mat}}=(\mathcal B_e,\mathcal B_{\mathrm{lat}},\rho_{\text{NS}},n,\chi_{\text{sea}},\mathcal M_{\text{sea}}^{ab})$ must recover Bloch-form bands $E_\alpha(\mathbf k)$, effective mass tensor $(m_{\alpha,*}^{-1})^{ij}=\hbar^{-2}\partial_i\partial_jE_\alpha$, Fermi-surface or band-gap classification, reciprocal-lattice scattering $\mathbf q\in\Lambda^*$ with structure factor $S(\mathbf q)$, and phonon dispersion from one declared lattice branch.
* **Hall / Topology Target** – for two-dimensional gapped branches with an effective U(1) connection, the same record must recover $\sigma_{xy}=(e^2/2\pi\hbar)C$ with integer Chern number $C$ and $\rho_{xx}$ below tolerance on the plateau. Fractional Hall, anyon, and Chern-Simons descriptions are recovery/comparison structures unless a local branch derivation consumes them directly.
* **No-Drag Consistency** – the ideal periodic branch must not require ordinary dissipative drag; finite $\tau^{-1}$ must be routed to disorder, vacancies, phonons, boundary exchange, heating, radiation-like shedding, or branch transition.
* **Failure Condition** – the condensed-matter branch fails if it fits band curvature, phonon stiffness, scattering peaks, Hall conductance, and transport relaxation with independent material records, if a filled band carries unlogged current or heat, if a topological plateau changes without a gap closure or branch change, or if ordinary Noether sea drag is used to explain resistance below the transport threshold in [Condensed Matter](../../../../markdown/aaa/nuclear-atomic/condensed-matter.md).

#### GW Speed

The propagation speed of gravitational-wave disturbances in the Noether sea must align with the measured gravitational-wave velocity, so this section records the tolerance within which new physics can coexist with GW timing data without contradicting the LIGO/Virgo baseline. The relevant benchmark is now multi-messenger rather than merely assumed: GW170817/GRB 170817A constrained the gravity-channel and photon-channel speed difference at roughly the $10^{-15}$ level.

* **Constraint** – gravitational waves, modeled as collective Noether sea disturbances, must satisfy the multi-messenger speed gate, with GW170817/GRB 170817A giving the reference scale
  $$
  -3\times10^{-15}
  \lesssim
  \frac{v_{\mathrm{GW}}-c_0}{c_0}
  \lesssim
  7\times10^{-16}
  $$
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
  is the order-of-magnitude ledger tolerance. Any tighter ledger tolerance adopted for a specific validation band should be stated explicitly rather than inferred from ontology.
* **Shared-Channel Requirement** – the effective gravitational-wave channel and photon channel must be derived from one Noether sea state record in the weak-field branch, as required by [Lorentz Kinematics](../../../../markdown/aaa/spacetime/lorentz-kinematics.md#theorem-g-structural-integrity-common-limit-closure). A medium-based gravity model fails this row if it lets gravitational waves and photons acquire independently tunable dressed speeds in the same region.
* **Mode and Dispersion Gate** – finite-range or medium-compliance corrections must keep accumulated dispersion, false-alarm residuals, calibration residuals, and any scalar, vector, or longitudinal gravitational-wave detector response below the residual bounds for the validated band.
* **Low-Frequency Extension** – if a cosmological-scale weakening channel claims finite-range behavior, it must also report the low-frequency residual $\mathcal{R}_{\mathrm{GW,low}}(\theta)$ from [Gravitational Waves](../../../../markdown/aaa/spacetime/gravitational-waves.md#linear-wave-equation) for the declared pulsar-timing or space-interferometer band. A band not yet measured may be listed as a forecast, but it cannot be used to override the existing high-frequency speed, polarization, and dispersion gates.
* **Failure Condition** – a cosmological-scale weakening channel fails if it predicts measurable gravitational-wave dispersion, an unsuppressed non-TT mode, or a speed offset in the same regime where the weak-field metric map is supposed to recover GR.

#### Euclidean vs. Metric Pathing (The Refraction Mapping)

This constraint explains how apparent metric deviations (Shapiro delay and light bending) emerge from a Euclidean signalling framework endowed with a varying Noether sea delay factor $\chi_{\text{sea}}$, which allows us to compare the emergent delay with the standard GR potential.

* **Constraint** – Shapiro delay and light bending must match GR to within PPN bounds ($|\gamma - 1| < 10^{-5}$).
* **Architrino Interpretation** – signals propagate through Euclidean space, but observer-level paths are effective travel-time extremals in the Noether sea delay map. The perceived delay or curvature arises from $\chi_{\text{sea}}$ responding to spatial variations in $\rho_{\text{NS}}$ and related Noether sea state variables.
* **Validation Target** – map $g_{00} \approx 1 + 2\Phi/c^2$ onto the refractive slowing experienced by Noether sea signals moving through the Euclidean void with Noether sea delay.

#### Gravitational Time Dilation

We require that the proposed mechanical slowing induced by Noether swarm density aligns quantitatively with geodetic and redshift observations such as GPS offsets and the Pound–Rebka experiment, offering a concrete mapping between the new microphysics and the classical time-dilation effects.

* **Constraint** – reproduce GPS clock offsets (38 μs/day), the Pound–Rebka redshift, and height-resolved optical-clock redshift with $\Delta\nu/\nu\approx gL/c_0^2$; this includes the approximate scales $1.1\times10^{-19}$ across $1\,\mathrm{mm}$ and $3.6\times10^{-17}$ across $33\,\mathrm{cm}$ near Earth's surface.
* **Mechanism** – mechanical slowing of nested shell swarm orbital frequencies couples to the local Noether swarm density and Noether sea delay factor, generating the observed dilation without changing the constitutive map used for other weak-field observables.

#### Massive-Superposition Gravitational Distinguishability

Massive-interference experiments and precision gravity readouts jointly test whether the effective-metric channel carries enough branch information to become a which-path record. The observable is not whether spacetime is declared classical or quantum. The observable is whether two mass-density histories produce a distinguishable gravitational response before the apparatus has formed a durable record.

* **Constraint** – for two branch-level mass-density histories $\rho_1$ and $\rho_2$, the gravitational distinguishability diagnostic
  $$
  \mathcal{D}_{\mathrm{grav}}(T;\theta)
  =
  \int_0^T\!\!\int_0^T
  \Delta h_A(t)\,
  N^{-1}_{AB}(t,t')\,
  \Delta h_B(t')\,dt\,dt'
  $$
  with $\Delta h_A(t)=h_A(t;\rho_1,\theta)-h_A(t;\rho_2,\theta)$, must remain below the declared which-path threshold for any interference-preserving run unless a record-forming separatrix crossing and persistence window are also derived.
* **Observable** – the data products are massive-superposition coherence time, branch separation and mass-displacement history, precision-gravity response, detector noise covariance, any two-probe entanglement witness, non-gravitational coupling residuals, and the absence or presence of a durable which-path record.
* **Validation Target** – combine long-coherence interferometry with Cavendish-like, atom-interferometric, or gravitational-wave-instrument precision bounds to constrain $\mathcal{D}_{\mathrm{grav}}$ using one effective-metric constitutive record $\theta$; the concrete scaffold is [Massive-Superposition Gravity Validation Packet](../../../../markdown/aaa/validation/massive-superposition-gravity.md).
* **Mediated-Entanglement Target** – for gravitationally induced entanglement comparisons, the same $\theta$ must generate the branch interaction phase $\Delta\Phi_{\mathrm{ent}}$ needed for the observed witness $C_{\mathrm{obs}}$ while keeping $\mathcal{R}_{\mathrm{nongrav}}$ below the isolation threshold and $\mathcal{D}_{\mathrm{grav}}$ below the which-path threshold.
* **Failure Condition** – the measurement and spacetime branches fail jointly if the same parameter record predicts $\mathcal{D}_{\mathrm{grav}}\gg1$ for an interference-preserving experiment while no apparatus/environment record satisfies the record-autonomy condition in [Measurement Ontology](../../../../markdown/aaa/quantum/measurement-ontology.md).

#### CMB Scalar/Tensor Gate

The cosmology branch must recover the CMB scalar and tensor observables as data products before any source interpretation is promoted.

* **Constraint** – one Noether sea and assembly record must recover TT/TE/EE spectra, damping, CMB-lensing reconstruction, blackbody preservation, scalar amplitude $A_s$, scalar tilt $n_s$, acoustic phase coherence, vector-mode suppression, and the tensor bound $r\le r_{\max}$ without changing Noether sea state variables between the CMB, BBN, expansion, and growth modules.
* **Observable** – the CMB comparison residual $\mathcal{R}_{\mathrm{CMB}}(\theta)$ defined in [CMB](../../../../markdown/aaa/cosmology/CMB.md) must remain within the declared tolerance for the data release being used, and the added $\mathcal{R}_{\mathrm{phase}}(\theta)$, $\mathcal{R}_{V}(\theta)$, and $\mathcal{R}_{\mathrm{lens}}(\theta)$ gates must not require a separate medium history.
* **Smoothness Check** – the same record must also bound the effective smoothness residual $\mathcal{R}_{\mathrm{smooth}}(\theta)$, so early-universe smoothness is tested as low observer-level gravitational free-mode content rather than assumed from an imported origin story.
* **Failure Condition** – if the framework can fit the source story only by retuning scalar power, acoustic phase, vector-mode content, CMB-lensing reconstruction, tensor contribution, blackbody recovery, or TT/TE/EE transfer independently, the cosmology closure fails at the observational layer.

#### Compact Dark-Sector Local-Detection Gate

Compact neutral-assembly or primordial-defect branches must face local gravitational searches as data products, not only cosmological abundance fits. For a branch record $\theta_A$ with representative mass $M_A$, local fraction $f_A$, and relative-speed distribution $p(v_{\mathrm{rel}})$, the first rate estimate is
$$
\Gamma_{\mathrm{flyby}}(b_{\max},M_A;\theta_A)
=
\frac{f_A\rho_{\mathrm{DM}}}{M_A}\,
\pi b_{\max}^2\,
\langle v_{\mathrm{rel}}\rangle_{\theta_A}
$$
The corresponding impulse scale on a tracked body is
$$
\Delta v_{\mathrm{test}}
\simeq
\frac{2GM_A}{b\,v_{\mathrm{rel}}}
$$
with the accepted comparison using the full ephemeris covariance rather than this estimate alone.

* **Constraint** – any claimed local compact dark-sector signal must produce an ephemeris residual $\Delta\mathbf{x}_{\mathrm{ephem}}^\theta(t)$ above the declared ranging and model-error floor while remaining inconsistent with ordinary catalogued bodies under the same orbit-reconstruction covariance.
* **Co-Signature Check** – if the branch predicts high-energy particles, radiation, or gravitational-wave sidebands, those observables must use the same trajectory, mass, and abundance record as the ephemeris perturbation.
* **Failure Condition** – a compact dark-sector branch fails locally if it explains cosmological abundance with one mass or population record but requires a different record for ephemerides, visible-object exclusions, or high-energy null results.

#### Closure Program Tracking Hooks

Use this ledger as the acceptance layer for the six integrated closure programs:

| Program | Primary chapters | Ledger gate |
| --- | --- | --- |
| CKM holonomy closure | [theory-bridges/weak-mixing-ckm.md](../../../../markdown/aaa/philosophy-history/theory-bridges/weak-mixing-ckm.md) | CKM hierarchy and CP-phase consistency with propagated uncertainty |
| PMNS neutral swarm closure | [assemblies/fermions/neutrinos.md](../../../../markdown/aaa/assemblies/fermions/neutrinos.md) | Oscillation pattern consistency across $L/E$ and medium regimes |
| Emergent metric / PPN closure | [spacetime/emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md), [spacetime/ppn-parameters.md](../../../../markdown/aaa/spacetime/ppn-parameters.md), [spacetime/proper-time-and-time-dilation.md](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md) | Lorentz leakage, PPN, redshift, Shapiro, GW-speed bounds |
| Non-relativistic Schrödinger + Born closure | [theory-bridges/pilot-wave-character.md](../../../../markdown/aaa/philosophy-history/theory-bridges/pilot-wave-character.md), [quantum/wavefunction-ontology.md](../../../../markdown/aaa/quantum/wavefunction-ontology.md), [theory-bridges/superposition-mechanism.md](../../../../markdown/aaa/philosophy-history/theory-bridges/superposition-mechanism.md) | Effective fixed-particle-number wave equation + statistical outcome consistency |
| Photon Gate A/B/C closure | [assemblies/bosons/electroweak-bosons.md](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md), [theory-bridges/angular-momentum-and-spin.md](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md), [validation/reaction-cosmology-provenance-ledger.md](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md), [spacetime/lorentz-kinematics.md](../../../../markdown/aaa/spacetime/lorentz-kinematics.md) | Gate A massless nondispersive photon kinematics, Gate B polarization and squared-amplitude capture as a downstream spin/helicity ledger, and Gate C Maxwell/QED vertices, pair/radiation provenance, and $\alpha$ recovery |
| Topological spin/confinement closure | [dynamics/causal-action-functional.md](../../../../markdown/aaa/dynamics/causal-action-functional.md), [assemblies/fermions/color-charge-su3.md](../../../../markdown/aaa/assemblies/fermions/color-charge-su3.md) | 4$\pi$ spin structure and open-vs-closed color-energy scaling |

Cross-program acceptance principle:
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
If the intersection is empty after uncertainty propagation, the integrated model version is rejected.

## Failure Criteria

This chapter states the hard-stop conditions for $\mathbb{A}\mathbb{A}\mathbb{A}$. Its purpose is to distinguish ordinary incompleteness from genuine failure modes, especially where a local success in one sector cannot survive the shared closure intersection.

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

be the sector set. A candidate promoted closure is a record $\theta\in\mathfrak{X}$ whose shared coordinates include

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

where $A$ is the assembly or branch family, $\Gamma$ is the assembly microstate, $\mathcal{H}$ is the path-history and causal-wake ledger, $\mathcal{R}$ is the active residual family, $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ is the event ledger, $\zeta$ is shielding or exposure data, $\mathcal{M}_{\mathrm{sea}}^{ab}$ is the Noether sea response object, and $\{B_i\}$ is the basin or channel partition. Sector-local coordinates $Z_S(\theta)$ record the benchmark variables, theorem assumptions, provenance rows, and tolerances used by sector $S$.

For each sector $S$, fix a gate predicate $P_S:\mathfrak{X}\to\{0,1\}$, a benchmark map $\mathcal{B}_S:\mathfrak{X}\to\mathfrak{B}_S$, a validated benchmark region $\mathfrak{B}^{\mathrm{obs}}_S\subseteq\mathfrak{B}_S$, a benchmark metric $d_S$, a tolerance $\epsilon_S$, and a no-go pass predicate $\mathcal{G}_S:\mathfrak{X}\to\{0,1\}$. Define the distance from a benchmark point to the validated region by

$$
\operatorname{dist}_{d_S}(b,\mathfrak{B}^{\mathrm{obs}}_S)
=
\inf_{b'\in\mathfrak{B}^{\mathrm{obs}}_S}d_S(b,b')
$$

The sector acceptance set is the mathematical subset

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

The shared acceptance intersection is

$$
\mathcal{C}_{\mathbb{A}\mathbb{A}\mathbb{A}}
=
\bigcap_{S\in\mathfrak{S}}\mathcal{C}_S
$$

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

This rule does not make the validation suite less severe. It prevents a residual-bearing closure record from being rejected by a criticism that has not identified which accepted observable, mathematical consistency condition, or no-go assumption has actually changed.

#### Null-Result Residual for Added Channels

When a closure attempt predicts channels outside the validated Standard Model and GR-facing benchmark set, those channels must be tested against null results before the record can be promoted. Let $\mathfrak{E}_{\theta}^{\mathrm{new}}$ be the set of predicted additional channels for a candidate record $\theta$: unstable baryon channels, new charged or neutral partners, extra gauge or transport modes, preferred-frame leakage channels, or other non-baseline outputs that would have produced an observed rate, cross-section, lifetime shift, branching ratio, dispersion, or anisotropy. For each channel $e$, let $O_e(\theta)\ge0$ be the predicted observable and $O_e^{\max}$ the accepted upper bound in the comparison regime. Define

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

A promoted record must satisfy

$$
\mathcal{R}_{\mathrm{null}}(\theta)=0
$$

using the same shared coordinates $\theta_{\mathrm{join}}$ that recover the positive benchmarks. A channel may avoid this gate only by being outside the validated comparison domain, by being an exactly unobservable gauge redundancy, or by being proven absent in the accepted branch family. It is not enough to add a large symmetry, partner family, hidden transport dimension, or unstable reaction corridor and then tune it below every bound with sector-specific parameters.

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
where $\pi_{\mathrm{shared}}$ keeps the common Noether sea, assembly, weak-exposure, metric, and provenance coordinates consumed by both the positive benchmark and the null channel. The operational audit residual is
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
The original promotion condition is recovered by requiring $\mathcal{R}_{\mathrm{null}}^{\mathrm{op}}(\theta)=0$. This form rejects a second failure mode: a channel can be numerically hidden but still fail because its suppression uses a different shared record from the one that fit the observed sector.

| Added-channel family | Example observable $O_e(\theta)$ | Null data product | Same-record requirement |
| --- | --- | --- | --- |
| Mirror matter or added charged partners | production cross-section, branching ratio, stable relic abundance | collider exclusions, precision electroweak fits, cosmological abundance bounds | the axial-layer and gauge-representation record that yields observed fermions must also exclude the partner branch |
| Superpartners or large symmetry partners | missing-energy rate, partner mass threshold, coupling strength | collider missing-energy and resonance searches | partner absence must follow from the accepted branch family, not from an independent mass threshold |
| Proton-instability or baryon-violating corridors | $\Gamma_p(\theta)$ or forbidden nuclear transition rate | proton-lifetime and rare-event limits | the same color/topology and reaction-provenance ledger used for hadrons must suppress the channel |
| Extra gauge bosons or gauge modes | resonance rate, precision-contact term, long-range force strength | collider, fifth-force, and precision-scattering bounds | the effective gauge residual must recover $U(1)_Y\times SU(2)_L\times SU(3)_c$ without an unsuppressed added mode |
| Hidden transport or extra propagation modes | dispersion, birefringence, scalar/vector gravitational-wave response | photon, gravitational-wave, and timing residuals | the same Noether sea response map must set clock, signal, and metric channels |
| Sterile or neutral partner branches | mixing angle, $\Delta N_{\mathrm{eff}}$, relic abundance, free-streaming scale | oscillation, BBN, CMB, and structure-formation bounds | the neutral-sector Hamiltonian and cosmology record must be shared |
| Preferred-frame leakage channels | two-way anisotropy, clock drift, PPN preferred-frame coefficients | resonator, atomic-clock, solar-system, and gravitational-wave timing bounds | the Lorentz-closure map must suppress leakage without retuning clock, ruler, or signal coefficients |

For the hidden-transport family, free-space birefringence is a direct null-result specialization rather than a new ontology. If $v_+(\omega,\hat{\mathbf{k}};\theta)$ and $v_-(\omega,\hat{\mathbf{k}};\theta)$ are the two physical photon-polarization propagation speeds extracted from the same record $\theta$, define
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
The photon/effective-metric record can be promoted only when $\mathcal{R}_{\mathrm{biref}}(\theta)\le\epsilon_{\mathrm{biref}}$ in the declared weak homogeneous regime and when the same $\theta$ also supplies the clock, ruler, signal, and metric coefficients used for the positive GR-facing benchmarks. If birefringence is numerically hidden by switching to a different channel record than the one used for lensing, Shapiro delay, spectra, or photon synchronization, $\mathcal{R}_{\mathrm{null}}^{\mathrm{op}}$ fails even if the split is individually small.

##### Null-Result Ownership Matrix

The following matrix assigns each recurring null-result family to the corpus homes that should carry the positive derivation and the absence proof. The owner document does not need to reproduce every experimental limit; it must state the observable $O_e(\theta)$, name the comparison bound $O_e^{\max}$, and route the channel through $\mathcal{R}_{\mathrm{null}}^{\mathrm{op}}$ when the channel is predicted.

| Channel family | Observable vector | Bound symbol | Primary owner | Supporting gates |
| --- | --- | --- | --- | --- |
| Mirror matter / added charged fermions | $(\sigma_{\mathrm{prod}},B_{\mathrm{vis}},\Omega_{\mathrm{relic}})$ | $O_{\mathrm{mirror}}^{\max}$ | [Quantum Number Mapping](../../../../markdown/aaa/assemblies/fermions/quantum-number-mapping.md) | [Gauge Symmetries](../../../../markdown/aaa/assemblies/gauge-symmetries.md), [Known Tensions](../../../../markdown/aaa/validation/known-tensions.md) |
| Superpartners / symmetry partners | $(\sigma_{\mathrm{miss}},m_{\mathrm{partner}},B_{\mathrm{cascade}})$ | $O_{\mathrm{partner}}^{\max}$ | [Gauge Symmetries](../../../../markdown/aaa/assemblies/gauge-symmetries.md) | [Theory Differentials](../../../../markdown/aaa/philosophy-history/theory-differentials.md), [No-Go Theorems](../../../../markdown/aaa/validation/no-go-theorems.md) |
| Proton-instability corridors | $(\Gamma_p,B_{p\to e^+\pi^0},B_{p\to\bar\nu K^+})$ | $\Gamma_p^{\max}$ | [Color Charge SU(3)](../../../../markdown/aaa/assemblies/fermions/color-charge-su3.md) | [Reaction Ledger](../../../../markdown/aaa/validation/reaction-ledger.md), [Known Tensions](../../../../markdown/aaa/validation/known-tensions.md) |
| Extra gauge bosons / gauge modes | $(\sigma_{Z'},\sigma_{W'},g_{\mathrm{new}},\Delta_{\mathrm{contact}})$ | $O_{\mathrm{gauge+}}^{\max}$ | [Gauge Symmetries](../../../../markdown/aaa/assemblies/gauge-symmetries.md) | [Gauge Structure Emergence](../../../../markdown/aaa/assemblies/gauge-structure-emergence.md), [Electroweak Bosons](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md) |
| Hidden transport / extra propagation modes | $(\Delta v/c,\omega_{\mathrm{disp}},h_{\mathrm{scalar}},h_{\mathrm{vector}})$ | $O_{\mathrm{transport}}^{\max}$ | [Constraint Ledger](../../../../markdown/aaa/validation/constraint-ledger.md) | [Observer Framework](../../../../markdown/aaa/spacetime/observer-framework.md), [PPN Parameters](../../../../markdown/aaa/spacetime/ppn-parameters.md) |
| Sterile / neutral partner branches | $(\theta_{\mathrm{mix}},\Delta N_{\mathrm{eff}},\Omega_{\nu_R},\lambda_{\mathrm{fs}})$ | $O_{\mathrm{sterile}}^{\max}$ | [Neutrinos](../../../../markdown/aaa/assemblies/fermions/neutrinos.md) | [Dark Matter](../../../../markdown/aaa/cosmology/dark-matter.md), [CMB](../../../../markdown/aaa/cosmology/CMB.md) |
| Preferred-frame leakage | $(\Delta_{\mathrm{tw}},\delta\nu/\nu,\alpha_1,\alpha_2,\alpha_3)$ | $O_{\mathrm{LV}}^{\max}$ | [Lorentz Kinematics](../../../../markdown/aaa/spacetime/lorentz-kinematics.md) | [PPN Parameters](../../../../markdown/aaa/spacetime/ppn-parameters.md), [Constraint Ledger](../../../../markdown/aaa/validation/constraint-ledger.md) |

For proton-instability corridors, convert every current partial-mean-life lower limit $\tau_c^{\min}$ into a channel-rate ceiling
$$
\Gamma_{p,c}^{\max}=\frac{1}{\tau_c^{\min}}
$$
The current benchmark scale is already severe: PDG 2024 summaries give $\tau/B(p\to e^+\pi^0)>2.4\times10^{34}\,\mathrm{yr}$ and proton neutrino/kaon modes near $5.9\times10^{33}\,\mathrm{yr}$ at 90% confidence. These numbers are comparison anchors, not permanent constants; a closure packet should cite the current experimental source when the hadronic gate is evaluated.

### Sector Acceptance Sets

| Sector | Predicate $P_S(\theta)=1$ | Benchmark condition | Falsifier |
| --- | --- | --- | --- |
| $\mathcal{C}_{\mathrm{weak}}$ | One weak-coupling-triad exposure record $\mathcal{E}_{\mathrm{weak}}(A)=Q_{\mathrm{weak}}[\Pi_{\mathrm{weak}}\mathcal{L}_A]$ supplies `V-A`, CKM/PMNS overlap, and weak-corridor provenance without redefining $\Pi_{\mathrm{weak}}$, $Q_{\mathrm{weak}}$, or the exposed domain. | $\mathcal{B}_{\mathrm{weak}}(\theta)$ lies in the observed charged-current handedness, mixing, and provenance region within $\epsilon_{\mathrm{weak}}$. | Right-handed charged-current coupling is not strongly suppressed in the validated regime, or the weak exposure domain changes between chirality, mixing, and provenance. |
| $\mathcal{C}_{\mathrm{quantum}}$ | A transfer operator or return map $\mathcal{T}_{\Delta t}$, basin partition $\{B_i\}$, invariant or metastable measure $\mu_*$, and detector kernel produce $p_i=\mu_*(B_i)$ from $\Gamma$ and $\mathcal{H}$ without assigning probabilities as an external rule. | $\mathcal{B}_{\mathrm{quantum}}(\theta)$ lies in the Born-rule, Bell/CHSH/Tsirelson/GHZ/Hardy, Leggett-Garg temporal-correlation, detector-record, and no-signaling benchmark region within $\epsilon_{\mathrm{quantum}}$. | The validated regime gives non-Born weights, a classical-axis linear-correlation failure, untracked temporal-measurement disturbance, superluminal signal transfer, or a detector kernel not derived from the recorded causal state. |
| $\mathcal{C}_{\mathrm{gravity}}$ | One Noether sea response map $\mathcal{M}_{\mathrm{sea}}^{ab}$ supplies clock, ruler, effective signal-speed, weak-field metric, and PPN channels without changing coefficients per observable. | $\mathcal{B}_{\mathrm{gravity}}(\theta)$ lies in the redshift, Shapiro-delay, lensing, orbital, gravitational-wave-speed, PPN, and preferred-frame bound region within $\epsilon_{\mathrm{gravity}}$. | Clock, ruler, signal, or metric coefficients must be tuned independently, ordinary dissipative drag appears in stable motion, or preferred-frame leakage exceeds the recorded bounds. |
| $\mathcal{C}_{\mathrm{hadronic}}$ | An accepted branch family $A$, exposure quotient, color/topology ledger, residual strong channel set, and $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ close confinement, quark mass, baryon-stability, and nuclear-binding rows. | $\mathcal{B}_{\mathrm{hadronic}}(\theta)$ lies in the confinement, quark-hierarchy, proton-stability, deuteron, saturation, and alpha-like benchmark region within $\epsilon_{\mathrm{hadronic}}$. | The sector predicts generic fast proton decay, unphysical nuclear binding signs, missing color/topology closure, or an unbalanced architrino / Noether swarm inventory. |
| $\mathcal{C}_{\mathrm{radiation}}$ | A radiation residual $\mathcal{R}_{\Theta}$ selects admissible channels from $\{B_i\}$ and closes $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ with photon output, recoil, medium update, signed photon-frequency exchange, non-radiative remnant, or reaction rows explicitly recorded. | $\mathcal{B}_{\mathrm{radiation}}(\theta)$ lies in the Larmor/Lienard, bremsstrahlung, synchrotron, pair-threshold, Compton-like, SZ-like transfer, and blackbody benchmark region within $\epsilon_{\mathrm{radiation}}$. | Any benchmark requires per-observable retuning, untracked energy loss or gain, a missing recoil/provenance row, a free longitudinal photon mode, or a blackbody fit not tied to the event ledger. |
| $\mathcal{C}_{\mathrm{cosmology}}$ | One source, transport, signed photon-frequency-transfer, thermalization, and clock-rate record uses the same $\rho_{\text{NS}}(\mathbf{x},t)$, $n(\mathbf{x},t)$, $\chi_{\text{sea}}(\mathbf{x},t)$, $\mathcal{M}_{\mathrm{sea}}^{ab}$, and reaction provenance ledger across local source channels and observer-level cosmology. | $\mathcal{B}_{\mathrm{cosmology}}(\theta)$ lies in the BBN, CMB blackbody, damping, anisotropy, polarization handoff, redshift-budget, $H(z)$, BAO, and growth benchmark region within $\epsilon_{\mathrm{cosmology}}$. | BBN photon loading, CMB thermalization, redshift handoff, frequency-exchange closure, or structure growth requires unbalanced substrate creation, unlogged photon energy transfer, per-source retuning, or Noether sea variables incompatible with local reaction / radiation ledgers. |

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

**Lemma.** A local sector result $c$ is promotable through the validation gate if and only if $c\in\pi_S(\mathcal{C}_S)$ and

$$
\operatorname{Ext}_S(c)\ne\varnothing
$$

Proof route: if $c$ is promoted, the promoted record must retain the sector-$S$ result and pass every sector gate, so it is an element of $\operatorname{Ext}_S(c)$. Conversely, any $\theta\in\operatorname{Ext}_S(c)$ is a shared closure record whose sector-$S$ projection equals $c$ and whose weak, quantum, gravity, hadronic, radiation, and cosmology predicates all pass; therefore the local result has survived the validation gate. If the fiber is empty, the result is blocked by at least one sector predicate, benchmark region, no-go record, or failure condition.

### Incompatibility Witnesses

A local claim $c$ imposes a constraint subset $I(c)\subseteq\mathfrak{X}$ consisting of all closure records that preserve the claim's definitions, coefficients, ledger rows, and effective-limit assumptions. For a target sector $T$, define the constrained target set

$$
\mathcal{C}_T\!\mid c
=
\mathcal{C}_T\cap I(c)
$$

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

where

$$
\delta_T(c)
=
\epsilon_T
-
\inf_{\theta\in I(c),\,P_T(\theta)=1,\,\mathcal{G}_T(\theta)=1}
\operatorname{dist}_{d_T}\!\left(\mathcal{B}_T(\theta),\mathfrak{B}^{\mathrm{obs}}_T\right)
$$

The witness empties the target gate when $\mathcal{C}_T\!\mid c=\varnothing$. It damages the target gate when $\mathcal{C}_T\!\mid c\ne\varnothing$ but $\delta_T(c)$ removes a required tolerance margin, forces a hidden sector-specific parameter split, or leaves a required ledger row undefined.

| Witness class | Imposed local claim $c$ | Target effect | Failure code |
| --- | --- | --- | --- |
| Weak-domain split | $I(c)$ requires distinct weak exposure domains for `V-A`, CKM/PMNS, and weak-corridor provenance. | $\mathcal{C}_{\mathrm{weak}}\!\mid c=\varnothing$ because $P_{\mathrm{weak}}$ requires one weak-coupling-triad exposure record. | `weak.hidden_domain_split` |
| Gravity coefficient split | $I(c)$ requires separate clock, ruler, signal, and PPN coefficients not derived from one $\mathcal{M}_{\mathrm{sea}}^{ab}$. | $\mathcal{C}_{\mathrm{gravity}}\!\mid c=\varnothing$ if the split is needed for benchmark recovery. | `gravity.hidden_tuning` |
| Radiation-cosmology split | $I(c)$ fits blackbody recovery with $\chi_{\text{sea}}^{\mathrm{CMB}}(\mathbf{x},t)$ incompatible with the BBN or local radiation event ledger. | $\mathcal{C}_{\mathrm{cosmology}}\!\mid c=\varnothing$ or $\delta_{\mathrm{cosmology}}(c)<0$. | `cosmology.incompatible_transport_limit` |
| Quantum signal leak | $I(c)$ recovers Bell correlations through a detector kernel that transfers controllable signals outside the causal-wake ledger. | $\mathcal{C}_{\mathrm{quantum}}\!\mid c=\varnothing$ and the same record damages $\mathcal{C}_{\mathrm{gravity}}$ through preferred-frame leakage. | `quantum.signal_transfer` |
| Event-ledger omission | $I(c)$ routes radiation, reaction, measurement, or strong-field release without a required $E$, $\mathbf{p}$, $\mathbf{J}$, polarity, provenance, medium, or remnant row. | The target sector using that event has no admissible $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ completion. | `event.missing_ledger_row` |
| Null-result violation | $I(c)$ predicts a non-baseline channel $e\in\mathfrak{E}_{\theta}^{\mathrm{new}}$ with $O_e(\theta)>O_e^{\max}$ in a tested regime. | The relevant sector gate may fit its positive benchmark, but the shared closure record fails $\mathcal{R}_{\mathrm{null}}(\theta)=0$. | `null.observed_absence_violation` |

### Testable Failure Modes

| Failure mode | Mathematical test | Routed workstream |
| --- | --- | --- |
| Empty intersection | $\mathcal{C}_{\mathbb{A}\mathbb{A}\mathbb{A}}=\varnothing$ or $\operatorname{Ext}_S(c)=\varnothing$ for a proposed local promotion. | [Known Tensions](../../../../markdown/aaa/validation/known-tensions.md), [Closure Scorecard](../../../../markdown/aaa/validation/closure-scorecard.md) |
| Hidden tuning | A shared variable or map has sector-specific values $p_S\ne p_T$ with no recorded state variable, or the same benchmark family is recovered only by changing $\Pi_S$, $Q_S$, $\mathcal{R}$, $\{B_i\}$, the branch-chart revision record, equality map, root-coordinate split, $\mathcal{M}_{\mathrm{sea}}^{ab}$, $\rho_{\text{NS}}(\mathbf{x},t)$, or $\chi_{\text{sea}}(\mathbf{x},t)$ between cases. Branch-chart revisions selected after residual inspection rather than declared from branch geometry fail this test. | [Parameter Ledger](../../../../markdown/aaa/validation/parameter-ledger.md), [Constraint Ledger](../../../../markdown/aaa/validation/constraint-ledger.md) |
| Null-result violation | $\mathcal{R}_{\mathrm{null}}(\theta)>0$ for a predicted added channel in a validated comparison regime. | [Known Tensions](../../../../markdown/aaa/validation/known-tensions.md), [Constraint Ledger](../../../../markdown/aaa/validation/constraint-ledger.md) |
| Missing conservation/provenance field | $\mathcal{L}_{E\mathbf{p}\mathbf{J}}(\mathsf e)$ has an undefined or nonzero required row after all claimed outputs, recoil, medium updates, remnants, polarity / charge, architrino inventory, source identity, emission time, causal-root branch, and branch-Jacobian records are included. | [Reaction Ledger](../../../../markdown/aaa/validation/reaction-ledger.md), [Reaction-Cosmology Provenance Ledger](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md) |
| Benchmark-only fitting | A target benchmark in $\mathfrak{B}^{\mathrm{obs}}_S$ is used as an input to $\mathcal{L}_A$, $\Pi_S$, $Q_S$, $\mathcal{R}$, $\{B_i\}$, a branch-chart revision, an equality map, a root-coordinate split, or $\mathcal{M}_{\mathrm{sea}}^{ab}$ rather than as an output of a replayable closure record. | [Particle Masses](../../../../markdown/aaa/assemblies/particle-masses.md), [Measurement Ontology](../../../../markdown/aaa/quantum/measurement-ontology.md), [Radiation](../../../../markdown/aaa/reactions/radiation.md) |
| Incompatible effective limits | Two sectors require asymptotic maps whose overlap is empty, for example incompatible weak-field metric limits, photon / radiation limits, blackbody / BBN transport limits, or quantum no-signaling / gravity causal limits. | [Known Tensions](../../../../markdown/aaa/validation/known-tensions.md), [GR Phenomenology](../../../../markdown/aaa/spacetime/gr-phenomenology.md), [Cosmology Ontology](../../../../markdown/aaa/cosmology/cosmology-ontology.md) |

### Preferred-Frame Hiding Stop Condition

1. **Hard wall:** If the Euclidean-void rest frame is detectable by any physical experiment, for example a Michelson-Morley-type null test, at $\Delta c/c > 10^{-17}$, the theory fails.
2. **Required compensation:** Moving assemblies must acquire the Lorentz-compatible deformation and clock laws, $L_{\parallel}=L_0/\gamma$ and $T=\gamma T_0$, from delayed causal closure and Noether sea response rather than from kinematic postulates.
3. **Coefficient closure:** Clock, ruler, signal, and metric response coefficients must suppress two-way anisotropy and other preferred-frame leakage to the validated bounds. A qualitative contraction story is not sufficient.
4. **Dissipative drag:** If the Noether sea induces ordinary drag that slows cosmological bodies without a conserving medium-dressed response mechanism, the theory is falsified.

### Critical Stop Conditions

- **$c_f$ variance:** If field speed varies in the true void, the theory fails.
- **Noether sea drag:** If the Noether sea causes orbital decay or secular kinetic-energy loss through ordinary dissipative drag, rather than a reversible medium-dressed inertial response, the theory fails.
- **Lorentz leakage:** If absolute motion affects atomic spectra above $10^{-17}$, the theory fails.
- **Empty shared intersection:** If quantitative development makes $\mathcal{C}_{\mathbb{A}\mathbb{A}\mathbb{A}}=\varnothing$, the present implementation is rejected even if individual sector chapters remain locally suggestive.

## No Go Theorems

This chapter classifies the formal obstruction results that act as validation filters for $\mathbb{A}\mathbb{A}\mathbb{A}$. A no-go theorem is not useful here as a decorative citation. It is useful only when its assumptions, conclusion, and replacement burden can be recorded against a candidate closure.

The operational companion is [Failure Criteria](../../../../markdown/aaa/validation/failure-criteria.md). That page defines the shared closure intersection. This page defines how a theorem enters one sector gate: directly as a rejection condition, as an assumption mismatch, as a replacement constraint, or as an irrelevant comparison.

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

The class is `direct` when the theorem's assumptions are accepted or effective in the tested regime and its conclusion applies as a rejection condition. The class is `assumption mismatch` when a required assumption is rejected or absent and the theorem does not by itself supply a validated replacement burden. The class is `replacement constraint` when an assumption is rejected or replaced but the theorem protects a validated behavior that the candidate record must recover by $\mathbb{A}\mathbb{A}\mathbb{A}$ objects. The class is `irrelevant comparison` when $G$ shares no benchmark variable, conservation condition, or effective limit with the local claim under test.

### Applicability Map

| No-go family | Applicability class | Assumption status | Replacement constraint or falsifier |
| --- | --- | --- | --- |
| Bell/CHSH/Tsirelson, including GHZ and Hardy subbenchmarks | `replacement constraint` | Bell local-causality, ordinary common-cause screening, Markov screening, or context-independent local value assumptions are not substrate assumptions when $\mathcal{H}$ and detector response are retained; no-signaling, validated correlation bounds, GHZ perfect-correlation products, and Hardy zero/positive probability patterns remain benchmark constraints. | Derive pair provenance, detector kernels, Born weights, no-signaling, Tsirelson-compatible correlations, GHZ product signs, and Hardy event margins from $\mathcal{T}_{\Delta t}$, $\{B_i\}$, and $\mu_*$. Record reconstruction is not sufficient unless the induced joint record measure also passes the Bell, no-signaling, measurement-independence, factorization-residual, GHZ parity, and Hardy-event gates. Failure occurs if the model reduces to the classical-axis linear-correlation mode, uses controllable superluminal transfer, treats final records as an explanation without deriving their tested joint distribution, lets the declared common-past record screen the wings into a Bell-local product law, assigns context-independent local values across GHZ contexts, or erases Hardy's zero-probability constraints while claiming the positive event. |
| Kochen-Specker / noncontextual operator values | `replacement constraint` | A context-independent value assignment to every self-adjoint observable is not a substrate assumption. Effective operator values exist only after a preparation, apparatus kernel, coarse-graining, and record channel are declared. The protected benchmark is the quantum contextuality pattern: commuting context products, compatible shared marginals, and the absence of a global noncontextual value map in validated regimes. | Derive context-indexed apparatus records $r_{O,C}=R_{O,C}(\Phi_{\tau_C}^{\mathrm{tot}}(\Gamma_0;\mathcal{K}_C))$ from one substrate flow, while recovering the declared context product constraints and shared-observable marginals. Failure occurs if the closure silently assigns substrate values to all effective operators, changes the target state per context, or recovers contextuality only by making apparatus records inconsistent across overlapping calibrated contexts. |
| Pusey-Barrett-Rudolph quantum-state reality theorem | `replacement constraint` | Preparation independence and ontic-state overlap assumptions are not substrate axioms; the wavefunction is observer-level bookkeeping rather than a primitive physical field. The protected benchmark is stronger: independently prepared systems must have declared preparation records, product or non-product provenance status, and the standard state-discrimination statistics. | A candidate wavefunction account must state whether its substrate preparation measure factorizes for independently prepared systems and must expose any provenance correlation needed to avoid the theorem. Failure occurs if the model treats overlapping effective wavefunctions as harmless while also accepting product preparation independence and the PBR measurement statistics, or if it evades the theorem by hiding unrecorded correlations between supposedly independent preparation devices. |
| Leggett-Garg temporal-correlation inequalities | `replacement constraint` | Macroscopic realism per se and noninvasive measurability are not substrate axioms. A measurement in $\mathbb{A}\mathbb{A}\mathbb{A}$ is a physical apparatus-target coupling, so temporal readouts may disturb later basin dynamics; the protected benchmark is the observed sequential-correlation data together with an explicit disturbance ledger. | A candidate measurement account must declare the apparatus kernels used at each time, recover the tested temporal correlators, and report whether earlier probes perturb later record statistics. Failure occurs if the model asserts a definite macro-trajectory with noninvasive readout while accepting a Leggett-Garg violation, or if it explains the violation only by untracked apparatus disturbance rather than a declared record-channel residual. |
| Frauchiger-Renner / Wigner-friend observed-observer consistency | `replacement constraint` | The standard no-go setup assumes that quantum state descriptions can be applied to other theory-users, that one observer may import another observer's certified certainty, and that one declared record channel cannot certify mutually exclusive outcomes. $\mathbb{A}\mathbb{A}\mathbb{A}$ rejects an external classical-observer cut, but it also rejects importing another observer's conclusion without a physical record channel, access region, apparatus kernel, and boundary-data model. | A measurement closure that includes observed Physical Observers must derive every imported statement from the same substrate flow, record-autonomy test, and finite communication channel used for ordinary apparatus records. Failure occurs if a model needs a hidden external observer, lets a Physical Observer import certainty without a durable record, treats an unbuildable reference/readout setup as a completed experiment, or allows two mutually exclusive outcomes to be certified inside one declared record channel. If the reference or readout channel cannot satisfy the physical record criteria, the thought experiment is blocked by realizability rather than promoted into ontology. |
| Groenewold-van Hove / global quantization map | `replacement constraint` | A global quantization map from all classical observables $C^\infty(M)$ to Hilbert-space operators, preserving every Poisson bracket as a commutator, is not a substrate assumption. The protected benchmark is narrower: in validated quantum regimes, the selected observer-level observables must recover the tested commutator algebra on the calibrated record domain. | Derive an admissible observable set from the same coarse-graining, apparatus kernel, retained path-history data, and record window used for the effective operator model, then bound the quantization-domain residual in [Quantum Operator Mapping](../../../../markdown/aaa/philosophy-history/theory-bridges/quantum-operator-mapping.md#admissible-quantization-domain-guardrail). Failure occurs if a closure claims bracket-to-commutator recovery for all smooth classical functions, uses a choice of polarization or representation as hidden ontology, or changes the observable domain per benchmark without recording the physical apparatus and coarse-graining that justify the restriction. |
| Lorentz invariance and preferred-frame tests | `direct` | Observer-level clock, ruler, two-way signal, PPN, and spectral bounds apply directly to any candidate effective metric or transport map. | Bound $\epsilon_{\mathrm{LV}}$, $\Delta_{\mathrm{tw}}(\beta)$, PPN parameters, spectra, and gravitational-wave-speed differences within recorded limits. Failure occurs when absolute motion is detectable above the accepted thresholds. |
| Spin-statistics / exchange | `replacement constraint` | Local Lorentz-QFT axioms are not fundamental substrate assumptions, but matter stability and exchange classes are validated effective constraints. | Derive the ordered-frame lift, $4\pi$ spinor behavior, and bosonic/fermionic exchange classes from Noether swarm topology and angular-momentum ledger. Failure occurs if the lift cannot separate fermionic and bosonic closure classes. |
| CPT theorem / local relativistic QFT assumptions | `replacement constraint` | Local relativistic QFT assumptions are not substrate assumptions for absolute time, Euclidean void, and delayed causal wakes. This includes local field operators, microcausal commutation structure, fundamental Poincare symmetry, and a Lorentz-invariant vacuum as primitive assumptions. The protected benchmarks remain observer-level particle/antiparticle mass degeneracy, charge-conjugate reaction bookkeeping, neutral-meson and lepton-sector CPT bounds, Lorentz-leakage bounds, and the absence of unobserved baryon/lepton channels. | Recover the tested CPT-facing benchmarks from architrino polarity, pro/anti assembly mapping, delayed dynamics, effective Lorentz closure, and the existing null-result ledger. A candidate record should publish a residual vector such as $\mathcal{R}_{\mathrm{CPT}}(\theta)=(\Delta m_{p\bar p},\Delta q_{p\bar p},\Delta\Gamma_{\mathrm{conj}},\epsilon_{\mathrm{LV}},\mathcal{R}_{\mathrm{null}})$ and show that each component stays within the declared experimental or closure bound. Failure occurs if the record hides rejected local-QFT assumptions inside the proof, predicts CPT-violating mass or reaction asymmetries above bounds, or restores the symmetry only by adding untracked channels outside $\mathcal{R}_{\mathrm{null}}$. |
| Exact global architrino flips or permutations | `assumption mismatch` with replacement constraint when effective indistinguishability is claimed | Substrate architrinos are provenance-bearing entities with path-history and causal-wake records. A global flip, polarity reassignment, or label permutation is not exact unless it preserves those records and all causal-root relations, not merely the instantaneous exposed properties. | State whether the symmetry is a kernel/background symmetry, a full-history symmetry on a special state, or an effective coarse-grained equivalence. Effective exchange, gauge, flavor, or charge bookkeeping may be used only after the suppressed provenance data and replacement recovery target are named. Failure occurs if a closure treats provenance-suppressed interchangeability as substrate identity, or if an effective symmetry claim cannot recover the validated observer-level degeneracies, conservation laws, and exchange classes. |
| Coleman-Mandula / gauge unification constraints | `assumption mismatch` with replacement constraint when effective scattering is claimed | Exact Lorentz-invariant analytic S-matrix assumptions are not substrate assumptions for delayed absolute-time dynamics. Compact internal symmetry, unitarity, positive-energy particle states, and effective gauge-sector factorization become benchmarks when Standard-Model-facing scattering or mixing is claimed. A pre-effective symmetry container may evade the theorem's literal hypotheses only before observer-level spacetime, scattering states, and gauge factors have been recovered; after that recovery, the same record must reproduce the validated factorization and may not use mixed spacetime/internal generators to create observed-sector shortcuts. | State which assumptions are effective, recover compact internal gauge behavior in the tested regime, and derive gauge-like symmetries without contradicting observed factorization. Failure occurs if a claimed unification predicts forbidden effective-sector mixing, hides added channels outside $\mathcal{R}_{\mathrm{null}}$, uses gauge covariance as an unexplained fit, or suppresses non-baseline sectors with a record different from the positive recovery record. |
| Weinberg-Witten-like obstructions | `assumption mismatch` with replacement constraint when emergent photon or gravity language is claimed | Lorentz-covariant conserved stress-tensor assumptions of the theorem are not fundamental substrate assumptions for Noether sea state and assembly closures. Photon and gravity claims must still recover the validated effective channels. | Keep photon and metric objects as medium/assembly closures with explicit domain limits. Failure occurs if the record claims a fundamental Lorentz-covariant composite photon/graviton while also denying the theorem's assumptions, or if effective limits cannot be recovered. |
| Boundary-Hamiltonian / kinematic-locality constraints on emergent gravity | `replacement constraint` when emergent gravity, boundary unitarity, or black-hole information claims are made | In generally covariant gravity comparisons, the Hamiltonian can be a boundary term, and Marolf-style arguments show that non-linear gravity is not straightforwardly recovered from a kinematically local theory with independently commuting bulk observables. $\mathbb{A}\mathbb{A}\mathbb{A}$ does not accept local QFT operator algebras, boundary Hamiltonians, or asymptotic boundary observables as substrate primitives, but the protected benchmark remains: effective gravity must carry unitary observer-level information accounting without freezing local dynamics or treating local horizon entanglement as a sharply defined substrate observable. | A candidate record must replace the rejected assumptions with finite boundary wake data, declared reference resources, access-region limits, and a Noether sea continuation map that recovers both local effective dynamics and boundary-accessible bookkeeping. Failure occurs if the model claims emergent GR from purely local commuting substrate variables, hides all bulk dynamics behind a boundary algebra, or treats horizon-crossing correlations as lost or recovered without a declared Physical Observer access model. |
| Global-GR underdetermination and observationally indistinguishable spacetime results | `replacement constraint` when a global cosmology, horizon, or effective-metric claim is promoted from observer records | Lorentzian manifold ontology, global spacetime extension classes, and model-class maximality assumptions are not substrate assumptions. The protected benchmark is methodological: rich local records and local-property preservation do not by themselves license a unique global reconstruction. | A promoted global claim must state the Physical Observer access region, data-product projection, local-induction assumptions, and ambiguity residual that make the claim invariant across admissible closure records. Failure occurs if a cosmology or strong-field packet treats a fitted FLRW, de Sitter, extension, or horizon interpretation as final ontology merely because it reproduces the observer-accessible data, or if it changes the admissible model class to obtain determinism or uniqueness without recording that assumption as part of the closure. |
| Massive-gravity and finite-range-gravity obstructions | `replacement constraint` when large-scale gravity modification is claimed | Fundamental massive-graviton and Lorentzian spin-2 assumptions are not $\mathbb{A}\mathbb{A}\mathbb{A}$ substrate assumptions. The protected constraints remain local GR recovery, bounded physical energy, stable mode counting, low-energy positivity bounds where the effective comparison domain accepts their assumptions, de Sitter or cosmological background bounds, and gravitational-wave polarization, speed, and dispersion limits. | A medium-response closure must recover the GR limit in validated regimes, keep perturbation energy bounded below after gauge and effective redundancies are removed, pass the accepted positivity tests for any claimed low-energy effective scattering or response map, and prevent extra scalar or longitudinal gravitational-wave modes or finite-range drift from exceeding observational bounds. Failure occurs if large-scale weakening is obtained only by allowing ghost-like negative-energy modes, positivity-violating effective coefficients, order-one solar-system deviations, or unconstrained gravitational-wave dispersion or polarization. |
| AdS/CFT, island, replica-wormhole, string, or loop-quantum-gravity comparison constraints | `irrelevant comparison` unless a specific tested benchmark is imported | These frameworks are comparison tools unless the local packet imports a precise entropy, unitarity, horizon, or observational condition as a gate. | No acceptance burden is created by analogy alone. A burden is created only by a named benchmark such as area-scaling entropy, Page-curve-compatible accounting, horizon regularity, or direct compact-object data. |

Black-hole CPT comparisons are handled by the CPT row, not by importing global mirror-boundary ontology. If a horizon-interface packet uses CPT or thermal-equilibrium language, it must publish the corresponding formation/release balance residual in the black-hole chapter and keep $\mathcal{R}_{\mathrm{CPT}}(\theta)$ within the tested particle-sector bounds. A record fails if it restores apparent balance only by adding untracked release channels, spectator species outside $\mathcal{R}_{\mathrm{null}}$, or a second state record for horizon entropy.

Cosmic Bell tests sharpen the Bell row by converting measurement-independence leakage into an observationally bounded residual. When detector settings are chosen from distant photons, quasars, or other causally screened sources, a candidate closure may not rely on an untracked common cause linking those settings to the pair-preparation record. Such a route must be recorded as nonzero $\Delta_{\mathrm{MI}}$ and compared against the experimental setting-source covariance bound rather than hidden inside pair provenance.

The GHZ and Hardy subbenchmarks sharpen the Bell row by removing any reliance on a single CHSH average. For a calibrated three-party GHZ setup, the four product contexts $\mathcal{C}_{\mathrm{GHZ}}=\{XXX,XYY,YXY,YYX\}$ carry signs $\chi_C$ whose product is $-1$, while any context-independent local value assignment makes the product $+1$. A compact record residual is
$$
\Delta_{\mathrm{GHZ}}
=
\max_{C\in\mathcal{C}_{\mathrm{GHZ}}}
\left[
1-\chi_C E_\theta(C)
\right]_+
$$
where $E_\theta(C)$ is the product expectation for the declared apparatus context and $[x]_+\equiv\max(x,0)$. For a Hardy setup with binary observables $U_i,D_i$, use the zero-probability constraints and positive Hardy event as a margin:
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
A useful Bell-family closure must make $\Delta_{\mathrm{GHZ}}$ small on the perfect-correlation contexts, produce the positive Hardy margin where the experiment requires it, and still keep $\Delta_{\mathrm{MI}}$ and $\Delta_{\mathrm{NS}}$ inside tolerance. These are validation targets for the joint record measure, not new ontology.

The Kochen-Specker row includes the Mermin-Peres magic square as a preferred compact benchmark when a candidate operator map claims contextuality recovery. In that subcase the six commuting row/column contexts carry product signs $\chi_C\in\{+1,+1,+1,+1,+1,-1\}$. The closure must derive context-indexed apparatus records that satisfy those products and preserve shared marginals while refusing a global noncontextual value map. A proof that only assigns prewritten substrate values to all effective operators fails the parity check: each observable appears twice, so the product of all assigned values is $+1$, whereas the benchmark product signs multiply to $-1$.

The Pusey-Barrett-Rudolph row is a preparation-independence audit, not a license to ignore independent preparation. For two declared preparations $P_A$ and $P_B$, with substrate preparation measures $\rho_A(\lambda_A|P_A)$, $\rho_B(\lambda_B|P_B)$, and joint measure $\rho_{AB}(\lambda_A,\lambda_B|P_A,P_B)$, define
$$
\Delta_{\mathrm{PI}}
=
D_{\mathrm{TV}}\!\left(
\rho_{AB}(\lambda_A,\lambda_B|P_A,P_B),
\rho_A(\lambda_A|P_A)\rho_B(\lambda_B|P_B)
\right)
$$
If a candidate avoids the theorem by allowing $\Delta_{\mathrm{PI}}>0$, that residual must be tied to a physical shared-provenance, boundary-data, or apparatus-coupling record. Otherwise it is an untracked preparation correlation. The useful closure target is therefore two-part: recover the PBR state-discrimination statistics in the declared record channel while reporting whether the substrate preparation measure factorizes. If both the PBR measurement statistics and preparation independence are accepted in the same domain, overlapping effective wavefunction descriptions cannot be treated as a harmless epistemic overlap.

The Leggett-Garg row protects temporal correlation data without importing macrorealism as ontology. For dichotomic records $q_i\in\{-1,+1\}$ at times $t_i$, define
$$
C_{ij}
=
\sum_{q_i,q_j=\pm1}
q_iq_j\,P_\theta(q_i,q_j|\mathcal{K}_i,\mathcal{K}_j),
\qquad
K_{\mathrm{LG}}=C_{12}+C_{23}-C_{13}
$$
Macrorealism plus noninvasive measurability gives $K_{\mathrm{LG}}\le 1$ for this sign convention. The $\mathbb{A}\mathbb{A}\mathbb{A}$ replacement burden is not to accept noninvasive readout, but to declare the disturbance residual
$$
\Delta_{\mathrm{NIM}}
=
\sup_{i<j}
D_{\mathrm{TV}}\!\left(
P_\theta(q_j|\mathcal{K}_j),
P_\theta(q_j|\mathcal{K}_i,\mathcal{K}_j)
\right)
$$
recover the observed $K_{\mathrm{LG}}$-type statistics, and state whether the violation is carried by ordinary record-forming apparatus coupling, weak-probe disturbance, or a still-unclosed measurement model. A result that leaves $\Delta_{\mathrm{NIM}}$ implicit has not converted the Leggett-Garg comparison into a usable validation gate.

For finite-range gravity comparisons, positivity bounds should be treated as an effective-domain filter, not as imported ontology. Let $E_{\min}^{\mathrm{phys}}(\theta)$ denote the lowest physical perturbation energy after gauge and redundant variables are removed, and let $\Pi_a(\theta)$ denote the low-energy positivity functionals whose signs are fixed by the accepted comparison theorem for the declared scattering or response domain. A compact residual for a candidate large-scale weakening record is
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
\frac{\partial^2\omega_\theta}{\partial k^2}
\right|^2\,d\log f
+
w_{\mathrm{cos}}\mathcal{R}_{\mathrm{shared}}(\theta)
$$
where $[x]_+\equiv\max(x,0)$. The record is useful only if one shared Noether sea response map can make this residual small. A result that passes local GR tests by changing the energy, positivity, polarization, dispersion, or cosmology record separately is not a promoted closure.

### Use in Validation

A candidate closure record must name the no-go family it touches and fill the applicability record before the result can be promoted. If $\operatorname{app}(G,\theta)=\mathrm{direct}$, the theorem's conclusion is a hard rejection condition. If $\operatorname{app}(G,\theta)=\mathrm{replacement\ constraint}$, the rejected assumption does not remove the burden; it only changes the object that must carry the validated behavior.

The no-go record therefore becomes one component of the sector predicate $\mathcal{G}_S(\theta)$ used in [Failure Criteria](../../../../markdown/aaa/validation/failure-criteria.md). A result that passes a local benchmark but evades the relevant theorem by changing assumptions without supplying the replacement constraint is not a closure result.

## Known Tensions

This chapter is the pressure ledger for the present repo state. Its purpose is to collect the unresolved burdens that matter most for closure without mixing them with vague future ideas or low-stakes wishlist items.

### Purpose

This chapter is the pressure ledger for $\mathbb{A}\mathbb{A}\mathbb{A}$. It collects the places where the framework is not yet closed, where the present derivation stack is thinner than the claim it supports, or where current observations impose a hard quantitative burden that the repo has not yet fully carried.

This page is not a dumping ground for vague uncertainty. Each tension should identify:

- the issue,
- why it matters,
- the current repo status,
- the closure target,
- and the failure condition.

### Severity Scale

- **Tier 1:** could directly falsify the present architecture if not resolved.
- **Tier 2:** does not immediately kill the architecture, but blocks a serious Standard-Model or GR-level closure claim.
- **Tier 3:** important downstream completion issue, but not yet the main credibility gate.

### Pressure Ledger

| Tier | Issue | Why it matters | Current repo status | Closure target | Failure condition |
| --- | --- | --- | --- | --- | --- |
| 1 | Weak `V-A` selection rule | The weak interaction must distinguish left-chiral fermions from right-chiral ones. | [quantum-number-mapping.md](../../../../markdown/aaa/assemblies/fermions/quantum-number-mapping.md) gives a geometric lock-out story, and [weak-mixing-ckm.md](../../../../markdown/aaa/philosophy-history/theory-bridges/weak-mixing-ckm.md) now identifies this as part of the shared weak-coupling-triad exposure problem, but no operator derivation is complete. | Derive a docking or coupling operator that exposes the weak-coupling triad for left-handed charged-current coupling, hides it for right-handed charged-current coupling, and then reuses the same domain for CKM/PMNS overlap and weak-reaction provenance. | If right-handed neutrino or right-handed charged-fermion coupling to `W` is not strongly suppressed in the same regime, or if the exposure domain must be redefined separately for mixing and provenance, the current weak-sector picture fails. |
| 1 | Preferred-frame leakage | The ontology has absolute time and a medium, so observer-level Lorentz hiding must be quantitative. | The requirement is clear in [constraint-ledger.md](../../../../markdown/aaa/validation/constraint-ledger.md), and [Lorentz Kinematics](../../../../markdown/aaa/spacetime/lorentz-kinematics.md) now states the moving-assembly coefficient targets plus the translating-binary residual test, but the full attractor proof is not complete. | First solve the translating two-body branch and test $T_u/T_0=\gamma_f$ and $L_{\parallel}/L_{\perp}=1/\gamma_f$ on the same causal-root ledger; then show that nested shell swarm clocks, rulers, and signal transport suppress measurable preferred-frame effects below current experimental bounds through coupled shape, clock, and two-way anisotropy closure. | Any robust preferred-frame signal above the recorded bounds, a non-Lorentzian binary residual that cannot be traced to a controlled branch feature, or any need to tune clock and ruler coefficients independently falsifies the observer-level spacetime closure. |
| 1 | Born-rule derivation | Quantum replacement claims are not credible without a basin-measure or equivalent statistical closure. | [wavefunction-ontology.md](../../../../markdown/aaa/quantum/wavefunction-ontology.md) and [measurement-ontology.md](../../../../markdown/aaa/quantum/measurement-ontology.md) fix the ontology; [quantum-operator-mapping.md](../../../../markdown/aaa/philosophy-history/theory-bridges/quantum-operator-mapping.md) now states the finite-time invariant-measure, thermodynamic ensemble consistency, and admissible quantization-domain targets, but the derivation is still open. | Derive outcome weights from deterministic basin measures in the same regime that yields the effective wave equation, show that the same finite-window measure projects to the thermodynamic summaries used for apparatus irreversibility, decoherence, and record formation, and restrict effective operators to a physically declared observable domain rather than a global quantization of all classical functions. | If the deterministic closure produces a non-Born weighting in validated regimes, if Born weights and thermodynamic summaries require incompatible measures, or if the operator map requires ad hoc observable-domain changes per benchmark, the current quantum story fails. |
| 1 | Weak-field GR recovery | Redshift, Shapiro delay, lensing, and orbital tests must come from one constitutive map. | The interface now exists in [gr-phenomenology.md](../../../../markdown/aaa/spacetime/gr-phenomenology.md) and [ppn-parameters.md](../../../../markdown/aaa/spacetime/ppn-parameters.md), but the shared fit is incomplete. | Produce one reusable parameter set for the weak-field metric map. | If different observables require incompatible constitutive coefficients, the emergent-metric program fails. |
| 2 | Low-energy quantum-gravity EFT recovery | Quantized metric methods are not $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology, but their long-distance effective predictions are fixed by known low-energy degrees of freedom. | [gr-phenomenology.md](../../../../markdown/aaa/spacetime/gr-phenomenology.md) and [emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md) state the classical weak-field map; they need an explicit observer-level GR-EFT recovery gate. | Recover the standard long-distance quantum correction to the Newtonian potential using the same weak-field constitutive record that supports PPN, redshift, Shapiro delay, lensing, and gravitational-wave speed. | If the calculable low-energy quantum correction requires an independent coefficient set, spacetime closure is incomplete even if the classical observables are matched. |
| 2 | Parameter non-closure | Too many symbols remain geometric promises rather than fixed quantities. | [parameter-ledger.md](../../../../markdown/aaa/validation/parameter-ledger.md) now organizes them, but most are still open. | Close $\kappa$, the mass prefactor, the metric constitutive coefficients, and the weak-mixing datum without per-observable retuning. | If the same symbol has to be re-fit independently across chapters, the closure claim weakens sharply. |
| 2 | Null-result closure for added channels | A unification claim can fail even while matching known positive benchmarks if it predicts extra channels that experiments have not seen. | [failure-criteria.md](../../../../markdown/aaa/validation/failure-criteria.md) now defines $\mathcal{R}_{\mathrm{null}}(\theta)$ for predicted non-baseline channels, but the main sector ledgers have not all routed their null-result bounds through that residual. The concrete comparison cases are mirror matter, superpartners, proton-instability channels, extra gauge bosons, hidden transport modes, sterile or neutral partner branches, and preferred-frame leakage channels. | For every added partner family, unstable baryon channel, extra gauge or transport mode, preferred-frame leakage channel, or other non-baseline output, compute $O_e(\theta)$ and show $O_e(\theta)\le O_e^{\max}$ from the same shared closure record used for the positive benchmarks. A symmetry container that includes the Standard Model as a subcase passes only when the added channels are proven absent, exactly redundant, or below bounds by the same branch record that recovers the observed sector. | If unobserved channels are hidden only by sector-specific masses, thresholds, compactification-like assumptions, or disconnected suppression factors, the framework has reproduced the failure pattern of overextended unification rather than closing it. |
| 2 | Thermodynamic-gravity closure | If the metric is an emergent equation of state, the repo needs more than constitutive rhetoric. | [emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md) now states the Noether sea-first picture, defines a local-horizon residual $\mathcal{R}_{\mathrm{thermo}}(\theta)$, and links the proof scaffold to [Thermodynamic Residual Protocol](../../../../markdown/aaa/validation/simulations/thermodynamic-residual.md); [black-holes.md](../../../../markdown/aaa/spacetime/black-holes.md) frames horizon entropy as a block-density count over horizon-compatible reduced Noether swarm closure labels. No run has yet driven the residual small from a simulated Noether sea record. | Show that the Noether sea admits an area-scaling entropy channel $S_H=k_B\log\lvert\mathcal{B}_H\rvert$ whose local coefficient is recovered as a block entropy density, a local Rindler/Unruh recovery in the appropriate limit, a Jacobson-style $dQ=T_UdS$ residual for boundary-wake data, Page-curve-compatible information release through horizon-interface channels, and a controlled nonequilibrium regime where distinctive departures are predicted. | If GR-like recovery requires thermodynamic language but the Noether sea cannot supply area scaling, local horizon temperature, a shared stress/entropy/temperature record, Page-curve-compatible information accounting, or a coherent nonequilibrium boundary, the present gravity interpretation loses depth and may be mislocated. |
| 2 | Reaction-cosmology provenance closure | The local-reaction story and the cosmology-source story now meet at photon loading, pair production, signed photon-frequency exchange, and thermalization. | [reaction-cosmology-provenance-ledger.md](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md) defines the shared ledger, including path-frequency exchange, but no full source-to-background path has been closed. | Produce one conserved provenance path from a radiation, pair, or Compton/SZ-like transfer channel through thermalization to a BBN or CMB observable, using the same Noether sea state variables throughout. | If BBN photon loading, CMB blackbody recovery, or redshift-budget reconstruction requires unbalanced substrate creation, unlogged photon energy transfer, per-source retuning, or incompatible thermalization assumptions, the local-recycling cosmology branch fails. |
| 2 | Shared cosmology state closure | Dark-energy, $H_0$, $S_8$, CMB, BBN, BAO, weak-lensing, redshift-budget, and pre-BBN comparison claims all consume overlapping Noether sea state variables. | [cosmology-ontology.md](../../../../markdown/aaa/cosmology/cosmology-ontology.md), [dark-energy.md](../../../../markdown/aaa/cosmology/dark-energy.md), and [hubble-s8-tensions.md](../../../../markdown/aaa/cosmology/hubble-s8-tensions.md) now state the shared-state requirement; [inflation-model.md](../../../../markdown/aaa/cosmology/inflation-model.md#pre-bbn-comparison-gate), [BBN-constraints.md](../../../../markdown/aaa/cosmology/BBN-constraints.md#pre-bbn-handoff-gate), [structure-formation.md](../../../../markdown/aaa/cosmology/structure-formation.md#cmb-lensing-and-acoustic-peaks), and [gravitational-waves.md](../../../../markdown/aaa/spacetime/gravitational-waves.md#early-universe-stochastic-background-gate) now route pre-BBN branch projections through the same record; [simulations/cosmology-shared-residual-fit.md](../../../../markdown/aaa/validation/simulations/cosmology-shared-residual-fit.md) supplies the first mock residual-packet scaffold; and [dark-energy.md](../../../../markdown/aaa/cosmology/dark-energy.md) now gives a thermodynamic $\Lambda_{\mathrm{eff}}$ conjugacy target, but no empirical joint residual fit exists. | Produce one $\theta_{\mathrm{sea}}$ and projection family that keeps SN, BAO, CMB, WL, RSD, BBN, $H_0$, $S_8$, signed path-frequency-transfer rows, pre-BBN branch projections, and stochastic-background bounds inside tolerance without per-pipeline retuning; if $\Lambda_{\mathrm{eff}}$ is treated thermodynamically, derive it as a conjugate to an effective observer-level four-volume functional of the same $\theta_{\mathrm{sea}}$. | If distance, growth, early-universe, calibration, path-frequency-transfer, pre-BBN branch, stochastic-background, or thermodynamic-$\Lambda_{\mathrm{eff}}$ observables require incompatible Noether sea state records, the cosmology branch has hidden the tension rather than closed it. |
| 2 | Radiation Gate C benchmark closure | Radiation must recover standard electromagnetic and QED-like benchmarks before Noether sea-dependent deviations or cosmology source claims are credible. | [radiation.md](../../../../markdown/aaa/reactions/radiation.md) now carries a classified closure-target ledger, with channel scaffolds in [bremsstrahlung.md](../../../../markdown/aaa/reactions/bremsstrahlung.md), [synchrotron.md](../../../../markdown/aaa/reactions/synchrotron.md), and [reaction-cosmology-provenance-ledger.md](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md), but no unified Gate C derivation is complete. | Close Larmor/Lienard recovery, free-free emissivity, synchrotron $\gamma^2B$ and power scaling, pair thresholds, Compton-like scattering, and blackbody detailed balance through one event record, while treating free photon polarization as a Gate B handoff only. | If any benchmark requires per-observable retuning, violates validated limits, or derives free photon polarization outside Gate B, radiation Gate C does not close. |
| 2 | CKM / PMNS quantitative closure | Flavor mixing cannot remain only qualitative if the framework claims Standard-Model replacement. | PMNS oscillation formulas exist; CKM geometry has an overlap/holonomy scaffold and is now tied to the same weak-coupling-triad exposure route as `V-A` and reaction provenance. | Derive one geometric overlap map for quark and lepton mixing from the exposed weak-coupling-triad domain, shielding eigenstates, and near-photon neutral-sector Hamiltonian, then test it against CKM and PMNS data. | If no stable geometry reproduces the observed hierarchy and phases, or if the CKM/PMNS definitions require a different weak-basis domain from the `V-A` operator, the present mixing architecture is incomplete at best. |
| 2 | Quark mass map | The quark catalog is in place, but the mass hierarchy is still not quantitative. | [quarks.md](../../../../markdown/aaa/assemblies/fermions/quarks.md) closes structure, not masses. | Produce a first-pass mass map for `u,d,c,s,t,b` from shielding and internal-energy accounting. | If the hierarchy cannot be reproduced even at scaling level, generation-by-shielding is in trouble. |
| 2 | Spin / statistics closure | The framework repeatedly appeals to spinor and bosonic/fermionic behavior. | There is now a decent $4\pi$ story, but not a formal closure proof. | Derive the ordered-frame history-lift map cleanly enough to justify spin-$\tfrac{1}{2}$ and associated statistics sectors. | If the topology cannot distinguish fermionic and bosonic closure classes, several assembly claims lose their footing. |
| 2 | Baryon stability and baryon-number status | Proton stability is a major empirical constraint and a major theoretical claim. | The color chapter gives a topological argument, but the quantitative baryon-number status remains open. Current PDG 2024 comparison bounds already put representative partial mean lives at $\tau/B(p\to e^+\pi^0)>2.4\times10^{34}\,\mathrm{yr}$ and proton neutrino/kaon modes near $5.9\times10^{33}\,\mathrm{yr}$ at 90% confidence, so this is an active null-result gate rather than a qualitative concern. | Show whether proton stability is exact, exponentially protected, or only effective in a quantified regime, and route every predicted baryon-violating corridor through $\Gamma_{p,c}^{\max}=1/\tau_{c}^{\min}$ in [Failure Criteria](../../../../markdown/aaa/validation/failure-criteria.md). | If the theory predicts generic fast proton decay, or suppresses it by a sector-local parameter not tied to the same color/topology and reaction-provenance ledger that recovers hadron structure, the hadronic sector is not viable. |
| 3 | Nuclear binding closure | The residual strong-force story must eventually recover nuclear phenomenology beyond pions-as-metaphor. | [nuclear-binding.md](../../../../markdown/aaa/nuclear-atomic/nuclear-binding.md) now gives a first effective interface, but no fitted nuclear map. | Recover at least deuteron binding, saturation, and alpha-like enhancement in one coherent effective model. | If even the sign and scaling of nuclear binding cannot be stabilized, the hadronic coarse-graining is inadequate. |
| 3 | Condensed-matter branch recovery | Materials provide dense, precise tests of whether electron-envelope, lattice, phonon, and Noether sea response variables remain one record instead of becoming probe-specific fits. | [condensed-matter.md](../../../../markdown/aaa/nuclear-atomic/condensed-matter.md) now states Bloch-band, effective-mass, Fermi-surface, diffraction, phonon, Hall, and topological-response residuals; [constraint-ledger.md](../../../../markdown/aaa/validation/constraint-ledger.md) records the corresponding response gate. No derivation yet computes these objects from the master equation or a settled material branch. | Recover Bloch form, reciprocal-lattice scattering, phonon dynamical matrices, effective mass tensors, Fermi-surface or band-gap classification, Hall sign/plateaux, and no-drag transport from one declared material branch and Noether sea state record. | If band curvature, lattice stiffness, diffraction peaks, Hall response, and transport relaxation require independent response maps, or if resistance is explained by ordinary Noether sea drag below the transport threshold, the material-response program has split from the main ontology. |
| 3 | Strong-field / black-hole closure | Strong-field claims are distinctive and therefore risky. | The alignment framing exists, but the predictive map is not yet broad. | Derive concrete departures near the alignment regime while preserving weak-field success. | If the strong-field story contradicts weak-field closure or observed compact-object data, it must be revised. |

### Highest-Leverage Cluster

The top credibility cluster is:

1. weak `V-A`,
2. preferred-frame hiding,
3. Born-rule emergence,
4. weak-field GR recovery.

Those four form the present hard gate because each one touches a major validated pillar of modern physics:

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

The weak-selection problem, right-handed neutrino stance, CKM/PMNS closure, weak-corridor provenance, and the quark misalignment parameter $\alpha$ all belong to the same electroweak geometry stack. The current synthesis is that these are readouts of one weak-coupling-triad exposure problem: axial-frame branch selection determines what can be exposed, the `V-A` operator determines which handedness can dock, the overlap integrals determine mixing weights, and the reaction ledger determines where the corridor payload and outgoing Noether swarm provenance enter and exit. A clean derivation of one should now constrain the others rather than leaving them as independent stories.

The neutrino branch of this cluster has four empirical decision handles: the lightest-neutrino mass, the mass sum $\sum_i m_i$, neutrinoless double-beta limits or detection, and any evidence for a sterile or right-handed singlet. These data products should decide between the current minimal near-photon neutral-pair stance, a sterile $\nu_R$ branch, or a lepton-number-violating provenance channel. They should not be used to rewrite the charged-fermion axial-layer rule or to import a sterile dark-matter interpretation before the PMNS, reaction, BBN, CMB, and structure-formation gates are simultaneously satisfied.

A useful benchmark-only sharpening is the package $m_{\mathrm{lightest}}\to0$, $\sum_i m_i\approx0.06\,\mathrm{eV}$, suppressed neutrinoless double-beta rate, and any sterile or right-handed singlet behaving as cold collisionless matter only after the neutral-sector and cosmology gates close. These values should be treated as discriminator targets, not as adopted ontology: they can rank the neutral-lepton branches, but they cannot bypass the PMNS Hamiltonian, reaction provenance, BBN, CMB, structure-formation, and null-result residuals.

#### Quantum cluster

Superposition, measurement, Born-rule emergence, and Bell/nonlocality closure are one package. A good ontology chapter without a basin-measure derivation is progress, but not endpoint closure.

Penrose-Diosi gravitational-collapse tests are an external benchmark for the same finite-time threshold-resolution burden, not an adopted ontology. The comparison uses the gravitational self-energy of the difference between two mass distributions,
$$
\Delta E_G \sim \frac{G}{2}\int\!\!\int
\frac{(\rho_1-\rho_2)(\mathbf{x})(\rho_1-\rho_2)(\mathbf{y})}
{\|\mathbf{x}-\mathbf{y}\|}\,d^3x\,d^3y
$$
with the collapse-time estimate
$$
\tau_G\sim \frac{\hbar}{\Delta E_G}
$$
The useful comparison pressure is the tension between local free-fall equivalence and linear superposition when the two branches carry measurably different mass distributions. The validation burden is to compare $\tau_{\text{meas}}$ for massive-superposition records, including BEC-scale spatial superpositions of roughly $10^9$ to $10^{10}$ atoms, against $\tau_G$ and against ordinary environmental decoherence, while preserving the $\mathbb{A}\mathbb{A}\mathbb{A}$ claim that branch selection is finite-time threshold resolution rather than fundamental gravitational collapse. Any collapse variant that predicts persistent spontaneous heating must also pass low-background and compact-object heating bounds before it can serve even as a comparison baseline.

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
| Bremsstrahlung emissivity | derivation target | Recover $d\sigma/dk$, screening/form-factor corrections, $\epsilon_{\nu}^{\mathrm{ff}}\propto Z^2 n_e n_i T^{-1/2}e^{-h\nu/(k_B T)}g_{\mathrm{ff}}$, and $\epsilon_{\mathrm{ff}}\propto Z^2 n_e n_i T^{1/2}$ in LTE. | Cross-section and emissivity require incompatible Noether sea variables or plasma-specific hidden fits. |
| Synchrotron $\gamma^2B$ scaling | derivation target | Recover $\nu_c\propto\gamma^2B$, $P_{\mathrm{syn}}\propto U_B\gamma^2$, and cooling breaks from one effective magnetic-state map. | The $\gamma^2$ frequency scaling is absent, or the $B$ map changes between curvature and emission. |
| Pair thresholds | derivation target | Recover $s\ge4m_e^2c^4$ and the angle-dependent photon-photon threshold while preserving architrino inventory and pair provenance. | Pair channels imply creation from nothing, wrong thresholds, or unbalanced Noether swarm recruitment. |
| Compton-like scattering | derivation target | Recover the Compton shift, Thomson limit, Klein-Nishina correction, recoil, and outgoing photon provenance in one Gate C vertex. | The channel becomes phenomenological frequency loss without a closed recoil and photon ledger. |
| Aharonov-Bohm phase | derivation target | Recover a relative phase proportional to enclosed magnetic flux while the local force channel on the interferometer arms vanishes, using the same effective U(1) connection and photon/action ledger as the rest of Gate C. | The phase requires a local force on the arms, an independent phase fit, or a literal gauge-potential ontology rather than a derived effective connection. |
| Blackbody recovery | derivation target | Recover Planck occupation, zero effective photon chemical potential, thermalization depth, damping, anisotropy, polarization handoff, and redshift handoff without retuning the Noether sea map. | The CMB or thermal branch needs unbalanced photon loading, per-observable retuning, or incompatible transport assumptions. |
| Free photon polarization boundary | derivation target | Use Gate B records for transverse modes, helicity, Malus' law, and analyzer statistics; radiation and cosmology pages may only consume that handoff. | Any radiation channel derives free photon polarization locally, adds a free longitudinal mode, or treats Gate B as already proven. |
| Noether sea-dependent deviations | speculation | State a benchmark-preserving limit and a measurable residual before promoting any $\rho_{\text{NS}}(\mathbf{x},t)$, $\chi_{\text{sea}}(\mathbf{x},t)$, anisotropy, or threshold-floor effect. | A deviation is used to repair a failed standard recovery or is fitted separately per observable. |

### Ontology Watchlist

The foundational ontology hub now keeps only stable commitments. Open questions that used to live there are tracked here or in the relevant branch chapters:

- **Deterministic branch selection:** close the rule for active causal roots, weighted sums, phase-sensitive thresholding, and basin selection in [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md) and [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md). The working hypothesis remains deterministic multistability, with apparent randomness coming from chaotic sensitivity to microstate and wake history.
- **Polarity unit and coupling scale:** explain $\epsilon=|e|/6$ and close $\kappa$ through [Parameter Ledger](../../../../markdown/aaa/validation/parameter-ledger.md), [Architrino SI Base Units](../../../../markdown/aaa/validation/architrino-si-base-units.md), and the charge-mapping chapters. The unresolved question is whether six-site nested shell swarm organization derives the $\epsilon$ unit, and whether $\kappa$ is related to $\epsilon$, $c_f$, $\hbar$, or Planck-alignment quantities rather than being independently postulated.
- **Quantum ontology:** keep wavefunction status, decoherence, and Born-rule recovery in [Wavefunction Ontology](../../../../markdown/aaa/quantum/wavefunction-ontology.md), [Measurement Ontology](../../../../markdown/aaa/quantum/measurement-ontology.md), and the Born-rule tension above. Decoherence still needs a stance on whether its irreversibility is fundamental in the Noether sea environment or practical because reversal is dynamically inaccessible to Physical Observers.
- **Symmetry and conservation:** close CPT stance, baryon-number status, and proton-stability regime through the particle and interaction chapters. The unresolved CPT issue is treated as a replacement constraint in [No-Go Theorems](../../../../markdown/aaa/validation/no-go-theorems.md#applicability-map): the standard proof assumes local relativistic QFT, while this framework uses absolute time and delayed substrate dynamics, so the corpus must preserve tested CPT-facing observables without importing those assumptions as ontology.
- **Cosmological history:** keep beginning/eternity and initial-condition questions in [Cosmology Ontology](../../../../markdown/aaa/cosmology/cosmology-ontology.md), [Expansion Mechanism](../../../../markdown/aaa/cosmology/expansion-mechanism.md), and related cosmology modules. If the background is eternal, the theory still owes a large-scale homogeneity and isotropy account, including a scale-neutral residual comparing dimensionless pair-separation distributions across large windows; if it has an initialization boundary, it owes an architrino-distribution account.
- **Unification claim:** treat "all forces from nested shell swarm geometry and Noether sea dynamics" as a closure program, not as a primitive ontology statement. The qualitative structure exists across interaction chapters, but quantitative derivations remain the acceptance gate.

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

If that intersection becomes empty after quantitative work is done, the present implementation is rejected even if many individual chapters remain suggestive. The detailed sector predicates, benchmark tolerances, and promotion-fiber test are recorded in [Failure Criteria](../../../../markdown/aaa/validation/failure-criteria.md).

### Related Chapters

- [constraint-ledger.md](../../../../markdown/aaa/validation/constraint-ledger.md)
- [closure-scorecard.md](../../../../markdown/aaa/validation/closure-scorecard.md)
- [../assemblies/fermions/quantum-number-mapping.md](../../../../markdown/aaa/assemblies/fermions/quantum-number-mapping.md)
- [../spacetime/gr-phenomenology.md](../../../../markdown/aaa/spacetime/gr-phenomenology.md)
- [../quantum/measurement-ontology.md](../../../../markdown/aaa/quantum/measurement-ontology.md)

## Massive Superposition Gravity

This packet turns massive-superposition gravity experiments into concrete validation targets. It belongs to the observable and inference layer: the task is to preserve the branch mass histories, coherence data, detector response, entanglement data, and record criteria without importing any external collapse ontology or quantum-metric ontology.

Related homes are [Measurement Ontology](../../../../markdown/aaa/quantum/measurement-ontology.md#external-gravitational-which-path-benchmark), [Observer Framework](../../../../markdown/aaa/spacetime/observer-framework.md#boundary-wake-covariance-scaffold), and [Constraint Ledger](../../../../markdown/aaa/validation/constraint-ledger.md#massive-superposition-gravitational-distinguishability).

### Comparison Boundary

The packet may use external classical-quantum gravity proposals as comparison pressure, but only at the level of observables and inference. The comparison rows are:

| External comparison | Retained pressure | $\mathbb{A}\mathbb{A}\mathbb{A}$ use | Not imported |
| --- | --- | --- | --- |
| Oppenheim-style classical-quantum gravity | A classical or effective gravity readout must not reveal branch information while the quantum branch description still shows interference. | Bound $\mathcal{D}_{\mathrm{grav}}$, constrain $N_{AB}$, and require a Physical Observer record before treating gravity-side branch information as a measurement. | Stochastic-metric ontology, fundamental collapse, external terminology, or the claim that gravity must remain classical at the substrate level. |
| Gravitationally induced entanglement | Two isolated massive probes can acquire branch-dependent correlations through gravity alone. | Require the same effective-metric record $\theta$ to generate the branch interaction phase and to keep which-path leakage below the retained weak-probe threshold. | Constructor-theory doctrine, `Q-number` terminology, fundamental graviton ontology, or the claim that spacetime geometry itself has been prepared in superposition. |

Every averaged quantity in this packet is a run-record summary. A covariance matrix, branch expectation value, or correlation function may be used only after the Physical Observer access region, detector channel, boundary-data model, and persistence criterion have been declared. It may not be promoted into a primitive gravity state or collapse mechanism merely because it appears in a successful inference pipeline.

### Experiment-Family Classification

Different laboratory proposals enter this packet at different levels. The classification below keeps the observable pressure while preventing passive phase tests, active branch-mass tests, and mediated-entanglement tests from being treated as one result.

| Experiment family | Retained observable | Packet status | Interpretation guardrail |
| --- | --- | --- | --- |
| guided/free-fall atom-interferometer phase tests | fitted cubic-time phase coefficient $\widehat{\beta}_{T^3}$, fringe visibility, and control-phase record | passive external-field phase benchmark | Confirms or constrains the weak-field phase map; does not by itself test active self-gravity or fundamental collapse. |
| BEC, solid, nanoparticle, nanodiamond, membrane, or cantilever massive-superposition tests | branch mass histories $\rho_1,\rho_2$, visibility $\mathcal{V}(T)$, $\tau_{\text{meas}}$, $\Delta E_G$, and $\mathcal{D}_{\mathrm{grav}}$ | active branch-mass-history benchmark | Tests whether finite-time threshold resolution, ordinary decoherence, and Penrose-Diosi-like collapse scales remain quantitatively distinguishable. |
| two-probe gravitationally induced entanglement tests | cross-branch phase $\Delta\Phi_{\mathrm{ent}}$, entanglement witness $C_{\mathrm{obs}}$, and non-gravitational residual $\mathcal{R}_{\mathrm{nongrav}}$ | mediated-entanglement benchmark | Tests the shared gravity-side constitutive record without importing fundamental graviton ontology or a quantum-metric substrate. |

The packet should classify a run by the strongest observable it actually carries. A passive phase benchmark may constrain $\theta$ for later active-mass tests, but it cannot be used as evidence that gravity has or has not selected a branch. Conversely, an active branch-mass run that loses visibility must still show a record-forming separatrix crossing before the loss is interpreted as measurement rather than uncontrolled environmental decoherence.

### Observable Target

The target experiment compares two branch-level mass-density histories over a coherence window $T$:
$$
\rho_1(\mathbf{x},t),
\qquad
\rho_2(\mathbf{x},t)
$$
The branch pair is interference-preserving only if the apparatus and environment have not produced an autonomous which-path record. The gravitational or effective-metric channel therefore becomes a constraint through the response difference
$$
\Delta h_A(t)
=
h_A(t;\rho_1,\theta)-h_A(t;\rho_2,\theta)
$$
where $A$ labels the resolved detector response channel and $\theta$ is the shared effective-metric constitutive record.

The which-path diagnostic is
$$
\mathcal{D}_{\mathrm{grav}}(T;\theta)
=
\int_0^T\!\!\int_0^T
\Delta h_A(t)\,
N^{-1}_{AB}(t,t';\theta)\,
\Delta h_B(t')\,dt\,dt'
$$
Here $N_{AB}$ is the observer-level covariance decomposed in [Observer Framework](../../../../markdown/aaa/spacetime/observer-framework.md#boundary-wake-covariance-scaffold). It summarizes unresolved deterministic boundary histories and calibrated detector/environment residuals; it is not an ontological randomness postulate.

### Minimal Response Model

A concrete first packet can use a displaced normalized mass packet. Let $\varphi_\sigma$ be normalized by
$$
\int_{\Sigma_t}
\varphi_\sigma(\mathbf{x})\,d^3x
=
1
$$
For branch separation $\mathbf{d}(t)$ around center $\mathbf{x}_0(t)$, set
$$
\begin{aligned}
\rho_1(\mathbf{x},t)
&=
m\,\varphi_\sigma\!\left(
\mathbf{x}-\mathbf{x}_0(t)-\frac{\mathbf{d}(t)}{2}
\right),\\
\rho_2(\mathbf{x},t)
&=
m\,\varphi_\sigma\!\left(
\mathbf{x}-\mathbf{x}_0(t)+\frac{\mathbf{d}(t)}{2}
\right).
\end{aligned}
$$
Let $G_A(t,s;\mathbf{x};\theta)$ be the detector response kernel implied by the same effective-metric constitutive record used for redshift, Shapiro delay, lensing, gravitational-wave speed, and, when the record is extrapolated to compact sources, horizon-scale ring/shadow imaging. The branch response is
$$
h_A(t;\rho_k,\theta)
=
\int_0^t\!\int_{\Sigma_s}
G_A(t,s;\mathbf{x};\theta)\,
\rho_k(\mathbf{x},s)\,d^3x\,ds
$$
Therefore
$$
\Delta h_A(t)
=
\int_0^t\!\int_{\Sigma_s}
G_A(t,s;\mathbf{x};\theta)\,
\left[
\rho_1(\mathbf{x},s)-\rho_2(\mathbf{x},s)
\right]d^3x\,ds
$$
When $\|\mathbf{d}(t)\|$ is small relative to the packet scale,
$$
\rho_1(\mathbf{x},t)-\rho_2(\mathbf{x},t)
=
-m\,d^i(t)\,
\partial_i\varphi_\sigma(\mathbf{x}-\mathbf{x}_0(t))
+
O(\|\mathbf{d}(t)\|^3)
$$
so the leading branch response is
$$
\Delta h_A(t)
\approx
-m\int_0^t
d^i(s)
\int_{\Sigma_s}
G_A(t,s;\mathbf{x};\theta)\,
\partial_i\varphi_\sigma(\mathbf{x}-\mathbf{x}_0(s))\,d^3x\,ds
$$
This gives the first closure equation: a mass displacement history should map to a predicted detector-channel separation before any interpretive claim about classical or quantum spacetime is introduced.

### Mediated Entanglement Comparison

A complementary massive-superposition test asks whether two independently prepared massive probes can become entangled through the gravity-side channel while non-gravitational couplings are suppressed or bounded. This is a positive branch-phase benchmark, not a new ontology. The observable is the final two-probe correlation record, together with the calibration record showing that electromagnetic, spin-spin, thermal, and apparatus cross-talk channels are too small to account for the effect.

Let the two probes be $A$ and $B$, with branch labels $a,b\in\{+,-\}$ and branch mass histories $\rho_A^a(\mathbf{x},t)$ and $\rho_B^b(\mathbf{x},t)$. The same weak-field constitutive record $\theta$ used for redshift, Shapiro delay, lensing, PPN, gravitational-wave speed, compact-source ring/shadow extrapolations, and $\mathcal{D}_{\mathrm{grav}}$ must determine the branch interaction energy
$$
U_{ab}^{\mathrm{eff}}(t;\theta)
=
-G_{\mathrm{eff}}(\theta)
\int_{\Sigma_t}\!\!\int_{\Sigma_t}
\frac{\rho_A^a(\mathbf{x},t)\rho_B^b(\mathbf{y},t)}
{\|\mathbf{x}-\mathbf{y}\|}
\,d^3x\,d^3y
+O(c_0^{-2})
$$
The branch phase is then
$$
\Phi_{ab}(T;\theta)
=
\frac{1}{\hbar}
\int_0^T
U_{ab}^{\mathrm{eff}}(t;\theta)\,dt
$$
Local branch phases can be absorbed into the one-probe descriptions. The entangling invariant is the cross-branch phase combination
$$
\Delta\Phi_{\mathrm{ent}}(T;\theta)
=
\Phi_{++}(T;\theta)+\Phi_{--}(T;\theta)
-\Phi_{+-}(T;\theta)-\Phi_{-+}(T;\theta)
$$
For the ideal equal-amplitude two-branch packet, a first witness target is
$$
C_{\mathrm{GIE}}(T;\theta)
=
\left|
\sin\frac{\Delta\Phi_{\mathrm{ent}}(T;\theta)}{2}
\right|
$$
This formula is an observer-level benchmark. It does not say that the Euclidean void is quantized, that the effective metric is fundamental, or that a graviton field is the native substrate. It says that the same gravity-side constitutive record must produce the branch phase that standard low-energy descriptions would attribute to gravitational mediation.

The comparison is meaningful only when the non-gravitational residual is bounded. Let $\mathcal{R}_{\mathrm{nongrav}}$ collect calibrated electromagnetic, spin-spin, Casimir, thermal, vibration, and apparatus cross-talk contributions to the same entanglement witness. A run can be used as a gravity-side validation target only if
$$
\mathcal{R}_{\mathrm{nongrav}}
\le
\varepsilon_{\mathrm{iso}}
$$
with $\varepsilon_{\mathrm{iso}}$ declared by the apparatus class and retained alongside the covariance record $N_{AB}$.

### Input Record Schema

The packet is evaluated on an explicit run record:

| Field | Symbol | Required content |
| --- | --- | --- |
| branch mass histories | $\rho_1,\rho_2$ | normalized mass-density histories on $\Sigma_t$ over $0\le t\le T$ |
| branch separation | $\mathbf{d}(t)$ | center or multipole separation history with declared packet width $\sigma$ |
| apparatus/environment record | $\mathcal{A}_{\mathrm{rec}}$ | record variable, persistence window, environmental coupling channels, and ordinary decoherence estimate |
| gravity response kernel | $G_A(t,s;\mathbf{x};\theta)$ | detector response derived from the same effective-metric constitutive record used in weak-field gravity |
| mediated-entanglement phase | $\Delta\Phi_{\mathrm{ent}}$ | cross-branch phase predicted from $\rho_A^a,\rho_B^b$ and the shared constitutive record $\theta$ |
| non-gravitational residual | $\mathcal{R}_{\mathrm{nongrav}}$ | calibrated bound on non-gravity channels that could create the observed correlation |
| covariance decomposition | $N_{AB}$ | detector noise, unresolved boundary-wake terms, environmental residuals, and calibration residuals |
| visibility data | $\mathcal{V}(T)$ | observed or predicted interference visibility over the run |
| entanglement data | $C_{\mathrm{obs}}$ | measured or predicted two-probe entanglement witness in the retained readout basis |
| record criteria | $R,\Sigma,T_{\text{rec}}$ | Physical Observer record variable, separatrix, and persistence threshold |

No row may be filled by changing the weak-field metric record after the positive gravity benchmarks have already been fit. The same $\theta$ must be replayable through redshift, Shapiro delay, lensing, PPN, gravitational-wave speed, compact-source ring/shadow extrapolations, and this massive-superposition packet.

### Evaluation Protocol

1. **Normalize the branch histories.** Verify $\int_{\Sigma_t}\rho_k(\mathbf{x},t)\,d^3x=m$ for each branch and each resolved time slice, or record the known mass exchange with the apparatus ledger.
2. **Compute the response difference.** Use one kernel $G_A(t,s;\mathbf{x};\theta)$ to compute $h_A(t;\rho_1,\theta)$, $h_A(t;\rho_2,\theta)$, and $\Delta h_A(t)$.
3. **Assemble the covariance.** Build $N_{AB}=N^{\mathrm{det}}_{AB}+N^{\mathrm{env}}_{AB}+N^{\mathrm{wake}}_{AB}+N^{\mathrm{cal}}_{AB}$, with each term either derived from the apparatus model or bounded by calibration data.
4. **Evaluate distinguishability.** Compute $\mathcal{D}_{\mathrm{grav}}(T;\theta)$ and compare it with $\varepsilon_{\mathrm{wp}}$.
5. **Evaluate record formation.** Compute $\tau_{\text{meas}}$, $\Delta_{\mathrm{rec}}$, and the persistence window from the measurement chapter's record criteria.
6. **Evaluate mediated entanglement when present.** If the run is a two-probe mediated-entanglement experiment, compute $\Delta\Phi_{\mathrm{ent}}$, $C_{\mathrm{GIE}}$, and $\mathcal{R}_{\mathrm{nongrav}}$ from the same run record.
7. **Classify the run.** Use the same output record to assign one of four statuses:

| Status | Conditions | Interpretation |
| --- | --- | --- |
| weak-probe | $\mathcal{D}_{\mathrm{grav}}\le\varepsilon_{\mathrm{wp}}$ and no durable record forms | gravitational response is too weak to act as a which-path record |
| mediated-entangling | $C_{\mathrm{GIE}}\ge C_{\mathrm{obs}}-\varepsilon_C$, $\mathcal{R}_{\mathrm{nongrav}}\le\varepsilon_{\mathrm{iso}}$, $\mathcal{D}_{\mathrm{grav}}\le\varepsilon_{\mathrm{wp}}$, and no durable which-path record forms | the branch phase is strong enough to account for the entanglement witness while the gravity-side readout remains below record threshold |
| record-forming | $\mathcal{D}_{\mathrm{grav}} > \varepsilon_{\mathrm{wp}}$, $\tau_{\text{meas}} < T$, and $\Delta_{\mathrm{rec}}$ stays below threshold through $T_{\text{rec}}$ | the apparatus/environment has formed an autonomous record |
| falsifying | $\mathcal{D}_{\mathrm{grav}}\gg1$ while visibility remains high and no record-autonomy criterion is met | the effective-metric response overproduces observable which-path information |

For a white-noise readout approximation, $N_{AB}(t,t')=S_{AB}\delta(t-t')$, the distinguishability reduces to
$$
\mathcal{D}_{\mathrm{grav}}(T;\theta)
=
\int_0^T
\Delta h_A(t)\,
S_{AB}^{-1}\,
\Delta h_B(t)\,dt
$$
This special case is the first numerical target because it turns the validation packet into a finite time-series calculation once $m$, $\sigma$, $\mathbf{d}(t)$, $G_A$, and $S_{AB}$ are supplied.

### Worked Acceleration Bound

A first sanity bound can use a single acceleration readout channel before introducing a full detector geometry. Suppose the branch displacement is bounded by $\|\mathbf{d}(t)\|\le d_0$, the detector is at distance $R$ from the branch center with $d_0\ll R$, and the weak-field map satisfies $G_{\mathrm{eff}}(\theta)\to G$ in the tested regime. The branch acceleration difference is bounded by
$$
|\Delta h(t)|
\le
\frac{2G_{\mathrm{eff}}(\theta)M d_0}{R^3}
$$
For a white acceleration readout covariance $N(t,t')=S_a\delta(t-t')$, the distinguishability obeys
$$
\mathcal{D}_{\mathrm{grav}}(T;\theta)
\le
\frac{4G_{\mathrm{eff}}^2(\theta)M^2d_0^2T}{R^6S_a}
$$
With benchmark values
$$
M=10^{-14}\,\mathrm{kg},\qquad
d_0=10^{-6}\,\mathrm{m},\qquad
R=10^{-3}\,\mathrm{m},\qquad
T=1\,\mathrm{s}
$$
and an aggressive acceleration-noise amplitude
$$
S_a^{1/2}=10^{-15}\,\mathrm{m\,s^{-2}}/\sqrt{\mathrm{Hz}}
$$
the bound is
$$
\mathcal{D}_{\mathrm{grav}}
\lesssim
1.8\times10^{-12}
\left(\frac{M}{10^{-14}\,\mathrm{kg}}\right)^2
\left(\frac{d_0}{10^{-6}\,\mathrm{m}}\right)^2
\left(\frac{10^{-3}\,\mathrm{m}}{R}\right)^6
\left(\frac{T}{1\,\mathrm{s}}\right)
\left(
\frac{10^{-15}\,\mathrm{m\,s^{-2}}/\sqrt{\mathrm{Hz}}}{S_a^{1/2}}
\right)^2
$$
For a which-path threshold of order unity, this run is deep in the weak-probe class. Solving the same bound for the mass needed to reach $\mathcal{D}_{\mathrm{grav}}\sim\varepsilon_{\mathrm{wp}}$ gives
$$
M_{\mathrm{crit}}
\approx
\frac{R^3}{2G_{\mathrm{eff}}(\theta)d_0}
\sqrt{\frac{\varepsilon_{\mathrm{wp}}S_a}{T}}
$$
or, in the same benchmark geometry,
$$
M_{\mathrm{crit}}
\approx
7.5\times10^{-9}\,\mathrm{kg}\,
\varepsilon_{\mathrm{wp}}^{1/2}
\left(\frac{R}{10^{-3}\,\mathrm{m}}\right)^3
\left(\frac{10^{-6}\,\mathrm{m}}{d_0}\right)
\left(
\frac{S_a^{1/2}}{10^{-15}\,\mathrm{m\,s^{-2}}/\sqrt{\mathrm{Hz}}}
\right)
\left(\frac{1\,\mathrm{s}}{T}\right)^{1/2}
$$
This is not a new ontology or an experimental forecast. It is a scale check: for ordinary mesoscopic masses, gravity-side which-path leakage is negligible unless the branch mass, separation, proximity, coherence time, or readout sensitivity moves by many orders of magnitude. A full detector calculation should replace the scalar factor $2/R^3$ with the tensor response in the Minimal Response Model above.

### Acceptance Criteria

For an interference-preserving run, the metric or gravity-side readout must satisfy
$$
\mathcal{D}_{\mathrm{grav}}(T;\theta)
\le
\varepsilon_{\mathrm{wp}}
$$
For a mediated-entanglement run, the same record must also satisfy
$$
C_{\mathrm{GIE}}(T;\theta)
\ge
C_{\mathrm{obs}}-\varepsilon_C,
\qquad
\mathcal{R}_{\mathrm{nongrav}}
\le
\varepsilon_{\mathrm{iso}}
$$
This combined gate preserves the observable without overclaiming the interpretation: the run tests whether the retained gravity-side constitutive record can generate the observed branch correlation while avoiding premature which-path record formation.

If a which-path record is claimed instead, the measurement chapter's record criteria must also hold:
$$
\tau_{\text{meas}} < T,
\qquad
\sup_{t\in[\tau_{\text{meas}},\,\tau_{\text{meas}}+T_{\text{rec}}]}
\Delta_{\mathrm{rec}}(t;k)
\le
\varepsilon_{\mathrm{rec}}
$$
The failure condition is strict. If $\mathcal{D}_{\mathrm{grav}}\gg1$ while interference visibility remains high and no record-autonomy condition is satisfied, the effective-metric response has overproduced observable which-path information.

The same $\theta$ must also remain compatible with the gravity-side ledger: redshift, Shapiro delay, lensing, PPN parameters, gravitational-wave speed, dispersion, detector-mode bounds, and compact-source ring/shadow extrapolations. A parameter set that fits the massive-superposition channel only by changing the weak-field metric record is not a valid closure.

### Simulation Target

The minimal simulation target is the map
$$
\mathcal{S}_{\mathrm{grav}}:
\left(
m,\sigma,\mathbf{d}(t),T,G_A,N_{AB},R,\Sigma,\rho_A^a,\rho_B^b
\right)
\longmapsto
\left(
\mathcal{D}_{\mathrm{grav}},
\mathcal{V}(T),
\Delta\Phi_{\mathrm{ent}},
C_{\mathrm{GIE}},
\tau_{\text{meas}},
\Delta_{\mathrm{rec}}
\right)
$$
The inputs are the branch mass scale, packet width, separation history, coherence window, detector response kernel, covariance decomposition, record variable, separatrix, and two-probe branch histories when present. The outputs are the gravitational distinguishability, interference visibility, entangling phase, mediated-entanglement witness, finite measurement time, and record-autonomy residual.

The worked acceleration bound supplies the first analytic $\mathcal{D}_{\mathrm{grav}}$ estimate. The mediated-entanglement comparison supplies the first branch-phase target. Full packet closure still requires one numerical or analytic instance that computes the retained outputs from a shared constitutive record and reports whether the branch pair is weak-probe, mediated-entangling, record-forming, or falsifying.

## Validation Simulations

### Architrino

This note records the minimum tier-1 simulation tests that should be passed before any strong self-hit or non-Markovian claims are trusted numerically. Its purpose is narrow: establish provenance-resolved propagation, baseline diagnostics, and a workable history-buffer strategy before moving to richer dynamics.

The file is therefore an implementation-facing checklist rather than a general theory chapter. It should be read as a gate on simulation credibility.

#### Tier-1 Mandatory Unit Tests (Before Self-Hit Claims)

##### Provenance-resolved propagation test
Implement 1-architrino and 2-architrino setups with $\mathbb{U}_{\text{now}}$ sensors arranged on causal rings:
- Verify causal isochron propagation at $c_f$
- Verify correct arrival ordering and phase behavior (per kernel)
- Verify numerical stability of $t_{\text{emit}}$ inversion as $\Delta t \to \Delta t / 2$
- Produce provenance tables showing correct `emitter_id` values and emission times

##### Baseline diagnostics
- Energy/momentum bookkeeping (as defined by the model) must be stable under refinement
- Cross-integrator comparison required for the above propagation test

##### Grid-Based History Strategy

1. **Problem**: Infinite memory cost for particle-based history in self-hit regimes.
2. **Solution**: Use the $\mathbb{U}_{\text{now}}$ Grid as the history buffer. Store potential magnitude/gradient at grid nodes.
3. **Algorithm**: When an architrino requires its self-potential from $t-\Delta t$, query the **grid node** closest to where the particle *was*, rather than indexing the particle list.
4. **Deliverable**: Prove convergence of this grid-based history against analytic causal isochrons.

##### Grid-Based History

* **Memory Strategy:** Use the fixed grid to store potential history.
* **Lookup:** Query grid nodes for history potential values (Order(1) lookup) rather than querying particle history (Order(N)).
* **Validation:** Verify causal isochron propagation and phase ordering on the grid.

### Convergence Tests

This chapter defines the convergence standard for simulations that include self-hit structure and other delayed-memory effects. Its role is to specify which observables are checked, which refinement ladders are required, and what pass/fail thresholds count as numerical control rather than artifact.

Because self-hit dynamics are especially prone to fake structure under poor time or history resolution, this document should be read as a validation gate rather than as optional numerical hygiene.

All convergence claims in this chapter are finite-window claims. Passing the gates below validates the declared observables on the analysis window, with the stated detector set, history horizon, and regulator choices. It does not decide unbounded reachability questions for the full delayed dynamics; those would require a separate theorem about the global flow rather than a stronger convergence plot.

#### Convergence in Non-Markovian (Self-Hit) Dynamics

##### Scope and default observable set

For each claim, compute convergence on a fixed analysis window $W=[t_a,t_b]$ and detector set $\{x_k\}$ using:

- $\Phi(x_k,t)$
- $\|\nabla\Phi(x_k,t)\|$
- self-hit event rate $\lambda_{\text{self}}(x_k)$
- key invariant drift (e.g., normalized energy drift) $\epsilon_E$

##### Comparison metrics (required)

For any observable $Y$ on two runs A (coarser) and B (finer), define
$$
E_{\mathrm{rel}}(Y;A,B)\equiv
\frac{\|R(Y_B)-Y_A\|_{L^2(W,\{x_k\})}}
{\|R(Y_B)\|_{L^2(W,\{x_k\})}+\varepsilon_0},
\qquad \varepsilon_0=10^{-12}
$$
Here $R$ is restriction of the finer run to the coarser sampling grid.

For provenance distributions of solved `t_emit`, define:
$$
D_W \equiv \frac{W_1(P_A,P_B)}{\mathrm{IQR}(P_B)+\varepsilon_0},
\qquad
D_{JS}\equiv \mathrm{JSD}(P_A\|P_B)
$$
where $W_1$ is 1-Wasserstein distance and JSD is Jensen-Shannon divergence.

For delayed source-state interpolation, the run must declare an order-$q$ history interpolation operator $I_h^q$. On a fixed analysis window $W$, define
$$
E_{\mathrm{hist}}(S_\eta;\Delta h,\Delta h/2;W)
=
\frac{
\left(\sum_{m\in W}\|I_{\Delta h/2}^qS_\eta(t_{\mathrm{emit},m})-I_{\Delta h}^qS_\eta(t_{\mathrm{emit},m})\|^2w_m\right)^{1/2}
}{
\left(\sum_{m\in W}\|I_{\Delta h/2}^qS_\eta(t_{\mathrm{emit},m})\|^2w_m\right)^{1/2}+\varepsilon_0
}
$$
For nonsmooth state-dependent delay windows, define the jump residual rows
$$
\mathcal{D}_{\mathrm{jump}}
=
\{(\xi_a,k_a,\ell_a,\xi_{\pi(a)},R_{\mathrm{jump},a})\},
\qquad
R_{\mathrm{jump},a}
=
\frac{|t_{0,\ell_a}(\xi_a)-\xi_{\pi(a)}|}
{\max(\Delta t,\Delta h,\eta/c_f,\varepsilon_0)}
$$

##### Required refinements with pass/fail thresholds

1. Temporal refinement ($\Delta t$ and $\Delta t/2$, plus $\Delta t/4$ for order check):
- Pass if $E_{\mathrm{rel}}(\Phi)\le 0.02$, $E_{\mathrm{rel}}(\|\nabla\Phi\|)\le 0.03$, and $|\Delta\lambda_{\text{self}}|/\lambda_{\text{self}}\le 0.05$.
- Estimated observed order:
$$
p_{\mathrm{obs}}(Y)=\log_2\!\frac{E_{\mathrm{rel}}(Y;\Delta t,\Delta t/2)}
{E_{\mathrm{rel}}(Y;\Delta t/2,\Delta t/4)}
$$
Require $p_{\mathrm{obs}}\ge 0.8$ for at least one primary field channel ($\Phi$ or $\|\nabla\Phi\|$).

2. History-resolution refinement (history step halved or interpolation order increased):
- Pass if $E_{\mathrm{rel}}(\Phi)\le 0.02$, $E_{\mathrm{rel}}(\|\nabla\Phi\|)\le 0.03$.
- Provenance stability mandatory: $D_W\le 0.05$ and $D_{JS}\le 0.02$.
- Delayed-source interpolation stability mandatory whenever delayed states are evaluated from stored history: $E_{\mathrm{hist}}\le\tau_{\mathrm{hist}}$ with $\tau_{\mathrm{hist}}$ declared before the run.

3. Spatial refinement (grid/particle resolution increase):
- Pass if $E_{\mathrm{rel}}(\Phi\text{-map})\le 0.03$ and $E_{\mathrm{rel}}(\nabla\Phi\text{-map})\le 0.05$.
- Self-hit counts and stability-window boundaries must satisfy relative shift $\le 0.05$.

4. Cross-integrator validation (e.g., symplectic vs RK with matched resolution):
- Pass if $E_{\mathrm{rel}}(\Phi)\le 0.03$, $E_{\mathrm{rel}}(\|\nabla\Phi\|)\le 0.05$.
- Provenance agreement must satisfy $D_W\le 0.08$ and $D_{JS}\le 0.03$.
- The cross-integrator report must name solver family, interpolation policy, solver residual controls, and event/restart handling. If the compared runs select different active-root identities or transition statuses, the claim fails even if observable plots are close.

5. Continuum moment refinement when a run promotes a coarse PDE, kinetic moment, or Noether sea transport equation:
- Pass if the retained density/current channel satisfies
  $$
  E_{\mathrm{rel}}(R_{\rho}^{\mathrm{cg}})\le0.03,
  \qquad
  E_{\mathrm{rel}}(R_{P}^{\mathrm{cg}})\le0.05,
  \qquad
  E_{\mathrm{rel}}(R_E^{\mathrm{cg}})\le0.05
  $$
- The moment-closure residual must decrease under temporal, history, and spatial refinement. A continuum plot is not promotion evidence if the next unresolved moment grows or if the memory-current residual is absorbed into fitted constants.

6. Stochastic and response refinement when a run adds Langevin, Fokker-Planck, or fluctuation-response summaries:
- For the first two moments of any declared distribution $P(z,t)$, require agreement with direct event-root ensembles:
  $$
  E_{\mathrm{rel}}(\langle z\rangle)\le0.03,
  \qquad
  E_{\mathrm{rel}}(\operatorname{Cov}(z))\le0.05
  $$
- If a diffusion tensor $D^{ij}(z)$ is inferred from jump or ledger increments, require it to remain positive semidefinite on the retained domain and stable under refinement.
- If a response kernel $\chi_{AB}$ is promoted, require the causal dispersion residual $\mathcal R_{\mathrm{KK}}(\chi_{AB})\le0.05$ on the declared frequency band and require any fluctuation-dissipation residual to be reported from the same record.

7. Revised branch-coordinate model selection when a run changes a reduced branch coordinate, chart partition, or residual basis before rerun:
- The proposed coordinate must declare its source fields, equality map, symmetry quotients, and excluded locked keys before any coefficient fit or rerun.
- The selection report must include a held-out residual check, and it must include a phase-origin check whenever the coordinate uses an observation-phase split.
- The design must remain overdetermined after quotienting, with $N_{\mathrm{eq}}>N_{\mathrm{coef}}$ or $R_{\mathrm{df}}>0$. Report
  $$
  R_{\mathrm{df}}=\frac{N_{\mathrm{eq}}-N_{\mathrm{coef}}}{N_{\mathrm{eq}}},
  \qquad
  \frac{\operatorname{tr}H}{N_{\mathrm{eq}}}\le\frac{1}{2},
  \qquad
  \max_i H_{ii}\le\frac{1}{2}
  $$
  or an explicitly justified equivalent if a linear hat matrix $H$ is not available.
- Branch identity must persist under temporal refinement, history-window refinement, regulator refinement when a regulator is used, and root-ledger refinement. A coordinate that only improves the fitted residual while changing the active branch identity fails model selection.

##### Machine-checkable convergence output

Every promoted claim must emit `convergence_table.csv` with one row for each required gate: temporal refinement, history-resolution refinement, history-interpolation refinement when delayed states are reconstructed from stored history, spatial refinement, cross-integrator validation, regulator ladder when used, transition-window refinement when a fold-layer or active-root status transition is claimed, and negative control. Each row records the two run identifiers being compared, the restricted observable channel, $E_{\mathrm{rel}}(\Phi)$, $E_{\mathrm{rel}}(\|\nabla\Phi\|)$, $D_W$, $D_{JS}$, $E_{\mathrm{hist}}$ when applicable, $p_{\mathrm{obs}}$, active-root mismatch, self-hit or stability-window shift, transition-window status, pass/fail status, and failure code.

For continuum or stochastic promotions, append rows for `moment-closure`, `distribution-moments`, `diffusion-tensor`, `causal-response`, and `fluctuation-dissipation` when those channels are claimed. These rows must include the artifact hash of the direct event-root run and the artifact hash of the reduced continuum or stochastic run being compared.

For revised branch-coordinate promotions, append rows for `branch-coordinate-source`, `branch-coordinate-heldout`, `branch-coordinate-phase-origin` when applicable, `branch-coordinate-design`, and `branch-identity-refinement`. These rows must include the artifact hash of the predeclared coordinate packet and the rerun candidate that consumes it.

The regulator row must include each promoted observable $Y$ and the value of
$$
E_\eta(Y;\eta,\eta/2)
=
\frac{\|R(Y_{\eta/2})-Y_{\eta}\|_{L^2(W,\{x_k\})}}
{\|R(Y_{\eta/2})\|_{L^2(W,\{x_k\})}+10^{-12}}
$$
It also records whether active root-ledger entries match between $\eta$ and $\eta/2$ after matching source, receiver, root class, and branch status. A convergence plot is not promotion evidence unless the table row containing the plotted quantity is present and tied to the campaign artifact hash.

##### Negative control (null test, mandatory)

Run at least one intentionally wrong model choice (wrong history kernel, wrong $c_f$, or perturbed emission-time solver).

Pass condition for the *pipeline* (not the null run): the null run must break expected invariants by a clear margin, with at least one of:

- invariant drift increase by $\ge 5\times$ relative to the validated run,
- provenance instability $D_W>0.10$ or $D_{JS}>0.05$,
- stability-window shift $>0.10$.

If the null run still passes the convergence gates above, treat the claim as numerically unvalidated.

##### Global acceptance rule

A claim is numerically validated only if all applicable refinement gates pass and the null test fails as required. Conditional gates such as revised branch-coordinate model selection apply only when the claim changes the reduced coordinate, chart partition, or residual basis before rerun.

### Perspective

This framework appears to fit a surprising breadth of phenomena not because of any single novelty, but because a small set of simple, mutually reinforcing structural decisions is doing most of the heavy lifting. Two widely discussed choices--reduction to $+\epsilon$ and $-\epsilon$ architrino polarities and choosing $\epsilon=|e|/6$--help with parsimony and observer-level charge bookkeeping, but the outsized wins come from how delayed line-of-action action, Jacobian-weighted causal flux, and same-source causal-root branches conspire to produce stability, scale selection, and emergent "magnetic-like" behavior without ever invoking right-hand-rule cross products.

Historically, general relativity and quantum mechanics are extraordinarily successful as effective theories that summarize large classes of phenomena. We position this neoclassical, delayed line-of-action model as a simpler dynamical substrate whose coherent assemblies recover GR/QM-like phenomenology in appropriate coarse-grained, slow/weak, or phase-locked limits.

We work throughout in units with primitive wake speed $c_f=1$; per-hit accelerations are directed along $\hat{\mathbf{r}}$, weighted by the causal Jacobian, and superpose linearly.

---

#### Delayed Emission on Jacobian-Weighted Isochrons

- What we assume:
- Sources emit potential on expanding causal isochrons with surface density $\propto 1/r^2$, represented distributionally by $\delta(r-\tau)$ with $\tau = t - t_0$.
  - Each causal hit is directed along $\hat{\mathbf{r}}$ from the source history point to the receiver, with received magnitude weighted by the branch Jacobian.

- Why it matters:
  - Gauss-like behavior follows immediately ($1/r^2$ on causal wake fronts).
  - Moving systems automatically generate tangential components in the receiver’s frame due to path-history geometry and causal-flux bunching: the “aim point” is in the past, and source motion enhances or suppresses active branches through the Jacobian. Orbital and vortex-like patterns emerge from delay, not from any $B\propto \mathbf{v}\times\mathbf{E}$ construction.

- Consequence:
  - Many “magnetic” phenomenologies (circulation, axial vortices, flux tubes) can be reproduced as kinematic consequences of delayed, Jacobian-weighted line-of-action pushes. There is no right-hand rule, no cross products, just geometry, flux weighting, and time delay.

---

#### Constant per-wavefront emission

- What we assume:
  - Emission cadence and per-wavefront amplitude are constant at the source.

- Why it matters:
  - Simplifies calibration and emphasizes that stability and scale selection arise from delay and self-interaction. Receiver motion influences instantaneous power via $\mathbf{F}\cdot\mathbf{v}$ through the radial component $v_r$, while source motion modulates the received force magnitude through the Jacobian.
  - With $\eta$-mollification ($\delta\to\delta_\eta$), the calculation can define $\Phi_\eta$ and verify $\Delta E_k=-\Delta U$ on resolved intervals while still taking $\eta\to 0$ for sharp impulses.

---

#### Self-Hit Root Onset

- What we assume:
- Same-source self-hit is accepted only when the root equation
  $$
  \mathcal{C}_{aa}(t)=\{\,s<t:\|\mathbf{x}_a(t)-\mathbf{x}_a(s)\|=c_f(t-s)\,\}
  $$
  is nonempty and the active root passes the transversality/Jacobian floor. A speed excursion above $c_f$ is a necessary warning condition for simple nontrivial roots, not a sufficient criterion.
  - Self-hits are always repulsive (like-on-like).

- Why it matters:
  - This nonlinearity is the core stabilizer. Strictly sub-field-speed interval history rules out nontrivial self-hit roots on that interval, while super-field-speed curved history can open an internal, strong, repulsive channel that balances or overtakes inward trends.
  - Scale selection emerges: the balance of delayed attraction with self-repulsion defines a smallest sustainable orbital radius d0 and a fastest natural frequency, yielding a canonical time unit t0.

---

#### Superposition with isochrons and $\eta$-regularization

- What we assume:
- All wake contributions superpose linearly at the level of distributions (isochrons add).
- We use a narrow Gaussian isochron $\delta_\eta$ when continuous-time derivatives are needed.

- Why it matters:
  - Locality: inverse-square geometric weighting together with finite-speed branch selection makes nearby coherent roots dominant, but infinite populations still require an explicit cutoff, screening rule, cancellation estimate, sampled mean field, or principal-value/mean-field subtraction.
  - Bookkeeping: with $\delta_\eta$, standard ODE solvers can integrate numerically; with $\delta$, the analysis can reason about impulses and events. Both views agree in the $\eta\to 0$ limit for integrals over resolved intervals.

---

#### Assembly grammar -> nested shell swarm and flux tubes

- What we assume:
  - Binary orbits are the base motif; binaries can nest with wide scale separation; a nested shell swarm is dynamically robust.
  - Polar regions of fast binaries host persistent axial structures (vortex-like loci in the delayed wake geometry), which couple between assemblies.

- Why it matters:
  - Color-like structure arises naturally from three internal binaries: distributing axial architrinos across three axes creates three distinguishable, yet symmetric, configurations.
  - Flux-tube-like coupling is not a particle exchange but a persistent geometric linkage between polar vortices—consistent with confinement-like phenomenology without invoking a separate gauge field.

---

#### Charge quantization at $\epsilon$=|e/6|

- What we assume:
  - The architrino polarity magnitude is $\epsilon$, so observer-level quark electric charges are integers of $\epsilon$.

- Why it matters:
  - Observed quark fractions (±1/3, ±2/3 of e) become ±2$\epsilon$ and ±4$\epsilon$ integers in the natural unit. This removes “fractionality” at the fundamental level and simplifies assembly rules and conservation statements.

---

#### Consequences that explain the “fit”

- Stability without fine-tuned potentials:
  - The $\|\mathbf{v}\| = c_f$ switch and delay geometry set operating points and prevent singular collapse.
- Scale emergence:
  - $d_0$ and $t_0$ arise from dynamics; they are not postulated rulers and clocks but attractors of the binary system.
- Shielding and apparent inertia:
  - Fast internal motion produces far-zone cancellation; the tiny residual wake signature of a coherent assembly behaves like inertial mass in interactions with the outside.
  - Magnetism without magnetism:
  - Tangential effects and axial structures appear as a corollary of path-history plus Jacobian-weighted line-of-action per-hit action. No cross products required.

---

#### What the model explicitly does not use

- No Lorentzian spacetime metric at the fundamental level (background is absolute time + Euclidean space; emergent cones are effective, not kinematic).
- No right-hand-rule magnetism or $\mathbf{v}\times\mathbf{B}$ forces; every per-hit action is along $\hat{\mathbf{r}}$.
- No gauge field inventory beyond architrino causal wakes; interaction carriers are the geometry of delayed isochrons and their couplings.

---

#### Validation and next steps (concrete)

1) Far-field cancellation and the zero-potential axis
- Compute the time-averaged multipole expansion of a high-frequency binary; show leading terms cancel along the rotation axis and decay rapidly off-axis.
- Observable: a “quiet line” (near-zero net potential) threading the binary.

2) Scale selection for $d_0$ and $t_0$
- With $\delta\to\delta_\eta$, compute the mean inward attraction from the partner versus the mean outward self-repulsion across one orbit; the fixed point defines $d_0$ and the maximum orbital frequency $2\pi/t_0$.
- Prediction: the same $d_0$ appears across binaries with the same $\epsilon$ and $c_f$, independent of initial conditions after sufficient relaxation.

3) Energy consistency across the $\|\mathbf{v}\|=c_f$ transition
- Use $\Phi_\eta$ to evaluate $U$ and verify $\Delta E_k = -\,\Delta U$ across events that cross the self-hit onset boundary; in the $\eta\to 0$ limit, impulses integrate to the same work.

4) Numerical recipe (robust, minimal assumptions)
- For each receiver time $t$: (i) root-find causal emission times $t_0$ for all sources (and self), (ii) discard non-physical roots ($H(0)=0$, handle $r=0$ by symmetry), (iii) sum $a_{o′\leftarrow o}(t;t_0)$, (iv) integrate velocity and position with an event-aware scheme. Use $\varepsilon$-thickening for smooth integration when needed.

---

#### Comparisons and falsifiable edges

- Classical E&M:
  - Replace Maxwell + Lorentz force with delayed, radial-only action; predict the same far-zone radiation patterns for coherent assemblies but different near-zone dynamics when $\|\mathbf{v}\|\approx c_f$ or self-hits occur.
- QCD phenomenology:
  - Confinement-like behavior emerges from polar-vortex coupling; falsifiable via constraints on hadron breakup channels and energy distributions if the coupling geometry is perturbed.
- Inertia/apparent mass:
  - Predicts context-dependent inertia from shielding; assemblies in different internal phases could exhibit small, measurable variations in response to identical external effective fields.

---

#### Open Closure Questions

- Exact analytic forms for d0 and t0 in the symmetric binary with the canonical modulation.
- Rigorous conditions for uniqueness/multiplicity of causal roots in accelerated motion and their contribution to stability.
- Statistical mechanics of many-body wake structures: when and how do coherent, Lorentz-consistent effective cones emerge from moving-assembly deformation, clock/ruler retuning, and Noether sea response, and with what characteristic speed relative to the declared branch speed $c_\star$?

Plain language summary: radial hits, time delay, constant per-wavefront amplitude, and self-hit for fast movers are enough to produce stable orbits, natural rulers and clocks, shielding that looks like inertia, and “magnetic-like” structures without right-hand-rule magnetism.

---

#### Effective observables and states (quantum-like layer)

Premise: single-hit information is sparse. At an instant, a receiver learns only (i) the net magnitude of the push and (ii) an unoriented line of action through its current position. The $\mathbb{U}_{\text{now}}$ universe-state perspective can include the full source-tagged emission ledger as complete-state bookkeeping, but a local receiver or Physical Observer cannot infer that hidden ledger from a single hit.

- Emission ledger (microstate): the set of tuples $(t_0,\mathbf{s}_j(t_0),\mathbf{v}_j(t_0),q_j)$ over all sources $j$ that causally affect the receiver.
- Observational map: ledgers map to histories of hits $\{A(t_k),L(t_k)\}$ across one or more receivers and over time.
- Observational equivalence: two ledgers are equivalent if they induce indistinguishable hit histories at the chosen resolution (including mollifier width $\eta$, temporal sampling, and receiver geometry).

- Coarse-grained PDE observables (Method 1):
  - Number density $n(\mathbf{x}, t)$: count-per-volume of architrinos.
  - Polarity density $\rho(\mathbf{x}, t)$: net $+\epsilon-\epsilon$ per unit volume; natural source term in continuum PDE variants.
  - Energy density $\mathcal{E}(\mathbf{x}, t)$: local kinetic + potential energy density for validation and conservation checks.
  - Use: these fields are the natural inputs/targets for grid-based PDE runs and for validating event-driven simulations in aggregate.

Observability axioms:
- A1 Single-hit observables are magnitude $A$ and an unoriented line $L$; orientation along $L$, source identity, distance $r$, and emitter speed $\|\mathbf{v}_{\mathrm{em}}\|$ are not individually observable at an instant.
- A2 All practical observables are functionals of hit histories across time and receivers; unique micro inversion is generically impossible.
- A3 An effective “state” is a probability measure over observationally equivalent ledger classes, updated as new hits arrive.

Bayesian operational stance:
- State update = conditioning on new hit histories; active interventions (changing receiver geometry/filters) alter future histories and thus the posterior over ledger classes.

Plain language: a receiver never sees the full ledger of who emitted what; it sees only a time series of push magnitudes and lines. The appropriate language is therefore statistical over micro-histories that fit those pushes.

---

#### $\mathbb{U}_{\text{now}}$ Note: Limits of Perfect Clocks and Frames

Absolute time and Euclidean frames remove coordinate ambiguity (synchronization and alignment) but not physical ambiguity:
- Sign/side ambiguity: attraction from +$\epsilon$ on one side vs repulsion from −$\epsilon$ on the opposite side along the same line remain indistinguishable at an instant.
- Baseline distance scaling plus Jacobian modulation: $A \propto 1/(r^2 |J|)$; emitter speed affects both the timing of causal roots and the received per-hit amplitude through the branch Jacobian.
- Collinear superposition: several sources along the same unoriented line can sum to the same instantaneous A and L.
- Self-hit aliasing: self-intersections can mimic external sources along L.
- Surrogate location recast: any instantaneous hit may be recast to a stationary surrogate source placed somewhere along L with an adjusted emission time; useful for inference and visualization, but it does not resolve the sign/side ambiguity or fix distance without temporal data.

Consequence: embedded observers and synthetic detector records must reason statistically over ledger classes. The $\mathbb{U}_{\text{now}}$ universe-state perspective can compare those classes against the complete ledger, but the observer-accessible data remain many-to-one; “quantum-like” observability is not a contradiction but a necessity.

---

#### Single-source multi-hit nuance vs universal superposition

Even for a single source, the receiver cannot be sure that a given shove did not come from multiple distinct emission times $t_0 \in \mathcal{C}_{o'j}(t)$ on that same source. When $\|\mathbf{v}_j\| > 1$ or the source trajectory curves, several roots of $r = v(t - t_0)$ can occur and arrive in close succession along the same unoriented line of action, contributing separate per-hit pushes that are locally indistinguishable as to origin.

However, this is not the dominant practical difficulty. The governing issue is global superposition: at any instant the net field is the linear sum of contributions from all architrinos in the universe whose causal isochrons intersect the receiver “now.” While inverse-square surface dilution and Jacobian weighting usually make nearby sources dominate, the mapping from the universal emission ledger to observed hit histories remains vastly many-to-one. Consequently, inference must be temporal, statistical, and multi-view, not a frame-perfect instantaneous inversion.

---

#### Operational noncommutativity and contextuality (emergent)

Measurement procedures are interventions that condition future hit histories:
- Let $F,G$ be experimental contexts (e.g., planar-mode analyzers, path blockers, timing gates). Because they modify trajectories and thus the set of future causal roots, their composition generally satisfies $F\circ G\ne G\circ F$ at the level of observed statistics.
- Contextuality: the distribution over ledger classes that best explains data depends on which filters were applied and in what order; the outcomes are context-dependent without invoking microscopic cross-product forces.

Plain language: a present intervention changes which pushes will be recorded later; doing $A$ then $B$ is not generally the same as doing $B$ then $A$.

---

#### Interference and amplitude-squared from planar-mode overlap

Linear superposition at the isochron level plus coherent geometry yields interference-like patterns in aggregates:
- Photon planar-mode ledgers from multiple sources add linearly at the effective-amplitude level; a detector that integrates over a small time window and area effectively accumulates a complex amplitude $A_{\mathrm{mode}}$ from coherent sub-bundles.
- Intensity emerges as an overlap norm proportional to $|A_{\mathrm{mode}}|^2$ under time/ensemble averaging of phase-like structure encoded by path histories.
- Polarization example (already used): Malus’s law arises as a geometric projection of a planar mode's transverse ledger onto an analyzer axis, giving $\cos^2\theta$ transmission without right-hand-rule magnetism.

Plain language: aligned planar-mode records add, misaligned ones cancel, and the recorded strength scales like the square of the pattern overlap.

---

#### Reconstruction Under Information Bounds

Instantaneous inversion is ill-posed; reconstruction is temporal, multi-view, and prior-guided:
- Multi-receiver geometry: use separated receivers to triangulate unoriented lines at the same t; intersecting rays yield two-sided candidate loci.
- Time-series constraints: track L(t) and timing-derived r(t) proxies; curvature and rotation of L constrain source paths.
- Active probing: vary receiver motion/filters to sample different roots and break degeneracies.
- Priors: charge inventories, speed bounds, assembly templates (e.g., binaries, planar-mode statistics) shrink the hypothesis space.
- Estimation: run Bayesian filters or particle sets over ledger classes; update with each hit; report identifiability and uncertainty, not single-point “sources.”

---

#### Worked micro-to-effective examples

- Two-planar-mode interference:
  - Setup: two coherent photon planar modes reach a screen. The observed intensity pattern is the squared norm of their geometric overlap along the screen, set by relative phase encoded in path history.
  - Which-way intervention: inserting a context that disrupts one planar mode's coherence changes the ledger classes and removes the overlap term, flattening the pattern.

- Polarization analyzer:
  - The analyzer projects the planar mode's transverse ledger onto its axis; transmission $\propto \cos^2\theta$ follows immediately from geometric projection.

- Sequential filters (order matters):
  - Two non-parallel analyzers F($\theta$₁) and G($\theta$₂) applied in different orders yield different transmitted patterns because they recondition future causal roots differently: F∘G ≠ G∘F.

---

#### Falsifiable edges and tests (observability-focused)

- Context order test: demonstrate order-dependent transmission with sequential analyzers on coherent planar modes; quantify the asymmetry F∘G vs G∘F.
- Planar-mode interference robustness: map how partial decoherence (deliberate jitter in source paths) suppresses the overlap term; compare to predicted $|A|^2$ decay with coherence length.
- Multi-receiver triangulation under ambiguity: show that two-sided localization from unoriented lines plus time series reduces, but does not eliminate, sign/side and distance–speed degeneracies—matching Step 9 limits.
- Bell-type correlation target (open): assess whether planar-mode phase models with absolute time can reproduce observed $\cos(2\theta)$ correlations across separated analyzers without hidden cross-product forces; treat Tsirelson-like bounds as a stringent benchmark.

Plain language: we can test the framework by checking order effects, interference weakening when we scramble coherence, and how much multiple receivers really help; reproducing quantum correlations is the toughest, and we flag it as an explicit target.

### README

This note is the launch overview for the simulation branch. It explains the common simulation frame, the role of the virtual $\mathbb{U}_{\text{now}}$ universe-state perspective, and the separation between raw microstate logging and detector-level synthetic observables.

Use it as the top orientation document before reading the more specialized [Simulation Run Protocols](../../../../markdown/aaa/validation/simulations/run-protocols.md), convergence checks, action-energy notes, the [$A_0$ branch certificate protocol](../../../../markdown/aaa/validation/simulations/a0-branch-certificate-protocol.md), the [$A_0$ Tier 0 result interpretation](../../../../markdown/aaa/validation/simulations/a0-tier0-result-interpretation.md), the [Nested Shell Swarm Action-Increment Protocol](../../../../markdown/aaa/validation/simulations/nested-shell-swarm-action-increment-protocol.md), the [Retuning-Map Toy Model](../../../../markdown/aaa/validation/simulations/retuning-map-toy-model.md), the [Cosmology Shared Residual Fit Protocol](../../../../markdown/aaa/validation/simulations/cosmology-shared-residual-fit.md), the [Redshift-Budget Toy Model](../../../../markdown/aaa/validation/simulations/redshift-budget-toy-model.md), the [Static Response Vector Toy Model](../../../../markdown/aaa/validation/simulations/static-response-vector-toy-model.md), and the [Hydrogen $\Gamma_N$ Spectral Coefficient Row Toy Scan](../../../../markdown/aaa/validation/simulations/hydrogen-gamma-n-spectral-row-toy-scan.md).

#### Simulation Frame: Virtual $\mathbb{U}_{\text{now}}$ Perspective

- All tiers are implemented in the absolute Euclidean frame (fixed x,y,z; absolute t).
- The simulator effectively plays the role of the $\mathbb{U}_{\text{now}}$ universe-state perspective by integrating the master equation and maintaining $S(t)$.
- Raw outputs are $\mathbb{U}_{\text{now}}$-style (fields, provenance, microstate summaries).
- “What experiments see” is generated by post-processing: embed detector assemblies with worldlines $\mathbf{X}_{\text{det}}(t)$, compute $\tau_{\text{det}}(t)$, and generate detector-like logs.

Checklist per tier:
- What $\mathbb{U}_{\text{now}}$ records ($\Phi$, $\nabla\Phi$, Noether sea variables, provenance)
- How to compute physical observables ($\tau$, redshift, lensing proxies, public gravitational-wave packet outputs: detector strain, phase, event energy ledger, timing residuals, and provenance)
- Convergence requirements for each output type
- For the first mass-map target, how the $A_0$ Tier 0/Tier 1 branch certificate is separated from later energy, shielding, and Noether sea response interpretation
- For Tier 0 rows, how active roots, raw roots, excluded near-zero self roots, residual semantics, and promotion gates should be read before any Tier 1 continuation

##### Simulation Frame and the $\mathbb{U}_{\text{now}}$ universe-state perspective

All simulation tiers are implemented in the absolute frame:

- **Spatial frame:** fixed Cartesian grid in the Euclidean void, $(x,y,z)$ constant in time.
- **Temporal frame:** global absolute time $t$, advanced in discrete steps $\Delta t$.
- **Microdynamics:** architrino positions and velocities updated according to the master equation; potentials propagated at speed $c_f$.

From the code’s perspective, we are always the **$\mathbb{U}_{\text{now}}$ universe-state perspective**:

- We know $S(t)$ (all architrinos, all assemblies) at each time step.
- We can compute fields and Noether sea state anywhere in the domain.

To connect to experiment:

- We embed **model detectors** (assembly worldlines) in this frame.
- We compute:
  - What fields they experience along their paths,
  - How their internal clocks tick ($\tau$ vs t),
  - What signals they register (arrival times, redshifts, intensity patterns).
- Synthetic observables are derived from these detector responses, not from raw $S(t)$ directly.

This enforces a clean separation between:

- Fundamental dynamics in the absolute frame (what the simulation integrates),
- Emergent observational physics (what real experiments would see).

### Run Protocols

This chapter defines the mandatory runtime protocol for simulations carried out in the absolute-frame implementation of the theory. Its role is to standardize the frame, logging requirements, provenance bookkeeping, metadata, and acceptance gates so results from different runs can be compared and audited coherently.

The opening gives the top-level simulation rule set; the later sections unpack the absolute-frame interpretation and the required $\mathbb{U}_{\text{now}}$ instrumentation in more detail.

#### Master Simulation Protocol (Absolute Frame)

1. **Coordinate Anchor**: All simulations run on a fixed Cartesian grid chosen as the coordinate scaffold for the Euclidean void. `Grid[x][y][z]` is a chart address, not an intrinsic label in the void.
2. **Clock Rate**: The simulator uses a global `Time` counter (absolute $t$). No relativistic scaling is applied to the integration step itself.
3. **$\mathbb{U}_{\text{now}}$ universe-state interface**: Every run must instantiate an array of fixed virtual sensors to log $\Phi$ and $\nabla\Phi$ at declared absolute-frame grid addresses.
4. **Noether sea Initialization**: Low-excitation Noether sea runs must pre-populate the grid with a lattice of coupled pro/anti Noether swarms to simulate Noether sea influence on test particles.
5. **Convergence**: $\Delta t$ refinement must be accompanied by "History Resolution" refinement to ensure self-hit calculations are numerically stable.
6. **Campaign Packet**: Any run used for a proof certificate, branch-certificate gate, or promoted validation claim must emit a machine-checkable packet rather than only plots or summaries.

#### Simulation Campaign Object

Every promoted numerical claim is carried by a campaign object, not by an isolated plot or best-fit table:
$$
\mathcal{C}_{\mathrm{sim}}
=
\big(
\mathsf{id},
S_\eta,
\mathcal{G}_h,
\Delta t,
\eta,
I_h^q,
\mathcal{L}_{\mathrm{root}},
\mathcal{T}_{\eta},
\mathcal{R}_{\mathrm{branch}},
\Pi_{\mathbb{U}_{\text{now}}},
\mathcal{E}_{\mathrm{conv}},
\mathcal{F}
\big)
$$
Here $\mathsf{id}$ fixes the run identifier and source commit, $S_\eta$ is the regularized state history, $\mathcal{G}_h$ is the spatial and history mesh, $\Delta t$ is the absolute-time step, $\eta > 0$ is the causal-wake regularization width, $I_h^q$ is the declared order-$q$ history interpolation operator, $\mathcal{L}_{\mathrm{root}}$ is the causal-root ledger, $\mathcal{T}_{\eta}$ is the transition-record family for fold-layer, separator, or active-root status windows, $\mathcal{R}_{\mathrm{branch}}$ is the named branch-residual vector, $\Pi_{\mathbb{U}_{\text{now}}}$ is the provenance log, $\mathcal{E}_{\mathrm{conv}}$ is the convergence-measure vector, and $\mathcal{F}$ is the finite failure-code set.

The state history is
$$
S_\eta(t)
=
\{(\mathbf{x}_i(t),\mathbf{v}_i(t),q_i)\}_{i=1}^{N},
\qquad
S_{\eta,t}(\theta)=S_\eta(t+\theta),\quad \theta\in[-h,0]
$$
A Tier 1 packet must state whether this history is evaluated in $C^1([-h,0])$, $W^{1,\infty}([-h,0])$, or a stricter history class. A missing history class is an incomplete artifact, because the delayed source-state evaluation cannot be audited without it.

The mesh and interpolation record is
$$
\mathcal{G}_h=(\Omega_h,\Delta x,\{x_k\}_{k=1}^{K},\Theta_h,\Delta h,\mathsf{bc})
$$
where $\Omega_h\subset\mathbb{R}^3$ is the Euclidean-void computational domain, $\{x_k\}$ are the fixed $\mathbb{U}_{\text{now}}$ sample points, $\Theta_h\subset[-h,0]$ is the stored path-history mesh, $\Delta h$ is the history resolution, and $\mathsf{bc}$ records boundary conditions. The interpolation operator $I_h^q$ is part of the packet; delayed source states cannot be reconstructed by an implicit or undocumented lookup rule.

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
where every component is a ratio with passing threshold $1$. The component meanings are:

| Component | Required role |
| --- | --- |
| $D_{\mathrm{branch}}$ | largest branch residual divided by its declared tolerance |
| $D_{\mathrm{ref}}$ | temporal refinement residual for $\Phi$, $\|\nabla\Phi\|$, and self-hit rate |
| $D_{\mathrm{ord}}$ | observed-order gate for the retained primary field channel |
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
\max_a\mathcal{D}_{\mathrm{exec},a}\le 1,
\quad
\Delta_{\mathrm{root}}(\Delta t,\Delta t/2)=0
$$
$$
\Delta_{\mathrm{root}}(\Delta h,\Delta h/2)=0,
\quad
\Delta_{\eta,\mathrm{root}}=0,
\quad
\mathsf{NullFail}=1,
\quad
\mathsf{Artifacts}=1
$$
Here $\mathsf{NullFail}=1$ means the negative control violates at least one required null-test margin, and $\mathsf{Artifacts}=1$ means every required artifact exists with a content hash and source commit.

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
It names the source certificate, initial history, analysis window, branch label, expected active-root classes, branch tolerances, convergence tolerances, regulator ladder, negative-control mutation, and required output channels before the run starts.

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
A proof packet may cite a simulation only through this handoff. It must state whether every expected active root was matched under $\Delta t$, $\Delta h$, and $\eta$ refinement, which residual component controls the verdict, and which artifact contains each value.

**Lemma (simulation-promotion criterion).** Let $Q$ be a priority-theory claim whose variables are contained in $\mathcal{C}_{\mathrm{sim}}$, and let $R_1$ be a Tier 1 continuation of a Tier 0 candidate $R_0$. If $R_0$ satisfies the Tier 0 acceptance criteria, $R_1$ satisfies the Tier 1 acceptance criteria, the negative control fails as required, and
$$
\max_a\frac{\mathcal{E}_{\mathrm{ref},a}}{\tau_{\mathrm{ref},a}}\le 1,
\qquad
\max_a\frac{\mathcal{E}_{\mathrm{prov},a}}{\tau_{\mathrm{prov},a}}\le 1,
\qquad
\max_a\frac{\mathcal{E}_{\mathrm{cons},a}}{\tau_{\mathrm{cons},a}}\le 1
$$
$$
\max_a\frac{\mathcal{R}_{\mathrm{branch},a}}{\tau_{\mathrm{branch},a}}\le 1,
\qquad
\max_Y\frac{E_\eta(Y)}{\tau_{\eta,Y}}\le 1
$$
with all tolerances declared before the run, then the result may be promoted from numerical candidate to simulation-supported priority claim for $Q$. This lemma does not convert a simulation-supported priority claim into an analytic theorem; it authorizes proof-program routing only with artifact hashes and the failure-code ledger attached.

#### $A_0$ Branch-Certificate Protocol

The first mass-map target has a specialized protocol in [$A_0$ Branch Certificate Protocol](../../../../markdown/aaa/validation/simulations/a0-branch-certificate-protocol.md), with Tier 0 row semantics summarized in [$A_0$ Tier 0 Result Interpretation](../../../../markdown/aaa/validation/simulations/a0-tier0-result-interpretation.md). That protocol separates four stages:

1. Tier 0 algebraic branch search for finite root-ledger candidates.
2. Tier 1 $\eta > 0$ delayed-dynamics continuation and Floquet diagnostics.
3. Tier 2 internal-energy and shielding extraction.
4. Tier 3 Noether sea response tensor probes.

A rerun after a finite-coordinate no-go must include the predeclared branch-chart revision record; residual-selected coordinates, locked keys promoted into branch geometry, or benchmark-derived inputs invalidate the packet as hidden fitting.

After the current compact scalar-basis no-go, an $A_0$ rerun must also predeclare the corrected one-period branch-equation basis, the non-circular carrier correction if used, the residual-balance ledger, held-out residual rule, and failure code before it can proceed to $\Delta_{\mathbf{k}}$ or $\eta$-ladder persistence.

No simulation run should report $\zeta(A_0)$, $E_{\text{internal}}(A_0)$, or $\mathcal{M}_{\text{sea}}^{ab}$ as accepted outputs unless the preceding branch-certificate gates have passed.

#### Cosmology Shared-Residual Protocol

The first cosmology-facing validation scaffold is [Cosmology Shared Residual Fit Protocol](../../../../markdown/aaa/validation/simulations/cosmology-shared-residual-fit.md). It specializes the campaign-packet rule to the shared dark-energy and cosmology calibration gate. The packet tests whether SN, BAO, CMB, weak-lensing, redshift-space-distortion, BBN, and pre-BBN branch residuals can consume one $\theta_{\mathrm{sea}}$ without per-observable retuning.

No cosmology packet should report a promoted dark-energy, $H_0$, $S_8$, BBN, CMB, or growth closure unless its ordinary residuals and cross-family projection penalty are both inside declared tolerances.

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
Here $\mathcal{D}$ names the detectors, $\mathcal{S}_h$ names the strain files, $\mathcal{P}_{\mathrm{PE}}$ names posterior-sample and parameter-estimation records, $\mathcal{P}_{\mathrm{wave}}$ names the waveform-family or numerical-relativity provenance, $\mathcal{Q}_{\mathrm{det}}$ carries calibration, data-quality, injection-mask, down-sampling, and glitch-treatment records, $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ is the event conservation ledger, $\mathcal{R}_{\mathrm{GW}}$ is the residual vector, and $\Pi_{\mathrm{wave}}$ maps each fitted or plotted sample back to public artifacts.

The residual vector is
$$
\mathcal{R}_{\mathrm{GW}}
=
\big(
R_h,R_\phi,R_E,R_J,R_{c_g},R_{\mathrm{det}},R_{\mathrm{PE}},R_{\mathrm{prov}}
\big)
$$
$R_h$ compares whitened or otherwise declared detector strain on the predeclared analysis window; $R_\phi$ compares unwrapped inspiral-merger phase on the declared frequency band; $R_E$ checks source masses, remnant mass, radiated energy, recoil, ejecta or heat-channel terms, and boundary exchange in one conservation ledger; $R_J$ checks angular-momentum accounting when the packet claims spin or recoil closure; $R_{c_g}$ is used only for multimessenger timing rows; and the final three residuals are provenance-completeness checks.

For a multimessenger row,
$$
R_{c_g}
=
\frac{\Delta t_{\mathrm{obs}}-\Delta t_{\mathrm{src}}}{D_L/c_\gamma},
\qquad
\Delta t_{\mathrm{obs}}=t_\gamma-t_{\mathrm{GW}}
$$
The intrinsic source-emission delay $\Delta t_{\mathrm{src}}$ must be declared before fitting the gravity-channel speed. A packet fails as hidden tuning if it absorbs photon/gravity timing into an undeclared source delay, changes the analysis band after inspecting residuals, substitutes a cleaned strain product without recording a new provenance row, or changes waveform family after comparing to the data.

The minimum artifact list is `event.json`, `strain_files.json`, `detector_quality.json`, `parameter_estimation.json`, `waveform_provenance.json`, `analysis_window.json`, `strain_residuals.csv`, `phase_residuals.csv`, `energy_ledger.csv`, `speed_residual.json` when applicable, `artifact_hashes.json`, and `failure_report.md`. For long binary-neutron-star inspirals the packet must also include a glitch/cleaning row, a low-frequency cutoff row, and a reason if any detector is excluded from a visible-strain comparison. For short binary-black-hole benchmarks the packet must include an inspiral-merger-ringdown window, detector arrival-time comparison, and ringdown handoff row.

The normalized public-data diagnostic is
$$
\mathcal{D}_{\mathrm{GW}}
=
\big(
D_h,D_\phi,D_E,D_{c_g},D_{\mathrm{det}},D_{\mathrm{PE}},D_{\mathrm{prov}}
\big)
$$
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
$D_{\mathrm{det}}$, $D_{\mathrm{PE}}$, and $D_{\mathrm{prov}}$ are binary completeness ratios whose value is `0` only when detector masks/calibration, parameter-estimation release metadata, and artifact hashes are all present. A packet can support a promoted gravitational-wave claim only if
$$
\max_a\mathcal{D}_{\mathrm{GW},a}\le 1
$$
and the public-data provenance row was fixed before waveform comparison.

The first benchmark triad is:

| Packet row | Required public-data role | Failure routed if missing |
| --- | --- | --- |
| `GW150914_short_bbh` | Short inspiral-merger-ringdown strain, two-detector arrival timing, radiated-energy ledger, numerical-relativity waveform provenance, and ringdown handoff | $\mathsf{artifact\_incomplete}$ or $\mathsf{hidden\_tuning}$ |
| `GW170817_long_bns` | Long inspiral strain, three-detector timing, glitch/cleaning provenance, chirp-mass phase benchmark, and parameter-estimation waveform-family record | $\mathsf{provenance\_discontinuity}$ or $\mathsf{mesh\_nonconvergence}$ |
| `GW170817_GRB_speed` | Photon/gravity timing residual with luminosity distance, observed delay, and intrinsic source-emission lag nuisance | $\mathsf{hidden\_tuning}$ or $\mathsf{conservation\_drift}$ |

This public benchmark packet is a success marker under the existing simulation provenance and conservation gates, not a new gate family. Its value is that public strain, parameter-estimation samples, waveform provenance, and multimessenger timing make strong-field radiation tests replayable without importing GR waveform success as $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology.

#### Tier 0 / Tier 1 Campaign Packet

Tier 0 and Tier 1 results are accepted only through an auditable campaign packet. The packet must include the source commit, pre-run tolerances, root ledger, branch residual vector, convergence table, $\eta$ ladder when a regulator claim is made, declared history interpolation, failure report, and artifact hashes. When a run crosses a fold-layer, separator, or active-root status transition, the packet must also include transition records for that window.

The minimum Tier 0 packet contains `campaign.json`, `mesh.json`, `state_vector.json`, `root_ledger.json`, `branch_residuals.json`, `candidate_rows.csv`, `failure_codes.md`, and `promotion_gate.md`. For corrected branch-equation reruns, `branch_residuals.json` must include the branch-native basis, predeclared coefficient rule, held-out residual rule, and pass/fail value for the residual-balance row. The minimum Tier 1 packet adds `run_metadata.json`, $\mathbb{U}_{\text{now}}$ provenance data, `history_interpolation.json`, `convergence_table.csv`, `eta_ladder.csv`, `conservation_ledger.csv`, `cross_integrator_report.md`, `negative_control_report.md`, `failure_report.md`, and `promotion_lemma_check.md`. If a Tier 1 run claims a branch transition, it also emits `transition_records.json` with the status, regularization route, transition-window scale, root-ledger rows, and promoted observables for each transition window.

The `cross_integrator_report.md` artifact must name the solver family, delayed interpolation polynomial or reconstruction rule, nonlinear solve residuals when implicit stages are used, small-delay or vanishing-delay encounters, and event or restart handling. Cross-integrator agreement is evidence only when the branch identity and transition records match, not merely when plotted observables are close.

A Tier 1 packet supports a proof or validation claim only when the branch residuals, convergence checks, provenance checks, conservation checks, regulator-dependence checks, and negative control all pass with tolerances declared before the run. If any promoted scalar, root count, branch label, stability gap, or tolerance is selected after inspecting output, the packet fails as hidden tuning.

#### Run Protocol: Absolute-Frame + $\mathbb{U}_{\text{now}}$ Logging

##### Absolute frame rule
All simulations integrate dynamics in the absolute Euclidean frame:
- Fixed Cartesian coordinates (x,y,z) in a chosen scaffold representing the Euclidean void
- Global absolute time $t$ with step $\Delta t$
- No relativistic time dilation applied to the integration clock (proper time is derived only in post-processing)

##### Void and Noether Sea Terminology (Simulation-Facing)
- "Euclidean void" = the fixed spatial container represented by the chosen coordinate chart / grid indices
- "Noether sea" = coupled pro/anti swarms instantiated as objects or response variables in the void

##### Mandatory $\mathbb{U}_{\text{now}}$ universe-state perspective ($\mathbb{U}_{\text{now}}$) grid
Every run must instantiate $\mathbb{U}_{\text{now}}$ sensors:
- $\mathbb{U}_{\text{now}}$ grid definition: chart points/worldlines, spacing, bounds, boundary conditions
- Logged channels (minimum): $\Phi$, $\nabla\Phi$
- Optional: Noether sea state variables (for example, $\rho_{\text{NS}}$ and alignment metrics)
- Provenance tables: `receiver_id`, $t$, `emitter_id`, $t_{\text{emit}}$, `contribution_strength` when feasible

##### Causal wake surface bookkeeping requirement
When a potential wake surface intersects a $\mathbb{U}_{\text{now}}$ sensor or contributes to $\Phi(x,t)$, the code must:
- Solve for emission time $t_{\text{emit}}$ using $\| x - x_{\text{emitter}}(t_{\text{emit}})\| = c_f (t - t_{\text{emit}})$
- Record emitter identity plus $t_{\text{emit}}$ (provenance logging)

##### Metadata (required)
Each run must store:
- $c_f$, kernel parameters, $\Delta t$, integrator name/order, tolerances
- history-window/compression settings (if any)
- initial conditions seed
- version hash / commit id

##### Acceptance gate
No major physical claim is accepted without:
- $\mathbb{U}_{\text{now}}$ logs
- $\Delta t$ convergence
- history-resolution convergence
- cross-integrator comparison (for critical results)

##### $\mathbb{U}_{\text{now}}$ universe-state perspective Implementation & Grid Protocols

1. **Grid Initialization**: All simulations run on a rigid Cartesian grid chosen as the coordinate scaffold for the **Euclidean void**. The grid is pre-loaded with a lattice of coupled Noether swarms to instantiate the Noether sea.
2. **Fiducial Sensor Array**: Instantiate a grid of virtual sensors at fixed chart locations $(x,y,z)$. Each records $\Phi$ and $\nabla\Phi$.
3. **Causal Time Lookup**: When a causal isochron intersects a sensor, the simulator uses the grid history to "look back" to the emitter's position at $t_{history}$.
4. **Logging Standard**: All runs must log $\mathbb{U}_{\text{now}}$ channels ($\Phi$, $\nabla\Phi$, provenance tables) to allow cross-run convergence auditing.

##### $\mathbb{U}_{\text{now}}$ universe-state perspective Grid

* **Grid:** Initialize rigid Cartesian `Grid[x][y][z]` as the chosen chart for the Euclidean void.
* **Sea Initialization:** Pre-load the grid with coupled Noether swarms for low-excitation Noether sea runs.
* **Logging:** Record $\Phi$ and $\nabla\Phi$ at fixed nodes ($\mathbb{U}_{\text{now}}$ universe-state sensors).
* **Time:** Global step $\Delta t$ (absolute time).

### A0 Branch Certificate Protocol

This protocol defines the simulation-facing handoff for the $A_0$ reference attractor described in [Particle Masses](../../../../markdown/aaa/assemblies/particle-masses.md#reference-attractor-gate), [Nested Shell Swarm Dynamics](../../../../markdown/aaa/noether-swarm/nested-shell-swarm-dynamics.md), and [Energy](../../../../markdown/aaa/dynamics/energy.md). It specializes the general [Simulation Run Protocols](../../../../markdown/aaa/validation/simulations/run-protocols.md) to the first neutral rest-branch nested shell swarm mass-map target.

The protocol does not treat $A_0$ as a particle label. It treats $A_0$ as a calibration-free branch certificate problem: find a finite, stable, multi-scale causal-root ledger before energy, shielding, Noether sea response, or mass comparisons enter.

#### Master-Equation Handoff Boundary

If a run consumes a master-equation branch-chart object $\mathfrak{B}(\Gamma,\mathcal{S};h,\eta,\epsilon_c)$, the consumed data must remain branch-certificate data: active roots, inactive gaps, Jacobian floor, memory depth, returned-section residual, section stability, and the refinement schedule that preserves the same branch identity. These fields may support Tier 0 and Tier 1 certification only.

The same packet must keep downstream extraction fields separate. `energy_ledger`, `far_field_shielding`, `medium_response`, and `mass_summary` remain not-computed until their tiers pass. A run fails the handoff if $\zeta(A_0)$, $\mathcal{L}_{\text{aniso}}$, or $\mathcal{M}_{\text{sea}}^{ab}$ changes under root-ledger refinement, inactive-gap refinement, history-window extension, or controlled $\eta$ refinement while the branch label and quotient row are claimed to be unchanged.

#### Certificate Packet Schema

An auditable $A_0$ branch certificate should preserve one top-level packet shape across all tiers. Fields that are not computed at a given tier must remain present with an explicit status, role, and note rather than disappearing from the packet.

| Field | Required content | Promotion role |
| --- | --- | --- |
| `metadata` | run identifier, code or derivation version, source commit, integrator, tolerances, $\eta$, sampling schedule, and history-window rule | makes the packet reproducible |
| `sea_cell` | $u^i_{\text{sea}}$, $G_{\text{grad}}$, $n$, $\chi_{\text{sea}}$, declared $c_\star$, and boundary conditions | fixes the homogeneous Noether sea cell and prevents mixing $c_f$ with $c_{\text{eff}}$ |
| `branch_label` | layer windings, inter-layer closure integers, handedness, carrier ellipticity, and active root-branch summary | identifies the branch being certified |
| `z_lambda` | quotient-coordinate row $z_\Lambda$: $\varepsilon_{IM}$, $\varepsilon_{MO}$, $T_I/T_M$, $T_M/T_O$, $\delta_M$, layer ellipticities, $G_{\ell m}$, $\chi_N$, $H_I,H_M,H_O$, $\Phi_{\text{rel}}$, removed gauges $SO(3)$, $S^1_{\mathbf{k}}$, $\Gamma_\Lambda$, branch class $[\Lambda]$, and quotient-degeneracy status | records the reduced moduli coordinate rather than an unquotiented carrier representative |
| `branch_chart_revision` | conditional pre-rerun record for any revised reduced branch coordinate, including source fields, equality map, equation and coefficient counts, held-out residual rule, phase-origin rule when a phase split is used, symmetry or quotient behavior, locked-key exclusion, benchmark exclusion, and `accepted_history_boundary: false` | prevents residual-selected coordinates or post-fit added columns from masquerading as branch geometry |
| `state_vector` | six architrino labels, polarities, reduced geometry, frequencies, phase offsets, carrier chart, history segment, and center gauge | gives the reduced Noether swarm state vector |
| `closure_system` | active variables, causal-root equations, layer phase closure, inter-layer closure, center-gauge closure, speed-ordering inequalities, and tolerances | ties closure labels to equations rather than only to names |
| `root_ledger` | active and raw partner, self, and inter-layer root classes with delays, branch Jacobians, separator flags, parity events, and excluded near-zero self roots separated | verifies finite causal-root bookkeeping |
| `term_classification` | terms assigned to averaging, locking, and leakage channels, with measured or derived residual size | prevents internal corrections from being hidden before promotion |
| `residuals` | complete branch-row residual surface $\mathcal{R}_{A_0}$, with $\mathcal{R}_{\text{state}}$, $\mathcal{R}_{\text{root}}$, $\mathcal{R}_{\text{phase}}$, $\mathcal{R}_{E}$, $\mathcal{R}_{\text{drift}}$, $\mathcal{R}_{\text{speed}}$, $\mathcal{R}_{\text{avg}}$, $\mathcal{R}_{\text{lock}}$, $\mathcal{R}_{\text{leak}}$, and $\mathcal{R}_{\text{Floquet}}$, each with value, tolerance, status, role, and note fields | gives a machine-checkable promotion surface with later-tier omissions explicit |
| `residual_values` | numeric mirror of $\mathcal{R}_{A_0}$ values, with Tier 0 omissions recorded as null rather than hidden | gives scripts a stable audit surface without erasing row semantics |
| `Delta_k` | $\Delta_{\mathbf{k}}$ value, status, role, nonpositive-gap failure code, and note; Tier 0 emits null with `not_computed_in_tier0` | keeps the Floquet handoff visible before Tier 1 computes the return map |
| `stability` | monodromy or finite-difference return map, excluded symmetry modes, non-symmetry Floquet multipliers, and the computed $\Delta_{\mathbf{k}}$ once Tier 1 exists | separates integer closure from attractor stability |
| `group_velocity_anisotropy` | $\mathbf{V}_{\text{cm}}$, declared $c_\star$, $\beta_\star$, envelope ratio, forward/backward delay ratio, tensor $\mathcal{A}_{\mathrm{gv}}^{ij}$, refinement status, and whether the entry is rest residue, small-velocity response, or probe-induced drift | keeps motion-induced deformation separate from shielding leakage |
| `energy_ledger` | sign-resolved kinetic content, interaction terms, wake/history terms, layer totals $E_I,E_M,E_O$, $E_{\text{internal}}(A_0)$, and action per closed cycle | supplies the unshielded energy reservoir after Tier 1 passes |
| `far_field_shielding` | extraction radii, angular grid, selected wake channel, $\mathcal{L}(\hat{\mathbf{R}})$, naive constituent sum, leading isotropic projection, $\zeta(A_0)$, $\mathcal{L}_{\text{aniso}}$, and convergence status | turns shielding into an extracted far-field quantity after Tier 1 passes |
| `medium_response` | acceleration probes, gradient probes, extracted $\mathcal{M}_{\text{sea}}^{ab}$ baseline, symmetric tensor part, antisymmetric residue, and response anisotropy | compatibility field for testing Noether sea inertial and gravitational response after shielding passes |
| `mass_summary` | $\zeta(A_0)E_{\text{internal}}(A_0)/E_0$, unresolved constants, response-map assumptions, and explicitly excluded particle benchmarks | records only calibration-free mass-facing output |
| `certificate_gates` | pass/fail/not-computed gates for quotient nondegeneracy, scale separation, speed ordering, phase closure, carrier residuals, root residual, active root-ledger stability, active separator-root handling, near-zero self-root handling, residual semantics, Floquet handoff, and Tier 0 continuation | controls promotion between branch search, attractor, shielding, and response claims |
| `failure_code` | reason the row or packet failed, or the next allowed promotion status | prevents failed packets from being read as mass-map results |

The `residuals` field is the complete branch-row surface
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
Tier 0 may compute only part of this surface. The row must still emit every component. Missing later-tier components use explicit `not_computed_in_tier0` status, null value, null tolerance when no tolerance exists yet, a promotion role, and a note that names the tier responsible for computing the entry.

The group-velocity anisotropy entry uses the reduced centered covariance of the six-worldline state. With
$$
\mathbf{C}_{A_0}(t)=\frac{1}{6}\sum_{a\in A_0}\mathbf{s}_a(t)
$$
define
$$
D^{ij}_{A_0}(\mathbf{V}_{\text{cm}})
=
\left\langle
\sum_{a\in A_0}
\left(s_a^i-C_{A_0}^i\right)
\left(s_a^j-C_{A_0}^j\right)
\right\rangle_{T_{\mathbf{k}}}
$$
$$
Q^{ij}_{A_0}
=
\frac{D^{ij}_{A_0}}{h_{mn}D^{mn}_{A_0}},
\qquad
\mathcal{A}_{\mathrm{gv}}^{ij}
=
Q^{ij}_{A_0}-\frac{1}{3}h^{ij}
$$
This tensor measures motion-induced or probe-induced Noether swarm deformation. It is not the same object as the far-field leakage residue $\mathcal{L}_{\text{aniso}}$, which is extracted from cycle-averaged wake coefficients in Tier 2.

#### Tier 0: Algebraic Branch Search

Tier 0 is a reduced branch-search pass. It samples diagnostic carrier charts, solves delayed root equations on those charts, classifies internal terms, and emits candidate rows. It does not claim a physical attractor.

Required inputs:

- homogeneous Noether sea cell with $u^i_{\text{sea}}=0$, $G_{\text{grad}}=0$, $n=1$, $\chi_{\text{sea}}=1$, and primitive wake speed $c_f$;
- layer labels $\ell\in\{I,M,O\}$ and polarity labels $\sigma\in\{+,-\}$;
- scale ratios $\varepsilon_{IM}=R_I/R_M$ and $\varepsilon_{MO}=R_M/R_O$;
- speed offsets enforcing $s_I > c_f$, $s_M \approx c_f$, and $s_O < c_f$;
- candidate handedness tuple and carrier ellipticity;
- $\eta > 0$, sampling resolution, and history-window rule.

Required outputs:

| Output | Meaning |
| --- | --- |
| `branch_label` | layer windings, inter-layer closure integers, handedness, and active root-branch summary |
| `closure_labels` | declared $T_{\mathbf{k}}$, winding integers, inter-layer closure integers, and active root classes |
| `z_lambda` | reduced quotient-coordinate row $z_\Lambda$, including radius ratios, period ratios, $\delta_M$, layer ellipticities, plane Gram data $G_{\ell m}$, $\chi_N$, handedness labels, phase-offset quotient status, removed gauges, branch class $[\Lambda]$, and `quotient_degenerate` |
| `state_vector` | reduced geometry, frequencies, phase offsets, carrier chart, and center gauge |
| `closure_system` | active causal-root, phase-closure, inter-layer-closure, center-gauge, and speed-ordering equations used by the row |
| `root_ledger` | active and raw partner, self, and inter-layer root counts with delays, branch Jacobians, separator flags, and excluded near-zero self roots separated |
| `term_classification` | terms assigned to averaging, locking, and leakage channels |
| `residuals` | every component of $\mathcal{R}_{A_0}$, each with value, tolerance, status, role, and note fields; $\mathcal{R}_{E}$ and $\mathcal{R}_{\text{Floquet}}$ are explicit Tier 0 omissions unless supplied by a later diagnostic |
| `residual_values` | numeric value mirror for the same $\mathcal{R}_{A_0}$ components, with omitted components recorded as null |
| `Delta_k` | $\Delta_{\mathbf{k}}$ status object; Tier 0 sets value to null and status to `not_computed_in_tier0` until Tier 1 constructs the monodromy or finite-difference return map |
| `group_velocity_anisotropy` | rest-branch residue if computed, or an explicit not-computed Tier 0 status; no Tier 0 row may use this as shielding evidence |
| `certificate_gates` | pass/fail/not-computed gates for quotient coordinates, scale separation, speed ordering, phase closure, carrier residuals, root residual, active root ledger, active separator roots, near-zero self roots, residual vector semantics, $\Delta_{\mathbf{k}}$, and Tier 0 continuation |
| `failure_code` | reason the row failed, or `candidate` if it survives Tier 0 |

Tier 0 passes only if at least one row has a finite causal-root ledger, nondegenerate quotient coordinates, retained scale separation, correct speed ordering, bounded carrier residuals, no unclassified separator term, and a complete residual surface. Passing Tier 0 only authorizes Tier 1 continuation.

##### Tier 0 Failure-Code Enum

The row-level `failure_code` field is a machine-readable enum. The accepted values are:

| Code | Trigger | Promotion consequence |
| --- | --- | --- |
| `candidate` | all Tier 0 promotion gates pass | row may seed Tier 1 continuation only |
| `quotient-degenerate` | $z_\Lambda$ has degenerate plane-normal Gram or orientation data after quotienting global rotations | reject the row as a reduced moduli coordinate |
| `scale-separation-collapse` | radius or period ratios violate the declared separated-scale Tier 0 regime | reject the row or widen the scan only as a controlled scale-separation test |
| `speed-order-collapse` | $\mathcal{R}_{\text{speed}}$ fails the intended $s_I > c_f$, $s_M \approx c_f$, $s_O < c_f$ ordering | reject the row before attractor continuation |
| `phase-closure-open` | $\mathcal{R}_{\text{phase}}$ fails layer winding closure over $T_{\mathbf{k}}$ | reject the row until integer closure is restored |
| `carrier-residual-open` | $\mathcal{R}_{\text{state}}$ or $\mathcal{R}_{\text{drift}}$ fails the Tier 0 carrier chart tolerance | reject the row as an unclosed diagnostic carrier |
| `root-residual-open` | $\mathcal{R}_{\text{root}}$ fails on candidate active causal-root branches | reject the row until active roots solve within tolerance |
| `averaging-residual-open` | $\mathcal{R}_{\text{avg}}$ fails its declared averaging tolerance | keep the term in the branch equations or reject the row |
| `locking-residual-open` | $\mathcal{R}_{\text{lock}}$ fails its declared locking tolerance | keep the near-separator or resonance term in Tier 1 or reject the row |
| `separator-singularity-unresolved` | active near-separator roots exceed the configured allowance without a locking continuation rule | reject the row until separator handling is explicit |
| `near-zero-self-root-excluded` | excluded near-zero self roots exceed the configured allowance under $H(0)=0$ | reject the row until a positive-delay self branch or regularized fold-layer rule exists |
| `root-ledger-instability` | the active causal-root ledger is empty or lacks partner, self, or inter-layer classes | reject the row as a finite-ledger failure |
| `nonpositive-floquet-gap` | Tier 1 computes $\Delta_{\mathbf{k}}\le0$ | reject the branch as a non-attractor even if integer closure holds |

At Tier 0, `nonpositive-floquet-gap` appears only as the reserved `Delta_k.failure_code_if_nonpositive` and `certificate_gates.floquet_gap.failure_code`, because Tier 0 does not compute $\Delta_{\mathbf{k}}$.

##### Near-Zero Self Roots

Tier 0 must distinguish raw self-root sightings from active self-hit branches. A self root at the configured near-zero delay threshold is recorded in the raw ledger but excluded from the active ledger as an instantaneous self-kick artifact under the convention $H(0)=0$.

Such a root may not count as self-hit closure merely because a fold-layer diagnostic preserves the locked self-root keys. The current fold-layer row is a transition candidate only; it promotes after a corrected one-period branch-equation attempt passes the declared residual surface, with $\Delta_{\mathbf{k}}$ and $\eta$-ladder persistence still downstream.

The reader-facing interpretation of these rows is in [$A_0$ Tier 0 Result Interpretation](../../../../markdown/aaa/validation/simulations/a0-tier0-result-interpretation.md).

#### Tier 1: $\eta > 0$ Continuation

Tier 1 promotes a surviving Tier 0 row into direct delayed dynamics with the regularized wake kernel still active. It must preserve the absolute-frame logging standard.

Required checks:

1. direct evolution over at least one declared $T_{\mathbf{k}}$;
2. root-ledger stability under $\Delta t$ and history-window refinement;
3. persistence of averaging, locking, and leakage classifications;
4. no secular center drift after symmetry modes are removed;
5. monodromy or finite-difference return-map estimate with symmetry modes quotiented;
6. positive non-symmetry Floquet gap $\Delta_{\mathbf{k}}>0$;
7. convergence under the standards in [Convergence Tests](../../../../markdown/aaa/validation/simulations/convergence-tests.md);
8. a Floquet or monodromy report stating whether the state-dependent delay derivative term was included in the variational operator;
9. `transition_records.json` whenever the run crosses a fold-layer, separator, or active-root status transition.

##### Branch-Chart Revision Checkpoint

If a Tier 1 diagnostic or corrected carrier attempt reaches a finite-coordinate no-go and proposes a revised branch chart, the revision is admissible only as a pre-rerun record. The proposed reduced coordinate $z_\Lambda^\star$ or finer branch partition $\mu^\star$ must be declared from branch geometry, causal-root data, quotient-row data, or corrected carrier state before residual fitting. It may not be selected from residual-sign binning, particle benchmarks, fitted weights, or post-fit cancellation.

The pre-rerun record must report `coordinate_source_fields`, `equality_map`, `equation_count`, `coefficient_count`, held-out residual checks, phase-origin checks when a phase split is used, locked-key exclusions, symmetry quotients, benchmark exclusions, and `accepted_history_boundary: false`. The design must remain overdetermined after quotienting, for example by satisfying $N_{\mathrm{eq}}>N_{\mathrm{coef}}$ or $R_{\mathrm{df}}>0$, and the same branch identity must survive the refinement checks in [Convergence Tests](../../../../markdown/aaa/validation/simulations/convergence-tests.md).

Such a row is a revision candidate only. A branch-chart checker may authorize only a new Tier 1 rerun path; it does not accept history. If the checker rejects the packet for a hidden fit split, inadequate degrees of freedom, or held-out residual failure, then the compact-coordinate no-go remains a controlled chart failure. If the checker passes, the branch still requires corrected one-period residuals, quotient-row identity, monodromy or $\Delta_{\mathbf{k}}$, and $\eta$-ladder persistence with the same branch identity.

Tier 1 passes only if the same branch remains stable before any $\eta\to0^+$ extrapolation.

##### Corrected One-Period Branch-Equation Boundary

The current fold-layer-locked compact fixture is a controlled negative result, not an accepted attractor and not a broad falsification of the $A_0$ program. The direct one-period runner can preserve the locked self-root keys in $\mathcal{R}_{\text{lock}}$ without solving the branch equations: state return, root closure, phase closure, speed ordering, center drift, and energy-like speed closure still fail. The scalar branch-native relation basis over $B_{\text{self}}$, $B_{\text{partner}}$, and $B_{\text{inter}}$ leaves a relative acceleration residual far above the Tier 1 tolerance, so the next allowed rerun must predeclare either a non-circular carrier correction $\mathbf{d}_\ell(t)$ or a richer branch-native interaction basis before residual fitting.

For a declared period window $W=[t_0,t_0+T_{\mathbf{k}}]$, the corrected carrier has the form
$$
\mathbf{x}_{a,\ell}^{\star}(t)
=
\mathbf{x}_{a,\ell}^{(0)}(t)+\mathbf{d}_\ell(t),
\qquad
\mathbf{d}_\ell(t+T_{\mathbf{k}})=\mathbf{d}_\ell(t),
\qquad
\left\langle\mathbf{d}_\ell\right\rangle_W=0
$$
The one-period residual is
$$
\mathcal{R}_{\mathrm{1per}}
=
\frac{
\left(
\int_W
\sum_a
\left\|
\mathbf{a}^{\mathrm{ME}}_a(t;\mathbf{d})
-
\sum_{B\in\{B_{\text{self}},B_{\text{partner}},B_{\text{inter}}\}}
\alpha_B\,\mathbf{A}_{a,B}(t;\mathbf{d})
\right\|^2 dt
\right)^{1/2}
}{
\left(
\int_W
\sum_a
\|\mathbf{a}^{\mathrm{ME}}_a(t;\mathbf{d})\|^2 dt
\right)^{1/2}
+\varepsilon_0
}
$$
The rerun may proceed toward monodromy only if
$$
\mathcal{R}_{\mathrm{1per}}\le 0.02
$$
with $\mathbf{d}_\ell(t)$, the basis terms $\mathbf{A}_{a,B}$, the coefficient rule for $\alpha_B$, and any held-out interval declared before fitting. A scalar-basis no-go is therefore a chart or basis failure; it does not become an attractor failure unless every admissible corrected carrier and branch-native basis inside the declared search class fails the same residual boundary.

#### Tier 2: Energy and Shielding

Tier 2 begins only after Tier 1 passes. It computes the internal-energy ledger and far-field shielding extraction described in [Energy](../../../../markdown/aaa/dynamics/energy.md). The required outputs are:

- $E_I$, $E_M$, $E_O$, and $E_{\text{internal}}(A_0)$;
- interaction and wake/history bookkeeping with no double counting;
- far-field wake coefficients $\mathcal{L}(\hat{\mathbf{R}})$ over extraction radii and angular grids;
- the naive constituent sum $\mathcal{L}_{\text{naive}}$ and the leading isotropic projection $\Pi_0\mathcal{L}$;
- $\zeta(A_0)$ from the leading isotropic projection;
- anisotropic leakage $\mathcal{L}_{\text{aniso}}=(1-\Pi_0)\mathcal{L}$ retained as a separate tensor or channel list;
- convergence status under extraction radius, angular resolution, $\Delta t$, history-window, and $\eta$ refinement.

Tier 2 fails if particle masses, charged-lepton ratios, electron radius, or measured $\alpha$ enter as inputs.

#### Tier 3: Medium-Response Probe

Tier 3 begins only after Tier 2 passes. It applies small acceleration and gradient probes to the accepted branch and extracts the homogeneous baseline for $\mathcal{M}_{\text{sea}}^{ab}$. The probe must report whether the acceleration and gradient channels share the same shielded-energy coefficient to first order, and it must report response anisotropy separately from both $\mathcal{A}_{\mathrm{gv}}^{ij}$ and $\mathcal{L}_{\text{aniso}}$.

#### Runtime Artifact

The first reduced Tier 0 artifact is `scripts/mass-map/a0-tier0-branch-search.mjs`, with default grid `scripts/mass-map/a0-tier0-default-grid.json`. It is an algebraic branch-search scaffold, not a production simulator. Its required role is to emit candidate rows with parameter choices, quotient-coordinate rows, carrier diagnostics, root ledgers, term classifications, residual surfaces, $\Delta_{\mathbf{k}}$ handoff status, leakage placeholders, certificate gates, and failure codes matching this protocol.

The Tier 1 handoff scaffold is `scripts/mass-map/a0-tier1-continuation-scaffold.mjs`. It consumes Tier 0 JSON rows and emits the $\eta > 0$ continuation contract, reduced-coordinate chart, symmetry-quotiented monodromy plan, $\Delta_{\mathbf{k}}$ acceptance boundary, and required output artifact list. It is not a delayed-dynamics solver and cannot certify the branch without a later Tier 1 run.

The companion audit is `scripts/audit-a0-mass-map-promotion.mjs`. It scans $\mathbb{A}\mathbb{A}\mathbb{A}$ and mass-map priority prose for premature statements that treat $\zeta(A_0)$, $E_{\text{internal}}(A_0)$, or $\mathcal{M}_{\text{sea}}^{ab}$ as accepted before the Tier gates pass.

#### Acceptance Boundary

The $A_0$ branch is not an attractor until Tier 1 passes. It is not a mass-map result until Tier 2 passes. It is not an inertial-response result until Tier 3 passes. A reported group-velocity anisotropy tensor is a deformation diagnostic, not a shielding extraction and not a substitute for the Noether sea response probe.

### Synthetic Observables

This note defines the canonical logging standard for the virtual $\mathbb{U}_{\text{now}}$ perspective and explains how those logs are turned into detector-like synthetic observables. Its purpose is to keep the separation clear between exact simulation bookkeeping and the post-processed quantities that stand in for what a physical observer would measure.

The file therefore serves as both a data-contract note and an observer-interface note for the simulation stack.

#### $\mathbb{U}_{\text{now}}$ Logging Standard

##### Purpose
Define a canonical $\mathbb{U}_{\text{now}}$ universe-state perspective ($\mathbb{U}_{\text{now}}$) used across all simulation tiers for logging, diagnostics, and synthetic datasets. $\mathbb{U}_{\text{now}}$ is not physically realizable; it is a bookkeeping operator acting on the full microstate.

##### Definition
A $\mathbb{U}_{\text{now}}$ is defined by:
- Fixed Euclidean sample points or worldlines $P = \{x_k\}$ in a declared coordinate scaffold on $\mathbb{R}^3$
- Access to the full state $S(t) = \{(x_i(t), v_i(t), q_i, \dots)\}$ for all architrinos
- Output channels:
  - Local potential $\Phi(x_k,t)$
  - Local gradient $\nabla\Phi(x_k,t)$ (force proxy)
  - Optional local Noether sea state variables (e.g., $\rho_{\text{NS}}$, alignment/orientation metrics)
  - Causal wake surface provenance/event tags: for each received contribution at $(x_k,t)$, record `emitter_id` together with $t_{\text{emit}}$, satisfying $\| x_k - x_{\text{emitter}}(t_{\text{emit}})\| = c_f (t - t_{\text{emit}})$
  - Photon packet provenance when a radiation channel is declared: source event, path segment, before/after frequency, recoil or medium-energy exchange, remnant row, and signed exchange residual
  - Optional finite-window operator diagnostics for declared reconstructed channels $\mathbf{Y}_\eta$, including Gauss, Stokes, and wake-surface normalization residuals

##### Minimal synthetic products
- Time series: $\Phi(t)$, $\nabla\Phi(t)$ at fixed points ("stationary detectors")
- Snapshot field maps: $\Phi(x,t_0)$, $\nabla\Phi(x,t_0)$ over grids at fixed $t_0$
- Provenance tables: `receiver_id`, $t$, `emitter_id`, $t_{\text{emit}}$, `contribution_strength`
- Propagation diagnostics: arrival-time distributions, dispersion tests, effective $c_{\text{eff}}$ estimates
- Coarse kinetic moments when a continuum reduction is claimed: density, current, momentum-current tensor, energy-flux vector, and memory-current residuals derived from the same event-root records
- Stochastic summaries when a noise model is claimed: drift vector, diffusion tensor, first two distribution moments, and direct ensemble comparison against event-root histories
- Reaction-diffusion probes when pattern or front language is claimed: front speed, unstable-mode band, selected wavelength, and conservation or source ledger for each reaction term
- Jet/outflow source products when a collimated release or working surface is claimed: beam radius, head radius, bow-shock speed, Mach number, jet-to-ambient density ratio, knot spacing, cooling ratio, synthetic line map, synthetic synchrotron map, inverse-Compton map, polarization fraction, and polarization angle
- Cosmology-facing photon products when redshift is inferred: total $Z_X$, endpoint/source/launch/path decomposition, signed path-frequency exchange $Y_{X,\mathrm{path}}$, packet-cadence stretch, flux factors, and image-sharpness diagnostics

##### Mapping: $\mathbb{U}_{\text{now}}$ data → Physical observables
Synthetic observables must be generated by post-processing $\mathbb{U}_{\text{now}}$ logs with a model of a *physical* observer (assembly clock/detector):
1. Extract local Noether sea state along detector worldline $X_{\text{det}}(t)$
2. Compute proper time $\tau_{\text{det}}$ via $d\tau = F(\text{Noether sea state}, v_{\text{det}}, \Phi, \nabla\Phi, \dots)\,dt$ (from proper-time-derivation.md)
3) Generate detector-like outputs:
   - clock readings $\tau(t)$
   - photon arrival times and frequency shifts, with signed exchange rows separated from endpoint cadence and launch geometry
   - inferred "geodesics" (effective paths) from travel-time minimization through the Noether sea effective signal speed $c_{\text{eff}}$

##### Validation checks (must pass)
- **Causality residual (per record $m$):**
  $$
  \rho_m \equiv
  \frac{\left|\|x_k-x_{i_m}(t_{\text{emit},m})\|-c_f\,(t_m-t_{\text{emit},m})\right|}
  {\max(c_f\Delta t,\varepsilon_r)},
  \qquad \varepsilon_r=10^{-12}
  $$
  Pass if at least $99.9\%$ of records satisfy $\rho_m\le 10^{-2}$ and
  $\max_m \rho_m \le 5\times 10^{-2}$.

- **Temporal ordering check:**
  $$
  \theta_m \equiv \frac{t_{\text{emit},m}-t_m}{\Delta t}
  $$
  Pass if fraction with $\theta_m>10^{-9}$ is $\le 10^{-6}$.

- **Cross-integrator invariance:**
  For any channel $Y$ use
  $$
  E_{\mathrm{rel}}(Y;A,B)\equiv
  \frac{\|R(Y_B)-Y_A\|_{L^2}}{\|R(Y_B)\|_{L^2}+10^{-12}}
  $$
  Pass if $E_{\mathrm{rel}}(\Phi)\le 0.03$ and
  $E_{\mathrm{rel}}(\|\nabla\Phi\|)\le 0.05$.

- **Finite-window Gauss/Stokes residuals:** for any declared reconstructed vector channel $\mathbf{Y}_\eta$ on $\Sigma_t$, use
  $$
  R_G[V,t;\mathbf{Y}_\eta]\equiv
  \frac{\left|\int_{\partial V}\mathbf{Y}_\eta\!\cdot\!\hat{\mathbf{n}}\,dS-\int_V\nabla\!\cdot\!\mathbf{Y}_\eta\,dV\right|}
  {\int_{\partial V}\left|\mathbf{Y}_\eta\!\cdot\!\hat{\mathbf{n}}\right|\,dS+\int_V\left|\nabla\!\cdot\!\mathbf{Y}_\eta\right|\,dV+10^{-12}}
  $$
  and
  $$
  R_S[S,t;\mathbf{Y}_\eta]\equiv
  \frac{\left|\oint_{\partial S}\mathbf{Y}_\eta\!\cdot d\mathbf{x}-\int_S(\nabla\times\mathbf{Y}_\eta)\!\cdot\!\hat{\mathbf{n}}\,dS\right|}
  {\oint_{\partial S}\left|\mathbf{Y}_\eta\!\cdot d\mathbf{x}\right|+\int_S\left|(\nabla\times\mathbf{Y}_\eta)\!\cdot\!\hat{\mathbf{n}}\right|\,dS+10^{-12}}
  $$
  Pass if both residuals are $\le 2\times10^{-2}$ on resolved windows and decrease under spatial refinement. These are diagnostics on reconstructed continuum channels, not claims that the channel is substrate ontology.

- **Distributional wake-surface normalization:** for emitted wake surface $m$ with source strength $q_m$, delay $\tau_m=t-t_{\text{emit},m}$, and radial annulus $R_-\le r_m\le R_+$ around the emission point, use
  $$
  Q^{\mathrm{ann}}_{m,\eta}=
  q_mH(\tau_m)\int_{R_-}^{R_+}\delta_\eta(r_m-c_f\tau_m)\,dr_m
  $$
  and
  $$
  R_{N,m}\equiv
  \frac{\left|\int_{R_-\le r_m\le R_+}\rho_{m,\eta}(t,\mathbf{x})\,dV-Q^{\mathrm{ann}}_{m,\eta}\right|}
  {|q_m|+10^{-12}}
  $$
  Pass if at least $99.9\%$ of emitted wake surfaces satisfy $R_{N,m}\le 10^{-2}$ and the maximum resolved-window residual is $\le 5\times10^{-2}$.

- **Photon-frequency exchange closure:** when a photon packet changes frequency during transport, the logged before/after frequencies must close with medium, recoil, and remnant rows:
  $$
  R_{\nu\text{-}\mathrm{ex},m}
  =
  \frac{
  \left|
  h(\nu_m^{+}-\nu_m^{-})
  +\Delta E_{\mathrm{med},m}
  +\Delta E_{\mathrm{recoil},m}
  +\Delta E_{\mathrm{rem},m}
  \right|
  }
  {\epsilon_E}
  $$
  A cosmology-facing redshift or blueshift product may consume this row only after the residual is reported with the same photon provenance used for arrival-time, flux, and image-sharpness outputs.

- **Operator consistency across PDE and event-root runs:** after resampling the event-root reconstruction onto the PDE grid, define
  $$
  \Delta\mathbf{Y}_\eta\equiv
  \mathbf{Y}^{\mathrm{PDE}}_\eta-R(\mathbf{Y}^{\mathrm{root}}_\eta),
  \qquad
  E_{\mathrm{op}}(V,S,t)\equiv
  \max\!\left\{R_G[V,t;\Delta\mathbf{Y}_\eta],\,R_S[S,t;\Delta\mathbf{Y}_\eta]\right\}
  $$
  Pass if $E_{\mathrm{op}}\le0.03$ on the declared validation windows and decreases under temporal/history/spatial refinement.

- **Curvilinear-coordinate hygiene:** finite-window residuals must use the coordinate weights and operator formulas of the declared Euclidean scaffold. In spherical coordinates $(r,\theta,\varphi)$,
  $$
  w_V=r^2\sin\theta\,\Delta r\,\Delta\theta\,\Delta\varphi,\qquad
  w_{S_R}=R^2\sin\theta\,\Delta\theta\,\Delta\varphi
  $$
  and a radial channel must evaluate $\nabla\!\cdot(F_r\hat{\mathbf{r}})$ as
  $$
  \frac{1}{r^2}\frac{\partial}{\partial r}\!\left(r^2F_r\right)
  $$
  not as $\partial_rF_r$. Fail the run if the coordinate scaffold does not declare these weights.

- **Provenance distribution agreement:** for `t_emit` distributions, require
  $$
  D_W \equiv \frac{W_1(P_A,P_B)}{\mathrm{IQR}(P_B)+10^{-12}} \le 0.08,
  \qquad
  D_{JS}\equiv \mathrm{JSD}(P_A\|P_B)\le 0.03
  $$

- **Kinetic-moment closure:** for any promoted continuum observable, compute the direct event-root moments
  $$
  \rho_{\mathrm{dir}},\quad
  \mathbf{j}_{\mathrm{dir}},\quad
  \Pi_{\mathrm{dir}}^{ij},\quad
  \mathbf{J}_{e,\mathrm{dir}}
  $$
  and compare them with the reduced continuum reconstruction. The reduced channel must report
  $$
  R_{\mathrm{mom}}
  =
  \max_Y
  \frac{
  \left\|Y_{\mathrm{cg}}-R(Y_{\mathrm{dir}})\right\|_{L^2(W)}
  }{
  \left\|R(Y_{\mathrm{dir}})\right\|_{L^2(W)}+10^{-12}
  }
  $$
  where $Y$ ranges over the retained density, current, momentum-current, and energy-flux channels. Pass if $R_{\mathrm{mom}}\le0.05$ and the omitted memory-current residual decreases under refinement.

- **Drift-diffusion reconstruction:** if a Fokker-Planck or Langevin surrogate is emitted, estimate drift and diffusion from increments,
  $$
  u^a(z)
  =
  \lim_{\Delta t\to0}
  \frac{\langle\Delta z^a\rangle_z}{\Delta t},
  \qquad
  D^{ab}(z)
  =
  \lim_{\Delta t\to0}
  \frac{\langle\Delta z^a\Delta z^b\rangle_z}{2\Delta t}
  $$
  The synthetic distribution must match direct event-root ensembles in $\langle z\rangle$ and $\operatorname{Cov}(z)$ before higher stochastic claims are trusted. Higher cumulants may differ from the surrogate unless a separate closure row has been declared.

- **Reaction-diffusion and pattern probes:** when a reduced scalar or multi-channel field $y$ obeys
  $$
  \partial_t y^a
  =
  D^{ab}\Delta y_b
  +
  F^a(y)
  +
  R_{\mathrm{rd}}^a
  $$
  the packet must report the fixed points, the linearized growth matrix, the unstable wavenumber band if one exists, and the front-speed estimate if a traveling-front claim is made. For two-channel pattern claims, the Turing-style gate is that the homogeneous fixed point is stable before diffusion and that the diffusion-shifted linear operator has a declared finite unstable band. Without those rows, visual pattern formation is not a validated synthetic observable.

- **Jet/outflow head and radiation probes:** when a simulation claims an astrophysical jet, outflow, knot chain, or working surface, the synthetic packet must compare the logged event-root dynamics to the observer-level jet-head and radiation benchmarks. For a supersonic head with jet speed $v_j$, beam radius $R_j$, head radius $R_h$, density ratio $\eta_j=\rho_j/\rho_a$, and $a_h=(R_j/R_h)^2$, the bow-shock speed target is
  $$
  v_{\mathrm{bs,std}}
  =
  v_j
  \left[
  1+(\eta_j a_h)^{-1/2}
  \right]^{-1}
  $$
  The head residual is
  $$
  R_{\mathrm{head}}
  =
  \left|
  \frac{v_{\mathrm{bs,map}}}{v_{\mathrm{bs,std}}}
  -1
  \right|
  $$
  For radiative shocks, also report
  $$
  \mathcal{R}_{\mathrm{cool}}
  =
  \frac{t_{\mathrm{cool}}}{t_{\mathrm{dyn}}},
  \qquad
  t_{\mathrm{dyn}}\sim\frac{\ell_j}{v_j}
  $$
  and route the synthetic emission to thermal line/free-free rows when $\mathcal{R}_{\mathrm{cool}}\ll1$, or to adiabatic, particle-acceleration, synchrotron, inverse-Compton, cocoon, and lobe rows when $\mathcal{R}_{\mathrm{cool}}\gg1$. If a pulsed inlet is declared with period $P$, the knot spacing should report
  $$
  R_{\mathrm{knot}}
  =
  \left|
  \frac{\Delta x_{\mathrm{knot}}}{v_jP}
  -1
  \right|
  $$
  up to projection, cooling, and deceleration corrections named in the packet. For synchrotron-bearing jets, the same run must emit $I_\nu^{\mathrm{syn}}$, $I_\nu^{\mathrm{IC}}$, $\Pi_\nu$, and $\psi_\nu$ maps from one effective $B_{\mathrm{eff}}\leftrightarrow\mathcal{V}_{\mathrm{NS}}$ reconstruction. These are observer-level comparison variables; passing them does not promote MHD fields into substrate ontology.

- **Convergence triad:** must pass temporal/history/spatial gates from
  [convergence-tests.md](../../../../markdown/aaa/validation/simulations/convergence-tests.md), including null-test failure.

##### Failure mode
If any of the quantitative checks above fail (or if the null test does not fail),
treat $\mathbb{U}_{\text{now}}$ outputs as numerically unreliable for self-hit claims
until thresholds are met.

##### $\mathbb{U}_{\text{now}}$ as Standard Probe

1. **Definition**: A $\mathbb{U}_{\text{now}}$ universe-state perspective ($\mathbb{U}_{\text{now}}$) is a non-physical bookkeeping operator acting on the full microstate $S(t)$.
2. **Synthetic Observables**:
    - **Raw Data**: Time series of $\Phi(x,t)$ at fixed points.
    - **Post-Processing**: To simulate a physical detector, we act on the raw data by integrating the proper time $\tau$ of a "clock assembly" moving through the $\mathbb{U}_{\text{now}}$ grid.
3. **Separation of Concerns**: This explicitly separates Ontology (simulation state/$\mathbb{U}_{\text{now}}$ data) from Phenomenology (synthetic detector data).

##### Virtual Sensor & Data Extraction

* **Virtual Sensor:** Implementation of the $\mathbb{U}_{\text{now}}$ universe-state perspective. Samples potential/gradient at fixed coordinates.
* **Post-Processing:** Convert Virtual Sensor data (Ground Truth) into Physical Observer data (what a moving clock measures).
* **Provenance:** Track emitter ID and emission time for every potential contribution at a grid point.

## Closure Scorecard

This chapter is the reusable assessment surface for closure progress across the theory stack. Its purpose is to keep evaluation criteria stable from one scoring cycle to the next so that changes in score reflect actual progress or regression rather than drift in the assessment lens itself.

It is meant to be used with [Failure Criteria](../../../../markdown/aaa/validation/failure-criteria.md), [Validation Protocols](../../../../markdown/aaa/validation/validation-protocols.md), [No-Go Theorems](../../../../markdown/aaa/validation/no-go-theorems.md), and [Parameter Ledger](../../../../markdown/aaa/validation/parameter-ledger.md).

### Reusable Assessment Prompt

Use this prompt for each new assessment cycle:

```text
Perform a full validated-closure assessment of theory, mathematics, and geometry of modern physics vs. architrino theory.
Requirements:
1) Do a full read of all markdown documents in content/markdown/aaa (including subdirectories).
2) Evaluate each existing scorecard category in closure-scorecard.md on a 0-100 scale.
3) Use the validated-closure lens: certified equations, derivation depth, coefficient recovery, parameter determination, empirical precision, geometry/dynamics consistency, unresolved placeholders, and falsification-readiness.
4) Do not let architectural coherence, explanatory logic, or ontology compensate for missing equations, missing coefficients, unfixed parameters, or unvalidated benchmark recovery.
5) Add or populate the next dated assessment column in closure-scorecard.md with raw numeric scores, preserving previous assessment columns unless explicitly told to replace them.
6) Recompute the TOTAL row as the weighted arithmetic mean using the Weight column.
7) Keep all TeX intact and preserve category definitions unless explicitly asked to revise them.
```

Scale: `0-100` (standard numeric grading scale).
Total score rule: weighted arithmetic mean using the Weight column.

### Scoring Lens

The scorecard now weights highly validated mathematical closure. A high score requires not only a coherent theory route, but also explicit equations, coefficient-level derivations, parameter fixing, and contact with tested benchmark physics.

Score bands:

- `90-100`: equation-level closure with derived coefficients or theorems, fixed parameters where relevant, and strong empirical or formal validation.
- `70-89`: validated or mathematically mature closure in a broad regime, but with known interface limits, fitted quantities, or incomplete foundational mechanism.
- `50-69`: coherent formal route with substantial equations or models, but missing key derivations, coefficients, or validation passes.
- `30-49`: developed architecture or proof program with major mathematical targets still open.
- `0-29`: hypothesis, placeholder, or early scaffold without certified mathematical closure.

Architectural coherence and ontic logic remain explicit criteria because they matter to theory quality. They carry limited weight so that a strong $\mathbb{A}\mathbb{A}\mathbb{A}$ architecture can score high as architecture without inflating the validated-closure total.

### Assessment Table

Modern physics columns use the same categories for the effective-theory stack (`GR`, `QM`, `QED`, `QFT`, `QCD`, `SM`, `LCDM`): one operational/effective score and one mechanism/foundational score. The operational column measures validated mathematical and empirical closure of the effective theories. The mechanism column measures how far the same stack supplies a unified underlying mechanism rather than a collection of successful effective descriptions.

The $\Delta$ column is computed as the latest dated $\mathbb{A}\mathbb{A}\mathbb{A}$ score minus $\max(\text{Modern Physics Operational},\text{Modern Physics Mechanism})$; negative values mark current $\mathbb{A}\mathbb{A}\mathbb{A}$ deficits against the stronger modern-physics comparator.

| Category | Weight | Description | Modern Physics Operational | Modern Physics Mechanism | $\mathbb{A}\mathbb{A}\mathbb{A}$ 2026-05-16 | $\mathbb{A}\mathbb{A}\mathbb{A}$ 2026-05-20 | $\mathbb{A}\mathbb{A}\mathbb{A}$ 2026-05-22 | $\Delta$ |
| :--- | :---: | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| Axiom+Notation | 4 | Canonical symbols, definitions, and cross-chapter mathematical language consistency. | 96 | 82 | 92 | 95 | 98 | 2 |
| Master EOM+Local Dynamics | 10 | Certified closure of the core equations of motion: local field/effective equations in modern physics and delayed path-history dynamics in $\mathbb{A}\mathbb{A}\mathbb{A}$. | 96 | 75 | 60 | 72 | 74 | -22 |
| Potential+Action Closure | 9 | Action, potential, variational, and force/acceleration closure, including whether the central dynamics derive from a stable mathematical principle. | 98 | 86 | 45 | 61 | 63 | -35 |
| Conservation+Invariant Closure | 7 | Energy, momentum, angular momentum, charge, quantum-number, and symmetry-invariant closure, including no-go consistency. | 98 | 92 | 50 | 63 | 65 | -33 |
| Formula+Coefficient Recovery | 13 | Explicit recovery of target formulas and coefficients: Lorentz behavior, clock/redshift laws, PPN terms, mass formulas, quantum probabilities, and Standard Model mappings. | 96 | 78 | 28 | 43 | 44 | -52 |
| Parameter+Scale Closure | 10 | Determination status of constants, couplings, scales, constitutive coefficients, and renormalization or calibration freedom. | 70 | 42 | 25 | 37 | 38 | -32 |
| Empirical Precision+Benchmark Validation | 14 | Agreement with direct observation, precision tests, benchmark experiments, simulations, and quantitative pass/fail thresholds. | 98 | 78 | 20 | 34 | 35 | -63 |
| Cross-Regime Bridge | 8 | Mathematical consistency across regimes: micro to macro, quantum to classical, particle to cosmology, weak to strong gravity, and thermodynamics. | 82 | 48 | 42 | 59 | 63 | -19 |
| Internal Constituent Dynamics | 5 | Detailed closure of internal constituent regimes: bound-state/composite dynamics in modern physics and nested shell swarm/Noether swarm dynamics in $\mathbb{A}\mathbb{A}\mathbb{A}$. | 82 | 50 | 55 | 69 | 73 | -9 |
| UV/IR+Regularization Completion | 6 | Ultraviolet and infrared completion quality, including cutoff dependence, singular behavior, regularization limits, horizon/singularity issues, and asymptotics. | 70 | 35 | 30 | 42 | 43 | -27 |
| Falsification Gates | 4 | Explicitness and enforceability of falsification thresholds, stop conditions, validation gates, and failure criteria. | 98 | 88 | 80 | 90 | 92 | -6 |
| Coverage+Interface Readiness | 2 | Coverage completeness across mathematics/geometry-relevant domains, including interface consistency and minimally developed sections. | 99 | 82 | 72 | 88 | 91 | -8 |
| Theory Architecture+Ontic Logic | 8 | Unified theoretical architecture, explanatory parsimony, substrate logic, and avoidance of ad-hoc patching, scored separately from validated formula recovery. | 58 | 35 | 96 | 99 | 99 | 41 |
| **TOTAL** | **100** | **Weighted mean across all categories.** | **88** | **67** | **46** | **59** | **61** | **-27** |

### 2026-05-22 Assessment Notes

The 2026-05-22 assessment raises the weighted $\mathbb{A}\mathbb{A}\mathbb{A}$ score from `59` to `61`. The increase is concentrated in notation, internal constituent dynamics, cross-regime bridge quality, and falsification discipline. It is not a coefficient-recovery jump: the central benchmark rows still lack a retained branch that recovers masses, Lorentz / PPN coefficients, photon-channel coefficients, Born/Bell measures, weak mixing, Standard Model masses, or cosmological residuals from one accepted native record.

The largest corpus-side improvement is the Noether swarm taxonomy. The corpus now separates the broad neutral swarm, shell swarm, and nested shell swarm cases; treats exact binaries as a proof assumption rather than a naming axiom; and routes dynamic exclusion-envelope geometry into a dedicated nested shell swarm geometry chapter. That chapter adds a computable assembly/Noether sea interface diagnostic,

$$
D_{a,X}(\mathbf{x},t)
=
\frac{
\left\|\mathcal{W}_{a,X}^{\mathrm{locked}}(\mathbf{x},t)\right\|
}{
\left\|\mathcal{W}_{a,X}^{\mathrm{locked}}(\mathbf{x},t)\right\|
+
\left\|\mathcal{W}_{\mathrm{sea},X}^{\mathrm{ambient}}(\mathbf{x},t)\right\|
}
$$

with locked and ambient contributions built from the same causal-root kernel, Jacobian floors, branch records, channel projections, and ledger-derived tolerance scales. This justifies raising Axiom+Notation, Cross-Regime Bridge, Internal Constituent Dynamics, and Coverage+Interface Readiness, while keeping the claim below full closure because the interface diagnostic is still a recovery target rather than a validated medium-response theorem.

The Noether sea branch embedding also improves the master-equation bridge. Local assembly branches are now stated as retained branches inside a surrounding Noether sea state and nearby-assembly record:

$$
\mathcal{R}_{\mathrm{branch}}
\left(
B;\Theta_{\mathrm{sea}},\Theta_{\mathrm{asm}},\mathcal{H}_{\partial\Omega}
\right)=0
$$

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

This is a concrete mathematical advance because it prevents isolated seed charts from being read as physical branch closure unless Noether sea, assembly, and boundary residuals are statused. It supports modest increases in Master EOM+Local Dynamics, Potential+Action Closure, Conservation+Invariant Closure, Parameter+Scale Closure, and UV/IR+Regularization Completion.

Executable neutral-swarm diagnostics add negative evidence and sharper first-failure semantics. The current sampled octahedral root-ledger diagnostic passes the all-pairs sampled root/Jacobian screen, while the rigid zero-offset fixed-speed row is rejected by a nonzero tangential residual witness and an ordinary same-source positive-delay no-go. These artifacts improve falsification readiness and empirical/simulation discipline because they report `not_retained` rather than converting a failed seed into branch evidence. The score increase is deliberately small because sampled diagnostics, no-go witnesses for one rigid seed, and finite-mode search schemas do not yet replace an interval-certified all-pairs root ledger, action/Noether row, event ledger, stability certificate, or observer-export recovery.

The total remains far below modern operational closure for the same reason as May 20. The theory stack has stronger taxonomy, residual surfaces, and fail-closed diagnostics, but not the decisive retained branch. Until a single native record supplies $E_{\text{internal}}(A_0)$, $\zeta(A_0)$, $\mathcal{M}_{\text{sea}}^{ab}$, Lorentz/PPN recovery, photon-channel recovery, quantum source measures, Standard Model mapping coefficients, and shared cosmology fits, architecture and auditability must not inflate the validated-closure total.

### 2026-05-20 Assessment Notes

The 2026-05-20 assessment raises the weighted $\mathbb{A}\mathbb{A}\mathbb{A}$ score from `55` to `59`. The gain is real but deliberately limited: May 20 work moved several live areas from vague obligation to exact certificate, residual, no-go, or fail-closed form, while leaving the decisive coefficient and benchmark recoveries open.

The largest gains are in Master EOM+Local Dynamics, Potential+Action Closure, Conservation+Invariant Closure, Falsification Gates, and Cross-Regime Bridge. The master-equation stack now has the normalized delayed-interior characteristic-tail kernel, receiver-gradient cancellation, and wake-history energy/momentum/angular-momentum increments in corpus prose. The spiral program has a theorem-grade A1 constant-$\Omega$ kinematic-balance no-go, a VP-1 outward tangential-drive failure, and an explicit force-ratio obstruction showing that $\Gamma=b_\ast^2c_f^2r_\ast/(\kappa q_1^2)$ is not fixed by the branch kinematics alone. For A1, the radial turn passes for the prescribed history, exact tangential compatibility fails, and the finite-memory inverse-rate witness moves the live burden to interval transport of a nonconstant time law. The proof-program ledger also now records accepted fold constants, multiple parent-complement rejection routes, and a fresh fold-adapted collocation target rather than treating the failed cosine packet as an ambiguous near miss.

Formula, parameter, and empirical scores rise only modestly. The $A_0$ mass-map work now has a compact finite-coordinate no-go, a branch-chart revision contract, fail-closed anti-overfit checks, energy/shielding and medium-response handoffs, and normalized $\alpha_m$ mass-map notation across the corpus. Angular-momentum work has populated symbolic certificate instances, spinor return-table controls, photon Gate B substrate residuals, Stern-Gerlach-like diagnostics, and Bell handoff packets. These are stronger mathematical objects, but they are still blocked on retained branch-chart rows, native photon Gate A branches, event ledgers, apparatus models, or accepted source measures.

The total remains far below modern operational closure because no first accepted $A_0$ branch exists; $\zeta(A_0)$, $E_{\text{internal}}(A_0)$, $\mathcal{M}_{\text{sea}}^{ab}$, Lorentz / PPN coefficients, photon-channel coefficients, Born/Bell measures, weak mixing, Standard Model mass formulas, and cosmological residual fits are still not recovered from one accepted native record. May 20 improves closure pressure by making failures and next certificates sharper, not by passing the central benchmark rows.

### 2026-05-19 Assessment Notes

The 2026-05-19 assessment records a weighted $\mathbb{A}\mathbb{A}\mathbb{A}$ score of `55`. The gain is broad but still pre-closure: the corpus now carries more explicit proof scaffolds, branch-certificate packet schemas, CODATA benchmark discipline, Standard Model mapping targets, quantum record-measure residuals, and shared cosmology residual gates. These changes improve mathematical auditability and executable validation readiness, but they do not yet close the first accepted branch, derive the central constants, or pass precision benchmark rows.

The largest score changes come from the proof and validation surfaces. The collinear-breather and Master EOM material now contain stronger dual-mollified branch-chart, finite-certificate, fold-layer, impulse-bound, continuity, and self-map structures. The $A_0$ branch-certificate protocol and run protocols now specify machine-checkable residual vectors, gate semantics, artifact lists, hidden-tuning failures, and promotion boundaries. These additions justify higher scores for Master EOM+Local Dynamics, Potential+Action Closure, UV/IR+Regularization Completion, Falsification Gates, and Empirical Precision+Benchmark Validation.

Formula, parameter, and cross-regime scores also rise because the corpus now separates exact SI conventions from adjusted CODATA benchmark rows, states the high-pressure roles of $\alpha$, $m_p/m_e$, $R_\infty$, particle masses, and $G$, and gives the hydrogen $\Gamma_N$ spectral row an executable shared-row scaffold rather than a per-line fit. The electroweak, weak-mixing, CKM/PMNS, Higgs, mass-map, Noether sea, and cosmology files now expose more of the required shared-record structure across particle, atomic, gravitational, thermodynamic, and cosmological regimes.

The total remains far below modern operational closure because the decisive derivations are still open. The first certified $A_0$ branch has not passed; $\zeta(A_0)$, $E_{\text{internal}}(A_0)$, and $\mathcal{M}_{\text{sea}}^{ab}$ are not accepted outputs; Lorentz, PPN, redshift, and photon-channel coefficients still lack one accepted Noether sea constitutive map; Born/Bell closure still has negative controls and measure targets rather than a positive pair-provenance theorem; Standard Model mixing and mass formulas remain shared-record theorem targets; and cosmology has a shared residual scaffold but not a fit to SN, BAO, CMB, growth, BBN, and pre-BBN rows with one $\theta_{\mathrm{sea}}$.

### 2026-05-16 Assessment Notes

The 2026-05-16 assessment is rescored under the validated-closure lens. The previous $\mathbb{A}\mathbb{A}\mathbb{A}$ columns were removed because they used a softer equal-weight closure lens that allowed architecture, coverage, and auditability to dominate the total.

$\mathbb{A}\mathbb{A}\mathbb{A}$ still scores very high in Theory Architecture+Ontic Logic because the corpus has a coherent substrate-first architecture, explicit causal-wake ontology, delayed Master Equation of Motion, Noether sea bridge program, and strong cross-document logic. That score is intentionally preserved rather than diluted.

The total is much lower because the central tested-physics closures remain open. The first certified $A_0$ branch is still absent, $\zeta(A)$ and $E_{\text{internal}}(A)$ are not extracted for a mass map, Lorentz and PPN coefficients are not yet derived from accepted attractors, Born-rule and Bell closure remain source-measure targets, weak `V-A` and CKM/PMNS quantitative closure are open, cosmology lacks an empirical shared-state fit, and UV/IR completion still depends on terminal-alignment, singularity, horizon-entropy, and effective-GR recovery proofs.

Modern physics now scores higher in the operational column because the revised lens rewards validated mathematical closure: GR, QFT, QED, QCD, the Standard Model, and LCDM-era phenomenology carry many precise equations, coefficients, and benchmark tests. Its mechanism/foundational score remains lower because the inherited stack does not supply a single ontic mechanism for quantum measurement, gauge/matter origin, gravity/quantum unification, parameter values, or cosmological initial conditions.
