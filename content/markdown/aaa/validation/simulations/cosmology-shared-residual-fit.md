# Cosmology Shared Residual Fit Protocol

This protocol turns the shared calibration gate in [Dark Energy](../../cosmology/dark-energy.md#inference-dependency-and-calibration-gates) into a first machine-checkable validation scaffold. Its purpose is narrow: test whether supernova, BAO, CMB, weak-lensing, redshift-space-distortion, BBN, and pre-BBN comparison packets can consume one shared Noether sea state record without silently replacing the state per observable family.

A cosmology fit can cheat without looking like a cheat. It can use one hidden state for supernovae, another for BAO, another for the CMB, and another for growth, while reporting one attractive summary. This protocol exists to stop that split: one shared Noether sea state record must feed the observable families that claim to belong to the same cosmology.

This is not a cosmological parameter fit and not an empirical claim. The first runtime artifact is a mock packet that fixes the object shape, residual accounting, projection-penalty semantics, gates, and failure codes that a real survey-facing packet must later populate.

## Residual Object

Let

$$
\mathcal{X}_{\mathrm{cos}}
=
\{\mathrm{SN},\mathrm{BAO},\mathrm{CMB},\mathrm{WL},\mathrm{RSD},\mathrm{BBN},\mathrm{PREBBN}\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-d22b0a963d28c309)

For each family $X\in\mathcal{X}_{\mathrm{cos}}$, the packet records a residual vector $r_X$, a covariance object $C_X$, nuisance/calibration context $\nu_X$, and a projection $\Pi_X\theta_{\mathrm{sea}}$ of the shared Noether sea state record into that family. The scaffold computes

$$
\mathcal{R}_X
=
r_X(\theta_{\mathrm{sea}},\nu_X)^T
C_X^{-1}
r_X(\theta_{\mathrm{sea}},\nu_X)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-a1cbbaa65e6c0daf)

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
\right)^2
$$

[View →](../../../../../equation-mapping.html#corpus-equation-76a8d0efa5baae69)

where $K_X$ is the set of shared comparison coordinates reported by family $X$, and $w_a$ is a declared dimensionless weight. The packet-level residual is

$$
\mathcal{R}_{\mathrm{shared}}
=
\sum_{X\in\mathcal{X}_{\mathrm{cos}}}
\mathcal{R}_X
\;+\;
\lambda
\sum_{X<Y}
\mathcal{P}_{XY}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-39d5df0b3b399238)

A low value of the first term alone is insufficient. The second term is the split-ontology guard: it rejects a fit that keeps each observable close to its benchmark only by assigning mutually incompatible projections of $\theta_{\mathrm{sea}}$.

For empirical packets, $\mathcal{R}_X$ is a chi-square statistic only when $C_X$ is the declared covariance of the retained residual vector and its inverse is well defined on that retained subspace. Let $N_X$ be the rank of that covariance after masks and projections, and let $p_X$ be the number of parameters actually estimated from family $X$. The packet must report
$$
\nu_X^{\mathrm{dof}}=N_X-p_X
$$

[View →](../../../../../equation-mapping.html#corpus-equation-353e97dc6eff2fe6)
and, when $\nu_X^{\mathrm{dof}}>0$, the reduced statistic
$$
\overline{\mathcal{R}}_X
=
\frac{\mathcal{R}_X}{\nu_X^{\mathrm{dof}}}.
$$

[View →](../../../../../equation-mapping.html#corpus-equation-2fbc568db154dbb9)
The raw $\mathcal{R}_X$ remains the additive packet term; $\overline{\mathcal{R}}_X$ is a scale diagnostic and must not replace a likelihood without a declared statistical derivation.

The nuisance record $\nu_X$ must state, before fitting, whether each nuisance quantity is fixed, profiled, or marginalized and how that choice changes $p_X$ and the effective covariance. The projection weights $w_a$, the penalty coefficient $\lambda$, and all residual and overlap thresholds are likewise frozen before fitting. They may be changed only in a separately identified sensitivity run, never retuned after seeing the shared-state result.

The first empirical packet should keep the leading standard comparison objects visible inside the residual vectors:
$$
r_{\mathrm{SN/BAO}}
\supset
\left(
\frac{d_L^\theta(z)-d_L^{\mathrm{obs}}(z)}{\sigma_{d_L}},
\frac{D_M^\theta(z)/r_d^\theta-(D_M/r_d)^{\mathrm{obs}}}{\sigma_{D_M/r_d}},
\frac{H^\theta(z)r_d^\theta-(Hr_d)^{\mathrm{obs}}}{\sigma_{Hr_d}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ac97f573e12870bf)
$$
r_{\mathrm{CMB}}
\supset
\left(
\frac{\Delta T_{\mathrm{bb}}^\theta}{\epsilon_{\mathrm{bb}}},
\frac{C_{\ell}^{\theta}-C_{\ell}^{\mathrm{obs}}}{\sigma_{C_\ell}},
\frac{C_L^{\phi\phi,\theta}-C_L^{\phi\phi,\mathrm{obs}}}{\sigma_{C_L^{\phi\phi}}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-086b4246d26df244)
$$
r_{\mathrm{growth}}
\supset
\left(
\frac{f\sigma_8^\theta(z,k)-f\sigma_8^{\mathrm{obs}}(z,k)}{\sigma_{f\sigma_8}},
\frac{P^\theta(k,z)-P^{\mathrm{obs}}(k,z)}{\sigma_P}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-106f9c9e30cd0bd7)
and $r_{\mathrm{BBN}}$ should retain D/H, $Y_p$, lithium, $\eta$, and $\Delta N_{\text{eff}}$ rows. These are data-product coordinates, not ontology claims. They make the shared packet check luminosity distance, BAO rulers, blackbody preservation, CMB lensing, growth, and BBN yield recovery before any Noether sea state interpretation is promoted.

Redshift-facing packets must expose the signed photon-frequency transfer row rather than treating redshift as a primitive expansion coordinate. For a line or photon family $X$, retain
$$
r_{\nu\text{-}\mathrm{path}}
\supset
\left(
\frac{Z_X^\theta-Z_X^{\mathrm{obs}}}{\sigma_Z},\;
\frac{Y_{X,\mathrm{path}}^\theta-Y_{X,\mathrm{cal}}^{\mathrm{obs}}}{\sigma_Y},\;
\frac{\mathcal{R}_{\nu\text{-}\mathrm{ex}}^\theta}{\epsilon_{\nu\text{-}\mathrm{ex}}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-161938fb0ad62752)
where $Z_X$ is the total logarithmic redshift budget, $Y_{X,\mathrm{path}}$ is the signed path-history exchange contribution, and $Y_{X,\mathrm{cal}}^{\mathrm{obs}}$ is any declared calibration row such as a Sunyaev-Zeldovich or kinematic-Sunyaev-Zeldovich frequency-shift packet. This row does not add a separate cosmology gate. It prevents a shared-state fit from hiding path-frequency exchange inside $H(z)$, distance modulus, or CMB temperature calibration.

The source-mined empirical packet should retain the following benchmark families without turning them into separate gates:

| Family | Required packet content | Shared-state overlap |
| --- | --- | --- |
| `CMB_PLANCK_LAMBDA` | Planck/LAMBDA frequency-map and component-separation provenance, TT/TE/EE spectra, likelihood choice, CMB lensing map or bandpower provenance, foreground and beam nuisance context | `theta_star`, `r_d`, `omega_b`, `omega_c`, `tau`, `A_s`, `n_s`, `CMB_lensing`, `blackbody` |
| `CMB_ACT` | ACT DR6 high-$\ell$ spectra or likelihood rows, ACT lensing bandpowers, covariance, foreground model context, SZ/kSZ frequency-exchange provenance when used | `CMB_lensing`, `small_scale_damping`, `foreground_context`, `growth_projection`, `frequency_exchange` |
| `BAO_DESI` | DESI tracer label, effective redshift, isotropic or anisotropic BAO vector, covariance, likelihood or chain provenance | `r_d`, `D_M`, `D_H`, `D_V`, `H_eff`, `theta_acoustic` |
| `SN_SH0ES_PANTHEON` | Pantheon+ light-curve and covariance provenance, redshift convention, calibration/standardization context, Cepheid/SN ladder anchor context, local $H_0$ row when used | `D_L`, `H_eff_ladder`, `clock_endpoint`, `path_history`, `frequency_exchange`, `calibration_context` |
| `WL_RSD_DES` | DES weak-lensing/clustering data vector, shear calibration, photo-$z$ calibration, covariance, DESI RSD rows when present | `S_8`, `f_sigma_8`, `CMB_lensing`, `growth_response`, `noether_sea_coupling` |
| `EUCLID_PUBLIC` | Public release identifier, image/catalogue/mask/photo-$z$ readiness products, covariance readiness note | `mask_context`, `photo_z_context`, `shape_context`, `future_growth_projection` |

`EUCLID_PUBLIC` remains a readiness row whenever the cited public release lacks a cosmology data vector and covariance. Such a packet may test mask, catalogue, image, spectroscopy, and photo-$z$ bookkeeping, but it must not count Euclid as a successful weak-lensing or clustering cosmology residual until its cited release supplies the required data vector and covariance.

For empirical packets, the BAO row should use the explicit anisotropic/isotropic vector

$$
\mathbf r_{\mathrm{BAO},i}
=
\mathbf C_{\mathrm{BAO},i}^{-1/2}
\left[
\begin{pmatrix}
D_M^\theta(z_i)/r_d^\theta\\
D_H^\theta(z_i)/r_d^\theta\\
D_V^\theta(z_i)/r_d^\theta
\end{pmatrix}_{\!\mathrm{kept}}
-
\begin{pmatrix}
(D_M/r_d)_i^{\mathrm{obs}}\\
(D_H/r_d)_i^{\mathrm{obs}}\\
(D_V/r_d)_i^{\mathrm{obs}}
\end{pmatrix}_{\!\mathrm{kept}}
\right]
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3a5d3bee6d4cecb5)

where `kept` means the subset reported by the survey bin. This avoids pretending that isotropic BAO bins contain independent radial and transverse information.

The acoustic-ruler coherence check is evaluated inside this BAO family rather than as a separate cosmology gate. Partition the catalogue into predeclared sky patches $p$, tracer classes, and redshift bins $b$; fit every subset with the same distance calibration, nuisance model, window-function treatment, and reconstruction procedure. Let

$$
\ell_{pb}
\equiv
\ln r_{d,pb}^{\mathrm{fit}},
\qquad
\bar{\ell}_d
=
\frac{
\mathbf 1^T\mathbf C_{\ell}^{-1}\boldsymbol{\ell}
}{
\mathbf 1^T\mathbf C_{\ell}^{-1}\mathbf 1
},
$$

[View →](../../../../../equation-mapping.html#corpus-equation-bef1a332fe8468b8)

where $\mathbf C_\ell$ includes cross-patch covariance and survey-window coupling. The dispersion row is

$$
\mathcal R_{\mathrm{BAO,disp}}
=
\left(
\boldsymbol{\ell}-\bar{\ell}_d\mathbf 1
\right)^T
\mathbf C_\ell^{-1}
\left(
\boldsymbol{\ell}-\bar{\ell}_d\mathbf 1
\right).
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ec413a9b4c42a07e)

Homogeneous comparison mocks determine the noise-only distribution after masks, selection, reconstruction, and shared-distance calibration are applied. A recovered branch passes when its predicted patch and bin dispersion is consistent with that distribution. Because BAO measures distance-to-ruler ratios, $r_{d,pb}^{\mathrm{fit}}$ is not treated as a model-free direct observation; the same declared distance map must be used in every subset.

The SN/local-ladder row should analogously keep the distance-modulus and local-slope rows separate:

$$
\mathbf r_{\mathrm{SN/H_0}}
=
\left(
\mathbf C_\mu^{-1/2}
\left[
\boldsymbol\mu^\theta-\boldsymbol\mu^{\mathrm{obs}}
\right],
\frac{H_{\mathrm{eff,ladder}}^\theta-H_{0,\mathrm{ladder}}^{\mathrm{obs}}}{\sigma_{H_0}},
\frac{\Delta_{\mathrm{cal}}^\theta}{\sigma_{\mathrm{cal}}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7ef9bfdd4f931dc1)

The CMB row should preserve spectra and lensing as separate but overlapping checks:

$$
\mathbf r_{\mathrm{CMB}}
=
\left(
\mathbf C_{\ell}^{-1/2}
\left[
\mathbf C_{\ell,\mathrm{TTTEEE}}^\theta
-
\mathbf C_{\ell,\mathrm{TTTEEE}}^{\mathrm{obs}}
\right],
\mathbf C_{\phi\phi}^{-1/2}
\left[
\mathbf C_{L}^{\phi\phi,\theta}
-
\mathbf C_{L}^{\phi\phi,\mathrm{obs}}
\right],
\frac{\theta_*^\theta-\theta_*^{\mathrm{obs}}}{\sigma_{\theta_*}},
\frac{\Delta T_{\mathrm{bb}}^\theta}{\epsilon_{\mathrm{bb}}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-dfc36d70b2a4fd7e)

The overlap key `CMB_lensing` must appear in both CMB and growth-facing projections whenever lensing is used. Otherwise a packet can accidentally fit CMB spectra with one projection and weak-lensing or clustering with another, which is exactly the split-ontology failure this protocol is meant to catch.

Dark-sector comparison packets should also retain the linear/nonlinear split exposed by scalar-fluid and MOND-like hybrid models:

$$
r_{\mathrm{DM,split}}
\supset
\left(
\frac{w_{\mathrm{lin}}^\theta-w_{\mathrm{lin}}^{\mathrm{CDM}}}{\sigma_w},
\frac{(c_{s,\mathrm{lin}}^2)^\theta-(c_s^2)^{\mathrm{CDM}}}{\sigma_{c_s^2}},
\frac{v_c^\theta(r,E_{\mathrm{gal}})-v_c^{\mathrm{obs}}(r,E_{\mathrm{gal}})}{\sigma_{v_c}},
\frac{\Delta_{\mathrm{BTFR}}^\theta(M_b,v_f,E_{\mathrm{gal}})}{\sigma_{\mathrm{BTFR}}},
\frac{\mathrm{RAR}^{\theta}(g_{\mathrm{bar}},E_{\mathrm{gal}})-\mathrm{RAR}^{\mathrm{obs}}(g_{\mathrm{bar}})}{\sigma_{\mathrm{RAR}}},
\frac{a_\star^{\theta}(E)-a_\star^{\mathrm{obs}}(E)}{\sigma_{a_\star}},
\frac{f_\star^{\theta}(E)-f_\star^{\mathrm{obs}}(E)}{\sigma_f}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-14d79998fa0ff35c)

Here $w_{\mathrm{lin}}$ and $c_{s,\mathrm{lin}}^2$ are comparison coordinates for CDM-like linear loading, while $v_c(r)$, $\Delta_{\mathrm{BTFR}}$, $\mathrm{RAR}$, $a_\star(E)$, and $f_\star(E)$ are nonlinear acceleration-response coordinates. A dimensionless BTFR residual can be recorded as

$$
\Delta_{\mathrm{BTFR}}^\theta
\equiv
\frac{G_N M_b^{\mathrm{obs}} a_\star^\theta(E_{\mathrm{gal}})}{(v_f^\theta)^4}
-1
$$

[View →](../../../../../equation-mapping.html#corpus-equation-f0921c41253a26f0)

with $v_f$ the retained flat-curve velocity and $M_b$ the retained baryonic mass. The environment label $E$ is not a new ontology coordinate; it is the observable context carried in $\nu_X$. For these rows it should include at least $M_{\mathrm{halo}}$, $z_{\mathrm{vir}}$, $\sigma_v$, $T_{\mathrm{eff}}$, the baryon profile, and, for mergers, the declared ratio $v_{\mathrm{inf}}/c_s$ when the comparison template supplies a sound-speed coordinate. The low-acceleration galaxy comparison may be expressed as

$$
g_{\mathrm{obs}}^\theta(r,E_{\mathrm{gal}})
=
g_{\mathrm{bar}}(r)
+
g_{\mathrm{med}}^\theta(r,E_{\mathrm{gal}})
$$

[View →](../../../../../equation-mapping.html#corpus-equation-7f2356452b86ade2)

where $g_{\mathrm{med}}^\theta$ is only the Noether sea response projection being tested against a MOND-like comparison residual. To make the galaxy-vs-cluster split measurable, the same packet should evaluate $a_\star(E)$ and $f_\star(E)$ at both $E_{\mathrm{gal}}$ and $E_{\mathrm{cl}}$. Passing the galaxy rotation-curve, BTFR, and RAR rows while failing the cluster rows below is not promotable as a shared-state success. These rows are not a request to add a new fundamental scalar-fluid ontology. Their purpose is to prevent a packet from fitting CMB and matter power data with one effective dark component while fitting galaxy, cluster, and merger accelerations with a separately tuned Noether sea law.

For cluster-facing rows, include the hydrostatic/lensing equality packet

$$
r_{\mathrm{cl}}
\supset
\left(
\frac{T_{\mathrm{ICM}}^\theta(r)-T_{\mathrm{ICM}}^{\mathrm{obs}}(r)}{\sigma_T},
\frac{P_{\mathrm{SZ}}^\theta(r)-P_{\mathrm{SZ}}^{\mathrm{obs}}(r)}{\sigma_P},
\frac{\Phi_{\mathrm{lens}}^\theta(r)-\Phi_{\mathrm{lens}}^{\mathrm{obs}}(r)}{\sigma_{\Phi_{\mathrm{lens}}}},
\frac{\Phi_{\mathrm{dyn}}^\theta(r)-\Phi_{\mathrm{dyn}}^{\mathrm{obs}}(r)}{\sigma_{\Phi_{\mathrm{dyn}}}},
\frac{\gamma_{\mathrm{PPN}}^\theta(r)-1}{\sigma_\gamma},
\frac{d_{\mathrm{lens-gal}}^\theta-d_{\mathrm{lens-gal}}^{\mathrm{obs}}}{\sigma_{d,\mathrm{lg}}},
\frac{d_{\mathrm{lens-gas}}^\theta-d_{\mathrm{lens-gas}}^{\mathrm{obs}}}{\sigma_{d,\mathrm{lgas}}}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-ea14d73a0e7bd124)

This row is a success marker under the existing shared-state gate, not a new standalone gate. It records whether the same Noether sea state packet can recover cluster gas temperature, SZ pressure, lensing potential, dynamical potential, and Bullet-like lensing/galaxy/gas peak separation without changing the acceleration law between observables.

Merger-facing rows may be attached to the same cluster or dark-sector observable family when the packet claims regime-dependent behavior:

$$
r_{\mathrm{merge}}
\supset
\left(
\frac{t_{\mathrm{merge}}^\theta(v_{\mathrm{inf}}/c_s)-t_{\mathrm{merge}}^{\mathrm{obs}}}{\sigma_t},
\frac{\Delta_{\mathrm{fric}}^\theta(v_{\mathrm{inf}}/c_s)-\Delta_{\mathrm{fric}}^{\mathrm{obs}}}{\sigma_{\mathrm{fric}}},
\frac{\mathcal{I}_{\mathrm{int}}^\theta(v_{\mathrm{inf}}/c_s)-\mathcal{I}_{\mathrm{int}}^{\mathrm{obs}}}{\sigma_{\mathcal{I}}},
\frac{N_{\mathrm{vort}}^\theta(R)-N_{\mathrm{vort}}^{\mathrm{obs}}(R)}{\sigma_N}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-df474580a5d4640c)

The ratio $v_{\mathrm{inf}}/c_s$ distinguishes low-dissipation pass-through encounters from high-dissipation encounters in comparison templates that provide $c_s$. The coordinate $\mathcal{I}_{\mathrm{int}}$ is a declared shell or interference-morphology statistic for high-relative-speed mergers, and $N_{\mathrm{vort}}(R)$ is included only when the comparison template predicts vortex-like substructure measurable through lensing over projected radius $R$. Cold-atom or other laboratory analogue simulations can supply provenance for these dimensionless template variables, but visual analogy is not a substitute for astronomical residual rows under the shared-state packet.

## Packet Schema

The runtime packet should preserve this shape even when a later empirical packet replaces the mock values:

| Field | Required content | Promotion role |
| --- | --- | --- |
| `metadata` | run identifier, source commit when available, input provenance, fit family, and declared comparison level | makes the packet reproducible |
| `required_families` | required observable families, defaulting to `SN`, `BAO`, `CMB`, `WL`, `RSD`, `BBN`, and `PRE_BBN` | prevents cherry-picking a subset of cosmology constraints |
| `theta_sea` | shared dimensionless state record used by all projections | names the single Noether sea state candidate under test |
| `observables` | one row per family with residual vector, covariance, nuisance/calibration note when available, and projection coordinates | supplies $\mathcal{R}_X$ and $\Pi_X\theta_{\mathrm{sea}}$ |
| `projection_weights` | dimensionless weights $w_a$ for common projection coordinates | makes the split penalty explicit rather than rhetorical |
| `lambda` | nonnegative coefficient multiplying the projection penalty | controls how strongly shared-state incompatibility is penalized |
| `thresholds` | predeclared maxima for ordinary residuals, raw projection penalty, shared residual, and projection overlap | prevents post-fit gate selection |
| `gates` | pass/fail records for coverage, residual total, projection penalty, projection overlap, and total shared residual | turns the comparison into an auditable decision surface |
| `failure_code` | null on pass, otherwise the first failed gate | gives follow-up work a stable repair target |

The mock packet uses normalized comparison coordinates such as `H_norm`, `w_eff`, `n`, `chi_sea`, `G_growth`, `Y_BBN`, `Delta_N_eff`, `lambda_fs`, `Omega_GW`, `Z_total`, `Y_path`, and `frequency_exchange_residual`. These are not new ontology. They are dimensionless placeholders for observer-level expansion, equation-of-state, normalized Noether braid density, Noether sea delay, growth-response, BBN-yield, relativistic-species, free-streaming, stochastic-gravitational-wave, total redshift-budget, path-frequency-transfer, and exchange-ledger comparison channels.

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
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-3f446f1eb1b133d1)
The projection keys should include the ordinary shared cosmology coordinates plus branch-facing coordinates such as `Delta_N_eff`, `lambda_fs`, and `Omega_GW`. The packet passes this subgate only when the ordinary residual $\mathcal{R}_{\mathrm{PREBBN}}$ is small and the projection penalty shows that the same $\theta_{\mathrm{sea}}$ is being consumed by BBN, CMB, growth, and gravitational-wave comparisons.

## Frame-Split Measurement Recipe

The `cosmology.frame_split` witness is the directional subgate for the same shared-state problem. It asks whether the rest-frame correction used for CMB inference can coexist with matter dipoles, supernova residual directionality, BAO anisotropy, and local $H_0$ scatter without giving each family its own hidden frame.

The required frame families are

$$
\mathcal{F}_{\mathrm{frame}}
=
\{\mathrm{CMB},\mathrm{MD},\mathrm{SN},\mathrm{BAO},H_0\}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-8b61b616046af765)

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
  \mathbf{F}_{X}(\theta_{\mathrm{frame}},\nu_X)
  $$

  [View →](../../../../../equation-mapping.html#corpus-equation-5f4ee677a09b9410)
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
\left(\mathbf{y}_i-\mathbf{m}_i\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-b281f805db01a924)

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
\right]^2
$$

[View →](../../../../../equation-mapping.html#corpus-equation-20a4883a89d61171)

and the combined frame score is

$$
\mathcal{R}_{\mathrm{frame}}
=
\mathcal{Q}_{\mathrm{frame}}
+
\lambda_{\mathrm{frame}}\mathcal{P}_{\mathrm{frame}}
$$

[View →](../../../../../equation-mapping.html#corpus-equation-4ed41d6110734ee0)

The packet also records a direction check for every nonzero row,

$$
\alpha_i
=
\cos^{-1}
\left(
\frac{\mathbf{y}_i\cdot\mathbf{m}_i}
{\|\mathbf{y}_i\|\|\mathbf{m}_i\|}
\right)
$$

[View →](../../../../../equation-mapping.html#corpus-equation-86944af1aaee1ff0)

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

Failure is informative. If the ordinary residual passes but the projection penalty fails, the candidate has fit the data products while splitting the Noether sea state record. If the projection penalty passes but an observable residual fails, the shared state is coherent but not yet accurate. If coverage fails, the packet is not a cosmology closure artifact.
