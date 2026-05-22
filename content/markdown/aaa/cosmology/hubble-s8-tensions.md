# Hubble and $S_8$ Tensions

This note frames the $H_0$ and $S_8$ problems as coupled symptoms inside one Noether-Sea cosmology story rather than as unrelated anomalies. Its purpose is to give the reader a single conceptual entry point before the detailed growth and expansion modules are considered separately.

It is best read together with [Cosmology Ontology](cosmology-ontology.md), [Expansion Mechanism](expansion-mechanism.md), [Structure Formation](structure-formation.md), [CMB](CMB.md), [Dark Matter](dark-matter.md), and [Dark Energy](dark-energy.md).

## Core Idea

This document frames $H_0$ and $S_8$ as linked conceptual problems inside a single cosmological ontology.

## Tension Meanings

- **$H_0$ tension:** disagreement between early-inferred and local-inferred expansion-rate or redshift-transfer-slope estimates.
- **$S_8$ tension:** disagreement between early-inferred and late-inferred structure-growth amplitude.

## $\mathbb{A}\mathbb{A}\mathbb{A}$ Interpretation

- $H_0$ is read through inhomogeneous medium evolution and region-dependent effective histories.
- $S_8$ is read through growth behavior in baryonic and neutral assembly sectors with medium-coupled dynamics.

Operationally, $H_0$ is the present local slope of the corrected redshift-distance transfer map defined in [Expansion Mechanism](expansion-mechanism.md#distance-and-effective-hubble-coefficient). It remains a useful comparison coefficient, but in this ontology it measures redshift per Euclidean distance after source, motion, clock-cadence, and path-history corrections, not literal expansion of the Euclidean void.

The sharper local object is the directional transfer coefficient

$$
H_{\mathrm{eff},X}(R,\hat{\mathbf{k}})
=
c_0\,\alpha_{R,X}(\hat{\mathbf{k}}),
$$

with the next correction governed by the local curvature $\mathcal{K}_X(R,\hat{\mathbf{k}})$ of the corrected log-redshift curve. The $H_0$ tension is therefore not only a disagreement between two scalar estimates. In this ontology it is a question about whether early-inferred and late-inferred pipelines are sampling the same local transfer coefficient, the same higher-order redshift curvature, and the same environment-conditioned Noether-Sea state record.

For diagnostic use, raw measured redshift should first be converted into the propagation residual

$$
Z_{\mathrm{prop},X}
=
\ln(1+z_X)
-\ln\Gamma_{N,E}
+\ln\Gamma_{N,R}
+\ln B_X(E)
+\ln D_v,
$$

so that endpoint cadence, source-branch shifts, and launch motion are not folded into a single apparent $H_0$ offset. Only then should local and early-inferred transfer slopes be compared.

This is conceptually adjacent to inhomogeneous/timescape interpretations, but implemented here through explicit Noether-Sea state variables and module couplings.

## Unified Mechanism

Both tensions are treated as different projections of one process: non-uniform relaxation of the Noether Sea.

For $H_0$:

- early-universe inference samples a comparatively rigid, less-relaxed Noether-Sea state,
- local ladders sample more relaxed pockets with different clock-rate environments.

For $S_8$:

- baryonic and neutral-assembly sectors do not need to co-evolve identically at late times,
- mild dark-sector drag and partial coupling can suppress growth amplitude without changing the same degree of early-time background history.

So background and growth are connected through shared Noether-Sea state evolution rather than separate ad hoc corrections.

## Coupled Interpretation Channels

For $H_0$:

- local Noether-Sea state inhomogeneity (including void-like environments) can bias local-ladder inference relative to early-time inference,
- late-time medium transition channels can shift low-$z$ inference without reintroducing ontology splits.
- a non-zero environment-conditioned scatter in local $H$ inference is expected if Noether-Sea state gradients are physically relevant.
- a diagnostic expectation is correlation between local inferred-$H$ scatter and bulk-flow/environment anisotropy indicators along the same sightlines.
- the CMB-frame correction used in local-ladder and supernova pipelines must be tested against matter-dipole and bulk-flow residuals rather than assumed to erase all direction dependence.
- the quadratic term in the local redshift-transfer curve should be fitted or bounded before a local distance-ladder slope is promoted to a universal coefficient.

For $S_8$:

- scale-dependent medium response and partial sector coupling can reduce late-time growth amplitude,
- growth suppression mechanisms must remain consistent with CMB-derived early-time loading.

## DESI-Era Data-Product Gate

The 2025 DESI first-three-year BAO results strengthen the comparison pressure for time-varying dark-energy fits when BAO measurements are combined with CMB, supernova, and weak-lensing data. DESI has also released first-three-year BAO cosmology chains and supporting products in advance of the full public DR2 catalogue, and as of April 2026 DESI has completed the observations for its originally planned five-year survey. The first dark-energy results from the full five-year dataset are expected in 2027. These are data-product signals, not ontology claims. The useful requirement is to preserve the separable observables: BAO distances, supernova residual handling, CMB anchoring, weak-lensing growth, and $f\sigma_8$ growth.

The $\mathbb{A}\mathbb{A}\mathbb{A}$ question is whether one Noether-Sea history can satisfy
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
without assigning separate Noether-Sea states to each inference pipeline. If the preferred $w(a)$ trend requires one state for distance data and another for growth, the cosmology branch has only hidden the tension.

This is the local form of the shared calibration gate in [Dark Energy](dark-energy.md#inference-dependency-and-calibration-gates). The sets $\mathcal{C}_{H_0}$, $\mathcal{C}_{S_8}$, $\mathcal{C}_{\mathrm{BAO/SN/CMB}}$, and $\mathcal{C}_{\mathrm{growth}}$ should be read as constraints on projections of one $\theta_{\mathrm{sea}}$, not as independent fit islands. A low distance residual paired with an incompatible growth projection is therefore not a win for the Noether-Sea relaxation interpretation; it is evidence that the interpretation has not yet closed.

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
+\lambda_{\mathrm{split}}\mathcal{P}_{\mathrm{proj}}.
$$

Here $\mathbf b_{\mathrm{BAO}}(z_i)$ contains the reported subset of $D_M/r_d$, $D_H/r_d$, and $D_V/r_d$ for each tracer bin. The last term is not optional bookkeeping. It prevents a branch from fitting a DESI-like distance trend, a Planck-like CMB anchor, and a DES-like growth amplitude by using three incompatible Noether-Sea projections.

## Dipole and Bulk-Flow Diagnostic

The same Noether-Sea relaxation model that shifts local $H$ inference should also predict where directional residuals appear. A compact test is to compare the line-of-sight Hubble residual with the matter-dipole residual from source catalogues:

$$
\mathcal{R}_{H,D}(z)
=
\operatorname{corr}_{\hat{\mathbf{n}}}
\left(
\delta H(z,\hat{\mathbf{n}}),
\hat{\mathbf{n}}\cdot\Delta_{\mathrm{dip}}^{X}
\right).
$$

Here $\delta H(z,\hat{\mathbf{n}})$ is the directional departure from an isotropic inferred transfer slope, and $\Delta_{\mathrm{dip}}^{X}$ is the source-catalogue dipole residual defined in [CMB](CMB.md). Operationally, the Hubble residual should be computed from corrected propagation slopes, for example

$$
\delta H_X(z,\hat{\mathbf{n}})
=
c_0
\left(
\alpha_{\mathcal{E},X}(z,\hat{\mathbf{n}})
-\bar\alpha_X(z)
\right),
$$

after source, endpoint, and launch factors have been removed. The expected sign and scale of $\mathcal{R}_{H,D}$ must come from the same Noether-Sea density, delay, and flow variables used by the expansion and growth modules. If the correlation is absent after known survey systematics are controlled, the local-environment explanation for $H_0$ loses support. If the correlation exists but requires a different Noether-Sea state from the one used for CMB, BAO, or growth, the cosmology branch has split its ontology and fails the shared-closure requirement.

The operational version of this diagnostic is the frame-split packet in [Cosmology Shared Residual Fit Protocol](../validation/simulations/cosmology-shared-residual-fit.md#frame-split-measurement-recipe), where local $H_0$ scatter is tested beside CMB, matter-dipole, supernova, and BAO directional rows.

## Distance-Growth Coupling Residual

The $H_0$ and $S_8$ tests should share the same effective distance and growth coefficients. For the low-redshift distance side, retain the expansion
$$
d_L(z)
=
\frac{c_0}{H_{0,\mathrm{eff}}}
\left[
z+\frac12(1-q_{0,\mathrm{eff}})z^2+O(z^3)
\right],
$$
where $H_{0,\mathrm{eff}}$ and $q_{0,\mathrm{eff}}$ are coefficients of the corrected redshift-transfer map. For the growth side, retain
$$
f\sigma_8(z,k)
=
\frac{d\ln D(z,k)}{d\ln a_{\mathrm{eff}}}\,
\sigma_8(z,k),
\qquad
S_8=\sigma_8\sqrt{\Omega_m/0.3}.
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
\right).
$$
A distance improvement that raises the shared-state penalty or worsens $f\sigma_8$ is therefore not a resolution of the tension pair. It is a sign that the fit has separated the background and growth projections.

## Low-Acceleration Scale Coupling

MOND-like comparison models often expose a numerical proximity between a galaxy acceleration scale and an effective Hubble scale. In this ontology that proximity is not a derivation. It becomes useful only when it is tested as a shared Noether-Sea projection connecting distance transfer, growth, and nonlinear dark-sector response.

Let $a_\star(E)$ denote the observer-level acceleration transition extracted from environment class $E$, such as disc galaxies or clusters. Let $H_{\mathrm{eff}}^\theta(t)$ be the corrected redshift-transfer coefficient from the same Noether-Sea state record. A minimal coupling diagnostic is

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
\lambda_{\mathrm{cl}}\mathcal{R}_{\mathrm{cl/gal}}(\theta_{\mathrm{sea}}),
$$

where $\alpha_E$ is a declared comparison coefficient rather than a fitted afterthought. The cluster-versus-galaxy term $\mathcal{R}_{\mathrm{cl/gal}}$ records whether the same Noether-Sea state explains any required difference between galaxy-scale and cluster-scale acceleration thresholds. A branch that fits galaxy rotation curves with one $a_\star$, cluster gas with another, and the $H_0/S_8$ pair with a third effective history has not linked the tensions; it has split the Noether-Sea record.

## Cross-Module Interface

In the modular cosmology map, this document is the coupling layer between:

- expansion-module outputs ([expansion-mechanism.md](./expansion-mechanism.md)) that shape inferred $H_0$,
- growth-module outputs ([structure-formation.md](./structure-formation.md)) that shape inferred $S_8$,
- shared Noether-Sea state variables that keep both readouts in one ontology,
- dipole, bulk-flow, and calibration residuals that test whether the same Noether-Sea state explains local and early-inferred cosmology.

## Coherent Reading

$H_0$ and $S_8$ are not separate anomalies requiring separate ontologies; they are two observer-level projections of one medium-relaxation and coupling history in $\mathbb{A}\mathbb{A}\mathbb{A}$.

For a broader diagnosis of anomaly clustering versus ontology splitting, compare [Crisis in Physics](../philosophy-history/crisis-in-physics.md).
