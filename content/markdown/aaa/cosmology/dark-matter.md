# Dark Matter in the Architrino Assembly Architecture

This chapter maps the standard dark-matter phenomenology onto substrate candidates available inside the architrino ontology. The central task is to explain gravitational clustering without visible electromagnetic coupling, using assemblies or medium responses that belong to the same [Euclidean-void](../foundations/euclidean-void.md) and [Noether-Sea](../spacetime/spacetime-assemblies.md) framework as the rest of the theory.

The opening establishes the ontology and the criteria for what counts as dark in this setting. The later sections compare candidate substrates, summarize the current hybrid working baseline, and connect the picture to cosmological growth and observational interfaces.

## Scope and Purpose

Standard $\Lambda\mathrm{CDM}$ cosmology attributes roughly 27% of the present energy budget to cold dark matter (CDM)—a pressureless, non-baryonic component that clusters gravitationally but couples negligibly to electromagnetic radiation. This chapter maps dark-matter phenomenology onto the architrino assembly architecture and identifies candidate substrates.

Throughout, "dark matter" refers to the set of phenomena conventionally attributed to CDM: flat galaxy rotation curves, cluster lensing offsets, the third acoustic peak of the CMB, large-scale structure growth, and BBN-consistent $\Omega_b$. The task is to explain this phenomenology within one ontology—Euclidean void, absolute time, architrinos, and tri-binary assemblies—without importing new fundamental fields or ad hoc modifications to gravity.

## $\mathbb{A}\mathbb{A}\mathbb{A}$ Ontology Foundations

### The Noether Sea as Gravitational Medium

In the architrino framework, the Euclidean void is populated by a dense lattice of coupled neutral tri-binary assemblies—the Noether Sea. Each tri-binary consists of three nested electrino–positrino binaries (inner, middle, outer), with net charge zero and internal dynamics spanning the three field-speed regimes ($v > c_f$, $v = c_f$, $v < c_f$). Gravity is not a fundamental force but an emergent medium-response effect: local variations in Noether-core density $\rho_{\text{core}}(\mathbf{x},t)$ and normalized density $n(\mathbf{x},t)$ alter the Noether-Sea delay factor $\chi_{\text{sea}}$ and the transmission of delayed causal flux, producing geodesic deviation and an effective metric $g_{\mu\nu}$ experienced by all assemblies.

Massive composite assemblies (protons, atoms, stars) are tri-binary configurations with axial layers; they locally compress the Noether Sea, increasing $\rho_{\text{core}}$ and changing $\chi_{\text{sea}}$ for effective signal propagation. This compression is the substrate-level origin of the Newtonian potential $\Phi_N$ in the weak-field limit. The effective gravitational constant $G$ is related to the medium compliance—how readily the Sea density responds to stress from embedded matter (see [spacetime/emergent-metric.md](../spacetime/emergent-metric.md)).

### What Counts as "Dark" in this Ontology

A dark-matter candidate in $\mathbb{A}\mathbb{A}\mathbb{A}$ is characterized by two conditions:

- **Gravitational coupling:** The candidate must compress the Noether Sea (contribute to effective $\rho_{\text{core}}$ and $n$ gradients) and therefore deflect light and accelerate baryonic matter.
- **Electromagnetic transparency:** The candidate must couple negligibly to photon assemblies modeled as coaxial contra-rotating pro/anti planar pairs so that it neither emits, absorbs, nor scatters electromagnetic radiation at detectable levels.

Two substrate-level mechanisms can satisfy these conditions, either separately or together.

### Strong-Lensing Inference Guardrail

Strong gravitational lensing is a high-value dark-sector constraint, but it is an inverse problem rather than a direct image of dark matter. In the standard thin-lens comparison language, source-plane and image-plane positions satisfy

$$
\mathbf{y}
=
\mathbf{x}
-
\nabla\psi(\mathbf{x}),
\qquad
\Delta\psi(\mathbf{x})=2\kappa(\mathbf{x}),
$$

where $\psi$ is the observer-level lensing potential and $\kappa$ is the convergence, i.e. the surface mass density in critical-density units. The local image distortion is encoded by the Jacobian

$$
A(\mathbf{x})
\equiv
\frac{\partial\mathbf{y}}{\partial\mathbf{x}}
=
(1-\kappa)
\begin{pmatrix}
1-g_1 & -g_2\\
-g_2 & 1+g_1
\end{pmatrix},
$$

where $g_1$ and $g_2$ are reduced-shear components. For two resolved images $i$ and $j$ of the same background source, the image-to-image transformation has the local form

$$
T_{ij}
=
A(\mathbf{x}_j)^{-1}A(\mathbf{x}_i).
$$

This transformation constrains local reduced shear and relative convergence near the observed images. It does not by itself determine a unique global mass map in regions not sampled by the light bundles. Cluster-scale dark-matter maps therefore require an explicit inference ledger: which features are forced by local image transformations, which depend on feature matching, and which enter through lens-model priors such as light-traces-mass assumptions, thin-lens geometry, profile smoothness, line-of-sight compression, or interpolation across data-poor regions.

For $\mathbb{A}\mathbb{A}\mathbb{A}$, this does not weaken lensing as a recovery target. It sharpens the target. A neutral-assembly or medium-response explanation must recover the local lensing data first, then survive the global model comparison without hiding mass in unconstrained regions or changing assumptions per cluster. If a dark-sector claim survives only through model freedom away from the multiple-image constraints, it remains an inference artifact candidate rather than a closed substrate claim.

## Candidate Substrates

### Candidate A — Neutral Assembly Populations

**Definition.** Neutral tri-binary assemblies that lack exposed charged polar sites in their axial layers. The minimal examples are:

- **Neutrino-class assemblies:** Pro-tri-binary cores with balanced axial layers ($3P,3E$). These are the SM neutrinos themselves; their masses ($\sum m_\nu < 0.12$ eV from cosmological bounds) are too small to account for the full $\Omega_{\mathrm{DM}}$, but they contribute to the hot dark-matter fraction and to $N_{\mathrm{eff}}$.

- **Heavier neutral assemblies (hypothetical):** Tri-binary cores carrying axial patterns that are globally neutral and whose internal dynamics suppress electromagnetic coupling below detection thresholds. In $\mathbb{A}\mathbb{A}\mathbb{A}$ these would be assemblies whose axial layers cancel in both net charge and oscillating dipole moment, analogous to the neutrino's balanced axial layer but realized on a heavier core (e.g., a bi-binary or uni-binary core with an appropriately locked axial layer, or a multi-core composite). The mass scale is set by the core's internal binding energy, shielding, and medium-dressed response to the Noether Sea.

- **Primordial Noether-core defects:** Dense, self-gravitating clusters of maximally contracted tri-binaries produced in the high-energy epoch—analogous to primordial black holes in standard cosmology but with internal Planck-core structure replacing singular interiors. Their mass spectrum depends on formation-epoch dynamics.

**Behavior.** These assemblies are pressureless at late times (kinetic energy $\ll$ rest energy), cluster gravitationally, and are collisionless on galactic scales because their interaction cross-section with baryonic and electromagnetic assemblies is negligible (no exposed charge → no long-range dipole coupling). They therefore reproduce the canonical CDM clustering phenomenology: hierarchical structure formation, flat rotation curves from halo profiles, and the correct matter-loading signature in the CMB.

In a cluster-merger interpretation, neutral assemblies remain collisionless while baryonic gas assemblies decelerate electromagnetically, yielding natural separation between gravitating and X-ray-bright components.

### Candidate B — Noether-Sea Medium Response

**Definition.** Non-linear elastic or dispersive response of the Noether Sea itself under low-acceleration or low-density-gradient conditions. In regions where the effective gravitational acceleration falls below a characteristic scale $a_0$, the medium's compliance (inverse stiffness) may change, altering the effective force law.

**Mechanism sketch.** Each Noether-Sea tri-binary has a minimum restoring-force threshold set by the outer-binary binding. Below the corresponding acceleration scale, the medium deforms more easily per unit stress—the effective $G$ increases with decreasing acceleration. This is structurally analogous to MOND ($\mu(a/a_0)\,a = a_N$) but derived from assembly elasticity rather than postulated. In the corrected master-law picture, part of this response can be understood as a constitutive shift in how the medium organizes Jacobian-weighted delayed flux under low-strain conditions: the same source population can produce a different received effective pull when branch geometry and local contraction state change. The transition function $\mu$ would then emerge from the outer-binary response curve as a function of the local strain rate $\nabla\Phi / a_0$.

**Characteristic scale.** The MOND acceleration $a_0 \approx 1.2 \times 10^{-10}\;\mathrm{m\,s}^{-2}$ is suggestively close to $c H_0 / (2\pi)$. In $\mathbb{A}\mathbb{A}\mathbb{A}$, this coincidence could reflect a connection between the outer-binary expansion/contraction timescale (set by the cosmological evolution of the Noether Sea) and the local stiffness threshold. This is a mapping target, not a derived result.

**Limitations.** A pure medium-response account faces well-documented difficulties:
- Reproducing cluster-scale lensing/gas centroid separation without a collisionless component.
- Matching acoustic-peak matter loading in pre-decoupling dynamics.
- Producing the correct large-scale transfer-function shape in $P(k)$.

These difficulties motivate retaining Candidate A as the primary dark-matter substrate, with Candidate B contributing corrections.

### Candidate C — Hybrid (Working Baseline)

**Definition.** Neutral assemblies carry the dominant non-baryonic gravitating mass ($\Omega_{\mathrm{DM}} \sim 0.25$), while Noether-Sea medium response provides scale-dependent corrections that modify effective profiles in low-acceleration environments.

**Rationale.** This hybrid is the working baseline because:

- Neutral assemblies handle the heavy lifting: CMB matter loading, large-scale power spectrum, Bullet Cluster collisionless behavior, and BBN consistency ($\Omega_b$ remains small).
- Medium response can address observed tensions at galaxy scale—the diversity of rotation-curve shapes, the radial-acceleration relation (RAR) tightness, and possible deviations from pure NFW profiles—without introducing additional free parameters per galaxy.
- The two contributions arise from the same ontological substrate (tri-binary assemblies in Euclidean void with absolute time) and are coupled: neutral assemblies compress the Sea, which in turn responds non-linearly, feeding back on the effective potential.
- If residual discrepancies concentrate in regions of strong Noether-Sea contraction or steepening contraction gradient, especially toward galactic centers and SMBH environments, that pattern would be naturally suggestive of medium-response contributions rather than of an entirely separate particulate sector.

### Why Hybrid Is Required (Closure Summary)

| Construction | Main strength | Main failure risk |
|:---|:---|:---|
| Pure neutral-assembly | Handles CMB loading, BAO/$P(k)$ shape, and cluster collisionless behavior | Can underperform on low-acceleration galaxy phenomenology without added response channels |
| Pure medium-response | Captures MOND-like galaxy-scale behavior naturally | Struggles with Bullet-Cluster offsets and full CMB matter-loading closure |
| Hybrid baseline | Combines cosmology-scale closure with galaxy-scale flexibility | Requires constitutive calibration discipline to avoid over-parameterized tuning |

**Coupled equations (schematic).** Let $\rho_A(\mathbf{x},t)$ denote the neutral-assembly density and $\rho_{\text{core}}(\mathbf{x},t)$ the Noether-core density. In the Newtonian limit, the effective Poisson equation becomes:

$$
\nabla^2 \Phi_{\mathrm{eff}} = 4\pi G_{\mathrm{eff}}(\nabla\Phi,\rho_{\text{core}},n)\,\bigl(\rho_b + \rho_A + \delta\rho_{\text{core}}^{(\mathrm{pert})}\bigr),
$$

where $\rho_b$ is baryonic density, $\delta\rho_{\text{core}}^{(\mathrm{pert})}$ is the perturbative Sea response above its cosmological mean, and $G_{\mathrm{eff}}$ carries the medium-response modification. In the high-acceleration limit ($|\nabla\Phi| \gg a_0$), $G_{\mathrm{eff}} \to G_N$ and $\delta\rho_{\text{core}}^{(\mathrm{pert})} \to 0$; in the low-acceleration limit, $G_{\mathrm{eff}}$ stiffens and $\delta\rho_{\text{core}}^{(\mathrm{pert})}$ may contribute an effective "phantom" density that mimics additional dark matter.

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

In $\mathbb{A}\mathbb{A}\mathbb{A}$ cosmology, supermassive black holes (SMBHs) are recycling furnaces: baryonic and dark-sector assemblies fall in, are processed through the high-energy interior (inner tri-binary regime, $v > c_f$), and may later re-emerge through several release channels in altered assembly configurations. Jets and radiative outflows remain plausible observer-level manifestations, but they are not the only allowed release morphology. This cycle has implications for the dark sector:

- **Neutral-assembly processing:** If neutral assemblies accrete onto SMBHs, they contribute to the energy budget available for outward release. Re-emitted content may include photons (coaxial contra-rotating pro/anti planar-pair modes), neutrinos, recycled neutral assemblies, or initially dark-sector modes that later convert into visible channels.
- **Dark-sector mass evolution:** Unlike pure $\Lambda\mathrm{CDM}$ where dark matter is strictly conserved and collisionless, $\mathbb{A}\mathbb{A}\mathbb{A}$ permits slow conversion between dark and visible sectors through SMBH processing. This conversion rate must be small enough to preserve $\Omega_{\mathrm{DM}}$ to within Planck-era constraints over cosmological timescales, which places an upper bound on the SMBH dark-matter accretion efficiency.
- **Observable signature (speculative):** If SMBH recycling converts neutral assemblies into electromagnetic-channel products at non-negligible rates, this could produce a correlation between SMBH mass and local dark-matter deficit. This is a mapping target for simulation, not an asserted observational deviation.

## Candidate Assembly Properties

### Mass Scale

The neutral-assembly mass is not a free parameter to be fitted post hoc; it must emerge from the assembly's internal energy ledger, shielding factor, and medium-dressed response to the Noether Sea. This is an inertial and gravitational response map, not ordinary dissipative drag. Candidate mass ranges, mapped to observational constraints:

- $m \sim$ eV: warm dark matter; suppresses small-scale structure.
- $m \sim$ keV–GeV: canonical cold dark matter window.
- $m \sim$ GeV–TeV: WIMP-like regime.
- $m \gg$ TeV: superheavy; must be produced non-thermally (e.g., gravitational production or SMBH-related formation in early epochs).

The $\mathbb{A}\mathbb{A}\mathbb{A}$ framework does not currently predict a unique mass; deriving the mass spectrum from first-principles tri-binary binding energies and formation rates is a high-priority simulation target.

### Interaction Cross-Sections

Neutral assemblies interact with each other and with baryonic matter only through:

- **Gravitational coupling** (Noether-Sea compression): always present; sets halo profiles.
- **Residual short-range coupling:** If the neutral assembly has any non-zero higher-multipole moment (e.g., a quadrupole from internal binary precession), there is a short-range van-der-Waals-like interaction scaling as $r^{-7}$ or steeper. The self-interaction sector can then carry nontrivial velocity dependence.

### Stability

The neutral-assembly candidate must be cosmologically stable: lifetime $\tau \gg t_0 \approx 13.8$ Gyr. In $\mathbb{A}\mathbb{A}\mathbb{A}$, stability follows from the same topological arguments that stabilize the proton: the assembly occupies a deep attractor basin in tri-binary configuration space, and all dissociation channels either violate charge/polarity conservation or require energy input exceeding the cosmological temperature.

## Cosmology Integration

### Pre-Decoupling ($z \gtrsim 1100$)

Neutral assemblies contribute to the total matter density:

$$
\Omega_m = \Omega_b + \Omega_A, \quad \Omega_A \approx 0.25.
$$

Their gravitational effect on photon-baryon oscillations produces the characteristic signature in the [CMB](./CMB.md) power spectrum: suppression of odd peaks (baryon loading) with the overall amplitude and peak-height ratios set by $\Omega_A/\Omega_b$.

### Post-Decoupling Growth

Matter perturbations grow as $\delta \propto a$ in the matter-dominated era. The $\mathbb{A}\mathbb{A}\mathbb{A}$ growth equation in the Newtonian limit reads:

$$
\ddot{\delta}_A + 2H\dot{\delta}_A = 4\pi G_{\mathrm{eff}}\,\rho_m\,\delta_m,
$$

where $\rho_m = \rho_b + \rho_A$ and $G_{\mathrm{eff}}$ may carry scale-dependent corrections from the medium response. In the high-acceleration (linear) regime, $G_{\mathrm{eff}} \to G_N$ and standard CDM growth is recovered. Deviations from $\Lambda\mathrm{CDM}$ growth appear only when $|\nabla\Phi|/a_0 \lesssim 1$, which on cosmological scales ($k < 0.01\;h\,\mathrm{Mpc}^{-1}$) may be relevant at low redshift and could contribute to resolving the $S_8$ tension.

### BAO and Matter Power Spectrum

The matter power spectrum $P(k)$ encodes the transfer function through matter-radiation equality and the BAO wiggles imprinted at decoupling. The neutral-assembly contribution sets the shape of $P(k)$ on scales $k > k_{\mathrm{eq}}$, where $k_{\mathrm{eq}} \propto \Omega_m h^2$.

### $H_0$ and $S_8$ Tensions

The $\mathbb{A}\mathbb{A}\mathbb{A}$ hybrid baseline offers two potential handles on current cosmological tensions:

- **$H_0$ tension:** If neutral-assembly properties (e.g., a non-zero but small self-interaction or a late-time dissociation channel) modify distance-ladder or sound-horizon inference differently from pure CDM, the inferred $H_0$ can shift through one mechanism family.
- **$S_8$ tension:** Scale-dependent medium response can suppress late-time growth at $k \sim 0.1$–$1\;h\,\mathrm{Mpc}^{-1}$, lowering $\sigma_8$ relative to early-time inference while leaving pre-decoupling structure largely unchanged.

## Growth-Module Interface

In the modular cosmology architecture, this chapter connects to other modules through:

- **Input to [CMB.md](./CMB.md):** $\Omega_A h^2$, neutral-assembly equation of state $w_A(z)$ (expected: $w_A = 0$ for CDM-like behavior), and any $\Delta N_{\mathrm{eff}}$ contribution.
- **Input to [structure-formation.md](./structure-formation.md):** $G_{\mathrm{eff}}(a,k)$ from medium-response constitutive relation; neutral-assembly self-interaction cross-section $\sigma(v)/m$.
- **Input from [expansion-mechanism.md](./expansion-mechanism.md):** $H(z)$ and $\Omega_m(z)$ for growth-equation integration.
- **Input from [BBN-constraints.md](./BBN-constraints.md):** $N_{\mathrm{eff}}$ bound constraining allowed neutral-assembly species at MeV temperatures.

All interfaces use the same absolute-time / Euclidean-space substrate and the same Noether-Sea state variables, ensuring ontological consistency across modules. The cosmology-level framing for those shared interfaces lives in [Cosmology Ontology](./cosmology-ontology.md).

## Summary

Dark-matter phenomenology in the architrino assembly architecture is attributed to a hybrid of two mechanisms arising from the same tri-binary substrate:

- **Neutral assemblies** (Candidate A): electromagnetically transparent tri-binary configurations that cluster gravitationally, reproducing CDM-like behavior at cluster and cosmological scales.
- **Noether-Sea medium response** (Candidate B): non-linear elastic corrections to effective gravity at low accelerations, providing scale-dependent modifications relevant to galaxy-scale phenomenology.

The working baseline is the hybrid (Candidate C), with neutral assemblies carrying the dominant mass fraction and medium response supplying corrections. Deriving the neutral-assembly mass spectrum, interaction cross-sections, and medium constitutive relations from the master equation is the critical open program.
