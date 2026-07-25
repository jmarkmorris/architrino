# EQ-12 Theta-Gamma Packet Source Shell

## Status

- Kind: `priority`
- Scope: focused source shell for `missing_accepted_theta_gamma_packet`
- Rows served: `EQ-12`, `EQ-12A`, `EQ-22A`, `EQ-26A`, and downstream photon consumers such as `EQ-28A`
- Claim level: blocked accepted-object contract; not accepted retained evidence
- Score disposition: no score changes

This shell defines the smallest source-backed $\Theta_\gamma$ object that can replace the attempt-level photon packet rows used by [photon-packet-transfer-residual.mjs](../../../scripts/equation-mapping/photon-packet-transfer-residual.mjs) and [planck-alpha-braid-residual.mjs](../../../scripts/equation-mapping/planck-alpha-braid-residual.mjs). It does not promote material into `content/markdown/aaa`, and it does not mark any row accepted.

## Equation Attack Card

| Field | Current result |
| --- | --- |
| Current scores | `EQ-12` score `3`; `EQ-12A`, `EQ-22A`, and `EQ-26A` score `2` |
| Closure driver | Replace attempt-level photon/action support rows with one source-backed photon packet carrier. |
| Primary AAA carrier | $\Theta_\gamma(W;E,R)$, a finite-window photon packet transfer record. |
| Smallest accepted evidence object | Accepted retained rows for `theta_gamma_packet`, `photon_branch_packet`, Gate A/B/C, source/path/receiver, event balance, Noether sea path, provenance, and no-hidden-retune on one carrier. |
| Exact first blocker | `missing_accepted_theta_gamma_packet` |
| Existing scripts/fixtures/packets | [photon-packet-transfer-attempt.v1.json](../../../scripts/equation-mapping/photon-packet-transfer-attempt.v1.json), [photon-packet-transfer-source-attempt.v1.json](../../../scripts/equation-mapping/photon-packet-transfer-source-attempt.v1.json), [photon-packet-transfer-priority-source-negative-control.v1.json](../../../scripts/equation-mapping/photon-packet-transfer-priority-source-negative-control.v1.json), [planck-alpha-braid-attempt.v1.json](../../../scripts/equation-mapping/planck-alpha-braid-attempt.v1.json), and [EQ-12 Through EQ-16A Photon, Quantum, Gauge, And Neutrino Packet](eq-12-16a-photon-quantum-gauge-neutrino-packet.md). The consolidated packet-transfer audit found that arithmetic-shape passes remain score-neutral until a source-backed $\Theta_\gamma$ packet binds Gate A/B/C, event balance, path-frequency, provenance, and no-hidden-retune rows on one carrier. |
| Breakthrough angle | Treat solved-wave families as acceptance tests for causal support, dispersion, mode counting, and scattering consistency, while keeping the native carrier in photon packet and Noether sea rows. |
| Negative control required for advancement | `solved_wave_import_without_native_packet`: an effective wave solution may satisfy dispersion and boundary checks, but it fails if it lacks photon branch identity, event balance, source/path/receiver provenance, or no-hidden-retune. |
| Next action | Build one row-by-row source-field map for the first candidate photon packet event; do not create accepted rows until durable sources and checker-consumable row bindings exist. |

## Carrier Contract

The source-backed object is

$$
\Theta_\gamma(W;E,R)
=
\left(
P_\gamma,
\mathcal L_{E\mathbf p\mathbf J}^{\gamma},
\mathcal P_{E\to R},
\mathcal C_{\mathrm{rec}},
\theta_{\mathrm{sea}},
\mathcal R_\gamma
\right),
$$

where $W$ is the retained finite window, $E$ is the emission/source endpoint, and $R$ is the receiver/capture endpoint. Every required row must share one `commonCarrierId`, one event/window provenance chain, and one no-hidden-retune witness. A row that points only to this source shell remains blocked; the shell is a contract, not retained evidence.

## Required Source Rows

| Checker row | Minimum source-backed content | Current status |
| --- | --- | --- |
| `theta_gamma_packet` | Packet id, finite window $W$, source endpoint $E$, receiver endpoint $R$, carrier id, source path, and retained status. | blocked |
| `photon_branch_packet` | Coaxial contra-rotating polarity-conjugate planar pair identity, branch ledger, phase/frequency row, and packet momentum row. | blocked |
| `gate_a_kinematics_row` | $E_\gamma=h\nu$, $p=h/\lambda$, null mass shell, no rest branch, and common-limit compatibility with $c_{\mathrm{eff}}$. | blocked |
| `gate_b_transverse_row` | Helicity ledger, exactly two transverse modes, analyzer handoff, and no accepted free longitudinal photon mode. | blocked |
| `gate_c_event_routing_row` | Emission, absorption or scattering class, threshold/vertex routing where used, and declared out-of-window channels. | blocked |
| `emission_source_row` | Source depletion, launch cadence, source branch state, and emission provenance. | blocked |
| `path_history_transfer_row` | Path-history propagation, endpoint cadence, path response, and signed frequency-transfer residual. | blocked |
| `receiver_coupling_row` | Receiver capture/coupling, detector or material handoff, and receiver energy row. | blocked |
| `energy_frequency_row` | A single $E_\gamma=h\nu$ readout from the packet, not a fitted per-observable constant. | blocked |
| `null_eikonal_row` | Null/eikonal residual on the same packet and Noether sea path state. | blocked |
| `helicity_ledger_row` | Angular-momentum and polarization ledger tied to Gate B, with leakage residual. | blocked |
| `event_balance_row` | Energy, momentum, and angular-momentum event balance including source, photon, receiver, recoil, wake, medium, and remnant terms. | blocked |
| `source_depletion_row` | Source-side depletion or transition row with explicit remnant accounting. | blocked |
| `recoil_wake_remnant_row` | Recoil, wake, medium update, and remnant rows, including explicit zero rows when a channel is absent. | blocked |
| `noether_sea_path_row` | Noether sea density/cadence/path response used by the photon path and null/eikonal checks. | blocked |
| `source_provenance` | Durable source path or source URL for each accepted row; priority prose, authored AAA prose, generated files, temp paths, placeholders, directories, attempts, mocks, toys, probes, and negative controls fail. | blocked |
| `no_hidden_retune_witness` | One witness that $h$, $c_\gamma$, transfer factor, detector coupling, and path response were not separately retuned per observable. | blocked |

Malus-law analyzer intensity $I(\theta)=I_0\cos^2\theta$ is a Gate B analyzer benchmark for `helicity_ledger_row` and `gate_b_transverse_row`. It should consume analyzer basis, incoming polarization ledger, transmitted-intensity readout, and longitudinal-leakage residual on the same $\Theta_\gamma$ carrier, and it fails if it imports the cosine-squared law without packet identity and event-ledger provenance.

## Direct Geometry Layer

This layer keeps photon recovery as a finite-window packet-transfer geometry. It does not let solved-wave equations, action-period support, thermal support, or alpha exposure rows replace the native $\Theta_\gamma(W;E,R)$ carrier.

| Standard comparison term | $\mathbb{A}\mathbb{A}\mathbb{A}$ geometric readout | Required carrier or row | Same-record binding | Negative control required for advancement | Smallest accepted evidence object |
| --- | --- | --- | --- | --- | --- |
| $E_\gamma=h\nu$ and $p=h/\lambda$ | Gate A packet kinematics and energy-frequency readout on one photon branch packet. | `theta_gamma_packet`, `photon_branch_packet`, `gate_a_kinematics_row`, `energy_frequency_row` | Packet id, finite window, source endpoint, receiver endpoint, energy row, momentum row, and action support references share one `commonCarrierId`. | `detuned_energy_frequency` rejects fitted $h$ or per-observable packet constants. | Accepted photon packet carrier plus Gate A and energy-frequency rows. |
| Null/eikonal dispersion and $c_\gamma$ path speed | Noether sea path readout for the same packet path-history transfer. | `null_eikonal_row`, `path_history_transfer_row`, `noether_sea_path_row` | Null/eikonal residual, path response, endpoint cadence, and Noether sea path state use the same source/path/receiver provenance chain. | `solved_wave_import_without_native_packet` rejects solved-wave dispersion without native packet rows. | Accepted path-history transfer, null/eikonal, and Noether sea path rows. |
| Two transverse photon modes and Malus-law analyzer response | Gate B helicity and analyzer ledger with no accepted longitudinal free photon mode. | `gate_b_transverse_row`, `helicity_ledger_row`, analyzer basis/readout rows | Incoming polarization, analyzer handoff, transmitted intensity, angular-momentum ledger, and leakage residual stay on one packet. | `longitudinal_leakage` rejects hidden longitudinal-mode support or polarization leakage. | Accepted Gate B transverse row and helicity/analyzer ledger. |
| Emission, absorption, scattering, recoil, wake, and remnant accounting | Gate C event-routing and event-balance readout across source, packet, receiver, medium, and remnant rows. | `gate_c_event_routing_row`, `event_balance_row`, `recoil_wake_remnant_row`, `source_depletion_row` | Source depletion, launch cadence, receiver capture, recoil, wake, medium update, and remnant rows cite one event/window ledger. | `same_packet_absorption_reemission_collapse` rejects conflating absorption and re-emission as one unchanged packet. | Accepted Gate C/event-balance bundle with explicit remnant accounting. |
| Source-to-receiver frequency transfer | Signed source/path/receiver transfer through endpoint cadence and path response. | `emission_source_row`, `path_history_transfer_row`, `receiver_coupling_row` | Source endpoint $E$, receiver endpoint $R$, path history, detector/material coupling, and receiver energy row share one photon packet. | `source_free_frequency_loss` rejects frequency loss without source/path provenance. | Accepted source, path-history, and receiver-coupling rows. |
| Photon support for $h_\vartheta$, blackbody, and $\alpha(\mu)$ consumers | Support-carrier handoff from $\Theta_\gamma$, not closure of action-period, thermal, or exposure rows. | consumer links to `EQ-12A`, `EQ-22A`, `EQ-26A`, and `EQ-28A` | Consumer rows reference the same photon packet id while preserving their own retained-orbit, thermal, exposure, or path-frequency carriers. | `mu_dependent_action_period` and parent probe-source controls reject using $\Theta_\gamma$ to retune $h_\vartheta$ or substitute for child carriers. | Accepted $\Theta_\gamma$ support object plus separate accepted child-carrier rows where required. |
| Source provenance and $\mathcal S_{\mathrm{retune}}$ | Durable evidence identity and no-hidden-retune witness for all packet rows. | `source_provenance`, `no_hidden_retune_witness`, all required rows | Every accepted row uses durable non-priority evidence, non-probe source paths, one event/window provenance chain, and one no-hidden-retune witness. | Priority/source-attempt/probe/mock/temp/generated-source filters keep accepted-looking coordination rows blocked. | A complete photon packet transfer object whose required rows are accepted, source-backed, same-record bound, and checker consumable. |

## Consumer Boundaries

`EQ-12` owns the direct photon packet transfer residual. A future accepted $\Theta_\gamma$ row may move this blocker only if it satisfies every required row above and passes the photon packet checker without replacing source/path/receiver rows with solved-wave comparison objects.

`EQ-12A`, `EQ-22A`, and `EQ-26A` may consume $\Theta_\gamma$ as photon/action support, but it cannot by itself derive $h_\vartheta$, blackbody mode occupancy, or $\alpha(\mu)$. Those rows still require retained-orbit action, finite-window thermal record, and exposure/gauge-running evidence inside the Planck/alpha carrier.

Priority-only child maps now keep those routes separate: [EQ-12A Retained Action-Period Source-Field Map](eq-12a-retained-action-period-source-field-map.md), [EQ-22A Theta-BB Source-Field Map](eq-22a-theta-bb-source-field-map.md), and [EQ-26A Theta-Alpha Source-Field Map](eq-26a-theta-alpha-source-field-map.md). No score changes.

The Planck/alpha runner's shared durable-source rule rejects priority packets, authored AAA prose, generated paths, attempts, toys, probes, source-evidence probes, mocks, negative controls, and temporary paths as accepted evidence for $\Theta_\gamma$. The new probe-source control keeps the parent blocker at `missing_accepted_theta_gamma_packet` when an accepted-looking parent row points to a source-evidence-probe JSON.

`EQ-28A` may consume $\Theta_\gamma$ as the incoming/outgoing photon packet handoff. It still owns a separate $\Theta_{\nu\text{-}\mathrm{ex}}(W)$ path-frequency exchange carrier with electron-medium, recoil/remnant, and thermal-state rows.

## Acceptance Tests, Not Ontology

Solved-wave families may be used as inverse clues and acceptance tests:

- Green-function causal support for the path row;
- plane/eikonal dispersion for the null/eikonal row;
- cavity or boundary modes for the Gate B transverse count;
- scattering phase and flux consistency for receiver or event-balance rows;
- packet-spreading bounds for the path-history transfer row.

These tests do not advance if they are imported as the photon packet ontology without the native carrier rows.

## Negative Controls

| Control | Expected failure |
| --- | --- |
| `detuned_energy_frequency` | `energy_frequency_residual_failed` |
| `longitudinal_leakage` | `helicity_residual_failed` or Gate B leakage failure |
| `split_packet_carrier` | `carrier_split_or_missing_common_carrier` |
| `source_free_frequency_loss` | `source_provenance` or `path_history_transfer_row` missing |
| `solved_wave_import_without_native_packet` | `missing_accepted_theta_gamma_packet` |
| `same_packet_absorption_reemission_collapse` | Gate C/event balance failure because absorption and re-emission were mislabeled as one unchanged packet identity |
| `mu_dependent_action_period` | Planck/alpha no-hidden-retune failure; $\Theta_\gamma$ cannot make $h_\vartheta$ scale-dependent |
| `photon_packet_transfer_priority_source_negative_control` | `missing_accepted_theta_gamma_packet` with row reasons `coordination_source_path` |

## Current Disposition

The current attempt fixtures already pass arithmetic packet checks and negative controls, but every required row remains attempt-level. The next accepted-retained-evidence work is not another numeric fixture; it is one source-backed row map that can populate the checker rows above with concrete ids and durable provenance.

No score changes.

## Source-Attempt Fixture

[photon-packet-transfer-source-attempt.v1.json](../../../scripts/equation-mapping/photon-packet-transfer-source-attempt.v1.json) is the first checker-consumable row map for one candidate photon event window `W_gamma_0_source_candidate_0001`. It adds candidate source-path slots, stable row ids, source/receiver/window identity fields, and common event-ledger/provenance keys while keeping every row at `status: attempt`.

The expected checker result remains `missing_accepted_theta_gamma_packet`; this fixture exists to make the next evidence search concrete, not to change scores.

Run the source-attempt fixture and priority-source negative control before treating the photon packet route as advanced:

```sh
node scripts/equation-mapping/photon-packet-transfer-residual.mjs --input scripts/equation-mapping/photon-packet-transfer-source-attempt.v1.json --summary --pretty
node scripts/equation-mapping/photon-packet-transfer-residual.mjs --input scripts/equation-mapping/photon-packet-transfer-priority-source-negative-control.v1.json --summary --pretty
```

Both must remain score-neutral at `missing_accepted_theta_gamma_packet`; the source-attempt proves row shape only, and the priority-source control proves priority packets, probes, mocks, generated files, and authored prose cannot serve as retained photon evidence.
