# Master Equation Live Machine-Field Disposition

## Status

- Purpose: remove ambiguity from live receiver-normal and source-normal field families before terminology migration
- Standing: compatibility plan only; no schema, code, runtime, or EOM solver semantics are changed here
- Scope: field families found under `src/eom`, `scripts/eom`, `src/apps`, and `tests`

## Governing rule

Current wire tokens remain unchanged in their existing schema versions. New terminology appears first in reader-facing labels and internal explanatory prose. Any machine rename requires a new schema or explicitly versioned compatibility boundary.

The receiver-side mathematical quantity remains required for root playback even though the proposed base acceleration removes it from acceleration strength. Fields that currently combine those two meanings must be split rather than redefined in place.

## Field-family dispositions

| Current field or token family | Current meaning | Disposition | New conceptual name |
| --- | --- | --- | --- |
| `source_normal`, `sourceNormal*`, `D_s` | $c_f-\hat{\mathbf r}\cdot\mathbf V_t(T_t)$; root transversality and old-law denominator | Preserve in every current wire format and frozen record; reader-facing terminology migrates; a future schema may rename without changing value | transmitter-side factor $D_t$ |
| `receiver_normal`, `receiverNormalNumerator`, `D_T` | $c_f-\hat{\mathbf r}\cdot\mathbf V_r(T_r)$ | Preserve the quantity and current wire fields; migrate reader-facing terminology; do not delete | receiver-side factor $D_r$ |
| `receiver_strength` | Usually the unsigned old-law acceleration weight $|D_r/D_t|$ | Freeze as old-law meaning in current schemas; do not redefine; retire or replace in a future equation schema | `accelerationWeight` for the selected law, with its formula declared by schema version |
| `branch_orientation` | Signed root-playback derivative $D_r/D_t$ | Preserve semantics; rename only in a versioned schema | `rootPlaybackDerivative` or displayed $dT_t/dT_r$ |
| `receiverNormalFactor` | App/runtime copy of the signed ratio $D_r/D_t$ | Preserve compatibility input; label it as root playback in UI; do not use the old name as a new acceleration claim | `rootPlaybackFactor` |
| `unsignedReceiverNormalFactor` | App/runtime copy of $|D_r/D_t|$ | Preserve old-law compatibility; in a future schema separate old-law acceleration weight from unsigned playback diagnostic | `unsignedRootPlaybackFactor` when diagnostic |
| `receiverNormalCrossingFactor` | Receiver-side crossing ratio $D_r/c_f$ | Preserve value; migrate reader-facing label | `receiverCrossingFactor` |
| `receiverNormalSpeed` | $\hat{\mathbf r}\cdot\mathbf V_r(T_r)$ | Preserve value; migrate reader-facing label | `receiverRadialSpeedAtReception` |
| `sourcePathId`, `source_history_ids`, `source_charge` | Transmitting path identity, history identity, and polarity in EOM contracts | Preserve current wire tokens; use transmitter wording in UI and documentation; future schema rename only | `transmitterPathId`, `transmitterHistoryIds`, `transmitterCharge` |
| `receiverPathId`, `receiver_history_ids`, `receiver_charge` | Receiving path identity, history identity, and polarity | Preserve current wire tokens; wording already matches the new role terminology | receiver equivalents |
| `sourceNormalSign`, `source_normal_sign`, `source_normal_floor` | Certified transmitter-side root orientation/floor | Preserve machine semantics and current token; migrate explanatory label | transmitter-factor sign/floor |
| `receiverNormalLower/Upper`, `difficult_receiver_normal_*` | Certified receiver-side interval diagnostics | Preserve because root transport still consumes them; migrate explanatory label | receiver-factor interval |
| `receiver_normal_branch_rows_missing/invalid` | App compatibility status codes for prescribed-path records | Preserve literal status codes; new UI message should say the receiver-side root-playback record is missing or invalid | versioned future status code only if needed |
| `prescribed_path_absolute_history_receiver_normal_root_branch_sum` | Serialized app mode token | Preserve literal token in current records; do not rewrite frozen data; add a new token only with a versioned consumer | `prescribed_path_absolute_history_root_playback_branch_sum` in a future version |
| `receiverNormalOwner` | App provenance owner for the receiver-side diagnostic | Preserve compatibility field; change reader-facing explanation only | `rootPlaybackOwner` in a future version |
| `check-receiver-normal-clean-slate.mjs` and foundational-impact literals | Validator for the currently canonical receiver-weighted law | Preserve until the equation changes; terminology migration may update its explanatory output but not silently convert its acceptance rule | freeze as old-law validator during later equation promotion |

## Required semantic split for any future equation schema

A future schema must not retain one overloaded `receiver_strength` field. It needs at least:

$$
\texttt{accelerationWeight}
$$

whose formula is fixed by the equation version, and

$$
\texttt{rootPlaybackDerivative}
=
\frac{D_r}{D_t}.
$$

If both signed and unsigned playback are consumed, declare them separately. Neither field may be inferred from a display label.

## Migration consequence

The terminology agent may change current reader-facing labels and explanations while keeping every listed current machine token intact. Safe internal identifier renames are allowed only when they do not cross serialization, command-line, URL, fixture, evidence, or plugin boundaries.

Promotion classification: **compatibility disposition complete at field-family level; execution remains a terminology-only edit until equation promotion is separately authorized**.
