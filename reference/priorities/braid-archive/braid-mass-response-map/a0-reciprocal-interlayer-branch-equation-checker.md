# $A_0$ Reciprocal Inter-Layer Branch-Equation Checker

## Status

- Kind: `priority`
- Status: `priority-only`
- Claim level: executable reciprocal branch-equation no-go, not accepted history
- Date: May 22, 2026

## Checker Contract

The checker [a0-reciprocal-interlayer-branch-equation-checker.mjs](../../../../scripts/mass-map/a0-reciprocal-interlayer-branch-equation-checker.mjs) consumes a corrected `a0-tier1-fold-layer-locked-one-period-attempt/v1` artifact and tests the smallest lawful reciprocal branch-equation packet indicated by the mode-band source-eligibility scan. Its original contract uses only pre-fit reciprocal `M<-I` inter-layer fields and the corrected-carrier `I` relative-velocity direction:

```text
transport:M:inter_layer:I:mean_D_J
transport:M:inter_layer:I:sum_source_layer_shear_projection
root:M:inter_layer:I:mean_J
vhat_I = normalized corrected-carrier I relative velocity
```

The tested vector equation is

$$
\mathbf{S}_{I}^{\mathrm{recip}}(t)
=
\left[
\alpha_1 D_J(M\leftarrow I;t)
+\alpha_2 S_{\mathrm{shear}}(M\leftarrow I;t)
+\alpha_3 J(M\leftarrow I;t)
\right]\widehat{\mathbf{v}}_I(t),
$$

against

```text
refined_i_receiver_phase_bin_residual_balance.sampled_forcing.samples[].layers.I.residual_forcing
```

The source channels, projection rule, held-out split, and degrees-of-freedom guard are declared before fitting. Optional `a0-mode-band-source-eligibility/v1` input is copied as context only and is not an input to the fit.

The artifact boundary is:

```text
artifact_schema = a0-reciprocal-interlayer-branch-equation-checker/v1
accepted_history_boundary = false
rerun_authority = diagnostic_only_not_corrected_rerun_authority
```

This checker does not authorize corrected rerun or accepted history. A pass would only create a priority-side branch-equation candidate still subject to root-transport certification, raw-row root-ledger stability, and one-period closure.

The same checker now also supports declared carrier-frame projection modes through [the reciprocal carrier-frame projection packet](a0-reciprocal-carrier-frame-projection-checker.md). Those modes use the same source scalars projected along $\widehat{\mathbf e}_{I,r}$, $\widehat{\mathbf e}_{I,\theta}$, or both under a declared carrier-frame time rule.

## May 22, 2026 Execution

The production diagnostic used the current corrected root-transport identity artifact and the mode-band source-eligibility packet:

```text
node scripts/mass-map/a0-reciprocal-interlayer-branch-equation-checker.mjs --intake /tmp/a0-tier1-fold-layer-locked-one-period-attempt-corrected-omit-none-root-transport-identity-full.json --source-eligibility /tmp/a0-mode-band-source-eligibility.json --pretty --out /tmp/a0-reciprocal-interlayer-branch-equation-checker.json
```

The row reports:

```text
status = reciprocal_interlayer_branch_equation_no_go
failure_code = overfit_holdout_fail
sample_count = 16
equation_count = 48
coefficient_count = 3
full_relative_residual = 0.8153375937829352
max_held_out_relative_residual = 1.4057625588588099
tolerance = 0.02
```

The degrees-of-freedom guard passes:

```text
trace_h_over_equations = 0.0625
max_leverage = 0.36363072840825733
minimum_observation_rows_per_feature = 37
feature_rank = 3
full_column_rank = true
```

The held-out splits fail:

| Split | Relative residual |
| --- | ---: |
| `even_to_odd` | `0.777894866383509` |
| `odd_to_even` | `0.9489303911349857` |
| `first_half_to_second_half` | `1.4057625588588099` |
| `second_half_to_first_half` | `0.9020893764131593` |

The copied source-eligibility context remains strong but not decisive:

```text
top_channel = transport:M:inter_layer:I:mean_D_J
mode_band_energy_fraction = 0.9944893706413693
dominant_mode = 6
dominant_mode_energy_fraction = 0.974804031803283
```

## Interpretation

The reciprocal `M<-I` channels are real pre-fit source directions for the same high cyclic-mode packet that dominates the remaining `I` residual. However, the smallest lawful reciprocal vector equation does not generalize across held-out buckets. This closes the immediate source-eligibility lead as a corrected-rerun route.

The failure is informative because it is not a rank or leverage failure. The three-feature equation is overdetermined, full-rank, and low leverage, yet its held-out residual is about `70.3` times the `0.02` tolerance. The missing structure is therefore not supplied by a scalar reciprocal amplitude projected only along $\widehat{\mathbf{v}}_I(t)$.

The follow-on [carrier-frame residual spectrum](a0-carrier-frame-residual-spectrum.md) supports that interpretation. Its nearest-sample run exposes carrier-sample ties; its declared linear time-alignment run projects the same target into the corrected `I` carrier frame and finds radial energy fraction `0.5823726218116948`, tangential energy fraction `0.30218666299353525`, and normal energy fraction `0.11544071519477007`. The velocity-direction projection no longer carries the decisive high-mode packet by itself, so a pure $\widehat{\mathbf{v}}_I$ reciprocal amplitude is geometrically too narrow. The [carrier-frame branch-coordinate checker](a0-carrier-frame-branch-coordinate-checker.md) then tests the direct source-side deformation ladder and also fails held-out residual, so radial localization cannot be promoted into `delta_radius` rerun authority. The [reciprocal carrier-frame projection packet](a0-reciprocal-carrier-frame-projection-checker.md) closes the remaining immediate projection lead: radial, tangential, and radial/tangential reciprocal projections all pass degrees-of-freedom guards but fail held-out residual.

## Boundary

This packet is a fail-closed branch-equation result. It blocks corrected-rerun authority for the reciprocal `M<-I` velocity-projected equation and, through the carrier-frame projection packet, the same source scalars projected through $\widehat{\mathbf e}_{I,r}$, $\widehat{\mathbf e}_{I,\theta}$, or both. The $A_0$ branch-chart revision contract stays active. Any next candidate must add new predeclared branch geometry rather than reusing the same source-eligibility channels with extra post-fit freedom.

Promotion decision: priority-only. Do not promote this packet into `content/markdown/aaa` until a branch-equation row passes held-out residual, root-transport certification, raw-row root-ledger stability, and one-period closure.
