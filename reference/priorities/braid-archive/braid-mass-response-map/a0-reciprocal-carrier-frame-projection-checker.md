# $A_0$ Reciprocal Carrier-Frame Projection Checker

## Status

- Kind: `priority`
- Status: `priority-only`
- Claim level: reciprocal carrier-frame projection no-go, not accepted history
- Date: May 22, 2026

## Checker Contract

The existing [a0-reciprocal-interlayer-branch-equation-checker.mjs](../../../../scripts/mass-map/a0-reciprocal-interlayer-branch-equation-checker.mjs) now accepts a declared projection mode:

```text
--projection velocity|radial|tangential|radial_tangential
--frame-time-rule nearest|linear
```

The source scalars remain the same pre-fit reciprocal `M<-I` fields:

```text
transport:M:inter_layer:I:mean_D_J
transport:M:inter_layer:I:sum_source_layer_shear_projection
root:M:inter_layer:I:mean_J
```

The new projection modes use only corrected carrier state:

$$
\widehat{\mathbf e}_{I,r}
=
\frac{\mathbf s_{I+}-\mathbf s_{I-}}{\|\mathbf s_{I+}-\mathbf s_{I-}\|},
\qquad
\widehat{\mathbf e}_{I,\theta}
=
\frac{\mathbf v_I-(\mathbf v_I\cdot\widehat{\mathbf e}_{I,r})\widehat{\mathbf e}_{I,r}}
{\|\mathbf v_I-(\mathbf v_I\cdot\widehat{\mathbf e}_{I,r})\widehat{\mathbf e}_{I,r}\|}.
$$

The tested family is

$$
\mathbf S_I^{\mathrm{recip,frame}}(t)
=
\sum_a \alpha_a q_a(M\leftarrow I;t)\,\widehat{\mathbf e}_{I,r}(t)
+
\sum_a \beta_a q_a(M\leftarrow I;t)\,\widehat{\mathbf e}_{I,\theta}(t),
$$

with the radial-only or tangential-only variants obtained by omitting the other summand. The target is still:

```text
refined_i_receiver_phase_bin_residual_balance.sampled_forcing.samples[].layers.I.residual_forcing
```

No residual projection, residual-spectrum ranking, or fitted residual component is used to build features. The optional source-eligibility packet remains context only. The artifact remains:

```text
artifact_schema = a0-reciprocal-interlayer-branch-equation-checker/v1
accepted_history_boundary = false
rerun_authority = diagnostic_only_not_corrected_rerun_authority
```

## May 22, 2026 Execution

The production checks used the current corrected root-transport identity artifact and declared linear carrier-frame time alignment:

```text
node scripts/mass-map/a0-reciprocal-interlayer-branch-equation-checker.mjs --intake /tmp/a0-tier1-fold-layer-locked-one-period-attempt-corrected-omit-none-root-transport-identity-full.json --source-eligibility /tmp/a0-mode-band-source-eligibility.json --projection radial --frame-time-rule linear --pretty --out /tmp/a0-reciprocal-interlayer-branch-equation-checker-radial.json
node scripts/mass-map/a0-reciprocal-interlayer-branch-equation-checker.mjs --intake /tmp/a0-tier1-fold-layer-locked-one-period-attempt-corrected-omit-none-root-transport-identity-full.json --source-eligibility /tmp/a0-mode-band-source-eligibility.json --projection tangential --frame-time-rule linear --pretty --out /tmp/a0-reciprocal-interlayer-branch-equation-checker-tangential.json
node scripts/mass-map/a0-reciprocal-interlayer-branch-equation-checker.mjs --intake /tmp/a0-tier1-fold-layer-locked-one-period-attempt-corrected-omit-none-root-transport-identity-full.json --source-eligibility /tmp/a0-mode-band-source-eligibility.json --projection radial_tangential --frame-time-rule linear --pretty --out /tmp/a0-reciprocal-interlayer-branch-equation-checker-radial-tangential.json
```

The declared linear runs keep the nearest-match diagnostics in the audit, but feature construction uses linear carrier-frame interpolation:

```text
interpolation_status_counts.exact = 1
interpolation_status_counts.interpolated = 15
tangent_fallback_count = 0
nearest_tied_sample_count = 2
```

All carrier-frame projection variants pass the degrees-of-freedom guard and fail held-out residual:

| Projection | Feature count | Full relative residual | Max held-out relative residual | Max leverage | Feature rank |
| --- | ---: | ---: | ---: | ---: | ---: |
| `radial` | `3` | `0.9797049044961849` | `1.2337168068559687` | `0.36768919129531236` | `3` |
| `tangential` | `3` | `0.9737700455486719` | `1.0546122909019986` | `0.3539194817252306` | `3` |
| `radial_tangential` | `6` | `0.9529164714190541` | `1.2113507567372126` | `0.37283715322592925` | `6` |

The declared-linear velocity contrast is also a no-go:

```text
projection = velocity
full_relative_residual = 0.8408714289522279
max_held_out_relative_residual = 1.4950583827865491
```

## Interpretation

The carrier-frame projection test rules out the immediate possibility that the previous reciprocal no-go failed only because the source scalars were projected along $\widehat{\mathbf v}_I$ rather than the carrier frame. The tangential projection is the best held-out variant in this packet, but its maximum held-out residual is still about `52.7` times the `0.02` tolerance. The radial+tangential six-feature family lowers the in-sample residual only modestly and does not transfer.

Thus the current reciprocal source channels remain real source directions, but they do not supply a rerun-admissible vector branch equation under the carrier-frame projection ladder.

## Boundary

This packet is priority-only. It does not create a new acceptance gate and does not permit a corrected one-period rerun. The next branch-chart move must add a stronger finite root-branch coordinate, a new lawful source record, or a revised non-root-key mode before fitting; it should not reuse the same three reciprocal scalars with another post-hoc projection expansion.

Promotion decision: priority-only. Do not promote this packet into `content/markdown/aaa` until a source-declared branch equation passes held-out residual, root-transport certification, raw-row root-ledger stability, and one-period closure.
