# $A_0$ Mode-Band Source Eligibility

## Status

- Kind: `priority`
- Status: `priority-only`
- Claim level: diagnostic source-direction evidence, not accepted history
- Date: May 22, 2026

## Diagnostic Contract

The script [a0-mode-band-source-eligibility.mjs](../../../scripts/mass-map/a0-mode-band-source-eligibility.mjs) consumes a corrected `a0-tier1-fold-layer-locked-one-period-attempt/v1` artifact and audits lawful pre-fit branch-state source channels for cyclic mode-band content. It aligns source fields to the `16` sampled-forcing buckets by sampling the corrected carrier state, active-root ledger, and root-transport source record at the `refined_i_receiver_phase_bin_residual_balance.sampled_forcing` times.

The audited mode band is:

```text
modes = 4,5,6,7
```

The artifact boundary is:

```text
artifact_schema = a0-mode-band-source-eligibility/v1
accepted_history_boundary = false
rerun_authority = diagnostic_only_not_corrected_rerun_authority
```

The diagnostic does not fit residuals, does not define a branch-chart coordinate, does not add a new acceptance gate, and does not authorize a corrected rerun. Optional `a0-root-transport-residual-spectrum/v1` input is copied as target context only.

## May 22, 2026 Execution

The production diagnostic used the current corrected root-transport identity artifact and residual-spectrum packet:

```text
node scripts/mass-map/a0-mode-band-source-eligibility.mjs --intake /tmp/a0-tier1-fold-layer-locked-one-period-attempt-corrected-omit-none-root-transport-identity-full.json --residual-spectrum /tmp/a0-root-transport-residual-spectrum.json --pretty --out /tmp/a0-mode-band-source-eligibility.json
```

The row reports:

```text
status = pre_fit_mode_band_source_direction_present
sample_count = 16
sample_source = nearest corrected carrier samples at refined_i_receiver_phase_bin_residual_balance.sampled_forcing times
target_residual_mode_band_energy_fraction = 0.7552232385377363
target_dominant_mode = 6
target_dominant_mode_energy_fraction = 0.20679763310995922
```

The top lawful pre-fit source channels are:

| Rank | Channel | Source class | Mode-band fraction | Dominant mode | Dominant fraction | Centered energy |
| ---: | --- | --- | ---: | ---: | ---: | ---: |
| `1` | `transport:M:inter_layer:I:mean_D_J` | `root_transport_source_record` | `0.9944893706413693` | `6` | `0.974804031803283` | `0.11375889689761605` |
| `2` | `transport:M:inter_layer:I:sum_source_layer_shear_projection` | `root_transport_source_record` | `0.9898412022022768` | `5` | `0.5470454761913331` | `1.0235707494286748` |
| `3` | `transport:O:inter_layer:I:mean_D_tau` | `root_transport_source_record` | `0.9631024497936975` | `6` | `0.8790820319476099` | `0.000022969222875206832` |
| `4` | `root:M:inter_layer:I:mean_J` | `active_causal_root_ledger` | `0.9455864979675443` | `6` | `0.9432231399299639` | `0.07315945787412655` |
| `5` | `transport:O:inter_layer:M:mean_D_tau` | `root_transport_source_record` | `0.9396061124276892` | `6` | `0.5279763832661734` | `0.008398791875456418` |
| `6` | `body:I:rel_vel:x` | `corrected_carrier_state` | `0.9353099187288153` | `4` | `0.8866213625264731` | `136.39517938490832` |
| `7` | `body:I:rel_vel:y` | `corrected_carrier_state` | `0.9123649389317597` | `4` | `0.8853243496031761` | `138.39835559547834` |
| `8` | `body:I:rel_speed` | `corrected_carrier_state` | `0.9077993423026902` | `4` | `0.7285559490402188` | `48.27122059994097` |

This result does not rescue the current `I`-receiver root-transport coordinate. The source-declared root-transport quotient still fails held-out residual. Instead it shows that the remaining mode band has lawful pre-fit correlates outside the current `I`-receiver feature span: reciprocal inter-layer root transport with `M` as receiver and `I` as source, plus the corrected carrier state's inner relative velocity.

## Branch-Equation Target

The smallest follow-on branch-equation target was therefore reciprocal inter-layer feedback, not another one-sided `I`-receiver source-layer quotient. The priority-side candidate equation tested whether the `I` residual mode band can be sourced by a declared reciprocal transport row of the form

$$
\mathcal{S}_{I}^{\mathrm{recip}}(t)
=
\left[
\alpha_1 D_J(M\leftarrow I;t)
+\alpha_2 S_{\mathrm{shear}}(M\leftarrow I;t)
+\alpha_3 J(M\leftarrow I;t)
\right]\widehat{\mathbf{v}}_I(t),
$$

where $\widehat{\mathbf{v}}_I(t)$ is the normalized corrected-carrier `I` relative velocity. The coefficients may be fitted only after the reciprocal source fields, projection, phase-origin rule, locked-key exclusions, and held-out split are declared. Without that declaration, the equation remains a diagnostic source direction.

The follow-on [reciprocal inter-layer branch-equation checker](a0-reciprocal-interlayer-branch-equation-checker.md) now closes that lead as a no-go. The three-feature equation passes its degrees-of-freedom guard with `48` equations, `3` coefficients, feature rank `3`, and maximum leverage `0.36363072840825733`, but fails held-out residual:

```text
full_relative_residual = 0.8153375937829352
max_held_out_relative_residual = 1.4057625588588099
tolerance = 0.02
failure_code = overfit_holdout_fail
```

## Boundary

This packet is source-direction evidence. Its immediate reciprocal inter-layer branch-equation follow-on has now failed closed. It does not permit a corrected one-period rerun, because held-out residual, root-transport certification, raw-row root-ledger stability, and one-period closure still fail or remain pending.

Promotion decision: priority-only. Do not promote this packet into `content/markdown/aaa` until a reciprocal branch-equation row passes the pre-rerun checker and downstream corrected one-period gates.
