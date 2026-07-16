# $A_0$ Root-Transport Feature-Span Scanner

## Status

- Kind: `priority`
- Status: `priority-only`
- Claim level: diagnostic feature-span no-go, not accepted history
- Date: May 22, 2026

## Scanner Contract

The scanner [a0-root-transport-feature-span-scanner.mjs](../../../../scripts/mass-map/a0-root-transport-feature-span-scanner.mjs) consumes a corrected `a0-tier1-fold-layer-locked-one-period-attempt/v1` artifact and tests fixed branch-geometric feature spans assembled from `branch_chart_source_records.root_transport_source_record`. It uses the same anti-overfit held-out residual rule as the branch-chart checker:

```text
even_to_odd
odd_to_even
first_half_to_second_half
second_half_to_first_half
```

It only selects `I`-receiver `inter_layer` roots, excludes locked fold-layer roots, and never uses `transport_id` as a feature. It emits:

```text
artifact_schema = a0-root-transport-feature-span-scanner/v1
accepted_history_boundary = false
rerun_authority = diagnostic_only_not_corrected_rerun_authority
```

A source-declared feature-span pass would be only a candidate for the existing branch-chart checker. A diagnostic-only feature-span pass would require a future source artifact to predeclare the quotient before it could be checked. Neither case authorizes a corrected rerun by itself.

## May 22, 2026 Execution

The production diagnostic used the current corrected fold-layer-locked root-transport artifact:

```text
node scripts/mass-map/a0-root-transport-feature-span-scanner.mjs --intake /tmp/a0-tier1-fold-layer-locked-one-period-attempt-corrected-omit-none-root-transport-identity-full.json --pretty --out /tmp/a0-root-transport-feature-span-scan.json
```

The scanner reports a feature-span no-go:

```text
status = root_transport_feature_span_no_go
row_status = root_transport_feature_span_no_go
failure_code = all-feature-spans-fail-held-out-residual
best_source_declared_family = source_layer_shear
best_source_declared_max_held_out_relative_residual = 1.712369148202459
best_overall_family = source_layer_DJ_Dtau_no_phase_projection
best_overall_source_declared = false
best_overall_max_held_out_relative_residual = 1.2474273873652615
```

The scanned family table is:

| Family | Source-declared? | Full fit | Held-out maximum |
| --- | --- | ---: | ---: |
| `source_layer_shear` | yes | `0.9183276656428045` | `1.712369148202459` |
| `source_layer_signed_polarity_shear` | no | `0.8099159899779984` | `1.6156063295193552` |
| `m_jacobian_signed_polarity_shear` | no | `0.8215774887240257` | `1.944813346261963` |
| `source_layer_DJ_Dtau_no_phase_projection` | no | `0.8530203529550823` | `1.2474273873652615` |
| `source_layer_full_theta_projection` | no | `0.745739031245972` | `2.259509850959959` |
| `signed_polarity_full_theta_projection` | no | `0.666255389046414` | `2.0015111822190352` |
| `source_layer_gap_phase` | no | `0.926129463717151` | `2.472603436629157` |
| `source_layer_shear_plus_gap_phase` | no | `0.7457410962076995` | `2.3011010289313023` |

All feature families pass the degrees-of-freedom guard, so the no-go is not caused by rank or leverage failure. The decisive blocker is held-out residual. The current root-transport source record is therefore internally coherent but does not contain a small fixed branch-geometric linear span that can close the $I$-layer residual.

The follow-on [root-transport residual spectrum](a0-root-transport-residual-spectrum.md) localizes the remaining signal rather than adding another fit. On the same root-transport identity artifact, the `I`-layer residual forcing has total norm `313.09723758998507`, dominant total cyclic mode `6` at energy fraction `0.20679763310995922`, and modes `4..7` together carry about `0.7552232385377363` of the residual forcing energy. This supports the interpretation that the feature-span no-go is not a source-record coherence failure; the missing branch information is a high cyclic-mode `I` residual packet.

## Boundary

This packet is a diagnostic no-go under the existing branch-chart revision route. It does not add a new acceptance gate. It narrows the next admissible path: another linear quotient over the already emitted root-transport fields is unlikely to be enough unless a future source artifact predeclares a materially different coordinate and passes the same held-out residual rule.

Promotion decision: priority-only. Do not promote this packet into `content/markdown/aaa` until a branch-chart row passes held-out residual, raw-row root-ledger stability, root-transport certification, and one-period closure.
