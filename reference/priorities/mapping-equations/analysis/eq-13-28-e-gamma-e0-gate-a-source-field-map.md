# EQ-13 And EQ-28 e_gamma_e_0 Gate A Source-Field Map

## Workstream Metadata

- Kind: `priority`
- Parent packets:
  - [EQ-12, EQ-16A, Photon, Quantum, Gauge, And Neutrino Packet](eq-12-16a-photon-quantum-gauge-neutrino-packet.md)
  - [EQ-26 And EQ-31 Observation-First Precision Packet](eq-26-31-observation-first-precision-packet.md)
- Source runner: [compton-recoil-event-replay.mjs](../../../../scripts/equation-mapping/compton-recoil-event-replay.mjs)
- Source fixture: [compton-recoil-native-event-attempt.v1.json](../../../../scripts/equation-mapping/compton-recoil-native-event-attempt.v1.json)
- Source-attempt fixture: [compton-recoil-gate-a-source-attempt.v1.json](../../../../scripts/equation-mapping/compton-recoil-gate-a-source-attempt.v1.json)
- Source-object contract control: [compton-recoil-gate-a-source-contract-missing-metadata-negative-control.v1.json](../../../../scripts/equation-mapping/compton-recoil-gate-a-source-contract-missing-metadata-negative-control.v1.json)
- Rows served: `EQ-13` and `EQ-28`
- Claim level: candidate source-field map and attack card
- Promotion status: priority-only

## Boundary

This map does not populate accepted retained evidence. It narrows the shared `EQ-13` / `EQ-28` first blocker to one event-bound `photon_gate_A_input_output` source row on $\mathsf e_{\gamma e}^{0}$.

The map is not a replacement for [EQ-12 Theta-Gamma Packet Source Shell](eq-12-theta-gamma-packet-source-shell.md), which owns `missing_accepted_theta_gamma_packet`. It is also not a replacement for the `EQ-29` `radiation_source_carrier`. A photon-packet identity carrier, a Compton/recoil event carrier, and a radiation-source carrier may share constants or downstream rows, but they do not become one accepted object unless checker evidence binds them on the same source-backed event.

No score changes.

## Equation Attack Cards

| Coordinate | `EQ-13` |
| --- | --- |
| Current score and closure driver | Score `3`; recover Maxwell and wave-equation behavior as continuum summaries of wake superposition and photon-channel packet transport. |
| Primary AAA carrier | $\Pi_{13}\mathsf e_{\gamma e}^{0}$, the effective EM gate projection on the Compton/recoil event carrier. |
| Smallest accepted evidence object | An accepted source-backed event carrier whose Gate A/B/C, effective charge/current continuity, stress/Poynting, gauge witness, energy/momentum/angular-momentum ledger, Noether sea row, medium/remnant support, and no-hidden-retune rows bind to `e_gamma_e_0`. |
| Exact first blocker | `missing_accepted_photon_gate_A_input_output`. |
| Existing scripts, fixtures, and packets found | The Compton/recoil runner and fixture listed above. The consolidated executable-gate audit found that arithmetic projection checks can pass while the route remains score-neutral and blocked first at `missing_accepted_photon_gate_A_input_output`; accepted charge/current continuity is the first `EQ-13`-specific blocker after the native event closes. |
| Candidate breakthrough angle | Solved Maxwell, Green-function, and eikonal families can become inverse tests for causal support, continuity, gauge residual, and Poynting balance after the event ledger exists. They must not bypass Gate A/B/C and recoil rows. |
| Negative control required for advancement | An imported $\Box A_\mu=J_\mu$ row with no coarse-graining map remains `equation_map.imported_formula`. An accepted-looking row with the wrong `eventId` or non-durable source must fail before EM residuals count. |
| Smaller-than-report next action | Build a candidate source row for `photon_gate_A_input_output` only, with event id, source path, incoming/outgoing packet ids, constants, and Gate A residual fields. |

| Coordinate | `EQ-28` |
| --- | --- |
| Current score and closure driver | Score `3`; close Compton, photoelectric, pair-threshold, and recoil equations through one event ledger. |
| Primary AAA carrier | $\mathsf e_{\gamma e}^{0}$, the weak homogeneous Compton/recoil event ledger. |
| Smallest accepted evidence object | An accepted native `e_gamma_e_0` event bundle with seven native rows plus accepted medium and remnant support rows, including explicit zero `delta_E` and `delta_p` in the weak homogeneous case. |
| Exact first blocker | `missing_accepted_photon_gate_A_input_output`. |
| Existing scripts, fixtures, and packets found | The Compton/recoil runner and fixture listed above. The consolidated native-event audit found no accepted row on $\mathsf e_{\gamma e}^{0}$: all seven native rows plus `medium` and `remnant` support must share one `eventId`, retained carrier, row provenance, and explicit weak-homogeneous deltas before the event can close. |
| Candidate breakthrough angle | The inverse-energy Compton residual can discipline Gate A: the same $h$, $c_\gamma$, exposed electron mass, recoil convention, and `eventId` must survive across `EQ-26` and `EQ-28` before wavelength shift counts as native event evidence. |
| Negative control required for advancement | `eq28.frequency_loss_without_recoil`: phenomenological photon frequency loss, pair creation without momentum-balancing environment, dropped material/recoil rows, or changed shared constants must fail. |
| Smaller-than-report next action | Construct the minimal Gate A accepted-row candidate contract for `e_gamma_e_0`, not another full Compton report. |

## Current Fixture Inventory

The current event carrier is:

| Field | Fixture value |
| --- | --- |
| `event.id` | `e_gamma_e_0` |
| `event.label` | `native-compton-recoil-attempt` |
| `recoil_convention` | `relativistic_elastic_recoil` |
| `constants.h` | `1` |
| `constants.c_gamma` | `1` |
| `constants.M_e_exp` | `1` |
| `incident_photon.energy` | `2` |
| `incident_photon.direction` | `[1, 0, 0]` |
| `outgoing_photon.theta_degrees` | `60` |

The first native row is attempt-level:

| Row | Current value |
| --- | --- |
| `photon_gate_A_input_output.status` | `attempt` |
| `photon_gate_A_input_output.rowId` | `photon-gate-A-input-output-attempt` |
| `photon_gate_A_input_output.sourcePath` | `reference/priorities/mapping-equations/analysis/eq-26-31-observation-first-precision-packet.md` |
| `photon_gate_A_input_output.eventId` | `e_gamma_e_0` |

The remaining native event rows are also attempt-level:

| Native row | Row id |
| --- | --- |
| `photon_gate_B_transverse_handoff` | `photon-gate-B-transverse-handoff-attempt` |
| `target_retained_branch` | `target-retained-branch-attempt` |
| `recoil_branch` | `recoil-branch-attempt` |
| `angular_momentum_ledger_delta_J` | `angular-momentum-ledger-delta-J-attempt` |
| `noether_sea_state_row` | `noether-sea-state-row-attempt` |
| `energy_momentum_event_ledger` | `energy-momentum-event-ledger-attempt` |

The weak homogeneous support rows are explicit but still attempt-level:

| Support row | Row id | Required zero fields |
| --- | --- | --- |
| `medium` | `medium-ledger-zero-attempt` | `delta_E=0`, `delta_p=[0,0,0]` |
| `remnant` | `remnant-ledger-zero-attempt` | `delta_E=0`, `delta_p=[0,0,0]` |

The `EQ-13` effective EM gate rows are downstream attempt rows:

| EM gate row | Row id |
| --- | --- |
| `effective_charge_current_continuity` | `effective-charge-current-continuity-attempt` |
| `em_stress_poynting_control_volume` | `em-stress-poynting-control-volume-attempt` |
| `effective_gauge_chart_witness` | `effective-gauge-chart-witness-attempt` |
| `photon_gate_C_compton_vertex_handoff` | `photon-gate-C-compton-vertex-handoff-attempt` |

The current source-evidence control required for advancement is [compton-recoil-gate-a-coordination-source-negative-control.v1.json](../../../../scripts/equation-mapping/compton-recoil-gate-a-coordination-source-negative-control.v1.json). It marks `photon_gate_A_input_output` as `accepted` while pointing the row to this priority map. The replay must still return `missing_accepted_photon_gate_A_input_output` with `accepted_without_evidence_source`, because a coordination packet is not retained event evidence.

The source-object metadata control is [compton-recoil-gate-a-source-contract-missing-metadata-negative-control.v1.json](../../../../scripts/equation-mapping/compton-recoil-gate-a-source-contract-missing-metadata-negative-control.v1.json). It marks `photon_gate_A_input_output` as accepted-looking against an evidence-class runner path while omitting `sourceObjectKind`, `sourceSupport`, and `evidenceFamily`. The replay must still return `missing_accepted_photon_gate_A_input_output` with `accepted_without_source_object_contract`; an evidence-class path alone is not a retained Gate A row.

The current source-attempt payload is [compton-recoil-gate-a-source-attempt.v1.json](../../../../scripts/equation-mapping/compton-recoil-gate-a-source-attempt.v1.json). It adds concrete incoming/outgoing photon packet ids, frequency and wavelength rows, momentum rows, `h`/`c_gamma` row ids, null-branch status, and Gate A residual fields for `eventId=e_gamma_e_0`, but every row remains `attempt`.

## Gate A Accepted-Object Contract

The first native row object contract remains controlled by [EQ-26 And EQ-31 Observation-First Precision Packet](eq-26-31-observation-first-precision-packet.md). A Gate A source object must be a structured retained row object, not the string `accepted`; it must use an accepted status, concrete `rowId`, durable resolving source reference, and `eventId=e_gamma_e_0`.

The durable source must supply incoming and outgoing photon-channel records, $E_\gamma$, $\mathbf p_\gamma$, direction, frequency or wavelength, Gate A null-branch status, and the shared $h$ and $c_\gamma$ rows consumed by the event. It must also declare `sourceObjectKind: "photon_gate_A_input_output"`, `sourceSupport: ["EQ-13", "EQ-28", "Gate A", "e_gamma_e_0"]`, and `evidenceFamily: "native_compton_recoil_event"`; toy, probe, source-contract shell, priority, authored-prose, generated, attempt, mock, and negative-control paths remain non-evidence. This row is not sufficient for score review by itself. It is the first accepted row on the event carrier; the full event still needs Gate B, target branch, recoil branch, angular-momentum ledger, Noether sea state, energy/momentum event ledger, medium/remnant support, and no-hidden-retune rows on the same event.

## Direct Geometry Layer

| Standard comparison term | $\mathbb{A}\mathbb{A}\mathbb{A}$ geometric readout | Required carrier or row | Same-record binding | Negative control required for advancement | Smallest accepted evidence object |
| --- | --- | --- | --- | --- | --- |
| Photon Gate A input/output relation | Event-bound `photon_gate_A_input_output` row on $\mathsf e_{\gamma e}^{0}$, not an imported Compton formula | `photon_gate_A_input_output` | Same `eventId=e_gamma_e_0`, incoming/outgoing packet ids, $h$, $c_\gamma$, source path, and null-branch status | `event_id_mismatch`; `accepted_without_retained_reference`; `source_self_reference` | Durable source-backed Gate A row with concrete row id, accepted status, source evidence, photon packet ids, frequency/wavelength rows, momentum rows, and Gate A residual fields. |
| Compton/recoil event closure | Native event ledger over $\mathsf e_{\gamma e}^{0}$ with Gate A/B, target branch, recoil branch, angular momentum, Noether sea, and energy-momentum rows | Seven native event rows plus `medium` and `remnant` support rows | Same event id, recoil convention, $h$, $c_\gamma$, exposed electron mass, medium/remnant support, and no-hidden-retune witness | `support_rows_omitted`; `event_id_mismatch`; `accepted_without_retained_reference` | Accepted native event bundle with Gate A first, then Gate B, target, recoil, angular-momentum, Noether sea, energy-momentum, medium, and remnant rows on one event. |
| Maxwell/wave-equation comparison rows | `EQ-13` effective EM gate projection as continuity, stress/Poynting, gauge, and Gate C readouts from the native event | `effective_charge_current_continuity`, `em_stress_poynting_control_volume`, `effective_gauge_chart_witness`, `photon_gate_C_compton_vertex_handoff` | Same event id and native event rows as Gate A/B and recoil; Maxwell-level summaries consume the event after it exists | `imported_formula_bypass` | Accepted effective EM gate rows whose continuity, stress, gauge, and Gate C residuals are downstream of the accepted native event. |
| Recoil and pair-threshold comparison terms | `EQ-28` recoil ledger readouts on the same photon-target event, including target, recoil, medium, and remnant updates | `target_retained_branch`, `recoil_branch`, `energy_momentum_event_ledger`, `medium`, `remnant` | Same event id, recoil convention, source path class, $h$, $c_\gamma$, exposed mass, and explicit support deltas | `eq28.frequency_loss_without_recoil`; `support_rows_omitted` | Accepted event ledger with recoil/remnant and medium support rows, including explicit zero `delta_E` and `delta_p` in the weak homogeneous case. |
| Cross-row constants and anti-retune checks | Shared $h$, $c_\gamma$, exposed mass, and recoil convention consumed by `EQ-26`, `EQ-28`, and photon/radiation rows | Gate A row plus event constants and source-provenance rows | Same constants and recoil convention across Gate A, event ledger, atomic/precision consumers, and radiation consumers | `source_channel_collapse`; hidden-retune variants in the runner | Source-backed Gate A/event object whose constants are read from the same source rows, not fitted separately per comparison. |
| Radiation-source and photon-packet boundary | Gate A/B output is an emitted-channel output only after the source mechanism remains separate | `photon_gate_A_input_output`, `photon_gate_B_transverse_handoff`, and downstream `radiation_source_carrier` consumer | Same event id for Gate A/B; separate source-mechanism carrier when `EQ-29` consumes emitted output | `source_channel_collapse` | Accepted Gate A/B output row that can be referenced by `EQ-29` without collapsing source mechanism into the photon event. |

## Cross-Row Discipline

`EQ-13` should consume the Gate A event only after the native event rows exist. Then its first row-specific blocker becomes `effective_charge_current_continuity`. `EQ-28` owns the event-ledger recoil closure and should not be bypassed by Maxwell-level field summaries.

`EQ-26` can use the same $h$, $c_\gamma$, exposed mass, and recoil convention as an anti-retune check, but an atomic spectral row is not the Gate A row. `EQ-29` may consume a photon Gate A/B output as an emitted-channel output, but its source mechanism remains `radiation_source_carrier`.

## Verification Required for Advancement Controls

- `event_id_mismatch`: an otherwise accepted row with `eventId` other than `e_gamma_e_0` must fail.
- `accepted_without_retained_reference`: a bare accepted string or row without concrete `rowId` and source evidence must fail.
- `source_object_contract_missing`: an accepted-looking Gate A row with an evidence-class path but no `sourceObjectKind`, `sourceSupport`, or `evidenceFamily` must fail.
- `source_self_reference`: this map, a closure-pass note, or the attempt fixture is not retained event evidence.
- `support_rows_omitted`: the weak homogeneous medium and remnant rows must remain explicit zero rows, not silently absent.
- `source_channel_collapse`: a radiation source mechanism cannot be treated as the photon Gate A row.
- `imported_formula_bypass`: Maxwell, Compton, or pair-threshold formulas do not count without event-bound Gate A/B/C and recoil rows.

## Next Action

Create one durable source-backed `photon_gate_A_input_output` row for `e_gamma_e_0`, then run:

```sh
node scripts/equation-mapping/compton-recoil-event-replay.mjs --input scripts/equation-mapping/compton-recoil-native-event-attempt.v1.json --summary --pretty
```

To check the coordination-source negative control, run:

```sh
node scripts/equation-mapping/compton-recoil-event-replay.mjs --input scripts/equation-mapping/compton-recoil-gate-a-coordination-source-negative-control.v1.json --summary --pretty
```

To check the source-attempt payload, run:

```sh
node scripts/equation-mapping/compton-recoil-event-replay.mjs --input scripts/equation-mapping/compton-recoil-gate-a-source-attempt.v1.json --summary --pretty
```

To check the source-object metadata control, run:

```sh
node scripts/equation-mapping/compton-recoil-event-replay.mjs --input scripts/equation-mapping/compton-recoil-gate-a-source-contract-missing-metadata-negative-control.v1.json --summary --pretty
```

Expected result: `comparison_replay_closed_native_rows_missing`, `scoreDecision=no_score_increase`, and `missing_accepted_photon_gate_A_input_output`. The same command with `--require-native-closed` must exit nonzero. Until a durable source-backed row exists, the correct result remains `missing_accepted_photon_gate_A_input_output`.
