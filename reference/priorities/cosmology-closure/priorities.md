# Cosmology Transfer-Function Closure

## Workstream Metadata

- Kind: `deferred-priority`
- Rank: `24`
- Value: `3.14`
- Cost: `7.0`
- ROI: `0.45`
- Status: `deferred`

## Task Queue

1. `component_interfaces` — Build per-component observable interfaces against LambdaCDM. Status: `deferred`. Depends on: none.
2. `predictive_pipeline` — Turn the CMB and three-binary cosmology story into a predictive transfer-function pipeline. Status: `deferred`. Depends on: `component_interfaces`.
3. `age_clock_convergence` — Add an oldest-object and material-clock interface for Hubble-time/time-redshift mapping, differential-age cosmic chronometers, globular-cluster turnoff ages, white-dwarf cooling ages, Th/U/Eu radiochronometers, and presolar/interstellar-grain provenance. Status: `deferred`. Depends on: `component_interfaces`.
4. `cmb_noether_braid_spectrum_linkage` — Examine whether the observed CMB spectrum has a derivable linkage to Noether braid ensemble modes, photon-channel provenance, Noether sea thermalization, and coherent photon-channel bundle transport, without treating the linkage as established before a spectrum-level residual exists. Status: `deferred`. Depends on: `predictive_pipeline`.
5. `noether_sea_source_relaxation_balance` — Tie production, recycling, decay, reclassification, capture, and relaxation of Noether sea content to one continuity and energy ledger. Status: `deferred`. Depends on: `component_interfaces`.
6. `deep_space_inventory_benchmark` — Build a deep-space component inventory for photons, neutrinos, cosmic rays, atoms, dust, and unknown Noether sea carriers before treating any sparse visible inventory as an ontology argument. Status: `deferred`. Depends on: `component_interfaces`.
7. `quasar_population_transport_decomposition` — Separate quasar luminosity-function evolution, survey selection, obscuration, lensing, classification, and redshift-transfer law before using quasar count distributions as cosmology evidence. Status: `deferred`. Depends on: `component_interfaces`, distance-ladder transfer law, survey-selection modeling.
8. `controversial_qso_association_audit` — Preserve older galaxy/QSO association claims only as a fail-closed source lead requiring modern selection, lensing, extinction, classification, and look-elsewhere controls. Status: `deferred`. Depends on: `quasar_population_transport_decomposition`.
9. `distributed_release_rate_residual` — Model source-population release rate density, energy spectrum, spatial distribution, and thermalization depth before using recycling release as a CMB or expansion-equivalent source. Status: `deferred`. Depends on: `noether_sea_source_relaxation_balance`, `cmb_noether_braid_spectrum_linkage`.
10. `nested_shell_cmb_peak_residual` — Test whether first-three-peak CMB ratios can be projected from nested shell braid energy-scale ratios without changing the transfer state used for blackbody, lensing, and growth rows. Status: `deferred`. Depends on: `predictive_pipeline`, `cmb_noether_braid_spectrum_linkage`.
11. `dark_sector_apparentness_residual` — Separate shielded energy, neutral assemblies, Noether sea stress, projection effects, and catalogue residuals before interpreting a missing component as dark matter or dark energy. Status: `deferred`. Depends on: `deep_space_inventory_benchmark`.
12. `horizon_computation_benchmark` — Treat finite accessible energy, horizon temperature floor, and finite computation counts as observer-horizon comparison pressure rather than information ontology. Status: `priority-only`. Depends on: `component_interfaces`, `age_clock_convergence`.
13. `missing_baryon_inventory_guardrail` — Keep observer-level baryon inventory separate from primitive architrino and Noether sea inventories before claiming missing-baryon closure. Status: `priority-only`. Depends on: `deep_space_inventory_benchmark`, `component_interfaces`.
14. `ordered_core_recycling_entropy_ledger_feasibility` — Apply the [scope decision](ordered-core-recycling-entropy-scope-decision.md): keep ordered-core recycling speculative, permanently exclude free-steady radiative shedding as its source, and test only the same-record coarse-grained entropy-ledger feasibility of an explicitly accelerated, gravitational, reaction, or medium-relaxation event. Status: `priority-only entropy target; mechanism-watchlist` (2026-07-12). Depends on: `noether_sea_source_relaxation_balance`, `distributed_release_rate_residual`, and a populated strong-field event record; no implementation authorized.

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
| `noether_sea_source_relaxation_balance` | This file | [Noether sea](../../../content/markdown/aaa/spacetime/noether-sea.md), [Expansion Mechanism](../../../content/markdown/aaa/cosmology/expansion-mechanism.md), and [Reaction-Cosmology Provenance Ledger](../../../content/markdown/aaa/validation/reaction-cosmology-provenance-ledger.md) | Noether sea production, return, capture, decay, reclassification, and relaxation share one continuity and energy ledger before they are used in redshift, CMB, BBN, or dark-energy stories. |
| `deep_space_inventory_benchmark` | This file | [cosmology-ontology](../../../content/markdown/aaa/cosmology/cosmology-ontology.md), [dark-energy](../../../content/markdown/aaa/cosmology/dark-energy.md), and [dark-matter](../../../content/markdown/aaa/cosmology/dark-matter.md) | Sparse ordinary deep-space contents are separated from the unknown Noether sea carrier inventory and from observer-level dark-sector inferences. |
| `quasar_population_transport_decomposition` | This file and [cosmological-redshift-distance-ladder](../cross-theory-mapping/cosmological-redshift-distance-ladder.md) | [expansion-mechanism](../../../content/markdown/aaa/cosmology/expansion-mechanism.md), [structure-formation](../../../content/markdown/aaa/cosmology/structure-formation.md), and [hubble-s8-tensions](../../../content/markdown/aaa/cosmology/hubble-s8-tensions.md) | Quasar counts are decomposed into population, survey, obscuration, lensing, classification, and redshift-transfer rows before any fixed-void or LambdaCDM comparison is scored. |
| `controversial_qso_association_audit` | This file | Priority-only unless a modern data audit survives controls | Older QSO/galaxy association claims remain source leads only; no corpus claim is promoted unless modern survey selection, lensing, extinction, classification, and look-elsewhere corrections survive. |

## Closure Goal

- Turn the current CMB and three-binary cosmology story into a predictive transfer-function pipeline.
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

## Noether Sea Source And Relaxation Balance

The production and decay language inherited from legacy sources is useful only after it is rewritten as a continuity ledger. For a finite cosmology window, the Noether sea content balance should use the same channel split promoted in the Noether sea canon:
$$
S_{\rho}
=
S_{\mathrm{prod}}
+S_{\mathrm{return}}
-S_{\mathrm{capture}}
-S_{\mathrm{decay}}
-S_{\mathrm{reclass}}
+S_{\mathrm{relax}}.
$$
The priority task is to tie these rows to one energy, reaction, and transport record. A cosmology branch that produces redshift, CMB thermalization, dark-energy stress, or dark-sector inventory by changing one of these rows independently has split the Noether sea state it is supposed to close.

The distributed-release residual is the source-population version of this rule. For a candidate recycling branch $\theta$, the minimum record is
$$
\mathcal{R}_{\mathrm{release}}
=
d_{\dot n}\!\left(\dot n_{\mathrm{src}}^\theta,\dot n_{\mathrm{req}}\right)
+
d_E\!\left(F_E^\theta,F_E^{\mathrm{req}}\right)
+
d_x\!\left(P_x^\theta,P_x^{\mathrm{req}}\right)
+
d_{\mathrm{th}}\!\left(\mathcal{D}_{\mathrm{th}}^\theta,\mathcal{D}_{\mathrm{th}}^{\mathrm{req}}\right),
$$
where $\dot n_{\mathrm{src}}^\theta$ is source-event density, $F_E^\theta$ is release-energy spectrum, $P_x^\theta$ is spatial distribution, and $\mathcal{D}_{\mathrm{th}}^\theta$ is thermalization depth. The residual fails if a branch fits the CMB monopole, redshift, or dark-sector inventory by changing any one of these rows without updating the shared source ledger.

The blackbody negative control is strict. A distributed-source branch may not claim that many redshifted stellar, AGN, jet, or compact-object spectra simply average into the CMB Planck curve. The admissible route must identify a detailed-balance or thermalization mechanism before free streaming, then show that the later transparent transport preserves the occupation shape. A compact failure row is
$$
\mathcal{R}_{\mathrm{mix\to BB}}
=
\left\|
\sum_s w_s\,\mathcal{T}_{s\to R}I_s(\nu)
-B_\nu(T)
\right\|_{C^{-1}}
+
\mathcal{R}_{\mathrm{side}},
$$
where $I_s$ are declared source spectra, $\mathcal{T}_{s\to R}$ are their transport maps, and $\mathcal{R}_{\mathrm{side}}$ carries spectral-distortion, image-sharpness, anisotropy, and polarization side effects. The route fails if the Planck curve is recovered only by averaging arbitrary spectra without the same source, thermalization, transport, and CMB-transfer record.

## Deep-Space Inventory Benchmark

The low visible density of intergalactic space should be treated as a component inventory, not as proof that the region is empty. The benchmark should record ordinary photon, neutrino, cosmic-ray, atom, plasma, and dust counts per cubic meter, then add the unresolved Noether sea carrier inventory as a separate unknown row:
$$
\mathcal{I}_{\mathrm{deep}}
=
\left(
n_{\gamma},
n_{\nu},
n_{\mathrm{CR}},
n_{\mathrm{atom}},
n_{\mathrm{dust}},
\rho_{\text{NS}},
f_N,
\theta_{\mathrm{sea}}
\right).
$$
The useful pressure is comparative: ordinary components are sparse, while the Noether sea density must be inferred from packing, transparency, clock/ruler response, redshift transport, and effective-metric closure rather than from direct visible-particle counts.

The ordinary-matter sparsity check should be developed as a scale estimate rather than as legacy point-volume arithmetic. A useful target is
$$
\mathcal{S}_{\mathrm{sparse}}
=
\left(
f_{\mathrm{mat}},
n_{\mathrm{bar}},
\rho_{\text{NS}},
\ell_{\mathrm{coh}},
\mathcal{R}_{\mathrm{trans}}
\right),
$$
where $f_{\mathrm{mat}}$ is an occupied-volume or packing proxy for ordinary matter, $n_{\mathrm{bar}}$ is the baryonic number-density comparison, $\rho_{\text{NS}}$ is the inferred Noether sea density, $\ell_{\mathrm{coh}}$ is the coherence or response length being tested, and $\mathcal{R}_{\mathrm{trans}}$ checks transparency, dispersion, and clock/ruler constraints. The expected lesson is not a fixed historical number. It is a same-record comparison between sparse visible inventories and the much denser carrier population required by effective metric, redshift, and propagation recovery.

The missing-baryon problem adds a guardrail to that inventory. Primitive architrino conservation and Noether sea density do not by themselves close an observer-level baryon count. A baryon inventory row should keep the standard inferred baryon budget and the visible/unseen ordinary-matter catalogues separate from the deeper substrate inventory:
$$
\mathcal{I}_{\mathrm{bar}}
=
\left(
\Omega_b^{\mathrm{BBN/CMB}},
\Omega_b^{\mathrm{stars}},
\Omega_b^{\mathrm{ISM/CGM}},
\Omega_b^{\mathrm{WHIM}},
\Omega_b^{\mathrm{compact}},
\Omega_b^{\mathrm{unseen}},
\mathcal{L}_{b\leftrightarrow\mathrm{sea}}
\right).
$$
The ledger $\mathcal{L}_{b\leftrightarrow\mathrm{sea}}$ is needed only when a branch claims conversion, recycling, shielding/exposure change, or release between baryonic assemblies and Noether sea or neutral-assembly channels. Without that reaction and provenance row, the Noether sea inventory is not allowed to fill a missing-baryon term.

## Horizon Computation Benchmark

Far-future computation limits are useful as observer-horizon comparison pressure. They should not be promoted into information ontology. For a candidate cosmology branch, record
$$
\mathcal{B}_{\mathrm{horizon\text{-}comp}}
=
\left(
E_{\mathrm{acc}}^{\mathrm{eff}},
T_{\mathrm{floor}}^{\mathrm{eff}},
N_{\mathrm{ops}}^{\max},
\mathcal{H}_{\mathrm{eff}},
\theta_{\mathrm{sea}}
\right),
$$
where $E_{\mathrm{acc}}^{\mathrm{eff}}$ is the accessible effective energy inside the observer horizon, $T_{\mathrm{floor}}^{\mathrm{eff}}$ is the effective temperature floor for record-bearing computation, $N_{\mathrm{ops}}^{\max}$ is the comparison operation or bit-transfer budget, $\mathcal{H}_{\mathrm{eff}}$ is the observer-horizon reconstruction, and $\theta_{\mathrm{sea}}$ is the same Noether sea record used by redshift, clock, and structure rows. A branch that changes the far-future horizon, floor temperature, or accessible-energy law independently of the expansion, redshift, and clock maps has split the cosmology record.

For dark-sector apparentness, the inventory should expose at least
$$
\mathcal{I}_{\mathrm{dark}}^\theta
=
\left(
E_{\mathrm{shield}},
N_{\mathrm{neutral}},
\Sigma_{\mathrm{sea}},
\Pi_{\mathrm{proj}},
\Delta_{\mathrm{cat}}
\right),
$$
where $E_{\mathrm{shield}}$ records shielded energy, $N_{\mathrm{neutral}}$ neutral assembly content, $\Sigma_{\mathrm{sea}}$ Noether sea stress, $\Pi_{\mathrm{proj}}$ observer-projection effects, and $\Delta_{\mathrm{cat}}$ catalogue residuals. Treating all five as one "dark" scalar is a failure mode, not a closure.

The Noether sea stress row should not remain a single undifferentiated handle once it is used in galaxy dynamics, redshift transport, or growth comparisons. A first decomposition is
$$
\Sigma_{\mathrm{sea}}
=
\Sigma_{\mathrm{mat}}
+
\Sigma_{\mathrm{path}}
+
\Sigma_{\mathrm{rel}}
-
\Sigma_{\mathrm{cap}}
+
\Sigma_{\mathrm{relax}},
$$
where $\Sigma_{\mathrm{mat}}$ is ordinary-assembly response, $\Sigma_{\mathrm{path}}$ is accumulated transport deposition from photon, neutrino, or other packet paths, $\Sigma_{\mathrm{rel}}$ is compact-source or distributed release loading, $\Sigma_{\mathrm{cap}}$ is capture or reclassification out of the active Noether sea population, and $\Sigma_{\mathrm{relax}}$ is local equilibration. The same decomposition must feed rotation, lensing, CMB/growth, redshift, and dark-sector apparentness rows. If a branch changes $\Sigma_{\mathrm{path}}$ to fit redshift while changing $\Sigma_{\mathrm{mat}}$ or $\Sigma_{\mathrm{rel}}$ independently for RAR/BTFR or lensing, it has split the Noether sea stress record.

## Galaxy-Dynamics Source-Family Watchlist

Legacy SMBH and galaxy-dynamics sources are useful here as observable-family prompts, not as established explanations. The priority watchlist should preserve source leads only when they can be written as controlled records:
$$
\mathcal{O}_{\mathrm{gal-src}}
=
\left(
\mathbf{A}_{\mathrm{jet}},
\mathcal{B}_{\mathrm{bubble}},
\mathcal{M}_{\mathrm{morph}},
V_{\mathrm{rot}},
\mathcal{G}_{\mathrm{cluster}},
\mathcal{H}_{\mathrm{SMBH}}
\right),
$$
where $\mathbf{A}_{\mathrm{jet}}$ records jet-axis geometry and precession, $\mathcal{B}_{\mathrm{bubble}}$ records bubble or lobe energy and age, $\mathcal{M}_{\mathrm{morph}}$ records spiral/bar/elliptical morphology, $V_{\mathrm{rot}}$ records rotation-curve and lensing data, $\mathcal{G}_{\mathrm{cluster}}$ records globular-cluster age, metallicity, orbit, and central-compact-object context, and $\mathcal{H}_{\mathrm{SMBH}}$ records the black-hole growth, spin, and release history. A source-family claim fails if it uses one of these rows as direct evidence for the others without a shared source, transport, and selection record.

Shielded compact-core energy can remain a dark-sector residual only under strong controls. For a galaxy branch $\theta$, write an exposure contribution
$$
\Delta\Phi_{\mathrm{core}}^\theta(r)
=
\Phi_{\mathrm{exposed}}^\theta(r)
-\Phi_{\mathrm{shielded}}^\theta(r),
$$
and compare it against rotation, lensing, cluster, CMB, and growth constraints before assigning any dark-matter role. If the branch improves $V_{\mathrm{rot}}(r)$ while worsening lensing, cluster dynamics, BBN/CMB transfer, or structure growth, it remains a speculative source lead rather than a promoted dark-sector mechanism.

A stronger compact-core version must expose the shielding geometry rather than treating a central object as a free missing-mass reservoir. For a compact source with surface inventory $\mathcal{A}_{\mathrm{surf}}$, interior inventory $\mathcal{V}_{\mathrm{int}}$, packing state $\mathcal{P}_{\mathrm{pack}}$, and exterior coupling map $\Pi_{\mathrm{ext}}$, define the priority-only exposure quotient
$$
\mathcal{Q}_{\mathrm{core}}^\theta
=
\frac{
\Pi_{\mathrm{ext}}\mathcal{A}_{\mathrm{surf}}
}{
\mathcal{V}_{\mathrm{int}}
}
\,
\Xi_{\mathrm{shield}}(
\mathcal{P}_{\mathrm{pack}},
\theta_{\mathrm{sea}}
).
$$
The quotient asks which part of an internally stored compact-core ledger is exposed to exterior dynamics. It is high risk and remains a source lead until the same branch also passes compact-object, rotation, lensing, cluster, CMB, and growth constraints. A fit that improves a galaxy rotation curve by choosing $\mathcal{Q}_{\mathrm{core}}^\theta$ after the fact is rejected as hidden dark-sector tuning.

## Quasar Population And Redshift-Transport Decomposition

Quasar redshift distributions are useful only after population and transport rows are separated. A non-uniform count distribution in $z$ can come from luminosity-function evolution, survey flux limits, color selection, obscuration, lensing, source-class changes, classification uncertainty, or the redshift-transfer map. The priority comparison should therefore start from the decomposition in the distance-ladder benchmark and ask which rows are fixed by data before any cosmology interpretation is drawn.

The fail condition is symmetric: a fixed-void redshift branch fails if it treats quasar counts as direct evidence for path transport while ignoring source evolution and selection; a LambdaCDM comparison fails if it treats the same counts as settled population history while leaving unexplained transfer residuals in the photon-channel record.

High-redshift quasar mass estimates add a separate growth-time pressure. For a candidate record $\theta$, compare observed black-hole mass and redshift through
$$
\mathcal{R}_{\mathrm{QSO\text{-}mass}}(\theta)
=
d_M\!\left(
M_{\mathrm{BH}}^{\mathrm{obs}},
M_{\mathrm{seed}}^\theta
\exp\!\left[
\int_{\mathcal{H}_{\mathrm{feed}}}
\frac{1-\epsilon_{\mathrm{rad}}^\theta}{\epsilon_{\mathrm{rad}}^\theta}
\frac{dt_{\mathrm{eff}}^\theta}{t_{\mathrm{Edd}}^\theta}
\right]
\right)
+
d_z\!\left(
z_{\mathrm{obs}},
Z^\theta[\mathcal{S}_{E\to R}]
\right)
+
\mathcal{R}_{\mathrm{sel}}.
$$
This is not a claim that standard Eddington growth is the native mechanism. It is a bookkeeping comparison that prevents a branch from using one age/redshift record to infer the quasar and another to explain how the compact source grew.

## Controversial QSO Association Source Lead

Older QSO/galaxy-association claims can remain in this workstream only as a source lead. They do not become evidence for intrinsic redshift, source ejection, fixed-void redshift, or any other cosmology interpretation by citation alone. A usable audit would need a modern survey packet with predeclared galaxy/QSO samples, angular and redshift selection functions, lensing and extinction corrections, spectroscopic/photometric classification quality, catalog masks, and a look-elsewhere correction. If those controls are absent, the material is historical pressure to be careful about inference pipelines, not a corpus claim.

BL Lac and companion-galaxy association claims belong in the same fail-closed family. A useful modern audit would need jet-axis geometry, host and companion catalogues, spectroscopic quality, radio/X-ray selection functions, lensing and extinction controls, and null tests against ordinary chance alignment and survey-depth effects. The only retained value of the legacy claim is source-family pressure: do not collapse source evolution, jet morphology, and redshift-transfer interpretation into one conclusion before the observation pipeline has separated them.

## CMB Spectrum / Noether Braid Linkage

The linkage question is whether the observed CMB spectrum, including near-Planck blackbody quality and allowed spectral-distortion bounds, is only a thermalized observer-level transfer output or also constrains the Noether braid ensemble modes that feed photon-channel provenance.

The first pass should keep the claim level narrow. A viable linkage requires one event and medium record to connect Noether braid ensemble dynamics, photon assembly source/capture/release rows, thermalization depth, coherent photon-channel bundle transport, redshift handoff, and the CMB frequency-map residuals. If the spectrum can be fit only by changing the Noether sea state separately from BBN, redshift, or TT/TE/EE transfer, the linkage fails as a shared-cosmology closure route.

That same medium record is also shared with the Lorentz closure stack. The $\chi_{\text{sea}}(\mathbf{x},t)$ row used for redshift, transparent photon-channel transport, CMB transfer, lensing, and growth must remain the same row used for clock/ruler retuning and preferred-frame hiding. A branch that closes cosmology only by choosing a cosmology-specific delay factor, while Lorentz recovery uses a different $\chi_{\text{sea}}$, has split the response law the one-constitutive-response wall is meant to protect.

The speed rows are part of that shared response. The transparent transport map acts on photon-channel packets whose group-speed row is $c_\gamma(\mathbf{x},t)$; primitive causal wakes and Noether sea exchange remain constrained by $c_f$; clock and ruler reconstruction belongs to $c_{\text{eff}}$; and $c_0$ is only the weak homogeneous calibration value. A branch that recovers redshift by changing frequency while leaving the propagation speed undefined has not closed the map. The admissible case is redshift through coherent photon-channel transport at $c_\gamma$, with the energy sink bookkept through Noether sea and causal-wake exchange without generating a detectable frequency-dependent $c_\gamma(\omega)$ residual.

The nested-shell CMB peak residual belongs here only as a priority-only route. If the outer, middle, and inner nested shell braid energy scales are proposed as seed ratios for the first acoustic peaks, the comparison must still pass through the ordinary CMB transfer packet:
$$
\mathcal{R}_{\mathrm{peak}}
=
d\!\left(
\frac{\ell_2^\theta}{\ell_1^\theta},
\frac{\ell_2^{\mathrm{obs}}}{\ell_1^{\mathrm{obs}}}
\right)
+
d\!\left(
\frac{\ell_3^\theta}{\ell_1^\theta},
\frac{\ell_3^{\mathrm{obs}}}{\ell_1^{\mathrm{obs}}}
\right)
+
\mathcal{R}_{\mathrm{transfer}}.
$$
The route fails if the shell-ratio story fits peak locations while using a different medium state than blackbody preservation, damping, lensing, BAO, or growth.

The same rule applies to broader Noether-braid ensemble peak stories. If formation epochs, source-network cadence, or nested shell braid energy scales are proposed as inputs to the acoustic features, they must enter as a source side of $\mathcal{R}_{\mathrm{transfer}}$, not as a bypass around the photon-baryon transfer calculation. The source ensemble can seed phase structure only after the same state also preserves near-Planck occupation, damping, lensing, and the TT/TE/EE phase relations.

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

Equivalently, if $\mathcal{D}_{\lambda}$ denotes global frequency dilation on the admitted band and $\mathcal{G}_{\mathrm{tr}}$ denotes the transparent-transport generator, the same branch must satisfy

$$
[\mathcal{G}_{\mathrm{tr}},\mathcal{D}_{\lambda}]_{\mathrm{band}}
=O(\epsilon_{\mathrm{spec}}),
\qquad
\Delta\mathbf{k}_{\perp}=O(\epsilon_{\mathrm{img}})
$$

for the declared path depth and Noether sea state. Breaking the commutator spoils blackbody-shape preservation; undeclared transverse momentum transfer spoils image sharpness.

A fixed photon-lifetime or photon-ablation model is a negative control for this row. If the lifetime is implemented as stochastic absorption, scattering, or species loss along transparent paths, the branch must fail unless it also preserves
$$
\left(
\epsilon_{\mathrm{spec}},
\epsilon_{\mathrm{img}},
\epsilon_{\mathrm{td}},
\epsilon_{\mathrm{pol}}
\right)
$$
for blackbody shape, image sharpness, observed $(1+z)$ time dilation, and polarization transfer. The admissible fixed-void redshift route is coherent photon-channel transport with a closed Noether sea energy row, not untracked photon attrition.

Low-energy photon endpoint speculation is useful only as a boundary condition, not as a redshift mechanism. If a photon-channel packet loses the geometry needed for coherent transparent transport, the branch should route it into capture, medium excitation, reaction, or assembly reclassification, and then remove it from the transparent CMB/redshift carrier population. It must not be allowed to drift continuously as a tired-light term. A candidate endpoint row should therefore ask whether
$$
G_{\gamma}^{\mathrm{A/B}}(\theta_{\gamma},\theta_{\mathrm{sea}})
\ge
\epsilon_{\gamma}
$$
still holds for the transported packet, where $G_{\gamma}^{\mathrm{A/B}}$ denotes the photon-channel geometry and coherence conditions being tested. Failure of this condition is a carrier-exit event with an energy and remnant ledger, not an untracked cosmological redshift increment.

Absolute time also makes the redshift-energy row non-optional. A fixed-void branch cannot let the photon's missing energy disappear into expansion bookkeeping; it must close the finite-window ledger through Noether sea update, source/release or remnant rows, recoil/exchange rows, and declared boundary flux. The global target behind that finite-window row is

$$
E_{\mathrm{tot}}(t)
=
E_{\mathrm{arch}}(t)
+E_{\mathrm{wake}}(t)
+E_{\mathrm{sea}}(t),
\qquad
\frac{dE_{\mathrm{tot}}}{dt}=0
$$

For a transparent photon-channel bundle redshifted by $1+z$ after source, recoil, remnant, and boundary rows have been separated, the lemma target is

$$
\Delta E_{\gamma}
=
E_{\mathrm{emit}}-E_{\mathrm{obs}}
=
E_{\mathrm{emit}}\frac{z}{1+z},
\qquad
\Delta E_{\gamma}
+\Delta E_{\mathrm{sea,path}}
=0
$$

The same Noether sea state that preserves blackbody shape and image coherence must carry that energy balance, or the transport branch has split the very constitutive response this priority is testing. Failure is explicit: if no single bookkept Noether sea sink can close the redshift energy row while preserving redshift-distance behavior, observed $(1+z)$ time dilation, Tolman surface brightness, blackbody quality, acoustic structure, image sharpness, lensing, and growth, the fixed-void redshift branch fails on its own absolute-time conservation target.

Long-time stability adds one more required accounting row. The transparent-path sink $\Delta E_{\mathrm{sea,path}}$ may not accumulate as unbounded secular heating of the Noether sea. A viable branch must route that deposited energy through the same source/release, black-hole recycling, Noether sea equilibration, or boundary-flux records used by the cosmology module. In the cadence-transport notation of the expansion mechanism, the $f_N$ current, $S_{\mathrm{BH}}$, and $R_{\mathrm{eq}}[f_N]$ rows must supply a bounded recycling or relaxation balance for the path-energy deposit; otherwise the local redshift ledger conserves energy only by moving a divergence into $E_{\mathrm{sea}}$.

An eternal or unbounded-age branch also inherits two thermodynamic burdens. Its declared source and transfer history must keep the integrated observable sky brightness finite after absorption, reprocessing, and release terms are included, and its coarse-grained entropy ledger must avoid unbounded accumulation in the accessible material and Noether sea record. SMBH processing is not presumed to be a sink for either burden; it must close on the same source-relaxation and ordered-core-recycling entropy ledger.

If the total scalar energy of the unbounded populated Euclidean void is not finite or not convergently summable on a constant-$t$ leaf, this target demotes to a bounded-region flux balance rather than disappearing:

$$
\partial_t\rho_E+\nabla\cdot\mathbf{S}_E=0
$$

with boundary flux included on every finite comparison window. The redshift-energy sink remains falsifiable locally; what is withheld is only the stronger universe-wide constant until summability and the delayed Noether theorem are both established.

## Galaxy-Local Recycling And Horizon Uniformity

The legacy-source signal to preserve is not the claim that the horizon problem is already solved. It is the alternative layer assignment: horizon uniformity may be evidence that the observer-level cosmological chart is summarizing recurrent source/release and thermalization history rather than a single global birth event. In that reading, galaxy-local or source-network recycling could contribute to the apparent uniform background while the Euclidean void remains fixed.

This remains priority-only until it is expressed through the existing `component_interfaces`, `predictive_pipeline`, and `cmb_noether_braid_spectrum_linkage` tasks. A viable branch must use one declared Noether sea and source/release record to face CMB monopole isotropy, TT/TE/EE acoustic structure, allowed spectral distortions, BBN yields, BAO distance calibration, redshift-distance data, structure growth, and oldest-object/material-clock convergence. The acoustic-ruler coherence residual in [Cosmology Ontology](../../../content/markdown/aaa/cosmology/cosmology-ontology.md#acoustic-ruler-coherence-burden) must pass across source patches and tracer bins without per-patch ruler tuning. If galaxy-local recycling can explain only qualitative uniformity while breaking any of those shared comparison rows, it remains an analogy rather than a cosmology closure route.

## Age-Clock Convergence Interface

Oldest-object and material-age observations are not optional background color for an unbounded-age cosmology. They are a compact convergence pressure on the effective observer chronology: multiple independent clocks cluster near $13$-$14\ \mathrm{Gyr}$ even if the Euclidean void has no mandatory one-time origin event.

The interface should keep these clock families distinct:

- Hubble-time and time-redshift mapping as effective observer chronology, not absolute age of the Euclidean void.
- Differential-age cosmic chronometers as a distinct calibration pipeline whose stellar-aging interval is local but whose age model and measured redshift remain photon-mediated.
- Globular-cluster turnoff ages as oldest-surviving stellar-population clocks.
- White-dwarf cooling ages as remnant cooling clocks plus progenitor formation delay.
- Th/U/Eu radiochronometers as nucleosynthetic provenance clocks.
- Presolar and interstellar-grain ages as parent-star, ejection, mixing, and solar-system incorporation records.

The closure question is why those clocks converge in the accessible material and stellar record. A viable $\mathbb{A}\mathbb{A}\mathbb{A}$ branch may interpret the convergence as the age of the current effective observer era, dominant recycling/thermalization history, or accessible star-forming material record, but it must also explain why much older visible populations are absent, reset, hidden, or outside the declared observation record.

Observer eligibility must consume the same measure-theoretic object used by the quantum measurement program. Let $B_{\mathrm{obs}}\subset\Gamma$ denote the subset of finite-window basin states that satisfy the Physical Observer criteria: durable record channels, free-energy supply, chemical and environmental support, and access-region stability over the declared window. A typicality statement over interval $I$ should use
$$
\mu_{\mathrm{obs}}(A\mid I)
=
\frac{\mu_{*,T}(A\cap B_{\mathrm{obs}}\cap I)}
{\mu_{*,T}(B_{\mathrm{obs}}\cap I)}
$$
when the denominator is nonzero, with $\mu_{*,T}$ inherited from the same transfer-operator and basin-measure grammar used for Born weights, apparatus partitions, and Bell records. If cosmology uses a separate anthropic sampling measure unrelated to $\mu_{*,T}$, observer eligibility has become a second probability ontology rather than a Physical Observer subset.

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

- [master-equation-closure](../master-equation-closure/priorities.md)
- [strong-field-closure](../strong-field-closure/priorities.md)
- [strong-field brainstorming](../strong-field-closure/brainstorming.md)
- [dark-sector](../dark-sector/priorities.md)
- [app-simulation](../app-simulation/priorities.md)

## Related $\mathbb{A}\mathbb{A}\mathbb{A}$ Notes

- [cosmology-ontology](../../../content/markdown/aaa/cosmology/cosmology-ontology.md)
- [CMB](../../../content/markdown/aaa/cosmology/CMB.md)
- [BBN-constraints](../../../content/markdown/aaa/cosmology/BBN-constraints.md)
- [structure-formation](../../../content/markdown/aaa/cosmology/structure-formation.md)
- [hubble-s8-tensions](../../../content/markdown/aaa/cosmology/hubble-s8-tensions.md)
