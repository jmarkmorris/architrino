# $A_0$ Carrier-Frame Branch-Coordinate Checker

## Status

- Kind: `priority`
- Status: `priority-only`
- Claim level: source-side corrected-carrier deformation no-go, not accepted history
- Date: May 22, 2026

## Checker Contract

The script [a0-carrier-frame-branch-coordinate-checker.mjs](../../../../scripts/mass-map/a0-carrier-frame-branch-coordinate-checker.mjs) consumes a corrected `a0-tier1-fold-layer-locked-one-period-attempt/v1` artifact and tests the smallest source-side corrected-carrier `I` deformation coordinates against the existing sampled forcing target:

```text
refined_i_receiver_phase_bin_residual_balance.sampled_forcing.samples[].layers.I.residual_forcing
```

It builds all source features only from corrected carrier state:

```text
rows[].samples[].bodies.I+.position
rows[].samples[].bodies.I-.position
rows[].samples[].bodies.I+.velocity
rows[].samples[].bodies.I-.velocity
```

For each forcing bucket, the declared `linear` carrier-frame time rule constructs

$$
\mathbf r_I(t)=\mathbf s_{I+}(t)-\mathbf s_{I-}(t),
\qquad
\widehat{\mathbf e}_{I,r}(t)=\frac{\mathbf r_I(t)}{\|\mathbf r_I(t)\|},
$$

and the first scalar deformation coordinate is

$$
\delta\rho_I(t)
=
\|\mathbf r_I(t)\|
-
\left\langle \|\mathbf r_I\| \right\rangle_{\mathrm{buckets}}.
$$

The smallest family is therefore

```text
radial_deformation = delta_radius * e_I,r
```

The checker then adds two controlled companions only after that one-scalar test:

```text
radial_phase_state = {delta_radius, radial_velocity_delta} * e_I,r
radial_tangential_phase_state = {delta_radius, radial_velocity_delta} * {e_I,r, e_I,theta}
```

These are source-side corrected-carrier coordinates. The checker does not project the residual to build features, does not use residual-spectrum labels, and does not use fitted residual components as source data.

The artifact boundary is:

```text
artifact_schema = a0-carrier-frame-branch-coordinate-checker/v1
accepted_history_boundary = false
rerun_authority = diagnostic_only_not_corrected_rerun_authority
```

Optional carrier-frame residual-spectrum input is copied as context only.

## May 22, 2026 Execution

The production check used the current corrected root-transport identity artifact and copied the declared-linear carrier-frame spectrum as context:

```text
node scripts/mass-map/a0-carrier-frame-branch-coordinate-checker.mjs --intake /tmp/a0-tier1-fold-layer-locked-one-period-attempt-corrected-omit-none-root-transport-identity-full.json --carrier-spectrum /tmp/a0-carrier-frame-residual-spectrum-linear.json --frame-time-rule linear --pretty --out /tmp/a0-carrier-frame-branch-coordinate-checker.json
```

The row reports:

```text
status = carrier_frame_branch_coordinate_no_go
failure_code = all-carrier-frame-branch-coordinate-families-fail
sample_count = 16
frame_time_rule = linear
interpolation_status_counts.exact = 1
interpolation_status_counts.interpolated = 15
tangent_fallback_count = 0
```

The nearest rule is rejected before fitting because it has tied source matches:

```text
nearest_status = blocked_insufficient_carrier_frame_regularization
nearest_failure_code = nearest-carrier-frame-ties
nearest_tied_sample_count = 2
```

The source-side deformation families all pass degrees-of-freedom controls but fail held-out residual:

| Family | Feature count | Full relative residual | Max held-out relative residual | Status |
| --- | ---: | ---: | ---: | --- |
| `radial_deformation` | `1` | `0.9987071165861717` | `1.0492394121933206` | `carrier_frame_branch_coordinate_no_go` |
| `radial_phase_state` | `2` | `0.9290546746127268` | `1.5341171039338615` | `carrier_frame_branch_coordinate_no_go` |
| `radial_tangential_phase_state` | `4` | `0.9079340640118748` | `1.6498611276202226` | `carrier_frame_branch_coordinate_no_go` |

The smallest coordinate has maximum leverage `0.12458911531198533` and feature rank `1`. The two-scalar radial companion has maximum leverage `0.2821148306968724` and feature rank `2`. The radial/tangential companion has maximum leverage `0.3080332181059438` and feature rank `4`. The failure is therefore not a degrees-of-freedom failure. It is a branch-coordinate failure: the corrected-carrier radial deformation and radial rate do not predict the remaining sampled forcing.

## Interpretation

The previous carrier-frame residual spectrum showed that the unresolved forcing is radial-dominated in the corrected `I` frame. This checker shows that radial localization is not the same as a source-side radial deformation coordinate. The source-derived `I` radius perturbation barely reduces the full vector residual, and the radial-rate companion lowers the full fit only to about `0.929` while worsening held-out transfer.

This rules out the immediate corrected-carrier deformation ladder:

$$
\delta\rho_I\,\widehat{\mathbf e}_{I,r},
\qquad
(\delta\rho_I,\delta\dot\rho_I)\widehat{\mathbf e}_{I,r},
\qquad
(\delta\rho_I,\delta\dot\rho_I)(\widehat{\mathbf e}_{I,r},\widehat{\mathbf e}_{I,\theta})
$$

as a rerun-admissible branch coordinate for the current compact artifact.

## Boundary

This packet is a no-go under the existing branch-chart revision contract. It does not create a new acceptance gate and does not permit a corrected one-period rerun. The next branch-chart move must not simply restate carrier-frame radial dominance as `delta_radius`; it needs a stronger finite root-branch coordinate, a lawful source record beyond corrected-carrier radius/rate, or a revised non-root-key mode that passes held-out residual before any corrected rerun.

Promotion decision: priority-only. Do not promote this packet into `content/markdown/aaa` until a source-declared branch coordinate passes held-out residual, root-transport certification, raw-row root-ledger stability, and one-period closure.
