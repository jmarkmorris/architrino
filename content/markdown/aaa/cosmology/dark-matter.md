
# Dark Matter in the Architrino Assembly Architecture

## Scope and Purpose

Standard $\Lambda\mathrm{CDM}$ cosmology attributes roughly 27% of the present energy budget to cold dark matter (CDM)—a pressureless, non-baryonic component that clusters gravitationally but couples negligibly to electromagnetic radiation. This chapter maps dark-matter phenomenology onto the architrino assembly architecture, identifies the candidate substrates, defines the observational benchmarks each candidate must satisfy, and states explicit failure conditions.

Throughout, "dark matter" refers to the set of phenomena conventionally attributed to CDM: flat galaxy rotation curves, cluster lensing offsets, the third acoustic peak of the CMB, large-scale structure growth, and BBN-consistent $\Omega_b$. The task is to explain this phenomenology within one ontology—Euclidean void, absolute time, architrinos, and tri-binary assemblies—without importing new fundamental fields or ad hoc modifications to gravity.

## Observational Constraint Summary

Any AAA dark-matter account must simultaneously satisfy the following targets, drawn from current data:

| Observable | Constraint | Reference regime |
|:---|:---|:---|
| $\Omega_{\mathrm{DM}} h^2$ | $0.120 \pm 0.001$ | CMB (Planck 2018) |
| Galaxy rotation curves | Flat $v(r)$ to $\gtrsim 5 R_d$ | Milky Way, external spirals |
| Bullet Cluster offset | DM centroid leads gas centroid by $\sim 100$ kpc after merger | Cluster lensing + X-ray |
| CMB third peak ratio | $\ell_3/\ell_1$ height ratio fixes $\Omega_{\mathrm{DM}}/\Omega_b$ | $z \sim 1100$ |
| BBN baryon fraction | $\Omega_b h^2 \approx 0.0224$; excess gravitating matter not baryonic | $T \sim 0.1$–$1$ MeV |
| Matter power spectrum | $P(k)$ shape through BAO wiggles and turnover | $0.01 \lesssim k \lesssim 0.3\;h\,\mathrm{Mpc}^{-1}$ |
| Lensing amplitude $S_8$ | $S_8 = \sigma_8 (\Omega_m/0.3)^{0.5} \approx 0.77$–$0.83$ | Weak lensing surveys |
| Direct detection | No confirmed WIMP signal above $\sigma_{\mathrm{SI}} \sim 10^{-47}\;\mathrm{cm}^2$ at 30 GeV | Laboratory bounds |

## AAA Ontology Foundations

### The Noether Sea as Gravitational Medium

In the architrino framework, the Euclidean void is populated by a dense lattice of coupled neutral tri-binary assemblies—the Noether Sea. Each tri-binary consists of three nested electrino–positrino binaries (inner, middle, outer), with net charge zero and internal dynamics spanning the three field-speed regimes ($v > c_f$, $v = c_f$, $v < c_f$). Gravity is not a fundamental force but an emergent refractive effect: local variations in Noether-Sea density $\rho_{\mathrm{NS}}(\mathbf{x},t)$ alter effective signal-propagation speeds, producing geodesic deviation and an effective metric $g_{\mu\nu}$ experienced by all assemblies.

Massive composite assemblies (protons, atoms, stars) are tri-binary configurations with decoration charges; they locally compress the Noether Sea, increasing $\rho_{\mathrm{NS}}$ and slowing effective light propagation. This compression is the substrate-level origin of the Newtonian potential $\Phi_N$ in the weak-field limit. The effective gravitational constant $G$ is related to the medium compliance—how readily the Sea density responds to stress from embedded matter (see `spacetime/emergent-metric.md`).

### What Counts as "Dark" in this Ontology

A dark-matter candidate in AAA must satisfy two conditions:

- **Gravitational coupling:** The candidate must compress the Noether Sea (contribute to effective $\rho_{\mathrm{NS}}$ gradients) and therefore deflect light and accelerate baryonic matter.
- **Electromagnetic transparency:** The candidate must couple negligibly to photon-mode assemblies so that it neither emits, absorbs, nor scatters electromagnetic radiation at detectable levels.

Two substrate-level mechanisms can satisfy these conditions, either separately or together.

## Candidate Substrates

### Candidate A — Neutral Assembly Populations

**Definition.** Neutral tri-binary assemblies that lack exposed charged decoration sites. The minimal examples are:

- **Neutrino-class assemblies:** Pro-tri-binary cores with balanced personality layers (3P, 3E decoration). These are the SM neutrinos themselves; their masses ($\sum m_\nu < 0.12$ eV from cosmological bounds) are too small to account for the full $\Omega_{\mathrm{DM}}$, but they contribute to the hot dark-matter fraction and to $N_{\mathrm{eff}}$.

- **Heavier neutral assemblies (hypothetical):** Tri-binary cores carrying decoration patterns that are globally neutral and whose internal dynamics suppress electromagnetic coupling below detection thresholds. In AAA these would be assemblies whose personality layers cancel in both net charge and oscillating dipole moment—analogous to the neutrino's balanced decoration but realized on a heavier core (e.g., a bi-binary or uni-binary nucleus with appropriately locked decoration, or a multi-core composite). The mass scale is set by the core's internal binding energy and Noether-Sea drag.

- **Primordial Noether-core defects:** Dense, self-gravitating clusters of maximally contracted tri-binaries produced in the high-energy epoch—analogous to primordial black holes in standard cosmology but with internal Planck-core structure replacing singular interiors. Their mass spectrum depends on formation-epoch dynamics.

**Behavior.** These assemblies are pressureless at late times (kinetic energy $\ll$ rest energy), cluster gravitationally, and are collisionless on galactic scales because their interaction cross-section with baryonic and electromagnetic assemblies is negligible (no exposed charge → no long-range dipole coupling). They therefore reproduce the canonical CDM clustering phenomenology: hierarchical structure formation, flat rotation curves from halo profiles, and the correct matter-loading signature in the CMB.

**Bullet Cluster test.** In a cluster merger, neutral assemblies pass through each other (collisionless), while baryonic gas assemblies interact electromagnetically and decelerate. This produces the observed lensing-centroid / X-ray-centroid offset. A pure medium-response account (Candidate B alone) must reproduce this offset without invoking a separate collisionless component—a stringent requirement.

### Candidate B — Noether-Sea Medium Response

**Definition.** Non-linear elastic or dispersive response of the Noether Sea itself under low-acceleration or low-density-gradient conditions. In regions where the effective gravitational acceleration falls below a characteristic scale $a_0$, the medium's compliance (inverse stiffness) may change, altering the effective force law.

**Mechanism sketch.** Each Noether-Sea tri-binary has a minimum restoring-force threshold set by the outer-binary binding. Below the corresponding acceleration scale, the medium deforms more easily per unit stress—the effective $G$ increases with decreasing acceleration. This is structurally analogous to MOND ($\mu(a/a_0)\,a = a_N$) but derived from assembly elasticity rather than postulated. The transition function $\mu$ would emerge from the outer-binary response curve as a function of the local strain rate $\nabla\Phi / a_0$.

**Characteristic scale.** The MOND acceleration $a_0 \approx 1.2 \times 10^{-10}\;\mathrm{m\,s}^{-2}$ is suggestively close to $c H_0 / (2\pi)$. In AAA, this coincidence could reflect a connection between the outer-binary expansion/contraction timescale (set by the cosmological evolution of the Noether Sea) and the local stiffness threshold. This is a mapping target, not a derived result.

**Limitations.** A pure medium-response account faces well-documented difficulties:
- Reproducing the Bullet Cluster offset without a collisionless component.
- Matching the CMB third-peak height ratio, which in $\Lambda\mathrm{CDM}$ directly measures $\Omega_{\mathrm{DM}}/\Omega_b$ through baryon loading of acoustic oscillations.
- Producing the correct shape of the matter power spectrum $P(k)$ on scales $k \sim 0.01$–$0.1\;h\,\mathrm{Mpc}^{-1}$, where CDM clustering sets the turnover.

These difficulties motivate retaining Candidate A as the primary dark-matter substrate, with Candidate B contributing corrections.

### Candidate C — Hybrid (Working Baseline)

**Definition.** Neutral assemblies carry the dominant non-baryonic gravitating mass ($\Omega_{\mathrm{DM}} \sim 0.25$), while Noether-Sea medium response provides scale-dependent corrections that modify effective profiles in low-acceleration environments.

**Rationale.** This hybrid is the working baseline because:

- Neutral assemblies handle the heavy lifting: CMB matter loading, large-scale power spectrum, Bullet Cluster collisionless behavior, and BBN consistency ($\Omega_b$ remains small).
- Medium response can address observed tensions at galaxy scale—the diversity of rotation-curve shapes, the radial-acceleration relation (RAR) tightness, and possible deviations from pure NFW profiles—without introducing additional free parameters per galaxy.
- The two contributions arise from the same ontological substrate (tri-binary assemblies in Euclidean void with absolute time) and are coupled: neutral assemblies compress the Sea, which in turn responds non-linearly, feeding back on the effective potential.

**Coupled equations (schematic).** Let $\rho_A(\mathbf{x},t)$ denote the neutral-assembly density and $\rho_{\mathrm{NS}}(\mathbf{x},t)$ the Noether-Sea density. In the Newtonian limit, the effective Poisson equation becomes:

$$
\nabla^2 \Phi_{\mathrm{eff}} = 4\pi G_{\mathrm{eff}}(\nabla\Phi,\rho_{\mathrm{NS}})\,\bigl(\rho_b + \rho_A + \rho_{\mathrm{NS}}^{(\mathrm{pert})}\bigr),
$$

where $\rho_b$ is baryonic density, $\rho_{\mathrm{NS}}^{(\mathrm{pert})}$ is the perturbative Sea response above its cosmological mean, and $G_{\mathrm{eff}}$ carries the medium-response modification. In the high-acceleration limit ($|\nabla\Phi| \gg a_0$), $G_{\mathrm{eff}} \to G_N$ and $\rho_{\mathrm{NS}}^{(\mathrm{pert})} \to 0$; in the low-acceleration limit, $G_{\mathrm{eff}}$ stiffens and $\rho_{\mathrm{NS}}^{(\mathrm{pert})}$ may contribute an effective "phantom" density that mimics additional dark matter.

This coupled system must be solved self-consistently. The neutral-assembly component $\rho_A$ satisfies collisionless Boltzmann transport in the potential $\Phi_{\mathrm{eff}}$; the medium response enters through constitutive relations derived from Noether-Sea tri-binary elasticity.

## Regime Map

The hybrid baseline yields a unified regime architecture:

| Environment | Dominant mechanism | Effective description |
|:---|:---|:---|
| CMB / $z > 100$ | Neutral assemblies | CDM-like: pressureless, collisionless |
| BAO / $10 < z < 100$ | Neutral assemblies + linear medium | CDM + small corrections |
| Cluster scales / $z \sim 0$ | Neutral assemblies (collisionless) | NFW-like profiles; Bullet Cluster offset |
| Galaxy outer regions / low $a$ | Hybrid: assemblies + medium response | RAR tightness; rotation-curve diversity |
| Dwarf galaxies / ultra-low $a$ | Medium response dominant | Possible core-vs-cusp modification |

The boundaries between regimes are set by the ratio $|\nabla\Phi|/a_0$ and the local Noether-Sea density gradient. These are continuous transitions within one ontology, not patched models.

## SMBH Recycling and Dark-Sector Flow

In AAA cosmology, supermassive black holes (SMBHs) are recycling furnaces: baryonic and dark-sector assemblies fall in, are processed through the high-energy interior (inner tri-binary regime, $v > c_f$), and re-emerge via jets and radiative outflows in altered assembly configurations. This cycle has implications for the dark sector:

- **Neutral-assembly processing:** If neutral assemblies accrete onto SMBHs, they contribute to the energy budget available for jet launching. Re-emitted assemblies may include photons (planar-mode tri-binaries), neutrinos, and potentially new neutral assemblies formed during the recycling process.
- **Dark-sector mass evolution:** Unlike pure $\Lambda\mathrm{CDM}$ where dark matter is strictly conserved and collisionless, AAA permits slow conversion between dark and visible sectors through SMBH processing. This conversion rate must be small enough to preserve $\Omega_{\mathrm{DM}}$ to within Planck-era constraints over cosmological timescales, which places an upper bound on the SMBH dark-matter accretion efficiency.
- **Observable signature (speculative):** If SMBH recycling converts neutral assemblies into electromagnetic-channel products at non-negligible rates, this could produce a correlation between SMBH mass and local dark-matter deficit. This is a mapping target for simulation, not an asserted observational deviation.

## Candidate Assembly Properties

### Mass Scale

The neutral-assembly mass is not a free parameter to be fitted post hoc; it must emerge from the binding energy of the assembly's core and its drag coupling to the Noether Sea. Candidate mass ranges, mapped to observational constraints:

- $m \sim$ eV: warm dark matter; suppresses small-scale structure (Lyman-$\alpha$ forest constrains $m > 5.3$ keV for thermal relics, so eV-scale thermal candidates are ruled out unless production is non-thermal).
- $m \sim$ keV–GeV: canonical cold dark matter window.
- $m \sim$ GeV–TeV: WIMP-like; direct-detection null results constrain cross-sections tightly.
- $m \gg$ TeV: superheavy; must be produced non-thermally (e.g., gravitational production or SMBH-related formation in early epochs).

The AAA framework does not currently predict a unique mass; deriving the mass spectrum from first-principles tri-binary binding energies and formation rates is a high-priority simulation target.

### Interaction Cross-Sections

Neutral assemblies interact with each other and with baryonic matter only through:

- **Gravitational coupling** (Noether-Sea compression): always present; sets halo profiles.
- **Residual short-range coupling:** If the neutral assembly has any non-zero higher-multipole moment (e.g., a quadrupole from internal binary precession), there is a short-range van-der-Waals-like interaction scaling as $r^{-7}$ or steeper. This must satisfy:
  - Self-interaction: $\sigma/m < 1\;\mathrm{cm}^2\,\mathrm{g}^{-1}$ at cluster scales (Bullet Cluster bound), while $\sigma/m \sim 0.1$–$10\;\mathrm{cm}^2\,\mathrm{g}^{-1}$ at dwarf-galaxy scales is observationally permitted and could address core-vs-cusp tension.
  - Baryonic interaction: $\sigma_{\mathrm{SI}} < 10^{-47}\;\mathrm{cm}^2$ at $m \sim 30$ GeV (LZ/XENON bounds for spin-independent scattering).

### Stability

The neutral-assembly candidate must be cosmologically stable: lifetime $\tau \gg t_0 \approx 13.8$ Gyr. In AAA, stability follows from the same topological arguments that stabilize the proton: the assembly occupies a deep attractor basin in tri-binary configuration space, and all decay channels either violate charge/polarity conservation or require energy input exceeding the cosmological temperature.

## Cosmology Integration

### Pre-Decoupling ($z \gtrsim 1100$)

Neutral assemblies contribute to the total matter density:

$$
\Omega_m = \Omega_b + \Omega_A, \quad \Omega_A \approx 0.25.
$$

Their gravitational effect on photon-baryon oscillations produces the characteristic signature in the CMB power spectrum: suppression of odd peaks (baryon loading) with the overall amplitude and peak-height ratios set by $\Omega_A/\Omega_b$. The AAA model must reproduce the Planck TT power spectrum through the third acoustic peak to within $\sim 5\%$ in $C_\ell$ residuals.

### Post-Decoupling Growth

Matter perturbations grow as $\delta \propto a$ in the matter-dominated era. The AAA growth equation in the Newtonian limit reads:

$$
\ddot{\delta}_A + 2H\dot{\delta}_A = 4\pi G_{\mathrm{eff}}\,\rho_m\,\delta_m,
$$

where $\rho_m = \rho_b + \rho_A$ and $G_{\mathrm{eff}}$ may carry scale-dependent corrections from the medium response. In the high-acceleration (linear) regime, $G_{\mathrm{eff}} \to G_N$ and standard CDM growth is recovered. Deviations from $\Lambda\mathrm{CDM}$ growth appear only when $|\nabla\Phi|/a_0 \lesssim 1$, which on cosmological scales ($k < 0.01\;h\,\mathrm{Mpc}^{-1}$) may be relevant at low redshift and could contribute to resolving the $S_8$ tension.

### BAO and Matter Power Spectrum

The matter power spectrum $P(k)$ encodes the transfer function through matter-radiation equality and the BAO wiggles imprinted at decoupling. The neutral-assembly contribution sets the shape of $P(k)$ on scales $k > k_{\mathrm{eq}}$, where $k_{\mathrm{eq}} \propto \Omega_m h^2$. AAA must match the observed $P(k)$ from galaxy surveys (BOSS, DESI) to within the statistical precision of those measurements.

### $H_0$ and $S_8$ Tensions

The AAA hybrid baseline offers two potential handles on current cosmological tensions:

- **$H_0$ tension ($67.4$ vs $73.0\;\mathrm{km\,s}^{-1}\,\mathrm{Mpc}^{-1}$):** If neutral-assembly properties (e.g., a non-zero but small self-interaction or a late-time decay channel) modify the distance ladder or sound horizon differently from pure CDM, the inferred $H_0$ could shift. This requires explicit computation of $r_s$ and $D_L(z)$ within the AAA expansion history.
- **$S_8$ tension ($\sim 2$–$3\sigma$ between CMB and weak lensing):** The scale-dependent medium response could suppress late-time growth at $k \sim 0.1$–$1\;h\,\mathrm{Mpc}^{-1}$, lowering $\sigma_8$ relative to the CMB-inferred value while leaving the CMB itself unchanged. This is a quantitative prediction that can be tested once $G_{\mathrm{eff}}(a,k)$ is derived from Noether-Sea constitutive relations.

## Falsifiability and Failure Modes

### Tier-1 Failures (Theory-Killing)

- **Bullet Cluster:** If the AAA framework cannot produce a collisionless dark component that leads the baryonic gas after a cluster merger, the neutral-assembly hypothesis fails, and the theory must rely entirely on medium response—which faces its own Bullet-Cluster problem.
- **CMB third peak:** If no neutral-assembly population with the correct $\Omega_A h^2$ can be identified from the AAA assembly spectrum, the CMB matter-loading constraint is violated.
- **BBN consistency:** If neutral assemblies interact strongly enough to alter the neutron-to-proton ratio at $T \sim 1$ MeV, light-element abundances are disrupted. Bound: any new species contributing to $N_{\mathrm{eff}}$ at BBN must satisfy $\Delta N_{\mathrm{eff}} < 0.4$ (95% CL).

### Tier-2 Failures (Require Revision)

- **Rotation-curve diversity:** If the medium-response correction cannot explain the scatter in rotation-curve shapes at fixed $v_{\mathrm{max}}$ without galaxy-by-galaxy fitting, the hybrid model loses its advantage over pure CDM + baryonic feedback.
- **$P(k)$ shape:** If the AAA $P(k)$ deviates from $\Lambda\mathrm{CDM}$ by more than $\sim 5\%$ at $k < 0.2\;h\,\mathrm{Mpc}^{-1}$ without improving tension metrics, the model performs worse than the baseline.
- **Direct detection:** If the predicted residual coupling of neutral assemblies exceeds current direct-detection bounds, the candidate is experimentally excluded at that mass scale.

### Tier-3 Predictions (Discriminating)

- **Self-interaction scale dependence:** The hybrid model predicts velocity-dependent self-interaction ($\sigma/m$ larger at lower collision velocities), distinguishing it from vanilla CDM. This is testable through galaxy-cluster vs dwarf-galaxy density profiles.
- **SMBH–halo correlation:** If SMBH recycling processes neutral assemblies, a (weak) anti-correlation between SMBH mass and central dark-matter density at fixed halo mass could emerge. This is testable with kinematic surveys of central galaxies.
- **Medium-response signature in weak lensing:** If $G_{\mathrm{eff}}$ is scale-dependent, the lensing convergence power spectrum $C_\ell^{\kappa\kappa}$ would deviate from $\Lambda\mathrm{CDM}$ at $\ell \sim 100$–$1000$ in a characteristic pattern distinct from simple $\sigma_8$ rescaling.

## Growth-Module Interface

In the modular cosmology architecture, this chapter connects to other modules through:

- **Input to `CMB.md`:** $\Omega_A h^2$, neutral-assembly equation of state $w_A(z)$ (expected: $w_A = 0$ for CDM-like behavior), and any $\Delta N_{\mathrm{eff}}$ contribution.
- **Input to `structure-formation.md`:** $G_{\mathrm{eff}}(a,k)$ from medium-response constitutive relation; neutral-assembly self-interaction cross-section $\sigma(v)/m$.
- **Input from `expansion-history.md`:** $H(z)$ and $\Omega_m(z)$ for growth-equation integration.
- **Input from `BBN.md`:** $N_{\mathrm{eff}}$ bound constraining allowed neutral-assembly species at MeV temperatures.

All interfaces use the same absolute-time / Euclidean-space substrate and the same Noether-Sea state variables, ensuring ontological consistency across modules.

## Summary

Dark-matter phenomenology in the architrino assembly architecture is attributed to a hybrid of two mechanisms arising from the same tri-binary substrate:

- **Neutral assemblies** (Candidate A): electromagnetically transparent tri-binary configurations that cluster gravitationally, reproducing CDM-like behavior at cluster and cosmological scales.
- **Noether-Sea medium response** (Candidate B): non-linear elastic corrections to effective gravity at low accelerations, providing scale-dependent modifications relevant to galaxy-scale phenomenology.

The working baseline is the hybrid (Candidate C), with neutral assemblies carrying the dominant mass fraction and medium response supplying corrections. This framework must match the full suite of cosmological and astrophysical dark-matter constraints; explicit failure conditions are defined above. Deriving the neutral-assembly mass spectrum, interaction cross-sections, and medium constitutive relations from the master equation is the critical open program.