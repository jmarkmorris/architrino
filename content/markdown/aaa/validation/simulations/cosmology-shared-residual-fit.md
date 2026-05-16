# Cosmology Shared Residual Fit Protocol

This protocol turns the shared calibration gate in [Dark Energy](../../cosmology/dark-energy.md#inference-dependency-and-calibration-gates) into a first machine-checkable validation scaffold. Its purpose is narrow: test whether supernova, BAO, CMB, weak-lensing, redshift-space-distortion, BBN, and pre-BBN comparison packets can consume one shared Noether-Sea state record without silently replacing the state per observable family.

This is not a cosmological parameter fit and not an empirical claim. The first runtime artifact is a mock packet that fixes the object shape, residual accounting, projection-penalty semantics, gates, and failure codes that a real survey-facing packet must later populate.

## Residual Object

Let

$$
\mathcal{X}_{\mathrm{cos}}
=
\{\mathrm{SN},\mathrm{BAO},\mathrm{CMB},\mathrm{WL},\mathrm{RSD},\mathrm{BBN},\mathrm{PREBBN}\}.
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
| `required_families` | required observable families, defaulting to `SN`, `BAO`, `CMB`, `WL`, `RSD`, `BBN`, and `PRE_BBN` | prevents cherry-picking a subset of cosmology constraints |
| `theta_sea` | shared dimensionless state record used by all projections | names the single medium-state candidate under test |
| `observables` | one row per family with residual vector, covariance, nuisance/calibration note when available, and projection coordinates | supplies $\mathcal{R}_X$ and $\Pi_X\theta_{\mathrm{sea}}$ |
| `projection_weights` | dimensionless weights $w_a$ for common projection coordinates | makes the split penalty explicit rather than rhetorical |
| `lambda` | nonnegative coefficient multiplying the projection penalty | controls how strongly shared-state incompatibility is penalized |
| `thresholds` | predeclared maxima for ordinary residuals, raw projection penalty, shared residual, and projection overlap | prevents post-fit gate selection |
| `gates` | pass/fail records for coverage, residual total, projection penalty, projection overlap, and total shared residual | turns the comparison into an auditable decision surface |
| `failure_code` | null on pass, otherwise the first failed gate | gives follow-up work a stable repair target |

The current mock packet uses normalized comparison coordinates such as `H_norm`, `w_eff`, `n`, `chi_sea`, `G_growth`, `Y_BBN`, `Delta_N_eff`, `lambda_fs`, and `Omega_GW`. These are not new ontology. They are dimensionless placeholders for observer-level expansion, equation-of-state, normalized Noether-core density, Noether-Sea delay, growth-response, BBN-yield, relativistic-species, free-streaming, and stochastic-gravitational-wave comparison channels.

## Pre-BBN Branch Packet

The `PRE_BBN` row is the runtime version of the comparison gate defined in [Inflation Model](../../cosmology/inflation-model.md#pre-bbn-comparison-gate), [BBN Constraints](../../cosmology/BBN-constraints.md#pre-bbn-handoff-gate), [Structure Formation](../../cosmology/structure-formation.md#cmb-lensing-and-acoustic-peaks), and [Gravitational Waves](../../spacetime/gravitational-waves.md#early-universe-stochastic-background-gate). It represents one declared branch $X$ per packet. Multiple candidate branches should be compared by running separate packets or by building an explicitly documented aggregate row, not by hiding several branches inside one unlabeled residual.

The pre-BBN residual vector should preserve the observable/data-product split:
$$
r_{\mathrm{PREBBN}}
=
\left(
\frac{\|\Delta\mathbf{Y}_{\mathrm{BBN}}^X\|}{\epsilon_{\mathrm{BBN}}},
\frac{\|\Delta C_\ell^X\|}{\epsilon_{\mathrm{CMB}}},
\frac{\|\Delta P_X(k,z)\|}{\epsilon_{\mathrm{growth}}},
\sup_f\frac{\Omega_{\mathrm{GW}}^X(f)}{\Omega_{\mathrm{GW}}^{\max}(f)}
\right).
$$
The projection keys should include the ordinary shared cosmology coordinates plus branch-facing coordinates such as `Delta_N_eff`, `lambda_fs`, and `Omega_GW`. The packet passes this subgate only when the ordinary residual $\mathcal{R}_{\mathrm{PREBBN}}$ is small and the projection penalty shows that the same $\theta_{\mathrm{sea}}$ is being consumed by BBN, CMB, growth, and gravitational-wave comparisons.

## Frame-Split Measurement Recipe

The `cosmology.frame_split` witness is the directional subgate for the same shared-state problem. It asks whether the rest-frame correction used for CMB inference can coexist with matter dipoles, supernova residual directionality, BAO anisotropy, and local $H_0$ scatter without giving each family its own hidden frame.

The required frame families are

$$
\mathcal{F}_{\mathrm{frame}}
=
\{\mathrm{CMB},\mathrm{MD},\mathrm{SN},\mathrm{BAO},H_0\},
$$

where $\mathrm{MD}$ denotes matter-dipole catalogues such as radio, infrared, quasar, or galaxy-count samples. Each row must report a measured three-vector $\mathbf{y}_i$, an expected three-vector $\mathbf{m}_i(\theta_{\mathrm{frame}})$ from the declared common frame model, a covariance object $C_i$, calibration or mask context $\nu_i$, and a projection $\Pi_i\theta_{\mathrm{frame}}$ onto shared frame coordinates.

The context $\nu_i$ must distinguish observational provenance from physical residuals. At minimum it should identify the sky mask or footprint, foreground or component-separation recipe when relevant, beam or transfer-function correction, redshift-bin and selection function, standardization or calibration model, covariance construction, and any simulation, mock-catalogue, or machine-learning training source used to estimate significance. These entries do not add another cosmology gate; they prevent a frame residual from being promoted when the mismatch is actually a reduction-pipeline or training-prior artifact.

The preprocessing rules are:

- CMB: $\mathbf{y}_{\mathrm{CMB}}=\mathbf{D}_{\mathrm{CMB}}$ and $\mathbf{m}_{\mathrm{CMB}}$ is the same dipole vector in the declared coordinate convention.
- Matter dipoles: for catalogue $X$, $\mathbf{y}_{\mathrm{MD},X}=\mathbf{D}_X$ and
  $$
  \mathbf{m}_{\mathrm{MD},X}
  =
  K_X(\alpha_X,x_X)\,\mathbf{D}_{\mathrm{CMB}}
  +
  \mathbf{F}_{X}(\theta_{\mathrm{frame}},\nu_X),
  $$
  where $K_X$ is the catalogue kinematic amplification factor and $\mathbf{F}_X$ is the allowed non-kinematic directional residual from the shared frame state and survey context.
- Supernovae: $\mathbf{y}_{\mathrm{SN}}(z_b)$ is the fitted distance-modulus dipole in redshift bin $z_b$, after standardization and host-environment bookkeeping; $\mathbf{m}_{\mathrm{SN}}(z_b)$ is the corresponding shared-frame prediction.
- BAO: $\mathbf{y}_{\mathrm{BAO}}(z_b)$ is the anisotropic BAO-scale dipole or lowest retained directional harmonic in bin $z_b$; $\mathbf{m}_{\mathrm{BAO}}(z_b)$ is the shared-frame prediction in the same basis.
- Local $H_0$: $\mathbf{y}_{H_0}(z_b)$ is the directional local-ladder or low-redshift inferred-$H$ scatter vector; $\mathbf{m}_{H_0}(z_b)$ is the shared-frame prediction after the same peculiar-velocity and environment cuts.

For a packet of rows $i\in I_{\mathrm{frame}}$, the directional residual is

$$
\mathcal{Q}_{\mathrm{frame}}
=
\sum_{i\in I_{\mathrm{frame}}}
\left(\mathbf{y}_i-\mathbf{m}_i\right)^T
C_i^{-1}
\left(\mathbf{y}_i-\mathbf{m}_i\right).
$$

The frame-projection penalty is

$$
\mathcal{P}_{\mathrm{frame}}
=
\sum_{i<j}
\sum_{a\in K_i\cap K_j}
w_a
\left[
(\Pi_i\theta_{\mathrm{frame}})_a
-
(\Pi_j\theta_{\mathrm{frame}})_a
\right]^2,
$$

and the combined frame score is

$$
\mathcal{R}_{\mathrm{frame}}
=
\mathcal{Q}_{\mathrm{frame}}
+
\lambda_{\mathrm{frame}}\mathcal{P}_{\mathrm{frame}}.
$$

The packet also records a direction check for every nonzero row,

$$
\alpha_i
=
\cos^{-1}
\left(
\frac{\mathbf{y}_i\cdot\mathbf{m}_i}
{\|\mathbf{y}_i\|\|\mathbf{m}_i\|}
\right).
$$

Tolerances must be declared before fitting: maximum $\mathcal{Q}_{\mathrm{frame}}$, maximum $\mathcal{P}_{\mathrm{frame}}$, maximum $\mathcal{R}_{\mathrm{frame}}$, minimum shared projection-key overlap, and maximum allowed $\alpha_i$ for nonzero vectors. These tolerances are not universal constants; they belong to the survey packet, covariance construction, redshift binning, and systematics budget.

The falsifiers are concrete:

| Failure code | Meaning |
| --- | --- |
| `frame-split-coverage-open` | At least one required family from $\mathcal{F}_{\mathrm{frame}}$ is absent. |
| `frame-split-residual-open` | The directional residual total exceeds the declared tolerance. |
| `frame-split-projection-open` | Families can fit their own vectors only by using incompatible frame-state projections. |
| `frame-split-projection-overlap-open` | The packet does not share enough projection coordinates to test a common frame. |
| `frame-split-angle-open` | A measured vector points too far away from its expected shared-frame vector. |
| `frame-split-shared-open` | The combined residual-plus-projection score exceeds tolerance. |

Any of these failures activates the witness code `cosmology.frame_split`. Passing the mock gate means only that the packet shape is coherent; a real packet must replace the mock vectors with survey-derived dipoles, covariance matrices, redshift-bin definitions, and nuisance records.

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
| `frame_split` | optional directional frame-consistency result with vector rows, projection penalties, gates, and `cosmology.frame_split` witness status |

The mock packet is deliberately small enough to inspect by hand. A real packet should replace the dimensionless residual entries with survey-derived residual vectors and covariance matrices, but it should keep the same gate shape unless this protocol is explicitly revised.

## Acceptance Boundary

Passing the mock packet means only that the scaffold computes the intended residual and gate structure. It does not validate dark energy, $H_0$, $S_8$, BBN, CMB, or growth claims.

A real shared-state packet becomes promotable only if:

1. every required observable family is present exactly once;
2. residual vectors and covariance models are stated before fitting;
3. $\Pi_X\theta_{\mathrm{sea}}$ projections share enough coordinates to test compatibility;
4. ordinary residuals stay inside declared tolerance;
5. the projection penalty stays inside declared tolerance;
6. any included `frame_split` packet passes coverage, residual, projection, angle, and shared-score gates;
7. the same $\theta_{\mathrm{sea}}$ also remains compatible with the cosmology sector predicate in [Failure Criteria](../failure-criteria.md#sector-acceptance-sets).

Failure is informative. If the ordinary residual passes but the projection penalty fails, the candidate has fit the data products while splitting the medium-state record. If the projection penalty passes but an observable residual fails, the shared state is coherent but not yet accurate. If coverage fails, the packet is not a cosmology closure artifact.
