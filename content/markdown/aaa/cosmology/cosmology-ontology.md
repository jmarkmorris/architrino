# Cosmology Ontology

This chapter states the basic cosmological ontology of $\mathbb{A}\mathbb{A}\mathbb{A}$ before the topic branches split into expansion, CMB, BBN, and structure-formation details. Its purpose is to make clear what is fundamental in the cosmology stack, what is effective observer-level bookkeeping, and how the fixed Euclidean container is related to evolving medium state.

The opening sections define the absolute-frame picture and the document set that grows out of it. Later sections record the working classification axes, interface variables, and boundary conditions against nearby cosmological families.

## Cosmology in the Absolute Frame

1. **Expansion Ontology**: the universe is a fixed Euclidean container with an evolving medium; the container itself does not expand.
2. **Primordial Language**: "primordial" denotes an early effective observer-era regime in $\tau_c$ chronology, not a required literal one-time ontic origin event.

## $\mathbb{A}\mathbb{A}\mathbb{A}$ Cosmology: Overview

Cosmology is expressed in two linked descriptions:

1. **Absolute description ($\mathbb{U}_{\text{now}}$ universe-state perspective)**
- Fixed Euclidean coordinates $(x,y,z)$ and absolute time $t$
- Full microstate accounting of assemblies and medium state
- No metric expansion of the void

2. **Effective observer description**
- Emergent comoving coordinates and cosmic-time approximation
- FRW-like expansion, redshift, and metric-like behavior as effective outputs

All cosmological observables are computed from absolute-state evolution and then projected into effective observer variables for comparison with data products.

## Cosmology Document Set

- [expansion-mechanism.md](./expansion-mechanism.md): canonical expansion and redshift mapping in fixed void ontology.
- [inflation-model.md](./inflation-model.md): emergent early rapid-expansion model and conceptual inflation framing.
- [BBN-constraints.md](./BBN-constraints.md): light-element abundance constraints under emergent $H(t)$.
- [CMB.md](./CMB.md): integrated CMB origin narrative plus quantitative prediction mapping in the same ontology.
- [structure-formation.md](./structure-formation.md): growth dynamics and large-scale structure tests.
- [hubble-s8-tensions.md](./hubble-s8-tensions.md): joint treatment of late-time cosmology tensions.
- [dark-matter.md](./dark-matter.md): dark-sector mechanism mapping in a unified medium-and-assembly frame.
- [dark-energy.md](./dark-energy.md): acceleration mechanism mapping in the same fixed-void ontology.

## Historical Lineage (Conceptual, Not Identical)

- **QSSC-like motif:** eternal background plus recurring creation/reprocessing channels.
- **Cyclical-like motif:** repeated effective epochs without requiring one absolute beginning event.
- **Timescape-like motif:** environment-conditioned clock calibration affecting inferred expansion history.
- **Static-family caution:** retain only clock/medium insight channels; exclude generic tired-light scattering-loss mechanisms.

## Classification Axes ($\mathbb{A}\mathbb{A}\mathbb{A}$ Position)

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

## Working Principle

Cosmological observables (e.g., $H(z)$, BAO, CMB peaks, lensing, growth proxies) must be reproducible from absolute-frame medium dynamics, with GR/$\Lambda\mathrm{CDM}$ behavior appearing as effective limits where applicable.

For development and comparison, expansion, CMB transfer, BBN yields, and growth/lensing are treated as separable observational modules with explicit interface variables, while remaining one ontology.

### Effective FRW Variable Ledger

The standard homogeneous and isotropic comparison layer is retained as a data-product language, not as substrate geometry. A candidate medium-state history may project to an effective line element of the form
$$
ds_{\mathrm{FRW,eff}}^2
=
-c_0^2d\tau_c^2
+a_{\mathrm{eff}}^2(\tau_c)
\left[
\frac{d\chi^2}{1-k\chi^2}
+\chi^2d\Omega^2
\right],
$$
but this is a reconstruction used by Physical Observers. The Euclidean void does not expand, and $a_{\mathrm{eff}}$, $H_{\mathrm{eff}}\equiv \dot a_{\mathrm{eff}}/a_{\mathrm{eff}}$, $k$, $\Omega_i$, $w_i$, and horizon distances are effective variables extracted from Noether-Sea evolution, clock comparison, and transport records.

The useful comparison equations are therefore recovery targets:
$$
H_{\mathrm{eff}}^2
=
\frac{8\pi G_{\mathrm{eff}}}{3c_0^2}\rho_{\mathrm{eff}}
-\frac{k c_0^2}{a_{\mathrm{eff}}^2}
+\frac{\Lambda_{\mathrm{eff}}}{3},
$$
$$
\dot\rho_{\mathrm{eff}}
+3H_{\mathrm{eff}}(\rho_{\mathrm{eff}}+P_{\mathrm{eff}})
=0.
$$
Passing these equations does not by itself promote metric expansion. It means that the fixed-void medium history has an observer-level FRW projection accurate enough to feed distance-redshift, CMB, BBN, and growth comparisons.

### Steady-State Failure Test for Effective Variables

Historical steady-state cosmologies are useful here as failure tests, not as ontology to import. Einstein's unpublished 1931 steady-state attempt already shows the core mathematical pressure: an expanding comparison metric with constant matter density is not closed unless the matter continuity equation contains an explicit source term with a provenance ledger.

In the effective FRW layer, a dust-like component obeys the no-source comparison equation
$$
\dot{\rho}_{m,\mathrm{eff}}
+3H_{\mathrm{eff}}\rho_{m,\mathrm{eff}}=0.
$$
If one imposes $\dot{\rho}_{m,\mathrm{eff}}=0$ while $H_{\mathrm{eff}}\ne0$, the equation forces $\rho_{m,\mathrm{eff}}=0$. A nontrivial constant-density branch therefore requires
$$
\dot{\rho}_{m,\mathrm{eff}}
+3H_{\mathrm{eff}}\rho_{m,\mathrm{eff}}
=
\mathcal{S}_{m,\mathrm{eff}},
\qquad
\mathcal{S}_{m,\mathrm{eff}}
=3H_{\mathrm{eff}}\rho_{m,\mathrm{eff}}
\quad
\text{for constant }\rho_{m,\mathrm{eff}}.
$$
From the standpoint of $\mathbb{A}\mathbb{A}\mathbb{A}$, $\mathcal{S}_{m,\mathrm{eff}}$ cannot mean matter produced by the Euclidean void. It must be a projection of assembly association, dissociation, recycling, transport, or Noether-Sea exchange already present in the absolute record $S(t)$. If no such provenance route is supplied, the model is only an effective parameter fit and fails as cosmology closure.

## Observation-First Component Abstraction

This framework does not treat cosmology as "$\mathbb{A}\mathbb{A}\mathbb{A}$ vs $\Lambda\mathrm{CDM}$" at the bundled-model level. Instead, first abstract $\Lambda\mathrm{CDM}$ into separable observational components with no interpretational linkage baked in:

- background expansion component ($H(z)$ and distance-redshift summaries),
- recombination/CMB transfer component (TT/TE/EE, damping, lensing imprint),
- primordial-yield component (BBN abundance outputs),
- structure-growth component (clustering, shear, lensing growth summaries),
- local-calibration component (distance ladder and environment-conditioned inference).

This decomposition prevents hidden dependency loops where one assumed foundation silently fixes another observable domain.

## Inference-Dependency Ledger

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

The same rule applies across modules. A promoted cosmology claim must preserve one shared medium-state record $\theta_{\mathrm{sea}}$ through expansion, CMB transfer, BBN, growth, lensing, and local calibration. If those modules can be fit only by replacing the state record or projection map per observable family, the result is benchmark fitting rather than cosmology closure. The current dark-energy branch states this as a shared residual gate in [dark-energy.md](./dark-energy.md#inference-dependency-and-calibration-gates).

Claims about observer selection, anthropic conditioning, or typicality belong inside the same inference ledger. They should not be promoted as cosmological facts unless their weights are projected from the declared data-product family and the same shared medium-state record. For an observer-accessible datum $D_a$ on a window $W$, write
$$
P_{\theta_{\mathrm{sea}},W}(D_a)
=
\mu_{\theta_{\mathrm{sea}},W}\!\left(\pi_D^{-1}(D_a)\right),
$$
with $\mu_{\theta_{\mathrm{sea}},W}$ conditioned by the same $\theta_{\mathrm{sea}}$ used for expansion, CMB, BBN, growth, lensing, and calibration. A compact selection-admissibility guardrail is
$$
\mathcal{R}_{\mathrm{sel}}(\theta_{\mathrm{sea}},W)
=
\max\!\left(
\mathcal{R}_{\mathrm{shared}}(\theta_{\mathrm{sea}}),
d_{\mathcal{D}_{\mathrm{cos}}}\!\left(
(\pi_D)_*\mu_{\theta_{\mathrm{sea}},W},
\widehat{\mu}_{\mathcal{D}_{\mathrm{cos}},W}
\right)
\right).
$$
Here $\widehat{\mu}_{\mathcal{D}_{\mathrm{cos}},W}$ is the empirical distribution of the declared cosmology data products on the same window. If $\mathcal{R}_{\mathrm{sel}}$ is large, the corpus should retain the observable data product and classify the typicality claim as interpretation rather than cosmology closure.

### Global-Reconstruction Promotion Gate

The inference-dependency ledger should also distinguish a successful data-product fit from a promoted global history. Let $\mathcal{D}_{\mathrm{cos}}$ denote the declared cosmology data-product family: supernovae, BAO, redshift catalogues, CMB spectra, BBN yields, growth, lensing, and calibration records. For a candidate shared Noether-Sea record $\theta_{\mathrm{sea}}$, define the same-data ambiguity class
$$
[\theta_{\mathrm{sea}}]_{\mathcal{D}_{\mathrm{cos}},\epsilon}
=
\left\{
\theta'_{\mathrm{sea}}
:
d_{\mathcal{D}_{\mathrm{cos}}}\!\left(
\Pi_{\mathcal{D}_{\mathrm{cos}}}(\theta'_{\mathrm{sea}}),
\Pi_{\mathcal{D}_{\mathrm{cos}}}(\theta_{\mathrm{sea}})
\right)
\le\epsilon,
\quad
\mathcal{R}_{\mathrm{shared}}(\theta'_{\mathrm{sea}})\le\epsilon_{\mathrm{shared}}
\right\}.
$$
For a proposed global cosmology claim $P_{\mathrm{glob}}$, define
$$
\Delta_{\mathrm{glob}}(P_{\mathrm{glob}};\theta_{\mathrm{sea}})
=
\mathbf{1}\!\left[
\exists\theta_1,\theta_2\in[\theta_{\mathrm{sea}}]_{\mathcal{D}_{\mathrm{cos}},\epsilon}
\text{ with }
P_{\mathrm{glob}}(\theta_1)\ne P_{\mathrm{glob}}(\theta_2)
\right].
$$
A claim about a unique global chronology, asymptotic de Sitter state, global topology, or one-time origin is promoted only when this ambiguity indicator vanishes or when a native derivation selects that claim without using the fitted data products as the selection rule. Otherwise the corpus should retain the observational data product and classify the global statement as an effective reconstruction.

## Interface Variables (Predicted API Surface)

Each observational component exposes explicit interface variables for cross-theory mapping:

- Expansion interface: effective $a(t)$/$H(z)$ history and redshift mapping variables.
- CMB interface: mode-seeding inputs, transfer behavior, and TT/TE/EE outputs.
- BBN interface: thermal/reaction history inputs and light-element yield outputs.
- Growth interface: matter-loading and coupling inputs with late-time amplitude/shape outputs.
- Calibration interface: local-environment terms that map observer pipelines to inferred cosmological parameters.
- Anisotropy interface: CMB-frame correction, matter-dipole residuals, supernova and BAO directional residuals, and local bulk-flow indicators.

## $\mathbb{A}\mathbb{A}\mathbb{A}$ Mapping Stance

$\mathbb{A}\mathbb{A}\mathbb{A}$ maps to each observation component directly through these interfaces. Agreement or divergence from $\Lambda\mathrm{CDM}$ is evaluated per component, not as all-or-nothing acceptance of a single interpretational package.

Historical correspondences (steady-state, quasi-steady-state, bounce/cyclic, SMBH-centered recycling) are tracked as lineage context, while microphysical commitments remain specific to $\mathbb{A}\mathbb{A}\mathbb{A}$.

$\mathbb{A}\mathbb{A}\mathbb{A}$ may borrow explanatory motifs from QSSC/cyclical/inhomogeneous traditions, but it does not import external ontologies by default.

### Boundary Conditions Against Nearby Families

- No hypersphere geometry import as a default cosmology substrate.
- No electromagnetic-force-dominant replacement of gravity at cosmological baseline.
- No generic tired-light scattering-loss redshift mechanisms in core interpretation.
- No split ontology where background expansion and growth are treated as unrelated physics.

## Origin and Global History Stance

- The Euclidean void and absolute time are treated as eternal background structure, not products of a one-time geometric origin event.
- Large-scale cosmological history is modeled as long-lived medium-and-assembly evolution with recycling channels, including SMBH-centered processing.
- "Big Bang timeline" language is retained as an effective observational chronology, while ontology remains fixed-void plus evolving Noether-Sea state.

## Galaxy-Local Cosmology Paradigm

- Processes often presented as single global events are modeled as distributed, parallel, galaxy-local recycling dynamics.
- SMBH-centered high-curvature processing is treated as a persistent cosmological engine class rather than a one-time initial-condition generator.
- Effective cosmological chronology is therefore a stitched observational map of many local histories, not one literal global launch event.
- Large-scale homogeneity can be treated as a statistical outcome of repeated local processes governed by the same microphysics, while permitting local fluctuations and anisotropic environments.
- Large-scale organization can be treated as mostly scale-invariant in architecture while still allowing finite-scale departures from statistical uniformity.

## Time Notions (Operational)

- **Absolute Time ($t$):** global linear index for full-state evolution.
- **Cosmic Time ($\tau_c$):** reconstructed observer-level clocking used for effective observational chronology.
- **Dynamics:** expansion is encoded as medium-network evolution in $t$, then read out as observer-level history in $\tau_c$.
