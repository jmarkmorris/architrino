# Fresh v10 Higher-Fold Successor Seed Packet

## Scope

This packet materializes the first diagnostic successor seed for
`fresh-v10-higher-fold-12-root-rebuild-v0`.

It uses the shifted-separator direct path at
`lambda=0.305`, which is above the strict-gap
threshold and still has 12 sampled field-speed roots. The root-count topology
must be certified separately by a matching root-tube interval certificate for
this seed. This seed packet
does not claim an EOM-solved returned sample, a proof-interval preledger pass, a
live ledger update, or branch-chart authorization.
The root-state source for this run is
`computed_direct_path_root_scan`.

Artifacts:

- `phi_cyc.fresh-v10-higher-fold-12-root-rebuild-v0.lambda0305.json`
- `mesh.fresh-v10-higher-fold-12-root-rebuild-v0.lambda0305.json`
- `causal_preledger_input_screen.fresh-v10-higher-fold-12-root-rebuild-v0.lambda0305.json`
- `candidate_cycle_packet_report.fresh-v10-higher-fold-12-root-rebuild-v0.lambda0305.md`
- `../../../../../scripts/proof-programs/fresh-v10-higher-fold-successor-seed-packet.mjs`

## Seed Identity

```json
{
  "K": "fresh_v10_shifted_threshold_12_root_itinerary",
  "T_cyc": 6.28318530718,
  "S": "section x(0)=1.2447644729563, xdot(0)=-0.0876176690331297",
  "P": {
    "c_f": 1,
    "eta": 0.02,
    "epsilon_c": 0.05,
    "g": 1,
    "seed_lambda": 0.305,
    "memory_horizon_h": 6.28318530718
  },
  "B_rep": "shifted-separator fixed-period direct-path higher-fold seed",
  "Theta": "mesh.fresh-v10-higher-fold-12-root-rebuild-v0.json:nodes"
}
```

## Field-Speed Contacts

| contact | theta | xdot | type |
| --- | --- | --- | --- |
| `Sigma_hf_01` | `0.0152760654045269` | `-0.999999999998241` | negative_field_speed |
| `Sigma_hf_02` | `0.0566935771636292` | `-1.00000000000095` | negative_field_speed |
| `Sigma_hf_03` | `0.127583617650084` | `-1.00000000000042` | negative_field_speed |
| `Sigma_hf_04` | `0.239882538921423` | `-1.00000000000062` | negative_field_speed |
| `Sigma_hf_05` | `0.332416382350065` | `-1.00000000000039` | negative_field_speed |
| `Sigma_hf_06` | `0.40392438248653` | `-0.999999999999926` | negative_field_speed |
| `Sigma_hf_07` | `0.515276065404527` | `0.999999999998244` | positive_field_speed |
| `Sigma_hf_08` | `0.556693577163629` | `1.00000000000095` | positive_field_speed |
| `Sigma_hf_09` | `0.627583617650084` | `1.00000000000042` | positive_field_speed |
| `Sigma_hf_10` | `0.739882538921423` | `1.00000000000062` | positive_field_speed |
| `Sigma_hf_11` | `0.832416382350065` | `1.00000000000039` | positive_field_speed |
| `Sigma_hf_12` | `0.90392438248653` | `0.999999999999929` | positive_field_speed |

## Preledger Input Screen

The generated screen has `1250` sampled rows:
`1066` are sampled-disjoint and
`184` overlap or touch. These are
not accepted rows. They are only the input surface for exact-rational
proof-interval sidecars.

The first higher-fold proof-interval sidecar,
`causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v1.md`,
certifies 270 coarse range-empty rows from this surface and leaves 980 rows
`split_required`.

The second sidecar,
`causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v2.md`,
adds row-specific trigonometric range enclosures, certifies 1,062 rows total,
and leaves 188 rows `split_required`.

The third sidecar,
`causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v3.md`,
uses the root-count complement certificate to certify those 1,062 range-empty
rows plus 26 same-interval diagonal exclusions, and leaves 162 rows
`split_required`.

The fourth sidecar,
`causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v4.md`,
records 42 proof-grade simple-root receiver subwindow certificates but consumes
0 parent simple-root rows. The 162 base rows remain `split_required`: 42
parent complement-coverage rows, 8 periodic endpoint/complement rows, and 112
fold-layer rows.

The fifth sidecar,
`causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v5.md`,
audits the 42 regular residual parent-complement rows by a 32-cell receiver
grid. It certifies 571 simple-root receiver cells, misses 773 cells, consumes 0
parent rows, and leaves the same 162 base rows `split_required`.

The sixth sidecar,
`causal_preledger_interval_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md`,
adaptively refines the failed v5 receiver cells to terminal grid 128. It
certifies 622 simple-root receiver leaves, records 3,024 structural terminal
source-cover misses, resolves 0 coarse cells, consumes 0 parent rows, and
leaves the same 162 base rows `split_required`.

The one-leaf post-probe stack,
`one_leaf_boundary_movement_probe_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md`,
`one_leaf_source_boundary_movement_theorem_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md`,
`one_leaf_receiver_range_contraction_theorem_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md`,
and
`one_leaf_candidate_change_boundary_data_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md`,
declares the exact source-boundary, receiver-range, and combined
candidate-change boundary-opening targets for the three smallest regular rows.
It certifies 0 source-boundary movement rows, 0 receiver-range contraction rows,
0 same-packet candidate-change rows, consumes 0 rows, and does not authorize a
branch chart.

The direct-path lambda shift screen,
`one_leaf_direct_path_lambda_shift_screen_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md`,
tests the first concrete sampled route to those shifts. Raising the existing
direct-path parameter from `lambda=0.3` to `lambda=0.305` opens 3 / 3 one-leaf
boundary targets at sampled active endpoints; the largest active-endpoint
threshold is `lambda>0.301815056706425`, leaving trial margin
`0.00318494329357499`. The `lambda=0.305` replay audit recertifies the trial
seed's 12-root topology and reruns v1-v6, but it still leaves 162 rows
`split_required`, 0 complete receiver-cover parent rows, 0 accepted fold-layer
rows, and no branch-chart authorization. Direct-path lambda motion remains
fail-closed for row consumption.

The fold-layer burden atlas,
`fold_layer_burden_report.fresh-v10-higher-fold-12-root-rebuild-v0.md`,
groups the 112 fold-layer rows by 12 higher-fold separator layers. It records
the required same-packet fold-layer fields, consumes 0 rows, and does not
authorize a branch chart.

## Required Next Certificate Step

Before any branch-chart work, this successor packet needs:

- regenerated null-coordinate collars and fold-layer rows under this packet
  identity;
- a new source-cover/parent-complement theorem or candidate change with
  proof-grade positive boundary-opening data for the 42 regular residual rows;
- periodic endpoint/complement ownership for 8 rows;
- fold-layer proof-interval closure, using the burden atlas as the worklist,
  that classifies the 112 fold-layer rows as bounded `fold_layer`.

## Capture Decision

Priority-only. This materializes the higher-fold route as a concrete successor
seed packet, but it remains diagnostic until the proof-interval preledger
passes.
