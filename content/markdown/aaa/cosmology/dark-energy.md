# Dark Energy in the Architrino Assembly Architecture

This chapter treats dark energy as a medium-state problem inside the Noether Sea rather than as literal expansion of the Euclidean void. Its job is to map the standard late-time acceleration data onto substrate evolution, effective equation-of-state language, and possible large-scale energy-partition mechanisms within $\mathbb{A}\mathbb{A}\mathbb{A}$.

The opening sections state the ontology and the medium-level interpretation of accelerated expansion. Later sections connect that picture to effective Friedmann variables, redshift, black-hole recycling ideas, and the practical module interface for cosmological closure.

## Scope and Purpose

Standard $\Lambda\mathrm{CDM}$ cosmology attributes roughly 68% of the present energy budget to dark energy—a component with equation-of-state parameter $w \approx -1$ that drives late-time accelerated expansion. The simplest realization is a cosmological constant $\Lambda$, which enters Einstein's field equations as a geometric term equivalent to a constant vacuum energy density $\rho_\Lambda = \Lambda c^2 / (8\pi G) \approx 5.96 \times 10^{-27}\;\mathrm{kg\,m^{-3}}$.

This chapter maps dark-energy phenomenology onto the architrino assembly architecture. The central claim is that late-time acceleration is not the expansion of the Euclidean void itself—which is fixed, non-dynamical, and does not stretch—but a macroscopic readout of the evolving internal state of the Noether Sea. The task is to identify the substrate-level mechanism and derive the effective equation of state. Within that program, black holes are treated as one possible mediator of the large-scale energy-partition history, not as a replacement for the medium ontology itself.

## $\mathbb{A}\mathbb{A}\mathbb{A}$ Ontology Foundations

### The Void Does Not Expand

The Euclidean void $\mathbb{R}^3$ with metric $h_{ij} = \delta_{ij}$ is static, homogeneous, isotropic, and non-dynamical (Postulate 2). It does not curve, stretch, or respond to energy content. Cosmological "expansion" in the $\mathbb{A}\mathbb{A}\mathbb{A}$ framework refers exclusively to the dynamical evolution of the assemblies that populate the void—not to any change in the void's geometry.

### The Noether Sea Carries the Dynamics

The Noether Sea is the constitutive medium from which effective spacetime behavior is reconstructed: a dense coupled population of neutral pro/anti tri-binary pairs. Each tri-binary has internal energy stored across three nested binaries operating in distinct field-speed regimes. The collective state of this medium—its local Noether-core density $\rho_{\text{core}}(\mathbf{x},t)$, normalized density $n(\mathbf{x},t)$, internal energy spectrum, delay response $\chi_{\text{sea}}$, and anisotropy—defines the effective metric experienced by all embedded assemblies.

Late-time cosmological acceleration, in this picture, is a statement about how the aggregate properties of the Noether Sea evolve on Hubble timescales, not about the container expanding.

## Medium-State Interpretation of Accelerated Expansion

### Baseline Energy of the Noether Sea

Every Noether-Sea tri-binary carries internal binding energy distributed across its three binary tiers:

- **Inner binary** ($v > c_f$, self-hit regime): highest energy density, tightest orbit, contributes to the gravitational charge and inertial mass of the assembly.
- **Middle binary** ($v = c_f$): defines the effective causal speed; carries intermediate energy.
- **Outer binary** ($v < c_f$): lowest energy density, largest radius; couples most directly to cosmological-scale dynamics through expansion/contraction modes.

The baseline energy density of the Noether Sea is

$$
\rho_{\mathrm{sea}} = \rho_{\text{core}}\,\langle E_{\mathrm{core}} \rangle,
$$

where $\rho_{\text{core}}$ is the canonical Noether-core density field and $\langle E_{\mathrm{core}} \rangle$ is the mean energy per core. This quantity sets the scale of the effective dark-energy density:

$$
\rho_{\mathrm{DE,eff}} \sim \rho_{\mathrm{sea}}\,f(\text{outer-binary state}),
$$

where $f$ encodes what fraction of the baseline energy acts as an effective negative pressure on cosmological scales.

### Why Negative Pressure?

In standard thermodynamics, a system with equation of state $w = p/\rho < -1/3$ drives acceleration of the scale factor. In the $\mathbb{A}\mathbb{A}\mathbb{A}$ framework, the Noether Sea can exhibit effective negative pressure through the following mechanism:

**Outer-binary tension.** Each tri-binary's outer binary is a bound oscillator in the $v < c_f$ regime. The outer binary has a natural equilibrium radius set by the balance between partner attraction and coupling to the medium. When the mean inter-core spacing increases (due to matter dilution as structure forms and baryonic assemblies aggregate into galaxies), the outer binaries of neighbouring Noether-Sea cores are stretched beyond equilibrium. This stretching stores elastic energy and produces a restoring stress—a tension—that acts to resist further separation.

A uniform medium under tension has the thermodynamic signature $p < 0$. If the magnitude of the tension exceeds $\rho c^2/3$, the effective equation of state satisfies $w < -1/3$, which drives acceleration.

**Self-consistency requirement.** The tension must be nearly constant in time (slowly varying) to produce $w \approx -1$ rather than a rapidly oscillating or decaying equation of state. This requires that the outer-binary relaxation timescale is comparable to or longer than the Hubble time:

$$
\tau_{\mathrm{relax}}^{\mathrm{outer}} \gtrsim H_0^{-1} \approx 1.4 \times 10^{10}\;\mathrm{yr}.
$$

This sets a strong dynamical condition on outer-binary relaxation.

### Medium Relaxation and the Expansion History

The evolution of $\rho_{\mathrm{DE,eff}}(t)$ is governed by the collective relaxation of the Noether-Sea state. Schematically:

- At early times ($z \gg 1$), the medium is dense and hot; outer binaries are contracted, and the effective dark-energy contribution is subdominant relative to matter and radiation energy densities.
- As the medium cools and dilutes through structure formation and radiation escape, outer binaries relax toward larger radii. The associated tension becomes dynamically significant when $\rho_{\mathrm{DE,eff}} \sim \rho_m$, which occurs at $z \sim 0.3$–$0.7$ (the onset of acceleration).
- At late times ($z \to 0$), the medium approaches a quasi-equilibrium state with slowly evolving tension, producing an approximately constant $\rho_{\mathrm{DE,eff}}$ and $w \approx -1$.

This narrative must be made quantitative through a constitutive relation linking the Noether-Sea state variables to an effective pressure. The minimal parameterization is:

$$
p_{\mathrm{sea}} = p_{\mathrm{sea}}\bigl(\rho_{\text{core}},\;\dot{\rho}_{\text{core}},\;n,\;\chi_{\text{sea}},\;\langle R_{\mathrm{outer}} \rangle,\;T_{\mathrm{eff}}\bigr),
$$

where $\langle R_{\mathrm{outer}} \rangle$ is the mean outer-binary radius and $T_{\mathrm{eff}}$ is an effective temperature characterizing internal mode excitation. Deriving this relation from the master equation applied to coupled tri-binary populations is a primary simulation target.

## Inference Dependency and Calibration Gates

Late-time acceleration is inferred through a chain of effective assumptions, not observed as a primitive object. Type Ia supernovae supply corrected distance moduli, BAO supplies standard-ruler distances, CMB data supply early-time distance and curvature anchors, and the Friedmann sum rule joins those pieces into a background energy budget. This chain is legitimate as a comparison method, but it must not be treated as final ontology.

For standard-candle work, the distance-modulus residual should be decomposed before it is promoted into a dark-energy claim:

$$
\mu_{\mathrm{obs}}(z,\hat{\mathbf{n}},\mathcal{E})
-
\mu_{\mathrm{model}}(z;\Theta)
=
A_\mu(z)\,\hat{\mathbf{n}}\cdot\hat{\mathbf{d}}_\mu
+
\delta\mu_{\mathrm{cal}}(z,\mathcal{E})
+
\delta\mu_{\mathrm{sea}}(z,\hat{\mathbf{n}})
+
\epsilon_\mu.
$$

Here $\hat{\mathbf{n}}$ is the line of sight, $\mathcal{E}$ denotes source and host environment, $A_\mu\hat{\mathbf{d}}_\mu$ is a possible dipolar component, $\delta\mu_{\mathrm{cal}}$ records standardization and population-evolution corrections, $\delta\mu_{\mathrm{sea}}$ records medium-state contributions, and $\epsilon_\mu$ is the remaining noise term. A Noether-Sea acceleration or relaxation claim is promotable only after the dipole, calibration, and environment terms are either bounded below the claimed effect or derived from the same medium variables used elsewhere.

For BAO and CMB distance anchors, the corresponding requirement is frame consistency. A fit that assumes a homogeneous and isotropic Friedmann-Lemaître-Robertson-Walker background must also report whether the BAO scale, source-count dipoles, and local supernova residuals remain consistent with the CMB-frame correction. If they do not, the result becomes a directional cosmology problem before it becomes a dark-energy mechanism.

As of April 2026, DESI has completed the observations for its originally planned five-year survey, but the first dark-energy results from the full five-year dataset are expected in 2027. The current public pressure comes from the 2025 first-three-year BAO analysis: combined with CMB, supernova, and weak-lensing data, it strengthens comparison fits with time-varying $w(a)$ relative to a pure constant-$\Lambda$ description. The safe $\mathbb{A}\mathbb{A}\mathbb{A}$ use is therefore a calibration gate: preserve the BAO distance ladder, supernova residual model, CMB anchor, lensing/growth consistency, and parameter-covariance record before promoting any Noether-Sea relaxation interpretation.

The shared calibration gate can be written as a residual criterion. Let

$$
\mathcal{X}_{\mathrm{cos}}
=
\{\mathrm{SN},\mathrm{BAO},\mathrm{CMB},\mathrm{WL},\mathrm{RSD},\mathrm{BBN}\}.
$$

For a candidate medium-state parameter record $\theta_{\mathrm{sea}}$, define

$$
\mathcal{R}_{\mathrm{shared}}(\theta_{\mathrm{sea}})
=
\sum_{X\in\mathcal{X}_{\mathrm{cos}}}
r_X(\theta_{\mathrm{sea}},\nu_X)^{T}
C_X^{-1}
r_X(\theta_{\mathrm{sea}},\nu_X)
\;+\;
\lambda
\sum_{X<Y}
\left\lVert
\Pi_X\theta_{\mathrm{sea}}
-
\Pi_Y\theta_{\mathrm{sea}}
\right\rVert^2.
$$

Here $r_X$ is the residual vector for observable family $X$, $\nu_X$ records nuisance and calibration variables, $C_X$ is the covariance model, and $\Pi_X$ projects the shared medium-state record into the variables consumed by that observable family. A dark-energy interpretation is promotable only if both the ordinary residuals and the cross-projection penalty can be controlled without replacing $\theta_{\mathrm{sea}}$ separately for each pipeline. The first mock validation artifact for this gate is [Cosmology Shared Residual Fit Protocol](../validation/simulations/cosmology-shared-residual-fit.md).

### Thermodynamic $\Lambda_{\mathrm{eff}}$ Closure Target

Thermodynamic readings of the cosmological constant are useful only at the effective geometry level. In standard metric language, $\Lambda$ multiplies a four-volume term in the gravitational action. In $\mathbb{A}\mathbb{A}\mathbb{A}$, that observation should not be imported as a fundamental spacetime-volume ontology. The native question is whether a shared Noether-Sea state record can make the observer-level $\Lambda_{\mathrm{eff}}$ act like a conjugate variable to an effective four-volume summary while preserving the same residual gates used above.

For a candidate medium-state record $\theta_{\mathrm{sea}}$, let $V_4^{\mathrm{eff}}[\theta_{\mathrm{sea}}]$ denote the effective observer-level four-volume reconstructed over a stated comparison domain, and let $Q_a[\theta_{\mathrm{sea}}]$ denote the conserved or provenance quantities held fixed during the comparison. A minimal thermodynamic closure functional is

$$
\mathcal{P}_{\Lambda}
\bigl(\theta_{\mathrm{sea}};\Lambda_{\mathrm{eff}},\{\mu_a\}\bigr)
=
S_{\mathrm{sea}}[\theta_{\mathrm{sea}}]
-
\Lambda_{\mathrm{eff}}\,V_4^{\mathrm{eff}}[\theta_{\mathrm{sea}}]
-
\sum_a \mu_a Q_a[\theta_{\mathrm{sea}}].
$$

The closure target is stationarity of this functional under allowed Noether-Sea variations,

$$
\frac{\delta \mathcal{P}_{\Lambda}}{\delta \theta_{\mathrm{sea}}}=0,
\qquad
\Lambda_{\mathrm{eff}}
=
\left.
\frac{\partial S_{\mathrm{sea}}}{\partial V_4^{\mathrm{eff}}}
\right|_{Q_a},
$$

with $\Lambda_{\mathrm{eff}}>0$ only if the same $\theta_{\mathrm{sea}}$ also passes $\mathcal{R}_{\mathrm{shared}}$. This makes small positive $\Lambda_{\mathrm{eff}}$ a constrained output of medium-state entropy and conserved-record selection, not a license to fit an isolated constant after the fact. If the stationary point requires changing $\theta_{\mathrm{sea}}$ separately for SN, BAO, CMB, WL, RSD, or BBN, the thermodynamic reading fails as a closure and remains only a comparison analogy.

## Effective Friedmann Framework

### Background Equations

In the $\mathbb{A}\mathbb{A}\mathbb{A}$ framework, the Friedmann equations are not fundamental but emerge as the effective large-scale description of the evolving Noether-Sea medium in the homogeneous, isotropic limit. The effective Hubble rate is:

$$
H^2(z) = \frac{8\pi G_{\mathrm{eff}}}{3}\bigl[\rho_r(z) + \rho_m(z) + \rho_{\mathrm{DE,eff}}(z)\bigr],
$$

where $\rho_r$, $\rho_m$, and $\rho_{\mathrm{DE,eff}}$ are the effective energy densities of radiation-mode assemblies, matter assemblies (baryonic + neutral dark assemblies), and the Noether-Sea baseline/tension term respectively. In the standard limit, $G_{\mathrm{eff}} \to G_N$ and $\rho_{\mathrm{DE,eff}} \to \rho_\Lambda = \text{const}$, recovering $\Lambda\mathrm{CDM}$.

The effective dark-energy density evolves according to:

$$
\dot{\rho}_{\mathrm{DE,eff}} + 3H(1 + w_{\mathrm{eff}})\,\rho_{\mathrm{DE,eff}} = \mathcal{S}_{\mathrm{relax}},
$$

where $w_{\mathrm{eff}} = p_{\mathrm{sea}}/\rho_{\mathrm{DE,eff}}$ and $\mathcal{S}_{\mathrm{relax}}$ is a source term encoding energy exchange between the dark-energy sector and other components during medium relaxation. In the $\Lambda\mathrm{CDM}$ limit, $w_{\mathrm{eff}} = -1$ and $\mathcal{S}_{\mathrm{relax}} = 0$.

### Equation of State: Effective Descriptor

The equation-of-state parameter

$$
w = \frac{p}{\rho}
$$

is treated as an emergent summary of the medium state, not as a fundamental ontological quantity. In lowest-order fits, $w \approx -1$ is admissible as an effective description while the underlying mechanism remains medium-based. Time variation can be parameterized in the standard $w_0$–$w_a$ form:

$$
w(a) = w_0 + w_a(1-a),
$$

with $a = 1/(1+z)$ the effective scale factor (defined operationally through the redshift of photon-mode assemblies).

### Observed Equation of State and Medium Accounting

A fitted $w(a)$ is a data-product parameterization, not automatically the physical pressure law of the Noether Sea. The standard no-source reading defines an observed effective value by
$$
\frac{d\ln\rho_{\mathrm{DE,fit}}}{d\ln a}
=
-3\bigl(1+w_{\mathrm{obs}}(a)\bigr).
$$
In a medium-state model, the same fitted trend can absorb at least three distinct effects: the native pressure ratio $w_{\mathrm{source}}(a)$, an actual source or transfer term $\mathcal{S}_{\mathrm{relax}}$, and drift in the observer-level map from Noether-Sea variables to effective dark-energy density. If
$$
\rho_{\mathrm{DE,fit}}(a)
=
\Pi_{\mathrm{DE}}(a)\,\rho_{\mathrm{DE,eff}}(a),
$$
with $\Pi_{\mathrm{DE}}$ denoting the declared projection from the shared medium record into the fitted dark-energy density, then the accounting identity is
$$
1+w_{\mathrm{obs}}(a)
=
1+w_{\mathrm{source}}(a)
-
\frac{\mathcal{S}_{\mathrm{relax}}}{3H\rho_{\mathrm{DE,eff}}}
-
\frac{1}{3}
\frac{d\ln\Pi_{\mathrm{DE}}}{d\ln a}.
$$
This split prevents a time-varying $w(a)$ preference from being promoted too quickly. The observable to preserve is the distance, lensing, growth, and covariance record that produced $w_{\mathrm{obs}}(a)$; the interpretation remains open until the same $\theta_{\mathrm{sea}}$ derives the source term and the projection drift without changing records between pipelines.

### de Sitter and Phantom-$w$ Comparison

Standard quantum-gravity discussions often use de Sitter space as the clean comparison model for a universe with asymptotically constant positive dark energy. In holographic language, the speculative target is a boundary or statistical description associated with the far future. In this chapter, that comparison should remain effective rather than ontological: $a(t)$, $H(t)$, and $w(a)$ are observer-level summaries of Noether-Sea evolution, not fundamental variables of the Euclidean void.

The strongest lesson from modern string and holographic debates is that de Sitter comparison cannot be treated as a minor variant of the anti-de Sitter case. Anti-de Sitter control relies on a spatial boundary where a conformal theory can be placed; the de Sitter-like late universe instead gives observers horizon-limited access inside an evolving medium state. The local target is therefore an observer-horizon accounting rule, not a literal boundary CFT.

Time-varying dark energy would weaken the usefulness of exact de Sitter comparison because the far-future state would not be a fixed de Sitter limit unless the variation eventually stops. The local closure target is therefore not a literal dS/CFT correspondence. It is a medium-state law that tells when the observer-level fit approaches $w_{\mathrm{eff}} \approx -1$, when it departs from that value, and how those departures remain compatible with redshift, clock-rate, BAO, CMB, and structure-growth benchmarks.

A useful way to keep that comparison disciplined is to make the observer-horizon residual explicit. For a shared Noether-Sea record $\theta_{\mathrm{sea}}$ and a Physical Observer $O$, define a schematic de Sitter comparison residual
$$
\mathcal{R}_{\mathrm{dS}}^{(O)}(\theta_{\mathrm{sea}})
=
d_H\!\left(H_{\mathrm{eff}}^{\theta},H_{\mathrm{obs}}\right)
+d_w\!\left(w_{\mathrm{eff}}^{\theta},w_{\mathrm{obs}}\right)
+d_\Omega\!\left(\Omega_k^{\theta},\Omega_k^{\mathrm{obs}}\right)
+d_S\!\left(S_{\mathrm{hor}}^{(O),\theta},S_{\mathrm{hor}}^{(O),\mathrm{bench}}\right)
+d_{\mathrm{obs}}\!\left(\mathcal{B}_{\mathrm{SN/BAO/CMB/growth}}^{\theta},\mathcal{B}_{\mathrm{obs}}\right).
$$
The distances here are comparison metrics fixed by the data product being tested, not new ontological variables. The residual passes only when the same $\theta_{\mathrm{sea}}$ accounts for the effective Hubble history, equation-of-state fit, curvature bound, horizon-access entropy, and SN/BAO/CMB/growth records. This keeps de Sitter language as an observer-level benchmark rather than a boundary theory imported into the Euclidean void.

A fitted value $w_{\mathrm{eff}} < -1$ requires special care. In standard perfect-fluid language, persistent phantom behavior threatens the energy-condition and causality assumptions that also protect ordinary horizon and wormhole results. In this framework, such a fit is admissible only if it is an effective transfer signature, for example energy being routed between matter, radiation, black-hole recycling channels, and the slowly varying Noether-Sea tension sector. It should not be read as permission for acausal propagation or unaccounted energy creation.

## The Cosmological-Constant Problem

### The Hierarchy as an Ontology Mismatch

In standard QFT, summing zero-point energies of all field modes up to some cutoff $\Lambda_{\mathrm{UV}}$ produces a vacuum energy density

$$
\rho_{\mathrm{vac}}^{\mathrm{QFT}} \sim \frac{\Lambda_{\mathrm{UV}}^4}{\hbar^3 c^5},
$$

which for $\Lambda_{\mathrm{UV}} = M_{\mathrm{Pl}}c$ exceeds the observed $\rho_\Lambda$ by $\sim 120$ orders of magnitude. This is the cosmological-constant problem.

In the $\mathbb{A}\mathbb{A}\mathbb{A}$ framework, the problem is reframed as an ontology mismatch:

- QFT zero-point energies are not physical observables of the Euclidean void (which carries no energy). They are artifacts of the continuum-field approximation applied to a substrate that is fundamentally discrete (point architrinos) and finite (a definite number of tri-binary assemblies per unit volume).
- The inner and middle binaries of each Noether-Sea tri-binary store enormous energy densities locally (self-hit regime, $v > c_f$ and $v = c_f$), but this energy is locked into stable, high-frequency orbital modes that do not gravitate as a cosmological constant. Only the slowly varying, large-scale stress from the outer-binary sector contributes to $\rho_{\mathrm{DE,eff}}$.
- The observed smallness of $\rho_\Lambda$ relative to naïve QFT estimates reflects the fact that most internal tri-binary energy is dynamically inert on Hubble timescales—it is shielded by the nested-binary hierarchy, not canceled by fine-tuning.

### Coupling-Selection Target

The shielding statement is a theorem target. Let $\rho_{\mathrm{locked}}^{\mathrm{inner+middle}}$ denote the internal energy density stored in high-frequency inner and middle Noether-Sea modes, and let $\rho_{\mathrm{metric}}^{\mathrm{inner+middle}}$ denote the part of that energy exposed to the observer-level metric channel. A viable closure must show

$$
\epsilon_{\mathrm{shield}}
=
\frac{\rho_{\mathrm{metric}}^{\mathrm{inner+middle}}}
{\rho_{\mathrm{locked}}^{\mathrm{inner+middle}}}
\ll 1,
$$

while also retaining an exposed slow sector,

$$
\rho_{\mathrm{DE,eff}}
=
\rho_{\mathrm{metric}}^{\mathrm{outer}}
+
\rho_{\mathrm{metric}}^{\mathrm{transport}}
+
O(\epsilon_{\mathrm{shield}}\rho_{\mathrm{locked}}^{\mathrm{inner+middle}}).
$$

This separates two claims that are often conflated. The first claim is a shielding claim: large internal energies do not automatically enter the effective cosmological constant. The second is an exposure claim: outer-binary stress, transport history, and validated recycling channels can still contribute to the effective dark-energy sector. Both must be derived from one Noether-Sea response law; otherwise the proposal merely moves the cosmological-constant fine-tuning into an unaccounted coupling rule.

### Comparison to Sequestering and Degravitation Proposals

The $\mathbb{A}\mathbb{A}\mathbb{A}$ mechanism is structurally similar to vacuum-energy sequestering proposals (Kaloper & Padilla 2014) in which high-energy modes are dynamically decoupled from the gravitational sector. The key difference is that $\mathbb{A}\mathbb{A}\mathbb{A}$ provides a concrete physical mechanism for the decoupling (nested-binary shielding) rather than imposing it through a global constraint or modified variational principle.

Finite-range gravity and massive-gravity programs are useful here only as comparison frameworks. Their durable lesson is not that the Noether Sea should contain a massive graviton, but that any large-scale weakening of gravity must pass a local-recovery gate: solar-system, binary-pulsar, lensing, and gravitational-wave regimes must remain GR-like while a cosmological-scale response is allowed to differ. In $\mathbb{A}\mathbb{A}\mathbb{A}$ terms, that burden belongs to the same Noether-Sea constitutive map that sets $G_{\text{eff}}$, $\chi_{\text{sea}}$, clock-rate response, and growth history. A degravitation-like dark-energy channel is admissible only if the shielding residual is suppressed at the effective cosmological scale without weakening the already validated weak-field and gravitational-wave channels.

## Redshift as Clock Comparison

### Mechanism

In the $\mathbb{A}\mathbb{A}\mathbb{A}$ framework, cosmological redshift is not caused by the stretching of space (the void does not stretch) but by the comparison of clocks at emission and reception:

- A photon-mode assembly emitted at cosmic time $t_e$ carries a frequency set by the tri-binary oscillation rates of the source assembly at that epoch.
- At reception time $t_0$, the observer's local clock rate is set by the current Noether-Sea state.
- If the Noether-Sea state has evolved between $t_e$ and $t_0$—specifically, if outer-binary radii have increased and internal frequencies have decreased—then the received frequency is lower than the emitted frequency. This is the operational content of $1 + z = \nu_e/\nu_0$.

The redshift-distance relation $z(d_L)$ encodes the entire history of Noether-Sea state evolution along the photon's path. In the effective Friedmann description, this is captured by:

$$
d_L(z) = (1+z)\int_0^z \frac{c\,dz'}{H(z')},
$$

which serves as the effective expansion-history map used by observers.

### Tired-Light Exclusion

This mechanism is distinct from classical tired-light proposals. In tired light, photons lose energy through scattering or absorption, producing:
- Image blurring (not observed),
- Time-dilation violations (SN Ia light curves confirm $\Delta t \propto (1+z)$),
- Modified surface-brightness relations (Tolman test).

The $\mathbb{A}\mathbb{A}\mathbb{A}$ mechanism does not involve photon energy loss in transit. The photon assembly propagates through the Noether Sea without degradation (in the weak-field, low-density limit); the frequency difference arises from the evolving calibration of source and receiver clocks. This reproduces the standard $(1+z)$ time-dilation signature and is consistent with Tolman surface-brightness tests.

## SMBH Recycling and Energy Flow

Supermassive black holes process matter and radiation through their high-energy interiors. In the $\mathbb{A}\mathbb{A}\mathbb{A}$ picture, this recycling has implications for the dark-energy sector:

- **Energy input to the Noether Sea.** Jets and radiative outflows from SMBHs inject energy into the surrounding medium, locally exciting outer-binary modes and increasing the Noether-Sea internal temperature. On galactic and cluster scales, this injection is a source of heating that counteracts the natural cosmological cooling of the medium.
- **Feedback on $w_{\mathrm{eff}}$.** If SMBH energy injection is correlated with structure formation, the effective dark-energy equation of state can carry weak environmental dependence.
- **Backreaction rather than isolation.** The relevant cosmological question is not whether a black hole is an isolated object with a fixed bookkeeping mass, but whether the recycling zone and the ambient Noether Sea remain coupled strongly enough for the surrounding medium state to alter what the object contributes at late times.
- **No perpetual motion.** The recycling process does not create energy; it redistributes it. The total energy budget (matter + radiation + medium baseline) is conserved in absolute time. What changes is the partition between locked internal modes and the slowly varying tension sector.

The canonical strong-field and recycling picture is developed in [../spacetime/black-holes.md](../spacetime/black-holes.md). The present chapter keeps only the cosmological consequence: whether black-hole processing contributes a measurable source term to the late-time expansion history.

## Cosmological Coupling as a Candidate Dark-Energy Channel

### What the External Claim Is

A recent observational claim, now part of the comparison landscape for this topic, is that dormant supermassive black holes in old elliptical galaxies may grow more strongly with cosmic time than standard accretion and merger channels predict. In that interpretation, the relevant question is not merely whether black holes grow, but whether the growth tracks the cosmological background in a way that suggests direct coupling to the large-scale medium state.

The usual phenomenological parameterization writes the black-hole mass as

$$
M_{\mathrm{BH}}(a) \propto a^{K},
$$

where $a$ is the effective scale factor and $K$ measures the strength of the proposed cosmological coupling. In the source material motivating this scaffold, the interesting regime is the one in which $K$ is appreciably positive rather than consistent with zero after ordinary astrophysical channels are removed.

### How $\mathbb{A}\mathbb{A}\mathbb{A}$ Would Read Such a Signal

From the standpoint of $\mathbb{A}\mathbb{A}\mathbb{A}$, a positive coupling of this kind would not be read as black holes creating energy from nothing or as the Euclidean void itself driving mass growth. The relevant interpretation would instead be constitutive: black holes are regions where the Noether Sea is driven into the strongest known alignment, compression, and recycling regimes, so they are natural places for energy partition between inner, middle, and outer tri-binary layers to become macroscopically visible.

That yields a disciplined three-layer reading:

- At the **substrate level**, the Noether Sea remains the carrier of the cosmological dynamics.
- At the **strong-field constitutive level**, SMBHs act as high-gradient recycling sites that can shift energy between locked internal modes and outward-propagating medium excitations.
- At the **effective cosmology level**, any residual population-wide black-hole coupling appears only as a contribution to $\rho_{\mathrm{DE,eff}}(z)$ or to the source term $\mathcal{S}_{\mathrm{relax}}$ in the expansion history.

In that reading, the black-hole channel is neither the whole dark-energy story nor a dispensable side note. It is a candidate transport mechanism inside a medium-relaxation cosmology.

### Minimal Incorporation into the Effective Expansion Law

The conservative way to encode this possibility is to split the effective dark-energy sector into a baseline medium term plus an SMBH-correlated term:

$$
\rho_{\mathrm{DE,eff}}(z)
=
\rho_{\mathrm{sea,relax}}(z)
+
\rho_{\mathrm{BH,coup}}(z).
$$

The first term is the default Noether-Sea relaxation channel developed above. The second term is reserved for any statistically supported black-hole population effect that cannot be re-expressed as ordinary heating, accretion history, merger history, or selection bias.

At the same level of description, the source term may be decomposed as

$$
\mathcal{S}_{\mathrm{relax}}
=
\mathcal{S}_{\mathrm{sea}}
+
\mathcal{S}_{\mathrm{BH}},
$$

where $\mathcal{S}_{\mathrm{BH}}$ captures the net transfer from SMBH recycling zones into the slowly varying outer-binary tension sector. The sign and magnitude of $\mathcal{S}_{\mathrm{BH}}$ are empirical questions, not inputs fixed by ontology alone.

This decomposition also clarifies why an effective phantom crossing does not by itself force acausal physics in the local framework. If the dark-energy-like sector is being fed by transfer from another component, then $w_{\mathrm{eff}} < -1$ can appear at the level of the fit while the underlying substrate dynamics remain causal and energy-accounted.

### Population History Matters

If an SMBH-correlated channel exists, its amplitude cannot depend only on the instantaneous properties of present-day black holes. It must inherit the production and feeding history of the recycling population. In observational practice this often shows up through links to star-formation history, galaxy assembly, compact-object demographics, and host-environment selection. In $\mathbb{A}\mathbb{A}\mathbb{A}$, the deeper statement is that $\mathcal{S}_{\mathrm{BH}}$ depends on the path-history by which matter was routed into strong-field processing sites and then returned, in altered form, to the surrounding medium.

For that reason the black-hole source term should be interpreted schematically as

$$
\mathcal{S}_{\mathrm{BH}}(z)
=
\mathcal{F}\!\left[\mathcal{H}_{\mathrm{form}},\mathcal{H}_{\mathrm{feed}},\mathcal{H}_{\mathrm{release}}\right],
$$

where $\mathcal{H}_{\mathrm{form}}$ denotes the compact-object formation history, $\mathcal{H}_{\mathrm{feed}}$ the inflow history into recycling sites, and $\mathcal{H}_{\mathrm{release}}$ the history of outward channels that load the Noether Sea. The point of this notation is conceptual rather than final: any viable black-hole contribution must be history-dependent, not merely appended as a static late-time correction.

### What Would Have to Be True

For cosmological coupling to become part of the mainline dark-energy story in $\mathbb{A}\mathbb{A}\mathbb{A}$, four conditions would need to hold simultaneously.

- The inferred black-hole growth must remain after careful accounting for hidden accretion, merger demographics, selection effects, and mass-calibration drift.
- The coupling must scale coherently across galaxy populations rather than appearing only in a tuned subsample.
- The same coupling must fit late-time expansion data without spoiling CMB, BAO, lensing, and structure-growth closure.
- The strong-field mechanism in [../spacetime/black-holes.md](../spacetime/black-holes.md) must provide a constitutive path from horizon/interior recycling to a population-level contribution to $\rho_{\mathrm{DE,eff}}(z)$.

Two additional consistency conditions are equally important.

- The source history that feeds $\mathcal{S}_{\mathrm{BH}}$ must remain compatible with reasonable compact-object formation and galaxy-assembly histories.
- The resulting effective component need not trace baryonic structure point by point; if it is truly mediated through medium loading, its large-scale distribution and clustering response may differ from ordinary matter while still remaining tied to matter-processing history.

Until those conditions are met, cosmological coupling should be treated as a candidate channel under test, not as settled closure.

## Regime Map

| Epoch | Noether-Sea state | Effective $w$ | Dominant mechanism |
|:---|:---|:---|:---|
| Radiation era ($z > 3400$) | Hot, dense; outer binaries contracted | $w_{\mathrm{eff}} \to 0$ (subdominant) | Radiation pressure dominates |
| Matter era ($3400 > z > 0.7$) | Cooling; outer binaries relaxing | $w_{\mathrm{eff}}$ transitions toward $-1$ | Matter density dominates; tension grows |
| Acceleration onset ($z \sim 0.7$) | $\rho_{\mathrm{DE,eff}} \sim \rho_m$ | $w_{\mathrm{eff}} \approx -1$ | Tension becomes dynamically significant; SMBH channel may become non-negligible |
| Present ($z = 0$) | Quasi-equilibrium tension | $w_{\mathrm{eff}} \approx -1$ with possible mild drift | Acceleration established; coupling tests become survey-limited |
| Far future ($z \to -1$) | Full relaxation | $w_{\mathrm{eff}} \to -1$ or evolves | Depends on relaxation endpoint |

The acceleration onset redshift $z \sim 0.7$ is treated as the characteristic crossover of this relaxation model, with timescale set by assembly-scale physics (outer-binary binding energy and Noether-Sea coupling).

## Expansion-Module Interface

In the modular cosmology architecture, this chapter provides:

- **Output to [expansion-mechanism.md](./expansion-mechanism.md):** $H(z)$ derived from the effective Friedmann equation with $\rho_{\mathrm{DE,eff}}(z)$ and $w_{\mathrm{eff}}(z)$ from the medium-relaxation model.
- **Output to [CMB.md](./CMB.md):** late-time ISW contribution and distance to last scattering.
- **Output to [structure-formation.md](./structure-formation.md):** potential evolution $\dot{\Phi}(z)$ entering the growth equation.
- **Cross-link to [../spacetime/black-holes.md](../spacetime/black-holes.md):** strong-field recycling map and the constitutive interpretation of any SMBH population coupling.
- **Input from [dark-matter.md](./dark-matter.md):** $\Omega_m(z)$ and $G_{\mathrm{eff}}(a,k)$ for consistent Friedmann integration.
- **Input from [BBN-constraints.md](./BBN-constraints.md):** early-universe constraints ensuring $\rho_{\mathrm{DE,eff}}(z_{\mathrm{BBN}})$ is negligible relative to radiation density.
- **Frame and calibration checks:** supernova directionality, standardization drift, BAO anisotropy, CMB/matter dipole consistency, and local bulk-flow residuals.
- **Ontic variables passed:** $\rho_{\text{core}}(z)$, $n(z)$, $\chi_{\text{sea}}(z)$, $\langle R_{\mathrm{outer}} \rangle(z)$, $\tau_{\mathrm{relax}}^{\mathrm{outer}}$, $\mathcal{S}_{\mathrm{sea}}(z)$, $\mathcal{S}_{\mathrm{BH}}(z)$.
- **Effective outputs returned:** $w_{\mathrm{eff}}(z)$, $\rho_{\mathrm{sea,relax}}(z)$, $\rho_{\mathrm{BH,coup}}(z)$, $\rho_{\mathrm{DE,eff}}(z)$, $H(z)$.

All interfaces use the same absolute-time / Euclidean-void substrate and Noether-Sea state variables, ensuring ontological consistency with other cosmology modules.

## Summary

Late-time accelerated expansion, conventionally attributed to dark energy or a cosmological constant, is interpreted in the architrino assembly architecture as a macroscopic signature of Noether-Sea medium relaxation within a fixed Euclidean void:

- The Noether Sea carries a baseline energy density set by the binding and oscillation energies of its constituent tri-binaries.
- The outer-binary sector of these tri-binaries produces an effective tension (negative pressure) as the medium relaxes and outer-binary radii evolve on cosmological timescales.
- Supermassive black holes may supply a secondary transport channel that feeds or modulates that tension sector, but only if the inferred population-level coupling survives ordinary astrophysical explanations.
- When this tension satisfies $w < -1/3$, the effective expansion history shows acceleration.
- The cosmological-constant hierarchy problem is reframed: high-energy internal modes are dynamically shielded from the tension sector by the nested-binary architecture, so the natural scale of $\rho_{\mathrm{DE,eff}}$ is set by outer-binary physics, not by summing all zero-point modes.
- Any acceleration claim must pass frame and calibration gates: direction-dependent supernova residuals, BAO anisotropy, CMB/matter dipole consistency, and host-environment evolution must be either negligible or produced by the same Noether-Sea response law.

The parameters $w$ and $\Lambda$ remain useful effective descriptors of expansion history, while the mechanistic content resides in the Noether-Sea constitutive relation, outer-binary dynamics, and any validated SMBH recycling channel. Deriving that constitutive relation from the master equation is the critical open program.
