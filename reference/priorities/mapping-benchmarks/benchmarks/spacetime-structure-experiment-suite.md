# Experimental Probes Of Effective Spacetime Structure

## Purpose And Claim Boundary

This packet distinguishes experiments that reconstruct parts of Einsteinian spacetime from experiments that search for a deeper structure beneath that effective description. The first group constrains local metric behavior, propagating gravitational disturbances, or global observer-chart topology. The second group searches for model-specific correlated displacement fluctuations or tests whether an effective gravitational interaction can mediate entanglement. These are not interchangeable measurements of one object.

For $\mathbb{A}\mathbb{A}\mathbb{A}$, spacetime is an observer-level effective description. The Euclidean void and absolute time remain substrate ontology, while the Noether sea and its delayed path-history response must recover the metric, clock, ruler, photon, and gravitational-wave records that embedded observers describe geometrically. No experiment in this packet directly images the Noether sea. Each constrains only the projection that its source, propagation path, apparatus, and reconstruction pipeline can expose.

The source and status statements below are measured or proposal-level according to the named publication. The mathematical bridges are inferred benchmark specifications: they define what a candidate $\mathbb{A}\mathbb{A}\mathbb{A}$ carrier would have to calculate, but they are not derived Noether-sea laws. No native carrier, accepted constitutive response, benchmark verdict, queue status, or reader-facing claim is produced here.

## Experiment Landscape

The source status was checked on 2026-09-05.

| Probe | Status and retained record | Structural question it can constrain | What it cannot establish | Existing owner |
| --- | --- | --- | --- | --- |
| GQuEST | Under construction; the published design uses tabletop Michelson interferometry and photon-counting readout to search for fluctuations predicted by geontropic models. | Whether the declared model produces the predicted instrument-specific correlated optical signal above the achieved noise floor. | A null result cannot exclude all quantum, emergent, or Noether-sea structures; a signal cannot identify a substrate until environmental, optical, and competing-model transfer functions are separated. | This packet's correlated-response bridge; the accepted constitutive carrier required by `XTM-004`; finite-window measure discipline shared with `XTM-009`. |
| Fermilab Holometer | Completed measurements from two colocated, independent 40 m Michelson interferometers constrained a family of spatial shear-noise correlations through MHz cross-spectra. | Existing upper limits on the shear-symmetric cross-spectrum for the published apparatus geometry and frequency band. | The result does not reject every holographic, emergent-spacetime, or Noether-sea model; it rejects or bounds only models whose response projects into the measured channel. | This packet's correlated-response bridge; weak homogeneous controls in [Lorentz-Invariance Test Suite](lorentz-invariance-test-suite.md). |
| LIGO-Virgo-KAGRA gravitational-wave tests | GWTC-4.0 parameterized tests use 42 confident O4a signals and 49 earlier signals; the cited analysis reports no overall evidence for non-GR generation or dispersive or birefringent propagation. | Effective waveform generation, polarization, dispersion, birefringence, line-of-sight acceleration, and photon/gravitational-channel speed consistency. | Agreement with GR waveforms does not show that the Euclidean void is a metric substrate or select one microscopic Noether-sea mechanism. | `XTM-005` in [Gravitational Waves](gravitational-waves.md) and the speed row in [Lorentz-Invariance Test Suite](lorentz-invariance-test-suite.md). |
| High-energy photon timing and polarization | CTAO plans higher-sensitivity searches for energy-dependent photon delays; any existing photon timing or polarization bound enters only through a separately versioned source packet. | Weak-propagation energy dependence, polarization splitting, and preferred-frame leakage after source-emission lags are carried explicitly. | Arrival-time differences do not become propagation measurements when intrinsic source timing is unconstrained, and a null result does not determine the medium's microscopic constituents. | `XTM-002` in [Lorentz-Invariance Test Suite](lorentz-invariance-test-suite.md); strong-loading polarization in [Strong-Field Electromagnetic Response](strong-field-electromagnetic-response.md). |
| Event Horizon Telescope imaging | Sgr A$^*$ visibility and image reconstructions place the observed ring size within about 10% of Kerr predictions under the collaboration's calibrated Kerr and non-Kerr simulation library. | Strong-field exterior geometry through a joint metric, source-emission, plasma, scattering, visibility, and image-reconstruction model. | The reconstructed ring is not a direct image of either a metric substrate or the Noether sea, and the metric constraint remains conditional on the declared source and transfer model. | The [Horizon-Scale Imaging Benchmark](../../../../content/markdown/aaa/spacetime/black-holes.md#horizon-scale-imaging-benchmark) and [mapping-strong-field](../../mapping-strong-field/priorities.md). |
| Cosmic microwave background topology searches | WMAP and Planck temperature data show no matched-circle pairs above noise in the cited analysis, bounding observer-centered short non-contractible loops while leaving broader manifold families allowed. | Global topology of the reconstructed cosmological chart through repeated-pattern and correlation tests. | A local metric test cannot answer this global question, and a topology bound on the observer chart does not determine the topology of the Euclidean void or a local Noether-sea constitutive law. | [mapping-cosmology](../../dormant-deferred/mapping-cosmology/priorities.md) and the observer-access reconstruction problem. |
| Gravity-mediated entanglement proposals | Current proposals seek an entanglement witness between separated mesoscopic masses after non-gravitational couplings and decoherence are suppressed; the cited 2025 paper is a pathway and feasibility program, not a positive detection. | Whether the effective gravitational channel can carry the nonclassical correlations required by the declared witness and controls. | Even a successful witness would not uniquely prove discrete spacetime, fundamental gravitons, or a Noether sea; a null run may reflect decoherence or insufficient coupling rather than classical gravity. | [Massive-Superposition Gravity Validation Packet](../../../../content/markdown/aaa/validation/massive-superposition-gravity.md) and [mapping-quantum](../../mapping-quantum/priorities.md). |
| Magnetar polarization | IXPE, NICER, and Parkes polarization records provide a strong-background, polarization-resolved propagation benchmark with model-dependent vacuum-birefringence interpretation. | Whether the same constitutive record that passes weak-propagation nulls develops the required strong-loading eigenchannel split and Stokes transport. | The observations do not by themselves establish a crystalline vacuum or identify Noether-sea constituents. | `XTM-006`, [Strong-Field Electromagnetic Response](strong-field-electromagnetic-response.md), and the [vacuum-birefringence source map](../../source-mining/analysis/vacuum-birefringence-noether-sea-constitutive-map.md). |

## Bridge One: Experiments Determine An Identifiability Class

Let $a$ label an experiment, $\nu_a$ its calibrated nuisance and reconstruction record, $\mathcal{P}_a$ the projection from the shared closure record $\Theta_{\mathrm{map}}$ into the effective quantity seen by that experiment, and $\mathcal{D}_a$ its detector map. The predicted record is

$$
\mathbf y_a^{\mathbb{A}\mathbb{A}\mathbb{A}}
=
\mathcal{D}_a\!\left[
\mathcal{P}_a(\Theta_{\mathrm{map}}),
\nu_a
\right].
$$

A source-bound normalized residual can then be written

$$
R_a(\Theta_{\mathrm{map}},\nu_a)
=
\frac{
\left\|
W_a\!\left(
\mathbf y_a^{\mathrm{obs}}
-
\mathbf y_a^{\mathbb{A}\mathbb{A}\mathbb{A}}
\right)
\right\|_2
}{
\sqrt{N_a}+\varepsilon_a
},
$$

where $W_a$ is fixed from the published covariance or noise model before the candidate is fitted, $N_a$ is the number of declared comparison degrees of freedom, and $\varepsilon_a$ protects only the numerical denominator. The experiment-specific acceptance rule must state the allowed residual distribution or threshold; the formula alone does not define a pass.

For an experiment set $\mathcal E$, define observational equivalence by

$$
\Theta
\sim_{\mathcal E}
\Theta'
\quad\Longleftrightarrow\quad
\mathcal{D}_a[\mathcal{P}_a(\Theta),\nu_a]
=
\mathcal{D}_a[\mathcal{P}_a(\Theta'),\nu_a]
\quad
\text{for every }a\in\mathcal E
$$

within the declared uncertainties. The experiment suite determines at most an equivalence class $[\Theta]_{\mathcal E}$, not a unique substrate state. Adding instruments helps only when their projection kernels are sufficiently independent to split an existing equivalence class. EHT imaging, gravitational-wave propagation, photon timing, correlated interferometers, topology searches, and entanglement witnesses are valuable together precisely because they expose different projections.

This bridge is falsifiable in two directions. A candidate branch fails when no single $\Theta_{\mathrm{map}}$ passes the accepted residuals without undeclared case-specific coefficients. A claim of unique substrate identification fails when a distinct $\Theta'$ remains observationally equivalent across the declared suite.

## Bridge Two: Correlated Interferometers Test A Projected Sea Response

For two interferometers, let $C_i$ record arm geometry, orientation, optical configuration, readout, and calibration. A candidate shared effective displacement channel $q_A$ gives

$$
\widetilde y_i(f)
=
H_i^{A}(f;C_i)\,\widetilde q_A(f;\Theta_{\mathrm{map}})
+
\widetilde n_i(f),
$$

where $H_i^A$ is the independently specified instrument transfer kernel and $\widetilde n_i$ contains apparatus and environmental noise. The predicted cross-spectrum is

$$
S_{12}^{\mathbb{A}\mathbb{A}\mathbb{A}}(f)
=
H_1^{A}(f;C_1)
K_{AB}^{\mathrm{sea}}(f;\Theta_{\mathrm{map}})
H_2^{B*}(f;C_2).
$$

Here $K_{AB}^{\mathrm{sea}}$ is an effective finite-run covariance or cross-spectral kernel exported by one resolved Noether-sea history ensemble. It need not be primitive randomness; it may summarize unresolved deterministic boundary histories, provided the ensemble, window, and access region are declared.

For a preregistered band $\mathcal B$, use

$$
R_{12}^{2}
=
\frac{1}{|\mathcal B|}
\sum_{f\in\mathcal B}
\frac{
\left|
S_{12}^{\mathrm{obs}}(f)
-
S_{12}^{\mathbb{A}\mathbb{A}\mathbb{A}}(f)
\right|^2
}{
\sigma_{12}^{2}(f)
}.
$$

The minimum control record includes signal and null readout channels where the apparatus provides them, arm orientation, baseline and overlap geometry, environmental witnesses, calibration injections, time slides or other independently specified accidental-correlation estimates, and the exact analysis window. The sea spectrum and the instrument transfer kernel may not be co-fitted freely from the same cross-spectrum.

This is the most direct new bridge for $\mathbb{A}\mathbb{A}\mathbb{A}$. The existing Holometer data can reject any candidate $K_{AB}^{\mathrm{sea}}$ whose projected shear-symmetric spectrum exceeds the published limit. The GQuEST geometry can then forecast the response of the surviving same-record candidates. A Holometer null is not a model-independent null for the Noether sea because a different tensor, correlation length, orientation law, or optical coupling changes $H_1^A K_{AB}^{\mathrm{sea}}H_2^{B*}$; those alternatives must be predicted before examining the target data.

## Bridge Three: One Propagation Operator Across Weak And Strong Regimes

Let $\mathscr D_{AB}^{\mathrm{eff}}(\omega,\mathbf k;\Theta_{\mathrm{map}},B)$ be the observer-level inverse propagation operator for resolved photon-polarization and gravitational-wave response channels, with $B$ a declared background-state record. Its effective modes satisfy

$$
\det \mathscr D_{AB}^{\mathrm{eff}}
\left(
\omega,\mathbf k;
\Theta_{\mathrm{map}},B
\right)
=0.
$$

For mode $r$, the roots $k_r(\omega)$ export

$$
v_{g,r}
=
\left(
\frac{\partial k_r}{\partial\omega}
\right)^{-1},
\qquad
\Delta\phi_{rs}
=
\int_{\gamma}
\left(k_r-k_s\right)\,d\ell,
\qquad
R_{\mathrm{GW}\gamma}
=
\frac{c_{\mathrm{GW}}^{\mathrm{eff}}-c_\gamma}{c_\gamma}.
$$

The operator is a recovery target, not an imported substrate equation. The weak homogeneous background must pass photon timing, birefringence, preferred-frame, and gravitational-wave dispersion and speed rows. The strong magnetar background may then generate a polarization eigenvalue split, but only through an explicit change in the same source and constitutive record. Independent photon, gravitational-wave, and magnetar propagation coefficients would destroy the bridge.

This produces a useful cross-regime test: a candidate sea response that generates an observable Holometer or GQuEST correlation must also be propagated through the clock, ruler, photon, and gravitational-wave detector maps. A microscopic signal is not admissible if the same response leaves forbidden weak-regime dispersion, birefringence, or preferred-frame leakage. Conversely, the weak nulls do not force $K_{AB}^{\mathrm{sea}}=0$; they bound only the parts that project into those channels.

## Orthogonal Projections That Prevent A False Identification

### Horizon-Scale Imaging

EHT data constrain the strong-field transfer map already defined in the [Horizon-Scale Imaging Benchmark](../../../../content/markdown/aaa/spacetime/black-holes.md#horizon-scale-imaging-benchmark). The useful cross-check is whether one strong-field record can supply the effective exterior metric, plasma and polarization transport, visibility data, ring reconstruction, and gravitational-wave/ringdown continuation. Because source emissivity and propagation enter the same image, EHT supplies a conditional metric constraint rather than a direct substrate photograph.

### Global Topology

Matched-circle and harmonic-correlation searches ask whether the observer's cosmological chart contains repeated access paths or global identifications. This information is logically independent of local curvature and local constitutive response. In $\mathbb{A}\mathbb{A}\mathbb{A}$, any positive global-identification signal would have to be reproduced through the observer-access, source-history, horizon, and transport record without reassigning the fixed Euclidean void a compact topology by assertion. A null matched-circle result bounds only the declared topology family and observer location; it is not a local Noether-sea null.

### Gravity-Mediated Entanglement

The [Massive-Superposition Gravity Validation Packet](../../../../content/markdown/aaa/validation/massive-superposition-gravity.md) already owns the branch histories, cross-branch phase, entanglement witness, non-gravitational controls, and gravity-side which-path diagnostic. Its role in this suite is orthogonal to geometry and noise: it tests the information-carrying capacity of the effective gravitational mediator. A positive, controlled witness would reject candidate branches whose gravity-side response is necessarily classical-local and separable, but it would not select a unique microscopic ontology. A negative run cannot adjudicate the mediator until decoherence and coupling sensitivity are independently sufficient.

## First Calculation And Decision Order

The highest-value first calculation is the correlated-interferometer transfer problem, because it connects a candidate Noether-sea state to an existing exclusion record and a next-generation forecast without treating spacetime language as ontology.

1. Freeze one accepted candidate sea state and versioned $\Theta_{\mathrm{map}}$; do not fit an abstract noise curve before the carrier exists.
2. Derive $K_{AB}^{\mathrm{sea}}$ from that state and derive the Holometer and GQuEST $H_i^A$ kernels independently from their apparatus records.
3. Evaluate the published Holometer geometry and band first. Reject the candidate if its projected cross-spectrum violates the source-bound limit.
4. Forecast the GQuEST signal and null channels with the same $K_{AB}^{\mathrm{sea}}$ and no experiment-specific spectral retuning.
5. Propagate the surviving record through the weak photon, clock, ruler, and gravitational-wave residuals, then through the strong-loading magnetar polarization row.
6. Use EHT imaging, global-topology searches, and mediated-entanglement witnesses as independent projections; do not collapse them into a single spacetime-structure score.

The present blocker is unchanged: there is no accepted EOM-evolved retained Noether-sea state with a polarization-, propagation-, and correlation-resolved constitutive export. Until that carrier exists, this packet specifies an inverse problem and falsifiers rather than reporting a physical prediction.

## Failure Modes

| Failure code | Meaning |
| --- | --- |
| `spacetime_structure.projection_blend` | Metric imaging, propagation, correlated noise, topology, or mediated entanglement are treated as measurements of the same projection. |
| `spacetime_structure.substrate_identification_overclaim` | Agreement in one or more observer channels is claimed to identify a unique Noether-sea state without an identifiability proof. |
| `spacetime_structure.model_free_null_overclaim` | A model-specific null result is presented as excluding all microscopic or emergent-spacetime structures. |
| `spacetime_structure.shared_record_split` | Different experiments require independently fitted sea states or propagation coefficients without a declared physical state change. |
| `spacetime_structure.nuisance_absorption` | Source lag, plasma, calibration, environmental correlation, decoherence, or reconstruction uncertainty absorbs the target residual without an explicit nuisance record. |
| `spacetime_structure.global_local_collapse` | A global topology constraint is treated as a local constitutive law or as the topology of the Euclidean void. |
| `spacetime_structure.proposal_as_measurement` | A planned sensitivity or feasibility study is reported as an experimental detection or exclusion. |

## Primary And Official Sources

- S. M. Vermeulen et al., [Photon Counting Interferometry to Detect Geontropic Space-Time Fluctuations with GQuEST](https://arxiv.org/abs/2404.07524), *Physical Review X* 15, 011034 (2025), together with the [official GQuEST project status](https://gquest.fnal.gov/).
- A. Chou et al., [Interferometric Constraints on Quantum Geometrical Shear Noise Correlations](https://arxiv.org/abs/1703.08503), *Classical and Quantum Gravity* 34, 165005 (2017), and the [Fermilab Holometer scientific bibliography](https://holometer.fnal.gov/scientific-bibliography.html).
- LIGO-Virgo-KAGRA Collaboration, [GWTC-4.0: Tests of General Relativity. II. Parameterized Tests](https://dcc.ligo.org/LIGO-P2500066/public), LIGO-P2500066-v9 (2026).
- Cherenkov Telescope Array Observatory, [Study Themes: Exploring Frontiers in Physics](https://www.ctao.org/emission-to-discovery/science/study-themes/).
- Event Horizon Telescope Collaboration, [First Sagittarius A* Event Horizon Telescope Results. VI. Testing the Black Hole Metric](https://eventhorizontelescope.org/publications/first-sagittarius-event-horizon-telescope-results-vi-testing-black-hole-metric), *The Astrophysical Journal Letters* 930, L17 (2022).
- P. Petersen et al., [Cosmic topology. Part I. Limits on orientable Euclidean manifolds from circle searches](https://arxiv.org/abs/2211.02603), *Journal of Cosmology and Astroparticle Physics* 01, 030 (2023; corrected version 2024).
- S. Bose et al., [A Spin-Based Pathway to Testing the Quantum Nature of Gravity](https://arxiv.org/abs/2509.01586) (2025).

## Queue And Promotion Boundary

This is a comparison and integration packet under `mapping-benchmarks`. It does not create a new executable row. Correlated-noise calculations consume the accepted constitutive carrier required by `XTM-004` and finite-window statistical discipline relevant to `XTM-009`; gravitational-wave rows remain under `XTM-005`; weak photon propagation remains under `XTM-002`; strong electromagnetic propagation remains under `XTM-006`; EHT, cosmology, and massive-superposition work remain with their existing owners. Promotion requires a versioned source, native carrier, instrument projection, residual, controls, and falsifier for the selected experiment.
