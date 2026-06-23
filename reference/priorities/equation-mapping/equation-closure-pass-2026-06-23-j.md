# Equation Closure Pass 2026-06-23 J

## Workstream Metadata

- Kind: `priority`
- Status: `complete`
- Mode: `team-agent continuation with executable reducer hardening`
- Parent: [Equation Mapping Internal Priority](equation-mapping.md)
- Score column updated: none
- Claim level: score-neutral Compton event-ledger support hardening

## Purpose

This pass closes a false-positive path in the `EQ-28` Compton/recoil native-event checker. Even in the weak homogeneous limit, the medium and remnant terms cannot disappear silently. If they are zero, they must still be explicit rows on the same event ledger before native closure can pass.

The native replay target therefore has two layers:

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
\right)
$$

plus explicit event-ledger support rows

$$
\left(
\texttt{medium},
\texttt{remnant}
\right)_{\mathsf e_{\gamma e}^{0}}.
$$

This is not a new score gate. It is a same-event support check for the already required finite event ledger.

## Executable Hardening

[compton-recoil-event-replay.mjs](../../../scripts/equation-mapping/compton-recoil-event-replay.mjs) now reports:

- `requiredEventLedgerSupport`: `medium`, `remnant`;
- `eventLedgerSupportStatuses`;
- `missingEventLedgerSupport`.

Native closure requires both native rows and event-ledger support rows to be accepted retained row objects with concrete `rowId`, `sourcePath` or `source`, and the same `eventId` as the event carrier. Accepted support rows must include explicit `delta_E` and `delta_p` fields; a claimed accepted support row with omitted deltas reports `accepted_without_explicit_delta`, and a claimed accepted support row with nonzero weak-homogeneous deltas reports `accepted_nonzero_weak_homogeneous_delta`. If the seven native rows were accepted but medium/remnant support were absent, the status would be `comparison_replay_closed_event_ledger_support_missing` and `nativeLedgerStatus=event_ledger_support_missing`.

## Current Attempt Result

Command:

```sh
node scripts/equation-mapping/compton-recoil-event-replay.mjs --input scripts/equation-mapping/compton-recoil-native-event-attempt.v1.json --summary --pretty
```

Summary:

| Field | Result |
| --- | --- |
| Status | `comparison_replay_closed_native_rows_missing` |
| Score decision | `no_score_increase` |
| Native ledger status | `native_rows_missing` |
| Native row statuses | all seven required native rows are `attempt` |
| Required event-ledger support | `medium`, `remnant` |
| Event-ledger support statuses | `medium=attempt`, `remnant=attempt` |
| Missing event-ledger support | `medium`, `remnant` |

The fail-closed mode remains:

```sh
node scripts/equation-mapping/compton-recoil-event-replay.mjs --input scripts/equation-mapping/compton-recoil-native-event-attempt.v1.json --require-native-closed --summary --out /tmp/compton-native-event-attempt-required.json
```

and exits nonzero.

## Score Decision

No `6/23 b` score changes are justified.

- `EQ-28` remains `3`: the weak comparison closes, but the native event rows and medium/remnant support rows are still attempt-level.
- `EQ-12`, `EQ-26`, and `EQ-29` remain unchanged: the support rows prevent hidden ledger omissions but do not populate photon Gate A/B, atomic spectral, or radiation-mechanism rows.
- No `Promoted?` cells should be marked `ready` or `complete` from this pass.

## Next Reducer Target

Populate the first accepted row on $\mathsf e_{\gamma e}^{0}$ only from a real retained event source. The first useful partial target is still the finite event support bundle:

$$
\left(
\texttt{photon\_gate\_A\_input\_output},
\texttt{target\_retained\_branch},
\texttt{recoil\_branch},
\texttt{energy\_momentum\_event\_ledger},
\texttt{medium},
\texttt{remnant}
\right),
$$

with `photon_gate_B_transverse_handoff`, `angular_momentum_ledger_delta_J`, and `noether_sea_state_row` remaining blocked unless real retained rows are available.

## Promotion Decision

Priority-only. This pass prevents a hidden-omission false positive in the native Compton event ledger, but it does not create a reader-facing result. Promotion remains blocked until the native event record closes all required rows and support rows without hidden retune.
