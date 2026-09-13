# Hubble and $S_8$ Tensions

The Hubble constant $H_0$ describes the present expansion rate in standard cosmology, while $S_8$ summarizes the amplitude of matter clustering. Different observations infer these quantities through different models and calibrations. This chapter examines the hypothesis that discrepancies between selected inferences share a cause in the evolution of the Noether sea, the ambient population of neutral architrino assemblies described in [Noether Sea](../spacetime/noether-sea.md). It supplies comparison definitions and consistency tests; it does not establish that relaxation explains either discrepancy.

The coupled reconstruction is developed through [Cosmology Ontology](cosmology-ontology.md), [Expansion Mechanism](expansion-mechanism.md), [Structure Formation](structure-formation.md), [CMB](CMB.md), [Dark Matter](dark-matter.md), and [Dark Energy](dark-energy.md).

## Tension Meanings

- **$H_0$ tension:** disagreement between estimates of the present expansion rate, such as a prediction from cosmic microwave background (CMB) observations under a specified cosmological model and a locally calibrated distance ladder. The early-inferred quantity is a present-epoch prediction, not the expansion rate at the epoch of CMB emission. A corrected photon-transfer slope in this chapter is a proposed alternative interpretation whose relation to those estimates must be derived.
- **$S_8$ tension:** a dataset- and model-dependent discrepancy in the inferred present clustering combination $S_8=\sigma_8\sqrt{\Omega_m/0.3}$. Here $\sigma_8$ is the root-mean-square linear matter-density contrast averaged within a spherical top-hat of effective comoving radius $8h^{-1}\,\mathrm{Mpc}$, $h=H_0/(100\,\mathrm{km\,s^{-1}\,Mpc^{-1}})$, and $\Omega_m$ is the present matter-density fraction in that comparison model. A lower central value alone does not establish a statistically significant inconsistency.

## $\mathbb{A}\mathbb{A}\mathbb{A}$ Interpretation

- $H_0$ is read through inhomogeneous medium evolution and region-dependent effective histories.
- $S_8$ is read through growth behavior in baryonic and neutral assembly sectors with medium-coupled dynamics.

The proposed transfer coefficient follows [Expansion Mechanism](expansion-mechanism.md#distance-and-effective-hubble-coefficient). It measures corrected log-redshift per Euclidean path distance, multiplied by an observer speed calibration. The [Euclidean void](../foundations/euclidean-void.md) is the fixed spatial container, and [absolute time](../foundations/absolute-time.md) is its universal evolution parameter $T$; physical clock readings and luminosity distances require assembly and signal maps. Consequently this spatial slope is not automatically $a_{\mathrm{eff}}^{-1}da_{\mathrm{eff}}/dt_{\mathrm{eff}}$, the temporal rate of an effective scale $a_{\mathrm{eff}}$ in an observer chart with time $t_{\mathrm{eff}}$.

The Sunyaev-Zeldovich effects illustrate one observational complication: scattering by hot or moving electrons changes the CMB spectrum or its directional temperature signal. Spectral redistribution by scattering is not in general a single coherent frequency multiplier and does not establish a Noether sea redshift mechanism. For a channel in which a scalar frequency-transfer description is valid, define the signed propagation slope by

$$
H_{\mathrm{eff},X}(D,\hat{\mathbf{k}})
=
c_0\,
\partial_D Z_{\mathrm{prop},X}(D,\hat{\mathbf{k}})
$$

[View →](../../../../equation-mapping.html#corpus-equation-e55662180c01fb8b)

Here $X$ labels a specified source spectral channel, $\hat{\mathbf k}$ points from source to receiver, $D$ is Euclidean path length, and $R$ denotes a fixed reception event. The derivative compares a smooth family of paths ending at $R$, with source, endpoint-clock, and motion corrections declared. The dimensionless $Z_{\mathrm{prop},X}$ is defined below. The positive speed $c_0$ is an observer calibration, distinct from the primitive wake speed $c_f$ and photon transport speed $c_\gamma$. Positive and negative slopes represent redward and blueward residual accumulation, respectively. Either physical interpretation requires compatible flux, arrival-time dilation, angular distance, and spectral predictions.

The present local coefficient is the zero-distance limit of this function:

$$
H_{0,\mathrm{eff},X}(R,\hat{\mathbf{k}})
=
c_0\,\alpha_{R,X}(\hat{\mathbf{k}})
$$

[View →](../../../../equation-mapping.html#corpus-equation-bb0591aa65cf2fba)

The coefficient $\alpha_{R,X}=\partial_D Z_{\mathrm{prop},X}|_{D=0}$ has inverse-length units. For $Z_{\mathrm{prop},X}(0)=0$ and a smooth curve, $Z_{\mathrm{prop},X}=\alpha_{R,X}D+\mathcal K_XD^2/2+O(D^3)$, where $\mathcal K_X=\partial_D^2Z_{\mathrm{prop},X}|_{D=0}$ has inverse-length-squared units. A finite-distance derivative is $\alpha_{R,X}+\mathcal K_XD+O(D^2)$, whereas a secant fit gives $Z_{\mathrm{prop},X}/D=\alpha_{R,X}+\mathcal K_XD/2+O(D^2)$. Different survey depths can therefore produce different fitted slopes even for one curve. Comparing pipelines requires the same distance definition, epoch, and declared curvature treatment.

The environment-conditioned version should remain directional until the data justify an isotropic scalar:
$$
H_{\mathrm{eff},X}^{\mathcal E}(D,\hat{\mathbf{k}})
=
c_0\,\partial_D Z_{\mathrm{prop},X}^{\mathcal E}(D,\hat{\mathbf{k}})
$$

[View →](../../../../equation-mapping.html#corpus-equation-77f839463513e38c)

Here $\mathcal E$ denotes a source, host, line-of-sight, and observer-environment class; $E$ below remains the emission event. The class definition, sampling weights, and selection corrections are held fixed or modeled when differentiating. Baryon acoustic oscillations (BAO) supply a distance-to-ruler comparison, while CMB and growth observations constrain other projections of the same sea history. Deriving nonzero environmental scatter does not make a coefficient universal. A scalar summary needs a specified averaging measure and uncertainty, or a bound showing that directional and environmental differences are negligible for the stated application.

Gravitational-wave standard sirens infer distance from a modeled wave amplitude and supply a different instrumental channel from a photon distance ladder. A gravitational-wave transient catalogue (GWTC) analysis combines calibrated strain with redshift information from a counterpart, host association, or a source-population model. Its distance depends on waveform physics, source orientation, selection, and gravitational-wave propagation; shared hosts and redshifts can correlate it with other channels. The corresponding amplitude, detector, and propagation recovery remains an additional obligation in $\mathbb{A}\mathbb{A}\mathbb{A}$. No independent sea distance measurement follows merely from naming this technique.

For the factorization in Expansion Mechanism, let $\Gamma_{N,E}$ and $\Gamma_{N,R}$ be positive inverse sea-cadence factors at emission and reception, normalized to one common reference. Let $B_X(E)$ be the positive source-transition frequency ratio after cadence normalization, and let $D_v$ be the positive launch-motion frequency factor; an approaching source has $D_v>1$ in the weak-motion comparison. Let $\mathcal P_{E\to R}$ be the inverse frequency-transfer factor along the path. Assuming $1+z_X=(\Gamma_{N,E}/\Gamma_{N,R})\mathcal P_{E\to R}/[B_X(E)D_v]$ gives

$$
Z_{\mathrm{prop},X}
=
\ln(1+z_X)
-\ln\Gamma_{N,E}
+\ln\Gamma_{N,R}
+\ln B_X(E)
+\ln D_v
$$

[View →](../../../../equation-mapping.html#corpus-equation-806551d1c46982f5)

Thus $Z_{\mathrm{prop},X}=\ln\mathcal P_{E\to R}$ under the stated factorization; the signs follow by taking its logarithm. The extraction of matter-clock factors from sea cadence is a constitutive requirement, not a definition of a physical clock. Source, endpoint, motion, and path terms are not individually identifiable from one measured redshift: multiplying $B_X$ and $\mathcal P$ by the same positive factor leaves $z_X$ unchanged. Independent calibration or a jointly constrained forward model is therefore required, with correction uncertainty propagated into the slope.

The comparison with inhomogeneous or timescape interpretations concerns environment-dependent clock calibration. It does not import those models' field equations or establish their recovery from the Noether sea.

## Unified Mechanism

The proposed common process is non-uniform Noether sea relaxation, meaning evolution of its density, delay, flow, and assembly response. Its cosmological effect requires constitutive laws connecting that history to measured signals and clustering.

For $H_0$:

- early-data inference constrains a history and predicts a present-epoch coefficient;
- local ladders sample sources and paths in late environments whose relaxation and clock responses must be derived from that same history.

This mechanism has a required sign, not merely a tunable magnitude. Define

$$
\Delta H_{\mathrm{relax}}
\equiv
H_{\mathrm{eff,local}}
-
H_{\mathrm{eff,early}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-50fbceb5fbf52932)

Both terms denote the present coefficients returned by the specified local and early-data inference procedures, using matched calibrations; the second is not $H$ at last scattering. For the historical Planck–SH0ES comparison below, a relaxation-only account needs a positive total offset of the observed magnitude within the joint uncertainty. A nonpositive offset fails that particular explanation, while a positive but arbitrarily small value is insufficient. If relaxation is one of several physical contributions, its sign alone does not decide the total prediction.

For $S_8$:

- baryonic and neutral-assembly sectors do not need to co-evolve identically at late times,
- positive drag can suppress a growing mode in a specified effective perturbation equation with otherwise matched coefficients and initial data; the needed coefficient, momentum/energy exchange, and background response still require derivation.

Shared sea evolution connects background and growth only through such response laws. The neutral assembly population, its persistence, and the resulting matter and lensing transfers remain physical hypotheses here.

### Chronometer, BAO, and Supernova Discriminator

Differential-age cosmic chronometers compare stellar ages in selected galaxy populations. Their standard estimator has different calibration sensitivity from BAO rulers and supernova (SN) luminosity distances:

$$
H_{\mathrm{chron}}^{\mathrm{obs}}(z)
=
-\frac{1}{1+z}\frac{dz}{dt_{\mathrm{age}}}
$$

[View →](../../../../equation-mapping.html#corpus-equation-cc7ebc4b1fe74e78)

Here $t_{\mathrm{age}}$ is inferred stellar age, not absolute time. In the standard comparison, $1+z=a_{\mathrm{eff}}(t_{\mathrm{eff,obs}})/a_{\mathrm{eff}}(t_{\mathrm{eff,emit}})$ and matched formation times imply $dt_{\mathrm{age}}=dt_{\mathrm{eff,emit}}$, yielding $H_{\mathrm{chron}}=H(t_{\mathrm{eff,emit}})$. More generally, if $dt_{\mathrm{age}}=A_{\mathrm{age}}\,dT_{\mathrm{emit}}$, then $H_{\mathrm{chron}}=-A_{\mathrm{age}}^{-1}d\ln(1+z)/dT_{\mathrm{emit}}$ along the selected source family at fixed observation event. Age calibration, population selection, formation-time differences, endpoint clocks, and path transfer all enter this derivative. For one shared history $\theta$, retain the three predicted estimator outputs

$$
\mathbf H^\theta(z)
=
\left(
H_{\mathrm{chron}}^\theta,
H_{\mathrm{BAO}}^\theta,
H_{\mathrm{SN}}^\theta
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-771efd562842152a)

and their joint uncertainty. These outputs need explicit calibrations: radial BAO primarily measures $D_H/r_d$, with $r_d$ the acoustic ruler at baryon drag, while uncalibrated SN fluxes determine relative luminosity distances and have an absolute-luminosity degeneracy with $H_0$. Recovering an $H_{\mathrm{BAO}}$ or $H_{\mathrm{SN}}$ therefore requires ruler or luminosity calibration and a distance/clock model. The three numbers are not automatically direct measurements of one temporal rate. Their predicted residual pattern tests the shared interpretation only after these dependencies and correlations are included.

## Coupled Interpretation Channels

For $H_0$:

- local Noether sea state inhomogeneity (including void-like environments) can bias local-ladder inference relative to early-time inference,
- late-time medium transition channels can shift low-$z$ inference without reintroducing ontology splits.
- environment-conditioned scatter is predicted only when the derived transfer response retains the relevant gradients after averaging and calibration.
- correlation between local inferred-$H$ scatter and bulk-flow/environment indicators is a candidate discriminator whose amplitude and angular pattern require a specific response model.
- the CMB-frame correction used in local-ladder and supernova pipelines must be tested against matter-dipole and bulk-flow residuals rather than assumed to erase all direction dependence.
- the quadratic term in the local redshift-transfer curve should be fitted or bounded before a local distance-ladder slope is promoted to a universal coefficient.

For $S_8$:

- scale-dependent medium response and partial sector coupling can reduce late-time growth amplitude,
- growth suppression mechanisms must remain consistent with CMB-derived early-time loading.

## BAO Data-Product Gate

The Dark Energy Spectroscopic Instrument (DESI) measures BAO from spatial correlations of tracers. Its DR2 analysis reports a preference for a time-dependent dark-energy equation of state in specified BAO+CMB and BAO+CMB+SN combinations; the significance depends on the SN sample. This is an observer-model fit comparison. The common parameterization is $w(a_{\mathrm{eff}})=w_0+w_a(1-a_{\mathrm{eff}})$, where $w$ is effective pressure divided by energy density. It supplies neither a substrate law nor an automatic resolution of the Hubble tension. Each comparison must identify the release, likelihood, covariance, tracer bins, and combination rule, keeping weak-lensing and redshift-space distortion (RSD) growth measurements distinct. RSD uses the anisotropy introduced by peculiar velocities in redshift-derived positions and commonly constrains $f\sigma_8$. The operational requirements live in [Cosmology Shared Residual Fit](../validation/simulations/cosmology-shared-residual-fit.md).

Two useful comparison routes are changes to late-time distance evolution and changes to the acoustic ruler inferred from early physics. Neither describes every proposed resolution. In the standard acoustic interpretation, the CMB angular scale is approximately $r_*/D_M(z_*)$, where $r_*$ is the sound horizon at photon last scattering; the BAO ruler $r_d$ is evaluated at the distinct baryon-drag epoch. A candidate may change both rulers and the distance map, provided one history predicts them jointly. Incompatible independent calibrations constitute a failure; changing two compatible outputs does not. Neutrino-mass limits likewise depend on the specified cosmological model and data combination and cannot by themselves identify a neutral architrino assembly. The source note below identifies the DESI DR2 comparison supporting these observational qualifications.

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

[View →](../../../../equation-mapping.html#corpus-equation-06c9a134aa9ebba0)

without assigning separate Noether sea states to each inference pipeline. If the preferred $w(a)$ trend requires one state for distance data and another for growth, the cosmology branch has only hidden the tension.

This is the local form of the shared calibration gate in [Dark Energy](dark-energy.md#inference-dependency-and-calibration-gates). Each $\mathcal C$ is a preimage in one common admissible history-and-calibration space: $\mathcal C_i=\{\theta:\Pi_i(\theta)\in A_i\}$, where $\Pi_i$ predicts the corresponding data and $A_i$ is its declared acceptance region. The shared part $\theta_{\mathrm{sea}}$ describes the sea history; instrument nuisance parameters remain instrument-specific with their stated priors. Nonempty intersection is a necessary compatibility condition, not a proof of a physical branch or a calibrated joint goodness of fit. Correlated observations and model flexibility must be assessed jointly.

The following historical benchmarks specify the comparison rather than asserting a timeless consensus:

| Observable pressure | Typical data-product comparison | $\mathbb{A}\mathbb{A}\mathbb{A}$ reading |
| --- | --- | --- |
| Early CMB inference | Planck 2018 base-$\Lambda\mathrm{CDM}$ inference gives $H_0=67.4\pm0.5\ \mathrm{km\,s^{-1}\,Mpc^{-1}}$ and $\sigma_8=0.811\pm0.006$ at 68% confidence; with its matter fraction the central $S_8$ is about $0.83$, not $0.81$. | CMB spectra and lensing constrain acoustic, thermalization, damping, and lensing transfers. A comparison with another CMB instrument must account for shared sky signal and calibration dependence. |
| Local distance ladder | Riess and collaborators' 2022 SH0ES Cepheid/SN analysis with Pantheon+ gives $H_0=73.04\pm1.04\ \mathrm{km\,s^{-1}\,Mpc^{-1}}$, including its systematic error treatment. | Relating this fitted coefficient to $H_{0,\mathrm{eff},X}$ requires a derived luminosity-distance map and independently constrained source, endpoint, motion, and path corrections. |
| BAO standard ruler | DESI BAO reports dimensionless $D_M/r_d$, $D_H/r_d$, or $D_V/r_d$ by tracer and effective redshift. $D_M$ is transverse comoving distance, $D_H=c_0/H$ is the radial distance scale in the standard effective chart, and $D_V=[zD_M^2D_H]^{1/3}$ is its isotropic combination. | BAO constrains distances jointly with $r_d$. CMB and BAO use the same underlying history but distinct last-scattering and drag-epoch rulers. Their compatible simultaneous change is allowed. |
| Late growth | DES Year-3 3$\times$2pt combines image-shear correlations, galaxy clustering, and their cross-correlation. Its flat-$\Lambda\mathrm{CDM}$ fit gives $S_8=0.776\pm0.017$ and reports consistency with Planck at probability-to-exceed $p=0.13$–$0.48$ under its tests. | A lower central value is a comparison pressure whose significance depends on the full fit. Lensing also depends on distance kernels, intrinsic alignments, and the matter-to-lensing-potential map. |
| Euclid readiness | Q1 (2025) and Q2 (2026) are quick data releases; Q2 concerns the Galactic Bulge Survey. Release documentation, rather than catalogue availability, determines whether a cosmological likelihood is supplied. | These quick releases do not supply an $S_8$ or BAO likelihood for this comparison. An additional cosmology result requires its own sample, calibration, and covariance before inclusion. |

The benchmark values are observer-level inferences in specified $\Lambda\mathrm{CDM}$-era models, where $\Lambda$ represents a cosmological constant and CDM cold dark matter. They are not raw data to impose unchanged on an alternative transfer law. A Noether sea comparison requires forward predictions for the relevant spectra, fluxes, angular correlations, and calibration observations through the same likelihoods. All quoted dimensional measurements retain their original observer units; any new substrate numerical calculation uses $c_f=1$ without equating it to $c_0$.

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

[View →](../../../../equation-mapping.html#corpus-equation-44567cb1d0a3d6fa)

Here $\mathbf b_{\mathrm{BAO}}(z_i)$ contains the reported distance ratios and $\mathbf C_{\mathrm{BAO},i}$ their positive-definite covariance. The displayed sum applies only to independent data blocks with fixed covariance; correlated bins, overlapping surveys, and reused CMB or SN information require one joint likelihood. For a Gaussian residual vector $\mathbf r=\mathbf y^\theta-\mathbf y^{\mathrm{obs}}$, the quadratic term is $\mathbf r^\mathsf{T}\mathbf C^{-1}\mathbf r$ with the full covariance; a parameter-dependent covariance also requires its log-determinant term relative to a fixed reference. Derived $H_0$, $S_8$, or $f\sigma_8$ summaries must not be counted again as independent data when their source observations are already used.

All $\mathcal R$ terms are dimensionless, and the nonnegative weight $\lambda_{\mathrm{split}}$ and dimensionless compatibility discrepancy $\mathcal P_{\mathrm{proj}}$ must be specified before fitting. A finite penalty can discourage inconsistent independently fitted histories but cannot forbid them. The accepted model must enforce one shared history and equality of any duplicated physical quantities, exactly or within a declared numerical tolerance. With one history and compatible forward maps, the compatibility discrepancy is identically zero. These scores define tests; no fitted score is reported here.

## Dipole and Bulk-Flow Diagnostic

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

[View →](../../../../equation-mapping.html#corpus-equation-f85ad00ecc193c9a)

Here $\delta H(z,\hat{\mathbf n})$ is the directional departure from the survey-weighted mean slope, and $\hat{\mathbf n}$ points from observer to source, opposite to photon propagation for a straight ray. The vector $\Delta_{\mathrm{dip}}^X$ is the source-catalogue dipole residual after its stated kinematic and selection subtraction, as defined in [CMB](CMB.md); in this diagnostic the channel label $X$ also identifies the matched tracer selection. The correlation uses a common sky mask and specified weights and is defined only when both weighted variances are nonzero. Sampling errors, shared velocity corrections, shot noise, and calibration covariance enter its uncertainty. Compute the Hubble residual from corrected propagation slopes, for example

$$
\delta H_X(z,\hat{\mathbf{n}})
=
c_0
\left(
\alpha_{\mathcal{E},X}(z,\hat{\mathbf{n}})
-\bar\alpha_X(z)
\right)
$$

[View →](../../../../equation-mapping.html#corpus-equation-1e0fcf7134fab90b)

Here $\alpha_{\mathcal E,X}(z,\hat{\mathbf n})$ is the environment-conditioned mean of the corrected slope, evaluated through the declared redshift/path map; $\bar\alpha_X(z)$ is its mean over the same survey weighting. Neither an emitter-to-receiver direction nor a weighting rule may be changed between the two terms. The sign, magnitude, and angular structure of the correlation require the same sea response used for distance and growth. A statistically adequate null test rejects a model that predicts a detectable dipole correlation, but not every environment-dependent model: an isotropically weighted quadrupolar Hubble residual has zero correlation with a dipole despite nonzero angular variation. Conversely, correlation alone does not identify the sea mechanism. Incompatible shared physical parameters across distance, CMB, BAO, and growth invalidate the proposed common history.

The operational version of this diagnostic is the frame-split packet in [Cosmology Shared Residual Fit Protocol](../validation/simulations/cosmology-shared-residual-fit.md#frame-split-measurement-recipe), where local $H_0$ scatter is tested beside CMB, matter-dipole, supernova, and BAO directional rows.

## Distance-Growth Coupling Residual

The $H_0$ and $S_8$ tests require compatible distance and growth maps from one history. Define luminosity distance by $F=L/(4\pi d_L^2)$ for source bolometric luminosity $L$ and received bolometric flux $F$. For a smooth local relation with $d_L(0)=0$ and positive derivative, write
$$
d_L(z)
=
\frac{c_0}{H_{0,\mathrm{eff}}}
\left[
z+\frac12(1-q_{0,\mathrm{eff}})z^2+O(z^3)
\right]
$$

[View →](../../../../equation-mapping.html#corpus-equation-3cf237f25239d2e6)

This defines $H_{0,\mathrm{eff}}=c_0/d_L'(0)$ and $q_{0,\mathrm{eff}}=1-d_L''(0)/d_L'(0)$ as luminosity-distance coefficients. Identifying the first with the corrected Euclidean transfer slope requires, in particular, $d_L/D\to1$ and vanishing endpoint residuals in the same local calibration. The quadratic coefficient also depends on flux and arrival-rate transfer, not just redshift curvature. Only after an effective homogeneous metric and distance reciprocity are recovered does $q_{0,\mathrm{eff}}$ acquire the usual temporal meaning $-a_{\mathrm{eff}}\ddot a_{\mathrm{eff}}/\dot a_{\mathrm{eff}}^2$, with dots denoting $t_{\mathrm{eff}}$ derivatives.

For scale-independent linear growth, let $D_g(z)$ be the dimensionless growing-mode amplitude with a fixed normalization; the subscript distinguishes it from path distance $D$. Then the observer-level growth summary is
$$
f(z)\sigma_8(z)
=
\frac{d\ln D_g(z)}{d\ln a_{\mathrm{eff}}}\,
\sigma_8(z),
\qquad
S_8=\sigma_8(0)\sqrt{\Omega_{m,0}/0.3}
$$

[View →](../../../../equation-mapping.html#corpus-equation-39420ac076bfa912)

The derivative follows the declared monotone effective scale history; it is not a derivative along an arbitrary line of sight. The variance is an integral over modes: $\sigma_8^2(z)=(2\pi^2)^{-1}\int_0^\infty k^2P_m(k,z)W^2(kR_8)\,dk$, where $P_m$ is the linear matter power spectrum, $R_8=8h^{-1}\,\mathrm{Mpc}$, and $W(x)=3(\sin x-x\cos x)/x^3$ with $W(0)=1$. It therefore has no independent wave-number argument. If growth is scale dependent, use $D_g(k,z)$ and the survey's full velocity, bias, lensing, and window prediction; a single $f\sigma_8$ summary then needs a justified compression. Changing $h$ also changes the smoothing radius, and $\Omega_{m,0}$ must use the same matter inventory and reference-density convention.

A compact shared-state diagnostic, under the independent-block assumption already stated, is
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

[View →](../../../../equation-mapping.html#corpus-equation-abbb0cbc57720547)

Here $\Pi_{\mathrm{dist}}$ and $\Pi_{\mathrm{growth}}$ supply different observable predictions. The function $d_{\mathrm{shared}}$ compares only duplicated physical quantities after mapping them into a common space and dividing by declared positive scales; subtracting a distance prediction from a growth prediction has no meaning. The nonnegative $\lambda_{\mathrm{shared}}$ is a diagnostic weight. A deterioration in one data residual can occur within a valid joint fit and does not prove that histories were split. Resolution requires compatible physical maps and acceptable joint residuals with the observed uncertainty and model complexity accounted for; neither improvement in one component nor a soft penalty establishes it.

## Low-Acceleration Scale Coupling

Modified Newtonian dynamics (MOND) comparison models introduce an acceleration scale below which the relation between baryonic matter and acceleration differs from the Newtonian comparison. An association between such a scale and $c_0H_0$ is a proposed dimensional comparison, not a derivation. It becomes predictive only when the proportionality and environmental response follow from a constrained model rather than an independently adjustable coefficient for every sample.

Let $a_\star(\mathcal E)>0$ denote an observer-level acceleration transition extracted from environment class $\mathcal E$, such as disc galaxies or clusters, with its uncertainty and inference model. Let $H_{\mathrm{eff}}^\theta(t_{\mathrm{eff},\mathcal E})$ be a specified directional or averaged transfer coefficient at the class's effective epoch. A comparison restricted to positive $H_{\mathrm{eff}}^\theta$ and a positive dimensionless coefficient $\alpha_{\mathcal E}$ is

$$
\mathcal{R}_{aH}(\theta_{\mathrm{sea}})
=
\sum_{\mathcal E}
\left|
\ln
\frac{
a_\star(\mathcal E)
}{
\alpha_{\mathcal E} c_0 H_{\mathrm{eff}}^\theta(t_{\mathrm{eff},\mathcal E})
}
\right|
+
\lambda_H\mathcal{R}_{H_0S_8}(\theta_{\mathrm{sea}})
+
\lambda_{\mathrm{cl}}\mathcal{R}_{\mathrm{cl/gal}}(\theta_{\mathrm{sea}})
$$

[View →](../../../../equation-mapping.html#corpus-equation-a4bbdba477cf3dde)

The logarithm acts on a dimensionless positive ratio because $c_0H_{\mathrm{eff}}$ has acceleration units. Zero or negative $H_{\mathrm{eff}}$ lies outside this positive-scale comparison; taking an absolute value inside the logarithm would impose a different hypothesis. The sum is a dimensionless discrepancy, not a calibrated likelihood. A statistical test needs the uncertainties and covariance of the logarithmic ratios, and the nonnegative weights $\lambda_H$ and $\lambda_{\mathrm{cl}}$ must be declared.

The coefficient $\alpha_{\mathcal E}$ must be derived or constrained independently of the same acceleration measurements: a free coefficient per class can set every logarithmic term to zero. The dimensionless $\mathcal R_{\mathrm{cl/gal}}$ tests the predicted relation between galaxy and cluster responses. Distinct thresholds are allowed when the same history and response law predict the difference. Inconsistency arises when each environment needs an incompatible law or independently chosen history, not merely because its measured threshold differs.

## Cross-Module Interface

In the modular cosmology map, this document is the coupling layer between:

- expansion-module outputs ([expansion-mechanism.md](./expansion-mechanism.md)) that shape inferred $H_0$,
- growth-module outputs ([structure-formation.md](./structure-formation.md)) that shape inferred $S_8$,
- shared Noether sea state variables that keep both readouts in one ontology,
- dipole, bulk-flow, and calibration residuals that test whether the same Noether sea state explains local and early-inferred cosmology.

## Coherent Reading

The common-history interpretation proposes that selected $H_0$ and $S_8$ discrepancies are linked observer-level outputs of medium relaxation and coupling in $\mathbb{A}\mathbb{A}\mathbb{A}$. The definitions and conditional identities above make that proposal testable. A physical sea population, its constitutive evolution, photon and gravitational-wave transfer, clock and luminosity calibration, and a joint distance–growth fit remain unestablished here.

For a broader diagnosis of anomaly clustering versus ontology splitting, compare [Crisis in Physics](../philosophy-history/crisis-in-physics.md).

Source note: the historical comparison table uses Planck Collaboration, *Planck 2018 results. VI. Cosmological parameters* (2020), [arXiv:1807.06209](https://arxiv.org/abs/1807.06209), for the base-model present-epoch parameters; Riess and collaborators, *A Comprehensive Measurement of the Local Value of the Hubble Constant* (2022), [arXiv:2112.04510](https://arxiv.org/abs/2112.04510), for the calibrated SH0ES result; and DES Collaboration, *Dark Energy Survey Year 3 Results: Cosmological Constraints from Galaxy Clustering and Weak Lensing* (2022), [arXiv:2105.13549](https://arxiv.org/abs/2105.13549), for the 3$\times$2pt amplitude and its Planck consistency assessment. DESI Collaboration, *DESI DR2 Results II: Measurements of Baryon Acoustic Oscillations and Cosmological Constraints* (2025), [arXiv:2503.14738](https://arxiv.org/abs/2503.14738), supports the release-specific distance and equation-of-state comparison. The [ESA Euclid release timeline](https://www.cosmos.esa.int/web/euclid/timeline) and [Euclid Consortium Q2 description](https://www.euclid-ec.org/science/q2/) identify the quick-release scope. These sources constrain observer-level comparisons; none establishes the Noether sea interpretation.
