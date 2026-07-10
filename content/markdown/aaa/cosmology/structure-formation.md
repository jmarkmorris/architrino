# Structure Formation

This chapter translates standard structure-formation language into medium-and-assembly evolution inside a fixed Euclidean void. Its purpose is to explain how overdensity growth, effective expansion variables, and dark-sector clustering are meant to fit together when the Noether sea replaces metric expansion as the underlying ontology. It should be read as the growth-side continuation of [Cosmology Ontology](./cosmology-ontology.md), [Expansion Mechanism](./expansion-mechanism.md), and [Dark Matter](./dark-matter.md).

## Scope and Physical Picture

Structure formation describes how the nearly homogeneous early universe developed the web of galaxies, clusters, filaments, and voids observed today. In standard $\Lambda$CDM this story unfolds through gravitational instability of small density perturbations in an expanding Friedmann–Robertson–Walker metric, seeded during inflation and amplified by pressureless cold dark matter that decouples early from the photon–baryon plasma. In the $\mathbb{A}\mathbb{A}\mathbb{A}$ comparison map, the inflation-side predecessor is [Inflation Model](./inflation-model.md).

The standard term **cosmological void** should be read as a low-galaxy-density region, not as ontological emptiness. Such regions still contain the Noether sea, photon and neutrino transport, sparse hydrogen, and possible rare reaction channels seeded by high-energy photons or other local sources.

In $\mathbb{A}\mathbb{A}\mathbb{A}$ the same phenomenology is reinterpreted as **Noether sea and assembly co-evolution inside a fixed Euclidean void with absolute time**. The Noether sea, the dense coupled population of pro/anti Noether braids, plays the role of the dynamical Noether sea substrate. Matter assemblies, baryonic composites plus any weakly coupled neutral assemblies serving the dark-matter role, are embedded in and coupled to the Noether sea. Growth of overdensities is governed by how the Noether sea transmits effective gravitational influence, how matter assemblies cluster under that influence, and how the Noether sea's own internal energy budget (playing the role of dark energy) modulates the expansion-equivalent dynamics.

Cosmic-web filaments are therefore not only matter-density features. A two-source region between massive structures should also be tested as a Noether sea overlap channel: two external mass concentrations can impose competing medium gradients whose shared path-history response lowers the effective transport or growth residual along the inter-source axis. In observer language this can appear as a filamentary bridge, lensing excess, or velocity-alignment residual. The claim is admissible only if the same Noether sea state also supports the surrounding void, cluster, lensing, and growth rows.

No metric expansion of space occurs. The Euclidean void is static. What changes is the **internal state of the Noether sea**: assembly radii, oscillation frequencies, local number density, the Noether sea delay factor $\chi_{\text{sea}}$, and the resulting medium-dressed inertial response. All standard cosmological observables—power spectra, correlation functions, lensing maps—are recast as probes of this Noether sea and assembly history at different scales and epochs.

---

## Effective Perturbation Theory

### Background Noether Sea State

Define a spatially averaged Noether sea state at absolute time $T$:

- $u_{\text{sea}}(T)$: mean energy density of the Noether sea, distinct from the Noether braid number/mass-density proxy $\rho_{\text{NS}}(\mathbf X,T)$,
- $\rho_m(T)$: mean energy density of matter assemblies (baryonic + neutral/dark),
- $\bar{\rho}_{\text{NS}}(T)$: mean Noether braid density in physical units,
- $\bar{R}_{\text{braid}}(T)$: mean outer-binary radius of Noether braid assemblies in the Noether sea.

An effective Hubble-like parameter $H_{\mathrm{eff}}(t_{\mathrm{eff}})$ is defined operationally through the rate of change of the Noether sea's bulk properties as read by observer clocks. Specifically, if one defines an effective scale variable $a_{\mathrm{eff}}(t_{\mathrm{eff}})$ via the photon redshift relation (the ratio of photon assembly frequencies at emission and reception), then $H_{\mathrm{eff}}=d\ln a_{\mathrm{eff}}/dt_{\mathrm{eff}}$ summarizes how inter-assembly separations evolve as the Noether sea relaxes and dissipates energy. This $H_{\mathrm{eff}}$ is not the expansion rate of space but a bookkeeping variable for the Noether sea's thermodynamic and mechanical evolution.

### Density Contrast and the Growth Equation

Let $\delta_{\mathrm{eff}}(x_{\mathrm{eff}}^i,t_{\mathrm{eff}}) = (\rho_m(x_{\mathrm{eff}}^i,t_{\mathrm{eff}}) - \bar{\rho}_m(t_{\mathrm{eff}}))/\bar{\rho}_m(t_{\mathrm{eff}})$ be the observer-level matter density contrast. In the linear regime ($|\delta_{\mathrm{eff}}| \ll 1$), perturbations in the matter field obey an effective second-order equation that can be written in the familiar standard comparison form:

$$
\ddot{\delta}_{\mathrm{std}} + 2H_{\mathrm{std}}(t_{\mathrm{std}})\,\dot{\delta}_{\mathrm{std}} - 4\pi G_{\text{eff,std}}(t_{\mathrm{std}}, k)\,\bar{\rho}_{m,\mathrm{std}}(t_{\mathrm{std}})\,\delta_{\mathrm{std}} = 0
$$
The layer-explicit $\mathbb{A}\mathbb{A}\mathbb{A}$ translation is
$$
\frac{d^2\delta_{\mathrm{eff}}}{dt_{\mathrm{eff}}^2}
+2H_{\mathrm{eff}}(t_{\mathrm{eff}})\frac{d\delta_{\mathrm{eff}}}{dt_{\mathrm{eff}}}
-4\pi G_{\text{eff}}(t_{\mathrm{eff}}, k)\,\bar{\rho}_m(t_{\mathrm{eff}})\,\delta_{\mathrm{eff}}
=0
$$

Each symbol carries a specific medium-level meaning:

- **$H_{\mathrm{eff}}(t_{\mathrm{eff}})$**: the effective damping term arising from Noether sea bulk evolution. As Noether braids in the Noether sea relax energetically (outer binaries expanding, frequencies decreasing), inter-assembly separations grow, diluting the gravitational source density. This acts as a friction-like term on the growth of perturbations, matching the role of the Hubble-like damping term in standard cosmology without identifying ordinary dissipative drag as the mass mechanism.

- **$G_{\text{eff}}(t_{\mathrm{eff}}, k)$**: the effective gravitational coupling, set by how efficiently a local matter overdensity perturbs the surrounding Noether sea and how that perturbation propagates to attract more matter. In $\mathbb{A}\mathbb{A}\mathbb{A}$, $G_{\text{eff}}$ depends on:
  - the local Noether braid density $\bar{\rho}_{\text{NS}}(T)$, which sets Noether sea stiffness,
  - the outer-binary radius $\bar{R}_{\text{braid}}(T)$, which controls the compliance of Noether sea assemblies to deformation,
  - potentially the wavenumber $k$, if the Noether sea response becomes scale-dependent at wavelengths comparable to internal assembly scales or at the transition between linear and self-hit regimes.
  The weak-field constitutive map behind this is the same one organized in [Emergent Metric](../spacetime/emergent-metric.md).

- **$\bar{\rho}_m(t_{\mathrm{eff}})$**: the observer-level mean matter density, including baryonic assemblies and any weakly coupled neutral assemblies (the dark-matter sector; see interface with [dark-matter.md](./dark-matter.md)).

**Mechanism for the source term.** A local matter overdensity increases the density of architrino assemblies in that region. The additional delayed causal flux emitted by these assemblies modifies the local Noether sea delay factor $\chi_{\text{sea}}$, slowing signal propagation and deepening the effective potential well. At substrate level this is not set by inverse-square dilution alone: the received flux is also receiver-normal weighted, so local branch geometry and source/receiver motion can bunch or dilute the effective gravitational signal. Surrounding matter assemblies, following geodesics of the emergent metric (equivalently, responding to the gradient of the effective potential), drift inward. This positive feedback loop is gravitational instability, recast as medium-response dynamics.

**Where the equation is valid.** This growth equation holds in the regime where:
- perturbations are small ($|\delta| \ll 1$),
- the wavelength of perturbations is much larger than the Noether braid scale,
- the Noether sea response is quasi-static (perturbation timescale $\gg$ internal Noether braid oscillation period),
- no internal velocity component of the matter assemblies approaches $c_f$ (the self-hit regime is not triggered by the perturbation dynamics themselves).

**What breaks outside that regime.** At $|\delta| \sim 1$ (turnaround and collapse), the linear equation fails and must be replaced by the full nonlinear medium response—analogous to N-body or hydrodynamic treatment in standard cosmology. At very small scales, the finite size of Noether braid assemblies and the discreteness of the Noether sea introduce a physical cutoff; the continuum growth equation is not valid below the mean inter-assembly spacing. At extremely high densities (approaching conditions near a maximum-curvature object), the self-hit regime is entered, Jacobian anisotropies become large, and the effective $G$ itself changes qualitatively.

### The Growth Factor

Define the linear growth factor $D(t_{\mathrm{eff}})$ as the growing-mode solution of the perturbation equation, normalized so that $\delta_{\mathrm{eff}}(x_{\mathrm{eff}}^i,t_{\mathrm{eff}}) = D(t_{\mathrm{eff}})\,\delta_0(x_{\mathrm{eff}}^i)$ in the linear regime. In standard cosmology:

$$
D(a) \propto H(a) \int_0^a \frac{da'}{[a' H(a')]^3}
$$

Within $\mathbb{A}\mathbb{A}\mathbb{A}$ the same integral structure holds in the observer chart, with $H_{\mathrm{eff}}(a_{\mathrm{eff}})$ and $G_{\text{eff}}$ determined by the Noether sea equation of state. The growth rate $f(a_{\mathrm{eff}}) = d\ln D / d\ln a_{\mathrm{eff}}$ is a direct observable (via redshift-space distortions) and provides a clean test:

- If $G_{\text{eff}}$ is constant and the Noether sea equation of state matches $\Lambda$CDM, then $f(a) \approx \Omega_m(a)^{0.55}$ as in GR.
- If $G_{\text{eff}}$ carries scale dependence from medium compliance, $f$ acquires a $k$-dependent correction that is absent in standard gravity and can be tested against galaxy survey data.

The comparison should also preserve the standard linear-regime milestones. During matter domination, the growing mode satisfies $D(a)\propto a$ in the GR/CDM limit, while the decaying mode falls as $a^{-3/2}$. During radiation domination, subhorizon matter growth is strongly slowed, so the transfer function retains an equality-scale break. A compact benchmark is
$$
P(k,z)
=
P_{\mathrm{seed}}(k)\,T^2(k)\,D^2(z),
\qquad
T(k)\sim1\ \text{for }k\ll k_{\mathrm{eq}},
\qquad
T(k)\sim k^{-2}\ \text{for }k\gg k_{\mathrm{eq}}
$$
up to the declared baryon acoustic, neutrino/free-streaming, and nonlinear corrections. In $\mathbb{A}\mathbb{A}\mathbb{A}$ this is not an import of metric expansion ontology. It is the observer-level shape test that the same Noether sea state history must pass while computing $G_{\text{eff}}(a,k)$, CMB lensing, $f\sigma_8$, and high-redshift halo statistics.

### Component Transfer and Free-Streaming Interface

Linear perturbation theory is useful only when its variables are kept at the effective observer level. For each component $x$ in the comparison packet, use
$$
\mathbf{y}_x^\theta(k,z)
=
\left(
\delta_x^\theta,\,
\theta_x^\theta,\,
\sigma_x^\theta,\,
\delta p_x^\theta
\right)
$$
where $\delta_x$ is the density contrast, $\theta_x$ is the velocity-divergence variable, $\sigma_x$ is the anisotropic-stress variable, and $\delta p_x$ is the pressure perturbation. A transfer-function branch is then a map
$$
\mathbf{y}_x^\theta(k,z)
=
\mathsf{T}_x^\theta(k,z;\theta_{\mathrm{sea}})
\,\mathbf{y}_{\mathrm{init}}^\theta(k),
\qquad
P_{xy}^\theta(k,z)
=
T_x^\theta(k,z)T_y^\theta(k,z)P_{\mathrm{seed}}^\theta(k)
$$
with the same $\theta_{\mathrm{sea}}$ used for CMB lensing, BAO, BBN, and low-redshift growth. In an adiabatic comparison packet the initial component contrasts must satisfy
$$
\frac{\delta\rho_x^\theta}
{\bar\rho_x^\theta+\bar p_x^\theta}
=
\frac{\delta\rho_y^\theta}
{\bar\rho_y^\theta+\bar p_y^\theta},
\qquad
\delta_b^\theta
=
\delta_{\mathrm{dm}}^\theta
=
\frac{3}{4}\delta_\nu^\theta
=
\frac{3}{4}\delta_\gamma^\theta
$$
unless the branch explicitly declares an isocurvature source and carries it through the CMB, BBN, and matter-power residuals.

Neutrino and warm-dark-sector signals sharpen the small-scale transfer test. For ordinary massive neutrinos,
$$
f_\nu^\theta
\equiv
\frac{\Omega_\nu^\theta}{\Omega_m^\theta}
\approx
\frac{\Sigma m_\nu^\theta}
{94\,\mathrm{eV}\,\Omega_m^\theta h_\theta^2},
\qquad
\frac{\Delta P_\delta^\theta}{P_\delta^\theta}
\approx
-8f_\nu^\theta
$$
below the free-streaming scale. For a sterile-neutrino or warm neutral-assembly comparison branch, retain the production-history dependence explicitly:
$$
\lambda_{\mathrm{FS}}^\theta
=
\int_0^{t_{\mathrm{eff,eq}}^\theta}
\frac{v^\theta(t_{\mathrm{eff}})}{a_\theta(t_{\mathrm{eff}})}\,dt_{\mathrm{eff}}
\approx
1.2\,\mathrm{Mpc}
\left(\frac{1\,\mathrm{keV}}{m_s^\theta}\right)
\left(\frac{\langle p/T\rangle_\theta}{3.15}\right)
$$
The key variable is not mass alone but the momentum distribution inherited from the production channel. A branch that changes $\langle p/T\rangle_\theta$, $f_\nu^\theta$, or $\lambda_{\mathrm{FS}}^\theta$ independently of its BBN and CMB records has split the shared cosmology state.

Cosmological neutrino-mass bounds also depend on the late matter-source accounting used by the expansion fit. A DESI-era matter-conversion comparison can relax or shift $\Sigma m_\nu$ constraints because converting part of the late matter budget into an effective dark-energy component changes the nonrelativistic matter inventory sampled by BAO, CMB, and growth. For $\mathbb{A}\mathbb{A}\mathbb{A}$, the lesson is not that the neutrino branch has changed ontology. The lesson is that any bound on $\Sigma m_\nu^\theta$ must be read together with the same late-time source term, baryon-accounting record, and Noether sea transport history used for expansion and structure formation.

### Linear and Nonlinear Dark-Sector Split

Hybrid dark-sector comparisons make one useful mathematical demand explicit: the linear growth record and the nonlinear rotation-curve record must be separated before they are recombined. A nearly pressureless fluid, scalar, or neutral-assembly population can reproduce the expansion history, acoustic peak loading, and linear matter power spectrum if its effective equation of state and sound speed are small,

$$
|w_{\mathrm{lin}}|\ll1,
\qquad
c_{s,\mathrm{lin}}^2\ll1
$$

That success does not by itself solve the nonlinear missing-mass problem in galaxies or clusters. Conversely, a MOND-like or medium-compliance law can fit low-acceleration rotation curves without automatically recovering the CMB peak structure or the linear transfer function. The $\mathbb{A}\mathbb{A}\mathbb{A}$ closure requirement is therefore a shared-record split:

$$
\theta_{\mathrm{sea}}
\longmapsto
\left(
\Pi_{\mathrm{lin}}\theta_{\mathrm{sea}},
\Pi_{\mathrm{nl}}\theta_{\mathrm{sea}}
\right)
$$

where $\Pi_{\mathrm{lin}}\theta_{\mathrm{sea}}$ supplies $P(k,z)$, $D(z,k)$, $C_L^{\phi\phi}$, and $f\sigma_8$, while $\Pi_{\mathrm{nl}}\theta_{\mathrm{sea}}$ supplies the radial-acceleration relation, the local missing-baryon benchmark, cluster hydrostatic profiles, and rotation-curve residuals. A compact split residual is

$$
\mathcal{R}_{\mathrm{lin/nl}}(\theta_{\mathrm{sea}})
=
\mathcal{R}_{P,D,C_L,f\sigma_8}(\Pi_{\mathrm{lin}}\theta_{\mathrm{sea}})
+
\mathcal{R}_{\mathrm{RAR/local\ baryon/cl/rot}}(\Pi_{\mathrm{nl}}\theta_{\mathrm{sea}})
+
\lambda_{\mathrm{split}}
d_{\mathrm{shared}}\!\left(
\Pi_{\mathrm{lin}}\theta_{\mathrm{sea}},
\Pi_{\mathrm{nl}}\theta_{\mathrm{sea}}
\right)
$$

The last term is the important one. It prevents the model from behaving like CDM in the linear packet and like a separate modified-gravity theory in the nonlinear packet unless both projections come from the same Noether sea state and neutral-assembly state. This also protects the $S_8$ discussion: late-time growth suppression may be allowed, but it must not erase the linear-regime matter loading that fixes the CMB and equality-scale transfer function.

---

## Matter Content and the Dark Sector

### Baryonic Assemblies

Baryons (protons, neutrons, and their composites) are Noether braid assemblies with specific axial patterns. Their clustering behavior is governed by the effective growth equation above, modified by pressure support (thermal motion) and radiative cooling. Before recombination, baryonic assemblies are tightly coupled to photon-channel packets carried by coaxial contra-rotating pro/anti planar pairs propagating through the Noether sea, producing acoustic oscillations. After decoupling, baryons fall into potential wells already established by the dark sector.

### Neutral Assemblies (Dark-Matter Candidates)

$\mathbb{A}\mathbb{A}\mathbb{A}$ admits multiple dark-matter scenarios (detailed in [dark-matter.md](./dark-matter.md)). For structure formation the relevant properties are:

- **Coupling to the Noether sea**: dark-matter assemblies must couple gravitationally (through the Noether sea) but not electromagnetically (no net charge, minimal dipole coupling). Neutral Noether braid configurations with balanced axial layers (analogous to neutrino-like assemblies but more massive and stable) satisfy this requirement.
- **Thermal history**: if produced thermally in the early medium, their relic abundance and free-streaming length determine the small-scale cutoff of the matter power spectrum. Cold (non-relativistic at decoupling) neutral assemblies reproduce CDM-like behavior; warm candidates (lighter, with residual thermal velocity) suppress small-scale power.
- **Self-interaction**: if neutral assemblies interact among themselves through residual short-range forces (e.g., van der Waals-like wake overlap at close range), this modifies halo profiles at small scales—a potential handle on the core-cusp and too-big-to-fail problems.

The effective growth equation accommodates both CDM-like and self-interacting scenarios through the form of $G_{\text{eff}}(t_{\mathrm{eff}},k)$ and any additional pressure or viscosity terms.

### Medium Energy (Dark-Energy Role)

The baseline energy density of the Noether sea ($u_{\text{sea}}$) is the candidate carrier for an effective cosmological-constant or dark-energy role. Its contribution enters the effective Hubble-like term $H_{\mathrm{eff}}(t_{\mathrm{eff}})$ only after the same Noether sea constitutive record supplies the pressure and coupling rows. If the projected equation of state satisfies $w_{\text{sea}} \approx -1$, with the slowly varying outer-binary tension sector reading out as effective negative pressure, the observer-level expansion history accelerates. Any evolution of $w_{\text{sea}}(T)$ from slow Noether sea thermodynamic relaxation would produce a dynamical dark-energy signature testable against supernova and BAO data.

---

## Observational Readout Domains

Structure formation in this framework is a single coupled medium-and-assembly history. Different observational probes sample different scales and epochs of that history:

### Galaxy Rotation Curves

Flat rotation curves require either a dark-matter halo or a modified gravitational response at low accelerations. In the Noether sea picture:
- A halo of weakly coupled neutral assemblies reproduces standard NFW-like profiles.
- Alternatively, if $G_{\text{eff}}$ develops scale dependence at galactic scales (from nonlinear medium response at low density gradients), MOND-like behavior emerges without particle dark matter.
- The Bullet Cluster and similar offset systems provide a high-pressure inference gate rather than a one-image ontological proof. If an ensemble of cluster-offset reconstructions robustly requires lensing mass separated from the baryonic gas under the same lensing priors, gas dynamics, and shared Noether sea state record, then pure medium-modification scenarios fail and a collisionless neutral-assembly component is required.

### Local Missing-Baryon Benchmark

The local missing-baryon benchmark in [Dark Matter](./dark-matter.md#local-missing-baryon-benchmark) is also a structure-formation observable. It ties the condensed baryonic mass $M_b=M_\star+M_g$, the flat-equivalent velocity $V_f$, the inferred enclosed dynamical mass $M_{200}$, and the missing baryon ledger

$$
M_X = f_bM_{200} - M_b
$$

into one low-redshift readout. The important signal is not only that $m_b=M_b/M_{200}$ falls below $f_b$ in lower-mass systems. It is that the trend is smooth, low-scatter, and weakly dependent on whether the observed baryons are stars or gas.

For the growth module, the retained data packet is

$$
D_{\mathrm{local\ baryon}}^{\mathrm{obs}}(E)
=
\{M_b,V_f,M_{200},m_b,M_X,\Sigma_{\mathrm{gas/lens}}\}_E,
$$

where $E$ labels the environment class and $\Sigma_{\mathrm{gas/lens}}$ records the gas and lensing reconstruction used for groups and clusters. A branch cannot explain this packet by feedback, circumgalactic retention, ejection to the intergalactic medium, or a velocity-factor recalibration unless the same source-history record also recovers the baryonic Tully-Fisher relation, group weak-lensing velocities, rich-cluster baryon closure, and cluster-offset behavior. The group-to-X-ray-cluster transition is therefore a high-value structure-formation band: it decides where Noether sea medium response, observed hot gas, and collisionless neutral-assembly loading must separate or couple.

### Cluster Mass Profiles

Clusters probe the intermediate regime ($\sim 1$–$10$ Mpc) where both thermal gas (X-ray) and gravitational lensing provide independent mass estimates. Consistency between hydrostatic and lensing masses constrains any scale dependence in $G_{\text{eff}}$ at cluster scales.

### Cosmic Shear and $S_8$

Weak gravitational lensing measures the integrated matter power spectrum weighted by the lensing kernel. The $S_8 = \sigma_8 \sqrt{\Omega_m / 0.3}$ parameter family directly constrains the amplitude of linear growth at low redshift. In the Noether sea picture:
- $\sigma_8$ is the rms matter fluctuation at $8\,h^{-1}$ Mpc, computed from the growth factor $D(t)$ and the primordial spectrum.
- Consistency between CMB-inferred $S_8$ (high-$z$ prediction evolved to $z=0$) and direct low-$z$ lensing measurement is a stringent test. Current data suggest mild tension ($S_8^{\text{CMB}} > S_8^{\text{lensing}}$ at $\sim 2$–$3\sigma$).
- If $G_{\text{eff}}$ weakens at late times relative to its early-universe value (because the Noether sea stiffens as it cools), the predicted $S_8$ at low $z$ drops, potentially resolving the tension. This is a concrete, testable prediction of Noether sea-evolution cosmology.

### CMB Lensing and Acoustic Peaks

The CMB power spectrum encodes the primordial perturbation spectrum processed through the photon–baryon–medium system before decoupling. The acoustic peak positions fix the sound horizon at recombination; the peak heights constrain the matter-to-radiation ratio and the baryon-to-dark-matter ratio. CMB lensing (the smoothing of peaks at high $\ell$) probes the integrated matter distribution between the last-scattering surface and the observer.

The growth module provides:
- the matter power spectrum $P(k, z)$ that determines the lensing potential $C_\ell^{\phi\phi}$,
- the growth history $D(z)$ that sets the amplitude of the lensing signal,
- any anomalous scale dependence in $G_{\text{eff}}$ that would shift the lensing amplitude relative to the $\Lambda$CDM prediction (interface with [CMB.md](./CMB.md)).

This is an inference interface, not a direct ontology map. ACT/Planck-style CMB-lensing reconstructions first supply a lensing data product, compactly represented by $C_L^{\phi\phi}$. A valid medium-and-assembly growth model must then produce the same $C_L^{\phi\phi}$ from the same matter power spectrum, growth history, neutral-assembly loading, and Noether sea response variables used for galaxy clustering and low-redshift weak lensing. If the CMB-lensing fit requires one growth record while late-time shear or cluster offsets require another, the structure-formation branch has split the shared cosmology state rather than closed it.

The kinematic Sunyaev-Zeldovich effect adds a force-law profile test to the same growth family. The retained observable is not a visual picture of dark matter, but the mean pairwise velocity of massive halos inferred from small CMB temperature shifts produced when CMB photons scatter from moving cluster electrons. In the retained ACT/SDSS-style halo-pair comparison, the fitted large-scale halo acceleration obeys $g(r)\propto r^{-n}$ with $n_{\mathrm{kSZ}}^{\mathrm{obs}}=2.1\pm0.3$ on $30$--$230\,\mathrm{Mpc}$ scales.

For a candidate medium-and-assembly history $\theta$, define the projected halo-pair acceleration profile over that separation window by
$$
g_\theta(r)\big|_{W_{\mathrm{kSZ}}}
\propto
r^{-n_\theta},
\qquad
W_{\mathrm{kSZ}}=[30,230]\,\mathrm{Mpc}
$$
The structure-formation residual is then
$$
\mathcal{R}_{\mathrm{kSZ}\text{-}force}(\theta)
=
\left(
\frac{n_\theta-2.1}{0.3}
\right)^2
+
\lambda_{\mathrm{shared}}
d_{\mathrm{shared}}\!\left(
\Pi_{\mathrm{kSZ}}\theta_{\mathrm{sea}},
\Pi_{\mathrm{WL/RSD}}\theta_{\mathrm{sea}}
\right)
$$
This residual protects the level distinction. A Noether sea response may still modify galaxy-scale low-acceleration behavior, but it cannot become a free large-scale modified-gravity law. On the ACT/SDSS halo-pair window the same $\theta_{\mathrm{sea}}$ must recover an approximately inverse-square effective pull while preserving CMB lensing, weak lensing, redshift-space distortions, and the matter power spectrum.

Pre-BBN comparison branches enter structure formation only through the transfer record they leave behind. For any branch $X$ retained by [Inflation Model](./inflation-model.md#pre-bbn-comparison-gate) and [BBN Constraints](./BBN-constraints.md#pre-bbn-handoff-gate), the growth-side observable is
$$
\Delta P_X(k,z)
=
P(k,z\mid \theta_{\mathrm{sea}},\theta_X)
-
P(k,z\mid \theta_{\mathrm{sea}})
$$
This quantity must be evaluated with the same $\theta_{\mathrm{sea}}$ used for BBN, CMB, cluster offsets, weak lensing, and redshift-space distortions. If a weakly coupled component is invisible to light elements only by acquiring a free-streaming length, abundance, or interaction history that later changes independently in $P(k,z)$, $C_L^{\phi\phi}$, or halo statistics, the comparison branch fails the shared-record gate.

### High-Redshift Structure

Reports of massive, mature galaxies at $z > 10$ (from JWST and successors) test whether the growth history permits sufficient structure formation by early times. In the Noether sea framework:
- If $G_{\text{eff}}$ was larger at early times (medium more compliant when hotter/denser), early structure formation is enhanced relative to standard $\Lambda$CDM—potentially explaining surprisingly massive high-$z$ systems without exotic physics.
- Conversely, if $G_{\text{eff}}$ was constant, the same tension present in standard cosmology persists and must be addressed through astrophysical channels (early star formation efficiency, AGN feedback).

High-redshift quasars add the compact-source side of the same test. A massive quasar at large inferred redshift is not only a point on a distance curve; it is a joint record of seed inventory, feeding history, radiative efficiency, obscuration and selection, line-of-sight transfer, and the redshift extraction itself. A useful comparison object is
$$
\mathcal{R}_{\mathrm{QSO\text{-}grow}}(\theta)
=
d_M\!\left(
M_{\mathrm{BH}}^{\mathrm{obs}},
M_{\mathrm{BH}}^\theta[
\mathcal{H}_{\mathrm{seed}},
\mathcal{H}_{\mathrm{feed}},
\epsilon_{\mathrm{rad}},
\theta_{\mathrm{sea}}
]
\right)
+
d_z\!\left(
z_{\mathrm{QSO}}^{\mathrm{obs}},
Z^\theta[
\mathcal{S}_{E\to R},
\Theta_{\mathrm{sel}},
\Theta_{\mathrm{line}}
]
\right).
$$
Here the first term tests whether the shared source history can grow the compact object, while the second tests whether the same source-to-receiver and selection records support the reported redshift. A branch fails this row if quasar growth is repaired by changing the age, redshift-transfer, or Noether sea state independently of the growth, CMB, lensing, and source-history records.

### Top-Down vs Bottom-Up Discriminator

The framework should be evaluated on whether early-time growth behaves predominantly as hierarchical buildup (bottom-up), fragmentation-dominant assembly (top-down), or a mixed regime across scale and epoch. In practice, this is read from the joint evolution of the high-$z$ halo mass function, merger statistics, and large-scale filament maturity under one calibrated $G_{\text{eff}}(a,k)$ history.

### Largest Structures

The existence of very large coherent structures (giant arcs, walls, and voids at $\gtrsim 200$ Mpc scales) tests the homogeneity assumption and the age of the universe. In a framework where the Euclidean void is eternal and the Noether sea history may differ from the standard $13.8$ Gyr narrative:
- Effectively unbounded-age scenarios (if the Noether sea has recycled through earlier phases) could accommodate structures requiring longer formation times.
- Finite-age scenarios must demonstrate that the observed structures are statistically compatible with the growth rate permitted by $D(z)$ and $P(k)$.

This is an active test with model-discriminating power, not merely a fitting exercise. A structure-formation run should report the scale-neutral homogeneity residual $\mathcal{R}_{\mathrm{hom}}(\theta_{\mathrm{sea}};L,t)$ defined in [Cosmology Ontology](./cosmology-ontology.md#inference-dependency-ledger) alongside $P(k,z)$, $D(z)$, lensing summaries, and high-redshift halo statistics. If the matter power spectrum fits but dimensionless pair-separation distributions differ by direction, environment, or source family beyond tolerance, the run has not supplied a single large-scale medium history.

### Source-History Inversion

Galaxy and AGN environments are also records of source history, not only forward outputs of a growth model. Jet knots, lobes, host-galaxy structure, metallicity gradients, lensing maps, redshift residuals, and the surrounding Noether sea state should constrain the same formation, feeding, and release histories that enter the SMBH source term in [Dark Energy](./dark-energy.md#population-history-matters).

For a candidate shared medium-and-source record $\theta$, define a source-history inversion residual
$$
\mathcal{R}_{\mathrm{hist}}(\theta)
=
d_{\mathrm{obs}}\!\left(
Y_{\mathrm{gal/AGN}}^{\mathrm{obs}},
\Pi_{\mathrm{gal/AGN}}\,
\mathcal{F}\!\left[
\mathcal{H}_{\mathrm{form}},
\mathcal{H}_{\mathrm{feed}},
\mathcal{H}_{\mathrm{release}},
\theta_{\mathrm{sea}}
\right]
\right)
$$
where $Y_{\mathrm{gal/AGN}}^{\mathrm{obs}}$ denotes the chosen galaxy or AGN observable packet and $\Pi_{\mathrm{gal/AGN}}$ projects the shared history model onto the observables being compared. The same $\theta_{\mathrm{sea}}$ must also supply the growth, redshift, CMB, lensing, and dark-sector rows. If jet morphology or host evolution can be fit only by changing the Noether sea state independently of the cosmology packet, the branch is a local fit rather than a shared history.

---

## Scale Dependence of $G_{\text{eff}}$: Mechanism and Regime Map

A key distinguishing feature of the Noether sea-based framework is that $G_{\text{eff}}$ may carry genuine scale (and epoch) dependence arising from the constitutive properties of the Noether sea.

### Physical Origin

The effective gravitational coupling is set by how efficiently a local overdensity deforms the surrounding Noether sea. At different scales, different medium-response mechanisms dominate:

| Scale regime | Dominant medium response | Expected $G_{\text{eff}}$ behavior |
|:---|:---|:---|
| $\lambda \gg \bar{R}_{\text{core}}$, low $\rho$ | Linear elastic (acoustic) | Approximately constant; matches $G_N$ |
| $\lambda \sim 1$–$10$ Mpc, moderate $\rho$ | Weakly nonlinear compliance | Small corrections; cluster-scale tests |
| $\lambda \lesssim$ kpc, low acceleration | Nonlinear stiffening or softening | Possible MOND-like behavior |
| $\lambda \sim \bar{R}_{\text{core}}$ | Discrete medium effects | Continuum description breaks down |
| High $\rho$ (near Planck cores) | Self-hit regime | $G_{\text{eff}}$ changes qualitatively |

### Parameterization

For phenomenological work, write:

$$
G_{\text{eff}}(a, k) = G_N \bigl[1 + \mu(a, k)\bigr]
$$

where $\mu(a, k)$ is a dimensionless modification function.

### Linear Constitutive Derivation of $\mu(a,k)$

To make the map explicit, linearize the Noether sea response around a homogeneous background with displacement field $\mathbf{u}$ and scalar compression mode
$$
\theta \equiv \nabla\cdot\mathbf{u}
$$

Use isotropic linear constitutive response (elastic + Kelvin-Voigt damping):
$$
\delta \sigma_{ij}
=
K(a)\,\delta_{ij}\,\theta
+2S(a)\!\left(u_{ij}-\frac{1}{3}\delta_{ij}\theta\right)
+\zeta_{\text{bulk}}(a)\,\delta_{ij}\,\dot{\theta}
+2\eta(a)\!\left(\dot{u}_{ij}-\frac{1}{3}\delta_{ij}\dot{\theta}\right)
$$
with bulk modulus $K$, shear modulus $S$, and viscosities $(\zeta_{\text{bulk}},\eta)$. The subscript prevents confusion with the shielding factor $\zeta(A)$ used in assembly-mass closure.

For scalar/longitudinal modes in Fourier space, the linear response equation is
$$
\left[M_L(a)k^2 + m_L^2(a) - i\omega\,\Gamma_L(a)\,k^2\right]\theta(a,k,\omega)
=
g_m(a)\,\delta\rho_m(a,k,\omega)
$$
where
$$
M_L(a)\equiv K(a)+\frac{4}{3}S(a),
\qquad
\Gamma_L(a)\equiv \zeta_{\text{bulk}}(a)+\frac{4}{3}\eta(a)
$$
and $m_L(a)$ is the finite-range restoring scale (equivalently $k_\ast(a)^2=m_L^2/M_L$).

The induced sea-energy-density perturbation is
$$
\delta u_{\text{sea}}(a,k,\omega)
=
-\bar{u}_{\text{sea}}(a)\,\theta(a,k,\omega)
=
\mu_{\text{sea}}(a,k,\omega)\,\delta\rho_m(a,k,\omega)
$$
with susceptibility
$$
\mu_{\text{sea}}(a,k,\omega)
=
-\frac{\bar{u}_{\text{sea}}(a)\,g_m(a)}
{M_L(a)k^2+m_L^2(a)-i\omega\,\Gamma_L(a)k^2}
$$

Insert this into the linear Poisson source:
$$
-k^2\Phi(a,k)=4\pi G_N a^2\bigl[\delta\rho_m+\delta u_{\text{sea}}\bigr]
=
4\pi G_N a^2\bigl[1+\mu_{\text{sea}}(a,k,\omega)\bigr]\delta\rho_m
$$
Therefore
$$
G_{\text{eff}}(a,k,\omega)=G_N\bigl[1+\mu_{\text{sea}}(a,k,\omega)\bigr],
\qquad
\mu(a,k,\omega)=\mu_{\text{sea}}(a,k,\omega)
$$

For growth calculations use the quasi-static branch $\omega\simeq H(a)f(a)$ and the real part:
$$
\mu(a,k)
=
-\frac{\bar{\rho}_{\text{sea}}(a)\,g_m(a)\,\bigl[M_L(a)k^2+m_L^2(a)\bigr]}
{\bigl[M_L(a)k^2+m_L^2(a)\bigr]^2+\bigl[H(a)f(a)\Gamma_L(a)k^2\bigr]^2}
$$

In the strictly quasi-static limit ($Hf\,\Gamma_Lk^2\ll M_Lk^2+m_L^2$), this reduces to the closed Yukawa-like form
$$
\mu(a,k)
\approx
-\frac{\bar{\rho}_{\text{sea}}(a)\,g_m(a)}
{m_L^2(a)+M_L(a)k^2}
=
\frac{\mu_0(a)}{1+\bigl(k/k_\ast(a)\bigr)^2}
$$
$$
\mu_0(a)\equiv-\frac{\bar{\rho}_{\text{sea}}(a)\,g_m(a)}{m_L^2(a)},
\qquad
k_\ast(a)^2\equiv\frac{m_L^2(a)}{M_L(a)}
$$

Setting $g_m=0$ (or equivalently $\mu=0$) recovers standard GR growth. Current data constrain $|\mu| \lesssim 0.1$ on the scales probed by galaxy surveys and CMB lensing.

A finite-range or screening comparison adds one useful local-recovery gate without importing massive-gravity ontology. If a local constitutive invariant $\mathcal{I}_{\mathrm{loc}}$ suppresses the response in dense or strongly tested regimes, write
$$
G_{\text{eff}}(a,k,\mathcal{I}_{\mathrm{loc}})
=
G_N\left[1+\mu(a,k)S_{\mathrm{loc}}(\mathcal{I}_{\mathrm{loc}})\right],
\qquad
0\leq S_{\mathrm{loc}}\leq 1
$$
For every validated solar-system, binary-pulsar, lensing, and gravitational-wave record $r$, the recovery requirement is
$$
\left|\mu(a_r,k_r)S_{\mathrm{loc}}(\mathcal{I}_r)\right|<\epsilon_r
$$
Cosmological deviations are viable only when the same coefficient record also fits BAO, CMB lensing, supernova distances, and $f\sigma_8$ growth without retuning $S_{\mathrm{loc}}$ by observational channel.

A concrete prediction: if Noether sea compliance decreases as it cools (outer binaries expand, lowering the energy density and stiffening the Noether sea response), then $\mu < 0$ at late times, suppressing growth and lowering $S_8$. This is a falsifiable, quantitative claim.

---

## Growth-Module Interface

In the modular cosmology architecture, this document provides:

**Ontic inputs** (from medium dynamics and assembly physics):
- Noether sea equation of state $w_{\text{sea}}(t)$ and energy density $u_{\text{sea}}(t)$,
- neutral-assembly (dark-matter) density $\rho_{\text{dm}}(t)$ and interaction cross-section,
- effective gravitational coupling $G_{\text{eff}}(t, k)$ from medium compliance,
- primordial perturbation spectrum $P_0(k)$ (from the initial Noether sea state or an inflation-equivalent process).

**Effective outputs** (to observational modules):
- linear growth factor $D(z)$ and growth rate $f(z)$,
- matter power spectrum $P(k, z)$,
- $\sigma_8(z)$ and $S_8(z)$ for comparison with survey data,
- lensing convergence power spectrum $C_\ell^{\kappa\kappa}$ for CMB and cosmic-shear analyses.

**Bridge variables** shared with:
- [dark-matter.md](./dark-matter.md): neutral-assembly properties, relic abundance, interaction rates,
- [hubble-s8-tensions.md](./hubble-s8-tensions.md): $H(z)$, $f\sigma_8(z)$, and tension-resolution diagnostics,
- [CMB.md](./CMB.md): primordial spectrum inputs, lensing amplitude, acoustic-peak constraints,
- [spacetime/emergent-metric.md](../spacetime/emergent-metric.md): the Noether sea state variables from which $G_{\text{eff}}$ is computed.

---

## Synthesis

Structure formation is modeled here as Noether sea response gravitational instability in a fixed Euclidean void, with $H$, $G_{\text{eff}}$, and matter content determined by internal dynamics of architrino assemblies. The practical program is to derive the constitutive coefficients $\{K,S,\zeta_{\text{bulk}},\eta,m_L,g_m\}(a)$, close $\mu(a,k)$ from Noether sea response equations, and propagate the resulting growth history through the coupled cosmology modules.
