# Equation Closure Pass 2026-06-23 I

## Workstream Metadata

- Kind: `priority`
- Status: `complete`
- Mode: `team-agent continuation with executable reducer hardening`
- Parent: [Equation Mapping Internal Priority](priorities.md)
- Score column updated: none
- Claim level: score-neutral native event-ledger attempt

## Purpose

This pass tightened the `EQ-28` Compton/recoil native event-ledger boundary. The weak homogeneous comparison replay already closes the algebraic energy, momentum, inverse-energy Compton, and wavelength-shift residuals. The remaining question is whether the native $\mathbb{A}\mathbb{A}\mathbb{A}$ event record

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

is populated on one retained event carrier.

The executable artifact [compton-recoil-event-replay.mjs](../../../scripts/equation-mapping/compton-recoil-event-replay.mjs) now requires any accepted native row to be a structured retained row object with concrete `rowId`, `sourcePath` or `source`, and an `eventId` matching the event carrier. It also requires same-event `medium` and `remnant` support rows before native closure can pass. Accepted support rows must carry explicit `delta_E` and `delta_p` fields; missing explicit deltas report `accepted_without_explicit_delta`, and nonzero weak-homogeneous deltas report `accepted_nonzero_weak_homogeneous_delta`. A bare `accepted` string reports `accepted_without_retained_reference`; an otherwise accepted row with the wrong event id reports `accepted_event_id_mismatch`.

## Native Event Attempt Packet

The score-neutral attempt packet is [compton-recoil-native-event-attempt.v1.json](../../../scripts/equation-mapping/compton-recoil-native-event-attempt.v1.json). It fixes the event-ledger input shape for $\mathsf e_{\gamma e}^{0}$ without claiming row acceptance.

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
| Native ledger status | `native_rows_missing` |
| Shared `EQ-26` rows | `shared_rows_match` |
| Native row statuses | all seven required native rows are `attempt` |
| Event-ledger support statuses | `medium=attempt`, `remnant=attempt` |
| Energy residual | `3.70e-17` |
| Momentum residual | `0` |
| Compton inverse-energy residual | `7.40e-17` |
| Wavelength residual | `7.40e-17` |

The fail-closed command

```sh
node scripts/equation-mapping/compton-recoil-event-replay.mjs --input scripts/equation-mapping/compton-recoil-native-event-attempt.v1.json --require-native-closed --summary --out /tmp/compton-native-event-attempt-required.json
```

exits nonzero because `attempt` rows do not count as accepted native rows or accepted event-ledger support rows. The weak homogeneous zero medium/remnant terms are explicit ledger rows in the attempt packet, but they still require accepted provenance before native closure can pass.

## Score Decision

No `6/23 b` score changes are justified.

- `EQ-28` remains `3`: the replayable weak comparison is closed, but no accepted native event ledger or accepted medium/remnant support ledger exists.
- `EQ-26` remains `3`: the shared $h$, $c_\gamma$, $M_e^{\mathrm{exp}}$, and recoil-convention anti-retune check passes only for this comparison packet.
- `EQ-12` and `EQ-29` remain `3`: the photon Gate A/B packet and source-mechanism projection remain required native rows, not accepted outputs of this pass.
- No `Promoted?` cells should be marked `ready` or `complete` from this pass.

## Next Reducer Target

The next score-moving artifact is not another Compton comparison fixture. It is the first accepted native row on $\mathsf e_{\gamma e}^{0}$, preferably `photon_gate_A_input_output` plus `photon_gate_B_transverse_handoff` tied to the same photon carrier, or the pair `target_retained_branch` and `recoil_branch` tied to the same electron-target event. The event can move only when all seven native rows and the `medium`/`remnant` support rows share the same `eventId`, row provenance, retained event carrier, and explicit weak-homogeneous zero deltas where those support rows are claimed to vanish.

## Promotion Decision

Priority-only. This pass hardens the native event-ledger boundary and supplies a reusable attempt packet, but it does not create a reader-facing result. Promotion remains blocked until the native Compton/recoil event closes energy, momentum, angular momentum, photon Gate A/B, recoil, medium/remnant, and Noether sea rows without hidden retune.
