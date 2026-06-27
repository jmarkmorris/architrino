# Cosmology Transfer-Function Closure

## Workstream Metadata

- Kind: `deferred-priority`
- Rank: `27`
- Value: `2.62`
- Cost: `7.0`
- ROI: `0.37`
- Status: `deferred`

## Task Queue

1. `component_interfaces` — Build per-component observable interfaces against LambdaCDM. Status: `deferred`. Depends on: none.
2. `predictive_pipeline` — Turn the CMB and tri-binary cosmology story into a predictive transfer-function pipeline. Status: `deferred`. Depends on: `component_interfaces`.
3. `age_clock_convergence` — Add an oldest-object and material-clock interface for Hubble-time/time-redshift mapping, globular-cluster turnoff ages, white-dwarf cooling ages, Th/U/Eu radiochronometers, and presolar/interstellar-grain provenance. Status: `deferred`. Depends on: `component_interfaces`.
4. `cmb_noether_braid_spectrum_linkage` — Examine whether the observed CMB spectrum has a derivable linkage to Noether braid ensemble modes, photon-channel provenance, Noether sea thermalization, and coherent photon-channel bundle transport, without treating the linkage as established before a spectrum-level residual exists. Status: `deferred`. Depends on: `predictive_pipeline`.

## Scope

Convert the current cosmology story from narrative strength to equation-level closure by building a predictive transfer-function pipeline.

This file remains the control surface for deferred cosmology closure. No sibling detailed priority file is needed until component-interface work resumes.

## Promotion Map

| Task | Detailed source | Primary promotion target | Promotion gate |
| --- | --- | --- | --- |
| `component_interfaces` | This file | [cosmology-ontology](../../../content/markdown/aaa/cosmology/cosmology-ontology.md), [BBN-constraints](../../../content/markdown/aaa/cosmology/BBN-constraints.md), [structure-formation](../../../content/markdown/aaa/cosmology/structure-formation.md), and [hubble-s8-tensions](../../../content/markdown/aaa/cosmology/hubble-s8-tensions.md) | Each observable component states exactly where $\mathbb{A}\mathbb{A}\mathbb{A}$ matches, replaces, or diverges from LambdaCDM. |
| `predictive_pipeline` | This file | [CMB](../../../content/markdown/aaa/cosmology/CMB.md), [structure-formation](../../../content/markdown/aaa/cosmology/structure-formation.md), and [hubble-s8-tensions](../../../content/markdown/aaa/cosmology/hubble-s8-tensions.md) | The transfer-function pipeline produces direct CMB, $H_0$, and $S_8$ comparison handles rather than narrative analogy. |
| `age_clock_convergence` | This file | [cosmology-ontology](../../../content/markdown/aaa/cosmology/cosmology-ontology.md), [expansion-mechanism](../../../content/markdown/aaa/cosmology/expansion-mechanism.md), [BBN-constraints](../../../content/markdown/aaa/cosmology/BBN-constraints.md), and [structure-formation](../../../content/markdown/aaa/cosmology/structure-formation.md) | The same Noether sea and assembly history explains why independent age clocks converge near $13$-$14\ \mathrm{Gyr}$ as an effective observer-era record, without promoting that convergence to the absolute age of the Euclidean void and without leaving older visible or material populations unaccounted for. |
| `cmb_noether_braid_spectrum_linkage` | This file | [CMB](../../../content/markdown/aaa/cosmology/CMB.md), [Noether Braid](../../../content/markdown/aaa/noether-braid/noether-braid.md), and [Reaction-Cosmology Provenance Ledger](../../../content/markdown/aaa/validation/reaction-cosmology-provenance-ledger.md) | The branch states whether CMB Planck-occupation recovery, blackbody preservation, coherent photon-channel bundle transport, spectral-distortion bounds, and frequency-map rows can be derived from Noether braid ensemble dynamics and photon-channel provenance using the same Noether sea state as BBN, redshift, and TT/TE/EE transfer. |

## Closure Goal

- Turn the current CMB and tri-binary cosmology story into a predictive transfer-function pipeline.
- Build the pipeline so removing one foundation assumption does not collapse the whole stack.
- Expose exactly where $\mathbb{A}\mathbb{A}\mathbb{A}$ matches, replaces, or diverges from each observable component.
- Use the result for direct CMB, $H_0$, and $S_8$ comparison rather than narrative analogy.
- Test whether the CMB spectrum supplies a Noether braid ensemble constraint or remains only an observer-level blackbody transfer product.
- Separate pre-free-streaming thermalization depth from transparent-path coherent transport so redshift is not modeled as stochastic tired-light loss.

## Main Interfaces

- Background expansion
- Recombination and CMB transfer
- BBN yields
- Growth and lensing
- Distance-ladder calibration
- Oldest-object and material-clock convergence
- CMB spectral linkage to Noether braid ensemble dynamics

The goal is to expose exactly where $\mathbb{A}\mathbb{A}\mathbb{A}$ matches, replaces, or diverges from each component.

## CMB Spectrum / Noether Braid Linkage

The linkage question is whether the observed CMB spectrum, including near-Planck blackbody quality and allowed spectral-distortion bounds, is only a thermalized observer-level transfer output or also constrains the Noether braid ensemble modes that feed photon-channel provenance.

The first pass should keep the claim level narrow. A viable linkage requires one event and medium record to connect Noether braid ensemble dynamics, photon assembly source/capture/release rows, thermalization depth, coherent photon-channel bundle transport, redshift handoff, and the CMB frequency-map residuals. If the spectrum can be fit only by changing the Noether sea state separately from BBN, redshift, or TT/TE/EE transfer, the linkage fails as a shared-cosmology closure route.

The thermalization and transparent-transport rows must remain distinct. Pre-free-streaming thermalization can drive the photon bath toward a Planck occupation law, but long-path redshift must preserve that shape by coherent scaling. For a declared path factor $\lambda$, the comparison target is

$$
\mathcal{T}_{\lambda}\mathcal{B}_{T}
=
\mathcal{B}_{T/\lambda}
+O(\epsilon_{\mathrm{spec}}),
\qquad
\|\Delta\mathbf{k}_{\perp}\|\le\epsilon_{\mathrm{img}},
\qquad
|\Delta\phi_{\perp}|\le\epsilon_{\mathrm{coh}}
$$

where $\mathcal{T}_{\lambda}$ is the transparent photon-channel transport map, $\mathcal{B}_{T}$ is the effective Planck spectrum at temperature $T$, and the transverse bounds apply after declared lensing, aperture, and detector terms are removed. A branch that redshifts by stochastic scattering, absorption/re-emission, or thermalizing kicks has not supplied the required coherent transport invariant unless the same packet also preserves blackbody quality, image sharpness, time dilation, anisotropy, and polarization.

Absolute time also makes the redshift-energy row non-optional. A fixed-void branch cannot let the photon's missing energy disappear into expansion bookkeeping; it must close the finite-window ledger through Noether sea update, source/release or remnant rows, recoil/exchange rows, and declared boundary flux. The same Noether sea state that preserves blackbody shape and image coherence must carry that energy balance, or the transport branch has split the very constitutive response this priority is testing.

## Galaxy-Local Recycling And Horizon Uniformity

The legacy-source signal to preserve is not the claim that the horizon problem is already solved. It is the alternative layer assignment: horizon uniformity may be evidence that the observer-level cosmological chart is summarizing recurrent source/release and thermalization history rather than a single global birth event. In that reading, galaxy-local or source-network recycling could contribute to the apparent uniform background while the Euclidean void remains fixed.

This remains priority-only until it is expressed through the existing `component_interfaces`, `predictive_pipeline`, and `cmb_noether_braid_spectrum_linkage` tasks. A viable branch must use one declared Noether sea and source/release record to face CMB monopole isotropy, TT/TE/EE acoustic structure, allowed spectral distortions, BBN yields, BAO distance calibration, redshift-distance data, structure growth, and oldest-object/material-clock convergence. If galaxy-local recycling can explain only qualitative uniformity while breaking any of those shared comparison rows, it remains an analogy rather than a cosmology closure route.

## Age-Clock Convergence Interface

Oldest-object and material-age observations are not optional background color for an unbounded-age cosmology. They are a compact convergence pressure on the effective observer chronology: multiple independent clocks cluster near $13$-$14\ \mathrm{Gyr}$ even if the Euclidean void has no mandatory one-time origin event.

The interface should keep these clock families distinct:

- Hubble-time and time-redshift mapping as effective observer chronology, not absolute age of the Euclidean void.
- Globular-cluster turnoff ages as oldest-surviving stellar-population clocks.
- White-dwarf cooling ages as remnant cooling clocks plus progenitor formation delay.
- Th/U/Eu radiochronometers as nucleosynthetic provenance clocks.
- Presolar and interstellar-grain ages as parent-star, ejection, mixing, and solar-system incorporation records.

The closure question is why those clocks converge in the accessible material and stellar record. A viable $\mathbb{A}\mathbb{A}\mathbb{A}$ branch may interpret the convergence as the age of the current effective observer era, dominant recycling/thermalization history, or accessible star-forming material record, but it must also explain why much older visible populations are absent, reset, hidden, or outside the declared observation record.

## Tier 2 Lecture-Note Interfaces

TASI and Les Houches lecture-note material sharpens this priority into a set of equation-level benchmark interfaces. These are comparison contracts, not ontology imports. The native closure question is whether one Noether sea state and neutral-assembly record can project into all of them without changing state variables between observables.

### Inflation and CMB Transfer

For an inflation-like high-curvature release record $\theta$, keep the slow-roll dictionary as a comparison projection:
$$
\varepsilon_\theta
=
-\frac{d\ln H_\theta}{dN_\theta},
\qquad
\eta_\theta
=
\varepsilon_\theta
-
\frac{1}{2\varepsilon_\theta}
\frac{d\varepsilon_\theta}{dN_\theta},
$$
with $a_\theta$, $H_\theta$, and $N_\theta$ read as effective observer variables. The scalar/tensor comparison output is
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
\right|_{k=a_\theta H_\theta},
\qquad
r^\theta\approx16\varepsilon_\theta.
$$
The CMB-facing transfer contract should then compute
$$
C_\ell^{XY,\theta}
=
\frac{2}{\pi}
\int k^2\,dk\,
P_\theta(k)\,
\Delta_{X\ell}^\theta(k)
\Delta_{Y\ell}^\theta(k),
\qquad
\Delta_{X\ell}^\theta(k)
=
\int_0^{\tau_0^\theta}
S_X^\theta(k,\tau)
P_{X\ell}^\theta(k[\tau_0^\theta-\tau])\,d\tau.
$$
The source and projection terms are observer-level transfer functions. The closure burden is to derive the effective source record from Noether sea thermalization, path-history propagation, acoustic calibration, and perturbation seeding rather than importing an inflaton field.

### Prediction Width and Initial Basin

The inflation-contest source packet has been promoted into a branch-selection criterion rather than a new gate. A transfer-function branch must report both fit quality and predictive narrowness. For a declared cosmology record
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
the allowed-output set is
$$
\mathcal{O}_{\epsilon}(\theta_{\mathrm{cosmo}})
=
\left\{
o \in \mathcal{O}_{\mathrm{near}}
:
\mathcal{R}_{\mathrm{cos}}(\theta_{\mathrm{cosmo}};o)
\le
\epsilon_{\mathrm{cos}}
\right\}
$$
Fitting asks whether the observed packet lies in $\mathcal{O}_{\epsilon}$. Prediction asks whether $\mu(\mathcal{O}_{\epsilon}) \ll \mu(\mathcal{O}_{\mathrm{near}})$ under the declared comparison measure.

The same branch should report its initial-basin burden,
$$
\mathcal{S}_{\mathrm{init}}
=
-\log
\frac{
\mu_{\mathrm{init}}(\mathcal{B}_{\mathrm{obs}})
}{
\mu_{\mathrm{init}}(\Gamma_{\mathrm{init}})
},
\qquad
\mathcal{B}_{\mathrm{obs}}
=
\left\{
\theta_{\mathrm{init}} \in \Gamma_{\mathrm{init}}
:
\mathcal{R}_{\mathrm{cos}}(\theta_{\mathrm{cosmo}})
\le
\epsilon_{\mathrm{cos}}
\right\}
$$
High $\mathcal{S}_{\mathrm{init}}$ means the branch has moved the smoothing burden into a small starting chart. Low $\mathcal{S}_{\mathrm{init}}$ means the declared Noether sea release or thermalization mechanism is robust under the chosen chart. The corpus promotion target is now [cosmology-ontology](../../../content/markdown/aaa/cosmology/cosmology-ontology.md#prediction-narrowness-and-initial-basin-burden), with the inflation-specific use in [inflation-model](../../../content/markdown/aaa/cosmology/inflation-model.md#predictive-restriction-and-initial-conditions).

### Component Perturbations and Matter Power

For each comparison component $x$, use the linear state packet
$$
\mathbf{y}_x^\theta(k,z)
=
\left(
\delta_x^\theta,\,
\theta_x^\theta,\,
\sigma_x^\theta,\,
\delta p_x^\theta
\right),
\qquad
\mathbf{y}_x^\theta
=
\mathsf{T}_x^\theta(k,z;\theta_{\mathrm{sea}})
\mathbf{y}_{\mathrm{init}}^\theta.
$$
The adiabatic benchmark relation is
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
\frac{3}{4}\delta_\gamma^\theta.
$$
Isocurvature is allowed only as a declared source component that remains visible in the same CMB, BBN, and $P(k,z)$ residual packet. The matter spectrum benchmark remains
$$
P^\theta(k,z)
=
P_{\mathrm{seed}}^\theta(k)
T_\theta^2(k)
D_\theta^2(z),
$$
with equality-scale, BAO, neutrino/free-streaming, and nonlinear corrections carried by the same $\theta_{\mathrm{sea}}$.

### Dark-Sector Production and Free Streaming

For any thermal, freeze-in, sterile-neutrino, compact-object, or neutral-assembly comparison branch, preserve the production equation rather than only the final abundance. The thermal freeze-out benchmark is
$$
\frac{dn_X^\theta}{dt}
+3H_\theta n_X^\theta
=
-\langle\sigma v\rangle_\theta
\left[
\left(n_X^\theta\right)^2
-
\left(n_{X,\mathrm{eq}}^\theta\right)^2
\right],
$$
with
$$
x_f^\theta
\equiv
\frac{m_X^\theta}{T_f^\theta},
\qquad
\Omega_X^\theta h_\theta^2
\propto
\frac{x_f^\theta}
{g_\ast^{1/2}\langle\sigma v\rangle_\theta}.
$$
The neutrino / warm-component suppression benchmark is
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
-8f_\nu^\theta,
$$
and the warm free-streaming benchmark is
$$
\lambda_{\mathrm{FS}}^\theta
=
\int_0^{t_{\mathrm{eq}}^\theta}
\frac{v^\theta(t)}{a_\theta(t)}\,dt
\approx
1.2\,\mathrm{Mpc}
\left(\frac{1\,\mathrm{keV}}{m_s^\theta}\right)
\left(\frac{\langle p/T\rangle_\theta}{3.15}\right).
$$
The production channel must therefore expose abundance, momentum distribution, free-streaming scale, and any injection or relativistic-species contribution together.

### BBN Weak-Rate Interface

The BBN side of the same record must compute weak conversion and relativistic-species loading:
$$
H_{\mathrm{eff,BBN}}^\theta
\propto
\left(
\rho_\gamma^\theta
+\rho_{e^\pm}^\theta
+\rho_{\nu_\alpha}^\theta
+\rho_{\nu_s}^\theta
+\cdots
\right)^{1/2},
\qquad
N_{\text{eff}}^\theta
=
\frac{\rho_{\mathrm{rel}}^\theta-\rho_\gamma^\theta}
{\rho_{\nu,1}^\theta}.
$$
The neutron fraction target is
$$
\frac{n_n^\theta}{n_p^\theta}
\approx
\exp\!\left(
-\frac{\Delta m_{np}c_0^2}{k_BT}
-\xi_{\nu_e}^\theta
\right),
$$
with $\xi_{\nu_e}^\theta$ included only for declared neutrino-sector asymmetry. This interface should be consumed by [BBN-constraints](../../../content/markdown/aaa/cosmology/BBN-constraints.md), [structure-formation](../../../content/markdown/aaa/cosmology/structure-formation.md), and [inflation-model](../../../content/markdown/aaa/cosmology/inflation-model.md) as the shared pre-BBN / BBN / CMB handoff.

## Source-Mined Benchmark Contracts

The CMB / BAO / low-redshift source family should now be treated as a contract over observable residual coordinates rather than as a loose narrative comparison. The shared medium-state candidate is

$$
\theta_{\mathrm{sea}}
=
\left(
\theta_{\mathrm{clock}},
\theta_{\mathrm{prop}},
\theta_{\mathrm{thermal}},
\theta_{\mathrm{bundle}},
\theta_{\mathrm{ac}},
\theta_{\mathrm{growth}},
\theta_{\mathrm{frame}}
\right),
$$

where the entries denote, respectively, endpoint clock cadence, path-history propagation, pre-free-streaming thermalization, transparent-path coherent photon-channel bundle transport, acoustic-standard-ruler calibration, growth/lensing response, and frame/direction structure. These are comparison coordinates for closure work, not new ontology. A cosmology branch is admissible only when the same $\theta_{\mathrm{sea}}$ supplies every row below within the declared covariance model.

| Source family | Data-product handles | Contract for $\mathbb{A}\mathbb{A}\mathbb{A}$ closure |
| --- | --- | --- |
| Planck Legacy Archive / NASA LAMBDA | CMB frequency maps, component-separated CMB maps, TT/TE/EE spectra, likelihoods, lensing-potential maps, $C_{L}^{\phi\phi}$ likelihoods, parameter chains | Compute $C_\ell^{\mathrm{TT}}$, $C_\ell^{\mathrm{TE}}$, $C_\ell^{\mathrm{EE}}$, $C_{L}^{\phi\phi}$, acoustic scale, blackbody preservation, and foreground/calibration nuisance rows from one thermalization and transfer record. Do not absorb CMB lensing mismatch into a separate growth state. |
| ACT DR6 | High-$\ell$ TT/TE/EE spectra, covariance matrices, power-spectrum likelihoods, CMB lensing likelihood bandpowers and covariances | Cross-check Planck-derived transfer and lensing rows with an independent ground-based high-resolution CMB packet. ACT can strengthen or falsify small-scale damping, foreground, and lensing-amplitude projections without changing the CMB ontology. |
| ACT kSZ force-law profile / SDSS halos | ACT CMB intensity maps, Sloan Digital Sky Survey halo catalogue, mean pairwise velocity estimator, separation window $30$--$230\,\mathrm{Mpc}$, and fitted force-law index $n_{\mathrm{kSZ}}^{\mathrm{obs}}=2.1\pm0.3$ from [arXiv:2604.14327](https://arxiv.org/abs/2604.14327) | Treat kSZ pairwise velocities as a direct growth-and-force-law profile benchmark. A cosmology branch may use medium response or neutral-assembly loading, but on this window its projected halo acceleration must remain close to $g(r)\propto r^{-2}$ unless the same record also fits the kSZ covariance. A MOND-like $n\simeq1$ large-scale branch fails this row unless its low-acceleration modification is screened or confined away from the ACT/SDSS halo-pair window. |
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
+\mathcal{R}_{\mathrm{SN}/H_0}
+\mathcal{R}_{\mathrm{WL}/\mathrm{RSD}}
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

The first four terms measure ordinary disagreement with survey data products. The final term is the ontology-split witness: it fails a branch that fits Planck, ACT, DESI, SH0ES/Pantheon+, and DES only by assigning incompatible Noether sea projections to different observable families.

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
r_{\mathrm{SN}/H_0}
\supset
\left(
\frac{\boldsymbol\mu^\theta-\boldsymbol\mu^{\mathrm{obs}}}{\boldsymbol\sigma_\mu},
\frac{H_{\mathrm{eff,ladder}}^\theta-H_{0,\mathrm{ladder}}^{\mathrm{obs}}}{\sigma_{H_0}},
\frac{\Delta_{\mathrm{cal}}^\theta}{\sigma_{\mathrm{cal}}}
\right).
$$

For DES- and RSD-facing growth,

$$
r_{\mathrm{WL}/\mathrm{RSD}}
\supset
\left(
\frac{S_8^\theta-S_8^{\mathrm{obs}}}{\sigma_{S_8}},
\frac{f\sigma_8^\theta(z,k)-f\sigma_8^{\mathrm{obs}}(z,k)}{\sigma_{f\sigma_8}},
\frac{\boldsymbol\xi_{\pm}^\theta-\boldsymbol\xi_{\pm}^{\mathrm{obs}}}{\boldsymbol\sigma_{\xi}}
\right).
$$

For kSZ force-law-profile rows, define the projected halo-pair acceleration over the ACT/SDSS separation window $W_{\mathrm{kSZ}}=[30,230]\,\mathrm{Mpc}$ by fitting

$$
g_\theta(r)\big|_{W_{\mathrm{kSZ}}}
\propto
r^{-n_\theta}.
$$

The corresponding residual is

$$
r_{\mathrm{kSZ}\text{-}force}
=
\frac{n_\theta-n_{\mathrm{kSZ}}^{\mathrm{obs}}}{\sigma_{n,\mathrm{kSZ}}}
+
\lambda_{\mathrm{shared}}
d_{\mathrm{shared}}\!\left(
\Pi_{\mathrm{kSZ}}\theta_{\mathrm{sea}},
\Pi_{\mathrm{WL}/\mathrm{RSD}}\theta_{\mathrm{sea}}
\right),
\qquad
n_{\mathrm{kSZ}}^{\mathrm{obs}}=2.1,\quad
\sigma_{n,\mathrm{kSZ}}=0.3.
$$

This is a success marker under the existing growth/lensing closure family, not a new obligation artifact. It records that a branch fitting galaxy-scale MOND-like residuals must still recover an inverse-square large-scale halo acceleration profile from the same Noether sea and neutral-assembly state used for CMB lensing, weak lensing, redshift-space distortions, and halo statistics.

These rows are benchmark contracts. They do not say that Planck, DESI, SH0ES, Pantheon+, DES, ACT, or Euclid variables are substrate variables. They say which observer-level products a Noether sea transfer-function branch must reproduce without splitting its medium-state record.

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
