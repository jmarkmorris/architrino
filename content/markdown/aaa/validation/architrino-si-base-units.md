# $\mathbb{A}\mathbb{A}\mathbb{A}$ and SI Base Units: Deep Intersection Analysis

This chapter examines how the International System of Units (SI) interfaces with Architrino Assembly Architecture, $\mathbb{A}\mathbb{A}\mathbb{A}$. It distinguishes choosing the numerical size of a unit from deriving a physical relationship. A theory can predict a ratio of spectral frequencies after its dynamics are fixed; it cannot determine that a human-defined second must contain a particular chosen number of periods.

The substrate consists of architrinos, point entities carrying polarity and interacting through expanding causal wakes determined by their past paths. They move in the Euclidean void, a fixed three-dimensional space, in absolute time $T$. An assembly is an organized collection of architrinos; the Noether sea is the ambient population of neutral assemblies. Physical clocks and rulers are assembly-level instruments whose readings require a map from this substrate description. These distinctions are developed in [Ontology](../foundations/ontology.md).

The required parameter, action, mass, scale, and spectroscopy interfaces are developed in [Parameter Ledger](parameter-ledger.md), [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md), [Mapping the Planck Scale](../philosophy-history/theory-bridges/mapping-planck-scale-to-coincident-midpoint-orthogonal-axis-geometry.md), [Energy](../dynamics/energy.md), [Particle Masses](../assemblies/particle-masses.md), and [Atomic Spectra](../nuclear-atomic/atomic-spectra.md).

## Executive Summary

The SI revision effective on 20 May 2019 expressed all seven base-unit definitions through seven defining constants and removed the kilogram prototype from the definition of mass. Four units received new defining foundations: the kilogram, ampere, kelvin, and mole. This metrological choice does not assert that all seven constants are ontologically primitive. The $\mathbb{A}\mathbb{A}\mathbb{A}$ task is to derive observable relationships from the substrate and its acceleration law, including its coupling $\kappa$. The relation $\epsilon\leftrightarrow|e|/6$ is an observer-level calibration target. The definitions below follow the BIPM's [SI Brochure](https://www.bipm.org/documents/20126/41483022/SI-Brochure-9.pdf), ninth edition, §2.3.1.

The $\mathbb{A}\mathbb{A}\mathbb{A}$ program can potentially:

1. Derive physical frequency, action, charge, and energy relationships after declaring their conversion to observer units.
2. Distinguish primitive dynamical inputs, assembly outputs, medium-state dependence, and unit conventions.
3. Predict dimensionless relationships using the same dynamics and calibrations across observables.
4. Determine whether fewer independent physical inputs suffice; this does not replace the SI's conventional definitions.

---

## The 2019 SI Revision: What Changed

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

### CODATA 2022 Benchmark Discipline

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

[View →](../../../../equation-mapping.html#corpus-equation-6fb75e10f6253f63)

while the Newtonian constant is
$$
G=6.67430\times10^{-11}\,\mathrm{m^3\,kg^{-1}\,s^{-2}},
\qquad
u_r(G)\approx2.25\times10^{-5}
$$

[View →](../../../../equation-mapping.html#corpus-equation-3ba8046cca4fb71f)

Here $u_r(X)=u(X)/|X|$ is relative standard uncertainty and $u(X)$ is the quoted standard uncertainty. The displayed approximations use the rounded uncertainties $u(\alpha)=1.1\times10^{-12}$ and $u(G)=1.5\times10^{-15}\,\mathrm{m^3\,kg^{-1}\,s^{-2}}$ from the [CODATA 2022 table](https://physics.nist.gov/cuu/pdf/wall_2022.pdf). Thus $\alpha$ is a much sharper relative-precision target; $G$ is dimensional and additionally requires a unit map. The Planck length $\ell_P$, mass $m_P$, and time $t_P$ depend on $G$ to powers $1/2$, $-1/2$, and $1/2$. Their relative standard uncertainties are approximately $u_r(G)/2$, since $h$ and $c$ are exact in SI. These derived quantities do not add independent evidence to the constants from which they are calculated.

The standard uncertainty convention matters for scoring. For a measured or adjusted row $X$, use
$$
Z_X
=
\frac{X_{\mathbb{A}\mathbb{A}\mathbb{A}}-X_{\mathrm{CODATA}}}{u(X_{\mathrm{CODATA}})}
$$

[View →](../../../../equation-mapping.html#corpus-equation-8086133e73d9fc7c)

when the same observable and unit map have been specified. This is a residual measured in benchmark uncertainty units, not automatically a statistical significance. It is a standard-score comparison only when prediction uncertainty is negligible and the benchmark was not used to tune the prediction. Otherwise the variance of the difference is $u_{\mathrm{pred}}^2+u_{\mathrm{bench}}^2-2\operatorname{Cov}(X_{\mathrm{pred}},X_{\mathrm{bench}})$, with prediction and benchmark covariance declared; correlated benchmark sets require a joint covariance treatment. For exact SI rows, do not divide by zero uncertainty. Test the adjusted observables under the same unit map instead.

---

## $\mathbb{A}\mathbb{A}\mathbb{A}$: Fundamental Parameters

In this framework, the candidate substrate-level quantities are:

### Category A: Ontological Substrate

- **Euclidean void**, with its fixed Euclidean metric and no material contents supplied by the container itself
- **Absolute time** $T$ (continuous, oriented parameter)
- **Wake propagation speed** $c_f$ (primitive propagation speed relative to the Euclidean-void rest frame)

### Category B: Fundamental Entity

- **Architrino polarity-unit magnitude** $\epsilon$, with observer calibration target $|e|=6\epsilon$
- **Causal wake acceleration kernel**, with coupling $\kappa>0$, inverse-square line-of-action weighting, and dimensionless transmitter-side weight $W^{\mathrm{acc}}=c_f/|D_t|$, where $D_t$ measures emission-root transversality. It applies to admitted delayed roots at positive separation; a regularization does not by itself supply physical continuation through coincidence. The [Master Equation](../dynamics/master-equation.md#the-master-equation-canonical-form) owns that boundary.

### Category C: Assembly Geometry (Emergent but Calculable)

In this section a coincident-midpoint orthogonal-axis braid is a prescribed six-worldline configuration in three neutral binaries with a common midpoint, zero axial half-separations, mutually orthogonal axes at the declared reference endpoint, and persistent binary indices. Its positive radii and frequencies, phases, and circulation are explicit coordinates. A deformation toward aligned axes requires a declared flattening operator; the label does not establish that such a deformation occurs dynamically. No radius ordering, particle identity, quantization, stability, or persistence follows from the label; the [braid taxonomy](../noether-braid/braid-taxonomy.md) distinguishes prescribed coordinates from physical realization.

- **coincident-midpoint orthogonal-axis braid indexed radius tuple** $(R_1,R_2,R_3)$, with no radius order encoded by the indices
- **Candidate maximum-curvature binary radius** $r_{\text{max-curv}}$, defined only if a specified branch and curvature diagnostic select it; super-wake-speed motion alone selects no radius or stable branch
- **Reference Noether braid number density** $\rho_{\text{NS},0}$, with units of inverse volume, used to normalize $n(\mathbf X,T)=\rho_{\text{NS}}(\mathbf X,T)/\rho_{\text{NS},0}$; this is a state normalization, not a universal geometric constant

Masses, effective couplings, and cosmological observables require additional derivations from declared histories and medium conditions through:

- Self-hit dynamics (non-Markovian evolution)
- Assembly existence and stability analysis, followed separately by an action and statistics recovery
- Noether sea coupling (emergent metric, inertia)

### Primitive-to-Derived Measure Ladder

For the units program, it is useful to distinguish primitive measures from derived ones rather than treating the SI list as a flat catalog.

- **Primitive dynamics and scale conventions:** $c_f$, $\epsilon$, the coupling $\kappa$, absolute time, and the Euclidean metric. The [Parameter Ledger](parameter-ledger.md#layer-i-two-body-scale-closure) gives $[\kappa]=\mathrm L^3\mathrm T^{-2}\mathrm Q^{-2}$ for polarity dimension $\mathrm Q$, so $R_*=\kappa\epsilon^2/c_f^2$ and $T_*=R_*/c_f$ are natural length and time units. These are dimensional scales, not established bound-orbit radii or periods.
- **Conditional assembly measures:** a realized branch can supply dimensionless radii, periods, and specific-action coefficients in those units. Multiplication by a declared conversion $\mu_{\text{arch}}$ supplies conventional mass-based action or energy units without assigning mass to a primitive architrino.
- **Compound measures:** area, volume, velocity ratios, densities, and currents can be expressed in the resulting units. Transport coefficients require constitutive dynamics as well as dimensional bookkeeping.

The dimensionally derived scales fix the units in which a branch problem can be posed; they do not solve that problem. Boundary histories and the Noether sea state remain inputs to any claimed assembly result. All new substrate numerical work uses normalized wake-speed units $c_f=1$. Exact SI values quoted here belong to observer metrology and do not assign an SI numerical value to $c_f$.

---

## Mapping SI Constants to Architrino Physics

### The Second (Time Unit) — $\Delta \nu_{\text{Cs}}$

**SI Definition:** The second uses the unperturbed ground-state hyperfine transition frequency of caesium-133. Hyperfine splitting is the small separation between atomic energy levels associated with nuclear and electronic magnetic coupling:
$$
1 \text{ s} = \frac{9,192,631,770}{\Delta \nu_{\text{Cs}}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-1588e1af2a0e26f2)

**Architrino Interpretation:**

The observer-level magnetic coupling must be recovered from the complete atomic assembly and its environment. A proposed allocation assigns an electronic magnetic-moment contribution to binary 2 near the wake speed and a nuclear contribution to constituent assemblies. No specific evolved Cs source record is supplied here, so this allocation remains a hypothesis. An index does not determine a magnetic moment.

This is an atomic-clock validation target, not a closed spin derivation. The electron magnetic moment, nuclear spin ledger, and hyperfine coupling must inherit [Angular Momentum and Spin](../philosophy-history/theory-bridges/angular-momentum-and-spin.md), [Atomic Structure](../nuclear-atomic/atomic-structure.md), and [Atomic Spectra](../nuclear-atomic/atomic-spectra.md) before $\Delta \nu_{\text{Cs}}$ can be claimed from first principles.

**What we must derive:**
$$
\Delta \nu_{\text{Cs}}
\stackrel{\text{target}}{=}
\frac{\widehat{\nu}_{\mathrm{Cs}}(\mathcal H_{\mathrm{Cs}},\theta_{\mathrm{sea}})}{a_{\mathrm{clk}}T_*}
$$

[View →](../../../../equation-mapping.html#corpus-equation-d7d54a608eba2015)

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

### The Meter (Length Unit) — $c$

**SI Definition:**
$$
1 \mathrm{m} = \frac{c}{299\,792\,458}\,\mathrm{s}
$$

[View →](../../../../equation-mapping.html#corpus-equation-f61b3d6b23fd83d3)

where $c$ is the speed of light.

**Architrino Interpretation:**

The SI constant $c$ belongs to the operational light channel. The substrate has a separately defined wake speed $c_f$. The proposed photon carrier is a coaxial contra-rotating polarity-conjugate planar pair propagating through the Noether sea; its existence and photon behavior require dynamical and observational recovery.

**Conditional photon-channel parameterization:**
$$
c_\gamma(\mathbf X,T)=\frac{c_f}{\chi_\gamma(\mathbf X,T)},
\qquad
\chi_\gamma(\mathbf X,T)=f_\gamma\!\left(\rho_{\text{NS}}(\mathbf X,T),n(\mathbf X,T),\text{Noether sea state}\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-1a2f168d268128da)

Here $c_\gamma$ is the candidate group speed measured in Euclidean distance per absolute time, and $\chi_\gamma>0$ is a dimensionless response factor. The function $f_\gamma$ is undetermined; density and normalized density are related, not independent inputs. Weak spatial gradients alone do not imply $\chi_\gamma=1$: a spatially constant factor of 2 would still give $c_\gamma=c_f/2$.

If the medium response tends to unity and the clock/ruler maps identify the speed scales, the proposed weak-homogeneous matching is
$$
c_{\mathrm{eff}}=c
\stackrel{\text{target}}{\approx}c_f
$$

[View →](../../../../equation-mapping.html#corpus-equation-aaa74c94b6bb625d)

Here $c_{\mathrm{eff}}$ denotes the photon speed after mapping to physical clocks and rulers. Locally in one direction, write $dx_{\mathrm{eff}}=b_{\mathrm{rul}}\,dX$ and $d\tau=a_{\mathrm{clk}}\,dT$ with positive ruler and clock factors. Then $c_{\mathrm{eff}}=(b_{\mathrm{rul}}/a_{\mathrm{clk}})c_\gamma$. A comparison of $c$ with $c_f$ therefore requires these factors as well as photon dynamics.

**What we must show:**

- The candidate planar pair exists as an assembly and recovers photon propagation, polarization, and statistics.
- Any photon speed bound follows from its dynamics and the declared response. The parameterization bounds $c_\gamma\le c_f$ only with the additional condition $\chi_\gamma\ge1$.
- Predicted clock and signal comparisons satisfy a specified experiment's observable and uncertainty. Lorentz tests constrain particular orientation, boost, dispersion, or clock effects; an unspecified $10^{-17}$ bound cannot be assigned to $|c/c_f-1|$.

**Candidate deviation channels:**

- In gravitational environments, changes in the Noether sea and clock/ruler maps are candidate sources of altered path bending and travel time. Deriving them requires constitutive response, not density alone.
- Microscopic dispersion is a possible test of a derived medium scale. No equality between that scale and the Planck length, nor any observable Lorentz violation, follows from the unit definitions.


---

### The Kilogram (Mass Unit) — $h$

**SI Definition:**
$$
1 \text{ kg} = \frac{h}{(6.62607015 \times 10^{-34}) \text{ m}^2 \text{ s}^{-1}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-31393e5ede6a895d)

One realization uses a Kibble balance, which compares mechanical and electrical power. The defining relation is independent of that particular instrument.

**Architrino Interpretation:**

The Planck constant $h$ is the observer-level benchmark for a quantum of **closed-cycle action**. The $\mathbb{A}\mathbb{A}\mathbb{A}$ derivation target is to recover this scale from coincident-midpoint orthogonal-axis braid geometry and the lower recordable basin-measure scale, not to assume it as a primitive input. Because the Master Equation is acceleration-first, a branch calculation first produces a specific-action scale. The optional universal bookkeeping constant $\mu_{\text{arch}}$ converts that scale to action units without assigning primitive mass to an architrino:
$$
\mu_{\text{arch}}I_3
\stackrel{\text{target}}{=}
N_3\hbar=N_3\frac{h}{2\pi}
$$

[View →](../../../../equation-mapping.html#corpus-equation-781f2ac09c5affe0)

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

[View →](../../../../equation-mapping.html#corpus-equation-30d92a90f0b0e032)

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

[View →](../../../../equation-mapping.html#corpus-equation-5150234f2e692da3)


---

### The Ampere (Current Unit) — $e$

**SI Definition:**
$$
1 \mathrm{A} = \frac{e}{1.602176634 \times 10^{-19}}\,\mathrm{s}^{-1}
$$

[View →](../../../../equation-mapping.html#corpus-equation-0ea5b1cad3404774)

**Architrino Interpretation:**

The positive elementary charge $e$ sets the SI charge unit. The proposed observer charge calibration is
$$
|e| = 6\epsilon
$$

[View →](../../../../equation-mapping.html#corpus-equation-2672169532aa37cf)

**What we must explain:**

- Why the proposed polarity inventory maps to the observed charge spectrum under one common calibration.
- Why quark charge assignments are $\pm e/3$ or $\pm2e/3$ within confined systems, while familiar isolated charged particles and ions carry integer multiples of $e$, including multiples greater than one. Fractional quark charges are not a catalog of isolated particles.
- How dynamical binding or suppression excludes stable isolated $e/6$ carriers in the declared observational regime. Integer polarity counting alone permits such a carrier; choosing $e=6\epsilon$ neither establishes the observed spectrum nor derives confinement.


---

### The Kelvin (Temperature Unit) — $k_B$

**SI Definition:**
$$
1 \text{ K} = \frac{1.380649 \times 10^{-23}}{k_B} \text{ J}
$$

[View →](../../../../equation-mapping.html#corpus-equation-9ebeaf5fc2b28f45)

**Architrino Interpretation:**

Boltzmann's constant $k_B$ is the conversion factor between **energy** and **temperature**. In $\mathbb{A}\mathbb{A}\mathbb{A}$, temperature is not the internal energy of one Noether braid or the total energy stored in the Noether sea. It is an effective ensemble variable admitted when a declared coarse-graining supplies an accessible energy ledger, a measure over retained states, a fixed inventory or access variable, and a local equilibrium or thermalization condition. The general rule is the same-record entropy relation developed in [Entropy](../dynamics/entropy.md#temperature-as-a-same-record-ensemble-variable).

**Thermalized-ensemble limit:** In the classical equilibrium comparison, each independent accessible quadratic energy term has the mean
$$
\langle E_{\mathrm{quad},j} \rangle = \frac{1}{2} k_B T_{\mathrm{temp}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-727378deccb8f892)

Here $j$ indexes one quadratic term, not the total kinetic energy of an assembly. The comparison requires a normalizable equilibrium measure and negligible quantum freezing of the selected modes. For a neutral Noether braid assembly in the Noether sea, a six-channel comparison is available only after the three translational and three rotational channels have been shown to be independent accessible thermalized modes. In that special limit,

$$
\langle E_{\mathrm{acc}} \rangle = 3 k_B T_{\mathrm{temp}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-7feeee8f66e8b549)

Here $E_{\mathrm{acc}}$ is the sum of those six accessible quadratic terms, measured relative to their reference energy. This is a recovery target, not the general definition of temperature. Configuration energy can contribute to equilibrium thermodynamics when it belongs to the accessible ensemble; only energy excluded by the stated measure or unable to equilibrate within the declared window lies outside this temperature account.

**What we must derive:** The physical energy-temperature relation, under a declared entropy convention, has the effective equilibrium target
$$
k_B T_{\mathrm{temp}}
=
\left[
\left(\frac{\partial S_*}{\partial E_{\mathrm{acc}}}\right)_{\mathcal V,N_{\mathrm{ent}}}
\right]^{-1}
$$

[View →](../../../../equation-mapping.html#corpus-equation-053769453c128364)

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

[View →](../../../../equation-mapping.html#corpus-equation-df39b3f7358076e5)

Here $\mathbf v_{\mathrm{eff}}$ is the assembly velocity and $\mathbf u_{\mathrm{eff}}=\langle\mathbf v_{\mathrm{eff}}\rangle$ the ensemble's mean group velocity in the same observer chart. Subtracting that mean excludes coherent motion from thermal variance. The relation assumes three classical translational quadratic modes with scalar inertia $m_{\mathrm{eff}}>0$, an observer-level effective assembly mass supplied by the same record, not a primitive architrino mass.


---

### The Mole — $N_A$

**SI Definition:**
$$
1 \mathrm{mol} = \frac{6.02214076 \times 10^{23}}{N_A}
$$

[View →](../../../../equation-mapping.html#corpus-equation-6eb9f380eafc80fe)

**Architrino Interpretation:**

Avogadro's constant converts a dimensionless count of specified entities to amount of substance: $n_{\mathrm{mol}}=N_{\mathrm{ent}}/N_A$. The amount $n_{\mathrm{mol}}$ is distinct from the normalized sea density $n$. A mole of atoms and a mole of molecules contain the same number of their respective specified entities, irrespective of their masses.

**Relation:**
$$
N_A=\frac{M_u}{m_u},
\qquad
m_u=\frac{m({}^{12}\mathrm C)}{12}
$$

[View →](../../../../equation-mapping.html#corpus-equation-4b4a0af04b5029f5)

Here $m_u$ is the unified atomic mass constant, defined from an unbound carbon-12 atom at rest in its ground state, and $M_u=N_A m_u$ is the molar-mass constant. Since $N_A$ is exact but $m_u$ expressed in kilograms is measured, $M_u$ is measured and is no longer exactly $10^{-3}\,\mathrm{kg\,mol^{-1}}$. The ratio above is a conversion identity, not a derivation of $N_A$ from particle masses. The proton mass is not one twelfth of the carbon-12 mass.

**What we must derive:**

- Assembly and atomic masses, including binding contributions, under a fixed mass map. This tests physical mass ratios and molar masses after choosing the mole convention. A proton-mass derivation alone neither fixes the carbon-12 atomic mass nor selects the Avogadro number.


---

### The Candela (Luminous Intensity) — $K_{\text{cd}}$

**SI Definition:**
$$
1 \mathrm{cd} = \frac{K_{\text{cd}}}{683}\,\mathrm{W\,sr^{-1}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-cf962aafd06dee6e)

**Architrino Interpretation:**

At the defining frequency, $K_{\text{cd}}$ relates radiant intensity, power per solid angle in $\mathrm{W\,sr^{-1}}$, to luminous intensity in candelas. A lumen is $\mathrm{cd\,sr}$; the steradian labels solid angle. Thus a monochromatic radiant intensity of $(1/683)\,\mathrm{W\,sr^{-1}}$ corresponds to one candela.

Radiant power is energy per time, not photons per time. For monochromatic radiation the standard observer-level relation is $P_{\mathrm{rad}}=h\nu\dot N_\gamma$, where $\nu$ is frequency and $\dot N_\gamma$ is the photon count rate. Photon-energy recovery is an additional assembly-level obligation. The SI wavelength at 540 THz is $c/\nu\approx555.17\,\mathrm{nm}$ in vacuum. Photometry uses a standardized visual response; it does not identify the brightness experienced by each individual observer.

**What we can say:**

- Radiation at 540 THz has observer angular frequency $\omega_{\mathrm{eff}}=2\pi\times540\times10^{12}\,\mathrm{rad\,s^{-1}}$. Assigning that frequency to an internal planar-mode phase or a specific binary requires the clock map and a photon derivation.
- A retinal-response explanation would require a separate biological and molecular account; the SI definition does not establish resonant coupling to one selected frequency.
- The exact value 683 fixes a photometric convention with a specified visual-response basis and historical continuity. It is not a new primitive dynamical parameter or a number to derive from braid geometry.


---

## Summary Table: SI Constants vs $\mathbb{A}\mathbb{A}\mathbb{A}$ Parameters

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

## Implications: Reducing the SI to Architrino Postulates

Reduction of physical inputs means deriving more independent observables from fewer specified dynamical quantities. It does not mean deriving the arbitrary sizes of the SI units. The relevant dimensional and physical roles are:

### Candidate Substrate Inputs (Architrino SI)

1. Polarity magnitude $\epsilon$ supplies the substrate polarity unit, subject to a derived observer charge map.
2. Wake speed $c_f$ and coupling $\kappa$ supply the dimensional scales $R_*$ and $T_*$. Their role in the observer map follows the [Parameter Ledger](parameter-ledger.md).
3. Dimensionless radii, action increments, and frequency ratios are prospective branch outputs. They cannot be counted as derived while also chosen freely to fit observations.
4. Neutral-assembly effective mass and medium response are additional outputs to derive. They do not replace $k_B$ or determine the mole convention.

The physical targets are the charge spectrum, operational signal propagation, action increments, thermal response, mass ratios, and spectral ratios. The candidate relation $h \stackrel{\text{target}}{=} 2\pi\mu_{\text{arch}}(\kappa\epsilon^2/c_f)\mathcal J_3$ must distinguish a chosen action calibration from an independently derived increment. Likewise, $\Delta\nu_{\text{Cs}}$ requires a full atomic history and clock conversion, not a geometry label alone.

No count of three or four independent physical parameters is established here. Such a count must include or derive the coupling, constitutive functions, state and boundary conditions, and observer conversions. The dimensional span of $(c_f,\kappa,\epsilon)$ establishes a choice of substrate units, not universal parameter closure.

---

## Closure Priorities

### Tier 1 (Must Answer)

1. **Derive $h$ from coincident-midpoint orthogonal-axis braid geometry**
   - Establish the proposed binary-3 relation $\mu_{\text{arch}}I_3=N_3\hbar$ with $\mu_{\text{arch}}$ fixed before testing.
   - Compute $\mathcal J_3$ for the hydrogen $1s$ source record.
   - Test the same unit map against adjusted action-sensitive rows such as $\alpha$ and $R_\infty$; the exact SI value of $h$ defines the comparison unit and does not supply a zero-uncertainty physical residual.

2. **Test the photon and observer speed maps**
   - Derive $c_\gamma$, $\chi_\gamma$, and the clock/ruler conversions for one declared medium state.
   - Compare predicted observable deviations with a named experiment and its uncertainty, without assigning a universal Lorentz-test bound to $c/c_f$.

3. **Derive particle masses**
   - Establish an independently supported reference assembly before assigning observed particle masses. The $A_0$ criterion in [Particle Masses](../assemblies/particle-masses.md#reference-attractor-gate) describes a required reference-attractor result, not an existing assembly.
   - Derive its internal energy $E_{\text{internal}}(A_0)$, probe-facing exposure fraction $\zeta(A_0)$, and Noether sea response tensor $\mathcal{M}_{\text{sea}}^{ab}$ before using electron, proton, or charged-lepton data as tests.
   - Only after the mass-map gate is fixed, test downstream predictions such as $m_e$, $m_p$, and $m_p/m_e \approx 1836$.

### Tier 2 (High Priority)

4. **Calculate $\Delta \nu_{\text{Cs}}$ from first principles**
   - Map Cs atomic structure to Noether braid assemblies
   - Derive hyperfine coupling strength
   - Show that the derived clock row is consistent with adjusted atomic benchmarks under the same second realization; $9{,}192{,}631{,}770\,\mathrm{Hz}$ is the exact SI definition, not an independent fitted datum

5. **Derive thermodynamics under the chosen kelvin convention**
   - Calculate neutral Noether braid assembly effective mass
   - Recover the Maxwell-Boltzmann distribution in its classical dilute regime; equilibrium alone does not select it for every ensemble.
   - Recover dimensionless and adjusted thermodynamic benchmark rows under the same temperature map; the exact SI value of $k_B$ fixes the kelvin convention

### Tier 3 (Refinement)

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

     [View →](../../../../equation-mapping.html#corpus-equation-3760e7503aee13bf)

     Here $\mu_{\mathrm{ref}}$ is the reference probe energy scale and $\theta_{\mathrm{sea}}$ denotes the fixed Noether sea record for the comparison window. The subscript distinguishes this scale from vacuum magnetic permeability.
   - Running with probe scale must be recovered as an effective electromagnetic response:
     $$
     \alpha(\mu;\theta_{\mathrm{sea}})
     =
     \alpha_{\mathrm{ref}}\,
     \mathcal K_{\mathrm{EM}}(\mu;\theta_{\mathrm{sea}},I_\mu)
     $$

     [View →](../../../../equation-mapping.html#corpus-equation-f87315c0fab0a87f)

     Here $\mu$ is probe energy, $\mathcal K_{\mathrm{EM}}$ is the proposed dimensionless electromagnetic response, and $I_\mu$ records the charged thresholds visible at that scale. The anchor requires $\mathcal K_{\mathrm{EM}}(\mu_{\mathrm{ref}};\theta_{\mathrm{sea}},I_{\mu_{\mathrm{ref}}})=1$. This factorization predicts running only when the response is derived independently; an unspecified function can reproduce any chosen running curve.
   - In architrino terms, the fixed part of the low-energy anchor requires a derived effective electromagnetic response from $\epsilon$, a candidate action increment $h_\vartheta$, the photon-channel speed $c_\gamma$, and the declared Noether sea record. Here $h_\vartheta$ is an action quantity, not a time period. The scale-dependent part belongs in $\mathcal K_{\mathrm{EM}}$ and $I_\mu$, with the underlying state and conversions held fixed.
   - Derive numerically; explain why $\alpha_{\mathrm{ref}}\ll 1$ and why $\alpha(\mu)$ runs with energy without changing the primitive wake speed or the action-period carrier.

---

## Philosophical Payoff

The SI provides reproducible conventions without settling the ontology of the quantities measured. A successful substrate theory would explain why different physical realizations agree and predict relationships that remain after arbitrary choices of units are removed.

Lengths measured relative to $R_*$, absolute durations relative to $T_*$, and polarity relative to $\epsilon$ provide a coherent starting description. Mass-based action units, temperatures, amounts, and luminous intensities additionally require their stated observer or metrological conventions. Reducing the independent physical assumptions is an open derivation problem; retaining kilograms, kelvins, and moles for communication does not add primitive substances to the ontology.

## Sources

The BIPM's *The International System of Units (SI)*, ninth edition (2019), version 4.01 (June 2026), [DOI: 10.59161/AUEZ1291](https://doi.org/10.59161/AUEZ1291), §§2.2–2.3.2, supplies the unit definitions, their conventional status, and the mole and candela interpretations. The chapter paraphrases these definitions and rearranges their quantity equations.

NIST's [CODATA Recommended Values of the Fundamental Physical Constants: 2022](https://physics.nist.gov/cuu/pdf/wall_2022.pdf) supplies the numerical electromagnetic and gravitational comparison values. They are observer-level benchmarks, not substrate inputs.
