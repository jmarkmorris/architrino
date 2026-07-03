# Equation Closure Pass 2026-06-23 AC

## Workstream Metadata

- Kind: `priority-detail`
- Parent: [Equation Mapping Internal Priority](priorities.md)
- Detail source: [Equation Mapping Detail](equation.md)
- Prior pass: [Equation Closure Pass 2026-06-23 AB](equation-closure-pass-2026-06-23-ab.md)
- Assigned ID: `EQ-13`
- Status: `score-neutral executable effective EM gate projection pass`
- Scope: priority-only; no reader-facing corpus promotion and no score-table edits
- Claim bucket: derivation/closure target with observer-level field-summary checks

## Closure Result

This pass extends the existing Compton/recoil event replay checker so the same event carrier also reports the `EQ-13` effective EM gate projection:

- [compton-recoil-event-replay.mjs](../../../scripts/equation-mapping/compton-recoil-event-replay.mjs)
- [compton-recoil-native-event-attempt.v1.json](../../../scripts/equation-mapping/compton-recoil-native-event-attempt.v1.json)

The checker now reports `projectionUse.EQ13` and an `effectiveEmGate` block. The gate treats Maxwell and wave-equation language as an effective event-ledger projection, not as a primitive field equation. It evaluates:

- effective charge/current continuity;
- EM stress and Poynting control-volume row;
- effective gauge-chart witness;
- photon Gate C Compton-vertex handoff;
- inherited event energy and momentum residuals;
- angular-momentum, same-event sharing, and no-hidden-retune residuals.

The current default and native-attempt runs deliberately keep the existing native-event blocker:

```text
status: comparison_replay_closed_native_rows_missing
scoreDecision: no_score_increase
nextBlocker: missing_accepted_photon_gate_A_input_output
effectiveEmGateStatus: blocked_missing_native_event_rows
effectiveEmGateNextBlocker: missing_accepted_photon_gate_A_input_output
effectiveEmGateNumericPass: true
```

Those numeric passes are not score evidence because the native photon/event rows and `EQ-13` effective EM gate rows remain attempt-level or missing.

## Mathematical Object

The executable projection is

$$
\mathsf e_{\gamma e}^{0}
\longmapsto
\Pi_{13}\mathsf e_{\gamma e}^{0},
$$

with residual vector

$$
\mathbf R_{13}^{\gamma e,0}
=
\left(
\Delta_{\mathrm{cont}},
\Delta_E^{\mathrm{EM}},
\Delta_{\mathbf p}^{\mathrm{EM}},
\Delta_{\mathbf J}^{\mathrm{EM}},
\Delta_{\mathrm{gauge}},
\Delta_{\mathrm{share}}^{13/28},
\mathcal S_{\mathrm{retune}}
\right).
$$

The energy and momentum rows are inherited from the Compton event balance. The effective charge/current, stress, gauge, Gate C, angular-momentum, and retune rows must still be accepted on the same $\mathsf e_{\gamma e}^{0}$ carrier before the Maxwell comparison row can be treated as more than an event-ledger projection target.

## Required Rows

The inherited native event rows remain the first requirement:

- `photon_gate_A_input_output`
- `photon_gate_B_transverse_handoff`
- `target_retained_branch`
- `recoil_branch`
- `angular_momentum_ledger_delta_J`
- `noether_sea_state_row`
- `energy_momentum_event_ledger`

The event also requires accepted `medium` and `remnant` support rows in the weak homogeneous case. After those pass, `EQ-13` requires accepted, source-backed rows for:

- `effective_charge_current_continuity`
- `em_stress_poynting_control_volume`
- `effective_gauge_chart_witness`
- `photon_gate_C_compton_vertex_handoff`

The first blocker is deliberately inherited from the native event: `missing_accepted_photon_gate_A_input_output`. After the native event rows close, the first `EQ-13`-specific blocker should become `missing_accepted_effective_charge_current_continuity`.

## Score Disposition

| Row | Prior score | Pass AC score | Reason |
| --- | --- | --- | --- |
| `EQ-13` | `3` | `3` | The effective EM gate projection is executable on the Compton event carrier, but the run remains attempt-level and blocks first at `missing_accepted_photon_gate_A_input_output`. |

## Promotion Classification

Classification: `priority-only`.

Promote now: no.

Defer with blocker: promotion waits for one accepted event carrier whose photon Gate A/B/C rows, effective charge/current continuity, stress/Poynting control volume, gauge witness, energy/momentum/angular-momentum ledger, Noether sea row, medium/remnant support, and no-hidden-retune witness are source-backed and bound to the same event.

## Next Closure Step

Populate the native photon Gate A input/output row on $\mathsf e_{\gamma e}^{0}$. Once the native event rows are accepted, the effective EM gate should move to its own first blocker: accepted charge/current continuity from the event ledger.
