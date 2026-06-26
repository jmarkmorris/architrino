# EQ-28A Theta-Nu-Ex Source-Field Map

## Workstream Metadata

- Kind: `priority`
- Parent packet: [EQ-28A Path-Frequency Exchange](eq-28a-path-frequency-exchange.md)
- Source runner: [eq28a-path-frequency-exchange-residual.mjs](../../../scripts/equation-mapping/eq28a-path-frequency-exchange-residual.mjs)
- Source fixture: [eq28a-path-frequency-exchange-attempt.v1.json](../../../scripts/equation-mapping/eq28a-path-frequency-exchange-attempt.v1.json)
- Source-attempt fixture: [eq28a-path-frequency-exchange-source-attempt.v1.json](../../../scripts/equation-mapping/eq28a-path-frequency-exchange-source-attempt.v1.json)
- Row served: `EQ-28A`
- Claim level: candidate source-field map and attack card
- Promotion status: priority-only

## Boundary

This map does not populate accepted retained evidence. It narrows the `EQ-28A` first blocker to one source-backed path-frequency exchange carrier, `Theta_nu-ex`, before inverse-Compton, thermal SZ, kinematic SZ, photon-packet, thermal-window, or source-provenance rows can count.

No score changes.

## Equation Attack Card

| Coordinate | Current answer |
| --- | --- |
| Row | `EQ-28A` |
| Current score and closure driver | Score `2`; recover inverse-Compton, signed path-frequency exchange, thermal SZ, and kinematic SZ as one photon path-history exchange ledger, not frequency-loss bookkeeping or borrowed CMB thermodynamics. |
| Primary AAA carrier | `Theta_nu-ex(W)`: incoming/outgoing photon packets, electron/medium row, Noether sea path-history row, exchange event ledger, recoil/remnant row, and finite-window thermal record on one carrier. |
| Smallest score-moving evidence object | One accepted source-backed `path_frequency_exchange_carrier` with the full row bundle on one `commonCarrierId`: `theta_gamma_packet`, Gate A/B handoff, electron-medium population, Noether sea path history, exchange event ledger, inverse-Compton row, SZ rows, recoil/remnant row, finite-window thermal record, source provenance, and no-hidden-retune witness. |
| Exact first blocker | `missing_accepted_path_frequency_exchange_carrier`. |
| Existing scripts, fixtures, and packets found | The source runner and fixture listed above, the `EQ-28A` packet, the `EQ-13`/`EQ-28` Gate A source-field map, Compton/recoil runner, `EQ-22B` recombination/acoustic packet, and `EQ-25` thermal source-field map. |
| Candidate breakthrough angle | Start with one source-backed inverse-Compton/SZ exchange segment that freezes photon in/out ids, electron-column ids, path-history ids, event-ledger ids, thermal-window ids, and no-retune ids. If that carrier is accepted, the checker should advance to child rows such as `missing_accepted_theta_gamma_packet` rather than treating thermal provenance as the parent. |
| Fail-closed negative control | `split_path_medium_record_retune`: an accepted-looking exchange with one path record and a different medium/SZ record must fail through `noHiddenRetune` before residual arithmetic counts. |
| Smaller-than-report next action | Draft a checker-consumable `Theta_nu-ex` source attempt with all statuses still `attempt`, then run the existing EQ-28A checker to preserve `missing_accepted_path_frequency_exchange_carrier`. |

## Source-Object Contract

Use the current fixture key unless a later source map globally renames it:

```text
commonCarrierId: theta_nu_ex_attempt_0001
```

The accepted `Theta_nu-ex` carrier must provide:

| Field | Required source role |
| --- | --- |
| `carrierId` | One identity shared by every row in the path-frequency exchange packet. |
| `pathWindowId` | One finite photon path segment or path window. |
| `photonInId` and `photonOutId` | Incoming and outgoing photon-packet identities; a different reaction channel must be declared if packet identity does not survive. |
| `thetaGammaPacketId` | Parent photon packet support; it is a required support row, not a substitute for the path carrier. |
| `gateABHandoffId` | Photon Gate A/B handoff for packet identity and polarization state. |
| `electronMediumId` | Intervening electron population or medium column used by inverse-Compton and SZ rows. |
| `noetherSeaPathHistoryId` | Noether sea path-history state shared with CMB/thermal provenance when the exchange is cosmological. |
| `exchangeEventLedgerId` | Energy, momentum, angular momentum, recoil, remnant, and medium update ledger for the frequency change. |
| `finiteThermalRecordId` | Finite-window thermal record used only when CMB temperature or spectral-distortion comparisons are active. |
| `sourceProvenanceId` | Durable provenance path for source, path, medium, and thermal rows. |
| `retuneWitnessId` | No-hidden-retune witness across path, medium, photon packet, SZ, and thermal rows. |

The source-attempt fixture keeps the same contract at attempt level:

| Field | Source-attempt value |
| --- | --- |
| `commonCarrierId` | `theta_nu_ex_source_attempt_0001` |
| `pathWindowId` | `W_path_nu_ex_source_attempt_0001` |
| `photonInId` | `gamma_in_theta_nu_ex_source_attempt_0001` |
| `photonOutId` | `gamma_out_theta_nu_ex_source_attempt_0001` |
| `thetaGammaPacketId` | `theta_gamma_packet_support_attempt_0001` |
| `gateABHandoffId` | `gate_ab_theta_nu_ex_source_attempt_0001` |
| `electronMediumId` | `electron_column_theta_nu_ex_source_attempt_0001` |
| `noetherSeaPathHistoryId` | `theta_sea_path_history_attempt_0001` |
| `exchangeEventLedgerId` | `exchange_ledger_theta_nu_ex_source_attempt_0001` |
| `finiteThermalRecordId` | `finite_thermal_record_theta_nu_ex_source_attempt_0001` |
| `sourceProvenanceId` | `source_provenance_theta_nu_ex_source_attempt_0001` |
| `retuneWitnessId` | `retune_witness_theta_nu_ex_source_attempt_0001` |

## Row Bindings

| Checker row | Minimum accepted content |
| --- | --- |
| `path_frequency_exchange_carrier` | Source-backed carrier row with the ids listed above and durable source evidence. |
| `theta_gamma_packet` | Parent photon packet support; still blocked until `theta_gamma_packet` itself is accepted. |
| `photon_gate_a_b_handoff` | Same photon packet identity through the exchange segment. |
| `electron_medium_population` | Source-backed electron or material-medium column with optical depth, temperature when thermal SZ is active, and line-of-sight velocity when kinematic SZ is active. |
| `noether_sea_path_history` | Same path-window Noether sea state; not a private CMB thermal row. |
| `exchange_event_ledger` | Same event ledger for signed frequency increment, energy, momentum, angular momentum, recoil, remnant, and medium updates. |
| `inverse_compton_row` | Thomson-limit or declared-regime inverse-Compton row tied to the same electron-medium and photon packet ids. |
| `thermal_sz_row` | Thermal SZ row using the same optical-depth and thermal-window ids. |
| `kinematic_sz_row` | Kinematic SZ row using the same optical-depth id and signed line-of-sight velocity. |
| `recoil_remnant_row` | Recoil/remnant updates on the same exchange event ledger. |
| `finite_window_thermal_record` | Thermal record consumed by SZ/CMB comparisons, not a replacement for `Theta_nu-ex`. |
| `source_provenance` | Source/path/medium/thermal provenance rows point to one source window. |
| `no_hidden_retune_witness` | Rejects path/medium, photon-packet, SZ, thermal-window, or formula-fit splits. |

## Fail-Closed Controls

| Control | Expected failure |
| --- | --- |
| `phenomenological_frequency_loss_without_medium_ledger` | Frequency change without target, medium, recoil, and remnant ledger rows fails path-frequency energy balance. |
| `inverse_compton_ratio_fit_handle` | Fitted photon-frequency boost fails inverse-Compton residual rather than counting as a source row. |
| `sz_without_electron_column` | Thermal SZ rows without the electron column fail before thermal evidence counts. |
| `kinetic_sz_sign_flip` | Kinematic SZ sign flip fails signed line-of-sight velocity calibration. |
| `split_path_medium_record_retune` | Path and medium/SZ records on separate carriers fail no-hidden-retune. |
| `gate_handoff_collapse` | Photon Gate B collapse fails packet-identity handoff before path-frequency residuals count. |

## Next Action

Create a `Theta_nu-ex` source-attempt fixture that adds explicit source identity fields to the existing EQ-28A attempt while keeping every row at `attempt`. Until a source-backed carrier is accepted, the correct checker result remains `missing_accepted_path_frequency_exchange_carrier`.

The current source-attempt check is:

```sh
node scripts/equation-mapping/eq28a-path-frequency-exchange-residual.mjs --input scripts/equation-mapping/eq28a-path-frequency-exchange-source-attempt.v1.json --summary --pretty
```

Expected result: `blocked_missing_accepted_path_frequency_exchange_carrier`, `scoreDecision=no_score_increase`, solver residuals passing, and all six negative controls passing. The same command with `--require-populated` must exit nonzero.
