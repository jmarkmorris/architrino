# $A_0$ Root-Transport Residual Spectrum

## Status

- Kind: `priority`
- Status: `priority-only`
- Claim level: diagnostic residual-spectrum localization, not accepted history
- Date: May 22, 2026

## Diagnostic Contract

The script [a0-root-transport-residual-spectrum.mjs](../../../../scripts/mass-map/a0-root-transport-residual-spectrum.mjs) consumes a corrected `a0-tier1-fold-layer-locked-one-period-attempt/v1` artifact with `branch_chart_source_records.root_transport_source_record` present. It reads only the sampled forcing row

```text
rows[].residual_ledgers.refined_i_receiver_phase_bin_residual_balance.sampled_forcing.samples[].layers.I.residual_forcing
```

and reports one-sided cyclic Fourier energy over the sampled buckets. It may also consume an `a0-root-transport-feature-span-scanner/v1` artifact, but that scan is copied as context only and is not an input to the residual computation.

The artifact boundary is:

```text
artifact_schema = a0-root-transport-residual-spectrum/v1
accepted_history_boundary = false
rerun_authority = diagnostic_only_not_corrected_rerun_authority
```

This diagnostic does not fit a branch-chart coordinate, does not add a new acceptance gate, and does not authorize a corrected rerun.

## May 22, 2026 Execution

The production diagnostic used the current corrected root-transport identity artifact and the feature-span no-go scan:

```text
node scripts/mass-map/a0-root-transport-residual-spectrum.mjs --intake /tmp/a0-tier1-fold-layer-locked-one-period-attempt-corrected-omit-none-root-transport-identity-full.json --scan /tmp/a0-root-transport-feature-span-scan.json --pretty --out /tmp/a0-root-transport-residual-spectrum.json
```

The row reports:

```text
status = residual_spectrum_computed
sample_count = 16
total_norm = 313.09723758998507
component_norms.x = 227.03608152455058
component_norms.y = 209.87578359455603
component_norms.z = 49.36246887087686
dominant_total_mode = 6
dominant_total_mode_energy_fraction = 0.20679763310995922
```

The dominant component modes are:

| Component | Dominant mode | Energy fraction |
| --- | ---: | ---: |
| `x` | `6` | `0.36296061701896126` |
| `y` | `7` | `0.3133196063639811` |
| `z` | `1` | `0.32040567166714556` |

The total one-sided mode-energy table is:

| Mode | Total energy fraction |
| ---: | ---: |
| `0` | `0.006037665005713282` |
| `1` | `0.027210869608302754` |
| `2` | `0.06889281850349091` |
| `3` | `0.06589403668649753` |
| `4` | `0.1976572144462402` |
| `5` | `0.14710486451460528` |
| `6` | `0.20679763310995922` |
| `7` | `0.20366352646693162` |
| `8` | `0.07674137165825896` |

Modes `4` through `7` carry about `0.7552232385377363` of the `I`-layer residual forcing energy. The residual is therefore not mainly a constant offset, not mainly a one-period drift, and not mainly a pure even/odd alternation. It is a broad high cyclic-mode packet concentrated in the same mode band that the branch-chart revision contract had already isolated, now computed on the root-transport identity artifact after the feature-span no-go.

The copied feature-span context is:

```text
scan_status = root_transport_feature_span_no_go
best_source_declared_family = source_layer_shear
best_source_declared_max_held_out_relative_residual = 1.712369148202459
best_overall_family = source_layer_DJ_Dtau_no_phase_projection
best_overall_source_declared = false
best_overall_max_held_out_relative_residual = 1.2474273873652615
```

## Boundary

This packet strengthens the interpretation of the root-transport feature-span no-go. The current emitted root-transport fields are internally coherent, but the residual that remains after the corrected compact fixture is a high cyclic-mode `I`-receiver residual, not a small fixed linear quotient over the existing root-transport feature families.

The follow-on [mode-band source eligibility packet](a0-mode-band-source-eligibility.md) samples lawful pre-fit source fields at the same `16` residual buckets. It finds source-direction evidence outside the current `I`-receiver feature span: `transport:M:inter_layer:I:mean_D_J` has mode-band fraction `0.9944893706413693`, `transport:M:inter_layer:I:sum_source_layer_shear_projection` has `0.9898412022022768`, and corrected-carrier `body:I:rel_vel:x` has `0.9353099187288153`. The [reciprocal inter-layer branch-equation checker](a0-reciprocal-interlayer-branch-equation-checker.md) then tests the smallest lawful version of that lead and fails held-out residual with maximum relative residual `1.4057625588588099`. The [carrier-frame residual spectrum](a0-carrier-frame-residual-spectrum.md) adds the geometric localization: under declared linear time alignment, the remaining sampled forcing is mostly radial in the corrected `I` carrier frame, with radial energy fraction `0.5823726218116948` and radial mode-band fraction `0.7984257865887138`. This does not authorize a rerun; it rules out the immediate reciprocal velocity-projected equation and narrows the next branch-chart target to time-aligned carrier-frame deformation geometry.

The next admissible branch-chart move should therefore be a predeclared coordinate or branch equation that targets the `I` residual mode band `4..7` from branch geometry before fitting. Repackaging another linear span of the same emitted root-transport fields is low value unless a future source artifact declares a materially different coordinate and still passes held-out residual, root-transport certification, raw-row root-ledger stability, and one-period closure.

Promotion decision: priority-only. Do not promote this packet into `content/markdown/aaa` until a branch-chart row passes held-out residual and the downstream corrected one-period closure gates.
