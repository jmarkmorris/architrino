# Equation Closure Pass 2026-06-23 F

## Workstream Metadata

- Kind: `priority`
- Status: `complete`
- Mode: `team-agent continuation with executable reducer integration`
- Parent: [Equation Mapping Internal Priority](priorities.md)
- Score column updated: none
- Claim level: score-neutral comparison replay check

## Purpose

This pass turned the `EQ-28` Compton/recoil finite-event target into a fail-closed executable comparison replay. The retained native object remains a single event record:

$$
\mathsf e_{\gamma e}^{0}
\supset
\left(
\texttt{photon\_gate\_A\_input\_output},
\texttt{photon\_gate\_B\_transverse\_handoff},
\texttt{target\_retained\_branch},
\texttt{recoil\_branch},
\texttt{angular\_momentum\_ledger\_delta\_J},
\texttt{noether\_sea\_state\_row},
\texttt{energy\_momentum\_event\_ledger}
\right),
$$

with the same $h$, $c_\gamma$, $M_e^{\mathrm{exp}}$, recoil convention, and photon Gate A/B rows used by the adjacent photon and atomic-spectral rows.

The executable artifact is [compton-recoil-event-replay.mjs](../../../scripts/equation-mapping/compton-recoil-event-replay.mjs). It evaluates the weak homogeneous elastic comparison surface and reports whether the run is only an algebraic comparison or a native $\mathbb{A}\mathbb{A}\mathbb{A}$ event-ledger certificate.

## Executable Result

Command:

```sh
node scripts/equation-mapping/compton-recoil-event-replay.mjs --summary --pretty
```

Summary:

| Field | Result |
| --- | --- |
| Output schema | `aaa-equation-map-compton-recoil-event-replay/v1` |
| Event | `e_gamma_e_0` |
| Status | `comparison_replay_closed_native_rows_missing` |
| Score decision | `no_score_increase` |
| Shared `EQ-26` rows | `shared_rows_match` |
| Residual tolerance | `1e-10` |
| Energy residual | `3.70e-17` |
| Momentum residual | `0` |
| Compton inverse-energy residual | `7.40e-17` |
| Wavelength residual | `7.40e-17` |

The second smoke run

```sh
node scripts/equation-mapping/compton-recoil-event-replay.mjs --theta-degrees 90 --incident-energy 3 --summary --pretty
```

also reports `comparison_replay_closed_native_rows_missing`, `no_score_increase`, and `shared_rows_match`, with energy and momentum residuals equal to `0` and the Compton/wavelength residuals at `6.66e-17`.

## Interpretation

The comparison replay is intentionally weak. It computes the outgoing photon energy from the Compton inverse-energy relation, sets recoil momentum by event balance, and then checks that the standard wavelength-shift surface is self-consistent. That is useful because it gives `EQ-28` a concrete event-carrier contract and gives adjacent rows a shared-variable witness, but it is not native score evidence.

The fail-closed behavior is also verified. Running with `--require-native-closed` exits nonzero while the native rows are missing. This prevents an algebraic replay from being counted as a retained event-ledger derivation.

The checker also requires native rows to be structured retained row objects with concrete `rowId`, `sourcePath`, and `eventId` fields tied to the same event carrier. A bare `accepted` string is treated as `accepted_without_retained_reference`, and a row whose `eventId` does not match the event carrier is treated as `accepted_event_id_mismatch`, not as native event evidence.

## Native Event Attempt Packet

The direct native-event attempt is [compton-recoil-native-event-attempt.v1.json](../../../scripts/equation-mapping/compton-recoil-native-event-attempt.v1.json). It fixes the native row shape for $\mathsf e_{\gamma e}^{0}$ without claiming row acceptance.

Command:

```sh
node scripts/equation-mapping/compton-recoil-event-replay.mjs --input scripts/equation-mapping/compton-recoil-native-event-attempt.v1.json --summary --pretty
```

Summary:

| Field | Result |
| --- | --- |
| Event | `e_gamma_e_0` |
| Status | `comparison_replay_closed_native_rows_missing` |
| Score decision | `no_score_increase` |
| Shared `EQ-26` rows | `shared_rows_match` |
| Native ledger status | `native_rows_missing` |
| Native row statuses | all seven required native rows are `attempt` |

The fail-closed native-event mode is also verified:

```sh
node scripts/equation-mapping/compton-recoil-event-replay.mjs --input scripts/equation-mapping/compton-recoil-native-event-attempt.v1.json --require-native-closed --summary --out /tmp/compton-native-event-attempt-required.json
```

exits nonzero because attempt rows do not count as accepted native rows or accepted event-ledger support rows.

## Missing Native Rows

The default replay reports all native rows missing, and the direct native-event attempt reports the same rows as non-accepted `attempt` rows:

| Native row | Default replay status | Native-event attempt status |
| --- | --- | --- |
| `photon_gate_A_input_output` | missing | attempt |
| `photon_gate_B_transverse_handoff` | missing | attempt |
| `target_retained_branch` | missing | attempt |
| `recoil_branch` | missing | attempt |
| `angular_momentum_ledger_delta_J` | missing | attempt |
| `noether_sea_state_row` | missing | attempt |
| `energy_momentum_event_ledger` | missing | attempt |

These rows are the next score-moving work. They must be populated on the same $\mathsf e_{\gamma e}^{0}$ record before the Compton residual can support an `EQ-28` score review.

Native closure also requires explicit same-event support rows for `medium` and `remnant`. In the weak homogeneous limit these rows may declare zero energy and momentum transfer, but zeros must be retained ledger rows with concrete provenance and explicit `delta_E` and `delta_p` fields, not omitted bookkeeping or defaulted zeros.

## Score Decision

No `6/23 b` score changes are justified.

- `EQ-28` remains `3`: the executable comparison surface closes, but native photon Gate A/B, recoil, angular-momentum, Noether sea, event-ledger, and medium/remnant support rows are not accepted.
- `EQ-26` remains `3`: the checker confirms shared $h$, $c_\gamma$, $M_e^{\mathrm{exp}}$, and recoil-convention agreement for this comparison, but it does not derive an atomic spectral coefficient row.
- `EQ-12` and `EQ-29` remain `3`: the projection-use fields identify how the event can feed photon and radiation-mechanism rows, but no native photon packet or source-mechanism ledger has been populated.
- No `Promoted?` cells should be marked `ready` or `complete` from this pass.

## Next Reducer Targets

1. Populate the native $\mathsf e_{\gamma e}^{0}$ rows for `EQ-28`, starting with Gate A/B plus target and recoil retained branches.
2. Use the `same_branch_chart_identity` acceptance extractor for `EQ-02` through `EQ-04`, without counting current proxy rows as retained rows.
3. Use the Noether sea density-compression surface-slice runner for `EQ-06` through `EQ-11`, `EQ-20`, `EQ-24`, and `EQ-32`, with score movement blocked until a retained $\Theta_{\mathrm{sea}}^{(\ell,W)}$ supplies a coefficient row.

## Promotion Decision

Priority-only. This pass adds a useful success marker under the existing photon/event-ledger proof route, but it does not create a reader-facing result. Promotion remains blocked until a native event record closes energy, momentum, angular momentum, photon Gate A/B, recoil, medium/remnant, and Noether sea rows without hidden retune.
