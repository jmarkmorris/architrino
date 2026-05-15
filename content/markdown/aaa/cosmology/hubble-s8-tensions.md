# Hubble and $S_8$ Tensions

This note frames the $H_0$ and $S_8$ problems as coupled symptoms inside one cosmological medium story rather than as unrelated anomalies. Its purpose is to give the reader a single conceptual entry point before the detailed growth and expansion modules are considered separately.

It is best read together with [Cosmology Ontology](cosmology-ontology.md), [Expansion Mechanism](expansion-mechanism.md), [Structure Formation](structure-formation.md), [CMB](CMB.md), [Dark Matter](dark-matter.md), and [Dark Energy](dark-energy.md).

## Core Idea

This document frames $H_0$ and $S_8$ as linked conceptual problems inside a single cosmological ontology.

## Tension Meanings

- **$H_0$ tension:** disagreement between early-inferred and local-inferred expansion rates.
- **$S_8$ tension:** disagreement between early-inferred and late-inferred structure-growth amplitude.

## $\mathbb{A}\mathbb{A}\mathbb{A}$ Interpretation

- $H_0$ is read through inhomogeneous medium evolution and region-dependent effective histories.
- $S_8$ is read through growth behavior in baryonic and neutral assembly sectors with medium-coupled dynamics.

This is conceptually adjacent to inhomogeneous/timescape interpretations, but implemented here through explicit Noether-Sea state variables and module couplings.

## Unified Mechanism

Both tensions are treated as different projections of one process: non-uniform relaxation of the Noether Sea.

For $H_0$:

- early-universe inference samples a comparatively rigid, less-relaxed medium state,
- local ladders sample more relaxed pockets with different clock-rate environments.

For $S_8$:

- baryonic and neutral-assembly sectors do not need to co-evolve identically at late times,
- mild dark-sector drag and partial coupling can suppress growth amplitude without changing the same degree of early-time background history.

So background and growth are connected through shared medium-state evolution rather than separate ad hoc corrections.

## Coupled Interpretation Channels

For $H_0$:

- local medium-state inhomogeneity (including void-like environments) can bias local-ladder inference relative to early-time inference,
- late-time medium transition channels can shift low-$z$ inference without reintroducing ontology splits.
- a non-zero environment-conditioned scatter in local $H$ inference is expected if medium-state gradients are physically relevant.
- a diagnostic expectation is correlation between local inferred-$H$ scatter and bulk-flow/environment anisotropy indicators along the same sightlines.
- the CMB-frame correction used in local-ladder and supernova pipelines must be tested against matter-dipole and bulk-flow residuals rather than assumed to erase all direction dependence.

For $S_8$:

- scale-dependent medium response and partial sector coupling can reduce late-time growth amplitude,
- growth suppression mechanisms must remain consistent with CMB-derived early-time loading.

## DESI-Era Data-Product Gate

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

## Dipole and Bulk-Flow Diagnostic

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

Here $\delta H(z,\hat{\mathbf{n}})$ is the directional departure from an isotropic inferred expansion rate, and $\Delta_{\mathrm{dip}}^{X}$ is the source-catalogue dipole residual defined in [CMB](CMB.md). The expected sign and scale of $\mathcal{R}_{H,D}$ must come from the same Noether-Sea density, delay, and flow variables used by the expansion and growth modules. If the correlation is absent after known survey systematics are controlled, the local-environment explanation for $H_0$ loses support. If the correlation exists but requires a different medium state from the one used for CMB, BAO, or growth, the cosmology branch has split its ontology and fails the shared-closure requirement.

## Cross-Module Interface

In the modular cosmology map, this document is the coupling layer between:

- expansion-module outputs ([expansion-mechanism.md](./expansion-mechanism.md)) that shape inferred $H_0$,
- growth-module outputs ([structure-formation.md](./structure-formation.md)) that shape inferred $S_8$,
- shared medium-state variables that keep both readouts in one ontology,
- dipole, bulk-flow, and calibration residuals that test whether the same medium state explains local and early-inferred cosmology.

## Coherent Reading

$H_0$ and $S_8$ are not separate anomalies requiring separate ontologies; they are two observer-level projections of one medium-relaxation and coupling history in $\mathbb{A}\mathbb{A}\mathbb{A}$.

For a broader diagnosis of anomaly clustering versus ontology splitting, compare [Crisis in Physics](../philosophy-history/crisis-in-physics.md).
