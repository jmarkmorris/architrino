# Fresh v10 Higher-Fold Itinerary Rebuild Target

## Scope

This packet freezes the first priority-only higher-fold itinerary rebuild
target after the same-itinerary structural screens failed to open a positive
sampled margin for `fresh-same-packet-fold-shear-seed-v0`.

It does not claim a repaired candidate, a proof-interval preledger pass, a live
ledger update, or branch-chart authorization.

Artifacts:

- `fresh_v10_higher_fold_itinerary_rebuild_target.v0.json`
- `fresh_v10_higher_fold_itinerary_rebuild_target.v0.md`
- `../../../../../scripts/proof-programs/fresh-v10-higher-fold-itinerary-rebuild-target.mjs`
- `reference/priorities/proof-programs/breather-proof/certificate/fresh_same_packet_fold_shear_seed.v0.json`
- `reference/priorities/proof-programs/breather-proof/certificate/fresh_v10_shifted_separator_finite_integration_obstruction.fixed_period.v0.json`
- `reference/priorities/proof-programs/breather-proof/certificate/fresh_v10_strict_gap_finite_integration_obstruction.local_shear_free_period.v0.json`

## Source Facts

The current packet identity still uses
`doubled_four_arc_generic`, whose expected field-speed root count
is `4`.

The shifted-separator fixed-period tangent is the selected rebuild seed because
it opens all listed v10 collars at the smaller direct-path threshold and has the
smallest observed higher-fold count at that threshold.

| Source | Threshold | Count at threshold | Count at lambda=1 | Controlling row |
| --- | --- | --- | --- | --- |
| shifted-separator fixed period | `0.264833953926991` | `12` roots | `24` roots | `C_u_A4_A2_left_v10_7` |
| free-period local shear | `0.685286902752066` | `20` crossings | `24` crossings | `C_u_A4_A2_left_v10_7` |

## Root-Count Signal

| lambda | field-speed roots | sampled max abs xdot |
| --- | --- | --- |
| `0` | `4` | `1.29545029980074` |
| `0.01` | `4` | `1.31600063667639` |
| `0.02` | `4` | `1.33759275531511` |
| `0.03` | `8` | `1.35985638808351` |
| `0.04` | `8` | `1.38257734390509` |
| `0.05` | `8` | `1.40562354302886` |
| `0.1` | `8` | `1.52351272676189` |
| `0.2` | `12` | `1.76420443960142` |
| `0.264833953926991` | `12` | `1.92139610770217` |
| `0.3` | `12` | `2.00682070185171` |
| `0.4` | `16` | `2.25009042470909` |
| `1` | `24` | `4.25078726697125` |

At the strict-gap threshold the shifted direct path has `12`
field-speed roots. At `lambda=0.3` it still has 12 roots, while by
`lambda=0.4` it has 16 roots. This is a routing signal, not a proof of
interval-stable root count.

## Selected Target

Proposed successor packet:

```json
{
  "packet_id": "fresh-v10-higher-fold-12-root-rebuild-v0",
  "itinerary_id": "fresh_v10_shifted_threshold_12_root_itinerary",
  "target_root_count": 12
}
```

The first-half seed contains six field-speed contacts: two current shifted
separators and four new higher-fold separators. By half-period symmetry the
second half contains the corresponding six contacts.

| theta | half period | velocity contact | source | current label |
| --- | --- | --- | --- | --- |
| `0.017798396198377` | first | negative_field_speed | new_higher_fold_separator |  |
| `0.0552155420033261` | first | negative_field_speed | new_higher_fold_separator |  |
| `0.127583617650084` | first | negative_field_speed | current_shifted_separator | sigma_1 |
| `0.241225936405174` | first | negative_field_speed | new_higher_fold_separator |  |
| `0.332416382350065` | first | negative_field_speed | current_shifted_separator | sigma_2 |
| `0.402659855366312` | first | negative_field_speed | new_higher_fold_separator |  |
| `0.517798396198377` | second | positive_field_speed | new_higher_fold_separator |  |
| `0.555215542003326` | second | positive_field_speed | new_higher_fold_separator |  |
| `0.627583617650084` | second | positive_field_speed | current_shifted_separator | sigma_3 |
| `0.741225936405174` | second | positive_field_speed | new_higher_fold_separator |  |
| `0.832416382350065` | second | positive_field_speed | current_shifted_separator | sigma_4 |
| `0.902659855366312` | second | positive_field_speed | new_higher_fold_separator |  |

## Successor Seed Packet

The diagnostic successor seed packet now exists at seed amplitude
`lambda=0.3`.

- `phi_cyc.fresh-v10-higher-fold-12-root-rebuild-v0.json`
- `mesh.fresh-v10-higher-fold-12-root-rebuild-v0.json`
- `causal_preledger_input_screen.fresh-v10-higher-fold-12-root-rebuild-v0.json`
- `candidate_cycle_packet_report.fresh-v10-higher-fold-12-root-rebuild-v0.md`

It remains priority-only: diagnostic higher-fold direct-path seed packet; not an interval root-count certificate, not a preledger pass, and not branch-chart authorization.

## Root-Count Certificate Status

The root-count stability artifacts now also exist:

- `fresh_v10_higher_fold_root_tube_certificate.v0.json`
- `fresh_v10_higher_fold_root_tube_certificate.v0.md`
- `fresh_v10_higher_fold_root_tube_interval_certificate.v0.json`
- `fresh_v10_higher_fold_root_tube_interval_certificate.v0.md`

It remains priority-only: binary64/Lipschitz 12-root evidence has been translated into an outward rational interval root-count certificate; this closes the root-count topology gate but not the preledger or branch chart.

## Proof-Interval v1 Sidecar

The first higher-fold proof-interval sidecar now exists:

- `preledger_interval_backend_certificate.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v1.json`
- `causal_ledger.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v1.json`
- `causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v1.md`
- `preledger_interval_engine_audit.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v1.json`

It remains priority-only: exact-rational coarse range sidecar certifies 270 range-empty rows and leaves 980 split-required rows; not a preledger pass or branch chart authorization.

## Proof-Interval v2 Sidecar

The second higher-fold proof-interval sidecar now exists:

- `preledger_interval_backend_certificate.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v2.json`
- `causal_ledger.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v2.json`
- `causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v2.md`
- `preledger_interval_engine_audit.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v2.json`

It remains priority-only: exact-rational row-specific trigonometric sidecar certifies 1,062 range-empty rows and leaves 188 split-required rows; not a preledger pass or branch chart authorization.

## Proof-Interval v3 Sidecar

The third higher-fold proof-interval sidecar now exists:

- `preledger_interval_backend_certificate.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v3.json`
- `causal_ledger.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v3.json`
- `causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v3.md`
- `preledger_interval_engine_audit.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v3.json`

It remains priority-only: exact-rational root-complement monotone diagonal sidecar certifies the same 1,062 range-empty rows plus 26 diagonal exclusions and leaves 162 split-required rows; not a preledger pass or branch chart authorization.

## Proof-Interval v4 Sidecar

The fourth higher-fold proof-interval sidecar now exists:

- `preledger_interval_backend_certificate.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v4.json`
- `causal_ledger.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v4.json`
- `causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v4.md`
- `preledger_interval_engine_audit.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v4.json`

It remains priority-only: exact-rational simple-root subwindow sidecar records 42 root-complement monotone receiver subrow certificates, consumes 0 parent simple-root rows, and leaves 162 split-required base rows: 42 parent complement-coverage rows, 8 periodic endpoint/complement rows, and 112 fold-layer rows; not a preledger pass or branch chart authorization.

## Proof-Interval v5 Sidecar

The fifth higher-fold proof-interval sidecar now exists:

- `preledger_interval_backend_certificate.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v5.json`
- `causal_ledger.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v5.json`
- `causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v5.md`
- `preledger_interval_engine_audit.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v5.json`

It remains priority-only: exact-rational receiver-grid cover audit over the 42 regular residual parent-complement rows certifies 571 simple-root cells, misses 773 cells, consumes 0 parent rows, and leaves 162 split-required base rows; not a preledger pass or branch chart authorization.

## Proof-Interval v6 Sidecar

The sixth higher-fold proof-interval sidecar now exists:

- `preledger_interval_backend_certificate.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json`
- `causal_ledger.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json`
- `causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md`
- `preledger_interval_engine_audit.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.json`

It remains priority-only: exact-rational adaptive receiver-cover audit over the 42 regular residual parent-complement rows refines failed receiver cells to terminal grid 128, certifies 622 simple-root leaves, records 3,024 structural terminal source-cover misses, resolves 0 coarse cells, consumes 0 parent rows, and leaves 162 split-required base rows; not a preledger pass or branch chart authorization.

## Fold-Layer Burden Atlas

The higher-fold fold-layer burden atlas now exists:

- `fold_layer_burden.fresh-v10-higher-fold-12-root-rebuild-v0.json`
- `fold_layer_burden_report.fresh-v10-higher-fold-12-root-rebuild-v0.md`

It remains priority-only: priority-only fold-layer burden atlas groups 112 split-required fold-layer rows by 12 higher-fold separator layers, records required same-packet fields, consumes 0 rows, and does not authorize a branch chart.

## Row-Reuse Boundary

The old 10 v10 collars remain useful source diagnostics for the rebuild, but
they are not consumable preledger rows for the new itinerary until regenerated
under the successor packet identity. Existing accepted or partial rows from
`fresh-same-packet-fold-shear-seed-v0` are historical unless recomputed or
proven persistent for `fresh-v10-higher-fold-12-root-rebuild-v0`.

## Required Closure Artifacts

- Freeze the successor packet identity before any row consumption, using a new itinerary id and mesh name rather than mutating fresh-same-packet-fold-shear-seed-v0.
- Use the outward rational 12-root field-speed interval certificate as the topology input for the successor packet; regenerate the seed surface if that certificate changes the root tubes or itinerary partition.
- Regenerate null-coordinate gap collars and fold-layer rows for the successor packet; old same-itinerary v10 rows are historical unless recomputed or proven persistent under the new packet identity.
- Use the v6 adaptive receiver-cover audit as evidence that the 42 regular residual parent rows have structural source-cover deficits under the current full-source rule, not merely coarse 32-cell receiver-grid misses.
- Use the higher-fold separator-layer burden atlas for the 112 fold-layer-candidate rows as the fold-layer certification worklist, and separately resolve the 8 periodic endpoint/complement rows before branch-chart, corridor, monodromy, returned-sample, topology, or Schauder rows can resume.
- Record any strict-gap tangent or sampled LP evidence as diagnostic until it is backed by outward-rounded interval certificates.

## Non-Authorizations

- Does not accept the shifted direct finite path as a repaired candidate.
- Does not update causal_ledger.json or any live proof-interval ledger.
- Does not authorize branch_chart.json.
- Does not promote the collinear-breather theorem into $\mathbb{A}\mathbb{A}\mathbb{A}$ prose.

## Closure Condition

The 12-root field-speed topology is interval-certified for fresh-v10-higher-fold-12-root-rebuild-v0, proof-interval v3 certifies 1,062 row-specific range-empty rows plus 26 root-complement monotone diagonal exclusions, proof-interval v4 records 42 simple-root receiver subwindow certificates, proof-interval v5 audits the 42 residual regular parents with 571 certified receiver cells and 773 missing cells, and proof-interval v6 adaptively refines those misses to terminal grid 128 with 622 certified leaves, 3,024 structural terminal misses, and 0 resolved coarse cells. The one-leaf post-probe stack now declares exact source-boundary, receiver-range, and combined candidate-change boundary-opening targets while certifying 0 movement, contraction, or candidate-change rows. The direct-path lambda shift screen gives a positive sampled one-leaf candidate-change direction at lambda=0.305, with largest active-endpoint threshold lambda>0.301815056706425, but it is not proof-grade until root topology, proof-interval preledger, preservation, and ownership fields are recertified at the trial packet. The fold-layer burden atlas now groups the 112 split-required fold-layer rows by 12 separator layers. The remaining closure artifacts are a new source-cover/parent-complement theorem or candidate change with proof-grade positive boundary-opening data for those 42 regular rows, periodic endpoint/complement ownership for 8 rows, and same-packet fold-layer certification for 112 rows before branch-chart work.

## Capture Decision

Priority-only. This packet converts obstruction evidence into a rebuild target; promotion should wait for a passed proof-interval preledger for the interval-certified successor packet.
