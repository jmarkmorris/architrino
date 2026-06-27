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
| Primary $\mathbb{A}\mathbb{A}\mathbb{A}$ carrier | `Theta_nu-ex(W)`: incoming/outgoing photon packets, electron/medium row, Noether sea path-history row, exchange event ledger, recoil/remnant row, and finite-window thermal record on one carrier. |
| Smallest score-moving evidence object | One accepted source-backed `path_frequency_exchange_carrier` with the full row bundle on one `commonCarrierId`: `theta_gamma_packet`, Gate A/B handoff, electron-medium population, Noether sea path history, exchange event ledger, inverse-Compton row, SZ rows, recoil/remnant row, finite-window thermal record, source provenance, and no-hidden-retune witness. |
| Exact first blocker | `missing_accepted_path_frequency_exchange_carrier`. |
| Existing scripts, fixtures, and packets found | The source runner and fixture listed above, the `EQ-28A` packet, the `EQ-13`/`EQ-28` Gate A source-field map, Compton/recoil runner, `EQ-22B` recombination/acoustic packet, and `EQ-25` thermal source-field map. |
| Candidate breakthrough angle | Start with one source-backed inverse-Compton/SZ exchange segment that freezes photon in/out ids, electron-column ids, path-history ids, event-ledger ids, thermal-window ids, and no-retune ids. If that carrier is accepted, the checker should advance to child rows such as `missing_accepted_theta_gamma_packet` rather than treating thermal provenance as the parent. |
| Fail-closed negative control | `split_path_medium_record_retune`: an accepted-looking exchange with one path record and a different medium/SZ record must fail through `noHiddenRetune` before residual arithmetic counts. |
| Smaller-than-report next action | Use the carrier-shell source-contract boundary fixture to prove the checker advances only from the parent carrier to `missing_accepted_theta_gamma_packet`, then replace the contract shell with a real source-backed carrier row. |

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

## Direct Geometry Layer

This source-field layer applies the Direct Geometry Layer to the concrete `Theta_nu-ex` source object. It stays candidate-level: the table names the source-backed retained geometry that would have to exist before the checker can move past `missing_accepted_path_frequency_exchange_carrier`.

| Standard comparison term | $\mathbb{A}\mathbb{A}\mathbb{A}$ geometric readout | Required carrier or row | Same-record binding | Fail-closed negative control | Smallest accepted evidence object |
| --- | --- | --- | --- | --- | --- |
| $Y_{\gamma,j}^{\mathrm{ex}}=-\ln(\nu_{\gamma,j}^{+}/\nu_{\gamma,j}^{-})$ | Signed path-frequency readout of one photon packet through one path window. | `path_frequency_exchange_carrier`, `theta_gamma_packet`, `photon_gate_a_b_handoff` | One `carrierId`, `pathWindowId`, `photonInId`, `photonOutId`, and `gateABHandoffId`; packet identity must survive unless another reaction channel is declared. | `gate_handoff_collapse` or a source/probe guard blocks before path-frequency residuals count. | Accepted `Theta_nu-ex` carrier plus photon packet and Gate A/B handoff rows with durable source evidence. |
| Exchange energy ledger | Energy, momentum, angular-momentum, recoil, remnant, target, and medium updates for the same exchange event. | `exchange_event_ledger`, `recoil_remnant_row`, `electron_medium_population` | One `exchangeEventLedgerId` and `electronMediumId` bind frequency change to target, medium, recoil, and remnant rows. | `phenomenological_frequency_loss_without_medium_ledger` rejects a frequency shift without the medium/recoil/remnant ledger. | Accepted exchange-event ledger and recoil/remnant rows after the parent carrier itself is accepted. |
| Inverse-Compton $\nu^+/\nu^-\simeq(4/3)\gamma_e^2$ | Electron-medium boost readout in the declared Thomson regime. | `inverse_compton_row`, `electron_medium_population`, `theta_gamma_packet` | One `electronMediumId`, photon in/out identity, and exchange segment id; no private boost fit handle. | `inverse_compton_ratio_fit_handle` rejects a fitted frequency ratio detached from the electron-medium row. | Accepted inverse-Compton row bound to the same electron column and photon packet identities. |
| $\tau_e=\sigma_T\int n_e\,d\ell$ | Optical-depth readout of the intervening electron column. | `electron_medium_population` | One `electronMediumId`, `pathWindowId`, optical-depth id, density, and path-length evidence serve IC, tSZ, and kSZ rows. | `sz_without_electron_column` rejects SZ calibration without the electron column. | Accepted electron-medium population row with source-backed optical-depth support. |
| tSZ $y$ and $\Delta T/T\simeq-2y$ | Thermal SZ readout from the same electron column and finite-window thermal record. | `thermal_sz_row`, `electron_medium_population`, `finite_window_thermal_record` | One `electronMediumId`, `finiteThermalRecordId`, and `pathWindowId`; the thermal row cannot replace the path-frequency carrier. | Accepted-source guards reject priority maps, authored prose, generated files, attempts, probes, mocks, toys, negative controls, and temporary files. | Accepted thermal SZ row plus finite-window thermal record on the accepted carrier. |
| kSZ $\Delta T/T\simeq-\tau_ev_{\parallel}/c_\gamma$ | Signed line-of-sight motion readout from the same optical-depth row. | `kinematic_sz_row`, `electron_medium_population` | One optical-depth id and signed velocity id stay tied to the same electron column. | `kinetic_sz_sign_flip` rejects the wrong sign convention while the electron column is unchanged. | Accepted kinematic SZ row bound to the same optical-depth and velocity evidence. |
| Noether sea path-history and thermal handoff | Shared path state for cosmological exchange without turning thermal provenance into the parent carrier. | `noether_sea_path_history`, `finite_window_thermal_record`, `source_provenance` | One `noetherSeaPathHistoryId`, `finiteThermalRecordId`, path window, and source provenance id bind the path and thermal rows. | `split_path_medium_record_retune` rejects private path, medium, or thermal records. | Accepted Noether sea path-history and finite-window thermal rows bound to the carrier. |
| $\mathcal S_{\mathrm{retune}}$ | No-hidden-retune witness for path, photon packet, medium, thermal, SZ, and source rows. | `no_hidden_retune_witness`, all required rows | Every required row shares the same `commonCarrierId` and source-object ids listed above. | Coordination-source and probe-source controls reject priority packets and probe artifacts as retained evidence. | A checker-consumable `Theta_nu-ex` packet whose required rows are accepted, durable-source-backed, same-record bound, and fail closed under the existing checker. |

The smallest accepted evidence object is therefore an accepted `path_frequency_exchange_carrier` whose durable source path is outside priority prose, authored AAA prose, generated output, attempt/probe/mock/toy fixtures, negative controls, and temporary paths, with every required child row still bound to the same source-object ids. A passing normalized source-attempt fixture remains score-neutral until that retained evidence object exists.

The carrier-shell source-contract boundary is now executable but remains score-neutral. [eq28a-path-frequency-exchange-carrier-shell-source-contract.v1.json](../../../scripts/equation-mapping/eq28a-path-frequency-exchange-carrier-shell-source-contract.v1.json) records the Direct Geometry Layer contract for the parent carrier, and [eq28a-path-frequency-exchange-carrier-shell-source-contract-attempt.v1.json](../../../scripts/equation-mapping/eq28a-path-frequency-exchange-carrier-shell-source-contract-attempt.v1.json) marks only the top `carrier` and `path_frequency_exchange_carrier` row as accepted-looking. The expected checker result is `status=blocked_missing_rows`, `nextBlocker=missing_accepted_theta_gamma_packet`, `carrierAccepted=true`, and `scoreDecision=no_score_increase`; this is a boundary test, not accepted retained evidence.

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
| `coordination_source_false_positive` | Accepted-looking `path_frequency_exchange_carrier` sourced only to this priority map fails with `accepted_without_evidence_source`; priority maps, authored AAA prose, generated files, attempt files, toy files, probe files, source-evidence-probe files, mock files, and negative-control files cannot count as accepted retained evidence. |
| `phenomenological_frequency_loss_without_medium_ledger` | Frequency change without target, medium, recoil, and remnant ledger rows fails path-frequency energy balance. |
| `inverse_compton_ratio_fit_handle` | Fitted photon-frequency boost fails inverse-Compton residual rather than counting as a source row. |
| `sz_without_electron_column` | Thermal SZ rows without the electron column fail before thermal evidence counts. |
| `kinetic_sz_sign_flip` | Kinematic SZ sign flip fails signed line-of-sight velocity calibration. |
| `split_path_medium_record_retune` | Path and medium/SZ records on separate carriers fail no-hidden-retune. |
| `gate_handoff_collapse` | Photon Gate B collapse fails packet-identity handoff before path-frequency residuals count. |

## Next Action

Use the carrier-shell source-contract fixture to keep the parent/child blocker boundary executable while the real retained evidence route is still absent. The next safe implementation target is a source-backed `theta_gamma_packet` or a replacement parent-carrier source row that is actual retained evidence rather than a contract shell. Until that source-backed carrier is accepted, the ordinary source-attempt result remains `missing_accepted_path_frequency_exchange_carrier`.

The carrier-shell boundary check is:

```sh
node scripts/equation-mapping/eq28a-path-frequency-exchange-residual.mjs --input scripts/equation-mapping/eq28a-path-frequency-exchange-carrier-shell-source-contract-attempt.v1.json --summary --pretty
```

Expected result: `blocked_missing_rows`, `nextBlocker=missing_accepted_theta_gamma_packet`, `carrierAccepted=true`, `scoreDecision=no_score_increase`, solver residuals passing, and all six negative controls passing. The same command with `--require-populated` must exit nonzero.

The current source-attempt check is:

```sh
node scripts/equation-mapping/eq28a-path-frequency-exchange-residual.mjs --input scripts/equation-mapping/eq28a-path-frequency-exchange-source-attempt.v1.json --summary --pretty
```

Expected result: `blocked_missing_accepted_path_frequency_exchange_carrier`, `scoreDecision=no_score_increase`, solver residuals passing, and all six negative controls passing. The same command with `--require-populated` must exit nonzero.

The accepted-source guard check is:

```sh
node scripts/equation-mapping/eq28a-path-frequency-exchange-residual.mjs --input scripts/equation-mapping/eq28a-path-frequency-exchange-coordination-source-negative-control.v1.json --summary --pretty
```

Expected result: `blocked_missing_accepted_path_frequency_exchange_carrier`,
`carrierReason=accepted_without_evidence_source`, and no score movement.

The probe-source guard is:

```sh
node scripts/equation-mapping/eq28a-path-frequency-exchange-residual.mjs --input scripts/equation-mapping/eq28a-path-frequency-exchange-probe-source-negative-control.v1.json --summary --pretty
```

Expected result: `blocked_missing_accepted_path_frequency_exchange_carrier`,
`carrierReason=accepted_without_evidence_source`, and no score movement. The
same command with `--require-populated` must exit nonzero. This prevents toy or
source-evidence-probe files from being reused as retained source evidence for
`Theta_nu-ex`.
