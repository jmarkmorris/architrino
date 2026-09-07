# Precision Electroweak Gauge-Running Benchmark Packet

## Workstream Metadata

- Kind: `priority`
- Status: `source-mined-benchmark-packet`
- Claim level: `derivation-closure target`
- Primary consumers:
  - [Weak-Sector Gauge Closure](weak-sector-gauge-closure.md)
  - [Fine-Structure Coupling Map](../../mapping-electromagnetism/analysis/fine-structure.md)
  - [EQ-16 Weak-Visible Branch Ledger Source-Field Map](../../mapping-equations/analysis/eq-16-weak-visible-branch-ledger-source-field-map.md)
  - [EQ-26A Theta Alpha Source-Field Map](../../mapping-equations/analysis/eq-26a-theta-alpha-source-field-map.md)
  - [EQ-26 Through EQ-31 Observation-First Precision Packet](../../mapping-equations/analysis/eq-26-31-observation-first-precision-packet.md)

## Purpose

This packet turns precision electroweak and gauge-running source material into benchmark rows for weak-sector gauge closure, coupling recovery, mixing-angle recovery, and shared-fit covariance. It is not accepted evidence for primitive Standard Model fields. Every benchmark below remains an observer-facing recovery target until the native carrier row named in the blocker column exists.

The benchmark pressure is useful because the same electroweak fit surface couples low-energy weak normalization, W/Z mass and width rows, neutral-current mixing-angle definitions, running couplings, CKM/PMNS overlap, and detector/systematic covariance. A successful $\mathbb{A}\mathbb{A}\mathbb{A}$ recovery cannot fit these rows one at a time with separate carrier choices.

## Source Map

| Source family | Inspected source | Benchmark role |
| --- | --- | --- |
| PDG electroweak review | [Review of Electroweak Model and Constraints on New Physics](https://pdg.lbl.gov/2024/reviews/rpp2024-rev-standard-model.pdf), 2024 Review of Particle Physics | Official fit conventions for $G_F$, $M_W$, $\Gamma_W$, $M_Z$, $\Gamma_Z$, on-shell and $\overline{\mathrm{MS}}$ weak mixing angles, effective leptonic weak mixing angle, $\hat{\alpha}(M_Z)$, $\alpha_s(M_Z)$, and global-fit $\chi^2$. |
| PDG QCD review | [Quantum Chromodynamics](https://pdg.lbl.gov/2024/reviews/rpp2024-rev-qcd.pdf), 2024 Review of Particle Physics | World-average $\alpha_s(M_Z)$ and running-coupling scheme pressure. |
| LEP/SLC electroweak fit | [Precision Electroweak Measurements on the Z Resonance](https://arxiv.org/abs/hep-ex/0509008), ALEPH/DELPHI/L3/OPAL/SLD/LEP EW Working Group | Z-pole pseudo-observables, lineshape covariance, asymmetry covariance, and radiative-correction fit dependencies. |
| ATLAS W mass and width | [Measurement of the W-boson mass and width with the ATLAS detector using proton-proton collisions at $\sqrt{s}=7$ TeV](https://arxiv.org/abs/2403.15085) | LHC template-fit $m_W$ and $\Gamma_W$ row with PDF, recoil, lepton calibration, and physics-modelling systematics. |
| CMS W mass | [High-precision measurement of the W boson mass with the CMS experiment](https://arxiv.org/abs/2412.13872) | LHC maximum-likelihood $m_W$ row with in-situ constraints on experimental and theoretical inputs. |
| ATLAS weak mixing angle | [Measurement of the forward-backward asymmetry of electron and muon pair-production in $pp$ collisions at $\sqrt{s}=7$ TeV with the ATLAS detector](https://arxiv.org/abs/1503.03709) | Hadron-collider Drell-Yan $A_{\mathrm{FB}}$ extraction of an effective weak mixing angle, with PDF uncertainty explicit. |
| CMS weak mixing angle, 8 TeV | [Measurement of the weak mixing angle using the forward-backward asymmetry of Drell-Yan events in pp collisions at 8 TeV](https://arxiv.org/abs/1806.00863) | CMS $A_{\mathrm{FB}}$ extraction of $\sin^2\theta_{\mathrm{eff}}^{\ell}$ with statistical, systematic, theory, and proton-PDF components. |
| CMS weak mixing angle, 13 TeV | [Measurement of the Drell-Yan forward-backward asymmetry and of the effective leptonic weak mixing angle in proton-proton collisions at $\sqrt{s}=13$ TeV](https://arxiv.org/abs/2408.07622) | High-statistics Drell-Yan angular-coefficient and weak-mixing-angle extraction; useful as detector/PDF covariance pressure. |

## Measurement-Layer Classification

| Benchmark row | Measurement layer | Direct, fit, scheme, or derived status | $\mathbb{A}\mathbb{A}\mathbb{A}$ target mapping | Native-carrier blocker |
| --- | --- | --- | --- | --- |
| $G_F$ | Muon lifetime normalization | Derived from lifetime plus radiative-correction convention; not a primitive weak charge. | `weak_exposure_record`; low-energy weak-current normalization. | `weak_exposure_record` is now source-backed; use remains blocked by `missing_accepted_va_chirality_gate` and later `reaction_event_ledger`. |
| $\alpha(0)$ | Low-energy electromagnetic precision row | Derived precision constant with a zero-momentum convention. | `charge_exposure_row`; then `alpha_coupling_row`. | `missing_accepted_theta_gamma_packet`; then `missing_accepted_charge_exposure_row`. |
| $\hat{\alpha}(M_Z)$ | Running electromagnetic coupling | Scheme- and scale-dependent derived row; hadronic vacuum polarization is part of the uncertainty. | `vacuum_polarization_wake_dressing_row`; `energy_scale_running_row`. | No use until the `Theta_alpha` carrier has scheme-pinned charge exposure. |
| $\alpha_s(M_Z)$ | Strong running coupling | Scheme- and scale-dependent fit/world-average row; the PDG EW-fit value and QCD world average are distinct benchmark surfaces. | Shared-fit covariance comparison for coupling recovery. | No scalar use until a strong/gauge running carrier and threshold inventory are declared. |
| $M_Z$, $\Gamma_Z$, $\sigma^0_{\mathrm{had}}$, $R^0_\ell$, asymmetry rows | LEP/SLC Z-pole lineshape and pseudo-observables | Direct experimental fit outputs with a published covariance matrix; not independent scalar observations. | Neutral weak-corridor provenance; finite-window width target; gauge-record covariance witness. | `missing_accepted_weak_visible_branch_ledger`; finite-window event ledger before width/lifetime scoring. |
| $M_W$, $\Gamma_W$ | LEP/Tevatron/LHC template or likelihood fits | Fit outputs with recoil, calibration, PDF, electroweak/QCD modelling, and detector-systematic covariance. | Charged weak-corridor provenance; finite-window width target. | `missing_accepted_weak_visible_branch_ledger`; LHC rows also need $\mathcal{D}_{\mathrm{LHC}}$ provenance. |
| $s_W^2=1-M_W^2/M_Z^2$ | On-shell weak mixing definition | Derived from W/Z masses; strongly correlated with the mass rows. | Mixing-angle recovery as observer definition, not native angle. | Cannot compare until W and Z rows share the same weak carrier. |
| $\hat{s}_Z^2$ | $\overline{\mathrm{MS}}$ weak mixing definition | Scheme-dependent fit output. | Gauge-record and coupling-recovery scheme row. | Requires scheme-labelled weak projection and gauge covariance rows. |
| $\bar{s}_{\ell}^{\,2}$, $\sin^2\theta_{\mathrm{eff}}^{\ell}$ | Effective leptonic weak mixing angle | Effective fit/extraction from asymmetries; collider versions depend on PDFs and angular modelling. | Weak-exposure angular readout; shared covariance residual. | No accepted use until `weak_quotient` and `effective_gauge_covariance_witness` share the retained projection carrier. |
| CKM rows | Flavor overlap | Fit output under unitary and decay-model assumptions; first-row tension is a residual, not a retune license. | `ckm_overlap_readout` in the same weak-exposure domain. | Muon projection lane blocks before overlap readouts at `missing_accepted_va_chirality_gate`. |
| PMNS rows | Neutrino mixing and mass-difference surface | Fit output with ordering, matter-effect, source/detector, and absolute-mass-bound conventions. | `pmns_overlap_readout`; neutrino weak-exposure consistency row. | Muon projection lane blocks before overlap readouts at `missing_accepted_va_chirality_gate`; neutrino carrier rows remain separate. |
| $\Delta_{\mathrm{EWfit}}$ | Global electroweak fit quality | Shared covariance and fit-assumption residual, not one measurement. | Whole-vector benchmark consistency. | Cannot score before the native benchmark vector has one carrier and one covariance convention. |

## Fit-Dependence Notes

1. LEP/SLC Z-pole rows are the cleanest covariance anchor. The lineshape and asymmetry pseudo-observables should be consumed as a covariance block. Treating $M_Z$, $\Gamma_Z$, $\sigma^0_{\mathrm{had}}$, $R^0_\ell$, and asymmetry rows as independent residuals would double-count the same experimental and fit structure.

2. The weak mixing angle has multiple source definitions. The on-shell $s_W^2$, the $\overline{\mathrm{MS}}$ $\hat{s}_Z^2$, the effective leptonic $\bar{s}_{\ell}^{\,2}$, and LHC Drell-Yan $\sin^2\theta_{\mathrm{eff}}^{\ell}$ rows must not be collapsed into one angle before the scheme label is attached.

3. The PDG main electroweak fit and the CDF II $W$-mass stress case should stay separate. The main fit convention excludes the CDF II row from the default fit. A native comparison can include a CDF-stress residual, but it must not mix that row into the primary covariance packet without a fit-mode label.

4. LHC weak-sector rows are detector-provenance rows before they are carrier evidence. ATLAS and CMS W-mass and Drell-Yan weak-angle measurements depend on recoil modelling, lepton calibration, parton distribution functions, angular coefficients, QCD/EW corrections, trigger/reconstruction selections, and nuisance-parameter profiling. They should attach through $\mathcal{D}_{\mathrm{LHC}}$ and the finite event ledger, not directly to primitive weak objects.

5. Running couplings require a threshold and scheme inventory. The shorthand $\alpha(M_Z)\approx1/128$ is not a scheme-free scalar target; the [fine-structure benchmark anchors](../../mapping-electromagnetism/analysis/fine-structure.md#observer-level-benchmark-anchors) retain the low-energy CODATA value and the five-flavor $\overline{\mathrm{MS}}$ PDG value separately. $\hat{\alpha}(M_Z)$ is entangled with hadronic vacuum polarization; $\alpha_s(M_Z)$ depends on perturbative order, scale convention, threshold treatment, and world-average correlation assumptions. A scalar coupling comparison is invalid until the native row carries those labels.

Plainly: the low-energy and $M_Z$ electromagnetic values are different kinds of benchmark records. Their numerical difference demonstrates running only when the scheme, active channels, and polarization corrections travel with the comparison.

## Candidate Covariance Residual

After the weak-visible carrier exists, the precision electroweak packet should be evaluated as one labelled benchmark vector:

$$
\mathcal{B}_{\mathrm{EW}}
=
\left(
G_F,
M_W,\Gamma_W,
M_Z,\Gamma_Z,
s_W^2,\hat{s}_Z^2,\bar{s}_{\ell}^{\,2},
\mathbf V_{\mathrm{CKM}},
\mathbf U_{\mathrm{PMNS}},
\alpha(0),
\hat{\alpha}(M_Z),
\alpha_s(M_Z),
\Delta_{\mathrm{EWfit}}
\right).
$$

The residual is covariance-aware:

$$
\mathcal{R}_{\mathrm{EW,cov}}(\Theta_W)
=
\left[
\mathcal{B}_{\mathrm{obs}}^{(f,s)}
-
\mathcal{B}_{\mathbb{A}\mathbb{A}\mathbb{A}}(\Theta_W;f,s)
\right]^T
\Sigma_{\mathrm{EW}}^{-1}(f,s)
\left[
\mathcal{B}_{\mathrm{obs}}^{(f,s)}
-
\mathcal{B}_{\mathbb{A}\mathbb{A}\mathbb{A}}(\Theta_W;f,s)
\right],
$$

where $f$ labels the fit mode and $s$ labels the scheme convention. The default first fit mode is the PDG main electroweak fit convention. Separate modes may later represent CDF-stress, LEP/SLC-only, LHC-W-only, or Drell-Yan weak-angle subsets. These modes are comparison surfaces, not new ontology.

For coupling recovery, the native carrier should also expose a scale-labelled running row:

$$
\mathcal{R}_{\mathrm{run}}
=
\left(
\alpha^{-1}(0),
\hat{\alpha}^{-1}(M_Z),
\alpha_s(M_Z)
\right)_{\mathrm{obs}}^{(s)}
-
\left(
\alpha^{-1}(0),
\hat{\alpha}^{-1}(M_Z),
\alpha_s(M_Z)
\right)_{\mathbb{A}\mathbb{A}\mathbb{A}}^{(s)}.
$$

This row is score-neutral until the photon/charge and strong/gauge running carriers have accepted source-backed rows.

## Benchmark Use Rules

| Rule | Reason |
| --- | --- |
| Use PDG and LEP/SLC rows as benchmark pressure, not as primitive-field ontology. | Standard Model fields are the source framework's effective grammar, not $\mathbb{A}\mathbb{A}\mathbb{A}$ substrate objects. |
| Carry fit mode, scheme, scale, and covariance labels with every residual. | The same symbol can refer to different experimental or theoretical definitions. |
| Keep LHC W and Drell-Yan weak-angle measurements behind $\mathcal{D}_{\mathrm{LHC}}$. | Detector/reconstruction/PDF/profiling assumptions are part of the observer record. |
| Treat CDF II $M_W$ as a stress row, not the default electroweak-fit row. | The source fit convention separates the main global fit from the CDF-tension test. |
| Require same-domain weak exposure and `V-A` chirality before scoring CKM, PMNS, W/Z, and weak-angle rows. | The muon projection lane now has source-backed exposure and currently blocks at `missing_accepted_va_chirality_gate`, not another benchmark table. |

## Priority Closure Targets

1. Populate one source-backed `va_chirality_gate` for the retained muon projection lane in `EQ-16`. The accepted packet already has same-domain `weak_visible_branch_ledger`, `weak_projection`, `weak_quotient`, and `weak_exposure_record`; the remaining row set must still bind `V-A` chirality, CKM/PMNS overlap, weak-corridor provenance, effective gauge covariance, reaction event ledger, and Noether sea response on one weak-visible retained domain. Current projection-lane blocker: `missing_accepted_va_chirality_gate`.

2. Complete the `Theta_alpha` path through the [Fine-Structure Coupling Map](../../mapping-electromagnetism/analysis/fine-structure.md) and `EQ-26A`. The first accepted rows are `theta_gamma_packet`, scheme-pinned `charge_exposure_row`, `alpha_coupling_row`, `vacuum_polarization_wake_dressing_row`, and `energy_scale_running_row`. Current first blockers: `missing_accepted_theta_gamma_packet`, then `missing_accepted_charge_exposure_row`.

3. Convert the PDG/LEP/SLC electroweak source family into one weak-sector covariance packet after the native carrier exists. The benchmark vector should include the scheme labels and fit modes above; it should not add another gate before the native weak carrier is present.

4. Treat ATLAS/CMS W-mass and Drell-Yan weak-angle rows as detector-provenance stress tests. They become useful for $\mathcal{D}_{\mathrm{LHC}}$ and finite-event-ledger closure, but not as standalone proof of weak ontology.

5. Keep $\alpha_s(M_Z)$ split by source surface: PDG QCD world average, PDG electroweak fit extraction, and any later lattice/event-shape source rows are separate covariance consumers until a native strong/gauge running carrier exists.

## Promotion Decision

Priority-only. This packet should not be promoted into `content/markdown/aaa` until at least one native carrier row exists for the weak-visible domain or the `Theta_alpha` charge/running path. Once that happens, the reader-facing corpus can safely state the benchmark recovery problem as a covariance-labelled observer residual, with the Standard Model fit machinery treated as the target surface rather than as primitive ontology.
