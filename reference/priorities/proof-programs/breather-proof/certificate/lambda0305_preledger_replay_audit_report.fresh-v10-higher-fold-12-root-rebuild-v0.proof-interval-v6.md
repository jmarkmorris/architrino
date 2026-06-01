# Lambda 0.305 Preledger Replay Audit

## Scope

This audit records the direct-path trial at `lambda=0.305` for
`fresh-v10-higher-fold-12-root-rebuild-v0`.

The trial was motivated by
`one_leaf_direct_path_lambda_shift_screen_report.fresh-v10-higher-fold-12-root-rebuild-v0.proof-interval-v6.md`,
which found positive sampled active-endpoint openings for the three current
one-leaf obstruction rows. This replay asks the next proof question: after
materializing the `lambda=0.305` trial seed and recertifying root topology, does
the proof-interval preledger sidecar stack consume the remaining rows?

## Status

- Status: `lambda0305_topology_certified_preledger_still_blocked`
- Trial lambda: `0.305`
- Branch chart authorized: `false`
- Preledger pass: `false`
- Promotion decision: priority-only

## Durable Trial Artifacts

| artifact | sha256 |
| --- | --- |
| `phi_cyc.fresh-v10-higher-fold-12-root-rebuild-v0.lambda0305.json` | `fd3bc40790ddb24b8e7bd5373a9b1a95d6fcb50680db8627ac214e66c0d52ec5` |
| `mesh.fresh-v10-higher-fold-12-root-rebuild-v0.lambda0305.json` | `8bbf0f172bf90edf10391138a004e133da15ce6ad88d93597a96e07664e161a5` |
| `causal_preledger_input_screen.fresh-v10-higher-fold-12-root-rebuild-v0.lambda0305.json` | `8e64bef4445fd8bc17ff2b224a33ba4bce8c291b7c76d5110dfce81a9461ec0a` |
| `candidate_cycle_packet_report.fresh-v10-higher-fold-12-root-rebuild-v0.lambda0305.md` | `95083a54774aa58c2f5e1d365ec1d22f4d268261410476985361ab538f53d776` |
| `fresh_v10_higher_fold_root_tube_certificate.lambda0305.v0.json` | `96d13849468325aa81c8a07c27054e2bbec41e8889ea0e2e1a2a66ffb5c4d4ed` |
| `fresh_v10_higher_fold_root_tube_certificate.lambda0305.v0.md` | `515af8cf09a643467ea8b798a5306b8eec10b8c04e2b1a601b20490dce06fcbf` |
| `fresh_v10_higher_fold_root_tube_interval_certificate.lambda0305.v0.json` | `10ae521a7598be430591ec70af57e83f7548a92c680281b0d3013a4501a36775` |
| `fresh_v10_higher_fold_root_tube_interval_certificate.lambda0305.v0.md` | `bfb69aaa781c5e654ba86cd838498e1cd756c04a5bab0243ecff05e4aff64142` |

## Trial Seed

The updated successor-seed generator computed the field-speed root state
directly for `lambda=0.305`, since that value was not one of the old obstruction
table states.

| field | value |
| --- | --- |
| root-state source | `computed_direct_path_root_scan` |
| root scan steps | `50000` |
| root count | `12` |
| input-screen rows | `1250` |
| sampled range-disjoint rows | `1066` |
| sampled overlap/touch rows | `184` |

## Topology Recertification

The binary64 root-tube pass returned
`binary64_lipschitz_root_tube_certificate_ready_for_directed_rounding`, with
minimum complement margin `0.0372582796775772` and minimum sampled derivative
floor `20.733612612016`.

The outward-rational interval certificate then returned
`outward_rational_interval_12_root_certificate_passed`, with
`root_count_interval_certified=true` and minimum complement margin
`0.023967918957860748`.

This closes the root-count topology burden for the `lambda=0.305` trial seed
only. It does not classify null-coordinate preledger rows and does not authorize
the branch chart.

## Preledger Replay

The full v1-v6 replay was run in `/private/tmp/proof-lambda0305/preledger`.
The full ledgers were not promoted because the replay remains branch-chart
blocked; the counts and ledger hashes below are preserved for deterministic
rerun comparison.

| sidecar | ledger sha256 | certified empty rows | simple-root subrows | receiver-cover cells | terminal structural misses | split-required rows |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| v1 | `3b44924b5c05793ad4216a587a2069781e26d5419c6c9b14b2382d701d8791e9` | 254 | 0 | 0 | 0 | 996 |
| v2 | `fb04a3cd79d4504548e7372f772523202ee024e2a8d6dd72756dc76066ac82b3` | 1062 | 0 | 0 | 0 | 188 |
| v3 | `68c0bb696693402050fc718ebcff135cb2931bbf4d81cbc7ce59e85ed6281b66` | 1088 | 0 | 0 | 0 | 162 |
| v4 | `f47f091058bdf5384ca280f44f1e6fe869b8a1e178374e1711a067995ddf2eea` | 1088 | 41 | 0 | 0 | 162 |
| v5 | `a204addfa02da67243428d1977b47e427c01e959248973dd323198753c92f3e0` | 1088 | 41 | 567 | 0 | 162 |
| v6 | `fdf65c265586d67bbef957e93922fe58014e53697c89cffc5f4bb4a3762439a9` | 1088 | 41 | 632 | 3012 | 162 |

The v6 terminal classification still has:

- `receiver_cover_complete_parent_rows=0`
- `receiver_cover_resolved_coarse_cells_by_refinement=0`
- `receiver_cover_terminal_missing_coarse_cells=777`
- `receiver_cover_indeterminate_miss_count=0`
- `accepted_fold_layer_rows=0`
- `branch_chart_authorized=false`

## Baseline Comparison

Relative to the existing `lambda=0.3` v6 baseline, the `lambda=0.305` trial:

- adds a proof-grade topology recertification for the trial seed;
- improves v6 receiver-cover certified cells from 622 to 632;
- reduces v6 structural misses from 3024 to 3012;
- but drops v4 simple-root subrows from 42 to 41 and v5 receiver-cover cells
  from 571 to 567;
- leaves the same terminal obstruction: 162 split-required base rows, zero
  complete receiver-cover parent rows, zero accepted fold-layer rows, and no
  branch-chart authorization.

## Capture Decision

Priority-only. The `lambda=0.305` direction is not a closure route by itself.
It proves that the direct-path amplitude can be moved while preserving a
proof-grade 12-root topology certificate, and it agrees with the sampled
one-leaf opening signal. It does not consume the null-coordinate preledger rows.

The next proof object must change the row-closure geometry or strengthen the
receiver-cover certificate. Replaying the same direct-path lambda family alone
is no longer the highest-value path unless paired with a new row-consumption
mechanism.
