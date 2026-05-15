# Cosmology Shared Residual Fit Protocol

This protocol turns the shared calibration gate in [Dark Energy](../../cosmology/dark-energy.md#inference-dependency-and-calibration-gates) into a first machine-checkable validation scaffold. Its purpose is narrow: test whether supernova, BAO, CMB, weak-lensing, redshift-space-distortion, and BBN comparison packets can consume one shared Noether-Sea state record without silently replacing the state per observable family.

This is not a cosmological parameter fit and not an empirical claim. The first runtime artifact is a mock packet that fixes the object shape, residual accounting, projection-penalty semantics, gates, and failure codes that a real survey-facing packet must later populate.

## Residual Object

Let

$$
\mathcal{X}_{\mathrm{cos}}
=
\{\mathrm{SN},\mathrm{BAO},\mathrm{CMB},\mathrm{WL},\mathrm{RSD},\mathrm{BBN}\}.
$$

For each family $X\in\mathcal{X}_{\mathrm{cos}}$, the packet records a residual vector $r_X$, a covariance object $C_X$, nuisance/calibration context $\nu_X$, and a projection $\Pi_X\theta_{\mathrm{sea}}$ of the shared medium-state record into that family. The scaffold computes

$$
\mathcal{R}_X
=
r_X(\theta_{\mathrm{sea}},\nu_X)^T
C_X^{-1}
r_X(\theta_{\mathrm{sea}},\nu_X),
$$

and the cross-family projection penalty

$$
\mathcal{P}_{XY}
=
\sum_{a\in K_X\cap K_Y}
w_a
\left(
(\Pi_X\theta_{\mathrm{sea}})_a
-
(\Pi_Y\theta_{\mathrm{sea}})_a
\right)^2,
$$

where $K_X$ is the set of shared comparison coordinates reported by family $X$, and $w_a$ is a declared dimensionless weight. The packet-level residual is

$$
\mathcal{R}_{\mathrm{shared}}
=
\sum_{X\in\mathcal{X}_{\mathrm{cos}}}
\mathcal{R}_X
\;+\;
\lambda
\sum_{X<Y}
\mathcal{P}_{XY}.
$$

A low value of the first term alone is insufficient. The second term is the split-ontology guard: it rejects a fit that keeps each observable close to its benchmark only by assigning mutually incompatible projections of $\theta_{\mathrm{sea}}$.

## Packet Schema

The runtime packet should preserve this shape even when a later empirical packet replaces the mock values:

| Field | Required content | Promotion role |
| --- | --- | --- |
| `metadata` | run identifier, source commit when available, input provenance, fit family, and declared comparison level | makes the packet reproducible |
| `required_families` | required observable families, defaulting to `SN`, `BAO`, `CMB`, `WL`, `RSD`, and `BBN` | prevents cherry-picking a subset of cosmology constraints |
| `theta_sea` | shared dimensionless state record used by all projections | names the single medium-state candidate under test |
| `observables` | one row per family with residual vector, covariance, nuisance/calibration note when available, and projection coordinates | supplies $\mathcal{R}_X$ and $\Pi_X\theta_{\mathrm{sea}}$ |
| `projection_weights` | dimensionless weights $w_a$ for common projection coordinates | makes the split penalty explicit rather than rhetorical |
| `lambda` | nonnegative coefficient multiplying the projection penalty | controls how strongly shared-state incompatibility is penalized |
| `thresholds` | predeclared maxima for ordinary residuals, raw projection penalty, shared residual, and projection overlap | prevents post-fit gate selection |
| `gates` | pass/fail records for coverage, residual total, projection penalty, projection overlap, and total shared residual | turns the comparison into an auditable decision surface |
| `failure_code` | null on pass, otherwise the first failed gate | gives follow-up work a stable repair target |

The current mock packet uses normalized comparison coordinates such as `H_norm`, `w_eff`, `n`, `chi_sea`, `G_growth`, and `Y_BBN`. These are not new ontology. They are dimensionless placeholders for observer-level expansion, equation-of-state, normalized Noether-core density, Noether-Sea delay, growth-response, and BBN-yield comparison channels.

## Runtime Artifact

The first scaffold is:

```text
node scripts/cosmology/shared-residual-fit.mjs --pretty
```

It consumes:

```text
scripts/cosmology/shared-residual-mock.json
```

and emits a JSON result with this shape:

| Output field | Meaning |
| --- | --- |
| `residual_terms` | computed $\mathcal{R}_X$ for each observable family |
| `projection_penalties` | all pairwise $\mathcal{P}_{XY}$ terms, including shared keys and per-key contributions |
| `totals.observable_residual` | $\sum_X\mathcal{R}_X$ |
| `totals.projection_penalty_raw` | $\sum_{X<Y}\mathcal{P}_{XY}$ |
| `totals.projection_penalty_weighted` | $\lambda\sum_{X<Y}\mathcal{P}_{XY}$ |
| `totals.shared_residual` | full $\mathcal{R}_{\mathrm{shared}}$ |
| `gates` | coverage, residual, projection, overlap, and total shared-residual pass/fail records |
| `failure_code` | `observable-coverage-open`, `residual-total-open`, `projection-penalty-open`, `projection-overlap-open`, `shared-residual-open`, or null |

The mock packet is deliberately small enough to inspect by hand. A real packet should replace the dimensionless residual entries with survey-derived residual vectors and covariance matrices, but it should keep the same gate shape unless this protocol is explicitly revised.

## Acceptance Boundary

Passing the mock packet means only that the scaffold computes the intended residual and gate structure. It does not validate dark energy, $H_0$, $S_8$, BBN, CMB, or growth claims.

A real shared-state packet becomes promotable only if:

1. every required observable family is present exactly once;
2. residual vectors and covariance models are stated before fitting;
3. $\Pi_X\theta_{\mathrm{sea}}$ projections share enough coordinates to test compatibility;
4. ordinary residuals stay inside declared tolerance;
5. the projection penalty stays inside declared tolerance;
6. the same $\theta_{\mathrm{sea}}$ also remains compatible with the cosmology sector predicate in [Failure Criteria](../failure-criteria.md#sector-acceptance-sets).

Failure is informative. If the ordinary residual passes but the projection penalty fails, the candidate has fit the data products while splitting the medium-state record. If the projection penalty passes but an observable residual fails, the shared state is coherent but not yet accurate. If coverage fails, the packet is not a cosmology closure artifact.
