# Structure Formation

This chapter translates standard structure-formation language into medium-and-assembly evolution inside a fixed Euclidean void. Its purpose is to explain how overdensity growth, effective expansion variables, and dark-sector clustering are meant to fit together when the Noether Sea replaces metric expansion as the underlying ontology. It should be read as the growth-side continuation of [Cosmology Ontology](./cosmology-ontology.md), [Expansion Mechanism](./expansion-mechanism.md), and [Dark Matter](./dark-matter.md).

## Scope and Physical Picture

Structure formation describes how the nearly homogeneous early universe developed the web of galaxies, clusters, filaments, and voids observed today. In standard $\Lambda$CDM this story unfolds through gravitational instability of small density perturbations in an expanding Friedmann–Robertson–Walker metric, seeded during inflation and amplified by pressureless cold dark matter that decouples early from the photon–baryon plasma. In the $\mathbb{A}\mathbb{A}\mathbb{A}$ comparison map, the inflation-side predecessor is [Inflation Model](./inflation-model.md).

The standard term **cosmological void** should be read as a low-galaxy-density region, not as ontological emptiness. Such regions still contain the Noether Sea, photon and neutrino transport, sparse hydrogen, and possible rare reaction channels seeded by high-energy photons or other local sources.

In the Architrino Assembly Architecture the same phenomenology is reinterpreted as **medium-and-assembly co-evolution inside a fixed Euclidean void with absolute time**. The Noether Sea, the dense coupled population of pro/anti tri-binary assemblies, plays the role of the dynamical medium. Matter assemblies, baryonic composites plus any weakly coupled neutral assemblies serving the dark-matter role, are embedded in and coupled to this medium. Growth of overdensities is governed by how the medium transmits effective gravitational influence, how matter assemblies cluster under that influence, and how the medium's own internal energy budget (playing the role of dark energy) modulates the expansion-equivalent dynamics.

No metric expansion of space occurs. The Euclidean void is static. What changes is the **internal state of the tri-binary medium**: assembly radii, oscillation frequencies, local number density, the Noether-Sea delay factor $\chi_{\text{sea}}$, and the resulting medium-dressed inertial response. All standard cosmological observables—power spectra, correlation functions, lensing maps—are recast as probes of this medium-plus-assembly history at different scales and epochs.

---

## Effective Perturbation Theory

### Background Medium State

Define a spatially averaged medium state at absolute time $t$:

- $\rho_{\text{sea}}(t)$: mean energy density of the Noether Sea (tri-binary assemblies),
- $\rho_m(t)$: mean energy density of matter assemblies (baryonic + neutral/dark),
- $\bar{\rho}_{\text{core}}(t)$: mean Noether-core density in physical units,
- $\bar{R}_{\text{core}}(t)$: mean outer-binary radius of Noether-Sea assemblies.

An effective Hubble-like parameter $H(t)$ is defined operationally through the rate of change of the medium's bulk properties. Specifically, if one defines an effective scale variable $a(t)$ via the photon redshift relation (the ratio of photon assembly frequencies at emission and reception), then $H = \dot{a}/a$ summarizes how inter-assembly separations evolve as the medium relaxes and dissipates energy. This $H$ is not the expansion rate of space but a bookkeeping variable for the medium's thermodynamic and mechanical evolution.

### Density Contrast and the Growth Equation

Let $\delta(\mathbf{x}, t) = (\rho_m(\mathbf{x}, t) - \bar{\rho}_m(t))/\bar{\rho}_m(t)$ be the matter density contrast. In the linear regime ($|\delta| \ll 1$), perturbations in the matter field obey an effective second-order equation that can be written in the familiar comparison form:

$$
\ddot{\delta} + 2H(t)\,\dot{\delta} - 4\pi G_{\text{eff}}(t, k)\,\bar{\rho}_m(t)\,\delta = 0.
$$

Each symbol carries a specific medium-level meaning:

- **$H(t)$**: the effective damping term arising from the medium's bulk evolution. As Noether-Sea assemblies relax energetically (outer binaries expanding, frequencies decreasing), inter-assembly separations grow, diluting the gravitational source density. This acts as a friction-like term on the growth of perturbations, exactly as Hubble drag does in standard cosmology, without identifying ordinary dissipative drag as the mass mechanism.

- **$G_{\text{eff}}(t, k)$**: the effective gravitational coupling, set by how efficiently a local matter overdensity perturbs the surrounding Noether Sea and how that perturbation propagates to attract more matter. In the architrino picture, $G_{\text{eff}}$ depends on:
  - the local Noether-core density $\bar{\rho}_{\text{core}}(t)$, which sets the medium stiffness,
  - the outer-binary radius $\bar{R}_{\text{core}}(t)$, which controls the compliance of Noether-Sea assemblies to deformation,
  - potentially the wavenumber $k$, if the medium response becomes scale-dependent at wavelengths comparable to internal assembly scales or at the transition between linear and self-hit regimes.
  The weak-field constitutive map behind this is the same one organized in [Emergent Metric](../spacetime/emergent-metric.md).

- **$\bar{\rho}_m(t)$**: the mean matter density, including baryonic assemblies and any weakly coupled neutral assemblies (the dark-matter sector; see interface with [dark-matter.md](./dark-matter.md)).

**Mechanism for the source term.** A local matter overdensity increases the density of architrino assemblies in that region. The additional delayed causal flux emitted by these assemblies modifies the local Noether-Sea delay factor $\chi_{\text{sea}}$, slowing signal propagation and deepening the effective potential well. At substrate level this is not set by inverse-square dilution alone: the received flux is also Jacobian-weighted, so local branch geometry and source motion can bunch or dilute the effective gravitational signal. Surrounding matter assemblies, following geodesics of the emergent metric (equivalently, responding to the gradient of the effective potential), drift inward. This positive feedback loop is gravitational instability, recast as medium-response dynamics.

**Where the equation is valid.** This growth equation holds in the regime where:
- perturbations are small ($|\delta| \ll 1$),
- the wavelength of perturbations is much larger than the tri-binary scale,
- the medium response is quasi-static (perturbation timescale $\gg$ internal tri-binary oscillation period),
- no internal velocity component of the matter assemblies approaches $c_f$ (the self-hit regime is not triggered by the perturbation dynamics themselves).

**What breaks outside that regime.** At $|\delta| \sim 1$ (turnaround and collapse), the linear equation fails and must be replaced by the full nonlinear medium response—analogous to N-body or hydrodynamic treatment in standard cosmology. At very small scales, the finite size of tri-binary assemblies and the discreteness of the Noether Sea introduce a physical cutoff; the continuum growth equation is not valid below the mean inter-assembly spacing. At extremely high densities (approaching conditions near a Planck-core object), the self-hit regime is entered, Jacobian anisotropies become large, and the effective $G$ itself changes qualitatively.

### The Growth Factor

Define the linear growth factor $D(t)$ as the growing-mode solution of the perturbation equation, normalized so that $\delta(\mathbf{x}, t) = D(t)\,\delta_0(\mathbf{x})$ in the linear regime. In standard cosmology:

$$
D(a) \propto H(a) \int_0^a \frac{da'}{[a' H(a')]^3}.
$$

Within the architrino framework the same integral structure holds, with $H(a)$ and $G_{\text{eff}}$ determined by the medium's equation of state. The growth rate $f(a) = d\ln D / d\ln a$ is a direct observable (via redshift-space distortions) and provides a clean test:

- If $G_{\text{eff}}$ is constant and the medium equation of state matches $\Lambda$CDM, then $f(a) \approx \Omega_m(a)^{0.55}$ as in GR.
- If $G_{\text{eff}}$ carries scale dependence from medium compliance, $f$ acquires a $k$-dependent correction that is absent in standard gravity and can be tested against galaxy survey data.

---

## Matter Content and the Dark Sector

### Baryonic Assemblies

Baryons (protons, neutrons, and their composites) are tri-binary assemblies with specific axial patterns. Their clustering behavior is governed by the effective growth equation above, modified by pressure support (thermal motion) and radiative cooling. Before recombination, baryonic assemblies are tightly coupled to coaxial contra-rotating pro/anti planar-pair photon wave packets propagating through the Noether Sea, producing acoustic oscillations. After decoupling, baryons fall into potential wells already established by the dark sector.

### Neutral Assemblies (Dark-Matter Candidates)

The architrino framework admits multiple dark-matter scenarios (detailed in [dark-matter.md](./dark-matter.md)). For structure formation the relevant properties are:

- **Coupling to the Noether Sea**: dark-matter assemblies must couple gravitationally (through the medium) but not electromagnetically (no net charge, minimal dipole coupling). Neutral tri-binary configurations with balanced axial layers (analogous to neutrino-like assemblies but more massive and stable) satisfy this requirement.
- **Thermal history**: if produced thermally in the early medium, their relic abundance and free-streaming length determine the small-scale cutoff of the matter power spectrum. Cold (non-relativistic at decoupling) neutral assemblies reproduce CDM-like behavior; warm candidates (lighter, with residual thermal velocity) suppress small-scale power.
- **Self-interaction**: if neutral assemblies interact among themselves through residual short-range forces (e.g., van der Waals-like wake overlap at close range), this modifies halo profiles at small scales—a potential handle on the core-cusp and too-big-to-fail problems.

The effective growth equation accommodates both CDM-like and self-interacting scenarios through the form of $G_{\text{eff}}(t,k)$ and any additional pressure or viscosity terms.

### Medium Energy (Dark-Energy Role)

The baseline energy density of the Noether Sea ($\rho_{\text{sea}}$) acts as an effective cosmological constant or dark energy. Its contribution enters the Hubble drag term $H(t)$. If the medium's internal equation of state is $w_{\text{sea}} \approx -1$ (the tri-binary Noether-Sea assemblies resist compression, exerting negative effective pressure), the late-time acceleration of the effective expansion follows directly. Any evolution of $w_{\text{sea}}(t)$ from the medium's slow thermodynamic relaxation produces a dynamical dark-energy signature testable against supernova and BAO data.

---

## Observational Readout Domains

Structure formation in this framework is a single coupled medium-and-assembly history. Different observational probes sample different scales and epochs of that history:

### Galaxy Rotation Curves

Flat rotation curves require either a dark-matter halo or a modified gravitational response at low accelerations. In the medium picture:
- A halo of weakly coupled neutral assemblies reproduces standard NFW-like profiles.
- Alternatively, if $G_{\text{eff}}$ develops scale dependence at galactic scales (from nonlinear medium response at low density gradients), MOND-like behavior emerges without particle dark matter.
- The Bullet Cluster and similar offset systems provide a high-pressure inference gate rather than a one-image ontological proof. If an ensemble of cluster-offset reconstructions robustly requires lensing mass separated from the baryonic gas under the same lensing priors, gas dynamics, and shared medium-state record, then pure medium-modification scenarios fail and a collisionless neutral-assembly component is required.

### Cluster Mass Profiles

Clusters probe the intermediate regime ($\sim 1$–$10$ Mpc) where both thermal gas (X-ray) and gravitational lensing provide independent mass estimates. Consistency between hydrostatic and lensing masses constrains any scale dependence in $G_{\text{eff}}$ at cluster scales.

### Cosmic Shear and $S_8$

Weak gravitational lensing measures the integrated matter power spectrum weighted by the lensing kernel. The $S_8 = \sigma_8 \sqrt{\Omega_m / 0.3}$ parameter family directly constrains the amplitude of linear growth at low redshift. In the medium picture:
- $\sigma_8$ is the rms matter fluctuation at $8\,h^{-1}$ Mpc, computed from the growth factor $D(t)$ and the primordial spectrum.
- Consistency between CMB-inferred $S_8$ (high-$z$ prediction evolved to $z=0$) and direct low-$z$ lensing measurement is a stringent test. Current data suggest mild tension ($S_8^{\text{CMB}} > S_8^{\text{lensing}}$ at $\sim 2$–$3\sigma$).
- If $G_{\text{eff}}$ weakens at late times relative to its early-universe value (because the medium stiffens as it cools), the predicted $S_8$ at low $z$ drops, potentially resolving the tension. This is a concrete, testable prediction of medium-evolution cosmology.

### CMB Lensing and Acoustic Peaks

The CMB power spectrum encodes the primordial perturbation spectrum processed through the photon–baryon–medium system before decoupling. The acoustic peak positions fix the sound horizon at recombination; the peak heights constrain the matter-to-radiation ratio and the baryon-to-dark-matter ratio. CMB lensing (the smoothing of peaks at high $\ell$) probes the integrated matter distribution between the last-scattering surface and the observer.

The growth module provides:
- the matter power spectrum $P(k, z)$ that determines the lensing potential $C_\ell^{\phi\phi}$,
- the growth history $D(z)$ that sets the amplitude of the lensing signal,
- any anomalous scale dependence in $G_{\text{eff}}$ that would shift the lensing amplitude relative to the $\Lambda$CDM prediction (interface with [CMB.md](./CMB.md)).

This is an inference interface, not a direct ontology map. ACT/Planck-style CMB-lensing reconstructions first supply a lensing data product, compactly represented by $C_L^{\phi\phi}$. A valid medium-and-assembly growth model must then produce the same $C_L^{\phi\phi}$ from the same matter power spectrum, growth history, neutral-assembly loading, and Noether-Sea response variables used for galaxy clustering and low-redshift weak lensing. If the CMB-lensing fit requires one growth record while late-time shear or cluster offsets require another, the structure-formation branch has split the shared cosmology state rather than closed it.

Pre-BBN comparison branches enter structure formation only through the transfer record they leave behind. For any branch $X$ retained by [Inflation Model](./inflation-model.md#pre-bbn-comparison-gate) and [BBN Constraints](./BBN-constraints.md#pre-bbn-handoff-gate), the growth-side observable is
$$
\Delta P_X(k,z)
=
P(k,z\mid \theta_{\mathrm{sea}},\theta_X)
-
P(k,z\mid \theta_{\mathrm{sea}}).
$$
This quantity must be evaluated with the same $\theta_{\mathrm{sea}}$ used for BBN, CMB, cluster offsets, weak lensing, and redshift-space distortions. If a weakly coupled component is invisible to light elements only by acquiring a free-streaming length, abundance, or interaction history that later changes independently in $P(k,z)$, $C_L^{\phi\phi}$, or halo statistics, the comparison branch fails the shared-record gate.

### High-Redshift Structure

Reports of massive, mature galaxies at $z > 10$ (from JWST and successors) test whether the growth history permits sufficient structure formation by early times. In the medium framework:
- If $G_{\text{eff}}$ was larger at early times (medium more compliant when hotter/denser), early structure formation is enhanced relative to standard $\Lambda$CDM—potentially explaining surprisingly massive high-$z$ systems without exotic physics.
- Conversely, if $G_{\text{eff}}$ was constant, the same tension present in standard cosmology persists and must be addressed through astrophysical channels (early star formation efficiency, AGN feedback).

### Top-Down vs Bottom-Up Discriminator

The framework should be evaluated on whether early-time growth behaves predominantly as hierarchical buildup (bottom-up), fragmentation-dominant assembly (top-down), or a mixed regime across scale and epoch. In practice, this is read from the joint evolution of the high-$z$ halo mass function, merger statistics, and large-scale filament maturity under one calibrated $G_{\text{eff}}(a,k)$ history.

### Largest Structures

The existence of very large coherent structures (giant arcs, walls, and voids at $\gtrsim 200$ Mpc scales) tests the homogeneity assumption and the age of the universe. In a framework where the Euclidean void is eternal and the medium history may differ from the standard $13.8$ Gyr narrative:
- Effectively unbounded-age scenarios (if the medium has recycled through earlier phases) could accommodate structures requiring longer formation times.
- Finite-age scenarios must demonstrate that the observed structures are statistically compatible with the growth rate permitted by $D(z)$ and $P(k)$.

This is an active test with model-discriminating power, not merely a fitting exercise. A structure-formation run should report the scale-neutral homogeneity residual $\mathcal{R}_{\mathrm{hom}}(\theta_{\mathrm{sea}};L,t)$ defined in [Cosmology Ontology](./cosmology-ontology.md#inference-dependency-ledger) alongside $P(k,z)$, $D(z)$, lensing summaries, and high-redshift halo statistics. If the matter power spectrum fits but dimensionless pair-separation distributions differ by direction, environment, or source family beyond tolerance, the run has not supplied a single large-scale medium history.

---

## Scale Dependence of $G_{\text{eff}}$: Mechanism and Regime Map

A key distinguishing feature of the medium-based framework is that $G_{\text{eff}}$ may carry genuine scale (and epoch) dependence arising from the constitutive properties of the Noether Sea.

### Physical Origin

The effective gravitational coupling is set by how efficiently a local overdensity deforms the surrounding tri-binary medium. At different scales, different medium-response mechanisms dominate:

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
G_{\text{eff}}(a, k) = G_N \bigl[1 + \mu(a, k)\bigr],
$$

where $\mu(a, k)$ is a dimensionless modification function.

### Linear Constitutive Derivation of $\mu(a,k)$

To make the map explicit, linearize the Noether-Sea medium around a homogeneous background with displacement field $\mathbf{u}$ and scalar compression mode
$$
\theta \equiv \nabla\cdot\mathbf{u}.
$$

Use isotropic linear constitutive response (elastic + Kelvin-Voigt damping):
$$
\delta \sigma_{ij}
=
K(a)\,\delta_{ij}\,\theta
+2S(a)\!\left(u_{ij}-\frac{1}{3}\delta_{ij}\theta\right)
+\zeta_{\text{bulk}}(a)\,\delta_{ij}\,\dot{\theta}
+2\eta(a)\!\left(\dot{u}_{ij}-\frac{1}{3}\delta_{ij}\dot{\theta}\right),
$$
with bulk modulus $K$, shear modulus $S$, and viscosities $(\zeta_{\text{bulk}},\eta)$. The subscript prevents confusion with the shielding factor $\zeta(A)$ used in assembly-mass closure.

For scalar/longitudinal modes in Fourier space, the linear response equation is
$$
\left[M_L(a)k^2 + m_L^2(a) - i\omega\,\Gamma_L(a)\,k^2\right]\theta(a,k,\omega)
=
g_m(a)\,\delta\rho_m(a,k,\omega),
$$
where
$$
M_L(a)\equiv K(a)+\frac{4}{3}S(a),
\qquad
\Gamma_L(a)\equiv \zeta_{\text{bulk}}(a)+\frac{4}{3}\eta(a),
$$
and $m_L(a)$ is the finite-range restoring scale (equivalently $k_\ast(a)^2=m_L^2/M_L$).

The induced sea-density perturbation is
$$
\delta\rho_{\text{sea}}(a,k,\omega)
=
-\bar{\rho}_{\text{sea}}(a)\,\theta(a,k,\omega)
=
\mu_{\text{sea}}(a,k,\omega)\,\delta\rho_m(a,k,\omega),
$$
with susceptibility
$$
\mu_{\text{sea}}(a,k,\omega)
=
-\frac{\bar{\rho}_{\text{sea}}(a)\,g_m(a)}
{M_L(a)k^2+m_L^2(a)-i\omega\,\Gamma_L(a)k^2}.
$$

Insert this into the linear Poisson source:
$$
-k^2\Phi(a,k)=4\pi G_N a^2\bigl[\delta\rho_m+\delta\rho_{\text{sea}}\bigr]
=
4\pi G_N a^2\bigl[1+\mu_{\text{sea}}(a,k,\omega)\bigr]\delta\rho_m.
$$
Therefore
$$
G_{\text{eff}}(a,k,\omega)=G_N\bigl[1+\mu_{\text{sea}}(a,k,\omega)\bigr],
\qquad
\mu(a,k,\omega)=\mu_{\text{sea}}(a,k,\omega).
$$

For growth calculations use the quasi-static branch $\omega\simeq H(a)f(a)$ and the real part:
$$
\mu(a,k)
=
-\frac{\bar{\rho}_{\text{sea}}(a)\,g_m(a)\,\bigl[M_L(a)k^2+m_L^2(a)\bigr]}
{\bigl[M_L(a)k^2+m_L^2(a)\bigr]^2+\bigl[H(a)f(a)\Gamma_L(a)k^2\bigr]^2}.
$$

In the strictly quasi-static limit ($Hf\,\Gamma_Lk^2\ll M_Lk^2+m_L^2$), this reduces to the closed Yukawa-like form
$$
\mu(a,k)
\approx
-\frac{\bar{\rho}_{\text{sea}}(a)\,g_m(a)}
{m_L^2(a)+M_L(a)k^2}
=
\frac{\mu_0(a)}{1+\bigl(k/k_\ast(a)\bigr)^2},
$$
$$
\mu_0(a)\equiv-\frac{\bar{\rho}_{\text{sea}}(a)\,g_m(a)}{m_L^2(a)},
\qquad
k_\ast(a)^2\equiv\frac{m_L^2(a)}{M_L(a)}.
$$

Setting $g_m=0$ (or equivalently $\mu=0$) recovers standard GR growth. Current data constrain $|\mu| \lesssim 0.1$ on the scales probed by galaxy surveys and CMB lensing.

A finite-range or screening comparison adds one useful local-recovery gate without importing massive-gravity ontology. If a local constitutive invariant $\mathcal{I}_{\mathrm{loc}}$ suppresses the response in dense or strongly tested regimes, write
$$
G_{\text{eff}}(a,k,\mathcal{I}_{\mathrm{loc}})
=
G_N\left[1+\mu(a,k)S_{\mathrm{loc}}(\mathcal{I}_{\mathrm{loc}})\right],
\qquad
0\leq S_{\mathrm{loc}}\leq 1.
$$
For every validated solar-system, binary-pulsar, lensing, and gravitational-wave record $r$, the recovery requirement is
$$
\left|\mu(a_r,k_r)S_{\mathrm{loc}}(\mathcal{I}_r)\right|<\epsilon_r.
$$
Cosmological deviations are viable only when the same coefficient record also fits BAO, CMB lensing, supernova distances, and $f\sigma_8$ growth without retuning $S_{\mathrm{loc}}$ by observational channel.

A concrete prediction: if the medium's compliance decreases as it cools (outer binaries expand, lowering the energy density and stiffening the Noether-Sea response), then $\mu < 0$ at late times, suppressing growth and lowering $S_8$. This is a falsifiable, quantitative claim.

---

## Growth-Module Interface

In the modular cosmology architecture, this document provides:

**Ontic inputs** (from medium dynamics and assembly physics):
- Noether Sea equation of state $w_{\text{sea}}(t)$ and density $\rho_{\text{sea}}(t)$,
- neutral-assembly (dark-matter) density $\rho_{\text{dm}}(t)$ and interaction cross-section,
- effective gravitational coupling $G_{\text{eff}}(t, k)$ from medium compliance,
- primordial perturbation spectrum $P_0(k)$ (from the initial medium state or an inflation-equivalent process).

**Effective outputs** (to observational modules):
- linear growth factor $D(z)$ and growth rate $f(z)$,
- matter power spectrum $P(k, z)$,
- $\sigma_8(z)$ and $S_8(z)$ for comparison with survey data,
- lensing convergence power spectrum $C_\ell^{\kappa\kappa}$ for CMB and cosmic-shear analyses.

**Bridge variables** shared with:
- [dark-matter.md](./dark-matter.md): neutral-assembly properties, relic abundance, interaction rates,
- [hubble-s8-tensions.md](./hubble-s8-tensions.md): $H(z)$, $f\sigma_8(z)$, and tension-resolution diagnostics,
- [CMB.md](./CMB.md): primordial spectrum inputs, lensing amplitude, acoustic-peak constraints,
- [spacetime/emergent-metric.md](../spacetime/emergent-metric.md): the medium state variables from which $G_{\text{eff}}$ is computed.

---

## Synthesis

Structure formation is modeled here as medium-response gravitational instability in a fixed Euclidean void, with $H$, $G_{\text{eff}}$, and matter content determined by internal dynamics of architrino assemblies. The practical program is to derive the constitutive coefficients $\{K,S,\zeta_{\text{bulk}},\eta,m_L,g_m\}(a)$, close $\mu(a,k)$ from the medium response equations, and propagate the resulting growth history through the coupled cosmology modules.
