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
| Smallest score-moving evidence object | Accepted retained rows for `theta_gamma_packet`, `photon_branch_packet`, Gate A/B/C, source/path/receiver, event balance, Noether sea path, provenance, and no-hidden-retune on one carrier. |
| Exact first blocker | `missing_accepted_theta_gamma_packet` |
| Existing scripts/fixtures/packets | [photon-packet-transfer-attempt.v1.json](../../../scripts/equation-mapping/photon-packet-transfer-attempt.v1.json), [photon-packet-transfer-source-attempt.v1.json](../../../scripts/equation-mapping/photon-packet-transfer-source-attempt.v1.json), [planck-alpha-braid-attempt.v1.json](../../../scripts/equation-mapping/planck-alpha-braid-attempt.v1.json), [EQ-12 Through EQ-16A Photon, Quantum, Gauge, And Neutrino Packet](eq-12-16a-photon-quantum-gauge-neutrino-packet.md), [Equation Closure Pass 2026-06-23 AM](equation-closure-pass-2026-06-23-am.md) |
| Breakthrough angle | Treat solved-wave families as acceptance tests for causal support, dispersion, mode counting, and scattering consistency, while keeping the native carrier in photon packet and Noether sea rows. |
| Fail-closed negative control | `solved_wave_import_without_native_packet`: an effective wave solution may satisfy dispersion and boundary checks, but it fails if it lacks photon branch identity, event balance, source/path/receiver provenance, or no-hidden-retune. |
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
| `photon_branch_packet` | Coaxial contra-rotating pro/anti planar pair identity, branch ledger, phase/frequency row, and packet momentum row. | blocked |
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
| `source_provenance` | Durable source path or source URL for each accepted row; generated markdown, temp paths, placeholders, and directories fail. | blocked |
| `no_hidden_retune_witness` | One witness that $h$, $c_\gamma$, transfer factor, detector coupling, and path response were not separately retuned per observable. | blocked |

Malus-law analyzer intensity $I(\theta)=I_0\cos^2\theta$ is a Gate B analyzer benchmark for `helicity_ledger_row` and `gate_b_transverse_row`. It should consume analyzer basis, incoming polarization ledger, transmitted-intensity readout, and longitudinal-leakage residual on the same $\Theta_\gamma$ carrier, and it fails if it imports the cosine-squared law without packet identity and event-ledger provenance.

## Consumer Boundaries

`EQ-12` owns the direct photon packet transfer residual. A future accepted $\Theta_\gamma$ row may move this blocker only if it satisfies every required row above and passes the photon packet checker without replacing source/path/receiver rows with solved-wave comparison objects.

`EQ-12A`, `EQ-22A`, and `EQ-26A` may consume $\Theta_\gamma$ as photon/action support, but it cannot by itself derive $h_\vartheta$, blackbody mode occupancy, or $\alpha(\mu)$. Those rows still require retained-orbit action, finite-window thermal record, and exposure/gauge-running evidence inside the Planck/alpha carrier.

Priority-only child maps now keep those routes separate: [EQ-12A Retained Action-Period Source-Field Map](eq-12a-retained-action-period-source-field-map.md), [EQ-22A Theta-BB Source-Field Map](eq-22a-theta-bb-source-field-map.md), and [EQ-26A Theta-Alpha Source-Field Map](eq-26a-theta-alpha-source-field-map.md). No score changes.

`EQ-28A` may consume $\Theta_\gamma$ as the incoming/outgoing photon packet handoff. It still owns a separate $\Theta_{\nu\text{-}\mathrm{ex}}(W)$ path-frequency exchange carrier with electron-medium, recoil/remnant, and thermal-state rows.

## Acceptance Tests, Not Ontology

Solved-wave families may be used as inverse clues and acceptance tests:

- Green-function causal support for the path row;
- plane/eikonal dispersion for the null/eikonal row;
- cavity or boundary modes for the Gate B transverse count;
- scattering phase and flux consistency for receiver or event-balance rows;
- packet-spreading bounds for the path-history transfer row.

These tests fail closed if they are imported as the photon packet ontology without the native carrier rows.

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

## Current Disposition

The current attempt fixtures already pass arithmetic packet checks and negative controls, but every required row remains attempt-level. The next score-moving work is not another numeric fixture; it is one source-backed row map that can populate the checker rows above with concrete ids and durable provenance.

No score changes.

## Source-Attempt Fixture

[photon-packet-transfer-source-attempt.v1.json](../../../scripts/equation-mapping/photon-packet-transfer-source-attempt.v1.json) is the first checker-consumable row map for one candidate photon event window `W_gamma_0_source_candidate_0001`. It adds durable source-path slots, stable row ids, source/receiver/window identity fields, and common event-ledger/provenance keys while keeping every row at `status: attempt`.

The expected checker result remains `missing_accepted_theta_gamma_packet`; this fixture exists to make the next evidence search concrete, not to move the score.
