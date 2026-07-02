# Nuclear Atomic Molecular Brainstorming

## Purpose

This file is the idea surface for the `nuclear-atomic-molecular-closure` bucket. It preserves useful discussion targets without promoting them into canon or ranked closure. Promote an item only after it has a concrete equation, ledger row, simulation target, source-mining packet, or target corpus destination.

## Shared Recovery Target Form

Capture from discussion. When tackling an item in this bucket from an $\mathbb{A}\mathbb{A}\mathbb{A}$ perspective, do not start by fitting the standard nuclear, atomic, chemical, or biological label. Start with one recovery target:

$$
\mathcal R_X
=
\left(
\Theta_X,
\mathcal L_{E\mathbf p\mathbf J},
\mathcal F_X,
\mathcal N_X
\right).
$$

Here $\Theta_X$ is the source-row bundle for the assembly or event, $\mathcal L_{E\mathbf p\mathbf J}$ is the conservation/event ledger, $\mathcal F_X$ is the recovery predicate for the ordinary phenomenon, and $\mathcal N_X$ is the negative-control set that must fail closed. The Noether sea and Noether braid question for each item is then concrete: which coefficient, graph rule, event row, or response term in $\Theta_X$ actually consumes $\rho_{\text{NS}}$, $\theta_{\mathrm{sea}}$, $\chi_{\text{sea}}$, branch-interface rows, or retained braid geometry? If no such row is consumed, the item should stay a non-Noether recovery target rather than being linked by analogy.

Each row in the unknowns table should move forward only when it names an analytic first test, an executable diagnostic, or a source-acquisition target. The analytic route should expose a finite optimum, threshold, selection rule, conservation identity, or stability margin. The executable route should use shared parameters and row bindings across adjacent cases, so a pass on one target cannot come from per-item tuning. For this reason, the Fe/Ni cusp packet is the first worked example: it can pass a row-shape diagnostic while still failing promotion until the branch-interface, confinement-functional, weak-channel, and Noether sea response rows are accepted.

## Current Discussion Capture

The active $\mathbb{A}\mathbb{A}\mathbb{A}$ tactic for this bucket is to use one controlled recovery target at a time, starting with the iron-group binding cusp, and force the toy controls back to accepted rows before treating any result as corpus evidence. The Fe/Ni toy can be useful when it reproduces the qualitative row shape, but it remains a priority-only diagnostic until branch-interface, confinement-functional, weak-channel, and Noether sea response records justify the coefficients and graph rules without element-specific tuning.

For the current Fe/Ni packet, the first decisive blocker is the branch-interface family. The next useful branch-interface capture is not another fit: it is the accepted no-open-color far-field row that closes the trail already carrying the accepted proton and neutron branch-interface ledgers, the same-record $E$, $\mathbf p$, and $\mathbf J$ ledger, $p+n$ and $p+p$ orientation rows, and Coulomb separation in one source-acquisition trail. Only after that bundle exists should the toy row-shape pass be used as evidence for the nuclear-binding cusp route.

The branch-interface source-acquisition target records the required component shape directly: proton and neutron branch-interface targets must carry retained orientation rows, closed-corridor sharing counts, branch exposure rows, same-record conservation accounting, and the no-open-color far-field row. The same-record target now has durable evidence tying $p+n$ and $p+p$ orientation counts to $E$, $\mathbf p$, and $\mathbf J$ conservation plus Coulomb separation. The no-open-color target still remains target-only, and the fail-closed blocker packets [no-open-color-far-field-source-acquisition-blocker.v1.json](../../../scripts/nuclear-atomic/no-open-color-far-field-source-acquisition-blocker.v1.json) and [accepted-branch-interface-rows-source-acquisition-blocker.v1.json](../../../scripts/nuclear-atomic/accepted-branch-interface-rows-source-acquisition-blocker.v1.json) record why sample-level finite-tail behavior, accepted proton/neutron branch-interface ledgers, same-record conservation, and candidate $p+n$/$p+p$ orientation counts are not enough. The checker prevents a future pass from treating a named upstream object as accepted if the ledger components or durable evidence are missing.

The accepted branch-interface row-bundle scaffold is now explicit and still priority-only: $\mathcal B_{\mathrm{br}}=(B_{pn},B_{pp},L_{E\mathbf p\mathbf J},\mathcal C_{\mathrm{no\ open}},\Gamma_p,\Gamma_n)$ with $W_c=\frac{N_{\mathrm{share},c}}{N_{\mathrm{ret},c}}P_c$, $M_c=1-W_c$, and $W_{pn}>W_{pp}$ plus $M_{pn}<M_{pp}$ in the same record as the no-open-color condition. This locks the branch-interface coefficients and finite-tail graph rules behind accepted `nucleon_branch_interface_ledgers`, `pn_orientation_count`, `pp_orientation_count`, same-record conservation, and `no_open_color_far_field`, rather than letting the Fe/Ni toy consume partial input ledgers.

The immediate no-open-color proof scaffold is now the priority-only limit $\lim_{R\to\infty}\mathcal N_{\mathrm{open}}(R)=0$ for a same-record far-field diagnostic built from $\Delta E_{\mathrm{corr}}^{NN}$, the two color-singlet nucleon envelopes, and the $p+n$/$p+p$ branch-interface record. The blocker packet now carries the same bridge as the audit target: $\mathcal N_{\mathrm{open}}(R)\le K_{\mathrm{open}}\mathcal T_{NN}(R)^2$, so $\lim_{R\to\infty}\mathcal T_{NN}(R)=0$ with finite $K_{\mathrm{open}}$ becomes the analytic route from finite residual tail to no-open-color far field. It remains non-promotional until `accepted_delta_E_corr_NN`, `finite_range_residual`, `color_singlet_closure`, `same_record_no_open_color_audit`, and `accepted_branch_interface_rows` are accepted in the same retained record.

The same-record audit scaffold packages that condition as $\mathcal A_{\mathrm{no\ open}}=(L_{E\mathbf p\mathbf J},B_{pn},B_{pp},\Gamma_{N_1},\Gamma_{N_2},\Delta E_{\mathrm{corr}}^{NN},\mathcal N_{\mathrm{open}})$. Its sufficient-condition target is `finite_range_residual` plus `color_singlet_closure` plus $\lim_{R\to\infty}\mathcal N_{\mathrm{open}}(R)=0$ implying `no_open_color_far_field` in the same event record; `finite_tail_saturation_check` and `bounded_degree_surface_depleted_corridor_estimator` stay locked until that audit is accepted. The proof bridge is now the priority-only bound $\mathcal N_{\mathrm{open}}(R)\le K_{\mathrm{open}}\mathcal T_{NN}(R)^2$: if $\lim_{R\to\infty}\mathcal T_{NN}(R)=0$ and $K_{\mathrm{open}}$ is finite in the same $\mathcal B_{\mathrm{br}}$ record, the open-color far-field norm closes without retuning Fe/Ni coefficients.

The finite-range residual packet now makes the prior tail step explicit: define $\mathcal T_{NN}(R)=\sup_{r\ge R}|\Delta E_{\mathrm{corr}}^{NN}(r;\Gamma_{N_1},\Gamma_{N_2},\sigma_{\mathrm{eff}},\rho_{\text{NS}},\chi_{\text{sea}})|$ and require $\lim_{R\to\infty}\mathcal T_{NN}(R)=0$ in the same $\sigma_{\mathrm{eff}}$, color-singlet, branch-interface, and Noether sea response record. This is a priority-only proof scaffold; it feeds `same_record_no_open_color_audit`, `no_open_color_far_field`, and `no_free_color_asymptotic_state` after acceptance rather than assuming those rows first.

## Open Unknowns And Candidate Noether Links

Status. Priority-only discussion map. These are not claims that Noether sea response or Noether braid branch geometry explains the listed phenomena. Each row is a possible recovery target: if the link is real, it should eventually appear as an analytic equation, accepted source row, simulation target, or event-ledger closure condition.

| Unknown or recovery target | Possible $\mathbb{A}\mathbb{A}\mathbb{A}$ handle | First useful test |
| --- | --- | --- |
| Iron-group binding cusp: fusion from below and fission from above both favor the Fe/Ni neighborhood. | Shared branch-interface, confinement-functional, weak-channel, and Noether sea response rows create a finite binding-per-nucleon optimum without per-element tuning. | Keep the toy sweep tied to accepted source rows and require the same bundle to pass deuteron, diproton, saturation, beta-stability, fusion, fission, and Fe/Ni-window checks. |
| Deuteron bound while ordinary diproton is unbound. | $p+n$ and $p+p$ branch-interface rows differ through orientation, Coulomb cost, and corridor mismatch rather than an arbitrary nuclear-force label. | Promote only after the branch-interface extraction supplies accepted $p+n$/$p+p$ source rows and the toy graph keeps `deuteron_unbound` and `diproton_overbound` fail-closed. |
| Nuclear saturation: binding per nucleon stops growing indefinitely. | Local residual corridors and Noether sea polarization rewards have finite capacity per nucleon. | Derive a bounded coordination term $C_{ij}$ and show high-$A$ binding tails flatten or drop without hidden fit. |
| Shell closures and magic-number-like stability. | Closed-pattern readout from retained branch packing and electron/nuclear occupancy rows, not source ontology inserted by hand. | Separate shell labels from source rows, then test whether closed-pattern residuals emerge from graph or spatial packing sweeps. |
| Beta-stability valley and neutron excess in heavy nuclei. | Weak-channel provenance plus Noether sea response penalties constrain proton-neutron imbalance. | Require accepted `V-A` chirality, reaction-event, lepton/neutrino, recoil, and Noether sea update rows before using beta-stability terms as promotion evidence. |
| Alpha decay and alpha clustering. | A four-nucleon subassembly may be a locally stable event-output packet with its own branch-interface and event-ledger rows. | Build one parent/daughter/alpha/recoil/heat ledger and reject any account that loses emitted-product or Noether sea update rows. |
| Gamma spectra from nuclear transitions. | Photon-channel output is a reaction-event row sourced by a nuclear state change, not a generic radiation label. | Route photon carrier/source evidence to `EQ-29` only when the gamma-channel carrier is the active blocker; keep nuclear parent/daughter accounting here. |
| Radioisotope heat, such as Pu-238 engineering examples. | Decay event provenance routes energy into daughter assembly, emitted particles, recoil, heat, photons when present, and Noether sea update. | Write one heat-channel provenance object that conserves $E$, $\mathbf p$, and $\mathbf J$ without shielded-energy leakage. |
| Neutron-rich nuclei, neutron skins, and drip-line behavior. | Packing, weak-channel, and Noether sea response rows may limit how far neutron excess can remain bound. | Define a neutron-excess failure row that distinguishes weak instability from packing or corridor failure. |
| Island-of-stability style long-lived heavy nuclei. | Shell/readout closure and deformation costs may create local retained-assembly pockets despite large Coulomb stress. | Test whether closed-pattern terms improve lifetime/stability proxies without retuning element by element. |
| Atomic orbital spectra. | Orbitals are effective occupancy/readout patterns for localized assemblies coupled to electron-envelope and Noether sea coarse-graining rows. | Triage the dormant electron-orbitals note into hydrogen and helium boundary cases with explicit claim level. |
| Periodic-table families. | Periodic behavior may be a recovered observer summary of repeated occupancy/readout and electron-envelope constraints. | Treat family labels as outputs and ask whether atomic rows recover spectra, valence-like behavior, and stability patterns. |
| Isotope shifts and hyperfine/fine structure. | Nuclear assembly changes perturb electron-envelope and local Noether sea response rows. | Pick one isotope-shift or splitting case only after nuclear, electron, and transition ledgers are explicit. |
| Molecular bond formation and bond energies. | Bonds are event-ledger outcomes over nuclei, electron envelopes, path selection, recoil, heat, emitted/absorbed radiation, and Noether sea response. | Choose one simple molecule and define a bond/event ledger before importing ordinary chemistry labels as source fields. |
| Molecular geometry and stereochemistry. | Stable molecular geometry is a retained packing/readout pattern with path-history and response margins. | Use one molecule to test whether geometry follows from occupancy, exclusion, and path ledger constraints. |
| Reaction barriers and catalysts. | Catalysts change admissible path geometry or local response conditions, not conservation bookkeeping. | Pick one catalyzed reaction and express barrier lowering as path selection with unchanged event-ledger accounting. |
| Enzyme active-site specificity. | Enzyme pockets are molecular geometry plus local Noether sea response conditions that select reaction paths. | Choose one enzyme mechanism and map active site, substrate, state transition, energy routing, and failure modes. |
| DNA/RNA record stability and mutation. | Information-bearing molecular geometry is a retained record with bond integrity, path-history, radiation/chemical damage rows, and repair/rewrite channels. | Choose one DNA/RNA motif or damage event and state record integrity as molecular event-ledger closure. |
| Chiral preference in biomolecules. | Chirality may reflect retained branch geometry, assembly path selection, or environmental history rather than a separate biological ontology. | Keep as speculation until one molecular path calculation shows a branch-geometry asymmetry or rejects it. |
| Condensed-matter pressure and phase response near atoms. | Atomic packing may retune local Noether sea density, delay, effective speed, and assembly strain rows. | Route pressure and transport questions to `braid-mass-response-map` unless the active target is an isolated atom, molecule, or reaction event. |

## Worked Recovery Target: Iron-Group Binding Cusp

Status. Candidate recovery target. This section is a first worked target for the bucket, not a canon claim that the recovery has been achieved.

Packet. The reduced recovery packet is [Iron Group Binding Cusp Recovery](iron-group-binding-cusp-recovery.md).

Executable diagnostic. The first priority-only toy graph sweep is [iron-group-binding-cusp-toy-sweep.mjs](../../../scripts/nuclear-atomic/iron-group-binding-cusp-toy-sweep.mjs).

Source-binding gate. The source-binding manifest is [iron-group-binding-cusp-source-binding-candidates.v1.json](../../../scripts/nuclear-atomic/iron-group-binding-cusp-source-binding-candidates.v1.json). The first source targets are [nucleon-branch-interface-source-target.v1.json](../../../scripts/nuclear-atomic/nucleon-branch-interface-source-target.v1.json), [confinement-functional-source-target.v1.json](../../../scripts/nuclear-atomic/confinement-functional-source-target.v1.json), the weak-channel muon projection evidence packet, and the accepted retained-window Noether sea provider. The row-shape sweep currently passes, but promotion readiness is blocked at `missing_accepted_nucleon_branch_interface_ledgers`.

Branch-interface success marker. [nucleon-branch-interface-source-target-check.mjs](../../../scripts/nuclear-atomic/nucleon-branch-interface-source-target-check.mjs) verifies that the current $p+n$ and $p+p$ orientation extraction is algebraically consistent, accepts the proton, neutron, and same-record source-acquisition rows from [proton-branch-interface-ledger-retained-evidence.v1.json](../../../scripts/nuclear-atomic/proton-branch-interface-ledger-retained-evidence.v1.json), [neutron-branch-interface-ledger-retained-evidence.v1.json](../../../scripts/nuclear-atomic/neutron-branch-interface-ledger-retained-evidence.v1.json), and [same-record-energy-momentum-angular-momentum-ledger-retained-evidence.v1.json](../../../scripts/nuclear-atomic/same-record-energy-momentum-angular-momentum-ledger-retained-evidence.v1.json), and keeps `--require-accepted` fail-closed until `nucleon_branch_interface_ledgers`, `pn_orientation_count`, and `pp_orientation_count` are accepted rows and no-open-color acquisition is durable. This is a success marker for the reduced branch-interface algebra and source acquisition, not corpus promotion.

Component-shape marker. The same branch-interface checker also validates `sourceAcquisitionTargets.requiredLedgerComponents`, so an accepted-looking proton, neutron, same-record, or no-open-color target fails if it loses one of the required component rows. The current source-acquisition frontier is `missing_no_open_color_far_field`; the accepted proton, neutron, and same-record rows do not accept the no-open-color row or top-level branch-interface rows. The checker now emits `sourceAcquisitionBlockerMap`, whose active `no_open_color_far_field` blocker holds `nucleon_branch_interface_ledgers`, `pn_orientation_count`, and `pp_orientation_count`, and directly blocks `alphaCorr`, `alphaPair`, `alphaPack`, `dSat`, `maxDegree`, `pnCorridorPairReward`, `pnPairMismatchCost`, `ppCorridorPairReward`, `ppPairMismatchCost`, `bounded_degree_surface_depleted_corridor_estimator`, and `finite_tail_saturation_check`. The branch target also carries an `acceptedSourceRowProofTargets.nucleon_branch_interface_ledgers` surface: a future accepted top-level branch-interface row must keep proton ledger, neutron ledger, $p+n$/$p+p$ orientation rows, same-record $E$, $\mathbf p$, and $\mathbf J$ ledger, and no-open-color far-field in one same-record proof target, with `finite_range_residual`, `color_singlet_closure`, and `same_record_no_open_color_audit` as closure rows, $W_{pn}>W_{pp}$ plus $M_{pn}<M_{pp}$ as the retained channel inequalities, and the no-open limit statements $\lim_{R\to\infty}\mathcal N_{\mathrm{open}}(R)=0$, $\mathcal N_{\mathrm{open}}(R)\le K_{\mathrm{open}}\mathcal T_{NN}(R)^2$, and $\lim_{R\to\infty}\mathcal T_{NN}(R)=0$. This proof target is priority-only and not accepted source evidence. The no-open-color blocker keeps the next proof target concrete: accepted finite-range residual, color-singlet closure, and same-record no-open-color audit in the same branch-interface/confinement-functional record.

Confinement-functional success marker. [confinement-functional-source-target-check.mjs](../../../scripts/nuclear-atomic/confinement-functional-source-target-check.mjs) verifies that the current $\sigma_{\mathrm{eff}}$, color-singlet envelope, $\Delta E_{\mathrm{corr}}^{NN}$, no-open-color, and toy-binding dependency structure is internally consistent and keeps `--require-accepted` fail-closed until `sigma_eff_extraction`, `color_singlet_nucleon_envelope`, `delta_E_corr_NN`, and `no_open_color_far_field` are accepted rows. This is a success marker for the confinement-functional dependency chain, not corpus promotion.

Confinement source-acquisition marker. The confinement-functional checker now also validates `sourceAcquisitionTargets.requiredLedgerComponents` and accepts the retained $K_{\perp}$ transverse-stiffness source row from [K-perp-transverse-stiffness-functional-retained-evidence.v1.json](../../../scripts/nuclear-atomic/K-perp-transverse-stiffness-functional-retained-evidence.v1.json), the retained excitation-potential row from [V-exc-excitation-potential-functional-retained-evidence.v1.json](../../../scripts/nuclear-atomic/V-exc-excitation-potential-functional-retained-evidence.v1.json), the retained $\rho_{\text{NS}}$ confinement-domain consumption row from [rho-NS-confinement-domain-retained-evidence.v1.json](../../../scripts/nuclear-atomic/rho-NS-confinement-domain-retained-evidence.v1.json), the retained $\chi_{\text{sea}}$ delay-factor row from [chi-sea-confinement-delay-factor-retained-evidence.v1.json](../../../scripts/nuclear-atomic/chi-sea-confinement-delay-factor-retained-evidence.v1.json), the retained axis-exceptionality charge row from [axis-exceptionality-charge-confinement-retained-evidence.v1.json](../../../scripts/nuclear-atomic/axis-exceptionality-charge-confinement-retained-evidence.v1.json), and the retained same-record Noether sea response row from [same-record-noether-sea-response-confinement-retained-evidence.v1.json](../../../scripts/nuclear-atomic/same-record-noether-sea-response-confinement-retained-evidence.v1.json). The current $\sigma_{\mathrm{eff}}$ row now has all declared source-acquisition rows accepted, but the top row itself remains target-only; broader confinement acquisition remains blocked first at `missing_accepted_accepted_proton_color_singlet_envelope`. The fail-closed blocker packets [accepted-sigma-eff-extraction-source-acquisition-blocker.v1.json](../../../scripts/nuclear-atomic/accepted-sigma-eff-extraction-source-acquisition-blocker.v1.json), [same-record-branch-interface-source-acquisition-blocker.v1.json](../../../scripts/nuclear-atomic/same-record-branch-interface-source-acquisition-blocker.v1.json), [proton-color-singlet-envelope-source-acquisition-blocker.v1.json](../../../scripts/nuclear-atomic/proton-color-singlet-envelope-source-acquisition-blocker.v1.json), [neutron-color-singlet-envelope-source-acquisition-blocker.v1.json](../../../scripts/nuclear-atomic/neutron-color-singlet-envelope-source-acquisition-blocker.v1.json), [accepted-color-singlet-nucleon-envelope-source-acquisition-blocker.v1.json](../../../scripts/nuclear-atomic/accepted-color-singlet-nucleon-envelope-source-acquisition-blocker.v1.json), [accepted-branch-interface-rows-source-acquisition-blocker.v1.json](../../../scripts/nuclear-atomic/accepted-branch-interface-rows-source-acquisition-blocker.v1.json), [color-singlet-closure-source-acquisition-blocker.v1.json](../../../scripts/nuclear-atomic/color-singlet-closure-source-acquisition-blocker.v1.json), [no-free-color-asymptotic-state-source-acquisition-blocker.v1.json](../../../scripts/nuclear-atomic/no-free-color-asymptotic-state-source-acquisition-blocker.v1.json), [accepted-delta-E-corr-NN-source-acquisition-blocker.v1.json](../../../scripts/nuclear-atomic/accepted-delta-E-corr-NN-source-acquisition-blocker.v1.json), [finite-range-residual-source-acquisition-blocker.v1.json](../../../scripts/nuclear-atomic/finite-range-residual-source-acquisition-blocker.v1.json), [same-record-no-open-color-audit-source-acquisition-blocker.v1.json](../../../scripts/nuclear-atomic/same-record-no-open-color-audit-source-acquisition-blocker.v1.json), [no-open-color-far-field-source-acquisition-blocker.v1.json](../../../scripts/nuclear-atomic/no-open-color-far-field-source-acquisition-blocker.v1.json), and [finite-residual-corridor-overlap-source-acquisition-blocker.v1.json](../../../scripts/nuclear-atomic/finite-residual-corridor-overlap-source-acquisition-blocker.v1.json) record why the nearby branch-interface ledgers, candidate branch-interface orientation rows, color-singlet closure prose, target residual equation, accepted $\sigma_{\mathrm{eff}}$ input rows, and sample-level overlap row are not enough: the missing evidence is accepted $\sigma_{\mathrm{eff}}$ extraction, accepted same-record branch-interface bundle, accepted top-level branch-interface row bundle, accepted color-singlet nucleon envelope bundle, accepted color-singlet closure over proton and neutron envelopes, accepted same-domain $\Delta E_{\mathrm{corr}}^{NN}$ derivation, finite envelope boundaries, finite residual tail, same-record no-open-color audit, no-free-color asymptotic-state audit, and no-open-color far-field closure in the same confinement-functional domain. The finite-tail toy controls now consume `finite_range_residual` explicitly rather than relying on the no-open-color row to imply it.

The confinement checker now emits `sourceAcquisitionBlockerMap` as well. Its first active blocker is `accepted_proton_color_singlet_envelope`, which holds `color_singlet_nucleon_envelope` behind accepted proton color-singlet closure, finite envelope boundary, and no-free-color asymptotic-state audit, and directly blocks `alphaSurf`, `alphaPair`, `alphaShell`, `boundaryDegreeLoss`, and `bounded_degree_surface_depleted_corridor_estimator`. Later confinement blockers similarly route accepted $\sigma_{\mathrm{eff}}$, color-singlet envelope, branch-interface, finite-overlap, $\Delta E_{\mathrm{corr}}^{NN}$, finite-range residual, color-singlet closure, and same-record no-open-color audit obligations to the toy coefficients and graph rules that consume the blocked rows.

The accepted-$\sigma_{\mathrm{eff}}$ blocker now carries the priority-only extraction scaffold $\sigma_{\mathrm{eff}}(Q;\rho_{\text{NS}},\chi_{\text{sea}})=\inf_{a,f}\mathcal S_{\sigma}[a,f;Q,\rho_{\text{NS}},\chi_{\text{sea}}]$, with $\mathcal S_{\sigma}$ built from the accepted $K_{\perp}$ and $V_{\mathrm{exc}}$ rows in the same $\rho_{\text{NS}}$, $\chi_{\text{sea}}$, axis-exceptionality, and Noether sea response record. This locks `alphaSea`, `pnCorridorPairReward`, and `ppCorridorPairReward` behind a refinement-stable extraction certificate instead of letting them consume accepted inputs or the target equation alone.

Weak-channel success marker. [weak-channel-source-target-check.mjs](../../../scripts/nuclear-atomic/weak-channel-source-target-check.mjs) verifies that the current muon weak-channel source accepts `weak_visible_branch_ledger`, `weak_projection`, `weak_quotient`, and `weak_exposure_record`, keeps the weak rows in one retained domain and branch record, preserves zero weak residuals, and ties the Fe/Ni beta-stability, asymmetry, and sea-imbalance toy rows to weak source rows. It keeps `--require-accepted` fail-closed until `va_chirality_gate`, `reaction_event_ledger`, the weak-channel `noether_sea_response` update row, and the remaining downstream weak rows become accepted.

Weak source-acquisition marker. The weak-channel checker now also validates `sourceAcquisitionTargets.requiredLedgerComponents`. The current source-acquisition report accepts the retained muon `weak_visible_branch_ledger`, `weak_projection`, `weak_quotient`, and `weak_exposure_record` targets, but its first downstream acquisition blocker remains `missing_accepted_va_chirality_gate`. The fail-closed blocker packet [va-chirality-gate-source-acquisition-blocker.v1.json](../../../scripts/equation-mapping/va-chirality-gate-source-acquisition-blocker.v1.json) records why the retained weak quotient, weak exposure row, and priority-only `V-A` benchmark table are not enough: the missing evidence is an accepted same-domain `V-A` chirality gate over `D_weak_visible_attempt_0001` / `A_weak_attempt_0001` with left-channel charged-current selection, right-channel charged-current suppression, and Michel-parameter binding. The toy-bound downstream blocker packets [weak-reaction-event-ledger-source-acquisition-blocker.v1.json](../../../scripts/equation-mapping/weak-reaction-event-ledger-source-acquisition-blocker.v1.json) and [weak-noether-sea-response-source-acquisition-blocker.v1.json](../../../scripts/equation-mapping/weak-noether-sea-response-source-acquisition-blocker.v1.json) separately keep `alphaAsym`, `betaValleySlope`, `beta_stable_band_center`, and `seaImbalancePenalty` from promoting on retained quotient/exposure rows or the accepted retained-window Noether sea provider alone. The weak target now carries `acceptedSourceRowProofTargets.va_chirality_gate`, `acceptedSourceRowProofTargets.reaction_event_ledger`, and `acceptedSourceRowProofTargets.noether_sea_response`: the V-A proof target must retain the weak branch ledger, projection, quotient, exposure row, chirality row, same-domain rows, charged-current left-channel selection, right-channel charged-current suppression, and Michel-parameter binding; the event ledger must retain same-domain weak branch, projection, quotient, exposure, accepted $V-A$ gate, energy, momentum, angular momentum, emitted-product, recoil accounting, and one same-record event balance $L_{\mathrm{weak}}^{\mathrm{in}}+L_{\mathrm{sea}}^{\mathrm{in}}=L_{\mathrm{emitted}}+L_{\mathrm{recoil}}+L_{\mathrm{heat/radiation}}+\Delta L_{\mathrm{sea}}^{\mathrm{weak}}$; and the weak-event Noether sea row must retain the reaction event ledger, same-domain Noether sea update row, and the distinction from the retained-window Noether sea response provider. This makes the next mathematical target the chirality gate itself, followed by the same-domain weak reaction event ledger and weak-event Noether sea update, not another Fe/Ni beta-valley coefficient adjustment.

The weak-channel checker now emits `sourceAcquisitionBlockerMap` too. Its first active blocker is `va_chirality_gate`, which is not directly consumed by the Fe/Ni toy but remains the first upstream weak proof target. The map also names the toy-bound weak blockers: `reaction_event_ledger` directly blocks `alphaAsym`, `betaValleySlope`, and `beta_stable_band_center`, while the weak-channel `noether_sea_response` update row directly blocks `seaImbalancePenalty`. This keeps the accepted retained-window Noether sea source family separate from the weak-event Noether sea update required by beta-stability accounting.

Noether sea response success marker. [noether-sea-response-source-target-check.mjs](../../../scripts/nuclear-atomic/noether-sea-response-source-target-check.mjs) verifies that the retained-window density-compression provider is durable source evidence, accepts the required $\rho_{\text{NS}}$, $\theta_{\mathrm{sea}}$, stress-strain, speed, causality, and correlation rows, keeps acoustic-elastic agreement within the refinement tolerance, and ties `alphaSea`, `seaImbalancePenalty`, and `noether_sea_polarization_reward` to accepted Noether sea response rows. Its `toyBindingCheck.rowConsumption` now records the accepted-row success marker directly: `rho_NS` and `theta_sea` feed `alphaSea`, `seaImbalancePenalty`, and `noether_sea_polarization_reward`; `stress_strain_row` feeds `alphaSea` and `noether_sea_polarization_reward`; and `causality_row` feeds `noether_sea_polarization_reward`. This is currently the one accepted source family in the Fe/Ni toy source-binding report, but it remains distinct from the weak-event `noether_sea_response` update row blocked in the weak-channel family.

Next mathematical target. Do not tune the Fe/Ni result as an isolated curve fit. Tie each toy coefficient and graph rule back to accepted source rows, then ask whether the same reduced row bundle still produces the deuteron, diproton, saturation, beta-stability, fusion, fission, and Fe/Ni-window checks.

Report surface. The executable report now exposes row-level obligations under `sourceBinding.coefficientBindings` and `sourceBinding.graphRuleRowBindings`; these are the rows that must become accepted before any corpus promotion. Each required row now carries `rowEvidence`, `localAcceptedRows`, and `promotionEligibleRows`, so the report can distinguish a locally accepted row inside a target-only family from a row that is accepted in a promotion-eligible family. Accepted rows carry `acceptedEvidenceTrace`, which preserves the durable evidence status, source path or source-target path, same-domain or branch-record fields when available, and the rule that a locally accepted component row is not promotion evidence unless the owning source family is accepted. `sourceBinding.sourceRowRequirementIndex` aggregates the same obligations by source row and lists the coefficients or graph rules that consume each row; the current index has 18 required source rows, four promotion-eligible Noether sea response rows, and `branch_interface.nucleon_branch_interface_ledgers` as the first blocked row. It also emits `sourceBinding.familyDistinctionLocks`, currently locking the accepted retained-window Noether sea response family away from the weak-channel `noether_sea_response` update row consumed by `seaImbalancePenalty`, and `sourceBinding.partialSourceMarkerLocks`, currently marking local accepted rows as partial markers rather than promotion evidence when their owning family or binding remains blocked. Those locks now cover the branch-side same-record conservation row consumed by `alphaCoul`, `ppCoulombCost`, `pnPairMismatchCost`, and `ppPairMismatchCost`, and the weak-side retained `weak_quotient`, `weak_projection`, and `weak_exposure_record` rows consumed by `alphaAsym`, `betaValleySlope`, `seaImbalancePenalty`, and `beta_stable_band_center` while `reaction_event_ledger`, weak-event `noether_sea_response`, and `va_chirality_gate` remain missing. The report now makes release accounting structural too: `releaseAccounting.ordinaryFissionFusionLedgerRoutes` and the representative heavy-split row must both retain daughter-binding, emitted-product, recoil, heat, photon-when-present, medium-exchange, and Noether sea update routes while `survivingNucleonShieldedEnergyUsed` stays false. `validationErrors` fails if a toy coefficient or graph rule lacks non-empty row requirements for each declared source family, if row-evidence traceability or accepted-row evidence trace is missing, if the source-row requirement index is missing or inconsistent, if a family-distinction or partial-source-marker lock is dropped, malformed, or failed, if the promotion summary drifts from the recomputed family, binding, row-index, lock, and coverage state, or if the fission/fusion release-accounting invariant drifts. The promotion-ready gate is `sourceBinding.summary.allPromotionBindingsAccepted`, which requires accepted source families, accepted coefficient row bindings, accepted graph-rule row bindings, row-evidence traceability, source-row requirement indexing, preserved family-distinction locks, partial-source-marker discipline, and complete coverage at the same time.

The blocker-map entries now carry `sourceAcquisitionRoute` as a priority-only route surface. For each missing source row, the route lists the row components required before use, the accepted rows required before promotion use, downstream rows fed only after acceptance, and rows that must remain downstream rather than prerequisites. The same route is now copied into `rowEvidence` and `sourceBinding.sourceRowRequirementIndex`, so a toy coefficient or graph rule that consumes a missing row carries the exact source-acquisition route that would unblock it. The first blocked branch row also carries `acceptedSourceRowProofTarget` through the same report surfaces, so `branch_interface.nucleon_branch_interface_ledgers` names the exact same-record rows, closure rows, retained inequalities, no-open limit statements, forbidden target-only promotion sources, and direct toy consumers before any promotion attempt. The Fe/Ni validator now requires each proof target to retain its row-specific specialty field, so branch-interface row evidence cannot drop the no-open limit statements while keeping only the $p+n$/$p+p$ inequalities. The confinement-side proof-target surface now covers all toy-consuming confinement rows: `sigma_eff_extraction` requires a same-domain extraction certificate over accepted $K_{\perp}$, $V_{\mathrm{exc}}$, $\rho_{\text{NS}}$, $\chi_{\text{sea}}$, axis-exceptionality charge, and same-record Noether sea response rows; `color_singlet_nucleon_envelope` requires accepted proton and neutron color-singlet envelopes, no-free-color asymptotic state, and same-record branch interface; `delta_E_corr_NN` requires accepted $\sigma_{\mathrm{eff}}$, accepted color-singlet envelope, accepted branch-interface rows, and finite residual corridor overlap; `finite_range_residual` requires the tail statements $\lim_{R\to\infty}\mathcal T_{NN}(R)=0$, $O_{NN}$ finite, and exponential-decay tail control; and `no_open_color_far_field` must retain `accepted_delta_E_corr_NN`, `finite_range_residual`, `color_singlet_closure`, `same_record_no_open_color_audit`, accepted branch-interface rows, and same-record Noether sea response while preserving $\lim_{R\to\infty}\mathcal N_{\mathrm{open}}(R)=0$, $\mathcal N_{\mathrm{open}}(R)\le K_{\mathrm{open}}\mathcal T_{NN}(R)^2$, and $\lim_{R\to\infty}\mathcal T_{NN}(R)=0$. The weak-channel rows now carry matching proof-target surfaces for `weak_channel.reaction_event_ledger` and `weak_channel.noether_sea_response`, including conservation rows, Noether sea update rows, forbidden target-only promotion sources, and direct toy consumers. This makes the branch-interface no-open-color, confinement-functional, weak reaction-event, and weak-event Noether sea blockers executable in the Fe/Ni report without changing claim level or promoting any target-only row.

| Source family | What it must justify before promotion | Current blocker |
| --- | --- | --- |
| `branch_interface` | Pair corridor rewards, pair mismatch costs, bounded local degree, corridor saturation, and the $p+n$ versus $p+p$ channel distinction. | `missing_accepted_nucleon_branch_interface_ledgers` |
| `confinement_functional` | Corridor scale, surface loss, large-$A$ packing behavior, shell/readout envelope, and finite saturation. | `missing_accepted_sigma_eff_extraction` |
| `weak_channel` | Beta-stable band, asymmetry pressure, beta-decay provenance, and weak-channel consistency with the Noether sea response row. | `missing_accepted_va_chirality_gate` |
| `noether_sea_response` | Local $\theta_{\mathrm{sea}}$, $\rho_{\text{NS}}$, density-compression response, and bounded sea-polarization reward. | Accepted by the retained-window provider and checked by `noether-sea-response-source-target-check.mjs`. |

Question. Can a native $\mathbb{A}\mathbb{A}\mathbb{A}$ nuclear assembly model reproduce the iron-group binding-energy cusp: fusion from lighter nuclei and fission from heavier nuclei both move nuclear inventories toward the same total mass-energy trough near the Fe/Ni region?

Candidate recovery object:

$$
E_{\mathrm{nuc}}(A,Z;\Theta)
=
\sum_{a=1}^{A}M_a c_{\text{eff}}^2
+
E_{\mathrm{corr}}
+
E_{\mathrm{Coul}}
+
E_{\mathrm{excl}}
+
E_{\mathrm{shell}}
+
E_{\mathrm{sea-pol}},
$$

where $A$ is nucleon count, $Z$ is proton count, and $\Theta$ collects the branch-interface, corridor, shell, packing, and local Noether sea response rows. The comparison target is

$$
B(A,Z;\Theta)
=
Z M_p c_{\text{eff}}^2
+
(A-Z)M_n c_{\text{eff}}^2
-
E_{\mathrm{nuc}}(A,Z;\Theta),
$$

and

$$
b_*(A;\Theta)
=
\max_{Z\in\mathcal{V}_{\beta}(A)}
\frac{B(A,Z;\Theta)}{A},
$$

where $\mathcal{V}_{\beta}(A)$ is the candidate beta-stable valley row for the given $A$. A successful recovery should put

$$
\operatorname*{argmax}_{A} b_*(A;\Theta)
\in
\mathcal{W}_{\mathrm{Fe/Ni}},
$$

where $\mathcal{W}_{\mathrm{Fe/Ni}}$ is an iron-group window rather than a single isotope claim. The exact winner depends on whether the comparison uses binding energy per nucleon, nuclear mass, atomic mass, isotope stability, or astrophysical endpoint.

Analytic route. The first calculation should ask whether the effective terms naturally create a finite optimum:

- $E_{\mathrm{corr}}+E_{\mathrm{sea-pol}}$ grows favorably while new short-range corridor relationships are available, but saturates once each nucleon has enough compatible neighbors.
- $E_{\mathrm{excl}}$ penalizes over-compression and poor local packing.
- $E_{\mathrm{shell}}$ records closed or especially stable packing/readout patterns without making shell labels source ontology.
- $E_{\mathrm{Coul}}$ grows with proton inventory across the whole assembly and eventually overburdens heavy nuclei.

For a rough fission check, if

$$
E_{\mathrm{Coul}}
\sim
a_C\frac{Z^2}{A^{1/3}},
$$

then splitting a parent roughly in half gives

$$
2a_C\frac{(Z/2)^2}{(A/2)^{1/3}}
=
2^{-2/3}a_C\frac{Z^2}{A^{1/3}}.
$$

The daughter pair carries only about $63\%$ of the parent Coulomb stress before surface, deformation, shell, emitted-product, recoil, heat, and Noether sea update rows are included. In this candidate reading, fission becomes favorable when Coulomb-stress relief plus better daughter packing exceeds the cost of new surfaces and event outputs. Fusion becomes favorable on the light side when adding nucleons creates new residual corridors and cheaper shared Noether sea polarization faster than Coulomb and exclusion costs grow.

Simulation route. The smallest useful toy model is a graph or spatial packing sweep:

1. Represent each nucleon as a proton or neutron node with branch-interface rows.
2. Add compatible short-range corridor edges using orientation and mismatch weights inherited from $\mathcal B_{ij}^{\mathrm{int}}$.
3. Add proton-proton Coulomb costs separately from residual corridor costs.
4. Add local exclusion/overpacking penalties.
5. Add a coarse Noether sea polarization reward for compatible local corridor networks.
6. Optimize or sample candidate graphs for each $(A,Z)$ and record $B(A,Z;\Theta)/A$.
7. Sweep $A$ and the beta-stable $Z$ band to see whether the maximum falls in $\mathcal{W}_{\mathrm{Fe/Ni}}$ without per-element retuning.

Fail-closed conditions:

- `deuteron_unbound`: the same model cannot bind $p+n$.
- `diproton_overbound`: the model binds $p+p$ in ordinary conditions after Coulomb and branch-interface rows are included.
- `no_saturation`: binding per nucleon grows without a finite maximum.
- `wrong_cusp_region`: the maximum lands far outside the iron-group window.
- `hidden_fit`: Fe/Ni placement requires element-specific tuning rather than shared corridor, Coulomb, shell, packing, and Noether sea response terms.
- `ledger_loss`: fusion or fission energy is not routed into emitted products, recoil, heat, photon rows when present, medium exchange, and Noether sea update.

## Nuclear Radiation And Radioisotopes

Candidate focus:

- alpha decay as parent assembly, alpha output, daughter assembly, recoil, heat, and path-history provenance;
- beta stability and beta decay as a shared nuclear-energy, weak-channel, lepton/neutrino, recoil, and Noether sea update problem;
- gamma output as a photon-channel row emitted from a nuclear event ledger, not as a generic radiation label;
- radioisotope heat examples such as Pu-238 to RTG as engineering-facing provenance exercises;
- nuclear radiation damage as molecular/biomolecular event routing only after the local nuclear and photon/particle source rows are explicit.

Routing rule: keep the nuclear parent/daughter, recoil, heat, and stability rows here. Route photon-source evidence to `EQ-29` only when the active blocker is the accepted radiation-source carrier, channel family, source mechanism, or source branch.

First useful object:

$$
\Theta_{\mathrm{nuc\ rad}}
=
\left(
\mathcal{A}_{\mathrm{parent}},
\mathcal{A}_{\mathrm{daughter}},
\mathcal{Y}_{\mathrm{emit}},
\mathcal{R}_{\mathrm{recoil}},
\mathcal{H}_{\mathrm{heat}},
\mathcal{L}_{E\mathbf{p}\mathbf{J}},
\mathcal{H}_{\mathrm{path}}
\right).
$$

The object remains incomplete until $\mathcal{Y}_{\mathrm{emit}}$ separates alpha, beta/lepton, gamma/photon, neutrino, and non-radiative channels with source provenance.

## Atomic Orbitals And Periodic Structure

Candidate focus:

- triage [dormant-deferred/electron-orbitals](../dormant-deferred/electron-orbitals/electron-orbitals.md) into a priority packet that separates standard orbital notation from $\mathbb{A}\mathbb{A}\mathbb{A}$ localized-assembly interpretation;
- use hydrogen and helium as the first clean boundary cases for exact assembly membership, dynamic exclusion envelope, electron resonance envelope, and ambient Noether sea coarse-graining;
- treat periodic-table families as recovered observer summaries, not as source inputs;
- connect spectra to reaction/radiation event ledgers only after the atomic transition source row is explicit.

First useful object:

$$
\Theta_{\mathrm{atom}}
=
\left(
\mathcal{A}_{\mathrm{nuc}},
\mathcal{E}_{e},
\mathcal{B}_{\mathrm{occ}},
\mathcal{R}_{\mathrm{excl}},
\mathcal{S}_{\mathrm{spec}},
\mathcal{L}_{E\mathbf{p}\mathbf{J}}
\right),
$$

where $\mathcal{B}_{\mathrm{occ}}$ is an occupancy/readout pattern, not an ontological electron cloud.

## Molecular Bonding And Chemistry

Candidate focus:

- bond formation as a shared event ledger over participating nuclei, electron-envelope rows, Noether sea response, recoil, heat, and emitted/absorbed radiation when present;
- molecular geometry as a stability and occupancy pattern, not a decorative shape label;
- reaction pathways as branch selection and residual-to-channel routing;
- catalysts as geometry and response conditions that change the admissible path or action barrier without being treated as magic reaction causes;
- condensed-matter and pressure-response handoffs only where the active question is material response rather than isolated molecule closure.

First useful object:

$$
\Theta_{\mathrm{mol}}
=
\left(
\{\mathcal{A}_{\mathrm{nuc}}\},
\{\mathcal{E}_{e}\},
\mathcal{G}_{\mathrm{bond}},
\mathcal{R}_{\mathrm{path}},
\mathcal{M}_{\mathrm{sea}}^{ab},
\mathcal{L}_{E\mathbf{p}\mathbf{J}}
\right).
$$

## Enzymes And Biomolecular Mechanisms

Status. Parked idea surface formerly represented by the `biomolecular_mechanism_brainstorm` control-file row. Promote only after a concrete enzyme, DNA/RNA, conformational, or biological information-bearing mechanism target is selected.

Candidate focus:

- enzyme active sites as molecular geometry plus local response conditions that select reaction paths;
- conformational switching as a retained molecular state transition with a stability margin and event ledger;
- allostery as path-history or medium-mediated coupling only when the source path and state variables are explicit;
- DNA/RNA as information-bearing molecular geometry and record stability, not as a separate biological ontology;
- radiation or chemical damage to DNA/RNA as event-ledger routing through molecular bonds, local heat/excitation, repair/rewrite channels, and record integrity.

First useful object:

$$
\Theta_{\mathrm{bio\ mol}}
=
\left(
\mathcal{G}_{\mathrm{macro}},
\mathcal{S}_{\mathrm{state}},
\mathcal{R}_{\mathrm{path}},
\mathcal{I}_{\mathrm{record}},
\mathcal{L}_{E\mathbf{p}\mathbf{J}},
\mathcal{R}_{\mathrm{fail}}
\right).
$$

This is only a candidate frame. It becomes useful when one enzyme, DNA/RNA motif, or radiation-damage case is selected and grounded in molecule-level rows.

## Candidate Discussion Prompts

1. `iron_group_binding_cusp_recovery` — Turn the candidate analytic route above into a first reduced recovery packet for the Fe/Ni binding cusp, keeping the model shared across deuteron, saturation, beta-stability, fusion, and fission checks.
2. `nuclear_radiation_worked_example` — Build the Pu-238 alpha-decay to heat-channel provenance object from the existing nuclear-binding packet, keeping gamma/photon rows separate from alpha and heat rows.
3. `electron_orbital_triage` — Convert the deferred electron-orbitals note into a claim-leveled atomic-structure packet, preserving standard notation while isolating the localized-assembly interpretation.
4. `first_molecular_bond_target` — Choose one simple molecule and define the first bond/event ledger without importing ordinary chemistry labels as source fields.
5. `enzyme_active_site_bridge` — Choose one enzyme mechanism and restate it as molecular geometry, action-path selection, energy routing, and record-state stability.
6. `biomolecular_mechanism_bridge` — Preserve enzyme, DNA/RNA, conformational, and information-bearing molecular-geometry ideas as physical assembly targets, not biological overclaims, until one case becomes concrete enough for a queue item or packet.
7. `dna_record_integrity_bridge` — Choose one DNA/RNA structural motif or damage/repair event and express it as information-bearing molecular geometry plus event-ledger integrity.
