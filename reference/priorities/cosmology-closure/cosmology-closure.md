# Cosmology Transfer-Function Closure

## Workstream Metadata

- Kind: `deferred-priority`
- Rank: `17`
- Value: `4.91`
- Cost: `6.9`
- ROI: `0.71`
- Status: `deferred`

## Task Queue

1. `component_interfaces` — Build per-component observable interfaces against LambdaCDM. Status: `deferred`. Depends on: none.
2. `predictive_pipeline` — Turn the CMB and tri-binary cosmology story into a predictive transfer-function pipeline. Status: `deferred`. Depends on: `component_interfaces`.

## Scope

Convert the current cosmology story from narrative strength to equation-level closure by building a predictive transfer-function pipeline.

This file remains the control surface for deferred cosmology closure. No sibling detailed priority file is needed until component-interface work resumes.

## Promotion Map

| Task | Detailed source | Primary promotion target | Promotion gate |
| --- | --- | --- | --- |
| `component_interfaces` | This file | [cosmology-ontology](../../../content/markdown/aaa/cosmology/cosmology-ontology.md), [BBN-constraints](../../../content/markdown/aaa/cosmology/BBN-constraints.md), [structure-formation](../../../content/markdown/aaa/cosmology/structure-formation.md), and [hubble-s8-tensions](../../../content/markdown/aaa/cosmology/hubble-s8-tensions.md) | Each observable component states exactly where $\mathbb{A}\mathbb{A}\mathbb{A}$ matches, replaces, or diverges from LambdaCDM. |
| `predictive_pipeline` | This file | [CMB](../../../content/markdown/aaa/cosmology/CMB.md), [structure-formation](../../../content/markdown/aaa/cosmology/structure-formation.md), and [hubble-s8-tensions](../../../content/markdown/aaa/cosmology/hubble-s8-tensions.md) | The transfer-function pipeline produces direct CMB, $H_0$, and $S_8$ comparison handles rather than narrative analogy. |

## Closure Goal

- Turn the current CMB and tri-binary cosmology story into a predictive transfer-function pipeline.
- Build the pipeline so removing one foundation assumption does not collapse the whole stack.
- Expose exactly where $\mathbb{A}\mathbb{A}\mathbb{A}$ matches, replaces, or diverges from each observable component.
- Use the result for direct CMB, $H_0$, and $S_8$ comparison rather than narrative analogy.

## Main Interfaces

- Background expansion
- Recombination and CMB transfer
- BBN yields
- Growth and lensing
- Distance-ladder calibration

The goal is to expose exactly where $\mathbb{A}\mathbb{A}\mathbb{A}$ matches, replaces, or diverges from each component.

## Source-Mined Benchmark Contracts

The CMB / BAO / low-redshift source family should now be treated as a contract over observable residual coordinates rather than as a loose narrative comparison. The shared medium-state candidate is

$$
\theta_{\mathrm{sea}}
=
\left(
\theta_{\mathrm{clock}},
\theta_{\mathrm{prop}},
\theta_{\mathrm{therm}},
\theta_{\mathrm{ac}},
\theta_{\mathrm{growth}},
\theta_{\mathrm{frame}}
\right),
$$

where the entries denote, respectively, endpoint clock cadence, path-history propagation, thermalization/blackbody preservation, acoustic-standard-ruler calibration, growth/lensing response, and frame/direction structure. These are comparison coordinates for closure work, not new ontology. A cosmology branch is admissible only when the same $\theta_{\mathrm{sea}}$ supplies every row below within the declared covariance model.

| Source family | Data-product handles | Contract for $\mathbb{A}\mathbb{A}\mathbb{A}$ closure |
| --- | --- | --- |
| Planck Legacy Archive / NASA LAMBDA | CMB frequency maps, component-separated CMB maps, TT/TE/EE spectra, likelihoods, lensing-potential maps, $C_L^{\phi\phi}$ likelihoods, parameter chains | Compute $C_\ell^{TT}$, $C_\ell^{TE}$, $C_\ell^{EE}$, $C_L^{\phi\phi}$, acoustic scale, blackbody preservation, and foreground/calibration nuisance rows from one thermalization and transfer record. Do not absorb CMB lensing mismatch into a separate growth state. |
| ACT DR6 | High-$\ell$ TT/TE/EE spectra, covariance matrices, power-spectrum likelihoods, CMB lensing likelihood bandpowers and covariances | Cross-check Planck-derived transfer and lensing rows with an independent ground-based high-resolution CMB packet. ACT can strengthen or falsify small-scale damping, foreground, and lensing-amplitude projections without changing the CMB ontology. |
| DESI BAO DR1/DR2 | BAO likelihoods, cosmology chains, posterior maxima, tracer/redshift-bin labels, $D_M/r_d$, $D_H/r_d$, $D_V/r_d$ comparison rows | Treat BAO as a standard-ruler packet that constrains both the effective distance map and the sound-horizon calibration $r_d^\theta$. A fit that changes $r_d^\theta$ for CMB while using a different propagation state for BAO fails shared closure. |
| Pantheon+ / SH0ES | Supernova light-curve compilation, covariance, redshift corrections, Cepheid/SN ladder anchors, local $H_0$ estimates | Keep supernova distance modulus, ladder calibration, peculiar-velocity correction, and local slope rows separate. A high local $H_0$ coefficient is a corrected redshift-transfer slope, not literal expansion of the Euclidean void. |
| DES weak lensing / clustering | Year-3 3$\times$2pt data vectors, shear calibration, photo-$z$ calibration, covariance, $S_8$ and $\Omega_m$ constraints | Use DES as the late-growth and lensing benchmark against Planck-like early inference. The key residual is not just $S_8^\theta-S_8^{\mathrm{obs}}$, but whether the same growth projection also preserves CMB lensing and BAO distances. |
| Euclid public releases | Q1 images, spectra, catalogues, masks, and release documentation; DR1 scheduled after this pass | As of 2026-05-19, Euclid Q1 is a release-readiness and systematics-preparation source rather than a public cosmology-constraint source. It should inform future weak-lensing, clustering, photo-$z$, mask, and covariance packet shape, but it should not be cited as a current cosmology residual until a public cosmology release supplies the data vector and covariance. |

The minimal benchmark residual should expose the product structure

$$
\mathcal{R}_{\mathrm{cos}}
=
\mathcal{R}_{\mathrm{CMB}}
+\mathcal{R}_{\mathrm{BAO}}
+\mathcal{R}_{\mathrm{SN/H_0}}
+\mathcal{R}_{\mathrm{WL/RSD}}
+\lambda_{\mathrm{split}}
\mathcal{P}_{\mathrm{proj}},
$$

with

$$
\mathcal{P}_{\mathrm{proj}}
=
\sum_{X<Y}
\sum_{a\in K_X\cap K_Y}
w_a
\left[
(\Pi_X\theta_{\mathrm{sea}})_a
-
(\Pi_Y\theta_{\mathrm{sea}})_a
\right]^2.
$$

The first four terms measure ordinary disagreement with survey data products. The final term is the ontology-split witness: it fails a branch that fits Planck, ACT, DESI, SH0ES/Pantheon+, and DES only by assigning incompatible Noether-Sea projections to different observable families.

### Concrete Residual Rows

For CMB spectra and lensing,

$$
r_{\mathrm{CMB}}
\supset
\left(
\frac{\mathbf{C}_{\ell,\mathrm{TTTEEE}}^\theta-\mathbf{C}_{\ell,\mathrm{TTTEEE}}^{\mathrm{obs}}}
{\boldsymbol\sigma_{\ell,\mathrm{TTTEEE}}},
\frac{\mathbf{C}_{L}^{\phi\phi,\theta}-\mathbf{C}_{L}^{\phi\phi,\mathrm{obs}}}
{\boldsymbol\sigma_{L,\phi\phi}},
\frac{\theta_*^\theta-\theta_*^{\mathrm{obs}}}{\sigma_{\theta_*}},
\frac{\Delta T_{\mathrm{bb}}^\theta}{\epsilon_{\mathrm{bb}}}
\right).
$$

For DESI-style BAO rows,

$$
r_{\mathrm{BAO}}(z_i)
\supset
\left(
\frac{D_M^\theta(z_i)/r_d^\theta-(D_M/r_d)_i^{\mathrm{obs}}}{\sigma_{M,i}},
\frac{D_H^\theta(z_i)/r_d^\theta-(D_H/r_d)_i^{\mathrm{obs}}}{\sigma_{H,i}},
\frac{D_V^\theta(z_i)/r_d^\theta-(D_V/r_d)_i^{\mathrm{obs}}}{\sigma_{V,i}}
\right),
$$

where the unavailable entries are omitted only when the data product is isotropic. For Pantheon+/SH0ES,

$$
r_{\mathrm{SN/H_0}}
\supset
\left(
\frac{\boldsymbol\mu^\theta-\boldsymbol\mu^{\mathrm{obs}}}{\boldsymbol\sigma_\mu},
\frac{H_{\mathrm{eff,ladder}}^\theta-H_{0,\mathrm{ladder}}^{\mathrm{obs}}}{\sigma_{H_0}},
\frac{\Delta_{\mathrm{cal}}^\theta}{\sigma_{\mathrm{cal}}}
\right).
$$

For DES- and RSD-facing growth,

$$
r_{\mathrm{WL/RSD}}
\supset
\left(
\frac{S_8^\theta-S_8^{\mathrm{obs}}}{\sigma_{S_8}},
\frac{f\sigma_8^\theta(z,k)-f\sigma_8^{\mathrm{obs}}(z,k)}{\sigma_{f\sigma_8}},
\frac{\boldsymbol\xi_{\pm}^\theta-\boldsymbol\xi_{\pm}^{\mathrm{obs}}}{\boldsymbol\sigma_{\xi}}
\right).
$$

These rows are benchmark contracts. They do not say that Planck, DESI, SH0ES, Pantheon+, DES, ACT, or Euclid variables are substrate variables. They say which observer-level products a Noether-Sea transfer-function branch must reproduce without splitting its medium-state record.

## Related Priorities

- [master-equation-closure](../master-equation-closure/master-equation-closure.md)
- [strong-field-closure](../strong-field-closure/strong-field-closure.md)
- [strong-field hypothesis bank](../strong-field-closure/hypothesis-bank.md)
- [dark-sector](../dark-sector/dark-sector.md)
- [simulations](../simulations/simulations.md)

## Related $\mathbb{A}\mathbb{A}\mathbb{A}$ Notes

- [cosmology-ontology](../../../content/markdown/aaa/cosmology/cosmology-ontology.md)
- [CMB](../../../content/markdown/aaa/cosmology/CMB.md)
- [BBN-constraints](../../../content/markdown/aaa/cosmology/BBN-constraints.md)
- [structure-formation](../../../content/markdown/aaa/cosmology/structure-formation.md)
- [hubble-s8-tensions](../../../content/markdown/aaa/cosmology/hubble-s8-tensions.md)
