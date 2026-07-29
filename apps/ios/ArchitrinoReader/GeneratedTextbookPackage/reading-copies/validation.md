# Validation

## Validation Protocols

Validation is the accountability layer of $\mathbb{A}\mathbb{A}\mathbb{A}$. It states which observer-level records the theory must recover, which native histories may support those records, and which failures reject a branch or the theory. A visual resemblance, a deterministic replay, or agreement between two implementations of the same rule is not enough: a correctness claim needs an independent closed form, theorem, analytically known case, or separately authored instrument.

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
11. [Closure Scorecard](../../../../markdown/aaa/validation/closure-scorecard.md) summarizes accepted closure only; candidate, diagnostic, and fixture-level progress does not raise the score.

This map is normative for reading order, not a substitute for the owning documents. Each parameter, tuple, residual, gate, and failure code should be defined by one owner and cited elsewhere.

### Promotion Standard

A validation claim is promotable only when all of the following are tied to one declared record:

- the native worldline and causal-root provenance needed to reproduce the result;
- the observer map that turns native quantities into the tested observable;
- tolerances fixed before the run;
- convergence under the relevant temporal, history, regulator, and spatial refinements;
- an independent correctness reference when correctness is claimed;
- a negative control that fails for the intended reason;
- an explicit failure code when any required entry is absent or unstable.

Cross-integrator agreement is implementation-parity evidence. A replay of a saved record proves deterministic reproduction. Neither is an independent oracle for the mathematical rule being implemented.

### Preferred-Frame Leakage as One Protocol Family

The absolute-frame question is one important family inside the broader validation chapter. The substrate uses absolute time and the Euclidean void, while Physical Observers must recover Lorentz-compatible clock, ruler, and signal behavior to the measured precision.

#### Complete-State and Observational Proxies

- **Complete-state diagnostic:** The $\mathbb{U}_{\text{now}}$ universe-state perspective can use the transmitter-tagged wake-concentricity diagnostic in [Detecting the Absolute Frame](../../../../markdown/aaa/foundations/detecting-the-absolute-frame.md). This is complete-state bookkeeping, not an operational laboratory protocol for Physical Observers.
- **CMB rest-frame proxy:** The CMB dipole-free frame is an empirical large-scale proxy for Noether sea rest. It is not an identification of the Euclidean-void rest frame.
- **Protocol:** Compare simulation outputs with CMB-frame summaries only as a large-scale consistency check for the declared Noether sea state and cosmological transport record.

#### Null Tests for Absolute-Frame Drift

- **Protocol:** Run a simulated Michelson-Morley or resonator experiment through a declared Noether sea state.
- **Success criterion:** The observer-level interference or frequency record remains invariant, within the predeclared leakage bound, as the apparatus rotates relative to the Euclidean-void frame.
- **Mechanism target:** Verify whether the retained assembly branch produces the required $\gamma^{-1}$ ruler deformation and matching clock-rate response. The contraction is not assumed merely because the target has Lorentz form.
- **Failure condition:** A residual orientation or boost dependence above the applicable bound rejects the proposed hiding mechanism.

#### Precision Atomic Comparison

- **Protocol:** Compare the derived hydrogen $1S$-$2S$ observer record for apparatus histories with different orientations and drifts relative to the Euclidean-void frame.
- **Success criterion:** The same unit map, photon branch, assembly deformation, and clock channel keep sidereal variation below the bound recorded in the [Constraint Ledger](../../../../markdown/aaa/validation/constraint-ledger.md).
- **Failure condition:** Per-run retuning of the Noether sea state, line map, or clock calibration is a hidden-tuning failure rather than a successful null result.

### Reading a Null Result

A null result constrains a declared observable map; it does not show that the underlying absolute frame is absent. Conversely, naming a Noether sea mechanism does not explain the null result until the same retained record produces the clock, ruler, propagation, and apparatus response within tolerance. The decisive object is therefore the shared record and its falsifiable residual, not the verbal compatibility of two pictures.

## Architrino SI Base Units

This chapter examines how the modern SI system interfaces with $\mathbb{A}\mathbb{A}\mathbb{A}$. Its purpose is to ask which defining constants might be derivable, which remain primitive, and what kinds of constant-relations the theory should eventually explain if its geometric closure program succeeds.

It should be read together with [Parameter Ledger](../../../../markdown/aaa/validation/parameter-ledger.md), [Angular Momentum and Spin](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md), [Mapping the Planck Scale](../../../../markdown/aaa/philosophy-history/theory-bridges/mapping-planck-scale-a1-geometry.md), [Energy](../../../../markdown/aaa/dynamics/energy.md), [Particle Masses](../../../../markdown/aaa/assemblies/particle-masses.md), and [Atomic Spectra](../../../../markdown/aaa/nuclear-atomic/atomic-spectra.md).

### Executive Summary

The **2019 revision of the SI** redefined all seven base units in terms of **fixed fundamental constants**, eliminating physical artifacts. This is structurally aligned with the goal of $\mathbb{A}\mathbb{A}\mathbb{A}$: deriving observable physics from a minimal set of substrate postulates (Euclidean void, absolute time, primitive architrino polarity-unit magnitude $\epsilon$, field speed $c_f$). The relation $\epsilon\leftrightarrow|e|/6$ is an observer-level calibration target, not a substrate premise.

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
- **Architrino polarity-unit magnitude** $\epsilon$, with observer calibration target $|e|=6\epsilon$
- **Causal wake interaction kernel** (inverse-square line-of-action weighting modulated by the transmitter-side acceleration weight $W^{\mathrm{acc}}$ over causal wake surfaces, with regularized coincidence handling)

#### Category C: Assembly Geometry (Emergent but Calculable)

In this section `A1` means only the prescribed Family-A member with persistent binary indices, independently assignable positive radii and frequencies, mutually orthogonal axes at the near-rest endpoint, and axes that converge toward the group-translation direction along $\lambda_A$. Axial half-separations, transverse orbit radii, phases, and circulation remain explicit binary coordinates. None of the unit, particle, quantization, stability, or retention claims below follows from that definition; each remains a derivation target and fails if the same evolved record does not retain the declared coordinates and required ledger rows.

- **A1 indexed radius tuple** $(R_1,R_2,R_3)$, with no radius order encoded by the indices
- **Maximum curvature binary radius** $r_{\text{max-curv}}$ (where $v \gg c_f$)
- **Reference Noether braid density** $\rho_{\text{NS},0}$ (the normalization scale for $n(\mathbf X,T)$)

**Everything else** (masses, coupling constants, cosmological parameters) should be **derivable** from these via:
- Self-hit dynamics (non-Markovian evolution)
- A1 stability conditions (quantization)
- Noether sea coupling (emergent metric, inertia)

#### Primitive-to-Derived Measure Ladder

For the units program, it is useful to distinguish primitive measures from derived ones rather than treating the SI list as a flat catalog.

- **Primitive substrate inputs:** field speed $c_f$, architrino polarity-unit magnitude $\epsilon$, absolute time ordering, and the geometric closure scales that belong to stable assemblies. The effective charge convention $|e|=6\epsilon$ belongs to the later observer map.
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
- Interaction between the **electron assembly's candidate braid scaffold** and the nucleus; the source record used here assigns the magnetic-moment row to binary 2 at $v_2 \approx c_f$, but neither the electron identity nor this role follows from the taxonomy
- The **nuclear spin** (magnetic moment from proton/neutron records with an explicitly assigned binary-2 channel)

This is an atomic-clock validation target, not a closed spin derivation. The electron magnetic moment, nuclear spin ledger, and hyperfine coupling must inherit [Angular Momentum and Spin](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md), [Atomic Structure](../../../../markdown/aaa/nuclear-atomic/atomic-structure.md), and [Atomic Spectra](../../../../markdown/aaa/nuclear-atomic/atomic-spectra.md) before $\Delta \nu_{\text{Cs}}$ can be claimed from first principles.

**What we must derive:**
$$
\Delta \nu_{\text{Cs}} = f(\text{candidate indexed braid geometry, } c_f, \epsilon, \text{ Noether sea coupling})
$$

**Challenge:** The frequency is determined by:
- The source record's binary-2 orbital frequency (sets the candidate magnetic-moment row)
- The coupling strength between electron and atomic nucleus (mediated by Noether sea response, with photon exchange as the observer-level channel)
- The nuclear configuration (133 nucleons = complex assembly)

**Pathway:**
1. Calculate the electron source record's binary-2 orbital frequency $\omega_2$ for the Cs ground state
2. Calculate the effective comparison magnetic moment $\mu = \frac{\epsilon\omega_2r_2^2}{2}$ for the declared circular-current analogue
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

The speed of light $c$ is **not fundamental**. It is the low-gradient operational speed of photon assemblies, modeled as coaxial contra-rotating polarity-conjugate planar pairs, propagating through the Noether sea.

**Key relation:**
$$
c_\gamma(\mathbf X,T)=\frac{c_f}{\chi_\gamma(\mathbf X,T)},
\qquad
\chi_\gamma(\mathbf X,T)=f_\gamma\!\left(\rho_{\text{NS}}(\mathbf X,T),n(\mathbf X,T),\text{Noether sea state}\right)
$$

In the low-energy limit (flat spacetime, weak Noether sea gradients):
$$
c \approx c_f \quad (\text{small corrections from Noether sea refraction})
$$

**What we must show:**
- Photons are coaxial contra-rotating polarity-conjugate planar pairs whose bosonic/statistical behavior is recovered as a downstream closure target
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

The Planck constant $h$ is the observer-level benchmark for a quantum of **closed-cycle action**. The $\mathbb{A}\mathbb{A}\mathbb{A}$ derivation target is to recover this scale from A1 geometry and the lower recordable basin-measure scale, not to assume it as a primitive input. Because the Master Equation is acceleration-first, a branch calculation first produces a specific-action scale. The optional universal bookkeeping constant $\mu_{\text{arch}}$ converts that scale to action units without assigning primitive mass to an architrino:
$$
\mu_{\text{arch}}I_3=n\hbar=n\frac{h}{2\pi}.
$$

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
where $\kappa\epsilon^2/c_f$ has units of specific action and $\mathcal J_3$ is a dimensionless branch output built from the declared indexed geometry and causal-root record. The normalization $\mu_{\text{arch}}$ must be fixed before comparison with $h$. This is a candidate internal braid action variable, not the observer-level electron orbital angular momentum quantum number $\ell$ of the hydrogen $1s$ state. The particle assignment and action role are source-record hypotheses, not meanings of index 3 or of an A1 taxonomy label.

**Derivation pathway:**
1. Compute $\mathcal J_3$ from the retained hydrogen source record, including its indexed geometry, acceleration-moment integral, and wake-boundary contribution.
2. Show that closed-cycle action quantization ($\oint p\,dq = n h$) and the equivalent radian-normalized relation ($I=n\hbar$) arise from geometric quantization of the internal binary orbit.
3. Declare $\mu_{\text{arch}}$ and the units of every action-ledger channel before comparing the resulting observer-level action with $h$.

**Target relation:**
$$
h
\stackrel{\text{target}}{=}
2\pi\mu_{\text{arch}}
\frac{\kappa\epsilon^2}{c_f}
\mathcal J_3
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
- Candidate answer: **confinement or dynamical suppression**. The working particle map binds the $\epsilon$ polarity units in candidate quark or lepton braid scaffolds. Isolated $\pm\epsilon$ polarity units are not observed as stable observer-level particles, so the braid assignment and suppression mechanism remain closure targets rather than completed theorems.

---

#### The Kelvin (Temperature Unit) — $k_B$

**SI Definition:**
$$
1 \text{ K} = \frac{1.380649 \times 10^{-23}}{k_B} \text{ J}
$$

**Architrino Interpretation:**

Boltzmann's constant $k_B$ is the conversion factor between **energy** and **temperature**. In $\mathbb{A}\mathbb{A}\mathbb{A}$, temperature is not the internal energy of one Noether braid or the total energy stored in the Noether sea. It is an effective ensemble variable admitted when a declared coarse-graining supplies an accessible energy ledger, a measure over retained states, a fixed inventory or access variable, and a local equilibrium or thermalization condition. The general rule is the same-record entropy relation developed in [Entropy](../../../../markdown/aaa/dynamics/entropy.md#temperature-as-a-same-record-ensemble-variable).

**Thermalized-ensemble limit:**
In a thermalized Noether sea or material ensemble whose accessible degrees of freedom are quadratic, the standard equipartition comparison should be recovered:
$$
\langle E_{\text{kinetic}} \rangle = \frac{1}{2} k_B T_{\mathrm{temp}}
$$

For a neutral Noether braid assembly in the Noether sea, a six-channel comparison is available only after the three translational and three rotational channels have been shown to be accessible thermalized modes of the retained ensemble. In that special limit,

$$
\langle E_{\mathrm{acc}} \rangle = 3 k_B T_{\mathrm{temp}}
$$

This is a recovery target, not the general definition of temperature. If the energy is shielded, stored as configuration energy, or confined to a non-equilibrium branch, it does not enter the scalar temperature until the declared ensemble measure exposes it.

**What we must derive:**
$$
k_B = f(\text{thermalized ensemble measure, accessible mode energy, } c_f, \theta_{\text{sea}})
$$

**Pathway:**
1. Derive the effective assembly mass or accessible mode-energy scale from A1 dynamics.
2. Declare the thermalized ensemble window, retained measure, and Noether sea state.
3. Show that the accessible velocity or mode distribution recovers the Maxwell-Boltzmann or equipartition limit inside that window.
4. Relate the distribution width to $k_B T_{\mathrm{temp}}$ while keeping shielded stored energy outside the accessible temperature channel.

**Derivation target:**
$$
\langle \|\mathbf v\|^2\rangle
=
\frac{3k_B T_{\mathrm{temp}}}{m_{\mathrm{eff}}}
$$

where $m_{\mathrm{eff}}$ is an observer-level effective assembly mass or mode inertia supplied by the same retained record, not a primitive architrino mass.

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
N_A=\frac{M_u}{m_u},
\qquad
m_u=\frac{m({}^{12}\mathrm C)}{12}
$$
where $m_u$ is the unified atomic mass constant and $M_u$ is the molar-mass constant. The proton mass is not one twelfth of the carbon-12 mass.

**What we must derive:**
- The proton mass $m_p$ from candidate braid-based assembly geometry (3 candidate quark scaffolds + gluon wake structure + Noether sea coupling)

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
- Photons at 540 THz are planar-mode phase records with $\omega = 2\pi \times 540 \times 10^{12}$ rad/s; assigning that frequency to a specific indexed binary is still a derivation target.
- The human retina's photoreceptors (assemblies themselves) couple resonantly to this frequency
- The constant 683 lm/W is **arbitrary**—it's a choice of units based on human biology

---

### Summary Table: SI Constants vs $\mathbb{A}\mathbb{A}\mathbb{A}$ Parameters

| SI Constant | Status in $\mathbb{A}\mathbb{A}\mathbb{A}$ | Derivation Pathway |
|-------------|-------------------------------|-------------------|
| $\Delta \nu_{\text{Cs}}$ | **Derivation target (open)** | Hyperfine splitting from source-record binary-2 magnetic-moment rows |
| $c$ | **Operational limit near $c_f$** | Low-gradient photon-channel speed; deviations are encoded by $\chi_\gamma$ |
| $h$ | **Derivation target (open)** | Closed-cycle action quantization; source-record binary-3 rotational-action increments in units of $\hbar$; lower recordable basin-measure scale after quantum closure |
| $e$ | **Recovered observer benchmark** | $|e|=6\epsilon$ after choosing the observer-level electric bookkeeping normalization |
| $k_B$ | **Derivation target (open)** | Noether sea thermal equilibrium + assembly mass |
| $N_A$ | **Emergent** | Follows from proton mass derivation |
| $K_{\text{cd}}$ | **Anthropic** | Human biology; not fundamental physics |

---

### Implications: Reducing the SI to Architrino Postulates

If the $\mathbb{A}\mathbb{A}\mathbb{A}$ program succeeds, we can **replace** the seven SI-defining constants with:

#### Candidate Substrate Inputs (Architrino SI)
1. **Architrino polarity-unit magnitude** $\epsilon$ (with observer charge-calibration target $|e|=6\epsilon$)
2. **Field speed** $c_f$ (replaces $c$)
3. **A1 geometry parameter** (for example, source-record radius $r_3$ or the maximum-curvature radius) (replaces $h$)
4. **Neutral Noether braid assembly mass** $m_{\text{NS}}$ (replaces $k_B$ when combined with $c_f$)

**Everything else is intended to be derived after closure:**
- $|e| = 6\epsilon$
- $c_{\text{eff}}\to c_f$ in the low-gradient Noether sea limit
- $h \stackrel{\text{target}}{=} 2\pi\mu_{\text{arch}}(\kappa\epsilon^2/c_f)\mathcal J_3$ for the declared source record after the action-closure derivation, not by definition
- $k_B = f(m_{\text{NS}}, c_f)$
- $N_A = f(m_p / m_{\text{NS}})$
- $\Delta \nu_{\text{Cs}} = f(\text{candidate Cs braid geometry})$

**Result target:** If the closure program succeeds, the seven SI constants reduce to **3-4 fundamental parameters**, with the rest emergent.

---

### Closure Priorities

#### Tier 1 (Must Answer)
1. **Derive $h$ from A1 geometry**
   - Show that the declared binary-3 row yields $\mu_{\text{arch}}I_3=n\hbar$ with $\mu_{\text{arch}}$ fixed before the run.
   - Compute $\mathcal J_3$ for the hydrogen $1s$ source record.
   - Test the same unit map against adjusted action-sensitive rows such as $\alpha$ and $R_\infty$; the exact SI value of $h$ defines the comparison unit and does not supply a zero-uncertainty physical residual.

2. **Confirm $c = c_f$ within bounds**
   - Show photon propagation through the Noether sea matches $c$ to $<10^{-17}$
   - Identify where/how deviations appear (Planck scale, strong gravity)

3. **Derive particle masses**
   - First derive the calibration-free $A_0$ reference-attractor packet described in [Particle Masses](../../../../markdown/aaa/assemblies/particle-masses.md#reference-attractor-gate).
   - Use that packet to extract $E_{\text{internal}}(A_0)$, $\zeta(A_0)$, and the baseline $\mathcal{M}_{\text{sea}}^{ab}$ response map before using electron, proton, or charged-lepton data as benchmarks.
   - Only after the mass-map gate is fixed, test downstream predictions such as $m_e$, $m_p$, and $m_p/m_e \approx 1836$.

#### Tier 2 (High Priority)
4. **Calculate $\Delta \nu_{\text{Cs}}$ from first principles**
   - Map Cs atomic structure to Noether braid assemblies
   - Derive hyperfine coupling strength
   - Show that the derived clock row is consistent with adjusted atomic benchmarks under the same second realization; $9{,}192{,}631{,}770\,\mathrm{Hz}$ is the exact SI definition, not an independent fitted datum

5. **Derive $k_B$ from Noether sea thermodynamics**
   - Calculate neutral Noether braid assembly effective mass
   - Show thermal equilibrium reproduces Maxwell-Boltzmann
   - Recover dimensionless and adjusted thermodynamic benchmark rows under the same temperature map; the exact SI value of $k_B$ fixes the kelvin convention

#### Tier 3 (Refinement)
6. **Map all SM particles to family/member assembly recipes**
   - Create "particle cookbook" (analogous to chemical formulas)
   - Show charge, spin, statistics all emerge from geometry

7. **Explain fine-structure constant $\alpha$**
   - $\alpha = \frac{e^2}{4\pi \epsilon_0 \hbar c} \approx 1/137$
   - The low-energy benchmark is a declared observer-level anchor, not a primitive substrate constant:
     $$
     \alpha_{\mathrm{ref}}
     =
     \alpha(\mu_0;\theta_{\mathrm{sea}})
     $$
     where $\mu_0$ is the reference probe scale and $\theta_{\mathrm{sea}}$ denotes the fixed Noether sea record for the comparison window.
   - Running with probe scale must be recovered as an effective electromagnetic response:
     $$
     \alpha(\mu;\theta_{\mathrm{sea}})
     =
     \alpha_{\mathrm{ref}}\,
     \mathcal K_{\mathrm{EM}}(\mu;\theta_{\mathrm{sea}},I_\mu)
     $$
     where $\mathcal K_{\mathrm{EM}}$ carries wake dressing, shielding exposure, and vacuum-polarization-like response, while $I_\mu$ records the charged thresholds visible at scale $\mu$.
   - In architrino terms, the fixed part of the low-energy anchor must be derived from $\epsilon$, the geometry-derived action period $h_\vartheta$, the photon-channel speed $c_\gamma$, and the declared Noether sea record; the scale-dependent part belongs in $\mathcal K_{\mathrm{EM}}$ and $I_\mu$, not in hidden retuning of $c_f$, $h_\vartheta$, the observer charge convention, or the Noether sea state.
   - Derive numerically; explain why $\alpha_{\mathrm{ref}}\ll 1$ and why $\alpha(\mu)$ runs with energy without changing the primitive wake speed or the action-period carrier.

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
- **Polarity units** (in units of primitive $\epsilon$, with observer calibration target $|e|=6\epsilon$)

No kilograms, no kelvins, no moles—just **geometry, time, and polarity bookkeeping**, with observer units recovered above that layer.

That would be a substrate-level measurement framework, with observer units recovered as derived conventions.

## Parameter Ledger

This chapter is the canonical bookkeeping page for the symbols that control closure across the $\mathbb{A}\mathbb{A}\mathbb{A}$ corpus. Its purpose is not to re-derive every quantity. Its purpose is to keep the roles of primitive postulates, geometric closure targets, constitutive coefficients, state variables, and observer-level benchmarks from collapsing into one another.

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

The corpus uses both $v$ and $c_f$ for field speed in different chapters. This ledger treats
$$
c_f
$$
as the canonical symbol for the physical wake speed. Numerical instantiations use $c_f=1$; a generic velocity symbol must not replace it.

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

The most important mining consequence is procedural: exact rows such as $h$, $e$, $k_B$, and $c$ are not easier physical targets because their listed uncertainty is zero. They are exact in SI because the units are defined through them. The physical pressure comes from the adjusted and dimensionless rows, especially $\alpha$, $m_p/m_e$, $R_\infty$, particle mass-energy equivalents, and $G$.

#### LHC scalar benchmark contract

The LHC scalar rows are observer-level benchmark rows, not CODATA constants and not substrate inputs. The ATLAS 2012 discovery row fixes one date-stamped scalar-boson benchmark for the Higgs-sector residual used by [Particle Masses](../../../../markdown/aaa/assemblies/particle-masses.md) and [Electroweak Bosons](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md). It tests whether one shared native scalar or mass-map record can recover the observed mass, production-and-branching normalization, channel pattern, and absence of broad additional scalar signals.

| Entry | ATLAS 2012 benchmark | Ledger role |
| --- | ---: | --- |
| $M_H^{\mathrm{ATLAS\,2012}}$ | $126.0\,\mathrm{GeV}$ with $0.4\,\mathrm{GeV}$ statistical and $0.4\,\mathrm{GeV}$ systematic uncertainty | Date-stamped scalar-mass benchmark; not a native scalar-mode identification. |
| $\hat{\mu}_H^{\mathrm{ATLAS\,2012}}$ | $1.4\pm0.3$ | Production-and-branching normalization benchmark near $126\,\mathrm{GeV}$. |
| local discovery significance | $5.9\sigma$ | Discovery-strength record; not an independent residual term unless a likelihood reconstruction declares one. |
| high-resolution channels | $ZZ^{(*)}\to4\ell$, $\gamma\gamma$, $WW^{(*)}\to\ell\nu\ell\nu$ | Channel-pattern benchmark for spin-compatible, detector-facing scalar recovery. |

For the ATLAS 2012 row, the scalar validation ledger uses
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
with the channel set
$$
\mathcal{C}_{H}^{\mathrm{ATLAS\,2012}}
=
\{ZZ^{(*)}\to4\ell,\gamma\gamma,WW^{(*)}\to\ell\nu\ell\nu\}.
$$
The corresponding validation contribution is
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
Here $M_H^{\mathrm{breath}}(\theta)$ is the predicted scalar or breathing-mode mass from the same branch record, $\mu_H^{\mathrm{eff}}(\theta)$ is the observer-level production-and-branching normalization, and $Z_c$ records the declared channel significance or likelihood contribution. This row does not identify the Higgs with a named native mode, does not update to a current world-average mass, and must not be used as a branch-search, shielding, or mass-map input. Higgs-sector closure requires the residual to close after the branch, shielding, channel, and detector-provenance records have been fixed independently.

#### Naturalness and sensitivity

When a symbol is claimed as a closure output rather than a free fit, use the fine-tuning quotient
$$
\mathrm{FTQ}(p)=
\frac{\Delta p/p}{\Delta \mathrm{obs}/\mathrm{obs}}
$$
as the default sensitivity diagnostic.

Here $\Delta p/p$ is the fractional perturbation of a parameter or closure output, and $\Delta \mathrm{obs}/\mathrm{obs}$ is the resulting fractional perturbation of the observable being tested. Values $\mathrm{FTQ}(p)>10$ should be treated as fine-tuning pressure unless a discrete topology, symmetry, attractor basin, or measured benchmark explains the sensitivity.

Status:

- $\epsilon$ is treated as the discrete primitive polarity-unit magnitude, while the observer-level calibration target is $|e|=6\epsilon$; neither is a continuous per-observable fit.
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
For $\tilde{\mathbf X}=\mathbf X/R_*$, $\tilde T=T/T_*$, and $\tilde q_i=q_i/\epsilon=\pm1$, the causal constraint and bare acceleration law reduce to
$$
\tilde R_{ij}=\tilde T-\tilde T_t
$$
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
up to the separately declared regulator ratio $\eta/R_*$ when a mollified surrogate is being used.

Consequently, every dimensionless output of the isolated bare two-body problem is a pure branch-geometry result: root multiplicities, branch-birth thresholds, maximum-curvature speed ratios, residual signs, and any certified radius in units of $R_*$. This does not certify that a stable maximum-curvature binary exists. It says that if a certified two-body branch produces such a number, that number is computed by the root ledger and stability problem rather than fitted by changing a Layer-I dimensionless constant.

### Layer I: Substrate and Kernel Parameters

These symbols belong to the delayed microscopic law itself.

| ID | Symbol | Class | Status | Meaning | Primary home |
| --- | --- | --- | --- | --- | --- |
| K1 | $c_f$ | Fundamental parameter | Primitive | field speed of causal wake propagation | [../dynamics/master-equation.md](../../../../markdown/aaa/dynamics/master-equation.md), [../foundations/absolute-timespace.md](../../../../markdown/aaa/foundations/absolute-timespace.md) |
| K2 | $\epsilon$ | Fundamental parameter | Primitive | potential polarity-unit magnitude, with observer-level electric charge reconstructed from it | [../assemblies/fermions/quantum-number-mapping.md](../../../../markdown/aaa/assemblies/fermions/quantum-number-mapping.md), [../assemblies/gauge-structure-emergence.md](../../../../markdown/aaa/assemblies/gauge-structure-emergence.md) |
| K3 | $\kappa$ | Fundamental parameter or normalization-sensitive coupling | Open as primitive/normalization split; universal in the substrate acceleration law | coupling multiplying $\sigma_{ij}\lvert q_iq_j\rvert W_{ij}^{\mathrm{acc}}/r_{ij}^2$ in the per-hit acceleration law; because a single architrino has no primitive inertial mass, this is not an $F=ma$ coefficient; with $c_f$ and $\epsilon$ it sets the two-body scale $R_*=\kappa\epsilon^2/c_f^2$ rather than a Layer-I dimensionless fit constant; dimensional row $[\kappa]=\mathrm{L}^3\,\mathrm{T}^{-2}\,\mathrm{Q}^{-2}$ | [../dynamics/master-equation.md](../../../../markdown/aaa/dynamics/master-equation.md), [architrino-si-base-units.md](../../../../markdown/aaa/validation/architrino-si-base-units.md), [../foundations/architrino.md](../../../../markdown/aaa/foundations/architrino.md) |
| K4 | $\eta$ | Regulator / convention | Open but non-ontological | mollifier width used to regularize causal wake surfaces for smooth dynamics and numerics | [simulations/action-energy/well-posedness-and-regularization.md](../../../../markdown/aaa/validation/simulations/action-energy/well-posedness-and-regularization.md), [../dynamics/master-equation.md](../../../../markdown/aaa/dynamics/master-equation.md) |
| K5 | $Z_e$ | Regulator / convention | Convention, default $Z_e=1$ | coarse-graining / normalization factor in the substrate-to-observer charge map | [../assemblies/gauge-structure-emergence.md](../../../../markdown/aaa/assemblies/gauge-structure-emergence.md), [../assemblies/fermions/quantum-number-mapping.md](../../../../markdown/aaa/assemblies/fermions/quantum-number-mapping.md) |

### Layer II: Assembly-Geometry Closure Targets

These quantities belong to Noether braid architecture, shielding, branch structure, and assembly response.

| ID | Symbol | Class | Status | Meaning | Primary home |
| --- | --- | --- | --- | --- | --- |
| G0 | $A_0$ | Geometric closure target | Open | calibration-free neutral rest-branch Noether braid reference attractor used to derive the first mass-map outputs before particle benchmarks enter | [Particle Masses](../../../../markdown/aaa/assemblies/particle-masses.md), [A1 Dynamics](../../../../markdown/aaa/noether-braid/braid-a1-dynamics.md#a1-dynamics), [Energy](../../../../markdown/aaa/dynamics/energy.md) |
| G0a | $\mathcal{P}_{A_0}$ | Geometric closure target | Open; compact finite-coordinate no-go recorded, branch-chart revision required before Tier 1 continuation | certificate packet tying the finite closure graph $\mathcal{G}_{A_0}$, active root ledger, quotient Floquet gap $\Delta_{\mathbf{k}}$, shielding extraction, and $\mathcal{M}_{\text{sea}}^{ab}$ response probe into one promotion sequence | [simulations/a0-branch-certificate-protocol.md](../../../../markdown/aaa/validation/simulations/a0-branch-certificate-protocol.md), [simulations/a0-tier0-result-interpretation.md](../../../../markdown/aaa/validation/simulations/a0-tier0-result-interpretation.md), [../assemblies/particle-masses.md](../../../../markdown/aaa/assemblies/particle-masses.md) |
| G1 | $R_1,R_2,R_3$ | Geometric closure target | Open | characteristic radii of the indexed A1 binary rows | [Noether Braid](../../../../markdown/aaa/noether-braid/noether-braid.md), [Braid Envelope Geometry](../../../../markdown/aaa/noether-braid/braid-envelope-geometry.md), [A1 Dynamics](../../../../markdown/aaa/noether-braid/braid-a1-dynamics.md#a1-dynamics) |
| G2 | $\omega_1,\omega_2,\omega_3$ | Geometric closure target | Open | characteristic frequencies of the indexed A1 binaries | [A1 Dynamics](../../../../markdown/aaa/noether-braid/braid-a1-dynamics.md#a1-dynamics), [Particle Masses](../../../../markdown/aaa/assemblies/particle-masses.md) |
| G3 | $R_{\text{align}}$ | Geometric closure target | Open, conjectural | assembly-level alignment radius in the terminal Family-A map | [Mapping the Planck Scale to Family-A Alignment Geometry](../../../../markdown/aaa/philosophy-history/theory-bridges/mapping-planck-scale-a1-geometry.md) |
| G4 | $\mathcal{A}_{\text{align}}^{\text{cycle}}, I_{\text{align}}$ | Geometric closure target | Open, conjectural | closed-cycle action and radian-normalized rotational-action increment of the aligned terminal mode | [Mapping the Planck Scale to Family-A Alignment Geometry](../../../../markdown/aaa/philosophy-history/theory-bridges/mapping-planck-scale-a1-geometry.md) |
| G5 | $\zeta(A)$ | Geometric closure target | Open | shielding or leakage factor of assembly $A$, defined by far-field suppression relative to naive constituent exposure | [../dynamics/energy.md](../../../../markdown/aaa/dynamics/energy.md), [../assemblies/particle-masses.md](../../../../markdown/aaa/assemblies/particle-masses.md) |
| G6 | $\alpha$ | Geometric closure target | Open | axial-frame misalignment angle used in the weak-mixing / quark-geometry program | [../assemblies/fermions/weak-mixing-angle.md](../../../../markdown/aaa/assemblies/fermions/weak-mixing-angle.md) |
| G7 | $\phi_c$ | Geometric closure target | Open | color-sector azimuth selecting the exceptional axial-frame orientation | [../assemblies/fermions/weak-mixing-angle.md](../../../../markdown/aaa/assemblies/fermions/weak-mixing-angle.md) |

### Layer III: Constitutive Spacetime Parameters

These symbols control the handoff from the Euclidean substrate plus Noether sea to effective metric language.

| ID | Symbol | Class | Status | Meaning | Primary home |
| --- | --- | --- | --- | --- | --- |
| C1 | $\rho_{\text{NS},0}$ | Constitutive closure target | Open | reference Noether braid density used to normalize the Noether sea | [../spacetime/emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md), [../spacetime/proper-time-and-time-dilation.md](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md) |
| C2 | $n(\mathbf X,T)$ | State variable / field | Derived field | normalized Noether braid density, $n=\rho_{\text{NS}}/\rho_{\text{NS},0}$ | [../spacetime/emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md), [../spacetime/proper-time-and-time-dilation.md](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md) |
| C3 | $\Omega(x_{\mathrm{eff}}^i),\xi(x_{\mathrm{eff}}^i)$ | Constitutive closure target | Open | clock-channel and ruler-channel response functions in the effective metric subclass | [../spacetime/emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md), [../spacetime/lorentz-kinematics.md](../../../../markdown/aaa/spacetime/lorentz-kinematics.md) |
| C4 | $\Phi_{\text{eff}}(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})$ | State variable / field | Derived field | constitutive effective potential defined from the clock channel | [../spacetime/emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md), [../spacetime/proper-time-and-time-dilation.md](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md) |
| C5 | $c_{\text{eff}}(\mathbf X,T)$ | State variable / field | Derived field | Noether sea dressed assembly-channel propagation speed used for clock/ruler closure and effective-metric comparisons, with $c_{\text{eff}}\to c_f$ in weak homogeneous conditions; separate from photon-channel speed $c_\gamma$ unless Gate A closes that identification | [../spacetime/emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md), [../spacetime/ppn-parameters.md](../../../../markdown/aaa/spacetime/ppn-parameters.md) |
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
| O2 | $h,\hbar$ | Observable benchmark / geometric target | Open | full-cycle action quantum and radian-normalized angular-momentum quantum to be related to Family-A alignment, orbital closure, and any lower recordable basin-measure scale derived by quantum closure | [Angular Momentum and Spin](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md), [Mapping the Planck Scale to Family-A Alignment Geometry](../../../../markdown/aaa/philosophy-history/theory-bridges/mapping-planck-scale-a1-geometry.md), [Architrino SI Base Units](../../../../markdown/aaa/validation/architrino-si-base-units.md) |
| O3 | $G$ or $G_{\text{eff}}$ | Observable benchmark / constitutive target | Open | effective gravitational coupling emerging from medium compliance and alignment geometry | [Mapping the Planck Scale to Family-A Alignment Geometry](../../../../markdown/aaa/philosophy-history/theory-bridges/mapping-planck-scale-a1-geometry.md), [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md) |
| O4 | $m_{\text{inertial}}(A)$ | Derived output | Open | inertial mass of assembly $A$, extracted operationally from shielding and medium response | [../dynamics/energy.md](../../../../markdown/aaa/dynamics/energy.md), [../assemblies/particle-masses.md](../../../../markdown/aaa/assemblies/particle-masses.md) |
| O5 | $\theta_W^{\text{bare}}$ and $\theta_W$ | Geometric target / observable benchmark | Open | bare geometric weak-mixing increment and the measured electroweak mixing angle it must eventually inform | [../assemblies/fermions/weak-mixing-angle.md](../../../../markdown/aaa/assemblies/fermions/weak-mixing-angle.md), [../assemblies/gauge-structure-emergence.md](../../../../markdown/aaa/assemblies/gauge-structure-emergence.md) |
| O6 | $(\alpha_1,\alpha_2,\alpha_3)$ | Observable benchmark | Open | standard PPN preferred-frame coefficients derived from $(\Xi_1,\Xi_2,\Xi_3)$ | [../spacetime/ppn-parameters.md](../../../../markdown/aaa/spacetime/ppn-parameters.md) |
| O7 | $Z_X^{E\to R}$, $Y_{X,E\to R}$, and $H_{\mathrm{eff},X}$ | Observer-level derived output | Open | total signed photon-frequency transfer, path-history exchange contribution, and inferred redshift-transfer slope for a declared source/receiver record; not primitive expansion parameters | [../cosmology/expansion-mechanism.md](../../../../markdown/aaa/cosmology/expansion-mechanism.md), [simulations/redshift-budget-toy-model.md](../../../../markdown/aaa/validation/simulations/redshift-budget-toy-model.md), [reaction-cosmology-provenance-ledger.md](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md) |
| O8 | $M_H^{\mathrm{ledger}}$, $\mu_H^{\mathrm{ledger}}$, and $Z_c^{\mathrm{ATLAS\,2012}}$ | Observable benchmark | ATLAS 2012 row recorded; Higgs-sector closure open | date-stamped scalar-boson mass, production-and-branching normalization, and high-resolution channel ledger used to test Higgs-sector recovery; not branch-search or mass-map input | [../assemblies/particle-masses.md](../../../../markdown/aaa/assemblies/particle-masses.md), [../assemblies/bosons/electroweak-bosons.md](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md) |

### Canonical Relations

The ledger above is only useful if the interfaces between layers stay explicit. The following relations are canonical handoff points in the corpus.

#### 1. Microscopic delayed dynamics

The regularized exact law uses the kernel-side set
$$
(c_f,\epsilon,\kappa,\eta)
$$
A representative regularized form is
$$
\frac{d^2\mathbf X_a}{dT^2}
=
\sum_b
\kappa\,\sigma_{ab}|q_aq_b|
\int_{-\infty}^{T}\!dT_t\;
\frac{\hat{\mathbf R}_{ab}(T;T_t)}{R_{ab}(T;T_t)^2}\,
\delta_\eta\!\big(R_{ab}(T;T_t)-c_f(T-T_t)\big)
$$

This is the substrate-side parameter core. Any exact or numerical closure that changes these symbols chapter by chapter is not a closed theory.

#### 2. Charge reconstruction

The substrate-to-observer charge bookkeeping map is
$$
|e| = 6\epsilon Z_e
$$
with canonical normalization choice
$$
Z_e=1
$$

This relation is important because it shows that the elementary charge magnitude is not presently a primitive input in the architrino ontology. It is a recovered observer-level benchmark.

Here $Z_e$ is dimensionless. The coupling $\kappa$ and wake speed $c_f$ do not enter this equality: with the dimensional row for $\kappa$ above, a factor $\sqrt{\kappa c_f}$ would not have charge-conversion units. The equation is therefore an observer bookkeeping normalization, not a second primitive definition of $\epsilon$ and not a dynamical derivation of electric charge. A deeper derivation must explain why the six-site assembly ledger selects $Z_e=1$ without inserting the measured value of $|e|$ into the branch calculation.

#### 3. Medium normalization and clock-channel potential

The constitutive spacetime layer uses
$$
\rho_{\text{NS}}(\mathbf X,T)=\rho_{\text{NS},0}\,n(\mathbf X,T)
$$
and
$$
\Phi_{\text{eff}}(x_{\mathrm{eff}}^i)
=
c_0^2\ln\!\big(\Omega(x_{\mathrm{eff}}^i)\xi(x_{\mathrm{eff}}^i)\big)
$$

Here $\xi$ is the Noether braid envelope shape ratio, while $\Omega\xi$ is the clock-rate factor used by this exponential metric subclass after the geometry-to-clock map is fixed. The prefactor $c_0^2$ belongs to the observer-sector potential calibration; in the weak homogeneous branch, $c_f$ and $c_0$ differ only by $O(\epsilon_{\mathrm{LV}}c_0)$.

This is the cleanest statement of the Noether sea-to-metric handoff:
$$
(\delta_{ij},n,\chi_{\text{sea}},\Phi_{\text{eff}},\text{stress})
\mapsto
g_{\mu\nu}^{\text{eff}}
$$

#### 4. Weak-field PPN extraction

The observable weak-field coefficients are read from the constitutive map through
$$
\chi_{\text{sea}}(\mathbf X,T)
\equiv
\frac{c_f}{c_{\text{eff}}(\mathbf X,T)}
=
1-(1+\gamma_{\mathrm{PPN}})\frac{\Phi_N(x_{\mathrm{eff}}^i)}{c_f^2}
+\mathcal{O}\!\left(\frac{\Phi_N^2}{c_f^4}\right)
$$
and
$$
\beta_{\mathrm{PPN}}=\frac{1+2C_2}{2}
$$

Preferred-frame leakage is encoded by
$$
\alpha_1=\Xi_1,\qquad
\alpha_2=\Xi_2,\qquad
\alpha_3=\Xi_1-\Xi_2-\Xi_3
$$

The three displayed PPN coefficients vanish exactly when
$$
\Xi_1=\Xi_2=\Xi_3=0
\quad\Longleftrightarrow\quad
\alpha_1=\alpha_2=\alpha_3=0
$$
The coefficient $\Xi_4$ is not constrained by this three-parameter map. Full zero-leakage closure additionally requires either the independent condition $\Xi_4=0$ or a separately declared observable that extracts $\Xi_4$.

#### 5. Mass map

The assembly-side inertial map is
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

The compact finite-coordinate no-go is a status blocker inside $\mathcal{P}_{A_0}$, not an additional free parameter and not a benchmark input. It requires a predeclared branch-chart revision before Tier 1 continuation can be interpreted as progress toward the mass-facing output above.

#### 6. Planck-alignment map

The Planck-scale program uses the conjectural relations
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

These are not yet closed derivations. They are the alignment-side targets connecting geometric closure to $(h,G)$.

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

This means the quark-sector use of $\alpha$ is a geometric branch label tied to a candidate bare electroweak increment, not yet a finished derivation of the measured weak angle.

### What Is Not Yet Closed

The corpus supports the following conservative closure assessment.

#### Closed enough to treat as canonical

- $c_f$ is treated consistently as the substrate wake speed, with $c_f=1$ in numerical instantiations.
- $\epsilon$ is treated consistently as the potential polarity-unit magnitude.
- The exact bare two-body kernel admits the canonical nondimensionalization by $R_*=\kappa\epsilon^2/c_f^2$ and $T_*=R_*/c_f$, so branch thresholds and residual equations are parameter-free once a branch chart is declared.
- $\rho_{\text{NS},0}$ is the reference density symbol for the Noether sea.
- $\Phi_{\text{eff}}=c_0^2\ln(\Omega\xi)$ is the canonical clock-channel potential definition for the exponential metric subclass, with $\xi$ retained as a geometry-first Noether braid shape ratio and $c_0$ marking observer-sector calibration.

#### Still genuinely open

- whether $\kappa$ is primitive, derived, or partly a normalization artifact,
- whether $\eta$ should disappear entirely from physical statements after the weak limit is taken,
- whether any specific maximum-curvature binary branch exists and is stable under the full signed-root, finite-window two-body dynamics,
- the $A_0$ reference-attractor output packet,
- the actual indexed A1 radii/frequency record,
- the shielding map $\zeta(A)$ across the fermion spectrum,
- the medium-response tensor $\mathcal{M}_{\text{sea}}^{ab}$ that turns shielded internal energy into inertial and gradient response,
- the constitutive functions $(\Omega,\xi)$ and the weak-field coefficient set $(\gamma_{\mathrm{PPN}},C_2,\Xi_i)$,
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
- a state field such as $n(\mathbf X,T)$ is implicitly treated as a free global constant to rescue a calculation,
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
- [Mapping the Planck Scale to Family-A Alignment Geometry](../../../../markdown/aaa/philosophy-history/theory-bridges/mapping-planck-scale-a1-geometry.md)
- [../spacetime/emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md)
- [../spacetime/ppn-parameters.md](../../../../markdown/aaa/spacetime/ppn-parameters.md)
- [../assemblies/fermions/weak-mixing-angle.md](../../../../markdown/aaa/assemblies/fermions/weak-mixing-angle.md)

## Reaction Ledger

This ledger records how reaction channels should account for constituent architrinos, Noether braids, axial layers, energy, momentum, charge, polarity, and path-history provenance. Its purpose is not to replace Standard Model reaction notation. Its purpose is to state what an $\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation must conserve before a reaction map can be treated as more than a provisional diagram.

For radiative channels, use this ledger together with [Radiation](../../../../markdown/aaa/reactions/radiation.md#radiation-event-record-schema). For cosmology-facing radiation and thermalization channels, use it together with [Reaction-Cosmology Provenance Ledger](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md).

### Scope and Status

Reaction provenance is a closure target. A channel may use standard observer notation such as $d \to u + W^-$ or $\gamma+\gamma\to e^+ + e^-$, but the $\mathbb{A}\mathbb{A}\mathbb{A}$ map is not closed until the underlying constituent ledger is explicit.

The conservative status is:

- Architrino count and polarity conservation are required constraints.
- Noether sea participation is allowed, but it must be recorded as a reactant, product reservoir, or medium-excitation channel rather than left implicit.
- W, Z, photon, and pair-production language may be retained at observer level, while the substrate map must identify the transient assembly, exchanged payload, or planar-mode nucleation event being invoked.
- Radiative, photon-capture, and sub-threshold shedding entries must attach the shared radiation event-record schema: source assembly, trigger geometry, $\delta\Theta_a$, $E_{\text{exc}}$, $E_\gamma$, recoil, medium excitation, polarization handoff, causal-wake ledger, and closure status.
- Any weak-channel ledger that depends on chirality, axial-frame orientation, CKM/PMNS mixing, or antineutrino routing remains provisional until the corresponding geometry is derived.
- Any charged-fermion generation change must route the scaffold-count difference $\Delta N_{\mathrm{scaffold}}=-2\,\Delta g$: each adjacent heavier step releases one neutral two-architrino support binary, and each adjacent lighter step recruits one. The source or destination Noether sea row must be explicit; see [Quantum Number Mapping](../../../../markdown/aaa/assemblies/fermions/quantum-number-mapping.md#generation-step-scaffold-ledger).
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
10. **Hybrid Standard Model matching, when applicable:** identify the source lane for the observer-level prediction: perturbative electroweak chart, matched weak effective theory, lattice-QCD or nuclear matrix element, infrared-safe QCD observable, QED, kinetic model, or detector functional. Include the scheme, operator or observable definition, matching normalization, CKM/PMNS factor when applicable, expansion or scaling parameter, systematic remainder, and regulator-removal or continuum record when one is used.
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
| Hybrid Standard Model matching, when applicable | Source lane, scheme, operator or observable, matching normalization, CKM/PMNS factor when applicable, matrix-element or factorization source, expansion or scaling parameter, systematic remainder, and regulator-removal or continuum record |
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

where the first set ranges over the resolved incoming assemblies and the second set ranges over resolved outgoing or remnant assemblies. This is not a new conservation law. It is a collision-specific refinement of the same event record: shielding loss, shielding gain, dissociation, association, recoil, photon output, medium excitation, Noether sea update, detector-facing products, and any re-shielded remnant must all be named inside the same $\mathcal{L}_{E\mathbf{p}\mathbf{J}}(\mathsf e)$ balance. If the calculation exposes internal energy from an incoming assembly without routing it to one of those named terms, the reaction remains a provisional map rather than a closed provenance record.

#### Hadronization Spin-Correlation Records

High-energy collision records that claim to recover nonperturbative strong-sector behavior must preserve spin and provenance through hadronization, not only through charge and energy balance. The $\Lambda\bar{\Lambda}$ spin-correlation measurement is a useful template because the inferred record passes through several layers: a short-distance $s\bar{s}$ source, confinement into color-singlet hyperons, feed-down from higher-mass states, weak decay of each hyperon, detector reconstruction of daughter tracks, and a correlation comparison against long-range pairs and scalar-control channels.

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

where $X_{\mathrm{coll}}$ includes the incoming beam and local Noether sea state, $I_{\mathrm{had}}$ is the selected hadronization route, $Y_{\Lambda\bar{\Lambda}}$ names the outgoing hyperon pair and any feed-down or remnant rows, and $\Theta_{\mathrm{decay}}$ records the weak-decay analyser geometry. The comparison residual is not just whether two hyperons are produced. It is whether the same event record recovers

$$
P_{\Lambda\bar{\Lambda}}(\Delta R\ \mathrm{short})>0,
\qquad
P_{\Lambda\bar{\Lambda}}(\Delta R\ \mathrm{long})\approx0,
$$

without changing the source, hadronization, or detector-response record between the two bins. If the short-range signal is matched only by assigning an independent spin label after hadronization, the strong-sector map has fit a detector statistic while failing provenance closure.

### Residual-Routing Event-Ledger Contract

Residual-routing material enters this ledger only as a theorem-target contract. It does not by itself prove that any weak, radiative, pair-production, nuclear, or cosmology-facing reaction channel has closed. The common target is:

$$
\mathcal{R}(\Gamma,\mathcal{H},\rho_{\text{NS}},\chi_{\text{sea}},\dots)
\longrightarrow
\{B_i\}
\longrightarrow
\mathcal{L}_{E\mathbf{p}\mathbf{J}}
$$

Here $\mathcal{R}$ is the replayable residual computed from the local assembly state, path-history ledger, Noether braid density, Noether sea delay factor, and any named sector variables. The set $\{B_i\}$ is the finite list of admissible output channels, such as retuning, bound excitation, radiation, recoil, medium heating, weak or nuclear reaction, record formation, release channel, or branch transition. The event ledger $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ is the balance object that must close after all selected outputs are named.

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
Here $B_{\mathrm{pre}}$ and $B_{\mathrm{post}}$ are the retained branch records before and after the interaction, $W_{\mathrm{in}}$ is the applied work or incoming excitation, $\Delta\mathcal A$ is the branch-action change, $\tau_{\mathrm{return}}$ is the return or relaxation time when a stable branch is recovered, and $\mathcal{L}_{E\mathbf p\mathbf J}^{\mathrm{post}}$ is the post-event balance. This prevents a reaction map from closing only by label replacement while leaving the outgoing assemblies dynamically unsettled.

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

In this observer-level normalization, $\hbar$ is the recovered action benchmark from the shared action-alignment map. It is not an independent substrate parameter or an event-local fit.

$$
\lambda_{\mathrm{hel}}
=
\frac{\hat{\mathbf k}\cdot\mathbf J_{\gamma}^{\mathrm{sub}}}{\hbar},
\qquad
\lambda_{\mathrm{hel}}\in\{+1,-1\}
$$

and the event balance bounds the projection error:

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
| Identity-routing failure | No bijection $\Pi_{\mathsf e}$, or equivalent identity route, maps participating input architrinos to participating output architrinos after named Noether sea reservoir terms are included. |
| Medium or remnant failure | $\Delta_{\mathrm{med}}\ne0$ or $\Delta_{\mathrm{rem}}\ne0$, meaning the route used medium heating, recoil, retained excitation, or remnant deformation as an implicit loss term. |
| Retuning failure | The same benchmark family can be recovered only by changing the residual definition, the channel boundary, or the Noether sea state variables between sector cases. |
| Cross-sector failure | The local route succeeds only by violating another required sector acceptance gate. |

### Weak-Corridor Provenance Gate

Weak reactions require an explicit corridor-provenance stance. The corpus supports two live possibilities:

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

Native status: provisional weak-reaction provenance map.

The active quark change is an axial-layer reconfiguration. In the assembly catalog, the top-to-bottom transition is represented as a shift from the top axial pattern to the bottom axial pattern:

$$
(5\epsilon_+ + 1\epsilon_-)_{\text{axial}} \to (2\epsilon_+ + 4\epsilon_-)_{\text{axial}}
$$

Equivalently, the active quark sector requires a $+3\epsilon_-,-3\epsilon_+$ axial-inventory change. In observer language this is the $W^+$ channel. In substrate language it is a transient payload and coupling event whose geometry, chirality selection, and energy routing still need closure.

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

with the active quark-level comparison

$$
d \to u + W^-,\qquad W^- \to e^- + \bar{\nu}_e
$$

Native label: free-neutron beta reaction.

The spectator structure is straightforward: one $u$ and one $d$ in the neutron pass through the reaction unchanged. The active channel is the second down-like assembly reconfiguring into an up-like assembly.

The axial-layer comparison is:

$$
(2\epsilon_+ + 4\epsilon_-)_{\text{axial}} \to (5\epsilon_+ + 1\epsilon_-)_{\text{axial}}
$$

So the active quark assembly has a three-unit decrease in negative-polarity axial occupancy and a matching three-unit increase in positive-polarity axial occupancy. The natural provenance hypothesis is that local neutral Noether sea material supplies the compensating polarity units while the released negative-polarity axial material participates in electron axial-layer formation.

#### Exposure-operator record

The controlled beta channel has a first finite-state exposure operator in [Weak-Mixing CKM](../../../../markdown/aaa/philosophy-history/theory-bridges/weak-mixing-ckm.md). The ledger record for this channel should use that operator as the geometry gate before any rate or provenance claim is made.

This gate inherits the unresolved spinor/helicity proof in [Angular Momentum and Spin](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md). The blocked right-handed branch, antineutrino orientation, and weak-channel angular-momentum balance remain provisional until the weak-coupling-triad exposure geometry and the reaction-level angular-momentum ledger are derived from the same substrate proof.

| Gate field | Beta-reaction record |
| --- | --- |
| Active assembly | One generation-I down-like quark inside the neutron |
| Spectators | One $u$ and one $d$ assembly pass through by identity |
| Exposure domain | $\Sigma_{\mathrm{WCT}}^{(L)}$ on the leading, phase-matched weak-coupling triad |
| Gate condition | Left-handed charged-current docking with $\lvert\Sigma_{\mathrm{WCT}}^{(L)}\rvert=3$ and active inventory $3\epsilon_-$ |
| Blocked condition | Right-handed $d$ channel has no charged-corridor docking in the finite-state model |
| Quark-side action | $A_{\Sigma}=3\epsilon_-\to3\epsilon_+$, with shielded inventory $A_{\mathrm{sh}}=(2\epsilon_+ + 1\epsilon_-)$ unchanged |
| Corridor payload | $W^-$ carries the opposite transaction $\Delta A_W=3(\epsilon_- - \epsilon_+)$, net charge $-e$ |
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

The lifetime benchmark should not be reduced to a single scalar until the experimental comparison channel is declared. The PDG neutron listing averages ultracold-neutron storage measurements at $\tau_n^{\mathrm{UCN}}=878.4\pm0.5\,\mathrm{s}$, while the in-beam trapped-proton result `YUE 13` reports $\tau_n^{\mathrm{beam}}=887.7\pm1.2_{\mathrm{stat}}\pm1.9_{\mathrm{syst}}\,\mathrm{s}$. The review does not use the beam row in the main average and treats the beam/storage split as a long-standing disagreement. In $\mathbb{A}\mathbb{A}\mathbb{A}$ terms, this is a method-resolved weak-reaction benchmark, not evidence by itself for a hidden reaction channel.

A native closure attempt should therefore publish two readouts from the same free-neutron beta-reaction record:

$$
\mathcal{R}_{\tau_n}^{\mathrm{method}}
=
\left(
\frac{\tau_n^{\mathrm{UCN}}-\tau_n^{\mathbb{A}\mathbb{A}\mathbb{A}}}{\sigma_{\mathrm{UCN}}},
\frac{\tau_n^{\mathrm{beam}}-\tau_{n,p}^{\mathbb{A}\mathbb{A}\mathbb{A}}}{\sigma_{\mathrm{beam}}}
\right)
$$

Here $\tau_n^{\mathbb{A}\mathbb{A}\mathbb{A}}$ is the storage-style survival lifetime predicted by the branch record, while $\tau_{n,p}^{\mathbb{A}\mathbb{A}\mathbb{A}}$ is the proton-counting readout in a beam geometry. The two entries must share the same weak-coupling-triad exposure, $V_{ud}$ overlap, lepton-provenance, recoil, and Noether sea rows. If the method residual remains nonzero after known detector, trap, wall-loss, and normalization systematics are represented at observer level, the residual stays an unresolved comparison pressure; it should not be promoted to hidden-channel ontology without explicit reaction provenance and null-result closure.

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

Cosmology-facing reaction claims need more than a source story. They need a record of what enters and exits each channel at the substrate level, and how those local channels become observer-level background quantities such as photon bath temperature, $N_{\text{eff}}$, light-element yields, redshift, and TT/TE/EE spectra.

This ledger separates four levels:

- **Ontology:** architrinos, Noether braids, axial layers, photon assemblies, and Noether sea state variables.
- **Reaction mechanics:** association, dissociation, planar-mode nucleation, pair production, recoil, and medium excitation.
- **Transport and thermalization:** opacity, scattering, cascade depth, diffusion, cooling, path-history redshift, and signed photon-frequency exchange.
- **Effective observables:** emissivity, light-element yield, blackbody spectrum, anisotropy, polarization, and inferred cosmological parameters.

### Leap Opportunity Record

The opportunity tracked here is a possible unification of four previously separate bookkeeping problems: radiative planar-mode nucleation, pair-production provenance, BBN photon loading, and CMB thermalization. The shared claim is not that these channels are already derived from one equation. The disciplined claim is that they may need one common provenance ledger because each asks the same question at a different scale: which assemblies, Noether braid material, energy-momentum terms, and Noether sea state variables enter and exit the channel?

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

The minimal useful first path is BBN photon loading: identify a source-zone radiation channel, record its event-level provenance, propagate it through the local thermalization assumptions, and show whether it can support effective $\eta_B\approx6\times10^{-10}$ during the deuterium bottleneck window.

### Shared Provenance Fields

| Field | What must be recorded | Why it matters |
| --- | --- | --- |
| Architrino inventory | $\epsilon_+/\epsilon_-$ counts, braid/axial-layer separation, and identity routing for recruited or returned substrate content | Prevents creation-from-nothing wording in pair and weak channels |
| Noether sea state | $\rho_{\text{NS}}(\mathbf X,T)$, $n(\mathbf X,T)$, $\chi_{\text{sea}}(\mathbf X,T)$, anisotropy, and excitation state | Keeps density, delay, and transport variables distinct |
| Noether sea recruitment and return | Neutral Noether braid content recruited into a reaction, returned to the ambient population, reclassified into another branch, or left as local excitation | Treats the Noether sea as a participant in vertices that change apparent inventory, not as a passive background |
| Radiation event record | Source assembly, trigger geometry, $\delta\Theta_a$, $E_{\text{exc}}$, $E_\gamma$, recoil, medium excitation, polarization handoff, causal-wake ledger, and closure status | Provides the local event schema that can be propagated into source-zone, transport, and observer-level cosmology claims |
| Photon assembly channel | Planar-mode nucleation threshold, emitted energy, direction, polarization basis, and transverse angular-momentum ledger | Links bremsstrahlung, synchrotron, and CMB photon-bath claims |
| Pair channel | Incoming photon assemblies, identity-routed recruited Noether braid content, final $e^+e^-$ assemblies, and recoil/medium excitation | Keeps pair production as association from local substrate content, not ex nihilo creation |
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

| Channel | Source document | Provenance target | Status |
| --- | --- | --- | --- |
| Bremsstrahlung planar-mode nucleation | [Bremsstrahlung](../../../../markdown/aaa/reactions/bremsstrahlung.md) | Record electron assembly energy loss, target recoil, photon assembly output, and medium excitation | Provisional map |
| Synchrotron planar-mode nucleation | [Synchrotron](../../../../markdown/aaa/reactions/synchrotron.md) | Derive photon output from curved charged-assembly transport in anisotropic Noether sea states | Provisional map |
| Breit-Wheeler pair channel | [Synchrotron](../../../../markdown/aaa/reactions/synchrotron.md) | Record incoming photon assemblies, recruited Noether braid content, and final $e^+e^-$ assemblies | Derivation target |
| BBN photon bath | [BBN Constraints](../../../../markdown/aaa/cosmology/BBN-constraints.md) | Show that pair, bremsstrahlung, synchrotron, and related channels maintain effective $\eta_B\approx6\times10^{-10}$ during the bottleneck window | Closure target |
| CMB thermal spectrum | [CMB](../../../../markdown/aaa/cosmology/CMB.md) | Show that source emission, transport, and thermalization produce a near-blackbody photon bath with allowed anisotropy and damping structure | Closure target |
| Horizon-interface photon release | [Black Holes](../../../../markdown/aaa/spacetime/black-holes.md#horizon-adjacent-photon-channel) and [CMB](../../../../markdown/aaa/cosmology/CMB.md#horizon-interface-photon-release-candidate) | Record photon-channel or photon-channel-adjacent packets processed near the symmetry-breaking threshold, including interior blueshift, exterior redshift, thermalization, and release-channel selection | Candidate strong-field source row |
| Intergalactic pair/reaction production | [CMB](../../../../markdown/aaa/cosmology/CMB.md), [Expansion Mechanism](../../../../markdown/aaa/cosmology/expansion-mechanism.md), and [Dark Matter](../../../../markdown/aaa/cosmology/dark-matter.md) | Inventory photon, neutrino, plasma, cosmic-ray, neutral-assembly, and Noether sea source components before using sparse visible matter as an ontology argument | Source-component target |
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

The provenance record must also include the source electron assembly, target assembly, source-depletion row, trigger geometry, $\delta\Theta_a$, local $\rho_{\text{NS}}(\mathbf X,T)$, $n(\mathbf X,T)$, $\chi_{\text{sea}}(\mathbf X,T)$, planar-mode threshold status, emitted photon assembly direction, recoil, medium excitation, causal-wake ledger, identity routing, closure status, and whether the event occurs in a regime where standard free-free emissivity remains the observer-level scaffold. Its polarization handoff inherits photon Gate B rather than deriving photon spin locally, and the record remains provisional until the event residual routes source, recoil, medium, wake, handoff, and remnant rows.

#### Synchrotron Emission

The event record must connect charged-assembly curvature, the effective magnetic-field map, source depletion, trigger geometry, $\delta\Theta_a$, $E_{\text{exc}}$, photon assembly output $E_\gamma$, recoil, medium excitation, causal-wake ledger, identity routing, and photon Gate B event residual. The closure target is to derive the standard $\nu_c \propto \gamma^2 B$ and $P_{\mathrm{syn}}\propto U_B\gamma^2$ scalings from Noether sea anisotropy and wake-strain threshold conditions rather than fitting a separate emission rule. Synchrotron polarization records inherit Gate B, so this ledger carries the transverse handoff without proving photon helicity locally.

#### Pair Production

The event record must avoid creation-from-nothing wording. Incoming photon assemblies trigger association of local substrate content into $e^+e^-$ assemblies when the observer-level threshold is satisfied. The incoming photons supply energy, momentum, polarization handoff, and trigger geometry; they do not supply new architrino identities. The incoming photons should preserve their radiation event records through the pair vertex. The pair-channel record must include:

- incoming photon assembly energies and directions,
- incoming photon polarization handoffs as inherited Gate B records,
- local Noether braid material recruited or reconfigured, including identity routing for the architrinos assigned to the final charged assemblies,
- final charged assembly inventories,
- recoil and medium-excitation terms,
- causal-wake ledger and closure status,
- and the standard-limit cross-section target.

This is the ledger distinction that ordinary absorption does not need: atomic or material capture closes the photon ledger into an existing target or medium record, while pair production closes the photon ledger and separately recruits identity-routed substrate content into new charged assemblies.

#### Intergalactic Pair And Reaction Source Components

Sparse visible matter between galaxies is not enough to close a cosmology source inventory. A reaction-cosmology packet should include a component row
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
for a declared window $W$. Here $N_A$ records neutral or dark assembly candidates, $S_{\mathrm{pair}}$ records pair or reaction production inside the window, and $S_{\mathrm{return}}$ records content returned to the Noether sea or reclassified after reactions. This row is a source-component inventory, not a proof of a specific production rate; it prevents "empty intergalactic space" from replacing the actual component ledger.

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

#### Horizon-Interface Photon Release

The strong-field photon-release row is the black-hole version of source-to-transport provenance. It applies when a photon-channel packet, or a photon-channel-adjacent dark-sector mode, is processed near the horizon-interface symmetry-breaking threshold before contributing to an exterior radiative, jet, diffuse, or CMB-facing channel.

The minimum record must include:

- the selected horizon-interface label ensemble $\mathcal{B}_H$ or finite strong-field branch record;
- incoming and outgoing photon-channel frequencies $\nu_{\gamma}^{-}$ and $\nu_{\gamma}^{+}$ for every retained strong-field segment;
- whether each segment is blueshift, redshift, trapping, conversion, thermalization, or release;
- the horizon-interface energy row $\Delta E_H$ together with medium, recoil, remnant, and returned Noether sea rows;
- the Gate A and Gate B handoffs for any packet still treated as a photon after the segment;
- the release selector that routes the output into jet, diffuse radiative, dark-sector, CMB thermalization, or later visible-conversion channels.

The strong-field exchange residual is inherited from the black-hole chapter:
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

This row is a candidate source mechanism, not a completed CMB derivation. It becomes cosmology-facing only after the emitted or converted packet is propagated through the CMB thermalization, distortion, anisotropy, polarization, and redshift handoff checks. A high-energy interior photon population that cannot be routed through those checks may remain a black-hole release-channel hypothesis, but it cannot be used as a CMB source.

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

For coherent redshift transport, the exchange row should also expose the response curve rather than treating frequency change as a fitted scalar. For a path segment $s$ and photon packet $\gamma$, write
$$
\Delta\ln\nu_{\gamma,s}
=
-\mathcal{Y}_{\gamma,s},
\qquad
\mathcal{Y}_{\gamma,s}
=
\int_{\gamma_s}
\mathcal{K}_{\nu}
\!\left(
\Theta_{\gamma},
\theta_{\mathrm{sea}},
\nabla\theta_{\mathrm{sea}},
\Theta_{\mathrm{med}}
\right)\,ds.
$$
The segment-level energy closure remains
$$
\Delta E_{\gamma,s}
+
\Delta E_{\mathrm{sea,path},s}
+
\Delta E_{\mathrm{recoil/rem},s}
=0.
$$
The kernel $\mathcal{K}_{\nu}$ is a derivation target, not a free redshift law. It must state whether the segment is coherent transparent transport, thermalizing exchange, spectral distortion, capture, or carrier exit, and it must preserve the same photon packet identity unless a reaction or remnant row explicitly terminates it.

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
| Single Noether braid temperature mistake | A single excited Noether braid is treated as thermodynamically hot rather than internally excited, closure-mismatched, or metastable | Temperature is being used before an ensemble distribution or entropy-energy relation has been established |
| Inventory gap | Architrino inventory, Noether braid recruitment, recoil, or returned medium content cannot be balanced without unrecorded substrate creation | Pair and radiation channels cannot be promoted beyond provisional maps |
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
\chi_\gamma(\omega_a,\mathbf X,T)
-
\chi_\gamma(\omega_b,\mathbf X,T)
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

* **Constraint** – Shapiro delay and light bending must match GR within the Cassini-scale PPN bound, conventionally summarized as $\gamma-1=(2.1\pm2.3)\times10^{-5}$ or a few $\times10^{-5}$.
* **Architrino Interpretation** – signals propagate through Euclidean space, but observer-level paths are effective travel-time extremals in the Noether sea delay map. The perceived delay or curvature arises from $\chi_{\text{sea}}$ responding to spatial variations in $\rho_{\text{NS}}$ and related Noether sea state variables.
* **Validation Target** – in the corpus-wide $(-,+,+,+)$ convention, map $g_{00}^{\mathrm{eff}} \approx -(1+2\Phi_N/c_0^2)$ onto the refractive slowing experienced by Noether sea signals moving through the Euclidean void with Noether sea delay.

#### Gravitational Time Dilation

We require that the proposed mechanical slowing induced by Noether braid density aligns quantitatively with geodetic and redshift observations such as GPS offsets and the Pound–Rebka experiment, offering a concrete mapping between the new microphysics and the classical time-dilation effects.

* **Constraint** – reproduce GPS clock offsets (38 μs/day), the Pound–Rebka redshift, and height-resolved optical-clock redshift with $\Delta\nu/\nu\approx gL/c_0^2$; this includes the approximate scales $1.1\times10^{-19}$ across $1\,\mathrm{mm}$ and $3.6\times10^{-17}$ across $33\,\mathrm{cm}$ near Earth's surface.
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
  with $\Delta h_A(t_{\mathrm{eff}})=h_A(t_{\mathrm{eff}};\rho_1,\theta)-h_A(t_{\mathrm{eff}};\rho_2,\theta)$, must remain below the declared which-path threshold for any interference-preserving run unless a record-forming separatrix crossing and persistence window are also derived.
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
| Magnetic-charge or monopole sectors | monopole event rate, effective magnetic-charge flux, stable relic abundance, long-range magnetic-charge force | monopole-search, collider, cosmic-ray, and cosmological abundance bounds | the same effective gauge record that recovers electric charge, loop phase, and electromagnetic force must prove the magnetic-charge sector absent, redundant, or below bounds |
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
| Magnetic-charge / monopole sectors | $(R_m,Q_{m,\mathrm{eff}},\mathcal{F}_{m,\mathrm{eff}},\Omega_{\mathrm{mon}})$ | $O_m^{\max}$ | [Gauge Structure Emergence](../../../../markdown/aaa/assemblies/gauge-structure-emergence.md) | [Gauge Symmetries](../../../../markdown/aaa/assemblies/gauge-symmetries.md), [Constraint Ledger](../../../../markdown/aaa/validation/constraint-ledger.md) |
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
| $\mathcal{C}_{\mathrm{hadronic}}$ | An accepted branch family $A$, exposure quotient, color/topology ledger, residual strong channel set, and $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ close confinement, quark mass, baryon-stability, and nuclear-binding rows. | $\mathcal{B}_{\mathrm{hadronic}}(\theta)$ lies in the confinement, quark-hierarchy, proton-stability, deuteron, saturation, and alpha-like benchmark region within $\epsilon_{\mathrm{hadronic}}$. | The sector predicts generic fast proton decay, unphysical nuclear binding signs, missing color/topology closure, or an unbalanced architrino / Noether braid inventory. |
| $\mathcal{C}_{\mathrm{radiation}}$ | A radiation residual $\mathcal{R}_{\Theta}$ selects admissible channels from $\{B_i\}$ and closes $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ with photon output, recoil, medium update, signed photon-frequency exchange, non-radiative remnant, or reaction rows explicitly recorded. | $\mathcal{B}_{\mathrm{radiation}}(\theta)$ lies in the Larmor/Lienard, bremsstrahlung, synchrotron, pair-threshold, Compton-like, SZ-like transfer, and blackbody benchmark region within $\epsilon_{\mathrm{radiation}}$. | Any benchmark requires per-observable retuning, untracked energy loss or gain, a missing recoil/provenance row, a free longitudinal photon mode, or a blackbody fit not tied to the event ledger. |
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
| Radiation-cosmology split | $I(c)$ fits blackbody recovery with $\chi_{\text{sea}}^{\mathrm{CMB}}(\mathbf X,T)$ incompatible with the BBN or local radiation event ledger. | $\mathcal{C}_{\mathrm{cosmology}}\!\mid c=\varnothing$ or $\delta_{\mathrm{cosmology}}(c)<0$. | `cosmology.incompatible_transport_limit` |
| Quantum signal leak | $I(c)$ recovers Bell correlations through a detector kernel that transfers controllable signals outside the causal-wake ledger. | $\mathcal{C}_{\mathrm{quantum}}\!\mid c=\varnothing$ and the same record damages $\mathcal{C}_{\mathrm{gravity}}$ through preferred-frame leakage. | `quantum.signal_transfer` |
| Event-ledger omission | $I(c)$ routes radiation, reaction, measurement, or strong-field release without a required $E$, $\mathbf{p}$, $\mathbf{J}$, polarity, provenance, medium, or remnant row. | The target sector using that event has no admissible $\mathcal{L}_{E\mathbf{p}\mathbf{J}}$ completion. | `event.missing_ledger_row` |
| Null-result violation | $I(c)$ predicts a non-baseline channel $e\in\mathfrak{E}_{\theta}^{\mathrm{new}}$ with $O_e(\theta)>O_e^{\max}$ in a tested regime. | The relevant sector gate may fit its positive benchmark, but the shared closure record fails $\mathcal{R}_{\mathrm{null}}(\theta)=0$. | `null.observed_absence_violation` |

### Testable Failure Modes

| Failure mode | Mathematical test | Routed workstream |
| --- | --- | --- |
| Empty intersection | $\mathcal{C}_{\mathbb{A}\mathbb{A}\mathbb{A}}=\varnothing$ or $\operatorname{Ext}_S(c)=\varnothing$ for a proposed local promotion. | [Known Tensions](../../../../markdown/aaa/validation/known-tensions.md), [Closure Scorecard](../../../../markdown/aaa/validation/closure-scorecard.md) |
| Hidden tuning | A shared variable or map has sector-specific values $p_S\ne p_T$ with no recorded state variable, or the same benchmark family is recovered only by changing $\Pi_S$, $Q_S$, $\mathcal{R}$, $\{B_i\}$, the branch-chart revision record, equality map, root-coordinate split, $\mathcal{M}_{\mathrm{sea}}^{ab}$, $\rho_{\text{NS}}(\mathbf X,T)$, or $\chi_{\text{sea}}(\mathbf X,T)$ between cases. Branch-chart revisions selected after residual inspection rather than declared from branch geometry fail this test. | [Parameter Ledger](../../../../markdown/aaa/validation/parameter-ledger.md), [Constraint Ledger](../../../../markdown/aaa/validation/constraint-ledger.md) |
| Null-result violation | $\mathcal{R}_{\mathrm{null}}(\theta)>0$ for a predicted added channel in a validated comparison regime. | [Known Tensions](../../../../markdown/aaa/validation/known-tensions.md), [Constraint Ledger](../../../../markdown/aaa/validation/constraint-ledger.md) |
| Missing conservation/provenance field | $\mathcal{L}_{E\mathbf{p}\mathbf{J}}(\mathsf e)$ has an undefined or nonzero required ledger entry after all claimed outputs, recoil, medium updates, remnants, polarity / charge, architrino inventory, transmitter identity, emission time, causal-root branch, and branch-Jacobian records are included. | [Reaction Ledger](../../../../markdown/aaa/validation/reaction-ledger.md), [Reaction-Cosmology Provenance Ledger](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md) |
| Benchmark-only fitting | A target benchmark in $\mathfrak{B}^{\mathrm{obs}}_S$ is used as an input to $\mathcal{L}_A$, $\Pi_S$, $Q_S$, $\mathcal{R}$, $\{B_i\}$, a branch-chart revision, an equality map, a root-coordinate split, or $\mathcal{M}_{\mathrm{sea}}^{ab}$ rather than as an output of a replayable closure record. | [Particle Masses](../../../../markdown/aaa/assemblies/particle-masses.md), [Measurement Ontology](../../../../markdown/aaa/quantum/measurement-ontology.md), [Radiation](../../../../markdown/aaa/reactions/radiation.md) |
| Incompatible effective limits | Two sectors require asymptotic maps whose overlap is empty, for example incompatible weak-field metric limits, photon / radiation limits, blackbody / BBN transport limits, or quantum no-signaling / gravity causal limits. | [Known Tensions](../../../../markdown/aaa/validation/known-tensions.md), [General Relativity](../../../../markdown/aaa/spacetime/general-relativity.md), [Cosmology Ontology](../../../../markdown/aaa/cosmology/cosmology-ontology.md) |

### Preferred-Frame Hiding Stop Condition

1. **Hard wall:** If the Euclidean-void rest frame is detectable by any physical experiment, for example a Michelson-Morley-type null test, at $\Delta c/c > 10^{-17}$, the theory fails.
2. **Required compensation:** Moving assemblies must acquire the Lorentz-compatible deformation and clock laws, $L_{\parallel}=L_0/\gamma$ and $T=\gamma T_0$, from delayed causal closure and Noether sea response rather than from kinematic postulates.
3. **Coefficient closure:** Clock, ruler, signal, and metric response coefficients must suppress two-way anisotropy and other preferred-frame leakage to the validated bounds. A qualitative contraction story is not sufficient.
4. **Dissipative drag:** If the Noether sea induces ordinary drag that slows cosmological bodies without a conserving medium-dressed response mechanism, the theory is falsified.

### Critical Stop Conditions

- **$c_f$ variance:** If field speed varies in the Euclidean void, the theory fails.
- **Noether sea drag:** If the Noether sea causes orbital decay or secular kinetic-energy loss through ordinary dissipative drag, rather than a reversible medium-dressed inertial response, the theory fails.
- **Lorentz leakage:** If absolute motion affects atomic spectra above $10^{-17}$, the theory fails.
- **Empty shared intersection:** If quantitative development makes $\mathcal{C}_{\mathbb{A}\mathbb{A}\mathbb{A}}=\varnothing$, the implementation is rejected even if individual sector chapters remain locally suggestive.

## No Go Theorems

This chapter classifies the formal obstruction results that act as validation filters for $\mathbb{A}\mathbb{A}\mathbb{A}$. A no-go theorem is not useful here as a decorative citation. It is useful only when its assumptions, conclusion, and replacement burden can be recorded against a candidate closure.

A no-go theorem has a simple shape: if these assumptions are accepted, this conclusion cannot be avoided. That does not automatically defeat a theory that rejects one of the assumptions. It does mean the theory now owes a replacement mechanism for the tested behavior that the theorem was protecting.

This page is the bookkeeping layer for that debt. It separates direct falsifiers from assumption mismatches, and it prevents the easy mistake of saying "that theorem does not apply" while quietly keeping the theorem's validated target.

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
| [Gleason probability measure](https://doi.org/10.1512/iumj.1957.6.56050) | `replacement constraint` | The theorem assumes a real or complex Hilbert space of dimension at least three and one normalized, countably additive, noncontextual probability measure on its closed subspaces or projectors. Hilbert-space projectors are not substrate ontology, but the protected benchmark is the Born-form consistency of probabilities across every calibrated orthogonal resolution of the same effective state. | Derive one apparatus-conditioned event measure from basin and preparation records, then show that its probabilities are normalized and additive over mutually exclusive outcomes and assign the same marginal to the same effective projector across overlapping calibrated contexts. Failure occurs if Born weights are inserted, if each basis receives an independently fitted measure, or if the theorem is invoked for a two-dimensional effective space without an additional continuity, POVM, or composite-system extension. |
| [Kochen-Specker noncontextual values](https://doi.org/10.1512/iumj.1968.17.17004) | `replacement constraint` | The theorem applies to Hilbert spaces of dimension at least three and assumes a context-independent value assignment that respects the functional relations among commuting observables. Such a global effective value map is not a substrate assumption. Effective operator values exist only after a preparation, apparatus kernel, coarse-graining, and record channel are declared. The protected benchmark is the quantum contextuality pattern: commuting context products, compatible shared marginals, and the absence of a global noncontextual value map in validated regimes. | Derive context-indexed apparatus records $r_{O,C}=R_{O,C}(\Phi_{\tau_C}^{\mathrm{tot}}(\Gamma_0;\mathcal{K}_C))$ from one substrate flow, while recovering the declared context product constraints and shared-observable marginals. Failure occurs if the closure silently assigns substrate values to all effective operators, changes the target state per context, applies the theorem outside its dimension and functional-relation assumptions, or recovers contextuality only by making apparatus records inconsistent across overlapping calibrated contexts. |
| [Pusey-Barrett-Rudolph quantum-state reality theorem](https://doi.org/10.1038/nphys2309) | `replacement constraint` | The theorem assumes that distinct pure quantum states correspond to overlapping distributions over ontic states and that independently prepared systems have product ontic distributions. Preparation independence and ontic-state overlap are not substrate axioms; the wavefunction is observer-level bookkeeping rather than a primitive physical field. The protected benchmark is stronger: independently prepared systems must have declared preparation records, product or non-product provenance status, and the standard state-discrimination statistics. | A candidate wavefunction account must state whether its substrate preparation measure factorizes for independently prepared systems and must expose any provenance correlation needed to avoid the theorem. Failure occurs if the model treats overlapping effective wavefunctions as harmless while also accepting product preparation independence and the PBR measurement statistics, or if it evades the theorem by hiding unrecorded correlations between supposedly independent preparation devices. |
| Leggett-Garg temporal-correlation inequalities | `replacement constraint` | Macroscopic realism per se and noninvasive measurability are not substrate axioms. A measurement in $\mathbb{A}\mathbb{A}\mathbb{A}$ is a physical apparatus-target coupling, so temporal readouts may disturb later basin dynamics; the protected benchmark is the observed sequential-correlation data together with an explicit disturbance ledger. | A candidate measurement account must declare the apparatus kernels used at each time, recover the tested temporal correlators, and report whether earlier probes perturb later record statistics. Failure occurs if the model asserts a definite macro-trajectory with noninvasive readout while accepting a Leggett-Garg violation, or if it explains the violation only by untracked apparatus disturbance rather than a declared record-channel residual. |
| Frauchiger-Renner / Wigner-friend observed-observer consistency | `replacement constraint` | The standard no-go setup assumes that quantum state descriptions can be applied to other theory-users, that one observer may import another observer's certified certainty, and that one declared record channel cannot certify mutually exclusive outcomes. $\mathbb{A}\mathbb{A}\mathbb{A}$ rejects an external classical-observer cut, but it also rejects importing another observer's conclusion without a physical record channel, access region, apparatus kernel, and boundary-data model. | A measurement closure that includes observed Physical Observers must derive every imported statement from the same substrate flow, record-autonomy test, and finite communication channel used for ordinary apparatus records. Failure occurs if a model needs a hidden external observer, lets a Physical Observer import certainty without a durable record, treats an unbuildable reference/readout setup as a completed experiment, or allows two mutually exclusive outcomes to be certified inside one declared record channel. If the reference or readout channel cannot satisfy the physical record criteria, the thought experiment is blocked by realizability rather than promoted into ontology. |
| Groenewold-van Hove / global quantization map | `replacement constraint` | A global quantization map from all classical observables $C^\infty(M)$ to Hilbert-space operators, preserving every Poisson bracket as a commutator, is not a substrate assumption. The protected benchmark is narrower: in validated quantum regimes, the selected observer-level observables must recover the tested commutator algebra on the calibrated record domain. | Derive an admissible observable set from the same coarse-graining, apparatus kernel, retained path-history data, and record window used for the effective operator model, then bound the quantization-domain residual in [Quantum Operator Mapping](../../../../markdown/aaa/philosophy-history/theory-bridges/quantum-operator-mapping.md#admissible-quantization-domain-guardrail). Failure occurs if a closure claims bracket-to-commutator recovery for all smooth classical functions, uses a choice of polarization or representation as hidden ontology, or changes the observable domain per benchmark without recording the physical apparatus and coarse-graining that justify the restriction. |
| Lorentz invariance and preferred-frame tests | `direct` | Observer-level clock, ruler, two-way signal, PPN, and spectral bounds apply directly to any candidate effective metric or transport map. | Bound $\epsilon_{\mathrm{LV}}$, $\Delta_{\mathrm{tw}}(\beta_f)$, PPN parameters, spectra, and gravitational-wave-speed differences within recorded limits. Failure occurs when absolute motion is detectable above the accepted thresholds. |
| Spin-statistics / exchange | `replacement constraint` | Local Lorentz-QFT axioms are not fundamental substrate assumptions, but matter stability and exchange classes are validated effective constraints. | Derive the ordered-frame lift, $4\pi$ spinor behavior, and bosonic/fermionic exchange classes from Noether braid topology and angular-momentum ledger. Failure occurs if the lift cannot separate fermionic and bosonic closure classes. |
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
where $E_\theta(C)$ is the product expectation for the declared apparatus context and $[x]_+\equiv\max(x,0)$. For a Hardy setup, $U_i$ and $D_i$ are the two calibrated binary measurement settings on wing $i\in\{1,2\}$, and the displayed probabilities come from four distinct setting pairs: $(D_1,D_2)$, $(U_1,U_2)$, $(D_1,U_2)$, and $(U_1,D_2)$. They must therefore be assembled from those four declared apparatus contexts rather than treated as one joint context. Use the zero-probability constraints and positive Hardy event as a margin:
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

This chapter is the pressure ledger for unresolved closure burdens. Its purpose is to collect the burdens that matter most for closure without mixing them with vague future ideas or low-stakes wishlist items.

### Purpose

This chapter is the pressure ledger for $\mathbb{A}\mathbb{A}\mathbb{A}$. It collects the places where the framework is not yet closed, where the derivation stack is thinner than the claim it supports, or where observations impose a hard quantitative burden that the corpus has not yet fully carried.

This page is not a dumping ground for vague uncertainty. Each tension should identify:

- the issue,
- why it matters,
- the repo status,
- the closure target,
- and the failure condition.

### Severity Scale

- **Tier 1:** could directly falsify the architecture if not resolved.
- **Tier 2:** does not immediately kill the architecture, but blocks a serious Standard-Model or GR-level closure claim.
- **Tier 3:** important downstream completion issue, but not yet the main credibility gate.

### Pressure Ledger

| Tier | Issue | Why it matters | Repo status | Closure target | Failure condition |
| --- | --- | --- | --- | --- | --- |
| 1 | Weak `V-A` selection rule | The weak interaction must distinguish left-chiral fermions from right-chiral ones. | [quantum-number-mapping.md](../../../../markdown/aaa/assemblies/fermions/quantum-number-mapping.md) gives a geometric lock-out story, and [weak-mixing-ckm.md](../../../../markdown/aaa/philosophy-history/theory-bridges/weak-mixing-ckm.md) identifies this as part of the shared weak-coupling-triad exposure problem, but no operator derivation is complete. | Derive a docking or coupling operator that exposes the weak-coupling triad for left-handed charged-current coupling, hides it for right-handed charged-current coupling, and then reuses the same domain for CKM/PMNS overlap and weak-reaction provenance. | If right-handed neutrino or right-handed charged-fermion coupling to `W` is not strongly suppressed in the same regime, or if the exposure domain must be redefined separately for mixing and provenance, the weak-sector picture fails. |
| 1 | Preferred-frame leakage | The ontology has absolute time and a medium, so observer-level Lorentz hiding must be quantitative. | The requirement is clear in [constraint-ledger.md](../../../../markdown/aaa/validation/constraint-ledger.md), and [Lorentz Kinematics](../../../../markdown/aaa/spacetime/lorentz-kinematics.md) states the moving-assembly coefficient targets plus the translating-binary residual test, but the full attractor proof is not complete. | First solve the translating two-body branch and test $T_u/T_0=\gamma_f$ and $L_{\parallel}/L_{\perp}=1/\gamma_f$ on the same causal-root ledger; then show that Noether braid clocks, rulers, and signal transport suppress measurable preferred-frame effects below recorded experimental bounds through coupled shape, clock, and two-way anisotropy closure. | Any robust preferred-frame signal above the recorded bounds, a non-Lorentzian binary residual that cannot be traced to a controlled branch feature, or any need to tune clock and ruler coefficients independently falsifies the observer-level spacetime closure. |
| 1 | Born-rule derivation | Quantum replacement claims are not credible without a basin-measure or equivalent statistical closure. | [wavefunction-ontology.md](../../../../markdown/aaa/quantum/wavefunction-ontology.md) and [measurement-ontology.md](../../../../markdown/aaa/quantum/measurement-ontology.md) fix the ontology; [quantum-operator-mapping.md](../../../../markdown/aaa/philosophy-history/theory-bridges/quantum-operator-mapping.md) states the finite-time invariant-measure, thermodynamic ensemble consistency, and admissible quantization-domain targets, but the derivation is still open. | Derive outcome weights from deterministic basin measures in the same regime that yields the effective wave equation, show that the same finite-window measure projects to the thermodynamic summaries used for apparatus irreversibility, decoherence, and record formation, and restrict effective operators to a physically declared observable domain rather than a global quantization of all classical functions. | If the deterministic closure produces a non-Born weighting in validated regimes, if Born weights and thermodynamic summaries require incompatible measures, or if the operator map requires ad hoc observable-domain changes per benchmark, the quantum story fails. |
| 1 | Weak-field GR recovery | Redshift, Shapiro delay, lensing, and orbital tests must come from one constitutive map. | The interface exists in [general-relativity.md](../../../../markdown/aaa/spacetime/general-relativity.md) and [ppn-parameters.md](../../../../markdown/aaa/spacetime/ppn-parameters.md), but the shared fit is incomplete. | Produce one reusable parameter set for the weak-field metric map. | If different observables require incompatible constitutive coefficients, the emergent-metric program fails. |
| 2 | Low-energy quantum-gravity EFT recovery | Quantized metric methods are not $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology, but their long-distance effective predictions are fixed by known low-energy degrees of freedom. | [general-relativity.md](../../../../markdown/aaa/spacetime/general-relativity.md) and [emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md) state the classical weak-field map; they need an explicit observer-level GR-EFT recovery gate. | Recover the standard long-distance quantum correction to the Newtonian potential using the same weak-field constitutive record that supports PPN, redshift, Shapiro delay, lensing, and gravitational-wave speed. | If the calculable low-energy quantum correction requires an independent coefficient set, spacetime closure is incomplete even if the classical observables are matched. |
| 2 | Parameter non-closure | Too many symbols remain geometric promises rather than fixed quantities. | [parameter-ledger.md](../../../../markdown/aaa/validation/parameter-ledger.md) organizes them, but most are still open. | Close $\kappa$, the mass prefactor, the metric constitutive coefficients, and the weak-mixing datum without per-observable retuning. | If the same symbol has to be re-fit independently across chapters, the closure claim weakens sharply. |
| 2 | Null-result closure for added channels | A unification claim can fail even while matching known positive benchmarks if it predicts extra channels that experiments have not seen. | [failure-criteria.md](../../../../markdown/aaa/validation/failure-criteria.md) defines $\mathcal{R}_{\mathrm{null}}(\theta)$ for predicted non-baseline channels, but the main sector ledgers have not all routed their null-result bounds through that residual. The concrete comparison cases are mirror matter, superpartners, proton-instability channels, extra gauge bosons, hidden transport modes, sterile or neutral partner branches, and preferred-frame leakage channels. | For every added partner family, unstable baryon channel, extra gauge or transport mode, preferred-frame leakage channel, or other non-baseline output, compute $O_e(\theta)$ and show $O_e(\theta)\le O_e^{\max}$ from the same shared closure record used for the positive benchmarks. A symmetry container that includes the Standard Model as a subcase passes only when the added channels are proven absent, exactly redundant, or below bounds by the same branch record that recovers the observed sector. | If unobserved channels are hidden only by sector-specific masses, thresholds, compactification-like assumptions, or disconnected suppression factors, the framework has reproduced the failure pattern of overextended unification rather than closing it. |
| 2 | Thermodynamic-gravity closure | If the metric is an emergent equation of state, the repo needs more than constitutive rhetoric. | [emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md) states the Noether sea-first picture, defines a local-horizon residual $\mathcal{R}_{\mathrm{thermo}}(\theta)$, and links the proof scaffold to [Thermodynamic Residual](../../../../markdown/aaa/validation/simulations/thermodynamic-residual.md); [black-holes.md](../../../../markdown/aaa/spacetime/black-holes.md) frames horizon entropy as a block-density count over horizon-compatible reduced Noether braid closure labels. No run has yet driven the residual small from a simulated Noether sea record. | Show that the Noether sea admits an area-scaling entropy channel $S_H=k_B\log\lvert\mathcal{B}_H\rvert$ whose local coefficient is recovered as a block entropy density, a local Rindler/Unruh recovery in the appropriate limit, a Jacobson-style $dQ=T_UdS$ residual for boundary-wake data, Page-curve-compatible information release through horizon-interface channels, and a controlled nonequilibrium regime where distinctive departures are predicted. | If GR-like recovery requires thermodynamic language but the Noether sea cannot supply area scaling, local horizon temperature, a shared stress/entropy/temperature record, Page-curve-compatible information accounting, or a coherent nonequilibrium boundary, the gravity interpretation loses depth and may be mislocated. |
| 2 | Reaction-cosmology provenance closure | The local-reaction story and the cosmology-source story now meet at photon loading, pair production, signed photon-frequency exchange, and thermalization. | [reaction-cosmology-provenance-ledger.md](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md) defines the shared ledger, including path-frequency exchange, but no full source-to-background path has been closed. | Produce one conserved provenance path from a radiation, pair, or Compton/SZ-like transfer channel through thermalization to a BBN or CMB observable, using the same Noether sea state variables throughout. | If BBN photon loading, CMB blackbody recovery, or redshift-budget reconstruction requires unbalanced substrate creation, unlogged photon energy transfer, per-source retuning, or incompatible thermalization assumptions, the local-recycling cosmology branch fails. |
| 2 | Shared cosmology state closure | Dark-energy, $H_0$, $S_8$, CMB, BBN, BAO, weak-lensing, redshift-budget, and pre-BBN comparison claims all consume overlapping Noether sea state variables. | [cosmology-ontology.md](../../../../markdown/aaa/cosmology/cosmology-ontology.md), [dark-energy.md](../../../../markdown/aaa/cosmology/dark-energy.md), and [hubble-s8-tensions.md](../../../../markdown/aaa/cosmology/hubble-s8-tensions.md) state the shared-state requirement; [inflation-model.md](../../../../markdown/aaa/cosmology/inflation-model.md#pre-bbn-comparison-gate), [BBN-constraints.md](../../../../markdown/aaa/cosmology/BBN-constraints.md#pre-bbn-handoff-gate), [structure-formation.md](../../../../markdown/aaa/cosmology/structure-formation.md#cmb-lensing-and-acoustic-peaks), and [gravitational-waves.md](../../../../markdown/aaa/spacetime/gravitational-waves.md#early-universe-stochastic-background-gate) route pre-BBN branch projections through the same record; [simulations/cosmology-shared-residual-fit.md](../../../../markdown/aaa/validation/simulations/cosmology-shared-residual-fit.md) supplies the first mock residual-packet scaffold; and [dark-energy.md](../../../../markdown/aaa/cosmology/dark-energy.md) gives a thermodynamic $\Lambda_{\mathrm{eff}}$ conjugacy target, but no empirical joint residual fit exists. | Produce one $\theta_{\mathrm{sea}}$ and projection family that keeps SN, BAO, CMB, WL, RSD, BBN, $H_0$, $S_8$, signed path-frequency-transfer rows, pre-BBN branch projections, and stochastic-background bounds inside tolerance without per-pipeline retuning; if $\Lambda_{\mathrm{eff}}$ is treated thermodynamically, derive it as a conjugate to an effective observer-level four-volume functional of the same $\theta_{\mathrm{sea}}$. | If distance, growth, early-universe, calibration, path-frequency-transfer, pre-BBN branch, stochastic-background, or thermodynamic-$\Lambda_{\mathrm{eff}}$ observables require incompatible Noether sea state records, the cosmology branch has hidden the tension rather than closed it. |
| 2 | Radiation Gate C benchmark closure | Radiation must recover standard electromagnetic and QED-like benchmarks before Noether sea-dependent deviations or cosmology source claims are credible. | [radiation.md](../../../../markdown/aaa/reactions/radiation.md) carries a classified closure-target ledger, with channel scaffolds in [bremsstrahlung.md](../../../../markdown/aaa/reactions/bremsstrahlung.md), [synchrotron.md](../../../../markdown/aaa/reactions/synchrotron.md), and [reaction-cosmology-provenance-ledger.md](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md), but no unified Gate C derivation is complete. | Close Larmor/Lienard recovery, free-free emissivity, synchrotron $\gamma^2B$ and power scaling, pair thresholds, Compton-like scattering, and blackbody detailed balance through one event record, while treating free photon polarization as a Gate B handoff only. | If any benchmark requires per-observable retuning, violates validated limits, or derives free photon polarization outside Gate B, radiation Gate C does not close. |
| 2 | CKM / PMNS quantitative closure | Flavor mixing cannot remain only qualitative if the framework claims Standard-Model replacement. | PMNS oscillation formulas exist; CKM geometry has an overlap/holonomy scaffold tied to the same weak-coupling-triad exposure route as `V-A` and reaction provenance. | Derive one geometric overlap map for quark and lepton mixing from the exposed weak-coupling-triad domain, shielding eigenstates, and near-photon neutral-sector Hamiltonian, then test it against CKM and PMNS data. | If no stable geometry reproduces the observed hierarchy and phases, or if the CKM/PMNS definitions require a different weak-basis domain from the `V-A` operator, the mixing architecture is incomplete at best. |
| 2 | Quark mass map | The quark catalog is in place, but the mass hierarchy is still not quantitative. | [quarks.md](../../../../markdown/aaa/assemblies/fermions/quarks.md) closes structure, not masses. | Produce a first-pass mass map for `u,d,c,s,t,b` from shielding and internal-energy accounting. | If the hierarchy cannot be reproduced even at scaling level, generation-by-shielding is in trouble. |
| 2 | Spin / statistics closure | The framework repeatedly appeals to spinor and bosonic/fermionic behavior. | A partial $4\pi$ story exists, but not a formal closure proof. | Derive the ordered-frame history-lift map cleanly enough to justify spin-$\tfrac{1}{2}$ and associated statistics sectors. | If the topology cannot distinguish fermionic and bosonic closure classes, several assembly claims lose their footing. |
| 2 | Baryon stability and baryon-number status | Proton stability is a major empirical constraint and a major theoretical claim. | The color chapter gives a topological argument, but the quantitative baryon-number status remains open. PDG 2024 comparison bounds already put representative partial mean lives at $\tau/B(p\to e^+\pi^0)>2.4\times10^{34}\,\mathrm{yr}$ and proton neutrino/kaon modes near $5.9\times10^{33}\,\mathrm{yr}$ at 90% confidence, so this is an active null-result gate rather than a qualitative concern. | Show whether proton stability is exact, exponentially protected, or only effective in a quantified regime, and route every predicted baryon-violating corridor through $\Gamma_{p,c}^{\max}=1/\tau_{c}^{\min}$ in [Failure Criteria](../../../../markdown/aaa/validation/failure-criteria.md). | If the theory predicts generic fast proton decay, or suppresses it by a sector-local parameter not tied to the same color/topology and reaction-provenance ledger that recovers hadron structure, the hadronic sector is not viable. |
| 3 | Nuclear binding closure | The residual strong-force story must eventually recover nuclear phenomenology beyond pions-as-metaphor. | [nuclear-binding.md](../../../../markdown/aaa/nuclear-atomic/nuclear-binding.md) gives a first effective interface, but no fitted nuclear map. | Recover at least deuteron binding, saturation, and alpha-like enhancement in one coherent effective model. | If even the sign and scaling of nuclear binding cannot be stabilized, the hadronic coarse-graining is inadequate. |
| 3 | Condensed-matter branch recovery | Materials provide dense, precise tests of whether electron-envelope, lattice, phonon, and Noether sea response variables remain one record instead of becoming probe-specific fits. | [condensed-matter.md](../../../../markdown/aaa/nuclear-atomic/condensed-matter.md) states Bloch-band, effective-mass, Fermi-surface, diffraction, phonon, Hall, and topological-response residuals; [constraint-ledger.md](../../../../markdown/aaa/validation/constraint-ledger.md) records the corresponding response gate. No derivation yet computes these objects from the master equation or a settled material branch. | Recover Bloch form, reciprocal-lattice scattering, phonon dynamical matrices, effective mass tensors, Fermi-surface or band-gap classification, Hall sign/plateaux, and no-drag transport from one declared material branch and Noether sea state record. | If band curvature, lattice stiffness, diffraction peaks, Hall response, and transport relaxation require independent response maps, or if resistance is explained by ordinary Noether sea drag below the transport threshold, the material-response program has split from the main ontology. |
| 3 | Strong-field / black-hole closure | Strong-field claims are distinctive and therefore risky. | The alignment framing exists, but the predictive map is not yet broad. | Derive concrete departures near the alignment regime while preserving weak-field success. | If the strong-field story contradicts weak-field closure or observed compact-object data, it must be revised. |

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

The weak-selection problem, right-handed neutrino stance, CKM/PMNS closure, weak-corridor provenance, and the quark misalignment parameter $\alpha$ all belong to the same electroweak geometry stack. The synthesis is that these are readouts of one weak-coupling-triad exposure problem: axial-frame branch selection determines what can be exposed, the `V-A` operator determines which handedness can dock, the overlap integrals determine mixing weights, and the reaction ledger determines where the corridor payload and outgoing Noether braid provenance enter and exit. A clean derivation of one should constrain the others rather than leaving them as independent stories.

The neutrino branch of this cluster has four empirical decision handles: the lightest-neutrino mass, the mass sum $\sum_i m_i$, neutrinoless double-beta limits or detection, and any evidence for a sterile or right-handed singlet. These data products should decide between the minimal near-photon neutral-pair stance, a sterile $\nu_R$ branch, or a lepton-number-violating provenance channel. They should not be used to rewrite the charged-fermion axial-layer rule or to import a sterile dark-matter interpretation before the PMNS, reaction, BBN, CMB, and structure-formation gates are simultaneously satisfied.

A useful benchmark-only sharpening is the package $m_{\mathrm{lightest}}\to0$, $\sum_i m_i\approx0.06\,\mathrm{eV}$, suppressed neutrinoless double-beta rate, and any sterile or right-handed singlet behaving as cold collisionless matter only after the neutral-sector and cosmology gates close. These values should be treated as discriminator targets, not as adopted ontology: they can rank the neutral-lepton branches, but they cannot bypass the PMNS Hamiltonian, reaction provenance, BBN, CMB, structure-formation, and null-result residuals.

#### Quantum cluster

Superposition, measurement, Born-rule emergence, and Bell/nonlocality closure are one package. A good ontology chapter without a basin-measure derivation is progress, but not endpoint closure.

Penrose-Diosi gravitational-collapse tests are an external benchmark for the same finite-time threshold-resolution burden, not an adopted ontology. The comparison uses the gravitational self-energy of the difference between two mass distributions,
$$
\Delta E_G \sim \frac{G}{2}\int\!\!\int
\frac{(\rho_1-\rho_2)(x_{\mathrm{eff}}^i)(\rho_1-\rho_2)(y_{\mathrm{eff}}^i)}
{\|x_{\mathrm{eff}}^i-y_{\mathrm{eff}}^i\|}\,d^3x_{\mathrm{eff}}\,d^3y_{\mathrm{eff}}
$$
with the collapse-time estimate
$$
\tau_G\sim \frac{\hbar}{\Delta E_G}
$$
The useful comparison pressure is the tension between local free-fall equivalence and linear superposition when the two branches carry measurably different mass distributions. The validation burden is to compare $\tau_{\text{meas}}$ for demonstrated massive-superposition records against $\tau_G$ and ordinary environmental decoherence. Spatially separated BEC records containing roughly $10^9$ to $10^{10}$ atoms are a forecast target, not an achieved interference class. The comparison must preserve the $\mathbb{A}\mathbb{A}\mathbb{A}$ claim that branch selection is finite-time threshold resolution rather than fundamental gravitational collapse. Any collapse variant that predicts persistent spontaneous heating must also pass low-background and compact-object heating bounds before it can serve even as a comparison baseline.

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

If that intersection becomes empty after quantitative work is done, the implementation is rejected even if many individual chapters remain suggestive. The detailed sector predicates, benchmark tolerances, and promotion-fiber test are recorded in [Failure Criteria](../../../../markdown/aaa/validation/failure-criteria.md).

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

The target experiment compares two branch-level mass-density histories over an effective-observer coherence window $T_W$:
$$
\rho_1(x_{\mathrm{eff}}^i,t_{\mathrm{eff}}),
\qquad
\rho_2(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})
$$
The branch pair is interference-preserving only if the apparatus and environment have not produced an autonomous which-path record. The gravitational or effective-metric channel therefore becomes a constraint through the response difference
$$
\Delta h_A(t_{\mathrm{eff}})
=
h_A(t_{\mathrm{eff}};\rho_1,\theta)-h_A(t_{\mathrm{eff}};\rho_2,\theta)
$$
where $A$ labels the resolved detector response channel and $\theta$ is the shared effective-metric constitutive record.

The which-path diagnostic is
$$
\mathcal{D}_{\mathrm{grav}}(T_W;\theta)
=
\int_0^{T_W}\!\!\int_0^{T_W}
\Delta h_A(t_{\mathrm{eff}})\,
N^{-1}_{AB}(t_{\mathrm{eff}},t'_{\mathrm{eff}};\theta)\,
\Delta h_B(t'_{\mathrm{eff}})\,dt_{\mathrm{eff}}\,dt'_{\mathrm{eff}}
$$
Here $N_{AB}$ is the observer-level covariance decomposed in [Observer Framework](../../../../markdown/aaa/spacetime/observer-framework.md#boundary-wake-covariance-scaffold). It summarizes unresolved deterministic boundary histories and calibrated detector/environment residuals; it is not an ontological randomness postulate.

### Minimal Response Model

A concrete first packet can use a displaced normalized mass packet. Let $\varphi_\sigma$ be normalized by
$$
\int_{\Sigma_{t_{\mathrm{eff}}}^{\mathrm{eff}}}
\varphi_\sigma(x_{\mathrm{eff}}^i)\,d^3x_{\mathrm{eff}}
=
1
$$
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
Let $G_A(t_{\mathrm{eff}},t'_{\mathrm{eff}};x_{\mathrm{eff}}^i;\theta)$ be the detector response kernel implied by the same effective-metric constitutive record used for redshift, Shapiro delay, lensing, gravitational-wave speed, and, when the record is extrapolated to compact sources, horizon-scale ring/shadow imaging. The branch response is
$$
h_A(t_{\mathrm{eff}};\rho_k,\theta)
=
\int_0^{t_{\mathrm{eff}}}\!\int_{\Sigma_{t'_{\mathrm{eff}}}^{\mathrm{eff}}}
G_A(t_{\mathrm{eff}},t'_{\mathrm{eff}};x_{\mathrm{eff}}^i;\theta)\,
\rho_k(x_{\mathrm{eff}}^i,t'_{\mathrm{eff}})\,d^3x_{\mathrm{eff}}\,dt'_{\mathrm{eff}}
$$
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
When $\|d_{\mathrm{eff}}^i(t_{\mathrm{eff}})\|$ is small relative to the packet scale,
$$
\rho_1(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})-\rho_2(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})
=
-m\,d_{\mathrm{eff}}^i(t_{\mathrm{eff}})\,
\partial_i\varphi_\sigma(x_{\mathrm{eff}}^i-x_{0,\mathrm{eff}}^i(t_{\mathrm{eff}}))
+
O(\|d_{\mathrm{eff}}^i(t_{\mathrm{eff}})\|^3)
$$
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
This gives the first closure equation: a mass displacement history should map to a predicted detector-channel separation before any interpretive claim about classical or quantum spacetime is introduced.

### Mediated Entanglement Comparison

A complementary massive-superposition test asks whether two independently prepared massive probes can become entangled through the gravity-side channel while non-gravitational couplings are suppressed or bounded. This is a positive branch-phase benchmark, not a new ontology. The observable is the final two-probe correlation record, together with the calibration record showing that electromagnetic, spin-spin, thermal, and apparatus cross-talk channels are too small to account for the effect.

Let the two probes be $A$ and $B$, with branch labels $a,b\in\{+,-\}$ and branch mass histories $\rho_A^a(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})$ and $\rho_B^b(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})$. The same weak-field constitutive record $\theta$ used for redshift, Shapiro delay, lensing, PPN, gravitational-wave speed, compact-source ring/shadow extrapolations, and $\mathcal{D}_{\mathrm{grav}}$ must determine the branch interaction energy
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
The branch phase is then
$$
\Phi_{ab}(T_W;\theta)
=
\frac{1}{\hbar}
\int_0^{T_W}
U_{ab}^{\mathrm{eff}}(t_{\mathrm{eff}};\theta)\,dt_{\mathrm{eff}}
$$
Local branch phases can be absorbed into the one-probe descriptions. The entangling invariant is the cross-branch phase combination
$$
\Delta\Phi_{\mathrm{ent}}(T_W;\theta)
=
\Phi_{++}(T;\theta)+\Phi_{--}(T;\theta)
-\Phi_{+-}(T;\theta)-\Phi_{-+}(T;\theta)
$$
For the ideal equal-amplitude two-branch packet, a first witness target is
$$
C_{\mathrm{GIE}}(T_W;\theta)
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
| branch mass histories | $\rho_1,\rho_2$ | normalized mass-density histories on $\Sigma_{t_{\mathrm{eff}}}^{\mathrm{eff}}$ over $0\le t_{\mathrm{eff}}\le T_W$ |
| branch separation | $d_{\mathrm{eff}}^i(t_{\mathrm{eff}})$ | center or multipole separation history with declared packet width $\sigma$ |
| apparatus/environment record | $\mathcal{A}_{\mathrm{rec}}$ | record variable, persistence window, environmental coupling channels, and ordinary decoherence estimate |
| gravity response kernel | $G_A(t_{\mathrm{eff}},t'_{\mathrm{eff}};x_{\mathrm{eff}}^i;\theta)$ | detector response derived from the same effective-metric constitutive record used in weak-field gravity |
| mediated-entanglement phase | $\Delta\Phi_{\mathrm{ent}}$ | cross-branch phase predicted from $\rho_A^a,\rho_B^b$ and the shared constitutive record $\theta$ |
| non-gravitational residual | $\mathcal{R}_{\mathrm{nongrav}}$ | calibrated bound on non-gravity channels that could create the observed correlation |
| covariance decomposition | $N_{AB}$ | detector noise, unresolved boundary-wake terms, environmental residuals, and calibration residuals |
| visibility data | $\mathcal{V}(T_W)$ | observed or predicted interference visibility over the run |
| entanglement data | $C_{\mathrm{obs}}$ | measured or predicted two-probe entanglement witness in the retained readout basis |
| record criteria | $R,\Sigma,T_{\text{rec}}$ | Physical Observer record variable, separatrix, and persistence threshold |

No row may be filled by changing the weak-field metric record after the positive gravity benchmarks have already been fit. The same $\theta$ must be replayable through redshift, Shapiro delay, lensing, PPN, gravitational-wave speed, compact-source ring/shadow extrapolations, and this massive-superposition packet.

### Evaluation Protocol

1. **Normalize the branch histories.** Verify $\int_{\Sigma_{t_{\mathrm{eff}}}^{\mathrm{eff}}}\rho_k(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})\,d^3x_{\mathrm{eff}}=m$ for each branch and each resolved time slice, or record the known mass exchange with the apparatus ledger.
2. **Compute the response difference.** Use one kernel $G_A(t_{\mathrm{eff}},t'_{\mathrm{eff}};x_{\mathrm{eff}}^i;\theta)$ to compute $h_A(t_{\mathrm{eff}};\rho_1,\theta)$, $h_A(t_{\mathrm{eff}};\rho_2,\theta)$, and $\Delta h_A(t_{\mathrm{eff}})$.
3. **Assemble the covariance.** Build $N_{AB}=N^{\mathrm{det}}_{AB}+N^{\mathrm{env}}_{AB}+N^{\mathrm{wake}}_{AB}+N^{\mathrm{cal}}_{AB}$, with each term either derived from the apparatus model or bounded by calibration data.
4. **Evaluate distinguishability.** Compute $\mathcal{D}_{\mathrm{grav}}(T_W;\theta)$ and compare it with $\varepsilon_{\mathrm{wp}}$.
5. **Evaluate record formation.** Compute $\tau_{\text{meas}}$, $\Delta_{\mathrm{rec}}$, and the persistence window from the measurement chapter's record criteria.
6. **Evaluate mediated entanglement when present.** If the run is a two-probe mediated-entanglement experiment, compute $\Delta\Phi_{\mathrm{ent}}$, $C_{\mathrm{GIE}}$, and $\mathcal{R}_{\mathrm{nongrav}}$ from the same run record.
7. **Classify the run.** Use the same output record to assign one of four statuses:

| Status | Conditions | Interpretation |
| --- | --- | --- |
| weak-probe | $\mathcal{D}_{\mathrm{grav}}\le\varepsilon_{\mathrm{wp}}$ and no durable record forms | gravitational response is too weak to act as a which-path record |
| mediated-entangling | $C_{\mathrm{GIE}}\ge C_{\mathrm{obs}}-\varepsilon_C$, $\mathcal{R}_{\mathrm{nongrav}}\le\varepsilon_{\mathrm{iso}}$, $\mathcal{D}_{\mathrm{grav}}\le\varepsilon_{\mathrm{wp}}$, and no durable which-path record forms | the branch phase is strong enough to account for the entanglement witness while the gravity-side readout remains below record threshold |
| record-forming | $\mathcal{D}_{\mathrm{grav}} > \varepsilon_{\mathrm{wp}}$, $\tau_{\text{meas}} < T_W$, and $\Delta_{\mathrm{rec}}$ stays below threshold through $T_{\text{rec}}$ | the apparatus/environment has formed an autonomous record |
| falsifying | $\mathcal{D}_{\mathrm{grav}}\gg1$ while visibility remains high and no record-autonomy criterion is met | the effective-metric response overproduces observable which-path information |

For a white-noise readout approximation, $N_{AB}(t_{\mathrm{eff}},t'_{\mathrm{eff}})=S_{AB}\delta(t_{\mathrm{eff}}-t'_{\mathrm{eff}})$, the distinguishability reduces to
$$
\mathcal{D}_{\mathrm{grav}}(T_W;\theta)
=
\int_0^{T_W}
\Delta h_A(t_{\mathrm{eff}})\,
S_{AB}^{-1}\,
\Delta h_B(t_{\mathrm{eff}})\,dt_{\mathrm{eff}}
$$
This special case is the first numerical target because it turns the validation packet into a finite time-series calculation once $m$, $\sigma$, $d_{\mathrm{eff}}^i(t_{\mathrm{eff}})$, $G_A$, and $S_{AB}$ are supplied.

### Worked Acceleration Bound

A first sanity bound can use a single acceleration readout channel before introducing a full detector geometry. Suppose the branch displacement is bounded by $\|d_{\mathrm{eff}}^i(t_{\mathrm{eff}})\|\le d_0$, the detector is at distance $R$ from the branch center with $d_0\ll R$, and the weak-field map satisfies $G_{\mathrm{eff}}(\theta)\to G$ in the tested regime. The branch acceleration difference is bounded by
$$
|\Delta h(t_{\mathrm{eff}})|
\le
\frac{2G_{\mathrm{eff}}(\theta)M d_0}{R^3}
$$
For a white acceleration readout covariance $N(t_{\mathrm{eff}},t'_{\mathrm{eff}})=S_a\delta(t_{\mathrm{eff}}-t'_{\mathrm{eff}})$, the distinguishability obeys
$$
\mathcal{D}_{\mathrm{grav}}(T_W;\theta)
\le
\frac{4G_{\mathrm{eff}}^2(\theta)M^2d_0^2T_W}{R^6S_a}
$$
With benchmark values
$$
M=10^{-14}\,\mathrm{kg},\qquad
d_0=10^{-6}\,\mathrm{m},\qquad
R=10^{-3}\,\mathrm{m},\qquad
T_W=1\,\mathrm{s}
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
\left(\frac{T_W}{1\,\mathrm{s}}\right)
\left(
\frac{10^{-15}\,\mathrm{m\,s^{-2}}/\sqrt{\mathrm{Hz}}}{S_a^{1/2}}
\right)^2
$$
For a which-path threshold of order unity, this run is deep in the weak-probe class. Solving the same bound for the mass needed to reach $\mathcal{D}_{\mathrm{grav}}\sim\varepsilon_{\mathrm{wp}}$ gives
$$
M_{\mathrm{crit}}
\approx
\frac{R^3}{2G_{\mathrm{eff}}(\theta)d_0}
\sqrt{\frac{\varepsilon_{\mathrm{wp}}S_a}{T_W}}
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
\left(\frac{1\,\mathrm{s}}{T_W}\right)^{1/2}
$$
This is not a new ontology or an experimental forecast. It is a scale check: for ordinary mesoscopic masses, gravity-side which-path leakage is negligible unless the branch mass, separation, proximity, coherence time, or readout sensitivity moves by many orders of magnitude. A full detector calculation should replace the scalar factor $2/R^3$ with the tensor response in the Minimal Response Model above.

### Acceptance Criteria

For an interference-preserving run, the metric or gravity-side readout must satisfy
$$
\mathcal{D}_{\mathrm{grav}}(T_W;\theta)
\le
\varepsilon_{\mathrm{wp}}
$$
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
The failure condition is strict. If $\mathcal{D}_{\mathrm{grav}}\gg1$ while interference visibility remains high and no record-autonomy condition is satisfied, the effective-metric response has overproduced observable which-path information.

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
The inputs are the branch mass scale, packet width, separation history, coherence window, detector response kernel, covariance decomposition, record variable, separatrix, and two-probe branch histories when present. The outputs are the gravitational distinguishability, interference visibility, entangling phase, mediated-entanglement witness, finite measurement time, and record-autonomy residual.

The worked acceleration bound supplies the first analytic $\mathcal{D}_{\mathrm{grav}}$ estimate. The mediated-entanglement comparison supplies the first branch-phase target. Full packet closure still requires one numerical or analytic instance that computes the retained outputs from a shared constitutive record and reports whether the branch pair is weak-probe, mediated-entangling, record-forming, or falsifying.

## Validation Simulations

### Architrino

This note records the minimum tier-1 simulation tests that should be passed before any strong self-hit or non-Markovian claims are trusted numerically. Its purpose is narrow: establish provenance-resolved propagation, baseline diagnostics, and a workable history-buffer strategy before moving to richer dynamics.

The reader should treat this as the simulator's first honesty check. Before the code is allowed to talk about rich self-hit behavior, it has to show that causal rings arrive in the right order, source identities are preserved, and history lookups are not quietly inventing the past.

The file is therefore an implementation-facing checklist rather than a general theory chapter. It should be read as a gate on simulation credibility.

#### Tier-1 Mandatory Unit Tests (Before Self-Hit Claims)

##### Provenance-resolved propagation test
Implement 1-architrino and 2-architrino setups with $\mathbb{U}_{\text{now}}$ sensors arranged on causal rings:
- Verify causal isochron propagation at $c_f$
- Verify correct arrival ordering and phase behavior (per kernel)
- Verify numerical stability of $T_t$ inversion as $\Delta T \to \Delta T / 2$
- Produce provenance tables showing correct `transmitter_id` values and emission times

##### Baseline diagnostics
- On the same root and history records, report the normalized finite-window energy, momentum, and angular-momentum pullback residuals $\mathcal R_E$, $\mathcal R_P$, and $\mathcal R_J$ defined by the [A1 Action-Increment Protocol](../../../../markdown/aaa/validation/simulations/a1-action-increment-protocol.md#branch-chart-conservation-pullback). Each residual must satisfy its predeclared tolerance and remain stable under temporal and history refinement. A diagnostic work integral or acceleration moment does not replace that exact wake-history pullback.
- Compare the numerical arrival times and surface normalization with an independently authored stationary-transmitter analytic isochron. Cross-integrator agreement is an additional implementation-parity check, not an independent oracle.

##### Grid Cache Boundary

1. **Problem**: A finite simulation cannot retain unbounded path history.
2. **Authoritative record**: Retain bounded, interpolable worldline segments $\mathbf X_i(T)$ and $\mathbf V_i(T)$ with stable transmitter identities over the declared causal horizon.
3. **Optional cache**: A $\mathbb{U}_{\text{now}}$ grid may cache potential and gradient summaries for visualization or broad-phase search, but a nearest-node lookup cannot replace the transmitter-tagged history needed to solve a self-hit root.
4. **Deliverable**: Demonstrate convergence against an independently authored analytic isochron and show that grid caching preserves the same root identity, emission time, and acceleration contribution as the authoritative history record.

##### Grid-Based History

* **Memory Strategy:** Store finite authoritative worldline history; use the fixed grid only as a derived cache.
* **Lookup:** Use a grid or spatial index to nominate candidates, then solve the causal-root equation against the retained transmitter history.
* **Validation:** Verify causal isochron propagation, phase ordering, transmitter identity, and emission time under joint temporal, history, and spatial refinement.

### Convergence Tests

This chapter defines the convergence standard for simulations that include self-hit structure and other delayed-memory effects. Its role is to specify which observables are checked, which refinement ladders are required, and what pass/fail thresholds count as numerical control rather than artifact.

Convergence means the result is not a trick of the mesh, time step, history buffer, root solver, or regulator. For delayed dynamics that matters especially, because a tiny bookkeeping error in the past can return later as a fake branch, fake stability window, or fake invariant.

Because self-hit dynamics are especially prone to fake structure under poor time or history resolution, this document should be read as a validation gate rather than as optional numerical hygiene.

All convergence claims in this chapter are finite-window claims. Passing the gates below validates the declared observables on the analysis window, with the stated detector set, history horizon, and regulator choices. It does not decide unbounded reachability questions for the full delayed dynamics; those would require a separate theorem about the global flow rather than a stronger convergence plot.

#### Convergence in Non-Markovian (Self-Hit) Dynamics

##### Scope and default observable set

For each claim, compute convergence on a fixed native analysis window $W=[T_a,T_b]$ and detector set $\{\mathbf X_k\}$ using:

- $\Phi(\mathbf X_k,T)$
- $\|\nabla_{\mathbf X}\Phi(\mathbf X_k,T)\|$
- self-hit event rate $\lambda_{\text{self}}(\mathbf X_k)$
- key invariant drift (e.g., normalized energy drift) $\epsilon_E$

##### Comparison metrics (required)

For any observable $Y$ on two runs A (coarser) and B (finer), define
$$
E_{\mathrm{rel}}(Y;A,B)\equiv
\frac{\|R(Y_B)-Y_A\|_{L^2(W,\{\mathbf X_k\})}}
{\|R(Y_B)\|_{L^2(W,\{\mathbf X_k\})}+\varepsilon_{0,Y}}
$$
Here $R$ is restriction of the finer run to the coarser sampling grid, and $\varepsilon_{0,Y}$ is a predeclared floor with the same units as the norm of $Y$. A bare dimensionless constant must not be added to a dimensional channel.

For provenance distributions of solved `t_emit`, define:
$$
D_W \equiv \frac{W_1(P_A,P_B)}{\mathrm{IQR}(P_B)+\varepsilon_T},
\qquad
D_{JS}\equiv \mathrm{JSD}(P_A\|P_B)
$$
where $W_1$ is 1-Wasserstein distance, JSD uses logarithm base $2$, and $\varepsilon_T$ is a predeclared absolute-time floor.

For delayed source-state interpolation, the run must declare an order-$q$ history interpolation operator $I_{\Delta H_{\mathrm{hist}}}^q$. On a fixed analysis window $W$, define
$$
E_{\mathrm{hist}}(S_\eta;\Delta H_{\mathrm{hist}},\Delta H_{\mathrm{hist}}/2;W)
=
\frac{
\left(\sum_{m\in W}\|I_{\Delta H_{\mathrm{hist}}/2}^qS_\eta(T_{t,m})-I_{\Delta H_{\mathrm{hist}}}^qS_\eta(T_{t,m})\|^2w_m\right)^{1/2}
}{
\left(\sum_{m\in W}\|I_{\Delta H_{\mathrm{hist}}/2}^qS_\eta(T_{t,m})\|^2w_m\right)^{1/2}+\varepsilon_{0,S}
}
$$
The weights $w_m\ge0$ are predeclared quadrature or sample weights normalized by $\sum_{m\in W}w_m=1$, and $\varepsilon_{0,S}$ has the same units as the weighted state norm.

For nonsmooth state-dependent delay windows, define the jump residual rows
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
Here $\xi_a$ is a sampled reception time in the transition window, $k_a$ is the tracked root index, $\ell_a$ is its branch/root-class label, and $\pi(a)$ is the predeclared matching permutation into the comparison run. The map $T_{0,\ell_a}(\xi_a)$ returns the matched transition time for that labeled root. A row is invalid if the matching rule or permutation is chosen after inspecting the residual.

##### Required refinements with pass/fail thresholds

1. Temporal refinement ($\Delta T$ and $\Delta T/2$, plus $\Delta T/4$ for order check):
- Pass if $E_{\mathrm{rel}}(\Phi)\le 0.02$, $E_{\mathrm{rel}}(\|\nabla\Phi\|)\le 0.03$, and
  $|\lambda_{\text{self},A}-\lambda_{\text{self},B}|/\max(|\lambda_{\text{self},B}|,\lambda_{\min})\le0.05$, with the rate floor $\lambda_{\min}$ declared before the run. If both rates lie below that floor, compare absolute event counts and root identities instead of reporting an undefined relative rate.
- Estimated observed order:
$$
p_{\mathrm{obs}}(Y)=\log_2\!\frac{E_{\mathrm{rel}}(Y;\Delta T,\Delta T/2)}
{E_{\mathrm{rel}}(Y;\Delta T/2,\Delta T/4)}
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

For field-theory or continuum-limit promotions, the packet must also declare the scaling-limit datum: regulator family, scaling trajectory, volume or window trajectory when relevant, test-observable class, observable maps from the regulated state to the promoted variables, normalization and mixing rules for composite observables, convergence topology, positivity or reconstruction condition when the claim uses a quantum-field analogue, and the artifact hashes for every regulated run consumed by the limit. Without this datum, a finite-regulator trend is a diagnostic, not a promoted continuum claim.

If the promoted claim invokes an Osterwalder-Schrader-like or Wightman-like field-theory reconstruction, the packet must identify the full reconstruction package it is borrowing: positivity, covariance or symmetry, locality or support condition, vacuum-sector or clustering condition, test-function space, regularity and growth control, and the target reconstructed object. Reflection positivity alone is not enough to promote a regulated numerical family into a local quantum-field analogue.

For revised branch-coordinate promotions, append rows for `branch-coordinate-source`, `branch-coordinate-heldout`, `branch-coordinate-phase-origin` when applicable, `branch-coordinate-design`, and `branch-identity-refinement`. These rows must include the artifact hash of the predeclared coordinate packet and the rerun candidate that consumes it.

The regulator row must include each promoted observable $Y$ and the value of
$$
E_\eta(Y;\eta,\eta/2)
=
\frac{\|R(Y_{\eta/2})-Y_{\eta}\|_{L^2(W,\{\mathbf X_k\})}}
{\|R(Y_{\eta/2})\|_{L^2(W,\{\mathbf X_k\})}+\varepsilon_{0,Y}}
$$
It also records whether active root-ledger entries match between $\eta$ and $\eta/2$ after matching source, receiver, root class, and branch status. A convergence plot is not promotion evidence unless the table row containing the plotted quantity is present and tied to the campaign artifact hash.

Regulator extrapolation fits must report the fitted observable, the regulator ladder, the assumed asymptotic form, excluded points if any, stability under fit-window changes, endpoint or singular-window controls when they affect the extrapolation, and a negative-control observable. A fit that behaves smoothly but has no declared observable map, topology, normalization, volume or window estimate when relevant, remainder bound, or independent continuum reconstruction remains below theorem-grade evidence.

##### Negative control (null test, mandatory)

Run at least one intentionally wrong model choice, such as a wrong history kernel, a swapped transmitter/receiver factor, or a perturbed emission-time solver. Keep the numerical wake-speed normalization fixed at $c_f=1$ even in the negative control.

Pass condition for the *pipeline* (not the null run): the null run must break expected invariants by a clear margin, with at least one of:

- invariant drift increase by $\ge 5\times$ relative to the validated run,
- provenance instability $D_W>0.10$ or $D_{JS}>0.05$,
- stability-window shift $>0.10$.

If the null run still passes the convergence gates above, treat the claim as numerically unvalidated.

##### Global acceptance rule

A claim is numerically validated only if all applicable refinement gates pass and the null test fails as required. Conditional gates such as revised branch-coordinate model selection apply only when the claim changes the reduced coordinate, chart partition, or residual basis before rerun.

### Perspective

This chapter separates the mechanisms already defined by the Master Equation from the recovery claims that simulation must still test. The primitive inputs are the two architrino polarities, delayed line-of-action acceleration, transmitter-side causal-surface weighting, and same-transmitter causal-root branches. Stability, scale selection, inertia, gauge-sector behavior, and quantum-like statistics are downstream closure targets rather than consequences licensed by naming those inputs.

General relativity and quantum mechanics supply observer-level recovery targets. A simulation supports such a recovery only when an independently specified observable map and benchmark residual pass; resemblance of internal geometry is not evidence by itself.

We work throughout in units with primitive wake speed $c_f=1$; per-hit accelerations are directed along $\hat{\mathbf{r}}$, weighted by the transmitter-side acceleration weight, and superpose linearly.

---

#### Delayed Emission and Transmitter-Side Acceleration

- What we assume:
- Transmitters emit potential on expanding causal isochrons with surface density $\propto 1/r^2$, represented distributionally by $\delta(r-c_f\Delta)$ with $\Delta=T_r-T_t$.
  - Each causal hit is directed along $\hat{\mathbf{r}}$ from the transmitter's emission point to the receiver, with received magnitude weighted by $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$, where $D_t=c_f-\mathbf V_t(T_t)\cdot\hat{\mathbf r}$ is the transmitter-side wake-spacing factor and $D_r=c_f-\mathbf V_r(T_r)\cdot\hat{\mathbf r}$ is the receiver-side root-playback factor.

- Why it matters:
  - Gauss-like behavior follows immediately ($1/r^2$ on causal wake fronts).
  - Moving histories can generate tangential components relative to an assembly-centered chart because the line of action points to the transmitter’s past position. Transmitter motion changes $D_t$, while receiver motion changes $D_r$ and future geometry.

- Closure target:
  - Determine whether retained assembly histories reproduce specific magnetic observables through delayed geometry alone. The simulation must name the observable, effective map, benchmark, and falsifying residual; the radial substrate law by itself does not establish circulation, axial vortices, or flux tubes.

---

#### Constant per-wavefront emission

- What we assume:
  - Emission cadence and per-wavefront amplitude are constant at the transmitter.

- Why it matters:
  - It isolates delay and self-interaction as candidate stability and scale-selection mechanisms. Transmitter motion supplies the transmitter-side factor, receiver motion supplies the receiver-side factor, and signed instantaneous acceleration power is $(\mathbf A\cdot\hat{\mathbf r})V_r$.
  - With $\eta$-mollification ($\delta\to\delta_\eta$), the calculation can define $\Phi_\eta$ and test $\Delta E_k=-\Delta U$ on resolved intervals. A sharp-impulse claim additionally requires stable root identity and weak convergence as $\eta\to0$.

---

#### Self-Hit Root Onset

- What we assume:
- Same-transmitter self-hit is accepted only when the root equation
  $$
  \mathcal{C}_{aa}(T_r)=\{\,T_t<T_r:\|\mathbf X_a(T_r)-\mathbf X_a(T_t)\|=c_f(T_r-T_t)\,\}
  $$
  is nonempty and the active root passes the transversality/Jacobian floor and carries a retained transmitter-side acceleration weight. A speed excursion above $c_f$ is a necessary warning condition for simple nontrivial roots, not a sufficient criterion.
  - Self-hits are always repulsive (like-on-like).

- Why it matters:
  - Strictly sub-field-speed interval history rules out nontrivial self-hit roots on that interval, while super-field-speed curved history can open a repulsive channel. Whether that channel balances inward contributions on a retained branch is a simulation and proof question.
  - The scale-selection target is to derive a smallest sustainable orbital radius $d_0$ and fastest natural period $t_0$ from a retained balance, not to assume them from root onset.

---

#### Superposition with isochrons and $\eta$-regularization

- What we assume:
- All wake contributions superpose linearly at the level of distributions (isochrons add).
- We use a narrow Gaussian isochron $\delta_\eta$ when continuous-time derivatives are needed.

- Why it matters:
  - Locality: inverse-square geometric weighting together with finite-speed branch selection makes nearby coherent roots dominant, but infinite populations still require an explicit cutoff, screening rule, cancellation estimate, sampled mean field, or principal-value/mean-field subtraction.
  - Bookkeeping: with $\delta_\eta$, delayed-history solvers can integrate smooth contributions; with $\delta$, the analysis can reason about impulses and events. Agreement in the $\eta\to0$ limit is a required convergence result, not an automatic property of the two representations.

---

#### Assembly Grammar to Candidate Braids and Flux Tubes

- What we assume:
  - Binary orbits are the base motif; binaries can occupy widely separated radii; a three-binary candidate is hypothesized to be dynamically robust, but this statement does not assign a taxonomy member.
  - Persistent axial structures and inter-assembly coupling are hypotheses to test on retained branch records.

- Why it matters:
  - The three-index geometry nominates a color-sector mapping, but an effective $\mathfrak{su}(3)$ algebra, confinement-facing transport, and absence of extra channels remain recovery burdens.
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
  - $d_0$ and $t_0$ are branch-derived targets. They become physical scales only after a retained binary family establishes attraction/self-hit balance, stability, and regulator persistence.
- Shielding and apparent inertia:
  - Far-zone cancellation is a shielding diagnostic. Inertial response additionally requires a same-record external acceleration/gradient probe and cannot be inferred from a small wake signature alone.
- Magnetic-observable recovery:
  - Tangential delayed geometry nominates an effective magnetic-like mapping. The mapping remains open until retained assemblies reproduce declared observer-level observables without importing cross-product dynamics into the substrate.

---

#### What the model explicitly does not use

- No Lorentzian spacetime metric at the fundamental level (background is absolute time + Euclidean space; emergent cones are effective, not kinematic).
- No right-hand-rule magnetism or $\mathbf V\times\mathbf B$ acceleration term at the substrate level; every per-hit acceleration is along $\hat{\mathbf{r}}$.
- No gauge field inventory beyond architrino causal wakes; interaction carriers are the geometry of delayed isochrons and their couplings.

---

#### Validation and next steps (concrete)

1) Far-field cancellation and the zero-potential axis
- Compute the time-averaged multipole expansion of a high-frequency binary; show leading terms cancel along the rotation axis and decay rapidly off-axis.
- Observable: a “quiet line” (near-zero net potential) threading the binary.

2) Scale selection for $d_0$ and $t_0$
- With $\delta\to\delta_\eta$, compute the mean inward attraction from the partner versus the mean outward self-repulsion across one orbit; the fixed point defines $d_0$ and the maximum orbital frequency $2\pi/t_0$.
- Prediction: the same $d_0$ appears across binaries with the same $\epsilon$ and $c_f$, independent of initial conditions after sufficient relaxation.

3) Energy consistency across a same-transmitter root-onset window
- Use $\Phi_\eta$ to evaluate $U$ and test $\Delta E_k=-\Delta U$ across a certified root-birth or fold window. A speed crossing $\|\mathbf V\|=c_f$ is not by itself that event. The $\eta\to0$ claim additionally requires stable transition metadata and weak convergence of the integrated work.

4) Numerical recipe (robust, minimal assumptions)
- For each reception time $T_r$: (i) root-find causal emission times $T_t$ for all transmitters (and self), (ii) discard non-physical roots ($H(0)=0$, handle $r=0$ by symmetry), (iii) sum $a_{o′\leftarrow o}(T_r;T_t)$, (iv) integrate velocity and position with an event-aware scheme. Use $\varepsilon$-thickening for smooth integration when needed.

---

#### Comparisons and falsifiable edges

- Classical E&M:
  - Recovery target: reproduce declared far-zone radiation observables from retained coherent assemblies, then test whether near-zone residuals differ near transmitter-side folds or admitted self-hit windows.
- QCD phenomenology:
  - Hypothesis: retained axial linkage supplies confinement-like behavior. It fails if the same branch record cannot reproduce the declared hadron reaction and energy-distribution benchmarks without per-channel retuning.
- Inertia/apparent mass:
  - Hypothesis: shielding may produce phase-dependent inertial response. It must be tested by applying the same external acceleration/gradient probe to independently prepared branch phases and is falsified if no reproducible phase dependence survives refinement.

---

#### Open Closure Questions

- Exact analytic forms for d0 and t0 in the symmetric binary with the canonical modulation.
- Rigorous conditions for uniqueness/multiplicity of causal roots in accelerated motion and their contribution to stability.
- Statistical mechanics of many-body wake structures: when and how do coherent, Lorentz-consistent effective cones emerge from moving-assembly deformation, clock/ruler retuning, and Noether sea response, and with what characteristic speed relative to the declared branch speed $c_\star$?

Plain language summary: radial hits, causal delay, constant per-wavefront amplitude, and admitted self-hit roots define a compact simulation mechanism. Stable branches, natural scales, inertial response, and magnetic-like observables are the results that mechanism must still earn.

---

#### Effective observables and states (quantum-like layer)

Premise: single-hit information is sparse. At an instant, the receiver-local dynamical datum is the signed acceleration vector $\mathbf A$. That vector fixes the net acceleration direction but not the transmitter ray and polarity assignment: attraction from one ray and repulsion from the opposite ray can produce the same $\mathbf A$. The corresponding unoriented axis is therefore an inference quotient over source hypotheses, not the raw received datum. The $\mathbb{U}_{\text{now}}$ universe-state perspective can include the full transmitter-tagged emission ledger as complete-state bookkeeping, but a local receiver or Physical Observer cannot infer that hidden ledger from a single hit.

- Emission ledger (microstate): the set of tuples $(T_t,\mathbf X_j(T_t),\mathbf V_j(T_t),q_j)$ over all transmitters $j$ that causally affect the receiver.
- Observational map: ledgers map to histories of receiver-local acceleration vectors $\{\mathbf A(T_k)\}$ across one or more receivers and over time.
- Observational equivalence: two ledgers are equivalent if they induce indistinguishable hit histories at the chosen resolution (including mollifier width $\eta$, temporal sampling, and receiver geometry).

- Coarse-grained PDE observables (Method 1):
  - Number density $n(\mathbf X,T)$: count-per-volume of architrinos.
  - Polarity density $\rho(\mathbf X,T)$: net $+\epsilon-\epsilon$ per unit volume; natural source term in continuum PDE variants.
  - Energy density $\mathcal{E}(\mathbf X,T)$: a declared assembly-level or diagnostic energy channel for validation and conservation checks; it is not primitive architrino mass-energy.
  - Use: these fields are the natural inputs/targets for grid-based PDE runs and for validating event-driven simulations in aggregate.

Observability axioms:
- A1 A single-hit receiver record contains $\mathbf A$. Its magnitude and direction are observable, but transmitter identity, transmitter ray, polarity assignment, distance $r$, and transmitter speed $\|\mathbf{V}_t\|$ are not individually recoverable at an instant. Quotienting the opposite-ray/opposite-polarity hypotheses produces an unoriented inference axis $L$.
- A2 All practical observables are functionals of hit histories across time and receivers; unique micro inversion is generically impossible.
- A3 An effective “state” is a probability measure over observationally equivalent ledger classes, updated as new hits arrive.

Bayesian operational stance:
- State update = conditioning on new hit histories; active interventions (changing receiver geometry/filters) alter future histories and thus the posterior over ledger classes.

Plain language: a receiver never sees the full ledger of who emitted what; it sees only a time series of acceleration vectors. The appropriate language is therefore statistical over source and polarity histories that fit those vectors.

---

#### $\mathbb{U}_{\text{now}}$ Note: Limits of Perfect Clocks and Frames

Absolute time and Euclidean frames remove coordinate ambiguity (synchronization and alignment) but not physical ambiguity:
- Sign/side ambiguity: attraction from +$\epsilon$ on one side vs repulsion from −$\epsilon$ on the opposite side along the same line remain indistinguishable at an instant.
- Baseline distance scaling and branch geometry: $A\propto W^{\mathrm{acc}}/r^2$; transmitter motion sets $D_t$ and the arriving acceleration weight, while receiver motion enters root playback through $D_r/D_t$ and changes future geometry.
- Collinear superposition: several transmitters on the two rays of one inference axis can sum to the same instantaneous $\mathbf A$.
- Self-hit aliasing: self-intersections can mimic external transmitters along $L$.
- Surrogate location recast: any instantaneous hit may be recast to a stationary surrogate transmitter placed somewhere along $L$ with an adjusted emission time; useful for inference and visualization, but it does not resolve the sign/side ambiguity or fix distance without temporal data.

Consequence: embedded observers and synthetic detector records must reason statistically over ledger classes. The $\mathbb{U}_{\text{now}}$ universe-state perspective can compare those classes against the complete ledger, but the observer-accessible data remain many-to-one; “quantum-like” observability is not a contradiction but a necessity.

---

#### Single-transmitter multi-hit nuance vs universal superposition

Even for a single transmitter, the receiver cannot be sure that a given acceleration did not come from multiple distinct emission times $T_t\in\mathcal{C}_{o'j}(T_r)$ on that same transmitter. When the transmitter has a super-field-speed history interval or its trajectory curves, several roots of $r=c_f(T_r-T_t)$ can occur and arrive in close succession along one acceleration axis, contributing separate per-hit accelerations whose emission-time origins are not recoverable from the net vector alone.

However, this is not the dominant practical difficulty. The governing issue is global superposition: at any instant the net acceleration is the linear sum of contributions from all architrinos in the universe whose causal isochrons intersect the receiver now. While inverse-square surface dilution and transmitter-side acceleration weight usually make nearby transmitters dominate, the mapping from the universal emission ledger to observed hit histories remains vastly many-to-one. Consequently, inference must be temporal, statistical, and multi-view, not a frame-perfect instantaneous inversion.

---

#### Operational noncommutativity and contextuality (emergent)

Measurement procedures are interventions that condition future hit histories:
- Let $F,G$ be experimental contexts (e.g., planar-mode analyzers, path blockers, timing gates). Because they modify trajectories and thus the set of future causal roots, their composition generally satisfies $F\circ G\ne G\circ F$ at the level of observed statistics.
- Contextuality: the distribution over ledger classes that best explains data depends on which filters were applied and in what order; the outcomes are context-dependent without invoking microscopic cross-product acceleration terms.

Plain language: a present intervention changes which pushes will be recorded later; doing $A$ then $B$ is not generally the same as doing $B$ then $A$.

---

#### Planar-Mode Interference Closure Target

Linear wake superposition nominates, but does not derive, an effective complex-amplitude description:
- A detector map must define how transmitter-tagged path histories become a complex $A_{\mathrm{mode}}$ over a declared aperture and time window.
- The Born-like target is to derive an intensity proportional to $|A_{\mathrm{mode}}|^2$ from that detector map and an independently specified ensemble measure.
- The polarization target is to recover Malus’s $\cos^2\theta$ benchmark from a retained planar-mode and analyzer interaction record. Geometric projection alone is implementation scaffolding until the record-forming dynamics supply the measure.

Plain language: planar-mode overlap supplies a candidate geometry for interference, while the amplitude-squared measure and analyzer statistics remain explicit recovery tests.

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
  - Two non-parallel analyzers F($\theta$₁) and G($\theta$₂) applied in different orders yield different transmitted patterns because they recondition future causal roots differently: F∘G ≠ G∘F.

---

#### Falsifiable edges and tests (observability-focused)

- Context order test: demonstrate order-dependent transmission with sequential analyzers on coherent planar modes; quantify the asymmetry F∘G vs G∘F.
- Planar-mode interference robustness: map how partial decoherence (deliberate jitter in transmitter paths) suppresses the overlap term; compare to predicted $|A|^2$ decay with coherence length.
- Multi-receiver triangulation under ambiguity: show that two-sided localization from unoriented lines plus time series reduces, but does not eliminate, sign/side and distance–speed degeneracies—matching Step 9 limits.
- Bell-type correlation target (open): assess whether planar-mode phase models with absolute time can reproduce observed $\cos(2\theta)$ correlations across separated analyzers without hidden cross-product acceleration terms; treat Tsirelson-like bounds as a stringent benchmark.

Plain language: we can test the framework by checking order effects, interference weakening when we scramble coherence, and how much multiple receivers really help; reproducing quantum correlations is the toughest, and we flag it as an explicit target.

### README

This note is the launch overview for the simulation branch. It explains the common simulation frame, the role of the virtual $\mathbb{U}_{\text{now}}$ universe-state perspective, and the separation between raw microstate logging and detector-level synthetic observables.

Use it as the top orientation document. The sibling documents are grouped by responsibility:

- common execution and interpretation: [Simulation Run Protocols](../../../../markdown/aaa/validation/simulations/run-protocols.md), [Convergence Tests](../../../../markdown/aaa/validation/simulations/convergence-tests.md), [Architrino Simulation Record](../../../../markdown/aaa/validation/simulations/architrino.md), and [Simulation Perspective](../../../../markdown/aaa/validation/simulations/perspective.md);
- detector-facing and statistical outputs: [Synthetic Observables](../../../../markdown/aaa/validation/simulations/synthetic-observables.md), [Bell-Family Record Measure](../../../../markdown/aaa/validation/simulations/bell-family-record-measure.md), and [Thermodynamic Residual](../../../../markdown/aaa/validation/simulations/thermodynamic-residual.md);
- mass-map and action closure: [$A_0$ Branch Certificate Protocol](../../../../markdown/aaa/validation/simulations/a0-branch-certificate-protocol.md), [$A_0$ Tier 0 Result-Schema Interpretation](../../../../markdown/aaa/validation/simulations/a0-tier0-result-interpretation.md), [A1 Action-Increment Protocol](../../../../markdown/aaa/validation/simulations/a1-action-increment-protocol.md), [Retuning-Map Toy Model](../../../../markdown/aaa/validation/simulations/retuning-map-toy-model.md), and the [Action-Energy Model](../../../../markdown/aaa/validation/simulations/action-energy/action-model.md) with its sibling derivation notes;
- cosmology and response scaffolds: [Cosmology Shared Residual Fit Protocol](../../../../markdown/aaa/validation/simulations/cosmology-shared-residual-fit.md), [Redshift-Budget Toy Model](../../../../markdown/aaa/validation/simulations/redshift-budget-toy-model.md), [Static Response Vector Toy Model](../../../../markdown/aaa/validation/simulations/static-response-vector-toy-model.md), and [Hydrogen $\Gamma_N$ Spectral Coefficient Row Toy Scan](../../../../markdown/aaa/validation/simulations/hydrogen-gamma-n-spectral-row-toy-scan.md).

#### Simulation Frame: Virtual $\mathbb{U}_{\text{now}}$ Perspective

- All tiers are implemented in the absolute frame (fixed Euclidean-void coordinates $X,Y,Z$; absolute time $T$).
- The simulator effectively plays the role of the $\mathbb{U}_{\text{now}}$ universe-state perspective by integrating the master equation and maintaining $S(T)$.
- Raw outputs are $\mathbb{U}_{\text{now}}$-style (fields, provenance, microstate summaries).
- “What experiments see” is generated by post-processing: embed detector assemblies with native worldlines $\mathbf{X}_{\text{det}}(T)$, compute the derived clock readout $\tau_{\text{det}}(T)$ through a declared clock map, and generate detector-like logs.

Checklist per tier:
- What $\mathbb{U}_{\text{now}}$ records ($\Phi$, $\nabla\Phi$, Noether sea variables, provenance)
- How to compute physical observables ($\tau$, redshift, lensing proxies, public gravitational-wave packet outputs: detector strain, phase, event energy ledger, timing residuals, and provenance)
- Convergence requirements for each output type
- For the first mass-map target, how the $A_0$ Tier 0/Tier 1 branch certificate is separated from later energy, shielding, and Noether sea response interpretation
- For Tier 0 rows, how active roots, raw roots, excluded near-zero self roots, residual semantics, and promotion gates should be read before any Tier 1 continuation

##### Simulation Frame and the $\mathbb{U}_{\text{now}}$ universe-state perspective

All simulation tiers are implemented in the absolute frame:

- **Spatial frame:** fixed Cartesian grid in the Euclidean void, $(X,Y,Z)$ constant in time.
- **Temporal frame:** global absolute time $T$, advanced in discrete steps $\Delta T$.
- **Microdynamics:** architrino positions and velocities updated according to the master equation; potentials propagated at speed $c_f$.

From the code’s perspective, we are always the **$\mathbb{U}_{\text{now}}$ universe-state perspective**:

- We know $S(T)$ (all architrinos, all assemblies) at each time step.
- We can compute fields and Noether sea state anywhere in the domain.

To connect to experiment:

- We embed **model detectors** (assembly worldlines) in this frame.
- We compute:
  - What fields they experience along their paths,
  - How their internal clocks tick ($\tau$ vs $T$),
  - What signals they register (arrival times, redshifts, intensity patterns).
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

This chapter defines the mandatory runtime protocol for simulations carried out in the absolute-frame implementation of the theory. Its role is to standardize the frame, logging requirements, provenance bookkeeping, metadata, and acceptance gates so results from different runs can be compared and audited coherently.

The opening gives the top-level simulation rule set; the later sections unpack the absolute-frame interpretation and the required $\mathbb{U}_{\text{now}}$ instrumentation in more detail.

#### Master Simulation Protocol (Absolute Frame)

1. **Coordinate Anchor**: All simulations run on a fixed Cartesian grid chosen as the coordinate scaffold for the Euclidean void. `Grid[x][y][z]` is a chart address, not an intrinsic label in the void.
2. **Clock Rate**: The simulator uses a global `Time` counter for absolute time $T$. No relativistic scaling is applied to the integration step itself.
3. **$\mathbb{U}_{\text{now}}$ universe-state interface**: Every run must instantiate an array of fixed virtual sensors to log $\Phi$ and $\nabla\Phi$ at declared absolute-frame grid addresses.
4. **Noether sea Initialization**: A run that claims Noether sea response must declare its initialized braid inventory, branch status, and constitutive variables. A lattice of prescribed braid records is a model input, not evidence that those records form a retained Noether sea.
5. **Convergence**: $\Delta T$ refinement must be accompanied by history-resolution refinement to ensure self-hit calculations are numerically stable.
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
Here $\mathsf{id}$ fixes the run identifier and source commit, $S_\eta$ is the regularized state history, $\mathcal{G}_{\mathrm{mesh}}$ is the spatial and history mesh, $\Delta T$ is the absolute-time step, $\eta > 0$ is the causal-wake regularization width, $I_{\Delta H_{\mathrm{hist}}}^q$ is the declared order-$q$ history interpolation operator, $\mathcal{L}_{\mathrm{root}}$ is the causal-root ledger, $\mathcal{T}_{\eta}$ is the transition-record family for fold-layer, separator, or active-root status windows, $\mathcal{R}_{\mathrm{branch}}$ is the named branch-residual vector, $\Pi_{\mathbb{U}_{\text{now}}}$ is the provenance log, $\mathcal{E}_{\mathrm{conv}}$ is the convergence-measure vector, and $\mathcal{F}$ is the finite failure-code set.

When a campaign is used for a continuum, field-theory, or regulator-removal claim, it must also attach an extraction map: the regulated observables, test windows, volume or window trajectory when relevant, normalization and mixing rules, convergence topology, positivity or reconstruction condition when applicable, and the artifact hashes for the regulator ladder. If independent methods or benchmarks are used, the packet must expose their normalization conventions and error envelopes before comparing coordinates. These fields tell reviewers exactly what is claimed to survive the finite run and what remains only a regulator-level diagnostic.

For a QFT-like reconstruction claim, the campaign must also state the presentation being targeted, such as Wightman data, Osterwalder-Schrader data, a local observable net, or a weaker named comparison. The packet must then list the hypotheses required by that presentation rather than using generic terms such as `continuum field` or `reconstructed field`.

The state history is
$$
S_\eta(T)
=
\{(\mathbf X_i(T),\mathbf V_i(T),q_i)\}_{i=1}^{N},
\qquad
S_{\eta,T}(\theta)=S_\eta(T+\theta),\quad \theta\in[-H_{\mathrm{hist}},0]
$$
A Tier 1 packet must state whether this history is evaluated in $C^1([-H_{\mathrm{hist}},0])$, $W^{1,\infty}([-H_{\mathrm{hist}},0])$, or a stricter history class. Here $H_{\mathrm{hist}}>0$ is the retained-history horizon; it is distinct from the observer-level Planck benchmark $h$. A missing history class is an incomplete artifact, because the delayed transmitter-state evaluation cannot be audited without it.

The mesh and interpolation record is
$$
\mathcal{G}_{\mathrm{mesh}}=(\Omega_{\mathrm{sim}},\Delta X,\{\mathbf X_k\}_{k=1}^{K},\Theta_{\mathrm{hist}},\Delta H_{\mathrm{hist}},\mathsf{bc})
$$
where $\Omega_{\mathrm{sim}}\subset\mathbb{R}^3$ is the Euclidean-void computational domain, $\{\mathbf X_k\}$ are the fixed $\mathbb{U}_{\text{now}}$ sample points, $\Theta_{\mathrm{hist}}\subset[-H_{\mathrm{hist}},0]$ is the stored path-history mesh, $\Delta H_{\mathrm{hist}}$ is the history resolution, and $\mathsf{bc}$ records boundary conditions. The interpolation operator $I_{\Delta H_{\mathrm{hist}}}^q$ is part of the packet; delayed transmitter states cannot be reconstructed by an implicit or undocumented lookup rule.

The path-history part of $\mathcal{G}_{\mathrm{mesh}}$ and $\Pi_{\mathbb{U}_{\text{now}}}$ should distinguish authoritative kinematic segments from attached audit rows. Authoritative segments reconstruct $\mathbf X_i(T)$ and $\mathbf V_i(T)$ over declared intervals with error bounds. Causal-root rows, delayed source-state rows, assembly-membership intervals, reaction-event references, and display projections attach to those segments by identifier and time range. Chunking, compression, and broad-phase indices are allowed as storage or acceleration layers; they do not replace authoritative replay when a promoted claim depends on provenance.

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
\max_{D\in\mathcal{D}_{\mathrm{exec}}}D\le 1,
\quad
\Delta_{\mathrm{root}}(\Delta T,\Delta T/2)=0
$$
$$
\Delta_{\mathrm{root}}(\Delta H_{\mathrm{hist}},\Delta H_{\mathrm{hist}}/2)=0,
\quad
\Delta_{\eta,\mathrm{root}}=0,
\quad
\mathsf{NullFail}=1,
\quad
\mathsf{Artifacts}=1
$$
Here $R_0\in\mathsf{Candidate}_1$ means the Tier 0 packet has `failure_code: "candidate"` and its `tier0_continuation` gate passes. For two runs $A,B$, $\Delta_{\mathrm{root}}(A,B)$ is the number of unmatched active-root records after matching receiver, transmitter, root class, branch label, and transition status. The regulator version $\Delta_{\eta,\mathrm{root}}$ applies the same matching rule between adjacent $\eta$ values. Thus a zero value means identity-preserving root agreement, not merely equal root counts. Finally, $\mathsf{NullFail}=1$ means the negative control violates at least one required null-test margin, and $\mathsf{Artifacts}=1$ means every required artifact exists with a content hash and source commit.

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
A proof packet may cite a simulation only through this handoff. It must state whether every expected active root was matched under $\Delta T$, $\Delta H_{\mathrm{hist}}$, and $\eta$ refinement, which residual component controls the verdict, and which artifact contains each value.

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

In this lemma, $\mathcal E_{\mathrm{ref},a}$ are temporal, history, spatial, and integrator-parity refinement errors; $\mathcal E_{\mathrm{prov},a}$ are causal-root and transmitter-provenance errors; $\mathcal E_{\mathrm{cons},a}$ are declared conservation-ledger residuals; and $\mathcal R_{\mathrm{branch},a}$ are the owning branch protocol's residual components. Each $\tau_{\cdot,a}>0$ has the same units as its numerator and is frozen before execution.

#### $A_0$ Branch-Certificate Protocol

The first mass-map target has a specialized protocol in [$A_0$ Branch Certificate Protocol](../../../../markdown/aaa/validation/simulations/a0-branch-certificate-protocol.md), with Tier 0 row semantics summarized in [$A_0$ Tier 0 Result Interpretation](../../../../markdown/aaa/validation/simulations/a0-tier0-result-interpretation.md). That protocol separates four stages:

1. Tier 0 algebraic branch search for finite root-ledger candidates.
2. Tier 1 $\eta > 0$ delayed-dynamics continuation and Floquet diagnostics.
3. Tier 2 internal-energy and shielding extraction.
4. Tier 3 Noether sea response tensor probes.

A rerun after a finite-coordinate no-go must include the predeclared branch-chart revision record; residual-selected coordinates, locked keys promoted into branch geometry, or benchmark-derived inputs invalidate the packet as hidden fitting.

After the compact scalar-basis no-go, an $A_0$ rerun must also predeclare the corrected one-period branch-equation basis, the non-circular carrier correction if used, the residual-balance ledger, held-out residual rule, and failure code before it can proceed to $\Delta_{\mathbf{k}}$ or $\eta$-ladder persistence.

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
\frac{\Delta t_{\mathrm{eff,obs}}-\Delta t_{\mathrm{eff,src}}}{D_L/c_\gamma},
\qquad
\Delta t_{\mathrm{eff,obs}}=t_{\mathrm{eff},\gamma}-t_{\mathrm{eff,GW}}
$$
The intrinsic effective-chart source-emission delay $\Delta t_{\mathrm{eff,src}}$ must be declared before fitting the gravity-channel speed. A packet fails as hidden tuning if it absorbs photon/gravity timing into an undeclared source delay, changes the analysis band after inspecting residuals, substitutes a cleaned strain product without recording a new provenance row, or changes waveform family after comparing to the data.

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

The minimum Tier 0 packet contains `campaign.json`, `mesh.json`, `state_vector.json`, `root_ledger.json`, `branch_residuals.json`, `candidate_rows.csv`, `failure_codes.md`, and `promotion_gate.md`. For corrected branch-equation reruns, `branch_residuals.json` must include the branch-native basis, predeclared coefficient rule, held-out residual rule, and pass/fail value for the residual-balance record. Corrected Master EOM branch reruns must also report same-record $D_t$, $D_r$, $D_r/D_t$, and $W^{\mathrm{acc}}$ records. A negative control must show that acceleration does not advance when $D_t$ or $W^{\mathrm{acc}}$ is absent or mismatched, while action and conserved-account claims do not advance when their required $D_r/D_t$ playback record is absent or mismatched. The minimum Tier 1 packet adds `run_metadata.json`, $\mathbb{U}_{\text{now}}$ provenance data, `history_interpolation.json`, `convergence_table.csv`, `eta_ladder.csv`, `conservation_ledger.csv`, `cross_integrator_report.md`, `negative_control_report.md`, `failure_report.md`, and `promotion_lemma_check.md`. A claim of numerical correctness also requires an `independent_reference_report.md` naming the closed form, theorem, analytically known case, or separately authored instrument used as the oracle. If a Tier 1 run claims a branch transition, it also emits `transition_records.json` with the status, regularization route, transition-window scale, root-ledger records, and promoted observables for each transition window.

The `cross_integrator_report.md` artifact must name the solver family, delayed interpolation polynomial or reconstruction rule, nonlinear solve residuals when implicit stages are used, small-delay or vanishing-delay encounters, and event or restart handling. Cross-integrator agreement is valid implementation-parity evidence only when branch identity and transition records match; it is not an independent correctness oracle.

A Tier 1 packet supports a proof or validation claim only when the branch residuals, convergence checks, provenance checks, conservation checks, regulator-dependence checks, and negative control all pass with tolerances declared before the run. If any promoted scalar, root count, branch label, stability gap, or tolerance is selected after inspecting output, the packet fails as hidden tuning.

#### Runtime Instantiation

The [Master Simulation Protocol](#master-simulation-protocol-absolute-frame) is the single owner of absolute-frame, grid, Noether sea initialization, and campaign-packet requirements. A concrete run instantiates it by recording:

- fixed native chart coordinates $(X,Y,Z)$ and absolute time $T$ with step $\Delta T$;
- numerical wake-speed normalization $c_f=1$;
- the $\mathbb{U}_{\text{now}}$ sensor geometry, logged $\Phi$ and $\nabla_{\mathbf X}\Phi$ channels, and boundary conditions;
- authoritative transmitter-tagged worldline history, root identity, $T_t$, and the compatibility field `t_emit`;
- declared candidate Noether braid inventory and branch status only when Noether sea response is part of the run;
- integrator, interpolation rule, tolerances, history horizon, random seed when applicable, source commit, and artifact hashes.

A vacuum one- or two-architrino benchmark therefore uses the same coordinate and provenance protocol without loading a Noether braid lattice. Cross-integrator agreement remains an implementation-parity check; any correctness claim also needs the independent reference required by the campaign packet.

### A0 Branch Certificate Protocol

This protocol defines the simulation-facing handoff for the $A_0$ reference attractor described in [Particle Masses](../../../../markdown/aaa/assemblies/particle-masses.md#reference-attractor-gate), [A1 Dynamics](../../../../markdown/aaa/noether-braid/braid-a1-dynamics.md#a1-dynamics), and [Energy](../../../../markdown/aaa/dynamics/energy.md). It specializes the general [Simulation Run Protocols](../../../../markdown/aaa/validation/simulations/run-protocols.md) to the first neutral rest-branch mass-map candidate constrained to A1 coordinates: persistent indices, independently assignable positive radii and frequencies, mutually orthogonal near-rest axes, the declared Family-A response direction, and explicit remaining binary coordinates. The target is not called retained or stable until the same-record certificate rows pass.

The protocol does not treat $A_0$ as a particle label. It treats $A_0$ as a calibration-free branch certificate problem: find a finite, stable, multi-scale causal-root ledger before energy, shielding, Noether sea response, or mass comparisons enter.

#### Master-Equation Handoff Boundary

If a run consumes a master-equation branch-chart object $\mathfrak{B}(\Gamma,\mathcal{S};H_{\mathrm{hist}},\eta,\epsilon_c)$, the consumed data must remain branch-certificate data: active roots, inactive gaps, transmitter-side Jacobian floors, same-record transmitter-side acceleration-weight intervals $W^{\mathrm{acc}}$, receiver-side factors $D_r$, signed root-playback intervals $D_r/D_t$, memory depth, returned-section residual, section stability, and the refinement schedule that preserves the same branch identity. Here $H_{\mathrm{hist}}$ is the finite retained-history horizon, not the observer-level Planck benchmark $h$. These fields may support Tier 0 and Tier 1 certification only.

The same packet must keep downstream extraction fields separate. `energy_ledger`, `far_field_shielding`, `medium_response`, and `mass_summary` remain not-computed until their tiers pass. A run fails the handoff if $\zeta(A_0)$, $\mathcal{L}_{\text{aniso}}$, or $\mathcal{M}_{\text{sea}}^{ab}$ changes under root-ledger refinement, inactive-gap refinement, history-window extension, or controlled $\eta$ refinement while the branch label and quotient row are claimed to be unchanged.

#### Certificate Packet Schema

An auditable $A_0$ branch certificate should preserve one top-level packet shape across all tiers. Fields that are not computed at a given tier must remain present with an explicit status, role, and note rather than disappearing from the packet.

| Field | Required content | Promotion role |
| --- | --- | --- |
| `metadata` | run identifier, code or derivation version, source commit, integrator, tolerances, $\eta$, sampling schedule, and history-window rule | makes the packet reproducible |
| `sea_cell` | $u^i_{\text{sea}}$, $G_{\text{grad}}$, $n$, $\chi_{\text{sea}}$, declared $c_\star$, and boundary conditions | fixes the homogeneous Noether sea cell and prevents mixing $c_f$ with $c_{\text{eff}}$ |
| `branch_label` | layer windings, inter-layer closure integers, handedness, carrier ellipticity, and active root-branch summary | identifies the branch being certified |
| `z_lambda` | quotient-coordinate row $z_\Lambda$: $\varepsilon_{12}$, $\varepsilon_{23}$, $T_1/T_2$, $T_2/T_3$, $\delta_2$, binary ellipticities, $G_{\ell m}$, $\chi_N$, $H_1,H_2,H_3$, $\Phi_{\text{rel}}$, removed gauges $SO(3)$, $S^1_{\mathbf{k}}$, $\Gamma_\Lambda$, branch class $[\Lambda]$, and quotient-degeneracy status | records the reduced moduli coordinate rather than an unquotiented carrier representative |
| `branch_chart_revision` | conditional pre-rerun record for any revised reduced branch coordinate, including source fields, equality map, equation and coefficient counts, held-out residual rule, phase-origin rule when a phase split is used, symmetry or quotient behavior, locked-key exclusion, benchmark exclusion, and `accepted_history_boundary: false` | prevents residual-selected coordinates or post-fit added columns from masquerading as branch geometry |
| `state_vector` | six architrino labels, polarities, reduced geometry, frequencies, phase offsets, carrier chart, history segment, and center gauge | gives the reduced Noether braid state vector |
| `closure_system` | active variables, causal-root equations, layer phase closure, inter-layer closure, center-gauge closure, speed-ordering inequalities, and tolerances | ties closure labels to equations rather than only to names |
| `root_ledger` | active and raw partner, self, and inter-layer root classes with delays, branch Jacobians, separator flags, root-count changes across separators, parity events, and excluded near-zero self roots separated | verifies finite causal-root bookkeeping |
| `term_classification` | terms assigned to averaging, locking, and leakage channels, with measured or derived residual size | prevents internal corrections from being hidden before promotion |
| `residuals` | complete branch-row residual surface $\mathcal{R}_{A_0}$, with $\mathcal{R}_{\text{state}}$, $\mathcal{R}_{\text{root}}$, $\mathcal{R}_{\text{phase}}$, $\mathcal{R}_{E}$, $\mathcal{R}_{\text{drift}}$, $\mathcal{R}_{\text{speed}}$, $\mathcal{R}_{\text{avg}}$, $\mathcal{R}_{\text{lock}}$, $\mathcal{R}_{\text{leak}}$, and $\mathcal{R}_{\text{Floquet}}$, each with value, tolerance, status, role, and note fields | gives a machine-checkable promotion surface with later-tier omissions explicit |
| `residual_values` | numeric mirror of $\mathcal{R}_{A_0}$ values, with Tier 0 omissions recorded as null rather than hidden | gives scripts a stable audit surface without erasing row semantics |
| `Delta_k` | $\Delta_{\mathbf{k}}$ value, status, role, nonpositive-gap failure code, and note; Tier 0 emits null with `not_computed_in_tier0` | keeps the Floquet handoff visible before Tier 1 computes the return map |
| `stability` | monodromy or finite-difference return map, excluded symmetry modes, non-symmetry Floquet multipliers, and the computed $\Delta_{\mathbf{k}}$ once Tier 1 exists | separates integer closure from attractor stability |
| `group_velocity_anisotropy` | $\mathbf{V}_{\text{cm}}$, declared $c_\star$, $\beta_\star$, envelope ratio, forward/backward delay ratio, tensor $\mathcal{A}_{\mathrm{gv}}^{ij}$, refinement status, and whether the entry is rest residue, small-velocity response, or probe-induced drift | keeps motion-induced deformation separate from shielding leakage |
| `energy_ledger` | sign-resolved kinetic content, interaction terms, wake/history terms, binary totals $E_1,E_2,E_3$, $E_{\text{internal}}(A_0)$, delayed-Noether status (`action-derived`, `quasi-Noether`, or `diagnostic-only`), the running retained-history energy-like functional across active self-hit crossings, and action per closed cycle after bounded-energy status | supplies the unshielded energy reservoir after Tier 1 passes |
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

##### Self-Hit Energy And Action-Spacing Order

For any row that claims an active self-hit branch, the certificate must report the branch invariants in the required order. First, it reports the active causal-root count by class and the root-count change across separators; any creation or annihilation event must state whether the count changes by an even number rather than hiding the transition inside interpolation. Second, it reports the transversality floor

$$
J_{\min}
=
\min_{\text{active }(T,T_0)}
\left|
1-\frac{\mathbf{V}_j(T_0)\cdot\hat{\mathbf{r}}_{o'j}(T;T_0)}{c_f}
\right|
$$

On the same active records the certificate must also report the transmitter-side acceleration weight $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$ on its certified floor or bounded interval. It must report the receiver-side factor $D_r=1-\mathbf V_{o'}(T)\cdot\hat{\mathbf r}_{o'j}(T;T_0)/c_f$ separately for signed root playback. A healthy transversality floor $J_{\min}$ alone does not certify the branch's acceleration or action contribution.

Third, it reports a running retained-history energy-like functional and its variation across self-hit or separator crossings under $\Delta T$, $\eta$, and history-window refinement. A bounded-energy claim fails if the apparent bound disappears under refinement.

The same row must state whether the energy object is action-derived, quasi-Noether, or diagnostic-only. A diagnostic-only energy row may reject a branch by showing runaway, regulator dependence, or nonconvergent drift, but it cannot promote closed-cycle action spacing or no-runaway conservation as theorem-level output.

Only after those well-posedness rows pass may the packet promote closed-cycle action spacing. The closed-cycle action entry records $\mathcal{A}_{\text{cycle}}(A_0)$, its branch label $\Lambda$, period $T_{\mathbf{k}}$, and spacing relative to neighboring accepted branches. This ordering prevents a numerically periodic carrier with an unbounded self-hit energy ledger from being read as evidence for a derived $h$.

The group-velocity anisotropy entry uses the reduced centered covariance of the six-worldline state. With
$$
\mathbf{C}_{A_0}(T)=\frac{1}{6}\sum_{a\in A_0}\mathbf X_a(T)
$$
define
$$
D^{ij}_{A_0}(\mathbf{V}_{\text{cm}})
=
\left\langle
\sum_{a\in A_0}
\left(X_a^i-C_{A_0}^i\right)
\left(X_a^j-C_{A_0}^j\right)
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
Here $h_{mn}=\delta_{mn}$ is the Euclidean spatial metric on $\Sigma_T$ and $h^{ij}=\delta^{ij}$ is its inverse, so the denominator is the Euclidean trace of $D^{ij}_{A_0}$.
This tensor measures motion-induced or probe-induced Noether braid deformation. It is not the same object as the far-field leakage residue $\mathcal{L}_{\text{aniso}}$, which is extracted from cycle-averaged wake coefficients in Tier 2.

#### Tier 0: Algebraic Branch Search

Tier 0 is a reduced branch-search pass. It samples diagnostic carrier charts, solves delayed root equations on those charts, classifies internal terms, and emits candidate rows. It does not claim a physical attractor.

Required inputs:

- homogeneous Noether sea cell with $u^i_{\text{sea}}=0$, $G_{\text{grad}}=0$, $n=1$, $\chi_{\text{sea}}=1$, and primitive wake speed $c_f$;
- persistent binary labels $\ell\in\{1,2,3\}$ and polarity labels $\sigma\in\{+,-\}$;
- scale ratios $\varepsilon_{12}=R_1/R_2$ and $\varepsilon_{23}=R_2/R_3$;
- speed offsets enforcing $s_1 > c_f$, $s_2 \approx c_f$, and $s_3 < c_f$;
- candidate handedness tuple and carrier ellipticity;
- $\eta > 0$, sampling resolution, and history-window rule.

The local symbol $\ell$ denotes the persistent binary index in this protocol. It does not encode a radial-role ordering, and the binary labels are not reassigned when radii, frequencies, or branch-derived roles cross.

Required outputs:

| Output | Meaning |
| --- | --- |
| `branch_label` | indexed-binary windings, inter-binary closure integers, handedness, and active root-branch summary |
| `closure_labels` | declared $T_{\mathbf{k}}$, winding integers, inter-binary closure integers, and active root classes |
| `z_lambda` | reduced quotient-coordinate row $z_\Lambda$, including radius ratios, period ratios, $\delta_2$, binary ellipticities, plane Gram data $G_{\ell m}$, $\chi_N$, handedness labels, phase-offset quotient status, removed gauges, branch class $[\Lambda]$, and `quotient_degenerate` |
| `state_vector` | reduced geometry, frequencies, phase offsets, carrier chart, and center gauge |
| `closure_system` | active causal-root, phase-closure, inter-binary closure, center-gauge, and speed-ordering equations used by the row |
| `root_ledger` | active and raw partner, self, and inter-binary root counts with delays, branch Jacobians, separator flags, root-count changes across separators, parity events, and excluded near-zero self roots separated |
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
| `speed-order-collapse` | $\mathcal{R}_{\text{speed}}$ fails the declared $s_1 > c_f$, $s_2 \approx c_f$, $s_3 < c_f$ constraint | reject the row before attractor continuation |
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
2. root-ledger stability under $\Delta T$ and history-window refinement;
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

The fold-layer-locked compact fixture specified here is a controlled negative-control target, not an accepted attractor and not a broad falsification of the $A_0$ program. A conforming direct one-period runner must show that preserving locked self-root keys in $\mathcal{R}_{\text{lock}}$ is insufficient when state return, root closure, phase closure, speed ordering, center drift, or energy closure fails. No current runtime artifact supports a numerical residual claim for this fixture. Any future rerun must predeclare either a non-circular carrier correction $\mathbf d_\ell(T)$ or a richer branch-native interaction basis before residual fitting.

For a declared period window $W=[T_0,T_0+T_{\mathbf{k}}]$, the corrected carrier has the form
$$
\mathbf X_{a,\ell}^{\star}(T)
=
\mathbf X_{a,\ell}^{(0)}(T)+\mathbf D_\ell(T),
\qquad
\mathbf D_\ell(T+T_{\mathbf{k}})=\mathbf D_\ell(T),
\qquad
\left\langle\mathbf D_\ell\right\rangle_W=0
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
The rerun may proceed toward monodromy only if
$$
\mathcal{R}_{\mathrm{1per}}\le 0.02
$$
with $\mathbf D_\ell(T)$, the basis terms $\mathbf A_{a,B}$, the coefficient rule for $\alpha_B$, and any held-out interval declared before fitting. A scalar-basis no-go is therefore a chart or basis failure; it does not become an attractor failure unless every admissible corrected carrier and branch-native basis inside the declared search class fails the same residual boundary.

#### Tier 2: Energy and Shielding

Tier 2 begins only after Tier 1 passes. It computes the internal-energy ledger and far-field shielding extraction described in [Energy](../../../../markdown/aaa/dynamics/energy.md). The required outputs are:

- $E_1$, $E_2$, $E_3$, and $E_{\text{internal}}(A_0)$;
- interaction and wake/history bookkeeping with no double counting;
- far-field wake coefficients $\mathcal{L}(\hat{\mathbf{R}})$ over extraction radii and angular grids;
- the naive constituent sum $\mathcal{L}_{\text{naive}}$ and the leading isotropic projection $\Pi_0\mathcal{L}$;
- $\zeta(A_0)$ from the leading isotropic projection;
- anisotropic leakage $\mathcal{L}_{\text{aniso}}=(1-\Pi_0)\mathcal{L}$ retained as a separate tensor or channel list;
- convergence status under extraction radius, angular resolution, $\Delta T$, history-window, and $\eta$ refinement.

Tier 2 fails if particle masses, charged-lepton ratios, electron radius, or measured $\alpha$ enter as inputs.

#### Tier 3: Medium-Response Probe

Tier 3 begins only after Tier 2 passes. It applies small acceleration and gradient probes to the accepted branch and extracts the homogeneous baseline for $\mathcal{M}_{\text{sea}}^{ab}$. The probe must report whether the acceleration and gradient channels share the same shielded-energy coefficient to first order, and it must report response anisotropy separately from both $\mathcal{A}_{\mathrm{gv}}^{ij}$ and $\mathcal{L}_{\text{aniso}}$.

#### Planned Runtime Artifacts

**Implementation status:** not implemented. The following paths are reserved by this specification but do not currently exist:

- `scripts/mass-map/a0-tier0-branch-search.mjs`
- `scripts/mass-map/a0-tier0-default-grid.json`
- `scripts/mass-map/a0-tier1-continuation-scaffold.mjs`
- `scripts/audit-a0-mass-map-promotion.mjs`

The Tier 0 implementation must be an algebraic branch-search scaffold, not a production simulator. It must emit candidate records with parameter choices, quotient coordinates, carrier diagnostics, root ledgers, term classifications, residual surfaces, $\Delta_{\mathbf{k}}$ handoff status, leakage placeholders, certificate gates, and failure codes matching this protocol. The Tier 1 scaffold must consume those records and emit the $\eta>0$ continuation contract and required artifact list; it cannot certify the branch without a later delayed-dynamics run. The planned audit must reject prose that promotes $\zeta(A_0)$, $E_{\text{internal}}(A_0)$, or $\mathcal{M}_{\text{sea}}^{ab}$ before the tier gates pass.

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
- Fixed Euclidean sample points or worldlines $P = \{\mathbf X_k\}$ in a declared coordinate scaffold on $\mathbb{R}^3$
- Access to the full state $S(T) = \{(\mathbf X_i(T), \mathbf V_i(T), q_i, \dots)\}$ for all architrinos
- Output channels:
  - Local potential $\Phi(\mathbf X_k,T)$
  - Local gradient $\nabla_{\mathbf X}\Phi(\mathbf X_k,T)$ (potential-gradient or acceleration proxy under the declared calibration)
  - Optional local Noether sea state variables (e.g., $\rho_{\text{NS}}$, alignment/orientation metrics)
  - Causal wake surface provenance/event tags: for each received contribution at $(\mathbf X_k,T_r)$, record `transmitter_id` together with $T_t$, satisfying $\| \mathbf X_k - \mathbf X_{\text{transmitter}}(T_t)\| = c_f (T_r - T_t)$
  - Photon packet provenance when a radiation channel is declared: transmitter event, path segment, before/after frequency, recoil or medium-energy exchange, remnant row, and signed exchange residual
  - Optional finite-window operator diagnostics for declared reconstructed channels $\mathbf{Y}_\eta$, including Gauss, Stokes, and wake-surface normalization residuals

##### Minimal synthetic products
- Time series: $\Phi(T)$, $\nabla_{\mathbf X}\Phi(T)$ at fixed points ("stationary detectors")
- Snapshot field maps: $\Phi(\mathbf X,T_\ast)$, $\nabla_{\mathbf X}\Phi(\mathbf X,T_\ast)$ over grids at fixed $T_\ast$
- Provenance tables: `receiver_id`, $T_r$, `transmitter_id`, $T_t$, `contribution_strength`
- Propagation diagnostics: arrival-time distributions, dispersion tests, effective $c_{\text{eff}}$ estimates
- Coarse kinetic moments when a continuum reduction is claimed: density, current, momentum-current tensor, energy-flux vector, and memory-current residuals derived from the same event-root records
- Stochastic summaries when a noise model is claimed: drift vector, diffusion tensor, first two distribution moments, and direct ensemble comparison against event-root histories
- Reaction-diffusion probes when pattern or front language is claimed: front speed, unstable-mode band, selected wavelength, and conservation or source ledger for each reaction term
- Jet/outflow source products when a collimated release or working surface is claimed: beam radius, head radius, bow-shock speed, Mach number, jet-to-ambient density ratio, knot spacing, cooling ratio, synthetic line map, synthetic synchrotron map, inverse-Compton map, polarization fraction, and polarization angle
- Cosmology-facing photon products when redshift is inferred: total $Z_X$, endpoint/source/launch/path decomposition, signed path-frequency exchange $Y_{X,\mathrm{path}}$, packet-cadence stretch, flux factors, and image-sharpness diagnostics

##### Mapping: $\mathbb{U}_{\text{now}}$ data → Physical observables
Synthetic observables must be generated by post-processing $\mathbb{U}_{\text{now}}$ logs with a model of a *physical* observer (assembly clock/detector):
1. Extract local Noether sea state along detector worldline $X_{\text{det}}^i(T)$
2. Compute derived detector clock time $\tau_{\text{det}}$ via the declared clock map $d\tau = F(\text{Noether sea state}, V_{\text{det}}, \Phi, \nabla_{\mathbf X}\Phi, \dots)\,dT$ from [Proper Time and Time Dilation](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md)
3) Generate detector-like outputs:
   - clock readings $\tau(T)$
   - photon arrival times and frequency shifts, with signed exchange rows separated from endpoint cadence and launch geometry
   - inferred "geodesics" (effective paths) from travel-time minimization through the Noether sea effective signal speed $c_{\text{eff}}$

Synthetic observables are envelope-limited. A detector-like output should carry the sampling cadence, aperture or worldline, sensitivity threshold, and intervention context that generated it. When a near-threshold branch, reaction, or record-forming event can flip under unresolved perturbations, the packet should report a threshold margin and alternate-outcome band instead of promoting one microhistory as uniquely observed.

##### Validation checks (must pass)
- **Causality residual (per record $m$):**
  $$
  \rho_m \equiv
  \frac{\left|\|\mathbf X_k-\mathbf X_{i_m}(T_{t,m})\|-c_f\,(T_m-T_{t,m})\right|}
  {\max(c_f\Delta T,\varepsilon_r)}
  $$
  where $\varepsilon_r>0$ is a predeclared floor with units of length.
  Pass if at least $99.9\%$ of records satisfy $\rho_m\le 10^{-2}$ and
  $\max_m \rho_m \le 5\times 10^{-2}$.

- **Temporal ordering check:**
  $$
  \theta_m \equiv \frac{T_{t,m}-T_m}{\Delta T}
  $$
  Pass if fraction with $\theta_m>10^{-9}$ is $\le 10^{-6}$.

- **Cross-integrator parity:**
  For any channel $Y$ use a predeclared floor $\varepsilon_{0,Y}$ with the same units as the norm of $Y$:
  $$
  E_{\mathrm{rel}}(Y;A,B)\equiv
  \frac{\|R(Y_B)-Y_A\|_{L^2}}{\|R(Y_B)\|_{L^2}+\varepsilon_{0,Y}}
  $$
  Pass if $E_{\mathrm{rel}}(\Phi)\le 0.03$ and
  $E_{\mathrm{rel}}(\|\nabla\Phi\|)\le 0.05$. Passing shows implementation parity on the declared channels; it is not an independent correctness oracle.

- **Finite-window Gauss/Stokes residuals:** for any declared reconstructed vector channel $\mathbf{Y}_\eta$ on $\Sigma_T$, use
  $$
  R_G[V,T;\mathbf{Y}_\eta]\equiv
  \frac{\left|\int_{\partial V}\mathbf{Y}_\eta\!\cdot\!\hat{\mathbf{n}}\,dS-\int_V\nabla\!\cdot\!\mathbf{Y}_\eta\,dV\right|}
  {\int_{\partial V}\left|\mathbf{Y}_\eta\!\cdot\!\hat{\mathbf{n}}\right|\,dS+\int_V\left|\nabla\!\cdot\!\mathbf{Y}_\eta\right|\,dV+\varepsilon_G}
  $$
  and
  $$
  R_S[S,T;\mathbf{Y}_\eta]\equiv
  \frac{\left|\oint_{\partial S}\mathbf{Y}_\eta\!\cdot dX^i-\int_S(\nabla_{\mathbf X}\times\mathbf{Y}_\eta)\!\cdot\!\hat{\mathbf{n}}\,dS\right|}
  {\oint_{\partial S}\left|\mathbf{Y}_\eta\!\cdot dX^i\right|+\int_S\left|(\nabla_{\mathbf X}\times\mathbf{Y}_\eta)\!\cdot\!\hat{\mathbf{n}}\right|\,dS+\varepsilon_S}
  $$
  Here $\varepsilon_G$ and $\varepsilon_S$ are predeclared floors with the units of their respective integral channels. Pass if both residuals are $\le 2\times10^{-2}$ on resolved windows and decrease under spatial refinement. These are diagnostics on reconstructed continuum channels, not claims that the channel is substrate ontology.

- **Distributional wake-surface normalization:** for emitted wake surface $m$ with source strength $q_m$, causal delay $\Delta_m=T-T_{t,m}$, and radial annulus $R_-\le r_m\le R_+$ around the emission point, use
  $$
  Q^{\mathrm{ann}}_{m,\eta}=
  q_mH(\Delta_m)\int_{R_-}^{R_+}\delta_\eta(r_m-c_f\Delta_m)\,dr_m
  $$
  and
  $$
  R_{N,m}\equiv
  \frac{\left|\int_{R_-\le r_m\le R_+}\rho_{m,\eta}(T,\mathbf X)\,dV-Q^{\mathrm{ann}}_{m,\eta}\right|}
  {|q_m|+\varepsilon_q}
  $$
  Here $\varepsilon_q$ is a predeclared source-strength floor with the same units as $q_m$. Pass if at least $99.9\%$ of emitted wake surfaces satisfy $R_{N,m}\le 10^{-2}$ and the maximum resolved-window residual is $\le 5\times10^{-2}$.

- **Photon-frequency exchange closure:** when a photon packet changes frequency during transport, the logged before/after frequencies must close with medium, recoil, and remnant rows:
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
  Here $E_\gamma(\nu)$ is the declared photon-channel energy map and $\varepsilon_{\nu\text{-}\mathrm{ex}}>0$ is a predeclared photon-exchange tolerance with units of energy; it is distinct from the normalized energy-drift observable $\epsilon_E$ in [Convergence Tests](../../../../markdown/aaa/validation/simulations/convergence-tests.md). Pass if $R_{\nu\text{-}\mathrm{ex},m}\le1$. The medium, recoil, and remnant entries use the same signed balance equation and outcome-neutral ledger convention defined in the [Redshift-Budget Toy Model](../../../../markdown/aaa/validation/simulations/redshift-budget-toy-model.md#replay-equation). The observer-level comparison $E_\gamma=h\nu$ may be used only as a labeled recovery calibration after the $\mathbb{A}\mathbb{A}\mathbb{A}$ map is declared; it is not an architrino-level premise. A cosmology-facing redshift or blueshift product may consume this row only after the residual is reported with the same photon provenance used for arrival-time, flux, and image-sharpness outputs.

- **Operator consistency across PDE and event-root runs:** after resampling the event-root reconstruction onto the PDE grid, define
  $$
  \Delta\mathbf{Y}_\eta\equiv
  \mathbf{Y}^{\mathrm{PDE}}_\eta-R(\mathbf{Y}^{\mathrm{root}}_\eta),
  \qquad
  E_{\mathrm{op}}(V,S,T)\equiv
  \max\!\left\{R_G[V,T;\Delta\mathbf{Y}_\eta],\,R_S[S,T;\Delta\mathbf{Y}_\eta]\right\}
  $$
  Pass if $E_{\mathrm{op}}\le0.03$ on the declared validation windows and decreases under temporal/history/spatial refinement. This is a parity check on the common observable map, not independent evidence for that map or the canonical law.

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
  D_W \equiv \frac{W_1(P_A,P_B)}{\mathrm{IQR}(P_B)+\varepsilon_T} \le 0.08,
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
  \left\|R(Y_{\mathrm{dir}})\right\|_{L^2(W)}+\varepsilon_{0,Y}
  }
  $$
  where $Y$ ranges over the retained density, current, momentum-current, and energy-flux channels. Pass if $R_{\mathrm{mom}}\le0.05$ and the omitted memory-current residual decreases under refinement.

- **Drift-diffusion reconstruction:** if a Fokker-Planck or Langevin surrogate is emitted, estimate drift and diffusion from increments,
  $$
  u^a(z)
  =
  \lim_{\Delta T\to0}
  \frac{\langle\Delta z^a\rangle_z}{\Delta T},
  \qquad
  D^{ab}(z)
  =
  \lim_{\Delta T\to0}
  \frac{\langle\Delta z^a\Delta z^b\rangle_z}{2\Delta T}
  $$
  The synthetic distribution must match direct event-root ensembles in $\langle z\rangle$ and $\operatorname{Cov}(z)$ before higher stochastic claims are trusted. Higher cumulants may differ from the surrogate unless a separate closure row has been declared.

- **Reaction-diffusion and pattern probes:** when a reduced scalar or multi-channel field $y$ obeys
  $$
  \partial_T y^a
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

1. **Definition**: A $\mathbb{U}_{\text{now}}$ universe-state perspective ($\mathbb{U}_{\text{now}}$) is a non-physical bookkeeping operator acting on the full microstate $S(T)$.
2. **Synthetic Observables**:
    - **Raw Data**: Time series of $\Phi(\mathbf X,T)$ at fixed points.
    - **Post-Processing**: To simulate a physical detector, we act on the raw data by integrating the derived clock time $\tau$ of a "clock assembly" moving through the $\mathbb{U}_{\text{now}}$ grid.
3. **Separation of Concerns**: This explicitly separates Ontology (simulation state/$\mathbb{U}_{\text{now}}$ data) from Phenomenology (synthetic detector data).

##### Virtual Sensor & Data Extraction

* **Virtual Sensor:** Implementation of the $\mathbb{U}_{\text{now}}$ universe-state perspective. Samples potential/gradient at fixed coordinates.
* **Post-Processing:** Convert Virtual Sensor data (Ground Truth) into Physical Observer data (what a moving clock measures).
* **Provenance:** Track transmitter identity and emission time for every potential contribution at a grid point.

### Branch / Quantum

#### A0 Tier 0 Result Interpretation

This note explains how to read the first reduced $A_0$ branch-search artifact. It is a companion to the [$A_0$ Branch Certificate Protocol](../../../../markdown/aaa/validation/simulations/a0-branch-certificate-protocol.md), the general [Simulation Run Protocols](../../../../markdown/aaa/validation/simulations/run-protocols.md), and the convergence standards in [Convergence Tests](../../../../markdown/aaa/validation/simulations/convergence-tests.md).

Tier 0 asks one deliberately small question: is this reduced branch chart organized enough to deserve a more expensive continuation run? It is not asking whether the branch is physically real, stable under the full delayed dynamics, or ready to support a mass-map claim.

That boundary is the point of the document. A candidate row can be useful without being promoted. The artifact must make that difference machine-readable so a diagnostic success does not turn into an accidental theory claim.

The Tier 0 schema is not an attractor proof. It specifies a certificate-facing filter that would decide whether a reduced carrier chart is disciplined enough to seed Tier 1 $\eta > 0$ continuation. Any future output must be read together with the mass thesis in [Particle Masses](../../../../markdown/aaa/assemblies/particle-masses.md), the energy ledger definitions in [Energy](../../../../markdown/aaa/dynamics/energy.md), the dynamics baseline in [A1 Dynamics](../../../../markdown/aaa/noether-braid/braid-a1-dynamics.md#a1-dynamics), and the closure bookkeeping in [Parameter Ledger](../../../../markdown/aaa/validation/parameter-ledger.md).

**Implementation status:** not implemented. The specified path `scripts/mass-map/a0-tier0-branch-search.mjs` does not currently exist in the repository. The tables below define the required output contract; they do not report an executed artifact or measured branch result.

##### Output Status

The planned runtime must emit rows with six separate layers of interpretation:

| Output layer | Meaning | Promotion role |
| --- | --- | --- |
| `z_lambda` | Quotient-coordinate row $z_\Lambda$ after removing global rotations, the common closed-cycle phase gauge, and allowed branch-preserving chart relabelings | Decides whether the row can be read as a reduced moduli coordinate rather than a raw carrier representative |
| `root_ledger` | Active and raw causal-root counts by source relation, with excluded instantaneous self-root counts separated from active roots | Decides whether the carrier chart has a finite active partner, self, and inter-layer ledger |
| `residuals` and `residual_values` | The complete $\mathcal{R}_{A_0}$ row surface, plus a numeric mirror where Tier 0 omissions remain null | Prevents a numerical value, a diagnostic placeholder, and a later-tier obligation from being confused |
| `Delta_k` | $\Delta_{\mathbf{k}}$ handoff object with null value and `not_computed_in_tier0` status until Tier 1 builds the return map | Keeps Floquet stability from being silently omitted or treated as a Tier 0 result |
| `certificate_gates` | Pass/fail/not-computed status for the Tier 0 promotion checks | Decides whether the row may seed Tier 1 continuation |
| `failure_code` | One machine-readable row code, or `candidate` when the row survives Tier 0 | Gives scripts and readers the same rejection reason |

A record with `failure_code: "candidate"` may seed Tier 1. Any other `failure_code` rejects Tier 0 continuation until the named gate is resolved. This is the sole row-level status vocabulary; `certificate_gates.tier0_continuation` is its gate-level mirror. Neither outcome accepts an attractor, computes $\zeta(A_0)$, validates $E_{\text{internal}}(A_0)$, or derives $\mathcal{M}_{\text{sea}}^{ab}$.

The same boundary applies when a compact finite-coordinate chart or coarse branch split fails. Such a failure means the proposed reduced coordinate did not earn a continuation run; it does not by itself falsify the broader $A_0$ branch program. A branch-chart checker can authorize only a new Tier 1 rerun path after the coordinate source, equality map, fit degrees of freedom, held-out residuals, phase-origin handling when relevant, and benchmark exclusions are declared before fitting. It does not create accepted history, and it does not convert Tier 0 readiness into an attractor claim.

##### Quotient-Coordinate Row

The specified `z_lambda` object is the row-level representation of $z_\Lambda$. It records the reduced coordinate after quotienting away global rotations, the common $S^1_{\mathbf{k}}$ phase gauge, and allowed discrete relabelings $\Gamma_\Lambda$ that preserve polarity assignment, layer roles, speed ordering, and causal-root branch class.

For this protocol only, the source-record layer aliases map to persistent indices by
$$
I\leftrightarrow1,\qquad M\leftrightarrow2,\qquad O\leftrightarrow3.
$$
The machine-readable fields use persistent indices. The aliases describe the declared radial role on this one chart and do not relabel the taxonomy.

| `z_lambda` entry | Row semantics |
| --- | --- |
| `schema` | version marker for the quotient-coordinate row |
| `radius_ratios` | $\varepsilon_{12}=R_1/R_2$ and $\varepsilon_{23}=R_2/R_3$; the aliases $\varepsilon_{IM}$ and $\varepsilon_{MO}$ are explanatory only under the declared map above |
| `period_ratios` | $T_I/T_M$ and $T_M/T_O$, so time-scale separation is checked alongside radius separation |
| `delta_2` | source-record binary-2 speed offset $(s_2-c_f)/c_f$; `delta_M` may appear only as a documented input alias and must normalize to `delta_2` before validation |
| `ellipticity` and `ellipticity_status` | layer ellipticity data and whether Tier 0 used a shared scalar chart |
| `plane_gram` | $G_{\ell m}$ values for the quotient-reduced binary-plane normals |
| `orientation_class` | $\chi_N$, the triple product, and a nondegenerate or degenerate status |
| `handedness` | $H_1,H_2,H_3$ persistent-index handedness labels, with $H_I,H_M,H_O$ explanatory aliases only on this chart |
| `phase_offset_quotient` | $\Phi_{\text{rel}}$ status after removing the common $S^1_{\mathbf{k}}$ phase origin; the planned Tier 0 schema uses a gauge-fixed zero-offset representative and marks the quotient basis `not_computed_in_tier0` |
| `branch_class` and `branch_class_status` | $[\Lambda]$ data from winding integers, inter-layer closure, active and raw root classes, and excluded roots; Tier 0 marks the representative as not yet a canonical discrete quotient |
| `removed_gauges` | declared gauge removals: $SO(3)$, $S^1_{\mathbf{k}}$, and $\Gamma_\Lambda$ |
| `quotient_degenerate` | Boolean failure surface for `quotient-degenerate` |

The quotient row is not a new dynamical assumption. It is the coordinate audit that prevents a raw carrier chart, a gauge choice, and a branch class from being mistaken for three independent pieces of physics.

##### Near-Zero Self-Root Policy

The Tier 0 scanner distinguishes raw self-root sightings from active self-hit branches. A raw self root whose delay lies at the configured near-zero threshold is recorded but excluded from the active ledger as `excluded_instantaneous_self_kick`.

This policy follows the canonical convention $H(0)=0$: an instantaneous self-kick is not an active causal hit. The exclusion is conservative. It does not prove that no nearby regularized fold-layer branch exists; it says only that the diagnostic carrier has not yet supplied a positive-delay self-root branch that can be promoted.

The specified fold-layer diagnostic may preserve locked self-root keys as a transition candidate, but it does not by itself accept self-hit closure. A fold-layer entry promotes only after a corrected one-period branch-equation attempt passes the declared residual surface; until then, $\Delta_{\mathbf{k}}$ and $\eta$-ladder persistence remain downstream obligations.

##### Residual Semantics

The specified `residuals` object is the complete branch-record residual surface
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
Each entry carries value, tolerance, status, role, and note fields. The companion `residual_values` object mirrors only the values; omitted Tier 0 components remain null rather than disappearing.

The Tier 0 residual surface deliberately includes entries that are not computed at Tier 0:

| Residual | Emitter key | Tier 0 interpretation |
| --- | --- | --- |
| $\mathcal{R}_{\text{state}}$ | `state` | Carrier-chart return mismatch over one declared period |
| $\mathcal{R}_{\text{root}}$ | `root` | Active root defect on candidate causal-root branches |
| $\mathcal{R}_{\text{phase}}$ | `phase` | Integer layer-winding mismatch |
| $\mathcal{R}_{E}$ | `energy` | Not computed at Tier 0; Tier 1 or Tier 2 must supply a regularized energy/history functional |
| $\mathcal{R}_{\text{drift}}$ | `drift` | Centering check for the diagnostic chart; Tier 1 must retest under direct delayed dynamics |
| $\mathcal{R}_{\text{speed}}$ | `speed` | Sign-aware violation of the intended $s_I > c_f$, $s_M \approx c_f$, $s_O < c_f$ ordering |
| $\mathcal{R}_{\text{avg}}$ | `avg` | Diagnostic size of terms claimed to average out |
| $\mathcal{R}_{\text{lock}}$ | `lock` | Diagnostic fraction or defect of selected locking terms |
| $\mathcal{R}_{\text{leak}}$ | `leak` | Far-field leakage placeholder, not a shielding extraction |
| $\mathcal{R}_{\text{Floquet}}$ | `Floquet` | Not computed at Tier 0; Tier 1 must construct the monodromy diagnostic |

This makes the residual vector complete as an audit surface without pretending that Tier 0 has done Tier 1 or Tier 2 work.

##### Floquet Handoff

The `Delta_k` object is the Tier 0 handoff for $\Delta_{\mathbf{k}}$. Tier 0 does not construct the monodromy operator, so a conforming packet must use a null value, status `not_computed_in_tier0`, and role `tier1_required`. The reserved failure code is `nonpositive-floquet-gap`, which applies only after Tier 1 computes $\Delta_{\mathbf{k}}\le0$.

The same handoff appears in `certificate_gates.floquet_gap` with status `not_computed_in_tier0`. This is a positive omission rule: Tier 0 must show that Floquet stability remains open, not leave the field absent.

##### Certificate Gates and Failure Codes

The Tier 0 `certificate_gates` object names the promotion checks directly:

| Gate | Meaning |
| --- | --- |
| `quotient_coordinates` | $z_\Lambda$ must be nondegenerate after global rotations are removed |
| `scale_separation` | radius and period ratios must remain inside the declared separated-scale regime |
| `speed_ordering` | $s_I > c_f$, $s_M \approx c_f$, and $s_O < c_f$ must hold within tolerance |
| `phase_closure` | layer winding closure over $T_{\mathbf{k}}$ must hold |
| `carrier_residuals` | state return and center drift residuals must remain bounded |
| `root_residual` | active causal-root defects must remain within tolerance |
| `active_root_ledger` | partner, self, and inter-layer active root classes must all be present |
| `active_separator_roots` | active near-separator roots must have an explicit continuation rule or remain below allowance |
| `near_zero_self_roots` | near-zero self roots remain excluded under $H(0)=0$ and may not count as active self hits |
| `residual_vector_semantics` | every residual component must carry value, tolerance, status, role, and note fields |
| `floquet_gap` | $\Delta_{\mathbf{k}}$ is not computed at Tier 0 and must be computed in Tier 1 |
| `tier0_continuation` | only rows whose row-level code is `candidate` may seed Tier 1 |

The row-level `failure_code` enum preserves the existing Tier 0 codes and reserves the new quotient and Floquet codes:

| Code | Meaning |
| --- | --- |
| `candidate` | the row survives Tier 0 and may seed Tier 1 only |
| `quotient-degenerate` | the quotient-coordinate row is degenerate after gauge removal |
| `scale-separation-collapse` | radius or period ratios collapse the declared separated-scale regime |
| `speed-order-collapse` | sign-aware speed ordering fails |
| `phase-closure-open` | integer layer-winding closure fails |
| `carrier-residual-open` | carrier return or drift residuals fail |
| `root-residual-open` | active causal-root residuals fail |
| `averaging-residual-open` | terms claimed to average out exceed their declared tolerance |
| `locking-residual-open` | selected locking terms exceed their declared tolerance |
| `separator-singularity-unresolved` | active near-separator roots lack an accepted handling rule |
| `near-zero-self-root-excluded` | excluded instantaneous self roots block Tier 0 promotion |
| `root-ledger-instability` | the active root ledger is empty or lacks partner, self, or inter-layer classes |
| `nonpositive-floquet-gap` | Tier 1 computes $\Delta_{\mathbf{k}}\le0$ |

##### Promotion Boundary

Tier 0 can only answer a finite branch-search question: does this reduced carrier chart have an active root ledger, controlled chart residuals, and no unresolved near-zero self-root obstruction?

It cannot answer the attractor question, because that requires Tier 1 direct delayed dynamics and a positive non-symmetry Floquet gap $\Delta_{\mathbf{k}}>0$. It cannot answer the mass-map question, because that requires Tier 2 energy and shielding extraction. It cannot answer the inertial-response question, because that requires Tier 3 acceleration and gradient probes for $\mathcal{M}_{\text{sea}}^{ab}$.

The safe reading is therefore:

$$
\text{Tier 0 pass}
\quad\Longrightarrow\quad
\text{eligible for Tier 1 continuation}
$$

not

$$
\text{Tier 0 pass}
\quad\Longrightarrow\quad
\text{accepted } A_0 \text{ attractor}
$$

This boundary is the main protection against premature mass-map promotion.

#### Bell-Family Record-Measure Harness

This protocol gives the Bell-family residuals in [No-Go Theorems](../../../../markdown/aaa/validation/no-go-theorems.md) their first executable scaffold. It is not a closure proof. It is a probability-table harness that checks whether a proposed record table preserves the standard benchmark shape before any claim is made about deriving that table from architrino dynamics, pair provenance, detector kernels, and finite-time basin measures.

The simple point is that one Bell number is not enough. A candidate table may look good on a CHSH average while failing no-signaling, GHZ parity, Hardy structure, or measurement-independence accounting. This harness keeps those checks in one place before the deeper dynamics are allowed to claim success.

The immediate target is discipline. A model that fits one Bell average can still fail GHZ parity, Hardy zero/positive-event structure, no-signaling, or measurement independence. The harness therefore evaluates CHSH, GHZ, Hardy, no-signaling, measurement-independence, and observed factorization residuals in one packet.

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
| `classification` | `benchmark` or `negative_control` |
| `source_protocol` | declared source construction for candidate fixtures, when supplied |
| `source_record_count` | number of retained source records in a candidate fixture |
| `metrics.chsh` | CHSH expectations, $S$, local-bound excess, and Tsirelson excess |
| `metrics.ghz` | GHZ product-context expectations and $\Delta_{\mathrm{GHZ}}$ residual |
| `metrics.hardy` | Hardy zero-term probabilities and positive-event margin |
| `metrics.no_signaling` | maximum one-party marginal drift under remote setting changes |
| `metrics.measurement_independence` | total-variation drift of declared provenance labels across settings |
| `metrics.observed_factorization` | total-variation distance between the observed joint table and the product of its observed marginals |
| `metrics.product_screening` | total-variation distance between the emitted table and a declared Bell-local product-screening reconstruction |
| `gates` | pass/fail records for the residuals that apply to the scenario |
| `witness_tags` | non-failure tags such as `bell.chsh_local_bound_violated` |
| `failure_codes` | stable failure codes such as `bell.signal_transfer` |

##### Residual Object

For a two-party CHSH table with binary outcomes $a,b\in\{-1,+1\}$, the harness computes

$$
E(x,y)=\sum_{a,b=\pm1}ab\,P(a,b|x,y)
$$

and the convention

$$
S=E(A_0,B_0)-E(A_0,B_1)+E(A_1,B_0)+E(A_1,B_1)
$$

The gate reports both the local-bound excess

$$
\Delta_{\mathrm{CHSH}}
=
\left[|S|-2\right]_+
$$

and the Tsirelson excess

$$
\Delta_{\mathrm{Ts}}
=
\left[|S|-2\sqrt{2}\right]_+
$$

For GHZ, the script uses the context signs in [Bell's Theorem](../../../../markdown/aaa/philosophy-history/theory-bridges/bell-theorem.md#bell-family-strengthenings-ghz-and-hardy):

$$
\mathcal{C}_{\mathrm{GHZ}}=\{XXX,XYY,YXY,YYX\},
\qquad
\prod_{C\in\mathcal{C}_{\mathrm{GHZ}}}\chi_C=-1
$$

and computes

$$
\Delta_{\mathrm{GHZ}}
=
\max_{C\in\mathcal{C}_{\mathrm{GHZ}}}
\left[
1-\chi_C E(C)
\right]_+
$$

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

No-signaling is evaluated as the maximum one-party marginal drift between contexts that keep that party's setting fixed:

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

Measurement-independence leakage is represented by a declared provenance label distribution in each context:

$$
\Delta_{\mathrm{MI}}
=
\sup_{\mathbf{s}}
D_{\mathrm{TV}}\!\left(
\rho_{\mathrm{prov}}(\Pi|\mathbf{s}),
\rho_{\mathrm{prov}}(\Pi|\mathbf{s}_0)
\right)
$$

where $\mathbf{s}_0$ is the packet baseline. A real closure packet should replace this toy provenance distribution with the pair-provenance ledger described below.

For generated pair-provenance cases, the harness also checks whether the emitted table is exactly reconstructed by a Bell-local product-screening form:

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

and two local deterministic apparatus kernels:

$$
K_A(a|A_i,\Pi_k)
=
\mathbf{1}\!\left[
a=\operatorname{sgn}\cos(A_i-\phi_k)
\right]
$$

$$
K_B(b|B_j,\Pi_k)
=
\mathbf{1}\!\left[
b=\operatorname{sgn}\cos(B_j-\phi_k-\pi)
\right]
$$

The generated table is then

$$
P_{\mathrm{gen}}(a,b|A_i,B_j)
=
\sum_k
w_k
K_A(a|A_i,\Pi_k)
K_B(b|B_j,\Pi_k)
$$

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

These scenarios are deliberately small. The goal is to catch wiring errors, sign errors, and invalid escape routes before a larger Master-Equation packet consumes the residuals.

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

is still a Bell-local product form when $d\rho_{\mathrm{prov}}(\Pi)$ is independent of the settings and $\Pi$ is a complete common-past screen. Such a model cannot pass CHSH, GHZ, and Hardy as a family. A successful $\mathbb{A}\mathbb{A}\mathbb{A}$ closure must therefore derive a stronger object:

$$
P_\theta(\mathbf{r}|\mathbf{s})
=
\mu_{*,T_W}^{(n)}
\left(
B_{\mathbf{r}}^{\mathbf{s}}
\right)
$$

where $B_{\mathbf{r}}^{\mathbf{s}}$ is the record-basin subset for the declared preparation, pair or multiplet provenance, local apparatus kernels, coarse-graining, and record window. This is the same measurement discipline used in [Measurement Ontology](../../../../markdown/aaa/quantum/measurement-ontology.md#born-rule-interface), but lifted from single-assembly basin weights to a Bell-family joint record measure.

The native proof packet must supply:

1. a pair-provenance ledger $\Pi_{AB}$ or multiplet ledger $\Pi_{ABC}$;
2. local apparatus kernels derived from the Stern-Gerlach-like or photon-analyzer channel;
3. one finite-window measure $\mu_{*,T_W}^{(n)}$ on the retained joint record manifold;
4. a compression audit showing why the completed record law does not reduce to Bell-local product screening;
5. no-signaling and measurement-independence residuals evaluated on the same packet.

The single-assembly Stern-Gerlach response in [Angular Momentum and Spin](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md#stern-gerlach-like-measurement-response) is a prerequisite, not the Bell proof itself. Bell-family closure starts only after the pair-provenance measure and the joint record basins are explicit.

##### Acceptance Boundary

Passing this harness means only that the residual calculations and negative controls behave as expected. It does not validate $\mathbb{A}\mathbb{A}\mathbb{A}$ quantum closure.

A future closure packet becomes promotable only if:

1. the probability tables are generated from declared substrate variables rather than written by hand;
2. $\Delta_{\mathrm{MI}}$ and $\Delta_{\mathrm{NS}}$ remain within tolerance;
3. CHSH, GHZ, and Hardy benchmarks are evaluated together;
4. the same $\mu_{*,T_W}^{(n)}$ also agrees with the record and repeated-frequency discipline in [Quantum Operator Mapping](../../../../markdown/aaa/philosophy-history/theory-bridges/quantum-operator-mapping.md#statistical-measure-and-the-born-rule-emergence);
5. the product-screening audit does not collapse the completed hidden-variable record into $\int_{\Pi}\prod_iK_i\,d\rho_{\mathrm{prov}}$;
6. failure cases are reported when the model reduces to classical-axis response, separable pair measure, product-screened pair provenance, context-independent GHZ values, forbidden Hardy events, setting-dependent provenance, or signaling marginals.

#### A1 Action-Increment Protocol

This protocol defines the simulation-facing test for deriving or falsifying the one-cycle action increment used by the quantum closure program. It specializes [Simulation Run Protocols](../../../../markdown/aaa/validation/simulations/run-protocols.md) and [Convergence Tests](../../../../markdown/aaa/validation/simulations/convergence-tests.md) to the question left open by [A1 Dynamics](../../../../markdown/aaa/noether-braid/braid-a1-dynamics.md#a1-dynamics), [A3.3 Doubling-Frequency Resonance Lock](../../../../markdown/aaa/noether-braid/braid-a3-3-doubling-frequency-lock.md), [Angular Momentum and Spin](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md), and [Mapping the Planck Scale](../../../../markdown/aaa/philosophy-history/theory-bridges/mapping-planck-scale-a1-geometry.md).

Here an A1 candidate must carry the complete prescribed coordinate ownership: persistent indices $a\in\{1,2,3\}$, independently assignable positive radii and frequencies, mutually orthogonal axes at the Family-A near-rest endpoint, axes converging toward the group-translation direction along $\lambda_A$, and explicit axial-half-separation, transverse-orbit-radius, phase, and circulation rows. A1.3 additionally requires $f_1:f_2:f_3=4:2:1$. Neither label supplies stability, retention, or a universal action increment; failure of the same evolved record to preserve the coordinate and ledger rows rejects the candidate.

The target is narrow. The run must compute the smallest accepted Master-Equation projected action increment from candidate A1 branch transitions whose stability rows pass. It may compare the resulting scale to the observer-level $h,\hbar$ benchmark after the computation. It may not insert $\hbar$ as an input step size.

##### Closure Question

The action-angle bridge in [Angular Momentum and Spin](../../../../markdown/aaa/philosophy-history/theory-bridges/angular-momentum-and-spin.md#the-h-and-hbar-convention) states the conditional theorem target:
$$
\Delta I_i=\hbar
\quad\Longrightarrow\quad
\Delta\Gamma_{\text{cell}}=h^n
$$
for $n$ record-facing action-angle channels. This protocol tests the missing premise. It asks whether accepted A1 dynamics select a positive increment $\Delta I_*$ such that
$$
h_{\mathbb{A}\mathbb{A}\mathbb{A}}=2\pi\Delta I_*
$$
matches the observer-level Planck constant benchmark.

Passing this protocol would not complete quantum theory. It would only promote the action-increment step from bookkeeping convention to candidate derived output.

##### Accepted Transition Class

Let $B_q$ and $B_{q'}$ denote candidate A1 branch states with passed stability rows, indexed binary radii, frequencies, speeds, plane normals, active causal-root ledger, and wake ledger. A candidate accepted transition belongs to

$$
\mathcal{T}_{\mathrm{acc}}=\varnothing
$$

unless both endpoint packets first satisfy branch-certificate eligibility: matching ledger identity, matching active-root convention, positive Jacobian floors, positive transmitter-side acceleration-weight floors or certified intervals, declared inactive-root or tail status, $\Delta_{\mathbf{k}}>0$, conservation pullback on the same rows, and refinement records sufficient to keep the endpoint status stable. Before that eligibility is supplied, a run may report diagnostics or rejected endpoint packets, but it may not promote `candidate_action_increment` or `candidate_h_recovery`.

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
The tolerances $\tau_{\mathrm{phase}}$, $\tau_E$, $\tau_P$, $\tau_J$, and $\tau_{\mathrm{root}}$ must be declared before the run. The transition is not accepted merely because it improves a fit to `$h$`.

Plain language: only stable, conservation-accounted, root-accounted branch changes are allowed to vote on the action increment.

##### Master-Equation Increment

For each candidate transition, compute acceleration moments and the wake boundary term directly from the delayed dynamics. For persistent binary index $a\in\{1,2,3\}$, let $\mathcal B_a$ be its constituent set and define the specific acceleration moment
$$
\boldsymbol{\tau}^{(A)}_a(T)
=
\sum_{i\in\mathcal B_a}
\big(\mathbf X_i(T)-\mathbf X_C(T)\big)
\times
\mathbf A_i(T),
$$
which has units of specific torque. The index carries no radius order. With transaction axis $\hat{\mathbf n}_{\mathrm{txn}}$, the action-unit increment is
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
Here $\Delta\mathbf L_{\mathrm{wake},\partial}^{\mathrm{spec}}$ is the specific angular momentum still carried across the chosen braid boundary at the end of the transition window. The universal $\mu_{\text{arch}}$ is an action/energy bookkeeping conversion only; it is not primitive architrino mass.

The packet must declare $\mu_{\text{arch}}$ in `campaign.json`, record units for every action and acceleration-moment column, and keep that normalization fixed across all candidate and control transitions. A packet that omits the conversion may report a specific-action diagnostic, but it may not evaluate $\delta_h$ or promote `candidate_h_recovery`.

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
$$
\boldsymbol{\mathcal{J}}_{\mathrm{tot}}^{(\eta)}
=
\mathbf{J}_{\mathrm{mech}}+\mathbf{J}_{\mathrm{wake}}^{(\eta)}
$$
The residuals $\mathcal{R}_{E}$, $\mathcal{R}_{P}$, and $\mathcal{R}_{J}$ are the normalized window changes of these three totals after subtracting the declared Euler-residual and endpoint-leakage terms. They must use the same branch rows as the root ledger, acceleration residual, and $\Delta I_{\mathrm{ME}}$ calculation. A work-integral energy reconstruction or torque projection may be reported as a diagnostic, but it does not replace the exact wake-history pullback.

The candidate increment floor is
$$
\Delta I_*
=
\inf_{B_q\to B_{q'}\in\mathcal{T}_{\mathrm{acc}}}
\left|\Delta I_{\mathrm{ME}}(B_q\to B_{q'})\right|
$$
with required positivity condition
$$
0<\Delta I_*<\infty
$$
The benchmark comparison is
$$
\delta_h
=
\left|
\frac{2\pi\Delta I_*-h}{h}
\right|
$$

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
Here $\varepsilon_I$ is a predeclared action-increment floor with the same units as $\Delta I_{\mathrm{ME}}$.
Also report the Floquet basin-robustness gap
$$
\Delta_{\mathbf{k}}
=
1-\max_{i\notin G}\|\mu_i(\mathbf{k})\|
$$
for each endpoint branch and each transition continuation.

The action-increment claim is numerically meaningful only when $\delta_I$ is small, $\Delta_{\mathbf{k}}>0$, and the phase, energy, and root residuals remain below their predeclared tolerances across refinement.

##### Field-Speed Approach Scan

The campaign must include an approach-to-$c_f$ diagnostic on the same branch rows used for the action-increment calculation. This is not a new gate. It is the root-and-action stress test that prevents a stable-looking increment from being promoted when the branch survives only by numerical accident near the field-speed boundary.

This scan is the minimal numerical artifact for the paired action-spacing and self-hit well-posedness walls: it measures whether causal-root multiplicity, Jacobian floors, and stable-cycle action increments remain controlled as branch speed approaches $c_f$.

For each declared scan family, report rows approaching the field speed from below, at the boundary when the continuation reaches it, and from above when the branch chart admits a super-field-speed interval. Each row must record the layer speed ratios, active partner-root count, active self-root count, active inter-layer-root count, minimum accepted Jacobian floor, minimum accepted transmitter-side acceleration weight, separator status, root-ledger identity, accepted/rejected status, and stable-cycle $\Delta I_{\mathrm{ME}}$ cluster assignment.

The scan has a simple discipline. A packet may not promote `candidate_h_recovery` if the accepted near-boundary rows lose their Jacobian floor, change active-root identity under refinement, or split into non-uniform stable action increments without a derived branch-class reason. In that case the packet may still report a useful diagnostic, but it has not recovered the Planck benchmark from a well-posed A1 action scale.

##### Required Packet Files

The minimum campaign packet contains:

| File | Required contents |
| --- | --- |
| `campaign.json` | source commit, protocol version, run ids, integrator, tolerances, declared benchmark policy, and whether `$h,\hbar$` entered only after the Master-Equation increment was computed |
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

1. `$h,\hbar$` are absent from the simulated equations of motion and accepted-transition selection, except as post-run benchmark labels.
2. Both endpoint packets satisfy branch-certificate eligibility on matching ledger identity and active-root convention.
3. At least one transition class has $0<\Delta I_*<\infty$.
4. Endpoint branches and transition continuations have $\Delta_{\mathbf{k}}>0$ after symmetry modes are removed.
5. Phase closure, root residuals, energy residuals, momentum residuals, and angular-momentum residuals pass the predeclared tolerances.
6. $\delta_I$ is below the predeclared cluster tolerance.
7. The temporal, history-resolution, spatial, cross-integrator, and negative-control checks from [Convergence Tests](../../../../markdown/aaa/validation/simulations/convergence-tests.md) pass.
8. The packet reports $\delta_h$ honestly, whether or not the benchmark match is good.

Only a packet that also has small $\delta_h$ may promote `candidate_h_recovery`. A packet with a positive and stable $\Delta I_*$ but poor $\delta_h$ promotes only a derived action increment that does not recover the measured Planck benchmark.

##### Failure-Code Enum

| Code | Trigger |
| --- | --- |
| `input-hbar-contamination` | the run seeded transition size, branch selection, or tolerances from $\hbar$ before computing $\Delta I_{\mathrm{ME}}$ |
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
| `benchmark-mismatch` | $h_{\mathbb{A}\mathbb{A}\mathbb{A}}$ is stable but fails the declared `$h$` benchmark tolerance |

##### Interpretation

This protocol preserves the level distinction. A passing action-increment packet would support the action-cell step used by [Wavefunction Ontology](../../../../markdown/aaa/quantum/wavefunction-ontology.md#lower-bound-on-recordable-basin-measure). It would not by itself derive the Born rule, spin statistics, Bell correlations, photon polarization, or observer-level orbital quantum numbers. Those remain downstream closure targets.

#### Retuning-Map Toy Model

This protocol documents the first arithmetic fixture for the cadence-scale retuning map introduced in [A1 Dynamics](../../../../markdown/aaa/noether-braid/braid-a1-dynamics.md#cadence-scale-retuning-hypothesis). The fixture is not a delayed-dynamics proof. It replays the constrained branch bookkeeping for an accepted $\Delta A_{\mathrm{cyc}}=\pm h$ transaction and reports whether the resulting increment can be treated as a same-branch retuning.

The toy model answers an accounting question before it answers a physics question. If a branch accepts one action-sized transaction, can the cadence, radius, scale, and speed rows be retuned without leaving the declared branch regime? Only after that arithmetic is clean does the harder delayed-dynamics proof become worth asking.

The purpose is narrow: turn the retuning scaffold into a machine-readable packet that outputs $(\Delta\nu_N,\Delta R_1,\Delta R_2,\Delta R_3,\Delta\lambda,\Delta\xi)$ and the corresponding first estimate for the cadence-space current $J_\nu$.

##### Runtime Artifact

**Implementation status:** not implemented. The reserved script and fixture paths below do not currently exist. They specify the intended interface and must not be cited as executed evidence:

```text
node scripts/nested-shell-braid/retuning-map-toy-model.mjs --pretty
```

The script consumes:

```text
scripts/nested-shell-braid/retuning-map-mock.json
```

The planned runtime must emit one result entry per scenario. The packet is dimensionless: action increments are in units of $h$, speeds are compared to the declared $c_f$, and radius/cadence changes are reported as logarithmic increments plus reconstructed component changes.

##### Replay Equation

On branch chart $q$, the toy state is

$$
\mathbf{y}_q
=
\left(
\ln\nu_1,\ln\nu_2,\ln\nu_3,\,
\ln R_1,\ln R_2,\ln R_3,\,
\ln\lambda,\ln\xi
\right)^T
$$

Given a positive semidefinite retuning-cost matrix $\mathbf{K}^{\mathrm{ret}}_q$, the fixture solves

$$
\Delta\mathbf{y}_{q,\sigma}
=
\underset{\Delta\mathbf{y}}{\operatorname{arg\,min}}\;
\frac{1}{2}\Delta\mathbf{y}^{T}
\mathbf{K}^{\mathrm{ret}}_q
\Delta\mathbf{y}
$$

subject to

$$
D A_{\mathrm{cyc},q}[\Delta\mathbf{y}]
+
\Delta A_{\mathrm{wake}}
=
\sigma h
$$

and the declared linearized branch constraints. The layer-speed diagnostics are then checked through

$$
\Delta\ln s_a
=
\Delta\ln R_a
+
\Delta\ln\nu_a,
\qquad
a\in\{1,2,3\}
$$

The specified algorithm applies the candidate source-record speed gates below. These branch roles do not assign an A1 or other taxonomy member:

$$
s_1'>c_f,
\qquad
\left|s_2'-c_f\right|\le\epsilon_2 c_f,
\qquad
s_3'<c_f
$$

The representative Noether braid cadence increment is

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

For a local rate density $r_\sigma$ of accepted $\sigma$ transactions per braid, the first current estimate is

$$
J_\nu
=
\sum_{\sigma=\pm1}
f_N r_\sigma\Delta\nu_N^{(q,\sigma)}
+
O\!\left((\Delta\nu_N)^2\partial_\nu f_N\right)
$$

##### Input Packet

Each scenario supplies:

| Field | Meaning |
| --- | --- |
| `reference_state` | baseline $R_1,R_2,R_3,\lambda,\xi,\nu_N,s_1,s_2,s_3,c_f,\epsilon_2$ |
| `representative_cadence_weights` | weights $w_1,w_2,w_3$ used to extract $\Delta\nu_N$ |
| `compliance_diagonal` | diagonal version of $\mathbf{K}^{\mathrm{ret}}_q$ |
| `action_gradient_h_per_log` | linearized $D A_{\mathrm{cyc},q}$ row in $h$ units per log variable |
| `constraints` | linearized branch constraints, each with coefficients and target |
| `f_N` | local Noether braid cadence-state distribution value |
| `partial_nu_f_N` | local slope used only to estimate the higher-order current remainder |
| `transactions` | accepted or control $\sigma$ transactions with wake action increment and local rate density |

This fixture intentionally starts with a diagonal compliance matrix. A later branch packet can replace it with a full matrix once the linearized return map supplies off-diagonal coupling.

##### Output Diagnostics

The planned fixture must report:

| Output field | Meaning |
| --- | --- |
| `status` | `candidate` only when constraints and speed gates pass |
| `delta_y` | solved logarithmic retuning vector |
| `retuning_components` | $(\Delta\nu_N,\Delta R_1,\Delta R_2,\Delta R_3,\Delta\lambda,\Delta\xi)$ |
| `constraint_residual_max` | largest absolute residual in the declared linear constraints |
| `speed_gates` | post-retuning checks for the declared binary 1, 2, and 3 speed regimes |
| `J_nu.contribution` | $f_N r_\sigma\Delta\nu_N^{(q,\sigma)}$ for the transaction |
| `net_J_nu.value` | sum of transaction contributions in the scenario |
| `net_J_nu.higher_order_estimate` | magnitude estimate for the omitted $O((\Delta\nu_N)^2\partial_\nu f_N)$ term |

##### Required Mock Behavior

The reserved mock packet must contain two hand-checkable scenarios. The values below are specification targets, not current runtime outputs.

| Scenario | Expected behavior |
| --- | --- |
| `same_branch_plus_minus_balance` | Plus and minus one-$h$ retunings both pass the speed gates. The planned arithmetic fixture must use its declared unequal local rates to produce the specified small signed current, with target `net_J_nu.value` near `0.0017019`. |
| `middle_hinge_violation_control` | The linear action constraint solves, but source-record binary 2 leaves the declared hinge tolerance. The compatibility ID remains unchanged; the row fails with `middle-hinge-violation`. |

These numbers are fixture expectations only. They validate arithmetic, packet shape, branch-gate reporting, and the current estimate. They do not validate a physical Noether braid branch.

##### Failure Reading

The first failure modes are concrete:

| Diagnostic pattern | Meaning |
| --- | --- |
| nonzero `constraint_residual_max` above tolerance | the declared linearized branch constraints are not actually solved |
| `middle-hinge-violation` | compatibility diagnostic: binary 2 leaves the source-record field-speed tolerance |
| `inner-speed-regime-crossing` or `outer-speed-regime-crossing` | the transaction crosses a speed-regime boundary |
| large higher-order current estimate | the continuum current requires smaller steps, narrower bins, or a higher-order transport model |
| candidate branch with missing physical return-map source | the fixture is arithmetic only and must be replaced by a delayed-dynamics branch packet before promotion |

A promotable retuning packet must eventually replace the mock compliance matrix with a return-map-derived $\mathbf{K}^{\mathrm{ret}}_q$, preserve the same causal-root ledger, and keep the speed gates attached to the same branch state that supplies $\Delta\nu_N$.

### Metric / Observer

#### Static Response Vector Toy Model

This protocol documents the first replay fixture for the weak static response vector used in the $\Gamma_N$ geometry extraction target. It is a small arithmetic gate for the endpoint row in [Proper Time and Time Dilation](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md#gamma-n-geometry-extraction-target) and the Shapiro-delay coefficient in [PPN Parameters](../../../../markdown/aaa/spacetime/ppn-parameters.md#explicit-weak-field-noether-sea-delay-map-ppn-gamma).

The fixture is not an empirical PPN fit. Its purpose is to keep the clock cadence row, the clock-rate row, and the signal-delay coefficient from being silently blended while the $\mathbb{A}\mathbb{A}\mathbb{A}$ constitutive response is still being derived.

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

For a weak static endpoint cell, write

$$
\ln n=a_n\frac{U}{c_0^2},\qquad
\ln\chi_{\text{sea}}=a_\chi\frac{U}{c_0^2},\qquad
\ln\lambda=a_\lambda\frac{U}{c_0^2},\qquad
\ln\frac{R_{\text{braid}}}{R_{\text{braid},0}}=a_R\frac{U}{c_0^2}
$$

The cadence-stretch row must satisfy

$$
b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R=1
$$

while the inverse clock-rate row must satisfy

$$
\omega_n a_n+\omega_\chi a_\chi+\omega_\lambda a_\lambda+\omega_R a_R=-1
$$

The row-inverse condition checks

$$
b_i+\omega_i=0
$$

for $i\in\{n,\chi,\lambda,R\}$.

The Shapiro-delay neighbor supplies

$$
a_\chi^{\mathrm{sig}}=1+\gamma_{\mathrm{PPN}}
$$

so the shared clock/signal delay residual is

$$
\Delta_\chi^{\mathrm{clk\text{-}sig}}
=
a_\chi-a_\chi^{\mathrm{sig}}
$$

The branch is shared-delay closed only when $\Delta_\chi^{\mathrm{clk\text{-}sig}}=0$ within the declared tolerance.

The same arithmetic also exposes the lensing/dynamics equality burden used by dark-sector comparisons. In the weak static row, the signal-deflection channel is closed only when the spatial-compliance response gives

$$
\gamma_{\mathrm{PPN}}=1,
\qquad
a_\chi^{\mathrm{sig}}=2
$$

while the clock/dynamical endpoint row still satisfies the cadence and inverse-clock equations below. A response vector that changes the dynamical acceleration but leaves $a_\chi^{\mathrm{sig}}\neq2$ is a split clock/signal branch: it may fit rotation curves or hydrostatic motion, but it cannot yet claim the lensing mass equality required by cluster and galaxy-galaxy weak-lensing tests.

##### Minimal Shared-Delay Packet

The first admissible static endpoint packet is the shared scalar delay response specialization of the equations above. Define

$$
A_\chi\equiv1+\gamma_{\mathrm{PPN}}
$$

The minimal response vector is

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

For the GR-matching branch, this gives $A_\chi=2$, $a_\chi=2$, $b_\chi=1/2$, and $\omega_\chi=-1/2$. The `shared_delay_clean_gr_branch` row in the mock packet is exactly this replay. The `density_scale_compensated_branch` row samples the remaining compensated family, where nonzero $a_n$, $a_\lambda$, or $a_R$ are allowed only if the same cadence row still satisfies $b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R=1$ and the inverse row remains $\omega_i=-b_i$.

##### Pressure Bridge

Pressure-response packets can feed the same fixture after their anisotropic terms are separated from the isotropic static projection. For a pressure row $r$, the bridge uses

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

and checks the pressure version of the cadence row:

$$
\widehat{\delta\ln\Gamma}_{N,r}^{P}
=
b_n\delta\ln n_r
+b_\chi\delta\ln\chi_{\text{sea},r}
+b_\lambda\delta\ln\lambda_r
+b_R\delta\ln R_r
$$

The pressure cadence residual is

$$
\mathcal{R}_{\Gamma,r}^{P}
=
\widehat{\delta\ln\Gamma}_{N,r}^{P}
-\delta\ln\Gamma_{N,r}
$$

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

When `derive_response` is `gamma_normalized`, the fixture also forms a normalized static-equivalent response vector

$$
a_i^{P\to\Gamma}
=
\frac{\delta g_i^P}{\delta\ln\Gamma_N}
$$

This normalization makes pressure rows replayable by the same endpoint arithmetic, but it does not convert pressure loading into a gravitational PPN branch. The `gamma_eff_sweep` diagnostic is only an algebraic comparison against $a_\chi^{\mathrm{sig}}=1+\gamma_{\mathrm{PPN}}$; a pressure-normalized value that closes for some formal $\gamma_{\mathrm{PPN}}$ is not a solar-system Shapiro result.

Anisotropic pressure entries, such as $\Delta\Pi^{\parallel-\perp}$ or deviatoric strain, must be either projected out before the isotropic static row is evaluated or carried in `anisotropic_residuals`. The isotropic $\Gamma_N$ row must not absorb directional pressure response as a hidden scalar coefficient.

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
| `expect_shared_delay` | whether the scenario is expected to satisfy $\Delta_\chi^{\mathrm{clk\text{-}sig}}=0$ |
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

These diagnostics turn the first-order response vector into an executable closure object. A later constitutive simulation can replace the mock response values with measured $(a_n,a_\chi,a_\lambda,a_R)$ rows while keeping the same gate.

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

because

$$
0.4(0.25)+0.4(2)+(-0.5)(-0.1)+1(0.05)=1
$$

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

so no single $\chi_{\text{sea}}$ coefficient can satisfy both

$$
b_\chi(2)=1,
\qquad
b_\chi(0.6)=1
$$

The current validation status is therefore conditional. Nonzero static endpoint coefficients $a_n$, $a_\lambda$, and $a_R$ are not required by the endpoint row itself. They become necessary only if an independent branch record, such as hydrogen spectral refinement or pressure-response replay, supplies non-$\chi_{\text{sea}}$ response that must share the same $\Gamma_N$ row. The next proof obligation is to replace the toy nonzero entries with branch-derived density, envelope-scale, or $R_{\text{braid}}$ response rather than treating them as fit parameters.

The hydrogen spectral toy scan may replay this compensated row as a scaffold, but that replay is not evidence that the gravitational endpoint has acquired nonzero $a_n$, $a_\lambda$, or $a_R$. Those entries become promotable only when the hydrogen branch or another declared branch derives the same component split for the same Noether sea cell.

#### Hydrogen Γ_N Spectral Coefficient Row Toy Scan

This protocol is the first proof/simulation packet for the hydrogen spectral coefficient row $\mathbf{b}_{N}^{\mathrm{spec}}$. Its purpose is narrow: constrain the row that extracts $\Gamma_N$ for the hydrogen spectral channel without fitting a separate clock factor to each line.

The packet depends on the clock/rate convention in [Proper Time and Time Dilation](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md#hydrogen-spectral-clock-rate-conversion-target) and the hydrogen line-set benchmark in [Atomic Spectra](../../../../markdown/aaa/nuclear-atomic/atomic-spectra.md#hydrogen-rydberg-benchmark-target). It keeps the cadence-stretch factor and the observer frequency multiplier separate:

$$
C_{N,\mathrm H}^{(\ell)}
=
\left(\Gamma_{N,\mathrm H}^{(\ell)}\right)^{-1}
$$

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

The default packet now begins with `hydrogen_rydberg_static_response_scaffold`. That scenario is not a completed hydrogen derivation, but it is the first theory-bearing input scaffold: the line labels are ordinary hydrogen transitions with recovered principal labels, the executable derives normalized Rydberg line factors, the envelope gaps declare one shared line-inferred cadence stretch, the $\mathbf{g}_{N,\mathrm H}^{(\ell)}$ entries preserve the density/delay/scale/core split, and the static response vector is inherited from the static response packet rather than retuned inside the spectral scan.

##### Theory-Bearing Input Scaffold

The scaffold uses the line factors from the hydrogen Rydberg benchmark. For each line object, the executable reads the recovered labels `principal_n_a` and `principal_n_b` and forms

$$
\Lambda_{ab}
=
\frac{1}{n_b^2}
-
\frac{1}{n_a^2}
$$

The record-level `frequency_scale` represents the normalized $R_{\mathrm H}c_{\gamma,0}$ comparison scale. In the first scaffold it is set to one, so the executable derives

$$
\nu_{a\to b}^{\mathrm{obs},(\ell)}
=
\Lambda_{ab}
$$

The record-level `line_inferred_ln_Gamma_N` then supplies the line-inferred cadence stretch used to derive the replay envelope gap:

$$
\frac{
E_{\text{env}}^{(\ell)}(a)-E_{\text{env}}^{(\ell)}(b)
}{
h
}
=
e^{0.001}\Lambda_{ab}
$$

so every selected line infers

$$
\ln\widehat\Gamma_{N,\mathrm H}^{(\ell)}(a,b)
=
0.001
$$

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

It satisfies the endpoint constraint because

$$
0.4(0.25)+0.4(2)+(-0.5)(-0.1)+1(0.05)=1
$$

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

and

$$
\mathbf{b}_{N}^{\mathrm{spec}}\cdot\mathbf{g}_{N,\mathrm H}^{(A)}
=
\mathbf{b}_{N}^{\mathrm{spec}}\cdot\mathbf{g}_{N,\mathrm H}^{(B)}
=
0.001
$$

This makes the packet stronger than a free mock arithmetic witness, but still below a constitutive hydrogen derivation. It checks that a declared row inherited from the static response packet can control several hydrogen line labels across two admissible records without collapsing $n$ and $\chi_{\text{sea}}$ or fitting a separate coefficient row to each transition.

The scaffold still has a limited claim level. It derives the observer-frequency and envelope-gap entries from the Rydberg line-factor equation and a declared shared cadence stretch, but it does not derive the hydrogen envelope gaps from the master dynamics, does not derive the static response vector, and does not assign real observer frequencies. Its job is to make those inputs explicit and replaceable while keeping the coefficient-row scan executable.

##### Hydrogen Spectral Residual Separation

The row scan uses the Rydberg principal-label factor as its leading benchmark, but real hydrogen spectroscopy is not exhausted by that factor. The source-level comparison stack separates at least five corrections that must not be hidden inside $\Gamma_N$:

| Channel | Standard benchmark role | Packet treatment |
| --- | --- | --- |
| reduced mass | replaces $m_e$ by $m_eM/(m_e+M)$ in the leading Coulomb spectrum | declared input to the envelope gap, not a per-line row fit |
| fine structure | relativistic kinetic, spin-orbit with Thomas-precession factor, and Darwin/contact terms split levels at order $(Z\alpha)^4$ | later correction residual, not part of the shared cadence row |
| hyperfine structure | nuclear spin and magnetic moment couple to electron spin/orbital channels | apparatus/source-branch residual unless explicitly modeled |
| Lamb-type shift | QED photon-field correction splitting Dirac-degenerate levels | external QED recovery residual |
| finite nuclear structure | nuclear size, magnetic distribution, and quadrupole effects alter small-radius states | envelope/source-model residual |

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
This prevents the coefficient scan from passing by absorbing known spectral physics into the cadence-stretch row. It also fixes the degeneracy burden: the leading Coulomb target must recover the $n^2$ orbital degeneracy before correction channels split it, while the fine-structure channel may depend on $j$ and the hyperfine channel may depend on nuclear-spin records.

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

predicts a refinement mismatch of $-0.0001$ on record $B$ in the default scaffold. This is a scan-logic falsification witness, not a hydrogen validation result: atom-local refinement can reject the minimal row when the accepted response record changes component split, but the scaffold does not yet require nonzero gravitational endpoint coefficients $a_n$, $a_\lambda$, or $a_R$ unless a constitutive hydrogen branch derives the same split from the static endpoint response.

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

The deformation record is the one used by the hydrogen clock/rate target:

$$
\mathbf{g}_{N,\mathrm H}^{(\ell)}
=
\left(
\ln n_{\mathrm H}^{(\ell)},\,
\ln\chi_{\text{sea},\mathrm H}^{(\ell)},\,
\ln\lambda_{\mathrm H}^{(\ell)},\,
-\ln\xi_{\mathrm H}^{(\ell)},\,
\ln\frac{R_{\text{braid},\mathrm H}^{(\ell)}}{R_{\text{braid},0}}
\right)^T
$$

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

This inferred value is a diagnostic readout. It is not a permission to fit a separate $\Gamma_N$ or coefficient row to the transition.

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

The fixed fourth entry is the inherited Lorentz-branch constraint $b_\xi=1$. The remaining entries must satisfy the static weak-field endpoint constraint when evaluated on the same static response vector used by the clock row:

$$
b_n^{\mathrm{spec}}a_n
+b_\chi^{\mathrm{spec}}a_\chi
+b_\lambda^{\mathrm{spec}}a_\lambda
+b_R^{\mathrm{spec}}a_R
=
1
$$

within the declared endpoint tolerance. If the packet also supplies the inverse clock-rate row $\boldsymbol{\omega}^{\mathrm{spec}}$, then it must satisfy

$$
\omega_i^{\mathrm{spec}}
=
-b_i^{\mathrm{spec}}
$$

for $i\in\{n,\chi,\lambda,R\}$. A branch may additionally impose shared clock/signal delay only by declaring the same condition used in the static response vector packet:

$$
a_\chi
=
1+\gamma_{\mathrm{PPN}}
$$

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

2. For each remaining row and resolution record, compute

   $$
   \ln\Gamma_{N,\mathrm H}^{\mathrm{row},(\ell)}
   =
   \mathbf{b}_{N}^{\mathrm{spec}}\cdot
   \mathbf{g}_{N,\mathrm H}^{(\ell)}
   $$

3. Compare the row prediction to every line-inferred cadence stretch:

   $$
   \mathcal E_{\Gamma}^{(\ell)}(a,b;\mathbf{b}_{N}^{\mathrm{spec}})
   =
   \ln\widehat\Gamma_{N,\mathrm H}^{(\ell)}(a,b)
   -
   \ln\Gamma_{N,\mathrm H}^{\mathrm{row},(\ell)}
   $$

4. Across refinement records, require the accepted row to keep the same predicted clock-rate conversion after the envelope-gap convergence budget is removed:

   $$
   \mathcal E_{\mathrm{ref}}(\ell,\ell';\mathbf{b}_{N}^{\mathrm{spec}})
   =
   \ln\Gamma_{N,\mathrm H}^{\mathrm{row},(\ell)}
   -
   \ln\Gamma_{N,\mathrm H}^{\mathrm{row},(\ell')}
   $$

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

This set may be a point, a bounded interval family, or empty. A bounded family is still useful because it constrains the coefficient row without assigning a separate row to each spectral line.

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

with the refinement check

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

The stronger extraction claim requires the diameter of $\mathcal B_{\mathrm H}^{\mathrm{spec}}$ to shrink under additional independent hydrogen records or under a constitutive response calculation for $(a_n,a_\chi,a_\lambda,a_R)$. The first packet does not require that stronger claim; it only requires that a shared constrained row survive the line set.

This is not yet the full promotion gate. That gate requires $\mathbf{g}_{N,\mathrm H}^{(\ell)}$, $E_{\text{env}}^{(\ell)}(a)-E_{\text{env}}^{(\ell)}(b)$, $\nu_{a\to b}^{\mathrm{obs},(\ell)}$, and $(a_n,a_\chi,a_\lambda,a_R)$ to be extracted from one declared hydrogen spectral channel record and the same Noether sea cell, with recoil, hyperfine structure, photon-channel propagation, and source-branch effects carried outside $\Gamma_N$ unless they are in the declared residual budget.

##### Hydrogen $\Gamma_N$ Certificate Boundary

A deterministic hydrogen row is a certificate rather than only a nonempty accepted-row set. The certificate object is
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
Here $\mathbf b_{N,\mathrm{stat}}^{\mathrm{spec}}=(b_n^{\mathrm{spec}},b_\chi^{\mathrm{spec}},b_\lambda^{\mathrm{spec}},b_R^{\mathrm{spec}})$ is the four-entry static endpoint subrow. The packet passes only if every component of $\mathcal R_{\mathrm H}^{\Gamma}$ is within its declared tolerance and all packet inputs share the same provenance ledger $\Theta_{\mathrm H,\mathrm{spec}}^{(\ell)}$ and the same static Noether sea cell. Otherwise it fails with the first violated row: provenance, $b_\xi$, endpoint, line-set, refinement, or residual separation.

##### Failure Tests

The packet must include intentional failing rows or records for the following cases:

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

The executable packet reports:

| Output field | Meaning |
| --- | --- |
| `diagnostics.accepted_rows` | candidate rows that satisfy $b_\xi=1$, the endpoint constraint, the line-set residual, and the refinement residual |
| `diagnostics.response_record_mismatch_pass` | whether every line used the shared $\mathbf{g}_{N,\mathrm H}^{(\ell)}$ record for its resolution |
| `diagnostics.per_line_spoof` | whether each line could be made to pass by some row even though no shared row passes |
| `diagnostics.row_results[].diagnostics.endpoint_residual` | residual for $b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R=1$ |
| `diagnostics.row_results[].diagnostics.line_residuals` | line-by-line values of $\mathcal E_{\Gamma}^{(\ell)}(a,b;\mathbf{b}_{N}^{\mathrm{spec}})$ |
| `diagnostics.row_results[].diagnostics.line_residuals[].line_factor_Lambda_ab` | derived or declared hydrogen line factor $\Lambda_{ab}$ |
| `diagnostics.row_results[].diagnostics.line_residuals[].envelope_gap_over_h` | declared or derived envelope gap divided by $h$ |
| `diagnostics.row_results[].diagnostics.line_residuals[].observed_frequency` | declared or derived observer frequency used in the cadence-stretch readout |
| `diagnostics.row_results[].diagnostics.refinement_residuals` | resolution-pair residuals for the shared row prediction |

The packet succeeds only when its declared expectations are met. A failure witness should therefore have `status: "fail"` but `expectation_status: "pass"` when it fails for the intended reason.

#### Thermodynamic Residual

This protocol turns the local-horizon target in [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md#local-horizon-recovery-target) into a validation scaffold. It does not assume that gravity is thermodynamic at the substrate level. It tests whether one Noether sea state and observer-channel record can supply the three observer-level quantities used in the Jacobson comparison: boundary entropy, local temperature, and boost-energy flux.

The protocol is a proof-and-simulation target, not an empirical claim. A successful packet would show that the same record that recovers weak-field ADM/Cartan and PPN behavior also makes the local Clausius residual small in the equilibrium comparison regime.

##### Minimal Record

For each Physical Observer $O$, effective-horizon patch $\partial\Omega$, and finite analysis window $W=[t_a,t_b]$, the packet must declare one shared record $\theta$ with the following content.

| Channel | Required content | Failure prevented |
| --- | --- | --- |
| Noether sea state | $n(\mathbf X,T)$, $\rho_{\text{NS}}(\mathbf X,T)$, $\chi_{\text{sea}}(\mathbf X,T)$, $u^i_{\mathrm{sea,eff}}$, $e^a{}_i$, $\gamma_{ij}^{\mathrm{eff}}$, and $N$ on the relevant region | fitting entropy, flux, and metric response with separate Noether sea states |
| Physical Observer | worldline, clock-rate record, access region, reference resources, and observer acceleration $a_O$ derived from the metric channel | importing an external observer or a free Rindler frame |
| Boundary patch | $\partial\Omega$, effective patch area $A_{\partial\Omega}^{\mathrm{eff}}$, orientation, and signed crossing convention | hiding the area comparison in an undefined horizon surface |
| Boundary wake labels | retained label set $\mathcal{B}_{\partial\Omega}^{(O)}(\theta;W)$ with transmitter identity, emission time, receiver or sensor identity, reception time, channel, and persistence criterion | counting unrecorded or inaccessible microstates |
| Flux projection | either $T_{\mu\nu}^{\mathrm{eff}}(\theta)$ on the patch or a declared discrete estimator from the same causal-wake and provenance logs | fitting $dQ$ independently of the record |
| Gates | predeclared $\epsilon_{\mathrm{thermo}}$, $\epsilon_A$, $\epsilon_E$, convergence tolerances, and negative controls | selecting tolerances after seeing the output |

##### Boundary Count and Area Slope

The observer-accessible boundary label set is
$$
\mathcal{B}_{\partial\Omega}^{(O)}(\theta;W)
=
\left\{
b:
b\ \text{is a retained boundary-wake label crossing}\ \partial\Omega
\ \text{during}\ W
\ \text{and readable by}\ O
\right\}
$$

The first entropy estimator is the microcanonical count
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

This finite count is a packet estimator, not the final horizon-interface coefficient. For coefficient recovery, a row should be interpreted as a finite-block sample of the block-density target
$$
\widehat{s}_{U}^{(O)}(\theta;W)
=
\frac{1}{|U|}
\log
\left|
\mathcal{B}_{U}^{(O)}(\theta;W)
\right|
$$
where $U$ is the declared connected patch block and $\mathcal{B}_{U}^{(O)}$ retains only labels accessible to the same observer record. When $|U|$ is physical patch area, $\widehat{s}_{U}^{(O)}$ has inverse-area units and the large-block target is
$$
\widehat{s}_{U}^{(O)}
\longrightarrow
\frac{1}{4A_{\text{align}}}
$$
after boundary corrections. The dimensionless value $1/4$ applies only when the packet has explicitly normalized $A_{\text{align}}=1$; it is not a literal one-patch cardinality.

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

Passing this subgate means the retained logarithmic label count has the target area slope in the relevant equilibrium regime. It does not yet prove Page-curve recovery or black-hole endpoint closure.

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
\gamma_{ij}^{\mathrm{eff}}a_O^i a_O^j
$$

The continuum flux estimator is
$$
\widehat{dQ}_{\partial\Omega}^{(O)}(\theta;W)
=
\int_W\int_{\partial\Omega}
T_{\mu\nu}^{\mathrm{eff}}(\theta)\xi^\mu d\Sigma^\nu
$$

When the run has not constructed a continuum $T_{\mu\nu}^{\mathrm{eff}}$, the packet may use a discrete estimator, but only if every term comes from the same boundary-wake and observer record:
$$
\widehat{dQ}_{\partial\Omega,\mathrm{disc}}^{(O)}(\theta;W)
=
\sum_{b\in\mathcal{B}_{\partial\Omega}^{(O)}(\theta;W)}
\sigma_b E_b^{(O)}\omega_b^{(O)}
$$
Here $\sigma_b$ is the signed crossing convention, $E_b^{(O)}$ is the observer-level energy assigned by the same channel that builds $T_{\mu\nu}^{\mathrm{eff}}$, and $\omega_b^{(O)}$ is the declared quadrature or coarse-graining weight.

The measured local-horizon residual is then
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
On a relaxation window with no declared external work, the free-energy residual is
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
Here $\mathcal F_{\widehat T_z}$ is the packet's declared classical or quantum fluctuation-dissipation map. This check is a same-record discipline for equilibrium response. It does not assert that Noether sea dynamics is fundamentally stochastic.

##### Proof Route

The proof route has four controlled steps.

1. Show that $\mathcal{B}_{\partial\Omega}^{(O)}(\theta;W)$ is stable under temporal, spatial, and history-resolution refinement for the fixed observer and patch.
2. Show that $\Delta\widehat{S}/\Delta A_{\partial\Omega}^{\mathrm{eff}}$ converges to $k_B/(4A_{\text{align}})$ in the equilibrium local-horizon regime.
3. Show that the flux estimator from the same $\theta$ satisfies $\widehat{dQ}=\widehat{T}_U d\widehat{S}+O(\epsilon_{\mathrm{thermo}})$ while $\mathcal{R}_{E,\partial\Omega}^{(O)}$ remains small.
4. Use the existing ADM/Cartan handoff to show that the same record recovers the weak-field observer metric. Only after this step may the Jacobson comparison be promoted from analogy to a native recovery route for the effective Einstein equation.

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

1. randomize or drop a declared fraction of boundary-wake labels, which should break either area scaling or conservation;
2. replace $a_O$ with a constant temperature parameter, which should fail the same-record temperature test;
3. compute flux with an independently fitted stress record, which should be rejected as a split-record pass.

If these null runs still pass, the residual is not measuring thermodynamic closure.

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
| `negative_controls` | declared null runs and whether any passed when they should have failed |
| `totals.max_area_residual` | largest area-scaling residual across local-horizon rows |
| `totals.max_thermodynamic_residual` | largest $\widehat{\mathcal{R}}_{\mathrm{thermo}}^{(O)}$ across rows |
| `totals.max_conservation_residual` | largest $\mathcal{R}_{E,\partial\Omega}^{(O)}$ across rows |
| `gates` | label coverage, same-record temperature, same-record flux, area scaling, thermodynamic residual, conservation, weak-field same-record, and negative-control gates |
| `failure_code` | null on pass, otherwise the first failed thermodynamic-residual gate |

The mock packet is deliberately dimensionless. It uses $k_B=\hbar=c_0=A_{\text{align}}=1$ so the packet shape can be inspected by hand before any real Noether sea simulation supplies physical units, observer records, and boundary-wake provenance.

This runtime should not be expanded into a large fixture family unless it protects a live derivation. Its main value is to keep the theory honest at the handoff point where a candidate Noether sea record claims to supply entropy, temperature, flux, and weak-field metric recovery together. Until such a record exists, additional passing and failing fixtures are lower value than deriving the record itself.

##### Promotion Boundary

Passing this protocol would establish a local equilibrium recovery route for thermodynamic gravity language. It would not by itself close black-hole information release, strong-field endpoint regularity, Page-curve recovery, or cosmological horizon thermodynamics. Those remain separate validation packets that may consume the same boundary-label and same-record discipline.

### Cosmology Residuals

#### Cosmology Shared Residual Fit Protocol

This protocol turns the shared calibration gate in [Dark Energy](../../../../markdown/aaa/cosmology/dark-energy.md#inference-dependency-and-calibration-gates) into a first machine-checkable validation scaffold. Its purpose is narrow: test whether supernova, BAO, CMB, weak-lensing, redshift-space-distortion, BBN, and pre-BBN comparison packets can consume one shared Noether sea state record without silently replacing the state per observable family.

A cosmology fit can cheat without looking like a cheat. It can use one hidden state for supernovae, another for BAO, another for the CMB, and another for growth, while reporting one attractive summary. This protocol exists to stop that split: one shared Noether sea state record must feed the observable families that claim to belong to the same cosmology.

This is not a cosmological parameter fit and not an empirical claim. The first runtime artifact is a mock packet that fixes the object shape, residual accounting, projection-penalty semantics, gates, and failure codes that a real survey-facing packet must later populate.

##### Residual Object

Let

$$
\mathcal{X}_{\mathrm{cos}}
=
\{\mathrm{SN},\mathrm{BAO},\mathrm{CMB},\mathrm{WL},\mathrm{RSD},\mathrm{BBN},\mathrm{PREBBN}\}
$$

For each family $X\in\mathcal{X}_{\mathrm{cos}}$, the packet records a residual vector $r_X$, a covariance object $C_X$, nuisance/calibration context $\nu_X$, and a projection $\Pi_X\theta_{\mathrm{sea}}$ of the shared Noether sea state record into that family. The scaffold computes

$$
\mathcal{R}_X
=
r_X(\theta_{\mathrm{sea}},\nu_X)^T
C_X^{-1}
r_X(\theta_{\mathrm{sea}},\nu_X)
$$

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

where $K_X$ is the set of shared comparison coordinates reported by family $X$, and $w_a$ is a declared dimensionless weight. The packet-level residual is

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

A low value of the first term alone is insufficient. The second term is the split-ontology guard: it rejects a fit that keeps each observable close to its benchmark only by assigning mutually incompatible projections of $\theta_{\mathrm{sea}}$.

For empirical packets, $\mathcal{R}_X$ is a chi-square statistic only when $C_X$ is the declared covariance of the retained residual vector and its inverse is well defined on that retained subspace. Let $N_X$ be the rank of that covariance after masks and projections, and let $p_X$ be the number of parameters actually estimated from family $X$. The packet must report
$$
\nu_X^{\mathrm{dof}}=N_X-p_X
$$
and, when $\nu_X^{\mathrm{dof}}>0$, the reduced statistic
$$
\overline{\mathcal{R}}_X
=
\frac{\mathcal{R}_X}{\nu_X^{\mathrm{dof}}}.
$$
The raw $\mathcal{R}_X$ remains the additive packet term; $\overline{\mathcal{R}}_X$ is a scale diagnostic and must not replace a likelihood without a declared statistical derivation.

The nuisance record $\nu_X$ must state, before fitting, whether each nuisance quantity is fixed, profiled, or marginalized and how that choice changes $p_X$ and the effective covariance. The projection weights $w_a$, the penalty coefficient $\lambda$, and all residual and overlap thresholds are likewise frozen before fitting. They may be changed only in a separately identified sensitivity run, never retuned after seeing the shared-state result.

The first empirical packet should keep the leading standard comparison objects visible inside the residual vectors:
$$
r_{\mathrm{SN/BAO}}
\supset
\left(
\frac{d_L^\theta(z)-d_L^{\mathrm{obs}}(z)}{\sigma_{d_L}},
\frac{D_M^\theta(z)/r_d^\theta-(D_M/r_d)^{\mathrm{obs}}}{\sigma_{D_M/r_d}},
\frac{H^\theta(z)r_d^\theta-(Hr_d)^{\mathrm{obs}}}{\sigma_{Hr_d}}
\right)
$$
$$
r_{\mathrm{CMB}}
\supset
\left(
\frac{\Delta T_{\mathrm{bb}}^\theta}{\epsilon_{\mathrm{bb}}},
\frac{C_{\ell}^{\theta}-C_{\ell}^{\mathrm{obs}}}{\sigma_{C_\ell}},
\frac{C_L^{\phi\phi,\theta}-C_L^{\phi\phi,\mathrm{obs}}}{\sigma_{C_L^{\phi\phi}}}
\right)
$$
$$
r_{\mathrm{growth}}
\supset
\left(
\frac{f\sigma_8^\theta(z,k)-f\sigma_8^{\mathrm{obs}}(z,k)}{\sigma_{f\sigma_8}},
\frac{P^\theta(k,z)-P^{\mathrm{obs}}(k,z)}{\sigma_P}
\right)
$$
and $r_{\mathrm{BBN}}$ should retain D/H, $Y_p$, lithium, $\eta$, and $\Delta N_{\text{eff}}$ rows. These are data-product coordinates, not ontology claims. They make the shared packet check luminosity distance, BAO rulers, blackbody preservation, CMB lensing, growth, and BBN yield recovery before any Noether sea state interpretation is promoted.

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
where $Z_X$ is the total logarithmic redshift budget, $Y_{X,\mathrm{path}}$ is the signed path-history exchange contribution, and $Y_{X,\mathrm{cal}}^{\mathrm{obs}}$ is any declared calibration row such as a Sunyaev-Zeldovich or kinematic-Sunyaev-Zeldovich frequency-shift packet. This row does not add a separate cosmology gate. It prevents a shared-state fit from hiding path-frequency exchange inside $H(z)$, distance modulus, or CMB temperature calibration.

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

where `kept` means the subset reported by the survey bin. This avoids pretending that isotropic BAO bins contain independent radial and transverse information.

The acoustic-ruler coherence check is evaluated inside this BAO family rather than as a separate cosmology gate. Partition the catalogue into predeclared sky patches $p$, tracer classes, and redshift bins $b$; fit every subset with the same distance calibration, nuisance model, window-function treatment, and reconstruction procedure. Let

$$
\ell_{pb}
\equiv
\ln r_{d,pb}^{\mathrm{fit}},
\qquad
\bar{\ell}_d
=
\frac{
\mathbf 1^T\mathbf C_{\ell}^{-1}\boldsymbol{\ell}
}{
\mathbf 1^T\mathbf C_{\ell}^{-1}\mathbf 1
},
$$

where $\mathbf C_\ell$ includes cross-patch covariance and survey-window coupling. The dispersion row is

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

The overlap key `CMB_lensing` must appear in both CMB and growth-facing projections whenever lensing is used. Otherwise a packet can accidentally fit CMB spectra with one projection and weak-lensing or clustering with another, which is exactly the split-ontology failure this protocol is meant to catch.

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

Here $w_{\mathrm{lin}}$ and $c_{s,\mathrm{lin}}^2$ are comparison coordinates for CDM-like linear loading, while $v_c(r)$, $\Delta_{\mathrm{BTFR}}$, $\mathrm{RAR}$, $a_\star(E)$, and $f_\star(E)$ are nonlinear acceleration-response coordinates. A dimensionless BTFR residual can be recorded as

$$
\Delta_{\mathrm{BTFR}}^\theta
\equiv
\frac{G_N M_b^{\mathrm{obs}} a_\star^\theta(E_{\mathrm{gal}})}{(v_f^\theta)^4}
-1
$$

with $v_f$ the retained flat-curve velocity and $M_b$ the retained baryonic mass. The environment label $E$ is not a new ontology coordinate; it is the observable context carried in $\nu_X$. For these rows it should include at least $M_{\mathrm{halo}}$, $z_{\mathrm{vir}}$, $\sigma_v$, $T_{\mathrm{eff}}$, the baryon profile, and, for mergers, the declared ratio $v_{\mathrm{inf}}/c_s$ when the comparison template supplies a sound-speed coordinate. The low-acceleration galaxy comparison may be expressed as

$$
g_{\mathrm{obs}}^\theta(r,E_{\mathrm{gal}})
=
g_{\mathrm{bar}}(r)
+
g_{\mathrm{med}}^\theta(r,E_{\mathrm{gal}})
$$

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

This row is a success marker under the existing shared-state gate, not a new standalone gate. It records whether the same Noether sea state packet can recover cluster gas temperature, SZ pressure, lensing potential, dynamical potential, and Bullet-like lensing/galaxy/gas peak separation without changing the acceleration law between observables.

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

The ratio $v_{\mathrm{inf}}/c_s$ distinguishes low-dissipation pass-through encounters from high-dissipation encounters in comparison templates that provide $c_s$. The coordinate $\mathcal{I}_{\mathrm{int}}$ is a declared shell or interference-morphology statistic for high-relative-speed mergers, and $N_{\mathrm{vort}}(R)$ is included only when the comparison template predicts vortex-like substructure measurable through lensing over projected radius $R$. Cold-atom or other laboratory analogue simulations can supply provenance for these dimensionless template variables, but visual analogy is not a substitute for astronomical residual rows under the shared-state packet.

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
The projection keys should include the ordinary shared cosmology coordinates plus branch-facing coordinates such as `Delta_N_eff`, `lambda_fs`, and `Omega_GW`. The packet passes this subgate only when the ordinary residual $\mathcal{R}_{\mathrm{PREBBN}}$ is small and the projection penalty shows that the same $\theta_{\mathrm{sea}}$ is being consumed by BBN, CMB, growth, and gravitational-wave comparisons.

##### Frame-Split Measurement Recipe

The `cosmology.frame_split` witness is the directional subgate for the same shared-state problem. It asks whether the rest-frame correction used for CMB inference can coexist with matter dipoles, supernova residual directionality, BAO anisotropy, and local $H_0$ scatter without giving each family its own hidden frame.

The required frame families are

$$
\mathcal{F}_{\mathrm{frame}}
=
\{\mathrm{CMB},\mathrm{MD},\mathrm{SN},\mathrm{BAO},H_0\}
$$

where $\mathrm{MD}$ denotes matter-dipole catalogues such as radio, infrared, quasar, or galaxy-count samples. Each row must report a measured three-vector $\mathbf{y}_i$, an expected three-vector $\mathbf{m}_i(\theta_{\mathrm{frame}})$ from the declared common frame model, a covariance object $C_i$, calibration or mask context $\nu_i$, and a projection $\Pi_i\theta_{\mathrm{frame}}$ onto shared frame coordinates.

The context $\nu_i$ must distinguish observational provenance from physical residuals. At minimum it should identify the sky mask or footprint, foreground or component-separation recipe when relevant, beam or transfer-function correction, redshift-bin and selection function, standardization or calibration model, covariance construction, and any simulation, mock-catalogue, or machine-learning training source used to estimate significance. These entries do not add another cosmology gate; they prevent a frame residual from being promoted when the mismatch is actually a reduction-pipeline or training-prior artifact.

The preprocessing rules are:

- CMB: $\mathbf{y}_{\mathrm{CMB}}=\mathbf{D}_{\mathrm{CMB}}$ and $\mathbf{m}_{\mathrm{CMB}}$ is the same dipole vector in the declared coordinate convention.
- Matter dipoles: for catalogue $X$, $\mathbf{y}_{\mathrm{MD},X}=\mathbf{D}_X$ and
  $$
  \mathbf{m}_{\mathrm{MD},X}
  =
  K_X(\alpha_X,x_X)\,\mathbf{D}_{\mathrm{CMB}}
  +
  \mathbf{F}_{X}(\theta_{\mathrm{frame}},\nu_X)
  $$
  where $K_X$ is the catalogue kinematic amplification factor and $\mathbf{F}_X$ is the allowed non-kinematic directional residual from the shared frame state and survey context.
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

The frame-projection penalty is

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

and the combined frame score is

$$
\mathcal{R}_{\mathrm{frame}}
=
\mathcal{Q}_{\mathrm{frame}}
+
\lambda_{\mathrm{frame}}\mathcal{P}_{\mathrm{frame}}
$$

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

The mock packet is deliberately small enough to inspect by hand. A real packet should replace the dimensionless residual entries with survey-derived residual vectors and covariance matrices, but it should keep the same gate shape unless this protocol is explicitly revised.

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

Failure is informative. If the ordinary residual passes but the projection penalty fails, the candidate has fit the data products while splitting the Noether sea state record. If the projection penalty passes but an observable residual fails, the shared state is coherent but not yet accurate. If coverage fails, the packet is not a cosmology closure artifact.

#### Redshift-Budget Toy Model

This protocol documents the first redshift-budget simulation fixture for the cosmology branch. The fixture is a bookkeeping replay of the factorized redshift record in [Expansion Mechanism](../../../../markdown/aaa/cosmology/expansion-mechanism.md#minimal-redshift-budget-toy-model), not an empirical distance-ladder fit.

A redshift budget is a receipt for a photon record. It separates endpoint cadence, source-branch state, launch geometry, path-history transport, and signed frequency exchange so that a line shift is not silently converted into one undifferentiated expansion variable.

Its purpose is narrow: verify that endpoint cadence, source-branch state, launch geometry, and Noether sea path-history remain separable in a machine-readable packet before any survey-facing cosmology comparison is attempted. The current packet also exposes the continuity-disciplined path-rate law, so source loading, equilibration, frequency-space current, flow divergence, and anisotropic response are not hidden as unrelated fitted terms.

##### Runtime Artifact

Run the default mock packet with:

```text
node scripts/cosmology/redshift-budget-toy-model.mjs --pretty
```

The script consumes:

```text
scripts/cosmology/redshift-budget-mock.json
```

and emits one result row per scenario. The packet is deliberately dimensionless except for declared line frequencies, Euclidean path distance in megaparsecs, and the comparison constants $c_0$ and $h$. Here $h$ is the observer-level action benchmark used by the recovered photon energy-frequency map; it is not a substrate input.

##### Replay Equation

For a line family $X$, the path record is divided into segments of length $\Delta s_j$. The propagation bookkeeping variable starts at

$$
Y_{X,0}=0
$$

and advances by

$$
Y_{X,j+1}
=
Y_{X,j}
+
\alpha_{\mathrm{prop},X,j}\Delta s_j
$$

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

This is not an untracked photon-energy loss model. $Y_{X,N}$ is the path-history phase-cadence stretch left after endpoint cadence, source-branch shift, and launch geometry have been declared.

The path-history term is signed. A positive increment in $Y_X$ is a redward frequency depletion relative to the clean emitted line, while a negative increment is a blueward frequency boost. For a segment-level exchange row,

$$
\Delta Y_{X,j}^{\mathrm{ex}}
=
-\ln
\frac{\nu_{X,j}^{+}}{\nu_{X,j}^{-}}
$$

with $\nu_{X,j}^{-}$ and $\nu_{X,j}^{+}$ measured in the same local comparison convention before and after the exchange. Sunyaev-Zeldovich-like mock rows should therefore be represented as signed exchange events rather than as a new expansion variable: a hot or coherently moving intervening medium may produce $\Delta Y_{X,j}^{\mathrm{ex}}<0$, while a lower-energy absorbing or relaxing segment may produce $\Delta Y_{X,j}^{\mathrm{ex}}>0$.

Each exchange row should also carry the local energy residual

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
These are observer-level distance-ladder diagnostics. A path law that shifts line frequencies but does not dilate packet cadence, or that loses flux without the two redshift factors and angular-distance reciprocity, is not an acceptable cosmological redshift replacement.

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
| `frequency_exchange_events_by_line` | optional signed exchange rows with before/after photon frequency, medium energy change, recoil/remnant terms, and $R_{\nu\text{-}\mathrm{ex}}$ |

Segment records may provide separate coefficient arrays for frequency, packet cadence, line-family comparison, and image-bundle beams. This is intentional: the first validation target is to expose when those channels agree and when they split.

Endpoint records may declare $\Gamma_N$ directly or provide a cadence measurement from which the same factor is computed:

$$
\Gamma_N
=
\frac{T_N}{T_{N0}}
=
\frac{\Omega_{N0}}{\Omega_N}
$$

In JSON, this is supplied as `Gamma_N`, `T_N_over_T_N0`, `Omega_N_over_Omega_N0`, or the weak-field proxy `Phi_N_over_c0_squared`, for which the fixture uses $\Gamma_N\approx1-\Phi_N/c_0^2$. Scalar `Gamma_N_E` and `Gamma_N_R` values remain valid fallbacks for older or hand-written scenarios.

Launch records compute the low-speed source/receiver geometry factor from the radial endpoint velocity,

$$
\beta_r
=
\frac{(\mathbf{v}_R-\mathbf{v}_E)\cdot\hat{\mathbf{k}}}{c_0},
\qquad
D_v
=
\sqrt{\frac{1-\beta_r}{1+\beta_r}}
$$

where $\hat{\mathbf{k}}$ points from emitter to receiver and $v_r>0$ means the endpoint separation is increasing. A packet may provide `beta_r`, `radial_velocity_km_s`, or the triple `emitter_velocity_km_s`, `receiver_velocity_km_s`, and `line_of_sight`. Scalar `D_v` remains the fallback.
This observer-level launch factor is not either causal-root factor from the Master Equation: it must not be serialized as the transmitter-side $D_t$, the receiver-side $D_r$, or the signed root-playback ratio $D_r/D_t$.

The continuity-transport extension uses the segment packet

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

In JSON, `continuity_transport_by_line` supplies `p_theta_row`, `D_gamma_theta`, `p_nu`, `f_N`, `S_BH`, `S_GW`, `R_eq`, `partial_nu_J_nu`, `p_u`, `div_u_sea`, `p_sigma`, `sigma_projection`, and `R_coh` as needed. The fixture logs the resulting pieces as `continuity.theta_gradient`, `continuity.cadence_residual`, `continuity.flow_divergence`, `continuity.anisotropic_response`, and `continuity.coherence_residue`. Legacy named `transport_terms_by_line` values are still accepted as explicit additions, but a promotable transport scenario should prefer the continuity packet whenever it is claiming to test Noether sea equilibrium transport.

##### Coefficient-Row Validation Notes

The fixture now reads each scenario as a restriction of the same coefficient-row map, not as a separate explanation for each redshift class. The endpoint extraction tests the cadence row

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

with the weak static condition $b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R=1$, or $b_n a_n+b_\chi(1+\gamma_{\mathrm{PPN}})+b_\lambda a_\lambda+b_R a_R=1$ when the shared clock/signal delay closure is imposed. This fixture does not determine the individual endpoint coefficients; it checks whether endpoint records are replayed as endpoint cadence rather than hidden inside propagation or source factors.

The launch extraction tests the separate relative-motion term. In a homogeneous record with no source-branch or path-history contribution, the replay must reduce to

$$
Z_X=-\ln D_v,
\qquad
Y_{X,N}=0
$$

The scalar launch fallback and `launch_record` extractor therefore validate the sign and ownership of the motion term. A scenario fails the coefficient-row reading if it needs a nonzero propagation packet to recover a clean relative-motion redshift.

The continuity packet tests only the path row

$$
\left(
\mathbf p_X,\,
p_{\nu,X},\,
p_{u,X},\,
p_{\sigma,X}
\right)
$$

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

The mock rows constrain products of coefficients with declared segment records; they do not by themselves fix $\mathbf p_X$, $p_{\nu,X}$, $p_{u,X}$, or $p_{\sigma,X}$ individually. Those freedoms are falsified by the diagnostics already exposed here: chromaticity residuals, image-bundle variance, time-dilation residuals, nonzero laboratory residuals, or a need to replace the continuity packet with unrelated named terms.

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

In JSON, `lambda_row` supplies the four dimensionless coefficients and `q_DE_per_s` supplies the corresponding rate entries in inverse seconds. The script divides by the declared photon-channel speed, using `c_gamma_km_s` when present and otherwise `c0_km_s`, to convert the result into a path coefficient in $\mathrm{Mpc}^{-1}$. A packet may instead supply `q_DE_per_mpc` when the rate has already been converted into path units.

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

The diagnostics are not pass/fail cosmology claims. They are failure witnesses for the factorization itself.

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
| large `chromaticity_residual` on clean lines | the path law is behaving like a line-dependent loss process rather than a shared transport law |
| large `image_bundle_variance` | neighboring beams accumulate incompatible $Y$ values, which threatens image sharpness |
| large `time_dilation_residual` | frequency shift and packet-cadence stretch no longer share one propagation record |
| large `dark_energy.*` dominance with failed chromaticity or cadence checks | the dark-energy handoff is acting like a fitted redshift source rather than a shared Noether sea transport coefficient |
| continuity packet replaced by unrelated named source terms | the run is not testing the no-case-switch transport law because $\partial_\nu J_\nu$, source loading, equilibration, and flow response have been separated into free fit parameters |
| large total $Z_X$ with small $Z_{\mathrm{prop},X}$ | endpoint cadence, source branch, or launch geometry dominate, so distance cannot be inferred from propagation alone |
| nonzero laboratory residual after local corrections | the factorization leaks local calibration or source-branch effects into the propagation channel |

A promotable redshift-distance packet must keep these diagnostics attached to the same Noether sea state record that later feeds supernova, BAO, CMB, growth, and local-ladder comparisons.

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
5) Apply anti-ratchet scoring discipline: begin from null movement, require category-specific accepted evidence before increasing a score, and lower a score when new evidence shows that an earlier assessment counted scaffolding, plans, local fits, or provisional diagnostics as accepted closure.
6) Add or populate the next dated assessment column in closure-scorecard.md with raw numeric scores, placing it after existing dated $\mathbb{A}\mathbb{A}\mathbb{A}$ columns and before $\Delta$; preserve previous assessment columns unless explicitly told to replace or remove them.
7) Recompute each $\Delta$ value as the latest dated $\mathbb{A}\mathbb{A}\mathbb{A}$ score minus $\max(\text{Modern Physics Operational},\text{Modern Physics Mechanism})$.
8) Recompute the TOTAL row as the weighted arithmetic mean using the Weight column; round the displayed TOTAL only after computing the weighted mean from the raw row scores.
9) Add a dated assessment-notes section for the new column, naming concrete gains, regressions, and remaining blockers. If an assessment column or note is removed, remove or rewrite stale date references that pointed to it.
10) Keep all TeX intact and preserve category definitions unless explicitly asked to revise them.
```

Scale: `0-100` (standard numeric grading scale).
Total score rule: weighted arithmetic mean using the Weight column.

Challenger-theory weighting rule: the table must test incumbent recovery first, then challenger surplus. Empirical benchmarks, formula/coefficient recovery, parameter closure, and certified dynamics keep the largest combined weight because a challenger theory must recover the accepted operational stack before claiming replacement status. Architecture, ontology, coverage, and anomaly discipline are scored explicitly but remain bounded so that explanatory reach cannot compensate for missing recovered coefficients or benchmark passes.

### Scoring Lens

The scorecard now weights highly validated mathematical closure. A high score requires not only a coherent theory route, but also explicit equations, coefficient-level derivations, parameter fixing, and contact with tested benchmark physics.

This lens scores accepted closure, not the presence of a plan for closure. Protocols, ledgers, mock packets, replay fixtures, and negative controls can raise Falsification Gates, Coverage+Interface Readiness, or adjacent readiness rows. They should raise Formula+Coefficient Recovery, Parameter+Scale Closure, or Empirical Precision+Benchmark Validation only when they produce retained branch-derived coefficients, fixed parameters, or benchmark passes under declared tolerances.

Shared-record discipline is part of the score. A result that works only after changing the branch record, Noether sea state, coefficient row, apparatus kernel, or calibration context per observable remains local; it should not be scored as cross-regime or empirical closure. Negative and no-go diagnostics can improve auditability and falsification readiness, but they do not by themselves recover target formulas, constants, or benchmark data.

#### Anti-Ratchet Scoring Discipline

Score changes are symmetric. A new assessment may increase, decrease, or leave unchanged any row, and the default posture is null movement unless category-specific evidence crosses the score boundary. Do not award points merely because a new assessment was requested, more documents exist, more ledgers, gates, or protocols were added, or a workstream feels closer than before.

The burden of proof is highest for upward movement. A score can rise only when the new evidence satisfies the category being scored: accepted coefficients for Formula+Coefficient Recovery, fixed constants for Parameter+Scale Closure, benchmark passes for Empirical Precision+Benchmark Validation, certified dynamics for Master EOM+Local Dynamics, and so on. If new work clarifies that an earlier assessment counted scaffolding, provisional diagnostics, local fits, or bookkeeping as accepted closure, the score must go down.

Ledgers, gates, validation packets, mocks, source-mining records, and diagnostics required before advancement usually score as Falsification Gates or Coverage+Interface Readiness only when they add enforceable acceptance or failure conditions. They do not raise formula, parameter, empirical, or coefficient rows until they carry accepted recovered values, same-record derivations, or declared-tolerance passes.

Score bands:

- `90-100`: equation-level closure with derived coefficients or theorems, fixed parameters where relevant, and strong empirical or formal validation.
- `70-89`: validated or mathematically mature closure in a broad regime, but with known interface limits, fitted quantities, or incomplete foundational mechanism.
- `50-69`: coherent formal route with substantial equations or models, but missing key derivations, coefficients, or validation passes.
- `30-49`: developed architecture or proof program with major mathematical targets still open.
- `0-29`: hypothesis, placeholder, or early scaffold without certified mathematical closure.

Architectural coherence and ontic logic remain explicit criteria because they matter to theory quality. They carry limited weight so that a strong $\mathbb{A}\mathbb{A}\mathbb{A}$ architecture can score high as architecture without inflating the validated-closure total.

### Current Form-Level Recoveries

Several mappings are now reproducible as forms, while their coefficients remain blocked by the absence of a certified braid and a derived Noether sea response tensor. They should be credited as formula scaffolds and closure interfaces, not as empirical or coefficient-level closure.

| Sector | Reproducible now | Still blocked |
| :--- | :--- | :--- |
| Weak-field GR bridge | The effective metric handoff exports ADM/Cartan variables and the clock/ruler quadratic form, and the weak clock row reproduces $d\tau_{\mathcal A}/dt\approx1-U_N/c_0^2-\|\mathbf w\|^2/(2c_0^2)$ after the clock-channel potential is matched to the Newtonian benchmark. | $\Phi_{\mathrm{eff}}=\Phi_N$, $G_{\mathrm{eff}}$, PPN coefficients, and any Einstein-equation analogue still require one same-record Noether sea constitutive derivation. |
| Quantum envelope bridge | The retained phase-amplitude chart reproduces the Madelung/Hamilton-Jacobi residual with $Q_{\mathrm{env}}=-(\hbar_{\mathrm{eff}}^2/(2m_{\mathrm{eff}}))\nabla^2\sqrt{\rho_{\mathrm{env}}}/\sqrt{\rho_{\mathrm{env}}}$, and resonance-locked single-valuedness supplies the Bohr-Sommerfeld integer. | Born-rule recovery, spin-$\tfrac{1}{2}$ exchange, and fermionic antisymmetry remain blocked by the basin-measure pushforward and the polarity-domain-wall $\mathbb{Z}_2$ holonomy wall. |
| Thermodynamic history bridge | The [entropy chapter](../../../../markdown/aaa/dynamics/entropy.md#mapping-in-from-standard-entropies) defines the same-record sea-retuning ratio $\Lambda_{\text{sea}}=T_{\text{retune}}/T_{\text{cycle}}$ and predicts a hysteresis-loop obstruction when $\Lambda_{\text{sea}}\gtrsim1$. | The signature remains a falsifiable simulation target until a retained Noether sea response record derives the loop area and its retuning dependence without an independently fitted entropy defect. |
| Fixed-void cosmology | No-expanding-void discipline forces transport-redshift rows that must recover Tolman $(1+z)^{-4}$, light-curve time dilation $(1+z)$, and $T_{\mathrm{CMB}}(z)=T_0(1+z)$ rather than tired-light energy loss. | No derived $a_{\mathrm{eff}}(t_{\mathrm{eff}})$, Friedmann analogue, sea equation of state, or shared cosmology fit exists until the mass map and Noether sea response coefficients are branch-derived. |

These form-level recoveries should not raise Parameter+Scale Closure, Empirical Precision+Benchmark Validation, or coefficient-recovery scores by themselves. They can raise interface readiness or formula-structure scores only when the document explicitly preserves the same-record blocker and the closure-inheritance dependency on the first certified braid.

### Assessment Table

Modern physics columns use the same categories for the effective-theory stack (`GR`, `QM`, `QED`, `QFT`, `QCD`, `SM`, `LCDM`): one operational/effective score and one mechanism/foundational score. The operational column measures validated mathematical and empirical closure of the effective theories. The mechanism column measures how far the same stack supplies a unified underlying mechanism rather than a collection of successful effective descriptions.

The $\Delta$ column is computed as the latest dated $\mathbb{A}\mathbb{A}\mathbb{A}$ score minus $\max(\text{Modern Physics Operational},\text{Modern Physics Mechanism})$; negative values mark current $\mathbb{A}\mathbb{A}\mathbb{A}$ deficits against the stronger modern-physics comparator.

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
| Internal Constituent Dynamics | 5 | Detailed closure of internal constituent regimes: bound-state/composite dynamics in modern physics and Family-A/Noether braid dynamics in $\mathbb{A}\mathbb{A}\mathbb{A}$. | 82 | 52 | 55 | 82 | 0 |
| Falsification Gates | 4 | Explicitness and enforceability of falsification thresholds, stop conditions, validation gates, and failure criteria. | 98 | 82 | 80 | 98 | 0 |
| Discriminating Predictions+Anomaly Discipline | 6 | Independently checkable risky predictions, anomaly-resolution discipline, residual accounting for known tensions, and protection against post-hoc fitting. | 86 | 48 | 48 | 70 | -16 |
| Coverage+Interface Readiness | 2 | Coverage completeness across mathematics/geometry-relevant domains, including interface consistency and minimally developed sections. | 97 | 72 | 72 | 97 | 0 |
| Axiom+Notation | 3 | Canonical symbols, definitions, and cross-chapter mathematical language consistency. | 94 | 74 | 92 | 99 | 5 |
| Theory Architecture+Ontic Logic | 7 | Unified theoretical architecture, explanatory parsimony, substrate logic, and avoidance of ad-hoc patching, scored separately from validated formula recovery. | 50 | 25 | 96 | 99 | 49 |
| **TOTAL** | **100** | **Weighted mean across all categories.** | **86** | **56** | **46** | **68** | **-18** |

### 2026-06-28 Comparator and $\mathbb{A}\mathbb{A}\mathbb{A}$ Rescore Notes

The 2026-06-28 comparator rescore changes the Modern Physics Operational column from `88` to `86` and the Modern Physics Mechanism column from `67` to `56`. The prior comparator overcredited the mechanism column by letting sector-by-sector operational success stand in for a unified foundational mechanism. Under the challenger-theory lens, the inherited stack remains extremely strong operationally, but its mechanism score is lower because GR, QFT, the Standard Model, and Lambda-CDM do not yet form one ontic dynamics with fixed constants, a shared quantum-gravity bridge, a solved measurement mechanism, or a single dark-sector account.

One new row is added: Discriminating Predictions+Anomaly Discipline. This row is necessary because a challenger theory is not assessed only by reproducing known benchmarks or by having falsification gates. It must also expose independently checkable consequences, anomaly-resolution residuals, and protections against post-hoc fitting. The row is bounded at weight `6` so that it records challenger surplus without letting speculative reach substitute for benchmark recovery.

The reweighting keeps incumbent recovery dominant. Empirical Precision+Benchmark Validation remains weight `14`, while Formula+Coefficient Recovery, Parameter+Scale Closure, Potential+Action Closure, and Master EOM+Local Dynamics together still carry `38` more points. Architecture and ontology remain important, but Theory Architecture+Ontic Logic falls from weight `8` to `7`, and Axiom+Notation falls from weight `4` to `3`, preventing the table from turning into an architecture-preference score.

The latest $\mathbb{A}\mathbb{A}\mathbb{A}$ column is also replaced with the 2026-06-28 anti-ratchet rescore. Conservation+Invariant Closure rises from `74` to `75`, Cross-Regime Bridge rises from `73` to `74`, Internal Constituent Dynamics rises from `81` to `82`, and Falsification Gates rises from `97` to `98`; all other latest-row scores remain unchanged. The latest $\mathbb{A}\mathbb{A}\mathbb{A}$ weighted total remains displayed as `68` with raw value `67.90`, and the comparator adjustment changes the displayed total deficit from `-20` to `-18`. The row-level advantage is still concentrated in Axiom+Notation and Theory Architecture+Ontic Logic; the major deficits remain Empirical Precision+Benchmark Validation, Formula+Coefficient Recovery, Parameter+Scale Closure, Conservation+Invariant Closure, Potential+Action Closure, UV/IR+Regularization Completion, and Discriminating Predictions+Anomaly Discipline.

### 2026-06-26 Assessment Notes

*Lineage note: the corresponding dated table column has been retired; this assessment note is retained under rule 9.*

The 2026-06-26 assessment records a weighted $\mathbb{A}\mathbb{A}\mathbb{A}$ score of `68` after assessing the current `167` markdown files under `content/markdown/aaa` through the validated-closure lens. The gain over the prior retained assessment is real but intentionally bounded. The corpus now has a sharper proof and validation spine: shared closure is expressed as an intersection of sector acceptance sets, null-result residuals now include same-record split penalties, simulation campaigns require artifact-bearing proof handoffs, and equation-mapping checkers more aggressively reject priority prose, generated shells, probes, mocks, and source-evidence fixtures as accepted retained evidence.

The strongest score movement is in action, conservation, regularization, and interface discipline. The Master Equation chapter now distinguishes the accepted delayed branch law from the pure scalar $1/r$ action scaffold, records a local no-go for finite same-support scalar and delta-jet counterterms, and preserves a characteristic-direction receiver-gradient identity without treating it as an accepted action or conservation construction. This sharpens Potential+Action Closure and Conservation+Invariant Closure, but does not establish theorem closure: a retained branch chart still has to show an accepted motion derivation, positive transmitter-side Jacobian floors, retained transmitter-side acceleration-weight rows, finite memory depth, and closed motion-plus-wake history accounts on the same row set.

Formula and cross-regime scores rise because the equation-mapping work now covers a wider physics inventory with explicit first blockers: compact-star support, gravitational-wave source recovery, recombination/acoustic transfer, inverse-Compton/SZ path-frequency exchange, finite-window scattering/resonance carriers, weak-visible ledgers, ordered-frame magnetic rows, radiation source ledgers, and shared observation records. Those packets improve the formula interface and make hidden-retune failures easier to locate. They do not yet supply retained branch-derived coefficients, accepted Noether sea response tensors, or benchmark passes, so Formula+Coefficient Recovery remains only low-`50s`, and Empirical Precision+Benchmark Validation remains in the low `40s`.

Parameter+Scale Closure rises modestly because the Parameter Ledger now separates primitive substrate parameters, regulators, geometric closure targets, constitutive closure targets, state variables, and CODATA benchmark rows more rigorously, including exact-SI versus adjusted-measurement residual discipline and the Layer-I two-body scale reduction. The decisive quantities remain open: $A_0$, $\zeta(A_0)$, $E_{\text{internal}}(A_0)$, $\mathcal{M}_{\text{sea}}^{ab}$, $G_{\mathrm{eff}}$, $\alpha$, mass ratios, weak-mixing values, photon-channel coefficients, and cosmology fit parameters are still closure outputs rather than accepted recovered values.

The score is still held below modern operational closure by the same central blockers. No single accepted native record yet supplies the first certified braid, the mass map, Lorentz/PPN coefficients, Born/Bell measures, Standard Model mixing and mass rows, radiation spectra, public gravitational-wave residuals, BBN/CMB/growth fits, or a shared cosmology observation record inside declared tolerances. The recent work makes the failure boundary more explicit and the proof route more mathematical; it does not erase the need for one branch-derived, same-record coefficient and benchmark recovery stack.

### 2026-06-20 Assessment Notes

*Lineage note: the corresponding dated table column has been retired; this assessment note is retained under rule 9.*

The 2026-06-20 assessment records a weighted $\mathbb{A}\mathbb{A}\mathbb{A}$ score of `65` after a full read of the `163` markdown files under `content/markdown/aaa`. The score is concentrated in mathematical scaffolding, validation discipline, and interface coverage rather than in final recovery of observed coefficients. The corpus now has a much stronger causal-action and energy/conservation spine: the scalar causal-hit functional has a regularized theorem spine and finite-memory bounds, the energy chapter separates finite-window wake-history balances from particle-only conservation, and Noether braid dynamics states a shared causal-closure certificate target that ties causal-root ledgers, Jacobian floors, transmitter-side acceleration weights, mass response, observer exports, event ledgers, and stability rows to the same retained branch.

The score increase is deliberately limited by the validated-closure lens. Many of the strongest new artifacts are still explicitly theorem targets, mock packets, replay fixtures, or rejection diagnostics. The hydrogen $\Gamma_N$ spectral scan now keeps density, Noether sea delay, scale, envelope, and braid-scale rows separate and uses a shared coefficient row, but it does not yet derive hydrogen envelope gaps, real observer frequencies, or the static response vector from the master dynamics. The cosmology shared-residual fit, Bell-family record-measure harness, radiation ledgers, massive-superposition gravity packet, and thermodynamic residual protocol improve falsification-readiness and benchmark shape, but they do not yet supply empirical joint fits or accepted branch-derived coefficients.

Formula, parameter, and empirical rows remain the main drag on the total. The corpus still lacks a single accepted native record that supplies $E_{\text{internal}}(A_0)$, $\zeta(A_0)$, $\mathcal{M}_{\text{sea}}^{ab}$, Lorentz/PPN coefficients, photon-channel coefficients, Born/Bell measures, weak-mixing and CKM/PMNS values, Standard Model mass formulas, radiation benchmarks, and shared cosmology residual fits. The Parameter Ledger improves the bookkeeping of primitive constants, geometric closure targets, constitutive closure targets, CODATA benchmark rows, and null-result discipline, but most decisive symbols remain open or branch-dependent rather than fixed outputs.

Falsification and coverage now score near modern-operational levels because the corpus contains explicit sector acceptance sets, null-result residuals, failure conditions, benchmark protocols, and cross-regime packet schemas. That does not make the total near modern physics. Architecture and ontology remain very strong, but their limited score weight prevents coherence from compensating for missing derivations, missing coefficients, unfixed parameters, and unvalidated benchmark recovery.

### 2026-05-22 Assessment Notes

*Lineage note: the corresponding dated table column has been retired; the predecessor `59` score was an intermediate assessment column that is no longer displayed, and this note is retained under rule 9.*

The 2026-05-22 assessment raises the weighted $\mathbb{A}\mathbb{A}\mathbb{A}$ score from `59` to `61`. The increase is concentrated in notation, internal constituent dynamics, cross-regime bridge quality, and falsification discipline. It is not a coefficient-recovery jump: the central benchmark rows still lack a retained branch that recovers masses, Lorentz / PPN coefficients, photon-channel coefficients, Born/Bell measures, weak mixing, Standard Model masses, or cosmological residuals from one accepted native record.

The Noether braid taxonomy separates the broad neutral assembly class from the prescribed Family-A, Family-B, and Family-C charts; treats exact binaries as a proof assumption rather than a naming axiom; and routes dynamic exclusion-envelope geometry into the dedicated braid-envelope chapter. That chapter adds a computable assembly/Noether sea interface diagnostic,

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

with locked and ambient contributions built from the same causal-root kernel, Jacobian floors, transmitter-side acceleration weights, branch records, channel projections, and ledger-derived tolerance scales. This justifies raising Axiom+Notation, Cross-Regime Bridge, Internal Constituent Dynamics, and Coverage+Interface Readiness, while keeping the claim below full closure because the interface diagnostic is still a recovery target rather than a validated medium-response theorem.

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

Executable neutral-braid diagnostics add negative evidence and sharper first-failure semantics. The current sampled octahedral root-ledger diagnostic passes the all-pairs sampled root/Jacobian screen, while the fixed-coordinate zero-offset fixed-speed row is rejected by a nonzero tangential residual witness and an ordinary same-transmitter positive-delay no-go. These artifacts improve falsification readiness and empirical/simulation discipline because they report `not_retained` rather than converting a failed seed into branch evidence. The score increase is deliberately small because sampled diagnostics, no-go witnesses for one fixed-coordinate seed, and finite-mode search schemas do not yet replace an interval-certified all-pairs root ledger, action/Noether row, event ledger, stability certificate, or observer-export recovery.

The total remains far below modern operational closure for the same reason as the prior assessments. The theory stack has stronger taxonomy, residual surfaces, and diagnostics required before advancement, but not the decisive retained branch. Until a single native record supplies $E_{\text{internal}}(A_0)$, $\zeta(A_0)$, $\mathcal{M}_{\text{sea}}^{ab}$, Lorentz/PPN recovery, photon-channel recovery, quantum source measures, Standard Model mapping coefficients, and shared cosmology fits, architecture and auditability must not inflate the validated-closure total.

### 2026-05-19 Assessment Notes

*Lineage note: the corresponding dated table column has been retired; this assessment note is retained under rule 9.*

The 2026-05-19 assessment records a weighted $\mathbb{A}\mathbb{A}\mathbb{A}$ score of `55`. The gain is broad but still pre-closure: the corpus now carries more explicit proof scaffolds, branch-certificate packet schemas, CODATA benchmark discipline, Standard Model mapping targets, quantum record-measure residuals, and shared cosmology residual gates. These changes improve mathematical auditability and executable validation readiness, but they do not yet close the first accepted branch, derive the central constants, or pass precision benchmark rows.

The largest score changes come from the proof and validation surfaces. The Master EOM material now contains stronger dual-mollified branch-chart, finite-certificate, fold-layer, impulse-bound, continuity, and self-map structures. The $A_0$ branch-certificate protocol and run protocols now specify machine-checkable residual vectors, gate semantics, artifact lists, hidden-tuning failures, and promotion boundaries. These additions justify higher scores for Master EOM+Local Dynamics, Potential+Action Closure, UV/IR+Regularization Completion, Falsification Gates, and Empirical Precision+Benchmark Validation.

Formula, parameter, and cross-regime scores also rise because the corpus now separates exact SI conventions from adjusted CODATA benchmark rows, states the high-pressure roles of $\alpha$, $m_p/m_e$, $R_\infty$, particle masses, and $G$, and gives the hydrogen $\Gamma_N$ spectral row an executable shared-row scaffold rather than a per-line fit. The electroweak, weak-mixing, CKM/PMNS, Higgs, mass-map, Noether sea, and cosmology files now expose more of the required shared-record structure across particle, atomic, gravitational, thermodynamic, and cosmological regimes.

The total remains far below modern operational closure because the decisive derivations are still open. The first certified $A_0$ branch has not passed; $\zeta(A_0)$, $E_{\text{internal}}(A_0)$, and $\mathcal{M}_{\text{sea}}^{ab}$ are not accepted outputs; Lorentz, PPN, redshift, and photon-channel coefficients still lack one accepted Noether sea constitutive map; Born/Bell closure still has negative controls and measure targets rather than a positive pair-provenance theorem; Standard Model mixing and mass formulas remain shared-record theorem targets; and cosmology has a shared residual scaffold but not a fit to SN, BAO, CMB, growth, BBN, and pre-BBN rows with one $\theta_{\mathrm{sea}}$.

### 2026-05-16 Assessment Notes

The 2026-05-16 assessment is rescored under the validated-closure lens. The previous $\mathbb{A}\mathbb{A}\mathbb{A}$ columns were removed because they used a softer equal-weight closure lens that allowed architecture, coverage, and auditability to dominate the total.

$\mathbb{A}\mathbb{A}\mathbb{A}$ still scores very high in Theory Architecture+Ontic Logic because the corpus has a coherent substrate-first architecture, explicit causal-wake ontology, delayed Master Equation of Motion, Noether sea bridge program, and strong cross-document logic. That score is intentionally preserved rather than diluted.

The total is much lower because the central tested-physics closures remain open. The first certified $A_0$ branch is still absent, $\zeta(A)$ and $E_{\text{internal}}(A)$ are not extracted for a mass map, Lorentz and PPN coefficients are not yet derived from accepted attractors, Born-rule and Bell closure remain source-measure targets, weak `V-A` and CKM/PMNS quantitative closure are open, cosmology lacks an empirical shared-state fit, and UV/IR completion still depends on terminal-alignment, singularity, horizon-entropy, and effective-GR recovery proofs.

Modern physics now scores higher in the operational column because the revised lens rewards validated mathematical closure: GR, QFT, QED, QCD, the Standard Model, and LCDM-era phenomenology carry many precise equations, coefficients, and benchmark tests. Its mechanism/foundational score remains lower because the inherited stack does not supply a single ontic mechanism for quantum measurement, gauge/matter origin, gravity/quantum unification, parameter values, or cosmological initial conditions.
