# Cosmology

## Cosmology Ontology

This chapter states the basic cosmological ontology of $\mathbb{A}\mathbb{A}\mathbb{A}$ before the topic branches split into expansion, CMB, BBN, and structure-formation details. Its purpose is to make clear what is fundamental in the cosmology stack, what is effective observer-level bookkeeping, and how the fixed Euclidean container is related to evolving medium state.

The opening sections define the absolute-frame picture and the document set that grows out of it. Later sections record the working classification axes, interface variables, and boundary conditions against nearby cosmological families.

### Cosmology in the Absolute Frame

1. **Expansion Ontology**: the universe is a fixed Euclidean container with an evolving medium; the container itself does not expand.
2. **Primordial Language**: "primordial" denotes an early effective observer-era regime in $\tau_c$ chronology, not a required literal one-time ontic origin event.

### $\mathbb{A}\mathbb{A}\mathbb{A}$ Cosmology: Overview

Cosmology is expressed in two linked descriptions:

1. **Absolute description ($\mathbb{U}_{\text{now}}$ universe-state perspective)**
- Fixed Euclidean coordinates $(x,y,z)$ and absolute time $t$
- Full microstate accounting of assemblies and medium state
- No metric expansion of the void

2. **Effective observer description**
- Emergent comoving coordinates and cosmic-time approximation
- FRW-like expansion, redshift, and metric-like behavior as effective outputs

All cosmological observables are computed from absolute-state evolution and then projected into effective observer variables for comparison with data products.

### Cosmology Document Set

- [expansion-mechanism.md](../../../../markdown/aaa/cosmology/expansion-mechanism.md): canonical expansion and redshift mapping in fixed void ontology.
- [inflation-model.md](../../../../markdown/aaa/cosmology/inflation-model.md): emergent early rapid-expansion model and conceptual inflation framing.
- [BBN-constraints.md](../../../../markdown/aaa/cosmology/BBN-constraints.md): light-element abundance constraints under emergent $H(t)$.
- [CMB.md](../../../../markdown/aaa/cosmology/CMB.md): integrated CMB origin narrative plus quantitative prediction mapping in the same ontology.
- [structure-formation.md](../../../../markdown/aaa/cosmology/structure-formation.md): growth dynamics and large-scale structure tests.
- [hubble-s8-tensions.md](../../../../markdown/aaa/cosmology/hubble-s8-tensions.md): joint treatment of late-time cosmology tensions.
- [dark-matter.md](../../../../markdown/aaa/cosmology/dark-matter.md): dark-sector mechanism mapping in a unified medium-and-assembly frame.
- [dark-energy.md](../../../../markdown/aaa/cosmology/dark-energy.md): acceleration mechanism mapping in the same fixed-void ontology.

### Historical Lineage (Conceptual, Not Identical)

- **QSSC-like motif:** eternal background plus recurring creation/reprocessing channels.
- **Cyclical-like motif:** repeated effective epochs without requiring one absolute beginning event.
- **Timescape-like motif:** environment-conditioned clock calibration affecting inferred expansion history.
- **Static-family caution:** retain only clock/medium insight channels; exclude generic tired-light scattering-loss mechanisms.

### Classification Axes ($\mathbb{A}\mathbb{A}\mathbb{A}$ Position)

| Axis | $\mathbb{A}\mathbb{A}\mathbb{A}$ Position |
|---|---|
| Gravity driver | Medium-response gravity from Noether-Sea state, with GR-like behavior as an effective limit |
| Expansion status | Fixed Euclidean container; expansion variables are effective medium-state summaries |
| Universe age stance | Eternal background with no mandatory one-time global origin event |
| Redshift mechanism | Medium evolution plus clock-rate comparison and transport contributions |
| CMB origin mode | Source + transport + thermalization + decoupling in one medium-and-assembly ontology |
| Nucleosynthesis mode | Recurring local reactor-style channels (SMBH-linked) mapped to observer-level primordial diagnostics |
| Homogeneity stance | Statistical large-scale homogeneity from repeated local processes with allowed local inhomogeneity |
| Growth mode | Coupled medium-and-assembly instability with scale/epoch-dependent effective response |

### Working Principle

Cosmological observables (e.g., $H(z)$, BAO, CMB peaks, lensing, growth proxies) must be reproducible from absolute-frame medium dynamics, with GR/$\Lambda\mathrm{CDM}$ behavior appearing as effective limits where applicable.

For development and comparison, expansion, CMB transfer, BBN yields, and growth/lensing are treated as separable observational modules with explicit interface variables, while remaining one ontology.

### Observation-First Component Abstraction

This framework does not treat cosmology as "$\mathbb{A}\mathbb{A}\mathbb{A}$ vs $\Lambda\mathrm{CDM}$" at the bundled-model level. Instead, first abstract $\Lambda\mathrm{CDM}$ into separable observational components with no interpretational linkage baked in:

- background expansion component ($H(z)$ and distance-redshift summaries),
- recombination/CMB transfer component (TT/TE/EE, damping, lensing imprint),
- primordial-yield component (BBN abundance outputs),
- structure-growth component (clustering, shear, lensing growth summaries),
- local-calibration component (distance ladder and environment-conditioned inference).

This decomposition prevents hidden dependency loops where one assumed foundation silently fixes another observable domain.

### Inference-Dependency Ledger

The standard cosmological fit package obtains much of its strength by combining observables inside a common Friedmann-Lemaître-Robertson-Walker limit. That limit is useful as an effective comparison layer, but it is not an ontological premise of this framework. Each observational module must therefore state which parts of its inference require large-scale homogeneity, isotropy, standard-candle or standard-ruler calibration, CMB-frame correction, and the Friedmann energy-density sum rule.

The practical rule is to separate measurement from interpretation. Supernova magnitudes, BAO angles, redshift catalogues, CMB spectra, and weak-lensing maps are retained as observational data products. The inferred variables $a(t)$, $H(z)$, $\Omega_m$, $\Omega_\Lambda$, and $w(z)$ are effective reconstruction variables whose meaning depends on the model used to convert those data products into a background history. A successful $\mathbb{A}\mathbb{A}\mathbb{A}$ cosmology must reproduce the data products or explain controlled residuals, not merely refit the inherited parameters after changing their ontology.

Directional tests are part of this ledger. If a data reduction assumes a cosmic rest frame, a kinematic CMB dipole correction, or an all-sky isotropic background, the same reduction must expose the residual dipole, quadrupole, and environment dependence left after the correction. Those residuals are not automatically evidence against the model; they are diagnostic handles for the Noether-Sea flow, density, delay, and clock-rate fields.

A scale-neutral homogeneity check should also be part of the shared ledger. For a large comparison window $W\subset\Sigma_t$ with resolved tracer index set $I_W(t)$ and $N_W=\lvert I_W(t)\rvert$, define the root-mean-square separation scale
$$
L_W^2(t)=\frac{2}{N_W(N_W-1)}
\sum_{i<j\in I_W(t)}
\|\mathbf{x}_i(t)-\mathbf{x}_j(t)\|^2.
$$
The corresponding dimensionless pair-separation distribution is
$$
\widehat{\mu}_{W,t}(u)=
\frac{2}{N_W(N_W-1)}
\sum_{i<j\in I_W(t)}
\delta\!\left(
u-\frac{\|\mathbf{x}_i(t)-\mathbf{x}_j(t)\|}{L_W(t)}
\right).
$$
For a declared family of same-scale windows $\mathcal{W}_L(t)$ and a declared distribution distance $d$, a candidate medium-state record should expose
$$
\mathcal{R}_{\mathrm{hom}}(\theta_{\mathrm{sea}};L,t)
=
\sup_{W_a,W_b\in\mathcal{W}_L(t)}
d\!\left(\widehat{\mu}_{W_a,t},\widehat{\mu}_{W_b,t}\right).
$$
Large-scale homogeneity is accepted only when this residual remains within the declared tolerance while the same $\theta_{\mathrm{sea}}$ also passes the expansion, CMB, BBN, growth, lensing, and calibration gates. This is a scale-neutral diagnostic over observer-facing data products, not an import of a shape-first cosmology or a replacement for the fixed Euclidean void.

The same rule applies across modules. A promoted cosmology claim must preserve one shared medium-state record $\theta_{\mathrm{sea}}$ through expansion, CMB transfer, BBN, growth, lensing, and local calibration. If those modules can be fit only by replacing the state record or projection map per observable family, the result is benchmark fitting rather than cosmology closure. The current dark-energy branch states this as a shared residual gate in [dark-energy.md](../../../../markdown/aaa/cosmology/dark-energy.md#inference-dependency-and-calibration-gates).

### Interface Variables (Predicted API Surface)

Each observational component exposes explicit interface variables for cross-theory mapping:

- Expansion interface: effective $a(t)$/$H(z)$ history and redshift mapping variables.
- CMB interface: mode-seeding inputs, transfer behavior, and TT/TE/EE outputs.
- BBN interface: thermal/reaction history inputs and light-element yield outputs.
- Growth interface: matter-loading and coupling inputs with late-time amplitude/shape outputs.
- Calibration interface: local-environment terms that map observer pipelines to inferred cosmological parameters.
- Anisotropy interface: CMB-frame correction, matter-dipole residuals, supernova and BAO directional residuals, and local bulk-flow indicators.

### $\mathbb{A}\mathbb{A}\mathbb{A}$ Mapping Stance

$\mathbb{A}\mathbb{A}\mathbb{A}$ maps to each observation component directly through these interfaces. Agreement or divergence from $\Lambda\mathrm{CDM}$ is evaluated per component, not as all-or-nothing acceptance of a single interpretational package.

Historical correspondences (steady-state, quasi-steady-state, bounce/cyclic, SMBH-centered recycling) are tracked as lineage context, while microphysical commitments remain specific to $\mathbb{A}\mathbb{A}\mathbb{A}$.

$\mathbb{A}\mathbb{A}\mathbb{A}$ may borrow explanatory motifs from QSSC/cyclical/inhomogeneous traditions, but it does not import external ontologies by default.

#### Boundary Conditions Against Nearby Families

- No hypersphere geometry import as a default cosmology substrate.
- No electromagnetic-force-dominant replacement of gravity at cosmological baseline.
- No generic tired-light scattering-loss redshift mechanisms in core interpretation.
- No split ontology where background expansion and growth are treated as unrelated physics.

### Origin and Global History Stance

- The Euclidean void and absolute time are treated as eternal background structure, not products of a one-time geometric origin event.
- Large-scale cosmological history is modeled as long-lived medium-and-assembly evolution with recycling channels, including SMBH-centered processing.
- "Big Bang timeline" language is retained as an effective observational chronology, while ontology remains fixed-void plus evolving Noether-Sea state.

### Galaxy-Local Cosmology Paradigm

- Processes often presented as single global events are modeled as distributed, parallel, galaxy-local recycling dynamics.
- SMBH-centered high-curvature processing is treated as a persistent cosmological engine class rather than a one-time initial-condition generator.
- Effective cosmological chronology is therefore a stitched observational map of many local histories, not one literal global launch event.
- Large-scale homogeneity can be treated as a statistical outcome of repeated local processes governed by the same microphysics, while permitting local fluctuations and anisotropic environments.
- Large-scale organization can be treated as mostly scale-invariant in architecture while still allowing finite-scale departures from statistical uniformity.

### Time Notions (Operational)

- **Absolute Time ($t$):** global linear index for full-state evolution.
- **Cosmic Time ($\tau_c$):** reconstructed observer-level clocking used for effective observational chronology.
- **Dynamics:** expansion is encoded as medium-network evolution in $t$, then read out as observer-level history in $\tau_c$.

## Expansion Mechanism

This chapter explains how cosmological expansion language is translated into a fixed-void ontology. Its purpose is to replace geometric container expansion with medium evolution, clock-rate comparison, and effective scale-factor bookkeeping while preserving contact with the standard observational vocabulary. It is the main cosmology bridge from [Cosmology Ontology](../../../../markdown/aaa/cosmology/cosmology-ontology.md) to [CMB](../../../../markdown/aaa/cosmology/CMB.md), [Structure Formation](../../../../markdown/aaa/cosmology/structure-formation.md), and [Dark Energy](../../../../markdown/aaa/cosmology/dark-energy.md).

The sections below move from the core idea to redshift, photon propagation, dark-energy language, tension interfaces, and the effective Friedmann comparison layer.

### Core Idea

The [Euclidean void](../../../../markdown/aaa/foundations/euclidean-void.md) does not expand. What evolves is the Noether Sea and the state of assemblies moving through it.

### Effective Scale Factor in a Fixed Void

Define an effective scale history from medium structure:

$$
a(t)\propto \frac{\langle L_{\text{core}}(t)\rangle}{\langle L_{\text{core}}(t_{\text{ref}})\rangle},
$$

where $L_{\text{core}}$ is a representative assembly-separation scale.

This $a(t)$ is a summary of medium evolution inside fixed $(x,y,z)$, not geometric stretching of the container.

Equivalent bookkeeping choices can be used in the same ontology:

$$
a(t)\ \leftrightarrow\ \langle R_{\text{core}}(t)\rangle
\quad\text{or}\quad
a(t)\propto \rho_{\text{sea}}(t)^{-1/3}.
$$

These are effective parameterizations of medium state, not independent geometric claims.

### Clock-Rate Redshift Interpretation

Cosmological redshift is treated as cumulative propagation through a changing medium plus clock-rate mismatch between emitter and observer environments.

Use the proper-time map from [Proper Time and Time Dilation](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md):

$$
\frac{d\tau}{dt}=F\!\left(\mathbf{v},\rho_{\text{core}}(\mathbf{x},t),n(\mathbf{x},t),\chi_{\text{sea}}(\mathbf{x},t),\Phi_{\text{eff}},\text{clock geometry}\right).
$$

A photon that traverses regions with different $\rho_{\text{core}}(\mathbf{x},t)$, $n(\mathbf{x},t)$, $\chi_{\text{sea}}(\mathbf{x},t)$, and $\Phi_{\text{eff}}$ is read by clocks with different local rates. The observed $z$ is then an emergent comparison of those rates along the path history.

Operationally:

$$
1+z = \frac{\nu_e}{\nu_o}
= \frac{(d\tau/dt)_o}{(d\tau/dt)_e},
$$

so redshift is treated as path-integrated medium evolution plus endpoint clock-rate comparison.

For modeling and diagnostics, separate at least three effective channels:

- endpoint clock-rate comparison,
- source/observer relative-motion (Doppler-like) contribution,
- propagation contribution from traversed medium state and gradients.

### Directional Residuals in the Redshift Map

An effective redshift-distance relation cannot be accepted only as an all-sky average. The same data must also be decomposed by direction and environment:

$$
\Delta O_X(z,\hat{\mathbf{n}})
=
O_X^{\mathrm{obs}}(z,\hat{\mathbf{n}})
-
O_X^{\mathrm{iso}}(z)
=
O_{X,0}(z)
+
\mathbf{O}_{X,1}(z)\cdot\hat{\mathbf{n}}
+
O_{X,2}(z,\hat{\mathbf{n}})
+\cdots,
$$

where $X$ may denote supernova distance modulus, BAO scale, CMB-frame correction, or another expansion observable. The monopole $O_{X,0}$ records the isotropic fit offset, $\mathbf{O}_{X,1}$ records the dipole, and higher terms record quadrupole and mask-dependent structure.

The Friedmann-like bridge below is usable only after these directional residuals are either within survey tolerance or derived from the same Noether-Sea variables that determine the clock-rate and transport maps. A residual dipole should not be absorbed silently into $H(z)$, $w(z)$, or calibration constants.

### Photon-Propagation Contribution

Beyond endpoint clock comparison, the same transport picture can include path-dependent photon energy evolution in medium transit ("redshift toll").

In this reading, effective redshift accumulation may depend on photon energy, traversed medium state, and path environment, so redshift is modeled as a transport kernel rather than a single universal linear rule.

Line-of-sight medium flow and local contraction/expansion regions can, in principle, contribute signed shifts, so local blueward and redward biases should be treated within one transport kernel rather than as disconnected exceptions.

Propagation channels must preserve image sharpness and $(1+z)$ time-dilation consistency; models requiring generic scattering-loss redshift are excluded.

### Dissipation and Rescaling Picture

Apparent expansion is interpreted as relaxation of medium state:

- high-curvature source regions inject energy into outbound assembly flows,
- lower-density regions evolve toward larger characteristic assembly scales and lower effective temperatures,
- observer-level expansion summaries track this rescaling history.

### Dark-Energy Language in This Frame

The parameter

$$
w=\frac{p}{\rho}
$$

remains useful as an effective descriptor, but its physical content is medium stress and relaxation state, not an independent vacuum-fluid ontology.

### Hubble-Tension Link

Early-inferred and local-inferred expansion rates probe different medium states:

- Early probes sample a more uniform, less-relaxed sea history.
- Local probes sample pockets that are further along relaxation and dissipation trajectories.

So the $H_0$ split is interpreted as state-dependent inference from one ontology, not two incompatible universes.

In this framing, $H_0$ is not expected to be strictly universal at all environments; local scatter is read as part of medium-state dependence.

Quasar redshift distributions are interpreted in the same transport-and-source framework, separating source-population evolution from path-history accumulation within one model.

### Timescape-Style Bridge, $\mathbb{A}\mathbb{A}\mathbb{A}$ Mechanism

Conceptually, this layer is adjacent to inhomogeneous/clock-calibration cosmologies, but the implementation here remains one explicit medium-state model:

- clock-rate mapping is computed from shared Noether-Sea state variables,
- expansion-like inference shifts are environment-conditioned readouts, not ontology splits,
- local-ladder versus early-time differences are modeled as distinct sampling of one evolving medium.

### Effective Friedmann Bridge (Comparison Layer)

For data-comparison work, one may retain a Friedmann-like summary:

$$
H^2 = \frac{8\pi G_{\text{eff}}}{3}\left(\rho_m+\rho_r+\rho_{\text{sea}}\right)-\frac{k_{\text{eff}}}{a^2},
$$

with $a(t)$ interpreted as a medium-state parameter and $G_{\text{eff}},k_{\text{eff}}$ as effective summaries of assembly-medium response.

This equation is a comparison layer for the homogeneous and isotropic limit. It does not by itself justify the assumption that supernovae, BAO, CMB distances, and local-ladder calibrations all share one isotropic background. That shared background must be recovered as a limit of the medium-state model or replaced by an explicitly directional effective map.

### Expansion-Module Interface

In the modular cosmology map, this page provides:

- ontic inputs: medium density/stress state, clock-rate map, and transport environment,
- effective outputs: inferred $a(t)$, $H(z)$, and redshift-distance behavior,
- shared bridge variables used by [dark-energy.md](../../../../markdown/aaa/cosmology/dark-energy.md), [hubble-s8-tensions.md](../../../../markdown/aaa/cosmology/hubble-s8-tensions.md), and [CMB.md](../../../../markdown/aaa/cosmology/CMB.md).

## Inflation Model

This chapter records the current $\mathbb{A}\mathbb{A}\mathbb{A}$ reinterpretation of inflation-like behavior as a high-curvature alignment regime rather than as a separate inflaton ontology. Its purpose is to keep local-process, recycling, and strong-field framing explicit before any full quantitative closure is claimed. It sits between [Cosmology Ontology](../../../../markdown/aaa/cosmology/cosmology-ontology.md), [Expansion Mechanism](../../../../markdown/aaa/cosmology/expansion-mechanism.md), and the strong-field pages [Black Holes](../../../../markdown/aaa/spacetime/black-holes.md) and [Mapping the Planck Scale to the Tri-Binary Geometry](../../../../markdown/aaa/theory-bridges/planck-scale-tri-binary-alignment.md).

### Core Idea

The early rapid-expansion phase is modeled as an emergent high-curvature regime of tri-binary dynamics, not as a fundamental standalone inflaton ontology.

### Local-Process Commitment

Inflation-like behavior is treated as a local or regional process (especially in SMBH-core and jet-linked high-curvature environments), not as a one-time global expansion of the Euclidean container.

Under long-lived recycling assumptions, this implies a continuously operating population of inflation-like regions rather than a unique early-universe episode. The CMB-facing chronology mapping for that claim is summarized in [CMB](../../../../markdown/aaa/cosmology/CMB.md).

### Cyclical vs Recycling Clarification

Inflation-like segments in $\mathbb{A}\mathbb{A}\mathbb{A}$ are recurring local release-relaxation episodes, not mandatory global cycle boundaries.

This keeps conceptual overlap with cyclical-universe intuitions while preserving the model's local-process commitment:

- recurrence comes from persistent SMBH-core source classes,
- chronology remains an observer-level map of many local histories,
- no single global reset event is required.

### SMBH-Core Mechanism ($\mathbb{A}\mathbb{A}\mathbb{A}$)

1. Inner assemblies enter a high-energy self-hit domain near maximal curvature.
2. Energy transfer into medium-scale layers drives rapid effective expansion of assembly spacing.
3. The system relaxes into a slower expansion regime with residual perturbations.

In the broader recycling picture, SMBH-core dynamics provide the persistent source architecture:

- high-curvature interior dynamics load energy into middle-layer/horizon channels,
- outbound disturbances seed expansion-like phases in the surrounding medium,
- inflation-like behavior is therefore a regime of core-driven release and relaxation, not a separate scalar field ontology.

### Effective Inflaton Reinterpretation

When comparison language requires an "inflaton-like" variable, use a coarse-grained descriptor of self-hit state occupancy and transition rates near the $v\approx c_f$ boundary, rather than a new fundamental scalar field.

### Vacuum-Energy Caution

Standard slow-roll inflation is valuable as a phenomenological comparison because it explains why nearly Gaussian, nearly scale-invariant perturbations are such a natural target. Its stress-energy source, however, is usually written as vacuum-like scalar-field energy that gravitates during inflation and then disappears into reheating. That move inherits the cosmological-constant problem unless a separate coupling rule explains why vacuum-like energy can dominate one epoch and fail to dominate every later epoch.

In this framework, inflation-like behavior must therefore be expressed as an exposed high-curvature transfer channel rather than as unconstrained vacuum energy. The accepted variable is not a fundamental scalar-field substance; it is a record of self-hit occupancy, alignment-boundary release, medium loading, and subsequent thermalization. A valid closure must conserve the energy and provenance ledger across the release:

$$
\Delta \rho_{\mathrm{exposed}}
=
\Delta \rho_{\mathrm{medium}}
+
\Delta \rho_{\mathrm{radiation}}
+
\Delta \rho_{\mathrm{locked}},
$$

with each term tied to the same Noether-Sea response variables used by the CMB, BBN, and expansion modules. This preserves the perturbation-success target of inflationary models while rejecting a free "use it, then lose it" vacuum-energy channel.

### Scalar and Tensor Benchmark

Inflationary comparison remains useful only where it supplies disciplined observables. The relevant targets are not an inflaton field or a global expansion of the Euclidean void, but the scalar amplitude, scalar tilt, optional running, Gaussianity, and tensor upper bound consumed by the CMB module.

For a candidate high-curvature release record $\theta$, require
$$
\left(A_s^{\theta},n_s^{\theta},\alpha_s^{\theta},r^{\theta}\right)
\to
\left(A_s^{\mathrm{obs}},n_s^{\mathrm{obs}},\alpha_s^{\mathrm{obs}},r_{\max}\right)
$$
within the declared observational tolerances, with
$$
r^{\theta}(k_*)\le r_{\max}.
$$

The scalar/tensor gate should be read as a closure burden on the high-curvature transfer channel. If $\mathbb{A}\mathbb{A}\mathbb{A}$ uses SMBH-core or horizon-interface dynamics to explain inflation-like behavior, those dynamics must supply the same near-Gaussian scalar spectrum and allowed tensor sector without retuning the CMB, BBN, and expansion interfaces separately.

Smoothness is a separate benchmark from scalar amplitude and tensor suppression. Inflationary language is often credited with explaining why the early effective record has low gravitational free-mode content, while generic strong-field collapse is expected to develop complicated anisotropic curvature. In this framework that pressure becomes a medium-history constraint, not an inflaton ontology. The high-curvature release channel must therefore deliver the CMB-facing smoothness residual defined in [CMB](../../../../markdown/aaa/cosmology/CMB.md) using the same Noether-Sea variables that supply $\left(A_s^{\theta},n_s^{\theta},\alpha_s^{\theta},r^{\theta}\right)$.

Eternal-inflation and landscape language add no ontology by themselves. They become useful only when they nominate data products that can be tested without assuming the multiverse interpretation. Two examples are the effective spatial-curvature channel and localized CMB residuals. For a candidate high-curvature release record $\theta$, define a comparison-only residual
$$
\mathcal{R}_{\mathrm{EI}}(\theta)
=
d_\Omega\!\left(\Omega_k^{\theta},\Omega_k^{\mathrm{obs}}\right)
+d_{\mathrm{loc}}\!\left(S_{PW}^{\theta},S_{PW}^{\mathrm{obs}}\right)
+d_{\mathrm{shared}}\!\left(\theta_{\mathrm{CMB}},\theta_{\mathrm{growth}}\right).
$$
Here $S_{PW}$ is the cross-map localized-feature statistic defined in [CMB](../../../../markdown/aaa/cosmology/CMB.md), and $d_{\mathrm{shared}}$ penalizes a fit that explains localized features or curvature by changing the cosmology state independently from the acoustic peaks, lensing, BAO, BBN, or structure-growth records. A positive localized feature, negative-curvature trend, or bubble-collision-style template would be an observational pressure to explain, not evidence that the external population picture has become $\mathbb{A}\mathbb{A}\mathbb{A}$ ontology.

### Pre-BBN Comparison Gate

Weakly coupled sectors proposed by external frameworks are useful here only as pre-BBN comparison branches. They may nominate a residual energy component, a lifetime, a free-streaming scale, a relativistic-species contribution, or a stochastic gravitational-wave background. They do not become added ontology merely because a formal model can hide them before light-element formation.

For a candidate branch record $\theta_X$ active before the BBN comparison window, retain only the observable projection
$$
\Pi_{\mathrm{preBBN}}(\theta_X)
=
\left(
\Omega_X(a),\;
w_X(a),\;
\tau_X,\;
\Delta N_{\text{eff}}^X,\;
\lambda_{\mathrm{fs}}^X,\;
\Omega_{\mathrm{GW}}^X(f)
\right),
$$
where $\Omega_X(a)$ and $w_X(a)$ summarize effective energy density and equation of state, $\tau_X$ is the decay or handoff timescale if the branch is transient, $\Delta N_{\text{eff}}^X$ is the relativistic-species contribution, $\lambda_{\mathrm{fs}}^X$ is the structure-growth free-streaming scale, and $\Omega_{\mathrm{GW}}^X(f)$ is the stochastic gravitational-wave energy-density spectrum when present. The branch is admissible only if the same $\theta_{\mathrm{sea}}$ used for the scalar/tensor, BBN, CMB, and growth records satisfies
$$
\mathcal{R}_{\mathrm{preBBN}}(\theta_X,\theta_{\mathrm{sea}})
=
\max\left(
\frac{\|\Delta\mathbf{Y}_{\mathrm{BBN}}^X\|}{\epsilon_{\mathrm{BBN}}},
\frac{\|\Delta C_\ell^X\|}{\epsilon_{\mathrm{CMB}}},
\frac{\|\Delta P^X(k,z)\|}{\epsilon_{\mathrm{growth}}},
\sup_f\frac{\Omega_{\mathrm{GW}}^X(f)}{\Omega_{\mathrm{GW}}^{\max}(f)}
\right)
\le 1.
$$
This gate preserves the observable pressure while rejecting the interpretation shortcut. A pre-BBN branch that disappears only by changing state variables between BBN, CMB, structure formation, and gravitational-wave comparisons is not hidden; it has split the cosmology record.

If $X$ is a compact-object branch, the projection must also record the mass function and release history rather than only an effective density:
$$
\Pi_{\mathrm{compact}}(\theta_X)
=
\left(
\psi_X(M),\;
f_X,\;
t_f(M),\;
\Gamma_{\mathrm{release}}^X(E,t),\;
\Delta\mathbf{x}_{\mathrm{ephem}}^X(t)
\right).
$$
Here $\psi_X(M)$ is the comparison mass function, $f_X$ is the dark-sector fraction in that branch, $t_f(M)$ is the inferred formation or release clock, $\Gamma_{\mathrm{release}}^X$ is any Hawking-like or native release spectrum, and $\Delta\mathbf{x}_{\mathrm{ephem}}^X$ is retained only for late-time local-detection consistency. These variables do not add compact-object ontology to the inflation module; they make explicit which observables a pre-BBN compact branch must carry into the BBN, CMB, growth, gravitational-wave, and local-detection ledgers.

### Planck-Alignment Boundary

Planck scale is treated as an alignment-horizon state of assemblies, not a minimal-length axiom.

- terminal alignment corresponds to the last stable lock before mode change,
- this boundary organizes transitions between pre-alignment high-curvature behavior and post-release medium evolution,
- inflation-language is mapped onto dynamics near and after this boundary.

### Effective Parameterization

Use an effective expansion history for comparison work:

$$
H^2(a) = H_0^2\left[\Omega_r a^{-4} + \Omega_m a^{-3} + \Omega_{\text{eff}}(a)\right],
$$

where $\Omega_{\text{eff}}(a)$ encodes the emergent high-curvature phase and its relaxation.

As a toy kinematic decomposition, one can also track the expansion-rate profile by assigning separate qualitative roles to the three nested branches:
$$
\dot{R}(t) = v_I(t) + c_f + v_O(t).
$$
Here the inner contribution $v_I(t)$ plays the role of a decaying high-curvature release term, the constant $c_f$ marks the transport/horizon channel, and the outer contribution $v_O(t)$ captures slower volumetric rebound. This is not a closed cosmological derivation, but it is a compact way to encode the intuition that inflation-like release, horizon-scale transport, and late-time expansion can all be read as different branches of the same tri-binary process.

### Expansion-Module Interface

In the modular cosmology map, this page contributes:

- ontic inputs: self-hit occupancy, alignment-boundary transitions, and core-to-medium energy transfer,
- effective outputs: inflation-like rapid expansion segments and perturbation-seeding summaries,
- bridge variables shared with [expansion-mechanism.md](../../../../markdown/aaa/cosmology/expansion-mechanism.md) and [CMB.md](../../../../markdown/aaa/cosmology/CMB.md).

### Coherent Reading

Inflation language in $\mathbb{A}\mathbb{A}\mathbb{A}$ is an effective description of high-curvature release-and-relaxation dynamics in the Noether Sea, not an added standalone scalar ontology.

## BBN Constraints

This chapter states how big-bang nucleosynthesis constraints are to be read inside a fixed-void ontology. Its purpose is not to rewrite nuclear reaction physics, but to reinterpret where and when the relevant thermal histories occur and how those histories are projected into the standard BBN observable language.

### Standard vs. $\mathbb{A}\mathbb{A}\mathbb{A}$ BBN

#### Standard Big Bang Nucleosynthesis

- **When:** 10 seconds to 20 minutes after $t=0$ (cosmic singularity).
- **Where:** Everywhere in the observable universe; a homogeneous, isotropic thermal bath.
- **Why:** Expansion cooling drives the universe through nuclear-reaction freeze-out.
- **Background:** Finite age, singular-origin boundary, homogeneous early thermal history.

#### $\mathbb{A}\mathbb{A}\mathbb{A}$ Reinterpretation

- **When:** No universal "beginning"; nucleosynthesis occurs locally and repeatedly in absolute time $t$ within the eternal Euclidean void.
- **Where:** In high-density, high-temperature zones surrounding supermassive black hole (SMBH) cores and their release channels; see [Black Holes](../../../../markdown/aaa/spacetime/black-holes.md).
- **Why:** Noether-Sea tri-binary assemblies near SMBHs reach densities and temperatures sufficient for nuclear reactions; subsequent outward transport and cooling mimics expansion-driven freeze-out, using the same fixed-void expansion interface developed in [Expansion Mechanism](../../../../markdown/aaa/cosmology/expansion-mechanism.md).
- **Background:** Eternal void; no singularity; "BBN" is a recurring local process, not a singular cosmic event.

#### What Remains Unchanged

- The nuclear reaction network itself (same cross-sections, same branching ratios).
- The yield hierarchy (H, D, $^4$He, trace Li) and sensitivity to neutron-to-proton ratio.
- The effective thermal history experienced by participating assemblies.

#### What Changes

- **Cosmology:** From singular, universal expansion to local, repeating cycles near SMBHs.
- **Light-element origin:** From primordial relics of $t=0$ to ongoing nucleation products ejected from SMBH environments.
- **Observational interpretation:** "Primordial" abundances reflect equilibrium distributions from continuous recycling, not a one-time cosmic event.

#### Local-Reactor Cosmology Positioning

$\mathbb{A}\mathbb{A}\mathbb{A}$ shares non-one-time-origin logic with steady-state/cyclical families, but it is more constrained: light-element claims are accepted only when SMBH-local transport-and-freeze-out mappings satisfy the same yield closure standards used in standard BBN comparisons.

### Element Context

In BBN, elements are not treated as isolated topics; they are one coupled yield system:

- **Hydrogen (H):** mostly the residual proton population that does not end up bound into heavier nuclei.
- **Deuterium (D):** an early bound-state gateway that is highly sensitive to expansion/cooling timing.
- **Helium-4 ($^4$He):** the dominant bound product of BBN, mainly set by neutron availability at freeze-out.
- **Helium-3 ($^3$He) and trace channels:** secondary light-nucleus pathways.
- **Lithium (mainly $^7$Li via $^7$Be routes):** a trace product that is often discussed separately because its inferred abundance is the most tension-prone light-element result.

Lithium is therefore not a separate ontology; it is highlighted only because it is the most delicate branch of the same shared network.

### The SMBH Nucleation Environment

In $\mathbb{A}\mathbb{A}\mathbb{A}$, what standard cosmology calls "the first minutes of the universe" corresponds to local physical conditions near SMBH cores:

1. **Assembly Compression Zone (SMBH Interior/Near-Horizon):**

Noether-Sea tri-binary assemblies compress toward maximum-curvature states.
Proton/neutron assemblies (nucleon tri-binaries; see [Nucleon Structure](../../../../markdown/aaa/nuclear-atomic/nucleon-structure.md)) are driven into close proximity by intense Noether-Sea density gradients.
Local "temperature" (kinetic energy distribution) and density mimic BBN conditions ($T \sim 10^9\,\mathrm{K},\ \rho \sim 10^{-3}\,\mathrm{g/cm^3}$).
Interpretive saturation claim: compression approaches medium-defined ceilings $T_{\max}$ and $\rho_{\max}$, so nucleosynthesis conditions are set primarily by Noether-Sea saturation rather than scaling linearly with SMBH mass.

2. **Outward Release and Cooling:**

Material released from near-horizon regions undergoes rapid outward dilution and cooling.
Effective cooling rate $dT/dt$ matches the freeze-out timing required for standard BBN yields.
This is not metric expansion of space; it is bulk flow of assemblies through the Euclidean void, with effective expansion represented as density dilution.
Interpretive timing claim: the effective expansion rate is not free-form outflow kinematics; it is constrained by assembly transport limits tied to field-speed scale $c_f$, release-channel selection, and near-core stability times, so the cooling window can align with weak freeze-out timing.

3. **Observable Output:**

Ejected material, now cooled and stabilized, carries light-element abundances set by the local reaction history.
These abundances must be observationally consistent with "primordial" BBN if the SMBH-local process is to replace a one-time origin interpretation.

#### Key Difference from Standard BBN

- **Standard:** One homogeneous early-universe thermal history; all light elements formed in the same cosmic epoch.
- **$\mathbb{A}\mathbb{A}\mathbb{A}$:** Many local nucleation sites; observed abundances reflect averaged outputs from SMBH environments plus later stellar processing.

### Network-Level Description

$$
\frac{dn_i}{dt} = \sum_{j,k}\langle\sigma v_{\mathrm{rel}}\rangle_{jk\to i}n_jn_k
- \sum_l\langle\sigma v_{\mathrm{rel}}\rangle_{il}n_in_l.
$$

The reaction bookkeeping is unchanged; the $\mathbb{A}\mathbb{A}\mathbb{A}$ shift is the background interpretation that sets temperature, density, and freeze-out timing.

### $\mathbb{A}\mathbb{A}\mathbb{A}$ SMBH-Local Nucleation Chain

The BBN story is one continuous mechanism:

1. The Noether Sea evolves in absolute time $t$ within a fixed Euclidean container.
2. This medium evolution defines an effective expansion/cooling history and therefore an emergent $H(t)$ at observer level, matching the bookkeeping used in [Expansion Mechanism](../../../../markdown/aaa/cosmology/expansion-mechanism.md).
3. The resulting thermal history sets reaction-rate competition and freeze-out ordering in the standard network.
4. The coupled light-element yields (H, D, He, trace Li) are outputs of this same medium-and-assembly dynamics and must remain compatible with the observer-level chronology in [CMB](../../../../markdown/aaa/cosmology/CMB.md).

### Lithium Within the Full Light-Element Story

Lithium is not a separate patch. It is part of the same primordial transport-and-freeze-out mechanism:

- deformation-wave transport can redistribute neutrons between denser and more diffuse zones during the BBN window,
- this reweights local reaction paths in the same network equations,
- hydrogen, deuterium, and helium can remain near their successful values while lithium pathways shift through the same transport-conditioned background.

This keeps lithium inside one coherent mechanism family rather than adding a separate after-the-fact fix.

### Observational Equivalence and Distinguishing Tests

#### Why Standard BBN Fits So Well

- If the SMBH-local mapping is correct, its nucleosynthetic output must establish a baseline light-element abundance.
- Subsequent stellar evolution and mixing would homogenize these abundances across cosmic scales.
- The effective "primordial" abundances reflect equilibrated distributions from SMBH recycling, not a singular cosmic event.

#### Potential Distinguishing Signatures

- **Spatial Inhomogeneities:** If BBN is SMBH-local, early structures might show abundance gradients correlated with SMBH proximity.
- **Time Evolution:** In an eternal universe, light-element ratios could vary with cosmic epoch if SMBH nucleation efficiency evolves (contrast with Big Bang's fixed primordial values).
- **Lithium Tension as Signal:** The $^7$Li discrepancy can be interpreted as a transport signature: hotter inner release tracks preferentially deplete $^7$Be/$^7$Li while cooler outer channels preserve D, yielding an integrated low-Li/high-D pattern.

#### Current Status

- Homogeneity of observed abundances (low dispersion across cosmic volume) constrains how much local variation the SMBH process can tolerate.
- This is a quantitative mapping objective: demonstrate that SMBH environments can produce sufficiently uniform outputs to match observations.

### Model-Family Discriminator Checklist

- Preserve deuterium survival through the bottleneck window without recirculation overburn.
- Preserve narrow helium clustering (for example near $Y_p\approx0.245$ with low dispersion).
- Preserve effective photon loading in the reaction window (BBN-compatible $\eta$ behavior).
- Preserve matter-asymmetry provenance: the baryon-to-photon ratio must be carried by the same reaction ledger used for photon loading, not inserted as an independent initial condition.
- Preserve effective neutrino-sector closure near three-species behavior (observer-level $N_{\text{eff}}$ compatibility).
- Avoid per-source ad hoc retuning that breaks universality across SMBH populations.
- Maintain reaction and thermalization provenance consistent with [Reaction-Cosmology Provenance Ledger](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md).

#### Pre-BBN Handoff Gate

Pre-BBN comparison branches are accepted only through their effect on the light-element and relativistic-species record. The BBN side of the gate does not import the external branch ontology; it asks whether the same thermal, photon-loading, neutrino, and Noether-Sea state used by the local-reactor mapping can absorb the branch without damaging the successful yield constraints.

For a candidate branch $X$, define the BBN residual
$$
\mathcal{R}_{\mathrm{BBN},X}
=
\max\left(
\frac{|\left(D/H\right)_X-\left(D/H\right)_{\mathrm{obs}}|}{\epsilon_D},\;
\frac{|Y_{p,X}-Y_{p,\mathrm{obs}}|}{\epsilon_{Y_p}},\;
\frac{|\left({}^7\mathrm{Li}/H\right)_X-\left({}^7\mathrm{Li}/H\right)_{\mathrm{obs}}|}{\epsilon_{\mathrm{Li}}},\;
\frac{|\eta_X-\eta_{\mathrm{obs}}|}{\epsilon_\eta},\;
\frac{|\Delta N_{\text{eff}}^X|}{\epsilon_N}
\right).
$$
The branch may remain in the comparison ledger only when $\mathcal{R}_{\mathrm{BBN},X}\le1$ using the same provenance and Noether-Sea record carried into [CMB](../../../../markdown/aaa/cosmology/CMB.md), [Structure Formation](../../../../markdown/aaa/cosmology/structure-formation.md), and [Gravitational Waves](../../../../markdown/aaa/spacetime/gravitational-waves.md). A component that repairs one BBN channel while spoiling deuterium survival, helium clustering, or $N_{\text{eff}}$ compatibility is a failed comparison branch, not a new explanatory resource.

The $\eta_X$ term is the BBN-facing projection of the matter-asymmetry ledger in [Reaction-Cosmology Provenance Ledger](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md#matter-asymmetry-provenance). It should be computed from transported baryon, antibaryon, and photon event records over the declared source window, not assigned independently after the yields are fit.

Compact-object comparison branches add a sharper injection test. If the branch contains a small-mass tail with late release near the BBN window, record the injected spectrum as
$$
\mathcal{I}_X(E,t)
=
\int \psi_X(M,t)\,
\Gamma_{\mathrm{release}}^X(E,t;M)\,dM,
$$
where $\psi_X(M,t)$ is the branch mass function and $\Gamma_{\mathrm{release}}^X$ is the Hawking-like or native release channel being compared. The yield shifts $\Delta\mathbf{Y}_{\mathrm{BBN}}^X$ must be computed from $\mathcal{I}_X$ and the same thermal, photon-loading, neutrino, and Noether-Sea state used elsewhere in the BBN gate. A branch that uses late energetic injection to repair one isotope while changing $\eta_X$, $N_{\text{eff}}$, or the CMB handoff independently is a failed comparison branch, not a promoted source mechanism.

### Observable-Mapping Goals (Interpretation-Scoped)

These goals are for mapping $\mathbb{A}\mathbb{A}\mathbb{A}$ dynamics to measured cosmological observables in SMBH-reactor-style interpretations. They are viability objectives and consistency checks, not yet settled derivations.

#### 1. Homogeneity Goal: "Universal Ejection Attractor"

Standard BBN effectively behaves like a calibrated standard reactor: one parameter, $\eta$ (baryon-to-photon ratio), predicts light-element abundances across the sky. SMBH-local models should recover similar universality.

- **Variance consideration:** SMBHs span mass ($10^6$ to $10^{10}\,M_\odot$), spin, and accretion-state diversity. If $T(t)$ and $\rho(t)$ inherit this variance directly, predicted yields, especially $Y_p$, should broaden.
- **Observable target:** Keep consistency with tight helium clustering near $Y_p\approx0.245\pm0.003$.
- **Goal:** Derive a **Universal Ejection Attractor** where near-horizon architrino compression saturates to medium-set conditions (Noether-core saturation), with universal ceilings $T_{\max}$ and $\rho_{\max}$ and mass-insensitive $\rho_{\mathrm{crit}}$ and $v_{\mathrm{eject}}$.
- **Observable implication:** If this saturation holds, $^4$He yield is intrinsic to medium-state convergence and remains weakly dependent on SMBH mass class.

#### 2. Freeze-Out Timing Goal: Weak-Rate vs Outflow Timescale

In Standard BBN, neutron freeze-out is set by $\Gamma_{\mathrm{weak}} \sim H$. In SMBH-local mappings, $H$ is replaced by effective outflow dilution/velocity-gradient scales (for example $\nabla\cdot\mathbf{v}$).

- **Goal:** Show the ejection/cooling timescale naturally lands near the weak freeze-out scale, $\tau_{\mathrm{cool}}\approx 1\,\mathrm{s}$.
- **Sensitivity checks:** Too slow drives $n\to p$ weak conversion toward H-dominated yields; too fast preserves high $n/p$ and overproduces helium (for example $Y_p>0.5$).
- **Physical closure target:** Parameterize the effective expansion clock as an assembly-limited rate (bounded by transport scales set by $c_f$, local stability times, and release-channel geometry) rather than unconstrained outflow phenomenology.

#### 3. Deuterium Survival Goal: Monotonic Quench Window

Deuterium survives only if the flow exits the bottleneck window quickly after formation (around $T\approx0.1\,\mathrm{MeV}$), rather than recirculating and re-burning.

- **Goal:** Require laminar, monotonic cooling through the D-formation window, followed by rapid quench.
- **Mapping task:** Relate release-channel transport properties, including turbulence or shear diagnostics where relevant, and cooling curves to the D-survival window.

#### 4. Photon-Bath Goal: Reproduce Effective $\eta^{-1}\sim10^9$

The BBN reaction sequence requires a high photon-to-baryon environment so D is not stabilized too early, consistent with effective $\eta\approx6\times10^{-10}$.

- **Goal:** Identify a photon-dominated reaction zone with $\rho_\gamma\gg\rho_b$ in the relevant nucleation channel.
- **Interpretive option:** Distinct shear layers, diffuse outflow regions, or pair/synchrotron-bright release channels can be tested as photon-bath suppliers, rather than matter-heavy disk zones.
- **Source-model objective:** Show how recycling-zone photon production (for example pair annihilation, bremsstrahlung, and synchrotron cascades) can maintain BBN-compatible photon loading during the D bottleneck window.
- **Thermalization-depth check:** Treat photon loading as an ensemble closure target. The relevant source zone should satisfy a channel-recorded depth condition $\mathcal{D}_{\mathrm{th}}^{\mathrm{BBN}}(\nu)\gtrsim 1$ across the photon energies that control deuterium photodissociation and nuclear freeze-out timing, while preserving the same Noether-Sea state variables used for density dilution, cooling, and neutrino-sector handoff.
- **Matter-asymmetry check:** The same source-zone record must yield $\eta_B^{\mathrm{ledger}}$ compatible with $\eta_{\mathrm{obs}}$ after baryon, antibaryon, and photon transport to the BBN comparison surface.
- **Consistency check:** If this condition is unmet, D forms too early and is over-processed.

#### 5. Lithium Goal: Promote to a Distinguishing Prediction

Lithium is treated here as a primary discriminator, not only a trace channel.

- **Goal:** Quantify whether core-sheath inhomogeneity can suppress $^7$Be/$^7$Li while preserving high D, producing the observed low-Li/high-D direction.
- **Primary distinguishing prediction:** In SMBH-local reactor mappings, spatial inhomogeneity is a productive mechanism (not a nuisance), and lithium depletion emerges from transport-weighted integration across heterogeneous flow channels.
- **Interpretive contrast:** Standard BBN uses near-homogeneous initial conditions, while the $\mathbb{A}\mathbb{A}\mathbb{A}$ local-reactor mapping can use controlled inhomogeneity as an explanatory lever.

#### 6. Equation-of-State Goal: Specify Tri-Binary Compression EoS

The model needs an explicit compression-zone equation of state (for example local $P(\rho)$ or effective $w$ behavior) to close dynamics.

- **Goal:** Determine whether tri-binary matter stiffens near horizon compression (high effective sound speed), and whether that stiffness is sufficient to drive rapid radial expansion.
- **Mapping task:** Connect the EoS choice directly to freeze-out timing, D quench, and final yield sensitivity.

#### 7. Neutrino-Counting Goal: Recover Effective $N_{\text{eff}}$

Cosmological data are consistent with an effective relativistic-species count near $N_{\text{eff}}\approx3.04$, so SMBH-local mappings need a neutrino history compatible with that target.

- **Goal:** Show that neutrino production in the relevant nucleation zone is close enough to thermalized flavor populations to recover effective three-species behavior at observer level.
- **Opacity-to-decoupling mapping:** Model a dense phase where neutrinos are initially trapped (interaction-opaque core conditions), followed by release at a defined decoupling temperature window.
- **Consistency check:** Free-streaming onset and energy partition should map to BBN/CMB-inferred $N_{\text{eff}}$ without introducing extra relativistic degrees of freedom.

#### 8. Early-Enrichment Timing Goal: "Old Stars" Consistency

Observed low-metallicity gas and very old stars with BBN-like light-element patterns require a viable pre-stellar enrichment pathway in SMBH-local interpretations.

- **Cycle mapping objective:** Establish an early sequence SMBH nucleation $\to$ release-channel ejection $\to$ ambient gas-cloud enrichment $\to$ subsequent star formation.
- **Timescale objective:** Show that transport and mixing can populate star-forming reservoirs with BBN-like yields early enough to match old-star abundance constraints.
- **Formation-context option:** Evaluate whether early structure formation with primordial or very-early SMBH populations can supply the required enrichment baseline.

### Philosophical and Explanatory Consequences

#### What the Eternal-Universe Interpretation Gains

- **No singularity:** Avoids the conceptual paradox of $t=0$ and "something from nothing."
- **No fine-tuning of initial conditions:** Abundances emerge from dynamical equilibration in SMBH environments, not from finely-tuned cosmic initial states.
- **Mechanistic clarity:** Replaces abstract "expansion cooling" with explicit outward transport of assemblies through fixed Euclidean space.

#### What It Seeks to Explain

- **Homogeneity:** Why do spatially separated SMBH nucleation sites produce nearly identical light-element ratios?
- **Timing consistency:** Why does the effective freeze-out sequence (D $\to$ $^3$He $\to$ $^4$He) occur so uniformly?
- **Neutrino sector:** How does local SMBH nucleation produce the observed $N_{\text{eff}} \approx 3$ signature?

### Summary Table

| Aspect | Standard BBN | $\mathbb{A}\mathbb{A}\mathbb{A}$ BBN |
|---|---|---|
| Universe age | Finite ($t\sim13.8$ Gyr) | Eternal (no beginning) |
| BBN location | Everywhere | Near SMBH cores |
| BBN frequency | Once (first 20 min) | Recurring (wherever SMBHs form) |
| Expansion driver | Metric expansion | Outward transport of assemblies |
| Light-element origin | Primordial relics | SMBH nucleation products |
| Homogeneity explanation | Initial conditions | Dynamical equilibration |

## CMB

This document combines the CMB origin timeline and prediction layer in one place, with parallel interpretation language for standard $\Lambda\mathrm{CDM}$ and $\mathbb{A}\mathbb{A}\mathbb{A}$. It sits on top of [Cosmology Ontology](../../../../markdown/aaa/cosmology/cosmology-ontology.md) and shares interfaces with [Expansion Mechanism](../../../../markdown/aaa/cosmology/expansion-mechanism.md), [BBN Constraints](../../../../markdown/aaa/cosmology/BBN-constraints.md), and [Dark Matter](../../../../markdown/aaa/cosmology/dark-matter.md).

### Core Idea

The CMB timeline is presented as an effective observer-level chronology map that is interpreted through one fixed-void, evolving-Noether-Sea ontology in $\mathbb{A}\mathbb{A}\mathbb{A}$.

### Framing Guardrails

- The Euclidean void is fixed; cosmological language describes Noether-Sea evolution within that fixed container.
- Redshift language is consistent with Noether-Sea evolution plus clock-rate comparison across environments.
- Background and growth claims are kept in one shared Noether-Sea-and-assembly ontology.
- Epoch times below are an effective observer-level chronology map, not a claim of one literal global launch event in absolute-time ontology.
- The CMB rest-frame correction is an observational procedure, not an ontological axiom. It must be checked against matter catalogues, supernova residuals, and BAO directionality before it is allowed to fix the whole cosmology stack.

### Chronology Mapping Note

$\mathbb{A}\mathbb{A}\mathbb{A}$ uses an effective chronology map that is conceptually adjacent to cyclical/recycling cosmology families, but its mechanism is explicitly SMBH-local source architecture in a fixed-void ontology.

### CMB Dipole and Matter-Dipole Gate

The CMB dipole remains a central calibration object because the standard interpretation treats it mainly as a kinematic signal from local motion. If that interpretation is complete, then distant source catalogues should show the corresponding aberration and Doppler dipole after allowing for each catalogue's number-count slope and spectral response. For a catalogue $X$, use the residual

$$
\Delta_{\mathrm{dip}}^{X}
=
\mathbf{D}_{X}
-
K_X(\alpha_X,x_X)\,\mathbf{D}_{\mathrm{CMB}},
$$

where $\mathbf{D}_{X}$ is the measured source-count dipole, $\mathbf{D}_{\mathrm{CMB}}$ is the CMB dipole vector, and $K_X(\alpha_X,x_X)$ is the catalogue-dependent kinematic amplification factor built from spectral index $\alpha_X$ and number-count slope $x_X$.

In the standard homogeneous and isotropic limit, $\Delta_{\mathrm{dip}}^{X}$ should be consistent with survey masks, source evolution, and statistical noise. In the $\mathbb{A}\mathbb{A}\mathbb{A}$ cosmology map, a persistent residual is not immediately promoted to a new ontology. It becomes a validation target:

$$
\mathbf{D}_{X}
=
\mathbf{D}_{\mathrm{kin}}
+
\mathbf{D}_{\mathrm{sea}}
+
\mathbf{D}_{\mathrm{mask/source}},
$$

where $\mathbf{D}_{\mathrm{kin}}$ is ordinary observer motion, $\mathbf{D}_{\mathrm{sea}}$ is the contribution from Noether-Sea flow, density, delay, and clock-rate gradients, and $\mathbf{D}_{\mathrm{mask/source}}$ records survey selection and source-population effects. Closure requires the same Noether-Sea term to remain compatible with CMB anisotropy, quasar and radio-source dipoles, supernova directionality, BAO measurements, and local $H$ scatter.

This gate does not replace the TT/TE/EE or blackbody requirements. It adds a frame-consistency test: the effective CMB frame used for background inference must be the same frame, or a derived projection of the same medium state, used by the matter and distance-ladder modules.

The concrete packet shape for this subgate is defined in [Cosmology Shared Residual Fit Protocol](../../../../markdown/aaa/validation/simulations/cosmology-shared-residual-fit.md#frame-split-measurement-recipe).

### Localized CMB Feature Validation

Claims about localized CMB features, including claims sometimes interpreted as pre-Big-Bang or cyclic-history signals, must first be handled as cross-instrument data products. The retained observable is not the external interpretation. It is the question of whether a common localized residual survives masking, foreground modeling, beam handling, and comparison between independent maps such as WMAP and Planck.

Let $M_P(\hat{\mathbf{n}})$ and $M_W(\hat{\mathbf{n}})$ denote foreground-cleaned Planck and WMAP residual maps after a common mask and baseline $\Lambda\mathrm{CDM}$ subtraction. For an angular template $T_{\theta,\hat{\mathbf{n}}}$ centered at sky direction $\hat{\mathbf{n}}$ with scale $\theta$, define the cross-map support statistic
$$
S_{PW}(\hat{\mathbf{n}},\theta)
=
\frac{\langle M_P,T_{\theta,\hat{\mathbf{n}}}\rangle_{C_P^{-1}}}{\sigma_P(\theta)}
\frac{\langle M_W,T_{\theta,\hat{\mathbf{n}}}\rangle_{C_W^{-1}}}{\sigma_W(\theta)}.
$$
For a proposed set of $N$ localized features, the comparison pressure is the null probability
$$
p_N
=
\Pr_{\Lambda\mathrm{CDM}+\mathrm{foregrounds}}
\left[
\max_{\{\hat{\mathbf{n}}_i,\theta_i\}_{i=1}^{N}}
\sum_{i=1}^{N}S_{PW}(\hat{\mathbf{n}}_i,\theta_i)
\ge
S_{\mathrm{obs}}
\right].
$$

This statistic is a validation target, not a permission to import an external cosmology. If such a residual remains significant after foreground, mask, and look-elsewhere accounting, a viable $\mathbb{A}\mathbb{A}\mathbb{A}$ cosmology must either reproduce it from the same Noether-Sea state used for TT/TE/EE, blackbody behavior, lensing, BAO, and structure growth, or show why it is a foreground, systematic, or null-fluctuation artifact. A fit that explains localized features by changing the cosmology state independently from the acoustic peaks or lensing record fails the shared-state requirement.

### Pre-Cosmological Steady State ($\mathbb{A}\mathbb{A}\mathbb{A}$-Only)
- Scope: $\mathbb{A}\mathbb{A}\mathbb{A}$-only steady-state background; $\Lambda\mathrm{CDM}$ does not define a pre-Big-Bang era.
- Persistent galaxies and SMBHs exist in a long-lived recycling regime.
- This steady-state reservoir is later mapped onto the Big Bang timeline for physical observers.

**$\Lambda\mathrm{CDM}$ interpretation:** Outside the model; $\Lambda\mathrm{CDM}$ does not define a pre-Big-Bang state.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation:** The universe is a fixed Euclidean container populated by the Noether Sea. Galaxies and SMBHs have existed indefinitely in a steady-state, recycling regime. SMBHs act as strong-field recycling sites whose horizon interfaces can return processed content to the surrounding Noether Sea through several release channels. Those channels may include visible outflows, diffuse radiative release, and initially dark-sector photon-channel candidates. The released content then traverses the evolving Noether Sea and can be thermally reprocessed by repeated interactions with assemblies. This steady-state backdrop is the source reservoir that later maps onto the Big Bang timeline for physical observers.

### Planck Epoch (0 to $\sim 10^{-43}$ s)
- Time window: 0 to $\sim 10^{-43}$ s.
- Regime: peak effective densities/energies; quantum-gravity behavior dominates.
- Force status: gravity is distinct; other interactions are effectively unified.

**$\Lambda\mathrm{CDM}$ interpretation:** Spacetime is in a quantum-gravity regime; ordinary field theory breaks down. The Planck scale sets the limiting energy density and length scale for known physics.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Planck Epoch: Peak Density of Energetic Architrinos):** The Noether Sea reaches peak effective density in a local recycling event. Architrinos dominate the dynamics, and the tri-binary network is maximally compressed. At the event-horizon limit, the only stable assemblies are neutral Noether cores: high-energy, stealthy pairs or quad clusters that couple with a strong-like force. The photon-channel assemblies are modeled as coaxial contra-rotating pro/anti planar pairs moving at the local effective photon speed. Noether-core assemblies populate the Noether Sea, so the effective gravity channel is active while the Euclidean void remains fixed. Noether cores are neutral, so there is no emergent electric force yet beyond internal binding. Axial architrinos are absent, so no weak force. A strong-like binding exists inside Noether-core couplings, but it is not externally observable until quark assemblies appear. This is the regime where self-hit effects are strongest and where the universal maximum-curvature binary (MCB) cap is approached.

### Grand Unification Epoch ($\sim 10^{-43}$ to $10^{-36}$ s)
- Time window: $\sim 10^{-43}$ to $10^{-36}$ s.
- Regime: high-energy unification with symmetry breaking beginning.
- Force status: strong interaction separates from the electroweak sector across this window.

**$\Lambda\mathrm{CDM}$ interpretation:** Gauge interactions may be unified; symmetry breaking sets the stage for later phase transitions.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Grand Unification Epoch: Binaries Dominate):** Stable binary assemblies become the dominant carriers of energy and interaction. The Noether Sea organizes around binary formation, suppressing free-architrino behavior and defining the first durable interaction channels. Strong-like binding remains internal to these neutral cores and is still not externally observable without quark-scale axial patterns.

### Inflationary Epoch ($\sim 10^{-36}$ to $10^{-32}$ s)
- Time window: $\sim 10^{-36}$ to $10^{-32}$ s.
- Regime: rapid effective expansion/relaxation smooths large-scale geometry.
- Perturbations: primordial fluctuations are seeded for later structure.

**$\Lambda\mathrm{CDM}$ interpretation:** A scalar field drives exponential expansion, smoothing curvature and seeding primordial perturbations.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Inflationary Epoch: Noether-Core Transition):** $\mathbb{A}\mathbb{A}\mathbb{A}$ treats inflation-like behavior as sourced in SMBH-core interior dynamics. The self-hit regime of inner assemblies drives rapid effective expansion/relaxation of the surrounding Noether Sea. Near the Planck-alignment boundary, terminal lock and release behavior organizes the transition from maximal-curvature dynamics into a broader, more uniform ambient state. In the mapped chronology, Noether-core tri-binary behavior enters a coherent regime that later supports emergent metric summaries without invoking literal expansion of the void.

### Electroweak Epoch ($\sim 10^{-12}$ s)
- Time window: $\sim 10^{-12}$ s.
- Regime: electroweak symmetry breaking; particle masses emerge.
- Force status: electromagnetic and weak forces split; four forces become distinct thereafter.

**$\Lambda\mathrm{CDM}$ interpretation:** Electroweak symmetry breaks; particle masses emerge via the Higgs mechanism.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Electroweak Epoch: Axial Architrinos Associate with Noether Cores):** Axial architrinos associate with Noether cores, setting the effective inertial response and distinguishing stable interaction channels. This is the point where electromagnetic and weak interactions become externally observable: charged assemblies appear and weak-scale coupling becomes meaningful through axial topology. This association process defines the emergent analog of particle masses and electroweak differentiation; compare [Electroweak Bosons: Photons, W/Z, and Higgs](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md).

### Quark Epoch ($\sim 10^{-12}$ to $10^{-6}$ s)
- Time window: $\sim 10^{-12}$ to $10^{-6}$ s.
- Regime: quark-gluon plasma dominates the energy density.
- Force status: strong interaction active; confinement has not yet occurred.

**$\Lambda\mathrm{CDM}$ interpretation:** Quarks and gluons form a hot plasma; confinement has not yet occurred.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Quark Epoch: Emerging/Surviving Quarks Couple Vortices):** Quark-like assemblies survive as specific tri-binary configurations with axial layers. Their coupling is mediated by vortex-like wake structures, with confinement emerging as a topological stability condition rather than a fundamental gauge field. This is the point where the strong interaction becomes externally visible through quark–quark coupling and confinement dynamics.

### Hadron Epoch ($\sim 10^{-6}$ s to $\sim 1$ s)
- Time window: $\sim 10^{-6}$ s to $\sim 1$ s.
- Regime: quark confinement produces hadrons.
- Matter: baryonic matter becomes the dominant composite sector.

**$\Lambda\mathrm{CDM}$ interpretation:** Quarks confine into hadrons (protons and neutrons), and hadronic matter becomes the dominant form of baryonic energy.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Hadron Epoch: Assemblies with Coupled Quarks Emerge):** Multi-core assemblies stabilize, associating quark-like structures into hadron analogs. The Noether Sea now supports composite assemblies with persistent internal phase structure, setting the stage for nuclear binding.

### Lepton Epoch (incl. neutrino decoupling) ($\sim 1$ to $\sim 10$ s)
- Time window: $\sim 1$ to $\sim 10$ s.
- Regime: leptons and anti-leptons are abundant.
- Outcome: pair annihilation reduces lepton density and heats radiation.
- Sub-phase (neutrino decoupling, $\sim 1$ s): weak interaction rate falls below expansion/relaxation; neutrinos free-stream.

**$\Lambda\mathrm{CDM}$ interpretation:** Electron-positron pairs are abundant; annihilation and cooling reshape the radiation bath.
**$\Lambda\mathrm{CDM}$ (neutrino decoupling):** Weak interaction rates drop below the expansion rate; neutrinos free-stream.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Lepton Epoch: Noether Cores with 6*|e/6| Axial Architrinos Form):** Stable lepton analogs form from Noether cores carrying six bound axial architrinos (net $|e|$ from six $|e/6|$ units). Lepton-like assemblies populate the Noether Sea and mediate charge-neutralization channels.
**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Neutrino Decoupling: Noether Cores with Neutral Axial Layers):** Nearly neutral tri-binary assemblies lose strong coupling to the dominant plasma-like background and begin to free-stream as weakly interacting modes. In this framing, neutrino-sector free-streaming and sea coupling are part of the same parameter story that later appears as effective $N_{\text{eff}}$ language; compare [Neutrinos](../../../../markdown/aaa/assemblies/fermions/neutrinos.md).

### Photon Epoch ($\sim 10$ s to $\sim 3.8\times10^5$ years)
- Time window: $\sim 10$ s to $\sim 3.8\times10^5$ years.
- Regime: ionized plasma with tight photon-matter coupling.
- Outcome: acoustic oscillations develop in the coupled medium.

**$\Lambda\mathrm{CDM}$ interpretation:** The photon-baryon fluid is optically thick; acoustic oscillations develop and imprint the future CMB power spectrum.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Photon Epoch: Nuclear Assembly Plasma):** A dense plasma of nuclear assemblies and photon assemblies modeled as coaxial contra-rotating pro/anti planar pairs fills the Noether Sea. Repeated scattering and wake interactions thermalize the radiation field. Acoustic-like standing modes arise from coupled oscillations of assemblies and coaxial contra-rotating pro/anti planar-pair excitations, seeding the eventual CMB peak structure.

### Big Bang Nucleosynthesis ($\sim 3$ to $\sim 20$ minutes)
- Time window: $\sim 3$ to $\sim 20$ minutes.
- Regime: light nuclei form as temperatures fall.
- Outcome: primordial abundances of D, He, and trace Li are set.

**$\Lambda\mathrm{CDM}$ interpretation:** Protons and neutrons bind into deuterium, helium, and trace lithium; abundances are set by expansion rate and reaction networks.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (BBN: Protons (15:21) and Neutrons (18:18) Associate):** Specific multi-core assemblies corresponding to proton (15:21) and neutron (18:18) configurations associate into light nuclear assemblies. Reaction rates are controlled by assembly topology and wake-coupling cross sections in the Noether Sea; this is the same light-element window developed in [BBN Constraints](../../../../markdown/aaa/cosmology/BBN-constraints.md).

### Acoustic Peak Seeding (pre-recombination)
- Time window: late photon epoch prior to recombination.
- Regime: standing-wave modes imprint a harmonic ladder.
- Outcome: peak positions/amplitudes encode medium properties and coupling.

**$\Lambda\mathrm{CDM}$ interpretation:** Acoustic oscillations in the photon-baryon fluid generate the familiar harmonic peaks. Peak positions are set by the sound horizon at recombination; relative heights encode baryon loading and radiation driving.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Tri-Binary Energy Ladder):** The tri-binary system supplies three intrinsic energy scales (outer, middle, inner) that act as primary mode seeds. Coupling through the Noether Sea generates a harmonic ladder from those seeds, analogous to standing acoustic modes in a cavity. The effective “sound horizon” scale is set by the Noether-Sea coupling length, the delay response $\chi_{\text{sea}}$, and the duration of the high-optical-depth phase, while the odd/even peak pattern reflects how baryon-like assemblies load the oscillations relative to coaxial contra-rotating pro/anti planar-pair modes.

### Recombination ($\sim 3.8\times10^5$ years)
- Time window: $\sim 3.8\times10^5$ years.
- Regime: electrons associate with nuclei; scattering drops sharply.
- Outcome: photons decouple (last scattering) and free-stream.

**$\Lambda\mathrm{CDM}$ interpretation:** Electrons combine with nuclei; photons decouple, producing the CMB. The last-scattering surface is established.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Recombination: Coaxial Contra-Rotating Photon Assemblies Decouple):** Electron-like assemblies lock into neutral coaxial configurations with nuclei, dramatically reducing scattering cross sections. Photon assemblies modeled as coaxial contra-rotating pro/anti planar pairs decouple and free-stream. This defines the $\mathbb{A}\mathbb{A}\mathbb{A}$ analog of last scattering, with the CMB spectrum reflecting the thermalized Noether-Sea state at decoupling.

### Dark Ages ($\sim 3.8\times10^5$ years to first light)
- Time window: $\sim 3.8\times10^5$ years to first light.
- Regime: neutral medium with no luminous sources.
- Outcome: structure grows under gravity/medium dynamics.

**$\Lambda\mathrm{CDM}$ interpretation:** The universe is neutral and dark; structure grows under gravity until the first luminous objects form.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Dark Ages: Coaxial Contra-Rotating Photon Assemblies Free-Stream):** The decoupled photon assemblies, modeled as coaxial contra-rotating pro/anti planar pairs, propagate through the evolving Noether Sea. The radiation field retains its thermal shape while redshifting due to medium evolution and path-integrated clock-rate comparison between emission and observation environments. Small anisotropies reflect assembly-density fluctuations rather than a single primordial event.

### SMBH Release Channels
- Scope: interpretive bridge between $\mathbb{A}\mathbb{A}\mathbb{A}$ steady-state recycling and the effective Big Bang chronology map.
- Claim: the Big Bang corresponds to the collective surfaces of SMBHs, not a singular origin.
- Outcome: outward release from SMBH recycling sites maps onto the observed CMB after thermalization and redshift.

**$\Lambda\mathrm{CDM}$ interpretation:** The Big Bang is a global origin of spacetime, setting the initial conditions for all subsequent evolution.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation:** The Big Bang timeline is reinterpreted as the effective history of a large-scale recycling event sourced by SMBH environments. Dark-sector photon-like modes, recycled dark-sector assemblies, and other outbound excitations from SMBH horizon interfaces can propagate through the Noether Sea, thermalize, and redshift into the observed CMB directly or after further conversion into visible channels. Jets and surface outflows remain plausible observer-level manifestations of this release, but they are not the only allowed morphology. The three intrinsic tri-binary energy scales (outer/middle/inner) provide natural mode seeds for acoustic peaks, with coupling in the medium generating the harmonic ladder observed today. The CMB source interpretation is therefore a closure target for steady-state recycling dynamics in a fixed Euclidean void, not a singular origin event nor literal metric stretching of the container.

#### QSSC Contrast (Conceptual)

| Axis | QSSC-like families | $\mathbb{A}\mathbb{A}\mathbb{A}$ implementation |
|---|---|---|
| Similarity | Distributed/recycling source logic over long history | Distributed/recycling source logic over long history |
| Core difference | Phenomenological source and transport descriptions | Tri-binary medium microphysics with explicit module interfaces |
| Closure standard | General background consistency goals | Hard closure targets: blackbody precision, $\Delta T/T$, and TT/TE/EE/damping coherence |

### Distributed-Emission Channels

Within the same ontology, CMB sourcing can be represented through:

1. SMBH release from horizon-interface recycling sites, including jet-like, diffuse, and initially dark-sector channels accumulated over long history,
2. medium-relaxation radiation from Noether-Sea state transitions,
3. conversion or dissociation channels from high-velocity or dark-sector assembly states into photon assemblies.

These channels are treated as parts of one shared thermalization and decoupling story; they are not separate ontologies.

Jet-transport scales in the Mpc class are treated as one member of this channel family, with cumulative contribution determined by source population statistics, release-channel selection, and medium thermalization depth.

Isotropy in this branch is attributed to long-time averaging over many source populations following the same microphysical rules, not to one-time primordial causal contact.

#### Effective Thermal Spectrum of the Noether Sea

The framework does not yet identify an ontological root definition of temperature, so it should not simply equate the enormous internal energy of individual Noether cores with an ordinary thermodynamic temperature. A more disciplined distinction is required between three quantities: the internal energy scale of the cores, the local effective emissive temperature of the Noether Sea if it behaves as a blackbody source, and the observer-side temperature inferred from the photon bath after emission, transport, thermalization, and redshift. On that reading, the observed $2.7255\,\mathrm{K}$ background is the temperature of the ambient microwave radiation field measured by present observers, not automatically the intrinsic temperature of the Noether Sea as an emitter. The stronger claim to test is that sufficiently homogeneous regions of the Sea can generate and maintain a near-blackbody photon population whose measured spectrum tracks that emissive state after medium transport. Departures from the baseline blackbody should then encode local medium state: increasing core density, anisotropy, or internal excitation near dense matter would tend to distort the spectrum away from the homogeneous limit, while the strongest deviations should arise near black-hole recycling zones, where alignment, compression, and release-channel mixing can harden, bias, or only partially re-thermalize the emitted radiation before subsequent relaxation in the surrounding Noether Sea.

#### Thermalization-Depth and Planck-Recovery Target

The blackbody claim should be carried as a theorem target, not as a source-story assertion. A distributed-emission interpretation must show that source channels, transport, and decoupling collectively supply enough mode exchange before free streaming. A compact diagnostic is the path-integrated thermalization depth

$$
\mathcal{D}_{\mathrm{th}}^{\mathrm{CMB}}(\nu)
=
\int_{t_{\text{src}}}^{t_{\text{dec}}}
\tau_{\mathrm{th}}^{-1}(\nu,t)\,dt,
$$

where $\tau_{\mathrm{th}}^{-1}$ is the effective rate for the already-recorded capture/release, Compton-like redistribution, pair-channel, and medium-exchange processes. The target is $\mathcal{D}_{\mathrm{th}}^{\mathrm{CMB}}\gg1$ before decoupling for spectral relaxation, followed by sufficiently weak post-decoupling coupling to preserve anisotropy, polarization, and damping information rather than erase it.

In the weak homogeneous photon-channel limit, the observer-level recovery target is the Planck spectral form

$$
u_\nu^{\mathrm{eff}}(T_{\text{ens}})
=
\frac{8\pi h\nu^3}{c_\gamma^3}
\frac{1}{\exp(h\nu/(k_B T_{\text{ens}}))-1}.
$$

This formula is an effective comparison object. It becomes available only after Gate A supplies the photon energy-frequency and mode-counting interface, Gate B supplies the two transverse photon modes and polarization handoff, and Gate C drives the photon chemical potential to zero through detailed balance. The redshift handoff must then preserve spectral shape by mapping photon frequencies and inferred temperature through the same Noether-Sea and clock-rate comparison variables used elsewhere in this document.

### Consistency Anchors

- Expansion wording here should remain consistent with [expansion-mechanism.md](../../../../markdown/aaa/cosmology/expansion-mechanism.md).
- Dark-sector loading language here should remain consistent with [dark-matter.md](../../../../markdown/aaa/cosmology/dark-matter.md) and [hubble-s8-tensions.md](../../../../markdown/aaa/cosmology/hubble-s8-tensions.md).
- Strong-field release language here should remain consistent with [../spacetime/black-holes.md](../../../../markdown/aaa/spacetime/black-holes.md).
- Parameter-bridge wording here should remain consistent with the constraint-ledger language used in the cosmology branch.
- Reaction and thermalization provenance should remain consistent with [Reaction-Cosmology Provenance Ledger](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md).

### CMB-Module Interface

In the modular cosmology map, this page provides:

- timeline-level interpretation mapping between ontic mechanism language and observer-era chronology,
- source-to-transport-to-decoupling narrative inputs from the unified prediction layer in this document,
- bridge language tying expansion, BBN, and growth narratives into one CMB interpretation layer.

### Prediction Layer (Unified)

#### Effective Comparison Object

$$
C_\ell = \langle |a_{\ell m}|^2 \rangle.
$$

The formal observables remain standard; in practice this includes TT/TE/EE spectra (with damping-tail and lensing behavior), with $C_\ell$ as compact notation.

#### Scalar and Tensor Closure Target

The scalar/tensor layer is an observable gate, not an origin-story selector. Whether the source story is primordial, distributed, or recycling-based, a candidate $\mathbb{A}\mathbb{A}\mathbb{A}$ CMB record $\theta$ must reproduce the scalar perturbation spectrum and avoid an excessive tensor contribution using the same Noether-Sea history that later supplies TT/TE/EE, damping, lensing, and redshift handoff.

Use the comparison parameterization
$$
\mathcal{P}_{\mathcal{R}}^{\theta}(k)
=
A_s^{\theta}
\left(\frac{k}{k_*}\right)^{
n_s^{\theta}-1+\frac12\alpha_s^{\theta}\ln(k/k_*)
},
\qquad
r^{\theta}(k_*)
=
\frac{\mathcal{P}_{T}^{\theta}(k_*)}{\mathcal{P}_{\mathcal{R}}^{\theta}(k_*)}.
$$

Here $A_s^{\theta}$ is the scalar amplitude, $n_s^{\theta}$ the scalar tilt, $\alpha_s^{\theta}$ an optional running term, and $r^{\theta}$ the tensor-to-scalar comparison ratio. The tensor condition is a bound,
$$
r^{\theta}(k_*)\le r_{\max},
$$
with $r_{\max}$ supplied by the current observational analysis being used for the comparison. This keeps tensor non-detection as a pressure on source models without turning any particular inflationary or anti-inflationary interpretation into corpus doctrine.

Finite-range or medium-compliance gravity comparisons enter this same tensor gate. They do not add a massive-graviton ontology; they add the requirement that the same Noether-Sea record which weakens the large-scale response also predicts the tensor and B-mode data products. A compact comparison residual is
$$
\mathcal{R}_{T,\mathrm{range}}(\theta)
=
\sum_{\ell\in\mathcal{L}_{BB}}
\frac{
\left(C_{\ell,BB}^{\theta}-C_{\ell,BB}^{\mathrm{obs}}\right)^2
}{
\sigma_{\ell,BB}^2
}
+
\lambda_r\max(0,r^{\theta}-r_{\max})^2
+
\lambda_{\mathrm{low}}\mathcal{R}_{\mathrm{GW,low}}(\theta),
$$
where $\mathcal{L}_{BB}$ is the declared B-mode comparison window and $\mathcal{R}_{\mathrm{GW,low}}$ is the low-frequency dispersion forecast from [Gravitational Waves](../../../../markdown/aaa/spacetime/gravitational-waves.md#linear-wave-equation). This keeps the CMB tensor bound and gravitational-wave dispersion gate tied to one comparison record rather than allowing a finite-range branch to fit them separately.

A compact residual for CMB closure is
$$
\mathcal{R}_{\mathrm{CMB}}(\theta)
=
\sum_{X\in\{TT,TE,EE\}}\sum_{\ell}
\frac{(C_{\ell,X}^{\theta}-C_{\ell,X}^{\mathrm{obs}})^2}{\sigma_{\ell,X}^2}
+
\frac{(A_s^{\theta}-A_s^{\mathrm{obs}})^2}{\sigma_{A_s}^2}
+
\frac{(n_s^{\theta}-n_s^{\mathrm{obs}})^2}{\sigma_{n_s}^2}
+
\lambda_T\max(0,r^{\theta}-r_{\max})^2.
$$

The closure target is one medium-and-assembly model with bounded $\mathcal{R}_{\mathrm{CMB}}$, not a separate fit for each observable family.

The same scalar sector must also recover the acoustic phase record rather than only the broadband amplitude and tilt. A compact phase residual can be written as
$$
\mathcal{R}_{\mathrm{phase}}(\theta)
=
\sum_{X\in\{TT,TE,EE\}}\sum_{p}
\frac{
\left(\ell_{p,X}^{\theta}-\ell_{p,X}^{\mathrm{obs}}\right)^2
}{
\sigma_{\ell,p,X}^2
},
$$
where $\ell_{p,X}$ denotes the location of the $p$th acoustic feature in spectrum $X$. This residual keeps acoustic ringing as an observational phase-coherence requirement. It does not select a particular origin story for why those phases are coherent.

The vector sector supplies a separate absence gate. For an effective pre-decoupling velocity field $\mathbf{u}_{\theta}^{\mathrm{eff}}$ and vorticity $\boldsymbol{\omega}_{\theta}^{\mathrm{eff}}\equiv\nabla\times\mathbf{u}_{\theta}^{\mathrm{eff}}$, use
$$
\mathcal{R}_{V}(\theta)
=
\frac{
\int_{\Sigma_{\mathrm{dec}}}
\left\|\boldsymbol{\omega}_{\theta}^{\mathrm{eff}}\right\|^2\,dV_{\mathrm{eff}}
}{
\int_{\Sigma_{\mathrm{dec}}}
\left\|\nabla\delta_{\gamma}^{\theta}\right\|^2\,dV_{\mathrm{eff}}
+\epsilon_V
}.
$$
Here $\delta_{\gamma}^{\theta}$ is the photon-channel density contrast in the observer-level reconstruction. The numerator tests effective vector/vorticity content; the denominator normalizes it against the scalar contrast being recovered. A successful CMB history must keep this residual small in the same state record that fits TT/TE/EE.

The CMB-lensing sector adds a late-time integrated-mass reconstruction gate. In standard comparison language, lensing remaps the primary CMB by an effective lensing potential $\phi$ and yields a lensing-potential spectrum $C_L^{\phi\phi}$. For a candidate history $\theta$, use
$$
\mathcal{R}_{\mathrm{lens}}(\theta)
=
\sum_L
\frac{
\left(C_L^{\phi\phi,\theta}-C_L^{\phi\phi,\mathrm{obs}}\right)^2
}{
\sigma_{L,\phi}^2
}.
$$
This is a data-product constraint, not a dark-sector ontology by itself. The same Noether-Sea-and-assembly history that fits the primary TT/TE/EE spectra must also project to the lensing potential consumed by the growth and dark-matter modules.

The same gate should include the smoothness pressure usually hidden inside origin-story language. Conformal-cosmology comparisons are useful here only because they isolate a real burden: the effective early record must have a very small free gravitational-mode contribution compared with the complicated strong-field behavior expected near generic collapse. $\mathbb{A}\mathbb{A}\mathbb{A}$ does not import conformal continuation as ontology. It preserves the observable requirement by asking the CMB-producing Noether-Sea history to suppress effective Weyl-like curvature in the decoupling comparison layer.

For an effective metric reconstruction $g_{\theta}^{\text{eff}}$ associated with a candidate history $\theta$, one useful comparison residual is
$$
\mathcal{R}_{\mathrm{smooth}}(\theta)
=
\frac{
\int_{\Sigma_{\mathrm{dec}}}
\left\|C_{\alpha\beta\gamma\delta}(g_{\theta}^{\text{eff}})\right\|^2\,dV_{\mathrm{eff}}
}{
\int_{\Sigma_{\mathrm{dec}}}
\left\|R_{\alpha\beta}(g_{\theta}^{\text{eff}})\right\|^2\,dV_{\mathrm{eff}}
+\epsilon_R
}.
$$

This is not a statement that the Euclidean void is curved. It is an observer-level diagnostic on the effective reconstruction used to compare with CMB data. A stronger closure criterion is therefore
$$
\mathcal{R}_{\mathrm{CMB}}(\theta)
+
\lambda_{\mathrm{phase}}\mathcal{R}_{\mathrm{phase}}(\theta)
+
\lambda_V\mathcal{R}_{V}(\theta)
+
\lambda_{\mathrm{lens}}\mathcal{R}_{\mathrm{lens}}(\theta)
+
\lambda_{\mathrm{smooth}}\mathcal{R}_{\mathrm{smooth}}(\theta)
+
\lambda_{\mathrm{range}}\mathcal{R}_{T,\mathrm{range}}(\theta)
\le
\varepsilon_{\mathrm{CMB}},
$$
with $\lambda_{\mathrm{phase}}$, $\lambda_V$, $\lambda_{\mathrm{lens}}$, $\lambda_{\mathrm{smooth}}$, $\lambda_{\mathrm{range}}$, and $\varepsilon_{\mathrm{CMB}}$ declared by the data release or simulation protocol. Passing this test would mean that the same medium-and-assembly history recovers TT/TE/EE, blackbody behavior, scalar/tensor bounds, acoustic phase coherence, vector-mode suppression, CMB-lensing reconstruction, the low effective gravitational free-mode budget, and any declared finite-range comparison branch without changing ontology between modules.

#### Forward Prediction Map

Use one continuous causal map:

medium state evolution $\rightarrow$ pre-decoupling coupled modes $\rightarrow$ decoupling transfer history $\rightarrow$ observed TT/TE/EE structure.

Interpretation and microphysical origin are re-grounded in assembly dynamics while retaining the same observer-level prediction objects.

#### Conceptual Mapping

- Peak spacing reflects effective horizon/coupling scales of the medium.
- Odd/even contrast reflects baryon-like loading relative to photon assemblies.
- High-$\ell$ damping reflects decoupling-era diffusion/opacity analogs.
- Polarization structure reflects phase relations in coupled oscillations.

#### Source-Interpretation Neutrality

Whether the background is read through a primarily primordial-origin interpretation or a distributed-emission interpretation, the prediction layer is one shared parameterization of the same observables.

So source narrative is an interpretation layer, not a change in the prediction target: TT/TE/EE structure, damping behavior, and blackbody character remain part of one coherent readout.

#### Redshift and Clock Link

CMB frequency scaling to present observers is interpreted through medium evolution plus environment-dependent clock-rate comparison, consistent with the expansion-mechanism framing:

$$
\frac{d\tau}{dt}=F\!\left(\mathbf{v},\rho_{\text{core}}(\mathbf{x},t),\Phi_{\text{eff}},\text{clock geometry}\right).
$$

So CMB temperature/redshift summaries remain usable while their mechanism is grounded in assembly-medium dynamics.

#### Dark-Sector and Growth Link

- Neutral-assembly loading and medium response both contribute to how pre-decoupling oscillations map into late-time inferred matter amplitudes.
- This keeps CMB interpretation consistent with the shared $H_0$/$S_8$ narrative rather than splitting background and growth into separate ontologies.

#### Parameter Bridges

- Keep effective $N_{\text{eff}}$ language connected to neutrino/sea coupling history.
- Keep baryon-loading and damping-tail language connected to the same reaction/transport background used in BBN framing.

## Dark Matter

This chapter maps the standard dark-matter phenomenology onto substrate candidates available inside the architrino ontology. The central task is to explain gravitational clustering without visible electromagnetic coupling, using assemblies or medium responses that belong to the same [Euclidean-void](../../../../markdown/aaa/foundations/euclidean-void.md) and [Noether-Sea](../../../../markdown/aaa/spacetime/spacetime-assemblies.md) framework as the rest of the theory.

The opening establishes the ontology and the criteria for what counts as dark in this setting. The later sections compare candidate substrates, summarize the current hybrid working baseline, and connect the picture to cosmological growth and observational interfaces.

### Scope and Purpose

Standard $\Lambda\mathrm{CDM}$ cosmology attributes roughly 27% of the present energy budget to cold dark matter (CDM)—a pressureless, non-baryonic component that clusters gravitationally but couples negligibly to electromagnetic radiation. This chapter maps dark-matter phenomenology onto the architrino assembly architecture and identifies candidate substrates.

Throughout, "dark matter" refers to the set of phenomena conventionally attributed to CDM: flat galaxy rotation curves, cluster lensing offsets, the third acoustic peak of the CMB, large-scale structure growth, and BBN-consistent $\Omega_b$. The task is to explain this phenomenology within one ontology—Euclidean void, absolute time, architrinos, and tri-binary assemblies—without importing new fundamental fields or ad hoc modifications to gravity.

### $\mathbb{A}\mathbb{A}\mathbb{A}$ Ontology Foundations

#### The Noether Sea as Gravitational Medium

In the architrino framework, the Euclidean void is populated by the Noether Sea, a dense coupled population of neutral tri-binary assemblies. Each tri-binary consists of three nested electrino–positrino binaries (inner, middle, outer), with net charge zero and internal dynamics spanning the three field-speed regimes ($v > c_f$, $v = c_f$, $v < c_f$). Gravity is not a fundamental force but an emergent medium-response effect: local variations in Noether-core density $\rho_{\text{core}}(\mathbf{x},t)$ and normalized density $n(\mathbf{x},t)$ alter the Noether-Sea delay factor $\chi_{\text{sea}}$ and the transmission of delayed causal flux, producing geodesic deviation and an effective metric $g_{\mu\nu}$ experienced by all assemblies.

Massive composite assemblies (protons, atoms, stars) are tri-binary configurations with axial layers; they locally compress the Noether Sea, increasing $\rho_{\text{core}}$ and changing $\chi_{\text{sea}}$ for effective signal propagation. This compression is the substrate-level origin of the Newtonian potential $\Phi_N$ in the weak-field limit. The effective gravitational constant $G$ is related to the medium compliance—how readily the Sea density responds to stress from embedded matter (see [spacetime/emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md)).

#### What Counts as "Dark" in this Ontology

A dark-matter candidate in $\mathbb{A}\mathbb{A}\mathbb{A}$ is characterized by two conditions:

- **Gravitational coupling:** The candidate must compress the Noether Sea (contribute to effective $\rho_{\text{core}}$ and $n$ gradients) and therefore deflect light and accelerate baryonic matter.
- **Electromagnetic transparency:** The candidate must couple negligibly to photon assemblies modeled as coaxial contra-rotating pro/anti planar pairs so that it neither emits, absorbs, nor scatters electromagnetic radiation at detectable levels.

Two substrate-level mechanisms can satisfy these conditions, either separately or together.

#### Strong-Lensing Inference Guardrail

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

#### CMB-Lensing Inference Guardrail

CMB lensing supplies a different but equally important dark-sector constraint. It does not image a local cluster mass distribution. It reconstructs the integrated lensing potential between the last-scattering surface and the observer from distortions of the microwave background. In standard comparison language the data product is the lensing-potential spectrum $C_L^{\phi\phi}$, and the dark-sector interpretation enters only after a model maps that spectrum to a matter distribution and growth history.

For $\mathbb{A}\mathbb{A}\mathbb{A}$, the conservative requirement is therefore two-stage:

1. recover the CMB-lensing observable $C_L^{\phi\phi}$ from the same CMB history used for TT/TE/EE, damping, and blackbody preservation;
2. project that lensing record into the same neutral-assembly density $\rho_A$, Noether-core density $\rho_{\text{core}}(\mathbf{x},t)$, and medium-response variables used by the structure-formation module.

A dark-matter interpretation fails if it treats CMB lensing as direct proof of one substrate while using a different medium state to fit galaxy clustering, weak lensing, or cluster offsets.

#### Cluster-Offset Inference Gate

Cluster mergers such as the Bullet Cluster are high-pressure dark-sector tests because gravitational lensing, X-ray gas, and galaxy-light distributions separate during the event. They are not, however, direct photographs of a substrate. The retained data product is the ensemble of local lensing constraints, centroid offsets, gas-dynamical records, galaxy-tracer distributions, line-of-sight priors, and covariance assumptions used to infer the mass map.

For a candidate medium record $\theta_{\mathrm{sea}}$ and neutral-assembly density $\rho_A$, let $\mathcal{P}_{\mathrm{cl}}(\theta_{\mathrm{sea}},\rho_A)$ project the model into that cluster-observable packet. A compact cluster-offset residual is

$$
\mathcal{R}_{\mathrm{cl\ offset}}(\theta_{\mathrm{sea}},\rho_A)
=
\left\lVert
D_{\mathrm{cl}}^{\mathrm{obs}}
-
\mathcal{P}_{\mathrm{cl}}(\theta_{\mathrm{sea}},\rho_A)
\right\rVert_{C_{\mathrm{cl}}^{-1}}^2
+
\mathcal{R}_{\mathrm{lens\ prior}}
+
\mathcal{R}_{\mathrm{gas}}
+
\mathcal{R}_{\mathrm{shared}}(\theta_{\mathrm{sea}}).
$$

Here $D_{\mathrm{cl}}^{\mathrm{obs}}$ is the retained cluster-offset data packet and $C_{\mathrm{cl}}$ records the covariance of the lensing, gas, and tracer reconstruction. The residual should be evaluated across an ensemble of merging clusters, not treated as a one-image proof. A pure medium-response branch fails this gate only when

$$
\inf_{\theta_{\mathrm{sea}}:\rho_A=0}
\mathcal{R}_{\mathrm{cl\ offset}}(\theta_{\mathrm{sea}},0)
>
\varepsilon_{\mathrm{cl}},
$$

with the same lensing priors, gas model, and shared medium-state record used to test the neutral-assembly or hybrid branch. Passing the gate does not by itself prove a collisionless neutral-assembly interpretation; it shows that the candidate branch has recovered the cluster-offset observable without changing the inference stack per system.

#### Shared Dark-Sector Scale Gate

Some quantum-gravity comparison programs try to relate the dark-matter and dark-energy problems through one scale. In this chapter that signal is useful only as a closure discipline. The $\mathbb{A}\mathbb{A}\mathbb{A}$ claim is not that dark matter and dark energy are one imported object; it is that any proposed relation between them must be carried by the same Noether-Sea state record used by the dark-energy, growth, lensing, and CMB modules.

Let $\theta_{\mathrm{sea}}$ be the shared medium-state record, let $\Pi_{\mathrm{DE}}\theta_{\mathrm{sea}}$ be its dark-energy projection, and let $\Pi_{\mathrm{DM}}\theta_{\mathrm{sea}}$ be its dark-matter projection. If a candidate relation $F_{\mathrm{DM}}$ maps the dark-energy-side projection into the dark-matter-side variables, a minimal shared-scale residual is

$$
\mathcal{R}_{\mathrm{dark\ scale}}(\theta_{\mathrm{sea}})
=
\left\lVert
\Pi_{\mathrm{DM}}\theta_{\mathrm{sea}}
-
F_{\mathrm{DM}}\!\left(\Pi_{\mathrm{DE}}\theta_{\mathrm{sea}}\right)
\right\rVert_{C_{\mathrm{DM/DE}}^{-1}}^2
+
\mathcal{R}_{\mathrm{shared}}(\theta_{\mathrm{sea}}).
$$

Here $C_{\mathrm{DM/DE}}$ is the covariance or weighting model for the joint dark-sector comparison, and $\mathcal{R}_{\mathrm{shared}}$ is the shared calibration residual from [Dark Energy](../../../../markdown/aaa/cosmology/dark-energy.md#inference-dependency-and-calibration-gates). A dark-sector scale relation is promotable only if this residual stays small without assigning one Noether-Sea state to dark-energy data and another to dark-matter data. If the relation fits one observable family by changing $\theta_{\mathrm{sea}}$ for another, it remains an interpretation artifact rather than a substrate claim.

### Candidate Substrates

#### Candidate A — Neutral Assembly Populations

**Definition.** Neutral tri-binary assemblies that lack exposed charged polar sites in their axial layers. The minimal examples are:

- **Neutrino-class assemblies:** Pro-tri-binary cores with balanced axial layers ($3P,3E$). These are the SM neutrinos themselves; their masses ($\sum m_\nu < 0.12$ eV from cosmological bounds) are too small to account for the full $\Omega_{\mathrm{DM}}$, but they contribute to the hot dark-matter fraction and to $N_{\mathrm{eff}}$.

- **Heavier neutral assemblies (hypothetical):** Tri-binary cores carrying axial patterns that are globally neutral and whose internal dynamics suppress electromagnetic coupling below detection thresholds. In $\mathbb{A}\mathbb{A}\mathbb{A}$ these would be assemblies whose axial layers cancel in both net charge and oscillating dipole moment, analogous to the neutrino's balanced axial layer but realized on a heavier core (e.g., a bi-binary or uni-binary core with an appropriately locked axial layer, or a multi-core composite). The mass scale is set by the core's internal binding energy, shielding, and medium-dressed response to the Noether Sea.

- **Primordial Noether-core defects:** Dense, self-gravitating clusters of maximally contracted tri-binaries produced in the high-energy epoch—analogous to primordial black holes in standard cosmology but with internal Planck-core structure replacing singular interiors. Their mass spectrum depends on formation-epoch dynamics. The analogy is a benchmark, not an identification: a native defect branch would have to inherit the compact-object mass-function, BBN/CMB/growth, local-ephemeris, high-energy-flux, and null-result checks without importing primordial-black-hole ontology.

**Behavior.** These assemblies are pressureless at late times (kinetic energy $\ll$ rest energy), cluster gravitationally, and are collisionless on galactic scales because their interaction cross-section with baryonic and electromagnetic assemblies is negligible (no exposed charge → no long-range dipole coupling). They therefore reproduce the canonical CDM clustering phenomenology: hierarchical structure formation, flat rotation curves from halo profiles, and the correct matter-loading signature in the CMB.

In a cluster-merger interpretation, neutral assemblies remain collisionless while baryonic gas assemblies decelerate electromagnetically, yielding natural separation between gravitating and X-ray-bright components.

Compact neutral candidates also have a local-detection gate. For a candidate branch with representative mass $M_A$, local fraction $f_A$, and relative speed distribution centered at $\langle v_{\mathrm{rel}}\rangle$, the expected flyby rate inside impact parameter $b_{\max}$ is estimated by
$$
\Gamma_{\mathrm{flyby}}(b_{\max},M_A)
=
\frac{f_A\rho_{\mathrm{DM}}}{M_A}\,
\pi b_{\max}^2\,
\langle v_{\mathrm{rel}}\rangle.
$$
A nearby passage gives the order-of-magnitude impulse
$$
\Delta v_{\mathrm{test}}
\simeq
\frac{2GM_A}{b\,v_{\mathrm{rel}}},
$$
before detailed $N$-body and relativistic corrections. The retained observable is the ephemeris residual, not the compact-object interpretation: a candidate detection must produce a trajectory-consistent perturbation above the ranging error floor, fail ordinary visible-object and catalogued-asteroid explanations under the same covariance model, and carry any high-energy co-signature through the same branch record.

#### Candidate B — Noether-Sea Medium Response

**Definition.** Non-linear elastic or dispersive response of the Noether Sea itself under low-acceleration or low-density-gradient conditions. In regions where the effective gravitational acceleration falls below a characteristic scale $a_0$, the medium's compliance (inverse stiffness) may change, altering the effective force law.

**Mechanism sketch.** Each Noether-Sea tri-binary has a minimum restoring-force threshold set by the outer-binary binding. Below the corresponding acceleration scale, the medium deforms more easily per unit stress—the effective $G$ increases with decreasing acceleration. This is structurally analogous to MOND ($\mu(a/a_0)\,a = a_N$) but derived from assembly elasticity rather than postulated. In the corrected master-law picture, part of this response can be understood as a constitutive shift in how the medium organizes Jacobian-weighted delayed flux under low-strain conditions: the same source population can produce a different received effective pull when branch geometry and local contraction state change. The transition function $\mu$ would then emerge from the outer-binary response curve as a function of the local strain rate $\nabla\Phi / a_0$.

**Characteristic scale.** The MOND acceleration $a_0 \approx 1.2 \times 10^{-10}\;\mathrm{m\,s}^{-2}$ is suggestively close to $c H_0 / (2\pi)$. In $\mathbb{A}\mathbb{A}\mathbb{A}$, this coincidence could reflect a connection between the outer-binary expansion/contraction timescale (set by the cosmological evolution of the Noether Sea) and the local stiffness threshold. This is a mapping target, not a derived result.

**Limitations.** A pure medium-response account faces well-documented difficulties:
- Reproducing cluster-scale lensing/gas centroid separation without a collisionless component.
- Matching acoustic-peak matter loading in pre-decoupling dynamics.
- Producing the correct large-scale transfer-function shape in $P(k)$.

These difficulties motivate retaining Candidate A as the primary dark-matter substrate, with Candidate B contributing corrections.

#### Candidate C — Hybrid (Working Baseline)

**Definition.** Neutral assemblies carry the dominant non-baryonic gravitating mass ($\Omega_{\mathrm{DM}} \sim 0.25$), while Noether-Sea medium response provides scale-dependent corrections that modify effective profiles in low-acceleration environments.

**Rationale.** This hybrid is the working baseline because:

- Neutral assemblies handle the heavy lifting: CMB matter loading, large-scale power spectrum, cluster-merger offset behavior, and BBN consistency ($\Omega_b$ remains small).
- Medium response can address observed tensions at galaxy scale—the diversity of rotation-curve shapes, the radial-acceleration relation (RAR) tightness, and possible deviations from pure NFW profiles—without introducing additional free parameters per galaxy.
- The two contributions arise from the same ontological substrate (tri-binary assemblies in Euclidean void with absolute time) and are coupled: neutral assemblies compress the Sea, which in turn responds non-linearly, feeding back on the effective potential.
- If residual discrepancies concentrate in regions of strong Noether-Sea contraction or steepening contraction gradient, especially toward galactic centers and SMBH environments, that pattern would be naturally suggestive of medium-response contributions rather than of an entirely separate particulate sector.

#### Why Hybrid Is Required (Closure Summary)

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

### Regime Map

The hybrid baseline yields a unified regime architecture:

| Environment | Dominant mechanism | Effective description |
|:---|:---|:---|
| CMB / $z > 100$ | Neutral assemblies | CDM-like: pressureless, collisionless |
| BAO / $10 < z < 100$ | Neutral assemblies + linear medium | CDM + small corrections |
| Cluster scales / $z \sim 0$ | Neutral assemblies (collisionless) | NFW-like profiles; Bullet Cluster offset |
| Galaxy outer regions / low $a$ | Hybrid: assemblies + medium response | RAR tightness; rotation-curve diversity |
| Dwarf galaxies / ultra-low $a$ | Medium response dominant | Possible core-vs-cusp modification |

The boundaries between regimes are set by the ratio $|\nabla\Phi|/a_0$ and the local Noether-Sea density gradient. These are continuous transitions within one ontology, not patched models.

### SMBH Recycling and Dark-Sector Flow

In $\mathbb{A}\mathbb{A}\mathbb{A}$ cosmology, supermassive black holes (SMBHs) are recycling furnaces: baryonic and dark-sector assemblies fall in, are processed through the high-energy interior (inner tri-binary regime, $v > c_f$), and may later re-emerge through several release channels in altered assembly configurations. Jets and radiative outflows remain plausible observer-level manifestations, but they are not the only allowed release morphology. This cycle has implications for the dark sector:

- **Neutral-assembly processing:** If neutral assemblies accrete onto SMBHs, they contribute to the energy budget available for outward release. Re-emitted content may include photons (coaxial contra-rotating pro/anti planar-pair modes), neutrinos, recycled neutral assemblies, or initially dark-sector modes that later convert into visible channels.
- **Dark-sector mass evolution:** Unlike pure $\Lambda\mathrm{CDM}$ where dark matter is strictly conserved and collisionless, $\mathbb{A}\mathbb{A}\mathbb{A}$ permits slow conversion between dark and visible sectors through SMBH processing. This conversion rate must be small enough to preserve $\Omega_{\mathrm{DM}}$ to within Planck-era constraints over cosmological timescales, which places an upper bound on the SMBH dark-matter accretion efficiency.
- **Observable signature (speculative):** If SMBH recycling converts neutral assemblies into electromagnetic-channel products at non-negligible rates, this could produce a correlation between SMBH mass and local dark-matter deficit. This is a mapping target for simulation, not an asserted observational deviation.

### Candidate Assembly Properties

#### Mass Scale

The neutral-assembly mass is not a free parameter to be fitted post hoc; it must emerge from the assembly's internal energy ledger, shielding factor, and medium-dressed response to the Noether Sea. This is an inertial and gravitational response map, not ordinary dissipative drag. Candidate mass ranges, mapped to observational constraints:

- $m \sim$ eV: warm dark matter; suppresses small-scale structure.
- $m \sim$ keV–GeV: canonical cold dark matter window.
- $m \sim$ GeV–TeV: WIMP-like regime.
- $m \gg$ TeV: superheavy; must be produced non-thermally (e.g., gravitational production or SMBH-related formation in early epochs).

The $\mathbb{A}\mathbb{A}\mathbb{A}$ framework does not currently predict a unique mass; deriving the mass spectrum from first-principles tri-binary binding energies and formation rates is a high-priority simulation target.

A superheavy neutral-lepton comparison branch is useful only as a benchmark, not as imported ontology. In that comparison, a sterile or right-handed singlet near $m_{\nu_R}\sim4.8\times10^8\;\mathrm{GeV}$ behaves as cold, collisionless dark matter if it is stable, decoupled from visible channels, and produced with the observed abundance. The corresponding $\mathbb{A}\mathbb{A}\mathbb{A}$ acceptance record would have to close
$$
\mathcal{B}_{\nu_R\mathrm{DM}}
=
\left(
m_{\nu_R},
\tau_{\nu_R},
\Omega_{\nu_R}h^2,
\lambda_{\mathrm{fs}},
\sigma_{\mathrm{vis}},
\Delta N_{\mathrm{eff}}
\right),
$$
with
$$
\tau_{\nu_R}\gg t_0,
\qquad
\Omega_{\nu_R}h^2\to\Omega_{\mathrm{DM}}h^2,
\qquad
\lambda_{\mathrm{fs}}\ll \lambda_{\mathrm{LSS}},
\qquad
\sigma_{\mathrm{vis}}\le\sigma_{\max},
\qquad
\Delta N_{\mathrm{eff}}\in\mathcal{B}_{\mathrm{BBN/CMB}}.
$$
Failure of any row keeps the branch external to the working dark-matter ontology. Passing these rows would still not identify the branch with the current neutral-assembly baseline unless the same internal-energy, shielding, and Noether-Sea response map derives its mass and coupling suppression.

#### Interaction Cross-Sections

Neutral assemblies interact with each other and with baryonic matter only through:

- **Gravitational coupling** (Noether-Sea compression): always present; sets halo profiles.
- **Residual short-range coupling:** If the neutral assembly has any non-zero higher-multipole moment (e.g., a quadrupole from internal binary precession), there is a short-range van-der-Waals-like interaction scaling as $r^{-7}$ or steeper. The self-interaction sector can then carry nontrivial velocity dependence.

#### Stability

The neutral-assembly candidate must be cosmologically stable: lifetime $\tau \gg t_0 \approx 13.8$ Gyr. In $\mathbb{A}\mathbb{A}\mathbb{A}$, stability follows from the same topological arguments that stabilize the proton: the assembly occupies a deep attractor basin in tri-binary configuration space, and all dissociation channels either violate charge/polarity conservation or require energy input exceeding the cosmological temperature.

### Cosmology Integration

#### Pre-Decoupling ($z \gtrsim 1100$)

Neutral assemblies contribute to the total matter density:

$$
\Omega_m = \Omega_b + \Omega_A, \quad \Omega_A \approx 0.25.
$$

Their gravitational effect on photon-baryon oscillations produces the characteristic signature in the [CMB](../../../../markdown/aaa/cosmology/CMB.md) power spectrum: suppression of odd peaks (baryon loading) with the overall amplitude and peak-height ratios set by $\Omega_A/\Omega_b$.

#### Post-Decoupling Growth

Matter perturbations grow as $\delta \propto a$ in the matter-dominated era. The $\mathbb{A}\mathbb{A}\mathbb{A}$ growth equation in the Newtonian limit reads:

$$
\ddot{\delta}_A + 2H\dot{\delta}_A = 4\pi G_{\mathrm{eff}}\,\rho_m\,\delta_m,
$$

where $\rho_m = \rho_b + \rho_A$ and $G_{\mathrm{eff}}$ may carry scale-dependent corrections from the medium response. In the high-acceleration (linear) regime, $G_{\mathrm{eff}} \to G_N$ and standard CDM growth is recovered. Deviations from $\Lambda\mathrm{CDM}$ growth appear only when $|\nabla\Phi|/a_0 \lesssim 1$, which on cosmological scales ($k < 0.01\;h\,\mathrm{Mpc}^{-1}$) may be relevant at low redshift and could contribute to resolving the $S_8$ tension.

#### BAO and Matter Power Spectrum

The matter power spectrum $P(k)$ encodes the transfer function through matter-radiation equality and the BAO wiggles imprinted at decoupling. The neutral-assembly contribution sets the shape of $P(k)$ on scales $k > k_{\mathrm{eq}}$, where $k_{\mathrm{eq}} \propto \Omega_m h^2$.

#### $H_0$ and $S_8$ Tensions

The $\mathbb{A}\mathbb{A}\mathbb{A}$ hybrid baseline offers two potential handles on current cosmological tensions:

- **$H_0$ tension:** If neutral-assembly properties (e.g., a non-zero but small self-interaction or a late-time dissociation channel) modify distance-ladder or sound-horizon inference differently from pure CDM, the inferred $H_0$ can shift through one mechanism family.
- **$S_8$ tension:** Scale-dependent medium response can suppress late-time growth at $k \sim 0.1$–$1\;h\,\mathrm{Mpc}^{-1}$, lowering $\sigma_8$ relative to early-time inference while leaving pre-decoupling structure largely unchanged.

### Growth-Module Interface

In the modular cosmology architecture, this chapter connects to other modules through:

- **Input to [CMB.md](../../../../markdown/aaa/cosmology/CMB.md):** $\Omega_A h^2$, neutral-assembly equation of state $w_A(z)$ (expected: $w_A = 0$ for CDM-like behavior), and any $\Delta N_{\mathrm{eff}}$ contribution.
- **Input to [structure-formation.md](../../../../markdown/aaa/cosmology/structure-formation.md):** $G_{\mathrm{eff}}(a,k)$ from medium-response constitutive relation; neutral-assembly self-interaction cross-section $\sigma(v)/m$.
- **Input from [expansion-mechanism.md](../../../../markdown/aaa/cosmology/expansion-mechanism.md):** $H(z)$ and $\Omega_m(z)$ for growth-equation integration.
- **Input from [BBN-constraints.md](../../../../markdown/aaa/cosmology/BBN-constraints.md):** $N_{\mathrm{eff}}$ bound constraining allowed neutral-assembly species at MeV temperatures.

All interfaces use the same absolute-time / Euclidean-space substrate and the same Noether-Sea state variables, ensuring ontological consistency across modules. The cosmology-level framing for those shared interfaces lives in [Cosmology Ontology](../../../../markdown/aaa/cosmology/cosmology-ontology.md).

### Summary

Dark-matter phenomenology in the architrino assembly architecture is attributed to a hybrid of two mechanisms arising from the same tri-binary substrate:

- **Neutral assemblies** (Candidate A): electromagnetically transparent tri-binary configurations that cluster gravitationally, reproducing CDM-like behavior at cluster and cosmological scales.
- **Noether-Sea medium response** (Candidate B): non-linear elastic corrections to effective gravity at low accelerations, providing scale-dependent modifications relevant to galaxy-scale phenomenology.

The working baseline is the hybrid (Candidate C), with neutral assemblies carrying the dominant mass fraction and medium response supplying corrections. Deriving the neutral-assembly mass spectrum, interaction cross-sections, and medium constitutive relations from the master equation is the critical open program.

## Dark Energy

This chapter treats dark energy as a medium-state problem inside the Noether Sea rather than as literal expansion of the Euclidean void. Its job is to map the standard late-time acceleration data onto substrate evolution, effective equation-of-state language, and possible large-scale energy-partition mechanisms within $\mathbb{A}\mathbb{A}\mathbb{A}$.

The opening sections state the ontology and the medium-level interpretation of accelerated expansion. Later sections connect that picture to effective Friedmann variables, redshift, black-hole recycling ideas, and the practical module interface for cosmological closure.

### Scope and Purpose

Standard $\Lambda\mathrm{CDM}$ cosmology attributes roughly 68% of the present energy budget to dark energy—a component with equation-of-state parameter $w \approx -1$ that drives late-time accelerated expansion. The simplest realization is a cosmological constant $\Lambda$, which enters Einstein's field equations as a geometric term equivalent to a constant vacuum energy density $\rho_\Lambda = \Lambda c^2 / (8\pi G) \approx 5.96 \times 10^{-27}\;\mathrm{kg\,m^{-3}}$.

This chapter maps dark-energy phenomenology onto the architrino assembly architecture. The central claim is that late-time acceleration is not the expansion of the Euclidean void itself—which is fixed, non-dynamical, and does not stretch—but a macroscopic readout of the evolving internal state of the Noether Sea. The task is to identify the substrate-level mechanism and derive the effective equation of state. Within that program, black holes are treated as one possible mediator of the large-scale energy-partition history, not as a replacement for the medium ontology itself.

### $\mathbb{A}\mathbb{A}\mathbb{A}$ Ontology Foundations

#### The Void Does Not Expand

The Euclidean void $\mathbb{R}^3$ with metric $h_{ij} = \delta_{ij}$ is static, homogeneous, isotropic, and non-dynamical (Postulate 2). It does not curve, stretch, or respond to energy content. Cosmological "expansion" in the $\mathbb{A}\mathbb{A}\mathbb{A}$ framework refers exclusively to the dynamical evolution of the assemblies that populate the void—not to any change in the void's geometry.

#### The Noether Sea Carries the Dynamics

The Noether Sea is the constitutive medium from which effective spacetime behavior is reconstructed: a dense coupled population of neutral pro/anti tri-binary pairs. Each tri-binary has internal energy stored across three nested binaries operating in distinct field-speed regimes. The collective state of this medium—its local Noether-core density $\rho_{\text{core}}(\mathbf{x},t)$, normalized density $n(\mathbf{x},t)$, internal energy spectrum, delay response $\chi_{\text{sea}}$, and anisotropy—defines the effective metric experienced by all embedded assemblies.

Late-time cosmological acceleration, in this picture, is a statement about how the aggregate properties of the Noether Sea evolve on Hubble timescales, not about the container expanding.

### Medium-State Interpretation of Accelerated Expansion

#### Baseline Energy of the Noether Sea

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

#### Why Negative Pressure?

In standard thermodynamics, a system with equation of state $w = p/\rho < -1/3$ drives acceleration of the scale factor. In the $\mathbb{A}\mathbb{A}\mathbb{A}$ framework, the Noether Sea can exhibit effective negative pressure through the following mechanism:

**Outer-binary tension.** Each tri-binary's outer binary is a bound oscillator in the $v < c_f$ regime. The outer binary has a natural equilibrium radius set by the balance between partner attraction and coupling to the medium. When the mean inter-core spacing increases (due to matter dilution as structure forms and baryonic assemblies aggregate into galaxies), the outer binaries of neighbouring Noether-Sea cores are stretched beyond equilibrium. This stretching stores elastic energy and produces a restoring stress—a tension—that acts to resist further separation.

A uniform medium under tension has the thermodynamic signature $p < 0$. If the magnitude of the tension exceeds $\rho c^2/3$, the effective equation of state satisfies $w < -1/3$, which drives acceleration.

**Self-consistency requirement.** The tension must be nearly constant in time (slowly varying) to produce $w \approx -1$ rather than a rapidly oscillating or decaying equation of state. This requires that the outer-binary relaxation timescale is comparable to or longer than the Hubble time:

$$
\tau_{\mathrm{relax}}^{\mathrm{outer}} \gtrsim H_0^{-1} \approx 1.4 \times 10^{10}\;\mathrm{yr}.
$$

This sets a strong dynamical condition on outer-binary relaxation.

#### Medium Relaxation and the Expansion History

The evolution of $\rho_{\mathrm{DE,eff}}(t)$ is governed by the collective relaxation of the Noether-Sea state. Schematically:

- At early times ($z \gg 1$), the medium is dense and hot; outer binaries are contracted, and the effective dark-energy contribution is subdominant relative to matter and radiation energy densities.
- As the medium cools and dilutes through structure formation and radiation escape, outer binaries relax toward larger radii. The associated tension becomes dynamically significant when $\rho_{\mathrm{DE,eff}} \sim \rho_m$, which occurs at $z \sim 0.3$–$0.7$ (the onset of acceleration).
- At late times ($z \to 0$), the medium approaches a quasi-equilibrium state with slowly evolving tension, producing an approximately constant $\rho_{\mathrm{DE,eff}}$ and $w \approx -1$.

This narrative must be made quantitative through a constitutive relation linking the Noether-Sea state variables to an effective pressure. The minimal parameterization is:

$$
p_{\mathrm{sea}} = p_{\mathrm{sea}}\bigl(\rho_{\text{core}},\;\dot{\rho}_{\text{core}},\;n,\;\chi_{\text{sea}},\;\langle R_{\mathrm{outer}} \rangle,\;T_{\mathrm{eff}}\bigr),
$$

where $\langle R_{\mathrm{outer}} \rangle$ is the mean outer-binary radius and $T_{\mathrm{eff}}$ is an effective temperature characterizing internal mode excitation. Deriving this relation from the master equation applied to coupled tri-binary populations is a primary simulation target.

### Inference Dependency and Calibration Gates

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

Here $r_X$ is the residual vector for observable family $X$, $\nu_X$ records nuisance and calibration variables, $C_X$ is the covariance model, and $\Pi_X$ projects the shared medium-state record into the variables consumed by that observable family. A dark-energy interpretation is promotable only if both the ordinary residuals and the cross-projection penalty can be controlled without replacing $\theta_{\mathrm{sea}}$ separately for each pipeline. The first mock validation artifact for this gate is [Cosmology Shared Residual Fit Protocol](../../../../markdown/aaa/validation/simulations/cosmology-shared-residual-fit.md).

#### Thermodynamic $\Lambda_{\mathrm{eff}}$ Closure Target

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

### Effective Friedmann Framework

#### Background Equations

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

#### Equation of State: Effective Descriptor

The equation-of-state parameter

$$
w = \frac{p}{\rho}
$$

is treated as an emergent summary of the medium state, not as a fundamental ontological quantity. In lowest-order fits, $w \approx -1$ is admissible as an effective description while the underlying mechanism remains medium-based. Time variation can be parameterized in the standard $w_0$–$w_a$ form:

$$
w(a) = w_0 + w_a(1-a),
$$

with $a = 1/(1+z)$ the effective scale factor (defined operationally through the redshift of photon-mode assemblies).

#### Observed Equation of State and Medium Accounting

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

#### de Sitter and Phantom-$w$ Comparison

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

### The Cosmological-Constant Problem

#### The Hierarchy as an Ontology Mismatch

In standard QFT, summing zero-point energies of all field modes up to some cutoff $\Lambda_{\mathrm{UV}}$ produces a vacuum energy density

$$
\rho_{\mathrm{vac}}^{\mathrm{QFT}} \sim \frac{\Lambda_{\mathrm{UV}}^4}{\hbar^3 c^5},
$$

which for $\Lambda_{\mathrm{UV}} = M_{\mathrm{Pl}}c$ exceeds the observed $\rho_\Lambda$ by $\sim 120$ orders of magnitude. This is the cosmological-constant problem.

In the $\mathbb{A}\mathbb{A}\mathbb{A}$ framework, the problem is reframed as an ontology mismatch:

- QFT zero-point energies are not physical observables of the Euclidean void (which carries no energy). They are artifacts of the continuum-field approximation applied to a substrate that is fundamentally discrete (point architrinos) and finite (a definite number of tri-binary assemblies per unit volume).
- The inner and middle binaries of each Noether-Sea tri-binary store enormous energy densities locally (self-hit regime, $v > c_f$ and $v = c_f$), but this energy is locked into stable, high-frequency orbital modes that do not gravitate as a cosmological constant. Only the slowly varying, large-scale stress from the outer-binary sector contributes to $\rho_{\mathrm{DE,eff}}$.
- The observed smallness of $\rho_\Lambda$ relative to naïve QFT estimates reflects the fact that most internal tri-binary energy is dynamically inert on Hubble timescales—it is shielded by the nested-binary hierarchy, not canceled by fine-tuning.

#### Coupling-Selection Target

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

#### Comparison to Sequestering and Degravitation Proposals

The $\mathbb{A}\mathbb{A}\mathbb{A}$ mechanism is structurally similar to vacuum-energy sequestering proposals (Kaloper & Padilla 2014) in which high-energy modes are dynamically decoupled from the gravitational sector. The key difference is that $\mathbb{A}\mathbb{A}\mathbb{A}$ provides a concrete physical mechanism for the decoupling (nested-binary shielding) rather than imposing it through a global constraint or modified variational principle.

Finite-range gravity and massive-gravity programs are useful here only as comparison frameworks. Their durable lesson is not that the Noether Sea should contain a massive graviton, but that any large-scale weakening of gravity must pass a local-recovery gate: solar-system, binary-pulsar, lensing, and gravitational-wave regimes must remain GR-like while a cosmological-scale response is allowed to differ. In $\mathbb{A}\mathbb{A}\mathbb{A}$ terms, that burden belongs to the same Noether-Sea constitutive map that sets $G_{\text{eff}}$, $\chi_{\text{sea}}$, clock-rate response, and growth history. A degravitation-like dark-energy channel is admissible only if the shielding residual is suppressed at the effective cosmological scale without weakening the already validated weak-field and gravitational-wave channels.

### Redshift as Clock Comparison

#### Mechanism

In the $\mathbb{A}\mathbb{A}\mathbb{A}$ framework, cosmological redshift is not caused by the stretching of space (the void does not stretch) but by the comparison of clocks at emission and reception:

- A photon-mode assembly emitted at cosmic time $t_e$ carries a frequency set by the tri-binary oscillation rates of the source assembly at that epoch.
- At reception time $t_0$, the observer's local clock rate is set by the current Noether-Sea state.
- If the Noether-Sea state has evolved between $t_e$ and $t_0$—specifically, if outer-binary radii have increased and internal frequencies have decreased—then the received frequency is lower than the emitted frequency. This is the operational content of $1 + z = \nu_e/\nu_0$.

The redshift-distance relation $z(d_L)$ encodes the entire history of Noether-Sea state evolution along the photon's path. In the effective Friedmann description, this is captured by:

$$
d_L(z) = (1+z)\int_0^z \frac{c\,dz'}{H(z')},
$$

which serves as the effective expansion-history map used by observers.

#### Tired-Light Exclusion

This mechanism is distinct from classical tired-light proposals. In tired light, photons lose energy through scattering or absorption, producing:
- Image blurring (not observed),
- Time-dilation violations (SN Ia light curves confirm $\Delta t \propto (1+z)$),
- Modified surface-brightness relations (Tolman test).

The $\mathbb{A}\mathbb{A}\mathbb{A}$ mechanism does not involve photon energy loss in transit. The photon assembly propagates through the Noether Sea without degradation (in the weak-field, low-density limit); the frequency difference arises from the evolving calibration of source and receiver clocks. This reproduces the standard $(1+z)$ time-dilation signature and is consistent with Tolman surface-brightness tests.

### SMBH Recycling and Energy Flow

Supermassive black holes process matter and radiation through their high-energy interiors. In the $\mathbb{A}\mathbb{A}\mathbb{A}$ picture, this recycling has implications for the dark-energy sector:

- **Energy input to the Noether Sea.** Jets and radiative outflows from SMBHs inject energy into the surrounding medium, locally exciting outer-binary modes and increasing the Noether-Sea internal temperature. On galactic and cluster scales, this injection is a source of heating that counteracts the natural cosmological cooling of the medium.
- **Feedback on $w_{\mathrm{eff}}$.** If SMBH energy injection is correlated with structure formation, the effective dark-energy equation of state can carry weak environmental dependence.
- **Backreaction rather than isolation.** The relevant cosmological question is not whether a black hole is an isolated object with a fixed bookkeeping mass, but whether the recycling zone and the ambient Noether Sea remain coupled strongly enough for the surrounding medium state to alter what the object contributes at late times.
- **No perpetual motion.** The recycling process does not create energy; it redistributes it. The total energy budget (matter + radiation + medium baseline) is conserved in absolute time. What changes is the partition between locked internal modes and the slowly varying tension sector.

The canonical strong-field and recycling picture is developed in [../spacetime/black-holes.md](../../../../markdown/aaa/spacetime/black-holes.md). The present chapter keeps only the cosmological consequence: whether black-hole processing contributes a measurable source term to the late-time expansion history.

### Cosmological Coupling as a Candidate Dark-Energy Channel

#### What the External Claim Is

A recent observational claim, now part of the comparison landscape for this topic, is that dormant supermassive black holes in old elliptical galaxies may grow more strongly with cosmic time than standard accretion and merger channels predict. In that interpretation, the relevant question is not merely whether black holes grow, but whether the growth tracks the cosmological background in a way that suggests direct coupling to the large-scale medium state.

The usual phenomenological parameterization writes the black-hole mass as

$$
M_{\mathrm{BH}}(a) \propto a^{K},
$$

where $a$ is the effective scale factor and $K$ measures the strength of the proposed cosmological coupling. In the source material motivating this scaffold, the interesting regime is the one in which $K$ is appreciably positive rather than consistent with zero after ordinary astrophysical channels are removed.

#### How $\mathbb{A}\mathbb{A}\mathbb{A}$ Would Read Such a Signal

From the standpoint of $\mathbb{A}\mathbb{A}\mathbb{A}$, a positive coupling of this kind would not be read as black holes creating energy from nothing or as the Euclidean void itself driving mass growth. The relevant interpretation would instead be constitutive: black holes are regions where the Noether Sea is driven into the strongest known alignment, compression, and recycling regimes, so they are natural places for energy partition between inner, middle, and outer tri-binary layers to become macroscopically visible.

That yields a disciplined three-layer reading:

- At the **substrate level**, the Noether Sea remains the carrier of the cosmological dynamics.
- At the **strong-field constitutive level**, SMBHs act as high-gradient recycling sites that can shift energy between locked internal modes and outward-propagating medium excitations.
- At the **effective cosmology level**, any residual population-wide black-hole coupling appears only as a contribution to $\rho_{\mathrm{DE,eff}}(z)$ or to the source term $\mathcal{S}_{\mathrm{relax}}$ in the expansion history.

In that reading, the black-hole channel is neither the whole dark-energy story nor a dispensable side note. It is a candidate transport mechanism inside a medium-relaxation cosmology.

#### Minimal Incorporation into the Effective Expansion Law

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

#### Population History Matters

If an SMBH-correlated channel exists, its amplitude cannot depend only on the instantaneous properties of present-day black holes. It must inherit the production and feeding history of the recycling population. In observational practice this often shows up through links to star-formation history, galaxy assembly, compact-object demographics, and host-environment selection. In $\mathbb{A}\mathbb{A}\mathbb{A}$, the deeper statement is that $\mathcal{S}_{\mathrm{BH}}$ depends on the path-history by which matter was routed into strong-field processing sites and then returned, in altered form, to the surrounding medium.

For that reason the black-hole source term should be interpreted schematically as

$$
\mathcal{S}_{\mathrm{BH}}(z)
=
\mathcal{F}\!\left[\mathcal{H}_{\mathrm{form}},\mathcal{H}_{\mathrm{feed}},\mathcal{H}_{\mathrm{release}}\right],
$$

where $\mathcal{H}_{\mathrm{form}}$ denotes the compact-object formation history, $\mathcal{H}_{\mathrm{feed}}$ the inflow history into recycling sites, and $\mathcal{H}_{\mathrm{release}}$ the history of outward channels that load the Noether Sea. The point of this notation is conceptual rather than final: any viable black-hole contribution must be history-dependent, not merely appended as a static late-time correction.

#### What Would Have to Be True

For cosmological coupling to become part of the mainline dark-energy story in $\mathbb{A}\mathbb{A}\mathbb{A}$, four conditions would need to hold simultaneously.

- The inferred black-hole growth must remain after careful accounting for hidden accretion, merger demographics, selection effects, and mass-calibration drift.
- The coupling must scale coherently across galaxy populations rather than appearing only in a tuned subsample.
- The same coupling must fit late-time expansion data without spoiling CMB, BAO, lensing, and structure-growth closure.
- The strong-field mechanism in [../spacetime/black-holes.md](../../../../markdown/aaa/spacetime/black-holes.md) must provide a constitutive path from horizon/interior recycling to a population-level contribution to $\rho_{\mathrm{DE,eff}}(z)$.

Two additional consistency conditions are equally important.

- The source history that feeds $\mathcal{S}_{\mathrm{BH}}$ must remain compatible with reasonable compact-object formation and galaxy-assembly histories.
- The resulting effective component need not trace baryonic structure point by point; if it is truly mediated through medium loading, its large-scale distribution and clustering response may differ from ordinary matter while still remaining tied to matter-processing history.

Until those conditions are met, cosmological coupling should be treated as a candidate channel under test, not as settled closure.

### Regime Map

| Epoch | Noether-Sea state | Effective $w$ | Dominant mechanism |
|:---|:---|:---|:---|
| Radiation era ($z > 3400$) | Hot, dense; outer binaries contracted | $w_{\mathrm{eff}} \to 0$ (subdominant) | Radiation pressure dominates |
| Matter era ($3400 > z > 0.7$) | Cooling; outer binaries relaxing | $w_{\mathrm{eff}}$ transitions toward $-1$ | Matter density dominates; tension grows |
| Acceleration onset ($z \sim 0.7$) | $\rho_{\mathrm{DE,eff}} \sim \rho_m$ | $w_{\mathrm{eff}} \approx -1$ | Tension becomes dynamically significant; SMBH channel may become non-negligible |
| Present ($z = 0$) | Quasi-equilibrium tension | $w_{\mathrm{eff}} \approx -1$ with possible mild drift | Acceleration established; coupling tests become survey-limited |
| Far future ($z \to -1$) | Full relaxation | $w_{\mathrm{eff}} \to -1$ or evolves | Depends on relaxation endpoint |

The acceleration onset redshift $z \sim 0.7$ is treated as the characteristic crossover of this relaxation model, with timescale set by assembly-scale physics (outer-binary binding energy and Noether-Sea coupling).

### Expansion-Module Interface

In the modular cosmology architecture, this chapter provides:

- **Output to [expansion-mechanism.md](../../../../markdown/aaa/cosmology/expansion-mechanism.md):** $H(z)$ derived from the effective Friedmann equation with $\rho_{\mathrm{DE,eff}}(z)$ and $w_{\mathrm{eff}}(z)$ from the medium-relaxation model.
- **Output to [CMB.md](../../../../markdown/aaa/cosmology/CMB.md):** late-time ISW contribution and distance to last scattering.
- **Output to [structure-formation.md](../../../../markdown/aaa/cosmology/structure-formation.md):** potential evolution $\dot{\Phi}(z)$ entering the growth equation.
- **Cross-link to [../spacetime/black-holes.md](../../../../markdown/aaa/spacetime/black-holes.md):** strong-field recycling map and the constitutive interpretation of any SMBH population coupling.
- **Input from [dark-matter.md](../../../../markdown/aaa/cosmology/dark-matter.md):** $\Omega_m(z)$ and $G_{\mathrm{eff}}(a,k)$ for consistent Friedmann integration.
- **Input from [BBN-constraints.md](../../../../markdown/aaa/cosmology/BBN-constraints.md):** early-universe constraints ensuring $\rho_{\mathrm{DE,eff}}(z_{\mathrm{BBN}})$ is negligible relative to radiation density.
- **Frame and calibration checks:** supernova directionality, standardization drift, BAO anisotropy, CMB/matter dipole consistency, and local bulk-flow residuals.
- **Ontic variables passed:** $\rho_{\text{core}}(z)$, $n(z)$, $\chi_{\text{sea}}(z)$, $\langle R_{\mathrm{outer}} \rangle(z)$, $\tau_{\mathrm{relax}}^{\mathrm{outer}}$, $\mathcal{S}_{\mathrm{sea}}(z)$, $\mathcal{S}_{\mathrm{BH}}(z)$.
- **Effective outputs returned:** $w_{\mathrm{eff}}(z)$, $\rho_{\mathrm{sea,relax}}(z)$, $\rho_{\mathrm{BH,coup}}(z)$, $\rho_{\mathrm{DE,eff}}(z)$, $H(z)$.

All interfaces use the same absolute-time / Euclidean-void substrate and Noether-Sea state variables, ensuring ontological consistency with other cosmology modules.

### Summary

Late-time accelerated expansion, conventionally attributed to dark energy or a cosmological constant, is interpreted in the architrino assembly architecture as a macroscopic signature of Noether-Sea medium relaxation within a fixed Euclidean void:

- The Noether Sea carries a baseline energy density set by the binding and oscillation energies of its constituent tri-binaries.
- The outer-binary sector of these tri-binaries produces an effective tension (negative pressure) as the medium relaxes and outer-binary radii evolve on cosmological timescales.
- Supermassive black holes may supply a secondary transport channel that feeds or modulates that tension sector, but only if the inferred population-level coupling survives ordinary astrophysical explanations.
- When this tension satisfies $w < -1/3$, the effective expansion history shows acceleration.
- The cosmological-constant hierarchy problem is reframed: high-energy internal modes are dynamically shielded from the tension sector by the nested-binary architecture, so the natural scale of $\rho_{\mathrm{DE,eff}}$ is set by outer-binary physics, not by summing all zero-point modes.
- Any acceleration claim must pass frame and calibration gates: direction-dependent supernova residuals, BAO anisotropy, CMB/matter dipole consistency, and host-environment evolution must be either negligible or produced by the same Noether-Sea response law.

The parameters $w$ and $\Lambda$ remain useful effective descriptors of expansion history, while the mechanistic content resides in the Noether-Sea constitutive relation, outer-binary dynamics, and any validated SMBH recycling channel. Deriving that constitutive relation from the master equation is the critical open program.

## Structure Formation

This chapter translates standard structure-formation language into medium-and-assembly evolution inside a fixed Euclidean void. Its purpose is to explain how overdensity growth, effective expansion variables, and dark-sector clustering are meant to fit together when the Noether Sea replaces metric expansion as the underlying ontology. It should be read as the growth-side continuation of [Cosmology Ontology](../../../../markdown/aaa/cosmology/cosmology-ontology.md), [Expansion Mechanism](../../../../markdown/aaa/cosmology/expansion-mechanism.md), and [Dark Matter](../../../../markdown/aaa/cosmology/dark-matter.md).

### Scope and Physical Picture

Structure formation describes how the nearly homogeneous early universe developed the web of galaxies, clusters, filaments, and voids observed today. In standard $\Lambda$CDM this story unfolds through gravitational instability of small density perturbations in an expanding Friedmann–Robertson–Walker metric, seeded during inflation and amplified by pressureless cold dark matter that decouples early from the photon–baryon plasma. In the $\mathbb{A}\mathbb{A}\mathbb{A}$ comparison map, the inflation-side predecessor is [Inflation Model](../../../../markdown/aaa/cosmology/inflation-model.md).

The standard term **cosmological void** should be read as a low-galaxy-density region, not as ontological emptiness. Such regions still contain the Noether Sea, photon and neutrino transport, sparse hydrogen, and possible rare reaction channels seeded by high-energy photons or other local sources.

In the Architrino Assembly Architecture the same phenomenology is reinterpreted as **medium-and-assembly co-evolution inside a fixed Euclidean void with absolute time**. The Noether Sea, the dense coupled population of pro/anti tri-binary assemblies, plays the role of the dynamical medium. Matter assemblies, baryonic composites plus any weakly coupled neutral assemblies serving the dark-matter role, are embedded in and coupled to this medium. Growth of overdensities is governed by how the medium transmits effective gravitational influence, how matter assemblies cluster under that influence, and how the medium's own internal energy budget (playing the role of dark energy) modulates the expansion-equivalent dynamics.

No metric expansion of space occurs. The Euclidean void is static. What changes is the **internal state of the tri-binary medium**: assembly radii, oscillation frequencies, local number density, the Noether-Sea delay factor $\chi_{\text{sea}}$, and the resulting medium-dressed inertial response. All standard cosmological observables—power spectra, correlation functions, lensing maps—are recast as probes of this medium-plus-assembly history at different scales and epochs.

---

### Effective Perturbation Theory

#### Background Medium State

Define a spatially averaged medium state at absolute time $t$:

- $\rho_{\text{sea}}(t)$: mean energy density of the Noether Sea (tri-binary assemblies),
- $\rho_m(t)$: mean energy density of matter assemblies (baryonic + neutral/dark),
- $\bar{\rho}_{\text{core}}(t)$: mean Noether-core density in physical units,
- $\bar{R}_{\text{core}}(t)$: mean outer-binary radius of Noether-Sea assemblies.

An effective Hubble-like parameter $H(t)$ is defined operationally through the rate of change of the medium's bulk properties. Specifically, if one defines an effective scale variable $a(t)$ via the photon redshift relation (the ratio of photon assembly frequencies at emission and reception), then $H = \dot{a}/a$ summarizes how inter-assembly separations evolve as the medium relaxes and dissipates energy. This $H$ is not the expansion rate of space but a bookkeeping variable for the medium's thermodynamic and mechanical evolution.

#### Density Contrast and the Growth Equation

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
  The weak-field constitutive map behind this is the same one organized in [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md).

- **$\bar{\rho}_m(t)$**: the mean matter density, including baryonic assemblies and any weakly coupled neutral assemblies (the dark-matter sector; see interface with [dark-matter.md](../../../../markdown/aaa/cosmology/dark-matter.md)).

**Mechanism for the source term.** A local matter overdensity increases the density of architrino assemblies in that region. The additional delayed causal flux emitted by these assemblies modifies the local Noether-Sea delay factor $\chi_{\text{sea}}$, slowing signal propagation and deepening the effective potential well. At substrate level this is not set by inverse-square dilution alone: the received flux is also Jacobian-weighted, so local branch geometry and source motion can bunch or dilute the effective gravitational signal. Surrounding matter assemblies, following geodesics of the emergent metric (equivalently, responding to the gradient of the effective potential), drift inward. This positive feedback loop is gravitational instability, recast as medium-response dynamics.

**Where the equation is valid.** This growth equation holds in the regime where:
- perturbations are small ($|\delta| \ll 1$),
- the wavelength of perturbations is much larger than the tri-binary scale,
- the medium response is quasi-static (perturbation timescale $\gg$ internal tri-binary oscillation period),
- no internal velocity component of the matter assemblies approaches $c_f$ (the self-hit regime is not triggered by the perturbation dynamics themselves).

**What breaks outside that regime.** At $|\delta| \sim 1$ (turnaround and collapse), the linear equation fails and must be replaced by the full nonlinear medium response—analogous to N-body or hydrodynamic treatment in standard cosmology. At very small scales, the finite size of tri-binary assemblies and the discreteness of the Noether Sea introduce a physical cutoff; the continuum growth equation is not valid below the mean inter-assembly spacing. At extremely high densities (approaching conditions near a Planck-core object), the self-hit regime is entered, Jacobian anisotropies become large, and the effective $G$ itself changes qualitatively.

#### The Growth Factor

Define the linear growth factor $D(t)$ as the growing-mode solution of the perturbation equation, normalized so that $\delta(\mathbf{x}, t) = D(t)\,\delta_0(\mathbf{x})$ in the linear regime. In standard cosmology:

$$
D(a) \propto H(a) \int_0^a \frac{da'}{[a' H(a')]^3}.
$$

Within the architrino framework the same integral structure holds, with $H(a)$ and $G_{\text{eff}}$ determined by the medium's equation of state. The growth rate $f(a) = d\ln D / d\ln a$ is a direct observable (via redshift-space distortions) and provides a clean test:

- If $G_{\text{eff}}$ is constant and the medium equation of state matches $\Lambda$CDM, then $f(a) \approx \Omega_m(a)^{0.55}$ as in GR.
- If $G_{\text{eff}}$ carries scale dependence from medium compliance, $f$ acquires a $k$-dependent correction that is absent in standard gravity and can be tested against galaxy survey data.

---

### Matter Content and the Dark Sector

#### Baryonic Assemblies

Baryons (protons, neutrons, and their composites) are tri-binary assemblies with specific axial patterns. Their clustering behavior is governed by the effective growth equation above, modified by pressure support (thermal motion) and radiative cooling. Before recombination, baryonic assemblies are tightly coupled to coaxial contra-rotating pro/anti planar-pair photon wave packets propagating through the Noether Sea, producing acoustic oscillations. After decoupling, baryons fall into potential wells already established by the dark sector.

#### Neutral Assemblies (Dark-Matter Candidates)

The architrino framework admits multiple dark-matter scenarios (detailed in [dark-matter.md](../../../../markdown/aaa/cosmology/dark-matter.md)). For structure formation the relevant properties are:

- **Coupling to the Noether Sea**: dark-matter assemblies must couple gravitationally (through the medium) but not electromagnetically (no net charge, minimal dipole coupling). Neutral tri-binary configurations with balanced axial layers (analogous to neutrino-like assemblies but more massive and stable) satisfy this requirement.
- **Thermal history**: if produced thermally in the early medium, their relic abundance and free-streaming length determine the small-scale cutoff of the matter power spectrum. Cold (non-relativistic at decoupling) neutral assemblies reproduce CDM-like behavior; warm candidates (lighter, with residual thermal velocity) suppress small-scale power.
- **Self-interaction**: if neutral assemblies interact among themselves through residual short-range forces (e.g., van der Waals-like wake overlap at close range), this modifies halo profiles at small scales—a potential handle on the core-cusp and too-big-to-fail problems.

The effective growth equation accommodates both CDM-like and self-interacting scenarios through the form of $G_{\text{eff}}(t,k)$ and any additional pressure or viscosity terms.

#### Medium Energy (Dark-Energy Role)

The baseline energy density of the Noether Sea ($\rho_{\text{sea}}$) acts as an effective cosmological constant or dark energy. Its contribution enters the Hubble drag term $H(t)$. If the medium's internal equation of state is $w_{\text{sea}} \approx -1$ (the tri-binary Noether-Sea assemblies resist compression, exerting negative effective pressure), the late-time acceleration of the effective expansion follows directly. Any evolution of $w_{\text{sea}}(t)$ from the medium's slow thermodynamic relaxation produces a dynamical dark-energy signature testable against supernova and BAO data.

---

### Observational Readout Domains

Structure formation in this framework is a single coupled medium-and-assembly history. Different observational probes sample different scales and epochs of that history:

#### Galaxy Rotation Curves

Flat rotation curves require either a dark-matter halo or a modified gravitational response at low accelerations. In the medium picture:
- A halo of weakly coupled neutral assemblies reproduces standard NFW-like profiles.
- Alternatively, if $G_{\text{eff}}$ develops scale dependence at galactic scales (from nonlinear medium response at low density gradients), MOND-like behavior emerges without particle dark matter.
- The Bullet Cluster and similar offset systems provide a high-pressure inference gate rather than a one-image ontological proof. If an ensemble of cluster-offset reconstructions robustly requires lensing mass separated from the baryonic gas under the same lensing priors, gas dynamics, and shared medium-state record, then pure medium-modification scenarios fail and a collisionless neutral-assembly component is required.

#### Cluster Mass Profiles

Clusters probe the intermediate regime ($\sim 1$–$10$ Mpc) where both thermal gas (X-ray) and gravitational lensing provide independent mass estimates. Consistency between hydrostatic and lensing masses constrains any scale dependence in $G_{\text{eff}}$ at cluster scales.

#### Cosmic Shear and $S_8$

Weak gravitational lensing measures the integrated matter power spectrum weighted by the lensing kernel. The $S_8 = \sigma_8 \sqrt{\Omega_m / 0.3}$ parameter family directly constrains the amplitude of linear growth at low redshift. In the medium picture:
- $\sigma_8$ is the rms matter fluctuation at $8\,h^{-1}$ Mpc, computed from the growth factor $D(t)$ and the primordial spectrum.
- Consistency between CMB-inferred $S_8$ (high-$z$ prediction evolved to $z=0$) and direct low-$z$ lensing measurement is a stringent test. Current data suggest mild tension ($S_8^{\text{CMB}} > S_8^{\text{lensing}}$ at $\sim 2$–$3\sigma$).
- If $G_{\text{eff}}$ weakens at late times relative to its early-universe value (because the medium stiffens as it cools), the predicted $S_8$ at low $z$ drops, potentially resolving the tension. This is a concrete, testable prediction of medium-evolution cosmology.

#### CMB Lensing and Acoustic Peaks

The CMB power spectrum encodes the primordial perturbation spectrum processed through the photon–baryon–medium system before decoupling. The acoustic peak positions fix the sound horizon at recombination; the peak heights constrain the matter-to-radiation ratio and the baryon-to-dark-matter ratio. CMB lensing (the smoothing of peaks at high $\ell$) probes the integrated matter distribution between the last-scattering surface and the observer.

The growth module provides:
- the matter power spectrum $P(k, z)$ that determines the lensing potential $C_\ell^{\phi\phi}$,
- the growth history $D(z)$ that sets the amplitude of the lensing signal,
- any anomalous scale dependence in $G_{\text{eff}}$ that would shift the lensing amplitude relative to the $\Lambda$CDM prediction (interface with [CMB.md](../../../../markdown/aaa/cosmology/CMB.md)).

This is an inference interface, not a direct ontology map. ACT/Planck-style CMB-lensing reconstructions first supply a lensing data product, compactly represented by $C_L^{\phi\phi}$. A valid medium-and-assembly growth model must then produce the same $C_L^{\phi\phi}$ from the same matter power spectrum, growth history, neutral-assembly loading, and Noether-Sea response variables used for galaxy clustering and low-redshift weak lensing. If the CMB-lensing fit requires one growth record while late-time shear or cluster offsets require another, the structure-formation branch has split the shared cosmology state rather than closed it.

Pre-BBN comparison branches enter structure formation only through the transfer record they leave behind. For any branch $X$ retained by [Inflation Model](../../../../markdown/aaa/cosmology/inflation-model.md#pre-bbn-comparison-gate) and [BBN Constraints](../../../../markdown/aaa/cosmology/BBN-constraints.md#pre-bbn-handoff-gate), the growth-side observable is
$$
\Delta P_X(k,z)
=
P(k,z\mid \theta_{\mathrm{sea}},\theta_X)
-
P(k,z\mid \theta_{\mathrm{sea}}).
$$
This quantity must be evaluated with the same $\theta_{\mathrm{sea}}$ used for BBN, CMB, cluster offsets, weak lensing, and redshift-space distortions. If a weakly coupled component is invisible to light elements only by acquiring a free-streaming length, abundance, or interaction history that later changes independently in $P(k,z)$, $C_L^{\phi\phi}$, or halo statistics, the comparison branch fails the shared-record gate.

#### High-Redshift Structure

Reports of massive, mature galaxies at $z > 10$ (from JWST and successors) test whether the growth history permits sufficient structure formation by early times. In the medium framework:
- If $G_{\text{eff}}$ was larger at early times (medium more compliant when hotter/denser), early structure formation is enhanced relative to standard $\Lambda$CDM—potentially explaining surprisingly massive high-$z$ systems without exotic physics.
- Conversely, if $G_{\text{eff}}$ was constant, the same tension present in standard cosmology persists and must be addressed through astrophysical channels (early star formation efficiency, AGN feedback).

#### Top-Down vs Bottom-Up Discriminator

The framework should be evaluated on whether early-time growth behaves predominantly as hierarchical buildup (bottom-up), fragmentation-dominant assembly (top-down), or a mixed regime across scale and epoch. In practice, this is read from the joint evolution of the high-$z$ halo mass function, merger statistics, and large-scale filament maturity under one calibrated $G_{\text{eff}}(a,k)$ history.

#### Largest Structures

The existence of very large coherent structures (giant arcs, walls, and voids at $\gtrsim 200$ Mpc scales) tests the homogeneity assumption and the age of the universe. In a framework where the Euclidean void is eternal and the medium history may differ from the standard $13.8$ Gyr narrative:
- Effectively unbounded-age scenarios (if the medium has recycled through earlier phases) could accommodate structures requiring longer formation times.
- Finite-age scenarios must demonstrate that the observed structures are statistically compatible with the growth rate permitted by $D(z)$ and $P(k)$.

This is an active test with model-discriminating power, not merely a fitting exercise. A structure-formation run should report the scale-neutral homogeneity residual $\mathcal{R}_{\mathrm{hom}}(\theta_{\mathrm{sea}};L,t)$ defined in [Cosmology Ontology](../../../../markdown/aaa/cosmology/cosmology-ontology.md#inference-dependency-ledger) alongside $P(k,z)$, $D(z)$, lensing summaries, and high-redshift halo statistics. If the matter power spectrum fits but dimensionless pair-separation distributions differ by direction, environment, or source family beyond tolerance, the run has not supplied a single large-scale medium history.

---

### Scale Dependence of $G_{\text{eff}}$: Mechanism and Regime Map

A key distinguishing feature of the medium-based framework is that $G_{\text{eff}}$ may carry genuine scale (and epoch) dependence arising from the constitutive properties of the Noether Sea.

#### Physical Origin

The effective gravitational coupling is set by how efficiently a local overdensity deforms the surrounding tri-binary medium. At different scales, different medium-response mechanisms dominate:

| Scale regime | Dominant medium response | Expected $G_{\text{eff}}$ behavior |
|:---|:---|:---|
| $\lambda \gg \bar{R}_{\text{core}}$, low $\rho$ | Linear elastic (acoustic) | Approximately constant; matches $G_N$ |
| $\lambda \sim 1$–$10$ Mpc, moderate $\rho$ | Weakly nonlinear compliance | Small corrections; cluster-scale tests |
| $\lambda \lesssim$ kpc, low acceleration | Nonlinear stiffening or softening | Possible MOND-like behavior |
| $\lambda \sim \bar{R}_{\text{core}}$ | Discrete medium effects | Continuum description breaks down |
| High $\rho$ (near Planck cores) | Self-hit regime | $G_{\text{eff}}$ changes qualitatively |

#### Parameterization

For phenomenological work, write:

$$
G_{\text{eff}}(a, k) = G_N \bigl[1 + \mu(a, k)\bigr],
$$

where $\mu(a, k)$ is a dimensionless modification function.

#### Linear Constitutive Derivation of $\mu(a,k)$

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

### Growth-Module Interface

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
- [dark-matter.md](../../../../markdown/aaa/cosmology/dark-matter.md): neutral-assembly properties, relic abundance, interaction rates,
- [hubble-s8-tensions.md](../../../../markdown/aaa/cosmology/hubble-s8-tensions.md): $H(z)$, $f\sigma_8(z)$, and tension-resolution diagnostics,
- [CMB.md](../../../../markdown/aaa/cosmology/CMB.md): primordial spectrum inputs, lensing amplitude, acoustic-peak constraints,
- [spacetime/emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md): the medium state variables from which $G_{\text{eff}}$ is computed.

---

### Synthesis

Structure formation is modeled here as medium-response gravitational instability in a fixed Euclidean void, with $H$, $G_{\text{eff}}$, and matter content determined by internal dynamics of architrino assemblies. The practical program is to derive the constitutive coefficients $\{K,S,\zeta_{\text{bulk}},\eta,m_L,g_m\}(a)$, close $\mu(a,k)$ from the medium response equations, and propagate the resulting growth history through the coupled cosmology modules.

## Hubble and S8 Tensions

This note frames the $H_0$ and $S_8$ problems as coupled symptoms inside one cosmological medium story rather than as unrelated anomalies. Its purpose is to give the reader a single conceptual entry point before the detailed growth and expansion modules are considered separately.

It is best read together with [Cosmology Ontology](../../../../markdown/aaa/cosmology/cosmology-ontology.md), [Expansion Mechanism](../../../../markdown/aaa/cosmology/expansion-mechanism.md), [Structure Formation](../../../../markdown/aaa/cosmology/structure-formation.md), [CMB](../../../../markdown/aaa/cosmology/CMB.md), [Dark Matter](../../../../markdown/aaa/cosmology/dark-matter.md), and [Dark Energy](../../../../markdown/aaa/cosmology/dark-energy.md).

### Core Idea

This document frames $H_0$ and $S_8$ as linked conceptual problems inside a single cosmological ontology.

### Tension Meanings

- **$H_0$ tension:** disagreement between early-inferred and local-inferred expansion rates.
- **$S_8$ tension:** disagreement between early-inferred and late-inferred structure-growth amplitude.

### $\mathbb{A}\mathbb{A}\mathbb{A}$ Interpretation

- $H_0$ is read through inhomogeneous medium evolution and region-dependent effective histories.
- $S_8$ is read through growth behavior in baryonic and neutral assembly sectors with medium-coupled dynamics.

This is conceptually adjacent to inhomogeneous/timescape interpretations, but implemented here through explicit Noether-Sea state variables and module couplings.

### Unified Mechanism

Both tensions are treated as different projections of one process: non-uniform relaxation of the Noether Sea.

For $H_0$:

- early-universe inference samples a comparatively rigid, less-relaxed medium state,
- local ladders sample more relaxed pockets with different clock-rate environments.

For $S_8$:

- baryonic and neutral-assembly sectors do not need to co-evolve identically at late times,
- mild dark-sector drag and partial coupling can suppress growth amplitude without changing the same degree of early-time background history.

So background and growth are connected through shared medium-state evolution rather than separate ad hoc corrections.

### Coupled Interpretation Channels

For $H_0$:

- local medium-state inhomogeneity (including void-like environments) can bias local-ladder inference relative to early-time inference,
- late-time medium transition channels can shift low-$z$ inference without reintroducing ontology splits.
- a non-zero environment-conditioned scatter in local $H$ inference is expected if medium-state gradients are physically relevant.
- a diagnostic expectation is correlation between local inferred-$H$ scatter and bulk-flow/environment anisotropy indicators along the same sightlines.
- the CMB-frame correction used in local-ladder and supernova pipelines must be tested against matter-dipole and bulk-flow residuals rather than assumed to erase all direction dependence.

For $S_8$:

- scale-dependent medium response and partial sector coupling can reduce late-time growth amplitude,
- growth suppression mechanisms must remain consistent with CMB-derived early-time loading.

### DESI-Era Data-Product Gate

The 2025 DESI first-three-year BAO results strengthen the comparison pressure for time-varying dark-energy fits when BAO measurements are combined with CMB, supernova, and weak-lensing data. As of April 2026, DESI has completed the observations for its originally planned five-year survey, but the first dark-energy results from the full five-year dataset are expected in 2027. This is a data-product signal, not an ontology claim. The useful requirement is to preserve the separable observables: BAO distances, supernova residual handling, CMB anchoring, weak-lensing growth, and $f\sigma_8$ growth.

The $\mathbb{A}\mathbb{A}\mathbb{A}$ question is whether one Noether-Sea medium history can satisfy
$$
\mathcal{C}_{H_0}
\cap
\mathcal{C}_{S_8}
\cap
\mathcal{C}_{\mathrm{BAO/SN/CMB}}
\cap
\mathcal{C}_{\mathrm{growth}}
\neq \varnothing
$$
without assigning separate medium states to each inference pipeline. If the preferred $w(a)$ trend requires one state for distance data and another for growth, the cosmology branch has only hidden the tension.

This is the local form of the shared calibration gate in [Dark Energy](../../../../markdown/aaa/cosmology/dark-energy.md#inference-dependency-and-calibration-gates). The sets $\mathcal{C}_{H_0}$, $\mathcal{C}_{S_8}$, $\mathcal{C}_{\mathrm{BAO/SN/CMB}}$, and $\mathcal{C}_{\mathrm{growth}}$ should be read as constraints on projections of one $\theta_{\mathrm{sea}}$, not as independent fit islands. A low distance residual paired with an incompatible growth projection is therefore not a win for the medium-relaxation interpretation; it is evidence that the interpretation has not yet closed.

### Dipole and Bulk-Flow Diagnostic

The same medium-relaxation model that shifts local $H$ inference should also predict where directional residuals appear. A compact test is to compare the line-of-sight Hubble residual with the matter-dipole residual from source catalogues:

$$
\mathcal{R}_{H,D}(z)
=
\operatorname{corr}_{\hat{\mathbf{n}}}
\left(
\delta H(z,\hat{\mathbf{n}}),
\hat{\mathbf{n}}\cdot\Delta_{\mathrm{dip}}^{X}
\right).
$$

Here $\delta H(z,\hat{\mathbf{n}})$ is the directional departure from an isotropic inferred expansion rate, and $\Delta_{\mathrm{dip}}^{X}$ is the source-catalogue dipole residual defined in [CMB](../../../../markdown/aaa/cosmology/CMB.md). The expected sign and scale of $\mathcal{R}_{H,D}$ must come from the same Noether-Sea density, delay, and flow variables used by the expansion and growth modules. If the correlation is absent after known survey systematics are controlled, the local-environment explanation for $H_0$ loses support. If the correlation exists but requires a different medium state from the one used for CMB, BAO, or growth, the cosmology branch has split its ontology and fails the shared-closure requirement.

The operational version of this diagnostic is the frame-split packet in [Cosmology Shared Residual Fit Protocol](../../../../markdown/aaa/validation/simulations/cosmology-shared-residual-fit.md#frame-split-measurement-recipe), where local $H_0$ scatter is tested beside CMB, matter-dipole, supernova, and BAO directional rows.

### Cross-Module Interface

In the modular cosmology map, this document is the coupling layer between:

- expansion-module outputs ([expansion-mechanism.md](../../../../markdown/aaa/cosmology/expansion-mechanism.md)) that shape inferred $H_0$,
- growth-module outputs ([structure-formation.md](../../../../markdown/aaa/cosmology/structure-formation.md)) that shape inferred $S_8$,
- shared medium-state variables that keep both readouts in one ontology,
- dipole, bulk-flow, and calibration residuals that test whether the same medium state explains local and early-inferred cosmology.

### Coherent Reading

$H_0$ and $S_8$ are not separate anomalies requiring separate ontologies; they are two observer-level projections of one medium-relaxation and coupling history in $\mathbb{A}\mathbb{A}\mathbb{A}$.

For a broader diagnosis of anomaly clustering versus ontology splitting, compare [Crisis in Physics](../../../../markdown/aaa/philosophy-history/crisis-in-physics.md).
