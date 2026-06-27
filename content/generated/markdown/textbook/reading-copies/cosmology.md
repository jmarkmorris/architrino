# Cosmology

## Cosmology Ontology

This chapter states the basic cosmological ontology of $\mathbb{A}\mathbb{A}\mathbb{A}$ before the topic branches split into expansion, CMB, BBN, and structure-formation details. Its purpose is to make clear what is fundamental in the cosmology stack, what is effective observer-level bookkeeping, and how the fixed Euclidean container is related to evolving Noether sea state.

The opening sections define the absolute-frame picture and the document set that grows out of it. Later sections record the working classification axes, interface variables, and boundary conditions against nearby cosmological families.

### Cosmology in the Absolute Frame

1. **Expansion Ontology**: the universe is a fixed Euclidean container with an evolving Noether sea; the container itself does not expand.
2. **Primordial Language**: "primordial" denotes an early effective observer-era regime in $\tau_c$ chronology, not a required literal one-time ontic origin event.

### $\mathbb{A}\mathbb{A}\mathbb{A}$ Cosmology: Overview

Cosmology is expressed in two linked descriptions:

1. **Absolute description ($\mathbb{U}_{\text{now}}$ universe-state perspective)**
- Fixed Euclidean coordinates $(x,y,z)$ and absolute time $t$
- Full microstate accounting of assemblies and Noether sea state
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
- **Rotating-universe caution:** historical global-rotation proposals are retained only as anisotropy-test discipline; they do not import a rotating Euclidean void or rotating Noether sea.
- **Static-family caution:** retain only clock/medium insight channels; exclude generic tired-light scattering-loss mechanisms.

### Classification Axes ($\mathbb{A}\mathbb{A}\mathbb{A}$ Position)

| Axis | $\mathbb{A}\mathbb{A}\mathbb{A}$ Position |
|---|---|
| Gravity driver | Medium-response gravity from Noether sea state, with GR-like behavior as an effective limit |
| Expansion status | Fixed Euclidean container; expansion variables are effective Noether sea state summaries |
| Universe age stance | Eternal background with no mandatory one-time global origin event |
| Redshift mechanism | Medium evolution plus clock-rate comparison and transport contributions |
| Photon-frequency status | Observer-level signed transfer record; redshift and blueshift are outputs of endpoint cadence, source branch, launch geometry, and path-history exchange |
| CMB origin mode | Source + transport + thermalization + decoupling in one medium-and-assembly ontology |
| Nucleosynthesis mode | Recurring local reactor-style channels (SMBH-linked) mapped to observer-level primordial diagnostics |
| Homogeneity stance | Statistical large-scale homogeneity from repeated local processes with allowed local inhomogeneity |
| Growth mode | Coupled medium-and-assembly instability with scale/epoch-dependent effective response |

### Working Principle

Cosmological observables (e.g., $H(z)$, BAO, CMB peaks, lensing, growth proxies) must be reproducible from absolute-frame medium dynamics, with GR/$\Lambda\mathrm{CDM}$ behavior appearing as effective limits where applicable.

For development and comparison, expansion, CMB transfer, BBN yields, and growth/lensing are treated as separable observational modules with explicit interface variables, while remaining one ontology.

Redshift is therefore not a primitive expansion witness in this ontology. It is a signed photon-frequency transfer record,

$$
Z_X^{E\to R}
=
\ln\frac{\nu_{X,0}}{\nu_{\mathrm{obs},X}}
$$

whose positive and negative contributions must be assigned to endpoint cadence, source-branch state, launch geometry, and path-history exchange through the Noether sea. Sunyaev-Zeldovich-type CMB measurements make the path-history part observationally concrete: intervening medium can shift photon frequencies after emission. A valid cosmology must preserve that fact while still recovering the standard data products, rather than using redshift alone to promote literal expansion of the Euclidean void.

#### Effective FRW Variable Ledger

The standard homogeneous and isotropic comparison layer is retained as a data-product language, not as substrate geometry. A candidate Noether sea state history may project to an effective line element of the form
$$
ds_{\mathrm{FRW,eff}}^2
=
-c_0^2d\tau_c^2
+a_{\mathrm{eff}}^2(\tau_c)
\left[
\frac{d\chi^2}{1-k\chi^2}
+\chi^2d\Omega^2
\right]
$$
but this is a reconstruction used by Physical Observers. The Euclidean void does not expand, and $a_{\mathrm{eff}}$, $H_{\mathrm{eff}}\equiv \dot a_{\mathrm{eff}}/a_{\mathrm{eff}}$, $k$, $\Omega_i$, $w_i$, and horizon distances are effective variables extracted from Noether sea evolution, clock comparison, and transport records.

The useful comparison equations are therefore recovery targets:
$$
H_{\mathrm{eff}}^2
=
\frac{8\pi G_{\mathrm{eff}}}{3c_0^2}\rho_{\mathrm{eff}}
-\frac{k c_0^2}{a_{\mathrm{eff}}^2}
+\frac{\Lambda_{\mathrm{eff}}}{3}
$$
$$
\dot\rho_{\mathrm{eff}}
+3H_{\mathrm{eff}}(\rho_{\mathrm{eff}}+P_{\mathrm{eff}})
=0
$$
Passing these equations does not by itself promote metric expansion. It means that the fixed-void medium history has an observer-level FRW projection accurate enough to feed distance-redshift, CMB, BBN, and growth comparisons.

#### Effective Component Inventory

Cosmic inventory language is useful only as an effective comparison ledger. For a component whose observer-level mass-equivalent density is $\bar\rho_i$, write
$$
\Omega_i^\theta(t)
=
\frac{8\pi G_{\mathrm{eff}}^\theta(t)\bar\rho_i^\theta(t)}
{3\left(H_{\mathrm{eff}}^\theta(t)\right)^2}
$$
For a component recorded first as an energy density $u_i^\theta$, use
$$
\Omega_i^\theta(t)
=
\frac{8\pi G_{\mathrm{eff}}^\theta(t)u_i^\theta(t)}
{3c_0^2\left(H_{\mathrm{eff}}^\theta(t)\right)^2}
$$
These $\Omega_i$ variables are data-product coordinates. They do not say that the Euclidean void contains independent density fluids. They say that the same Noether sea state and assembly record has been projected into the standard component language at the observer epoch.

A compact inventory residual is
$$
\mathcal{R}_{\Omega}(\theta_{\mathrm{sea}})
=
\Omega_{K,\mathrm{fit}}
+
\sum_{i\in\mathcal{I}_{\mathrm{cos}}}
\Omega_i^\theta(t_{\mathrm{obs}})
-1
$$
where $\mathcal{I}_{\mathrm{cos}}$ includes only declared comparison rows, such as dark energy, neutral assemblies, baryons, radiation, neutrinos, binding-energy entries, kinetic or plasma entries, and wake-history or medium-response entries when the local branch has supplied them. Passing this residual means the effective inventory closes; it does not identify the substrate carrier of each row.

The stronger test is cross-row provenance. Let $Q_i^\theta$ and $Q_j^\theta$ be two inventory quantities that should be related by an energy-transfer, reaction, transport, or remnant ledger, and let $\mathcal{T}_{ij}^\theta$ be the declared transfer map between them. Then
$$
\mathcal{R}_{i\leftrightarrow j}^{\theta}
=
\left\|
Q_i^\theta-\mathcal{T}_{ij}^\theta Q_j^\theta
\right\|_{C_{ij}^{-1}}^2
$$
Examples include nuclear binding versus radiation and neutrino backgrounds, baryon density versus BBN and CMB inference, quasar luminosity versus massive-black-hole remnant density, and lensing mass versus galaxy luminosity and clustering. A component row that cannot be connected to the rest of the ledger remains an interpretation placeholder.

#### Steady-State Failure Test for Effective Variables

Historical steady-state cosmologies are useful here as failure tests, not as ontology to import. Einstein's unpublished 1931 steady-state attempt already shows the core mathematical pressure: an expanding comparison metric with constant matter density is not closed unless the matter continuity equation contains an explicit source term with a provenance ledger.

In the effective FRW layer, a dust-like component obeys the no-source comparison equation
$$
\dot{\rho}_{m,\mathrm{eff}}
+3H_{\mathrm{eff}}\rho_{m,\mathrm{eff}}=0
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
\text{for constant }\rho_{m,\mathrm{eff}}
$$
From the standpoint of $\mathbb{A}\mathbb{A}\mathbb{A}$, $\mathcal{S}_{m,\mathrm{eff}}$ cannot mean matter produced by the Euclidean void. It must be a projection of assembly association, dissociation, recycling, transport, or Noether sea exchange already present in the absolute record $S(t)$. If no such provenance route is supplied, the model is only an effective parameter fit and fails as cosmology closure.

For a recycling or cyclical comparison branch, this source term must also close over the declared cycle window:
$$
\Delta M_{\mathrm{eff}}[t_1,t_2]
=
\int_{t_1}^{t_2}
\mathcal{S}_{m,\mathrm{eff}}(t)a_{\mathrm{eff}}^3(t)\,dt
-
\int_{t_1}^{t_2}
3H_{\mathrm{eff}}(t)\rho_{m,\mathrm{eff}}(t)a_{\mathrm{eff}}^3(t)\,dt
$$
The pass condition is not a preferred external cosmology. It is that $\Delta M_{\mathrm{eff}}$ be supplied by assembly association, dissociation, transport, recycling, or Noether sea exchange in the same absolute record. Otherwise the branch has kept an effective density constant by inserting a source without provenance.

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

Directional tests are part of this ledger. If a data reduction assumes a cosmic rest frame, a kinematic CMB dipole correction, or an all-sky isotropic background, the same reduction must expose the residual dipole, quadrupole, and environment dependence left after the correction. Those residuals are not automatically evidence against the model; they are diagnostic handles for the Noether sea flow, density, delay, and clock-rate fields.

Gamow's 1946 rotating-universe proposal is useful as comparison pressure here because it converts a story-level anisotropy claim into an all-sky radial-velocity test. The surviving discipline is not the rotating universe itself, but the requirement that any claimed large-scale anisotropy leave a declared directional residual after CMB-frame correction, matter-dipole residuals, local bulk-flow subtraction, and survey-window effects have been separated.

For tracer $i$ with direction $\hat{\mathbf{n}}_i$ from observer position $\mathbf{x}_o$, inferred position $\mathbf{x}_i=\mathbf{x}_o+D_i\hat{\mathbf{n}}_i$, and corrected line-of-sight velocity or redshift residual $\delta v_i$, the shared Noether sea record should first supply its native prediction
$$
\epsilon_i(\theta_{\mathrm{sea}})
=
\delta v_i
-
\Pi_v(\theta_{\mathrm{sea}};\mathbf{x}_i,\hat{\mathbf{n}}_i)
$$
where $\Pi_v$ includes the declared Noether sea flow, density, delay, clock-rate, CMB-frame, and local-calibration terms. A historical rotation-like comparison can then be expressed only as a residual template,
$$
T_i(\mathbf{x}_c,\boldsymbol{\omega},g)
=
\hat{\mathbf{n}}_i\cdot
\left[
g(D_i)\,\boldsymbol{\omega}\times(\mathbf{x}_i-\mathbf{x}_c)
-g(0)\,\boldsymbol{\omega}\times(\mathbf{x}_o-\mathbf{x}_c)
\right]
$$
with the center $\mathbf{x}_c$, angular-rate vector $\boldsymbol{\omega}$, and distance profile $g$ declared as comparison parameters rather than new ontology. The corresponding all-sky antisymmetric-flow residual on a survey shell $S$ is
$$
\mathcal{R}_{\mathrm{rot}}(\theta_{\mathrm{sea}};S)
=
\inf_{\mathbf{x}_c,\boldsymbol{\omega},g\in\mathcal{G}_{\mathrm{decl}}}
\left[
\frac{1}{W_S}
\sum_{i\in S}
w_i\left(
\epsilon_i(\theta_{\mathrm{sea}})
-T_i(\mathbf{x}_c,\boldsymbol{\omega},g)
\right)^2
\right]^{1/2},
\qquad
W_S=\sum_{i\in S}w_i
$$
This diagnostic protects the fixed-void ontology in both directions. If the best-fit template is insignificant or survey-dependent, the rotation story is rejected. If a stable double-sine, dipole, quadrupole, or higher directional pattern remains, it must be derived from the same $\theta_{\mathrm{sea}}$ that also fits expansion, CMB transfer, BBN, growth, lensing, and calibration; it cannot be absorbed silently into $H(z)$, $w(z)$, or a new global-rotation premise.

A scale-neutral homogeneity check should also be part of the shared ledger. For a large comparison window $W\subset\Sigma_t$ with resolved tracer index set $I_W(t)$ and $N_W=\lvert I_W(t)\rvert$, define the root-mean-square separation scale
$$
L_W^2(t)=\frac{2}{N_W(N_W-1)}
\sum_{i<j\in I_W(t)}
\|\mathbf{x}_i(t)-\mathbf{x}_j(t)\|^2
$$
The corresponding dimensionless pair-separation distribution is
$$
\widehat{\mu}_{W,t}(u)=
\frac{2}{N_W(N_W-1)}
\sum_{i<j\in I_W(t)}
\delta\!\left(
u-\frac{\|\mathbf{x}_i(t)-\mathbf{x}_j(t)\|}{L_W(t)}
\right)
$$
For a declared family of same-scale windows $\mathcal{W}_L(t)$ and a declared distribution distance $d$, a candidate Noether sea state record should expose
$$
\mathcal{R}_{\mathrm{hom}}(\theta_{\mathrm{sea}};L,t)
=
\sup_{W_a,W_b\in\mathcal{W}_L(t)}
d\!\left(\widehat{\mu}_{W_a,t},\widehat{\mu}_{W_b,t}\right)
$$
Large-scale homogeneity is accepted only when this residual remains within the declared tolerance while the same $\theta_{\mathrm{sea}}$ also passes the expansion, CMB, BBN, growth, lensing, and calibration gates. This is a scale-neutral diagnostic over observer-facing data products, not an import of a shape-first cosmology or a replacement for the fixed Euclidean void.

The same rule applies across modules. A promoted cosmology claim must preserve one shared Noether sea state record $\theta_{\mathrm{sea}}$ through expansion, CMB transfer, BBN, growth, lensing, and local calibration. If those modules can be fit only by replacing the state record or projection map per observable family, the result is benchmark fitting rather than cosmology closure. The current dark-energy branch states this as a shared residual gate in [dark-energy.md](../../../../markdown/aaa/cosmology/dark-energy.md#inference-dependency-and-calibration-gates).

#### Prediction Narrowness and Initial-Basin Burden

The same shared-record rule also separates a successful fit from a predictive cosmology branch. A branch may reproduce the observed packet by widening the source story, initial state, or projection map until many unlike histories are allowed. That is weaker than closure. For a declared cosmology record, write
$$
\theta_{\mathrm{cosmo}}
=
\left(
\theta_{\mathrm{sea}},
\theta_{\mathrm{init}},
\theta_{\mathrm{source}},
\theta_{\mathrm{thermal}},
\theta_{\mathrm{path}},
\theta_{\mathrm{growth}},
\theta_{\mathrm{frame}}
\right)
$$
where the entries are respectively the Noether sea state, initial basin, source or release record, thermalization record, path-history record, growth/lensing record, and frame record. Let $\mathcal{R}_{\mathcal{D}_{\mathrm{cos}}}(\theta_{\mathrm{cosmo}};o)$ be the shared residual over the declared cosmology data-product family. The allowed-output neighborhood is
$$
\mathcal{O}_{\epsilon}(\theta_{\mathrm{cosmo}})
=
\left\{
o \in \mathcal{O}_{\mathrm{near}}
:
\mathcal{R}_{\mathcal{D}_{\mathrm{cos}}}(\theta_{\mathrm{cosmo}};o)
\le
\epsilon_{\mathrm{cos}}
\right\}
$$
Fitting asks only that the observed packet belongs to this set. Predictive closure asks that the set be narrow under the declared comparison measure,
$$
\mu\!\left(\mathcal{O}_{\epsilon}(\theta_{\mathrm{cosmo}})\right)
\ll
\mu\!\left(\mathcal{O}_{\mathrm{near}}\right)
$$
This criterion does not require zero flexibility. It requires the branch record to exclude nearby alternatives before a data fit is counted as a cosmology claim.

Initial-condition specialness is the companion burden. Let $\Gamma_{\mathrm{init}}$ be the declared initial state or path-history chart for the branch, with measure $\mu_{\mathrm{init}}$ internal to that chart. Define
$$
\mathcal{B}_{\mathrm{obs}}
=
\left\{
\theta_{\mathrm{init}} \in \Gamma_{\mathrm{init}}
:
\mathcal{R}_{\mathcal{D}_{\mathrm{cos}}}(\theta_{\mathrm{cosmo}})
\le
\epsilon_{\mathrm{cos}}
\right\}
$$
and report the basin burden
$$
\mathcal{S}_{\mathrm{init}}
=
-\log
\frac{
\mu_{\mathrm{init}}(\mathcal{B}_{\mathrm{obs}})
}{
\mu_{\mathrm{init}}(\Gamma_{\mathrm{init}})
}
$$
A high $\mathcal{S}_{\mathrm{init}}$ means the smoothing or release explanation has been moved into a small allowed initial basin. A low value means the declared mechanism is robust under the chosen chart. This is a diagnostic on the branch record, not an external probability assigned after the dynamics.

The same burden can be written in a compact conditioned form when the cosmology branch has already declared its constraint set:
$$
I_{\mathrm{init}}(\theta)
=
-\log
\mu_{\mathrm{state}}\!\left(B_\theta\mid C_{\mathrm{cos}}\right)
$$
Here $C_{\mathrm{cos}}$ is the declared cosmology constraint set, $B_\theta$ is the subset of admissible Noether sea and path-history states that project to the observed CMB, BBN, growth/lensing, and frame packet, and $\mu_{\mathrm{state}}$ is the branch-internal state measure conditioned on $C_{\mathrm{cos}}$. A branch that explains smoothness only by making $\mu_{\mathrm{state}}(B_\theta\mid C_{\mathrm{cos}})$ tiny has relocated the burden into initial selection rather than deriving it from Noether sea dynamics.

Claims about observer selection, anthropic conditioning, or typicality belong inside the same inference ledger. They should not be promoted as cosmological facts unless their weights are projected from the declared data-product family and the same shared Noether sea state record. For an observer-accessible datum $D_a$ on a window $W$, write
$$
P_{\theta_{\mathrm{sea}},W}(D_a)
=
\mu_{\theta_{\mathrm{sea}},W}\!\left(\pi_D^{-1}(D_a)\right)
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
\right)
$$
Here $\widehat{\mu}_{\mathcal{D}_{\mathrm{cos}},W}$ is the empirical distribution of the declared cosmology data products on the same window. If $\mathcal{R}_{\mathrm{sel}}$ is large, the corpus should retain the observable data product and classify the typicality claim as interpretation rather than cosmology closure.

#### Global-Reconstruction Promotion Gate

The inference-dependency ledger should also distinguish a successful data-product fit from a promoted global history. Let $\mathcal{D}_{\mathrm{cos}}$ denote the declared cosmology data-product family: supernovae, BAO, redshift catalogues, CMB spectra, BBN yields, growth, lensing, and calibration records. For a candidate shared Noether sea record $\theta_{\mathrm{sea}}$, define the same-data ambiguity class
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
\right\}
$$
For a proposed global cosmology claim $P_{\mathrm{glob}}$, define
$$
\Delta_{\mathrm{glob}}(P_{\mathrm{glob}};\theta_{\mathrm{sea}})
=
\mathbf{1}\!\left[
\exists\theta_1,\theta_2\in[\theta_{\mathrm{sea}}]_{\mathcal{D}_{\mathrm{cos}},\epsilon}
\text{ with }
P_{\mathrm{glob}}(\theta_1)\ne P_{\mathrm{glob}}(\theta_2)
\right]
$$
A claim about a unique global chronology, asymptotic de Sitter state, global topology, or one-time origin is promoted only when this ambiguity indicator vanishes or when a native derivation selects that claim without using the fitted data products as the selection rule. Otherwise the corpus should retain the observational data product and classify the global statement as an effective reconstruction.

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
- "Big Bang timeline" language is retained as an effective observational chronology, while ontology remains fixed-void plus evolving Noether sea state.

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

The [Euclidean void](../../../../markdown/aaa/foundations/euclidean-void.md) does not expand. What evolves is the Noether sea and the state of assemblies moving through it.

### Effective Scale Factor in a Fixed Void

Define an effective scale history from medium structure:

$$
a(t)\propto \frac{\langle L_{\text{core}}(t)\rangle}{\langle L_{\text{core}}(t_{\text{ref}})\rangle}
$$

where $L_{\text{core}}$ is a representative assembly-separation scale.

This $a(t)$ is a summary of medium evolution inside fixed $(x,y,z)$, not geometric stretching of the container.

Equivalent bookkeeping choices can be used in the same ontology:

$$
a(t)\ \leftrightarrow\ \langle R_{\text{core}}(t)\rangle
\quad\text{or}\quad
a(t)\propto u_{\text{sea}}(t)^{-1/3}
$$

These are effective parameterizations of Noether sea state, not independent geometric claims.

Quasi-steady and cyclical comparison families may use an oscillatory effective scale history such as
$$
a_{\mathrm{eff},X}(t)
=
e^{t/P}
\left[
1+\alpha\cos\left(\frac{2\pi t}{Q}+\varphi\right)
\right],
\qquad
P\gg Q
$$
In this framework that expression is only a projection of Noether sea state recurrence, source recycling, and clock or transport response. It does not describe expansion of the Euclidean void. Such a branch is admissible only if the same Noether sea state record supplies the source term, redshift-transfer map, CMB thermal record, and BBN yield record.

#### Exponential Scale History as a Comparison Limit

The de Sitter and steady-state comparison family often uses a spatially flat exponential scale history,
$$
a_{\mathrm{eff}}(t)=a_0 e^{H_*t},
\qquad
H_{\mathrm{eff}}=H_*
$$
In $\mathbb{A}\mathbb{A}\mathbb{A}$ this is not evidence that the Euclidean void expands. It is a special homogeneous projection in which the corrected redshift-transfer slope is constant over the comparison interval. In the endpoint-subtracted propagation language below, the nearby homogeneous limit must satisfy
$$
\bar{\alpha}_X=\frac{H_*}{c_0}
$$
after endpoint cadence, source-branch change, and relative launch motion have been removed.

The steady-state lesson is a conservation check on this limit. Holding an effective matter density constant while $a_{\mathrm{eff}}$ grows requires a source term
$$
\mathcal{S}_{m,\mathrm{eff}}=3H_*\rho_{m,\mathrm{eff}}
$$
and that source must be routed through the same assembly and Noether sea provenance record that computes the redshift-transfer slope. A constant $H_*$ fit without this ledger is only a kinematic comparison curve.

### Clock-Rate Redshift Interpretation

Cosmological redshift is treated as cumulative propagation through a changing medium plus clock-rate mismatch between emitter and observer environments.

Use the proper-time map from [Proper Time and Time Dilation](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md):

$$
\frac{d\tau}{dt}=F\!\left(\mathbf{v},\rho_{\text{NS}}(\mathbf{x},t),n(\mathbf{x},t),\chi_{\text{sea}}(\mathbf{x},t),\Phi_{\text{eff}},\text{clock geometry}\right)
$$

A photon that traverses regions with different $\rho_{\text{NS}}(\mathbf{x},t)$, $n(\mathbf{x},t)$, $\chi_{\text{sea}}(\mathbf{x},t)$, and $\Phi_{\text{eff}}$ is read by clocks with different local rates. The observed $z$ is then an emergent comparison of those rates along the path-history record.

Operationally:

$$
1+z = \frac{\nu_e}{\nu_o}
= \frac{(d\tau/dt)_o}{(d\tau/dt)_e}
$$

so redshift is treated as path-integrated medium evolution plus endpoint clock-rate comparison.

The stronger reading is that redshift is one sign of a broader photon-frequency transfer record. A photon packet may arrive redward of the clean emitted line, blueward of it, or unchanged after endpoint, source-branch, launch, and path terms have been separated. Define the signed frequency-transfer budget

$$
Z_X^{E\to R}
\equiv
\ln\frac{\nu_{X,0}}{\nu_{\mathrm{obs},X}}
$$

so $Z_X>0$ is redward relative to the clean reference line and $Z_X<0$ is blueward. A path segment that transfers energy from an energetic intervening medium into the photon-channel packet contributes a negative increment to the path term, while a segment that transfers photon energy into a lower-energy medium contributes a positive increment. Sunyaev-Zeldovich-type comparisons are the observed calibration family for this point: CMB photon frequencies can be shifted by intervening electron populations, so photon frequency is a path-history observable rather than a primitive expansion clock.

For modeling and diagnostics, separate at least three effective channels:

- endpoint clock-rate comparison,
- source/observer relative-motion (Doppler-like) contribution,
- propagation contribution from traversed Noether sea state and gradients.

#### Absolute Record Interpretation

The substrate record is not a collection of observer frames. It is the evolving universe state

$$
\mathbb{U}_{\text{now}}=S(t)
$$

where absolute time $t$ indexes definite architrino positions, velocities, assemblies, causal wakes, Noether sea state variables, and path-history ledgers in the fixed Euclidean void. Redshift must therefore be read as an observer-level extraction from that absolute record, not as a primitive change in space or time.

| Layer | Substrate role in redshift |
| --- | --- |
| Euclidean void | The container does not expand or curve; spatial points keep their identity. |
| Absolute time | $t$ does not dilate; it orders the emission, propagation, and reception events. |
| Noether sea | The Noether sea deforms, flows, polarizes, relaxes, and changes cadence. |
| Emitter | A local assembly changes branch and releases a photon-channel packet. |
| Photon packet | The packet carries a definite path-history record through the Noether sea. |
| Receiver | A local assembly samples or captures the packet using its own local cadence. |
| Measured energy | $E_{\mathrm{obs}}=h\nu_{\mathrm{obs}}$ is the receiver-coupling result, not a standalone scalar detached from emission, path, and reception. |

The central distinction is that nothing happens to absolute time itself. What changes are local cycle rates, launch geometry, and path-history phase cadence inside the Noether sea. A strong-field redshift near a compact object is the high-gradient endpoint limit of this record. A deep-space redshift is the gentle-gradient, long-path limit, if the path-history propagation term survives the required image-sharpness, coherence, and time-dilation tests.

#### Noether Sea Braid Factorization Target

A sharper closure target rewrites the endpoint clock-rate comparison in terms of the local Noether sea braid cadence itself. Let $\Omega_N(\mathbf{x},t)$ denote a representative local Noether sea braid cadence and $T_N(\mathbf{x},t)=2\pi/\Omega_N(\mathbf{x},t)$ its cycle period. Relative to a weak homogeneous reference core, define

$$
\Gamma_N(\mathbf{x},t)
\equiv
\frac{T_N(\mathbf{x},t)}{T_{N0}}
=
\frac{\Omega_{N0}}{\Omega_N(\mathbf{x},t)}
$$

The factor $\Gamma_N$ is not a new time variable. It records how strongly the local Noether sea braid cadence is stretched relative to the weak homogeneous reference. In a validated homogeneous Lorentz-closure branch, $\Gamma_N$ should reduce to the corresponding moving Noether braid deformation factor; outside that limit it remains a Noether sea state diagnostic to be derived from Noether braid geometry and clock extraction. The endpoint extraction target is stated in [Proper Time and Time Dilation](../../../../markdown/aaa/spacetime/proper-time-and-time-dilation.md#gamma-n-geometry-extraction-target), where the moving Noether braid limit fixes the coefficient of $-\ln\xi$ and the weak-field endpoint limit fixes one isotropic Noether sea response combination.

For a spectral transition family $X$, the working redshift factorization is

$$
1+z_X
\approx
\frac{\Gamma_{N,E}}{\Gamma_{N,R}}\,
\frac{\mathcal{P}_{E\to R}}
{B_X(E)\,\mathcal{L}_{E\to R}(\hat{\mathbf{k}})}
$$

Here $\Gamma_{N,E}/\Gamma_{N,R}$ is the emitter-to-receiver Noether sea braid cadence ratio, $\mathcal{P}_{E\to R}$ is the path-history propagation factor through the intervening Noether sea, $B_X(E)$ records any real source-branch shift in the emitting transition, and $\mathcal{L}_{E\to R}(\hat{\mathbf{k}})$ records directional launch geometry from relative motion. The clean reference case has $B_X(E)=1$ and negligible path accumulation. Strong local-gradient redshift is dominated by $\Gamma_{N,E}/\Gamma_{N,R}$; gentle deep-space redshift may instead accumulate mainly through $\mathcal{P}_{E\to R}$.

The logarithmic budget makes the scale hierarchy explicit:

$$
\ln(1+z_X)
\approx
\ln\Gamma_{N,E}
-\ln\Gamma_{N,R}
+\ln\mathcal{P}_{E\to R}
-\ln B_X(E)
-\ln\mathcal{L}_{E\to R}(\hat{\mathbf{k}})
$$

A factor may be set to $1$ only when its logarithmic contribution is small relative to the dominant contribution and to the observational tolerance. This prevents the same redshift record from silently switching between gravitational, relative-motion, source-branch, and propagation explanations.

In this convention the path-history term is explicitly signed:

$$
Y_{X,E\to R}
=
\sum_j \Delta Y_{X,j},
\qquad
\Delta Y_{X,j}
=
-\ln\frac{\nu_{X,j}^{+}}{\nu_{X,j}^{-}}
\quad
\text{after endpoint, source, and launch terms are held fixed}
$$

Here $\nu_{X,j}^{-}$ and $\nu_{X,j}^{+}$ are the photon-channel frequencies immediately before and after the segment-level exchange as read by the same comparison clock. A frequency boost has $\Delta Y_{X,j}<0$; a frequency depletion has $\Delta Y_{X,j}>0$. The local exchange must close an energy ledger such as

$$
\mathcal{R}_{\nu\text{-}\mathrm{ex},j}
=
\frac{
\left|
h(\nu_{X,j}^{+}-\nu_{X,j}^{-})
+\Delta E_{\mathrm{med},j}
+\Delta E_{\mathrm{recoil},j}
+\Delta E_{\mathrm{rem},j}
\right|
}{\epsilon_E}
$$

where $\Delta E_{\mathrm{med}}$, $\Delta E_{\mathrm{recoil}}$, and $\Delta E_{\mathrm{rem}}$ are positive or negative according to the retained medium, target, and remnant energy changes. A cosmological path term is admissible only when the signed frequency transfer, image sharpness, packet cadence, spectral coherence, and energy ledger are supplied by one Noether sea record.

Because this fixed-void account keeps absolute time, a long path also needs a finite-window energy residual rather than an expansion sink:

$$
\mathcal{R}_{E,\mathrm{path}}^\Omega
=
\frac{
\left|
\Delta E_{\gamma,\Omega}
+\Delta E_{\mathrm{sea},\Omega}
+\Delta E_{\mathrm{src/rem},\Omega}
+\Delta E_{\mathrm{recoil},\Omega}
+\int_{\partial\Omega}\mathcal{F}_E\,dA\,dt
\right|
}{\epsilon_E}
$$

The signs follow the same retained path-history record: $\Delta E_{\gamma,\Omega}$ is the photon-channel change across the comparison window, $\Delta E_{\mathrm{sea},\Omega}$ is the Noether sea update, $\Delta E_{\mathrm{src/rem},\Omega}$ covers declared source or remnant rows, $\Delta E_{\mathrm{recoil},\Omega}$ covers material recoil or target exchange, and the boundary flux term records energy entering or leaving the finite window. A deep-space redshift branch earns standing only when the same Noether sea transport that preserves image sharpness and occupation shape also makes this residual small under the declared tolerance.

#### Redshift Energy Ledger

The finite-window residual above is the operational form of a stronger absolute-time target. Because the Euclidean void does not expand, the architecture cannot let cosmological redshift energy disappear into expansion bookkeeping. The substrate time-translation symmetry nominates a scalar universe-state ledger

$$
E_{\mathrm{tot}}(t)
=
E_{\mathrm{arch}}(t)
+E_{\mathrm{wake}}(t)
+E_{\mathrm{sea}}(t),
\qquad
\frac{dE_{\mathrm{tot}}}{dt}=0
$$

where $E_{\mathrm{arch}}$ collects architrino kinetic and configuration energy, $E_{\mathrm{wake}}$ collects causal-wake energy in flight, and $E_{\mathrm{sea}}$ collects Noether sea constitutive energy. This is a conservation target rather than a proved theorem until the delayed action or a quasi-Noether replacement supplies the required invariant.

The global form also assumes that the total energy on the constant-$t$ leaf is finite or convergently summable. If an unbounded populated Noether sea does not admit that sum, the operational conservation statement is local continuity on bounded regions:

$$
\partial_t\rho_E+\nabla\cdot\mathbf{S}_E=0
$$

and, for a finite comparison window $\Omega$,

$$
\frac{dE_{\Omega}}{dt}
+\int_{\partial\Omega}\mathbf{S}_E\cdot\hat{\mathbf n}\,dA
=0
$$

This is the same content as the finite-window residual above. The global ledger is the stronger theorem target; the bounded-region flux balance is the safe falsification form for cosmological transport.

For a transparent photon-channel bundle with $E_{\mathrm{obs}}=E_{\mathrm{emit}}/(1+z)$, the missing photon energy is

$$
\Delta E_{\gamma}
=
E_{\mathrm{emit}}-E_{\mathrm{obs}}
=
E_{\mathrm{emit}}\frac{z}{1+z}
$$

After source-branch, recoil, remnant, and boundary rows have been separated, a pure transparent-path redshift must close

$$
\Delta E_{\gamma}
+\Delta E_{\mathrm{sea,path}}
=0
$$

The same term $\Delta E_{\mathrm{sea,path}}$ is then not adjustable per observable. It must be the energy face of the transport operator that preserves occupation shape and image sharpness; its path integral must recover redshift-distance and observed $(1+z)$ time dilation; and its spatial gradient must remain compatible with the lensing and growth budgets. If those rows require separate Noether sea responses, the branch has reproduced the standard tension split rather than closing it.

#### Observable Frequency Form

The same factorization can be written in the more familiar language of an emitted line frequency and a received line frequency. If $\nu_{X,0}$ is the reference frequency for transition family $X$, then

$$
\nu_{\mathrm{obs}}
\approx
\nu_{X,0}\,
B_X(E)\,
\frac{\Gamma_{N,R}}{\Gamma_{N,E}}\,
D_v\,
\frac{1}{\mathcal{P}_{E\to R}}
$$

Equivalently,

$$
1+z_X
=
\frac{\nu_{X,0}}{\nu_{\mathrm{obs}}}
\approx
\frac{\Gamma_{N,E}}{\Gamma_{N,R}}\,
\frac{\mathcal{P}_{E\to R}}{B_X(E)D_v}
$$

Here $D_v$ is the launch or relative-motion frequency factor. In the simple radial comparison limit, let

$$
v_r
\equiv
(\mathbf{v}_R-\mathbf{v}_E)\cdot\hat{\mathbf{k}},
\qquad
\beta_r=\frac{v_r}{c_0}
$$

where $\hat{\mathbf{k}}$ points from emitter to receiver and $v_r > 0$ means the endpoint separation is increasing. The familiar comparison form is

$$
D_v
\approx
\sqrt{\frac{1-\beta_r}{1+\beta_r}}
\approx
1-\frac{v_r}{c_0}
\quad
\text{for } \lvert v_r\rvert\ll c_0
$$

The receiver-facing photon energy is the local coupling result

$$
E_{\mathrm{obs},X}
=
h\nu_{\mathrm{obs}}
\approx
h\nu_{X,0}\,
B_X(E)\,
\frac{\Gamma_{N,R}}{\Gamma_{N,E}}\,
D_v\,
\frac{1}{\mathcal{P}_{E\to R}}
$$

This is not an additional energy-loss term. The local emission ledger is carried by $\nu_{X,0}B_X(E)$, while the receiver reads that packet through endpoint cadence, launch geometry, and path-history propagation.

The hard closure question is therefore not which observer frame carries the true photon energy. It is whether one absolute Noether sea transport law can compute $\Gamma_N$, $D_v$, and $\mathcal{P}_{E\to R}$ from $S(t)$ without switching explanations between gravitational, relative-motion, and deep-space redshift cases.

The factor $D_v$ is not an independent ontology. It is the low-speed endpoint of the source/receiver launch-geometry term $\mathcal{L}_{E\to R}(\hat{\mathbf{k}})$.

#### Absolute-Record Transport Map

The first proof scaffold is to define one extraction map from the absolute record. For a line family $X$, emission event $E=(\mathbf{x}_E,t_E)$, reception event $R=(\mathbf{x}_R,t_R)$, and declared photon-channel path $\gamma_{E\to R}$, let

$$
\mathcal{S}_{X,E\to R}
\equiv
S(t)\big|_{\{E,R,X,\gamma_{E\to R},\theta_{\mathrm{sea}},\mathcal{H}_{\mathrm{wake}}\}}
$$

denote the restricted record containing the source assembly branch, receiver assembly branch, path-history wake ledger, Noether sea state variables, and photon-channel path data needed for the comparison. This is not an observer frame; it is the part of $\mathbb{U}_{\text{now}}\equiv S(t)$ consumed by the redshift calculation.

The transport map target is

$$
\mathfrak{T}_X[\mathcal{S}_{X,E\to R}]
=
\left(
\Gamma_{N,E},\,
\Gamma_{N,R},\,
B_X(E),\,
D_v,\,
Y_{X,E\to R}
\right)
$$

with

$$
Y_{X,E\to R}
\equiv
\ln\mathcal{P}_{E\to R,X}
$$

The recovered redshift is then

$$
Z_X[\mathcal{S}_{X,E\to R}]
\equiv
\ln(1+z_X)
=
\ln\Gamma_{N,E}
-\ln\Gamma_{N,R}
+Y_{X,E\to R}
-\ln B_X(E)
-\ln D_v
$$

Each term has a separate extraction rule.

Endpoint cadence is read from the local Noether sea braid cadence:

$$
\Gamma_{N,A}
=
\frac{\Omega_{N0}}
{\Omega_N(\mathbf{x}_A,t_A;\Pi_N S(t_A))},
\qquad
A\in\{E,R\}
$$

where $\Pi_N S(t_A)$ is the local Noether sea braid record near endpoint $A$. Source-branch shift is read before propagation:

$$
B_X(E)
=
\frac{\nu_{X,\mathrm{emit}}(E;\Pi_E S(t_E))}
{\nu_{X,0}}
$$

where $\Pi_E S(t_E)$ is the local source-assembly and environment record that determines whether the transition remains on the clean reference branch.

Launch geometry is the homogeneous-reference replay of the same source and receiver worldlines:

$$
D_v
\equiv
\left.
\frac{dN_\phi/dt_R}{dN_\phi/dt_E}
\right|_{\theta_{\mathrm{sea}}=\theta_0,\;\Gamma_N=1,\;B_X=1}
$$

where $N_\phi$ counts adjacent emitted phase markers received in the reference Noether sea state $\theta_0$. This definition isolates source/receiver motion and emission direction from endpoint cadence and path-history propagation. In the simple radial, weak-speed limit it reduces to

$$
D_v
\approx
\sqrt{\frac{1-\beta_r}{1+\beta_r}},
\qquad
\beta_r=\frac{(\mathbf{v}_R-\mathbf{v}_E)\cdot\hat{\mathbf{k}}}{c_0}
$$

Path-history propagation is then the remaining Noether sea transport integral:

$$
Y_{X,E\to R}
=
\int_{\gamma_{E\to R}}
\mathcal{C}_X
\!\left(
\Pi_\gamma S(t(\ell)),
\hat{\mathbf{k}}(\ell)
\right)d\ell
$$

with

$$
\Pi_\gamma S(t(\ell))
=
\left(
\boldsymbol{\theta}_\gamma,\,
\mathbf{u}_{\text{sea}},\,
S_{ij},\,
\mathcal{H}_{\mathrm{wake}}
\right)_{\gamma(\ell),t(\ell)}
$$

This makes the proof obligation explicit. A gravitational endpoint redshift is the special case $B_X=1$, $D_v=1$, and $Y_X\approx0$, with $\Gamma_N$ supplying the weak-field benchmark. A homogeneous relative-motion redshift is the special case $\Gamma_{N,E}=\Gamma_{N,R}=1$, $B_X=1$, and $Y_X=0$, with $D_v$ supplying the shift. A deep-space propagation redshift is the special case where endpoint and launch terms are controlled while $Y_X$ accumulates from the path-history Noether sea record.

The one-map closure condition is therefore

$$
\mathfrak{T}_X[\mathcal{S}_{X,E\to R}]
\quad\text{uses one }S(t)\text{ restriction and one coefficient record.}
$$

If the endpoint, launch, and propagation terms can be made to fit only by changing $\Pi_N S$, $\Pi_E S$, $\Pi_\gamma S$, or the coefficient row independently for each observational family, then the factorization is a useful diagnostic but not yet an $\mathbb{A}\mathbb{A}\mathbb{A}$ derivation.

#### Coherent Photon-Channel Bundle Transport

The transparent-path part of the redshift map cannot be an ordinary thermalizing loss process. Thermalization can prepare a radiation bath before the free-streaming record is fixed, and source/release regions can exchange energy with photon-channel packets. But once a photon bundle is being used as a transparent cosmological record, the admissible transport is a coherent rescaling map.

Let $\lambda_{E\to R,X}\equiv \mathcal{P}_{E\to R,X}=e^{Y_{X,E\to R}}$ be the path-history scaling factor after endpoint cadence, source-branch shift, and launch geometry have been separated. For a transported photon-channel bundle $\mathcal{B}$, write $\mathfrak{n}_\gamma(\nu,\hat{\mathbf{k}};\mathcal{B})$ for its dimensionless occupation-shape function; this is not the normalized Noether braid density $n(\mathbf{x},t)$. The transparent transport target is

$$
\nu_R=\frac{\nu_E}{\lambda_{E\to R,X}},
\qquad
T_R=\frac{T_E}{\lambda_{E\to R,X}},
\qquad
\mathfrak{n}_{\gamma,R}(\nu_R,\hat{\mathbf{k}}_R;\mathcal{B}_R)
=
\mathfrak{n}_{\gamma,E}(\lambda_{E\to R,X}\nu_R,\hat{\mathbf{k}}_E;\mathcal{B}_E)
+O(\epsilon_{\mathrm{spec}})
$$

with the bundle map also satisfying

$$
\|\Delta\mathbf{k}_{\perp}\|\le \epsilon_{\mathrm{img}},
\qquad
|\Delta\phi_{\perp}|\le \epsilon_{\mathrm{coh}},
\qquad
\sup_{\omega_a,\omega_b}
\left|
\frac{v_{g,\gamma}(\omega_a)-v_{g,\gamma}(\omega_b)}{c_0}
\right|
\le\epsilon_{\mathrm{tof}}
$$

after declared lensing, aperture, and detector terms have been removed. Equivalently, let $\mathcal{D}_{\lambda}$ denote global frequency dilation on the admitted photon-channel band and let $\mathcal{G}_{\mathrm{tr}}$ denote the transparent-transport generator. The coherent branch must satisfy

$$
[\mathcal{G}_{\mathrm{tr}},\mathcal{D}_{\lambda}]_{\mathrm{band}}
=O(\epsilon_{\mathrm{spec}}),
\qquad
\Delta\mathbf{k}_{\perp}=O(\epsilon_{\mathrm{img}}),
\qquad
\partial_\omega v_{g,\gamma}=O(\epsilon_{\mathrm{tof}})
$$

for the declared path-depth and Noether sea state. In words: the path term may shift every mode by the same fractional factor, but it may not hide stochastic photon creation, absorption/re-emission, chromatic diffusion, frequency-dependent group velocity, or undeclared transverse momentum transfer inside the redshift coefficient. If it does, it has reproduced the tired-light failure mode under a more sophisticated name or failed the long-baseline photon time-of-flight row.

#### Equilibrium-Transport Candidate for Path History

The current candidate for the gentle deep-space term is a Noether braid equilibrium transport law. In this reading, a weak-field path does not accumulate redshift because the photon loses energy as it scatters. It accumulates a phase-cadence path-history term because the photon packet traverses a Noether sea population whose braid-cadence distribution evolves in absolute time.

Let $f_N(\nu,\mathbf{x},t)$ be the local distribution of Noether braid cadence states, with representative braid energy $E_N=h\nu_N$. At the discrete level, each accepted $h$-scale transaction retunes a braid's cadence-scale closure rather than sliding a continuous single-braid frequency. The continuum current should therefore be read as the ensemble flux

$$
J_\nu
\sim
f_N
\left\langle
\dot{\nu}_N
\right\rangle_{\Delta A_{\mathrm{cyc}}=\pm h}
$$

with the average taken over accepted branch changes inside the coarse-graining cell. A provisional transport packet is

$$
\partial_t f_N
+\nabla\cdot(\mathbf{u}_{\mathrm{sea}}f_N)
+\partial_\nu J_\nu
=
S_{\mathrm{BH}}
+S_{\mathrm{GW}}
-R_{\mathrm{eq}}[f_N]
$$

where $J_\nu$ is the frequency-space relaxation current, $S_{\mathrm{BH}}$ is medium loading from black-hole recycling regions, $S_{\mathrm{GW}}$ is a gravitational-wave perturbation term, and $R_{\mathrm{eq}}[f_N]$ is the local neighbor-equilibration operator. The projection into the redshift budget should have the form

$$
\alpha_{\mathrm{prop},X}
=
\mathcal{A}_X\!\left[
f_N,\,
J_\nu,\,
S_{\mathrm{BH}},\,
S_{\mathrm{GW}},\,
R_{\mathrm{eq}};
\mathbf{x},t,\hat{\mathbf{k}}
\right]
$$

This is a closure target. If $J_\nu$ vanishes after coarse-graining, or if the source and equilibration terms cancel without a signed large-scale drift, the equilibrium law supplies no expansion-like effect. If the projection is nonzero, it must still pass the same image-sharpness, chromaticity, and packet time-dilation checks as the rest of $\mathcal{P}_{E\to R}$. That condition keeps the hypothesis out of the excluded tired-light class.

In a weak field sourced by masses $M_a$, the Newtonian benchmark potential is

$$
\Phi_N(\mathbf{x})
\approx
-\sum_a \frac{G M_a}{\|\mathbf{x}-\mathbf{x}_a\|}
$$

and the endpoint cadence recovery target gives

$$
\Gamma_N(\mathbf{x})
\approx
1-\frac{\Phi_N(\mathbf{x})}{c_0^2}
$$

For one approximately isolated mass $M$, this becomes

$$
\Gamma_N(r)
\approx
1+\frac{G M}{r c_0^2}
$$

Thus the familiar weak-field received-frequency estimate is

$$
\nu_{\mathrm{obs}}
\approx
\nu_{X,0}\,
B_X(E)\,
D_v\,
\frac{1}{\mathcal{P}_{E\to R}}\,
\frac{1-\Phi_N(R)/c_0^2}{1-\Phi_N(E)/c_0^2}
$$

This expression is useful because the factors show which effect is being neglected in a given environment. A laboratory line comparison may set $\mathcal{P}_{E\to R}\approx1$ and $B_X(E)\approx1$; a weak local-galaxy redshift may keep $D_v$ and suppress endpoint gravity; a black-hole-adjacent line must not suppress $\Gamma_{N,E}$ or the possibility that $B_X(E)$ has changed.

#### 21 cm Hydrogen Line Example

The neutral-hydrogen 21 cm line is a useful bookkeeping test because the inherited observer description is simple: the ground-state hyperfine branch changes from the triplet state to the singlet state and emits a line photon,

$$
\mathrm{H}^{(F=1)}
\rightarrow
\mathrm{H}^{(F=0)}
+\gamma_{21}
$$

The reference observer frequency is

$$
\nu_{21,0}\approx1.420405751\;\mathrm{GHz}
$$

This subsection does not derive the hyperfine splitting from $\mathbb{A}\mathbb{A}\mathbb{A}$ dynamics. That derivation remains downstream of the atomic spin and angular-momentum closure program described in [Atomic Transition Radiation](../../../../markdown/aaa/reactions/atomic-transition-radiation.md) and [Atomic Spectra](../../../../markdown/aaa/nuclear-atomic/atomic-spectra.md). The purpose here is to show how an accepted line record is routed through the redshift factorization.

For the 21 cm channel, define the source-branch factor by

$$
B_{21}(E)
\equiv
\frac{\nu_{21,E}^{\mathrm{branch}}}{\nu_{21,0}}
$$

where $\nu_{21,E}^{\mathrm{branch}}$ is the effective transition frequency of the emitting hydrogen branch after local material conditions are included but before endpoint clock-cadence comparison, launch geometry, or path propagation are applied. Then

$$
\nu_{\mathrm{obs},21}
\approx
\nu_{21,0}\,
B_{21}(E)\,
\frac{\Gamma_{N,R}}{\Gamma_{N,E}}\,
D_v\,
\frac{1}{\mathcal{P}_{E\to R}}
$$

and

$$
1+z_{21}
\approx
\frac{\Gamma_{N,E}}{\Gamma_{N,R}}\,
\frac{\mathcal{P}_{E\to R}}{B_{21}(E)D_v}
$$

Clean 21 cm emission means $B_{21}(E)=1$. In that case the hydrogen transition remains on its reference branch, and the observed shift is assigned to endpoint Noether sea cadence, relative launch motion, and path-history propagation. Uniform source motion through a homogeneous Noether sea should therefore enter $D_v$ by default, not $B_{21}$.

A nontrivial source branch means $B_{21}(E)\neq1$. This is the correct place to record local changes in the transition gap from strong acceleration, high-velocity internal assembly deformation, strong gravity or tidal stress, plasma and pressure effects, Zeeman or Stark splitting, collisions, or other conditions that alter the emitting hydrogen branch itself. In such a case the frequency has changed before the photon packet begins its path-history through the Noether sea. The source-branch term is therefore not a propagation redshift and not a second copy of the endpoint cadence factor.

#### Redshift-Budget Worked Examples

The unified equation should be used as a budget, not as a label. Each case begins with

$$
1+z_X
\approx
\frac{\Gamma_{N,E}}{\Gamma_{N,R}}\,
\frac{\mathcal{P}_{E\to R}}{B_X(E)D_v}
$$

The practical question is which logarithmic terms are small enough to set to $1$ after the environment and tolerance have been stated.

| Case | Controlled assumptions | Surviving estimate | Reading |
| --- | --- | --- | --- |
| Clean laboratory line comparison | $B_X(E)=1$, $D_v\approx1$, $\mathcal{P}_{E\to R}\approx1$, and $\Gamma_{N,E}/\Gamma_{N,R}\approx1$ when the clocks are colocated or corrected | $1+z_X\approx1$ | The line tests source stability and local clock calibration; no cosmological distance is inferred. |
| Ordinary galaxy redshift away from strong local potentials | $B_X(E)=1$ and $\Gamma_{N,E}/\Gamma_{N,R}\approx1$ after local gravitational corrections; keep $D_v$ for peculiar motion and $\mathcal{P}_{E\to R}$ for path accumulation | $1+z_X\approx\mathcal{P}_{E\to R}/D_v$ | Distance can be estimated only after separating peculiar motion from the Noether sea propagation residual. |
| Black-hole-adjacent line | No default suppression of $\Gamma_{N,E}/\Gamma_{N,R}$, $B_X(E)$, or $D_v$; $\mathcal{P}_{E\to R}$ may be near $1$ for a local comparison or nontrivial for a cosmological path | $1+z_X\approx(\Gamma_{N,E}/\Gamma_{N,R})\mathcal{P}_{E\to R}/(B_X(E)D_v)$ | Endpoint cadence and source-branch deformation must be separated before treating the remaining shift as propagation. |

This table also explains why factors disappear in ordinary use. They disappear because the chosen environment makes their logarithmic contribution negligible relative to the measurement target, not because the mechanism ceases to exist in the ontology.

#### Limiting Recovery Cases

The factorization must recover familiar redshift regimes by controlled limits. The purpose is not to treat those inherited regimes as final ontology, but to show which Noether sea term carries each observational effect.

For weak-field gravitational redshift, take $B_X(E)=1$, $\mathcal{L}_{E\to R}=1$, and $\mathcal{P}_{E\to R}=1$. If the endpoint Noether sea braid cadence satisfies

$$
\frac{\Omega_N}{\Omega_{N0}}
\approx
1+\frac{\Phi_N}{c_0^2},
\qquad
\Gamma_N
\approx
1-\frac{\Phi_N}{c_0^2}
$$

then

$$
\ln(1+z_X)
\approx
\ln\Gamma_{N,E}-\ln\Gamma_{N,R}
\approx
\frac{\Phi_N(R)-\Phi_N(E)}{c_0^2}
$$

A source deeper in the potential has $\Phi_N(E) < \Phi_N(R)$, so the endpoint ratio produces redshift. This is the local strong-gradient limit of the same cadence map.

For relative-motion redshift in a nearly homogeneous medium, take $\Gamma_{N,E}\approx\Gamma_{N,R}$, $\mathcal{P}_{E\to R}=1$, and $B_X(E)=1$. Let $\hat{\mathbf{k}}$ point from emitter to receiver. In the low-speed line-of-sight limit, the launch factor should reduce to

$$
\mathcal{L}_{E\to R}(\hat{\mathbf{k}})
\approx
1+\frac{(\mathbf{v}_E-\mathbf{v}_R)\cdot\hat{\mathbf{k}}}{c_0}
$$

so

$$
1+z_X
\approx
\frac{1}{\mathcal{L}_{E\to R}(\hat{\mathbf{k}})}
$$

Motion that compresses the emitted phase train toward the receiver gives $\mathcal{L}_{E\to R} > 1$ and a blueward shift; motion that stretches the phase train gives $\mathcal{L}_{E\to R} < 1$ and a redward shift.

For clean source spectroscopy, $B_X(E)=1$ means the source transition itself remains on its reference branch. If high acceleration, strong gravity, plasma, magnetic environment, tidal distortion, or other local conditions alter the transition gap, then $B_X(E)\neq1$. That contribution is not propagation redshift. It records a changed emission branch before the packet begins its path-history through the Noether sea.

For gentle deep-space accumulation, take $\Gamma_{N,E}\approx\Gamma_{N,R}$, $\mathcal{L}_{E\to R}\approx1$, and $B_X(E)=1$. Then

$$
1+z_X
\approx
\mathcal{P}_{E\to R}
$$

A useful continuous form is

$$
\ln\mathcal{P}_{E\to R}
=
\int_{\gamma_{E\to R}}
\alpha_{\mathrm{prop}}\!\left(
\rho_{\text{NS}},n,\chi_{\text{sea}},\Phi_{\text{eff}},
\hat{\mathbf{k}},X
\right)\,d\ell
$$

where $\alpha_{\mathrm{prop}}$ is a path-local propagation-rate functional along the Euclidean path element $d\ell$. Any nonzero $\alpha_{\mathrm{prop}}$ must preserve image sharpness, spectral coherence, and $(1+z)$ time-dilation consistency; otherwise it degenerates into an excluded tired-light mechanism.

#### Candidate Propagation Functional

The first closure target is an endpoint-subtracted propagation functional. Static endpoint cadence belongs in $\Gamma_{N,E}/\Gamma_{N,R}$, so the path functional must vanish in a static homogeneous Noether sea with no flow:

$$
\alpha_{\mathrm{prop},X}=0
\quad
\text{for static homogeneous no-flow reference conditions}
$$

A minimal candidate form is

$$
\alpha_{\mathrm{prop},X}
=
a_\chi^X\,\frac{1}{c_\gamma}\,\partial_t\ln\chi_\gamma
+a_n^X\,\frac{1}{c_\gamma}\,\partial_t\ln n
+a_R^X\,\frac{1}{c_\gamma}\,\partial_t\ln R_{\text{core}}
+a_u^X\,\frac{\nabla\cdot\mathbf{u}_{\text{sea}}}{c_0}
+a_S^X\,\frac{\hat{\mathbf{k}}^i\hat{\mathbf{k}}^j S_{ij}}{c_0}
+\mathcal{R}_{\mathrm{prop},X}
$$

Here all quantities are evaluated at the path point crossed by the photon packet. The photon-channel speed is $c_\gamma$, and $\chi_\gamma(\mathbf{x},t)\equiv c_0/c_\gamma(\mathbf{x},t)$ is used only when the photon channel is the explicit transport subject. The symbols $n(\mathbf{x},t)$ and $R_{\text{core}}(\mathbf{x},t)$ denote normalized Noether braid density and a representative local Noether braid scale. The vector $\mathbf{u}_{\text{sea}}$ is an effective Noether sea flow velocity, and

$$
S_{ij}
=
\frac{1}{2}
\left(
\partial_i u_{\text{sea},j}
+\partial_j u_{\text{sea},i}
\right)
-\frac{1}{3}
\left(\nabla\cdot\mathbf{u}_{\text{sea}}\right)h_{ij}
$$

is the trace-free strain-rate part, with contractions taken using the Euclidean spatial metric $h_{ij}$. The coefficients $a_\chi^X$, $a_n^X$, $a_R^X$, $a_u^X$, and $a_S^X$ are dimensionless closure coefficients for the line family $X$, not independent fitting parameters for each object. The residual $\mathcal{R}_{\mathrm{prop},X}$ contains unresolved higher-order and anisotropic terms and must be bounded by the same image-sharpness, coherence, and time-dilation constraints that exclude ordinary tired-light loss.

This ansatz gives the distance ladder a concrete target: recover the observed low-redshift slope from the leading homogeneous part of $\alpha_{\mathrm{prop},X}$, while requiring local gravitational redshift, motion, and source-branch changes to be removed before fitting path accumulation.

#### First-Order Coefficient Constraints

At first order the propagation ansatz constrains combinations of coefficients, not each coefficient separately. Let barred quantities denote the homogeneous isotropic component at observation time $t_{\mathrm{obs}}$, with $\bar S_{ij}=0$. Then the path rate entering the corrected low-redshift slope is

$$
\bar\alpha_X(t_{\mathrm{obs}})
=
a_\chi^X\,\frac{\dot{\bar\chi}_\gamma}{c_\gamma\bar\chi_\gamma}
+a_n^X\,\frac{\dot{\bar n}}{c_\gamma\bar n}
+a_R^X\,\frac{\dot{\bar R}_{\text{core}}}{c_\gamma\bar R_{\text{core}}}
+a_u^X\,\frac{\nabla\cdot\bar{\mathbf{u}}_{\text{sea}}}{c_0}
+\bar{\mathcal R}_{\mathrm{prop},X}
$$

After endpoint cadence, source branch, and relative motion are removed, the nearby homogeneous limit requires

$$
\left.
\bar\alpha_X
\right|_{t_{\mathrm{obs}}}
=
\frac{H_{0,\mathbb{A}\mathbb{A}\mathbb{A}}(X)}{c_0}
$$

If the corrected low-redshift relation is line-family independent, then two clean line families $X$ and $Y$ must also satisfy the chromaticity bound

$$
\left|
\bar\alpha_X-\bar\alpha_Y
\right|
\le
\epsilon_{\mathrm{chrom}}
$$

where $\epsilon_{\mathrm{chrom}}$ is set by corrected multi-line spectroscopy. This prevents the line-family coefficients from being used as arbitrary object-by-object fitting parameters.

For a finite path, write

$$
\alpha_{\mathrm{prop},X}
=
\bar\alpha_X
+\delta\alpha_{\mathrm{prop},X}
$$

Then

$$
Z_{\mathrm{prop},X}
=
\bar\alpha_X D
+\int_0^D
\delta\alpha_{\mathrm{prop},X}(\ell,\hat{\mathbf{k}})\,d\ell
+O(D^2\partial_\ell\bar\alpha_X)
$$

The simple distance estimate $D\approx Z_{\mathrm{prop},X}/\bar\alpha_X$ is therefore valid only when the path residual is small compared with the homogeneous term:

$$
\left|
\int_0^D
\delta\alpha_{\mathrm{prop},X}(\ell,\hat{\mathbf{k}})\,d\ell
\right|
\ll
\bar\alpha_X D
$$

Image sharpness and spectral coherence constrain the same residual. Across neighboring rays in the image bundle,

$$
\mathrm{Var}_{\mathrm{beam}}\!\left[
\int_\gamma
\delta\alpha_{\mathrm{prop},X}\,d\ell
\right]
\le
\epsilon_{\mathrm{img}}^2
$$

and across a narrow corrected line profile,

$$
\mathrm{Var}_{\mathrm{line}}\!\left[
\int_\gamma
\delta\alpha_{\mathrm{prop},X}\,d\ell
\right]
\le
\sigma_{\ln\nu,X}^2
$$

These bounds mainly discipline the anisotropic strain term, environmental gradients, and $\mathcal{R}_{\mathrm{prop},X}$. A propagation explanation that accumulates redshift by large stochastic phase loss would violate these inequalities and would fall back into the excluded tired-light class.

Finally, the observed $(1+z)$ time-dilation consistency requires the phase-frequency propagation rate and packet-cadence propagation rate to agree after the same corrections are applied:

$$
\left|
\int_\gamma
\left(
\alpha_{\mathrm{prop},X}^{(\nu)}
-\alpha_{\mathrm{prop},X}^{(\Delta t)}
\right)d\ell
\right|
\le
\epsilon_{\mathrm{TD}}
$$

The strongest closure is to derive one $\alpha_{\mathrm{prop},X}$ from the Noether sea transport dynamics so that frequency shift and arrival-cadence stretching are the same path-history effect rather than two separately fitted rules.

#### Transport Derivation Target

The coefficient ansatz can be recast as a transport equation for an effective packet-stretch variable rather than introduced only as a fit function. Let

$$
Y_X(\ell)
\equiv
\ln\mathcal{P}_{E\to \ell,X}
$$

denote the accumulated logarithmic propagation stretch from the emitter to path location $\ell$. Along a photon-channel ray, define the path derivative

$$
\frac{d}{d\ell}
\equiv
\hat{\mathbf{k}}^i\partial_i
+\frac{1}{c_\gamma}\partial_t
$$

The minimal transport closure target is

$$
\frac{dY_X}{d\ell}
=
\mathcal{C}_X\!\left(
\partial_t\boldsymbol{\theta}_\gamma,
\nabla\mathbf{u}_{\text{sea}},
\hat{\mathbf{k}}
\right)
$$

with

$$
\boldsymbol{\theta}_\gamma
\equiv
\left(
\ln\chi_\gamma,\,
\ln n,\,
\ln R_{\text{core}}
\right)
$$

Here $Y_X$ is an effective packet bookkeeping variable, not a new substrate object. The substrate content is the Noether sea state and its path-history response; $Y_X$ records how that state changes the packet spacing seen by the receiver after endpoint and source corrections are removed.

Euclidean rotational symmetry allows the first-order scalar expansion

$$
\mathcal{C}_X
=
a_\chi^X\,\frac{1}{c_\gamma}\,\partial_t\ln\chi_\gamma
+a_n^X\,\frac{1}{c_\gamma}\,\partial_t\ln n
+a_R^X\,\frac{1}{c_\gamma}\,\partial_t\ln R_{\text{core}}
+a_u^X\,\frac{\nabla\cdot\mathbf{u}_{\text{sea}}}{c_0}
+a_S^X\,\frac{\hat{\mathbf{k}}^i\hat{\mathbf{k}}^j S_{ij}}{c_0}
+\mathcal{R}_{\mathrm{prop},X}
$$

which reproduces the candidate $\alpha_{\mathrm{prop},X}$ when $dY_X/d\ell=\alpha_{\mathrm{prop},X}$. The coefficients are the linear-response derivatives of the transport map at the static homogeneous no-flow reference state. For example, for $q\in\{\ln\chi_\gamma,\ln n,\ln R_{\text{core}}\}$,

$$
a_q^X
=
\left.
\frac{\partial \mathcal{C}_X}
{\partial\left[(1/c_\gamma)\partial_t q\right]}
\right|_0
$$

The same closure must show that the phase-frequency rate and the arrival-cadence rate share this $Y_X$ variable. If the Noether sea transport dynamics instead require separate variables for frequency shift and packet cadence, then the unified propagation explanation fails the time-dilation recovery and the residual must be moved out of $\mathcal{P}_{E\to R}$.

#### Dark-Energy Handoff to Transport

The [Dark Energy](../../../../markdown/aaa/cosmology/dark-energy.md) module can feed the transport map only by supplying a Noether sea state history. In the redshift budget, its native entry point is the time derivative of $\boldsymbol{\theta}_\gamma$, plus any associated flow and strain terms. With the dark-energy handoff written as

$$
\partial_t\boldsymbol{\theta}_\gamma
=
\mathbf{J}_{\mathrm{DE}}\mathbf{q}_{\mathrm{DE}}
+
\partial_t\boldsymbol{\theta}_{\gamma,\mathrm{local}}
$$

where

$$
\mathbf{q}_{\mathrm{DE}}
\equiv
\begin{pmatrix}
\partial_t\ln\rho_{\mathrm{DE,eff}}\\
\partial_t w_{\mathrm{eff}}\\
\mathcal{S}_{\mathrm{sea}}/\rho_{\mathrm{DE,eff}}\\
\mathcal{S}_{\mathrm{BH}}/\rho_{\mathrm{DE,eff}}
\end{pmatrix}
$$

the induced propagation contribution is

$$
\alpha_{\mathrm{prop},X}^{\mathrm{DE}}
=
\frac{1}{c_\gamma}
\begin{pmatrix}
a_\chi^X & a_n^X & a_R^X
\end{pmatrix}
\mathbf{J}_{\mathrm{DE}}\mathbf{q}_{\mathrm{DE}}
$$

This bridge keeps the level distinction explicit. The effective quantities $\rho_{\mathrm{DE,eff}}$ and $w_{\mathrm{eff}}$ remain observer-side summaries of medium relaxation. They affect redshift only insofar as the underlying Noether sea response changes $\chi_\gamma$, $n$, $R_{\text{core}}$, flow, or strain along the path. A fit that assigns $H(z)$ directly while bypassing this handoff is a comparison model, not a completed $\mathbb{A}\mathbb{A}\mathbb{A}$ derivation.

For the homogeneous first-order branch, define the transport-facing row

$$
\boldsymbol{\lambda}_X^T
\equiv
\begin{pmatrix}
a_\chi^X & a_n^X & a_R^X
\end{pmatrix}
\mathbf{J}_{\mathrm{DE}}
=
\begin{pmatrix}
\lambda_\rho^X & \lambda_w^X & \lambda_{\mathrm{sea}}^X & \lambda_{\mathrm{BH}}^X
\end{pmatrix}
$$

Then

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

with $q_\rho=\partial_t\ln\rho_{\mathrm{DE,eff}}$, $q_w=\partial_t w_{\mathrm{eff}}$, $q_{\mathrm{sea}}=\mathcal{S}_{\mathrm{sea}}/\rho_{\mathrm{DE,eff}}$, and $q_{\mathrm{BH}}=\mathcal{S}_{\mathrm{BH}}/\rho_{\mathrm{DE,eff}}$. If the same homogeneous branch also obeys the effective continuity identity

$$
q_\rho
=
-3H_{\mathrm{eff}}(1+w_{\mathrm{eff}})
+q_{\mathrm{sea}}
+q_{\mathrm{BH}}
$$

and if $H_{\mathrm{eff},X}^{\mathrm{DE}}=c_0\alpha_{\mathrm{prop},X}^{\mathrm{DE}}$, then the redshift-transfer slope implied by this coefficient packet is

$$
H_{\mathrm{eff},X}^{\mathrm{DE}}
=
\frac{
\frac{c_0}{c_\gamma}
\left[
\lambda_w^X\,\partial_t w_{\mathrm{eff}}
+(\lambda_\rho^X+\lambda_{\mathrm{sea}}^X)\frac{\mathcal{S}_{\mathrm{sea}}}{\rho_{\mathrm{DE,eff}}}
+(\lambda_\rho^X+\lambda_{\mathrm{BH}}^X)\frac{\mathcal{S}_{\mathrm{BH}}}{\rho_{\mathrm{DE,eff}}}
\right]
}{
1+3\frac{c_0}{c_\gamma}\lambda_\rho^X(1+w_{\mathrm{eff}})
}
$$

This is the first coefficient-level meaning of an $\mathbb{A}\mathbb{A}\mathbb{A}$ Hubble-like number. It is a solved transfer coefficient for a declared clean branch, not a primitive expansion rate. The denominator must stay finite, and the numerator must be compatible across line families and cadence diagnostics before the result can be promoted from coefficient packet to cosmological closure.

#### Distance and Effective Hubble Coefficient

Redshift alone is not distance in this framework. A redshift becomes a distance estimate only after endpoint cadence, source-branch shift, relative motion, and path-history propagation have been separated. Define the propagation residual

$$
Z_{\mathrm{prop},X}
\equiv
\ln(1+z_X)
-\ln\Gamma_{N,E}
+\ln\Gamma_{N,R}
+\ln B_X(E)
+\ln D_v
$$

When the factorization is valid,

$$
Z_{\mathrm{prop},X}
=
\ln\mathcal{P}_{E\to R}
=
\int_0^D
\alpha_{\mathrm{prop}}\!\left(\ell,\hat{\mathbf{k}},X,\theta_{\mathrm{sea}}\right)\,d\ell
$$

where $D$ is Euclidean path length through the Euclidean void and $\theta_{\mathrm{sea}}$ denotes the shared Noether sea state record used by the cosmology modules. If the path-local propagation rate is approximately constant over the relevant nearby region, $\alpha_{\mathrm{prop}}\approx\alpha_0$, then

$$
D
\approx
\frac{Z_{\mathrm{prop},X}}{\alpha_0}
$$

The effective present-epoch Hubble coefficient is therefore a transfer-map slope, not an expansion rate of the Euclidean void:

$$
H_{0,\mathbb{A}\mathbb{A}\mathbb{A}}(\hat{\mathbf{k}},X)
\equiv
c_0
\left.
\frac{\partial Z_{\mathrm{prop},X}}{\partial D}
\right|_{D\to0,\hat{\mathbf{k}}}
\approx
c_0\alpha_0
$$

In the homogeneous, isotropic, clean-source, low-redshift limit this reproduces the familiar observer formula

$$
D
\approx
\frac{c_0}{H_{0,\mathbb{A}\mathbb{A}\mathbb{A}}}
\ln(1+z)
\approx
\frac{c_0 z}{H_{0,\mathbb{A}\mathbb{A}\mathbb{A}}}
$$

The symbol $H_0$ can therefore remain in the comparison language, but its physical meaning changes. It summarizes the present local redshift-per-distance coefficient of Noether sea transport and clock-rate comparison after source and motion corrections. It is not a direct measurement of space stretching. Directional or environmental variation in the inferred $H_0$ is not automatically a calibration failure; it is a diagnostic of whether the local Noether sea state is close enough to the homogeneous limit used by the distance ladder.

Distance observables must also keep the flux factors separate. In the homogeneous comparison limit, luminosity distance is not only a geometric area proxy; it packages photon energy redshift and arrival-rate dilation:
$$
F
=
\frac{L}{4\pi D_A^2(1+z)^2},
\qquad
d_L=(1+z)^2D_A
$$
For a low-redshift effective FRW projection this becomes
$$
d_L(z)
=
\frac{c_0}{H_{0,\mathrm{eff}}}
\left[
z+\frac12(1-q_{0,\mathrm{eff}})z^2+O(z^3)
\right]
$$
In the fixed-void reading, $H_{0,\mathrm{eff}}$ and $q_{0,\mathrm{eff}}$ are coefficients of the corrected transport and clock-comparison map. A branch that fits redshift but fails the two flux factors, time-dilation factor, or angular-distance reciprocity has not recovered the cosmological distance ladder.

#### Local Redshift-Transfer Curve

The corrected propagation residual should be modeled as a local transfer curve before it is averaged into any Hubble-like number. Let the receiver event be $R=(\mathbf{x}_R,t_R)$, and let $\hat{\mathbf{k}}$ point from emitter to receiver. Measure Euclidean path distance $s$ backward from the receiver toward the emitter:

$$
\mathbf{x}(s)=\mathbf{x}_R-s\hat{\mathbf{k}},
\qquad
t(s)
=
t_R-\int_0^s\frac{d\ell}{c_\gamma(\mathbf{x}(\ell),t(\ell))}
$$

For a source at corrected Euclidean path length $D$, the propagation residual is

$$
Z_{\mathrm{prop},X}(D,\hat{\mathbf{k}})
=
\int_0^D
\alpha_{\mathrm{prop},X}
\!\left(
\mathbf{x}(s),
t(s),
\hat{\mathbf{k}},
\theta_{\mathrm{sea}}(s)
\right)\,ds
$$

The local effective Hubble coefficient is only the first derivative of this curve at the receiver:

$$
H_{\mathrm{eff},X}(R,\hat{\mathbf{k}})
\equiv
c_0
\left.
\frac{\partial Z_{\mathrm{prop},X}}{\partial D}
\right|_{D=0}
=
c_0\,\alpha_{R,X}(\hat{\mathbf{k}})
$$

where

$$
\alpha_{R,X}(\hat{\mathbf{k}})
\equiv
\alpha_{\mathrm{prop},X}
\!\left(
\mathbf{x}_R,
t_R,
\hat{\mathbf{k}},
\theta_{\mathrm{sea},R}
\right)
$$

The second derivative records the first local departure from a constant-slope Hubble law:

$$
\mathcal{K}_{X}(R,\hat{\mathbf{k}})
\equiv
\left.
\frac{\partial^2 Z_{\mathrm{prop},X}}{\partial D^2}
\right|_{D=0}
=
-\hat{\mathbf{k}}^i\partial_i\alpha_{\mathrm{prop},X}\big|_R
-\frac{1}{c_{\gamma,R}}\partial_t\alpha_{\mathrm{prop},X}\big|_R
$$

Thus the local curve has the expansion

$$
Z_{\mathrm{prop},X}(D,\hat{\mathbf{k}})
=
\alpha_{R,X}(\hat{\mathbf{k}})D
+
\frac{1}{2}\mathcal{K}_{X}(R,\hat{\mathbf{k}})D^2
+
O(D^3\nabla^2\theta_{\mathrm{sea}},D^3\partial_t^2\theta_{\mathrm{sea}})
$$

The ordinary constant-$H_0$ approximation is the special case in which $\alpha_{R,X}$ is independent of direction, line family, environment, and observation time, while $\mathcal{K}_{X}$ and higher derivatives remain negligible over the fitted distance range. In the general $\mathbb{A}\mathbb{A}\mathbb{A}$ case, $\alpha_{R,X}$ and $\mathcal{K}_{X}$ are observables of the local Noether sea state, not universal constants.

For environment-resolved modeling, a catalogue should first separate sources by the Noether sea path they sample. For an environment family $\mathcal{E}$, define

$$
\alpha_{\mathcal{E},X}(t,\hat{\mathbf{k}})
\equiv
\left\langle
\alpha_{\mathrm{prop},X}
\right\rangle_{\mathcal{E},t,\hat{\mathbf{k}}},
\qquad
\sigma_{\mathcal{E},X}^2
\equiv
\left\langle
\left(
\alpha_{\mathrm{prop},X}
-
\alpha_{\mathcal{E},X}
\right)^2
\right\rangle_{\mathcal{E},t,\hat{\mathbf{k}}}
$$

The useful first question is whether local voids, filaments, clusters, galaxy halos, and strong-source recycling environments share one $\alpha_{\mathcal{E},X}$ within tolerance after endpoint cadence, launch geometry, and source-branch factors have been removed. If they do not, a single all-sky $H_0$ is a lossy summary of distinct redshift-transfer environments.

#### $\Lambda\mathrm{CDM}$ Reference Curve

The standard curved-spacetime model remains useful as a reference curve. For a chosen comparison parameter record $\Theta_{\Lambda\mathrm{CDM}}$, define

$$
Z_{\Lambda\mathrm{CDM}}(D;\Theta_{\Lambda\mathrm{CDM}})
\equiv
\ln\!\left(
1+z_{\Lambda\mathrm{CDM}}(D;\Theta_{\Lambda\mathrm{CDM}})
\right)
$$

The $\mathbb{A}\mathbb{A}\mathbb{A}$ residual against that reference is

$$
\Delta Z_X(D,\hat{\mathbf{k}},\mathcal{E})
=
Z_{\mathrm{prop},X}^{\mathbb{A}\mathbb{A}\mathbb{A}}
\!\left(D,\hat{\mathbf{k}},\theta_{\mathrm{sea}}\right)
-
Z_{\Lambda\mathrm{CDM}}(D;\Theta_{\Lambda\mathrm{CDM}})
$$

This residual should be read as a comparison diagnostic, not as evidence that the Euclidean void literally follows the reference model. A successful reduction would show that $\Delta Z_X$ is produced by one shared Noether sea state record across supernovae, BAO, CMB transfer, and local calibration data. A failed reduction would require replacing $\theta_{\mathrm{sea}}$ or the transfer coefficients separately for each observable family.

#### Minimal Redshift-Budget Toy Model

The first numerical model should be a bookkeeping simulator for the factorized redshift record, not a claim of empirical recovery. Divide a Euclidean path of length $D$ into $N$ segments with points $(\mathbf{x}_j,t_j)$, direction $\hat{\mathbf{k}}$, and segment lengths $\Delta s_j$. The input record is

$$
\mathcal{I}_X
=
\left\{
\nu_{X,0},\,
B_X(E),\,
D_v,\,
\Gamma_{N,E},\,
\Gamma_{N,R},\,
\theta_{\mathrm{sea},j},\,
\hat{\mathbf{k}},\,
\Delta s_j
\right\}_{j=0}^{N-1}
$$

where

$$
\theta_{\mathrm{sea},j}
=
\left(
\chi_{\gamma,j},\,
n_j,\,
R_{\text{core},j},\,
\mathbf{u}_{\text{sea},j},\,
f_{N,j},\,
J_{\nu,j},\,
S_{ij}^{(j)},\,
\mathcal{R}_{\mathrm{prop},X}^{(j)}
\right)
$$

The propagation update is

$$
Y_{X,0}=0,
\qquad
Y_{X,j+1}
=
Y_{X,j}
+
\alpha_{\mathrm{prop},X}
\!\left(
\mathbf{x}_j,t_j,\hat{\mathbf{k}},\theta_{\mathrm{sea},j}
\right)\Delta s_j
$$

At the end of the path,

$$
\mathcal{P}_{E\to R,X}
=
\exp(Y_{X,N})
$$

and the reconstructed redshift budget is

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

The corresponding observed frequency and receiver-facing photon energy are

$$
\nu_{\mathrm{obs},X}
=
\nu_{X,0}\,\exp(-Z_X),
\qquad
E_{\mathrm{obs},X}
=
h\nu_{\mathrm{obs},X}
$$

The toy model should report at least five diagnostics:

- the corrected propagation residual $Y_{X,N}=Z_{\mathrm{prop},X}$;
- the effective nearby slope $H_{\mathrm{eff},X}\approx c_0Y_{X,N}/D$ for short paths;
- the integrated named transport contributions, such as equilibrium relaxation, SMBH loading, and gravitational-wave perturbation terms;
- the line-family chromaticity residual $\left|Y_{X,N}-Y_{Y,N}\right|$ for two clean lines $X$ and $Y$ over the same path;
- the time-dilation residual $\left|Y_{X,N}^{(\nu)}-Y_{X,N}^{(\Delta t)}\right|$ when frequency and packet-cadence updates are computed separately as a failure test.

This simulation is useful precisely because each factor can be turned on or off in a controlled way. A laboratory line should return $Y_{X,N}\approx0$ after local corrections. A clean galaxy path should isolate $Y_{X,N}$ from $D_v$. An equilibrium-transport path should show whether smooth coarse-grained $h$-step relaxation can supply $Y_{X,N}$ while gravitational-wave perturbations average below residual tolerance. A strong-source path should show when $\Gamma_{N,E}$ or $B_X(E)$ dominates enough that a propagation-only distance estimate is invalid.

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
+\cdots
$$

where $X$ may denote supernova distance modulus, BAO scale, CMB-frame correction, or another expansion observable. The monopole $O_{X,0}$ records the isotropic fit offset, $\mathbf{O}_{X,1}$ records the dipole, and higher terms record quadrupole and mask-dependent structure.

The Friedmann-like bridge below is usable only after these directional residuals are either within survey tolerance or derived from the same Noether sea variables that determine the clock-rate and transport maps. A residual dipole should not be absorbed silently into $H(z)$, $w(z)$, or calibration constants.

### Photon-Propagation Contribution

Beyond endpoint clock comparison, the same transport picture can include path-dependent phase-cadence evolution during medium transit. This is not untracked photon energy loss; it is the path-history part of how an emitted packet's cadence is later sampled by a receiver.

In this reading, effective redshift accumulation may depend on photon energy, traversed Noether sea state, and path environment, so redshift is modeled as a transport kernel rather than a single universal linear rule.

Line-of-sight medium flow and local contraction/expansion regions can, in principle, contribute signed shifts, so local blueward and redward biases should be treated within one transport kernel rather than as disconnected exceptions.

Propagation channels must preserve image sharpness and $(1+z)$ time-dilation consistency; models requiring generic scattering-loss redshift are excluded.

### Dissipation and Rescaling Picture

Apparent expansion is interpreted as relaxation of Noether sea state:

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

Early-inferred and local-inferred expansion rates probe different Noether sea states:

- Early probes sample a more uniform, less-relaxed sea history.
- Local probes sample pockets that are further along relaxation and dissipation trajectories.

So the $H_0$ split is interpreted as state-dependent inference from one ontology, not two incompatible universes.

In this framing, $H_0$ is not expected to be strictly universal at all environments; local scatter is read as part of Noether sea state dependence.

Quasar redshift distributions are interpreted in the same transport-and-source framework, separating source-population evolution from path-history accumulation within one model.

### Timescape-Style Bridge, $\mathbb{A}\mathbb{A}\mathbb{A}$ Mechanism

Conceptually, this layer is adjacent to inhomogeneous/clock-calibration cosmologies, but the implementation here remains one explicit Noether sea state model:

- clock-rate mapping is computed from shared Noether sea state variables,
- expansion-like inference shifts are environment-conditioned readouts, not ontology splits,
- local-ladder versus early-time differences are modeled as distinct sampling of one evolving Noether sea.

### Reproducible Transport Constraints

The fixed-void cosmology branch can currently claim the transport constraints that any successful redshift mechanism must satisfy. Because the Euclidean void does not expand, the redshift explanation must act through endpoint clock cadence, source-branch state, launch geometry, and path-history transport through the Noether sea. A viable transport redshift must therefore preserve the standard observational rows normally packaged by an FRW scale factor: Tolman surface-brightness scaling $B_{\mathrm{obs}}\propto(1+z)^{-4}$ after the declared distance map, supernova light-curve time dilation $\Delta t_{\mathrm{obs}}\approx(1+z)\Delta t_{\mathrm{emit}}$, and CMB temperature scaling $T_{\mathrm{CMB}}(z)\approx T_0(1+z)$ in the appropriate thermal record.

These rows are form-level constraints, not a derived $\Lambda\mathrm{CDM}$ mechanism. A scalar $a_{\mathrm{eff}}(t)$ is admissible only after statistical homogeneity and isotropy of the retained Noether sea record have been established; otherwise the honest output is a local tensorial $g^{\mathrm{eff}}_{\mu\nu}(\mathbf{x},t)$ or anisotropic scale response. The Friedmann-like equations below remain comparison-layer summaries until the same Noether sea response law derives $a_{\mathrm{eff}}(t)$, $G_{\mathrm{eff}}$, the effective equation of state, and the transport coefficients from one retained record.

### Effective Friedmann Bridge (Comparison Layer)

For data-comparison work, one may retain a Friedmann-like summary:

$$
H_{\mathrm{eff}}^2
=
\frac{8\pi G_{\text{eff}}}{3c_0^2}
\left(\rho_m+\rho_r+u_{\text{sea}}\right)
-\frac{k_{\text{eff}}c_0^2}{a_{\mathrm{eff}}^2}
$$

with $a_{\mathrm{eff}}(t)$ interpreted as a Noether sea state parameter and $G_{\text{eff}},k_{\text{eff}}$ as effective summaries of assembly-Noether sea response. If a pressure variable is used in the same projection, it must satisfy the comparison continuity row
$$
\dot\rho_{\mathrm{eff}}
+3H_{\mathrm{eff}}(\rho_{\mathrm{eff}}+P_{\mathrm{eff}})
=0
$$
or declare the residual source term supplied by Noether sea transport.

This equation is a comparison layer for the homogeneous and isotropic limit. It does not by itself justify the assumption that supernovae, BAO, CMB distances, and local-ladder calibrations all share one isotropic background. That shared background must be recovered as a limit of the Noether sea state model or replaced by an explicitly directional effective map.

### Expansion-Module Interface

In the modular cosmology map, this page provides:

- ontic inputs: medium density/stress state, clock-rate map, and transport environment,
- effective outputs: inferred $a(t)$, $H(z)$, and redshift-distance behavior,
- shared bridge variables used by [dark-energy.md](../../../../markdown/aaa/cosmology/dark-energy.md), [hubble-s8-tensions.md](../../../../markdown/aaa/cosmology/hubble-s8-tensions.md), and [CMB.md](../../../../markdown/aaa/cosmology/CMB.md).

## Inflation Model

This chapter records the current $\mathbb{A}\mathbb{A}\mathbb{A}$ reinterpretation of inflation-like behavior as a high-curvature alignment regime rather than as a separate inflaton ontology. Its purpose is to keep local-process, recycling, and strong-field framing explicit before any full quantitative closure is claimed. It sits between [Cosmology Ontology](../../../../markdown/aaa/cosmology/cosmology-ontology.md), [Expansion Mechanism](../../../../markdown/aaa/cosmology/expansion-mechanism.md), and the strong-field pages [Black Holes](../../../../markdown/aaa/spacetime/black-holes.md) and [Mapping the Planck Scale to the Nested Shell Braid Geometry](../../../../markdown/aaa/philosophy-history/theory-bridges/planck-scale-nested-shell-braid-alignment.md).

### Core Idea

The early rapid-expansion phase is modeled as an emergent high-curvature regime of nested shell braid dynamics, not as a fundamental standalone inflaton ontology.

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
- outbound disturbances seed expansion-like phases in the surrounding Noether sea,
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
\Delta \rho_{\mathrm{locked}}
$$

with each term tied to the same Noether sea response variables used by the CMB, BBN, and expansion modules. This preserves the perturbation-success target of inflationary models while rejecting a free "use it, then lose it" vacuum-energy channel.

### Scalar and Tensor Benchmark

Inflationary comparison remains useful only where it supplies disciplined observables. The relevant targets are not an inflaton field or a global expansion of the Euclidean void, but the scalar amplitude, scalar tilt, optional running, Gaussianity, and tensor upper bound consumed by the CMB module.

For a candidate high-curvature release record $\theta$, require
$$
\left(A_{\mathrm{s}}^{\theta},n_{\mathrm{s}}^{\theta},\alpha_{\mathrm{s}}^{\theta},r^{\theta}\right)
\to
\left(A_{\mathrm{s}}^{\mathrm{obs}},n_{\mathrm{s}}^{\mathrm{obs}},\alpha_{\mathrm{s}}^{\mathrm{obs}},r_{\max}\right)
$$
within the declared observational tolerances, with
$$
r^{\theta}(k_*) \le r_{\max}
$$

The scalar/tensor gate should be read as a closure burden on the high-curvature transfer channel. If $\mathbb{A}\mathbb{A}\mathbb{A}$ uses SMBH-core or horizon-interface dynamics to explain inflation-like behavior, those dynamics must supply the same near-Gaussian scalar spectrum and allowed tensor sector without retuning the CMB, BBN, and expansion interfaces separately.

Smoothness is a separate benchmark from scalar amplitude and tensor suppression. Inflationary language is often credited with explaining why the early effective record has low gravitational free-mode content, while generic strong-field collapse is expected to develop complicated anisotropic curvature. In this framework that pressure becomes a medium-history constraint, not an inflaton ontology. The high-curvature release channel must therefore deliver the CMB-facing smoothness residual defined in [CMB](../../../../markdown/aaa/cosmology/CMB.md) using the same Noether sea variables that supply $\left(A_{\mathrm{s}}^{\theta},n_{\mathrm{s}}^{\theta},\alpha_{\mathrm{s}}^{\theta},r^{\theta}\right)$.

#### Predictive Restriction and Initial Conditions

The inflation comparison also carries a predictiveness burden. A high-curvature release record is not promoted because it can reproduce the observed CMB packet after the source function, starting branch, or projection map is widened. It must narrow the allowed-output set and report the initial-basin cost defined in [Cosmology Ontology](../../../../markdown/aaa/cosmology/cosmology-ontology.md#prediction-narrowness-and-initial-basin-burden).

For this module, the local version is
$$
\mathcal{O}_{\epsilon}^{\mathrm{infl}}(\theta)
=
\left\{
o \in \mathcal{O}_{\mathrm{CMB,near}}
:
\mathcal{R}_{\mathrm{CMB}}(\theta;o)
+\mathcal{R}_{\mathrm{smooth}}(\theta;o)
+\mathcal{R}_{\mathrm{T,split}}(\theta;o)
\le
\epsilon_{\mathrm{infl}}
\right\}
$$
The branch is predictive only when this set is narrow under the declared CMB comparison measure. The companion initial-basin burden is $\mathcal{S}_{\mathrm{init}}$: if the release channel succeeds only for a tiny set of pre-release Noether sea states, then the smoothing explanation has been moved into the starting chart rather than derived from the high-curvature dynamics.

#### Slow-Roll Comparison Dictionary

The standard slow-roll formulas are useful here as a compact benchmark dictionary, but the entries are comparison variables. Let a candidate high-curvature release record $\theta$ define effective observer variables $a_\theta$, $H_\theta$, and $N_\theta\equiv\ln a_\theta$ through the redshift, clock-rate, and transfer map. They do not describe expansion of the Euclidean void. The redshift side of this dictionary must first close the signed photon-frequency budget
$$
Z_X^\theta
=
Z_{\mathrm{endpoint},X}^{\theta}
+Z_{\mathrm{source},X}^{\theta}
+Z_{\mathrm{launch},X}^{\theta}
+Y_{X,\mathrm{path}}^{\theta}
$$
with $Y_{X,\mathrm{path}}^\theta$ carrying any Compton/Sunyaev-Zeldovich-like exchange rows. A branch may use $a_\theta$ and $N_\theta$ only after this budget has been reduced to the homogeneous comparison limit. The first comparison slow-roll coordinate is
$$
\varepsilon_\theta
\equiv
-\frac{d\ln H_\theta}{dN_\theta},
\qquad
\varepsilon_\theta < 1
$$
for an inflation-like effective interval, and the second coordinate is
$$
\eta_\theta
\equiv
\varepsilon_\theta
-
\frac{1}{2\varepsilon_\theta}
\frac{d\varepsilon_\theta}{dN_\theta}
$$
If a branch introduces an effective potential surrogate $V_\theta(\varphi)$ for comparison with single-field models, it must also expose
$$
\epsilon_{v,\theta}
\equiv
\frac{M_{\mathrm{pl}}^2}{2}
\left(\frac{V_{\theta,\varphi}}{V_\theta}\right)^2,
\qquad
\eta_{v,\theta}
\equiv
M_{\mathrm{pl}}^2
\frac{V_{\theta,\varphi\varphi}}{V_\theta}
$$
with $\varepsilon_\theta\approx\epsilon_{v,\theta}$ and $\eta_\theta\approx\eta_{v,\theta}-\epsilon_{v,\theta}$ only in the effective slow-roll limit. These are not new substrate fields; they are a way to test whether the release record lands in the same observable region as slow-roll inflation.

At the comparison horizon-crossing surface $k=a_\theta H_\theta$, the scalar and tensor amplitudes become
$$
\Delta_{\mathrm{s}}^{2,\theta}(k)
=
\left.
\frac{H_\theta^2}
{8\pi^2M_{\mathrm{pl}}^2\varepsilon_\theta}
\right|_{k=a_\theta H_\theta},
\qquad
\Delta_{\mathrm{t}}^{2,\theta}(k)
=
\left.
\frac{2H_\theta^2}
{\pi^2M_{\mathrm{pl}}^2}
\right|_{k=a_\theta H_\theta}
$$
so that
$$
n_{\mathrm{s}}^\theta - 1
=
\frac{d\ln \Delta_{\mathrm{s}}^{2,\theta}}{d\ln k},
\qquad
r^\theta
=
\frac{\Delta_{\mathrm{t}}^{2,\theta}}{\Delta_{\mathrm{s}}^{2,\theta}}
\approx
16\varepsilon_\theta
$$
A branch that claims a slow-roll-like scalar/tensor match should therefore supply $\{\varepsilon_\theta,\eta_\theta,N_\theta,\Delta_{\mathrm{s}}^{2,\theta},\Delta_{\mathrm{t}}^{2,\theta},n_{\mathrm{s}}^\theta,r^\theta\}$ from one high-curvature release record. If it also predicts a bispectrum, the single-field slow-roll comparison target is $f_{\mathrm{NL}}^\theta=O(\varepsilon_\theta,\eta_\theta)$; a large non-Gaussian residual requires an explicit additional interaction, branch, or source-measure record.

Eternal-inflation and landscape language add no ontology by themselves. A cosmological ensemble does not explain observed parameters merely by containing them somewhere; its explanatory content comes from the physical mechanism that generates the sampling measure and connects that measure to this observed record. These frameworks become useful only when they nominate data products that can be tested without assuming the multiverse interpretation. Two examples are the effective spatial-curvature channel and localized CMB residuals. For a candidate high-curvature release record $\theta$, define a comparison-only residual
$$
\mathcal{R}_{\mathrm{EI}}(\theta)
=
d_\Omega\!\left(\Omega_k^{\theta},\Omega_k^{\mathrm{obs}}\right)
+d_{\mathrm{loc}}\!\left(S_{PW}^{\theta},S_{PW}^{\mathrm{obs}}\right)
+d_{\mathrm{shared}}\!\left(\theta_{\mathrm{CMB}},\theta_{\mathrm{growth}}\right)
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
\right)
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
\le 1
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
\right)
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
H^2(a) = H_0^2\left[\Omega_r a^{-4} + \Omega_m a^{-3} + \Omega_{\text{eff}}(a)\right]
$$

where $\Omega_{\text{eff}}(a)$ encodes the emergent high-curvature phase and its relaxation.

As a toy kinematic decomposition, one can also track the expansion-rate profile by assigning separate qualitative roles to the three nested branches:
$$
\dot{R}(t) = v_I(t) + c_f + v_O(t)
$$
Here the inner contribution $v_I(t)$ plays the role of a decaying high-curvature release term, the constant $c_f$ marks the transport/horizon channel, and the outer contribution $v_O(t)$ captures slower volumetric rebound. This is not a closed cosmological derivation, but it is a compact way to encode the intuition that inflation-like release, horizon-scale transport, and late-time expansion can all be read as different branches of the same nested shell braid process.

### Expansion-Module Interface

In the modular cosmology map, this page contributes:

- ontic inputs: self-hit occupancy, alignment-boundary transitions, and core-to-medium energy transfer,
- effective outputs: inflation-like rapid expansion segments and perturbation-seeding summaries,
- bridge variables shared with [expansion-mechanism.md](../../../../markdown/aaa/cosmology/expansion-mechanism.md) and [CMB.md](../../../../markdown/aaa/cosmology/CMB.md).

### Coherent Reading

Inflation language in $\mathbb{A}\mathbb{A}\mathbb{A}$ is an effective description of high-curvature release-and-relaxation dynamics in the Noether sea, not an added standalone scalar ontology.

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
- **Why:** Noether braids near SMBHs reach densities and temperatures sufficient for nuclear reactions; subsequent outward transport and cooling mimics expansion-driven freeze-out, using the same fixed-void expansion interface developed in [Expansion Mechanism](../../../../markdown/aaa/cosmology/expansion-mechanism.md).
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

Noether braids compress toward maximum-curvature states.
Proton/neutron assemblies (nucleon nested shell braids; see [Nucleon Structure](../../../../markdown/aaa/nuclear-atomic/nucleon-structure.md)) are driven into close proximity by intense Noether sea density gradients.
Local "temperature" (kinetic energy distribution) and density mimic BBN conditions ($T \sim 10^9\,\mathrm{K},\ \rho \sim 10^{-3}\,\mathrm{g/cm^3}$).
Interpretive saturation claim: compression approaches medium-defined ceilings $T_{\max}$ and $\rho_{\max}$, so nucleosynthesis conditions are set primarily by Noether sea saturation rather than scaling linearly with SMBH mass.

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
- \sum_l\langle\sigma v_{\mathrm{rel}}\rangle_{il}n_in_l
$$

The reaction bookkeeping is unchanged; the $\mathbb{A}\mathbb{A}\mathbb{A}$ shift is the background interpretation that sets temperature, density, and freeze-out timing.

For a local-reactor, recycling, or compact-object comparison branch, the network also needs a source-channel energy partition. Let $s$ label source channels and let $E_s^\theta$ be the energy carried into the declared BBN window by baryons, photons, neutrino-sector excitations, compact-object release, or Noether sea work terms. The branch supplies an acceptable thermal record only if
$$
E_{\mathrm{in}}^\theta
=
\sum_s E_s^\theta,
\qquad
\boldsymbol{\eta}_{\mathrm{BBN}}^\theta
=
\left(
\eta_{b\gamma}^\theta,\,
N_{\mathrm{eff}}^\theta,\,
\frac{n_n^\theta}{n_p^\theta},\,
\frac{s_\gamma^\theta}{n_b^\theta}
\right)
$$
is propagated through the same source window that produces the yields. A source story that changes the photon loading, neutron fraction, entropy per baryon, or relativistic-species count independently of the light-element network has not supplied a BBN mechanism; it has assigned separate fit parameters to the outputs.

The standard freeze-out scalings should remain explicit because they are the hard targets for any SMBH-local or transport-cooling replacement. In a radiation-dominated comparison packet,
$$
t
\approx
\frac{2.4\ \mathrm{s}}{\sqrt{g_*}}
\left(\frac{1\ \mathrm{MeV}}{k_BT}\right)^2
$$
where $g_*$ is the effective relativistic-species loading. The neutron-to-proton ratio follows the equilibrium estimate
$$
\frac{n_n}{n_p}
\approx
\exp\!\left(-\frac{\Delta m\,c_0^2}{k_BT}\right)
$$
until weak reactions fall out of equilibrium. Deuterium survival is delayed by the high photon loading; a schematic bottleneck condition is
$$
\frac{n_D}{n_p}
\sim
\eta
\left(\frac{k_BT}{m_p c_0^2}\right)^{3/2}
\exp\!\left(\frac{E_D}{k_BT}\right)
$$
with $E_D$ the deuterium binding energy and $\eta$ the baryon-to-photon ledger variable. These equations are observer-level benchmarks for the thermal record. A native local-reactor branch may reinterpret where the history occurs, but it must reproduce the same freeze-out, deuterium-bottleneck, $Y_p$, D/H, lithium, $\eta$, and $N_{\text{eff}}$ residuals without fitting them in separate source zones.

#### Weak-Rate and Relativistic-Species Gate

The neutrino and weak-rate side of BBN is a hard interface, not optional explanatory color. A candidate local-reactor record $\theta$ must compute the weak conversion channels within the same thermal and source-window history that supplies photon loading and baryon provenance:
$$
\lambda_{n\to p}^{\theta}:\quad
\begin{cases}
n+e^+\to p+\bar{\nu}_e,\\
n+\nu_e\to p+e^-,\\
n\to p+e^-+\bar{\nu}_e,
\end{cases}
\qquad
\lambda_{p\to n}^{\theta}:\quad
\begin{cases}
p+\bar{\nu}_e\to n+e^+,\\
p+e^-\to n+\nu_e,\\
p+e^-+\bar{\nu}_e\to n.
\end{cases}
$$
The freeze-out comparison is controlled by when these rates fall below the effective BBN clock,
$$
\lambda_{n\to p}^{\theta}(T)
\sim
\lambda_{p\to n}^{\theta}(T)
\sim
H_{\mathrm{eff,BBN}}^\theta(T)
$$
where $H_{\mathrm{eff,BBN}}^\theta$ is the observer-level cooling and dilution rate inferred from the local transport record, not expansion of the Euclidean void. Any extra relativistic component changes the same clock through
$$
H_{\mathrm{eff,BBN}}^\theta
\propto
\left(
\rho_\gamma^\theta
+\rho_{e^\pm}^\theta
+\rho_{\nu_\alpha}^\theta
+\rho_{\nu_s}^\theta
+\cdots
\right)^{1/2}
$$
so the relativistic-species residual must be tracked as
$$
N_{\text{eff}}^\theta
\equiv
\frac{\rho_{\mathrm{rel}}^\theta-\rho_\gamma^\theta}
{\rho_{\nu,1}^\theta}
$$
The equilibrium neutron-to-proton comparison then reads
$$
\frac{n_n^\theta}{n_p^\theta}
\approx
\exp\!\left(
-\frac{\Delta m_{np}c_0^2}{k_BT}
-\xi_{\nu_e}^\theta
\right)
$$
where $\xi_{\nu_e}^\theta$ is retained only when the branch declares a neutrino-sector asymmetry. A viable branch must therefore recover the same $n_n/n_p$, $Y_p$, D/H, lithium, $\eta$, and $N_{\text{eff}}$ surfaces from one local source-window record. A sterile or hidden relativistic sector that improves one isotope while shifting the weak-rate clock, neutrino asymmetry, or photon loading independently fails this gate.

### $\mathbb{A}\mathbb{A}\mathbb{A}$ SMBH-Local Nucleation Chain

The BBN story is one continuous mechanism:

1. The Noether sea evolves in absolute time $t$ within a fixed Euclidean container.
2. This Noether sea evolution defines an effective expansion/cooling history and therefore an emergent $H(t)$ at observer level, matching the bookkeeping used in [Expansion Mechanism](../../../../markdown/aaa/cosmology/expansion-mechanism.md).
3. The resulting thermal history sets reaction-rate competition and freeze-out ordering in the standard network.
4. The coupled light-element yields (H, D, He, trace Li) are outputs of this same Noether sea and assembly dynamics and must remain compatible with the observer-level chronology in [CMB](../../../../markdown/aaa/cosmology/CMB.md).

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

Pre-BBN comparison branches are accepted only through their effect on the light-element and relativistic-species record. The BBN side of the gate does not import the external branch ontology; it asks whether the same thermal, photon-loading, neutrino, and Noether sea state used by the local-reactor mapping can absorb the branch without damaging the successful yield constraints.

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
\right)
$$
The branch may remain in the comparison ledger only when $\mathcal{R}_{\mathrm{BBN},X}\le1$ using the same provenance and Noether sea record carried into [CMB](../../../../markdown/aaa/cosmology/CMB.md), [Structure Formation](../../../../markdown/aaa/cosmology/structure-formation.md), and [Gravitational Waves](../../../../markdown/aaa/spacetime/gravitational-waves.md). A component that repairs one BBN channel while spoiling deuterium survival, helium clustering, or $N_{\text{eff}}$ compatibility is a failed comparison branch, not a new explanatory resource.

The $\eta_X$ term is the BBN-facing projection of the matter-asymmetry ledger in [Reaction-Cosmology Provenance Ledger](../../../../markdown/aaa/validation/reaction-cosmology-provenance-ledger.md#matter-asymmetry-provenance). It should be computed from transported baryon, antibaryon, and photon event records over the declared source window, not assigned independently after the yields are fit.

The branch must also carry a nucleosynthesis exposure record, because light-element abundances are not an equilibrium imprint of one temperature-density point. They are the arrested output of a coupled reaction network along a cooling history. For each source channel $s$, define
$$
\mathcal{E}_{i,s}^X
=
\int_{\tau_{\mathrm{on},s}}^{\tau_{\mathrm{off},s}}
n_n^X(\tau,s)\,
\langle\sigma v_{\mathrm{rel}}\rangle_{i,n}^X(T(\tau,s),\rho(\tau,s))\,
d\tau
$$
and require the yield vector to be computed as $\mathbf{Y}_{\mathrm{BBN}}^X=\mathbf{Y}[\{T,\rho,n_b,n_\gamma,n_n,\mathcal{E}_{i,s}^X\}]$ over the same source-window record used for $\eta_X$ and $N_{\text{eff}}$. The corresponding exposure closure term is
$$
\mathcal{R}_{\mathrm{exp},X}
=
\max_i
\frac{|\mathcal{E}_{i,\mathrm{eff}}^X-\mathcal{E}_{i,\mathrm{BBN}}^{\mathrm{obs}}|}{\epsilon_{\mathcal{E}_i}}
$$
where $\mathcal{E}_{i,\mathrm{eff}}^X$ is the channel-weighted exposure reaching the BBN comparison surface. A SMBH-local or fixed-void replacement branch fails this gate if it matches final D/H, $Y_p$, or lithium while its integrated exposure requires a different density-temperature timing record than the one used for photon loading, weak freeze-out, and the CMB handoff.

Compact-object comparison branches add a sharper injection test. If the branch contains a small-mass tail with late release near the BBN window, record the injected spectrum as
$$
\mathcal{I}_X(E,t)
=
\int \psi_X(M,t)\,
\Gamma_{\mathrm{release}}^X(E,t;M)\,dM
$$
where $\psi_X(M,t)$ is the branch mass function and $\Gamma_{\mathrm{release}}^X$ is the Hawking-like or native release channel being compared. The yield shifts $\Delta\mathbf{Y}_{\mathrm{BBN}}^X$ must be computed from $\mathcal{I}_X$ and the same thermal, photon-loading, neutrino, and Noether sea state used elsewhere in the BBN gate. A branch that uses late energetic injection to repair one isotope while changing $\eta_X$, $N_{\text{eff}}$, or the CMB handoff independently is a failed comparison branch, not a promoted source mechanism.

If the compact branch evaporates, releases, or otherwise injects energy before or during the BBN window, the sharper residual is
$$
\mathcal{R}_{\mathrm{evap},X}
=
\max\left(
\frac{\|\Delta\mathbf{Y}_{\mathrm{BBN}}^X\|_{C_Y^{-1}}}{\epsilon_Y},
\frac{|\Delta N_{\text{eff}}^X|}{\epsilon_N},
\frac{|\Delta\eta_X|}{\epsilon_\eta},
\frac{\|\Delta f_\gamma^X(E,t)\|}{\epsilon_\gamma},
\frac{\|\Delta f_\nu^X(E,t)\|}{\epsilon_\nu}
\right)
$$
Here $\Delta f_\gamma^X$ and $\Delta f_\nu^X$ are photon- and neutrino-sector spectral distortions induced by the release history. This term keeps primordial-compact-object comparisons as constraints on a shared thermal history rather than a license to import compact objects as an explanatory ontology.

### Observable-Mapping Goals (Interpretation-Scoped)

These goals are for mapping $\mathbb{A}\mathbb{A}\mathbb{A}$ dynamics to measured cosmological observables in SMBH-reactor-style interpretations. They are viability objectives and consistency checks, not yet settled derivations.

#### 1. Homogeneity Goal: "Universal Ejection Attractor"

Standard BBN effectively behaves like a calibrated standard reactor: one parameter, $\eta$ (baryon-to-photon ratio), predicts light-element abundances across the sky. SMBH-local models should recover similar universality.

- **Variance consideration:** SMBHs span mass ($10^6$ to $10^{10}\,M_\odot$), spin, and accretion-state diversity. If $T(t)$ and $\rho(t)$ inherit this variance directly, predicted yields, especially $Y_p$, should broaden.
- **Observable target:** Keep consistency with tight helium clustering near $Y_p\approx0.245\pm0.003$.
- **Goal:** Derive a **Universal Ejection Attractor** where near-horizon architrino compression saturates to medium-set conditions (Noether braid saturation), with universal ceilings $T_{\max}$ and $\rho_{\max}$ and mass-insensitive $\rho_{\mathrm{crit}}$ and $v_{\mathrm{eject}}$.
- **Observable implication:** If this saturation holds, $^4$He yield is intrinsic to Noether sea state convergence and remains weakly dependent on SMBH mass class.

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
- **Thermalization-depth check:** Treat photon loading as an ensemble closure target. The relevant source zone should satisfy a channel-recorded depth condition $\mathcal{D}_{\mathrm{th}}^{\mathrm{BBN}}(\nu)\gtrsim 1$ across the photon energies that control deuterium photodissociation and nuclear freeze-out timing, while preserving the same Noether sea state variables used for density dilution, cooling, and neutrino-sector handoff.
- **Matter-asymmetry check:** The same source-zone record must yield $\eta_B^{\mathrm{ledger}}$ compatible with $\eta_{\mathrm{obs}}$ after baryon, antibaryon, and photon transport to the BBN comparison surface.
- **Consistency check:** If this condition is unmet, D forms too early and is over-processed.

#### 5. Lithium Goal: Promote to a Distinguishing Prediction

Lithium is treated here as a primary discriminator, not only a trace channel.

- **Goal:** Quantify whether core-sheath inhomogeneity can suppress $^7$Be/$^7$Li while preserving high D, producing the observed low-Li/high-D direction.
- **Primary distinguishing prediction:** In SMBH-local reactor mappings, spatial inhomogeneity is a productive mechanism (not a nuisance), and lithium depletion emerges from transport-weighted integration across heterogeneous flow channels.
- **Interpretive contrast:** Standard BBN uses near-homogeneous initial conditions, while the $\mathbb{A}\mathbb{A}\mathbb{A}$ local-reactor mapping can use controlled inhomogeneity as an explanatory lever.

#### 6. Equation-of-State Goal: Specify Nested Shell Braid Compression EoS

The model needs an explicit compression-zone equation of state (for example local $P(\rho)$ or effective $w$ behavior) to close dynamics.

- **Goal:** Determine whether nested shell braid matter stiffens near horizon compression (high effective sound speed), and whether that stiffness is sufficient to drive rapid radial expansion.
- **Mapping task:** Connect the EoS choice directly to freeze-out timing, D quench, and final yield sensitivity.

#### 7. Neutrino-Counting Goal: Recover Effective $N_{\text{eff}}$

Cosmological data are consistent with an effective relativistic-species count near $N_{\text{eff}}\approx3.04$, so SMBH-local mappings need a neutrino history compatible with that target.

- **Goal:** Show that neutrino production in the relevant nucleation zone is close enough to thermalized flavor populations to recover effective three-species behavior at observer level.
- **Opacity-to-decoupling mapping:** Model a dense phase where neutrinos are initially trapped (interaction-opaque core conditions), followed by release at a defined decoupling temperature window.
- **Consistency check:** Free-streaming onset and energy partition should map to BBN/CMB-inferred $N_{\text{eff}}$ without introducing extra relativistic degrees of freedom.

#### 8. Early-Enrichment Timing Goal: "Old Stars" Consistency

Observed low-metallicity gas and very old stars with BBN-like light-element patterns require a viable pre-stellar enrichment pathway in SMBH-local interpretations.

- **Cycle mapping objective:** Establish an early sequence SMBH nucleation $\to$ release-channel ejection $\to$ ambient gas enrichment $\to$ subsequent star formation.
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

The CMB timeline is presented as an effective observer-level chronology map that is interpreted through one fixed-void, evolving-Noether sea ontology in $\mathbb{A}\mathbb{A}\mathbb{A}$.

### Framing Guardrails

- The Euclidean void is fixed; cosmological language describes Noether sea evolution within that fixed container.
- Redshift language is consistent with Noether sea evolution plus clock-rate comparison across environments.
- Background and growth claims are kept in one shared Noether sea and assembly ontology.
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
K_X(\alpha_X,x_X)\,\mathbf{D}_{\mathrm{CMB}}
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
\mathbf{D}_{\mathrm{mask/source}}
$$

where $\mathbf{D}_{\mathrm{kin}}$ is ordinary observer motion, $\mathbf{D}_{\mathrm{sea}}$ is the contribution from Noether sea flow, density, delay, and clock-rate gradients, and $\mathbf{D}_{\mathrm{mask/source}}$ records survey selection and source-population effects. Closure requires the same Noether sea term to remain compatible with CMB anisotropy, quasar and radio-source dipoles, supernova directionality, BAO measurements, and local $H$ scatter.

This gate does not replace the TT/TE/EE or blackbody requirements. It adds a frame-consistency test: the effective CMB frame used for background inference must be the same frame, or a derived projection of the same Noether sea state, used by the matter and distance-ladder modules.

The concrete packet shape for this subgate is defined in [Cosmology Shared Residual Fit Protocol](../../../../markdown/aaa/validation/simulations/cosmology-shared-residual-fit.md#frame-split-measurement-recipe).

### Localized CMB Feature Validation

Claims about localized CMB features, including claims sometimes interpreted as pre-Big-Bang or cyclic-history signals, must first be handled as cross-instrument data products. The retained observable is not the external interpretation. It is the question of whether a common localized residual survives masking, foreground modeling, beam handling, and comparison between independent maps such as WMAP and Planck.

The comparison packet must record the reduction path before the residual is interpreted: sky mask, component-separation or foreground model, beam and transfer-function handling, monopole/dipole treatment, baseline subtraction, look-elsewhere domain, and any simulation ensemble used to assign significance. Without that provenance, a localized feature can be a foreground, mask, beam, or null-statistics artifact while appearing as a cosmological signal.

Let $M_P(\hat{\mathbf{n}})$ and $M_W(\hat{\mathbf{n}})$ denote foreground-cleaned Planck and WMAP residual maps after a common mask and baseline $\Lambda\mathrm{CDM}$ subtraction, with the above provenance fields fixed before template search. For an angular template $T_{\theta,\hat{\mathbf{n}}}$ centered at sky direction $\hat{\mathbf{n}}$ with scale $\theta$, define the cross-map support statistic
$$
S_{PW}(\hat{\mathbf{n}},\theta)
=
\frac{\langle M_P,T_{\theta,\hat{\mathbf{n}}}\rangle_{C_P^{-1}}}{\sigma_P(\theta)}
\frac{\langle M_W,T_{\theta,\hat{\mathbf{n}}}\rangle_{C_W^{-1}}}{\sigma_W(\theta)}
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
\right]
$$

This statistic is a validation target, not a permission to import an external cosmology. If such a residual remains significant after foreground, mask, and look-elsewhere accounting, a viable $\mathbb{A}\mathbb{A}\mathbb{A}$ cosmology must either reproduce it from the same Noether sea state used for TT/TE/EE, blackbody behavior, lensing, BAO, and structure growth, or show why it is a foreground, systematic, or null-fluctuation artifact. A fit that explains localized features by changing the cosmology state independently from the acoustic peaks or lensing record fails the shared-state requirement.

### Pre-Cosmological Steady State ($\mathbb{A}\mathbb{A}\mathbb{A}$-Only)
- Scope: $\mathbb{A}\mathbb{A}\mathbb{A}$-only steady-state background; $\Lambda\mathrm{CDM}$ does not define a pre-Big-Bang era.
- Persistent galaxies and SMBHs exist in a long-lived recycling regime.
- This steady-state reservoir is later mapped onto the Big Bang timeline for physical observers.

**$\Lambda\mathrm{CDM}$ interpretation:** Outside the model; $\Lambda\mathrm{CDM}$ does not define a pre-Big-Bang state.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation:** The universe is a fixed Euclidean container populated by the Noether sea. Galaxies and SMBHs have existed indefinitely in a steady-state, recycling regime. SMBHs act as strong-field recycling sites whose horizon interfaces can return processed content to the surrounding Noether sea through several release channels. Those channels may include visible outflows, diffuse radiative release, and initially dark-sector photon-channel candidates. The released content then traverses the evolving Noether sea and can be thermally reprocessed by repeated interactions with assemblies. This steady-state backdrop is the source reservoir that later maps onto the Big Bang timeline for physical observers.

### Planck Epoch (0 to $\sim 10^{-43}$ s)
- Time window: 0 to $\sim 10^{-43}$ s.
- Regime: peak effective densities/energies; quantum-gravity behavior dominates.
- Force status: gravity is distinct; other interactions are effectively unified.

**$\Lambda\mathrm{CDM}$ interpretation:** Spacetime is in a quantum-gravity regime; ordinary field theory breaks down. The Planck scale sets the limiting energy density and length scale for known physics.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Planck Epoch: Peak Density of Energetic Architrinos):** The Noether sea reaches peak effective density in a local recycling event. Architrinos dominate the dynamics, and the Noether braid network is maximally compressed. At the event-horizon limit, the only stable assemblies are neutral Noether braids: high-energy, stealthy pairs or quad clusters that couple with a strong-like force. The photon-channel assemblies are modeled as coaxial contra-rotating pro/anti planar pairs moving at the local effective photon speed. Noether braid assemblies populate the Noether sea, so the effective gravity channel is active while the Euclidean void remains fixed. Noether braids are neutral, so there is no emergent electric force yet beyond internal binding. Axial architrinos are absent, so no weak force. A strong-like binding exists inside Noether braid couplings, but it is not externally observable until quark assemblies appear. This is the regime where self-hit effects are strongest and where the universal maximum-curvature binary (MCB) cap is approached.

### Grand Unification Epoch ($\sim 10^{-43}$ to $10^{-36}$ s)
- Time window: $\sim 10^{-43}$ to $10^{-36}$ s.
- Regime: high-energy unification with symmetry breaking beginning.
- Force status: strong interaction separates from the electroweak sector across this window.

**$\Lambda\mathrm{CDM}$ interpretation:** Gauge interactions may be unified; symmetry breaking sets the stage for later phase transitions.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Grand Unification Epoch: Binaries Dominate):** Stable binary assemblies become the dominant carriers of energy and interaction. The Noether sea organizes around binary formation, suppressing free-architrino behavior and defining the first durable interaction channels. Strong-like binding remains internal to these neutral Noether braids and is still not externally observable without quark-scale axial patterns.

### Inflationary Epoch ($\sim 10^{-36}$ to $10^{-32}$ s)
- Time window: $\sim 10^{-36}$ to $10^{-32}$ s.
- Regime: rapid effective expansion/relaxation smooths the large-scale Noether sea state and its effective geometry.
- Perturbations: primordial fluctuations are seeded for later structure.

**$\Lambda\mathrm{CDM}$ interpretation:** A scalar field drives exponential expansion, smoothing curvature and seeding primordial perturbations.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Inflationary Epoch: Noether Braid Transition):** $\mathbb{A}\mathbb{A}\mathbb{A}$ treats inflation-like behavior as sourced in SMBH-core interior dynamics. The self-hit regime of inner assemblies drives rapid effective expansion/relaxation of the surrounding Noether sea. Near the Planck-alignment boundary, terminal lock and release behavior organizes the transition from maximal-curvature dynamics into a broader, more uniform ambient state. In the mapped chronology, Noether braid behavior enters a coherent regime that later supports emergent metric summaries without invoking literal expansion of the void.

### Electroweak Epoch ($\sim 10^{-12}$ s)
- Time window: $\sim 10^{-12}$ s.
- Regime: electroweak symmetry breaking; particle masses emerge.
- Force status: electromagnetic and weak forces split; four forces become distinct thereafter.

**$\Lambda\mathrm{CDM}$ interpretation:** Electroweak symmetry breaks; particle masses emerge via the Higgs mechanism.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Electroweak Epoch: Axial Architrinos Associate with Noether braids):** Axial architrinos associate with Noether braids, setting the effective inertial response and distinguishing stable interaction channels. This is the point where electromagnetic and weak interactions become externally observable: charged assemblies appear and weak-scale coupling becomes meaningful through axial topology. This association process defines the emergent analog of particle masses and electroweak differentiation; compare [Electroweak Bosons: Photons, W/Z, and Higgs](../../../../markdown/aaa/assemblies/bosons/electroweak-bosons.md).

### Quark Epoch ($\sim 10^{-12}$ to $10^{-6}$ s)
- Time window: $\sim 10^{-12}$ to $10^{-6}$ s.
- Regime: quark-gluon plasma dominates the energy density.
- Force status: strong interaction active; confinement has not yet occurred.

**$\Lambda\mathrm{CDM}$ interpretation:** Quarks and gluons form a hot plasma; confinement has not yet occurred.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Quark Epoch: Emerging/Surviving Quarks Couple Vortices):** Quark-like assemblies survive as specific nested shell braid configurations with axial layers. Their coupling is mediated by vortex-like wake structures, with confinement emerging as a topological stability condition rather than a fundamental gauge field. This is the point where the strong interaction becomes externally visible through quark–quark coupling and confinement dynamics.

### Hadron Epoch ($\sim 10^{-6}$ s to $\sim 1$ s)
- Time window: $\sim 10^{-6}$ s to $\sim 1$ s.
- Regime: quark confinement produces hadrons.
- Matter: baryonic matter becomes the dominant composite sector.

**$\Lambda\mathrm{CDM}$ interpretation:** Quarks confine into hadrons (protons and neutrons), and hadronic matter becomes the dominant form of baryonic energy.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Hadron Epoch: Assemblies with Coupled Quarks Emerge):** Multi-core assemblies stabilize, associating quark-like structures into hadron analogs. The Noether sea now supports composite assemblies with persistent internal phase structure, setting the stage for nuclear binding.

### Lepton Epoch (incl. neutrino decoupling) ($\sim 1$ to $\sim 10$ s)
- Time window: $\sim 1$ to $\sim 10$ s.
- Regime: leptons and anti-leptons are abundant.
- Outcome: pair annihilation reduces lepton density and heats radiation.
- Sub-phase (neutrino decoupling, $\sim 1$ s): weak interaction rate falls below expansion/relaxation; neutrinos free-stream.

**$\Lambda\mathrm{CDM}$ interpretation:** Electron-positron pairs are abundant; annihilation and cooling reshape the radiation bath.
**$\Lambda\mathrm{CDM}$ (neutrino decoupling):** Weak interaction rates drop below the expansion rate; neutrinos free-stream.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Lepton Epoch: Noether braids with six $\epsilon$ axial architrinos form):** Stable lepton analogs form from Noether braids carrying six bound axial architrinos, with net observer-level $|e|$ from six $\epsilon=|e|/6$ units. Lepton-like assemblies populate the Noether sea and mediate charge-neutralization channels.
**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Neutrino Decoupling: Noether braids with Neutral Axial Layers):** Nearly neutral Noether braid assemblies lose strong coupling to the dominant plasma-like background and begin to free-stream as weakly interacting modes. In this framing, neutrino-sector free-streaming and sea coupling are part of the same parameter story that later appears as effective $N_{\text{eff}}$ language; compare [Neutrinos](../../../../markdown/aaa/assemblies/fermions/neutrinos.md).

### Photon Epoch ($\sim 10$ s to $\sim 3.8\times10^5$ years)
- Time window: $\sim 10$ s to $\sim 3.8\times10^5$ years.
- Regime: ionized plasma with tight photon-matter coupling.
- Outcome: acoustic oscillations develop in the coupled medium.

**$\Lambda\mathrm{CDM}$ interpretation:** The photon-baryon fluid is optically thick; acoustic oscillations develop and imprint the future CMB power spectrum.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Photon Epoch: Nuclear Assembly Plasma):** A dense plasma of nuclear assemblies and photon assemblies modeled as coaxial contra-rotating pro/anti planar pairs fills the Noether sea. Repeated scattering and wake interactions thermalize the radiation field. Acoustic-like standing modes arise from coupled oscillations of assemblies and coaxial contra-rotating pro/anti planar-pair excitations, seeding the eventual CMB peak structure.

### Big Bang Nucleosynthesis ($\sim 3$ to $\sim 20$ minutes)
- Time window: $\sim 3$ to $\sim 20$ minutes.
- Regime: light nuclei form as temperatures fall.
- Outcome: primordial abundances of D, He, and trace Li are set.

**$\Lambda\mathrm{CDM}$ interpretation:** Protons and neutrons bind into deuterium, helium, and trace lithium; abundances are set by expansion rate and reaction networks.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (BBN: Protons (15:21) and Neutrons (18:18) Associate):** Specific multi-core assemblies corresponding to proton (15:21) and neutron (18:18) configurations associate into light nuclear assemblies. Reaction rates are controlled by assembly topology and wake-coupling cross sections in the Noether sea; this is the same light-element window developed in [BBN Constraints](../../../../markdown/aaa/cosmology/BBN-constraints.md).

### Acoustic Peak Seeding (pre-recombination)
- Time window: late photon epoch prior to recombination.
- Regime: standing-wave modes imprint a harmonic ladder.
- Outcome: peak positions/amplitudes encode medium properties and coupling.

**$\Lambda\mathrm{CDM}$ interpretation:** Acoustic oscillations in the photon-baryon fluid generate the familiar harmonic peaks. Peak positions are set by the sound horizon at recombination; relative heights encode baryon loading and radiation driving.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Nested Shell Braid Energy Ladder):** The nested shell braid system supplies three intrinsic energy scales (outer, middle, inner) that act as primary mode seeds. Coupling through the Noether sea generates a harmonic ladder from those seeds, analogous to standing acoustic modes in a cavity. The effective “sound horizon” scale is set by the Noether sea coupling length, the delay response $\chi_{\text{sea}}$, and the duration of the high-optical-depth phase, while the odd/even peak pattern reflects how baryon-like assemblies load the oscillations relative to coaxial contra-rotating pro/anti planar-pair modes.

### Recombination ($\sim 3.8\times10^5$ years)
- Time window: $\sim 3.8\times10^5$ years.
- Regime: electrons associate with nuclei; scattering drops sharply.
- Outcome: photons decouple (last scattering) and free-stream.

**$\Lambda\mathrm{CDM}$ interpretation:** Electrons combine with nuclei; photons decouple, producing the CMB. The last-scattering surface is established.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Recombination: Coaxial Contra-Rotating Photon Assemblies Decouple):** Electron-like assemblies lock into neutral coaxial configurations with nuclei, dramatically reducing scattering cross sections. Photon assemblies modeled as coaxial contra-rotating pro/anti planar pairs decouple and free-stream. This defines the $\mathbb{A}\mathbb{A}\mathbb{A}$ analog of last scattering, with the CMB spectrum reflecting the thermalized Noether sea state at decoupling.

### Dark Ages ($\sim 3.8\times10^5$ years to first light)
- Time window: $\sim 3.8\times10^5$ years to first light.
- Regime: neutral medium with no luminous sources.
- Outcome: structure grows under gravity/medium dynamics.

**$\Lambda\mathrm{CDM}$ interpretation:** The universe is neutral and dark; structure grows under gravity until the first luminous objects form.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation (Dark Ages: Coaxial Contra-Rotating Photon Assemblies Free-Stream):** The decoupled photon assemblies, modeled as coaxial contra-rotating pro/anti planar pairs, propagate through the evolving Noether sea. The radiation field retains its thermal shape while redshifting due to medium evolution and path-integrated clock-rate comparison between emission and observation environments. Small anisotropies reflect assembly-density fluctuations rather than a single primordial event.

This retention claim is a transparent-transport invariant, not a claim of continued ordinary thermalization. After decoupling, the path map must rescale photon-channel frequency and inferred temperature together while preserving the transported bundle's occupation-shape function and transverse phase coherence. A post-decoupling mechanism that repeatedly absorbs, re-emits, scatters, or randomly kicks the photon packets may relax a spectrum in special circumstances, but it will generically erase image sharpness, anisotropy, polarization, or the near-Planck spectral shape unless those side effects are explicitly bounded.

### SMBH Release Channels
- Scope: interpretive bridge between $\mathbb{A}\mathbb{A}\mathbb{A}$ steady-state recycling and the effective Big Bang chronology map.
- Claim: the Big Bang corresponds to the collective surfaces of SMBHs, not a singular origin.
- Outcome: outward release from SMBH recycling sites maps onto the observed CMB after thermalization and redshift.

**$\Lambda\mathrm{CDM}$ interpretation:** The Big Bang is a global origin of spacetime, setting the initial conditions for all subsequent evolution.

**$\mathbb{A}\mathbb{A}\mathbb{A}$ interpretation:** The Big Bang timeline is reinterpreted as the effective history of a large-scale recycling event sourced by SMBH environments. Dark-sector photon-like modes, recycled dark-sector assemblies, and other outbound excitations from SMBH horizon interfaces can propagate through the Noether sea, thermalize, and redshift into the observed CMB directly or after further conversion into visible channels. Jets and surface outflows remain plausible observer-level manifestations of this release, but they are not the only allowed morphology. The three intrinsic nested shell braid energy scales (outer/middle/inner) provide natural mode seeds for acoustic peaks, with coupling in the medium generating the harmonic ladder observed today. The CMB source interpretation is therefore a closure target for steady-state recycling dynamics in a fixed Euclidean void, not a singular origin event nor literal metric stretching of the container.

#### Horizon-Interface Photon Release Candidate

The strong-field version of this source story should keep a specific candidate channel visible. A photon-channel packet is a coaxial contra-rotating pro/anti planar pair, while the black-hole horizon interface is the regime where nested shell braid assemblies are driven toward planar symmetry-breaking lock at $v=c_f$. The shared planar-pair geometry makes the horizon a natural candidate site for photon-channel or photon-channel-adjacent release, not merely a place where already-formed photons suffer an exterior gravitational redshift.

The same signed row can contain both sides of the process. Interior or interface segments may blueshift photon-channel packets, raising their receiver-facing phase cadence and energy relative to local exterior standards. Outward transport through the surrounding Noether sea may then redshift, thermalize, scatter, or convert those packets before they become visible to ordinary observers. The existence of such high-energy interior photon records is therefore a plausible branch of the CMB source program, but it is not a shortcut around the CMB constraints.

For a horizon-sourced contribution to the CMB bath, the source packet should be recorded schematically as
$$
\Theta_{H\gamma}
=
\left(
\mathcal{B}_{H},
Y_{\gamma,H},
\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{H\gamma},
\mathcal{D}_{\mathrm{th}}^{\mathrm{CMB}},
\mathcal{P}_{E\to R}
\right)
$$
where $\mathcal{B}_{H}$ is the horizon-interface label ensemble, $Y_{\gamma,H}$ is the signed strong-field photon-frequency exchange row, $\mathcal{L}_{E\mathbf{p}\mathbf{J}}^{H\gamma}$ is the energy, momentum, angular-momentum, provenance, and medium-update ledger for the released channel, $\mathcal{D}_{\mathrm{th}}^{\mathrm{CMB}}$ is the thermalization depth, and $\mathcal{P}_{E\to R}$ is the path-history propagation factor. This packet is admissible only if it feeds the same blackbody, anisotropy, polarization, damping, lensing, redshift, and BBN handoff records already required by the CMB module.

The candidate is strong because it links several otherwise separate clues: black-hole recycling, horizon-interface planar lock, photon planar-pair ontology, signed redshift/blueshift transport, and CMB thermalization. Its failure mode is equally clear. If the horizon contribution can explain only an energy scale while spoiling the near-blackbody spectrum, erasing TT/TE/EE information, overproducing spectral distortions, or requiring a different Noether sea state from the one used for redshift and growth, then it is not a valid CMB source branch.

#### QSSC Contrast (Conceptual)

| Axis | QSSC-like families | $\mathbb{A}\mathbb{A}\mathbb{A}$ implementation |
|---|---|---|
| Similarity | Distributed/recycling source logic over long history | Distributed/recycling source logic over long history |
| Core difference | Phenomenological source and transport descriptions | Noether sea medium microphysics with explicit module interfaces |
| Closure standard | General background consistency goals | Hard closure targets: blackbody precision, $\Delta T/T$, and TT/TE/EE/damping coherence |

### Distributed-Emission Channels

Within the same ontology, CMB sourcing can be represented through:

1. SMBH release from horizon-interface recycling sites, including jet-like, diffuse, and initially dark-sector channels accumulated over long history,
2. medium-relaxation radiation from Noether sea state transitions,
3. conversion or dissociation channels from high-velocity or dark-sector assembly states into photon assemblies.
4. strong-field photon-channel or photon-channel-adjacent release near the horizon-interface symmetry-breaking threshold, followed by redshift, thermalization, scattering, or conversion during outward transport.

These channels are treated as parts of one shared thermalization and decoupling story; they are not separate ontologies.

Jet-transport scales in the Mpc class are treated as one member of this channel family, with cumulative contribution determined by source population statistics, release-channel selection, and medium thermalization depth.

Isotropy in this branch is attributed to long-time averaging over many source populations following the same microphysical rules, not to one-time primordial causal contact.

#### Effective Thermal Spectrum of the Noether Sea

The framework does not yet identify an ontological root definition of temperature, so it should not simply equate the enormous internal energy of individual Noether braids with an ordinary thermodynamic temperature. A more disciplined distinction is required between three quantities: the internal energy scale of the braids, the local effective emissive temperature of the Noether sea if it behaves as a blackbody source, and the observer-side temperature inferred from the photon bath after emission, transport, thermalization, and redshift. On that reading, the observed $2.7255\,\mathrm{K}$ background is the temperature of the ambient microwave radiation field measured by present observers, not automatically the intrinsic temperature of the Noether sea as an emitter. The stronger claim to test is that sufficiently homogeneous regions of the Sea can generate and maintain a near-blackbody photon population whose measured spectrum tracks that emissive state after medium transport. Departures from the baseline blackbody should then encode local Noether sea state: increasing Noether braid density, anisotropy, or internal excitation near dense matter would tend to distort the spectrum away from the homogeneous limit, while the strongest deviations should arise near black-hole recycling zones, where alignment, compression, and release-channel mixing can harden, bias, or only partially re-thermalize the emitted radiation before subsequent relaxation in the surrounding Noether sea.

#### Discovery-Scale Thermal Record

The 1965 Dicke-Peebles-Roll-Wilkinson and Penzias-Wilson letters are useful here as a paired constraint, not as permission to import one origin story. The theoretical side emphasized that a sufficiently hot phase with $T\gtrsim 10^{10}\,\mathrm{K}$ would drive pair production, photon exchange, and neutrino-sector equilibration rapidly enough to create a thermal radiation bath, and that subsequent homogeneous redshift would preserve the blackbody form while lowering the inferred temperature. The observational side reported an unexplained zenith antenna-temperature excess near $3.5\,\mathrm{K}$ at $4080\,\mathrm{Mc/s}$ after accounting for atmosphere, ohmic loss, back-lobe response, calibration, polarization, isotropy, and seasonal variation.

For $\mathbb{A}\mathbb{A}\mathbb{A}$, the durable lesson is the constraint packet. A CMB branch must not merely point to a distributed source population; it must carry a joint thermal and measurement record
$$
\Theta_{\mathrm{CMB}}
=
\left(
T_{\mathrm{src}},
\mathcal{D}_{\mathrm{th}}^{\mathrm{CMB}},
\eta_{\gamma b},
N_{\mathrm{eff}},
Y_p,
\mathcal{P}_{\mathrm{instr}},
\mathbf{D}_{\mathrm{frame}}
\right)
$$
where $T_{\mathrm{src}}$ is the effective source or last-thermalization temperature, $\eta_{\gamma b}$ is the photon-to-baryon loading ledger, $N_{\mathrm{eff}}$ and $Y_p$ carry the neutrino and helium-facing constraints, $\mathcal{P}_{\mathrm{instr}}$ records the antenna, atmosphere, calibration, foreground, polarization, and seasonal checks, and $\mathbf{D}_{\mathrm{frame}}$ is the residual frame vector used in the dipole gate above. A distributed or recycling interpretation is admissible only when the same $\Theta_{\mathrm{CMB}}$ supports the spectrum, isotropy, BBN handoff, and frame correction. Fitting the microwave temperature while assigning the helium abundance, neutrino history, foreground subtraction, or dipole correction to separate records would reproduce a number while failing the CMB constraint.

The same record must close the photon energy inventory, not only the fitted temperature. For a declared source-and-thermalization branch $\theta$, let $u_\gamma^\theta(t)$ be the effective photon energy density that reaches the CMB comparison surface, $B_{\mathrm{therm}}^\theta$ the energy transferred through thermalizing channels, $B_{\mathrm{loss}}^\theta$ the energy irreversibly routed into non-photon reservoirs, and $\mathcal{F}_\gamma^\theta$ the boundary flux through the selected comparison window. The CMB energy-budget residual can be written schematically as
$$
\mathcal{R}_{\gamma,\mathrm{CMB}}^\theta
=
\frac{
\left|
u_\gamma^\theta(t_{\mathrm{obs}})
-
u_{\gamma,\mathrm{Planck}}(T_0)
\right|
}{\epsilon_u}
+
\frac{
\left|
\Delta U_{\mathrm{src}}^\theta
-
B_{\mathrm{therm}}^\theta
-
B_{\mathrm{loss}}^\theta
-
\int \mathcal{F}_\gamma^\theta\,dA\,dt
\right|
}{\epsilon_E}
$$
This residual is the CMB-facing form of source provenance. A branch that recovers a blackbody curve by adding an untracked photon bath, or by hiding excess source energy in an undeclared non-photon reservoir, has not supplied the shared record required by the CMB gate.

Post-free-streaming redshift adds the same constraint on the transport side. Once source, recoil, remnant, and boundary rows are separated, a redshifted photon bundle must close its energy deficit into the Noether sea path update,

$$
\Delta E_{\gamma}
+\Delta E_{\mathrm{sea,path}}
=0
$$

This is the CMB-facing projection of the bounded-region continuity law, with boundary flux, source rows, recoil, and remnant exchange separated before the transparent-path term is evaluated. It need not assume a convergent universe-wide scalar energy in order to falsify a transport branch locally. Without that local closure, a CMB branch that preserves the Planck curve only by hiding the redshift energy in an untracked bath has failed the fixed-void energy ledger.

#### Historical Equality and Temperature Benchmark

The 1948 Alpher-Herman correction to Gamow is useful here as historical pressure, not as a present-parameter source. Their calculation corrected an early matter-density estimate, found that the naive matter-radiation-density intersection moved to an implausibly late time if the curvature term were neglected, and then restored that curvature term in the effective expanding-universe equation. In the corrected record, the matter/radiation intersection, a Jeans-style condensation mass and radius, a gas temperature at condensation, and a present radiation temperature of order $5\,\mathrm{K}$ were tied into one computation.

The $\mathbb{A}\mathbb{A}\mathbb{A}$ lesson is not the historical numerical value $5\,\mathrm{K}$, since the observer-side CMB temperature comparison uses the modern calibrated value stated above. The retained benchmark is the shared-record pressure: a CMB branch should not fit present radiation temperature separately from matter-radiation equality, growth onset, and the effective curvature/expansion projection. In the fixed-void interpretation, the curvature term is read as an observer-level effective-metric projection, not as curvature of the Euclidean void.

A compact residual for this pressure is
$$
\mathcal{R}_{\mathrm{T,eq,grow}}(\theta)
=
\frac{(T_0^\theta-T_0^{\mathrm{obs}})^2}{\sigma_{T_0}^2}
+
\frac{(z_{\mathrm{eq}}^\theta-z_{\mathrm{eq}}^{\mathrm{obs}})^2}{\sigma_{z_{\mathrm{eq}}}^2}
+
\frac{(k_{\mathrm{eq}}^\theta-k_{\mathrm{eq}}^{\mathrm{obs}})^2}{\sigma_{k_{\mathrm{eq}}}^2}
+
\lambda_H
\sum_b
\frac{
\left(H_{\mathrm{eff}}^\theta(z_b)-H_{\mathrm{eff}}^{\mathrm{obs}}(z_b)\right)^2
}{
\sigma_{H,b}^2
}
+
\lambda_K
\frac{(\Omega_{K,\mathrm{eff}}^\theta-\Omega_{K,\mathrm{eff}}^{\mathrm{obs}})^2}{\sigma_K^2}
+
\lambda_g
\left[
\frac{(\ln M_{\mathrm{grow}}^\theta-\ln M_{\mathrm{grow}}^{\mathrm{ref}})^2}{\sigma_{\ln M}^2}
+
\frac{(\ln R_{\mathrm{grow}}^\theta-\ln R_{\mathrm{grow}}^{\mathrm{ref}})^2}{\sigma_{\ln R}^2}
\right]
$$
Here $T_0^\theta$ is the present observer-side radiation temperature, while $z_{\mathrm{eq}}^\theta$ and $k_{\mathrm{eq}}^\theta$ are the matter-radiation equality redshift and scale in observer variables. The term $H_{\mathrm{eff}}^\theta$ is the effective expansion or relaxation projection, and $\Omega_{K,\mathrm{eff}}^\theta$ is the effective curvature projection of the same Noether sea record. The positive-scale terms $M_{\mathrm{grow}}^\theta$ and $R_{\mathrm{grow}}^\theta$ are declared condensation/growth-scale comparisons supplied by the structure-formation packet rather than imported 1948 values. A successful CMB record must make this residual small without changing $\theta$ between the blackbody, equality, effective expansion, curvature, and growth projections.

#### Thermalization-Depth and Planck-Recovery Target

The blackbody claim should be carried as a theorem target, not as a source-story assertion. A distributed-emission interpretation must show that source channels, transport, and decoupling collectively supply enough mode exchange before free streaming. A compact diagnostic is the path-integrated thermalization depth

$$
\mathcal{D}_{\mathrm{th}}^{\mathrm{CMB}}(\nu)
=
\int_{t_{\text{src}}}^{t_{\text{dec}}}
\tau_{\mathrm{th}}^{-1}(\nu,t)\,dt
$$

where $\tau_{\mathrm{th}}^{-1}$ is the effective rate for the already-recorded capture/release, Compton-like redistribution, pair-channel, and medium-exchange processes. The target is $\mathcal{D}_{\mathrm{th}}^{\mathrm{CMB}}\gg1$ before decoupling for spectral relaxation, followed by sufficiently weak post-decoupling coupling to preserve anisotropy, polarization, and damping information rather than erase it.

The same theorem target has a line-of-sight version for steady-state or distributed-source branches. An effective microwave photosphere is not a new ontological origin surface; it is the comparison locus where the declared photon-channel transport becomes optically thin enough that photons stop being repeatedly thermalized along a given direction. For observer position $\mathbf{x}_{\mathrm{obs}}$, sky direction $\hat{\mathbf{n}}$, Euclidean path length $\ell$, and path-history time $t_\ell$ supplied by the same transport record, define

$$
\tau_{\mathrm{mw}}^\theta(\nu,\hat{\mathbf{n}},D)
=
\int_0^D
\chi_{\mathrm{op}}^\theta
\left(\nu,\mathbf{x}_{\mathrm{obs}}+\ell\hat{\mathbf{n}},t_\ell\right)
\,d\ell,
\qquad
D_{\mathrm{eff}}^\theta(\nu,\hat{\mathbf{n}})
=
\inf\{D>0:\tau_{\mathrm{mw}}^\theta(\nu,\hat{\mathbf{n}},D)\ge1\}
$$

Here $\chi_{\mathrm{op}}^\theta$ is the proposed microwave-band opacity, not the Noether sea delay factor $\chi_{\text{sea}}$. The CMB-pixel question is therefore a derived closure target. For angular beam or pixel width $\Delta\alpha$ in radians, use the transverse comparison scale
$$
L_{\perp}^{\theta}(\nu,\hat{\mathbf{n}},\Delta\alpha)
\simeq
D_{\mathrm{eff}}^\theta(\nu,\hat{\mathbf{n}})\,\Delta\alpha
$$
This scale is meaningful only after the branch computes $D_{\mathrm{eff}}^\theta$ from its source, transport, and thermalization record. If no finite $D_{\mathrm{eff}}^\theta$ exists, or if it varies too strongly with frequency or sky direction, the distributed-source interpretation has not supplied a stable CMB comparison surface.

Thermalization mechanisms that use this opacity or distributed absorbers must also pass a side-effect test. Let $\mathcal{A}_{\ell}^{\theta}$, $\mathcal{P}_{\ell}^{\theta}$, and $\mathcal{D}_{\mathrm{FIR}}^\theta$ denote the induced changes in temperature anisotropy, polarization, and far-infrared/submillimeter background intensity. The side-effect residual is
$$
\mathcal{R}_{\mathrm{op}}^\theta
=
\frac{\|\Delta\mathcal{A}_\ell^\theta\|}{\epsilon_A}
+
\frac{\|\Delta\mathcal{P}_\ell^\theta\|}{\epsilon_P}
+
\frac{\|\Delta\mathcal{D}_{\mathrm{FIR}}^\theta\|}{\epsilon_{\mathrm{FIR}}}
+
\frac{\|\partial_\nu\chi_{\mathrm{op}}^\theta\|_{\mathrm{CMB}}}{\epsilon_\chi}
$$
A thermalizing component is admissible only if it helps make $\mathcal{D}_{\mathrm{th}}^{\mathrm{CMB}}\gg1$ before the free-streaming record is fixed while keeping $\mathcal{R}_{\mathrm{op}}^\theta\le1$ afterward. This is the native exclusion of absorber stories that smooth the spectrum by erasing the anisotropy and polarization record they must also preserve.

In the weak homogeneous photon-channel limit, the observer-level recovery target is the Planck spectral form

$$
u_\nu^{\mathrm{eff}}(T_{\text{ens}})
=
\frac{8\pi h\nu^3}{c_\gamma^3}
\frac{1}{\exp(h\nu/(k_B T_{\text{ens}}))-1}
$$

This formula is an effective comparison object. It becomes available only after Gate A supplies the photon energy-frequency and mode-counting interface, Gate B supplies the two transverse photon modes and polarization handoff, and Gate C drives the photon chemical potential to zero through detailed balance. The redshift handoff must then preserve spectral shape by mapping photon frequencies and inferred temperature through the same Noether sea state and clock-rate comparison variables used elsewhere in this document.

Equivalently, the transparent transport operator must commute with global frequency scaling on the blackbody family:

$$
\mathcal{T}_{\lambda}\mathcal{B}_{T}
=
\mathcal{B}_{T/\lambda}
+O(\epsilon_{\mathrm{spec}})
$$

where $\mathcal{B}_{T}$ denotes the observer-level Planck spectrum at temperature $T$ and $\lambda=1+z$ for the declared path after endpoint and launch terms are separated. This condition is stronger than fitting a final temperature. It says the transport has preserved the occupation-number shape rather than re-thermalizing an arbitrary distorted spectrum by coincidence.

The same transparent-transport branch must also carry no undeclared transverse photon-momentum transfer. After declared lensing, beam, aperture, and detector terms are removed, the image-preserving condition is $\Delta\mathbf{k}_{\perp}=O(\epsilon_{\mathrm{img}})$, with any remaining transverse phase residual kept inside the polarization and anisotropy tolerances.

The spectrum gate should be stated as a calibrated comparison, not as an assumption that the theoretical Planck curve has been directly observed without apparatus structure. For frequency channels $\nu_i$, measured intensities $I_i$, foreground model $F_i(\psi)$, and calibration covariance $C_{ij}$, define
$$
\mathcal{R}_{\mathrm{spec}}(\theta,T,\psi)
=
\sum_{i,j}
\left[
I_i-F_i(\psi)-B_{\nu_i}(T;\theta)
\right]
C^{-1}_{ij}
\left[
I_j-F_j(\psi)-B_{\nu_j}(T;\theta)
\right]
$$
where $B_\nu(T;\theta)$ is the photon-channel blackbody comparison spectrum projected through the same medium record $\theta$. A distributed or recycling source story must make $\mathcal{R}_{\mathrm{spec}}$ small without using a foreground, calibration, or post-decoupling transport residual to erase the acoustic and polarization information.

In the homogeneous comparison limit, the redshift handoff must preserve the Planck form by scaling frequency and temperature together:
$$
\nu_{\mathrm{obs}}
=
\frac{\nu_{\mathrm{dec}}}{1+z},
\qquad
T_{\mathrm{obs}}
=
\frac{T_{\mathrm{dec}}}{1+z}
$$
This is an observer-level transport benchmark. It does not say that the Euclidean void expanded; it says the photon-channel distribution, endpoint clock comparison, and path-history propagation must carry a blackbody spectrum into the present microwave band without generating a chemical-potential or chromaticity residual above the CMB tolerance.

Transparency supplies the complementary exclusion test. Once the universe is optically thin in the microwave band, a redshift mechanism that changes photon frequencies without the same temperature scaling generically distorts the spectrum. The CMB branch therefore carries the distortion residual
$$
\mathcal{R}_{\mathrm{dist}}
=
\frac{\mu^2}{\sigma_\mu^2}
+
\frac{y^2}{\sigma_y^2}
+
\mathcal{R}_{\mathrm{spec}}
$$
where $\mu$ and $y$ are the chemical-potential and Compton-distortion parameters of the observer-level spectrum fit. A path-history redshift proposal passes only if it preserves the near-thermal spectrum, image sharpness, and packet time-dilation behavior in the same transport record.

The last-scattering benchmark should also retain the rate condition that makes the surface sharp. In standard comparison language decoupling occurs when the scattering rate falls through the effective expansion or relaxation rate,
$$
\Gamma_T
=
n_e\sigma_T c_0
\approx
H_{\mathrm{eff}}
$$
with recombination delayed by the high photon-to-baryon loading encoded in the same $\eta$ ledger used by BBN. The native CMB record therefore has to recover a thin enough last-scattering window, not only a plausible source story.

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
C_\ell = \langle |a_{\ell m}|^2 \rangle
$$

The formal observables remain standard; in practice this includes TT/TE/EE spectra (with damping-tail and lensing behavior), with $C_\ell$ as compact notation.

#### Scalar and Tensor Closure Target

The scalar/tensor layer is an observable gate, not an origin-story selector. Whether the source story is primordial, distributed, or recycling-based, a candidate $\mathbb{A}\mathbb{A}\mathbb{A}$ CMB record $\theta$ must reproduce the scalar perturbation spectrum and avoid an excessive tensor contribution using the same Noether sea history that later supplies TT/TE/EE, damping, lensing, and redshift handoff.

Use the comparison parameterization
$$
\mathcal{P}_{\mathcal{R}}^{\theta}(k)
=
A_{\mathrm{s}}^{\theta}
\left(\frac{k}{k_*}\right)^{
n_{\mathrm{s}}^{\theta} - 1 + \frac{1}{2}\alpha_{\mathrm{s}}^{\theta}\ln(k/k_*)
},
\qquad
r^{\theta}(k_*)
=
\frac{\mathcal{P}_{\mathrm{T}}^{\theta}(k_*)}{\mathcal{P}_{\mathcal{R}}^{\theta}(k_*)}
$$

Here $A_{\mathrm{s}}^{\theta}$ is the scalar amplitude, $n_{\mathrm{s}}^{\theta}$ the scalar tilt, $\alpha_{\mathrm{s}}^{\theta}$ an optional running term, and $r^{\theta}$ the tensor-to-scalar comparison ratio. The tensor condition is a bound,
$$
r^{\theta}(k_*) \le r_{\max}
$$
with $r_{\max}$ supplied by the current observational analysis being used for the comparison. This keeps tensor non-detection as a pressure on source models without turning any particular inflationary or anti-inflationary interpretation into corpus doctrine.

The tensor row should not collapse all early sources into a single inflation signal. Split the tensor-to-scalar comparison into vacuum-like and causal-source components,
$$
r_{\mathrm{tot}}^\theta(k_*)
=
r_{\mathrm{vac}}^\theta(k_*)
+r_{\mathrm{causal}}^\theta(k_*)
$$
where $r_{\mathrm{vac}}^\theta$ is the vacuum-like tensor contribution and $r_{\mathrm{causal}}^\theta$ is any tensor power sourced by phase-transition-like, defect-like, strong-release, recycling, or other causal-source processes. Finite-range or medium-compliance gravity comparisons enter this same tensor gate. They do not add a massive-graviton ontology; they add the requirement that the same Noether sea record which weakens the large-scale response also predicts the tensor and B-mode data products. A compact comparison residual is
$$
\mathcal{R}_{\mathrm{T,split}}(\theta)
=
\sum_{\ell \in \mathcal{L}_{\mathrm{BB}}}
\frac{
\left(C_{\ell,\mathrm{BB}}^{\theta} - C_{\ell,\mathrm{BB}}^{\mathrm{obs}}\right)^2
}{
\sigma_{\ell,\mathrm{BB}}^2
}
+
\lambda_{\mathrm{vac}}
\max\!\left(0, r_{\mathrm{vac}}^\theta - r_{\mathrm{vac},\max}\right)^2
+
\lambda_{\mathrm{causal}}
\max\!\left(0, r_{\mathrm{causal}}^\theta - r_{\mathrm{causal},\max}\right)^2
+
\lambda_{\mathrm{low}}\mathcal{R}_{\mathrm{GW,low}}(\theta)
$$
where $\mathcal{L}_{\mathrm{BB}}$ is the declared B-mode comparison window, $r_{\mathrm{vac},\max}$ and $r_{\mathrm{causal},\max}$ are supplied by the data product or simulation protocol, and $\mathcal{R}_{\mathrm{GW,low}}$ is the low-frequency dispersion forecast from [Gravitational Waves](../../../../markdown/aaa/spacetime/gravitational-waves.md#linear-wave-equation). This keeps the CMB tensor bound, causal-source tensor bound, and gravitational-wave dispersion gate tied to one comparison record rather than allowing a finite-range branch to fit them separately.

A compact residual for CMB closure is
$$
\mathcal{R}_{\mathrm{CMB}}(\theta)
=
\sum_{X\in\{\mathrm{TT},\mathrm{TE},\mathrm{EE}\}}\sum_{\ell}
\frac{(C_{\ell,X}^{\theta}-C_{\ell,X}^{\mathrm{obs}})^2}{\sigma_{\ell,X}^2}
+
\frac{(A_{\mathrm{s}}^{\theta}-A_{\mathrm{s}}^{\mathrm{obs}})^2}{\sigma_{A_{\mathrm{s}}}^2}
+
\frac{(n_{\mathrm{s}}^{\theta}-n_{\mathrm{s}}^{\mathrm{obs}})^2}{\sigma_{n_{\mathrm{s}}}^2}
+
\lambda_{\mathrm{T}}\max\!\left(0, r^{\theta}-r_{\max}\right)^2
$$

The closure target is one medium-and-assembly model with bounded $\mathcal{R}_{\mathrm{CMB}}$, not a separate fit for each observable family.

The same scalar sector must also recover the acoustic phase record rather than only the broadband amplitude and tilt. A compact phase residual can be written as
$$
\mathcal{R}_{\mathrm{phase}}(\theta)
=
\sum_{X\in\{\mathrm{TT},\mathrm{TE},\mathrm{EE}\}}\sum_{p}
\frac{
\left(\ell_{p,X}^{\theta}-\ell_{p,X}^{\mathrm{obs}}\right)^2
}{
\sigma_{\ell,p,X}^2
}
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
}
$$
Here $\delta_{\gamma}^{\theta}$ is the photon-channel density contrast in the observer-level reconstruction. The numerator tests effective vector/vorticity content; the denominator normalizes it against the scalar contrast being recovered. A successful CMB history must keep this residual small in the same state record that fits TT/TE/EE.

The CMB-lensing sector adds a late-time integrated-mass reconstruction gate. In standard comparison language, lensing remaps the primary CMB by an effective lensing potential $\phi$ and yields a lensing-potential spectrum $C_{L}^{\phi\phi}$. For a candidate history $\theta$, use
$$
\mathcal{R}_{\mathrm{lens}}(\theta)
=
\sum_L
\frac{
\left(C_{L}^{\phi\phi,\theta}-C_{L}^{\phi\phi,\mathrm{obs}}\right)^2
}{
\sigma_{L,\phi}^2
}
$$
This is a data-product constraint, not a dark-sector ontology by itself. The same Noether sea and assembly history that fits the primary TT/TE/EE spectra must also project to the lensing potential consumed by the growth and dark-matter modules.

The same gate should include the smoothness pressure usually hidden inside origin-story language. Conformal-cosmology comparisons are useful here only because they isolate a real burden: the effective early record must have a very small free gravitational-mode contribution compared with the complicated strong-field behavior expected near generic collapse. $\mathbb{A}\mathbb{A}\mathbb{A}$ does not import conformal continuation as ontology. It preserves the observable requirement by asking the CMB-producing Noether sea history to suppress effective Weyl-like curvature in the decoupling comparison layer.

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
}
$$

This is not a statement that the Euclidean void is curved. It is an observer-level diagnostic on the effective reconstruction used to compare with CMB data. A stronger closure criterion is therefore
$$
\mathcal{R}_{\mathrm{CMB}}(\theta)
+
\lambda_{\mathrm{T,eq,grow}}\mathcal{R}_{\mathrm{T,eq,grow}}(\theta)
+
\lambda_{\mathrm{phase}}\mathcal{R}_{\mathrm{phase}}(\theta)
+
\lambda_V\mathcal{R}_{V}(\theta)
+
\lambda_{\mathrm{lens}}\mathcal{R}_{\mathrm{lens}}(\theta)
+
\lambda_{\mathrm{smooth}}\mathcal{R}_{\mathrm{smooth}}(\theta)
+
\lambda_{\mathrm{T,split}}\mathcal{R}_{\mathrm{T,split}}(\theta)
\le
\varepsilon_{\mathrm{CMB}}
$$
with $\lambda_{\mathrm{T,eq,grow}}$, $\lambda_{\mathrm{phase}}$, $\lambda_V$, $\lambda_{\mathrm{lens}}$, $\lambda_{\mathrm{smooth}}$, $\lambda_{\mathrm{T,split}}$, and $\varepsilon_{\mathrm{CMB}}$ declared by the data release or simulation protocol. Passing this test would mean that the same Noether sea and assembly history recovers TT/TE/EE, blackbody behavior, radiation-temperature/equality/growth consistency, scalar/tensor bounds, causal-source tensor limits, acoustic phase coherence, vector-mode suppression, CMB-lensing reconstruction, the low effective gravitational free-mode budget, and any declared finite-range comparison branch without changing ontology between modules.

#### Forward Prediction Map

Use one continuous causal map:

Noether sea state evolution $\rightarrow$ pre-decoupling coupled modes $\rightarrow$ decoupling transfer history $\rightarrow$ observed TT/TE/EE structure.

Interpretation and microphysical origin are re-grounded in assembly dynamics while retaining the same observer-level prediction objects.

#### Conceptual Mapping

- Peak spacing reflects effective horizon/coupling scales of the Noether sea.
- Odd/even contrast reflects baryon-like loading relative to photon assemblies.
- High-$\ell$ damping reflects decoupling-era diffusion/opacity analogs.
- Polarization structure reflects phase relations in coupled oscillations.

#### Source-Interpretation Neutrality

Whether the background is read through a primarily primordial-origin interpretation or a distributed-emission interpretation, the prediction layer is one shared parameterization of the same observables.

So source narrative is an interpretation layer, not a change in the prediction target: TT/TE/EE structure, damping behavior, and blackbody character remain part of one coherent readout.

#### Redshift and Clock Link

CMB frequency scaling to present observers is interpreted through medium evolution plus environment-dependent clock-rate comparison, consistent with the expansion-mechanism framing:

$$
\frac{d\tau}{dt}=F\!\left(\mathbf{v},\rho_{\text{NS}}(\mathbf{x},t),n(\mathbf{x},t),\chi_{\text{sea}}(\mathbf{x},t),\Phi_{\text{eff}},\text{clock geometry}\right)
$$

So CMB temperature/redshift summaries remain usable while their mechanism is grounded in assembly-medium dynamics.

#### Sunyaev-Zeldovich Path-History Calibration

Sunyaev-Zeldovich measurements provide a direct reminder that CMB photon frequency is a path-history record. In standard comparison language, the thermal effect shifts CMB photon frequencies through inverse-Compton exchange with hot cluster electrons, while the kinematic effect records the bulk motion of the intervening electron population. In $\mathbb{A}\mathbb{A}\mathbb{A}$ these are not new ontology. They are calibration cases showing that a photon packet can carry signed frequency transfer from the intervening medium after decoupling.

For a line of sight $\gamma$ through an intervening region $W$, the CMB module should retain a signed path row

$$
Y_{\gamma}^{\mathrm{post}}
=
\sum_{j\in W}\Delta Y_{\gamma,j}^{\mathrm{ex}},
\qquad
\Delta Y_{\gamma,j}^{\mathrm{ex}}
=
-\ln
\frac{\nu_{\gamma,j}^{+}}{\nu_{\gamma,j}^{-}}
$$

where negative increments are frequency boosts and positive increments are frequency depletions relative to the local comparison clock. The corresponding exchange residual is

$$
\mathcal{R}_{\mathrm{SZ}\text{-}\mathrm{ex}}
=
\sum_{j\in W}
\frac{
\left|
h(\nu_{\gamma,j}^{+}-\nu_{\gamma,j}^{-})
+\Delta E_{\mathrm{med},j}
+\Delta E_{\mathrm{recoil},j}
+\Delta E_{\mathrm{rem},j}
\right|
}{\epsilon_{E,j}}
$$

This row is a calibration and provenance requirement, not a claim that all cosmological redshift is SZ scattering. A CMB history must still preserve the near-blackbody spectrum, anisotropy, polarization, damping, and lensing records. The SZ lesson is narrower and important: any use of CMB temperature, redshift, or kSZ velocity data must keep photon frequency transfer tied to the same Noether sea, electron-population, and path-history record rather than treating frequency as a pure expansion clock.

#### Dark-Sector and Growth Link

- Neutral-assembly loading and medium response both contribute to how pre-decoupling oscillations map into late-time inferred matter amplitudes.
- This keeps CMB interpretation consistent with the shared $H_0$/$S_8$ narrative rather than splitting background and growth into separate ontologies.

#### Parameter Bridges

- Keep effective $N_{\text{eff}}$ language connected to neutrino/sea coupling history.
- Keep baryon-loading and damping-tail language connected to the same reaction/transport background used in BBN framing.

## Dark Matter

This chapter maps the standard dark-matter phenomenology onto substrate candidates available inside $\mathbb{A}\mathbb{A}\mathbb{A}$. The central task is to explain gravitational clustering without visible electromagnetic coupling, using assemblies or medium responses that belong to the same [Euclidean void](../../../../markdown/aaa/foundations/euclidean-void.md) and [Noether sea](../../../../markdown/aaa/spacetime/noether-sea.md) framework as the rest of the theory.

The opening establishes the ontology and the criteria for what counts as dark in this setting. The later sections compare candidate substrates, summarize the current hybrid working baseline, and connect the picture to cosmological growth and observational interfaces.

### Scope and Purpose

Standard $\Lambda\mathrm{CDM}$ cosmology attributes roughly 27% of the present energy budget to cold dark matter (CDM)—a pressureless, non-baryonic component that clusters gravitationally but couples negligibly to electromagnetic radiation. This chapter maps dark-matter phenomenology onto $\mathbb{A}\mathbb{A}\mathbb{A}$ assembly ontology and identifies candidate substrates.

Throughout, "dark matter" refers to the set of phenomena conventionally attributed to CDM: flat galaxy rotation curves, cluster lensing offsets, the third acoustic peak of the CMB, large-scale structure growth, and BBN-consistent $\Omega_b$. The task is to explain this phenomenology within one ontology—Euclidean void, absolute time, architrinos, and Noether braid assemblies—without importing new fundamental fields or ad hoc modifications to gravity.

The dark-matter density entry is an observationally constrained bookkeeping requirement before it is a substrate identification. Lensing, growth, CMB matter loading, cluster offsets, and baryon-fraction constraints require an effective gravitating component beyond ordinary baryons, but the component ledger does not by itself decide whether the native carrier is neutral assemblies, Noether sea response, or a hybrid branch.

### $\mathbb{A}\mathbb{A}\mathbb{A}$ Ontology Foundations

#### The Noether Sea as Gravitational Medium

In $\mathbb{A}\mathbb{A}\mathbb{A}$, the Noether sea is a dense coupled population of neutral Noether braid assemblies occupying the fixed Euclidean void. In the nested shell case, each Noether braid consists of three nested electrino-positrino binaries (inner, middle, outer), with net charge zero and internal dynamics spanning the three field-speed regimes ($v > c_f$, $v = c_f$, $v < c_f$). Gravity is not a fundamental force but an emergent medium-response effect: local variations in Noether braid density $\rho_{\text{NS}}(\mathbf{x},t)$ and normalized density $n(\mathbf{x},t)$ alter the Noether sea delay factor $\chi_{\text{sea}}$ and the transmission of delayed causal flux, producing observer-level geodesic deviation and an effective metric $g_{\mu\nu}^{\text{eff}}$ experienced by assemblies.

Massive composite assemblies (protons, atoms, stars) are nested shell braid configurations with axial layers; they locally compress the Noether sea, increasing $\rho_{\text{NS}}$ and changing $\chi_{\text{sea}}$ for effective signal propagation. This compression is the substrate-level origin of the Newtonian potential $\Phi_N$ in the weak-field limit. The effective gravitational constant $G$ is related to Noether sea compliance—how readily the Sea density responds to stress from embedded matter (see [spacetime/emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md)).

#### What Counts as "Dark" in this Ontology

A dark-matter candidate in $\mathbb{A}\mathbb{A}\mathbb{A}$ is characterized by two conditions:

- **Gravitational coupling:** The candidate must compress the Noether sea (contribute to effective $\rho_{\text{NS}}$ and $n$ gradients) and therefore deflect light and accelerate baryonic matter.
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
\Delta\psi(\mathbf{x})=2\kappa(\mathbf{x})
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
\end{pmatrix}
$$

where $g_1$ and $g_2$ are reduced-shear components. For two resolved images $i$ and $j$ of the same background source, the image-to-image transformation has the local form

$$
T_{ij}
=
A(\mathbf{x}_j)^{-1}A(\mathbf{x}_i)
$$

This transformation constrains local reduced shear and relative convergence near the observed images. It does not by itself determine a unique global mass map in regions not sampled by the light bundles. For a candidate medium-and-assembly record $\theta$, let $\psi_\theta$ define the projected observer-level lensing potential, let $A_\theta(\mathbf{x})$ be its local Jacobian, and let

$$
T_{ij}^{\theta}
=
A_\theta(\mathbf{x}_j)^{-1}A_\theta(\mathbf{x}_i)
$$

The data-supported local part of the lensing comparison can then be recorded as

$$
\mathcal{R}_{\mathrm{local\ lens}}(\theta)
=
\sum_{(i,j)}
\left(T_{ij}^{\mathrm{obs}}-T_{ij}^{\theta}\right)^T
C_{ij}^{-1}
\left(T_{ij}^{\mathrm{obs}}-T_{ij}^{\theta}\right)
$$

where $C_{ij}$ is the covariance model for the measured image-to-image transformation. This residual tests what the multiple-image data constrain before a global mass profile is imposed.

The remaining global map should be labeled by how much of its convergence field is supported near the observed images. If the image centers are $\mathbf{x}_i$ with declared support widths $\sigma_i$, define

$$
w_{\mathrm{img}}(\mathbf{x})
=
\max_i
\exp\!\left(
-\frac{\|\mathbf{x}-\mathbf{x}_i\|^2}{2\sigma_i^2}
\right)
$$

Then the inferred convergence can be reported in two pieces,

$$
M_{\mathrm{supported}}
=
\int_\Omega
w_{\mathrm{img}}(\mathbf{x})\,\kappa_\theta(\mathbf{x})\,d^2x,
\qquad
M_{\mathrm{extrapolated}}
=
\int_\Omega
\left(1-w_{\mathrm{img}}(\mathbf{x})\right)\kappa_\theta(\mathbf{x})\,d^2x
$$

These are not new dark-sector variables. They are inference-discipline diagnostics: $M_{\mathrm{supported}}$ records the part of the projected map close to the local lensing constraints, while $M_{\mathrm{extrapolated}}$ records the model-projected part that must be justified by priors, weak-lensing data, gas dynamics, galaxy kinematics, CMB lensing, or the shared Noether sea state record.

Cluster-scale dark-matter maps therefore require an explicit inference ledger: which features are forced by local image transformations, which depend on feature matching, and which enter through lens-model priors such as light-traces-mass assumptions, thin-lens geometry, profile smoothness, line-of-sight compression, or interpolation across data-poor regions.

For $\mathbb{A}\mathbb{A}\mathbb{A}$, this does not weaken lensing as a recovery target. It sharpens the target. A neutral-assembly or medium-response explanation must recover the local lensing data first, then survive the global model comparison without hiding mass in unconstrained regions or changing assumptions per cluster. If a dark-sector claim survives only through model freedom away from the multiple-image constraints, it remains an inference artifact candidate rather than a closed substrate claim.

#### CMB-Lensing Inference Guardrail

CMB lensing supplies a different but equally important dark-sector constraint. It does not image a local cluster mass distribution. It reconstructs the integrated lensing potential between the last-scattering surface and the observer from distortions of the microwave background. In standard comparison language the data product is the lensing-potential spectrum $C_L^{\phi\phi}$, and the dark-sector interpretation enters only after a model maps that spectrum to a matter distribution and growth history.

For $\mathbb{A}\mathbb{A}\mathbb{A}$, the conservative requirement is therefore two-stage:

1. recover the CMB-lensing observable $C_L^{\phi\phi}$ from the same CMB history used for TT/TE/EE, damping, and blackbody preservation;
2. project that lensing record into the same neutral-assembly density $\rho_A$, Noether braid density $\rho_{\text{NS}}(\mathbf{x},t)$, and medium-response variables used by the structure-formation module.

A dark-matter interpretation fails if it treats CMB lensing as direct proof of one substrate while using a different Noether sea state to fit galaxy clustering, weak lensing, or cluster offsets.

#### Cluster-Offset Inference Gate

Cluster mergers such as the Bullet Cluster are high-pressure dark-sector tests because gravitational lensing, X-ray gas, and galaxy-light distributions separate during the event. They are not, however, direct photographs of a substrate. The retained data product is the ensemble of local lensing constraints, centroid offsets, gas-dynamical records, galaxy-tracer distributions, line-of-sight priors, and covariance assumptions used to infer the mass map.

For a candidate medium record $\theta_{\mathrm{sea}}$ and neutral-assembly density $\rho_A$, let $\mathcal{P}_{\mathrm{cl}}(\theta_{\mathrm{sea}},\rho_A)$ project the model into that cluster-observable packet. A compact cluster-offset residual is

$$
\mathcal{R}_{\mathrm{cl\ offset}}(\theta_{\mathrm{sea}},\rho_A)
=
\left\|
D_{\mathrm{cl}}^{\mathrm{obs}}
-
\mathcal{P}_{\mathrm{cl}}(\theta_{\mathrm{sea}},\rho_A)
\right\|_{C_{\mathrm{cl}}^{-1}}^2
+
\mathcal{R}_{\mathrm{lens\ prior}}
+
\mathcal{R}_{\mathrm{gas}}
+
\mathcal{R}_{\mathrm{shared}}(\theta_{\mathrm{sea}})
$$

Here $D_{\mathrm{cl}}^{\mathrm{obs}}$ is the retained cluster-offset data packet and $C_{\mathrm{cl}}$ records the covariance of the lensing, gas, and tracer reconstruction. The residual should be evaluated across an ensemble of merging clusters, not treated as a one-image proof. A pure medium-response branch fails this gate only when

$$
\inf_{\theta_{\mathrm{sea}}:\rho_A=0}
\mathcal{R}_{\mathrm{cl\ offset}}(\theta_{\mathrm{sea}},0)
>
\varepsilon_{\mathrm{cl}}
$$

with the same lensing priors, gas model, and shared Noether sea state record used to test the neutral-assembly or hybrid branch. Passing the gate does not by itself prove a collisionless neutral-assembly interpretation; it shows that the candidate branch has recovered the cluster-offset observable without changing the inference stack per system.

#### Shared Dark-Sector Scale Gate

Some quantum-gravity comparison programs try to relate the dark-matter and dark-energy problems through one scale. In this chapter that signal is useful only as a closure discipline. The $\mathbb{A}\mathbb{A}\mathbb{A}$ claim is not that dark matter and dark energy are one imported object; it is that any proposed relation between them must be carried by the same Noether sea state record used by the dark-energy, growth, lensing, and CMB modules.

Let $\theta_{\mathrm{sea}}$ be the shared Noether sea state record, let $\Pi_{\mathrm{DE}}\theta_{\mathrm{sea}}$ be its dark-energy projection, and let $\Pi_{\mathrm{DM}}\theta_{\mathrm{sea}}$ be its dark-matter projection. If a candidate relation $F_{\mathrm{DM}}$ maps the dark-energy-side projection into the dark-matter-side variables, a minimal shared-scale residual is

$$
\mathcal{R}_{\mathrm{dark\ scale}}(\theta_{\mathrm{sea}})
=
\left\|
\Pi_{\mathrm{DM}}\theta_{\mathrm{sea}}
-
F_{\mathrm{DM}}\!\left(\Pi_{\mathrm{DE}}\theta_{\mathrm{sea}}\right)
\right\|_{C_{\mathrm{DM/DE}}^{-1}}^2
+
\mathcal{R}_{\mathrm{shared}}(\theta_{\mathrm{sea}})
$$

Here $C_{\mathrm{DM/DE}}$ is the covariance or weighting model for the joint dark-sector comparison, and $\mathcal{R}_{\mathrm{shared}}$ is the shared calibration residual from [Dark Energy](../../../../markdown/aaa/cosmology/dark-energy.md#inference-dependency-and-calibration-gates). A dark-sector scale relation is promotable only if this residual stays small without assigning one Noether sea state to dark-energy data and another to dark-matter data. If the relation fits one observable family by changing $\theta_{\mathrm{sea}}$ for another, it remains an interpretation artifact rather than a substrate claim.

### Candidate Substrates

#### Candidate A — Neutral Assembly Populations

**Definition.** Neutral Noether braid assemblies that lack exposed charged polar sites in their axial layers. The minimal examples are:

- **Neutrino-class assemblies:** pro-orientation Noether braids with balanced axial layers ($3P,3E$). These are the SM neutrinos themselves; their masses ($\sum m_\nu < 0.12$ eV from cosmological bounds) are too small to account for the full $\Omega_{\mathrm{DM}}$, but they contribute to the hot dark-matter fraction and to $N_{\mathrm{eff}}$.

- **Heavier neutral assemblies (hypothetical):** nested shell braids carrying axial patterns that are globally neutral and whose internal dynamics suppress electromagnetic coupling below detection thresholds. In $\mathbb{A}\mathbb{A}\mathbb{A}$ these would be assemblies whose axial layers cancel in both net charge and oscillating dipole moment, analogous to the neutrino's balanced axial layer but realized on a heavier Noether braid. The mass scale is set by internal binding energy, shielding, and medium-dressed response to the Noether sea.

- **Primordial Noether braid defects:** dense, self-gravitating clusters of maximally contracted Noether braids produced in the high-energy epoch, analogous to primordial black holes in standard cosmology but with internal maximum-curvature structure replacing singular interiors. Their mass spectrum depends on formation-epoch dynamics. The analogy is a benchmark, not an identification: a native defect branch would have to inherit the compact-object mass-function, BBN/CMB/growth, local-ephemeris, high-energy-flux, and null-result checks without importing primordial-black-hole ontology.

**Behavior.** These assemblies are pressureless at late times (kinetic energy $\ll$ rest energy), cluster gravitationally, and are collisionless on galactic scales because their interaction cross-section with baryonic and electromagnetic assemblies is negligible (no exposed charge → no long-range dipole coupling). They therefore reproduce the canonical CDM clustering phenomenology: hierarchical structure formation, flat rotation curves from halo profiles, and the correct matter-loading signature in the CMB.

In a cluster-merger interpretation, neutral assemblies remain collisionless while baryonic gas assemblies decelerate electromagnetically, yielding natural separation between gravitating and X-ray-bright components.

Compact neutral candidates also have a local-detection gate. For a candidate branch with representative mass $M_A$, local fraction $f_A$, and relative speed distribution centered at $\langle v_{\mathrm{rel}}\rangle$, the expected flyby rate inside impact parameter $b_{\max}$ is estimated by
$$
\Gamma_{\mathrm{flyby}}(b_{\max},M_A)
=
\frac{f_A\rho_{\mathrm{DM}}}{M_A}\,
\pi b_{\max}^2\,
\langle v_{\mathrm{rel}}\rangle
$$
A nearby passage gives the order-of-magnitude impulse
$$
\Delta v_{\mathrm{test}}
\simeq
\frac{2GM_A}{b\,v_{\mathrm{rel}}}
$$
before detailed $N$-body and relativistic corrections. The retained observable is the ephemeris residual, not the compact-object interpretation: a candidate detection must produce a trajectory-consistent perturbation above the ranging error floor, fail ordinary visible-object and catalogued-asteroid explanations under the same covariance model, and carry any high-energy co-signature through the same branch record.

A compact dark-candidate branch also admits a track-search comparison in old material. For a candidate compact fraction $f_X$, mass $M_X$, local dark-sector density $\rho_{\mathrm{DM}}$, and relative-speed distribution with mean $\langle v_{\mathrm{rel}}\rangle$, the flux estimate is
$$
\Phi_X
=
\frac{f_X\rho_{\mathrm{DM}}}{M_X}
\langle v_{\mathrm{rel}}\rangle,
\qquad
N_{\mathrm{track}}
=
\Phi_X A_{\mathrm{scan}}T_{\mathrm{age}}P_{\mathrm{surv}}P_{\mathrm{det}}
$$
Here $A_{\mathrm{scan}}$ is the scanned cross-section, $T_{\mathrm{age}}$ is the exposure time of the material, $P_{\mathrm{surv}}$ is the survival probability of the track under thermal, geological, and mechanical erasure, and $P_{\mathrm{det}}$ is the detection efficiency after morphology cuts. The residual is not simply a count mismatch:
$$
\mathcal{R}_{\mathrm{track}}
=
\frac{|N_{\mathrm{track}}-N_{\mathrm{track}}^{\mathrm{obs}}|}{\epsilon_N}
+
\mathcal{R}_{\mathrm{morph}}
+
\mathcal{R}_{\mathrm{ordinary}}
$$
The morphology term requires the candidate track to match the predicted energy-deposition and damage profile for the branch, while $\mathcal{R}_{\mathrm{ordinary}}$ penalizes fits explained by ordinary radiation, defects, inclusions, machining damage, or impact history. A null search becomes a constraint on $f_X(M_X)$ only after the survival and detection functions are declared; a positive search becomes a compact-object claim only after the same branch also passes the BBN, CMB, ephemeris, and high-energy co-signature tests.

#### Candidate B — Noether Sea Medium Response

**Definition.** Non-linear elastic or dispersive response of the Noether sea itself under low-acceleration or low-density-gradient conditions. In regions where the effective gravitational acceleration falls below a characteristic scale $a_0^{\mathrm{MOND}}$, the Noether sea's compliance (inverse stiffness) may change, altering the effective force law. This local notation keeps the galactic acceleration threshold distinct from the rest-attractor length scale $a_0$ used in Lorentz-kinematics chapters.

**Mechanism sketch.** In the nested shell case, each Noether braid in the Noether sea has a minimum restoring-force threshold set by the outer-binary binding. Below the corresponding acceleration scale, the Noether sea deforms more easily per unit stress—the effective $G$ increases with decreasing acceleration. This is structurally analogous to MOND ($\mu(a/a_0^{\mathrm{MOND}})\,a = a_N$) but derived from assembly elasticity rather than postulated. In the corrected master-law picture, part of this response can be understood as a constitutive shift in how the Noether sea organizes Jacobian-weighted delayed flux under low-strain conditions: the same source population can produce a different received effective pull when branch geometry and local contraction state change. The transition function $\mu$ would then emerge from the outer-binary response curve as a function of the local strain rate $\nabla\Phi / a_0^{\mathrm{MOND}}$.

**Characteristic scale.** The MOND acceleration $a_0^{\mathrm{MOND}} \approx 1.2 \times 10^{-10}\;\mathrm{m\,s}^{-2}$ is suggestively close to horizon-scale accelerations such as $c_0 H_0/(2\pi)$ and, in some entropic-gravity comparisons, $c_0 H_0/6$. In $\mathbb{A}\mathbb{A}\mathbb{A}$, those coefficients are comparison pressure rather than imported doctrine. The native question is whether the same Noether sea response law that supplies the effective Hubble history also yields the galaxy-scale transition acceleration.

A compact cross-scale target is

$$
a_0^{\mathrm{MOND}}
\stackrel{?}{=}
\alpha_H\,c_0\,H_{\mathrm{eff}}^\theta(t_{\mathrm{obs}}),
\qquad
\alpha_H \in \left\{\frac{1}{6},\frac{1}{2\pi}\right\}
\quad\text{as comparison coefficients.}
$$

For a shared Noether sea record $\theta$, define the low-acceleration comparison residual

$$
\mathcal{R}_{\mathrm{low}\text{-}a}(\theta,\alpha_H)
=
\left|
\log
\frac{
a_0^{\mathrm{MOND}}
}{
\alpha_H c_0 H_{\mathrm{eff}}^\theta(t_{\mathrm{obs}})
}
\right|
+
d_{\mathrm{RAR}}\!\left(\mathrm{RAR}^{\theta},\mathrm{RAR}^{\mathrm{obs}}\right)
+
\lambda\,\mathcal{R}_{\mathrm{shared}}(\theta)
$$

Here $\mathrm{RAR}^{\theta}$ is the radial-acceleration relation predicted by the coupled neutral-assembly plus medium-response model, $\mathrm{RAR}^{\mathrm{obs}}$ is the observed relation, and $\mathcal{R}_{\mathrm{shared}}$ is the cosmology shared residual in [Dark Energy](../../../../markdown/aaa/cosmology/dark-energy.md#inference-dependency-and-calibration-gates). If no value of $\alpha_H$ follows from the Noether sea response law while preserving CMB loading, cluster offsets, BAO, supernova, growth, and lensing constraints, the horizon-scale coincidence remains a heuristic rather than a derived result.

**Limitations.** A pure medium-response account faces well-documented difficulties:
- Reproducing cluster-scale lensing/gas centroid separation without a collisionless component.
- Matching acoustic-peak matter loading in pre-decoupling dynamics.
- Producing the correct large-scale transfer-function shape in $P(k)$.
- Preserving the large-scale inverse-square force profile inferred from kSZ halo-pair velocities. The retained halo-pair benchmark fits $g(r)\propto r^{-n}$ with $n=2.1\pm0.3$ on $30$--$230\,\mathrm{Mpc}$ scales, so a pure MOND-like branch with an unscreened $n\simeq1$ profile on that window is not viable without a native screening or regime-separation mechanism.

These difficulties motivate retaining Candidate A as the primary dark-matter substrate, with Candidate B contributing corrections.

#### Candidate C — Hybrid (Working Baseline)

**Definition.** Neutral assemblies carry the dominant non-baryonic gravitating mass ($\Omega_{\mathrm{DM}} \sim 0.25$), while Noether sea response provides scale-dependent corrections that modify effective profiles in low-acceleration environments.

**Rationale.** This hybrid is the working baseline because:

- Neutral assemblies handle the heavy lifting: CMB matter loading, large-scale power spectrum, cluster-merger offset behavior, and BBN consistency ($\Omega_b$ remains small).
- Medium response can address observed tensions at galaxy scale—the diversity of rotation-curve shapes, the radial-acceleration relation (RAR) tightness, and possible deviations from pure NFW profiles—without introducing additional free parameters per galaxy.
- The two contributions arise from the same ontological substrate (Noether braid assemblies in Euclidean void with absolute time) and are coupled: neutral assemblies compress the Sea, which in turn responds non-linearly, feeding back on the effective potential.
- If residual discrepancies concentrate in regions of strong Noether sea contraction or steepening contraction gradient, especially toward galactic centers and SMBH environments, that pattern would be naturally suggestive of medium-response contributions rather than of an entirely separate particulate sector.

#### Why Hybrid Is Required (Closure Summary)

| Construction | Main strength | Main failure risk |
|:---|:---|:---|
| Pure neutral-assembly | Handles CMB loading, BAO/$P(k)$ shape, and cluster collisionless behavior | Can underperform on low-acceleration galaxy phenomenology without added response channels |
| Pure medium-response | Captures MOND-like galaxy-scale behavior naturally | Struggles with Bullet-Cluster offsets and full CMB matter-loading closure |
| Hybrid baseline | Combines cosmology-scale closure with galaxy-scale flexibility | Requires constitutive calibration discipline to avoid over-parameterized tuning |

**Coupled equations (schematic).** Let $\rho_A(\mathbf{x},t)$ denote the neutral-assembly density and $\rho_{\text{NS}}(\mathbf{x},t)$ the Noether braid density. In the Newtonian limit, the effective Poisson equation becomes:

$$
\nabla^2 \Phi_{\mathrm{eff}} = 4\pi G_{\mathrm{eff}}(\nabla\Phi,\rho_{\text{NS}},n)\,\bigl(\rho_b + \rho_A + \delta\rho_{\text{NS}}^{(\mathrm{pert})}\bigr)
$$

where $\rho_b$ is baryonic density, $\delta\rho_{\text{NS}}^{(\mathrm{pert})}$ is the perturbative Sea response above its cosmological mean, and $G_{\mathrm{eff}}$ carries the Noether sea response modification. In the high-acceleration limit ($|\nabla\Phi| \gg a_0^{\mathrm{MOND}}$), $G_{\mathrm{eff}} \to G_N$ and $\delta\rho_{\text{NS}}^{(\mathrm{pert})} \to 0$; in the low-acceleration limit, $G_{\mathrm{eff}}$ stiffens and $\delta\rho_{\text{NS}}^{(\mathrm{pert})}$ may contribute an effective "phantom" density that mimics additional dark matter.

This coupled system must be solved self-consistently. The neutral-assembly component $\rho_A$ satisfies collisionless Boltzmann transport in the potential $\Phi_{\mathrm{eff}}$; the Noether sea response enters through constitutive relations derived from Noether braid elasticity in the Noether sea.

#### Scalar-Fluid and MOND-Extension Comparison Gate

Khoury-style hybrid models supply a useful comparison framework because they separate two burdens that are often blended in dark-sector prose: a nearly pressureless component can recover the expansion history and linear growth, while a distinct nonlinear force law accounts for galaxy rotation curves and cluster gas profiles. In $\mathbb{A}\mathbb{A}\mathbb{A}$ this is not evidence for imported scalar fields. It is a discipline for the hybrid baseline: the neutral-assembly sector must carry the linear CDM-like loading, and the Noether sea response sector must carry the low-acceleration nonlinear residual without allowing either side to be retuned independently.

The comparison acceleration law can be recorded as

$$
a_{\mathrm{cmp}}(a_N; a_\star,f)
=
\begin{cases}
a_N, & a_N\gg a_\star,\\
\sqrt{a_Na_\star}, & a_\star/f^2\ll a_N\ll a_\star,\\
f\,a_N, & a_N\ll a_\star/f^2,
\end{cases}
$$

where $a_N$ is the baryonic Newtonian benchmark acceleration, $a_\star$ is the environment-dependent low-acceleration transition scale, and $f$ is the ultra-low-acceleration inverse-square enhancement. For the $\mathbb{A}\mathbb{A}\mathbb{A}$ hybrid branch these are not new constants. They are observer-level summaries of a shared Noether sea state:

$$
a_\star(E)=A_\star(\Pi_E\theta_{\mathrm{sea}}),
\qquad
f(E)=F_\star(\Pi_E\theta_{\mathrm{sea}})
$$

with $E$ denoting an environment class such as spiral galaxies, pressure-supported dwarfs, clusters, or diffuse absorbers. A viable branch must reproduce the galaxy radial-acceleration relation in the middle regime while allowing clusters to fall in the ultra-low-acceleration regime without assigning a separate medium record to each class.

A compact residual is

$$
\mathcal{R}_{a_\star f}(\theta_{\mathrm{sea}})
=
\sum_E
\left[
d_E\!\left(
a_{\mathrm{obs}}(E),
a_{\mathrm{cmp}}\big(a_N(E);A_\star(\Pi_E\theta_{\mathrm{sea}}),F_\star(\Pi_E\theta_{\mathrm{sea}})\big)
\right)
+
\lambda_E
d_{\mathrm{shared}}\!\left(
\Pi_E\theta_{\mathrm{sea}},
\Pi_{\mathrm{cos}}\theta_{\mathrm{sea}}
\right)
\right]
$$

This residual is useful because it turns the cluster-versus-galaxy pressure into a falsifiable question. If the observed cluster temperature and lensing profiles require an $a_\star$ scale significantly above the galaxy radial-acceleration scale, that scale shift must be derived from environment-dependent Noether sea density, delay, stress, or neutral-assembly loading. If the same shift is inserted by hand, the branch has reproduced a comparison curve but not closed a native dark-sector mechanism.

Berezhiani-Khoury superfluid dark matter sharpens the same comparison discipline. Its source-level claim is that one dark sector can be CDM-like in cosmology and clusters while producing a MOND-like galactic force through collective low-temperature behavior. In this chapter that signal is not an ontology import: the Noether sea is not identified with a literal superfluid, and the comparison phonon is not added as a new $\mathbb{A}\mathbb{A}\mathbb{A}$ constituent. What survives is the environment split that any hybrid branch must explain from one shared medium-and-assembly record.

For that comparison, introduce source-side observer coordinates for the effective condensate and normal fractions,

$$
\Theta_{\mathrm{cmp}}(E)
\equiv
\frac{T_{\mathrm{cmp}}(E)}{T_{c,\mathrm{cmp}}(E)},
\qquad
\zeta_{\mathrm{cond}}^{\mathrm{cmp}}(E)
\leftrightarrow
\max\!\left(0,1-\Theta_{\mathrm{cmp}}(E)^{3/2}\right),
\qquad
\zeta_{\mathrm{norm}}^{\mathrm{cmp}}(E)
=
1-\zeta_{\mathrm{cond}}^{\mathrm{cmp}}(E)
$$

Here $E$ is an observer-level environment class, such as spiral galaxies, pressure-supported dwarfs, clusters, or the cosmological background. The temperature ratio and fractions are comparison coordinates only. A native branch must instead derive their effective values from $\Pi_E\theta_{\mathrm{sea}}$, $\rho_A$, $\rho_{\text{NS}}(\mathbf{x},t)$, $n(\mathbf{x},t)$, and $\chi_{\text{sea}}(\mathbf{x},t)$:

$$
\zeta_{\mathrm{cond}}^{\mathrm{cmp}}(E)
=
Z_{\mathrm{cond}}\!\left(
\Pi_E\theta_{\mathrm{sea}},
\rho_A,
\rho_{\text{NS}}(\mathbf{x},t),
n(\mathbf{x},t),
\chi_{\text{sea}}(\mathbf{x},t)
\right),
\qquad
\zeta_{\mathrm{norm}}^{\mathrm{cmp}}(E)
=
Z_{\mathrm{norm}}\!\left(
\Pi_E\theta_{\mathrm{sea}},
\rho_A,
\rho_{\text{NS}}(\mathbf{x},t),
n(\mathbf{x},t),
\chi_{\text{sea}}(\mathbf{x},t)
\right)
$$

The comparison target is therefore not "make a superfluid." It is the stronger phase-environment closure: galaxy environments should project toward a large low-acceleration response coordinate, cluster environments should retain a substantial CDM-like or normal component, and the cosmological background should remain pressureless enough to preserve CMB loading and growth. The MOND-like part is fixed by the radial-acceleration relation and by the BTFR limit

$$
a_{\mathrm{obs}}(r)\simeq\sqrt{a_N(r)a_0^{\mathrm{MOND}}},
\qquad
v_c^4\simeq G_NM_ba_0^{\mathrm{MOND}}
$$

A compact version of the closure residual is

$$
\begin{aligned}
\mathcal{R}_{\mathrm{phase\ split}}(\theta_{\mathrm{sea}},\rho_A)
=&
\ d_{\mathrm{gal}}\!\left(
D_{\mathrm{RAR/BTFR}}^{\mathrm{obs}},
\mathcal{P}_{\mathrm{gal}}\!\left(\theta_{\mathrm{sea}},\rho_A,\zeta_{\mathrm{cond}}^{\mathrm{cmp}}\right)
\right)
\\
&+
d_{\mathrm{cos+cl}}\!\left(
D_{\mathrm{cos+cl}}^{\mathrm{obs}},
\mathcal{P}_{\mathrm{cos+cl}}\!\left(\theta_{\mathrm{sea}},\rho_A,\zeta_{\mathrm{norm}}^{\mathrm{cmp}}\right)
\right)
\\
&+
\mathcal{R}_{\mathrm{stable\ branch}}(\theta_{\mathrm{sea}})
+
\lambda\,\mathcal{R}_{\mathrm{shared}}(\theta_{\mathrm{sea}}).
\end{aligned}
$$

This residual records the Berezhiani-Khoury pressure in $\mathbb{A}\mathbb{A}\mathbb{A}$ terms. The same $\theta_{\mathrm{sea}}$ must pass the galaxy RAR/BTFR comparison, the cluster temperature/lensing comparison, and the cosmological CDM-like comparison. $\mathcal{R}_{\mathrm{stable\ branch}}$ is included because the source's MOND branch requires finite-temperature stabilization; the native analogue is that a low-acceleration Noether sea response branch must be dynamically stable, not only curve-fit successful.

Ferreira-Franzmann-Khoury-Brandenberger unified-superfluid dark-sector models add a sharper comparison target: late-time acceleration can be driven by the same dark substance if that substance has two distinguishable states whose relative phase is coupled by a Josephson/Rabi interaction. In this chapter that is comparison language, not substrate ontology. The Noether sea is not identified with a literal superfluid, and the phase variables are not introduced as new $\mathbb{A}\mathbb{A}\mathbb{A}$ constituents. What survives is a one-record discipline: the same dark-sector state must carry CDM-like loading, state conversion, late-time acceleration, and the growth history.

Introduce comparison coordinates for two dark-sector populations,

$$
\eta_1^{\mathrm{cmp}}+\eta_2^{\mathrm{cmp}}=1,
\qquad
\varphi_{\mathrm{rel}}^{\mathrm{cmp}}(t)
=
\varphi_2^{\mathrm{cmp}}-\varphi_1^{\mathrm{cmp}}+\Delta E\,t
$$

and the source-side phase-coupling potential

$$
V_J^{\mathrm{cmp}}(t)
=
M_J^4
\cos^2\!\left(
\frac{\varphi_{\mathrm{rel}}^{\mathrm{cmp}}(t)}{2f_J}
\right)
$$

The native branch must derive these comparison coordinates from a medium-and-assembly projection, not fit them independently:

$$
\left(
\eta_1^{\mathrm{cmp}},
\eta_2^{\mathrm{cmp}},
\varphi_{\mathrm{rel}}^{\mathrm{cmp}},
M_J,
\Delta E,
f_J
\right)
=
\mathcal{J}_{\mathrm{dark}}\!\left(
\Pi_{\mathrm{cos}}\theta_{\mathrm{sea}},
\rho_A,
\rho_{\text{NS}}(\mathbf{x},t),
n(\mathbf{x},t),
\chi_{\text{sea}}(\mathbf{x},t)
\right)
$$

The conversion discipline can be recorded in source-term form,

$$
\dot N_1+3H_{\mathrm{eff}}^\theta N_1
=
-Q_J^\theta,
\qquad
\dot N_2+3H_{\mathrm{eff}}^\theta N_2
=
Q_J^\theta,
\qquad
Q_J^\theta
\sim
\Delta E\,\partial_{\varphi_{\mathrm{rel}}}V_J^{\mathrm{cmp}}
$$

so that the total dark-sector count $N_1+N_2$ is conserved while the relative population can evolve. The comparison background equation then becomes

$$
2\dot H_{\mathrm{eff}}^\theta
+3\left(H_{\mathrm{eff}}^\theta\right)^2
\simeq
\frac{V_J^{\mathrm{cmp}}(t)}{M_{\mathrm{Pl}}^2}
$$

as a source-side benchmark for late-time acceleration without adding an independent dark-energy fluid. A native $\mathbb{A}\mathbb{A}\mathbb{A}$ branch may pass this benchmark only if the right-hand side is reconstructed from $\theta_{\mathrm{sea}}$ and $\rho_A$ through $\mathcal{J}_{\mathrm{dark}}$.

The same source also supplies a perturbation-discipline lesson. Unified dark-sector models often fail when the component that imitates dark energy develops too large an adiabatic sound speed and corrupts the matter power spectrum. The comparison therefore imposes the linear pressurelessness condition

$$
c_{s,\mathrm{lin}}^{2,\theta}(a,k)
\ll
1
$$

over the CMB and large-scale-structure regime, while allowing nonlinear galaxy-scale medium response to depart from pressureless CDM. Growth must be tested with both the growth factor $D(z)$ and the growth rate

$$
f_{\mathrm{grow}}(z)
\equiv
\frac{d\ln D}{d\ln a}
=
-\frac{d\ln D}{d\ln(1+z)}
$$

The paper's numerical examples show why this matters: the background history and growth factor can remain close to $\Lambda\mathrm{CDM}$ while the late-time growth rate deviates more strongly. The $\mathbb{A}\mathbb{A}\mathbb{A}$ residual should therefore not stop at an $H(z)$ fit:

$$
\begin{aligned}
\mathcal{R}_{\mathrm{2state}}(\theta_{\mathrm{sea}},\rho_A)
=&
\ d_H\!\left(
2\dot H_{\mathrm{eff}}^\theta
+3\left(H_{\mathrm{eff}}^\theta\right)^2,
\frac{V_J^{\mathrm{cmp}}}{M_{\mathrm{Pl}}^2}
\right)
\\
&+
d_Q\!\left(
\dot N_1+3H_{\mathrm{eff}}^\theta N_1+Q_J^\theta,
\dot N_2+3H_{\mathrm{eff}}^\theta N_2-Q_J^\theta
\right)
\\
&+
d_c\!\left(c_{s,\mathrm{lin}}^{2,\theta},c_{s,\max}^2\right)
+
d_D\!\left(D^\theta,D^{\mathrm{obs}}\right)
+
d_f\!\left(f_{\mathrm{grow}}^\theta,f_{\mathrm{grow}}^{\mathrm{obs}}\right)
+
\lambda\,\mathcal{R}_{\mathrm{shared}}(\theta_{\mathrm{sea}}).
\end{aligned}
$$

This residual is the safe promoted signal from the two-state dark-sector comparison. It tests whether one shared Noether sea state and neutral-assembly record can supply effective acceleration, conserve the total dark-sector count while allowing internal conversion, keep the linear sound speed low, and reproduce growth observations without assigning separate medium histories to dark matter and dark energy.

The source's observational signatures are retained as comparison hooks rather than canonized predictions. Substructure-lensing features associated with vortices, merger behavior controlled by an infall-speed versus sound-speed threshold, mixed cluster lensing peaks, and MOND-free globular clusters are useful only if the native branch supplies corresponding Noether sea or neutral-assembly variables. Without that native map, those signatures remain model-specific to the superfluid-DM comparison.

### Regime Map

The hybrid baseline yields a unified regime architecture:

| Environment | Dominant mechanism | Effective description |
|:---|:---|:---|
| CMB / $z > 100$ | Neutral assemblies | CDM-like: pressureless, collisionless |
| BAO / $10 < z < 100$ | Neutral assemblies + linear medium | CDM + small corrections |
| Cluster scales / $z \sim 0$ | Neutral assemblies (collisionless) | NFW-like profiles; Bullet Cluster offset |
| Galaxy outer regions / low $a$ | Hybrid: assemblies + medium response | RAR tightness; rotation-curve diversity |
| Dwarf galaxies / ultra-low $a$ | Medium response dominant | Possible core-vs-cusp modification |

The boundaries between regimes are set by the ratio $|\nabla\Phi|/a_0^{\mathrm{MOND}}$ and the local Noether sea density gradient. These are continuous transitions within one ontology, not patched models.

### SMBH Recycling and Dark-Sector Flow

In $\mathbb{A}\mathbb{A}\mathbb{A}$ cosmology, supermassive black holes (SMBHs) are recycling furnaces: baryonic and dark-sector assemblies fall in, are processed through the high-energy interior (inner nested shell braid regime, $v > c_f$), and may later re-emerge through several release channels in altered assembly configurations. Jets and radiative outflows remain plausible observer-level manifestations, but they are not the only allowed release morphology. This cycle has implications for the dark sector:

- **Neutral-assembly processing:** If neutral assemblies accrete onto SMBHs, they contribute to the energy budget available for outward release. Re-emitted content may include photons (coaxial contra-rotating pro/anti planar-pair modes), neutrinos, recycled neutral assemblies, or initially dark-sector modes that later convert into visible channels.
- **Dark-sector mass evolution:** Unlike pure $\Lambda\mathrm{CDM}$ where dark matter is strictly conserved and collisionless, $\mathbb{A}\mathbb{A}\mathbb{A}$ permits slow conversion between dark and visible sectors through SMBH processing. This conversion rate must be small enough to preserve $\Omega_{\mathrm{DM}}$ to within Planck-era constraints over cosmological timescales, which places an upper bound on the SMBH dark-matter accretion efficiency.
- **Observable signature (speculative):** If SMBH recycling converts neutral assemblies into electromagnetic-channel products at non-negligible rates, this could produce a correlation between SMBH mass and local dark-matter deficit. This is a mapping target for simulation, not an asserted observational deviation.

### Candidate Assembly Properties

#### Mass Scale

The neutral-assembly mass is not a free parameter to be fitted post hoc; it must emerge from the assembly's internal energy ledger, shielding factor, and medium-dressed response to the Noether sea. This is an inertial and gravitational response map, not ordinary dissipative drag. Candidate mass ranges, mapped to observational constraints:

- $m \sim$ eV: warm dark matter; suppresses small-scale structure.
- $m \sim$ keV–GeV: canonical cold dark matter window.
- $m \sim$ GeV–TeV: WIMP-like comparison window, not a neutralino identification.
- $m \gg$ TeV: superheavy; must be produced non-thermally (e.g., gravitational production or SMBH-related formation in early epochs).

The $\mathbb{A}\mathbb{A}\mathbb{A}$ framework does not currently predict a unique mass; deriving the mass spectrum from first-principles nested shell braid binding energies and formation rates is a high-priority simulation target.

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
\right)
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
\Delta N_{\mathrm{eff}}\in\mathcal{B}_{\mathrm{BBN/CMB}}
$$
Failure of any row keeps the branch external to the working dark-matter ontology. Passing these rows would still not identify the branch with the current neutral-assembly baseline unless the same internal-energy, shielding, and Noether sea response map derives its mass and coupling suppression.

#### Source-Limited WIMP/Neutralino Comparison Benchmark

A WIMP or neutralino comparison is useful here only as detector-facing benchmark language. The Jungman--Kamionkowski--Griest arXiv record used for this comparison exposes the abstract, metadata, table of contents, and source note, but not the full review text; it therefore supplies constraint categories rather than detailed supersymmetric model claims. In this chapter, a neutralino-like benchmark does not identify a native assembly with a superpartner and does not make supersymmetry part of Noether braid ontology.

For any neutral-assembly branch $A$, record the comparison vector

$$
\mathcal{B}_{A}^{\mathrm{WIMP}}
=
\left(
m_A,
\Omega_A h^2,
\langle\sigma v\rangle_A,
\sigma_A^{\mathrm{scalar}},
\sigma_A^{\mathrm{axial}},
\Gamma_{\nu}^{\odot/\oplus},
\Phi_{\bar p},
\Phi_{e^+},
\Phi_\gamma
\right)
$$

The entries track assembly mass, relic abundance, annihilation rate, scalar and axial scattering channels for direct detection, neutrino rates from solar or terrestrial capture, and indirect antiproton, positron, and gamma-ray fluxes. The native branch may pass this benchmark only if one medium-and-assembly record predicts or bounds all entries while satisfying direct-detection, indirect-detection, collider, CMB/BBN, structure-growth, and other relevant null-result constraints. Matching $\Omega_A h^2$ alone is not dark-matter closure; the same branch must also keep scattering and annihilation channels below excluded levels or declare a detectable channel.

#### Interaction Cross-Sections

Neutral assemblies interact with each other and with baryonic matter only through:

- **Gravitational coupling** (Noether sea compression): always present; sets halo profiles.
- **Residual short-range coupling:** If the neutral assembly has any non-zero higher-multipole moment (e.g., a quadrupole from internal binary precession), there is a short-range van-der-Waals-like interaction scaling as $r^{-7}$ or steeper. The self-interaction sector can then carry nontrivial velocity dependence.

#### Stability

The neutral-assembly candidate must be cosmologically stable: lifetime $\tau \gg t_0 \approx 13.8$ Gyr. In $\mathbb{A}\mathbb{A}\mathbb{A}$, stability follows from the same topological arguments that stabilize the proton: the assembly occupies a deep attractor basin in Noether braid configuration space, and all dissociation channels either violate charge/polarity conservation or require energy input exceeding the cosmological temperature.

### Cosmology Integration

#### Pre-Decoupling ($z \gtrsim 1100$)

Neutral assemblies contribute to the total matter density:

$$
\Omega_m = \Omega_b + \Omega_A, \quad \Omega_A \approx 0.25
$$

Their gravitational effect on photon-baryon oscillations produces the characteristic signature in the [CMB](../../../../markdown/aaa/cosmology/CMB.md) power spectrum: suppression of odd peaks (baryon loading) with the overall amplitude and peak-height ratios set by $\Omega_A/\Omega_b$.

#### Post-Decoupling Growth

Matter perturbations grow as $\delta \propto a$ in the matter-dominated era. The $\mathbb{A}\mathbb{A}\mathbb{A}$ growth equation in the Newtonian limit reads:

$$
\ddot{\delta}_A + 2H\dot{\delta}_A = 4\pi G_{\mathrm{eff}}\,\rho_m\,\delta_m
$$

where $\rho_m = \rho_b + \rho_A$ and $G_{\mathrm{eff}}$ may carry scale-dependent corrections from Noether sea response. In the high-acceleration (linear) regime, $G_{\mathrm{eff}} \to G_N$ and standard CDM growth is recovered. Deviations from $\Lambda\mathrm{CDM}$ growth appear only when $|\nabla\Phi|/a_0^{\mathrm{MOND}} \lesssim 1$, which on cosmological scales ($k < 0.01\;h\,\mathrm{Mpc}^{-1}$) may be relevant at low redshift and could contribute to resolving the $S_8$ tension.

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

All interfaces use the same absolute-time / Euclidean-space substrate and the same Noether sea state variables, ensuring ontological consistency across modules. The cosmology-level framing for those shared interfaces lives in [Cosmology Ontology](../../../../markdown/aaa/cosmology/cosmology-ontology.md).

### Summary

Dark-matter phenomenology in $\mathbb{A}\mathbb{A}\mathbb{A}$ is attributed to a hybrid of two mechanisms arising from the same Noether braid substrate:

- **Neutral assemblies** (Candidate A): electromagnetically transparent nested shell braid configurations that cluster gravitationally, reproducing CDM-like behavior at cluster and cosmological scales.
- **Noether sea response** (Candidate B): non-linear elastic corrections to effective gravity at low accelerations, providing scale-dependent modifications relevant to galaxy-scale phenomenology.

The working baseline is the hybrid (Candidate C), with neutral assemblies carrying the dominant mass fraction and medium response supplying corrections. Deriving the neutral-assembly mass spectrum, interaction cross-sections, and medium constitutive relations from the master equation is the critical open program.

## Dark Energy

This chapter treats dark energy as a Noether sea state problem inside the Noether sea rather than as literal expansion of the Euclidean void. Its job is to map the standard late-time acceleration data onto substrate evolution, effective equation-of-state language, and possible large-scale energy-partition mechanisms within $\mathbb{A}\mathbb{A}\mathbb{A}$.

The opening sections state the ontology and the medium-level interpretation of accelerated expansion. Later sections connect that picture to effective Friedmann variables, redshift, black-hole recycling ideas, and the practical module interface for cosmological closure.

### Scope and Purpose

Standard $\Lambda\mathrm{CDM}$ cosmology attributes roughly 68% of the present energy budget to dark energy—a component with equation-of-state parameter $w \approx -1$ that drives late-time accelerated expansion. The simplest realization is a cosmological constant $\Lambda$, which enters Einstein's field equations as a geometric term equivalent to a constant vacuum energy density $\rho_\Lambda = \Lambda c^2 / (8\pi G) \approx 5.96 \times 10^{-27}\;\mathrm{kg\,m^{-3}}$.

This chapter maps dark-energy phenomenology onto the architrino assembly architecture. The central claim is that late-time acceleration is not the expansion of the Euclidean void itself—which is fixed, non-dynamical, and does not stretch—but a macroscopic readout of the evolving internal state of the Noether sea. The task is to identify the substrate-level mechanism and derive the effective equation of state. Within that program, black holes are treated as one possible mediator of the large-scale energy-partition history, not as a replacement for the Noether sea ontology itself.

The density-parameter success of the dark-energy entry is not by itself a substrate derivation. It means that late-time distance, CMB, growth, and curvature comparisons require a large effective component in the observer-level inventory. In this chapter the entry is therefore treated as observationally constrained but physically unresolved until the same Noether sea record supplies $\rho_{\mathrm{DE,eff}}$, $w_{\mathrm{eff}}$, and the shared residual behavior without changing projection maps between pipelines.

#### Historical Comparison Discipline

The history of the cosmological constant is useful because it shows how one symbol has carried several different jobs. In the late nineteenth-century Newtonian setting, a constant was used as a long-range modification of gravitation. In Einstein's 1917 model, $\Lambda$ was introduced to support a static matter-filled universe, then weakened when the static assumption and the model's stability failed. Later uses were again problem-driven: age estimates, galaxy-formation timing, quasar redshift distributions, steady-state matter creation, inflationary false-vacuum comparison, and finally the modern $\Lambda\mathrm{CDM}$ concordance fit.

The safe $\mathbb{A}\mathbb{A}\mathbb{A}$ lesson is not that these historical roles reveal one ontology. The lesson is that a successful constant-like fit can be a mathematical regularizer, a static-model support term, an integration constant, a vacuum-energy comparison, an inflationary effective term, or a late-time observer parameter. This chapter therefore treats $\Lambda$ and dark energy as comparison language until a Noether sea constitutive derivation supplies the same value, time dependence, and residual behavior from the same Noether sea state record.

The modern return of $\Lambda$ was also not a single-observation event. It came from converging pressure: revised $H_0$ and age estimates, SN Ia distance residuals, CMB flatness and acoustic-scale constraints, matter-density and structure-formation evidence, lensing, and galaxy-clustering results. That history supports the shared-residual rule used below: no dark-energy interpretation is promotable from one pipeline alone if the same Noether sea record cannot also project coherently into the other comparison pipelines.

The Einstein static-universe episode adds a more precise branch lesson. In the 1917 static comparison model, the cosmological constant was tied to the static support conditions

$$
\Lambda_{\mathrm{static}}
=
\frac{\kappa_E\rho_m}{2}
=
\frac{1}{R^2},
\qquad
\dot R = 0
$$

where $\rho_m$ is the mean matter density in the static comparison, $R$ is the closed-universe radius used by that model, and $\kappa_E$ is the standard Einstein gravitational constant used in the comparison equations. Those equations are not a native $\mathbb{A}\mathbb{A}\mathbb{A}$ derivation of dark energy. They are a branch-support relation: $\Lambda$ was doing the job of holding a matter-filled static solution in place. Once the static assumption was weakened by redshift-distance evidence and by the instability of the static branch, the same symbol no longer had the same warrant.

For $\mathbb{A}\mathbb{A}\mathbb{A}$, this becomes a provenance constraint on any constant-like term. A fitted value may be retained as comparison language only after its branch role is named:

$$
\mathcal{B}_{\Lambda}
\in
\{\mathrm{static\ support},\mathrm{branch\ constant},\mathrm{vacuum\ comparison},\mathrm{late\text{-}time\ fit},\mathrm{Noether\text{-}Sea\ output}\}
$$

The residual is not just numerical agreement with a preferred $\Lambda$. It is agreement between the claimed branch role and the data product that selected it. A constant introduced to repair a static branch cannot be reified as a medium density merely because a later accelerated-expansion fit also uses the symbol $\Lambda$.

### $\mathbb{A}\mathbb{A}\mathbb{A}$ Ontology Foundations

#### The Void Does Not Expand

The Euclidean void $\mathbb{R}^3$ with metric $h_{ij} = \delta_{ij}$ is static, homogeneous, isotropic, and non-dynamical (Postulate 2). It does not curve, stretch, or respond to energy content. Cosmological "expansion" in the $\mathbb{A}\mathbb{A}\mathbb{A}$ framework refers exclusively to the dynamical evolution of the assemblies that populate the void—not to any change in the void's geometry.

#### The Noether Sea Carries the Dynamics

The Noether sea is the constitutive substrate from which effective spacetime behavior is reconstructed: a dense coupled population of neutral pro/anti Noether braids. Each Noether braid has internal energy stored across three nested shell binaries operating in distinct field-speed regimes. The collective state of the Noether sea—its local Noether braid density $\rho_{\text{NS}}(\mathbf{x},t)$, normalized density $n(\mathbf{x},t)$, internal energy spectrum, delay response $\chi_{\text{sea}}$, and anisotropy—defines the effective metric experienced by all embedded assemblies.

Late-time cosmological acceleration, in this picture, is a statement about how the aggregate properties of the Noether sea evolve on Hubble timescales, not about the container expanding.

### Noether Sea State Interpretation of Accelerated Expansion

#### Baseline Energy of the Noether Sea

In the nested shell case, each Noether braid in the Noether sea carries internal binding energy distributed across its three binary tiers:

- **Inner binary** ($v > c_f$, self-hit regime): highest energy density, tightest orbit, contributes to the gravitational charge and inertial mass of the assembly.
- **Middle binary** ($v = c_f$): defines the effective causal speed; carries intermediate energy.
- **Outer binary** ($v < c_f$): lowest energy density, largest radius; couples most directly to cosmological-scale dynamics through expansion/contraction modes.

The baseline energy density of the Noether sea is

$$
u_{\mathrm{sea}} = \rho_{\text{NS}}\,\langle E_{\mathrm{core}} \rangle
$$

where $\rho_{\text{NS}}$ is the canonical Noether braid density field and $\langle E_{\mathrm{core}} \rangle$ is the mean energy per Noether braid. This quantity sets the scale of the effective dark-energy density:

$$
\rho_{\mathrm{DE,eff}} \sim u_{\mathrm{sea}}\,f(\text{outer-binary state})
$$

where $f$ encodes what fraction of the baseline energy acts as an effective negative pressure on cosmological scales.

#### Why Negative Pressure?

In standard thermodynamics, a system with equation of state $w = p/\rho < -1/3$ drives acceleration of the scale factor. In the $\mathbb{A}\mathbb{A}\mathbb{A}$ framework, the Noether sea can exhibit effective negative pressure through the following mechanism:

**Outer-binary tension.** Each Noether braid's outer binary is a bound oscillator in the $v < c_f$ regime. The outer binary has a natural equilibrium radius set by the balance between partner attraction and coupling to the Noether sea. When the mean inter-braid spacing increases (due to matter dilution as structure forms and baryonic assemblies aggregate into galaxies), the outer binaries of neighbouring Noether sea braids are stretched beyond equilibrium. This stretching stores elastic energy and produces a restoring stress—a tension—that acts to resist further separation.

A uniform medium under tension has the thermodynamic signature $p < 0$. If the magnitude of the tension exceeds $\rho c^2/3$, the effective equation of state satisfies $w < -1/3$, which drives acceleration.

**Self-consistency requirement.** The tension must be nearly constant in time (slowly varying) to produce $w \approx -1$ rather than a rapidly oscillating or decaying equation of state. This requires that the outer-binary relaxation timescale is comparable to or longer than the Hubble time:

$$
\tau_{\mathrm{relax}}^{\mathrm{outer}} \gtrsim H_0^{-1} \approx 1.4 \times 10^{10}\;\mathrm{yr}
$$

This sets a strong dynamical condition on outer-binary relaxation.

#### Medium Relaxation and the Expansion History

The evolution of $\rho_{\mathrm{DE,eff}}(t)$ is governed by the collective relaxation of the Noether sea state. Schematically:

- At early times ($z \gg 1$), the Noether sea is dense and hot; outer binaries are contracted, and the effective dark-energy contribution is subdominant relative to matter and radiation energy densities.
- As the Noether sea cools and dilutes through structure formation and radiation escape, outer binaries relax toward larger radii. The associated tension becomes dynamically significant when $\rho_{\mathrm{DE,eff}} \sim \rho_m$, which occurs at $z \sim 0.3$–$0.7$ (the onset of acceleration).
- At late times ($z \to 0$), the Noether sea approaches a quasi-equilibrium state with slowly evolving tension, producing an approximately constant $\rho_{\mathrm{DE,eff}}$ and $w \approx -1$.

This narrative must be made quantitative through a constitutive relation linking the Noether sea state variables to an effective pressure. The minimal parameterization is:

$$
p_{\mathrm{sea}} = p_{\mathrm{sea}}\bigl(\rho_{\text{NS}},\;\dot{\rho}_{\text{NS}},\;n,\;\chi_{\text{sea}},\;\langle R_{\mathrm{outer}} \rangle,\;T_{\mathrm{eff}}\bigr)
$$

where $\langle R_{\mathrm{outer}} \rangle$ is the mean outer-binary radius and $T_{\mathrm{eff}}$ is an effective temperature characterizing internal mode excitation. Deriving this relation from the master equation applied to coupled Noether braid populations is a primary simulation target.

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
\epsilon_\mu
$$

Here $\hat{\mathbf{n}}$ is the line of sight, $\mathcal{E}$ denotes source and host environment, $A_\mu\hat{\mathbf{d}}_\mu$ is a possible dipolar component, $\delta\mu_{\mathrm{cal}}$ records standardization and population-evolution corrections, $\delta\mu_{\mathrm{sea}}$ records Noether sea state contributions, and $\epsilon_\mu$ is the remaining noise term. A Noether sea acceleration or relaxation claim is promotable only after the dipole, calibration, and environment terms are either bounded below the claimed effect or derived from the same medium variables used elsewhere.

For BAO and CMB distance anchors, the corresponding requirement is frame consistency. A fit that assumes a homogeneous and isotropic Friedmann-Lemaître-Robertson-Walker background must also report whether the BAO scale, source-count dipoles, and local supernova residuals remain consistent with the CMB-frame correction. If they do not, the result becomes a directional cosmology problem before it becomes a dark-energy mechanism.

The historical redshift lesson is also an interpretation lesson. Hubble-style redshift-distance evidence did not by itself dictate a unique ontology; it weakened the static assumption after the redshifts were interpreted through a declared kinematic or metric model. The native comparison rule is therefore to keep the data product and its interpretation map separate:

$$
\mathcal{D}_X
=
\mathcal{I}_X(\theta_{\mathrm{sea}},\nu_X)
+r_X,
\qquad
X\in\{\mathrm{SN},\mathrm{BAO},\mathrm{CMB},\mathrm{growth}\}
$$

Here $\mathcal{D}_X$ is the calibrated observable record, $\mathcal{I}_X$ is the declared projection from the shared Noether sea record into that observable family, $\nu_X$ collects nuisance and calibration variables, and $r_X$ is the residual. A successful $\Lambda$ or $w(a)$ fit belongs first to $\mathcal{I}_X$; it becomes a native dark-energy claim only if the same $\theta_{\mathrm{sea}}$ projects through the other observable families without changing the branch story.

Sunyaev-Zeldovich-type frequency shifts add a concrete calibration pressure to this rule. Photon frequency can be altered by intervening medium before it enters a distance-redshift or CMB-temperature inference. Therefore a dark-energy interpretation that depends on late-time redshift-distance curvature must first preserve the signed photon-frequency transfer budget

$$
Z_X
=
Z_{\mathrm{endpoint},X}
+Z_{\mathrm{source},X}
+Z_{\mathrm{launch},X}
+Z_{\mathrm{path},X}
$$

with $Z_{\mathrm{path},X}$ allowed to be positive or negative only when the corresponding energy and medium-state exchange rows close. The dark-energy residual must not treat all leftover frequency shift as expansion after suppressing endpoint, source, launch, or SZ-like path terms. It must show that the same $\theta_{\mathrm{sea}}$ supplies the redshift-transfer curvature, blackbody preservation, supernova flux factors, BAO ruler projection, and growth response.

As of April 2026, DESI has completed the observations for its originally planned five-year survey, but the first dark-energy results from the full five-year dataset are expected in 2027. The current public pressure comes from the 2025 first-three-year BAO analysis: combined with CMB, supernova, and weak-lensing data, it strengthens comparison fits with time-varying $w(a)$ relative to a pure constant-$\Lambda$ description. The safe $\mathbb{A}\mathbb{A}\mathbb{A}$ use is therefore a calibration gate: preserve the BAO distance ladder, supernova residual model, CMB anchor, lensing/growth consistency, and parameter-covariance record before promoting any Noether sea relaxation interpretation.

The shared calibration gate can be written as a residual criterion. Let

$$
\mathcal{X}_{\mathrm{cos}}
=
\{\mathrm{SN},\mathrm{BAO},\mathrm{CMB},\mathrm{WL},\mathrm{RSD},\mathrm{BBN}\}
$$

For a candidate Noether sea state parameter record $\theta_{\mathrm{sea}}$, define

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
\left\|
\Pi_X\theta_{\mathrm{sea}}
-
\Pi_Y\theta_{\mathrm{sea}}
\right\|^2
$$

Here $r_X$ is the residual vector for observable family $X$, $\nu_X$ records nuisance and calibration variables, $C_X$ is the covariance model, and $\Pi_X$ projects the shared Noether sea state record into the variables consumed by that observable family. A dark-energy interpretation is promotable only if both the ordinary residuals and the cross-projection penalty can be controlled without replacing $\theta_{\mathrm{sea}}$ separately for each pipeline. The first mock validation artifact for this gate is [Cosmology Shared Residual Fit Protocol](../../../../markdown/aaa/validation/simulations/cosmology-shared-residual-fit.md).

#### Fitted, Integration, Vacuum, and Native Readings of $\Lambda$

The historical record requires a four-way separation. First, a fitted cosmological constant is an observer-model parameter chosen to minimize residuals in a declared comparison model:

$$
\Lambda_{\mathrm{fit}}
=
\operatorname*{arg\,min}_{\Lambda,\nu_X}
\sum_{X\in\{\mathrm{SN},\mathrm{BAO},\mathrm{CMB},\mathrm{growth}\}}
r_X(\Lambda,\nu_X)^T C_X^{-1}r_X(\Lambda,\nu_X)
$$

Second, an integration-constant reading treats $\Lambda$ as a branch constant fixed by the effective solution class rather than as a local material density. In comparison language this means

$$
\nabla_\mu T^{\mu\nu}_{\mathrm{eff}}=0
\quad\Longrightarrow\quad
\Lambda_{\mathrm{int}}=\text{constant on the chosen effective branch}
$$

but it does not explain why that branch constant has the observed value.

Third, a vacuum-energy estimate belongs to continuum QFT comparison. If $\rho_{\mathrm{vac}}^{\mathrm{QFT}}$ is a mass-equivalent density estimate from zero-point, electroweak, QCD, and other effective field contributions, then the standard comparison map is

$$
\Lambda_{\mathrm{vac}}^{\mathrm{QFT}}
=
\frac{8\pi G}{c^2}\rho_{\mathrm{vac}}^{\mathrm{QFT}},
\qquad
\rho_{\mathrm{vac}}^{\mathrm{QFT}}
=
\rho_{\mathrm{zf}}+\rho_{\mathrm{ew}}+\rho_{\mathrm{qcd}}+\cdots
$$

This estimate is not a measurement of energy in the Euclidean void. In this chapter it is a stress test for the Noether sea coupling-selection theorem target: a viable constitutive law must explain why high-frequency internal energy is shielded from the observer-level cosmological channel while the slow outer-binary and transport sectors remain exposed.

Fourth, the native closure target is the effective constant reconstructed from a shared Noether sea state:

$$
\Lambda_{\mathrm{eff}}^{\mathrm{sea}}[\theta_{\mathrm{sea}}]
=
\frac{8\pi G_{\mathrm{eff}}}{c_0^2}
\rho_{\mathrm{DE,eff}}[\theta_{\mathrm{sea}}]
\quad
\text{on the homogeneous } w_{\mathrm{eff}}\approx -1 \text{ comparison branch}
$$

No identity is assumed among $\Lambda_{\mathrm{fit}}$, $\Lambda_{\mathrm{int}}$, $\Lambda_{\mathrm{vac}}^{\mathrm{QFT}}$, and $\Lambda_{\mathrm{eff}}^{\mathrm{sea}}$. A native dark-energy claim must instead pass a residual matching test,

$$
\Delta_X(\theta_{\mathrm{sea}})
=
\Lambda_X^{\mathrm{fit}}
-
\Pi_X\Lambda_{\mathrm{eff}}^{\mathrm{sea}}[\theta_{\mathrm{sea}}],
\qquad
X\in\{\mathrm{SN},\mathrm{BAO},\mathrm{CMB},\mathrm{growth}\}
$$

with all $\Delta_X$ controlled by the same covariance and nuisance records used in $\mathcal{R}_{\mathrm{shared}}$. If SN, BAO, CMB, or growth data require different $\theta_{\mathrm{sea}}$ records, the result is only a fitted constant, not a closed Noether sea derivation.

#### Thermodynamic $\Lambda_{\mathrm{eff}}$ Closure Target

Thermodynamic readings of the cosmological constant are useful only at the effective geometry level. In standard metric language, $\Lambda$ multiplies a four-volume term in the gravitational action. In $\mathbb{A}\mathbb{A}\mathbb{A}$, that observation should not be imported as a fundamental spacetime-volume ontology. The native question is whether a shared Noether sea state record can make the observer-level $\Lambda_{\mathrm{eff}}$ act like a conjugate variable to an effective four-volume summary while preserving the same residual gates used above.

For a candidate Noether sea state record $\theta_{\mathrm{sea}}$, let $V_4^{\mathrm{eff}}[\theta_{\mathrm{sea}}]$ denote the effective observer-level four-volume reconstructed over a stated comparison domain, and let $Q_a[\theta_{\mathrm{sea}}]$ denote the conserved or provenance quantities held fixed during the comparison. A minimal thermodynamic closure functional is

$$
\mathcal{P}_{\Lambda}
\bigl(\theta_{\mathrm{sea}};\Lambda_{\mathrm{eff}},\{\mu_a\}\bigr)
=
S_{\mathrm{sea}}[\theta_{\mathrm{sea}}]
-
\Lambda_{\mathrm{eff}}\,V_4^{\mathrm{eff}}[\theta_{\mathrm{sea}}]
-
\sum_a \mu_a Q_a[\theta_{\mathrm{sea}}]
$$

The closure target is stationarity of this functional under allowed Noether sea variations,

$$
\frac{\delta \mathcal{P}_{\Lambda}}{\delta \theta_{\mathrm{sea}}}=0,
\qquad
\Lambda_{\mathrm{eff}}
=
\left.
\frac{\partial S_{\mathrm{sea}}}{\partial V_4^{\mathrm{eff}}}
\right|_{Q_a}
$$

with $\Lambda_{\mathrm{eff}}>0$ only if the same $\theta_{\mathrm{sea}}$ also passes $\mathcal{R}_{\mathrm{shared}}$. This makes small positive $\Lambda_{\mathrm{eff}}$ a constrained output of Noether sea state entropy and conserved-record selection, not a license to fit an isolated constant after the fact. If the stationary point requires changing $\theta_{\mathrm{sea}}$ separately for SN, BAO, CMB, WL, RSD, or BBN, the thermodynamic reading fails as a closure and remains only a comparison analogy.

#### Cosmological-Constant and Creation-Source Discipline

The historical steady-state comparison is useful because it separates two ideas that are easy to conflate: a positive cosmological-constant-like term and a source of matter. In standard metric language, $\Lambda$ can be read as a constant energy-density term. That reading does not by itself supply a matter-production ledger, and in $\mathbb{A}\mathbb{A}\mathbb{A}$ it must not be rephrased as energy residing in the Euclidean void.

For an effective matter component, write the sourced continuity comparison as
$$
\dot{\rho}_{m,\mathrm{eff}}
+3H_{\mathrm{eff}}\rho_{m,\mathrm{eff}}
=
\mathcal{S}_{m,\mathrm{eff}}
$$
The dark-energy branch supplies $\rho_{\mathrm{DE,eff}}$, $w_{\mathrm{eff}}$, $\mathcal{S}_{\mathrm{sea}}$, and $\mathcal{S}_{\mathrm{BH}}$ as Noether sea state and recycling variables. It does not automatically supply $\mathcal{S}_{m,\mathrm{eff}}$. A proposed conversion from dark-energy-like stress into matter must therefore close the provenance residual
$$
\mathcal{R}_{\mathrm{src}}
=
\mathcal{S}_{m,\mathrm{eff}}
-
\Pi_m\!\left[
S(t);
\mathcal{H}_{\mathrm{assoc}},
\mathcal{H}_{\mathrm{diss}},
\mathcal{H}_{\mathrm{BH}},
\mathcal{H}_{\mathrm{sea}}
\right]
$$
where $\Pi_m$ projects the absolute assembly, reaction, recycling, and Noether sea histories into the effective matter source. The residual must vanish within tolerance before a constant-density or matter-creation-like interpretation is promoted. This is the safe lesson from failed steady-state models: conservation can be preserved only by an explicit source channel, not by assigning unexplained energy to the container.

The same discipline applies to comparison models that obtain acceleration through negative effective mass, phase-transition vacuum energy, time-varying $\Lambda(t)$, or Hubble-age pressure on $\Lambda$. These are useful as branch-role stress tests, not as imported ontology. Let the comparison branch declare

$$
\mathcal{C}_{\mathrm{DE}}
\in
\{\mathrm{negative\ effective\ fluid},\mathrm{phase\text{-}transition\ vacuum\ comparison},\mathrm{time\text{-}varying\ }\Lambda,\mathrm{Hubble\text{-}age\ pressure}\}
$$

For that branch, the promoted Noether sea account must keep the effective stress, matter source, and observer-level constant separate:

$$
\mathcal{R}_{\mathrm{role}}
=
\left\|
\begin{pmatrix}
\rho_{\mathrm{DE,eff}} \\
p_{\mathrm{sea}} \\
\mathcal{S}_{m,\mathrm{eff}} \\
\dot{\Lambda}_{\mathrm{eff}}
\end{pmatrix}
-
\Pi_{\mathrm{role}}\!\left[
\theta_{\mathrm{sea}};
\mathcal{C}_{\mathrm{DE}},
\mathcal{H}_{\mathrm{assoc}},
\mathcal{H}_{\mathrm{diss}},
\mathcal{H}_{\mathrm{BH}},
\mathcal{H}_{\mathrm{sea}}
\right]
\right\|
$$

The closure condition is $\mathcal{R}_{\mathrm{role}}\to 0$ without changing $\theta_{\mathrm{sea}}$ between the distance, age, growth, and source ledgers. A negative sign in an effective fluid may be retained only as a sign in the comparison stress tensor; it does not license negative masses as native assemblies. A phase-transition or vacuum-energy comparison may constrain $\dot{\Lambda}_{\mathrm{eff}}$ or the shielding law; it does not make $\Lambda(t)$ fundamental. A Hubble-age repair may motivate a branch constant; it does not supply $\mathcal{S}_{m,\mathrm{eff}}$. This protects the Noether sea derivation from smuggling negative masses, matter creation, or variable $\Lambda$ into $\mathbb{A}\mathbb{A}\mathbb{A}$ as doctrine.

### Effective Friedmann Framework

#### Background Equations

In the $\mathbb{A}\mathbb{A}\mathbb{A}$ framework, the Friedmann equations are not fundamental but emerge as the effective large-scale description of the evolving Noether sea in the homogeneous, isotropic limit. The effective Hubble rate is:

$$
H^2(z) = \frac{8\pi G_{\mathrm{eff}}}{3}\bigl[\rho_r(z) + \rho_m(z) + \rho_{\mathrm{DE,eff}}(z)\bigr]
$$

where $\rho_r$, $\rho_m$, and $\rho_{\mathrm{DE,eff}}$ are the effective energy densities of radiation-mode assemblies, matter assemblies (baryonic + neutral dark assemblies), and the Noether sea baseline/tension term respectively. In the standard limit, $G_{\mathrm{eff}} \to G_N$ and $\rho_{\mathrm{DE,eff}} \to \rho_\Lambda = \text{const}$, recovering $\Lambda\mathrm{CDM}$.

The effective dark-energy density evolves according to:

$$
\dot{\rho}_{\mathrm{DE,eff}} + 3H(1 + w_{\mathrm{eff}})\,\rho_{\mathrm{DE,eff}} = \mathcal{S}_{\mathrm{relax}}
$$

where $w_{\mathrm{eff}} = p_{\mathrm{sea}}/\rho_{\mathrm{DE,eff}}$ and $\mathcal{S}_{\mathrm{relax}}$ is a source term encoding energy exchange between the dark-energy sector and other components during medium relaxation. In the $\Lambda\mathrm{CDM}$ limit, $w_{\mathrm{eff}} = -1$ and $\mathcal{S}_{\mathrm{relax}} = 0$.

#### Equation of State: Effective Descriptor

The equation-of-state parameter

$$
w = \frac{p}{\rho}
$$

is treated as an emergent summary of the Noether sea state, not as a fundamental ontological quantity. In lowest-order fits, $w \approx -1$ is admissible as an effective description while the underlying mechanism remains medium-based. Time variation can be parameterized in the standard $w_0$–$w_a$ form:

$$
w(a) = w_0 + w_a(1-a)
$$

with $a = 1/(1+z)$ the effective scale factor (defined operationally through the redshift of photon-mode assemblies).

#### Observed Equation of State and Medium Accounting

A fitted $w(a)$ is a data-product parameterization, not automatically the physical pressure law of the Noether sea. The standard no-source reading defines an observed effective value by
$$
\frac{d\ln\rho_{\mathrm{DE,fit}}}{d\ln a}
=
-3\bigl(1+w_{\mathrm{obs}}(a)\bigr)
$$
In a Noether sea state model, the same fitted trend can absorb at least three distinct effects: the native pressure ratio $w_{\mathrm{source}}(a)$, an actual source or transfer term $\mathcal{S}_{\mathrm{relax}}$, and drift in the observer-level map from Noether sea variables to effective dark-energy density. If
$$
\rho_{\mathrm{DE,fit}}(a)
=
\Pi_{\mathrm{DE}}(a)\,\rho_{\mathrm{DE,eff}}(a)
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
\frac{d\ln\Pi_{\mathrm{DE}}}{d\ln a}
$$
This split prevents a time-varying $w(a)$ preference from being promoted too quickly. The observable to preserve is the distance, lensing, growth, and covariance record that produced $w_{\mathrm{obs}}(a)$; the interpretation remains open until the same $\theta_{\mathrm{sea}}$ derives the source term and the projection drift without changing records between pipelines.

#### de Sitter and Phantom-$w$ Comparison

Standard quantum-gravity discussions often use de Sitter space as the clean comparison model for a universe with asymptotically constant positive dark energy. In holographic language, the speculative target is a boundary or statistical description associated with the far future. In this chapter, that comparison should remain effective rather than ontological: $a(t)$, $H(t)$, and $w(a)$ are observer-level summaries of Noether sea evolution, not fundamental variables of the Euclidean void.

The strongest lesson from modern string and holographic debates is that de Sitter comparison cannot be treated as a minor variant of the anti-de Sitter case. Anti-de Sitter control relies on a spatial boundary where a conformal theory can be placed; the de Sitter-like late universe instead gives observers horizon-limited access inside an evolving Noether sea state. The local target is therefore an observer-horizon accounting rule, not a literal boundary CFT.

Horizon-limited access also means that a de Sitter-like fit inside one observer's accessible region does not by itself select the global continuation of the universe. The data product to preserve is the horizon-accessible expansion, curvature, entropy, and SN/BAO/CMB/growth record. A global asymptotic state remains an effective reconstruction unless the same Noether sea record removes the ambiguity described in [Cosmology Ontology](../../../../markdown/aaa/cosmology/cosmology-ontology.md#global-reconstruction-promotion-gate).

Time-varying dark energy would weaken the usefulness of exact de Sitter comparison because the far-future state would not be a fixed de Sitter limit unless the variation eventually stops. The local closure target is therefore not a literal dS/CFT correspondence. It is a Noether sea state law that tells when the observer-level fit approaches $w_{\mathrm{eff}} \approx -1$, when it departs from that value, and how those departures remain compatible with redshift, clock-rate, BAO, CMB, and structure-growth benchmarks.

A useful way to keep that comparison disciplined is to make the observer-horizon residual explicit. For a shared Noether sea record $\theta_{\mathrm{sea}}$ and a Physical Observer $O$, define a schematic de Sitter comparison residual
$$
\mathcal{R}_{\mathrm{dS}}^{(O)}(\theta_{\mathrm{sea}})
=
d_H\!\left(H_{\mathrm{eff}}^{\theta},H_{\mathrm{obs}}\right)
+d_w\!\left(w_{\mathrm{eff}}^{\theta},w_{\mathrm{obs}}\right)
+d_\Omega\!\left(\Omega_k^{\theta},\Omega_k^{\mathrm{obs}}\right)
+d_S\!\left(S_{\mathrm{hor}}^{(O),\theta},S_{\mathrm{hor}}^{(O),\mathrm{bench}}\right)
+d_{\mathrm{obs}}\!\left(\mathcal{B}_{\mathrm{SN/BAO/CMB/growth}}^{\theta},\mathcal{B}_{\mathrm{obs}}\right)
$$
The distances here are comparison metrics fixed by the data product being tested, not new ontological variables. The residual passes only when the same $\theta_{\mathrm{sea}}$ accounts for the effective Hubble history, equation-of-state fit, curvature bound, horizon-access entropy, and SN/BAO/CMB/growth records. This keeps de Sitter language as an observer-level benchmark rather than a boundary theory imported into the Euclidean void.

A fitted value $w_{\mathrm{eff}} < -1$ requires special care. In standard perfect-fluid language, persistent phantom behavior threatens the energy-condition and causality assumptions that also protect ordinary horizon and wormhole results. In this framework, such a fit is admissible only if it is an effective transfer signature, for example energy being routed between matter, radiation, black-hole recycling channels, and the slowly varying Noether sea tension sector. It should not be read as permission for acausal propagation or unaccounted energy creation.

### The Cosmological-Constant Problem

#### The Hierarchy as an Ontology Mismatch

In standard QFT, summing zero-point energies of all field modes up to some cutoff $\Lambda_{\mathrm{UV}}$ produces a vacuum energy density

$$
\rho_{\mathrm{vac}}^{\mathrm{QFT}} \sim \frac{\Lambda_{\mathrm{UV}}^4}{\hbar^3 c^5}
$$

which for $\Lambda_{\mathrm{UV}} = M_{\mathrm{Pl}}c$ exceeds the observed $\rho_\Lambda$ by $\sim 120$ orders of magnitude. This is the cosmological-constant problem.

In the $\mathbb{A}\mathbb{A}\mathbb{A}$ framework, the problem is reframed as an ontology mismatch:

- QFT zero-point energies are not physical observables of the Euclidean void (which carries no energy). They are artifacts of the continuum-field approximation applied to a substrate that is fundamentally discrete (point architrinos) and finite (a definite number of Noether braid assemblies per unit volume).
- In the nested shell case, the inner and middle binaries of each Noether braid in the Noether sea store enormous energy densities locally (self-hit regime, $v > c_f$ and $v = c_f$), but this energy is locked into stable, high-frequency orbital modes that do not gravitate as a cosmological constant. Only the slowly varying, large-scale stress from the outer-binary sector contributes to $\rho_{\mathrm{DE,eff}}$.
- The observed smallness of $\rho_\Lambda$ relative to naïve QFT estimates reflects the fact that most internal Noether braid energy is dynamically inert on Hubble timescales—it is shielded by the nested-binary hierarchy, not canceled by fine-tuning.

#### Coupling-Selection Target

The shielding statement is a theorem target. Let $\rho_{\mathrm{locked}}^{\mathrm{inner+middle}}$ denote the internal energy density stored in high-frequency inner and middle Noether sea modes, and let $\rho_{\mathrm{metric}}^{\mathrm{inner+middle}}$ denote the part of that energy exposed to the observer-level metric channel. A viable closure must show

$$
\epsilon_{\mathrm{shield}}
=
\frac{\rho_{\mathrm{metric}}^{\mathrm{inner+middle}}}
{\rho_{\mathrm{locked}}^{\mathrm{inner+middle}}}
\ll 1
$$

while also retaining an exposed slow sector,

$$
\rho_{\mathrm{DE,eff}}
=
\rho_{\mathrm{metric}}^{\mathrm{outer}}
+
\rho_{\mathrm{metric}}^{\mathrm{transport}}
+
O(\epsilon_{\mathrm{shield}}\rho_{\mathrm{locked}}^{\mathrm{inner+middle}})
$$

This separates two claims that are often conflated. The first claim is a shielding claim: large internal energies do not automatically enter the effective cosmological constant. The second is an exposure claim: outer-binary stress, transport history, and validated recycling channels can still contribute to the effective dark-energy sector. Both must be derived from one Noether sea response law; otherwise the proposal merely moves the cosmological-constant fine-tuning into an unaccounted coupling rule.

#### Comparison to Sequestering and Degravitation Proposals

The $\mathbb{A}\mathbb{A}\mathbb{A}$ mechanism is structurally similar to vacuum-energy sequestering proposals (Kaloper & Padilla 2014) in which high-energy modes are dynamically decoupled from the gravitational sector. The key difference is that $\mathbb{A}\mathbb{A}\mathbb{A}$ provides a concrete physical mechanism for the decoupling (nested-binary shielding) rather than imposing it through a global constraint or modified variational principle.

Finite-range gravity and massive-gravity programs are useful here only as comparison frameworks. Their durable lesson is not that the Noether sea should contain a massive graviton, but that any large-scale weakening of gravity must pass a local-recovery gate: solar-system, binary-pulsar, lensing, and gravitational-wave regimes must remain GR-like while a cosmological-scale response is allowed to differ. In $\mathbb{A}\mathbb{A}\mathbb{A}$ terms, that burden belongs to the same Noether sea constitutive map that sets $G_{\text{eff}}$, $\chi_{\text{sea}}$, clock-rate response, and growth history. A degravitation-like dark-energy channel is admissible only if the shielding residual is suppressed at the effective cosmological scale without weakening the already validated weak-field and gravitational-wave channels.

### Redshift as Clock Comparison

#### Mechanism

In the $\mathbb{A}\mathbb{A}\mathbb{A}$ framework, cosmological redshift is not caused by the stretching of space (the void does not stretch). It is read through endpoint clock-cadence comparison, source-branch state, launch geometry, and path-history propagation through the Noether sea:

- A photon-mode assembly emitted at effective cosmic time $\tau_{c,e}$, corresponding to substrate time $t_e$ in the exact record, carries a frequency set by the nested shell braid oscillation rates of the source assembly at that epoch.
- At the reception epoch $\tau_{c,o}$, corresponding to substrate time $t_o$, the observer's local clock rate is set by the current Noether sea state.
- If the Noether sea state has evolved between $t_e$ and $t_o$—specifically, if outer-binary radii have increased and internal frequencies have decreased—then the received frequency can be lower than the emitted frequency after endpoint cadence, launch, source-branch, and path-history factors are separated. This is the operational content of $1 + z = \nu_e/\nu_o$.

The redshift-distance relation $z(d_L)$ encodes the entire history of Noether sea state evolution along the photon's path. In the effective Friedmann description, this is captured by:

$$
d_L(z) = (1+z)\int_0^z \frac{c_0\,dz'}{H(z')}
$$

where $c_0$ is the asymptotic observer-channel speed used in the effective comparison layer. This serves as the effective expansion-history map used by observers.

The native handoff to [Expansion Mechanism](../../../../markdown/aaa/cosmology/expansion-mechanism.md) is more constrained than a raw $z(d_L)$ fit. The dark-energy sector supplies a candidate Noether sea state history that must reproduce the corrected propagation residual $Z_{\mathrm{prop},X}$ after endpoint cadence, source-branch state, and launch geometry have been removed. Its effective $H(z)$ curve is therefore a comparison summary of the same Noether sea state, not an independent expansion of the Euclidean void.

#### Redshift-Transfer Handoff Target

The effective dark-energy sector can enter the redshift-transfer law only through the Noether sea state variables that determine endpoint cadence and propagation. It should not be added as a separate photon-energy loss channel. A scoped handoff target is

$$
\partial_t\boldsymbol{\theta}_\gamma
=
\mathbf{J}_{\mathrm{DE}}
\begin{pmatrix}
\partial_t\ln\rho_{\mathrm{DE,eff}}\\
\partial_t w_{\mathrm{eff}}\\
\mathcal{S}_{\mathrm{sea}}/\rho_{\mathrm{DE,eff}}\\
\mathcal{S}_{\mathrm{BH}}/\rho_{\mathrm{DE,eff}}
\end{pmatrix}
+
\partial_t\boldsymbol{\theta}_{\gamma,\mathrm{local}}
$$

where

$$
\boldsymbol{\theta}_\gamma
\equiv
\left(
\ln\chi_\gamma,\,
\ln n,\,
\ln R_{\text{core}}
\right)
$$

The matrix $\mathbf{J}_{\mathrm{DE}}$ is a constitutive derivative of the Noether sea response law, not a new dark-energy fluid. The residual term $\partial_t\boldsymbol{\theta}_{\gamma,\mathrm{local}}$ records local environment, source-neighborhood, and calibration effects that must be separated before attributing a redshift-transfer slope to the dark-energy sector.

Inserted into the propagation functional, the dark-energy contribution has the schematic form

$$
\alpha_{\mathrm{prop},X}^{\mathrm{DE}}
=
\frac{1}{c_\gamma}
\begin{pmatrix}
a_\chi^X & a_n^X & a_R^X
\end{pmatrix}
\mathbf{J}_{\mathrm{DE}}
\begin{pmatrix}
\partial_t\ln\rho_{\mathrm{DE,eff}}\\
\partial_t w_{\mathrm{eff}}\\
\mathcal{S}_{\mathrm{sea}}/\rho_{\mathrm{DE,eff}}\\
\mathcal{S}_{\mathrm{BH}}/\rho_{\mathrm{DE,eff}}
\end{pmatrix}
$$

This is a derivation target. It says that $\rho_{\mathrm{DE,eff}}$, $w_{\mathrm{eff}}$, and recycling source terms become observable in redshift only by changing the Noether sea delay, density, or braid-scale state sampled by the photon path. If the same $\mathbf{J}_{\mathrm{DE}}$ cannot also support CMB, BAO, supernova, and growth projections, then the dark-energy handoff has not closed.

#### First-Order Coefficient Packet

For coefficient work, collect the dark-energy-side rate variables into

$$
\mathbf{q}_{\mathrm{DE}}
\equiv
\begin{pmatrix}
q_\rho\\
q_w\\
q_{\mathrm{sea}}\\
q_{\mathrm{BH}}
\end{pmatrix}
=
\begin{pmatrix}
\partial_t\ln\rho_{\mathrm{DE,eff}}\\
\partial_t w_{\mathrm{eff}}\\
\mathcal{S}_{\mathrm{sea}}/\rho_{\mathrm{DE,eff}}\\
\mathcal{S}_{\mathrm{BH}}/\rho_{\mathrm{DE,eff}}
\end{pmatrix}
$$

Each entry has dimensions of inverse time. The matrix $\mathbf{J}_{\mathrm{DE}}$ is therefore dimensionless in the minimal first-order closure, because it maps rate variables in $\mathbf{q}_{\mathrm{DE}}$ to the rate vector $\partial_t\boldsymbol{\theta}_\gamma$. For a clean line family $X$, define the transport-facing coefficient row

$$
\boldsymbol{\lambda}_X^T
\equiv
\begin{pmatrix}
a_\chi^X & a_n^X & a_R^X
\end{pmatrix}
\mathbf{J}_{\mathrm{DE}}
=
\begin{pmatrix}
\lambda_\rho^X & \lambda_w^X & \lambda_{\mathrm{sea}}^X & \lambda_{\mathrm{BH}}^X
\end{pmatrix}
$$

Then the dark-energy contribution to the corrected propagation slope is

$$
\alpha_{\mathrm{prop},X}^{\mathrm{DE}}
=
\frac{1}{c_\gamma}
\boldsymbol{\lambda}_X^T\mathbf{q}_{\mathrm{DE}}
$$

The effective continuity equation already constrains $q_\rho$. In the homogeneous comparison branch,

$$
q_\rho
=
-3H_{\mathrm{eff}}(1+w_{\mathrm{eff}})
+q_{\mathrm{sea}}
+q_{\mathrm{BH}}
$$

where $H_{\mathrm{eff}}$ is the redshift-transfer slope inferred from the same propagation record, not expansion of the Euclidean void. Combining this identity with $H_{\mathrm{eff},X}^{\mathrm{DE}}=c_0\alpha_{\mathrm{prop},X}^{\mathrm{DE}}$ gives the first closed coefficient equation:

$$
H_{\mathrm{eff},X}^{\mathrm{DE}}
=
\frac{
\frac{c_0}{c_\gamma}
\left[
\lambda_w^X\,\partial_t w_{\mathrm{eff}}
+(\lambda_\rho^X+\lambda_{\mathrm{sea}}^X)\frac{\mathcal{S}_{\mathrm{sea}}}{\rho_{\mathrm{DE,eff}}}
+(\lambda_\rho^X+\lambda_{\mathrm{BH}}^X)\frac{\mathcal{S}_{\mathrm{BH}}}{\rho_{\mathrm{DE,eff}}}
\right]
}{
1+3\frac{c_0}{c_\gamma}\lambda_\rho^X(1+w_{\mathrm{eff}})
}
$$

This equation is not yet a measured value of $H_0$. It is the first coefficient closure target for interpreting a Hubble-like slope inside $\mathbb{A}\mathbb{A}\mathbb{A}$: the slope comes from a Noether sea relaxation rate, a line-family transport row, and source terms, with no stretching of the Euclidean void.

The coefficient packet has four immediate checks:

- Static homogeneous limit: if $\mathbf{q}_{\mathrm{DE}}=0$, then $\alpha_{\mathrm{prop},X}^{\mathrm{DE}}=0$.
- Clean-line coherence: for clean photon-channel lines $X$ and $Y$, $\boldsymbol{\lambda}_X^T\mathbf{q}_{\mathrm{DE}}-\boldsymbol{\lambda}_Y^T\mathbf{q}_{\mathrm{DE}}$ must stay below chromaticity tolerance.
- Time-dilation coherence: the same coefficient row must drive frequency shift and packet-cadence stretch in the clean propagation branch.
- Shared-state coherence: the $\mathbf{J}_{\mathrm{DE}}$ used here must also project into the CMB, BAO, supernova, lensing, and growth records without replacing the Noether sea state family by family.

#### Equilibrium Current and Effective Expansion

The equilibrium version of the dark-energy hypothesis refines what the source terms mean. A Noether braid with cadence $\nu_N$ carries the local energy scale

$$
E_N=h\nu_N
$$

Individual Noether braids may change branch through $h$-scale ledger steps. Each accepted step forces a branchwise retuning of cadence and scale variables, not a simple rise in thermodynamic temperature, but a large population can still coarse-grain into a smooth medium response. For the dark-energy module, the relevant object is not a single transition. It is a distribution $f_N(\nu,\mathbf{x},t)$ and its cadence-space current:

$$
\partial_t f_N
+\nabla\cdot(\mathbf{u}_{\mathrm{sea}}f_N)
+\partial_\nu J_\nu
=
S_{\mathrm{BH}}
+S_{\mathrm{GW}}
-R_{\mathrm{eq}}[f_N]
$$

This packet gives a more microscopic reading of $\mathcal{S}_{\mathrm{sea}}$ and $\mathcal{S}_{\mathrm{BH}}$. The term $R_{\mathrm{eq}}[f_N]$ is local neighbor equilibration in the Noether sea, $S_{\mathrm{BH}}$ is loading from strong-field recycling regions, and $S_{\mathrm{GW}}$ is the bounded perturbation from gravitational-wave disturbances. The projection into the redshift handoff should be a constitutive map

$$
\partial_t\boldsymbol{\theta}_\gamma
=
\Pi_\gamma\!\left[f_N,J_\nu,S_{\mathrm{BH}},S_{\mathrm{GW}},R_{\mathrm{eq}}\right]
+\partial_t\boldsymbol{\theta}_{\gamma,\mathrm{local}}
$$

This strengthens the expansion claim and limits it at the same time. If $J_\nu$ vanishes in the homogeneous coarse-grained limit, or if the source and equilibration terms cancel with no signed large-scale current, the equilibrium hypothesis does not generate a dark-energy-like redshift-transfer slope. If a signed current remains, it may contribute to $H_{\mathrm{eff},X}^{\mathrm{DE}}$ only through the same $\boldsymbol{\theta}_\gamma$ variables already used for redshift, CMB, BAO, lensing, and growth. It is therefore a candidate mechanism for the effective expansion history, not a separate expansion of the Euclidean void and not a standalone photon-energy loss channel.

#### Tired-Light Exclusion

This mechanism is distinct from classical tired-light proposals. In tired light, photons lose energy through scattering or absorption, producing:
- Image blurring (not observed),
- Time-dilation violations (SN Ia light curves confirm $\Delta t \propto (1+z)$),
- Modified surface-brightness relations (Tolman test).

The $\mathbb{A}\mathbb{A}\mathbb{A}$ mechanism does not involve untracked photon energy loss in transit. The photon assembly propagates through the Noether sea without degradation in the weak-field, low-density limit; any path-history factor changes the phase-cadence relation later sampled by the receiver rather than acting as generic scattering loss. This reproduces the standard $(1+z)$ time-dilation signature and is consistent with Tolman surface-brightness tests.

### SMBH Recycling and Energy Flow

Supermassive black holes process matter and radiation through their high-energy interiors. In the $\mathbb{A}\mathbb{A}\mathbb{A}$ picture, this recycling has implications for the dark-energy sector:

- **Energy input to the Noether sea.** Jets and radiative outflows from SMBHs inject energy into the surrounding medium, locally exciting outer-binary modes and increasing the Noether sea internal temperature. On galactic and cluster scales, this injection is a source of heating that counteracts the natural cosmological cooling of the medium.
- **Feedback on $w_{\mathrm{eff}}$.** If SMBH energy injection is correlated with structure formation, the effective dark-energy equation of state can carry weak environmental dependence.
- **Backreaction rather than isolation.** The relevant cosmological question is not whether a black hole is an isolated object with a fixed bookkeeping mass, but whether the recycling zone and the ambient Noether sea remain coupled strongly enough for the surrounding Noether sea state to alter what the object contributes at late times.
- **No perpetual motion.** The recycling process does not create energy; it redistributes it. The total energy budget (matter + radiation + medium baseline) is conserved in absolute time. What changes is the partition between locked internal modes and the slowly varying tension sector.

The canonical strong-field and recycling picture is developed in [../spacetime/black-holes.md](../../../../markdown/aaa/spacetime/black-holes.md). The present chapter keeps only the cosmological consequence: whether black-hole processing contributes a measurable source term to the late-time expansion history.

### Cosmological Coupling as a Candidate Dark-Energy Channel

#### What the External Claim Is

A recent observational claim, now part of the comparison landscape for this topic, is that dormant supermassive black holes in old elliptical galaxies may grow more strongly with cosmic time than standard accretion and merger channels predict. In that interpretation, the relevant question is not merely whether black holes grow, but whether the growth tracks the cosmological background in a way that suggests direct coupling to the large-scale Noether sea state.

The usual phenomenological parameterization writes the black-hole mass as

$$
M_{\mathrm{BH}}(a) \propto a^{K}
$$

where $a$ is the effective scale factor and $K$ measures the strength of the proposed cosmological coupling. In the source material motivating this scaffold, the interesting regime is the one in which $K$ is appreciably positive rather than consistent with zero after ordinary astrophysical channels are removed.

#### How $\mathbb{A}\mathbb{A}\mathbb{A}$ Would Read Such a Signal

From the standpoint of $\mathbb{A}\mathbb{A}\mathbb{A}$, a positive coupling of this kind would not be read as black holes creating energy from nothing or as the Euclidean void itself driving mass growth. The relevant interpretation would instead be constitutive: black holes are regions where the Noether sea is driven into the strongest known alignment, compression, and recycling regimes, so they are natural places for energy partition between inner, middle, and outer nested shell braid layers to become macroscopically visible.

That yields a disciplined three-layer reading:

- At the **substrate level**, the Noether sea remains the carrier of the cosmological dynamics.
- At the **strong-field constitutive level**, SMBHs act as high-gradient recycling sites that can shift energy between locked internal modes and outward-propagating medium excitations.
- At the **effective cosmology level**, any residual population-wide black-hole coupling appears only as a contribution to $\rho_{\mathrm{DE,eff}}(z)$ or to the source term $\mathcal{S}_{\mathrm{relax}}$ in the expansion history.

In that reading, the black-hole channel is neither the whole dark-energy story nor a dispensable side note. It is a candidate transport mechanism inside a medium-relaxation cosmology.

#### Minimal Incorporation into the Effective Expansion Law

The conservative way to encode this possibility is to split the effective dark-energy sector into a baseline medium term plus an SMBH-correlated term:

$$
\rho_{\mathrm{DE,eff}}(z)
=
u_{\mathrm{sea,relax}}(z)
+
\rho_{\mathrm{BH,coup}}(z)
$$

The first term is the default Noether sea relaxation channel developed above. The second term is reserved for any statistically supported black-hole population effect that cannot be re-expressed as ordinary heating, accretion history, merger history, or selection bias.

At the same level of description, the source term may be decomposed as

$$
\mathcal{S}_{\mathrm{relax}}
=
\mathcal{S}_{\mathrm{sea}}
+
\mathcal{S}_{\mathrm{BH}}
$$

where $\mathcal{S}_{\mathrm{BH}}$ captures the net transfer from SMBH recycling zones into the slowly varying outer-binary tension sector. The sign and magnitude of $\mathcal{S}_{\mathrm{BH}}$ are empirical questions, not inputs fixed by ontology alone.

This decomposition also clarifies why an effective phantom crossing does not by itself force acausal physics in the local framework. If the dark-energy-like sector is being fed by transfer from another component, then $w_{\mathrm{eff}} < -1$ can appear at the level of the fit while the underlying substrate dynamics remain causal and energy-accounted.

#### Population History Matters

If an SMBH-correlated channel exists, its amplitude cannot depend only on the instantaneous properties of present-day black holes. It must inherit the production and feeding history of the recycling population. In observational practice this often shows up through links to star-formation history, galaxy assembly, compact-object demographics, and host-environment selection. In $\mathbb{A}\mathbb{A}\mathbb{A}$, the deeper statement is that $\mathcal{S}_{\mathrm{BH}}$ depends on the path-history by which matter was routed into strong-field processing sites and then returned, in altered form, to the surrounding medium.

For that reason the black-hole source term should be interpreted schematically as

$$
\mathcal{S}_{\mathrm{BH}}(z)
=
\mathcal{F}\!\left[\mathcal{H}_{\mathrm{form}},\mathcal{H}_{\mathrm{feed}},\mathcal{H}_{\mathrm{release}}\right]
$$

where $\mathcal{H}_{\mathrm{form}}$ denotes the compact-object formation history, $\mathcal{H}_{\mathrm{feed}}$ the inflow history into recycling sites, and $\mathcal{H}_{\mathrm{release}}$ the history of outward channels that load the Noether sea. The point of this notation is conceptual rather than final: any viable black-hole contribution must be history-dependent, not merely appended as a static late-time correction.

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

| Epoch | Noether sea state | Effective $w$ | Dominant mechanism |
|:---|:---|:---|:---|
| Radiation era ($z > 3400$) | Hot, dense; outer binaries contracted | $w_{\mathrm{eff}} \to 0$ (subdominant) | Radiation pressure dominates |
| Matter era ($3400 > z > 0.7$) | Cooling; outer binaries relaxing | $w_{\mathrm{eff}}$ transitions toward $-1$ | Matter density dominates; tension grows |
| Acceleration onset ($z \sim 0.7$) | $\rho_{\mathrm{DE,eff}} \sim \rho_m$ | $w_{\mathrm{eff}} \approx -1$ | Tension becomes dynamically significant; SMBH channel may become non-negligible |
| Present ($z = 0$) | Quasi-equilibrium tension | $w_{\mathrm{eff}} \approx -1$ with possible mild drift | Acceleration established; coupling tests become survey-limited |
| Far future ($z \to -1$) | Full relaxation | $w_{\mathrm{eff}} \to -1$ or evolves | Depends on relaxation endpoint |

The acceleration onset redshift $z \sim 0.7$ is treated as the characteristic crossover of this relaxation model, with timescale set by assembly-scale physics (outer-binary binding energy and Noether sea coupling).

### Expansion-Module Interface

In the modular cosmology architecture, this chapter provides:

- **Output to [expansion-mechanism.md](../../../../markdown/aaa/cosmology/expansion-mechanism.md):** medium-relaxation variables that feed the corrected redshift-transfer curve, plus the comparison $H(z)$ derived from the effective Friedmann equation with $\rho_{\mathrm{DE,eff}}(z)$ and $w_{\mathrm{eff}}(z)$.
- **Output to [CMB.md](../../../../markdown/aaa/cosmology/CMB.md):** late-time ISW contribution and distance to last scattering.
- **Output to [structure-formation.md](../../../../markdown/aaa/cosmology/structure-formation.md):** potential evolution $\dot{\Phi}(z)$ entering the growth equation.
- **Cross-link to [../spacetime/black-holes.md](../../../../markdown/aaa/spacetime/black-holes.md):** strong-field recycling map and the constitutive interpretation of any SMBH population coupling.
- **Input from [dark-matter.md](../../../../markdown/aaa/cosmology/dark-matter.md):** $\Omega_m(z)$ and $G_{\mathrm{eff}}(a,k)$ for consistent Friedmann integration.
- **Input from [BBN-constraints.md](../../../../markdown/aaa/cosmology/BBN-constraints.md):** early-universe constraints ensuring $\rho_{\mathrm{DE,eff}}(z_{\mathrm{BBN}})$ is negligible relative to radiation density.
- **Frame and calibration checks:** supernova directionality, standardization drift, BAO anisotropy, CMB/matter dipole consistency, and local bulk-flow residuals.
- **Ontic variables passed:** $\rho_{\text{NS}}(z)$, $n(z)$, $\chi_{\text{sea}}(z)$, $\langle R_{\mathrm{outer}} \rangle(z)$, $\tau_{\mathrm{relax}}^{\mathrm{outer}}$, $\mathcal{S}_{\mathrm{sea}}(z)$, $\mathcal{S}_{\mathrm{BH}}(z)$.
- **Effective outputs returned:** $w_{\mathrm{eff}}(z)$, $u_{\mathrm{sea,relax}}(z)$, $\rho_{\mathrm{BH,coup}}(z)$, $\rho_{\mathrm{DE,eff}}(z)$, $H(z)$.

All interfaces use the same absolute-time / Euclidean-void substrate and Noether sea state variables, ensuring ontological consistency with other cosmology modules.

### Summary

Late-time accelerated expansion, conventionally attributed to dark energy or a cosmological constant, is interpreted in the architrino assembly architecture as a macroscopic signature of Noether sea relaxation within a fixed Euclidean void:

- The Noether sea carries a baseline energy density set by the binding and oscillation energies of its constituent Noether braids.
- The outer-binary sector of these Noether braids produces an effective tension (negative pressure) as the medium relaxes and outer-binary radii evolve on cosmological timescales.
- Supermassive black holes may supply a secondary transport channel that feeds or modulates that tension sector, but only if the inferred population-level coupling survives ordinary astrophysical explanations.
- When this tension satisfies $w < -1/3$, the effective expansion history shows acceleration.
- The cosmological-constant hierarchy problem is reframed: high-energy internal modes are dynamically shielded from the tension sector by the nested-binary architecture, so the natural scale of $\rho_{\mathrm{DE,eff}}$ is set by outer-binary physics, not by summing all zero-point modes.
- Any acceleration claim must pass frame and calibration gates: direction-dependent supernova residuals, BAO anisotropy, CMB/matter dipole consistency, and host-environment evolution must be either negligible or produced by the same Noether sea response law.

The parameters $w$ and $\Lambda$ remain useful effective descriptors of expansion history, while the mechanistic content resides in the Noether sea constitutive relation, outer-binary dynamics, and any validated SMBH recycling channel. Deriving that constitutive relation from the master equation is the critical open program.

## Structure Formation

This chapter translates standard structure-formation language into medium-and-assembly evolution inside a fixed Euclidean void. Its purpose is to explain how overdensity growth, effective expansion variables, and dark-sector clustering are meant to fit together when the Noether sea replaces metric expansion as the underlying ontology. It should be read as the growth-side continuation of [Cosmology Ontology](../../../../markdown/aaa/cosmology/cosmology-ontology.md), [Expansion Mechanism](../../../../markdown/aaa/cosmology/expansion-mechanism.md), and [Dark Matter](../../../../markdown/aaa/cosmology/dark-matter.md).

### Scope and Physical Picture

Structure formation describes how the nearly homogeneous early universe developed the web of galaxies, clusters, filaments, and voids observed today. In standard $\Lambda$CDM this story unfolds through gravitational instability of small density perturbations in an expanding Friedmann–Robertson–Walker metric, seeded during inflation and amplified by pressureless cold dark matter that decouples early from the photon–baryon plasma. In the $\mathbb{A}\mathbb{A}\mathbb{A}$ comparison map, the inflation-side predecessor is [Inflation Model](../../../../markdown/aaa/cosmology/inflation-model.md).

The standard term **cosmological void** should be read as a low-galaxy-density region, not as ontological emptiness. Such regions still contain the Noether sea, photon and neutrino transport, sparse hydrogen, and possible rare reaction channels seeded by high-energy photons or other local sources.

In $\mathbb{A}\mathbb{A}\mathbb{A}$ the same phenomenology is reinterpreted as **Noether sea and assembly co-evolution inside a fixed Euclidean void with absolute time**. The Noether sea, the dense coupled population of pro/anti Noether braids, plays the role of the dynamical Noether sea substrate. Matter assemblies, baryonic composites plus any weakly coupled neutral assemblies serving the dark-matter role, are embedded in and coupled to the Noether sea. Growth of overdensities is governed by how the Noether sea transmits effective gravitational influence, how matter assemblies cluster under that influence, and how the Noether sea's own internal energy budget (playing the role of dark energy) modulates the expansion-equivalent dynamics.

No metric expansion of space occurs. The Euclidean void is static. What changes is the **internal state of the Noether sea**: assembly radii, oscillation frequencies, local number density, the Noether sea delay factor $\chi_{\text{sea}}$, and the resulting medium-dressed inertial response. All standard cosmological observables—power spectra, correlation functions, lensing maps—are recast as probes of this Noether sea and assembly history at different scales and epochs.

---

### Effective Perturbation Theory

#### Background Noether Sea State

Define a spatially averaged Noether sea state at absolute time $t$:

- $u_{\text{sea}}(t)$: mean energy density of the Noether sea, distinct from the Noether braid number/mass-density proxy $\rho_{\text{NS}}(\mathbf{x},t)$,
- $\rho_m(t)$: mean energy density of matter assemblies (baryonic + neutral/dark),
- $\bar{\rho}_{\text{NS}}(t)$: mean Noether braid density in physical units,
- $\bar{R}_{\text{core}}(t)$: mean outer-binary radius of Noether braid assemblies in the Noether sea.

An effective Hubble-like parameter $H(t)$ is defined operationally through the rate of change of the Noether sea's bulk properties. Specifically, if one defines an effective scale variable $a(t)$ via the photon redshift relation (the ratio of photon assembly frequencies at emission and reception), then $H = \dot{a}/a$ summarizes how inter-assembly separations evolve as the Noether sea relaxes and dissipates energy. This $H$ is not the expansion rate of space but a bookkeeping variable for the Noether sea's thermodynamic and mechanical evolution.

#### Density Contrast and the Growth Equation

Let $\delta(\mathbf{x}, t) = (\rho_m(\mathbf{x}, t) - \bar{\rho}_m(t))/\bar{\rho}_m(t)$ be the matter density contrast. In the linear regime ($|\delta| \ll 1$), perturbations in the matter field obey an effective second-order equation that can be written in the familiar comparison form:

$$
\ddot{\delta} + 2H(t)\,\dot{\delta} - 4\pi G_{\text{eff}}(t, k)\,\bar{\rho}_m(t)\,\delta = 0
$$

Each symbol carries a specific medium-level meaning:

- **$H(t)$**: the effective damping term arising from Noether sea bulk evolution. As Noether braids in the Noether sea relax energetically (outer binaries expanding, frequencies decreasing), inter-assembly separations grow, diluting the gravitational source density. This acts as a friction-like term on the growth of perturbations, matching the role of the Hubble-like damping term in standard cosmology without identifying ordinary dissipative drag as the mass mechanism.

- **$G_{\text{eff}}(t, k)$**: the effective gravitational coupling, set by how efficiently a local matter overdensity perturbs the surrounding Noether sea and how that perturbation propagates to attract more matter. In $\mathbb{A}\mathbb{A}\mathbb{A}$, $G_{\text{eff}}$ depends on:
  - the local Noether braid density $\bar{\rho}_{\text{NS}}(t)$, which sets Noether sea stiffness,
  - the outer-binary radius $\bar{R}_{\text{core}}(t)$, which controls the compliance of Noether sea assemblies to deformation,
  - potentially the wavenumber $k$, if the Noether sea response becomes scale-dependent at wavelengths comparable to internal assembly scales or at the transition between linear and self-hit regimes.
  The weak-field constitutive map behind this is the same one organized in [Emergent Metric](../../../../markdown/aaa/spacetime/emergent-metric.md).

- **$\bar{\rho}_m(t)$**: the mean matter density, including baryonic assemblies and any weakly coupled neutral assemblies (the dark-matter sector; see interface with [dark-matter.md](../../../../markdown/aaa/cosmology/dark-matter.md)).

**Mechanism for the source term.** A local matter overdensity increases the density of architrino assemblies in that region. The additional delayed causal flux emitted by these assemblies modifies the local Noether sea delay factor $\chi_{\text{sea}}$, slowing signal propagation and deepening the effective potential well. At substrate level this is not set by inverse-square dilution alone: the received flux is also Jacobian-weighted, so local branch geometry and source motion can bunch or dilute the effective gravitational signal. Surrounding matter assemblies, following geodesics of the emergent metric (equivalently, responding to the gradient of the effective potential), drift inward. This positive feedback loop is gravitational instability, recast as medium-response dynamics.

**Where the equation is valid.** This growth equation holds in the regime where:
- perturbations are small ($|\delta| \ll 1$),
- the wavelength of perturbations is much larger than the nested shell braid scale,
- the Noether sea response is quasi-static (perturbation timescale $\gg$ internal nested shell braid oscillation period),
- no internal velocity component of the matter assemblies approaches $c_f$ (the self-hit regime is not triggered by the perturbation dynamics themselves).

**What breaks outside that regime.** At $|\delta| \sim 1$ (turnaround and collapse), the linear equation fails and must be replaced by the full nonlinear medium response—analogous to N-body or hydrodynamic treatment in standard cosmology. At very small scales, the finite size of Noether braid assemblies and the discreteness of the Noether sea introduce a physical cutoff; the continuum growth equation is not valid below the mean inter-assembly spacing. At extremely high densities (approaching conditions near a maximum-curvature object), the self-hit regime is entered, Jacobian anisotropies become large, and the effective $G$ itself changes qualitatively.

#### The Growth Factor

Define the linear growth factor $D(t)$ as the growing-mode solution of the perturbation equation, normalized so that $\delta(\mathbf{x}, t) = D(t)\,\delta_0(\mathbf{x})$ in the linear regime. In standard cosmology:

$$
D(a) \propto H(a) \int_0^a \frac{da'}{[a' H(a')]^3}
$$

Within $\mathbb{A}\mathbb{A}\mathbb{A}$ the same integral structure holds, with $H(a)$ and $G_{\text{eff}}$ determined by the Noether sea equation of state. The growth rate $f(a) = d\ln D / d\ln a$ is a direct observable (via redshift-space distortions) and provides a clean test:

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

#### Component Transfer and Free-Streaming Interface

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
\int_0^{t_{\mathrm{eq}}^\theta}
\frac{v^\theta(t)}{a_\theta(t)}\,dt
\approx
1.2\,\mathrm{Mpc}
\left(\frac{1\,\mathrm{keV}}{m_s^\theta}\right)
\left(\frac{\langle p/T\rangle_\theta}{3.15}\right)
$$
The key variable is not mass alone but the momentum distribution inherited from the production channel. A branch that changes $\langle p/T\rangle_\theta$, $f_\nu^\theta$, or $\lambda_{\mathrm{FS}}^\theta$ independently of its BBN and CMB records has split the shared cosmology state.

#### Linear and Nonlinear Dark-Sector Split

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

where $\Pi_{\mathrm{lin}}\theta_{\mathrm{sea}}$ supplies $P(k,z)$, $D(z,k)$, $C_L^{\phi\phi}$, and $f\sigma_8$, while $\Pi_{\mathrm{nl}}\theta_{\mathrm{sea}}$ supplies the radial-acceleration relation, cluster hydrostatic profiles, and rotation-curve residuals. A compact split residual is

$$
\mathcal{R}_{\mathrm{lin/nl}}(\theta_{\mathrm{sea}})
=
\mathcal{R}_{P,D,C_L,f\sigma_8}(\Pi_{\mathrm{lin}}\theta_{\mathrm{sea}})
+
\mathcal{R}_{\mathrm{RAR/cl/rot}}(\Pi_{\mathrm{nl}}\theta_{\mathrm{sea}})
+
\lambda_{\mathrm{split}}
d_{\mathrm{shared}}\!\left(
\Pi_{\mathrm{lin}}\theta_{\mathrm{sea}},
\Pi_{\mathrm{nl}}\theta_{\mathrm{sea}}
\right)
$$

The last term is the important one. It prevents the model from behaving like CDM in the linear packet and like a separate modified-gravity theory in the nonlinear packet unless both projections come from the same Noether sea state and neutral-assembly state. This also protects the $S_8$ discussion: late-time growth suppression may be allowed, but it must not erase the linear-regime matter loading that fixes the CMB and equality-scale transfer function.

---

### Matter Content and the Dark Sector

#### Baryonic Assemblies

Baryons (protons, neutrons, and their composites) are Noether braid assemblies with specific axial patterns. Their clustering behavior is governed by the effective growth equation above, modified by pressure support (thermal motion) and radiative cooling. Before recombination, baryonic assemblies are tightly coupled to photon-channel packets carried by coaxial contra-rotating pro/anti planar pairs propagating through the Noether sea, producing acoustic oscillations. After decoupling, baryons fall into potential wells already established by the dark sector.

#### Neutral Assemblies (Dark-Matter Candidates)

$\mathbb{A}\mathbb{A}\mathbb{A}$ admits multiple dark-matter scenarios (detailed in [dark-matter.md](../../../../markdown/aaa/cosmology/dark-matter.md)). For structure formation the relevant properties are:

- **Coupling to the Noether sea**: dark-matter assemblies must couple gravitationally (through the Noether sea) but not electromagnetically (no net charge, minimal dipole coupling). Neutral Noether braid configurations with balanced axial layers (analogous to neutrino-like assemblies but more massive and stable) satisfy this requirement.
- **Thermal history**: if produced thermally in the early medium, their relic abundance and free-streaming length determine the small-scale cutoff of the matter power spectrum. Cold (non-relativistic at decoupling) neutral assemblies reproduce CDM-like behavior; warm candidates (lighter, with residual thermal velocity) suppress small-scale power.
- **Self-interaction**: if neutral assemblies interact among themselves through residual short-range forces (e.g., van der Waals-like wake overlap at close range), this modifies halo profiles at small scales—a potential handle on the core-cusp and too-big-to-fail problems.

The effective growth equation accommodates both CDM-like and self-interacting scenarios through the form of $G_{\text{eff}}(t,k)$ and any additional pressure or viscosity terms.

#### Medium Energy (Dark-Energy Role)

The baseline energy density of the Noether sea ($u_{\text{sea}}$) acts as an effective cosmological constant or dark energy. Its contribution enters the effective Hubble-like term $H(t)$. If the Noether sea has internal equation of state is $w_{\text{sea}} \approx -1$ (the Noether braids in the Noether sea resist compression, exerting negative effective pressure), the late-time acceleration of the effective expansion follows directly. Any evolution of $w_{\text{sea}}(t)$ from slow Noether sea thermodynamic relaxation produces a dynamical dark-energy signature testable against supernova and BAO data.

---

### Observational Readout Domains

Structure formation in this framework is a single coupled medium-and-assembly history. Different observational probes sample different scales and epochs of that history:

#### Galaxy Rotation Curves

Flat rotation curves require either a dark-matter halo or a modified gravitational response at low accelerations. In the Noether sea picture:
- A halo of weakly coupled neutral assemblies reproduces standard NFW-like profiles.
- Alternatively, if $G_{\text{eff}}$ develops scale dependence at galactic scales (from nonlinear medium response at low density gradients), MOND-like behavior emerges without particle dark matter.
- The Bullet Cluster and similar offset systems provide a high-pressure inference gate rather than a one-image ontological proof. If an ensemble of cluster-offset reconstructions robustly requires lensing mass separated from the baryonic gas under the same lensing priors, gas dynamics, and shared Noether sea state record, then pure medium-modification scenarios fail and a collisionless neutral-assembly component is required.

#### Cluster Mass Profiles

Clusters probe the intermediate regime ($\sim 1$–$10$ Mpc) where both thermal gas (X-ray) and gravitational lensing provide independent mass estimates. Consistency between hydrostatic and lensing masses constrains any scale dependence in $G_{\text{eff}}$ at cluster scales.

#### Cosmic Shear and $S_8$

Weak gravitational lensing measures the integrated matter power spectrum weighted by the lensing kernel. The $S_8 = \sigma_8 \sqrt{\Omega_m / 0.3}$ parameter family directly constrains the amplitude of linear growth at low redshift. In the Noether sea picture:
- $\sigma_8$ is the rms matter fluctuation at $8\,h^{-1}$ Mpc, computed from the growth factor $D(t)$ and the primordial spectrum.
- Consistency between CMB-inferred $S_8$ (high-$z$ prediction evolved to $z=0$) and direct low-$z$ lensing measurement is a stringent test. Current data suggest mild tension ($S_8^{\text{CMB}} > S_8^{\text{lensing}}$ at $\sim 2$–$3\sigma$).
- If $G_{\text{eff}}$ weakens at late times relative to its early-universe value (because the Noether sea stiffens as it cools), the predicted $S_8$ at low $z$ drops, potentially resolving the tension. This is a concrete, testable prediction of Noether sea-evolution cosmology.

#### CMB Lensing and Acoustic Peaks

The CMB power spectrum encodes the primordial perturbation spectrum processed through the photon–baryon–medium system before decoupling. The acoustic peak positions fix the sound horizon at recombination; the peak heights constrain the matter-to-radiation ratio and the baryon-to-dark-matter ratio. CMB lensing (the smoothing of peaks at high $\ell$) probes the integrated matter distribution between the last-scattering surface and the observer.

The growth module provides:
- the matter power spectrum $P(k, z)$ that determines the lensing potential $C_\ell^{\phi\phi}$,
- the growth history $D(z)$ that sets the amplitude of the lensing signal,
- any anomalous scale dependence in $G_{\text{eff}}$ that would shift the lensing amplitude relative to the $\Lambda$CDM prediction (interface with [CMB.md](../../../../markdown/aaa/cosmology/CMB.md)).

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

Pre-BBN comparison branches enter structure formation only through the transfer record they leave behind. For any branch $X$ retained by [Inflation Model](../../../../markdown/aaa/cosmology/inflation-model.md#pre-bbn-comparison-gate) and [BBN Constraints](../../../../markdown/aaa/cosmology/BBN-constraints.md#pre-bbn-handoff-gate), the growth-side observable is
$$
\Delta P_X(k,z)
=
P(k,z\mid \theta_{\mathrm{sea}},\theta_X)
-
P(k,z\mid \theta_{\mathrm{sea}})
$$
This quantity must be evaluated with the same $\theta_{\mathrm{sea}}$ used for BBN, CMB, cluster offsets, weak lensing, and redshift-space distortions. If a weakly coupled component is invisible to light elements only by acquiring a free-streaming length, abundance, or interaction history that later changes independently in $P(k,z)$, $C_L^{\phi\phi}$, or halo statistics, the comparison branch fails the shared-record gate.

#### High-Redshift Structure

Reports of massive, mature galaxies at $z > 10$ (from JWST and successors) test whether the growth history permits sufficient structure formation by early times. In the Noether sea framework:
- If $G_{\text{eff}}$ was larger at early times (medium more compliant when hotter/denser), early structure formation is enhanced relative to standard $\Lambda$CDM—potentially explaining surprisingly massive high-$z$ systems without exotic physics.
- Conversely, if $G_{\text{eff}}$ was constant, the same tension present in standard cosmology persists and must be addressed through astrophysical channels (early star formation efficiency, AGN feedback).

#### Top-Down vs Bottom-Up Discriminator

The framework should be evaluated on whether early-time growth behaves predominantly as hierarchical buildup (bottom-up), fragmentation-dominant assembly (top-down), or a mixed regime across scale and epoch. In practice, this is read from the joint evolution of the high-$z$ halo mass function, merger statistics, and large-scale filament maturity under one calibrated $G_{\text{eff}}(a,k)$ history.

#### Largest Structures

The existence of very large coherent structures (giant arcs, walls, and voids at $\gtrsim 200$ Mpc scales) tests the homogeneity assumption and the age of the universe. In a framework where the Euclidean void is eternal and the Noether sea history may differ from the standard $13.8$ Gyr narrative:
- Effectively unbounded-age scenarios (if the Noether sea has recycled through earlier phases) could accommodate structures requiring longer formation times.
- Finite-age scenarios must demonstrate that the observed structures are statistically compatible with the growth rate permitted by $D(z)$ and $P(k)$.

This is an active test with model-discriminating power, not merely a fitting exercise. A structure-formation run should report the scale-neutral homogeneity residual $\mathcal{R}_{\mathrm{hom}}(\theta_{\mathrm{sea}};L,t)$ defined in [Cosmology Ontology](../../../../markdown/aaa/cosmology/cosmology-ontology.md#inference-dependency-ledger) alongside $P(k,z)$, $D(z)$, lensing summaries, and high-redshift halo statistics. If the matter power spectrum fits but dimensionless pair-separation distributions differ by direction, environment, or source family beyond tolerance, the run has not supplied a single large-scale medium history.

#### Source-History Inversion

Galaxy and AGN environments are also records of source history, not only forward outputs of a growth model. Jet knots, lobes, host-galaxy structure, metallicity gradients, lensing maps, redshift residuals, and the surrounding Noether sea state should constrain the same formation, feeding, and release histories that enter the SMBH source term in [Dark Energy](../../../../markdown/aaa/cosmology/dark-energy.md#population-history-matters).

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

### Scale Dependence of $G_{\text{eff}}$: Mechanism and Regime Map

A key distinguishing feature of the Noether sea-based framework is that $G_{\text{eff}}$ may carry genuine scale (and epoch) dependence arising from the constitutive properties of the Noether sea.

#### Physical Origin

The effective gravitational coupling is set by how efficiently a local overdensity deforms the surrounding Noether sea. At different scales, different medium-response mechanisms dominate:

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
G_{\text{eff}}(a, k) = G_N \bigl[1 + \mu(a, k)\bigr]
$$

where $\mu(a, k)$ is a dimensionless modification function.

#### Linear Constitutive Derivation of $\mu(a,k)$

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

### Growth-Module Interface

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
- [dark-matter.md](../../../../markdown/aaa/cosmology/dark-matter.md): neutral-assembly properties, relic abundance, interaction rates,
- [hubble-s8-tensions.md](../../../../markdown/aaa/cosmology/hubble-s8-tensions.md): $H(z)$, $f\sigma_8(z)$, and tension-resolution diagnostics,
- [CMB.md](../../../../markdown/aaa/cosmology/CMB.md): primordial spectrum inputs, lensing amplitude, acoustic-peak constraints,
- [spacetime/emergent-metric.md](../../../../markdown/aaa/spacetime/emergent-metric.md): the Noether sea state variables from which $G_{\text{eff}}$ is computed.

---

### Synthesis

Structure formation is modeled here as Noether sea response gravitational instability in a fixed Euclidean void, with $H$, $G_{\text{eff}}$, and matter content determined by internal dynamics of architrino assemblies. The practical program is to derive the constitutive coefficients $\{K,S,\zeta_{\text{bulk}},\eta,m_L,g_m\}(a)$, close $\mu(a,k)$ from Noether sea response equations, and propagate the resulting growth history through the coupled cosmology modules.

## Hubble and S8 Tensions

This note frames the $H_0$ and $S_8$ problems as coupled symptoms inside one Noether sea cosmology story rather than as unrelated anomalies. Its purpose is to give the reader a single conceptual entry point before the detailed growth and expansion modules are considered separately.

It is best read together with [Cosmology Ontology](../../../../markdown/aaa/cosmology/cosmology-ontology.md), [Expansion Mechanism](../../../../markdown/aaa/cosmology/expansion-mechanism.md), [Structure Formation](../../../../markdown/aaa/cosmology/structure-formation.md), [CMB](../../../../markdown/aaa/cosmology/CMB.md), [Dark Matter](../../../../markdown/aaa/cosmology/dark-matter.md), and [Dark Energy](../../../../markdown/aaa/cosmology/dark-energy.md).

### Core Idea

This document frames $H_0$ and $S_8$ as linked conceptual problems inside a single cosmological ontology.

### Tension Meanings

- **$H_0$ tension:** disagreement between early-inferred and local-inferred expansion-rate or corrected photon-frequency-transfer-slope estimates.
- **$S_8$ tension:** disagreement between early-inferred and late-inferred structure-growth amplitude.

### $\mathbb{A}\mathbb{A}\mathbb{A}$ Interpretation

- $H_0$ is read through inhomogeneous medium evolution and region-dependent effective histories.
- $S_8$ is read through growth behavior in baryonic and neutral assembly sectors with medium-coupled dynamics.

Operationally, $H_0$ is the present local slope of the corrected redshift-distance transfer map defined in [Expansion Mechanism](../../../../markdown/aaa/cosmology/expansion-mechanism.md#distance-and-effective-hubble-coefficient). It remains a useful comparison coefficient, but in this ontology it measures redshift per Euclidean distance after source, motion, clock-cadence, and path-history corrections, not literal expansion of the Euclidean void.

The Sunyaev-Zeldovich family sharpens why this correction is mandatory. CMB photon frequencies can be shifted by intervening energetic or moving electron populations, so a line-of-sight frequency ratio is not a pure scale-factor readout by itself. The low-redshift slope should therefore be computed from the signed propagation residual

$$
H_{\mathrm{eff},X}(R,\hat{\mathbf{k}})
=
c_0\,
\partial_R Z_{\mathrm{prop},X}(R,\hat{\mathbf{k}})
$$

after endpoint cadence, source-branch changes, and launch geometry are removed. A net positive $\partial_R Z_{\mathrm{prop},X}$ is redward path accumulation; a net negative value is blueward path boosting. Either sign is allowed only when the same Noether sea and photon-exchange ledger also passes the distance, flux, time-dilation, and spectral-coherence checks.

The sharper local object is the directional transfer coefficient

$$
H_{\mathrm{eff},X}(R,\hat{\mathbf{k}})
=
c_0\,\alpha_{R,X}(\hat{\mathbf{k}})
$$

with the next correction governed by the local curvature $\mathcal{K}_X(R,\hat{\mathbf{k}})$ of the corrected log-redshift curve. The $H_0$ tension is therefore not only a disagreement between two scalar estimates. In this ontology it is a question about whether early-inferred and late-inferred pipelines are sampling the same local transfer coefficient, the same higher-order redshift curvature, and the same environment-conditioned Noether sea state record.

For diagnostic use, raw measured redshift should first be converted into the propagation residual

$$
Z_{\mathrm{prop},X}
=
\ln(1+z_X)
-\ln\Gamma_{N,E}
+\ln\Gamma_{N,R}
+\ln B_X(E)
+\ln D_v
$$

so that endpoint cadence, source-branch shifts, and launch motion are not folded into a single apparent $H_0$ offset. Only then should local and early-inferred transfer slopes be compared.

This is conceptually adjacent to inhomogeneous/timescape interpretations, but implemented here through explicit Noether sea state variables and module couplings.

### Unified Mechanism

Both tensions are treated as different projections of one process: non-uniform relaxation of the Noether sea.

For $H_0$:

- early-universe inference samples a comparatively rigid, less-relaxed Noether sea state,
- local ladders sample more relaxed pockets with different clock-rate environments.

For $S_8$:

- baryonic and neutral-assembly sectors do not need to co-evolve identically at late times,
- mild dark-sector drag and partial coupling can suppress growth amplitude without changing the same degree of early-time background history.

So background and growth are connected through shared Noether sea state evolution rather than separate ad hoc corrections.

### Coupled Interpretation Channels

For $H_0$:

- local Noether sea state inhomogeneity (including void-like environments) can bias local-ladder inference relative to early-time inference,
- late-time medium transition channels can shift low-$z$ inference without reintroducing ontology splits.
- a non-zero environment-conditioned scatter in local $H$ inference is expected if Noether sea state gradients are physically relevant.
- a diagnostic expectation is correlation between local inferred-$H$ scatter and bulk-flow/environment anisotropy indicators along the same sightlines.
- the CMB-frame correction used in local-ladder and supernova pipelines must be tested against matter-dipole and bulk-flow residuals rather than assumed to erase all direction dependence.
- the quadratic term in the local redshift-transfer curve should be fitted or bounded before a local distance-ladder slope is promoted to a universal coefficient.

For $S_8$:

- scale-dependent medium response and partial sector coupling can reduce late-time growth amplitude,
- growth suppression mechanisms must remain consistent with CMB-derived early-time loading.

### DESI-Era Data-Product Gate

The 2025 DESI first-three-year BAO results strengthen the comparison pressure for time-varying dark-energy fits when BAO measurements are combined with CMB, supernova, and weak-lensing data. DESI has also released first-three-year BAO cosmology chains and supporting products in advance of the full public DR2 catalogue, and as of April 2026 DESI has completed the observations for its originally planned five-year survey. The first dark-energy results from the full five-year dataset are expected in 2027. These are data-product signals, not ontology claims. The useful requirement is to preserve the separable observables: BAO distances, supernova residual handling, CMB anchoring, weak-lensing growth, and $f\sigma_8$ growth.

The $\mathbb{A}\mathbb{A}\mathbb{A}$ question is whether one Noether sea history can satisfy
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
without assigning separate Noether sea states to each inference pipeline. If the preferred $w(a)$ trend requires one state for distance data and another for growth, the cosmology branch has only hidden the tension.

This is the local form of the shared calibration gate in [Dark Energy](../../../../markdown/aaa/cosmology/dark-energy.md#inference-dependency-and-calibration-gates). The sets $\mathcal{C}_{H_0}$, $\mathcal{C}_{S_8}$, $\mathcal{C}_{\mathrm{BAO/SN/CMB}}$, and $\mathcal{C}_{\mathrm{growth}}$ should be read as constraints on projections of one $\theta_{\mathrm{sea}}$, not as independent fit islands. A low distance residual paired with an incompatible growth projection is therefore not a win for the Noether sea relaxation interpretation; it is evidence that the interpretation has not yet closed.

The current benchmark family can be summarized as a residual-contract table:

| Observable pressure | Typical data-product comparison | $\mathbb{A}\mathbb{A}\mathbb{A}$ reading |
| --- | --- | --- |
| Early CMB inference | Planck-like base-LambdaCDM inference gives $H_0$ near $67.4\ \mathrm{km\,s^{-1}\,Mpc^{-1}}$ and $\sigma_8$ near $0.81$; ACT DR6 supplies an independent high-resolution spectra and lensing comparison. | The CMB row constrains the effective acoustic, thermalization, damping, and lensing transfer map, not a primitive expanding void. |
| Local distance ladder | SH0ES/Pantheon+-style Cepheid/SN ladders give a local coefficient near $73\ \mathrm{km\,s^{-1}\,Mpc^{-1}}$ with about percent-level uncertainty. | The local coefficient is $H_{\mathrm{eff,ladder}}$, the slope of the corrected redshift-transfer map after source, endpoint, launch, calibration, and path-history terms are separated. |
| BAO standard ruler | DESI BAO rows report $D_M/r_d$, $D_H/r_d$, or $D_V/r_d$ by tracer and effective redshift, with CMB, SN, and weak-lensing combinations testing $w_0w_a$-style extensions. | BAO constrains the joint pair $(D^\theta(z),r_d^\theta)$; changing the sound-ruler calibration for CMB while changing the propagation map for BAO is a shared-state failure. |
| Late growth | DES Year-3 3$\times$2pt weak-lensing and clustering analyses give an $S_8$ value below the Planck-inferred value, while RSD and lensing rows probe $f\sigma_8$ and growth response. | $S_8$ is a growth projection of $\theta_{\mathrm{sea}}$. It must remain compatible with CMB lensing and BAO distances, not merely lower the late-time amplitude. |
| Euclid readiness | Euclid Q1 is public but not a cosmology release; major public cosmology products depend on later releases. | Current Euclid use is packet-readiness: masks, catalogues, spectroscopy, photo-$z$, and future covariance shape. It is not yet a public $S_8$ or BAO residual row. |

This table fixes the claim level. The benchmark values are observer-level comparison coordinates in LambdaCDM-era pipelines. They are useful because they force the medium-relaxation proposal to match early spectra, low-redshift slopes, standard rulers, and late growth with one shared state; they are not direct measurements of substrate expansion.

The corresponding DESI-era distance-growth score should keep the BAO ruler visible:

$$
\mathcal{R}_{\mathrm{DESI}\text{-}\mathrm{era}}(\theta_{\mathrm{sea}})
=
\mathcal{R}_{\mathrm{CMB}}(\theta_{\mathrm{sea}})
+\sum_i
\left\|
\mathbf C_{\mathrm{BAO},i}^{-1/2}
\left[
\mathbf b_{\mathrm{BAO}}^\theta(z_i)
-
\mathbf b_{\mathrm{BAO}}^{\mathrm{obs}}(z_i)
\right]
\right\|^2
+\mathcal{R}_{\mathrm{SN/H_0}}(\theta_{\mathrm{sea}})
+\mathcal{R}_{\mathrm{growth}}(\theta_{\mathrm{sea}})
+\lambda_{\mathrm{split}}\mathcal{P}_{\mathrm{proj}}
$$

Here $\mathbf b_{\mathrm{BAO}}(z_i)$ contains the reported subset of $D_M/r_d$, $D_H/r_d$, and $D_V/r_d$ for each tracer bin. The last term is not optional bookkeeping. It prevents a branch from fitting a DESI-like distance trend, a Planck-like CMB anchor, and a DES-like growth amplitude by using three incompatible Noether sea projections.

### Dipole and Bulk-Flow Diagnostic

The same Noether sea relaxation model that shifts local $H$ inference should also predict where directional residuals appear. A compact test is to compare the line-of-sight Hubble residual with the matter-dipole residual from source catalogues:

$$
\mathcal{R}_{H,D}(z)
=
\operatorname{corr}_{\hat{\mathbf{n}}}
\left(
\delta H(z,\hat{\mathbf{n}}),
\hat{\mathbf{n}}\cdot\Delta_{\mathrm{dip}}^{X}
\right)
$$

Here $\delta H(z,\hat{\mathbf{n}})$ is the directional departure from an isotropic inferred transfer slope, and $\Delta_{\mathrm{dip}}^{X}$ is the source-catalogue dipole residual defined in [CMB](../../../../markdown/aaa/cosmology/CMB.md). Operationally, the Hubble residual should be computed from corrected propagation slopes, for example

$$
\delta H_X(z,\hat{\mathbf{n}})
=
c_0
\left(
\alpha_{\mathcal{E},X}(z,\hat{\mathbf{n}})
-\bar\alpha_X(z)
\right)
$$

after source, endpoint, and launch factors have been removed. The expected sign and scale of $\mathcal{R}_{H,D}$ must come from the same Noether sea density, delay, and flow variables used by the expansion and growth modules. If the correlation is absent after known survey systematics are controlled, the local-environment explanation for $H_0$ loses support. If the correlation exists but requires a different Noether sea state from the one used for CMB, BAO, or growth, the cosmology branch has split its ontology and fails the shared-closure requirement.

The operational version of this diagnostic is the frame-split packet in [Cosmology Shared Residual Fit Protocol](../../../../markdown/aaa/validation/simulations/cosmology-shared-residual-fit.md#frame-split-measurement-recipe), where local $H_0$ scatter is tested beside CMB, matter-dipole, supernova, and BAO directional rows.

### Distance-Growth Coupling Residual

The $H_0$ and $S_8$ tests should share the same effective distance and growth coefficients. For the low-redshift distance side, retain the expansion
$$
d_L(z)
=
\frac{c_0}{H_{0,\mathrm{eff}}}
\left[
z+\frac12(1-q_{0,\mathrm{eff}})z^2+O(z^3)
\right]
$$
where $H_{0,\mathrm{eff}}$ and $q_{0,\mathrm{eff}}$ are coefficients of the corrected redshift-transfer map. For the growth side, retain
$$
f\sigma_8(z,k)
=
\frac{d\ln D(z,k)}{d\ln a_{\mathrm{eff}}}\,
\sigma_8(z,k),
\qquad
S_8=\sigma_8\sqrt{\Omega_m/0.3}
$$
A compact shared-state diagnostic is
$$
\mathcal{R}_{H_0S_8}(\theta_{\mathrm{sea}})
=
\mathcal{R}_{d_L}(\theta_{\mathrm{sea}})
+\mathcal{R}_{f\sigma_8}(\theta_{\mathrm{sea}})
+\lambda_{\mathrm{shared}}
d_{\mathrm{shared}}\!\left(
\Pi_{\mathrm{dist}}\theta_{\mathrm{sea}},
\Pi_{\mathrm{growth}}\theta_{\mathrm{sea}}
\right)
$$
A distance improvement that raises the shared-state penalty or worsens $f\sigma_8$ is therefore not a resolution of the tension pair. It is a sign that the fit has separated the background and growth projections.

### Low-Acceleration Scale Coupling

MOND-like comparison models often expose a numerical proximity between a galaxy acceleration scale and an effective Hubble scale. In this ontology that proximity is not a derivation. It becomes useful only when it is tested as a shared Noether sea projection connecting distance transfer, growth, and nonlinear dark-sector response.

Let $a_\star(E)$ denote the observer-level acceleration transition extracted from environment class $E$, such as disc galaxies or clusters. Let $H_{\mathrm{eff}}^\theta(t)$ be the corrected redshift-transfer coefficient from the same Noether sea state record. A minimal coupling diagnostic is

$$
\mathcal{R}_{aH}(\theta_{\mathrm{sea}})
=
\sum_E
\left|
\log
\frac{
a_\star(E)
}{
\alpha_E c_0 H_{\mathrm{eff}}^\theta(t_E)
}
\right|
+
\lambda_H\mathcal{R}_{H_0S_8}(\theta_{\mathrm{sea}})
+
\lambda_{\mathrm{cl}}\mathcal{R}_{\mathrm{cl/gal}}(\theta_{\mathrm{sea}})
$$

where $\alpha_E$ is a declared comparison coefficient rather than a fitted afterthought. The cluster-versus-galaxy term $\mathcal{R}_{\mathrm{cl/gal}}$ records whether the same Noether sea state explains any required difference between galaxy-scale and cluster-scale acceleration thresholds. A branch that fits galaxy rotation curves with one $a_\star$, cluster gas with another, and the $H_0/S_8$ pair with a third effective history has not linked the tensions; it has split the Noether sea record.

### Cross-Module Interface

In the modular cosmology map, this document is the coupling layer between:

- expansion-module outputs ([expansion-mechanism.md](../../../../markdown/aaa/cosmology/expansion-mechanism.md)) that shape inferred $H_0$,
- growth-module outputs ([structure-formation.md](../../../../markdown/aaa/cosmology/structure-formation.md)) that shape inferred $S_8$,
- shared Noether sea state variables that keep both readouts in one ontology,
- dipole, bulk-flow, and calibration residuals that test whether the same Noether sea state explains local and early-inferred cosmology.

### Coherent Reading

$H_0$ and $S_8$ are not separate anomalies requiring separate ontologies; they are two observer-level projections of one medium-relaxation and coupling history in $\mathbb{A}\mathbb{A}\mathbb{A}$.

For a broader diagnosis of anomaly clustering versus ontology splitting, compare [Crisis in Physics](../../../../markdown/aaa/philosophy-history/crisis-in-physics.md).
