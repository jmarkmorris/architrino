# Validation

## Validation Protocols

This chapter collects the observer-level and simulation-level checks that the framework must pass if it is to retain an absolute frame without contradicting established data. Its purpose is to translate foundational claims into concrete validation tasks: null tests, atomic comparisons, and frame-proxy checks.

It should be used with [Failure Criteria](../../../../markdown/aaa/validation/failure-criteria.md), [Constraint Ledger](../../../../markdown/aaa/validation/constraint-ledger.md), [No-Go Theorems](../../../../markdown/aaa/validation/no-go-theorems.md), [Detecting the Absolute Frame](../../../../markdown/aaa/foundations/detecting-the-absolute-frame.md), and [Lorentz Kinematics](../../../../markdown/aaa/spacetime/lorentz-kinematics.md).

The note is therefore a gatekeeping document. It should tell the reader what has to be reproduced, what mechanism is being claimed, and where falsification would occur.

### Validation Protocols: Preferred-Frame Leakage and Frame Proxies

#### Complete-State and Observational Proxies
* **Complete-state diagnostic:** The $\mathbb{U}_{\text{now}}$ universe-state perspective can use the source-tagged wake-concentricity diagnostic in [Detecting the Absolute Frame](../../../../markdown/aaa/foundations/detecting-the-absolute-frame.md). This is a foundational and simulation-level bookkeeping result, not an operational laboratory protocol for Physical Observers.
* **CMB rest-frame proxy:** The CMB dipole-free frame is an empirical large-scale cosmology proxy for Noether-Sea rest. It is not an identification of the Euclidean-void rest frame, and it does not give Physical Observers direct access to complete source-tagged wake geometry.
* **Protocol:** Compare simulation outputs against CMB-frame observational summaries only as a large-scale consistency check for Noether-Sea and cosmological transport records.

#### Null Tests for Absolute-Frame Drift
* **Simulation Protocol:** Run a simulated Michelson-Morley experiment through a declared Noether-Sea state.
* **Success Criterion:** The observer-level interference pattern must remain invariant, within the declared leakage bound, as the assembly is rotated relative to the Euclidean-void rest frame.
* **Mechanism to Verify:** Check that the Noether swarm naturally contracts by $\gamma^{-1}$ due to its internal architrino trajectories being compressed by motion through the Noether-Sea state.

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
u_r(\alpha)\approx1.51\times10^{-10},
$$
while the Newtonian constant is
$$
G=6.67430\times10^{-11}\,\mathrm{m^3\,kg^{-1}\,s^{-2}},
\qquad
u_r(G)\approx2.25\times10^{-5}.
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
- Noether-Sea coupling (emergent metric, inertia)

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
\Delta \nu_{\text{Cs}} = f(\text{nested shell swarm geometry, } c_f, \epsilon, \text{ Noether-Sea coupling})
$$

**Challenge:** The frequency is determined by:
- The Middle Binary's orbital frequency (sets the magnetic moment)
- The coupling strength between electron and atomic nucleus (mediated by Noether-Sea response, with photon exchange as the observer-level channel)
- The nuclear configuration (133 nucleons = complex assembly)

**Pathway:**
1. Calculate the electron's Middle Binary orbital frequency $\omega_{\text{MB}}$ for Cs ground state
2. Calculate the magnetic moment $\mu = \frac{\epsilon \cdot \omega_{\text{MB}} \cdot r_{\text{MB}}}{2}$ (classical analogue)
3. Calculate the nuclear spin coupling via Noether-Sea-mediated potential exchange
4. Derive the splitting frequency

---

#### The Meter (Length Unit) — $c$

**SI Definition:**
$$
1 \text{ m} = \frac{c}{299,792,458} \text{ seconds}
$$
where $c$ is the speed of light.

**Architrino Interpretation:**

The speed of light $c$ is **not fundamental**. It is the low-gradient operational speed of photon assemblies, modeled as coaxial contra-rotating pro/anti planar pairs, propagating through the Noether Sea.

**Key relation:**
$$
c_\gamma(\mathbf{x},t)=\frac{c_f}{\chi_\gamma(\mathbf{x},t)},
\qquad
\chi_\gamma(\mathbf{x},t)=f_\gamma\!\left(\rho_{\text{NS}}(\mathbf{x},t),n(\mathbf{x},t),\text{Noether-Sea state}\right)
$$

In the low-energy limit (flat spacetime, weak Noether-Sea gradients):
$$
c \approx c_f \quad (\text{small corrections from Noether-Sea refraction})
$$

**What we must show:**
- Photons are coaxial contra-rotating pro/anti planar pairs whose bosonic/statistical behavior is recovered as a downstream closure target
- Their propagation through the Noether Sea is **not instantaneous** but limited by $c_f$
- The effective speed $c$ measured by operational observers (made of assemblies) matches $c_f$ within experimental precision (~$10^{-17}$ for Lorentz tests)

**Candidate deviation channels:**
- In strong gravitational fields (dense Noether Sea): $c_\gamma < c_f$ in the photon channel (gravitational lensing, Shapiro delay)
- At Planck scales (Noether-Sea microstructure resolves): $c_\gamma \neq c_f$ in the photon channel (Lorentz violation signatures)

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
Temperature is the **mean kinetic energy per degree of freedom** in the Noether-Sea bath:
$$
\langle E_{\text{kinetic}} \rangle = \frac{1}{2} k_B T
$$

For a Noether-Sea assembly (neutral 2:2 swarm):
- 6 degrees of freedom (3 translational + 3 rotational)
- Mean energy: $\langle E \rangle = 3 k_B T$

**What we must derive:**
$$
k_B = f(\text{Noether-Sea assembly mass, } c_f, \text{ thermal equilibrium distribution})
$$

**Pathway:**
1. Calculate the **effective mass** of a Noether-Sea assembly (from nested shell swarm dynamics)
2. Assume **thermal equilibrium** (Maxwell-Boltzmann distribution in the Noether Sea)
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
- The proton mass $m_p$ from nested shell swarm geometry (3 quarks = 3 nested shell swarms + gluon wake structure + Noether-Sea coupling)

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
| $k_B$ | **Derivation target (open)** | Noether-Sea thermal equilibrium + assembly mass |
| $N_A$ | **Emergent** | Follows from proton mass derivation |
| $K_{\text{cd}}$ | **Anthropic** | Human biology; not fundamental physics |

---

### Implications: Reducing the SI to Architrino Postulates

If the $\mathbb{A}\mathbb{A}\mathbb{A}$ program succeeds, we can **replace** the seven SI-defining constants with:

#### Candidate Substrate Inputs (Architrino SI)
1. **Architrino polarity-unit magnitude** $\epsilon=|e|/6$ (with observer charge benchmark $|e|=6\epsilon$)
2. **Field speed** $c_f$ (replaces $c$)
3. **Nested shell swarm geometry parameter** (e.g., outer radius $r_{\text{outer}}$ or max-curvature radius) (replaces $h$)
4. **Noether-Sea assembly mass** $m_{\text{NS}}$ (replaces $k_B$ when combined with $c_f$)

**Everything else is intended to be derived after closure:**
- $|e| = 6\epsilon$
- $c_{\text{eff}}\to c_f$ in the low-gradient Noether-Sea limit
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
   - Show photon propagation through the Noether Sea matches $c$ to $<10^{-17}$
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

5. **Derive $k_B$ from Noether-Sea thermodynamics**
   - Calculate Noether-Sea assembly effective mass
   - Show thermal equilibrium reproduces Maxwell-Boltzmann
   - Predict $k_B$ value

#### Tier 3 (Refinement)
6. **Map all SM particles to nested shell swarm recipes**
   - Create "particle cookbook" (analogous to chemical formulas)
   - Show charge, spin, statistics all emerge from geometry

7. **Explain fine-structure constant $\alpha$**
   - $\alpha = \frac{e^2}{4\pi \epsilon_0 \hbar c} \approx 1/137$
   - In architrino terms: $\alpha = f(\epsilon, c_f, r_{\text{outer}}, \text{Noether Sea})$
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

The central bookkeeping rule is simple: not every symbol that appears in an equation is a free parameter. Some symbols are fixed substrate inputs, some are assembly-dependent outputs, some are constitutive functions of the Noether Sea, and some are measured benchmarks that the theory is supposed to recover.

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

These are state variables, constitutive fields, or derived outputs. They may be controlled by a smaller parameter set, but they are not themselves independent knobs.

#### Benchmark versus postulate

The following observer-level quantities are closure targets, not primitive inputs:

- $e$,
- $h,\hbar$,
- $G$,
- $\gamma_{\text{eff}},\beta_{\text{eff}},\alpha_i$,
- particle masses and electroweak angles.

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
- $\kappa$ remains to be assessed because its primitive, derived, or normalization-sensitive status is still open.
- $\rho_{\text{NS},0}$ and related medium-density normalizations remain naturalness risks until energy shielding and cosmological closure are quantified.

#### Regulator versus physical pulse

The wake-width regulator $\eta$ is a computational and analytic regularization, not a claim that causal wakes are fundamentally pulsed. It smooths causal wake surfaces so integrals and simulations can be evaluated with finite resolution. As $\eta\to0$, the intended limit is the continuous path-history law, with each discrete time step in a simulation approximating the contribution from a narrow causal wake surface rather than replacing the underlying continuous emission.

### Layer I: Substrate and Kernel Parameters

These symbols belong to the delayed microscopic law itself.

| ID | Symbol | Class | Current status | Meaning | Primary home |
| --- | --- | --- | --- | --- | --- |
| K1 | $c_f$ | Fundamental parameter | Primitive | field speed of causal wake propagation | [../dynamics/master-equation.md](../../../../markdown/aaa/dynamics/master-equation.md), [../foundations/absolute-timespace.md](../../../../markdown/aaa/foundations/absolute-timespace.md) |
| K2 | $\epsilon$ | Fundamental parameter | Primitive | potential polarity-unit magnitude, with observer-level electric charge reconstructed from it | [../assemblies/fermions/quantum-number-mapping.md](../../../../markdown/aaa/assemblies/fermions/quantum-number-mapping.md), [../interactions/gauge-structure-emergence.md](../../../../markdown/aaa/interactions/gauge-structure-emergence.md) |
| K3 | $\kappa$ | Fundamental parameter or normalization-sensitive coupling | Open | universal coupling strength in the per-hit acceleration law | [../dynamics/master-equation.md](../../../../markdown/aaa/dynamics/master-equation.md), [architrino-si-base-units.md](../../../../markdown/aaa/validation/architrino-si-base-units.md) |
| K4 | $\eta$ | Regulator / convention | Open but non-ontological | mollifier width used to regularize causal wake surfaces for smooth dynamics and numerics | [simulations/action-energy/well-posedness-and-regularization.md](../../../../markdown/aaa/validation/simulations/action-energy/well-posedness-and-regularization.md), [../dynamics/master-equation.md](../../../../markdown/aaa/dynamics/master-equation.md) |
| K5 | $Z_e$ | Regulator / convention | Convention, default $Z_e=1$ | coarse-graining / normalization factor in the substrate-to-observer charge map | [../interactions/gauge-structure-emergence.md](../../../../markdown/aaa/interactions/gauge-structure-emergence.md), [../assemblies/fermions/quantum-number-mapping.md](../../../../markdown/aaa/assemblies/fermions/quantum-number-mapping.md) |

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

These symbols control the handoff from the Euclidean substrate plus Noether Sea to effective metric language.

| ID | Symbol | Class | Current status | Meaning | Primary home |
| --- | --- | --- | --- | --- | --- |
| C1 | $\rho_{\text{NS},0}$ | Constitutive closure target | Open | reference Noether swarm density used to normalize the Noether Sea | [../spacetime/emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md), [../spacetime/proper-time-and-time-dilation.md](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md) |
| C2 | $n(\mathbf{x},t)$ | State variable / field | Derived field | normalized Noether swarm density, $n=\rho_{\text{NS}}/\rho_{\text{NS},0}$ | [../spacetime/emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md), [../spacetime/proper-time-and-time-dilation.md](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md) |
| C3 | $\Omega(\mathbf{x}),\xi(\mathbf{x})$ | Constitutive closure target | Open | clock-channel and ruler-channel response functions in the effective metric subclass | [../spacetime/emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md), [../spacetime/lorentz-kinematics.md](../../../../markdown/aaa/spacetime/lorentz-kinematics.md) |
| C4 | $\Phi_{\text{eff}}(\mathbf{x},t)$ | State variable / field | Derived field | constitutive effective potential defined from the clock channel | [../spacetime/emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md), [../spacetime/proper-time-and-time-dilation.md](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md) |
| C5 | $c_{\text{eff}}(\mathbf{x},t)$ | State variable / field | Derived field | Noether-Sea dressed assembly-channel propagation speed used for clock/ruler closure and effective-metric comparisons, with $c_{\text{eff}}\to c_f$ in weak homogeneous conditions; separate from photon-channel speed $c_\gamma$ unless Gate A closes that identification | [../spacetime/emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md), [../spacetime/ppn-parameters.md](../../../../markdown/aaa/spacetime/ppn-parameters.md) |
| C5a | $\chi_{\text{sea}}(\mathbf{x},t)$ | Derived response field | Derived from $c_{\text{eff}}$ | Noether-Sea delay factor, $\chi_{\text{sea}}=c_f/c_{\text{eff}}$; replaces optical refractive-index notation in Noether-Sea propagation maps | [../spacetime/noether-sea.md](../../../../markdown/aaa/spacetime/noether-sea.md), [../spacetime/emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md), [../spacetime/ppn-parameters.md](../../../../markdown/aaa/spacetime/ppn-parameters.md) |
| C6 | $\gamma_{\text{eff}}$ | Constitutive closure target with observable meaning | Open | first-order refraction / space-curvature coefficient in the weak-field map | [../spacetime/ppn-parameters.md](../../../../markdown/aaa/spacetime/ppn-parameters.md) |
| C7 | $C_2$ or $\beta_{\text{eff}}$ | Constitutive closure target with observable meaning | Open | second-order clock-channel nonlinearity entering the $g_{00}$ expansion | [../spacetime/ppn-parameters.md](../../../../markdown/aaa/spacetime/ppn-parameters.md) |
| C8 | $\Xi_1,\Xi_2,\Xi_3,\Xi_4$ | Constitutive closure target | Open | preferred-frame leakage coefficients in the weak-field constitutive expansion | [../spacetime/ppn-parameters.md](../../../../markdown/aaa/spacetime/ppn-parameters.md) |
| C9 | $\mathcal{M}_{\text{sea}}^{ab}$ | Constitutive closure target | Open | medium-response tensor that maps shielded internal assembly energy to inertial momentum response, reducing to $h^{ab}/c_{\text{eff}}^2$ in a homogeneous isotropic Noether-Sea cell | [../dynamics/energy.md](../../../../markdown/aaa/dynamics/energy.md), [../assemblies/particle-masses.md](../../../../markdown/aaa/assemblies/particle-masses.md) |

### Layer IV: Observer-Level Benchmarks and Derived Outputs

These quantities are where closure is tested. They are not substrate inputs.

| ID | Symbol | Class | Current status | Meaning | Primary home |
| --- | --- | --- | --- | --- | --- |
| O1 | $e$ | Observable benchmark | Derived target | elementary charge reconstructed from substrate charge and normalization map | [../assemblies/fermions/quantum-number-mapping.md](../../../../markdown/aaa/assemblies/fermions/quantum-number-mapping.md), [../interactions/gauge-structure-emergence.md](../../../../markdown/aaa/interactions/gauge-structure-emergence.md) |
| O2 | $h,\hbar$ | Observable benchmark / geometric target | Open | full-cycle action quantum and radian-normalized angular-momentum quantum to be related to nested shell swarm alignment, orbital closure, and any lower recordable basin-measure scale derived by quantum closure | [../philosophy-history/theory-bridges/angular-momentum-and-spin.md](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md), [../philosophy-history/theory-bridges/planck-scale-nested-shell-swarm-alignment.md](../../../../markdown/aaa/philosophy-history/theory-bridges/planck-scale-nested-shell-swarm-alignment.md), [architrino-si-base-units.md](../../../../markdown/aaa/validation/architrino-si-base-units.md) |
| O3 | $G$ or $G_{\text{eff}}$ | Observable benchmark / constitutive target | Open | effective gravitational coupling emerging from medium compliance and alignment geometry | [../philosophy-history/theory-bridges/planck-scale-nested-shell-swarm-alignment.md](../../../../markdown/aaa/philosophy-history/theory-bridges/planck-scale-nested-shell-swarm-alignment.md), [../spacetime/emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md) |
| O4 | $m_{\text{inertial}}(A)$ | Derived output | Open | inertial mass of assembly $A$, extracted operationally from shielding and medium response | [../dynamics/energy.md](../../../../markdown/aaa/dynamics/energy.md), [../assemblies/particle-masses.md](../../../../markdown/aaa/assemblies/particle-masses.md) |
| O5 | $\theta_W^{\text{bare}}$ and $\theta_W$ | Geometric target / observable benchmark | Open | bare geometric weak-mixing increment and the measured electroweak mixing angle it must eventually inform | [../assemblies/fermions/weak-mixing-angle.md](../../../../markdown/aaa/assemblies/fermions/weak-mixing-angle.md), [../interactions/gauge-structure-emergence.md](../../../../markdown/aaa/interactions/gauge-structure-emergence.md) |
| O6 | $(\alpha_1,\alpha_2,\alpha_3)$ | Observable benchmark | Open | standard PPN preferred-frame coefficients derived from $(\Xi_1,\Xi_2,\Xi_3)$ | [../spacetime/ppn-parameters.md](../../../../markdown/aaa/spacetime/ppn-parameters.md) |

### Canonical Relations

The ledger above is only useful if the interfaces between layers stay explicit. The following relations are the current canonical handoff points in the corpus.

#### 1. Microscopic delayed dynamics

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

#### 2. Charge reconstruction

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

#### 3. Medium normalization and clock-channel potential

The constitutive spacetime layer uses
$$
\rho_{\text{NS}}(\mathbf{x},t)=\rho_{\text{NS},0}\,n(\mathbf{x},t),
$$
and
$$
\Phi_{\text{eff}}(\mathbf{x})
=
c_f^2\ln\!\big(\Omega(\mathbf{x})\xi(\mathbf{x})\big).
$$

Here $\xi$ is the Noether swarm envelope shape ratio, while $\Omega\xi$ is the clock-rate factor used by this exponential metric subclass after the geometry-to-clock map is fixed.

This is the cleanest current statement of the Noether-Sea-to-metric handoff:
$$
(\delta_{ij},n,\chi_{\text{sea}},\Phi_{\text{eff}},\text{stress})
\mapsto
g_{\mu\nu}^{\text{eff}}.
$$

#### 4. Weak-field PPN extraction

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

#### 5. Mass map

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

#### 6. Planck-alignment map

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

#### 7. Weak-mixing branch structure

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

### What Is Not Yet Closed

The current corpus supports the following conservative closure assessment.

#### Closed enough to treat as canonical

- $c_f$ is treated consistently as the substrate propagation speed, even when chapters temporarily write $v=1$.
- $\epsilon$ is treated consistently as the potential polarity-unit magnitude.
- $\rho_{\text{NS},0}$ is the reference density symbol for the Noether Sea.
- $\Phi_{\text{eff}}=c_f^2\ln(\Omega\xi)$ is the canonical clock-channel potential definition for the exponential metric subclass, with $\xi$ retained as a geometry-first Noether swarm shape ratio.

#### Still genuinely open

- whether $\kappa$ is primitive, derived, or partly a normalization artifact,
- whether $\eta$ should disappear entirely from physical statements after the weak limit is taken,
- the $A_0$ reference-attractor output packet,
- the actual nested shell swarm radii/frequency ladder,
- the shielding map $\zeta(A)$ across the fermion spectrum,
- the medium-response tensor $\mathcal{M}_{\text{sea}}^{ab}$ that turns shielded internal energy into inertial and gradient response,
- the constitutive functions $(\Omega,\xi)$ and the weak-field coefficient set $(\gamma_{\text{eff}},C_2,\Xi_i)$,
- the Planck-alignment identification of $(R_{\text{align}},\mathcal{A}_{\text{align}}^{\text{cycle}},I_{\text{align}},h,\hbar,G)$,
- and the reduction of weak-mixing branch labels to a predictive electroweak closure.

### Immediate Parameter-Closure Priorities

The shortest path to a better closure score is:

1. Fix the status of $\kappa$ once, with an explicit statement of what part is physical coupling and what part is absorbed normalization.
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
\mathcal{P}_{\text{shared}} \neq \varnothing,
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
- Noether Sea participation is allowed, but it must be recorded as a reactant, product reservoir, or medium-excitation channel rather than left implicit.
- W, Z, photon, and pair-production language may be retained at observer level, while the substrate map must identify the transient assembly, exchanged payload, or planar-mode nucleation event being invoked.
- Radiative, photon-capture, and sub-threshold shedding entries must attach the shared radiation event-record schema: source assembly, trigger geometry, $\delta\Theta_a$, $E_{\text{exc}}$, $E_\gamma$, recoil, medium excitation, polarization handoff, causal-wake ledger, and closure status.
- Any weak-channel ledger that depends on chirality, axial-frame orientation, CKM/PMNS mixing, or antineutrino routing remains provisional until the corresponding geometry is derived.
- Any reaction-level spin, helicity, polarization, or vector-channel angular-momentum entry is a downstream consumer of the angular-momentum and spin workstream. It should record what must close, not function as a local proof of that closure.

### Provenance Protocol

Each reaction record should state:

1. **Observer channel:** the standard reaction label, including historical labels such as `beta decay` only when immediately translated into native reaction language.
2. **Active assemblies:** which incoming assemblies actually reconfigure, and which are spectators.
3. **Noether-Sea participation:** whether local Noether swarms, neutral binaries, axial layers, or medium excitations are consumed, split, reconfigured, or returned.
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
| Noether-Sea input/output | Neutral swarms, axial material, or medium excitations recruited or returned |
| Conserved inventory | $E/P$ totals and charge/polarity balance |
| Energy-momentum and angular-momentum ledger | Internal energy, recoil, emitted assemblies, spin/vector ledger terms, wake-carried angular momentum, and medium excitation |
| Radiation event record, when applicable | Source assembly, source-depletion row, trigger geometry, $\delta\Theta_a$, $E_{\text{exc}}$, $E_\gamma$, recoil, medium excitation, polarization handoff, causal-wake ledger, photon Gate B event residual when $E_\gamma\ne0$, and closure status |
| Provenance data | Source identity, emission time, causal-root branch, and local Noether-Sea state |
| Closure status | What is established, what is assumed, and what remains to derive |

### Residual-Routing Event-Ledger Contract

Residual-routing material enters this ledger only as a theorem-target contract. It does not by itself prove that any weak, radiative, pair-production, nuclear, or cosmology-facing reaction channel has closed. The common target is:

$$
\mathcal{R}(\Gamma,\mathcal{H},\rho_{\text{NS}},\chi_{\text{sea}},\dots)
\longrightarrow
\{B_i\}
\longrightarrow
\mathcal{L}_{E\mathbf{p}\mathbf{J}}.
$$

Here $\mathcal{R}$ is the replayable residual computed from the local assembly state, path-history ledger, Noether swarm density, Noether-Sea delay factor, and any named sector variables. The set $\{B_i\}$ is the finite list of admissible output channels, such as retuning, bound excitation, radiation, recoil, medium heating, weak or nuclear reaction, record formation, release channel, or branch transition. The event ledger $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ is the balance object that must close after all selected outputs are named.

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
\right),
$$

where $Z_S$ denotes sector-local variables such as nuclear configuration, weak-corridor data, apparatus state, or horizon-interface boundary data when those variables control the route. A routed reaction event is a triple

$$
\mathsf e=(X,I_{\mathsf e},Y_{\mathsf e}),
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
\right)(\mathsf e).
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
\mathcal Q_{\mathrm{src}}^{+}.
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
\mathcal Q_{\mathrm{rem}}^{0},
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
}.
$$

The Gate B angular-momentum row is the $\mathcal Q=\mathbf J$ projection of this same identity. Let the event window be labeled by superscript $0$, and let $\mathbf J_{\mathrm{src}}^-$ and $\mathbf J_{\mathrm{src}}^+$ be the source angular-momentum ledger before and after the event. Define

$$
\Delta\mathbf J_{\mathrm{src}}^{0}
=
\mathbf J_{\mathrm{src}}^-
-
\mathbf J_{\mathrm{src}}^+.
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
\mathbf J_{\mathrm{rem}}^{0}.
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
\mathbf J_{\mathrm{rem}}^{0}.
$$

For a Gate B-admissible photon row, helicity is the projection

$$
\lambda_{\mathrm{hel}}
=
\frac{\hat{\mathbf e}\cdot\mathbf J_{\gamma}^{\mathrm{sub}}}{\hbar},
\qquad
\lambda_{\mathrm{hel}}\in\{+1,-1\},
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
\frac{\|\mathbf B_{\gamma}^{0}\|}{\hbar}.
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
}.
$$

The denominator is understood in the normalized angular-momentum units of the event ledger. Missing source, recoil, medium, wake, handoff, or remnant rows keep the photon record provisional even when the outgoing photon substrate ledger is algebraically clean.

#### Provenance-Preserving Polarity Inventory

Count conservation is not enough for reaction closure. Since the ontic architrino set $\mathcal{A}$ is fixed, every serious reaction record must route identity-labeled architrinos through the event after expanding the input and output state to include any explicitly recruited or returned Noether-Sea content.

Let $R_{\mathsf e}^{\mathrm{in}}\subset\mathcal{A}$ and $R_{\mathsf e}^{\mathrm{out}}\subset\mathcal{A}$ denote the participating architrino identities before and after the event. A closed event must supply a bijection
$$
\Pi_{\mathsf e}:R_{\mathsf e}^{\mathrm{in}}\to R_{\mathsf e}^{\mathrm{out}}
$$
such that, for every routed identity $a$,
$$
q_{\Pi_{\mathsf e}(a)}=q_a,\qquad
q_a=\sigma_a\epsilon,\qquad
\sigma_a\in\{-1,+1\}.
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
| Residual | Define $\mathcal{R}$ from the local state, causal-wake ledger, density field, Noether-Sea delay factor, and sector variables. |
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
4. **Ledger closure:** $\mathcal{L}_{E\mathbf{p}\mathbf{J}}(\mathsf e)=\mathbf{0}$ after adding the sector-required charge, polarity, architrino-inventory, identity-routing, path-history, Noether-Sea, and remnant rows.
5. **Benchmark compatibility:** the promoted event recovers the sector benchmark without breaking any required weak, quantum, gravity, hadronic, radiation, cosmology, conservation-law, or direct-observation acceptance gate.

This is a promotion criterion, not a completed theorem. Worked sector cases remain open until at least one channel supplies a named residual, a named threshold or separatrix, a channel decision, a complete $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ ledger, a benchmark recovery, and a failure diagnostic in one record. The free-neutron beta reaction, the $t\to b+W^+$ channel, radiation-coupled pair channels, and nuclear reaction examples therefore remain provisional where their sector records still lack closed residual routing, outgoing swarm provenance, angular-momentum balance, rate recovery, or quantitative benchmark closure.

#### Failure Modes

| Failure mode | What blocks promotion |
| --- | --- |
| Residual replay failure | Two records with the same $(\Gamma,\mathcal{H},\rho_{\text{NS}},\chi_{\text{sea}},Z_S)$ produce different $\mathcal{R}$ values or different selected channel sets without an additional recorded state variable. |
| Boundary failure | A resolved event occurs while every required $g_i(X,\mathcal{R})<0$, or two mutually exclusive selected channels demand incompatible output assignments. |
| Ledger residual failure | After all sector-required rows are included, $\Delta_E\ne0$, $\Delta_{\mathbf{p}}\ne\mathbf{0}$, or $\Delta_{\mathbf{J}}\ne\mathbf{0}$. |
| Inventory or provenance failure | $\Delta_{\mathrm{pol}}\ne0$, $\Delta_{\mathrm{arch}}\ne0$, or $\Delta_{\mathrm{path}}\ne0$ after the claimed Noether-Sea, corridor, source-identity, emission-time, causal-root, and branch-Jacobian records are included. |
| Identity-routing failure | No bijection $\Pi_{\mathsf e}$, or equivalent identity route, maps participating input architrinos to participating output architrinos after named Noether-Sea reservoir terms are included. |
| Medium or remnant failure | $\Delta_{\mathrm{med}}\ne0$ or $\Delta_{\mathrm{rem}}\ne0$, meaning the route used medium heating, recoil, retained excitation, or remnant deformation as an implicit loss term. |
| Retuning failure | The same benchmark family can be recovered only by changing the residual definition, the channel boundary, or the Noether-Sea state variables between sector cases. |
| Cross-sector failure | The local route succeeds only by violating another required sector acceptance gate. |

### Weak-Corridor Provenance Gate

Weak reactions now require an explicit corridor-provenance stance. The current corpus supports two live possibilities:

1. **Transaction-payload corridor:** $W^\pm$ carries the charged triad payload and phase relation, while final-state pro/anti Noether swarm material is supplied by the local Noether Sea or by explicitly identified incoming assemblies.
2. **Provenance-carrying corridor:** $W^\pm$ carries not only the charged transaction payload but also enough pro/anti Noether swarm provenance to seed some final-state lepton or antilepton swarm content.

The ledger should not choose between these silently. For each serious weak record, add a row or note that states which stance is being used, which Noether swarm material enters and exits, and what would falsify the accounting. This gate is coupled to the weak-coupling-triad exposure problem: the same geometry that permits left-handed charged-current docking must also determine which corridor payload can be transferred and where the outgoing lepton swarms come from.

Minimum weak-channel records should therefore include:

- the active weak-coupling-triad swap,
- the corridor provenance stance,
- all Noether-Sea or incoming-assembly swarm material used for charged lepton and neutrino outputs,
- the CKM/PMNS overlap weight when a flavor or generation branch is selected,
- and the energy, angular momentum, polarity, and path-history terms needed for deterministic replay.

### Weak Reaction Case: $t \to b + W^+$ Channel

Observer-level notation:

$$
t \to b + W^+,\qquad W^+ \to e^+ + \nu_e.
$$

Native status: provisional weak-reaction provenance map.

The active quark change is an axial-layer reconfiguration. In the current assembly catalog, the top-to-bottom transition is represented as a shift from the top axial pattern to the bottom axial pattern:

$$
(1E,5P)_{\text{axial}} \to (4E,2P)_{\text{axial}}.
$$

Equivalently, the active quark sector requires a $+3E,-3P$ axial exchange. In observer language this is the $W^+$ channel. In substrate language it is a transient payload and coupling event whose geometry, chirality selection, and energy routing still need closure.

The lepton products cannot be asserted as creation from nothing. Their swarm and axial-layer material must be drawn from a local Noether-Sea reservoir or from explicitly identified incoming assemblies. The provisional ledger target is:

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
n \to p + e^- + \bar{\nu}_e,
$$

with the active quark-level comparison

$$
d \to u + W^-,\qquad W^- \to e^- + \bar{\nu}_e.
$$

Native label: free-neutron beta reaction.

The spectator structure is straightforward: one $u$ and one $d$ in the neutron pass through the reaction unchanged. The active channel is the second down-like assembly reconfiguring into an up-like assembly.

The axial-layer comparison is:

$$
(4E,2P)_{\text{axial}} \to (1E,5P)_{\text{axial}}.
$$

So the active quark assembly sheds three $E$-type axial units and receives three $P$-type axial units. The natural provenance hypothesis is that local neutral Noether-Sea material supplies the compensating polarity units while the ejected $E$-type material participates in electron axial-layer formation.

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
| Electron assembly | Combine the ejected $3E$ contribution with additional local Noether-Sea material and a suitable swarm | Provisional map |
| Antineutrino assembly | Identify neutral swarm orientation, axial-layer routing, and weak-channel phase relation | Open derivation target |
| Noether Sea | Record every neutral swarm, axial layer, or medium excitation consumed or returned | Required |
| Energy and angular momentum | Track mass difference, recoil, electron kinetic energy, antineutrino energy, and medium response | Required |

This map supports a strong but bounded claim: beta reaction charge bookkeeping can be interpreted as local separation and rerouting of neutral Noether-Sea material plus active quark axial reconfiguration. It does not yet establish a full weak-interaction derivation, because chirality selection, antineutrino routing, and quantitative rate closure still belong to the weak-sector closure program.

### Closure Targets

The reaction ledger needs at least four tables for each serious channel:

1. **Constituent inventory table:** swarm and axial-layer $E/P$ counts for every input, output, Noether-Sea contribution, and returned medium product.
2. **Energy-momentum table:** internal energy changes, kinetic output, recoil, photon assemblies, neutrino channel, and medium excitation.
3. **Geometry table:** axial frame, swarm orientation, chirality, polarity routing, and allowed coupling/docking geometry.
4. **Path-history table:** causal-root branches, source identities, emission times, and local Noether-Sea state variables needed for deterministic replay.

Radiative or photon-coupled channels also need the shared radiation event-record table. The polarization handoff in that table remains inherited from Gate B; this ledger records the required transverse and capture/rejection fields but does not derive photon spin locally.

### Validation Links

- Weak-sector geometry and chirality closure remain tied to [Quantum Number Mapping](../../../../markdown/aaa/assemblies/fermions/quantum-number-mapping.md), [Weak Mixing Angle](../../../../markdown/aaa/assemblies/fermions/weak-mixing-angle.md), and [Weak-Mixing CKM](../../../../markdown/aaa/philosophy-history/theory-bridges/weak-mixing-ckm.md).
- Radiative and pair-production provenance should use [Synchrotron Cascades](../../../../markdown/aaa/reactions/synchrotron.md), [Bremsstrahlung](../../../../markdown/aaa/reactions/bremsstrahlung.md), and [Reaction-Cosmology Provenance Ledger](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md).
- Parameter closure belongs in [Parameter Ledger](../../../../markdown/aaa/validation/parameter-ledger.md).

## Constraint Ledger

Notes collected here document the falsification criteria, ordering priorities, and supporting mechanisms for the architrino framework. Keep this page focused on observable constraints so each model version can be checked against experimental scrutiny.

### Experimental Constraint Ledger and Falsification Criteria

This ledger crystallizes the measurable thresholds and theoretical guardrails that could falsify the architrino proposal. Each numbered entry combines the empirical bound, the proposed mechanism, and the explicit failure condition so that we can track how discrete experimental results shape or reject the model.

#### Lorentz Invariance & Preferred Frame Effects (Tier 1)

The purpose of this section is to define the combination of experimental isotropy and observational invariance that must hold if a putative absolute frame is to remain hidden. We identify the observables, derive the emergent timing/ruler behavior implied by the Noether Sea, and explicitly state the tolerance beyond which the preferred frame would become perceivable.

* **Constraint** – isotropy from Michelson–Morley and resonator experiments constrains $|\Delta c/c| < 10^{-17}$ while atomic clock sidereal drift stays below $10^{-16}$, keeping Lorentz-invariance leakage under the $10^{-17}$ falsification threshold.
* **Consolidated Requirement** – prove preferred-frame hiding: architrino assemblies must acquire Lorentz-compatible deformation and clock behavior in the Euclidean-void rest frame so no local observer can detect the Noether Sea's rest frame.
* **Observable** – local Lorentz invariance is preserved.
* **Mechanism** – assembly-based clocks/rulers must emerge with proper time $\tau$ rather than absolute time $t$.
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
}{c_0}\,d\ell .
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
}{\sigma_{\Delta t}},
$$
where $\mathcal{E}$ is the declared transient catalog, $\Delta t_{\mathrm{src}}$ is the modeled source lag, and $\sigma_{\Delta t}$ is the adopted timing uncertainty.

* **Constraint** – the same photon branch that recovers local Lorentz synchronization must keep $\mathcal{R}_{\gamma\mathrm{disp}}$ below the declared catalog threshold without per-source retuning.
* **Observable** – measured arrival-time differences across photon energy or frequency bands, source-lag model, redshift, instrument timing uncertainty, and event-selection rule.
* **Validation Target** – Gate A in [Electroweak Bosons](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md) must derive a nondispersive weak homogeneous photon branch rather than assume it after the fact.
* **Failure Condition** – a photon closure branch fails if it predicts an accumulated frequency-dependent delay in the validated band, hides that delay by changing the source-lag model event by event, or uses a different $c_\gamma$ / $\chi_\gamma$ record from the one used in [Lorentz Kinematics](../../../../markdown/aaa/spacetime/lorentz-kinematics.md).

#### The Absolute-Frame Drift Check (Lorentz Contraction Enforcement)

This entry frames the requirement that the underlying Noether Sea affords a dynamical contraction mechanism to assemblies moving through the Euclidean void; without such a mechanism, assemblies would reveal their motion relative to the sea and the preferred frame would manifest.

* **Constraint** – the Noether Sea must supply a dynamical closure that yields Lorentz-compatible contraction of assemblies; otherwise the model is equivalent to an untested preferred frame.
* **Failure Condition** – without contraction enforced by the Sea, preferred frame effects become measurable and falsify the theory.

#### Noether-Sea Drag

Here we catalogue how coupling between macroscopic bodies and the Noether Sea can influence orbital dynamics. The constraint ensures any additional dissipation or effective drag remains below the levels already constrained by gravitational-wave-based orbital decay measurements in general relativity.

* **Constraint** – interactions with the Noether Sea must not induce orbital decay that outpaces GR’s gravitational-wave emission bounds.
* **Validation Target** – match observed orbital stability and perihelion advance within GR limits while modeling any extra coupling as a conserving medium-dressed response rather than ordinary dissipative drag.

#### Condensed-Matter Response Gate

Ordinary materials supply a broad recovery surface for the same assembly, electron-envelope, and Noether-Sea response variables. The gate is not that $\mathbb{A}\mathbb{A}\mathbb{A}$ adopts band theory as ontology. The gate is that periodic material branches recover the benchmark mathematics of bands, lattice scattering, phonons, and Hall response without per-probe retuning.

* **Constraint** – one material-branch record $\theta_{\mathrm{mat}}=(\mathcal B_e,\mathcal B_{\mathrm{lat}},\rho_{\text{NS}},n,\chi_{\text{sea}},\mathcal M_{\text{sea}}^{ab})$ must recover Bloch-form bands $E_\alpha(\mathbf k)$, effective mass tensor $(m_{\alpha,*}^{-1})^{ij}=\hbar^{-2}\partial_i\partial_jE_\alpha$, Fermi-surface or band-gap classification, reciprocal-lattice scattering $\mathbf q\in\Lambda^*$ with structure factor $S(\mathbf q)$, and phonon dispersion from one declared lattice branch.
* **Hall / Topology Target** – for two-dimensional gapped branches with an effective U(1) connection, the same record must recover $\sigma_{xy}=(e^2/2\pi\hbar)C$ with integer Chern number $C$ and $\rho_{xx}$ below tolerance on the plateau. Fractional Hall, anyon, and Chern-Simons descriptions are recovery/comparison structures unless a local branch derivation consumes them directly.
* **No-Drag Consistency** – the ideal periodic branch must not require ordinary dissipative drag; finite $\tau^{-1}$ must be routed to disorder, vacancies, phonons, boundary exchange, heating, radiation-like shedding, or branch transition.
* **Failure Condition** – the condensed-matter branch fails if it fits band curvature, phonon stiffness, scattering peaks, Hall conductance, and transport relaxation with independent material records, if a filled band carries unlogged current or heat, if a topological plateau changes without a gap closure or branch change, or if ordinary Noether-Sea drag is used to explain resistance below the transport threshold in [Condensed Matter](../../../../markdown/aaa/nuclear-atomic/condensed-matter.md).

#### GW Speed

The propagation speed of gravitational-wave disturbances in the Noether Sea must align with the measured gravitational-wave velocity, so this section records the tolerance within which new physics can coexist with GW timing data without contradicting the LIGO/Virgo baseline. The relevant benchmark is now multi-messenger rather than merely assumed: GW170817/GRB 170817A constrained the gravity-channel and light-channel speed difference at roughly the $10^{-15}$ level.

* **Constraint** – gravitational waves, modeled as collective Noether-Sea disturbances, must satisfy the multi-messenger speed gate, with GW170817/GRB 170817A giving the reference scale
  $$
  -3\times10^{-15}
  \lesssim
  \frac{v_{\mathrm{GW}}-c_0}{c_0}
  \lesssim
  7\times10^{-16}.
  $$
  Any tighter ledger tolerance adopted for a specific validation band should be stated explicitly rather than inferred from ontology.
* **Mode and Dispersion Gate** – finite-range or medium-compliance corrections must keep accumulated dispersion, false-alarm residuals, calibration residuals, and any scalar, vector, or longitudinal gravitational-wave detector response below the residual bounds for the validated band.
* **Low-Frequency Extension** – if a cosmological-scale weakening channel claims finite-range behavior, it must also report the low-frequency residual $\mathcal{R}_{\mathrm{GW,low}}(\theta)$ from [Gravitational Waves](../../../../markdown/aaa/spacetime/gravitational-waves.md#linear-wave-equation) for the declared pulsar-timing or space-interferometer band. A band not yet measured may be listed as a forecast, but it cannot be used to override the existing high-frequency speed, polarization, and dispersion gates.
* **Failure Condition** – a cosmological-scale weakening channel fails if it predicts measurable gravitational-wave dispersion, an unsuppressed non-TT mode, or a speed offset in the same regime where the weak-field metric map is supposed to recover GR.

#### Euclidean vs. Metric Pathing (The Refraction Mapping)

This constraint explains how apparent metric deviations (Shapiro delay and light bending) emerge from a Euclidean signalling framework endowed with a varying Noether-Sea delay factor $\chi_{\text{sea}}$, which allows us to compare the emergent delay with the standard GR potential.

* **Constraint** – Shapiro delay and light bending must match GR to within PPN bounds ($|\gamma - 1| < 10^{-5}$).
* **Architrino Interpretation** – signals propagate through Euclidean space, but observer-level paths are effective travel-time extremals in the Noether-Sea delay map. The perceived delay or curvature arises from $\chi_{\text{sea}}$ responding to spatial variations in $\rho_{\text{NS}}$ and related Noether-Sea state variables.
* **Validation Target** – map $g_{00} \approx 1 + 2\Phi/c^2$ onto the refractive slowing experienced by Noether-Sea signals moving through the Euclidean void with Noether-Sea delay.

#### Gravitational Time Dilation

We require that the proposed mechanical slowing induced by Noether swarm density aligns quantitatively with geodetic and redshift observations such as GPS offsets and the Pound–Rebka experiment, offering a concrete mapping between the new microphysics and the classical time-dilation effects.

* **Constraint** – reproduce GPS clock offsets (38 μs/day), the Pound–Rebka redshift, and height-resolved optical-clock redshift with $\Delta\nu/\nu\approx gL/c_0^2$; this includes the approximate scales $1.1\times10^{-19}$ across $1\,\mathrm{mm}$ and $3.6\times10^{-17}$ across $33\,\mathrm{cm}$ near Earth's surface.
* **Mechanism** – mechanical slowing of nested shell swarm orbital frequencies couples to the local Noether swarm density and Noether-Sea delay factor, generating the observed dilation without changing the constitutive map used for other weak-field observables.

#### Massive-Superposition Gravitational Distinguishability

Massive-interference experiments and precision gravity readouts jointly test whether the effective-metric channel carries enough branch information to become a which-path record. The observable is not whether spacetime is declared classical or quantum. The observable is whether two mass-density histories produce a distinguishable gravitational response before the apparatus has formed a durable record.

* **Constraint** – for two branch-level mass-density histories $\rho_1$ and $\rho_2$, the gravitational distinguishability diagnostic
  $$
  \mathcal{D}_{\mathrm{grav}}(T;\theta)
  =
  \int_0^T\!\!\int_0^T
  \Delta h_A(t)\,
  N^{-1}_{AB}(t,t')\,
  \Delta h_B(t')\,dt\,dt',
  $$
  with $\Delta h_A(t)=h_A(t;\rho_1,\theta)-h_A(t;\rho_2,\theta)$, must remain below the declared which-path threshold for any interference-preserving run unless a record-forming separatrix crossing and persistence window are also derived.
* **Observable** – the data products are massive-superposition coherence time, branch separation and mass-displacement history, precision-gravity response, detector noise covariance, any two-probe entanglement witness, non-gravitational coupling residuals, and the absence or presence of a durable which-path record.
* **Validation Target** – combine long-coherence interferometry with Cavendish-like, atom-interferometric, or gravitational-wave-instrument precision bounds to constrain $\mathcal{D}_{\mathrm{grav}}$ using one effective-metric constitutive record $\theta$; the concrete scaffold is [Massive-Superposition Gravity Validation Packet](../../../../markdown/aaa/validation/massive-superposition-gravity.md).
* **Mediated-Entanglement Target** – for gravitationally induced entanglement comparisons, the same $\theta$ must generate the branch interaction phase $\Delta\Phi_{\mathrm{ent}}$ needed for the observed witness $C_{\mathrm{obs}}$ while keeping $\mathcal{R}_{\mathrm{nongrav}}$ below the isolation threshold and $\mathcal{D}_{\mathrm{grav}}$ below the which-path threshold.
* **Failure Condition** – the measurement and spacetime branches fail jointly if the same parameter record predicts $\mathcal{D}_{\mathrm{grav}}\gg1$ for an interference-preserving experiment while no apparatus/environment record satisfies the record-autonomy condition in [Measurement Ontology](../../../../markdown/aaa/quantum/measurement-ontology.md).

#### CMB Scalar/Tensor Gate

The cosmology branch must recover the CMB scalar and tensor observables as data products before any source interpretation is promoted.

* **Constraint** – one Noether Sea and assembly record must recover TT/TE/EE spectra, damping, CMB-lensing reconstruction, blackbody preservation, scalar amplitude $A_s$, scalar tilt $n_s$, acoustic phase coherence, vector-mode suppression, and the tensor bound $r\le r_{\max}$ without changing Noether-Sea state variables between the CMB, BBN, expansion, and growth modules.
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
\langle v_{\mathrm{rel}}\rangle_{\theta_A}.
$$
The corresponding impulse scale on a tracked body is
$$
\Delta v_{\mathrm{test}}
\simeq
\frac{2GM_A}{b\,v_{\mathrm{rel}}},
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
\neq \varnothing.
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
\right),
$$

where $A$ is the assembly or branch family, $\Gamma$ is the assembly microstate, $\mathcal{H}$ is the path-history and causal-wake ledger, $\mathcal{R}$ is the active residual family, $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ is the event ledger, $\zeta$ is shielding or exposure data, $\mathcal{M}_{\mathrm{sea}}^{ab}$ is the Noether-Sea response object, and $\{B_i\}$ is the basin or channel partition. Sector-local coordinates $Z_S(\theta)$ record the benchmark variables, theorem assumptions, provenance rows, and tolerances used by sector $S$.

For each sector $S$, fix a gate predicate $P_S:\mathfrak{X}\to\{0,1\}$, a benchmark map $\mathcal{B}_S:\mathfrak{X}\to\mathfrak{B}_S$, a validated benchmark region $\mathfrak{B}^{\mathrm{obs}}_S\subseteq\mathfrak{B}_S$, a benchmark metric $d_S$, a tolerance $\epsilon_S$, and a no-go pass predicate $\mathcal{G}_S:\mathfrak{X}\to\{0,1\}$. Define the distance from a benchmark point to the validated region by

$$
\operatorname{dist}_{d_S}(b,\mathfrak{B}^{\mathrm{obs}}_S)
=
\inf_{b'\in\mathfrak{B}^{\mathrm{obs}}_S}d_S(b,b').
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
\right\}.
$$

The shared acceptance intersection is

$$
\mathcal{C}_{\mathbb{A}\mathbb{A}\mathbb{A}}
=
\bigcap_{S\in\mathfrak{S}}\mathcal{C}_S.
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
\right].
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
[x]_+\equiv\max(x,0).
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
\right),
$$
where $\pi_{\mathrm{shared}}$ keeps the common Noether-Sea, assembly, weak-exposure, metric, and provenance coordinates consumed by both the positive benchmark and the null channel. The operational audit residual is
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
\right).
$$
The original promotion condition is recovered by requiring $\mathcal{R}_{\mathrm{null}}^{\mathrm{op}}(\theta)=0$. This form rejects a second failure mode: a channel can be numerically hidden but still fail because its suppression uses a different shared record from the one that fit the observed sector.

| Added-channel family | Example observable $O_e(\theta)$ | Null data product | Same-record requirement |
| --- | --- | --- | --- |
| Mirror matter or added charged partners | production cross-section, branching ratio, stable relic abundance | collider exclusions, precision electroweak fits, cosmological abundance bounds | the axial-layer and gauge-representation record that yields observed fermions must also exclude the partner branch |
| Superpartners or large symmetry partners | missing-energy rate, partner mass threshold, coupling strength | collider missing-energy and resonance searches | partner absence must follow from the accepted branch family, not from an independent mass threshold |
| Proton-instability or baryon-violating corridors | $\Gamma_p(\theta)$ or forbidden nuclear transition rate | proton-lifetime and rare-event limits | the same color/topology and reaction-provenance ledger used for hadrons must suppress the channel |
| Extra gauge bosons or gauge modes | resonance rate, precision-contact term, long-range force strength | collider, fifth-force, and precision-scattering bounds | the effective gauge residual must recover $U(1)_Y\times SU(2)_L\times SU(3)_c$ without an unsuppressed added mode |
| Hidden transport or extra propagation modes | dispersion, birefringence, scalar/vector gravitational-wave response | photon, gravitational-wave, and timing residuals | the same Noether-Sea response map must set clock, signal, and metric channels |
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
\right|.
$$
The photon/effective-metric record can be promoted only when $\mathcal{R}_{\mathrm{biref}}(\theta)\le\epsilon_{\mathrm{biref}}$ in the declared weak homogeneous regime and when the same $\theta$ also supplies the clock, ruler, signal, and metric coefficients used for the positive GR-facing benchmarks. If birefringence is numerically hidden by switching to a different channel record than the one used for lensing, Shapiro delay, spectra, or photon synchronization, $\mathcal{R}_{\mathrm{null}}^{\mathrm{op}}$ fails even if the split is individually small.

##### Null-Result Ownership Matrix

The following matrix assigns each recurring null-result family to the corpus homes that should carry the positive derivation and the absence proof. The owner document does not need to reproduce every experimental limit; it must state the observable $O_e(\theta)$, name the comparison bound $O_e^{\max}$, and route the channel through $\mathcal{R}_{\mathrm{null}}^{\mathrm{op}}$ when the channel is predicted.

| Channel family | Observable vector | Bound symbol | Primary owner | Supporting gates |
| --- | --- | --- | --- | --- |
| Mirror matter / added charged fermions | $(\sigma_{\mathrm{prod}},B_{\mathrm{vis}},\Omega_{\mathrm{relic}})$ | $O_{\mathrm{mirror}}^{\max}$ | [Quantum Number Mapping](../../../../markdown/aaa/assemblies/fermions/quantum-number-mapping.md) | [Gauge Symmetries](../../../../markdown/aaa/interactions/gauge-symmetries.md), [Known Tensions](../../../../markdown/aaa/validation/known-tensions.md) |
| Superpartners / symmetry partners | $(\sigma_{\mathrm{miss}},m_{\mathrm{partner}},B_{\mathrm{cascade}})$ | $O_{\mathrm{partner}}^{\max}$ | [Gauge Symmetries](../../../../markdown/aaa/interactions/gauge-symmetries.md) | [Theory Differentials](../../../../markdown/aaa/philosophy-history/theory-differentials.md), [No-Go Theorems](../../../../markdown/aaa/validation/no-go-theorems.md) |
| Proton-instability corridors | $(\Gamma_p,B_{p\to e^+\pi^0},B_{p\to\bar\nu K^+})$ | $\Gamma_p^{\max}$ | [Color Charge SU(3)](../../../../markdown/aaa/assemblies/fermions/color-charge-su3.md) | [Reaction Ledger](../../../../markdown/aaa/validation/reaction-ledger.md), [Known Tensions](../../../../markdown/aaa/validation/known-tensions.md) |
| Extra gauge bosons / gauge modes | $(\sigma_{Z'},\sigma_{W'},g_{\mathrm{new}},\Delta_{\mathrm{contact}})$ | $O_{\mathrm{gauge+}}^{\max}$ | [Gauge Symmetries](../../../../markdown/aaa/interactions/gauge-symmetries.md) | [Gauge Structure Emergence](../../../../markdown/aaa/interactions/gauge-structure-emergence.md), [Electroweak Bosons](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md) |
| Hidden transport / extra propagation modes | $(\Delta v/c,\omega_{\mathrm{disp}},h_{\mathrm{scalar}},h_{\mathrm{vector}})$ | $O_{\mathrm{transport}}^{\max}$ | [Constraint Ledger](../../../../markdown/aaa/validation/constraint-ledger.md) | [Observer Framework](../../../../markdown/aaa/spacetime/observer-framework.md), [PPN Parameters](../../../../markdown/aaa/spacetime/ppn-parameters.md) |
| Sterile / neutral partner branches | $(\theta_{\mathrm{mix}},\Delta N_{\mathrm{eff}},\Omega_{\nu_R},\lambda_{\mathrm{fs}})$ | $O_{\mathrm{sterile}}^{\max}$ | [Neutrinos](../../../../markdown/aaa/assemblies/fermions/neutrinos.md) | [Dark Matter](../../../../markdown/aaa/cosmology/dark-matter.md), [CMB](../../../../markdown/aaa/cosmology/CMB.md) |
| Preferred-frame leakage | $(\Delta_{\mathrm{tw}},\delta\nu/\nu,\alpha_1,\alpha_2,\alpha_3)$ | $O_{\mathrm{LV}}^{\max}$ | [Lorentz Kinematics](../../../../markdown/aaa/spacetime/lorentz-kinematics.md) | [PPN Parameters](../../../../markdown/aaa/spacetime/ppn-parameters.md), [Constraint Ledger](../../../../markdown/aaa/validation/constraint-ledger.md) |

For proton-instability corridors, convert every current partial-mean-life lower limit $\tau_c^{\min}$ into a channel-rate ceiling
$$
\Gamma_{p,c}^{\max}=\frac{1}{\tau_c^{\min}}.
$$
The current benchmark scale is already severe: PDG 2024 summaries give $\tau/B(p\to e^+\pi^0)>2.4\times10^{34}\,\mathrm{yr}$ and proton neutrino/kaon modes near $5.9\times10^{33}\,\mathrm{yr}$ at 90% confidence. These numbers are comparison anchors, not permanent constants; a closure packet should cite the current experimental source when the hadronic gate is evaluated.

### Sector Acceptance Sets

| Sector | Predicate $P_S(\theta)=1$ | Benchmark condition | Falsifier |
| --- | --- | --- | --- |
| $\mathcal{C}_{\mathrm{weak}}$ | One weak-coupling-triad exposure record $\mathcal{E}_{\mathrm{weak}}(A)=Q_{\mathrm{weak}}[\Pi_{\mathrm{weak}}\mathcal{L}_A]$ supplies `V-A`, CKM/PMNS overlap, and weak-corridor provenance without redefining $\Pi_{\mathrm{weak}}$, $Q_{\mathrm{weak}}$, or the exposed domain. | $\mathcal{B}_{\mathrm{weak}}(\theta)$ lies in the observed charged-current handedness, mixing, and provenance region within $\epsilon_{\mathrm{weak}}$. | Right-handed charged-current coupling is not strongly suppressed in the validated regime, or the weak exposure domain changes between chirality, mixing, and provenance. |
| $\mathcal{C}_{\mathrm{quantum}}$ | A transfer operator or return map $\mathcal{T}_{\Delta t}$, basin partition $\{B_i\}$, invariant or metastable measure $\mu_*$, and detector kernel produce $p_i=\mu_*(B_i)$ from $\Gamma$ and $\mathcal{H}$ without assigning probabilities as an external rule. | $\mathcal{B}_{\mathrm{quantum}}(\theta)$ lies in the Born-rule, Bell/CHSH/Tsirelson/GHZ/Hardy, Leggett-Garg temporal-correlation, detector-record, and no-signaling benchmark region within $\epsilon_{\mathrm{quantum}}$. | The validated regime gives non-Born weights, a classical-axis linear-correlation failure, untracked temporal-measurement disturbance, superluminal signal transfer, or a detector kernel not derived from the recorded causal state. |
| $\mathcal{C}_{\mathrm{gravity}}$ | One Noether-Sea response map $\mathcal{M}_{\mathrm{sea}}^{ab}$ supplies clock, ruler, effective signal-speed, weak-field metric, and PPN channels without changing coefficients per observable. | $\mathcal{B}_{\mathrm{gravity}}(\theta)$ lies in the redshift, Shapiro-delay, lensing, orbital, gravitational-wave-speed, PPN, and preferred-frame bound region within $\epsilon_{\mathrm{gravity}}$. | Clock, ruler, signal, or metric coefficients must be tuned independently, ordinary dissipative drag appears in stable motion, or preferred-frame leakage exceeds the recorded bounds. |
| $\mathcal{C}_{\mathrm{hadronic}}$ | An accepted branch family $A$, exposure quotient, color/topology ledger, residual strong channel set, and $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ close confinement, quark mass, baryon-stability, and nuclear-binding rows. | $\mathcal{B}_{\mathrm{hadronic}}(\theta)$ lies in the confinement, quark-hierarchy, proton-stability, deuteron, saturation, and alpha-like benchmark region within $\epsilon_{\mathrm{hadronic}}$. | The sector predicts generic fast proton decay, unphysical nuclear binding signs, missing color/topology closure, or an unbalanced architrino / Noether swarm inventory. |
| $\mathcal{C}_{\mathrm{radiation}}$ | A radiation residual $\mathcal{R}_{\Theta}$ selects admissible channels from $\{B_i\}$ and closes $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ with photon output, recoil, medium update, non-radiative remnant, or reaction rows explicitly recorded. | $\mathcal{B}_{\mathrm{radiation}}(\theta)$ lies in the Larmor/Lienard, bremsstrahlung, synchrotron, pair-threshold, Compton-like, and blackbody benchmark region within $\epsilon_{\mathrm{radiation}}$. | Any benchmark requires per-observable retuning, untracked energy loss, a missing recoil/provenance row, a free longitudinal photon mode, or a blackbody fit not tied to the event ledger. |
| $\mathcal{C}_{\mathrm{cosmology}}$ | One source, transport, thermalization, and clock-rate record uses the same $\rho_{\text{NS}}(\mathbf{x},t)$, $n(\mathbf{x},t)$, $\chi_{\text{sea}}(\mathbf{x},t)$, $\mathcal{M}_{\mathrm{sea}}^{ab}$, and reaction provenance ledger across local source channels and observer-level cosmology. | $\mathcal{B}_{\mathrm{cosmology}}(\theta)$ lies in the BBN, CMB blackbody, damping, anisotropy, polarization handoff, redshift, $H(z)$, BAO, and growth benchmark region within $\epsilon_{\mathrm{cosmology}}$. | BBN photon loading, CMB thermalization, redshift handoff, or structure growth requires unbalanced substrate creation, per-source retuning, or Noether-Sea variables incompatible with local reaction / radiation ledgers. |

### Promotion Lemma

For sector $S$, let $\pi_S:\mathfrak{X}\to\mathfrak{X}_S$ be the projection that keeps the sector-$S$ coordinates and shared coordinates consumed by that sector. For a local sector result $c\in\mathfrak{X}_S$, define the extension fiber

$$
\operatorname{Ext}_S(c)
=
\left\{
\theta\in\mathcal{C}_{\mathbb{A}\mathbb{A}\mathbb{A}}
:
\pi_S(\theta)=c
\right\}.
$$

**Lemma.** A local sector result $c$ is promotable through the validation gate if and only if $c\in\pi_S(\mathcal{C}_S)$ and

$$
\operatorname{Ext}_S(c)\ne\varnothing.
$$

Proof route: if $c$ is promoted, the promoted record must retain the sector-$S$ result and pass every sector gate, so it is an element of $\operatorname{Ext}_S(c)$. Conversely, any $\theta\in\operatorname{Ext}_S(c)$ is a shared closure record whose sector-$S$ projection equals $c$ and whose weak, quantum, gravity, hadronic, radiation, and cosmology predicates all pass; therefore the local result has survived the validation gate. If the fiber is empty, the result is blocked by at least one sector predicate, benchmark region, no-go record, or failure condition.

### Incompatibility Witnesses

A local claim $c$ imposes a constraint subset $I(c)\subseteq\mathfrak{X}$ consisting of all closure records that preserve the claim's definitions, coefficients, ledger rows, and effective-limit assumptions. For a target sector $T$, define the constrained target set

$$
\mathcal{C}_T\!\mid c
=
\mathcal{C}_T\cap I(c).
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
\right),
$$

where

$$
\delta_T(c)
=
\epsilon_T
-
\inf_{\theta\in I(c),\,P_T(\theta)=1,\,\mathcal{G}_T(\theta)=1}
\operatorname{dist}_{d_T}\!\left(\mathcal{B}_T(\theta),\mathfrak{B}^{\mathrm{obs}}_T\right).
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
2. **Required compensation:** Moving assemblies must acquire the Lorentz-compatible deformation and clock laws, $L_{\parallel}=L_0/\gamma$ and $T=\gamma T_0$, from delayed causal closure and Noether-Sea response rather than from kinematic postulates.
3. **Coefficient closure:** Clock, ruler, signal, and metric response coefficients must suppress two-way anisotropy and other preferred-frame leakage to the validated bounds. A qualitative contraction story is not sufficient.
4. **Dissipative drag:** If the Noether Sea induces ordinary drag that slows cosmological bodies without a conserving medium-dressed response mechanism, the theory is falsified.

### Critical Stop Conditions

- **$c_f$ variance:** If field speed varies in the true void, the theory fails.
- **Noether-Sea drag:** If the Noether Sea causes orbital decay or secular kinetic-energy loss through ordinary dissipative drag, rather than a reversible medium-dressed inertial response, the theory fails.
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
\}.
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
| Weinberg-Witten-like obstructions | `assumption mismatch` with replacement constraint when emergent photon or gravity language is claimed | Lorentz-covariant conserved stress-tensor assumptions of the theorem are not fundamental substrate assumptions for Noether-Sea and assembly closures. Photon and gravity claims must still recover the validated effective channels. | Keep photon and metric objects as medium/assembly closures with explicit domain limits. Failure occurs if the record claims a fundamental Lorentz-covariant composite photon/graviton while also denying the theorem's assumptions, or if effective limits cannot be recovered. |
| Boundary-Hamiltonian / kinematic-locality constraints on emergent gravity | `replacement constraint` when emergent gravity, boundary unitarity, or black-hole information claims are made | In generally covariant gravity comparisons, the Hamiltonian can be a boundary term, and Marolf-style arguments show that non-linear gravity is not straightforwardly recovered from a kinematically local theory with independently commuting bulk observables. $\mathbb{A}\mathbb{A}\mathbb{A}$ does not accept local QFT operator algebras, boundary Hamiltonians, or asymptotic boundary observables as substrate primitives, but the protected benchmark remains: effective gravity must carry unitary observer-level information accounting without freezing local dynamics or treating local horizon entanglement as a sharply defined substrate observable. | A candidate record must replace the rejected assumptions with finite boundary wake data, declared reference resources, access-region limits, and a Noether-Sea continuation map that recovers both local effective dynamics and boundary-accessible bookkeeping. Failure occurs if the model claims emergent GR from purely local commuting substrate variables, hides all bulk dynamics behind a boundary algebra, or treats horizon-crossing correlations as lost or recovered without a declared Physical Observer access model. |
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
\right]_+,
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
\right]_+.
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
\right).
$$
If a candidate avoids the theorem by allowing $\Delta_{\mathrm{PI}}>0$, that residual must be tied to a physical shared-provenance, boundary-data, or apparatus-coupling record. Otherwise it is an untracked preparation correlation. The useful closure target is therefore two-part: recover the PBR state-discrimination statistics in the declared record channel while reporting whether the substrate preparation measure factorizes. If both the PBR measurement statistics and preparation independence are accepted in the same domain, overlapping effective wavefunction descriptions cannot be treated as a harmless epistemic overlap.

The Leggett-Garg row protects temporal correlation data without importing macrorealism as ontology. For dichotomic records $q_i\in\{-1,+1\}$ at times $t_i$, define
$$
C_{ij}
=
\sum_{q_i,q_j=\pm1}
q_iq_j\,P_\theta(q_i,q_j|\mathcal{K}_i,\mathcal{K}_j),
\qquad
K_{\mathrm{LG}}=C_{12}+C_{23}-C_{13}.
$$
Macrorealism plus noninvasive measurability gives $K_{\mathrm{LG}}\le 1$ for this sign convention. The $\mathbb{A}\mathbb{A}\mathbb{A}$ replacement burden is not to accept noninvasive readout, but to declare the disturbance residual
$$
\Delta_{\mathrm{NIM}}
=
\sup_{i<j}
D_{\mathrm{TV}}\!\left(
P_\theta(q_j|\mathcal{K}_j),
P_\theta(q_j|\mathcal{K}_i,\mathcal{K}_j)
\right),
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
w_{\mathrm{cos}}\mathcal{R}_{\mathrm{shared}}(\theta).
$$
where $[x]_+\equiv\max(x,0)$. The record is useful only if one shared Noether-Sea response map can make this residual small. A result that passes local GR tests by changing the energy, positivity, polarization, dispersion, or cosmology record separately is not a promoted closure.

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
| 1 | Preferred-frame leakage | The ontology has absolute time and a medium, so observer-level Lorentz hiding must be quantitative. | The requirement is clear in [constraint-ledger.md](../../../../markdown/aaa/validation/constraint-ledger.md), and [Lorentz Kinematics](../../../../markdown/aaa/spacetime/lorentz-kinematics.md) now states the moving-assembly coefficient targets, but the full attractor proof is not complete. | Show that effective clocks, rulers, and signal transport suppress measurable preferred-frame effects below current experimental bounds by deriving the coupled shape law $L_{\parallel}=L_0/\gamma$, clock law $T=\gamma T_0$, and two-way anisotropy bounds from delayed causal closure. | Any robust preferred-frame signal above the recorded bounds, or any need to tune clock and ruler coefficients independently, falsifies the observer-level spacetime closure. |
| 1 | Born-rule derivation | Quantum replacement claims are not credible without a basin-measure or equivalent statistical closure. | [wavefunction-ontology.md](../../../../markdown/aaa/quantum/wavefunction-ontology.md) and [measurement-ontology.md](../../../../markdown/aaa/quantum/measurement-ontology.md) fix the ontology; [quantum-operator-mapping.md](../../../../markdown/aaa/philosophy-history/theory-bridges/quantum-operator-mapping.md) now states the finite-time invariant-measure, thermodynamic ensemble consistency, and admissible quantization-domain targets, but the derivation is still open. | Derive outcome weights from deterministic basin measures in the same regime that yields the effective wave equation, show that the same finite-window measure projects to the thermodynamic summaries used for apparatus irreversibility, decoherence, and record formation, and restrict effective operators to a physically declared observable domain rather than a global quantization of all classical functions. | If the deterministic closure produces a non-Born weighting in validated regimes, if Born weights and thermodynamic summaries require incompatible measures, or if the operator map requires ad hoc observable-domain changes per benchmark, the current quantum story fails. |
| 1 | Weak-field GR recovery | Redshift, Shapiro delay, lensing, and orbital tests must come from one constitutive map. | The interface now exists in [gr-phenomenology.md](../../../../markdown/aaa/spacetime/gr-phenomenology.md) and [ppn-parameters.md](../../../../markdown/aaa/spacetime/ppn-parameters.md), but the shared fit is incomplete. | Produce one reusable parameter set for the weak-field metric map. | If different observables require incompatible constitutive coefficients, the emergent-metric program fails. |
| 2 | Low-energy quantum-gravity EFT recovery | Quantized metric methods are not $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology, but their long-distance effective predictions are fixed by known low-energy degrees of freedom. | [gr-phenomenology.md](../../../../markdown/aaa/spacetime/gr-phenomenology.md) and [emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md) state the classical weak-field map; they need an explicit observer-level GR-EFT recovery gate. | Recover the standard long-distance quantum correction to the Newtonian potential using the same weak-field constitutive record that supports PPN, redshift, Shapiro delay, lensing, and gravitational-wave speed. | If the calculable low-energy quantum correction requires an independent coefficient set, spacetime closure is incomplete even if the classical observables are matched. |
| 2 | Parameter non-closure | Too many symbols remain geometric promises rather than fixed quantities. | [parameter-ledger.md](../../../../markdown/aaa/validation/parameter-ledger.md) now organizes them, but most are still open. | Close $\kappa$, the mass prefactor, the metric constitutive coefficients, and the weak-mixing datum without per-observable retuning. | If the same symbol has to be re-fit independently across chapters, the closure claim weakens sharply. |
| 2 | Null-result closure for added channels | A unification claim can fail even while matching known positive benchmarks if it predicts extra channels that experiments have not seen. | [failure-criteria.md](../../../../markdown/aaa/validation/failure-criteria.md) now defines $\mathcal{R}_{\mathrm{null}}(\theta)$ for predicted non-baseline channels, but the main sector ledgers have not all routed their null-result bounds through that residual. The concrete comparison cases are mirror matter, superpartners, proton-instability channels, extra gauge bosons, hidden transport modes, sterile or neutral partner branches, and preferred-frame leakage channels. | For every added partner family, unstable baryon channel, extra gauge or transport mode, preferred-frame leakage channel, or other non-baseline output, compute $O_e(\theta)$ and show $O_e(\theta)\le O_e^{\max}$ from the same shared closure record used for the positive benchmarks. A symmetry container that includes the Standard Model as a subcase passes only when the added channels are proven absent, exactly redundant, or below bounds by the same branch record that recovers the observed sector. | If unobserved channels are hidden only by sector-specific masses, thresholds, compactification-like assumptions, or disconnected suppression factors, the framework has reproduced the failure pattern of overextended unification rather than closing it. |
| 2 | Thermodynamic-gravity closure | If the metric is an emergent equation of state, the repo needs more than constitutive rhetoric. | [emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md) now states the Noether-Sea-first picture, defines a local-horizon residual $\mathcal{R}_{\mathrm{thermo}}(\theta)$, and links the proof scaffold to [Thermodynamic Residual Protocol](../../../../markdown/aaa/validation/simulations/thermodynamic-residual.md); [black-holes.md](../../../../markdown/aaa/spacetime/black-holes.md) frames horizon entropy as a block-density count over horizon-compatible reduced Noether swarm closure labels. No run has yet driven the residual small from a simulated Noether-Sea record. | Show that the Noether Sea admits an area-scaling entropy channel $S_H=k_B\log\lvert\mathcal{B}_H\rvert$ whose local coefficient is recovered as a block entropy density, a local Rindler/Unruh recovery in the appropriate limit, a Jacobson-style $dQ=T_UdS$ residual for boundary-wake data, Page-curve-compatible information release through horizon-interface channels, and a controlled nonequilibrium regime where distinctive departures are predicted. | If GR-like recovery requires thermodynamic language but the Noether Sea cannot supply area scaling, local horizon temperature, a shared stress/entropy/temperature record, Page-curve-compatible information accounting, or a coherent nonequilibrium boundary, the present gravity interpretation loses depth and may be mislocated. |
| 2 | Reaction-cosmology provenance closure | The local-reaction story and the cosmology-source story now meet at photon loading, pair production, and thermalization. | [reaction-cosmology-provenance-ledger.md](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md) defines the shared ledger, but no full source-to-background path has been closed. | Produce one conserved provenance path from a radiation or pair channel through thermalization to a BBN or CMB observable, using the same Noether-Sea state variables throughout. | If BBN photon loading or CMB blackbody recovery requires unbalanced substrate creation, per-source retuning, or incompatible thermalization assumptions, the local-recycling cosmology branch fails. |
| 2 | Shared cosmology state closure | Dark-energy, $H_0$, $S_8$, CMB, BBN, BAO, weak-lensing, and pre-BBN comparison claims all consume overlapping Noether-Sea state variables. | [cosmology-ontology.md](../../../../markdown/aaa/cosmology/cosmology-ontology.md), [dark-energy.md](../../../../markdown/aaa/cosmology/dark-energy.md), and [hubble-s8-tensions.md](../../../../markdown/aaa/cosmology/hubble-s8-tensions.md) now state the shared-state requirement; [inflation-model.md](../../../../markdown/aaa/cosmology/inflation-model.md#pre-bbn-comparison-gate), [BBN-constraints.md](../../../../markdown/aaa/cosmology/BBN-constraints.md#pre-bbn-handoff-gate), [structure-formation.md](../../../../markdown/aaa/cosmology/structure-formation.md#cmb-lensing-and-acoustic-peaks), and [gravitational-waves.md](../../../../markdown/aaa/spacetime/gravitational-waves.md#early-universe-stochastic-background-gate) now route pre-BBN branch projections through the same record; [simulations/cosmology-shared-residual-fit.md](../../../../markdown/aaa/validation/simulations/cosmology-shared-residual-fit.md) supplies the first mock residual-packet scaffold; and [dark-energy.md](../../../../markdown/aaa/cosmology/dark-energy.md) now gives a thermodynamic $\Lambda_{\mathrm{eff}}$ conjugacy target, but no empirical joint residual fit exists. | Produce one $\theta_{\mathrm{sea}}$ and projection family that keeps SN, BAO, CMB, WL, RSD, BBN, $H_0$, $S_8$, pre-BBN branch projections, and stochastic-background bounds inside tolerance without per-pipeline retuning; if $\Lambda_{\mathrm{eff}}$ is treated thermodynamically, derive it as a conjugate to an effective observer-level four-volume functional of the same $\theta_{\mathrm{sea}}$. | If distance, growth, early-universe, calibration, pre-BBN branch, stochastic-background, or thermodynamic-$\Lambda_{\mathrm{eff}}$ observables require incompatible Noether-Sea state records, the cosmology branch has hidden the tension rather than closed it. |
| 2 | Radiation Gate C benchmark closure | Radiation must recover standard electromagnetic and QED-like benchmarks before Noether-Sea-dependent deviations or cosmology source claims are credible. | [radiation.md](../../../../markdown/aaa/reactions/radiation.md) now carries a classified closure-target ledger, with channel scaffolds in [bremsstrahlung.md](../../../../markdown/aaa/reactions/bremsstrahlung.md), [synchrotron.md](../../../../markdown/aaa/reactions/synchrotron.md), and [reaction-cosmology-provenance-ledger.md](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md), but no unified Gate C derivation is complete. | Close Larmor/Lienard recovery, free-free emissivity, synchrotron $\gamma^2B$ and power scaling, pair thresholds, Compton-like scattering, and blackbody detailed balance through one event record, while treating free photon polarization as a Gate B handoff only. | If any benchmark requires per-observable retuning, violates validated limits, or derives free photon polarization outside Gate B, radiation Gate C does not close. |
| 2 | CKM / PMNS quantitative closure | Flavor mixing cannot remain only qualitative if the framework claims Standard-Model replacement. | PMNS oscillation formulas exist; CKM geometry has an overlap/holonomy scaffold and is now tied to the same weak-coupling-triad exposure route as `V-A` and reaction provenance. | Derive one geometric overlap map for quark and lepton mixing from the exposed weak-coupling-triad domain, shielding eigenstates, and near-photon neutral-sector Hamiltonian, then test it against CKM and PMNS data. | If no stable geometry reproduces the observed hierarchy and phases, or if the CKM/PMNS definitions require a different weak-basis domain from the `V-A` operator, the present mixing architecture is incomplete at best. |
| 2 | Quark mass map | The quark catalog is in place, but the mass hierarchy is still not quantitative. | [quarks.md](../../../../markdown/aaa/assemblies/fermions/quarks.md) closes structure, not masses. | Produce a first-pass mass map for `u,d,c,s,t,b` from shielding and internal-energy accounting. | If the hierarchy cannot be reproduced even at scaling level, generation-by-shielding is in trouble. |
| 2 | Spin / statistics closure | The framework repeatedly appeals to spinor and bosonic/fermionic behavior. | There is now a decent $4\pi$ story, but not a formal closure proof. | Derive the ordered-frame history-lift map cleanly enough to justify spin-$\tfrac{1}{2}$ and associated statistics sectors. | If the topology cannot distinguish fermionic and bosonic closure classes, several assembly claims lose their footing. |
| 2 | Baryon stability and baryon-number status | Proton stability is a major empirical constraint and a major theoretical claim. | The color chapter gives a topological argument, but the quantitative baryon-number status remains open. Current PDG 2024 comparison bounds already put representative partial mean lives at $\tau/B(p\to e^+\pi^0)>2.4\times10^{34}\,\mathrm{yr}$ and proton neutrino/kaon modes near $5.9\times10^{33}\,\mathrm{yr}$ at 90% confidence, so this is an active null-result gate rather than a qualitative concern. | Show whether proton stability is exact, exponentially protected, or only effective in a quantified regime, and route every predicted baryon-violating corridor through $\Gamma_{p,c}^{\max}=1/\tau_{c}^{\min}$ in [Failure Criteria](../../../../markdown/aaa/validation/failure-criteria.md). | If the theory predicts generic fast proton decay, or suppresses it by a sector-local parameter not tied to the same color/topology and reaction-provenance ledger that recovers hadron structure, the hadronic sector is not viable. |
| 3 | Nuclear binding closure | The residual strong-force story must eventually recover nuclear phenomenology beyond pions-as-metaphor. | [nuclear-binding.md](../../../../markdown/aaa/nuclear-atomic/nuclear-binding.md) now gives a first effective interface, but no fitted nuclear map. | Recover at least deuteron binding, saturation, and alpha-like enhancement in one coherent effective model. | If even the sign and scaling of nuclear binding cannot be stabilized, the hadronic coarse-graining is inadequate. |
| 3 | Condensed-matter branch recovery | Materials provide dense, precise tests of whether electron-envelope, lattice, phonon, and Noether-Sea response variables remain one record instead of becoming probe-specific fits. | [condensed-matter.md](../../../../markdown/aaa/nuclear-atomic/condensed-matter.md) now states Bloch-band, effective-mass, Fermi-surface, diffraction, phonon, Hall, and topological-response residuals; [constraint-ledger.md](../../../../markdown/aaa/validation/constraint-ledger.md) records the corresponding response gate. No derivation yet computes these objects from the master equation or a settled material branch. | Recover Bloch form, reciprocal-lattice scattering, phonon dynamical matrices, effective mass tensors, Fermi-surface or band-gap classification, Hall sign/plateaux, and no-drag transport from one declared material branch and Noether-Sea state record. | If band curvature, lattice stiffness, diffraction peaks, Hall response, and transport relaxation require independent response maps, or if resistance is explained by ordinary Noether-Sea drag below the transport threshold, the material-response program has split from the main ontology. |
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
{\|\mathbf{x}-\mathbf{y}\|}\,d^3x\,d^3y,
$$
with the collapse-time estimate
$$
\tau_G\sim \frac{\hbar}{\Delta E_G}.
$$
The useful comparison pressure is the tension between local free-fall equivalence and linear superposition when the two branches carry measurably different mass distributions. The validation burden is to compare $\tau_{\text{meas}}$ for massive-superposition records, including BEC-scale spatial superpositions of roughly $10^9$ to $10^{10}$ atoms, against $\tau_G$ and against ordinary environmental decoherence, while preserving the $\mathbb{A}\mathbb{A}\mathbb{A}$ claim that branch selection is finite-time threshold resolution rather than fundamental gravitational collapse. Any collapse variant that predicts persistent spontaneous heating must also pass low-background and compact-object heating bounds before it can serve even as a comparison baseline.

#### Spacetime cluster

Preferred-frame hiding, redshift, Shapiro delay, lensing, gravitational-wave speed, and the long-distance quantum correction to Newtonian gravity are all readouts of the same observer-level constitutive map. Thermodynamic-gravity closure belongs in the same cluster because area scaling, local horizon temperature, and nonequilibrium breakdown define whether the constitutive picture is merely suggestive or genuinely explanatory. Low-energy quantum-gravity EFT is kept here as a recovery benchmark, not as a commitment that the effective metric is microscopic ontology. These issues rise or fall together.

#### Reaction-cosmology cluster

Radiative planar-mode nucleation, pair-production provenance, BBN photon loading, CMB blackbody recovery, and redshift handoff form one closure cluster when cosmology is read through SMBH-local recycling and Noether-Sea transport. A local source story is not enough; the same provenance record must carry architrino inventory, energy-momentum, thermalization depth, and observer-level comparison variables without changing the Noether-Sea state map between channels.

Pre-BBN comparison branches belong to this same cluster. They can add value only as stress tests on the shared record: light-element yields, $N_{\text{eff}}$, CMB acoustic and lensing products, matter power, and stochastic gravitational-wave bounds must all be projections of the same Noether-Sea history. If the branch is kept alive by independent hiding assumptions, it is a null-result failure rather than a productive extension.

#### Radiation benchmark checks

Radiation Gate C closure is validated only if the same event record passes the following classified checks. These checks are not alternate ontologies; they are benchmark recoveries that prevent source-channel language from outrunning the photon and reaction ledgers.

| Check | Class | Required validation | Failure signal |
| --- | --- | --- | --- |
| Radiative event record | ontology | Record routed closure residuals, planar-mode photon output when present, non-photon shedding channels, recoil, local Noether-Sea state, and conservation ledgers. | Radiation is treated as primitive field emission or as untracked energy loss. |
| Larmor/Lienard recovery | derivation target | Recover $P\propto\lVert\mathbf{a}\rVert^2$ in the weak nonrelativistic limit and the Larmor/Lienard observer-level power/angular behavior after clock conversion. | Low-speed power is not quadratic in acceleration, or relativistic recovery needs a separate fit. |
| Bremsstrahlung emissivity | derivation target | Recover $d\sigma/dk$, screening/form-factor corrections, $\epsilon_{\nu}^{\mathrm{ff}}\propto Z^2 n_e n_i T^{-1/2}e^{-h\nu/(k_B T)}g_{\mathrm{ff}}$, and $\epsilon_{\mathrm{ff}}\propto Z^2 n_e n_i T^{1/2}$ in LTE. | Cross-section and emissivity require incompatible Noether-Sea variables or plasma-specific hidden fits. |
| Synchrotron $\gamma^2B$ scaling | derivation target | Recover $\nu_c\propto\gamma^2B$, $P_{\mathrm{syn}}\propto U_B\gamma^2$, and cooling breaks from one effective magnetic-state map. | The $\gamma^2$ frequency scaling is absent, or the $B$ map changes between curvature and emission. |
| Pair thresholds | derivation target | Recover $s\ge4m_e^2c^4$ and the angle-dependent photon-photon threshold while preserving architrino inventory and pair provenance. | Pair channels imply creation from nothing, wrong thresholds, or unbalanced Noether swarm recruitment. |
| Compton-like scattering | derivation target | Recover the Compton shift, Thomson limit, Klein-Nishina correction, recoil, and outgoing photon provenance in one Gate C vertex. | The channel becomes phenomenological frequency loss without a closed recoil and photon ledger. |
| Aharonov-Bohm phase | derivation target | Recover a relative phase proportional to enclosed magnetic flux while the local force channel on the interferometer arms vanishes, using the same effective U(1) connection and photon/action ledger as the rest of Gate C. | The phase requires a local force on the arms, an independent phase fit, or a literal gauge-potential ontology rather than a derived effective connection. |
| Blackbody recovery | derivation target | Recover Planck occupation, zero effective photon chemical potential, thermalization depth, damping, anisotropy, polarization handoff, and redshift handoff without retuning the Noether-Sea map. | The CMB or thermal branch needs unbalanced photon loading, per-observable retuning, or incompatible transport assumptions. |
| Free photon polarization boundary | derivation target | Use Gate B records for transverse modes, helicity, Malus' law, and analyzer statistics; radiation and cosmology pages may only consume that handoff. | Any radiation channel derives free photon polarization locally, adds a free longitudinal mode, or treats Gate B as already proven. |
| Noether-Sea-dependent deviations | speculation | State a benchmark-preserving limit and a measurable residual before promoting any $\rho_{\text{NS}}(\mathbf{x},t)$, $\chi_{\text{sea}}(\mathbf{x},t)$, anisotropy, or threshold-floor effect. | A deviation is used to repair a failed standard recovery or is fitted separately per observable. |

### Ontology Watchlist

The foundational ontology hub now keeps only stable commitments. Open questions that used to live there are tracked here or in the relevant branch chapters:

- **Deterministic branch selection:** close the rule for active causal roots, weighted sums, phase-sensitive thresholding, and basin selection in [Master Equation](../../../../markdown/aaa/dynamics/master-equation.md) and [Binary Dynamics](../../../../markdown/aaa/dynamics/binary-dynamics.md). The working hypothesis remains deterministic multistability, with apparent randomness coming from chaotic sensitivity to microstate and wake history.
- **Polarity unit and coupling scale:** explain $\epsilon=|e|/6$ and close $\kappa$ through [Parameter Ledger](../../../../markdown/aaa/validation/parameter-ledger.md), [Architrino SI Base Units](../../../../markdown/aaa/validation/architrino-si-base-units.md), and the charge-mapping chapters. The unresolved question is whether six-site nested shell swarm organization derives the $\epsilon$ unit, and whether $\kappa$ is related to $\epsilon$, $c_f$, $\hbar$, or Planck-alignment quantities rather than being independently postulated.
- **Quantum ontology:** keep wavefunction status, decoherence, and Born-rule recovery in [Wavefunction Ontology](../../../../markdown/aaa/quantum/wavefunction-ontology.md), [Measurement Ontology](../../../../markdown/aaa/quantum/measurement-ontology.md), and the Born-rule tension above. Decoherence still needs a stance on whether its irreversibility is fundamental in the Noether-Sea environment or practical because reversal is dynamically inaccessible to Physical Observers.
- **Symmetry and conservation:** close CPT stance, baryon-number status, and proton-stability regime through the particle and interaction chapters. The unresolved CPT issue is treated as a replacement constraint in [No-Go Theorems](../../../../markdown/aaa/validation/no-go-theorems.md#applicability-map): the standard proof assumes local relativistic QFT, while this framework uses absolute time and delayed substrate dynamics, so the corpus must preserve tested CPT-facing observables without importing those assumptions as ontology.
- **Cosmological history:** keep beginning/eternity and initial-condition questions in [Cosmology Ontology](../../../../markdown/aaa/cosmology/cosmology-ontology.md), [Expansion Mechanism](../../../../markdown/aaa/cosmology/expansion-mechanism.md), and related cosmology modules. If the background is eternal, the theory still owes a large-scale homogeneity and isotropy account, including a scale-neutral residual comparing dimensionless pair-separation distributions across large windows; if it has an initialization boundary, it owes an architrino-distribution account.
- **Unification claim:** treat "all forces from nested shell swarm geometry and Noether-Sea dynamics" as a closure program, not as a primitive ontology statement. The qualitative structure exists across interaction chapters, but quantitative derivations remain the acceptance gate.

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
\neq \varnothing.
$$

If that intersection becomes empty after quantitative work is done, the present implementation is rejected even if many individual chapters remain suggestive. The detailed sector predicates, benchmark tolerances, and promotion-fiber test are recorded in [Failure Criteria](../../../../markdown/aaa/validation/failure-criteria.md).

### Related Chapters

- [constraint-ledger.md](../../../../markdown/aaa/validation/constraint-ledger.md)
- [closure-scorecard.md](../../../../markdown/aaa/validation/closure-scorecard.md)
- [../assemblies/fermions/quantum-number-mapping.md](../../../../markdown/aaa/assemblies/fermions/quantum-number-mapping.md)
- [../spacetime/gr-phenomenology.md](../../../../markdown/aaa/spacetime/gr-phenomenology.md)
- [../quantum/measurement-ontology.md](../../../../markdown/aaa/quantum/measurement-ontology.md)

## Validation Simulations

### Action-Energy

#### Action Model

We synthesize Steps 1–10 and the canonical Action to compare, side by side, the three modeling options for the emission-propagation-interaction pipeline and to recommend a primary approach (with supporting roles for the others). We work in units with field speed $v=1$ unless stated otherwise; emission cadence and per-wavefront amplitude are constant at the source; per-hit actions are directed along $\hat{\mathbf{r}}$ with inverse-square geometric decay and Jacobian-weighted magnitude; $H(0)=0$ excludes the coincident-time self-kick; no cross products or right-hand-rule terms appear.

---

**Setup / assumptions**

* The emitter is at position $\mathbf{x}_s(t)$ in 3-D space (it can move).
* The emitter emits **thin causal wake surfaces**. Each wake surface is created at a single instant $\tau$ and then expands outward **spherically** from the creation point.
* The wake surface radius after emission time $\tau$ is

  $$
  r(t,\tau) = c\,(t-\tau) \quad \text{for } t\ge\tau,
  $$

  where $c$ is the constant **field speed** (you wrote $dr/dt=$ field speed; I call that $c$).
* Each emitted wake surface carries a **strength** $Q$ (I’ll call that “wake surface amplitude” — the physical meaning depends on your application: charge, potential impulse, energy, etc.).
* Continuous source (preferred): model the emitter as a moving point injection with time-density $q(t)$ (amplitude per unit time) at its instantaneous position, i.e., $S(\mathbf{x},t)=q(t)\,\delta\!\big(\mathbf{x}-\mathbf{x}_s(t)\big)$. Each instant $t_0$ contributes a causal wake surface; we do not count “wake surfaces per second” (pulse trains are merely numerical surrogates).
* We want to know the field $\phi(\mathbf{x},t)$ (I’ll call the scalar field “potential” or simply $\phi$) produced at any point $\mathbf{x}$ and time $t$.
* Global neutrality (working hypothesis): on large scales the total architrino charge inventory sums to zero (equal counts of $\pm\epsilon$); use this as the default boundary condition in PDE/Green’s-function comparisons.

We compare three frameworks: (1) a time-domain PDE/source, (2) an integral/Green’s-function (path history) solution, and (3) an event-driven radial-transport plus per-hit EOM. For each, we define symbols, show how the expanding causal wake surfaces appear, discuss how slowing or stopping the emitter is handled, and weigh trade-offs to inform a recommendation.

---

##### Time-based PDE (wave equation with a moving point source)

**Physical idea:** keep the source as “something injected per unit time at the emitter location,” put that into the wave PDE that governs how disturbances travel at speed $c$, and let the PDE produce expanding spherical wavefronts automatically. Numerically this is usually the easiest and most robust approach.

###### PDE model

Use the scalar wave equation (this is the standard PDE for a field that propagates at finite speed $c$):

$$
\boxed{\;\frac{\partial^2 \phi}{\partial t^2}(\mathbf{x},t) - c^2 \,\nabla^2 \phi(\mathbf{x},t) \;=\; S(\mathbf{x},t)\;}
$$

**Symbols**

* $\phi(\mathbf{x},t)$: scalar field (potential) at position $\mathbf{x}\in\mathbb{R}^3$ and time $t$.
* $c$: field propagation speed (units length/time).
* $\nabla^2$: Laplacian operator in space (sums second spatial derivatives).
* $S(\mathbf{x},t)$: source term (right-hand side) — this is how the emitter injects wake surfaces into the field.

###### Point (moving) source form

Use a continuous time-density of emission at the moving point:

$$
S(\mathbf{x},t) \;=\; q(t)\,\delta\!\big(\mathbf{x}-\mathbf{x}_s(t)\big).
$$

Here $q(t)$ has units “amplitude per unit time.” The finite-speed wave operator then generates outgoing spherical wavefronts automatically; no discrete wake surface count is assumed.

**How expanding causal wake surfaces appear**

* You did **not** put a “radius” into the right-hand side. Instead, the PDE and the finite speed $c$ cause any instantaneous injection at the point $\mathbf{x}_s(\tau)$ to produce an *outgoing spherical wave* whose wavefront moves outward at speed $c$. That is the built-in behavior of the wave equation.
* The Green’s function ensures that, at $(\mathbf{x},t)$, only the path history emission $q(\tau)$ with $\tau = t - r/c$ contributes, producing an outgoing spherical wave with amplitude $q(\tau)/(4\pi r)$ supported on $r=c(t-\tau)$. Thus Method 1 with $S(\mathbf{x},t)=q(t)\delta(\mathbf{x}-\mathbf{x}_s(t))$ naturally yields expanding causal wake surfaces at speed $c$.

**Why $v$ (emitter speed) doesn’t cause blow-ups**

* If the emitter slows or stops, $S(\mathbf{x},t)$ just keeps being nonzero at the same spatial location; the wave equation spreads each injection outward at speed $c$. No $1/|\mathbf{v}|$ singularity appears because you never converted from “per time” to “per distance.” You remain time-based.
* Numerically, represent the point delta by a small, smooth kernel if you want to avoid grid artifacts. Example: instead of $\delta(\mathbf{x}-\mathbf{x}_s)$ use a small Gaussian of width $\sigma$ comparable to grid spacing.

**Numerical recipe (simple)**

* Choose spatial grid $\mathbf{x}_i$ and time step $\Delta t$ satisfying CFL stability (roughly $c\Delta t/\Delta x \le \text{const}$).
* Use a standard finite-difference time stepping for the wave equation (centered difference in time and space).
* At each time step $t_n$ add the source contribution $S(\cdot,t_n)$ to the RHS at the grid cells nearest $\mathbf{x}_s(t_n)$. If the emitter stops, it remains injecting at that grid location — the solver propagates outgoing wake surfaces.
* To avoid a numerical spike, spread the delta over a few cells (mollifier) so you physically model a thin wake surface of finite thickness.

**Summary for Method 1**

* Model is explicit, straightforward, numerically robust.
* Emission is naturally time-based; wake surfaces expand automatically at speed $c$.
* No division by the emitter speed appears; stopping the emitter is handled simply by keeping the source at the same location.

---

##### Integral (Green’s function / path-history potential) approach

**Physical idea:** instead of evolving a PDE in time, write the solution as the sum of contributions from every past emission. For the wave equation the contribution from an impulse emitted at time $\tau$ and place $\mathbf{x}_s(\tau)$ arrives at a field point $\mathbf{x}$ only at the **path-history time** when the causal wake surface reaches $\mathbf{x}$. The Green’s function neatly encodes the expanding causal wake surface.

###### Fundamental formula (general)

If the wave equation is

$$
\frac{\partial^2 \phi}{\partial t^2} - c^2 \nabla^2 \phi = S(\mathbf{x},t),
$$

then the solution may be written as the space–time convolution with the Green’s function $G$:

$$
\boxed{\;\displaystyle \phi(\mathbf{x},t)
\;=\;
\iint G\big(\mathbf{x},t;\mathbf{y},\tau\big)\;S(\mathbf{y},\tau)\;d\tau\,d^3y\;}
$$

* $G(\mathbf{x},t;\mathbf{y},\tau)$ is the response at $(\mathbf{x},t)$ to an instantaneous unit impulse at $(\mathbf{y},\tau)$.

###### The 3-D free-space wave Green’s function

For three spatial dimensions (the usual case for causal wake surfaces), the causal Green’s function is

$$
G(\mathbf{x},t;\mathbf{y},\tau)
\;=\;
\frac{\delta\!\big(t-\tau - \tfrac{|\mathbf{x}-\mathbf{y}|}{c}\big)}{4\pi\,|\mathbf{x}-\mathbf{y}|},
\qquad t>\tau.
$$

**Interpretation:** a unit impulse at location $\mathbf{y}$ and time $\tau$ influences $\mathbf{x}$ at time $t$ only when the travel time $ |\mathbf{x}-\mathbf{y}|/c$ has elapsed; the $1/(4\pi r)$ factor is the usual geometric decay of an outgoing spherical wave in 3D.

###### Plugging in a moving point source

If the emitter is a moving point source with a time-dependent source amplitude $q(\tau)$ at location $\mathbf{x}_s(\tau)$, then $S(\mathbf{y},\tau)= q(\tau)\,\delta(\mathbf{y}-\mathbf{x}_s(\tau))$. Plugging this into the convolution gives (integral over $\tau$ only):

$$
\boxed{\;\displaystyle
\phi(\mathbf{x},t) \;=\; \int_{-\infty}^{t}
\frac{q(\tau)\;
\delta\!\big(t-\tau - \tfrac{|\mathbf{x}-\mathbf{x}_s(\tau)|}{c}\big)}
{4\pi\,|\mathbf{x}-\mathbf{x}_s(\tau)|}\; d\tau\;}
$$

* $q(\tau)$ is the continuous emission density per unit time at the emission instant $\tau$. For a steady source, $q(\tau)=q_0$ (constant); more generally, $q$ may vary smoothly with $\tau$.

###### Evaluating the integral — the path-history time

The $\delta$-function in the integrand enforces the *path-history-time condition*:

$$
t - \tau = \frac{r(\tau)}{c}, \qquad r(\tau)\equiv |\mathbf{x}-\mathbf{x}_s(\tau)|.
$$

So the contribution to $\phi(\mathbf{x},t)$ comes only from times $\tau$ such that the expanding causal wake surface emitted at $\tau$ has just reached $\mathbf{x}$ at time $t$.

Mathematically, use the identity $\delta(g(\tau))=\sum_i \delta(\tau-\tau_i)/|g'(\tau_i)|$ where $\tau_i$ are simple roots of $g$. With $g(\tau)=t-\tau - r(\tau)/c$ we find (after algebra) the standard path-history solution:

$$
\boxed{\;
\phi(\mathbf{x},t) \;=\; \sum_{\tau_i}
\frac{q(\tau_i)}{4\pi\,r(\tau_i)\,\big|1 + \tfrac{1}{c}\,r'(\tau_i)\big|}
\;=\;
\sum_{\tau_i}
\frac{q(\tau_i)}{4\pi\,r(\tau_i)\,\big|1 - \tfrac{\mathbf{n}(\tau_i)\cdot\mathbf{v}_s(\tau_i)}{c}\big|}\;}
$$

where:

* the sum runs over **path-history times** $\tau_i$ solving $t-\tau_i=r(\tau_i)/c$ (usually there is a single relevant root).
* $r(\tau_i)=|\mathbf{x}-\mathbf{x}_s(\tau_i)|$.
* $r'(\tau)=\dfrac{d}{d\tau}|\mathbf{x}-\mathbf{x}_s(\tau)| = -\,\mathbf{n}(\tau)\cdot\mathbf{v}_s(\tau)$.
* $\mathbf{v}_s(\tau)=\dfrac{d\mathbf{x}_s}{d\tau}$ is the source velocity at emission time $\tau$.
* $\mathbf{n}(\tau) = \dfrac{\mathbf{x}-\mathbf{x}_s(\tau)}{r(\tau)}$ is the unit vector pointing from source (at emission) to the field point.

In standard wave-equation solutions, a Jacobian factor $|1 - \mathbf{n}\!\cdot\!\mathbf{v}_s/c|$ arises from the change of variables used to evaluate the path history time delta. In this project’s canonical per-hit law, emission cadence and per-wavefront amplitude are constant and do not depend on emitter speed; we therefore do not apply this factor as an amplitude modulation.

###### Special simple case — stationary emitter

If $\mathbf{x}_s(\tau)=\mathbf{x}_0$ (emitter fixed) and $q(\tau)=Q\,\delta(\tau-\tau_0)$ (single wake surface at $\tau_0$), then the formula reduces to the intuitive result:

* The field at $\mathbf{x},t$ is nonzero only when $t-\tau_0 = |\mathbf{x}-\mathbf{x}_0|/c$, i.e., when the causal wake surface of radius $r=c(t-\tau_0)$ reaches $\mathbf{x}$.
* The amplitude is $\displaystyle \phi(\mathbf{x},t) = \frac{Q}{4\pi\,r}$ (no extra Jacobian factor because $v_s=0$).

###### How wake surfaces show up here

* Each emitted wake surface corresponds to one emission time $\tau$. The delta in the Green’s function selects the observation times $t$ at which the wake surface reaches $\mathbf{x}$.
* The shape of the contribution is the $1/(4\pi r)$ geometric factor (for wave amplitude); the wake surface is “thin” in time if $q(\tau)$ is a delta in $\tau$, so you get a short impulse when the wavefront passes.

###### Handling an emitter that stops / $|\mathbf v_s|\to 0$

* If the emitter slows or stops, the Jacobian factor $1 - \mathbf{n}\cdot\mathbf{v}_s/c$ tends to 1 and nothing singular happens. The path-history equation still has a solution and each wake surface arrives at the predicted time.
* If the emitter sits still and emits many wake surfaces (continuous $q(\tau)$), the field is the time integral (or sum) of all wake surface contributions evaluated at their respective causal times. No $1/|\mathbf{v}_s|$ blowup occurs.

---

##### Event-driven radial-transport + per-hit EOM (current canonical method)

Physical idea: represent emission as a conserved, razor-thin causal wake surface (a measure on the causal isochron), then drive particle motion by summing line-of-action per-hit accelerations with Jacobian-weighted magnitude at causal intersection times. We work in units with field speed $v=1$ unless noted; replace $v$ by $c$ otherwise.

Field representation (transport/continuity form)
- Source impulse at $(t_0,\mathbf{s}_0)$ creates a wake surface supported on $r = v(t-t_0)$ with surface density that conserves a constant per-wake surface amplitude $q$:
  $$
  \rho(t,\mathbf{s}) \;=\; \frac{q}{4\pi r^2}\,\delta\!\big(r - v(t-t_0)\big)\,H(t-t_0),\quad r=\|\mathbf{s}-\mathbf{s}_0\|.
  $$
- This solves the radial continuity (transport) equation
  $$
  \partial_t \rho + \nabla\!\cdot\!\big(v\,\hat{\mathbf{r}}\,\rho\big) \;=\; q\,\delta(t-t_0)\,\delta^{(3)}(\mathbf{s}-\mathbf{s}_0).
  $$
- Emission is continuous with constant time-density $q(t)\equiv q_0$.

Per-hit equation of motion (EOM)
- For a receiver $o'$ at time $t$ and a source $j$, causal emission times satisfy
  $$
  \|\mathbf{s}_{o'}(t) - \mathbf{s}_j(t_0)\| = v\,(t-t_0),\qquad t_0<t.
  $$
- Each root contributes a line-of-action acceleration
  $$
  \mathbf{a}_{o'\leftarrow j}(t;t_0)
  \;=\;
  \kappa\,\sigma_{q_j q_{o'}}\,\frac{|q_j q_{o'}|}{r^2\,|J_{o'j}(t;t_0)|}\,\hat{\mathbf{r}},
  \quad
  \hat{\mathbf{r}}=\frac{\mathbf{s}_{o'}(t)-\mathbf{s}_j(t_0)}{r},\ r>0,
  $$
  with total acceleration the sum over sources and roots. Convention $H(0)=0$ removes the instantaneous self-kick at $\tau=0$. Optional mollification replaces $\delta(\cdot)$ by $\delta_\eta(\cdot)$ to produce smooth pushes.

Implementation checklist
- Root finding: solve $F(t_0;t)=\|\mathbf{s}_{o'}(t)-\mathbf{s}_j(t_0)\|-v(t-t_0)=0$ for all $j$ (including $j=o'$ for self-hits when kinematics permit).
- Accumulation: compute $r,\hat{\mathbf{r}}$, apply $1/r^2$, then superpose.
- Time stepping: impulsive mode (events) or mollified mode ($\eta>0$) with standard ODE integrators.
- Self-interaction: appears when the worldline outruns recent wake surfaces ($\|\mathbf{v}\|>v$ for some emissions); self-hits are repulsive (like-on-like).

Relation to Methods 1 and 2
- This is a transport/continuity model, not the scalar wave equation. The $1/r^2$ factor is a surface-density normalization (Gauss-like on the spherically expanding causal wake surfaces); it is compatible with conserving total emission per wake surface. In Method 2 the $\!1/(4\pi r)$ factor appears for a wave amplitude; taking gradients connects these scalings when mapping to forces.
- The Doppler-type Jacobian $1-\mathbf{n}\!\cdot\!\mathbf{v}_s/c$ from Method 2 is not explicit here; geometric normalizations are absorbed into $\kappa$ by convention. We do not include any per-hit weighting by this Jacobian in the canonical law; geometry and timing alone encode speed effects.
- Numerically, this method targets particle dynamics directly (per-hit ODEs) rather than evolving a full field (Method 1) or evaluating fields at sparse probes (Method 2).

Operator diagnostics (finite-window checks)
- Use vector-calculus identities only on declared, reconstructed diagnostic channels such as $\nabla\Phi_\eta$ or the mollified transport current $\mathbf{J}_\eta=v\,\hat{\mathbf{r}}\,\rho_\eta$. These channels are validation objects, not new substrate ontology.
- For any finite control volume $V\subset\Sigma_t$ with outward unit normal $\hat{\mathbf{n}}$, define the Gauss residual
  $$
  R_G[V,t;\mathbf{Y}_\eta]\equiv
  \frac{\left|\int_{\partial V}\mathbf{Y}_\eta\!\cdot\!\hat{\mathbf{n}}\,dS-\int_V\nabla\!\cdot\!\mathbf{Y}_\eta\,dV\right|}
  {\int_{\partial V}\left|\mathbf{Y}_\eta\!\cdot\!\hat{\mathbf{n}}\right|\,dS+\int_V\left|\nabla\!\cdot\!\mathbf{Y}_\eta\right|\,dV+\varepsilon_G}.
  $$
- For any oriented smooth surface $S\subset\Sigma_t$ with boundary $\partial S$, define the Stokes residual
  $$
  R_S[S,t;\mathbf{Y}_\eta]\equiv
  \frac{\left|\oint_{\partial S}\mathbf{Y}_\eta\!\cdot d\mathbf{x}-\int_S(\nabla\times\mathbf{Y}_\eta)\!\cdot\!\hat{\mathbf{n}}\,dS\right|}
  {\oint_{\partial S}\left|\mathbf{Y}_\eta\!\cdot d\mathbf{x}\right|+\int_S\left|(\nabla\times\mathbf{Y}_\eta)\!\cdot\!\hat{\mathbf{n}}\right|\,dS+\varepsilon_S}.
  $$
- PDE and event-root simulations should agree not only pointwise after resampling, but also as operators on finite windows. If $\Delta\mathbf{Y}_\eta=\mathbf{Y}^{\mathrm{PDE}}_\eta-R(\mathbf{Y}^{\mathrm{root}}_\eta)$, use
  $$
  E_{\mathrm{op}}(V,S,t)\equiv
  \max\!\left\{R_G[V,t;\Delta\mathbf{Y}_\eta],\,R_S[S,t;\Delta\mathbf{Y}_\eta]\right\}.
  $$
  For the conservative potential channel $\mathbf{Y}_\eta=\nabla\Phi_\eta$, nonzero circulation is a numerical, boundary, or coordinate-operator error unless a non-gradient effective channel has been explicitly declared.

Plain language: Treat the field as razor-thin “paint” spread over a growing causal wake surface so the total amount stays the same. Every time a wake surface reaches you, you get a straight-line shove that falls off like one over distance squared; we either treat it as a sharp kick or a short, smooth nudge.

##### Cross-Method Guidance

When to use which method (quick pick)
- Method 1 (PDE): whole-field grid simulations, visualization, and complex media/boundaries. Deposit a smeared source each step; robust when an emitter slows or stops. Aggregate particle data to coarse-grained densities n(x,t), $\rho$(x,t), and ℰ(x,t) as inputs/targets for PDE runs and validation.
- Method 2 (Green’s function / path-history integral): closed forms and sparse probe evaluation. Enforce the path-history condition $t-\tau=|\mathbf{x}-\mathbf{x}_s(\tau)|/c$ and handle the geometric factor $1-\mathbf{n}\cdot\mathbf{v}_s/c$ during evaluation; root-solve one (or more) $\tau$ per (observer, time) pair.
- Method 3 (Event-driven canonical): production many-body dynamics. Find causal roots and sum per-hit $1/r^2$ pushes; prefer $\eta$-mollified mode for smooth ODEs when needed.

Short worked example — stationary emitter, continuous source (consistent across methods)
- Setup: emitter at origin $\mathbf{x}_s=0$ with $q(t)\equiv q_0$ (constant).
- Method 1: solving the wave PDE with $S(\mathbf{x},t)=q_0\,\delta(\mathbf{x})$ reproduces the same spherical profile $\phi(r,t)=q_0/(4\pi r)$ on the outgoing wavefront.
- Method 2: the path-history formula gives $\displaystyle \phi(r,t)=\frac{q_0}{4\pi r}$ with the path-history time $\tau=t-r/c$.
- Method 3: the path-history condition selects the single causal time $t_0=t-r/c$; the per-hit EOM yields one radial push along $\hat{\mathbf{r}}$ with $1/r^2$ scaling, consistent with taking spatial gradients of the $1/r$ potential to connect amplitude to force.

Practical implementation notes (concise)
- PDE: smear $\delta(\mathbf{x}-\mathbf{x}_s)$ to grid scale; enforce CFL ($c\,\Delta t/\Delta x$ within the scheme’s bound).
- Path-history: robust root-finding for $\tau$ from $t-\tau=r(\tau)/c$; take care near grazing geometries where $1-\mathbf{n}\cdot\mathbf{v}_s/c$ is small.
- Event-driven: bracket causal roots for continuity, optionally use $\delta_\eta$ for smooth pushes, and limit step sizes so only a controlled number of mollified wake surfaces overlap.

Bottom line (3 lines)
- Model sources as $S(\mathbf{x},t)=q(t)\,\delta\!\big(\mathbf{x}-\mathbf{x}_s(t)\big)$ (time-based emission density).
- Use Method 3 as the primary dynamics engine; use Method 2 for calibration/spot checks; use Method 1 for whole-field/media studies.
- All three agree on simple stationary cases; they differ mainly in computational scope: grids (1), closed-form probes (2), and event-driven ODEs (3).

---

##### Differential analysis (criteria-by-criteria)

Axiomatic fidelity (delayed-only, line-of-action, constant source emission)
- Method 1: Partially aligned. The PDE yields 1/(4$\pi$r) wave amplitudes; mapping to 1/r² per-hit accelerations requires gradients and conventions. Radial-only action is not built-in.
- Method 2: Causality and superposition are exact; amplitudes are 1/(4$\pi$r) with a Jacobian |1−$\mathbf{n}\cdot\mathbf{v}_s$/$c$|⁻¹ when evaluating the path-history time delta. The canonical law keeps that Jacobian weighting explicitly, while overall geometric normalizations are absorbed into $\kappa$ when comparing accelerations.
- Method 3: Exact match. Delayed-only, line-of-action per-hit with constant source emission is native, and the branch Jacobian appears explicitly in the received force magnitude. Geometric normalizations are conventionally absorbed into $\kappa$.

Causal root structure, self-interaction, multiplicity
- Method 1: Self-hits and multiple roots are implicit in the evolving field; they are not directly enumerated as discrete events.
- Method 2: Causal roots arise via solving $t-\tau=r(\tau)/c$; multiple roots and tangencies are explicit but require robust root-finding.
- Method 3: Roots are primitive; multi-hit and self-hit regimes are treated natively. Conventions H(0)=0 and exclusion of $r=0$ beyond $\tau=0$ are explicit.

Energetics and work
- Method 1: Continuum energy bookkeeping is natural ($\phi$, ∂t$\phi$, ∇$\phi$). Mapping to radial per-hit work needs careful averaging and alignment with the EOM.
- Method 2: Exact potentials in free space; gradients give forces; care is needed near |1−$\mathbf{n}\cdot\mathbf{v}_s$/$c$| → 0 geometries.
- Method 3: Energetics are validated via $\eta$-mollified potentials $\Phi_\eta$ and work–energy on resolved windows; impulses are recovered as $\eta$→0 in the weak sense.

Numerical stability and well-posedness
- Method 1: CFL constraints; dispersion/reflection control needed; robust under regularized sources; well posed on grids.
- Method 2: Stable as an evaluation formula; computational issues concentrate in robust, multi-root solving and handling near-tangency Jacobians.
- Method 3: Well posed with event handling or $\eta$-regularization; stability governed by root-tracking and step control; lightweight for many-body ODEs.

Computational cost and scalability
- Method 1: Heavy (3D grid + CFL time stepping). Cost grows with volume, resolution, and duration—independent of number of receivers.
- Method 2: Moderate to heavy depending on receivers × times × sources × roots; efficient for few probes, costly for dense sampling.
- Method 3: Light for particle dynamics. Cost scales with sources × average roots per step; independent of any spatial grid.

Boundaries, media, and heterogeneity
- Method 1: Natural—modify PDE coefficients (inhomogeneous c, damping, boundaries).
- Method 2: Natural only in homogeneous free space; complex media/boundaries require bespoke Green’s functions.
- Method 3: Natural in free space. Media/boundaries need additional modeling (e.g., corridor-level effective rules); not PDE-native.

Observables and inference (Step 9)
- Method 1: Full-field pictures aid intuition and corridor studies but obscure per-hit ambiguity without extra processing.
- Method 2: Clarifies causal timing and geometry at probes; good for inference templates and surrogate-location recasts.
- Method 3: Directly aligned with hit histories {A(t_k), L(t_k)}; best substrate for event-driven inference and assembly dynamics.

Summary (one line each)
- Method 1: Best for whole-field, media, and visualization; poorest fit to per-hit radial-only axioms without translation layers.
- Method 2: Best for exact, pointwise, causal analysis in free space; good for calibration and sparsely sampled validation.
- Method 3: Best for dynamics of many particles/assemblies under the canonical law; scales and matches axioms directly.

Operational guidance — when to use which method
- Method 1 (PDE): use this for whole-field grid simulations, visualization, and complex media or boundaries; step the wave PDE forward with a smeared source. Robust when an emitter slows or stops.
- Method 2 (Path history integral): use this for closed forms, analytic insight, or sparse probe evaluation; enforce the path-history condition $t-\tau=|\mathbf{x}-\mathbf{x}_s(\tau)|/c$ and handle the geometric factor $1-\mathbf{n}\cdot\mathbf{v}_s/c$ in evaluation; solve one root per (observer, time) pair in slow-motion, more if sources move fast.
- Method 3 (Event-driven canonical): use this for production many-body dynamics; find causal roots and sum per-hit $1/r^2$ pushes; prefer $\eta$-mollified mode for smooth ODEs when needed.

##### Pros and cons (comparative)

Method 1 — Time-based PDE (wave equation)
- Pros
- Physically standard propagation at fixed speed $c$; expanding causal wake surfaces emerge automatically.
  - Robust on grids; handles inhomogeneous media, damping, and boundaries.
  - Good for full-field visualization and energy bookkeeping in continuum form.
- Cons
  - Computationally heavy for many-particle dynamics (3D grids, CFL constraints).
  - Requires careful numerics to avoid dispersion/reflection; mesh choices can bias results.
  - Mapping grid fields to the radial-only per-hit ODE can add another modeling layer.

Method 2 — Green’s function (path-history integral)
- Pros
  - Exact in homogeneous free space; no grid or time stepping for the field.
  - Makes causality explicit via path-history times; captures Doppler/Jacobian $1-\mathbf{n}\!\cdot\!\mathbf{v}_s/c$ automatically.
  - Efficient when you need the field at a few observation points; excellent for analysis and cross-checks.
- Cons
  - Requires root-finding for each (observer, time) pair; multiple roots possible when sources outrun wake surfaces.
  - Costly when many receivers/sources are present; bookkeeping grows quickly.
  - Needs careful handling near tangencies (small Jacobians) and in multi-hit/self-hit regimes.

Method 3 — Event-driven radial-transport + per-hit EOM (current canonical)
- Pros
  - Directly implements the project’s delayed, radial-only interaction law with constant emission cadence.
  - Natural support for self-hits and superposition; local $1/r^2$ weighting makes nearby coherent roots dominate once the far-field cutoff, screening, cancellation, or summation prescription is declared.
  - Numerically lightweight for particle dynamics; works cleanly with impulsive or mollified ODE integration.
- Cons
  - Not derived from the scalar wave equation; global field-energy accounting is indirect (via mollified potentials).
  - Must retain the causal-root Jacobian factor from the master equation; a reduced test harness that omits it is a noncanonical approximation rather than a calibration of $\kappa$.
  - Accuracy depends on robust causal-root finding and regularization choices in complex multi-hit scenarios.

---

##### Recommendation (going forward)

- Use Method 3 as the primary engine for particle dynamics and assemblies. It matches the model’s axioms (radial-only action, constant emission cadence) and scales well.
- Adopt Method 2 as the analytic reference for calibration and validation. Calibrate $\kappa$ so simple benchmarks (stationary/slow sources, symmetric binaries) agree between Methods 2 and 3 at the per-hit level; do not introduce any per-hit emitter-speed weighting.
- Baseline formula (stationary emitter at origin): with $q(t)\equiv q_0$, $\displaystyle \phi(r,t)=\frac{q_0}{4\pi r}$ since the path history condition selects $\tau=t-r/c$; if $q$ varies, $\displaystyle \phi(r,t)=\frac{q(t-r/c)}{4\pi r}$.
- Reserve Method 1 for full-field studies (visualization, media, boundary effects) and for end-to-end tests of numerical stability; it is valuable but unnecessary for routine ODE-based assembly simulations.
- Documentation/actionables: keep the continuity-form field definition and per-hit EOM as the canonical statement; add a brief appendix mapping densities (Method 3) to potentials (Method 2) to clarify when $1/r$ vs $1/r^2$ factors appear and how calibration preserves totals.
- Numerical cautions (quick checklist):
  - Always smear $\delta(\mathbf{x}-\mathbf{x}_s)$ to a normalized kernel of width $\sigma$ comparable to the grid spacing in PDE runs to avoid grid-scale artifacts.
  - Enforce CFL: choose $\Delta t$ so that $c\,\Delta t/\Delta x$ meets the stability bound for the chosen stencil to prevent instability.
  - Path history solving: solve $t-\tau=r(\tau)/c$ carefully; near $|\mathbf{v}_s|\approx c$, root finding and the factor $1-\mathbf{n}\cdot\mathbf{v}_s/c$ require extra care.
  - Finite temporal thickness: if wake surfaces have duration, replace $\delta(t-\tau)$ with a smooth profile to model finite-width wavefronts.

Plain language: Keep using the event-driven, radial-only method for dynamics, check it against the path-history integral to set the knobs, and bring out the PDE only when you need whole-field pictures or complex media.

Recap (in three lines)
- Model sources as $S(\mathbf{x},t)=q(t)\,\delta\!\big(\mathbf{x}-\mathbf{x}_s(t)\big)$ (time-based emission density).
- Method 1: easiest for grid-based whole-field runs; wake surfaces emerge at speed $c$.
- Method 2: exact path-history formula; contributions occur only when $t-\tau = |\mathbf{x}-\mathbf{x}_s(\tau)|/c$, with amplitude decaying as $1/(4\pi r)$ and a geometric $1-\mathbf{n}\cdot\mathbf{v}_s/c$ factor in evaluation.

---

##### Layered penetration diagram (molecules → cores)

A qualitative “onion” sketch to visualize which excitations typically penetrate which structural layers. This helps readers see what’s excluded and what isn’t.

Legend: [+] passes, [~] depends (energy/frequency/geometry), [x] mostly blocked/strongly attenuated

| Layer | Photons | Neutrinos | Charged ±$\epsilon$ | Dark-matter-like neutral |
| --- | --- | --- | --- | --- |
| L4: Bulk molecular wake surface (solids/liquids; many-body opacity) | [~] material window; optical opaque, IR/UV/X/$\gamma$ vary | [+] nearly transparent | [x] bind/deflect; do not traverse as free particles | [+] very weak coupling |
| L3: Atomic electron distribution (bound electrons) | [~] photoelectric/Compton; X/$\gamma$ penetrate better | [+] | [x] Coulomb-coupled; captured/scattered | [+] |
| L2: Nuclear layer (nucleons; femtoscopic scale) | [~] $\gamma$ can interact; strong attenuation in bulk | [+] weak interaction; mostly pass | [x] excluded as free traversers | [+] |
| L1: Nested shell swarm shielding (nested shell binaries; shielded) | [x] far-field cancels; no corridor capture | [~] tiny axial coupling only | [x] self/partner couplings dominate; no transit | [+] by hypothesis: minimal coupling |
| L0: Axial corridors / flux-tube loci (coherent geometry) | [+] guided along corridor | [~] weak corridor coupling; alignment matters | [x] no cross-product forces; not a transit channel | [~] minimal, geometry-dependent |

Notes (interpretation):
- “Dark-matter-like neutral” denotes very weakly coupled, neutral meta-assemblies consistent with this framework; included here as a hypothesis for qualitative comparison.
- Entries marked [~] depend on spectrum, thickness, coherence, and alignment (e.g., $\gamma$ vs optical photons; corridor alignment for neutrinos).
- The diagram is about penetration (transit). Local interactions, capture, or re-binding are separate processes governed by geometry and delay.

#### Analytic Baselines

Purpose:
- State the delay differential equations (DDEs) that govern canonical interactions under the delayed line-of-action law with Jacobian-weighted magnitude.
- Record exact analytical solutions only where they exist; otherwise, state solvability status without approximations.

Models:
- Fixed center (test particle, source stationary):
  - DDE reduces exactly to the ODE $\ddot{r}=-K/r^2$ with $K=\kappa |q q'|>0$; exact closed forms exist.
- Two-body mutual interaction (opposite or equal charges):
  - Coupled DDEs with causal roots $t_0$ defined by $|x_i(t)-x_j(t_0)|=t-t_0$ (v=1); accelerations superpose as $\pm \kappa \epsilon^2/(r^2 |J|)$ along the line of action.
  - No exact closed-form solutions are presently known for the coupled DDEs in general.

Methodological priority:
- Treat the two-point-potential problem as the canonical first laboratory for the delayed theory.
- Any proposed energy, momentum, virial-like, or kinetic/potential closure claim should be checked here before being generalized to assemblies or Noether-Sea response arguments.
- In practice this means: solve the fixed-center and symmetric two-body cases first, then ask which familiar ODE identities survive, which acquire delay corrections, and which fail outright.

Symmetric two-body on a line (exact DDE; challenges):
- Let $x_1(t)=+\tfrac{1}{2}r(t)$ and $x_2(t)=-\tfrac{1}{2}r(t)$ with $r(t)>0$ and $v=1$. The causal-time condition implies
  $$
  \frac{r(t)+r(t_0)}{2} \;=\; t - t_0,\qquad t_0<t,
  $$
  or, writing $\tau(t)=t-t_0>0$ implicitly,
  $$
  r(t) + r\!\big(t-\tau(t)\big) \;=\; 2\,\tau(t).
  $$
- For opposite polarities, the exact relative-coordinate equation is the state-dependent DDE
  $$
  \ddot r(t) \;=\; -\,\frac{8\,\kappa\,\epsilon^2}{\big(r(t) + r(t-\tau(t))\big)^2\,|J(t)|},
  $$
  with $\tau(t)$ determined by the implicit constraint above. For equal charges, the sign is reversed.

Integral (delta) form selecting the causal root:
- For particle 1 one may write
  $$
  a_1(t) \;=\; -\,\kappa\,\epsilon^2 \int_{0}^{\infty}
  \frac{\delta\!\big(\lvert x_1(t)-x_2(t-\tau)\rvert - \tau\big)\,
  \mathrm{sgn}\!\big(x_1(t)-x_2(t-\tau)\big)}
  {\lvert x_1(t)-x_2(t-\tau)\rvert^{2}}\; d\tau,
  $$
  whose evaluation reduces exactly to finding the causal delay $\tau(t)$; in the symmetric 1D case this yields the DDE above.

Why closed-form solutions are unlikely (even with symmetry):
- The delay is state-dependent: the unknown $r(t)$ appears both in the right-hand side and in the implicit constraint defining $\tau(t)$, making the problem a nonlinear functional equation rather than an ODE.
- Even linear constant-delay DDEs rarely admit elementary closed forms; state-dependent delays are generically non-integrable. The fixed-center problem is a special case that collapses to an ODE (see 00.2.3.1).

Solution techniques (toolbox for delayed, radial DDEs):
- Method of steps (constant delays): for problems with fixed delay $\tau$ and a given history $x(t)=\phi(t)$ on $t\in[-\tau,0]$, integrate an ODE on successive intervals, using the known past segment on each step.
- State-dependent delay root-tracking: treat $\tau(t)$ as an algebraic unknown constrained by the causal-time equation (e.g., $r(t)+r(t-\tau)=2\tau$). On each step, solve the coupled system with a Newton corrector for $\tau(t)$; ensures consistency of the delay with the evolving state.
- Collocation / implicit Runge–Kutta with history interpolation: represent the recent history by Hermite/spline polynomials; at each step solve stage equations together with the causal constraint(s), updating a continuous extension of the history.
- Shooting and continuation for periodic motions: pose a boundary-value problem over one period with delay constraints; solve by Newton shooting or collocation and continue solutions via pseudo-arclength. Useful for detecting limit cycles and their stability.
- Spectral-in-time methods: on (quasi-)periodic windows, expand in Fourier/Chebyshev bases; constant delays enter as phase factors, while state-dependent delays are handled by iterating a frozen-delay linearization.
- Stability analysis (qualitative): Lyapunov–Krasovskii and Razumikhin functionals yield sufficient conditions for stability without solving trajectories; applicable to history classes with bounded delays.
- PDE embeddings (transport representation): introduce an auxiliary history field $y(t,\theta)$ on $\theta\in[-\tau_{\max},0]$ with $y_t + y_\theta = 0$ and boundary $y(t,0)=x(t)$; discretize in $\theta$ (method of lines). For state-dependent delays, use a moving boundary; aligns with the project’s radial-transport perspective.
- Green’s-function / hit-integral formulations: write per-hit actions as delta-weighted time integrals selecting causal roots; evaluate by robust root-finding and quadrature. This matches the event-driven law used here.
- Measure-driven/event-driven solvers with mollification: replace surface deltas by narrow Gaussians ($\eta>0$) to obtain $C^1$ trajectories; take $\eta\to 0$ in the weak sense after validating work–energy over resolved windows.
- Linear constant-delay benchmarks: for linear DDEs (e.g., $x' = a x + b x(t-\tau)$) use Laplace transforms/characteristic equations and Lambert W; helpful for validation and step-size/error control, even though the canonical two-body problems here are nonlinear and state-dependent.
- A posteriori error control: use defect/residual of collocation, step halving with history re-interpolation, and event-time error estimates for adaptive step and tolerance selection.
- Fixed-point frameworks: establish local existence/uniqueness by contraction on history spaces $C([-\tau_{\max},0])$ (or their mollified variants); use Picard iterations as a solver preconditioner.

Deliverables:
- Precise DDE forms and causal-root conditions for use in analysis and computation.
- Cross-references to sections with exact solutions (fixed source) and status notes (mutual interaction).
- A minimal benchmark ladder for closure tests:
  - fixed-center ODE recovery,
  - symmetric two-body delayed dynamics,
  - work-energy balance on resolved windows,
  - virial-like time averages where periodic or quasi-periodic regimes exist.

Plain language: We give only the exact delayed equations; where an exact solution exists (fixed source), we present it, and where it does not (mutual interaction), we say so without approximations.

#### Attraction

Setup:
- Two architrinos with charges q1=−$\epsilon$ and q2=+$\epsilon$.
- Initial velocities v1≈0, v2≈0; initial separation r0 ≫ 1 (in v=1 units).
- For all examples, we restrict motion to a single geometrical line.

Objectives:
- Delay-only formulation of the equations of motion (DDEs).
- Exact analytic solutions if available; otherwise, status of solvability.

Canonical delayed-law considerations:
- Delay enters through the implicit emission times $t_0$ satisfying $\lvert x_1(t) - x_2(t_0)\rvert = t - t_0$ (and its counterpart).
- All per-hit actions are radial along the line of action; $H(0)=0$ excludes $t_0=t$.

Equations of motion (canonical delayed law; two-body, v=1):
- Definitions:
  - Polarities: $q_1=-\epsilon$ (particle 1), $q_2=+\epsilon$ (particle 2); $\epsilon>0$ is the polarity-unit magnitude.
  - Coupling: $\kappa>0$ is the universal coupling constant; we work in units with field speed $v=1$.
  - Separation: $r(t)=|x_1(t)-x_2(t)|>0$.
- Causal (path-history) times:
  - $t_0^{(2\to 1)}\in\mathcal{C}_2(t)$ solves $\lvert x_1(t)-x_2(t_0)\rvert = t-t_0$.
  - $t_0^{(1\to 2)}\in\mathcal{C}_1(t)$ solves $\lvert x_2(t)-x_1(t_0)\rvert = t-t_0$.
- Per-particle accelerations (sum over all causal roots if multiple exist):
  $$
  a_1(t)
  \;=\;
  \sum_{t_0\in\mathcal{C}_2(t)}
  -\,\kappa\,\epsilon^2\,\frac{\mathrm{sgn}\!\big(x_1(t)-x_2(t_0)\big)}{r_{12}^2},
  \quad
  r_{12}=\big|x_1(t)-x_2(t_0)\big|,
  $$
  $$
  a_2(t)
  \;=\;
  \sum_{t_0\in\mathcal{C}_1(t)}
  +\,\kappa\,\epsilon^2\,\frac{\mathrm{sgn}\!\big(x_2(t)-x_1(t_0)\big)}{r_{21}^2},
  \quad
  r_{21}=\big|x_2(t)-x_1(t_0)\big|.
  $$
  Here $\sigma_{q_2 q_1}=\sigma_{q_1 q_2}=-1$ (unlike polarities attract), $H(0)=0$ excludes $t_0=t$, and $\mathrm{sgn}(\cdot)$ denotes the sign function.

Relative-coordinate DDE:
- Define $r(t)=x_1(t)-x_2(t)>0$. Then
  $$
  \ddot{r}(t)\;=\;a_1(t)-a_2(t)
  \;=\;
  -\,\kappa\,\epsilon^2\sum_{t_0\in\mathcal{C}_2(t)}\frac{\mathrm{sgn}\!\big(r_{12}\big)}{r_{12}^2}
  -\,\kappa\,\epsilon^2\sum_{t_0\in\mathcal{C}_1(t)}\frac{\mathrm{sgn}\!\big(r_{21}\big)}{r_{21}^2},
  $$
  with $r_{12}=|x_1(t)-x_2(t_0)|$ and $r_{21}=|x_2(t)-x_1(t_0)|$ defined by their respective causal-root conditions. No exact closed-form solution is presently known for the coupled DDE system.

Nonlinear history-anchored form (vector notation for clarity):
  $$
  \mathbf{a}_1(t)\;=\;-\,\kappa\,\epsilon^2\,\frac{\mathbf{s}_1(t)-\mathbf{s}_2\!\big(t_0^{(2\to 1)}\big)}{\big\|\mathbf{s}_1(t)-\mathbf{s}_2\!\big(t_0^{(2\to 1)}\big)\big\|^3},
  \qquad
  \mathbf{a}_2(t)\;=\;+\,\kappa\,\epsilon^2\,\frac{\mathbf{s}_2(t)-\mathbf{s}_1\!\big(t_0^{(1\to 2)}\big)}{\big\|\mathbf{s}_2(t)-\mathbf{s}_1\!\big(t_0^{(1\to 2)}\big)\big\|^3}.
  $$
  The attachment points are the partners’ path-history locations at their respective causal emission times; linearizations and small-parameter expansions are intentionally omitted.

Central-origin kinematics (1D positions and velocities; symmetric two-body frame)
- Choose a fixed origin at the geometric midpoint. With equal-magnitude charges and symmetric initial data, this midpoint remains at rest by symmetry.
- Define the separation
  $$
  r(t) \equiv x_1(t) - x_2(t) > 0.
  $$
  Positions relative to the central origin are then
  $$
  x_1(t) = \tfrac{1}{2}\,r(t),\qquad
  x_2(t) = -\,\tfrac{1}{2}\,r(t).
  $$
- Velocities follow by differentiation:
  $$
  v_1(t) = \dot{x}_1(t)
  = \tfrac{1}{2}\,\dot{r}(t),
  \qquad
  v_2(t) = \dot{x}_2(t)
  = -\,\tfrac{1}{2}\,\dot{r}(t).
  $$
- Symmetric initial conditions (example):
  $$
  x_1(0)=\tfrac{r_0}{2},\quad
  x_2(0)=-\tfrac{r_0}{2},\quad
  v_1(0)=v_2(0)=0.
  $$

Deliverables:
- Exact DDE statements and causal-root definitions suitable for analysis and computation.
- Solvability status: no known closed-form solution; numerical integration requires robust root-finding and event-aware stepping.

Plain language: Start very far apart and nearly at rest—motion remains on the initial line. Delay enters through the partner’s past position via the causal-time condition; there is no sideways component in this example.

#### Background and Simple Action

Existing text excerpt:
> The dynamics of an architrino are governed by a simple action: an acceleration caused by the intersection of its path with a potential field.
>
> Geodesics and dynamics: The background is fixed (absolute time × Euclidean space); free paths are straight. Accelerations come only from delayed causal hits from emitted causal isochrons, with line-of-action direction and Jacobian-weighted magnitude, never from background curvature.

Detailed explanation (dynamical geometry):

- Background kinematics (Newton–Cartan/Galilean):
  - The arena is absolute time × Euclidean space, $\mathcal{M}=\mathbb{R}\times\mathbb{R}^3$, with simultaneity slices $\Sigma_t=\{t\}\times\mathbb{R}^3$ carrying the flat spatial metric $h_{ij}=\delta_{ij}$.
  - “Geodesics are straight” means: in the absence of any interaction, a worldline $\mathbf{s}(t)$ satisfies $\mathbf{a}(t)=d^2\mathbf{s}/dt^2=\mathbf{0}$; motion is uniform and rectilinear in each slice $\Sigma_t$. The background is fixed; there is no curvature to encode forces.

-- Field geometry as a continuous causal flux:
  - Each architrino streams potential continuously. At any observation time $t$, the contribution emitted at past time $t_0$ sits on the **causal wake surface** (spherical isochron) $r=v(t-t_0)$ centered on $\mathbf{s}(t_0)$, with surface density $\propto 1/r^2$ so the integrated flux remains $q$.
  - “Potential field” refers to the superposition of all such causal isochrons from past emissions. The flux never shuts off; the surfaces are bookkeeping devices isolating portions of the path history whose intersection with a receiver delivers acceleration.

- Intersection as the driver of acceleration:
  - The receiver’s worldline is $\mathbf{s}_{o'}(t)$. An intersection at time $t$ means some earlier emission time $t_0 < t$ satisfies the causal-distance condition
    $
    \|\mathbf{s}_{o'}(t) - \mathbf{s}_o(t_0)\| = v(t - t_0)
    $
    That event is a causal hit from source $o$’s past to the receiver’s present.
  - At a hit, the acceleration impulse is directed along
    $
    \hat{\mathbf{r}} = \frac{\mathbf{s}_{o'}(t) - \mathbf{s}_o(t_0)}{\|\mathbf{s}_{o'}(t) - \mathbf{s}_o(t_0)\|}.
    $
    No cross products or right-hand-rule terms appear; the action is collinear with $\hat{\mathbf{r}}$. Its magnitude is weighted by the branch Jacobian $|J|^{-1}$, which captures causal-flux bunching or dilation due to source motion.

- “Simple action” in precise terms:
  - The law is event-driven: acceleration is a sum of per-hit line-of-action contributions, each scaled by $1/(r^2 |J|)$. Between hits (as $\eta\to 0$) motion is inertial; with mollification ($\eta>0$) the impulses become short, smooth pushes.
  - The background adds no force; departures from straight motion arise only from these intersections with emitted fields (including self-hits when kinematics allow).

- Physical picture:
  - Picture many continuously expanding wake surfaces (causal isochrons). A push occurs whenever one of those surfaces intersects the receiver, directed straight along the radius back to its emission point, with inverse-square geometric decay and an additional Jacobian weight set by the source motion on that branch.

If you’d like to continue, next up are “Units and constants” (the $v=1$ convention, coupling $\kappa$, regularization width $\eta$) and the formal definition of the causal interaction set $\mathcal{C}_{o'j}(t)$.

#### Causal Set and Delay Geometry

Existing text excerpt:
> -   **Causal Interaction Set:** The receiver $o'$ at time $t$ interacts with a source $o$ through the (possibly multi-valued) set of causal emission times
>     $$
>     \mathcal{C}_o(t) = \big\{\, t_0 < t \;\big|\; \|\mathbf{s}_{o'}(t) - \mathbf{s}_o(t_0)\| = (t - t_0) \,\big\}.
>     $$
>     For $|\mathbf{v}_o(t_0)| < 1$ locally, $\mathcal{C}_o(t)$ is generically a singleton; for $|\mathbf{v}_o|> 1$ it may contain multiple solutions (including self-hits when $o'=o$).

Clarification: “Multi-valued” means that, for a fixed observation time $t$, there can be more than one emission time $t_0$ that satisfies the causal-distance condition; i.e., $\mathcal{C}_o(t)$ may contain multiple causal roots (e.g., when $|\mathbf{v}_o|> 1$ or for self-hits when $o'=o$). This multiplicity can occur only if the transmitter/source has exceeded field speed at least once; if $|\mathbf{v}_o|<1$ everywhere, $F(t_0;t)$ is strictly increasing in $t_0$ and the causal root is unique.

Terminology note: the `causal set` in this simulation note is the causal interaction set $\mathcal{C}_o(t)$: a set of delayed emission times that reach a receiver now. It is not Causal Set Theory, the external quantum-gravity program that treats discrete spacetime events and partial order as fundamental. That outside program remains useful as a comparison for causal ordering and continuum emergence, but the native object here is a path-history root set inside absolute timespace.

Detailed explanation (geometry of delay and roots):

- Root condition as an expanding causal isochron intersection:
  - Define $F(t_0; t) \equiv \|\mathbf{s}_{o'}(t) - \mathbf{s}_o(t_0)\| - (t - t_0)$ (with $v=1$ units). Causal roots satisfy $F(t_0; t)=0$ with $t_0 < t$ and $H(t-t_0)$.
- Geometrically: the source point $\mathbf{s}_o(t_0)$ must lie on the causal wake surface (isochron) of radius $\tau = t - t_0$ centered at the receiver’s current position $\mathbf{s}_{o'}(t)$.

- Local uniqueness (sub-field-speed, transverse crossing):
  - If the source speed is locally sub-field-speed ($\|\mathbf{v}_o(t_0)\|<1$) and the derivative $\partial_{t_0}F(t_0;t) = -\hat{\mathbf{r}}\!\cdot\!\mathbf{v}_o(t_0) + 1$ is nonzero at the root, then the implicit function theorem guarantees a unique, smooth root branch near $t$.
  - Intuition: the expanding causal isochron intersects the moving source path transversely.

- Multiple roots (require super-field-speed):
  - When $\|\mathbf{v}_o\|> 1$ at some emission times, the source can outpace its recent wake surfaces, allowing several distinct historical points to satisfy the same distance–time constraint (multi-hit regime). If $\|\mathbf{v}_o\|<1$ everywhere, $F(t_0;t)$ is strictly increasing in $t_0$, so at most one causal root exists.

- Conventions at singular cases:
  - We adopt $H(0)=0$ so the instantaneous emission at $t_0=t$ does not produce an immediate self-kick.
  - No $r=0$ causal roots beyond $\tau=0$: because $r = v(t - t_0)$, $r=0$ implies $\tau=0$; the $\tau=0$ case is excluded by $H(0)=0$. Under mollification, the symmetric limit as $r\to 0$ yields zero net push.

Plain language: You only feel pushes from those earlier moments of a source whose causal isochrons currently pass through you. Usually there’s just one such moment; if the source is very fast or its path loops around, there can be several.

Non-technical visualization — outrunning your own wake (speedboat analogy):
- Picture a speedboat continuously laying down circular wake ridges that spread outward across the water at a fixed wave speed $c_w$ (analogy variable: wake ridge expansion speed). If the boat stays slower than $c_w$, it remains inside its newest ridge and will never meet it again, no self-hits. Once the boat exceeds $c_w$, it moves ahead of its freshest ridge. Later, if it curves or slows, it can run into older ridges it created earlier. Each crossing delivers a brief shove normal to the ridge (straight outward from the ridge’s center), mirroring the model’s line-of-action push. The ridge “drop rate” never changes, but the received shove is stronger or weaker depending on how the boat’s earlier motion bunches or dilates the ridge spacing along the crossing direction, mirroring the model’s Jacobian weighting. This is an analogy: real Kelvin wakes are dispersive; we idealize to circular ridges expanding at one speed to match the model’s fixed-speed causal isochrons.

Four self-hits in one maneuver (storyboard):
1) Sprint phase (exceed the field speed): The boat accelerates to a speed strictly greater than $c_w$ and holds it for several ticks. During this super-speed run it lays down several concentric ridges that it immediately outruns.
2) Set up spacing: Maintain the super-speed for long enough to create at least four successive ridges with noticeable gaps (their radii grow at $c_w\cdot \Delta t$ while the boat advances faster than $c_w$).
3) Curving return: Bank into a broad, smooth turn (a teardrop/U-turn or a gentle outward spiral) that arcs back toward the track laid moments earlier.
4) Crossings: As the boat’s curved path cuts across the expanding circles, it re-enters first the outermost of those recent ridges, then the next three in sequence. With a steady arc and timing, four distinct ridge crossings occur in quick succession—four self-hits. The shove at each crossing points straight away from the center of that ring (the boat’s earlier position).
5) Tuning intuition: To make four hits likely, think “fast straight run” $(\lvert v\rvert>c_w)$ to lay multiple rings, then a wide-radius turn whose chord length is comparable to the ring spacing. Tighter loops and longer super-speed runs increase the chance of multiple crossings; if you never exceed $c_w$, you cannot produce this multi-hit pattern at all.

#### Informational Ambiguity

Existing text excerpt:
> ### **Informational Ambiguity at the Receiver**
> From the perspective of the receiving architrino, the information carried by an intersecting causal wake surface (isochron) is limited. The receiver only knows two things:
> 1.  The net strength of the potential at the point of intersection.
> 2.  The unoriented line of action through its current position (i.e., one of the two open rays on that line; orientation along the line is ambiguous).

Detailed explanation (degeneracies and inference limits):

- Many-to-one mapping:
  - Different combinations of source identity, charge magnitudes, distances, and emission timings/geometry can yield the same instantaneous hit magnitude and direction at the receiver.

- Sign ambiguity across a line:
  - Attraction from a positive charge on one side is indistinguishable, at an instant, from repulsion by a negative charge located at the diametrically opposite point along the same line.

- Consequence for reconstruction:
  - Instantaneous local data at the receiver are insufficient to invert for sources; this remains true even for an $\mathbb{U}_{\text{now}}$ universe-state perspective who knows the universal clock $t$ and the Euclidean rest frame. The $\mathbb{U}_{\text{now}}$ universe-state perspective can eliminate coordinate uncertainty (perfect synchronization and alignment) but not the physical ambiguities below.
  - Irreducible ambiguities at an instant:
    - Sign/side ambiguity: attraction from a positive source on one side is indistinguishable from repulsion by a negative source on the diametrically opposite side along the same line.
    - Superposition along a line: multiple sources aligned on the same unoriented line of action can sum to the same net magnitude and direction at one instant.
    - Self-hit confound: a self-interaction and an external source can yield identical instantaneous data if they lie on the same line with compensating magnitudes.
    - Continuum of surrogate locations: for any instantaneous hit there exists a continuum of stationary surrogate source positions along the same unoriented line of action, each with a correspondingly adjusted emission time $t_0$, that reproduces the same instantaneous data; hence instantaneous inversion is severely underdetermined.

  - What helps (over time or with more views):
    - Track the time series of the line of action $\hat{\mathbf{r}}(t)$ and separation proxy $r(t)$ inferred from timing and geometry; curvature and rotation of $\hat{\mathbf{r}}$ constrain source trajectories.
    - Use multiple receivers (an array) to triangulate unoriented lines at the same $t$; intersecting rays narrow candidate locations (two-sided).
    - Actively vary the receiver path to sample different directions and ranges, turning the inverse problem into a controlled experiment.
    - Impose priors: charge inventories, speed bounds, and assembly templates reduce degeneracy space.
    - Use surrogate-location recasts: for instantaneous hits, place a stationary surrogate source somewhere along the same unoriented line of action and adjust only the emission time; this simplifies hypothesis testing without altering per-wavefront amplitude.
  - Absolute-observer note: Access to absolute time and a common Euclidean frame enables global correlation of events across receivers, but unique inversion at an instant would require hidden information (the full emission ledger $\{(t_0,\mathbf{s}_j(t_0),q_j,\mathbf{v}_j(t_0))\}_j$). Practical reconstruction is therefore necessarily temporal, statistical, and multi-view.

Plain language: A hit tells you how hard and from which direction you’re being pushed—but not who pushed you or how far away they are. Many different source stories can fit the same momentary shove. A null action at an instant conveys no information about sources; superposition can cancel perfectly even in a non-empty universe.

#### Numerical Recipe and Stability

Event-aware integration (practical algorithm):

1. Root finding:
   - For each source $o$ (including $o'=o$ for potential self-hits), solve $F(t_0;t)=\|\mathbf{s}_{o'}(t)-\mathbf{s}_o(t_0)\|-(t-t_0)=0$ for $t_0< t$.
   - Discard non-physical roots by convention $H(0)=0$ (exclude $\tau=0$); note $r=0$ occurs only at $\tau=0$ and is thus excluded.

2. Per-hit accumulation:
   - For each accepted root, compute $r$, $\hat{\mathbf{r}}$, and
     $$
     \mathbf{a}_{o'\leftarrow o}(t;t_0)=\kappa\,\sigma_{q_o q_{o'}}\,\frac{|q_o q_{o'}|}{r^2}\,\hat{\mathbf{r}}.
     $$
   - Sum over all sources and all roots (superposition).

3. Time stepping:
   - Impulsive mode: advance velocities with jumps at hit times (measure-driven ODE with velocity of bounded variation).
   - Mollified mode: replace $\delta(\cdot)$ by $\delta_\eta(\cdot)$ and integrate with a standard ODE solver; choose $\eta$ small relative to local geometric scales.

4. Stability tips:
   - Use event bracketing or root trackers for continuity of $t'(t)$ across steps.
   - Limit step size so that at most one (or a controlled number of) mollified wake surfaces overlap significantly per step.
   - Monitor invariants over resolved windows (work–energy balance with $\Phi_\eta$) to validate settings.

5. Units:
   - Use $v=1$ nondimensionalization throughout. Remember: emission cadence and per-wavefront amplitude are constant; receiver speed influences only power via $v_r$.

Plain language: At each time, find which past emissions can reach you now, sum their radial pushes with 1/r² falloff, and step forward—either with sharp kicks at exact hit times or with tiny-thick wake surfaces for smooth integration.

#### Radial Attraction

Setup:
- A test architrino with charge q′ falls radially toward a fixed center with charge q.
- The interaction is delayed; the causal emission time exists uniquely for a fixed source, but the acceleration depends only on the current separation because the source position is time-independent.

Objectives:
- Closed-form relations for r(t), v(r), and time-to-fall from r0 to r.
- Energy balance and integral expressions suitable for comparison.

Delay differential equation and exact reduction:
- With field speed normalized to $v=1$ and a fixed source location $x_c$, the causal root satisfies $|x(t)-x_c|=t-t_0$ with $t_0<t$.
- The per-hit law yields a line-of-action acceleration whose magnitude depends on the current separation $r(t)=|x(t)-x_c|$:
  $$
  \ddot{x}(t) \;=\; -\,\kappa\,\sigma_{q q'}\,\frac{|q q'|}{r(t)^2\,|J(t)|}\,\mathrm{sgn}\!\big(x(t)-x_c\big).
  $$
  Writing $K=\kappa\,|q q'|>0$ and $r=\lvert x-x_c\rvert$, the radial ODE is
  $$
  \ddot{r}(t) \;=\; -\,\frac{K}{r(t)^2\,|J(t)|}.
  $$

Exact solution (closed form):
- Energy integral: $\tfrac{1}{2}\dot{r}^2 - K/r = \text{const}$.
- For release from rest at $r(0)=r_0$ with $\dot{r}(0)=0$,
  $$
  r(t) \;=\; r_0 \cos^2 \eta,\qquad
  t \;=\; \sqrt{\frac{r_0^3}{2K}}\;\big(\,\eta + \sin\eta\cos\eta\,\big),\quad \eta\in[0,\tfrac{\pi}{2}],
  $$
  with fall time $T_{\mathrm{fall}}=\tfrac{\pi}{2}\sqrt{r_0^3/(2K)}$.

Notes:
- For a fixed source, the source velocity vanishes, so $J(t)=1$. The delayed formulation therefore reduces exactly to the inverse-square ODE above; the causal root determines only the emission time, not the instantaneous acceleration magnitude or direction.

Use:
- A ground-truth closed form against which delayed-law simulations can be benchmarked in the fixed-source case.

Plain language: With a stationary center, the Jacobian is trivial and the delayed law simplifies to the familiar inverse-square fall, which has an exact, closed-form solution.

#### Receiver Velocity and Work

Existing text excerpt:
> ### Receiver velocity: radial vs orthogonal components (instantaneous effect)
> Because $\mathbf{a}_{o'\leftarrow o}(t;t_0) \parallel \hat{\mathbf{r}}$, its instantaneous effect satisfies
> $$
> \frac{d}{dt}\mathbf{v}_\perp \;=\; \mathbf{0}\quad\text{from this hit},
> \qquad
> \frac{d}{dt}v_r \;=\; \mathbf{a}_{o'\leftarrow o}(t;t_0)\cdot \hat{\mathbf{r}}
> \;=\;
> \frac{\kappa\,\sigma_{q_o q_{o'}}\,|q_o q_{o'}|}{r^2}.
> $$

Detailed explanation (decomposition and energetics):

- Decomposition at a hit:
  - Write $\mathbf{v} = v_r\,\hat{\mathbf{r}} + \mathbf{v}_\perp$, where $v_r=\mathbf{v}\cdot\hat{\mathbf{r}}$ and $\mathbf{v}_\perp\cdot\hat{\mathbf{r}}=0$.
  - A single hit changes $v_r$ but not $\mathbf{v}_\perp$ instantaneously.

- Power and work:
  - Instantaneous power is $\mathbf{a}\cdot\mathbf{v} = |\mathbf{a}|\,v_r$.
  - Orthogonal motion does no instantaneous work; only radial motion exchanges kinetic and potential energy at a hit.

- Local trend via $1/r^2$:
  - If $v_r<0$ (moving inward), near-future hits tend to be stronger because $r$ shrinks between events; if $v_r>0$, they tend to weaken.

Plain language: Each hit only changes your along-the-line speed right then; sideways speed is untouched. Energy transfer happens only through the along-the-line part.

#### Repulsion

Setup:
- Two identical charges (e.g., q1=q2=+$\epsilon$) placed at separation r0 with v1=v2=0 and symmetry about the midpoint.

Objectives:
- Delay-only formulation of the equations of motion (DDEs).
- Exact analytic solutions if available; otherwise, status of solvability.

Delay differential equations (two-body, v=1):
- Causal times:
  - $t_0^{(2\to 1)}\in\mathcal{C}_2(t)$ solves $\lvert x_1(t)-x_2(t_0)\rvert = t-t_0$.
  - $t_0^{(1\to 2)}\in\mathcal{C}_1(t)$ solves $\lvert x_2(t)-x_1(t_0)\rvert = t-t_0$.
- Accelerations (sum over all causal roots if multiple exist):
  $$
  a_1(t)
  \;=\;
  \sum_{t_0\in\mathcal{C}_2(t)}
  +\,\kappa\,\epsilon^2\,\frac{\mathrm{sgn}\!\big(x_1(t)-x_2(t_0)\big)}{r_{12}^2},
  \quad
  r_{12}=\big|x_1(t)-x_2(t_0)\big|,
  $$
  $$
  a_2(t)
  \;=\;
  \sum_{t_0\in\mathcal{C}_1(t)}
  -\,\kappa\,\epsilon^2\,\frac{\mathrm{sgn}\!\big(x_2(t)-x_1(t_0)\big)}{r_{21}^2},
  \quad
  r_{21}=\big|x_2(t)-x_1(t_0)\big|.
  $$
- Symmetry implies $x_1(t)=-x_2(t)$ and $a_1(t)=-a_2(t)$ for all $t$ given symmetric initial data.

Solvability status:
- No exact closed-form solution is presently known for the coupled DDE system under mutual repulsion with delay.

Deliverables:
- Exact DDE statements and causal-root definitions suitable for analysis and computation.
- Notes on symmetry and qualitative properties without invoking approximations.

Plain language: Two like polarities at rest push apart along the line under the delayed law; the governing equations are implicit in the causal times, and no closed-form solution is currently known.

#### Self-Energy

Purpose: explain why classical “point-charge self-energy” divergences do not arise in this framework, and summarize the role of measure-valued causal surfaces, the H(0)=0 convention, and $\eta$-mollification.

##### Classical self-energy pathology (contrast)

In classical electrostatics, a static 1/r potential yields an electric field E ∝ 1/r² with energy density ∝ |E|² ∝ 1/r⁴. Integrating 1/r⁴ over a ball produces a divergent ∫(1/r²)dr near r→0, the textbook “infinite self-energy of a point charge.” This is an artifact of modeling the source as an enduring, everywhere-filled near field.

##### Why the divergence is absent here

This project does not posit a static near field. Instead:

- Measure-valued expanding causal surfaces (no static 1/r near field):
- Each emission is a razor-thin causal isochron with surface density q/(4$\pi$r²), represented by $\rho$(t,s) = (q/(4$\pi$r²)) $\delta$(r − v$\tau$) H($\tau$). The field support at fixed t is a causal wake surface $S_r$, not a 3D 1/r² fill down to r=0. See 00.1.0 — Architrino (Analytic form).

- H(0)=0 (no coincident self-kick):
  - The instantaneous emission ($\tau$=0) contributes nothing to the force on the emitter; r=0 roots beyond $\tau$=0 do not exist because r = v(t − t₀). This removes the only event where a literal r=0 could enter. See 00.1.4 — Action (conventions).

- $\eta$-mollification (finite, well-defined work over resolved windows):
  - Replace $\delta$(r − v$\tau$) by a narrow Gaussian $\delta$_$\eta$ with width $\eta$>0 when differentiability is required. Potentials $\Phi$_$\eta$ and forces −∇(q′$\Phi$_$\eta$) are then regular functions; on any resolved interval the work–energy identity holds:
    $\Delta$E_k = −$\Delta$U, with U = q′ $\Phi$_$\eta$,
    and remains finite. As $\eta$→0, integrals converge in the weak sense to the impulsive model without introducing infinities. See 00.2.1.6 — Well-posedness and regularization.

- Event-driven geometry (self-hits occur at r>0):
  - Self-interaction requires outrunning recent wake surfaces (|v|>v). Self-hits are intersections with one’s own earlier wakes at strictly positive radius r>0, yielding finite 1/r² impulses (repulsive, like-on-like). There is no accumulation of divergent near-field energy at r→0.

Net effect: the canonical ontology (moving surface measures, H(0)=0, mollification for analysis) avoids the classical point-charge self-energy divergence by construction.

##### Practical guidance (numerics and analysis)

- Choose $\eta$ small relative to local geometry (path curvature radius, inter-source spacing) for smooth ODE integration; verify $\Delta$E_k = −$\Delta$U on resolved windows.
- Calibrate $\kappa$ using stationary/slow benchmarks (Method 2) and use the event-driven law (Method 3) for many-body dynamics; no per-hit emitter-speed amplitude weighting is introduced.
- Treat self-hits as ordinary finite r>0 events; ensure H(0)=0 in implementation to exclude coincident-time artifacts.

##### Sign-resolved bookkeeping

An additional numerical caution is worth stating explicitly: a Noether-Sea region or assembly may carry a large internal action budget even when its coarse far field appears weak.

- Positive and negative sectors can superpose so that the net far-field potential is small.
- That cancellation does **not** imply the underlying kinetic work or stored interaction content is individually small in each sector.
- For this reason, diagnostics should track sign-resolved contributions whenever possible rather than relying only on net-field summaries.

This matters especially for shielding claims. A strongly shielded assembly may look energetically modest from afar while still containing substantial internal positive/negative activity whose cancellation is only effective after superposition. Sign-resolved ledgers therefore help distinguish true low-energy states from high-content states hidden by cancellation.

Plain language: We don’t keep a permanent 1/r field glued to the point. Instead we use thin expanding causal surfaces, ignore the instant of emission for self-push, and (when needed) slightly thicken those wake surfaces so calculus works—so nothing ever “blows up” at r=0.

#### Self-Interaction Switch

Existing text excerpt:
> ### **Self-Interaction**
> An architrino can intersect an expanding causal isochron that it emitted itself at an earlier point in its history. Self-hit occurs when the same-source causal-root set is nonempty, $\mathcal{C}_{aa}(t)\ne\varnothing$. Super-field-speed history is a necessary warning condition for simple nontrivial roots, but it is not sufficient by itself; curvature, branch geometry, and the transversality floor determine whether the worldline actually intersects its own causal wake. The like-polarity self-hit contribution is repulsive and plays a key role in the stability of emergent structures.

Detailed explanation (conditions and effects):

- Root multiplicity and self-roots:
  - The simulation should open the self-hit channel only when it finds same-source roots
    $$
    \mathcal{C}_{aa}(t)=\{\,s<t:\|\mathbf{x}_a(t)-\mathbf{x}_a(s)\|=c_f(t-s)\,\}.
    $$
    A speed excursion above $c_f$ flags a candidate interval; it is not an acceptance test without root existence and a nonzero Jacobian/transversality margin.

- Repulsive character:
  - For like-on-like (self) interaction, $\sigma_{q_a q_a}=+1$ ensures the self-contribution points outward along $+\hat{\mathbf{r}}$, opposing further collapse.

- Stabilization and scale selection:
  - In binaries and nested assemblies, delayed attraction competes with self-repulsion. Their balance sets a minimal sustainable radius $d_0$ and a fastest natural frequency $2\pi/t_0$.

Plain language: A fast interval can make self-hit possible, but the code must still solve the same-source root equation; only actual same-source hits push outward and help set the smallest sizes and fastest rhythms of stable structures.

#### Superposition and Locality

Existing text excerpt:
> -   **Superposition:** The potential fields from all sources superpose linearly. The net potential at any point is the sum of the individual potentials:
>     $$
>     \Phi_{\text{net}} = \sum_{i} \Phi_i
>     $$
>     The total acceleration on a particle at any instant is the vector sum of the contributions from every intersecting causal wake surface. Operationally, every architrino is continuously immersed in the superposed wakes of all others (and, when the same-source root condition permits, its own); calculating the path-history integral is tractable by isolating each causal emission event, evaluating the Jacobian-weighted $1/r^2$ kernel at that emission, and then summing under a declared finite active horizon, screening rule, cancellation argument, or summation prescription.

Detailed explanation (why near fields dominate):

  - Linear addition at the causal-surface level:
    - Because each source contributes a distribution supported on its causal wake surfaces, the total field is a sum of these measures; the acceleration law is linear in the summed contributions.

  - Locality from $1/r^2$ plus convergence control:
    - The surface density on each causal wake surface scales as $1/r^2$, so nearby coherent hits contribute disproportionately compared to distant ones. In an infinite three-dimensional source population this does not by itself guarantee convergence, because the number of sources in a radial layer grows like $r^2\,dr$. Random phases, angular cancellation, screening, finite active horizons, or explicit mean-field/principal-value subtraction must be part of the branch prescription.

- Practical consequence:
  - Simulations can prioritize nearby sources and recent roots only after declaring the far-field treatment: cutoff error, multipole cancellation, screened background, sampled mean field, or principal-value subtraction.

Plain language: Add the pushes from all causal wake surfaces, but do not assume one over distance squared makes an infinite universe automatically finite; the simulation must say how distant wakes cancel, screen, or get summarized.

#### Units and Constants

Existing text excerpt:
> ### **Units and constants**
> -   We choose units with field speed $v=1$ (select $L_0,T_0$ so $v=L_0/T_0=1$); all speeds are hence dimensionless.
> -   $\kappa>0$ is the universal coupling constant controlling interaction strength.
> -   $\eta>0$ is the default regularization thickness for causal isochrons.
>
> Symbols:
-> -   $v=1$ (field speed by units), $\kappa>0$ (coupling), $\eta>0$ (isochron thickness)
> -   $\epsilon>0$ (polarity-unit magnitude); Electrino $q=-\epsilon$, Positrino $q=+\epsilon$
> -   $\sigma_{q q'}=\mathrm{sign}(q\,q')\in\{+1,-1\}$
> -   $r=\|\mathbf{s}_{o'}(t)-\mathbf{s}_o(t_0)\|$, $\;\hat{\mathbf{r}}=(\mathbf{s}_{o'}(t)-\mathbf{s}_o(t_0))/r$

Detailed explanation (dynamical geometry):

- Field-speed units ($v=1$):
  - Choosing $L_0,T_0$ with $v=L_0/T_0=1$ fixes a conversion between spatial and temporal scales so that all speeds are dimensionless ratios to the field speed. This is akin to “setting c=1,” but the reference is the model’s field speed. Kinematics still lives on absolute time × Euclidean space; we have not mixed time and space into a 4D line element.
  - Consequence: every velocity appears as a pure number $|\mathbf{v}|$; the symmetry point “$|\mathbf{v}|=v$” becomes “$|\mathbf{v}|=1$.” Rescaling $L_0$ and $T_0$ together leaves all dimensionless predictions invariant.

- Coupling constant ($\kappa>0$):
  - $\kappa$ sets the overall scale of per-hit acceleration. In the canonical law,
    $
    \mathbf{a}_{o'\leftarrow o} = \kappa\,\sigma_{q_o q_{o'}}\,\dfrac{|q_o q_{o'}|}{r^2\,|J_{o'\leftarrow o}|}\,\hat{\mathbf{r}},
    $
    larger $\kappa$ uniformly strengthens every interaction.
  - Scaling insight: if you scale $\kappa\mapsto \alpha\kappa$ while keeping $(\epsilon,\eta)$ fixed, accelerations scale by $\alpha$. Characteristic assembly scales such as the minimal binary radius $d_0$ and period $t_0$ shift accordingly through the dynamical balance that defines them.

- Regularization width ($\eta>0$):
  - $\eta$ is the width applied to each causal isochron (wake surface) to mollify the surface delta $\delta(r-\tau)$. It converts impulsive hits into brief, smooth pushes so that standard ODE integration applies and pointwise quantities (like gradients) are well-defined.
  - Geometric guidance: choose $\eta$ small relative to local geometric scales (e.g., the receiver’s instantaneous curvature radius along its path and the local inter-source separation) so the regularized dynamics approximate the ideal path-history picture while remaining numerically stable.

- Unit charge magnitude ($\epsilon>0$):
  - $\epsilon$ is the fundamental charge scale of an architrino (Electrino $q=-\epsilon$, Positrino $q=+\epsilon$). In this framework $\epsilon$ is often identified with $|e|/6$, making quark charges integer multiples of $\epsilon$.
  - Per-wavefront amplitude and emission cadence are constant at the source. The received force magnitude is additionally modulated by the branch Jacobian $|J|^{-1}$, which depends on source motion along the line of action.

- Sign of interaction ($\sigma_{q q'}$):
  - $\sigma_{q q'}=\mathrm{sign}(q\,q')$ selects attraction vs repulsion while keeping the acceleration strictly collinear with $\hat{\mathbf{r}}$. Like-on-like ($\sigma$=+1) points along +$\hat{\mathbf{r}}$ (repulsion); unlike ($\sigma$=-1) points along -$\hat{\mathbf{r}}$ (attraction).

- Line of action ($r$, $\hat{\mathbf{r}}$, $J$):
  - $r=\|\mathbf{s}_{o'}(t)-\mathbf{s}_o(t_0)\|$ is the separation between the receiver “now” and the source at its causal emission time. $\hat{\mathbf{r}}$ is the corresponding unit vector, and $J=1-\mathbf{v}_o(t_0)\cdot\hat{\mathbf{r}}/v$ is the causal Jacobian. All per-hit actions are directed along this line; no transverse or right-hand-rule terms appear.

- Combined role in assembly scales:
  - The trio $(\kappa,\epsilon,\eta)$, together with the $1/r^2$ law, determines emergent scales such as the smallest sustainable orbit $d_0$ and fastest natural frequency $2\pi/t_0$. Intuitively, stronger coupling (larger $\kappa\epsilon^2$) and sharper wake surfaces (smaller $\eta$) favor tighter, faster structures until self-interaction and delay balance inward trends.

- Dimensionless branch-scan controls:
  - Simulation sweeps should report dimensionless controls rather than only raw choices of $(\kappa,\epsilon,\eta,L_0,T_0)$. Choose a reference length $L_\star$ and the corresponding reference time $T_\star=L_\star/c_f$; in field-speed units, $c_f=1$ and $T_\star=L_\star$.
  - **Speed ratio:** use
    $$
    \beta_i(t)=\frac{\|\mathbf{v}_i(t)\|}{c_f},
    $$
    and, for circular binary scans, the existing speed factor
    $$
    s=\frac{R\omega}{c_f}.
    $$
    A branch scan must state whether the sampled histories remain below, cross, or remain above the self-hit onset $\beta=1$.
  - **Delay/window ratio:** use
    $$
    \Theta_\tau=\frac{\tau_{\max}}{T_{\mathrm{win}}},
    $$
    where $\tau_{\max}$ is the longest active causal lookback time and $T_{\mathrm{win}}$ is the averaging, diagnostic, or return-map window. The stored history horizon $h$ must satisfy $h\ge\tau_{\max}$ on the scanned branch chart.
  - **Regularization thickness:** use
    $$
    \hat{\eta}=\frac{\eta}{L_\star},
    $$
    with local checks such as $\eta/r_{\min}$ against the smallest resolved separation. A scan is numerically meaningful only when branch counts and averaged observables stabilize as $\hat{\eta}$ is reduced while the causal wakes remain resolved.
  - **Coupling scale:** compare the per-hit acceleration scale with the reference acceleration $L_\star/T_\star^2$:
    $$
    g_\kappa
    =
    \frac{\kappa\epsilon^2 T_\star^2}{L_\star^3}
    =
    \frac{\kappa\epsilon^2}{c_f^2 L_\star}.
    $$
    In field-speed units this reduces to $g_\kappa=\kappa\epsilon^2/L_\star$.
  - **Branch/root tolerances:** for the causal-root residual
    $$
    g_{ij}(\tau,\phi)
    =
    \|\phi_i(0)-\phi_j(-\tau)\|-c_f\tau,
    $$
    accept a root only when $|g_{ij}|/L_\star\le\varepsilon_{\mathrm{root}}$, keep distinct roots separated by $|\tau_a-\tau_b|/T_\star>\varepsilon_{\mathrm{sep}}$, and treat $|J|\le\varepsilon_J$ as a branch-birth or caustic zone rather than an ordinary stable branch.
  - A branch-scan report should therefore include at least
    $$
    (\beta_{\max}\ \text{or}\ s,\ \Theta_\tau,\ \hat{\eta},\ g_\kappa,\ \varepsilon_{\mathrm{root}},\ \varepsilon_{\mathrm{sep}},\ \varepsilon_J),
    $$
    together with the active causal-root ledger. This prevents a change in units, regularization, or root finder tolerance from masquerading as a new physical branch.

Plain language: We measure speeds in units where the field speed is one, use $\kappa$ to set how hard every hit pushes, use $\eta$ to slightly thicken the razor-thin isochrons so calculus works, and use $\epsilon$ as the basic unit of polarity. The push is always straight along the line back to where the isochron was emitted, but its received strength is also shaped by the Jacobian factor $|J|^{-1}$; like polarities push out, unlike polarities pull in.

#### Well-Posedness and Regularization

Existing text excerpt:
> ### **Well-posedness and Regularization**
> $$
> \delta(r - \tau)\ \longrightarrow\ \frac{1}{\sqrt{2\pi}\,\eta}\,\exp\!\Big(-\frac{(r - \tau)^2}{2\eta^2}\Big),
> $$
> while preserving total emission $q$.

Detailed explanation (impulses vs smooth pushes):

- Measure-driven dynamics:
  - With exact surface deltas, dynamics are impulsive: velocities are functions of bounded variation with jump discontinuities at hit times.

- Mollified isochron surfaces:
  - Replacing $\delta(\cdot)$ by a narrow Gaussian of width $\eta>0$ spreads each causal surface’s intersection into a short, smooth push, yielding classical $C^1$ trajectories for standard ODE solvers.

- Choosing $\eta$:
  - Select $\eta$ small relative to local geometric scales (path curvature radius, inter-source spacing) to approximate the event-driven picture while maintaining numerical stability.

- Distributional wake-surface normalization:
  - Treat $\delta(r-v\tau)$ and $\delta_\eta(r-v\tau)$ as distributions, so the invariant statement is an integrated statement against a test function, not the sampled height of the spike. For $\tau=t-t_0$ and $r=\|\mathbf{s}-\mathbf{s}_0\|$,
    $$
    \rho_\eta(t,\mathbf{s})=
    \frac{q}{4\pi r^2}\,\delta_\eta(r-v\tau)\,H(\tau)
    $$
    must satisfy
    $$
    \lim_{\eta\to0}\int_{\Sigma_t} f(\mathbf{s})\,\rho_\eta(t,\mathbf{s})\,dV
    =
    \frac{qH(\tau)}{4\pi}\int_{S^2} f(\mathbf{s}_0+v\tau\,\hat{\boldsymbol{\omega}})\,d\Omega.
    $$
  - In particular, $f\equiv1$ gives the total-emission check
    $$
    \int_{\Sigma_t}\rho_\eta(t,\mathbf{s})\,dV \longrightarrow qH(\tau).
    $$
    On a finite annulus $R_-\le r\le R_+$, the expected retained amount is
    $$
    Q_{\eta}^{\mathrm{ann}}(R_-,R_+;t)=
    qH(\tau)\int_{R_-}^{R_+}\delta_\eta(r-v\tau)\,dr.
    $$
    The annular residual is therefore
    $$
    R_N(R_-,R_+;t)\equiv
    \frac{\left|\int_{R_-\le r\le R_+}\rho_\eta(t,\mathbf{s})\,dV-Q_{\eta}^{\mathrm{ann}}(R_-,R_+;t)\right|}
    {|q|+\varepsilon_q}.
    $$
    This catches missing $4\pi r^2$ factors, lost radial Jacobians, and mollifiers that do not preserve total emission.

- Curvilinear-coordinate hygiene:
  - Operator checks in spherical or cylindrical charts must use the Euclidean metric scale factors, not Cartesian component formulas applied to curvilinear components. For spherical coordinates $(r,\theta,\varphi)$ centered on the emission point,
    $$
    dV=r^2\sin\theta\,dr\,d\theta\,d\varphi,\qquad
    dS_R=R^2\sin\theta\,d\theta\,d\varphi,
    $$
    and a radial diagnostic channel $F_r(r)\hat{\mathbf{r}}$ obeys
    $$
    \nabla\!\cdot\!\big(F_r(r)\hat{\mathbf{r}}\big)=
    \frac{1}{r^2}\frac{\partial}{\partial r}\!\left(r^2F_r(r)\right).
    $$
    For a radial scalar $f(r)$,
    $$
    \Delta f=
    \frac{1}{r^2}\frac{\partial}{\partial r}\!\left(r^2\frac{\partial f}{\partial r}\right).
    $$
    The invalid shortcut $\nabla\!\cdot(F_r\hat{\mathbf{r}})=\partial_rF_r$ breaks the conservation normalization of causal wake surfaces.

- Finite-limit discipline:
  - Treat finite source count, finite memory depth, finite step size, finite domain/window, and finite $\eta>0$ as the first proof or simulation regime.
  - Promote large-system, continuum, or $\eta\to0$ statements only after the retained observables converge under the declared refinement path.
  - Do not replace arbitrarily large finite systems with an actual infinite medium unless the limit preserves the causal-root count, Jacobian floors, work-energy residuals, and thermodynamic summaries being claimed.

- State-dependent branch-transition discipline:
  - State-dependent delay systems can lose classical branch continuation at transition points where a delayed argument crosses a branch boundary, a causal-root count changes, or a derivative-sensitive row enters a fold-layer. A finite-$\eta$ run must therefore record how the regularized trajectory crosses each such window rather than treating the crossing as ordinary time-step noise.
  - For every declared transition window $I_*=[t_*-\Delta_*,t_*+\Delta_*]$, emit
    $$
    \mathcal{T}_{\eta,*}
    =
    \big(
    I_*,
    \mathcal{L}_{\mathrm{root}}|_{I_*},
    \mathsf{status}_{\eta,*},
    \mathsf{regularization}_{\eta,*},
    \mathsf{window\_scale}_{\eta,*},
    \mathcal{Y}_{\eta,*},
    \mathcal{E}_{\mathrm{trans},*}
    \big),
    $$
    where $\mathsf{status}_{\eta,*}$ is the candidate branch status, chosen from the existing simple-root, fold-layer, inactive-gap, or rejected statuses, $\mathsf{regularization}_{\eta,*}$ names the finite-$\eta$ route used through the window, $\mathsf{window\_scale}_{\eta,*}$ records the declared transition scaling, and $\mathcal{Y}_{\eta,*}$ is the set of observables promoted through that window.
  - For each promoted observable $Y\in\mathcal{Y}_{\eta,*}$, define
    $$
    E_{\mathrm{trans}}(Y;\eta,\eta/2;I_*)
    =
    \frac{\|R(Y_{\eta/2}|_{I_*})-Y_{\eta}|_{I_*}\|_{L^2(I_*,\{x_k\})}}
    {\|R(Y_{\eta/2}|_{I_*})\|_{L^2(I_*,\{x_k\})}+\varepsilon_0}.
    $$
  - The transition passes only if
    $$
    \mathsf{status}_{\eta,*}=\mathsf{status}_{\eta/2,*},
    \qquad
    E_{\mathrm{trans}}(Y;\eta,\eta/2;I_*)\le\tau_{\mathrm{trans},Y}
    \quad\text{for every }Y\in\mathcal{Y}_{\eta,*},
    $$
    and every root-ledger row in $I_*$ keeps source identity, branch class, and status metadata under the same matching rule used by $\Delta_{\eta,\mathrm{root}}$.
  - If the branch status flips under $\eta$ refinement, route the run to $\mathsf{branch\_root\_instability}$. If the status is stable but the promoted transition observables fail the tolerance, route it to $\mathsf{regulator\_dependence}$. If the transition record is missing, route it to $\mathsf{artifact\_incomplete}$.
  - For nonsmooth windows, the transition record must include jump-location rows
    $$
    \mathcal{D}_{\mathrm{jump}}
    =
    \{(\xi_a,k_a,\ell_a,\xi_{\pi(a)},R_{\mathrm{jump},a})\},
    \qquad
    R_{\mathrm{jump},a}
    =
    \frac{|t_{0,\ell_a}(\xi_a)-\xi_{\pi(a)}|}
    {\max(\Delta t,\Delta h,\eta/c_f,\varepsilon_0)}.
    $$
    Unstable jump identity routes to $\mathsf{branch\_root\_instability}$; unresolved jump or interpolation convergence routes to $\mathsf{mesh\_nonconvergence}$.

- Energetic consistency:
  - On resolved intervals, the work–energy relation holds with $\Phi_\eta$; as $\eta\to 0$, interval integrals converge to the impulsive model.

Plain language: The ideal model gives instantaneous kicks; a tiny thickening turns them into brief, smooth nudges so you can integrate with ordinary ODE solvers. Large-system or zero-width claims have to be earned by convergence, not assumed from the finite calculation.

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
\qquad \varepsilon_0=10^{-12}.
$$
Here $R$ is restriction of the finer run to the coarser sampling grid.

For provenance distributions of solved `t_emit`, define:
$$
D_W \equiv \frac{W_1(P_A,P_B)}{\mathrm{IQR}(P_B)+\varepsilon_0},
\qquad
D_{JS}\equiv \mathrm{JSD}(P_A\|P_B),
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
}.
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
{\max(\Delta t,\Delta h,\eta/c_f,\varepsilon_0)}.
$$

##### Required refinements with pass/fail thresholds

1. Temporal refinement ($\Delta t$ and $\Delta t/2$, plus $\Delta t/4$ for order check):
- Pass if $E_{\mathrm{rel}}(\Phi)\le 0.02$, $E_{\mathrm{rel}}(\|\nabla\Phi\|)\le 0.03$, and $|\Delta\lambda_{\text{self}}|/\lambda_{\text{self}}\le 0.05$.
- Estimated observed order:
$$
p_{\mathrm{obs}}(Y)=\log_2\!\frac{E_{\mathrm{rel}}(Y;\Delta t,\Delta t/2)}
{E_{\mathrm{rel}}(Y;\Delta t/2,\Delta t/4)}.
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

5. Continuum moment refinement when a run promotes a coarse PDE, kinetic moment, or Noether-Sea transport equation:
- Pass if the retained density/current channel satisfies
  $$
  E_{\mathrm{rel}}(R_{\rho}^{\mathrm{cg}})\le0.03,
  \qquad
  E_{\mathrm{rel}}(R_{P}^{\mathrm{cg}})\le0.05,
  \qquad
  E_{\mathrm{rel}}(R_E^{\mathrm{cg}})\le0.05.
  $$
- The moment-closure residual must decrease under temporal, history, and spatial refinement. A continuum plot is not promotion evidence if the next unresolved moment grows or if the memory-current residual is absorbed into fitted constants.

6. Stochastic and response refinement when a run adds Langevin, Fokker-Planck, or fluctuation-response summaries:
- For the first two moments of any declared distribution $P(z,t)$, require agreement with direct event-root ensembles:
  $$
  E_{\mathrm{rel}}(\langle z\rangle)\le0.03,
  \qquad
  E_{\mathrm{rel}}(\operatorname{Cov}(z))\le0.05.
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
  \max_i H_{ii}\le\frac{1}{2},
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
{\|R(Y_{\eta/2})\|_{L^2(W,\{x_k\})}+10^{-12}}.
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

This framework appears to fit a surprising breadth of phenomena not because of any single novelty, but because a small set of simple, mutually reinforcing structural decisions is doing most of the heavy lifting. Two widely discussed choices—reduction to two true primitives (±$\epsilon$ architrinos) and choosing $\epsilon$=|e/6|—help with parsimony and charge bookkeeping, but the outsized wins come from how delayed line-of-action action, Jacobian-weighted causal flux, and same-source causal-root branches conspire to produce stability, scale selection, and emergent “magnetic-like” behavior without ever invoking right-hand-rule cross products.

Historically, general relativity and quantum mechanics are extraordinarily successful as effective theories that summarize large classes of phenomena. We position this neoclassical, delayed line-of-action model as a simpler dynamical substrate whose coherent assemblies recover GR/QM-like phenomenology in appropriate coarse-grained, slow/weak, or phase-locked limits.

We work throughout in units with primitive wake speed $c_f=1$; per-hit accelerations are directed along $\hat{\mathbf{r}}$, weighted by the causal Jacobian, and superpose linearly.

---

#### Delayed Emission on Jacobian-Weighted Isochrons

- What we assume:
- Sources emit potential on expanding causal isochrons with surface density $\propto 1/r^2$, represented distributionally by $\delta(r-\tau)$ with $\tau = t - t_0$.
  - Each causal hit is directed along $\hat{\mathbf{r}}$ from the source history point to the receiver, with received magnitude weighted by the branch Jacobian.

- Why it matters:
  - Gauss-like behavior falls out immediately (1/r² on causal wake fronts).
  - Moving systems automatically generate tangential components in the receiver’s frame due to path-history geometry and causal-flux bunching: the “aim point” is in the past, and source motion enhances or suppresses active branches through the Jacobian. Orbital and vortex-like patterns emerge from delay, not from any B∝v×E construction.

- Consequence:
  - You can reproduce many “magnetic” phenomenologies (circulation, axial vortices, flux tubes) as kinematic consequences of delayed, Jacobian-weighted line-of-action pushes. There is no right-hand rule, no cross products, just geometry, flux weighting, and time delay.

---

#### Constant per-wavefront emission

- What we assume:
  - Emission cadence and per-wavefront amplitude are constant at the source.

- Why it matters:
  - Simplifies calibration and emphasizes that stability and scale selection arise from delay and self-interaction. Receiver motion influences instantaneous power via $\mathbf{F}\cdot\mathbf{v}$ through the radial component $v_r$, while source motion modulates the received force magnitude through the Jacobian.
  - With $\eta$-mollification ($\delta\to\delta_\eta$), you can define $\Phi_\eta$ and verify $\Delta E_k = -\,\Delta U$ on resolved intervals while still taking $\eta\to 0$ for sharp impulses.

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
  - Bookkeeping: with $\delta_\eta$ you can integrate numerically with standard ODE solvers; with $\delta$ you can reason about impulses and events. Both views agree in the $\eta\to 0$ limit for integrals over resolved intervals.

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
  - The architrino charge magnitude is $\epsilon$, so quark charges are integers of $\epsilon$.

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

#### Open questions (productive)

- Exact analytic forms for d0 and t0 in the symmetric binary with the canonical modulation.
- Rigorous conditions for uniqueness/multiplicity of causal roots in accelerated motion and their contribution to stability.
- Statistical mechanics of many-body wake structures: when and how do coherent, Lorentz-consistent effective cones emerge from moving-assembly deformation, clock/ruler retuning, and Noether-Sea response, and with what characteristic speed relative to the declared branch speed $c_\star$?

Plain language summary: Keep the hits radial, delay them in time, keep per-wavefront amplitude constant, and let fast movers run into their own wakes. From those four ideas, you get stable orbits, natural rulers and clocks, shielding that looks like inertia, and “magnetic-like” structures—all without any right-hand-rule magnetism.

---

#### Effective observables and states (quantum-like layer)

Premise: single-hit information is sparse. At an instant, a receiver learns only (i) the net magnitude of the push and (ii) an unoriented line of action through its current position. The $\mathbb{U}_{\text{now}}$ universe-state perspective can include the full source-tagged emission ledger as complete-state bookkeeping, but a local receiver or Physical Observer cannot infer that hidden ledger from a single hit.

- Emission ledger (microstate): the set of tuples {(t₀, s_j(t₀), v_j(t₀), q_j)} over all sources j that causally affect the receiver.
- Observational map: ledgers → histories of hits {A(t_k), L(t_k)} across one or more receivers and over time.
- Observational equivalence: two ledgers are equivalent if they induce indistinguishable hit histories at the chosen resolution (including mollifier width $\eta$, temporal sampling, and receiver geometry).

- Coarse-grained PDE observables (Method 1):
  - Number density $n(\mathbf{x}, t)$: count-per-volume of architrinos.
  - Charge density $\rho(\mathbf{x}, t)$: net $+\epsilon-\epsilon$ per unit volume; natural source term in continuum PDE variants.
  - Energy density $\mathcal{E}(\mathbf{x}, t)$: local kinetic + potential energy density for validation and conservation checks.
  - Use: these fields are the natural inputs/targets for grid-based PDE runs and for validating event-driven simulations in aggregate.

Observability axioms:
- A1 Single-hit observables are magnitude A and an unoriented line L; orientation along L, source identity, distance r, and emitter speed |v_em| are not individually observable at an instant.
- A2 All practical observables are functionals of hit histories across time and receivers; unique micro inversion is generically impossible.
- A3 An effective “state” is a probability measure over observationally equivalent ledger classes, updated as new hits arrive.

Bayesian operational stance:
- State update = conditioning on new hit histories; active interventions (changing receiver geometry/filters) alter future histories and thus the posterior over ledger classes.

Plain language: you never see the full book of who emitted what; you only see a time series of shove sizes and lines. So the right language is statistical over micro-histories that fit those shoves.

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

Even for a single source, the receiver cannot be sure that a given shove did not come from multiple distinct emission times $t_0 \in \mathcal{C}_{o'j}(t)$ on that same source. When $\lVert \mathbf{v}_j \rVert > 1$ or the source trajectory curves, several roots of $r = v(t - t_0)$ can occur and arrive in close succession along the same unoriented line of action, contributing separate per-hit pushes that are locally indistinguishable as to origin.

However, this is not the dominant practical difficulty. The governing issue is global superposition: at any instant the net field is the linear sum of contributions from all architrinos in the universe whose causal isochrons intersect the receiver “now.” While inverse-square surface dilution and Jacobian weighting usually make nearby sources dominate, the mapping from the universal emission ledger to observed hit histories remains vastly many-to-one. Consequently, inference must be temporal, statistical, and multi-view, not a frame-perfect instantaneous inversion.

---

#### Operational noncommutativity and contextuality (emergent)

Measurement procedures are interventions that condition future hit histories:
- Let F, G be experimental contexts (e.g., planar-mode analyzers, path blockers, timing gates). Because they modify trajectories and thus the set of future causal roots, their composition generally satisfies F∘G ≠ G∘F at the level of observed statistics.
- Contextuality: the distribution over ledger classes that best explains data depends on which filters were applied and in what order; the outcomes are context-dependent without invoking microscopic cross-product forces.

Plain language: changing what you do now changes which shoves you’ll see later; doing A then B is not the same as B then A.

---

#### Interference and amplitude-squared from planar-mode overlap

Linear superposition at the isochron level plus coherent geometry yields interference-like patterns in aggregates:
- Photon planar-mode ledgers from multiple sources add linearly at the effective-amplitude level; a detector that integrates over a small time window and area effectively accumulates a complex amplitude $A_{\mathrm{mode}}$ from coherent sub-bundles.
- Intensity emerges as an overlap norm proportional to $|A_{\mathrm{mode}}|^2$ under time/ensemble averaging of phase-like structure encoded by path histories.
- Polarization example (already used): Malus’s law arises as a geometric projection of a planar mode's transverse ledger onto an analyzer axis, giving $\cos^2\theta$ transmission without right-hand-rule magnetism.

Plain language: aligned planar-mode records add, misaligned ones cancel; the strength you record scales like the square of how well patterns line up.

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

Use it as the top orientation document before reading the more specialized simulation protocols, convergence checks, action-energy notes, the [$A_0$ branch certificate protocol](../../../../markdown/aaa/validation/simulations/a0-branch-certificate-protocol.md), the [$A_0$ Tier 0 result interpretation](../../../../markdown/aaa/validation/simulations/a0-tier0-result-interpretation.md), the [Nested Shell Swarm Action-Increment Protocol](../../../../markdown/aaa/validation/simulations/nested-shell-swarm-action-increment-protocol.md), the [Retuning-Map Toy Model](../../../../markdown/aaa/validation/simulations/retuning-map-toy-model.md), the [Cosmology Shared Residual Fit Protocol](../../../../markdown/aaa/validation/simulations/cosmology-shared-residual-fit.md), the [Redshift-Budget Toy Model](../../../../markdown/aaa/validation/simulations/redshift-budget-toy-model.md), the [Static Response Vector Toy Model](../../../../markdown/aaa/validation/simulations/static-response-vector-toy-model.md), and the [Hydrogen $\Gamma_N$ Spectral Coefficient Row Toy Scan](../../../../markdown/aaa/validation/simulations/hydrogen-gamma-n-spectral-row-toy-scan.md).

#### Simulation Frame: Virtual $\mathbb{U}_{\text{now}}$ Perspective

- All tiers are implemented in the absolute Euclidean frame (fixed x,y,z; absolute t).
- The simulator effectively plays the role of the $\mathbb{U}_{\text{now}}$ universe-state perspective by integrating the master equation and maintaining S(t).
- Raw outputs are $\mathbb{U}_{\text{now}}$-style (fields, provenance, microstate summaries).
- “What experiments see” is generated by post-processing: embed detector assemblies with worldlines X_det(t), compute $\tau$_det(t), and generate detector-like logs.

Checklist per tier:
- What $\mathbb{U}_{\text{now}}$ records ($\Phi$, $\nabla\Phi$, Noether-Sea variables, provenance)
- How to compute physical observables ($\tau$, redshift, lensing proxies, GW strain proxies)
- Convergence requirements for each output type
- For the first mass-map target, how the $A_0$ Tier 0/Tier 1 branch certificate is separated from later energy, shielding, and Noether-Sea response interpretation
- For Tier 0 rows, how active roots, raw roots, excluded near-zero self roots, residual semantics, and promotion gates should be read before any Tier 1 continuation

##### Simulation Frame and the $\mathbb{U}_{\text{now}}$ universe-state perspective

All simulation tiers are implemented in the absolute frame:

- **Spatial frame:** fixed Cartesian grid in the Euclidean void, $(x,y,z)$ constant in time.
- **Temporal frame:** global absolute time $t$, advanced in discrete steps $\Delta t$.
- **Microdynamics:** architrino positions and velocities updated according to the master equation; potentials propagated at speed $c_f$.

From the code’s perspective, we are always the **$\mathbb{U}_{\text{now}}$ universe-state perspective**:

- We know $S(t)$ (all architrinos, all assemblies) at each time step.
- We can compute fields and Noether-Sea state anywhere in the domain.

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
4. **Noether Sea Initialization**: Low-excitation Noether-Sea runs must pre-populate the grid with a lattice of coupled pro/anti Noether swarms to simulate Noether-Sea influence on test particles.
5. **Convergence**: $\Delta t$ refinement must be accompanied by "History Resolution" refinement to ensure self-hit calculations are numerically stable.
6. **Campaign Packet**: Any run used for a proof certificate, branch-certificate gate, or promoted validation claim must emit a machine-checkable packet rather than only plots or summaries.

#### $A_0$ Branch-Certificate Protocol

The first mass-map target has a specialized protocol in [$A_0$ Branch Certificate Protocol](../../../../markdown/aaa/validation/simulations/a0-branch-certificate-protocol.md), with Tier 0 row semantics summarized in [$A_0$ Tier 0 Result Interpretation](../../../../markdown/aaa/validation/simulations/a0-tier0-result-interpretation.md). That protocol separates four stages:

1. Tier 0 algebraic branch search for finite root-ledger candidates.
2. Tier 1 $\eta>0$ delayed-dynamics continuation and Floquet diagnostics.
3. Tier 2 internal-energy and shielding extraction.
4. Tier 3 Noether-Sea response tensor probes.

A rerun after a finite-coordinate no-go must include the predeclared branch-chart revision record; residual-selected coordinates, locked keys promoted into branch geometry, or benchmark-derived inputs invalidate the packet as hidden fitting.

No simulation run should report $\zeta(A_0)$, $E_{\text{internal}}(A_0)$, or $\mathcal{M}_{\text{sea}}^{ab}$ as accepted outputs unless the preceding branch-certificate gates have passed.

#### Cosmology Shared-Residual Protocol

The first cosmology-facing validation scaffold is [Cosmology Shared Residual Fit Protocol](../../../../markdown/aaa/validation/simulations/cosmology-shared-residual-fit.md). It specializes the campaign-packet rule to the shared dark-energy and cosmology calibration gate. The packet tests whether SN, BAO, CMB, weak-lensing, redshift-space-distortion, BBN, and pre-BBN branch residuals can consume one $\theta_{\mathrm{sea}}$ without per-observable retuning.

No cosmology packet should report a promoted dark-energy, $H_0$, $S_8$, BBN, CMB, or growth closure unless its ordinary residuals and cross-family projection penalty are both inside declared tolerances.

#### Public Gravitational-Wave Benchmark Protocol

A public gravitational-wave benchmark packet tests the effective gravitational-radiation limit against versioned open strain and parameter-estimation records. The packet is not evidence for a fundamental metric ripple in the Euclidean void. It is an observer-level validation object: the $\mathbb{A}\mathbb{A}\mathbb{A}$ simulation must predict detector strain, phase, event-ledger energy balance, and any photon/gravity timing residual through its Noether-Sea response map and then compare those predictions to public artifacts.

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
\big).
$$
Here $\mathcal{D}$ names the detectors, $\mathcal{S}_h$ names the strain files, $\mathcal{P}_{\mathrm{PE}}$ names posterior-sample and parameter-estimation records, $\mathcal{P}_{\mathrm{wave}}$ names the waveform-family or numerical-relativity provenance, $\mathcal{Q}_{\mathrm{det}}$ carries calibration, data-quality, injection-mask, down-sampling, and glitch-treatment records, $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ is the event conservation ledger, $\mathcal{R}_{\mathrm{GW}}$ is the residual vector, and $\Pi_{\mathrm{wave}}$ maps each fitted or plotted sample back to public artifacts.

The residual vector is
$$
\mathcal{R}_{\mathrm{GW}}
=
\big(
R_h,R_\phi,R_E,R_J,R_{c_g},R_{\mathrm{det}},R_{\mathrm{PE}},R_{\mathrm{prov}}
\big).
$$
$R_h$ compares whitened or otherwise declared detector strain on the predeclared analysis window; $R_\phi$ compares unwrapped inspiral-merger phase on the declared frequency band; $R_E$ checks source masses, remnant mass, radiated energy, recoil, ejecta or heat-channel terms, and boundary exchange in one conservation ledger; $R_J$ checks angular-momentum accounting when the packet claims spin or recoil closure; $R_{c_g}$ is used only for multimessenger timing rows; and the final three residuals are provenance-completeness checks.

For a multimessenger row,
$$
R_{c_g}
=
\frac{\Delta t_{\mathrm{obs}}-\Delta t_{\mathrm{src}}}{D_L/c_\gamma},
\qquad
\Delta t_{\mathrm{obs}}=t_\gamma-t_{\mathrm{GW}}.
$$
The intrinsic source-emission delay $\Delta t_{\mathrm{src}}$ must be declared before fitting the gravity-channel speed. A packet fails as hidden tuning if it absorbs photon/gravity timing into an undeclared source delay, changes the analysis band after inspecting residuals, substitutes a cleaned strain product without recording a new provenance row, or changes waveform family after comparing to the data.

The minimum artifact list is `event.json`, `strain_files.json`, `detector_quality.json`, `parameter_estimation.json`, `waveform_provenance.json`, `analysis_window.json`, `strain_residuals.csv`, `phase_residuals.csv`, `energy_ledger.csv`, `speed_residual.json` when applicable, `artifact_hashes.json`, and `failure_report.md`. For long binary-neutron-star inspirals the packet must also include a glitch/cleaning row, a low-frequency cutoff row, and a reason if any detector is excluded from a visible-strain comparison. For short binary-black-hole benchmarks the packet must include an inspiral-merger-ringdown window, detector arrival-time comparison, and ringdown handoff row.

#### Tier 0 / Tier 1 Campaign Packet

Tier 0 and Tier 1 results are accepted only through an auditable campaign packet. The packet must include the source commit, pre-run tolerances, root ledger, branch residual vector, convergence table, $\eta$ ladder when a regulator claim is made, declared history interpolation, failure report, and artifact hashes. When a run crosses a fold-layer, separator, or active-root status transition, the packet must also include transition records for that window.

The minimum Tier 0 packet contains `campaign.json`, `mesh.json`, `state_vector.json`, `root_ledger.json`, `branch_residuals.json`, `candidate_rows.csv`, `failure_codes.md`, and `promotion_gate.md`. The minimum Tier 1 packet adds `run_metadata.json`, $\mathbb{U}_{\text{now}}$ provenance data, `history_interpolation.json`, `convergence_table.csv`, `eta_ladder.csv`, `conservation_ledger.csv`, `cross_integrator_report.md`, `negative_control_report.md`, `failure_report.md`, and `promotion_lemma_check.md`. If a Tier 1 run claims a branch transition, it also emits `transition_records.json` with the status, regularization route, transition-window scale, root-ledger rows, and promoted observables for each transition window.

The `cross_integrator_report.md` artifact must name the solver family, delayed interpolation polynomial or reconstruction rule, nonlinear solve residuals when implicit stages are used, small-delay or vanishing-delay encounters, and event or restart handling. Cross-integrator agreement is evidence only when the branch identity and transition records match, not merely when plotted observables are close.

A Tier 1 packet supports a proof or validation claim only when the branch residuals, convergence checks, provenance checks, conservation checks, regulator-dependence checks, and negative control all pass with tolerances declared before the run. If any promoted scalar, root count, branch label, stability gap, or tolerance is selected after inspecting output, the packet fails as hidden tuning.

#### Run Protocol: Absolute-Frame + $\mathbb{U}_{\text{now}}$ Logging

##### Absolute frame rule
All simulations integrate dynamics in the absolute Euclidean frame:
- Fixed Cartesian coordinates (x,y,z) in a chosen scaffold representing the Euclidean void
- Global absolute time $t$ with step $\Delta t$
- No relativistic time dilation applied to the integration clock (proper time is derived only in post-processing)

##### Void and Noether-Sea Terminology (Simulation-Facing)
- "Euclidean void" = the fixed spatial container represented by the chosen coordinate chart / grid indices
- "Noether Sea" = coupled pro/anti swarms instantiated as objects or response variables in the void

##### Mandatory $\mathbb{U}_{\text{now}}$ universe-state perspective ($\mathbb{U}_{\text{now}}$) grid
Every run must instantiate $\mathbb{U}_{\text{now}}$ sensors:
- $\mathbb{U}_{\text{now}}$ grid definition: chart points/worldlines, spacing, bounds, boundary conditions
- Logged channels (minimum): $\Phi$, $\nabla\Phi$
- Optional: Noether-Sea state variables (for example, $\rho_{\text{NS}}$ and alignment metrics)
- Provenance tables: `receiver_id`, $t$, `emitter_id`, $t_{\text{emit}}$, `contribution_strength` when feasible

##### Causal wake surface bookkeeping requirement
When a potential wake surface intersects a $\mathbb{U}_{\text{now}}$ sensor or contributes to $\Phi(x,t)$, the code must:
- Solve for emission time $t_{\text{emit}}$ using $\lVert x - x_{\text{emitter}}(t_{\text{emit}})\rVert = c_f (t - t_{\text{emit}})$
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

1. **Grid Initialization**: All simulations run on a rigid Cartesian grid chosen as the coordinate scaffold for the **Euclidean void**. The grid is pre-loaded with a lattice of coupled Noether swarms to instantiate the Noether Sea.
2. **Fiducial Sensor Array**: Instantiate a grid of virtual sensors at fixed chart locations $(x,y,z)$. Each records $\Phi$ and $\nabla\Phi$.
3. **Causal Time Lookup**: When a causal isochron intersects a sensor, the simulator uses the grid history to "look back" to the emitter's position at $t_{history}$.
4. **Logging Standard**: All runs must log $\mathbb{U}_{\text{now}}$ channels ($\Phi$, $\nabla\Phi$, provenance tables) to allow cross-run convergence auditing.

##### $\mathbb{U}_{\text{now}}$ universe-state perspective Grid

* **Grid:** Initialize rigid Cartesian `Grid[x][y][z]` as the chosen chart for the Euclidean void.
* **Sea Initialization:** Pre-load the grid with coupled Noether swarms for low-excitation Noether-Sea runs.
* **Logging:** Record $\Phi$ and $\nabla\Phi$ at fixed nodes ($\mathbb{U}_{\text{now}}$ universe-state sensors).
* **Time:** Global step $\Delta t$ (absolute time).

### A0 Branch Certificate Protocol

This protocol defines the simulation-facing handoff for the $A_0$ reference attractor described in [Particle Masses](../../../../markdown/aaa/assemblies/particle-masses.md#reference-attractor-gate), [Nested Shell Swarm Dynamics](../../../../markdown/aaa/noether-swarm/nested-shell-swarm-dynamics.md), and [Energy](../../../../markdown/aaa/dynamics/energy.md). It specializes the general [Simulation Run Protocols](../../../../markdown/aaa/validation/simulations/run-protocols.md) to the first neutral rest-branch nested shell swarm mass-map target.

The protocol does not treat $A_0$ as a particle label. It treats $A_0$ as a calibration-free branch certificate problem: find a finite, stable, multi-scale causal-root ledger before energy, shielding, Noether-Sea response, or mass comparisons enter.

#### Master-Equation Handoff Boundary

If a run consumes a master-equation branch-chart object $\mathfrak{B}(\Gamma,\mathcal{S};h,\eta,\epsilon_c)$, the consumed data must remain branch-certificate data: active roots, inactive gaps, Jacobian floor, memory depth, returned-section residual, section stability, and the refinement schedule that preserves the same branch identity. These fields may support Tier 0 and Tier 1 certification only.

The same packet must keep downstream extraction fields separate. `energy_ledger`, `far_field_shielding`, `medium_response`, and `mass_summary` remain not-computed until their tiers pass. A run fails the handoff if $\zeta(A_0)$, $\mathcal{L}_{\text{aniso}}$, or $\mathcal{M}_{\text{sea}}^{ab}$ changes under root-ledger refinement, inactive-gap refinement, history-window extension, or controlled $\eta$ refinement while the branch label and quotient row are claimed to be unchanged.

#### Certificate Packet Schema

An auditable $A_0$ branch certificate should preserve one top-level packet shape across all tiers. Fields that are not computed at a given tier must remain present with an explicit status, role, and note rather than disappearing from the packet.

| Field | Required content | Promotion role |
| --- | --- | --- |
| `metadata` | run identifier, code or derivation version, source commit, integrator, tolerances, $\eta$, sampling schedule, and history-window rule | makes the packet reproducible |
| `sea_cell` | $u^i_{\text{sea}}$, $G_{\text{grad}}$, $n$, $\chi_{\text{sea}}$, declared $c_\star$, and boundary conditions | fixes the homogeneous Noether-Sea cell and prevents mixing $c_f$ with $c_{\text{eff}}$ |
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
| `medium_response` | acceleration probes, gradient probes, extracted $\mathcal{M}_{\text{sea}}^{ab}$ baseline, symmetric tensor part, antisymmetric residue, and response anisotropy | compatibility field for testing Noether-Sea inertial and gravitational response after shielding passes |
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
\right).
$$
Tier 0 may compute only part of this surface. The row must still emit every component. Missing later-tier components use explicit `not_computed_in_tier0` status, null value, null tolerance when no tolerance exists yet, a promotion role, and a note that names the tier responsible for computing the entry.

The group-velocity anisotropy entry uses the reduced centered covariance of the six-worldline state. With
$$
\mathbf{C}_{A_0}(t)=\frac{1}{6}\sum_{a\in A_0}\mathbf{s}_a(t),
$$
define
$$
D^{ij}_{A_0}(\mathbf{V}_{\text{cm}})
=
\left\langle
\sum_{a\in A_0}
\left(s_a^i-C_{A_0}^i\right)
\left(s_a^j-C_{A_0}^j\right)
\right\rangle_{T_{\mathbf{k}}},
$$
$$
Q^{ij}_{A_0}
=
\frac{D^{ij}_{A_0}}{h_{mn}D^{mn}_{A_0}},
\qquad
\mathcal{A}_{\mathrm{gv}}^{ij}
=
Q^{ij}_{A_0}-\frac{1}{3}h^{ij}.
$$
This tensor measures motion-induced or probe-induced Noether swarm deformation. It is not the same object as the far-field leakage residue $\mathcal{L}_{\text{aniso}}$, which is extracted from cycle-averaged wake coefficients in Tier 2.

#### Tier 0: Algebraic Branch Search

Tier 0 is a reduced branch-search pass. It samples diagnostic carrier charts, solves delayed root equations on those charts, classifies internal terms, and emits candidate rows. It does not claim a physical attractor.

Required inputs:

- homogeneous Noether-Sea cell with $u^i_{\text{sea}}=0$, $G_{\text{grad}}=0$, $n=1$, $\chi_{\text{sea}}=1$, and primitive wake speed $c_f$;
- layer labels $\ell\in\{I,M,O\}$ and polarity labels $\sigma\in\{+,-\}$;
- scale ratios $\varepsilon_{IM}=R_I/R_M$ and $\varepsilon_{MO}=R_M/R_O$;
- speed offsets enforcing $s_I > c_f$, $s_M \approx c_f$, and $s_O < c_f$;
- candidate handedness tuple and carrier ellipticity;
- $\eta>0$, sampling resolution, and history-window rule.

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

Such a root may not count as self-hit closure unless a later regularized fold-layer model explicitly accepts it with a named branch condition, tolerance, and promotion rule. Until that model exists, near-zero self roots block Tier 0 promotion rather than satisfying the self-hit branch requirement.

The reader-facing interpretation of these rows is in [$A_0$ Tier 0 Result Interpretation](../../../../markdown/aaa/validation/simulations/a0-tier0-result-interpretation.md).

#### Tier 1: $\eta>0$ Continuation

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

The Tier 1 handoff scaffold is `scripts/mass-map/a0-tier1-continuation-scaffold.mjs`. It consumes Tier 0 JSON rows and emits the $\eta>0$ continuation contract, reduced-coordinate chart, symmetry-quotiented monodromy plan, $\Delta_{\mathbf{k}}$ acceptance boundary, and required output artifact list. It is not a delayed-dynamics solver and cannot certify the branch without a later Tier 1 run.

The companion audit is `scripts/audit-a0-mass-map-promotion.mjs`. It scans AAA and mass-map priority prose for premature statements that treat $\zeta(A_0)$, $E_{\text{internal}}(A_0)$, or $\mathcal{M}_{\text{sea}}^{ab}$ as accepted before the Tier gates pass.

#### Acceptance Boundary

The $A_0$ branch is not an attractor until Tier 1 passes. It is not a mass-map result until Tier 2 passes. It is not an inertial-response result until Tier 3 passes. A reported group-velocity anisotropy tensor is a deformation diagnostic, not a shielding extraction and not a substitute for the Noether-Sea response probe.

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
  - Optional local Noether-Sea state variables (e.g., $\rho_{\text{NS}}$, alignment/orientation metrics)
  - Causal wake surface provenance/event tags: for each received contribution at $(x_k,t)$, record `emitter_id` together with $t_{\text{emit}}$, satisfying $\lVert x_k - x_{\text{emitter}}(t_{\text{emit}})\rVert = c_f (t - t_{\text{emit}})$
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

##### Mapping: $\mathbb{U}_{\text{now}}$ data → Physical observables
Synthetic observables must be generated by post-processing $\mathbb{U}_{\text{now}}$ logs with a model of a *physical* observer (assembly clock/detector):
1. Extract local Noether-Sea state along detector worldline $X_{\text{det}}(t)$
2. Compute proper time $\tau_{\text{det}}$ via $d\tau = F(\text{Noether-Sea state}, v_{\text{det}}, \Phi, \nabla\Phi, \dots)\,dt$ (from proper-time-derivation.md)
3) Generate detector-like outputs:
   - clock readings $\tau(t)$
   - photon arrival times and frequency shifts
   - inferred "geodesics" (effective paths) from travel-time minimization through the Noether-Sea effective signal speed $c_{\text{eff}}$

##### Validation checks (must pass)
- **Causality residual (per record $m$):**
  $$
  \rho_m \equiv
  \frac{\left|\|x_k-x_{i_m}(t_{\text{emit},m})\|-c_f\,(t_m-t_{\text{emit},m})\right|}
  {\max(c_f\Delta t,\varepsilon_r)},
  \qquad \varepsilon_r=10^{-12}.
  $$
  Pass if at least $99.9\%$ of records satisfy $\rho_m\le 10^{-2}$ and
  $\max_m \rho_m \le 5\times 10^{-2}$.

- **Temporal ordering check:**
  $$
  \theta_m \equiv \frac{t_{\text{emit},m}-t_m}{\Delta t}.
  $$
  Pass if fraction with $\theta_m>10^{-9}$ is $\le 10^{-6}$.

- **Cross-integrator invariance:**
  For any channel $Y$ use
  $$
  E_{\mathrm{rel}}(Y;A,B)\equiv
  \frac{\|R(Y_B)-Y_A\|_{L^2}}{\|R(Y_B)\|_{L^2}+10^{-12}}.
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
  {\oint_{\partial S}\left|\mathbf{Y}_\eta\!\cdot d\mathbf{x}\right|+\int_S\left|(\nabla\times\mathbf{Y}_\eta)\!\cdot\!\hat{\mathbf{n}}\right|\,dS+10^{-12}}.
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
  {|q_m|+10^{-12}}.
  $$
  Pass if at least $99.9\%$ of emitted wake surfaces satisfy $R_{N,m}\le 10^{-2}$ and the maximum resolved-window residual is $\le 5\times10^{-2}$.

- **Operator consistency across PDE and event-root runs:** after resampling the event-root reconstruction onto the PDE grid, define
  $$
  \Delta\mathbf{Y}_\eta\equiv
  \mathbf{Y}^{\mathrm{PDE}}_\eta-R(\mathbf{Y}^{\mathrm{root}}_\eta),
  \qquad
  E_{\mathrm{op}}(V,S,t)\equiv
  \max\!\left\{R_G[V,t;\Delta\mathbf{Y}_\eta],\,R_S[S,t;\Delta\mathbf{Y}_\eta]\right\}.
  $$
  Pass if $E_{\mathrm{op}}\le0.03$ on the declared validation windows and decreases under temporal/history/spatial refinement.

- **Curvilinear-coordinate hygiene:** finite-window residuals must use the coordinate weights and operator formulas of the declared Euclidean scaffold. In spherical coordinates $(r,\theta,\varphi)$,
  $$
  w_V=r^2\sin\theta\,\Delta r\,\Delta\theta\,\Delta\varphi,\qquad
  w_{S_R}=R^2\sin\theta\,\Delta\theta\,\Delta\varphi,
  $$
  and a radial channel must evaluate $\nabla\!\cdot(F_r\hat{\mathbf{r}})$ as
  $$
  \frac{1}{r^2}\frac{\partial}{\partial r}\!\left(r^2F_r\right),
  $$
  not as $\partial_rF_r$. Fail the run if the coordinate scaffold does not declare these weights.

- **Provenance distribution agreement:** for `t_emit` distributions, require
  $$
  D_W \equiv \frac{W_1(P_A,P_B)}{\mathrm{IQR}(P_B)+10^{-12}} \le 0.08,
  \qquad
  D_{JS}\equiv \mathrm{JSD}(P_A\|P_B)\le 0.03.
  $$

- **Kinetic-moment closure:** for any promoted continuum observable, compute the direct event-root moments
  $$
  \rho_{\mathrm{dir}},\quad
  \mathbf{j}_{\mathrm{dir}},\quad
  \Pi_{\mathrm{dir}}^{ij},\quad
  \mathbf{J}_{e,\mathrm{dir}},
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
  },
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
  \frac{\langle\Delta z^a\Delta z^b\rangle_z}{2\Delta t}.
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
  R_{\mathrm{rd}}^a,
  $$
  the packet must report the fixed points, the linearized growth matrix, the unstable wavenumber band if one exists, and the front-speed estimate if a traveling-front claim is made. For two-channel pattern claims, the Turing-style gate is that the homogeneous fixed point is stable before diffusion and that the diffusion-shifted linear operator has a declared finite unstable band. Without those rows, visual pattern formation is not a validated synthetic observable.

- **Jet/outflow head and radiation probes:** when a simulation claims an astrophysical jet, outflow, knot chain, or working surface, the synthetic packet must compare the logged event-root dynamics to the observer-level jet-head and radiation benchmarks. For a supersonic head with jet speed $v_j$, beam radius $R_j$, head radius $R_h$, density ratio $\eta_j=\rho_j/\rho_a$, and $a_h=(R_j/R_h)^2$, the bow-shock speed target is
  $$
  v_{\mathrm{bs,std}}
  =
  v_j
  \left[
  1+(\eta_j a_h)^{-1/2}
  \right]^{-1}.
  $$
  The head residual is
  $$
  R_{\mathrm{head}}
  =
  \left|
  \frac{v_{\mathrm{bs,map}}}{v_{\mathrm{bs,std}}}
  -1
  \right|.
  $$
  For radiative shocks, also report
  $$
  \mathcal{R}_{\mathrm{cool}}
  =
  \frac{t_{\mathrm{cool}}}{t_{\mathrm{dyn}}},
  \qquad
  t_{\mathrm{dyn}}\sim\frac{\ell_j}{v_j},
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

### Unsolved Problems

This note collects the main open simulation-side questions that remain after the current protocols and diagnostics are in place. Its purpose is to keep the unresolved strong-field and Planck-scale issues visible without pretending they are already part of the validated stack.

#### Planck-Scale Framing

- Clarify how **event-horizon alignment conditions** (nested shell swarm coplanarity/co-linearity at $v=c_f$) map to conventional Planck units.
- Identify observables that distinguish **alignment-driven strong-field effects** from inner-binary maximal-curvature dynamics.
- Specify which parameters control alignment onset (Noether-Sea density, compression, external field gradients).

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

The largest corpus-side improvement is the Noether swarm taxonomy. The corpus now separates the broad neutral swarm, shell swarm, and nested shell swarm cases; treats exact binaries as a proof assumption rather than a naming axiom; and routes dynamic exclusion-envelope geometry into a dedicated nested shell swarm geometry chapter. That chapter adds a computable assembly/Noether-Sea interface diagnostic,

$$
D_{a,X}(\mathbf{x},t)
=
\frac{
\left\lVert\mathcal{W}_{a,X}^{\mathrm{locked}}(\mathbf{x},t)\right\rVert
}{
\left\lVert\mathcal{W}_{a,X}^{\mathrm{locked}}(\mathbf{x},t)\right\rVert
+
\left\lVert\mathcal{W}_{\mathrm{sea},X}^{\mathrm{ambient}}(\mathbf{x},t)\right\rVert
},
$$

with locked and ambient contributions built from the same causal-root kernel, Jacobian floors, branch records, channel projections, and ledger-derived tolerance scales. This justifies raising Axiom+Notation, Cross-Regime Bridge, Internal Constituent Dynamics, and Coverage+Interface Readiness, while keeping the claim below full closure because the interface diagnostic is still a recovery target rather than a validated medium-response theorem.

The Noether-Sea branch embedding also improves the master-equation bridge. Local assembly branches are now stated as retained branches inside a surrounding Noether-Sea and nearby-assembly record:

$$
\mathcal{R}_{\mathrm{branch}}
\left(
B;\Theta_{\mathrm{sea}},\Theta_{\mathrm{asm}},\mathcal{H}_{\partial\Omega}
\right)=0,
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
F_{i,\partial\Omega}.
$$

This is a concrete mathematical advance because it prevents isolated seed charts from being read as physical branch closure unless Noether-Sea, assembly, and boundary residuals are statused. It supports modest increases in Master EOM+Local Dynamics, Potential+Action Closure, Conservation+Invariant Closure, Parameter+Scale Closure, and UV/IR+Regularization Completion.

Executable neutral-swarm diagnostics add negative evidence and sharper first-failure semantics. The current sampled octahedral root-ledger diagnostic passes the all-pairs sampled root/Jacobian screen, while the rigid zero-offset fixed-speed row is rejected by a nonzero tangential residual witness and an ordinary same-source positive-delay no-go. These artifacts improve falsification readiness and empirical/simulation discipline because they report `not_retained` rather than converting a failed seed into branch evidence. The score increase is deliberately small because sampled diagnostics, no-go witnesses for one rigid seed, and finite-mode search schemas do not yet replace an interval-certified all-pairs root ledger, action/Noether row, event ledger, stability certificate, or observer-export recovery.

The total remains far below modern operational closure for the same reason as May 20. The theory stack has stronger taxonomy, residual surfaces, and fail-closed diagnostics, but not the decisive retained branch. Until a single native record supplies $E_{\text{internal}}(A_0)$, $\zeta(A_0)$, $\mathcal{M}_{\text{sea}}^{ab}$, Lorentz/PPN recovery, photon-channel recovery, quantum source measures, Standard Model mapping coefficients, and shared cosmology fits, architecture and auditability must not inflate the validated-closure total.

### 2026-05-20 Assessment Notes

The 2026-05-20 assessment raises the weighted $\mathbb{A}\mathbb{A}\mathbb{A}$ score from `55` to `59`. The gain is real but deliberately limited: May 20 work moved several live areas from vague obligation to exact certificate, residual, no-go, or fail-closed form, while leaving the decisive coefficient and benchmark recoveries open.

The largest gains are in Master EOM+Local Dynamics, Potential+Action Closure, Conservation+Invariant Closure, Falsification Gates, and Cross-Regime Bridge. The master-equation stack now has the normalized delayed-interior characteristic-tail kernel, receiver-gradient cancellation, and wake-history energy/momentum/angular-momentum increments in corpus prose. The spiral program has a retained A1 tangential-pass/radial-blocked benchmark, a VP-1 outward tangential-drive failure, and an explicit force-ratio obstruction showing that $\Gamma=b_\ast^2c_f^2r_\ast/(\kappa q_1^2)$ is not fixed by the branch kinematics alone. The proof-program ledger also now records accepted fold constants, multiple parent-complement rejection routes, and a fresh fold-adapted collocation target rather than treating the failed cosine packet as an ambiguous near miss.

Formula, parameter, and empirical scores rise only modestly. The $A_0$ mass-map work now has a compact finite-coordinate no-go, a branch-chart revision contract, fail-closed anti-overfit checks, energy/shielding and medium-response handoffs, and normalized $\alpha_m$ mass-map notation across the corpus. Angular-momentum work has populated symbolic certificate instances, spinor return-table controls, photon Gate B substrate residuals, Stern-Gerlach-like diagnostics, and Bell handoff packets. These are stronger mathematical objects, but they are still blocked on retained branch-chart rows, native photon Gate A branches, event ledgers, apparatus models, or accepted source measures.

The total remains far below modern operational closure because no first accepted $A_0$ branch exists; $\zeta(A_0)$, $E_{\text{internal}}(A_0)$, $\mathcal{M}_{\text{sea}}^{ab}$, Lorentz / PPN coefficients, photon-channel coefficients, Born/Bell measures, weak mixing, Standard Model mass formulas, and cosmological residual fits are still not recovered from one accepted native record. May 20 improves closure pressure by making failures and next certificates sharper, not by passing the central benchmark rows.

### 2026-05-19 Assessment Notes

The 2026-05-19 assessment records a weighted $\mathbb{A}\mathbb{A}\mathbb{A}$ score of `55`. The gain is broad but still pre-closure: the corpus now carries more explicit proof scaffolds, branch-certificate packet schemas, CODATA benchmark discipline, Standard Model mapping targets, quantum record-measure residuals, and shared cosmology residual gates. These changes improve mathematical auditability and executable validation readiness, but they do not yet close the first accepted branch, derive the central constants, or pass precision benchmark rows.

The largest score changes come from the proof and validation surfaces. The collinear-breather and Master EOM material now contain stronger dual-mollified branch-chart, finite-certificate, fold-layer, impulse-bound, continuity, and self-map structures. The $A_0$ branch-certificate protocol and run protocols now specify machine-checkable residual vectors, gate semantics, artifact lists, hidden-tuning failures, and promotion boundaries. These additions justify higher scores for Master EOM+Local Dynamics, Potential+Action Closure, UV/IR+Regularization Completion, Falsification Gates, and Empirical Precision+Benchmark Validation.

Formula, parameter, and cross-regime scores also rise because the corpus now separates exact SI conventions from adjusted CODATA benchmark rows, states the high-pressure roles of $\alpha$, $m_p/m_e$, $R_\infty$, particle masses, and $G$, and gives the hydrogen $\Gamma_N$ spectral row an executable shared-row scaffold rather than a per-line fit. The electroweak, weak-mixing, CKM/PMNS, Higgs, mass-map, Noether-Sea, and cosmology files now expose more of the required shared-record structure across particle, atomic, gravitational, thermodynamic, and cosmological regimes.

The total remains far below modern operational closure because the decisive derivations are still open. The first certified $A_0$ branch has not passed; $\zeta(A_0)$, $E_{\text{internal}}(A_0)$, and $\mathcal{M}_{\text{sea}}^{ab}$ are not accepted outputs; Lorentz, PPN, redshift, and photon-channel coefficients still lack one accepted Noether-Sea constitutive map; Born/Bell closure still has negative controls and measure targets rather than a positive pair-provenance theorem; Standard Model mixing and mass formulas remain shared-record theorem targets; and cosmology has a shared residual scaffold but not a fit to SN, BAO, CMB, growth, BBN, and pre-BBN rows with one $\theta_{\mathrm{sea}}$.

### 2026-05-16 Assessment Notes

The 2026-05-16 assessment is rescored under the validated-closure lens. The previous $\mathbb{A}\mathbb{A}\mathbb{A}$ columns were removed because they used a softer equal-weight closure lens that allowed architecture, coverage, and auditability to dominate the total.

$\mathbb{A}\mathbb{A}\mathbb{A}$ still scores very high in Theory Architecture+Ontic Logic because the corpus has a coherent substrate-first architecture, explicit causal-wake ontology, delayed Master Equation of Motion, Noether-Sea bridge program, and strong cross-document logic. That score is intentionally preserved rather than diluted.

The total is much lower because the central tested-physics closures remain open. The first certified $A_0$ branch is still absent, $\zeta(A)$ and $E_{\text{internal}}(A)$ are not extracted for a mass map, Lorentz and PPN coefficients are not yet derived from accepted attractors, Born-rule and Bell closure remain source-measure targets, weak `V-A` and CKM/PMNS quantitative closure are open, cosmology lacks an empirical shared-state fit, and UV/IR completion still depends on terminal-alignment, singularity, horizon-entropy, and effective-GR recovery proofs.

Modern physics now scores higher in the operational column because the revised lens rewards validated mathematical closure: GR, QFT, QED, QCD, the Standard Model, and LCDM-era phenomenology carry many precise equations, coefficients, and benchmark tests. Its mechanism/foundational score remains lower because the inherited stack does not supply a single ontic mechanism for quantum measurement, gauge/matter origin, gravity/quantum unification, parameter values, or cosmological initial conditions.
